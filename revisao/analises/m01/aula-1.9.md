# Aula 1.9 — Diagnóstico inicial: ipconfig, ping, arp, tracert e nslookup
Tipo: fundamental · Duração declarada: 80-115 min · Palavras visíveis / invisíveis (antes): 5253 / 803

## 1. Duração
T pela fórmula = 158,9 min (teoria 21,9, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 75)
Veredito: SUBESTIMADA — M = 97,5 min < 0,8×T (127 min). A aula declara menos tempo do que lab (75 min), exercícios e desafio exigem. A divisão (teoria 16%, prática ~84%) faz sentido para uma aula de comandos. O lab de 10 passos curtos (comandos únicos + matriz + sanitização) estava estimado com folga: 5 min/passo + leitura dá ~57 min. Na nova versão, o lab passou para 55 min.

## 2. Encheção de linguiça
Nível: MÉDIA (~16%). Evidências:
- `history`: cronologia sem mecanismo ("O `ping` se popularizou como teste de alcance usando ICMP…"). Só a última frase (primeira linha de evidência antes de Wireshark/SIEM) tinha valor.
- `evolution`: a tabela "Fase / Ferramenta / O que respondia" repete a tabela do `concept`. Só a coluna "Limitação" e a linha Test-NetConnection/curl/nc eram novas. Frase genérica: "o mesmo raciocínio precisa funcionar em redes domésticas, empresas, VPN, cloud, VMs, containers…".
- `securityExample` × `security.vulnerabilities` × `deepDive.securityImpact`: os mesmos riscos (DNS malicioso, gateway/ARP suspeito, exposição de evidências) aparecem três vezes.
- `security.commonErrors` repete a coluna "Erro comum" do `concept` (ICMP × aplicação, ARP × roteamento, traceroute incompleto). `monitoring` e `detectionIdeas` se sobrepõem ("Gateways inesperados por segmento" / "Alertar para gateways não esperados por VLAN").
- Lab: `questions` (5) repete quiz, flashcards e exercícios ("Por que ping não prova que HTTP funciona?" = ex1.9.1 = fc1.9.2). `lab.challenge`/`solution` repetem o desafio principal (IP funciona, nome falha). `improvements` com meta-texto ("…em aula futura"). Prerequisito "Ter concluído as aulas 1.1 a 1.8" (frase repetida em 3 aulas).
- Sobreposição de prática: o caso "IP funciona, nome falha" aparece em q1.9.2, ex1.9.3, mentor 2, `challenge` e `lab.challenge`. Flashcards fc1/fc3/fc6 copiam q1/q4/q3.
- Meta-texto: "O valor desses comandos aparece quando você entende o mecanismo por trás deles." (`internals`). `devsecopsExample` tinha um parágrafo genérico de IaC ("rotas declaradas, regras mínimas, … testes automatizados").
- Campos invisíveis: `deepDive` (447 palavras) e `commonMistakes` (177). Tinham conteúdo útil (decisionTable com APIPA, limitations, mentalModel) que o aluno não via.

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: a tabela comando → pergunta → erro comum, a ordem host → rede local → gateway → caminho → DNS → serviço, o mecanismo de cada comando (ICMP Echo, TTL crescente, cache ARP), o exemplo empresarial com o chamado bem escrito, a árvore de decisão do troubleshooting com comandos Windows/Linux/Cisco e um lab executável e seguro.
Lacunas: nenhuma saída de comando é mostrada nem interpretada, embora os learningOutcomes 2–4 peçam isso ("Dado um resultado de ipconfig…", "Dado um ping com falha…", "Dado um nslookup…"). O APIPA (169.254.x.x) só aparecia em campo invisível e no troubleshooting do lab. O ping não tinha a distinção entre timeout e "Host de destino inacessível".
Erros técnicos: nenhum relevante.

## 4. Aproveitamento
BOM (~85%) — mais de 80% do T original vai para prática que exercita os objetivos (lab, exercícios, desafio). As perdas estão na teoria repetida (~4 min), na prática duplicada (o mesmo caso IP/nome cinco vezes, ~6 min) e na folga da estimativa do lab (~20 min, que é estimativa, não conteúdo). Contra a duração declarada (97,5 min), a aula parece "curta": o problema é a declaração, não o aproveitamento.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~14% (158,9 → 137,3 min). Ela vem quase toda da correção da estimativa do lab. Na teoria, os cortes (history, evolution, securityExample, meta-texto) foram compensados pelo conteúdo movido de `deepDive`/`commonMistakes` e pela tabela de leitura de resultados. A redução fica abaixo dos 15% exigidos para "SIM".

## 6. Explicação mais direta
SIM — (a) `concept`: definição primeiro (as duas definições redundantes viraram uma), e a tabela ganhou a coluna "O que não prova" (que absorveu `evolution` e `deepDive.limitations`), os equivalentes Linux e a linha "próxima etapa" (Test-NetConnection/curl/nc). Isso substitui três tabelas/listas paralelas. (b) `internals`: tabela "Como ler os resultados" (o que você vê → o que indica → próximo passo), com o exemplo concreto mais cedo. (c) `security`: os riscos ficaram num só lugar (`vulnerabilities`).

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Lista de evidências e callout mantidos; cortada a adjetivação ("kit inicial de qualquer profissional de…"). |
| history | FUNDIR:problem | Cronologia sem mecanismo. A frase útil (primeira linha de evidência antes de Wireshark/tcpdump/NetFlow/SIEM; continuam úteis em cloud/VPN/containers) foi para `problem`. |
| problem | MANTER | Lista "sem verificar X" é específica; recebeu 1 parágrafo de `history`. |
| evolution | FUNDIR:concept | A tabela repetia o `concept`; a coluna "Limitação" virou "O que não prova" e a linha Test-NetConnection/curl/nc foi para o `concept`. |
| concept | ENXUGAR | Definição única; tabela consolidada (pergunta, limite, erro comum, equivalente Linux). |
| internals | MANTER | Mecanismo mantido; meta-texto cortado; recebeu a tabela "Como ler os resultados" (deepDive.decisionTable, commonMistakes, securityExample e lab.troubleshooting + mensagens de ping). |
| architecture | ENXUGAR | Ordem mantida como lista numerada; os três exemplos de confusão ficaram numa frase. |
| analogy | ENXUGAR | Analogia mantida; limite da analogia em 1 frase. |
| simpleExample | MANTER | Concreto, com valores; só a forma verbal foi ajustada. |
| enterpriseExample | ENXUGAR | Caso ERP/VLAN mantido; frase de moldura cortada. |
| cloudExample | ENXUGAR | Um parágrafo: comandos dentro da VM × camadas da rede virtual (route table, SG/NSG, DNS privado, peering, private endpoint). |
| devsecopsExample | ENXUGAR | Mantido o runner e o que cada comando prova (curl -v, ss); cortado o parágrafo genérico de IaC. |
| securityExample | FUNDIR:security | Tabela de riscos idêntica a `security.vulnerabilities`; impactos e "como aparece" foram para as descrições. |
| diagram | MANTER | Correto e legível; só o h2 foi ajustado. |
| labIntro | REMOVER | Invisível. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | ENXUGAR | 5 bullets: o primeiro é o deepDive.mentalModel (escada) e há um bullet de sinais rápidos (APIPA, IP×nome). |
| nextTheme | ENXUGAR | 1 frase coerente com a 1.10. |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary,concept,internals | mentalModel → summary; limitations → concept "O que não prova"; decisionTable → internals e decisionTree; whenToUse/whenNotToUse/securityImpact já cobertos em concept/security; operational/financialImpact removidos (genéricos). |
| commonMistakes | MOVER:concept | Os 5 erros já estavam na coluna "Erro comum" do concept ou em security (sanitização); a correção do ARP foi para internals/fc1.9.9. |
| security | ENXUGAR | goodPractices/badPractices 4+4; commonErrors removido (duplicava o concept; "não preservar evidências" foi para badPractices); vulnerabilities enriquecidas com o securityExample; monitoring e detectionIdeas fundidos. |
| troubleshooting | MANTER | Comandos Windows/Linux/Cisco corretos e com os 3 rótulos preenchidos; decisionTree ganhou o exemplo 169.254.x.x. |
| lab | ENXUGAR | 10 passos, validação e evidências mantidos; prerequisites/safetyNotes enxutos; troubleshooting 4→2 (os outros 2 duplicavam a decisionTree e o internals); improvements 4→1; questions, challenge e solution removidos (duplicavam quiz/exercícios/desafio); estimatedTimeMinutes 75→55. |
| quiz | ENXUGAR | 6 questões; q1.9.3 (sanitização, duplicava ex1.9.4/lab passo 10) trocada por q1.9.7 (interpretar "Host de destino inacessível"); distratores triviais de q1, q2, q4, q5 e q6 trocados por plausíveis; gabarito embaralhado. |
| flashcards | ENXUGAR | 6 cards; 4 que copiavam o quiz/exercícios foram trocados por APIPA, ping filtrado × site no ar, ARP × destino remoto e NXDOMAIN × timeout. |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, distintas entre si. |
| exercises | ENXUGAR | 4; ex1.9.3 (IP × nome, quinta repetição do caso) trocado por ex1.9.5 (interpretar ipconfig com APIPA, learningOutcome 2). |
| challenge | MANTER | Cenário, entregáveis e rubrica claros. |
| commentedSolution | MANTER | Raciocínio em ordem e respostas erradas comuns específicas. |
| glossary | MANTER | 6 termos, todos usados na aula. |
| references | MANTER | Docs reais da Microsoft + referência interna. |
| linksToOtherCourses | MANTER | Relevantes. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Coletar evidências antes de reiniciar/agir | MANTIDO | motivation |
| 2 | ipconfig /all: IPv4, máscara, gateway, DNS, DHCP, sufixo DNS, estado da interface | MANTIDO | internals, concept |
| 3 | ping: ICMP Echo Request/Reply, RTT; não testa TCP/UDP/HTTP/autenticação | MANTIDO | internals, concept, ex1.9.1 |
| 4 | arp -a: cache ARP com associações IP-MAC locais | MANTIDO | internals, concept, q1.9.4 |
| 5 | ARP não atravessa roteadores; para destino remoto usa-se o MAC do gateway | MANTIDO | concept, internals, fc1.9.9, q1.9.4 |
| 6 | tracert: TTL crescente, roteador responde ao TTL expirado | MANTIDO | internals, fc1.9.4 |
| 7 | nslookup: servidor consultado, registros A/AAAA/CNAME/MX | MANTIDO | internals |
| 8 | Equivalentes Linux: ip addr, ip route, ip neigh, traceroute/tracepath, dig | MANTIDO | concept, troubleshooting, lab |
| 9 | Resposta ausente ≠ falha (ICMP bloqueado, rate limit, caminho assimétrico) | MANTIDO | internals (callout), concept, q1.9.5, fc1.9.8 |
| 10 | Sintomas ambíguos: lista de causas possíveis de "não acessa" | MANTIDO | problem |
| 11 | Consequências de pular cada verificação (IP, gateway, ARP, alcance, DNS, registro) | MANTIDO | problem |
| 12 | Primeira linha de evidência antes de Wireshark, tcpdump, NetFlow, logs de firewall, SIEM | MANTIDO | problem (APM/tracing distribuído REMOVIDO: fora do escopo da aula) |
| 13 | Ferramentas continuam úteis em cloud, VPN, containers, Kubernetes | MANTIDO | problem, cloudExample, devsecopsExample |
| 14 | Ordem: host → rede local → gateway → caminho → DNS → serviço | MANTIDO | architecture, diagram, summary |
| 15 | DNS parece "sistema fora"; ARP parece "internet caiu"; ICMP bloqueado parece "servidor desligado" | MANTIDO | architecture |
| 16 | Limite de cada comando (o que não prova) | MANTIDO | concept (coluna "O que não prova", vinda de evolution + deepDive.limitations) |
| 17 | Test-NetConnection, curl, nc como etapa seguinte (porta/aplicação) | MANTIDO | concept |
| 18 | APIPA 169.254.x.x = falha de DHCP; investigar link/Wi‑Fi/VLAN/AP/DHCP antes de DNS | MANTIDO | internals, troubleshooting.decisionTree, lab.troubleshooting, fc1.9.7, ex1.9.5, security.monitoring |
| 19 | Sem gateway padrão: sem saída para outras redes, mas a comunicação local continua | MANTIDO | internals, decisionTree, q1.9.6 |
| 20 | DNS desconhecido no ipconfig como sinal de risco | MANTIDO | internals, security.vulnerabilities |
| 21 | IP funciona e nome falha → hipótese DNS | MANTIDO | simpleExample, decisionTree, q1.9.2, mentor 2, challenge, summary |
| 22 | Gateway não responde e não aparece no ARP → falha local | MANTIDO | decisionTree |
| 23 | Split DNS / VPN para nomes internos | MANTIDO | internals, mentor 2, commentedSolution |
| 24 | NXDOMAIN × timeout no nslookup | MANTIDO | internals, lab.troubleshooting, fc1.9.10 |
| 25 | Caso ERP na VLAN de visitantes e chamado bem escrito | MANTIDO | enterpriseExample |
| 26 | Cloud: subnet, route table/rota efetiva, SG/NSG, DNS privado, peering, private endpoint | MANTIDO | cloudExample ("firewall gerenciado" e "controle de identidade" REMOVIDOS: genéricos, sem relação com os comandos da aula) |
| 27 | Runner de pipeline: curl -v, ss para separar rede/DNS/TLS/proxy/credencial | MANTIDO | devsecopsExample |
| 28 | Requisitos de IaC (NetworkPolicy, service accounts, secrets) | REMOVIDO | fora do escopo (diagnóstico com comandos básicos); exemplo genérico |
| 29 | Riscos: DNS malicioso (phishing/perda de acesso), gateway incorreto, ARP suspeito (interceptação/DoS), vazamento de topologia | MANTIDO | security.vulnerabilities (fundido com o securityExample) |
| 30 | Mitigações: DHCP controlado/snooping, DAI, port security, NAC/802.1X, segmentação, EDR | MANTIDO | security.vulnerabilities, hardening |
| 31 | Sanitização de evidências (exemplos de máscara) | MANTIDO | lab passo 10, ex1.9.4, security, challenge |
| 32 | Registrar data, hora, origem, destino e comando | MANTIDO | security.goodPractices, lab passo 1 |
| 33 | Preservar evidências antes de mudar a configuração | MANTIDO | security.badPractices |
| 34 | Cisco: show ip interface brief, show ip route, show arp | MANTIDO | troubleshooting |
| 35 | ip neigh REACHABLE/STALE | MANTIDO | troubleshooting |
| 36 | Cronologia dos utilitários (ping popularizou-se, traceroute, dig depois) | REMOVIDO | history sem mecanismo; os comandos estão no concept |
| 37 | Impactos operacional e financeiro (deepDive) | REMOVIDO | genéricos, duplicados em motivation/problem |
| 38 | Mensagens do ping: "Esgotado o tempo limite" × "Host de destino inacessível" | NOVO | internals, q1.9.7 (ver seção 10) |
| 39 | Comparar com outro nome interno conhecido ao isolar DNS | MANTIDO | commentedSolution |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar para que servem ipconfig, ping, arp, tracert e nslookup | concept (tabela), internals, analogy, glossary, q1.9.1, flashcards |
| Construir uma sequência de diagnóstico inicial | architecture, diagram, simpleExample, summary, lab passos 2–8, challenge/commentedSolution |
| Interpretar configuração local (IP, máscara, gateway, DNS, DHCP, interface) | internals ("Como ler os resultados"), ex1.9.5, fc1.9.7, q1.9.6, troubleshooting, mentor 1 |
| Diferenciar alcance ICMP, resolução ARP, caminho e DNS | concept ("O que não prova"), internals, q1.9.2/4/5/7, fc1.9.8/9/10, ex1.9.1/2 |
| Registrar evidências úteis para suporte, redes, SOC, cloud e DevSecOps | enterpriseExample (chamado), lab passos 1, 9 e evidenceToCollect, cloud/devsecopsExample, challenge |
| Aplicar limites éticos e sanitização | security, lab safetyNotes e passo 10, ex1.9.4, challenge (constraints e rubrica), mentor 3, summary |

## 10. O que mudou na nova versão
- Removidas as seções `history`, `evolution` e `securityExample` (fundidas em problem, concept e security) e os 4 campos *Intro invisíveis. `deepDive` e `commonMistakes` foram movidos e removidos.
- `concept`: uma definição só e uma tabela com "O que não prova", equivalentes Linux e a etapa seguinte (Test-NetConnection/curl/nc).
- `internals`: nova tabela "Como ler os resultados". A maior parte é conteúdo **movido** (APIPA e gateway ausente do deepDive.decisionTable, DNS desconhecido do securityExample, asteriscos do tracert do commonMistakes, NXDOMAIN/timeout do lab.troubleshooting). **Acréscimo novo:** as duas linhas com as mensagens do ping ("Esgotado o tempo limite do pedido" × "Resposta de <IP>: Host de destino inacessível") e a questão q1.9.7, que as cobra. Justificativa: o learningOutcome "Dado um ping com falha, o aluno diferencia hipóteses de bloqueio ICMP, destino fora, rota ausente ou falha local" não tinha nada que ensinasse a ler uma falha de ping. A q1.9.7 **substitui** a q1.9.3, e o total continua em 6.
- **Acréscimo novo:** o ex1.9.5 (interpretar um ipconfig com 169.254.37.12/255.255.0.0 sem gateway) **substitui** o ex1.9.3 (quinta repetição do caso IP × nome) e cobre o learningOutcome "Dado um resultado de ipconfig… reconhece ausência de gateway, IP inválido". O total continua em 4.
- Flashcards: 4 dos 6 trocados (fc1.9.1/2/3/6 → fc1.9.7/8/9/10) porque copiavam o quiz/exercícios. Os novos usam conteúdo da própria aula (APIPA, deepDive.limitations, commonMistakes do ARP, NXDOMAIN/timeout do lab). O total continua em 6.
- Quiz: distratores triviais ("Qual senha foi usada no login", "senhas salvas no navegador", "ganha mais throughput", "format", "show version") trocados por plausíveis; explicações ajustadas; posições da resposta correta redistribuídas com `quiz_embaralhar` (nenhuma explicação cita posição).
- Security: riscos consolidados em `vulnerabilities` (com impacto e o "como aparece" do securityExample); commonErrors removido; monitoring e detectionIdeas sem sobreposição.
- Lab: estimatedTimeMinutes 75 → 55 (10 passos curtos: ~3–5 min por comando, ~12 min para a matriz e ~8 min para a sanitização, mais a leitura; a alternativa da fórmula dá 55,9 min). Removidos questions, challenge e solution (duplicados) e o texto ritual de prerequisites, safetyNotes e improvements. lab.troubleshooting de 4 para 2 itens.
- Summary: o modelo mental da "escada" na primeira linha e um bullet de sinais rápidos.
- duration 80-115 → 115-165 min e estimatedStudyTimeMinutes 115 → 165. A original estava SUBESTIMADA (11.6).

## 11. Depois
Palavras visíveis: 5253 → 5138 (−2,2%; cortes brutos 824, acréscimos brutos 709, quase todos conteúdo movido de campos invisíveis: 803 → 47) · Duração: 80-115 min → 115-165 min (T 158,9 → 137,3 min) · Quiz corrigido: sim (6 questões)

AVISO do `validar` (justificado): "ids de quiz originais ausentes: q1.9.3". A questão foi substituída de propósito por q1.9.7, com id inédito (11.5).

## 12. Revisão humana
- As mensagens localizadas do Windows citadas em internals/q1.9.7 ("Esgotado o tempo limite do pedido", "Resposta de <IP>: Host de destino inacessível") e o texto "Non-existent domain" do nslookup precisam ser conferidos num Windows pt-BR.
- lab.estimatedTimeMinutes reduzido de 75 para 55 min (estimativa por passo na seção 10). Confirme se é coerente com o ritmo esperado do aluno iniciante.
- A q1.9.3 (sanitização) foi removida do quiz. A sanitização continua cobrada no ex1.9.4, no passo 10 do lab e na rubrica do desafio. Quem já respondeu a q1.9.3 perde essa resposta no cálculo.
- A duração declarada sobe de 80-115 para 115-165 min por causa da fórmula fixa (a original estava SUBESTIMADA). Confira o impacto no `estimatedHours` do módulo.

```json
{
  "id": "1.9", "modulo": "m01", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Diagnóstico inicial: ipconfig, ping, arp, tracert e nslookup",
  "duracao_declarada": "80-115 min", "T_original_min": 158.9, "duracao_nova": "115-165 min", "veredito_duracao": "SUBESTIMADA",
  "T_nova_min": 137.3, "duracao_nova_estimated_max": 165,
  "linguica_nivel": "MEDIA", "linguica_pct": 16, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 14, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 5253, "palavras_visiveis_depois": 5138,
  "palavras_invisiveis_antes": 803, "palavras_invisiveis_depois": 47,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "MANTER", "evolution": "FUNDIR:concept",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary,concept,internals", "commonMistakes": "MOVER:concept",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "ENXUGAR",
    "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Conferir em Windows pt-BR as mensagens 'Esgotado o tempo limite do pedido', 'Host de destino inacessível' e 'Non-existent domain' citadas em internals/q1.9.7",
    "lab.estimatedTimeMinutes reduzido de 75 para 55 min",
    "q1.9.3 (sanitização) substituída por q1.9.7; sanitização segue em ex1.9.4, lab passo 10 e rubrica",
    "duration sobe de 80-115 para 115-165 min (original SUBESTIMADA); conferir estimatedHours do módulo"
  ]
}
```
