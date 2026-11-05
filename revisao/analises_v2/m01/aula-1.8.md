# Aula 1.8 — Métricas: latência, jitter, perda, throughput e disponibilidade (v2)
Base: v1 · Tipo: fundamental · Módulo: m01 (Fundamentos de Redes)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: sintoma → métrica; medir por trecho e analisar uma série (média, percentil, jitter); disponibilidade (cálculo, SLA × SLO). Saíram "muita banda e ainda lenta" (objetivo 2 da 0.6), Cisco IOS, segurança/observabilidade e a lista de ambientes |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 136 palavras; gancho = chamada de vídeo que trava com teste de velocidade de 480 Mbps; consequência = plano de 1 Gbps que não resolve; carreira = 1 frase (chamado "sistema lento", provedor × time da aplicação) |
| Resumo 4–5 itens + frase final | cumpre | 5 itens, 89 palavras com a frase final |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 3: ICMP (4.8), DNS (7.1), TLS (8.3). Saíram os 8 da v1 (latência, jitter, perda, throughput, disponibilidade, SLO, largura de banda, percentil): a aula ou a 0.6 os explica |
| Problema 80–150, sem repetir o gancho | cumpre | 115 palavras; "é isso que acontece quando conectividade é confundida com qualidade"; aponta a 0.6 para o que já foi ensinado e diz o que esta aula acrescenta (método) |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | medir por trecho no Funcionamento interno + diagrama (trecho local/externo); a tabela sintoma → métrica fica só no Conceito |
| Arquitetura só se acrescenta | removida | camadas OSI com CRC, duplex, VLAN, STP, NAT, TCP/UDP (prévias do módulo 2+); os "limites de cada medição" úteis viraram o callout |
| Diagrama mantido/corrigido | mantido (ajustado) | "Firewall" → "Gateway" (classe neutra), "WAN/Cloud" → "Internet", acrescentadas as faixas "trecho local" e "trecho externo" para casar com o método da aula |
| Erros comuns ≤3, sem repetição | cumpre | 3 limites de medição: ping sem resposta ≠ serviço fora; teste de velocidade ≠ rede boa; disponibilidade medida de um só ponto. Os 3 da v1 saíram (banda × throughput é da 0.6; os outros repetiam o texto) |
| Termos avançados cortados ou no glossário | cumpre | saíram QoS, MTU, janela TCP, overhead, mdev, CRC, VPC/NAT gateway, service mesh, egress, DLP/UEBA; ICMP, DNS e TLS no glossário |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample novo: a chamada do quarto medida por trecho (3 linhas de ping) resolve o gancho; analogia da estrada em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e devsecops removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 1) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6: fc1.8.2, .3, .5, .6, .7 + fc1.8.9 novo (medir por trecho) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos (gateway, externo, tempo da aplicação, analisar a série); 425 palavras; 20 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (backup × voz; disponibilidade vista da filial), exercícios 2 (série de voz; SLA de 99,9%), desafio da filial simplificado com solução |
| nextTheme 1–2 frases | cumpre | 1 frase (1.9), mantida da v1 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}`, unlocks/accessPolicy preservados; "15-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/challenge/solution; challenge sem constraints/gradingRubric |

Verificação do quiz contra a aula v2: q1.8.3 (voz falha com média boa → jitter) → tabela do Conceito + série de pings; q1.8.5 (quedas de 5 min várias vezes → disponibilidade) → tabela e último parágrafo do Conceito; q1.8.6 (perda até o gateway → trecho local) → Medir por trecho, passo 1; q1.8.7 (99,9% → ≈ 43 min) → tabela de disponibilidade; q1.8.8 (curl dns=1.9 total=2.3 → DNS) → Medir por trecho, passo 3; q1.8.10 (ping 100% de perda e site abre → ICMP bloqueado) → Erros comuns. Gabaritos em 2, 3, 1, 2, 3, 0.

## 2. O que saiu e por quê
- Sobreposição com a 0.6 (latência, largura de banda e throughput; componentes da latência; medir RTT, variação e perda com ping): a lista "cada métrica nasce de um mecanismo" (transmissão, propagação, processamento, fila), a tabela "Como ler a saída do ping" e a seção "Por que muita banda ainda pode parecer lenta" (janela ÷ RTT). O Conceito recapitula as definições em 1 caixa e aponta a 0.6.
- Objetivos 2 a 6 da v1 (repetiam a 0.6, listavam ambientes, Cisco IOS, segurança/observabilidade).
- Motivação: lista de 11 causas de lentidão (VPN com MTU, cloud em região distante, ataque) e o cenário do SOC (virou a frase de carreira).
- Problema: história "cabo e hub → ponta a ponta" e a lista "Sem medir X…" (repetia a tabela do Conceito).
- Arquitetura inteira (camadas com CRC, duplex, VLAN, STP, NAT, TCP/UDP: prévias do módulo 2+; "limites de cada medição" aproveitados no callout; traceroute e correlação com logs: 1.9/15.2).
- Analogia: "limite da analogia" (retransmissão, filas de buffer, TCP/UDP).
- simpleExample da v1: o caso Wi‑Fi do quarto virou gancho + exemplo medido; "50 MB/s × 8 = 400 Mbps" ficou só como "MB/s × 8" na tabela (é da 0.4); "site lento por DNS/TLS" foi para o passo 3 do Funcionamento.
- enterpriseExample (ERP da filial, firewall, inspeção TLS), cloudExample (VPC, NAT gateway, egress), devsecopsExample (runners, Kubernetes, service mesh): seção do template.
- security e troubleshooting (módulo 1), incluindo os comandos Cisco IOS.
- Lab: passo de traceroute (ensinado na 1.9), passo "Registrar interpretação" (ritual) trocado por "Analisar a série e decidir"; safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions, challenge/solution do lab.
- Quiz: q1.8.2 (definição de throughput: conteúdo da 0.6), q1.8.4 (exfiltração: segurança, seção removida), q1.8.9 (janela ÷ RTT: prévia da 6.4 e objetivo 2 da 0.6).
- Flashcards: fc1.8.1 e fc1.8.4 (definições da 0.6), fc1.8.8 (MB/s → Mbps, da 0.4).
- Mentor: "por que 'rede lenta' não é diagnóstico" (reexplicava a ideia central) e "vídeo picota com alta vazão" (repetia q1.8.3); "API em cloud lenta numa filial" virou o desafio.
- Exercícios: ex1.8.1 (banda × throughput, 0.6), ex1.8.3 (perda no gateway, repetia q1.8.6), ex1.8.4 (exfiltração, segurança).
- Desafio: constraints, gradingRubric, 5 entregáveis e a parte de "riscos de segurança", cloud, proxy e autenticação.
- Referência "Cisco interface and troubleshooting commands" (os comandos Cisco saíram da aula).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Componentes da latência (transmissão, propagação, processamento, fila) | já ensinado | 0.6 |
| Leitura da saída do ping (perdidos, mín/máx/média, mdev) | já ensinado (ping usado no lab e no texto) | 0.6, 1.9, 4.8 |
| Throughput por conexão limitado a janela ÷ RTT (64 KB, 100 ms ≈ 5,2 Mbps) | prévia / sobreposição | 6.4 (e 0.6, objetivo 2) |
| Causas de jitter e perda (filas, congestionamento, QoS, MTU, fila cheia) | já ensinado / termo avançado | 0.6, 6.4 |
| Camadas que pioram cada métrica (CRC, duplex, VLAN, STP, NAT, TCP × UDP) | prévia | 2.3–2.6, 6.5 |
| Traceroute e caminhos assimétricos | prévia | 1.9, 4.8, 11.9 |
| Correlacionar gráficos com logs, mudanças e eventos de segurança | prévia | 15.2 |
| MB/s × 8 = Mbps (exemplo de 50 MB/s) | já ensinado (fica na tabela como unidade) | 0.4 |
| Métricas em cloud (VPC, NAT gateway, egress, regiões, custo de observabilidade) | exemplo por ambiente | 14.2, 14.x |
| Pipeline/Kubernetes, service mesh, NetworkPolicies | exemplo por ambiente | — (curso de DevSecOps) |
| ERP da filial com backup concorrente e inspeção TLS | exemplo por ambiente (a ideia da filial ficou no desafio) | — |
| Exfiltração por throughput de saída, saturação de firewall/DDoS, falsa disponibilidade, baselines, DLP/UEBA | seção removida (módulo 1) | 16.9, 16.10, 13.7 |
| Comandos Cisco IOS (show interfaces, show processes cpu) e árvore de decisão | seção removida (módulo 1) | 4.9, 15.3 |
| Test-NetConnection (teste de porta TCP) | seção removida | 15.6 |
| Cenário do SOC sem bloqueio no firewall | reduzido à frase de carreira | — |

## 4. Acréscimos
- Conceito: parágrafo "o tipo de tráfego diz qual pergunta fazer primeiro" (voz/vídeo → jitter e perda; backup → throughput; muitos cliques → latência; quedas → disponibilidade). Sustenta o objetivo 1, q1.8.3 e q1.8.5.
- Funcionamento interno: "Medir por trecho" em 3 passos (gateway, destino externo, aplicação com curl), ligando à 1.7. Antes estava espalhado entre troubleshooting, lab e quiz; q1.8.6 e q1.8.8 dependem dele.
- Erros comuns reescritos com os "limites de cada medição" da Arquitetura da v1 (ping bloqueado, teste de velocidade, disponibilidade de um ponto).
- simpleExample novo com valores ilustrativos (quarto 10% de perda e 4–180 ms; sala 0% e 2–5 ms; 8.8.8.8 14–19 ms).
- Diagrama: faixas "trecho local" e "trecho externo".
- Quiz q1.8.10 (ping 100% de perda e site abre). Flashcard fc1.8.9. Mentor: backup × voz; disponibilidade vista da filial. Exercício ex1.8.6 (três quedas somando 60 min contra SLA de 99,9%).
- Lab: passo 4 "Analisar a série e decidir" (aplica média, picos e jitter aos dados do próprio aluno).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.969 | 5.778 | 3.344 |
| Teoria (palavras) | 2.879 | 3.290 | 1.493 |
| Núcleo (min, fórmula v2) | 31,1 | 36,3 | 20,5 |
| Prática extra (min) | 90 | 90 | 51 (→ 50) |
| duration declarada | 80-115 min | 115-160 min | 15-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- "análise ainda não escrita": resolvido por este arquivo. Nenhum outro aviso.
- Lab com 425 palavras (alvo ~300–400): os comandos de Windows e Linux em 3 passos ocupam a maior parte; não há ritual restante.

## 7. Revisão humana
- Sobreposição com a 0.6: cortei o que os objetivos da 0.6 v2 cobrem (componentes da latência, leitura do ping, "mais banda nem sempre é mais rápido", incluindo janela ÷ RTT). Não li o conteúdo da 0.6; confirme se ela de fato mostra a leitura do ping (perda, mín/máx/média) que o lab desta aula usa sem explicar.
- Diagrama: rótulos trocados (Firewall → Gateway, WAN/Cloud → Internet) e faixas de trecho acrescentadas; confira a renderização (as faixas usam y=48–60, acima dos nós).
- Lab, Windows: `Measure-Command { Invoke-WebRequest … }` mantido da v1 (só tempo total; não testado). `curl.exe` com `-w` também existe no Windows 10+ e daria as etapas, mas não foi testado, então não entrou.
- Valores do simpleExample e do exemplo de saída do lab são ilustrativos (não são saídas reais capturadas).
- `labType` "security" mantido da v1, embora o lab agora seja de medição/diagnóstico.
- references (0.4, 0.6, IETF IPPM Framework, com url vazia) e linksToOtherCourses mantidos da v1.

```json
{
  "id": "1.8", "modulo": "m01", "titulo": "Métricas: latência, jitter, perda, throughput e disponibilidade", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "security", "troubleshooting"],
  "conceitos_removidos": 15,
  "acrescimos": ["Conceito: tipo de tráfego → métrica a medir primeiro", "Funcionamento interno: medir por trecho (gateway, externo, aplicação)", "Erros comuns reescritos com os limites de medição", "simpleExample novo: chamada do quarto medida por trecho", "Diagrama: faixas trecho local/externo", "Quiz q1.8.10", "Flashcard fc1.8.9", "Mentor: backup × voz; disponibilidade da filial", "Exercício ex1.8.6 (SLA 99,9%)", "Lab: passo de análise da série"],
  "palavras_visiveis": { "original": 4969, "v1": 5778, "v2": 3344 },
  "nucleo_min": { "original": 31.1, "v1": 36.3, "v2": 20.5 }, "pratica_extra_min": { "original": 90, "v1": 90, "v2": 50 },
  "duration_v2": "15-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O que a 0.6 já ensina virou uma caixa de recapitulação, e o espaço foi para o método próprio da aula: sintoma → métrica, medir por trecho, ler a série além da média e calcular disponibilidade.",
  "revisao_humana": ["Confirmar que a 0.6 cobre a leitura do ping usada sem explicação", "Rótulos e faixas novas no diagrama", "Measure-Command do lab no Windows não testado; curl.exe não incluído", "Valores do simpleExample e do lab são ilustrativos", "labType 'security' mantido", "references/linksToOtherCourses mantidos da v1"]
}
```
