import { escapeHtml, asArray } from "../utils/text.js";
export function renderGlossary(glossary = []) {
  if (!glossary.length) return "";
  return `<section id="section-glossary" class="lesson-section lesson-section--glossary"><h2>Glossário da aula</h2>${glossary.map((g) => `<details class="content-card glossary-item"><summary><strong>${escapeHtml(g.term || "Termo")}</strong></summary><p>${escapeHtml(g.shortDefinition || g.definition || "")}</p>${g.longDefinition ? `<p>${escapeHtml(g.longDefinition)}</p>` : ""}${g.example ? `<p><strong>Exemplo:</strong> ${escapeHtml(g.example)}</p>` : ""}${asArray(g.relatedTerms).length ? `<p><strong>Relacionados:</strong> ${asArray(g.relatedTerms).map(escapeHtml).join(", ")}</p>` : ""}</details>`).join("")}</section>`;
}
