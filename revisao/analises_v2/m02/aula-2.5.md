# Aula 2.5 — Camada 3 — Rede: IP, roteamento, gateway e TTL (v2)
Base: v1 · Tipo: fundamental · Módulo: m02 (Modelo OSI)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: papel da Camada 3 (salto a salto); IP + máscara → local/gateway e leitura da tabela de rotas (mais específica); TTL/traceroute e MAC muda × IP fica. Saíram "relacionar com cloud/DevSecOps…" e "coletar evidências com Cisco IOS" |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 138 palavras; gancho: o site de outro país abre sem o notebook conhecer o caminho; consequência: "impressora funciona, nenhum site abre" e culpar DNS/provedor; carreira/cloud em 1 frase (filial × datacenter, VM sem internet) |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase; 87 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 3: ICMP (1.9, 4.8), ARP (2.4, 3.5), NAT (6.7, 7.8). Os 6 termos da v1 (Camada 3, Gateway, Tabela de rotas, TTL, Rota default, Próximo salto) são ensinados pela própria aula |
| Problema 80–150, sem repetir o gancho | cumpre | 133 palavras; liga com a 2.4 (MAC não diz onde o host está), broadcast não escala, IP hierárquico (história em 1 frase) e as 3 tarefas da camada |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | caminho do pacote só no Funcionamento interno + diagrama ("Decisões da Camada 3") |
| Arquitetura só se acrescenta | removida | repetia peças do Conceito; o resto era prévia (SVI/switch L3, rotas estáticas/dinâmicas, OSPF/BGP, objetos de cloud) |
| Diagrama mantido/corrigido | mantido | sem alteração |
| Erros comuns ≤3, sem repetição | cumpre | 3: "pinguei o gateway", gateway × DNS, rota de retorno. Saiu "traceroute como mapa absoluto" (repetia o parágrafo do traceroute); a "falha típica" do passo 8 saiu porque o callout cobre |
| Termos avançados cortados ou no glossário | cumpre | saíram anti-spoofing, SVI, sumarização, OSPF/BGP, ACL/SG/NSG/NetworkPolicy, MPLS, Cisco IOS; "movimento lateral" e "rede conectada" passaram a ser explicados no texto |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample do notebook 192.168.1.50 → 8.8.8.8 (MAC do gateway × IP 8.8.8.8), "frame" → "quadro"; analogia da cidade em 3 frases, sem "limite da analogia" (a ideia do próximo salto entrou como "placa no cruzamento") |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e devsecops removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 2) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões, ids mantidos; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6, todos mantidos |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos (ipconfig/ip addr, route print/ip route, ping no gateway, tracert); 438 palavras contando título, objetivo e ferramentas; 20 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre (aviso) | mentor 2, exercícios 2, desafio da filial reescrito com solução salto a salto |
| nextTheme 1–2 frases | cumpre | 1 frase (2.6) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}`, unlocks/accessPolicy preservados; "20-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/challenge/solution; challenge sem constraints/gradingRubric |

Verificação do quiz contra a aula v2: q2.5.1 (função da Camada 3) → definição do Conceito + "o IP não garante entrega"; q2.5.2 (LAN ok, 8.8.8.8 não) → tabela do Conceito + passo 3 do Funcionamento; q2.5.3 (MAC × IP) → "Ponto-chave" do Funcionamento + Exemplo simples; q2.5.4 (rede plana) → último parágrafo do Conceito (movimento lateral); q2.5.7 (/8, /16, /0) → parágrafo da máscara no Conceito + "Lendo uma tabela de rotas"; q2.5.6 (TTL) → passo 6 + tabela do cabeçalho. Gabaritos em 1,2,0,3,1,2.

## 2. O que saiu e por quê
- Motivação da v1 (enunciava a camada) e callout "Problema real" (virou o erro comum "pinguei o gateway" e o desafio): trocada por um gancho concreto.
- Problema: "sumarização", lista LANs/WANs/datacenters/provedores/nuvens e a frase de consequência (repetia a Motivação).
- Conceito: "outras rotas locais" como 4ª informação do host (a tabela de rotas mostra isso).
- Funcionamento interno: coluna "Observação de segurança" da tabela do cabeçalho (anti-spoofing, revelação de caminho: termo avançado / seção de segurança); frase do Cisco IOS `show ip route` (equipamento que a aula não ensina); "em cloud parte do caminho é abstraída" (prévia); falhas típicas dos passos 5 e 8 (repetiam o callout); erro comum "traceroute como mapa absoluto" (repetição).
- Arquitetura inteira (prévias do módulo 11 e 14; a frase "conectividade × política" já está no Conceito).
- Analogia: callout "Limite da analogia".
- enterpriseExample (repetia o desafio), cloudExample, devsecopsExample (seção do template).
- security e troubleshooting (módulo 2).
- learningOutcomes (seção do template).
- Lab: passo 5 "registrar a interpretação" (ritual), scenario, topology, architecture, cost, safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions, challenge/solution do lab (cloud), Packet Tracer e editor de texto em tools.
- Mentor: "por que a Camada 3 precisou existir" (reexplicava o Problema) e "pinga o gateway mas não acessa rede remota" (repetia o desafio e o erro comum).
- Exercícios: ex2.5.5 (repetia o Exemplo simples com os mesmos valores) e ex2.5.2 (o mesmo caso do mentor /16, mais raso e igual ao exemplo do Conceito).
- Desafio: task de NAT e "mitigação/documentação", constraints, 3 entregáveis e rubrica; na solução, "VPN/MPLS", passo de registro e a resposta errada "scan agressivo".
- Quiz q2.5.6: distrator "Fragmentação de pacotes maiores que o MTU" (termo não explicado) → "Que dois hosts usem o mesmo endereço IP na rede local".
- Glossário: os 6 termos da v1 (ensinados pela aula).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Tipos de rota: conectada, estática, dinâmica; OSPF e BGP | prévia (a rota conectada ficou, explicada na tabela de rotas) | 11.2, 11.4, 11.7, 11.8 |
| Gateway como SVI de switch de Camada 3 | prévia | 11.5 |
| Objetos de cloud: VPC/VNet, route tables, Internet/NAT/VPN/Transit Gateway, peering, ExpressRoute/Direct Connect, custo | exemplo por ambiente | 14.3, 14.8, 14.9 |
| VM em cloud sem internet apesar de DNS (lab e exemplo) | exemplo por ambiente | 14.3 |
| Pipeline/IaC/policy as code declarando rotas | exemplo por ambiente | 14.x / curso de DevSecOps |
| Redes corporativas separadas por função (visitantes, voz, gerência) | exemplo por ambiente / prévia | 5.1, 9.4 |
| Spoofing de IP e filtros anti-spoofing | termo avançado / segurança | 16.x |
| TTL/traceroute revelam topologia; sanitizar evidências | seção de segurança removida | 4.8, 13.6 |
| Vulnerabilidades (movimento lateral, exposição por rota indevida), boas/más práticas, monitoramento, hardening, detecção | seção removida (módulo 2); movimento lateral ficou em 1 frase no Conceito | 9.4, 13.2, 9.7 |
| "NAT não é firewall" | seção removida / prévia | 6.7, 7.8 |
| Comandos de troubleshooting (Cisco `show ip interface brief`, `show ip route`), árvore de decisão, rotas conflitantes/redistribuição | seção removida (módulo 2) / prévia | 4.9, 11.9, 15.4 |
| tracepath e limites de MTU | prévia (tracepath ficou como alternativa no lab) | 6.4, 11.9 |
| Caminho físico abstraído em cloud no traceroute | prévia | 14.x |
| Sumarização de rotas | termo avançado / prévia | 11.x |
| VPN que conecta mas não alcança sistemas | exemplo / prévia | 14.8, 15.9 |

## 4. Acréscimos
- Conceito: parágrafo da máscara (/8, /16, /24 fixam 1, 2 ou 3 números; "quanto maior o número depois da barra, mais específica a rede"), com aponte para 4.3 e 5.2. Fecha uma lacuna real: q2.5.7, ex2.5.6, o mentor /16 e a tabela de rotas dependem de saber o que /8 e /16 cobrem.
- Conceito: "roteamento não é autorização" estendido com rede plana e movimento lateral explicado em 1 frase (sustenta q2.5.4 depois da remoção de `security`).
- Funcionamento interno: a linha "proto kernel scope link" explicada como rede conectada; exceção do NAT do roteador de casa em 1 frase (o aluno vê isso em casa; NAT no glossário).
- Mentor novo: traceroute com `* * *` no salto 3 e saltos seguintes respondendo (aplica a leitura do traceroute).
- Exercício novo ex2.5.7: MAC/IP de destino no primeiro enlace, TTL 64 − 3 roteadores = 61 e o que acontece num loop.
- Desafio: task nova "para onde vai o pacote sem rota para 10.50.30.0/24" (aplica a rota mais específica × default) e solução reescrita salto a salto.
- Glossário: ICMP, ARP, NAT.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.641 | 5.108 | 3.679 |
| Teoria (palavras) | 2.671 | 2.745 | 1.627 |
| Núcleo (min, fórmula v2) | 29,5 | 30,1 | 21,5 |
| Prática extra (min) | 75 | 69 (→ 70) | 51 (→ 50) |
| duration declarada | 85-120 min | 90-130 min | 20-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- "prática extra com 830 palavras (~750 no total)": por bloco ficou mentor 257, exercícios 206, desafio 118 + solução 249. Cada item aplica algo novo (máscara /16 errada, asterisco no traceroute, tabela de rotas com três destinos, TTL e MAC por salto, diagnóstico filial × datacenter). A solução do desafio ficou mais longa que a da v1 porque agora segue o pacote salto a salto em vez de listar etapas genéricas.
- "análise ainda não escrita": resolvido por este arquivo.

## 7. Revisão humana
- Funcionamento interno com 634 palavras e Conceito com 323: o tema é denso (passo a passo, tabela do cabeçalho, leitura da tabela de rotas, traceroute). Se quiser mais corte, a tabela do cabeçalho IPv4 (4 campos) é a candidata, mas ela é o mecanismo do tema.
- Parágrafo da máscara acrescentado no Conceito (/8, /16, /24) antecipa um pouco da 4.3; mantido no mínimo porque o quiz e os exercícios dependem dele.
- Lab: comandos não testados em Windows; tempo reduzido de 30 para 20 min (4 passos).
- Diagrama mantido: o switch aparece sem seta (a seta vai do host direto ao gateway). Não está errado como diagrama lógico, mas pode confundir.
- q2.5.6: o distrator do MTU foi trocado; id mantido.
- references (2 internas sem url + RFC 791 e 792) e linksToOtherCourses (DevSecOps, IAM) mantidos da v1; tag "cloud networking" mantida, embora o exemplo de cloud tenha saído.

```json
{
  "id": "2.5", "modulo": "m02", "titulo": "Camada 3 — Rede: IP, roteamento, gateway e TTL", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "security", "troubleshooting"],
  "conceitos_removidos": 15,
  "acrescimos": ["Conceito: máscara /8, /16, /24 e especificidade", "Conceito: rede plana e movimento lateral em 1 frase", "Funcionamento: rede conectada e exceção do NAT", "Mentor: asterisco no traceroute", "Exercício ex2.5.7: MAC/IP por salto e TTL 64-3", "Desafio: task da rota ausente × default e solução salto a salto", "Glossário: ICMP, ARP, NAT"],
  "palavras_visiveis": { "original": 4641, "v1": 5108, "v2": 3679 },
  "nucleo_min": { "original": 29.5, "v1": 30.1, "v2": 21.5 }, "pratica_extra_min": { "original": 75, "v1": 70, "v2": 50 },
  "duration_v2": "20-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Conceito agora mostra o que /8, /16 e /24 cobrem antes da tabela de rotas, e o desafio segue o pacote salto a salto em vez de listar etapas genéricas.",
  "revisao_humana": ["Funcionamento interno 634 e Conceito 323 palavras (tema denso)", "Parágrafo da máscara antecipa um pouco da 4.3", "Comandos do lab no Windows não testados; lab de 30 para 20 min", "Switch do diagrama sem seta", "Distrator do MTU trocado em q2.5.6", "references/linksToOtherCourses e tag cloud networking mantidos da v1"]
}
```
