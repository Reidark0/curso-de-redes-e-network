# Aula 3.7 — VLANs como segmentação de camada 2
Tipo: fundamental · Duração declarada: 90-125 min · Palavras visíveis / invisíveis (antes): 4248 / 676

## 1. Duração
T pela fórmula = 125,1 min (teoria 16,8, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 46,3)
Veredito: ORGANIZADA. M = 107,5 está entre 0,8×T e 1,2×T. A divisão faz sentido para uma aula fundamental com lab: 16% de leitura e o resto em prática. Um problema: `lab.estimatedTimeMinutes` = 125 não é plausível para 8 passos (a alternativa de 5 min/passo + leitura dá 46,3) e, sozinho, já ocupa toda a duração declarada. Na nova versão ele passa a 45.

## 2. Encheção de linguiça
Nível: MÉDIA (~16%, cerca de 700 das 4248 palavras visíveis). Evidências:
- `history`: "Com o tempo, VLANs se tornaram base de redes corporativas, telefonia IP, Wi-Fi empresarial…" e "Conforme empresas cresceram, surgiu a necessidade…". Isso é história que não explica o mecanismo. O único ponto útil (antes, a separação era física; o 802.1Q trouxe a tag) cabe em 2 frases.
- `evolution`: "A segmentação de LAN evoluiu de separação física para separação lógica…", uma frase de moldura antes da tabela.
- `motivation` × `problem`: o callout "sem VLANs, ARP, broadcast e descoberta local podem atravessar toda a LAN" repete o primeiro parágrafo de `problem` ("qualquer broadcast de ARP, DHCP ou descoberta local alcança todos os hosts").
- `securityExample`: a tabela de riscos repete `security.vulnerabilities` e `badPractices` (trunk indevido, rede plana, sem política inter-VLAN). Só a linha da native VLAN é nova.
- `devsecopsExample`: "a lição é documentar segmentação como arquitetura: quem fala com quem…" é genérico. Só o exemplo do runner na VLAN errada é específico.
- Sobreposição entre atividades: `mentorQuestions[1]` ("host recebeu IP da sub-rede de servidores…") é o mesmo cenário de `exercises[2]` (Fa0/5 com 192.168.20.50). `mentorQuestions[2]` e `exercises[1]` são versões menores do `challenge`, assim como `lab.challenge`/`lab.solution`. Os flashcards fc3.7.1, fc3.7.2 e fc3.7.5 copiam q3.7.1, q3.7.4 e q3.7.5. Das 4 `lab.questions`, duas repetem o quiz.
- `quiz` q3.7.6 (cloud) tem distratores absurdos ("Tema escuro do console", "Apenas tamanho do disco"), e outras questões também ("Aumentar a potência do sinal físico", "VLAN só existe em Wi-Fi doméstico").
- `security`: `goodPractices` "Restringir VLANs permitidas em trunks" = `hardening` "Restringir allowed VLANs em trunks". `monitoring` "Criação ou alteração de trunks" ≈ `detectionIdeas` "Alertar quando uma porta access vira trunk".
- Campos invisíveis com conteúdo (seção 2): `protocolFields`, `packetFlow`, `deepDive` e `commonMistakes` (526 palavras), além dos 4 `*Intro`.

## 3. Conteúdo útil
PARCIAL. O que tem de realmente valioso: a definição correta de VLAN como domínio de broadcast, a distinção entre porta access e trunk, o roteamento inter-VLAN como ponto de política, os comandos IOS (`show vlan brief`, `show interfaces trunk`, `show mac address-table vlan 10`), a árvore de decisão de troubleshooting, um lab com comandos reais e um desafio com rubrica.
Lacunas:
- os detalhes da tag 802.1Q (4 bytes, VLAN ID de 12 bits) e a definição de native VLAN existiam só em `protocolFields`, invisível. O objetivo 3 ficava sem cobertura visível;
- o objetivo 2 (diferenciar VLAN, sub-rede, firewall, rota e domínio de broadcast) não tinha nenhum lugar que comparasse os cinco conceitos;
- a regra "native VLAN igual nas duas pontas" aparecia sem o porquê.

Erros técnicos:
- o diagrama desenhava setas animadas da VLAN 10 atravessando o switch direto até a VLAN 20, e o enlace até o gateway marcado como `svg-flow--blocked`. Isso sugere exatamente o contrário do que a aula ensina;
- no lab, o passo 7 pede "ping host-da-mesma-vlan", mas o passo 4 só põe uma porta na VLAN 10, e nenhum passo configura o IP dos hosts.

## 4. Aproveitamento
BOM (~87%). Medido contra T original = 125,1 min. O tempo que não ensina os objetivos soma cerca de 16 min: ~3 min de prosa de história, evolução e exemplos genéricos, 1 questão trivial, 1 exercício e 2 perguntas de mentor duplicadas (~10 min), 3 flashcards copiados do quiz e o desafio duplicado dentro do lab. Contra a duração declarada (M = 107,5) a proporção é parecida.

## 5. Pode ser mais curta?
NÃO. Redução prevista e obtida: ~5% (T de 125,1 para 119,2). O tempo vem quase todo da prática (lab 45, desafio 20, exercícios), que exercita os objetivos. Cortei o exercício duplicado e a prosa redundante, mas o conteúdo movido dos campos invisíveis (obrigatório) devolve parte do tempo de leitura.

## 6. Explicação mais direta
SIM.
- `concept`: a definição foi para o início (definition-box), e uma tabela VLAN × domínio de broadcast × sub-rede × rota × firewall substitui a prosa espalhada.
- `internals`: os tamanhos e a função da tag e da native VLAN ficam numa tabela curta. O caminho do frame passa de 6 para 5 passos, com os pontos de falha.
- `motivation` e `problem` deixam de repetir a mesma ideia. `history` e `evolution` viram 2 frases e uma tabela dentro de `problem`.
- `summary` abre com o modelo mental.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Cenário real mantido; callout redundante com `problem` removido. |
| history | FUNDIR:problem | Só "antes era físico; 802.1Q trouxe a tag" explica o porquê; o resto é cronologia. |
| problem | MANTER (enxugada) | Os 5 bullets viram uma frase; recebe a história e a tabela de abordagens. |
| evolution | FUNDIR:problem | A tabela rede plana/física/VLAN/VRF fica em `problem`, sem a frase de moldura. |
| concept | ENXUGAR + recebe conteúdo | Definição primeiro; tabela comparativa (objetivo 2); callout com o erro "VLAN é firewall" e as limitações do deepDive. |
| internals | MANTER + MOVER protocolFields/packetFlow | Access × trunk; tabela da tag 802.1Q, VLAN ID e native VLAN; caminho do frame com as falhas típicas. |
| architecture | ENXUGAR + recebe deepDive | Funções, componentes, pontos de falha; custo/operação e quando não usar (deepDive). "Dependências" removido (está em networkContext/prerequisites). |
| analogy | ENXUGAR | Boa analogia; o limite fica em 1 frase; incorpora o mentalModel. |
| simpleExample | MANTER | Concreto (Wi-Fi de convidados, VLAN 10/20). |
| enterpriseExample | MANTER | IDs concretos (10/20/30/40/50/99) e políticas. |
| cloudExample | FUNDIR (com devsecopsExample) | Uma seção: equivalentes em cloud + erro de VLAN que parece problema de cloud/pipeline (runner × registry). |
| devsecopsExample | FUNDIR:cloudExample | Só o exemplo do runner é específico; o resto é genérico. |
| securityExample | FUNDIR:security | Tabela duplicava `security`; a linha "native VLAN" virou vulnerabilidade em `security`. |
| diagram | MANTER (corrigido) | Enlaces access sem seta, rotulados (access 10/20); enlace switch–gateway rotulado "Trunk 802.1Q", bidirecional e não mais "blocked"; `<desc>` atualizado; ids `m03l07-` preservados. |
| labIntro | REMOVER | Invisível, moldura. |
| exercisesIntro | REMOVER | Invisível, moldura. |
| challengeIntro | REMOVER | Invisível, moldura. |
| solutionIntro | REMOVER | Invisível, moldura. |
| summary | MANTER (reescrito) | 5 bullets; 1º = deepDive.mentalModel; inclui access/trunk/native VLAN. |
| nextTheme | MANTER | 2 frases, coerentes com 3.8 (STP). |
| protocolFields | MOVER:internals | Tabela da tag, VLAN ID e native VLAN; "Access VLAN" no bullet da porta access; também em flashcards e glossário. |
| packetFlow | MOVER:internals | Passos com as falhas típicas (VLAN errada, tabela MAC por VLAN/MAC flapping, DHCP/relay, allowed list, any-any). |
| deepDive | MOVER:summary/concept/architecture | mentalModel → summary/analogy; limitations → callout do concept; whenNotToUse/operational/financialImpact → architecture; securityImpact já coberto em security. keyTerms = glossário. |
| commonMistakes | MOVER:concept/security | "VLAN é firewall" → callout; "VLAN ≠ sub-rede" → tabela do concept; "VLAN 1 para tudo" (com o porquê: padrão de fábrica) → security.badPractices; "trunks com todas as VLANs" já estava em security.badPractices. |
| networkContext | MANTER | Metadado. |
| security | ENXUGAR + FUNDIR securityExample | Duplicatas good/hardening e monitoring/detection fundidas; nova vulnerabilidade "Native VLAN mal planejada". |
| troubleshooting | MANTER | Comandos corretos; expectedObservation do IOS inclui a native VLAN; ramo "broadcast excessivo" vindo do lab. |
| lab | ENXUGAR + corrigir | estimatedTimeMinutes 125→45; safetyNotes 3→2; passo 4 com 2 portas na VLAN 10; passo 7 com IPs dos hosts e resultado esperado sem gateway; lab.challenge/solution removidos (duplicavam challenge/commentedSolution); questions 4→2; improvements 5→3; troubleshooting "broadcast excessivo" movido para o troubleshooting principal. |
| quiz | MANTER (6) + ajustar | Normalizado; q3.7.6 (cloud, trivial) trocada por q3.7.7 (classificação na porta access); distratores plausíveis em q1–q5; gabarito redistribuído. |
| flashcards | MANTER (6) + trocar 3 | fc1/fc2/fc5 copiavam o quiz → fc3.7.7 (tag/VLAN ID), fc3.7.8 (native VLAN), fc3.7.9 (VLAN × sub-rede). |
| mentorQuestions | MANTER (3) + trocar 2 | m2 duplicava ex3.7.3 → diagnóstico de VLAN que não atravessa o trunk; m3 duplicava o desafio → native VLAN diferente nas pontas. |
| exercises | REMOVER 1 (4→3) | ex3.7.2 (propor VLANs) está contido no desafio e no exemplo empresarial. |
| challenge | MANTER | Escopo, restrições e rubrica claros. |
| commentedSolution | MANTER | Raciocínio, passos e respostas erradas comuns bons. |
| glossary | MANTER + 1 termo | Termos usados; "Native VLAN" acrescentado (vinha de protocolFields/deepDive.keyTerms); longDefinition de "Domínio de broadcast" enxugada. |
| references | MANTER | IEEE 802.1Q-2022 e aulas internas. |
| linksToOtherCourses | MANTER | Pertinentes. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | VLAN = domínio de broadcast lógico na mesma infraestrutura física | MANTIDO | concept (definição), summary |
| 2 | Hosts em VLANs diferentes no mesmo switch ficam separados em L2 | MANTIDO | concept, simpleExample |
| 3 | Comunicação inter-VLAN exige roteador, switch L3 ou firewall | MANTIDO | concept, internals passo 5, glossário, flashcard fc3.7.6 |
| 4 | Política, ACL e logs entram no roteamento inter-VLAN | MANTIDO | concept (tabela + callout), internals passo 5 |
| 5 | VLAN não é firewall, não criptografa e não autentica | MANTIDO | concept callout, summary, quiz q1/q4 |
| 6 | Uma sub-rede e um gateway por VLAN (normalmente) | MANTIDO | concept tabela, flashcard fc3.7.9, lab passo 2 |
| 7 | Porta access: uma VLAN, host sem tag, switch classifica pela porta | MANTIDO | internals, quiz q3.7.7, flashcard fc3.7.3 |
| 8 | Porta trunk: várias VLANs com tag 802.1Q entre switches/roteadores/firewalls/hypervisors/APs | MANTIDO | internals, flashcard fc3.7.4, glossário |
| 9 | Tag 802.1Q = 4 bytes; carrega VLAN e prioridade | MANTIDO | internals tabela, fc3.7.7 |
| 10 | VLAN ID = 12 bits | MANTIDO | internals tabela, fc3.7.7 |
| 11 | Native VLAN = VLAN dos frames sem tag no trunk | MANTIDO | internals, glossário, fc3.7.8, mentor 3 |
| 12 | Native VLAN planejada, sem hosts sensíveis, igual nas duas pontas | MANTIDO | internals, security.vulnerabilities, mentor 3 |
| 13 | Portas de usuário não devem aceitar tag | MANTIDO | internals tabela |
| 14 | Tabela MAC aprendida por VLAN; MAC flapping/VLAN inconsistente | MANTIDO | internals passo 2 |
| 15 | Broadcast (ARP/DHCP) só nas portas da mesma VLAN; precisa de gateway/relay | MANTIDO | internals passo 3, exercício ex3.7.1 |
| 16 | VLAN fora da allowed list → isolamento parcial | MANTIDO | internals passo 4, lab.troubleshooting, mentor 2 |
| 17 | any-any entre VLANs anula a segmentação | MANTIDO | internals passo 5, security.vulnerabilities, commentedSolution |
| 18 | Abordagens: rede plana, física, VLAN, VRF/SDN/overlay | MANTIDO | problem (tabela) |
| 19 | Antes: separação física; 802.1Q permite várias VLANs no mesmo cabo | MANTIDO | problem |
| 20 | VLANs por função/risco (usuários, servidores, voz, convidados, gerência, IoT, câmeras, DMZ) | MANTIDO | architecture, enterpriseExample |
| 21 | Pontos de falha (VLAN errada, trunk, native, gateway, DHCP) | MANTIDO | architecture |
| 22 | Custo: switches gerenciáveis/L3, mais barato que switches separados | MANTIDO | architecture |
| 23 | VLAN errada parece falha de IP/DNS/cloud/VPN/pipeline | MANTIDO | architecture, cloudExample |
| 24 | Quando não usar VLAN (única barreira, sem dono, esconder IAM/inventário) | MANTIDO | architecture |
| 25 | Equivalentes em cloud: VPC/VNet, subnets, route tables, SG/NSG | MANTIDO | cloudExample (a questão q3.7.6 foi removida por ser trivial) |
| 26 | Runner na VLAN errada não alcança o registry | MANTIDO | cloudExample |
| 27 | VLAN 1 padrão de fábrica não deve ter tudo/hosts sensíveis | MANTIDO | security.badPractices, quiz q5 (distrator) |
| 28 | Restringir allowed VLANs em trunks | MANTIDO | security.hardening, quiz q5, lab passo 5 |
| 29 | Hardening: portas ociosas desabilitadas/VLAN de estacionamento, DHCP snooping, DAI, port security, 802.1X/NAC | MANTIDO | security.hardening |
| 30 | Detecção: access vira trunk, MAC/IP/VLAN × inventário, broadcast anormal, logs inter-VLAN | MANTIDO | security.monitoring/detectionIdeas |
| 31 | Comandos Windows/Linux/IOS e interpretação | MANTIDO | troubleshooting.commands |
| 32 | Árvore de decisão (IP errado, sem DHCP, mesma VLAN, VLANs diferentes) | MANTIDO | troubleshooting.decisionTree |
| 33 | Broadcast excessivo: loop, dispositivo ruidoso; STP/storm control | MANTIDO | troubleshooting.decisionTree (vindo do lab) |
| 34 | Comandos IOS de criação de VLAN, access, trunk allowed | MANTIDO | lab passos 3–5 |
| 35 | Wi-Fi de convidados doméstico como exemplo | MANTIDO | simpleExample |
| 36 | "Documentar segmentação como arquitetura" (devsecops) | REMOVIDO | duplicado em security.goodPractices ("Documentar VLAN ID, nome, sub-rede, gateway, dono") e no desafio |
| 37 | "Dependências: Ethernet, MAC, ARP…" (architecture) | REMOVIDO | duplicado em networkContext.dependsOn e prerequisites |
| 38 | História "VLANs viraram base de telefonia IP, Wi-Fi…" | REMOVIDO | cronologia sem mecanismo; os usos aparecem em architecture/enterpriseExample |
| 39 | Lab improvements "gerenciamento em VLAN própria" e "diagrama versionado" | REMOVIDO | duplicado em enterpriseExample/challenge (gerência restrita) e evidenceToCollect (diagrama) |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que VLANs existem e qual problema resolvem | motivation, problem (tabela de abordagens), summary |
| Diferenciar VLAN, sub-rede, firewall, rota e domínio de broadcast | concept (tabela comparativa + callout), quiz q1/q4, fc3.7.9 |
| Access, trunk, 802.1Q e native VLAN (conceitual) | internals (bullets, tabela da tag, native VLAN), diagram, quiz q2/q5/q3.7.7, fc3.7.3/4/7/8, mentor 2 e 3 |
| Planejar segmentação simples por função e risco | architecture, enterpriseExample, lab passos 1–5, challenge + commentedSolution |
| Troubleshooting e segurança defensiva com VLANs | troubleshooting, security, lab validação/troubleshooting, quiz q3, ex3.7.3/ex3.7.4, mentor 2 |

## 10. O que mudou na nova versão
- Removidos `history`, `evolution`, `devsecopsExample`, `securityExample` e os 4 `*Intro`. O que tinham de útil foi para `problem`, `cloudExample` e `security`.
- Movidos para campos visíveis: `protocolFields` e `packetFlow` (internals), `deepDive` (summary, analogy, concept, architecture) e `commonMistakes` (concept e security.badPractices). Os campos foram removidos.
- Diagrama corrigido: as setas da VLAN 10 atravessavam o switch direto até a VLAN 20 e o enlace até o gateway estava marcado como bloqueado. Agora os enlaces access aparecem sem seta e o enlace até o gateway é um trunk 802.1Q.
- Lab: `estimatedTimeMinutes` passou de 125 para 45 (8 passos, coerente com a alternativa de 46,3 min). O passo 4 ganhou uma 2ª porta na VLAN 10 (fa0/3), necessária para o ping dentro da mesma VLAN do passo 7. O passo 7 agora pede IP estático nos hosts e explica que, sem gateway, o ping entre VLANs falha (essa é a evidência de L2). O `lab.challenge`/`lab.solution` duplicado foi removido, e o ritual do lab enxugado.
- Quiz: normalizado. q3.7.6 foi substituída por q3.7.7. Os distratores de q1–q5 ficaram plausíveis e o gabarito foi redistribuído (`quiz_embaralhar`). Continuam 6 questões.
- Flashcards (6): 3 trocados porque copiavam o quiz. Mentor (3): 2 trocados porque duplicavam o exercício e o desafio. Exercícios: de 4 para 3 (ex3.7.2 estava contido no desafio).
- `duration` passou de 90-125 para 100-145 min e `estimatedStudyTimeMinutes` de 125 para 145, conforme a faixa recomendada da nova versão (T = 119,2). A faixa sobe porque a fórmula é fixa, mas o T caiu 4,7%.

Acréscimos novos (não movidos), com justificativa:
- **Tabela comparativa em `concept`** (VLAN × domínio de broadcast × sub-rede × rota × firewall): cobre o objetivo 2, que não tinha lugar onde os cinco conceitos fossem diferenciados. A maior parte das células reaproveita frases já existentes na aula.
- **"0 e 4095 são reservados: sobram 4.094 VLANs"**: consequência direta do VLAN ID de 12 bits (movido), dentro do objetivo 3. Ocupa meia frase.
- **Explicação de por que a native VLAN deve ser igual nas duas pontas** (exemplo 1 × 99): dá o mecanismo da regra "consistente entre pontas", que já estava em `protocolFields` (objetivo 3). É usada pelo mentor 3.
- **Lab, passo 4 (fa0/3) e passo 7 (IPs estáticos)**: sem eles, o passo 7 não era executável.
- **q3.7.7, fc3.7.7–9 e mentor 2/3**: substituem itens ruins ou duplicados, sem aumentar a quantidade. Todos cobrem o objetivo 3, que era o menos exercitado.
- **Vulnerabilidade "Native VLAN mal planejada" em `security`**: vem da linha de `securityExample` e de `protocolFields`. É conteúdo movido.
- **Glossário "Native VLAN"**: termo de `deepDive.keyTerms`/`protocolFields`, usado na aula.

Aviso do `validar` ("ids de quiz originais ausentes: q3.7.6"): é intencional. A questão trivial de cloud foi substituída por q3.7.7, com id novo, e o id antigo não foi reaproveitado.

## 11. Depois
Palavras visíveis: 4248 → 4704 (+10,7%; inclui ~490 palavras movidas de campos invisíveis e as melhorias de distratores/explicações do quiz; cortes brutos de 536 palavras, 13%) · Invisíveis: 676 → 35 (networkContext) · Duração: 90-125 min → 100-145 min (T 125,1 → 119,2) · Quiz corrigido: sim (6 questões)

## 12. Revisão humana
- Diagrama SVG corrigido: as setas sugeriam tráfego L2 direto entre a VLAN 10 e a VLAN 20, e o enlace até o gateway estava como "blocked". Confira o resultado visual (rótulos "access 10/20" e "Trunk 802.1Q (tags 10 e 20)").
- O lab não configura o gateway inter-VLAN (router-on-a-stick ou SVI). Ajustei os passos 7 e a validação para tratar a falha do ping entre VLANs como evidência esperada. Decida se a configuração do gateway deve entrar aqui ou ficar para a aula de roteamento inter-VLAN (o glossário aponta 4.1).
- No passo 5 do lab, se o aluno usar um switch L3 no Packet Tracer (ex.: 3560), talvez seja preciso `switchport trunk encapsulation dot1q` antes de `switchport mode trunk`. Não acrescentei porque não está no original.
- A native VLAN aparece como risco de "mistura de VLANs" e de "VLAN padrão com hosts". O risco clássico de VLAN hopping por double tagging não está na aula original e não foi acrescentado. Avalie se vale citá-lo.

```json
{
  "id": "3.7", "modulo": "m03", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "VLANs como segmentação de camada 2",
  "duracao_declarada": "90-125 min", "T_original_min": 125.1, "duracao_nova": "100-145 min", "veredito_duracao": "ORGANIZADA",
  "T_nova_min": 119.2, "duracao_nova_estimated_max": 145,
  "linguica_nivel": "MÉDIA", "linguica_pct": 16, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 5, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4248, "palavras_visiveis_depois": 4704,
  "palavras_invisiveis_antes": 676, "palavras_invisiveis_depois": 35,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "MANTER", "evolution": "FUNDIR:problem",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR",
    "devsecopsExample": "FUNDIR:cloudExample", "securityExample": "FUNDIR:security", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "MANTER", "nextTheme": "MANTER",
    "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals", "deepDive": "MOVER:summary/concept/architecture",
    "commonMistakes": "MOVER:concept/security", "networkContext": "MANTER",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Conferir visualmente o diagrama SVG corrigido (setas L2 diretas entre VLANs removidas; trunk até o gateway não é mais 'blocked').",
    "Lab não configura gateway inter-VLAN; decidir se entra aqui ou na aula de roteamento inter-VLAN.",
    "Switch L3 no Packet Tracer pode exigir 'switchport trunk encapsulation dot1q' no passo 5.",
    "Avaliar se o risco de VLAN hopping (double tagging) na native VLAN deve ser citado."
  ]
}
```
