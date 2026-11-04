# Aula 3.5 — ARP: transformando IPv4 em MAC na rede local
Tipo: fundamental · Duração declarada: 90-125 min · Palavras visíveis / invisíveis (antes): 4502 / 703

## 1. Duração
T pela fórmula = 112,5 min (teoria 20,4 · diagramas 3 · quiz 6 · flashcards 3 · mentor 6 · exercícios 24 · desafio 20 · lab 30,1)
Veredito: **ORGANIZADA** — M = 107,5 ≈ 0,96×T, dentro da faixa recomendada (95-135). O `lab.estimatedTimeMinutes` (125 min, igual à aula inteira) não é plausível para 5 passos de consulta (`ipconfig`, `arp -a`, `ping`), por isso a fórmula usou a alternativa (30,1 min). A divisão teoria/prática (21% de leitura, o resto em lab, desafio e exercícios) faz sentido para uma aula fundamental com prática de comandos.

## 2. Encheção de linguiça
Nível: **MÉDIA (~18%)**. Evidências:
- `history` e `evolution` repetem o que `problem` e `concept` já dizem: "As duas tecnologias resolviam problemas diferentes, mas precisavam trabalhar juntas"; a tabela de evolução repete cloud (já em `cloudExample`), VLAN (já em `architecture`) e "não autentica nativamente a resposta" (já em `history`, `securityExample`, `security`, `summary`, diagrama).
- `problem` (flow-list) duplica os passos de `internals` ("Para ganhar eficiência: a resposta é guardada temporariamente no cache ARP").
- `architecture` termina com uma lista de perguntas ("tenho IP? tenho rota? …") que é a mesma de `troubleshooting.diagnosticQuestions`.
- `devsecopsExample` genérico ("ARP aparece indiretamente em laboratórios com VMs, Docker bridges, …, ambientes de teste"); `enterpriseExample` abre com lista genérica ("estações acessam gateway, servidores locais, impressoras, appliances…").
- `securityExample` sobrepõe `security` (spoofing, IP duplicado, rede plana, PCAP sensível aparecem nos dois).
- `lab`: frase-padrão de 56 aulas em `analysisTask` ("Produza o artefato indicado na instrução do passo e registre a evidência objetiva…"); `safetyNotes` repete `prerequisites` ("Não executar spoofing"); `lab.troubleshooting` repete `troubleshooting.decisionTree` (3 de 3 itens); `lab.challenge`/`lab.solution` repetem o mentor 2 e o ex3.5.2 (host sem ARP do gateway).
- Práticas sobrepostas: ex3.5.2 = mentor 2 = lab.challenge; mentor 3 = desafio (MAC do gateway muda); fc3.5.1/fc3.5.3/fc3.5.4 = q3.5.1/q3.5.2/q3.5.3; q3.5.5 (DNS × ARP) = fc3.5.6.
- Campos invisíveis com conteúdo valioso: `protocolFields` (campos da mensagem ARP), `packetFlow` (falha possível em cada etapa), `commonMistakes`, `deepDive.mentalModel`.

## 3. Conteúdo útil
**FORTE.** Valioso: decisão de próximo salto pela máscara antes do ARP; Request em broadcast `ff:ff:ff:ff:ff:ff` e Reply normalmente unicast; "para destino externo, ARP busca o MAC do gateway"; troubleshooting com comandos de Windows, Linux (estados REACHABLE/STALE/FAILED) e Cisco e árvore de decisão; desafio de MAC do gateway que muda, com HSRP/VRRP como hipótese legítima; segurança defensiva (DAI, DHCP snooping, 802.1X).
Lacunas: os campos da mensagem ARP estavam só no campo invisível; não havia nenhuma linha de saída de `arp -a`/`ip neigh` para o aluno interpretar (objetivo 4, resultado 2); o caso "destino na mesma sub-rede" não era exercitado no quiz nem nos exercícios (resultado 1); o efeito de máscara errada no ARP estava só em `packetFlow` (invisível).
Erros técnicos: typo "Roteiar" (q3.5.1); `lab.estimatedTimeMinutes` 125 incoerente com os passos; o passo 3 do lab dizia "ARP pode aparecer se houver comunicação local", quando a entrada aparece sempre que o gateway responde ao ARP, mesmo bloqueando ICMP.

## 4. Aproveitamento
**BOM** — cerca de 85% do T original (112,5 min) ensina ou pratica os objetivos. O desperdício está em ~4 min de teoria repetida e em itens de prática que repetem outros (ex3.5.2, mentor 3, lab.challenge, 3 flashcards), mas mesmo esses exercitam o tema. Contra a duração declarada (M = 107,5) o resultado é o mesmo.

## 5. Pode ser mais curta?
**NÃO** — redução prevista: ~7%. A teoria é só 21% do T; o grosso é prática fixa (lab 30, desafio 20, exercícios, mentor e quiz dentro das faixas). O corte de teoria repetida e de um exercício duplicado dá −7%, abaixo do limiar de 15%.

## 6. Explicação mais direta
**SIM** — `concept`: definição em `definition-box` logo no início e uma tabela "destino → próximo salto → ARP pergunta por" no lugar de prosa; `problem`: história fundida em 2 frases (tabela manual não escala; ARP sem autenticação); `internals`: as falhas por etapa e os campos da mensagem em tabelas; `motivation`: um parágrafo no lugar de dois; `analogy`: limite em 1 frase.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Um parágrafo + callout; tirada a lista longa de contextos e a repetição do callout. |
| history | FUNDIR:problem | Só "tabela manual não escala" e "criado sem autenticação" explicam por que o ARP é como é; viraram 2 frases em `problem`. |
| problem | ENXUGAR | Mantido o escopo IP × MAC; a flow-list duplicava `internals`/`concept`. |
| evolution | REMOVER | Linhas repetiam problem/cloud/architecture/security; o fato único (IPv6 usa NDP sobre ICMPv6) foi para `concept`. |
| concept | MANTER | Definição + o que o ARP não é + tabela mesma sub-rede × externo + callout "Erros comuns" (de `commonMistakes`). |
| internals | MANTER | 8 passos mantidos; recebe tabela de falhas por etapa (`packetFlow`), campos da mensagem (`protocolFields`) e leitura da tabela ARP. |
| architecture | ENXUGAR | Lista de componentes mantida; lista de perguntas final duplicava `troubleshooting`. |
| analogy | ENXUGAR | Analogia boa; limite reduzido a 1 frase. |
| simpleExample | MANTER | Concreto, com valores. |
| enterpriseExample | ENXUGAR | Cortado o parágrafo genérico; mantidos os dois cenários de diagnóstico. |
| cloudExample | ENXUGAR | Cobre o resultado 5; recebe de `devsecopsExample` o caso de bridges/runners. |
| devsecopsExample | FUNDIR:cloudExample | Um caso útil (runner/registry, bridge, IP duplicado entre VMs) em 2 frases; o resto era genérico. |
| securityExample | FUNDIR:security | Spoofing (impacto: DoS, interceptação, redirecionamento) foi para `security.vulnerabilities`; rede plana e PCAP sensível para `badPractices`/`goodPractices`. |
| diagram | MANTER | Correto e legível; só o `<h2>` perdeu o número. |
| labIntro | REMOVER | Invisível. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | ENXUGAR | 5 bullets; primeira linha = `deepDive.mentalModel`; inclui o mecanismo. |
| nextTheme | ENXUGAR | 1 frase coerente com o título da 3.6. |
| networkContext | MANTER | Metadado. |
| protocolFields | MOVER:internals | Tabela de campos, com EtherType e valores de Operation. |
| packetFlow | MOVER:internals | Tabela "onde cada etapa pode falhar" (e base do mentor 3). |
| deepDive | MOVER:summary/concept | mentalModel → summary; limitations → concept; whenNotToUse "autorização" já em `security.commonErrors`; financialImpact genérico removido. |
| commonMistakes | MOVER:concept | Callout "Erros comuns" (o erro "MAC do site" ficou na tabela do conceito, sem repetir). |
| security | ENXUGAR | Recebe `securityExample`; `hardening` e `detectionIdeas` sem os itens que repetiam `goodPractices`/`monitoring`. |
| troubleshooting | MANTER | Comandos corretos; o 4º ramo da árvore ganhou "testar IP direto e nslookup/dig" (vindo de `lab.troubleshooting`). |
| lab | ENXUGAR | Passos mantidos; `estimatedTimeMinutes` 125 → 30; ritual, `lab.challenge`/`solution` e 2 itens de `lab.troubleshooting` duplicados removidos; passo 3 corrigido. |
| quiz | MANTER | 6 questões; 2 trocadas (decoreba e duplicata), distratores refeitos em 2, gabarito redistribuído. |
| flashcards | MANTER | 6; 3 que copiavam o quiz foram trocadas. |
| mentorQuestions | MANTER | 3; mentor 3 (= desafio) trocado por cenário de máscara errada. |
| exercises | ENXUGAR | 4 → 3: ex3.5.1 e ex3.5.2 trocados por leitura de captura e cálculo de próximo salto; ex3.5.4 removido (coberto pelo lab passo 5 e pela q3.5.8). |
| challenge | MANTER | Bom e defensivo. |
| commentedSolution | MANTER | Bom. |
| glossary | MANTER | 6 termos, todos usados; `relatedLessons` (invisível) removido; definições longas de Request/Reply sem repetir a curta. |
| references | MANTER | RFC 826 e aulas internas, reais. |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | ARP resolve IPv4 → MAC dentro da rede local | MANTIDO | concept (definition-box), summary, glossary, q3.5.1 |
| 2 | IP é lógico (L3); MAC entrega frames no enlace (L2); pacote IP vai dentro de frame com MAC origem/destino | MANTIDO | problem |
| 3 | Tabela manual IP-MAC não escala (placas, VMs, notebooks mudam) | MANTIDO | problem |
| 4 | ARP foi criado sem autenticação → origem do spoofing | MANTIDO | problem, security.vulnerabilities, q3.5.3, diagrama |
| 5 | ARP não é DNS, não roteia, não protege | MANTIDO | concept, callout Erros comuns, fc3.5.6 |
| 6 | ARP não atravessa roteadores; limitado ao domínio de broadcast/VLAN | MANTIDO | concept, architecture, fc3.5.2 |
| 7 | IPv6 usa Neighbor Discovery (NDP/ICMPv6) em vez de ARP | MANTIDO | concept (vindo de evolution/deepDive) |
| 8 | Destino na mesma sub-rede → ARP pelo próprio destino | MANTIDO | concept (tabela), q3.5.7, ex3.5.5 |
| 9 | Destino externo → ARP pelo gateway, nunca pelo servidor final | MANTIDO | concept (tabela), summary, q3.5.2, ex3.5.5 |
| 10 | Gateway remove L2, analisa IP, decide próximo salto | MANTIDO | concept |
| 11 | Decisão de próximo salto por comparação IP/máscara antes do ARP | MANTIDO | internals, ex3.5.5, mentor 3 |
| 12 | Sequência de 8 passos (cache → Request broadcast → Reply unicast → cache → frame unicast) | MANTIDO | internals |
| 13 | Request para `ff:ff:ff:ff:ff:ff`; Reply normalmente unicast | MANTIDO | internals, fc3.5.7, glossary, lab.questions |
| 14 | Cache ARP guarda a associação por tempo limitado | MANTIDO | internals, glossary, diagrama |
| 15 | Falha por etapa: máscara errada, cache desatualizado, VLAN errada/storm, resposta indevida, falha depois do ARP | MANTIDO | internals (tabela, de packetFlow) |
| 16 | Falha de ARP parece "internet fora" | MANTIDO | motivation (callout) |
| 17 | Campos Hardware Type, Protocol Type, Operation, Sender MAC/IP, Target MAC/IP com tamanhos e observação defensiva | MANTIDO | internals (de protocolFields) |
| 18 | Papéis: host, switch, gateway, firewall roteado, VLAN, cloud/hypervisor | MANTIDO | architecture |
| 19 | Comandos `arp -a`, `ip neigh`, `ipconfig /all`, `ip route`, `ping`, `tracert`; Cisco `show arp`, `show mac address-table dynamic`, `show vlan brief` | MANTIDO | troubleshooting, lab, fc3.5.5 |
| 20 | Estados `REACHABLE`/`STALE`/`FAILED` | MANTIDO | troubleshooting, internals (leitura da tabela), q3.5.8 |
| 21 | Ping sem resposta não impede a entrada ARP (ICMP bloqueado) | MANTIDO | lab passo 3 (corrigido), q3.5.8 |
| 22 | Entrada ARP prova resolução local, não DNS/porta/TLS/autorização | MANTIDO | lab passo 5 (de ex3.5.4), lab.evidenceToCollect |
| 23 | Árvore de decisão: sem IP → DHCP; sem ARP → L2; MAC muda → failover/flapping/duplicado/spoofing; ARP ok → DNS/rota/porta | MANTIDO | troubleshooting.decisionTree |
| 24 | MAC do gateway mudando: failover legítimo (HSRP/VRRP), IP duplicado, MAC flapping ou spoofing | MANTIDO | enterpriseExample, decisionTree, challenge, commentedSolution, security.commonErrors |
| 25 | MAC não é identidade forte (pode ser falsificado) | MANTIDO | concept (Erros comuns), internals (campos), security, lab.questions |
| 26 | IP duplicado → intermitência; DHCP centralizado, reservas, alertas | MANTIDO | concept (Erros comuns), security.vulnerabilities |
| 27 | Spoofing: impacto DoS, interceptação sem criptografia, redirecionamento | MANTIDO | security.vulnerabilities (de securityExample) |
| 28 | Mitigações DAI, DHCP snooping, port security, 802.1X/NAC, VLANs menores, criptografia ponta a ponta | MANTIDO | security, summary, fc3.5.9, commentedSolution |
| 29 | NAT ou VLAN não eliminam spoofing dentro da mesma VLAN | MANTIDO | security.commonErrors e vulnerabilities |
| 30 | Rede plana amplia ruído e superfície lateral | MANTIDO | security.badPractices, ex3.5.3 |
| 31 | PCAPs/tabelas ARP revelam topologia: sanitizar e controlar acesso | MANTIDO | security.goodPractices, lab.safetyNotes |
| 32 | Monitoramento: MAC do gateway, volume de ARP, duplicate IP, flapping, broadcast por VLAN | MANTIDO | security.monitoring |
| 33 | Cloud abstrai L2, mas o modelo de próximo salto continua (SG, NSG, NACL, rota) | MANTIDO | cloudExample, architecture |
| 34 | Em bridges virtuais (Docker, Kind/Minikube) o ARP acontece; falha parece autenticação num runner | MANTIDO | cloudExample (de devsecopsExample) |
| 35 | "Bridge tem tabela própria", "CNIs encapsulam ou simulam comportamentos" | REMOVIDO | genérico, sem mecanismo explicado; o essencial (ARP real entre interfaces da bridge) ficou |
| 36 | Tabela de evolução (manual → dinâmico → LAN segmentada → cloud → IPv6) | REMOVIDO | duplicado em problem/architecture/cloudExample/concept |
| 37 | deepDive.financialImpact (custo de NAC/switches gerenciáveis; cloud cobra por logs) | REMOVIDO | genérico, fora do objetivo |
| 38 | Limpar o cache ARP não corrige a causa raiz | MANTIDO | commentedSolution.commonWrongAnswers |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que ARP existe | motivation, problem, mentor 1 |
| Diferenciar IP, MAC, próximo salto e gateway | problem, concept (tabela), internals passos 2–3, glossary, q3.5.2, q3.5.7, ex3.5.5, mentor 3 |
| Descrever ARP Request, ARP Reply e cache ARP | internals (passos e campos), diagrama, glossary, fc3.5.7, fc3.5.8, ex3.5.6 |
| Usar comandos defensivos para consultar e interpretar a tabela ARP | internals (Como ler a tabela ARP), troubleshooting.commands, lab, q3.5.8, fc3.5.5 |
| Relacionar ARP com troubleshooting, segurança de LAN e mitigação | internals (falhas por etapa), troubleshooting, security, enterpriseExample, challenge, commentedSolution, q3.5.3, q3.5.6, ex3.5.3, fc3.5.9 |

## 10. O que mudou na nova versão
- Movido de campos invisíveis: campos da mensagem ARP (`protocolFields`) e falha por etapa (`packetFlow`) viraram tabelas em `internals`; `commonMistakes` virou callout em `concept`; `deepDive.mentalModel` abre o `summary`; IPv6/NDP (de evolution/deepDive) foi para `concept`.
- Removidos: `history` (fundido em `problem`), `evolution`, `devsecopsExample` (fundido em `cloudExample`), `securityExample` (fundido em `security`) e as 4 intros invisíveis.
- Lab: `estimatedTimeMinutes` 125 → 30 (5 passos de consulta; a fórmula dá 29,5); passo 3 corrigido (a entrada ARP aparece mesmo com ICMP bloqueado); frase-padrão do passo 5 trocada por uma tarefa concreta; `lab.challenge`/`lab.solution` removidos (duplicavam mentor 2 e desafio; a ordem de verificação da solução foi para a explicação do mentor 2); `lab.troubleshooting` 3 → 1 (os outros 2 estavam na árvore de decisão; "nslookup/dig e testar IP direto" foi para a árvore); `safetyNotes` 4 → 3 e `prerequisites` sem a regra repetida.
- Quiz (6 → 6): q3.5.4 ("qual comando mostra a tabela ARP", decoreba) trocada por q3.5.8 (interpretar `ip neigh` REACHABLE com ping sem resposta); q3.5.5 (DNS × ARP, igual à fc3.5.6) trocada por q3.5.7 (destino na mesma sub-rede); q3.5.6 com distratores plausíveis no lugar de HTTP 500/SSO/CORS; q3.5.2 com distrator "broadcast" no lugar de "todos os IPs da internet"; typo "Roteiar" corrigido; gabarito redistribuído com `quiz_embaralhar`.
- Flashcards (6 → 6): fc3.5.1, fc3.5.3 e fc3.5.4 copiavam q3.5.1–q3.5.3; foram trocadas por fc3.5.7 (Request broadcast × Reply unicast), fc3.5.8 (EtherType e Operation) e fc3.5.9 (controles de switch contra spoofing).
- Mentor (3 → 3): o mentor 3 repetia o desafio e foi trocado por um cenário de máscara /16 errada (vindo de `packetFlow`).
- Exercícios (4 → 3): ex3.5.1 (≈ mentor 1) trocado por ex3.5.6 (ler um ARP Request numa captura); ex3.5.2 (= mentor 2 = lab.challenge) trocado por ex3.5.5 (próximo salto para 3 destinos); ex3.5.4 removido (o lab passo 5 e a q3.5.8 cobrem "o que a entrada prova e o que não prova").
- **Acréscimos novos, não movidos (justificativa):**
  - EtherType `0x0806` e valores de Operation (1 = Request, 2 = Reply), e "Target MAC vai zerado no Request": completam a tabela de campos movida e são necessários para o objetivo 3 (descrever Request e Reply) e para ler a captura do ex3.5.6 / melhoria Wireshark do lab. Fatos da RFC 826.
  - "Como ler a tabela ARP" (uma linha de `ip neigh` e uma de `arp -a`, significado de REACHABLE/STALE/FAILED e "dinâmico"): o objetivo 4 e o resultado 2 pedem interpretar a tabela, e o original só listava os comandos, sem nenhuma saída. Os estados já apareciam no troubleshooting sem explicação.
  - Tabela "mesma sub-rede × externo" em `concept`, q3.5.7 e ex3.5.5: o resultado 1 ("identifica se ARP buscará o MAC do destino ou do gateway") só era exercitado no caso externo. Entram trocando itens, sem aumentar a quantidade.
  - Ressalva de proxy ARP nas `expectedIdeas` do mentor 3: evita que a resposta esperada fique errada em redes onde o gateway faz proxy ARP.

## 11. Depois
Palavras visíveis: 4502 → 4512 (+0,2%; inclui ~400 palavras movidas de campos invisíveis e ~250 de acréscimos justificados acima; sem eles, o saldo seria cerca de −14%) · Teoria visível: 2650 → 2443 (−8%) · Invisíveis: 703 → 32 (networkContext) · Duração: 90-125 min (T 112,5) → 90-125 min (T 104,8; −7%) · Quiz corrigido: sim (6 questões; 2 trocadas, distratores refeitos em 2, typo corrigido, gabarito redistribuído).
Checagem 11.7: os cortes brutos do `comparar` (17%) batem com a linguiça estimada (18%). As frases que sumiram (`--sumiram`) estão reescritas na nova versão ou removidas por duplicação/generalidade (itens 35–37 do inventário).
`validar`: OK, 0 erros; aviso "ids de quiz originais ausentes: q3.5.4, q3.5.5" — intencional (trocadas por q3.5.8 e q3.5.7, com ids inéditos).
A `duration` não mudou porque a faixa recomendada da nova versão (90-125 min) coincide com a declarada; `estimatedStudyTimeMinutes` = 125.

## 12. Revisão humana
- Acréscimos técnicos novos: EtherType 0x0806, Operation 1/2, Target MAC zerado no Request, uma linha de saída de `ip neigh`/`arp -a` (Windows em pt-BR, "dinâmico") e os significados de REACHABLE/STALE/FAILED. Conferir se a explicação dos estados não se sobrepõe demais à aula 3.6 (cache ARP), que não pude ler.
- `lab.challenge`/`lab.solution` removidos por duplicarem o mentor 2 e o desafio. Quem conclui só pelo lab (`labMarkedDone`) continua com os 5 passos, a validação e a interpretação, mas não monta a matriz de diagnóstico. Confirmar se isso é aceitável.
- Mentor 3 menciona proxy ARP como exceção, sem explicá-lo; conferir se a 3.6 ou outra aula do módulo trata do tema.

```json
{
  "id": "3.5", "modulo": "m03", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "ARP: transformando IPv4 em MAC na rede local",
  "duracao_declarada": "90-125 min", "T_original_min": 112.5, "duracao_nova": "90-125 min", "T_nova_min": 104.8, "duracao_nova_estimated_max": 125,
  "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 18, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 7, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4502, "palavras_visiveis_depois": 4512,
  "palavras_invisiveis_antes": 703, "palavras_invisiveis_depois": 32,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "MANTER", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "ENXUGAR", "devsecopsExample": "FUNDIR:cloudExample",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals",
    "deepDive": "MOVER:summary/concept", "commonMistakes": "MOVER:concept",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Acréscimos técnicos novos (EtherType 0x0806, Operation 1/2, Target MAC zerado, exemplo de saída ip neigh/arp -a e estados REACHABLE/STALE/FAILED) — conferir sobreposição com a aula 3.6.",
    "lab.challenge/lab.solution removidos (duplicavam mentor 2 e desafio); quem conclui só pelo lab não monta a matriz de diagnóstico.",
    "Mentor 3 cita proxy ARP como exceção sem explicá-lo; conferir se outra aula do módulo trata do tema."
  ]
}
```
