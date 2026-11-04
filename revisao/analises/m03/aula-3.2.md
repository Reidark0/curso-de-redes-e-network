# Aula 3.2 — Frame Ethernet e endereço MAC
Tipo: fundamental · Duração declarada: 85-120 min · Palavras visíveis / invisíveis (antes): 4917 / 813

## 1. Duração
T pela fórmula = 137,9 min (teoria 20,9, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 55)
Veredito: SUBESTIMADA — M = 102,5 min é 0,74×T. A divisão teoria (17%) × prática faz sentido para uma aula fundamental com lab local, mas o lab declara 55 min para 7 passos curtos de comando (dois deles são a mesma tarefa em Windows e em Linux, e um é opcional), o que é generoso: ~40 min é coerente com os passos.

## 2. Encheção de linguiça
Nível: MÉDIA (~17%). Evidências:
- `motivation`, 2º parágrafo: meta-texto ("A aula anterior mostrou… Agora vamos abrir o envelope") e lista de 14 temas ("switch, tabela MAC, ARP, VLAN, flooding, broadcast, NAC…").
- `history`: o 1º parágrafo repete `problem` ("cada quadro precisa dizer quem é o remetente local…"); o 3º ("Máquinas virtuais têm MACs virtuais… cloud providers abstraem Camada 2") repete `architecture` e `cloudExample`.
- `evolution`: a frase de abertura é genérica ("adaptado ao longo do tempo para atender novas necessidades") e a tabela repete, campo a campo, a lista do `problem` (MAC de destino → encaminhamento; MAC de origem → aprendizado; EtherType; FCS).
- `architecture`, último parágrafo: "entender MAC e frame ajuda a compreender ENIs, interfaces virtuais, overlays…" (repete `cloudExample`).
- `devsecopsExample`: "Um engenheiro de plataforma que entende Camada 2 consegue dialogar melhor…" e "Infra as Code costuma configurar subnets, security groups…" (genérico). Só o caso do runner na VLAN errada é específico.
- `securityExample`: a tabela de riscos repete `security.vulnerabilities` (MAC spoofing, MAC flooding) e `security.hardening`; aviso de ética ("Esta aula não ensina exploração ofensiva").
- `lab`: `analysisTask` com a frase-padrão repetida em 56 aulas ("Produza o artefato indicado na instrução do passo…"); `lab.challenge`/`lab.solution` repetem o `challenge` e a `commentedSolution` da aula (o mesmo MAC desconhecido em VLAN administrativa); `lab.troubleshooting[0]` repete `validation[2].ifFails`; duas `lab.questions` repetem quiz e mentor.
- Sobreposição de prática: `ex3.2.4` (três evidências sobre MAC desconhecido) e `mentorQuestions[2]` (MAC desconhecido em sala pública) perguntam a mesma coisa que o `challenge`; `ex3.2.1` repete a lista do `problem` e o mentor 1; `q3.2.1` é definição decorada, idêntica ao flashcard 1; flashcards 4 e 5 copiam os quizzes 5 e 4.
- Conteúdo útil guardado em campos invisíveis: tamanhos dos campos (`protocolFields`), falhas por etapa (`packetFlow`), `commonMistakes` e `deepDive.mentalModel` (813 palavras invisíveis).

## 3. Conteúdo útil
PARCIAL. O que tem de realmente valioso: o fluxo host → ARP → NIC → switch → destino; MAC de destino = gateway quando o destino está fora da sub-rede; MAC como evidência, não identidade; os sinais operacionais do exemplo empresarial (MAC ausente, MAC alternando entre portas); comandos de Windows, Linux e Cisco com interpretação; desafio e solução comentada bem construídos.
Lacunas: (1) objetivo 4 (unicast, broadcast e multicast) mal coberto: multicast aparece só como "têm comportamentos diferentes e serão importantes", sem exemplo nem regra de identificação; o conceito cita os bits individual/grupo e universal/local sem dizer onde estão; (2) os tamanhos dos campos, o preâmbulo/SFD e os valores de EtherType estavam só em `protocolFields` (invisível), e o glossário tinha apenas 0x0800 e 0x0806; (3) nenhum exercício ou passo de lab pedia para ler os campos de um frame, embora o primeiro learningOutcome seja exatamente esse.
Erros técnicos: nenhum relevante.

## 4. Aproveitamento
MÉDIO (~76% contra o T original de 137,9 min). Tempo sem retorno: ~6 min de leitura de linguiça, ~15 min de sobra no lab (55 declarados para ~40 de trabalho real), ~13 min em itens de prática duplicados (q3.2.1, ex3.2.1, ex3.2.4 e o desafio repetido dentro do lab). Contra a duração declarada (M = 102,5), o desperdício pesa ainda mais (~33%), porque a declaração já estava abaixo do T.

## 5. Pode ser mais curta?
SIM — redução prevista: ~15% só com cortes; obtida: 11,5% (T 137,9 → 122,0), porque parte do tempo poupado foi usada para mover o conteúdo invisível e cobrir a lacuna do objetivo 4.

## 6. Explicação mais direta
SIM — (a) `history` + `evolution` + `problem` diziam três vezes "para que serve cada campo": ficou uma lista no `problem` e uma tabela única de campos (tamanho, função, o que observar) em `internals`; (b) a lista de 7 passos de `internals` virou uma tabela passo → o que acontece → o que pode falhar, absorvendo o `packetFlow`; (c) a frase vaga sobre "os primeiros bits" no `concept` virou uma tabela (OUI, bit I/G, bit U/L) e outra de tipos de destino com exemplos reais; (d) o exemplo empresarial passou a listar os três sinais em bullets.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantidos a linha do Wireshark e o callout do SOC; cortado o meta-texto e a lista de 14 temas. |
| history | REMOVER | Não explica o mecanismo; o que valia (Ethernet II, EtherType, 802.1Q) foi para a tabela de `internals`, e o 3º parágrafo repetia architecture/cloud. |
| problem | ENXUGAR | Lista "sem X, não há Y" mantida; abertura mais curta; limites do frame em uma frase. |
| evolution | FUNDIR:internals | A tabela elemento/função/limitação foi fundida à tabela de campos; "o frame carrega o pacote IP" foi para `concept`. |
| concept | MANTER + acréscimo | Definições mantidas; novas tabelas "Como ler um MAC" e "Unicast, broadcast e multicast" (objetivo 4). |
| internals | ENXUGAR + MOVER | Recebeu `protocolFields`, `packetFlow` e `commonMistakes`; o fluxo virou tabela. |
| architecture | ENXUGAR | Lista de componentes mantida; o parágrafo de cloud foi cortado (duplicava `cloudExample`). |
| analogy | ENXUGAR | Analogia mantida; limite em 1 frase. |
| simpleExample | MANTER | Concreto (192.168.1.1, arp -a); mais uma frase ligando ao acesso a site externo. |
| enterpriseExample | ENXUGAR | Mesmo caso; os três sinais viraram bullets. |
| cloudExample | FUNDIR:devsecopsExample | Mantido o caso de migração com dependência de broadcast; recebeu o caso do runner self-hosted na VLAN/bridge errada. |
| devsecopsExample | FUNDIR:cloudExample | Só o caso do runner era específico; o resto era genérico. |
| securityExample | FUNDIR:security | Rede plana e portas expostas viraram `security.vulnerabilities`; spoofing e flooding já estavam lá; aviso de ética removido. |
| diagram | MANTER | Correto e legível; só o número do `<h2>` saiu. |
| labIntro | REMOVER | Invisível, ritual. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | MANTER (reescrito) | 5 bullets; a primeira linha é o `deepDive.mentalModel`; inclui tamanhos e regra I/G. |
| nextTheme | MANTER | 2 frases, coerentes com 3.3. |
| protocolFields | MOVER:content.internals | Tabela de campos com tamanho e observação. |
| packetFlow | MOVER:content.internals | Coluna "O que pode falhar". |
| deepDive | MOVER:summary/internals/security | mentalModel → summary; limitations → internals (captura sem preâmbulo/FCS) e concept; securityImpact → security.vulnerabilities; operationalImpact → security.commonErrors; financialImpact removido (genérico). |
| commonMistakes | MOVER:content.internals | Callout "Erros comuns" (4 itens). |
| networkContext | MANTER | Metadado. |
| security | ENXUGAR + FUNDIR | Duplicatas entre goodPractices e hardening cortadas; duas vulnerabilidades vindas de securityExample. |
| troubleshooting | MANTER | Comandos corretos, com finalidade, esperado e interpretação; árvore de decisão útil. |
| lab | ENXUGAR | Passos 1 e 2 (Windows/Linux) fundidos; passo opcional de Wireshark para ler os campos (vinha de `improvements`); analysisTask ritual, lab.challenge/solution duplicados, troubleshooting[0] e 2 perguntas duplicadas removidos; estimatedTimeMinutes 55 → 40. |
| quiz | ENXUGAR/TROCAR | q3.2.1 (decoreba) → q3.2.7 (multicast); distratores implausíveis ("Erro de CORS", "HTTP status code") trocados; gabarito embaralhado. |
| flashcards | TROCAR | fc1, fc4 e fc5 (definição trivial e cópias do quiz) → fc7 (tamanhos), fc8 (valores de EtherType) e fc9 (bit U/L). |
| mentorQuestions | TROCAR 1 | O mentor 3 repetia o desafio; agora pede para raciocinar sobre um MAC alternando entre portas. |
| exercises | TROCAR 2 | ex1 (repetia problem/mentor) e ex4 (repetia o desafio) → ex5 (ler um frame) e ex6 (classificar MACs). |
| challenge | MANTER | Bom cenário e rubrica. |
| commentedSolution | MANTER | Coerente com o desafio. |
| glossary | MANTER | Os 6 termos são usados; OUI recebeu o tamanho (24 bits). |
| references | MANTER | Reais. |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Frame Ethernet = unidade de entrega local da Camada 2 | MANTIDO | concept, summary, glossary |
| 2 | Frame carrega o pacote IP, que carrega o segmento TCP (encapsulamento) | MANTIDO | concept (1º parágrafo) |
| 3 | MAC = 48 bits, associado à interface, hexadecimal em 6 pares | MANTIDO | concept (definition-box), flashcard fc3.2.2 |
| 4 | MAC não é identidade forte (alterado, clonado, virtual) | MANTIDO | concept, internals (erros comuns), summary, security, q3.2.4 |
| 5 | Bits individual/grupo e universal/local | MANTIDO (detalhado) | concept, tabela "Como ler um MAC"; fc3.2.9; ex3.2.6 |
| 6 | OUI identifica o fabricante, não prova posse | MANTIDO | concept (tabela), glossary |
| 7 | Por que cada campo existe (sem MAC destino/origem/EtherType/FCS) | MANTIDO | problem |
| 8 | Frame não roteia, não autentica, não criptografa, não substitui firewall | MANTIDO | problem (último parágrafo) |
| 9 | Ethernet II é o formato comum em capturas | MANTIDO | internals |
| 10 | Preâmbulo/SFD 8 bytes, sincronização, não aparece em captura | MANTIDO (movido) | internals, tabela de campos |
| 11 | MAC destino/origem 6 bytes; papel no switch (encaminhar/aprender) | MANTIDO (movido) | internals, tabela de campos |
| 12 | EtherType 16 bits: IPv4, IPv6, ARP; 0x0800, 0x0806 | MANTIDO | internals, fc3.2.8, glossary, q3.2.5 |
| 13 | Tag 802.1Q identifica VLAN em trunks; configuração errada vaza/isola | MANTIDO | internals, tabela de campos |
| 14 | Payload 46–1500 bytes sem jumbo; pode ter dados sensíveis | MANTIDO (movido) | internals |
| 15 | FCS 32 bits detecta, não corrige; CRC/FCS → cabo, porta, transceptor, interferência | MANTIDO | internals, glossary, troubleshooting, security.monitoring |
| 16 | Capturas no host não mostram todos os campos físicos | MANTIDO | internals (parágrafo após a tabela), lab passo 5 |
| 17 | Fluxo: próximo salto → ARP → NIC monta → switch aprende/encaminha → destino confere e entrega | MANTIDO | internals, tabela "Do envio à entrega" |
| 18 | Falhas por etapa (máscara/gateway, cache ARP, interface/cabo, flooding/loop/VLAN, FCS) | MANTIDO (movido) | internals, coluna "O que pode falhar" |
| 19 | ff:ff:ff:ff:ff:ff = broadcast, todos no domínio de broadcast; ARP usa broadcast | MANTIDO | concept (tabela), fc3.2.6, glossary |
| 20 | Unicast × multicast têm comportamentos diferentes | MANTIDO (detalhado) | concept, tabela de tipos de destino; q3.2.7 |
| 21 | Destino fora da sub-rede → MAC de destino do gateway | MANTIDO | simpleExample, internals, summary, q3.2.3, ex3.2.3, lab |
| 22 | MACs mudam a cada salto roteado; IPs permanecem | MANTIDO | analogy, diagram, internals (erros comuns), summary, fc3.2.3 |
| 23 | Componentes: host/NIC, switch, VLAN, gateway, firewall, NAC/802.1X | MANTIDO | architecture |
| 24 | Cloud abstrai L2; legados dependentes de broadcast falham na migração | MANTIDO | cloudExample |
| 25 | Runner/pipeline falha por VLAN ou bridge errado | MANTIDO | cloudExample |
| 26 | Caminho notebook → tomada → patch panel → switch → gateway → servidor | MANTIDO | enterpriseExample |
| 27 | MAC ausente na tabela: link, autenticação, VLAN, tráfego | MANTIDO | enterpriseExample, q3.2.6 |
| 28 | MAC alternando entre portas: loop, mobilidade, VM, docking, spoofing | MANTIDO | enterpriseExample, mentor 3, troubleshooting |
| 29 | Riscos: MAC spoofing, MAC flooding, rede plana, portas expostas, exposição de captura | MANTIDO | security.vulnerabilities |
| 30 | Controles: 802.1X/NAC, port security, VLANs por função, portas ociosas desativadas, controle físico | MANTIDO | security.hardening |
| 31 | Erros comuns (MAC × IP, MAC do servidor final, MAC como pessoa, broadcast = ataque) | MANTIDO (movido) | internals, callout "Erros comuns" |
| 32 | Comandos getmac /v, ipconfig /all, arp -a, ip link/addr/neigh/route, route print | MANTIDO | troubleshooting, lab |
| 33 | Comandos Cisco show mac address-table, interfaces status, counters errors, show arp | MANTIDO | troubleshooting, lab passo 6 |
| 34 | Randomização de MAC, múltiplos adaptadores (VPN/WSL/Docker) | MANTIDO | lab.troubleshooting, concept (bit U/L) |
| 35 | Sanitização de evidências (mascarar octetos) | MANTIDO | lab passo 7, security |
| 36 | Investigação de MAC desconhecido: porta, VLAN, DHCP, NAC, inventário, EDR, contenção proporcional | MANTIDO | challenge, commentedSolution |
| 37 | Ethernet clássica em meio compartilhado precisava de origem/destino | REMOVIDO | duplicado em problem (função de cada MAC); história sem ganho de mecanismo |
| 38 | Impacto financeiro (custo de switches gerenciáveis, NAC) | REMOVIDO | genérico, invisível, fora dos objetivos |
| 39 | ENIs, overlays, SDN em cloud | REMOVIDO | duplicado em cloudExample ("rede definida por software") |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que frames existem e qual problema resolvem | problem; concept; ex3.2.2; mentor 1 |
| Identificar os principais campos do frame | internals (tabela de campos); diagram; summary; q3.2.5; fc3.2.7; fc3.2.8; ex3.2.5; lab passo 5 |
| Diferenciar MAC de IP e entender o escopo local | concept; internals (erros comuns); simpleExample; analogy; q3.2.2; q3.2.3; ex3.2.2; ex3.2.3; fc3.2.3 |
| Interpretar unicast, broadcast e multicast | concept (tabelas "Como ler um MAC" e tipos de destino); summary; q3.2.7; ex3.2.5; ex3.2.6; fc3.2.6; fc3.2.9 |
| Relacionar MAC e frame com switch, ARP, VLAN, troubleshooting e segurança | internals (fluxo); architecture; enterpriseExample; troubleshooting; security; lab; mentor 2 e 3; q3.2.6; challenge |

## 10. O que mudou na nova versão
- Removidos `history`, `evolution`, `devsecopsExample`, `securityExample` e os 4 `*Intro` invisíveis; o que valia foi fundido em `problem`, `internals`, `cloudExample` e `security`.
- Conteúdo movido de campos invisíveis: `protocolFields` → tabela de campos em `internals`; `packetFlow` → tabela "Do envio à entrega" com coluna de falhas; `commonMistakes` → callout "Erros comuns"; `deepDive.mentalModel` → 1º bullet do `summary`; `deepDive.securityImpact`/`operationalImpact` → `security`.
- **Acréscimos novos (não movidos), todos para cobrir objetivos da própria aula:**
  - Tabela "Como ler um MAC" (posição do OUI, bit I/G, bit U/L e o atalho pelo 2º dígito hex) e tabela de tipos de destino com exemplos (`01:00:5e:00:00:fb`, `33:33:00:00:00:01`, inundação de multicast sem IGMP snooping). Justificativa: objetivo 4 (unicast, broadcast e multicast); o original só dizia que "os primeiros bits podem indicar…" e que multicast "será importante".
  - EtherType 0x86DD (IPv6) e a tag 802.1Q começando com 0x8100; padding abaixo de 46 bytes e faixa de 64–1518 bytes (aritmética dos campos já existentes); nota de que o FCS costuma não aparecer em captura no host. Justificativa: objetivo 2 (campos do frame) e coerência com o passo de Wireshark.
  - Formato do MAC com hífens no Windows (uma frase). Justificativa: o lab pede para ler o MAC no `getmac`/`ipconfig`.
- Prática: as quantidades ficaram iguais (quiz 6, flashcards 6, mentor 3, exercícios 4); trocados só os itens triviais ou duplicados (q3.2.1 → q3.2.7; fc1/fc4/fc5 → fc7/fc8/fc9; ex1/ex4 → ex5/ex6; mentor 3 reescrito). Distratores implausíveis do quiz substituídos e gabarito redistribuído (`quiz_embaralhar`).
- Lab: passos de Windows e Linux fundidos; passo 5 opcional de Wireshark (vinha de `improvements`) para exercitar a leitura dos campos; removidos `analysisTask` ritual, `lab.challenge`/`lab.solution` (duplicavam o desafio), `lab.troubleshooting[0]` (duplicava a validação) e 2 perguntas duplicadas; safetyNotes consolidadas em 3; `estimatedTimeMinutes` 55 → 40 (7 passos curtos, 2 opcionais; a alternativa da fórmula dá 42 min).
- `duration` 85-120 → 105-145 min e `estimatedStudyTimeMinutes` 120 → 145, pela faixa recomendada da nova versão (a original estava SUBESTIMADA).
- Aviso do `validar` justificado: "id q3.2.1 ausente" — a questão foi substituída por q3.2.7 (id inédito), conforme 11.5.

## 11. Depois
Palavras visíveis: 4917 → 5043 (+2,6%; cortes brutos de 775 palavras, 16%, compensados por ~430 palavras movidas de campos invisíveis e ~250 de acréscimos para o objetivo 4) · Invisíveis: 813 → 29 (só `networkContext`) · Duração: 85-120 min (T 137,9) → 105-145 min (T 122,0; −11,5%) · Quiz corrigido: sim (6 questões; 1 trocada, 5 com distratores revistos, gabarito redistribuído)

## 12. Revisão humana
- `lab.estimatedTimeMinutes` reduzido de 55 para 40 por coerência com os passos (fundidos os passos de Windows e Linux; dois passos opcionais). Confirmar se o módulo usa esse número em algum cálculo.
- Fatos novos que convém conferir (não há dúvida técnica, mas são acréscimos): faixa de 64–1518 bytes, posição e valor 0x8100 da tag 802.1Q, 0x86DD, prefixos de multicast 01:00:5e e 33:33, e a nota de que o FCS normalmente não aparece em capturas no host.
- Removido `lab.challenge`/`lab.solution` por duplicar `challenge`/`commentedSolution`; nenhuma regra de progresso depende deles.

```json
{
  "id": "3.2", "modulo": "m03", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Frame Ethernet e endereço MAC",
  "duracao_declarada": "85-120 min", "T_original_min": 137.9, "duracao_nova": "105-145 min", "T_nova_min": 122.0, "duracao_nova_estimated_max": 145,
  "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 17, "conteudo_util": "PARCIAL", "aproveitamento": "MÉDIO",
  "pode_ser_mais_curta": true, "reducao_tempo_pct": 11.5, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4917, "palavras_visiveis_depois": 5043,
  "palavras_invisiveis_antes": 813, "palavras_invisiveis_depois": 29,
  "secoes": {
    "motivation": "ENXUGAR", "history": "REMOVER", "problem": "ENXUGAR", "evolution": "FUNDIR:internals",
    "concept": "MANTER", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "FUNDIR:devsecopsExample",
    "devsecopsExample": "FUNDIR:cloudExample", "securityExample": "FUNDIR:security", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "MANTER", "nextTheme": "MANTER",
    "protocolFields": "MOVER:content.internals", "packetFlow": "MOVER:content.internals",
    "deepDive": "MOVER:summary", "commonMistakes": "MOVER:content.internals", "networkContext": "MANTER",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR",
    "flashcards": "ENXUGAR", "mentorQuestions": "ENXUGAR", "exercises": "ENXUGAR", "challenge": "MANTER",
    "commentedSolution": "MANTER", "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.estimatedTimeMinutes reduzido de 55 para 40 (coerente com os passos); confirmar se o módulo usa esse número em algum cálculo",
    "conferir fatos acrescentados: faixa de 64-1518 bytes, tag 802.1Q 0x8100, EtherType 0x86DD, prefixos de multicast 01:00:5e e 33:33, FCS ausente em capturas no host",
    "lab.challenge/lab.solution removidos por duplicarem challenge/commentedSolution"
  ]
}
```
