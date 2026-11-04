# Aula 3.5 — ARP: transformando IPv4 em MAC na rede local (v2)
Base: v1 · Tipo: fundamental · Módulo: m03 (Ethernet, MAC, Switches e ARP) · Aula do piloto (primeiro módulo em que Segurança e Troubleshooting podem voltar)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: (1) por que o IPv4 precisa do ARP + Request/Reply/cache; (2) decidir pela máscara se o ARP busca o destino ou o gateway; (3) ler a tabela ARP (arp -a, ip neigh) e explicar por que o ARP spoofing é possível e como se defender. Sai "Relacionar ARP com troubleshooting, segurança de LAN…" (lista de áreas) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 134 palavras; gancho "conectado, IP certo, nenhum site abre"; consequência (trocar DNS/ligar para o provedor sem resolver; nenhum pacote sai); segurança em 1 frase (ARP spoofing). Callout "Problema real" fundido no texto |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase padrão; 84 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 3: EtherType (3.2), VLAN (3.7), DAI (3.9). Os 6 termos da v1 (ARP, Request, Reply, cache, próximo salto, ARP spoofing) saíram: a própria aula os explica |
| Problema 80–150, sem repetir o gancho | cumpre | 131 palavras; abre com "É isso que acontece quando um host sabe para qual IP quer falar, mas não sabe qual MAC colocar no frame" |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | decisão de próximo salto no Conceito (tabela) e sequência no Funcionamento interno; diagrama mostra Request/Reply/cache. IPv6 ficou em meia frase, sem NDP/ICMPv6 |
| Arquitetura só se acrescenta | removida | lista de papéis (host, switch, gateway, firewall, VLAN, cloud) repetia o Funcionamento interno; cloud/hypervisor é prévia do módulo 14 |
| Diagrama mantido/corrigido | mantido | sem erro; usa 192.168.10.x (o texto usa 192.168.1.x), coerente dentro do diagrama |
| Erros comuns ≤3, sem repetição | cumpre | 2 itens novos e específicos: "ping sem resposta ≠ ARP falhou" e "esperar ver o MAC de um site em arp -a". Saíram ARP×DNS (já no Conceito e no Resumo), MAC como identidade (vai para 3.9) e IP duplicado (3.6) |
| Termos avançados cortados ou no glossário | cumpre | saíram NDP, ICMPv6, NAC, 802.1X, port security, DHCP snooping, MAC flapping, broadcast storm, HSRP/VRRP, PCAP, VPN, ASN, proxy ARP; DAI explicada em 1 frase e no glossário |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample: impressora + site com a saída real de `arp -a` (o site nunca aparece); analogia do andar em 3 frases, com o "qualquer um grita 'sou eu'" no lugar do callout "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterpriseExample e cloudExample removidos |
| Segurança / Troubleshooting (3.5) | mantidos com dieta | ver decisão abaixo |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões, ids mantidos; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6; fc3.5.9 reescrito sem DHCP snooping, port security e 802.1X/NAC |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos, 408 palavras, 20 min. O aluno vê o gateway entrar na tabela, 8.8.8.8 não entrar e o "host de destino inacessível" quando ninguém responde ao ARP |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (máscara /16; dois IPs com o mesmo MAC), exercícios 2 (ler campos de uma captura; próximo salto para 3 destinos), desafio reescrito com solução comentada |
| nextTheme 1–2 frases | cumpre | 1 frase (3.6) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}`, unlocks ["3.6"] e accessPolicy preservados; "20-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions; challenge sem constraints/gradingRubric |

**Decisão sobre Segurança e Troubleshooting (critério 3.5).**
- `security` **fica**: o ARP spoofing é um ataque do próprio mecanismo (o ARP aceita Reply sem autenticação), com defesa própria (DAI, VLANs menores, criptografia) e detecção que o aluno já consegue fazer (comparar o MAC do gateway em `arp -a`/`ip neigh`, dois IPs com o mesmo MAC). Dieta: 1 vulnerabilidade (ARP spoofing, 4 campos), 3 goodPractices, 3 detectionIdeas. Saíram badPractices, commonErrors, monitoring, hardening e a vulnerabilidade "IP duplicado" (erro operacional, tema da 3.6). O aprofundamento (DHCP snooping, port security, 802.1X, MAC flooding) fica para a 3.9. O renderizador aceita a ausência das listas (seção 9.3).
- `troubleshooting` **fica**: a tabela ARP e o próximo salto se inspecionam com ferramentas que o aluno já tem (ping, arp -a, ip neigh, ip route). Para não antecipar a 3.6 (estados do cache, IP duplicado, MAC inconsistente) e não repetir o lab, o bloco cobre só o mecanismo desta aula: qual próximo salto o host escolheu e se o ARP dele teve resposta. 3 sintomas, 3 perguntas, 2 comandos (Linux `ip route get` + `ip neigh show`; Windows `Find-NetRoute` + `Get-NetNeighbor`, que não estão no lab), árvore de 3 ramos. Saíram Cisco IOS (a aula não ensina), `tracert` e `nslookup` (fora do tema).

**Verificação do quiz contra a aula v2:** q3.5.1 (função do ARP) → definição do Conceito; q3.5.2 (site externo → gateway) → tabela do Conceito; q3.5.3 (por que o spoofing é possível) → Problema ("sem autenticação") + `security.vulnerabilities`; q3.5.8 (ping sem resposta + REACHABLE) → Erros comuns do Conceito + "Como ler a tabela ARP"; q3.5.7 (impressora na mesma sub-rede) → tabela do Conceito; q3.5.6 (ARP do gateway falha → problema local) → Motivação + 1º ramo da árvore de troubleshooting. Gabaritos em 1, 2, 0, 3, 1, 2.

## 2. O que saiu e por quê
- Objetivos 4 e 5 da v1 fundidos/reescritos; o 5 era lista de áreas.
- Motivação: lista "falhas de gateway, VLAN errada, impressoras que somem e investigações de ARP spoofing" e o callout "Problema real" (repetiam o Problema).
- Problema: "VMs aparecem e somem", "riscos que você verá adiante" (enxugado).
- Conceito: NDP sobre ICMPv6 (sem aula no curso; virou meia frase); callout de erros comuns da v1 (ARP×DNS repetia o texto; MAC como identidade → 3.9; IP duplicado → 3.6).
- Funcionamento interno: tabela "Onde cada etapa pode falhar" (repetia o bloco de troubleshooting e antecipava a 3.6: cache desatualizado, IP duplicado, broadcast storm); coluna "Observação defensiva" da tabela de campos (varredura, Replies não pedidos: 3.9); frase "evidência a investigar" (foi para security.detectionIdeas).
- Arquitetura inteira (repetição; cloud/hypervisor = módulo 14).
- Analogia: callout "limite da analogia" (virou a 3ª frase).
- simpleExample da v1 (repetia a sequência do Funcionamento interno): trocado pelo caso impressora + site com a saída de `arp -a`.
- enterpriseExample (repetia Motivação/troubleshooting; MAC flapping → 3.8/3.6) e cloudExample (security group, NSG, NACL, Docker, Kind, Minikube, runner: módulos 9 e 14).
- security: badPractices, commonErrors, monitoring, hardening, vulnerabilidade "IP duplicado"; 802.1X/NAC, port security, DHCP snooping.
- troubleshooting: comandos Cisco IOS, `tracert`, `ipconfig /all` (está no lab), 2 sintomas, 3 perguntas e o ramo de DNS da árvore.
- Glossário: os 6 termos que a aula ensina.
- Lab: passo 5 "Interpretar evidências" (ritual: tabela sanitizada), safetyNotes, validation, troubleshooting, improvements (Wireshark, Packet Tracer), evidenceToCollect, questions, topology/architecture/cost.
- Mentor: "Por que o IPv4 precisou de ARP" (reexplica a ideia central) e "host sem ARP para o gateway, o que verificar" (repete q3.5.6 e a árvore); "proxy ARP" saiu das ideias esperadas da questão da máscara (termo não explicado).
- Exercício ex3.5.3 (VLAN grande aumenta o risco: repetia security.goodPractices).
- Desafio: constraints e gradingRubric; HSRP/VRRP, MAC table, DHCP logs da solução.
- Quiz q3.5.1: opção "Rotear pacotes entre ASNs" → "entre redes diferentes" (ASN é termo do módulo 11).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| NDP (Neighbor Discovery) sobre ICMPv6 no IPv6 | termo avançado; ficou "o IPv6 resolve com outro mecanismo" | nenhuma aula de IPv6 no índice |
| Falhas por etapa: cache desatualizado, IP duplicado, broadcast storm | prévia / repetição do troubleshooting | 3.6, 3.8 |
| IP duplicado (vulnerabilidade, erro comum, mitigação por DHCP/inventário) | prévia | 3.6 |
| MAC não é identidade forte; controle de acesso exige 802.1X/NAC | prévia | 3.9 |
| DHCP snooping, port security, 802.1X/NAC | termos avançados / prévia | 3.9 |
| Requests em sequência = varredura; Replies não pedidos; volume anormal de ARP | prévia (detecção) | 3.9, 16.6 |
| MAC flapping, broadcast ARP elevado por VLAN | prévia | 3.8, 3.6 |
| Papéis de host/switch/gateway/firewall/VLAN no ARP (Arquitetura) | repetição | — |
| ARP abstraído em cloud; bridges de Docker/Kind/Minikube | exemplo por ambiente | 14.x |
| Failover com HSRP/VRRP como explicação legítima | termo avançado; ficou "equipamento reserva que assume o IP do gateway (failover)" | — (sem aula específica no índice) |
| Correlação com MAC table do switch, logs de DHCP e firewall | prévia | 3.6, 3.9 |
| Sanitizar capturas/tabelas antes de compartilhar; não usar ferramentas ofensivas | ritual (avisos genéricos) | 16.x |
| Proxy ARP mascarando erro de máscara | termo avançado | — |
| Cisco IOS (`show arp`, `show mac address-table`, `show vlan brief`) | equipamento que a aula não ensina | 3.6 |
| Wireshark com filtro arp, Packet Tracer (melhorias do lab) | ritual / prévia | 6.8 |

## 4. Acréscimos
- Conceito, Erros comuns: "ping sem resposta não significa que o ARP falhou" (sustenta a q3.5.8, que na v1 só tinha apoio no lab) e "o MAC de um site nunca aparece em arp -a".
- Conceito: frase final ligando o próximo salto ao que aparece na tabela ARP.
- Funcionamento interno: o que acontece quando ninguém responde ao Request ("host de destino inacessível"), base do passo 4 do lab; "No Reply, o MAC procurado vem no campo Sender" (sustenta o ex3.5.6).
- Lab: passo 3 (pingar 8.8.8.8 e ver que só o gateway entra na tabela) e passo 4 (IP sem dono → inacessível / FAILED).
- Troubleshooting: `ip route get`, `Find-NetRoute`, `Get-NetNeighbor` (mostram o próximo salto escolhido; não repetem o lab).
- Security: detecção "dois IPs com o mesmo MAC" e a DAI explicada em 1 frase.
- Mentor novo (gateway e notebook com o mesmo MAC); desafio reescrito com valores concretos (10.0.5.1, MAC alternativo que também aparece para 10.0.5.77).
- Glossário: EtherType → 3.2, VLAN → 3.7, DAI → 3.9.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.501 | 4.511 | 3.594 |
| Teoria (palavras) | 2.718 | 2.533 | 1.806 |
| Núcleo (min, fórmula v2) | 29,9 | 28,5 | 22,9 |
| Prática extra (min) | 70 | 69 (→ 70) | 51 (→ 50) |
| duration declarada | 90-125 min | 90-125 min | 20-25 min + 50 min de prática extra |

A queda (−20% de palavras visíveis) é menor que a da 0.1 porque esta aula mantém `security` (232 palavras) e `troubleshooting` (254), a tabela de campos do protocolo e um quiz já enxuto. Sem esses dois blocos, a teoria cai de 1.905 para 1.320 palavras (−31%).

## 6. Avisos do validar e justificativas
- Nenhum aviso de conteúdo. O único aviso da primeira rodada ("análise ainda não escrita") é resolvido por este arquivo.

## 7. Revisão humana
- Decisão do piloto: `security` e `troubleshooting` mantidos com dieta (justificativa na seção 1). Confirme se o recorte evita sobreposição suficiente com a 3.6 (cache e troubleshooting) e a 3.9 (segurança em L2).
- Comandos Windows do troubleshooting (`Find-NetRoute -RemoteIPAddress`, `Get-NetNeighbor -IPAddress`) não foram testados; os valores esperados (NextHop 0.0.0.0 para destino local; estados Reachable/Stale/Unreachable/Incomplete) seguem a documentação dos cmdlets.
- Lab, passo 4: a mensagem "Host de destino inacessível" (Windows) e "Destination Host Unreachable" + FAILED/INCOMPLETE (Linux) não foram testadas aqui; o aluno precisa escolher um IP realmente livre (o texto sugere o .254 de uma /24, se não for o gateway).
- Conceito com 276 palavras e Funcionamento interno com 354: o tema tem campos de protocolo e leitura de tabela, que o padrão manda manter.
- Diagrama usa 192.168.10.x e o texto 192.168.1.x; mantido como estava (sem erro).
- labType "security" mantido da v1, embora o lab agora seja de observação.
- references (RFC 826 + 2 internas) e linksToOtherCourses (DevSecOps, IAM/NAC) mantidos como na v1; o link de DevSecOps citava bridges virtuais, que saíram com o cloudExample.

```json
{
  "id": "3.5", "modulo": "m03", "titulo": "ARP: transformando IPv4 em MAC na rede local", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "security.badPractices", "security.commonErrors", "security.monitoring", "security.hardening", "lab.passo5", "exercicio ex3.5.3"],
  "conceitos_removidos": 15,
  "acrescimos": ["Erros comuns: ping sem resposta não é falha de ARP; MAC de site nunca aparece em arp -a", "Funcionamento: Request sem resposta = host inacessível; MAC procurado vem no Sender do Reply", "Lab: passos 3 (8.8.8.8 não entra na tabela) e 4 (IP sem dono)", "Troubleshooting: ip route get, Find-NetRoute, Get-NetNeighbor", "Security: detecção por dois IPs com o mesmo MAC", "Mentor: gateway e notebook com o mesmo MAC", "Desafio reescrito com valores concretos", "Glossário: EtherType, VLAN, DAI"],
  "palavras_visiveis": { "original": 4501, "v1": 4511, "v2": 3594 },
  "nucleo_min": { "original": 29.9, "v1": 28.5, "v2": 22.9 }, "pratica_extra_min": { "original": 70, "v1": 70, "v2": 50 },
  "duration_v2": "20-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O exemplo virou a saída real de arp -a mostrando gateway e impressora mas nunca o site, e a segurança ficou concentrada no ARP spoofing com detecção que o aluno consegue fazer na própria tabela.",
  "revisao_humana": ["Decisão do piloto: security e troubleshooting mantidos com dieta", "Comandos Windows do troubleshooting (Find-NetRoute, Get-NetNeighbor) não testados", "Saídas do passo 4 do lab não testadas; aluno precisa de um IP livre", "Conceito 276 e Funcionamento 354 palavras", "Diagrama em 192.168.10.x e texto em 192.168.1.x", "labType security mantido", "references e linksToOtherCourses mantidos da v1"]
}
```
