import { readJson, writeJson } from "./storage.js";
export function getFavorites() { return readJson("favorites", {}); }
export function isFavorite(id) { return Boolean(getFavorites()[id]); }
export function toggleFavorite(id) {
  const favorites = getFavorites();
  if (favorites[id]) delete favorites[id]; else favorites[id] = { savedAt: new Date().toISOString() };
  writeJson("favorites", favorites);
  return Boolean(favorites[id]);
}
