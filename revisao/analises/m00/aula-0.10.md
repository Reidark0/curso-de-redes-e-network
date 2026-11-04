# Aula 0.10 — Revisão do Módulo 0
Tipo: ligação/revisão · Duração declarada: 70-100 min · Palavras visíveis / invisíveis (antes): 3839 / 512

## 1. Duração
T pela fórmula = 81 min (teoria 19, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0). Faixa recomendada: 70-95 min.
Veredito: ORGANIZADA — M = 85 min, 1,05×T. A divisão faz sentido para uma revisão: só 27% do tempo é leitura, e o resto é produção ativa (exercícios, desafio, mentor, quiz). Não há lab, e isso é coerente com o tipo de aula (ver Revisão humana sobre `requiredLabs`).

## 2. Encheção de linguiça
Nível: MÉDIA (~18%). Evidências:
- `history` inteira genérica para uma revisão ("A história da computação em rede é a história de abstrações empilhadas…"), sem nada que explique mecanismo; 6.10 dispensa history em revisões.
- `architecture` lista onde os fundamentos "aparecem" ("Cloud e DevSecOps: transformam esses conceitos em políticas, automação, observabilidade…"), o que repete a cadeia de `internals` e o `simpleExample`.
- `cloudExample` genérico ("Em cloud, fundamentos continuam existindo, mas muitas partes ficam abstraídas"), que sobrepõe `devsecopsExample`.
- Meta-texto em `motivation` ("Esta aula existe para juntar essas peças…"), em `history` ("Esta revisão reproduz essa evolução em escala didática") e em `internals` ("O funcionamento interno do raciocínio… pode ser visto como uma cadeia").
- Sobreposição entre `securityExample` (linhas "Confundir Base64 com proteção" e "Evidência sensível") e `security.vulnerabilities`; entre `security.goodPractices` "Sanitizar evidências" e "Evitar expor tokens…".
- Quiz q0.10.1 trivial, com distratores absurdos ("Ele ensina apenas história da computação").
- Campos invisíveis: `labIntro` (frase-padrão repetida em 39 aulas, "Esta aula não possui laboratório independente…"), `exercisesIntro`, `challengeIntro`, `solutionIntro`, `deepDive` e `commonMistakes` (354 palavras que o aluno não vê).
Conferência: os cortes brutos do `comparar` deram 675 palavras (18%), coerentes com a estimativa.

## 3. Conteúdo útil
PARCIAL. O que tem de realmente valioso: a tabela aula a aula (`evolution`), a lista "Sem X, você…" (`problem`), a cadeia de 9 perguntas (`internals`), o exemplo empresarial com as perguntas em ordem de camada, a leitura das mensagens de erro de pipeline (`devsecopsExample`), a árvore de decisão do troubleshooting, o desafio com rubrica e a solução comentada com os erros típicos ("403 é rede fora").
Lacunas: (1) o learningOutcome "converter mentalmente entre bps, B/s, volume e throughput" não tinha nenhum exemplo numérico; (2) perda e jitter eram citados, mas nunca definidos, apesar do outcome "diferenciar latência, largura de banda, throughput, perda e jitter"; (3) o objetivo "Identificar lacunas" e o subtítulo ("checklist, simulado") não tinham checklist de prontidão; (4) a tabela de contraste recomendada em `commonMistakes` estava num campo invisível; (5) as interpretações dos comandos Linux e Cisco eram vagas ("Ajuda a entender que equipamentos também fornecem evidências por camada").
Erros técnicos: nenhum relevante. O `Test-NetConnection` é cmdlet do PowerShell, e isso não estava indicado (agora está).

## 4. Aproveitamento
BOM — cerca de 92% de T vai para revisão ou prática dos objetivos. O tempo genérico (history, architecture, cloud, meta-texto e q0.10.1) soma uns 6–7 min dos 81. Contra a duração declarada (M = 85), a conclusão é a mesma.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~5%. A teoria cai uns 4 min, mas 76% do tempo é prática (exercícios, desafio, mentor e quiz), que deve ficar. Além disso, preencher as lacunas dos objetivos acrescenta texto. Na prática, T foi de 81 para 82,1 min.

## 6. Explicação mais direta
SIM:
- `concept`: a definição vinha depois de um parágrafo de justificativa. Agora o `definition-box` vem primeiro.
- Os pares que confundem estavam espalhados em prosa (devsecops, security.commonErrors, commonMistakes invisível). Agora há uma tabela "Pares que você não pode confundir", com exemplo concreto em cada linha.
- `motivation`: o exemplo do chamado ("está lento") abre a aula, e o meta-texto sobre a "armadilha" saiu.
- `problem` absorve, numa frase, a única ideia útil de `history` (cada camada esconde complexidade sem eliminá-la).

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Fica o exemplo do chamado e o propósito da revisão; saem o meta-texto e o callout que repetia o parágrafo. |
| history | FUNDIR:problem | Revisão dispensa history (6.10); só a ideia "abstração esconde sem eliminar" vai para `problem` em 1 frase. |
| problem | ENXUGAR | Lista "Sem X…" mantida; callout encurtado. |
| evolution | MOVER:concept | A tabela aula a aula é o núcleo da revisão e foi para `concept` ("O módulo, aula a aula"); o título "Evolução" não fazia sentido. |
| concept | ENXUGAR | Definição primeiro; recebe a tabela aula a aula, a tabela de contraste e o callout de erros comuns (de `commonMistakes`). |
| internals | MANTER | Cadeia de 9 perguntas mantida; recebe o checklist de prontidão (objetivo "Identificar lacunas"). |
| architecture | REMOVER | Genérica; os pontos (endpoint, meio, aplicação, segurança) já estão na cadeia e no `simpleExample`. |
| analogy | ENXUGAR | Analogia mantida; limite em 1 frase. |
| simpleExample | MANTER | Concreto (abrir um site percorre o módulo inteiro); só ajustes de redação. |
| enterpriseExample | MANTER | Perguntas em ordem de camada e decisões erradas evitadas. |
| cloudExample | FUNDIR:devsecopsExample | O essencial (cloud desloca fundamentos; evidências: security groups, custo de transferência) virou um parágrafo no exemplo de DevSecOps. |
| devsecopsExample | MANTER | Leitura de mensagens de erro por camada, agora em lista; recebe o parágrafo de cloud. |
| securityExample | ENXUGAR | Ficam os sinais que o analista reconhece e as 2 linhas de risco que não estão em `security` (any-any, volume de saída). |
| diagram | MANTER | Correto e legível; só o `<h2>` perdeu o número. |
| labIntro | REMOVER | Invisível; frase-padrão de 39 aulas. |
| exercisesIntro | REMOVER | Invisível; meta-texto. |
| challengeIntro | REMOVER | Invisível; repete o cenário do desafio. |
| solutionIntro | REMOVER | Invisível; meta-texto. |
| summary | ENXUGAR | 5 bullets; o primeiro vem de `deepDive.mentalModel`; acrescenta os pares críticos. |
| nextTheme | ENXUGAR | 1 frase coerente com 1.1 "O que é uma rede e por que existe". |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary | mentalModel → summary; whenToUse → checklist (o que falta revisar); limitations → já no cenário do desafio e no `nextTheme`; financialImpact → já no `enterpriseExample`; securityImpact → duplicado em `security`; keyTerms/operationalImpact/whenNotToUse → genéricos, removidos. |
| commonMistakes | MOVER:concept | Os 3 erros viraram o callout "Erros comuns na revisão"; a "tabela de contraste" sugerida virou a tabela de pares. |
| security | ENXUGAR | goodPractices fundidas (sanitizar + o que mascarar); commonErrors sem o item não-segurança (banda × throughput, já na tabela); hardening sem "Runbooks de diagnóstico" (não é hardening). |
| troubleshooting | ENXUGAR | Comandos mantidos; `purpose`/`interpretation` de Linux e Cisco agora dizem o que cada saída mostra; nota de PowerShell no Windows. Árvore de decisão mantida. |
| lab | — | Não existe (nem no original); `progressRules` não exige lab. |
| quiz | ENXUGAR | q0.10.1 trivial removida; q0.10.4 e q0.10.5 com distratores plausíveis; novas q0.10.7 (Mbps → MB/s) e q0.10.8 (latência × banda); posições embaralhadas. 7 questões. |
| flashcards | MANTER | 6; fc0.10.2 (cópia da q0.10.2) trocado por fc0.10.7 (perda × jitter). |
| mentorQuestions | MANTER | 3; explicação da 1ª ficou mais concreta. |
| exercises | MANTER | 4; ex0.10.2 passa a cobrir perda e jitter (outcome 4). |
| challenge | MANTER | Cenário, tarefas, restrições e rubrica de 100 pontos adequados. |
| commentedSolution | MANTER | Raciocínio, passos e respostas erradas comuns são específicos. |
| glossary | MANTER | Os 5 termos são usados (revisão ativa, mapa mental/SVG, prontidão/checklist, lacuna, limite da evidência). |
| references | MANTER | Internas, reais. |
| linksToOtherCourses | MANTER | Reais. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Sintomas chegam vagos ("está lento", "não acessa"); decompor em partes verificáveis | MANTIDO | motivation |
| 2 | Um acesso envolve sinal, enlace, endereço, nome, transporte, cripto, aplicação, authn/authz, logs, políticas | MANTIDO | problem |
| 3 | Lista "Sem bits/bytes, binário/hex, codificação, métricas, protocolo, camadas…" | MANTIDO | problem |
| 4 | Abstrações escondem complexidade sem eliminá-la | MANTIDO | problem (vindo de history) |
| 5 | História da computação em rede (estados → bits → caracteres → protocolos → camadas/runbooks) | REMOVIDO | fora do escopo de uma revisão (6.10); sem mecanismo |
| 6 | Memorização frágil sem base | MANTIDO | problem, callout |
| 7 | Tabela aula a aula 0.1–0.9 (ideia, problema, prepara para) | MANTIDO | concept, "O módulo, aula a aula" |
| 8 | Revisar ≠ reler; reconstruir relações e usar em cenário novo | MANTIDO | concept, definition-box; glossary "Revisão ativa" |
| 9 | Relações bit→byte→UTF-8/hex→sinal→protocolo→camada | MANTIDO | internals (cadeia) e summary |
| 10 | Cadeia de 9 perguntas (informação … segurança) | MANTIDO | internals |
| 11 | Modelo mental informação → … → evidência → decisão | MANTIDO | summary (de deepDive.mentalModel) |
| 12 | Informação × dado | MANTIDO | concept, tabela de pares; ex0.10.1 |
| 13 | Bit × byte; 1 byte = 8 bits; Mbps ≠ MB/s | MANTIDO | concept, tabela; fc0.10.4; q0.10.7 |
| 14 | Codificação (UTF-8, Base64) ≠ criptografia; Base64 reversível | MANTIDO | concept, tabela; security; q0.10.2; mentor 3 |
| 15 | Largura de banda (nominal) × throughput (vazão útil); fatores que reduzem | MANTIDO | concept, tabela; q0.10.4; decisionTree |
| 16 | Latência × banda; lentidão ≠ falta de banda | MANTIDO | concept, tabela; q0.10.8; ex0.10.2 |
| 17 | Perda e jitter | MANTIDO | concept, tabela (definição nova); fc0.10.7; ex0.10.2 |
| 18 | Conectividade × autorização; HTTP 403 = houve resposta e negação | MANTIDO | concept, tabela; q0.10.6; ex0.10.3; commentedSolution |
| 19 | Protocolo = contrato (formato, ordem, estado, erro, significado) | MANTIDO | internals; concept, tabela |
| 20 | Erros comuns: só reler, confundir pares, pular camadas | MANTIDO | concept, callout (de commonMistakes) |
| 21 | Checklist de prontidão / lacunas de fundamento | MANTIDO | internals (novo; cumpre o objetivo 3); glossary |
| 22 | Onde os fundamentos aparecem na arquitetura (endpoint, meio sujeito a ruído, aplicação, SIEM…) | REMOVIDO | duplicado em internals e simpleExample; genérico |
| 23 | Abrir um site percorre o módulo inteiro; hipóteses de lentidão | MANTIDO | simpleExample |
| 24 | Perguntas de diagnóstico em ordem (sinal → gateway → DNS → porta → protocolo → login → proxy/TLS → logs) | MANTIDO | enterpriseExample |
| 25 | Evitar comprar banda quando é DNS etc. | MANTIDO | enterpriseExample; commentedSolution |
| 26 | Mensagens de pipeline (timeout, TLS, 403, NXDOMAIN, recusada, token) apontam camadas diferentes | MANTIDO | devsecopsExample |
| 27 | Cloud desloca fundamentos; evidências: security groups, endpoints privados, custo de transferência | MANTIDO | devsecopsExample (de cloudExample) |
| 28 | Analista: codificado, texto claro, latência → túnel, volume de saída → exfiltração | MANTIDO | securityExample |
| 29 | Riscos any-any e métrica mal interpretada, com mitigação | MANTIDO | securityExample, tabela |
| 30 | Riscos Base64-como-proteção e evidência sensível | MANTIDO | security.vulnerabilities (linhas da tabela removidas por duplicação) |
| 31 | Sanitizar evidências (tokens, IPs, hosts, dados pessoais) | MANTIDO | security.goodPractices; ex0.10.4 |
| 32 | Comandos Windows/Linux/Cisco e o que provam ou não provam | MANTIDO | troubleshooting.commands (interpretação detalhada) |
| 33 | Árvore de decisão (sem gateway, DNS, porta ok/login falha, download < plano) | MANTIDO | troubleshooting.decisionTree |
| 34 | Limites: revisão não substitui prática; Módulo 0 não ensina Ethernet/IP/TCP a fundo | MANTIDO | challenge.scenario e nextTheme (implícito); o resto de deepDive.limitations foi removido por ser genérico |
| 35 | Limite da analogia | MANTIDO | analogy, 1 frase |
| 36 | Passagem para o Módulo 1 (rede como sistema, topologias, LAN/WAN…) | MANTIDO | nextTheme; diagram |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Revisar os conceitos essenciais sem virar lista decorada | concept (tabelas com exemplo), exercises, mentor, challenge |
| Criar um mapa mental que conecte informação… camadas | internals (cadeia), diagram, summary (modelo mental), fc0.10.1 |
| Identificar lacunas antes de Fundamentos de Redes | internals ("Checklist de prontidão", com a aula de volta), glossary "Lacuna de fundamento" |
| Treinar interpretação de cenários, comandos, evidências e sintomas | troubleshooting (comandos com interpretação, árvore), q0.10.3/6/8, ex0.10.3, challenge |
| Preparar para topologia, enlace, endereço, protocolo, serviço e troubleshooting no Módulo 1 | nextTheme, diagram, challenge (tarefa 5), commentedSolution |

## 10. O que mudou na nova versão
- Removidas `history`, `architecture`, `cloudExample` (fundida em DevSecOps) e as 4 intros invisíveis; `evolution` virou a tabela aula a aula dentro de `concept`.
- `concept` reorganizado: definição primeiro, tabela aula a aula, tabela "Pares que você não pode confundir" (com 100 Mbps → 12,5 MB/s, 1 GB ≥ 80 s, perda e jitter definidos) e callout de erros comuns (de `commonMistakes`).
- `internals` ganhou o "Checklist de prontidão para o Módulo 1", com a aula para onde voltar.
- `summary` começa pelo modelo mental de `deepDive` e traz os pares críticos; `nextTheme` alinhado à aula 1.1.
- `securityExample` sem as linhas duplicadas de `security`; `security` com listas enxutas.
- Troubleshooting: interpretações concretas para Linux (o que cada comando mostra) e Cisco (up/up, administratively down, down/down; `show interfaces status` em switches Catalyst); nota de PowerShell.
- Quiz: q0.10.1 removida; distratores melhores em q0.10.4/5; novas q0.10.7 e q0.10.8; gabarito redistribuído (`quiz_embaralhar`); opção estranha da q0.10.3 reescrita.
- Flashcard fc0.10.2 → fc0.10.7 (perda × jitter); ex0.10.2 ampliado para 5 métricas.
- `<h2>` sem numeração; classes novas só estilizadas (`callout warning`, `responsive-table` + `data-table`).
- `deepDive` e `commonMistakes` removidos depois de aproveitados.
- Aviso do `validar` ("ids de quiz originais ausentes: q0.10.1"): intencional, a questão era trivial (7.7).

## 11. Depois
Palavras visíveis: 3839 → 4107 (+7%; o conteúdo movido de campos invisíveis e o que preenche as lacunas dos outcomes explicam o aumento; cortes brutos de 675 palavras) · Invisíveis: 512 → 44 · Duração: 70-100 min → 70-100 min (T 81 → 82,1; estimatedStudyTimeMinutes 100) · Quiz corrigido: sim (7 questões)

## 12. Revisão humana
- O módulo m00 lista `lab-0.10` em `requiredLabs`, mas a aula 0.10 não tem lab (nem no original). Nenhum lab foi criado. Conferir o arquivo do módulo.
- A questão q0.10.1 foi removida (trivial). Respostas salvas com esse id ficam órfãs. As novas questões usam ids inéditos (q0.10.7, q0.10.8).
- Conteúdo técnico acrescentado para cobrir os learningOutcomes (conferir): 100 Mbps ÷ 8 = 12,5 MB/s e 1 GB (1.000 MB) ≥ 80 s; definições de perda e jitter; interpretação de `show ip interface brief` (up/up, administratively down, down/down) e `show interfaces status` em switches Catalyst; `Test-NetConnection` no PowerShell.
- O subtítulo original prometia "simulado", que não existe na aula. O subtítulo foi ajustado; a tag "simulado" foi mantida.
- O flashcard fc0.10.2 (cópia da questão sobre Base64) foi substituído por fc0.10.7.

```json
{
  "id": "0.10", "modulo": "m00", "tipo": "ligação/revisão", "status": "CONCLUIDA",
  "titulo": "Revisão do Módulo 0",
  "duracao_declarada": "70-100 min", "T_original_min": 81, "duracao_nova": "70-100 min", "T_nova_min": 82.1, "duracao_nova_estimated_max": 100,
  "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 18, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 5, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 3839, "palavras_visiveis_depois": 4107,
  "palavras_invisiveis_antes": 512, "palavras_invisiveis_depois": 44,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "MOVER:concept",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "REMOVER", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "FUNDIR:devsecopsExample",
    "devsecopsExample": "MANTER", "securityExample": "ENXUGAR", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary", "commonMistakes": "MOVER:concept",
    "security": "ENXUGAR", "troubleshooting": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Módulo m00 lista lab-0.10 em requiredLabs, mas a aula não tem lab (nem no original)",
    "q0.10.1 removida (trivial): respostas salvas com esse id ficam órfãs; novas q0.10.7 e q0.10.8",
    "Conferir conteúdo técnico acrescentado: 100 Mbps = 12,5 MB/s e 1 GB >= 80 s; definições de perda e jitter; interpretação de show ip interface brief/show interfaces status; Test-NetConnection no PowerShell",
    "Subtítulo prometia simulado inexistente: ajustado; tag simulado mantida",
    "Flashcard fc0.10.2 substituído por fc0.10.7 (perda × jitter)"
  ]
}
```
