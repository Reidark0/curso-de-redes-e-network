import { escapeHtml, asArray } from "../utils/text.js";

function list(title, items = []) {
  const arr = asArray(items).filter(Boolean);
  if (!arr.length) return "";
  return `<div class="ops-panel"><h3>${escapeHtml(title)}</h3><ul>${arr.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>`;
}

function vulnerabilities(items = []) {
  const arr = asArray(items).filter(Boolean);
  if (!arr.length) return "";
  return `<div class="ops-panel ops-panel--wide"><h3>Vulnerabilidades, riscos e mitigação</h3>
    <div class="responsive-table"><table class="data-table"><thead><tr><th>Risco</th><th>Descrição</th><th>Leitura defensiva</th><th>Mitigação</th></tr></thead><tbody>
    ${arr.map((v) => `<tr><td>${escapeHtml(v.name || "Risco")}</td><td>${escapeHtml(v.description || "")}</td><td>${escapeHtml(v.defensiveExplanation || v.exploitationIdea || "")}</td><td>${escapeHtml(v.mitigation || "")}</td></tr>`).join("")}
    </tbody></table></div></div>`;
}

export function renderSecurity(security) {
  if (!security) return "";
  return `<section id="section-security-structured" class="lesson-section operational-section operational-section--security">
    <span class="eyebrow">Segurança estruturada</span>
    <h2>Boas práticas, riscos, monitoramento e hardening</h2>
    <p>Esta seção organiza a leitura defensiva da aula em controles, erros comuns, riscos, mitigação e sinais de detecção.</p>
    <div class="ops-grid">
      ${list("Boas práticas", security.goodPractices)}
      ${list("Más práticas", security.badPractices)}
      ${list("Erros comuns", security.commonErrors)}
      ${vulnerabilities(security.vulnerabilities)}
      ${list("Monitoramento", security.monitoring)}
      ${list("Hardening", security.hardening)}
      ${list("Ideias de detecção", security.detectionIdeas || security.detection)}
    </div>
  </section>`;
}
