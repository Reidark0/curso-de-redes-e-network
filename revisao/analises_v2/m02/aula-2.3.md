# Aula 2.3 — Camada 1 — Física: bits no fio, luz e rádio (v2)
Base: v1 · Tipo: fundamental · Módulo: m02 (Modelo OSI)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: o que a Camada 1 faz e não faz; meios × limites × sintomas; ler evidências (link, velocidade/duplex, CRC, RSSI/SNR) e reconhecer velocidade reduzida e duplex mismatch. Saíram "conectar com segurança, cloud híbrida e operação" e "coletar evidências" como atividade separada |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 142 palavras; caso da VPN/vídeo com IP, DNS, ping e firewall normais e cabo amassado; consequência (horas na camada errada, troca de equipamento caro); segurança física em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase; 87 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 3: Atenuação (1.5), Patch cord (1.6), Quadro (2.2) |
| Problema 80–150, sem repetir o gancho | cumpre | 112 palavras; abre com "é isso que acontece quando as camadas de cima herdam um meio ruim" e diz o que a aula resolve |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | cadeia bits → sinal → bits no Funcionamento interno + diagrama; saíram comandos Cisco (potência óptica, PoE) |
| Arquitetura só se acrescenta | removida | trechos host/acesso/core/WAN/cloud eram prévias (Direct Connect, ExpressRoute); a frase útil ("do host você vê só o próprio link") foi para o Funcionamento interno |
| Diagrama mantido/corrigido | mantido | sem alteração |
| Erros comuns ≤3, sem repetição | cumpre | 3 (LED aceso; trocar equipamento caro antes do patch cord; insistir na Camada 1 com tudo normal); saiu o das barras do Wi-Fi, agora explicado no Conceito |
| Termos avançados cortados ou no glossário | cumpre | saíram runts, modulação, temporização, codificação de linha, potência óptica, `show interfaces transceiver`, `show power inline`, `a-`/`clear counters`, cross-connect, 802.1X/NAC; transceptor, FCS e late collisions explicados no texto |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample: conector frouxo visto no `Get-NetAdapter` (Up/Disconnected) + Wi-Fi atrás de duas paredes; analogia da estrada em 2 frases, sem callout de "limite" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud, devsecops e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 2) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 7 (1 novo: por que um par ruim derruba para 100 Mbps); fc2.3.5 sem 802.1X, fc2.3.8 sem `clear counters` |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 3 passos (meio, velocidade/duplex/erros em duas leituras, sinal Wi-Fi perto e longe do roteador); 388 palavras do bloco; 15 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2, exercícios 2, desafio enxuto com solução comentada |
| nextTheme 1–2 frases | cumpre | 1 frase (2.4), mantida da v1 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}`, unlocks/accessPolicy preservados; "15-25 min + 45 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/challenge/solution; challenge sem constraints/gradingRubric |

Verificação do quiz contra a aula v2: q2.3.1 (tarefa da Camada 1) → Definição + "não aprende MAC, não roteia" + bullet do CRC (FCS é Camada 2); q2.3.7 (100 Mb/s → par danificado) → bullet "Velocidade abaixo do esperado"; q2.3.3 (Wi-Fi fraco, chamadas picotando) → Conceito (rádio, RSSI/SNR) + exemplo do Wi-Fi; q2.3.6 (evidência mais direta de cabo/porta) → bullet do CRC + parágrafo dos contadores; q2.3.8 (30 clientes, sinal forte) → "clientes de um mesmo canal se revezam"; q2.3.9 (10 km) → tabela de meios. Gabaritos em 2,1,3,0,1,2.

## 2. O que saiu e por quê
- Objetivos 4–6 (sintomas, coletar evidências, segurança/cloud híbrida/operação): fundidos no objetivo 3 ou lista de áreas.
- Motivação: callout "Problema real" virou o próprio gancho; lista de causas (PoE, fibra, rádio) saiu (repetia o Problema/Conceito).
- Problema: lista de 5 itens virou 2 parágrafos curtos; "sintomas podem parecer cloud" saiu.
- Conceito: lista de atributos (frequência, potência, temporização, codificação, modulação): termos avançados.
- Funcionamento interno: "codificação e temporização", "modula ondas", runts (termos avançados); frase da potência óptica e do PoE com comandos Cisco (equipamento que a aula não ensina); erro comum das barras do Wi-Fi (passou a ser explicado no Conceito).
- Arquitetura inteira (prévia de WAN/cloud; resto repetia o Funcionamento).
- Analogia: "trilhos/encanamento" e callout "Limite da analogia" (fundido numa frase).
- enterpriseExample (repetia q2.3.7 e o exercício), cloudExample, devsecopsExample, securityExample (seção do template).
- security e troubleshooting (módulo 2).
- Resumo: item de segurança (seção removida).
- Glossário: Camada física, SNR, CRC error, Autonegociação, Duplex, Transceptor (a aula explica).
- Lab: passos 4 (tabela evidência × camada; virou o exercício ex2.3.6) e 5 ("registrar limites": ritual); scenario, topology, architecture, cost, safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions, challenge/solution (o challenge do lab virou pergunta do mentor).
- Quiz: q2.3.4 (802.1X/NAC: seção de segurança removida; prévia 3.9) e q2.3.5 (cloud: exemplo removido; prévia 14.8).
- Mentor: "por que falha física parece falha de aplicação" (reexplica a ideia central) e "risco de acesso físico" (segurança, prévia 3.9).
- Exercícios: ex2.3.1 (reexplica a ideia central), ex2.3.2 (lista de evidências = Resumo), ex2.3.4 (redundância de links: disponibilidade/WAN, fora do mecanismo da aula).
- Desafio: constraints, gradingRubric e 4 dos 5 entregáveis (ritual); solução encurtada para 5 passos e 2 respostas erradas (saiu "desconectar cabos no rack", que repetia a regra de janela autorizada).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Atributos da Camada 1: frequência, potência, temporização, codificação de linha, modulação | termo avançado | 0.5, 12.2, 12.3 |
| Runts como sintoma de duplex mismatch | termo avançado | 3.1 |
| Potência óptica (`show interfaces transceiver`) e status PoE (`show power inline`) | equipamento não ensinado / prévia | 1.6 (PoE), 12.3 |
| Notação `a-` e `clear counters` do Cisco IOS; `show interfaces status` e `show interfaces counters errors` | equipamento não ensinado (troubleshooting removido) | 2.4, 2.8 |
| Camada 1 por trecho: host, acesso, core, WAN/cloud (cross-connect, Direct Connect, ExpressRoute) | prévia | 1.4, 14.8 |
| Cloud: Camada 1 invisível, zonas, latência entre regiões, conexão dedicada | exemplo por ambiente / prévia | 14.8 |
| DevSecOps: runner em Wi-Fi instável, Terraform não valida o link | exemplo por ambiente | — |
| Fibra mal encaixada/transceptor incompatível derrubando uplink; canal Wi-Fi corporativo mal planejado | exemplo por ambiente (o transceptor segue na tabela de meios) | 12.2 |
| Segurança física: porta exposta, rogue AP, rack aberto, 802.1X/NAC, port security, varredura RF | seção removida (módulo 2); fica 1 frase na Motivação | 3.9, 12.5, 12.8 |
| Redundância de links críticos / link único | fora do mecanismo da aula | 1.4, 14.8 |
| Árvore de decisão do troubleshooting (down, velocidade baixa, CRC, half duplex, Wi-Fi com perda, tudo normal) | seção removida; os casos de cabo seguem nos bullets e nos erros comuns | 2.8 |
| Interfaces virtuais com velocidade muito alta (VPN, WSL, Docker) | ritual do lab (passo 1 ainda manda descartar interfaces virtuais) | — |
| "Ferramentas de software mostram sintomas, mas não certificam cabo, fibra ou rádio" | arquitetura removida; fica "do seu computador você vê só o próprio link" | — |

## 4. Acréscimos
- Conceito: RSSI em dBm com valores de referência (−50 dBm forte, perto de −80 dBm fraco) e SNR explicada no texto. Fecha uma lacuna: q2.3.3, o mentor do "sinal cheio", fc2.3.7 e o passo 3 do lab dependiam disso, e na v1 RSSI/SNR só apareciam num erro comum e no glossário.
- Funcionamento interno: os contadores contam desde que o equipamento ligou ou desde que foram zerados (antes estava ligado a `clear counters`), mais a frase "do seu computador você vê só o próprio link" (vinda da Arquitetura).
- Lab passo 3: repetir a leitura longe do roteador, para o aluno ver o sinal cair.
- Quiz: q2.3.8 (canal compartilhado) e q2.3.9 (meio para 10 km), no lugar de q2.3.4 e q2.3.5.
- Flashcard fc2.3.9 (quatro pares × dois pares).
- Exercício ex2.3.6 (classificar evidências como Camada 1 ou outra camada; vem do passo 4 do lab da v1).
- Mentor "estação que alterna entre 1 Gbps e 100 Mbps" (vem do challenge do lab da v1).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.513 | 4.856 | 3.292 |
| Teoria (palavras) | 2.550 | 2.600 | 1.334 |
| Núcleo (min, fórmula v2) | 28,6 | 29,0 | 19,3 |
| Prática extra (min) | 90 | 80 | 46 (→ 45) |
| duration declarada | 80-115 min | 100-140 min | 15-25 min + 45 min de prática extra |

## 6. Avisos do validar e justificativas
- "análise ainda não escrita": resolvido por este arquivo. Nenhum outro aviso.

## 7. Revisão humana
- Quiz q2.3.6: a v1 perguntava qual comando Cisco (`show interfaces counters errors`) trazia a evidência mais direta. Como a aula não ensina Cisco IOS, a pergunta ficou sem plataforma ("contador de erros CRC crescendo entre duas leituras"); o id foi mantido porque a intenção é a mesma. Confirme.
- Quiz q2.3.7: o distrator "VLAN errada na porta" (VLAN só vem na 2.4) virou "Rota padrão errada na estação".
- Valores de RSSI (−50 dBm forte, perto de −80 dBm fraco) acrescentados ao Conceito: são referências de mercado comuns, mas não estavam na v1.
- Lab: `netstat -e` no Windows mostra erros somados de todas as interfaces, não só da cabeada; comandos não testados em Windows nem em Linux real neste ambiente.
- Duplex mismatch e erros CRC continuam explicados com detalhe (é o mecanismo da aula), por isso o Funcionamento interno ficou com 397 palavras.
- Tema muito próximo de 0.5 e 1.5 (cobre, fibra, rádio, atenuação). Mantive a tabela de meios porque q2.3.9 e o objetivo 2 dependem dela; vale conferir a sobreposição no fim do módulo.
- labType "security" mantido da v1, embora o lab seja de diagnóstico.
- references e linksToOtherCourses (incluindo o link sobre 802.1X/NAC no curso de IAM) mantidos da v1.

```json
{
  "id": "2.3", "modulo": "m02", "titulo": "Camada 1 — Física: bits no fio, luz e rádio", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 13,
  "acrescimos": ["Conceito: RSSI (dBm, valores de referência) e SNR", "Funcionamento: contadores acumulam desde que o equipamento ligou ou foi zerado; 'do host você vê só o próprio link'", "Lab passo 3: repetir a leitura longe do roteador", "Quiz q2.3.8 (canal compartilhado) e q2.3.9 (meio para 10 km)", "Flashcard fc2.3.9", "Exercício ex2.3.6 (classificar evidências)", "Mentor: estação alternando 1 Gbps/100 Mbps"],
  "palavras_visiveis": { "original": 4513, "v1": 4856, "v2": 3292 },
  "nucleo_min": { "original": 28.6, "v1": 29.0, "v2": 19.3 }, "pratica_extra_min": { "original": 90, "v1": 80, "v2": 45 },
  "duration_v2": "15-25 min + 45 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Conceito explica RSSI e SNR no próprio texto e o Funcionamento interno concentra autonegociação, duplex mismatch e CRC sem comandos Cisco nem a Arquitetura repetida.",
  "revisao_humana": ["q2.3.6 reescrita sem Cisco, id mantido", "Distrator VLAN da q2.3.7 trocado", "Valores de RSSI acrescentados", "netstat -e soma todas as interfaces; comandos do lab não testados", "Funcionamento interno com 397 palavras", "Sobreposição com 0.5 e 1.5", "labType security mantido", "references/linksToOtherCourses mantidos da v1"]
}
```
