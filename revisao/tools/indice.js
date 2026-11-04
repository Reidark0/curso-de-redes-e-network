#!/usr/bin/env node
// Uso: node revisao/tools/indice.js [--modulo mXX] [--busca "termo"] [--obj]
// Títulos (e, com --obj, objetivos) de todas as aulas do curso, para apontar qual aula ensina uma prévia cortada
// ou para preencher glossary[].relatedLessons. --busca filtra por título/subtítulo/objetivos/tags (sem acento, sem caixa).
'use strict';
const L = require('./lib.js');
const a = process.argv.slice(2);
const val = (k) => { const i = a.indexOf(k); return i >= 0 ? a[i + 1] : null; };
const mod = val('--modulo'); const busca = val('--busca'); const comObj = a.includes('--obj') || Boolean(busca);
const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
for (const o of L.courseOrder()) {
  if (mod && o.mod !== mod) continue;
  const x = L.loadOriginal(o.id).obj;
  const hay = norm([x.title, x.subtitle, (x.objectives || []).join(' '), (x.tags || []).join(' ')].join(' '));
  if (busca && !norm(busca).split(/\s+/).every((t) => hay.includes(t))) continue;
  console.log(`${o.id} — ${x.title}${comObj ? `\n    ${(x.objectives || []).slice(0, 4).join(' | ').slice(0, 400)}` : ''}`);
}
