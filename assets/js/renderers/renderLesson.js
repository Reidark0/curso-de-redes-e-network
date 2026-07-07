import { renderContentSections } from "./renderContentSections.js";
import { renderFixation } from "./renderFixation.js";
import { bindQuiz } from "./renderQuiz.js";
import { bindFlashcards } from "./renderFlashcards.js";
import { renderSecurity } from "./renderSecurity.js";
import { renderTroubleshooting } from "./renderTroubleshooting.js";
import { renderReferences } from "./renderReferences.js";
import { escapeHtml, asArray } from "../utils/text.js";
import { getNote, setNote } from "../services/notes.js";
import { isFavorite, toggleFavorite } from "../services/favorites.js";
import { isLessonComplete, isLessonMarked, markLessonComplete, unmarkLessonRead, getLessonCompletionStatus, markLessonPracticalEquivalent, isPracticeCriterionDone } from "../services/progress.js";

function hasContent(lesson, key) { return Boolean(lesson.content?.[key]); }
function hasArray(value) { return Array.isArray(value) && value.length > 0; }

function buildTopicGroups(lesson) {
  const groups = [];
  const intro = [];
  if (hasArray(lesson.objectives)) intro.push(["section-objectives", "Objetivos"]);
  if (hasArray(lesson.learningOutcomes)) intro.push(["section-learningOutcomes", "Resultados de aprendizagem"]);
  if (hasContent(lesson, "motivation")) intro.push(["section-motivation", "Motivação"]);
  if (hasContent(lesson, "summary")) intro.push(["section-summary", "Resumo"]);
  if (hasArray(lesson.glossary)) intro.push(["section-glossary", "Glossário"]);
  if (intro.length) groups.push(["group-intro", "Introdução", intro]);

  const contexto = [];
  if (hasContent(lesson, "history")) contexto.push(["section-history", "História"]);
  if (hasContent(lesson, "problem")) contexto.push(["section-problem", "Problema"]);
  if (hasContent(lesson, "evolution")) contexto.push(["section-evolution", "Evolução"]);
  if (contexto.length) groups.push(["group-contexto", "Contexto", contexto]);

  const conteudo = [];
  if (hasContent(lesson, "concept")) conteudo.push(["section-concept", "Conceito"]);
  if (hasContent(lesson, "internals")) conteudo.push(["section-internals", "Funcionamento interno"]);
  if (hasContent(lesson, "architecture")) conteudo.push(["section-architecture", "Arquitetura"]);
  if (hasContent(lesson, "diagram")) conteudo.push(["section-diagram", "Diagrama SVG"]);
  if (lesson.security) conteudo.push(["section-security-structured", "Segurança estruturada"]);
  if (lesson.troubleshooting) conteudo.push(["section-troubleshooting-structured", "Troubleshooting"]);
  if (conteudo.length) groups.push(["group-conteudo", "Conteúdo", conteudo]);

  const exemplos = [];
  if (hasContent(lesson, "analogy")) exemplos.push(["section-analogy", "Analogia", true]);
  if (hasContent(lesson, "simpleExample")) exemplos.push(["section-simpleExample", "Exemplo simples", true]);
  if (hasContent(lesson, "enterpriseExample")) exemplos.push(["section-enterpriseExample", "Exemplo empresarial", true]);
  if (hasContent(lesson, "cloudExample")) exemplos.push(["section-cloudExample", "Cloud", true]);
  if (hasContent(lesson, "devsecopsExample")) exemplos.push(["section-devsecopsExample", "DevSecOps", true]);
  if (hasContent(lesson, "securityExample")) exemplos.push(["section-securityExample", "Segurança", true]);
  if (exemplos.length) groups.push(["group-exemplos", "Exemplos", exemplos]);

  const fixacao = [];
  if (lesson.lab) fixacao.push(["section-lab-structured", "Laboratório", true]);
  if (hasArray(lesson.quiz)) fixacao.push(["section-quiz", "Quiz", true]);
  if (hasArray(lesson.flashcards)) fixacao.push(["section-flashcards", "Flashcards", true]);
  if (hasArray(lesson.mentorQuestions)) fixacao.push(["section-mentor", "Modo Mentor", true]);
  if (hasArray(lesson.exercises)) fixacao.push(["section-exercises", "Exercícios", true]);
  if (lesson.challenge) fixacao.push(["section-challenge", "Desafio", true]);
  if (lesson.commentedSolution) fixacao.push(["section-commented-solution", "Solução comentada", true]);
  if (fixacao.length) groups.push(["group-fixacao", "Fixação", fixacao]);

  const final = [];
  if (hasContent(lesson, "nextTheme")) final.push(["section-nextTheme", "Próximo tema"]);
  if (hasArray(lesson.references) || hasArray(lesson.linksToOtherCourses)) final.push(["section-references", "Referências"]);
  if (final.length) groups.push(["group-final", "Consultas", final]);

  return groups;
}

function renderToc(lesson) {
  const groups = buildTopicGroups(lesson);
  if (!groups.length) return "";
  return `<div class="aside-card aside-card--toc"><h3>Tópicos da aula</h3><div class="toc-groups">${groups.map(([groupId, title, items]) => `<details class="toc-group">
    <summary><a href="#${escapeHtml(groupId)}">${escapeHtml(title)}</a></summary>
    <ul class="toc-list">${items.map(([id, label, opensPanel]) => `<li><a href="#${escapeHtml(id)}" ${opensPanel ? `data-open-panel="${escapeHtml(id)}"` : ""}>${escapeHtml(label)}</a></li>`).join("")}</ul>
  </details>`).join("")}</div></div>`;
}

function metaBadges(lesson) {
  return [lesson.id, lesson.difficulty, lesson.duration, lesson.type, `${lesson.xp || 0} XP`].filter(Boolean).map((x) => `<span class="badge">${escapeHtml(x)}</span>`).join("");
}


const PRACTICE_BUTTON_LABEL = "Marcar laboratório ou Prática equivalente";

function renderProgressCard(lesson) {
  const status = getLessonCompletionStatus(lesson);
  const completeClass = status.complete ? "is-complete" : "";
  const practiceDone = isPracticeCriterionDone(lesson);
  const items = status.criteria.map((criterion) => `<li><span class="status-dot ${criterion.done ? "is-complete" : ""}"></span> ${escapeHtml(criterion.label)}</li>`).join("");
  return `<div class="aside-card lesson-progress-card ${completeClass}" data-progress-card>
    <h3>Seu progresso</h3>
    <ul class="checklist">${items}</ul>
    <div class="lesson-progress-actions">
      <button class="button button--secondary button--practice" data-progress-practice="true" ${practiceDone ? "disabled" : ""}>${PRACTICE_BUTTON_LABEL}</button>
    </div>
    <p class="sr-only" data-completion-feedback aria-live="polite"></p>
  </div>`;
}

function refreshProgressCard(aside, lesson) {
  const current = aside.querySelector("[data-progress-card]");
  if (!current) return;
  current.outerHTML = renderProgressCard(lesson);
  bindProgressActions(aside, lesson);
}

function bindProgressActions(aside, lesson) {
  aside.querySelectorAll("[data-progress-practice]").forEach((button) => {
    button.addEventListener("click", () => {
      markLessonPracticalEquivalent(lesson);
      refreshProgressCard(aside, lesson);
      document.dispatchEvent(new CustomEvent("course:progress-updated"));
    });
  });
}

function lessonCompleteButtonLabel(lesson) {
  if (isLessonComplete(lesson)) return "Aula concluída";
  if (isLessonMarked(lesson)) return "Aula marcada";
  return "Marcar como concluída";
}

function renderLessonNotes(lesson) {
  return `<section id="section-notes" class="lesson-section lesson-section--notes note-box note-box--inline">
    <div class="section-heading-row"><div><span class="eyebrow">Anotações</span><h2>Notas pessoais</h2></div><span class="badge">salvo no navegador</span></div>
    <p class="muted-text">As notas continuam disponíveis, mas ficam no corpo da aula para deixar o painel direito dedicado aos tópicos.</p>
    <textarea id="lesson-note-main" placeholder="Escreva suas anotações desta aula...">${escapeHtml(getNote(lesson.id))}</textarea>
  </section>`;
}

function bindTopicPanelLinks(container, aside) {
  aside.querySelectorAll("[data-open-panel]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = event.currentTarget.getAttribute("data-open-panel");
      const panel = id ? container.querySelector(`#${CSS.escape(id)}`) : null;
      if (panel?.tagName === "DETAILS") panel.open = true;
    });
  });
  container.querySelectorAll(".fixation-panel > summary, .example-panel > summary").forEach((summary) => {
    summary.addEventListener("click", () => {
      const details = summary.parentElement;
      setTimeout(() => { if (details?.open) details.scrollIntoView({ behavior: "smooth", block: "start" }); }, 0);
    });
  });
}

export function renderLesson(container, aside, module, lesson, navigation) {
  container.innerHTML = `<header class="lesson-header">
    <span class="eyebrow"><button class="lesson-module-link" type="button" data-open-module-from-lesson="${module.id}">Módulo ${String(module.number).padStart(2, "0")}</button> · Aula ${escapeHtml(lesson.id)}</span>
    <h2>${escapeHtml(lesson.title)}</h2>
    ${lesson.subtitle ? `<p class="lesson-subtitle">${escapeHtml(lesson.subtitle)}</p>` : ""}
    <div class="lesson-meta">${metaBadges(lesson)}</div>
    <div class="lesson-actions">
      <button class="button button--primary" id="mark-complete">${lessonCompleteButtonLabel(lesson)}</button>
      <button class="button button--secondary" id="favorite-toggle">${isFavorite(lesson.id) ? "★ Favorita" : "☆ Favoritar"}</button>
      <button class="button button--ghost" id="lesson-home">Home</button>
    </div>
  </header>
  ${renderContentSections(lesson)}
  ${renderSecurity(lesson.security)}
  ${renderTroubleshooting(lesson.troubleshooting)}
  ${renderFixation(lesson)}
  ${lesson.content?.nextTheme ? `<section id="section-nextTheme" class="lesson-section lesson-section--nextTheme"><h2>Próximo tema</h2>${String(lesson.content.nextTheme).replace(/^\s*<section\b[^>]*>/i, "").replace(/<\/section>\s*$/i, "").replace(/^\s*<h2\b[^>]*>[\s\S]*?<\/h2>/i, "")}</section>` : ""}
  ${renderReferences(lesson.references || [], lesson.linksToOtherCourses || [])}
  ${renderLessonNotes(lesson)}`;

  aside.innerHTML = `${renderToc(lesson)}${renderProgressCard(lesson)}
  ${lesson.tags?.length ? `<div class="aside-card"><h3>Tags</h3><p>${asArray(lesson.tags).map((t) => `<span class="badge">${escapeHtml(t)}</span>`).join(" ")}</p></div>` : ""}`;

  bindQuiz(container);
  bindFlashcards(container);
  bindTopicPanelLinks(container, aside);
  bindProgressActions(aside, lesson);
  if (container.__quizProgressHandler) document.removeEventListener("course:quiz-updated", container.__quizProgressHandler);
  container.__quizProgressHandler = (event) => {
    if (event.detail?.lessonId === lesson.id) refreshProgressCard(aside, lesson);
  };
  document.addEventListener("course:quiz-updated", container.__quizProgressHandler);
  container.querySelector("[data-open-module-from-lesson]")?.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("course:open-module", { detail: { moduleId: module.id } }));
  });
  container.querySelector("#mark-complete")?.addEventListener("click", (event) => {
    const wasMarked = isLessonMarked(lesson);
    const wasComplete = isLessonComplete(lesson);
    const feedback = aside.querySelector("[data-completion-feedback]");
    if (event.currentTarget.textContent.trim() === "Aula marcada" || (wasMarked && !wasComplete)) {
      unmarkLessonRead(lesson.id);
      event.currentTarget.textContent = "Marcar como concluída";
      if (feedback) feedback.textContent = "Aula desmarcada. Marque a leitura quando realmente tiver estudado esta aula.";
      refreshProgressCard(aside, lesson);
      document.dispatchEvent(new CustomEvent("course:progress-updated"));
      return;
    }
    const result = markLessonComplete(lesson);
    event.currentTarget.textContent = result.complete ? "Aula concluída" : "Aula marcada";
    if (result.complete) {
      if (feedback) feedback.textContent = "Aula concluída com critérios reais.";
    } else if (feedback) {
      feedback.textContent = `Aula marcada/lida. Para a bolinha verde, conclua também: ${result.status.pending.join("; ")}`;
    }
    refreshProgressCard(aside, lesson);
    document.dispatchEvent(new CustomEvent("course:progress-updated"));
  });
  container.querySelector("#favorite-toggle")?.addEventListener("click", (event) => {
    const active = toggleFavorite(lesson.id);
    event.currentTarget.textContent = active ? "★ Favorita" : "☆ Favoritar";
    document.dispatchEvent(new CustomEvent("course:favorites-updated", { detail: { lessonId: lesson.id, active } }));
  });
  container.querySelector("#lesson-home")?.addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("course:go-home"));
  });
  container.querySelector("#lesson-note-main")?.addEventListener("input", (event) => setNote(lesson.id, event.target.value));
}
