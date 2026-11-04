#!/usr/bin/env node
// Uso: node revisao/tools/continuidade.js <mXX>  -> nextTheme de cada aula nova x título da aula seguinte; prerequisites
'use strict';
const L = require('./lib.js');
const mod = process.argv[2];
const order = L.courseOrder();
const idx = order.map((o, i) => [o, i]).filter(([o]) => o.mod === mod);
for (const [o, i] of idx) {
  const n = (L.loadNew(o.id) || L.loadOriginal(o.id)).obj;
  const nx = order[i + 1] ? (L.loadNew(order[i + 1].id) || L.loadOriginal(order[i + 1].id)).obj : null;
  console.log(`${o.id} → próxima ${nx ? nx.id + ' "' + nx.title + '"' : '(fim)'}\n   nextTheme: ${L.stripHtml(n.content?.nextTheme || '').replace(/^Próximo tema\s*/i, '').slice(0, 260)}\n   prereq: ${(n.prerequisites || []).map((p) => typeof p === 'string' ? p : p.lesson).join(',')}`);
}
