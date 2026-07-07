import { renderLab } from "./renderLab.js";
import { renderQuiz } from "./renderQuiz.js";
import { renderFlashcards } from "./renderFlashcards.js";
import { renderMentor } from "./renderMentor.js";
import { renderExercises } from "./renderExercises.js";
import { escapeHtml } from "../utils/text.js";

function unwrapOuterSection(html = "") {
  return String(html || "")
    .trim()
    .replace(/^<section\b[^>]*>/i, "")
    .replace(/<\/section>\s*$/i, "")
    .trim();
}

function panel(id, title, description, html, open = false) {
  const body = unwrapOuterSection(html);
  if (!body) return "";
  return `<details id="${escapeHtml(id)}" class="fixation-panel" ${open ? "open" : ""}>
    <summary>
      <span>${escapeHtml(title)}</span>
      ${description ? `<small>${escapeHtml(description)}</small>` : ""}
    </summary>
    <div class="fixation-panel__body">${body}</div>
  </details>`;
}

export function renderFixation(lesson) {
  const panels = [
    panel("section-lab-structured", "Laboratório", "Prática guiada, validação, troubleshooting e evidências.", renderLab(lesson.lab), false),
    panel("section-quiz", "Quiz", "Questões com feedback para verificar entendimento.", renderQuiz(lesson), false),
    panel("section-flashcards", "Flashcards", "Revisão rápida dos conceitos principais.", renderFlashcards(lesson.flashcards || []), false),
    panel("section-mentor", "Modo Mentor", "Perguntas de reflexão, diagnóstico e cenário real.", renderMentor(lesson.mentorQuestions || []), false),
    panel("section-exercises", "Exercícios", "Produção ativa: cálculo, diagnóstico, comparação ou arquitetura.", renderExercises(lesson.exercises || [], null, null), false),
    panel("section-challenge", "Desafio", "Tarefa aberta com entregáveis e restrições.", renderExercises([], lesson.challenge, null), false),
    panel("section-commented-solution", "Solução comentada", "Raciocínio passo a passo e resposta final.", renderExercises([], null, lesson.commentedSolution), false)
  ].filter(Boolean).join("");

  if (!panels) return "";
  return `<section id="group-fixacao" class="lesson-section lesson-group lesson-group--fixacao" data-topic-group="fixacao">
    <div class="section-heading-row">
      <div>
        <span class="eyebrow">Prática e revisão ativa</span>
        <h2>Fixação</h2>
      </div>
    </div>
    <p class="muted-text lesson-group-description">Expanda apenas o que você vai fazer agora. Ao abrir uma aba, o conteúdo real aparece diretamente — laboratório, quiz, exercícios, desafio ou solução.</p>
    <div class="fixation-list">${panels}</div>
  </section>`;
}
