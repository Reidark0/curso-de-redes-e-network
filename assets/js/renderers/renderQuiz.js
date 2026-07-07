import { escapeHtml } from "../utils/text.js";
import { readJson, writeJson } from "../services/storage.js";

export function renderQuiz(lesson) {
  const quiz = lesson.quiz || [];
  if (!quiz.length) return "";
  return `<section id="section-quiz" class="lesson-section lesson-section--quiz"><h2>Quiz</h2>${quiz.map((q, qi) => `<div class="quiz-card" data-question-index="${qi}">
    <span class="badge">${escapeHtml(q.topic || q.type || "questão")}</span>
    <h3>${escapeHtml(q.q || q.question || `Questão ${qi + 1}`)}</h3>
    <div class="quiz-options">
      ${(q.opts || q.options || []).map((opt, oi) => `<button class="quiz-option" data-lesson-id="${lesson.id}" data-question-id="${q.id || qi}" data-correct="${Number(q.a ?? q.answer ?? -1)}" data-option-index="${oi}">${escapeHtml(opt)}</button>`).join("")}
    </div>
    <p class="quiz-exp" hidden>${escapeHtml(q.exp || q.explanation || "")}</p>
  </div>`).join("")}</section>`;
}

export function bindQuiz(container) {
  container.querySelectorAll(".quiz-option").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".quiz-card");
      const correct = Number(button.dataset.correct);
      const chosen = Number(button.dataset.optionIndex);
      card.querySelectorAll(".quiz-option").forEach((opt) => {
        opt.disabled = true;
        const idx = Number(opt.dataset.optionIndex);
        if (idx === correct) opt.classList.add("is-correct");
        if (idx === chosen && chosen !== correct) opt.classList.add("is-wrong");
      });
      const exp = card.querySelector(".quiz-exp");
      if (exp?.textContent.trim()) exp.hidden = false;
      const quiz = readJson("quiz", {});
      const lessonId = button.dataset.lessonId;
      const questionId = button.dataset.questionId;
      quiz[lessonId] = quiz[lessonId] || {};
      quiz[lessonId][questionId] = { chosen, correct, isCorrect: chosen === correct, answeredAt: new Date().toISOString() };
      writeJson("quiz", quiz);
      document.dispatchEvent(new CustomEvent("course:quiz-updated", { detail: { lessonId } }));
    });
  });
}
