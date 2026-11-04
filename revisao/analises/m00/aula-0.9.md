# Aula 0.9 — Laboratório integrador do Módulo 0
Tipo: ligação integradora (laboratório) · Duração declarada: 80-120 min · Palavras visíveis / invisíveis (antes): 5599 / 663

## 1. Duração
T pela fórmula = 173,4 min (teoria 21,4, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 90)
Veredito: SUBESTIMADA — M = 100 min < 0,8×T (138,7). Só o lab declara 90 min (12 passos; 5 min/passo + leitura = 71 min, logo 90 é plausível, e os passos 11–12 exigem escrever tabela e conclusão). A divisão (14% teoria, 86% prática) é adequada para uma aula de laboratório: não é DESEQUILIBRADA.

## 2. Encheção de linguiça
Nível: MÉDIA (~16%, ~870 palavras visíveis). Evidências:
- `history`: "a profissão saiu do 'funciona na minha máquina' para o 'mostre a evidência'" — evolução genérica; só a última frase (riscos de decisão sem evidência) tem valor.
- `evolution`: tabela "Decorar conceito → Rodar comando → … → Operação profissional" — meta-pedagogia, não ensina o tema.
- `architecture`: repete `lab.topology` e o diagrama ("seu computador, sua rede local, o gateway, o DNS configurado, um destino de teste e o relatório").
- `motivation`: meta-texto "Esta aula não é uma revisão passiva. Ela é uma prática guiada…"; `concept` repete a lista de itens do relatório.
- `analogy`: limite da analogia em 3 frases.
- `security` × `securityExample`: "Tratar Base64 como proteção de segredo" (badPractices) = "Confundir codificação com criptografia" (commonErrors) = linha da tabela; "Executar varreduras sem autorização" + vulnerabilidade "Diagnóstico sem escopo ético" repetem `safetyNotes` e `challenge.constraints` (aviso de ética em 5 lugares).
- `troubleshooting`: bloco Cisco IOS ("show ip interface brief…", frase repetida em 3 aulas) fora do escopo de um lab só de host.
- `lab.safetyNotes`: "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes" (frase-padrão de 48 aulas) num lab local de custo zero; `improvements` genéricos ("template reutilizável", "checklist"); `lab.challenge` repete o `challenge`.
- Sobreposição de prática: mentor 1 ("Por que um laboratório integrador é mais útil do que uma lista de comandos soltos?") = exercício 1; mentor 2 (DNS ok, ping ok, curl falha) ≈ exercício 3 (DNS ok, 443 falha) ≈ `lab.questions[2]`; mentor 3 (o que mascarar) ≈ exercício 4 ≈ `lab.questions[1]`; quiz q0.9.1 trivial.
- Campos invisíveis com valor: `deepDive.limitations`, `deepDive.mentalModel`, `commonMistakes` (Mbps × MB/s, não anotar saída), `solutionIntro`.

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: o lab executável de 12 passos com comandos Windows/Linux corretos; a ideia central "o que o teste prova e o que não prova" (ping ≠ TCP 443, DNS ≠ porta, curl ≠ autorização, salto * ≠ queda); a árvore de decisão; o exemplo empresarial (sem IP → antes da aplicação; 403 → autorização; só VPN → split tunnel); a tabela de riscos. Lacunas: os passos 3 e 4 não mostravam a saída esperada concreta; o passo 4 não tinha alternativa sem Python/bash (o lab troubleshooting manda "usar alternativa em PowerShell", que não existia); o passo 6 pedia ping ao gateway sem comando; nenhuma questão cobria o learningOutcome de octetos IPv4 em binário/hex. Erros técnicos: nenhum relevante (o `labType: "cloud"` de um lab local é metadado incoerente, ver Revisão humana).

## 4. Aproveitamento
BOM — ~86% do T original (≈149 de 173 min) ensina ou pratica os objetivos. O desperdício está na teoria de moldura (history/evolution/architecture, ~4 min), no exercício e na pergunta de mentor duplicados (~8 min), na parte do desafio que repete o lab sem acrescentar (~10 min) e no quiz trivial. Contra a duração declarada (100 min) a conta não fecha: só o lab já consome 90 min.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~1% (T 173,4 → 171,8). 86% do tempo é prática (lab 90, exercícios 24, desafio 20) que exercita os objetivos; a linguiça está concentrada na teoria (≈3 min) e em itens de prática que foram reescritos, não eliminados.

## 6. Explicação mais direta
SIM —
- `internals`: a flow-list de 8 etapas vaga ("Métrica: ping, traceroute e testes HTTP mostram latência…") virou tabela Etapa | Comando | O que prova | O que não prova, reunindo os limites que estavam espalhados nas explicações dos passos do lab.
- `concept`: definição primeiro e a fórmula "mostra X, não mostra Y, próximo teste Z" (que estava no fim de `problem`) logo em seguida, em destaque.
- `problem`: absorve em uma linha a única frase útil de `history`.
- Passos 3, 4 e 10 do lab: saída esperada com valores reais (82 101 100 101 / 52656465 / UmVkZQ==; C0 A8 0A 32; 40 MB/s = 320 Mbps = 64% de 500 Mbps).

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantém o callout do problema real; corta o meta-texto "não é uma revisão passiva". |
| history | FUNDIR:problem | Só a frase "decisão sem evidência abre firewall, expõe credencial, compra banda, culpa DNS" ensina; foi para o bullet "Risco" de `problem`. |
| problem | ENXUGAR | Mantém os 4 exemplos de fragmentação e as confusões; a fórmula X/Y/Z foi para `concept`; "escala" fundida em `internals`. |
| evolution | REMOVER | Progressão pedagógica genérica; "explicar o que a saída prova e não prova" já está em `concept`/`internals`. |
| concept | ENXUGAR + MOVER | Definição, fórmula X/Y/Z, conteúdo do relatório; recebe `deepDive.limitations` + whenNotToUse (rede doméstica) como callout "Limites". |
| internals | MANTER (reescrita) | Cadeia de evidências como tabela prova/não prova; recebe a topologia de `architecture`. |
| architecture | FUNDIR:internals | Duplicava `lab.topology` e o diagrama; a topologia e a expansão corporativa viraram 2 frases em `internals`. |
| analogy | ENXUGAR | Analogia boa; limite em 1 frase. |
| simpleExample | MANTER | Concreto; só ajuste de redação. |
| enterpriseExample | MANTER | Árvore de decisão concreta (IP, DNS, 403, VPN). |
| cloudExample | ENXUGAR | 1 parágrafo: componentes que falham, any-any, quem valida o quê (base do quiz q0.9.6). |
| devsecopsExample | ENXUGAR | 1 parágrafo: falhas de pipeline que parecem rede + pipeline que produz evidência. |
| securityExample | FUNDIR:security | Mantém parágrafo e tabela de riscos; as duplicatas foram cortadas de `security`. |
| diagram | MANTER | Correto e legível; só o número do `<h2>` saiu. |
| labIntro | REMOVER | Invisível; o que diz (Windows/Linux, sem varredura, sem custo) está em `lab.prerequisites/safetyNotes/cost`. |
| exercisesIntro | REMOVER | Invisível, sem conteúdo. |
| challengeIntro | REMOVER | Invisível; repete `challenge.scenario`/`constraints`. |
| solutionIntro | MOVER:commentedSolution.reasoning | "A resposta ideal não é uma causa única inventada…" virou a 1ª frase do reasoning. |
| summary | ENXUGAR (reescrita) | 5 bullets; o 1º é o `deepDive.mentalModel`. |
| nextTheme | ENXUGAR | 1 frase coerente com "Revisão do Módulo 0". |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary+concept, depois REMOVER | mentalModel → summary; limitations e "rede doméstica não prova corporativa" → callout em concept; financialImpact (banda/cloud) já coberto por cloudExample e commonWrongAnswers; securityImpact duplicava security; whenToUse/operationalImpact/keyTerms genéricos. |
| commonMistakes | MOVER:commentedSolution.commonWrongAnswers, depois REMOVER | Novos: "não anotar saída" e "40 MB/s × 500 Mbps"; Base64, ping e compartilhar dados sensíveis já estavam em commonWrongAnswers/security. |
| troubleshooting | ENXUGAR | Mantém Windows/Linux e a árvore; remove Cisco IOS (fora do escopo de um lab de host). |
| security | ENXUGAR (FUNDIR com securityExample) | Remove duplicatas (Base64 2×, varredura/ética, separar conectividade × autorização, compartilhar sem sanitizar) e a vulnerabilidade "Diagnóstico sem escopo ético". |
| lab | ENXUGAR | Passos mantidos; saídas esperadas concretas (3, 4), PowerShell no passo 4, ping ao gateway (6), erro de TLS (9), 320 Mbps/64% (10); safetyNotes 6→3 (sai a nota de cloud); improvements 5→3; questions 5→3; `lab.challenge` fundido no `challenge`. |
| quiz | ENXUGAR + ajustar | 6→7: sai q0.9.1 (trivial); entram q0.9.7 (salto * no tracert) e q0.9.8 (octeto 168 → 10101000/A8); gabarito redistribuído. |
| flashcards | MANTER (1 troca) | fc0.9.3 (Base64, cópia do quiz q0.9.3) → fc0.9.7 (porta 443 ok + 403). |
| mentorQuestions | MANTER (1 troca) | Mentor 1 (duplicava ex0.9.1) → falha intermitente (horário, repetir testes). |
| exercises | MANTER (2 trocas) | ex0.9.3 (duplicava mentor 2) → ex0.9.5 (TcpTestSucceeded True + 403, formato X/Y/Z); ex0.9.4 (duplicava mentor 3) → ex0.9.6 (decodificar Basic Auth em Base64). |
| challenge | ENXUGAR | Cenário recebe o texto de `lab.challenge`; nova tarefa de repetir testes em dois momentos (o cenário é intermitente); constraints 4→3. |
| commentedSolution | MANTER + MOVER | Recebe solutionIntro e 2 commonMistakes; passo de comparação por horário. |
| glossary | MANTER | 5 termos, todos usados ("sanitização de evidência" agora aparece em `internals`). |
| references | MANTER | Reais. |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Definição de laboratório integrador (coleta, organização, interpretação de evidências) | MANTIDO | concept (definition-box) |
| 2 | Fórmula "mostra X, não mostra Y, próximo teste Z" | MANTIDO | concept (callout); ex0.9.5 |
| 3 | Relatório rastreável: comandos, saídas, conversões, hipóteses, camadas, riscos, próximos passos | MANTIDO | motivation, concept, lab passo 1 |
| 4 | Fragmentação: byte/octeto IP, Base64 em config, ping × aplicação, velocidade negociada/Wi-Fi/cabo | MANTIDO | problem |
| 5 | Confusões: codificação × criptografia, banda × throughput, ping × aplicação, autenticação × autorização | MANTIDO | problem; security.commonErrors |
| 6 | Risco de decisão sem evidência (firewall, credencial em log, comprar banda, culpar DNS) | MANTIDO | problem (vindo de history) |
| 7 | "Escala": do notebook doméstico ao corporativo/cloud | MANTIDO | internals ("a escala muda, a disciplina não") |
| 8 | Evolução histórica dos diagnósticos (local → distribuído) e tabela de abordagens de aprendizado | REMOVIDO | não explica o mecanismo; ideia útil coberta em problem/concept |
| 9 | Cadeia de evidências: representação → interface → enlace → rede → métrica → protocolo → segurança → relatório | MANTIDO | internals (tabela + parágrafo final) |
| 10 | Topologia: host → interface (Wi-Fi/Ethernet/WSL/VM) → rede local (gateway/DNS) → destino HTTPS | MANTIDO | internals; lab.topology; diagrama |
| 11 | Expansão corporativa (switches, roteadores, firewalls, proxies, VPN, DNS interno, balanceadores, IdP) | MANTIDO | internals; SIEM/EDR/cloud/pipelines da lista original: REMOVIDO (não estão no caminho do pacote; cloud e pipelines têm exemplos próprios) |
| 12 | Ping = ICMP + RTT; falha não prova destino fora (ICMP bloqueado) | MANTIDO | internals; lab passo 6; lab.troubleshooting; quiz q0.9.2 |
| 13 | DNS traduz nome; não prova porta, TLS ou permissão | MANTIDO | internals; lab passo 7; glossary |
| 14 | Salto de traceroute sem resposta não prova queda | MANTIDO | internals; lab passo 8; quiz q0.9.7 |
| 15 | curl -I: status HTTP prova comunicação acima de TCP/TLS, não autorização | MANTIDO | internals; lab passo 9; glossary |
| 16 | Test-NetConnection -Port 443 | MANTIDO | internals; troubleshooting Windows; ex0.9.5 |
| 17 | Comandos Windows (ipconfig /all, route print, Resolve-DnsName, tracert, curl.exe) e Linux (ip addr, ip route, getent hosts, traceroute/tracepath, resolvectl/resolv.conf) | MANTIDO | lab passos 5–9; troubleshooting |
| 18 | Comandos Cisco IOS (show ip interface brief, show interfaces status, show ip route, show cdp neighbors) | REMOVIDO | fora do escopo (lab só de host, Módulo 0) |
| 19 | 'Rede' em UTF-8: 82 101 100 101 / 52656465 / UmVkZQ== | MANTIDO | lab passo 3 (valores agora explícitos) |
| 20 | 192.168.10.50 em binário/hex por octeto | MANTIDO | lab passo 4 (valores explícitos + PowerShell); quiz q0.9.8 |
| 21 | 100 MB / 40 MB/s = 2,5 s; 500 Mbps / 8 = 62,5 MB/s antes de overhead | MANTIDO | lab passo 10; quiz q0.9.4; flashcard fc0.9.5 |
| 22 | 300 Mbps = 37,5 MB/s | MANTIDO | ex0.9.2 |
| 23 | Base64 é codificação reversível, não proteção | MANTIDO | internals; lab passo 3; quiz q0.9.3; ex0.9.6; commonWrongAnswers |
| 24 | Tabela por camadas (Camada / Evidência / Prova / Não prova / Próximo teste), ≥6 evidências | MANTIDO | lab passo 11 e validation |
| 25 | Conclusão defensiva (indicam / não provado / próximos testes / mascarado?) | MANTIDO | lab passo 12 |
| 26 | Exemplo doméstico: perguntas de diagnóstico e ligação com fundamentos | MANTIDO | simpleExample |
| 27 | Exemplo empresarial: 802.1X, VLAN; sem IP; DNS errado; 403; VPN/split tunnel | MANTIDO | enterpriseExample; fc0.9.7 |
| 28 | Cloud: SG/NSG, route table, DNS privado, endpoint, NAT, LB, WAF, IAM; any-any mascara; equipes | MANTIDO | cloudExample ("service mesh" e "dependências" saíram da lista de times, enxugamento) |
| 29 | DevSecOps: runner, proxy, DNS interno, TLS interceptado, token, registry, secret, egress; pipeline com evidência | MANTIDO | devsecopsExample |
| 30 | Exfiltração depende de bytes, bps, destino, protocolo, porta, payload, DNS, proxy, horário; WAF parece rede | MANTIDO | securityExample |
| 31 | Tabela de riscos (evidência fraca, segredo codificado, alteração insegura, authn × authz) | MANTIDO | securityExample |
| 32 | Vulnerabilidades: exposição de segredo; ampliação de superfície (porta/origem específicas, janela, rollback) | MANTIDO | security.vulnerabilities |
| 33 | Vulnerabilidade "Diagnóstico sem escopo ético" | REMOVIDO | duplicado em lab.safetyNotes, security.goodPractices[0] e challenge.constraints |
| 34 | Monitoramento (HTTP 401/403/404/429/5xx etc.), hardening, detecção | MANTIDO | security |
| 35 | Árvore de decisão (sem IP, DNS, porta, 401/403, throughput baixo) | MANTIDO | troubleshooting.decisionTree |
| 36 | Limites do lab (não substitui observabilidade; filtragem/proxy; sem captura = hipótese; corporativo bloqueia; doméstico ≠ corporativo) | MANTIDO | concept (callout, vindo de deepDive) |
| 37 | Modelo mental (trilha dado → comando → observação → interpretação → limite → hipótese → próximo teste) | MANTIDO | summary (vindo de deepDive) |
| 38 | Erros comuns: não anotar saída; MB/s × Mbps | MANTIDO | commentedSolution.commonWrongAnswers (vindo de commonMistakes) |
| 39 | Sanitização (mascarar tokens, cookies, IPs internos, nomes; Bearer <mascarado>) | MANTIDO | lab.safetyNotes; security; glossary; mentor 3; ex0.9.6 |
| 40 | Nota de limpeza de recursos de cloud | REMOVIDO | incorreta para este lab (local, custo zero) |
| 41 | Melhorias "template reutilizável" e "checklist para chamados" | REMOVIDO | genéricas; o próprio relatório já é o template |
| 42 | Ideias financeiras/operacionais do deepDive (melhora chamados, runbooks, investimento em SIEM/APM) | REMOVIDO | genéricas; o essencial (não comprar banda/recursos sem diagnóstico) está em cloudExample e commonWrongAnswers |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Integrar os conceitos de 0.1 a 0.8 numa investigação prática e segura | internals (tabela), lab passos 1–12, simpleExample, challenge |
| Coletar evidências sem achismo ou conclusão prematura | concept (X/Y/Z, limites), lab passos 5–9 e 12, mentor 1 e 2, quiz q0.9.2/q0.9.5/q0.9.7 |
| Relacionar bytes, codificação, sinais, métricas, protocolos e camadas num mesmo fluxo | internals, simpleExample, securityExample, lab passos 3, 4 e 10, quiz q0.9.4/q0.9.8, ex0.9.2/ex0.9.6 |
| Construir relatório com comandos, observações, interpretação e riscos | concept, lab passos 1, 11, 12 e validation, challenge + rubrica, commentedSolution, ex0.9.5 |
| Preparar para o Módulo 1 | nextTheme; internals (topologia, expansão corporativa); networkContext |

## 10. O que mudou na nova versão
- Removidos history, evolution e architecture (fundidos em problem/internals) e os quatro *Intro invisíveis; `deepDive` e `commonMistakes` movidos para concept, summary e commentedSolution e removidos.
- `internals` reescrito como tabela "o que prova / o que não prova" por etapa e comando; `concept` com a fórmula X/Y/Z em destaque e o callout "Limites deste laboratório".
- Lab: saídas esperadas concretas nos passos 3 e 4 (valores conferidos com Python), alternativa PowerShell no passo 4, aviso de que o heredoc Python exige bash, ping ao gateway no passo 6, erro de TLS no passo 9, 40 MB/s = 320 Mbps = 64% no passo 10; safetyNotes sem a nota de cloud; improvements e questions enxugados; `lab.challenge` fundido no challenge.
- Security sem duplicatas; troubleshooting sem o bloco Cisco IOS.
- Quiz: q0.9.1 (trivial) saiu; q0.9.7 (traceroute) e q0.9.8 (octeto 168) entraram; respostas redistribuídas com `quiz_embaralhar` (antes, todas as 7 eram a opção 0).
- Prática sem sobreposição: mentor 1 agora é sobre falha intermitente; ex0.9.5 (TCP ok + 403, formato X/Y/Z) e ex0.9.6 (decodificar Basic Auth) substituem os exercícios que repetiam o mentor; fc0.9.7 (403) substitui o flashcard que copiava o quiz.
- Challenge com tarefa de repetir os testes em dois momentos (o cenário diz "às vezes não abre"); commentedSolution com o passo de comparação por horário e 2 erros comuns novos.
- `duration` 80-120 → 145-205 min; `estimatedStudyTimeMinutes` 120 → 205.
- Aviso do `validar` justificado: "q0.9.1 ausente" é a questão trivial removida (id não reaproveitado).

## 11. Depois
Palavras visíveis: 5599 → 5730 (+2%; cortes brutos 697 = 12%, acréscimos 828, a maior parte vinda de campos invisíveis e de saídas esperadas concretas) · Invisíveis: 663 → 60 (só networkContext) · Duração: 80-120 min → 145-205 min (T 173,4 → 171,8) · Quiz corrigido: sim (7 questões; formato padronizado, gabarito redistribuído, 1 trivial trocada, 2 novas)

## 12. Revisão humana
- `lab.labType` é "cloud", mas o lab é local e de custo zero. Mantive o valor (é metadado e não sei quais valores o app aceita); vale trocar para o tipo usado nos labs locais.
- Comandos PowerShell acrescentados (passo 4: `Split('.') | ForEach-Object … [Convert]::ToString($n,2).PadLeft(8,'0') … {2:X2}`; ex0.9.6: `[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String(...))`) não foram executados neste ambiente (sem pwsh). Os valores esperados foram conferidos com Python.
- Bloco Cisco IOS removido do troubleshooting por estar fora do escopo de um lab de host no Módulo 0: confirmar.
- O challenge ganhou a tarefa "repetir os testes em dois momentos e registrar o horário", coerente com o cenário intermitente; a rubrica ficou como estava.
- A duração sobe de 80-120 para 145-205 min por causa da fórmula (só o lab declara 90 min).

```json
{
  "id": "0.9", "modulo": "m00", "tipo": "ligação integradora", "status": "CONCLUIDA",
  "titulo": "Laboratório integrador do Módulo 0",
  "duracao_declarada": "80-120 min", "T_original_min": 173.4, "duracao_nova": "145-205 min", "veredito_duracao": "SUBESTIMADA",
  "T_nova_min": 171.8, "duracao_nova_estimated_max": 205,
  "linguica_nivel": "MÉDIA", "linguica_pct": 16, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 1, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 5599, "palavras_visiveis_depois": 5730,
  "palavras_invisiveis_antes": 663, "palavras_invisiveis_depois": 60,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "FUNDIR:internals", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "MOVER:commentedSolution.reasoning", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary+concept", "commonMistakes": "MOVER:commentedSolution.commonWrongAnswers",
    "troubleshooting": "ENXUGAR", "security": "ENXUGAR", "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "ENXUGAR", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.labType = cloud num lab local de custo zero (mantido; trocar pelo tipo dos labs locais)",
    "Comandos PowerShell acrescentados (passo 4 e ex0.9.6) não executados neste ambiente",
    "Bloco Cisco IOS removido do troubleshooting (fora do escopo): confirmar",
    "Challenge ganhou a tarefa de repetir testes em dois momentos (cenário intermitente)",
    "Duração sobe de 80-120 para 145-205 min pela fórmula"
  ]
}
```
