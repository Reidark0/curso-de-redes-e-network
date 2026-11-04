# Aula 3.3 — Switches: aprendizado MAC, forwarding e flooding
Tipo: fundamental · Duração declarada: 90-125 min · Palavras visíveis / invisíveis (antes): 4909 / 766

## 1. Duração
T pela fórmula = 142,7 min (teoria 20,7, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 60)
Veredito: SUBESTIMADA — M = 107,5 min é 0,75×T. Mas quase toda a diferença vem do lab: ele declara 60 min para 6 passos curtos (getmac, ping, arp, desenhar uma tabela, um `show` opcional, listar hipóteses), e a alternativa de 5 min por passo mais a leitura dá ~36 min. Com o lab em 40 min, o T original seria ~123 min e a duração declarada seria ORGANIZADA. A divisão teoria (17%) × prática faz sentido para uma aula fundamental com lab local.

## 2. Encheção de linguiça
Nível: MÉDIA (~19%). Evidências:
- `motivation`, 2º parágrafo: meta-texto ("Essa aula responde a uma das perguntas mais importantes da Camada 2", "O switch não é apenas uma 'régua de rede'").
- `history`, 3º parágrafo: lista de recursos ("VLANs, trunks, STP, agregação de links, ACLs, port security, 802.1X, QoS, espelhamento de porta…") que não ajuda a entender o aprendizado MAC; os dois primeiros parágrafos repetem o `problem`.
- `evolution`: a frase de abertura é genérica ("tentativa de reduzir ruído operacional…") e a tabela repete hub × switch do `history`; a linha "switch virtual/overlay" repete `architecture` e `cloudExample`.
- `devsecopsExample`: genérico ("Um pipeline pode falhar… por causa de rota, DNS ou firewall, mas também por causa de VLAN errada"; "IaC e automação ajudam a documentar…").
- `cloudExample` × último parágrafo de `architecture`: a mesma ideia ("o switch físico desaparece… reaparece em hypervisors, bridges, vSwitches") dita duas vezes.
- `securityExample`: a tabela de riscos repete `security.vulnerabilities`/`hardening` (MAC flooding, MAC flapping, porta física) e termina com aviso de ética ("O foco aqui é defensivo…") que o `lab.safetyNotes` já traz.
- Erro comum "flooding é sempre ataque" dito em `summary`, `security.commonErrors`, `commonMistakes` e `commentedSolution`.
- `lab`: `analysisTask` com a frase-padrão de 56 aulas ("Produza o artefato indicado na instrução do passo…"); `lab.troubleshooting` itens 2-3 repetem `troubleshooting.decisionTree`; `lab.challenge`/`solution` repetem o passo 6 e o `challenge`; `lab.questions` repetem quiz q3.3.4/q3.3.6 e `ex3.3.1`.
- Prática duplicada: MAC alternando entre duas portas é perguntado em 5 lugares (`ex3.3.2`, `mentorQuestions[1]`, `quiz q3.3.5`, `lab` passo 6, `lab.challenge`); porta de usuário com muitos MACs em 3 (`ex3.3.4` com 40 MACs, `mentorQuestions[2]` com 80 MACs, `decisionTree`).
- `security`: `goodPractices` repete `hardening` (802.1X/NAC, port security) e `monitoring` ("Monitorar MAC flapping, link flap, STP changes e muitos MACs por porta").
- Conteúdo útil guardado em campos invisíveis: tamanhos dos campos (`protocolFields`), o passo a passo A→B com falhas (`packetFlow`), `commonMistakes` e `deepDive.mentalModel` (766 palavras invisíveis).

## 3. Conteúdo útil
PARCIAL. O que tem de realmente valioso: a regra "aprende pela origem, decide pelo destino"; forwarding × filtering × flooding × broadcast; aging; tabela por VLAN e trunk; MAC flapping e muitos MACs por porta como sintomas com várias causas legítimas; comandos Cisco/Windows/Linux com interpretação; árvore de decisão; desafio com rubrica.
Lacunas: (1) o passo a passo concreto de um frame (A na porta 1 → B) estava só no `packetFlow` invisível; (2) filtering (objetivo 3) aparece numa frase do `concept` e em nenhuma prática; (3) o efeito do aging (o destino volta a ser inundado) aparece só no glossário; (4) o mecanismo de MAC flooding (tabela cheia → unknown unicast inundado → tráfego exposto) fica vago ("pressionar a tabela").
Erros técnicos: nenhum relevante. Distratores do quiz fracos ("Switch só funciona com Wi-Fi", "Erro de senha HTTP", "VLAN é sempre Camada 7").

## 4. Aproveitamento
MÉDIO (~74% contra o T original de 142,7 min). Tempo sem retorno: ~5,5 min de leitura de linguiça, ~20 min de sobra no lab (60 declarados para ~40 de trabalho real) e ~12 min em dois exercícios que repetem perguntas do mentor. Contra a duração declarada (M = 107,5) o desperdício pesa ainda mais (~34%), porque a declarada já não contava o lab inflado.

## 5. Pode ser mais curta?
SIM — redução prevista: ~20%; obtida: 19,7% (T 142,7 → 114,6 min), sem perder item do inventário.

## 6. Explicação mais direta
SIM — (a) `history` + `evolution` + `problem` contavam três vezes "hub repete, switch aprende": ficou um parágrafo no `problem`. (b) O `concept` descrevia as quatro ações em prosa e o `internals` repetia em lista: virou uma tabela "MAC de destino → ação → por onde sai" no `concept`, e o `internals` passou a ter o caso concreto A→B (antes invisível) com a coluna "o que pode falhar". (c) Aging e VLAN, antes enterrados no fim do `internals`, viraram dois parágrafos curtos com rótulo. (d) `cloudExample` + `devsecopsExample` + último parágrafo de `architecture` viraram um parágrafo só em `architecture`.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Cenário do notebook e callout mantidos; meta-texto cortado; o 2º parágrafo virou a resposta em uma frase. |
| history | FUNDIR:problem | Hub × switch em 2 frases no `problem`; a lista de recursos de switches gerenciáveis saiu (não explica o mecanismo). |
| problem | ENXUGAR | Recebeu o hub × switch; lista "sem X" mantida; limites (não roteia, não substitui firewall/IAM) em uma frase. |
| evolution | REMOVER | Tabela repetia hub × switch; a linha virtual/overlay já está em `architecture`. |
| concept | MANTER + MOVER | Definição mantida; tabela das quatro ações; recebeu o callout "Erros comuns" (`commonMistakes`); CAM table citada. |
| internals | ENXUGAR + MOVER | Recebeu `protocolFields` (tabela de campos) e `packetFlow` (passo a passo com falhas); aging e VLAN em parágrafos rotulados. |
| architecture | ENXUGAR + FUNDIR | Acesso/distribuição/core e lista mantidos; recebeu o essencial de `cloudExample` e as bridges do Docker de `devsecopsExample`. |
| analogy | ENXUGAR | Analogia mantida; limite em 1 frase. |
| simpleExample | MANTER | Concreto (gateway, ARP Request em broadcast). |
| enterpriseExample | ENXUGAR | Mesmas perguntas e sinais, com menos palavras. |
| cloudExample | FUNDIR:architecture | Provedor controla a L2 contra sniffing/ARP spoofing; diagnóstico de VM com MAC virtual e bridge. |
| devsecopsExample | REMOVER | Genérico; só "Docker bridges" foi para `architecture`. |
| securityExample | FUNDIR:security | A linha "flooding excessivo" virou `security.vulnerabilities`; o resto já estava em `security`; aviso de ética já está no `lab.safetyNotes`. |
| diagram | MANTER | Correto e legível; só o número do `<h2>` saiu. |
| labIntro | REMOVER | Invisível, ritual. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | MANTER (reescrito) | 5 bullets; o primeiro é o `deepDive.mentalModel`; inclui filtering e aging. |
| nextTheme | ENXUGAR | 1 frase coerente com a 3.4 ("Domínios de colisão, broadcast e hub vs switch"). |
| protocolFields | MOVER:content.internals | MAC de origem/destino 48 bits, VLAN ID 12 bits; EtherType removido (não entra na decisão L2, visto na 3.2). |
| packetFlow | MOVER:content.internals | Tabela de 5 passos com "o que pode falhar". |
| deepDive | MOVER:summary | mentalModel → summary; limitations/whenNotToUse → `problem` e callout; securityImpact → `security.vulnerabilities`; operationalImpact → `security.monitoring` (link flap); keyTerms → glossário; financialImpact removido (genérico). |
| commonMistakes | MOVER:content.concept | Callout "Erros comuns" (4 itens, com causa e correção). |
| networkContext | MANTER | Metadado. |
| security | ENXUGAR + FUNDIR | Cortadas as `goodPractices` que repetiam `hardening`/`monitoring`; "port security proporcional e testado" foi para `hardening`; MAC flooding com o mecanismo explícito; nova vulnerabilidade "Flooding excessivo e loops" (de `securityExample`). |
| troubleshooting | MANTER | Comandos e árvore de decisão; ramo de flooding recebeu "tabela saturada, contadores, captura autorizada" de `lab.troubleshooting`. |
| lab | ENXUGAR | `estimatedTimeMinutes` 60 → 40; safetyNotes 4 → 3; `analysisTask` específico; `lab.troubleshooting` 3 → 1; `lab.challenge`/`solution` removidos (a solução virou o `expectedOutput` do passo 6); improvements e questions trocados por itens ligados aos passos. |
| quiz | ENXUGAR | 6 questões; q3.3.4 (MAC identidade, igual a fc3.3.5) trocada por q3.3.7 (broadcast por VLAN); distratores plausíveis em todas. |
| flashcards | ENXUGAR | 6; fc3.3.1 (igual a q3.3.1) trocado por fc3.3.7 (filtering). |
| mentorQuestions | MANTER | 3; `expectedIdeas` receberam as hipóteses de `ex3.3.2` e o checklist de `ex3.3.4`. |
| exercises | ENXUGAR | 4 → 3: `ex3.3.2` e `ex3.3.4` repetiam o mentor; `ex3.3.3` ("desenhe uma tabela", vago) virou `ex3.3.5` (tabela MAC concreta com as quatro ações); novo `ex3.3.6` (aging). |
| challenge | MANTER | Cenário integrador com rubrica de 100 pontos. |
| commentedSolution | MANTER | Passos e respostas erradas comuns são específicos. |
| glossary | MANTER | Os 6 termos são usados na aula. |
| references | MANTER | Reais. |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Hub repete bits para todas as portas, não aprende MAC | MANTIDO | problem; quiz q3.3.3 |
| 2 | Meio compartilhado/hub: um domínio de colisão, tráfego visível a todos | MANTIDO | problem |
| 3 | Switch aprende e envia só pela porta necessária, reduz colisões e exposição, faz a LAN escalar | MANTIDO | problem |
| 4 | Lista de recursos de switches gerenciáveis (trunks, LACP, ACL, QoS, espelhamento…) | REMOVIDO | fora do escopo: lista histórica sem mecanismo; os recursos de segurança estão em `security.hardening` |
| 5 | Cinco necessidades: aprendizado, forwarding seletivo, flooding, aging, VLAN | MANTIDO | problem (flow-list) |
| 6 | Switch L2 não roteia sem função L3; não substitui firewall/IAM/criptografia | MANTIDO | problem; architecture |
| 7 | Definição de switch Ethernet | MANTIDO | concept |
| 8 | Aprendizado pelo MAC de origem → porta e VLAN | MANTIDO | concept (definition-box), internals passo 2, quiz q3.3.1, ex3.3.1 |
| 9 | CAM table = tabela MAC | MANTIDO | concept; glossário |
| 10 | Forwarding para a porta conhecida | MANTIDO | concept (tabela), fc3.3.2, ex3.3.5 |
| 11 | Filtering: destino na mesma porta de entrada | MANTIDO | concept (tabela), fc3.3.7, ex3.3.5(d) |
| 12 | Unknown unicast flooding na VLAN, exceto a porta de entrada | MANTIDO | concept, internals, quiz q3.3.2, ex3.3.5(c) |
| 13 | Broadcast ff:ff:ff:ff:ff:ff para a VLAN, exceto a porta de entrada; multicast conforme o caso | MANTIDO | concept, quiz q3.3.7, ex3.3.5(b), fc3.3.3 |
| 14 | O switch não abre HTTP/TLS para encaminhar | MANTIDO | internals |
| 15 | MAC de origem/destino 48 bits; VLAN ID 12 bits no tag 802.1Q | MANTIDO | internals (tabela de campos, movida de `protocolFields`) |
| 16 | EtherType 16 bits | REMOVIDO | fora do escopo: não participa da decisão de encaminhamento; ensinado na 3.2 |
| 17 | Passo a passo A (porta 1) → B, com falha possível por etapa | MANTIDO | internals (movido de `packetFlow`) |
| 18 | Aging time: entrada dinâmica expira e o destino volta a ser inundado | MANTIDO | internals, summary, fc3.3.6, ex3.3.6, glossário |
| 19 | Entradas dinâmicas × estáticas | MANTIDO | internals |
| 20 | Tabela separada por VLAN; mesmo MAC em VLANs diferentes; trunk | MANTIDO | internals, quiz q3.3.6 |
| 21 | Acesso, distribuição e core | MANTIDO | architecture |
| 22 | Componentes, dependências e pontos de falha | MANTIDO | architecture |
| 23 | Cloud: vSwitch, bridges, CNI, VXLAN; provedor controla L2 contra sniffing/ARP spoofing; VM com MAC virtual/bridge | MANTIDO | architecture (fundido de `cloudExample` e `evolution`) |
| 24 | DevSecOps: pipeline/registry, IaC não dispensa entender L2 | REMOVIDO | genérico; o que era específico (bridges do Docker) está em architecture |
| 25 | Analogia do porteiro e seu limite | MANTIDO | analogy |
| 26 | ARP Request em broadcast ao conectar um dispositivo | MANTIDO | simpleExample |
| 27 | Perguntas que a tabela MAC responde; muitos MACs normais em uplink/AP | MANTIDO | enterpriseExample |
| 28 | Erros comuns (switch = hub; flooding = ataque; MAC = identidade; ignorar VLAN) | MANTIDO | concept (callout, movido de `commonMistakes`); summary |
| 29 | Modelo mental "central de entrega local" | MANTIDO | summary (movido de `deepDive`) |
| 30 | MAC não é identidade forte (alterado, clonado, virtualizado) | MANTIDO | callout, internals, fc3.3.5, analogy |
| 31 | MAC flooding: tabela cheia → unknown unicast inundado → tráfego exposto | MANTIDO | security.vulnerabilities (mecanismo explicitado) |
| 32 | MAC flapping: loop, bridge, VM, AP, uplink, docking, cabeamento | MANTIDO | enterpriseExample, security, decisionTree, quiz q3.3.5, mentor q2, fc3.3.4 |
| 33 | Porta física não controlada → 802.1X/NAC, quarentena, desabilitar ociosas | MANTIDO | security |
| 34 | Flooding excessivo: segmentação, correção de loop, STP, storm control | MANTIDO | security.vulnerabilities (movido de `securityExample`) |
| 35 | Hardening: port security proporcional, 802.1X/NAC, storm control, BPDU Guard, DTP | MANTIDO | security.hardening |
| 36 | Monitoramento: MAC move, err-disabled, STP TC, link flap, broadcast elevado, mudanças fora de janela | MANTIDO | security.monitoring |
| 37 | Comandos getmac/arp/ipconfig, ip link/neigh/route, show mac address-table/interfaces/logging, show spanning-tree | MANTIDO | troubleshooting.commands; lab |
| 38 | Árvore de decisão (MAC ausente, flapping, muitos MACs, flooding persistente) | MANTIDO | troubleshooting.decisionTree |
| 39 | Muitos MACs em porta de usuário: checar função, AP, telefone, mini-switch, hypervisor, trunk, inventário, NAC, VLAN, horário | MANTIDO | mentor q3 (recebeu o checklist de `ex3.3.4`), decisionTree, challenge |
| 40 | Investigar flapping sem parar produção: logs de MAC move, STP, topologia, inventário; bloqueio só com evidência | MANTIDO | lab passo 6 (movido de `lab.solution`), commentedSolution |
| 41 | `lab.troubleshooting` "MAC em várias portas" e "flooding alto" | REMOVIDO | duplicado em `troubleshooting.decisionTree` (o ramo de flooding recebeu "tabela saturada, contadores, captura autorizada") |
| 42 | Impacto financeiro de switches gerenciáveis/NAC | REMOVIDO | genérico, invisível |
| 43 | Contenção proporcional; desligar tudo é errado; muitos MACs não prova ataque | MANTIDO | commentedSolution, challenge |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que switches existem e o problema que resolveram em relação a hubs e redes compartilhadas | problem (1º parágrafo e flow-list); quiz q3.3.3; mentor q1 |
| Descrever como o switch aprende MACs pelo MAC de origem | concept (definition-box); internals (passos 2 e 5); quiz q3.3.1; ex3.3.1; lab passos 1-4 |
| Diferenciar forwarding, filtering, flooding e broadcast | concept (tabela); internals passo 4; quiz q3.3.2 e q3.3.7; fc3.3.2, fc3.3.3, fc3.3.7; ex3.3.5 |
| Interpretar tabela MAC, porta, VLAN e aging time em troubleshooting defensivo | internals (aging, VLAN); quiz q3.3.6; ex3.3.6; troubleshooting; lab passo 5; enterpriseExample |
| Relacionar aprendizado MAC com segurança de L2, loops, MAC flooding, port security e segmentação | security (vulnerabilidades, hardening, monitoramento); quiz q3.3.5; mentor q2 e q3; challenge; commentedSolution |

## 10. O que mudou na nova versão
- Removidos `history` (fundido no `problem`), `evolution`, `cloudExample` e `devsecopsExample` (fundidos em `architecture`), `securityExample` (fundido em `security`) e os quatro `*Intro` invisíveis.
- Conteúdo movido de campos invisíveis: `protocolFields` e `packetFlow` viraram duas tabelas em `internals`; `commonMistakes` virou o callout "Erros comuns" no `concept`; `deepDive.mentalModel` abre o `summary`; `deepDive.operationalImpact` (link flap) foi para `security.monitoring`.
- `concept`: as quatro ações viraram uma tabela "MAC de destino → ação → por onde sai". É reorganização do texto original, sem fato novo, exceto a justificativa do filtering ("o destino já recebeu o frame naquele segmento"), uma frase para o objetivo 3.
- `internals`: frase "numa porta de acesso, a VLAN vem da configuração da porta". Acréscimo de precisão, porque a tabela de campos inclui o VLAN ID, que só existe no frame quando há tag.
- `security.vulnerabilities[MAC flooding].description`: o mecanismo ficou explícito (tabela cheia → unknown unicast inundado → tráfego visível em outras portas). Cobre o objetivo 5, que pede relacionar aprendizado MAC com MAC flooding; o original dizia só "pressionar a tabela". Nova vulnerabilidade "Flooding excessivo e loops" movida de `securityExample`.
- Quiz (6 → 6): q3.3.4 (MAC não é identidade, igual a fc3.3.5) trocada por **q3.3.7** (broadcast sai só pela VLAN, exceto a porta de entrada), para cobrir a parte "broadcast" do objetivo 3, que nenhuma questão testava. Distratores triviais trocados em q3.3.1, q3.3.2, q3.3.3, q3.3.5 e q3.3.6. Gabarito: posições 0, 1, 1, 2, 1, 0.
- Flashcards (6 → 6): fc3.3.1 (igual a q3.3.1) trocado por **fc3.3.7** (filtering), a única ação do objetivo 3 sem prática.
- Exercícios (4 → 3): `ex3.3.2` (hipóteses de flapping, igual ao mentor q2) e `ex3.3.4` (40 MACs numa porta, igual ao mentor q3) removidos, com o conteúdo das respostas levado aos `expectedIdeas` do mentor. `ex3.3.3` ("desenhe uma tabela", sem valores) trocado por **ex3.3.5**, uma tabela MAC concreta com as quatro ações e duas VLANs (objetivos 3 e 4). Novo **ex3.3.6** sobre o aging (o objetivo 4 cita aging time, que não tinha prática). O valor de 300 s é dado do enunciado, não afirmação de padrão.
- Lab: `estimatedTimeMinutes` 60 → 40, coerente com 6 passos curtos (alternativa da fórmula: 35,7 min). A frase-padrão do `analysisTask` foi trocada por um critério específico. `lab.challenge` e `lab.solution` saíram: a solução virou o `expectedOutput` do passo 6. `lab.troubleshooting` ficou com 1 item, safetyNotes com 3, improvements com 2. As duas `questions` foram trocadas por perguntas ligadas aos passos (as antigas repetiam quiz e exercício).
- `duration` 90-125 → 95-140 min e `estimatedStudyTimeMinutes` 125 → 140, pela faixa da nova versão. O T caiu 19,7%, mas a declarada original estava SUBESTIMADA.

## 11. Depois
Palavras visíveis: 4909 → 4873 (−0,7%; cortes brutos 834, ~17%; acréscimos brutos ~800, dos quais ~400 movidos de campos invisíveis e ~300 de distratores e exercícios concretos que substituíram os antigos) · Invisíveis: 766 → 26 · Duração: declarada 90-125 min → nova 95-140 min (T 142,7 → 114,6 min) · Quiz corrigido: sim (6 questões, `answer` numérico, 1 trocada).

## 12. Revisão humana
- `lab.estimatedTimeMinutes` reduzido de 60 para 40 (coerente com os passos). Confirmar se algo do módulo usa esse número.
- Quiz q3.3.4 removido (o `validar` avisa o id ausente): a resposta salva dos alunos nessa questão deixa de contar. A nova questão tem id inédito, q3.3.7.
- Conferir os fatos tornados explícitos: o mecanismo de MAC flooding (tabela cheia → unknown unicast inundado) e o filtering ("o destino já recebeu o frame naquele segmento").
- A nova pergunta do lab ("o MAC do gateway estaria na tabela MAC do switch? em qual porta?") não tem gabarito exibido: o campo `lab.questions` não tem resposta.
- `glossary[].relatedLessons` foi mantido, embora o app não o exiba (o `validar` não o aponta).

```json
{
  "id": "3.3", "modulo": "m03", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Switches: aprendizado MAC, forwarding e flooding",
  "duracao_declarada": "90-125 min", "T_original_min": 142.7, "duracao_nova": "95-140 min", "T_nova_min": 114.6, "duracao_nova_estimated_max": 140,
  "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 19, "conteudo_util": "PARCIAL", "aproveitamento": "MÉDIO",
  "pode_ser_mais_curta": true, "reducao_tempo_pct": 19.7, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4909, "palavras_visiveis_depois": 4873,
  "palavras_invisiveis_antes": 766, "palavras_invisiveis_depois": 26,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "MANTER", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "FUNDIR:architecture",
    "devsecopsExample": "REMOVER", "securityExample": "FUNDIR:security", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "MANTER", "nextTheme": "ENXUGAR",
    "protocolFields": "MOVER:content.internals", "packetFlow": "MOVER:content.internals",
    "deepDive": "MOVER:summary", "commonMistakes": "MOVER:content.concept", "networkContext": "MANTER",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR",
    "flashcards": "ENXUGAR", "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER",
    "commentedSolution": "MANTER", "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.estimatedTimeMinutes reduzido de 60 para 40 (coerente com os passos); confirmar se o módulo usa esse número",
    "quiz q3.3.4 removido (duplicava fc3.3.5) e substituído por q3.3.7: a resposta salva na q3.3.4 deixa de contar",
    "conferir fatos explicitados: mecanismo de MAC flooding (tabela cheia -> unknown unicast inundado) e justificativa do filtering",
    "nova lab.questions sobre o MAC do gateway na tabela do switch não tem gabarito exibido",
    "glossary[].relatedLessons mantido, embora não seja exibido"
  ]
}
```
