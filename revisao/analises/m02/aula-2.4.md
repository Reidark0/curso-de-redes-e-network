# Aula 2.4 — Camada 2 — Enlace: frames, MAC, switch, VLAN e ARP
Tipo: fundamental · Duração declarada: 85-120 min · Palavras visíveis / invisíveis (antes): 4918 / 738

## 1. Duração
T pela fórmula = 142,6 min (teoria 20,6, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 60)
Veredito: SUBESTIMADA — M = 102,5 < 0,8×T = 114. A distribuição faz sentido para uma aula fundamental com lab (teoria 17%, prática dominante). O lab declara 60 min para 6 passos curtos (4 comandos locais, 1 passo opcional em switch/Packet Tracer e uma matriz), o que é plausível pela regra, mas generoso.

## 2. Encheção de linguiça
Nível: MÉDIA (~16%). Evidências:
- `history` e `evolution` contam a mesma passagem hub → switch → VLAN duas vezes ("A evolução da Camada 2 acompanhou a evolução das empresas…"; tabela de 5 fases com "Zero Trust, NAC, microsegmentação e SDN", fora do escopo).
- `motivation` e `concept` repetem a definição ("A Camada 2, chamada de Enlace de Dados, é a camada que organiza os bits…" / "Camada 2 é a camada que organiza bits em quadros…"); `problem` fecha repetindo a motivação ("o profissional tende a culpar IP, firewall ou aplicação…").
- `securityExample` (tabela ARP spoofing, porta exposta, loop) duplica `security.vulnerabilities` quase item a item.
- `lab.troubleshooting` repete os 4 ramos de `troubleshooting.decisionTree` (gateway sem ARP, MAC em porta inesperada, IP de rede errada, rede lenta/loop); `lab.challenge` + `lab.solution` repetem `challenge` + `commentedSolution`.
- `mentorQuestions[1]`, `exercises[1]` e `challenge` pedem a mesma coisa (host não pinga gateway → hipóteses de Camada 2).
- Exemplos genéricos: `cloudExample` ("o conceito continua importante para entender isolamento, rede virtual, subnets, … appliances virtuais"), segunda metade de `simpleExample` (Smart TV), lista de ambientes em `devsecopsExample`.
- Ritual de lab: `analysisTask` com a frase padrão de 56 aulas ("Produza o artefato indicado na instrução do passo…"), safetyNote "O objetivo é defesa, diagnóstico e documentação.".
- Campos invisíveis com conteúdo bom: `protocolFields` (campos do frame), `packetFlow` (falhas por etapa), `commonMistakes`, `deepDive.mentalModel`.

## 3. Conteúdo útil
PARCIAL. O que tem de realmente valioso: o passo a passo ARP → frame → aprendizado/flooding do switch, a árvore de decisão e os comandos Windows/Linux/Cisco com interpretação, o lab executável e o desafio da mudança de mesa. Lacunas: a estrutura do frame (campos e tamanhos) e as falhas por etapa só existiam em campos invisíveis; porta access × trunk e a tag 802.1Q não são explicadas, embora a aula pergunte "A porta é access ou trunk?" e recomende "Usar VLAN nativa não utilizada"; o endereço de broadcast não aparece, apesar do objetivo 4; nenhuma saída de exemplo de tabela ARP ou MAC, apesar do learningOutcome 4 ("Dado um output de tabela ARP ou MAC, o aluno interpreta…"). Erros técnicos: nenhum relevante; o passo 3 de `internals` ("Se precisa entregar localmente, procura o MAC…") ficava ambíguo para o caso remoto (o host procura o MAC do gateway), e o diagrama dizia "MAC conhecida".

## 4. Aproveitamento
BOM — cerca de 90% do T original (142,6 min) vai para os objetivos; o desperdício é ~5 min de leitura redundante (history/evolution/securityExample/exemplos genéricos) e ~5–8 min de prática repetida (mentor 2 e exercício 2 iguais ao desafio). Contra a duração declarada (102,5 min) a aula já não cabe: o problema é a subestimativa, não o aproveitamento.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~9% (T 142,6 → 129,2). O grosso do tempo é prática necessária (lab, exercícios, desafio); a teoria redundante é pequena e parte do ganho foi reinvestida em conteúdo movido de campos invisíveis e em cobrir lacunas dos objetivos.

## 6. Explicação mais direta
SIM — `concept`: definição na abertura, depois MAC (48 bits, formato, broadcast) e o limite com a Camada 3, sem repetir a motivação. `internals`: tabela com os campos do frame no lugar de prosa, o fluxo em 8 passos com a decisão local × remoto explícita e uma tabela "onde cada etapa falha" (antes invisível). `problem`: a história em 4 frases, no fim. `securityExample` fundido em `security`. Exemplos simples e empresarial passam a mostrar uma saída real (`ip neigh`, `show mac address-table`) com a leitura.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Um parágrafo + o callout do problema real; a definição duplicada saiu (está em concept). |
| history | FUNDIR:problem | Só a passagem meio compartilhado → hub → switch → VLAN explica o porquê; 4 frases em problem. |
| problem | ENXUGAR | Mantida a lista de funções; parágrafo final repetia a motivação; recebeu a história curta. |
| evolution | FUNDIR:problem | Tabela repetia history; hub × switch foi para problem; "Segurança moderna" está em architecture/security; Zero Trust/SDN fora do escopo. |
| concept | ENXUGAR | Definição + MAC/broadcast + limite com Camada 3 (de deepDive.limitations) + callout "Erros comuns" (de commonMistakes). |
| internals | MANTER | Núcleo; recebeu tabela de campos (protocolFields) e de falhas por etapa (packetFlow); passos reescritos sem cortar mecanismo. |
| architecture | ENXUGAR | Componentes mantidos; access × trunk/802.1Q/VLAN nativa explicados; parágrafo de cloud foi para cloudExample. |
| analogy | ENXUGAR | Analogia boa; limite em 1 frase. |
| simpleExample | ENXUGAR | Exemplo da Smart TV removido; entra a saída de `ip neigh` com leitura (learningOutcome 4). |
| enterpriseExample | MANTER | VLANs 10/20/30/40 e a mudança de mesa; entra a saída de `show mac address-table` com leitura. |
| cloudExample | ENXUGAR | Só o específico: o que o aluno vê em cloud, overlay/isolamento, onde a Camada 2 volta (híbrido). |
| devsecopsExample | ENXUGAR | Mantido o caso do pipeline/runner; lista de ambientes reduzida. |
| securityExample | FUNDIR:security | Tabela duplicava security.vulnerabilities; "ARP sem autenticação" e "VLAN errada" foram para lá. |
| diagram | MANTER | Correto; só o h2 e "MAC conhecida" → "o MAC é conhecido". |
| labIntro | REMOVER | Invisível. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | MANTER | 5 bullets; primeira linha = deepDive.mentalModel; mecanismo e access/trunk incluídos. |
| nextTheme | ENXUGAR | 1 frase coerente com a 2.5. |
| networkContext | MANTER | Metadado. |
| protocolFields | MOVER:content.internals | Virou a tabela de campos do frame. |
| packetFlow | MOVER:content.internals | Decisão local × remoto nos passos; possibleFailure virou tabela "onde cada etapa falha". |
| deepDive | MOVER:content.summary | mentalModel → summary; limitations → concept/cloudExample; securityImpact já em security; whenNotToUse → lab.safetyNotes; financialImpact/operationalImpact genéricos removidos. |
| commonMistakes | MOVER:content.concept | Callout "Erros comuns" (3 itens); "portas não usadas ativas" já está em security e no exercício 4. |
| security | ENXUGAR | commonErrors sem repetição; vulnerabilidade "Porta em VLAN errada" (de securityExample); ARP spoofing com "sem autenticação" e sinal de detecção; aviso de ética deixado só no lab. |
| troubleshooting | MANTER | Comandos e árvore mantidos; os "fix" do lab.troubleshooting entraram nos ramos da árvore. |
| lab | ENXUGAR | Passos mantidos e executáveis; analysisTask ritual trocado por instrução concreta; lab.troubleshooting, lab.challenge e lab.solution removidos (duplicados); improvements 4→2 específicos; safetyNotes 4→3; estimatedTimeMinutes 60→45. |
| quiz | ENXUGAR | 6 questões; q2.4.1 (PDU, trivial, tema da 2.2) e q2.4.2 (distratores fracos) trocadas por q2.4.7 (EtherType) e q2.4.8 (MAC de destino para IP remoto); distratores plausíveis nas demais; gabarito redistribuído. |
| flashcards | ENXUGAR | 6; fc2.4.6 (repetia o quiz q2.4.4) trocado por fc2.4.7 (access × trunk); fc2.4.2 com 48 bits e broadcast. |
| mentorQuestions | ENXUGAR | 3; a 2ª (repetia exercício 2 e desafio) trocada pela de máscara errada → ARP para destino remoto. |
| exercises | ENXUGAR | 4; ex2.4.2 (repetia o desafio) trocado por ex2.4.5, interpretação de `ip neigh` + `show mac address-table`. |
| challenge | MANTER | Cenário e rubrica bons. |
| commentedSolution | MANTER | Acrescentado "ping por IP nem usa DNS" (vindo da dica da mentor removida). |
| glossary | MANTER | 6 termos, todos usados. |
| references | MANTER | Reais. |
| linksToOtherCourses | MANTER | Reais. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Camada 2 organiza bits em quadros (delimitação) | MANTIDO | concept (definição), problem |
| 2 | Entrega local entre interfaces do mesmo enlace/domínio | MANTIDO | concept, summary |
| 3 | Frame/quadro é a PDU da Camada 2 | MANTIDO | glossary Frame, flashcard fc2.4.1 |
| 4 | Campos do frame: MAC destino 48 b, MAC origem 48 b, EtherType 16 b, payload, FCS 32 b | MANTIDO | internals (tabela, vinda de protocolFields) |
| 5 | Switch aprende a tabela MAC pelo MAC de origem; falsificação afeta visibilidade | MANTIDO | internals tabela + passo 6 |
| 6 | FCS detecta erro; erros recorrentes = físico/enlace, não necessariamente ataque | MANTIDO | internals tabela |
| 7 | EtherType indica IPv4 ou ARP, ajuda filtros/análise | MANTIDO | internals tabela, quiz q2.4.7 |
| 8 | MAC é local; IP é lógico e roteável | MANTIDO | concept (Erros comuns), summary, mentor 1 |
| 9 | Decisão local × remoto pelo IP/máscara; remoto → MAC do gateway | MANTIDO | internals passos 1–2, simpleExample, quiz q2.4.8 |
| 10 | Máscara errada faz o host fazer ARP para destino que deveria ir ao gateway | MANTIDO | internals tabela de falhas, mentor 2 |
| 11 | ARP Request em broadcast dentro da VLAN; ARP Reply com o MAC | MANTIDO | internals passos 3–4, diagram |
| 12 | Entrada ARP ausente, stale ou falsa | MANTIDO | internals tabela de falhas |
| 13 | ARP é só IPv4; IPv6 usa Neighbor Discovery | MANTIDO | concept |
| 14 | ARP não tem autenticação nativa | MANTIDO | security.vulnerabilities ARP spoofing |
| 15 | Unicast para MAC conhecido; flooding dentro da VLAN para desconhecido | MANTIDO | internals passo 7, quiz q2.4.5, summary |
| 16 | Switch L2 não roteia; equipamento multicamada sim; sair da LAN exige gateway | MANTIDO | concept |
| 17 | Meio compartilhado, colisões; hub repete para todas as portas e expõe o tráfego | MANTIDO | problem (último parágrafo) |
| 18 | VLAN = várias redes lógicas sobre a mesma infraestrutura; separa domínio de broadcast | MANTIDO | problem, architecture, glossary, flashcard fc2.4.4 |
| 19 | VLAN não é firewall; política entre VLANs = ACL/firewall | MANTIDO | concept (Erros comuns), quiz q2.4.4, security |
| 20 | Trunk transporta várias VLANs entre switches/hipervisores | MANTIDO | architecture, flashcard fc2.4.7 |
| 21 | Gateway por VLAN | MANTIDO | architecture |
| 22 | Componentes: host/NIC, switch de acesso, VLAN, trunk, gateway, controles | MANTIDO | architecture |
| 23 | Controles: port security, NAC/802.1X, DHCP snooping, DAI, STP/BPDU Guard | MANTIDO | architecture, security |
| 24 | MAC flapping/loop = instabilidade ou topologia errada; broadcast storm | MANTIDO | internals tabela, security, troubleshooting |
| 25 | Cloud abstrai a Camada 2 (subnets, route tables, SG, MAC virtual, overlay, isolamento de tenants) | MANTIDO | cloudExample |
| 26 | Híbrido: VLANs em links dedicados (Direct Connect/ExpressRoute), VMware/Hyper-V | MANTIDO | cloudExample |
| 27 | DevSecOps: runners, bridges Docker, CNI; pipeline falha por VLAN sem gateway | MANTIDO | devsecopsExample |
| 28 | Exemplo VLAN 10/20/30/40 e mudança de mesa com VLAN errada | MANTIDO | enterpriseExample, challenge |
| 29 | Riscos: ARP spoofing, rede plana, porta exposta, VLAN errada, loop | MANTIDO | security.vulnerabilities (VLAN errada vinda de securityExample) |
| 30 | Comandos Windows (ipconfig /all, arp -a, Get-NetAdapter) | MANTIDO | troubleshooting.commands, lab |
| 31 | Comandos Linux (ip link/addr/neigh/route, bridge link) e estados REACHABLE/STALE/FAILED | MANTIDO | troubleshooting.commands, lab passo 4, simpleExample |
| 32 | Comandos Cisco (show mac address-table dynamic, show vlan brief, show interfaces trunk, show spanning-tree summary) | MANTIDO | troubleshooting.commands, lab passo 5, quiz q2.4.6 |
| 33 | Árvore de decisão (4 ramos) | MANTIDO | troubleshooting.decisionTree (com os "fix" do lab.troubleshooting) |
| 34 | Hardening (VLAN nativa não usada, limitar VLANs no trunk, BPDU Guard, DHCP snooping/DAI) e detecção | MANTIDO | security.hardening/detectionIdeas |
| 35 | Ping por IP não usa DNS | MANTIDO | commentedSolution.commonWrongAnswers (vinha da dica da mentor 2 removida) |
| 36 | Hipótese "porta bloqueada por segurança" | MANTIDO | troubleshooting.decisionTree[0] (vinha do exercício 2 removido) |
| 37 | DHCP indevido como causa de IP de rede errada | MANTIDO | troubleshooting.decisionTree[3] (vinha do lab.troubleshooting) |
| 38 | Fases "Segurança moderna → Zero Trust, NAC, microsegmentação, SDN" | REMOVIDO | fora do escopo da aula (port security/802.1X/DAI mantidos em architecture) |
| 39 | Impacto financeiro (switches gerenciáveis, NAC, leaf-spine) | REMOVIDO | invisível e genérico, fora dos objetivos |
| 40 | Smart TV aparece no roteador com MAC | REMOVIDO | exemplo raso; a identificação por MAC está coberta em concept e simpleExample |
| 41 | NOVO: MAC de 48 bits em hexadecimal; broadcast FF:FF:FF:FF:FF:FF | NOVO | concept, internals passo 3 (objetivo 4) |
| 42 | NOVO: porta access × trunk, tag 802.1Q com VLAN ID, VLAN nativa sem tag; VLAN fora do trunk isola o host | NOVO | architecture, flashcard fc2.4.7 (objetivos 2 e 4) |
| 43 | NOVO: leitura de `ip neigh` e `show mac address-table` | NOVO | simpleExample, enterpriseExample, exercício ex2.4.5 (learningOutcome 4) |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar o papel da Camada 2 no Modelo OSI | motivation, problem, concept, summary |
| Diferenciar frame, MAC, switch, VLAN e ARP | concept (MAC, Erros comuns), internals (frame, fluxo), architecture (VLAN, access/trunk), glossary, flashcards, quiz q2.4.7/q2.4.8 |
| Descrever como switches aprendem MAC e encaminham quadros | internals passos 6–7, diagram, quiz q2.4.5, flashcard fc2.4.3 |
| Entender broadcast, flooding, domínio de broadcast e segmentação por VLAN | concept (broadcast), internals passos 3 e 7, architecture, glossary, quiz q2.4.5, mentor 2 |
| Coletar evidências de Camada 2 em Windows, Linux e Cisco IOS | troubleshooting.commands, lab passos 1–5, simpleExample, enterpriseExample, exercício ex2.4.5, quiz q2.4.6 |
| Relacionar Camada 2 com segurança, cloud, DevSecOps e troubleshooting | security, cloudExample, devsecopsExample, troubleshooting, mentor 3, exercícios 3–4, challenge |

## 10. O que mudou na nova versão
- Removidos: history, evolution e securityExample (fundidos em problem e security), os 4 intros invisíveis, protocolFields, packetFlow, deepDive e commonMistakes (movidos para internals, concept e summary), lab.troubleshooting, lab.challenge e lab.solution (duplicados de troubleshooting.decisionTree, challenge e commentedSolution).
- Movido de campo invisível: tabela de campos do frame e tabela de falhas por etapa em internals; callout "Erros comuns" em concept; mentalModel como primeira linha do summary; limites (switch L2 não roteia, IPv6 usa ND) em concept.
- Acréscimos novos e justificativa:
  - MAC de 48 bits em hexadecimal e o broadcast FF:FF:FF:FF:FF:FF (concept e internals, ~40 palavras): o objetivo 4 pede broadcast e o ARP Request depende disso, mas o endereço não aparecia.
  - Porta access × trunk, tag 802.1Q/VLAN ID, VLAN nativa e o efeito de uma VLAN fora do trunk (architecture, ~80 palavras): objetivos 2 e 4; a própria aula pergunta "A porta é access ou trunk?" e recomenda "VLAN nativa não utilizada" sem explicar os termos.
  - Saídas ilustrativas de `ip neigh` e `show mac address-table` com leitura (simpleExample e enterpriseExample, ~130 palavras): learningOutcome 4 ("dado um output de tabela ARP ou MAC, interpreta…") não tinha nenhuma saída de exemplo.
  - Itens trocados sem aumentar quantidade: quiz q2.4.7 (EtherType) e q2.4.8 (MAC de destino para IP remoto) no lugar de q2.4.1 e q2.4.2; flashcard fc2.4.7 (access × trunk) no lugar de fc2.4.6; exercício ex2.4.5 (interpretar saídas) no lugar de ex2.4.2; mentor 2 (máscara errada) no lugar da que repetia o desafio. As explicações do quiz cresceram porque agora justificam os distratores.
- Lab: `analysisTask` ritual trocado por instrução concreta (colunas da matriz); passos 3 e 4 com linha de base e estados REACHABLE/STALE/FAILED/INCOMPLETE; safetyNotes 4→3; improvements 4→2 (Packet Tracer com trunk; Wireshark conferindo broadcast e EtherType); questions 4→3 (a de "VLAN não é firewall" já está em concept, quiz e security); `estimatedTimeMinutes` 60→45 (4 comandos locais de ~4 min, passo opcional no Packet Tracer ~20 min, matriz ~10 min; a alternativa da fórmula dá 36 min).
- Correções pequenas: no passo do ARP fica explícito que, para destino remoto, o host procura o MAC do gateway; o flooding vai para "as demais portas da mesma VLAN"; diagrama "MAC conhecida" → "o MAC é conhecido".
- Duração: `duration` 85-120 → 110-155 min e `estimatedStudyTimeMinutes` 120 → 155 (faixa da nova T = 129,2). Sobe porque a original era SUBESTIMADA (11.6).
- Aviso do `validar` justificado: "ids de quiz originais ausentes: q2.4.1, q2.4.2" — questões substituídas de propósito (trivial / distratores fracos); os ids novos são inéditos (q2.4.7, q2.4.8).

## 11. Depois
Palavras visíveis: 4918 → 5406 (+9,9%; cortes brutos 629, acréscimos brutos 1117, dos quais ~340 vêm de campos invisíveis e ~250 cobrem lacunas de objetivo) · Palavras invisíveis: 738 → 31 · Duração: declarada 85-120 min → nova 110-155 min (T 142,6 → 129,2) · Quiz corrigido: sim (6 questões, formato padronizado, 2 trocadas, gabarito redistribuído)

## 12. Revisão humana
- `lab.estimatedTimeMinutes` reduzido de 60 para 45 por julgamento (os passos são curtos); confirmar se o tempo do passo opcional no Packet Tracer justifica manter 60.
- As saídas de exemplo (`ip neigh` e `show mac address-table dynamic`) foram escritas por mim no formato padrão do Linux e do Cisco IOS, com valores ilustrativos; vale conferir o alinhamento e o cabeçalho com uma saída real.
- Descrição dos estados do Linux (REACHABLE = confirmada recentemente; STALE = válida, mas não confirmada há algum tempo; FAILED/INCOMPLETE = sem resposta) resumida por mim; confirmar se o nível de detalhe está adequado.
- lab.troubleshooting, lab.challenge e lab.solution removidos por duplicação (conteúdo consolidado em troubleshooting.decisionTree, challenge e commentedSolution); o painel do lab fica sem essa parte, mas `lab.validation.ifFails` cobre o que fazer quando cada checagem falha.
- Duração declarada sobe de 85-120 para 110-155 min (fórmula fixa; a original era SUBESTIMADA).

```json
{
  "id": "2.4", "modulo": "m02", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Camada 2 — Enlace: frames, MAC, switch, VLAN e ARP",
  "duracao_declarada": "85-120 min", "T_original_min": 142.6, "duracao_nova": "110-155 min", "veredito_duracao": "SUBESTIMADA",
  "T_nova_min": 129.2, "duracao_nova_estimated_max": 155,
  "linguica_nivel": "MÉDIA", "linguica_pct": 16, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 9, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4918, "palavras_visiveis_depois": 5406,
  "palavras_invisiveis_antes": 738, "palavras_invisiveis_depois": 31,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "FUNDIR:problem",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "ENXUGAR", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "protocolFields": "MOVER:content.internals", "packetFlow": "MOVER:content.internals",
    "deepDive": "MOVER:content.summary", "commonMistakes": "MOVER:content.concept",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "ENXUGAR",
    "mentorQuestions": "ENXUGAR", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.estimatedTimeMinutes reduzido de 60 para 45 por julgamento",
    "saídas de exemplo de ip neigh e show mac address-table escritas no formato padrão, com valores ilustrativos: conferir com saída real",
    "descrição resumida dos estados REACHABLE/STALE/FAILED/INCOMPLETE do Linux",
    "lab.troubleshooting, lab.challenge e lab.solution removidos por duplicação (consolidados em troubleshooting, challenge e commentedSolution)",
    "duração declarada sobe de 85-120 para 110-155 min (original SUBESTIMADA)"
  ]
}
```
