#!/usr/bin/env node
// Uso: node revisao/tools/contexto.js <id>
// Continuidade: módulo, esta aula, e título + objetivos + summary das aulas anterior e seguinte (versão mais recente de cada uma).
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
console.log(`Módulo ${cur.mod}: ${g(/title:\s*"([^"]*)"/)}`);
const obj = modSrc.match(/objectives:\s*\[([\s\S]*?)\]/); if (obj) console.log('Objetivos do módulo:' + obj[1].replace(/\s+/g, ' '));
const me = L.loadOriginal(id).obj;
console.log(`Esta aula ${id}: "${me.title}" | type: ${me.type} | prerequisites: ${JSON.stringify(me.prerequisites)} | unlocks: ${JSON.stringify(me.progressRules?.unlocks)}`);
const best = (x) => { const st = L.readStatusTable(fs.readFileSync(path.join(L.REV, 'PROGRESSO.md'), 'utf8'))[x] || {}; if (st.v2 === 'CONCLUÍDA' && L.loadNew(x)) return ['v2', L.loadNew(x).obj]; if (L.loadV1(x)) return ['v1', L.loadV1(x).obj]; return ['original', L.loadOriginal(x).obj]; };
for (const [rot, j] of [['ANTERIOR', i - 1], ['SEGUINTE', i + 1]]) {
  if (j < 0 || j >= order.length) { console.log(`${rot}: (nenhuma)`); continue; }
  const [v, o] = best(order[j].id);
  console.log(`${rot} ${o.id} [${v}]: "${o.title}"\n  objetivos: ${(o.objectives || []).join(' | ').slice(0, 600)}\n  summary: ${L.stripHtml(o.content?.summary || '').slice(0, 700)}\n  nextTheme: ${L.stripHtml(o.content?.nextTheme || '').slice(0, 300)}`);
}
