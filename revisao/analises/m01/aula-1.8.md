# Aula 1.8 — Métricas: latência, jitter, perda, throughput e disponibilidade
Tipo: fundamental · Duração declarada: 80-115 min · Palavras visíveis / invisíveis (antes): 4970 / 782

## 1. Duração
T pela fórmula = 128,4 min (teoria 21,4, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 45)
Veredito: SUBESTIMADA — M = 97,5 min < 0,8×T (102,7 min). A divisão é coerente para uma aula fundamental com lab (19% de leitura; lab de 45 min plausível para 6 passos, alternativa da fórmula 36 min). O que falta é a duração declarada contar o tempo de prática.

## 2. Encheção de linguiça
Nível: BAIXA (~12%). Confere com os cortes brutos do `comparar` (553 palavras, 11%). Evidências (seção + trecho curto):
- `history`: "Hoje, redes corporativas precisam medir não só se algo funciona…", "Essa mudança é essencial para DevSecOps, SRE, SOC…" e a lista de ferramentas e práticas (SNMP, APM, "orçamento de erro") sem mecanismo. Só a virada "está conectado?" → "qualidade ponta a ponta" e o exemplo 80 ms × 900 ms ensinam algo.
- `evolution`: a tabela de fases (rede local → WAN → VPN → cloud → SOC) é história de mercado. O que tem valor (contadores de CRC/duplex, medição multiponto, "métrica isolada não prova causa") já está em `architecture`, `security` e `deepDive.limitations`.
- `motivation` × `concept` × `summary`: o 2º parágrafo da motivação ("Latência mede tempo. Jitter mede variação…") repete a `definition-box` do conceito, que por sua vez repete o `summary`.
- `securityExample` × `security`: a tabela (throughput de saída anormal, perda no firewall, disponibilidade intermitente) repete as três `vulnerabilities`, com as mesmas mitigações.
- `analogy`: o "Limite da analogia" tem 40 palavras listando retransmissão, buffers, NAT…
- `devsecopsExample`: o 2º parágrafo é genérico ("métricas também aparecem entre pods, services, ingress, egress gateways…").
- `architecture`: "A arquitetura correta de observabilidade combina métricas de rede com logs, traces…" (frase-padrão).
- `lab.steps[5].analysisTask`: "Produza o artefato indicado na instrução do passo e registre a evidência objetiva…" (aparece em 56 aulas); `lab.safetyNotes` com 5 itens que se sobrepõem a `prerequisites`; `lab.improvements` genéricos ("Criar planilha padrão de coleta").
- Quiz: distratores absurdos ("Unicode", "T568B", "Base64", "Hexadecimal", "UTF-8") e gabarito sempre na 1ª opção.

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: definições corretas e separadas das cinco métricas, com unidade e sintoma típico; composição da latência (transmissão, propagação, fila, processamento, inspeção); causas de perda e jitter; dependências do throughput (janela TCP, overhead, perda, criptografia); média × percentis; análise por camada; exemplos concretos (500 Mbps × Wi‑Fi do quarto, ERP da filial pela manhã, banco em outra região, runner de CI com timeout); comandos corretos com interpretação (ping -n/-c, tracert/traceroute, Test-NetConnection, curl -w com DNS/connect/TLS/TTFB, show interfaces/processes cpu sorted/ip route/logging); lab executável e seguro.
Lacunas (para os objetivos 1, 2 e 4): a aula não ensina a ler a saída do ping (mín/méd/máx, % de perda, `mdev`), não mostra uma conta de jitter nem diz o que é p95. O objetivo 2 ("muita banda e parece lenta") não tem exemplo numérico do limite janela/RTT. A conversão MB/s × Mbps fica só no `deepDive` invisível, a conta de disponibilidade (99,9% ≈ 43 min/mês) aparece só num exemplo do glossário e SLA não é definido em lugar nenhum.
Erros técnicos: nenhum relevante.

## 4. Aproveitamento
BOM — cerca de 84% do T original (≈108 de 128 min) vai para definição, mecanismo, exemplos concretos, comandos, lab, quiz e exercícios. Não ensinam: a leitura de history/evolution, as repetições entre motivação, problema, conceito e resumo, a moldura de segurança duplicada e o texto ritual do lab (~20 min). Contra a duração declarada (97,5 min), a conta fica distorcida, porque a declarada não cobre a prática.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~3% do T. A linguiça está quase toda na teoria, que é só 21 min do T. O tempo é dominado por lab, exercícios e desafio, que ficam.

## 6. Explicação mais direta
SIM — (a) `motivation`: cortar a lista de definições e deixar só o problema real; (b) `history` + `problem`: fundir em um parágrafo com o exemplo 80 ms × 900 ms; (c) `internals`: trocar a frase sobre médias por uma série de ping concreta (média × distribuição × jitter) e mostrar o limite janela/RTT com números; (d) `security`: uma única lista estruturada no lugar de exemplo + tabela + deepDive; (e) `deepDive.decisionTable` (invisível) vira ramos da `decisionTree` do troubleshooting.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantém o problema real (sistema financeiro, 1 Gbps, SOC); corta a lista de definições repetida no conceito. |
| history | FUNDIR:problem | Fica a virada "conectado?" → "qualidade ponta a ponta" e o exemplo 80 ms × 900 ms; o resto é história genérica. |
| problem | MANTER | Recebe a história em 2 frases; a lista "Sem medir…" liga cada métrica ao erro de diagnóstico. |
| evolution | REMOVER | Tabela de fases de mercado; o útil está em architecture (CRC, duplex), security (multiponto) e nos limites das ferramentas. |
| concept | MANTER | Definições e tabela; acrescenta a definição de largura de banda, que a aula usava sem definir. |
| internals | MANTER | Mecanismos intactos; acrescenta leitura da saída do ping, série com média/jitter/p95, janela ÷ RTT, tabela de disponibilidade, SLA × SLO e o callout de erros comuns (vindo de `commonMistakes`). |
| architecture | ENXUGAR | Análise por camada mantida; a frase-padrão de observabilidade vira uma linha; recebe `deepDive.limitations` ("Limites de cada medição"). |
| analogy | ENXUGAR | Analogia da estrada é boa; limite em 1 frase. |
| simpleExample | MANTER | Concreto; acrescenta a conversão 50 MB/s = 400 Mbps (de `deepDive.whenNotToUse`). |
| enterpriseExample | MANTER | ERP da filial pela manhã é específico; só ajuste de voz. |
| cloudExample | ENXUGAR | Mantém região, NAT cobrado por tráfego, firewall gerenciado, "rede infinita"; recebe o custo de observabilidade (`deepDive.financialImpact`). |
| devsecopsExample | ENXUGAR | Mantém o runner com timeout; o parágrafo do Kubernetes vira 1 frase (sidecar, mTLS, NetworkPolicy). |
| securityExample | FUNDIR:security | A tabela repetia as vulnerabilidades; o que era único (picos de conexão com baixa taxa útil, rate limit, jitter em voz, change management) foi para `security`. |
| diagram | MANTER | SVG correto e legível; ids `m01l08-*` e title/desc preservados; intro em 1 frase. |
| labIntro | REMOVER | Invisível. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | MANTER | 5 bullets; 1º = `deepDive.mentalModel`; acrescenta os números-chave (MB/s×8, janela÷RTT, 99,9%, p95). |
| nextTheme | ENXUGAR | 1 frase coerente com a 1.9. |
| lab | ENXUGAR | Passos, comandos, validação e troubleshooting intactos; safetyNotes de 5 para 3; analysisTask ritual trocado por instrução concreta com linha de exemplo; improvements de 5 para 3; subcampo `number` (invisível) removido. |
| quiz | ENXUGAR | Normalizado (answer numérico); distratores absurdos trocados; q1.8.1 (trivial, coberta pelo fc1.8.1) removida; +3 (q1.8.7 disponibilidade, q1.8.8 saída do curl, q1.8.9 janela÷RTT); embaralhado. 8 questões. |
| flashcards | MANTER | 6 mantidos (fc1.8.6 com definição de p95); +2 (SLA×SLO, MB/s→Mbps). |
| mentorQuestions | MANTER | 3 perguntas de raciocínio boas. |
| exercises | MANTER | ex1.8.2 (Wi‑Fi/vídeo) repetia mentor 2 e quiz q1.8.3; foi trocado por ex1.8.5 (série de pings: média × jitter). |
| challenge | MANTER | Cenário, rubrica de 100 pontos e entregáveis claros. |
| commentedSolution | MANTER | Passos e respostas erradas comuns específicos. |
| glossary | MANTER | 6 termos usados; +Largura de banda e Percentil (p95/p99), usados na aula; SLO ganha relação com SLA; "SLI" (não usado) saiu dos relacionados. |
| security | MANTER | Recebe o securityExample; vulnerabilidades com os 4 campos coerentes. |
| troubleshooting | MANTER | Comandos e árvore corretos; recebe `deepDive.decisionTable` (3 ramos); interpretação do Cisco detalha CRC/input errors/output drops. |
| references | MANTER | Reais (aulas 0.4/0.6, IETF IPPM Framework, Cisco). |
| linksToOtherCourses | MANTER | Pertinentes. |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary/architecture/simpleExample/cloudExample/troubleshooting | mentalModel → summary; limitations → architecture; MB/s×Mbps → simpleExample; custo de observabilidade → cloudExample; decisionTable → troubleshooting.decisionTree; whenToUse, securityImpact, operationalImpact e o resto de whenNotToUse já estavam em concept, security e commonMistakes. |
| commonMistakes | MOVER:internals | Callout "Erros comuns" (3 itens; o 4º, disponibilidade de um ponto só, já está em architecture e security). |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | "Está lento" esconde muitas causas (link, Wi‑Fi, firewall, DNS, CPU, MTU de VPN, região cloud, API, ataque) | MANTIDO | motivation |
| 2 | Definição de latência | MANTIDO | concept (definition-box, tabela), glossary, fc1.8.1 |
| 3 | Definição de jitter (variação da latência) | MANTIDO | concept, internals, glossary, fc1.8.2 |
| 4 | Definição de perda | MANTIDO | concept, internals, glossary, fc1.8.3 |
| 5 | Throughput = vazão útil ≠ largura de banda nominal | MANTIDO | concept (+def. de largura de banda), internals (erros comuns), glossary, q1.8.2, fc1.8.4, ex1.8.1 |
| 6 | Disponibilidade = proporção de tempo acessível | MANTIDO | concept, internals, glossary, q1.8.5, fc1.8.5 |
| 7 | Tabela métrica × pergunta × unidade × sintoma | MANTIDO | concept |
| 8 | Componentes da latência (transmissão, propagação, processamento, fila, inspeção, negociação, serviço) | MANTIDO | internals |
| 9 | RTT = ida e volta; ping mostra RTT | MANTIDO | internals, diagram, summary |
| 10 | Causas de jitter (filas, Wi‑Fi, congestionamento, QoS) | MANTIDO | internals |
| 11 | Causas de perda (erro físico, fila cheia, política, MTU, rádio, firewall, caminho) | MANTIDO | internals |
| 12 | Fatores do throughput (menor capacidade do caminho, overhead, janela TCP, perda, latência, criptografia) | MANTIDO | internals |
| 13 | Média esconde picos; p95/p99 | MANTIDO | internals (série concreta + definição de p95), glossary, fc1.8.6, summary |
| 14 | Conectividade ≠ qualidade; ping responde e aplicação falha | MANTIDO | problem, internals (erros comuns), q1.8.8 |
| 15 | API 80 ms no datacenter × 900 ms remoto | MANTIDO | problem |
| 16 | 99,9% ainda causa impacto numa janela crítica | MANTIDO | problem, internals (tabela) |
| 17 | Análise por trecho e por camada (física, enlace, rede, transporte, aplicação) | MANTIDO | architecture |
| 18 | TCP reage a perda/latência; UDP sofre com jitter/perda | MANTIDO | architecture |
| 19 | Correlacionar métricas com logs, eventos e mudanças | MANTIDO | architecture (última frase), security.goodPractices |
| 20 | Analogia da estrada (faixas × carros por minuto) | MANTIDO | analogy |
| 21 | 500 Mbps × Wi‑Fi do quarto: estabilidade > banda nominal | MANTIDO | simpleExample |
| 22 | Download rápido e site lento (DNS, TLS, servidor) | MANTIDO | simpleExample, troubleshooting.decisionTree |
| 23 | ERP da filial: concorrência backup/atualização, firewall com inspeção TLS | MANTIDO | enterpriseExample |
| 24 | Latência entre regiões, NAT cobrado por tráfego, firewall gerenciado, "cloud não é rede infinita", egress, quotas | MANTIDO | cloudExample |
| 25 | Pipeline com timeout por rede do runner; sidecar/mTLS/NetworkPolicy | MANTIDO | devsecopsExample |
| 26 | Throughput de saída anormal: exfiltração ou backup legítimo | MANTIDO | security.vulnerabilities[0], q1.8.4, ex1.8.4 |
| 27 | Picos de conexão com baixa taxa útil: varredura, falha de autenticação em massa | MANTIDO | security.detectionIdeas |
| 28 | Saturação de firewall/proxy/WAF, DDoS, rate limit | MANTIDO | security.vulnerabilities[1] |
| 29 | Falsa disponibilidade por monitoramento de um ponto só; monitoramento sintético multi-região | MANTIDO | security.vulnerabilities[2], architecture (limites) |
| 30 | Limites do ping (bloqueio/prioridade), do traceroute (assimetria), do speed test | MANTIDO | architecture (movido de deepDive.limitations) |
| 31 | Conversão MB/s × Mbps | MANTIDO | simpleExample, fc1.8.8, summary (movido de deepDive) |
| 32 | Comandos Windows (ping -n, tracert, Test-NetConnection) e interpretação ICMP × TCP | MANTIDO | troubleshooting.commands, lab |
| 33 | curl -w com tempos de DNS/connect/TLS/starttransfer/total | MANTIDO | troubleshooting.commands, lab passo 5, q1.8.8 |
| 34 | Cisco: show interfaces, show processes cpu sorted, show ip route, show logging; CRC/drops/CPU | MANTIDO | troubleshooting.commands |
| 35 | Árvore de decisão (perda em vários destinos, latência regional, throughput por serviço, janelas curtas) | MANTIDO | troubleshooting.decisionTree (+3 ramos do deepDive.decisionTable) |
| 36 | Lab: gateway × externo × caminho × HTTP; perda até o gateway = problema local | MANTIDO | lab, q1.8.6, ex1.8.3 |
| 37 | Segurança dos testes (sem carga, poucos pacotes, destinos autorizados, não publicar IPs) | MANTIDO | lab.safetyNotes, challenge.constraints, security |
| 38 | Custo de monitoramento/observabilidade | MANTIDO | cloudExample (movido de deepDive.financialImpact) |
| 39 | SLA, SLO | MANTIDO | internals (definição nova de SLA), glossary, fc1.8.7 |
| 40 | História das ferramentas (SNMP, NetFlow, APM) e "orçamento de erro" | REMOVIDO | fora do escopo: só citados em history, sem explicação; SNMP/NetFlow seguem em networkContext |
| 41 | Tabela de fases de evolução (rede local → SOC) | REMOVIDO | história de mercado; o útil está duplicado em architecture/security |
| 42 | Ler a saída do ping (Perdidos/% de perda, Mínimo/Máximo/Média, rtt min/avg/max/mdev) | NOVO | internals (lacuna do objetivo 4) |
| 43 | Jitter estimado como média das diferenças consecutivas | NOVO | internals, ex1.8.5 |
| 44 | Throughput de uma conexão ≤ janela ÷ RTT (64 KB, 100 ms ≈ 5,2 Mbps) | NOVO | internals, q1.8.9, summary (lacuna do objetivo 2) |
| 45 | Tabela 99% / 99,9% / 99,99% em 30 dias | NOVO | internals, q1.8.7 (o 99,9% já estava no glossário) |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar latência, jitter, perda, throughput e disponibilidade | concept (definições + tabela), internals, diagram, glossary, q1.8.2/3/5, flashcards |
| Entender por que uma rede pode ter muita banda e ainda assim parecer lenta | internals ("Por que muita banda ainda pode parecer lenta", janela ÷ RTT), simpleExample, troubleshooting.decisionTree, q1.8.8, q1.8.9 |
| Relacionar métricas com sintomas de voz, vídeo, API, VPN, backup, cloud e sistemas corporativos | concept (sintoma típico), problem, exemplos enterprise/cloud/devsecops, troubleshooting.symptoms/decisionTree, mentorQuestions |
| Coletar evidências iniciais com comandos seguros no Windows, Linux e Cisco IOS | internals (saída do ping), troubleshooting.commands, lab (6 passos), ex1.8.3, ex1.8.5 |
| Evitar diagnósticos genéricos como "a rede está lenta" | motivation, summary (ideia central), mentor 1, challenge + commentedSolution |
| Interpretar impactos de segurança e observabilidade a partir de métricas anômalas | security (vulnerabilidades, detectionIdeas, monitoring), architecture (limites), q1.8.4, ex1.8.4 |

## 10. O que mudou na nova versão
- Removidos history, evolution e securityExample (fundidos em problem e security) e os 4 `*Intro` invisíveis.
- `internals` ganhou o que faltava para os objetivos 2 e 4: leitura da saída do ping no Windows e no Linux, série de 10 pings com média, distribuição, p95 e jitter calculado, limite janela ÷ RTT com números, tabela de disponibilidade e definição de SLA × SLO.
- `deepDive` e `commonMistakes` (618 palavras invisíveis) foram movidos para summary, architecture ("Limites de cada medição"), simpleExample, cloudExample, troubleshooting.decisionTree e o callout "Erros comuns", e depois removidos.
- Quiz normalizado, distratores absurdos trocados, q1.8.1 removida, 3 questões novas aplicadas a cálculo e saída de comando, gabarito embaralhado (2/2/2/2).
- Exercício ex1.8.2, que repetia mentor e quiz, trocado por ex1.8.5 (série de pings); +2 flashcards e +2 termos de glossário.
- Lab: ritual cortado (safetyNotes, improvements, analysisTask padrão), com instrução concreta e linha de exemplo no passo 6.
- Títulos `<h2>` sem número; duração atualizada.

## 11. Depois
Palavras visíveis: 4970 → 5779 (+16%; cortes brutos 553, acréscimos 1362, dos quais ~400 vêm de campos invisíveis movidos e o restante de conteúdo para lacunas dos objetivos e de quiz/flashcards/glossário) · Invisíveis: 782 → 46 (networkContext) · Duração: 80-115 min → 115-160 min (T 128,4 → 134,5) · Quiz corrigido: sim (8 questões).
`validar`: OK, com 1 AVISO: "ids de quiz originais ausentes: q1.8.1". É intencional: a questão era trivial (qual métrica mede ida e volta no ping) e está coberta por fc1.8.1. O id não foi reaproveitado.

## 12. Revisão humana
- Conteúdo novo para os objetivos 2 e 4 (leitura da saída do ping, jitter pela média das diferenças consecutivas, janela ÷ RTT com 64 KB/100 ms, tabela de disponibilidade, definição de SLA, q1.8.7–q1.8.9, ex1.8.5, fc1.8.7–8, glossário de largura de banda e percentil). Conferir se o nível cabe no m01 e se as mensagens de saída citadas ("Esgotado o tempo limite do pedido.", "packet loss", "rtt min/avg/max/mdev") batem com as versões de Windows/Linux usadas no curso.
- O jitter calculado como média simples das diferenças consecutivas é uma simplificação didática (o RFC 3550 usa um estimador suavizado). O texto diz "uma estimativa simples"; confirmar se basta.
- A duração subiu de 80-115 para 115-160 min pela fórmula fixa (a original já estava SUBESTIMADA: lab de 45 min + exercícios + desafio).
- Questão q1.8.1 removida: o progresso salvo dessa questão deixa de contar.

```json
{
  "id": "1.8", "modulo": "m01", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Métricas: latência, jitter, perda, throughput e disponibilidade",
  "duracao_declarada": "80-115 min", "T_original_min": 128.4, "duracao_nova": "115-160 min", "T_nova_min": 134.5, "duracao_nova_estimated_max": 160, "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "BAIXA", "linguica_pct": 12, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 0, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4970, "palavras_visiveis_depois": 5779,
  "palavras_invisiveis_antes": 782, "palavras_invisiveis_depois": 46,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "MANTER", "evolution": "REMOVER",
    "concept": "MANTER", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "MANTER", "mentorQuestions": "MANTER", "exercises": "MANTER",
    "challenge": "MANTER", "commentedSolution": "MANTER", "glossary": "MANTER", "security": "MANTER",
    "troubleshooting": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER", "networkContext": "MANTER",
    "deepDive": "MOVER:summary/architecture/simpleExample/cloudExample/troubleshooting",
    "commonMistakes": "MOVER:internals"
  },
  "quiz_corrigido": true, "quiz_questoes": 8, "objetivos_cobertos": true,
  "revisao_humana": [
    "Conteúdo novo para os objetivos 2 e 4 (saída do ping, jitter calculado, janela÷RTT, tabela de disponibilidade, SLA, q1.8.7-9, ex1.8.5, fc1.8.7-8, 2 termos de glossário): conferir nível do m01 e as mensagens de saída citadas do Windows/Linux.",
    "Jitter como média simples das diferenças consecutivas é simplificação didática (RFC 3550 usa estimador suavizado).",
    "Duração subiu de 80-115 para 115-160 min pela fórmula (original SUBESTIMADA).",
    "q1.8.1 (trivial) removida: o progresso salvo dessa questão deixa de contar."
  ]
}
```
