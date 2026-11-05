# Aula 2.2 — Encapsulamento, desencapsulamento e PDUs (v2)
Base: v1 · Tipo: fundamental · Módulo: m02 (Modelo OSI)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: encapsular/desencapsular (com "cada cabeçalho diz o que vem dentro"); PDUs + o que switch/roteador leem e quadro refeito a cada salto; conta da MTU 1500 e por que túnel faz pacote grande falhar. Saíram Wireshark/tcpdump/firewalls (lista), VPN/overlay/cloud e "riscos de segurança" |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 150 palavras; gancho: VPN de casa, páginas abrem e o anexo grande trava; consequência: culpar sistema/cliente VPN/banda; carreira em 1 frase (ler uma captura e saber o que cada equipamento viu). Saiu a lista "Wireshark, tcpdump, MTU, MSS, fragmentação" |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase; 90 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 4: VPN (10.1, 10.2), TLS (8.3), ICMP (4.8), NAT (6.7, 9.5). Saíram Encapsulamento, Desencapsulamento, PDU, MTU, Overhead e Túnel (a aula explica) |
| Problema 80–150, sem repetir o gancho | cumpre | 136 palavras; retoma com "é isso que acontece quando não se enxerga que uma mensagem viaja dentro de vários envelopes"; as 4 perguntas que os dados não respondem sozinhos; amarra ao espaço limitado |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | cadeia só no Funcionamento interno (com valores) + diagrama; o parágrafo de abertura do diagrama, que repetia a ideia, saiu |
| Arquitetura só se acrescenta | cumpre (mantida) | mostra o que o Funcionamento não mostra: o quadro refeito a cada salto (MAC muda, IP fica, TTL −1) e o que switch/roteador/firewall leem. Saíram as linhas "Tags, VPN e overlay" e "Cloud" e a frase sobre service meshes |
| Diagrama mantido/corrigido | mantido | sem erro; só saiu o parágrafo introdutório |
| Erros comuns ≤3, sem repetição | cumpre | 2: "chamar toda PDU de pacote" e "encapsular ≠ cifrar" (com o que o TLS deixa visível). "MAC de destino é o do servidor" saiu do callout porque já está no Funcionamento, no Exemplo e na Arquitetura |
| Termos avançados cortados ou no glossário | cumpre | saíram DF, ICMP tipo 3/código 4, MSS clamping, SYN, offloading, VXLAN, IPsec/WireGuard, 802.1Q, PPPoE, CNI, kube-proxy, service mesh, flow logs, WAF. TTL, EtherType, protocolo 6 e GRE ficam explicados em linha |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample novo: `nslookup` capturado no Wireshark, lido linha a linha como PDUs, com a soma 14+20+8+29 = 71 bytes; analogia da carta em 3 frases (o "limite da analogia" virou meia frase) |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e securityExample removidos (o ponto do TLS foi para os Erros comuns) |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 2) |
| Quiz 5–6, respondível pela aula | cumpre | 6: q2.2.1, q2.2.2, q2.2.3, q2.2.5 mantidas; q2.2.8 (o que o TLS deixa visível) e q2.2.9 (o que muda a cada salto) novas. Gabaritos 1,2,0,1,3,0. quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 7: fc2.2.1–4, fc2.2.7 (MSS 1460, explicado) + fc2.2.8 (o que muda no roteador) e fc2.2.9 (EtherType/protocolo); fc2.2.4 reescrito com o número do GRE; saiu fc2.2.5 (TLS, já na q2.2.8) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não se aplica | não havia lab na v1; nenhum criado |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 novos (por que o quadro é refeito; MTU 9000 não resolve); exercícios 3 (ex2.2.6 conta de bytes, ex2.2.7 MACs/IPs da resposta, ex2.2.3 mantido); desafio novo (captura com VPN ligada) com solução comentada |
| nextTheme 1–2 frases | cumpre | 1 frase (aula 2.3) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` de exercícios), unlocks/accessPolicy preservados; "20-25 min + 35 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | nenhum na base v1; challenge sem constraints/gradingRubric (ritual) |

Verificação do quiz contra a aula v2: q2.2.1 (definição) → Conceito; q2.2.2 (quadro = enlace) → tabela do Conceito; q2.2.3 (VPN, páginas pequenas ok, upload falha) → "Túneis somam envelopes" + PMTUD no Funcionamento; q2.2.5 (MAC do gateway) → Funcionamento (passo Enlace), Exemplo e Arquitetura; q2.2.8 (https: IPs/portas visíveis, conteúdo não) → Erros comuns do Conceito; q2.2.9 (MACs e TTL mudam, IPs ficam) → Arquitetura.

## 2. O que saiu e por quê
- Motivação: lista "Wireshark, tcpdump, MTU, MSS, fragmentação" e o callout "Problema real" com DNS/TCP/PMTUD (o gancho virou cena vivida; o mecanismo ficou só no Funcionamento).
- Problema: a lista "Sem transporte… sem desencapsulamento" virou 4 perguntas curtas; saiu o parágrafo de falhas por envelope (VLAN errada, rota, firewall: prévia 2.4/2.5/2.8).
- Conceito: "o nome varia conforme a literatura"; callout do MAC de destino (repetido em 3 lugares).
- Funcionamento interno: MSS anunciado no SYN (prévia 6.3/6.4); VXLAN 50 bytes e MTU 1450 de overlays (prévia de cloud); overhead de IPsec/WireGuard (prévia 10.3/10.5); bit DF e ICMP tipo 3/código 4 por extenso (termo avançado: ficou "marcado para não ser dividido" + "mensagem ICMP"); MSS clamping e ajuste de MTU do túnel, ex. 1436 (prévia 6.4/10.2); subseção "O que você vê numa captura" (virou o simpleExample) e offloading (prévia 6.8/15.11).
- Arquitetura: linhas "Tags, VPN e overlay" (802.1Q, PPPoE, GRE, IPsec, VXLAN, WireGuard) e "Cloud"; frase sobre firewalls modernos, proxies e service meshes (prévia 3.7, 10.x, 14.x, 8.5).
- Analogia: "limite da analogia" (virou meia frase).
- simpleExample da v1 (repetia a cadeia do Funcionamento, cujos valores foram absorvidos por ele) e a lista de hipóteses por camada (repetição de 2.1/2.8).
- enterpriseExample, cloudExample, securityExample (seção do template).
- security e troubleshooting (módulo 2); learningOutcomes (seção do template).
- Quiz q2.2.4 (PCAP sensível: dependia de `security`) e q2.2.7 (PMTUD: segunda questão de MTU; o conteúdo ficou na aula).
- Mentor: os 3 da v1 (o 1º reexplicava o Problema, o 2º era a q2.2.3, o 3º era o ex2.2.3).
- Exercícios: ex2.2.1 (reexplicava a cadeia), ex2.2.2 (era a q2.2.2), ex2.2.5 (VXLAN em pods: prévia).
- Desafio "upload grande via VPN" (repetia o gancho e a q2.2.3) com constraints e rubrica.
- Glossário: Encapsulamento, Desencapsulamento, PDU, MTU, Overhead, Túnel (a aula explica).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| MSS anunciado por cada lado no SYN | prévia | 6.3, 6.4 |
| MSS clamping e ajuste de MTU do túnel (ex.: MSS 1436 em GRE) | prévia | 6.4, 10.2 |
| Bit DF e ICMP "Fragmentation Needed" (tipo 3, código 4) por extenso | termo avançado (o mecanismo ficou) | 4.8, 6.4 |
| VXLAN = 50 bytes; overlays e pods com MTU 1450 | prévia | 14.x (cloud; sem aula específica de VXLAN) |
| Overhead variável de IPsec e WireGuard | prévia | 10.3, 10.5 |
| Offloading: checksum "incorreto" e segmento maior que a MTU na captura | prévia | 6.8, 15.11 |
| Campos TCP na captura (sequência, flags) | prévia | 2.6, 6.3 |
| Tag 802.1Q e PPPoE como encapsulamentos | prévia | 3.7, 2.4 |
| Encapsulamento em cloud (subnet, SG/NSG, NAT gateway, flow logs, packet capture de VPC) | exemplo por ambiente | 9.7, 14.1, 14.12 |
| Caminho no Kubernetes (pod, CNI, kube-proxy, ingress, service mesh com mTLS) | exemplo por ambiente | 14.x |
| Caminho empresarial (WAF, balanceador, proxy, VLAN errada) | exemplo por ambiente | 8.5, 3.7 |
| VPN carrega qualquer tráfego permitido e pode contornar controles | exemplo por ambiente / seção removida | 10.1, 10.6 |
| Falhas por envelope (VLAN errada, rota, quadro corrompido) e hipóteses por camada | repetição | 2.1, 2.8 |
| PCAP é evidência sensível (vulnerabilidade, boas práticas, q2.2.4) | seção removida (módulo 2) | 6.8, 15.11 |
| Túnel sem governança, falsa segurança por porta, monitoramento (NetFlow, flow logs), hardening, detecção | seção removida (módulo 2) | 9.x, 10.x, 13.4 |
| Comandos de MTU (ping -f -l 1472, ping -M do -s 1472, tracepath, netsh) e Cisco IOS | seção removida (módulo 2) | 2.8, 4.8, 15.4 |

## 4. Acréscimos
- Funcionamento interno: o desencapsulamento usa os próprios cabeçalhos (EtherType 0x0800 → IPv4, protocolo 6 → TCP, porta 443 → programa). Na v1 os valores estavam soltos na subseção de captura; agora explicam como o destino sabe o que vem dentro (objetivo 1).
- Funcionamento interno: TTL explicado em 1 parêntese (a Arquitetura e a q2.2.9 usam).
- simpleExample novo: consulta DNS no Wireshark, linhas como PDUs e soma 14 + 20 + 8 + 29 = 71 bytes (datagrama UDP, MAC do gateway e peso do envelope num caso diferente do Funcionamento).
- Quiz q2.2.8 e q2.2.9; flashcards fc2.2.8 e fc2.2.9; mentor 2 novos; exercícios ex2.2.6 e ex2.2.7; desafio novo com solução.
- Glossário: VPN, TLS, ICMP, NAT (citados e não explicados).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.182 | 4.375 | 3.354 |
| Teoria (palavras) | 3.020 | 2.898 | 1.753 |
| Núcleo (min, fórmula v2) | 32,2 | 31,3 | 22,5 |
| Prática extra (min) | 45 | 45 | 37 (→ 35) |
| duration declarada | 85-120 min | 70-100 min | 20-25 min + 35 min de prática extra |

## 6. Avisos do validar e justificativas
- "análise ainda não escrita": resolvido por este arquivo. Nenhum outro aviso.
- Sem aviso, mas registrado: as palavras visíveis caíram só 23% (a teoria caiu 40%). O tema tem números que explicam o mecanismo (cabeçalhos, MTU, GRE), e o quiz e os flashcards ficaram maiores (+80 e +84 palavras) por causa das questões e cartões novos.

## 7. Revisão humana
- Escopo de MTU: a análise da 0.1 aponta MTU para a 2.2, então ficaram MTU 1500, a tabela de cabeçalhos, o MSS 1460 (só o nome), GRE 1476 e o PMTUD em 1 parágrafo. Confirme se o PMTUD cabe no módulo 2 ou deveria ficar só para 6.4/10.2.
- simpleExample: 71 bytes supõem uma consulta A por example.com sem EDNS (12 + 13 + 4 = 29 bytes de DNS). Algumas versões de `nslookup` ou do resolvedor podem gerar consultas maiores, e o `nslookup` do Windows faz antes uma consulta reversa do servidor; o "Frame 1" é ilustrativo. Conferir numa captura real.
- Desafio: supõe uma VPN sobre UDP (como WireGuard, OpenVPN ou IPsec com NAT-T); uma SSL VPN sobre TCP 443 mostraria TCP. O cenário diz o que foi observado, mas vale conferir o texto.
- Quiz: q2.2.4 e q2.2.7 saíram; q2.2.8 e q2.2.9 são novas (ids inéditos).
- Arquitetura mantida (na 0.1 foi removida): aqui ela é o único lugar do salto a salto.
- Diagrama: o rótulo "Segmento TCP/UDP" foi mantido, embora a aula chame a PDU do UDP de datagrama (espaço da caixa).
- references (RFC 1191 continua pertinente ao PMTUD; a nota da RFC 791 cita o bit DF, que saiu do texto) e linksToOtherCourses (Kubernetes Networking) mantidos da v1, embora o exemplo de Kubernetes tenha saído.

```json
{
  "id": "2.2", "modulo": "m02", "titulo": "Encapsulamento, desencapsulamento e PDUs", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "enterpriseExample", "cloudExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 16,
  "acrescimos": ["Funcionamento: desencapsulamento guiado por EtherType/protocolo/porta", "Funcionamento: TTL em 1 parêntese", "simpleExample novo: consulta DNS no Wireshark (71 bytes)", "Quiz q2.2.8 e q2.2.9", "Flashcards fc2.2.8 e fc2.2.9", "Mentor 2 novos", "Exercícios ex2.2.6 e ex2.2.7", "Desafio da captura com VPN ligada", "Glossário: VPN, TLS, ICMP, NAT"],
  "palavras_visiveis": { "original": 4182, "v1": 4375, "v2": 3354 },
  "nucleo_min": { "original": 32.2, "v1": 31.3, "v2": 22.5 }, "pratica_extra_min": { "original": 45, "v1": 45, "v2": 35 },
  "duration_v2": "20-25 min + 35 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Funcionamento interno segue um único pacote com valores reais e mostra como cada cabeçalho diz ao destino o que vem dentro, e a MTU virou uma conta de bytes que explica o gancho da VPN sem DF, ICMP 3/4, MSS clamping nem overlays.",
  "revisao_humana": ["PMTUD em 1 parágrafo no módulo 2", "Conferir os 71 bytes do exemplo DNS (sem EDNS) numa captura real", "Desafio supõe VPN sobre UDP", "Quiz: q2.2.4 e q2.2.7 saíram, q2.2.8 e q2.2.9 novas", "Arquitetura mantida (salto a salto)", "Rótulo 'Segmento TCP/UDP' no diagrama", "references/linksToOtherCourses mantidos da v1"]
}
```
