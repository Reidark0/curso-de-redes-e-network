import { escapeHtml } from "../utils/text.js";
// options.title: título da seção (vazio = sem título); options.sourceOf(fc) devolve a aula de origem (texto) para mostrar em cada card.
export function renderFlashcards(flashcards = [], options = {}) {
  if (!flashcards.length) return "";
  const { title = "Flashcards", sourceOf = null } = options;
  return `<section id="section-flashcards" class="lesson-section lesson-section--flashcards">${title ? `<h2>${escapeHtml(title)}</h2>` : ""}${flashcards.map((fc) => {
    const source = sourceOf ? sourceOf(fc) : "";
    return `<div class="flashcard" tabindex="0"><button type="button" aria-label="Virar flashcard">${source ? `<span class="badge">${escapeHtml(source)}</span>` : ""}<div class="flashcard-front">${escapeHtml(fc.front || "Frente")}</div><div class="flashcard-back">${escapeHtml(fc.back || "Verso")}</div></button></div>`;
  }).join("")}</section>`;
}
export function bindFlashcards(container) {
  container.querySelectorAll(".flashcard").forEach((card) => {
    if (card.dataset.flashcardBound) return;
    card.dataset.flashcardBound = "true";
    const flip = () => card.classList.toggle("is-flipped");
    card.addEventListener("click", flip);
    card.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); flip(); } });
  });
}
