#!/usr/bin/env node
// Uso: node revisao/tools/modulo.js <mXX>
// v2 (fim de módulo): copia data/modules/module-XX.js para "aulas novas/modules/", atualizando só
//   estimatedHours = soma do núcleo (estimatedStudyTimeMinutes) das aulas ÷ 60, arredondado;
//   assessment.requiredLabs = só os labs que existem nas versões finais.
// Versão final de cada aula: v2 se V2 = CONCLUÍDA; senão v1 se a v1 existe; senão o original.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const mod = process.argv[2];
if (!/^m\d\d$/.test(mod || '')) { console.error('uso: modulo <mXX>'); process.exit(2); }
const nn = mod.slice(1);
const src = fs.readFileSync(path.join(L.MODULE_DIR, `module-${nn}.js`), 'utf8');
const st = L.readStatusTable(fs.readFileSync(path.join(L.REV, 'PROGRESSO.md'), 'utf8'));
const aulas = L.courseOrder().filter((o) => o.mod === mod);
let min = 0; let extra = 0; const labs = new Set(); const usadas = [];
for (const a of aulas) {
  const [v, les] = st[a.id]?.v2 === 'CONCLUÍDA' && L.loadNew(a.id) ? ['v2', L.loadNew(a.id)] : (L.loadV1(a.id) ? ['v1', L.loadV1(a.id)] : ['original', L.loadOriginal(a.id)]);
  const obj = les.obj; usadas.push(`${a.id}:${v}`);
  min += Number(obj.estimatedStudyTimeMinutes || 0);
  const mx = String(obj.duration || '').match(/\+ (\d+) min de prática extra/); if (mx) extra += Number(mx[1]);
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
console.log(JSON.stringify({ modulo: mod, estimatedHours: `${hOld} -> ${horas}`, minutosNucleo: min, minutosPraticaExtra: extra, requiredLabs: `${labsOld.length} -> ${labsNew.length}`, removidos: labsOld.filter((l) => !labs.has(l)), labsForaDoRequired: [...labs].filter((l) => !labsOld.includes(l)), aulas: usadas.join(' ') }));
