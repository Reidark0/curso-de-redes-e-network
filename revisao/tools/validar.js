#!/usr/bin/env node
// Uso: node revisao/tools/validar.js <id>
// v2 (CRITERIOS_V2 seção 7). Sai com código 1 se houver ERRO. Avisos não reprovam, mas precisam ser justificados na análise.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const { execFileSync } = require('child_process');
const id = process.argv[2];
if (!id) { console.error('uso: validar <id>'); process.exit(2); }
const erros = []; const avisos = [];
const E = (m) => erros.push(m); const A = (m) => avisos.push(m);

const orig = L.loadOriginal(id);
const v1 = L.loadV1(id);
const baseInfo = fs.existsSync(path.join(L.WORK, id, 'base.json')) ? L.readJSON(path.join(L.WORK, id, 'base.json')) : { base: v1 ? 'v1' : 'original' };
const base = baseInfo.base === 'v1' ? v1 : orig;
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
const o = orig.obj; const b = base.obj; const n = nova.obj;
const c = n.content || {};
const mod = L.moduleNum(id);
const simulado = L.isSimulado(id, n.type);
const eq = (x, y) => JSON.stringify(x) === JSON.stringify(y);

// 2. identidades
for (const k of ['id', 'moduleId', 'order']) if (!eq(o[k], n[k])) E(`${k} alterado: ${JSON.stringify(o[k])} -> ${JSON.stringify(n[k])}`);
if (n.lab && o.lab && n.lab.id !== o.lab.id) E(`lab.id alterado (${o.lab.id} -> ${n.lab.id})`);
if (n.lab && !o.lab) A('a v2 criou um lab que não existia no original');
if (!eq(o.prerequisites, n.prerequisites)) A('prerequisites alterado (confira continuidade)');

// 3. progressRules (3.7)
const pr = n.progressRules || {};
if (!eq(pr.unlocks, o.progressRules?.unlocks)) E('progressRules.unlocks alterado');
if (!eq(pr.accessPolicy, o.progressRules?.accessPolicy)) E('progressRules.accessPolicy alterado');
const extrasPR = Object.keys(pr).filter((k) => !['completeWhen', 'accessPolicy', 'unlocks'].includes(k));
if (extrasPR.length) E(`progressRules com chaves além de completeWhen/accessPolicy/unlocks: ${extrasPR.join(', ')}`);
if (L.hasOwnProjectRules(o)) { if (!eq(pr.completeWhen, o.progressRules.completeWhen)) E('aula de projeto: completeWhen deve manter as regras próprias do original'); }
else if (!eq(pr.completeWhen, L.STD_COMPLETE)) E(`progressRules.completeWhen deve ser ${JSON.stringify(L.STD_COMPLETE)} (é ${JSON.stringify(pr.completeWhen)})`);

// 4. seções removidas pelo padrão
if ('learningOutcomes' in n) E('learningOutcomes presente (remova o campo)');
for (const k of ['history', 'evolution']) if (k in c) E(`content.${k} presente (vira no máximo 1–2 frases no Problema)`);
if (mod <= 2) for (const k of ['security', 'troubleshooting']) if (k in n) E(`${k} presente no módulo ${mod} (removido nos módulos 0, 1 e 2)`);
for (const k of L.INVISIBLE_CONTENT) if (k in c) E(`content.${k} (invisível) ainda presente`);
const RENDERED_TOP = ['title', 'subtitle', 'duration', 'difficulty', 'type', 'xp', 'tags', 'objectives', 'content', 'security', 'troubleshooting', 'lab', 'quiz', 'flashcards', 'mentorQuestions', 'exercises', 'challenge', 'commentedSolution', 'glossary', 'references', 'linksToOtherCourses'];
const META_OK = ['id', 'moduleId', 'order', 'prerequisites', 'progressRules', 'learningOutcomes', ...L.ALLOWED_INVISIBLE_TOP];
for (const k of Object.keys(n)) if (!RENDERED_TOP.includes(k) && !META_OK.includes(k)) E(`campo invisível de topo ainda presente: ${k}`);
if (o.networkContext && !n.networkContext) A('networkContext removido (deveria ser mantido)');

// 5. Introdução
const nObj = (n.objectives || []).length;
if (nObj > 3) E(`${nObj} objetivos (máximo 3)`); else if (nObj < 2) A(`${nObj} objetivo(s) (padrão 2–3)`);
const gl = n.glossary || [];
if (gl.length > 5) E(`${gl.length} termos no glossário (máximo 5)`);
if ('glossary' in n && !gl.length) A('glossary vazio: remova o campo');
const ids = new Set(L.courseOrder().map((x) => x.id));
gl.forEach((g, i) => {
  const rl = g.relatedLessons;
  if (rl !== undefined && !Array.isArray(rl)) E(`glossary[${i}].relatedLessons deve ser lista de ids de aula`);
  (Array.isArray(rl) ? rl : []).forEach((x) => { if (!ids.has(String(x))) E(`glossary[${i}] (${g.term}): relatedLessons aponta aula inexistente "${x}"`); });
  if (!Array.isArray(rl) || !rl.length) A(`glossary[${i}] (${g.term}) sem relatedLessons (ok só se nenhuma aula do curso explica o termo)`);
  (Array.isArray(rl) ? rl : []).forEach((x) => { if (String(x) === id) E(`glossary[${i}] (${g.term}): aponta para a própria aula — termo explicado aqui não entra no glossário`); });
});
const words = (k) => (c[k] ? L.htmlWords(c[k]) : 0);
const sumTxt = L.stripHtml(c.summary || '');
if (!c.summary) E('sem content.summary');
else if (!sumTxt.trim().endsWith(L.SUMMARY_PHRASE)) E(`Resumo não termina com a frase padrão: "${L.SUMMARY_PHRASE}"`);
if (!c.motivation) E('sem content.motivation');
if (words('motivation') > 150) A(`Motivação com ${words('motivation')} palavras (máx. 150)`);
if (c.motivation && words('motivation') < 80) A(`Motivação com ${words('motivation')} palavras (padrão 100–150)`);
if (!c.problem) A('sem content.problem');
if (words('problem') > 150) A(`Problema com ${words('problem')} palavras (máx. 150)`);
if (words('summary') > 90) A(`Resumo com ${words('summary')} palavras (máx. 90)`);
const sumItems = (String(c.summary || '').match(/<li\b/gi) || []).length;
if (c.summary && (sumItems < 4 || sumItems > 5)) A(`Resumo com ${sumItems} itens <li> (padrão 4–5)`);

// 6. Exemplos
const env = L.ENV_EXAMPLES.filter((k) => c[k]);
if (env.length > 1) A(`${env.length} exemplos por ambiente (${env.join(', ')}); padrão: no máximo 1, quando o tema é aquele ambiente`);
if (!c.simpleExample && !env.length) A('nenhum exemplo (simpleExample ou um exemplo por ambiente)');
if (c.analogy && words('analogy') > 90) A(`Analogia com ${words('analogy')} palavras (padrão 2–3 frases)`);

// 7. Segurança e troubleshooting (3.5)
if (n.security) {
  const extra = Object.keys(n.security).filter((k) => !['vulnerabilities', 'goodPractices', 'detectionIdeas'].includes(k));
  if (extra.length) A(`security com listas além das 3 permitidas: ${extra.join(', ')}`);
  for (const k of ['vulnerabilities', 'goodPractices', 'detectionIdeas']) if ((n.security[k] || []).length > 3) A(`security.${k} com ${(n.security[k] || []).length} itens (máx. 3)`);
  (n.security.vulnerabilities || []).forEach((v, i) => { const vaz = ['name', 'description', 'mitigation'].filter((kk) => !v[kk]); if (!v.defensiveExplanation) vaz.push('defensiveExplanation'); if (vaz.length) A(`security.vulnerabilities[${i}]: campos vazios exibidos com rótulo: ${vaz.join(', ')}`); });
}
if (n.troubleshooting) {
  const t = n.troubleshooting;
  if ((t.symptoms || []).length > 3) A(`troubleshooting.symptoms com ${(t.symptoms || []).length} itens (máx. 3)`);
  if ((t.diagnosticQuestions || []).length > 3) A(`troubleshooting.diagnosticQuestions com ${(t.diagnosticQuestions || []).length} itens (máx. 3)`);
  if ((t.decisionTree || []).length > 5) A(`troubleshooting.decisionTree com ${(t.decisionTree || []).length} itens (árvore curta)`);
  const extra = Object.keys(t).filter((k) => !['symptoms', 'diagnosticQuestions', 'commands', 'decisionTree'].includes(k));
  if (extra.length) A(`troubleshooting: subcampos que o app não mostra: ${extra.join(', ')}`);
  (t.commands || []).forEach((cmd, i) => { const vaz = ['platform', 'command', 'purpose', 'expectedObservation', 'interpretation'].filter((kk) => !cmd[kk]); if (vaz.length) A(`troubleshooting.commands[${i}]: campos vazios exibidos com rótulo: ${vaz.join(', ')}`); });
  const labCmds = new Set(L.deepText(n.lab?.steps || []).split(/\n/).map((s) => s.trim()).filter(Boolean));
  (t.commands || []).forEach((cmd, i) => { if (cmd.command && labCmds.has(String(cmd.command).trim())) A(`troubleshooting.commands[${i}] repete um comando do lab: ${cmd.command}`); });
  if (/\b(show running-config|show ip|show interfaces|configure terminal|show mac address-table)\b/i.test(L.deepText(t)) && mod < 3) A('troubleshooting cita Cisco IOS');
}

// 8. HTML: tags balanceadas, seções não vazias, envelope, classes
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
function balance(html) {
  const stack = []; const probs = [];
  const s = String(html).replace(/<!--[\s\S]*?-->/g, '');
  const re = /<(\/?)([a-zA-Z][\w:-]*)\b[^>]*?(\/?)>/g; let m;
  while ((m = re.exec(s))) {
    const [, close, tagRaw, self] = m; const tag = tagRaw.toLowerCase();
    if (self || VOID.has(tag)) continue;
    if (!close) stack.push(tag);
    else if (stack[stack.length - 1] === tag) stack.pop();
    else { probs.push(`</${tag}> inesperado (aberto: ${stack.slice(-3).join('>') || 'nada'})`); const i = stack.lastIndexOf(tag); if (i >= 0) stack.length = i; }
  }
  if (stack.length) probs.push(`não fechadas: ${stack.join(', ')}`);
  return probs;
}
const cssClasses = new Set();
for (const cf of fs.readdirSync(path.join(L.ROOT, 'assets', 'css'))) for (const m of fs.readFileSync(path.join(L.ROOT, 'assets', 'css', cf), 'utf8').matchAll(/\.([a-zA-Z][\w-]*)/g)) cssClasses.add(m[1]);
const classesOf = (h) => [...String(h).matchAll(/\bclass\s*=\s*["']([^"']*)["']/g)].flatMap((m) => m[1].split(/\s+/).filter(Boolean));
const prevClasses = new Set();
for (const v of [...Object.values(o.content || {}), ...Object.values(b.content || {})]) classesOf(v).forEach((x) => prevClasses.add(x));
const strip = (h) => String(h || '').trim().replace(/^<section\b[^>]*>/i, '').replace(/<\/section>\s*$/i, '').trim().replace(/^<h2\b[^>]*>[\s\S]*?<\/h2>\s*/i, '').trim();
for (const [k, v] of Object.entries(c)) {
  const p = balance(v); if (p.length) E(`content.${k}: ${p.slice(0, 3).join(' | ')}`);
  const body = strip(v);
  if (!L.stripHtml(body) && !/<svg\b/i.test(body)) E(`content.${k}: seção vazia`);
  if (!/^\s*<section\b[^>]*class\s*=\s*["'][^"']*lesson-section\b[^"']*["'][^>]*>\s*<h2\b/i.test(v)) A(`content.${k}: sem envelope <section class="lesson-section ..."><h2>`);
  const novasCls = [...new Set(classesOf(v))].filter((x) => !cssClasses.has(x) && !prevClasses.has(x));
  if (novasCls.length) E(`content.${k}: classes que não existem no CSS nem nas versões anteriores: ${novasCls.join(', ')}`);
}
if (!Object.keys(c).length) E('content vazio');
if (!c.nextTheme) A('sem content.nextTheme');
else if (words('nextTheme') > 60) A(`nextTheme com ${words('nextTheme')} palavras (padrão 1–2 frases)`);
if (!c.concept && !c.internals) A('sem concept nem internals');
const svgB = Object.values(b.content || {}).reduce((a, v) => a + L.countSvg(v), 0); const svgN = Object.values(c).reduce((a, v) => a + L.countSvg(v), 0);
if (svgN < svgB) A(`menos diagramas SVG que a base (${svgB} -> ${svgN})`);
const txt = JSON.stringify({ ...n, content: undefined });
if (/<(p|strong|code|ul|li|br)\b[^>]*>/i.test(txt)) A('há tags HTML em campos de texto (fora de content): o app escapa e mostra a tag crua');
if (/Pr[áa]tica equivalente/i.test(JSON.stringify(n.lab || {})) || /Pr[áa]tica equivalente/i.test(Object.values(c).join(' '))) E('bloco "Prática equivalente" presente');

// 9. quiz
const quiz = Array.isArray(n.quiz) ? n.quiz : [];
const qids = new Set();
quiz.forEach((q, i) => {
  const tag = `quiz[${i}]${q.id ? `(${q.id})` : ''}`;
  const velhas = ['q', 'opts', 'a', 'exp', 'correctAnswer', 'correctIndex'].filter((k) => k in q);
  if (velhas.length) { E(`${tag}: formato fora do padrão (${velhas.join(',')}) — rode quiz_normalizar ${id}`); return; }
  if (!q.id) E(`${tag}: sem id`); else if (qids.has(String(q.id))) E(`${tag}: id duplicado`); else qids.add(String(q.id));
  if (typeof q.question !== 'string' || !q.question.trim()) E(`${tag}: question vazia`);
  if (!Array.isArray(q.options) || q.options.length < 2) E(`${tag}: options com menos de 2`);
  if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options || []).length) E(`${tag}: answer não é índice válido (${JSON.stringify(q.answer)})`);
  if (typeof q.explanation !== 'string' || !q.explanation.trim()) E(`${tag}: explanation vazia`);
  if (Array.isArray(q.options) && new Set(q.options.map((x) => String(x).trim().toLowerCase())).size !== q.options.length) E(`${tag}: opções repetidas`);
  if ((q.options || []).some((x) => /todas as (anteriores|alternativas)|nenhuma das anteriores/i.test(String(x)))) A(`${tag}: opção do tipo "todas/nenhuma das anteriores"`);
});
if (simulado) { if (quiz.length < (o.quiz || []).length) E(`simulado com menos questões que o original (${(o.quiz || []).length} -> ${quiz.length})`); }
else if (quiz.length < 5 || quiz.length > 6) E(`quiz com ${quiz.length} questões (padrão 5–6)`);
// id reaproveitado para outra pergunta
const prevQ = new Map([...(o.quiz || []), ...(b.quiz || [])].filter((q) => q.id != null).map((q) => [String(q.id), String(q.question || q.q || '')]));
const toks = (s) => new Set(String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(/[^a-z0-9]+/).filter((w) => w.length > 3));
quiz.forEach((q) => { const p = prevQ.get(String(q.id)); if (p == null) return; const a = toks(p); const bb = toks(q.question); const inter = [...a].filter((w) => bb.has(w)).length; if (a.size && inter / Math.max(a.size, bb.size) < 0.25) A(`quiz ${q.id}: id de uma questão anterior usado para outra pergunta? ("${p.slice(0, 60)}" -> "${String(q.question).slice(0, 60)}")`); });
// respondível pela aula (heurística: termos da resposta e da explicação presentes na teoria visível)
const corpo = L.stripHtml(L.stripSvg(Object.entries(c).filter(([k]) => k !== 'nextTheme').map(([, v]) => v).join(' ')) + ' ' + L.deepText([n.security, n.troubleshooting, n.glossary, n.objectives])).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
if (!simulado) quiz.forEach((q) => { const t = [...toks(`${(q.options || [])[q.answer] || ''}`)]; if (t.length >= 3) { const hit = t.filter((w) => corpo.includes(w)).length; if (hit / t.length < 0.4) A(`quiz ${q.id}: a resposta usa termos que quase não aparecem na teoria (${hit}/${t.length}) — confira se é respondível pela aula`); } });
if (quiz.length >= 5) { const dist = {}; quiz.filter((q) => Number.isInteger(q.answer)).forEach((q) => { dist[q.answer] = (dist[q.answer] || 0) + 1; }); if (Math.max(...Object.values(dist)) / quiz.length > 0.6) A(`gabarito concentrado: ${JSON.stringify(dist)} — rode quiz_embaralhar ${id}`); }

// 10. fixação e prática extra
const between = (arr, a, bmax, nome) => { const k = (arr || []).length; if (k && (k < a || k > bmax)) A(`${nome}: ${k} (padrão ${a}–${bmax})`); };
if (!simulado) {
  const fc = (n.flashcards || []).length; if (fc < 5 || fc > 8) A(`flashcards: ${fc} (padrão 5–8)`);
  between(n.mentorQuestions, 2, 3, 'mentorQuestions'); between(n.exercises, 2, 4, 'exercises');
}
(n.exercises || []).forEach((e, i) => { if (!e.expectedAnswer) A(`exercises[${i}] sem expectedAnswer`); });
if (n.challenge && !n.commentedSolution) A('desafio sem solução comentada');
if (n.lab) {
  if (!Array.isArray(n.lab.steps) || !n.lab.steps.length) E('lab sem passos');
  else if (n.lab.steps.length > 4 && !L.isProjectType(n.type)) A(`lab com ${n.lab.steps.length} passos (padrão 3–4)`);
  for (const k of ['safetyNotes', 'improvements', 'evidenceToCollect']) if (n.lab[k] && (Array.isArray(n.lab[k]) ? n.lab[k].length : String(n.lab[k]).trim()) && !L.isProjectType(n.type)) A(`lab.${k} presente: confira se não é ritual`);
  for (const k of ['topology', 'architecture']) if (n.lab[k] && typeof n.lab[k] === 'object') E(`lab.${k} é objeto/lista: o app mostraria [object Object]`);
}
const mpath = path.join(L.WORK, id, 'metricas_nova.json');
if (fs.existsSync(mpath)) { const m = L.readJSON(mpath); if (m.lab && m.lab.palavras > 450 && !L.isProjectType(n.type)) A(`lab com ${m.lab.palavras} palavras (padrão ~300–400)`); }
const extraPal = L.deepWords([(n.mentorQuestions || []).map((m) => [m.question, m.hints, m.expectedIdeas, m.explanation]), (n.exercises || []).map((e) => [e.prompt, e.expectedAnswer, e.explanation]), n.challenge, n.commentedSolution]);
if (!L.isProjectType(n.type) && !simulado && extraPal > 450) A(`prática extra (mentor+exercícios+desafio+solução) com ${extraPal} palavras (padrão ~150–250 por bloco; reveja se cada item faz o aluno aplicar)`);

// 11. itens de lista precisam ser objetos; subcampos não exibidos
for (const k of ['quiz', 'flashcards', 'mentorQuestions', 'exercises', 'glossary', 'references', 'linksToOtherCourses']) (n[k] || []).forEach((x, i) => { if (!x || typeof x !== 'object' || Array.isArray(x)) E(`${k}[${i}]: item não é objeto (o app exibiria um card vazio)`); });
const SUBV = { mentorQuestions: ['id', 'type', 'question', 'hints', 'expectedIdeas', 'explanation'], exercises: ['id', 'type', 'prompt', 'title', 'expectedAnswer', 'explanation', 'difficulty'],
  flashcards: ['id', 'front', 'back', 'tags', 'difficulty'], glossary: ['term', 'shortDefinition', 'definition', 'longDefinition', 'example', 'relatedTerms', 'relatedLessons'] };
for (const [k, keys] of Object.entries(SUBV)) { const extra = [...new Set((n[k] || []).filter((x) => x && typeof x === 'object').flatMap((x) => Object.keys(x).filter((kk) => !keys.includes(kk))))]; if (extra.length) A(`${k}: subcampos que o app não mostra: ${extra.join(', ')}`); }
for (const [k, keys] of Object.entries({ challenge: ['title', 'scenario', 'tasks', 'constraints', 'expectedDeliverables', 'successCriteria', 'gradingRubric', 'difficulty', 'estimatedTimeMinutes'], commentedSolution: ['reasoning', 'steps', 'commonWrongAnswers', 'commonMistakes', 'finalAnswer'] })) {
  const extra = Object.keys(n[k] || {}).filter((kk) => !keys.includes(kk)); if (extra.length) A(`${k}: subcampos que o app não mostra: ${extra.join(', ')}`); }

// 12. duração (3.7 e seção 6)
const dm = String(n.duration || '').match(/^(\d+)-(\d+) min(?: \+ (\d+) min de prática extra)?$/);
if (!dm) E(`duration fora do formato "X-Y min + Z min de prática extra" (ou "X-Y min"): ${JSON.stringify(n.duration)}`);
else {
  if (Number(dm[1]) % 5 || Number(dm[2]) % 5 || (dm[3] && Number(dm[3]) % 5)) A('duration não usa múltiplos de 5');
  if (n.estimatedStudyTimeMinutes !== Number(dm[2])) E(`estimatedStudyTimeMinutes (${n.estimatedStudyTimeMinutes}) != Y da duration (${dm[2]})`);
  if (fs.existsSync(mpath)) { const m = L.readJSON(mpath); if (m.duracao.recomendada !== n.duration) A(`duration "${n.duration}" difere da recomendada pela fórmula ("${m.duracao.recomendada}") — rode metricas nova depois do montar e ajuste`); }
  const temExtra = Boolean(n.lab || (n.mentorQuestions || []).length || (n.exercises || []).length || n.challenge || n.commentedSolution);
  if (temExtra && !dm[3]) E('há prática extra, mas a duration não tem "+ Z min de prática extra"');
  if (!temExtra && dm[3]) E('duration declara prática extra, mas não há lab, mentor, exercícios nem desafio');
}

// 13. métricas e análise
if (!fs.existsSync(mpath)) E(`metricas_nova.json não calculado (rode metricas ${id} nova)`);
const ap = path.join(L.ANALISES_V2, f.mod, `aula-${id}.md`);
if (!fs.existsSync(ap)) A(`análise ainda não escrita: ${path.relative(L.ROOT, ap)}`);

const res = { id, base: baseInfo.base, ok: erros.length === 0, erros, avisos };
console.log(JSON.stringify(res, null, 1));
process.exit(erros.length ? 1 : 0);
