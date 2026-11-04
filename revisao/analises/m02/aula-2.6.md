# Aula 2.6 — Camada 4 — Transporte: TCP, UDP, portas e conexões
Tipo: fundamental · Duração declarada: 90-125 min · Palavras visíveis / invisíveis (antes): 4680 / 780

## 1. Duração
T pela fórmula = 136,6 min (teoria 19,6, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 55)
Veredito: SUBESTIMADA. M = 107,5 < 0,8×T = 109,3. A divisão é equilibrada para uma aula fundamental com lab (17% de leitura, o resto é prática). O lab de 55 min é plausível, mas alto para 7 passos (4 comandos curtos e 3 registros escritos; alternativa da fórmula = 41 min).

## 2. Encheção de linguiça
Nível: MÉDIA (~20%). Evidências:
- `evolution`: tabela histórica genérica ("NGFW, WAF, observabilidade e políticas por identidade/contexto", "Policy as code, revisão automática e service mesh") que não explica o mecanismo; os poucos fatos úteis (portas conhecidas, QUIC sobre UDP, saturação de estado) já estão ou cabem em outras seções.
- `history`: "Com o tempo, portas se tornaram elementos centrais de operação e segurança. Firewalls, NAT, proxies, balanceadores, scanners defensivos, SIEMs…" (lista que repete `architecture`/`problem`).
- `securityExample` repete `security.vulnerabilities` (porta exposta, egress/exfiltração) e `badPractices` (any-any).
- `architecture`: lista de Kubernetes e cloud que repete `cloudExample`/`devsecopsExample`; o primeiro parágrafo é só uma enumeração.
- `cloudExample`: parágrafo de custo genérico ("…e tráfego entre zonas podem gerar custo recorrente", frase repetida em 4 aulas).
- `devsecopsExample`: "portas aparecem em runners, registries, scanners, webhooks, APIs, bancos…" (lista sem conteúdo).
- `analogy`: limite da analogia em 3 frases.
- lab: `analysisTask` ritual "Produza o artefato indicado na instrução do passo e registre a evidência objetiva…" (3 vezes, frase repetida em 56 aulas); `lab.challenge`/`lab.solution` repetem o `challenge` (API em TCP/8443); `questions` e `improvements` genéricos ou repetidos.
- Prática redundante: o cenário "ping funciona, mas TCP falha" aparece em quiz q2.6.3, flashcard fc2.6.4, mentor 2, exercício ex2.6.2 e lab.questions; ex2.6.1 repete mentor 1; fc2.6.1/fc2.6.2 copiam q2.6.1/q2.6.2; q2.6.5 é trivial (distratores "teclado", "monitor físico").
- Invisíveis com valor escondido: `protocolFields`, `packetFlow`, `deepDive.limitations`/`mentalModel` e `commonMistakes` (780 palavras que o aluno não vê).

## 3. Conteúdo útil
PARCIAL. Valioso: handshake SYN/SYN-ACK/ACK, FIN/RST, porta efêmera × porta de serviço, firewall stateful, árvore de decisão timeout × RST × TLS × HTTP, comandos Test-NetConnection/netstat/ss/curl, exemplos concretos (8080 × targetPort 80, TCP/5432 exposto, any-any). Lacunas: o objetivo "diferenciar porta, socket, conexão e sessão de aplicação" não é coberto no conteúdo (socket só aparece no glossário; conexão e sessão não são definidas); nenhuma saída de netstat/ss é interpretada (learningOutcome 2); a leitura de timeout × RST só existe no lab e no `packetFlow` invisível; DNS em TCP/53 é citado sem explicar quando, embora haja um sintoma sobre isso. Erros técnicos: `curl -vkI` usado para "ver se o TLS falha", mas `-k` desliga a validação do certificado e esconde o erro; no Windows PowerShell 5.1, `curl` pode ser alias de Invoke-WebRequest; "o security group bloqueia retorno" (security groups e NSGs são stateful; quem bloqueia retorno é uma ACL stateless); ex2.6.2 lista "serviço escutando em outra porta" como causa de timeout (em geral gera RST); o SVG tinha a seta UDP saindo de fora do cliente e o rótulo sobreposto ao card "Camada 4 responde". Quiz: todas as respostas no índice 0 e distratores implausíveis.

## 4. Aproveitamento
BOM (~81%, no limite). Contra T = 136,6 min, cerca de 26 min não ensinam os objetivos: ~5 min de teoria redundante, ~10 min de excesso no lab (ritual e desafio duplicado), ~10 min de prática repetida (ex2.6.1, mentor 2, q2.6.5, dois flashcards). Contra a duração declarada (107,5 min), o desperdício pesaria 24%, mas a declarada é que estava subestimada.

## 5. Pode ser mais curta?
NÃO (abaixo do limiar de 15%). Redução real: 7% (T 136,6 → 127,2 min), vinda do lab (55 → 45 min). A teoria não encolhe porque recebeu o conteúdo dos campos invisíveis e a cobertura do objetivo de socket/conexão/sessão; a prática foi trocada item a item, sem somar.

## 6. Explicação mais direta
SIM.
- `problem` absorve `history` em 2 frases (IP identifica host, não processo; IP perde e reordena → TCP e UDP).
- `concept`: prosa TCP × UDP de history/evolution/exercício → tabela; nova tabela porta/socket/conexão/sessão.
- `internals`: a leitura das respostas ao SYN (SYN-ACK/RST/nada) vira tabela logo após o handshake; campos do cabeçalho em tabela.
- `architecture`: lista de componentes → tabela componente × papel × falha típica (fundida com `packetFlow`).
- `simpleExample`: uma linha real de netstat interpretada, em vez de só descrever.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Recap da Camada 3 em 1 frase; callout mantido mais curto |
| history | FUNDIR:problem | Só o porquê (IP não identifica processo; IP não garante entrega) ficou, em 2 frases |
| problem | MANTER | Absorveu history; multiplexação e demultiplexação num item só |
| evolution | REMOVER | Tabela histórica genérica; portas conhecidas e QUIC foram para concept, saturação de estado para internals/security |
| concept | MANTER | + tabela TCP×UDP, + tabela porta/socket/conexão/sessão (objetivo 2), + TCP/53 |
| internals | MANTER | + protocolFields em tabela, + leitura de SYN-ACK/RST/timeout, + UDP/ICMP, + rota assimétrica, + limitações (deepDive) |
| architecture | ENXUGAR | Lista vira tabela com falhas típicas (do packetFlow); K8s/cloud ficam nos exemplos |
| analogy | ENXUGAR | Limite em 1 frase |
| simpleExample | MANTER | + linha de netstat interpretada (learningOutcome 2) |
| enterpriseExample | MANTER | Concreto (22, 3389, 5432, 1433, any-any) |
| cloudExample | ENXUGAR | Removido o parágrafo de custo genérico; corrigido "security group bloqueia retorno" |
| devsecopsExample | ENXUGAR | Removida a lista de lugares; port/targetPort/nodePort trazidos de architecture |
| securityExample | FUNDIR:security | Linha "UDP mal entendido" virou vulnerabilidade; o resto já estava em security |
| diagram | MANTER | Corrigida a legibilidade: seta UDP agora sai do cliente e não cruza o card; ids e title/desc preservados |
| labIntro | REMOVER | Invisível |
| exercisesIntro | REMOVER | Invisível |
| challengeIntro | REMOVER | Invisível |
| solutionIntro | REMOVER | Invisível |
| summary | ENXUGAR | 4 bullets; mentalModel do deepDive como primeiro bullet; leitura SYN-ACK/RST/timeout |
| nextTheme | ENXUGAR | 1 frase coerente com 2.7 |
| security | ENXUGAR | + vulnerabilidade UDP (de securityExample); hardening/monitoring sem duplicatas |
| troubleshooting | MANTER | Corrigido curl -vkI → curl -vI; interpretações mais concretas (listener em 127.0.0.1) |
| lab | ENXUGAR | Removidos analysisTask ritual, lab.challenge/solution (duplicavam o desafio); safetyNotes 4→2, improvements 4→2, questions 5→3; estimatedTimeMinutes 55→45; curl corrigido |
| quiz | MANTER | 6 questões: q2.6.5 trivial trocada por q2.6.7 (RST × timeout); distratores plausíveis; gabarito variado |
| flashcards | MANTER | 6: fc2.6.1/.2/.4 (cópias do quiz) trocados por 5-tupla, flags TCP e estados LISTEN/ESTABLISHED/UNCONN |
| mentorQuestions | MANTER | 3: a 2ª (repetia quiz e exercício) virou firewall stateful + rota assimétrica |
| exercises | MANTER | 4: ex2.6.1 (repetia mentor 1) trocado por ex2.6.5 (ler linha de netstat); ex2.6.2 corrigido |
| challenge | MANTER | Bom e específico |
| commentedSolution | MANTER | Passos com comandos concretos (Test-NetConnection/curl -v, ss -tulpen) |
| glossary | MANTER | 6 termos, todos usados |
| references | MANTER | RFC 9293, RFC 768 e módulos internos |
| linksToOtherCourses | MANTER | Reais |
| networkContext | MANTER | Metadado |
| protocolFields | MOVER:internals | Tabela de campos |
| packetFlow | MOVER:architecture/internals | Falhas por componente; leitura de SYN-ACK/RST |
| deepDive | MOVER:summary/internals | mentalModel → summary; limitations → callout em internals e tabela; whenToUse/whenNotToUse/operational/financial removidos (repetidos ou genéricos) |
| commonMistakes | MOVER:security/problem | Já cobertos em problem (ping), security.commonErrors, badPractices e internals (UDP) |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Camada 4 entrega ao processo/serviço; IP identifica host | MANTIDO | motivation, problem, summary |
| 2 | Definição de Transporte (confiabilidade, ordenação, controle de fluxo/conexão) | MANTIDO | concept (definition-box) |
| 3 | Multiplexação e demultiplexação | MANTIDO | problem |
| 4 | TCP confiável sobre IP que perde/atrasa/reordena | MANTIDO | problem, concept (tabela) |
| 5 | UDP sem conexão, menos overhead, aplicação trata perda | MANTIDO | problem, concept (tabela), internals |
| 6 | Porta = número lógico, não tomada física (16 bits) | MANTIDO | concept |
| 7 | Portas conhecidas 22, 53, 80, 443 | MANTIDO | concept, motivation |
| 8 | Porta 25 (SMTP) | REMOVIDO | Só aparecia numa linha da tabela de evolution; fora do objetivo |
| 9 | DNS em UDP/53 e TCP/53 | MANTIDO | concept (+ quando usa TCP) |
| 10 | QUIC usa UDP | MANTIDO | concept (tabela TCP×UDP) |
| 11 | Porta efêmera do cliente (52344) | MANTIDO | concept, internals, simpleExample, diagram, flashcard |
| 12 | Socket | MANTIDO | concept (tabela), glossary |
| 13 | Three-way handshake SYN, SYN-ACK, ACK | MANTIDO | internals, glossary, fc2.6.8 |
| 14 | Sequência, ACK, janelas, retransmissão | MANTIDO | internals, concept |
| 15 | FIN e RST no encerramento | MANTIDO | internals, fc2.6.8 |
| 16 | Firewall stateful acompanha estado; permite respostas | MANTIDO | internals, glossary, fc2.6.6 |
| 17 | Estado consome memória / saturação de tabela | MANTIDO | internals, architecture, security.vulnerabilities |
| 18 | Campos Source/Destination Port, Sequence Number, Flags, UDP Length (tamanhos) | MANTIDO | internals (tabela, de protocolFields) |
| 19 | SYN-ACK = escutando; RST = porta fechada/rejeição; timeout = descarte | MANTIDO | internals (tabela), summary, troubleshooting.decisionTree, lab passo 6, q2.6.7 |
| 20 | Falhas por componente (egress, regra ausente, listener na interface errada…) | MANTIDO | architecture (de packetFlow) |
| 21 | Limitações: porta aberta ≠ app saudável; porta fechada não diz onde; UDP pode não responder; ICMP bloqueado ≠ TCP bloqueado | MANTIDO | internals (callout + parágrafo UDP) |
| 22 | Estado de firewall esconde rota assimétrica | MANTIDO | internals, mentor 2 |
| 23 | Ping (ICMP) não testa porta nem TLS/autenticação | MANTIDO | problem, simpleExample, summary, q2.6.3, security.commonErrors |
| 24 | Porta aberta não prova TLS/sessão/autorização | MANTIDO | simpleExample, internals, q2.6.6, security |
| 25 | Kubernetes Service port/targetPort/nodePort; 8080 × 80 | MANTIDO | devsecopsExample |
| 26 | Health check TCP ok, mas HTTP em outro path | MANTIDO | devsecopsExample |
| 27 | Cloud: SG, NSG, listeners, target groups, health checks | MANTIDO | cloudExample, architecture |
| 28 | Custo de LB/NAT/flow logs em cloud | REMOVIDO | Genérico (frase repetida em várias aulas); fora dos objetivos |
| 29 | Portas administrativas 22/3389 via bastion/VPN/PAM; banco 5432/1433 não exposto | MANTIDO | enterpriseExample, security.goodPractices |
| 30 | Política madura: origem, destino, protocolo, porta, justificativa, prazo, logs; any-any é má prática | MANTIDO | enterpriseExample, q2.6.4, ex2.6.4, security |
| 31 | Egress irrestrito → exfiltração/C2; volume incomum em porta permitida | MANTIDO | security.vulnerabilities |
| 32 | UDP mal entendido → amplificação/abuso de DNS | MANTIDO | security.vulnerabilities (de securityExample) |
| 33 | Comandos Test-NetConnection, netstat -ano, ss -tulpen, curl -v, show access-lists, show tcp brief | MANTIDO | troubleshooting.commands, lab |
| 34 | Árvore de decisão L3 → timeout → RST → TLS → HTTP 401/403/500 | MANTIDO | troubleshooting.decisionTree |
| 35 | Sanitizar evidências (IPs internos, PIDs, usuários) | MANTIDO | lab passo 7, safetyNotes, validation |
| 36 | Evolução histórica (serviços por host → LB, NGFW, policy as code, service mesh) | REMOVIDO | Não explica o mecanismo; fora do escopo desta aula |
| 37 | whenToUse/operationalImpact/financialImpact do deepDive | REMOVIDO | Repetiam troubleshooting/security ou eram genéricos |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar o papel da Camada 4 no Modelo OSI | motivation, problem, concept (definição), summary, q2.6.1 |
| Diferenciar TCP, UDP, porta, socket, conexão e sessão de aplicação | concept (tabela TCP×UDP e tabela porta/socket/conexão/sessão), fc2.6.7, ex2.6.3 |
| Descrever o three-way handshake em nível defensivo | internals (passos + tabela de respostas), diagram, fc2.6.8, q2.6.7 |
| Entender por que firewalls e balanceadores usam portas e estado | internals (stateful, rota assimétrica), architecture, mentor 2, fc2.6.6 |
| Relacionar Camada 4 com APIs, TLS, Kubernetes, cloud, logs e segurança | cloudExample, devsecopsExample, enterpriseExample, security, challenge |
| Coletar evidências de portas abertas, conexões e falhas de transporte | simpleExample (netstat), troubleshooting.commands, lab, ex2.6.5, fc2.6.9 |

## 10. O que mudou na nova versão
- Removidos history, evolution, securityExample e os quatro *Intro invisíveis; history fundido em problem.
- Movidos para onde o aluno vê: `protocolFields` (tabela em internals), `packetFlow` (tabela de architecture e leitura de respostas em internals), `deepDive.mentalModel` (1º bullet do summary), `deepDive.limitations` (callout em internals), linha UDP de securityExample (security.vulnerabilities). `commonMistakes` já estava coberto e foi removido.
- Acréscimos novos, com justificativa:
  - tabela porta/socket/conexão/sessão + 5-tupla + faixas de portas efêmeras: cobre o objetivo 2, que só tinha "socket" no glossário;
  - linha de netstat interpretada em simpleExample e o exercício ex2.6.5 (que substitui ex2.6.1, sem somar): cobrem o learningOutcome 2 (identificar porta local, remota e estado), que não era praticado;
  - "TCP/53 para respostas grandes e transferências de zona": explica o sintoma "DNS responde via UDP, mas transferências grandes falham", que já existia no troubleshooting;
  - UDP: porta fechada costuma gerar ICMP port unreachable: explica a limitação "UDP pode não responder mesmo quando o serviço existe";
  - interpretação de listener em 127.0.0.1 (ss) e nota curl.exe no Windows: tornam executável e interpretável o comando que o lab já usava.
- Correções técnicas: `curl -vkI` → `curl -vI` (o -k esconde erro de certificado) em troubleshooting, lab e validation; "security group bloqueia retorno" → "ACL stateless de sub-rede bloqueia o retorno"; ex2.6.2 não lista mais "porta errada" como causa de timeout; SVG reposicionado (seta UDP sai do cliente, rótulo não sobrepõe o card).
- Quiz: normalizado (`q/opts/a/exp` → `question/options/answer/explanation`); q2.6.5 (trivial) trocada por q2.6.7 (RST × timeout); distratores plausíveis em todas; gabarito em posições 0–3; explicações sem referência à posição. Mesmas 6 questões em quantidade.
- Flashcards (6 → 6): fc2.6.1, fc2.6.2 e fc2.6.4 (cópias do quiz) trocados por fc2.6.7 (5-tupla), fc2.6.8 (flags) e fc2.6.9 (estados). Mentor (3 → 3): o 2º virou rota assimétrica com firewall stateful. Exercícios (4 → 4).
- Lab: analysisTask ritual removido, lab.challenge/solution removidos (duplicavam o desafio), safetyNotes/improvements/questions enxutos, `estimatedTimeMinutes` 55 → 45 (4 comandos curtos e 3 registros escritos; a fórmula alternativa dá ~40 min). Passos, comandos, validação, evidências e troubleshooting do lab mantidos.
- `duration` 90-125 → 110-155 min; `estimatedStudyTimeMinutes` 125 → 155 (faixa da nova versão; a original estava SUBESTIMADA).
- Aviso do `validar` ("q2.6.5 ausente"): intencional, a questão trivial foi substituída por q2.6.7 com id novo.

## 11. Depois
Palavras visíveis: 4680 → 5102 (+9%; cerca de 400 palavras vieram dos campos invisíveis e ~190 são distratores mais plausíveis no quiz, que não mudam o tempo pela fórmula) · Teoria visível 2542 → 2624 · Invisíveis 780 → 31 (networkContext) · Duração: declarada 90-125 min → nova 110-155 min (T 136,6 → 127,2 min) · Quiz corrigido: sim (6 questões)

## 12. Revisão humana
- cloudExample: troquei "o security group bloqueia retorno" por "uma ACL stateless de sub-rede bloqueia o retorno" (security groups/NSGs são stateful). Conferir.
- `curl -vkI` → `curl -vI` em troubleshooting, lab e validation (o -k ignora a validação de certificado e contradizia o lab.troubleshooting "curl conecta, mas falha em certificado"); nota de usar `curl.exe` no Windows PowerShell.
- ex2.6.2: retirei "serviço escutando em outra porta" das causas de timeout (normalmente resulta em RST). Conferir.
- Fatos novos a conferir: faixas de portas efêmeras (49152–65535 no Windows/IANA; 32768–60999 no Linux); DNS em TCP/53 para respostas grandes e transferências de zona; ICMP port unreachable em porta UDP fechada.
- lab.estimatedTimeMinutes reduzido de 55 para 45 min.
- Diagrama SVG reposicionado (cliente mais alto, DNS e card deslocados) por ilegibilidade; conferir o visual no app.
- A duração declarada sobe (90-125 → 110-155 min) porque a fórmula fixa dá T = 127 min.

```json
{
  "id": "2.6", "modulo": "m02", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Camada 4 — Transporte: TCP, UDP, portas e conexões",
  "duracao_declarada": "90-125 min", "T_original_min": 136.6, "duracao_nova": "110-155 min", "veredito_duracao": "SUBESTIMADA",
  "T_nova_min": 127.2, "duracao_nova_estimated_max": 155,
  "linguica_nivel": "MÉDIA", "linguica_pct": 20, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 7, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4680, "palavras_visiveis_depois": 5102,
  "palavras_invisiveis_antes": 780, "palavras_invisiveis_depois": 31,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "MANTER", "evolution": "REMOVER",
    "concept": "MANTER", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER", "networkContext": "MANTER",
    "protocolFields": "MOVER:internals", "packetFlow": "MOVER:architecture", "deepDive": "MOVER:summary",
    "commonMistakes": "MOVER:security"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "cloudExample: 'security group bloqueia retorno' trocado por 'ACL stateless de sub-rede bloqueia o retorno'",
    "curl -vkI trocado por curl -vI (o -k esconde erro de certificado) e nota curl.exe no Windows PowerShell",
    "ex2.6.2: 'serviço em outra porta' retirado das causas de timeout (normalmente gera RST)",
    "Conferir fatos novos: faixas de portas efêmeras (Windows/IANA 49152-65535; Linux 32768-60999), DNS em TCP/53, ICMP port unreachable em UDP",
    "lab.estimatedTimeMinutes 55 -> 45",
    "SVG reposicionado por ilegibilidade; conferir visual",
    "Duração declarada sobe de 90-125 para 110-155 min pela fórmula"
  ]
}
```

> **Controle de qualidade do m02 (revisor independente):** APROVADA. As correções técnicas (SG/NSG stateful × ACL stateless, curl sem -k, SYN-ACK/RST/timeout, portas efêmeras) e o SVG foram conferidos. Ajuste menor aplicado pelo orquestrador: no ex2.6.2, "serviço SSH parado sem resposta" virou "firewall do host descartando o SYN", porque serviço parado sem filtro gera RST, como a própria aula ensina. Menores aceitos: Ingress/NetworkPolicy e NAT gateway saíram dos exemplos.
