# Aula 5.5 — Prefixos comuns na prática: /24 a /32
Tipo: fundamental · Duração declarada: 100-140 min · Palavras visíveis / invisíveis (antes): 3096 / 598 (o `metricas` não conta como invisíveis os subcampos não renderizados de `mentorQuestions.expectedAnswer`, `challenge.deliverables/rubric` e `commentedSolution.summary`, ~135 palavras a mais)

## 1. Duração
T pela fórmula = 84,7 min (teoria 16,7, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 30, desafio 20, lab 0)
Veredito: **INFLADA** — M = 120 min > 1,2 × T (101,6). A distribuição faz sentido para uma aula fundamental de cálculo e escolha (23% de leitura, o resto em prática), mas a faixa declarada promete ~35 min a mais do que o conteúdo exige. Sem lab independente (prática equivalente; o módulo concentra a prática nos labs 5.2, 5.6, 5.8 e 5.9).

## 2. Encheção de linguiça
Nível: **MÉDIA (~20%)** (~620 de 3096 palavras visíveis). Evidências:
- `security.vulnerabilities`: as 5 descrições são o placeholder "Risco relacionado à aula 5.5 — Prefixos comuns na prática: /24 a /32." e as 5 `defensiveExplanation` são a frase repetida em 41 aulas "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação". As mitigações estão desalinhadas: "sobreposição que força NAT de emergência" → "NAC"; "falta de rastreabilidade em IPAM" → "revisão de IaC" (lista colada por índice).
- `security.hardening` repete literalmente `security.mitigations` (9 itens); `commonErrors` genéricos ("Confundir sintoma com causa raiz", "Não relacionar redes corporativas com segurança e operação", frase de 55 aulas); `monitoring` é a frase de 65 aulas.
- `troubleshooting.diagnosticQuestions`: as 3 frases-padrão (57–98 aulas); `decisionTree` único fora do tema ("Funciona por IP, mas falha por nome → DNS"). Comandos sem `expectedObservation`/`interpretation` (o app mostra os rótulos "Esperado:" e "Interpretação:" vazios).
- `history` + `evolution` (271 palavras): a fase "rede simples → segmentação → segurança → cloud" aparece em history, evolution e na tabela de evolution; só "o /24 é fácil de ler" ajuda a entender o tema.
- Callouts que repetem o parágrafo anterior: "Motivação central: prefixos comuns são atalhos operacionais…", "Problema central: o prefixo correto não é apenas matemática…".
- Tabela de `internals` repete 3 das 5 colunas da tabela de `concept`; tabela de `architecture` repete o "uso típico" de `concept` e os "cuidados" da tabela de `problem`.
- Exercício `ex5.5.v2-final-pratica-equivalente` e `challenge.expectedDeliverables` = texto ritual ("Produza uma evidência curta…", "Evidência prática equivalente em vez de lab independente").
- `analogy`: limite da analogia de 30 palavras com lista de 8 tecnologias.

## 3. Conteúdo útil
**PARCIAL.** Valioso: tabela /24–/32 com máscara, totais, hosts úteis e uso típico; exceções /31 e /32 bem explicadas; tabela de "escolha ruim × consequência"; plano empresarial com IPs reais; tabela de allowlist /32 × /24 × /8; desafio realista com solução. Lacunas: reservas de IP em cloud citadas sem números (o learning outcome de cloud não tinha exemplo calculável); objetivo "evitar /30 em cloud" não era explicado; respostas do mentor, entregáveis/rubrica do desafio e o raciocínio da solução estavam em campos que o app não exibe. Erros técnicos: comando Cisco `show ip interface brief && show running-config | include ip address` (o IOS não aceita `&&`; e o `brief` não mostra a máscara); mitigações trocadas em `security.vulnerabilities`.

## 4. Aproveitamento
**BOM** — medido contra T: ~86% do tempo (≈73 de 84,7 min) ensina ou pratica os objetivos; o desperdício é ~5 min de leitura redundante e ~6 min do exercício ritual. Medido contra a duração declarada (M = 120), cairia para ~60%.

## 5. Pode ser mais curta?
**NÃO** — redução prevista: ~13% (leitura redundante + exercício ritual), abaixo dos 15%. A duração declarada, porém, cai de 100-140 para 75-110 min por correção da faixa (INFLADA).

## 6. Explicação mais direta
**SIM** — (a) fundir as tabelas de `concept` e `internals` numa só (com bits de host e 2^n), deixando `internals` só com o mecanismo e as exceções; (b) trocar history/evolution por 2 frases no início de `problem` ("o /24 virou padrão porque…"); (c) transformar `packetFlow` + `deepDive` (invisíveis) num procedimento numerado "Como escolher um prefixo" em `architecture`; (d) dar números às reservas de cloud (16 − 5 = 11 num /28); (e) resumo em 5 bullets.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | 2 parágrafos curtos; callout que repetia o texto removido |
| history | FUNDIR:problem | só "o /24 é fácil de ler (3º octeto, 0–255)" explica o tema; virou 1 frase em problem |
| problem | ENXUGAR | absorveu history/evolution em 2 frases; callout repetido removido; nova linha "/32 usado como rede de usuários" (de commonMistakes) |
| evolution | FUNDIR:problem | as 4 fases repetiam history; viraram meia frase em problem |
| concept | ENXUGAR | tabela única com máscara, bits de host, 2^n, totais, hosts úteis e uso típico (fundida com a de internals) |
| internals | ENXUGAR | tabela duplicada removida; mantidos fórmula, divisão ao meio e exceções /31 e /32 (com o erro comum de aplicar a fórmula ao /31) |
| architecture | ENXUGAR | mantida a separação prefixo/VLAN/gateway/firewall; tabela redundante trocada pelo procedimento "Como escolher" (de packetFlow + deepDive) |
| analogy | ENXUGAR | analogia mantida; limite em 1 frase |
| simpleExample | MANTER | exemplo concreto 192.168.1.0/24; ajuste mínimo |
| enterpriseExample | MANTER | plano com IPs reais; frase final encurtada |
| cloudExample | ENXUGAR | lista genérica cortada; acrescentados números de reserva (AWS/Azure: 5 por subnet) e tamanho mínimo (/28, /29) para cobrir objetivo e learning outcome |
| devsecopsExample | ENXUGAR | 1 parágrafo com exemplo calculado (/32 → /16 = 1 → 65.536) e as validações de pipeline |
| securityExample | MANTER | números exatos (/8 = 16.777.216) e tabela de cenários; classe `risk-table` → `data-table` |
| diagram | MANTER | correto e legível; só o número do h2 removido |
| labIntro | REMOVER | invisível, texto ritual de "prática equivalente" |
| exercisesIntro | REMOVER | invisível |
| challengeIntro | REMOVER | invisível |
| solutionIntro | REMOVER | invisível |
| summary | ENXUGAR | parágrafo virou 5 bullets de síntese |
| nextTheme | MANTER | 2 frases, coerente com 5.6 (VLSM) |
| lab | — | não existe; prática equivalente por exercícios e desafio (progressRules aceita `practicalExerciseDone`/`exerciseDone`) |
| quiz | ENXUGAR | 6 → 8; distratores implausíveis de q5-5-4/5/6 trocados; +q5-5-7 (50 hosts → /26) e +q5-5-8 (/31) |
| flashcards | ENXUGAR | 6 → 8, sem repetir o quiz (/25, /26, /27, /28, /29, /31, fórmula, /28 em cloud) |
| mentorQuestions | MANTER | `expectedAnswer` (invisível) virou `expectedIdeas`; +1 pergunta de raciocínio (/32 × prefixo da subnet) |
| exercises | ENXUGAR | ritual removido; ex5-5-3 fundido no novo ex5-5-5 (regra de firewall calculada); +ex5-5-6 (reserva AWS); respostas com valores |
| challenge | MANTER | `deliverables`/`rubric` (invisíveis) → `expectedDeliverables`/`gradingRubric`; ritual removido |
| commentedSolution | MANTER | `summary` (invisível) → `reasoning` com contas; +`commonMistakes` específicos; finalAnswer encurtado |
| glossary | MANTER | +IPAM (usado várias vezes e não definido) |
| security | FUNDIR:securityExample | placeholders e frases-padrão trocados por riscos específicos; mitigações realinhadas; hardening sem duplicar securityExample |
| security.mitigations | MOVER:security.vulnerabilities/hardening | campo invisível; itens distribuídos; "SIEM" genérico removido |
| troubleshooting | ENXUGAR | perguntas e árvore específicas do tema; comandos com observação e interpretação; Cisco corrigido |
| troubleshooting.method | MOVER:troubleshooting.diagnosticQuestions/decisionTree | invisível |
| troubleshooting.evidenceToCollect | MOVER:troubleshooting.diagnosticQuestions | invisível |
| references | MANTER | referência genérica de cloud especificada (Amazon VPC User Guide, Azure Virtual Network FAQ) |
| linksToOtherCourses | MANTER | reais |
| networkContext | MANTER | metadado |
| protocolFields | REMOVER | duplicava as colunas da tabela de concept |
| packetFlow | MOVER:architecture | virou o procedimento "Como escolher um prefixo" |
| deepDive | MOVER:architecture | pontos fundidos no procedimento; "VLSM: maiores primeiro" removido (tema da 5.6) |
| commonMistakes | MOVER:problem/internals | "/32 como LAN" → linha da tabela de problem; "/31 pela fórmula" → internals; demais já cobertos (problem, cloudExample) |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Máscaras decimais de /24 a /32 | MANTIDO | concept (tabela), flashcards, ex5-5-1 |
| 2 | Endereços totais por prefixo (256 … 1) | MANTIDO | concept (tabela), summary |
| 3 | Hosts úteis tradicionais por prefixo | MANTIDO | concept (tabela), flashcards |
| 4 | Bits de host = 32 − prefixo; total = 2^n | MANTIDO | concept (tabela) e internals |
| 5 | Quanto maior o prefixo, menor o bloco | MANTIDO | concept (definition-box), diagram |
| 6 | Cada bit divide o bloco ao meio (/24 = 2×/25 …) | MANTIDO | internals, summary (explicitado) |
| 7 | Fórmula 2^n − 2 desconta rede e broadcast | MANTIDO | internals, flashcard |
| 8 | /31 em ponto a ponto, quando os dois lados suportam (RFC 3021) | MANTIDO | internals, concept, q5-5-8, ex5-5-4 |
| 9 | Aplicar a fórmula ao /31 dá 0 (erro comum) | MANTIDO | internals, q5-5-8 (de commonMistakes) |
| 10 | /32 = um endereço: loopback, rota de host, allowlist | MANTIDO | internals, concept, q5-5-2 |
| 11 | /32 não é LAN (sem gateway/DHCP) | MANTIDO | problem (tabela), internals, mentor 2 |
| 12 | Usos típicos por prefixo (LAN, VLAN, DMZ, gestão, appliances, enlace, host) | MANTIDO | concept (tabela), summary |
| 13 | /24 popular por ser fácil de ler (3º octeto, 0–255) | MANTIDO | problem (de history) |
| 14 | Divisão classful → CIDR | REMOVIDO | fora do escopo: CIDR é pré-requisito (5.2) e não ajuda a escolher prefixo |
| 15 | Segmentação por função, por segurança e cloud/híbrido tornaram o "/24 para tudo" inadequado | MANTIDO | problem (de history/evolution) |
| 16 | Escolhas ruins: /24 para tudo, /29 no limite, /16 em allowlist, /32 sem documentação, /30 cego | MANTIDO | problem (tabela) |
| 17 | Sintomas tardios do prefixo errado (falta de IP, VPN, DHCP, cloud, visitantes) | MANTIDO | problem |
| 18 | Papéis distintos: prefixo, VLAN, gateway, firewall | MANTIDO | architecture |
| 19 | Procedimento de escolha (requisito → candidato → segurança → operação → cloud → documentar) | MANTIDO | architecture (de packetFlow/deepDive; "validar operação" fundido no passo 1) |
| 20 | Margem de crescimento sem virar desculpa para bloco enorme | MANTIDO | architecture passo 2 |
| 21 | Em firewall, o menor CIDR que representa a necessidade | MANTIDO | architecture passo 3, summary, security |
| 22 | VLSM: alocar maiores primeiro | REMOVIDO | fora do escopo (tema da aula 5.6) |
| 23 | Analogia do prédio (andar, sala, mesa) | MANTIDO | analogy |
| 24 | Rede doméstica 192.168.1.0/24 e por que não serve para empresa | MANTIDO | simpleExample |
| 25 | Plano por função 10.10.10.0/24, .20.0/26, .30.0/28, .40.0/28, .255.0/30 | MANTIDO | enterpriseExample |
| 26 | Reservas do provedor reduzem os IPs da subnet | MANTIDO | cloudExample (com números), q5-5-6, ex5-5-6, flashcard |
| 27 | Sobreposição de VPC com on-prem/VPN/contas/regiões | MANTIDO | cloudExample, security, troubleshooting |
| 28 | Não dimensionar subnet cloud no limite | MANTIDO | cloudExample (callout), q5-5-6 |
| 29 | Validações de CIDR em pipeline (sobreposição, 0.0.0.0/0, IPAM, capacidade) | MANTIDO | devsecopsExample, security.hardening |
| 30 | /32 = 1 host, /24 = 256, 10.0.0.0/8 = milhões | MANTIDO | securityExample (16.777.216), q5-5-4 |
| 31 | Admin via bastion /32 + MFA/VPN/PAM; DMZ /28 + WAF; SG sem 0.0.0.0/0; VPN com plano global | MANTIDO | securityExample (tabela) |
| 32 | IP privado não é sinônimo de seguro | MANTIDO | security.badPractices, securityExample |
| 33 | Exceções /32 com dono e validade | MANTIDO | security, commentedSolution, problem |
| 34 | Riscos: CIDR amplo, rede plana, sobreposição/NAT, regras órfãs, IPAM sem rastreio | MANTIDO | security.vulnerabilities (os dois últimos fundidos em "Regras /32 órfãs" e "Sobreposição") |
| 35 | Mitigações: segmentação, firewall por função, NAC, IPAM, IaC, logs, expiração, bastion/PAM | MANTIDO | security (vulns/hardening/monitoring), securityExample |
| 36 | SIEM como mitigação | REMOVIDO | genérico, sem relação específica com prefixos |
| 37 | Sintomas de troubleshooting (DHCP, firewall, cloud, VPN, rota /32) | MANTIDO | troubleshooting.symptoms e decisionTree |
| 38 | Comandos ipconfig/route print, ip addr/ip route, show running-config, ipcalc, terraform plan | MANTIDO | troubleshooting.commands (Cisco corrigido; `show ip interface brief` citado no purpose) |
| 39 | Evidências a coletar (CIDR, máscara, hosts, reservas, gateway, DHCP, regras, rotas, sobreposição) | MANTIDO | troubleshooting.diagnosticQuestions |
| 40 | Desafio da empresa pequena e solução | MANTIDO | challenge, commentedSolution |
| 41 | Glossário (/24, /30, /31, /32, allowlist, menor privilégio) | MANTIDO | glossary (+IPAM) |
| 42 | Referências RFC 4632, RFC 3021, Cisco | MANTIDO | references |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Reconhecer rapidamente os prefixos de /24 a /32 | concept (tabela), summary, diagram, flashcards, ex5-5-1 |
| Relacionar prefixo com máscara, totais e hosts úteis | concept, internals, ex5-5-1, q5-5-1/2/3 |
| Explicar quando usar /24 … /32 | concept (uso típico), enterpriseExample, architecture, q5-5-5, q5-5-7, ex5-5-2 |
| Diferenciar prefixos para LAN, VLAN, DMZ, Wi-Fi, ponto a ponto, loopback e rota | concept, enterpriseExample, internals, challenge |
| Exceções de /31 e /32 sem confundir com redes de usuários | internals, problem (linha /32), q5-5-8, mentor 2 e 3, ex5-5-4 |
| Menor privilégio em firewall, VPN, cloud e allowlists | securityExample, security, devsecopsExample, ex5-5-5, mentor 4, q5-5-4 |
| Evitar /16 por preguiça, /24 para tudo, /30 em cloud, /32 sem documentação | problem (tabela), cloudExample (mínimo /28 AWS, /29 Azure), security, commentedSolution |

## 10. O que mudou na nova versão
- history e evolution fundidos em 2 frases no início de problem; callouts repetidos de motivation e problem removidos.
- Tabelas de concept e internals fundidas numa só; internals ficou com o mecanismo (divisão ao meio, fórmula) e as exceções /31 e /32.
- architecture: tabela redundante trocada pelo procedimento "Como escolher um prefixo" (vindo de packetFlow e deepDive, que eram invisíveis).
- cloudExample com números verificáveis (5 IPs reservados por subnet na AWS e no Azure; /28 → 11 IPs; mínimo /28 e /29) para cobrir o learning outcome de cloud e o objetivo "/30 em cloud".
- security reescrito: placeholders e frases-padrão trocados por riscos específicos com números; mitigações realinhadas (estavam coladas por índice); hardening deixou de duplicar a lista de mitigações.
- troubleshooting: perguntas e árvore de decisão do tema (a árvore de DNS saiu); comandos com observação esperada e interpretação; comando Cisco corrigido (o IOS não aceita `&&`, e o `brief` não mostra máscara).
- Campos que o app não exibia passaram a aparecer: respostas do mentor (`expectedIdeas`), entregáveis e rubrica do desafio, raciocínio da solução.
- Quiz 6 → 8 (distratores melhores; novas q5-5-7 e q5-5-8); flashcards 6 → 8 sem repetir o quiz; mentor 3 → 4; exercícios com respostas calculadas, ritual removido, novos ex5-5-5 (firewall) e ex5-5-6 (cloud).
- Removidos: labIntro, exercisesIntro, challengeIntro, solutionIntro, protocolFields, packetFlow, deepDive, commonMistakes, security.mitigations, troubleshooting.method/evidenceToCollect.
- duration 100-140 → 75-110 min; estimatedStudyTimeMinutes 140 → 110.

## 11. Depois
Palavras visíveis: 3096 → 3642 (+18%) · Duração: 100-140 min → 75-110 min (T 84,7 → 89,6 min) · Quiz corrigido: sim (8 questões; 6 com `answer` textual convertido para índice)

Por que o total visível subiu: o conteúdo de `content` caiu de 1671 para 1472 palavras (−12%), e os cortes brutos por campo foram 364 palavras (12%). Esse número fica abaixo da linguiça estimada porque em security e troubleshooting a troca foi dentro do mesmo campo (placeholders → texto específico). Os acréscimos (~910) vêm de: conteúdo antes invisível que agora aparece (mentor, desafio, raciocínio da solução, procedimento de escolha: ~300), observação e interpretação dos comandos, que o app exibia vazias (~150), e itens de prática novos (2 questões, 2 flashcards, 1 pergunta do mentor, respostas de exercícios com valores: ~400). T sobe 4,9 min só pelos itens de prática novos (quiz +2, flashcards +1, mentor +2); a teoria ficou estável (16,7 → 16,6 min).

`validar`: ok, sem erros nem avisos.

## 12. Revisão humana
- Fatos de cloud acrescentados (conferir): AWS e Azure reservam 5 endereços por subnet (os quatro primeiros e o último); subnet mínima /28 na AWS e /29 no Azure.
- Referência genérica "Documentação de VPC/VNet do provedor" foi especificada como "Amazon VPC User Guide e Azure Virtual Network FAQ" (sem URL, como no original): conferir títulos.
- Correção técnica: comando Cisco original `show ip interface brief && show running-config | include ip address` dividido; o IOS não aceita `&&`, e só o segundo comando mostra a máscara.
- `progressRules.markCompleteWhen` contém "labReviewed", mas a aula não tem lab. Ficou inalterado (o `validar` exige `progressRules` inalterado); avaliar no nível do módulo.
- q5-5-1, q5-5-2 e q5-5-3 continuam com a resposta no índice 2: as opções não foram reordenadas, para não descasar o progresso já salvo (`chosen` é um índice).

```json
{
  "id": "5.5", "modulo": "m05", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Prefixos comuns na prática: /24 a /32",
  "duracao_declarada": "100-140 min", "T_original_min": 84.7, "duracao_nova": "75-110 min", "T_nova_min": 89.6, "duracao_nova_estimated_max": 110, "veredito_duracao": "INFLADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 20, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 13, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 3096, "palavras_visiveis_depois": 3642,
  "palavras_invisiveis_antes": 598, "palavras_invisiveis_depois": 59,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "FUNDIR:problem",
    "concept": "ENXUGAR", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "MANTER", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "MANTER",
    "quiz": "ENXUGAR", "flashcards": "ENXUGAR", "mentorQuestions": "MANTER", "exercises": "ENXUGAR",
    "challenge": "MANTER", "commentedSolution": "MANTER", "glossary": "MANTER", "security": "FUNDIR:securityExample",
    "troubleshooting": "ENXUGAR", "references": "MANTER", "linksToOtherCourses": "MANTER", "networkContext": "MANTER",
    "protocolFields": "REMOVER", "packetFlow": "MOVER:architecture", "deepDive": "MOVER:architecture",
    "commonMistakes": "MOVER:problem", "security.mitigations": "MOVER:security.hardening",
    "troubleshooting.method": "MOVER:troubleshooting.decisionTree", "troubleshooting.evidenceToCollect": "MOVER:troubleshooting.diagnosticQuestions"
  },
  "quiz_corrigido": true, "quiz_questoes": 8, "objetivos_cobertos": true,
  "revisao_humana": [
    "Conferir fatos de cloud acrescentados: 5 IPs reservados por subnet (AWS e Azure); subnet mínima /28 (AWS) e /29 (Azure)",
    "Conferir a referência de cloud especificada (Amazon VPC User Guide; Azure Virtual Network FAQ)",
    "Comando Cisco corrigido: IOS não aceita &&; dividido e show ip interface brief citado como sem máscara",
    "progressRules.markCompleteWhen tem labReviewed numa aula sem lab (mantido inalterado)",
    "q5-5-1..3 mantêm a resposta no índice 2 para não descasar o progresso salvo"
  ]
}
```
