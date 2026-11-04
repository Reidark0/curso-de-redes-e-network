# Aula 3.6 — Cache ARP e troubleshooting de rede local
Tipo: fundamental · Duração declarada: 90-125 min · Palavras visíveis / invisíveis (antes): 4765 / 740

## 1. Duração
T pela fórmula = 142,6 min (teoria 20,6, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 60)
Veredito: SUBESTIMADA — M = 107,5 min < 0,8×T = 114 min. A causa principal é o lab: 60 min declarados para 6 passos curtos (4 comandos simples, uma matriz e um passo opcional de Cisco). A fórmula alternativa dá 36 min, então 60 é "plausível" para a ferramenta, mas está inflado em relação ao que os passos exigem. A teoria fica em 17% do T, o que é adequado para uma aula de troubleshooting com lab.

## 2. Encheção de linguiça
Nível: MÉDIA (~16%). Evidências:
- `history`: só o 1º parágrafo explica por que o cache existe ("resolver o MAC a cada pacote seria ineficiente"); o resto é lista de controles repetida em `security` ("A evolução trouxe controles adicionais: DHCP snooping, Dynamic ARP Inspection…") e meta-frase ("Esses controles não substituem o entendimento do ARP; eles dependem dele").
- `evolution`: tabela de "fases" que repete o conceito (dinâmico, HA, cloud) sem mecanismo novo.
- `devsecopsExample`: exemplo genérico do tipo "pipelines também usam rede" ("problemas de ARP podem aparecer indiretamente em runners self-hosted, clusters Kubernetes…").
- `cloudExample`: duas listas longas de recursos do provedor para uma ideia só.
- `problem` × `motivation` × `simpleExample` × `summary` × `securityExample`: "o mesmo IP com MACs diferentes pode ser HA, conflito ou abuso" e "ARP não autentica" aparecem em 5 seções.
- `analogy`: limite da analogia em 3 frases.
- `nextTheme`: meta-texto ("Isso é consequência direta do que vimos").
- Sobreposição de práticas: `mentorQuestions[1]` pergunta o mesmo que `exercises[1]` (gateway sem entrada ARP → hipóteses); `exercises[2]` pergunta o mesmo que `mentorQuestions[2]` (evidências antes de concluir ataque); `lab.troubleshooting` repete 2 itens de `troubleshooting.decisionTree`.
- Lab ritual: `analysisTask` com a frase-padrão de 56 aulas ("Produza o artefato indicado na instrução do passo…"); `improvements` genéricos ("Criar checklist padrão de evidências L2/L3"); aviso de spoofing repetido em `prerequisites` e `safetyNotes`.
- 740 palavras em campos invisíveis (`protocolFields`, `packetFlow`, `deepDive`, `commonMistakes` e os 4 *Intro*).

## 3. Conteúdo útil
PARCIAL. Valioso: o fluxo de consulta ao cache e o motivo de "limpar o cache" não resolver a causa raiz; a correlação host × switch × gateway × DHCP × NAC; os dois exemplos empresariais (MAC do gateway em porta inesperada; impressora em conflito com reserva DHCP); a tabela de risco defensivo; os comandos Windows/Linux/Cisco com interpretação; a árvore de decisão; o desafio com rubrica.
Lacunas: o objetivo "Interpretar entradas ARP dinâmicas, estáticas, incompletas e suspeitas" não tinha nenhum exemplo de saída real de `arp -a` ou `ip neigh`, e os estados REACHABLE/STALE/FAILED só apareciam soltos (o significado ficava escondido em `protocolFields`). O aluno não aprendia que STALE é normal. Também ficava escondido (em `deepDive.limitations`) que o cache só tem vizinhos da sub-rede, nunca o IP de um site externo.
Erros técnicos: nenhum relevante. Distratores fracos no quiz ("Apagar todos os switches", "Porque MAC só existe em HTTP", "Ignorar sempre").

## 4. Aproveitamento
MÉDIO (~76% contra o T original de 142,6 min). Perdas: ~25 min de lab acima do que os 6 passos exigem, ~5 min de teoria redundante (history, evolution, devsecops, repetições) e ~4 min de práticas duplicadas (mentor 2 × exercício 2, exercício 3 × mentor 3). Contra a duração declarada (M = 107,5) a aula parecia mais curta do que é: a declaração estava subestimada, não inflada.

## 5. Pode ser mais curta?
SIM — redução prevista: ~18% (T 142,6 → 116,8 min), sem perder itens do inventário. A maior parte vem da correção do tempo do lab (60 → 35 min); a teoria fica estável porque recebe o conteúdo movido dos campos invisíveis e os exemplos de saída.

## 6. Explicação mais direta
SIM —
- `internals`: a lista de 8 passos e o `packetFlow` invisível viraram uma tabela única "o que acontece × o que pode falhar".
- `concept`: definição na caixa logo no início, depois a regra "só vizinhos da sub-rede", e em seguida as saídas reais de `arp -a` e `ip neigh` com uma tabela de estados. Antes eram três parágrafos abstratos.
- `history` + `problem`: o motivo de existir cache (broadcast a cada pacote) vai direto no `problem`, em 2 frases.
- `commonMistakes` (invisível) virou o callout "Erros comuns" no fim de `internals`.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Cenário e callout mantidos; cortada a lista de sintomas repetida em problem/summary. |
| history | FUNDIR:problem | Só o motivo do cache (broadcast por pacote) ensina algo; a lista de controles já está em security. |
| problem | ENXUGAR | Recebe o motivo vindo de history; saem os bullets "Instabilidade" e "Segurança", repetidos em 4 seções. |
| evolution | REMOVER | Fatos úteis movidos: estático é raro e difícil de manter → concept; MAC virtual em HA → architecture; abstração em cloud → cloudExample. |
| concept | MANTER | Núcleo; recebe protocolFields (campos da entrada), deepDive.limitations (não atravessa roteador) e saídas reais com tabela de estados. |
| internals | MANTER | Fluxo em tabela com as falhas por passo (do packetFlow); callout "Erros comuns" (do commonMistakes) e sequência de coleta (do devsecopsExample). |
| architecture | ENXUGAR | Lista de fontes mantida; frase de abertura enxuta; recebe a nota de HA/MAC virtual. |
| analogy | ENXUGAR | Analogia boa; limite reduzido a 1 frase. |
| simpleExample | MANTER | Concreto, com valores; só ajustes de fluidez. |
| enterpriseExample | MANTER | Dois casos específicos e úteis. |
| cloudExample | ENXUGAR | Um parágrafo: L2 abstraída, mesma pergunta, evidências do provedor. |
| devsecopsExample | REMOVER | Genérico; a sequência de coleta padronizada foi movida para "Erros comuns" em internals. |
| securityExample | ENXUGAR | Tabela de risco mantida (envolta em responsive-table); intro de 3 frases → 2. |
| diagram | MANTER | Correto e legível; só o número sai do h2. |
| labIntro | REMOVER | Invisível; o aviso de não fazer spoofing já está em lab.safetyNotes. |
| exercisesIntro | REMOVER | Invisível, sem conteúdo próprio. |
| challengeIntro | REMOVER | Invisível; repete o challenge. |
| solutionIntro | REMOVER | Invisível; repete commentedSolution. |
| summary | ENXUGAR | 5 bullets; 1º = deepDive.mentalModel; novo bullet "Como ler" (estados). |
| nextTheme | ENXUGAR | 2 frases coerentes com 3.7 (VLANs). |
| networkContext | MANTER | Metadado. |
| protocolFields | MOVER:content.concept | IP 32 bits, MAC 48 bits, tipo/estado e interface viraram um parágrafo; o sentido dos estados entrou na tabela de estados. |
| packetFlow | MOVER:content.internals | Coluna "o que pode falhar" da tabela do fluxo. |
| deepDive | MOVER:content.summary/concept | mentalModel → 1º bullet do summary; "não atravessa roteadores" → concept; securityImpact já coberto em security; financialImpact e listas whenToUse genéricas removidas. |
| commonMistakes | MOVER:content.internals | Callout "Erros comuns" com os 4 erros e as correções. |
| troubleshooting | MANTER | Comandos e árvore corretos; um item da árvore recebeu o "teste nslookup/dig e acesso por IP" vindo de lab.troubleshooting. |
| security | ENXUGAR | commonErrors sem repetir o callout (fica o que é de segurança + "concluir com uma tabela só", vindo do ex. 3); hardening sem duplicar goodPractices; goodPractices recebe criptografia ponta a ponta (vinha de history). |
| lab | ENXUGAR | estimatedTimeMinutes 60 → 35; analysisTask ritual trocado por instrução concreta; prerequisites/safetyNotes sem duplicação; troubleshooting 4 → 2; improvements 4 → 2; questions 5 → 3. Passos, comandos, validação e evidências intactos. |
| quiz | ENXUGAR | 6 questões mantidas; distratores ruins trocados em q3.6.2–q3.6.5; q3.6.3 virou cenário; q3.6.6 (decoreba de comando) trocada por q3.6.7 (interpretar STALE); gabarito embaralhado. |
| flashcards | ENXUGAR | 6 mantidos; fc3.6.1 (copiava o quiz q3.6.1) → fc3.6.7 (por que expiram); fc3.6.5 (decoreba "arp -a") → fc3.6.8 (MAC flapping). |
| mentorQuestions | ENXUGAR | 3 mantidas; a 2ª (duplicava o ex3.6.2) trocada por "limpou o cache e voltou: por que não encerra?"; a 3ª recebeu as evidências do ex3.6.3 removido. |
| exercises | ENXUGAR | 4 mantidos; ex3.6.3 (duplicava o mentor 3) → ex3.6.5, interpretação de uma saída de ip neigh. |
| challenge | MANTER | Cenário, tarefas, restrições e rubrica claros. |
| commentedSolution | MANTER | Raciocínio e erros comuns específicos. |
| glossary | MANTER | Os 6 termos são usados na aula. |
| references | MANTER | RFC 826 e IEEE 802.1X são reais. |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Cache ARP = tabela temporária IPv4→MAC na LAN | MANTIDO | concept (definition-box), glossary |
| 2 | Motivo: ARP a cada pacote = broadcast, CPU em todos os hosts da VLAN, latência | MANTIDO | problem (vindo de history) |
| 3 | Entradas expiram porque dispositivos mudam de porta, NIC, VM, VLAN, gateway | MANTIDO | problem, internals passo 5, flashcard fc3.6.7 |
| 4 | Dinâmica × estática; estática é difícil de manter, uso raro e documentado | MANTIDO | concept (vindo de evolution) |
| 5 | Completa × incompleta | MANTIDO | concept, glossary |
| 6 | Cache só tem vizinhos da sub-rede; ARP não atravessa roteadores; destino externo → entrada do gateway | MANTIDO | concept (vindo de deepDive.limitations), summary |
| 7 | Campos: IP 32 bits, MAC 48 bits, tipo/estado, interface; interface inesperada → rota/VPN/bridge | MANTIDO | concept (vindo de protocolFields) |
| 8 | Estados REACHABLE, STALE, INCOMPLETE, FAILED (e PERMANENT) e o que significam | MANTIDO | concept (tabela de estados), quiz q3.6.7, ex3.6.5, troubleshooting |
| 9 | Fluxo: próximo salto → consulta cache → ARP Request broadcast → Reply → atualização → expiração | MANTIDO | internals (tabela) |
| 10 | Falha por passo: máscara errada, entrada antiga, VLAN/isolamento Wi-Fi, MAC inesperado | MANTIDO | internals (vindo de packetFlow) |
| 11 | Limpar cache "resolve" temporariamente, não a causa raiz | MANTIDO | internals, callout Erros comuns, summary, mentor 2, fc3.6.3 |
| 12 | ARP ≠ DNS (nome→IP × IP do próximo salto→MAC) | MANTIDO | callout Erros comuns, ex3.6.1 |
| 13 | MAC não é identidade forte (pode ser alterado) | MANTIDO | callout Erros comuns, quiz q3.6.3, badPractices |
| 14 | HA (HSRP/VRRP, clusters): gateway virtual, MAC virtual pode mudar legitimamente; documentar | MANTIDO | architecture, callout Erros comuns, glossary, mentor 3 |
| 15 | Mesmo IP com MACs diferentes: HA, troca, IP duplicado ou abuso | MANTIDO | motivation, simpleExample, securityExample, quiz q3.6.5, fc3.6.4 |
| 16 | Correlação host × switch L2 × gateway × DHCP × NAC × SIEM | MANTIDO | architecture, diagrama, commentedSolution |
| 17 | MAC do gateway em porta inesperada → cabeamento/VLAN/trunk/loop | MANTIDO | enterpriseExample, detectionIdeas |
| 18 | IP fixo em conflito com reserva DHCP (impressora) | MANTIDO | enterpriseExample |
| 19 | Cloud: L2 abstraída; usar route tables, ENI, SG/NSG, NACL, flow logs; híbrido ainda tem ARP em appliances | MANTIDO | cloudExample |
| 20 | Sequência de coleta: IP, rota, vizinhos ARP, DNS, porta TCP, TLS, HTTP; não mexer em firewall/DNS antes | MANTIDO | callout Erros comuns (vindo de devsecopsExample) |
| 21 | Riscos: ARP spoofing, IP duplicado, MAC flapping, evidência sensível (tabela de risco) | MANTIDO | securityExample |
| 22 | Controles: DAI, DHCP snooping, port security, 802.1X/NAC, segmentação | MANTIDO | security, securityExample, glossary |
| 23 | Criptografia ponta a ponta como mitigação de intercepção | MANTIDO | security.goodPractices (vindo de history) |
| 24 | Sanitizar prints/PCAPs antes de compartilhar | MANTIDO | security, lab.validation, securityExample |
| 25 | Comandos Windows: ipconfig /all, arp -a, ping, route print | MANTIDO | troubleshooting, lab, concept (saída) |
| 26 | Comandos Linux: ip addr, ip route, ip neigh, ping -c 4 | MANTIDO | troubleshooting, lab, concept (saída) |
| 27 | Comandos Cisco: show arp, show mac address-table, show interfaces status, show vlan brief | MANTIDO | troubleshooting, lab passo 6 |
| 28 | Gateway responde, nome falha → nslookup/dig e acesso por IP, DNS | MANTIDO | troubleshooting.decisionTree (vindo de lab.troubleshooting), quiz q3.6.4 |
| 29 | Não concluir ataque com uma única tabela ARP; comparar vários hosts | MANTIDO | security.commonErrors, mentor 3 (vindos do ex3.6.3) |
| 30 | VLANs limitam o domínio de broadcast e o alcance do ARP | MANTIDO | ex3.6.4, nextTheme |
| 31 | ARP foi criado para evitar tabelas manuais IP-MAC | REMOVIDO | fora do escopo: é o tema da 3.5 (pré-requisito) |
| 32 | Impacto financeiro (switches gerenciáveis, NAC, SIEM têm custo) | REMOVIDO | genérico, não ligado a nenhum objetivo |
| 33 | Pipeline que falha ao baixar imagem por perda de L2 no runner | REMOVIDO | exemplo genérico; a lição útil (coletar por camadas antes de mudar algo) foi mantida no item 20 |
| 34 | ip neigh como comando "decoreba" (q3.6.6) e arp -a (fc3.6.5) | REMOVIDO | duplicado: os comandos estão em troubleshooting, lab e concept; os itens trocados testavam só memória |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que existe cache ARP e qual problema ele resolve | problem, concept, mentor 1, fc3.6.7, quiz q3.6.1 |
| Interpretar entradas dinâmicas, estáticas, incompletas e suspeitas | concept (saídas reais e tabela de estados), quiz q3.6.2/q3.6.7, ex3.6.5, fc3.6.2, lab passos 2–5 |
| Diagnosticar gateway, IP duplicado, VLAN incorreta, MAC inconsistente, cache desatualizado | internals (tabela de falhas), simpleExample, enterpriseExample, troubleshooting, ex3.6.2, challenge |
| Usar comandos seguros em Windows, Linux e Cisco IOS | troubleshooting.commands, lab (6 passos), concept (leitura das saídas) |
| Relacionar cache ARP com segurança defensiva, monitoramento e mitigação | securityExample, security, quiz q3.6.3/q3.6.5, mentor 3, fc3.6.6, challenge |

## 10. O que mudou na nova versão
- Removidos history, evolution, devsecopsExample e os 4 *Intro*; os fatos úteis de history/evolution/devsecops foram realocados (itens 2, 4, 14, 19, 20, 23 do inventário).
- Campos invisíveis movidos: protocolFields → concept; packetFlow → tabela do internals; commonMistakes → callout "Erros comuns"; deepDive.mentalModel → 1º bullet do summary; deepDive.limitations → concept.
- **Acréscimo novo 1 (justificado):** exemplos de saída de `arp -a` e `ip neigh` em concept, com a tabela de estados (REACHABLE, STALE, INCOMPLETE, FAILED, PERMANENT). Cobre o objetivo 2 ("Interpretar entradas…"), que no original não tinha nenhuma saída real nem o significado dos estados visível. Parte do texto da tabela é conteúdo movido de protocolFields.
- **Acréscimo novo 2 (justificado):** quiz q3.6.7 e exercício ex3.6.5 interpretam saídas de `ip neigh`. São **trocas**, não somas: substituem q3.6.6 (decoreba de comando) e ex3.6.3 (duplicava o mentor 3). Praticam o objetivo 2. Quantidades mantidas: 6 questões, 6 flashcards, 3 mentor e 4 exercícios.
- Trocas sem aumentar quantidade: fc3.6.1 → fc3.6.7, fc3.6.5 → fc3.6.8, mentor 2 → "limpou o cache e voltou". Os distratores ruins do quiz foram trocados por alternativas plausíveis (rota default, DNS, limpar cache, bloquear porta), e o gabarito foi embaralhado com `quiz_embaralhar`.
- Lab: `estimatedTimeMinutes` 60 → 35 (6 passos curtos: 5 min/passo + leitura = 35,9 min, segundo a ferramenta). analysisTask ritual trocado por uma instrução concreta com exemplo; listas de troubleshooting/improvements/questions enxutas sem perder passos, validação ou evidências.
- securityExample envolto em `responsive-table` (a data-table tem largura mínima de 760px).
- `duration` 90-125 → 100-140 min; `estimatedStudyTimeMinutes` 125 → 140 (faixa recomendada da nova versão; a original estava SUBESTIMADA, e mesmo assim T caiu 18%).
- Aviso do `validar` "ids de quiz originais ausentes: q3.6.6": esperado, porque a questão foi substituída por q3.6.7 (id novo, sem reaproveitar o antigo).
- Palavras visíveis sobem 4% (4765 → 4959) porque ~400 palavras de campos invisíveis passaram a ser exibidas e o quiz ganhou explicações mais completas. Cortes brutos: 657 palavras (14%), coerentes com a linguiça estimada (~16%).

## 11. Depois
Palavras visíveis: 4765 → 4959 (+4%; sem o conteúdo movido de campos invisíveis, ≈ −4%) · Duração: 90-125 min → 100-140 min (T 142,6 → 116,8 min, −18%) · Quiz corrigido: sim (6 questões; 4 com distratores refeitos, 1 trocada, gabarito redistribuído)

## 12. Revisão humana
- Saídas de exemplo de `arp -a` (cabeçalhos em inglês, com nota de que o Windows em português traduz colunas e tipos) e de `ip neigh` foram escritas com valores fictícios, no formato padrão dessas ferramentas. Vale conferir se o curso prefere mostrar a versão em português do Windows.
- `lab.estimatedTimeMinutes` reduzido de 60 para 35 com base nos passos; confirmar se o módulo usa esse valor em outro lugar.
- O diagrama e a árvore de decisão usam a expressão "abuso defensivo de ARP", que soa estranha (o sentido é "investigar abuso de forma defensiva"). Mantive como estava.
- `glossary[].relatedLessons` (subcampo não exibido) cita as aulas "4.0" e "11.0", que podem não existir. Não mexi.

```json
{
  "id": "3.6", "modulo": "m03", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Cache ARP e troubleshooting de rede local",
  "duracao_declarada": "90-125 min", "T_original_min": 142.6, "duracao_nova": "100-140 min", "T_nova_min": 116.8, "duracao_nova_estimated_max": 140,
  "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 16, "conteudo_util": "PARCIAL", "aproveitamento": "MÉDIO",
  "pode_ser_mais_curta": true, "reducao_tempo_pct": 18, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4765, "palavras_visiveis_depois": 4959,
  "palavras_invisiveis_antes": 740, "palavras_invisiveis_depois": 36,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "MANTER", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "REMOVER",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "protocolFields": "MOVER:content.concept", "packetFlow": "MOVER:content.internals",
    "deepDive": "MOVER:content.summary", "commonMistakes": "MOVER:content.internals",
    "troubleshooting": "MANTER", "security": "ENXUGAR", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "ENXUGAR",
    "mentorQuestions": "ENXUGAR", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Saídas de exemplo de arp -a (em inglês, com nota sobre a tradução) e ip neigh com valores fictícios: conferir se o curso prefere o Windows em português",
    "lab.estimatedTimeMinutes 60 -> 35: confirmar que nenhum outro ponto do módulo depende do valor",
    "Expressão 'abuso defensivo de ARP' no diagrama e na decisionTree mantida como estava",
    "glossary.relatedLessons cita as aulas 4.0 e 11.0, possivelmente inexistentes (subcampo não exibido)"
  ]
}
```
