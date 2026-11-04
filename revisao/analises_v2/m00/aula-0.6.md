# Aula 0.6 — Latência, largura de banda e throughput (v2)
Base: v1 · Tipo: fundamental · Módulo: m00 (Fundamentos da Computação)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: diferenciar as medidas (com jitter e perda); explicar as 4 parcelas da latência e por que mais banda nem sempre ajuda; medir RTT/variação/perda com ping e separar tempo de rede do tempo do servidor. Saíram "conectar com cloud, DevSecOps, observabilidade…" (lista de áreas) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 146 palavras; gancho = plano de 500 Mbps, teste de velocidade alto e chamada/jogo travando à noite; consequência = pagar o plano maior sem resolver; carreira + segurança em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 5 itens, 79 palavras com a frase final |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 4: Pacote (2.2), Overhead (0.4), Ping (1.9, 4.8), curl (8.8). Saíram os 6 termos que a aula ensina (latência, banda, throughput, jitter, perda, bufferbloat) |
| Problema 80–150, sem repetir o gancho | cumpre | 128 palavras; "é isso que acontece quando 'velocidade' é tratada como um número só"; história em 1 frase (modems discados, distância com a internet) |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | definições no Conceito, mecanismo (4 parcelas) no Funcionamento interno, diagrama do caminho. Janela TCP reduzida a 1 frase com remissão à 6.4 |
| Arquitetura só se acrescenta | removida | segmentos corporativos (LAN, borda, WAN, cloud) e tabela de ferramentas (ping, traceroute, mtr, curl, iperf, APM) = prévias de 1.8, 1.9, 4.8, 8.8, 11.9 e 14.2 |
| Diagrama mantido/corrigido | mantido (rótulos ajustados) | "Firewall / fila/inspeção" → "Roteador / fila"; "Internet/WAN / RTT + perda" → "distância + perda"; "Load balancer / cloud" → "Servidor / processamento"; legenda do meio em 2 linhas ("distância soma RTT" / "perda reduz throughput"); `desc` atualizado |
| Erros comuns ≤3, sem repetição | cumpre | 2: olhar só a média do ping; tratar o teste de velocidade como prova. Saíram "chamar tudo de velocidade" (ideia central), "comprar link sem medir" (repete "Por que mais banda nem sempre ajuda") e "ping baixo = aplicação rápida" (repete "Medir por partes") |
| Termos avançados cortados ou no glossário | cumpre | saíram janela TCP/escala de janela, TCP/UDP, QoS, VPN, NAT, WAF, proxy, load balancer, APM, iperf, mtr, ICMP, baseline, egress, DLP, ZTNA |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample: 500 Mbps → 62,5 MB/s, jogo × backup com números (50 GB a 100 e a 10 Mbps); analogia da estrada em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud, devsecops e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 0) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saíram q0.6.5 (exfiltração), q0.6.6 (repetia a q0.6.7) e q0.6.8 (asteriscos do traceroute); nova q0.6.9 (fila); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 7 mantidos; textos de fc0.6.4 e fc0.6.6 simplificados (sem TLS/proxy/autenticação) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 3 passos: ping (RTT, variação, perda), curl -w (rede × servidor), teste de velocidade (throughput × plano, latência com carga); 435 palavras; 15 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre (aviso) | mentor 2 (servidor a 8.000 km; ler uma saída do curl), exercícios 2 (VPN reescrito como servidor distante; cálculo tela × relatório), desafio novo "a chamada que engasga às 21h" |
| nextTheme 1–2 frases | cumpre | 1 frase (0.7), mantido da v1 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}`, unlocks/accessPolicy preservados; "20-25 min + 45 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/challenge/solution |

Verificação do quiz contra a aula v2: q0.6.1 (definição de latência) → Conceito; q0.6.2 (banda × throughput) → Conceito; q0.6.9 (ping sobe durante download pesado = fila) → tabela das parcelas + parágrafo do bufferbloat; q0.6.3 (chamada engasga = jitter e perda) → lista do Conceito; q0.6.4 (ping baixo até o roteador, API lenta) → "Medir por partes"; q0.6.7 (20 × 100 ms) → "Por que mais banda nem sempre ajuda". Gabaritos em 1,2,1,0,3,3.

## 2. O que saiu e por quê
- Motivação: callout "Problema real" da empresa com link de 1 Gbps, região cloud, proxy e VPN (prévias 10.x/14.2; o gancho virou o caso doméstico); lista de cinco sintomas e definições entre parênteses (repetiam o Conceito); exfiltração/DoS reduzidos a meia frase.
- Problema: lista de 6 métricas (repetia o Conceito); cadeia Wi‑Fi/firewall/proxy/VPN/CDN/load balancer/WAF/API gateway (prévias); linhas seriais e Ethernet de meio compartilhado (história reduzida a 1 frase).
- Conceito: tabela "métrica × o que mede × não prova sozinha" (repetia as definições); TCP/UDP na explicação da perda (prévia 2.6/6.x; ficou o efeito: reenviar × não dá tempo); 2 dos 4 erros comuns (repetição).
- Funcionamento interno: lista de 6 etapas com segmentos, pacotes, quadros, NAT, VPN, WAF (prévia 2.2; ficou 1 frase com os trechos do caminho); inspeção TLS/VPN/proxy/WAF no processamento; janela TCP com janela ÷ RTT, 64 KB → 5,2 Mbps e escala de janela (prévia 6.4, ficou 1 frase); lista longa de limites do throughput (CPU, disco, antivírus, paralelismo).
- Arquitetura inteira (prévias de 1.8, 1.9, 4.8, 8.8, 11.9, 14.2).
- Analogia: jitter/perda na estrada e "limite da analogia" (termos avançados).
- enterpriseExample, cloudExample, devsecopsExample, securityExample (seção do template).
- security e troubleshooting (módulo 0).
- learningOutcomes (seção do template).
- Lab: passos "ping por nome" (DNS, prévia 7.x), "traceroute" (prévia 4.8/11.9) e "registrar interpretação" (ritual); Test-NetConnection; safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions, challenge/solution do lab.
- Quiz q0.6.5 (exfiltração, prévia 16.9), q0.6.6 (mesma ideia da q0.6.7) e q0.6.8 (traceroute, prévia 4.8).
- Mentor: "rede lenta não é diagnóstico" (reexplica a ideia central), "ping baixo no gateway" (repete q0.6.4), "backup noturno" (repete o simpleExample).
- Exercícios: ex0.6.1 (repete q0.6.2), ex0.6.3 (repete q0.6.3), ex0.6.4 (segurança, prévia 16.9).
- Desafio da filial com VPN, firewall e cloud (prévias; rubrica corporativa) → trocado pelo desafio doméstico das 21h.
- Glossário: os 6 termos que a aula ensina.
- Referência "Microsoft Test-NetConnection" (o comando saiu do lab).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Janela TCP, janela ÷ RTT (64 KB e 100 ms → 5,2 Mbps), escala de janela, controle de congestionamento | prévia (ficou 1 frase sobre esperar confirmação) | 6.4 |
| Perda em TCP (retransmissão) × UDP (áudio/telemetria) pelos nomes dos protocolos | prévia (o efeito ficou) | 6.4, 6.5 |
| Encapsulamento em segmentos, pacotes e quadros; headers | prévia | 2.2 |
| Trechos corporativos: LAN, VLAN, uplinks, borda (firewall, NAT, proxy, WAF, IDS/IPS, inspeção TLS), WAN, peering | prévia | 1.8, 11.9 |
| Região, zona, NAT gateway, private endpoint, service mesh e latência em cloud | prévia | 14.2 |
| Custo de egress, NAT gerenciado e flow logs | exemplo por ambiente | 14.x |
| Ferramentas: traceroute/tracert, mtr, iperf, APM; asteriscos no traceroute | prévia | 1.9, 4.8, 11.9 |
| curl -w como ferramenta de diagnóstico HTTP (segue só no lab e no glossário) | prévia | 8.8 |
| Baseline por localidade, horário e aplicação | prévia | 1.8 |
| Teste por DNS (ping por nome) | prévia | 1.9, 7.5 |
| QoS para voz e vídeo | termo avançado | 1.8 |
| Exfiltração como throughput de saída anormal; DoS como perda e fila; túnel não autorizado; VPN mal dimensionada | seção removida (módulo 0) / prévia; 1 frase na Motivação | 13.7, 16.9 |
| Vulnerabilidades, boas/más práticas, monitoramento, hardening e detecção | seção removida (módulo 0) | 16.9, 16.10 |
| Comandos de troubleshooting (Test-NetConnection, show interfaces e show policy-map no Cisco IOS) e árvore de decisão | seção removida (módulo 0) | 1.8, 1.9 |
| ERP em filial com VPN e túnel site-to-site | exemplo por ambiente | 10.3 |
| Pipeline lento, registry, microsserviços e sidecars | exemplo por ambiente | — |
| Limite ético de testes de carga | seção removida (o lab novo não satura nada) | 16.2 |

## 4. Acréscimos
- Conceito: unidades (bits por segundo × milissegundos) e exemplos numéricos de jitter (15–200 ms × 60 ms estável).
- Funcionamento interno: frase dos trechos do caminho (Wi‑Fi, roteador, provedor, internet, rede do servidor), "a fila só diminui se o problema era excesso de tráfego", "arquivo grande depende da transmissão" e o parágrafo "Medir por partes" (sustenta a q0.6.4 e o lab).
- simpleExample: tempo de um backup de 50 GB a 100 Mbps (~1 h) e a 10 Mbps (~11 h).
- Quiz q0.6.9 (fila durante um download pesado).
- Lab: passo do curl reescrito para iniciante e passo do teste de velocidade (throughput × plano; latência sem carga × com carga).
- Mentor novos: servidor a 8.000 km (propagação); ler uma saída do curl.
- Exercício novo ex0.6.5 (30 requisições × 80 ms e arquivo de 500 MB a 100 e 200 Mbps).
- Desafio novo "A chamada que engasga às 21h" com solução comentada.
- Glossário: Pacote (2.2), Overhead (0.4), Ping (1.9, 4.8), curl (8.8).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 5.790 | 6.041 | 3.666 |
| Teoria (palavras) | 3.514 | 3.450 | 1.513 |
| Núcleo (min, fórmula v2) | 36 | 37,5 | 20,6 |
| Prática extra (min) | 70 | 75 | 46 (→ 45) |
| duration declarada | 75-105 min | 100-145 min | 20-25 min + 45 min de prática extra |

## 6. Avisos do validar e justificativas
- "prática extra com 776 palavras (~750 no total)": por bloco, mentor 240, exercícios 213, desafio + solução 323. Cada item aplica algo novo (calcular a propagação, ler uma saída do curl, comparar distância × banda, calcular tela × arquivo, diagnosticar a fila das 21h). Excesso de 26 palavras.
- "análise ainda não escrita": resolvido por este arquivo.

## 7. Revisão humana
- Funcionamento interno ficou com 479 palavras: a tabela das 4 parcelas (com os valores conferidos: 5 ms/1.000 km, 12 µs e 1,2 ms para 1.500 bytes) e "Medir por partes" são o mecanismo do tema. Dá para cortar o parágrafo do throughput se quiser ficar mais perto da 0.1.
- Lab, Windows: comando `curl.exe -o NUL -s -w '…\n'` não testado no PowerShell (usa curl.exe para fugir do alias `curl` = Invoke-WebRequest do PowerShell 5.1).
- Lab, passo 3: cita speedtest.net e fast.com e a "latência com carga" (loaded latency); a nomenclatura exata pode variar entre os sites.
- Lab, passo 2: a saída de exemplo do curl é ilustrativa (valores inventados como exemplo, marcados com "por exemplo").
- A frase sobre janela/confirmação ("em muitas transferências o emissor espera a confirmação…") é uma simplificação deliberada do TCP para o módulo 0; confirme se prefere cortá-la e deixar só a remissão à 6.4.
- Diagrama: rótulos trocados (firewall/load balancer/cloud → roteador/servidor), porque a aula não explica esses equipamentos.
- A sobreposição com a aula 1.8 (Métricas: latência, jitter, perda, throughput e disponibilidade) é grande; vale conferir, ao revisar a 1.8, que ela aprofunde (baseline, disponibilidade, comandos) e não repita a 0.6.
- references (manual pages com url vazia) e linksToOtherCourses mantidos da v1; a referência a Test-NetConnection saiu.

```json
{
  "id": "0.6", "modulo": "m00", "titulo": "Latência, largura de banda e throughput", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 17,
  "acrescimos": ["Conceito: unidades e exemplo numérico de jitter", "Funcionamento interno: trechos do caminho e 'Medir por partes'", "simpleExample: backup de 50 GB a 100 e 10 Mbps", "Quiz q0.6.9 (fila)", "Lab: passo do teste de velocidade com latência com carga", "Mentor: servidor a 8.000 km; ler saída do curl", "Exercício ex0.6.5 (tela × relatório)", "Desafio 'A chamada que engasga às 21h' com solução", "Glossário: Pacote, Overhead, Ping, curl"],
  "palavras_visiveis": { "original": 5790, "v1": 6041, "v2": 3666 },
  "nucleo_min": { "original": 36, "v1": 37.5, "v2": 20.6 }, "pratica_extra_min": { "original": 70, "v1": 75, "v2": 45 },
  "duration_v2": "20-25 min + 45 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Funcionamento interno agora é a tabela das 4 parcelas da latência seguida de casos numéricos (20 × 100 ms, fila no upload), sem a lista de equipamentos corporativos nem a tabela de ferramentas.",
  "revisao_humana": ["Funcionamento interno com 479 palavras", "curl.exe no Windows não testado", "Nomes de sites de teste de velocidade e 'latência com carga' no lab", "Saída de exemplo do curl é ilustrativa", "Frase simplificada sobre janela/confirmação (remete à 6.4)", "Rótulos do diagrama trocados", "Sobreposição com a aula 1.8", "references/linksToOtherCourses mantidos; Test-NetConnection removida"]
}
```
