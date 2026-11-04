#!/usr/bin/env node
// Uso: node revisao/tools/comparar.js <id>
// Compara metricas_original.json x metricas_nova.json campo a campo (palavras visíveis e invisíveis)
// para checar a 11.7: onde houve corte e onde houve acréscimo.
'use strict';
const L = require('./lib.js');
const { path } = L;
const id = process.argv[2];
const o = L.readJSON(path.join(L.REV, 'trabalho', id, 'metricas_original.json'));
const n = L.readJSON(path.join(L.REV, 'trabalho', id, 'metricas_nova.json'));
const linhas = []; let cortes = 0; let acrescimos = 0;
for (const tipo of ['porCampoVisivel', 'porCampoInvisivel']) {
  const ks = [...new Set([...Object.keys(o[tipo]), ...Object.keys(n[tipo])])];
  for (const k of ks) {
    const a = o[tipo][k] || 0; const b = n[tipo][k] || 0; const d = b - a;
    if (tipo === 'porCampoVisivel') { if (d < 0) cortes -= d; else acrescimos += d; }
    if (d) linhas.push(`${tipo === 'porCampoVisivel' ? 'V' : 'I'} ${k.padEnd(28)} ${String(a).padStart(5)} → ${String(b).padStart(5)} (${d > 0 ? '+' : ''}${d})`);
  }
}
console.log(linhas.join('\n'));
// diff por frase (texto visível de content): frases do original que não existem mais na nova
const VIS = ['security', 'troubleshooting', 'lab', 'quiz', 'flashcards', 'mentorQuestions', 'exercises', 'challenge', 'commentedSolution', 'glossary'];
const frases = (obj) => { const t = Object.entries(obj.content || {}).filter(([k]) => L.VISIBLE_CONTENT.includes(k)).map(([, v]) => L.stripHtml(L.stripSvg(v))).join(' ') + ' ' + VIS.map((k) => L.deepText(obj[k])).join(' . ');
  return new Set(t.split(/(?<=[.!?:])\s+/).map((x) => x.trim().toLowerCase()).filter((x) => x.split(/\s+/).length >= 5)); };
const fo = frases(L.loadOriginal(id).obj); const fn = frases(L.loadNew(id).obj);
const sumiram = [...fo].filter((x) => !fn.has(x)); const novas = [...fn].filter((x) => !fo.has(x));
const pal = (a) => a.reduce((s2, x) => s2 + x.split(/\s+/).length, 0);
console.log(`texto visível: frases do original ausentes na nova ${sumiram.length}/${fo.size} (${pal(sumiram)} palavras) | frases novas/reescritas ${novas.length} (${pal(novas)} palavras)`);
if (process.argv.includes('--sumiram')) { console.log('Frases do original ausentes na nova (confira se o conteúdo está coberto em outra forma):'); for (const x of sumiram) console.log(' - ' + x.slice(0, 220)); }
else console.log('(use --sumiram para listar todas as frases do original que não existem mais na nova)');
console.log(`Visíveis: ${o.palavras.visiveis} → ${n.palavras.visiveis} | cortes brutos ${cortes} (${Math.round(cortes / o.palavras.visiveis * 100)}%) | acréscimos brutos ${acrescimos} | T ${o.duracao.T} → ${n.duracao.T} min`);
