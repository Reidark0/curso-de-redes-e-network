# Aula 1.9 — Diagnóstico inicial: ipconfig, ping, arp, tracert e nslookup (v2)
Base: v1 · Tipo: fundamental · Módulo: m01 (Fundamentos de Redes)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: pergunta/limite de cada comando; sequência em degraus; leitura de resultados comuns (169.254, gateway vazio, tempo esgotado × destino inacessível, `* * *`, NXDOMAIN × timeout). Saíram "registrar evidências para SOC, cloud, DevSecOps" e "limites éticos e sanitização" |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 143 palavras; gancho "Wi‑Fi conectado e nenhum site abre"; consequência: reiniciar sem saber a causa, chamado genérico e time errado; carreira em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase padrão; 87 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | ICMP (4.8), TTL (4.8), DHCP (7.6), MAC (3.2), Máscara de sub-rede (5.2). Saíram os 5 comandos e "Evidência de rede" (a aula ensina) |
| Problema 80–150, sem repetir o gancho | cumpre | 133 palavras; retoma com "é isso que acontece quando…", lista as causas possíveis numa frase e apresenta a ordem como solução |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | a escada (configuração local → gateway → destino por IP → nome) aparece só no Conceito e no diagrama; saiu da Arquitetura, do exemplo e da analogia |
| Arquitetura só se acrescenta | removida | repetia a escada e trazia VLAN, WAN, VPN, cloud, split DNS, TLS, autorização |
| Diagrama mantido/corrigido | mantido (1 caixa reetiquetada) | caixa "Riscos: DNS suspeito / gateway/ARP inesperado" → "Sinais de alerta: IP 169.254.x.x / DNS desconhecido" (gateway/ARP inesperado saiu com a seção de segurança) |
| Erros comuns ≤3, sem repetição | cumpre | 3 itens no Funcionamento interno; absorvem a coluna "Erro comum" da tabela e o callout "Atenção" da v1 |
| Termos avançados cortados ou no glossário | cumpre | saíram RTT, rate limit, rotas assimétricas, split DNS, registros A/AAAA/CNAME/MX, sufixo DNS, VLAN, Test-NetConnection/curl/nc, Wireshark/tcpdump/NetFlow/SIEM; DNS, gateway, ARP e APIPA explicados em 1 frase no texto |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample reescrito com valores reais (192.168.0.23, gateway/DNS 192.168.0.1, 3 ms, 20 ms, nslookup em timeout, confirmação com `nslookup example.com 8.8.8.8`); analogia da entrega removida (o tema não é abstrato e ela repetia o mapa comando → pergunta) |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e devsecops removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 1) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões da v1, sem mudanças; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6 (mesmos ids); textos de fc1.9.4, fc1.9.5, fc1.9.7 e fc1.9.8 enxugados (sem VLAN/AP, "TCP/HTTPS", "caminhos assimétricos") |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos (configuração, gateway + ARP, IP externo + tracert, nslookup com outro servidor e com `teste.invalid`); 402 palavras; 20 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (novas), exercícios 2 (ex1.9.2, ex1.9.5), desafio reescrito com dados concretos e solução comentada |
| nextTheme 1–2 frases | cumpre | 1 frase da v1 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` lab/exercício), unlocks/accessPolicy preservados; "20-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect; challenge sem constraints/gradingRubric |

Verificação do quiz contra a aula v2: q1.9.1 (ipconfig /all) → tabela do Conceito e Funcionamento interno; q1.9.2 (IP ok, nome falha → nslookup) → tabela do Conceito, Exemplo e Resumo; q1.9.7 ("Host de destino inacessível" vindo do próprio IP, mesma sub-rede) → linha da tabela "Como ler os resultados" + explicação do ARP + glossário (máscara/sub-rede); q1.9.4 (tabela ARP) → Conceito e Funcionamento interno; q1.9.5 (`* * *` com destino respondendo) → tabela de leitura e Erros comuns; q1.9.6 (sem gateway) → linha "Gateway padrão vazio" e explicação do ARP. Gabaritos em 1, 2, 0, 3, 1, 2.

## 2. O que saiu e por quê
- Motivação: lista do que coletar (repetia o Conceito) e callout "Problema real" do sistema interno (virou o desafio).
- Problema: lista "Sem verificar X…" com 6 itens (repetia a escada); parágrafo "cloud, VPN, containers, Kubernetes… Wireshark, tcpdump, NetFlow, SIEM" (prévias).
- Conceito: coluna "Erro comum" (foi para o callout de 3 itens); linha Test-NetConnection/curl/nc (prévia, virou 1 frase "porta ou aplicação, vistas mais adiante"); rate limit e rotas assimétricas (termos avançados).
- Funcionamento interno: sufixo DNS, estado da interface, RTT, "não testa TCP, UDP, HTTP", registros A/AAAA/CNAME/MX (prévia 7.4); VLAN/AP e split DNS/VPN nas linhas da tabela; callout "Atenção" (absorvido nos Erros comuns).
- Arquitetura inteira (repetia a escada; VLAN, WAN, VPN, cloud, TLS = prévias).
- Analogia da entrega e "limite da analogia" (repetia o mapa comando → pergunta).
- simpleExample da v1 (lista de passos que repetia a escada): reescrito com valores.
- enterpriseExample (VLAN de visitantes, firewall entre VLANs), cloudExample, devsecopsExample (seção do template).
- security e troubleshooting (módulo 1); learningOutcomes (template).
- Lab: passos 1 (registrar contexto), 3 (Linux separado, fundido ao 1), 9 (matriz de interpretação) e 10 (sanitizar); safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, scenario, topology, architecture, cost (ritual ou invisível).
- Mentor: "por que ipconfig antes de ferramenta avançada" (reexplicava a ideia central), "pinga 8.8.8.8 mas não acessa a intranet" (repete q1.9.2 e o desafio), "MAC do gateway diferente em vários hosts" (prévia 3.9).
- Exercícios: ex1.9.1 "ping sozinho não prova a aplicação" (repete o Conceito e o Resumo) e ex1.9.4 "o que mascarar num output" (sanitização não é mais ensinada; coberta pelo mini-projeto 1.10).
- Desafio: tasks de sanitização, constraints e gradingRubric de 5 critérios.
- Glossário: ipconfig, ping, ARP cache, tracert, nslookup, Evidência de rede (a aula ensina).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Test-NetConnection, curl, nc, ss para testar porta/aplicação | prévia | 4.9, 11.9 |
| Wireshark, tcpdump, NetFlow, logs de firewall, SIEM como próximas ferramentas | prévia | 2.2, 15.x |
| Registros DNS A, AAAA, CNAME, MX no nslookup | prévia | 7.4 |
| Split DNS / nome interno exige VPN | prévia (ficou "nomes internos só existem no DNS da empresa") | 7.2, 10.6 |
| Rate limit e rotas assimétricas escondendo saltos no tracert | termo avançado | 4.8, 11.9 |
| RTT como sigla | termo avançado (ficou "tempo de ida e volta", ligado à 1.8) | 1.8 |
| Sufixo DNS e estado da interface no ipconfig /all | detalhe não usado | — |
| VLAN e AP como causas de APIPA / falha local | prévia | 3.7 |
| Ordem com "serviço: porta, protocolo, TLS, autenticação, autorização" | prévia (ficou 1 frase) | 2.7, 2.10 |
| Caso do ERP em VLAN de visitantes bloqueado no firewall | exemplo por ambiente / prévia | 3.7 |
| VM em cloud: route table, security group/NSG, DNS privado, peering, private endpoint | exemplo por ambiente | 14.x |
| Runner de pipeline: curl -v, ss, proxy, registry | exemplo por ambiente | — |
| DNS não autorizado (phishing), gateway/ARP suspeito, ARP spoofing, DHCP snooping, DAI, NAC, port security | seção removida (módulo 1) | 3.9, 7.9 |
| Vazamento de topologia e sanitização de outputs | seção removida (módulo 1) | 1.10 |
| Boas/más práticas (autorização, registrar data/hora, não alterar produção), monitoramento, hardening | seção removida (módulo 1) | 7.9, 16.x |
| Comandos Cisco IOS (show ip interface brief, show ip route, show arp) e árvore de decisão | seção removida (módulo 1) | 3.6, 4.9 |
| Registrar contexto e sanitizar relatório no lab | ritual de lab | 1.10 |

## 4. Acréscimos
- Conceito: a escada em 4 degraus com 1 frase de definição de DNS (antes só na Arquitetura e no Resumo).
- Funcionamento interno: frase explicando o ARP ("quem tem este IP?" e guarda o MAC), necessária para q1.9.4 e q1.9.7 sem depender da Arquitetura removida; `nslookup <nome> <servidor>` para consultar outro DNS.
- Exemplo simples com valores (IP, gateway, DNS, tempos) e confirmação com `nslookup example.com 8.8.8.8`.
- Lab: `nslookup teste.invalid` (domínio reservado) para ver um NXDOMAIN real; `cat /etc/resolv.conf`/`resolvectl status` para o DNS no Linux (o `ip addr` não mostra DNS).
- Mentor novo: comparar `ipconfig /all` de dois colegas no mesmo Wi‑Fi; ping por nome responde mas o site não abre.
- Desafio reescrito com valores (DNS manual 8.8.8.8 respondendo NXDOMAIN para nome interno; colega com DNS 10.20.0.10).
- Glossário: ICMP, TTL, DHCP, MAC, Máscara de sub-rede.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 5.252 | 5.137 | 3.480 |
| Teoria (palavras) | 2.958 | 2.762 | 1.557 |
| Núcleo (min, fórmula v2) | 31,8 | 30,2 | 21,0 |
| Prática extra (min) | 120 | 100 | 51 (→ 50) |
| duration declarada | 80-115 min | 115-165 min | 20-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- "lab com 461 palavras" (primeira rodada): enxugado para 402 palavras; o aviso não aparece mais.
- "análise ainda não escrita": resolvido por este arquivo.

## 7. Revisão humana
- Funcionamento interno com 519 palavras e Conceito com 300: a tabela "Como ler os resultados" (8 linhas) é o núcleo do objetivo 3 e sustenta q1.9.5–q1.9.7 e os flashcards; preferi mantê-la inteira.
- Diagrama: caixa "Riscos" reetiquetada para "Sinais de alerta" (IP 169.254.x.x, DNS desconhecido), mantendo a classe `svg-node--attacker`; confirme.
- Linha "Servidor DNS desconhecido… comprometimento → acionar segurança" mantida na tabela de leitura (é leitura do ipconfig e base do desafio), embora a seção de segurança tenha saído.
- Comandos e saídas do lab não testados em Windows; as mensagens citadas ("Non-existent domain", "NXDOMAIN", "Esgotado o tempo limite do pedido") seguem o padrão conhecido do Windows em pt-BR e do nslookup do Linux. `traceroute` pode não vir instalado no Linux (alternativa `tracepath` indicada).
- Exemplos trocados de `exemplo.com` para `example.com` (domínio reservado para documentação).
- Objetivo "limites éticos e sanitização" saiu; resta 1 frase de autorização nos pré-requisitos do lab. A sanitização fica para o mini-projeto 1.10.
- references (Microsoft ipconfig/ping/tracert e referência interna) e linksToOtherCourses mantidos da v1.

```json
{
  "id": "1.9", "modulo": "m01", "titulo": "Diagnóstico inicial: ipconfig, ping, arp, tracert e nslookup", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "analogy", "enterpriseExample", "cloudExample", "devsecopsExample", "security", "troubleshooting"],
  "conceitos_removidos": 17,
  "acrescimos": ["Conceito: escada em 4 degraus com definição de DNS", "Funcionamento interno: frase explicando o ARP e nslookup com servidor indicado", "Exemplo simples com valores reais", "Lab: nslookup teste.invalid e DNS no Linux via resolv.conf/resolvectl", "Mentor: 2 perguntas novas", "Desafio reescrito com valores", "Glossário: ICMP, TTL, DHCP, MAC, Máscara de sub-rede"],
  "palavras_visiveis": { "original": 5252, "v1": 5137, "v2": 3480 },
  "nucleo_min": { "original": 31.8, "v1": 30.2, "v2": 21.0 }, "pratica_extra_min": { "original": 120, "v1": 100, "v2": 50 },
  "duration_v2": "20-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "A escada de diagnóstico aparece uma vez, no Conceito, junto da tabela comando → pergunta → limite, e o exemplo mostra a escada com valores reais em vez de repetir a lista de passos.",
  "revisao_humana": ["Funcionamento interno 519 e Conceito 300 palavras (tabela de leitura mantida inteira)", "Caixa 'Riscos' do diagrama reetiquetada para 'Sinais de alerta'", "Linha 'DNS desconhecido → acionar segurança' mantida sem a seção de segurança", "Comandos/saídas do lab não testados em Windows; traceroute pode faltar no Linux", "exemplo.com trocado por example.com", "Objetivo de ética/sanitização removido (fica para 1.10)", "references/linksToOtherCourses mantidos da v1"]
}
```
