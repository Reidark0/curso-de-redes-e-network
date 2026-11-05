# Aula 1.4 — Topologias físicas e lógicas (v2)
Base: v1 · Tipo: fundamental · Módulo: m01 (Fundamentos de Redes)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: física × lógica (mesmo switch, redes lógicas diferentes); reconhecer as 7 formas com vantagem/limitação; apontar pontos únicos de falha e relacionar redundância com disponibilidade e custo. Saíram "cloud e SDN" (virou 1 parágrafo do Conceito) e "mapear uma rede pequena" (atividade; é o lab e a aula 1.10) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; evolution removida (a tabela das topologias foi para o Conceito; a história virou 1 frase no Problema) |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 127 palavras; gancho: dois PCs no mesmo switch, um imprime e o outro não; consequência: técnico troca cabo, porta e switch e perde a tarde; segurança em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase; 90 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 3: VLAN (3.7), Gateway (4.5), Firewall (1.7, 9.3). Saíram os 6 da v1 (a aula ensina todos) |
| Problema 80–150, sem repetir o gancho | cumpre | 131 palavras; "É isso que acontece quando se olha só um dos desenhos"; barramento/anel como história em 1 frase; escolha de forma = custo × resistência a falhas |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | definição no Conceito + diagrama; Funcionamento interno mostra como a lógica nasce das decisões dos equipamentos (mecanismo, não repetição) |
| Arquitetura só se acrescenta | cumpre (enxuta) | acesso/distribuição/núcleo como caso real de árvore + uplink como ponto único de falha + custo da redundância (objetivo 3); saíram perímetro, cloud/híbrido, ACLs, WAF |
| Diagrama mantido/corrigido | mantido (rótulos ajustados) | tiradas as faixas 10.10.10.0/24 e 10.10.20.0/24 (CIDR, módulo 5), "VPC/VNet" → "rede virtual", "Política" → "regras"; caixa "Lição principal" → "mesmo switch não significa mesma rede lógica / regras decidem quem passa de uma rede a outra" (a frase "mesmo segmento não significa mesmo acesso" não era ensinada) |
| Erros comuns ≤3, sem repetição | cumpre | 2: diagrama como decoração; confiar em diagrama antigo. Saíram "confundir física com lógica" (é a ideia central) e "cloud como nuvem genérica" (prévia 14.x) e "estrela é sempre robusta" (já está na tabela) |
| Termos avançados cortados ou no glossário | cumpre | saíram SDN, overlay, blast radius, movimento lateral (virou frase simples), tabela MAC, quadros, ACL, WAF, proxy, security group, peering, transit gateway, NAT, CNI, firewall stateful, assimetria |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample: a rede de casa nas duas visões (estrela; gateway; rede de visitantes = segunda rede lógica no mesmo roteador; pontos únicos de falha); analogia da cidade em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e devsecops removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 1) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saiu q1.4.6 (caminho assimétrico); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 5: fc1.4.1, fc1.4.2, fc1.4.4, fc1.4.7 (reescrito sem ACL) + fc1.4.8 novo (ponto único de falha). Saíram fc1.4.5 (diagramas sensíveis) e fc1.4.6 (assimetria) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos (interface + gateway; tracert; mapa físico; mapa lógico + pontos únicos de falha); 387 palavras; 20 min; labType "cloud" → "local" |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (metade do andar sem acesso; matriz + 5 filiais hub-and-spoke × malha), exercícios 2 novos (loja: pontos únicos de falha; classificar 5 casos), desafio enxuto com solução |
| nextTheme 1–2 frases | cumpre | 2 frases, cita a aula 1.5 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}`, unlocks ["1.5"] e accessPolicy preservados; "15-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/challenge/solution; desafio sem gradingRubric e constraints |

Verificação do quiz contra a aula v2: q1.4.1 (definição de lógica) → definição do Conceito; q1.4.2 (mesmo switch, VLANs diferentes) → Conceito (parágrafo das VLANs) e diagrama; q1.4.3 (malha) → tabela; q1.4.4 (rede plana) → Conceito, parágrafo "rede plana"; q1.4.5 (cloud) → Conceito, parágrafo de cloud; q1.4.7 (spine-leaf, distratores hub-and-spoke/barramento/anel) → tabela. Gabaritos em 1, 2, 0, 3, 1, 3.

## 2. O que saiu e por quê
- Motivação da v1 (VPN, proxy, VPC, firewall num só parágrafo; callout "Problema real"): termos avançados e prévias; trocada por um gancho concreto de escritório.
- Problema: lista "sem topologia física/lógica/atualizada/sem separar camadas" (repetição da ideia central e de 0.8) e o parágrafo de segurança (blast radius, menor privilégio: termos avançados; a ideia ficou no parágrafo "rede plana").
- Evolução inteira (seção do template): 1 frase de história foi para o Problema; a tabela das 7 topologias foi para o Conceito, sem a coluna "uso conceitual atual" (fundida em parênteses).
- Conceito: "topologia funcional (DNS, proxy, autenticação)" (prévia 2.7/1.9); servidores distantes "próximos" por túnel ou balanceador (prévia 10.x); 2 itens do callout de erros comuns.
- Funcionamento interno: lista por camada (quadros, tabelas MAC, loops, TLS: prévias do módulo 2/3), roteamento dinâmico/failover/automação (prévia 11.x), caminho assimétrico e firewall stateful (prévia 9.3).
- Arquitetura: perímetro (proxy, VPN, WAF), cloud/híbrido, ACLs, licenças, custo de tráfego entre regiões (prévias 9.x, 14.x).
- Analogia: "limite da analogia" e metade da lista de regras de trânsito.
- enterpriseExample (repetia a Arquitetura), cloudExample (VPC, route tables, NAT, peering, SDN: prévia 14.x), devsecopsExample (Terraform, Kubernetes: fora do tema).
- security e troubleshooting (módulo 1), learningOutcomes.
- Lab: passo de DNS (prévia 1.9), passo "registrar riscos" fundido no mapa lógico, safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions, challenge/solution do lab, Packet Tracer (ritual/repetição).
- Quiz q1.4.6 (assimetria). Flashcards fc1.4.5 e fc1.4.6.
- Mentor "diagrama de cabos não basta" (repete a ideia central) e "filiais à cloud" (prévia 14.x; virou a pergunta matriz + 5 filiais).
- Exercícios ex1.4.1 (repete o exemplo simples), ex1.4.2 (repete o gancho e pede hipóteses com máscara, STP, ACL), ex1.4.3 (coberto pelo desafio), ex1.4.4 (VPC: prévia 14.3).
- Desafio: VPN para cloud, plano de validação com comandos e rubrica (prévia/ritual).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Topologia funcional (DNS, proxy, autenticação como parte do caminho) | prévia | 1.9, 2.7 |
| Túnel, balanceador e overlays aproximando sites distantes | prévia | 10.1, 10.2 |
| Topologia por camada: quadros, tabela MAC, loops, IP/sub-rede/rota | prévia | 2.4, 2.5, 3.3, 3.8 |
| Caminho que muda por protocolo de roteamento, métrica, failover, automação | prévia | 11.4, 11.6 |
| Caminho assimétrico e firewall stateful (texto, quiz, flashcard, glossário) | prévia | 9.3, 6.7 |
| Perímetro: proxy, VPN, WAF; ACLs na distribuição | prévia / termo avançado | 9.2, 9.4, 10.1 |
| Custo de links dedicados e tráfego entre regiões em cloud | prévia | 14.2, 14.8 |
| Cloud: VPC/VNet, subnets, route tables, NAT, security groups, peering, transit gateway, hub-and-spoke em VNet | prévia (ficou "em cloud a física some, a lógica continua") | 14.3, 14.5, 14.9 |
| SDN (controlador central programa o encaminhamento) | termo avançado / prévia | 14.1 |
| DevSecOps: Terraform, Kubernetes (Pods, Services, NetworkPolicies, CNI), runner sem rota | exemplo por ambiente | fora do curso (linksToOtherCourses) |
| Rede de gestão, impressoras, Wi-Fi corporativo × visitantes no exemplo empresarial | repetição (visitantes ficou no exemplo de casa e no desafio) | 9.4 |
| Movimento lateral, blast radius, menor privilégio, exfiltração, SOC | termo avançado (ideia mantida em linguagem simples) | 9.4 |
| Diagramas como informação sensível | seção removida (security) | 9.4 / 16.x |
| Boas/más práticas, vulnerabilidades, monitoramento, hardening e detecção (NetFlow/sFlow, alteração de rotas) | seção removida (módulo 1) | 9.4, 15.x |
| Comandos ipconfig/route print/Test-NetConnection/ss/curl e Cisco IOS (show cdp, show vlan, show spanning-tree) | seção removida (módulo 1) | 1.9, 3.8, 15.3 |
| Endereços 10.10.10.0/24 e 10.10.20.0/24 no diagrama | termo avançado | 4.3, 5.1 |
| Uso conceitual atual de barramento ("broadcast") | termo avançado | 3.4 |

## 4. Acréscimos
- Conceito: parágrafo explicando VLAN em 1 frase ("o switch divide suas portas em redes separadas; só se falam por roteador ou firewall"), porque q1.4.2, o gancho e o diagrama dependem dele e o aluno só vê VLAN na 3.7.
- Conceito: definição de ponto único de falha (o objetivo 3, o fc1.4.8 e a prática dependem dela; na v1 só estava no glossário e na segurança).
- Conceito: parágrafo "rede plana" em linguagem simples (sustenta q1.4.4, antes apoiada no bloco security removido).
- simpleExample reescrito: a rede de casa nas duas visões, com a rede de visitantes como segunda rede lógica e os pontos únicos de falha.
- Mentor novo (matriz + 5 filiais: 5 × 15 enlaces), exercícios novos ex1.4.5 (loja) e ex1.4.6 (classificar casos), flashcard fc1.4.8.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.953 | 5.216 | 3.358 |
| Teoria (palavras) | 2.650 | 2.761 | 1.454 |
| Núcleo (min, fórmula v2) | 29,4 | 31,2 | 20,2 |
| Prática extra (min) | 80 | 80 | 51 (→ 50) |
| duration declarada | 75-105 min | 135-190 min | 15-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- Nenhum aviso de conteúdo (o único aviso, "análise ainda não escrita", é resolvido por este arquivo).
- Palavras visíveis caíram 36% em relação à v1 (alvo ~50%). O que segura o tamanho é a tabela das 7 topologias (~250 palavras), que é o próprio objetivo 2, e o quiz (438 palavras, opções longas do spine-leaf e da cloud).

## 7. Revisão humana
- Diagrama: rótulos ajustados (CIDR e VPC/VNet saíram; a frase "mesmo segmento não significa mesmo acesso" virou "regras decidem quem passa de uma rede a outra"). Confirme.
- Glossário: VLAN e Gateway têm uma frase de definição na aula, mas entraram no glossário por apontarem as aulas que os explicam (3.7, 4.5). Tirar se o critério for estrito.
- O lab se sobrepõe ao mini-projeto da 1.10 ("criar um mapa físico e lógico de uma rede pequena"). Mantido por ser executável e curto; avalie se a 1.10 deve evitar repeti-lo.
- Comandos do lab no macOS (`ifconfig`, `netstat -rn`, `traceroute`) foram acrescentados; não testados aqui.
- Quiz: q1.4.4 e q1.4.5 reescritas sem "movimento lateral" e sem "VPC/VNet, route tables, security groups" (ids mantidos); q1.4.7 com opções reescritas.
- references (incl. "IEEE 802 family" e documentação cloud, url vazia) e linksToOtherCourses (Terraform, Kubernetes, Zero Trust) mantidos como na v1; confirme se ainda fazem sentido sem os exemplos de cloud e DevSecOps.

```json
{
  "id": "1.4", "modulo": "m01", "titulo": "Topologias físicas e lógicas", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "evolution", "enterpriseExample", "cloudExample", "devsecopsExample", "security", "troubleshooting"],
  "conceitos_removidos": 17,
  "acrescimos": ["Conceito: VLAN em 1 frase", "Conceito: definição de ponto único de falha", "Conceito: rede plana em linguagem simples", "simpleExample reescrito (casa nas duas visões)", "Mentor matriz + 5 filiais", "Exercícios ex1.4.5 e ex1.4.6", "Flashcard fc1.4.8"],
  "palavras_visiveis": { "original": 4953, "v1": 5216, "v2": 3358 },
  "nucleo_min": { "original": 29.4, "v1": 31.2, "v2": 20.2 }, "pratica_extra_min": { "original": 80, "v1": 80, "v2": 50 },
  "duration_v2": "15-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "A diferença física × lógica agora vem de um caso concreto (dois PCs no mesmo switch) e de uma frase sobre VLAN, e as 7 formas ficam numa só tabela com vantagem e limitação, sem listas de siglas de cloud e segurança.",
  "revisao_humana": ["Rótulos do diagrama ajustados", "VLAN e Gateway no glossário apesar da frase de definição", "Lab sobreposto ao mini-projeto da 1.10", "Comandos macOS do lab não testados", "Redação de q1.4.4, q1.4.5 e q1.4.7 ajustada", "references/linksToOtherCourses mantidos da v1"]
}
```
