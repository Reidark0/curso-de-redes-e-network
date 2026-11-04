#!/usr/bin/env node
// Uso: node revisao/tools/validar_single.js [arquivo.html] [--browser]
// 1) extrai o <script>, roda node --check; 2) confere 190 aulas e 18 módulos, sem duplicata/falta;
// 3) com --browser e Playwright disponível: abre cada #lesson-<id>, registra erros de console e clica na opção
//    correta da 1ª questão, conferindo se ela fica marcada como certa.
'use strict';
const L = require('./lib.js');
const { fs, path } = L;
const { execFileSync } = require('child_process');
const file = path.resolve(process.argv.find((a, i) => i > 1 && !a.startsWith('--')) || path.join(L.ROOT, 'redes_e_network_v2_1_single.html'));
const html = fs.readFileSync(file, 'utf8');
const res = { arquivo: path.relative(L.ROOT, file) };
const s0 = html.lastIndexOf('<script>'); const s1 = html.lastIndexOf('</script>');
const tmp = path.join(require('os').tmpdir(), `single_check_${process.pid}.js`);
fs.writeFileSync(tmp, html.slice(s0 + 8, s1));
try { execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' }); res.sintaxe = 'ok'; } catch (e) { res.sintaxe = 'ERRO: ' + String(e.stderr).slice(0, 500); }
fs.unlinkSync(tmp);
const aulas = [...html.matchAll(/^\/\* data\/lessons\/m\d\d\/lesson-\d\d-\d\d\.js \*\/$/mg)].map((m) => m[0]);
const mods = [...html.matchAll(/^\/\* data\/modules\/module-\d\d\.js \*\/$/mg)].map((m) => m[0]);
const consts = [...html.matchAll(/^const (lesson\d{4}) = /mg)].map((m) => m[1]);
res.aulas = aulas.length; res.aulasUnicas = new Set(aulas).size; res.modulos = mods.length; res.modulosUnicos = new Set(mods).size; res.constAulas = consts.length; res.constUnicas = new Set(consts).size;
const esperadas = L.courseOrder().map((o) => o.constName); res.faltando = esperadas.filter((c) => !consts.includes(c));
(async () => {
  if (process.argv.includes('--browser')) {
    let chromium; try { ({ chromium } = require('playwright')); } catch { res.browser = 'playwright indisponível'; }
    if (chromium) {
      const browser = await chromium.launch(); const page = await browser.newPage();
      const erros = []; let atual = '(load)';
      page.on('console', (m) => { if (m.type() === 'error') erros.push(`${atual}: ${m.text().slice(0, 200)}`); });
      page.on('pageerror', (e) => erros.push(`${atual}: ${String(e.message).slice(0, 200)}`));
      await page.goto('file://' + file); await page.waitForTimeout(1500);
      const quizFalhas = []; const semRender = []; let ok = 0;
      for (const o of L.courseOrder()) {
        atual = o.id;
        await page.evaluate((id) => { localStorage.clear(); location.hash = '#lesson-' + id; }, o.id);
        await page.reload(); await page.waitForSelector('#lesson-container .lesson-header', { timeout: 15000 }).catch(() => semRender.push(o.id));
        const titulo = await page.$eval('#lesson-container .lesson-header h2', (e) => e.textContent).catch(() => null);
        if (!titulo) { semRender.push(o.id); continue; }
        const r = await page.evaluate(() => {
          const btn = document.querySelector('.quiz-card .quiz-option');
          if (!btn) return { semQuiz: true };
          const correct = Number(btn.dataset.correct);
          const card = btn.closest('.quiz-card');
          const alvo = card.querySelector(`.quiz-option[data-option-index="${correct}"]`);
          if (!alvo) return { correct, alvo: false };
          card.closest('details')?.setAttribute('open', '');
          alvo.click();
          return { correct, marcado: alvo.classList.contains('is-correct') };
        });
        if (r.semQuiz || !r.marcado) quizFalhas.push(`${o.id}:${JSON.stringify(r)}`); else ok++;
      }
      await browser.close();
      res.browser = { aulasTestadas: L.courseOrder().length, quizOk: ok, quizFalhas, semRender, errosConsole: erros.slice(0, 50), totalErrosConsole: erros.length };
    }
  }
  console.log(JSON.stringify(res, null, 1));
})();
