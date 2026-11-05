# Aula 2.1 — Por que o Modelo OSI existe (v2)
Base: v1 · Tipo: fundamental · Módulo: m02 (Modelo OSI)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: por que o OSI existe e OSI × implementação (TCP/IP); 7 camadas com a pergunta de cada uma e o encaixe no TCP/IP; sintoma → perguntas com evidência por camada, sem confundir conectividade com autorização. Saíram "linguagem comum entre suporte, redes, segurança, cloud e DevSecOps" (lista de áreas) e os objetivos fundidos |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 145 palavras; gancho do chamado "o sistema não abre"; consequência = chamado passando de time em time (absorveu o cenário do SOC); segurança em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 4 itens + frase padrão; 83 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 3: Porta (2.6), TLS (2.7, 8.3), ICMP (4.8) |
| Problema 80–150, sem repetir o gancho | cumpre | 145 palavras; retoma com "é isso que acontece quando toda falha recebe o mesmo rótulo"; história (fabricantes, ISO, TCP/IP venceu, vocabulário ficou) em 3 frases |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | "a primeira evidência que falha aponta a camada provável" só no Funcionamento interno + diagrama (e no Resumo, exceção prevista) |
| Arquitetura só se acrescenta | removida | listava equipamentos por camada (já na coluna Exemplos do Conceito) + mapeamento cloud/DevSecOps (prévia) |
| Diagrama mantido/corrigido | mantido (corrigido) | a seta saía da camada 4 para o "Sintoma" (sem sentido); agora vai da pilha para "Evidências por camada" com o rótulo "uma pergunta por camada". Rótulos: "encoding" → "codificação"; "logs, métricas e capturas" → "de baixo para cima, sem pular etapas"; "Hipótese responsável / não pule etapas" → "Hipótese e time responsável / vem da primeira evidência que falha"; `<desc>` reescrita |
| Erros comuns ≤3, sem repetição | cumpre | 3: ping como prova de saúde, decorar sem usar, culpar uma camada sem evidência. Saíram "chamar tudo de problema de rede" (repetia o Problema) e "forçar produto em uma camada" (repetia o callout de limites) |
| Termos avançados cortados ou no glossário | cumpre | saíram TTL, VLAN, handshake, retransmissão, JSON, tokens, SFP, load balancer, proxy, WAF, service mesh, NAT, IAM, NSG, split DNS |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample "abrir um site" virou lista por camada + caso "ping ao IP responde, nome não" (DNS); analogia da encomenda em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 2) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6; fc2.1.3 sem "VLAN" |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não se aplica | não havia lab; não foi criado (o diagnóstico com comandos é tema da 2.8) |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre (acima de ~250) | mentor 2, exercícios 2, desafio reescrito com solução; 605 palavras no total (ver seção 6) |
| nextTheme 1–2 frases | cumpre | 1 frase (2.2), mantido da v1 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` de exercícios), unlocks/accessPolicy preservados; "15-25 min + 30 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | nenhum na v1; challenge sem gradingRubric |

Verificação do quiz contra a aula v2: q2.1.1 (utilidade: organizar responsabilidades) → definição do Conceito; q2.1.7 (camadas 5–7 no TCP/IP) → tabela OSI × TCP/IP; q2.1.8 (camadas 1–3 ok, porta 443 falha → camada 4) → Funcionamento interno "Do sintoma à hipótese" + tabela (porta = camada 4); q2.1.3 (ping não prova aplicação) → Erros comuns; q2.1.5 (porta alcançada + erro de permissão → conectividade ≠ autorização) → Funcionamento interno; q2.1.6 (modelo conceitual, componentes multicamada) → definição + callout "O OSI é um mapa". Gabaritos em 1, 2, 3, 0, 1, 2.

## 2. O que saiu e por quê
- Motivação: callout do SOC (virou parte da consequência: times se contradizendo) e "com ele você diagnostica, documenta, desenha arquitetura…" (lista de usos).
- Problema: lista de 4 consequências encolhida para 1 frase; "compra link, appliance ou licença" e "decisões de segurança baseadas em suposições" (cortados); "controle de camada 7… fabricantes e certificações" (lista).
- Conceito: termos avançados da coluna de exemplos (TTL, VLAN, handshake, retransmissão, JSON, API, tokens, potência) — prévias 2.4–2.7; callout de limites encolhido (load balancers, proxies, WAFs → "firewalls"; RFCs).
- Funcionamento interno: a lista de 7 passos por camada (repetia a tabela do Conceito; o detalhe é das aulas 2.3–2.7) virou 2 frases sobre serviço entre camadas e descida/subida; nomes de PDU (quadro, pacote, segmento) — prévia 2.2; 2 itens de Erros comuns (repetição).
- Arquitetura inteira (repetia a coluna Exemplos; cloud e DevSecOps são prévias).
- Analogia: "limite da analogia".
- enterpriseExample (ERP: repetia a divisão por times da Motivação), cloudExample (VM/banco e pipeline/registry: exemplo por ambiente; a ideia "conectividade não é autorização" ficou no Funcionamento interno), securityExample (defesa em profundidade por camada: prévia 2.9).
- security e troubleshooting (módulo 2).
- learningOutcomes (seção do template).
- Quiz q2.1.4 (defesa em profundidade, dependia do securityExample) → trocada pela nova q2.1.8 (diagnóstico pela primeira evidência que falha). q2.1.5 reescrita sem cloud (VM/security group/IAM → servidor de aplicação e banco).
- Mentor "por que o OSI continua útil com TCP/IP" (repetia q2.1.1/q2.1.6); "pinga o gateway mas não abre pelo nome" (virou o caso do Exemplo) → trocado por "o Wi-Fi está conectado, então a rede está boa".
- Exercício ex2.1.3 (abrir porta não resolve autenticação: repete q2.1.5).
- Desafio: cenário VPN (VPN e split DNS não foram ensinados; 10.1) → colega no escritório; tarefas de riscos de segurança e gradingRubric (ritual); solução reescrita por camadas, sem VPN/IAM.
- Glossário: Modelo OSI, Camada, TCP/IP e Troubleshooting por camadas (a aula ensina); Defesa em profundidade (saiu do texto).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Papel detalhado de cada camada no envio (serialização, TCP confiável × UDP sem conexão, estado/tokens) | prévia / repetição da tabela | 2.3–2.7, 6.1 |
| Nomes das PDUs (quadro, pacote, segmento) e desencapsulamento | prévia | 2.2 |
| TTL, VLAN, handshake, retransmissão, JSON, tokens | termo avançado / prévia | 2.4, 2.5, 2.6, 2.7 |
| Equipamentos por camada (SFP, tabela MAC, domínio de broadcast, firewall stateful, load balancer L4, health checks, proxy, WAF) | prévia | 2.3, 2.4, 3.4, 6.7, 8.5, 9.3 |
| Load balancers, proxies, WAFs e service mesh como multicamada | termo avançado (fica "firewalls") | 8.5, 9.6 |
| OSI em cloud (VPC/VNet, route table, security group, NSG, NAT gateway, private endpoint, DNS privado) | exemplo por ambiente / prévia | 9.7, 14.1–14.4 |
| OSI em DevSecOps (Terraform, Kubernetes Services, Ingress, NetworkPolicy) | exemplo por ambiente | módulo 14 |
| Pipeline que falha ao publicar no registry | exemplo por ambiente | — |
| ERP: suporte, redes, segurança e aplicação verificando camadas diferentes | repetição da Motivação | — |
| Defesa em profundidade: risco e mitigação por camada (NAC, port security, ARP spoofing, ACL, WAF) | prévia (seção de segurança) | 2.9, 3.9, 13.1 |
| Vulnerabilidades, boas/más práticas, monitoramento (NetFlow, SIEM), hardening, detecção | seção removida (módulo 2) | 2.9, 13.3, 13.4 |
| Comandos de diagnóstico (ipconfig, ping, tracert, nslookup, ip route, dig, Cisco IOS) e árvore de decisão | seção removida (módulo 2) | 1.9, 2.8 |
| "Comprar link, appliance ou licença" quando a causa está em outra camada | consequência cortada (Problema mais curto) | — |
| Cenário de VPN, split DNS e IAM no desafio | termo avançado | 10.1, 7.x |
| Rubrica de correção do desafio | ritual | — |

## 4. Acréscimos
- Conceito: frase "as camadas são numeradas de baixo para cima" e equipamentos (roteador, switch) na coluna Exemplos, no lugar da Arquitetura.
- Funcionamento interno: subseção "Do sintoma à hipótese" explicita a regra "a primeira evidência que falha aponta a camada provável" e define autenticação/autorização em 1 frase (sustenta q2.1.5 e o Resumo).
- Exemplo simples: lista por camada e o caso "ping ao IP responde, nome não abre → DNS (camada 7)".
- Quiz q2.1.8 (nova): camadas 1–3 ok, porta 443 falha → camada 4.
- Mentor novo: "o Wi-Fi está conectado, então a rede está boa".
- Glossário: Porta (2.6), TLS (2.7, 8.3), ICMP (4.8).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 3.897 | 3.753 | 2.657 |
| Teoria (palavras) | 2.579 | 2.455 | 1.356 |
| Núcleo (min, fórmula v2) | 28,8 | 27,9 | 19,4 |
| Prática extra (min) | 45 | 39 (→ 40) | 31 (→ 30) |
| duration declarada | 80-115 min | 65-90 min | 15-25 min + 30 min de prática extra |

## 6. Avisos do validar e justificativas
- Na primeira rodada: "quiz q2.1.6: a resposta usa termos que quase não aparecem na teoria" → a definição passou a dizer "modelo conceitual de referência" e o callout "componentes reais… operam em várias camadas". Sumiu.
- "análise ainda não escrita": resolvido por este arquivo.
- Sem aviso, mas acima do padrão: prática extra com 605 palavras (mentor 166, exercícios 130, desafio + solução 309). Cada item aplica algo novo (o que "Wi-Fi conectado" prova, reunião de incidente, classificar itens por camada, evidências de um serviço próprio, desafio do sistema financeiro).

## 7. Revisão humana
- Diagrama: a primeira seta e quatro rótulos mudaram (seta da pilha para "Evidências por camada"). Confirme se a leitura ficou melhor.
- Glossário com Porta, TLS e ICMP: confirme se Porta e ICMP já não foram explicados no módulo 1 (1.9 usa ping); se sim, podem sair.
- q2.1.5 trocou a VM em cloud por "servidor de aplicação e banco de dados" e a opção "Security group substitui IAM" por "Abrir mais portas no firewall resolve erros de permissão" (id mantido).
- Desafio: o cenário de VPN virou "colega no escritório"; se o dono do curso quiser manter VPN, precisa de glossário apontando a 10.1.
- Objetivo "linguagem comum entre times" saiu como item próprio; a ideia segue na Motivação e no Problema.
- references (ISO/IEC 7498-1, RFC 1122, aulas 0.8 e 1.9) e linksToOtherCourses mantidos da v1.

```json
{
  "id": "2.1", "modulo": "m02", "titulo": "Por que o Modelo OSI existe", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 15,
  "acrescimos": ["Conceito: numeração de baixo para cima e equipamentos na coluna Exemplos", "Funcionamento interno: 'Do sintoma à hipótese' e definição de autenticação/autorização", "Exemplo simples: lista por camada e caso do DNS", "Quiz q2.1.8 (camada 4)", "Mentor: Wi-Fi conectado", "Glossário: Porta, TLS, ICMP"],
  "palavras_visiveis": { "original": 3897, "v1": 3753, "v2": 2657 },
  "nucleo_min": { "original": 28.8, "v1": 27.9, "v2": 19.4 }, "pratica_extra_min": { "original": 45, "v1": 40, "v2": 30 },
  "duration_v2": "15-25 min + 30 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "A lista de 7 passos que repetia a tabela virou a regra 'a primeira evidência que falha aponta a camada provável', aplicada no exemplo do site e no quiz.",
  "revisao_humana": ["Seta e rótulos do diagrama ajustados", "Porta e ICMP no glossário: confirmar se o módulo 1 já os explica", "q2.1.5 reescrita sem cloud (id mantido)", "Desafio sem VPN", "Objetivo 'linguagem comum entre times' absorvido pela Motivação/Problema", "references/linksToOtherCourses mantidos da v1"]
}
```
