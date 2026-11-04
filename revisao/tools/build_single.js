#!/usr/bin/env node
// Uso: node revisao/tools/build_single.js
// v2: gera redes_e_network_v2_1_single.html a partir do single original (molde), trocando
//   - cada /* data/lessons/mXX/lesson-XX-YY.js */ pela versão final da aula (v2 se V2 = CONCLUÍDA; senão v1; senão original);
//   - cada /* data/modules/module-XX.js */ pela cópia em "aulas novas/modules/" (se existir);
//   - cada /* assets/js/... */ pelo arquivo atual de assets/js (as mudanças do app da v2).
// Linhas import são removidas e o prefixo "export " é tirado, como no molde. O CSS embutido do molde é mantido (a v2 não altera assets/css).
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const SRC = path.join(L.ROOT, 'redes_e_network_v2_0_single.html');
const OUT = path.join(L.ROOT, 'redes_e_network_v2_1_single.html');
const html = fs.readFileSync(SRC, 'utf8');
const st = L.readStatusTable(fs.readFileSync(path.join(L.REV, 'PROGRESSO.md'), 'utf8'));
const transform = (src) => src.split('\n').filter((l) => !/^import\s.*\sfrom\s.*;\s*$/.test(l)).join('\n').replace(/^export /mg, '');
const re = /^\/\* (data\/[^ ]+\.js|assets\/js\/[^ ]+\.js) \*\/\n/mg;
const marks = []; let m;
while ((m = re.exec(html))) marks.push({ p: m[1], start: m.index, bodyStart: m.index + m[0].length });
const scriptEnd = html.lastIndexOf('</script>');
let out = ''; let cursor = 0; const usados = { v2: 0, v1: [], original: [], modulosNovos: 0, modulosOriginais: [], js: 0 };
for (let i = 0; i < marks.length; i++) {
  const mk = marks[i]; const end = i + 1 < marks.length ? marks[i + 1].start : scriptEnd;
  const body = html.slice(mk.bodyStart, end); const trailing = body.match(/\s*$/)[0];
  let repl = null;
  const lm = mk.p.match(/^data\/lessons\/(m\d\d)\/lesson-(\d\d)-(\d\d)\.js$/);
  const mm = mk.p.match(/^data\/modules\/(module-\d\d\.js)$/);
  if (lm) {
    const id = `${Number(lm[2])}.${Number(lm[3])}`;
    const np = path.join(L.NEW_DIR, lm[1], `lesson-${lm[2]}-${lm[3]}.js`); const v1p = path.join(L.V1_DIR, lm[1], `lesson-${lm[2]}-${lm[3]}.js`);
    if (st[id]?.v2 === 'CONCLUÍDA' && fs.existsSync(np)) { repl = transform(fs.readFileSync(np, 'utf8')); usados.v2++; }
    else if (fs.existsSync(v1p)) { repl = transform(fs.readFileSync(v1p, 'utf8')); usados.v1.push(id); }
    else usados.original.push(id);
  } else if (mm) {
    const np = path.join(L.NEW_DIR, 'modules', mm[1]);
    if (fs.existsSync(np)) { repl = transform(fs.readFileSync(np, 'utf8')); usados.modulosNovos++; } else usados.modulosOriginais.push(mm[1]);
  } else if (mk.p.startsWith('assets/js/')) { repl = transform(fs.readFileSync(path.join(L.ROOT, mk.p), 'utf8')); usados.js++; }
  out += html.slice(cursor, mk.bodyStart);
  out += repl == null ? body : repl.trimEnd() + trailing;
  cursor = end;
}
out += html.slice(cursor);
fs.writeFileSync(OUT, out);
console.log(JSON.stringify({ saida: path.relative(L.ROOT, OUT), bytes: out.length, blocos: marks.length, aulasV2: usados.v2, aulasV1: usados.v1.length, aulasOriginais: usados.original.length, modulosNovos: usados.modulosNovos, jsDoApp: usados.js }));
