# Aula 4.2 — Estrutura do endereço IPv4 e octetos
Tipo: fundamental · Duração declarada: 95-135 min · Palavras visíveis / invisíveis (antes): 3981 / 738

## 1. Duração
T pela fórmula = 120,1 min (teoria 17,9, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 40,2)
Veredito: ORGANIZADA. M = 115 cai em [0,8×T ; 1,2×T]. Observação: o `lab.estimatedTimeMinutes` = 120 não é plausível para 7 passos de leitura e conversão (a fórmula usou a alternativa, 40,2 min). Dois dos sete passos eram a mesma tarefa em outra plataforma (Windows/Linux, PowerShell/Python). Teoria = 17% do tempo, adequado a uma aula fundamental com muita prática.

## 2. Encheção de linguiça
Nível: MÉDIA (~19%). Evidências:
- `history`, `problem` e `evolution` explicam três vezes a mesma ideia ("32 bits difíceis para humanos → decimal pontuado"); `history` termina com lista genérica ("passou a aparecer em roteadores, firewalls, servidores, logs, … pipelines").
- `concept` repete a própria frase: "Como 8 bits permitem 256 combinações, cada octeto pode variar de 0 a 255" e, um parágrafo depois, "Cada bloco pode ir de 0 a 255 porque 8 bits permitem 256 combinações"; `internals` repete "não é composto por 'números com pontos'"; `simpleExample` repete a conversão de 192.168.10.25 já dada em `concept`.
- `architecture`: lista genérica de onde o IP aparece ("hosts armazenam IP… SIEM correlaciona eventos por IP").
- `devsecopsExample`: lista de ferramentas ("Terraform, Helm values, manifests Kubernetes…", "CNI, Service CIDR, Pod CIDR") sem ensinar nada de octetos além de uma frase.
- `securityExample` sobrepõe `security` e `deepDive.securityImpact` (allowlist ampla, IP como identidade).
- `troubleshooting.commands` repetia, com as mesmas saídas, os comandos PowerShell e Python dos passos 4 e 5 do lab.
- Exercício ex4.2.3 (10.20.30.400) repete quiz q4.2.3, mentor 2, lab passo 6 e desafio (192.168.1.300); ex4.2.1 ("explique por que 172.16.5.10 possui quatro octetos") é trivial.
- Quiz q4.2.6 com distratores absurdos ("Para escolher a cor do dashboard"); q4.2.5 idem ("Porque IPv4 não tem números").
- 738 palavras em campos invisíveis (deepDive, commonMistakes, protocolFields, packetFlow, intros).
- Frases repetidas entre aulas (`frases_repetidas.js`): só 2, ambas com conteúdo técnico ("separa bits de rede e bits de host", "uma regra permitindo 10.0.0.0/8"); não são linguiça.

## 3. Conteúdo útil
PARCIAL. Valioso: definição correta de octeto e limite 0–255, tabela das quatro representações, fluxo interno (validar → converter → aplicar máscara → rota), exemplo /24 doméstico não universal, 10.10.20.45 × 10.10.200.45, comandos com saídas reais, lab executável, desafio bom. Lacunas: o objetivo "Converter octetos simples entre decimal e binário" não era ensinado. A aula mostrava só os resultados (192 = 11000000…) e scripts, sem os pesos dos bits nem o método, e não tinha nenhum exercício de binário → decimal. Os erros comuns e os campos do cabeçalho (Source/Destination Address, 32 bits) estavam só em campos invisíveis. Erros técnicos: nenhum.

## 4. Aproveitamento
MÉDIO (~78% contra o T original de 120 min). Cerca de 26 min iam para repetição: ~5 min de teoria redundante ou genérica, 6 min do exercício redundante, ~6 min do exercício trivial, ~8–10 min de passos de lab duplicados por plataforma e ~1–2 min em quiz e flashcards copiados. Contra a duração declarada (M = 115) a proporção é a mesma. O `lab.estimatedTimeMinutes` de 120 sozinho já prometia o dobro do T inteiro de prática.

## 5. Pode ser mais curta?
SIM. Redução prevista ≈ 15% (obtida: 120,1 → 102,3 min, −14,8%), sem perder nenhum item do inventário.

## 6. Explicação mais direta
SIM.
- `history` + `problem` + `evolution`: viram um único `problem` curto, e a tabela de representações vai para `concept`.
- `concept`: definição com 2^8 = 256 uma vez só.
- `internals`: tabela de pesos (128…1) com dois exemplos resolvidos, nos dois sentidos, no lugar de só listar resultados.
- Erros comuns (antes invisíveis) num callout logo após o mecanismo.
- `internals`: o fluxo passa a citar a falha típica de cada etapa (vinda de `packetFlow`).

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | 1 parágrafo + callout do problema real; cortado o parágrafo genérico "troubleshooting, cloud, firewall, VPN, DHCP, SIEM…" |
| history | FUNDIR:problem | Única ideia útil (32 bits ilegíveis → 4 grupos de 8 bits) entra em 2 frases do `problem` |
| problem | ENXUGAR | Recebe history; lista de 5 consequências reduzida a 3 (validação, máscara/CIDR, rede/host) |
| evolution | MOVER:concept | A tabela de representações vai para `concept`; a prosa repetia history |
| concept | ENXUGAR | Removida a repetição de "0 a 255 porque 8 bits"; recebe a tabela de evolution e o prefixo de 0 a 32 bits (protocolFields) |
| internals | MANTER | Núcleo; fluxo mantido com as falhas de packetFlow; recebe protocolFields (Source/Destination 32 bits), método de conversão (novo, objetivo 3) e callout de erros comuns (commonMistakes) |
| architecture | REMOVER | Lista genérica; camada e dependências já estão em networkContext e os pontos de falha em internals/troubleshooting |
| analogy | ENXUGAR | Boa; limite da analogia em 1 frase |
| simpleExample | ENXUGAR | Mantido o /24 doméstico; removido o parágrafo que repetia a conversão de concept |
| enterpriseExample | MANTER | Específico (10.10.20.45 × 10.10.200.45) |
| cloudExample | ENXUGAR | VPC /16 → subnets e sobreposição; recebe a única frase útil de devsecops (octeto errado em variável Terraform/allowlist) |
| devsecopsExample | FUNDIR:cloudExample | Lista de ferramentas genérica; 1 frase aproveitada |
| securityExample | FUNDIR:security | Tabela de riscos e lista "IP pode representar NAT, proxy…" movidas para security.commonErrors/vulnerabilities |
| diagram | MANTER | Correto e legível; só o `<h2>` sem número |
| labIntro | REMOVER | Invisível, texto de moldura |
| exercisesIntro | REMOVER | Invisível |
| challengeIntro | REMOVER | Invisível |
| solutionIntro | REMOVER | Invisível |
| summary | ENXUGAR | 5 bullets; o primeiro é o deepDive.mentalModel, e inclui pesos e "IP sem máscara não basta" |
| nextTheme | ENXUGAR | 1 frase coerente com 4.3 "Máscara de rede e CIDR" |
| security | ENXUGAR | Fundido com securityExample e deepDive.securityImpact; itens repetidos entre good/bad/hardening/monitoring consolidados; nova vulnerabilidade "Octeto digitado errado em regra" (vinda do deepDive) |
| troubleshooting | ENXUGAR | Removidos os comandos PowerShell/Python, idênticos aos do lab (passo 3); mantidos ipconfig, ip addr/route, Cisco, validação manual e a árvore de decisão |
| lab | ENXUGAR | 7 → 5 passos (Windows/Linux e PowerShell/Python unidos, porque o aluno executa um de cada); passo de conversão manual com tabela de pesos; passo do 300 agora executável (100101100 = 9 bits); safetyNotes 3 → 2; improvements genéricos cortados; estimatedTimeMinutes 120 → 30 |
| quiz | ENXUGAR | 6 questões; q4.2.5 com distratores plausíveis; q4.2.6 (distratores absurdos) trocada por q4.2.7 (conversão 168); gabarito embaralhado |
| flashcards | ENXUGAR | 6; fc4.2.1 e fc4.2.3 (cópias do quiz) trocados por fc4.2.7 (pesos) e fc4.2.8 (10.1.1); fc4.2.4 e fc4.2.6 reescritos para não repetir o quiz |
| mentorQuestions | ENXUGAR | 3; a 2 (192.168.1.300, repetida em 4 lugares) virou raciocínio de bits × máscara (.34 × .200); a 3 ganhou a conta em bits do /8 (2^24) |
| exercises | ENXUGAR | 4 → 3; ex4.2.1 (trivial) → ex4.2.5 (binário → decimal); ex4.2.3 removido (redundante); ex4.2.4 (allowlist, repetida no quiz/flashcard/security) → ex4.2.6 (10.10.200.45 × 10.10.20.0/24) |
| challenge | MANTER | Bom e integrador |
| commentedSolution | MANTER | +1 resposta errada comum ("rede é 10.20.30") vinda de commonMistakes |
| glossary | ENXUGAR | Removido o termo "32 bits" (já está na definição de Octeto) |
| references | MANTER | Reais |
| linksToOtherCourses | MANTER | — |
| networkContext | MANTER | Metadado |
| deepDive | MOVER:summary/security/internals | mentalModel → 1º bullet do summary; limitations → summary/concept; securityImpact (IP digitado errado) → security.vulnerabilities; financialImpact já estava no cloudExample; resto duplicado |
| commonMistakes | MOVER:internals | Callout "Erros comuns" no internals; "IP como identidade" já está em security; "3 primeiros octetos" também em commentedSolution |
| protocolFields | MOVER:internals | Source/Destination Address de 32 bits no internals; o prefixo de 0 a 32 bits na tabela do concept |
| packetFlow | MOVER:internals | Falhas típicas por etapa no fluxo do internals |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | IPv4 = valor de 32 bits que identifica uma interface | MANTIDO | concept, summary, quiz q4.2.1 |
| 2 | 4 octetos de 8 bits em decimal pontuado | MANTIDO | concept, problem, diagram |
| 3 | 8 bits = 256 combinações → 0 a 255 | MANTIDO | concept (2^8), internals, quiz q4.2.2 |
| 4 | 192.168.10.25 = 11000000.10101000.00001010.00011001 | MANTIDO | concept, diagram, lab passo 3 |
| 5 | Binário de 32 bits é ilegível para humanos (motivo da notação) | MANTIDO | problem |
| 6 | Tabela de representações (binário puro, octetos binários, decimal, CIDR) | MANTIDO | concept |
| 7 | Pontos não definem rede/host; quem define é a máscara/CIDR | MANTIDO | concept, analogy, simpleExample, summary, fc4.2.4 |
| 8 | 192.168.1.300 inválido (300 > 255) | MANTIDO | problem, summary, quiz q4.2.3, lab passo 4, desafio |
| 9 | Fluxo interno: ler → validar → converter → aplicar máscara → rota local/remota | MANTIDO | internals |
| 10 | OS faz operação binária endereço × máscara, não "olha os pontos" | MANTIDO | internals (abertura e erro comum 4) |
| 11 | Source/Destination Address de 32 bits no cabeçalho | MANTIDO | internals (vindo de protocolFields) |
| 12 | Prefixo CIDR de 0 a 32 bits | MANTIDO | concept (tabela) |
| 13 | Falhas por etapa: IP inválido/duplicado, máscara errada, gateway fora da rede | MANTIDO | internals, troubleshooting |
| 14 | Zeros à esquerda: 10 = 00001010 | MANTIDO | internals (erros comuns), ex4.2.2, fc4.2.5, lab |
| 15 | "Três primeiros octetos sempre são a rede" é falso fora do /24 | MANTIDO | internals, simpleExample, commentedSolution, mentor 2 |
| 16 | Divisão rede/host pode cair no meio de um octeto | MANTIDO | simpleExample, internals, mentor 2 |
| 17 | Nem todo número com pontos é IPv4 (ex.: versão de software); 10.1.1 inválido | MANTIDO | internals, troubleshooting, fc4.2.8, summary |
| 18 | Analogia do telefone e seu limite | MANTIDO | analogy |
| 19 | Exemplo empresarial 10.10.20/30/40.0/24; 10.10.20.45 × 10.10.200.45 | MANTIDO | enterpriseExample, ex4.2.6 |
| 20 | VPC 10.0.0.0/16 → subnets /24; sobreposição com VPN/on-prem; custo de renumerar | MANTIDO | cloudExample, security |
| 21 | Octeto errado em variável IaC libera rede errada/bloqueia pipeline | MANTIDO | cloudExample |
| 22 | Service CIDR, Pod CIDR, CNI, NetworkPolicy, Helm | REMOVIDO | fora do escopo (lista sem explicação no devsecopsExample) |
| 23 | IP não é identidade: pode ser NAT, proxy, VPN, balanceador, pod, DHCP | MANTIDO | security.commonErrors, quiz q4.2.5, fc4.2.6, desafio |
| 24 | Confundir 10.1.2.3 com 10.1.20.3; SIEM enrichment | MANTIDO | security.commonErrors |
| 25 | /8 amplo = acesso lateral; menor privilégio por subnet; 2^24 endereços | MANTIDO | security, mentor 3, desafio |
| 26 | Válido ≠ roteável; privado ≠ seguro | MANTIDO | security.commonErrors, troubleshooting |
| 27 | Sobreposição de endereços quebra VPN, rota e logs; IPAM | MANTIDO | security.vulnerabilities |
| 28 | Alertar regras /8, /12, /16 sem aprovação | MANTIDO | security.detectionIdeas |
| 29 | Comandos ipconfig /all, ip addr && ip route, show ip interface brief | MANTIDO | troubleshooting, lab passo 1 |
| 30 | PowerShell Split/Convert/PadLeft e Python 08b | MANTIDO | lab passo 3 (removido de troubleshooting por duplicado) |
| 31 | Árvore de decisão (octeto > 255, sem máscara, gateway, conflito cloud) | MANTIDO | troubleshooting.decisionTree |
| 32 | Documentar IP sempre com máscara/CIDR | MANTIDO | security.goodPractices, summary |
| 33 | Camada 3; dependências máscara, CIDR, gateway, rota, ARP | MANTIDO | networkContext |
| 34 | Lista genérica de componentes que usam IP (architecture/history) | REMOVIDO | genérico, sem informação específica |
| 35 | Pesos dos bits 128…1 e método de conversão nos dois sentidos | NOVO | internals, fc4.2.7, q4.2.7, ex4.2.5, lab passo 3 |
| 36 | Valor > 255 gera 9+ bits nos comandos (300 → 100101100) | NOVO | lab passo 4 |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar que um endereço IPv4 possui 32 bits | concept, problem, internals (cabeçalho), diagram, quiz q4.2.1 |
| Dividir um IPv4 em quatro octetos de 8 bits | concept, diagram, lab passo 2, fc4.2.2, fc4.2.8 |
| Converter octetos simples entre decimal e binário | internals (tabela de pesos e método), lab passo 3, quiz q4.2.7, ex4.2.5, ex4.2.2, fc4.2.7 |
| Validar por que cada octeto deve estar entre 0 e 255 | concept, internals ("por que 255"), lab passo 4, quiz q4.2.2/q4.2.3, troubleshooting |
| Preparar o raciocínio para máscara, CIDR, rede, host e broadcast | concept, simpleExample, internals (erros comuns), mentor 2 e 3, ex4.2.6, desafio, nextTheme |

## 10. O que mudou na nova versão
- 9 seções de `content` removidas ou fundidas (history, evolution, architecture, devsecopsExample, securityExample e as 4 intros); seções numeradas sem número no `<h2>`.
- Conteúdo movido de campos invisíveis: commonMistakes (callout no internals e resposta errada na solução), protocolFields e packetFlow (internals), deepDive (summary e security).
- **Acréscimo novo (não movido), justificado:** tabela de pesos 128…1 com o método de conversão decimal ↔ binário no `internals` (~150 palavras). O objetivo 3, "Converter octetos simples entre decimal e binário", não era ensinado: a aula só mostrava resultados e scripts. A frase no lab passo 4 (300 → 100101100) só torna executável um passo que já existia.
- Itens trocados sem aumentar a quantidade: quiz 6 → 6 (q4.2.6 → q4.2.7); flashcards 6 → 6 (fc4.2.1 → fc4.2.7, fc4.2.3 → fc4.2.8); mentor 3 → 3; exercícios 4 → 3 (−ex4.2.3; ex4.2.1 → ex4.2.5; ex4.2.4 → ex4.2.6).
- Lab: 7 → 5 passos, estimatedTimeMinutes 120 → 30 (coerente com 5 passos; a alternativa da fórmula dá 30,8).
- Troubleshooting: −2 comandos duplicados do lab. Security consolidado com securityExample.
- Duração: "95-135 min"/135 → "85-125 min"/125 (faixaRecomendada da nova versão).
- Aviso do `validar` justificado: "ids de quiz originais ausentes: q4.2.6", porque a questão foi substituída por q4.2.7 (id novo, o antigo não foi reaproveitado). O aviso de gabarito concentrado foi resolvido com `quiz_embaralhar`.
- `comparar`: cortes brutos de 17%, coerentes com a linguiça estimada (~19%); acréscimos brutos = movidos + conversão + reescrita de quiz/flashcards/mentor.

## 11. Depois
Palavras visíveis: 3981 → 4119 (+3,5%; invisíveis 738 → 25, com conteúdo movido para áreas visíveis) · Teoria visível: 2322 → 2119 (−8,7%) · Duração: 95-135 min (T 120,1) → 85-125 min (T 102,3, −14,8%) · Quiz corrigido: sim (6 questões; formato normalizado, 1 trocada, distratores de 1 refeitos, gabarito redistribuído)

## 12. Revisão humana
- Lab: `estimatedTimeMinutes` 120 → 30 e passos 7 → 5 (Windows/Linux e PowerShell/Python unidos num passo cada). O `lab.id` e o `labMarkedDone` estão intactos; vale confirmar que nenhuma métrica externa usa os 120 min ou o número dos passos.
- Questão q4.2.6 removida (substituída por q4.2.7): a resposta salva dos alunos nessa questão deixa de contar.
- Exercício ex4.2.3 removido (redundante); exercícios 4 → 3, dentro da faixa 3–5.
- Desafio: 203.0.113.50 pertence à faixa de documentação TEST-NET-3 (RFC 5737). A solução só o trata como "octetos válidos", o que é correto para esta aula. Não alterei: o tema público/privado/reservado é da 4.6.
- Mentor 2 cita o /25 antes da aula 4.3 (sem cálculo, só como exemplo de máscara que usa bits do quarto octeto). Confirmar se a antecipação é aceitável.

```json
{
  "id": "4.2", "modulo": "m04", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Estrutura do endereço IPv4 e octetos",
  "duracao_declarada": "95-135 min", "T_original_min": 120.1, "duracao_nova": "85-125 min", "T_nova_min": 102.3, "duracao_nova_estimated_max": 125,
  "veredito_duracao": "ORGANIZADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 19, "conteudo_util": "PARCIAL", "aproveitamento": "MÉDIO",
  "pode_ser_mais_curta": true, "reducao_tempo_pct": 15, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 3981, "palavras_visiveis_depois": 4119,
  "palavras_invisiveis_antes": 738, "palavras_invisiveis_depois": 25,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "MOVER:concept",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "REMOVER", "analogy": "ENXUGAR",
    "simpleExample": "ENXUGAR", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "FUNDIR:cloudExample",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "security": "ENXUGAR", "troubleshooting": "ENXUGAR", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "ENXUGAR",
    "mentorQuestions": "ENXUGAR", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "ENXUGAR", "references": "MANTER", "linksToOtherCourses": "MANTER", "networkContext": "MANTER",
    "deepDive": "MOVER:summary/security/internals", "commonMistakes": "MOVER:internals",
    "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.estimatedTimeMinutes 120 -> 30 e passos 7 -> 5 (plataformas unidas); conferir dependências externas",
    "q4.2.6 removida (substituída por q4.2.7): progresso salvo nessa questão deixa de contar",
    "ex4.2.3 removido por redundância (exercícios 4 -> 3)",
    "203.0.113.50 do desafio é TEST-NET-3 (RFC 5737); mantido como apenas 'válido'",
    "mentor 2 antecipa o /25 da aula 4.3 como exemplo"
  ]
}
```
