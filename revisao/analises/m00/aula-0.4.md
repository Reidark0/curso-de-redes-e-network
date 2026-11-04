# Aula 0.4 — Bit vs Byte em redes
Tipo: intermediária (fundamental de conceito + cálculo, sem lab) · Duração declarada: 60-85 min · Palavras visíveis / invisíveis (antes): 4927 / 610

## 1. Duração
T pela fórmula = 89,2 min (teoria 27,2, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0)
Veredito: ORGANIZADA — M = 72,5 min fica no limite inferior (0,8×T = 71,4). A divisão (34% leitura, 66% prática de cálculo/diagnóstico) faz sentido para uma aula de conversão de unidades. A faixa declarada está um pouco abaixo do tempo real; a nova versão usa a faixa da fórmula.

## 2. Encheção de linguiça
Nível: MÉDIA (~15%, no limite inferior). Evidências:
- `motivation`: lista longa de contextos ("chamados de suporte, testes de internet, dimensionamento de links, cópias de backup, replicação entre datacenters…") + meta-texto "Nesta aula, você vai aprender a pensar como profissional" + "Essa habilidade será usada em todos os módulos seguintes".
- `history`: "Nas aulas anteriores, vimos que bytes podem representar…" (meta-texto) e redefinição de bit/byte, repetida em `concept`, `summary`, glossário e flashcards.
- `problem`: a "Regra mental" (÷8 / ×8) repete a definição de `concept`, as fórmulas de `internals`, o `summary` e os flashcards fc0.4.3/4; a lista "Erro 1…5" repete `commonMistakes` (invisível) e `security.commonErrors`; o parágrafo "Um técnico pode… Um gestor pode… Um analista…" desdobra em cinco frases o que cabe em uma.
- `evolution`: 1º parágrafo genérico ("a confusão não desapareceu; ela ficou mais cara"); o 2º parágrafo e a tabela são úteis, mas pertencem a concept/internals.
- `securityExample`: a tabela de riscos repete `security.vulnerabilities` (exfiltração, SIEM, firewall) e `security.badPractices` (speedtest por Wi-Fi); aviso de ética padrão ("Esta aula não ensina ataque…").
- `devsecopsExample`: 3º parágrafo genérico ("scanners, SBOMs, logs e artefatos geram dados… Unidade correta ajuda a dimensionar controles sem achismo").
- `cloudExample`: callout "Impacto financeiro" repete o parágrafo anterior.
- `analogy`: limite da analogia em três frases.
- `security`: itens duplicados entre listas ("Comparar Mbps e MB/s sem conversão" × "Interpretar 50 MB/s como 50 Mbps"; "Dimensionar VPN e TLS inspection com margem" × "Dimensionar firewall, proxy, VPN e SIEM com recursos reais ativados"; "Converter unidades automaticamente nos relatórios" × "Padronizar dashboards com unidade explícita").
- `quiz` q0.4.6: distratores triviais ("Mouse e teclado", "CPU e cor do cabo").
- Invisíveis: `labIntro` (frase-padrão repetida em 39 aulas), `exercisesIntro`, `challengeIntro`, `solutionIntro`, `deepDive` (311 palavras, quase tudo repetido no conteúdo) e `commonMistakes`.

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: tabela de conversão Mbps → MB/s, encapsulamento HTTP/TLS/TCP/IP/Ethernet explicando o overhead, exemplos numéricos corretos (55 MB/s = 440 Mbps; 500 GB a 1 Gbps ≈ 4000 s; 1,2 GB em 60 s = 20 MB/s = 160 Mbps; 80 MB/s = 640 Mbps), comandos de troubleshooting com interpretação, árvore de decisão, desafio bem desenhado com rubrica.
Lacunas: (1) o objetivo 1 cita GiB, mas a aula não explica prefixos decimais × binários (só aparece de passagem em `security.commonErrors` e no invisível `deepDive`); (2) o overhead é sempre qualitativo, sem um número que mostre quanto os cabeçalhos custam num caso bom; (3) a conversão taxa → volume aparece no exercício 4, mas não no conteúdo do exemplo de cloud.
Erros técnicos: nenhum. A frase "não baixa em 10 segundos apenas porque 100 parece maior que 1" era vaga; agora mostra a conta (8000 Mb ÷ 100 Mbps = 80 s).

## 4. Aproveitamento
BOM — ~92% do T original (89,2 min) vai para algo que ensina ou pratica os objetivos: a linguiça visível é ~740 palavras (~5,7 min) mais ~1 min da questão trivial. Contra a duração declarada (M = 72,5) o aproveitamento seria igualmente alto; a declarada só subestima um pouco o tempo total.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~7%. O tempo é dominado por exercícios (24 min) e desafio (20 min), que são o núcleo prático; a redundância está só na teoria.

## 6. Explicação mais direta
SIM — (a) `evolution` dissolvida: a tabela nominal/útil/overhead/volume foi para `concept` e o parágrafo sobre gargalos e Wi-Fi para `internals`; (b) `problem`: a lista de erros e o `commonMistakes` invisível viraram uma tabela erro → causa → consequência → correção; a conta 1 GB/100 Mbps virou exemplo numérico; (c) `concept`: a definição operacional já traz as duas regras (÷8, ×8) e o lembrete b/B; (d) `securityExample`: a tabela de riscos (duplicada) deu lugar à conta completa de volume (48 GB); (e) `summary` com 5 bullets, abrindo pelo modelo mental.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantido o caso 500 Mbps × 500 MB/s e o callout 300 Mbps/32 MB/s; a lista de contextos e o meta-texto viraram uma frase com o método (unidade → conversão → overhead → diagnóstico). |
| history | ENXUGAR | Explica por que rede mede bits e arquivo mede bytes: fica em 1 parágrafo + tabela; sai a redefinição de bit/byte e o "nas aulas anteriores". |
| problem | ENXUGAR | Conta 1 GB/100 Mbps explícita; os 5 parágrafos de "quem erra" em 1 frase; "Regra mental" removida (duplicada); lista de erros vira tabela com `commonMistakes`. |
| evolution | FUNDIR:concept/internals | Tabela de conceitos → concept; parágrafo nominal × útil e Wi-Fi → internals; 1º parágrafo genérico removido. |
| concept | MANTER | Núcleo; recebeu a tabela de evolution e a subseção GB × GiB (lacuna do objetivo 1). |
| internals | MANTER | Encapsulamento mantido; acrescentado o cálculo do overhead Ethernet/IP/TCP (1460/1538 ≈ 95%) e a fórmula de volume. |
| architecture | ENXUGAR | Lista por camada mantida, com os fatos do 1º parágrafo distribuídos nela; exemplo Kubernetes/registry sai (coberto em devsecopsExample). |
| analogy | ENXUGAR | Analogia boa; limite em 1 frase. |
| simpleExample | MANTER | Concreto (55 MB/s → 440 Mbps). |
| enterpriseExample | MANTER | Conta de backup 500 GB; 2º parágrafo encurtado. |
| cloudExample | ENXUGAR | Callout repetido sai; entra a conversão taxa → volume (100 Mbps por 24 h ≈ 1 TB), ligada ao learningOutcome de custo por GB. |
| devsecopsExample | ENXUGAR | Conta 1,2 GB/60 s e gargalos mantidos; 3º parágrafo genérico removido. |
| securityExample | FUNDIR:security | Tabela de riscos e aviso de ética saem (duplicados em `security`); fica a conta 80 MB/s × 600 s = 48 GB. |
| diagram | MANTER | Correto e legível; só o `<h2>` perdeu o número. |
| labIntro | REMOVER | Invisível; frase-padrão de 39 aulas. A aula não tem lab e `progressRules` não exige (`exerciseDone`/`practicalExerciseDone`). |
| exercisesIntro | REMOVER | Invisível, meta-texto. |
| challengeIntro | REMOVER | Invisível, meta-texto. |
| solutionIntro | REMOVER | Invisível, meta-texto. |
| summary | MANTER | 5 bullets, 1º = `deepDive.mentalModel`. |
| nextTheme | ENXUGAR | 1 frase, coerente com 0.5. |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary/concept/troubleshooting | mentalModel → summary; MiB/GiB (whenNotToUse) → concept; limitations já estão em concept/internals/troubleshooting; operational/financial/securityImpact repetem cloud/security; keyTerms "goodput" → concept. Campo removido. |
| commonMistakes | MOVER:problem | Os 4 erros (com causa, consequência e correção) estão na tabela "Erros comuns". Campo removido. |
| security | ENXUGAR | Removidos 5 itens duplicados entre listas; acrescentada 1 boa prática que guarda o aviso de autorização para testes ativos (vindo de securityExample). |
| troubleshooting | MANTER | Comandos corretos e com interpretação; árvore de decisão com referência ao overhead de ~5%. |
| lab | MANTER (inexistente) | A aula não tem lab; nada a fazer. |
| quiz | ENXUGAR | q0.4.6 (distratores triviais) substituída por q0.4.7 (taxa → volume); acrescentada q0.4.8 (GB × GiB). 7 questões. |
| flashcards | MANTER | 6 mantidos + fc0.4.7 (GB × GiB) e fc0.4.8 (tempo de transferência). |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, boas. |
| exercises | MANTER | 4, com expectedAnswer. |
| challenge | MANTER | Bem delimitado, rubrica única. |
| commentedSolution | MANTER | Correta e completa. |
| glossary | MANTER | 6 termos usados + GiB (agora explicado na aula). |
| references | MANTER | Referências internas reais. |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Bit = menor unidade lógica, 0 ou 1 | MANTIDO | concept, glossário |
| 2 | Byte = 8 bits | MANTIDO | concept, summary, glossário |
| 3 | Rede mede bps/Kbps/Mbps/Gbps; arquivos em B/KB/MB/GB e MB/s | MANTIDO | history (tabela), concept |
| 4 | Por que rede mede bits (sinais no meio) e arquivo mede bytes | MANTIDO | history |
| 5 | Tabela área × unidade × o que mede (telecom, arquivos, armazenamento, cloud billing) | MANTIDO | history |
| 6 | b minúsculo × B maiúsculo | MANTIDO | concept, problem (tabela) |
| 7 | Mbps ÷ 8 = MB/s teórico; MB/s × 8 = Mbps | MANTIDO | concept (definição), internals (fórmulas), summary |
| 8 | Tabela 100/300/500 Mbps, 1/10 Gbps → MB/s, com observações | MANTIDO | concept |
| 9 | 500 Mbps → 62,5 MB/s; 300 Mbps/32 MB/s ≈ 256 Mbps | MANTIDO | motivation |
| 10 | 1 GB a 100 Mbps não baixa em 10 s (agora: 80 s no melhor caso) | MANTIDO | problem |
| 11 | A rede transporta quadros, cabeçalhos, confirmações, criptografia, retransmissões | MANTIDO | problem |
| 12 | Erros comuns (Mbps × MB/s, nominal × útil, teste por Wi-Fi, servidor lento, taxa × volume) com causa/correção | MANTIDO | problem (tabela "Erros comuns") |
| 13 | Nominal, throughput útil (goodput), overhead, volume transferido | MANTIDO | concept (tabela) |
| 14 | Throughput útil < nominal por TCP, TLS, MTU, VPN, inspeção, latência, perda, janela TCP, servidor, storage, CPU | MANTIDO | internals |
| 15 | Wi-Fi: meio compartilhado, interferência, half-duplex na prática | MANTIDO | internals |
| 16 | 1º parágrafo de evolution ("a confusão ficou mais cara") | REMOVIDO | genérico; o custo do erro está em problem, architecture e cloudExample |
| 17 | Encapsulamento aplicação → HTTP → TLS → TCP → IP → Ethernet/Wi-Fi → meio físico | MANTIDO | internals |
| 18 | Fórmulas: tamanho em megabits = MB × 8; tempo ≈ megabits ÷ Mbps | MANTIDO | internals, fc0.4.8 |
| 19 | Pontos onde bit/byte aparecem por camada (física, transporte, segurança, aplicação, cloud) | MANTIDO | architecture |
| 20 | Firewall de 5 Gbps pode não entregar 5 Gbps com inspeções; link maior não resolve gargalo de disco | MANTIDO | architecture, mentor 3, security.vulnerabilities |
| 21 | Kubernetes lento por registry/autenticação/proxy/armazenamento | MANTIDO | devsecopsExample (registry distante, autenticação, proxy, disco) |
| 22 | Analogia estrada/caminhões/carga/overhead | MANTIDO | analogy |
| 23 | 55 MB/s × 8 = 440 Mbps num plano de 500 Mbps; atalho mental | MANTIDO | simpleExample, diagram |
| 24 | Backup de 500 GB ≈ 4000 Gb ≈ 4000 s a 1 Gbps; o que medir | MANTIDO | enterpriseExample |
| 25 | Cloud cobra por volume (egress, entre zonas); NAT GW/LB/firewall por hora/GB | MANTIDO | cloudExample, quiz q0.4.7 |
| 26 | Perguntas de arquitetura cloud (pico, volume, zonas, cache, private endpoint, logs) | MANTIDO | cloudExample |
| 27 | Callout "Impacto financeiro" (custo recorrente de tráfego/logs) | REMOVIDO | duplicado no parágrafo de cloudExample |
| 28 | Imagem de 1,2 GB em 60 s = 20 MB/s = 160 Mbps; gargalos de pipeline; soluções (cache, mirror, imagens menores) | MANTIDO | devsecopsExample |
| 29 | SBOMs/logs enviados para fora geram custo e risco | REMOVIDO | genérico; custo de volume já em cloudExample e security.monitoring |
| 30 | 80 MB/s = 640 Mbps; volume em 10 min (agora 48 GB explícito) | MANTIDO | securityExample, quiz q0.4.5 |
| 31 | Riscos: subestimar exfiltração, SIEM mal dimensionado, firewall subdimensionado, speedtest enganoso | MANTIDO | security.vulnerabilities e badPractices (tabela removida de securityExample por duplicar) |
| 32 | Medições ativas/teste de carga só com autorização | MANTIDO | security.goodPractices |
| 33 | MB decimal × MiB binário | MANTIDO | concept (GB × GiB), security.commonErrors, fc0.4.7, q0.4.8, glossário |
| 34 | Comandos Get-NetAdapter/Get-Counter, Test-NetConnection, ip -s link, /sys/.../speed, sar, ss -ti, show interfaces | MANTIDO | troubleshooting.commands |
| 35 | Árvore de decisão (×8, overhead normal, cabo/sem VPN, Wi-Fi, VPN/MTU) | MANTIDO | troubleshooting.decisionTree |
| 36 | Monitoramento, hardening (QoS, cache, segmentação, alertas por volume/taxa), detecção por baseline | MANTIDO | security |
| 37 | Itens de security duplicados entre listas (5) | REMOVIDO | duplicados em outras listas de security ou na tabela de problem |
| 38 | Taxa média × pico (deepDive.whenNotToUse) | MANTIDO | troubleshooting.diagnosticQuestions ("nominal, média, pico") e cloudExample ("taxa de pico") |
| 39 | Impactos operacional/financeiro/segurança (deepDive) | REMOVIDO | repetidos em architecture, cloudExample e security |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar bit, byte, bps, B/s, Mbps, MB/s, Gbps e GiB | concept (definição, b × B, subseção GB × GiB), history (tabela), glossário, q0.4.3, q0.4.8, fc0.4.1/2/7 |
| Converter velocidades de rede para taxas de transferência | concept (tabela), internals (fórmulas), simpleExample, q0.4.1/2, exercícios 1–2, desafio |
| Explicar por que a velocidade útil é menor que a nominal | concept (tabela nominal/útil), internals (cálculo do overhead e gargalos), q0.4.4, mentor 2, exercício 3 |
| Relacionar overhead com Ethernet, IP, TCP, TLS, HTTP, VPN, Wi-Fi e cloud | internals (encapsulamento, 1460/1538, VPN, Wi-Fi), architecture, cloudExample, diagram |
| Evitar diagnósticos incorretos (speedtest, downloads, backups, logs, serviços) | problem (Erros comuns), enterpriseExample, devsecopsExample, securityExample, troubleshooting, desafio e solução comentada |

## 10. O que mudou na nova versão
- Removidos `evolution` (fundida em concept/internals), `labIntro`, `exercisesIntro`, `challengeIntro`, `solutionIntro`, `deepDive` e `commonMistakes` (movidos para onde o aluno vê).
- Acrescentado (lacuna do objetivo 1): subseção "Prefixos decimais e binários: GB × GiB" em concept, glossário GiB, fc0.4.7 e q0.4.8.
- Acrescentado (objetivos 3 e 4): cálculo do overhead Ethernet/IPv4/TCP com MTU 1500 (1460/1538 ≈ 95% → ~949 Mbps / ~118 MB/s numa porta de 1 Gbps) em internals; referência a ~5% no summary e na árvore de decisão.
- Exemplos com a conta completa: 1 GB a 100 Mbps = 80 s (problem); 100 Mbps por 24 h ≈ 1 TB (cloudExample, q0.4.7); 80 MB/s por 10 min = 48 GB (securityExample); fórmula de volume em internals.
- `problem`: tabela "Erros comuns" (erro, causa, consequência, correção) no lugar da lista e do callout repetido.
- `securityExample`: tabela de riscos e aviso de ética saem (duplicados em `security`); o aviso de autorização virou uma boa prática em `security.goodPractices`.
- `security`: 5 itens duplicados removidos.
- Quiz: normalizado (`answer` numérico); q0.4.6 substituída por q0.4.7; q0.4.8 nova. Respostas nas posições 2, 3, 2, 1, 0, 3, 1. As opções das questões mantidas não foram reordenadas.
- Flashcards: +fc0.4.8 (tempo de transferência).
- Títulos `<h2>` sem número; tabelas novas e antigas envolvidas em `responsive-table`.
- `duration` 60-85 → 75-110 min; `estimatedStudyTimeMinutes` 85 → 110.

## 11. Depois
Palavras visíveis: 4927 → 4934 (+0,1%; cortes brutos 680 = 14%, acréscimos brutos 687, dos quais ~130 vieram de campos invisíveis e ~350 cobrem as lacunas GiB/overhead e as questões e flashcards novos) · Invisíveis: 610 → 42 (só `networkContext`) · Duração: declarada 60-85 min → nova 75-110 min (T 89,2 → 89,9) · Quiz corrigido: sim (7 questões)

Aviso do `validar` (justificado): "ids de quiz originais ausentes: q0.4.6". A questão foi substituída de propósito por ter distratores triviais (regra 7.7); o novo id q0.4.7 é inédito e o id antigo não foi reaproveitado.

## 12. Revisão humana
- O módulo m00 lista `lab-0.4` em `assessment.requiredLabs`, mas a aula 0.4 não tem lab (nem no original) e `progressRules` usa `exerciseDone`/`practicalExerciseDone`. Nada foi alterado; convém conferir a lista do módulo.
- Números acrescentados que vale conferir: quadro Ethernet com MTU 1500 ≈ 1538 bytes no fio (preâmbulo/SFD 8 + cabeçalho 14 + FCS 4 + IFG 12), payload TCP 1460 → ≈ 95%, ~949 Mbps / ~118 MB/s em 1 Gbps; 1 GiB = 1.073.741.824 bytes; disco de 1 TB ≈ 931 GiB no Windows.
- A duração sobe de 60-85 para 75-110 min por causa da fórmula fixa (T 89,9); a original já estava no limite inferior.

```json
{
  "id": "0.4", "modulo": "m00", "tipo": "intermediária", "status": "CONCLUIDA",
  "titulo": "Bit vs Byte em redes",
  "duracao_declarada": "60-85 min", "T_original_min": 89.2, "duracao_nova": "75-110 min", "T_nova_min": 89.9, "duracao_nova_estimated_max": 110,
  "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 15, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 7, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4927, "palavras_visiveis_depois": 4934,
  "palavras_invisiveis_antes": 610, "palavras_invisiveis_depois": 42,
  "secoes": {
    "motivation": "ENXUGAR", "history": "ENXUGAR", "problem": "ENXUGAR", "evolution": "FUNDIR:concept/internals",
    "concept": "MANTER", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary/concept/troubleshooting", "commonMistakes": "MOVER:problem",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "MANTER", "quiz": "ENXUGAR", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Módulo m00 lista lab-0.4 em requiredLabs, mas a aula não tem lab (nem no original); progressRules não exige lab.",
    "Conferir números acrescentados: overhead Ethernet/IPv4/TCP com MTU 1500 (1460/1538 ≈ 95%, ~949 Mbps / ~118 MB/s em 1 Gbps); 1 GiB = 1.073.741.824 bytes; 1 TB ≈ 931 GiB.",
    "Duração sobe de 60-85 para 75-110 min pela fórmula fixa (T 89,9)."
  ]
}
```
