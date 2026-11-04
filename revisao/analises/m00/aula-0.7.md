# Aula 0.7 — O que é um protocolo
Tipo: fundamental · Duração declarada: 75-105 min · Palavras visíveis / invisíveis (antes): 5835 / 607

## 1. Duração
T pela fórmula = 125,1 min (teoria 26,7, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 36,4 — o `lab.estimatedTimeMinutes` de 105 min não é plausível para 6 passos de comandos simples, então vale a alternativa 5 min/passo + leitura).
Veredito: **SUBESTIMADA** — M = 90 < 0,8×T = 100. A distribuição é razoável para uma aula fundamental (teoria 24% do T, o resto em prática e fixação), mas o lab declarava 105 min sozinho, o que não bate com os passos.

## 2. Encheção de linguiça
Nível: **MÉDIA (~17%)**. Evidências:
- `motivation`: abertura de recapitulação ("Até agora você estudou como computadores representam informação, como bits e bytes…") e lista longa de perguntas ("O WAF bloqueou por política? O token representa o usuário correto?").
- `history`: telecomunicações e "protocolos sociais" (não explicam o mecanismo); a lista de protocolos por função e a tabela de fases repetem `architecture`. Só a ideia de padrões abertos/interoperabilidade tem valor para os objetivos.
- `evolution`: "Protocolos evoluíram de regras simples para ecossistemas complexos" e o parágrafo de camadas repete `architecture`; a tabela de tipos de protocolo é útil.
- `concept`: primeiro parágrafo repete a lista de `problem` e a própria `definition-box`.
- `architecture`: item "Pontos de falha" repete o callout da motivação e a tabela do exemplo empresarial.
- `enterpriseExample`: lista genérica de serviços ("Active Directory, DNS interno, DHCP, VPN, proxies, SIEM, EDR…").
- `cloudExample`: lista "Security Groups, NACLs, route tables, DNS privado…" e callout que repete o parágrafo anterior.
- `devsecopsExample`: lista de 4 itens que repete o primeiro parágrafo ("kubectl conversa com o API Server…").
- `securityExample`: aviso de ética ("O estudo defensivo de protocolos não significa aprender a atacar…") e tabela de riscos que sobrepõe `security.vulnerabilities`.
- `security`: hardening/detectionIdeas repetem goodPractices/monitoring ("Configurar versões mínimas seguras" × "Desabilitar versões inseguras"; "alertas para spikes de 401…" × "Aumento de erros 4xx/5xx").
- `lab`: frases-padrão "Em cloud real, remova os recursos criados ao final…" (lab é local) e "Produza o artefato indicado na instrução do passo…"; `lab.challenge`/`lab.solution` repetem o `challenge` e a q0.7.5.
- Invisíveis: `labIntro`, `exercisesIntro`, `challengeIntro`, `solutionIntro`, `deepDive` (269 palavras) e `commonMistakes` (162 palavras, com conteúdo bom escondido).

## 3. Conteúdo útil
**FORTE.** O que tem de realmente valioso: o exemplo `47 45 54` = `GET`; a lista formato/significado/ordem/tempo/estado/erro/segurança; as fases de uma conversa (início → encerramento); a requisição HTTP literal; a tabela sintoma → protocolo → evidência → hipótese; o exemplo de SSO (issuer, audience, expiração, clock); a árvore de decisão DNS → TCP → TLS → HTTP → pipeline; o lab com comandos reais (netstat/ss, Test-NetConnection, curl -v/-I, 404 controlado) e o desafio 401 × 403.
Lacunas: o objetivo 2 cita "sintaxe" e "semântica", termos que a aula nunca usava; "negociação" não aparecia na lista de elementos; o significado de cada status code (401 × 403 × 404 × 429 × 500) só aparecia na solução comentada.
Erros técnicos: no passo 1 do lab, `ss -tulpen` lista só sockets em escuta (`-l`) e não as conexões com estado que o passo pede; `curl` no Windows PowerShell 5.1 é alias de `Invoke-WebRequest`, então os passos 3–5 precisavam de `curl.exe`; `labType: "cloud"` num lab local. Quiz com todos os gabaritos na posição 0 e distratores absurdos ("A temperatura da placa de rede", "O cabo do notebook está sempre quebrado", "portas só existem em Wi-Fi").

## 4. Aproveitamento
**BOM** — cerca de 7 min dos 125 min do T original (≈6%) vão para texto removível; o restante ensina ou pratica os objetivos (~94%). Contra a duração declarada (90 min de ponto médio) a proporção é a mesma, mas o aluno gasta mais tempo do que a aula promete.

## 5. Pode ser mais curta?
**NÃO** — redução prevista: ~3% do T (125,1 → 121,2 min). A linguiça está concentrada em teoria, que pesa pouco no T; a prática (exercícios, desafio, lab) é legítima.

## 6. Explicação mais direta
**SIM** — (a) `motivation`: cortar a recapitulação e começar por "bytes sozinhos não garantem comunicação"; (b) `concept`: deixar só a `definition-box` + exemplos por protocolo, sem repetir a lista de `problem`; (c) `history`/`evolution`: reduzir a 3 frases sobre padrões abertos e interoperabilidade dentro de `problem`, e levar a tabela de tipos de protocolo para `internals`; (d) `securityExample`: tirar a tabela de riscos (já está em `security`) e o aviso de ética; (e) `simpleExample`: dizer o que cada status code significa no lugar de só listá-los.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Sem recapitulação; mantém o problema real e 5 perguntas de diagnóstico. |
| history | FUNDIR:problem | Só a ideia de padrões abertos → interoperabilidade (objetivo 3) ficou, em 3 frases; telecom/protocolos sociais e a tabela de fases saíram. |
| problem | ENXUGAR | Mantém `47 45 54`, a lista (agora com "sintaxe", "semântica", "temporização" e "versão e negociação") e o callout porta ≠ protocolo; recebe o trecho de interoperabilidade. |
| evolution | FUNDIR:internals | A tabela de tipos de protocolo foi para `internals`; o parágrafo de camadas foi para `architecture`. |
| concept | ENXUGAR | Definição + exemplos TCP/HTTP/DNS/TLS/OIDC; o primeiro parágrafo repetia a lista. |
| internals | MANTER | Fases da conversa mantidas; recebe a tabela de tipos (de `evolution`) e os limites de especificação × implementação (de `deepDive.limitations`). |
| architecture | ENXUGAR | Camadas cooperando (de `evolution`) + grupos de protocolos; "Pontos de falha" removido (repetido); recebe o callout "Erros comuns" (de `commonMistakes`). |
| analogy | ENXUGAR | Analogia boa; limite em 1 frase. |
| simpleExample | MANTER | Requisição HTTP literal; acrescentado o significado de 401/403/404/429/500. |
| enterpriseExample | ENXUGAR | Sai a lista genérica de serviços; ficam o SSO e a tabela sintoma → evidência. |
| cloudExample | ENXUGAR | Fica o que é específico (LB terminando TLS, gateway validando JWT, Private Endpoint); sai a lista de controles e o callout repetido. |
| devsecopsExample | ENXUGAR | Um parágrafo de protocolos no pipeline + um com falhas típicas (429, clock skew, schema); a lista repetida saiu. |
| securityExample | ENXUGAR | Fica a fronteira de segurança + uso no SOC; a tabela de riscos foi para `security` e o aviso de ética saiu. |
| diagram | MANTER | Correto e legível; só o `<h2>` perdeu o número. |
| labIntro | REMOVER | Invisível, texto de moldura. |
| exercisesIntro | REMOVER | Invisível, texto de moldura. |
| challengeIntro | REMOVER | Invisível, texto de moldura. |
| solutionIntro | REMOVER | Invisível, texto de moldura. |
| summary | ENXUGAR | 5 bullets; o segundo é o `deepDive.mentalModel` ("como ler qualquer protocolo"). |
| nextTheme | ENXUGAR | 1 frase coerente com a 0.8. |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary/internals/troubleshooting | mentalModel → summary; limitations → internals; whenNotToUse (camada física antes) → `troubleshooting.decisionTree`; "não presuma erro de aplicação…" já coberto pela árvore; keyTerms, whenToUse, operationalImpact, financialImpact e securityImpact removidos (genéricos ou repetidos em `security`/glossário/callout de versão). |
| commonMistakes | MOVER:architecture | Callout "Erros comuns" (ping ≠ aplicação, 4xx/5xx ≠ rede, versão/negociação); porta ≠ protocolo já estava no callout de `problem`. |
| security | ENXUGAR | Itens repetidos fundidos (versões mínimas, alertas de status, versões legadas); acrescentada a vulnerabilidade "Serviço sem autenticação", que vem da tabela de `securityExample`. |
| troubleshooting | MANTER | `exemplo.com` → `example.com` (domínio reservado, igual ao lab); primeiro ramo da árvore: link/interface down. |
| lab | ENXUGAR | labType → local; estimatedTimeMinutes 105 → 35; `ss -tunap` no passo 1; `curl.exe` no Windows; safetyNotes de 6 para 2; `analysisTask` ritual removido; improvements de 4 para 2; `lab.challenge`/`lab.solution` removidos (iguais ao desafio). |
| quiz | ENXUGAR | Normalizado; distratores plausíveis; explicações mais precisas; nova q0.7.7 (sintaxe × semântica); gabaritos embaralhados. |
| flashcards | MANTER | fc0.7.2 (porta, igual à q0.7.3) trocada por fc0.7.7 (ping ≠ aplicação). |
| mentorQuestions | MANTER | 3 perguntas de raciocínio boas. |
| exercises | MANTER | 4, com expectedAnswer. |
| challenge | MANTER | Cenário 401 × 403 bom, rubrica única. |
| commentedSolution | MANTER | Correta e completa. |
| glossary | MANTER | Os 6 termos aparecem na aula (interoperabilidade agora está em `problem`). |
| references | MANTER | RFC 791, 768 e 9110 reais; referências internas mantidas. |
| linksToOtherCourses | MANTER | Coerentes. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Bytes sozinhos não garantem comunicação | MANTIDO | motivation |
| 2 | Caso: ping/DNS/porta ok e chamada falha (TLS, header, token, JSON) | MANTIDO | motivation (callout) |
| 3 | Ambiguidade: `47 45 54` = `GET` em HTTP | MANTIDO | problem |
| 4 | Elementos: formato, significado, ordem, tempo, estado, erro, segurança | MANTIDO | problem (com sintaxe/semântica/temporização/negociação nomeadas) |
| 5 | Porta ≠ protocolo | MANTIDO | problem (callout), q0.7.3 |
| 6 | Padrões abertos, documentos públicos, múltiplos fornecedores → interoperabilidade | MANTIDO | problem (último parágrafo) |
| 7 | Sistemas fechados por fabricante = ilhas incompatíveis | MANTIDO | problem |
| 8 | Protocolos sociais/telecomunicações como origem | REMOVIDO | história que não explica o mecanismo (a analogia cobre a ideia) |
| 9 | Tabela de fases (fechado → LAN → internet → web/cloud) | REMOVIDO | repetia architecture e o parágrafo de interoperabilidade |
| 10 | Definição: protocolo = contrato de comunicação | MANTIDO | concept (definition-box) |
| 11 | Regras de TCP, HTTP, DNS, TLS e OIDC | MANTIDO | concept |
| 12 | Seis elementos internos (mensagens, campos, estados, temporização, erros, negociação) | MANTIDO | internals |
| 13 | Fases: início, mensagem inicial, interpretação, estado, resposta, timeout/retry, encerramento | MANTIDO | internals |
| 14 | Tipos: texto × binário, com × sem conexão, seguro por negociação | MANTIDO | internals (tabela, vinda de evolution) |
| 15 | Protocolos antigos em texto sem autenticação forte/criptografia | MANTIDO | internals (tabela, linha Texto simples) |
| 16 | Protocolos modernos combinam compressão, multiplexação, observabilidade | REMOVIDO | frase genérica; multiplexação continua em internals |
| 17 | Especificação × implementação (bugs, buffer, parsing, timeouts) | MANTIDO | internals |
| 18 | Protocolo bem definido ≠ implementação correta; seguro pode ser mal configurado | MANTIDO | internals (de deepDive.limitations) |
| 19 | Protocolos diferentes podem compartilhar a mesma porta (proxy, multiplexação, encapsulamento) | MANTIDO | internals; explicação da q0.7.3 |
| 20 | Camadas cooperam, cada uma com seu contrato (Ethernet, IP, TCP, TLS, HTTP, OIDC) | MANTIDO | architecture (de evolution) |
| 21 | Grupos: conectividade, aplicação, segurança/identidade, plataforma | MANTIDO | architecture |
| 22 | A rede entrega os bytes, mas a aplicação rejeita o contrato | MANTIDO | architecture |
| 23 | Erro comum: ping ok ≠ aplicação ok | MANTIDO | architecture (callout), fc0.7.7 |
| 24 | Erro comum: 4xx/5xx não são problema de rede | MANTIDO | architecture (callout), ex0.7.2 |
| 25 | Erro comum: ignorar versão/negociação; documentar versões e depreciações | MANTIDO | architecture (callout) |
| 26 | Analogia do chamado técnico + limite (formato rígido) | MANTIDO | analogy |
| 27 | Acesso a site: DNS → TCP → TLS → HTTP, requisição `GET / HTTP/1.1` | MANTIDO | simpleExample |
| 28 | Erro por etapa; significado de 401/403/404/429/500 | MANTIDO | simpleExample (significados acrescentados) |
| 29 | SSO: redirect, assinatura, issuer, audience, expiração, relógio | MANTIDO | enterpriseExample |
| 30 | Tabela sintoma → protocolo → evidência → hipótese (NXDOMAIN, refused, CN/SAN, 403, token) | MANTIDO | enterpriseExample |
| 31 | Lista genérica de serviços corporativos | REMOVIDO | genérica, não ensina nada específico |
| 32 | Cloud: LB terminando HTTPS, gateway validando JWT, Private Endpoint, banco exigindo TLS | MANTIDO | cloudExample |
| 33 | Lista de controles cloud (SG, NACL, route tables…) | REMOVIDO | lista genérica; o ponto "cloud não resolve o contrato" ficou |
| 34 | Pipeline: Git, registry, kubectl/API Server, IaC, federação OIDC | MANTIDO | devsecopsExample |
| 35 | Falhas de pipeline: token, certificado, proxy TLS, 429, método, schema, versão de API, clock skew | MANTIDO | devsecopsExample |
| 36 | GitOps/webhooks, SBOM/scanners | REMOVIDO | lista genérica sem mecanismo |
| 37 | Protocolo como fronteira de segurança; downgrade, replay, parsing, bypass | MANTIDO | securityExample + security.vulnerabilities |
| 38 | SOC diferencia tráfego normal de varredura, exfiltração, beaconing | MANTIDO | securityExample |
| 39 | Riscos: versão insegura, parsing frágil, autenticação ausente, logs insuficientes, segredo em URL/log | MANTIDO | security (vulnerabilities, incluindo a nova "Serviço sem autenticação"; logs em goodPractices) |
| 40 | Aviso "estudo defensivo não é ataque" | REMOVIDO | aviso de ética genérico; a aula não tem prática ofensiva |
| 41 | Árvore de decisão física → DNS → TCP → TLS → HTTP → pipeline | MANTIDO | troubleshooting.decisionTree (ramo físico vindo de deepDive.whenNotToUse) |
| 42 | Comandos: Test-NetConnection, curl -I/-v, ss -tulpen, show ip interface brief, show access-lists | MANTIDO | troubleshooting.commands |
| 43 | Lab: netstat/ss, TCP 443, curl -v, curl -I, 404 controlado, tabela de evidências | MANTIDO | lab.steps 1–6 (com `ss -tunap` e `curl.exe`) |
| 44 | Lab: investigar API com ping/443 ok e 401 no pipeline | REMOVIDO | duplicado do challenge e da q0.7.5 |
| 45 | 401 = credencial; 403 = permissão/política | MANTIDO | simpleExample, enterpriseExample, challenge, commentedSolution |
| 46 | Impacto financeiro/operacional (custos de gateway, logs) | REMOVIDO | genérico e invisível (deepDive) |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar protocolo como regras, não nome de tecnologia | concept (definição), problem (47 45 54), summary, q0.7.1, ex0.7.1 |
| Diferenciar sintaxe, semântica, temporização, estados, mensagens, erros e negociação | problem (lista nomeada), internals (seis elementos e fases), q0.7.7, fc0.7.5 |
| Padrões e interoperabilidade | problem (último parágrafo), glossário "Interoperabilidade", references (RFCs) |
| Relacionar com TCP, UDP, HTTP, DNS, TLS, APIs, autenticação, cloud e DevSecOps | concept, architecture, simpleExample, enterpriseExample, cloudExample, devsecopsExample, ex0.7.3 |
| Identificar falhas em logs, comandos e sintomas | simpleExample (erro por etapa), enterpriseExample (tabela), troubleshooting, lab, quiz q2/q5/q6, challenge |
| Riscos de segurança de protocolos mal implementados/configurados | internals (especificação × implementação), securityExample, security, q0.7.4, ex0.7.4 |

## 10. O que mudou na nova versão
- `history` e `evolution` removidos: interoperabilidade foi para `problem`, a tabela de tipos para `internals` e as camadas para `architecture`.
- Lista de elementos em `problem` com os termos dos objetivos (sintaxe, semântica, temporização, versão e negociação).
- `commonMistakes` virou o callout "Erros comuns" em `architecture`; `deepDive.mentalModel` virou um bullet do `summary`; `deepDive.limitations` foi para `internals`; o ramo "camada física primeiro" entrou na árvore de decisão.
- `simpleExample` agora diz o que significam 401/403/404/429/500.
- Exemplos cloud, DevSecOps, empresarial e segurança enxutos (sem listas genéricas); a tabela de riscos foi fundida em `security` (+ vulnerabilidade "Serviço sem autenticação").
- `security` sem itens repetidos entre goodPractices/hardening/monitoring/detectionIdeas.
- Lab: `ss -tunap` para ver conexões com estado (o `ss -tulpen` mostra só sockets em escuta); `curl.exe` no Windows; labType `local`; 35 min; sem frase-padrão de cloud nem `analysisTask` ritual; `lab.challenge`/`lab.solution` removidos (duplicavam o desafio).
- Troubleshooting: `exemplo.com` → `example.com`.
- Quiz: formato padrão, distratores plausíveis, explicações mais precisas, nova q0.7.7, gabaritos redistribuídos (antes todos em 0). Flashcard fc0.7.2 trocado por fc0.7.7.
- `<h2>` sem número; classes novas só estilizadas (`callout`, `callout warning`, `responsive-table` + `data-table`).
- `duration` 75-105 → 105-145 min; `estimatedStudyTimeMinutes` 105 → 145.

## 11. Depois
Palavras visíveis: 5835 → 5605 (−3,9%; cortes brutos 950 = 16%, acréscimos 720, sobretudo no quiz e no conteúdo movido de campos invisíveis) · Teoria visível: 3470 → 3013 · Invisíveis: 607 → 49 (só `networkContext`) · Duração: declarada 75-105 min → nova 105-145 min (T 125,1 → 121,2) · Quiz corrigido: sim (7 questões). `validar`: ok, sem erros nem avisos.

## 12. Revisão humana
- `lab.labType` mudou de "cloud" para "local" (o lab só roda comandos no computador do aluno). O app não usa o campo, mas confira se algum relatório ou filtro externo depende dele.
- `lab.estimatedTimeMinutes` mudou de 105 para 35 (6 passos simples; a fórmula dá 35,8).
- Passo 1 do lab: troquei `ss -tulpen` por `ss -tunap` como comando principal no Linux, porque `-l` lista só sockets em escuta e o passo pede conexões com estado. O `ss -tulpen` ficou como segunda linha.
- Nos passos 3–5 e na validação do lab, acrescentei `curl.exe` para Windows, já que no Windows PowerShell 5.1 `curl` é alias de `Invoke-WebRequest`.
- `lab.challenge` e `lab.solution` removidos por duplicarem o `challenge` principal e a q0.7.5; confira se o desafio do lab era usado separadamente.
- Diagrama mantido sem mudanças, mas usa classes sem estilo no CSS (`svg-node--server`, `svg-node--attacker`, `svg-flow--request/--response`), que caem no estilo base; o nó "Erro" usa `svg-node--attacker`, o que é semanticamente estranho. Não alterei.

```json
{
  "id": "0.7", "modulo": "m00", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "O que é um protocolo",
  "duracao_declarada": "75-105 min", "T_original_min": 125.1, "duracao_nova": "105-145 min", "veredito_duracao": "SUBESTIMADA",
  "T_nova_min": 121.2, "duracao_nova_estimated_max": 145,
  "linguica_nivel": "MÉDIA", "linguica_pct": 17, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 3, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 5835, "palavras_visiveis_depois": 5605,
  "palavras_invisiveis_antes": 607, "palavras_invisiveis_depois": 49,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "FUNDIR:internals",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary/internals/troubleshooting", "commonMistakes": "MOVER:architecture",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.labType alterado de cloud para local",
    "lab.estimatedTimeMinutes alterado de 105 para 35",
    "Passo 1 do lab: ss -tunap no lugar de ss -tulpen (que só lista sockets em escuta)",
    "curl.exe acrescentado para Windows nos passos 3-5 e na validação do lab",
    "lab.challenge e lab.solution removidos por duplicarem o challenge principal",
    "Diagrama usa classes sem estilo (svg-node--server, svg-node--attacker, svg-flow--request/--response); não alterado"
  ]
}
```
