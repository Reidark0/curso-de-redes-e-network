#!/usr/bin/env node
// Uso: node revisao/tools/montar.js <id>
// Monta "aulas novas/mXX/lesson-XX-YY.js" a partir de revisao/trabalho/<id>/nova/.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const id = process.argv[2];
if (!id) { console.error('uso: montar <id>'); process.exit(2); }
const base = path.join(L.REV, 'trabalho', id);
const nova = path.join(base, 'nova');
const info = L.readJSON(path.join(base, 'original', 'content_order.json'));
const meta = L.readJSON(path.join(nova, 'meta.json'));
if ('content' in meta) { console.error('ERRO: meta.json não deve ter "content"'); process.exit(1); }
const cdir = path.join(nova, 'content');
const files = fs.existsSync(cdir) ? fs.readdirSync(cdir).filter((f) => f.endsWith('.html')) : [];
const present = new Set(files.map((f) => f.slice(0, -5)));
const content = {};
for (const k of info.contentOrder) if (present.has(k)) content[k] = fs.readFileSync(path.join(cdir, `${k}.html`), 'utf8');
const extra = [...present].filter((k) => !info.contentOrder.includes(k)).sort();
for (const k of extra) content[k] = fs.readFileSync(path.join(cdir, `${k}.html`), 'utf8');
// ordem das chaves de topo: a original; chaves novas no fim
const obj = {};
for (const k of info.topLevelOrder) { if (k === 'content') obj.content = content; else if (k in meta) obj[k] = meta[k]; }
for (const k of Object.keys(meta)) if (!(k in obj)) obj[k] = meta[k];
const f = L.lessonFileFromId(id);
const out = path.join(L.NEW_DIR, f.mod, f.file);
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, L.serializeLesson(info.header, obj));
console.log(JSON.stringify({ id, saida: path.relative(L.ROOT, out), chavesContent: Object.keys(content).length, chavesNovasContent: extra, bytes: fs.statSync(out).size }));
