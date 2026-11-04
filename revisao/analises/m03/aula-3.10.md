# Aula 3.10 — Revisão prática: do frame ao gateway
Tipo: ligação/revisão · Duração declarada: 85-120 min · Palavras visíveis / invisíveis (antes): 4298 / 615

## 1. Duração
T pela fórmula = 115,5 min (teoria 17,7, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 35,8)
Veredito: ORGANIZADA — M = 102,5 min = 0,89×T. A divisão (18% de teoria, o resto prática) faz sentido para uma revisão prática. Ressalvas: o `lab.estimatedTimeMinutes` = 120 não é plausível para 6 passos curtos (a fórmula usou a alternativa de 35,8 min) e, sozinho, já igualava a duração inteira da aula; e a prática é repetitiva: lab, desafio, `lab.challenge`, exercício 3 e mentor 3 pedem o mesmo desenho de filial/VLANs.

## 2. Encheção de linguiça
Nível: MÉDIA (~21%). Evidências:
- `history` inteira ("A Ethernet nasceu para permitir comunicação local…") e a prosa de `evolution` ("pode ser vista como uma linha de evolução da LAN…") recontam o módulo; a tabela de `evolution` repete o `problem` em outra forma.
- `devsecopsExample`: genérico ("Runners self-hosted, registries internos…", frase repetida em 3 aulas; "vale validar se o host alcança o gateway") sem nada específico do tema.
- Analogia com limite em três frases ("redes não transportam envelopes físicos… A analogia serve para o raciocínio…").
- `architecture`: listas "Componentes" e "Pontos de falha" repetem `internals`/`packetFlow`.
- Lab: `analysisTask` ritual em 2 passos ("Produza o artefato indicado na instrução do passo…", frase em 56 aulas); `lab.challenge`/`lab.solution` duplicam o desafio; `lab.troubleshooting` duplica `troubleshooting.decisionTree` (2 de 3 itens); `lab.questions` repetem quiz/mentor/exercícios.
- Fixação duplicada: "MAC do gateway para destino remoto" aparece em quiz q1, flashcard fc1, exercício ex1, mentor 1 e lab.questions; fc3/fc5 copiam q4/q5; ex2 e mentor 2 usam o mesmo cenário; ex3 = mentor 3; ex4 = tarefa 4 do desafio + tabela do `securityExample`.
- `security`: `hardening` repete `goodPractices` (802.1X/NAC, DAI, BPDU Guard, storm control); `detectionIdeas` repete `monitoring`; `commonErrors` "Confundir isolamento de broadcast com autorização" = commonMistakes "VLAN é firewall".
- Quiz com distratores absurdos (Base64, UTF-8, HTTP Keep-Alive, CORS, "HTTP 403").
- Campos invisíveis com conteúdo útil: `deepDive`, `commonMistakes`, `protocolFields`, `packetFlow` (~460 palavras).

## 3. Conteúdo útil
PARCIAL. Valioso: o fluxo host → ARP → switch → VLAN/trunk → STP → gateway com falha típica por etapa; o exemplo empresarial VLAN 10 → VLAN 30 com os pontos de quebra (VLAN errada, trunk sem VLAN, STP, DAI sem DHCP snooping); a tabela risco/evidência/mitigação; os comandos Windows/Linux/Cisco com interpretação; a árvore de decisão (MAC do gateway mudando, MAC em portas diferentes). Lacunas: nenhum exemplo concreto, com valores, de decidir "MAC do destino × MAC do gateway" (learningOutcome 2); o objetivo 4 (separar L2 de IP/DNS/TLS/HTTP) só tinha a frase da definição, sem nenhuma evidência que distinga as camadas; a "matriz de diagnóstico" (objetivo 3) só aparecia como instrução do lab, sem exemplo. Erros técnicos: pequenos — `packetFlow` listava "stale" como falha de ARP (STALE só indica que a entrada precisa ser revalidada); ex2 aceitava "firewall local bloqueando ICMP" como hipótese para ARP incompleto (com ARP incompleto, o problema está antes do ICMP).

## 4. Aproveitamento
BOM (~84%) — medido contra T = 115,5 min: cerca de 19 min não ensinam nada novo (≈3 min de teoria genérica/histórica, ≈12 min de exercícios que repetem mentor/desafio, ≈2 min de quiz trivial, ≈1 min de flashcards copiados do quiz e ≈1 min de texto ritual do lab). Contra a duração declarada (M = 102,5) a proporção é parecida. Se o lab fosse contado pelos 120 min declarados, o aproveitamento cairia muito, mas a fórmula não usou esse valor.

## 5. Pode ser mais curta?
NÃO — redução prevista e obtida: ~6% (T 115,5 → 108,5). A maior parte do tempo é prática exigida (lab-3.10 está em `requiredLabs`; desafio fixo de 20 min). O corte de um exercício duplicado e da teoria genérica é parcialmente compensado pelo conteúdo movido dos campos invisíveis.

## 6. Explicação mais direta
SIM — `concept`: definição primeiro, depois uma matriz de diagnóstico em tabela no lugar da enumeração em prosa; `internals`: a lista de 8 passos e o `packetFlow` invisível viraram uma tabela "quem / o que acontece / falha típica"; `problem` + `evolution`: a lista "Sem MAC correto…" e a tabela de evolução viraram uma única tabela "peça / o que resolve → o que exige / quando falha"; `architecture`: as três listas viraram o caminho em uma linha + o erro de desenho.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Chamado real e callout mantidos; meta-texto "Esta revisão existe para…" e "Ethernet não é uma lista…" condensados. |
| history | REMOVER | Revisão (6.10): reconta 3.1–3.9; a ideia útil ("cada solução trouxe uma responsabilidade") foi para a tabela de `problem`. |
| problem | ENXUGAR + FUNDIR (evolution) | A lista de falhas por peça e a tabela de evolução viram uma tabela só. |
| evolution | FUNDIR:problem | Tabela fundida; prosa repetida removida. |
| concept | ENXUGAR + MOVER (commonMistakes, deepDive) | Definição antes; nova matriz de diagnóstico (objetivos 3 e 4); callout "Erros comuns" com `commonMistakes`; limites do método vindos de `deepDive.limitations` + ponto híbrido do cloudExample. |
| internals | MANTER + MOVER (packetFlow, protocolFields) | Tabela de passos com falha típica; tabela "Campos que você confere". |
| architecture | ENXUGAR | Listas duplicadas de `internals` cortadas; caminho e dependências L1/L2/L3 em um parágrafo; erro de desenho em callout. |
| analogy | REMOVER | Revisão enxuta (6.10): as analogias já foram dadas nas aulas de cada tema; o mapeamento não ensina nada que a tabela de `problem` não mostre. |
| simpleExample | MANTER | Concreto (192.168.1.1); só enxugado. |
| enterpriseExample | MANTER | Melhor exemplo da aula (VLAN 10 → 30, quatro pontos de quebra). |
| cloudExample | REMOVER (essência movida para concept) | Exemplo por ambiente dispensável em revisão; o ponto específico (L2 do datacenter até a VPN em ambiente híbrido) foi para "Limites do método". |
| devsecopsExample | REMOVER | Genérico; o checklist já está em `security.goodPractices` e `lab.improvements`. |
| securityExample | ENXUGAR | Tabela risco/evidência/mitigação mantida (envolvida em `responsive-table`); parágrafo encurtado. |
| diagram | MANTER | Correto e legível; só o número do `<h2>` foi tirado. |
| labIntro | REMOVER | Invisível. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | ENXUGAR + MOVER (deepDive.mentalModel) | Modelo mental na primeira linha; regra do MAC; VLAN ≠ política; erro comum; uso real. |
| nextTheme | ENXUGAR | 1 frase coerente com 4.1 "Por que o IPv4 existe". |
| lab | ENXUGAR | `estimatedTimeMinutes` 120 → 35; sem `analysisTask` ritual; `lab.challenge`/`lab.solution` removidos (duplicam o desafio; a solução foi para `commentedSolution.finalAnswer`); `lab.troubleshooting` movido para `troubleshooting.decisionTree`; perguntas 4 → 2; melhorias 4 → 3; pré-requisito sobre ataques removido (já está em `safetyNotes`); passo 5 ganhou exemplo de linha da matriz. |
| quiz | MANTER (corrigido) | 6 questões; distratores absurdos trocados por plausíveis; explicações dizem por que os distratores erram; gabarito redistribuído. |
| flashcards | MANTER (4 trocados) | fc1, fc2, fc3 e fc5 copiavam o quiz; foram trocados por cards de destino local, MAC do gateway mudando, comandos do host e uplink bloqueado pelo STP. |
| mentorQuestions | MANTER (1 trocada) | A mentor 2 repetia o cenário do ex2 e virou um raciocínio por comparação com um host que funciona; nas expectedIdeas da mentor 3 entrou o LO3 (broadcast contido, onde há roteamento). |
| exercises | ENXUGAR (4 → 3) | ex1 trocado por versão concreta com IPs (ex3.10.5); ex3 removido (= mentor 3); ex4 trocado por classificação de camada (ex3.10.6; = desafio tarefa 4); ex2 corrigido. |
| challenge | MANTER | Cobre o LO5; rubrica única, sem conflito. |
| commentedSolution | ENXUGAR + MOVER (lab.solution) | Erro "ping no gateway falhando é DNS" saiu (já está no callout de concept e no summary); `finalAnswer` absorve o desenho por função de `lab.solution`. |
| glossary | ENXUGAR | "Fluxo do frame ao gateway" removido (repete a definição de concept). |
| security | ENXUGAR + MOVER (deepDive.operationalImpact) | Sem sobreposição: `hardening` concentra os controles (com a regra do DAI × DHCP snooping); `goodPractices` ganhou a implantação gradual; `monitoring` absorveu `detectionIdeas` duplicados; "rede plana" e "confundir isolamento" removidos por duplicidade. |
| troubleshooting | MANTER + MOVER (lab.troubleshooting) | Comandos mantidos; a árvore de decisão ganhou o item "broadcast elevado" e as correções do lab. |
| references | MANTER | Reais. |
| linksToOtherCourses | MANTER | — |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary/concept/security, depois REMOVER | mentalModel → summary; limitations → concept; whenNotToUse (erro puramente de aplicação) → concept; operationalImpact → security.goodPractices; whenToUse ≈ troubleshooting.symptoms; financialImpact (genérico) e securityImpact (= security) removidos. |
| commonMistakes | MOVER:concept (callout "Erros comuns") | Os 3 erros com causa e correção. |
| protocolFields | MOVER:internals | Tabela "Campos que você confere". |
| packetFlow | MOVER:internals | Coluna "Falha típica". |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Host compara IP de destino e máscara para decidir local × remoto | MANTIDO | internals passo 1; ex3.10.5 |
| 2 | Destino local → MAC do destino; remoto → MAC do gateway | MANTIDO | internals 1; summary; quiz q3.10.1; fc3.10.7; ex3.10.5 |
| 3 | Consulta ao cache ARP; sem entrada, ARP Request em broadcast na VLAN | MANTIDO | internals 2; simpleExample |
| 4 | Estados INCOMPLETE/FAILED indicam ARP não resolvido | MANTIDO | concept (matriz); internals 2; troubleshooting.commands; quiz q3.10.2 |
| 5 | "stale" como falha de ARP | REMOVIDO | incorreto: STALE só indica entrada a revalidar (Revisão humana) |
| 6 | Switch aprende o MAC de origem, tabela MAC por VLAN | MANTIDO | internals 3 |
| 7 | Broadcast/MAC desconhecido → flooding dentro da VLAN | MANTIDO | internals 3 |
| 8 | Trunk só leva VLANs permitidas (tag 802.1Q, 32 bits) | MANTIDO | internals 4 e "Campos"; ex3.10.6 (d) |
| 9 | STP bloqueia caminhos redundantes; bloqueio pode ser esperado | MANTIDO | internals 5; fc3.10.9; quiz q3.10.5; lab.questions |
| 10 | Controles L2 permitem, negam, alertam ou põem a porta em quarentena | MANTIDO | internals 6 |
| 11 | No gateway começa o roteamento; falhas: gateway errado, firewall local, rota ausente | MANTIDO | internals 7 |
| 12 | Destination/Source MAC 48 bits; Source MAC não é identidade forte | MANTIDO | internals "Campos"; security.commonErrors |
| 13 | ARP não autentica a associação IP-MAC | MANTIDO | internals "Campos" |
| 14 | Caminho corporativo: host, NIC, acesso, uplink/trunk, distribuição, gateway/firewall | MANTIDO | architecture; diagram |
| 15 | Dependência L1 → L2 → L3 | MANTIDO | architecture; concept (matriz) |
| 16 | Erro de desenho: documentar só IPs e firewalls | MANTIDO | architecture (callout) |
| 17 | Cada peça (Ethernet, switch, ARP, VLAN, STP, controles) resolve um problema e exige uma responsabilidade | MANTIDO | problem (tabela) |
| 18 | História: meio compartilhado, colisões, surgimento de switches/VLAN/STP/controles | REMOVIDO | fora do escopo de uma revisão (6.10); já visto em 3.1–3.9; "switch reduz colisões" ficou na tabela de problem |
| 19 | VLAN separa broadcast mas não é firewall; inter-VLAN exige política | MANTIDO | summary; concept (Erros comuns); quiz q3.10.3; mentor 3; commentedSolution |
| 20 | Culpar DNS antes de testar o gateway | MANTIDO | concept (Erros comuns); summary; ex3.10.6 |
| 21 | Limpar cache ARP mascara o sintoma | MANTIDO | concept (Erros comuns) |
| 22 | Exemplo doméstico 192.168.1.1, ARP antigo após troca de roteador, isolamento de clientes no Wi-Fi, cabo ruim | MANTIDO | simpleExample |
| 23 | VLAN 10 → VLAN 30 via gateway; VLAN errada, trunk sem VLAN, STP, DAI sem DHCP snooping | MANTIDO | enterpriseExample |
| 24 | Cloud abstrai L2; em ambiente híbrido L2 do datacenter vai até a VPN | MANTIDO | concept ("Limites do método") |
| 25 | Nomes Direct Connect/ExpressRoute; VM com NIC virtual/route table | REMOVIDO | detalhe de exemplo por ambiente, sem papel nos objetivos |
| 26 | Virtualização e overlays mudam a visibilidade; método não substitui captura/logs | MANTIDO | concept ("Limites do método") |
| 27 | Pipeline/registry on-premises dependendo de LAN | REMOVIDO | genérico (devsecopsExample); vínculo segue em linksToOtherCourses |
| 28 | Riscos: ARP inconsistente, MAC flapping, trunk permissivo, porta aberta (evidência/impacto/mitigação) | MANTIDO | securityExample (tabela) |
| 29 | MAC flapping = mesmo MAC em portas diferentes (loop, virtualização, docking, AP bridge) | MANTIDO | quiz q3.10.4; troubleshooting.decisionTree; securityExample |
| 30 | MAC do gateway mudando: HA legítima × IP duplicado/ARP inconsistente | MANTIDO | decisionTree; fc3.10.10; security.vulnerabilities |
| 31 | Broadcast elevado: loop, ARP excessivo, rede plana; storm control | MANTIDO | decisionTree (movido de lab.troubleshooting) |
| 32 | DAI valida ARP contra a base do DHCP snooping | MANTIDO | security.hardening; quiz q3.10.6; enterpriseExample |
| 33 | Hardening: port security, 802.1X/NAC, BPDU Guard, Root Guard, allowed VLANs, storm control | MANTIDO | security.hardening |
| 34 | Portas não usadas desabilitadas ou em VLAN de quarentena; inventário | MANTIDO | security.goodPractices |
| 35 | Controles L2 com implantação gradual | MANTIDO | security.goodPractices (de deepDive.operationalImpact) |
| 36 | Impacto financeiro (licenças NAC, switches gerenciáveis) | REMOVIDO | genérico, sem relação com os objetivos |
| 37 | Comandos Windows/Linux/Cisco e interpretação | MANTIDO | troubleshooting.commands; lab; fc3.10.8 |
| 38 | Matriz de diagnóstico: camada, hipótese, evidência, comando, interpretação, próximo passo | MANTIDO | concept (matriz); lab passo 5; glossary |
| 39 | Sanitização de relatórios (IPs, MACs completos, nomes internos) | MANTIDO | lab safetyNotes/passo 6; glossary; security |
| 40 | Desenho de filial: VLANs por função, gateway por VLAN, trunks restritos, STP planejado | MANTIDO | commentedSolution.finalAnswer (de lab.solution); mentor 3 |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Revisar o caminho de um frame Ethernet do host até o gateway | internals (tabela), diagram, enterpriseExample, lab passos 1–4 |
| Relacionar MAC, ARP, switch, VLAN, broadcast, STP e controles defensivos num raciocínio | problem (tabela), internals, summary, mentor 3, challenge |
| Criar uma matriz de diagnóstico para problemas de rede local | concept "Matriz de diagnóstico", lab passo 5 (com linha de exemplo), challenge |
| Separar falhas de L2 de IP, DNS, TLS, HTTP e aplicação | concept (definição + matriz), ex3.10.6, quiz q3.10.2, troubleshooting.commands |
| Preparar para o Módulo 4 | nextTheme, internals passo 1 (máscara), ex3.10.5 |

## 10. O que mudou na nova versão
- Removidos history, evolution (tabela fundida em problem), analogy, cloudExample (ponto híbrido movido para concept), devsecopsExample e os 4 `*Intro` invisíveis.
- Movidos: commonMistakes → callout "Erros comuns" em concept; packetFlow + protocolFields → tabelas em internals; deepDive → summary (modelo mental), concept (limites, quando não usar) e security (implantação gradual); lab.troubleshooting → troubleshooting.decisionTree; lab.solution → commentedSolution.finalAnswer.
- **Acréscimo novo 1 — matriz de diagnóstico em concept (~170 palavras):** cobre os objetivos 3 ("Criar uma matriz de diagnóstico") e 4 ("Separar falhas de L2 de IP, DNS, TLS…"), que no original só existiam como instrução do lab e frase da definição. Usa só comandos que a aula já tinha; os indicadores de L1 (state DOWN/NO-CARRIER, "mídia desconectada") e a regra "ARP resolvido + ping falhando → provável ICMP filtrado" são novos (ver Revisão humana).
- **Acréscimo novo 2 — ex3.10.5 (substitui ex3.10.1):** mesma ideia (MAC do gateway), agora com valores concretos e o caso local, para cobrir o LO2 ("Dado um endereço IPv4 de destino…"), que não tinha nenhum exercício com valores.
- **Acréscimo novo 3 — ex3.10.6 (substitui ex3.10.4):** classificar o caso pela camada, para praticar o objetivo 4. O ex4 removido repetia a tarefa 4 do desafio e a tabela do securityExample.
- Trocas sem aumento de quantidade: mentor 2 (cenário de comparação no lugar de repetir o ex2); flashcards fc1/fc2/fc3/fc5 → fc3.10.7/10/8/9 (os originais copiavam o quiz, 7.8); distratores do quiz (q1, q2, q4, q5, q6).
- Quantidades: quiz 6 → 6, flashcards 6 → 6, mentor 3 → 3, exercícios 4 → 3, passos do lab 6 → 6.
- Correções: "stale" fora da lista de falhas de ARP; o ex2 não aceita mais "firewall bloqueando ICMP" para ARP incompleto; `lab.estimatedTimeMinutes` 120 → 35 (6 passos curtos, alternativa da fórmula = 34,8); números retirados dos `<h2>`; tabelas novas em `responsive-table` + `data-table`; callouts novos em `callout warning`.
- `duration` 85-120 → 90-130 min e `estimatedStudyTimeMinutes` 120 → 130, pela faixa recomendada da nova versão.

## 11. Depois
Palavras visíveis: 4298 → 4536 (+5,5%; cortes brutos 772 = 18%, acréscimos 1010, dos quais ~460 vêm de campos invisíveis) · Invisíveis: 615 → 32 · Duração: declarada 85-120 min → nova 90-130 min (T 115,5 → 108,5) · Quiz corrigido: sim (6 questões; distratores e explicações reescritos; gabarito redistribuído pelo `quiz_embaralhar`).

## 12. Revisão humana
- A nova `duration` (90-130, est. 130) é maior que a declarada (85-120) embora T tenha caído de 115,5 para 108,5. Isso vem da fórmula: a declarada já ficava abaixo da faixa recomendada da original (100-140).
- `lab.estimatedTimeMinutes` mudou de 120 para 35 (6 passos curtos de coleta e redação). Confirmar.
- Matriz nova em concept: conferir os indicadores de L1 (`ip addr` com state DOWN/NO-CARRIER; `ipconfig /all` com "mídia desconectada") e a inferência "ARP resolvido com ping falhando → L2 provavelmente ok, ICMP possivelmente filtrado".
- Removi "stale" da lista de falhas de ARP (STALE é entrada a revalidar, não falha) e tirei "firewall local bloqueando ICMP" do gabarito do ex2 (inconsistente com ARP incompleto).
- Removi analogy e cloudExample por ser aula de revisão (6.10); o ponto híbrido do cloud foi preservado em concept. Confirmar se o curso quer manter exemplos por ambiente também nas revisões.
- Lab e desafio continuam sobrepostos (os dois são "mini-projeto" com mapa, matriz e relatório). Mantive os dois porque lab-3.10 está em `requiredLabs` e o desafio cobre o LO5. Vale diferenciar melhor (ex.: dar ao desafio sintomas concretos da filial).

```json
{
  "id": "3.10", "modulo": "m03", "tipo": "ligação/revisão", "status": "CONCLUIDA",
  "titulo": "Revisão prática: do frame ao gateway",
  "duracao_declarada": "85-120 min", "T_original_min": 115.5, "duracao_nova": "90-130 min", "T_nova_min": 108.5, "duracao_nova_estimated_max": 130,
  "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 21, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 6, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4298, "palavras_visiveis_depois": 4536,
  "palavras_invisiveis_antes": 615, "palavras_invisiveis_depois": 32,
  "secoes": {
    "motivation": "ENXUGAR", "history": "REMOVER", "problem": "ENXUGAR", "evolution": "FUNDIR:problem",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "REMOVER",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "MOVER:concept",
    "devsecopsExample": "REMOVER", "securityExample": "ENXUGAR", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER", "mentorQuestions": "MANTER",
    "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "ENXUGAR", "glossary": "ENXUGAR",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER",
    "networkContext": "MANTER",
    "deepDive": "MOVER:summary/concept/security", "commonMistakes": "MOVER:concept",
    "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals",
    "lab.troubleshooting": "MOVER:troubleshooting.decisionTree", "lab.challenge": "REMOVER", "lab.solution": "MOVER:commentedSolution.finalAnswer"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "duration nova 90-130 (est. 130) maior que a declarada 85-120 apesar de T cair 115,5 -> 108,5 (fórmula)",
    "lab.estimatedTimeMinutes 120 -> 35",
    "conferir indicadores L1 e a inferência ARP ok + ping falhando -> ICMP filtrado na matriz nova de concept",
    "removido 'stale' das falhas de ARP e 'firewall bloqueando ICMP' do gabarito do ex2",
    "analogy e cloudExample removidos por ser revisão (6.10); ponto híbrido preservado em concept",
    "lab e desafio continuam sobrepostos (mini-projetos); considerar diferenciar o desafio"
  ]
}
```

> **Controle de qualidade do m03 (revisor independente):** APROVADA. Fatos novos e gabarito conferidos. Ajustes menores aplicados pelo orquestrador na matriz do `concept`: "ARP resolvido + ping falhando" agora pede para conferir se o MAC é o esperado (cache antigo ou IP duplicado dão o mesmo sintoma), e `traceroute` (Linux) entrou ao lado do `tracert`.
