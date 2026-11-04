# Aula 2.3 — Camada 1 — Física: bits no fio, luz e rádio
Tipo: fundamental · Duração declarada: 80-115 min · Palavras visíveis / invisíveis (antes): 4514 / 535

## 1. Duração
T pela fórmula = 125,9 min (teoria 18,9, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 45)
Veredito: SUBESTIMADA — M = 97,5 < 0,8×T = 100,7. A divisão teoria/prática (17% leitura) faz sentido para uma aula de diagnóstico, mas o lab de 5 passos curtos (3 comandos de leitura + 2 tabelas) declarava 45 min, quando 5 min/passo + leitura dá ~31 min.

## 2. Encheção de linguiça
Nível: MÉDIA (~15%). Evidências:
- `history`: quase todo genérico ("A comunicação digital sempre precisou transformar informação em algum fenômeno físico mensurável", "A Camada 1 não é 'assunto antigo'"); a parte de cloud repete `cloudExample` e o último parágrafo repete `problem`.
- `evolution`: tabela de "o que veio depois" com linha de cloud que repete `cloudExample`; só a ideia "meio compartilhado → colisões → full duplex" ajuda a entender o tema.
- `motivation` e `concept` repetem o mesmo "ela não entende HTTP, DNS, IP…" / "Ela não decide… Não aprende MAC…"; `problem` termina repetindo a motivação ("o profissional pode gastar tempo ajustando políticas…").
- `internals`: "Termos como autonegociação, duplex, taxa negociada, potência óptica, SNR, RSSI… pertencem à vida prática" (lista de termos sem explicação).
- `devsecopsExample`: "Pipelines que dependem de rede híbrida precisam considerar disponibilidade física…", "Automação precisa ser acompanhada de observabilidade" (genérico).
- `security`: `hardening` repete `goodPractices`; `badPractices` espelha `goodPractices`; `vulnerabilities` repete as linhas 1–2 da tabela do `securityExample`; `monitoring` e `detectionIdeas` se sobrepõem.
- Lab: `analysisTask` com a frase-padrão de 56 aulas ("Produza o artefato indicado na instrução do passo…"); passos 1 e 2 rodam o mesmo `Get-NetAdapter`; `questions` 1 e 3 repetem os passos 4 e 5; `improvements` genéricos.
- Itens duplicados: `fc2.3.1` = `q2.3.1`; `fc2.3.6` = `q2.3.5`; `ex2.3.3` = mentor 3 = `q2.3.4`; mentor 2 (100 Mbps) = `lab.challenge` = exemplo empresarial.
- Campos invisíveis: `deepDive` (268) e `commonMistakes` (132) com conteúdo útil que o aluno não vê; 4 intros invisíveis (100).

## 3. Conteúdo útil
PARCIAL. Valioso: o cenário de abertura (CRC disfarçado de falha de aplicação), os comandos de leitura por plataforma (Get-NetAdapter, netsh wlan, ethtool, iw, show interfaces status/counters errors), a árvore de decisão, a tabela de riscos físicos e o desafio com rubrica e solução comentada. Lacunas: o `learningOutcome` "reconhece velocidade, estado de link, erros e possível duplex mismatch" não tinha explicação de autonegociação, duplex nem duplex mismatch; não explicava por que um cabo ruim negocia 100 Mbps; o objetivo "relacionar cobre, fibra e rádio com distância…" não tinha nenhum número de distância nem comparação direta dos três meios; CRC aparecia sem o mecanismo (FCS); faltava o caso de borda "contador acumulado ≠ falha atual"; não havia comando de erros no host Linux; RSSI × SNR só no glossário/invisível. Erros técnicos: nenhum relevante.

## 4. Aproveitamento
BOM (~83%) — contra o T original (125,9 min), cerca de 20 min eram desperdício: ~4 min de leitura redundante (history, evolution, duplicações), ~10 min de lab superestimado e ritual, 6 min de exercício repetido e ~2 min de flashcards/quiz que repetiam itens. Contra a duração declarada (97,5 min) o aluno ficaria sem tempo para a prática; a declarada estava subestimada.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~8% (125,9 → 116,2 min), quase toda pela recalibração do lab. A leitura fica no mesmo tempo (18,9 → 19,2 min) porque os cortes pagaram o mecanismo que faltava para cobrir os objetivos.

## 6. Explicação mais direta
SIM — `concept`: definição primeiro e uma tabela Meio × Sinal × Distância × Ponto fraco × Onde aparece no lugar da tabela histórica do `evolution`. `internals`: a lista de termos soltos virou explicação curta de autonegociação, velocidade, duplex mismatch e CRC, seguida do callout "Erros comuns". `motivation`/`concept`: fim da dupla negação "ela não faz X, Y, Z". Lab: passo 2 deixou de repetir o passo 1 e passou a coletar duplex e erros.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantido o cenário real; o parágrafo de definição foi para `concept`. |
| history | REMOVER | Genérico; a única ideia útil (meio compartilhado → colisões → full duplex) foi para `internals`, e a parte de cloud já estava em `cloudExample`. |
| problem | ENXUGAR | Lista de 5 itens mantida; a frase final repetia a motivação. |
| evolution | FUNDIR:concept | Limitações de cobre/fibra/rádio viraram a tabela de meios; a linha de cloud repetia `cloudExample`. |
| concept | ENXUGAR | Definição + tabela dos três meios com distância (objetivo 3). |
| internals | MANTER | Fluxo mantido e compactado; ganhou autonegociação/duplex/CRC e o callout "Erros comuns" (de `commonMistakes`). |
| architecture | ENXUGAR | Frase de abertura fundida com a lista; ganhou os limites de visibilidade do host (de `deepDive.limitations`). |
| analogy | ENXUGAR | Analogia boa; o limite ficou em 1 frase. |
| simpleExample | MANTER | Concreto (RJ-45 frouxo, Wi-Fi atrás de paredes). |
| enterpriseExample | MANTER | 100 Mbps + CRC, fibra/transceptor, canal Wi-Fi: específico. |
| cloudExample | ENXUGAR | Mantido o essencial (conexão dedicada, AZ, latência) e o custo recorrente (de `deepDive.financialImpact`). |
| devsecopsExample | ENXUGAR | Ficaram o runner em Wi-Fi, o Kubernetes on-prem e "IaC não substitui o físico"; frases genéricas cortadas. |
| securityExample | ENXUGAR | Tabela de riscos mantida (é a forma mais clara); o parágrafo foi reduzido a uma frase. |
| diagram | MANTER | Correto e legível; só o número tirado do `<h2>`. |
| labIntro | REMOVER | Invisível e repete `lab.objective`. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível e repete `challenge.scenario`. |
| solutionIntro | REMOVER | Invisível e repete `commentedSolution.reasoning`. |
| summary | MANTER | 5 bullets; o primeiro incorpora `deepDive.mentalModel`, o de meios e o de evidências refletem o conteúdo novo. |
| nextTheme | ENXUGAR | 1 frase coerente com o título real da 2.4. |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary/architecture/cloudExample/troubleshooting/glossary | mentalModel → summary; limitations → architecture e cloudExample; whenNotToUse → callout "Erros comuns" e decisionTree; financialImpact → cloudExample e ex2.3.4; keyTerms → glossário (Duplex) e SNR/RSSI; securityImpact/operationalImpact já cobertos em `security`. Campo removido. |
| commonMistakes | MOVER:internals | Os 4 erros viraram o callout "Erros comuns" (o de cloud já está em `cloudExample`/q2.3.5). Campo removido. |
| security | FUNDIR:securityExample | `hardening` fundido em `goodPractices` e removido; `badPractices` sem espelhos; `vulnerabilities` enxutas; `monitoring`/`detectionIdeas` sem sobreposição. |
| troubleshooting | MANTER | Comandos preenchidos com saídas reais (a-full/a-1000, FCS-Err, Late-Col); Linux ganhou `ip -s link`; decisionTree ganhou duplex mismatch e "subir de camada"; 2 diagnosticQuestions que repetiam a árvore saíram. |
| lab | ENXUGAR | 5 passos mantidos e executáveis; passo 2 deixou de repetir o 1 e passou a coletar duplex e erros (netstat -e / ethtool + ip -s link); `analysisTask` ritual removido; safetyNotes 4→3; improvements 4→2; questions 4→2; `estimatedTimeMinutes` 45→35. |
| quiz | ENXUGAR | 6 questões; distratores triviais trocados ("show clock", "Base64", "DNS só funciona com fibra"); q2.3.2 (CRC "típico", já coberto por q2.3.6 e fc2.3.3) trocada por q2.3.7 (100 Mbps por par danificado); gabarito redistribuído. |
| flashcards | ENXUGAR | 6 cartões; fc2.3.1 (cópia de q2.3.1) → fc2.3.7 RSSI × SNR; fc2.3.6 (cópia de q2.3.5) → fc2.3.8 contador acumulado. |
| mentorQuestions | ENXUGAR | 3 perguntas; a 2 (100 Mbps, repetida no lab.challenge) virou "sinal cheio, rede ruim" (de `commonMistakes`). |
| exercises | ENXUGAR | 4 exercícios; ex2.3.3 (repetia mentor 3 e q2.3.4) → ex2.3.5 leitura de saída com duplex mismatch (learningOutcome 3). |
| challenge | MANTER | Cenário, restrições e rubrica bons. |
| commentedSolution | MANTER | Raciocínio, passos e respostas erradas comuns específicos. |
| glossary | ENXUGAR | 7 termos usados na aula; Duplex entrou (de `deepDive.keyTerms`, usado em internals/troubleshooting/exercício); SNR distingue RSSI; CRC alinhado ao mecanismo FCS. |
| references | MANTER | IEEE 802.3/802.11 e aulas internas. |
| linksToOtherCourses | MANTER | Pertinentes (SLIs, 802.1X/NAC). |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Camada 1 transmite/recebe bits brutos por um meio físico | MANTIDO | concept (definition-box), summary, glossário |
| 2 | Bit vira variação elétrica (cobre), luz (fibra), onda (rádio) | MANTIDO | concept, internals, diagram |
| 3 | Camada 1 não roteia, não aprende MAC, não resolve DNS, não autentica | MANTIDO | concept, q2.3.1, fc2.3.5 |
| 4 | Aspectos tratados: sinal, conector, frequência, potência, temporização, codificação, modulação, velocidade, distância | MANTIDO | concept, glossário |
| 5 | Falha física se disfarça de falha de aplicação (caso CRC/VPN/Teams) | MANTIDO | motivation, mentor 1, ex2.3.1 |
| 6 | Cinco razões do problema (abstração, limites, ambiente, velocidade, engano) | MANTIDO | problem |
| 7 | Cobre: distância limitada, sensível a interferência, categoria/certificação | MANTIDO | concept (tabela; agora com 100 m) |
| 8 | Fibra: longas distâncias, custo, transceptor, curvatura, limpeza de conector | MANTIDO | concept (tabela), glossário Atenuação/Transceptor |
| 9 | Rádio: mobilidade, interferência, ar compartilhado | MANTIDO | concept (tabela + parágrafo), fc2.3.4 |
| 10 | Meios compartilhados antigos → colisões → switches e full duplex | MANTIDO | internals (half duplex como herança) |
| 11 | Evolução do Wi-Fi (WPA3, múltiplas antenas, planejamento RF) | REMOVIDO | fora do escopo (história; WPA3 é segurança de Wi-Fi, não Camada 1); planejamento RF segue em enterpriseExample/vulnerabilidades |
| 12 | Fluxo de transmissão: enlace → codificação → sinal → receptor reconstrói → erros | MANTIDO | internals (lista) |
| 13 | Transceptor (SFP) converte elétrico↔óptico | MANTIDO | internals, glossário |
| 14 | Autonegociação de velocidade e duplex | MANTIDO | internals, glossário, troubleshooting |
| 15 | Link flap | MANTIDO | internals (erros comuns), troubleshooting, security.detectionIdeas |
| 16 | RSSI, SNR, interferência | MANTIDO | internals (erros comuns), glossário, fc2.3.7, mentor 2 |
| 17 | CRC error indica cabo/porta/interferência/transceptor | MANTIDO | internals, glossário, fc2.3.3, q2.3.6 |
| 18 | Pontos da arquitetura (host, acesso, distribuição/core, WAN/cloud, segurança) | MANTIDO | architecture |
| 19 | Muitas evidências só no switch/AP/controlador; software não certifica cabo | MANTIDO | architecture (de deepDive.limitations), lab passo 5 |
| 20 | Analogia estrada/trilho e limite (receptor reconstrói bits) | MANTIDO | analogy |
| 21 | Exemplos: RJ-45 frouxo; Wi-Fi fraco atrás de paredes | MANTIDO | simpleExample |
| 22 | 100 Mbps em vez de 1 Gbps + CRC; fibra/transceptor derruba uplink; canal Wi-Fi afeta 802.1X | MANTIDO | enterpriseExample |
| 23 | Cloud abstrai mas depende do físico; conexão dedicada (ExpressRoute/Direct Connect/Interconnect), AZ, latência | MANTIDO | cloudExample, q2.3.5 |
| 24 | Links dedicados/redundantes têm custo direto e recorrente | MANTIDO | cloudExample, ex2.3.4 |
| 25 | Instalação ruim gera custo indireto com retrabalho | REMOVIDO | genérico; a ideia operacional está em "Erros comuns" (trocar switch antes do patch cord) |
| 26 | Runner em Wi-Fi, Kubernetes sem uplink redundante, IaC não substitui físico | MANTIDO | devsecopsExample |
| 27 | Registry lento por link saturado | REMOVIDO | saturação não é falha de Camada 1; exemplo genérico |
| 28 | Riscos: porta exposta, rogue AP, rack aberto, link único (com mitigação) | MANTIDO | securityExample (tabela), security |
| 29 | 802.1X/NAC, desativar portas ociosas, port security, etiquetagem | MANTIDO | security.goodPractices, q2.3.4, mentor 3 |
| 30 | Erros de segurança comuns (firewall não compensa rack aberto; Wi-Fi como perímetro; fotos sem sanitizar) | MANTIDO | security.commonErrors |
| 31 | Monitorar flaps, CRC, PoE, RSSI/SNR, APs desconhecidos, MAC desconhecido em porta pública | MANTIDO | security.monitoring/detectionIdeas |
| 32 | Comandos: Get-NetAdapter, netsh wlan show interfaces, ip link/ethtool, iw dev wlan0 link, show interfaces status, show interfaces counters errors | MANTIDO | troubleshooting.commands, lab |
| 33 | Árvore: down / velocidade baixa / CRC / Wi-Fi com perda | MANTIDO | troubleshooting.decisionTree |
| 34 | Interface virtual (VPN, WSL, Hyper-V, Docker) com velocidade irreal | MANTIDO | lab.troubleshooting, troubleshooting.commands[0] |
| 35 | Erros comuns: "cabo plugado", "sinal forte = rede boa", trocar equipamento antes do patch cord | MANTIDO | internals (callout, de commonMistakes) |
| 36 | Não usar Camada 1 como explicação final quando as evidências apontam outra camada | MANTIDO | internals (callout), decisionTree (de deepDive.whenNotToUse) |
| 37 | Desafio: queda intermitente, mudança no rack, cabo+Wi-Fi; mitigação reversível | MANTIDO | challenge, commentedSolution |
| 38 | Lab: inventário de evidências, separar físico de lógico, registrar limites | MANTIDO | lab passos 1–5 |

Acréscimos (novos, ver seção 10): 1000BASE-T usa 4 pares e 100 Mbps usa 2; duplex mismatch (fixo × automático, late collisions × FCS); mecanismo FCS/CRC; contadores acumulam desde o clear; potência óptica e PoE no switch; prefixo `a-` no `show interfaces status`; `ip -s link` e `netstat -e`; distâncias típicas.

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar o papel da Camada 1 no Modelo OSI | concept (definição), summary, q2.3.1, fc2.3.5 |
| Diferenciar bits abstratos de sinais físicos reais | problem, concept, internals (fluxo), analogy, diagram |
| Relacionar cobre, fibra e rádio com distância, interferência, ruído, atenuação e velocidade | concept (tabela dos meios), internals (pares × velocidade), glossário (Atenuação, SNR), fc2.3.4, fc2.3.7 |
| Identificar sintomas típicos de falhas de camada física | motivation, simpleExample, enterpriseExample, troubleshooting.symptoms, q2.3.3, mentor 1 e 2 |
| Coletar evidências básicas de link, velocidade negociada, erros e qualidade do sinal | internals (autonegociação/duplex/CRC), troubleshooting.commands, lab passos 1–3, q2.3.6, q2.3.7, ex2.3.2, ex2.3.5, fc2.3.8 |
| Conectar camada física com segurança, disponibilidade, cloud híbrida e operação corporativa | securityExample, security, cloudExample, devsecopsExample, q2.3.4, q2.3.5, ex2.3.4, mentor 3, challenge |

## 10. O que mudou na nova versão
- Removidos `history`, `evolution` e as 4 intros invisíveis; `deepDive` e `commonMistakes` movidos (summary, architecture, cloudExample, callout "Erros comuns", decisionTree, glossário) e removidos.
- `concept`: definição primeiro e tabela dos três meios. **Acréscimo novo justificado:** a coluna "Distância típica" (100 m no par trançado, centenas de metros a quilômetros na fibra, dezenas de metros no Wi-Fi interno) cobre o objetivo 3 ("relacionar… com distância"), que a aula não quantificava.
- `internals`: **acréscimo novo justificado:** autonegociação, por que um par rompido derruba 1 Gbps para 100 Mbps, duplex mismatch (sintomas de cada lado e correção) e o mecanismo FCS/CRC. Cobrem o learningOutcome 3 ("reconhece velocidade, estado de link, erros e possível duplex mismatch") e o objetivo 5, que a aula só citava como lista de termos. Também entraram potência óptica e PoE no switch (os sintomas "PoE falha" e a limitação "potência óptica" do lab não tinham onde ser vistos) e o caso de borda "contador acumulado ≠ falha atual".
- `troubleshooting`: saídas esperadas reais (`a-full`/`a-1000`, FCS-Err, Late-Col); `ip -s link` adicionado ao comando Linux (o host não tinha comando de erros, objetivo 5); duas entradas novas na árvore (duplex mismatch; "subir de camada", movida de `deepDive.whenNotToUse`).
- Lab: passo 2 deixou de repetir o passo 1 e passou a coletar duplex e erros (`netstat -e` no Windows, `ethtool` + `ip -s link` no Linux); ritual removido; `estimatedTimeMinutes` 45 → 35 (3 comandos de leitura e 2 tabelas curtas: 5 min/passo + leitura ≈ 31 min).
- Quiz: 6 → 6 questões; distratores plausíveis; q2.3.2 trocada por q2.3.7; respostas redistribuídas (índices 2, 1, 3, 1, 1, 3). Os acréscimos de palavras no quiz vêm só dos distratores e explicações melhores.
- Flashcards 6 → 6, mentor 3 → 3, exercícios 4 → 4: só trocas de itens duplicados (detalhes na seção 7). Glossário 6 → 7: Duplex vem de `deepDive.keyTerms` e é usado em internals, troubleshooting e ex2.3.5.
- Saldo: palavras visíveis +7,6%, das quais ~150 são conteúdo movido de campos invisíveis; o tempo de leitura ficou igual (18,9 → 19,2 min) e o T caiu 8%.

## 11. Depois
Palavras visíveis: 4514 → 4857 (+7,6%; cortes brutos 532 = 12%) · Duração: 80-115 min → 100-140 min (T 125,9 → 116,2; estimatedStudyTimeMinutes 115 → 140) · Quiz corrigido: sim (6 questões)

Avisos do `validar`: "ids de quiz originais ausentes: q2.3.2" — intencional: a questão foi substituída por q2.3.7 (pergunta diferente, id inédito, regra 11.5).

## 12. Revisão humana
- Fatos técnicos novos (padrão, mas convém conferência de um especialista): 1000BASE-T usa os 4 pares e muitos equipamentos sobem a 100 Mbps com um par ruim; comportamento do duplex mismatch (lado automático assume half; late collisions × FCS/CRC); prefixo `a-` no `show interfaces status`; colunas FCS-Err/Late-Col do `show interfaces counters errors`; `netstat -e` com Errors/Discards; distâncias típicas da tabela de meios.
- `lab.estimatedTimeMinutes` reduzido de 45 para 35 por julgamento (passos curtos de leitura).
- q2.3.2 removida e substituída por q2.3.7: o progresso salvo de quem respondeu a q2.3.2 deixa de contar.
- A duração declarada sobe de 80-115 para 100-140 min (a original estava SUBESTIMADA pela fórmula).
- Diagrama: a seta Equipamento → Evidências usa `svg-flow--blocked` (estilo de fluxo bloqueado), o que é semanticamente estranho; mantido sem alteração por não estar errado nem ilegível.

```json
{
  "id": "2.3", "modulo": "m02", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Camada 1 — Física: bits no fio, luz e rádio",
  "duracao_declarada": "80-115 min", "T_original_min": 125.9, "duracao_nova": "100-140 min", "T_nova_min": 116.2, "duracao_nova_estimated_max": 140,
  "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 15, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 8, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4514, "palavras_visiveis_depois": 4857,
  "palavras_invisiveis_antes": 535, "palavras_invisiveis_depois": 35,
  "secoes": {
    "motivation": "ENXUGAR", "history": "REMOVER", "problem": "ENXUGAR", "evolution": "FUNDIR:concept",
    "concept": "ENXUGAR", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary/architecture/cloudExample/troubleshooting/glossary",
    "commonMistakes": "MOVER:internals", "security": "FUNDIR:securityExample", "troubleshooting": "MANTER",
    "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "ENXUGAR", "mentorQuestions": "ENXUGAR",
    "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER", "glossary": "ENXUGAR",
    "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Conferir fatos técnicos novos: 4 pares no 1000BASE-T e queda para 100 Mbps; comportamento do duplex mismatch; prefixo a- e colunas FCS-Err/Late-Col no Cisco; netstat -e; distâncias da tabela de meios",
    "lab.estimatedTimeMinutes reduzido de 45 para 35 por julgamento",
    "q2.3.2 substituída por q2.3.7: progresso salvo da q2.3.2 deixa de contar",
    "Duração declarada sobe de 80-115 para 100-140 min (original SUBESTIMADA)",
    "Diagrama: seta Equipamento -> Evidências usa svg-flow--blocked; mantida sem alteração"
  ]
}
```
