# Aula 1.3 — Tipos de rede: PAN, LAN, WLAN, CAN, MAN, WAN e SAN (v2)
Base: v1 · Tipo: intermediária · Módulo: m01 (Fundamentos de Redes)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: diferenciar os 7 tipos por alcance/finalidade/meio/controle; classificar um cenário real com tipos coexistindo; usar o tipo para localizar uma falha e saber quem acionar (WLAN × internet, WAN × LAN, SAN × NAS). Saíram "equivalentes em cloud" (prévia 14.1) e "evitar decorar siglas" (não mensurável) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 139 palavras; gancho "Wi-Fi com sinal cheio, fone tocando, impressora funcionando, nenhum site abre"; consequência (mexer na peça errada, ligar para a pessoa errada); carreira/empresa em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase padrão; 86 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 2: Switch (1.7, 3.3) e Access point (1.7, 12.7). Os 6 termos da v1 (PAN, LAN, WLAN, WAN, SAN, Domínio administrativo) saíram: a aula os explica |
| Problema 80–150, sem repetir o gancho | cumpre | 128 palavras; retoma com "é isso que acontece quando tudo vira 'a rede'"; origem das siglas em 1 frase; diz o que a aula resolve |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | classificação no Conceito (definição + tabela), preocupação de cada tipo no Funcionamento interno, coexistência no diagrama. Saíram VLAN, gateway, DNS, NAT, VPN, SD-WAN, zoning, paths, VPC/VNet |
| Arquitetura só se acrescenta | removida | as camadas "borda/distribuição/interconexão/datacenter/cloud" repetiam o Funcionamento e traziam prévias (VLAN, SD-WAN, ExpressRoute/Direct Connect, peering); a coexistência ficou no diagrama e em 1 frase do Conceito |
| Diagrama mantido/corrigido | corrigido | o da v1 ligava PAN→LAN→WLAN→CAN→MAN em cadeia e a WAN à SAN com setas, o que sugere um fluxo que não existe. Novo diagrama: sede (empresa controla) com PAN, WLAN, LAN, servidores, SAN e storage; WAN (operadora controla) levando à filial e à internet; rodapé situa CAN e MAN |
| Erros comuns ≤3, sem repetição | cumpre | 3: "tudo é LAN porque é da mesma empresa", "esperar da WAN a latência da LAN" (com ordem de grandeza), "SAN × NAS". "Wi-Fi não é internet" ficou só no Exemplo (resolve o gancho); "cloud dispensa redes" e "toda ligação entre sites é internet pública" saíram |
| Termos avançados cortados ou no glossário | cumpre | saíram VLAN, broadcast, gateway, DNS, NAT, SLA, VPN, SD-WAN, chatty, zoning, multipath, rogue AP, NAC, SIEM, IaC, policy as code, virtualização; switch e AP no glossário; domínio administrativo e storage explicados no texto |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample = a casa classificada (PAN, LAN, WLAN, WAN, NAS ≠ SAN) + resolução do gancho da Motivação; analogia do transporte em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterpriseExample, cloudExample e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 1) por `ajustar regras` |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saíram q1.3.4 (LAN plana/movimento lateral) e q1.3.5 (VPC/VNet); q1.3.7 reescrita sem ping/gateway; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6 (os mesmos ids); versos de WAN, SAN, CAN×MAN, "pergunta para classificar" e "Wi-Fi ≠ internet" alinhados ao texto (sem gateway/DNS/NAT/backbone) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não se aplica | a v1 não tinha lab; o tema (classificação) não tem um resultado executável que a leitura não dê |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre (aviso) | mentor 2 (cálculo 200 × 0,5 ms × 200 × 30 ms; alcance do fone Bluetooth); exercícios 2 (classificar 5 ligações, incluindo NAS; chamados → tipo + quem aciona); desafio reescrito (classificar uma empresa pequena + diagnosticar o chamado da filial) |
| nextTheme 1–2 frases | cumpre | 1 frase (1.4) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` de exercícios), unlocks ["1.4"] e accessPolicy preservados; "15-20 min + 30 min de prática extra", estimatedStudyTimeMinutes 20 |
| Campos invisíveis | cumpre | nenhum na base; challenge sem constraints e gradingRubric (texto de avaliação de segurança que saiu do escopo) |

Verificação do quiz contra a aula v2: q1.3.1 (LAN) → tabela do Conceito; q1.3.2 (WLAN = LAN sem fio) → tabela e parágrafo "a WLAN se diferencia da LAN pelo meio"; q1.3.3 (sede e filial em estados diferentes = WAN) → tabela; q1.3.6 (SAN × NAS) → callout "Erros comuns"; q1.3.7 (Wi-Fi cheio e impressora ok, sem sites) → Exemplo simples, 2º parágrafo; q1.3.8 (CAN com fibra própria × MAN com operadora) → tabela. Gabaritos em 1, 2, 0, 2, 3, 0.

## 2. O que saiu e por quê
- Objetivos 4 e 5 (cloud: prévia 14.1; "evitar decorar siglas": não mensurável, a ideia ficou no objetivo 3).
- Motivação: lista de redes da v1 (virou o gancho concreto); callout "Problema real" (repetia o Problema e listava firewall/logs: prévias).
- Problema: lista de finalidades por sigla (repetia a tabela); lista das 5 dimensões (alcance, meio, controle, risco, custo) com termos de cloud/VPN/storage fabric (as 4 dimensões foram para a definição do Conceito); frase "trata Wi-Fi como cabo…" (repetia os erros comuns).
- Conceito: termos da tabela (broadcast, segmentação, backbone, SLA, roteamento); erros "cloud dispensa redes" (prévia 14.1) e "toda conexão entre sites é internet pública" (prévia 10.x); detalhes "protocolos chatty, replicação, dependência síncrona, SLA, cache e filas" (termos avançados; o efeito da latência ficou com números).
- Funcionamento interno: VLANs, broadcast, gateway, roaming, densidade, roteamento, criptografia, paths, zoning (prévias de 2.4/2.5/3.7/12.6/10.x e termos sem aula).
- Arquitetura inteira (repetia o Funcionamento; prévias de SD-WAN, ExpressRoute/Direct Connect, peering, rede de gerenciamento; tabela de operação e custo resumida em "custo mensal / operadora" na tabela e no Funcionamento).
- Analogia: "limite da analogia" (protocolos, filas, retransmissões).
- enterpriseExample (requisitos de segurança: WLAN de visitantes, SIEM; a coexistência ficou no diagrama e no desafio), cloudExample (VPC/VNet, IaC, policy as code), securityExample (tabela de riscos: rogue AP, NAC, zoning…).
- security e troubleshooting (módulo 1).
- Quiz q1.3.4 (LAN plana e movimento lateral: prévia 3.7/13.2) e q1.3.5 (VPC/VNet: prévia 14.1).
- Mentor "por que decorar siglas não basta" (reexplicava a ideia central) e "Wi-Fi de visitantes: por que não basta outro SSID" (depende de VLAN/firewall: prévia 12.7/3.7).
- Exercícios ex1.3.2 (impressora local × cloud: igual à q1.3.7), ex1.3.3 (controles do Wi-Fi de visitantes: prévia 12.7/13.2), ex1.3.4 (recursos de cloud: prévia 14.1).
- Desafio: tarefas de riscos, controles e plano de evidências, constraints e gradingRubric (segurança: prévia do módulo 13); ficou a classificação + diagnóstico.
- Glossário: os 6 termos da v1 (a aula os explica).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| VPC/VNet, subnets, peering, private endpoints como equivalentes de cloud | prévia | 14.1, 9.7, 14.9 |
| IaC e policy as code barrando subnet pública | exemplo por ambiente / prévia | 14.x (curso de DevSecOps) |
| VPN, SD-WAN, ExpressRoute/Direct Connect como formas de WAN | prévia | 10.1, 10.3, 14.8 |
| VLANs, broadcast e gateway como foco da LAN | prévia | 2.4, 2.5, 3.7 |
| Roaming e densidade de usuários na WLAN | prévia | 12.6 |
| Zoning, paths, multipath, Fibre Channel/iSCSI na SAN | termo avançado (sem aula no curso) | — |
| Risco de LAN plana / movimento lateral e mitigação por segmentação | prévia / seção removida | 3.7, 13.2 |
| WLAN de visitantes isolada (SSID ≠ isolamento, VLAN, captive portal) | prévia | 12.4, 12.7 |
| Rogue AP, WPA2/WPA3 Enterprise, site survey | prévia | 12.5, 12.8 |
| Tabela de operação e custo por tipo (controladora, licenças, NAT gateway, tráfego entre regiões) | repetição / prévia | 12.7, 14.1 |
| Camadas da arquitetura corporativa (borda, distribuição, interconexão, datacenter) | repetição (diagrama) / prévia | 1.4 |
| Protocolos "chatty", replicação, dependência síncrona, SLA | termo avançado (efeito mantido com números) | 1.8 |
| "Cloud dispensa redes" (erro comum) | prévia | 14.1 |
| "Toda conexão entre sites é internet pública" (erro comum) | prévia | 10.1 |
| Comandos ipconfig/ping/tracert, ip route, show vlan brief e árvore de decisão | seção removida (módulo 1) | 1.9, 2.8 |
| Logs/monitoramento por tipo (NetFlow, SIEM, autenticação Wi-Fi) | seção removida | 13.4, 13.5 |

## 4. Acréscimos
- Conceito: definição de domínio administrativo no texto (saiu do glossário) e a observação de que WLAN se define pelo meio e SAN pela finalidade, não pelo alcance.
- Conceito (erros comuns): ordem de grandeza da latência, menos de 1 ms na LAN × dezenas de ms entre estados, e o efeito em sistemas com muitas consultas pequenas (substitui "chatty/dependência síncrona").
- Conceito: o que "armazenamento em blocos" quer dizer (o servidor enxerga um disco e o formata; NAS oferece pastas e arquivos), porque a q1.3.6 depende disso.
- Motivação nova (gancho doméstico) e Exemplo simples fechando o gancho trecho a trecho.
- Diagrama novo (coexistência na sede + WAN da operadora), substituindo o da v1, que sugeria um fluxo PAN→LAN→WLAN→CAN→MAN.
- Mentor novo: cálculo 200 × 0,5 ms = 100 ms × 200 × 30 ms = 6 s; mentor novo do fone Bluetooth (alcance × bateria).
- Exercício novo ex1.3.5 (chamado → tipo de rede → equipe interna ou operadora) e desafio reescrito com o chamado da filial.
- Glossário: Switch e Access point.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 3.736 | 4.085 | 2.829 |
| Teoria (palavras) | 2.507 | 2.511 | 1.265 |
| Núcleo (min, fórmula v2) | 28,3 | 30,3 | 18,7 |
| Prática extra (min) | 45 | 45 | 31 (→ 30) |
| duration declarada | 65-95 min | 70-100 min | 15-20 min + 30 min de prática extra |

## 6. Avisos do validar e justificativas
- "prática extra com 759 palavras (~750 no total)": por bloco ficou mentor 243, exercícios 211, desafio + solução ~305. Cada item aplica algo novo (calcular o efeito da latência, explicar o alcance da PAN, classificar casos com NAS, mapear chamados para quem resolve, classificar uma empresa e diagnosticar um chamado). Passa 9 palavras do teto indicativo.
- "análise ainda não escrita": resolvido por este arquivo.

## 7. Revisão humana
- Diagrama redesenhado (o Apêndice A pede "manter e corrigir"; a v1 tinha setas em cadeia PAN→LAN→WLAN→CAN→MAN e WAN→SAN que não correspondem a um fluxo real). Confirme o novo desenho no navegador (só classes existentes: svg-node, --client, --cloud, --security, svg-boundary, svg-flow).
- Valores acrescentados: latência de LAN "menos de 1 ms" e "dezenas de milissegundos entre estados"; no mentor, 0,5 ms e 30 ms como exemplo. São ordens de grandeza usuais, não medições; confirme se quer manter os números.
- Objetivo de "equivalentes em cloud" saiu (prévia 14.1); a aula não menciona mais VPC/VNet. Confirme se o módulo 1 deve manter alguma ponte com cloud.
- SAN: nenhuma outra aula do curso ensina SAN (indice.js); o detalhe técnico ficou só na distinção blocos × arquivos. Zoning/multipath/iSCSI saíram como termos avançados.
- references (IEEE 802, internos com `internal://`) e linksToOtherCourses (DevSecOps e IAM, citando VPC e ZTNA) mantidos como na v1.

```json
{
  "id": "1.3", "modulo": "m01", "titulo": "Tipos de rede: PAN, LAN, WLAN, CAN, MAN, WAN e SAN", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 16,
  "acrescimos": ["Conceito: domínio administrativo no texto e WLAN/SAN definidas por meio/finalidade", "Erros comuns: ordem de grandeza da latência LAN × WAN", "Conceito: armazenamento em blocos × arquivos (SAN × NAS)", "Motivação e Exemplo simples com o gancho 'Wi-Fi cheio, sem sites'", "Diagrama novo de coexistência", "Mentor: cálculo de latência e alcance do fone Bluetooth", "Exercício ex1.3.5 e desafio reescrito", "Glossário: Switch e Access point"],
  "palavras_visiveis": { "original": 3736, "v1": 4085, "v2": 2829 },
  "nucleo_min": { "original": 28.3, "v1": 30.3, "v2": 18.7 }, "pratica_extra_min": { "original": 45, "v1": 45, "v2": 30 },
  "duration_v2": "15-20 min + 30 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "A classificação virou uma definição com 4 critérios e uma tabela em linguagem de iniciante, e o gancho doméstico é resolvido trecho a trecho no exemplo, sem VLAN, VPN ou cloud.",
  "revisao_humana": ["Diagrama redesenhado (setas em cadeia da v1 sugeriam fluxo inexistente)", "Valores de latência acrescentados (<1 ms LAN, dezenas de ms entre estados; 0,5/30 ms no mentor)", "Objetivo de equivalentes em cloud removido", "SAN não é ensinada em outra aula; zoning/multipath/iSCSI saíram", "references/linksToOtherCourses mantidos da v1"]
}
```
