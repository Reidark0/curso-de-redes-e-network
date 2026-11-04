# Aula 0.8 — Como pensar em camadas
Tipo: ligação · Duração declarada: 55-80 min · Palavras visíveis / invisíveis (antes): 3973 / 535

## 1. Duração
T pela fórmula = 75 min (teoria 20,5, diagramas 3, quiz 5, flashcards 2,5, mentor 6, exercícios 18, desafio 20, lab 0)
Veredito: ORGANIZADA. M = 67,5 min = 0,9×T. Teoria é 31% do tempo; o resto vai para exercícios, desafio (runbook em camadas), mentor e quiz, o que faz sentido para uma aula de ligação que treina um método. Não há lab (a aula nunca teve; `progressRules` não exige `labMarkedDone`).

## 2. Encheção de linguiça
Nível: BAIXA (~13%). Evidências:
- `history`: "Redes cresceram a partir de várias tecnologias diferentes…", "A história importante aqui não é decorar sete nomes" — só uma ideia útil (camadas permitem que equipes diferentes trabalhem em partes diferentes).
- `evolution`: "A ideia de camadas evoluiu de modelos rígidos para modelos práticos…" repete o que a tabela já diz; a linha "Ver tudo como 'rede'" repete `problem`.
- `problem`: os 4 bullets ("Sem camadas… Com camadas… Em segurança… Em cloud…") repetem o parágrafo anterior, `cloudExample` e `securityExample`.
- `simpleExample`: o parágrafo "Primeiro verifica… Depois… Depois…" repete a tabela logo abaixo.
- `analogy`: limite da analogia com duas frases longas.
- `devsecopsExample`: "Em DevSecOps, camadas conectam rede, plataforma, identidade, supply chain e política como partes de um mesmo fluxo controlado" (genérica).
- `security.badPractices` "Assumir que VPN…"/"Assumir que HTTPS…" duplicam linhas da tabela de `securityExample`; a linha "ping prova que sistema funciona" da tabela duplica `commonMistakes`/flashcard/quiz.
- 403 aparece em quiz q0.8.4, exercício ex0.8.2 e mentor 2 perguntando quase a mesma coisa; flashcard fc0.8.2 copia o quiz q0.8.2.
- `nextTheme` com 3 frases; `labIntro` é o bloco padrão "Esta aula não possui laboratório independente…" (frase repetida em 39 aulas), invisível.
- Conteúdo útil guardado em campos invisíveis: `commonMistakes` (DNS como bode expiatório, autenticação × autorização) e `deepDive.mentalModel`/`limitations` (objetivo 3).

## 3. Conteúdo útil
FORTE. Valioso: escada de perguntas por camada; encapsulamento num acesso HTTPS (HTTP→TLS→TCP→IP→enlace→físico) e "camadas não são gavetas isoladas"; tabela pergunta→camada→ferramenta; troubleshooting com comandos Windows/Linux/Cisco e árvore de decisão; exemplo cloud concreto (VM privada sem rota para NAT, SG, DNS privado, TLS, 403); exemplo DevSecOps com causas específicas (CA ausente, OIDC audience); tabela de confusões de camada (NAT≠firewall, VPN≠autorização, HTTPS≠identidade).
Lacunas: a aula não distinguia 401 de 403 (os dois numa mesma linha da árvore de decisão), embora o learningOutcome 3 peça para diferenciar falha de autenticação e de permissão; a ideia "modelos são mapas" (objetivo 3) estava quase toda no `deepDive` invisível.
Erros técnicos: o comando Linux usava `curl -vk`; `-k` (`--insecure`) desliga a validação do certificado e esconde a falha de TLS que a própria interpretação diz que o `curl -v` revela (e a aula lista "desativar validação TLS" como má prática). Corrigido para `curl -v`.

## 4. Aproveitamento
BOM — ~93% do T original (75 min) ensina ou pratica os objetivos: a linguiça visível equivale a ~4 min de leitura e duplicações de fixação (~1 min). Contra a duração declarada (M 67,5) a conclusão é a mesma.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~5%. O T é dominado por exercícios, desafio e mentor (44 min), que exercitam o objetivo; a teoria tem ~20 min e a linguiça é baixa.

## 6. Explicação mais direta
SIM — `concept`: definição primeiro, depois as perguntas por camada e a tabela OSI/TCP/IP/camadas operacionais (antes espalhada por `history` e `evolution`); `simpleExample`: parágrafo de procedimento substituído pela tabela (com linha de TLS); `problem` absorve em 1 frase o "por que camadas existem" de `history`; limite da analogia em 1 frase.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantido o chamado vago, o callout do ping/login e a escada de perguntas; cortes de adjetivação. |
| history | FUNDIR:problem | Só o motivo de as camadas existirem (equipes/fabricante não precisa implementar HTTP) foi para `problem`. |
| problem | ENXUGAR | Bullets redundantes removidos; recebe a frase de `history`. |
| evolution | FUNDIR:concept | Tabela OSI/TCP/IP/camadas operacionais condensada em `concept`; linha "ver tudo como rede" já coberta por `problem`. |
| concept | MANTER (ampliado) | Recebe tabela de modelos, `deepDive.limitations` e callout "Erros comuns" (de `commonMistakes`), com 401 × 403. |
| internals | ENXUGAR | Encapsulamento e fluxo mantidos; acrescentado o termo desencapsulamento (de `deepDive.keyTerms`). |
| architecture | ENXUGAR | Lista de componentes por camada mantida (learningOutcome 2); intro reduzida. |
| analogy | ENXUGAR | Analogia mantida; limite em 1 frase. |
| simpleExample | ENXUGAR | Parágrafo redundante cortado; tabela ganhou linha de TLS. |
| enterpriseExample | ENXUGAR | Divisão por equipe mantida; recebe `deepDive.whenNotToUse` (não empurrar o problema para outra equipe). |
| cloudExample | MANTER | Exemplo concreto; recebe a ideia de `commonMistakes` "cloud não é rede tradicional simples". |
| devsecopsExample | ENXUGAR | Causas concretas mantidas; frase genérica final cortada. |
| securityExample | ENXUGAR | Parágrafo de defesa em profundidade mantido; linha do ping movida para os erros comuns do `concept`. |
| diagram | MANTER | SVG correto e legível; só o número do h2 saiu. |
| labIntro | REMOVER | Invisível; bloco padrão "Prática equivalente". |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível; a ideia (ping não prova aplicação) já está em `concept`. |
| summary | ENXUGAR/MANTER | 5 bullets; o primeiro é o `deepDive.mentalModel`. |
| nextTheme | ENXUGAR | 1 frase coerente com "Laboratório integrador do Módulo 0". |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary/concept/internals/enterpriseExample | mentalModel→summary; limitations→concept; keyTerms (desencapsulamento)→internals; whenNotToUse→concept/enterpriseExample; securityImpact já coberto por `security`; whenToUse, operationalImpact e financialImpact genéricos removidos. |
| commonMistakes | MOVER:concept/cloudExample | Ping, DNS e autenticação × autorização → callout "Erros comuns" em `concept`; cloud → `cloudExample`. |
| troubleshooting | ENXUGAR/corrigir | `curl -vk` → `curl -v` com alerta sobre `-k`; linha 401/403 da árvore separada em duas. |
| security | ENXUGAR | Removidas 2 badPractices duplicadas da tabela de `securityExample`; resto mantido. |
| lab | — | Não existe (nem no original). |
| quiz | MANTER + ajustar | Distratores fracos de q0.8.1, q0.8.4 e q0.8.5 trocados; q0.8.4 com resposta reposicionada; novas q0.8.6 (401 × 403) e q0.8.7 (ordem do encapsulamento). 7 questões. |
| flashcards | AJUSTAR | fc0.8.2 (cópia do quiz q0.8.2) removido; novos fc0.8.6 (porta abre, TLS falha) e fc0.8.7 (modelos são mapas). 6 cards. |
| mentorQuestions | AJUSTAR | Pergunta 2 (403, igual ao ex0.8.2 e ao quiz) trocada pelo cenário "funciona no escritório, falha na VPN" (sintoma já listado no troubleshooting). |
| exercises | MANTER | 3 exercícios com expectedAnswer. |
| challenge | MANTER | Runbook em camadas, rubrica de 100 pontos. |
| commentedSolution | MANTER | Passos e respostas erradas comuns específicos. |
| glossary | MANTER | 5 termos, todos usados na aula. |
| references | MANTER | Reais (ISO/IEC 7498-1 e cursos internos). |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | "O sistema não funciona" pode ter dezenas de causas (Wi-Fi, cabo, IP, gateway, DNS, porta, TLS, proxy, API, token, permissão, WAF) | MANTIDO | motivation |
| 2 | Tentativa e erro custa tempo, aumenta risco e mascara incidentes | MANTIDO | motivation |
| 3 | Ping responde mas login falha: ping testa só parte do caminho | MANTIDO | motivation (callout), concept (erros comuns), quiz q0.8.2 |
| 4 | Escada de perguntas (sinal, enlace, endereço, rota, porta, protocolo, aplicação, identidade, política) | MANTIDO | motivation, summary |
| 5 | Um acesso HTTPS envolve Wi-Fi, switch, VLAN, ARP, IP, NAT, firewall, DNS, TCP, TLS, HTTP, cookie, token, sessão, banco, autorização | MANTIDO | problem |
| 6 | Tratar tudo como "a rede" leva a correções erradas (trocar DNS quando é TLS, abrir porta quando era cabeçalho no proxy) | MANTIDO | problem |
| 7 | Camadas permitem que equipes diferentes trabalhem em partes diferentes (placa não implementa HTTP; API não lida com sinal) | MANTIDO | problem |
| 8 | Analista de segurança investiga identidade sem ignorar rede | REMOVIDO | duplicado em enterpriseExample (linguagem comum entre equipes) |
| 9 | OSI: referência didática, sete camadas, nem todo protocolo encaixa | MANTIDO | concept (tabela), quiz q0.8.5 |
| 10 | TCP/IP: base prática da internet, menos detalhada | MANTIDO | concept (tabela) |
| 11 | Camadas operacionais acima da aplicação (identidade, política, observabilidade, automação) | MANTIDO | concept (tabela); "supply chain e governança" REMOVIDO por ser lista genérica |
| 12 | Definição de pensamento em camadas | MANTIDO | concept (definition-box), glossary |
| 13 | Pergunta de cada camada (física, enlace, rede, transporte, aplicação, identidade/segurança) | MANTIDO | concept |
| 14 | Modelos são mapas; componentes multicamada (proxy, NGFW, WAF, service mesh); não substituem logs/captura/métricas | MANTIDO | concept (de deepDive.limitations), fc0.8.7 |
| 15 | Encapsulamento e desencapsulamento | MANTIDO | internals, glossary, quiz q0.8.7 |
| 16 | Ordem HTTP → TLS → TCP → IP → enlace → físico; identidade/política acima | MANTIDO | internals (flow-list), quiz q0.8.7 |
| 17 | Camadas se influenciam (proxy mexe em HTTP, firewall bloqueia TCP, físico gera retransmissão, certificado impede aplicação, política nega com rede saudável) | MANTIDO | internals |
| 18 | Componentes por camada (físicos, lógicos, transporte/aplicação, segurança) | MANTIDO | architecture |
| 19 | Analogia da entrega de documento e seus limites | MANTIDO | analogy |
| 20 | Tabela pergunta → camada → ferramenta (ipconfig, ip addr, ip route, nslookup, dig, Test-NetConnection, curl -v) | MANTIDO | simpleExample (+ linha TLS) |
| 21 | Linguagem comum entre equipes (rede, segurança, identidade, aplicação, plataforma) | MANTIDO | enterpriseExample |
| 22 | Não usar camadas para empurrar responsabilidade sem validar | MANTIDO | enterpriseExample (de deepDive.whenNotToUse) |
| 23 | Cloud: route table, SG, NSG, DNS privado, endpoint privado, NAT GW, LB, WAF, API GW, IAM | MANTIDO | cloudExample, fc0.8.4 |
| 24 | VM privada → API externa: NAT, SG, DNS privado, TLS, 403 | MANTIDO | cloudExample, mentor 3 |
| 25 | Conectividade, exposição e permissão são diferentes | MANTIDO | cloudExample (callout) |
| 26 | Pipeline/registry: DNS, 443, proxy, CA ausente, autenticação, política de push, scanner | MANTIDO | devsecopsExample |
| 27 | Correções ruins: segredo estático em vez de corrigir OIDC audience; saída irrestrita em vez de proxy | MANTIDO | devsecopsExample |
| 28 | Defesa em profundidade: TLS, firewall, MFA, segmentação não se substituem | MANTIDO | securityExample, security, quiz q0.8.3, fc0.8.5, glossary |
| 29 | Confusões: NAT≠firewall, VPN≠autorização, HTTPS≠identidade (risco e mitigação) | MANTIDO | securityExample (tabela) |
| 30 | Culpar DNS por qualquer falha | MANTIDO | concept (erros comuns, de commonMistakes) |
| 31 | Autenticação × autorização; 401 × 403 | MANTIDO | concept, troubleshooting.decisionTree, quiz q0.8.6, fc0.8.3, glossary |
| 32 | Perguntas diagnósticas e comandos Windows/Linux/Cisco com interpretação | MANTIDO | troubleshooting (curl -vk corrigido) |
| 33 | Árvore de decisão (link, gateway, porta 443, TLS: certificado/SNI/CA/inspeção/versão, 401, 403) | MANTIDO | troubleshooting, fc0.8.6 |
| 34 | Liberação excessiva durante troubleshooting; mudanças temporárias com expiração | MANTIDO | security.vulnerabilities |
| 35 | Monitoramento e detecção (fluxos negados, erros TLS, 401/403/429/5xx, correlação com mudanças) | MANTIDO | security |
| 36 | Runbook de primeira resposta em camadas | MANTIDO | challenge, commentedSolution |
| 37 | deepDive.operationalImpact / financialImpact / whenToUse | REMOVIDO | genéricos, sem informação específica do tema; invisíveis |
| 38 | Frase "VPN significa autorização ampla" / "HTTPS torna aplicação segura" em badPractices | REMOVIDO | duplicado na tabela de securityExample |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que pensar em camadas reduz confusão em redes, cloud, segurança e DevSecOps | motivation, problem, cloudExample, devsecopsExample, securityExample, mentor 1 |
| Diferenciar física, enlace, rede, transporte, aplicação, identidade e políticas num diagnóstico | concept, internals, architecture, simpleExample, diagram, troubleshooting, quiz q0.8.4/q0.8.6 |
| Entender que modelos em camadas são mapas mentais, não a realidade completa | concept ("Modelos são mapas…"), internals ("não são gavetas isoladas"), quiz q0.8.5, fc0.8.7 |
| Aplicar sequência simples de troubleshooting antes de culpar DNS, firewall ou aplicação | simpleExample, concept (erros comuns), troubleshooting, exercícios, challenge, commentedSolution |
| Preparar para o Módulo 1 e o Modelo OSI do Módulo 2 | concept (OSI × TCP/IP), motivation, nextTheme |

## 10. O que mudou na nova versão
- `history` e `evolution` removidos: a razão de existirem camadas foi para `problem` e a tabela OSI/TCP/IP/camadas operacionais para `concept`.
- `concept` ganhou o conteúdo invisível de `deepDive.limitations` (modelos são mapas) e um callout "Erros comuns" (de `commonMistakes`), incluindo a diferença 401 × 403.
- `summary` abre com o modelo mental (`deepDive.mentalModel`) e tem 5 bullets.
- Corrigido `curl -vk` → `curl -v` no troubleshooting Linux, com alerta sobre `-k`; árvore de decisão separa 401 e 403.
- Removidos `labIntro`, `exercisesIntro`, `challengeIntro`, `solutionIntro`, `deepDive` e `commonMistakes`.
- Quiz: distratores implausíveis trocados ("velocidade do monitor", "sempre culpar o firewall"…); duas questões novas (q0.8.6, q0.8.7); gabarito distribuído (0,1,2,1,0,3,2).
- Flashcard fc0.8.2 (cópia do quiz) trocado por fc0.8.6 e fc0.8.7; mentor 2 trocado pelo cenário VPN para não repetir o caso 403.
- `duration` 55-80 → 65-90 min; `estimatedStudyTimeMinutes` 80 → 90 (faixa recomendada da nova versão; o aumento vem das 2 questões e 1 flashcard extras).

## 11. Depois
Palavras visíveis: 3973 → 4182 (+5%; cortes brutos 460 = 12%, acréscimos 669, quase todos de conteúdo movido de campos invisíveis e das novas questões) · Invisíveis: 535 → 43 · T: 75 → 76,6 min · Duração: 55-80 min → 65-90 min · Quiz corrigido: sim (7 questões)

## 12. Revisão humana
- O módulo m00 lista `lab-0.8` em `assessment.requiredLabs`, mas a aula 0.8 não tem lab (o original também não tinha; `progressRules` não exige lab). Não alterei o arquivo do módulo: decidir se remove `lab-0.8` da lista ou se a aula deve ganhar um lab.
- Correção técnica aplicada: `curl -vk` → `curl -v` (o `-k` desliga a validação do certificado e contradiz a interpretação do próprio comando). Confirmar.
- Acréscimo: distinção 401 (credencial ausente/inválida) × 403 (pedido entendido e recusado; para usuário autenticado, autorização), em concept, árvore de decisão e quiz q0.8.6. Semântica padrão do HTTP, mas é conteúdo novo; confirmar a redação.

```json
{
  "id": "0.8", "modulo": "m00", "tipo": "ligação", "status": "CONCLUIDA",
  "titulo": "Como pensar em camadas",
  "duracao_declarada": "55-80 min", "T_original_min": 75, "duracao_nova": "65-90 min", "veredito_duracao": "ORGANIZADA",
  "T_nova_min": 76.6, "duracao_nova_estimated_max": 90,
  "linguica_nivel": "BAIXA", "linguica_pct": 13, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 5, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 3973, "palavras_visiveis_depois": 4182,
  "palavras_invisiveis_antes": 535, "palavras_invisiveis_depois": 43,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "FUNDIR:concept",
    "concept": "MANTER", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "ENXUGAR", "enterpriseExample": "ENXUGAR", "cloudExample": "MANTER", "devsecopsExample": "ENXUGAR",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary/concept/internals/enterpriseExample", "commonMistakes": "MOVER:concept/cloudExample",
    "troubleshooting": "ENXUGAR", "security": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Módulo m00 lista lab-0.8 em requiredLabs, mas a aula não tem lab (nem no original); arquivo do módulo não alterado.",
    "Correção curl -vk -> curl -v no troubleshooting Linux (-k esconde a falha de TLS); confirmar.",
    "Acréscimo da distinção 401 x 403 (concept, decisionTree, quiz q0.8.6); confirmar redação."
  ]
}
```
