#!/usr/bin/env node
// Uso do orquestrador:
//   node revisao/tools/progresso.js status <id> "EM ANDAMENTO"|"PENDENTE"|"FALHOU"
//   node revisao/tools/progresso.js concluir <id>   -> lê métricas + bloco JSON da análise, confere arquivos e preenche a linha
//   node revisao/tools/progresso.js resumo          -> contagem por status
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const P = path.join(L.REV, 'PROGRESSO.md');
const [cmd, id, st] = process.argv.slice(2);
let md = fs.readFileSync(P, 'utf8');
function setRow(id, cells) {
  const re = new RegExp(`^\\| ${id.replace('.', '\\.')} \\|.*$`, 'm');
  const m = md.match(re); if (!m) throw new Error('linha não encontrada: ' + id);
  const cur = m[0].split('|').slice(1, -1).map((s) => s.trim());
  const row = cur.map((c, i) => (cells[i] !== undefined ? cells[i] : c));
  md = md.replace(re, '| ' + row.join(' | ') + ' |');
}
function analise(id) {
  const f = L.lessonFileFromId(id);
  const p = path.join(L.REV, 'analises', f.mod, `aula-${id}.md`);
  if (!fs.existsSync(p)) return { p, ok: false, motivo: 'análise não existe' };
  const txt = fs.readFileSync(p, 'utf8');
  const blocks = [...txt.matchAll(/```json\s*([\s\S]*?)```/g)];
  if (!blocks.length) return { p, ok: false, motivo: 'sem bloco json' };
  try { return { p, ok: true, j: JSON.parse(blocks[blocks.length - 1][1]) }; } catch (e) { return { p, ok: false, motivo: 'json inválido: ' + e.message }; }
}
if (cmd === 'status') { setRow(id, [undefined, undefined, st]); fs.writeFileSync(P, md); console.log(`${id} -> ${st}`); }
else if (cmd === 'concluir') {
  const a = analise(id); const mo = path.join(L.REV, 'trabalho', id, 'metricas_original.json'); const mn = path.join(L.REV, 'trabalho', id, 'metricas_nova.json');
  const probs = [];
  if (!a.ok) probs.push(a.motivo);
  if (!fs.existsSync(mo) || !fs.existsSync(mn)) probs.push('métricas ausentes');
  if (!L.loadNew(id)) probs.push('aula nova ausente');
  if (probs.length) { console.log(JSON.stringify({ id, ok: false, probs })); process.exit(1); }
  const o = L.readJSON(mo); const n = L.readJSON(mn); const j = a.j;
  const status = String(j.status || '').toUpperCase().startsWith('FALHOU') ? 'FALHOU' : 'CONCLUÍDA';
  const pct = Math.round((n.palavras.visiveis / o.palavras.visiveis - 1) * 100);
  setRow(id, [undefined, undefined, status, `${o.palavras.visiveis}→${n.palavras.visiveis} (${pct >= 0 ? '+' : ''}${pct}%)`, `${o.duracao.declarada}→${n.duracao.declarada}`,
    j.veredito_duracao || '', `${j.linguica_nivel || ''}${j.linguica_pct != null ? ' ' + j.linguica_pct + '%' : ''}`, j.conteudo_util || '', j.aproveitamento || '']);
  fs.writeFileSync(P, md);
  console.log(JSON.stringify({ id, status, visiveis: `${o.palavras.visiveis}->${n.palavras.visiveis}`, duracao: `${o.duracao.declarada}->${n.duracao.declarada}` }));
} else if (cmd === 'resumo') {
  const c = {}; for (const m of md.matchAll(/^\| (\d+\.\d+) \| [^|]+ \| ([^|]+) \|/mg)) c[m[2].trim()] = (c[m[2].trim()] || 0) + 1; console.log(JSON.stringify(c));
} else { console.error('uso: progresso status|concluir|resumo'); process.exit(2); }
