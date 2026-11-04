#!/usr/bin/env node
// Uso: node revisao/tools/comparar.js <id> [--sumiram]
// v2: compara a base (v1 ou original) com a nova versão: palavras por seção e frases da base que não existem mais na nova.
// Use --sumiram para listar as frases removidas e montar o inventário de conceitos removidos.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const id = process.argv[2];
const dir = path.join(L.WORK, id);
const baseInfo = L.readJSON(path.join(dir, 'base.json'));
const mb = L.readJSON(path.join(dir, `metricas_${baseInfo.base}.json`));
const mn = L.readJSON(path.join(dir, 'metricas_nova.json'));
const linhas = [];
for (const grupo of ['porSecao', 'pratica', 'outros']) {
  const ks = [...new Set([...Object.keys(mb[grupo]), ...Object.keys(mn[grupo])])];
  for (const k of ks) { const a = mb[grupo][k] || 0; const b = mn[grupo][k] || 0; if (a !== b) linhas.push(`${k.padEnd(22)} ${String(a).padStart(5)} → ${String(b).padStart(5)} (${b - a > 0 ? '+' : ''}${b - a})`); }
}
console.log(`Base: ${baseInfo.base}`); console.log(linhas.join('\n'));
const VIS = ['security', 'troubleshooting', 'lab', 'quiz', 'flashcards', 'mentorQuestions', 'exercises', 'challenge', 'commentedSolution', 'glossary', 'objectives', 'learningOutcomes'];
const frases = (obj) => { const t = Object.values(obj.content || {}).map((v) => L.stripHtml(L.stripSvg(v))).join(' ') + ' ' + VIS.map((k) => L.deepText(obj[k])).join(' . ');
  return new Set(t.split(/(?<=[.!?:;])\s+/).map((x) => x.trim().toLowerCase()).filter((x) => x.split(/\s+/).length >= 5)); };
const fb = frases(L.loadVersion(id, baseInfo.base).obj); const fn = frases(L.loadNew(id).obj);
const sumiram = [...fb].filter((x) => !fn.has(x));
const pal = (a) => a.reduce((s2, x) => s2 + x.split(/\s+/).length, 0);
console.log(`frases da base ausentes na nova: ${sumiram.length}/${fb.size} (${pal(sumiram)} palavras)`);
if (process.argv.includes('--sumiram')) { console.log('Frases da base ausentes na nova (cada uma: coberta de outra forma, repetição, prévia de outra aula ou conceito removido):'); for (const x of sumiram) console.log(' - ' + x.slice(0, 240)); }
console.log(`Visíveis: ${mb.palavras.visiveis} → ${mn.palavras.visiveis} | teoria ${mb.palavras.teoria} → ${mn.palavras.teoria} | núcleo ${mb.duracao.nucleo} → ${mn.duracao.nucleo} min | prática extra ${mb.duracao.praticaExtra} → ${mn.duracao.praticaExtra} min`);
