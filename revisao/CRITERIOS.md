# CRITÉRIOS DA REVISÃO (congelados após o piloto)

Cópia literal das seções 6, 7, 8, 9 (passos B–H) e 10 de `PROMPT_REVISAO_CURSO.md`, seguida da seção **11. Ajustes e convenções operacionais**, que vale tanto quanto o resto. Em caso de conflito, a seção 11 prevalece (motivos em `DECISOES.md`).

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


## 9. Loop por aula (passos B–H)

- **C.** Leia a aula inteira (6.1).
- **D.** Escreva a análise em `revisao/analises/mXX/aula-<id>.md`, no modelo da seção 10, incluindo o inventário de conceitos e a decisão por estrutura.
- **E.** Reescreva em `revisao/trabalho/<id>/nova/`: reescreva os `.html`, apague os `.html` das seções removidas (criados nesta etapa) e ajuste `meta.json`.
- **F.** Rode `montar <id>`, que gera `aulas novas/mXX/lesson-XX-YY.js`.
- **G.** Rode `validar <id>` e `metricas <id> nova`. Se falhar, corrija (no máximo 2 tentativas; depois disso, FALHOU).
- **H.** Feche o inventário de conceitos e complete a análise com as métricas de depois e o bloco JSON final.

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

## 11. Ajustes e convenções operacionais (Fase 0 + piloto)

Esta seção registra o que o código real impõe e como usar as ferramentas. Motivos em `DECISOES.md`.

### 11.1 Ferramentas (rode a partir da raiz do curso)
| Passo | Comando | O que faz |
|---|---|---|
| B | `node revisao/tools/extrair.js <id>` | cria `revisao/trabalho/<id>/original/` (`meta.json`, `content/<chave>.html`, `content_order.json`) e copia para `nova/` (renomeia `nova/` antiga para `nova_descartada_<data>`) |
| B | `node revisao/tools/metricas.js <id> original` | palavras por campo (visíveis × invisíveis), quantidades e T (6.2). Salva `trabalho/<id>/metricas_original.json` |
| C | `node revisao/tools/contexto.js <id>` | o que você PODE ver de outras aulas: módulo, títulos e `summary` da anterior e da seguinte |
| C | `node revisao/tools/frases_repetidas.js <id>` | frases (≥8 palavras) desta aula que se repetem em ≥3 aulas |
| E | `node revisao/tools/quiz_normalizar.js <id>` | rode ANTES de editar o quiz: converte `nova/meta.json` para o formato padrão, com `answer` numérico |
| F | `node revisao/tools/montar.js <id>` | gera `aulas novas/mXX/lesson-XX-YY.js` |
| G | `node revisao/tools/metricas.js <id> nova` | métricas da versão montada (exige o `montar`) |
| G/H | `node revisao/tools/comparar.js <id>` | palavras por campo antes → depois, cortes e acréscimos brutos (para a checagem da 11.7) |
| G | `node revisao/tools/validar.js <id>` | checagens da seção 8. ERRO reprova; AVISO não reprova, mas precisa ser justificado na análise |

Fluxo de duração: monte, rode `metricas nova`, ajuste `duration` para a `faixaRecomendada` da nova versão e `estimatedStudyTimeMinutes` para o limite superior, monte de novo e valide.

### 11.2 O que o app realmente renderiza (confira antes de decidir)
- **Ordem na tela:** *Introdução* (objectives, learningOutcomes, **motivation, summary**, glossary) → *Contexto* (history, problem, evolution) → *Conteúdo* (concept, internals, architecture, diagram) → *Segurança estruturada* (`security`) → *Troubleshooting* (`troubleshooting`) → *Fixação* (lab, quiz, flashcards, mentor, exercises, challenge, commentedSolution, cada um num painel recolhido) → nextTheme → referências. Os exemplos (analogy, simpleExample, enterprise/cloud/devsecops/securityExample) ficam num **accordion fechado** dentro de *Exemplos*.
- O `summary` aparece **logo depois da motivação, no início da aula**. Escreva-o como síntese do que a aula ensina (3–5 bullets), útil tanto na abertura quanto na revisão.
- O renderizador remove o `<section>` externo e o primeiro `<h2>` de cada chave de `content` e põe um título fixo ("Motivação", "Conceito"…). O texto do `<h2>` não aparece: use `<h2>Título</h2>` sem número. Subtítulos internos usam `<h3>`.
- **Campos fora de `content` são texto puro** (o app aplica escape): nada de HTML ou markdown em quiz, lab, exercícios, security, troubleshooting, glossário, flashcards, mentor, challenge, commentedSolution e referências.
- Campos exibidos de cada bloco (o resto é invisível):
  - `lab`: id, title, objective, scenario, topology, architecture, cost, prerequisites|requirements, tools, safetyNotes, steps, expectedResult, validation, troubleshooting, improvements, evidenceToCollect, questions, challenge, solution. `topology` e `architecture` são exibidos como texto: se forem objeto ou lista, viram "[object Object]", então converta para string. `labType` e `estimatedTimeMinutes` são metadados e ficam.
  - passo do lab: title, instruction|description|action, command|commands, analysisTask, calculation, configuration, artifact, evidence, expectedOutput|expectedResult|expected, explanation|reason|interpretation.
  - `security`: goodPractices, badPractices, commonErrors, vulnerabilities[{name, description, defensiveExplanation, mitigation}], monitoring, hardening, detectionIdeas.
  - `troubleshooting`: symptoms, diagnosticQuestions, commands[{platform, command, purpose, expectedObservation, interpretation}], decisionTree[{if, then}].
  - `exercises`: type, prompt, expectedAnswer, explanation · `challenge`: title, scenario, tasks, constraints, expectedDeliverables, successCriteria, gradingRubric · `commentedSolution`: reasoning, steps, commonWrongAnswers|commonMistakes, finalAnswer · `mentorQuestions`: type, question, hints, expectedIdeas, explanation · `flashcards`: front, back · `glossary`: term, shortDefinition, longDefinition, example, relatedTerms · `references`: title, organization, note (o `url` não aparece, mas mantenha-o) · `linksToOtherCourses`: course, module, lesson, reason.
- Campos ocultos do `lab` (ex.: authorizedScope, allowedActions, prohibitedActions, cleanup, rollbackPlan, syntheticDataset, expectedOutcome, environment, safetyRules): se forem importantes (sobretudo autorização e escopo no m16, limpeza de recursos de cloud), MOVA o essencial para campos exibidos (safetyNotes, prerequisites, um passo final de limpeza, scenario) e depois remova. Se não forem importantes, remova e registre.

### 11.3 Campos invisíveis além dos da seção 2
O código real tem outros campos de topo que o app **não exibe nem indexa**: pedagogicalMap, accessPolicy, trafficCapture, assessmentBlueprint, adaptiveReview, simulado, blueTeamEnhancement, blueTeamDetections, blueTeamSyntheticDataset, vpnTechnicalReview, reviewStatus, reviewChecklist, realWorld, impacts, commands, relatedCourses, nextLesson, diagramNotes, caseStudy, diagram (de topo), domainGapReport, finalSimulation e capstone*, entre outros. Trate-os como os invisíveis da seção 2: MOVA para onde o aluno vê o que tiver valor e REMOVA o campo. Os metadados que ficam são `id`, `moduleId`, `order`, `prerequisites`, `progressRules`, `networkContext` e `estimatedStudyTimeMinutes`. O `validar` reprova se sobrar outro campo de topo não renderizado.

### 11.4 Classes CSS (o que existe de verdade)
O CSS do curso **não** define `callout--problem`, `callout--warning`, `callout--security`, `callout--info`, `comparison-table`, `risk-table`, `flow-list`, `timeline-item` nem `lesson-section--<tipo>`. As aulas originais usam essas classes, mas elas não têm estilo. O que tem estilo:
- `callout` (caixa destacada), `callout warning` e `callout security` (duas classes separadas por espaço, cor de borda), `definition-box`, `evidence-box`, `content-card`;
- `responsive-table` (div em volta) + `data-table` (na `<table>`);
- `code-block`, `command-block`, `lesson-svg` e `svg-node` (`--client`, `--security`, `--firewall`, `--cloud`), `svg-label` (`--small`), `svg-flow` (`--blocked`), `svg-boundary`, `svg-zone`, `svg-arrow`, `animated-flow`.
Regra: o markup **novo** usa só classes estilizadas. Exemplos: `<div class="callout warning">`, `<div class="responsive-table"><table class="data-table">`. Classes que já existiam na própria aula original podem ficar (não quebram nada). O envelope de cada seção mantém a classe original (`lesson-section lesson-section--<tipo>`). O `validar` reprova uma classe que não esteja no CSS nem no original da aula.

### 11.5 Quiz: ids e progresso salvo
- Rode `quiz_normalizar` primeiro. A questão **sem id** recebe `id` = índice original como string ("0", "1"…), que é a mesma chave que o app já usava para salvar a resposta (`question.id ?? index`). Assim o progresso dos alunos é preservado. **Isto substitui o "crie q1…qN" da regra 7.7**, que apagaria o progresso salvo.
- A questão que você mantiver conserva o `id`. A questão **nova** recebe um id inédito na aula: siga o padrão dos ids existentes (ex.: `q0.1.7` se a aula usa `q0.1.N`); se não houver padrão, use `q<N>`. Nunca reaproveite o id de uma questão removida para outra pergunta. O mesmo vale para os ids de flashcards e exercícios, quando existirem.
- Trocar questões triviais é permitido (7.7), mas sem exagero: quando a questão original é boa, mantenha. Varie a posição da resposta correta. Sem "todas/nenhuma das anteriores".

### 11.6 Duração
- T vem da fórmula 6.2 calculada pelo `metricas` (as palavras dentro de `<svg>` não entram na teoria; cada SVG vale 3 min). Lab "plausível" = `estimatedTimeMinutes` entre 0,5× e 2× de (5 min/passo + leitura). Se não for plausível, a ferramenta usa a alternativa. Você pode corrigir `lab.estimatedTimeMinutes` na nova versão para um valor coerente com os passos, registrando o motivo.
- O veredito automático não detecta DESEQUILIBRADA: esse julgamento é seu (ex.: 70% de leitura numa aula prática).
- A nova `duration` sai da `faixaRecomendada` da **nova** versão. É normal que ela suba em relação à original quando a original estava SUBESTIMADA: a fórmula é fixa e vale para todas as aulas.

### 11.7 % de linguiça e escopo da reescrita
- O % de linguiça é a sua estimativa (palavras visíveis removíveis sem perder informação ÷ visíveis). Confira com os **cortes brutos** do `comparar` (não com o saldo líquido, que mistura cortes e acréscimos): se a reescrita cortou muito mais do que a linguiça estimada, ou você cortou conhecimento ou a estimativa está errada. Revise.
- Conteúdo movido de campos invisíveis **aumenta** as palavras visíveis; isso é esperado e não conta contra a meta.
- Corte primeiro: seções-padrão vazias de sentido, repetição entre seções, meta-texto, ritual de lab, exemplos por ambiente genéricos. Depois torne a explicação mais direta. Nunca corte mecanismo, número, campo, comando, caso de borda ou erro comum específico.

### 11.8 Arquivos e formato da análise
- Análise: `revisao/analises/mXX/aula-<id>.md` (ex.: `revisao/analises/m00/aula-0.1.md`), no modelo da seção 10, terminando com o bloco ```json válido. `status` é "CONCLUIDA" ou "FALHOU". Em `secoes`, ponha **toda** chave de content e todo bloco/campo invisível com a decisão (MANTER, ENXUGAR, FUNDIR:<com>, REMOVER, MOVER:<para>).
- Campos extras no JSON (preencha sempre): `"titulo"`, `"T_nova_min"`, `"duracao_nova_estimated_max"`, `"palavras_invisiveis_antes"`, `"palavras_invisiveis_depois"`, `"quiz_questoes"`, `"objetivos_cobertos": true|false`.
- Edição: trabalhe em `revisao/trabalho/<id>/nova/` (`content/*.html` e `meta.json`). Para remover uma seção, apague o `.html` dela em `nova/content/`. Para mexer em `meta.json`, use edições pontuais ou um script curto; ele deve continuar sendo JSON válido.
- O subagente **não** faz commit nem mexe em `PROGRESSO.md`: isso é tarefa do orquestrador.

### 11.9 Qualidade de escrita
pt-BR, tom do curso, segunda pessoa ("você"), voz ativa, definição antes da justificativa, exemplo concreto cedo. Mantenha os acentos e caracteres especiais. Não invente fatos, comandos, saídas, números de RFC nem referências; se desconfiar de um erro técnico, não corrija no chute: registre em "Revisão humana". Pode corrigir erros técnicos óbvios e verificáveis (ex.: uma conta de subnetting errada), registrando o que corrigiu.
