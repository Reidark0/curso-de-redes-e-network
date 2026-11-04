# CRITÉRIOS DA REVISÃO v2

Cópia literal das seções 3 a 8 e do Apêndice A de `PADRAO_V2.md` (o prompt da v2), seguida da seção **9. Convenções operacionais** e da seção **10. Modelo da análise**, que valem tanto quanto o resto. Em caso de conflito, a seção 9 prevalece (motivos em `DECISOES.md`, a partir da D25). Os critérios da v1 estão em `CRITERIOS_V1.md`; a seção 9 traz o que deles continua valendo.

## 3. O padrão da aula (na ordem em que o app mostra)

**Base de cada aula:** se existe uma versão v1, parta dela, porque ela já tem correções técnicas conferidas, o quiz consertado e os valores verificados. Consulte o original só para recuperar algo que a v1 tenha perdido. Se não existe v1, parta do original e aplique também as correções de bugs que a v1 fazia (formato do quiz, campos invisíveis, conforme `CRITERIOS_V1.md`).

### 3.1 Introdução
- **Objetivos:** 2–3 por aula, mensuráveis e sobre o tema **desta** aula. Não entram:
  - listas de áreas ("conectar com redes, logs, cloud, DevSecOps…"): a ligação com a carreira vai para a Motivação;
  - prévias da próxima aula: vão para o `nextTheme`;
  - atividades ("executar um laboratório").
- **Resultados de aprendizagem:** remova o campo `learningOutcomes`. Situações boas no formato "Dado X…" podem virar perguntas do modo mentor ou exercícios.
- **Motivação** (100–150 palavras): um gancho que o aluno já viveu ou consegue imaginar **neste ponto do curso**, ou um cenário que termina mostrando a consequência (o que dá errado sem esse conhecimento). Sem listas de siglas de temas futuros. A ligação com segurança e cloud, quando houver, fica aqui em 1 frase.
- **Resumo** (4–5 itens de uma linha, ~70 palavras, sem listas de termos soltos). Ele aparece no topo da aula e serve de consulta rápida quando o aluno volta. Termina **sempre** com a frase exata:
  > *Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.*
- **Glossário:** no máximo 5 termos, só os **citados e não explicados** nesta aula. Cada um usa `relatedLessons` para apontar a aula que o explica, quando ela existir. Os conceitos que a própria aula ensina não entram. Sem termos assim, remova o campo.

### 3.2 Contexto
- **História e Evolução** não são seções: remova `content.history` e `content.evolution`. Quando ajudarem a explicar por que a tecnologia é como é, viram no máximo 1–2 frases dentro do Problema.
- **Problema:** sempre pequeno (80–150 palavras). Amarra-se ao gancho da Motivação sem repetir a mesma ideia ("é isso que acontece quando…") e diz o que a aula resolve de novo.

### 3.3 Conteúdo (Conceito, Funcionamento interno, Arquitetura e Diagrama)
- Mantenha o mecanismo central do tema e corte **prévias de módulos futuros**. Quando cortar uma prévia, aponte na análise a aula que a cobre (você pode consultar os títulos e objetivos de outras aulas para isso).
- A ideia ou cadeia central aparece **uma vez em texto e uma vez no diagrama**, e não de novo na Motivação, no Resumo, na Arquitetura e no Desafio.
- **Arquitetura** só existe se mostra algo que o Funcionamento interno não mostra. Se não, remova.
- **Diagrama:** mantenha e corrija se estiver errado.
- **Callout "Erros comuns":** no máximo 3 itens, só erros sobre **este** conteúdo que não estejam repetidos em outro lugar da aula.
- **Termos avançados:** evite sempre que possível. Um termo que não é explicado na aula e não é necessário para entendê-la sai do texto. Se for necessário, vai para o glossário. Se o glossário passar de 5 termos, o sinal é cortar termos do texto.

### 3.4 Exemplos
- **Um bom exemplo** (`simpleExample`) que deixe a ideia clara: concreto, com valores reais e escrito para quem está neste ponto do curso. Pode ser um caso profissional, desde que seja simples.
- **Analogia:** opcional, em 2–3 frases, só quando o conceito é abstrato. Sem parágrafo de "limite da analogia" cheio de termos técnicos.
- **Exemplos por ambiente** (`enterpriseExample`, `cloudExample`, `devsecopsExample`, `securityExample`) deixam de ser obrigatórios. Um deles só fica quando o tema da aula é aquele ambiente (ex.: cloud no módulo 14) ou quando ele mesmo é o melhor exemplo da aula, e nesse caso ocupa o lugar do `simpleExample`. Os outros saem.

### 3.5 Segurança estruturada e Troubleshooting
- **Módulos 0, 1 e 2** (Fundamentos da Computação, Fundamentos de Redes e Modelo OSI): remova `security` e `troubleshooting`.
- **A partir do módulo 3**, cada bloco só fica se a aula ensina algo com ataque e defesa próprios (`security`) ou que se inspeciona com uma ferramenta acessível ao aluno neste ponto (`troubleshooting`). Quando ficar, faz dieta:
  - `security` fica só com 3 listas: `vulnerabilities` (o risco e a mitigação), `goodPractices` (a proteção) e `detectionIdeas` (a detecção), com até 3 itens cada. As outras listas saem. Confirme no renderizador que as chaves ausentes não quebram nada.
  - `troubleshooting` fica com até 3 sintomas, até 3 perguntas de diagnóstico, só comandos do tema que o aluno já consegue usar e uma árvore de decisão curta. Sem comandos repetidos do lab e sem equipamentos que a aula não ensina (ex.: Cisco IOS numa aula de fundamentos).

### 3.6 Fixação
- **Quiz** (obrigatório): 5–6 questões, alinhadas ao conteúdo que ficou. Toda questão precisa ser respondível pela aula, então troque as que dependem de seções removidas. Mantenha o formato normalizado da v1 (`question`, `options`, `answer` como índice, `explanation`) e os `id`s. Os simulados mantêm todas as questões.
- **Flashcards:** 5–8 por aula, nenhum sobre conteúdo cortado. Ficam nos dados da aula, mas o app passa a mostrá-los **só na página do módulo** (seção 5).
- **Lab:** só existe se o aluno **executa algo e vê um resultado que não teria só lendo**. Quando existe: 3–4 passos, ~300–400 palavras, sem ritual (avisos de segurança e "melhorias" genéricos, "registre evidências"). Sem lab de verdade, remova o campo `lab`. Nada de bloco "Prática equivalente".
- **Prática extra (opcional):** modo mentor (2–3 perguntas), exercícios (2–4) e desafio com solução comentada (~150–250 palavras no total). Nenhum item repete uma questão do quiz ou reexplica a ideia central: cada um faz o aluno **aplicar**. Se não houver nada novo para aplicar, o item sai.

### 3.7 Navegação e metadados
- **`nextTheme`:** 1–2 frases. Pode carregar a prévia que saiu dos objetivos.
- **`progressRules.completeWhen`:** `{ "read": true, "quizScoreAtLeast": 70 }` em **todas** as aulas (lab e exercícios são opcionais). Exceção: aulas de projeto, capstone ou portfólio cujas regras usam entregáveis ou rubrica mantêm as regras próprias. Preserve `unlocks` e `accessPolicy`.
- **`duration`:** no formato `"X-Y min + Z min de prática extra"`, ou só `"X-Y min"` se não houver prática extra. `estimatedStudyTimeMinutes` = Y (só o núcleo).
- **Campos invisíveis:** removidos como na v1 (`networkContext` continua).
- **Módulos** (`aulas novas/modules/module-XX.js`): `estimatedHours` = soma do núcleo das aulas ÷ 60, arredondado; `assessment.requiredLabs` só com labs que existem.

---

## 4. Aulas especiais (as regras da v1 continuam)

- **Simulados:** mantêm todas as questões. O resto do padrão se aplica à moldura.
- **Projetos, capstone e portfólio:** o escopo e as regras de conclusão próprias ficam. Corte o texto ritual.
- **Revisão, ligação e roadmap:** enxutas.
- **Módulo 16:** o aviso de autorização e escopo aparece uma vez, de forma clara.

---

## 5. Mudanças permitidas no app (faça uma vez, antes do loop)

Altere só o necessário em `assets/js` e, se precisar, em `assets/css`. Não mude chaves de storage.

1. **Flashcards por módulo:**
   - tire os flashcards da página da aula (o painel e o item no índice "Fixação");
   - na página do módulo (`renderModuleDetail`), acrescente a seção **"Flashcards do módulo"**, juntando os flashcards de todas as aulas do módulo, com a aula de origem indicada em cada card;
   - reaproveite `renderFlashcards` e `bindFlashcards`, e garanta que o card vira ao clicar.
2. **Busca:** `services/search.js` indexa o quiz só por `q.q`, `q.opts` e `q.exp`. Faça a busca indexar também `question`, `options` e `explanation`, que é o formato padronizado.
3. **Textos fixos que ficaram incorretos:** por exemplo, a descrição do grupo "Contexto" fala em "história" e "evolução", que deixam de existir. Ajuste só textos assim.

Teste no navegador se houver Chromium/Playwright: uma aula sem flashcards, a página de um módulo com os flashcards virando e a busca encontrando um texto do quiz. Registre as mudanças em `DECISOES.md`.

---

## 6. Fórmula de duração (v2)

- **Núcleo** = palavras de teoria visível (Introdução + Contexto + Conteúdo + Exemplos + Segurança/Troubleshooting, se houver) ÷ 130 + 3 min por diagrama + 1 min por questão do quiz.
- **Prática extra** = lab (`lab.estimatedTimeMinutes`, se for plausível; senão 5 min por passo) + 2 min por pergunta do mentor + 6 min por exercício + 15 min de desafio com solução.
- **Faixa do núcleo:** [0,85×N ; 1,2×N], arredondada para múltiplos de 5. A prática extra é arredondada para múltiplos de 5.

---

## 7. Validação (v2)

**Erros (impedem concluir a aula):**
- tudo o que a v1 validava (sintaxe, identidades, HTML balanceado, quiz válido), exceto `progressRules`, que agora deve seguir a seção 3.7;
- `learningOutcomes`, `content.history` ou `content.evolution` presentes;
- `security` ou `troubleshooting` presentes no módulo 0, 1 ou 2;
- mais de 3 objetivos ou mais de 5 termos no glossário;
- Resumo sem a frase final padrão;
- quiz fora de 5–6 questões (exceto simulados) ou com questão que depende de seção removida;
- lab com bloco "Prática equivalente";
- `duration` fora do formato.

**Avisos (justifique na análise se passar):**
- Motivação acima de 150 palavras, Problema acima de 150, Resumo acima de 90;
- lab com mais de 4 passos;
- mais de 1 exemplo por ambiente;
- `security` com listas além das 3 permitidas.

**Manual:** leia a aula v2 inteira como um aluno daquele ponto do curso. Ela ensina o tema sem precisar de nada que foi cortado?

---

## 8. Loop (uma aula por vez, na ordem 0.1 → 17.12)

Use um subagente por aula, **um de cada vez**, como na v1. O subagente lê `CRITERIOS_V2.md` (incluindo o Apêndice A) e trabalha só na sua aula.

1. Marque a aula como EM ANDAMENTO na coluna V2.
2. Rode `extrair <id>` com a base certa (v1 se existir, senão original) e `metricas`.
3. Aplique o padrão da seção 3.
4. Escreva a análise curta em `revisao/analises_v2/mXX/aula-<id>.md` com:
   - checklist do padrão (cumpre / não se aplica / exceção justificada);
   - o que saiu e por quê (prévia de qual aula, repetição, termo avançado, seção do template);
   - **inventário só dos conceitos removidos**, cada um com o motivo e, se for uma prévia, a aula que o ensina;
   - métricas original → v1 → v2 (palavras visíveis, núcleo, prática extra);
   - itens para revisão humana.
5. Rode `montar` e `validar`. No máximo 2 correções; depois disso, FALHOU, e o build usa a v1 (ou o original).
6. Atualize `PROGRESSO.md` e faça commit + push.

**Comece pelo piloto:** 0.1 (a aula de referência), 3.5 (ARP: primeiro módulo em que Segurança e Troubleshooting podem voltar) e 14.1 (cloud, onde o exemplo de cloud faz sentido). Releia as três com olhar crítico, ajuste `CRITERIOS_V2.md` se precisar (registrando em `DECISOES.md`) e siga a ordem do curso a partir da 0.2.

**Ao fim de cada módulo:** atualize o arquivo do módulo, confira a continuidade (`nextTheme` e pré-requisitos) e rode um subagente revisor independente em 2 aulas. Ele confere duas coisas: (a) se o padrão foi cumprido; (b) se nada **do próprio tema** se perdeu.

**No fim:**
- gere `redes_e_network_v2_1_single.html` e valide como na v1, incluindo a página de módulo com flashcards;
- escreva `revisao/RELATORIO_FINAL_V2.md` com:
  - números original → v1 → v2 (palavras, horas de núcleo e de prática extra);
  - as listas pedidas na v1 (duração organizada, encheção, conteúdo útil, aproveitamento, aulas mais curtas, explicação mais direta), agora com os dados da v2;
  - as seções removidas por aula;
  - as mudanças no app;
  - os itens de revisão humana.

**Retomada:** se a sessão parar, leia `PROGRESSO.md` (coluna V2), `DECISOES.md` e `CRITERIOS_V2.md`, refaça do zero qualquer aula EM ANDAMENTO e continue da primeira PENDENTE.

---

## Apêndice A — Aula de referência 0.1 (decisões do dono do curso)

Use esta aula para calibrar todas as outras. Ordem de grandeza esperada para a 0.1: cerca de 3.000 palavras no total (hoje são ~6.800) e um núcleo de ~20–30 min, mais a prática extra.

| Item | Como fica na 0.1 |
|---|---|
| Objetivos | 1. Explicar por que computadores representam informação com dois estados físicos (bits). 2. Diferenciar informação, dado, byte, bit e sinal, e explicar que o significado vem da interpretação (codificação ou protocolo). 3. Ver os bytes de um texto (ex.: "rede" = `72 65 64 65`) e explicar por que a mesma sequência pode significar coisas diferentes. |
| Resultados de aprendizagem | Removidos |
| Motivação | Abre com o gancho "aÃ§Ã£o" no lugar de "ação": todo mundo já viu isso num e-mail ou site, e são os mesmos bytes lidos com a regra errada. Ligação com a carreira em 1 frase (o cenário do alerta do SOC pode ficar só como essa frase). Sai a frase que repete o Problema ("computadores não entendem significado humano…"). |
| Resumo | Exatamente:<br>• **Ideia central:** rede é uma cadeia de traduções: dado → bytes → bits → sinal → bits → dado. O significado só volta quando o destino usa a regra certa.<br>• Informação, dado, byte, bit e sinal são coisas diferentes. 1 byte = 8 bits.<br>• Os mesmos bytes mudam de sentido conforme a regra: `01000001` pode ser o número 65 ou a letra A.<br>• Bytes ilegíveis não são, por si só, criptografia nem ataque.<br>• Base64 e hexadecimal mudam a forma dos dados; não protegem nada.<br>*Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.* |
| Glossário | No máximo 5, entre candidatos como UTF-8, Payload, Hexadecimal (→ 0.2), Base64 e Protocolo, só os que a aula não explica |
| Problema | Uma frase retomando o gancho ("é isso que acontece quando os dois lados não usam a mesma regra") + por que dois estados (ruído) + por que é preciso uma regra combinada. Telégrafo e cartões perfurados em no máximo 1 frase. |
| Conceito (~200 palavras) | Fica: a definição de representação digital, bit e byte, `01000001` = 65 ou "A", "ação" tem 4 letras e ocupa 6 bytes em UTF-8 (explica o gancho), "protocolos são as regras combinadas" (1 frase) e "codificação: qualquer um reverte; criptografia: só com a chave" (2 linhas). Sai: o que Ethernet, IPv4, TCP, HTTP e TLS definem; a tabela de 5 transformações (serialização, compressão, hash); o callout de erros comuns repetido. |
| Funcionamento interno (~170) | Fica a cadeia em passos simples e "o hardware mede um fenômeno físico e decide se é 0 ou 1". Sai o detalhe do encapsulamento (portas, MAC, flags) e o parágrafo "Ligação com segurança" (checksum, CRC, MAC criptográfico, SIEM). |
| Arquitetura | Removida, ou no máximo 4 linhas (sinal, bit, byte, dado). Saem quadro, pacote, segmento, MTU e fragmentação (módulo 2). |
| Diagrama | Mantido |
| Exemplos | `simpleExample` = o caso do HTTP Basic, escrito para iniciante: "quando você faz login num site que usa um tipo antigo de autenticação, o navegador envia `Authorization: Basic dXN1YXJpbzpzZW5oYQ==`; lido como texto parece embaralhado, lido como Base64 é `usuario:senha`; qualquer um decodifica, só o TLS protege". Analogia das lâmpadas em 2–3 frases. Saem: empresarial (repetia o gancho), cloud, DevSecOps, o `securityExample` separado e o parágrafo de IPv4/MAC. |
| Segurança e Troubleshooting | Removidos |
| Quiz | 5–6 questões. Sai a questão do flow log de cloud. A da "ação = 6 bytes" fica, e o Conceito precisa explicar isso. |
| Flashcards | Saem "Checksum/CRC × MAC criptográfico" e "O que o Wireshark mostra?" |
| Lab | 3–4 passos: ver os bytes de "rede" e de "ação", codificar em Base64 e decodificar (~300–400 palavras). Saem "visualizar como texto", "relacionar com análise de tráfego" e "comparar e registrar evidências". |
| Prática extra | Mentor: 2–3 perguntas que não repitam o quiz. Exercícios: o de decodificar `Authorization: Basic YWRtaW46MTIzNDU2` fica (aplica o exemplo); sai o "diferencie informação, dado, bit e sinal" (é a questão 1 do quiz). Desafio novo, de aplicação: "um colega abriu um CSV e viu 'aÃ§Ã£o'; explique o que aconteceu e como confirmar olhando os bytes", com a solução comentada. |
| Conclusão | `{ "read": true, "quizScoreAtLeast": 70 }` |

---

## 9. Convenções operacionais (o que o código impõe e como trabalhar)

### 9.1 Ferramentas (rode a partir da raiz do curso)
| Passo | Comando | O que faz |
|---|---|---|
| 2 | `node revisao/tools/extrair.js <id>` | cria `revisao/trabalho_v2/<id>/` com `base/` (a v1, se existir; senão o original), `original/` (só quando a base é a v1) e `nova/` (cópia da base, onde você edita). Cada pasta tem `meta.json`, `content/<chave>.html` e `content_order.json`. Uma `nova/` anterior é renomeada, nunca apagada |
| 2 | `node revisao/tools/metricas.js <id> original` (e `v1`, se a base for a v1) | palavras por seção, núcleo e prática extra pela seção 6. Salva `metricas_<versão>.json` |
| 2 | `node revisao/tools/contexto.js <id>` | módulo, esta aula e título + objetivos + resumo das aulas anterior e seguinte |
| 3 | `node revisao/tools/indice.js --busca "termo"` (ou `--modulo mXX --obj`) | títulos e objetivos de todas as aulas: para dizer qual aula ensina uma prévia cortada e para preencher `glossary[].relatedLessons` |
| 3 | `node revisao/tools/quiz_normalizar.js <id>` | **só se a base for o original**, antes de mexer no quiz: formato `{id, question, options, answer:<índice>, explanation}` |
| 3 | `node revisao/tools/ajustar.js <id> regras` | `progressRules` no padrão 3.7 (preserva `accessPolicy` e `unlocks`), remove `learningOutcomes` e, nos módulos 0–2, `security`/`troubleshooting` |
| 5 | `node revisao/tools/montar.js <id>` | gera `aulas novas/mXX/lesson-XX-YY.js` a partir de `nova/` |
| 5 | `node revisao/tools/metricas.js <id> nova` | métricas da versão montada |
| 5 | `node revisao/tools/ajustar.js <id> duracao` | grava `duration` e `estimatedStudyTimeMinutes` pela fórmula da seção 6 (depois, `montar` de novo) |
| 5 | `node revisao/tools/quiz_embaralhar.js <id>` | só se o `validar` avisar "gabarito concentrado" (depois, `montar` de novo) |
| 5 | `node revisao/tools/validar.js <id>` | checagens da seção 7. ERRO reprova; AVISO precisa de justificativa na análise |
| 4 | `node revisao/tools/comparar.js <id> --sumiram` | palavras por seção base → nova e as frases da base que sumiram: use para fechar o inventário dos conceitos removidos |

Sequência de fechamento: `montar` → `metricas nova` → `ajustar duracao` → `montar` → `metricas nova` → `validar`.

### 9.2 Como editar
- Trabalhe só em `revisao/trabalho_v2/<id>/nova/`: `content/<chave>.html` e `meta.json`. Para remover uma seção de `content`, apague o `.html` dela. Para remover um campo de topo (`lab`, `security`, `glossary`, `challenge`…), tire a chave do `meta.json`. Edite `meta.json` com edições pontuais ou um script curto (Python/Node) e mantenha-o JSON válido.
- Não altere nada fora de `revisao/trabalho_v2/<id>/`, `revisao/analises_v2/` e `aulas novas/` (este último só pelo `montar`).

### 9.3 O que o app renderiza (confira antes de decidir)
- **Ordem na tela:** *Introdução* (objectives, motivation, summary, glossary) → *Contexto* (problem) → *Conteúdo* (concept, internals, architecture, diagram) → *Exemplos* (accordion fechado: analogy, simpleExample, enterprise/cloud/devsecops/securityExample) → `security` → `troubleshooting` → *Fixação* (lab, quiz, mentorQuestions, exercises, challenge, commentedSolution, cada um num painel recolhido) → nextTheme → referências. **Os flashcards não aparecem na aula:** ficam na página do módulo, com a aula de origem (seção 5 do padrão).
- O renderizador tira o `<section>` externo e o primeiro `<h2>` de cada chave de `content` e põe um título fixo ("Motivação", "Conceito"…). Use `<section class="lesson-section lesson-section--<tipo>"><h2>Título</h2> … </section>` (mantenha a classe do envelope que já existe na base). Subtítulos internos usam `<h3>`.
- O Resumo aparece logo depois da Motivação, no topo da aula. Formato: `<ul>` com 4–5 `<li>` de uma linha e, depois da lista, `<p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>` (a frase exata é conferida pelo `validar`).
- **Campos fora de `content` são texto puro** (o app escapa HTML): nada de tags ou markdown em quiz, lab, exercícios, security, troubleshooting, glossário, flashcards, mentor, challenge, commentedSolution e referências.
- Subcampos exibidos (o resto é invisível e não deve existir):
  - `lab`: id, title, objective, scenario, topology (texto), architecture (texto), cost, prerequisites|requirements, tools, safetyNotes, steps, expectedResult, validation, troubleshooting, improvements, evidenceToCollect, questions, challenge, solution; metadados `labType` e `estimatedTimeMinutes`. Passo: title, instruction|description|action, command|commands, analysisTask, calculation, configuration, artifact, evidence, expectedOutput|expectedResult|expected, explanation|reason|interpretation. **Na v2, um lab enxuto usa só:** id, title, objective, tools/prerequisites (se precisar), steps (3–4, cada um com instruction, command quando houver, expectedOutput e, se ajudar, explanation), expectedResult, labType, estimatedTimeMinutes.
  - `security` (v2): `vulnerabilities[{name, description, defensiveExplanation, mitigation}]` (preencha os 4), `goodPractices`, `detectionIdeas` — até 3 itens cada. O renderizador aceita a ausência das outras listas.
  - `troubleshooting`: symptoms, diagnosticQuestions, commands[{platform, command, purpose, expectedObservation, interpretation}] (preencha os 5: o app mostra os rótulos mesmo vazios), decisionTree[{if, then}].
  - `glossary[]`: term, shortDefinition, longDefinition (opcional), example (opcional), relatedTerms (opcional), **relatedLessons** (lista de ids de aula, ex.: `["0.2"]`; o app mostra "Explicado na aula: 0.2" com link).
  - `mentorQuestions[]`: type, question, hints, expectedIdeas, explanation · `exercises[]`: type, prompt, expectedAnswer, explanation · `challenge`: title, scenario, tasks, constraints, expectedDeliverables, successCriteria, gradingRubric · `commentedSolution`: reasoning, steps, commonMistakes|commonWrongAnswers, finalAnswer · `flashcards[]`: front, back · `references[]`: title, organization, note, url.
- Itens de `quiz`, `flashcards`, `mentorQuestions`, `exercises` e `glossary` precisam ser **objetos** (string vira card vazio).

### 9.4 Classes CSS que existem
`callout` (caixa), `callout warning`, `callout security`, `definition-box`, `evidence-box`, `content-card`, `responsive-table` (div) + `data-table` (table), `code-block`, `command-block`, `lesson-svg`, `svg-*`. O markup **novo** usa só essas; classes que já existem na base ou no original podem ficar. O `validar` reprova classe nova inexistente. Exemplo de "Erros comuns": `<div class="callout warning"><strong>Erros comuns</strong><ul><li>…</li></ul></div>`.

### 9.5 Identidades, quiz e ids
- Preserve `id`, `moduleId`, `order`, a constante, `prerequisites`, `progressRules.unlocks`, `progressRules.accessPolicy`, `lab.id` (se o lab ficar), `networkContext` e os `id` das questões, flashcards e exercícios mantidos.
- Questão **sem id** no original: o `quiz_normalizar` dá `id` = índice original ("0", "1"…), que é a chave do progresso salvo. Questão **nova**: id inédito na aula, seguindo o padrão existente (ex.: `q0.1.9`) ou `q<N>`. Nunca reaproveite o id de uma questão removida para outra pergunta.
- Pode reordenar as opções (a nota usa o `isCorrect` salvo). Varie a posição da resposta correta; sem "todas/nenhuma das anteriores"; nenhuma explicação cita a posição ("a primeira alternativa").
- **Quiz respondível:** o `validar` só tem uma heurística (aviso). A confirmação é sua e é ERRO se falhar: antes de concluir, confira cada questão contra a aula v2 e declare no checklist ("quiz respondível pela aula: sim").

### 9.6 Base original (aulas que a v1 não revisou)
Aplique também as correções da v1: `quiz_normalizar`; remova os campos invisíveis de `content` (`labIntro`, `exercisesIntro`, `challengeIntro`, `solutionIntro`) e todos os campos de topo que o app não exibe (`deepDive`, `commonMistakes`, `protocolFields`, `packetFlow`, `diagnosticCase`, `pedagogicalMap`, `trafficCapture`, `assessmentBlueprint`, `adaptiveReview`, `realWorld`, `caseStudy`, `commands`, `relatedCourses`, `nextLesson`, `diagramNotes`, `blueTeam*`, `finalSimulation`, `domainGapReport`, `capstone*`, `simulado`, `reviewStatus`… — o `validar` lista o que sobrou). Ficam só `id`, `moduleId`, `order`, `prerequisites`, `progressRules`, `networkContext` e `estimatedStudyTimeMinutes` além dos campos exibidos. Antes de remover, aproveite **só o que o padrão v2 pede** (ex.: um erro comum do próprio tema vira o callout de até 3 itens; um campo de protocolo central do tema vira tabela no Funcionamento interno). `topology`/`architecture` do lab, se ficarem, viram texto. Confira HTML desbalanceado e comandos/valores errados; corrija só o que for erro óbvio e verificável e registre.

### 9.7 Quanto cortar (calibração pela 0.1)
- Alvo de ordem de grandeza: a 0.1 vai de ~6.800 palavras visíveis para ~3.000, com núcleo de ~20–30 min. Aulas de fundamentos devem cair na mesma proporção (cerca de metade). Aulas cujo tema é naturalmente denso (protocolos com campos, configurações, cálculo) podem ficar maiores, mas cada parágrafo precisa ensinar o tema **desta** aula para quem está neste ponto do curso.
- Corte primeiro: seções do template (history, evolution, learningOutcomes, exemplos por ambiente, security/troubleshooting nos módulos 0–2), prévias de módulos futuros, repetição da ideia central, termos avançados não explicados, ritual de lab, prática que repete o quiz. **Nunca corte** o mecanismo do tema, números e valores concretos que o explicam, casos de borda do próprio tema e erros comuns específicos.
- Acrescentar só para fechar uma lacuna real do próprio tema (ex.: o Conceito da 0.1 precisa explicar por que "ação" ocupa 6 bytes, porque o quiz e o gancho dependem disso). Registre todo acréscimo na análise.
- Mesma ideia, uma vez: ela aparece uma vez em texto (Conceito ou Funcionamento) e uma vez no diagrama. O Resumo é a exceção prevista pelo padrão (consulta rápida, em 1 linha). A Motivação usa um caso concreto, não o enunciado da ideia; o Problema amarra o caso ao que a aula resolve sem repetir o gancho; o Desafio aplica a ideia a um caso novo.

### 9.8 Qualidade de escrita
pt-BR, tom do curso, segunda pessoa ("você"), voz ativa, definição antes da justificativa, exemplo concreto cedo, frases curtas. Mantenha acentos. Não invente fatos, comandos, saídas, RFCs nem referências; se desconfiar de um erro técnico, não corrija no chute: registre em "Revisão humana". Mantenha só referências reais que já estavam na aula.

### 9.9 Aulas especiais (complemento da seção 4)
- **Simulados** (17.3–17.6, 17.11): todas as questões ficam (o `validar` reprova se o número cair); revise só formato, gabarito e clareza. A moldura segue o padrão (objetivos, motivação curta, resumo com a frase, nada de history/evolution/exemplos por ambiente). Não há limite de 5–6 questões.
- **Projeto, capstone e portfólio** (tipos `projeto`, `capstone`, `portfólio`; regras próprias em 14.14, 15.12, 16.12, 17.9 e 17.12): `ajustar regras` mantém o `completeWhen` original. O lab/entregáveis podem passar de 4 passos; se o tempo do lab não couber em 5 min/passo, crie `revisao/trabalho_v2/<id>/lab_override.json` com `{"minutos": N, "justificativa": "..."}` e ponha o mesmo N em `lab.estimatedTimeMinutes`.
- **Revisão, ligação, roadmap, governança:** enxutas; o padrão de 5–6 questões vale.

## 10. Modelo da análise (`revisao/analises_v2/mXX/aula-<id>.md`)

Curta e objetiva. Use exatamente estas seções:

~~~markdown
# Aula <id> — <título> (v2)
Base: v1 | original · Tipo: … · Módulo: …

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre / exceção justificada | … |
| learningOutcomes, history, evolution removidos | … | … |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | … | n palavras |
| Resumo 4–5 itens + frase final | … | n palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | … | … |
| Problema 80–150, sem repetir o gancho | … | n palavras |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | … | … |
| Arquitetura só se acrescenta | … | … |
| Diagrama mantido/corrigido | … | … |
| Erros comuns ≤3, sem repetição | … | … |
| Termos avançados cortados ou no glossário | … | … |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | … | … |
| Exemplos por ambiente (só se o tema é o ambiente) | … | … |
| Segurança / Troubleshooting (3.5) | … | … |
| Quiz 5–6, respondível pela aula | … | quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | … | … |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | … | … |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | … | … |
| nextTheme 1–2 frases | … | … |
| progressRules e duration | … | … |
| Campos invisíveis | … | … |

## 2. O que saiu e por quê
- <seção/bloco>: <motivo: seção do template | prévia da aula X | repetição de Y | termo avançado | ritual>

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|

## 4. Acréscimos
- (só para fechar lacuna real do tema; ou "nenhum")

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | | | |
| Teoria (palavras) | | | |
| Núcleo (min, fórmula v2) | | | |
| Prática extra (min) | | | |
| duration declarada | | | |

## 6. Avisos do validar e justificativas
- …

## 7. Revisão humana
- … (ou "nenhum")

```json
{
  "id": "0.1", "modulo": "m00", "titulo": "", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "history"], "conceitos_removidos": 0, "acrescimos": [],
  "palavras_visiveis": { "original": 0, "v1": null, "v2": 0 },
  "nucleo_min": { "original": 0, "v1": null, "v2": 0 }, "pratica_extra_min": { "original": 0, "v1": null, "v2": 0 },
  "duration_v2": "", "quiz_questoes": 0, "quiz_respondivel": true, "lab": "mantido | removido | não havia | criado",
  "linguica_restante": "BAIXA | MÉDIA | ALTA", "conteudo_util": "FORTE | PARCIAL | FRACO", "aproveitamento": "BOM | MÉDIO | BAIXO",
  "explicacao_mais_direta": "onde ficou mais direta, em 1 frase",
  "revisao_humana": []
}
```
~~~
`status` é "CONCLUIDA" ou "FALHOU". `linguica_restante`, `conteudo_util` e `aproveitamento` usam as definições de `CRITERIOS_V1.md` (6.3–6.5), aplicadas à **versão v2**.
