# Aula 1.3 — Tipos de rede: PAN, LAN, WLAN, CAN, MAN, WAN e SAN
Tipo: intermediária (conceitual, sem lab) · Duração declarada: 65-95 min · Palavras visíveis / invisíveis (antes): 3736 / 610

## 1. Duração
T pela fórmula = 80,8 min (teoria 18,8, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0). Faixa recomendada: 70-95 min.
Veredito: ORGANIZADA — M = 80 está dentro de [0,8×T ; 1,2×T]. A divisão faz sentido para uma aula conceitual sem lab: 27% de leitura e o resto em exercícios de classificação, diagnóstico e no desafio de planejamento. A aula não tem lab, mas `progressRules.oneOf` aceita `exerciseDone`/`practicalExerciseDone`, e há 4 exercícios.

## 2. Encheção de linguiça
Nível: BAIXA (~13%). Evidências:
- `history`: evolução genérica ("As redes começaram pequenas…", "A internet ampliou essa conectividade para escala global") e o fecho "Elas não existem para decorar nomes", que repete motivation e summary.
- `evolution`: o meta-texto "A tabela abaixo mostra a evolução conceitual." A tabela em si é o melhor conteúdo da aula, mas está na seção errada (não é evolução, é a comparação dos tipos).
- `concept`: o `definition-box` repete, em prosa, a mesma lista de siglas da tabela de `evolution` e de `summary`.
- `devsecopsExample`: genérico ("Observabilidade deve separar falhas de aplicação de falhas de conectividade entre redes"; o runner de CI/CD "atravessa redes diferentes").
- `analogy`: limite da analogia com 3 frases ("A analogia ajuda no alcance, mas não substitui o funcionamento técnico").
- `securityExample`: o parágrafo de abertura repete a tabela logo abaixo e `deepDive.securityImpact` (invisível).
- `motivation` + `problem`: "classificar o tipo de rede ajuda a tomar decisões…" e "Sem essa classificação, uma equipe pode aplicar solução errada" dizem a mesma coisa.
- `security`: `goodPractices` × `hardening` ("Separar redes por função" / "Segmentar por função"; "Usar criptografia em links WAN" / "Usar criptografia em links externos") e `badPractices` como o inverso das boas práticas ("Conectar filiais sem criptografia", "Tratar Wi-Fi de visitantes como se fosse confiável").
- `mentorQuestions[1]` (local funciona, aplicação em outra cidade não) pergunta o mesmo que `ex1.3.2` (imprime local, cloud não).
- Quiz com distratores triviais ("LAN não usa protocolos", "Monitor local", "Fone Bluetooth", "Cabo RJ-45 físico obrigatório") e flashcards LAN/WLAN que copiam as questões q1.3.1/q1.3.2.
- Frase repetida da lista: só a moldura "Esta aula não possui laboratório independente…" (em `labIntro`, invisível).
- Campos invisíveis com conteúdo valioso: `commonMistakes` (WLAN ≠ internet, latência de WAN, SAN × NAS, cloud dispensa redes) e `deepDive.operationalImpact`/`financialImpact` (o único lugar com custo por tipo, que é um objetivo da aula).

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: a tabela tipo × alcance × finalidade × limitação; a preocupação central de cada tipo (internals) e as hipóteses de troubleshooting por tipo; a visão empilhada da arquitetura corporativa (borda, distribuição, interconexão, datacenter, cloud); a tabela de risco × mitigação por tipo; a árvore de decisão (Wi-Fi sem gateway / gateway sem internet / filial lenta / storage lento) e os comandos com interpretação; o desafio com restrições e rubrica.
Lacunas: custo e operação por tipo (objetivo 2) só existiam no `deepDive` invisível; os erros comuns específicos (latência de WAN, SAN × NAS) também estavam invisíveis; CAN e MAN não eram cobradas em nenhuma questão nem flashcard.
Erros técnicos: o `simpleExample` dizia que um NAS doméstico "pode [formar] uma pequena rede de armazenamento", o que contradiz o próprio `commonMistakes` da aula (NAS é serviço de arquivos na rede comum). Corrigido. "express route/direct connect" foi grafado com os nomes corretos dos produtos (ExpressRoute/Direct Connect).

## 4. Aproveitamento
BOM — cerca de 88% do T original (80,8 min) vai para os objetivos. As perdas são a leitura de history/evolution/devsecops/repetições (~2,5 min), a pergunta de mentor duplicada (~2 min), e o quiz e os flashcards triviais (~1-2 min). A duração declarada (M = 80) coincide com o T, então a conclusão é a mesma contra ela.

## 5. Pode ser mais curta?
NÃO — redução prevista: 0%. A linguiça está concentrada na teoria (18,8 min), e o tempo é dominado por exercícios (24) e pelo desafio (20), que exercitam os objetivos. Cortar 15% exigiria remover prática ou itens do inventário. A teoria foi enxugada (~340 palavras de redundância), mas o espaço foi ocupado pelo conteúdo útil que estava invisível (erros comuns, operação e custo) e por duas questões novas (CAN/MAN e diagnóstico), o que deixou o T em 82,7 min.

## 6. Explicação mais direta
SIM — (a) a tabela de comparação saiu de "Evolução" (Contexto) e foi para o início de "Conceito", no lugar do `definition-box` em prosa; (b) history virou 1 frase no início de `problem`, que agora tem duas listas curtas (objetivo de cada tipo; cinco dimensões de classificação); (c) motivation passou de 2 parágrafos + callout para 1 parágrafo + callout; (d) operação e custo viraram uma tabela em `architecture` em vez de listas invisíveis; (e) os erros comuns viraram um callout no conceito.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | 1 parágrafo + callout; fundida a frase de "decisões concretas" que se repetia em problem |
| history | FUNDIR:problem | evolução genérica; ficou só a frase que explica por que as siglas existem (escala crescente) |
| problem | ENXUGAR | mantidos os objetivos por tipo e as 5 dimensões (alcance, meio, controle, risco, custo), em listas |
| evolution | MOVER:concept | a tabela é o núcleo comparativo; o meta-texto saiu |
| concept | ENXUGAR | definição + tabela (veio de evolution) + "não são caixas rígidas" + callout de erros comuns; o definition-box duplicado saiu |
| internals | MANTER | mecanismo por tipo e hipóteses de troubleshooting; só frases mais curtas |
| architecture | MANTER | visão em camadas; recebeu a tabela de operação e custo (vinda do deepDive) |
| analogy | ENXUGAR | analogia boa; limite em 1 frase |
| simpleExample | MANTER | concreto; corrigida a frase sobre NAS |
| enterpriseExample | ENXUGAR | 2 parágrafos fundidos em 1; requisitos de segurança específicos mantidos |
| cloudExample | MANTER | objetivo 4; recebeu a frase de IaC/policy as code do devsecops |
| devsecopsExample | FUNDIR:cloudExample | genérico; só o ponto de IaC + policy as code tinha relação com o tema |
| securityExample | ENXUGAR | tabela mantida; o parágrafo que a repetia virou 1 frase |
| diagram | MANTER | correto o bastante e legível; ids e title/desc preservados (ver Revisão humana) |
| labIntro | REMOVER | invisível; moldura "Prática equivalente" |
| exercisesIntro | REMOVER | invisível |
| challengeIntro | REMOVER | invisível |
| solutionIntro | REMOVER | invisível |
| summary | ENXUGAR | 5 bullets; o primeiro é o mentalModel do deepDive; incluídos coexistência e erros comuns |
| nextTheme | ENXUGAR | 1 frase coerente com a 1.4 "Topologias físicas e lógicas" |
| lab | — | não existe; progressRules não exige lab |
| quiz | ENXUGAR | normalizado; distratores triviais trocados (q2, q3, q4, q5); q6 virou SAN × NAS; +q1.3.7 (diagnóstico) e +q1.3.8 (CAN × MAN); gabarito embaralhado |
| flashcards | ENXUGAR | fc1.3.2 (LAN) e fc1.3.3 (WLAN) copiavam o quiz: trocados por fc1.3.7 (CAN × MAN) e fc1.3.8 (Wi-Fi ≠ internet) |
| mentorQuestions | ENXUGAR | a pergunta 2 repetia o ex1.3.2: trocada por latência de WAN/chatty (vinda de commonMistakes) |
| exercises | MANTER | 4, com expectedAnswer |
| challenge | MANTER | cenário, restrições e rubrica claros |
| commentedSolution | MANTER | passos e respostas erradas comuns específicos |
| glossary | MANTER | SAN: longDefinition com bloco × NAS |
| security | FUNDIR:securityExample | goodPractices sem duplicar hardening; badPractices sem os inversos; vulnerabilities, monitoring e detectionIdeas mantidos |
| troubleshooting | MANTER | comandos corretos com interpretação e árvore de decisão |
| references | MANTER | reais |
| linksToOtherCourses | MANTER | — |
| networkContext | MANTER | metadado |
| deepDive | MOVER:summary/concept/architecture | mentalModel → summary; whenNotToUse → callout de erros comuns; operational/financialImpact → tabela em architecture; limitations, whenToUse, securityImpact e keyTerms duplicavam conteúdo visível |
| commonMistakes | MOVER:concept | callout "Erros comuns" no conceito; latência de WAN também na pergunta 2 do mentor |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Definição de tipo de rede (alcance, finalidade, meio, domínio administrativo) | MANTIDO | concept, 1º parágrafo |
| 2 | PAN: pessoa/poucos metros, periféricos, pareamento, baixo consumo | MANTIDO | concept (tabela), internals, problem |
| 3 | LAN: Ethernet, switches, VLAN, broadcast, gateway | MANTIDO | concept (tabela), internals |
| 4 | WLAN = LAN sem fio; rádio, AP, canal, interferência, roaming, densidade | MANTIDO | concept (tabela), internals, quiz q1.3.2 |
| 5 | CAN: campus, backbone, fibra, administração central | MANTIDO | concept (tabela), architecture, q1.3.8, fc1.3.7 |
| 6 | MAN: cidade, dependência de operadora, custo de link | MANTIDO | concept (tabela), q1.3.8, fc1.3.7 |
| 7 | WAN: longa distância, latência, SLA, roteamento, operadora | MANTIDO | concept (tabela), internals, architecture |
| 8 | SAN: storage, desempenho, isolamento, zoning, paths, multipath | MANTIDO | concept, internals, securityExample, troubleshooting |
| 9 | Objetivo prioritário de cada tipo (LAN latência, WAN distância, WLAN mobilidade…) | MANTIDO | problem, 1ª lista |
| 10 | 5 dimensões: alcance, meio, controle, risco, custo | MANTIDO | problem, 2ª lista |
| 11 | Erro de aplicar a solução errada (Wi-Fi como cabo, WAN como LAN…) | MANTIDO | problem, último parágrafo |
| 12 | História: siglas surgem com a escala da comunicação | MANTIDO | problem, 1ª frase (resumida) |
| 13 | Categorias não são rígidas / coexistem | MANTIDO | concept, architecture, summary |
| 14 | Hipóteses de troubleshooting por tipo | MANTIDO | internals, último parágrafo |
| 15 | Camadas da arquitetura (borda, distribuição, interconexão, datacenter, cloud) | MANTIDO | architecture |
| 16 | Servidor de virtualização em LAN de gerência, produção e SAN ao mesmo tempo | MANTIDO | architecture |
| 17 | Operação exigida por tipo (deepDive.operationalImpact) | MANTIDO (movido) | architecture, tabela |
| 18 | Custo por tipo (deepDive.financialImpact) | MANTIDO (movido) | architecture, tabela |
| 19 | Analogia de transporte | MANTIDO | analogy |
| 20 | Exemplo doméstico PAN/LAN/WLAN/WAN; "a internet caiu" é um domínio específico | MANTIDO | simpleExample |
| 21 | NAS doméstico ≠ SAN | MANTIDO (corrigido) | simpleExample |
| 22 | Requisitos de segurança da empresa média (visitantes, firewall WAN, SAN não roteável, SIEM) | MANTIDO | enterpriseExample |
| 23 | VPC/VNet, subnets, peering, VPN/links dedicados como WAN híbrida, private endpoints | MANTIDO | cloudExample, q1.3.5 |
| 24 | Cloud não dispensa arquitetura de rede (DNS privado, custo de tráfego, inspeção) | MANTIDO | cloudExample, concept (erros comuns) |
| 25 | IaC declara a rede; policy as code bloqueia exposição pública | MANTIDO | cloudExample |
| 26 | Runner de CI/CD acessa registry, cluster, cofre por redes diferentes | REMOVIDO | genérico, sem ligação com os objetivos (devsecopsExample) |
| 27 | Observabilidade separa falha de app × conectividade | REMOVIDO | genérico, fora do escopo da aula |
| 28 | Tabela risco × impacto × mitigação por tipo (WPA2/WPA3 Enterprise, rogue AP, zoning…) | MANTIDO | securityExample |
| 29 | Erro comum: WLAN ≠ internet | MANTIDO (movido) | concept (callout), fc1.3.8, q1.3.7 |
| 30 | Erro comum: WAN não tem latência de LAN (chatty, síncrono) | MANTIDO (movido) | concept (callout), mentor 2 |
| 31 | Erro comum: SAN × NAS (bloco × arquivo) | MANTIDO (movido) | concept (callout), q1.3.6, glossary |
| 32 | Erro comum: cloud dispensa redes | MANTIDO (movido) | concept (callout) |
| 33 | Não supor que link entre sites é internet pública; sem fio não é inseguro por definição | MANTIDO (movido) | concept (callout) |
| 34 | Modelo mental (alcance, finalidade, controle, meio, risco, evidência) | MANTIDO (movido) | summary, 1º bullet; diagrama |
| 35 | Comandos ipconfig/ping/tracert, ip addr/ip route/traceroute, show ip int brief/vlan/route | MANTIDO | troubleshooting |
| 36 | Árvore de decisão (Wi-Fi sem gateway, gateway sem internet, filial lenta, storage) | MANTIDO | troubleshooting |
| 37 | NAT não substitui firewall; SSID ≠ isolamento; conectividade ≠ autorização | MANTIDO | security.commonErrors, mentor 3 |
| 38 | Vulnerabilidades: rede plana, WLAN de visitantes, exposição em cloud | MANTIDO | security.vulnerabilities |
| 39 | Monitoramento e detecção (logs por zona, NetFlow, security group, IaC) | MANTIDO | security.monitoring, detectionIdeas |
| 40 | Hardening: portas não usadas, menor privilégio, gerência, rotas públicas | MANTIDO | security.hardening (o que duplicava goodPractices foi fundido) |
| 41 | Topologias citadas no próximo tema (barramento lógico) | REMOVIDO | só o item "barramento lógico" da enumeração; é assunto da 1.4 |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar PAN, LAN, WLAN, CAN, MAN, WAN e SAN pelo alcance e finalidade | concept (tabela), internals, summary, quiz q1/q2/q3/q8, flashcards, ex1.3.1 |
| Relacionar cada tipo com custos, riscos, operação e troubleshooting | problem (dimensões), architecture (tabela de operação e custo), securityExample, security, internals e troubleshooting, ex1.3.2, q1.3.7 |
| Entender como os tipos coexistem numa arquitetura corporativa | architecture, enterpriseExample, concept, desafio e solução comentada |
| Reconhecer equivalentes em cloud e ambientes híbridos | cloudExample, architecture (cloud), q1.3.5, ex1.3.4 |
| Evitar decisões ruins por decorar siglas | concept (callout de erros comuns), summary, mentor 1 e 2, commentedSolution.commonWrongAnswers |

## 10. O que mudou na nova versão
- A tabela comparativa saiu de "Evolução" e abre o Conceito; o definition-box em prosa, que a duplicava, saiu.
- history, evolution e devsecopsExample foram removidos (fundidos em problem, concept e cloudExample).
- commonMistakes e deepDive (invisíveis) viraram conteúdo visível: callout "Erros comuns" no conceito, tabela "Operação e custo por tipo" na arquitetura e o modelo mental no resumo.
- simpleExample: corrigida a afirmação sobre NAS doméstico. architecture: ExpressRoute/Direct Connect.
- Quiz: formato padrão; distratores triviais trocados; q1.3.6 virou SAN × NAS; novas q1.3.7 (diagnóstico Wi-Fi × WAN) e q1.3.8 (CAN × MAN); posição da resposta correta redistribuída (antes, todas as 8 em 0).
- Flashcards: fc1.3.2 e fc1.3.3, que copiavam o quiz, foram trocados por fc1.3.7 (CAN × MAN) e fc1.3.8 (Wi-Fi ≠ internet).
- Mentor: a pergunta 2, que duplicava o ex1.3.2, foi trocada por um diagnóstico de latência de WAN.
- security: goodPractices/hardening/badPractices sem duplicação.
- Removidos labIntro, exercisesIntro, challengeIntro e solutionIntro. Títulos h2 sem número.
- duration 65-95 → 70-100 min; estimatedStudyTimeMinutes 95 → 100.

## 11. Depois
Palavras visíveis: 3736 → 4085 (+9%; cortes brutos 489 = 13%, acréscimos brutos 838, sobretudo conteúdo movido de campos invisíveis e 2 questões novas) · Teoria visível: 2446 → 2437 · Invisíveis: 610 → 48 (só networkContext) · Duração: declarada 65-95 min → nova 70-100 min (T 80,8 → 82,7) · Quiz corrigido: sim (8 questões). `validar`: ok, sem erros nem avisos (o aviso "gabarito concentrado" foi resolvido com `quiz_embaralhar`).

## 12. Revisão humana
- O módulo m01 lista "lab-1.3" em `assessment.requiredLabs`, mas a aula não tem lab (e o `progressRules` da aula não exige um). A inconsistência está no módulo e não foi alterada.
- Diagrama: as setas encadeiam PAN→LAN→WLAN→CAN→MAN e ligam WAN→SAN, o que pode sugerir uma hierarquia ou que a SAN é alcançada pela WAN. Foi mantido sem mudança (é legível e não chega a estar errado); vale considerar redesenhá-lo.
- simpleExample: a frase "NAS… pode existir uma pequena rede de armazenamento" foi corrigida para "NAS doméstico é um serviço de arquivos dentro da LAN, não uma SAN", para ficar coerente com o commonMistakes da própria aula.
- Removido o exemplo DevSecOps do runner de CI/CD e da observabilidade (genérico). Só o ponto de IaC + policy as code foi para cloudExample.

```json
{
  "id": "1.3", "modulo": "m01", "tipo": "intermediária", "status": "CONCLUIDA",
  "titulo": "Tipos de rede: PAN, LAN, WLAN, CAN, MAN, WAN e SAN",
  "duracao_declarada": "65-95 min", "T_original_min": 80.8, "duracao_nova": "70-100 min", "T_nova_min": 82.7, "duracao_nova_estimated_max": 100, "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "BAIXA", "linguica_pct": 13, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 0, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 3736, "palavras_visiveis_depois": 4085,
  "palavras_invisiveis_antes": 610, "palavras_invisiveis_depois": 48,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "MOVER:concept",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "MANTER", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "MANTER", "devsecopsExample": "FUNDIR:cloudExample",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "quiz": "ENXUGAR", "flashcards": "ENXUGAR", "mentorQuestions": "ENXUGAR", "exercises": "MANTER",
    "challenge": "MANTER", "commentedSolution": "MANTER", "glossary": "MANTER", "security": "FUNDIR:securityExample",
    "troubleshooting": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER", "networkContext": "MANTER",
    "deepDive": "MOVER:summary/concept/architecture", "commonMistakes": "MOVER:concept"
  },
  "quiz_corrigido": true, "quiz_questoes": 8, "objetivos_cobertos": true,
  "revisao_humana": [
    "Módulo m01 lista lab-1.3 em requiredLabs, mas a aula não tem lab (inconsistência no módulo, não alterada).",
    "Diagrama: setas PAN→…→MAN e WAN→SAN podem sugerir hierarquia ou SAN via WAN; mantido, considerar redesenho.",
    "simpleExample: corrigida a afirmação de que um NAS doméstico forma uma pequena rede de armazenamento.",
    "Removido o exemplo DevSecOps do runner de CI/CD e da observabilidade (genérico); IaC + policy as code foi para cloudExample."
  ]
}
```
