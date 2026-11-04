# Aula 2.8 — Diagnóstico por camadas: método prático de troubleshooting
Tipo: fundamental · Duração declarada: 85-120 min · Palavras visíveis / invisíveis (antes): 4157 / 667

## 1. Duração
T pela fórmula = 139,9 min (teoria 17,9, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 60)
Veredito: SUBESTIMADA — M = 102,5 min < 0,8×T = 111,9 min. A aula promete menos tempo do que a prática exige (lab de 8 passos com matriz final, desafio e 4 exercícios). A divisão (15% leitura, 85% prática) é adequada para uma aula de método prático, então não é DESEQUILIBRADA. O `lab.estimatedTimeMinutes` = 60 é plausível (alternativa 5 min/passo + leitura = 45,5 min) e foi mantido.

## 2. Encheção de linguiça
Nível: MÉDIA (~17%, cerca de 700 das 4157 palavras visíveis). Evidências:
- `history`: "Antes de modelos de camadas se tornarem comuns, troubleshooting era frequentemente feito por tentativa e erro…" e "Com cloud, VPN, Zero Trust, proxies, WAF…, o diagnóstico ficou mais complexo" — evolução genérica; só a ideia "OSI virou linguagem operacional, cada camada tem sintomas/ferramentas/logs/responsáveis" ensina algo.
- `evolution`: tabela "Tentativa e erro → Checklist", "Logs locais → Observabilidade distribuída, SIEM…" repete `problem` em formato de linha do tempo.
- `architecture`: lista física/enlace/rede/transporte/superiores praticamente idêntica às etapas 3–7 de `internals`.
- `devsecopsExample` (pipeline baixando imagem) sobrepõe o `challenge` (pipeline publicando no registry); `securityExample` tem tabela de riscos que repete `security.vulnerabilities` e `badPractices` (sanitização, any-any, conclusão precipitada).
- Lab: frase-padrão repetida em 56 aulas ("Produza o artefato indicado na instrução do passo e registre a evidência objetiva…") nos passos 1 e 8; "Em cloud real, remova os recursos criados…" (48 aulas) num lab de custo zero que não cria recursos.
- Sobreposição de prática: `exercises[1]` (DNS ok, TCP/443 ok, HTTP 403 → hipóteses), `lab.challenge` (VPN, TCP/443 ok, 403) e `challenge` (registry, 403) pedem a mesma coisa; `flashcards[2]` (porta aberta ≠ app saudável) copia o quiz 5; `flashcards[5]` (any-any) copia o mentor 3; `exercises[2]` só pede para lembrar `curl -Iv`.
- Meta-texto: `nextTheme` "Veremos como…".
- 667 palavras em campos invisíveis (`deepDive`, `commonMistakes`, `protocolFields`, `packetFlow`, intros).

## 3. Conteúdo útil
PARCIAL. O que tem de realmente valioso: a árvore de decisão (`troubleshooting.decisionTree`), os comandos por plataforma com interpretação, o callout de motivação (ping/DNS/443 ok, mas erro de certificado), o caso empresarial com várias causas para o mesmo sintoma, o exemplo de cloud (LB saudável, security group bloqueando; host header), o lab e o desafio. Os campos invisíveis tinham conteúdo bom (quando usar bottom-up × top-down, "comando sem interpretação gera falsa confiança", "mudança ampla esconde a causa raiz", erros comuns, quando não seguir o roteiro). Lacunas: o learningOutcome "Dado um conjunto de outputs, o aluno identifica a camada provável da falha" não tinha nenhuma saída real de comando na parte visível; "interpretação" e "ação corretiva" (objetivo 2) não eram definidas em lugar visível (só sintoma/hipótese/evidência no glossário); o critério de escolha entre bottom-up e top-down só existia no `packetFlow` invisível. Erros técnicos: `show ip interface brief && show ip route && show arp` (o Cisco IOS não encadeia comandos com `&&`); `ping <gateway> && tracert <destino>` falha no Windows PowerShell 5.1 (o `&&` só existe no cmd e no PowerShell 7+), e o lab pede "terminal Windows PowerShell".

## 4. Aproveitamento
BOM (~89%) — de 139,9 min, cerca de 15 min não ensinam: ~4 min de leitura genérica/duplicada (history, evolution, architecture, tabela de riscos), ~0,5 min de ritual de lab, ~6 min do exercício que repete o desafio, ~3 min do exercício de decoreba de comando e ~1 min de flashcards duplicados. Contra a duração declarada (102,5 min) o percentual seria parecido, mas a aula não cabe na faixa declarada.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~4% (T 139,9 → 134,5 min). O tempo é dominado por lab (60), desafio (20) e exercícios; a leitura já é curta (18 min). Dá para cortar linguiça e um exercício duplicado, mas não 15% sem tirar prática que exercita os objetivos.

## 6. Explicação mais direta
SIM — (a) `concept`: definir as cinco peças (sintoma, hipótese, evidência, interpretação, ação corretiva) numa tabela com exemplo, em vez de deixá-las espalhadas no glossário e no `deepDive`; (b) `internals`: fundir a lista de etapas, a lista de `architecture` e os `protocolFields` numa única tabela camada → o que verificar → comandos → cuidado com a evidência, e dizer logo no início quando usar bottom-up ou top-down; (c) `simpleExample`: trocar a lista abstrata de passos por uma tabela com a saída real de cada comando e a interpretação; (d) `history` + `evolution` viram 2 frases em `problem`.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantidos o "a rede está lenta" e o callout do erro de certificado; cortada a lista de áreas (suporte, SOC…) e a descrição das etapas, que vai para `internals`. |
| history | FUNDIR:problem | Só "tentativa e erro" e "OSI como linguagem operacional, cada camada com sintomas/ferramentas/logs/responsáveis" explicam o método; viraram 2 frases em `problem`. |
| problem | ENXUGAR | Recebeu history/evolution; lista de 5 itens "Sem…" mantida e mais curta. |
| evolution | REMOVER | Tabela repetia `problem`; as ideias úteis (comandos isolados, logs só locais, identidade parece rede) foram para `problem`. |
| concept | MANTER | Definição mantida; acrescidos a tabela das 5 peças (deepDive.mentalModel/keyTerms + objetivo 2), causa provável × causa raiz (deepDive/packetFlow) e o callout de erros comuns (commonMistakes). |
| internals | MANTER | Núcleo; recebeu bottom-up × top-down com critério (packetFlow), "comando sem interpretação" e ação mínima com rollback (packetFlow), tabela por camada (architecture + protocolFields) e "quando não seguir o roteiro" (deepDive.whenNotToUse). |
| architecture | FUNDIR:internals | A lista por camada era duplicada; o fluxo corporativo virou 1 frase em `internals`. |
| analogy | ENXUGAR | Analogia boa, condensada num parágrafo; limite em 1 frase. |
| simpleExample | MANTER | Reescrito com saídas reais e interpretação por linha (cobre o learningOutcome de outputs). |
| enterpriseExample | MANTER | Concreto (ERP, filial, 7 causas para o mesmo sintoma); só ajuste de redação. |
| cloudExample | ENXUGAR | Mantidos o LB saudável × security group e as fontes de evidência; recebeu o essencial do devsecopsExample. |
| devsecopsExample | FUNDIR:cloudExample | A sequência do runner (proxy, CA no trust store, token × DNS privado) virou o 2º parágrafo de cloudExample; o resto repetia o desafio. |
| securityExample | ENXUGAR | Mantido o pico de tráfego com 6 hipóteses; tabela de riscos removida (já está em `security`); recebeu deepDive.securityImpact ("diferenciar falha, ataque e política funcionando") e a linha "logs sem contexto". |
| diagram | MANTER | Correto e legível; só o `<h2>` sem número. |
| labIntro | REMOVER | Invisível; repetia o objetivo do lab. |
| exercisesIntro | REMOVER | Invisível, meta-texto. |
| challengeIntro | REMOVER | Invisível; repetia o cenário do desafio. |
| solutionIntro | REMOVER | Invisível, meta-texto. |
| summary | MANTER | 5 bullets; 1º vira o modelo mental (deepDive.mentalModel); "Uso real" genérico trocado por "Direção" (bottom-up × top-down). |
| nextTheme | ENXUGAR | 1 frase coerente com 2.9 "OSI aplicado à cibersegurança", sem "Veremos". |
| networkContext | MANTER | Metadado. |
| protocolFields | MOVER:content.internals | Evidência e cuidado por camada viraram colunas da tabela de `internals`. |
| packetFlow | MOVER:content.internals | Critério de direção, "comando sem interpretação", "ação mínima com rollback", "relato incompleto"; mudança ampla × causa raiz em `concept`. |
| deepDive | MOVER:content.summary/concept/internals/securityExample | mentalModel → summary; keyTerms → tabela de `concept` + fc2.8.8; limitations → concept/security (já existiam em commonErrors); whenNotToUse → callout de internals; securityImpact → securityExample; operationalImpact (tickets, handoffs, pós-incidente) → internals passo 5; whenToUse e financialImpact REMOVIDOS (genéricos, já implícitos em motivation/problem). |
| commonMistakes | MOVER:content.concept | Callout "Erros comuns" com os 4 erros e a correção. |
| troubleshooting | MANTER | Árvore e comandos mantidos; corrigido o encadeamento com `&&` no Cisco IOS e no Windows; explicação de `-I`/`-v` do curl (vinda do exercício removido) no `purpose`. |
| security | MANTER | Sem redundância interna; recebeu o que era útil do securityExample via texto de securityExample. |
| lab | ENXUGAR | Passos, comandos, validação e evidências mantidos; removidos o aviso de cloud (custo zero, sem recursos) e as 2 `analysisTask` rituais; improvements de 4 → 2; `lab.challenge`/`solution` trocados de "403 via VPN" (repetia exercício e desafio) para erro de cadeia TLS. |
| quiz | MANTER | 6 questões; q2.8.1 (definição trivial) trocada por q2.8.7 (DNS × conectividade IP com saídas reais); distratores fracos de q2.8.2, q2.8.4 e q2.8.6 trocados por plausíveis; gabarito redistribuído (índices 1,1,0,2,0,0). |
| flashcards | MANTER | 6 cards; fc2.8.3 (copiava quiz 5) → fc2.8.7 (ping bloqueado ≠ host offline); fc2.8.6 (copiava mentor 3) → fc2.8.8 (causa provável × causa raiz); fc2.8.4 ampliado para 401 × 403; fc2.8.5 passa a dizer quando usar bottom-up/top-down. |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, sem sobreposição relevante. |
| exercises | ENXUGAR | 4 → 3: ex2.8.2 (repetia o desafio) trocado por ex2.8.5 (interpretar saídas com comparação de origens); ex2.8.3 (decorar `curl -Iv`) removido; ex2.8.1 vira classificação das 5 peças; ex2.8.4 vira sanitização de um trecho real de `curl -v`. |
| challenge | MANTER | Bom cenário e rubrica. |
| commentedSolution | MANTER | Coerente com o desafio. |
| glossary | MANTER | 6 termos, todos usados na aula. |
| references | MANTER | Internas, reais. |
| linksToOtherCourses | MANTER | Reais e pertinentes. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | "A rede está lenta" não é diagnóstico; lista de causas possíveis (cabo, VLAN, rota, DNS, porta, TLS, WAF, token, 500, expectativa do usuário) | MANTIDO | motivation |
| 2 | Caso: ping gateway/DNS/443 ok, mas erro de certificado → falha acima do transporte (TLS) | MANTIDO | motivation (callout), quiz q2.8.4 |
| 3 | Sintomas parecidos nascem em camadas diferentes; separar meio físico, broadcast, rota, porta, sessão, certificado, payload, autenticação, autorização | MANTIDO | problem |
| 4 | Tentativa e erro gera mudança sem evidência e falsa conclusão | MANTIDO | problem |
| 5 | OSI não é implementação literal, mas linguagem operacional; cada camada tem sintomas, ferramentas, logs, responsáveis e riscos | MANTIDO | problem |
| 6 | Identidade pode parecer rede e rede pode parecer aplicação (cloud/Zero Trust) | MANTIDO | problem |
| 7 | Comando isolado/resultado bom não prova que tudo funciona | MANTIDO | problem, summary, quiz q2.8.5 |
| 8 | Olhar só logs locais perde evidências de firewall/proxy/WAF/cloud/IAM; observabilidade centralizada | MANTIDO | problem; security.hardening/monitoring |
| 9 | Definição de diagnóstico por camadas (mapear, coletar, interpretar, avançar) | MANTIDO | concept (definition-box) |
| 10 | Sequência de perguntas: sinal, enlace, IP/rota, transporte, sessão, representação, autorização | MANTIDO | concept |
| 11 | Sintoma, hipótese, evidência, interpretação, ação corretiva | MANTIDO | concept (tabela), glossary, ex2.8.1, fc2.8.1/2 |
| 12 | Causa provável × causa raiz; mudança ampla esconde a causa raiz | MANTIDO | concept, fc2.8.8 |
| 13 | Problemas que atravessam várias camadas | MANTIDO | concept |
| 14 | Bottom-up × top-down e quando usar cada um; camada "errada" atrasa mas não invalida | MANTIDO | internals, summary, fc2.8.5, glossary |
| 15 | Definir sintoma (quem, de onde, destino, desde quando, mensagem) e escopo | MANTIDO | internals passos 1–2, lab passo 1 |
| 16 | O que verificar em cada camada (L1…L7, incl. velocidade negociada, trunk, TTL, retorno, firewall stateful, NAT, timeout, token, payload) | MANTIDO | internals (tabela) |
| 17 | Comando sem interpretação gera falsa confiança | MANTIDO | internals passo 3 |
| 18 | Ação corretiva mínima só com hipótese forte e rollback | MANTIDO | internals passo 4, concept, security |
| 19 | Registro: comando, horário, origem, destino, resultado, interpretação, hipótese descartada; melhora tickets e handoffs | MANTIDO | internals passo 5, lab passo 8 |
| 20 | Cuidado com evidência por camada (topologia, IPs internos, escopo de portas, headers/tokens) | MANTIDO | internals (coluna), security.vulnerabilities |
| 21 | Fluxo corporativo com muitos componentes; falha em qualquer etapa gera o mesmo sintoma | MANTIDO | internals |
| 22 | Quando não seguir o roteiro inteiro (cabo rompido confirmado; não justifica varredura; não atrasar mitigação emergencial) | MANTIDO | internals (callout) |
| 23 | Erros comuns: ping ok = rede ok; liberar firewall sem prova; DNS × IP; outputs sem sanitizar | MANTIDO | concept (callout), summary |
| 24 | Analogia do prédio e seu limite (assimetria, NAT, túneis, proxies, cache) | MANTIDO | analogy |
| 25 | Exemplo notebook: Wi-Fi, IP/gateway/DNS, ping gateway, DNS, TCP/443, curl; gateway ok + DNS falha ≠ física; 403 = aplicação/política | MANTIDO | simpleExample (agora com saídas) |
| 26 | ERP na filial: escopo primeiro; 7 causas distintas para o mesmo sintoma | MANTIDO | enterpriseExample |
| 27 | Cloud: VPC, SG/NSG, NAT GW, LB, private endpoint, DNS privado; LB saudável × SG bloqueando; host header; evidências IaC/flow logs/WAF/audit | MANTIDO | cloudExample |
| 28 | DevSecOps: runner, DNS do registry, TLS/CA corporativa no trust store, proxy por variável de ambiente, token × DNS privado | MANTIDO | cloudExample (2º parágrafo) |
| 29 | Pico de tráfego: backup, exfiltração, DDoS, loop, varredura, retry | MANTIDO | securityExample |
| 30 | Diferenciar falha, ataque e política funcionando; correlacionar rede/aplicação/IAM/endpoint | MANTIDO | securityExample |
| 31 | Riscos: coleta excessiva, conclusão precipitada, any-any, logs sem contexto | MANTIDO | security (vulnerabilities, bad/goodPractices), securityExample |
| 32 | Comandos: ipconfig /all, ping, tracert, Test-NetConnection -Port, ip addr/route/neigh, curl -Iv (-I/-v), show ip interface brief/route/arp, nslookup/dig, nc -vz, tracepath | MANTIDO | troubleshooting.commands, internals, lab |
| 33 | Árvore de decisão (6 ramos) | MANTIDO | troubleshooting.decisionTree |
| 34 | ICMP bloqueado não prova host offline; porta aberta não prova app; 403 não é indisponibilidade; NAT não é controle suficiente | MANTIDO | security.commonErrors, fc2.8.7, lab.troubleshooting |
| 35 | 401 = autenticação; 403 = autorização/política/WAF | MANTIDO | fc2.8.4, mentor 2, decisionTree |
| 36 | Sanitizar tokens, cookies, IPs e nomes internos | MANTIDO | security, ex2.8.4, quiz q2.8.3, lab |
| 37 | Erro de certificado: CA não confiável, expirado, interceptação TLS, SNI | MANTIDO | lab.troubleshooting, lab.challenge/solution, decisionTree |
| 38 | Caso "VPN + TCP/443 ok + 403" (lab.challenge original) | REMOVIDO | duplicado no `challenge` (registry 403), no simpleExample e no exemplo do `concept` (WAF × origem via VPN) |
| 39 | deepDive.whenToUse e financialImpact (compra de banda, MTTR, custos de NAT/logs) | REMOVIDO | genéricos; a ideia de reduzir retrabalho e mudanças indevidas já está em problem/internals |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Aplicar o Modelo OSI como método prático de troubleshooting | concept, internals (etapas + tabela), simpleExample, lab, challenge |
| Diferenciar sintoma, hipótese, evidência, interpretação e ação corretiva | concept (tabela das 5 peças), ex2.8.1, fc2.8.1/2/8, glossary |
| Escolher comandos adequados para cada camada sem testes invasivos | internals (coluna de comandos + escopo), troubleshooting.commands, quiz q2.8.6, lab passos 2–7 |
| Separar falhas de física, enlace, rede, transporte, TLS, sessão, aplicação, autenticação e autorização | internals, decisionTree, simpleExample, quiz q2.8.2/4/7, ex2.8.5, fc2.8.4, mentor 2 |
| Registrar evidências de forma útil, segura e sanitizada | internals passo 5 e coluna "Cuidado", security, ex2.8.4, quiz q2.8.3, lab (validação) |
| Evitar mudanças sem causa provável comprovada | concept (causa provável × raiz, erros comuns), internals passo 4, mentor 3, challenge, commentedSolution |

## 10. O que mudou na nova versão
- Removidos `history`, `evolution`, `architecture` (fundidos em `problem` e `internals`) e as 4 intros invisíveis; `devsecopsExample` fundido em `cloudExample`; tabela de riscos do `securityExample` removida (já está em `security`).
- Conteúdo movido de campos invisíveis (aumenta as palavras visíveis, como esperado): `commonMistakes` → callout em `concept`; `protocolFields` → coluna "Cuidado com a evidência" em `internals`; `packetFlow` → critério bottom-up/top-down, "comando sem interpretação", ação mínima com rollback; `deepDive` → modelo mental no `summary`, causa provável × raiz, "quando não seguir o roteiro", "falha × ataque × política funcionando". Campos removidos depois.
- **Acréscimos novos (não movidos), com justificativa:**
  - Tabela de saídas reais no `simpleExample` (`ipconfig`, `ping`, `nslookup`, `TcpTestSucceeded : True`, `HTTP/1.1 403 Forbidden`) e a menção a `Non-existent domain`: substitui a lista abstrata de passos e cobre o learningOutcome "Dado um conjunto de outputs, o aluno identifica a camada provável da falha", que não tinha nenhuma saída visível.
  - Linhas "Interpretação" e "Ação corretiva" na tabela das 5 peças do `concept`: o objetivo 2 cita as duas, mas a aula só definia sintoma, hipótese e evidência.
  - Coluna "Comandos típicos" na tabela de `internals`: liga cada camada aos comandos que a aula já usa (objetivo 3), sem comando novo.
  - Itens trocados (sem aumentar quantidade): quiz q2.8.7, flashcards fc2.8.7/fc2.8.8, exercício ex2.8.5, `lab.challenge`/`solution` sobre cadeia TLS (a solução cita `curl -k` como anti-padrão, alinhada ao "não pular etapas").
- Exercícios de 4 → 3 (−6 min): removidos o que repetia o desafio e o de decorar `curl -Iv` (a explicação de `-I`/`-v` foi para `troubleshooting.commands`).
- Correções técnicas: comando Cisco IOS sem `&&` (um comando por vez); comando Windows sem `&&` (falha no PowerShell 5.1).
- Lab: removidos o aviso de cloud (lab de custo zero sem recursos) e as `analysisTask` rituais; improvements 4 → 2.
- `<h2>` sem número; `subtitle` enxugado; `duration` = 115-160 min e `estimatedStudyTimeMinutes` = 160.
- AVISO do `validar` ("ids de quiz originais ausentes: q2.8.1"): esperado, a questão trivial q2.8.1 foi substituída pela q2.8.7 (id inédito, sem reaproveitamento).

## 11. Depois
Palavras visíveis: 4157 → 4579 (+10%; cortes brutos 584 palavras = 14%, acréscimos ~1000, dos quais ~600 vindos de campos invisíveis) · Invisíveis: 667 → 49 (só `networkContext`) · Teoria: 17,9 → 18,5 min · T: 139,9 → 134,5 min · Duração: 85-120 min → 115-160 min · Quiz corrigido: sim (6 questões, formato padrão, 1 trocada, 3 com distratores novos, gabarito redistribuído)

## 12. Revisão humana
- A duração sobe de 85-120 para 115-160 min pela fórmula fixa (a original estava SUBESTIMADA); o tempo é dominado pelo lab de 60 min, pelo desafio e pelos exercícios.
- `lab.labType` = "cloud", mas o lab roda num terminal local, sem recursos de cloud e com custo zero. Mantido por ser metadado; avaliar se o valor correto é outro.
- Correções de comando registradas: `show ip interface brief && show ip route && show arp` (IOS não aceita `&&`) e `ping <gateway> && tracert <destino>` (Windows PowerShell 5.1 não aceita `&&`). Confirmar a forma de exibição escolhida (comando principal + os demais citados em "Finalidade").
- `lab.challenge`/`lab.solution` trocados de "403 via VPN" (que repetia o exercício e o desafio) para "erro `unable to get local issuer certificate`". Confirmar se a troca é desejada.
- As saídas de exemplo no `simpleExample` estão em inglês (`Reply from…`, `IPv4 Address`); num Windows em pt-BR elas aparecem traduzidas ("Resposta de…", "Endereço IPv4").

```json
{
  "id": "2.8", "modulo": "m02", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Diagnóstico por camadas: método prático de troubleshooting",
  "duracao_declarada": "85-120 min", "T_original_min": 139.9, "T_nova_min": 134.5,
  "duracao_nova": "115-160 min", "duracao_nova_estimated_max": 160, "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 17, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 4, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4157, "palavras_visiveis_depois": 4579,
  "palavras_invisiveis_antes": 667, "palavras_invisiveis_depois": 49,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "MANTER", "internals": "MANTER", "architecture": "FUNDIR:internals", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR",
    "devsecopsExample": "FUNDIR:cloudExample", "securityExample": "ENXUGAR", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "MANTER", "nextTheme": "ENXUGAR", "networkContext": "MANTER",
    "protocolFields": "MOVER:content.internals", "packetFlow": "MOVER:content.internals",
    "deepDive": "MOVER:content.summary/concept/internals/securityExample", "commonMistakes": "MOVER:content.concept",
    "troubleshooting": "MANTER", "security": "MANTER", "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Duração sobe de 85-120 para 115-160 min pela fórmula (original SUBESTIMADA).",
    "lab.labType = 'cloud' num lab local de custo zero; mantido, avaliar o valor correto.",
    "Corrigido o encadeamento com && em comandos Cisco IOS e Windows PowerShell 5.1; confirmar a forma de exibição.",
    "lab.challenge/solution trocados de '403 via VPN' (duplicado) para erro de cadeia TLS; confirmar.",
    "Saídas de exemplo em inglês; no Windows pt-BR aparecem traduzidas."
  ]
}
```
