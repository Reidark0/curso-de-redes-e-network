#!/usr/bin/env node
// Uso: node revisao/tools/quiz_normalizar.js <id>
// Converte o quiz de revisao/trabalho/<id>/nova/meta.json para o padrão
// { id, question, options, answer:<índice base 0>, explanation, [topic, difficulty, type, domain] }.
// Converte a/answer textual/correctAnswer/correctIndex. Questão sem id recebe id = String(índice original),
// que é exatamente a chave que o app já usava para salvar a resposta (progress.js: question.id ?? index),
// preservando o progresso salvo dos alunos (ver DECISOES.md). Questões NOVAS devem usar ids "q<N>" inéditos.
// Não altera o texto das questões. Lista o que não conseguiu converter (para revisão humana).
'use strict';
const L = require('./lib.js');
const { path } = L;
const id = process.argv[2];
if (!id) { console.error('uso: quiz_normalizar <id>'); process.exit(2); }
const p = path.join(L.REV, 'trabalho', id, 'nova', 'meta.json');
const meta = L.readJSON(p);
const quiz = Array.isArray(meta.quiz) ? meta.quiz : [];
const norm = (s) => String(s).trim().replace(/\s+/g, ' ').toLowerCase();
const problemas = []; const conversoes = {};
const used = new Set(quiz.map((q) => q.id).filter(Boolean).map(String));
let seq = 0;
const nextId = () => { do { seq += 1; } while (used.has(`q${seq}`)); used.add(`q${seq}`); return `q${seq}`; };
const out = quiz.map((q, i) => {
  const options = q.options ?? q.opts ?? [];
  const question = q.question ?? q.q ?? '';
  const explanation = q.explanation ?? q.exp ?? '';
  let answer; let via;
  const fromValue = (v, nome) => {
    if (typeof v === 'number' && Number.isInteger(v)) return [v, nome + ':indice'];
    if (typeof v === 'string') {
      if (/^\d+$/.test(v.trim()) && !options.some((o) => norm(o) === norm(v))) return [Number(v), nome + ':indice-texto'];
      let idx = options.findIndex((o) => String(o) === v);
      if (idx >= 0) return [idx, nome + ':texto-exato'];
      idx = options.findIndex((o) => norm(o) === norm(v));
      if (idx >= 0) return [idx, nome + ':texto-normalizado'];
      if (/^[A-Ha-h]$/.test(v.trim())) return [v.trim().toUpperCase().charCodeAt(0) - 65, nome + ':letra'];
      return [undefined, nome + ':SEM-CORRESPONDENCIA'];
    }
    return [undefined, null];
  };
  for (const [k, nome] of [['a', 'a'], ['answer', 'answer'], ['correctIndex', 'correctIndex'], ['correctAnswer', 'correctAnswer']]) {
    if (k in q) { [answer, via] = fromValue(q[k], nome); if (via) break; }
  }
  conversoes[via || 'sem-resposta'] = (conversoes[via || 'sem-resposta'] || 0) + 1;
  const qid = q.id ? String(q.id) : (used.has(String(i)) ? nextId() : (used.add(String(i)), String(i)));
  if (!Number.isInteger(answer) || answer < 0 || answer >= options.length) problemas.push(`${qid}: resposta não convertida (${via}) valor=${JSON.stringify(q.a ?? q.answer ?? q.correctIndex ?? q.correctAnswer)}`);
  const res = { id: qid, question, options, answer, explanation };
  for (const k of ['topic', 'difficulty', 'type', 'domain']) if (q[k] !== undefined) res[k] = q[k];
  for (const k of Object.keys(q)) if (!['id', 'q', 'question', 'opts', 'options', 'a', 'answer', 'correctIndex', 'correctAnswer', 'exp', 'explanation', 'topic', 'difficulty', 'type', 'domain'].includes(k)) { res[k] = q[k]; problemas.push(`${qid}: chave extra preservada "${k}"`); }
  if (!q.id) res.__idCriado = true;
  return res;
});
const criados = out.filter((q) => q.__idCriado).map((q) => q.id); out.forEach((q) => delete q.__idCriado);
meta.quiz = out;
L.writeJSON(p, meta);
console.log(JSON.stringify({ id, questoes: out.length, conversoes, idsCriados: criados, problemas }));
