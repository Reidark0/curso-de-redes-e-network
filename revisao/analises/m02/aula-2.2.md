# Aula 2.2 — Encapsulamento, desencapsulamento e PDUs
Tipo: fundamental · Duração declarada: 85-120 min · Palavras visíveis / invisíveis (antes): 4182 / 631

## 1. Duração
T pela fórmula = 84,5 min (teoria 22,5, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0 — não há lab; `labIntro` era o bloco padrão "Prática equivalente").
Veredito: **INFLADA** (por pouco). M = 102,5 > 1,2 × 84,5 = 101,4. A divisão teoria/prática (30%/70%) faz sentido para uma aula fundamental com desafio; o excesso vem da faixa declarada, não do desequilíbrio. Faixa recomendada original: 70-100 min.

## 2. Encheção de linguiça
Nível: **MÉDIA (~18%)**, coerente com os cortes brutos do `comparar` (705 palavras, 17%). Evidências:
- `history`: "Redes modernas não nasceram como uma única camada mágica", "A história prática do encapsulamento é a história da interoperabilidade"; o único conteúdo útil (switch/roteador não precisam entender a aplicação) repete `internals`.
- `evolution`: tabela de "fases" genérica ("Comunicação local simples… Pouca escala") que não explica o mecanismo; o que vale (túneis aumentam overhead, cloud menos visível) já está em outras seções.
- `motivation`: meta-texto de abertura ("Na aula anterior, você viu…", "Agora vem a pergunta prática").
- `internals`: introdução ritual ("Antes de qualquer conteúdo aparecer, várias decisões acontecem… vamos simplificar"); o passo 6 repete a lista de `architecture`.
- `architecture`: "Esse detalhe será muito importante quando estudarmos Ethernet, ARP, IPv4…".
- `analogy`: limite longo ("o processo é extremamente rápido, automatizado e pode envolver validações, checksums…").
- `devsecopsExample`: "Um runner pode falhar… porque DNS, proxy, TLS, rota, firewall ou MTU estão falhando" (genérico).
- Sobreposição `securityExample` (tabela de 4 riscos) × `security.vulnerabilities` (3 dos mesmos riscos) × `deepDive.securityImpact`.
- `commonMistakes` (invisível) repetia `security.commonErrors` em 2 de 4 itens.
- Quiz/flashcards/exercícios: `fc2.2.6` copia `q2.2.5`; `ex2.2.4` repete `q2.2.4` e a vulnerabilidade "Exposição de dados em captura"; `q2.2.6` é decoreba com distratores absurdos (whoami, mkdir).
- Frase repetida do curso: "Esta aula não possui laboratório independente…" (39 aulas), em `labIntro` (invisível).

## 3. Conteúdo útil
**PARCIAL.** Valioso: tabela camada × PDU × campos, fluxo de encapsulamento passo a passo, roteador refazendo o quadro a cada salto, MAC de destino = gateway, porta liberada ≠ aplicação segura, TLS não esconde metadados, PCAP como evidência sensível, árvore de decisão de troubleshooting e o desafio da VPN.
Lacunas (objetivos 3, 4 e 6 e learningOutcomes 2 e 3): MTU, MSS, PMTUD e MSS clamping são citados na motivação, no mentor, no desafio e na solução, mas nunca explicados; não há nenhum número de overhead (só "MTU 1500" no glossário); trailer só aparece como "FCS" na tabela; não há leitura de captura (o que o Wireshark mostra em cada camada), embora o objetivo 4 e o learningOutcome 2 a peçam; o aviso sobre offloading estava só no `deepDive`, invisível.
Erros técnicos: nenhum relevante. Imprecisão menor: `simpleExample` dizia "o Ethernet usa…" num cenário que pode ser Wi-Fi (802.11); corrigido.

## 4. Aproveitamento
**BOM** (~85%). Contra o T original (84,5 min), o tempo que não ensina é ~13 min: ~5,4 min de linguiça na teoria, ~6 min do exercício duplicado (`ex2.2.4`), ~1 min da questão trivial e ~0,5 min do flashcard duplicado. Contra a duração declarada (M = 102,5), o aproveitamento cai para ~70% (MÉDIO), porque a faixa estava inflada.

## 5. Pode ser mais curta?
**SIM** — redução prevista de 17% na duração (ponto médio 102,5 → 85 min). Pelo T da fórmula, cortar só a linguiça reduziria ~8%; esse tempo foi reinvestido nas lacunas dos objetivos (MTU/MSS/PMTUD e leitura de captura), e o T ficou estável (84,5 → 83,5).

## 6. Explicação mais direta
**SIM.**
- `motivation`: definição de encapsulamento/desencapsulamento já no primeiro parágrafo, sem a ponte "Na aula anterior…".
- `internals`: passos sem introdução ritual; o passo 6 (equipamentos) virou 1 frase, e o detalhe foi para a tabela de `architecture`.
- `architecture`: a lista de 6 itens virou uma tabela componente × o que examina × o que decide, com a consequência explícita: "os MACs mudam a cada salto, e os IPs seguem iguais (salvo NAT)".
- `simpleExample`: valores concretos (192.168.1.20 → 203.0.113.10, porta 51514 → 443, MAC do gateway 192.168.1.1).
- `analogy`: dois parágrafos em um; limite da analogia em 1 frase que ensina (o roteador troca a "caixa" a cada salto).
- `securityExample`: tabela de riscos (duplicada no bloco `security`) reduzida a um parágrafo que diz em qual envelope cada controle atua.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Meta-texto cortado; definição e problema real (VPN) mantidos. |
| history | REMOVER | Genérica; a lista de encapsulamentos extras (VLAN, PPPoE, GRE, IPsec, VXLAN, WireGuard, service mesh) foi para `architecture`/`internals`/`cloudExample`; "switch/roteador não precisam entender a aplicação" já estava em `internals`. |
| problem | ENXUGAR | Lista "sem transporte/rede/enlace/física" mantida (cobre o objetivo 3); parágrafo de falhas condensado. |
| evolution | REMOVER | Tabela de fases genérica; "túneis aumentam overhead" e "cloud menos visível" cobertos em `internals` e `cloudExample`. |
| concept | MANTER + MOVER | Mantida a tabela de PDUs; acrescentados trailer/FCS, a nota segmento (TCP) × datagrama (UDP) (de `deepDive.limitations`) e o callout "Erros comuns" (de `commonMistakes`). |
| internals | ENXUGAR + acréscimo | Passos mantidos; acrescentadas as subseções "MTU e MSS" e "O que você vê numa captura" (lacuna dos objetivos 4 e 6; offloading movido do `deepDive`). |
| architecture | ENXUGAR | A lista virou uma tabela; acrescentados TTL, MAC × IP por salto e tags/túneis; frase de meta-texto removida. |
| analogy | ENXUGAR | Um parágrafo; limite em 1 frase. |
| simpleExample | MANTER | Valores concretos acrescentados; corrigido Ethernet × 802.11. |
| enterpriseExample | ENXUGAR | Um parágrafo com os três contrastes (firewall × WAF, switch × VLAN, rota × MTU). |
| cloudExample | FUNDIR (com devsecopsExample) | Cloud + Kubernetes num só exemplo; acrescentado "a MTU dos pods precisa descontar o overlay". |
| devsecopsExample | FUNDIR:cloudExample | O caminho do pacote no Kubernetes foi para `cloudExample`; a frase do runner, genérica, foi removida. |
| securityExample | ENXUGAR | A tabela duplicava `security.vulnerabilities`; ficou um parágrafo sobre o envelope de cada controle e os metadados fora do TLS. |
| diagram | MANTER | SVG correto e legível; só o `<h2>` perdeu a numeração. |
| labIntro | REMOVER | Invisível; bloco padrão "Prática equivalente". |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | MANTER + MOVER | 5 bullets; o primeiro é o `deepDive.mentalModel`; MTU/PMTUD incluídos. |
| nextTheme | ENXUGAR | 1 frase coerente com a 2.3. |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER → REMOVER | mentalModel → summary; limitations → concept (nome da PDU), architecture (multicamada), internals (offloading), cloudExample (overlay invisível); whenNotToUse "tráfego no host ≠ fio" → internals; financialImpact "comprar banda" já em `commentedSolution.commonWrongAnswers`; o restante era genérico ou duplicava `security`. |
| commonMistakes | MOVER:concept | Callout "Erros comuns" (pacote genérico, MAC do gateway, criptografia × encapsulamento); "Ignorar overhead de VPN" já está em `security.commonErrors` e na árvore de decisão. |
| troubleshooting | MANTER + ajuste | Acrescentados `ping -f -l 1472` (Windows) e `ping -M do -s 1472` (Linux), com a conta; rótulos preenchidos; a MTU entrou no Cisco. |
| security | ENXUGAR | Itens genéricos removidos ("Aplicar controles em múltiplas camadas", "Reduzir superfícies expostas", "menor privilégio", "Ignorar logs"); o MAC foi para concept; o ICMP ganhou a ligação com o PMTUD. |
| lab | — | Não existe (a aula usa exercícios e desafio; `progressRules` aceita `exerciseDone`/`practicalExerciseDone`). |
| quiz | MANTER + trocar 1 | 6 questões; distratores de q1/q2/q3/q5 refeitos para ficarem plausíveis; `q2.2.6` (decoreba) trocada por `q2.2.7` (PMTUD); gabarito redistribuído. |
| flashcards | MANTER + trocar 1 | 6; `fc2.2.6` (cópia de q2.2.5) trocado por `fc2.2.7` (MSS = 1460). |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, boas. |
| exercises | MANTER + trocar 1 | 4; `ex2.2.1` reescrito (encapsulamento HTTPS completo, learningOutcome 1); `ex2.2.4` (repetia q2.2.4) trocado por `ex2.2.5` (cálculo de MTU em VXLAN). |
| challenge | MANTER | Cenário, restrições e rubrica bons. |
| commentedSolution | MANTER + ajuste | Passos com ping com DF, ICMP descartado e rollback. |
| glossary | ENXUGAR | 6 termos, todos usados; longDefinitions redundantes encurtadas; a MTU ganhou a relação com MSS e o exemplo GRE. |
| references | MANTER + 1 | RFC 791 identificada (url e nota); acrescentada a RFC 1191 (PMTUD). |
| linksToOtherCourses | MANTER | Reais. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Definição de encapsulamento | MANTIDO | motivation, concept, glossary, q2.2.1 |
| 2 | Definição de desencapsulamento (inverso, no destino) | MANTIDO | motivation, concept, internals passo 6, glossary |
| 3 | PDU = unidade de dados de uma camada | MANTIDO | concept (definition-box), glossary, fc2.2.1 |
| 4 | Dados / segmento ou datagrama / pacote / quadro / bits por camada | MANTIDO | concept (tabela), summary, ex2.2.2, q2.2.2 |
| 5 | Segmento para TCP, datagrama para UDP; o nome varia na literatura | MANTIDO (movido) | concept (de deepDive.limitations) |
| 6 | Cabeçalhos e trailers; FCS como trailer | MANTIDO (ampliado) | concept |
| 7 | Campos por camada: portas/estado/checksum; IP/TTL/protocolo; MAC/EtherType/FCS | MANTIDO | concept (tabela), internals |
| 8 | Por que cada camada é necessária (sem transporte/rede/enlace/física) | MANTIDO | problem |
| 9 | Fluxo passo a passo do encapsulamento até o sinal físico | MANTIDO | internals |
| 10 | Equipamentos leem só parte do envelope (roteador não entende HTML; switch não entende IP) | MANTIDO | internals, architecture |
| 11 | Roteador remove o quadro e cria um novo a cada enlace | MANTIDO | architecture, analogy (limite) |
| 12 | MAC de destino = gateway para destinos fora da LAN | MANTIDO | concept (erros comuns), simpleExample, q2.2.5 |
| 13 | Firewall L4 avalia porta/estado sem entender a aplicação; WAF na camada 7 | MANTIDO | architecture, securityExample, enterpriseExample, security, ex2.2.3 |
| 14 | VPN/overlay encapsula um pacote dentro de outro | MANTIDO | architecture, internals, glossary (túnel) |
| 15 | Encapsulamentos extras: VLAN, PPPoE, GRE, IPsec, VXLAN, WireGuard, service mesh | MANTIDO (movido de history) | architecture (tabela), internals, cloudExample |
| 16 | TLS, HTTP/2 e HTTP/3 como camadas extras | REMOVIDO | Era só uma lista de nomes em history; o TLS segue em securityExample e na captura; HTTP/2 e HTTP/3 estão fora do escopo da aula |
| 17 | Overhead de túnel reduz a MTU efetiva | MANTIDO | internals, summary, q2.2.3, fc2.2.4 |
| 18 | MTU, MSS, fragmentação, PMTUD, ICMP bloqueado | MANTIDO (agora explicado) | internals, troubleshooting, q2.2.7 |
| 19 | MSS clamping como mitigação | MANTIDO | internals, commentedSolution, mentor |
| 20 | Cloud: interface virtual, subnet, route tables, SG/NSG, NAT GW, LB, private endpoint | MANTIDO | cloudExample |
| 21 | Overlays de cloud invisíveis ao cliente; flow logs e packet capture de VPC/VNet | MANTIDO | cloudExample, architecture |
| 22 | Caminho do pacote no Kubernetes (Pod, bridge, CNI, overlay, Service, kube-proxy, ingress) | MANTIDO (movido de devsecops) | cloudExample |
| 23 | Service mesh/mTLS mudam transporte e observação | MANTIDO | cloudExample, architecture |
| 24 | Runner de pipeline falhando por DNS/proxy/TLS/MTU | REMOVIDO | Exemplo genérico, sem mecanismo específico do tema |
| 25 | NetworkPolicy e proxies laterais | REMOVIDO | Fora do escopo desta aula (só citados); o service mesh cobre a ideia |
| 26 | Porta liberada ≠ aplicação segura | MANTIDO | securityExample, security, mentor 3, ex2.2.3 |
| 27 | TLS protege o conteúdo, não os metadados (IP, porta, tamanho, tempo) | MANTIDO | securityExample, summary, fc2.2.5 |
| 28 | VPN pode carregar tráfego indevido / contornar controles | MANTIDO | securityExample, security.vulnerabilities |
| 29 | PCAP é evidência sensível; sanitizar | MANTIDO | security, q2.2.4, challenge |
| 30 | Offloading confunde checksums e tamanhos na captura | MANTIDO (movido de deepDive) | internals ("O que você vê numa captura") |
| 31 | Comandos Windows/Linux/Cisco (ping, tracert, Test-NetConnection, netsh, ip link, ip route, tracepath, curl, show …) | MANTIDO | troubleshooting |
| 32 | `ip link` mostra a MTU | MANTIDO | troubleshooting Linux (a questão q2.2.6 foi removida por ser trivial) |
| 33 | Árvore de decisão (pequenos × grandes, ping × porta, porta × aplicação, ARP sem resposta) | MANTIDO | troubleshooting.decisionTree |
| 34 | Bloquear ICMP indiscriminadamente quebra diagnósticos | MANTIDO | security.badPractices (agora ligado ao PMTUD) |
| 35 | Hipóteses por camada quando um site não abre | MANTIDO | simpleExample |
| 36 | Exemplo empresarial: firewall × WAF, switch × VLAN, rota × MTU de VPN | MANTIDO | enterpriseExample |
| 37 | Aumentar a banda não resolve problema de MTU (impacto financeiro) | MANTIDO | commentedSolution.commonWrongAnswers |
| 38 | Custos de cloud (NAT, appliances, tráfego entre zonas); CPU de túneis | REMOVIDO | Era de deepDive.financialImpact, invisível e genérico; fora dos objetivos |
| 39 | Tabela de evolução histórica (meio compartilhado → IP → portas → túneis → SDN) | REMOVIDO | História genérica; os conceitos estão em problem (por que cada camada existe) e em internals |
| 40 | Desafio da VPN com rubrica de 100 pontos | MANTIDO | challenge |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar o que é encapsulamento e desencapsulamento | motivation, concept, internals, diagram, summary, q2.2.1, ex2.2.1, glossary |
| Diferenciar dados, segmento, datagrama, pacote, quadro e bits | concept (tabela + definição), summary, q2.2.2, fc2.2.2/3, ex2.2.2 |
| Entender por que cada camada adiciona cabeçalhos, trailers ou metadados | problem (lista), concept (cabeçalho/trailer/FCS), mentor 1 |
| Relacionar PDUs com Wireshark, tcpdump, firewalls, roteadores e switches | architecture (tabela), internals ("O que você vê numa captura"), q2.2.5 |
| Explicar como VPNs, overlays e cloud adicionam encapsulamentos extras | internals (GRE/VXLAN), architecture, cloudExample, ex2.2.5 |
| Identificar riscos de segurança e troubleshooting ligados a MTU, overhead e captura | internals (MTU/MSS/PMTUD), troubleshooting (ping com DF), security, q2.2.3/q2.2.7/q2.2.4, challenge |

## 10. O que mudou na nova versão
**Conteúdo movido de campos invisíveis (obrigatório):**
- `deepDive.mentalModel` → primeiro bullet do summary; `limitations` → concept, architecture, internals (offloading) e cloudExample; `whenNotToUse` ("tráfego no host ≠ fio") → internals.
- `commonMistakes` → callout "Erros comuns" no concept.
- `labIntro`, `exercisesIntro`, `challengeIntro` e `solutionIntro` removidos.

**Cortes:** history, evolution e devsecopsExample (fundido com cloudExample); meta-texto em motivation, internals e architecture; a tabela de riscos de securityExample (duplicava `security`); itens genéricos de `security`; longDefinitions redundantes no glossário.

**Acréscimos novos (não movidos), com justificativa:**
- `internals` → "Quanto cada envelope ocupa: MTU e MSS" (tabela de bytes, MSS 1460, GRE 24 → 1476, VXLAN 50 → 1450, DF/ICMP tipo 3 código 4, PMTUD, MSS clamping 1436), ~230 palavras. Cobre o objetivo 6 e o learningOutcome 3. A aula original já cobrava esses termos no mentor ("PMTUD", "MSS clamp"), no desafio e na solução, sem nunca explicá-los.
- `internals` → "O que você vê numa captura" (camadas do Wireshark, EtherType 0x0800, protocolo 6), ~70 palavras, mais o offloading movido. Cobre o objetivo 4 e o learningOutcome 2 ("Dado um print de captura…"), que nenhuma seção ensinava.
- `concept` → trailer/FCS em 1 frase. Cobre o objetivo 3 ("cabeçalhos, trailers"); antes o trailer só aparecia como sigla na tabela.
- `architecture` → TTL decrementado e "MACs mudam, IPs seguem (salvo NAT)". Explicita o learningOutcome 4 a partir do mecanismo que já estava na aula.
- `cloudExample` → "a MTU dos pods precisa descontar o overlay". Liga o objetivo 5 ao 6 em 1 frase.
- `troubleshooting` → `ping -f -l 1472` / `ping -M do -s 1472`. É o teste direto da hipótese de MTU que a árvore de decisão e o desafio pedem; não havia comando que testasse o tamanho.
- `references` → RFC 1191 (PMTUD), referência do conteúdo novo; a RFC 791 ganhou número e url.

**Itens de prática (quantidade mantida: 6 quiz, 6 flashcards, 3 mentor, 4 exercícios):**
- Quiz: `q2.2.6` (whoami/mkdir) → `q2.2.7` (PMTUD com ICMP bloqueado). Distratores de q2.2.1, q2.2.2, q2.2.3 e q2.2.5 refeitos com confusões reais (desencapsulamento × encapsulamento, DNS/credencial/porta quando páginas pequenas funcionam, switch como destino do quadro). Explicações ampliadas para dizer por que os distratores erram. Gabarito redistribuído com `quiz_embaralhar`.
- Flashcard: `fc2.2.6` (cópia do quiz) → `fc2.2.7` (MSS).
- Exercícios: `ex2.2.1` reescrito (fluxo HTTPS completo, learningOutcome 1); `ex2.2.4` (cópia do quiz q2.2.4) → `ex2.2.5` (MTU em VXLAN).
- `duration` 85-120 → 70-100 min e `estimatedStudyTimeMinutes` 120 → 100, pela faixa recomendada da nova versão.

## 11. Depois
Palavras visíveis: 4182 → 4375 (+4,6%; teoria visível 2928 → 2799, −4%; cortes brutos 705 e acréscimos brutos 898, com ~450 vindos de campos invisíveis e de explicações de quiz/exercícios) · Palavras invisíveis: 631 → 57 (só `networkContext`) · Duração: 85-120 min → 70-100 min (T 84,5 → 83,5) · Quiz corrigido: sim (6 questões; formato normalizado, 1 trocada, 4 com distratores refeitos).
Avisos do `validar`: "id de quiz original ausente: q2.2.6". É intencional: a questão era decoreba trivial e foi substituída por `q2.2.7` (id inédito, conforme 11.5).

## 12. Revisão humana
- O módulo m02 lista `lab-2.2` em `requiredLabs`, mas a aula não tem lab (nem no original); `progressRules` aceita `exerciseDone`/`practicalExerciseDone`. Nada foi alterado: confirmar se o módulo deve deixar de exigir `lab-2.2` ou se a aula precisa de um lab.
- Conferir os números técnicos acrescentados: cabeçalhos (Ethernet 14 + FCS 4, IPv4 20, IPv6 40, TCP 20, UDP 8), GRE +24 → 1476, VXLAN +50 → 1450, MSS clamp 1436, ICMP tipo 3 código 4, EtherType 0x0800, protocolo 6, `ping -f -l 1472` e `ping -M do -s 1472`.
- A questão `q2.2.6` foi removida: o progresso salvo de alunos nessa questão fica órfão.
- Na tabela de `architecture`, PPPoE aparece junto dos túneis ("encapsula tudo em outro pacote"). É uma simplificação: PPPoE encapsula PPP em quadros Ethernet.
- `glossary[].relatedLessons` e `flashcards[].tags/difficulty` (subcampos que o app não exibe) foram mantidos como estavam; o `validar` não os apontou.

```json
{
  "id": "2.2", "modulo": "m02", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Encapsulamento, desencapsulamento e PDUs",
  "duracao_declarada": "85-120 min", "T_original_min": 84.5, "duracao_nova": "70-100 min", "veredito_duracao": "INFLADA",
  "T_nova_min": 83.5, "duracao_nova_estimated_max": 100,
  "linguica_nivel": "MÉDIA", "linguica_pct": 18, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": true, "reducao_tempo_pct": 17, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4182, "palavras_visiveis_depois": 4375,
  "palavras_invisiveis_antes": 631, "palavras_invisiveis_depois": 57,
  "secoes": {
    "motivation": "ENXUGAR", "history": "REMOVER", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "MANTER", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "FUNDIR:devsecopsExample",
    "devsecopsExample": "FUNDIR:cloudExample", "securityExample": "ENXUGAR", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "MANTER", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary/concept/internals/architecture/cloudExample",
    "commonMistakes": "MOVER:concept", "troubleshooting": "MANTER", "security": "ENXUGAR",
    "quiz": "MANTER", "flashcards": "MANTER", "mentorQuestions": "MANTER", "exercises": "MANTER",
    "challenge": "MANTER", "commentedSolution": "MANTER", "glossary": "ENXUGAR",
    "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Módulo m02 exige lab-2.2 em requiredLabs, mas a aula não tem lab (nem no original)",
    "Conferir números técnicos novos: cabeçalhos, GRE 1476, VXLAN 1450, MSS 1460/1436, ICMP 3/4, ping -f -l 1472 / -M do -s 1472",
    "q2.2.6 removida (trivial): progresso salvo nessa questão fica órfão",
    "PPPoE listado junto de túneis na tabela de architecture (simplificação)",
    "Subcampos não exibidos glossary.relatedLessons e flashcards.tags/difficulty mantidos"
  ]
}
```
