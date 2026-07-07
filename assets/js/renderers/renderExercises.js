import { escapeHtml, asArray } from "../utils/text.js";

function renderList(title, values = []) {
  const items = asArray(values);
  if (!items.length) return "";
  return `<h4>${escapeHtml(title)}</h4><ul>${items.map((item) => {
    if (typeof item === "string") return `<li>${escapeHtml(item)}</li>`;
    const label = item.criterion || item.title || item.answer || item.check || item.name || "Item";
    const details = [item.points !== undefined ? `${item.points} pontos` : "", item.description || item.whyItIsWrong || item.expected || item.action || ""].filter(Boolean).join(" — ");
    return `<li><strong>${escapeHtml(label)}</strong>${details ? `: ${escapeHtml(details)}` : ""}</li>`;
  }).join("")}</ul>`;
}

export function renderExercises(exercises = [], challenge, commentedSolution) {
  const exerciseHtml = asArray(exercises).length ? `<section id="section-exercises" class="lesson-section lesson-section--exercises"><h2>Exercícios</h2>${asArray(exercises).map((ex) => `<div class="content-card"><span class="badge">${escapeHtml(ex.type || "exercício")}</span><h3>${escapeHtml(ex.prompt || ex.title || "Exercício")}</h3>${ex.expectedAnswer ? `<details><summary>Resposta esperada</summary><p>${escapeHtml(ex.expectedAnswer)}</p></details>` : ""}${ex.explanation ? `<p>${escapeHtml(ex.explanation)}</p>` : ""}</div>`).join("")}</section>` : "";
  const challengeHtml = challenge ? `<section id="section-challenge" class="lesson-section lesson-section--challenge-full"><h2>Desafio estruturado</h2><div class="content-card"><h3>${escapeHtml(challenge.title || "Desafio")}</h3>${challenge.scenario ? `<p>${escapeHtml(challenge.scenario)}</p>` : ""}${renderList("Tarefas", challenge.tasks)}${renderList("Restrições", challenge.constraints)}${renderList("Entregáveis", challenge.expectedDeliverables)}${renderList("Critérios de sucesso", challenge.successCriteria)}${renderList("Rubrica de avaliação", challenge.gradingRubric)}</div></section>` : "";
  const solutionHtml = commentedSolution ? `<section id="section-commented-solution" class="lesson-section lesson-section--commented-solution"><h2>Solução comentada</h2>${commentedSolution.reasoning ? `<p>${escapeHtml(commentedSolution.reasoning)}</p>` : ""}${asArray(commentedSolution.steps).length ? `<ol>${asArray(commentedSolution.steps).map((s) => `<li>${escapeHtml(s)}</li>`).join("")}</ol>` : ""}${renderList("Erros comuns na solução", commentedSolution.commonWrongAnswers || commentedSolution.commonMistakes)}${commentedSolution.finalAnswer ? `<p><strong>Resposta final:</strong> ${escapeHtml(commentedSolution.finalAnswer)}</p>` : ""}</section>` : "";
  return `${exerciseHtml}${challengeHtml}${solutionHtml}`;
}
