# Aula 1.10 — Revisão e mini-projeto: mapear sua rede (v2)
Base: v1 · Tipo: ligação/revisão · Módulo: m01 (Fundamentos de Redes)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: inventário classificado + visões física/lógica; comandos como evidência com data, origem, limite e fato/hipótese/lacuna; riscos + sanitização. Saíram "revisar os conceitos do Módulo 1" (lista) e "preparar a transição para o OSI" (fica no nextTheme) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 129 palavras; gancho: assumir o suporte de um escritório com três queixas e nada documentado; consequência: link novo caro que não resolve um Wi-Fi fraco; segurança em 1 frase ("não se protege o que não se conhece") |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase padrão; 88 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | removido | os 5 termos da v1 (mapa de rede, inventário, evidência, lacuna, sanitização) são ensinados pela própria aula; NAT saiu do texto, então não há termo citado sem explicação |
| Problema 80–150, sem repetir o gancho | cumpre | 134 palavras; abre com "É isso que acontece quando a rede não tem mapa"; diagnóstico no escuro + desenho sem evidência; diz o que a aula resolve |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | fato/hipótese/lacuna e mapa sustentado por evidências no Conceito; etapas do host para fora no Funcionamento interno; diagrama mostra evidências → mapa → riscos |
| Arquitetura só se acrescenta | removida | as visões física e lógica foram para o Conceito; operacional e segurança já estão nas linhas "Métricas" e "Riscos" da tabela; o resto era prévia (cloud, SNMP, documentação como código) |
| Diagrama mantido/corrigido | mantido (rótulos ajustados) | "firewall/proxy" → "firewall"; "DNS/web/cloud" → "DNS, web"; `desc` atualizado |
| Erros comuns ≤3, sem repetição | cumpre | 2 itens (misturar físico e lógico; concluir com uma evidência). Saíram "desenho sem evidência" (repetia o Problema) e "compartilhar sem sanitizar" (repetia a subseção "Mapa é documento sensível") |
| Termos avançados cortados ou no glossário | cumpre | saíram VLAN, NAT, proxy, VPN, link WAN, jitter/throughput na tabela, rogue device, NAC, SNMP, CDP, movimento lateral, rede plana, security groups |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample = inventário de uma casa (tabela) + raciocínio por sintomas; analogia do hospital em 2 frases, com o "limite" virando meia frase (a rede muda, o mapa leva data) |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterpriseExample e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 1) por `ajustar regras` |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões, ids mantidos; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6, ids mantidos; versos de fc1.10.1 e fc1.10.2 simplificados (sem "racks"/"políticas") |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | o aluno roda os comandos na própria rede e monta o mapa: 4 passos, 418 palavras, 30 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre (aviso) | mentor 2, exercícios 3, desafio novo (fato/hipótese/lacuna num caso dado) com solução |
| nextTheme 1–2 frases | cumpre | 2 frases (aula 2.1) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu `anyOf` com `checklistDone`); unlocks ["2.1"] e accessPolicy preservados; "15-25 min + 65 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario, topology, architecture, cost, safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions |

Verificação do quiz contra a aula v2: q1.10.1 (definição de mapa) → caixa de definição do Conceito; q1.10.2 (cabo = visão física) → "Inventário e as duas visões"; q1.10.7 (IP válido, gateway não responde) → parágrafo depois da tabela do Funcionamento interno; q1.10.4 (por que proteger mapas) → "Mapa é documento sensível"; q1.10.5 (asteriscos) → linha "Caminho" da tabela; q1.10.8 (servidor de outra rede fora do ARP) → linha "Vizinhança" da tabela, que agora explica que o host fala com ele pelo gateway. Gabaritos em 1, 1, 3, 1, 2, 0.

## 2. O que saiu e por quê
- Motivação: lista do que o módulo ensinou (repetição/lista) e "antes de redesenhar, segmentar ou migrar para cloud" (prévia); o callout "Problema real" virou o gancho.
- Problema: lista Operação/Segurança/Custo/Cloud/DevSecOps (prévias e exemplos por ambiente); "VLAN, firewall, rota" e "portas, VLANs e enlaces" (termos de módulos futuros).
- Conceito: definição encurtada ("endereçamento inicial", "evolução da arquitetura"); erros comuns "desenho sem evidência" e "compartilhar sem sanitizar" (repetição).
- Funcionamento interno: "sistema", "switch/AP quando conhecido", "aplicação ou API", "roteador, firewall, proxy, VPN ou link WAN", "jitter aproximado, throughput percebido, disponibilidade observada", "porta exposta, DNS suspeito, rede plana, caminho crítico sem redundância" (termos não explicados ou prévias).
- Arquitetura inteira (as 4 visões: física e lógica foram para o Conceito; cloud com VPC/VNet/security groups/NAT Gateway e descoberta por SNMP/agentes/documentação como código = prévias).
- Analogia: segunda metade da frase do hospital e callout "Limite da analogia" (reduzido a meia frase).
- simpleExample: "perda de sinal quando a porta do cômodo fecha"; "NAT" na linha do roteador.
- enterpriseExample e securityExample (seção do template; a tabela de riscos trazia rede plana, movimento lateral, NAC, segmentação).
- security e troubleshooting (módulo 1), learningOutcomes, glossary (termos ensinados pela própria aula).
- Lab: passos 1 (escopo, virou instrução do passo 1 e pré-requisito), 4–6 fundidos em 2 e 3, 7–10 fundidos no 4; scenario, topology, architecture, cost, safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions (ritual); ferramentas opcionais (Packet Tracer, desenho).
- Mentor "por que um mapa sem evidências pode ser enganoso" (reexplicava a ideia central).
- Exercício ex1.10.2 "liste cinco evidências" (repetia a tabela do Funcionamento interno).
- Desafio "transforme o relatório do laboratório em documentação técnica", com rubrica de pontos (repetia o lab) → trocado por um caso novo.

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Visões operacional e de segurança como seções próprias do mapa | repetição (ficaram como linhas "Métricas" e "Riscos" da tabela) | — |
| Rede em cloud: VPC/VNet, subnets, route tables, security groups/NSGs, NAT Gateway, DNS privado, peering | prévia | 9.7, 14.1, 14.4, 14.7 |
| Inventário automático por SNMP, agentes e documentação como código | prévia | 7.10 |
| Comandos Cisco IOS (show ip interface brief, mac address-table, arp, cdp neighbors, ip route) | seção removida (módulo 1) / equipamento não ensinado | 2.4, 3.3 |
| Árvore de decisão (sem IP → DHCP; sem gateway → meio; DNS falha; serviço não abre → porta, proxy, TLS) | seção removida; o degrau "tem IP, não alcança o gateway" ficou no Funcionamento interno e o resto é a aula 1.9 | 1.9 |
| Rede plana, segmentação e movimento lateral | prévia / termo avançado | 9.4, 13.2 |
| NAC, APs não autorizados (rogue), revisão de leases DHCP | prévia | 3.9, 7.6, 12.7 |
| "NAT não substitui firewall" | prévia | 6.7, 9.5 |
| VLAN como causa de falha e Wi-Fi visitante em VLAN separada | prévia (o exercício ex1.10.4 aponta 3.7 e 9.4) | 3.7, 9.4 |
| Monitoramento (mudança de gateway/DNS via DHCP, novos dispositivos, logs de DHCP/DNS/firewall), hardening (racks, patch panels) | seção removida (módulo 1) | 7.9, 7.10 |
| Jitter, throughput e disponibilidade como itens do mapa | termo de 1.8 sem como medir no lab; a linha de métricas ficou com latência, perda e sintomas | 1.8 |
| Proxy, VPN e link WAN no caminho | termo avançado / prévia | 10.x |
| Custo (compra de banda/appliances sem saber o gargalo), cloud e DevSecOps no Problema | exemplo por ambiente; o custo virou o gancho da Motivação | — |
| Guardar mapas em repositório com controle de acesso; versionar documentos | seção removida (security) | — |
| Rubrica de avaliação do desafio (pontos por critério) | ritual | — |

## 4. Acréscimos
- Conceito: exemplos concretos de fato, hipótese e lacuna (gateway visto no `ipconfig /all` com data; caminho provável; aparelho 192.168.0.30 desconhecido).
- Conceito: inventário classificado por papel (final, intermediário, serviço, meio), retomando a 1.2, e "classifique pelo papel, não pelo nome comercial" (vinha do troubleshooting do lab e do exercício ex1.10.5).
- Conceito: subseção "Mapa é documento sensível" com autorização e o exemplo de sanitização (vinha do lab, do flashcard e da security removida); sustenta q1.10.4.
- Funcionamento interno: o servidor de outra rede não aparece no ARP porque o host fala com ele pelo gateway (sustenta q1.10.8) e o parágrafo "se o host tem IP mas não alcança o gateway…" (sustenta q1.10.7, antes só na árvore de decisão removida).
- Exercício ex1.10.3 reescrito: sanitizar linhas concretas do `ipconfig /all` (antes pedia só para citar três informações). Id mantido.
- Desafio novo "Fato, hipótese ou lacuna?" com solução comentada (caso do escritório da Motivação).
- Lab, passo 2: `ping -c 4` no Linux (sem `-c`, o ping do Linux não para sozinho).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.093 | 4.251 | 3.054 |
| Teoria (palavras) | 2.192 | 2.187 | 1.278 |
| Núcleo (min, fórmula v2) | 25,9 | 25,8 | 18,8 |
| Prática extra (min) | 95 | 105 | 67 (→ 65) |
| duration declarada | 70-105 min | 120-165 min | 15-25 min + 65 min de prática extra |

## 6. Avisos do validar e justificativas
- "prática extra com 754 palavras (~750 no total)": mentor 159, exercícios 260, desafio + solução 335. É a aula de mini-projeto do módulo; o desafio traz um conjunto de evidências novo para o aluno classificar, e cada exercício aplica algo diferente (classificar por papel e visão, sanitizar uma saída real, transformar observação em recomendação).
- "análise ainda não escrita": resolvido por este arquivo.

## 7. Revisão humana
- Lab no Windows: `ping <gateway>` e `nslookup exemplo.com` mantidos da v1; o domínio `exemplo.com` não foi conferido (se não resolver, o passo 3 mostra NXDOMAIN em vez de um IP). Talvez trocar por um domínio conhecido.
- Exercício ex1.10.3 mudou de enunciado com o mesmo id (o tema, sanitização, é o mesmo).
- ex1.10.4 cita "rede de convidados" de roteadores e APs domésticos como melhoria inicial e aponta 3.7 e 9.4 para VLAN/firewall; confirme se a remissão à 9.4 é a desejada (também há 13.2).
- Rótulos do diagrama ajustados ("proxy" e "cloud" saíram).
- Glossário removido inteiro: os 5 termos da v1 são explicados pela própria aula.
- references (ISO/IEC 7498-1 e cursos internos com url vazia) e linksToOtherCourses mantidos como na v1.

```json
{
  "id": "1.10", "modulo": "m01", "titulo": "Revisão e mini-projeto: mapear sua rede", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "securityExample", "security", "troubleshooting", "glossary"],
  "conceitos_removidos": 15,
  "acrescimos": ["Conceito: exemplos de fato/hipótese/lacuna", "Conceito: inventário classificado por papel", "Conceito: subseção 'Mapa é documento sensível'", "Funcionamento interno: ARP e servidor de outra rede; degrau 'tem IP, não alcança o gateway'", "Exercício ex1.10.3 reescrito (sanitizar saída concreta)", "Desafio novo 'Fato, hipótese ou lacuna?' com solução", "Lab: ping -c 4 no Linux"],
  "palavras_visiveis": { "original": 4093, "v1": 4251, "v2": 3054 },
  "nucleo_min": { "original": 25.9, "v1": 25.8, "v2": 18.8 }, "pratica_extra_min": { "original": 95, "v1": 105, "v2": 65 },
  "duration_v2": "15-25 min + 65 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Conceito agora define fato, hipótese e lacuna com exemplos concretos e junta inventário, visões física/lógica e sanitização, sem a Arquitetura de 4 visões nem as prévias de cloud, VLAN e segmentação.",
  "revisao_humana": ["Domínio exemplo.com do lab não conferido", "ex1.10.3 reescrito com o mesmo id", "ex1.10.4: remissão a 3.7 e 9.4", "Rótulos do diagrama ajustados (proxy/cloud saíram)", "Glossário removido inteiro", "references/linksToOtherCourses mantidos da v1"]
}
```
- Orquestrador: `exemplo.com` (domínio real, não reservado) trocado por `example.com` (RFC 2606) na tabela e no lab, como na 1.9.
