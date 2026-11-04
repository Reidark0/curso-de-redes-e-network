# Aula 2.10 — Revisão prática do Modelo OSI
Tipo: ligação/revisão · Duração declarada: 80-115 min · Palavras visíveis / invisíveis (antes): 3532 / 595

## 1. Duração
T pela fórmula = 80,6 min (teoria 18,6, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0 — a aula não tem lab; a prática é exercícios + desafio).
Veredito: INFLADA — M = 97,5 min > 1,2×T (96,7). A faixa declarada promete até 115 min; a faixa recomendada era 70-95 min. A divisão teoria/prática (27% de leitura) é adequada a uma aula de revisão, então não é DESEQUILIBRADA.

## 2. Encheção de linguiça
Nível: MÉDIA (~20%). Evidências:
- `history`: "O Modelo OSI surgiu como tentativa de padronizar…", "Essa revisão fecha o módulo porque você já viu…" — história e meta-texto que não ajudam numa revisão (6.10); só a ideia "OSI como língua comum entre times" tem valor.
- `evolution`: tabela de "estágios de maturidade do aluno" ("Decorar camadas → Associar protocolos → …"), genérica, repete `problem`.
- `analogy`: entrega corporativa + "Limite da analogia" longo ("redes não são entregas físicas perfeitas…").
- `securityExample`: o parágrafo de abertura repete, em prosa, a tabela logo abaixo.
- A ideia "403 não é problema de rede" aparece em motivation, internals, enterpriseExample, quiz q2, flashcard fc2, mentor 2, decisionTree, commonMistakes e commentedSolution.
- Frase-padrão de `labIntro` ("Esta aula não possui laboratório independente…", 39 aulas) e os quatro `*Intro` invisíveis.
- Sobreposição `exercises` ex2.10.3 (riscos de não sanitizar) × flashcard fc2.10.6 × glossário "Sanitização" × security.goodPractices.
- Quiz com distratores fracos ("Cabo desconectado", "Falha obrigatória de ARP", "Pular direto para Wireshark sempre", "Assumir que é DNS").

## 3. Conteúdo útil
PARCIAL. O que tem de realmente valioso: a lista de perguntas por camada (internals), a regra "comece onde a evidência é mais forte, sem pular conclusões", os contrastes do exemplo empresarial (TCP estabelecido + 403 enfraquece hipótese de firewall; sem ARP para o gateway não se investiga token), a tabela de risco por camada, os comandos por plataforma e o desafio timeout × 403. Lacunas: não havia uma matriz única camada × PDU × componente × evidência/comando (objetivo 2 e 3), apesar de os pedaços estarem espalhados em internals, architecture, troubleshooting e no `protocolFields` invisível; o fluxo de encapsulamento de um acesso web (learningOutcome 2) estava só no `packetFlow` invisível; a diferença 401 × 403 era cobrada no exercício 2 sem ser explicada (objetivo 4). Erros técnicos: (a) o comando Linux usa `curl -vkI` e a interpretação não avisa que `-k` desliga a validação do certificado; (b) os comandos Windows e Linux estavam encadeados com `&&`, o que interrompe a sequência no primeiro teste que falha (justamente quando você quer continuar) e, no Windows, mistura cmd com o cmdlet de PowerShell `Test-NetConnection`.

## 4. Aproveitamento
BOM — contra o T original (80,6 min), cerca de 13 min são removíveis (≈5,5 min de leitura redundante, 6 min de um exercício duplicado e ~2 min de questões triviais), ou seja, ~84% do tempo ensina ou pratica os objetivos. Contra a duração declarada (M = 97,5 min) o aproveitamento cai para ~70%, porque a faixa declarada já estava inflada.

## 5. Pode ser mais curta?
NÃO (pela régua de 15% sobre T) — redução obtida: 10% em T (80,6 → 72,6 min). A duração declarada cai 26% no limite superior (115 → 85 min). O grosso de T é desafio (20) e exercícios (18), que são a prática central da revisão e não devem encolher mais.

## 6. Explicação mais direta
SIM — (a) `internals`: a lista de perguntas em prosa e a lista de componentes de `architecture` viraram uma única tabela camada × PDU × o que verificar × componentes × evidência/comando; (b) `concept`: o fluxo "cliente acessa aplicação web" virou tabela de encapsulamento com falha possível por etapa (vinda do `packetFlow`); (c) `history` + `enterpriseExample`: a ideia dos times com vocabulários diferentes virou uma frase no exemplo empresarial; (d) `securityExample`: a tabela de risco foi para `architecture`, sem o parágrafo que a repetia.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantidos sintomas vagos → perguntas técnicas e o callout do caso 403; frases mais curtas. |
| history | REMOVER | Aula de revisão (6.10); a ideia útil (OSI como língua comum entre times) foi FUNDIDA no exemplo empresarial; a ponte para o Módulo 3 já está em nextTheme. |
| problem | ENXUGAR | Removida a primeira frase que repetia a motivação; mantidos os 5 "sem X" e o roteiro sintoma → … → ação segura. |
| evolution | REMOVER | Tabela de maturidade genérica, repete problem; "comando sem interpretação engana" está no callout "Limites do modelo". |
| concept | ENXUGAR + recebe packetFlow | Definição única (o parágrafo e o definition-box diziam o mesmo) + tabela de encapsulamento do fluxo web com falha possível + "IP não é usuário; porta aberta não é autorização" (de protocolFields). |
| internals | ENXUGAR + FUNDIR (architecture, commonMistakes, deepDive.limitations, protocolFields) | Matriz única por camada com PDU, componentes e comandos; 401 × 403; callouts "Erros comuns" e "Limites do modelo". |
| architecture | ENXUGAR + recebe a tabela de securityExample | Lista de componentes foi para a matriz de internals; ficam o caminho de um acesso, as 4 perguntas por componente e a matriz de segurança (objetivo 3) no fluxo principal, fora do accordion. |
| analogy | REMOVER | Analogia fraca para uma revisão, com limite longo; não acrescenta mecanismo. |
| simpleExample | ENXUGAR | Mantido o caso doméstico em forma de perguntas. |
| enterpriseExample | MANTER (ENXUGAR leve) | Melhor exemplo da aula; recebeu uma frase de history. |
| cloudExample | ENXUGAR | Componentes e callout de custo mantidos, menos repetição. |
| devsecopsExample | ENXUGAR | Um parágrafo; mantidos pipeline e mapeamento Kubernetes. |
| securityExample | MOVER:architecture | Tabela de risco por camada movida; parágrafo de abertura removido (repetia a tabela e a coluna Mitigação, onde entraram 802.1X, port security, monitoramento de ARP, racks). |
| diagram | MANTER | SVG intacto (ids m02l10-*, title/desc preservados); legenda encurtada. |
| labIntro | REMOVER | Invisível; frase-padrão de 39 aulas. |
| exercisesIntro | REMOVER | Invisível; meta-texto. |
| challengeIntro | REMOVER | Invisível; repete o cenário do challenge. |
| solutionIntro | REMOVER | Invisível; meta-texto. |
| summary | ENXUGAR | 5 bullets; primeira linha = deepDive.mentalModel; "próxima ponte" saiu (está em nextTheme). |
| nextTheme | ENXUGAR | Coerente com o título real da 3.1, "Ethernet: a base da rede local cabeada". |
| networkContext | MANTER | Metadado. |
| protocolFields | MOVER:concept | "Quem fala com quem" por camada e "IP não é usuário; porta aberta não é autorização"; PDUs na matriz de internals. |
| packetFlow | MOVER:concept | Virou a tabela de encapsulamento do fluxo web. |
| deepDive | MOVER:summary/internals | mentalModel → summary; limitations → callout em internals; whenToUse/whenNotToUse/operational/financial/securityImpact removidos (genéricos; "culpar outra equipe" já está no exemplo empresarial e no mentor 3; custo no callout de cloud; mudança permissiva em security.vulnerabilities). |
| commonMistakes | MOVER:internals | Callout "Erros comuns" (ping ≠ aplicação; 403 ≠ bloqueio de rede); "decorar sem diagnosticar" já está em problem e no mentor 1. |
| lab | — | A aula não tem lab (lab = null) e progressRules não exige labMarkedDone. |
| quiz | ENXUGAR/TROCAR | 6 questões mantidas: q2.10.1 e q2.10.3 (triviais) trocadas por q2.10.7 (ping falha, porta 443 conecta) e q2.10.8 (sem ARP para o gateway); q2.10.2, q2.10.5 e q2.10.6 com distratores plausíveis. |
| flashcards | TROCAR | 6 mantidos: fc2.10.1 (repetia o mentor 1) e fc2.10.2 (repetia o quiz q2) trocados por fc2.10.7 (401 × 403) e fc2.10.8 (curl -k). |
| mentorQuestions | TROCAR 1 | O mentor 2 (TCP/TLS ok + 403) repetia quiz, flashcard e exercício; trocado por um caso de cloud/VPN com timeout (rota de retorno, NACL, DNS privado, origem do health check). |
| exercises | REMOVER 1 | ex2.10.3 (riscos de não sanitizar) duplicava fc2.10.6, o glossário e security; ficam 3. |
| challenge | MANTER | Cenário timeout × 403 bom; rubrica única de 100 pontos. |
| commentedSolution | MANTER | Raciocínio, passos e erros comuns corretos. |
| glossary | MANTER | Os 6 termos aparecem na nova versão. |
| security | MANTER | Listas específicas; vulnerabilidade coerente. |
| troubleshooting | ENXUGAR/CORRIGIR | Comandos um por linha (sem `&&`), aviso de PowerShell, interpretação do `curl -k` corrigida. |
| references | MANTER | Reais (ISO/IEC 7498-1, RFC 9110, módulo interno). |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | OSI como ferramenta de diagnóstico, não decoreba | MANTIDO | motivation, problem, mentor 1 |
| 2 | Sintomas vagos ("o sistema caiu"…) → perguntas técnicas por camada | MANTIDO | motivation |
| 3 | Caso DNS ok + TCP/443 + TLS + 403 tratado como "problema de rede" | MANTIDO | motivation (callout) |
| 4 | Roteiro sintoma → camada → evidência → comando/log → interpretação → próximo teste → ação segura | MANTIDO | problem, summary, quiz q2.10.6 |
| 5 | Consequências de não ter método/evidência/separação/PDU/segurança por camadas | MANTIDO | problem |
| 6 | Perguntas por camada (sinal/link; MAC/VLAN/ARP/broadcast; IP/gateway/rota/TTL/retorno; porta/handshake/reset; sessão/token; encoding/TLS/certificado; DNS/HTTP/autorização) | MANTIDO | internals (matriz) |
| 7 | PDUs: dados, segmento, pacote, quadro, bits | MANTIDO | internals (coluna PDU), glossário, fc2.10.3/4 |
| 8 | Ordem não precisa ser de baixo para cima; começar pela evidência mais forte | MANTIDO | internals, quiz q2.10.6 |
| 9 | 403 ≠ porta filtrada; falha TLS ≠ rota ausente; ping bloqueado ≠ serviço fora | MANTIDO | internals, quiz q2.10.7 |
| 10 | Encapsulamento de um fluxo web (app → TCP/UDP → IP → frame → bits) com falha por etapa | MANTIDO | concept (de packetFlow) |
| 11 | Origem/destino por camada (MAC, IP, porta, URI/usuário); IP não é usuário; porta aberta não é autorização | MANTIDO | concept, fc2.10.5, quiz q2.10.5 |
| 12 | Componentes atravessados por um acesso (notebook… IAM) e cada transição gera sintoma diferente | MANTIDO | architecture |
| 13 | Componentes por camada (switch/VLAN/AP; subnet/ACL/NAT/VPN/peering/private endpoint; firewall stateful/balanceador; WAF/API gateway/IAM) | MANTIDO | internals (coluna Componentes) |
| 14 | Perguntas por componente: o que decide, que log gera, que risco reduz, que risco fica fora | MANTIDO | architecture |
| 15 | Matriz de risco por camada (risco, evidência, mitigação) | MANTIDO | architecture (de securityExample) |
| 16 | Controles por camada: racks, NAC/802.1X, port security, monitoramento de ARP, STP, ACL, flow logs, firewall stateful, TLS, WAF, MFA, RBAC | MANTIDO | architecture (tabela), security.hardening |
| 17 | Defesa em profundidade | MANTIDO | architecture, summary, glossário |
| 18 | Caso doméstico: Wi-Fi, IP/gateway, ping roteador, DNS, TCP/443, certificado, um site ou todos | MANTIDO | simpleExample |
| 19 | Times diferentes com vocabulários diferentes; OSI como língua comum | MANTIDO | enterpriseExample (de history) |
| 20 | TCP estabelecido + 403 enfraquece hipótese de firewall; sem ARP para o gateway não se investiga token; DNS com IP público errado | MANTIDO | enterpriseExample |
| 21 | Componentes de cloud (VPC/VNet, SG/NSG, NACL, NAT, LB, private endpoint, DNS privado, WAF, IAM) e "não é tudo problema da cloud" | MANTIDO | cloudExample, mentor 2 |
| 22 | Custo de investigar errado em cloud | MANTIDO | cloudExample (callout) |
| 23 | Pipeline com timeout: DNS, proxy, egress, TLS, porta, token, escopo; Kubernetes (Service, EndpointSlice, NetworkPolicy, Ingress, TLS Secret) | MANTIDO | devsecopsExample |
| 24 | Erros comuns: ping prova aplicação; 403 = bloqueio de rede; decorar sem diagnosticar | MANTIDO | internals (callout); o terceiro em problem e mentor 1 |
| 25 | Limites: OSI conceitual; comando prova só parte do fluxo; cloud abstrai camadas | MANTIDO | internals (callout) |
| 26 | Modelo mental "escada de perguntas" | MANTIDO | summary |
| 27 | Comandos Windows/Linux/Cisco IOS e árvore de decisão | MANTIDO | troubleshooting (comandos um por linha) |
| 28 | Sanitização de evidências (tokens, usuários, IPs, nomes internos) | MANTIDO | security, fc2.10.6, glossário, challenge |
| 29 | Mudança permissiva por diagnóstico fraco (any-any) | MANTIDO | security.vulnerabilities, commentedSolution |
| 30 | Sintoma × hipótese × evidência | MANTIDO | ex2.10.1, glossário |
| 31 | Timeout × 403 em usuários remotos (desafio) | MANTIDO | challenge, commentedSolution |
| 32 | Ponte para o Módulo 3 (Ethernet, MAC, switches, ARP, VLAN) | MANTIDO | nextTheme, diagram |
| 33 | História: OSI surgiu para padronizar sistemas diferentes; internet consolidou TCP/IP | REMOVIDO | fora do escopo de uma revisão (6.10); tema das aulas iniciais do módulo |
| 34 | Tabela de estágios de maturidade do aluno | REMOVIDO | genérica; duplicada em problem |
| 35 | Analogia da entrega corporativa | REMOVIDO | não acrescenta mecanismo; a matriz cumpre o papel |
| 36 | deepDive whenToUse/financialImpact/operationalImpact | REMOVIDO | genéricos; custo coberto no callout de cloud |
| 37 | Loops e broadcast citados no nextTheme | REMOVIDO do nextTheme | loop está na matriz de risco (camada 2) e no encapsulamento; o detalhe é conteúdo do Módulo 3 |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Revisar o OSI como ferramenta prática, não memorização | motivation, problem, summary, mentor 1, ex2.10.1 |
| Relacionar camadas, PDUs, protocolos, equipamentos, comandos e evidências | internals (matriz completa), concept (encapsulamento), troubleshooting, quiz q2.10.4, fc2.10.3/4 |
| Construir uma matriz OSI de troubleshooting e segurança | internals (matriz de diagnóstico), architecture (matriz de segurança), ex2.10.4, challenge |
| Diferenciar falhas de rede, transporte, TLS, aplicação, sessão, identidade e autorização | internals (401 × 403, contrastes), enterpriseExample, quiz q2.10.2/5/7/8, fc2.10.7/8, mentor 2, ex2.10.2, challenge |
| Preparar para Ethernet, MAC, switches, VLANs e ARP no Módulo 3 | matriz (camada 2), quiz q2.10.8, diagram, nextTheme |

## 10. O que mudou na nova versão
- Removidos history, evolution, analogy e os quatro `*Intro` invisíveis; securityExample movido para architecture.
- Campos invisíveis movidos: packetFlow → tabela de encapsulamento em concept; protocolFields → concept e coluna PDU da matriz; commonMistakes → callout "Erros comuns"; deepDive.limitations → callout "Limites do modelo"; deepDive.mentalModel → primeira linha do summary. Depois removidos.
- internals virou a matriz única camada × PDU × o que verificar × componentes × evidência/comando, que junta a lista de perguntas, a lista de componentes de architecture e os comandos do troubleshooting (reorganização, não conteúdo novo).
- **Acréscimo novo 1 — 401 × 403 (internals, fc2.10.7, summary):** cobre o objetivo 4 ("diferenciar … identidade e autorização"). O exercício ex2.10.2 já cobrava o 401 sem que a aula explicasse; uma frase resolve.
- **Acréscimo novo 2 — aviso sobre `curl -k` (troubleshooting, fc2.10.8, `curl -v` na matriz):** corrige uma interpretação enganosa do comando original (o `-k` não valida o certificado) e cobre o objetivo 4 na parte de TLS. É uma correção de erro técnico verificável.
- **Acréscimo novo 3 — "muitos firewalls filtram ICMP e deixam a porta do serviço aberta" (internals, quiz q2.10.7):** explica o mecanismo da frase original "ping bloqueado não significa que o serviço está fora", que estava sem justificativa.
- Comandos do troubleshooting em linhas separadas (sem `&&`) e nota de que `Test-NetConnection` roda no PowerShell.
- Quiz: continua com 6 questões. q2.10.1 e q2.10.3 (triviais) substituídas por q2.10.7 e q2.10.8 (diagnóstico); q2.10.2, q2.10.5 e q2.10.6 com distratores plausíveis; gabarito distribuído (posições 1, 3, 0, 0, 3, 2).
- Flashcards: continuam 6 (2 trocados para não repetir quiz e mentor). Mentor: continuam 3 (1 trocado). Exercícios: de 4 para 3 (removido o duplicado).
- Subtitle enxugado; nextTheme alinhado ao título real da 3.1; duration 80-115 → 60-85 min; estimatedStudyTimeMinutes 115 → 85.

## 11. Depois
Palavras visíveis: 3532 → 3489 (−1,2%; teoria visível 2416 → 2154, −11%; cerca de 260 palavras vieram de campos invisíveis) · Invisíveis: 595 → 47 (só networkContext) · Duração: 80-115 min → 60-85 min (T 80,6 → 72,6) · Quiz corrigido: sim (6 questões; 2 trocadas, 3 com distratores refeitos). Cortes brutos 705 palavras (20%), coerentes com a linguiça estimada (~20%); acréscimos brutos 662, a maior parte movida de invisíveis ou reescrita em tabela, e o resto nas opções e explicações mais completas do quiz e no mentor novo.
Aviso do validar: "ids de quiz originais ausentes: q2.10.1, q2.10.3" — esperado: as duas questões triviais foram substituídas por questões com ids novos (q2.10.7, q2.10.8), sem reaproveitar ids (11.5).

## 12. Revisão humana
- O arquivo do módulo m02 lista `lab-2.10` em `requiredLabs`, mas a aula 2.10 não tem lab (lab = null, também no original) e o progressRules usa quiz/checklist. Não alterado (fora do escopo); conferir se o módulo deveria deixar de exigir esse lab.
- Correções técnicas feitas por serem verificáveis: interpretação do `curl -vkI` (o `-k` ignora a validação do certificado) e comandos sem `&&` (o encadeamento parava no primeiro teste que falha; no Windows misturava cmd e PowerShell). Conferir se o tom bate com o resto do curso.
- Acréscimo 401 × 403 (definições conforme a RFC 9110: 401 = faltam credenciais válidas; 403 = o servidor entendeu e recusou) — conferir se as aulas anteriores do módulo usam a mesma formulação.
- O callout "Limites do modelo" cita o TLS como exemplo clássico de protocolo que atravessa camadas (a matriz o mantém na Camada 6, como no original). Conferir se isso é coerente com o que as aulas anteriores do módulo dizem sobre o TLS.

```json
{
  "id": "2.10", "modulo": "m02", "tipo": "ligação/revisão", "status": "CONCLUIDA",
  "titulo": "Revisão prática do Modelo OSI",
  "duracao_declarada": "80-115 min", "T_original_min": 80.6, "duracao_nova": "60-85 min", "T_nova_min": 72.6,
  "duracao_nova_estimated_max": 85, "veredito_duracao": "INFLADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 20, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 10, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 3532, "palavras_visiveis_depois": 3489,
  "palavras_invisiveis_antes": 595, "palavras_invisiveis_depois": 47,
  "secoes": {
    "motivation": "ENXUGAR", "history": "REMOVER", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "ENXUGAR", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "REMOVER",
    "simpleExample": "ENXUGAR", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR",
    "devsecopsExample": "ENXUGAR", "securityExample": "MOVER:architecture", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "protocolFields": "MOVER:concept", "packetFlow": "MOVER:concept",
    "deepDive": "MOVER:summary", "commonMistakes": "MOVER:internals",
    "quiz": "ENXUGAR", "flashcards": "ENXUGAR", "mentorQuestions": "ENXUGAR",
    "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER", "glossary": "MANTER",
    "security": "MANTER", "troubleshooting": "ENXUGAR", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Módulo m02 lista lab-2.10 em requiredLabs, mas a aula não tem lab (nem no original).",
    "Correções técnicas: interpretação do curl -vkI (-k ignora o certificado) e comandos sem && no troubleshooting.",
    "Acréscimo 401 x 403 (RFC 9110): conferir se bate com a formulação das aulas anteriores do módulo.",
    "Callout 'Limites do modelo' cita o TLS como protocolo que atravessa camadas; conferir coerência com as aulas anteriores."
  ]
}
```

> **Controle de qualidade do m02 (revisor independente):** APROVADA. Gabarito conferido. Menores aceitos: a numeração das etapas em `concept` (1 = Aplicação) é inversa à das camadas em `internals`; "OSI não substitui logs reais" saiu junto com a analogia.
