#!/usr/bin/env node
// Uso: node revisao/tools/build_single.js
// Gera redes_e_network_v2_1_single.html a partir do single original (molde), trocando cada bloco
// /* data/lessons/mXX/lesson-XX-YY.js */ pela aula nova (sem "export ") e cada /* data/modules/module-XX.js */
// pela cópia em "aulas novas/modules/" (sem imports e sem "export "). Aulas FALHOU ou sem versão nova usam o original.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const SRC = path.join(L.ROOT, 'redes_e_network_v2_0_single.html');
const OUT = path.join(L.ROOT, 'redes_e_network_v2_1_single.html');
const html = fs.readFileSync(SRC, 'utf8');
const prog = fs.readFileSync(path.join(L.REV, 'PROGRESSO.md'), 'utf8');
const status = {}; for (const m of prog.matchAll(/^\| (\d+\.\d+) \| [^|]+ \| ([^|]+) \|/mg)) status[m[1]] = m[2].trim();
const transform = (src) => src.split('\n').filter((l) => !/^import\s.*\sfrom\s.*;\s*$/.test(l)).join('\n').replace(/^export /mg, '');
const re = /^\/\* (data\/[^ ]+\.js|assets\/js\/[^ ]+\.js) \*\/\n/mg;
const marks = []; let m;
while ((m = re.exec(html))) marks.push({ p: m[1], start: m.index, bodyStart: m.index + m[0].length });
const scriptEnd = html.lastIndexOf('</script>');
let out = ''; let cursor = 0; const usados = { aulasNovas: 0, aulasOriginais: [], modulosNovos: 0, modulosOriginais: [] };
for (let i = 0; i < marks.length; i++) {
  const mk = marks[i]; const end = i + 1 < marks.length ? marks[i + 1].start : scriptEnd;
  const body = html.slice(mk.bodyStart, end); const trailing = body.match(/\s*$/)[0];
  let repl = null;
  const lm = mk.p.match(/^data\/lessons\/(m\d\d)\/lesson-(\d\d)-(\d\d)\.js$/);
  const mm = mk.p.match(/^data\/modules\/(module-\d\d\.js)$/);
  if (lm) {
    const id = `${Number(lm[2])}.${Number(lm[3])}`;
    const np = path.join(L.NEW_DIR, lm[1], `lesson-${lm[2]}-${lm[3]}.js`);
    if (fs.existsSync(np) && status[id] === 'CONCLUÍDA') { repl = transform(fs.readFileSync(np, 'utf8')); usados.aulasNovas++; } else usados.aulasOriginais.push(`${id}(${status[id] || '?'})`);
  } else if (mm) {
    const np = path.join(L.NEW_DIR, 'modules', mm[1]);
    if (fs.existsSync(np)) { repl = transform(fs.readFileSync(np, 'utf8')); usados.modulosNovos++; } else usados.modulosOriginais.push(mm[1]);
  }
  out += html.slice(cursor, mk.bodyStart);
  out += repl == null ? body : repl.trimEnd() + trailing;
  cursor = end;
}
out += html.slice(cursor);
fs.writeFileSync(OUT, out);
console.log(JSON.stringify({ saida: path.relative(L.ROOT, OUT), bytes: out.length, blocos: marks.length, ...usados, aulasOriginais: usados.aulasOriginais.length ? usados.aulasOriginais : 0 }));
