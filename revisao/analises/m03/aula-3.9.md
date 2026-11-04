# Aula 3.9 — Segurança em L2: ARP spoofing, MAC flooding e defesas
Tipo: fundamental (segurança defensiva) · Duração declarada: 90-130 min · Palavras visíveis / invisíveis (antes): 4660 / 764

## 1. Duração
T pela fórmula = 122,8 min (teoria 20,1, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 40,8)
Veredito: ORGANIZADA. M = 110 está dentro de [98; 147]. A divisão (16% de leitura, o resto prática) combina com uma aula cujo objetivo final é montar uma matriz defensiva. Único problema: `lab.estimatedTimeMinutes` = 90 não é plausível para 7 passos de documentação (alternativa de 40,8 min). Na nova versão ficou 40.

## 2. Encheção de linguiça
Nível: MÉDIA (~21%, cerca de 980 palavras visíveis). Evidências:
- `history`: "menos dispositivos, menos mobilidade, menos ameaças internas, menos automação…" e a lista do que "surgiram controles como…" repetem `problem` e `security.hardening`.
- `evolution`: tabela de fases ("Hub/rede compartilhada… Switch básico…") que só lista de novo os controles do `hardening`.
- `problem` (lista de 5 riscos), `securityExample` (tabela de 5 riscos) e `security.vulnerabilities` descrevem os mesmos riscos três vezes.
- Exemplos genéricos: `cloudExample` ("o conceito continua útil: há redes virtuais, NICs virtuais…"), `devsecopsExample` ("pipelines falham com sintomas que parecem de DNS, TLS…"), `simpleExample` doméstico ("usar WPA2/WPA3, atualizar firmware").
- `analogy`: o limite da analogia ocupa 3 frases.
- Ritual de lab: `analysisTask` "Produza o artefato indicado na instrução do passo…" (frase repetida em 56 aulas) em 3 passos; `lab.challenge` e `lab.solution` repetem `challenge` e `commentedSolution.finalAnswer`.
- Sobreposição de prática: `exercises[0]` (VLAN não substitui firewall) = flashcard 1 = pergunta do lab; `exercises[2]` (portas de sala de reunião) está contido no `challenge`; `mentorQuestions[1]` (gateway com dois MACs) = `exercises[1]`.
- Conteúdo útil guardado em campos invisíveis: `protocolFields`, `packetFlow`, `deepDive` e `commonMistakes` (~600 palavras).

## 3. Conteúdo útil
PARCIAL. O núcleo técnico está correto: ARP sem autenticação, MAC flapping com causas legítimas, HSRP/VRRP como falso positivo, DAI depende de DHCP snooping, piloto e rollback, sanitização. O troubleshooting é bom. Lacunas: o mecanismo dos dois riscos do título não é explicado (MAC flooding só "pressiona a tabela CAM"; não diz que a tabela cheia faz o switch inundar a VLAN, nem que o host aceita ARP não solicitado); os controles aparecem só como nomes (não diz o que DHCP snooping, IP Source Guard, Root Guard ou storm control verificam); não há nenhuma saída de comando para interpretar (objetivo 4); o learningOutcome "separa detecção, contenção, erradicação e prevenção" não é coberto em lugar nenhum. O quiz tem distratores absurdos ("ARP define rotas BGP", "aumentar MTU") e todas as respostas na opção 0. Nenhum erro técnico.

## 4. Aproveitamento
BOM (~85%). Contra o T original (122,8 min), cerca de 7 min de teoria é linguiça, ~6 min vão para exercícios repetidos, ~2 min para questões triviais e ~2 min para ritual de lab: ~17 min (~14%). Contra a duração declarada (M = 110) o resultado é parecido (~84%).

## 5. Pode ser mais curta?
NÃO: redução prevista de ~5% (só os cortes dariam ~11%; parte do ganho foi para o mecanismo e para as evidências que faltavam). Realizada: 122,8 → 116,9 min (−4,8%).

## 6. Explicação mais direta
SIM. (a) Os três lugares que descreviam os riscos (`problem` em lista, `securityExample` em tabela e `vulnerabilities`) viram uma tabela única em `concept` (mecanismo, sinal, impacto); `vulnerabilities` fica só com a mitigação, em texto curto. (b) A frase solta de `internals` ("port security limita MACs, DHCP snooping cria base confiável…") virou tabela de controles em `architecture` (o que faz, risco, cuidado). (c) Cada risco do título ganhou um parágrafo de mecanismo em `internals`. (d) O exemplo doméstico genérico deu lugar a uma leitura concreta de `ip neigh` e `show mac address-table`.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantido o cenário de alertas; o segundo parágrafo e o callout foram encurtados. |
| history | FUNDIR:problem | Só valia "switch não nasceu como ferramenta de segurança; controles vieram depois" (2 frases). Hub/unknown unicast foi para internals. |
| problem | ENXUGAR | Fica a lista de comportamentos confiantes da LAN; a lista de 5 riscos foi para a tabela de concept. |
| evolution | REMOVER | Repetia hardening; MAB e postura estão em architecture; Syslog/SNMP/NetFlow foram para security.monitoring. |
| concept | ENXUGAR + receber tabela | Definição mantida; tabela de 5 riscos (fundida de problem, securityExample e vulnerabilities). |
| internals | MANTER + MOVER | O fluxo virou flow-list com packetFlow ("onde falha"); mecanismo de MAC flooding e de ARP spoofing; tabela de protocolFields. |
| architecture | ENXUGAR + MOVER | Tabela de controles (deepDive.limitations/whenNotToUse e commonMistakes de DAI); callout de implantação (operational/financialImpact, whenToUse); cloud em 2 frases. |
| analogy | ENXUGAR | Um parágrafo; o limite cabe em 1 frase. |
| simpleExample | ENXUGAR (reescrito) | O exemplo doméstico era genérico; agora mostra a leitura de evidência com valores e o falso positivo HSRP/VRRP. |
| enterpriseExample | ENXUGAR (reescrito) | Porta de sala de reunião (original) com as quatro fases de resposta (learningOutcome 5). |
| cloudExample | FUNDIR:architecture | A abstração de L2 em cloud e os hypervisors ficaram em 2 frases; o resto era genérico. |
| devsecopsExample | REMOVER | Genérico; "falha de L2 parece DNS/TLS" já está em internals. |
| securityExample | FUNDIR:concept | A tabela de riscos virou a tabela de concept; as mitigações estão em security e architecture. |
| diagram | MANTER | Correto; só o número do h2 foi retirado. |
| labIntro | REMOVER | Invisível; o conteúdo já está em lab.objective. |
| exercisesIntro | REMOVER | Invisível, ritual. |
| challengeIntro | REMOVER | Invisível; repete challenge.scenario. |
| solutionIntro | REMOVER | Invisível; repete commentedSolution.reasoning. |
| summary | ENXUGAR/REESCREVER | 5 bullets; o primeiro é o deepDive.mentalModel. |
| nextTheme | ENXUGAR | 1 frase com o título real da 3.10. |
| networkContext | MANTER | Metadado. |
| protocolFields | MOVER:internals | Tabela "Campos que você observa". |
| packetFlow | MOVER:internals | Itens do flow-list com "onde falha". |
| deepDive | MOVER:summary/architecture/security | mentalModel → summary; limitations/whenNotToUse → coluna "Cuidado"; operational/financialImpact e whenToUse → callout; keyTerms já estão no glossário; securityImpact é genérico. |
| commonMistakes | MOVER:security.commonErrors/architecture | VLAN≠firewall, portas públicas e MAC flapping → commonErrors; DAI sem snooping/IP estático → tabela de controles e quiz q3.9.7. |
| security | ENXUGAR + FUNDIR | goodPractices sem repetir o hardening; badPractices sem os itens já cobertos; commonErrors com commonMistakes; vulnerabilities enxutas; monitoring com Syslog/SNMP/NetFlow. |
| troubleshooting | MANTER + ajustes | `ss -tulpen` removido (não é L2); `show interfaces trunk` incluído; ramo novo para err-disabled. |
| lab | ENXUGAR | Saem os analysisTask ritual, lab.challenge/solution (duplicados), 1 item de troubleshooting duplicado e 1 pergunta duplicada; estimatedTimeMinutes 90 → 40; `show interfaces trunk` incluído no passo 5. |
| quiz | MANTER (reescrito) | Distratores plausíveis; q3.9.1 (decoreba) e q3.9.6 (ética trivial) trocadas por q3.9.8 (efeito do MAC flooding) e q3.9.7 (DAI × IP fixo); gabarito variado. |
| flashcards | MANTER (2 trocados) | fc3.9.2 (repetia o quiz q4) → fc3.9.8 DHCP snooping; fc3.9.6 (sanitização, já no lab) → fc3.9.7 BPDU Guard; o verso de fc3.9.3 ficou mais preciso. |
| mentorQuestions | MANTER (1 trocado) | O 2º (repetia ex3.9.2) foi trocado por port security × legados. |
| exercises | ENXUGAR | ex3.9.1 (repetia flashcard/lab) → ex3.9.5 (fases de resposta); ex3.9.3 removido (contido no challenge e no exemplo empresarial). 4 → 3. |
| challenge | MANTER | Bom; rubrica de 100 pontos. |
| commentedSolution | MANTER | Bom. |
| glossary | MANTER | Os 6 termos são usados. |
| references | MANTER | Reais. |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | L2 é superfície de risco: o pacote passa por porta, switch, VLAN e ARP antes do firewall | MANTIDO | motivation |
| 2 | Mecanismos da LAN confiam em comportamento local (aprendizado MAC, ARP sem autenticação, porta ativa, broadcast) | MANTIDO | problem |
| 3 | Hub: todos viam quase tudo; switch entrega só o tráfego destinado à porta + broadcast/multicast/unknown unicast | MANTIDO | problem + internals (MAC flooding) |
| 4 | Switch não nasceu como ferramenta de segurança; os controles vieram depois | MANTIDO | problem |
| 5 | Definição de segurança L2 (reduzir manipulação, indisponibilidade, observação, desvio, movimento lateral) | MANTIDO | concept |
| 6 | L2 não substitui firewall/EDR/IAM/TLS/L3-4; sustenta | MANTIDO | concept |
| 7 | ARP spoofing: associação IP-MAC indevida desvia, intercepta ou interrompe | MANTIDO | concept (tabela), internals, vulnerabilities |
| 8 | MAC flooding pressiona a tabela CAM → instabilidade/exposição na VLAN | MANTIDO | concept, internals |
| 9 | Porta não autorizada, trunk permissivo (VLAN 1, native VLAN), loop de L2 | MANTIDO | concept (tabela) |
| 10 | Sinais: gateway muda de MAC, alertas de duplicidade, muitos MACs/porta, MAC flapping, CPU alta, storm | MANTIDO | concept, troubleshooting |
| 11 | Fluxo: aprendizado MAC, forwarding, flooding, ARP Request broadcast/Reply, trunks, STP | MANTIDO | internals (flow-list) |
| 12 | Falha L2 aparece como problema de IP/DNS/aplicação/autenticação | MANTIDO | internals |
| 13 | Sem logging centralizado a investigação vira suposição | MANTIDO | internals (última frase), security.goodPractices |
| 14 | Campos: Source/Destination MAC 48 bits, ARP SPA 32 bits, VLAN ID 12 bits, BPDU | MANTIDO | internals (tabela) |
| 15 | Port security limita MACs; não substitui identidade forte | MANTIDO | architecture (tabela) |
| 16 | DHCP snooping cria base confiável (bindings) | MANTIDO | architecture, flashcard fc3.9.8, glossário |
| 17 | DAI valida ARP com base no DHCP snooping; IP estático exige binding | MANTIDO | architecture, quiz q3.9.4/q3.9.7, glossário |
| 18 | IP Source Guard, Root Guard, storm control | MANTIDO | architecture (tabela), hardening |
| 19 | BPDU Guard + PortFast em portas de acesso | MANTIDO | architecture, hardening, fc3.9.7 |
| 20 | 802.1X/NAC, MAB controlado, VLAN de quarentena, postura | MANTIDO | architecture, glossário, mentor 3 |
| 21 | Trunks: allowed VLANs mínimas, native VLAN sem uso | MANTIDO | architecture, quiz q3.9.5, ex3.9.4 |
| 22 | VLAN não é firewall; política inter-VLAN no gateway/firewall | MANTIDO | commonErrors, fc3.9.1, summary |
| 23 | Implantação: inventário, piloto, janela, rollback, exceções de legados, mais chamados no início | MANTIDO | callout em architecture, lab passo 6, mentor 3 |
| 24 | Custo: switches gerenciáveis, licenças NAC; equipamento barato vira dívida operacional | MANTIDO (resumido) | callout em architecture ("licenças NAC/SIEM" cortado por ser genérico) |
| 25 | Onde aplicar primeiro: portas públicas, visitantes, IoT, impressoras, câmeras, BYOD, segmentos críticos | MANTIDO | callout em architecture |
| 26 | MAC flapping ≠ ataque: loop, virtualização, redundância | MANTIDO | concept, commonErrors, fc3.9.5 |
| 27 | Gateway com MAC diferente: HSRP/VRRP/GLBP legítimo | MANTIDO | simpleExample, decisionTree, ex3.9.2 |
| 28 | Muitos MACs/porta: mini-switch, telefone IP, hypervisor, bridge | MANTIDO | quiz q3.9.3, decisionTree, mentor 2 |
| 29 | Comandos Windows/Linux (arp -a, ipconfig /all, getmac /v, ip neigh/link/route) e REACHABLE/STALE/FAILED/INCOMPLETE | MANTIDO | troubleshooting |
| 30 | `ss -tulpen` | REMOVIDO | fora do escopo (serviços locais, não L2) |
| 31 | Comandos Cisco (show mac address-table, arp, interfaces status/counters errors, port-security, dhcp snooping binding, spanning-tree) | MANTIDO | troubleshooting, lab passo 5 |
| 32 | Confundir ARP com DNS; MAC não é identidade; legados/IoT; sanitizar PCAPs | MANTIDO | commonErrors, tabela de controles |
| 33 | Monitoramento (MAC flapping, MACs/porta, BPDU, ARP, storm, NAC/DHCP, Syslog/SNMP/NetFlow/SIEM) | MANTIDO | security.monitoring |
| 34 | Cloud pública abstrai L2 (SG/NSG); hypervisors, bridges e containers têm L2 | MANTIDO | architecture (último parágrafo) |
| 35 | Incidente de L2 no datacenter afeta VPN/ExpressRoute/clusters; CNI e redes de storage | REMOVIDO | genérico, não ensina mecanismo |
| 36 | DevSecOps: runners/registries em VLANs, Terraform não cobre o físico | REMOVIDO | genérico; o ponto "parece DNS/TLS" está no item 12 |
| 37 | Exemplo doméstico (roteador multifunção, WPA2/WPA3, rede de visitantes) | REMOVIDO | genérico; segurança Wi-Fi está fora do escopo da aula |
| 38 | Tabela de evolução por fases | REMOVIDO | duplicada do hardening e da tabela de controles |
| 39 | Lab: escopo, coleta, matriz, controles, evidências, plano de implantação, sanitização | MANTIDO | lab passos 1–7 |
| 40 | Ética: não executar ataques; só ambiente próprio/autorizado | MANTIDO | lab.safetyNotes, lab.prerequisites, problem |
| 41 | Analogia do prédio | MANTIDO (enxuta) | analogy |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que a Camada 2 é superfície crítica de segurança | motivation, problem, concept (definição), mentor 1 |
| Diferenciar ARP spoofing, MAC flooding, porta não autorizada, trunk indevido e loop | concept (tabela dos 5 riscos), internals (mecanismos), quiz q3.9.8/q3.9.2/q3.9.5, fc3.9.3 |
| Relacionar port security, DHCP snooping, DAI, BPDU Guard, storm control, 802.1X e NAC | architecture (tabela de controles), quiz q3.9.4/q3.9.7, fc3.9.7/fc3.9.8/fc3.9.4, mentor 2 e 3 |
| Interpretar evidências de switch, ARP, MAC table e logs sem ações ofensivas | simpleExample, internals (campos), troubleshooting, quiz q3.9.3, ex3.9.2, ex3.9.5 |
| Projetar uma matriz de riscos e defesas para uma LAN pequena | lab (passos 3–6), ex3.9.4, challenge, commentedSolution |
| (learningOutcome) Separar detecção, contenção, erradicação e prevenção | enterpriseExample, ex3.9.5 |

## 10. O que mudou na nova versão
- 9 seções de content removidas ou fundidas (history, evolution, cloud, devsecops, securityExample e os 4 intros invisíveis); a lista de riscos, que aparecia 3 vezes, virou uma tabela única em concept.
- Campos invisíveis movidos: protocolFields → tabela em internals; packetFlow → flow-list em internals; deepDive → summary, coluna "Cuidado" e callout de implantação; commonMistakes → security.commonErrors e tabela de controles. Restou só networkContext.
- Quiz reescrito com distratores plausíveis e gabarito variado (posições 1, 0, 1, 3, 2, 0); 2 questões trocadas, total mantido (6).
- Flashcards 6 → 6 (2 trocados), mentor 3 → 3 (1 trocado), exercícios 4 → 3 (1 trocado, 1 removido por duplicidade).
- Lab: ritual removido, lab.challenge/lab.solution removidos (duplicavam challenge/commentedSolution), estimatedTimeMinutes 90 → 40 (7 passos de documentação; alternativa da fórmula = 39,9).
- **Acréscimos novos (não movidos), com justificativa:**
  - Parágrafos de mecanismo de MAC flooding (tabela cheia → flooding na VLAN, "volta a ser hub") e de ARP spoofing (o host aceita resposta não solicitada; alcance limitado ao domínio de broadcast; o TLS protege o conteúdo): objetivo 2 (diferenciar riscos). O original só dizia "pressiona a tabela CAM".
  - Na tabela de controles, a coluna "O que faz" para DHCP snooping (descarta resposta de servidor em porta não confiável), IP Source Guard, Root Guard, storm control (limiar) e BPDU Guard (err-disabled): objetivo 3 (relacionar controles). O original só listava os nomes. A coluna "Cuidado" é quase toda conteúdo movido.
  - simpleExample com saída ilustrativa de `ip neigh` e `show mac address-table` e prefixos de MAC virtual HSRP/VRRP: objetivo 4 (interpretar evidências). O original não tinha nenhuma saída. Substitui o exemplo doméstico, não soma.
  - enterpriseExample com as 4 fases e o exercício ex3.9.5: learningOutcome 5, sem cobertura no original. Entram no lugar de texto genérico e de um exercício repetido.
  - Troubleshooting: `show interfaces trunk` (a resposta do ex3.9.4 já citava esse comando) e ramo "porta em err-disabled": objetivo 4.
- Visíveis: 4660 → 4879 (+4,7%). O saldo positivo vem dos ~600 palavras movidas de campos invisíveis; somando visíveis e invisíveis, o total cai de 5424 para 4915 (−9%). T: 122,8 → 116,9 min.

## 11. Depois
Palavras visíveis: 4660 → 4879 (+4,7%; invisíveis 764 → 36) · Duração: 90-130 min → 100-140 min (T 122,8 → 116,9; a faixa sobe porque a declarada original ficava abaixo da recomendada de 105-145) · Quiz corrigido: sim (6 questões)

## 12. Revisão humana
- simpleExample usa saídas **ilustrativas** (valores fictícios) de `ip neigh` e `show mac address-table address`, além dos prefixos de MAC virtual 0000.0c07.acXX (HSRP) e 0000.5e00.01XX (VRRP). Conferir o formato.
- Quiz q3.9.1 e q3.9.6 foram substituídos (validar avisa ids ausentes). Respostas salvas dessas duas questões ficam órfãs.
- Exercícios 4 → 3 (ex3.9.1 trocado por ex3.9.5; ex3.9.3 removido por estar contido no challenge e no exemplo empresarial).
- lab.estimatedTimeMinutes 90 → 40, pela fórmula. Confirmar se o autor previa execução em Packet Tracer/GNS3 que justificasse mais tempo.
- `duration` sobe de 90-130 para 100-140 min (regra 11.6), embora o T tenha caído.
- glossary["DHCP snooping"].relatedLessons contém o placeholder "7.x" (mantido; a busca indexa esse campo).
- Os detalhes dos controles seguem a terminologia Cisco (err-disabled, PortFast, MAB). Outros fabricantes usam nomes diferentes.

```json
{
  "id": "3.9", "modulo": "m03", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Segurança em L2: ARP spoofing, MAC flooding e defesas",
  "duracao_declarada": "90-130 min", "T_original_min": 122.8, "duracao_nova": "100-140 min", "T_nova_min": 116.9, "duracao_nova_estimated_max": 140, "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 21, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 4.8, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4660, "palavras_visiveis_depois": 4879,
  "palavras_invisiveis_antes": 764, "palavras_invisiveis_depois": 36,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "ENXUGAR", "enterpriseExample": "ENXUGAR", "cloudExample": "FUNDIR:architecture",
    "devsecopsExample": "REMOVER", "securityExample": "FUNDIR:concept", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals",
    "deepDive": "MOVER:summary/architecture", "commonMistakes": "MOVER:security.commonErrors",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "MANTER",
    "flashcards": "MANTER", "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER",
    "commentedSolution": "MANTER", "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "simpleExample usa saídas ilustrativas de ip neigh/show mac address-table e prefixos de MAC virtual HSRP/VRRP: conferir formato",
    "quiz q3.9.1 e q3.9.6 substituídos por q3.9.8 e q3.9.7 (respostas salvas órfãs)",
    "exercícios 4 -> 3 (ex3.9.3 removido por duplicidade; ex3.9.1 trocado por ex3.9.5)",
    "lab.estimatedTimeMinutes 90 -> 40 pela fórmula",
    "duration sobe para 100-140 min pela regra 11.6 apesar de T cair",
    "glossary DHCP snooping relatedLessons contém placeholder 7.x",
    "terminologia dos controles é Cisco (err-disabled, PortFast, MAB)"
  ]
}
```
