#!/usr/bin/env node
// Uso: node revisao/tools/ajustar.js <id> regras|duracao
//   regras  -> em revisao/trabalho_v2/<id>/nova/meta.json: progressRules = { completeWhen, accessPolicy, unlocks } (3.7)
//              com completeWhen = { read: true, quizScoreAtLeast: 70 } (aula de projeto com regras próprias mantém as do original);
//              accessPolicy e unlocks vêm do original; as outras chaves de progressRules (legado, o app não lê) saem.
//              Também remove learningOutcomes e, nos módulos 0–2, security e troubleshooting.
//   duracao -> lê metricas_nova.json (rode montar + metricas <id> nova antes) e grava duration = faixa recomendada
//              e estimatedStudyTimeMinutes = Y. Depois rode montar de novo.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const [id, op] = process.argv.slice(2);
if (!id || !['regras', 'duracao'].includes(op)) { console.error('uso: ajustar <id> regras|duracao'); process.exit(2); }
const p = path.join(L.WORK, id, 'nova', 'meta.json');
const meta = L.readJSON(p);
const orig = L.loadOriginal(id).obj;
const feito = [];
if (op === 'regras') {
  const op0 = orig.progressRules || {};
  const cw = L.hasOwnProjectRules(orig) ? op0.completeWhen : { ...L.STD_COMPLETE };
  const pr = {};
  for (const k of Object.keys(op0)) { if (k === 'completeWhen') pr.completeWhen = cw; else if (k === 'accessPolicy' || k === 'unlocks') pr[k] = op0[k]; }
  if (!pr.completeWhen) pr.completeWhen = cw;
  const saiu = Object.keys(meta.progressRules || {}).filter((k) => !['completeWhen', 'accessPolicy', 'unlocks'].includes(k));
  meta.progressRules = pr; feito.push(`progressRules.completeWhen = ${JSON.stringify(cw)}${saiu.length ? `; chaves de legado removidas: ${saiu.join(', ')}` : ''}`);
  if ('learningOutcomes' in meta) { delete meta.learningOutcomes; feito.push('learningOutcomes removido'); }
  if (L.moduleNum(id) <= 2) for (const k of ['security', 'troubleshooting']) if (k in meta) { delete meta[k]; feito.push(`${k} removido (módulo ${L.moduleNum(id)})`); }
} else {
  const mp = path.join(L.WORK, id, 'metricas_nova.json');
  if (!fs.existsSync(mp)) { console.error('rode montar e metricas <id> nova antes'); process.exit(1); }
  const m = L.readJSON(mp);
  meta.duration = m.duracao.recomendada; meta.estimatedStudyTimeMinutes = m.duracao.estimatedStudyTimeMinutesRecomendado;
  feito.push(`duration = "${meta.duration}", estimatedStudyTimeMinutes = ${meta.estimatedStudyTimeMinutes} (núcleo ${m.duracao.nucleo} min, prática extra ${m.duracao.praticaExtra} min)`);
}
L.writeJSON(p, meta);
console.log(JSON.stringify({ id, op, feito }));
