# Aula 1.10 — Revisão e mini-projeto: mapear sua rede
Tipo: ligação/revisão (mini-projeto de fechamento do Módulo 1) · Duração declarada: 70-105 min · Palavras visíveis / invisíveis (antes): 4094 / 462

## 1. Duração
T pela fórmula = 183,5 min (teoria 16,5, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 105)
Veredito: **SUBESTIMADA** — M = 87,5 min < 0,8×T (146,8). A faixa declarada equivale só ao lab (105 min), sem contar quiz, exercícios e desafio. Mesmo com o lab corrigido para um valor coerente com os passos (60 min, ver seção 10), T = 138 min e M continua abaixo de 0,8×T. A distribuição (≈ 57% lab, 11% leitura) faz sentido para um mini-projeto; o problema é o total, não o equilíbrio. O lab de 105 min para 10 passos (5 deles com um único comando) é alto: 5 passos de comando (~3 min cada) + escopo (~5) + 4 passos de documentação (~10 cada) ≈ 60 min. O polimento do relatório fica a cargo do desafio, que tem 20 min próprios.

## 2. Encheção de linguiça
Nível: **MÉDIA (~18%)**. Evidências:
- `motivation`: o primeiro parágrafo é uma recapitulação de 60 palavras ("Depois de aprender o que é uma rede, quais dispositivos participam dela, quais tipos de rede existem…").
- `history`: "As primeiras redes eram pequenas o suficiente…", "Surgiram diagramas físicos, diagramas lógicos, inventários…, CMDBs" — história que não ajuda a montar o mapa. Só a ideia "o desenho mostra um firewall, mas não mostra regras" ensina algo (foi para `problem`).
- `evolution`: tabela de cinco abordagens (desenho informal → observabilidade) fora do objetivo da aula.
- `cloudExample` ("o aluno ainda não precisa dominar todos esses serviços agora, mas deve reconhecer que cloud também é rede") e `devsecopsExample` ("mapear rede evita pipelines frágeis") repetem os bullets de cloud/DevSecOps de `problem`.
- `architecture` e `summary` repetem o `nextTheme` ("Essas quatro visões preparam o aluno para o Módulo 2…", "O Módulo 1 prepara a base prática para o Modelo OSI").
- `securityExample`: o parágrafo de abertura lista os mesmos riscos da tabela logo abaixo.
- `analogy`: o limite da analogia ocupa 35 palavras.
- `security`: duplicatas internas ("Separar Wi-Fi visitante" × "Wi-Fi visitante isolado"; "Documentação com controle de acesso" × "Guardar mapas internos… com controle de acesso"; "Manter racks sem controle físico" × "Controle físico de racks"; "Ignorar dispositivos não identificados" × "Documentar ativos desconhecidos").
- `lab`: frase-padrão de 56 aulas no passo 7 ("Produza o artefato indicado na instrução do passo e registre a evidência objetiva…"); `safetyNotes` ritual ("Este laboratório é defensivo e documental"); `lab.challenge` e `lab.solution` repetem `challenge` e `commentedSolution`.
- `challenge`: as tarefas são exatamente os passos do lab (escopo, inventário, mapa físico, mapa lógico, evidências, métricas, riscos), ou seja, o aluno refaria o lab.
- Quiz/flashcards triviais: q1.10.3 (distratores "format c:", "whoami", "mkdir"), q1.10.6 ("Modelo OSI" × "Criptomoedas", "Edição de vídeo"), fc1.10.6 ("Qual módulo vem depois?"); fc1.10.4 repete a q1.10.4; ex1.10.1 (físico × lógico) repete fc1.10.1/fc1.10.2 e q1.10.2.
- Campos invisíveis com conteúdo valioso: `deepDive.limitations` (limites de ARP, tracert e comandos locais), `deepDive.mentalModel` e `commonMistakes` (4 erros específicos).

## 3. Conteúdo útil
**PARCIAL.** De valioso: as quatro visões (física, lógica, operacional, segurança); a sequência ordenada de perguntas do host para fora; a tabela de riscos com mitigação; a árvore de decisão do troubleshooting; o lab executável com comandos Windows/Linux e a sanitização (192.168.1.23 → 192.168.x.23); a rubrica do desafio.
Lacunas: (1) a aula pede um inventário classificado (objetivos 2 e 3), mas não mostra nenhum exemplo de inventário nem de classificação final/intermediário/serviço; nenhuma questão ou exercício pratica essa classificação; (2) os limites de cada evidência (ARP local, asteriscos no tracert, regras de firewall invisíveis) estavam só no `deepDive`, que o aluno não vê; (3) a diferença entre fato, hipótese e lacuna, exigida nas restrições do desafio, não era explicada no conteúdo.
Erros técnicos: o comando Windows do troubleshooting usava `&&` ("ipconfig /all && arp -a && …"), que não funciona no Windows PowerShell 5.1, o terminal indicado no lab. Interpretações vazias de sentido nos comandos ("Compare com a documentação esperada", "Use apenas em equipamentos sob autorização").

## 4. Aproveitamento
**BOM (~87%)** contra o T original (183,5 min). Desperdícios: o desafio refazia o lab (~15 min), duas questões e um flashcard triviais (~2 min), leitura de history/evolution/exemplos por ambiente (~3 min), exercício repetido (~3 min). Contra a duração declarada (87,5 min), a comparação nem fecha: só o lab já consome a faixa toda. Ressalva: os 105 min declarados do lab estão inflados para os passos descritos, então parte do tempo "útil" é estimativa folgada, e não prática.

## 5. Pode ser mais curta?
**SIM** — redução prevista de T: −25% (183,5 → 138 min). A redução vem principalmente da correção do tempo do lab (105 → 60 min), além do desafio, que agora reaproveita o relatório do lab em vez de refazê-lo. A leitura fica praticamente igual (16,5 → 16,3 min): os cortes de história, evolução e exemplos por ambiente foram compensados pelo conteúdo movido dos campos invisíveis (limites das evidências, erros comuns, modelo mental).

## 6. Explicação mais direta
**SIM.**
- `internals`: a lista de seis perguntas virou uma tabela "Etapa · O que registrar · Evidência (Windows · Linux) · Limite da evidência". Ela junta os passos, os comandos do lab e os limites do `deepDive`.
- `concept`: o parágrafo que repetia a definição foi trocado pelo modelo mental (fato × hipótese × lacuna) e pelos erros comuns.
- `simpleExample`: a prosa "notebook no Wi-Fi, celular no Wi-Fi…" virou um inventário em tabela, classificado e sanitizado.
- `motivation`: a recapitulação de 60 palavras caiu para uma frase.
- `history`, `evolution`, `cloudExample` e `devsecopsExample`: o que ensinava algo foi fundido em `problem` e `architecture`, em 1–2 frases cada.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Recapitulação reduzida a 1 frase; mantidos o "não é desenhar caixinhas" e o callout do problema real; `deepDive.whenToUse` entrou em 1 frase |
| history | FUNDIR:problem | Só "o desenho mostra firewall mas não regras…" ensina algo; o resto é história |
| problem | ENXUGAR | Recebeu a ideia do mapa só visual (history); bullets encurtados; os bullets de cloud/DevSecOps ficam no lugar das seções removidas |
| evolution | REMOVER | Fora do objetivo; a menção a descoberta por ferramenta (SNMP, com permissão) e a documentação como código ficou em 1 frase de `architecture` |
| concept | ENXUGAR | Definição mantida; parágrafo redundante trocado pelo modelo mental (deepDive) e por um callout de erros comuns (commonMistakes) |
| internals | MANTER | Núcleo; virou tabela com comandos e limites das evidências (deepDive.limitations) |
| architecture | MANTER | Quatro visões; recebeu o essencial de cloudExample; a frase sobre o Módulo 2 saiu (dup de nextTheme) |
| analogy | ENXUGAR | Analogia mantida; limite em 1 frase |
| simpleExample | MANTER | Virou um inventário em tabela, classificado e sanitizado, com evidências; mantido o raciocínio de hipóteses |
| enterpriseExample | ENXUGAR | Segundo parágrafo genérico encurtado; mantida a "dependência de uma pessoa" e o caso do Wi-Fi visitante |
| cloudExample | FUNDIR:architecture | Lista de objetos lógicos de cloud em 1 frase |
| devsecopsExample | REMOVER | Repetia o bullet DevSecOps de `problem`, que fica |
| securityExample | ENXUGAR | Parágrafo de abertura reduzido; o que só existia nele (caminho sem firewall, sem logs, sem redundância) virou uma linha da tabela |
| diagram | MANTER | Correto e legível; só o `<h2>` sem número |
| labIntro | REMOVER | Invisível |
| exercisesIntro | REMOVER | Invisível |
| challengeIntro | REMOVER | Invisível |
| solutionIntro | REMOVER | Invisível |
| summary | ENXUGAR | 5 bullets; o 1º une "rede como sistema" com o modelo mental; o bullet do Módulo 2 trocado por sanitização e autorização |
| nextTheme | ENXUGAR | 2 frases, com o título real da 2.1 |
| security | ENXUGAR | Duplicatas internas removidas; vulnerabilidades, erros comuns e monitoramento mantidos |
| troubleshooting | MANTER | Árvore de decisão mantida; comando Windows corrigido (`&&` → uma linha por comando); interpretações reescritas para dizer o que observar |
| lab | ENXUGAR | Passos e comandos mantidos; data da coleta (passo 2), latência/perda (passo 4) e classificação (passo 7, no lugar da frase-padrão); safetyNote ritual, `lab.challenge` e `lab.solution` removidos (dup de challenge/commentedSolution); perguntas 5→4; `estimatedTimeMinutes` 105→60 |
| quiz | ENXUGAR | 6 questões; q1.10.3 e q1.10.6 (triviais) trocadas por q1.10.7 (árvore de decisão) e q1.10.8 (limite do ARP) |
| flashcards | ENXUGAR | 6; fc1.10.4 (cópia do quiz) e fc1.10.6 (trivial) trocados por fc1.10.7 (como sanitizar) e fc1.10.8 (fato/hipótese/lacuna) |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, boas |
| exercises | ENXUGAR | 4; ex1.10.1 (repetido) trocado por ex1.10.5 (classificar final/intermediário/serviço/meio e visão física/lógica) |
| challenge | ENXUGAR | Reenquadrado para partir do relatório do lab (não refazê-lo); tarefas focadas em fato/hipótese/lacuna, priorização e sanitização; rubrica, restrições e entregáveis mantidos |
| commentedSolution | MANTER | `finalAnswer` recebeu o que vinha de `lab.solution` ("não promete ter descoberto tudo") |
| glossary | MANTER | 5 termos, todos usados na aula |
| references | MANTER | Reais |
| linksToOtherCourses | MANTER | — |
| networkContext | MANTER | Metadado |
| deepDive | MOVER:concept/internals/motivation/summary | mentalModel → concept + summary; limitations → internals; whenToUse → motivation; whenNotToUse, operational/financial/securityImpact e keyTerms duplicavam security, problem e glossary (removidos) |
| commonMistakes | MOVER:concept | Callout "Erros comuns" com os 4 itens |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Mapear não é desenhar caixinhas: é visão técnica com evidências e riscos | MANTIDO | motivation |
| 2 | Problema real: empresa sem inventário; mapear antes de comprar/culpar provedor | MANTIDO | motivation (callout) |
| 3 | Sintoma enganoso: parece aplicação e é DNS, parece internet e é gateway etc. | MANTIDO | problem |
| 4 | Não se protege o que não se conhece | MANTIDO | problem |
| 5 | Documentação só visual: firewall sem regras, switch sem portas/VLANs, servidor sem dono | MANTIDO | problem (vindo de history) |
| 6 | Impactos operacional, segurança, custo, cloud, DevSecOps | MANTIDO | problem |
| 7 | Dependência de uma pessoa que "sabe onde tudo está" | MANTIDO | enterpriseExample |
| 8 | Definição de mapa de rede (físico, lógico, inventário, papéis, serviços, endereçamento, métricas, riscos) | MANTIDO | concept (definition-box) |
| 9 | Mapa como hipótese documentada: o que sabe, como sabe, limites | MANTIDO | concept + summary (de deepDive.mentalModel) |
| 10 | Fato × hipótese × lacuna | MANTIDO | concept, fc1.10.8, glossary, challenge |
| 11 | Sequência host → vizinhança → serviços → caminho → métricas → riscos | MANTIDO | internals (tabela) |
| 12 | O que registrar do host: nome, sistema, interface, IP, máscara, gateway, DNS, tipo de conexão | MANTIDO | internals |
| 13 | Métricas: latência, perda, jitter aproximado, throughput percebido, disponibilidade | MANTIDO | internals |
| 14 | Riscos típicos: Wi-Fi fraco, porta exposta, DNS suspeito, rede plana, sem redundância | MANTIDO | internals, securityExample |
| 15 | ARP só mostra vizinhança local recente | MANTIDO | internals, q1.10.8 (de deepDive) |
| 16 | tracert pode omitir saltos que não respondem ICMP (asteriscos) | MANTIDO | internals, q1.10.5, lab.troubleshooting |
| 17 | Comandos locais não mostram políticas de firewall | MANTIDO | internals (de deepDive) |
| 18 | Mapas ficam obsoletos; DHCP/Wi-Fi/rotas mudam → data e origem | MANTIDO | internals, analogy, fc1.10.3 |
| 19 | Quatro visões: física, lógica, operacional, segurança | MANTIDO | architecture |
| 20 | Cloud: VPC/VNet, subnets, route tables, SG/NSG, NAT GW, LB, DNS privado, VPN, peering como objetos lógicos | MANTIDO | architecture (de cloudExample) |
| 21 | Descoberta por ferramenta (SNMP/agentes) exige permissão; documentação como código | MANTIDO | architecture (de evolution) |
| 22 | Evolução detalhada (desenho informal → observabilidade) | REMOVIDO | fora do escopo da aula (história) |
| 23 | Lista de dependências do runner (registry, scanner, vault…) | REMOVIDO | duplicado no bullet DevSecOps de problem; detalhe de outro curso |
| 24 | Exemplo doméstico: dispositivos, roteador como gateway, DNS via DHCP, sintomas e hipóteses | MANTIDO | simpleExample (tabela + parágrafo) |
| 25 | Roteador doméstico acumula papéis (gateway, AP, NAT); classificar por papel | MANTIDO | simpleExample, ex1.10.5, lab.troubleshooting, security.commonErrors |
| 26 | Exemplo empresarial: financeiro, Wi-Fi visitante/corporativo, servidor de arquivos, DNS/DHCP | MANTIDO | enterpriseExample |
| 27 | Tabela de riscos: rede plana, ativo desconhecido, Wi-Fi visitante, evidência vazada | MANTIDO | securityExample |
| 28 | Caminho sem firewall/logs/redundância como risco | MANTIDO | securityExample (linha nova, vinda do parágrafo) |
| 29 | Erros comuns: desenho sem evidência, misturar físico/lógico, não sanitizar, causa com uma evidência | MANTIDO | concept (de commonMistakes) |
| 30 | Sanitização: 192.168.1.23 → 192.168.x.23; nome interno → host-A | MANTIDO | lab passo 10, fc1.10.7, glossary |
| 31 | Mapa interno é documento sensível (reconhecimento ofensivo) | MANTIDO | q1.10.4, security.vulnerabilities, summary |
| 32 | NAT não substitui firewall; conectividade ≠ autorização; ICMP sem resposta ≠ queda | MANTIDO | security |
| 33 | Monitoramento: DNS/gateway via DHCP, novos dispositivos ARP/DHCP, conexões entre redes isoladas | MANTIDO | security.monitoring |
| 34 | Comandos Windows/Linux/Cisco IOS de coleta | MANTIDO | troubleshooting.commands (Windows corrigido) |
| 35 | Árvore de decisão: sem IP → DHCP…; sem gateway → meio/VLAN…; DNS falha; serviço não abre | MANTIDO | troubleshooting.decisionTree, q1.10.7 |
| 36 | Lab de 10 passos: escopo, coleta, vizinhança, alcance, caminho, DNS, físico, lógico, riscos, sanitização | MANTIDO | lab |
| 37 | Escopo autorizado; nada de varredura sem permissão | MANTIDO | lab, challenge.constraints, security.badPractices |
| 38 | Rubrica 20/25/25/20/10 | MANTIDO | challenge.gradingRubric |
| 39 | Ativo desconhecido: registrar, acionar o dono, verificar DHCP/logs, NAC | MANTIDO | mentorQuestions[2], security.vulnerabilities |
| 40 | IP funciona e nome falha → DNS/filtro | MANTIDO | mentorQuestions[1], simpleExample |
| 41 | `ipconfig /all` mostra gateway e DNS | MANTIDO | fc1.10.5, internals, simpleExample (a q1.10.3 trivial saiu) |
| 42 | Próximo: Modelo OSI organiza o diagnóstico por camadas | MANTIDO | nextTheme (q1.10.6 e fc1.10.6 triviais saíram) |
| 43 | Impactos financeiros/operacionais do deepDive | REMOVIDO | duplicados em problem (custo, operação) |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Revisar os principais conceitos do Módulo 1 | motivation (lista do que se aplica), internals (comandos da 1.9), simpleExample/ex1.10.5 (papéis de equipamentos, meios), summary |
| Criar um mapa físico e lógico de uma rede pequena | architecture, lab passos 7–8, challenge, q1.10.2, fc1.10.1/2 |
| Classificar dispositivos finais, intermediários e serviços | simpleExample (inventário classificado), ex1.10.5, lab passo 7, challenge.tasks |
| Registrar meios, topologias, equipamentos, métricas e evidências | internals (tabela), lab passos 2–6, simpleExample, fc1.10.3 |
| Identificar riscos iniciais de segurança e operação | securityExample, security, lab passo 9, ex1.10.4, mentor 3 |
| Preparar a transição para o Modelo OSI | nextTheme, diagram, challenge.expectedDeliverables (checklist de prontidão) |

## 10. O que mudou na nova versão
- Removidas as seções `history`, `evolution`, `cloudExample`, `devsecopsExample` e as 4 intros invisíveis; o que ensinava algo foi fundido em `problem` e `architecture`.
- Movidos dos campos invisíveis: `deepDive.mentalModel` (concept, summary), `deepDive.limitations` (coluna "Limite" de internals), `deepDive.whenToUse` (motivation), `commonMistakes` (callout em concept). Os dois campos foram removidos.
- `internals` em tabela com comandos Windows/Linux e limites; `simpleExample` em inventário tabelado.
- Lab: `estimatedTimeMinutes` 105 → 60 (5 passos de um comando ~3 min, escopo ~5 min, 4 passos de documentação ~10 min); frase-padrão do passo 7 trocada por uma instrução concreta; data da coleta no passo 2; `lab.challenge`/`lab.solution` removidos (dup).
- Troubleshooting: o comando Windows passou de `&&` para uma linha por comando (o `&&` não funciona no Windows PowerShell 5.1); as interpretações agora dizem o que observar.
- `duration` 70-105 → 120-165 min e `estimatedStudyTimeMinutes` 105 → 165, pela faixa recomendada da nova versão (T = 138,3).
- Acréscimos que não são conteúdo movido (quantidades de quiz/flashcards/exercícios inalteradas: 6/6/4):
  - **Inventário classificado em `simpleExample`** (colunas Tipo/Evidência, IPs sanitizados 192.168.x.23/x.1): cobre os objetivos "Classificar dispositivos finais, intermediários e serviços" e o resultado "cria um inventário inicial", que não tinham nenhum exemplo. Usa só os dispositivos do texto original.
  - **ex1.10.5** (classificação), no lugar de ex1.10.1: nenhum item de prática exercitava o objetivo de classificação.
  - **q1.10.7 e q1.10.8**, no lugar das triviais q1.10.3/q1.10.6: testam a árvore de decisão e o limite do ARP, que já estão no conteúdo.
  - **fc1.10.7 e fc1.10.8**, no lugar de fc1.10.4 (cópia do quiz) e fc1.10.6 (trivial).
  - **Frases de limite** "mostra só o host onde você rodou" e "teste rápido pode não reproduzir sintoma intermitente" (esta última derivada de `troubleshooting.symptoms`): completam a coluna de limites da tabela e cobrem o resultado "relaciona métricas e comandos" com o cuidado de interpretação.
  - **Desafio reenquadrado** para partir do relatório do lab: elimina a duplicação de tarefas sem baixar a rubrica.

## 11. Depois
Palavras visíveis: 4094 → 4252 (+3,9%; ~220 palavras vieram dos campos invisíveis, então o texto próprio caiu ~1,5%) · invisíveis 462 → 50 (networkContext) · Duração: declarada 70-105 min (T 183,5) → 120-165 min (T 138,3) · Quiz corrigido: sim (6 questões, formato padrão; 2 trocadas).
`validar`: OK, 1 aviso — "ids de quiz originais ausentes: q1.10.3, q1.10.6". Justificativa: as duas foram substituídas por serem triviais (7.7); as novas usam ids inéditos (q1.10.7, q1.10.8).
Conferência com o `comparar`: cortes brutos de 534 palavras (13%), coerentes com a linguiça estimada (~18%, parte dela reescrita em vez de cortada). As frases do `--sumiram` foram conferidas: estão cobertas de outra forma ou aparecem no inventário como REMOVIDAS (itens 22, 23 e 43).

## 12. Revisão humana
- `lab.estimatedTimeMinutes` reduzido de 105 para 60 por estimativa própria (ver seção 1). Mesmo assim, a `duration` sobe de 70-105 para 120-165 min, porque a fórmula soma quiz, exercícios e desafio. Confirmar se essa faixa é aceitável para a aula de fechamento do módulo.
- `nslookup exemplo.com` (lab passo 6, troubleshooting, internals): não consegui verificar se `exemplo.com` resolve (sem DNS no ambiente). Mantive o original. Se ele não resolver, o aluno recebe NXDOMAIN no passo cujo resultado esperado é "nome resolvido". `example.com` é reservado para documentação e resolve; avaliar a troca em todo o curso.
- Comando Windows corrigido de `&&` para uma linha por comando (o `&&` falha no Windows PowerShell 5.1 e funciona no cmd e no PowerShell 7).
- `challenge.expectedDeliverables` pede um "Checklist de prontidão para o Módulo 2" que a aula não define (mantido do original).
- O progresso salvo das questões removidas (q1.10.3, q1.10.6) deixa de contar.

```json
{
  "id": "1.10", "modulo": "m01", "tipo": "ligação/revisão", "status": "CONCLUIDA",
  "titulo": "Revisão e mini-projeto: mapear sua rede",
  "duracao_declarada": "70-105 min", "T_original_min": 183.5, "duracao_nova": "120-165 min", "veredito_duracao": "SUBESTIMADA",
  "T_nova_min": 138.3, "duracao_nova_estimated_max": 165,
  "linguica_nivel": "MÉDIA", "linguica_pct": 18, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": true, "reducao_tempo_pct": 25, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4094, "palavras_visiveis_depois": 4252,
  "palavras_invisiveis_antes": 462, "palavras_invisiveis_depois": 50,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "MANTER", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "FUNDIR:architecture",
    "devsecopsExample": "REMOVER", "securityExample": "ENXUGAR", "diagram": "MANTER",
    "labIntro": "REMOVER", "exercisesIntro": "REMOVER", "challengeIntro": "REMOVER", "solutionIntro": "REMOVER",
    "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR",
    "flashcards": "ENXUGAR", "mentorQuestions": "MANTER", "exercises": "ENXUGAR", "challenge": "ENXUGAR",
    "commentedSolution": "MANTER", "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER",
    "networkContext": "MANTER", "deepDive": "MOVER:concept/internals/motivation/summary", "commonMistakes": "MOVER:concept"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.estimatedTimeMinutes 105 -> 60 por estimativa própria; duration sobe para 120-165 min pela fórmula",
    "nslookup exemplo.com não verificado (pode não resolver); avaliar example.com no curso todo",
    "Comando Windows do troubleshooting corrigido de && para uma linha por comando (PowerShell 5.1)",
    "Checklist de prontidão para o Módulo 2 pedido no desafio não é definido na aula",
    "Progresso salvo de q1.10.3 e q1.10.6 (substituídas) deixa de contar"
  ]
}
```
