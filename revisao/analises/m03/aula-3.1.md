# Aula 3.1 — Ethernet: a base da rede local cabeada
Tipo: fundamental · Duração declarada: 85-120 min · Palavras visíveis / invisíveis (antes): 4897 / 810

## 1. Duração
T pela fórmula = 128 min (teoria 21, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 45)
Veredito: ORGANIZADA — M = 102,5 min fica no limite inferior (0,8×T = 102,4). A divisão é coerente para uma aula fundamental com lab: 19% de leitura e 81% de prática. A prática, porém, repete a mesma pergunta várias vezes: "Ethernet ≠ internet" aparece em mentor 1, ex1, quiz 1 e fc4; "host sem IP" em mentor 2, ex2 e no desafio; "portas públicas" em mentor 3, ex3 e fc5.

## 2. Encheção de linguiça
Nível: MÉDIA (~18%). Evidências:
- `history` × `evolution`: a mesma trajetória (meio compartilhado → hub → switch) contada duas vezes, além de fechos genéricos ("Ethernet continua sendo uma base conceitual essencial", "Ethernet não é apenas um cabo").
- `securityExample` (147 palavras): repete `security.vulnerabilities` (porta exposta, rede plana, MAC). Só a linha "Loop de camada 2" é exclusiva.
- `problem`: 5 itens "Sem …", dos quais 2 são vagos ("Sem regras de enlace…", "Sem diagnóstico de Ethernet…").
- `architecture`: último parágrafo genérico ("Ethernet raramente aparece isolada…").
- `analogy`: limite longo ("não entrega pacotes com pessoas andando pelo prédio").
- `cloudExample`/`devsecopsExample`: listas genéricas ("load balancer, private endpoint", "storage de rede e conectividade entre ambientes", "a operação corporativa ainda depende de uma base Ethernet confiável").
- `security`: `hardening` repete `goodPractices` (desativar portas, VLAN por função, NAC aparecem nas duas); `badPractices` é o espelho de `goodPractices`; `detectionIdeas` repete `monitoring`.
- `lab`: ritual em `safetyNotes`/`prerequisites` ("O laboratório é defensivo e de observação"), frase-padrão de 56 aulas no passo 6 ("Produza o artefato indicado na instrução do passo…"), `improvements` genéricos e `lab.troubleshooting` sobreposto a `troubleshooting.decisionTree` (sem link, sem gateway, CRC/flaps).
- Exercícios × mentor × flashcards perguntando a mesma coisa (ver seção 1).
- Campos invisíveis com conteúdo útil: `protocolFields`, `packetFlow`, `deepDive`, `commonMistakes` (617 palavras).

## 3. Conteúdo útil
PARCIAL. O que tem de realmente valioso: o fluxo host → NIC → switch → destino; os campos do frame com tamanhos (em campo invisível); comandos Windows/Linux/Cisco com interpretação; a árvore de decisão; a tabela de evolução; o exemplo empresarial (patch panel, 802.1X, PoE, evidências para o SOC); um lab executável. Lacunas: o objetivo 2 pede diferenciar Ethernet de **Wi-Fi e TCP**, e a aula não explica nenhum dos dois; também não diz que o frame é refeito a cada salto, que é o ponto que separa Ethernet de "internet". O learningOutcome 4 cita velocidade e duplex, mas no Linux nenhum comando mostra isso (`ip link` não mostra a velocidade). Erros técnicos: nenhum relevante.

## 4. Aproveitamento
BOM (~85% de 128 min). O tempo que não ensina vem de cerca de 4 min de leitura redundante, de uns 12 min de exercícios que repetem as perguntas do mentor e de uns 3 min de ritual do lab. Contra a duração declarada (102,5 min), o aproveitamento ficaria perto de 80%.

## 5. Pode ser mais curta?
NÃO — redução de 9% (T 128 → 116,2 min), abaixo do limite de 15%. A maior parte do tempo está em lab, desafio e exercícios, que são legítimos. Cortei um exercício redundante e ajustei o lab de 45 para 40 min. Nenhum item do inventário foi perdido.

## 6. Explicação mais direta
SIM:
- `concept`: definição com o padrão IEEE 802.3 já na abertura; encapsulamento e "o frame vale só até o próximo roteador" num único parágrafo; tabela Ethernet × Wi-Fi × IP × TCP × internet no lugar de prosa.
- `internals`: a lista numerada virou uma tabela "quem / o que acontece / o que pode falhar" (fundida com `packetFlow`), seguida da tabela dos campos do frame (de `protocolFields`).
- `history` + `evolution`: uma frase de causa (meio compartilhado → colisões → switches/full-duplex) e a tabela.
- `summary`: 5 bullets, abrindo com o `mentalModel`.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantidos o cenário e o callout; segundo parágrafo mais curto. |
| history | ENXUGAR (recebe evolution) | Explica por que existem switches e tabela MAC; fundida com a tabela de evolution. |
| problem | ENXUGAR | 3 itens concretos; o parágrafo "Ethernet não…" recebe `deepDive.limitations` (DNS/TLS/HTTP). |
| evolution | FUNDIR:history | Mesma trajetória da history; a tabela foi para lá. |
| concept | ENXUGAR + acréscimo | Definição mais direta, frame por salto, tabela Ethernet/Wi-Fi/IP/TCP/internet (objetivo 2) e callout "Erros comuns" (de commonMistakes). |
| internals | ENXUGAR (recebe packetFlow/protocolFields) | Tabela de etapas com falhas típicas e tabela de campos do frame. |
| architecture | ENXUGAR | Lista mantida; parágrafo final genérico removido; recebe `deepDive.operationalImpact` em uma linha. |
| analogy | ENXUGAR | Limite em 1 frase. |
| simpleExample | MANTER | Concreto (MAC do gateway, 100 Mbps × 1 Gbps); ajustes de redação. |
| enterpriseExample | MANTER | Específico e útil para SOC. |
| cloudExample | ENXUGAR | Um parágrafo: NIC virtual com MAC e handoff híbrido. |
| devsecopsExample | ENXUGAR | Runner em VLAN errada e bridges/veth/CNI. |
| securityExample | FUNDIR:security | Tabela duplicava as vulnerabilidades; o "Loop de camada 2" virou vulnerabilidade em `security`. |
| diagram | MANTER | SVG intacto (ids m03l01-*); legenda enxugada. |
| labIntro, exercisesIntro, challengeIntro, solutionIntro | REMOVER | Invisíveis. |
| summary | ENXUGAR | 5 bullets; o primeiro é o `deepDive.mentalModel`. |
| nextTheme | MANTER | Coerente com a 3.2 "Frame Ethernet e endereço MAC". |
| networkContext | MANTER | Metadado. |
| protocolFields | MOVER:internals | Tabela de campos (48/48/16/32 bits). |
| packetFlow | MOVER:internals | Coluna "o que pode falhar" e aging da tabela MAC. |
| deepDive | MOVER:summary/problem/architecture/concept | mentalModel → summary; limitations → problem; operationalImpact → architecture; whenNotToUse (mobilidade) → linha Wi-Fi da tabela; keyTerms já estão no glossário; financialImpact e whenToUse REMOVIDOS (genéricos); securityImpact duplicava security. |
| commonMistakes | MOVER:concept | Callout "Erros comuns" com os 4 erros. |
| security | ENXUGAR | Duplicatas entre goodPractices/hardening/badPractices e monitoring/detectionIdeas removidas; +1 vulnerabilidade (loop), vinda de securityExample. |
| troubleshooting | MANTER (+ajustes) | Comandos mantidos com `ethtool` e `FullDuplex` (duplex/velocidade, LO 4); a árvore de decisão absorve o lab.troubleshooting. |
| lab | ENXUGAR | Ritual cortado; passo 6 com instrução específica no lugar da frase-padrão; `lab.troubleshooting` fundido com a árvore; `validation` sem o comando repetido; 45 → 40 min. |
| quiz | ENXUGAR | 6 questões; q3.1.6 (cloud, trivial) trocada por q3.1.7 (MAC de destino = gateway); distratores de q3/q5 melhorados; gabarito redistribuído. |
| flashcards | ENXUGAR | 6 cards; fc3.1.3 (copiava o quiz q5) → fc3.1.7 (flooding); fc3.1.5 (repetia mentor 3) → fc3.1.8 (802.3 × 802.11). |
| mentorQuestions | ENXUGAR | 3 perguntas; a 1 ("Ethernet ≠ internet", igual ao ex1) foi trocada por "por que o MAC muda a cada salto e o IP não". |
| exercises | ENXUGAR | 4 → 3: ex1/ex2/ex3 repetiam o mentor; ficam ex3.1.4 e dois novos de interpretação de evidência (ex3.1.5 100 Mbps; ex3.1.6 MAC em porta inesperada). |
| challenge | MANTER | Bom escopo e rubrica única. |
| commentedSolution | MANTER | Raciocínio por camadas e respostas erradas comuns. |
| glossary | MANTER | 6 termos, todos usados na aula. |
| references | MANTER | Reais (IEEE 802.3 e aulas internas). |
| linksToOtherCourses | MANTER | Pertinentes. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Sintoma "sem internet" pode estar em cabo, NIC, porta, velocidade, VLAN, tabela MAC, ARP, gateway, DNS, app | MANTIDO | motivation |
| 2 | Trocar cabo de porta → VLAN errada, 802.1X, NAC, firewall | MANTIDO | motivation (callout), concept (Erros comuns) |
| 3 | Ethernet surgiu para padronizar o meio local (vs. proprietário) | MANTIDO | history |
| 4 | Meio compartilhado: colisão, domínio de colisão, detecção de colisão | MANTIDO | history |
| 5 | Hub → switch, full-duplex | MANTIDO | history (texto + tabela) |
| 6 | Tabela de evolução (meio compartilhado, hub, switch, datacenter/EVPN-VXLAN) | MANTIDO | history |
| 7 | Sem endereço de enlace o switch não encaminha; sem quadro não há início/fim/verificação | MANTIDO | problem |
| 8 | Ethernet não roteia, não autentica, não criptografa, não autoriza app, não resolve DNS/TLS/HTTP | MANTIDO | problem (+ deepDive.limitations) |
| 9 | Definição: tecnologia de LAN, quadros, MAC, camadas 1 e 2 | MANTIDO | concept (definition-box) |
| 10 | Pacote IP encapsulado em frame com MAC origem/destino | MANTIDO | concept, internals, summary |
| 11 | Destino L2 = host local ou gateway; ARP em IPv4 | MANTIDO | internals passo 2, lab passo 3 |
| 12 | Sinais: eletricidade no cobre, luz na fibra | MANTIDO | internals passo 3 |
| 13 | Switch aprende MAC de origem por porta; encaminha pelo destino; flooding se desconhecido | MANTIDO | internals passo 4, fc3.1.7, summary |
| 14 | Tabela MAC tem tempo limitado (aging) | MANTIDO | internals passo 4 (de packetFlow) |
| 15 | Destino verifica integridade (FCS) | MANTIDO | internals passo 5 e tabela de campos |
| 16 | Falha típica por etapa (packetFlow.possibleFailure) | MANTIDO | internals (coluna "O que pode falhar") |
| 17 | Campos: MAC destino 48 bits, MAC origem 48, EtherType 16, FCS 32 | MANTIDO | internals (tabela), diagram |
| 18 | MAC destino pode ser gateway, host, broadcast, multicast | MANTIDO | internals (tabela) |
| 19 | EtherType indica IPv4/IPv6/ARP; 0x0800 = IPv4 | MANTIDO | internals, fc3.1.6, glossary |
| 20 | Erros CRC/FCS como sinal físico | MANTIDO | internals, troubleshooting, security |
| 21 | Componentes/dependências/pontos de falha/pontos de segurança | MANTIDO | architecture |
| 22 | Documentação de portas, VLANs, racks, patch panels | MANTIDO | architecture (Operação), security.goodPractices |
| 23 | Analogia do prédio; MAC alterável e aprendizado dinâmico | MANTIDO | analogy |
| 24 | Exemplo doméstico: frame para o MAC do gateway; 100 Mbps × 1 Gbps | MANTIDO | simpleExample, ex3.1.5 |
| 25 | Empresa: tomada → patch panel → switch de acesso; VLAN, 802.1X, PoE; evidências para o SOC | MANTIDO | enterpriseExample |
| 26 | Cloud abstrai L2; NIC virtual; híbrido: links dedicados, cross-connects, trunk, handoff | MANTIDO | cloudExample ("load balancer, private endpoint" REMOVIDOS: lista genérica) |
| 27 | Runner em VLAN errada; bridges Linux, veth, CNI, MACs virtuais | MANTIDO | devsecopsExample |
| 28 | Riscos: porta exposta, rede plana, MAC spoofing, loop/broadcast storm | MANTIDO | security.vulnerabilities (loop vindo de securityExample) |
| 29 | Mitigações: desativar portas, 802.1X/NAC, VLANs, firewall interno, BPDU Guard, controle de trunks, acesso admin restrito, STP | MANTIDO | security.hardening / vulnerabilities |
| 30 | Monitorar link up/down, MAC em porta nova, VLAN, CRC, port security, 802.1X, mudanças | MANTIDO | security.monitoring |
| 31 | Erros: VLAN ≠ firewall absoluto; cabo ok ≠ seguro/autorizado; sanitizar MACs | MANTIDO | security.commonErrors (2 itens equivalentes fundidos) |
| 32 | 4 erros comuns (internet, MAC identidade, VLAN ao trocar porta, DNS primeiro) | MANTIDO | concept (callout) |
| 33 | Comandos Windows/Linux/Cisco com interpretação (UP/LOWER_UP, ip neigh, show mac address-table…) | MANTIDO | troubleshooting.commands, lab |
| 34 | Árvore: sem link; link sem IP/gateway (DHCP); ARP não resolve (máscara/gateway fora da sub-rede); MAC em porta inesperada; CRC/flaps | MANTIDO | troubleshooting.decisionTree (absorve lab.troubleshooting) |
| 35 | Lab: 6 passos, validação, evidências, perguntas, desafio e solução por camada | MANTIDO | lab |
| 36 | MAC ≠ identidade forte; correlacionar com NAC, logs, inventário | MANTIDO | concept, internals, quiz q3.1.4, security, ex3.1.6 |
| 37 | Host sem IP: hipóteses de camada 2 antes do DNS | MANTIDO | mentor 2, desafio, commentedSolution (ex3.1.2 REMOVIDO: duplicado no mentor 2) |
| 38 | Controles para portas em áreas públicas | MANTIDO | mentor 3, security (ex3.1.3 e fc3.1.5 REMOVIDOS: duplicados no mentor 3) |
| 39 | Ethernet ≠ internet | MANTIDO | concept (tabela + callout), mentor 1, quiz q3.1.1, fc3.1.4 (ex3.1.1 REMOVIDO: duplicado) |
| 40 | Cloud ainda exige entender interface/enlace (quiz q3.1.6) | MANTIDO | cloudExample (questão REMOVIDA: trivial, testava a frase) |
| 41 | deepDive.financialImpact / whenToUse | REMOVIDO | genéricos, sem relação com os objetivos |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que Ethernet existe e qual problema resolveu | history, problem, quiz q3.1.1 |
| Diferenciar Ethernet de IP, TCP, Wi-Fi e internet | concept (tabela + frame por salto + callout), mentor 1, quiz q3.1.2/q3.1.7, fc3.1.4/fc3.1.8 |
| Elementos: NIC, meio físico, frame, MAC, switch, domínio local | internals (2 tabelas), architecture, diagram, glossary, fc3.1.7, ex3.1.4 |
| Relacionar com troubleshooting, segurança, cloud híbrida, DevSecOps, empresa | troubleshooting, security, enterprise/cloud/devsecopsExample, lab, ex3.1.5/ex3.1.6, desafio |
| Preparar para frame, MAC, switches, ARP e VLANs | internals (campos do frame), nextTheme, glossary |

## 10. O que mudou na nova versão
- Conteúdo movido de campos invisíveis: `protocolFields` e `packetFlow` → tabelas em `internals`; `commonMistakes` → callout em `concept`; `deepDive.mentalModel` → 1º bullet do summary; `limitations` → problem; `operationalImpact` → architecture. Os quatro *Intro* foram removidos.
- `evolution` fundida em `history`; `securityExample` fundido em `security`, com a vulnerabilidade "Loop de camada 2".
- Duplicatas removidas em security, lab (ritual, `lab.troubleshooting`, frase-padrão do passo 6, comando repetido em `validation`), exercícios, flashcards e mentor.
- **Acréscimos novos (não movidos), com justificativa:**
  - Tabela Ethernet × Wi-Fi × IP × TCP × internet e a frase "o frame vale só até o próximo roteador; os IPs seguem (exceto NAT)" (`concept`): o objetivo 2 pede diferenciar de Wi-Fi e TCP, e o original não fazia isso.
  - `ethtool <interface>` (Linux) e a coluna `FullDuplex` no `Get-NetAdapter` (troubleshooting e lab passo 1): o learningOutcome 4 cita velocidade e duplex, que o caminho Linux original não mostrava.
  - Vulnerabilidade "Loop" com a explicação "o frame Ethernet não tem contador de saltos": é conteúdo do securityExample removido; só a explicação do mecanismo é nova.
  - Frase do cloudExample sobre VLAN errada no handoff híbrido: substitui a frase genérica, cobrindo o objetivo 4 ("cloud híbrida").
  - Itens de prática **trocados, sem aumento de quantidade**: q3.1.7 no lugar de q3.1.6; fc3.1.7/fc3.1.8 no lugar de fc3.1.3/fc3.1.5; nova pergunta de mentor 1; ex3.1.5/ex3.1.6 no lugar de ex3.1.1–3 (os exercícios caíram de 4 para 3).
- `lab.estimatedTimeMinutes` 45 → 40 (6 passos, 1 opcional; a alternativa da fórmula dá 35,3 min).
- Quiz normalizado (`answer` numérico) e gabarito redistribuído (antes eram todas as respostas na posição 0).
- `duration` "85-120 min" → "100-140 min" (faixa recomendada da nova versão); `estimatedStudyTimeMinutes` 120 → 140.
- Aviso do `validar` (id q3.1.6 ausente): a questão foi substituída de propósito por q3.1.7 (id inédito).

## 11. Depois
Palavras visíveis: 4897 → 4818 (−1,6%; ~600 palavras foram movidas de campos invisíveis) · Invisíveis: 810 → 33 · Duração: declarada 85-120 min → nova 100-140 min (T 128 → 116,2 min) · Quiz corrigido: sim (6 questões)

## 12. Revisão humana
- `lab.estimatedTimeMinutes` reduzido de 45 para 40 min: confirmar.
- Conferir a propriedade `FullDuplex` do `Get-NetAdapter` nas versões de Windows usadas pelos alunos, e o `ethtool` como comando opcional no Linux.
- Conferir os acréscimos novos: a tabela Ethernet/Wi-Fi/IP/TCP/internet, "frame refeito a cada salto (exceto NAT)", "o frame Ethernet não tem contador de saltos" e a frase sobre VLAN no handoff híbrido.
- Itens de prática removidos ou trocados (q3.1.6, fc3.1.3, fc3.1.5, ex3.1.1–3): as respostas salvas de quem já respondeu q3.1.6 deixam de contar.
- A duração declarada subiu (85-120 → 100-140) por causa da fórmula fixa, embora o T tenha caído de 128 para 116 min.
- O SVG usa `svg-node--switch/--router/--server`, classes que não existem no CSS (já estavam no original e foram mantidas).

```json
{
  "id": "3.1", "modulo": "m03", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Ethernet: a base da rede local cabeada",
  "duracao_declarada": "85-120 min", "T_original_min": 128, "duracao_nova": "100-140 min", "veredito_duracao": "ORGANIZADA",
  "T_nova_min": 116.2, "duracao_nova_estimated_max": 140,
  "linguica_nivel": "MÉDIA", "linguica_pct": 18, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 9, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4897, "palavras_visiveis_depois": 4818,
  "palavras_invisiveis_antes": 810, "palavras_invisiveis_depois": 33,
  "secoes": {
    "motivation": "ENXUGAR", "history": "ENXUGAR", "problem": "ENXUGAR", "evolution": "FUNDIR:history",
    "concept": "ENXUGAR", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "MANTER",
    "networkContext": "MANTER", "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals",
    "deepDive": "MOVER:summary/problem/architecture/concept", "commonMistakes": "MOVER:concept",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "ENXUGAR",
    "mentorQuestions": "ENXUGAR", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.estimatedTimeMinutes reduzido de 45 para 40 min; confirmar",
    "conferir propriedade FullDuplex do Get-NetAdapter e ethtool opcional no Linux (acréscimo para LO 4)",
    "conferir acréscimos novos: tabela Ethernet/Wi-Fi/IP/TCP/internet, frame refeito a cada salto, 'frame sem contador de saltos', VLAN no handoff híbrido",
    "q3.1.6, fc3.1.3, fc3.1.5, ex3.1.1-3 substituídos/removidos; respostas salvas de q3.1.6 deixam de contar",
    "duração declarada subiu (85-120 -> 100-140) pela fórmula, embora T tenha caído de 128 para 116 min",
    "SVG original usa svg-node--switch/--router/--server (sem estilo no CSS), mantido"
  ]
}
```
