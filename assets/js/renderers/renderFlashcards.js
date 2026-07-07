import { escapeHtml } from "../utils/text.js";
export function renderFlashcards(flashcards = []) {
  if (!flashcards.length) return "";
  return `<section id="section-flashcards" class="lesson-section lesson-section--flashcards"><h2>Flashcards</h2>${flashcards.map((fc) => `<div class="flashcard" tabindex="0"><button type="button" aria-label="Virar flashcard"><div class="flashcard-front">${escapeHtml(fc.front || "Frente")}</div><div class="flashcard-back">${escapeHtml(fc.back || "Verso")}</div></button></div>`).join("")}</section>`;
}
export function bindFlashcards(container) {
  container.querySelectorAll(".flashcard").forEach((card) => {
    const flip = () => card.classList.toggle("is-flipped");
    card.addEventListener("click", flip);
    card.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); flip(); } });
  });
}
