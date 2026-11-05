# Aula 1.2 — Dispositivos finais, intermediários e serviços (v2)
Base: v1 · Tipo: fundamental · Módulo: m01 (Fundamentos de Redes)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: diferenciar os papéis (servidor × serviço); classificar pelo papel no fluxo (papéis acumulados); mapear um acesso para levantar hipóteses. Saíram "relacionar com inventário, troubleshooting, segurança e cloud" (lista de áreas) e "evitar confusões" (virou parte do objetivo 1) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; evolution apagado (1 frase sobre a multiplicação dos papéis foi para o Problema); history não existia na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 131 palavras; gancho "o servidor caiu" → reiniciam a máquina, derrubam e-mail e arquivos, e o sistema continua fora (o serviço estava parado ou o nome apontava errado); carreira = 1 frase (suporte e alerta de segurança). Saíram a lista de 11 suspeitos e o callout "Problema real" |
| Resumo 4–5 itens + frase final | cumpre | 4 itens + frase; 83 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 4: Porta (6.2), Ping (1.9, 4.8), Gateway padrão (4.5), NAT (7.8). Saíram Dispositivo final, Dispositivo intermediário, Serviço de rede, Política de rede (a aula os ensina) e Inventário de ativos (explicado no callout) |
| Problema 80–150, sem repetir o gancho | cumpre | 132 palavras; retoma com "é isso que acontece quando…"; lista de 4 consequências da v1; evolução dos papéis em 1 frase; pergunta que a aula responde |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | papéis no Conceito; cadeia do acesso no Funcionamento interno; diagrama mostra a mesma cadeia |
| Arquitetura só se acrescenta | removida | a tabela repetia a definição; a coluna "o que observar" (MAC, VLAN, rotas, RBAC) e a frase-mapa do curso eram prévias |
| Diagrama mantido/corrigido | mantido (rótulos ajustados) | "Roteador / LB" → "Roteador / balanceador" (caixa alargada de 150 para 170 px); `desc` reescrita para descrever o fluxo e as evidências |
| Erros comuns ≤3, sem repetição | cumpre | 3: intermediário não só transporta (e concentra tráfego e regras); IoT/impressoras fora do inventário; classificação não é diagnóstico. "Servidor × serviço" e "tudo é roteador" viraram subtítulos do Conceito e saíram do callout |
| Termos avançados cortados ou no glossário | cumpre | saíram quadros, comutar, VLAN, switch de camada 3, ACL, proxy, WAF, inspeção TLS, security group, workload, VM/container, tabela ARP, serverless, NAT gateway, route table, runner, registry, service mesh; porta, ping, gateway e NAT no glossário; DNS, DHCP, SSH e balanceador explicados em meia frase |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample = celular vendo vídeo em casa, com os 4 testes ligados a papéis (sustenta q1.2.4); analogia da empresa em 1 frase, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e devsecopsExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 1) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saiu q1.2.6 (load balancer em cloud); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6, mesmos ids; textos sem proxy/WAF/inspeção TLS/VM/container; fc1.2.6 reescrito (aparelho fora do inventário, sem "tráfego lateral") |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não se aplica | não havia lab |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (página de administração do roteador; impressora com senha de fábrica); exercícios 2 (ex1.2.1 reescrito; ex1.2.5 novo: RH abre, vendas não); desafio do pequeno escritório enxugado, com solução comentada |
| nextTheme 1–2 frases | cumpre | 1 frase (aula 1.3) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` de exercício); unlocks/accessPolicy preservados; "15-20 min + 30 min de prática extra", estimatedStudyTimeMinutes 20 |
| Campos invisíveis | cumpre | challenge sem constraints/gradingRubric; validar sem erro |

Verificação do quiz contra a aula v2: q1.2.1 (switch é intermediário) → definição do Conceito; q1.2.2 (DNS é serviço) → definição; q1.2.3 (servidor × serviço) → "Servidor não é serviço"; q1.2.4 (IP e ping no gateway ok, nome falha → DNS) → testes 1–3 do Exemplo simples; q1.2.5 (por que proteger intermediários) → primeiro item de Erros comuns; q1.2.7 (roteador Wi-Fi acumula papéis) → "Classifique pelo papel" + Exemplo. Gabaritos em 0, 1, 3, 2, 0, 2.

## 2. O que saiu e por quê
- learningOutcomes, evolution (com a tabela por ambiente doméstico/LAN/datacenter/cloud/DevSecOps): seção do template; 1 frase sobre a multiplicação dos papéis ficou no Problema.
- Motivação: lista de 11 suspeitos e callout "Problema real" (repetiam o Problema); a sequência de perguntas (virou o Funcionamento interno).
- Conceito: servidor como proxy, AP com gerenciamento/logs/autenticação (detalhe avançado); "não substitui a análise por camada" (o resto da frase virou o 3º erro comum); erro "chamar todo equipamento de roteador" (virou o subtítulo "Classifique pelo papel"); "servidor × serviço" saiu do callout (virou subtítulo).
- Funcionamento interno: passo "a placa de rede envia sinais" (assunto de 0.5/1.1); quadros e comutação (prévia 2.3/3.x); ACLs, proxies, security groups e WAFs (prévias 9.2, 8.5, 14.5, 9.6); VM/container; evidências com tabelas ARP e tabela de conexões (prévia 3.6, 6.8); parágrafo "o host pode estar vivo…" (repetia o gancho; ficou no Conceito em 1 frase).
- Arquitetura inteira (repetia a definição; colunas de observação eram prévias de módulos 3–14).
- Analogia: "limite da analogia" (repetia o Conceito).
- simpleExample: provedor como intermediário (fica implícito no teste 4).
- enterpriseExample, cloudExample, devsecopsExample: seção do template.
- security e troubleshooting (módulo 1).
- Quiz q1.2.6 (load balancer em cloud: prévia 14.6).
- Mentor: os 3 da v1 (impressora reaproveitada como aplicação; "ping responde, site não" repetia gancho e q1.2.3; "firewall final ou intermediário" repetia o Conceito e virou o caso do roteador de casa).
- Exercícios: ex1.2.2 (repetia q1.2.4), ex1.2.3 (câmeras; coberto pelo mentor da impressora), ex1.2.4 (VPC/VNet: prévia 14.3).
- Desafio: tarefa de "5 evidências antes de alterar regra", constraints e gradingRubric (ritual / não ensinado); VPN e link de internet saíram do cenário.
- Glossário: os 4 papéis que a aula ensina e Inventário de ativos.

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Equivalentes em cloud (VM, serverless, pod, load balancer gerenciado, NAT gateway, route table, security group/NSG, DNS privado, private endpoint) e custo de intermediários gerenciados | prévia / exemplo por ambiente | 14.3, 14.4, 14.5, 14.6, 14.7, 14.10 |
| Runner, registry, API server, service mesh, network policy (DevSecOps) | exemplo por ambiente | 14.11 |
| Switch de camada 3, VLAN, firewall entre segmentos, balanceador mascarando IP de origem nos logs | prévia | 3.7, 9.4, 8.5 |
| Proxy, WAF, inspeção TLS como intermediários que modificam tráfego | prévia / termo avançado | 8.5, 9.6 |
| Quadros, comutação na LAN | prévia | 2.3, 1.7 |
| Evidências: tabela ARP, tabela de conexões, eventos de firewall | prévia | 3.6, 6.8, 9.8 |
| Tabela de papéis com "o que observar" (IP, MAC, rotas, VLANs, RBAC) | repetição da definição / prévia | 1.7, 1.10 |
| Servidor atuando como proxy; AP com gerenciamento, logs e autenticação | termo avançado | 8.5, 12.7 |
| Evolução dos papéis por ambiente (tabela) | seção do template (1 frase ficou) | — |
| Vulnerabilidades (ativo desconhecido, host comprometido, serviço exposto, intermediário vulnerável, política permissiva), boas/más práticas, monitoramento, hardening, detecção | seção removida (módulo 1); risco do inventário e dos intermediários ficou no callout | 6.9, 7.9, 9.x, 16.x |
| Comandos ipconfig /all, Get-NetTCPConnection, Test-NetConnection, ip addr/route, ss, curl, show ip interface brief, show cdp neighbors, árvore de decisão | seção removida (módulo 1) | 1.9, 6.8, 8.8, 4.9 |
| Load balancer em cloud (q1.2.6) | prévia | 14.6 |
| Câmeras IP no inventário (ex1.2.3) | repetição (mentor da impressora) | — |
| Classificação de VPC/VNet (ex1.2.4) | prévia | 14.3 |
| Coletar evidências antes de alterar regras (desafio) | não ensinado nesta aula | 9.8, 15.7 |
| Frase-mapa "Ethernet aprofunda os switches, IP os roteadores…" | prévia | 2.x–14.x |

## 4. Acréscimos
- Conceito: serviço explicado como "programa que atende pedidos numa porta", com o exemplo de uma máquina com HTTPS 443, SSH 22 e banco (fecha o "servidor não é serviço" e a q1.2.3; antes estava só no callout).
- Conceito: DNS e DHCP definidos em meia frase dentro da definição (o quiz depende deles e eles não estavam no glossário).
- Exemplo simples: cada teste diz qual papel fica confirmado (sustenta a q1.2.4, que na v1 dependia da seção troubleshooting).
- Mentor novo (página de administração do roteador de casa) e exercício novo ex1.2.5 (RH abre, vendas não).
- Glossário: Porta (6.2), Ping (1.9, 4.8), Gateway padrão (4.5), NAT (7.8).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.018 | 4.188 | 2.620 |
| Teoria (palavras) | 2.836 | 2.816 | 1.220 |
| Núcleo (min, fórmula v2) | 30,8 | 31,7 | 18,4 |
| Prática extra (min) | 45 | 45 | 31 (→ 30) |
| duration declarada | 75-105 min | 70-100 min | 15-20 min + 30 min de prática extra |

## 6. Avisos do validar e justificativas
- "análise ainda não escrita": resolvido por este arquivo. Nenhum outro aviso.

## 7. Revisão humana
- O Conceito ficou com 322 palavras (alvo de ordem de grandeza ~200–250), por causa dos subtítulos "Servidor não é serviço" e "Classifique pelo papel", que sustentam 3 questões do quiz.
- Quiz: q1.2.5 trocou "hardening forte" por "proteção reforçada" e teve as opções reescritas; q1.2.1 trocou "switch encaminhando quadros entre hosts" por "switch que liga os computadores de um andar à rede"; q1.2.3/q1.2.4 tiveram opções reordenadas. Ids mantidos.
- Diagrama: caixa do roteador alargada para caber "Roteador / balanceador"; confira a renderização.
- references (3 itens internos com url vazia) e linksToOtherCourses (DevSecOps e IAM) mantidos como na v1; a nota de DevSecOps fala em runners e registries, que saíram da aula.
- tags ainda incluem "cloud" e "devsecops" (mantidas da v1; não são exibidas como conteúdo).

```json
{
  "id": "1.2", "modulo": "m01", "titulo": "Dispositivos finais, intermediários e serviços", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "evolution", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "security", "troubleshooting"],
  "conceitos_removidos": 16,
  "acrescimos": ["Conceito: serviço = programa que atende numa porta (exemplo 443/22/banco)", "Conceito: DNS e DHCP definidos em meia frase", "Exemplo simples: cada teste ligado ao papel confirmado", "Mentor: página de administração do roteador de casa", "Exercício ex1.2.5: RH abre, vendas não", "Glossário: Porta, Ping, Gateway padrão, NAT"],
  "palavras_visiveis": { "original": 4018, "v1": 4188, "v2": 2620 },
  "nucleo_min": { "original": 30.8, "v1": 31.7, "v2": 18.4 }, "pratica_extra_min": { "original": 45, "v1": 45, "v2": 30 },
  "duration_v2": "15-20 min + 30 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Conceito separa servidor de serviço com um exemplo de portas e o Exemplo simples liga cada teste ao papel que ele confirma, sem tabelas de cloud, DevSecOps e segurança.",
  "revisao_humana": ["Conceito com 322 palavras", "Redação de q1.2.1 e q1.2.5 ajustada; opções reordenadas em q1.2.3/q1.2.4", "Caixa do roteador no diagrama alargada", "references/linksToOtherCourses mantidos da v1", "tags cloud/devsecops mantidas"]
}
```
