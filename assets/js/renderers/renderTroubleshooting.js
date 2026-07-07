import { escapeHtml, asArray } from "../utils/text.js";

function list(title, items = []) {
  const arr = asArray(items).filter(Boolean);
  if (!arr.length) return "";
  return `<div class="ops-panel"><h3>${escapeHtml(title)}</h3><ul>${arr.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`;
}

function commands(items = []) {
  const arr = asArray(items).filter(Boolean);
  if (!arr.length) return "";
  return `<div class="ops-panel ops-panel--wide"><h3>Comandos e fontes de evidência</h3>
    <div class="command-grid">${arr.map((cmd) => `<article class="command-card"><strong>${escapeHtml(cmd.platform || "Plataforma")}</strong><code>${escapeHtml(cmd.command || "")}</code><p><b>Finalidade:</b> ${escapeHtml(cmd.purpose || "")}</p><p><b>Esperado:</b> ${escapeHtml(cmd.expectedObservation || "")}</p><p><b>Interpretação:</b> ${escapeHtml(cmd.interpretation || "")}</p></article>`).join("")}</div>
  </div>`;
}

function decisionTree(items = []) {
  const arr = asArray(items).filter(Boolean);
  if (!arr.length) return "";
  return `<div class="ops-panel ops-panel--wide"><h3>Árvore de decisão</h3><ol>${arr.map((item) => `<li><strong>Se:</strong> ${escapeHtml(item.if || "")}. <strong>Então:</strong> ${escapeHtml(item.then || "")}</li>`).join("")}</ol></div>`;
}

export function renderTroubleshooting(troubleshooting) {
  if (!troubleshooting) return "";
  return `<section id="section-troubleshooting-structured" class="lesson-section operational-section operational-section--troubleshooting">
    <span class="eyebrow">Troubleshooting estruturado</span>
    <h2>Sintomas, perguntas diagnósticas e evidências</h2>
    <p>Esta seção transforma a aula em um roteiro prático de investigação, conectando sintomas, hipóteses, comandos, logs e decisões.</p>
    <div class="ops-grid">
      ${list("Sintomas comuns", troubleshooting.symptoms)}
      ${list("Perguntas diagnósticas", troubleshooting.diagnosticQuestions)}
      ${commands(troubleshooting.commands)}
      ${decisionTree(troubleshooting.decisionTree)}
    </div>
  </section>`;
}
