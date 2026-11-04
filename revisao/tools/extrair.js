#!/usr/bin/env node
// Uso: node revisao/tools/extrair.js <id> [--base v1|original]
// v2: cria revisao/trabalho_v2/<id>/
//   base/      = a versão de partida (v1 de revisao/v1/aulas/ quando existe; senão o original de data/lessons/)
//   original/  = o original (só quando a base é a v1), para recuperar algo que a v1 tenha perdido
//   nova/      = cópia da base, onde a reescrita é feita
// Cada pasta tem meta.json (tudo menos content), content/<chave>.html e content_order.json.
// Sem --base: usa v1 se existir, senão original. Se nova/ já existir, ela é renomeada (nada é apagado).
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--') && /^\d+\.\d+$/.test(a));
const bi = args.indexOf('--base');
let base = bi >= 0 ? args[bi + 1] : null;
if (!id || (base && !['v1', 'original'].includes(base))) { console.error('uso: extrair <id> [--base v1|original]'); process.exit(2); }
const v1 = L.loadV1(id);
if (!base) base = v1 ? 'v1' : 'original';
if (base === 'v1' && !v1) { console.error(`a aula ${id} não tem versão v1`); process.exit(1); }
const orig = L.loadOriginal(id);
const baseLes = base === 'v1' ? v1 : orig;
const dir = path.join(L.WORK, id);
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
for (const sub of ['base', 'original', 'nova']) { const p = path.join(dir, sub); if (fs.existsSync(p)) fs.renameSync(p, path.join(dir, `${sub}_anterior_${stamp}`)); }
function dump(les, out) {
  const { content, ...meta } = les.obj;
  fs.mkdirSync(path.join(out, 'content'), { recursive: true });
  L.writeJSON(path.join(out, 'meta.json'), meta);
  L.writeJSON(path.join(out, 'content_order.json'), { topLevelOrder: Object.keys(les.obj), contentOrder: Object.keys(content || {}), header: orig.header, constName: orig.constName });
  for (const [k, v] of Object.entries(content || {})) fs.writeFileSync(path.join(out, 'content', `${k}.html`), String(v));
}
dump(baseLes, path.join(dir, 'base'));
if (base === 'v1') dump(orig, path.join(dir, 'original'));
fs.cpSync(path.join(dir, 'base'), path.join(dir, 'nova'), { recursive: true });
L.writeJSON(path.join(dir, 'base.json'), { id, base, extraidoEm: new Date().toISOString() });
console.log(JSON.stringify({ id, base, arquivoOriginal: orig.rel, constante: orig.constName, chavesContent: Object.keys(baseLes.obj.content || {}).length,
  pastas: { base: path.relative(L.ROOT, path.join(dir, 'base')), original: base === 'v1' ? path.relative(L.ROOT, path.join(dir, 'original')) : '(a base já é o original)', nova: path.relative(L.ROOT, path.join(dir, 'nova')) } }));
