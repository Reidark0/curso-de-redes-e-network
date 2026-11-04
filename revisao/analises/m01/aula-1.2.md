# Aula 1.2 — Dispositivos finais, intermediários e serviços
Tipo: fundamental · Duração declarada: 75-105 min · Palavras visíveis / invisíveis (antes): 4018 / 564

## 1. Duração
T pela fórmula = 83,2 min (teoria 21,2, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0)
Veredito: **ORGANIZADA** — M = 90 min = 1,08×T, dentro de [0,8×T; 1,2×T]. Teoria é 29% do tempo e a prática (exercícios de classificação, desafio do escritório, mentor) exercita exatamente o objetivo; para uma aula conceitual sem lab, a divisão faz sentido. Faixa recomendada pela fórmula: 70-100 min.

## 2. Encheção de linguiça
Nível: **BAIXA (~13%)**. Evidências (seção + trecho curto):
- `history`: enumerações longas ("Firewalls, proxies, balanceadores, concentradores VPN, sistemas de diretório, servidores web, bancos de dados, appliances…") que não explicam o mecanismo; a única ideia útil ("a aparência mudou, mas a pergunta continua a mesma") cabe em 2–3 frases.
- `problem`: a lista "Dispositivo final / intermediário / serviço" repete a definição do `concept` e a tabela de `architecture` (três vezes a mesma definição).
- `evolution`: parágrafo de abertura genérico ("A forma de classificar elementos evoluiu conforme as redes ficaram mais complexas").
- `architecture`: meta-texto ("O aluno deve aprender a desenhar o fluxo…") e roteiro do curso em cinco frases ("Ao estudar Ethernet… Ao estudar IP… Ao estudar TCP/UDP…").
- `analogy`: limite da analogia em três frases que repetem o `concept` ("Um servidor pode ser destino… Um firewall pode ser intermediário…").
- `securityExample` × `security`: a tabela de riscos por papel e as `vulnerabilities` cobrem os mesmos riscos (gerência exposta, serviço exposto); frase de efeito "Você não protege bem o que não sabe classificar".
- `security.badPractices` "Expor serviços internos sem autenticação forte" duplica a vulnerabilidade "Serviço exposto"; `goodPractices` "Monitorar serviços críticos…" duplica `monitoring`.
- `flashcards` fc1.2.5 × `mentorQuestions` 3: a mesma pergunta ("Um firewall é sempre intermediário?").
- Quiz com distratores absurdos ("Teclado", "Monitor", "Um arquivo PDF", "Codificação de texto"): não é linguiça em palavras, mas a questão não mede nada.
- Frase repetida do `frases_repetidas.js` ("Esta aula não possui laboratório independente…") está em `labIntro`, invisível (D08).
- Conteúdo útil guardado em campos invisíveis: `commonMistakes` (178 palavras) e `deepDive` (227).

## 3. Conteúdo útil
**FORTE.** O que tem de realmente valioso: definição clara dos três papéis + política; a ideia de classificar pelo papel no fluxo (um equipamento acumula papéis); o fluxo em 7 passos com a armadilha "host vivo ≠ serviço saudável"; a tabela "o que observar" por papel; exemplos doméstico, empresarial, cloud e DevSecOps específicos; troubleshooting com comandos corretos e interpretação (`Test-NetConnection -Port 443`, `ss -tulpen`, `curl -I`, `show cdp neighbors`) e árvore de decisão; exercícios e desafio que exercitam a classificação.
Lacunas: o fluxo não tinha nenhum valor concreto (nome, IP, porta); os erros comuns (servidor × serviço, "tudo é roteador", IoT esquecido, intermediário que altera tráfego) e as limitações da classificação ("não prova causa, organiza hipóteses") estavam só em campos invisíveis; o objetivo 2 (papéis acumulados) não era cobrado no quiz.
Erros técnicos: nenhum relevante. Ambiguidade corrigida: fc1.2.5 dizia que o firewall "pode ser destino de… logs" (ele é origem dos logs que envia).

## 4. Aproveitamento
**BOM** — ~91% do T original (≈76 de 83 min) ensina ou pratica os objetivos; o desperdício está em ~5 min de teoria redundante (history, repetição da definição, securityExample) e em questões de quiz com distratores triviais. Contra a duração declarada (M = 90) a proporção é praticamente a mesma.

## 5. Pode ser mais curta?
**NÃO** — redução prevista: ~7%. A teoria é só 21 min; 44 min vêm de 4 exercícios e do desafio (peso fixo da fórmula), que são o núcleo prático. Na prática, mover `commonMistakes`/`deepDive` para o visível e trocar distratores absurdos por plausíveis compensou os cortes (T 83,2 → 84,0).

## 6. Explicação mais direta
**SIM** — (a) `problem` repetia a definição: virou só a lista de consequências de não separar papéis, e a definição fica uma vez no `concept` (definição antes da justificativa) e na tabela de `architecture`; (b) `history` + parágrafo de `evolution` viraram um parágrafo antes da tabela; (c) `internals` ganhou um exemplo concreto cedo (notebook 10.10.1.25 → `intranet.empresa.local` → 10.20.0.15:443) e perdeu o parágrafo que listava os mesmos passos em prosa; (d) `cloudExample` em lista papel → recurso; (e) `simpleExample` com os testes em lista numerada; (f) limite da analogia em 1 frase.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantido o chamado real e as perguntas; cortada a ponte com a aula anterior e a frase "sem essa bússola…". |
| history | FUNDIR:evolution | Só a ideia "papéis viraram serviços gerenciados; a pergunta é a mesma" explica algo; virou 3 frases em `evolution`. |
| problem | ENXUGAR | Lista de definições duplicava `concept`/`architecture`; ficaram as 4 consequências concretas, em lista. |
| evolution | ENXUGAR | Absorveu `history`; tabela por ambiente (visão simples × profissional) mantida; parágrafo genérico cortado. |
| concept | MANTER (+ MOVER) | Definição primeiro, agora com política; papéis acumulados; recebeu `deepDive.limitations`/`operationalImpact` e o callout "Erros comuns" (`commonMistakes`). |
| internals | ENXUGAR | Exemplo concreto com nome, IPs e porta 443 nos 7 passos; parágrafo em prosa que repetia os passos removido; armadilha host × serviço mantida. |
| architecture | ENXUGAR | Tabela mantida (+RDP, câmera, gateway, AD e registry vindos de `problem`); meta-texto e roteiro do curso reduzidos a 1 frase. |
| analogy | ENXUGAR | Analogia boa; limite em 1 frase. |
| simpleExample | MANTER | Concreto; testes em lista numerada. |
| enterpriseExample | MANTER | Específico (riscos por elemento, LB mascarando origem). |
| cloudExample | ENXUGAR | Lista papel → recurso; custo recorrente dos intermediários gerenciados (de `deepDive.financialImpact`). |
| devsecopsExample | MANTER | Específico (causas de timeout por papel); ajuste de redação. |
| securityExample | FUNDIR:security | Tabela risco/como aparece/mitigação por papel fundida nas `security.vulnerabilities` (5 itens, um por papel). |
| diagram | MANTER | Legível; ids `m01l02-*`, `<title>` e `<desc>` preservados; só o `<h2>` sem número. |
| labIntro | REMOVER | Invisível; bloco padrão "Prática equivalente" (D08). |
| exercisesIntro | REMOVER | Invisível; moldura. |
| challengeIntro | REMOVER | Invisível; moldura. |
| solutionIntro | REMOVER | Invisível; moldura. |
| summary | MANTER (+ MOVER) | 5 bullets; `deepDive.mentalModel` virou a primeira linha; acrescentado bullet de papéis acumulados. |
| nextTheme | ENXUGAR | 1 frase, coerente com a 1.3 (tipos de rede). |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:concept/summary/cloudExample/security | mentalModel → summary; limitations e operationalImpact (donos) → concept; financialImpact → cloudExample; securityImpact → security.vulnerabilities; whenNotToUse ("intermediário seguro só por estar no meio") → security.commonErrors; whenToUse coberto por architecture/troubleshooting. Campo removido. |
| commonMistakes | MOVER:concept | Callout "Erros comuns" com os 4 erros (whyItHappens/consequence/correction condensados). Campo removido. |
| troubleshooting | MANTER | Comandos corretos com purpose/expected/interpretation preenchidos; árvore de decisão boa. |
| security | ENXUGAR (+ FUNDIR) | Recebeu `securityExample`; vulnerabilidades por papel (final, comprometido, serviço, intermediário, política); 2 itens duplicados removidos. |
| lab | — | Não existe; `progressRules` usa exerciseDone/practicalExerciseDone. |
| quiz | ENXUGAR (ajustar) | 6 questões normalizadas; distratores trocados por plausíveis (outros papéis); q1.2.4 reformulada; nova q1.2.7 (papéis acumulados). |
| flashcards | MANTER (ajustar) | fc1.2.5 (repetia o mentor 3) substituído por fc1.2.7 (intermediário altera tráfego). |
| mentorQuestions | MANTER | 3 perguntas de raciocínio; explicação do firewall completada (destino de gerência/VPN, origem de logs). |
| exercises | MANTER | 4, com expectedAnswer, alinhados aos objetivos. |
| challenge | MANTER | Rubrica 100 pontos, entregáveis claros. |
| commentedSolution | MANTER | Raciocínio, passos, erros comuns e resposta final coerentes. |
| glossary | MANTER | 5 termos, todos usados na aula. |
| references | MANTER | Internas, reais. |
| linksToOtherCourses | MANTER | Pertinentes. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Dispositivo final = origem/destino; exemplos (notebook, celular, servidor, impressora, câmera, VM, container, workload) | MANTIDO | concept (definição), architecture (tabela), glossary, fc1.2.1 |
| 2 | Intermediário encaminha, comuta, filtra, traduz, concentra, inspeciona; exemplos (switch, roteador, firewall, AP, proxy, NAT, LB, gateway) | MANTIDO | concept, architecture, glossary, fc1.2.2 |
| 3 | Serviço = função exposta; exemplos DNS, DHCP, HTTP, SSH, SMB, RDP, AD, API, banco, registry | MANTIDO | concept, architecture (RDP/AD/registry trazidos de problem), glossary |
| 4 | Política como papel (ACL, regra de firewall, SG, RBAC, proxy) | MANTIDO | concept (definição), architecture, glossary, diagrama |
| 5 | Classificar pelo papel no fluxo, não pelo nome; servidor destino + serviços + proxy; firewall intermediário + gerência/VPN; AP + gerência/logs/autenticação | MANTIDO | concept, analogy (limite), summary, q1.2.7, mentor 3 |
| 6 | Consequências de não separar papéis (reiniciar servidor/DNS, trocar cabo/autorização, culpar firewall/serviço parado, regra ampla) | MANTIDO | problem |
| 7 | Fluxo em 7 passos (cliente, DNS, sinais, intermediários, políticas, serviço na porta, evidências) | MANTIDO | internals, agora com valores concretos |
| 8 | Host vivo ≠ serviço: processo parado, porta fechada, rota errada, DNS para outro IP, política | MANTIDO | internals, mentor 2, security.commonErrors |
| 9 | Switch comuta quadros na LAN; roteador entre redes; firewall política; LB distribui | MANTIDO | internals passo 4–5, enterpriseExample |
| 10 | O que observar por papel (IP/MAC/portas locais; tabelas/rotas/VLANs/regras; nome/porta/processo/autenticação; origem/destino/identidade/exceções) | MANTIDO | architecture |
| 11 | Ligação com o curso (Ethernet→switch, IP→roteador, TCP/UDP→portas, firewall→política, cloud) | MANTIDO | architecture (1 frase) |
| 12 | Tabela por ambiente: limitação da visão simples × visão profissional | MANTIDO | evolution |
| 13 | História: terminais/mainframes → LAN (switches, servidores de arquivos/impressão, DNS, DHCP) → datacenter (firewall, proxy, LB, VPN) → cloud gerenciada | MANTIDO | evolution (parágrafo). Detalhes de enumeração (hubs, placas, controladoras Wi-Fi, appliances, service endpoint, identities, "fluxo atravessa Kubernetes…") REMOVIDOS: enumeração sem mecanismo, coberta pelos exemplos |
| 14 | Analogia da empresa física | MANTIDO | analogy |
| 15 | Roteador doméstico acumula AP, switch, roteador, NAT, DHCP; testes Wi-Fi/IP/gateway/nomes/outros sites | MANTIDO | simpleExample, concept (erros comuns), q1.2.7 |
| 16 | Exemplo empresarial (switch de acesso, L3 entre VLANs, firewall, DNS interno, LB, banco, diretório) e riscos por elemento | MANTIDO | enterpriseExample |
| 17 | Cloud: workload, LB, NAT GW, route table, SG/NSG, DNS privado, banco gerenciado; "gerenciado não é sem rede"; custo recorrente | MANTIDO | cloudExample, ex1.2.4, q1.2.6 |
| 18 | DevSecOps: runner workload, proxy, registry/API server serviços, network policy; causas de timeout | MANTIDO | devsecopsExample |
| 19 | Risco por papel (final comprometido → EDR/MFA; intermediário any-any/firmware; serviço banners/falhas de login; política permissiva) | MANTIDO | security.vulnerabilities (fundido de securityExample) |
| 20 | Intermediários concentram confiança; comprometê-los → interceptação, alteração, DoS | MANTIDO | security.vulnerabilities[3], q1.2.5 |
| 21 | Ativo desconhecido (NAC, logs DHCP, varreduras autorizadas) | MANTIDO | security.vulnerabilities[0], fc1.2.6 |
| 22 | Boas/más práticas: segmentação (usuários, servidores, visitantes, gerência, IoT), regras com justificativa/dono/prazo, gerência protegida | MANTIDO | security.goodPractices/badPractices. "Expor serviços sem autenticação forte" e "Monitorar serviços críticos" REMOVIDOS: duplicados em vulnerabilities[2] e monitoring |
| 23 | Monitoramento, hardening, ideias de detecção | MANTIDO | security.monitoring/hardening/detectionIdeas |
| 24 | Erros: conectividade ≠ autorização; host ativo ≠ serviço saudável; intermediários transparentes; coletar evidências antes | MANTIDO | security.commonErrors |
| 25 | Comandos: ipconfig /all, Get-NetTCPConnection, Test-NetConnection -Port 443, ip addr/ip route, ss -tulpen, curl -I, show ip interface brief, show cdp neighbors | MANTIDO | troubleshooting.commands |
| 26 | Árvore de decisão (sem IP / sem nome / porta falha / um segmento) | MANTIDO | troubleshooting.decisionTree |
| 27 | Sintomas e perguntas de diagnóstico | MANTIDO | troubleshooting |
| 28 | Erro: servidor × serviço ("o servidor caiu") | MANTIDO | concept (callout, de commonMistakes), q1.2.3, fc1.2.3 |
| 29 | Erro: chamar tudo de roteador | MANTIDO | concept (callout), q1.2.7 |
| 30 | Erro: IoT/impressoras fora do inventário | MANTIDO | concept (callout), mentor 1, ex1.2.3 |
| 31 | Erro: intermediário só transporta (NAT, proxy, WAF, inspeção TLS, LB alteram) | MANTIDO | concept (callout), fc1.2.7 |
| 32 | Modelo mental: origem, intermediário, serviço, política, evidência | MANTIDO | summary (1º bullet), diagrama |
| 33 | Limitações: não substitui análise por camada; não prova causa, organiza hipóteses | MANTIDO | concept |
| 34 | Classificação define donos (endpoint, rede, segurança, sistemas, aplicação) | MANTIDO | concept |
| 35 | Impacto financeiro de intermediários gerenciados | MANTIDO | cloudExample. "Dependência do provedor" e "inventário ruim aumenta custo" REMOVIDOS: genéricos, fora do objetivo |
| 36 | "Não assuma que intermediário é seguro por estar no meio" | MANTIDO | security.commonErrors |
| 37 | Impressora armazena documentos, aceita jobs, interface web, credenciais | MANTIDO | mentor 1, commentedSolution |
| 38 | Firewall como destino de gerência/VPN | MANTIDO | concept, summary, mentor 3 (fc1.2.5 REMOVIDO: duplicado no mentor 3) |
| 39 | Inventário de ativos (dispositivos, serviços, donos, criticidade, riscos) | MANTIDO | glossary, security.goodPractices |
| 40 | Diagrama do fluxo com papéis e evidências | MANTIDO | diagram |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar dispositivo final, intermediário e serviço | concept (definição), architecture (tabela), glossary, q1.2.1, q1.2.2, fc1.2.1–2, ex1.2.1 |
| Um mesmo equipamento pode exercer mais de um papel | concept, analogy, simpleExample, summary, q1.2.7, mentor 3, challenge (tarefa 2 e rubrica) |
| Mapear um fluxo simples (origem, intermediários, destino, serviço) | internals (exemplo com valores), diagram, enterpriseExample, ex1.2.2, challenge |
| Relacionar papéis com inventário, troubleshooting, segurança e cloud | architecture ("o que observar"), troubleshooting, security, cloudExample, devsecopsExample, q1.2.4–6, ex1.2.3–4 |
| Evitar confusões (servidor × serviço) | concept (callout "Erros comuns"), internals, q1.2.3, fc1.2.3, mentor 2, commentedSolution |

## 10. O que mudou na nova versão
- `history` fundido em `evolution`; `securityExample` fundido em `security`; `labIntro`, `exercisesIntro`, `challengeIntro`, `solutionIntro` removidos.
- `commonMistakes` virou o callout "Erros comuns" no `concept`; `deepDive` distribuído (summary, concept, cloudExample, security) e removido.
- `concept` abre com a definição (agora incluindo política) e explica as limitações da classificação.
- `internals` com exemplo concreto (10.10.1.25 → `intranet.empresa.local` → 10.20.0.15, porta 443).
- `problem` reduzido às consequências; `architecture` com exemplos completos e sem meta-texto; analogia com limite em 1 frase; `nextTheme` em 1 frase.
- `security.vulnerabilities` com 5 riscos, um por papel, todos com os 4 campos preenchidos.
- Quiz: distratores plausíveis em todas as 6 questões, q1.2.4 reformulada ("qual hipótese"), nova q1.2.7 (papéis acumulados). Flashcard fc1.2.5 → fc1.2.7. Explicação do mentor 3 corrigida (logs: o firewall é origem).
- `<h2>` sem número em todas as seções; `duration` 70-100 min e `estimatedStudyTimeMinutes` 100.

## 11. Depois
Palavras visíveis: 4018 → 4188 (+4%; cortes brutos 469 = 12%, acréscimos 639, dos quais ~405 vêm de `commonMistakes`/`deepDive` movidos e ~200 dos distratores novos e da q1.2.7) · Invisíveis: 564 → 48 (só `networkContext`) · Duração: 75-105 min → 70-100 min (T 83,2 → 84,0) · Quiz corrigido: sim (7 questões; `a`→`answer`, distratores refeitos, 1 nova)

`validar`: ok, sem erros e sem avisos. `comparar --sumiram`: as frases ausentes estão reescritas em outro lugar ou são as enumerações/duplicações marcadas como REMOVIDO no inventário.

## 12. Revisão humana
- Diagrama mantido sem mudança, mas com semântica discutível: a seta de "resposta" vai de "Serviço (DNS / HTTP / API)" para "Servidor / VM", e o DNS aparece no fim do caminho, depois do roteador/LB (no fluxo real ele é consultado antes). Não está errado a ponto de exigir correção; vale avaliar se o desenho deve mostrar o serviço *dentro* do servidor e o DNS como consulta lateral.
- O módulo m01 lista `lab-1.2` em `requiredLabs`, mas a aula não tem lab (o `progressRules` usa exerciseDone/practicalExerciseDone). Já previsto em D09 para o fim do módulo.
- Valores do exemplo em `internals` (10.10.1.25, 10.20.0.15, `intranet.empresa.local`) são ilustrativos, acrescentados para dar exemplo concreto ao objetivo 3.
- `cloudExample`: "intermediários gerenciados costumam ter cobrança recorrente, inclusive pelo tráfego que passa por eles" generaliza `deepDive.financialImpact` e a menção original a "custo de tráfego"; vale para NAT gateway e load balancer nos grandes provedores, mas o modelo de cobrança varia.

```json
{
  "id": "1.2", "modulo": "m01", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Dispositivos finais, intermediários e serviços",
  "duracao_declarada": "75-105 min", "T_original_min": 83.2, "duracao_nova": "70-100 min", "T_nova_min": 84.0, "duracao_nova_estimated_max": 100,
  "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "BAIXA", "linguica_pct": 13, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 7, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4018, "palavras_visiveis_depois": 4188,
  "palavras_invisiveis_antes": 564, "palavras_invisiveis_depois": 48,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:evolution", "problem": "ENXUGAR", "evolution": "ENXUGAR",
    "concept": "MANTER", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "MANTER",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:concept/summary/cloudExample/security", "commonMistakes": "MOVER:concept",
    "troubleshooting": "MANTER", "security": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Diagrama: seta de resposta Serviço -> Servidor/VM e DNS no fim do caminho; semântica discutível, mantido sem mudança",
    "requiredLabs do m01 inclui lab-1.2, mas a aula não tem lab (D09, fim de módulo)",
    "Valores ilustrativos acrescentados em internals (10.10.1.25, 10.20.0.15, intranet.empresa.local)",
    "cloudExample generaliza cobrança por tráfego de intermediários gerenciados; modelo varia por provedor"
  ]
}
```
