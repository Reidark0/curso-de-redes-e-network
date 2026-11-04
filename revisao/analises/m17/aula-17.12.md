# Aula 17.12 — Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta
Tipo: capstone (aula especial, 6.10) · Duração declarada: 480-720 min (estimatedStudyTimeMinutes 720; lab.estimatedTimeMinutes 720) · Palavras visíveis / invisíveis (antes): 8337 / 3874

## 1. Duração
T pela fórmula = 196,4 min (teoria 24,5, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 30, desafio 20, lab 103,9). O `lab.estimatedTimeMinutes` = 720 foi considerado implausível pela ferramenta (16 passos × 5 min + leitura = 103,9 min). Ele era igual à duração da aula inteira, então não podia ser só do lab.

Veredito: **ORGANIZADA** (o veredito automático é INFLADA). A fórmula de 5 min por passo não mede um capstone que produz 12 entregáveis documentais. Com a estimativa por entregável da 11.6 (lab = 480 min, ver `lab_override.json`) aplicada ao original, T ≈ 572 min. O ponto médio declarado (M = 600) fica em 1,05×T. O que estava errado era o `lab.estimatedTimeMinutes` (720). A divisão entre teoria e prática é adequada para um capstone: cerca de 5% de leitura e o resto em prática e entrega.

## 2. Encheção de linguiça
Nível: **MÉDIA (~27%)**. Evidências:
- lab.steps 1–12: `analysisTask` ritual repetido 12× (“Produza o artefato indicado na instrução do passo e registre a evidência objetiva…”, frase de 56 aulas) e `explanation` ritual 12× (“Este passo ajuda a transformar o conceito da aula…”).
- lab.troubleshooting: os 5 itens repetem o mesmo `probableCause`/`howToConfirm`/`fix` (“Premissa incorreta, coleta incompleta…”, de 41 aulas). Só o `symptom` tinha conteúdo.
- lab.validation: 22 itens. 12 são “Entregável 0X concluído / verificar dossiê / D0X…” e repetem a lista D01–D12, que aparece mais 4 vezes (evidenceToCollect, challenge.expectedDeliverables, capstoneProject, capstoneFinalRequirements). Outros 5 são “Critério final…” com o mesmo `ifFails`.
- challenge.expectedDeliverables: 29 itens, com a lista D01–D12, mais 5 itens de competência e 8 de capstoneEvaluation que repetem os mesmos entregáveis com outras palavras.
- lab.questions: “Qual erro comum este laboratório ajuda a evitar?”, “Como este resultado seria usado em um ambiente corporativo real?” (frases de 43 aulas).
- lab.safetyNotes: os 4 avisos-padrão (frases de 37 a 48 aulas).
- history (“Historicamente, redes corporativas começaram relativamente simples…”) e evolution repetem a motivação.
- summary: 2 parágrafos que repetem a motivação. A tabela de competências e os critérios foram colados depois do `</section>`.
- nextTheme repete a lista de entregáveis.
- security: “Criar alerta ou consulta específica para sinais relacionados à aula 17.12”; o vulnerability[0] repete o título da aula 2×; um commonErrors é boilerplate de módulo.
- troubleshooting.commands: são pseudo-comandos (“preencher checklist de camada…”) e não comandos.
- linksToOtherCourses: 3 de 8 entradas são boilerplate duplicado (frases de 30 a 47 aulas).
- Campos invisíveis com conteúdo valioso escondido: o pacote do incidente sintético (timeline e logs), a taxonomia de erros, os módulos de revisão por competência, a solução-modelo (`commentedSolution.content`), a `cleanupPolicy` e as 3 perguntas de mentor (strings não exibidas).

Conferência com a 11.7: os cortes brutos do `comparar` são 19%. Esse número fica abaixo da estimativa porque a remoção de repetições literais (a lista D01–D12 ×5, os rituais ×12) não aparece no diff por frase. Não houve corte de conhecimento (ver o inventário).

## 3. Conteúdo útil
**PARCIAL.** De valor: os 12 entregáveis D01–D12 bem definidos, a matriz de competências C01–C08 com mínimo e domínio, a rubrica de 100 pontos, o cenário corporativo coerente, a ordem de diagnóstico (simpleExample, internals) e o pacote de incidente sintético com logs concretos de DNS, flow, WAF e VPN.
Problemas:
- O pacote de incidente e a taxonomia de erros estavam invisíveis.
- Havia 4 rubricas e 3 regras de aprovação conflitantes: mínimo de 70% para “competência crítica” contra mínimos de 70/75/80 por competência, e a faixa “aprovado com ressalvas” começando em 75% contra o mínimo de 80.
- Nenhum passo do lab produzia o D09 (testes) e nenhum tratava D05/D06 explicitamente.
- Os exercícios 1, 2, 3 e 5 duplicavam artefatos do próprio lab.
- O passo 9 mandava “criar uma linha do tempo fictícia”, embora já existisse um pacote pronto, só que invisível.

Lacunas: o aluno não via como ler os logs do incidente nem o que conta como teste de D09. Erros técnicos: nenhum relevante. Há uma possível inconsistência no dataset da VPN (ver Revisão humana).

## 4. Aproveitamento
**MÉDIO (~75%)**, medido contra o T da fórmula do original (196,4 min). Não ensinavam: a leitura do texto ritual do lab (~11 min), as perguntas de mentor contadas mas não exibidas (6 min), cerca de 30% da teoria (~7 min) e 4 dos 5 exercícios, que repetiam artefatos do lab (~24 min). Contra a duração declarada (600 min), o aproveitamento seria maior, porque o grosso do tempo vai para a produção real do dossiê.

## 5. Pode ser mais curta?
**NÃO** — redução prevista: 0%. É um capstone (6.10): o escopo dos 12 entregáveis não se encurta. A leitura é só ~5% do tempo. O ganho está em clareza, não em tempo.

## 6. Explicação mais direta
**SIM:**
- concept: as 4 propriedades viraram tabela, e a tabela entregável → passo do lab e as regras de avaliação passaram a vir cedo.
- architecture: a prosa de 3 parágrafos virou uma tabela camada → componentes.
- simpleExample: a ordem de diagnóstico virou lista numerada.
- Lab: cada passo diz qual D0X produz.
- Rubrica e regra de aprovação: consolidadas num lugar só (Conceito e Desafio).

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Problema real em 2 parágrafos; o callout ficou com 1 frase. |
| history | REMOVER | História genérica (“começaram relativamente simples”); a mudança cultural está coberta pelas 4 propriedades e pela comparação entre resposta imatura e profissional, no concept. |
| problem | MANTER + MOVER (de capstoneProject.syntheticIncidentPackage) | Cenário mantido; recebeu a timeline e os logs sintéticos, que antes eram invisíveis. |
| evolution | FUNDIR:concept | Resposta imatura × profissional (arquitetura → defesa → diagnóstico → operação) virou um parágrafo do concept. |
| concept | MANTER + ENXUGAR + MOVER | 4 propriedades em tabela; a lista de componentes foi substituída pela tabela D01–D12 → passos; recebeu a matriz C01–C08 (com módulos de revisão), as faixas de decisão e a regra de bloqueio. |
| internals | MANTER | Cadeia de dependências e 4 planos (agora em lista); ordem de verificação do 503 e do tráfego suspeito. |
| architecture | ENXUGAR | A prosa virou uma tabela de 10 camadas, sem perder componentes. |
| analogy | ENXUGAR | 1 parágrafo; o limite da analogia ficou em 1 frase. |
| simpleExample | MANTER | Fluxo do usuário remoto; a ordem de diagnóstico virou lista numerada. |
| enterpriseExample | ENXUGAR | Regras de zona mantidas; o 3º parágrafo (repetia os campos da matriz) virou 1 frase que liga ao D03. |
| cloudExample | ENXUGAR | A frase do pipeline foi para devsecopsExample; custos mantidos. |
| devsecopsExample | MANTER | Guardrails em lista (+ “rota pública em subnet de dados”, vinda do cloudExample) e plano de automação. |
| securityExample | ENXUGAR | A lista de hipóteses (duplicada em problem) saiu; ficaram os objetivos defensivos, a resposta proporcional e o “Critério de maturidade”, que foi trazido para dentro do `<section>`. |
| diagram | MANTER | SVG intacto; h2 sem número e intro em 2 frases. |
| labIntro | REMOVER | Invisível; o conteúdo (3 públicos) está em lab.scenario. |
| exercisesIntro | REMOVER | Invisível; “não basta dizer usaria firewall” já está coberto pelo Critério de maturidade. |
| challengeIntro | MOVER:challenge.scenario + mentorQuestions | As perguntas da banca foram para o cenário do desafio; “como provar que não houve exfiltração” virou pergunta de mentor. |
| solutionIntro | MOVER:commentedSolution.reasoning | “Não é a única arquitetura possível… o que ficou como risco aceito”. |
| summary | ENXUGAR + MOVER | 5 bullets; a tabela de competências e os critérios foram para o concept e para challenge.successCriteria. |
| nextTheme | ENXUGAR | 1 frase coerente com o fim do curso (não há aula seguinte). |
| lab | ENXUGAR + MOVER | Rituais cortados; os passos agora apontam para os D0X. O passo 5 virou DNS/VPN (D05, D06). Entrou o passo 10, de testes (D09). O passo 11 usa o pacote do incidente. Os passos 4, 9, 13 e 15 absorveram os exercícios duplicados. Taxonomia de erros no passo 16; limpeza e sanitização no passo 14 e em safetyNotes; validation consolidada a partir de capstoneProject.validationChecklist; `estimatedTimeMinutes` = 480 (override). |
| lab (ocultos: expectedOutcome, evaluationMode, competencyBased, assessmentReference, requiredDeliverables, cleanupPolicy) | MOVER:lab.steps/safetyNotes/security; REMOVER | cleanupPolicy foi para safetyNotes, para o passo 14 e para security.vulnerabilities; requiredDeliverables e expectedOutcome estavam duplicados; o resto é metadado. |
| quiz | MANTER + 2 novas | 6 mantidas sem reordenar as opções; q6 (leitura do log DNS) e q7 (regra de aprovação por competência). |
| flashcards | MANTER (1 trocado) | “Capstone profissional” (duplicava o glossário) virou “Mitigação proporcional”. |
| mentorQuestions | MOVER (string→objeto) + 1 nova | As 3 strings invisíveis viraram objetos com hints e expectedIdeas; a 4ª veio do challengeIntro. |
| exercises | ENXUGAR + MOVER | 4 exercícios que duplicavam o lab foram para os passos 4, 9, 13 e 15. Entraram 4 exercícios de leitura de evidência do pacote (DNS, VPN, egress, WAF). Guardrails mantido. |
| challenge | ENXUGAR + MOVER | description foi para scenario; deliverables (lista antiga) foi absorvido pelo D01–D12 (diagrama SVG/ASCII em D01); expectedDeliverables ficou com 14 itens sem duplicação; tasks, constraints e successCriteria foram consolidados; a gradingRubric de 8 critérios teve as descrições enriquecidas com o que só existia nas rubricas ocultas. |
| commentedSolution | MOVER + ENXUGAR | content (solução-modelo) e solutionIntro foram para reasoning e steps; o reasoning meta (“Nesta revisão P1-M17…”) saiu; entrou um commonWrongAnswer (any-any); finalAnswer segue a regra consolidada. |
| glossary | MANTER | Os 6 termos são usados na aula. |
| security | ENXUGAR + MOVER | Boilerplate removido; vulnerabilities 3–4 vieram da cleanupPolicy (vazamento no portfólio, recursos cloud esquecidos); detectionIdeas ficaram específicos do incidente. |
| troubleshooting | ENXUGAR | Os sintomas do aluno foram para lab.troubleshooting; os sintomas agora são os do incidente; os pseudo-comandos viraram 4 comandos reais com interpretação; decisionTree mantida. |
| references | MANTER | Acrescentada a `organization` (NIST, AWS, Microsoft, OWASP). |
| linksToOtherCourses | ENXUGAR | 5 de 8 mantidos; 3 eram duplicatas boilerplate de módulos já citados. |
| networkContext | — | Não existe nesta aula. |
| diagram (topo) | REMOVER | Metadado de acessibilidade; os ids do SVG já existem no HTML. |
| capstoneProject | MOVER:problem/challenge/lab.validation; REMOVER | scenario foi para challenge.scenario; syntheticIncidentPackage para problem; validationChecklist para lab.validation; requiredDeliverables já estavam no challenge; rubric 5×20 e passingCriteria consolidados (Revisão humana). |
| assessmentBlueprint | MOVER:concept/lab; REMOVER | competencies (com módulos) e feedbackBands foram para o concept; remediationTracks para o passo 18 e para a coluna “Módulos de revisão”; evidenceRequired para lab.evidenceToCollect; a gradingRubric C01–C08 (10 pts cada) foi consolidada na matriz de competências. |
| adaptiveReview | MOVER:lab passo 16/18 + commentedSolution; REMOVER | errorTaxonomy foi para o passo 16; revisionLoop para o passo 18 e para o step 8 da solução. |
| capstoneEvaluation | MOVER:challenge; REMOVER | approvalCriteria foi para successCriteria e para o concept; requiredDeliverables (limpeza, backlog) para o expectedDeliverables “Pacote de portfólio”; os critérios exclusivos da rubrica foram para as descrições da gradingRubric. |
| capstoneFinalRequirements | REMOVER | Duplicado (D01–D12, mínimo 80); completionEvidence está em finalAnswer e em evidenceToCollect. |
| accessPolicy (topo) | REMOVER | Duplicado de progressRules.accessPolicy, que foi mantido intacto. |
| progressRules | MANTER (intacto) | Regra especial de capstone; finalScoreAtLeast 80 é coerente com a regra consolidada. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | 4 propriedades: conectável, defensável, diagnosticável, governável | MANTIDO | concept (tabela), summary, quiz 0 |
| 2 | Resposta imatura × profissional (arquitetura → defesa → diagnóstico → operação) | MANTIDO | concept |
| 3 | Cenário da empresa fictícia e problemas (subnets mal documentadas, exceções, DNS híbrido, egress caro) | MANTIDO | problem |
| 4 | 3 sintomas do incidente e hipóteses possíveis (health check, DNS, rota assimétrica, política, processo ruidoso, C2, exfiltração) | MANTIDO | problem, securityExample |
| 5 | Timeline sintética (08:40–11:00) | MANTIDO (movido) | problem |
| 6 | Logs sintéticos DNS/flow/WAF/VPN com valores | MANTIDO (movido) | problem; exercícios 1–4; quiz q6; troubleshooting |
| 7 | 12 entregáveis D01–D12 com conteúdo exigido | MANTIDO | challenge.expectedDeliverables; concept (mapa para os passos) |
| 8 | Cadeia de dependências usuário → serviço | MANTIDO | internals |
| 9 | 4 planos (dados, controle, observabilidade, governança) | MANTIDO | internals |
| 10 | Checklist de verificação do 503 e do tráfego suspeito | MANTIDO | internals; quiz 2 |
| 11 | Arquitetura em camadas (borda, app, dados, egress, híbrida, campus, remoto, segurança, operação, evidência) | MANTIDO | architecture (tabela) |
| 12 | Ordem de diagnóstico do usuário remoto | MANTIDO | simpleExample |
| 13 | Regras de zona (convidado só internet, bastion+MFA, usuário não acessa banco) | MANTIDO | enterpriseExample |
| 14 | Landing Zone, hub-spoke, Private Endpoint, flow logs | MANTIDO | cloudExample |
| 15 | Custos (NAT, egress, logs, firewall, transit, entre regiões, WAF, retenção) | MANTIDO | cloudExample, lab passo 6, quiz 5 |
| 16 | Guardrails de pipeline | MANTIDO | devsecopsExample, exercício guardrails |
| 17 | Plano de automação e rollback | MANTIDO | devsecopsExample |
| 18 | Critério de maturidade em respostas de segurança | MANTIDO | securityExample |
| 19 | Resposta proporcional e sem exploração ofensiva | MANTIDO | securityExample, challenge.constraints, flashcard |
| 20 | Matriz C01–C08 (mínimo, domínio, evidência) | MANTIDO (movido) | concept |
| 21 | Módulos de revisão por competência (remediationTracks) | MANTIDO (movido) | concept (coluna), passo 18 |
| 22 | Faixas de feedback e ações | MANTIDO (consolidado) | concept; faixa 75–89 ajustada para 80–89 (Revisão humana) |
| 23 | Taxonomia de erros E-CONCEITO…E-COMUNICACAO com significado | MANTIDO (movido) | lab passo 16 |
| 24 | Ciclo de revisão (confiança antes, classificar, vincular, mini lab, reteste 24–48 h) | MANTIDO | passos 15, 16 e 18; commentedSolution step 8 |
| 25 | Rubrica de 100 pontos em 8 critérios | MANTIDO | challenge.gradingRubric (enriquecida) |
| 26 | Rubrica 5×20 (capstoneProject.rubric) | REMOVIDO | Rubrica conflitante e mais grosseira, consolidada na de 8 critérios (Revisão humana) |
| 27 | Rubrica C01–C08 com 10 pts cada + 2 critérios (assessmentBlueprint) | REMOVIDO | Consolidada na matriz de competências com mínimos; evidência e rastreabilidade em successCriteria (Revisão humana) |
| 28 | Rubrica de capstoneEvaluation (DevSecOps, Blue Team, matriz de competências) | REMOVIDO (critérios absorvidos) | As descrições da gradingRubric incluem IaC/guardrails, falso positivo/contenção e a matriz |
| 29 | Aprovação: ≥80 pontos, 12 entregáveis, competências no mínimo, defesa com alternativas rejeitadas, plano priorizado | MANTIDO (consolidado) | concept (callout), successCriteria, finalAnswer, quiz q7 |
| 30 | validationChecklist (any-any, DNS separado, VPN, cloud, observabilidade, RCA, rubrica) | MANTIDO (movido) | lab.validation |
| 31 | cleanupPolicy (autorização, tag, registro, destruir recursos, sanitizar) | MANTIDO (movido) | lab.safetyNotes, passo 14, security.vulnerabilities |
| 32 | Solução-modelo (zonas, CIDR, publicação, endpoint privado, remoto, egress, investigação, mitigação, RCA, portfólio) | MANTIDO (movido) | commentedSolution.steps |
| 33 | Erros comuns na solução (75%/nota, releitura, “arquitetura bonita”) | MANTIDO | commentedSolution.commonWrongAnswers (o “75%” virou “85 pontos” por coerência) |
| 34 | Matriz de fluxos com ≥12 fluxos essenciais | MANTIDO (movido do exercício) | lab passo 4 |
| 35 | Fontes por sintoma (WAF/LB/Ingress; VPN/firewall/DNS; flow/proxy/EDR/audit/billing) | MANTIDO (movido do exercício) | lab passo 9, mentor 2 |
| 36 | RCA em versão técnica e executiva | MANTIDO (movido do exercício) | lab passo 13 |
| 37 | Monitoramento, hardening e boas/más práticas | MANTIDO | security |
| 38 | Árvore de decisão (todos × uma origem, IP × nome, handshake, mudança recente) | MANTIDO | troubleshooting.decisionTree |
| 39 | Sintomas do aluno (acerta isolado e falha integrado; diagrama sem validação etc.) | MANTIDO (movido) | lab.troubleshooting |
| 40 | Pseudo-comandos de troubleshooting (checklist, organizar portfólio) | REMOVIDO | Não eram comandos; a intenção está nos passos 14, 15 e 18 e no lab.troubleshooting |
| 41 | História das redes corporativas (redes planas → Zero Trust) | REMOVIDO | Não explica o mecanismo; a ideia está coberta pelo concept |
| 42 | “Usar simulados para diagnosticar lacunas” (security) | REMOVIDO | Fora do escopo desta aula (tema da 17.11) |
| 43 | Melhorias do lab (portfólio, IaC/policy as code, war room periódica, FinOps, retenção) | MANTIDO (sem duplicatas) | lab.improvements |
| 44 | Referências NIST/AWS/Azure/OWASP e cursos internos | MANTIDO | references |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Projetar arquitetura híbrida e cloud com controles defensivos | architecture; lab passos 3–8; D01, D07 |
| Construir matriz de fluxos, plano CIDR, zonas, rotas, DNS e políticas de acesso | lab passos 3–5; D02–D05; enterpriseExample; quiz 1 |
| Definir telemetria mínima para troubleshooting, SOC, DFIR, FinOps e auditoria | lab passos 8–9 (D08); security.monitoring; mentor 2 |
| Diagnosticar incidente simulado com hipótese-evidência | problem (pacote); lab passos 11–12 (D10); exercícios 1–4; troubleshooting; quiz q6 |
| Produzir RCA técnico e executivo | lab passo 13 (D11); quiz 4; commentedSolution |
| Entregar dossiê de portfólio sanitizado | lab passo 14; security.vulnerabilities (vazamento); challenge |
| Entregar os 12 artefatos obrigatórios | concept (mapa D → passo); challenge.expectedDeliverables; lab.validation |
| Defender a arquitetura com evidências, trade-offs, risco, custo, rollback e critérios de aprovação | challenge (banca), mentor 1/3/4, concept (avaliação), passo 17, quiz q7 |

## 10. O que mudou na nova versão
- Removidas as seções history e evolution (fundida no concept) e os 4 *Intro invisíveis (o conteúdo útil foi movido).
- O pacote do incidente sintético (timeline e logs DNS/flow/WAF/VPN), antes invisível, entrou na seção Problema e passou a ser a base dos passos 11–12, de 4 exercícios novos de leitura de evidência, da q6, dos detectionIdeas e dos comandos de troubleshooting.
- Concept: tabela das 4 propriedades, tabela D01–D12 → passos do lab, matriz C01–C08 com módulos de revisão, faixas de decisão e regra de bloqueio por competência.
- Rubricas e regras de aprovação consolidadas numa só versão exibida (challenge.gradingRubric de 8 critérios + successCriteria + concept), sem baixar a exigência.
- Lab: 16 → 18 passos. O antigo passo 5 foi dividido (5 = DNS e VPN, D05/D06; 6 = cloud/híbrido, D07) e entrou o passo 10 (testes, D09, com comandos reais). Cada passo diz qual D0X produz. Rituais cortados; validation consolidada; troubleshooting específico; cleanupPolicy e taxonomia de erros tornadas visíveis. `estimatedTimeMinutes` 720 → 480, com `lab_override.json` estimado por entregável.
- Mentor: as 3 strings invisíveis viraram objetos com pistas e ideias esperadas, mais 1 pergunta nova (exfiltração).
- Quiz: 6 → 8 (q6 DNS split-horizon, q7 decisão por competência); as 6 originais foram mantidas sem reordenar as opções.
- Security e troubleshooting reescritos sem boilerplate; 2 vulnerabilidades novas vindas da cleanupPolicy; 4 comandos reais com finalidade, esperado e interpretação.
- `duration` 480-720 → 490-695 min; `estimatedStudyTimeMinutes` 720 → 695. `progressRules` intacto.

## 11. Depois
Palavras visíveis: 8337 → 9075 (+8,9%; inclui 3874 palavras invisíveis movidas ou descartadas; invisíveis 3874 → 0; cortes brutos 1579, acréscimos brutos 2317) · Duração: 480-720 min → 490-695 min (T nova = 578,6 min, com o lab em 480 min pelo override) · Quiz corrigido: sim (8 questões; 6 normalizadas com id preservado, 2 novas)

`validar`: ok, sem erros e sem avisos.

## 12. Revisão humana
1. **Consolidação de rubricas e da regra de aprovação.** O original tinha 4 rubricas: capstoneProject.rubric 5×20; challenge/capstoneProject.gradingRubric com 8 critérios; assessmentBlueprint C01–C08 + 2 critérios ×10; capstoneEvaluation com 8 critérios diferentes. Ficou a de 8 critérios exibida no Desafio, com as descrições enriquecidas pelos critérios exclusivos das outras (IaC/guardrails, falso positivo/contenção proporcional, matriz de competências, alternativas rejeitadas). Os pontos não mudaram. Confirmar.
2. **Mínimo por competência.** Havia conflito entre “nenhuma competência crítica abaixo de 70%” (capstoneEvaluation, capstoneFinalRequirements), os mínimos 70/75/80 por competência (assessmentBlueprint) e “sem plano de reteste” (capstoneProject.passingCriteria). Adotei o critério mais exigente: cada competência no seu próprio mínimo, e uma competência abaixo dele impede a conclusão até ser refeita. O original não definia “competência crítica”; tratei como qualquer competência abaixo do mínimo.
3. **Faixas de feedback.** “75–89% aprovado com ressalvas” contradizia o mínimo de 80. Ajustei para 80–89 (com ressalvas), 60–79 (base parcial) e 0–59 (insuficiente). O `masteryScorePercent` 92 do blueprint ficou só como domínio de C08; a faixa de domínio forte começa em 90.
4. **Dataset da VPN.** O log traz `assigned_routes=10.0.0.0/8` e, em seguida, `route_missing=10.40.0.0/16`, embora 10.40.0.0/16 esteja contido em 10.0.0.0/8. Mantive o log como estava e o tratei como “divergência a investigar” no ex17.12.vpn. Confirmar se a inconsistência é intencional.
5. **Conteúdo novo de interpretação.** As respostas esperadas dos exercícios DNS/VPN/egress/WAF, a q6, os detectionIdeas e os 4 comandos de troubleshooting interpretam o pacote sintético sem afirmar a causa raiz. Exemplos: o 503 com resposta do WAF indica que DNS público e TLS até a borda funcionaram; 10.40.3.21 é o mesmo IP da resposta privada de api.interno.corp. Vale uma revisão técnica.
6. **Novos passos de lab.** O passo 10 (testes, D09) foi criado porque nenhum passo produzia o D09, que já era obrigatório. O antigo passo 5 foi dividido para cobrir D05/D06. O passo 11 agora parte do pacote pronto em vez de criar uma timeline do zero, e o aluno ainda pode enriquecê-lo. O escopo não foi reduzido.
7. **Duração.** `lab_override.json` = 480 min, estimado por entregável. A duração nova (490-695) fica próxima da original (480-720). Validar a estimativa.
8. **Ids e progresso salvo.** Os exercícios originais não tinham id, exceto `ex17.12.competencias`, que foi absorvido pelo passo 15. Os exercícios novos ganharam ids `ex17.12.*`. O flashcard de índice 5 mudou de conteúdo (flashcards sem id). Se o app guardar progresso por índice nesses blocos, ele muda.
9. `commonWrongAnswers`: “Passei porque acertei 75%” virou “85 pontos”, porque com mínimo de 80 o exemplo de 75% não ilustrava o erro (nota alta escondendo competência fraca).
10. `linksToOtherCourses`: removidas 3 entradas com motivo boilerplate que repetiam módulos já citados; os cursos e aulas citados não puderam ser verificados.

```json
{
  "id": "17.12", "modulo": "m17", "tipo": "capstone", "status": "CONCLUIDA",
  "titulo": "Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta",
  "duracao_declarada": "480-720 min", "T_original_min": 196.4, "duracao_nova": "490-695 min", "veredito_duracao": "ORGANIZADA",
  "T_nova_min": 578.6, "duracao_nova_estimated_max": 695,
  "linguica_nivel": "MÉDIA", "linguica_pct": 27, "conteudo_util": "PARCIAL", "aproveitamento": "MÉDIO",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 0, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 8337, "palavras_visiveis_depois": 9075,
  "palavras_invisiveis_antes": 3874, "palavras_invisiveis_depois": 0,
  "quiz_questoes": 8, "objetivos_cobertos": true,
  "secoes": {
    "motivation": "ENXUGAR",
    "history": "REMOVER",
    "problem": "MANTER",
    "evolution": "FUNDIR:concept",
    "concept": "MANTER",
    "internals": "MANTER",
    "architecture": "ENXUGAR",
    "analogy": "ENXUGAR",
    "simpleExample": "MANTER",
    "enterpriseExample": "ENXUGAR",
    "cloudExample": "ENXUGAR",
    "devsecopsExample": "MANTER",
    "securityExample": "ENXUGAR",
    "diagram": "MANTER",
    "labIntro": "REMOVER",
    "exercisesIntro": "REMOVER",
    "challengeIntro": "MOVER:challenge.scenario",
    "solutionIntro": "MOVER:commentedSolution.reasoning",
    "summary": "ENXUGAR",
    "nextTheme": "ENXUGAR",
    "lab": "ENXUGAR",
    "lab.ocultos": "MOVER:lab.safetyNotes",
    "quiz": "MANTER",
    "flashcards": "MANTER",
    "mentorQuestions": "MOVER:mentorQuestions(objetos)",
    "exercises": "ENXUGAR",
    "challenge": "ENXUGAR",
    "commentedSolution": "ENXUGAR",
    "glossary": "MANTER",
    "security": "ENXUGAR",
    "troubleshooting": "ENXUGAR",
    "references": "MANTER",
    "linksToOtherCourses": "ENXUGAR",
    "diagram(topo)": "REMOVER",
    "capstoneProject": "MOVER:content.problem",
    "assessmentBlueprint": "MOVER:content.concept",
    "adaptiveReview": "MOVER:lab.steps",
    "capstoneEvaluation": "MOVER:challenge",
    "capstoneFinalRequirements": "REMOVER",
    "accessPolicy": "REMOVER",
    "progressRules": "MANTER"
  },
  "quiz_corrigido": true,
  "revisao_humana": [
    "Consolidação das 4 rubricas na gradingRubric de 8 critérios do Desafio (pontos mantidos, descrições enriquecidas)",
    "Regra de aprovação: adotado o mínimo próprio de cada competência (70/75/80) em vez de 'nenhuma crítica abaixo de 70%'; competência abaixo do mínimo impede a conclusão",
    "Faixas de feedback ajustadas: 'aprovado com ressalvas' de 75-89 para 80-89",
    "Dataset VPN: assigned_routes=10.0.0.0/8 com route_missing=10.40.0.0/16, possível inconsistência mantida como divergência a investigar",
    "Interpretações novas dos logs sintéticos (exercícios 1-4, q6, detectionIdeas, comandos de troubleshooting) merecem revisão técnica",
    "Passos novos no lab: 10 (testes D09) e divisão do antigo passo 5 (D05/D06); o passo 11 usa o pacote pronto",
    "lab_override 480 min por entregável; duração 490-695 min",
    "Exercícios substituídos com novos ids e flashcard de índice 5 trocado: possível impacto em progresso salvo por índice",
    "commonWrongAnswers: '75%' virou '85 pontos' por coerência com o mínimo de 80",
    "linksToOtherCourses: 3 entradas boilerplate duplicadas removidas"
  ]
}
```
