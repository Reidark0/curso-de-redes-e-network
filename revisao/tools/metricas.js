#!/usr/bin/env node
// Uso: node revisao/tools/metricas.js <id> <original|nova> [--quiet]
// Conta palavras visíveis x invisíveis por campo, quantidades e duração T (fórmula 6.2). Saída JSON
// (também salva em revisao/trabalho/<id>/metricas_<versao>.json).
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const [id, versao = 'original'] = process.argv.slice(2);
if (!id || !['original', 'nova'].includes(versao)) { console.error('uso: metricas <id> <original|nova>'); process.exit(2); }

function load() {
  if (versao === 'original') return L.loadOriginal(id).obj;
  const n = L.loadNew(id); if (!n) { console.error('aula nova não montada: rode montar primeiro'); process.exit(1); } return n.obj;
}
const o = load();
const W = L.deepWords; const H = L.htmlWords;
const pick = (obj, keys) => keys.map((k) => obj?.[k]);

// --- campos visíveis (o que o renderizador exibe)
const LAB_VISIBLE = ['id', 'title', 'objective', 'scenario', 'topology', 'architecture', 'cost', 'prerequisites', 'requirements', 'tools', 'safetyNotes', 'steps', 'expectedResult', 'validation', 'troubleshooting', 'improvements', 'evidenceToCollect', 'questions', 'challenge', 'solution'];
const LAB_META = ['labType', 'estimatedTimeMinutes'];
const STEP_VISIBLE = ['title', 'instruction', 'description', 'action', 'command', 'commands', 'analysisTask', 'analysis', 'calculation', 'configuration', 'artifact', 'evidence', 'expectedOutput', 'expectedResult', 'expected', 'explanation', 'reason', 'interpretation'];
const SEC_VISIBLE = ['goodPractices', 'badPractices', 'commonErrors', 'vulnerabilities', 'monitoring', 'hardening', 'detectionIdeas', 'detection'];
const TS_VISIBLE = ['symptoms', 'diagnosticQuestions', 'commands', 'decisionTree'];
const RENDERED_TOP = ['title', 'subtitle', 'duration', 'difficulty', 'type', 'xp', 'tags', 'objectives', 'learningOutcomes', 'content', 'security', 'troubleshooting', 'lab', 'quiz', 'flashcards', 'mentorQuestions', 'exercises', 'challenge', 'commentedSolution', 'glossary', 'references', 'linksToOtherCourses'];
const META_TOP = ['id', 'moduleId', 'order', 'prerequisites', 'progressRules', 'estimatedStudyTimeMinutes', 'networkContext'];

const content = o.content || {};
const porCampoVisivel = {}; const porCampoInvisivel = {};
let teoria = 0; let svg = 0;
for (const [k, v] of Object.entries(content)) {
  if (L.VISIBLE_CONTENT.includes(k)) { const w = H(v); porCampoVisivel[`content.${k}`] = w; teoria += w; svg += L.countSvg(v); }
  else porCampoInvisivel[`content.${k}`] = H(v);
}
const secW = W(pick(o.security || {}, SEC_VISIBLE)); porCampoVisivel.security = secW; teoria += secW;
const secInv = Object.keys(o.security || {}).filter((k) => !SEC_VISIBLE.includes(k)); if (secInv.length) porCampoInvisivel['security.(outros)'] = W(secInv.map((k) => o.security[k]));
const tsW = W(pick(o.troubleshooting || {}, TS_VISIBLE)); porCampoVisivel.troubleshooting = tsW; teoria += tsW;
const tsInv = Object.keys(o.troubleshooting || {}).filter((k) => !TS_VISIBLE.includes(k)); if (tsInv.length) porCampoInvisivel['troubleshooting.(outros)'] = W(tsInv.map((k) => o.troubleshooting[k]));
const glW = W((o.glossary || []).map((g) => [g.term, g.shortDefinition || g.definition, g.longDefinition, g.example, g.relatedTerms])); porCampoVisivel.glossary = glW; teoria += glW;

const outrosVis = {
  'title+subtitle': W([o.title, o.subtitle]), objectives: W(o.objectives), learningOutcomes: W(o.learningOutcomes),
  quiz: W((o.quiz || []).map((q) => [q.q || q.question, q.opts || q.options, q.exp || q.explanation])),
  flashcards: W((o.flashcards || []).filter((f) => f && typeof f === 'object').map((f) => [f.front, f.back])),
  mentorQuestions: W((o.mentorQuestions || []).filter((m) => m && typeof m === 'object').map((m) => [m.question, m.hints, m.expectedIdeas, m.explanation])),
  exercises: W((o.exercises || []).filter((e) => e && typeof e === 'object').map((e) => [e.prompt || e.title, e.expectedAnswer, e.explanation])),
  challenge: W(o.challenge ? pick(o.challenge, ['title', 'scenario', 'tasks', 'constraints', 'expectedDeliverables', 'successCriteria', 'gradingRubric']) : null),
  commentedSolution: W(o.commentedSolution ? [o.commentedSolution.reasoning, o.commentedSolution.steps, o.commentedSolution.commonWrongAnswers || o.commentedSolution.commonMistakes, o.commentedSolution.finalAnswer] : null),
  references: W((o.references || []).map((r) => [r.title || r.type, r.organization, r.note])),
  linksToOtherCourses: W((o.linksToOtherCourses || []).map((l) => [l.course, l.module, l.lesson, l.reason]))
};
let labWords = 0; let labSteps = 0;
if (o.lab) {
  const lab = o.lab; labSteps = Array.isArray(lab.steps) ? lab.steps.length : 0;
  const steps = (lab.steps || []).map((s) => (typeof s === 'string' ? s : pick(s, STEP_VISIBLE)));
  labWords = W([pick(lab, LAB_VISIBLE.filter((k) => k !== 'steps')), steps]);
  outrosVis.lab = labWords;
  const labInv = Object.keys(lab).filter((k) => !LAB_VISIBLE.includes(k) && !LAB_META.includes(k));
  if (labInv.length) porCampoInvisivel['lab.(ocultos: ' + labInv.join(',') + ')'] = W(labInv.map((k) => lab[k]));
}
Object.assign(porCampoVisivel, outrosVis);
for (const k of Object.keys(o)) {
  if (RENDERED_TOP.includes(k) || ['id', 'moduleId', 'order', 'prerequisites', 'progressRules', 'estimatedStudyTimeMinutes'].includes(k)) continue;
  porCampoInvisivel[k] = W(o[k]);
}
const SUB = { mentorQuestions: ['id', 'type', 'question', 'hints', 'expectedIdeas', 'explanation'], exercises: ['id', 'type', 'prompt', 'title', 'expectedAnswer', 'explanation', 'difficulty'],
  flashcards: ['id', 'front', 'back', 'tags', 'difficulty'], glossary: ['term', 'shortDefinition', 'definition', 'longDefinition', 'example', 'relatedTerms', 'relatedLessons'],
  references: ['type', 'title', 'organization', 'url', 'note'], linksToOtherCourses: ['course', 'module', 'lesson', 'reason'] };
const SUBOBJ = { challenge: ['title', 'scenario', 'tasks', 'constraints', 'expectedDeliverables', 'successCriteria', 'gradingRubric', 'difficulty', 'estimatedTimeMinutes'],
  commentedSolution: ['reasoning', 'steps', 'commonWrongAnswers', 'commonMistakes', 'finalAnswer'] };
for (const [k, keys] of Object.entries(SUB)) { const strs = (o[k] || []).filter((x) => typeof x === 'string'); if (strs.length) porCampoInvisivel[`${k}.(itens em string, não exibidos)`] = W(strs);
  const inv = (o[k] || []).filter((x) => x && typeof x === 'object').flatMap((x) => Object.keys(x).filter((kk) => !keys.includes(kk)).map((kk) => x[kk])); if (inv.length) porCampoInvisivel[`${k}.(subcampos ocultos)`] = W(inv); }
for (const [k, keys] of Object.entries(SUBOBJ)) { const x = o[k] || {}; const inv = Object.keys(x).filter((kk) => !keys.includes(kk)); if (inv.length) porCampoInvisivel[`${k}.(ocultos: ${inv.join(',')})`] = W(inv.map((kk) => x[kk])); }
const visiveis = Object.values(porCampoVisivel).reduce((a, b) => a + b, 0);
const invisiveis = Object.values(porCampoInvisivel).reduce((a, b) => a + b, 0);

// --- quantidades
const q = {
  quiz: (o.quiz || []).length, flashcards: (o.flashcards || []).length, mentor: (o.mentorQuestions || []).length,
  exercicios: (o.exercises || []).length, passosLab: labSteps, diagramasSvg: svg, desafio: Boolean(o.challenge || o.commentedSolution)
};
// --- duração (6.2)
const tTeoria = teoria / 130;
const labAlt = labSteps * 5 + labWords / 130;
const labDecl = Number(o.lab?.estimatedTimeMinutes || 0);
const labPlaus = Boolean(o.lab) && labDecl > 0 && labDecl >= 0.5 * labAlt && labDecl <= 2 * labAlt;
const ovPath = path.join(L.REV, 'trabalho', id, 'lab_override.json');
const override = versao === 'nova' && o.lab && fs.existsSync(ovPath) ? L.readJSON(ovPath) : null;
const tLab = !o.lab ? 0 : (override ? Number(override.minutos) : (labPlaus ? labDecl : labAlt));
const parts = { teoria: tTeoria, diagramas: 3 * svg, quiz: q.quiz, flashcards: 0.5 * q.flashcards, mentor: 2 * q.mentor, exercicios: 6 * q.exercicios, desafio: q.desafio ? 20 : 0, lab: tLab };
const T = Object.values(parts).reduce((a, b) => a + b, 0);
const r5 = (x) => Math.max(5, Math.round(x / 5) * 5);
const faixa = [r5(0.85 * T), r5(1.2 * T)];
const dm = String(o.duration || '').match(/(\d+)\s*[-–]\s*(\d+)/);
const declarada = dm ? [Number(dm[1]), Number(dm[2])] : null;
const M = declarada ? (declarada[0] + declarada[1]) / 2 : null;
let veredito = 'SEM_DURACAO';
if (M != null) veredito = M > 1.2 * T ? 'INFLADA' : (M < 0.8 * T ? 'SUBESTIMADA' : 'ORGANIZADA (checar equilíbrio)');
const round1 = (x) => Math.round(x * 10) / 10;
const res = {
  id, versao, titulo: o.title, tipo: o.type,
  palavras: { visiveis, invisiveis, teoriaVisivel: teoria },
  porCampoVisivel, porCampoInvisivel, quantidades: q,
  lab: o.lab ? { override: override ? `${override.minutos} min — ${override.justificativa}` : null, estimatedTimeMinutes: labDecl, alternativa_5minPasso_maisLeitura: round1(labAlt), plausivel: labPlaus, palavras: labWords } : null,
  duracao: { declarada: o.duration, estimatedStudyTimeMinutes: o.estimatedStudyTimeMinutes, M, T: round1(T), partes: Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, round1(v)])),
    faixaRecomendada: `${faixa[0]}-${faixa[1]} min`, vereditoAutomatico: veredito, pctTeoria: Math.round((tTeoria + 3 * svg) / T * 100) }
};
L.writeJSON(path.join(L.REV, 'trabalho', id, `metricas_${versao}.json`), res);
console.log(JSON.stringify(res, null, process.argv.includes('--compact') ? 0 : 1));
