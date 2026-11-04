#!/usr/bin/env node
// Uso: node revisao/tools/contexto.js <id>
// Mostra SÓ o permitido para continuidade (6.1): módulo (título, objetivos, labs exigidos),
// e título + summary das aulas anterior e seguinte. Não mostra outro conteúdo.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const id = process.argv[2];
const order = L.courseOrder();
const i = order.findIndex((o) => o.id === id);
if (i < 0) { console.error('id desconhecido'); process.exit(2); }
const cur = order[i];
const modSrc = fs.readFileSync(path.join(L.MODULE_DIR, cur.module), 'utf8');
const g = (re) => (modSrc.match(re) || [])[1];
console.log(`Módulo ${cur.mod}: ${g(/title:\s*"([^"]*)"/)} | estimatedHours: ${g(/estimatedHours:\s*(\d+)/)}`);
const obj = modSrc.match(/objectives:\s*\[([\s\S]*?)\]/); if (obj) console.log('Objetivos do módulo:' + obj[1].replace(/\s+/g, ' '));
const rl = modSrc.match(/requiredLabs:\s*\[([^\]]*)\]/); if (rl) console.log('requiredLabs do módulo: ' + rl[1].replace(/\s+/g, ' '));
const me = L.loadOriginal(id).obj;
console.log(`Esta aula ${id}: "${me.title}" | prerequisites: ${JSON.stringify(me.prerequisites)} | unlocks: ${JSON.stringify(me.progressRules?.unlocks)}`);
for (const [rot, j] of [['ANTERIOR', i - 1], ['SEGUINTE', i + 1]]) {
  if (j < 0 || j >= order.length) { console.log(`${rot}: (nenhuma)`); continue; }
  const o = L.loadOriginal(order[j].id).obj;
  console.log(`${rot} ${o.id}: "${o.title}"\n  summary: ${L.stripHtml(o.content?.summary || '').replace(/^Resumo\s*/i, '').slice(0, 900)}`);
}
