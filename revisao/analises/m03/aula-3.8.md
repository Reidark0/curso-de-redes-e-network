# Aula 3.8 — STP: evitando loops e broadcast storms
Tipo: fundamental · Duração declarada: 90-130 min · Palavras visíveis / invisíveis (antes): 4778 / 713

## 1. Duração
T pela fórmula = 118,2 min (teoria 19,4, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 36,8). O `lab.estimatedTimeMinutes` = 130 não é plausível para 6 passos (é a duração da aula inteira), então valeu a alternativa de 5 min/passo + leitura.
Veredito: **DESEQUILIBRADA**. O total bate com a duração declarada (M = 110 ≈ 0,93×T), mas só 19% do tempo é teoria, e essa teoria não ensina o que a prática cobra: o lab (passo 3), o desafio e o exercício 3 pedem para escolher root port e designated port, e a aula não explica o desempate (custo → Bridge ID → Port ID), não mostra a composição do Bridge ID nem uma saída de `show spanning-tree`. Ao mesmo tempo, a prática repete a mesma tarefa três vezes: o lab (triângulo, root, controles, relatório), o `lab.challenge`/`lab.solution` e o desafio da aula (3 switches, root, controles, validação). Os exercícios 1 e 2 repetem as perguntas 1 e 2 do mentor.

## 2. Encheção de linguiça
Nível: **MÉDIA (~20%)**. Evidências:
- `cloudExample`: “Não é STP clássico, mas o raciocínio de evitar ciclos… permanece”, exemplo genérico por ambiente (6.3).
- `devsecopsExample`: “Um loop de Camada 2 pode derrubar o caminho até o registry…”, o “pipelines também usam rede” citado em 6.3.
- `history` repete `problem` (“o mesmo frame pode retornar… tratado como tráfego novo”) e `evolution` (“Depois surgiram evoluções como RSTP, MSTP…”).
- `securityExample` (tabela de riscos) duplica `security.vulnerabilities` linha a linha; `deepDive.securityImpact` repete as duas coisas.
- `lab.troubleshooting` repete `troubleshooting.decisionTree` (root errada, porta bloqueada, broadcast alto).
- `security.monitoring` × `detectionIdeas` e `goodPractices` × `hardening` listam os mesmos controles; `security.commonErrors` repete `commonMistakes`.
- `lab.challenge`/`lab.solution` duplicam `challenge`/`commentedSolution`.
- Passos 1 e 6 do lab: `instruction` e `analysisTask` dizem a mesma coisa.
- Meta-texto: “O problema central é simples de dizer e grave na prática”, “A evolução do STP reflete a necessidade de…”; a seção de conceito repete a definição (“O objetivo não é remover redundância. O objetivo é…”).
- Quiz com distratores triviais (Base64, NAT overload, “Senha expirada no IAM”, `show crypto ikev2 sa`).
- Frases do índice de repetidas: só “Ter concluído as aulas 3.1 a 3.7” (removida; os pré-requisitos já estão na aula).

## 3. Conteúdo útil
**PARCIAL**. O que tem valor: o mecanismo do loop (sem TTL, flooding, frame tratado como novo), os sintomas (MAC flapping, storm, CPU), a tabela de evolução, os controles de borda (BPDU Guard, Root Guard, storm control, PortFast), os comandos Cisco e a árvore de decisão, e o incidente do mini-switch.
Lacunas (em relação aos objetivos da própria aula): (a) objetivo 3 / resultado 3, sem composição do Bridge ID (prioridade em múltiplos de 4096, padrão 32768, extended system ID), sem custo de caminho por velocidade, sem critérios de desempate de root/designated port, sem exemplo resolvido e sem saída Cisco para ler; (b) objetivo 5 / resultado 4, a aula recomenda PortFast, mas nunca diz o que ele faz (pular listening/learning) nem por que é perigoso entre switches; os estados e os timers do 802.1D não aparecem; PortFast não está no glossário.
Erros técnicos: o desafio descreve “um de distribuição e dois de acesso”, mas a solução manda “escolher outro equipamento central como root secundária”, que não existe nesse cenário. Corrigido (cenário com D1/D2).

## 4. Aproveitamento
**MÉDIO (~78%)**. Sobre o T original (118 min), cerca de 26 min não ensinam nada novo: exercícios 1 e 2, que repetem o mentor (12 min); sobreposição entre lab, `lab.challenge` e desafio (~10 min); exemplos genéricos, história e tabelas duplicadas (~4 min). Contra a duração declarada (110 min), a proporção é parecida.

## 5. Pode ser mais curta?
**NÃO**. Redução prevista: ~4% (T 118,2 → 113,1). Os cortes de redundância (~25 min) seriam suficientes para passar de 15%, mas parte desse tempo foi reinvestida em teoria que faltava para cumprir o objetivo 3 e o resultado 3 (exemplo resolvido, leitura de saída, PortFast/estados). O aluno passa a aprender mais em tempo um pouco menor.

## 6. Explicação mais direta
**SIM**:
- `concept`: a definição abre a seção, sem os dois parágrafos que a repetiam.
- `internals`: a lista vaga (“em cada segmento, uma porta encaminha em direção ao melhor caminho”) virou tabela de campos da BPDU, regras com desempate explícito e o triângulo do diagrama resolvido com valores.
- `security`: a tabela em prosa de `securityExample` foi fundida nas `vulnerabilities`.
- `architecture`: a prosa “uma boa arquitetura define…” virou tabela de controles por tipo de porta.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Cenário e falta de TTL em 2 parágrafos; callout mais curto. |
| history | FUNDIR:problem | O único fato útil (switch separa colisão, mas não broadcast; frame volta como novo) foi para `problem`; o resto repetia `problem`/`evolution`. |
| problem | MANTER | Recebeu 2 frases de `history`; lista de 5 sintomas mantida. |
| evolution | ENXUGAR | Linhas “sem redundância/sem STP” viraram 1 frase; linha por VLAN ganhou PVST+/Rapid PVST+ (explica o `spanning-tree vlan 10` do lab). |
| concept | ENXUGAR | Definição + 1 parágrafo. |
| internals | MANTER + MOVER | Recebeu `protocolFields` (tabela), `packetFlow` (passos), o exemplo resolvido, os estados/PortFast e a leitura da saída (lacunas do objetivo 3). |
| architecture | MANTER + MOVER | Recebeu `commonMistakes` (callout), `deepDive.limitations/whenNotToUse/operationalImpact` e uma tabela de controles por porta; lista de “componentes/dependências” cortada (repetia o networkContext). |
| analogy | ENXUGAR | Limite da analogia em 1 frase. |
| simpleExample | MANTER | Pequeno corte. |
| enterpriseExample | ENXUGAR | Lista de controles (repetia `architecture`) cortada; incidente do mini-switch mantido. |
| cloudExample | REMOVER | Genérico, não ensina STP. |
| devsecopsExample | REMOVER | Genérico (“pipelines também usam rede”); a ligação com o curso de DevSecOps continua em `linksToOtherCourses`. |
| securityExample | FUNDIR:security | Tabela duplicava `vulnerabilities`; “DoS interno” e “trunk mal configurado” foram para `vulnerabilities`. |
| diagram | MANTER | Correto e coerente com o exemplo resolvido; só tirei o número do h2. |
| labIntro | REMOVER | Invisível, moldura. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | ENXUGAR | 5 bullets, com o `deepDive.mentalModel` na primeira linha e a regra de decisão do STP. |
| nextTheme | MANTER | 2 frases, coerente com a 3.9. |
| networkContext | MANTER | Metadado. |
| protocolFields | MOVER:internals | Tabela de campos (Bridge ID, Root ID, Root Path Cost, Port ID). |
| packetFlow | MOVER:internals | Passos da eleição; `possibleFailure` foi para `architecture`, para os erros comuns e para `badPractices` (BPDU filtrada). |
| deepDive | MOVER:summary/architecture | `mentalModel` → summary; `limitations`/`whenNotToUse`/`operationalImpact` → architecture; `keyTerms`, `whenToUse`, `financialImpact` e `securityImpact` removidos (glossário/genérico/duplicado). |
| commonMistakes | MOVER:architecture | Callout “Erros comuns” com consequência e correção. |
| security | ENXUGAR | Fundido com `securityExample`; `monitoring` foi fundido em `detectionIdeas`; `commonErrors` saiu (duplicava o callout); `goodPractices` sem os itens que repetiam `hardening`; +BPDU filtrada em `badPractices`. |
| troubleshooting | MANTER | Comandos Cisco ampliados com `show spanning-tree root` e `show interfaces status err-disabled` (vindos de `lab.troubleshooting`); árvore de decisão +1 ramo (err-disabled) e ramo de porta bloqueada com a alternativa LACP. |
| lab | ENXUGAR | `estimatedTimeMinutes` 130 → 35; `lab.troubleshooting`, `lab.challenge` e `lab.solution` removidos (duplicados); passos 1 e 6 sem `analysisTask` repetido; passo 3 com resultado concreto; `improvements` 5 → 2; `questions` 4 → 2 (removidas as que repetem quiz e mentor). |
| quiz | ENXUGAR | 6 → 6: 2 triviais trocadas (q3.8.1 → q3.8.7 eleição; q3.8.6 → q3.8.8 PortFast); q3.8.2 e q3.8.4 com distratores plausíveis. |
| flashcards | ENXUGAR | 6 → 6: fc3.8.1 (“O que é STP”, repetia o glossário) → fc3.8.7 desempate; fc3.8.3 (“O que é BPDU”, repetia o glossário) → fc3.8.8 prioridade. |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, boas. |
| exercises | ENXUGAR | 4 → 3: ex1/ex2 (repetiam mentor 1/2) trocados por ex3.8.5 (cálculo de papéis) e ex3.8.6 (leitura de saída); ex3 removido (é a tarefa 1 do desafio); ex4 mantido. |
| challenge | MANTER (corrigido) | Cenário trocado para D1/D2 + A1/A2 (o original não tinha onde pôr a root secundária); +tarefa “o que muda se D1 falhar”; rubrica com os mesmos pontos. |
| commentedSolution | MANTER | Passos com prioridades e portas alternate concretas; +1 resposta errada comum (secundária no acesso). |
| glossary | MANTER | +PortFast (usado na aula e não definido). |
| references | MANTER | Reais (sem url no original). |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Redundância física entre switches cria ciclo | MANTIDO | motivation, problem |
| 2 | Frame Ethernet não tem TTL | MANTIDO | motivation, summary, mentor 1 |
| 3 | Switch replica broadcast/unknown unicast/multicast em todas as portas da VLAN menos a de entrada | MANTIDO | problem, motivation |
| 4 | Frame que volta é tratado como novo | MANTIDO | problem (vindo de history) |
| 5 | Switch: domínio de colisão por porta, broadcast continua | MANTIDO | problem (vindo de history) |
| 6 | Broadcast storm (ARP, DHCP) | MANTIDO | problem, glossary, flashcard |
| 7 | MAC flapping | MANTIDO | problem, troubleshooting, quiz q3.8.2 |
| 8 | CPU alta, perda de conectividade, sintomas em várias camadas | MANTIDO | problem |
| 9 | Ponto único de falha sem redundância | MANTIDO | evolution (frase inicial) |
| 10 | Definição de STP | MANTIDO | concept, glossary |
| 11 | BPDU: mensagem de controle com root, custo, timers | MANTIDO | concept, internals (tabela), glossary |
| 12 | Bridge ID = prioridade + MAC; menor vence | MANTIDO | internals, quiz q3.8.7 |
| 13 | Root path cost depende da velocidade | MANTIDO | internals (com valores) |
| 14 | Root port | MANTIDO | internals, exemplo resolvido, ex3.8.5 |
| 15 | Designated port por segmento | MANTIDO | internals, exemplo resolvido |
| 16 | Alternate/blocked port não encaminha dados | MANTIDO | internals, saída Cisco |
| 17 | Convergência após falha | MANTIDO | internals (link A–B cai), desafio |
| 18 | Estados blocking/listening/learning/forwarding | MANTIDO | internals |
| 19 | RSTP 802.1w: convergência mais rápida | MANTIDO | evolution, internals |
| 20 | MSTP / STP por VLAN | MANTIDO | evolution |
| 21 | MLAG/vPC/Stack/EVPN | MANTIDO | evolution |
| 22 | Dois cabos ≠ mais velocidade; LACP/EtherChannel | MANTIDO | simpleExample, architecture (erros comuns), flashcard fc3.8.6 |
| 23 | Root primária/secundária em distribuição/core | MANTIDO | architecture, desafio, solução |
| 24 | Root bridge indevida; Root Guard | MANTIDO | architecture (tabela), security, glossary |
| 25 | BPDU Guard em portas edge → err-disabled | MANTIDO | architecture, quiz q3.8.4, glossary |
| 26 | PortFast só em portas de usuário | MANTIDO | internals, architecture, quiz q3.8.8 |
| 27 | Storm control (broadcast/multicast/unknown unicast acima de limiar) | MANTIDO | architecture, ex3.8.4 |
| 28 | Port security, 802.1X/NAC | MANTIDO | security.hardening/vulnerabilities |
| 29 | Allowed VLANs restritas em trunks | MANTIDO | architecture, security |
| 30 | Mini-switch sob a mesa fecha loop | MANTIDO | enterpriseExample, security |
| 31 | Loop como DoS interno | MANTIDO | security.vulnerabilities (vindo de securityExample) |
| 32 | Porta bloqueada é comportamento esperado | MANTIDO | architecture, quiz q3.8.3, decisionTree |
| 33 | Não desabilitar STP para “resolver” | MANTIDO | badPractices, safetyNotes, solução |
| 34 | Comandos Cisco (show spanning-tree [vlan/root/interface detail], mac address-table, logging include, interfaces status err-disabled, counters errors, running-config interface) | MANTIDO | troubleshooting.commands/decisionTree, lab.validation |
| 35 | Comandos de endpoint (arp -a, ping, pathping, ip neigh, ip -s link) como evidência indireta | MANTIDO | troubleshooting.commands |
| 36 | Config: priority 4096, portfast, bpduguard enable, storm-control | MANTIDO | lab passos 2 e 5, architecture |
| 37 | Monitoramento: mudança de root, flapping, broadcast acima do baseline, err-disabled, CPU | MANTIDO | security.detectionIdeas |
| 38 | Documentação de topologia é sensível (sanitizar) | MANTIDO | security.goodPractices, lab passo 6 |
| 39 | Endpoint fazendo bridge entre interfaces causa flapping | MANTIDO | decisionTree |
| 40 | BPDUs filtradas tornam o desenho instável | MANTIDO | security.badPractices |
| 41 | STP não substitui desenho físico/roteamento; não corrige VLANs; não protege sozinho contra ataques L2 | MANTIDO | architecture (Limites) |
| 42 | Porta bloqueada e desejo de banda ativa → LACP/roteamento | MANTIDO | decisionTree |
| 43 | Cloud: L2 abstraída, raciocínio de evitar ciclos em rotas | REMOVIDO | fora do escopo/genérico (não é STP) |
| 44 | DevSecOps: loop derruba runners/registries | REMOVIDO | genérico; ligação mantida em linksToOtherCourses |
| 45 | Impacto financeiro (switches gerenciáveis custam mais) | REMOVIDO | genérico, não ensina STP |
| 46 | whenToUse (redes com redundância L2, labs) | REMOVIDO | duplicado em architecture/problem |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que loops de Camada 2 são perigosos | motivation, problem, simpleExample, mentor 1, quiz q3.8.2 |
| Descrever o papel do STP na topologia lógica sem ciclos | concept, internals, diagram, summary |
| Entender root bridge, bridge ID, root port, designated port e alternate em nível prático | internals (tabela de campos, regras, exemplo resolvido, leitura de saída), ex3.8.5, ex3.8.6, quiz q3.8.7, lab passo 3 |
| Relacionar STP com storms, MAC flapping, VLANs, trunks e troubleshooting | problem, evolution (por VLAN), architecture (trunks), troubleshooting, mentor 2 |
| Aplicar boas práticas (Root Guard, BPDU Guard, PortFast, storm control, documentação) | internals (PortFast), architecture (tabela + erros comuns), security, lab passo 5, ex3.8.4, desafio, quiz q3.8.4/q3.8.8 |

## 10. O que mudou na nova versão
- Removidas as seções `history`, `cloudExample`, `devsecopsExample`, `securityExample` e as 4 intros invisíveis; `protocolFields`, `packetFlow`, `deepDive` e `commonMistakes` foram movidos para onde o aluno vê.
- **Acréscimos novos (não movidos), cada um para cobrir objetivo/resultado da própria aula:**
  - Composição do Bridge ID (0–61440 em passos de 4096, padrão 32768, extended system ID), custos por velocidade (19/4/2) e Port ID: objetivo 3 (“bridge ID… em nível prático”); sem isso a saída Cisco e o desempate não fazem sentido.
  - Critérios de desempate de root port e designated port, e o exemplo resolvido do triângulo do diagrama: objetivo 3 e resultado 1; o lab (passo 3) e o desafio já cobravam isso sem ensinar.
  - Saída resumida de `show spanning-tree vlan 10` com interpretação: resultado 3 (“Dado um output Cisco de STP…”), que não tinha nenhum output na aula original.
  - Estados do 802.1D, timers (15 s, ~30 s, ~50 s) e o que o PortFast faz: objetivo 5 e resultado 4 (“explica quando PortFast… faz sentido”); a aula recomendava PortFast sem explicá-lo.
  - Tabela de controles por tipo de porta em `architecture`: resultado 5; ela organiza controles que já estavam espalhados em prosa e listas.
  - Glossário: +PortFast (termo usado e não definido).
- Quiz: 6 questões (sem aumento). Duas triviais foram trocadas (eleição por Bridge ID; PortFast entre switches) e duas receberam distratores plausíveis. As posições das respostas variam (1, 2, 0, 3, 0, 1).
- Flashcards: 6 (sem aumento). Duas que repetiam o glossário foram trocadas por desempate e prioridade.
- Exercícios: 4 → 3. Os dois que repetiam o mentor viraram cálculo de papéis e leitura de saída; o que era a tarefa do desafio saiu.
- Desafio corrigido (2 distribuições + 2 acessos), com tarefa de falha da primária. Solução comentada com prioridades e portas concretas e +1 erro comum.
- Lab: tempo 130 → 35 min; duplicatas (`troubleshooting`, `challenge`, `solution`) removidas; passo 3 com resultado esperado concreto.
- Troubleshooting e security sem duplicação interna; comandos úteis de `lab.troubleshooting` incorporados.
- Aviso do `validar` (“ids de quiz originais ausentes: q3.8.1, q3.8.6”): esperado. As duas questões foram substituídas por novas com ids inéditos (q3.8.7, q3.8.8), sem reaproveitar ids.

## 11. Depois
Palavras visíveis: 4778 → 5465 (+14%; ~400 vêm de campos invisíveis movidos e ~450 são a teoria nova listada acima; os cortes brutos de redundância somam ~900) · Invisíveis: 713 → 38 (networkContext) · Duração: declarada 90-130 min → nova 95-135 min (T 118,2 → 113,1) · Quiz corrigido: sim (6 questões, formato padronizado, 2 trocadas, 2 com distratores refeitos)

## 12. Revisão humana
- A saída de `show spanning-tree vlan 10` (internals) e a do ex3.8.6 foram escritas no formato Rapid PVST+ do Cisco IOS, resumidas e com valores ilustrativos. Conferir colunas e rótulos contra um equipamento real.
- Fatos numéricos novos (custos 19/4/2 no método curto; forward delay de 15 s, ~30 s até encaminhar, ~50 s em algumas falhas; prioridade 0–61440 em passos de 4096; Port ID padrão 128): são valores-padrão conhecidos, mas convém conferir.
- O desafio original (1 distribuição + 2 acessos) era incoerente com a solução (“outro equipamento central como root secundária”). Troquei por D1/D2 + A1/A2, mantendo a rubrica (mesmos critérios e pontos, descrições um pouco mais exigentes).
- O ex3.8.5 resolve os papéis das portas na mesma topologia do desafio. É uma sobreposição parcial intencional: o desafio acrescenta falha da primária, controles, validação e riscos. Avaliar se prefere outra topologia no exercício.
- `lab.estimatedTimeMinutes` corrigido de 130 para 35 (6 passos de desenho/análise).
- As referências continuam sem `url` (como no original).

```json
{
  "id": "3.8", "modulo": "m03", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "STP: evitando loops e broadcast storms",
  "duracao_declarada": "90-130 min", "T_original_min": 118.2, "duracao_nova": "95-135 min", "T_nova_min": 113.1, "duracao_nova_estimated_max": 135,
  "veredito_duracao": "DESEQUILIBRADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 20, "conteudo_util": "PARCIAL", "aproveitamento": "MÉDIO",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 4, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4778, "palavras_visiveis_depois": 5465,
  "palavras_invisiveis_antes": 713, "palavras_invisiveis_depois": 38,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "MANTER", "evolution": "ENXUGAR",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "MANTER", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "REMOVER", "devsecopsExample": "REMOVER",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "MANTER",
    "networkContext": "MANTER", "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals",
    "deepDive": "MOVER:summary/architecture", "commonMistakes": "MOVER:architecture",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "ENXUGAR",
    "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Saídas show spanning-tree (internals e ex3.8.6) ilustrativas no formato Rapid PVST+: conferir contra equipamento real",
    "Conferir valores novos: custos 19/4/2, timers 15 s/~30 s/~50 s, prioridade 0-61440 em passos de 4096, Port ID 128",
    "Desafio: cenário trocado para D1/D2 + A1/A2 (original incoerente com a solução); rubrica mantida",
    "ex3.8.5 usa a mesma topologia do desafio (sobreposição parcial intencional)",
    "lab.estimatedTimeMinutes corrigido de 130 para 35",
    "Referências sem url (como no original)"
  ]
}
```
