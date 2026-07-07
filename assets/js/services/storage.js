const FALLBACK_PREFIX = "redes-e-network.2.0";
let keys = {
  progress: `${FALLBACK_PREFIX}.progress`,
  notes: `${FALLBACK_PREFIX}.notes`,
  favorites: `${FALLBACK_PREFIX}.favorites`,
  quiz: `${FALLBACK_PREFIX}.quiz`,
  labs: `${FALLBACK_PREFIX}.labs`,
  unlockedModules: `${FALLBACK_PREFIX}.unlockedModules`,
  theme: "universidade-tecnica.theme"
};

export function configureStorage(courseData) {
  keys = { ...keys, ...(courseData?.storage?.keys || {}) };
}

export function storageKey(name) { return keys[name]; }

export function readJson(name, fallback) {
  try {
    const raw = localStorage.getItem(storageKey(name));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(name, value) {
  localStorage.setItem(storageKey(name), JSON.stringify(value));
}

export function readString(name, fallback = "") {
  return localStorage.getItem(storageKey(name)) ?? fallback;
}

export function writeString(name, value) {
  localStorage.setItem(storageKey(name), String(value));
}
