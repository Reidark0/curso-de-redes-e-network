#!/usr/bin/env node
// Uso: node revisao/tools/quiz_embaralhar.js <id>
// Redistribui a posição da resposta correta no quiz de revisao/trabalho_v2/<id>/nova/meta.json quando o gabarito
// está concentrado (>60% no mesmo índice). Troca a opção correta de lugar com a opção da posição-alvo (determinístico).
// Seguro para o progresso salvo: o app calcula a nota pelo campo isCorrect salvo, não pelo índice escolhido.
'use strict';
const L = require('./lib.js');
const { path } = L;
const id = process.argv[2];
const p = path.join(L.WORK, id, 'nova', 'meta.json');
const meta = L.readJSON(p);
const quiz = meta.quiz || [];
const dist = (q) => { const d = {}; q.forEach((x) => { d[x.answer] = (d[x.answer] || 0) + 1; }); return d; };
const antes = dist(quiz);
if (Math.max(...Object.values(antes)) / quiz.length <= 0.6) { console.log(JSON.stringify({ id, mudou: false, distribuicao: antes })); process.exit(0); }
const refs = /\b(alternativa|opção|letra)\s+[a-e]\b|\b(a|b|c|d) e (a|b|c|d)\b|anteriores/i;
const trocadas = [];
quiz.forEach((q, i) => {
  const n = q.options.length; const alvo = [1, 2, 0, 3, 1, 2, 3, 0, 2, 1][i % 10] % n;
  if (q.answer === alvo || q.options.some((o) => refs.test(String(o)))) return;
  const opts = [...q.options]; [opts[q.answer], opts[alvo]] = [opts[alvo], opts[q.answer]];
  q.options = opts; trocadas.push(`${q.id}:${q.answer}->${alvo}`); q.answer = alvo;
});
L.writeJSON(p, meta);
console.log(JSON.stringify({ id, mudou: true, antes, depois: dist(quiz), trocadas }));
