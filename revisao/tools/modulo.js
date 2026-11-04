#!/usr/bin/env node
// Uso: node revisao/tools/modulo.js <mXX>
// Fim de módulo (seção 9, item 1): copia data/modules/module-XX.js para "aulas novas/modules/",
// atualizando só estimatedHours (= soma das novas estimatedStudyTimeMinutes ÷ 60, arredondado) e
// assessment.requiredLabs (só labs que existem). Aulas FALHOU/sem versão nova entram com a versão original.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const mod = process.argv[2];
if (!/^m\d\d$/.test(mod || '')) { console.error('uso: modulo <mXX>'); process.exit(2); }
const nn = mod.slice(1);
const src = fs.readFileSync(path.join(L.MODULE_DIR, `module-${nn}.js`), 'utf8');
const prog = fs.readFileSync(path.join(L.REV, 'PROGRESSO.md'), 'utf8');
const status = {}; for (const m of prog.matchAll(/^\| (\d+\.\d+) \| [^|]+ \| ([^|]+) \|/mg)) status[m[1]] = m[2].trim();
const aulas = L.courseOrder().filter((o) => o.mod === mod);
let min = 0; const labs = new Set(); const usadas = [];
for (const a of aulas) {
  const nova = status[a.id] === 'CONCLUÍDA' ? L.loadNew(a.id) : null;
  const obj = (nova || L.loadOriginal(a.id)).obj; usadas.push(`${a.id}:${nova ? 'nova' : 'original'}`);
  min += Number(obj.estimatedStudyTimeMinutes || 0);
  if (obj.lab?.id) labs.add(obj.lab.id);
}
const horas = Math.round(min / 60);
let out = src;
const hOld = (src.match(/estimatedHours:\s*(\d+)/) || [])[1];
out = out.replace(/estimatedHours:\s*\d+/, `estimatedHours: ${horas}`);
const rl = src.match(/requiredLabs:\s*\[([^\]]*)\]/);
let labsOld = []; let labsNew = [];
if (rl) {
  labsOld = [...rl[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  labsNew = labsOld.filter((l) => labs.has(l));
  out = out.replace(/requiredLabs:\s*\[[^\]]*\]/, `requiredLabs: [${labsNew.map((l) => JSON.stringify(l)).join(', ')}]`);
}
const dst = path.join(L.NEW_DIR, 'modules', `module-${nn}.js`);
fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.writeFileSync(dst, out);
const labsSemRequisito = [...labs].filter((l) => !labsOld.includes(l));
console.log(JSON.stringify({ modulo: mod, estimatedHours: `${hOld} -> ${horas}`, minutos: min, requiredLabs: `${labsOld.length} -> ${labsNew.length}`, removidos: labsOld.filter((l) => !labs.has(l)), labsExistentesForaDoRequired: labsSemRequisito, aulas: usadas.join(' ') }));
