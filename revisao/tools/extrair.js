#!/usr/bin/env node
// Uso: node revisao/tools/extrair.js <id>
// Cria revisao/trabalho/<id>/original/{meta.json,content/<chave>.html,content_order.json} e copia para nova/.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const id = process.argv[2];
if (!id) { console.error('uso: extrair <id>'); process.exit(2); }
const les = L.loadOriginal(id);
const base = path.join(L.REV, 'trabalho', id);
const orig = path.join(base, 'original');
const nova = path.join(base, 'nova');
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
if (fs.existsSync(orig)) fs.renameSync(orig, path.join(base, `original_anterior_${stamp}`));
if (fs.existsSync(nova)) fs.renameSync(nova, path.join(base, `nova_descartada_${stamp}`));
const { content, ...meta } = les.obj;
const order = Object.keys(les.obj);
fs.mkdirSync(path.join(orig, 'content'), { recursive: true });
L.writeJSON(path.join(orig, 'meta.json'), meta);
L.writeJSON(path.join(orig, 'content_order.json'), { topLevelOrder: order, contentOrder: Object.keys(content || {}), header: les.header, constName: les.constName });
for (const [k, v] of Object.entries(content || {})) fs.writeFileSync(path.join(orig, 'content', `${k}.html`), String(v));
fs.cpSync(orig, nova, { recursive: true });
const visible = Object.keys(content || {}).filter((k) => L.VISIBLE_CONTENT.includes(k));
console.log(JSON.stringify({ id, arquivo: les.rel, constante: les.constName, chavesContent: Object.keys(content || {}).length, visiveis: visible.length,
  camposTopo: Object.keys(meta).length, original: path.relative(L.ROOT, orig), nova: path.relative(L.ROOT, nova) }));
