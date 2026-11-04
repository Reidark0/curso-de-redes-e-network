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
console.log(`Visíveis: ${o.palavras.visiveis} → ${n.palavras.visiveis} | cortes brutos ${cortes} (${Math.round(cortes / o.palavras.visiveis * 100)}%) | acréscimos brutos ${acrescimos} | T ${o.duracao.T} → ${n.duracao.T} min`);
