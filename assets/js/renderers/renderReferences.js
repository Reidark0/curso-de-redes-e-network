import { escapeHtml, asArray } from "../utils/text.js";
export function renderReferences(references = [], links = []) {
  const refs = asArray(references);
  const cross = asArray(links);
  if (!refs.length && !cross.length) return "";
  return `<section id="section-references" class="lesson-section lesson-section--references"><h2>Referências e ligações</h2>${refs.length ? `<h3>Referências</h3><ul>${refs.map((r) => `<li><strong>${escapeHtml(r.title || r.type || "Referência")}</strong>${r.organization ? ` — ${escapeHtml(r.organization)}` : ""}${r.note ? `: ${escapeHtml(r.note)}` : ""}</li>`).join("")}</ul>` : ""}${cross.length ? `<h3>Relação com outros cursos</h3><ul>${cross.map((l) => `<li><strong>${escapeHtml(l.course || "Curso")}</strong> ${l.module ? `— ${escapeHtml(l.module)}` : ""} ${l.lesson ? `— ${escapeHtml(l.lesson)}` : ""}: ${escapeHtml(l.reason || "")}</li>`).join("")}</ul>` : ""}</section>`;
}
