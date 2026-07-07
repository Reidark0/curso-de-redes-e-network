import { readJson, writeJson } from "./storage.js";
export function getNote(id) { return readJson("notes", {})[id] || ""; }
export function setNote(id, value) {
  const notes = readJson("notes", {});
  notes[id] = value;
  writeJson("notes", notes);
}
