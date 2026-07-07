import { asArray, escapeHtml } from "../utils/text.js";

function renderList(title, values) {
  const items = asArray(values).filter(Boolean);
  if (!items.length) return "";
  return `<div class="content-card lesson-section"><h3>${title}</h3><ul>${items.map((v) => `<li>${escapeHtml(typeof v === "string" ? v : JSON.stringify(v))}</li>`).join("")}</ul></div>`;
}

function normalizeStep(step, index) {
  if (typeof step === "string") return { number: index + 1, title: `Passo ${index + 1}`, instruction: step };
  return {
    number: step.number ?? step.step ?? index + 1,
    title: step.title || `Passo ${index + 1}`,
    instruction: step.instruction || step.description || step.action || "",
    command: step.command || (Array.isArray(step.commands) ? step.commands.join("\n") : ""),
    analysisTask: step.analysisTask || step.analysis || "",
    calculation: step.calculation || "",
    configuration: step.configuration || "",
    artifact: step.artifact || "",
    evidence: step.evidence || "",
    expectedOutput: step.expectedOutput || step.expectedResult || step.expected || "",
    explanation: step.explanation || step.reason || step.interpretation || ""
  };
}

export function renderLab(lab) {
  if (!lab) return "";
  const steps = asArray(lab.steps).map(normalizeStep);
  return `<section id="section-lab-structured" class="lesson-section lesson-section--lab-full">
    <h2>Laboratório estruturado</h2>
    <div class="lab-card">
      <span class="eyebrow">${escapeHtml(lab.id || "lab")}</span>
      <h3>${escapeHtml(lab.title || "Laboratório da aula")}</h3>
      ${lab.objective ? `<p><strong>Objetivo:</strong> ${escapeHtml(lab.objective)}</p>` : ""}
      ${lab.scenario ? `<p><strong>Cenário:</strong> ${escapeHtml(lab.scenario)}</p>` : ""}
      ${lab.topology ? `<p><strong>Topologia:</strong> ${escapeHtml(lab.topology)}</p>` : ""}
      ${lab.architecture ? `<p><strong>Arquitetura:</strong> ${escapeHtml(lab.architecture)}</p>` : ""}
      ${lab.cost ? `<p><strong>Custo:</strong> ${escapeHtml(lab.cost)}</p>` : ""}
    </div>
    ${renderList("Pré-requisitos", lab.prerequisites || lab.requirements)}
    ${renderList("Ferramentas", lab.tools)}
    ${renderList("Cuidados de segurança", lab.safetyNotes)}
    ${steps.length ? `<div class="lab-card"><h3>Passo a passo</h3>${steps.map((s) => `<div class="lab-step">
      <strong>${escapeHtml(String(s.number))}. ${escapeHtml(s.title)}</strong>
      ${s.instruction ? `<p>${escapeHtml(s.instruction)}</p>` : ""}
      ${s.command ? `<pre><code>${escapeHtml(s.command)}</code></pre>` : ""}
      ${s.analysisTask ? `<p><strong>Tarefa de análise:</strong> ${escapeHtml(s.analysisTask)}</p>` : ""}
      ${s.calculation ? `<p><strong>Cálculo:</strong> ${escapeHtml(s.calculation)}</p>` : ""}
      ${s.configuration ? `<p><strong>Configuração:</strong> ${escapeHtml(s.configuration)}</p>` : ""}
      ${s.artifact ? `<p><strong>Artefato:</strong> ${escapeHtml(s.artifact)}</p>` : ""}
      ${s.evidence ? `<p><strong>Evidência:</strong> ${escapeHtml(s.evidence)}</p>` : ""}
      ${s.expectedOutput ? `<p><strong>Resultado esperado:</strong> ${escapeHtml(s.expectedOutput)}</p>` : ""}
      ${s.explanation ? `<p><strong>Explicação:</strong> ${escapeHtml(s.explanation)}</p>` : ""}
    </div>`).join("")}</div>` : ""}
    ${lab.expectedResult ? `<div class="lab-card"><h3>Resultado esperado</h3><p>${escapeHtml(lab.expectedResult)}</p></div>` : ""}
    ${renderList("Validação", asArray(lab.validation).map((v) => typeof v === "string" ? v : `${v.check || "Check"}: ${v.command || v.method || ""} ${v.expected || ""} ${v.ifFails ? ` — Se falhar: ${v.ifFails}` : ""}`))}
    ${renderList("Troubleshooting", asArray(lab.troubleshooting).map((t) => typeof t === "string" ? t : `${t.symptom || "Sintoma"}: ${t.probableCause || ""} ${t.howToConfirm ? `Confirmar: ${t.howToConfirm}` : ""} ${t.fix ? `Correção: ${t.fix}` : ""}`))}
    ${renderList("Melhorias", lab.improvements)}
    ${renderList("Evidências a coletar", lab.evidenceToCollect)}
    ${renderList("Perguntas", lab.questions)}
    ${lab.challenge ? `<div class="lab-card"><h3>Desafio do laboratório</h3><p>${escapeHtml(lab.challenge)}</p></div>` : ""}
    ${lab.solution ? `<div class="lab-card"><h3>Solução comentada do laboratório</h3><p>${escapeHtml(lab.solution)}</p></div>` : ""}
  </section>`;
}
