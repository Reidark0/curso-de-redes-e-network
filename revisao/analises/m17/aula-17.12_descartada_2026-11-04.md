# Aula 17.12 — Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta
Tipo: capstone (6.10: projeto, escopo preservado) · Duração declarada: 480-720 min · Palavras visíveis / invisíveis (antes): 8337 / 4084 (das invisíveis, 252 são artefato da ferramenta: caracteres das `mentorQuestions` em string)

## 1. Duração
T pela fórmula = 196,4 min (teoria 24,5, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 30, desafio 20, lab 103,9 — o `lab.estimatedTimeMinutes` de 720 foi rejeitado como implausível e substituído por 16 passos × 5 min + leitura).
Veredito: **INFLADA** — M = 600 min contra T = 196 min (M > 1,2×T). O tempo longo de um capstone é legítimo (6.10), mas os 720 min do lab sozinho não são sustentados pelos passos descritos, e 14% do tempo é leitura. A distribuição teoria/prática (pctTeoria 14%) está adequada a um projeto. Na nova versão o lab passou a 19 passos com `estimatedTimeMinutes` = 220 (o teto de plausibilidade da ferramenta, 2 × 110,9), e a duração foi para a faixa recomendada da nova versão: **260-370 min**. O esforço real para produzir 12 entregáveis provavelmente é maior (ver Revisão humana).

## 2. Encheção de linguiça
Nível: **ALTA (~35%)**. Evidências:
- **lab.steps:** o mesmo `analysisTask` em 12 passos ("Produza o artefato indicado na instrução do passo e registre a evidência objetiva…", frase repetida em 56 aulas) e o mesmo `explanation` ("Este passo ajuda a transformar o conceito da aula…").
- **lab.troubleshooting:** os 5 itens têm `probableCause`, `howToConfirm` e `fix` idênticos e genéricos ("Premissa incorreta, coleta incompleta…", em 41 aulas).
- **lab.validation:** 21 itens; 12 repetem a descrição completa de D01–D12 com o mesmo `ifFails`, e 5 "Critério final" com `expected: critério atendido com evidência`.
- **lab.evidenceToCollect:** repete D01–D12 inteiros pela terceira vez e traz 6 itens genéricos ("Capturas de tela ou saídas de comandos relevantes").
- **lab.improvements** (12 itens com pares duplicados: portfólio ×3, policy as code ×2, simulação mensal/trimestral) e **lab.questions** genéricas ("Qual erro comum este laboratório ajuda a evitar?", em 43 aulas).
- **challenge.expectedDeliverables:** 24 itens, com D01–D12 inteiros mais 12 itens que repetem os mesmos entregáveis com outras palavras.
- **history/evolution/analogy:** história genérica ("Historicamente, redes corporativas começaram relativamente simples…"), evolução que repete o método, e a analogia da cidade, que não ensina mecanismo.
- **summary:** meta-texto ("Avaliação P1-M17: esta aula agora deve ser corrigida por competência…") e tabela colada fora do `<section>`. **nextTheme:** "Redes e Network v2.0-v2-final", 92 palavras.
- **security/troubleshooting:** blocos-padrão do m17 ("Não relacionar revisão integrada, simulados… com impacto operacional", "Criar alerta ou consulta específica para sinais relacionados à aula 17.12"), `commands` com pseudocomandos ("preencher checklist de camada…").
- **Campos invisíveis:** 4 rubricas diferentes (capstoneProject.rubric 5×20, capstoneProject.gradingRubric = challenge, capstoneEvaluation.gradingRubric, assessmentBlueprint.gradingRubric) e D01–D12 repetidos em 6 lugares.
Conferência 11.7: cortes brutos por campo = 26% (2149 palavras), abaixo da estimativa de ~35%, porque dentro do lab e da solução comentada os cortes foram compensados por conteúdo movido de campos invisíveis (pacote do incidente, taxonomia, regra de decisão). A reescrita não cortou mais do que a linguiça estimada.

## 3. Conteúdo útil
**PARCIAL.** O que tem valor: o enquadramento conectável/defensável/diagnosticável/governável, a cadeia de dependências e os quatro planos, a ordem de diagnóstico do 503 e do usuário remoto, a arquitetura em camadas, os 12 entregáveis com conteúdo mínimo, a rubrica de 8 critérios, a matriz C01–C08 com mínimos e o **pacote de incidente sintético** (timeline + logs DNS/flow/WAF/VPN com valores reais), que é o melhor material da aula e estava invisível. Lacunas: nenhum passo do lab produzia D04, D05, D06 e D09; os critérios de aprovação eram contraditórios (80% geral; "crítica abaixo de 70%"; mínimos de 70/75/80 por competência; faixa "75-89% aprovado com ressalvas"); a taxonomia de erros era citada no passo 14, mas só definida num campo invisível; as `mentorQuestions` eram strings, então o app mostrava 3 cartões com "Pergunta" e sem texto; o troubleshooting não tinha nenhum comando real. Erros técnicos: nenhum no núcleo; inconsistência nos logs VPN sintéticos (ver Revisão humana).

## 4. Aproveitamento
**BOM (~84% contra o T original de 196 min).** Desperdício: leitura ritual do lab (~12 min), história/evolução/analogia (~3 min), security/troubleshooting genéricos (~3 min), exercício 5 duplicado do lab (6 min), modo mentor sem texto visível (6 min), questão trivial (~1 min). Contra a duração declarada (600 min), o aproveitamento cai para algo como 28%: a aula promete três vezes o tempo que descreve.

## 5. Pode ser mais curta?
**SIM** — redução prevista de ~35% da leitura (linguiça) e de 47% na duração declarada (M 600 → 315 min), sem perder nenhum entregável, passo ou critério. O T da fórmula sobe (196 → 308 min) só porque o `lab.estimatedTimeMinutes` implausível (720, ignorado pela fórmula) foi corrigido para 220.

## 6. Explicação mais direta
**SIM** — (a) **concept:** a lista corrida "A arquitetura final deve incluir: mapa lógico, plano CIDR…" virou a tabela D01–D12 com a coluna "Passos do lab", seguida da rubrica com a coluna "Entregáveis", da matriz C01–C08 com a coluna "Módulos" e de uma tabela de decisão; (b) **architecture:** três parágrafos de camadas viraram tabela; (c) **internals:** os quatro planos viraram lista; (d) **simpleExample:** a ordem de diagnóstico virou lista numerada; (e) **lab:** cada passo ganhou `artifact` (qual D produz) e modelo de tabela em `command`.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | 1 parágrafo + callout; absorveu a única ideia útil de history |
| history | REMOVER | evolução genérica; a frase "conectar com segurança, governança, custo e evidência" foi para motivation |
| problem | ENXUGAR | é o cenário do projeto; mantido quase igual |
| evolution | FUNDIR:concept | virou a "ordem de trabalho" (arquitetura → defesa → diagnóstico → operação) |
| concept | MANTER (+MOVER) | núcleo; recebeu D01–D12, rubrica, matriz C01–C08, regra de decisão e o critério de maturidade |
| internals | ENXUGAR | cadeia de dependências e planos mantidos; planos em lista |
| architecture | ENXUGAR | tabela de camadas, sem perder componente |
| analogy | REMOVER | analogia da cidade genérica, sem mecanismo |
| simpleExample | ENXUGAR | ordem de diagnóstico em lista numerada |
| enterpriseExample | ENXUGAR | regras concretas em lista ligadas a D03/D04 |
| cloudExample | MANTER | específico (landing zone, PE, guardrail, custos); ligado ao D07 |
| devsecopsExample | MANTER | guardrails concretos; plano de automação ligado ao D10 |
| securityExample | ENXUGAR | sintomas repetidos de problem cortados; hipóteses e resposta proporcional mantidas; critério de maturidade movido para concept |
| diagram | MANTER | SVG intacto (ids preservados); texto introdutório trocado por uma leitura do diagrama |
| labIntro | MOVER:lab.scenario | era cópia do lab.scenario (os três públicos ficaram lá) |
| exercisesIntro | REMOVER | ideia ("não basta dizer usaria firewall") já está no critério de maturidade |
| challengeIntro | MOVER:challenge.scenario | perguntas da banca |
| solutionIntro | MOVER:commentedSolution.reasoning | "não é a única arquitetura possível…" |
| summary | ENXUGAR | 5 bullets; tabela C01–C08 e critérios movidos para concept |
| nextTheme | ENXUGAR | 1 parágrafo; última aula do curso |
| lab | ENXUGAR | ritual cortado; 16 → 19 passos (D04 dentro do passo 4; novos passos para D05, D06, D09); `artifact` por passo; pacote do incidente no passo 12; `estimatedTimeMinutes` 720 → 220 |
| quiz | MANTER (ajustado) | 6 → 7; q "0" trivial trocada por q6 (leitura de logs DNS); q7 nova (regra de decisão) |
| flashcards | MANTER | 6; "Capstone profissional" (repetia o glossário) trocado por taxonomia de erros |
| mentorQuestions | MANTER (convertido) | strings → objetos {type, question, expectedIdeas}; antes o app não mostrava o texto |
| exercises | ENXUGAR | 5 → 4; exercício de competências duplicava o passo 16 do lab; `title` invisível removido, `type` adicionado |
| challenge | ENXUGAR | `description` → scenario (+ perguntas da banca); 24 entregáveis deduplicados em 15; tasks/successCriteria deduplicados; rubrica mantida |
| commentedSolution | MANTER (+MOVER) | `content` invisível → reasoning; steps agora leem o pacote do incidente; +1 erro comum |
| glossary | MANTER | 6 termos, todos usados |
| security | ENXUGAR | práticas específicas do capstone; item-lixo e ritual cortados; monitoring ligado aos logs do incidente |
| troubleshooting | ENXUGAR (reescrito) | sintomas do incidente; 4 comandos reais com interpretação no lugar de pseudocomandos; decisionTree mantida |
| references | MANTER | todas reais |
| linksToOtherCourses | ENXUGAR | 8 → 5; 3 duplicados (observabilidade; Zero Trust/governança ×2) |
| diagram (topo) | REMOVER | metadado de acessibilidade; ids `svg-title-17-12`/`svg-desc-17-12` preservados no SVG |
| capstoneProject | MOVER:concept,challenge,lab | D01–D12 → concept; gradingRubric = challenge; passingCriteria → decisão; validationChecklist → lab.validation; syntheticIncidentPackage → passo 12; rubric 5×20 removida (conflitante) |
| assessmentBlueprint | MOVER:concept,lab | competências/módulos → matriz; mustRedoWhen → decisão; remediationTracks/evidenceRequired → passos 16 e 19; gradingRubric C01–C08×10 e feedbackBands removidos (conflitantes) |
| adaptiveReview | MOVER:lab | errorTaxonomy → passo 17 + flashcard; revisionLoop → passos 16 e 19 |
| capstoneEvaluation | MOVER:concept,lab.validation | approvalCriteria → decisão/validação; requiredDeliverables (limpeza, backlog) → D07/challenge; gradingRubric removida (conflitante) |
| capstoneFinalRequirements | MOVER:concept,lab.evidenceToCollect | minimumScore 80 e criticalCompetencyMinimum 70 → decisão; completionEvidence → evidências |
| accessPolicy (topo) | REMOVER | duplicado de progressRules.accessPolicy (mantido intacto) |
| lab.(ocultos) | MOVER:lab.safetyNotes,lab.expectedResult | cleanupPolicy → safetyNotes; expectedOutcome → expectedResult; evaluationMode/competencyBased/assessmentReference/requiredDeliverables removidos |
| lab.challenge / lab.solution | REMOVER | duplicavam o desafio e a solução comentada; a frase útil foi para commentedSolution.reasoning |
| challenge.(ocultos) | MOVER:challenge.scenario | description → scenario; deliverables fundidos em expectedDeliverables |
| commentedSolution.(ocultos) | MOVER:commentedSolution.reasoning | content → reasoning; title removido |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Conectável, defensável, diagnosticável, governável | MANTIDO | concept (lista) |
| 2 | 12 entregáveis D01–D12 com conteúdo mínimo | MANTIDO | concept (tabela) + challenge.expectedDeliverables + lab.validation |
| 3 | Rubrica de 100 pontos, 8 critérios (15/15/10/12/15/15/10/8) | MANTIDO | challenge.gradingRubric + concept (tabela com entregáveis) |
| 4 | Rubrica 5×20 (capstoneProject.rubric) | REMOVIDO | conflitante com a rubrica exibida; seus temas estão nos 8 critérios |
| 5 | Rubrica de capstoneEvaluation (8 critérios diferentes) | REMOVIDO | conflitante; Blue Team/SIEM, DevSecOps e matriz de competências estão cobertos pelos critérios exibidos + matriz C01–C08 |
| 6 | Rubrica C01–C08 × 10 pontos (assessmentBlueprint) | REMOVIDO | terceira rubrica conflitante; competências avaliadas na matriz |
| 7 | Matriz C01–C08: módulos, mínimo, domínio, evidência | MANTIDO | concept (tabela, + coluna Módulos) |
| 8 | Aprovação exige 80 pontos | MANTIDO | concept (decisão), lab.validation, quiz q7, finalAnswer |
| 9 | Nenhuma competência crítica abaixo de 70% | MANTIDO | concept (decisão) |
| 10 | Competência abaixo do mínimo exige plano de reteste | MANTIDO | concept (decisão), passo 19, challenge |
| 11 | Refazer quando a resposta correta não pode ser explicada com evidência | MANTIDO | concept (decisão) |
| 12 | Decisões: aprovado / com ressalvas / refazer competência crítica | MANTIDO | concept, passo 18, challenge |
| 13 | Faixas de feedback 0-59/60-74/75-89/90-100 | REMOVIDO | conflitam com o mínimo de 80 (75–79 "aprovado com ressalvas"); substituídas pela regra de decisão (Revisão humana) |
| 14 | Taxonomia E-CONCEITO…E-COMUNICACAO com significado | MANTIDO | passo 17 + flashcard |
| 15 | Recuperação ativa, mini lab, reteste após 24–48 h, confiança antes de corrigir | MANTIDO | passo 19 |
| 16 | Registro de confiança antes e depois da correção | MANTIDO | passo 16, evidenceToCollect |
| 17 | Pacote do incidente: timeline 08:40–11:00 e logs DNS/flow/WAF/VPN | MANTIDO | passo 12 (`command`), solução comentada, troubleshooting, quiz q6 |
| 18 | Checklist de validação (any-any, DNS separado, VPN, cloud, observabilidade, RCA, rubrica) | MANTIDO | lab.validation |
| 19 | Política de limpeza de recursos cloud e sanitização | MANTIDO | lab.safetyNotes |
| 20 | Dossiê legível para três públicos | MANTIDO | lab.scenario |
| 21 | Perguntas da banca (CIDR, DNS, WAF, NAT, 503, exfiltração, custo) | MANTIDO | challenge.scenario |
| 22 | Modelo de solução madura | MANTIDO | commentedSolution.reasoning |
| 23 | Cadeia de dependências e planos de dados/controle/observabilidade/governança | MANTIDO | internals |
| 24 | Ordem de checagem do 503 e do tráfego suspeito | MANTIDO | internals, quiz 2 |
| 25 | Arquitetura em camadas (borda, dados, egress, híbrida, segmentação, Wi-Fi com VLAN dinâmica, remoto com MFA/postura, segurança, operação, evidência) | MANTIDO | architecture (tabela) |
| 26 | Diagnóstico do usuário remoto em 7 etapas | MANTIDO | simpleExample |
| 27 | Zonas por função; convidado só internet; bastion+MFA; exceções com expiração | MANTIDO | enterpriseExample |
| 28 | Landing Zone, hub-spoke, PE, guardrail de rota pública/SG; custos (NAT, egress, logs, firewall, transit, inter-region, WAF, retenção) | MANTIDO | cloudExample, passo 7, quiz 5 |
| 29 | Guardrails DevSecOps e plano de automação com rollback | MANTIDO | devsecopsExample, exercício 4 |
| 30 | Hipóteses do incidente (health check, DNS privado, rota assimétrica, política, processo ruidoso, C2, exfiltração) e resposta proporcional sem ação ofensiva | MANTIDO | securityExample, problem, passo 13 |
| 31 | Critério de maturidade (escopo, evidência, mitigação, risco residual, monitoramento) | MANTIDO | concept (callout) |
| 32 | Resposta imatura × profissional; ordem arquitetura → defesa → diagnóstico → operação | MANTIDO | concept (ordem de trabalho), problem, quiz 2, commonWrongAnswers |
| 33 | História das redes corporativas e mudança cultural | REMOVIDO | história genérica que não explica o mecanismo; ideia central em motivation |
| 34 | Analogia da cidade | REMOVIDO | genérica, sem mecanismo |
| 35 | Endpoint privado + DNS privado + IAM | MANTIDO | architecture, cloudExample, quiz 3 |
| 36 | RCA: causa técnica, causa sistêmica, sem culpa, versão técnica e executiva | MANTIDO | passo 14, quiz 4, flashcard, exercício 3 |
| 37 | Árvore de decisão (todas as origens × uma origem, IP × nome, handshake, mudança recente) | MANTIDO | troubleshooting.decisionTree |
| 38 | Riscos: aprovação sem evidência; perda de evidências | MANTIDO | security.vulnerabilities (reescrito) |
| 39 | Dicas do lab (reduzir a arquitetura mantendo 4 fluxos, voltar a D08, exceção documentada, custos invisíveis, diagnóstico opinativo) | MANTIDO | lab.troubleshooting |
| 40 | Melhorias (repositório, IaC, policy as code, war room, FinOps, pesos, repetição) | MANTIDO | lab.improvements (duplicados e "integrar aos cursos da universidade" removidos) |
| 41 | Exercício de matriz de competências | REMOVIDO | duplicado do passo 16 do lab |
| 42 | Questão "conectável × profissional" (q "0") | REMOVIDO | trivial; o conceito está em concept; substituída por q6 |
| 43 | 3 links para outros cursos | REMOVIDO | duplicados dos 5 mantidos |
| 44 | "Rubrica assinada pelo aluno" (requiredEvidence) | REMOVIDO | formalidade sem efeito; a rubrica preenchida com justificativa a cobre |
| 45 | Formato do diagrama (SVG ou ASCII), backlog preventivo, portfólio sanitizado | MANTIDO | challenge.expectedDeliverables, D01 |

Inventário fechado: os 9 itens removidos têm motivo.

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Projetar arquitetura híbrida e cloud com controles defensivos | concept (D01), architecture, cloudExample, lab passos 1–9 |
| Matriz de fluxos, CIDR, zonas, rotas, DNS e políticas | lab passos 3–7, D02–D05, enterpriseExample, exercício 1 |
| Telemetria mínima para troubleshooting, SOC, DFIR, FinOps e auditoria | lab passo 10, D08, security.monitoring, exercício 2 |
| Diagnosticar o incidente simulado com hipótese-evidência | lab passos 12–13, troubleshooting, commentedSolution.steps, quiz q6 |
| RCA técnico e executivo com prevenção e risco residual | lab passo 14, D11, exercício 3, quiz 4 |
| Dossiê de portfólio sanitizado | lab passo 15, safetyNotes, challenge |
| 12 artefatos obrigatórios | concept (tabela), challenge.expectedDeliverables, lab.validation |
| Defender a arquitetura com evidências, trade-offs, custo, rollback e critérios | challenge (banca), concept (rubrica e decisão), mentor, quiz q7 |

## 10. O que mudou na nova versão
- Conceito virou o "manual do capstone": entregáveis com o passo do lab que produz cada um, rubrica com os entregáveis avaliados, matriz C01–C08 com módulos e uma regra de decisão única.
- Lab: ritual cortado (analysisTask/explanation repetidos, troubleshooting genérico, 21 validações → 12, evidências e melhorias deduplicadas); cada passo diz qual entregável produz; 3 passos novos (D05, D06, D09), tirados das descrições dos próprios entregáveis; o pacote do incidente sintético (antes invisível) está no passo 12; taxonomia de erros e trilha de reteste explicadas nos passos 17 e 19; política de limpeza nos cuidados de segurança.
- Mentor: as 3 perguntas agora aparecem (eram strings sem `question`) e ganharam ideias esperadas.
- Solução comentada: o modelo de solução (invisível) virou o raciocínio, e os passos leem os logs do pacote.
- Troubleshooting: sintomas do incidente e comandos reais (`dig`, `ip route get`, `curl -sv`, `kubectl get endpoints`) com interpretação.
- Removidos: history, evolution (fundida), analogy, os 4 intros invisíveis e 7 campos de topo invisíveis.
- Duração: 480-720 → 260-370 min; `lab.estimatedTimeMinutes` 720 → 220.

## 11. Depois
Palavras visíveis: 8337 → 7755 (−7%; cortes brutos de 2149 palavras, 26%, compensados por ~1570 palavras movidas de campos invisíveis) · Invisíveis: 4084 → 0 · Duração: declarada 480-720 min → nova 260-370 min (T 196,4 → 307,9) · Quiz corrigido: sim (7 questões; `answer` normalizado; 1 trocada, 1 nova; gabarito 0:1, 1:3, 2:2, 3:1) · `validar`: ok, 0 erros, 0 avisos.

## 12. Revisão humana
1. **Regra de aprovação consolidada.** O original tinha 4 rubricas e critérios contraditórios ("nenhuma competência crítica abaixo de 70%" × mínimos de 70/75/80 por competência × faixa "75–89% aprovado com ressalvas" × mínimo de 80). Adotei: rubrica exibida (8 critérios) ≥ 80 + D01–D12 + todas as competências no mínimo = aprovado; competência abaixo do próprio mínimo, mas ≥ 70%, com reteste = aprovado com ressalvas; o resto = refazer. Quais competências são "críticas" nunca foi definido; tratei todas como críticas. Confirmar.
2. O mapeamento rubrica → entregáveis (ex.: D05 no critério "Arquitetura") e passo → entregável é inferência a partir das descrições.
3. Logs VPN sintéticos: `assigned_routes=10.0.0.0/8` (09:05) contradiz `route_missing=10.40.0.0/16` (09:06), porque 10.40/16 está dentro de 10/8. Mantive os logs como estavam; a solução comentada usa só o segundo registro. Confirmar se a contradição é intencional.
4. Duração: a fórmula limita o lab a 2 × (5 min/passo + leitura) = 221 min. Para 12 entregáveis o esforço real tende a ser maior (6.10 admite tempo longo). `xp` 650 mantido.
5. Acréscimos meus: 4 comandos de troubleshooting, a leitura dos logs na solução comentada, as `expectedIdeas` do mentor, 2 questões (q6, q7) e 3 passos de lab (5, 6 e 11). Conferir o tom e o escopo.

```json
{
  "id": "17.12", "modulo": "m17", "tipo": "capstone", "status": "CONCLUIDA",
  "titulo": "Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta",
  "duracao_declarada": "480-720 min", "T_original_min": 196.4, "duracao_nova": "260-370 min", "T_nova_min": 307.9, "duracao_nova_estimated_max": 370, "veredito_duracao": "INFLADA",
  "linguica_nivel": "ALTA", "linguica_pct": 35, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": true, "reducao_tempo_pct": 47, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 8337, "palavras_visiveis_depois": 7755,
  "palavras_invisiveis_antes": 4084, "palavras_invisiveis_depois": 0,
  "secoes": {
    "motivation": "ENXUGAR", "history": "REMOVER", "problem": "ENXUGAR", "evolution": "FUNDIR:concept",
    "concept": "MANTER", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "REMOVER",
    "simpleExample": "ENXUGAR", "enterpriseExample": "ENXUGAR", "cloudExample": "MANTER", "devsecopsExample": "MANTER",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "MOVER:lab.scenario", "exercisesIntro": "REMOVER",
    "challengeIntro": "MOVER:challenge.scenario", "solutionIntro": "MOVER:commentedSolution.reasoning", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER", "mentorQuestions": "MANTER", "exercises": "ENXUGAR",
    "challenge": "ENXUGAR", "commentedSolution": "MANTER", "glossary": "MANTER", "security": "ENXUGAR", "troubleshooting": "ENXUGAR",
    "references": "MANTER", "linksToOtherCourses": "ENXUGAR",
    "diagram(topo)": "REMOVER", "capstoneProject": "MOVER:concept,challenge,lab", "assessmentBlueprint": "MOVER:concept,lab",
    "adaptiveReview": "MOVER:lab", "capstoneEvaluation": "MOVER:concept,lab.validation", "capstoneFinalRequirements": "MOVER:concept,lab.evidenceToCollect",
    "accessPolicy": "REMOVER", "lab.(ocultos)": "MOVER:lab.safetyNotes,lab.expectedResult", "lab.challenge+solution": "REMOVER",
    "challenge.description": "MOVER:challenge.scenario", "challenge.deliverables": "FUNDIR:challenge.expectedDeliverables",
    "commentedSolution.content": "MOVER:commentedSolution.reasoning", "commentedSolution.title": "REMOVER", "exercises.title": "REMOVER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Regra de aprovação consolidada a partir de 4 rubricas e critérios conflitantes (70% crítica x mínimos 70/75/80 x faixa 75-89 x mínimo 80); 'competência crítica' nunca foi definida",
    "Mapeamento rubrica->entregáveis e passo->entregável inferido das descrições",
    "Logs VPN sintéticos contraditórios: assigned_routes=10.0.0.0/8 x route_missing=10.40.0.0/16",
    "Duração limitada pelo teto de plausibilidade do lab (220 min); esforço real de 12 entregáveis provavelmente maior",
    "Acréscimos: 4 comandos de troubleshooting, leitura dos logs na solução, expectedIdeas do mentor, q6/q7, passos 5, 6 e 11 do lab"
  ]
}
```
