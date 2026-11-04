# Aula 2.1 — Por que o Modelo OSI existe
Tipo: fundamental · Duração declarada: 80-115 min · Palavras visíveis / invisíveis (antes): 3897 / 521

## 1. Duração
T pela fórmula = 81,1 min (teoria 19,1, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0 — a aula não tem lab)
Veredito: INFLADA — M = 97,5 min > 1,2×T = 97,3 min (no limite). A divisão entre teoria e prática é razoável para uma aula conceitual (27% de leitura, o resto em exercícios, desafio e fixação). Não está desequilibrada. A faixa recomendada é 70-95 min.

## 2. Encheção de linguiça
Nível: BAIXA (~14%). Evidências:
- `history` + `evolution` (290 palavras): só 2–3 frases explicam por que o OSI existe (interoperabilidade entre fabricantes, modelo de referência da ISO). A tabela de evolução ("Observabilidade moderna: logs, métricas, traces, SIEM, NetFlow e APM… volume alto de sinais") não ensina nada sobre o OSI.
- `problem` repete `motivation` ("qualquer falha vira 'problema de rede'"), e a flow-list traz meta-itens ("Que escala ele permite: comunicar problemas de forma padronizada").
- `enterpriseExample` repete o callout da motivação (times culpando uns aos outros). `devsecopsExample` repete o raciocínio de `cloudExample` ("conectividade × autorização").
- `securityExample`: o parágrafo de abertura repete a tabela logo abaixo ("Controle físico protege portas e racks… Camada 4 restringe portas").
- Analogia: o "limite da analogia" ocupa 3 linhas e repete as limitações do modelo.
- `exercises` ex2.1.2 ("liste cinco perguntas por camadas") repete `troubleshooting.diagnosticQuestions`, a tarefa 2 do `challenge` e a mentor 3.
- `security.hardening` "Usar autenticação e autorização fortes na aplicação" duplica a mitigação da vulnerabilidade 2.
- Campos invisíveis com valor: `deepDive` (mentalModel, limitations, whenNotToUse, financialImpact) e `commonMistakes` (4 erros específicos, entre eles o do ping).
- Frase repetida do curso: o bloco "Prática equivalente" (`labIntro`, presente em 39 aulas), que é invisível.

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: a tabela das 7 camadas com a "pergunta principal" de cada uma, a árvore de decisão do troubleshooting com comandos Windows/Linux/Cisco, a tabela de risco por camada (defesa em profundidade), a distinção entre conectividade e autorização (cloud, quiz, exercício 3) e o desafio da VPN com solução comentada e respostas erradas comuns. Lacunas: o objetivo 6 ("relação com o modelo TCP/IP") só aparece em frases soltas (history, evolution, glossário); falta a correspondência explícita entre as camadas OSI e as do TCP/IP. A diferença entre "modelo conceitual" e "protocolo real" (objetivo 2) estava só nos campos invisíveis (`deepDive.limitations`). Erros técnicos: nenhum relevante. "Security routing", na camada 3 da arquitetura, é um termo vago e sem definição.

## 4. Aproveitamento
BOM — cerca de 88% do T original (81,1 min) vai para os objetivos. Saem ~4 min de leitura redundante e os 6 min do exercício duplicado. Contra a duração declarada (M = 97,5 min), só ~74% do tempo prometido corresponde a conteúdo: a promessa estava acima do necessário.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~9% (T 81,1 → 74 min). O núcleo é prática (desafio, exercícios, quiz), e cortar mais exigiria tirar itens que cobrem objetivos.

## 6. Explicação mais direta
SIM — (a) `concept`: a definição agora vem primeiro, numa caixa só (a frase introdutória duplicada saiu), e diz explicitamente que o OSI "não é um protocolo"; (b) a relação OSI × TCP/IP, antes espalhada em prosa por history, evolution e glossário, virou uma tabela; (c) `history` + `problem` viraram um único bloco: a origem em 2 frases e as consequências em uma lista curta; (d) o mentalModel do deepDive abre o `summary`.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Chamado vago + callout do SOC mantidos; frases de transição cortadas |
| history | FUNDIR:problem | Só a origem (fabricantes proprietários, ISO, vocabulário que ficou) explica o porquê; vira 2–3 frases em `problem` |
| problem | ENXUGAR | Recebe a history; a flow-list de meta-itens vira 4 consequências concretas (inclui a compra desnecessária do deepDive) |
| evolution | REMOVER | Tabela genérica. A linha TCP/IP foi para a tabela OSI × TCP/IP em `concept` e a de cloud/SDN ("caminho físico abstraído") para `architecture` |
| concept | MANTER | Definição + tabela mantidas; recebe a tabela OSI × TCP/IP (objetivo 6) e o callout "Limites do modelo" (deepDive.limitations/whenNotToUse) |
| internals | MANTER | Fluxo das 7 camadas mantido; recebe a regra de diagnóstico (do básico ao específico) e o callout "Erros comuns" (commonMistakes) |
| architecture | ENXUGAR | Mantida; tira "security routing" (vago) e recebe a frase de cloud/overlay da evolution |
| analogy | ENXUGAR | Analogia mantida; o limite cai para 1 frase |
| simpleExample | MANTER | Concreto (443, TLS, HTTP) |
| enterpriseExample | ENXUGAR | Mantém o ERP com as camadas de cada time, sem repetir a motivação |
| cloudExample | MANTER | Ensina conectividade × autorização; absorve o devsecopsExample |
| devsecopsExample | FUNDIR:cloudExample | Mesmo raciocínio; a cadeia de perguntas do runner virou o 2º parágrafo de cloudExample |
| securityExample | ENXUGAR | Tabela de risco por camada mantida (inclui ARP spoofing e validação/políticas de API do parágrafo); parágrafo de abertura reduzido a 1 frase |
| diagram | MANTER | Correto e legível; só sai o número do h2 |
| labIntro | REMOVER | Invisível, frase-padrão de 39 aulas |
| exercisesIntro | REMOVER | Invisível |
| challengeIntro | REMOVER | Invisível |
| solutionIntro | REMOVER | Invisível |
| summary | MANTER | 5 bullets; o 1º é o deepDive.mentalModel; inclui as 7 camadas e "conectividade não é autorização" |
| nextTheme | ENXUGAR | 1 frase coerente com a 2.2 |
| lab | — | Não existe no original nem é exigido por `progressRules` (ver Revisão humana) |
| quiz | MANTER | 6 questões normalizadas; q2.1.2 (cabo → camada 1, trivial e repetida no flashcard fc2.1.2) trocada por q2.1.7 (OSI × TCP/IP) |
| flashcards | MANTER | 6; fc2.1.1 passa a listar as 7 camadas (objetivo 3) |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, boas |
| exercises | ENXUGAR | 4 → 3: sai ex2.1.2, duplicado de troubleshooting.diagnosticQuestions + challenge + mentor 3 |
| challenge | MANTER | Cenário VPN específico, rubrica única de 100 pontos |
| commentedSolution | MANTER | Raciocínio, passos e respostas erradas comuns são específicos |
| glossary | MANTER | 5 termos, todos usados na aula |
| security | ENXUGAR | Tira 1 item de hardening duplicado; o resto é específico |
| troubleshooting | MANTER | Comandos corretos, árvore de decisão por camada |
| references | MANTER | ISO/IEC 7498-1 e RFC 1122 reais; internas mantidas |
| linksToOtherCourses | MANTER | Mantidos |
| networkContext | MANTER | Metadado |
| deepDive | MOVER:summary/concept/internals/problem | mentalModel → summary; limitations + whenNotToUse → callout em concept; financialImpact (compras desnecessárias) → problem; whenToUse/operationalImpact/securityImpact/keyTerms são redundantes com o visível → removidos |
| commonMistakes | MOVER:internals | Callout "Erros comuns" com os 4 erros |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Chamado "o sistema não abre" é vago; lista de causas possíveis (cabo, Wi-Fi, IP, gateway, DNS, porta, TLS, app, autenticação) | MANTIDO | motivation |
| 2 | Cenário SOC/redes/segurança/aplicação, cada um com linguagem própria | MANTIDO | motivation (callout) |
| 3 | Antes do OSI: soluções proprietárias, baixa interoperabilidade | MANTIDO | problem |
| 4 | OSI criado no contexto da ISO como modelo de referência para sistemas abertos | MANTIDO | problem; references (ISO/IEC 7498-1) |
| 5 | Internet consolidou-se sobre TCP/IP; OSI ficou como vocabulário ("camada 2", "camada 4", "camada 7") | MANTIDO | problem |
| 6 | DNS ≠ cabo; porta bloqueada ≠ senha; certificado inválido ≠ firewall | MANTIDO | problem |
| 7 | Consequências do rótulo único: time errado, reinício desnecessário, perda de evidências, decisões vagas de segurança | MANTIDO | problem |
| 8 | Compras desnecessárias de link/appliance/licença quando a causa está em outra camada (deepDive) | MANTIDO | problem (movido) |
| 9 | Definição: modelo conceitual de 7 camadas, do sinal físico à aplicação | MANTIDO | concept (definition-box); glossary |
| 10 | Tabela das 7 camadas: nome, pergunta principal, exemplos | MANTIDO | concept |
| 11 | TLS "conceitualmente" na camada 6 | MANTIDO | concept (tabela + callout de limites) |
| 12 | TCP/IP tem menos camadas e mistura responsabilidades | MANTIDO | concept (tabela OSI × TCP/IP) |
| 13 | Camadas do TCP/IP: acesso à rede, internet, transporte, aplicação | MANTIDO | concept (tabela); glossary |
| 14 | Limitações: OSI ≠ implementação exata; protocolos não cabem numa camada só; equipamentos multicamada; criptografia/identidade/sessão atravessam fronteiras | MANTIDO | concept (callout); analogy (limite, 1 frase) |
| 15 | Quando não usar: substituto de RFC/documentação; encerrar investigação só porque uma camada parece suspeita | MANTIDO | concept (callout) |
| 16 | Cada camada adiciona/interpreta informações ao enviar; o processo se inverte ao receber | MANTIDO | internals |
| 17 | Papel de cada camada no envio (aplicação → física) | MANTIDO | internals (lista) |
| 18 | Leitura inversa: sinal → bits → quadro → pacote → segmento → dados; ponte para a 2.2 | MANTIDO | internals; nextTheme |
| 19 | Camada oferece serviço à de cima e depende da de baixo | MANTIDO | internals; glossary (Camada) |
| 20 | Mental model: cada camada responde uma pergunta; evidência que falha deixa a hipótese mais precisa | MANTIDO | summary (1º bullet); internals |
| 21 | Do básico ao específico, sem pular etapas | MANTIDO | internals; diagram |
| 22 | Erros comuns: decorar sem aplicar; chamar tudo de rede; ping como prova de saúde; produto numa camada só | MANTIDO | internals (callout) |
| 23 | Ping = alcance ICMP; ICMP pode estar bloqueado enquanto TCP/443 funciona | MANTIDO | internals; quiz q2.1.3; commentedSolution |
| 24 | Componentes por camada (cabos/SFP; switch/VLAN/MAC table/ARP/broadcast; roteador/gateway/rota/subnet; portas/firewall stateful/LB L4/health check; TLS/HTTP/DNS/proxy/WAF/API) | MANTIDO | architecture |
| 25 | "Security routing" na camada 3 | REMOVIDO | Termo vago, sem definição nem uso no resto da aula |
| 26 | Equivalentes em cloud (VPC/VNet, route table, SG, NSG, private endpoint, NAT GW, DNS privado, WAF) e em DevSecOps (Terraform, Services, Ingress, NetworkPolicy, mesh) | MANTIDO | architecture |
| 27 | Cloud/SDN: caminho físico abstraído; OSI separa overlay, rota, política e aplicação | MANTIDO | architecture (vindo da evolution) |
| 28 | Evolução: redes proprietárias → padrões abertos → observabilidade moderna (logs, métricas, traces, SIEM, NetFlow, APM) | REMOVIDO | História que não explica o mecanismo. A parte útil está em problem/architecture; NetFlow e SIEM seguem em security.monitoring |
| 29 | Analogia da encomenda | MANTIDO | analogy |
| 30 | Exemplo do site: Wi-Fi → gateway → IP → TCP 443 → TLS → HTTP → resposta | MANTIDO | simpleExample |
| 31 | ERP: responsabilidades de suporte/redes/segurança/aplicação | MANTIDO | enterpriseExample |
| 32 | VM × banco privado: L3 subnet/route table, L4 SG/NSG, L7 endpoint/string/autenticação; conectividade ≠ autorização | MANTIDO | cloudExample; quiz q2.1.5; exercise ex2.1.3 |
| 33 | Pipeline × registry: DNS, rota, 443, TLS, API, token | MANTIDO | cloudExample (2º parágrafo) |
| 34 | Defesa em profundidade: tabela de risco por camada (1, 2, 3, 4, 7), ARP spoofing, validação de entrada, políticas de API | MANTIDO | securityExample; quiz q2.1.4; glossary |
| 35 | Security: boas/más práticas, erros comuns (L3 × L4, TCP × login, TLS ≠ autorização, NAT ≠ segurança), 3 vulnerabilidades, monitoramento, detecção | MANTIDO | security |
| 36 | Hardening: autenticação/autorização fortes na aplicação | REMOVIDO | Duplicado em security.vulnerabilities[1].mitigation e na tabela de securityExample |
| 37 | Troubleshooting: sintomas, perguntas, comandos Windows/Linux/Cisco, árvore de decisão por camada | MANTIDO | troubleshooting |
| 38 | Sanitização de evidências (IPs, nomes, rotas) | MANTIDO | security (vuln 3, goodPractices); challenge.constraints |
| 39 | Exercício "5 perguntas por camada antes de culpar o firewall" (ex2.1.2) | REMOVIDO | Duplicado em troubleshooting.diagnosticQuestions, na tarefa 2 do challenge e na mentor 3 |
| 40 | Caso VPN + sistema financeiro: matriz por camada, 401/403 → IAM, VPN conectada ≠ rota/DNS | MANTIDO | challenge; commentedSolution |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que o Modelo OSI existe e que problema ele tenta resolver | motivation; problem; quiz q2.1.1 |
| Diferenciar modelo conceitual de implementação real de protocolo | concept (definição "não é um protocolo", tabela OSI × TCP/IP, callout de limites); quiz q2.1.6 |
| Listar as sete camadas do OSI e a responsabilidade central de cada uma | concept (tabela); internals; summary; flashcards fc2.1.1–fc2.1.5; diagram |
| Usar o OSI como linguagem comum entre suporte, redes, segurança, cloud e DevSecOps | motivation (callout); problem; enterpriseExample; cloudExample; mentor 3 |
| Aplicar raciocínio por camadas em um diagnóstico inicial sem pular etapas | internals; simpleExample; troubleshooting (decisionTree); mentor 2; ex2.1.1; challenge + commentedSolution |
| Reconhecer limitações do OSI e sua relação com o modelo TCP/IP | concept (tabela OSI × TCP/IP + callout de limites); summary; quiz q2.1.7 e q2.1.6; mentor 1; glossary TCP/IP |

## 10. O que mudou na nova versão
- Campos invisíveis movidos: `deepDive.mentalModel` → 1º bullet do summary; `limitations` + `whenNotToUse` → callout "Limites do modelo" em concept; `financialImpact` (compras desnecessárias) → problem; `commonMistakes` → callout "Erros comuns" em internals. Removidos `labIntro`, `exercisesIntro`, `challengeIntro`, `solutionIntro`, `deepDive` e `commonMistakes`.
- `history` fundida em `problem`; `evolution` e `devsecopsExample` removidas (conteúdo útil realocado). Os números das seções saíram dos `<h2>`.
- **Acréscimo novo 1 — tabela OSI × TCP/IP em concept (~45 palavras):** cobre o objetivo 6, que só aparecia em frases soltas. Mapeamento padrão (Aplicação = 5–7; Transporte = 4; Internet = 3; Acesso à rede = 1–2), coerente com o glossário e o `networkContext.tcpIpLayers` da própria aula.
- **Acréscimo novo 2 — quiz q2.1.7 (OSI × TCP/IP):** substitui a q2.1.2 (cabo → camada 1, trivial e já coberta pelo flashcard fc2.1.2 e pelo ex2.1.1), sem aumentar o total de 6 questões. Testa o objetivo 6.
- **Acréscimo novo 3 — exemplo do TLS no callout de limites e "não é um protocolo" na definição (~30 palavras):** cobre o objetivo 2 com um caso concreto de protocolo que não cabe numa camada só.
- **Acréscimo novo 4 — fc2.1.1 lista as 7 camadas:** cobre o objetivo 3 ("listar as sete camadas"), sem aumentar o número de flashcards.
- Exercícios 4 → 3 (sai o ex2.1.2, duplicado). Quiz normalizado (`question/options/answer/explanation`) e gabarito redistribuído com `quiz_embaralhar` (nenhuma explicação cita a posição da opção).
- `duration` 80-115 → 65-90 min; `estimatedStudyTimeMinutes` 115 → 90.
- Avisos do `validar`: "ids de quiz originais ausentes: q2.1.2". A troca é intencional (ver acima); o id novo é inédito (q2.1.7).

## 11. Depois
Palavras visíveis: 3897 → 3753 (−3,7%; inclui ~250 palavras movidas de campos invisíveis; cortes brutos 525 = 13%, coerente com a linguiça estimada em ~14%) · Invisíveis: 521 → 53 (só networkContext) · Duração: 80-115 min → 65-90 min (T 81,1 → 74 min) · Quiz corrigido: sim (6 questões normalizadas, 1 trocada)

## 12. Revisão humana
- O módulo m02 lista "lab-2.1" em `requiredLabs`, mas a aula 2.1 não tem `lab` (nem no original). `progressRules` não exige lab (`exerciseDone`/`practicalExerciseDone`). Nada foi criado. Conferir se o módulo deve deixar de exigir esse lab.
- O exercício ex2.1.2 foi removido por duplicação. Se o app guarda progresso de exercício por id, o registro dele fica órfão.
- A questão q2.1.2 foi substituída pela q2.1.7. Respostas salvas da q2.1.2 ficam órfãs (comportamento esperado pela regra 11.5).
- "Security routing" (camada 3 da arquitetura) foi removido por ser vago. Se o autor quis dizer algo específico (ex.: VRF ou roteamento com política), vale reintroduzir com definição.

```json
{
  "id": "2.1", "modulo": "m02", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Por que o Modelo OSI existe",
  "duracao_declarada": "80-115 min", "T_original_min": 81.1, "duracao_nova": "65-90 min", "T_nova_min": 74, "duracao_nova_estimated_max": 90, "veredito_duracao": "INFLADA",
  "linguica_nivel": "BAIXA", "linguica_pct": 14, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 9, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 3897, "palavras_visiveis_depois": 3753,
  "palavras_invisiveis_antes": 521, "palavras_invisiveis_depois": 53,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "MANTER", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "MANTER", "devsecopsExample": "FUNDIR:cloudExample",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "quiz": "MANTER", "flashcards": "MANTER", "mentorQuestions": "MANTER", "exercises": "ENXUGAR",
    "challenge": "MANTER", "commentedSolution": "MANTER", "glossary": "MANTER", "security": "ENXUGAR",
    "troubleshooting": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER", "networkContext": "MANTER",
    "deepDive": "MOVER:summary/concept/problem", "commonMistakes": "MOVER:internals"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Módulo m02 exige lab-2.1 em requiredLabs, mas a aula não tem lab (nem no original)",
    "ex2.1.2 removido por duplicação: possível progresso órfão",
    "q2.1.2 substituída por q2.1.7: respostas salvas órfãs",
    "'security routing' removido da arquitetura por ser vago"
  ]
}
```
