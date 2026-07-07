import { courseData } from "../../data/course-data.js";
import { configureStorage, readString, writeString } from "./services/storage.js";
import { buildSearchIndex, searchLessons } from "./services/search.js";
import { getOverallProgress, getModuleProgress, markLessonOpened, findLastOpened, getLessonVisualState } from "./services/progress.js";
import { isFavorite } from "./services/favorites.js";
import { renderLesson } from "./renderers/renderLesson.js";
import { escapeHtml, truncate } from "./utils/text.js";

configureStorage(courseData);
const state = {
  courseData,
  lessons: courseData.modules.flatMap((module) => (module.lessons || []).map((lesson) => ({ module, lesson }))),
  currentLessonId: null,
  currentModuleId: null,
  searchIndex: null,
  openModuleIds: new Set()
};
state.searchIndex = buildSearchIndex(courseData);

const $ = (selector) => document.querySelector(selector);
const moduleNav = $("#module-nav");
const dashboard = $("#dashboard-grid");
const homeOverview = $("#home-overview");
const moduleDetail = $("#module-detail");
const sidebarBackdrop = $("#sidebar-backdrop");
const toggleModulesButton = $("#toggle-modules");
const lessonLayout = $("#lesson-layout");
const lessonContainer = $("#lesson-container");
const lessonAside = $("#lesson-aside");
const hero = $("#course-hero");
const menuToggle = $("#menu-toggle");
const sidebarClose = $("#sidebar-close");
const sidebarHome = $("#sidebar-home");
const brandHome = $("#brand-home");

function toast(message) {
  const region = $("#toast-region");
  const item = document.createElement("div");
  item.className = "toast";
  item.textContent = message;
  region.appendChild(item);
  setTimeout(() => item.remove(), 2600);
}

function applyTheme() {
  const theme = readString("theme", "light");
  document.documentElement.dataset.theme = theme;
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  writeString("theme", next);
}

function setSidebarExpanded(expanded) {
  const isMobile = window.matchMedia("(max-width: 920px)").matches;
  if (isMobile) {
    document.body.classList.toggle("sidebar-open", expanded);
    document.body.classList.remove("sidebar-collapsed");
    if (sidebarBackdrop) sidebarBackdrop.hidden = !expanded;
  } else {
    document.body.classList.toggle("sidebar-collapsed", !expanded);
    document.body.classList.remove("sidebar-open");
    if (sidebarBackdrop) sidebarBackdrop.hidden = true;
  }
  menuToggle?.setAttribute("aria-expanded", String(expanded));
}

function toggleSidebar() {
  if (window.matchMedia("(max-width: 920px)").matches) {
    setSidebarExpanded(!document.body.classList.contains("sidebar-open"));
  } else {
    setSidebarExpanded(document.body.classList.contains("sidebar-collapsed"));
  }
}

function moduleGroups() {
  return [...moduleNav.querySelectorAll(".module-group")];
}

function syncModuleToggleButton() {
  if (!toggleModulesButton) return;
  const groups = moduleGroups();
  const allOpen = groups.length > 0 && groups.every((group) => group.classList.contains("is-open"));
  toggleModulesButton.textContent = allOpen ? "Recolher módulos" : "Expandir módulos";
  toggleModulesButton.setAttribute("aria-pressed", String(allOpen));
}

function renderProgressTrack(metrics) {
  return `<div class="progress-track progress-track--dual"><span class="progress-track__marked" style="width:${metrics.markedPercent}%"></span><span class="progress-track__complete" style="width:${metrics.percent}%"></span></div>`;
}

function renderMarkedCounter(metrics, className = "badge badge--marked") {
  if (!metrics.marked) return "";
  return `<span class="${className}" title="Aulas marcadas ou concluídas">${metrics.marked}/${metrics.total}</span>`;
}

function renderModuleProgressSummary(metrics) {
  const markedPart = metrics.marked ? `${renderMarkedCounter(metrics, "module-progress-marked")}<span class="module-progress-separator" aria-hidden="true">·</span>` : "";
  return `${markedPart}<span>${metrics.complete}/${metrics.total} concluídas</span>`;
}

function renderOverallProgressDetail(metrics) {
  const markedPart = metrics.marked ? `<span class="progress-detail-marked" title="Aulas marcadas ou concluídas">${metrics.marked}/${metrics.total}</span> · ` : "";
  return `${markedPart}${metrics.complete}/${metrics.total} concluídas`;
}

function updateProgress() {
  const { complete, marked, total, percent, markedPercent } = getOverallProgress(courseData);
  $("#overall-progress-text").textContent = `${percent}%`;
  $("#overall-progress-bar").style.width = `${percent}%`;
  const markedBar = $("#overall-marked-progress-bar");
  if (markedBar) markedBar.style.width = `${markedPercent}%`;
  $("#overall-progress-detail").innerHTML = renderOverallProgressDetail({ complete, marked, total });
  renderSidebar();
}

function lessonStateClass(lesson) {
  const state = getLessonVisualState(lesson);
  if (state.complete) return "is-complete";
  if (state.marked) return "is-marked";
  return "";
}

function renderSidebar() {
  moduleNav.innerHTML = courseData.modules.map((module) => {
    const mp = getModuleProgress(module);
    const open = state.openModuleIds.has(module.id);
    return `<section class="module-group ${open ? "is-open" : ""}">
      <div class="module-button">
        <button class="module-number" type="button" data-open-module-sidebar="${module.id}" title="Abrir página do módulo">${String(module.number).padStart(2, "0")}</button>
        <button class="module-toggle-control" type="button" data-module-toggle="${module.id}" aria-expanded="${open ? "true" : "false"}">
          <span><strong>${escapeHtml(module.title)}</strong><small class="module-progress-summary">${renderModuleProgressSummary(mp)}</small></span>
        </button>
      </div>
      <div class="lesson-list">
        ${(module.lessons || []).map((lesson) => `<button class="lesson-link ${lesson.id === state.currentLessonId ? "is-active" : ""} ${lessonStateClass(lesson)} ${isFavorite(lesson.id) ? "is-favorite" : ""}" data-lesson-id="${lesson.id}">
          <span class="status-dot"></span><span><strong>${escapeHtml(lesson.id)} · ${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.duration || lesson.difficulty || "")}</small></span><span>›</span>
        </button>`).join("")}
      </div>
    </section>`;
  }).join("");
  syncModuleToggleButton();
}

function renderHomeOverview() {
  const overall = getOverallProgress(courseData);
  const totalModules = courseData.modules.length;
  const totalLessons = state.lessons.length;
  const last = findLastOpened(courseData);
  if (!homeOverview) return;
  homeOverview.innerHTML = `<article class="stat-card"><span>Módulos</span><strong>${totalModules}</strong><small>trilha completa e sem bloqueios</small></article>
    <article class="stat-card"><span>Aulas</span><strong>${totalLessons}</strong><small>conteúdo agregado no curso</small></article>
    <article class="stat-card"><span>Concluídas</span><strong>${overall.complete}</strong><small>aulas finalizadas</small></article>
    <article class="stat-card"><span>Continuar</span><strong>${escapeHtml(last.id)}</strong><small>${escapeHtml(truncate(last.title || "", 54))}</small></article>`;
}

function renderDashboard() {
  dashboard.innerHTML = courseData.modules.map((module) => {
    const mp = getModuleProgress(module);
    return `<article class="module-card">
      <span class="eyebrow">Módulo ${String(module.number).padStart(2, "0")}</span>
      <h3>${escapeHtml(module.title)}</h3>
      <p>${escapeHtml(truncate(module.subtitle || module.objectives?.[0] || "", 170))}</p>
      <div class="module-card-meta"><span class="badge">${escapeHtml(module.level || "progressivo")}</span><span class="badge">${mp.total} aulas</span>${renderMarkedCounter(mp)}</div>
      ${renderProgressTrack(mp)}
      <div class="module-card-footer"><span class="badge">${mp.complete}/${mp.total} concluídas</span><button class="button button--secondary" data-open-module="${module.id}">Abrir módulo</button></div>
    </article>`;
  }).join("");
}

function moduleLessonRows(module) {
  return (module.lessons || []).map((lesson) => {
    const visual = getLessonVisualState(lesson);
    const status = visual.complete ? "Concluída" : (visual.marked ? "Marcada" : "Pendente");
    return `<button class="module-lesson-row ${lessonStateClass(lesson)} ${isFavorite(lesson.id) ? "is-favorite" : ""}" data-module-lesson-id="${lesson.id}">
      <span class="status-dot"></span>
      <span class="module-lesson-main"><strong>${escapeHtml(lesson.id)} · ${escapeHtml(lesson.title)}</strong><small>${escapeHtml(lesson.subtitle || lesson.duration || lesson.difficulty || "")}</small></span>
      <span class="badge">${escapeHtml(isFavorite(lesson.id) ? `${status} · Favorita` : status)}</span>
    </button>`;
  }).join("");
}

function renderModuleDetail(module) {
  const mp = getModuleProgress(module);
  const objectives = (module.objectives || []).map((objective) => `<li>${escapeHtml(objective)}</li>`).join("");
  const deliverables = (module.moduleProject?.expectedDeliverables || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  moduleDetail.innerHTML = `<article class="module-detail-card">
    <div class="module-detail-header">
      <div>
        <span class="eyebrow">Módulo ${String(module.number).padStart(2, "0")}</span>
        <h2>${escapeHtml(module.title)}</h2>
        <p>${escapeHtml(module.subtitle || "")}</p>
      </div>
      <div class="module-detail-actions">
        <button class="button button--ghost" data-back-home>Voltar</button>
        <button class="button button--primary" data-start-module="${module.id}">Iniciar módulo</button>
      </div>
    </div>
    <div class="module-detail-meta">
      <span class="badge">${escapeHtml(module.level || "progressivo")}</span>
      <span class="badge">${escapeHtml(String(module.estimatedHours || ""))} h estimadas</span>
      ${renderMarkedCounter(mp)}
      <span class="badge">${mp.complete}/${mp.total} aulas concluídas</span>
    </div>
    ${renderProgressTrack(mp)}
    <div class="module-detail-grid">
      <section class="content-card module-detail-section">
        <h3>Descrição do módulo</h3>
        <p>${escapeHtml(module.subtitle || module.objectives?.[0] || "")}</p>
        ${objectives ? `<h4>Objetivos</h4><ul class="checklist module-objectives">${objectives}</ul>` : ""}
      </section>
      <section class="content-card module-detail-section">
        <h3>Projeto ou entrega do módulo</h3>
        ${module.moduleProject?.title ? `<p><strong>${escapeHtml(module.moduleProject.title)}</strong></p>` : ""}
        ${deliverables ? `<ul class="checklist module-objectives">${deliverables}</ul>` : `<p class="muted-text">Este módulo usa exercícios, quiz, desafios e práticas equivalentes dentro das aulas.</p>`}
      </section>
    </div>
    <section class="content-card module-detail-section module-lessons-panel">
      <div class="section-heading-row"><div><span class="eyebrow">Conteúdo</span><h3>Aulas do módulo</h3></div><span class="badge">${mp.total} aulas</span></div>
      <div class="module-lesson-list">${moduleLessonRows(module)}</div>
    </section>
  </article>`;
}

function findLesson(lessonId) {
  return state.lessons.find((item) => item.lesson.id === lessonId) || state.lessons[0];
}

function getNavigation(lessonId) {
  const idx = state.lessons.findIndex((item) => item.lesson.id === lessonId);
  return {
    prev: idx > 0 ? { lessonId: state.lessons[idx - 1].lesson.id } : null,
    next: idx >= 0 && idx < state.lessons.length - 1 ? { lessonId: state.lessons[idx + 1].lesson.id } : null
  };
}

function openLesson(lessonId, updateHash = true) {
  const item = findLesson(lessonId);
  state.currentLessonId = item.lesson.id;
  state.currentModuleId = item.module.id;
  document.body.classList.remove("view-home", "view-module");
  document.body.classList.add("view-lesson");
  hero.hidden = true;
  dashboard.hidden = true;
  if (moduleDetail) moduleDetail.hidden = true;
  lessonLayout.hidden = false;
  markLessonOpened(item.lesson.id);
  renderLesson(lessonContainer, lessonAside, item.module, item.lesson, getNavigation(item.lesson.id));
  updateProgress();
  if (updateHash) history.replaceState(null, "", `#lesson-${item.lesson.id}`);
  $("#lesson-main").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModule(moduleId, updateHash = true) {
  const module = courseData.modules.find((m) => m.id === moduleId) || courseData.modules[0];
  state.currentLessonId = null;
  state.currentModuleId = module.id;
  document.body.classList.remove("view-home", "view-lesson");
  document.body.classList.add("view-module");
  hero.hidden = true;
  dashboard.hidden = true;
  if (moduleDetail) moduleDetail.hidden = false;
  lessonLayout.hidden = true;
  renderModuleDetail(module);
  updateProgress();
  if (updateHash) history.replaceState(null, "", `#module-${module.id}`);
  $("#lesson-main").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openDashboard(updateHash = true) {
  state.currentLessonId = null;
  state.currentModuleId = null;
  document.body.classList.add("view-home");
  document.body.classList.remove("view-lesson", "view-module");
  hero.hidden = false;
  dashboard.hidden = false;
  if (moduleDetail) moduleDetail.hidden = true;
  lessonLayout.hidden = true;
  renderHomeOverview();
  renderDashboard();
  updateProgress();
  if (updateHash) history.replaceState(null, "", "#home");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openNextFromTopbar() {
  const baseLesson = state.currentLessonId || findLastOpened(courseData).id;
  const next = getNavigation(baseLesson).next;
  openLesson(next?.lessonId || baseLesson);
}

function openPreviousFromTopbar() {
  const baseLesson = state.currentLessonId || findLastOpened(courseData).id;
  const prev = getNavigation(baseLesson).prev;
  openLesson(prev?.lessonId || baseLesson);
}

function bindEvents() {
  $("#theme-toggle").addEventListener("click", toggleTheme);
  $("#back-button")?.addEventListener("click", openPreviousFromTopbar);
  $("#continue-button").addEventListener("click", openNextFromTopbar);
  $("#hero-start").addEventListener("click", () => openLesson(findLastOpened(courseData).id));
  menuToggle?.addEventListener("click", toggleSidebar);
  sidebarClose?.addEventListener("click", () => setSidebarExpanded(false));
  sidebarHome?.addEventListener("click", () => {
    openDashboard();
  });
  brandHome?.addEventListener("click", () => {
    openDashboard();
  });
  sidebarBackdrop?.addEventListener("click", () => setSidebarExpanded(false));
  toggleModulesButton?.addEventListener("click", () => {
    const groups = moduleGroups();
    const allOpen = groups.length > 0 && groups.every((group) => group.classList.contains("is-open"));
    state.openModuleIds = allOpen ? new Set() : new Set(courseData.modules.map((module) => module.id));
    groups.forEach((group) => group.classList.toggle("is-open", !allOpen));
    groups.forEach((group) => group.querySelector("[data-module-toggle]")?.setAttribute("aria-expanded", String(!allOpen)));
    syncModuleToggleButton();
  });

  moduleNav.addEventListener("click", (event) => {
    const moduleOpen = event.target.closest("[data-open-module-sidebar]");
    const toggle = event.target.closest("[data-module-toggle]");
    const lesson = event.target.closest("[data-lesson-id]");
    if (moduleOpen) {
      event.preventDefault();
      event.stopPropagation();
      openModule(moduleOpen.dataset.openModuleSidebar);
      return;
    }
    if (toggle) {
      const moduleId = toggle.dataset.moduleToggle;
      const shouldOpen = !state.openModuleIds.has(moduleId);
      if (shouldOpen) state.openModuleIds.add(moduleId);
      else state.openModuleIds.delete(moduleId);
      toggle.closest(".module-group").classList.toggle("is-open", shouldOpen);
      toggle.setAttribute("aria-expanded", String(shouldOpen));
      syncModuleToggleButton();
    }
    if (lesson) { openLesson(lesson.dataset.lessonId); }
  });
  moduleNav.addEventListener("keydown", (event) => {
    const moduleOpen = event.target.closest("[data-open-module-sidebar]");
    if (!moduleOpen || !["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    openModule(moduleOpen.dataset.openModuleSidebar);
  });

  dashboard.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-module]");
    if (!button) return;
    openModule(button.dataset.openModule);
  });
  moduleDetail?.addEventListener("click", (event) => {
    const back = event.target.closest("[data-back-home]");
    const start = event.target.closest("[data-start-module]");
    const lesson = event.target.closest("[data-module-lesson-id]");
    if (back) openDashboard();
    if (start) {
      const module = courseData.modules.find((m) => m.id === start.dataset.startModule);
      if (module?.lessons?.[0]) openLesson(module.lessons[0].id);
    }
    if (lesson) openLesson(lesson.dataset.moduleLessonId);
  });

  const searchInput = $("#global-search");
  const results = $("#search-results");
  searchInput.addEventListener("input", () => {
    const matches = searchLessons(state.searchIndex, searchInput.value);
    if (!matches.length) { results.hidden = true; results.innerHTML = ""; return; }
    results.hidden = false;
    results.innerHTML = matches.map((m) => `<button class="search-item" data-search-lesson="${m.lessonId}"><strong>${escapeHtml(m.lessonId)} · ${escapeHtml(m.title)}</strong><small>${escapeHtml(m.moduleTitle)} — ${escapeHtml(m.subtitle)}</small></button>`).join("");
  });
  results.addEventListener("click", (event) => {
    const item = event.target.closest("[data-search-lesson]");
    if (!item) return;
    searchInput.value = "";
    results.hidden = true;
    openLesson(item.dataset.searchLesson);
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".topbar-search")) results.hidden = true;
  });
  window.addEventListener("resize", () => {
    document.body.classList.remove("sidebar-open");
    if (sidebarBackdrop) sidebarBackdrop.hidden = true;
    if (window.matchMedia("(max-width: 920px)").matches) document.body.classList.remove("sidebar-collapsed");
  });
  document.addEventListener("course:open-lesson", (event) => openLesson(event.detail.lessonId));
  document.addEventListener("course:open-module", (event) => openModule(event.detail.moduleId));
  document.addEventListener("course:go-home", () => openDashboard());
  document.addEventListener("course:favorites-updated", () => {
    renderSidebar();
    if (document.body.classList.contains("view-module") && state.currentModuleId) {
      const module = courseData.modules.find((m) => m.id === state.currentModuleId);
      if (module) renderModuleDetail(module);
    }
  });
  document.addEventListener("course:progress-updated", () => { updateProgress(); toast("Progresso atualizado."); });
}

function startFromHash() {
  const hash = decodeURIComponent(location.hash || "");
  const lessonMatch = hash.match(/^#lesson-(.+)$/);
  const moduleMatch = hash.match(/^#module-(.+)$/);
  if (lessonMatch) openLesson(lessonMatch[1], false);
  else if (moduleMatch) openModule(moduleMatch[1], false);
  else openDashboard(false);
}

applyTheme();
renderSidebar();
renderHomeOverview();
renderDashboard();
bindEvents();
startFromHash();
