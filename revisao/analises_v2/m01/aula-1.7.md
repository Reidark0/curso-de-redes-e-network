# Aula 1.7 — Equipamentos de rede: NIC, hub, switch, roteador, AP e firewall (v2)
Base: v1 · Tipo: fundamental · Módulo: m01 (Fundamentos de Redes)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: diferenciar os 6 papéis pelo que leem e decidem; tabela MAC (aprender/encaminhar/inundar) e tabela de rotas (conectada/default); escolher o equipamento a investigar diante de um sintoma. Saíram "equivalentes em cloud e DevSecOps" (prévia 14.x) e "riscos de segurança" (módulo 1 sem segurança) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; `evolution` (texto + tabela) apagado; history já não existia na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 143 palavras; chamado "a internet caiu" e reiniciar o roteador; consequência = tentativa e erro; carreira/segurança em 1 frase (alerta → evidência no switch, AP ou firewall). Saiu o callout do SOC |
| Resumo 4–5 itens + frase final | cumpre | 89 palavras, 5 itens + frase padrão |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 2: VLAN (1.4, 3.7), NAT (1.2, 9.5). Saíram NIC, Switch, Roteador, Access point, Firewall e Hub (a aula ensina) |
| Problema 80–150, sem repetir o gancho | cumpre | 123 palavras; "é isso que acontece quando todos os equipamentos são tratados como a caixa que passa internet"; tarefas da rede; hubs → switch em 1 frase (o que sobrou da Evolução); roteador de casa junta tudo; o que a aula resolve. Saiu a lista "Sem NIC/Sem switch…" |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | papéis só na lista do Funcionamento interno + diagrama; Conceito = definição (3 perguntas), MAC × IP, quadro × pacote, camada 2 × 3, "o nome engana" |
| Arquitetura só se acrescenta | removida | acesso/distribuição/borda já aparecem na 1.4; o resto era lista de siglas (MPLS, SD-WAN, WAF, NAC, IDS/IPS, EDR) e custo |
| Diagrama mantido/corrigido | corrigido | a v1 punha o hub no caminho entre notebook e switch, a NIC como caixa separada ligada direto ao servidor e o AP ligado ao roteador. Agora: notebook (NIC) → switch → roteador → firewall → internet; servidor e AP (com celular pelo rádio) no switch; hub à parte como legado; rótulos com o que cada um lê; nota do roteador de casa; `desc` reescrita |
| Erros comuns ≤3, sem repetição | cumpre | 3: switch = roteador; firewall = roteador com bloqueio; ignorar a NIC. Saiu "AP é sinônimo de internet" (já está no item do AP e no exemplo) |
| Termos avançados cortados ou no glossário | cumpre | saíram duplex, domínio de colisão/broadcast (ideia mantida em linguagem simples), Gi0/3, roaming, potência, associação, estado de conexão, zonas, switch L3, SR-IOV, eBPF, NGFW, ZTNA etc.; MAC, IP, quadro, pacote, broadcast, SSID, próximo salto e /24 explicados em 1 frase |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample do roteador de casa, com os papéis da caixa e 2 diagnósticos guiados pela pergunta "o que funciona e o que falha têm em comum?"; analogia do prédio em 3 frases, com o hub e sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e devsecops removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 1) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saíram q1.7.3 (802.1X/porta pública) e q1.7.5 (security group em cloud); nova q1.7.8 (rota default); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6; saiu fc1.7.7 (NAT × firewall); fc1.7.9 reescrito sem "domínio de colisão/broadcast"; fc1.7.8, fc1.7.4 e fc1.7.5 sem duplex/associação/zonas |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não se aplica | não havia lab (a 1.9 é a aula dos comandos) |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (tabela MAC em 3 quadros; AP doméstico na tomada), exercícios 2 (celular sem IP; classificar 6 decisões), desafio novo "três chamados no mesmo escritório"; 748 palavras |
| nextTheme 1–2 frases | cumpre | mantido da v1 (2 frases, aponta 1.8) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu `oneOf`), unlocks ["1.8"] e accessPolicy preservados; "15-25 min + 30 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | challenge sem constraints/gradingRubric |

Verificação do quiz contra a aula v2: q1.7.1 (papel da NIC) → item NIC; q1.7.2 (switch × roteador) → itens Switch/Roteador + camada 2 × 3 do Conceito; q1.7.4 (só Wi-Fi oscila) → item AP + pergunta "o que têm em comum" do Exemplo; q1.7.6 (hub) → item Hub; q1.7.7 (destino desconhecido) → "inunda" no item Switch; q1.7.8 (8.8.8.8 → rota default) → tabela de rotas com valores. Gabaritos em 1,3,1,0,1,2.

## 2. O que saiu e por quê
- Motivação: lista de 13 lugares da falha (encurtada para 5), frases "um switch não é…/um firewall não é…" (repetiam os erros comuns), callout do SOC (virou 1 frase).
- Problema: lista "Sem NIC / Sem switch / … / Com hub" (repetia o Funcionamento interno).
- evolution inteira: seção do template; a ideia hub → switch virou 1 frase no Problema; tabela de evolução (SR-IOV, eBPF, STP, PoE, SD-WAN, Wi-Fi 6/7, WPA3, NGFW, ZTNA) = prévias.
- Conceito: "sete perguntas" reduzidas a três (lê, consulta, decide); "domínio de camada 2" (termo avançado).
- Funcionamento interno: parágrafo de domínios de colisão/broadcast (prévia 3.4; a ideia ficou nos itens Hub, Switch e Roteador sem os termos); duplex; roaming, potência e associação do AP (prévia 12.4/12.6); estado, zonas e contexto do firewall (prévia 9.3/9.4); VLAN 10 e Gi0/3 na tabela MAC e Gi0/0 na de rotas (nomes de interface Cisco); parágrafo "equipamentos acumulam papéis" (foi para o Conceito); erro comum "AP é sinônimo de internet" (repetido no item do AP e no exemplo).
- architecture inteira (camadas de acesso/distribuição/borda já na 1.4; lista de siglas; custo de equipamentos gerenciáveis).
- Analogia: "limite da analogia".
- enterpriseExample, cloudExample, devsecopsExample (seção do template / prévias de 13.x e 14.x).
- security e troubleshooting (módulo 1); learningOutcomes.
- Quiz q1.7.3 (dependia de 802.1X/VLAN restrita) e q1.7.5 (cloud). Flashcard fc1.7.7 (NAT × firewall, prévia 9.5/6.7).
- Mentor "por que não basta dizer que passa internet" (reexplicava a ideia central) e "pinga na LAN mas não sai" (virou caso do simpleExample).
- Exercícios ex1.7.1 (repetia q1.7.2 e a ideia central), ex1.7.3 (desenhar papéis: repetia o diagrama) e ex1.7.4 (riscos de segurança, módulo 1).
- Desafio "organize os papéis de uma pequena empresa" (VLANs, segmentação, logs: prévias 3.7, 9.4, 13.2) → trocado por desafio de diagnóstico com os papéis da aula.

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Domínio de colisão e domínio de broadcast (termos) | prévia (ideia mantida em linguagem simples) | 3.4 |
| Duplex negociado pela NIC | termo avançado | 3.1 |
| Evolução moderna: NIC virtual, SR-IOV, offload, eBPF | prévia / termo avançado | 14.11 |
| STP, PoE e port security como evolução do switch | prévia | 3.8, 1.6 (PoE), 3.9 |
| Switch L3 também roteia | prévia | 11.5 |
| SD-WAN, roteamento dinâmico, route tables de cloud | prévia | 11.x, 14.4 |
| Controladoras, Wi-Fi 6/7, WPA3, roaming, potência, associação | prévia | 12.3–12.7 |
| Firewall stateful, zonas, NGFW, WAF, ZTNA | prévia | 9.3, 9.4, 9.6, 10.7 |
| Camadas acesso/distribuição/borda/serviços/controle | repetição da 1.4 / prévia | 1.4, 13.1 |
| Custo de equipamentos gerenciáveis × domésticos (licenças, logs) | fora do tema central | 13.3 |
| Evidências por equipamento em incidente (porta/MAC/VLAN, RSSI, conexões bloqueadas) | exemplo por ambiente / prévia | 13.4, 13.5, 15.3 |
| Equivalentes em cloud (vSwitch, route table, NAT gateway, security group, NSG, load balancer, flow log, custo) | exemplo por ambiente / prévia | 9.7, 14.4–14.6, 14.12 |
| Rede como código (Terraform, Kubernetes, NetworkPolicy, pipeline sem acesso a registry) | exemplo por ambiente / prévia | 14.11, 9.9 |
| Vulnerabilidades (porta exposta, firewall permissivo, rogue AP, AP mal configurado, rota incorreta), boas/más práticas, hardening, monitoramento, detecção | seção removida (módulo 1) | 3.9, 12.8, 13.3, 9.9 |
| 802.1X / NAC / VLAN de quarentena | prévia | 3.9, 12.5 |
| Comandos ipconfig/getmac/Get-NetAdapter/ip link/show mac address-table e árvore de decisão | seção removida (módulo 1) | 1.9, 15.3 |
| NAT não substitui firewall; SSID oculto não é segurança | prévia | 9.5, 12.4 |
| Segmentação de visitantes/câmeras/servidor com VLANs (desafio da v1) | prévia | 3.7, 9.4, 13.2 |

## 4. Acréscimos
- Conceito: MAC × IP, quadro × pacote e camada 2 × 3 em linguagem de iniciante (a v1 usava os termos sem explicar, e q1.7.2 depende deles).
- Funcionamento interno: frase sobre o `/24` (o aluno ainda não conhece CIDR) e leitura "de 192.168.10.0 a 192.168.10.255" na tabela de rotas.
- simpleExample: dois diagnósticos guiados pela pergunta "o que funciona e o que falha têm em comum?" (sustenta q1.7.4 e o objetivo 3).
- Quiz q1.7.8 (rota default com a tabela da aula).
- Mentor novo: tabela MAC em três quadros. Exercícios novos/reescritos: celular sem IP (ex1.7.2), classificar 6 decisões (ex1.7.5). Desafio novo "Três chamados no mesmo escritório" com solução comentada.
- Diagrama corrigido (ver checklist).
- Glossário: VLAN → 1.4/3.7, NAT → 1.2/9.5.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.072 | 4.590 | 3.072 |
| Teoria (palavras) | 2.816 | 3.034 | 1.457 |
| Núcleo (min, fórmula v2) | 30,7 | 33,3 | 20,2 |
| Prática extra (min) | 45 | 45 | 31 (→ 30) |
| duration declarada | 80-115 min | 75-105 min | 15-25 min + 30 min de prática extra |

## 6. Avisos do validar e justificativas
- Nenhum aviso de conteúdo no `validar` final (só "análise ainda não escrita", resolvido por este arquivo). Na primeira rodada houve aviso de prática extra com 762 palavras; o desafio foi enxugado para 748.

## 7. Revisão humana
- Diagrama redesenhado (a v1 tinha o hub no caminho principal, a NIC ligada direto ao servidor e o AP ligado ao roteador). Confira se a ordem switch → roteador → firewall → internet atende ao curso (a v1 usava a mesma ordem).
- As palavras visíveis caíram 33% (4.590 → 3.072), menos que a metade da calibração da 0.1, porque o quiz (506 palavras) e a prática extra (748) seguem grandes; a teoria caiu 52%.
- Quiz: q1.7.7 trocou "todas as portas da VLAN" por "todas as portas, exceto a de entrada" (a VLAN ficou na explicação); id mantido.
- ex1.7.2: a resposta cita "DHCP sem endereços livres", ideia que a aula não ensina (é hipótese de aplicação; DHCP vem da 1.2).
- references (IEEE 802.3/802.11 sem url e dois internos) e linksToOtherCourses (DevSecOps, IAM) mantidos da v1; confirme se ainda fazem sentido sem os exemplos de cloud/DevSecOps e sem 802.1X.

```json
{
  "id": "1.7", "modulo": "m01", "titulo": "Equipamentos de rede: NIC, hub, switch, roteador, AP e firewall", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "evolution", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "security", "troubleshooting"],
  "conceitos_removidos": 18,
  "acrescimos": ["Conceito: MAC × IP, quadro × pacote, camada 2 × 3", "Funcionamento: leitura do /24 na tabela de rotas", "Exemplo: diagnósticos pela pergunta do que é comum", "Quiz q1.7.8 (rota default)", "Mentor: tabela MAC em três quadros", "Exercícios ex1.7.2 reescrito e ex1.7.5 novo", "Desafio Três chamados no mesmo escritório", "Diagrama corrigido", "Glossário: VLAN e NAT"],
  "palavras_visiveis": { "original": 4072, "v1": 4590, "v2": 3072 },
  "nucleo_min": { "original": 30.7, "v1": 33.3, "v2": 20.2 }, "pratica_extra_min": { "original": 45, "v1": 45, "v2": 30 },
  "duration_v2": "15-25 min + 30 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "Cada equipamento virou um item com o que lê e o que decide, e a tabela MAC e a de rotas aparecem com valores, sem tabelas de evolução, camadas de arquitetura nem equivalentes de cloud.",
  "revisao_humana": ["Diagrama redesenhado (hub fora do caminho, AP e servidor no switch)", "Palavras visíveis -33%, menos que a calibração da 0.1 (quiz e prática extra grandes)", "q1.7.7: opção sem VLAN", "ex1.7.2 cita DHCP sem endereços livres", "references/linksToOtherCourses mantidos da v1"]
}
```
