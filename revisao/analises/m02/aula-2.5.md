# Aula 2.5 — Camada 3 — Rede: IP, roteamento, gateway e TTL
Tipo: fundamental · Duração declarada: 85-120 min · Palavras visíveis / invisíveis (antes): 4642 / 759

## 1. Duração
T pela fórmula = 117,7 min (teoria 19,7, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 36)
Veredito: ORGANIZADA — M = 102,5 está entre 0,8×T (94) e 1,2×T (141), e a divisão teoria/prática (19% de leitura) é adequada para uma aula fundamental com lab. Ressalva: `lab.estimatedTimeMinutes` = 120 não é plausível para 6 passos de coleta local (a fórmula usa 36 min). Na nova versão o lab tem 5 passos e `estimatedTimeMinutes` = 30.

## 2. Encheção de linguiça
Nível: MÉDIA (~15%). Evidências:
- `history` e `evolution`: história genérica ("A evolução da Camada 3 acompanha a evolução das redes: de pequenas LANs isoladas para internet… zero trust") e uma tabela de fases que não explica o mecanismo. O que serve (o MAC não diz onde o host está; o TTL existe contra loops; rotas estáticas e dinâmicas) cabe em 3 frases.
- `motivation`, 1º parágrafo: recapitulação das aulas anteriores ("Até agora você viu que bits precisam de sinais físicos…").
- `securityExample` repete `security`: rede plana / movimento lateral e rota indevida aparecem nos dois; "rota de retorno ausente" repete o `decisionTree` e o `commonMistakes`.
- O exercício ex2.5.1 ("por que a Camada 3 é necessária mesmo existindo switches") é a mesma pergunta do mentor nº 1. O ex2.5.3 (qual comando mostra gateway/rotas no Windows) só repete o lab e o troubleshooting. O ex2.5.4 (duas mitigações de movimento lateral) repete o quiz q2.5.4 e `security`.
- O mentor nº 3 (subnet privada em cloud precisa de internet) pergunta a mesma coisa que `lab.challenge` (VM em cloud com DNS e sem internet).
- O lab tem passos duplicados: o passo 2 (`ip route`) e o passo 4 (`route print`/`ip route`) mostram a mesma tabela. O passo 6 usa a frase-padrão "Produza o artefato indicado na instrução do passo…" (56 aulas). O `safetyNotes` traz "Em cloud real, remova os recursos…" (48 aulas), mas o lab não cria recurso de cloud. Os `improvements` são genéricos.
- O quiz tem distratores absurdos ("Tipo de fonte do monitor", "lsusb", "Conversão de UTF-8 para Base64"), e o gabarito estava sempre na posição 0.
- As `longDefinition` do glossário repetem a `shortDefinition`.
- `labIntro`, `exercisesIntro`, `challengeIntro` e `solutionIntro`: meta-texto invisível.

## 3. Conteúdo útil
PARCIAL. De valor: o passo a passo de `internals` (máscara → local/gateway → ARP do gateway → rota mais específica → TTL → reencapsulamento), o MAC muda e o IP fica, o exemplo doméstico com valores, os erros de cloud (subnet sem rota, peering sem rota de retorno), um troubleshooting com comandos de Windows/Linux/IOS e árvore de decisão, e um bom desafio da filial com solução comentada. Além disso, conteúdo bom estava escondido em campos invisíveis (`protocolFields`, `packetFlow` com as falhas típicas, `commonMistakes`, `deepDive.limitations`).
Lacunas: (1) o objetivo 4, "interpretar tabela de rotas", não tinha nenhum exemplo de tabela nem prática de escolher a rota; a "rota mais específica" era citada sem exemplo. (2) A learningOutcome 3, "dado um traceroute, entende que o TTL revela saltos", não explicava como o traceroute usa o TTL (sondas com TTL crescente).
Erros técnicos: nenhum relevante. `lab.labType` = "cloud" estava errado para um lab de coleta local (corrigido para "local").

## 4. Aproveitamento
MÉDIO (~77% de 117,7 min). Tempo pouco produtivo: ~3,5 min de leitura removível, ~15 min em exercícios duplicados ou triviais (ex1, ex3, metade do ex4), ~5 min no passo duplicado do lab, ~2 min no mentor duplicado e ~1,5 min em questões de quiz com distratores absurdos. Contra a duração declarada (M = 102,5), o quadro é parecido.

## 5. Pode ser mais curta?
NÃO (pelo critério de 15%): a redução foi de 10% (T 117,7 → 106,3 min). O tempo é dominado por blocos de prática de duração fixa (desafio 20, exercícios, lab 30). A teoria visível aumentou um pouco porque recebeu o conteúdo movido de campos invisíveis e os dois acréscimos da seção 10.

## 6. Explicação mais direta
SIM:
- `concept`: uma tabela "peça / o que é / exemplo" (IP, máscara, rede, gateway, rota default, TTL) no lugar de definições espalhadas. Ela cobre diretamente o objetivo 2.
- `problem`: absorve o que vale de `history` em 2 frases. A lista de 5 itens caiu para 3.
- `internals`: as falhas típicas (`packetFlow`) foram embutidas em cada passo, os campos do cabeçalho viraram tabela e os erros comuns viraram um único callout.
- `analogy`: o limite da analogia agora tem 1 frase.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Saiu a recapitulação das camadas 1/2; ficaram a função da Camada 3 e o callout do problema real. |
| history | FUNDIR:problem | MAC × IP (onde o host está) e a origem do IP viraram 2 frases em `problem`. O TTL contra loops já está em `problem`/`internals`. |
| problem | ENXUGAR | A lista caiu para 3 itens. Os sintomas foram resumidos (a lista completa está em `troubleshooting.symptoms`). |
| evolution | REMOVER | Tabela genérica. As rotas estáticas × dinâmicas (OSPF/BGP) foram para `architecture`; "conectividade ≠ autorização" está em `concept`. |
| concept | ENXUGAR | Definição + tabela das peças + limites (`deepDive.limitations`: o IP não garante entrega; roteamento não é autorização). |
| internals | MANTER | Núcleo mantido, com o conteúdo movido de `packetFlow`, `protocolFields` e `commonMistakes`, mais um exemplo de leitura de tabela de rotas e o mecanismo do traceroute (seção 10). |
| architecture | ENXUGAR | Lista de componentes; a linha "Segurança" saiu (repetia `security`); entrou a frase conectada/estática/dinâmica vinda de `evolution`. |
| analogy | ENXUGAR | Boa; o limite ficou em 1 frase. |
| simpleExample | MANTER | Concreto e com valores. |
| enterpriseExample | ENXUGAR | A lista de perguntas repetia `troubleshooting.diagnosticQuestions`; ficou 1 frase que aponta para o desafio. |
| cloudExample | MANTER | Específico (subnet sem rota, peering sem retorno). O callout de custo recebeu o `deepDive.financialImpact` (tráfego entre zonas e regiões). |
| devsecopsExample | ENXUGAR | Mantidos o timeout de pipeline e a IaC com rotas de retorno; saiu a lista longa de exemplos. |
| securityExample | FUNDIR:security | A tabela de riscos repetia `security`. "TTL/traceroute expõem caminho" virou uma vulnerabilidade; "rota indevida" foi para a descrição da vulnerabilidade 1. |
| diagram | MANTER | Correto e legível; só o `<h2>` sem número. |
| labIntro | REMOVER | Invisível, meta-texto. |
| exercisesIntro | REMOVER | Invisível, meta-texto. |
| challengeIntro | REMOVER | Invisível, meta-texto. |
| solutionIntro | REMOVER | Invisível, meta-texto. |
| summary | ENXUGAR | 5 bullets; o 1º recebe o `deepDive.mentalModel`; entra o bullet "como decide". |
| nextTheme | ENXUGAR | 1 frase coerente com a 2.6. |
| networkContext | MANTER | Metadado. |
| protocolFields | MOVER:internals | Virou a tabela "Campos do cabeçalho IPv4". |
| packetFlow | MOVER:internals | Os `possibleFailure` viraram "Falha típica" em cada passo. |
| deepDive | MOVER:summary/concept/internals/cloudExample | `mentalModel` → summary; `limitations` → concept e o parágrafo do traceroute; `financialImpact` → callout de custo. `keyTerms`, `whenToUse`, `whenNotToUse`, `operationalImpact` e `securityImpact` foram removidos (duplicados em glossary, troubleshooting, security e lab.safetyNotes). |
| commonMistakes | MOVER:internals | Viraram o callout "Erros comuns". |
| security | ENXUGAR | Fundido com `securityExample`; 3 vulnerabilidades; listas sem duplicatas (o erro de traceroute foi para o callout). |
| troubleshooting | MANTER | Comandos e árvore corretos. As perguntas diagnósticas receberam "a VPN anuncia a rede remota?" (vinda de `enterpriseExample`). |
| lab | ENXUGAR | 6 → 5 passos (fundidos os passos de tabela de rotas); o passo 2 ganhou uma tarefa de interpretação da tabela; o passo 5 trocou a frase-padrão por uma tarefa concreta. Saíram o safetyNote de cloud, 2 improvements genéricos, o troubleshooting "gateway não responde" (repete o passo 3 e o decisionTree) e a pergunta sobre split tunneling (fora do escopo e sem resposta na aula). `estimatedTimeMinutes` 120 → 30; `labType` cloud → local. |
| quiz | ENXUGAR | 6 questões. q2.5.5 (decoreba "qual comando mostra rotas") foi trocada por q2.5.7 (rota mais específica); os distratores plausíveis substituíram os absurdos; o gabarito foi redistribuído. |
| flashcards | MANTER | 6 cartões. fc2.5.3 (definição de TTL, igual ao quiz) foi trocado por fc2.5.7 (TTL = 0 → ICMP Time Exceeded/traceroute); fc2.5.2 recebeu "vence a mais específica". |
| mentorQuestions | ENXUGAR | 3 perguntas. A nº 3 (duplicava `lab.challenge`) foi trocada por um diagnóstico de máscara /16 × /24 (vem de `packetFlow.possibleFailure`). |
| exercises | ENXUGAR | 4 → 3. Saíram ex2.5.1 (= mentor 1), ex2.5.3 (trivial) e ex2.5.4 (= quiz q2.5.4/security). Entraram ex2.5.5 (MAC/IP no frame) e ex2.5.6 (ler tabela de rotas). |
| challenge | MANTER | Cenário concreto, tarefas e rubrica claras. |
| commentedSolution | MANTER | Raciocínio e erros comuns específicos. |
| glossary | ENXUGAR | 6 termos, todos usados; `longDefinition` removida (repetia a curta e a tabela de `concept`). |
| references | MANTER | RFC 791 e 792, reais, e duas internas. |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Camada 3 = endereçamento lógico + encaminhamento entre redes; IP (IPv4/IPv6) | MANTIDO | concept (definição), summary |
| 2 | A Camada 2 não encontra caminhos entre redes; só MAC/broadcast seria inviável (broadcast, hierarquia, sumarização, controle) | MANTIDO | problem |
| 3 | O MAC identifica a interface no enlace; o IP indica onde o host está numa estrutura de redes | MANTIDO | problem |
| 4 | O IP nasceu na arquitetura da internet e permitiu conectar LANs, WANs, datacenters, provedores e nuvens | MANTIDO | problem |
| 5 | O host só precisa de IP, máscara, gateway (e rotas locais); o roteador decide o próximo salto | MANTIDO | concept |
| 6 | IP e máscara definem local × remoto | MANTIDO | concept (tabela), internals passo 1 |
| 7 | Destino local → ARP/Camada 2; remoto → gateway, com ARP pelo MAC do gateway | MANTIDO | internals passos 2–3, simpleExample |
| 8 | O gateway remove a Camada 2 e analisa o pacote IP; reencapsula para o próximo salto | MANTIDO | internals passos 4 e 7 |
| 9 | Escolha da rota mais específica | MANTIDO | internals passo 5 + exemplo de tabela, quiz q2.5.7, ex2.5.6, flashcard fc2.5.2 |
| 10 | TTL decrementado; em 0 → descarte + ICMP Time Exceeded | MANTIDO | internals passo 6, fc2.5.7, quiz q2.5.6 |
| 11 | O IP fica de ponta a ponta; o MAC muda a cada enlace | MANTIDO | internals, simpleExample, summary, quiz q2.5.3, fc2.5.4, ex2.5.5 |
| 12 | Falhas típicas por passo (máscara errada, gateway ausente, rota errada, loop, retorno) | MANTIDO | internals (movido de packetFlow) |
| 13 | Campos Source IP / Destination IP (32 bits), TTL / Protocol (8 bits) e observações de segurança (spoofing, anti-spoofing) | MANTIDO | internals, tabela (movido de protocolFields) |
| 14 | Rota default 0.0.0.0/0 / "default via" | MANTIDO | concept, internals, troubleshooting, lab, glossary |
| 15 | O traceroute explora o TTL para listar saltos | MANTIDO | internals (mecanismo explicado), lab passo 4, glossary |
| 16 | O traceroute é evidência parcial (bloqueado, assimétrico, incompleto, asteriscos); em cloud o caminho é abstraído | MANTIDO | internals (de deepDive.limitations e commonMistakes), lab.troubleshooting |
| 17 | O IP não garante entrega | MANTIDO | concept (de deepDive.limitations), quiz q2.5.1 |
| 18 | Roteamento/conectividade ≠ autorização | MANTIDO | concept, security.commonErrors, fc2.5.6 |
| 19 | Componentes: host, gateway, roteador/firewall, route table, cloud (IGW, NAT GW, VPN GW, peering), SVI | MANTIDO | architecture |
| 20 | Rotas estáticas (manuais, sujeitas a erro) × dinâmicas (OSPF, BGP entre redes autônomas) | MANTIDO | architecture (de evolution) |
| 21 | BGP com filtragem/RPKI e engenharia de tráfego; fase "zero trust" | REMOVIDO | fora do escopo introdutório (evolution); "conectividade ≠ autorização" segue em concept |
| 22 | Um caminho pode existir e ser bloqueado por firewall/ACL/SG/NSG/NetworkPolicy | MANTIDO | architecture |
| 23 | Analogia cidade/condomínio; o roteador decide localmente; ida e volta podem diferir | MANTIDO | analogy |
| 24 | Exemplo 192.168.1.50/24 → 192.168.1.80 local; 8.8.8.8 via gateway | MANTIDO | simpleExample |
| 25 | Segmentação empresarial (visitantes × servidores) depende de roteamento + política | MANTIDO | enterpriseExample |
| 26 | Perguntas de diagnóstico: rota remota, retorno, VPN anuncia, firewall, NAT | MANTIDO | enterpriseExample (resumo), troubleshooting.diagnosticQuestions |
| 27 | Cloud: subnet sem rota/gateway; peering sem rotas, DNS privado ou retorno | MANTIDO | cloudExample |
| 28 | Custo recorrente de NAT/firewall/VPN/links/flow logs; rotas indevidas geram tráfego entre zonas | MANTIDO | cloudExample (callout, + deepDive.financialImpact) |
| 29 | DevSecOps: timeout de pipeline pode ser de rota; IaC com rotas de retorno; policy as code | MANTIDO | devsecopsExample |
| 30 | Movimento lateral por rede plana/rotas amplas; rota indevida para uma subnet sensível | MANTIDO | security.vulnerabilities[0], quiz q2.5.4 |
| 31 | Exposição pública por rota para IGW; route table + SG avaliados juntos | MANTIDO | security.vulnerabilities[1] |
| 32 | TTL/traceroute revelam topologia → sanitizar | MANTIDO | security.vulnerabilities[2], goodPractices, internals (tabela de campos) |
| 33 | Erros comuns: ping no gateway ≠ internet; gateway × DNS; rota de retorno; traceroute como mapa | MANTIDO | internals (callout), summary, decisionTree |
| 34 | NAT não é firewall | MANTIDO | security.commonErrors |
| 35 | Comandos: ipconfig /all, route print, tracert, ip addr, ip route, traceroute/tracepath, show ip interface brief, show ip route | MANTIDO | troubleshooting.commands, lab, internals |
| 36 | Árvore de decisão (gateway não responde / destino externo / retorno / loop TTL) | MANTIDO | troubleshooting.decisionTree |
| 37 | Monitoramento/detecção: flow logs, mudanças de route table, novas rotas 0.0.0.0/0, ICMP TTL exceeded repetido | MANTIDO | security.monitoring, detectionIdeas |
| 38 | VM em cloud com DNS e sem internet: precisa de rota para NAT/IGW + políticas | MANTIDO | lab.challenge/solution, cloudExample |
| 39 | VPN com split tunneling | REMOVIDO | fora do escopo; só existia como pergunta do lab, sem resposta na aula |
| 40 | Hardening: bastion, private endpoints, ZTNA, controle de quem altera route tables | MANTIDO | security.hardening |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar o papel da Camada 3 no Modelo OSI | concept (definição), motivation, problem, summary, quiz q2.5.1, mentor 1 |
| Diferenciar IP, máscara, rede local, gateway, rota e TTL | concept (tabela das peças), glossary, flashcards |
| Descrever como um host decide se envia localmente ou para o gateway | internals passos 1–3, simpleExample, ex2.5.2, mentor 3 (máscara /16) |
| Interpretar tabela de rotas e rota default em nível introdutório | internals "Lendo uma tabela de rotas", quiz q2.5.7, ex2.5.6, lab passo 2 |
| Relacionar Camada 3 com cloud, DevSecOps, segurança e troubleshooting | cloudExample, devsecopsExample, security, troubleshooting, challenge, quiz q2.5.4 |
| Coletar evidências básicas com Windows, Linux e Cisco IOS | lab (passos 1–4), troubleshooting.commands, internals (route print / show ip route) |

## 10. O que mudou na nova versão
- Removidos `history`, `evolution`, `securityExample` e os 4 `*Intro`. O conteúdo útil foi fundido em `problem`, `architecture` e `security`.
- Movido de campos invisíveis para onde o aluno vê: `protocolFields` (tabela em internals), `packetFlow` (falhas típicas em cada passo), `commonMistakes` (callout "Erros comuns"), `deepDive.mentalModel` (1º bullet do summary), `deepDive.limitations` (concept + parágrafo do traceroute) e `deepDive.financialImpact` (callout de custo).
- **Acréscimo novo 1 — "Lendo uma tabela de rotas" (internals, ~110 palavras):** cobre o objetivo 4, que não tinha nenhum exemplo de tabela. A saída de exemplo de `ip route` segue o formato padrão do iproute2; a tabela de decisão aplica a regra "mais específica", que já estava na aula.
- **Acréscimo novo 2 — "Como o traceroute usa o TTL" (internals, ~60 palavras de mecanismo):** cobre a learningOutcome 3; a aula citava que o traceroute "explora" o TTL sem dizer como.
- **Acréscimo novo 3 — tabela das peças em `concept`:** reorganiza definições que já existiam (glossário/arquitetura), para cobrir de forma direta o objetivo 2. O único fato novo é `/24 = 255.255.255.0`.
- Quiz: continua com 6 questões. q2.5.5 foi trocada por q2.5.7 (rota mais específica); as demais ganharam distratores plausíveis; o gabarito foi redistribuído com `quiz_embaralhar` (posições 0, 1, 1, 2, 2, 3); nenhuma explicação cita posição.
- Flashcards: continuam 6 (fc2.5.3 → fc2.5.7). Mentor: continua com 3 (o nº 3 foi trocado: máscara errada, a partir de `packetFlow`). Exercícios: 4 → 3 (2 trocados por versões que praticam os objetivos 3 e 4; ex2.5.4 removido por duplicar o quiz e a segurança).
- Lab: 6 → 5 passos, `estimatedTimeMinutes` 120 → 30 (coerente com 5 passos de coleta local), `labType` "cloud" → "local", ritual cortado, frase-padrão do passo final trocada por uma tarefa concreta.
- O aviso do `validar` "ids de quiz originais ausentes: q2.5.5" é intencional: a questão de decoreba foi substituída por q2.5.7 (id novo, sem reaproveitar o antigo).

## 11. Depois
Palavras visíveis: 4642 → 5109 (+10%; inclui ~500 palavras movidas de campos invisíveis e ~230 de acréscimos justificados; cortes brutos de 644 palavras = 14%) · Invisíveis: 759 → 29 · Duração: 85-120 min → 90-130 min (T 117,7 → 106,3 min; o limite superior sobe só pela regra de arredondamento da faixa) · Quiz corrigido: sim (6 questões)

## 12. Revisão humana
- `lab.labType` mudou de "cloud" para "local" (o lab só coleta dados no host do aluno). Confirmar se algum filtro do app ou do módulo depende desse valor (não achei uso no código do app).
- A saída de exemplo de `ip route` em internals é ilustrativa (formato padrão do iproute2, valores fictícios). Conferir se o estilo agrada.
- O ex2.5.5 menciona que, num roteador doméstico com NAT, o IP de origem muda (ressalva ao "IP fica de ponta a ponta"). Verificar se o NAT só deve aparecer numa aula posterior.

```json
{
  "id": "2.5", "modulo": "m02", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Camada 3 — Rede: IP, roteamento, gateway e TTL",
  "duracao_declarada": "85-120 min", "T_original_min": 117.7, "duracao_nova": "90-130 min", "veredito_duracao": "ORGANIZADA",
  "T_nova_min": 106.3, "duracao_nova_estimated_max": 130,
  "linguica_nivel": "MÉDIA", "linguica_pct": 15, "conteudo_util": "PARCIAL", "aproveitamento": "MÉDIO",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 10, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4642, "palavras_visiveis_depois": 5109,
  "palavras_invisiveis_antes": 759, "palavras_invisiveis_depois": 29,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "MANTER", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals",
    "deepDive": "MOVER:summary/concept/internals/cloudExample", "commonMistakes": "MOVER:internals",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "MANTER",
    "mentorQuestions": "ENXUGAR", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "ENXUGAR", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.labType alterado de cloud para local; confirmar que nada depende do valor",
    "saída de exemplo de ip route em internals é ilustrativa (formato iproute2, valores fictícios)",
    "ex2.5.5 menciona que NAT doméstico muda o IP de origem; confirmar se convém citar NAT nesta aula"
  ]
}
```
