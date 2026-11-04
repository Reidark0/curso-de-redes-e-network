# Aula 1.1 — O que é uma rede e por que existe (v2)
Base: v1 · Tipo: fundamental · Módulo: m01 (Fundamentos de Redes)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: por que redes existem (e por que precisam de controle); identificar as partes; localizar a etapa em que um "não acessa" quebrou, sem confundir conectividade com autorização. Saíram "sistema sociotécnico" e "relacionar redes domésticas, corporativas, cloud e DevSecOps" (lista de áreas) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; history (tabela de fases) apagado; evolution não existia na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 137 palavras; gancho "a internet caiu" com Wi-Fi conectado; consequência (reiniciar roteador não resolve DNS nem permissão); carreira em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase; 88 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 4: Endereço IP (4.1), Gateway padrão (4.5), DNS (7.1), Ping (1.9, 4.8). Saíram Rede, Dispositivo final, Dispositivo intermediário, Conectividade e Política (a aula os ensina) |
| Problema 80–150, sem repetir o gancho | cumpre | 149 palavras; retoma com "é isso que acontece quando se trata a rede como um bloco único"; ilha sem rede → compartilhar → controle, operação, segurança, custo; rede plana/movimento lateral; isolamento proposital |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | partes da rede no Conceito; cadeia de etapas no Funcionamento interno; diagrama mostra as partes |
| Arquitetura só se acrescenta | removida | a lista de papéis foi para o Conceito (é a definição); a tabela de nomes em cloud é prévia (9.7, 14.1, 14.3) |
| Diagrama mantido/corrigido | mantido (rótulos ajustados) | "Arquivo / app / AD" → "Arquivos / sistemas"; "SaaS / API / VPC" → "Sites / serviços"; faixa inferior troca "operação" por "serviços" (bate com a definição); `desc` sem "observabilidade" |
| Erros comuns ≤3, sem repetição | cumpre | 3: rede = internet; conectividade = autorização; "tudo é problema de rede". Saiu o callout "O que a rede não garante" (repetia ou era cloud) |
| Termos avançados cortados ou no glossário | cumpre | saíram NAT, VLAN, NAC, EDR, SIEM, proxy, load balancer, VPC/VNet, private endpoint, SMB, encapsulamento, sistema sociotécnico, porta; IP/gateway/DNS/ping no glossário |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample: abrir um site no celular em casa, com cada parte da definição nomeada (IP 192.168.0.15, gateway 192.168.0.1, DNS, HTTP/TLS, senha do Wi-Fi) e ligação com o gancho; analogia da cidade em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud, devsecops e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 1) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6; saiu fc1.1.6 (logs); entrou fc1.1.7 ("a rede caiu" não é diagnóstico) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não se aplica | não havia lab |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2, exercícios 2, desafio reescrito (visitantes no mesmo Wi-Fi) com solução comentada |
| nextTheme 1–2 frases | cumpre | 1 frase, mantida da v1 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` de exercício), unlocks/accessPolicy preservados; "15-25 min + 30 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | challenge sem constraints/gradingRubric; nada invisível restante (validar sem erro) |

Verificação do quiz contra a aula v2: q1.1.1 (definição) → definição do Conceito; q1.1.2 (IP e gateway ok, nome falha → DNS) → Conceito (Endereços), etapa 3 e parágrafo de diagnóstico do Funcionamento interno, glossário; q1.1.3 (rede plana, movimento lateral) → Problema; q1.1.4 (switch é intermediário) → Conceito; q1.1.7 (ping responde, "acesso negado") → Erros comuns + etapa 7 + última frase do Funcionamento interno; q1.1.8 (por que a rede existe) → Problema. Gabaritos em 1, 2, 0, 3, 0, 2.

## 2. O que saiu e por quê
- learningOutcomes, history (tabela de fases até Zero Trust/SASE/IaC): seção do template.
- Motivação: lista de áreas da empresa sem rede (virou 1 frase no Problema) e callout "Problema real" com 13 causas (DHCP, proxy, certificado, política cloud…): prévias; o gancho virou o "a internet caiu" vivido pelo aluno.
- Problema: lista de 7 exigências (compartilhamento, comunicação, escala, controle, operação, segurança, custo) encolhida para uma frase com 4; custo em cloud (NAT gateway, flow logs): prévia.
- Conceito: "sistema sociotécnico" (termo avançado; a ideia de controle/custo ficou no Problema), lista "cabo, placa, switch… identidade, logs", callout "O que a rede não garante" (repetição; cloud = prévia).
- Funcionamento interno: linha "Encapsulamento" (prévia 2.2), proxies/balanceadores, SMB, "porta fechada" (prévia 6.x), remissão à seção Troubleshooting removida (virou a sequência de perguntas).
- Arquitetura: lista de papéis (foi para o Conceito, sem VMs/containers/backbones/túneis/NTP/diretórios) e tabela de nomes em cloud (prévia 9.7, 14.1, 14.3).
- Analogia: pedágios/câmeras/logs e "limite da analogia" (pacotes, encapsulamento: termos avançados).
- simpleExample: NAT (prévia 7.8) e a lista solta de termos; virou mapeamento das partes.
- enterpriseExample, cloudExample, devsecopsExample, securityExample: seção do template (o caso da rede plana ficou em 1 frase no Problema).
- security e troubleshooting: módulo 1.
- Quiz q1.1.5 (VPC/VNet: prévia 14.3) e q1.1.6 (pipeline/registry: exemplo DevSecOps removido).
- Flashcard fc1.1.6 (logs: vinha de security).
- Mentor "por que rede não é só computadores conectados" (repete q1.1.1 e o Conceito).
- Exercícios ex1.1.1 ("rede não é só internet": repete os Erros comuns) e ex1.1.6 (equivalentes em casa/empresa/cloud: VLAN, NAC, route table, NAT gateway — prévias).
- Desafio: constraints, gradingRubric, tarefas de "evidências registradas" e "crescimento futuro" (ritual).
- Referência "Documentação de redes virtuais em cloud" (url vazia, prévia do módulo de cloud).
- Glossário: Rede, Dispositivo final, Dispositivo intermediário, Conectividade, Política de rede (a aula ensina).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Fases históricas (redes locais → internet → cloud) e o que cada uma trouxe (firewall, NAT, DNS, VPN, Zero Trust, SDN, SASE) | seção do template (ficou "as primeiras redes surgiram para compartilhar recursos caros") | 7.8, 9.x, 14.1 |
| Escala (2 dispositivos a milhões de clientes) como exigência | encolhimento do Problema | 1.3 |
| Custo recorrente em cloud (NAT gateway, flow logs, load balancer) | prévia | 14.1 |
| Sistema sociotécnico (pessoas, dono, finalidade de negócio) | termo avançado (controle, operação e custo seguem no Problema) | — |
| Velocidade contratada não corrige DNS errado | repetição | 0.6, 1.8 |
| Cloud esconde o cabo, mas mantém rotas/filtros; tabela VPC/VNet, route table, peering, NAT gateway, security group, private endpoint | prévia | 9.7, 14.1, 14.3 |
| Encapsulamento (transporte, rede, enlace) como etapa | prévia | 2.2 |
| Porta fechada como falha do destino | prévia | 6.6 |
| Proxies e load balancers como intermediários | termo avançado | 1.2, 1.7, 9.x |
| Serviços essenciais DHCP, NTP, diretórios, observabilidade | prévia | 7.6, 7.7 |
| Protocolo como "formato, ordem, erro, estado" | repetição do Módulo 0 | 0.7 |
| NAT no roteador doméstico | prévia | 7.8 |
| Rede corporativa: VLANs, NAC, EDR, SIEM, proxy | exemplo por ambiente / prévia | 3.7, 9.4, 13.x |
| Pipelines, runners, registry, IaC criando redes | exemplo por ambiente | 14.x |
| Rede como fonte de evidência e ponto de controle (securityExample) | exemplo por ambiente | 13.2 |
| Vulnerabilidades, boas/más práticas, monitoramento, hardening, detecção (NAT não é firewall, any-any, logs de DNS/proxy) | seção removida (módulo 1) | 7.8, 7.9, 9.4, 13.2 |
| Comandos ipconfig, ip addr/route, resolvectl, ping, tracert, show ip interface brief e árvore de decisão | seção removida (módulo 1); a ordem IP → gateway → DNS → serviço → política ficou no Funcionamento interno | 1.9, 4.9 |
| Logs como necessidade da rede (flashcard) | vinha de security | 7.9 |
| Equivalência dos papéis em casa, empresa e cloud (exercício) | prévia | 1.3, 14.3 |

## 4. Acréscimos
- Conceito: uma linha por parte da definição (dispositivos finais e intermediários, meios, endereços, protocolos, serviços, políticas), com gloss curto de switch, access point, roteador, firewall e DNS. Substitui a Arquitetura e sustenta o objetivo 2 e a q1.1.4.
- Problema: rede plana e movimento lateral definidos em 1 frase (a q1.1.3 e o desafio dependem disso; na v1 só estavam em securityExample/security).
- Funcionamento interno: a sequência de perguntas (IP? gateway? nome? serviço? política?) no lugar da remissão à seção Troubleshooting removida.
- simpleExample reescrito como mapeamento das partes na cena doméstica, ligado ao gancho.
- Quiz q1.1.8 (por que a rede existe), para o objetivo 1 ter questão.
- Flashcard fc1.1.7 ("a rede caiu" não é diagnóstico).
- Glossário: Endereço IP, Gateway padrão, DNS e Ping.
- Desafio reescrito (visitantes e funcionários no mesmo Wi-Fi) com solução comentada em 4 passos.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 3.598 | 4.357 | 2.793 |
| Teoria (palavras) | 2.412 | 2.725 | 1.340 |
| Núcleo (min, fórmula v2) | 27,6 | 31,0 | 19,3 |
| Prática extra (min) | 45 | 45 | 31 (→ 30) |
| duration declarada | 75-105 min | 70-100 min | 15-25 min + 30 min de prática extra |

## 6. Avisos do validar e justificativas
- "análise ainda não escrita": resolvido por este arquivo. Nenhum outro aviso.
- Fora do validar: desafio + solução somam ~336 palavras (padrão ~150–250 por bloco), porque a solução classifica os participantes, aponta os riscos e propõe a separação; cada passo aplica a aula a um caso novo.

## 7. Revisão humana
- Conceito com 306 palavras (a 0.1 ficou com ~290): absorveu a lista de papéis da Arquitetura removida, que é a própria definição.
- Objetivos reescritos: "sistema sociotécnico" e "relacionar redes domésticas, corporativas, cloud e DevSecOps" saíram; confirme se a ligação com cloud/DevSecOps pode ficar só para os módulos próprios.
- Quiz: q1.1.2 ("host" → "notebook", "acessa sites por nome" → "abre sites pelo nome") e opção correta da q1.1.3 ("host comprometido… ativos" → "aparelho invadido… muitos outros") reescritas; ids mantidos. q1.1.8 é nova.
- Rede plana/movimento lateral entram no Problema em 1 frase (tema detalhado em 9.4/13.2), porque sustentam a q1.1.3 e o desafio.
- Rótulos do diagrama ajustados (AD, SaaS/API/VPC saíram).
- references (Módulo 0 e Modelo OSI, url vazia) e linksToOtherCourses (DevSecOps, IAM) mantidos da v1; a referência de documentação de cloud saiu.

```json
{
  "id": "1.1", "modulo": "m01", "titulo": "O que é uma rede e por que existe", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "history", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 19,
  "acrescimos": ["Conceito: lista das partes da rede com gloss curto", "Problema: rede plana e movimento lateral em 1 frase", "Funcionamento interno: sequência de perguntas de diagnóstico", "simpleExample reescrito como mapeamento das partes", "Quiz q1.1.8", "Flashcard fc1.1.7", "Glossário: Endereço IP, Gateway padrão, DNS, Ping", "Desafio reescrito com solução"],
  "palavras_visiveis": { "original": 3598, "v1": 4357, "v2": 2793 },
  "nucleo_min": { "original": 27.6, "v1": 31.0, "v2": 19.3 }, "pratica_extra_min": { "original": 45, "v1": 45, "v2": 30 },
  "duration_v2": "15-25 min + 30 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "A definição agora vem com uma linha por parte da rede e o exemplo doméstico nomeia cada parte na cena, no lugar de listas soltas de siglas e da tabela de cloud.",
  "revisao_humana": ["Conceito com 306 palavras (absorveu a Arquitetura)", "Objetivos reescritos sem sociotécnico e sem cloud/DevSecOps", "Redação de q1.1.2 e q1.1.3 ajustada; q1.1.8 nova", "Rede plana/movimento lateral em 1 frase no Problema", "Rótulos do diagrama ajustados", "references/linksToOtherCourses mantidos da v1; referência de cloud removida"]
}
```
