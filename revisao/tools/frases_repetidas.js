#!/usr/bin/env node
// Uso: node revisao/tools/frases_repetidas.js            -> gera revisao/frases_repetidas.md e tools/frases_index.json
//      node revisao/tools/frases_repetidas.js <id>       -> lista as frases repetidas (≥8 palavras, ≥3 aulas) presentes nessa aula
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const N = 8; const MIN = 3;
const idxPath = path.join(__dirname, 'frases_index.json');
const tokens = (txt) => L.stripHtml(L.stripSvg(txt)).toLowerCase().normalize('NFC').split(/[^\p{L}\p{N}]+/u).filter(Boolean);
function lessonText(obj) {
  const { content = {}, ...rest } = obj;
  // ignora identificadores e metadados
  const drop = ['id', 'moduleId', 'order', 'progressRules', 'prerequisites', 'tags', 'duration', 'estimatedStudyTimeMinutes', 'xp', 'difficulty', 'type'];
  const r = Object.fromEntries(Object.entries(rest).filter(([k]) => !drop.includes(k)));
  // separa em segmentos (cada string é um segmento) para não juntar frases de campos diferentes
  const segs = [];
  for (const v of Object.values(content)) segs.push(...String(v).split(/<\/(?:p|li|h\d|td|th|div|pre)>/i));
  (function walk(x) { if (typeof x === 'string') segs.push(x); else if (Array.isArray(x)) x.forEach(walk); else if (x && typeof x === 'object') Object.values(x).forEach(walk); })(r);
  return segs.map(tokens).filter((t) => t.length >= N);
}
const arg = process.argv[2];
if (!arg) {
  const order = L.courseOrder();
  const segsBy = {}; const freq = new Map();
  for (const o of order) {
    const segs = lessonText(L.loadOriginal(o.id).obj); segsBy[o.id] = segs;
    const seen = new Set();
    for (const t of segs) for (let i = 0; i + N <= t.length; i++) seen.add(t.slice(i, i + N).join(' '));
    for (const s of seen) freq.set(s, (freq.get(s) || 0) + 1);
  }
  const phrases = new Map(); // frase -> Set(ids)
  for (const o of order) for (const t of segsBy[o.id]) {
    let i = 0;
    while (i + N <= t.length) {
      if ((freq.get(t.slice(i, i + N).join(' ')) || 0) >= MIN) {
        let j = i; while (j + 1 + N <= t.length && (freq.get(t.slice(j + 1, j + 1 + N).join(' ')) || 0) >= MIN) j++;
        const ph = t.slice(i, j + N).join(' ');
        if (!phrases.has(ph)) phrases.set(ph, new Set()); phrases.get(ph).add(o.id);
        i = j + N;
      } else i++;
    }
  }
  let list = [...phrases.entries()].map(([p, s]) => ({ p, ids: [...s], n: s.size })).filter((x) => x.n >= MIN);
  list.sort((a, b) => b.n - a.n || b.p.length - a.p.length);
  const kept = [];
  for (const x of list) if (!kept.some((k) => k.p.includes(x.p) && k.n >= x.n)) kept.push(x);
  fs.writeFileSync(idxPath, JSON.stringify(kept.map((k) => ({ p: k.p, n: k.n, ids: k.ids }))));
  const top = kept.slice(0, 150);
  const sortIds = (ids) => ids.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  let md = `# Frases repetidas entre aulas\n\nGerado por \`revisao/tools/frases_repetidas.js\` (originais). Frases de ${N}+ palavras (texto normalizado: minúsculas, sem pontuação) que aparecem em ${MIN}+ aulas. Total de frases distintas: ${kept.length}. Abaixo, as 150 mais frequentes. Para ver as frases repetidas de UMA aula: \`node revisao/tools/frases_repetidas.js <id>\`.\n\n**Uso:** é ferramenta de apoio. Uma frase repetida só é linguiça se não acrescentar nada à aula em questão (6.3).\n\n| # | aulas | frase | ids |\n|---|---|---|---|\n`;
  top.forEach((k, i) => { const ph = k.p.length > 200 ? k.p.slice(0, 200) + '…' : k.p; const ids = sortIds(k.ids); md += `| ${i + 1} | ${k.n} | ${ph} | ${ids.length > 14 ? ids.slice(0, 14).join(' ') + ` … (+${ids.length - 14})` : ids.join(' ')} |\n`; });
  fs.writeFileSync(path.join(L.REV, 'frases_repetidas.md'), md);
  console.log(JSON.stringify({ frasesDistintas: kept.length, top5: kept.slice(0, 5).map((k) => `${k.n}: ${k.p.slice(0, 80)}`) }, null, 1));
} else {
  const idx = JSON.parse(fs.readFileSync(idxPath, 'utf8'));
  const mine = idx.filter((k) => k.ids.includes(arg));
  console.log(`Aula ${arg}: ${mine.length} frases repetidas (≥${N} palavras, ≥${MIN} aulas). Formato: [nº de aulas] frase`);
  for (const k of mine.slice(0, 80)) console.log(`[${k.n}] ${k.p.length > 260 ? k.p.slice(0, 260) + '…' : k.p}`);
  if (mine.length > 80) console.log(`… +${mine.length - 80}`);
}
