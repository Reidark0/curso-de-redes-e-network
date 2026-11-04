# Aula 1.4 — Topologias físicas e lógicas
Tipo: fundamental · Duração declarada: 75-105 min · Palavras visíveis / invisíveis (antes): 4954 / 609

## 1. Duração
T pela fórmula = 156,9 min (teoria 19,9, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 75)
Veredito: SUBESTIMADA — M = 90 min < 0,8×T (125,5). O lab sozinho (75 min, plausível para 7 passos com 3 desenhos; alternativa da fórmula 42,7 min) quase esgota a faixa declarada. A divisão (15% leitura, 85% prática) é coerente com uma aula fundamental cujo objetivo 5 é mapear uma rede pequena; não é DESEQUILIBRADA. Lab e desafio pedem coisas parecidas (dois mapas + riscos), mas em cenários diferentes (rede do aluno × empresa fictícia), o que é prática legítima.

## 2. Encheção de linguiça
Nível: BAIXA (~11%, ~550 palavras). Evidências:
- `securityExample` × `security.vulnerabilities`: a tabela "Rede plana / Ponto único de falha / Caminho invisível" repete as três vulnerabilidades do bloco `security` (~140 palavras).
- `security`: listas que se repetem entre si — "Aplicar segmentação por função e criticidade" × hardening "Segmentar redes críticas" + "Usar redes separadas…"; "Proteger diagramas como informação sensível" × "Guardar diagramas sensíveis em locais públicos"; commonErrors "Achar que o mesmo switch significa mesma rede" (já está em concept, summary, quiz, flashcard e decisionTree).
- `history` × `evolution`: "Topologias evoluíram para resolver limitações de escala, disponibilidade e controle" repete "A evolução das topologias acompanhou uma necessidade simples…".
- `architecture` (parágrafo de cloud) × `cloudExample`: duas listas de componentes de VPC/VNet.
- `motivation` 2º parágrafo: "O desenho dos cabos mostra uma parte da realidade. O caminho lógico… mostra outra. A política… mostra outra. A rota… mostra outra." (quatro frases para uma ideia).
- Lab: frase-padrão repetida 3× (56 aulas) "Produza o artefato indicado na instrução do passo e registre a evidência objetiva…"; safetyNote "Em cloud real, remova os recursos criados…" (48 aulas) num lab sem cloud; prerequisites "Executar apenas comandos permitidos…" repete safetyNotes; improvement "Documentar pontos únicos de falha" repete o passo 7.
- `mentorQuestions[1]` ("mesmo switch, não se comunicam") pergunta o mesmo que `exercises[1]`, `quiz q1.4.2`, `flashcards fc1.4.3` e o 1º ramo da `decisionTree`; `fc1.4.3` copia o quiz.
- `analogy`: limite da analogia em duas frases; `nextTheme` com meta-texto ("Depois de entender topologias, o próximo tema será…").
- Campos invisíveis: `deepDive` (314) e `commonMistakes` (136) guardavam conteúdo bom (erros comuns, custo, SDN, pergunta-guia) fora da vista do aluno; `labIntro`, `exercisesIntro`, `challengeIntro`, `solutionIntro` eram moldura.

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: distinção física × lógica × funcional com exemplos ("mesmo switch, VLANs diferentes"; "Wi-Fi conectado, internet não"), tabela comparativa de 7 topologias (vantagem, limitação, uso atual), passo a passo do encaminhamento (host decide local/remoto → próximo salto → intermediários → caminho dinâmico → assimetria), modelo acesso/distribuição/core, comandos de troubleshooting com interpretação (Windows, Linux, Cisco IOS), lab executável com validação e evidências, desafio com rubrica.
Lacunas: custo (objetivo 3) e SDN (objetivo 4) só apareciam em campos invisíveis (`deepDive.financialImpact`, `deepDive.limitations`); o quiz só testava uma das 7 topologias (malha). Erros técnicos: nenhum relevante. Quiz com distratores absurdos ("Base64 mal codificado", "O teclado do administrador", "A cor do rack do provedor").

## 4. Aproveitamento
BOM — ~95% do T original (156,9 min) vai para algo que ensina ou pratica os objetivos; a linguiça custa ~4 min de leitura mais ~3 min de prática duplicada (mentor e flashcard repetidos). Contra a duração declarada (90 min) a conta não fecha: a aula simplesmente não cabe no tempo prometido.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~1%. O tempo é dominado por lab (75), exercícios (24) e desafio (20), todos ligados aos objetivos; a linguiça está na teoria, que pesa só 20 min.

## 6. Explicação mais direta
SIM — pontos localizados: `motivation` (quatro frases "mostra outra" viram uma), `history`+`evolution` (fundidos num parágrafo antes da tabela), `architecture` (sem a lista de cloud duplicada), `devsecopsExample` (dois parágrafos viram um), `analogy` (limite em 1 frase), `nextTheme` sem meta-texto. Erros comuns e custo saem de campos invisíveis para callout/parágrafo junto do conceito e da arquitetura.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Cenário mantido; 2º parágrafo de 5 frases condensado em 1. |
| history | FUNDIR:evolution | Ajuda a entender por que física ≠ lógica hoje; virou o parágrafo de abertura de `evolution`. |
| problem | MANTER | Lista "sem topologia física/lógica/atualizada" é útil; só tirado "O problema técnico é que". |
| evolution | MANTER | Tabela das 7 topologias é o núcleo do objetivo 2; recebeu o histórico e o wrapper `responsive-table`. |
| concept | MANTER | Definição intacta; recebeu o callout "Erros comuns" vindo de `commonMistakes`. |
| internals | MANTER | Mecanismo intacto; recebeu "muda dinamicamente por roteamento/failover/automação" e "diagrama fica obsoleto" (`deepDive.limitations`). |
| architecture | ENXUGAR | Parágrafo de cloud fundido em `cloudExample`; recebeu o parágrafo de custo (`deepDive.financialImpact`, objetivo 3). |
| analogy | ENXUGAR | Analogia boa; limite reduzido a 1 frase. |
| simpleExample | MANTER | Concreto e curto. |
| enterpriseExample | ENXUGAR | Removida a repetição de acesso/distribuição; mantida a lista de VLANs e as "duas visões". |
| cloudExample | MANTER | Recebeu os itens únicos de `architecture` (route tables, security groups, transit gateway, zonas) e a limitação de cloud/SDN com definição de SDN (objetivo 4). |
| devsecopsExample | ENXUGAR | Exemplos específicos mantidos (runner sem rota ao registry, NetworkPolicy, Ingress) em um parágrafo. |
| securityExample | FUNDIR:security | A tabela repetia `security.vulnerabilities`; a ideia do SOC foi para `goodPractices` e a "assimetria inesperada" virou a 4ª vulnerabilidade. |
| diagram | MANTER | Correto e legível; ids `m01l04-*`, `<title>` e `<desc>` preservados. |
| labIntro | REMOVER | Invisível, moldura. |
| exercisesIntro | REMOVER | Invisível, moldura. |
| challengeIntro | REMOVER | Invisível, moldura. |
| solutionIntro | REMOVER | Invisível, moldura. |
| summary | MANTER | 5 bullets; 1º é o `deepDive.mentalModel`; acrescentado bullet dos modelos de topologia. |
| nextTheme | ENXUGAR | Sem meta-texto, coerente com 1.5 "Meios de transmissão: cobre, fibra e rádio". |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary/concept/internals/architecture/cloudExample/security | mentalModel → summary; limitations → internals, concept, cloudExample; financialImpact → architecture; whenNotToUse "diagramas sensíveis sem controle de acesso" → security.goodPractices; o resto (operationalImpact, securityImpact, whenToUse, keyTerms) já estava na tabela, em `security` ou no glossário. Campo removido. |
| commonMistakes | MOVER:concept | Os 4 erros viraram o callout "Erros comuns" em `concept`. Campo removido. |
| troubleshooting | MANTER | Comandos com purpose/expectedObservation/interpretation preenchidos; árvore de decisão específica. |
| security | ENXUGAR | Listas deduplicadas (goodPractices × hardening × badPractices × commonErrors); recebeu o conteúdo de `securityExample`. |
| lab | ENXUGAR | Passos, comandos, validação, troubleshooting e evidências intactos; removidos 3 analysisTask rituais, a safetyNote de cloud (não há cloud), 1 pré-requisito e 1 improvement duplicados; safetyNotes 5 → 2 sem perder conteúdo. |
| quiz | ENXUGAR | 6 → 7 questões; distratores absurdos trocados por plausíveis; nova q1.4.7 (spine-leaf × outras topologias); gabarito redistribuído (quiz_embaralhar). |
| flashcards | MANTER | fc1.4.3 (copiava q1.4.2) trocado por fc1.4.7 (acesso/distribuição/core); 6 cards. |
| mentorQuestions | MANTER | Q2 (duplicava ex1.4.2/q1.4.2) trocada por pergunta de ponto comum (learningOutcome 2, decisionTree "Apenas uma parte da rede caiu"). |
| exercises | MANTER | 4 exercícios com expectedAnswer. |
| challenge | MANTER | Cenário, restrições e rubrica claros (100 pontos). |
| commentedSolution | MANTER | Raciocínio, passos, respostas erradas e final coerentes. |
| glossary | MANTER | 6 termos, todos usados na aula. |
| references | MANTER | Referências internas, IEEE 802 e documentação oficial dos provedores. |
| linksToOtherCourses | MANTER | Relevantes (IaC, Kubernetes, Zero Trust). |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Topologia = forma como elementos se organizam e conectam; análise física, lógica ou funcional | MANTIDO | concept (funcional agora explicada: DNS, proxy, autenticação) |
| 2 | Definição de topologia física (cabos, enlaces, portas, APs) | MANTIDO | concept definition-box; glossary; fc1.4.1 |
| 3 | Definição de topologia lógica (fluxo, segmentos, caminhos, políticas) | MANTIDO | concept definition-box; glossary; fc1.4.2; q1.4.1 |
| 4 | Mesmo switch físico, separados por VLAN e firewall; prédios diferentes parecendo próximos (rede virtual, túnel, balanceador) | MANTIDO | concept; diagram; q1.4.2; summary |
| 5 | Redes antigas: física ≈ lógica (barramento, anel); Ethernet comutada, VLANs, overlays, cloud separaram as visões | MANTIDO | evolution (1º parágrafo) |
| 6 | Estrela física com várias VLANs; spine-leaf físico com redes virtuais | MANTIDO | evolution |
| 7 | Tabela: barramento, anel, estrela, árvore, malha, hub-and-spoke, spine-leaf (funcionamento, vantagem, limitação, uso) | MANTIDO | evolution |
| 8 | Lista sem física / sem lógica / sem atualização / sem separar camadas | MANTIDO | problem |
| 9 | Rede plana facilita movimento lateral; segmentação limita blast radius | MANTIDO | problem; security.vulnerabilities[0]; q1.4.4 |
| 10 | Topologia por camada (física, enlace: MAC/VLAN/loops, rede: IP/gateway/rotas, superiores: DNS/proxy/TLS) | MANTIDO | internals |
| 11 | Fluxo de encaminhamento em 5 passos | MANTIDO | internals |
| 12 | Caminho muda dinamicamente (roteamento, failover, automação) | MANTIDO | internals passo 4 (vindo de deepDive.limitations) |
| 13 | Assimetria afeta firewall stateful, logs e troubleshooting | MANTIDO | internals; security.vulnerabilities[3]; q1.4.6; fc1.4.6; glossary |
| 14 | Topologia = estrutura + estado + decisão + política; diagramas ficam obsoletos sem processo | MANTIDO | internals |
| 15 | Acesso, distribuição (VLANs, roteamento, ACLs, agregação), core, perímetro, cloud/híbrido | MANTIDO | architecture; fc1.4.7 |
| 16 | Custo da redundância (switches, links, portas, licenças, energia; failover precisa de teste) | MANTIDO | architecture (vindo de deepDive.financial/operationalImpact) |
| 17 | Cloud: custo recorrente de links dedicados/inter-regionais; super × subdimensionamento | MANTIDO | architecture |
| 18 | Componentes lógicos de cloud (VPC/VNet, subnets, route tables, NAT, SG, LB, endpoints, peering, transit gateway, zonas) | MANTIDO | cloudExample; q1.4.5; ex1.4.4 |
| 19 | Hub-and-spoke em cloud centraliza inspeção; risco de gargalo/SPOF no hub | MANTIDO | cloudExample; evolution; fc1.4.4; glossary |
| 20 | Cloud/SDN escondem o físico mas não latência, zonas, rotas e dependências | MANTIDO | cloudExample (vindo de deepDive.limitations, com definição de SDN) |
| 21 | Analogia da cidade (ruas × regras de trânsito; ponte bloqueada) | MANTIDO | analogy |
| 22 | Exemplo doméstico: Wi-Fi conectado, lógica quebrada (gateway, DNS, rota, modem) | MANTIDO | simpleExample; ex1.4.1 |
| 23 | Exemplo empresarial: VLANs de usuários, servidores, gestão, impressoras, Wi-Fi corporativo/visitante, VPN, WAN | MANTIDO | enterpriseExample |
| 24 | DevSecOps: Terraform cria topologia; Kubernetes (Pods, Services, Ingress, NetworkPolicies, CNI); deploy falha por topologia | MANTIDO | devsecopsExample ("ambientes efêmeros" removido: menção sem explicação) |
| 25 | Topologia revela caminhos de ataque, pontos de controle, zonas de confiança, coleta de logs; SOC sem topologia não vê movimento lateral | MANTIDO | security.goodPractices (vindo de securityExample) |
| 26 | Riscos: ponto único de falha, caminho oculto/túnel não documentado | MANTIDO | security.vulnerabilities[1–2] |
| 27 | Diagramas são sensíveis; publicar com controle de acesso | MANTIDO | security.goodPractices; fc1.4.5 |
| 28 | Erros comuns: confundir física/lógica; estrela sempre segura; cloud como nuvem genérica; diagrama como decoração (quem fala com quem, por onde, política, evidência) | MANTIDO | concept callout "Erros comuns" (vindo de commonMistakes) |
| 29 | Diagrama simples demais esconde risco; complexo demais não é usado | MANTIDO | concept callout |
| 30 | Pergunta-guia: cabo, segmento, rota, política, túnel ou aplicação? | MANTIDO | summary (vindo de deepDive.mentalModel) |
| 31 | Comandos: ipconfig/route print/tracert; Test-NetConnection -Port -TraceRoute; ip addr/ip route/traceroute; ss/curl -I; show cdp neighbors/interfaces status/vlan brief; show spanning-tree/ip route | MANTIDO | troubleshooting.commands |
| 32 | Árvore de decisão (mesmo switch; parte da rede caiu → ponto comum; ida sem volta; diagrama × evidência) | MANTIDO | troubleshooting.decisionTree; mentor Q2 |
| 33 | Monitoramento (rotas, firewall, conexões novas entre segmentos, STP/flapping) e detecção (NetFlow/sFlow, visitante → interna) | MANTIDO | security.monitoring/detectionIdeas |
| 34 | Lab: 7 passos (interfaces, gateway/DNS, traceroute 1.1.1.1, nslookup/dig, mapa físico, mapa lógico, riscos), validação, troubleshooting do lab, evidências | MANTIDO | lab |
| 35 | Marcar como hipótese o que não tem evidência | MANTIDO | lab passo 5, troubleshooting do lab, rubrica |
| 36 | ICMP bloqueado: usar Test-NetConnection/curl | MANTIDO | lab.validation/troubleshooting |
| 37 | Desafio: 20 usuários, Wi-Fi visitantes, VPN cloud pelo firewall; rubrica 100 pts | MANTIDO | challenge, commentedSolution |
| 38 | Safety note "remover recursos de cloud" | REMOVIDO | fora do escopo: o lab não cria recursos em cloud (frase-padrão de 48 aulas) |
| 39 | "Achar que o mesmo switch significa mesma rede" em security.commonErrors; "Não representar redes de gestão e backup" | REMOVIDO / MANTIDO | o 1º era duplicado em concept, summary, q1.4.2, decisionTree; o 2º foi fundido em security.goodPractices ("Documentar… redes de gestão e backup") |
| 40 | Mentor "mesmo switch, não se comunicam" e fc1.4.3 | REMOVIDO | duplicados em ex1.4.2, q1.4.2 e decisionTree |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar topologia física e lógica | concept (definição + erros comuns), diagram, simpleExample, enterpriseExample, q1.4.1, q1.4.2, fc1.4.1–2, ex1.4.1 |
| Reconhecer estrela, barramento, anel, malha, árvore, hub-and-spoke, spine-leaf | evolution (tabela), architecture (árvore), q1.4.3, q1.4.7, fc1.4.4, glossary |
| Relacionar com disponibilidade, custo, desempenho, segurança e troubleshooting | evolution (tabela), architecture (custo), problem, security, troubleshooting, q1.4.4, q1.4.6, mentor Q2 |
| Cloud e SDN tornam o físico menos visível, mas não irrelevante | cloudExample (com definição de SDN), devsecopsExample, summary, q1.4.5, ex1.4.4, mentor Q3 |
| Mapear rede pequena com observação, comandos e hipóteses | lab (7 passos), troubleshooting.commands, challenge, commentedSolution |

## 10. O que mudou na nova versão
- `history` fundido em `evolution`; `securityExample` fundido em `security` (assimetria virou 4ª vulnerabilidade; SOC em goodPractices).
- `commonMistakes` virou callout "Erros comuns" em `concept`; `deepDive` distribuído (mentalModel no summary, limitações em internals/cloudExample, custo em architecture). SDN passou a ser definido (objetivo 4).
- `motivation`, `architecture`, `enterpriseExample`, `devsecopsExample`, `analogy` e `nextTheme` enxugados; `<h2>` sem números.
- `security`: listas deduplicadas.
- Lab: removidos analysisTask rituais, safetyNote de cloud e duplicações; safetyNotes fundidas em 2.
- Quiz: distratores plausíveis em todas as questões, nova q1.4.7 (spine-leaf), gabarito redistribuído; explicações de q1.4.1, q1.4.5 e q1.4.6 ajustadas.
- Flashcard fc1.4.3 → fc1.4.7; mentor Q2 trocada por pergunta de ponto comum.
- `duration` 75-105 → 135-190 min; `estimatedStudyTimeMinutes` 105 → 190.

## 11. Depois
Palavras visíveis: 4954 → 5217 (+5,3%; cortes brutos 398 e acréscimos 661, quase todos do conteúdo movido de campos invisíveis e dos novos distratores/questão do quiz) · Invisíveis: 609 → 55 (só `networkContext`) · Duração: 75-105 min → 135-190 min (T 156,9 → 158,7) · Quiz corrigido: sim (7 questões)

## 12. Revisão humana
- Duração sobe de 75-105 para 135-190 min (fórmula fixa; o lab de 75 min, mantido por ser plausível, domina). Confirmar se o lab deve ficar em 75 min.
- `lab.labType` é "cloud", mas o lab é local (rede doméstica/pequena empresa, custo zero). Metadado não usado pelo app; mantido sem alteração.
- Mentor Q2 e flashcard fc1.4.7 são novos (substituem itens duplicados); q1.4.7 é nova. Conferir se o tom e o nível estão adequados.

```json
{
  "id": "1.4", "modulo": "m01", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Topologias físicas e lógicas",
  "duracao_declarada": "75-105 min", "T_original_min": 156.9, "duracao_nova": "135-190 min", "T_nova_min": 158.7, "duracao_nova_estimated_max": 190, "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "BAIXA", "linguica_pct": 11, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 0, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4954, "palavras_visiveis_depois": 5217,
  "palavras_invisiveis_antes": 609, "palavras_invisiveis_depois": 55,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:evolution", "problem": "MANTER", "evolution": "MANTER",
    "concept": "MANTER", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "MANTER", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary/concept/internals/architecture/cloudExample/security", "commonMistakes": "MOVER:concept",
    "troubleshooting": "MANTER", "security": "ENXUGAR", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Duração sobe de 75-105 para 135-190 min (fórmula fixa; lab de 75 min mantido por ser plausível): confirmar o tempo do lab.",
    "lab.labType = 'cloud' num lab local de custo zero; metadado não usado pelo app, mantido.",
    "Itens novos para conferir tom e nível: mentor Q2 (ponto comum), flashcard fc1.4.7, quiz q1.4.7."
  ]
}
```
