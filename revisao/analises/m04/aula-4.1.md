# Aula 4.1 — Por que o IPv4 existe
Tipo: fundamental · Duração declarada: 95-135 min · Palavras visíveis / invisíveis (antes): 4562 / 717

## 1. Duração
T pela fórmula = 141,6 min (teoria 19,6, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 60)
Veredito: DESEQUILIBRADA — pela conta, M = 115 fica dentro de 0,8×T (113), então o total passa. O problema é a distribuição: o lab responde por 42% do T com 60 min para 6 passos curtos (`ipconfig /all`, `ip route`, `ping` ao gateway, `arp -a`, uma tabela e `ip route get`/`tracert`), e os passos 1 e 2 são alternativos (Windows ou Linux). A estimativa alternativa da ferramenta dá 36 min. A teoria ocupa só 16% numa aula conceitual, mas isso se deve ao lab inflado, não a falta de explicação.

## 2. Encheção de linguiça
Nível: BAIXA (~9%). Evidências:
- `motivation`: adjetivação (“uma das ideias mais importantes da história das redes”) e um callout que repete o parágrafo (“IPv4 é o ponto em que a rede deixa de ser apenas local e passa a ser interligada”).
- `history`, 3º parágrafo: lista genérica (“ainda está presente em redes domésticas, empresas, cloud, VPNs, NAT, firewalls, logs, SIEMs…”); “tornou-se dominante por décadas” não explica o mecanismo.
- `evolution`: o parágrafo narra de novo, em prosa, o que a tabela logo abaixo já mostra (“Primeiro, a máquina precisava entregar bits… Depois, Ethernet…”).
- `enterpriseExample`, 3º parágrafo: repete o 2º (“se a máscara fizer o host acreditar que um destino remoto está local”).
- `devsecopsExample`, 2º parágrafo: lista genérica (“Pode ser rota, DNS, firewall, security group, proxy, NAT, subnet…”).
- `securityExample`: o 2º parágrafo repete o 1º (“IPv4 também é a unidade básica de muitas decisões de segurança”), e duas linhas da tabela (rede plana, allowlist 0.0.0.0/0) repetem `security.vulnerabilities`/`badPractices`.
- `lab`: `safetyNotes` repetem o pré-requisito “Usar apenas sua própria máquina”; `analysisTask` do passo 5 é a frase-padrão de 56 aulas (“Produza o artefato indicado na instrução do passo…”); `lab.troubleshooting` “Gateway não responde” duplica `troubleshooting.decisionTree`.
- Quiz/flashcards: 4 dos 6 flashcards copiam questões do quiz (fc4.1.1≈q1, fc4.1.2≈q2, fc4.1.3≈q3, fc4.1.6≈q4); ex4.1.2 repete o mentor 2 e o `lab.challenge` (“acessa local, falha na internet”).
- 717 palavras em campos invisíveis (deepDive, commonMistakes, protocolFields, packetFlow, 4 intros).

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: a decisão local (comparar IP/máscara → ARP para o destino ou para o gateway), o fato de o IP de destino se manter enquanto o frame muda a cada enlace (com a consequência prática na captura), o exemplo com valores reais (192.168.1.50/24 → .80 vs 8.8.8.8), o diagrama, a tabela de evolução (classful→CIDR, escassez→NAT/IPv6) e um troubleshooting com comandos corretos para Windows, Linux e Cisco, com árvore de decisão. Lacunas: o quiz não testava a decisão central da aula (qual MAC vai no frame para um destino remoto); nenhuma prática exercitava o erro de máscara, citado no conteúdo como incidente típico. Os erros comuns (objetivo 5) e os campos do cabeçalho estavam só em campos invisíveis. Erros técnicos: o glossário dizia “/24 equivale, em geral, a 255.255.255.0”, mas a equivalência é exata (corrigido). Os distratores do quiz eram triviais (“Teclado do operador”, “Encoding UTF-8”, “Reinstalar o navegador”).

## 4. Aproveitamento
BOM (~88%) — medido contra o T original (141,6). O tempo de fato desperdiçado é pouco: ~3 min de leitura redundante, 6 min de um exercício duplicado, ~2 min de flashcards que copiam o quiz, 1 min de questão trivial (q4.1.5) e ~1 min de texto ritual do lab, ou seja, ~13 min. O excesso do lab (60 min declarados contra ~35 min necessários) infla a estimativa, mas não consome tempo real do aluno: o problema é de duração (seção 1), não de aproveitamento. Contra a duração declarada (M = 115), o aproveitamento também fica acima de 80%.

## 5. Pode ser mais curta?
SIM — redução prevista de ~17% (T 141,6 → 117,1), quase toda pela correção do lab (60 → 35 min) e por cortes de redundância, sem perder nenhum item do inventário.

## 6. Explicação mais direta
SIM — `concept`: a definição passou para a primeira linha e o parágrafo que repetia a definição saiu. `history`+`problem`: viraram um só parágrafo de contexto, seguido do problema. `evolution`: uma frase e a tabela, no lugar da prosa que narrava a tabela. `enterpriseExample`: os quatro incidentes viraram uma lista no lugar de dois parágrafos sobrepostos. `securityExample`: um parágrafo só, uma tabela com os 2 riscos que não estavam em `security` e uma frase sobre identidade.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantido o chamado real; cortados a adjetivação e a frase repetida do callout |
| history | FUNDIR:problem | Mantidas as 2–3 frases que explicam por que o IP existe (interligar redes heterogêneas; divisão Ethernet local × IP entre redes); cortada a lista genérica |
| problem | MANTER | Recebeu o contexto histórico; lista “Sem IP/máscara/gateway…” preservada |
| evolution | ENXUGAR | Tabela mantida (explica CIDR/NAT/IPv6); prosa repetida trocada por 1 frase; acrescentado “o espaço IPv4 é limitado” (deepDive.limitations) |
| concept | MANTER | Definição primeiro; recebeu deepDive.limitations e o callout “Erros comuns” (commonMistakes) |
| internals | MANTER | Fluxo de 7 passos com as falhas típicas do packetFlow; tabela de campos (protocolFields); “Modelo mental v2.0” → “Modelo mental” |
| architecture | MANTER | Posição entre L2 e L4, componentes e pontos de falha; enxugado de leve |
| analogy | MANTER | Boa; limite da analogia em 1 frase |
| simpleExample | MANTER | Concreto, com valores |
| enterpriseExample | ENXUGAR | 3º parágrafo fundido; incidentes viram lista de 4 itens |
| cloudExample | ENXUGAR | Mantidos os recursos e os custos; recebeu deepDive.financialImpact (escolha IP público/NAT/bastion/VPN/endpoint; renumeração) |
| devsecopsExample | ENXUGAR | 1 parágrafo; mantido o erro de CIDR em Terraform; cortada a lista genérica |
| securityExample | ENXUGAR | 2º parágrafo fundido; removidas da tabela as linhas que repetem `security` (rede plana, allowlist ampla) |
| diagram | MANTER | Correto e legível; só o número saiu do h2 |
| labIntro | REMOVER | Invisível; repetia o objetivo do lab |
| exercisesIntro | REMOVER | Invisível |
| challengeIntro | REMOVER | Invisível; repetia o cenário do desafio |
| solutionIntro | REMOVER | Invisível; repetia o reasoning da solução |
| summary | ENXUGAR | 4 bullets; o 1º é o deepDive.mentalModel |
| nextTheme | ENXUGAR | 1 frase coerente com o título da 4.2 |
| networkContext | MANTER | Metadado |
| deepDive | MOVER:summary,concept,evolution,cloudExample,security | mentalModel → summary; limitations → concept/evolution; financialImpact → cloudExample; operationalImpact → security.goodPractices; whenNotToUse → security.commonErrors; securityImpact e whenToUse removidos (duplicados em security/securityExample) |
| commonMistakes | MOVER:concept | Callout “Erros comuns” com os 3 erros (cobre o objetivo 5) |
| protocolFields | MOVER:internals | Tabela de 4 campos (Source, Destination, TTL, Protocol) |
| packetFlow | MOVER:internals | Falhas típicas incorporadas aos passos; o ARP dentro da VLAN virou o passo 5 |
| security | ENXUGAR | Fundido com deepDive; “Segmentação por função” (hardening) removido por duplicar goodPractices/vulnerabilidade |
| troubleshooting | MANTER | Comandos corretos, campos preenchidos, árvore de decisão útil |
| lab | ENXUGAR | estimatedTimeMinutes 60→35; safetyNotes 3→2; pré-requisito duplicado removido; analysisTask específica; lab.troubleshooting duplicado removido; improvement genérico removido |
| quiz | MANTER (ajustado) | 6 questões; q4.1.5 (trivial) trocada por q4.1.7 (decisão local); distratores plausíveis em q2, q3, q4, q6; gabarito redistribuído |
| flashcards | MANTER (ajustado) | 6; três que copiavam o quiz foram trocados (fc4.1.7, fc4.1.8, fc4.1.9) |
| mentorQuestions | MANTER | 3 perguntas de raciocínio |
| exercises | MANTER (ajustado) | 4; ex4.1.2 (duplicava mentor 2/lab.challenge) trocado por ex4.1.5 (máscara errada) |
| challenge | MANTER | Cenário concreto, rubrica de 100 pontos |
| commentedSolution | MANTER | Raciocínio e erros comuns corretos |
| glossary | MANTER | 6 termos, todos usados; exemplo da máscara corrigido |
| references | MANTER | RFC 791 + aulas internas |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | IPv4 resolve endereçamento/roteamento entre redes; MAC é só entrega local | MANTIDO | motivation, problem, concept, q4.1.1 |
| 2 | Broadcast ARP não atravessa roteadores; o switch local não encaminha para rede distante | MANTIDO | motivation |
| 3 | MAC não diz a rede, não tem hierarquia global, não é usado por roteadores | MANTIDO | problem |
| 4 | Origem histórica: o TCP/IP nasceu para interligar redes heterogêneas; Ethernet ficou com o local, o IP com o caminho | MANTIDO | problem (1º parágrafo) |
| 5 | “IPv4 dominante por décadas / ainda presente em tudo” | REMOVIDO | genérico, não explica o mecanismo; a permanência do IPv4 ao lado do IPv6 está implícita na tabela de evolution |
| 6 | Lista “Sem IP / máscara / gateway / roteamento / campos IP” | MANTIDO | problem |
| 7 | Evolução MAC→IP; classful A/B/C→CIDR (desperdício); escassez→NAT, IPv6, redes privadas | MANTIDO | evolution (tabela) |
| 8 | Espaço de endereços IPv4 limitado | MANTIDO | evolution (tabela) |
| 9 | 32 bits, 4 octetos decimais, exemplo 192.168.10.20 | MANTIDO | concept |
| 10 | IPv4 não substitui Ethernet, trabalha acima dela | MANTIDO | concept, ex4.1.1 |
| 11 | IPv4 não garante entrega, confidencialidade, autenticação nem autorização | MANTIDO | concept, fc4.1.4 |
| 12 | IP é um ponto lógico num dado momento, não pessoa/processo | MANTIDO | concept |
| 13 | Erros comuns: IP×MAC; DNS para pingar IP; IP como identidade | MANTIDO | concept (callout), fc4.1.9, q4.1.4 |
| 14 | O host tem IP, máscara, gateway e DNS; compara o próprio IP com o destino usando a máscara | MANTIDO | internals passos 1–2 |
| 15 | Destino local → ARP para o destino; remoto → ARP para o gateway | MANTIDO | internals, simpleExample, q4.1.7, modelo mental |
| 16 | ARP Request/Reply dentro da VLAN local | MANTIDO | internals passo 5 |
| 17 | IP de origem/destino se mantêm; MAC muda a cada enlace; o roteador remove o frame e cria outro | MANTIDO | internals, diagram, summary, fc4.1.7 |
| 18 | Na captura local, o MAC de destino é o do gateway mesmo para servidor remoto | MANTIDO | internals |
| 19 | Falhas típicas por etapa (máscara, gateway ausente, VLAN/ARP, rota/firewall) | MANTIDO | internals (packetFlow) |
| 20 | Campos Source/Destination (32 bits), TTL (8 bits; loops; traceroute), Protocol (8 bits; ICMP/TCP/UDP) | MANTIDO | internals (tabela) |
| 21 | Posição: OSI L3, TCP/IP Internet; abaixo Ethernet/Wi-Fi/PPP/túneis; acima TCP/UDP/ICMP | MANTIDO | architecture, fc4.1.8 |
| 22 | Componentes e pontos de falha (IP, máscara, gateway, rota, conflito, NAT, firewall) | MANTIDO | architecture |
| 23 | Analogia prédio/mesa/portaria; o roteador decide só o próximo salto | MANTIDO | analogy |
| 24 | Exemplo 192.168.1.50/24, gateway .1; .80 local; 8.8.8.8 remoto | MANTIDO | simpleExample, q4.1.7 |
| 25 | Empresa 10.10.10/20/30.0/24; máscara errada → ARP; gateway fora da sub-rede; rota ausente; conflito de IP intermitente | MANTIDO | enterpriseExample, ex4.1.5 |
| 26 | Cloud: VPC/VNet, subnets, route tables, NAT GW, LB, private endpoints, SG; custos (NAT, entre zonas, firewall, flow logs, IP público); escolha IP público/NAT/bastion/VPN/endpoint; renumeração | MANTIDO | cloudExample, ex4.1.4, mentor 3 |
| 27 | DevSecOps: erro de CIDR em Terraform expõe porta ou bloqueia pipeline; deploy falha por rede, não por código | MANTIDO | devsecopsExample |
| 28 | Lista de componentes DevSecOps (ingress controllers, scanners, conflito de IP em ambiente híbrido) | REMOVIDO | lista genérica; o conflito de IP já está em enterpriseExample/architecture |
| 29 | Riscos: IP público exposto; logs mal interpretados por NAT/proxy | MANTIDO | securityExample (tabela) |
| 30 | Riscos: rede plana; allowlist 0.0.0.0/0 | MANTIDO | security.vulnerabilities, security.badPractices, ex4.1.3 (removidos da tabela por duplicação) |
| 31 | IP não é identidade forte; correlacionar horário, lease, autenticação e caminho | MANTIDO | securityExample, security.commonErrors, q4.1.4 |
| 32 | Mudança de gateway/máscara/rota = mudança de arquitetura; afeta firewall, DNS, monitoramento, allowlists; documentar reservas | MANTIDO | security.goodPractices |
| 33 | Listas de security (IP privado ≠ seguro; NAT ≠ firewall; monitoring; hardening; detection) | MANTIDO | security |
| 34 | Comandos: ipconfig /all, route print, ping, ip addr, ip route, show ip interface brief/route/arp, tracert, ip route get (dev/src/via), Test-NetConnection -TraceRoute; árvore de decisão | MANTIDO | troubleshooting |
| 35 | Lab: coleta, ping ao gateway, ARP, tabela de decisão, ip route get/tracert; APIPA 169.254 | MANTIDO | lab |
| 36 | Gateway não responde: L1/L2, VLAN, ARP, ICMP bloqueado | MANTIDO | troubleshooting.decisionTree, lab passo 3 (expectedOutput “bloqueio controlado”), commentedSolution (removido de lab.troubleshooting por duplicação) |
| 37 | Rota default 0.0.0.0/0; /24 = 255.255.255.0; endereço lógico muda em casa/trabalho/VPN | MANTIDO | glossary (exemplo da máscara corrigido) |
| 38 | Route table como recurso de encaminhamento em cloud (antiga q4.1.5) | MANTIDO | cloudExample, ex4.1.4, mentor 3 |
| 39 | RFC 791 | MANTIDO | references |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que IPv4 existe e qual problema resolve | motivation, problem, evolution, concept; q4.1.1; mentor 1 |
| Diferenciar endereço lógico IPv4 de MAC | concept, internals, analogy, diagram; q4.1.2, q4.1.7; fc4.1.7; ex4.1.1 |
| Papel de máscara, gateway e roteadores | internals, simpleExample, enterpriseExample; q4.1.3; fc4.1.3, fc4.1.5; ex4.1.5; lab; challenge |
| Relacionar IPv4 com cloud, DevSecOps, segurança e troubleshooting | cloud/devsecops/securityExample, security, troubleshooting; q4.1.4, q4.1.6; ex4.1.3, ex4.1.4; mentor 3 |
| Evitar confusões entre IP, MAC, DNS, rota e firewall | concept (callout “Erros comuns”), troubleshooting.decisionTree; q4.1.6; fc4.1.9; commentedSolution.commonWrongAnswers |

## 10. O que mudou na nova versão
- Os campos invisíveis foram movidos para onde o aluno vê: commonMistakes → callout em concept; protocolFields → tabela em internals; packetFlow → falhas típicas nos passos de internals; deepDive → summary, concept, evolution, cloudExample e security. As 4 intros invisíveis foram removidas.
- `history` foi fundida em `problem`; houve enxugamento de motivation, evolution, enterprise, cloud, devsecops, securityExample, summary e nextTheme; os números saíram dos `<h2>`.
- O lab ficou com `estimatedTimeMinutes` 60 → 35, coerente com 6 passos curtos (dois deles alternativos entre Windows e Linux; a estimativa alternativa da ferramenta dá 36 min). O texto ritual foi cortado (safetyNotes 3→2, pré-requisito duplicado, improvement genérico, troubleshooting duplicado) e a `analysisTask` do passo 5 trocou a frase-padrão por uma tabela concreta.
- **Acréscimos que não são conteúdo movido (justificativa):**
  - q4.1.7 (substitui q4.1.5, cuja dificuldade estava toda em distratores como “Teclado do operador”): testa o learningOutcome 1 (MAC do gateway × MAC do destino), que nenhuma questão cobria. O quiz continua com 6 questões.
  - Distratores novos em q4.1.2, q4.1.3, q4.1.4 e q4.1.6: os originais eram triviais (UTF-8, certificado TLS, navegador). Isso explica +137 palavras no quiz, que não entram no T.
  - ex4.1.5 (substitui ex4.1.2, que repetia o mentor 2 e o `lab.challenge`): pratica o erro de máscara descrito em enterpriseExample e no passo 2 de internals; cobre o objetivo “papel da máscara”, que não tinha prática. São 4 exercícios, como antes.
  - fc4.1.7, fc4.1.8, fc4.1.9 (substituem fc4.1.1, fc4.1.2 e fc4.1.6, que copiavam o quiz): cobrem a troca de MAC por enlace, as camadas e o erro do “DNS para pingar IP”, tudo já presente no conteúdo. Continuam 6 flashcards.
  - No conteúdo, nenhum fato novo foi criado. A frase de abertura de `evolution` e a lista de incidentes em `enterpriseExample` só reorganizam o que já existia.
- Glossário: “/24 equivale, em geral, a 255.255.255.0” virou “/24 equivale a 255.255.255.0” (erro óbvio). `security.commonErrors` e `goodPractices` absorveram os itens do deepDive.
- `duration` 95-135 → 100-140 min e `estimatedStudyTimeMinutes` 135 → 140, pela faixa recomendada da nova versão (T 117,1). A faixa declarada sobe um pouco porque a original estava no limite de SUBESTIMADA (M = 115 contra T = 141,6), mas o T real cai 17%.
- Aviso do `validar`, justificado: “ids de quiz originais ausentes: q4.1.5”, porque a questão foi substituída por q4.1.7 (id inédito, sem reaproveitar o anterior).

## 11. Depois
Palavras visíveis: 4562 → 4878 (+7%; teoria 2551 → 2613. O saldo positivo vem das ~330 palavras movidas de campos invisíveis e dos distratores novos do quiz. Os cortes brutos somam 341 palavras, 7%, coerentes com a linguiça estimada de ~9%) · Duração: 95-135 min → 100-140 min (T 141,6 → 117,1) · Quiz corrigido: sim (6 questões; formato padronizado, 1 substituída, 4 com distratores novos, gabarito redistribuído)

## 12. Revisão humana
- `lab.estimatedTimeMinutes` reduzido de 60 para 35 min (6 passos curtos; passos 1 e 2 são alternativos). Confirmar se o curso quer manter folga maior para iniciantes.
- O quiz perdeu a questão de cloud (q4.1.5, trivial). O tema continua coberto por ex4.1.4, pelo mentor 3 e por cloudExample. Confirmar se cada aula precisa de uma questão de cloud no quiz.

```json
{
  "id": "4.1", "modulo": "m04", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Por que o IPv4 existe",
  "duracao_declarada": "95-135 min", "T_original_min": 141.6, "duracao_nova": "100-140 min", "veredito_duracao": "DESEQUILIBRADA",
  "T_nova_min": 117.1, "duracao_nova_estimated_max": 140,
  "linguica_nivel": "BAIXA", "linguica_pct": 9, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": true, "reducao_tempo_pct": 17, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4562, "palavras_visiveis_depois": 4878,
  "palavras_invisiveis_antes": 717, "palavras_invisiveis_depois": 22,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "MANTER", "evolution": "ENXUGAR",
    "concept": "MANTER", "internals": "MANTER", "architecture": "MANTER", "analogy": "MANTER",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "ENXUGAR",
    "devsecopsExample": "ENXUGAR", "securityExample": "ENXUGAR", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER",
    "deepDive": "MOVER:summary,concept,evolution,cloudExample,security",
    "commonMistakes": "MOVER:concept", "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "MANTER",
    "flashcards": "MANTER", "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "MANTER",
    "commentedSolution": "MANTER", "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.estimatedTimeMinutes reduzido de 60 para 35 min (6 passos curtos, passos 1 e 2 alternativos): confirmar folga desejada",
    "q4.1.5 (cloud, trivial) substituída por q4.1.7; cloud segue coberto por ex4.1.4, mentor 3 e cloudExample"
  ]
}
```
