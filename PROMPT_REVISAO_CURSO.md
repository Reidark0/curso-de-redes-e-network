# Revisão completa do curso "Redes e Network v2.0" — execução autônoma

Você vai trabalhar sozinho, possivelmente a noite inteira, sem ninguém para responder perguntas. Leia este arquivo inteiro antes de começar e siga-o à risca. Ele é a sua fonte de verdade. Se a sessão for interrompida, você (ou outra sessão) vai retomar a partir dos arquivos de progresso descritos aqui (seção 13).

Ordem de prioridade quando houver conflito: **qualidade do conteúdo > cobrir todas as aulas > velocidade.**

---

## 1. Missão

Revisar TODAS as aulas do curso, **uma por vez, de forma independente, em loop**, e para cada aula:

1. **Analisar e registrar:**
   - se a duração está organizada ou precisa de ajuste;
   - se há encheção de linguiça, e quanto;
   - se o conteúdo é realmente útil;
   - se o aproveitamento do tempo do aluno é bom;
   - se a aula poderia ser mais curta;
   - quais estruturas (seções/blocos) devem ser mantidas e quais podem ser retiradas, enxugadas ou fundidas;
   - onde a explicação pode ser mais direta sem perder qualidade.
2. **Criar uma nova versão da aula** na pasta `aulas novas/`, aplicando a análise.
3. **Validar** a nova versão antes de passar para a próxima.

No final: gerar um **novo arquivo single HTML** com as aulas novas e um **relatório consolidado**.

Meta de qualidade: o aluno deve aprender **a mesma coisa (ou mais) em menos tempo**. O corte vem de tirar redundância. Nunca corte conhecimento.

---

## 2. O que já se sabe sobre o curso (confirme no código antes de agir)

Uma análise prévia do single HTML encontrou o que está abaixo. Confirme cada ponto na Fase 0. Se o código real for diferente, vale o código real (registre em `DECISOES.md`).

**Estrutura**
- App SPA montado a partir de `assets/css/*.css`, `data/lessons/mXX/lesson-XX-YY.js`, `data/modules/module-XX.js`, `data/course-data.js` e `assets/js/**`. No single HTML, cada arquivo de origem vem precedido por um comentário com o caminho, por exemplo `/* data/lessons/m00/lesson-00-01.js */`. Cada aula é `const lesson0001 = { …JSON válido… };`.
- São 190 aulas em 18 módulos: m00–m13 têm 10 aulas cada, m14 tem 14 e m15–m17 têm 12. Ao todo são ~1,18 milhão de palavras, com mediana de ~5.800 palavras por aula (mínimo: 7.3, com ~3.750; máximo: 17.12, com ~12.640).
- **Template rígido:** as 190 aulas têm exatamente as mesmas 20 chaves em `content`, qualquer que seja o tema: `motivation, history, problem, evolution, concept, internals, architecture, analogy, simpleExample, enterpriseExample, cloudExample, devsecopsExample, securityExample, diagram, labIntro, exercisesIntro, challengeIntro, solutionIntro, summary, nextTheme`. É a principal suspeita de encheção, porque são seções preenchidas por obrigação.
- O renderizador omite seções ausentes sem quebrar (`hasContent`, `renderHtmlBlock` e `renderExamplePanel` retornam vazio), então **remover uma chave de `content` é seguro**.
- O renderizador remove o primeiro `<section …>` e o primeiro `<h2>` de cada seção HTML (`stripOuterLessonSection`). Por isso o número no `<h2>` ("1. Motivação") não aparece.

**Campos que o aluno NUNCA vê** (só entram no índice de busca em `services/search.js`):
`content.labIntro`, `content.exercisesIntro`, `content.challengeIntro`, `content.solutionIntro`, `deepDive`, `networkContext`, `commonMistakes` (o de nível superior; `commentedSolution.commonMistakes` é exibido), `protocolFields`, `packetFlow`, `diagnosticCase`, `estimatedStudyTimeMinutes`.
Eles somam ~110 mil palavras (~9% do texto). Parte disso é bom (erros comuns, modelo mental, campos de protocolo) e está escondido do aluno.

**Bug do quiz (impede a aula de ser concluída)**
`renderQuiz.js` usa `Number(q.a ?? q.answer ?? -1)` como **índice** da opção correta.
- Em 26 aulas (4.7, 4.9, 5.2, 5.3, 5.4, 5.5, 5.8, 5.10, 6.2, 6.3, 6.4, 6.5, 6.7, 6.8, 7.2, 7.4, 7.7, 8.4, 8.9, 9.1, 9.2, 9.5, 11.2, 11.6, 11.7, 11.9), `answer` é o **texto** da opção (158 questões), e o app não reconhece nenhuma opção como certa.
- Em 16 aulas (14.10–14.14, 15.1–15.8, 15.11, 16.1, 16.2), as questões usam `correctAnswer`/`correctIndex` e não têm `a`/`answer` (60 questões). O efeito é o mesmo.
- Consequência: nessas 42 aulas o aluno nunca chega a 70% no quiz, e a aula nunca conclui (`progressRules.completeWhen.quizScoreAtLeast`).

**Outros achados**
- Há frases-padrão repetidas em muitas aulas. Exemplos: "Use a seção de exercícios e o desafio da aula como evidência de aprendizado." (39 aulas); o bloco "Prática equivalente — Esta aula não possui laboratório independente…" (39 aulas); vários avisos de ética, escopo e dados sintéticos repetidos em 10–12 aulas.
- As durações não batem: a soma de `estimatedStudyTimeMinutes` das aulas dá ≈ 585 h, mas a soma de `estimatedHours` dos módulos dá 1.029 h.
- O formato do quiz varia (`q/opts/a/exp` ou `question/options/answer/explanation`), e há flashcards sem `id`.
- Algumas aulas são especiais: simulados (17.3–17.6 com 30 questões; 17.11 com 90), projetos/capstone/portfólio (ex.: 14.14, 16.12, 17.12) e aulas de revisão/ligação/roadmap/governança. Elas têm critérios próprios (6.10).

---

## 3. Regras invioláveis

1. **Nunca altere os arquivos originais** (fontes e single HTML original). Tudo o que for novo vai para `aulas novas/`, `revisao/` e o novo single HTML.
2. **Não altere o código do app** (`assets/js`, `assets/css`) nem as chaves de storage em `course-data.js`. Trabalhe dentro do esquema que o app já entende. Melhorias de código entram como recomendação no relatório final.
3. **Uma aula por vez, na ordem do curso** (0.1, 0.2 … 17.12). A única exceção é o piloto da Fase 0. Nunca analise nem reescreva duas aulas no mesmo passo, e não "padronize em lote". Cada análise olha a aula por si mesma.
4. **Não pare para pedir confirmação e não faça perguntas.** Na dúvida, escolha a opção mais conservadora (preservar conteúdo) e registre em `revisao/DECISOES.md`.
5. **Preserve as identidades usadas pelo app e pelo progresso salvo dos alunos:** `id`, `moduleId`, `order`, o nome da constante (`lesson0001`), `progressRules` (inclusive `unlocks`), `lab.id` e o `id` das questões de quiz que já existem.
6. **Não invente** fatos, comandos, números de RFC, referências ou saídas de comando. Se algo parece errado e você não tem certeza, não "corrija": registre em "revisão humana".
7. **Mantenha o progresso sempre em disco.** Ao terminar cada aula, atualize `revisao/PROGRESSO.md` na hora. Nada importante pode ficar só no seu contexto.
8. **Não apague arquivos de sessões anteriores.** Para descartar algo, renomeie (ex.: `nova_descartada_<data>`).
9. Se uma aula falhar na validação 2 vezes seguidas, marque **FALHOU** com o motivo e siga em frente. O build final usa a versão original dela.
10. Economize contexto: os scripts imprimem resumos, não arquivos inteiros. Não despeje aulas inteiras no terminal.

---

## 4. Estrutura de saída

```
<pasta do curso>/
├── (originais — intocados)
├── aulas novas/
│   ├── m00/lesson-00-01.js …        (mesmos nomes e formato dos originais)
│   ├── …
│   └── modules/module-00.js …       (cópias com duração e labs atualizados)
├── revisao/
│   ├── PROGRESSO.md
│   ├── DECISOES.md
│   ├── CRITERIOS.md                 (seções 6–10 deste prompt + ajustes do piloto)
│   ├── frases_repetidas.md
│   ├── analises/m00/aula-0.1.md …
│   ├── trabalho/<id>/original/ e trabalho/<id>/nova/   (área de edição)
│   ├── tools/                       (scripts)
│   └── RELATORIO_FINAL.md
└── redes_e_network_v2_1_single.html
```

O nome `aulas novas` tem espaço: use sempre aspas nos comandos de shell.

---

## 5. Fase 0: preparação (uma vez só)

**0.0 Sessão em nuvem.** Se você estiver rodando numa sessão em nuvem (uma máquina temporária com um clone do repositório do GitHub), tudo o que não for enviado ao GitHub se perde quando a máquina for desligada. Nesse caso, crie e use uma branch própria (`revisao-curso`) e faça `git add` + `git commit` + `git push` dessa branch ao fim de **cada aula** (passo I) e de cada módulo. Nunca faça force push nem push na branch principal.

**0.1** Se `revisao/PROGRESSO.md` já existe, você está retomando. Vá direto para a seção 13.

**0.2** Mapeie a pasta. Localize as fontes (`data/lessons/**`), os módulos, `course-data.js`, `index.html`, CSS/JS, scripts de build existentes (procure `build*`, `bundle*`, `package.json`, `Makefile`, `*.py`, `*.mjs`) e o single HTML original.
- Se existirem fontes em `data/lessons/`, elas são a fonte da verdade. Compare uma ou duas com o bloco correspondente do single HTML para entender a transformação feita pelo build (ex.: remoção de `export`).
- Se só existir o single HTML, extraia as fontes dele pelos comentários de caminho e salve em `revisao/fontes_extraidas/` com o mesmo caminho relativo. Os 190 blocos de aula são JSON válido depois de `const lessonXXXX = `.

**0.3** Verifique `node -v` (preferido) ou `python3 --version`. Escreva os scripts em `revisao/tools/` na linguagem disponível, sem dependências externas.

**0.4** Confirme os fatos da seção 2 com `grep` no código do app (renderizadores, `search.js`, `progress.js`, `renderQuiz.js`) e confira as classes CSS disponíveis em `assets/css`.

**0.5** Crie as ferramentas e teste cada uma na aula 0.1 antes de seguir:
- `extrair <id>`: lê a aula original e cria `revisao/trabalho/<id>/original/`, com `meta.json` (todos os campos menos `content`, em JSON indentado) e `content/<chave>.html` (HTML real, sem escapes). Copia tudo para `revisao/trabalho/<id>/nova/` como ponto de partida. Se `nova/` já existir, renomeie a antiga para `nova_descartada_<data>`. Editar HTML real evita os erros de escapar JSON à mão.
- `montar <id>`: monta `aulas novas/mXX/lesson-XX-YY.js` a partir de `nova/`. A ordem das chaves de `content` segue a original, e chaves cujo `.html` não existe em `nova/content/` ficam de fora. Usa o mesmo cabeçalho, o mesmo nome de constante e o mesmo formato do arquivo original.
- `metricas <id> <original|nova>`: conta as palavras por campo (visíveis × invisíveis), as quantidades (quiz, flashcards, mentor, exercícios, passos de lab, diagramas SVG) e calcula a duração estimada pela fórmula 6.2. A saída é JSON.
- `validar <id>`: faz as checagens automáticas da seção 8.
- `frases_repetidas`: varre todas as aulas e lista as frases de 8 palavras ou mais que aparecem em 3 aulas ou mais, com contagem e ids, em `revisao/frases_repetidas.md`. É uma ferramenta de apoio e não substitui a análise individual.
- `build_single` e `relatorio` podem ficar para as Fases 3 e 4.

**0.6** Crie `revisao/CRITERIOS.md` copiando as **seções 6, 7, 8, 9 (passos B–H) e 10** deste prompt. Crie `revisao/PROGRESSO.md` com uma linha por aula (190 linhas, status PENDENTE) na ordem do curso, com as colunas: id | arquivo | status | palavras visíveis antes→depois | duração declarada→nova | duração | linguiça | útil | aproveitamento. Crie `revisao/DECISOES.md`.

**0.7 Piloto de calibração.** Processe pelo loop completo (seção 9) as aulas **0.1** (fundamental típica), **5.5** (curta) e **17.12** (capstone longa). Depois releia as três análises e as três versões novas com olhar crítico:
- os cortes preservaram todo o conhecimento?
- a nova versão ficou de fato mais direta?
- os critérios foram aplicados com coerência?

Se precisar, ajuste `CRITERIOS.md` (registrando o porquê em `DECISOES.md`) e, nesse caso, refaça as três. A partir daí os critérios ficam congelados.

---

## 6. Critérios de análise (aplicados a cada aula, individualmente)

### 6.1 Leitura
Leia a aula inteira (todos os arquivos em `trabalho/<id>/original/`), incluindo lab, quiz, flashcards, mentor, exercícios, desafio, solução, glossário, segurança, troubleshooting, referências e os campos invisíveis. Para manter a continuidade, você pode consultar só o título e o `summary` das aulas anterior e seguinte e o arquivo do módulo. **Não leia o conteúdo de outras aulas.**

### 6.2 Duração (fórmula fixa, para comparar aulas de forma justa)
T (em minutos) é a soma de:
- palavras de **teoria visível** (`content` renderizado + `security` + `troubleshooting` + `glossary`) ÷ 130;
- 3 min por diagrama SVG;
- 1 min por questão de quiz;
- 0,5 min por flashcard;
- 2 min por pergunta do modo mentor;
- 6 min por exercício;
- 20 min de desafio + solução comentada (ajuste, com justificativa, se o desafio for claramente maior ou menor);
- laboratório: `lab.estimatedTimeMinutes`, se for plausível para os passos descritos; se não for, 5 min por passo + leitura do texto do lab a 130 palavras/min.

**Faixa recomendada:** [0,85×T ; 1,2×T], arredondada para múltiplos de 5.

**Veredito** da duração declarada (M = ponto médio da faixa declarada em `duration`):
- **ORGANIZADA:** 0,8×T ≤ M ≤ 1,2×T, e a divisão entre teoria e prática faz sentido para o tipo de aula.
- **INFLADA:** M > 1,2×T (a aula promete mais tempo do que o conteúdo exige).
- **SUBESTIMADA:** M < 0,8×T.
- **DESEQUILIBRADA:** o total está ok, mas a distribuição é ruim (ex.: 70% de leitura numa aula prática; 2 h de lab para um conceito de 10 min).

Na nova versão, atualize `duration` ("X-Y min") e `estimatedStudyTimeMinutes` (= Y, o mesmo padrão do original) com base no T da nova versão.

### 6.3 Encheção de linguiça: sinais concretos
Conte como linguiça, e cite trechos curtos como evidência:
- frase-padrão que aparece em outras aulas (`frases_repetidas.md`) e não acrescenta nada aqui;
- a mesma ideia repetida em `motivation`, `problem`, `concept`, `summary` e `securityExample` com outras palavras;
- seções de exemplo genéricas que não ensinam nada específico do tema ("em cloud também há logs", "pipelines também usam rede");
- história ou evolução que não ajuda a entender por que a tecnologia funciona como funciona;
- meta-texto ("nesta seção veremos…", "é importante ressaltar que…", "como vimos…"), adjetivação e listas longas onde 2–3 itens bastam;
- "limite da analogia" longo e avisos de ética repetidos em toda aula;
- sobreposição entre `securityExample`, `security` e `deepDive.securityImpact`; entre `troubleshooting` e `lab.troubleshooting`; entre `exercises`, `challenge` e `mentorQuestions` perguntando a mesma coisa;
- conteúdo guardado em campos invisíveis (seção 2).

**% de linguiça** = palavras visíveis removíveis sem perder informação ÷ palavras visíveis. Faixas: **ALTA** acima de 30% · **MÉDIA** de 15% a 30% · **BAIXA** abaixo de 15%.

**NÃO é linguiça:** explicação de mecanismo, exemplo concreto com valores reais (IPs, campos, saídas), casos de borda, erros comuns específicos do tema, comparação que tira uma dúvida real, comando acompanhado da interpretação da saída.

### 6.4 Conteúdo útil
- **FORTE:** o núcleo técnico é correto e específico, o mecanismo é explicado, há exemplos concretos e a prática exercita o objetivo.
- **PARCIAL:** o núcleo é bom, mas há partes genéricas, rasas ou desconectadas do objetivo.
- **FRACO:** é majoritariamente genérico ou superficial, ou tem erros técnicos relevantes.

Registre também as lacunas (o que a aula deveria ensinar e não ensina). Só adicione conteúdo novo quando for necessário para cumprir os `objectives` da própria aula.

### 6.5 Aproveitamento (tempo do aluno × aprendizado)
- **BOM:** pelo menos 80% do tempo estimado vai para algo que ensina ou pratica os objetivos.
- **MÉDIO:** de 60% a 80%.
- **BAIXO:** abaixo de 60%.

### 6.6 Pode ser mais curta?
**SIM** quando dá para reduzir o tempo em pelo menos 15% sem perder nenhum item do inventário de conceitos (6.8). Informe a redução prevista.

### 6.7 Explicação mais direta?
**SIM** quando o mesmo conceito pode ser explicado com menos voltas: definição antes da justificativa longa, exemplo concreto mais cedo, um parágrafo no lugar de três, tabela no lugar de prosa comparativa. Diga onde (seção e trecho).

### 6.8 Inventário de conceitos (proteção contra perda de qualidade)
**Antes** de reescrever, liste os conceitos, fatos técnicos, números, campos de protocolo, comandos e casos de borda que a aula ensina (normalmente 15–40 itens). **Depois** de reescrever, marque cada item como **MANTIDO** (onde está) ou **REMOVIDO** (motivo: duplicado em X / fora do escopo / incorreto). Se algum item for removido sem motivo, a reescrita está reprovada.

### 6.9 Decisão por estrutura (seção a seção)
Para cada chave de `content` e cada bloco estruturado, decida entre **MANTER · ENXUGAR · FUNDIR (com qual) · REMOVER · MOVER (para onde)** e justifique em uma linha. A orientação abaixo é o padrão, mas o julgamento sobre a aula prevalece:

| Seção/bloco | Padrão |
|---|---|
| motivation | MANTER, curta: um problema real em 1–2 parágrafos |
| history | MANTER só se explica por que a tecnologia é como é; senão REMOVER ou FUNDIR com `problem` em 2–3 frases |
| problem | MANTER; FUNDIR com motivation se repetir |
| evolution | geralmente FUNDIR com history ou REMOVER |
| concept, internals | núcleo: MANTER; ENXUGAR redundância, nunca cortar mecanismo técnico |
| architecture | MANTER se acrescenta a visão de componentes; senão FUNDIR com internals |
| analogy | MANTER só se for boa; o limite da analogia em 1 frase |
| simpleExample | MANTER (concreto, com valores) |
| enterprise/cloud/devsecops/securityExample | MANTER só os que ensinam algo específico do tema; normalmente 1–2 por aula bastam (exceto quando o tema da aula é cloud/devsecops/segurança) |
| diagram | MANTER; corrigir só se estiver errado ou ilegível |
| summary | MANTER, 3–5 bullets |
| nextTheme | MANTER em 1–2 frases |
| labIntro, exercisesIntro, challengeIntro, solutionIntro | invisíveis: REMOVER |
| deepDive, commonMistakes, protocolFields, packetFlow, diagnosticCase | invisíveis: MOVER o que vale para onde o aluno vê, depois REMOVER o campo |
| networkContext | MANTER (metadado curto, útil para a busca) |
| security + securityExample | FUNDIR o conteúdo sem redundância |
| troubleshooting | MANTER comandos corretos e a árvore de decisão; cortar diagnósticos genéricos |
| lab | MANTER executável; cortar texto ritual |
| quiz, flashcards, mentor, exercises, challenge, commentedSolution | MANTER; ajustar à seção 7 |
| glossary | só os termos realmente usados na aula |
| references, linksToOtherCourses | MANTER as reais |

### 6.10 Aulas especiais
- **Simulados** (17.3–17.6, 17.11): não reduza o número de questões. Revise a clareza, corrija gabarito e formato e corte o texto de moldura. A duração é dominada pelas questões.
- **Projetos, capstone e portfólio:** o tempo longo pode ser legítimo. Foque na clareza dos entregáveis e da rubrica e corte o texto ritual. Não encurte o escopo do projeto.
- **Revisão, ligação, roadmap e governança:** devem ser enxutas por natureza e geralmente dispensam history, evolution e exemplos por ambiente.
- **Módulo 16 (pentest e defesa):** mantenha os avisos de autorização e escopo onde forem necessários, uma vez e com clareza, sem repetir em cada seção.

---

## 7. Regras de reescrita

1. **Reescreva só o que a análise justificou.** Uma aula com linguiça BAIXA e conteúdo FORTE pode sair quase idêntica, e esse é um resultado válido.
2. **Corte redundância, não conhecimento.** Todo `objective` precisa continuar coberto (indique onde, na análise).
3. **Mais direto** quer dizer definição clara cedo, exemplo concreto cedo, frases curtas, voz ativa, segunda pessoa ("você"), em pt-BR e no mesmo tom do curso. Prefira tabela a prosa comparativa e lista numerada a prosa de procedimento.
4. **Formato HTML:** mantenha o envelope de cada seção, `<section class="lesson-section lesson-section--<tipo>"><h2>Título</h2> … </section>`. Use só classes que existem no CSS do curso (ex.: `callout callout--problem|--warning|--security`, `definition-box`, `data-table`, `comparison-table`, `risk-table`, `flow-list`, `content-card`, `lesson-svg`, `svg-*`), conferidas em `assets/css`. Não invente classes.
5. **Diagramas SVG:** mantenha. Corrija só se estiver errado ou ilegível, e preserve os ids com o prefixo da aula e os `<title>`/`<desc>`.
6. **Campos invisíveis:** aproveite o que tiver valor movendo para onde o aluno vê. Exemplos: `commonMistakes` vira um callout "Erros comuns" no conceito ou vai para `commentedSolution.commonMistakes`; `deepDive.mentalModel` vira a primeira linha do `summary`; `protocolFields`/`packetFlow` viram tabela ou fluxo em `internals`, se ajudar. Depois remova o campo. Remova `labIntro`, `exercisesIntro`, `challengeIntro` e `solutionIntro`. Mantenha `networkContext` e `estimatedStudyTimeMinutes` (atualizado).
7. **Quiz:**
   - Padronize cada questão em `{ "id", "question", "options", "answer": <índice numérico, base 0>, "explanation" }`, preservando `id`, `topic`, `difficulty`, `type` e `domain` que existirem. Se não houver `id`, crie `q1…qN`.
   - Converta `answer` textual, `correctAnswer` e `correctIndex` para o índice correto. Confira se o texto bate exatamente com uma das opções; se não bater, registre em "revisão humana".
   - Toda questão precisa ser respondível pelo conteúdo da **nova** versão. Troque questões triviais ou que só testam decoreba de frase.
   - Aulas normais: 5–8 questões. Simulados: mantenha todas.
   - Use distratores plausíveis; nada de "todas as anteriores".
8. **Flashcards:** 5–8, sem copiar o quiz. **Mentor:** 3–5 perguntas de raciocínio. **Exercícios:** 3–5, com `expectedAnswer`. **Glossário:** só os termos usados na aula.
9. **Lab:** precisa continuar executável e seguro. Corte o texto ritual (safetyNotes e improvements genéricos repetidos) e mantenha passos, comandos, resultado esperado, validação e evidências. Não remova o lab se `progressRules` ou o módulo dependem dele (`labMarkedDone`, `assessment.requiredLabs`). Nas aulas com o bloco padrão "Prática equivalente", reduza a moldura a 1–2 frases.
10. **Referências:** mantenha as reais e não acrescente nenhuma de cuja existência você não tenha certeza.
11. **`nextTheme`:** 1–2 frases, coerentes com o título real da próxima aula.
12. Só mude o `title` se ele estiver errado ou enganoso. O `subtitle` pode ser enxugado.

---

## 8. Validação

**Automática (script `validar`):**
- o arquivo novo carrega sem erro de sintaxe, define a mesma constante e o objeto é JSON válido;
- `id`, `moduleId`, `order`, `progressRules` e `lab.id` (se existir) estão inalterados;
- toda string HTML tem as tags balanceadas (section, div, p, ul, ol, li, table, thead, tbody, tr, th, td, strong, em, code, pre, svg, g, text, etc.) e nenhuma seção está vazia;
- quiz: há pelo menos 1 questão quando `progressRules` exige quiz; cada questão tem `options` (2 ou mais), `answer` inteiro dentro do intervalo e `explanation` não vazia; os ids são únicos;
- se `progressRules.completeWhen.oneOf` inclui `labMarkedDone`, o lab existe (ou `practicalExerciseDone` está no `oneOf` e há exercícios);
- não sobrou nenhum campo invisível, exceto `networkContext` e `estimatedStudyTimeMinutes`;
- as métricas de antes e depois foram calculadas.

**Manual (você):** o inventário de conceitos está fechado (6.8), os objetivos estão cobertos, as questões são respondíveis e você leu a nova versão do começo ao fim como se fosse o aluno.

---

## 9. Loop por aula

**Orquestração.** Se você tiver a ferramenta de subagentes (Agent/Task), delegue **cada aula a um subagente novo, um por vez (nunca em paralelo)**, usando o modelo de instrução abaixo. Como orquestrador, você não lê o conteúdo das aulas: só lança o subagente, confere o resultado (os arquivos existem, `validar` passou), atualiza `PROGRESSO.md` e segue para a próxima. Isso mantém o seu contexto limpo a noite toda. Sem subagentes, execute os passos você mesmo, uma aula por vez, sem carregar detalhes de uma aula para a próxima.

Para cada aula PENDENTE, na ordem do curso:

- **A.** Marque a aula como EM ANDAMENTO em `PROGRESSO.md`.
- **B.** Rode `extrair <id>` e `metricas <id> original`.
- **C.** Leia a aula inteira (6.1).
- **D.** Escreva a análise em `revisao/analises/mXX/aula-<id>.md`, no modelo da seção 10, incluindo o inventário de conceitos e a decisão por estrutura.
- **E.** Reescreva em `revisao/trabalho/<id>/nova/`: reescreva os `.html`, apague os `.html` das seções removidas (criados nesta etapa) e ajuste `meta.json`.
- **F.** Rode `montar <id>`, que gera `aulas novas/mXX/lesson-XX-YY.js`.
- **G.** Rode `validar <id>` e `metricas <id> nova`. Se falhar, corrija (no máximo 2 tentativas; depois disso, FALHOU).
- **H.** Feche o inventário de conceitos e complete a análise com as métricas de depois e o bloco JSON final.
- **I.** Atualize `PROGRESSO.md`: status CONCLUÍDA, palavras antes→depois, duração declarada→nova e os rótulos. Em sessão em nuvem, faça commit + push agora (0.0).

**Modelo de instrução para o subagente:**
> Você vai revisar UMA aula do curso: `<id>` (`<arquivo>`). Primeiro, leia por inteiro `revisao/CRITERIOS.md` e `revisao/frases_repetidas.md`. Depois execute os passos B–H para esta aula, e só para ela, usando as ferramentas em `revisao/tools/`. Não leia o conteúdo de outras aulas; para manter a continuidade, consulte só os títulos e o `summary` da aula anterior e da seguinte e o arquivo do módulo. Não altere nada fora de `revisao/trabalho/<id>/`, `revisao/analises/` e `aulas novas/`. Não faça perguntas: na dúvida, preserve o conteúdo e registre em "revisão humana". Ao terminar, responda em no máximo 8 linhas: status (OK/FALHOU), palavras visíveis antes→depois, duração declarada→nova, os rótulos (duração, linguiça, útil, aproveitamento) e os itens para revisão humana.

**Ao fim de cada módulo** (todas as aulas do módulo CONCLUÍDAS ou FALHOU):
1. Atualize a cópia do módulo em `aulas novas/modules/module-XX.js`: `estimatedHours` = soma das novas `estimatedStudyTimeMinutes` ÷ 60 (arredondado), e `assessment.requiredLabs` só com labs que existem. Não mexa no resto.
2. Continuidade: confira se o `nextTheme` e os `prerequisites` das aulas do módulo continuam coerentes entre si. Só faça ajustes curtos de texto, sem reanalisar as aulas.
3. **Controle de qualidade independente:** lance um subagente revisor, que não participou da reescrita, para comparar original × nova de 2 aulas do módulo (a de maior redução e uma aleatória). Ele procura conhecimento perdido, erros introduzidos e explicações que pioraram. Se ele reprovar uma aula, refaça-a pelo loop e registre em `DECISOES.md`.
4. Se a pasta for um repositório git, faça commit dos arquivos novos. Em sessão em nuvem, faça também o push da branch `revisao-curso` (0.0); localmente, não faça push.
5. Escreva um resumo do módulo em 3–5 linhas no fim de `PROGRESSO.md`.

---

## 10. Modelo da análise por aula

~~~markdown
# Aula <id> — <título>
Tipo: … · Duração declarada: … · Palavras visíveis / invisíveis (antes): … / …

## 1. Duração
T pela fórmula = … min (teoria …, diagramas …, quiz …, flashcards …, mentor …, exercícios …, desafio …, lab …)
Veredito: ORGANIZADA | INFLADA | SUBESTIMADA | DESEQUILIBRADA — comentário.

## 2. Encheção de linguiça
Nível: ALTA | MÉDIA | BAIXA (~…%). Evidências (seção + trecho curto): …

## 3. Conteúdo útil
FORTE | PARCIAL | FRACO. O que tem de realmente valioso: … Lacunas: … Erros técnicos: …

## 4. Aproveitamento
BOM | MÉDIO | BAIXO — justificativa.

## 5. Pode ser mais curta?
SIM | NÃO — redução prevista: …%.

## 6. Explicação mais direta
SIM | NÃO — onde e como.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
(todas as 20 chaves de content + lab, quiz, flashcards, mentorQuestions, exercises, challenge, commentedSolution, glossary, security, troubleshooting, references e cada campo invisível)

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|

## 10. O que mudou na nova versão
- …

## 11. Depois
Palavras visíveis: antes → depois (−x%) · Duração: declarada → nova · Quiz corrigido: sim/não (n questões)

## 12. Revisão humana
Itens sobre os quais você não teve certeza (ou "nenhum").

```json
{
  "id": "0.1", "modulo": "m00", "tipo": "fundamental", "status": "CONCLUIDA",
  "duracao_declarada": "55-80 min", "T_original_min": 0, "duracao_nova": "", "veredito_duracao": "",
  "linguica_nivel": "", "linguica_pct": 0, "conteudo_util": "", "aproveitamento": "",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 0, "explicacao_mais_direta": false,
  "palavras_visiveis_antes": 0, "palavras_visiveis_depois": 0,
  "secoes": { "motivation": "MANTER", "history": "REMOVER" },
  "quiz_corrigido": false, "revisao_humana": []
}
```
~~~

---

## 11. Fase 3: single HTML final

1. Se o projeto tiver um script de build, use-o sem alterá-lo: copie para `revisao/tools/` e adapte a cópia para ler de `aulas novas/`. Se não tiver, crie `build_single`: parta do single HTML original como molde e substitua cada bloco `/* data/lessons/mXX/lesson-XX-YY.js */` pela aula nova correspondente (aplicando a mesma transformação do build original, ex.: sem `export`) e cada bloco `/* data/modules/module-XX.js */` pela cópia em `aulas novas/modules/`. As aulas marcadas FALHOU usam o original.
2. A saída é `redes_e_network_v2_1_single.html`, na raiz da pasta. Não altere o código do app, as chaves de storage nem os metadados do curso.
3. Validação:
   - extraia o `<script>` e cheque a sintaxe (`node --check`);
   - confirme que há 190 aulas e 18 módulos, sem blocos duplicados ou faltando;
   - se já houver Chrome/Chromium com Playwright ou Puppeteer instalado, abra o arquivo, navegue por `#lesson-<id>` em todas as aulas e registre os erros de console. Clique na opção correta de uma questão por aula e confirme que ela é marcada como certa. Se não houver navegador instalado, não instale.

---

## 12. Fase 4: relatório final (`revisao/RELATORIO_FINAL.md`)

Gere o relatório com o script `relatorio`, a partir dos blocos JSON das análises e de `PROGRESSO.md`, e complete com texto seu:

1. **Resumo executivo:** aulas processadas e FALHOU, palavras visíveis antes→depois, horas totais antes→depois, bugs corrigidos (quiz) e campos invisíveis tratados.
2. **As respostas pedidas**, em listas de id + título:
   - aulas com duração organizada;
   - aulas que precisam de melhora (e o quê: duração, linguiça, conteúdo, erros);
   - aulas com encheção de linguiça demais (ALTA), ordenadas por %;
   - aulas com conteúdo realmente útil (FORTE);
   - aulas com bom aproveitamento;
   - aulas que poderiam ser mais curtas (e quanto foram encurtadas);
   - aulas que ganharam uma explicação mais direta sem perder conteúdo.
3. **Estruturas:** tabela seção × número de aulas em MANTER/ENXUGAR/FUNDIR/REMOVER, dizendo quais estruturas o template deveria deixar de exigir e quais devem continuar obrigatórias.
4. **Tabela completa das 190 aulas** (id, título, duração antes→depois, palavras antes→depois, rótulos).
5. **Resumo por módulo.**
6. **Revisão humana:** todas as pendências, as aulas FALHOU e as decisões de `DECISOES.md`.
7. **Recomendações fora do escopo** (ex.: mudanças no renderizador para exibir campos hoje ocultos, um novo template de aula, atualizar o título para v2.1).

Por fim, escreva "REVISÃO CONCLUÍDA" no topo de `PROGRESSO.md`.

---

## 13. Retomada (se a sessão parou no meio)

Em sessão em nuvem, antes de tudo, faça checkout da branch `revisao-curso` (o trabalho anterior está nela).

Se `revisao/PROGRESSO.md` já existe:
1. Leia `PROGRESSO.md`, `DECISOES.md` e `CRITERIOS.md`. Não refaça a Fase 0; só confirme que as ferramentas rodam.
2. Refaça do zero toda aula que estiver EM ANDAMENTO: rode `extrair <id>` (que renomeia a `nova/` antiga) e o loop completo, sobrescrevendo a análise e o arquivo em `aulas novas/`.
3. Continue a partir da primeira aula PENDENTE. Quando todas estiverem prontas, faça as Fases 3 e 4.

---

**Comece agora pela Fase 0.**