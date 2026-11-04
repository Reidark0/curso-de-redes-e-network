#!/usr/bin/env node
// Uso: node revisao/tools/metricas.js <id> <original|v1|nova> [--compact]
// v2 (CRITERIOS_V2 seção 6):
//   Núcleo N = palavras de teoria visível ÷ 130 + 3 min/diagrama + 1 min/questão do quiz
//     teoria = Introdução (objectives, learningOutcomes, motivation, summary, glossary) + Contexto (history, problem, evolution)
//            + Conteúdo (concept, internals, architecture, texto do diagram fora do <svg>) + Exemplos (analogy, simpleExample, 4 por ambiente)
//            + security + troubleshooting (campos exibidos)
//   Prática extra = lab (estimatedTimeMinutes se plausível; senão 5 min/passo) + 2 min/mentor + 6 min/exercício + 15 min de desafio com solução
//   Faixa do núcleo = [0,85N ; 1,2N] em múltiplos de 5; prática extra arredondada para múltiplo de 5.
// Também conta as palavras visíveis totais (mesma definição da v1, para comparar original → v1 → v2).
// Salva revisao/trabalho_v2/<id>/metricas_<versao>.json.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const [id, versao = 'nova'] = process.argv.slice(2);
if (!id || !['original', 'v1', 'nova'].includes(versao)) { console.error('uso: metricas <id> <original|v1|nova>'); process.exit(2); }
const les = L.loadVersion(id, versao);
if (!les) { console.error(versao === 'nova' ? 'aula nova não montada: rode montar primeiro' : `a aula ${id} não tem versão ${versao}`); process.exit(1); }
const o = les.obj;
const W = L.deepWords; const H = L.htmlWords;
const pick = (obj, keys) => keys.map((k) => obj?.[k]);
const STEP_VISIBLE = ['title', 'instruction', 'description', 'action', 'command', 'commands', 'analysisTask', 'analysis', 'calculation', 'configuration', 'artifact', 'evidence', 'expectedOutput', 'expectedResult', 'expected', 'explanation', 'reason', 'interpretation'];
const LAB_VISIBLE = ['title', 'objective', 'scenario', 'topology', 'architecture', 'cost', 'prerequisites', 'requirements', 'tools', 'safetyNotes', 'expectedResult', 'validation', 'troubleshooting', 'improvements', 'evidenceToCollect', 'questions', 'challenge', 'solution'];
const SEC_VISIBLE = ['goodPractices', 'badPractices', 'commonErrors', 'vulnerabilities', 'monitoring', 'hardening', 'detectionIdeas', 'detection'];
const TS_VISIBLE = ['symptoms', 'diagnosticQuestions', 'commands', 'decisionTree'];
const GRUPOS = {
  introducao: ['motivation', 'summary'], contexto: ['history', 'problem', 'evolution'], conteudo: ['concept', 'internals', 'architecture', 'diagram'],
  exemplos: ['analogy', 'simpleExample', ...L.ENV_EXAMPLES]
};
const c = o.content || {};
const porSecao = {}; const porGrupo = { introducao: 0, contexto: 0, conteudo: 0, exemplos: 0, seguranca_troubleshooting: 0 };
let svg = 0;
for (const [g, keys] of Object.entries(GRUPOS)) for (const k of keys) if (c[k]) { const w = H(c[k]); porSecao[k] = w; porGrupo[g] += w; svg += L.countSvg(c[k]); }
porSecao.objectives = W(o.objectives); porSecao.learningOutcomes = W(o.learningOutcomes);
porSecao.glossary = W((o.glossary || []).map((g) => [g.term, g.shortDefinition || g.definition, g.longDefinition, g.example, g.relatedTerms]));
porGrupo.introducao += porSecao.objectives + porSecao.learningOutcomes + porSecao.glossary;
porSecao.security = W(pick(o.security || {}, SEC_VISIBLE)); porSecao.troubleshooting = W(pick(o.troubleshooting || {}, TS_VISIBLE));
porGrupo.seguranca_troubleshooting = porSecao.security + porSecao.troubleshooting;
if (c.nextTheme) porSecao.nextTheme = H(c.nextTheme);
const teoria = Object.values(porGrupo).reduce((a, b) => a + b, 0);

const labSteps = Array.isArray(o.lab?.steps) ? o.lab.steps.length : 0;
const labWords = o.lab ? W([pick(o.lab, LAB_VISIBLE), (o.lab.steps || []).map((s) => (typeof s === 'string' ? s : pick(s, STEP_VISIBLE)))]) : 0;
const pratica = {
  quiz: W((o.quiz || []).map((q) => [q.q || q.question, q.opts || q.options, q.exp || q.explanation])),
  flashcards: W((o.flashcards || []).filter((f) => f && typeof f === 'object').map((f) => [f.front, f.back])),
  lab: labWords,
  mentorQuestions: W((o.mentorQuestions || []).filter((m) => m && typeof m === 'object').map((m) => [m.question, m.hints, m.expectedIdeas, m.explanation])),
  exercises: W((o.exercises || []).filter((e) => e && typeof e === 'object').map((e) => [e.prompt || e.title, e.expectedAnswer, e.explanation])),
  challenge: W(o.challenge ? pick(o.challenge, ['title', 'scenario', 'tasks', 'constraints', 'expectedDeliverables', 'successCriteria', 'gradingRubric']) : null),
  commentedSolution: W(o.commentedSolution ? [o.commentedSolution.reasoning, o.commentedSolution.steps, o.commentedSolution.commonWrongAnswers || o.commentedSolution.commonMistakes, o.commentedSolution.finalAnswer] : null)
};
const outros = { 'title+subtitle': W([o.title, o.subtitle]), nextTheme: porSecao.nextTheme || 0,
  references: W((o.references || []).map((r) => [r.title || r.type, r.organization, r.note])),
  linksToOtherCourses: W((o.linksToOtherCourses || []).map((l) => [l.course, l.module, l.lesson, l.reason])) };
const visiveis = teoria + Object.values(pratica).reduce((a, b) => a + b, 0) + Object.values(outros).reduce((a, b) => a + b, 0);
const palavrasPraticaExtra = pratica.lab + pratica.mentorQuestions + pratica.exercises + pratica.challenge + pratica.commentedSolution;

const q = { quiz: (o.quiz || []).length, flashcards: (o.flashcards || []).length, mentor: (o.mentorQuestions || []).length, exercicios: (o.exercises || []).length,
  passosLab: labSteps, diagramasSvg: svg, desafio: Boolean(o.challenge || o.commentedSolution), objetivos: (o.objectives || []).length, glossario: (o.glossary || []).length,
  exemplosPorAmbiente: L.ENV_EXAMPLES.filter((k) => c[k]) };
// lab: plausível = estimatedTimeMinutes entre 0,5× e 2× de 5 min/passo
const labAlt = labSteps * 5;
const labDecl = Number(o.lab?.estimatedTimeMinutes || 0);
const labPlaus = Boolean(o.lab) && labDecl > 0 && labDecl >= 0.5 * labAlt && labDecl <= 2 * labAlt;
const ovPath = path.join(L.WORK, id, 'lab_override.json');
const override = versao === 'nova' && o.lab && fs.existsSync(ovPath) ? L.readJSON(ovPath) : null;
const tLab = !o.lab ? 0 : (override ? Number(override.minutos) : (labPlaus ? labDecl : labAlt));
const nucleoPartes = { teoria: teoria / 130, diagramas: 3 * svg, quiz: q.quiz };
const extraPartes = { lab: tLab, mentor: 2 * q.mentor, exercicios: 6 * q.exercicios, desafio: q.desafio ? 15 : 0 };
const N = Object.values(nucleoPartes).reduce((a, b) => a + b, 0);
const X = Object.values(extraPartes).reduce((a, b) => a + b, 0);
const r5 = (x) => Math.max(5, Math.round(x / 5) * 5);
const faixa = [r5(0.85 * N), r5(1.2 * N)];
if (faixa[1] <= faixa[0]) faixa[1] = faixa[0] + 5;
const extra = X > 0 ? r5(X) : 0;
const recomendada = `${faixa[0]}-${faixa[1]} min${extra ? ` + ${extra} min de prática extra` : ''}`;
const round1 = (x) => Math.round(x * 10) / 10;
const res = {
  id, versao, titulo: o.title, tipo: o.type,
  palavras: { visiveis, teoria, praticaExtra: palavrasPraticaExtra, quiz: pratica.quiz, flashcards: pratica.flashcards },
  porGrupoTeoria: porGrupo, porSecao, pratica, outros, quantidades: q,
  lab: o.lab ? { estimatedTimeMinutes: labDecl, alternativa_5minPorPasso: labAlt, plausivel: labPlaus, override: override ? `${override.minutos} min — ${override.justificativa}` : null, palavras: labWords } : null,
  duracao: {
    declarada: o.duration, estimatedStudyTimeMinutes: o.estimatedStudyTimeMinutes,
    nucleo: round1(N), nucleoPartes: Object.fromEntries(Object.entries(nucleoPartes).map(([k, v]) => [k, round1(v)])),
    praticaExtra: round1(X), praticaExtraPartes: extraPartes,
    faixaNucleo: `${faixa[0]}-${faixa[1]} min`, praticaExtraArredondada: extra, recomendada, estimatedStudyTimeMinutesRecomendado: faixa[1]
  }
};
const outDir = path.join(L.WORK, id); fs.mkdirSync(outDir, { recursive: true });
L.writeJSON(path.join(outDir, `metricas_${versao}.json`), res);
console.log(JSON.stringify(res, null, process.argv.includes('--compact') ? 0 : 1));
