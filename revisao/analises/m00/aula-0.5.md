# Aula 0.5 — Como sinais físicos carregam dados
Tipo: fundamental · Duração declarada: 70-100 min · Palavras visíveis / invisíveis (antes): 5590 / 686

## 1. Duração
T pela fórmula = 128 min (teoria 24,7, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 41,4)
O `lab.estimatedTimeMinutes` = 100 não é plausível para 7 passos de leitura de comandos nativos (alternativa da fórmula: 41,4 min), por isso a fórmula usou 41,4.
Veredito: **SUBESTIMADA** — M = 85 < 0,8×T = 102. A teoria é só 22% do tempo e a prática (lab, exercícios, desafio) domina, o que é coerente para uma aula fundamental com lab local; não é DESEQUILIBRADA. O que falta na duração declarada é o peso da prática (exercícios + desafio = 44 min).

## 2. Encheção de linguiça
Nível: **MÉDIA (~18%)**. Evidências:
- `history` e `evolution` repetem a mesma comparação em duas tabelas quase idênticas (“Cobre | Variação elétrica | Baixo custo… | Interferência…” vs. “Cobre par trançado | Sinais elétricos em pares de fios | Conexão barata em LAN | Interferência e limite de distância”).
- `securityExample` repete `security` e `deepDive.securityImpact`: a tabela de riscos (porta exposta, rogue AP, interferência, rack) é a mesma lista de `security.vulnerabilities` + `hardening`; o “Limite ético” repete `lab.safetyNotes`.
- `motivation` antecipa toda a lista de segurança (“disponibilidade, escopo de ataque, exposição de portas, acesso indevido a tomadas…”) e termina com frase de efeito (“Redes não são apenas protocolos; elas também são materiais, energia, luz, rádio e ambiente”).
- `architecture` (parágrafo de cloud) duplica `cloudExample` (“zonas de disponibilidade, links entre datacenters… throughput máximo de instância, capacidade de NIC virtual”).
- `enterpriseExample` (2º parágrafo) repete `security`; `concept` termina com meta‑texto (“Por isso, entender sinais físicos é o primeiro passo para troubleshooting sério”).
- `analogy`: limite da analogia em três frases; `diagram`: parágrafo de introdução que descreve o que o SVG já mostra.
- `security`: `goodPractices` × `hardening` × `detectionIdeas` × `monitoring` repetem os mesmos itens (portas sem uso, flaps, SSIDs, contadores de erro).
- Lab: `troubleshooting` do lab repete a `decisionTree` (100 Mbps, Wi‑Fi variando); passo 7 usa a frase‑padrão de 56 aulas (“Produza o artefato indicado na instrução do passo e registre a evidência objetiva…”); `improvements` genéricos (“Montar topologia Packet Tracer futura”, “Criar checklist…”, que já é o `lab.challenge`).
- Duplicação entre blocos de fixação: `fc0.5.5` = `q0.5.4` (tomada pública), `fc0.5.6` = `q0.5.6` (cloud); `ex0.5.3` (controles para tomadas públicas) = `mentorQuestions[2]` + `q0.5.4`.
- Conteúdo em campos invisíveis: `deepDive` (355 palavras) e `commonMistakes` (146) com erros comuns, modelo mental e limitações que o aluno não via; `labIntro`, `exercisesIntro`, `challengeIntro`, `solutionIntro` só com moldura.

## 3. Conteúdo útil
**PARCIAL.** O que tem de realmente valioso: a pergunta central (como o receptor distingue 0 e 1 num meio imperfeito), a cadeia serialização → codificação → transmissão → atenuação → ruído → recepção → verificação, a distinção entre camada física ausente e degradada, os comandos de evidência (Get-NetAdapter, ip link, ethtool, nmcli, show interfaces counters errors) com interpretação, o lab executável e seguro, o desafio com rubrica.
Lacunas: SNR e duplex citados (glossário, keyTerms, lab) mas nunca explicados; nenhuma leitura de `NO-CARRIER`/`LOWER_UP` nem de late collisions no conteúdo; nenhum comando Windows para Wi‑Fi (o objetivo 4 pede Windows); o ping do lab no Linux não termina sozinho. Exemplos de cloud/DevSecOps/arquitetura são em parte genéricos.
Erros técnicos: nenhum relevante. Imprecisão menor: “camadas superiores detectam erros por mecanismos como FCS/CRC, checksums e retransmissões” (retransmissão é recuperação, não detecção) — reescrito.

## 4. Aproveitamento
**BOM** — cerca de 85% do T original (128 min) vai para o que ensina ou pratica os objetivos; o desperdício está em ~6 min de teoria redundante (history/evolution/securityExample), ~6 min de um exercício duplicado e ~2 min de ritual de lab. Contra a duração declarada (85 min) a conta não fecha: a aula exige mais tempo do que promete.

## 5. Pode ser mais curta?
**NÃO** — redução prevista: ~6% (só a teoria redundante e um exercício duplicado). A prática domina o tempo e é útil. Na nova versão o T fica praticamente igual (128 → 127,1) porque os cortes foram compensados por conteúdo movido de campos invisíveis, pela tabela de evidências e por 2 questões novas de quiz.

## 6. Explicação mais direta
**SIM** — `concept`: definição (`definition-box`) movida para a primeira linha; as duas tabelas de `history` e `evolution` viraram uma só tabela em `concept` (meio × representação × por que se usa × limitação × evolução técnica). `internals`: “não basta tensão alta = 1” passou para dentro do passo de codificação; tabela “evidência → onde ver → o que sugere” no lugar de interpretações espalhadas. `problem`: um único callout “Erros comuns” substitui o callout isolado e o `commonMistakes` invisível.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantidos o problema real e a lista de causas físicas; a lista de segurança virou 1 frase (detalhe está em `security`). |
| history | FUNDIR:concept | Explica por que cada meio existe (custo, distância/EMI, mobilidade); entrou como coluna “Por que se usa” + 1 frase na tabela única. |
| problem | ENXUGAR | Núcleo mantido; recebeu o callout de erros comuns (de `commonMistakes` e `deepDive.whenNotToUse`). |
| evolution | FUNDIR:concept | Técnicas (par trançado, monomodo/multimodo, OFDM/MIMO, DAC) viraram coluna “Evolução técnica”; codificação multinível foi para `internals`. |
| concept | ENXUGAR | Definição primeiro, tabela única dos três meios, sem meta‑texto final. |
| internals | MANTER | Cadeia mantida; acrescidos SNR, tabela de evidências (NO-CARRIER, LOWER_UP, speed, duplex/late collisions, CRC, flapping, Wi‑Fi) e o limite das ferramentas (de `deepDive.limitations`). |
| architecture | ENXUGAR | Lista de componentes mantida; parágrafo de cloud removido (duplicava `cloudExample`). |
| analogy | ENXUGAR | Analogia boa; limite em 1 frase. |
| simpleExample | MANTER | Concreto (1 Gbps → 100 Mbps; Wi‑Fi em outro cômodo). |
| enterpriseExample | ENXUGAR | Exemplos específicos mantidos; parte de segurança reduzida a 1 frase com remissão a Segurança. |
| cloudExample | ENXUGAR | Recebeu NIC virtual e zonas de `architecture`; texto mais curto. |
| devsecopsExample | ENXUGAR | Objetivo 5 cita DevSecOps; mantidos runner/registry/K8s e enlaces híbridos. |
| securityExample | FUNDIR:security | Tabela de riscos = `security.vulnerabilities`; “Rack sem controle” virou vulnerabilidade nova; limite ético já está em `lab.safetyNotes`. |
| diagram | ENXUGAR | SVG intacto (ids `m00l05-*`, title/desc); introdução em 2 frases. |
| labIntro | REMOVER | Invisível; “local, sem Packet Tracer nem acesso administrativo” foi para `lab.scenario`. |
| exercisesIntro | REMOVER | Invisível, moldura. |
| challengeIntro | REMOVER | Invisível, repete `challenge.scenario`. |
| solutionIntro | REMOVER | Invisível, moldura. |
| summary | ENXUGAR | 5 bullets; primeiro é o `deepDive.mentalModel`. |
| nextTheme | ENXUGAR | 1 frase, coerente com 0.6. |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary/internals/problem | mentalModel → summary; limitations → callout em internals; whenNotToUse → erros comuns em problem; keyTerms SNR/duplex → internals e glossário; securityImpact já coberto em `security`; operational/financialImpact genéricos removidos. |
| commonMistakes | MOVER:problem | 4 erros viraram o callout “Erros comuns”. |
| security | ENXUGAR | `hardening` fundido em `goodPractices`; `detectionIdeas` reduzido aos 2 itens que não estavam em `monitoring`; +1 vulnerabilidade (rack). |
| troubleshooting | MANTER | Comandos e árvore corretos; `decisionTree` do Wi‑Fi recebeu roaming e “cabo para pontos fixos” (do lab.troubleshooting removido). |
| lab | ENXUGAR | Passos mantidos; `estimatedTimeMinutes` 100 → 40; safetyNotes 4 → 2; passo 5 com `netsh wlan show interfaces` (Windows); passo 6 com `ping -c 20` no Linux; passo 7 com tarefa específica; lab.troubleshooting só com o item próprio do lab; improvements 5 → 3. |
| quiz | ENXUGAR | Normalizado; q0.5.5 com distratores plausíveis; +q0.5.7 (CRC com link up) e +q0.5.8 (meio compartilhado). |
| flashcards | ENXUGAR | Removidos fc0.5.5/fc0.5.6 (copiavam o quiz); +fc0.5.7 (NO-CARRIER/LOWER_UP) e +fc0.5.8 (SNR); subcampos invisíveis tags/difficulty removidos. |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, boas. |
| exercises | ENXUGAR | ex0.5.3 (duplicava mentor 3 e q0.5.4) trocado por ex0.5.5 (interpretar NO-CARRIER × 100Mb/s). |
| challenge | MANTER | Cenário, entregáveis e rubrica claros. |
| commentedSolution | MANTER | Raciocínio e respostas erradas comentadas específicos. |
| glossary | ENXUGAR | `relatedLessons` (invisível) removido; +Duplex (usado no lab, troubleshooting e conteúdo). |
| references | MANTER | IEEE 802.3/802.11 e internas reais. |
| linksToOtherCourses | MANTER | Reais. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Bits precisam virar fenômeno físico (elétrico, luz, onda) | MANTIDO | motivation, concept |
| 2 | Causas físicas que parecem “problema de IP/DNS” (crimpagem, fibra dobrada, duplex, interferência, transceiver, distância) | MANTIDO | motivation |
| 3 | Caso real: intermitência com DNS/IP/firewall corretos, causa física | MANTIDO | motivation (callout) |
| 4 | Segurança física: tomadas, racks, Wi‑Fi além das paredes, rogue AP | MANTIDO | motivation (1 frase), security |
| 5 | Comunicação antiga já dependia de sinais (telégrafo, telefone, rádio); redes padronizaram bits ↔ sinais | MANTIDO | concept (texto antes da tabela) |
| 6 | Cobre: barato, flexível, fácil de instalar; limitações interferência/distância/crimpagem | MANTIDO | concept (tabela) |
| 7 | Fibra: distância, capacidade, imune a EMI; limitações transceiver, curvatura, limpeza, custo | MANTIDO | concept (tabela) |
| 8 | Wi‑Fi: mobilidade; interferência, obstáculos, canal, meio compartilhado, regulação de espectro, exposição | MANTIDO | concept (tabela) |
| 9 | Pergunta central: como o receptor distingue 0 e 1 num meio imperfeito | MANTIDO | problem |
| 10 | Degradações por meio (resistência, capacitância, atenuação, conectores sujos, reflexão, colisões) | MANTIDO | problem |
| 11 | Consequências: erros de quadro, perda, retransmissão, renegociação, latência variável | MANTIDO | problem |
| 12 | Lista sem sinal / fraco / interferência / meio compartilhado / instalação ruim | MANTIDO | problem (flow-list) |
| 13 | Erro comum: pular para DNS/firewall sem verificar a camada física | MANTIDO | problem (Erros comuns) |
| 14 | Codificação vai além de tensão alta/baixa: transições, múltiplos níveis, modulação, temporização, símbolos | MANTIDO | internals (passo 2) |
| 15 | Par trançado com cancelamento de interferência; categorias melhores; autonegociação | MANTIDO | concept (tabela) |
| 16 | Fibra: lasers, LEDs, comprimentos de onda, monomodo e multimodo | MANTIDO | concept (tabela) |
| 17 | Wi‑Fi: modulação eficiente, OFDM, MIMO, canais largos, várias bandas | MANTIDO | concept (tabela) |
| 18 | Datacenter: DAC, fibra, transceivers, leste‑oeste; custo/compatibilidade/observabilidade | MANTIDO | concept (parágrafo final) |
| 19 | Definição de sinal físico e do que a camada física define (meio, conector, frequência… taxa nominal) | MANTIDO | concept |
| 20 | A camada física não decide IP, rota, porta, DNS, firewall | MANTIDO | concept |
| 21 | Cadeia de 7 etapas (serialização → verificação, FCS/CRC, checksums) | MANTIDO | internals (retransmissão reescrita como recuperação) |
| 22 | Ausência × degradação da camada física (link up com erros) | MANTIDO | internals, summary |
| 23 | Componentes por camada da arquitetura (host, acesso, distribuição, borda, cloud) | MANTIDO | architecture |
| 24 | Cloud abstrai a física: limites de instância, NIC virtual, zonas, regiões; troubleshooting muda (security groups, NAT gateway, quotas) | MANTIDO | cloudExample (parágrafo de architecture fundido) |
| 25 | Analogia da lanterna e seu limite | MANTIDO | analogy |
| 26 | Exemplo 1 Gbps → 100 Mbps com cabo ruim; Wi‑Fi em outro cômodo | MANTIDO | simpleExample |
| 27 | Exemplo empresarial (rack derruba VLAN, transceiver incompatível, cabo em local inadequado) | MANTIDO | enterpriseExample |
| 28 | DevSecOps: runner em Wi‑Fi, registry em link saturado, K8s on‑prem, Direct Connect/ExpressRoute/SD-WAN | MANTIDO | devsecopsExample |
| 29 | Riscos: porta exposta, rogue AP, interferência, rack sem controle, com mitigações (802.1X, NAC, port security) | MANTIDO | security.vulnerabilities (rack virou item próprio) |
| 30 | Limite ético do lab (não desconectar, não interferir, não conectar sem autorização) | MANTIDO | lab.safetyNotes |
| 31 | Comandos: Get-NetAdapter, ipconfig /all, ip link/addr, ethtool, nmcli, show interfaces status/counters errors | MANTIDO | troubleshooting, lab, internals (tabela) |
| 32 | LOWER_UP = carrier detectado | MANTIDO | lab passo 3, internals, fc0.5.7 |
| 33 | CRC/input errors, late collisions, flaps como evidência | MANTIDO | troubleshooting, internals, q0.5.7 |
| 34 | Árvore de decisão (down → cabo/porta; up lento → cabo/autoneg; Wi‑Fi por local; CRC; físico ok → subir) | MANTIDO | troubleshooting.decisionTree |
| 35 | Modelo mental (deepDive) | MANTIDO | summary, 1º bullet |
| 36 | Limitações: instrumentos profissionais (certificador, OTDR, analisador de espectro, site survey); SO não mostra tudo; Wi‑Fi varia por horário/local | MANTIDO | internals (callout) |
| 37 | Não usar camada física como explicação automática; velocidade de link ≠ throughput | MANTIDO | problem (Erros comuns) |
| 38 | commonMistakes (DNS antes do link, Wi‑Fi = cabo, ignorar velocidade negociada, tomada inofensiva) | MANTIDO | problem (Erros comuns); tomada → security.commonErrors |
| 39 | Roaming e “cabo para pontos fixos” (lab.troubleshooting) | MANTIDO | troubleshooting.decisionTree |
| 40 | deepDive.operationalImpact / financialImpact (documentação, custo de cabeamento, troca desnecessária) | REMOVIDO | genérico; documentação já em security.goodPractices e enterpriseExample |
| 41 | Itens de hardening (shutdown, VLAN de quarentena, rack, etiquetagem, Wi‑Fi visitantes, homologados) | MANTIDO | security.goodPractices (fundidos) |
| 42 | Telegrafia/TV/linhas seriais como exemplos históricos completos | REMOVIDO | parcialmente (TV, linhas seriais): lista redundante, não muda o entendimento |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que bits precisam ser convertidos em sinais físicos | motivation, concept (definição), internals (cadeia), ex0.5.1, mentor 1, q0.5.1 |
| Diferenciar cobre, fibra e rádio/Wi‑Fi | concept (tabela), diagram, summary, ex0.5.4, q0.5.2, q0.5.8 |
| Relacionar ruído, atenuação, interferência, distância e meio compartilhado com sintomas | problem, internals (passos 4–6 e tabela), simpleExample, q0.5.5, q0.5.8, fc0.5.8 |
| Identificar evidências físicas em Windows, Linux e Cisco | internals (tabela), troubleshooting.commands, lab (passos 1–6), ex0.5.5, q0.5.7, fc0.5.4, fc0.5.7 |
| Conectar camada física com segurança, disponibilidade, cloud, DevSecOps e troubleshooting | security, enterpriseExample, cloudExample, devsecopsExample, challenge, q0.5.4, q0.5.6, mentor 3 |

## 10. O que mudou na nova versão
- Removidas `history`, `evolution`, `securityExample` e as quatro intros invisíveis; o conteúdo útil de history/evolution virou uma tabela única em `concept`, e o de securityExample foi para `security`.
- `deepDive` e `commonMistakes` saíram dos campos invisíveis para onde o aluno vê (summary, problem, internals, glossário).
- `internals` ganhou SNR, a tabela “evidência → onde ver → o que sugere” e o limite das ferramentas do usuário.
- `security` sem repetição entre goodPractices/hardening/detectionIdeas/monitoring; +vulnerabilidade “Rack ou sala técnica sem controle”.
- Lab: tempo estimado corrigido (100 → 40 min, coerente com 7 passos de comandos nativos), comando Windows para Wi‑Fi (`netsh wlan show interfaces`), `ping -c 20` no Linux, passo 7 com tabela e tarefa específica no lugar da frase‑padrão, ritual reduzido.
- Quiz: formato padronizado; distratores absurdos de q0.5.5 trocados por plausíveis (mesma posição da correta); +q0.5.7 e +q0.5.8 com resposta em outras posições. Flashcards e exercícios sem duplicar quiz/mentor; glossário +Duplex.
- `duration` 70-100 → 110-155 min; `estimatedStudyTimeMinutes` 100 → 155.

## 11. Depois
Palavras visíveis: 5590 → 5717 (+2%; cortes brutos 852 = 15%, acréscimos 979, dos quais ~300 vieram de campos invisíveis) · Duração: 70-100 min → 110-155 min (T 128 → 127,1) · Quiz corrigido: sim (8 questões; formato `q/opts/a/exp` convertido para `question/options/answer/explanation`)
AVISO do `validar` “gabarito concentrado {0:6, 1:1, 2:1}”: as 6 questões originais têm a correta no índice 0, e as opções não foram reordenadas para preservar as respostas salvas (11.6b); as 2 questões novas usam os índices 2 e 1.

## 12. Revisão humana
- Gabarito das 6 questões originais concentrado no índice 0 (mantido de propósito para não invalidar respostas salvas). Decidir se vale reordenar aceitando perder o progresso salvo.
- `lab.estimatedTimeMinutes` reduzido de 100 para 40 min (a fórmula não considerava 100 plausível para os 7 passos). Confirmar.
- Comando novo no lab: `netsh wlan show interfaces` (Windows) e campos da saída descritos de forma genérica (SSID, tipo de rádio, canal, taxas, sinal em %); conferir num Windows em pt-BR, onde os rótulos aparecem traduzidos.
- Fatos acrescentados, de conhecimento padrão, que merecem conferência rápida: late collisions como sintoma de duplex incompatível; `NO-CARRIER`/`LOWER_UP` no `ip link`; SNR expressa em dB.

```json
{
  "id": "0.5", "modulo": "m00", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Como sinais físicos carregam dados",
  "duracao_declarada": "70-100 min", "T_original_min": 128, "duracao_nova": "110-155 min", "veredito_duracao": "SUBESTIMADA",
  "T_nova_min": 127.1, "duracao_nova_estimated_max": 155,
  "linguica_nivel": "MÉDIA", "linguica_pct": 18, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 6, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 5590, "palavras_visiveis_depois": 5717,
  "palavras_invisiveis_antes": 686, "palavras_invisiveis_depois": 34,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:concept", "problem": "ENXUGAR", "evolution": "FUNDIR:concept",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "ENXUGAR", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary/internals/problem", "commonMistakes": "MOVER:problem",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "ENXUGAR",
    "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "ENXUGAR", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 8, "objetivos_cobertos": true,
  "revisao_humana": [
    "Gabarito das 6 questões originais concentrado no índice 0 (mantido para preservar respostas salvas)",
    "lab.estimatedTimeMinutes reduzido de 100 para 40 min",
    "Comando novo netsh wlan show interfaces: conferir rótulos da saída em Windows pt-BR",
    "Conferir fatos acrescentados: late collisions/duplex, NO-CARRIER/LOWER_UP, SNR em dB"
  ]
}
```


> **Nota do orquestrador (D20):** depois da análise, o `quiz_embaralhar.js` redistribuiu a posição da resposta correta (gabarito antes concentrado no índice 0, agora 2/2/2/2). O texto das questões e opções não mudou. O item "gabarito concentrado" da revisão humana está resolvido.
