import { escapeHtml, asArray } from "../utils/text.js";
export function renderMentor(questions = []) {
  if (!questions.length) return "";
  return `<section id="section-mentor" class="lesson-section lesson-section--mentor"><h2>Modo Mentor</h2>${questions.map((q) => `<div class="mentor-card"><span class="badge">${escapeHtml(q.type || "pergunta")}</span><h3>${escapeHtml(q.question || "Pergunta")}</h3>${asArray(q.hints).length ? `<details><summary>Ver pistas</summary><ul>${asArray(q.hints).map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul></details>` : ""}${asArray(q.expectedIdeas).length ? `<details><summary>Ideias esperadas</summary><ul>${asArray(q.expectedIdeas).map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul></details>` : ""}${q.explanation ? `<p>${escapeHtml(q.explanation)}</p>` : ""}</div>`).join("")}</section>`;
}
