# Aula 1.7 — Equipamentos de rede: NIC, hub, switch, roteador, AP e firewall
Tipo: fundamental · Duração declarada: 80-115 min · Palavras visíveis / invisíveis (antes): 4072 / 772

## 1. Duração
T pela fórmula = 82,9 min (teoria 20,9, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0 — a aula não tem lab)
Veredito: ORGANIZADA — M = 97,5 min ≈ 1,18×T (no limite superior da faixa). Teoria = 29% de T e prática (exercícios, desafio, quiz, mentor) = 71%, divisão adequada para uma aula fundamental sem lab. Faixa recomendada original: 70-100 min.

## 2. Encheção de linguiça
Nível: BAIXA (~11%). Evidências:
- `history` repete `evolution` e `internals` ("Os switches surgiram para encaminhar quadros… aprendendo endereços MAC", "Roteadores permitiram interligar redes diferentes usando endereços IP") e `cloudExample` ("NIC virtual em VM, … route table em cloud, security group…"). Só o domínio de colisão do hub e a evolução do firewall (filtro simples → estado → aplicação/identidade) eram exclusivos.
- `securityExample` sobrepõe `security`: a tabela de riscos (porta exposta, firewall any-any, AP, roteamento) repete `security.vulnerabilities` e `goodPractices`.
- Meta-texto: "Essa definição evita decorar nomes… O mesmo vale para roteador, firewall e AP" (concept); "A evolução dos equipamentos acompanha a evolução dos problemas. À medida que as redes cresceram…" (evolution); "Antes de estudar protocolos em profundidade…" (motivation); "O problema que esses equipamentos resolvem é a especialização… Tentar fazer tudo com um único conceito cria confusão" (problem).
- Limite da analogia longo (2 frases para dizer que é só um lembrete).
- Coluna "Como decide" da tabela de `evolution` repete a lista de `internals`.
- Frase-padrão do `labIntro` ("Esta aula não possui laboratório independente…", 39 aulas) — invisível.
- Invisíveis com valor: `commonMistakes` (4 erros específicos do tema) e `deepDive` (limitações, quando não usar, impacto financeiro/operacional, decisionTable).
- Quiz com distratores absurdos ("Trocar o papel de parede do desktop", "A tabela Unicode", "Usar Base64 no SSID", "Fonte do terminal") e gabarito sempre na opção 0: não é linguiça em palavras, mas a questão não mede nada.

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: a lista de decisões por equipamento (o que cada um lê e decide), a separação "switch comuta por MAC / roteador encaminha por IP / firewall aplica política", o exemplo doméstico (caixa única com AP+switch+roteador+NAT+DHCP+firewall), as evidências por equipamento no exemplo empresarial, a árvore de decisão e os comandos de troubleshooting (Windows, Linux, Cisco IOS), as vulnerabilidades com mitigação e um desafio de pequena empresa bem amarrado ao objetivo. Lacunas: o mecanismo do switch para destino desconhecido/broadcast (inundação na VLAN) não aparecia; faltava a distinção domínio de colisão × domínio de broadcast, que é o que separa hub, switch e roteador; não havia nenhuma entrada concreta de tabela MAC ou de rotas (o objetivo 2 fala em "tabela interna"). Erros técnicos: nenhum. Problema de prática: quiz trivial (ver acima).

## 4. Aproveitamento
BOM — contra o T original (82,9 min), cerca de 95% do tempo vai para algo que ensina ou pratica os objetivos: a linguiça visível é ~2,5 min de leitura e o restante é prática (exercícios, desafio, mentor) diretamente ligada aos objetivos. O quiz consumia 6 min com pouco valor por causa dos distratores. Contra a duração declarada (M = 97,5), o número cai para ~80%, porque a declaração já estava perto do limite de INFLADA.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~0%. A teoria é só 25% de T; os cortes (~400 palavras) são compensados pelo que sai de campos invisíveis (erros comuns, limites, custos) e pelo mecanismo que faltava. A prática (exercícios, desafio, mentor) já é enxuta e exercita os objetivos.

## 6. Explicação mais direta
SIM — (a) `concept`: a definição vira as "sete perguntas" do mentalModel, e o parágrafo de justificativa vira uma frase; (b) `history` + `evolution`: um parágrafo de contexto antes da tabela, sem a coluna "Como decide" que repetia `internals`; (c) `internals`: exemplo concreto cedo, com uma tabela de entradas de tabela MAC e de rotas com valores, e os domínios de colisão/broadcast numa frase; (d) `securityExample`: a tabela de riscos sai do accordion de exemplos e vira vulnerabilidades estruturadas em `security`, sem repetição.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantém o chamado "a internet caiu", as confusões típicas e o callout do SOC; corta meta-texto. |
| history | FUNDIR:evolution | Repetia evolution/internals/cloud; o domínio de colisão do hub e a evolução do firewall foram para o parágrafo de evolution; os papéis virtuais (vSwitch, ingress controller, service mesh) foram para cloudExample. |
| problem | ENXUGAR | A lista "Sem X" fica; corta a frase sobre "especialização" e "único conceito". |
| evolution | ENXUGAR | Parágrafo com o essencial da história + tabela sem a coluna "Como decide" (duplicada em internals); tabela embrulhada em responsive-table. |
| concept | ENXUGAR | Definição = mentalModel (7 perguntas); parágrafo de justificativa reduzido a duas frases. |
| internals | MANTER | Núcleo. Acrescentados: inundação do switch para destino desconhecido/broadcast, domínios de colisão × broadcast, tabela com entradas de exemplo (MAC e rotas), switch L3 que roteia, callout "Erros comuns" (de commonMistakes). |
| architecture | ENXUGAR | Mantém camadas; o último parágrafo recebe impacto operacional/financeiro útil do deepDive (gerenciáveis geram logs, licenças, custo oculto, documentação/backup). |
| analogy | ENXUGAR | Analogia boa; limite em 1 frase. |
| simpleExample | MANTER | Concreto e ligado ao diagnóstico. |
| enterpriseExample | MANTER | Evidências por equipamento (porta/MAC/VLAN, permitido/bloqueado, rota, RSSI/SSID). |
| cloudExample | MANTER | Objetivo 4; recebe vSwitch, ingress controller, service mesh (de history), o limite do security group e o custo recorrente (de deepDive). |
| devsecopsExample | ENXUGAR | Objetivo 4 cita DevSecOps; corta a frase genérica sobre o que pipelines acessam. |
| securityExample | FUNDIR:security | Tabela de riscos duplicava security.vulnerabilities; "AP mal configurado", "Roteamento incorreto", VLAN indevida e interface exposta foram para security. |
| diagram | MANTER | Correto e legível; só o número do h2 saiu. |
| labIntro | REMOVER | Invisível; frase-padrão de 39 aulas. |
| exercisesIntro | REMOVER | Invisível; moldura. |
| challengeIntro | REMOVER | Invisível; repete challenge.scenario. |
| solutionIntro | REMOVER | Invisível; repete commentedSolution.reasoning. |
| summary | MANTER | 4 bullets; "Ideia central" alinhada ao mentalModel e erro comum NAT/SSID oculto. |
| nextTheme | MANTER | 2 frases, coerentes com 1.8 (Métricas). |
| lab | (não existe) | A aula não tem lab; progressRules usa exerciseDone/practicalExerciseDone. |
| quiz | ENXUGAR | Normalizado; distratores absurdos trocados por plausíveis; gabarito redistribuído; +1 questão (q1.7.7) sobre inundação do switch. 7 questões. |
| flashcards | ENXUGAR | fc1.7.1 e fc1.7.6 (copiavam q1.7.1 e q1.7.6) removidos; novos fc1.7.8 (NIC: link, duplex, driver), fc1.7.9 (domínios), fc1.7.7 (NAT ≠ firewall). 7 cards. |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, boas. |
| exercises | MANTER | 4, com expectedAnswer. |
| challenge | MANTER | Cenário, restrições e rubrica claros. |
| commentedSolution | MANTER | Raciocínio, passos, respostas erradas comuns e resposta final. |
| glossary | ENXUGAR | 6 termos usados; Hub e Switch com domínio de colisão e inundação na longDefinition. |
| security | MANTER | Recebe securityExample e deepDive.securityImpact/limitations (VLAN indevida, hub em produção, firewall não compensa arquitetura ruim, AP mal configurado, roteamento incorreto, inventário de interfaces). |
| troubleshooting | MANTER | Comandos corretos com finalidade/esperado/interpretação; decisionTree recebe os riscos da decisionTable. |
| references | MANTER | Internas + IEEE 802.3 e 802.11 (reais). |
| linksToOtherCourses | MANTER | — |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:concept/summary/internals/architecture/cloudExample/security/troubleshooting | mentalModel → definição e resumo; limitations → internals (switch L3), cloudExample (SG), security.commonErrors; whenNotToUse → security.badPractices (hub, AP doméstico já existia), cloudExample (SG); operational/financialImpact → architecture e cloudExample; securityImpact → já coberto em security; decisionTable → decisionTree (duplicada; riscos anexados); keyTerms → cobertos pelo glossário e texto. "Padronizar marcas e modelos" removido (genérico). |
| commonMistakes | MOVER:internals | Callout "Erros comuns" em internals. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | "A internet caiu" não é diagnóstico; a falha pode estar em NIC, cabo, porta, AP, roteador, firewall, DNS, provedor, regra, certificado, VPN, rota, serviço | MANTIDO | motivation |
| 2 | Cada equipamento decide com informação diferente e gera evidência diferente | MANTIDO | motivation, internals |
| 3 | Firewall não é roteador "mais caro"; AP não é a internet; NIC não é só entrada do cabo | MANTIDO | motivation |
| 4 | SOC precisa saber onde está a evidência (host, switch, AP, firewall, roteador, proxy, logs) | MANTIDO | motivation (callout) |
| 5 | Hub repete sinal para todas as portas; um único domínio de colisão; desempenho e privacidade ruins | MANTIDO | evolution, internals, glossary, quiz q1.7.6 |
| 6 | Switch aprende MAC de origem por porta e encaminha pela porta do destino (tabela MAC) | MANTIDO | internals, flashcard fc1.7.2, glossary |
| 7 | Switch inunda destino desconhecido/broadcast nas portas da VLAN exceto a de origem | MANTIDO (novo) | internals, quiz q1.7.7, glossary — lacuna do objetivo 2 |
| 8 | Domínio de colisão × domínio de broadcast (hub, switch, roteador) | MANTIDO (novo) | internals, flashcard fc1.7.9 |
| 9 | Exemplo de entrada de tabela MAC e de tabela de rotas (rota conectada e default) | MANTIDO (novo) | internals (tabela) |
| 10 | Roteador lê IP de destino, consulta tabela de rotas, decide próximo salto | MANTIDO | internals, fc1.7.3 |
| 11 | AP: SSID, autenticação, canal, potência, associação, roaming; ponte Wi‑Fi ↔ cabeada | MANTIDO | internals, fc1.7.4, glossary |
| 12 | Firewall: política, estado, zonas, portas, protocolos, aplicação, usuário, contexto; permite/bloqueia/registra | MANTIDO | internals, glossary |
| 13 | NIC negocia link, velocidade, duplex; tem MAC; depende de driver e SO | MANTIDO | internals, fc1.7.8 |
| 14 | Evolução do firewall: filtro simples → estado → aplicação/identidade/contexto | MANTIDO | evolution (parágrafo) |
| 15 | Papéis virtuais: NIC virtual, vSwitch, route table, SG, firewall gerenciado, LB, NAT gateway, ingress controller, service mesh | MANTIDO | cloudExample |
| 16 | Lista "Sem NIC / switch / roteador / AP / firewall / com hub" | MANTIDO | problem |
| 17 | Tabela evolução: problema original, limitação, evolução moderna (SR-IOV, eBPF, VLAN, STP, PoE, L3, SD-WAN, Wi‑Fi 6/7, WPA3, NAC, NGFW, WAF, ZTNA) | MANTIDO | evolution |
| 18 | Coluna "Como decide" da tabela de evolução | REMOVIDO | duplicado em internals (lista por equipamento) |
| 19 | Modelo mental: problema, camada, informação, tabela, decisão, falhas, evidências | MANTIDO | concept (definition-box), summary |
| 20 | Caixa única residencial (switch, AP, NAT, DHCP, firewall); switch L3 também roteia | MANTIDO | internals, simpleExample |
| 21 | Camadas de arquitetura: acesso, distribuição, borda, serviços, controle de segurança; caminho pequeno × empresa | MANTIDO | architecture |
| 22 | Gerenciáveis custam mais mas geram logs; licenças de firewall; equipamento barato tem custo oculto; mais equipamentos exigem documentação/backup | MANTIDO | architecture (de deepDive) |
| 23 | "Padronizar marcas e modelos simplifica suporte" | REMOVIDO | genérico, fora do escopo dos objetivos |
| 24 | Analogia do prédio + limite | MANTIDO | analogy |
| 25 | Exemplo doméstico: Wi‑Fi conectado e nada abre → DNS/rota/firewall/provedor; sem link → NIC/cabo/porta/energia | MANTIDO | simpleExample |
| 26 | Switch de acesso com VLAN, 802.1X, port security, PoE; firewall interno; borda | MANTIDO | enterpriseExample |
| 27 | Evidência por equipamento (porta/MAC/VLAN; permitido/bloqueado; rota; cliente/RSSI/SSID; IP/gateway/DNS/processos) | MANTIDO | enterpriseExample |
| 28 | Cloud: troubleshooting por rota, SG, ACL, flow log, peering, private endpoint, DNS privado, identidade; SG não é firewall completo; custo recorrente | MANTIDO | cloudExample |
| 29 | DevSecOps: Terraform, Kubernetes (Services, Ingress, NetworkPolicies); pipeline × registry; acesso lógico × caminho | MANTIDO | devsecopsExample |
| 30 | "Pipelines precisam acessar registries, scanners…" | REMOVIDO | redundante com o caso do registry no parágrafo seguinte |
| 31 | Riscos: VLAN indevida, AP fraco/mal configurado, firewall permissivo, rota errada, interface exposta | MANTIDO | security (badPractices, vulnerabilities, goodPractices) |
| 32 | Mitigações: port security, 802.1X, VLAN restrita, portas desativadas, menor privilégio, WPA3/WPA2-Enterprise, controle de rotas | MANTIDO | security.vulnerabilities |
| 33 | commonErrors: conectividade ≠ autorização; NAT ≠ firewall; SSID oculto; cloud tem rede; firewall não compensa arquitetura ruim | MANTIDO | security.commonErrors, fc1.7.7, summary |
| 34 | Monitoramento, hardening, ideias de detecção | MANTIDO | security |
| 35 | Comandos: ipconfig /all, getmac /v, Get-NetAdapter, Test-NetConnection; ip link/addr/route, ss -tulpen; show ip interface brief, show mac address-table, show cdp neighbors, show interfaces status | MANTIDO | troubleshooting.commands |
| 36 | Árvore de decisão (host único, mesmo switch, outra rede, só Wi‑Fi) + riscos da decisionTable | MANTIDO | troubleshooting.decisionTree |
| 37 | Erros comuns (switch=roteador, firewall=roteador com bloqueio, AP=internet, ignorar NIC/driver) | MANTIDO | internals (callout) |
| 38 | Não usar hub em produção; não pôr AP doméstico na rede corporativa | MANTIDO | security.badPractices |
| 39 | Documentação de rede é sensível | MANTIDO | security.goodPractices ("Proteger documentação de rede e backups") |
| 40 | Desafio da pequena empresa (papéis, segmentação, evidências, orçamento) e solução comentada | MANTIDO | challenge, commentedSolution |
| 41 | Glossário: NIC, Switch, Roteador, Access point, Firewall, Hub | MANTIDO | glossary |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar NIC, hub, switch, roteador, AP e firewall | internals (lista + erros comuns), problem, summary, quiz q1.7.1/2/6, flashcards, exercício ex1.7.1 |
| Entender o papel por camada, tabela interna e decisão | concept (7 perguntas), internals (lista, domínios, tabela com valores), quiz q1.7.7, fc1.7.9 |
| Evitar confusões entre conectar, comutar, rotear, distribuir Wi‑Fi e filtrar | internals (callout "Erros comuns"), motivation, security.commonErrors, mentor 1 |
| Relacionar físicos com equivalentes virtuais em cloud e DevSecOps | cloudExample, devsecopsExample, evolution (coluna evolução moderna), quiz q1.7.5 |
| Diagnosticar escolhendo o equipamento certo | simpleExample, enterpriseExample, troubleshooting, quiz q1.7.4, mentor 2, ex1.7.2 |
| Riscos de equipamentos mal posicionados ou configurados | security (vulnerabilities, práticas), quiz q1.7.3, mentor 3, ex1.7.4, challenge |

## 10. O que mudou na nova versão
- `history`, `securityExample`, `labIntro`, `exercisesIntro`, `challengeIntro` e `solutionIntro` removidos; o que era exclusivo foi para `evolution`, `cloudExample` e `security`.
- `deepDive` e `commonMistakes` removidos depois de mover o conteúdo útil (callout "Erros comuns" em internals, modelo mental na definição e no resumo, custos em architecture/cloud, limites em internals/cloud/security, riscos da decisionTable na decisionTree).
- `internals` ganhou o mecanismo de inundação do switch, a diferença domínio de colisão × broadcast e uma tabela com entradas de exemplo de tabela MAC e de rotas (endereços de documentação 203.0.113.0/24 e privados).
- Quiz normalizado (`a` → `answer` numérico), distratores absurdos trocados por plausíveis, explicações dizem por que os distratores estão errados, gabarito distribuído entre as posições 0, 1, 2 e 3, nova questão q1.7.7.
- Flashcards: removidos fc1.7.1 e fc1.7.6 (copiavam o quiz); criados fc1.7.8, fc1.7.9 e fc1.7.7.
- Títulos `<h2>` sem número; tabelas novas com `responsive-table` + `data-table`; callout novo com `callout warning`.
- `duration` 80-115 → 75-105 min; `estimatedStudyTimeMinutes` 115 → 105.

## 11. Depois
Palavras visíveis: 4072 → 4590 (+12,7%; cortes brutos 401 = 10%, acréscimos 919, dos quais ~600 vindos de campos invisíveis e do quiz reescrito) · Invisíveis: 772 → 45 (networkContext) · Duração: declarada 80-115 min → nova 75-105 min (T 82,9 → 86,0 min) · Quiz corrigido: sim (7 questões). `validar`: ok, sem erros nem avisos.

## 12. Revisão humana
- O módulo m01 lista `lab-1.7` em `requiredLabs`, mas a aula 1.7 não tem lab (nem no original); a conclusão usa `exerciseDone`/`practicalExerciseDone`. Inconsistência no arquivo do módulo, não alterada aqui.
- Conteúdo novo acrescentado para cobrir o objetivo 2: inundação do switch, domínios de colisão × broadcast, tabela com entradas de exemplo (MAC 00:1a:2b:3c:4d:5e, 192.168.10.0/24 conectada, default via 203.0.113.1), questão q1.7.7 e flashcards fc1.7.8/fc1.7.9. Conferir se o nível está adequado para o m01 (o tema é aprofundado no módulo de switching).
- Diagrama mantido como estava: a caixa "NIC" não está ligada à caixa "Notebook" e o hub aparece no caminho principal (rotulado "Repetidor legado"). Não está errado, mas poderia ficar mais claro.

```json
{
  "id": "1.7", "modulo": "m01", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Equipamentos de rede: NIC, hub, switch, roteador, AP e firewall",
  "duracao_declarada": "80-115 min", "T_original_min": 82.9, "duracao_nova": "75-105 min", "T_nova_min": 86.0, "duracao_nova_estimated_max": 105, "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "BAIXA", "linguica_pct": 11, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 0, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4072, "palavras_visiveis_depois": 4590,
  "palavras_invisiveis_antes": 772, "palavras_invisiveis_depois": 45,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:evolution", "problem": "ENXUGAR", "evolution": "ENXUGAR",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "MANTER", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "MANTER",
    "quiz": "ENXUGAR", "flashcards": "ENXUGAR", "mentorQuestions": "MANTER", "exercises": "MANTER",
    "challenge": "MANTER", "commentedSolution": "MANTER", "glossary": "ENXUGAR", "security": "MANTER",
    "troubleshooting": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER", "networkContext": "MANTER",
    "deepDive": "MOVER:concept/summary/internals/architecture/cloudExample/security/troubleshooting",
    "commonMistakes": "MOVER:internals"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Módulo m01 exige lab-1.7 em requiredLabs, mas a aula 1.7 não tem lab (já no original).",
    "Conteúdo novo para o objetivo 2 (inundação do switch, domínios de colisão x broadcast, tabela com entradas de exemplo, q1.7.7, fc1.7.8, fc1.7.9): conferir nível para o m01.",
    "Diagrama mantido: caixa NIC sem ligação com Notebook e hub no caminho principal; poderia ficar mais claro."
  ]
}
```
