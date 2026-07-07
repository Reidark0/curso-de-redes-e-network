import { stripHtml } from "../utils/text.js";

function stringifyNested(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(stringifyNested).join(" ");
  if (typeof value === "object") return Object.values(value).map(stringifyNested).join(" ");
  return String(value);
}

function lessonText(module, lesson) {
  const content = lesson.content || {};
  const lab = lesson.lab || null;
  const challenge = lesson.challenge || null;
  const commentedSolution = lesson.commentedSolution || null;
  const chunks = [
    module.id, module.title, module.subtitle || "", stringifyNested(module.integrativeLabs), stringifyNested(module.assessment),
    lesson.id, lesson.title, lesson.subtitle,
    "networkContext deepDive commonMistakes security troubleshooting blueTeamSyntheticDataset finalSimulation domainGapReport capstone glossary quiz flashcards mentorQuestions exercises challenge commentedSolution lab.steps lab.validation lab.troubleshooting lab.evidenceToCollect lab.syntheticDataset references linksToOtherCourses progressRules",
    lesson.type || "", lesson.difficulty || "", lesson.duration || "",
    ...(lesson.tags || []), ...(lesson.objectives || []), ...(lesson.learningOutcomes || []),
    ...Object.values(content).map(stripHtml),
    stringifyNested(lesson.networkContext), stringifyNested(lesson.deepDive), stringifyNested(lesson.commonMistakes),
    stringifyNested(lesson.security), stringifyNested(lesson.troubleshooting), stringifyNested(lesson.blueTeamSyntheticDataset),
    stringifyNested(lesson.finalSimulation), stringifyNested(lesson.domainGapReport), stringifyNested(lesson.capstone),
    ...(lesson.glossary || []).map((g) => `${g.term} ${g.shortDefinition || ""} ${g.longDefinition || ""} ${g.example || ""} ${(g.relatedTerms || []).join(" ")} ${(g.relatedLessons || []).join(" ")}`),
    ...(lesson.flashcards || []).map((f) => `${f.front} ${f.back} ${(f.tags || []).join(" ")} ${f.difficulty || ""}`),
    ...(lesson.quiz || []).map((q) => `${q.q} ${(q.opts || []).join(" ")} ${q.exp || ""} ${q.type || ""} ${q.topic || ""} ${q.difficulty || ""}`),
    ...(lesson.mentorQuestions || []).map((m) => `${m.type || ""} ${m.question || ""} ${(m.hints || []).join(" ")} ${(m.expectedIdeas || []).join(" ")} ${m.explanation || ""}`),
    ...(lesson.exercises || []).map((e) => `${e.type || ""} ${e.prompt || ""} ${e.expectedAnswer || ""} ${e.explanation || ""}`),
    challenge ? `${challenge.title || ""} ${challenge.scenario || ""} ${stringifyNested(challenge.tasks)} ${stringifyNested(challenge.constraints)} ${stringifyNested(challenge.expectedDeliverables)} ${stringifyNested(challenge.gradingRubric)}` : "",
    commentedSolution ? stringifyNested(commentedSolution) : "",
    lab ? `${lab.id || ""} ${lab.title || ""} ${lab.objective || ""} ${lab.scenario || ""} ${stringifyNested(lab.topology)} ${stringifyNested(lab.architecture)} ${stringifyNested(lab.prerequisites)} ${stringifyNested(lab.tools)} ${lab.cost || ""} ${stringifyNested(lab.safetyNotes)} ${stringifyNested(lab.steps)} ${lab.expectedResult || ""} ${stringifyNested(lab.validation)} ${stringifyNested(lab.troubleshooting)} ${stringifyNested(lab.improvements)} ${stringifyNested(lab.evidenceToCollect)} ${stringifyNested(lab.questions)} ${stringifyNested(lab.challenge)} ${stringifyNested(lab.solution)} ${stringifyNested(lab.syntheticDataset)}` : "",
    ...(lesson.references || []).map((r) => `${r.type || ""} ${r.title || ""} ${r.organization || ""} ${r.url || ""} ${r.note || ""}`),
    ...(lesson.linksToOtherCourses || []).map((l) => `${l.course || ""} ${l.module || ""} ${l.lesson || ""} ${l.reason || ""}`),
    stringifyNested(lesson.progressRules)
  ];
  return chunks.join(" ").toLowerCase();
}

export function buildSearchIndex(courseData) {
  return courseData.modules.flatMap((module) => (module.lessons || []).map((lesson) => ({
    moduleId: module.id,
    moduleTitle: module.title,
    lessonId: lesson.id,
    title: lesson.title,
    subtitle: lesson.subtitle || "",
    text: lessonText(module, lesson)
  })));
}

export function searchLessons(index, query, limit = 12) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  return index
    .map((item) => {
      let score = 0;
      for (const term of terms) {
        if (item.lessonId.toLowerCase() === term) score += 20;
        if (item.title.toLowerCase().includes(term)) score += 10;
        if (item.subtitle.toLowerCase().includes(term)) score += 4;
        if (item.text.includes(term)) score += 1;
      }
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.lessonId.localeCompare(b.lessonId, undefined, { numeric: true }))
    .slice(0, limit);
}
