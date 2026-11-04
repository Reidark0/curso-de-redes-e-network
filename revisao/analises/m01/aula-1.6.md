# Aula 1.6 — Cabeamento estruturado e padrões RJ-45
Tipo: fundamental · Duração declarada: 80-115 min · Palavras visíveis / invisíveis (antes): 4764 / 588

## 1. Duração
T pela fórmula = 142,3 min (teoria 20,3, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 60)
Veredito: SUBESTIMADA. M = 97,5 min < 0,8×T = 113,8 min. Teoria = 16% do tempo e lab de 60 min (8 passos; alternativa 46,8 min, portanto plausível). Para uma aula fundamental com prática de inventário físico essa divisão faz sentido: não é DESEQUILIBRADA. O que falta é declarar o tempo real, sobretudo os 60 min de lab e os 24 min de exercícios.

## 2. Encheção de linguiça
Nível: MÉDIA (~15%). Evidências:
- `history`: "O cabeamento estruturado surgiu para tratar a infraestrutura física como um sistema planejado…", que repete o `concept`. E ainda: "Tecnicamente, há nuances entre o padrão de conector e o uso popular do termo… O importante para o aluno agora é…" (meta-texto, e não diz qual é a nuance).
- `evolution`: a tabela repete, linha por linha, os itens do `problem` (sem padronização/documentação/certificação/segurança). Trecho: "A evolução do cabeamento em redes locais acompanhou o crescimento da Ethernet".
- `devsecopsExample`: genérico. "DevSecOps parece distante de cabos, mas não é. Pipelines, clusters, runners… dependem de conectividade confiável."
- `architecture`: "Em cloud, o provedor abstrai esse cabeamento, mas o conceito continua útil…", que se sobrepõe ao `cloudExample`.
- `securityExample` × `security`: as linhas "Porta ociosa ativa", "Rack aberto" e "Documentação inexistente" repetem as 3 `vulnerabilities`. Só "PoE sem planejamento" era inédita.
- `motivation`: lista de substantivos ("disponibilidade, segurança, troubleshooting, auditoria, mudança de layout, expansão, inventário, resposta a incidente e até custo").
- Lab: frase-padrão de 56 aulas repetida em 4 passos ("Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório"). O pré-requisito "Não desconectar cabos de produção sem autorização" duplica `safetyNotes`.
- `security.hardening` repete `goodPractices` item por item. `detectionIdeas` "Alertas de link up em portas não autorizadas" duplica `monitoring` "Porta ociosa que passa a ter link".
- `exercises[ex1.6.3]` (controles para tomadas de visitantes) é a mesma pergunta do `mentorQuestions[2]` (tomada na recepção). As flashcards fc1.6.1, fc1.6.3 e fc1.6.5 copiam as questões q1.6.1, q1.6.3 e q1.6.4 do quiz.
- Campos invisíveis: `deepDive` (329 palavras, com uma `decisionTable` boa) e `commonMistakes` (132), além de `labIntro`, `exercisesIntro`, `challengeIntro` e `solutionIntro`.

## 3. Conteúdo útil
PARCIAL. O que tem de valioso: o caminho tomada → patch panel → switch, bem decomposto; o exemplo de identificação `2A-034` com switch/porta/VLAN; troubleshooting com comandos corretos (Get-NetAdapter, ethtool, show interfaces status, show interfaces, show power inline) e árvore de decisão; lab executável e seguro; desafio com rubrica clara.
Lacunas (exigidas pelos objetivos 3 e 4):
- a aula promete "T568A e T568B sem decorar pinagem de forma cega", mas não mostra a pinagem nem diz o que muda entre os padrões (pares laranja e verde), o que é cabo cruzado nem o que é Auto-MDI-X;
- não explica por que um cabo "dá link" a 100 Mbps e não a 1 Gbps (10/100 usa 2 pares; 1000BASE-T usa os 4), que é exatamente o sintoma dos `learningOutcomes`;
- não tem nenhum número de categoria nem de distância (Cat5e/6/6A; canal de 100 m = 90 + 10);
- sobre interferência, só "evitar fontes de interferência"; o mecanismo (trançado) e as causas de instalação não aparecem;
- PoE sem padrões e sem cálculo de orçamento;
- "certificação" citada sem dizer o que mede nem o que o teste de continuidade deixa passar (par dividido).
Erros técnicos: nenhum relevante. A referência "Structured Cabling Standards / TIA/EIA" era vaga. O quiz tinha distratores absurdos (Token JWT, Base64, JSON da API), todas as respostas na opção 0 e o formato antigo (`q/opts/a/exp`).

## 4. Aproveitamento
BOM (~87%). Contra o T original de 142 min, cerca de 19 min não ensinam os objetivos: ~5 min de teoria repetida ou genérica (history, evolution, devsecops, securityExample duplicado), 6 min do exercício duplicado com o mentor, ~3 min do exercício que só copia a lista do `internals`, ~2 min de questões com distratores triviais, ~1,5 min de flashcards copiadas do quiz e ~1 min de ritual de lab. Contra a duração declarada (97,5 min), a conta não fecha: a aula exige bem mais tempo do que promete.

## 5. Pode ser mais curta?
NÃO. Redução prevista: ~0%. Dá para cortar ~10% (linguiça), mas a aula precisa de conteúdo novo para cumprir os objetivos 3 e 4. O T da nova versão sobe de 142,3 para 150,1 min.

## 6. Explicação mais direta
SIM.
- `concept`: a definição aparecia duas vezes (parágrafo + definition-box). Ficou uma, seguida de uma tabela de pinagem e da regra "só laranja e verde trocam" no lugar de "use o mesmo padrão" sem explicação.
- `problem` + `evolution`: lista em prosa + tabela repetida viraram uma tabela "Sem… / O que acontece / O que o cabeamento estruturado faz".
- `simpleExample`: ganhou a saída concreta (`LinkSpeed 100 Mbps`) e o teste de troca de patch cord.
- `deepDive.decisionTable` (invisível) virou a tabela visível "Decisões típicas por ponto" no `architecture`.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Fica o cenário da empresa que cresceu e o callout do SOC; sai a lista de substantivos |
| history | FUNDIR:problem | 2 frases (instalação pontual × crescimento) foram para o problem; a "nuance" do RJ-45 virou fato concreto (8P8C) no concept; o resto repetia o concept |
| problem | ENXUGAR | Lista vira tabela problema → solução e absorve history/evolution; ganha 1 frase de custo (deepDive.financialImpact/whenNotToUse) |
| evolution | FUNDIR:problem | A tabela repetia o problem; a coluna "o que veio depois" virou a 3ª coluna da tabela do problem |
| concept | ENXUGAR | Definição única; acrescentados 8P8C, 4 pares, tabela T568A/B, cabo direto × cruzado, Auto-MDI-X e pares × velocidade (lacuna do objetivo 3) |
| internals | MANTER | Caminho de 7 componentes mantido; acrescentados categoria/distância, interferência, PoE, continuidade × certificação (objetivo 4) e o callout "Erros comuns" (de commonMistakes) |
| architecture | ENXUGAR | Áreas mantidas; frase de cloud movida/condensada no cloudExample; recebe a decisionTable do deepDive |
| analogy | ENXUGAR | Limite da analogia em 1 frase |
| simpleExample | ENXUGAR | Um parágrafo concreto com LinkSpeed; o 2º parágrafo era genérico (interferência vai para internals) |
| enterpriseExample | MANTER | Exemplo concreto 2A-034 com porta/VLAN/802.1X |
| cloudExample | ENXUGAR | Um parágrafo: conectividade híbrida (cross-connect, transceptor, VLAN de transporte), que é a parte específica |
| devsecopsExample | REMOVER | Genérico ("pipelines dependem de rede"); nada específico de cabeamento |
| securityExample | FUNDIR:security | 3 linhas duplicavam `security.vulnerabilities`; "PoE sem planejamento" virou a 4ª vulnerabilidade; "espelhamento físico" e "switch de mesa/cabo de câmera" foram para security |
| diagram | MANTER | Correto e legível; só o número do h2 foi tirado |
| labIntro | REMOVER | Invisível; o conteúdo já está em lab.objective/scenario |
| exercisesIntro | REMOVER | Invisível, meta-texto |
| challengeIntro | REMOVER | Invisível; repete challenge.scenario |
| solutionIntro | REMOVER | Invisível, meta-texto |
| summary | ENXUGAR | 5 bullets; o 1º é o deepDive.mentalModel; inclui 100 m e a diferença entre A e B |
| nextTheme | MANTER | 2 frases coerentes com a 1.7 |
| deepDive | MOVER:summary/architecture/problem/security | mentalModel → summary; decisionTable → architecture; limitations → callout de erros comuns/internals; financialImpact e whenNotToUse → problem; securityImpact já estava em security (documentação sensível → badPractices). whenToUse/operationalImpact/keyTerms são redundantes (cobertos por problem, architecture e glossary) |
| commonMistakes | MOVER:internals | Callout "Erros comuns" com os 4 itens |
| networkContext | MANTER | Metadado |
| security | ENXUGAR | hardening removido (duplicava goodPractices, fundido nele); detectionIdeas sem duplicata; +1 vulnerabilidade (PoE) com os 4 campos |
| troubleshooting | MANTER | Comandos corretos e completos; 2 nós da árvore ficaram mais precisos (pares azul/marrom, par dividido, certificação) |
| lab | ENXUGAR | Saem 4 analysisTask rituais, o pré-requisito duplicado e 1 safetyNote ritual; improvements de 5 para 3; o passo 4 ganha a identificação de T568A/B no conector transparente; o passo 3 ganha a interpretação 100 Mbps → pares |
| quiz | MANTER (ajustado) | Normalizado; distratores plausíveis nas 6 originais; +2 questões (q1.6.7 diferença A/B, q1.6.8 pares × velocidade); gabarito redistribuído |
| flashcards | ENXUGAR | Saem fc1.6.1/.3/.5 (cópias do quiz); entram fc1.6.7–.10 (ordem T568B, 100 m, par dividido, Auto-MDI-X) |
| mentorQuestions | MANTER | 3 perguntas de raciocínio; expectedIdeas da 2ª inclui os pares |
| exercises | ENXUGAR | Saem ex1.6.3 (duplicava o mentor 3) e ex1.6.4 (cópia da lista); entram ex1.6.5 (identificar a pinagem) e ex1.6.6 (cálculo de distância); continuam 4 |
| challenge | MANTER | Tasks com categoria/distância, padrão de terminação e orçamento PoE |
| commentedSolution | MANTER | Steps e finalAnswer incluem categoria, distância e padrão único |
| glossary | MANTER | relatedLessons (subcampo invisível) removido; RJ-45, T568A/B e PoE precisos; + Patch cord e Certificação de cabo (usados na aula) |
| references | MANTER | TIA com título real (ANSI/TIA-568); notas da IEEE 802.3 mais precisas |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Definição de cabeamento estruturado (planejada, padronizada, identificável, testável) | MANTIDO | concept (definition-box), glossary, q1.6.1 |
| 2 | Componentes: cabos, tomadas, patch panels, racks, identificação, caminhos, documentação, testes | MANTIDO | concept |
| 3 | RJ-45 como nome popular do conector modular de 8 posições | MANTIDO | concept (8P8C), glossary |
| 4 | T568A/T568B; mesmo padrão nas duas pontas em cabo direto; documentar o padrão | MANTIDO | concept, q1.6.3, glossary |
| 5 | Caminho: dispositivo → patch cord → tomada/keystone → cabo horizontal → patch panel → patch cord de rack → switch | MANTIDO | internals, diagram, lab.topology, summary |
| 6 | Switch negocia velocidade/duplex, fornece PoE, encaminha quadros | MANTIDO | internals |
| 7 | Causas de link apagado (cabo solto, porta desativada, tomada errada, conector, interface, energia, política) | MANTIDO | internals, troubleshooting.decisionTree |
| 8 | Áreas: área de trabalho, horizontal, sala de telecom, backbone (fibra), documentação | MANTIDO | architecture |
| 9 | Documentação liga o físico ao lógico (porta, tomada, sala, switch, VLAN, serviço, responsável) | MANTIDO | architecture, problem |
| 10 | Cloud abstrai o cabeamento; conectividade híbrida (cross-connect, transceptor, fibra, VLAN de transporte) exige documentação | MANTIDO | cloudExample |
| 11 | Sem padronização/documentação/certificação/organização/segurança física: consequências | MANTIDO | problem (tabela) |
| 12 | Teste de continuidade × certificação de parâmetros físicos | MANTIDO | problem, internals, glossary |
| 13 | Portas sempre ativas → 802.1X, VLANs, port security, desativar ociosas | MANTIDO | problem, security |
| 14 | Exemplo 2A-034 (prédio/andar/ponto) ↔ patch panel ↔ switch 3 porta 18 ↔ VLAN ↔ 802.1X | MANTIDO | enterpriseExample |
| 15 | Cabo mal crimpado/dobrado/partido → velocidade menor; não culpar o provedor | MANTIDO | simpleExample |
| 16 | Analogia instalação elétrica/hidráulica; ponto físico ≠ autorização | MANTIDO | analogy |
| 17 | Riscos: porta ociosa, rack aberto (desconexão, espelhamento, sabotagem), documentação inexistente | MANTIDO | security.vulnerabilities |
| 18 | PoE sem planejamento → APs/câmeras desligam, perda de visibilidade | MANTIDO | security.vulnerabilities[3], internals, architecture |
| 19 | Comandos: Get-NetAdapter, ipconfig /all, ip link/ethtool, show interfaces status, show interfaces, show power inline | MANTIDO | troubleshooting.commands, lab |
| 20 | CRC/input errors → cabo, conector, interferência, porta | MANTIDO | troubleshooting, ex1.6.2, lab passo 6 |
| 21 | Monitoramento: status de porta, velocidade, CRC, 802.1X, PoE; detecção de link up em porta ociosa e comparação inventário × switch | MANTIDO | security.monitoring/detectionIdeas |
| 22 | Documentação física é sensível (proteger, não eliminar) | MANTIDO | security.badPractices, commentedSolution.commonWrongAnswers |
| 23 | Decisão por situação (mesa nova, AP no teto, porta na recepção) | MANTIDO (movido) | architecture (era deepDive invisível) |
| 24 | Modelo mental "antes de culpar IP/aplicação, confirme o físico" | MANTIDO (movido) | summary (era deepDive) |
| 25 | Erros comuns (qualquer RJ-45 serve; misturar A/B; não identificar; portas ativas em área pública) | MANTIDO (movido) | internals, callout (era commonMistakes) |
| 26 | Documentação fica obsoleta se mudanças não forem registradas | MANTIDO (movido) | internals, callout de erros comuns |
| 27 | Custo inicial maior × menor custo de manutenção; teste temporário pequeno dispensa | MANTIDO (movido) | problem |
| 28 | "Padrões não eliminam erro humano" (deepDive.limitations) | REMOVIDO | redundante: o problem e o callout já tratam de erro humano |
| 29 | Rede instável afeta runners CI/CD (devsecopsExample) | REMOVIDO | fora do escopo / genérico |
| 30 | Roteador em local ventilado, identificar cabos em casa (simpleExample p2) | REMOVIDO | genérico; a interferência está em internals |
| 31 | Lab: escolher ponto, registrar host, link/velocidade, caminho, tomada/patch panel, erros, risco, inventário | MANTIDO | lab.steps 1–8 |
| 32 | Desafio: rack, identificação, PoE, controles, validação; rubrica 4×25 | MANTIDO | challenge, commentedSolution |
| 33 | Mentor: mais que crimpar; diagnóstico de 100 Mbps; tomada na recepção | MANTIDO | mentorQuestions |
| 34 | Controles para tomadas de visitantes (ex1.6.3) | MANTIDO | coberto por mentorQuestions[2] e security; o exercício saiu por duplicar o mentor |
| 35 | Novo: pinagem pino a pino, laranja/verde trocam, cabo cruzado, Auto-MDI-X | NOVO | concept, q1.6.7, fc1.6.7, fc1.6.10, ex1.6.5, lab passo 4 |
| 36 | Novo: 10/100 usa pinos 1,2,3,6; 1000BASE-T usa 4 pares | NOVO | concept, q1.6.8, q1.6.2, simpleExample, decisionTree |
| 37 | Novo: canal 100 m = 90 m fixo + 10 m de patch cords; Cat5e/6/6A (MHz e velocidade) | NOVO | internals, architecture, fc1.6.8, ex1.6.6, summary |
| 38 | Novo: trançado cancela ruído; causas de interferência na instalação (~13 mm de destrançamento) | NOVO | internals |
| 39 | Novo: PoE 802.3af/at/bt e cálculo de orçamento | NOVO | internals, glossary |
| 40 | Novo: par dividido (split pair); o que o certificador mede | NOVO | internals, fc1.6.9, glossary |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Entender o que é cabeamento estruturado e por que existe | concept (definição), problem (tabela + custo), motivation |
| Diferenciar cabo, tomada, patch cord, patch panel, rack, switch e ponto | internals (caminho), architecture, glossary, ex1.6.1, q1.6.5 |
| T568A/T568B sem decorar pinagem às cegas | concept (tabela + "só laranja e verde trocam" + direto/cruzado/Auto-MDI-X), q1.6.3, q1.6.7, ex1.6.5, lab passo 4 |
| Relacionar categoria, distância, interferência, PoE e velocidade negociada | concept (pares × velocidade), internals (tabela de categorias, 100 m, interferência, PoE), q1.6.8, ex1.6.6 |
| Diagnosticar problemas de cabeamento com evidências | troubleshooting (comandos + árvore), internals (continuidade × certificação), lab 3–6, ex1.6.2, mentor 2 |
| Impactos de segurança física e operação | security, architecture (decisões), enterpriseExample, mentor 3, challenge |

## 10. O que mudou na nova versão
- Removidas as seções history, evolution, devsecopsExample e securityExample (fundidas em problem/concept/security ou genéricas) e as 4 introduções invisíveis.
- deepDive e commonMistakes movidos para summary, architecture (tabela de decisões), problem e um callout "Erros comuns" no internals; depois removidos.
- concept ganhou a pinagem T568A/B, o que de fato muda (laranja ↔ verde), cabo direto × cruzado, Auto-MDI-X e por que 1 Gbps precisa dos 4 pares.
- internals ganhou categorias (Cat5e/6/6A), limite de 100 m (90 + 10), mecanismo de interferência, PoE (padrões e orçamento) e continuidade × certificação (par dividido).
- Quiz normalizado; distratores triviais (JWT, Base64, navegador) trocados por plausíveis; +2 questões; gabarito redistribuído (antes era todo na opção 0).
- Flashcards sem cópias do quiz; exercícios sem duplicata do mentor e com 2 práticos novos (pinagem e distância).
- Lab sem a frase ritual repetida em 4 passos e com a identificação do padrão no conector transparente.
- security: hardening fundido em goodPractices, nova vulnerabilidade PoE e detecção sem duplicata.
- Referência TIA com o nome real da norma (ANSI/TIA-568); glossary sem o subcampo invisível relatedLessons e com 2 termos usados na aula.
- duration 80-115 → 130-180 min; estimatedStudyTimeMinutes 115 → 180.

## 11. Depois
Palavras visíveis: 4764 → 6187 (+30%; cortes brutos 652 = 14%, acréscimos 2075, quase todos de conteúdo exigido pelos objetivos 3 e 4, de material movido de campos invisíveis e de explicações do quiz) · Duração: 80-115 min → 130-180 min (T 142,3 → 150,1) · Quiz corrigido: sim (8 questões)

## 12. Revisão humana
- Fatos técnicos acrescentados para cobrir os objetivos 3 e 4, a conferir: Cat6 com 10GBASE-T até ~55 m; destrançamento máximo de ~13 mm; PoE 802.3af 15,4 W / 802.3at 30 W / 802.3bt 60 ou 90 W (valores no PSE); orientação do pino 1 no lab passo 4 ("trava para baixo, contatos virados para você, pino 1 à esquerda").
- O exemplo de orçamento PoE (AP 25 W, câmera 7 W) usa valores ilustrativos, sinalizados como tal no texto.
- A referência 1 teve o título trocado de "Structured Cabling Standards (TIA/EIA)" para "ANSI/TIA-568"; o `url` continua vazio, como no original.
- A duração subiu de 80-115 para 130-180 min pela fórmula fixa (a original já estava SUBESTIMADA: T = 142 min). Confirmar se o módulo (24 h) absorve o aumento.

```json
{
  "id": "1.6", "modulo": "m01", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Cabeamento estruturado e padrões RJ-45",
  "duracao_declarada": "80-115 min", "T_original_min": 142.3, "duracao_nova": "130-180 min", "T_nova_min": 150.1, "duracao_nova_estimated_max": 180,
  "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 15, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 0, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4764, "palavras_visiveis_depois": 6187,
  "palavras_invisiveis_antes": 588, "palavras_invisiveis_depois": 28,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "FUNDIR:problem",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "ENXUGAR", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "REMOVER",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "MANTER",
    "deepDive": "MOVER:summary/architecture/problem/security", "commonMistakes": "MOVER:internals", "networkContext": "MANTER",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "ENXUGAR",
    "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 8, "objetivos_cobertos": true,
  "revisao_humana": [
    "Conferir fatos técnicos acrescentados: Cat6 10GBASE-T até ~55 m; destrançamento ~13 mm; PoE 15,4/30/60-90 W; orientação do pino 1 no lab passo 4",
    "Exemplo de orçamento PoE usa valores ilustrativos (AP 25 W, câmera 7 W)",
    "Título da referência TIA trocado para ANSI/TIA-568 (url continua vazio)",
    "Duração subiu de 80-115 para 130-180 min pela fórmula (original SUBESTIMADA); confirmar o impacto na carga do módulo"
  ]
}
```

> **Controle de qualidade do m01 (revisor independente):** APROVADA. Todos os fatos novos foram conferidos (pinagem, categorias, 90+10 m, PoE 15,4/30/60/90 W, orçamento 117 W). Ajuste menor aplicado pelo orquestrador: no cabo cruzado, a nota de que o crossover gigabit completo também troca azul e marrom. Menores aceitos: "CFTV" e "mapa físico" saíram com a tabela do `securityExample`; "provedor/BGP" saiu do `cloudExample`.
