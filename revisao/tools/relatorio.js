#!/usr/bin/env node
// Uso: node revisao/tools/relatorio.js
// Gera revisao/RELATORIO_FINAL.md a partir dos blocos JSON das análises, das métricas e de PROGRESSO.md.
// Os textos escritos à mão ficam em revisao/tools/relatorio_textos/<nome>.md e entram nos marcadores {{TEXTO:nome}}.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const order = L.courseOrder();
const prog = fs.readFileSync(path.join(L.REV, 'PROGRESSO.md'), 'utf8');
const status = {}; for (const m of prog.matchAll(/^\| (\d+\.\d+) \| [^|]+ \| ([^|]+) \|/mg)) status[m[1]] = m[2].trim();
const rows = [];
for (const o of order) {
  const orig = L.loadOriginal(o.id).obj;
  const r = { id: o.id, mod: o.mod, titulo: orig.title, tipo: orig.type, status: status[o.id], durAntes: orig.duration, minAntes: orig.estimatedStudyTimeMinutes };
  const ap = path.join(L.REV, 'analises', o.mod, `aula-${o.id}.md`);
  if (fs.existsSync(ap)) { const b = [...fs.readFileSync(ap, 'utf8').matchAll(/```json\s*([\s\S]*?)```/g)]; try { r.j = JSON.parse(b[b.length - 1][1]); } catch { r.jErro = true; } }
  const mo = path.join(L.REV, 'trabalho', o.id, 'metricas_original.json'); const mn = path.join(L.REV, 'trabalho', o.id, 'metricas_nova.json');
  if (!fs.existsSync(mo)) require('child_process').execFileSync(process.execPath, [path.join(__dirname, 'metricas.js'), o.id, 'original', '--compact'], { stdio: 'ignore' });
  r.mo = L.readJSON(mo); r.mn = fs.existsSync(mn) ? L.readJSON(mn) : null;
  const nova = status[o.id] === 'CONCLUÍDA' ? L.loadNew(o.id) : null;
  r.durDepois = nova ? nova.obj.duration : orig.duration; r.minDepois = nova ? nova.obj.estimatedStudyTimeMinutes : orig.estimatedStudyTimeMinutes;
  r.visAntes = r.mo?.palavras.visiveis; r.visDepois = nova ? r.mn?.palavras.visiveis : r.mo?.palavras.visiveis;
  r.invAntes = r.mo?.palavras.invisiveis; r.invDepois = nova ? r.mn?.palavras.invisiveis : r.mo?.palavras.invisiveis;
  r.TAntes = r.mo?.duracao.T; r.TDepois = nova ? r.mn?.duracao.T : r.mo?.duracao.T;
  rows.push(r);
}
const sum = (f) => rows.reduce((a, r) => a + (Number(f(r)) || 0), 0);
const ok = rows.filter((r) => r.status === 'CONCLUÍDA'); const falhou = rows.filter((r) => r.status === 'FALHOU'); const pend = rows.filter((r) => !['CONCLUÍDA', 'FALHOU'].includes(r.status));
const lbl = (r) => `${r.id} — ${r.titulo}`;
const pct = (a, b) => (a ? `${Math.round((b / a - 1) * 100)}%` : '—');
const J = (r, k) => r.j?.[k];
const BUG = ['4.7', '4.9', '5.2', '5.3', '5.4', '5.5', '5.8', '5.10', '6.2', '6.3', '6.4', '6.5', '6.7', '6.8', '7.2', '7.4', '7.7', '8.4', '8.9', '9.1', '9.2', '9.5', '11.2', '11.6', '11.7', '11.9', '14.10', '14.11', '14.12', '14.13', '14.14', '15.1', '15.2', '15.3', '15.4', '15.5', '15.6', '15.7', '15.8', '15.11', '16.1', '16.2'];
const txt = (nome) => { const p = path.join(__dirname, 'relatorio_textos', `${nome}.md`); return fs.existsSync(p) ? fs.readFileSync(p, 'utf8').trim() : `_(texto "${nome}" ainda não escrito)_`; };
let md = `# Relatório final — revisão do curso "Redes e Network v2.0"\n\nGerado por \`revisao/tools/relatorio.js\` em ${new Date().toISOString().slice(0, 10)} a partir das análises (\`revisao/analises/\`), das métricas (\`revisao/trabalho/*/metricas_*.json\`) e de \`PROGRESSO.md\`. Fórmula de duração e rótulos: \`revisao/CRITERIOS.md\`.\n\n`;
md += `## 1. Resumo executivo\n\n| Indicador | Antes | Depois |\n|---|---|---|\n`;
md += `| Aulas processadas | 190 | ${ok.length} CONCLUÍDA · ${falhou.length} FALHOU · ${pend.length} pendentes |\n`;
md += `| Palavras visíveis | ${sum((r) => r.visAntes).toLocaleString('pt-BR')} | ${sum((r) => r.visDepois).toLocaleString('pt-BR')} (${pct(sum((r) => r.visAntes), sum((r) => r.visDepois))}) |\n`;
md += `| Palavras em campos invisíveis | ${sum((r) => r.invAntes).toLocaleString('pt-BR')} | ${sum((r) => r.invDepois).toLocaleString('pt-BR')} |\n`;
md += `| Horas declaradas (soma de estimatedStudyTimeMinutes ÷ 60) | ${(sum((r) => r.minAntes) / 60).toFixed(0)} h | ${(sum((r) => r.minDepois) / 60).toFixed(0)} h |\n`;
md += `| Horas pela fórmula T (soma) | ${(sum((r) => r.TAntes) / 60).toFixed(0)} h | ${(sum((r) => r.TDepois) / 60).toFixed(0)} h |\n`;
const bugFix = ok.filter((r) => BUG.includes(r.id)).length;
md += `| Aulas com quiz que impedia a conclusão | 42 | ${42 - bugFix} (corrigidas: ${bugFix}) |\n`;
md += `| Aulas com quiz padronizado (answer numérico) | — | ${ok.filter((r) => J(r, 'quiz_corrigido')).length} com conversão de formato |\n\n`;
md += txt('resumo') + '\n\n';
md += `## 2. Respostas pedidas\n\n`;
const lista = (titulo, arr, extra = () => '') => { md += `### ${titulo} (${arr.length})\n\n${arr.length ? arr.map((r) => `- ${lbl(r)}${extra(r)}`).join('\n') : '- nenhuma'}\n\n`; };
lista('2.1 Aulas com duração organizada', ok.filter((r) => /^ORGANIZADA/.test(J(r, 'veredito_duracao') || '')), (r) => ` (${r.durAntes})`);
lista('2.2 Aulas que precisam de melhora', ok.filter((r) => !/^ORGANIZADA/.test(J(r, 'veredito_duracao') || '') || ['ALTA', 'MÉDIA'].includes(J(r, 'linguica_nivel')) || J(r, 'conteudo_util') !== 'FORTE' || (J(r, 'revisao_humana') || []).length), (r) => {
  const p = []; if (!/^ORGANIZADA/.test(J(r, 'veredito_duracao') || '')) p.push(`duração ${J(r, 'veredito_duracao')} (${r.durAntes} → ${r.durDepois})`); if (['ALTA', 'MÉDIA'].includes(J(r, 'linguica_nivel'))) p.push(`linguiça ${J(r, 'linguica_nivel')} ~${J(r, 'linguica_pct')}%`); if (J(r, 'conteudo_util') !== 'FORTE') p.push(`conteúdo ${J(r, 'conteudo_util')}`); if ((J(r, 'revisao_humana') || []).length) p.push(`${J(r, 'revisao_humana').length} item(ns) de revisão humana`); return ': ' + p.join('; '); });
lista('2.3 Aulas com encheção de linguiça ALTA (ordem decrescente de %)', ok.filter((r) => J(r, 'linguica_nivel') === 'ALTA').sort((a, b) => J(b, 'linguica_pct') - J(a, 'linguica_pct')), (r) => ` — ~${J(r, 'linguica_pct')}%`);
lista('2.4 Aulas com conteúdo realmente útil (FORTE)', ok.filter((r) => J(r, 'conteudo_util') === 'FORTE'));
lista('2.5 Aulas com bom aproveitamento', ok.filter((r) => J(r, 'aproveitamento') === 'BOM'));
lista('2.6 Aulas que poderiam ser mais curtas', ok.filter((r) => J(r, 'pode_ser_mais_curta')), (r) => ` — prevista ${J(r, 'reducao_tempo_pct')}%; T ${r.TAntes} → ${r.TDepois} min (${pct(r.TAntes, r.TDepois)}); palavras visíveis ${pct(r.visAntes, r.visDepois)}`);
lista('2.7 Aulas que ganharam explicação mais direta sem perder conteúdo', ok.filter((r) => J(r, 'explicacao_mais_direta') && J(r, 'objetivos_cobertos') !== false));
md += `## 3. Estruturas\n\nDecisão tomada por seção/bloco, contando as análises concluídas (FUNDIR e MOVER incluem o destino em \`secoes\`).\n\n| Seção/bloco | MANTER | ENXUGAR | FUNDIR | REMOVER | MOVER | outras |\n|---|---|---|---|---|---|---|\n`;
const dec = {};
for (const r of ok) for (const [k, v] of Object.entries(J(r, 'secoes') || {})) { const t = String(v).toUpperCase().match(/MANTER|ENXUGAR|FUNDIR|REMOVER|MOVER/); const c = t ? t[0] : 'outras'; dec[k] = dec[k] || { MANTER: 0, ENXUGAR: 0, FUNDIR: 0, REMOVER: 0, MOVER: 0, outras: 0 }; dec[k][c]++; }
const keyOrder = [...L.VISIBLE_CONTENT, ...L.INVISIBLE_CONTENT];
for (const k of [...keyOrder.filter((k) => dec[k]), ...Object.keys(dec).filter((k) => !keyOrder.includes(k)).sort((a, b) => Object.values(dec[b]).reduce((x, y) => x + y) - Object.values(dec[a]).reduce((x, y) => x + y))]) { const d = dec[k]; md += `| ${k} | ${d.MANTER} | ${d.ENXUGAR} | ${d.FUNDIR} | ${d.REMOVER} | ${d.MOVER} | ${d.outras} |\n`; }
md += '\n' + txt('estruturas') + '\n\n';
md += `## 4. Tabela completa das 190 aulas\n\n| id | título | status | duração antes→depois | palavras visíveis antes→depois | duração | linguiça | útil | aproveitamento |\n|---|---|---|---|---|---|---|---|---|\n`;
for (const r of rows) md += `| ${r.id} | ${r.titulo} | ${r.status} | ${r.durAntes} → ${r.durDepois} | ${r.visAntes ?? '—'} → ${r.visDepois ?? '—'} (${pct(r.visAntes, r.visDepois)}) | ${J(r, 'veredito_duracao') || '—'} | ${J(r, 'linguica_nivel') || '—'}${J(r, 'linguica_pct') != null ? ' ' + J(r, 'linguica_pct') + '%' : ''} | ${J(r, 'conteudo_util') || '—'} | ${J(r, 'aproveitamento') || '—'} |\n`;
md += `\n## 5. Resumo por módulo\n\n| módulo | aulas | concl./falhou | horas declaradas antes→depois | estimatedHours do módulo antes→depois | palavras visíveis | linguiça ALTA/MÉDIA/BAIXA | útil FORTE/PARCIAL/FRACO |\n|---|---|---|---|---|---|---|---|\n`;
for (const mod of [...new Set(rows.map((r) => r.mod))]) {
  const rs = rows.filter((r) => r.mod === mod); const s = (f) => rs.reduce((a, r) => a + (Number(f(r)) || 0), 0); const c = (k, v) => rs.filter((r) => J(r, k) === v).length;
  const nn = mod.slice(1); const hA = (fs.readFileSync(path.join(L.MODULE_DIR, `module-${nn}.js`), 'utf8').match(/estimatedHours:\s*(\d+)/) || [])[1];
  const np = path.join(L.NEW_DIR, 'modules', `module-${nn}.js`); const hD = fs.existsSync(np) ? (fs.readFileSync(np, 'utf8').match(/estimatedHours:\s*(\d+)/) || [])[1] : '—';
  md += `| ${mod} | ${rs.length} | ${rs.filter((r) => r.status === 'CONCLUÍDA').length}/${rs.filter((r) => r.status === 'FALHOU').length} | ${(s((r) => r.minAntes) / 60).toFixed(1)} → ${(s((r) => r.minDepois) / 60).toFixed(1)} h | ${hA} → ${hD} | ${s((r) => r.visAntes)} → ${s((r) => r.visDepois)} (${pct(s((r) => r.visAntes), s((r) => r.visDepois))}) | ${c('linguica_nivel', 'ALTA')}/${c('linguica_nivel', 'MÉDIA')}/${c('linguica_nivel', 'BAIXA')} | ${c('conteudo_util', 'FORTE')}/${c('conteudo_util', 'PARCIAL')}/${c('conteudo_util', 'FRACO')} |\n`;
}
const resumosMod = (prog.split('## Resumos por módulo')[1] || '').trim();
md += `\n### Resumos escritos ao fim de cada módulo\n\n${resumosMod || '_(nenhum)_'}\n\n`;
md += `## 6. Revisão humana\n\n### 6.1 Aulas FALHOU\n\n${falhou.length ? falhou.map((r) => `- ${lbl(r)} (o single HTML usa a versão original)`).join('\n') : '- nenhuma'}\n\n### 6.2 Pendências por aula\n\n`;
for (const r of ok) { const it = J(r, 'revisao_humana') || []; if (it.length) md += `- **${lbl(r)}**\n${it.map((x) => `  - ${typeof x === 'string' ? x : JSON.stringify(x)}`).join('\n')}\n`; }
md += `\n### 6.3 Decisões\n\nTodas as decisões tomadas sem consulta estão em \`revisao/DECISOES.md\`. As principais:\n\n${txt('decisoes')}\n\n`;
md += `## 7. Recomendações fora do escopo\n\n${txt('recomendacoes')}\n`;
fs.writeFileSync(path.join(L.REV, 'RELATORIO_FINAL.md'), md);
console.log(JSON.stringify({ saida: 'revisao/RELATORIO_FINAL.md', concluidas: ok.length, falhou: falhou.length, pendentes: pend.length, bytes: md.length, analisesComErro: rows.filter((r) => r.jErro).map((r) => r.id) }));
