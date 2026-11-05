# Aula 2.4 — Camada 2 — Enlace: frames, MAC, switch, VLAN e ARP (v2)
Base: v1 · Tipo: fundamental · Módulo: m02 (Modelo OSI)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: papel da Camada 2 (quadro + MAC, sem rotear); switch (aprendizado, unicast/flooding) e VLAN como domínio de broadcast; ARP e leitura da tabela ARP. Saíram "coletar evidências em Cisco IOS" e "relacionar com segurança, cloud, DevSecOps" |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 145 palavras; notebook em outra sala: abre a internet, não abre o sistema interno, IP 10.40 em vez de 192.168.10 (porta na rede de visitantes); consequência: horas perdidas em DNS/firewall; carreira em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 4 itens + frase; 88 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 2: Gateway padrão (2.5, 4.5) e Máscara /24 (2.5, 4.3). Os 6 termos da v1 (Frame, MAC, Switch, VLAN, ARP, Domínio de broadcast) são ensinados pela aula e saíram |
| Problema 80–150, sem repetir o gancho | cumpre | 143 palavras; retoma com "é isso que acontece quando…", lista o que a Camada 1 não sabe e o que a Camada 2 resolve; hub → switch em 1 frase |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | cadeia IP → ARP → quadro → switch só no Funcionamento interno + diagrama; trunk/802.1Q reduzido a 1 frase com ponteiro para a 3.7 |
| Arquitetura só se acrescenta | removida | controles (port security, NAC, DHCP snooping, DAI, BPDU Guard) e trunk/VLAN nativa são prévias da 3.7–3.9; "um gateway por VLAN" foi para o Conceito |
| Diagrama mantido/corrigido | corrigido | a linha vertical "Limite lógico: VLAN" separava Host A e Host B, que estão na mesma sub-rede e fazem ARP um para o outro (erro). Agora a zona é "VLAN 10 (192.168.10.0/24): um domínio de broadcast" e a legenda diz que broadcast e flooding não saem da VLAN; "frames" → "quadros"; title/desc atualizados |
| Erros comuns ≤3, sem repetição | cumpre | 3: MAC × IP, VLAN ≠ firewall (com ACL explicada em parênteses), culpar o DNS sem olhar ARP/VLAN. Tirados do Resumo, onde se repetiam |
| Termos avançados cortados ou no glossário | cumpre | saíram Neighbor Discovery, switch multicamada, MAC flapping, STP/BPDU Guard, DAI, DHCP snooping, NAC/802.1X, VLAN nativa, overlay, CNI |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample = gateway de casa + `ip neigh` (REACHABLE/STALE/FAILED), com `arp -a` citado; analogia da recepção do prédio em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e devsecops removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 2) |
| Quiz 5–6, respondível pela aula | cumpre | 6; q2.4.6 (comando Cisco) trocada por q2.4.9 (o que o switch aprende); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6: fc2.4.1–5 + fc2.4.8 novo (Host de destino inacessível = ARP sem resposta); saiu fc2.4.7 (access/trunk/VLAN nativa → 3.7) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos, 436 palavras, 20 min: MAC/IP/gateway; ARP do gateway após ping; 8.8.8.8 não entra na tabela ARP; ARP sem resposta para um IP livre. Sem Cisco, sem ritual |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre (aviso) | mentor 2 (máscara /16; rastrear tabela MAC A/B/C), exercícios 2 (VLAN errada a partir de evidências; para qual IP vai o ARP), desafio novo "Os primeiros quadros de um ping" com solução |
| nextTheme 1–2 frases | cumpre | 1 frase, igual à v1 (2.5) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu `oneOf` lab/exercício), unlocks/accessPolicy preservados; "15-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/improvements/evidenceToCollect/questions; challenge sem constraints/gradingRubric |

Verificação do quiz contra a aula v2: q2.4.7 (EtherType) → tabela de campos do Funcionamento interno; q2.4.8 (MAC de destino para 8.8.8.8) → passo 2 do Funcionamento, Exemplo simples, Resumo; q2.4.3 (sem ARP para o gateway) → 3º erro comum e parágrafo final do Funcionamento; q2.4.4 (VLAN ≠ firewall) → 2º erro comum; q2.4.5 (flooding na mesma VLAN) → passo 7; q2.4.9 (switch aprende o MAC de origem) → tabela (MAC de origem) e passo 6. Gabaritos em 1, 2, 0, 3, 1, 0.

## 2. O que saiu e por quê
- Objetivos: "coletar evidências em Windows, Linux e Cisco IOS" (Cisco IOS não é ensinado aqui) e "relacionar com segurança, cloud, DevSecOps" (lista de áreas).
- Motivação: a frase de abertura que enumerava tudo o que a Camada 2 faz (repetia o Problema) e o callout "DHCP correto, mas sem gateway" (trocado por um gancho coerente: com a porta na VLAN de visitantes o host recebe um IP de outra rede).
- Problema: lista de 6 funções (virou 1 parágrafo), "Diagnóstico" como função, meio compartilhado/colisões (prévia 3.4) e a frase sobre voz/servidores/visitantes.
- Conceito: "switch multicamada", Neighbor Discovery do IPv6 (termos avançados).
- Funcionamento interno: coluna "O que observar" (spoofing, filtros defensivos: prévia 3.9); tabela "Onde cada etapa costuma falhar" (stale, entrada falsa, loop, MAC flapping: prévias 3.6, 3.8, 3.9), reduzida a 1 parágrafo com os 2 casos do tema (máscara errada, VLAN errada).
- Arquitetura inteira (prévias 3.7–3.9; o gateway por VLAN foi para o Conceito).
- Analogia: "limite da analogia" (repetia VLAN ≠ firewall).
- enterpriseExample (Cisco IOS e repetição do gancho), cloudExample, devsecopsExample (seção do template).
- security e troubleshooting (módulo 2).
- Lab: passos 5 (Cisco IOS) e 6 (matriz de hipóteses: ritual), scenario, topology, architecture, cost, safetyNotes, validation, improvements, evidenceToCollect, questions.
- Quiz q2.4.6 (comando Cisco). Flashcard fc2.4.7 (VLAN nativa).
- Mentor: "por que a Camada 2 existe se há IP" (reexplica a ideia central) e "rede plana" (prévia 3.7/3.9).
- Exercícios: ex2.4.1 (repete q2.4.8 e a ideia central), ex2.4.3 (planejar VLANs: objetivo da 3.7), ex2.4.4 (portas não usadas: 3.9).
- Desafio "host sem acesso ao gateway após mudança de mesa" (repetia o gancho e o ex2.4.5) → trocado.
- Glossário: os 6 termos da v1 (ensinados pela própria aula).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Ethernet compartilhada, colisões | prévia | 3.4 |
| Switch multicamada (L2 + L3 no mesmo equipamento) | termo avançado / prévia | 11.5 |
| Neighbor Discovery substitui o ARP no IPv6 | termo avançado | — (nenhuma aula do índice cita o termo) |
| MAC de destino/origem como alvo de spoofing e flooding | prévia | 3.9 |
| Estados do cache ARP (stale, entrada falsa) como falhas | prévia (STALE segue citado no exemplo e no lab) | 3.6 |
| Loop e MAC flapping | prévia | 3.8 |
| Tag 802.1Q, VLAN ID, VLAN nativa sem tag | prévia (trunk segue em 1 frase) | 3.7 |
| VLAN ausente da lista do trunk isola o host | prévia | 3.7 |
| Port security, NAC/802.1X, DHCP snooping, DAI, STP/BPDU Guard, storm control | prévia | 3.8, 3.9 |
| Camada 2 em switches de acesso, uplinks, bridges de virtualização | seção removida (Arquitetura) | 3.10 |
| Saída de `show mac address-table dynamic`, `show vlan brief`, `show interfaces trunk`, `show spanning-tree summary` | Cisco IOS não ensinado | 3.3, 3.6, 3.7, 3.8 |
| Cloud: subnets, security groups, overlay, Direct Connect/ExpressRoute | exemplo por ambiente | 14.x |
| DevSecOps: runners, bridges Docker, CNI | exemplo por ambiente | — |
| Vulnerabilidades (ARP spoofing, rede plana, porta exposta, VLAN errada, loop), boas/más práticas, hardening, detecção | seção removida (módulo 2) | 3.9 |
| Comandos e árvore de decisão de troubleshooting (`Get-NetAdapter`, `bridge link`, Cisco) | seção removida (módulo 2) | 2.8, 3.6, 3.10 |
| Matriz de hipóteses por camada | ritual de lab | 2.8, 3.10 |
| Segmentação por função (usuários/servidores/visitantes/gerência) | prévia | 3.7 |

## 4. Acréscimos
- Funcionamento interno: valores do EtherType (`0x0800` = IPv4, `0x0806` = ARP) e ligação do FCS com o contador de erros CRC da 2.3 (usados no desafio).
- Conceito: frase sobre porta access × trunk com ponteiro para a 3.7 (substitui a Arquitetura) e "um gateway por VLAN".
- Lab: passos 3 (8.8.8.8 não entra na tabela ARP) e 4 (ARP sem resposta: "Host de destino inacessível" vindo do próprio IP, INCOMPLETE/FAILED).
- Quiz q2.4.9 (switch aprende o MAC de origem); flashcard fc2.4.8.
- Mentor novo (rastrear a tabela MAC com A, B e C); exercício ex2.4.6 (para qual IP vai o ARP, com o caso 192.168.1.40); desafio novo "Os primeiros quadros de um ping" com solução comentada.
- Glossário: Gateway padrão e Máscara (/24), citados e não explicados.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.917 | 5.405 | 3.462 |
| Teoria (palavras) | 2.768 | 2.978 | 1.428 |
| Núcleo (min, fórmula v2) | 30,3 | 31,9 | 20,0 |
| Prática extra (min) | 105 | 90 | 51 (→ 50) |
| duration declarada | 85-120 min | 110-155 min | 15-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- "prática extra com 782 palavras (~750 no total)": por bloco ficou mentor 251, exercícios 238, desafio + solução 293. Cada item aplica algo novo (máscara errada, rastreio da tabela MAC, diagnóstico por evidências, decisão do ARP, quadros de um ping); o excedente (~30 palavras) vem dos MACs e IPs concretos do desafio.
- "análise ainda não escrita": resolvido por este arquivo.

## 7. Revisão humana
- Diagrama: a linha "Limite lógico: VLAN / domínio de broadcast" foi removida porque punha Host A e Host B (mesma sub-rede, ARP entre eles) em lados opostos de um limite de VLAN. Confira o novo rótulo da zona e a legenda.
- Motivação nova: a v1 dizia "recebe IP correto por DHCP, mas não fala com o gateway" por VLAN errada, o que é incoerente (na VLAN errada o host recebe IP da outra rede). O gancho agora usa o IP de outra rede (10.40) e a internet funcionando.
- Lab, passo 4: as saídas de ping para um IP local sem dono ("Host de destino inacessível" vindo do próprio IP no Windows; "Destination Host Unreachable" e INCOMPLETE/FAILED no Linux) e o fato de `arp -a` no Windows não listar a entrada incompleta não foram testados nesta sessão; o texto admite "ou só tempo esgotado".
- Conceito (350 palavras) e Funcionamento interno (353) acima de ~200: o excedente é mecanismo do tema (MAC/broadcast, switch, VLAN, gateway, ARP, campos do quadro, 8 passos), como na D32(b).
- A aula se sobrepõe muito ao módulo 3 (3.2 a 3.7 detalham cada item); a v2 manteve só a visão geral da camada e apontou 3.7 para trunk. Confirme se esse nível de corte é o desejado para as aulas de camada do m02.
- references (IEEE 802.3, 802.1Q, RFC 826, aula 2.2) e linksToOtherCourses mantidos da v1; o link para "NetworkPolicy e CNI" perdeu o exemplo de DevSecOps que o sustentava.

```json
{
  "id": "2.4", "modulo": "m02", "titulo": "Camada 2 — Enlace: frames, MAC, switch, VLAN e ARP", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "security", "troubleshooting"],
  "conceitos_removidos": 17,
  "acrescimos": ["Valores do EtherType (0x0800/0x0806) e FCS ligado ao contador CRC", "Frase access × trunk com ponteiro para 3.7", "Lab: passos 8.8.8.8 fora da tabela ARP e ARP sem resposta", "Quiz q2.4.9 e flashcard fc2.4.8", "Mentor de rastreio da tabela MAC, exercício ex2.4.6 e desafio dos primeiros quadros de um ping", "Glossário: Gateway padrão e Máscara (/24)"],
  "palavras_visiveis": { "original": 4917, "v1": 5405, "v2": 3462 },
  "nucleo_min": { "original": 30.3, "v1": 31.9, "v2": 20.0 }, "pratica_extra_min": { "original": 105, "v1": 90, "v2": 50 },
  "duration_v2": "15-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Funcionamento interno ficou só com os campos do quadro e os 8 passos do IP ao quadro entregue, sem colunas de segurança nem a tabela de falhas cheia de prévias do módulo 3.",
  "revisao_humana": ["Diagrama: linha de limite de VLAN removida (separava hosts da mesma VLAN)", "Gancho da Motivação reescrito (incoerência DHCP × VLAN errada da v1)", "Saídas do passo 4 do lab não testadas (Windows e Linux)", "Conceito 350 e Funcionamento 353 palavras, acima do alvo", "Sobreposição com o módulo 3: confirmar nível de corte", "references/linksToOtherCourses mantidos da v1"]
}
```
