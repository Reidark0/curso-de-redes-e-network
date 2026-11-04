#!/usr/bin/env node
// Uso: node revisao/tools/validar.js <id>
// Checagens automáticas da seção 8. Sai com código 1 se houver ERRO. Avisos não reprovam,
// mas precisam ser justificados na análise.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const { execFileSync } = require('child_process');
const id = process.argv[2];
if (!id) { console.error('uso: validar <id>'); process.exit(2); }
const erros = []; const avisos = [];
const E = (m) => erros.push(m); const A = (m) => avisos.push(m);

const orig = L.loadOriginal(id);
const f = L.lessonFileFromId(id);
const novoPath = path.join(L.NEW_DIR, f.mod, f.file);
if (!fs.existsSync(novoPath)) { console.log(JSON.stringify({ id, ok: false, erros: ['arquivo novo não existe: rode montar'] })); process.exit(1); }

// 1. sintaxe: carrega como módulo ES e confere a constante
let nova;
try {
  const out = execFileSync(process.execPath, ['--input-type=module', '-e',
    `import(${JSON.stringify('file://' + novoPath)}).then(m=>{const k=Object.keys(m);process.stdout.write(JSON.stringify(k));}).catch(e=>{console.error(e.message);process.exit(1)})`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const exp = JSON.parse(out);
  if (exp.length !== 1 || exp[0] !== orig.constName) E(`exporta ${JSON.stringify(exp)} em vez de ${orig.constName}`);
} catch (e) { E('erro de sintaxe ao carregar o módulo: ' + String(e.stderr || e.message).slice(0, 300)); }
try { nova = L.parseLessonSource(fs.readFileSync(novoPath, 'utf8')); } catch (e) { E('objeto não é JSON válido: ' + e.message); }
if (!nova) { console.log(JSON.stringify({ id, ok: false, erros, avisos }, null, 1)); process.exit(1); }
if (nova.header !== orig.header) E(`cabeçalho diferente: ${nova.header.trim()} x ${orig.header.trim()}`);
const o = orig.obj; const n = nova.obj;

// 2. identidades
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
for (const k of ['id', 'moduleId', 'order']) if (!eq(o[k], n[k])) E(`${k} alterado: ${JSON.stringify(o[k])} -> ${JSON.stringify(n[k])}`);
if (!eq(o.progressRules, n.progressRules)) E('progressRules alterado');
if (o.lab && (!n.lab || n.lab.id !== o.lab.id)) E(`lab.id alterado ou lab removido (${o.lab.id})`);
if (!o.lab && n.lab) A('a nova versão criou um lab que não existia');
if (!eq(o.prerequisites, n.prerequisites)) A('prerequisites alterado (confira continuidade)');

// 3. HTML: tags balanceadas, seções não vazias, envelope, classes
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
function balance(html) {
  const stack = []; const probs = [];
  const s = String(html).replace(/<!--[\s\S]*?-->/g, '');
  const re = /<(\/?)([a-zA-Z][\w:-]*)\b[^>]*?(\/?)>/g; let m;
  while ((m = re.exec(s))) {
    const [, close, tagRaw, self] = m; const tag = tagRaw.toLowerCase();
    if (self || VOID.has(tag)) continue;
    if (!close) stack.push(tag);
    else {
      if (stack[stack.length - 1] === tag) stack.pop();
      else { probs.push(`</${tag}> inesperado (aberto: ${stack.slice(-3).join('>') || 'nada'})`); const i = stack.lastIndexOf(tag); if (i >= 0) stack.length = i; }
    }
  }
  if (stack.length) probs.push(`não fechadas: ${stack.join(', ')}`);
  return probs;
}
const cssClasses = new Set();
for (const cf of fs.readdirSync(path.join(L.ROOT, 'assets', 'css'))) for (const m of fs.readFileSync(path.join(L.ROOT, 'assets', 'css', cf), 'utf8').matchAll(/\.([a-zA-Z][\w-]*)/g)) cssClasses.add(m[1]);
const origClasses = new Set();
const classesOf = (h) => [...String(h).matchAll(/\bclass\s*=\s*["']([^"']*)["']/g)].flatMap((m) => m[1].split(/\s+/).filter(Boolean));
for (const v of Object.values(o.content || {})) classesOf(v).forEach((c) => origClasses.add(c));
const strip = (h) => String(h || '').trim().replace(/^<section\b[^>]*>/i, '').replace(/<\/section>\s*$/i, '').trim().replace(/^<h2\b[^>]*>[\s\S]*?<\/h2>\s*/i, '').trim();
for (const [k, v] of Object.entries(n.content || {})) {
  const p = balance(v); if (p.length) E(`content.${k}: ${p.slice(0, 3).join(' | ')}`);
  const body = strip(v);
  if (!L.stripHtml(body) && !/<svg\b/i.test(body)) E(`content.${k}: seção vazia`);
  if (!/^\s*<section\b[^>]*class\s*=\s*["'][^"']*lesson-section\b[^"']*["'][^>]*>\s*<h2\b/i.test(v)) A(`content.${k}: sem envelope <section class="lesson-section ..."><h2>`);
  const novasCls = [...new Set(classesOf(v))].filter((c) => !cssClasses.has(c) && !origClasses.has(c));
  if (novasCls.length) E(`content.${k}: classes que não existem no CSS nem no original: ${novasCls.join(', ')}`);
  if (/&lt;|&gt;/.test(v) === false && /<(?!\/?(section|h[1-6]|p|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|strong|em|b|i|u|code|pre|svg|g|text|tspan|rect|circle|ellipse|line|polyline|polygon|path|defs|marker|title|desc|div|span|br|hr|small|sup|sub|blockquote|figure|figcaption|caption|dl|dt|dd|details|summary|a|abbr|kbd|mark|time|img|use|foreignObject|linearGradient|stop|pattern|clipPath|mask|symbol|style|nav|article|aside|header|footer|colgroup|col|q|cite|var|samp|s|del|ins)\b)[a-zA-Z]/.test(v)) A(`content.${k}: possível tag desconhecida (texto com "<" não escapado?)`);
}
if (!n.content || !Object.keys(n.content).length) E('content vazio');
if (!n.content?.nextTheme) A('sem content.nextTheme');
if (!n.content?.summary) A('sem content.summary');
// ids dos SVG preservados
const svgIds = (h) => [...String(h).matchAll(/<svg[\s\S]*?<\/svg>/gi)].flatMap((m) => [...m[0].matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map((x) => x[1]));
const idsO = Object.values(o.content || {}).flatMap(svgIds); const idsN = new Set(Object.values(n.content || {}).flatMap(svgIds));
const perdidos = idsO.filter((x) => !idsN.has(x)); if (perdidos.length) A(`ids de SVG do original ausentes na nova: ${perdidos.slice(0, 8).join(', ')}`);
const svgO = Object.values(o.content || {}).reduce((a, v) => a + L.countSvg(v), 0); const svgN = Object.values(n.content || {}).reduce((a, v) => a + L.countSvg(v), 0);
if (svgN < svgO) A(`menos diagramas SVG que o original (${svgO} -> ${svgN})`);
// texto escapado nos campos de texto (o app escapa: HTML em campos de texto aparece cru)
const txt = JSON.stringify({ ...n, content: undefined });
if (/<(p|strong|code|ul|li|br)\b[^>]*>/i.test(txt)) A('há tags HTML em campos de texto (fora de content): o app escapa e mostra a tag crua');

// 4. quiz
const cw = n.progressRules?.completeWhen || {};
const exigeQuiz = 'quizScoreAtLeast' in cw || JSON.stringify(n.progressRules || {}).includes('quizScoreAtLeast');
const quiz = Array.isArray(n.quiz) ? n.quiz : [];
if (exigeQuiz && !quiz.length) E('progressRules exige quiz, mas não há questões');
const ids = new Set();
quiz.forEach((q, i) => {
  const tag = `quiz[${i}]${q.id ? `(${q.id})` : ''}`;
  const velhas = ['q', 'opts', 'a', 'exp', 'correctAnswer', 'correctIndex'].filter((k) => k in q);
  if (velhas.length) { E(`${tag}: formato fora do padrão (${velhas.join(',')}) — rode quiz_normalizar ${id}`); return; }
  if (!q.id) E(`${tag}: sem id`); else if (ids.has(String(q.id))) E(`${tag}: id duplicado`); else ids.add(String(q.id));
  if (typeof q.question !== 'string' || !q.question.trim()) E(`${tag}: question vazia`);
  if (!Array.isArray(q.options) || q.options.length < 2) E(`${tag}: options com menos de 2`);
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options || []).length) E(`${tag}: answer não é índice válido (${JSON.stringify(q.answer)})`);
  if (typeof q.explanation !== 'string' || !q.explanation.trim()) E(`${tag}: explanation vazia`);
  if (Array.isArray(q.options) && new Set(q.options.map((x) => String(x).trim().toLowerCase())).size !== q.options.length) E(`${tag}: opções repetidas`);
  if ((q.options || []).some((x) => /todas as (anteriores|alternativas)|nenhuma das anteriores/i.test(String(x)))) A(`${tag}: opção do tipo "todas/nenhuma das anteriores"`);
});
const origQuizIds = (o.quiz || []).map((q) => q.id).filter(Boolean).map(String);
const faltando = origQuizIds.filter((x) => !ids.has(x));
if (faltando.length) A(`ids de quiz originais ausentes (questões substituídas/removidas?): ${faltando.join(', ')}`);
const tipo = String(n.type || '').toLowerCase();
const simulado = /simulado/.test(tipo) || ['17.3', '17.4', '17.5', '17.6', '17.11'].includes(id);
if (simulado) { if (quiz.length < (o.quiz || []).length) E(`simulado com menos questões (${(o.quiz || []).length} -> ${quiz.length})`); }
else if (quiz.length < 5 || quiz.length > 8) A(`quiz com ${quiz.length} questões (padrão 5–8)`);
// gabarito bem distribuído
if (quiz.length >= 5) { const dist = {}; quiz.filter((q) => Number.isInteger(q.answer)).forEach((q) => { dist[q.answer] = (dist[q.answer] || 0) + 1; }); if (Math.max(...Object.values(dist)) / quiz.length > 0.6) A(`gabarito concentrado: ${JSON.stringify(dist)}`); }

// 5. prática
const oneOf = [...(cw.oneOf || []), ...(cw.anyOf || [])];
if (oneOf.includes('labMarkedDone') && !n.lab && !(oneOf.includes('practicalExerciseDone') && (n.exercises || []).length)) E('oneOf exige labMarkedDone, mas não há lab nem exercícios com practicalExerciseDone');
if (n.lab && (!Array.isArray(n.lab.steps) || !n.lab.steps.length)) E('lab sem passos');

// 6. campos invisíveis
for (const k of L.INVISIBLE_CONTENT) if (n.content && k in n.content) E(`content.${k} (invisível) ainda presente`);
const RENDERED_TOP = ['title', 'subtitle', 'duration', 'difficulty', 'type', 'xp', 'tags', 'objectives', 'learningOutcomes', 'content', 'security', 'troubleshooting', 'lab', 'quiz', 'flashcards', 'mentorQuestions', 'exercises', 'challenge', 'commentedSolution', 'glossary', 'references', 'linksToOtherCourses'];
const META_OK = ['id', 'moduleId', 'order', 'prerequisites', 'progressRules', ...L.ALLOWED_INVISIBLE_TOP];
for (const k of Object.keys(n)) if (!RENDERED_TOP.includes(k) && !META_OK.includes(k)) E(`campo invisível de topo ainda presente: ${k}`);
if (o.networkContext && !n.networkContext) A('networkContext removido (deveria ser mantido)');

// 7. duração
const dm = String(n.duration || '').match(/^(\d+)-(\d+) min$/);
if (!dm) E(`duration fora do formato "X-Y min": ${JSON.stringify(n.duration)}`);
else { if (Number(dm[1]) % 5 || Number(dm[2]) % 5) A('duration não é múltiplo de 5'); if (n.estimatedStudyTimeMinutes !== Number(dm[2])) E(`estimatedStudyTimeMinutes (${n.estimatedStudyTimeMinutes}) != limite superior da duration (${dm[2]})`); }

// 8. quantidades de fixação
const between = (arr, a, b, nome) => { const c = (arr || []).length; if (c < a || c > b) A(`${nome}: ${c} (padrão ${a}–${b})`); };
if (!simulado) { between(n.flashcards, 5, 8, 'flashcards'); between(n.mentorQuestions, 3, 5, 'mentorQuestions'); between(n.exercises, 3, 5, 'exercises'); }
(n.exercises || []).forEach((e, i) => { if (!e.expectedAnswer) A(`exercises[${i}] sem expectedAnswer`); });
// glossário: termos usados na aula
const corpo = L.stripHtml(Object.values(n.content || {}).join(' ')).toLowerCase() + ' ' + L.deepText([n.lab, n.quiz, n.exercises, n.security, n.troubleshooting]).toLowerCase();
(n.glossary || []).forEach((g) => { const t = String(g.term || '').toLowerCase().split(/[\s(/]/)[0]; if (t && t.length > 2 && !corpo.includes(t)) A(`glossário: termo "${g.term}" não aparece no corpo`); });

// 8a. itens de lista precisam ser objetos (string vira card vazio no app)
for (const k of ['quiz', 'flashcards', 'mentorQuestions', 'exercises', 'glossary', 'references', 'linksToOtherCourses']) (n[k] || []).forEach((x, i) => { if (!x || typeof x !== 'object' || Array.isArray(x)) E(`${k}[${i}]: item não é objeto (o app exibiria um card vazio)`); });
const ovp = path.join(L.REV, 'trabalho', id, 'lab_override.json');
if (fs.existsSync(ovp)) { const ov = L.readJSON(ovp); if (!/projeto|capstone|portf/i.test(String(n.type))) E('lab_override.json só vale para projeto/capstone/portfólio (6.10)'); if (!ov.justificativa || !(Number(ov.minutos) > 0)) E('lab_override.json precisa de minutos e justificativa'); if (n.lab && Number(n.lab.estimatedTimeMinutes) !== Number(ov.minutos)) E(`lab.estimatedTimeMinutes (${n.lab.estimatedTimeMinutes}) != override (${ov.minutos})`); }

// 8b. subcampos que o app não mostra
const SUBV = { mentorQuestions: ['id', 'type', 'question', 'hints', 'expectedIdeas', 'explanation'], exercises: ['id', 'type', 'prompt', 'title', 'expectedAnswer', 'explanation', 'difficulty'],
  flashcards: ['id', 'front', 'back', 'tags', 'difficulty'], glossary: ['term', 'shortDefinition', 'definition', 'longDefinition', 'example', 'relatedTerms', 'relatedLessons'] };
for (const [k, keys] of Object.entries(SUBV)) { const extra = [...new Set((n[k] || []).filter((x) => x && typeof x === 'object').flatMap((x) => Object.keys(x).filter((kk) => !keys.includes(kk))))]; if (extra.length) A(`${k}: subcampos que o app não mostra: ${extra.join(', ')}`); }
for (const [k, keys] of Object.entries({ challenge: ['title', 'scenario', 'tasks', 'constraints', 'expectedDeliverables', 'successCriteria', 'gradingRubric', 'difficulty', 'estimatedTimeMinutes'], commentedSolution: ['reasoning', 'steps', 'commonWrongAnswers', 'commonMistakes', 'finalAnswer'], security: ['goodPractices', 'badPractices', 'commonErrors', 'vulnerabilities', 'monitoring', 'hardening', 'detectionIdeas', 'detection'], troubleshooting: ['symptoms', 'diagnosticQuestions', 'commands', 'decisionTree'] })) {
  const extra = Object.keys(n[k] || {}).filter((kk) => !keys.includes(kk)); if (extra.length) A(`${k}: subcampos que o app não mostra: ${extra.join(', ')}`); }
(n.troubleshooting?.commands || []).forEach((c, i) => { const vaz = ['platform', 'command', 'purpose', 'expectedObservation', 'interpretation'].filter((kk) => !c[kk]); if (vaz.length) A(`troubleshooting.commands[${i}]: campos vazios exibidos com rótulo: ${vaz.join(', ')}`); });
(n.security?.vulnerabilities || []).forEach((v, i) => { const vaz = ['name', 'description', 'mitigation'].filter((kk) => !v[kk]); if (!v.defensiveExplanation && !v.exploitationIdea) vaz.push('defensiveExplanation'); if (vaz.length) A(`security.vulnerabilities[${i}]: campos vazios: ${vaz.join(', ')}`); });

// 9. métricas
for (const v of ['original', 'nova']) if (!fs.existsSync(path.join(L.REV, 'trabalho', id, `metricas_${v}.json`))) E(`metricas_${v}.json não calculado (rode metricas ${id} ${v})`);

const res = { id, ok: erros.length === 0, erros, avisos };
console.log(JSON.stringify(res, null, 1));
process.exit(erros.length ? 1 : 0);
