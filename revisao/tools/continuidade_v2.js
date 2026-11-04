#!/usr/bin/env node
// Uso: node revisao/tools/continuidade_v2.js <mXX>
// Fim de módulo: para cada aula, título da seguinte × nextTheme da versão final; prerequisites iguais ao original.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const mod = process.argv[2];
const st = L.readStatusTable(fs.readFileSync(path.join(L.REV, 'PROGRESSO.md'), 'utf8'));
const order = L.courseOrder();
const fin = (id) => (st[id]?.v2 === 'CONCLUÍDA' && L.loadNew(id) ? ['v2', L.loadNew(id).obj] : L.loadV1(id) ? ['v1', L.loadV1(id).obj] : ['original', L.loadOriginal(id).obj]);
order.forEach((o, i) => {
  if (o.mod !== mod) return;
  const [v, a] = fin(o.id); const nx = order[i + 1] ? fin(order[i + 1].id)[1] : null;
  const pre = JSON.stringify(a.prerequisites) === JSON.stringify(L.loadOriginal(o.id).obj.prerequisites) ? 'prereq=orig' : 'PREREQ ALTERADO';
  console.log(`${o.id} [${v}] ${pre} | próxima: ${nx ? `${nx.id} "${nx.title}"` : '—'}\n   nextTheme: ${L.stripHtml(a.content?.nextTheme || '').replace(/^Próximo tema\s*/, '').slice(0, 260)}`);
});
