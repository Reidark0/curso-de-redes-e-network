# Aula 1.5 — Meios de transmissão: cobre, fibra e rádio
Tipo: fundamental · Duração declarada: 75-110 min · Palavras visíveis / invisíveis (antes): 3693 / 551

## 1. Duração
T pela fórmula = 80,8 min (teoria 18,8, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0)
Veredito: ORGANIZADA — M = 92,5 min está dentro de [0,8T; 1,2T] = [64,6; 97]. A divisão (27% leitura, ~73% fixação via exercícios, desafio, quiz e mentor) faz sentido para uma aula conceitual sem laboratório. A faixa declarada estava um pouco larga no topo (110 min), mas sem inflar.

## 2. Encheção de linguiça
Nível: MÉDIA (~15%). Evidências:
- `history`, `evolution` e `problem` repetem a mesma ideia três vezes: “cobre barato, fibra para distância/backbone, rádio para mobilidade com interferência”; `evolution` abre com “a evolução dos meios acompanhou uma tensão constante entre custo, mobilidade…” (frase vazia) e a tabela comparativa (o melhor conteúdo da aula) ficou escondida numa seção “Evolução”.
- `devsecopsExample` é exemplo genérico de ambiente (“pipelines dependem de runners… IaC cria subnets e gateways, mas não instala fibra no prédio”), sem nada específico de meio de transmissão.
- `securityExample` (texto + tabela de risco) sobrepõe `security.vulnerabilities` quase linha a linha (porta exposta, Wi‑Fi além das paredes, rompimento/meio único); `deepDive.securityImpact` repete as duas.
- `security`: `hardening` repete `goodPractices` (802.1X, NAC, VLAN de quarentena, etiquetagem); `detectionIdeas` repete `monitoring` (flaps, APs rogue, erros CRC); `badPractices`/`commonErrors` são o inverso de `goodPractices` (“Não etiquetar cabos”, “Não registrar quem pode acessar rack”).
- `concept`, 3º parágrafo: “Entender o meio evita diagnósticos mágicos…” repete a motivação; `motivation`: “No trabalho real, muita gente pula a camada física porque ela parece ‘simples demais’”.
- Limite da analogia com lista de 6 fenômenos; `enterpriseExample` 1º parágrafo repete `architecture`.
- Campos invisíveis: `labIntro` (bloco padrão “Esta aula não possui laboratório independente…”, repetido em 39 aulas), `exercisesIntro`, `challengeIntro`, `solutionIntro`, `deepDive` (297 palavras, com conteúdo útil de custo e “quando não usar”) e `commonMistakes` (120 palavras, valiosos).

## 3. Conteúdo útil
PARCIAL. O que tem de realmente valioso: a tabela comparativa cobre × fibra × rádio; o caso da VPN que caía por erro de CRC; o ciclo transmissor → meio → receptor → validação e a explicação de por que falha física aparece como lentidão de aplicação; a árvore de decisão e os comandos (`ethtool`, `iw`, `show interfaces status`, `show interfaces counters errors`); o desafio com rubrica.
Lacunas: o objetivo 2 cita atenuação, ruído e meio compartilhado, mas a aula só os nomeia, sem dizer o que são nem como se manifestam (SNR aparecia só em `deepDive.keyTerms` e em `relatedTerms` do glossário, sem definição); nenhum número concreto de limite do cobre (o exercício de 100 Mbps × 1 Gbps não tinha base no texto para a hipótese principal); a aula fala de “potência óptica fora da faixa” sem indicar onde ver isso. Os erros comuns e os critérios de custo / “quando não usar” estavam só em campos invisíveis.
Erros técnicos: nenhum relevante. Pequena imprecisão: `show interfaces counters errors` não mostra colunas “CRC/input errors/drops” (mostra FCS-Err, Rcv-Err etc.); a interpretação foi ajustada.

## 4. Aproveitamento
BOM — pelo menos ~90% do T original (80,8 min) ensina ou pratica os objetivos: 44 min de exercícios + desafio, 15 min de quiz/flashcards/mentor alinhados ao tema e ~19 min de teoria, da qual só ~2–3 min eram repetição (history/evolution/securityExample/devsecops). Contra a duração declarada (M = 92,5) a proporção continua acima de 80%.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~0%. Os cortes de redundância (~570 palavras, ~4 min) foram compensados pelo conteúdo útil que estava invisível (erros comuns, custo, “evite quando”) e pelo que faltava para o objetivo 2 (tabela de fenômenos). A fixação (exercícios + desafio) é proporcional e não deve encolher.

## 6. Explicação mais direta
SIM — (a) `concept`: definição na primeira linha e a tabela comparativa (antes escondida em `evolution`) transposta para aspecto × meio, com linhas de custo e “evite quando”; (b) `history` + `evolution` + `problem` viraram um parágrafo em `problem` que explica por que cada meio ocupou o seu nicho; (c) `internals`: tabela fenômeno → o que é → exemplo → como reduzir no lugar de menções soltas a ruído e atenuação; (d) segurança num único bloco estruturado em vez de texto + tabela + deepDive.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantido o caso da VPN/CRC; cortado o parágrafo retórico (“muita gente pula a camada física…”) para 2 frases. |
| history | FUNDIR:problem | Só a parte que explica o nicho de cada meio (coaxial em barramento → par trançado comutado → fibra no backbone → rádio para mobilidade), em 4 frases. |
| problem | ENXUGAR | Recebeu o resumo histórico; os limites por meio foram para a linha “Limitações” da tabela do conceito; mantida a lista “Sem entender…”. |
| evolution | MOVER:concept | A tabela comparativa foi para `concept`; o parágrafo “os três convivem” foi para `architecture`; frase de abertura vazia removida. |
| concept | ENXUGAR | Definição primeiro; 3º parágrafo (repetia a motivação) reduzido a uma frase; recebeu a tabela comparativa e o callout de erros comuns. |
| internals | MANTER | Núcleo preservado; acrescentados o fato 1000BASE-T × 100BASE-TX (pares usados) e a tabela atenuação / ruído-SNR / meio compartilhado (objetivo 2). |
| architecture | ENXUGAR | Lista por camada mantida; recebeu “os três convivem” e a recomendação de redundância (de `deepDive`). |
| analogy | ENXUGAR | Analogia mantida; limite da analogia em 1 frase. |
| simpleExample | MANTER | Concreto (celular → roteador → ONT → fibra da operadora; teste com cabo). |
| enterpriseExample | ENXUGAR | 1º parágrafo condensado (repetia `architecture`); mantida a lista de evidências físicas. |
| cloudExample | ENXUGAR | Um parágrafo; mantidos VPC/VNet, Direct Connect/ExpressRoute e multi-região (cobre o objetivo “cloud connectivity”). |
| devsecopsExample | REMOVER | Genérico; a ideia útil (separar falha de app, DNS, rota e link) já está na árvore de decisão do troubleshooting. |
| securityExample | FUNDIR:security | Texto e tabela de risco fundidos em `security.vulnerabilities` (detalhes de Wi‑Fi fraco, ponte indevida, rack destrancado); linha “Interferência” foi para a tabela de fenômenos em `internals`. |
| diagram | MANTER | Correto e legível; só o `<h2>` sem número. |
| labIntro | REMOVER | Invisível; bloco padrão “Prática equivalente”. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | ENXUGAR | 5 bullets; o `deepDive.mentalModel` virou a primeira linha. |
| nextTheme | ENXUGAR | 1 frase, coerente com a 1.6 (Cabeamento estruturado e padrões RJ‑45). |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:concept/architecture/summary | mentalModel → summary; whenToUse/whenNotToUse/limitations → linhas “Uso típico”/“Evite quando”/“Limitações” da tabela; financialImpact → linha “Custo” e redundância em `architecture`; operationalImpact e securityImpact já cobertos (erros comuns, security). Campo removido. |
| commonMistakes | MOVER:concept | Callout “Erros comuns” (4 itens: luz acesa ≠ link saudável; Wi‑Fi como cabo invisível; fibra só por ser rápida; ignorar segurança física). Campo removido. |
| security | ENXUGAR | Fundido com securityExample; removidas duplicatas entre goodPractices/hardening/monitoring/detectionIdeas e itens que eram só o inverso de outro. 3 vulnerabilidades com os 4 campos coerentes. |
| troubleshooting | MANTER | Comandos e árvore mantidos; interpretação de `show interfaces counters errors` corrigida (FCS-Err/Rcv-Err); acrescentado `show interfaces transceiver` para potência óptica. |
| lab | MANTER (inexistente) | A aula não tem lab; `progressRules.oneOf` usa exerciseDone/practicalExerciseDone e há exercícios. |
| quiz | ENXUGAR | 6 questões mantidas (ids preservados) com distratores plausíveis no lugar dos absurdos; +1 questão (q1.5.7, limite de 100 m e atenuação); gabarito redistribuído com `quiz_embaralhar`. |
| flashcards | ENXUGAR | fc1.5.4 e fc1.5.5 repetiam o quiz (rádio variável, CRC) e saíram; entraram fc1.5.7 (atenuação), fc1.5.8 (SNR), fc1.5.9 (meio compartilhado). 7 cards. |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, boas. |
| exercises | ENXUGAR | ex1.5.2 com a explicação dos pares; ex1.5.4 reescrito para não repetir a mentor 3 (agora foca disponibilidade do enlace de fibra). |
| challenge | MANTER | Cenário, restrições, entregáveis e rubrica claros. |
| commentedSolution | MANTER | Coerente com o desafio. |
| glossary | ENXUGAR | 6 termos mantidos (todos usados); +SNR, agora usado no conteúdo. |
| references | MANTER | IEEE 802.3, IEEE 802.11 e aula 0.5. |
| linksToOtherCourses | MANTER | Reais e pertinentes. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Definição de meio de transmissão (caminho físico ou sem fio) | MANTIDO | concept (definition-box), flashcard fc1.5.1, glossário |
| 2 | Cobre = sinais elétricos; fibra = luz; rádio = ondas eletromagnéticas | MANTIDO | concept (definição e tabela), q1.5.1 |
| 3 | Meio não define protocolo/endereço/aplicação, mas impõe limites de velocidade, distância, estabilidade, custo e risco | MANTIDO | concept |
| 4 | Caso VPN que cai por erro CRC na porta | MANTIDO | motivation |
| 5 | Histórico: coaxial compartilhado em barramento → par trançado com Ethernet comutada | MANTIDO | problem |
| 6 | Fibra ganhou espaço por distância, taxa, imunidade a ruído; luz em vidro ou plástico | MANTIDO | problem, concept (tabela) |
| 7 | Rádio (Wi‑Fi, Bluetooth, 4G/5G, ponto a ponto, IoT): mobilidade com interferência, espectro compartilhado, alcance variável, exposição | MANTIDO | problem |
| 8 | Limites do cobre: distância, categoria, interferência, conector, negociação | MANTIDO | concept (tabela) |
| 9 | Limites da fibra: tipo de fibra, transceptor, conector, potência óptica, raio de curvatura, orçamento óptico, custo | MANTIDO | concept (tabela), problem |
| 10 | Limites do rádio: espectro/canal, potência, obstáculos, ruído, densidade de clientes, segurança | MANTIDO | concept (tabela), internals |
| 11 | Vantagens e usos típicos de cada meio (PoE, backbone, visitantes, IoT…) | MANTIDO | concept (tabela) |
| 12 | Ciclo transmissor → meio → receptor → validação/retransmissão | MANTIDO | internals |
| 13 | Trançamento reduz interferência, mas não elimina distância, blindagem, conector, ruído | MANTIDO | internals |
| 14 | Transceptores convertem elétrico ↔ luz | MANTIDO | internals, glossário (Transceptor/SFP) |
| 15 | Receptor de rádio separa sinal útil de ruído, interferência e reflexões | MANTIDO | internals |
| 16 | Falha física aparece como lentidão de aplicação (TCP retransmite, TLS demora) | MANTIDO | internals |
| 17 | Meios por camada: acesso, distribuição/core, datacenter (spine-leaf, storage), campus, cloud | MANTIDO | architecture |
| 18 | Os três convivem num mesmo caminho (Wi‑Fi → AP → cobre → switch → fibra → core → operadora → cloud) | MANTIDO | architecture, diagrama |
| 19 | Escolha por requisito, não por moda (alcance, disponibilidade, taxa, latência, custo, segurança, manutenção, crescimento) | MANTIDO | architecture |
| 20 | Custo relativo dos meios (cobre por ponto, fibra transceptor/instalação, Wi‑Fi APs/site survey) | MANTIDO | concept (linha Custo) — vinha de deepDive.financialImpact |
| 21 | Quando não usar (Wi‑Fi para crítico sem avaliação, cobre fora da especificação, fibra sem controle) | MANTIDO | concept (linha “Evite quando”) — vinha de deepDive.whenNotToUse |
| 22 | Redundância física para enlace crítico custa mais, mas reduz impacto da indisponibilidade | MANTIDO | architecture, security.vulnerabilities[2], ex1.5.4 |
| 23 | 4 erros comuns (luz acesa ≠ link saudável; Wi‑Fi como cabo invisível; fibra só por ser rápida; ignorar segurança física) | MANTIDO | concept (callout) — vinha de commonMistakes |
| 24 | Teste em casa: cabo melhora → gargalo era o trecho sem fio | MANTIDO | simpleExample |
| 25 | Evidências físicas: porta down, speed/duplex, CRC, input errors, potência óptica, AP lotado, canal saturado | MANTIDO | enterpriseExample, troubleshooting |
| 26 | Cloud: VPC/VNet abstrai, mas zonas, regiões, Direct Connect/ExpressRoute e latência dependem de física; multi-região distribui a dependência | MANTIDO | cloudExample, q1.5.6 |
| 27 | DevSecOps: deploy falha por link/registry lento; IaC não instala fibra | REMOVIDO | genérico, sem relação específica com meios; a separação app/DNS/rota/link está na árvore de decisão |
| 28 | Riscos: porta exposta (ponte indevida), Wi‑Fi além do perímetro (senha compartilhada, WPA antigo, visitante sem isolamento), meio único, rack destrancado | MANTIDO | security.vulnerabilities |
| 29 | Mitigações: shutdown de portas, 802.1X/NAC, VLAN de quarentena, WPA2/WPA3-Enterprise, rotação de credenciais, controle de potência, port-security, controle físico, etiquetagem | MANTIDO | security (goodPractices, hardening, vulnerabilities) |
| 30 | Monitoramento/detecção: link up/down e flaps, mudança de velocidade, CRC, clientes desconhecidos, MAC em portas, APs rogue, porta ativa fora do horário | MANTIDO | security (monitoring, detectionIdeas) |
| 31 | Interferência: certificação de cabos, planejamento de canais, análise de espectro | MANTIDO | internals (tabela de fenômenos) — vinha da tabela de securityExample |
| 32 | Comandos: Get-NetAdapter, netsh wlan show interfaces, ip link/ethtool, iw, show interfaces status, show interfaces counters errors | MANTIDO | troubleshooting.commands |
| 33 | Árvore: só Wi‑Fi falha / só cabo / backbone com perda / app lenta sem perda local | MANTIDO | troubleshooting.decisionTree |
| 34 | Analogia rua / rodovia / alto-falante | MANTIDO | analogy |
| 35 | Atenuação, ruído/interferência e SNR, meio compartilhado (disputa por tempo de ar) | MANTIDO (ampliado) | internals (tabela), glossário, fc1.5.7–9 — exigido pelo objetivo 2 |
| 36 | 1000BASE-T usa 4 pares; 100BASE-TX usa 2 → par ruim pode levar a 100 Mbps | NOVO | internals, ex1.5.2 — base para o exercício e o objetivo 4 |
| 37 | Canal Ethernet em par trançado até 100 m | NOVO | concept (tabela), q1.5.7 |
| 38 | Potência óptica via `show interfaces transceiver` (DOM) | NOVO | troubleshooting.commands |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar cobre, fibra óptica e rádio | concept (definição + tabela), internals, q1.5.1, q1.5.3, fc1.5.2–3 |
| Entender por que distância, interferência, atenuação, ruído e meio compartilhado afetam redes | internals (tabela de fenômenos e validação), concept (limitações), q1.5.5, q1.5.7, fc1.5.7–9, glossário |
| Relacionar escolha do meio com custo, desempenho, segurança e operação | concept (linhas Custo/Evite quando, erros comuns), architecture, security, mentor 3, desafio |
| Reconhecer sintomas comuns de falhas físicas e sem fio | motivation, enterpriseExample, troubleshooting, q1.5.2, q1.5.7, ex1.5.2, mentor 2 |
| Planejar escolha de meio para casa, empresa, datacenter, campus e cloud connectivity | simpleExample, architecture, enterpriseExample, cloudExample, ex1.5.1, ex1.5.4, desafio |

## 10. O que mudou na nova versão
- A tabela comparativa saiu da seção “Evolução” e virou o centro do conceito, transposta (aspecto × meio) e com as linhas Custo e “Evite quando” resgatadas do `deepDive`.
- `history` e `evolution` deixaram de existir; o que explicava o porquê de cada meio virou um parágrafo em `problem`.
- `internals` ganhou a tabela atenuação / ruído-SNR / meio compartilhado e o fato dos pares usados por 1000BASE-T × 100BASE-TX.
- Os 4 `commonMistakes` viraram um callout “Erros comuns” no conceito; `deepDive.mentalModel` virou a primeira linha do resumo.
- `devsecopsExample` removido; `securityExample` fundido em `security`, que perdeu as duplicatas internas.
- Troubleshooting: interpretação de `show interfaces counters errors` ajustada (FCS-Err/Rcv-Err) e novo comando `show interfaces transceiver`.
- Quiz com distratores plausíveis, explicações que ensinam e nova q1.5.7; gabarito redistribuído (antes 6/6 na opção 0).
- Flashcards que repetiam o quiz trocados por atenuação, SNR e meio compartilhado; ex1.5.4 deixou de repetir a mentor 3.
- Removidos os 4 intros invisíveis; `duration` 70-100 min, `estimatedStudyTimeMinutes` 100.

## 11. Depois
Palavras visíveis: 3693 → 4089 (+10,7%) · Duração: 75-110 min → 70-100 min (T 80,8 → 82,8 min) · Quiz corrigido: sim (7 questões)
Checagem da 11.7: cortes brutos 566 palavras (15%), coerente com a linguiça estimada (~15%). O saldo líquido sobe porque ~250 palavras vieram de campos invisíveis (deepDive, commonMistakes), ~150 são conteúdo exigido pelo objetivo 2 (tabela de fenômenos, SNR) e ~240 são do quiz (distratores plausíveis no lugar de absurdos, explicações e a q1.5.7). Todas as frases listadas por `comparar --sumiram` foram reescritas, movidas ou estão no inventário como REMOVIDO.

## 12. Revisão humana
- O módulo m01 lista `lab-1.5` em `requiredLabs`, mas a aula não tem lab (o `progressRules` usa exerciseDone/practicalExerciseDone). Nada foi alterado; conferir se o requisito do módulo está correto.
- Fatos técnicos acrescentados (conferir): canal Ethernet em par trançado até 100 m; 1000BASE-T usa os 4 pares e 100BASE-TX usa 2 (par danificado pode levar a 100 Mbps ou a link nenhum); `show interfaces transceiver` mostra potência Tx/Rx em transceptores com DOM; em `show interfaces counters errors` o CRC aparece como FCS-Err.
- O diagrama usa `svg-node--switch` e `svg-node--server`, que não existem no CSS (já estavam no original; mantidos).
- Palavras visíveis subiram ~11% (motivos na seção 11); a duração quase não mudou porque a aula não estava inflada.
- As URLs das referências IEEE seguem o formato antigo do site (`standards.ieee.org/standard/802_3-2022.html`); mantidas sem verificação.

```json
{
  "id": "1.5", "modulo": "m01", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Meios de transmissão: cobre, fibra e rádio",
  "duracao_declarada": "75-110 min", "T_original_min": 80.8, "duracao_nova": "70-100 min", "T_nova_min": 82.8, "duracao_nova_estimated_max": 100, "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 15, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 0, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 3693, "palavras_visiveis_depois": 4089,
  "palavras_invisiveis_antes": 551, "palavras_invisiveis_depois": 29,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "MOVER:concept",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "ENXUGAR", "devsecopsExample": "REMOVER",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:concept", "commonMistakes": "MOVER:concept",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "MANTER", "quiz": "ENXUGAR", "flashcards": "ENXUGAR",
    "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "ENXUGAR", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Módulo m01 exige lab-1.5 em requiredLabs, mas a aula não tem lab (progressRules usa exerciseDone/practicalExerciseDone).",
    "Conferir fatos acrescentados: limite de 100 m do par trançado; 1000BASE-T usa 4 pares e 100BASE-TX 2; show interfaces transceiver (DOM); FCS-Err em show interfaces counters errors.",
    "Diagrama usa svg-node--switch e svg-node--server, ausentes do CSS (herdado do original).",
    "Palavras visíveis subiram ~11% por conteúdo movido de campos invisíveis, tabela de fenômenos do objetivo 2 e quiz com distratores plausíveis.",
    "URLs das referências IEEE no formato antigo, mantidas sem verificação."
  ]
}
```
