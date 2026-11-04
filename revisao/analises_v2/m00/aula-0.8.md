# Aula 0.8 — Como pensar em camadas (v2)
Base: v1 · Tipo: ligação · Módulo: m00 (Fundamentos da Computação)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: camadas + encapsulamento num acesso HTTPS; diagnosticar subindo as camadas (ping, porta, TLS, 401, 403); OSI/TCP/IP como mapas. Saíram "preparar para o Módulo 1 e 2" (prévia) e a lista "redes, cloud, segurança e DevSecOps" |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 143 palavras; gancho "a internet caiu" / "o sistema não funciona" + caso do ping que responde e login que falha; consequência: porta perigosa aberta e problema intacto; carreira em 1 frase (suporte, redes, segurança e cloud discutindo com evidências) |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase padrão; 86 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 4: Ping (1.9, 4.8), Gateway (2.5), Certificado (8.3), Modelo OSI (2.1) |
| Problema 80–150, sem repetir o gancho | cumpre | 122 palavras; "É isso que acontece quando tudo vira 'a rede'"; o acesso a `https://sistema.empresa.local` depende de muitas peças; camadas dividem responsabilidades (placa de rede × API) |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | perguntas por camada no Conceito; encapsulamento e a regra "um teste prova a sua camada e as de baixo" no Funcionamento interno; pilha no diagrama |
| Arquitetura só se acrescenta | removida | lista de componentes (WAF, EDR, SIEM, policy engine, NAT, VLAN…) sem mecanismo novo |
| Diagrama mantido/corrigido | mantido (corrigido) | rótulos sem MAC, VLAN, sub-rede, claims, payload, WAF, SIEM; caixa do topo "Política e observabilidade" removida (o texto não a ensina); rótulos das setas movidos para baixo da pilha (o "descer para validar base" ficava sobre a caixa do Transporte) |
| Erros comuns ≤3, sem repetição | cumpre | 3: culpar o DNS; liberar o firewall sem saber a camada; autenticação × autorização (401/403). O item do ping foi para o Funcionamento interno (regra do diagnóstico) |
| Termos avançados cortados ou no glossário | cumpre | saíram ARP, VLAN, NAT, ZTNA, SNI, claims, OIDC, service mesh, NGFW, WAF, SIEM, EDR, security group, route table, ingress |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample = tabela "notebook não abre um site" subindo as camadas, com fecho aplicando o primeiro "não"; analogia da entrega em 2 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud, devsecops e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 0) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saiu q0.8.3 (defesa em profundidade); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 5; saíram fc0.8.4 (cloud) e fc0.8.5 (defesa em profundidade); novo fc0.8.8 (encapsulamento) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não se aplica | a aula não tinha lab |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2, exercícios 2, desafio novo (nome que não resolve) com solução comentada |
| nextTheme 1–2 frases | cumpre | 1 frase (0.9) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu `anyOf`), unlocks/accessPolicy preservados; "15-25 min + 30 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | challenge sem constraints/gradingRubric; commentedSolution com commonMistakes em texto |

Verificação do quiz contra a aula v2: q0.8.1 (definição) → definição do Conceito; q0.8.2 (ping responde, HTTPS não abre) → Funcionamento interno, regra do diagnóstico; q0.8.4 (403 → autorização, não rota/firewall) → Funcionamento interno ("uma resposta 403 prova que sinal, caminho, porta e TLS funcionaram") + callout; q0.8.5 (OSI útil apesar do TCP/IP) → "Modelos são mapas"; q0.8.6 (401 × 403) → callout de erros comuns; q0.8.7 (ordem do encapsulamento) → lista do Funcionamento interno. Gabaritos em 0,1,1,0,3,2.

## 2. O que saiu e por quê
- Motivação: lista de 12 causas possíveis (WAF, proxy, token…), callout "Problema real" virou o caso do ping em 2 frases; parágrafo "escada de perguntas" (repetia a ideia central) e "você vai usar no OSI, TCP/IP, cloud networking, IAM" (prévias).
- Problema: lista ARP, VLAN, NAT, cookie, token, banco de dados (termos avançados); frase das trocas erradas (repetia a Motivação e os erros comuns).
- Conceito: tabela de 3 modelos virou 1 parágrafo (sem "camadas operacionais: observabilidade, automação"); service meshes, NGFW, WAF (termos avançados); "camadas não substituem logs, captura, métricas" (ritual); item "ping prova tudo" do callout (passou a ser a regra do Funcionamento interno).
- Funcionamento interno: item 7 da lista ("identidade e política… tokens, claims"), que não é passo de encapsulamento, virou 1 frase; exemplos de influência entre camadas reduzidos de 5 para 2 (proxy, retransmissões, certificado saíram).
- Arquitetura inteira (lista de componentes, sem mecanismo).
- Analogia: etapas "andar/sala" e "registro de entrega" e o "limite da analogia".
- enterpriseExample, cloudExample, devsecopsExample, securityExample (seção do template / prévias).
- security e troubleshooting (módulo 0).
- learningOutcomes (seção do template).
- Quiz q0.8.3 (defesa em profundidade, termos IAM/VPN/segmentação: prévia 13.1).
- Flashcards fc0.8.4 (cloud) e fc0.8.5 (defesa em profundidade).
- Mentor: VPN (termo não ensinado; virou o caso 4G × Wi-Fi) e VM em cloud (prévia 14.x).
- Exercícios: ex0.8.2 (403 → evidências de IdP e claims; repetia q0.8.4/q0.8.6) e ex0.8.3 (pilha com API Gateway e IAM: prévia).
- Desafio "runbook de primeira resposta" com rubrica e escalonamento (repetia o simpleExample; termos de cloud/IAM; ritual) → trocado por um caso de aplicação.
- Glossário: Camada, Encapsulamento, Troubleshooting em camadas, Autorização (a aula ensina) e Defesa em profundidade (não é mais citada).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Defesa em profundidade (um controle não substitui outro; NAT ≠ firewall; VPN ≠ autorização; HTTPS ≠ identidade) | prévia | 2.9, 13.1 |
| Camadas operacionais (observabilidade, automação, política) como terceiro modelo | termo avançado / prévia | 2.9, 13.1 |
| Componentes que atuam em várias camadas: proxy, NGFW, WAF, service mesh | termo avançado (fica o firewall como exemplo) | 8.5, 9.6 |
| ARP, VLAN, NAT, cookie, sessão, token como peças de um acesso | prévia | 2.4, 3.5, 7.8, 8.4 |
| Componentes por camada (AP, link WAN, EDR, SIEM, IAM, MFA, policy engine) | termo avançado / seção removida | 1.7, 13.1 |
| Exemplo empresarial: equipes de rede, segurança, identidade, aplicação e plataforma | exemplo por ambiente | 2.8, 13.9 |
| Cloud: route table, security group, NSG, NAT Gateway, endpoint privado, IAM | exemplo por ambiente | 14.x (14.7, 14.10) |
| DevSecOps: runner, registry, CA ausente, OIDC audience, scanner | exemplo por ambiente | curso de DevSecOps |
| SNI, CA, inspeção TLS, versão incompatível como causas de falha TLS | termo avançado | 8.3, 8.5 |
| `curl -k` esconde a falha de TLS | seção removida (troubleshooting, módulo 0) | 8.8 |
| Comandos Cisco IOS (`show ip interface brief`, `show access-lists`) e árvore de decisão | seção removida (módulo 0) | 2.8, 4.9 |
| Vulnerabilidades, boas/más práticas, monitoramento, hardening, detecção | seção removida (módulo 0) | 2.9, 13.1 |
| Camadas não substituem logs, captura, métricas e documentação | ritual | 2.8 |
| Diferença entre aplicação na VPN e no escritório | termo não ensinado (trocado por 4G × Wi-Fi) | 10.6, 10.8 |
| Runbook de escalonamento entre equipes | prática repetida / ritual | 2.8, 15.1 |

## 4. Acréscimos
- Funcionamento interno: a regra "um teste que passa prova a sua camada e as de baixo, nunca as de cima", com o 403 como prova das camadas de baixo e o ping como prova parcial. Antes estava espalhada (callout, Exemplo em cloud, q0.8.4); é o mecanismo do diagnóstico em camadas e sustenta q0.8.2 e q0.8.4.
- Conceito: a lista de perguntas por camada (antes era um parágrafo corrido) e 1 frase dizendo que a pilha TCP/IP tem quatro camadas.
- simpleExample: fecho "a primeira pergunta com resposta 'não' mostra onde procurar".
- fc0.8.8 (encapsulamento), para manter 5 flashcards.
- Mentor novo (site abre no 4G e não no Wi-Fi), substituindo o da VPN; exercício novo ex0.8.4 (dizer qual camada cada evidência confirma).
- Desafio novo "o site interno que não abre pelo nome" (nome não resolve, porta 443 pelo endereço conecta) com solução comentada.
- Glossário: Ping, Gateway, Certificado, Modelo OSI.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 3.973 | 4.182 | 2.838 |
| Teoria (palavras) | 2.769 | 2.677 | 1.321 |
| Núcleo (min, fórmula v2) | 29,3 | 30,6 | 19,2 |
| Prática extra (min) | 39 (→ 40) | 39 (→ 40) | 31 (→ 30) |
| duration declarada | 55-80 min | 65-90 min | 15-25 min + 30 min de prática extra |

## 6. Avisos do validar e justificativas
- "Resumo com 96 palavras" (primeira rodada): resolvido encurtando 3 itens (86).
- "análise ainda não escrita": resolvido por este arquivo.
- Nenhum outro aviso. A prática extra soma 713 palavras (mentor 216, exercícios 197, desafio + solução 300), acima de ~150–250 no total; cada item aplica algo novo (comparar dois caminhos, classificar evidências, diagnosticar um caso), e o `validar` não avisou.

## 7. Revisão humana
- Diagrama: a caixa do topo "Política e observabilidade: WAF, logs, SIEM, auditoria" foi removida, o `viewBox` foi recortado (`0 100 980 385`) e os rótulos das setas foram para baixo da pilha. Confira no navegador.
- Conceito ficou com 312 palavras (inclui o callout de 3 erros, ~110) e Funcionamento interno com 262; acima da proporção da 0.1, porque o encapsulamento e a regra do diagnóstico são o mecanismo da aula.
- Quiz: q0.8.4 teve opções reescritas ("policy, grupo, claim" → "o usuário não tem permissão para essa ação"; "security group" → "firewall"; "sub-rede" → "rede"), topic/type de "cloud" para "diagnóstico"; q0.8.6 trocou "token ausente" por "credencial ausente"; explicação da q0.8.2 sem "ICMP". Ids mantidos.
- Desafio: o caso supõe que `Test-NetConnection 10.0.0.20 -Port 443` com sucesso descarta o firewall naquele caminho; confirme se a redação "nenhum firewall está bloqueando esse acesso" está boa.
- A afirmação "a pilha TCP/IP, com quatro camadas" segue o `networkContext` da aula (acesso à rede, internet, transporte, aplicação); há livros que usam cinco. A aula 2.1 deve tratar disso.
- 401 × 403 já aparece na 0.7 v2 ("um 403 é uma resposta"); aqui fica como item do callout por ser a distinção autenticação × autorização da camada de identidade.
- tags (cloud, devsecops), references (ISO/IEC 7498-1 e 3 internas com url vazia) e linksToOtherCourses mantidos da v1.

```json
{
  "id": "0.8", "modulo": "m00", "titulo": "Como pensar em camadas", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 15,
  "acrescimos": ["Funcionamento interno: regra 'um teste prova a sua camada e as de baixo' (403 e ping)", "Conceito: perguntas por camada em lista; TCP/IP com quatro camadas", "simpleExample: fecho do primeiro 'não'", "Flashcard fc0.8.8 (encapsulamento)", "Mentor 4G × Wi-Fi", "Exercício ex0.8.4 (camada que cada evidência confirma)", "Desafio do nome que não resolve com solução", "Glossário: Ping, Gateway, Certificado, Modelo OSI"],
  "palavras_visiveis": { "original": 3973, "v1": 4182, "v2": 2838 },
  "nucleo_min": { "original": 29.3, "v1": 30.6, "v2": 19.2 }, "pratica_extra_min": { "original": 40, "v1": 40, "v2": 30 },
  "duration_v2": "15-25 min + 30 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O diagnóstico em camadas virou uma regra única no Funcionamento interno (um teste prova a sua camada e as de baixo), aplicada no exemplo e no desafio, sem os quatro exemplos por ambiente que repetiam a mesma ideia com termos avançados.",
  "revisao_humana": ["Diagrama: caixa do topo removida, viewBox recortado e rótulos das setas movidos", "Conceito 312 e Funcionamento 262 palavras", "Opções da q0.8.4 e q0.8.6 reescritas sem jargão", "Redação do desafio sobre o firewall descartado", "TCP/IP com quatro camadas", "401 × 403 também aparece na 0.7", "tags/references/linksToOtherCourses mantidos da v1"]
}
```
