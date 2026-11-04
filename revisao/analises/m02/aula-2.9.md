# Aula 2.9 — OSI aplicado à cibersegurança
Tipo: fundamental · Duração declarada: 90-125 min · Palavras visíveis / invisíveis (antes): 5046 / 704

## 1. Duração
T pela fórmula = 158,4 min (teoria 21,4, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 75)
Veredito: SUBESTIMADA. M = 107,5 < 0,8×T = 126,7. A distribuição é coerente para uma aula fundamental com lab de matriz (teoria 15%, lab 47%), por isso não é DESEQUILIBRADA. O lab de 75 min é "plausível" pela ferramenta, mas alto para 8 passos de preenchimento em papel (alternativa da fórmula: 46,8 min).

## 2. Encheção de linguiça
Nível: BAIXA (~13%, ~660 palavras visíveis). Evidências:
- `history` + `evolution` (305 palavras): narrativa perímetro → Zero Trust e tabela de fases. Só 2–3 frases explicam por que a defesa é por camadas ("Se algo estava dentro da rede, muitas organizações confiavam demais"); o resto é lista de siglas ("SIEM, EDR, DLP, IAM e Zero Trust") e repetição de limitações que já aparecem em `problem`/`concept`.
- `problem` × `concept`: a mesma ideia "X não substitui Y" duas vezes ("Um firewall pode bloquear porta, mas não entende regra de negócio…" / "Firewall não substitui patch. TLS não substitui autorização…").
- `internals` × `architecture` × tabela do `securityExample`: três listas por camada (internals lista itens por camada, architecture lista controles por camada, securityExample tabela risco/evidência/mitigação por camada).
- `analogy`: limite da analogia em duas frases longas.
- `summary`: genérico ("Uso real: arquitetura, SOC, cloud, DevSecOps, auditoria, incidentes e revisão de mudanças").
- Lab: frase-padrão de 56 aulas em dois `analysisTask` ("Produza o artefato indicado na instrução do passo…"); frase-padrão de 48 aulas em `safetyNotes` ("Em cloud real, remova os recursos…", num lab feito em papel, `cost: zero`); `safetyNotes` repetindo `prerequisites` ("Não teste controles em redes de terceiros" × "Não executar … teste contra terceiros"); `lab.challenge` pedindo outra matriz.
- Sobreposição de prática: quatro pedidos de "monte uma matriz" (lab, `lab.challenge`, `exercises[3]`, `challenge`); `mentorQuestions[1]` (TCP/443 + 403) igual ao quiz q2.9.3; VPN repetida em quiz q2.9.2, flashcard fc2.9.6, mentor, vulnerabilidade e badPractice.
- Campos invisíveis com conteúdo de valor: `protocolFields`, `packetFlow`, `deepDive`, `commonMistakes` (552 palavras) e as quatro intros (99 palavras).

## 3. Conteúdo útil
PARCIAL. De valor: a tabela risco/evidência/mitigação por camada, a árvore de decisão do troubleshooting, os comandos com interpretação, os exemplos cloud (bucket com IAM amplo, private endpoint) e DevSecOps (IaC, runner, TLS ignorado no pipeline), e o lab de matriz, que exercita o objetivo central. Lacunas: o objetivo 3 ("diferenciar controles preventivos, detectivos e corretivos") não era coberto. Preventivo e detectivo só apareciam no glossário, e "corretivo" não aparecia em nenhum campo visível. A diferença 401 × 403 não era explicada, embora fosse cobrada no quiz q2.9.3 e no exercício ex2.9.2. Faltava o ramo "Camada 3" na árvore de decisão (pulava de L2 para L4). Erros técnicos: nenhum grave. O `curl -vkI` era apresentado para "observar TLS" sem avisar que `-k` desliga a validação do certificado, o que contradiz a badPractice "Usar TLS sem validar certificado".

## 4. Aproveitamento
BOM (~92% de T original). O tempo improdutivo era de ~5 min de leitura redundante (history/evolution, listas triplicadas), mais ~8,5 min de itens de prática duplicados (ex2.9.4, mentor 2, fc2.9.6). Contra a duração declarada (107,5 min), a aula já exigia mais do que prometia.

## 5. Pode ser mais curta?
NÃO: redução prevista ~8% (158,4 → ~146 min), abaixo do limiar de 15%. O corte de linguiça (~5 min) é parcialmente compensado pelo conteúdo movido dos campos invisíveis e pela cobertura do objetivo 3. A maior economia vem do lab ajustado (75 → 60 min).

## 6. Explicação mais direta
SIM:
- `concept`: as frases soltas "X não substitui Y" de `problem`/`concept`/`commonMistakes`/`evolution` viram uma tabela "Controle | Camada | O que faz | O que não resolve".
- `architecture`: as três listas por camada viram uma única matriz (risco, preventivo, detectivo, corretivo), que é a ferramenta que o lab pede.
- `internals`: o `packetFlow` de 5 passos, que era invisível, vira uma frase com o caminho do pedido e a evidência de cada etapa.
- `problem` abre com 2 frases de história, em vez de duas seções.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantidos o problema real e a lista de riscos por camada; corte de meta-texto ("O Modelo OSI ajuda a organizar essa conversa"). |
| history | FUNDIR:problem | 2 frases explicam por que a defesa é por camadas; o resto era lista de siglas. |
| problem | ENXUGAR | Recebe a história; a lista "firewall/TLS/VLAN/WAF não…" foi para a tabela do concept. Mantidos os 5 erros típicos. |
| evolution | FUNDIR:problem | Zero Trust (que depende dos fundamentos de rede) foi para problem; as limitações por fase foram para a tabela do concept e para devsecops. |
| concept | ENXUGAR | Definição mantida; somam-se os 3 tipos de controle (objetivo 3), a tabela do que cada controle não resolve, o callout 401×403 e os limites do modelo (deepDive). |
| internals | ENXUGAR | Ciclo mantido; a lista por camada foi para a matriz; recebe o packetFlow condensado e os campos por camada (protocolFields). |
| architecture | ENXUGAR | A lista de controles virou a matriz por camada com as colunas preventivo/detectivo/corretivo, absorvendo a tabela do securityExample. Recebe o custo dos logs (deepDive.financialImpact). |
| analogy | ENXUGAR | Limite da analogia em 1 frase; ganha a ligação crachá × porta 443. |
| simpleExample | MANTER | Concreto (senha padrão do roteador). |
| enterpriseExample | MANTER | Movimento lateral com causas em várias camadas. |
| cloudExample | MANTER | Bucket/IAM, SG, private endpoint: hipóteses específicas. |
| devsecopsExample | ENXUGAR | Corte da frase de abertura genérica; fatos mantidos. |
| securityExample | ENXUGAR | A tabela foi para architecture; mantido o percurso por camada do alerta, com o desfecho (corretivo × investigação de autorização). |
| diagram | MANTER | Correto e legível; só o h2 sem número. |
| labIntro | REMOVER | Invisível. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | ENXUGAR | Reescrito: o mentalModel do deepDive é a 1ª linha, mais a matriz, conectividade × autorização, uso real e limite ético. |
| nextTheme | MANTER | Sem o meta "faremos"; coerente com 2.10. |
| networkContext | MANTER | Metadado. |
| protocolFields | MOVER:internals | "Cada camada identifica uma coisa diferente" e as 2 regras práticas. |
| packetFlow | MOVER:internals | Caminho do acesso HTTPS e evidências; as falhas foram para a coluna "Risco" da matriz. |
| deepDive | MOVER:summary/concept/architecture | mentalModel → summary; limitations/whenNotToUse → callout "Limites do modelo"; financialImpact → architecture; keyTerms → glossário/concept; whenToUse → summary "Uso real". operationalImpact e securityImpact removidos (genéricos/duplicados). |
| commonMistakes | MOVER:concept/commentedSolution | Firewall/VPN/TLS → tabela do concept; sanitização → commentedSolution.commonWrongAnswers. |
| security | ENXUGAR | `hardening` removido (100% na coluna Preventivo da matriz); removidas 3 entradas duplicadas (complementares, VPN em badPractices, authn×authz em commonErrors). |
| troubleshooting | MANTER | Comandos e árvore mantidos; ramo de Camada 3 adicionado; aviso sobre o `-k` no curl. |
| lab | ENXUGAR | Tempo 75 → 60; frases-padrão e nota de custo cloud removidas; safetyNotes 6 → 3 sem duplicar prerequisites; coluna P/D/C no passo 2; exemplos concretos nos passos 3 e 6 no lugar do ritual; improvements 5 → 3; `lab.challenge` removido (repete o desafio). |
| quiz | ENXUGAR | 6 questões; q2.9.1 (definição trivial) → q2.9.7 (tipo de controle); q2.9.6 (distratores absurdos) → q2.9.8 (o que mascarar no curl -v). |
| flashcards | ENXUGAR | 6; fc2.9.6 (VPN, repete o quiz) → fc2.9.7 (controle corretivo). |
| mentorQuestions | ENXUGAR | 3; a 2ª (igual ao quiz q2.9.3) foi trocada por uma correlação allow de firewall + HTTP 200 × autorização. |
| exercises | ENXUGAR | 4; ex2.9.4 (4ª matriz) → ex2.9.5 (classificar P/D/C + camada). |
| challenge | MANTER | Cenário de investigação, rubrica 4×25. |
| commentedSolution | MANTER | + erro comum de sanitização (de commonMistakes). |
| glossary | MANTER | + "Controle corretivo" (simetria com preventivo/detectivo). |
| references | MANTER | Reais. |
| linksToOtherCourses | MANTER | Reais. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | OSI como mapa para posicionar riscos, controles, evidências; produto não pertence a uma só camada | MANTIDO | concept (definição + 1ª frase) |
| 2 | Pergunta-chave: onde o risco aparece × onde o controle atua | MANTIDO | motivation |
| 3 | Exemplos de risco por camada (cabo em sala pública, switch sem controle de porta, rota ampla, porta exposta, TLS mal validado, token em log) | MANTIDO | motivation |
| 4 | 403 ≠ porta TCP filtrada | MANTIDO | motivation; concept (callout 401×403) |
| 5 | Cenário API interna (443, cert válido, SSO, 200) | MANTIDO | motivation (callout) |
| 6 | Perímetro → confiança excessiva na rede interna; mobilidade/cloud/SaaS borram a fronteira | MANTIDO | problem |
| 7 | Zero Trust verifica identidade/dispositivo/contexto e depende dos fundamentos de rede | MANTIDO | problem |
| 8 | Lista de controles modernos (SIEM, EDR, DLP…) | REMOVIDO em parte | Lista de siglas; os controles relevantes estão na matriz; EDR em concept/security; DLP fora do escopo da aula |
| 9 | Incidente raramente pertence a uma camada; correlacionar | MANTIDO | problem; internals |
| 10 | Firewall não entende regra de negócio nem substitui patch | MANTIDO | concept (tabela) |
| 11 | TLS não impede usuário autorizado de acessar demais; pode esconder tráfego malicioso; inspeção TLS | MANTIDO | concept (tabela) |
| 12 | VLAN separa broadcast, não substitui autenticação | MANTIDO | concept (tabela) |
| 13 | WAF não corrige lógica insegura nem substitui validação de entrada | MANTIDO | concept (tabela) |
| 14 | VPN não substitui menor privilégio/segmentação; movimento lateral | MANTIDO | concept (tabela); security.vulnerabilities; mentor 3 |
| 15 | NAT não é controle de segurança completo | MANTIDO | concept (tabela); ex2.9.3 |
| 16 | 5 erros típicos (risco mal localizado … investigação fraca) | MANTIDO | problem |
| 17 | Segmentação não resolve identidade; cloud/IaC escala erro rápido; policy as code; mTLS | MANTIDO | concept (VLAN), security.commonErrors, devsecops, matriz (mTLS) |
| 18 | Ciclo ativo → fluxo → camada → risco → evidência → controle → lacuna → ação | MANTIDO | internals |
| 19 | Itens por camada (rack, cabo, AP, energia; MAC, VLAN, ARP, loop, broadcast; rota, gateway, ACL; porta, estado, listener; TLS, sessão, cookie, token, lógica) | MANTIDO | matriz (architecture), concept, troubleshooting.decisionTree |
| 20 | Resposta com menor privilégio, mudança controlada, evidência preservada, rollback | MANTIDO | internals; securityExample |
| 21 | Controles por camada (port security, 802.1X/NAC, DHCP snooping, inspeção ARP, SG, NACL, stateful, egress, trust store, API gateway) | MANTIDO | architecture (matriz) |
| 22 | Pilha de responsabilidades, não de produtos; erro de concentrar controles numa camada | MANTIDO | architecture |
| 23 | Analogia do prédio | MANTIDO | analogy |
| 24 | Exemplo doméstico (Wi-Fi, senha padrão do roteador, firmware) | MANTIDO | simpleExample |
| 25 | Exemplo do servidor financeiro e das causas de movimento lateral | MANTIDO | enterpriseExample |
| 26 | Cloud: camadas abstraídas, VPC/VNet, SG/NSG, bucket com IAM amplo, private endpoint | MANTIDO | cloudExample |
| 27 | DevSecOps: runner, Terraform, Kubernetes, IaC abre portas, cert mal validado → interceptação, pipeline ignora TLS | MANTIDO | devsecopsExample |
| 28 | Alerta do SIEM: checagens por camada | MANTIDO | securityExample |
| 29 | Tabela risco/evidência/mitigação por camada (link up inesperado, DHCP snooping, traceroute autorizado, peering, egress, MFA) | MANTIDO | architecture (matriz) |
| 30 | Limites: OSI é conceitual; WAF/proxy/EDR/ZTNA/SASE cruzam camadas; não substitui modelagem de ameaças; não justifica teste sem autorização; não prova segurança sem evidência | MANTIDO | concept (callout; vinha do deepDive invisível) |
| 31 | MAC/IP/porta/URI/usuário identificam coisas diferentes; IP ≠ usuário; allow ≠ autorização | MANTIDO | internals (vinha de protocolFields) |
| 32 | Fluxo do acesso HTTPS em 5 etapas e falhas possíveis | MANTIDO | internals (caminho + evidências); falhas na coluna Risco da matriz (vinha de packetFlow) |
| 33 | Custo dos logs (flow, WAF, proxy, aplicação → SIEM) | MANTIDO | architecture (vinha de deepDive) |
| 34 | Erro comum: coletar evidência sem sanitizar | MANTIDO | commentedSolution.commonWrongAnswers; quiz q2.9.8; lab passo 8 |
| 35 | Comandos (ipconfig/route print, Test-NetConnection, ip/ss, curl -vkI, show … IOS) | MANTIDO | troubleshooting.commands; lab passos 4–5 |
| 36 | Árvore de decisão L1/L2/L4/L6 (SNI, trust store, proxy)/401-403 | MANTIDO | troubleshooting.decisionTree (+ ramo L3) |
| 37 | Vulnerabilidades (rede plana, porta sem dono, token em log, VPN) e ideias de detecção | MANTIDO | security |
| 38 | Sanitização: 10.10.23.15 → 10.x.x.15; usuario.real → usuario.exemplo | MANTIDO | lab passo 8 |
| 39 | Priorizar lacunas por impacto e probabilidade | MANTIDO | lab passo 7 |
| 40 | Limites éticos (sem terceiros, sem credenciais reais, dados fictícios) | MANTIDO | lab.safetyNotes/prerequisites; summary; challenge.constraints |
| 41 | Hipóteses de 401 (token expirado, clock skew, IdP, client_id) | MANTIDO | ex2.9.2 |
| 42 | deepDive.operationalImpact / securityImpact | REMOVIDO | Genérico ("melhora comunicação entre NOC, SOC…") ou duplicado da matriz e do concept |
| 43 | security.hardening | REMOVIDO | Duplicado integralmente na coluna Preventivo da matriz |
| 44 | Matriz curta C2/C3/C4/C7 (ex2.9.4) e lab.challenge | REMOVIDO | Duplicados do lab, do desafio e da própria matriz em architecture |
| 45 | Controles preventivo/detectivo/corretivo (NOVO) | NOVO | concept, matriz, lab passo 2, q2.9.7, fc2.9.7, ex2.9.5, glossário |
| 46 | 401 = autenticação, 403 = sem permissão; WAF também responde 403 (NOVO) | NOVO | concept (callout) |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Aplicar o OSI como mapa mental de segurança defensiva | concept (definição), internals (ciclo), summary, diagrama |
| Relacionar cada camada a riscos, controles, logs, evidências e mitigações | architecture (matriz), securityExample, security, lab passos 3–6 |
| Diferenciar controles preventivos, detectivos e corretivos por camada | concept ("Três tipos de controle"), matriz em architecture, lab passo 2, q2.9.7, fc2.9.7, ex2.9.5, glossário |
| Evitar conclusões genéricas como "bloquear no firewall" | concept (tabela "o que não resolve" + callout 401×403), internals (allow ≠ autorização), mentor 2, quiz q2.9.3 |
| Construir uma matriz defensiva por camadas | architecture (modelo), lab, challenge |
| Estabelecer limites éticos e seguros para laboratórios | lab.safetyNotes/prerequisites, concept (limites do modelo), quiz q2.9.8, challenge.constraints, summary |

## 10. O que mudou na nova versão
- Removidas as seções `history` e `evolution` (fundidas em 2 frases de `problem`) e as 4 intros invisíveis.
- `concept` reorganizado: definição, tipos de controle, tabela "o que cada controle não resolve" (une as frases de problem/concept/commonMistakes/evolution), callout 401×403 e limites do modelo (deepDive).
- `architecture` virou a matriz central (risco | preventivo | detectivo | corretivo), absorvendo a lista de controles e a tabela do `securityExample`.
- `internals` recebe `packetFlow` e `protocolFields` condensados; a lista por camada foi para a matriz.
- Campos invisíveis `protocolFields`, `packetFlow`, `deepDive`, `commonMistakes` movidos e removidos.
- `security.hardening` removido (duplicado da matriz); 3 entradas duplicadas cortadas.
- Lab: 75 → 60 min (8 passos de preenchimento em papel; a fórmula alternativa dá 46,6 min, e 60 deixa folga para os passos 3–6). Frases-padrão, nota de custo cloud, `lab.challenge` e 2 improvements removidos; safetyNotes enxugadas.
- Quantidades mantidas: quiz 6, flashcards 6, mentor 3, exercícios 4. Itens trocados (não somados): q2.9.1→q2.9.7, q2.9.6→q2.9.8, fc2.9.6→fc2.9.7, ex2.9.4→ex2.9.5, mentor 2.
- **Acréscimos novos (não movidos), com justificativa:**
  - *Tipos de controle (lista no concept, coluna "Corretivo" na matriz, coluna P/D/C no lab passo 2, termo de glossário "Controle corretivo")*: o objetivo 3 da aula não era coberto em nenhum campo visível.
  - *Callout 401 × 403 (inclui o caso do WAF que responde 403)*: o quiz q2.9.3, o exercício ex2.9.2 e a árvore de decisão cobravam essa distinção sem que ela fosse ensinada (learningOutcome "separa … HTTP, sessão, identidade").
  - *Ramo "Camada 3" na árvore de decisão*: a árvore pulava de L2 para L4, e o learningOutcome pede separar risco de IP e de porta.
  - *Aviso sobre `-k` no curl (troubleshooting e lab passo 5)*: o comando contradizia a badPractice "Usar TLS sem validar certificado"; o aviso evita ensinar um hábito inseguro.
  - *Exemplos de linha nos passos 3 e 6 do lab*: substituem o `analysisTask` ritual por orientação concreta, sem aumentar o texto do lab.
  - *Desfecho do `securityExample` (2 frases) e frase final da analogia*: aplicam a matriz ao cenário (corretivo proporcional × investigação de autorização), cobrindo o learningOutcome "dado um cenário de incidente…".

## 11. Depois
Palavras visíveis: 5046 → 5628 (+11,5%; conteúdo movido de campos invisíveis: ~550 palavras, e cobertura do objetivo 3) · Invisíveis: 704 → 53 · Teoria visível: 2783 → 3171 · Duração: 90-125 min → 125-175 min (T 158,4 → 146,4 min) · Quiz corrigido: sim (6 questões; formato normalizado, 2 trocadas)

Cortes brutos (`comparar`): 436 palavras (9%), coerentes com a linguiça estimada de ~13%. Parte da linguiça saiu por reescrita (frases fundidas em tabelas), que o `comparar` conta como frase reescrita. Aviso do `validar`: "ids de quiz originais ausentes: q2.9.1, q2.9.6". Esperado: as duas questões foram substituídas por q2.9.7 e q2.9.8, com ids inéditos (11.5).

A duração sobe em relação à declarada porque a original estava SUBESTIMADA (11.6). Mesmo assim, o T da nova versão é 12 min menor que o da original.

## 12. Revisão humana
- `lab.estimatedTimeMinutes` reduzido de 75 para 60 min (8 passos de preenchimento conceitual; alternativa da fórmula: 46,6 min). Confirmar se 60 min é razoável.
- `lab.labType` continua "cloud", embora o lab seja uma matriz em papel ou local, sem recursos cloud. O tipo não foi alterado por ser metadado que pode afetar o app.
- Os controles corretivos da matriz (desativar porta, VLAN de quarentena via NAC, remover rota/peering, revogar token, trocar certificado, aplicar patch) e o callout 401×403 são conteúdo novo, escrito para cobrir o objetivo 3. Vale uma conferência técnica rápida.
- O `curl -vkI` foi mantido, com aviso sobre o `-k`. Avaliar se é melhor trocar por `curl -vI` no troubleshooting e no lab.

```json
{
  "id": "2.9", "modulo": "m02", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "OSI aplicado à cibersegurança",
  "duracao_declarada": "90-125 min", "T_original_min": 158.4, "duracao_nova": "125-175 min", "veredito_duracao": "SUBESTIMADA",
  "T_nova_min": 146.4, "duracao_nova_estimated_max": 175,
  "linguica_nivel": "BAIXA", "linguica_pct": 13, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 8, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 5046, "palavras_visiveis_depois": 5628,
  "palavras_invisiveis_antes": 704, "palavras_invisiveis_depois": 53,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "FUNDIR:problem",
    "concept": "ENXUGAR", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "MANTER", "devsecopsExample": "ENXUGAR",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "MANTER",
    "networkContext": "MANTER", "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals",
    "deepDive": "MOVER:summary/concept/architecture", "commonMistakes": "MOVER:concept/commentedSolution",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "ENXUGAR",
    "mentorQuestions": "ENXUGAR", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "lab.estimatedTimeMinutes reduzido de 75 para 60 min; confirmar",
    "lab.labType 'cloud' mantido, embora o lab seja conceitual/local",
    "conferir controles corretivos da matriz e callout 401x403 (conteúdo novo para o objetivo 3)",
    "avaliar trocar curl -vkI por curl -vI (mantido com aviso sobre -k)"
  ]
}
```
