# Aula 0.4 — Bit vs Byte em redes (v2)
Base: v1 · Tipo: intermediária · Módulo: m00 (Fundamentos da Computação)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: unidades b/B (Mbps × MB/s, GB × GiB) e conversão; por que a taxa útil fica abaixo da nominal; estimar tempo e volume e julgar um resultado. Saíram "relacionar overhead com … VPN, Wi-Fi e cloud" (lista de áreas) e "evitar diagnósticos incorretos em … backups, logs" (lista) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; history removida (2 frases foram para o Problema); evolution já não existia na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 124 palavras; gancho: 300 Mbps contratados e 32 MB/s no navegador; consequência: chamado, troca de equipamento e horas investigando um problema que não existe; carreira em 1 frase (backup, custo de cloud, volume de um vazamento). A conversão em si ficou para o Conceito |
| Resumo 4–5 itens + frase final | cumpre | 5 itens, 87 palavras com a frase final |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 5: Ethernet (3.1), IP (2.5, 4.1), TCP (2.6, 6.4), TLS (8.3), VPN (10.1). Saíram os 7 termos da v1 (Bit, Byte, Mbps, MB/s, Overhead, Throughput, GiB), que a aula ensina |
| Problema 80–150, sem repetir o gancho | cumpre | 134 palavras; "é isso que acontece quando dois jeitos de medir se encontram sem conversão"; por que redes medem bits e arquivos bytes (o que restou da História); o caso de 1 GB a 100 Mbps; o que a aula resolve |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | conversão no Conceito e no diagrama; o encapsulamento em 7 passos virou 1 parágrafo com os cabeçalhos (aponta a 2.2) |
| Arquitetura só se acrescenta | removida | os gargalos por camada repetiam o Funcionamento interno; firewall/IPS/inspeção SSL e o dimensionamento "pelo número de marketing" são prévias |
| Diagrama mantido/corrigido | mantido | sem alteração: 500 Mbps → 62,5 MB/s → overhead → 55 MB/s → 440 Mbps → diagnóstico (bate com o Exemplo simples) |
| Erros comuns ≤3, sem repetição | cumpre | a tabela de 5 linhas × 4 colunas do Problema virou um callout com 3 erros de método de teste (Wi-Fi, VPN ligada, um único servidor lento). Saíram as linhas que repetiam o Conceito (Mbps × MB/s, nominal × útil, taxa × volume) |
| Termos avançados cortados ou no glossário | cumpre | saíram MTU, preâmbulo, FCS, intervalo entre quadros, goodput, fragmentação, janela TCP, half-duplex, inspeção TLS, egress, SI/IEC, NIC, registry, SIEM; o cálculo de 1538/1460 bytes ficou em linguagem simples |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample: 500 Mbps, 55 MB/s × 8 = 440 Mbps (por cabo); analogia dos caminhões em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud, devsecops e securityExample removidos; a conta de volume do cloud (100 Mbps por 24 h ≈ 1 TB) foi para o quadro de fórmulas e a do backup virou o exercício ex0.4.5 |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 0) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saiu q0.4.5 (exfiltração); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 8; fc0.4.6 (Wi-Fi) simplificado (saíram "canal, padrão") |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não se aplica | não havia lab na v1 nem no original |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (novos), exercícios 2 (ex0.4.4 + ex0.4.5 novo), desafio do Wi-Fi × cabo enxuto, com solução comentada; 650 palavras |
| nextTheme 1–2 frases | cumpre | 1 frase (0.5) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` de exercícios), unlocks/accessPolicy preservados; "15-25 min + 30 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | nenhum; challenge sem gradingRubric (visível, mas cortado como ritual) |

Verificação do quiz contra a aula v2: q0.4.1 (100 Mbps → 12,5 MB/s) → definição operacional e tabela do Conceito; q0.4.2 (50 MB/s × 8) → definição operacional; q0.4.3 (Mbps para links, MB/s para downloads) → 1º parágrafo do Conceito; q0.4.4 (1 Gbps não entrega 125 MB/s) → Funcionamento interno (cabeçalhos ≈ 95%, gargalos); q0.4.7 (100 Mbps por 24 h ≈ 1 TB) → quadro de fórmulas; q0.4.8 (1 TB = 931 "GB") → subseção GB × GiB. Gabaritos em 2, 3, 0, 1, 3, 1.

## 2. O que saiu e por quê
- History (tabela de áreas e unidades): seção do template; 2 frases foram para o Problema.
- Motivação: callout "Problema real" com a conta 32 MB/s = 256 Mbps (adiantava o Conceito), lista "backups, replicação, SIEM, pipelines, exfiltração" (lista de áreas) e o "método" de 4 passos.
- Problema: lista "quadros, pacotes, segmentos…" (prévia 2.2), lista de decisões erradas com registry e inspeção TLS (exemplo por ambiente), tabela de erros comuns (virou o callout de 3 itens).
- Conceito: linha de 10 Gbps e coluna "Observação" (NIC, storage), coluna "Limitação" e o termo goodput, siglas SI/IEC (termos avançados; o conteúdo GB × GiB ficou).
- Funcionamento interno: lista de 7 camadas com o papel de HTTP, TLS, TCP, IP e Ethernet (prévia 2.2; ficou 1 parágrafo); MTU, preâmbulo, FCS, intervalo entre quadros, opções TCP (termos avançados, reescritos em linguagem simples); fragmentação, alta latência, janela TCP, inspeção TLS, half-duplex (prévias 6.4, 0.6, 8.3, 1.5).
- Arquitetura inteira: repetia o Funcionamento interno; firewall com IPS/inspeção e dimensionamento de appliances são prévias.
- Analogia: "limite da analogia" (termos avançados).
- simpleExample: lista longa do atalho (duplex, CPU, firewall, horário).
- enterpriseExample, cloudExample, devsecopsExample, securityExample: seção do template (as contas de volume e de tempo foram reaproveitadas).
- security e troubleshooting: módulo 0.
- learningOutcomes: seção do template.
- Resumo: item "Uso real" (lista de termos) e "Cloud e SIEM cobram volume".
- Quiz q0.4.5 (exfiltração): dependia do securityExample; a conversão MB/s → Mbps já é cobrada pela q0.4.2.
- Mentor: "por que operadoras usam Mbps…" (repete q0.4.3), "300 Mbps e 34 MB/s" (repete o Exemplo simples e o desafio), "firewall de 5 Gbps com IPS" (prévia).
- Exercícios ex0.4.1 e ex0.4.2 (repetem q0.4.1 e q0.4.2) e ex0.4.3 (repete o Exemplo simples e o desafio).
- Desafio: tarefa de trocar o firewall, 3 das 4 restrições, gradingRubric; solução: checar LinkSpeed, erros de interface e CPU do firewall (prévia de troubleshooting) e a 3ª resposta errada (firewall).
- Glossário: Bit, Byte, Mbps, MB/s, Overhead, Throughput, GiB (a aula ensina).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Papel de cada camada (HTTP, TLS, TCP, IP, Ethernet, placa) num download | prévia (reduzido a 1 frase por cabeçalho) | 2.2 |
| MTU, preâmbulo, FCS, intervalo entre quadros, opções TCP | termo avançado (o cálculo 1460 ÷ 1538 ≈ 95% ficou) | 2.2, 3.2, 6.4 |
| Fragmentação, janela TCP, alta latência como redutores de throughput | prévia | 0.6, 6.4 |
| Wi-Fi half-duplex | termo avançado / prévia (ficou "meio compartilhado e interferência") | 1.5, 12.2 |
| Inspeção TLS, IPS, WAF, proxy reduzindo a capacidade de firewalls | prévia | 1.7, 8.5 |
| Gargalos por camada numa arquitetura corporativa; portas de 10G/25G | repetição do Funcionamento / prévia | 3.1 |
| Cobrança de egress, NAT Gateway, load balancer, private endpoint | exemplo por ambiente / prévia | 14.4, 14.10, 14.12 |
| Pipelines: imagem de 1,2 GB em 60 s, registry, runner, cache, mirror | exemplo por ambiente | — (curso de DevSecOps) |
| Exfiltração: 80 MB/s × 10 min = 48 GB; dimensionamento de SIEM | exemplo por ambiente / prévia | 13.7, 13.9 |
| Vulnerabilidades, boas/más práticas, monitoramento, hardening (QoS, segmentação), detecção por baseline | seção removida (módulo 0) | 13.7, 13.9 |
| Comandos Get-NetAdapter, Get-Counter, Test-NetConnection, ip -s link, sar, ss -ti, Cisco show interfaces; árvore de decisão | seção removida (módulo 0) | 0.6, 1.8, 1.9 |
| Tabela de áreas/unidades (telecom, arquivos, armazenamento, cloud billing) | seção do template (2 frases ficaram no Problema) | — |
| Siglas SI e IEC dos prefixos | termo avançado (a diferença GB × GiB ficou) | — |
| Termo goodput | termo avançado | 0.6 |
| Erros "comparar Mbps com MB/s", "útil = nominal", "taxa × volume" | repetição do Conceito e do Funcionamento | — |
| "Limite da analogia" (retransmissão, congestionamento) | termo avançado | 6.4 |

## 4. Acréscimos
- Mentor novo 1: porta de 1 Gbps com 112 MB/s, cerca de 95% do máximo útil de ~118 MB/s (aplica o cálculo de overhead do Funcionamento interno).
- Mentor novo 2: arquivo anunciado com 4,7 GB que aparece como 4,38 GB (aplica GB × GiB a um caso novo; 4,7 × 10^9 ÷ 2^30 ≈ 4,377).
- Exercício ex0.4.5 (id novo): backup de 500 GB por 1 Gbps ≈ 4000 s, com os números do enterpriseExample removido.
- Quadro de fórmulas: exemplos de tempo (1 GB a 100 Mbps = 80 s, vindo do Problema) e de volume (100 Mbps por 24 h ≈ 1 TB, vindo do cloudExample), para a q0.4.7 e o Problema terem a conta na aula.
- Funcionamento interno: frase que define cabeçalho e diz o papel de cada um (Ethernet, IP, TCP, TLS) em poucas palavras, no lugar da lista de 7 camadas.
- Exemplo simples: "cerca de 88% do nominal" (440 ÷ 500).
- Glossário novo: Ethernet, IP, TCP, TLS, VPN (citados e não explicados).
- Quiz: q0.4.3 com opções reordenadas (resposta no índice 0); q0.4.4 com a opção correta reescrita ("overhead dos cabeçalhos e gargalos no caminho"); q0.4.7 com "egress" trocado por "tráfego". Ids mantidos.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.927 | 4.934 | 2.761 |
| Teoria (palavras) | 3.641 | 3.485 | 1.446 |
| Núcleo (min, fórmula v2) | 37 | 36,8 | 20,1 |
| Prática extra (min) | 45 | 45 | 31 (→ 30) |
| duration declarada | 60-85 min | 75-110 min | 15-25 min + 30 min de prática extra |

## 6. Avisos do validar e justificativas
- "quiz q0.4.4: a resposta usa termos que quase não aparecem na teoria (1/5)": resolvido reescrevendo a opção correta e usando "gargalo" no Funcionamento interno; a questão já era respondível pelo cálculo dos cabeçalhos.
- "análise ainda não escrita": resolvido por este arquivo. Validação final sem avisos.

## 7. Revisão humana
- Funcionamento interno: a explicação do overhead foi simplificada para iniciante ("cada pacote leva no máximo 1500 bytes"; "bytes de controle do Ethernet e a pausa obrigatória entre um envio e outro" no lugar de preâmbulo, cabeçalho, FCS e intervalo entre quadros). Os números (1538, 1460, 95%, 949 Mbps, ~118 MB/s) foram mantidos da v1; confirme se a simplificação é aceitável.
- Mentores novos (112 MB/s em 1 Gbps; 4,7 GB → 4,38 GB) e ex0.4.5 (500 GB a 1 Gbps ≈ 4000 s): contas conferidas, redação nova.
- Conceito (352 palavras) e Funcionamento interno (386) ficaram acima dos alvos da 0.1 (~200 e ~170): o tema tem tabela de conversão, os 4 números de "velocidade", GB × GiB, o cálculo de overhead, o quadro de fórmulas e o callout de erros.
- O callout "Erros comuns" (Wi-Fi, VPN, servidor lento) e o parágrafo anterior se tocam: o parágrafo explica por que esses pontos reduzem a taxa; o callout diz o erro de método de teste.
- q0.4.7 continua citando "serviço em cloud" e "cobrança de tráfego", embora o exemplo de cloud tenha saído; a conta está no quadro de fórmulas e a Motivação cita o custo de tráfego em cloud.
- Glossário: IP aponta para 2.5 e 4.1; TCP para 2.6 e 6.4. Confirme as aulas.
- tags (cloud, segurança, troubleshooting), references (0.1, 0.2, 0.6) e linksToOtherCourses mantidos como na v1.

```json
{
  "id": "0.4", "modulo": "m00", "titulo": "Bit vs Byte em redes", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "history", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 16,
  "acrescimos": ["Mentor: 112 MB/s em porta de 1 Gbps", "Mentor: 4,7 GB que aparece como 4,38 GB", "Exercício ex0.4.5: backup de 500 GB a 1 Gbps", "Quadro de fórmulas com exemplos de tempo e volume", "Funcionamento interno: definição de cabeçalho com o papel de cada protocolo", "Glossário: Ethernet, IP, TCP, TLS, VPN", "Quiz: opções de q0.4.3 reordenadas, q0.4.4 e q0.4.7 reescritas"],
  "palavras_visiveis": { "original": 4927, "v1": 4934, "v2": 2761 },
  "nucleo_min": { "original": 37, "v1": 36.8, "v2": 20.1 }, "pratica_extra_min": { "original": 45, "v1": 45, "v2": 30 },
  "duration_v2": "15-25 min + 30 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O overhead passou de uma lista de 7 camadas com MTU, FCS e preâmbulo para um parágrafo sobre cabeçalhos e uma conta em linguagem simples (1460 de 1538 bytes ≈ 95%), seguida de um único quadro de fórmulas para conversão, tempo e volume.",
  "revisao_humana": ["Simplificação do cálculo de overhead (sem MTU/FCS/preâmbulo)", "Mentores novos e ex0.4.5 com contas novas", "Conceito 352 e Funcionamento 386 palavras, acima do alvo da 0.1", "Callout de erros e parágrafo de gargalos se tocam", "q0.4.7 mantém o contexto de cloud", "relatedLessons de IP (2.5, 4.1) e TCP (2.6, 6.4)", "tags, references e linksToOtherCourses mantidos da v1"]
}
```
