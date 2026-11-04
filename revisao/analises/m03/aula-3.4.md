# Aula 3.4 — Domínios de colisão, broadcast e hub vs switch
Tipo: fundamental · Duração declarada: 85-120 min · Palavras visíveis / invisíveis (antes): 3857 / 544

## 1. Duração
T pela fórmula = 113,9 min (teoria 16,6, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 35,3)
Veredito: ORGANIZADA — M = 102,5 min = 0,90×T. A divisão (17% de leitura, o resto prática) combina com uma aula fundamental com lab obrigatório (`lab-3.4` está em `requiredLabs`). O único problema está dentro do lab: `lab.estimatedTimeMinutes` = 120 para 6 passos curtos, o que não é plausível (a fórmula usa 35,3). A nova versão corrige para 30 (5 passos).

## 2. Encheção de linguiça
Nível: MÉDIA (~18%). Evidências:
- `evolution` repete `history` em tabela ("Hub — Repetia sinais para todas as portas"), e as duas repetem `concept`/`internals`. A ideia "hub repete, switch aprende, VLAN limita broadcast" aparece em history, problem, evolution, concept, internals, securityExample, summary e no glossário.
- `problem`: a lista de definições ("Domínio de colisão: conjunto de dispositivos que podem colidir…") duplica `concept`.
- `motivation`: 1º parágrafo de abertura genérica ("a causa pode estar em muitos lugares… conceitos que parecem antigos").
- `architecture`: o parágrafo de cloud ("Em cloud, conceitos parecidos aparecem em subnets…") duplica `cloudExample`.
- `devsecopsExample`: genérico, sem relação com domínios de colisão/broadcast ("runner… vira ponte de risco", "IaC deve declarar redes").
- `securityExample` × `security`: a mesma rede plana / broadcast storm nos dois lugares.
- `simpleExample`, 2º parágrafo, repete `enterpriseExample` ("redes de visitantes, IoT e trabalho costumam ser separadas").
- Lab: `analysisTask` ritual em 2 passos ("Produza o artefato indicado na instrução do passo…", frase em 56 aulas); `lab.challenge`/`lab.solution` repetem o `challenge` da aula (usuários, visitantes, impressoras, câmeras); passo 6 (propor segmentação) é o mesmo entregável do desafio; as 4 `questions` repetem mentor 1, quiz 5, ex2 e o desafio; `prerequisites` repete `safetyNotes`.
- Sobreposição de prática: ex3.4.4 (switch × hub para unicast) = mentor 1; ex3.4.2 (riscos de usuários/câmeras/visitantes na mesma VLAN) = mentor 3 = desafio; ex3.4.3 (evidências de storm) = mentor 2 = tarefa 4 do desafio = troubleshooting. q3.4.6 repete q3.4.2; fc3.4.3 repete q3.4.1; fc3.4.5 repete q3.4.5.
- Campos invisíveis: protocolFields, packetFlow, deepDive, commonMistakes (399 palavras) e os quatro `*Intro`.

## 3. Conteúdo útil
PARCIAL. O núcleo é correto: definições dos dois domínios, broadcast para todas as portas da VLAN exceto a de entrada, roteador não repassa broadcast L2, rede plana e movimento lateral, troubleshooting com `show mac address-table`/`show spanning-tree`/`show storm-control` e um lab executável. Lacunas: (1) o objetivo 3 pede entender **por que** o switch reduz colisões, mas a aula só afirma que "em full-duplex a colisão praticamente deixa de ser um problema", sem o mecanismo (link ponto a ponto, TX/RX simultâneos, CSMA/CD desativado); (2) o resultado esperado 1 ("dado um desenho com hub, identifica…") não tem nenhum exemplo nem exercício de contagem de domínios; (3) o resultado esperado 3 ("dado um broadcast ARP, identifica quem recebe dentro da VLAN") não tem exercício; (4) o troubleshooting não mostra onde ver contadores de broadcast, embora o exercício 3 os peça; (5) o fluxo do ARP e os campos do frame estavam só em campos invisíveis. Erros técnicos: nenhum relevante. Distratores do quiz triviais ("Erro de Unicode", "Senha errada no sistema", "Desabilitar logs").

## 4. Aproveitamento
BOM (~81%) — contra o T original de 113,9 min, cerca de 21 min vão para repetição: ~3 min de teoria redundante, ~12 min de exercícios que repetem mentor e desafio, ~5 min do passo 6 do lab que repete o desafio e ~1 min de texto ritual. Contra a duração declarada (M = 102,5) a proporção é parecida.

## 5. Pode ser mais curta?
NÃO — redução prevista e obtida: ~10% (113,9 → 102,6 min). A maior parte do tempo está em exercícios, desafio e lab obrigatório; a teoria (17%) é curta, e parte do espaço cortado foi ocupada pelo conteúdo movido dos campos invisíveis.

## 6. Explicação mais direta
SIM — `concept`: uma tabela "Equipamento × separa colisão? × separa broadcast?" substitui a prosa comparativa espalhada por problem/evolution/internals. `internals`: os 5 cenários viram 3 itens mais um fluxo do ARP Request passo a passo (vindo de `packetFlow`), em vez de repetir broadcast e roteador em duas listas. `history` + `evolution`: um parágrafo e uma tabela no lugar de três parágrafos e outra tabela. `motivation`: o caso concreto já na primeira frase.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Abertura genérica cortada; o caso da empresa e o callout "Problema real" ficam. |
| history | ENXUGAR | Explica por que o switch existe (CSMA/CD, hub repetidor); cortado para 1 parágrafo e recebe a tabela de evolution. |
| problem | ENXUGAR | Fica o parágrafo dos tipos de tráfego; a lista de definições duplicava concept. |
| evolution | FUNDIR:history | A tabela de fases vai para history, sem a frase de abertura. |
| concept | MANTER | Definições + tabela comparativa nova + callout "Erros comuns" (de commonMistakes e deepDive). |
| internals | MANTER | Núcleo; reorganizado, com o mecanismo do full-duplex, o fluxo ARP (packetFlow) e a tabela de campos (protocolFields). |
| architecture | ENXUGAR | Parágrafo de cloud removido (duplica cloudExample); recebe o impacto operacional/financeiro do deepDive. |
| analogy | ENXUGAR | Analogia boa; limite em 1 frase; acrescenta que outro andar = outra VLAN. |
| simpleExample | MANTER | Exemplo ARP doméstico + "Contando domínios" (novo, objetivo 1); 2º parágrafo removido (duplicava enterpriseExample). |
| enterpriseExample | MANTER | Base do desafio (VLANs por função); só polido. |
| cloudExample | ENXUGAR | 1 parágrafo: cloud abstrai L2, VPC plana como erro equivalente. |
| devsecopsExample | REMOVER | Genérico, fora do tema da aula. |
| securityExample | FUNDIR:security | Os 4 riscos da tabela viram as 4 `security.vulnerabilities`. |
| diagram | MANTER | Correto e legível; só o h2 perdeu o número. |
| labIntro | REMOVER | Invisível. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | MANTER | 5 bullets; 1ª linha = deepDive.mentalModel. |
| nextTheme | MANTER | 2 frases, coerente com 3.5 (ARP). |
| protocolFields | MOVER:internals | Tabela de campos (DST MAC broadcast, SRC MAC, VLAN ID 12 bits, FCS). |
| packetFlow | MOVER:internals | Fluxo "Um ARP Request atravessando a LAN", com as falhas possíveis. |
| deepDive | MOVER:summary/concept/architecture | mentalModel no summary; limitations e whenNotToUse em "Erros comuns"; operationalImpact e financialImpact em architecture; securityImpact duplicava security (removido). |
| commonMistakes | MOVER:concept | Callout "Erros comuns". |
| networkContext | MANTER | Metadado. |
| security | ENXUGAR | Funde securityExample (4 vulnerabilidades); goodPractices sem o item que repetia hardening; badPractices de 5 para 3 (os outros 2 viraram vulnerabilidade e boa prática); monitoring de 6 para 4. |
| troubleshooting | MANTER | Comando Cisco com `show interfaces counters` (contadores de broadcast por porta) e purpose/expected/interpretation ajustados. |
| lab | ENXUGAR | Corta ritual (analysisTask genérico, lab.challenge/solution, prerequisites repetido, improvements e questions redundantes); passo 6 fundido com o desafio; passo 4 passa a contar também os domínios de colisão; estimatedTimeMinutes 120 → 30. |
| quiz | MANTER | 6 questões; q3.4.6 (repetia q3.4.2) trocada pela q3.4.7 (contagem); distratores de q3.4.3 e q3.4.4 tornados plausíveis; gabarito embaralhado. |
| flashcards | MANTER | 6; fc3.4.3 e fc3.4.5 (copiavam o quiz) trocados por fc3.4.7 (full-duplex) e fc3.4.8 (portas que recebem broadcast). |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, sem mudança. |
| exercises | ENXUGAR | 4 → 3: ex3.4.2, ex3.4.3 e ex3.4.4 repetiam mentor/desafio; entram ex3.4.5 (quem recebe o ARP por VLAN) e ex3.4.6 (contagem com VLANs). |
| challenge | MANTER | Bem definido, com rubrica de 100 pontos. |
| commentedSolution | MANTER | Coerente com o desafio. |
| glossary | MANTER | 6 termos, todos usados. |
| references | MANTER | IEEE 802.3 e referência interna. |
| linksToOtherCourses | MANTER | Reais. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Colisão = transmissões simultâneas em meio compartilhado/half-duplex | MANTIDO | history, concept, internals |
| 2 | Ethernet original: meio compartilhado, detecta colisão e retransmite (CSMA/CD) | MANTIDO | history |
| 3 | Hub = repetidor de bits para todas as portas; não aprende MAC nem filtra | MANTIDO | history, internals, glossário, q3.4.1 |
| 4 | Hub só torna o cabeamento conveniente (estrela) e mantém um único domínio de colisão | MANTIDO | history (texto e tabela) |
| 5 | Hub expõe o tráfego a todos os hosts | MANTIDO | history (tabela), security.vulnerabilities "Hub ou mini-switch indevido" |
| 6 | Switch: cada porta é um domínio de colisão separado | MANTIDO | concept (texto e tabela), simpleExample |
| 7 | Full-duplex torna a colisão clássica rara | MANTIDO | internals "Por que o switch acaba com as colisões", fc3.4.7 |
| 8 | Unicast conhecido → tabela MAC → só a porta do destino | MANTIDO | internals, glossário, mentor 1 |
| 9 | Unicast desconhecido pode ser inundado temporariamente | MANTIDO | problem |
| 10 | Broadcast `ff:ff:ff:ff:ff:ff` → todas as portas da VLAN exceto a de entrada | MANTIDO | concept, internals, fc3.4.8, ex3.4.5 |
| 11 | ARP do IPv4 depende de broadcast | MANTIDO | history, internals, simpleExample |
| 12 | Domínio de broadcast = quem recebe os broadcasts uns dos outros (~VLAN/sub-rede) | MANTIDO | concept, glossário, fc3.4.2 |
| 13 | Roteador/L3 não repassa broadcast L2 e encaminha por IP | MANTIDO | concept, internals (passo 4 do fluxo), q3.4.5 |
| 14 | VLAN limita broadcast; switch não é roteador | MANTIDO | concept, internals |
| 15 | Tipos de tráfego (unicast, broadcast, desconhecido) e o trade-off entre banda/exposição e ARP | MANTIDO | problem |
| 16 | Fases meio compartilhado → hub → switch → LAN segmentada | MANTIDO | history (tabela vinda de evolution) |
| 17 | Campo DST MAC broadcast, 48 bits; excesso indica loop/storm/varredura | MANTIDO | internals (tabela) — movido de protocolFields |
| 18 | Source MAC: aprendizado e rastreio; pode ser falsificado | MANTIDO | internals (tabela) — movido |
| 19 | VLAN ID 12 bits na tag 802.1Q; trunk permissivo expõe segmentos | MANTIDO | internals (tabela) — movido |
| 20 | FCS 32 bits; erros recorrentes indicam problema físico | MANTIDO | internals (tabela) — movido |
| 21 | Fluxo do ARP Request (host → switch aprende → replica na VLAN → gateway não repassa) e falhas possíveis (ruído, MAC flapping, loop sem STP, rede plana) | MANTIDO | internals — movido de packetFlow |
| 22 | Rede plana: mais ARP, ruído, escopo de falha, movimento lateral | MANTIDO | architecture, enterpriseExample, security |
| 23 | Hierarquia acesso/distribuição/core; VLANs por função; firewall entre segmentos | MANTIDO | architecture |
| 24 | Segmentar exige documentação e roteamento; STP e storm control precisam de monitoramento | MANTIDO | architecture — movido de deepDive.operationalImpact |
| 25 | Rede plana parece barata, mas custa em incidentes/troubleshooting | MANTIDO | architecture — movido de deepDive.financialImpact |
| 26 | "Switches gerenciáveis, NAC e monitoramento custam mais" | REMOVIDO | fora do escopo / genérico (deepDive.financialImpact) |
| 27 | Cloud abstrai L2; subnet, route tables, SG/NSG; VPC plana é o erro equivalente | MANTIDO | cloudExample |
| 28 | DevSecOps: runners, Kubernetes/NetworkPolicies, IaC | REMOVIDO | fora do escopo (genérico); o link para o curso de Platform Engineering fica em linksToOtherCourses |
| 29 | Analogia viva-voz / recepcionista / alto-falante | MANTIDO | analogy |
| 30 | Exemplo doméstico: ARP em broadcast, todos recebem, só o gateway responde | MANTIDO | simpleExample |
| 31 | VLANs por função (usuários, servidores, voz, visitantes, gestão, câmeras, industriais) | MANTIDO | enterpriseExample, desafio, commentedSolution |
| 32 | Riscos: rede plana, broadcast storm, hub/mini-switch indevido, segmentação falsa + mitigações | MANTIDO | security.vulnerabilities — fundido de securityExample |
| 33 | Erros comuns: switch elimina broadcast; VLAN = firewall; mini-switch doméstico | MANTIDO | concept "Erros comuns" — movido de commonMistakes |
| 34 | Limitações: switch não substitui firewall; VLAN sem política não autoriza; broadcast pequeno é normal | MANTIDO | concept "Erros comuns", security.vulnerabilities "Segmentação falsa" — movido de deepDive |
| 35 | Não usar colisão para explicar todo problema moderno | MANTIDO | concept "Erros comuns" — movido de deepDive.whenNotToUse |
| 36 | Troubleshooting: sintomas, perguntas, `arp -a`, `ipconfig /all`, `ip neigh`, `ip -s link`, `show mac address-table`, `show interfaces counters errors`, `show spanning-tree`, `show storm-control`, árvore de decisão | MANTIDO | troubleshooting |
| 37 | Hardening: port security, 802.1X, BPDU Guard, storm control, portas não usadas desabilitadas | MANTIDO | security.hardening |
| 38 | Monitoramento "Mudanças de porta" e "Alertas NAC" | REMOVIDO | genérico; NAC fica na mitigação de "Rede plana" e mudanças de porta em goodPractices ("Documentar portas, trunks e exceções") |
| 39 | Detecção: aumento de broadcast por VLAN, MACs demais por porta, tráfego lateral, eventos STP | MANTIDO | security.detectionIdeas |
| 40 | Lab: mapa, `ipconfig`/`ip addr`, `arp`/`ip neigh`, classificação dos domínios, hub × switch, safetyNotes | MANTIDO | lab (passos 1–5) |
| 41 | Lab passo 6: propor VLANs por função | REMOVIDO | duplicado no desafio (mesma entrega, com matriz e rubrica); o lab mantém a lista de riscos e controles no passo 4 |
| 42 | lab.challenge / lab.solution | REMOVIDO | duplicados no challenge/commentedSolution |
| 43 | Mecanismo do full-duplex (ponto a ponto, TX/RX simultâneos, CSMA/CD desativado; colisão só reaparece com half-duplex) | NOVO | internals, fc3.4.7 |
| 44 | Contagem de domínios de colisão e de broadcast (e o efeito de dividir em VLANs) | NOVO | simpleExample, q3.4.7, ex3.4.6 |
| 45 | `show interfaces counters` para contadores de broadcast por porta | NOVO | troubleshooting (comando Cisco) |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar domínio de colisão e domínio de broadcast | concept (definições + tabela), simpleExample "Contando domínios", q3.4.7, ex3.4.1, ex3.4.6, fc3.4.1/2 |
| Explicar por que hubs foram substituídos por switches | history (texto + tabela), internals, diagrama, mentor 1, q3.4.1/2, lab passo 5 |
| Entender por que switches reduzem colisões, mas não eliminam broadcasts | internals "Por que o switch acaba com as colisões" + fluxo ARP, concept, fc3.4.4/7/8, q3.4.2 |
| Relacionar VLANs e roteadores ao controle de domínios de broadcast | concept, internals (fluxo e tabela de campos), simpleExample, ex3.4.5, ex3.4.6, q3.4.5 |
| Aplicar o conceito em troubleshooting e segurança defensiva de LAN | concept "Erros comuns", security, troubleshooting, mentor 2/3, q3.4.3/4, lab, desafio |

## 10. O que mudou na nova versão
- Movido de campos invisíveis: protocolFields → tabela de campos em internals; packetFlow → fluxo "Um ARP Request atravessando a LAN"; commonMistakes + deepDive.limitations/whenNotToUse → callout "Erros comuns" em concept; deepDive.mentalModel → 1º bullet do summary; deepDive.operationalImpact/financialImpact → último parágrafo de architecture. Removidos os quatro `*Intro`.
- Fusões: evolution → history; securityExample → security.vulnerabilities (de 2 para 4); parágrafo de cloud de architecture → cloudExample; lab passo 6 → desafio.
- Removidos: devsecopsExample (genérico); lista de definições de problem (duplicava concept); 2º parágrafo de simpleExample; lab.challenge, lab.solution, analysisTask ritual (substituído por tarefa específica nos passos 1 e 4), prerequisites repetido; improvements e questions reduzidos a 2 cada.
- Prática: exercícios de 4 para 3 (ex3.4.2, ex3.4.3 e ex3.4.4 repetiam mentor/desafio; entram ex3.4.5 e ex3.4.6). Quiz continua com 6 (q3.4.6 → q3.4.7; distratores de q3.4.3/q3.4.4 refeitos; gabarito redistribuído com `quiz_embaralhar`). Flashcards continuam com 6 (fc3.4.3/fc3.4.5 → fc3.4.7/fc3.4.8).
- `lab.estimatedTimeMinutes` 120 → 30 (5 passos; 120 não era plausível). `duration` 85-120 → 85-125 min e `estimatedStudyTimeMinutes` 120 → 125, pela faixa recomendada da nova versão (T 102,6). A faixa sobe 5 min no topo, embora T tenha caído 10%, porque a declarada original já estava abaixo da faixa da fórmula (95-135).
- **Acréscimos novos (não movidos), com justificativa:**
  - Parágrafo "Por que o switch acaba com as colisões" (internals) e fc3.4.7: o objetivo 3 pede o *porquê*, e o original só afirmava o fato. Um parágrafo de 3 frases.
  - "Contando domínios" (simpleExample), q3.4.7 e ex3.4.6: cobrem o resultado esperado 1 ("dado um desenho com hub, identifica…") e o objetivo 1, que não tinham nenhum exemplo concreto com números. Entram no lugar de itens removidos (2º parágrafo do exemplo, q3.4.6, ex3.4.4), sem aumentar a quantidade.
  - ex3.4.5 (quais portas recebem o ARP por VLAN): cobre o resultado esperado 3, que não tinha exercício; entra no lugar do ex3.4.2.
  - Tabela "Equipamento × separa colisão/broadcast" em concept: substitui a comparação que estava espalhada por problem, evolution e internals.
  - `show interfaces counters` no troubleshooting: o mentor 2 e o desafio pedem contadores de broadcast, e nenhum comando os mostrava.

## 11. Depois
Palavras visíveis: 3857 → 3983 (+3%; inclui ~330 palavras movidas de campos invisíveis e ~250 de conteúdo novo justificado; sem esses, o saldo seria cerca de −12%) · Teoria visível: 2158 → 2157 · Invisíveis: 544 → 25 (networkContext) · Duração: 85-120 min (T 113,9) → 85-125 min (T 102,6; −10%) · Quiz corrigido: sim (6 questões; 1 trocada, 2 com distratores refeitos, gabarito redistribuído).
Checagem 11.7: os cortes brutos do `comparar` (13%) ficaram abaixo da linguiça estimada (18%), porque boa parte da redundância foi reescrita de forma mais curta em vez de apagada (contada como "reescrita"). As frases que sumiram (`--sumiram`) estão cobertas no inventário: reescritas na nova versão ou removidas por duplicação.
`validar`: OK, 0 erros; aviso "id de quiz original ausente: q3.4.6" — intencional (questão repetida, trocada pela q3.4.7 com id inédito).

## 12. Revisão humana
- Passo 6 do lab ("Propor segmentação defensiva") fundido com o desafio, que pede a mesma entrega com mais exigência (matriz e rubrica). Quem conclui só pelo lab (`labMarkedDone`) continua listando riscos e controles no passo 4, mas não desenha o plano de VLANs. Confirmar se isso é aceitável.
- Acréscimo técnico novo: "colisões só reaparecem com half-duplex: hub, equipamento antigo ou negociação de duplex errada" e `show interfaces counters` (Cisco Catalyst, contadores In/Out de unicast/multicast/broadcast por porta). Conferir se isso não se sobrepõe à aula 3.1, que não pude ler.

```json
{
  "id": "3.4", "modulo": "m03", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Domínios de colisão, broadcast e hub vs switch",
  "duracao_declarada": "85-120 min", "T_original_min": 113.9, "duracao_nova": "85-125 min", "T_nova_min": 102.6, "duracao_nova_estimated_max": 125,
  "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 18, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 10, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 3857, "palavras_visiveis_depois": 3983,
  "palavras_invisiveis_antes": 544, "palavras_invisiveis_depois": 25,
  "secoes": {
    "motivation": "ENXUGAR", "history": "ENXUGAR", "problem": "ENXUGAR", "evolution": "FUNDIR:history",
    "concept": "MANTER", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "REMOVER",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "MANTER",
    "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals", "deepDive": "MOVER:summary/concept/architecture",
    "commonMistakes": "MOVER:concept", "networkContext": "MANTER",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Lab passo 6 (propor segmentação) fundido com o desafio; quem conclui só pelo lab não desenha o plano de VLANs.",
    "Acréscimos técnicos novos (half-duplex/negociação de duplex errada como única origem de colisões hoje; show interfaces counters) — conferir sobreposição com a aula 3.1."
  ]
}
```
