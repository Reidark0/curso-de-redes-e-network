#!/usr/bin/env node
// Uso do orquestrador (v2):
//   node revisao/tools/progresso.js init                 -> acrescenta as colunas da v2 à tabela (uma vez)
//   node revisao/tools/progresso.js status <id> "<ST>"   -> muda a coluna V2 (PENDENTE | EM ANDAMENTO | CONCLUÍDA | FALHOU)
//   node revisao/tools/progresso.js concluir <id>        -> confere análise + métricas + aula montada e preenche a linha (V2 = CONCLUÍDA)
//   node revisao/tools/progresso.js falhou <id>          -> V2 = FALHOU e devolve a "aulas novas/" a v1 (ou remove o arquivo, e o build usa o original)
//   node revisao/tools/progresso.js resumo               -> contagem por status da V2
//   node revisao/tools/progresso.js proximo              -> primeira aula com V2 PENDENTE (na ordem do curso)
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const P = path.join(L.REV, 'PROGRESSO.md');
const [cmd, id, st] = process.argv.slice(2);
let md = fs.readFileSync(P, 'utf8');
const NEWCOLS = ['V2', 'palavras visíveis original→v1→v2', 'duração original → v1 → v2'];
function header() { const lines = md.split('\n'); const hi = lines.findIndex((l) => /^\| id \| arquivo \|/.test(l)); return { lines, hi, head: lines[hi].split('|').slice(1, -1).map((s) => s.trim()) }; }
function setRow(rid, values) {
  const { head } = header();
  const re = new RegExp(`^\\| ${rid.replace('.', '\\.')} \\|.*$`, 'm');
  const m = md.match(re); if (!m) throw new Error('linha não encontrada: ' + rid);
  const cur = m[0].split('|').slice(1, -1).map((s) => s.trim());
  for (const [col, v] of Object.entries(values)) { const i = head.indexOf(col); if (i < 0) throw new Error('coluna não encontrada: ' + col); cur[i] = v; }
  md = md.replace(re, '| ' + cur.join(' | ') + ' |');
}
function analise(rid) {
  const f = L.lessonFileFromId(rid);
  const p = path.join(L.ANALISES_V2, f.mod, `aula-${rid}.md`);
  if (!fs.existsSync(p)) return { ok: false, motivo: 'análise v2 não existe' };
  const blocks = [...fs.readFileSync(p, 'utf8').matchAll(/```json\s*([\s\S]*?)```/g)];
  if (!blocks.length) return { ok: false, motivo: 'análise sem bloco json' };
  try { return { ok: true, j: JSON.parse(blocks[blocks.length - 1][1]) }; } catch (e) { return { ok: false, motivo: 'json inválido: ' + e.message }; }
}
function met(rid, v) {
  const p = path.join(L.WORK, rid, `metricas_${v}.json`);
  if (!fs.existsSync(p)) { try { require('child_process').execFileSync(process.execPath, [path.join(__dirname, 'metricas.js'), rid, v, '--compact'], { stdio: 'ignore' }); } catch { return null; } }
  return fs.existsSync(p) ? L.readJSON(p) : null;
}
if (cmd === 'init') {
  const { lines, hi, head } = header();
  if (head.includes('V2')) { console.log('já inicializado'); process.exit(0); }
  lines[hi] = lines[hi] + ' ' + NEWCOLS.join(' | ') + ' |';
  lines[hi + 1] = lines[hi + 1] + NEWCOLS.map(() => '---|').join('');
  for (let i = hi + 2; i < lines.length; i++) {
    const m = lines[i].match(/^\| (\d+\.\d+) \|/); if (!m) continue;
    let row = lines[i];
    if (!L.loadV1(m[1])) row = row.replace(/^(\| [^|]+\| [^|]+\| )PENDENTE( \|)/, '$1— (sem v1)$2');
    lines[i] = row + ' PENDENTE | | |';
  }
  md = lines.join('\n');
  md = md.replace(/^Status: PENDENTE · EM ANDAMENTO · CONCLUÍDA · FALHOU\..*$/m, (s) => `${s}\n\n**v2 (a partir de 2026-11-04):** a coluna **V2** segue \`revisao/CRITERIOS_V2.md\` (status PENDENTE · EM ANDAMENTO · CONCLUÍDA · FALHOU). A coluna "status" é a da v1 ("— (sem v1)" = a v1 não chegou a essa aula). As palavras visíveis seguem a mesma definição nas três versões; a duração da v2 é "núcleo + prática extra" (seção 6 dos critérios).`);
  fs.writeFileSync(P, md); console.log('colunas da v2 acrescentadas');
} else if (cmd === 'status') { setRow(id, { V2: st }); fs.writeFileSync(P, md); console.log(`${id} V2 -> ${st}`); }
else if (cmd === 'concluir') {
  const a = analise(id); const probs = [];
  if (!a.ok) probs.push(a.motivo);
  const mo = met(id, 'original'); const m1 = L.loadV1(id) ? met(id, 'v1') : null; const mn = met(id, 'nova');
  if (!mn) probs.push('metricas_nova ausente');
  if (!L.loadNew(id)) probs.push('aula montada ausente');
  if (probs.length) { console.log(JSON.stringify({ id, ok: false, probs })); process.exit(1); }
  const status = String(a.j.status || '').toUpperCase().startsWith('FALHOU') ? 'FALHOU' : 'CONCLUÍDA';
  const v1dur = L.loadV1(id)?.obj.duration || '—';
  setRow(id, { V2: status, [NEWCOLS[1]]: `${mo.palavras.visiveis}→${m1 ? m1.palavras.visiveis : '—'}→${mn.palavras.visiveis}`, [NEWCOLS[2]]: `${L.loadOriginal(id).obj.duration} → ${v1dur} → ${L.loadNew(id).obj.duration}` });
  fs.writeFileSync(P, md);
  console.log(JSON.stringify({ id, status, palavras: `${mo.palavras.visiveis}->${m1 ? m1.palavras.visiveis : '-'}->${mn.palavras.visiveis}`, duracao: L.loadNew(id).obj.duration }));
} else if (cmd === 'falhou') {
  const f = L.lessonFileFromId(id); const dst = path.join(L.NEW_DIR, f.mod, f.file); const v1 = path.join(L.V1_DIR, f.mod, f.file);
  if (fs.existsSync(v1)) fs.copyFileSync(v1, dst); else if (fs.existsSync(dst)) fs.renameSync(dst, path.join(L.WORK, id, `aula_v2_reprovada_${Date.now()}.js`));
  setRow(id, { V2: 'FALHOU' }); fs.writeFileSync(P, md); console.log(`${id} V2 -> FALHOU (build usa ${fs.existsSync(v1) ? 'a v1' : 'o original'})`);
} else if (cmd === 'resumo') {
  const s = L.readStatusTable(md); const c = {}; for (const v of Object.values(s)) c[v.v2] = (c[v.v2] || 0) + 1; console.log(JSON.stringify(c));
} else if (cmd === 'proximo') {
  const s = L.readStatusTable(md); const nx = L.courseOrder().find((o) => s[o.id]?.v2 === 'PENDENTE'); console.log(nx ? `${nx.id} ${nx.mod}/${nx.file}` : 'FIM');
} else { console.error('uso: progresso init|status|concluir|falhou|resumo|proximo'); process.exit(2); }
