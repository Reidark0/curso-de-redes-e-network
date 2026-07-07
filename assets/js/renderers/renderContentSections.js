import { escapeHtml, asArray } from "../utils/text.js";

const GROUPS = [
  {
    id: "intro",
    title: "Introdução",
    description: "Objetivos, resultados, motivação, resumo e glossário da aula antes do mergulho técnico.",
    items: [
      ["objectives", "Objetivos"],
      ["learningOutcomes", "Resultados de aprendizagem"],
      ["motivation", "Motivação"],
      ["summary", "Resumo"],
      ["glossary", "Glossário"]
    ]
  },
  {
    id: "contexto",
    title: "Contexto",
    description: "A história, o problema real e a evolução que explicam por que o tema existe.",
    items: [
      ["history", "História"],
      ["problem", "Problema"],
      ["evolution", "Evolução"]
    ]
  },
  {
    id: "conteudo",
    title: "Conteúdo",
    description: "O conceito, seu funcionamento interno, arquitetura e representação visual.",
    items: [
      ["concept", "Conceito"],
      ["internals", "Funcionamento interno"],
      ["architecture", "Arquitetura"],
      ["diagram", "Diagrama SVG"]
    ]
  },
  {
    id: "exemplos",
    title: "Exemplos",
    description: "Da analogia inicial ao uso doméstico, empresarial, cloud, DevSecOps e segurança.",
    collapsible: true,
    items: [
      ["analogy", "Analogia", "A comparação que ajuda a criar um modelo mental, com seus limites."],
      ["simpleExample", "Exemplo simples", "Um cenário pequeno para entender sem ruído corporativo."],
      ["enterpriseExample", "Exemplo empresarial", "Como o tema aparece em empresa, SOC, filial, datacenter ou operação real."],
      ["cloudExample", "Exemplo em cloud", "Como a ideia aparece em AWS, Azure, Google Cloud ou redes virtuais."],
      ["devsecopsExample", "Exemplo em DevSecOps", "Relação com pipelines, IaC, Kubernetes, automação ou plataforma."],
      ["securityExample", "Exemplo em Segurança", "Riscos, abusos comuns, detecção e mitigação defensiva. "]
    ]
  }
];

function stripOuterLessonSection(html = "") {
  let value = String(html || "").trim();
  value = value.replace(/^<section\b[^>]*>/i, "").replace(/<\/section>\s*$/i, "").trim();
  value = value.replace(/^<h2\b[^>]*>[\s\S]*?<\/h2>\s*/i, "").trim();
  return value;
}

function renderListBlock(id, title, values = []) {
  if (!Array.isArray(values) || !values.length) return "";
  return `<article id="section-${escapeHtml(id)}" class="lesson-subsection lesson-subsection--${escapeHtml(id)}" data-section="${escapeHtml(id)}">
    <h3>${escapeHtml(title)}</h3>
    <ul>${values.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
  </article>`;
}

function renderGlossaryBlock(glossary = []) {
  if (!Array.isArray(glossary) || !glossary.length) return "";
  return `<article id="section-glossary" class="lesson-subsection lesson-subsection--glossary" data-section="glossary">
    <h3>Glossário</h3>
    <p class="muted-text">Termos essenciais desta aula para consulta rápida antes e durante o estudo.</p>
    <div class="glossary-inline-list">${glossary.map((g) => `<details class="content-card glossary-item"><summary><strong>${escapeHtml(g.term || "Termo")}</strong></summary><p>${escapeHtml(g.shortDefinition || g.definition || "")}</p>${g.longDefinition ? `<p>${escapeHtml(g.longDefinition)}</p>` : ""}${g.example ? `<p><strong>Exemplo:</strong> ${escapeHtml(g.example)}</p>` : ""}${asArray(g.relatedTerms).length ? `<p><strong>Relacionados:</strong> ${asArray(g.relatedTerms).map(escapeHtml).join(", ")}</p>` : ""}</details>`).join("")}</div>
  </article>`;
}

function renderHtmlBlock(key, title, html) {
  if (!html) return "";
  const cleaned = stripOuterLessonSection(html);
  if (!cleaned) return "";
  return `<article id="section-${escapeHtml(key)}" class="lesson-subsection lesson-subsection--${escapeHtml(key)}" data-section="${escapeHtml(key)}">
    <h3>${escapeHtml(title)}</h3>
    ${cleaned}
  </article>`;
}

function renderExamplePanel(key, title, description, html) {
  const cleaned = stripOuterLessonSection(html);
  if (!cleaned) return "";
  return `<details id="section-${escapeHtml(key)}" class="fixation-panel example-panel">
    <summary>
      <span>${escapeHtml(title)}</span>
      ${description ? `<small>${escapeHtml(description)}</small>` : ""}
    </summary>
    <div class="fixation-panel__body example-panel__body">${cleaned}</div>
  </details>`;
}

export function renderContentSections(lesson = {}) {
  const content = lesson.content || {};
  return GROUPS.map((group) => {
    const body = group.items.map(([key, title, description]) => {
      if (key === "objectives") return renderListBlock("objectives", title, lesson.objectives || []);
      if (key === "learningOutcomes") return renderListBlock("learningOutcomes", title, lesson.learningOutcomes || []);
      if (key === "glossary") return renderGlossaryBlock(lesson.glossary || []);
      if (group.collapsible) return renderExamplePanel(key, title, description, content[key]);
      return renderHtmlBlock(key, title, content[key]);
    }).filter(Boolean).join("");

    if (!body) return "";
    return `<section id="group-${group.id}" class="lesson-section lesson-group lesson-group--${group.id}" data-topic-group="${group.id}">
      <div class="section-heading-row">
        <div>
          <span class="eyebrow">Bloco da aula</span>
          <h2>${escapeHtml(group.title)}</h2>
        </div>
      </div>
      <p class="muted-text lesson-group-description">${escapeHtml(group.description)}</p>
      <div class="${group.collapsible ? "fixation-list examples-list" : "lesson-subsection-list"}">${body}</div>
    </section>`;
  }).join("");
}
