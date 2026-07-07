import { readJson, writeJson } from "./storage.js";

export function getProgress() { return readJson("progress", {}); }
export function getQuizProgress() { return readJson("quiz", {}); }

function lessonQuizScore(lesson) {
  const quiz = Array.isArray(lesson?.quiz) ? lesson.quiz : [];
  if (!quiz.length) return { total: 0, correct: 0, answered: 0, score: 100, requiredScore: 0 };
  const saved = getQuizProgress()[lesson.id] || {};
  let correct = 0;
  let answered = 0;
  quiz.forEach((question, index) => {
    const questionId = String(question.id ?? index);
    const answer = saved[questionId];
    if (answer) answered += 1;
    if (answer?.isCorrect === true) correct += 1;
  });
  const score = Math.round((correct / quiz.length) * 100);
  return { total: quiz.length, correct, answered, score, requiredScore: 70 };
}

function normalizeType(type = "") {
  return String(type || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function isProjectType(type) {
  const value = normalizeType(type);
  return ["projeto", "capstone", "portfolio"].some((needle) => value.includes(needle));
}

function isReviewType(type) {
  const value = normalizeType(type);
  return ["ligacao", "revisao", "simulado", "roadmap", "auditoria", "governanca"].some((needle) => value.includes(needle));
}

function isIntermediateType(type) {
  const value = normalizeType(type);
  return ["intermediaria", "laboratorio", "estudo-de-caso", "seguranca defensiva"].some((needle) => value.includes(needle));
}

function defaultCompletionPolicy(lesson, freeAccess, navigationBlocked, threshold) {
  const type = lesson?.type || "fundamental";

  if (isProjectType(type)) {
    return {
      name: "projeto/capstone",
      freeAccess,
      navigationBlocked,
      threshold,
      requirements: ["read"],
      oneOf: ["deliverablesMarked", "rubricCompleted", "selfAssessmentDone"]
    };
  }

  if (isReviewType(type)) {
    return {
      name: "ligação/revisão",
      freeAccess,
      navigationBlocked,
      threshold,
      requirements: ["read"],
      anyOf: ["quizScoreAtLeast", "checklistDone"]
    };
  }

  if (isIntermediateType(type)) {
    return {
      name: "intermediária/prática",
      freeAccess,
      navigationBlocked,
      threshold,
      requirements: ["read", "quizScoreAtLeast"],
      oneOf: ["exerciseDone", "labMarkedDone", "practicalExerciseDone"]
    };
  }

  return {
    name: "fundamental",
    freeAccess,
    navigationBlocked,
    threshold,
    requirements: ["read", "quizScoreAtLeast"],
    oneOf: ["labMarkedDone", "practicalExerciseDone"]
  };
}

function policyFromProgressRules(lesson, freeAccess, navigationBlocked, fallbackThreshold) {
  const completeWhen = lesson?.progressRules?.completeWhen;
  if (!completeWhen || typeof completeWhen !== "object") return null;

  const requirements = [];
  const oneOf = Array.isArray(completeWhen.oneOf) ? completeWhen.oneOf.filter(Boolean) : [];
  const anyOf = Array.isArray(completeWhen.anyOf) ? completeWhen.anyOf.filter(Boolean) : [];
  let threshold = Number(completeWhen.quizScoreAtLeast ?? fallbackThreshold ?? 70);

  Object.entries(completeWhen).forEach(([field, expected]) => {
    if (["oneOf", "anyOf"].includes(field)) return;
    if (field === "quizScoreAtLeast") {
      requirements.push(field);
      return;
    }
    if (field === "finalScoreAtLeast") {
      requirements.push(field);
      return;
    }
    if (expected === true || typeof expected === "number") requirements.push(field);
  });

  return {
    name: lesson?.type || "schema da aula",
    freeAccess,
    navigationBlocked,
    threshold,
    finalScoreThreshold: Number(completeWhen.finalScoreAtLeast ?? 0),
    requirements,
    oneOf,
    anyOf,
    source: "progressRules.completeWhen"
  };
}

export function getCompletionPolicy(lesson) {
  const fallbackThreshold = Number(lesson?.progressRules?.completeWhen?.quizScoreAtLeast ?? 70);
  const freeAccess = lesson?.progressRules?.accessPolicy?.freeAccess !== false;
  const navigationBlocked = lesson?.progressRules?.accessPolicy?.navigationBlocked === true;

  return policyFromProgressRules(lesson, freeAccess, navigationBlocked, fallbackThreshold)
    || defaultCompletionPolicy(lesson, freeAccess, navigationBlocked, fallbackThreshold);
}

function fieldLabel(field, status) {
  const labels = {
    read: "Leitura marcada",
    quizScoreAtLeast: `Quiz mínimo de ${status.threshold}% (${status.quiz.score}% atual, ${status.quiz.answered}/${status.quiz.total} respondidas)`,
    labMarkedDone: "Laboratório marcado como concluído",
    practicalExerciseDone: "Prática equivalente marcada",
    exerciseDone: "Exercício aplicado marcado",
    checklistDone: "Checklist de revisão marcado",
    deliverablesMarked: "Entregáveis do projeto marcados",
    rubricCompleted: "Rubrica preenchida",
    selfAssessmentDone: "Autoavaliação marcada",
    capstoneDossierComplete: "Dossiê do capstone completo",
    rcaCompleted: "RCA do incidente simulado concluído",
    finalScoreAtLeast: `Pontuação final mínima de ${status.policy.finalScoreThreshold || 80}%`
  };
  return labels[field] || field;
}

function fieldDone(progressEntry, field, status) {
  if (field === "quizScoreAtLeast") return status.quiz.score >= status.threshold;
  if (field === "finalScoreAtLeast") {
    const threshold = Number(status.policy.finalScoreThreshold || 80);
    return progressEntry?.finalScoreAtLeast === true || Number(progressEntry?.finalScore || 0) >= threshold;
  }
  return progressEntry?.[field] === true;
}

export function getLessonCompletionStatus(lesson) {
  const progress = getProgress();
  const entry = progress[lesson.id] || {};
  const policy = getCompletionPolicy(lesson);
  const quiz = lessonQuizScore(lesson);
  const status = { lessonId: lesson.id, type: lesson.type || "fundamental", policy, quiz, threshold: policy.threshold, criteria: [], pending: [], complete: false };

  policy.requirements.forEach((field) => {
    const done = fieldDone(entry, field, status);
    status.criteria.push({ field, label: fieldLabel(field, status), done, mode: "required" });
    if (!done) status.pending.push(fieldLabel(field, status));
  });

  if (Array.isArray(policy.oneOf) && policy.oneOf.length) {
    const options = policy.oneOf.map((field) => ({ field, label: fieldLabel(field, status), done: fieldDone(entry, field, status) }));
    const done = options.some((item) => item.done);
    const label = options.map((item) => item.label).join(" OU ");
    status.criteria.push({ field: policy.oneOf.join("|"), label, done, mode: "oneOf", options });
    if (!done) status.pending.push(label);
  }

  if (Array.isArray(policy.anyOf) && policy.anyOf.length) {
    const options = policy.anyOf.map((field) => ({ field, label: fieldLabel(field, status), done: fieldDone(entry, field, status) }));
    const done = options.some((item) => item.done);
    const label = options.map((item) => item.label).join(" OU ");
    status.criteria.push({ field: policy.anyOf.join("|"), label, done, mode: "anyOf", options });
    if (!done) status.pending.push(label);
  }

  status.complete = status.criteria.every((item) => item.done);
  return status;
}

export function isLessonComplete(lessonOrId) {
  if (lessonOrId && typeof lessonOrId === "object") return getLessonCompletionStatus(lessonOrId).complete || Boolean(getProgress()[lessonOrId.id]?.complete);
  return Boolean(getProgress()[lessonOrId]?.complete);
}

export function isLessonMarked(lessonOrId) {
  const id = typeof lessonOrId === "object" ? lessonOrId.id : lessonOrId;
  const entry = getProgress()[id] || {};
  return Boolean(entry.manuallyCompleted || entry.read);
}

export function getLessonVisualState(lesson) {
  const entry = getProgress()[lesson.id] || {};
  const complete = getLessonCompletionStatus(lesson).complete || entry.complete === true;
  const marked = !complete && Boolean(entry.manuallyCompleted || entry.read);
  return { complete, marked, opened: Boolean(entry.opened), entry };
}

export function markLessonOpened(id) {
  const progress = getProgress();
  progress[id] = { ...(progress[id] || {}), opened: true, lastOpenedAt: new Date().toISOString() };
  writeJson("progress", progress);
}

export function markLessonRead(id) {
  const progress = getProgress();
  progress[id] = { ...(progress[id] || {}), read: true, readAt: progress[id]?.readAt || new Date().toISOString() };
  writeJson("progress", progress);
  return progress[id];
}

export function unmarkLessonRead(id) {
  const progress = getProgress();
  const current = { ...(progress[id] || {}) };
  delete current.read;
  delete current.readAt;
  delete current.manuallyCompleted;
  delete current.manuallyCompletedAt;
  delete current.complete;
  delete current.completedAt;
  delete current.pending;
  delete current.lastCompletionAttemptAt;
  progress[id] = current;
  writeJson("progress", progress);
  return progress[id];
}

const EVIDENCE_FIELDS = new Set([
  "labMarkedDone",
  "practicalExerciseDone",
  "exerciseDone",
  "checklistDone",
  "deliverablesMarked",
  "rubricCompleted",
  "selfAssessmentDone",
  "capstoneDossierComplete",
  "rcaCompleted",
  "finalScoreAtLeast"
]);

export function markLessonEvidence(id, field) {
  if (!EVIDENCE_FIELDS.has(field)) return getProgress()[id] || {};
  const progress = getProgress();
  progress[id] = { ...(progress[id] || {}), [field]: true, [`${field}At`]: new Date().toISOString() };
  writeJson("progress", progress);
  return progress[id];
}

function allPolicyEvidenceFields(lesson) {
  const policy = getCompletionPolicy(lesson);
  return [
    ...(policy.requirements || []),
    ...(policy.oneOf || []),
    ...(policy.anyOf || [])
  ].filter((field) => EVIDENCE_FIELDS.has(field));
}

export function markLessonPracticalEquivalent(lesson) {
  const fields = allPolicyEvidenceFields(lesson);
  const priority = [
    lesson?.lab ? "labMarkedDone" : "practicalExerciseDone",
    "practicalExerciseDone",
    "labMarkedDone",
    "exerciseDone",
    "checklistDone",
    "deliverablesMarked",
    "rubricCompleted",
    "selfAssessmentDone",
    "capstoneDossierComplete",
    "rcaCompleted",
    "finalScoreAtLeast"
  ];
  const field = priority.find((candidate) => fields.includes(candidate)) || fields[0] || (lesson?.lab ? "labMarkedDone" : "practicalExerciseDone");
  return markLessonEvidence(lesson.id, field);
}

export function isPracticeCriterionDone(lesson) {
  const status = getLessonCompletionStatus(lesson);
  const practiceFields = new Set(allPolicyEvidenceFields(lesson));
  if (!practiceFields.size) return true;
  return status.criteria.some((criterion) => {
    if (criterion.mode === "required" && practiceFields.has(criterion.field)) return criterion.done;
    return (criterion.options || []).some((option) => practiceFields.has(option.field) && option.done);
  });
}

export function markLessonComplete(lesson) {
  const lessonId = typeof lesson === "string" ? lesson : lesson.id;
  const progress = getProgress();
  const now = new Date().toISOString();
  progress[lessonId] = {
    ...(progress[lessonId] || {}),
    read: true,
    readAt: progress[lessonId]?.readAt || now,
    manuallyCompleted: true,
    manuallyCompletedAt: now
  };
  writeJson("progress", progress);

  if (typeof lesson === "string") {
    return { complete: false, marked: true, status: { complete: false, pending: [] } };
  }

  const status = getLessonCompletionStatus(lesson);
  const updated = getProgress();
  if (status.complete) {
    updated[lessonId] = { ...(updated[lessonId] || {}), complete: true, completedAt: updated[lessonId]?.completedAt || now, pending: [] };
  } else {
    updated[lessonId] = { ...(updated[lessonId] || {}), complete: false, pending: status.pending, lastCompletionAttemptAt: now };
  }
  writeJson("progress", updated);
  return { complete: status.complete, marked: true, status };
}

function isLessonReallyComplete(lesson, progress = getProgress()) {
  return progress[lesson.id]?.complete === true || getLessonCompletionStatus(lesson).complete;
}

function isLessonMarkedForCounting(lesson, progress = getProgress()) {
  if (isLessonReallyComplete(lesson, progress)) return true;
  const entry = progress[lesson.id] || {};
  return Boolean(entry.manuallyCompleted || entry.read);
}

function buildProgressMetrics(lessons, progress = getProgress()) {
  const complete = lessons.filter((lesson) => isLessonReallyComplete(lesson, progress)).length;
  const marked = lessons.filter((lesson) => isLessonMarkedForCounting(lesson, progress)).length;
  const total = lessons.length;
  return {
    complete,
    marked,
    total,
    percent: total ? Math.round((complete / total) * 100) : 0,
    markedPercent: total ? Math.round((marked / total) * 100) : 0
  };
}

export function getOverallProgress(courseData) {
  const lessons = courseData.modules.flatMap((m) => m.lessons || []);
  return buildProgressMetrics(lessons, getProgress());
}

export function getModuleProgress(module) {
  return buildProgressMetrics(module.lessons || [], getProgress());
}

export function findLastOpened(courseData) {
  const progress = getProgress();
  const lessons = courseData.modules.flatMap((m) => m.lessons || []);
  const opened = lessons
    .map((lesson) => ({ lesson, date: progress[lesson.id]?.lastOpenedAt || progress[lesson.id]?.completedAt || progress[lesson.id]?.manuallyCompletedAt || "" }))
    .filter((x) => x.date)
    .sort((a, b) => b.date.localeCompare(a.date));
  return opened[0]?.lesson || lessons[0];
}
