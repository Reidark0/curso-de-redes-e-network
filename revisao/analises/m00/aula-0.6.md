# Aula 0.6 — Latência, largura de banda e throughput
Tipo: fundamental · Duração declarada: 75-105 min · Palavras visíveis / invisíveis (antes): 5791 / 673

## 1. Duração
T pela fórmula = 119,7 min (teoria 26,1, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 31,5)
Veredito: SUBESTIMADA — M = 90 min < 0,8×T (95,8 min). O `lab.estimatedTimeMinutes` original (105 min) era igual à duração da aula inteira e implausível para 5 passos leves (ping, traceroute, curl, tabela); a ferramenta usou a alternativa de 31,5 min. A divisão teoria/prática (24% de leitura) é adequada para uma aula fundamental com lab de comandos.

## 2. Encheção de linguiça
Nível: BAIXA (~12%). Evidências:
- `history`: evolução genérica sem mecanismo ("Desde as primeiras redes, desempenho não foi apenas uma questão de 'passar dados'"; tabela "Época/cenário" com "Observabilidade é indispensável").
- `evolution`: repete history ("A forma de medir desempenho evoluiu junto com as redes… Primeiro, bastava saber se havia link"); só a lista de ferramentas e a tabela de métricas tinham valor.
- `motivation` repete as definições do `concept` ("Latência é tempo de resposta. Largura de banda é capacidade…") e o parágrafo de segurança repete `securityExample`.
- `problem`: analogia da avenida a 2.000 km duplica `analogy`; callout "Erro comum: comprar mais banda" repetido em `summary` e `commonMistakes`.
- `analogy`: limite da analogia em 3 frases.
- `devsecopsExample`: frases genéricas ("O pipeline não é 'só código'", "Isso conecta redes com SRE, observabilidade, CI/CD, IaC e segurança").
- `cloudExample`: "Uma arquitetura boa não é apenas rápida; ela é previsível, observável, segura e financeiramente compreendida."
- Lab: frase-padrão de 56 aulas no passo 5 ("Produza o artefato indicado na instrução do passo…") e safetyNote de cloud ("Em cloud real, remova os recursos…", 48 aulas) num lab local sem recursos cloud.
- Quiz: distratores absurdos ("Tamanho do monitor", "Teclado com defeito", "Unicode mal configurado", "A largura de banda é infinita").
- Campos invisíveis com conteúdo útil: `deepDive` (367 palavras: mentalModel, limitações das ferramentas, impactos) e `commonMistakes` (137).

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: definições corretas e contrastadas (quanto caberia × quanto passou × quanto demorou), componentes da latência (propagação, transmissão, processamento, fila), efeito da perda em TCP × UDP, exemplo 500 Mbps = 62,5 MB/s teóricos, jogo × backup, caso ERP filial/VPN, tabela de riscos de segurança, troubleshooting com comandos Windows/Linux/Cisco e árvore de decisão, lab executável com curl -w por fase.
Lacunas: os componentes da latência não tinham nenhuma ordem de grandeza (sem números de propagação ou transmissão), o que deixava o objetivo 2 ("por que alta banda ainda parece lenta") sem demonstração concreta; "janela TCP" aparecia sem explicação da relação throughput ≤ janela ÷ RTT; bufferbloat estava só no glossário e nas tags; baseline só no `deepDive`. Lacunas preenchidas de forma curta em `internals` e `architecture`.
Erros técnicos: nenhum relevante. `lab.labType` = "cloud" num lab local (ver Revisão humana).

## 4. Aproveitamento
BOM — cerca de 95% do T original (≈ 114 de 119,7 min) ensina ou pratica os objetivos; a linguiça está concentrada em ~650 palavras de teoria (≈ 5 min) e em distratores triviais. Contra a duração declarada (90 min) o resultado é o mesmo, porque a declarada estava abaixo do tempo realmente exigido.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~0%. O T é dominado por prática (exercícios, desafio, lab = 74 min) que cobre os objetivos; a teoria cortável vale ~5 min (< 15%), e o conteúdo movido dos campos invisíveis e as lacunas preenchidas compensam o corte.

## 6. Explicação mais direta
SIM — (a) `motivation` passa a apresentar as métricas em uma frase e não repete as definições; (b) a tabela métrica × "não prova sozinha" sai de `evolution` e vai para `concept`, logo após a definição; (c) os quatro componentes da latência viram tabela com ordem de grandeza em `internals`; (d) as ferramentas e seus limites (prosa de `evolution` + `deepDive.limitations`) viram uma tabela em `architecture`; (e) history/evolution viram 1 frase em `problem`.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantido o sintoma "rede lenta" e o problema real; cortadas definições repetidas do concept e parágrafo de segurança que repetia securityExample (resumido em 1 frase). |
| history | FUNDIR:problem | Só a ideia "taxa nominal × resultado útil desde modems/Ethernet compartilhada; distância com a internet; muitos saltos em cloud" ajuda; virou 1 frase em problem. |
| problem | ENXUGAR | Lista de 6 sintomas mantida; analogia das estradas fundida em analogy; callout "erro comum" movido para Erros comuns no concept. |
| evolution | MOVER:concept,architecture | Tabela de métricas → concept; lista de ferramentas → tabela de ferramentas em architecture; texto histórico removido. |
| concept | ENXUGAR | Definições mantidas; recebe tabela de métricas (de evolution) e callout "Erros comuns" (de commonMistakes). |
| internals | MANTER | Mecanismo mantido; acrescentados ordem de grandeza dos componentes da latência, exemplo de requisições em sequência, bufferbloat e janela TCP ÷ RTT (lacunas dos objetivos 2 e 3). |
| architecture | ENXUGAR | Parágrafo inicial que repetia a lista foi fundido nela; recebe baseline e tabela de ferramentas/limites (evolution + deepDive.limitations). |
| analogy | ENXUGAR | Analogia boa; recebe a imagem avenida/rua de problem; limite em 1 frase. |
| simpleExample | MANTER | Concreto (500 Mbps → 62,5 MB/s; jogo × backup). |
| enterpriseExample | MANTER | Caso ERP específico; só ajustes de frase. |
| cloudExample | ENXUGAR | Mantidos região, etapas e custo de egress/NAT; recebe deepDive.financialImpact; frase genérica final cortada. |
| devsecopsExample | ENXUGAR | Reduzido aos exemplos específicos (dependências externas, RTT somado entre microserviços, egress de scans) e ao que medir. |
| securityExample | ENXUGAR | Tabela de riscos mantida (+ linha "túnel não autorizado", que estava na prosa); parágrafo repetido cortado; limite ético em 1 frase. |
| diagram | MANTER | Correto e legível; só o h2 sem número. |
| labIntro | REMOVER | Invisível; ritual. |
| exercisesIntro | REMOVER | Invisível; ritual. |
| challengeIntro | REMOVER | Invisível; ritual. |
| solutionIntro | REMOVER | Invisível; ritual. |
| summary | ENXUGAR | 5 bullets; deepDive.mentalModel vira a primeira linha; "Uso real" (lista de contextos) trocado por "Como medir". |
| nextTheme | ENXUGAR | 1 frase coerente com 0.7 "O que é um protocolo". |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary,architecture,cloudExample,security | mentalModel → summary; limitations/whenNotToUse → tabela de ferramentas; financialImpact → cloudExample; securityImpact (loops/broadcast) → security.vulnerabilities; operationalImpact (baseline) → architecture e security. Campo removido. |
| commonMistakes | MOVER:concept | Os 4 erros viraram o callout "Erros comuns" no concept. Campo removido. |
| security | ENXUGAR | Fundido "registrar métricas antes de mudanças" no baseline; "limites éticos" fundido na má prática de teste sem autorização; acrescentada prática de retenção/privacidade de logs (de deepDive). |
| troubleshooting | MANTER | Comandos corretos, campos preenchidos, árvore de decisão específica. |
| lab | ENXUGAR | Passos e comandos mantidos; estimatedTimeMinutes 105 → 30; safetyNotes reduzidas a 3 (cortada a nota de cloud); passo 5 com tarefa específica no lugar da frase-padrão; sintoma "Ping tem perda, mas Wi‑Fi está fraco" corrigido. |
| quiz | MANTER | 6 questões mantidas (ids e ordem das opções preservados), distratores absurdos trocados por plausíveis em q0.6.1–q0.6.5; +2 questões (q0.6.7 cálculo de RTT em sequência, q0.6.8 asteriscos no traceroute). |
| flashcards | MANTER | 6 mantidos; +fc0.6.7 (componentes da latência). |
| mentorQuestions | MANTER | 3 perguntas de raciocínio adequadas. |
| exercises | MANTER | 4 exercícios com expectedAnswer. |
| challenge | MANTER | Cenário, tarefas, restrições e rubrica de 100 pontos coerentes. |
| commentedSolution | MANTER | Raciocínio, passos e respostas erradas comuns específicos. |
| glossary | MANTER | Todos os termos usados (bufferbloat agora aparece em internals). |
| references | MANTER | Internas e documentação oficial de comandos. |
| linksToOtherCourses | MANTER | Reais e pertinentes. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | "Rede lenta" é sintoma, não diagnóstico; esconde fenômenos diferentes | MANTIDO | motivation; mentor 1 |
| 2 | Caso link 1 Gbps + latência até região cloud, fila no proxy, perda na VPN | MANTIDO | motivation (callout) |
| 3 | Métricas variam de forma independente (muita banda + latência alta; bom teste + jitter/perda) | MANTIDO | motivation |
| 4 | Exfiltração = throughput de saída; DoS = perda/fila/latência | MANTIDO | motivation; securityExample |
| 5 | Taxa nominal × resultado útil desde modems/linhas seriais/Ethernet compartilhada (disputa pelo meio) | MANTIDO | problem |
| 6 | Requisição moderna atravessa Wi‑Fi, firewall, proxy, VPN, CDN, LB, WAF, API gateway, banco; visão ponta a ponta | MANTIDO | problem |
| 7 | Seis sintomas: latência alta, banda insuficiente, throughput baixo, perda, jitter, fila | MANTIDO | problem |
| 8 | Definições formais de latência/RTT, largura de banda, throughput | MANTIDO | concept (definition-box); glossary; flashcards |
| 9 | "Quanto caberia / quanto passou / quanto demorou" | MANTIDO | concept |
| 10 | Link de 1 Gbps não garante resposta rápida | MANTIDO | concept |
| 11 | Jitter: latência estável moderada > latência oscilante para vídeo | MANTIDO | concept |
| 12 | Perda em TCP → retransmissão/queda de throughput; em UDP → áudio picotado, artefatos, telemetria incompleta | MANTIDO | concept; lab.questions |
| 13 | Tabela métrica × o que mede × boa para × não prova sozinha | MANTIDO | concept (movida de evolution) |
| 14 | Mais banda só resolve saturação; não resolve distância, rota, perda, DNS, proxy, banco, autenticação | MANTIDO | concept (Erros comuns); flashcard fc0.6.6; quiz q0.6.6 |
| 15 | Erros comuns: chamar tudo de velocidade; ping baixo ≠ app rápida; ignorar jitter | MANTIDO | concept (Erros comuns, de commonMistakes) |
| 16 | Etapas: aplicação → encapsulamento (headers aumentam tamanho) → meio → intermediários → destino → volta | MANTIDO | internals |
| 17 | Latência = propagação + transmissão + processamento + fila, e do que cada uma depende | MANTIDO | internals (tabela); summary; fc0.6.7 |
| 18 | Fatores do throughput (overhead, janela TCP, perda, congestionamento, CPU, criptografia, inspeção, paralelismo…) | MANTIDO | internals |
| 19 | Download lento pode ser servidor, rota, firewall, Wi‑Fi, disco, antivírus, VPN, aplicação | MANTIDO | internals |
| 20 | Segmentos cliente/LAN/borda/WAN/cloud/observabilidade e o que cada um afeta | MANTIDO | architecture |
| 21 | Pergunta "onde a métrica piora?" | MANTIDO | architecture |
| 22 | Ferramentas: ping (RTT), traceroute (caminho), mtr (perda/latência por salto), curl (DNS/conexão/TLS/HTTP), iperf (vazão controlada), APM | MANTIDO | architecture (tabela, de evolution) |
| 23 | Limites: ping pode ser bloqueado/priorizado; traceroute aproximado; speedtest é cenário específico; throughput entre dois pontos não localiza o gargalo; métricas de cloud com amostragem/custo | MANTIDO | architecture (tabela, de deepDive.limitations) |
| 24 | Baseline por localidade, horário e aplicação | MANTIDO | architecture; security.goodPractices; lab.improvements |
| 25 | Analogia caixas/estrada (+ avenida distante × rua próxima) | MANTIDO | analogy |
| 26 | 500 Mbps = 62,5 MB/s teóricos; cinco motivos para download menor | MANTIDO | simpleExample |
| 27 | Jogo precisa de latência/jitter baixos; backup precisa de throughput sustentado/upload | MANTIDO | simpleExample; mentor 3 |
| 28 | Caso ERP matriz/filial/VPN, decomposição por trecho | MANTIDO | enterpriseExample |
| 29 | Região cloud afeta latência; VPN, NAT GW, LB, private endpoint, WAF somam etapas | MANTIDO | cloudExample |
| 30 | Custo: egress, NAT por hora e volume, logs; diagnóstico ruim leva a compra desnecessária | MANTIDO | cloudExample (+ deepDive.financialImpact) |
| 31 | DevSecOps: dependências externas, chamadas entre microserviços/sidecars/mesh, tráfego de scans; o que medir | MANTIDO | devsecopsExample |
| 32 | Riscos: exfiltração, DoS, túnel não autorizado, proxy/firewall saturado, VPN mal dimensionada (com mitigação) | MANTIDO | securityExample (tabela) |
| 33 | Limite ético para testes de carga/saturação/varredura | MANTIDO | securityExample (callout); security.badPractices; lab.safetyNotes; challenge.constraints |
| 34 | DoS operacional acidental (backups, scans, pipelines, loop/broadcast) | MANTIDO | security.vulnerabilities |
| 35 | Comandos Windows/Linux/Cisco IOS e árvore de decisão | MANTIDO | troubleshooting |
| 36 | Lab: ping, ping por nome, traceroute, curl -w / Test-NetConnection, tabela de hipóteses; asteriscos ≠ perda | MANTIDO | lab |
| 37 | Mental model: lentidão é sintoma composto; localizar o trecho | MANTIDO | summary (de deepDive.mentalModel) |
| 38 | Logs de rede exigem retenção, custo e privacidade | MANTIDO | security.goodPractices (de deepDive.securityImpact) |
| 39 | Bufferbloat | MANTIDO | internals (antes só no glossário); glossary |
| 40 | Tabela histórica "Época/cenário" | REMOVIDO | duplicado: a única ideia útil (taxa nominal × útil, distância, ponta a ponta) está em problem |
| 41 | "Uso real: VPN, Wi‑Fi, cloud, APIs, backup, vídeo, SIEM, incidentes" (summary) | REMOVIDO | duplicado: lista de contextos já coberta pelos exemplos e learningOutcomes |
| 42 | safetyNote "Em cloud real, remova os recursos…" | REMOVIDO | fora do escopo: lab local, sem recursos cloud |

Acrescentados (necessários aos objetivos 2 e 3): ordem de grandeza de propagação (~5 ms/1.000 km na fibra) e transmissão (1.500 bytes: 12 µs em 1 Gbps, 1,2 ms em 10 Mbps); 20 requisições × 100 ms = 2 s com qualquer banda; throughput por conexão ≤ janela ÷ RTT (64 KB / 100 ms ≈ 5,2 Mbps) e escala de janela.

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar latência, largura de banda e throughput | concept (definição, perguntas-chave, tabela); analogy; glossary; flashcards 1–3; quiz q0.6.1–q0.6.2; ex0.6.1 |
| Explicar por que alta largura de banda ainda pode parecer lenta | motivation (caso 1 Gbps); concept; internals (componentes, requisições em sequência, janela ÷ RTT); quiz q0.6.6–q0.6.7; lab.challenge |
| Relacionar perda, jitter, filas, congestionamento e overhead com a experiência | problem (sintomas); concept (jitter, perda TCP/UDP); internals (fila, bufferbloat, overhead); simpleExample; quiz q0.6.3; ex0.6.3 |
| Usar comandos básicos para coletar evidências | architecture (tabela de ferramentas); troubleshooting.commands; lab (5 passos); quiz q0.6.4, q0.6.8 |
| Conectar métricas com cloud, DevSecOps, observabilidade, segurança e incidentes | cloudExample; devsecopsExample; securityExample; security; ex0.6.4; quiz q0.6.5; challenge |

## 10. O que mudou na nova versão
- `history` e `evolution` removidos; o que tinham de útil foi para `problem` (1 frase), `concept` (tabela de métricas) e `architecture` (tabela de ferramentas).
- `internals` ganhou a tabela "Do que a latência é feita" com ordem de grandeza, o exemplo das 20 requisições, bufferbloat e a relação janela TCP ÷ RTT.
- `commonMistakes` virou o callout "Erros comuns" no `concept`; `deepDive` foi distribuído (summary, architecture, cloudExample, security) e removido; 4 intros invisíveis removidos.
- `motivation`, `analogy`, `devsecopsExample`, `securityExample`, `cloudExample` e `nextTheme` enxugados; h2 sem número.
- Quiz: distratores absurdos trocados por plausíveis (q0.6.1–q0.6.5), ordem das opções e ids preservados; +q0.6.7 (resposta no índice 3) e +q0.6.8 (índice 1). +fc0.6.7.
- Lab: estimatedTimeMinutes 105 → 30; safetyNotes de 5 para 3 (removida a nota de cloud); passo 5 com tarefa concreta; sintoma de troubleshooting corrigido.
- `duration` 75-105 → 100-145 min; `estimatedStudyTimeMinutes` 105 → 145; subtitle enxugado.

## 11. Depois
Palavras visíveis: 5791 → 6042 (+4%; cortes brutos 11%, acréscimos vindos de deepDive/commonMistakes, das lacunas de internals e de 2 questões novas) · Duração: 75-105 min → 100-145 min (T 119,7 → 120 min) · Quiz corrigido: sim (8 questões)

Aviso do `validar`: "gabarito concentrado {0:6, 1:1, 3:1}". Justificativa: as 6 questões originais tinham todas a resposta no índice 0 e não podem ser reordenadas (11.6b, progresso salvo); as 2 questões novas usam os índices 3 e 1.

## 12. Revisão humana
- `lab.labType` = "cloud", mas o lab é local (ping/traceroute/curl no próprio computador). Mantido por ser metadado de valor controlado; confirmar se deve virar "local".
- Distratores trocados em questões mantidas (q0.6.1–q0.6.5), mesma posição da resposta correta (índice 0) e mesma ordem: uma resposta errada salva continua errada, mas passa a mostrar outro texto.
- Números acrescentados em `internals` (luz na fibra ~200.000 km/s ≈ 5 ms/1.000 km; 1.500 bytes = 12 µs a 1 Gbps e 1,2 ms a 10 Mbps; janela 64 KB / RTT 100 ms ≈ 5,2 Mbps; "fila é a principal fonte de jitter"): são valores padrão de livro-texto, conferidos por conta, mas não estavam no original.
- Gabarito concentrado no índice 0 nas 6 questões originais (não reordenadas para preservar o progresso salvo).

```json
{
  "id": "0.6", "modulo": "m00", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Latência, largura de banda e throughput",
  "duracao_declarada": "75-105 min", "T_original_min": 119.7, "duracao_nova": "100-145 min", "T_nova_min": 120, "duracao_nova_estimated_max": 145,
  "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "BAIXA", "linguica_pct": 12, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 0, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 5791, "palavras_visiveis_depois": 6042,
  "palavras_invisiveis_antes": 673, "palavras_invisiveis_depois": 49,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "MOVER:concept,architecture",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary,architecture,cloudExample,security", "commonMistakes": "MOVER:concept",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 8, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.labType = 'cloud' num lab local; confirmar se deve ser 'local'",
    "Distratores trocados em q0.6.1–q0.6.5 sem mudar a ordem nem a resposta (índice 0)",
    "Números acrescentados em internals (propagação ~5 ms/1.000 km, transmissão 12 µs/1,2 ms, janela 64 KB/100 ms ≈ 5,2 Mbps) não estavam no original",
    "Gabarito das 6 questões originais concentrado no índice 0 (não reordenado para preservar progresso)"
  ]
}
```


> **Nota do orquestrador (D20):** depois da análise, o `quiz_embaralhar.js` redistribuiu a posição da resposta correta (gabarito antes concentrado no índice 0, agora 2/2/2/2). O texto das questões e opções não mudou. O item "gabarito concentrado" da revisão humana está resolvido.
