// Biblioteca comum das ferramentas de revisão (Node, sem dependências).
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const REV = path.join(ROOT, 'revisao');
const NEW_DIR = path.join(ROOT, 'aulas novas');
const LESSON_DIR = path.join(ROOT, 'data', 'lessons');
const MODULE_DIR = path.join(ROOT, 'data', 'modules');

// Campos que o renderizador exibe dentro de content
const VISIBLE_CONTENT = ['motivation', 'history', 'problem', 'evolution', 'concept', 'internals', 'architecture', 'diagram',
  'analogy', 'simpleExample', 'enterpriseExample', 'cloudExample', 'devsecopsExample', 'securityExample', 'summary', 'nextTheme'];
const INVISIBLE_CONTENT = ['labIntro', 'exercisesIntro', 'challengeIntro', 'solutionIntro'];
// Campos de nível superior que o aluno nunca vê (só busca)
const INVISIBLE_TOP = ['deepDive', 'networkContext', 'commonMistakes', 'protocolFields', 'packetFlow', 'diagnosticCase',
  'estimatedStudyTimeMinutes', 'blueTeamSyntheticDataset', 'finalSimulation', 'domainGapReport', 'capstone'];
const ALLOWED_INVISIBLE_TOP = ['networkContext', 'estimatedStudyTimeMinutes'];

function lessonFileFromId(id) {
  const [m, l] = String(id).split('.');
  const mm = String(m).padStart(2, '0');
  const ll = String(l).padStart(2, '0');
  return { mod: `m${mm}`, file: `lesson-${mm}-${ll}.js`, constName: `lesson${mm}${ll}`, rel: `data/lessons/m${mm}/lesson-${mm}-${ll}.js` };
}

function parseLessonSource(src) {
  const m = src.match(/^(export\s+)?const\s+(lesson\d{4})\s*=\s*/);
  if (!m) throw new Error('cabeçalho da aula não reconhecido');
  const body = src.slice(m[0].length).replace(/;\s*$/, '');
  return { header: m[0], exported: Boolean(m[1]), constName: m[2], obj: JSON.parse(body) };
}

function loadOriginal(id) {
  const f = lessonFileFromId(id);
  const p = path.join(LESSON_DIR, f.mod, f.file);
  const src = fs.readFileSync(p, 'utf8');
  return { ...f, path: p, src, ...parseLessonSource(src) };
}

function loadNew(id) {
  const f = lessonFileFromId(id);
  const p = path.join(NEW_DIR, f.mod, f.file);
  if (!fs.existsSync(p)) return null;
  const src = fs.readFileSync(p, 'utf8');
  return { ...f, path: p, src, ...parseLessonSource(src) };
}

function serializeLesson(header, obj) {
  return header + JSON.stringify(obj, null, 2) + ';\n';
}

// Lista de aulas na ordem do curso (lida dos arquivos de módulo)
function courseOrder() {
  const mods = fs.readdirSync(MODULE_DIR).filter((f) => /^module-\d\d\.js$/.test(f)).sort();
  const out = [];
  for (const mf of mods) {
    const src = fs.readFileSync(path.join(MODULE_DIR, mf), 'utf8');
    const re = /import\s*\{\s*(lesson\d{4})\s*\}\s*from\s*"\.\.\/lessons\/(m\d\d)\/(lesson-\d\d-\d\d\.js)"/g;
    let m;
    while ((m = re.exec(src))) {
      const [, constName, mod, file] = m;
      const mm = Number(file.slice(7, 9)); const ll = Number(file.slice(10, 12));
      out.push({ id: `${mm}.${ll}`, mod, file, constName, module: mf });
    }
  }
  return out;
}

function stripHtml(v = '') {
  return String(v).replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}
function stripSvg(v = '') { return String(v).replace(/<svg[\s\S]*?<\/svg>/gi, ' '); }
function countWords(text = '') { const t = String(text).trim(); return t ? t.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0; }
function htmlWords(html = '') { return countWords(stripHtml(stripSvg(html))); }
function deepText(v) {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'number' || typeof v === 'boolean') return '';
  if (Array.isArray(v)) return v.map(deepText).join(' ');
  if (typeof v === 'object') return Object.values(v).map(deepText).join(' ');
  return '';
}
function deepWords(v) { return countWords(deepText(v)); }
function countSvg(html = '') { return (String(html).match(/<svg\b/gi) || []).length; }

function readJSON(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }
function writeJSON(p, o) { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, JSON.stringify(o, null, 2) + '\n'); }

module.exports = { fs, path, ROOT, REV, NEW_DIR, LESSON_DIR, MODULE_DIR, VISIBLE_CONTENT, INVISIBLE_CONTENT, INVISIBLE_TOP, ALLOWED_INVISIBLE_TOP,
  lessonFileFromId, parseLessonSource, loadOriginal, loadNew, serializeLesson, courseOrder, stripHtml, stripSvg, countWords, htmlWords,
  deepText, deepWords, countSvg, readJSON, writeJSON };
