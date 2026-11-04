# Aula 1.1 — O que é uma rede e por que existe
Tipo: fundamental · Duração declarada: 75-105 min · Palavras visíveis / invisíveis (antes): 3598 / 444

## 1. Duração
T pela fórmula = 80,1 min (teoria 18,1, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0 — a aula não tem lab)
Veredito: ORGANIZADA — M = 90 min ≤ 1,2×T (96). A divisão faz sentido para uma aula fundamental sem lab: 23% de leitura e o resto em exercícios, desafio e fixação. Faixa recomendada pela fórmula: 70-95 min.

## 2. Encheção de linguiça
Nível: BAIXA (~12%). Evidências:
- `history` + `evolution` repetem a mesma ideia três vezes: "A história das redes é a história da escala: primeiro… depois… depois…", "A evolução das redes pode ser vista como uma sequência de respostas… Primeiro… Depois… Depois…", e depois a tabela diz o mesmo de novo.
- `motivation`: meta-texto "Essa frase parece simples, mas dentro dela existem quase todos os temas que serão estudados no curso: …" (lista de 13 temas).
- `concept`: a definição aparece duas vezes seguidas (parágrafo + `definition-box` "Definição operacional"), com outras palavras.
- `internals`: "o aluno precisa enxergar a rede como uma cadeia de decisões".
- `analogy`: limite da analogia longo (2 frases com 13 termos).
- `securityExample`: a tabela de riscos (rede plana, serviço exposto, conectividade × autorização) repete `security.vulnerabilities` e `security.badPractices`.
- `devsecopsExample`: frase de efeito "quem automatiza infraestrutura precisa entender redes para não transformar YAML em risco operacional".
- `security`: `hardening` repete `goodPractices` ("Segmentação por função" × "Separar redes por função"); `monitoring` repete `detectionIdeas` ("Conexões laterais inesperadas" × "tentativas de acesso entre segmentos").
- Prática sobreposta: `exercises[1]` ("Liste cinco perguntas… 'a rede caiu'") é a mesma pergunta de `mentorQuestions[1]`, com as mesmas ideias esperadas; `exercises[3]` ("rede que conecta tudo com tudo") e `mentorQuestions[2]` ("todos os servidores e usuários na mesma rede") repetem a tarefa 3 do `challenge` e a q1.1.3.
- Quiz com distratores absurdos ("O conceito de byte deixou de existir", "O usuário digitou um emoji", "Fonte do monitor queimada", "Arquivo Base64", "Teclado USB"): as questões viram adivinhação.
- Frase repetida em 39 aulas ("Esta aula não possui laboratório independente…"), em `labIntro`, invisível.
- Conteúdo útil guardado em campos invisíveis: `deepDive` (modelo mental, limitações, quando não conectar, impacto financeiro) e `commonMistakes` (283 palavras).

## 3. Conteúdo útil
PARCIAL. O que tem de realmente valioso: a definição de rede com seus componentes; a cadeia de 8 etapas (origem → controle); os papéis (final, intermediário, meio, protocolo, serviço, política) com os equivalentes em cloud; a distinção conectividade × autorização; o bloco de troubleshooting com comandos reais (ipconfig /all, ip route, resolvectl, show ip interface brief), interpretação e árvore de decisão; o desafio da pequena empresa com rubrica.
Lacunas: o objetivo 3 ("sistema sociotécnico: tecnologia, operação, segurança, custo e finalidade") não aparecia no texto visível, porque custo e "quando não conectar" só existiam no `deepDive`; o objetivo 5 (modelo mental de diagnóstico) estava só no bloco de troubleshooting, sem ligação com a cadeia do `internals`; a lista de nomes de cloud não dizia qual papel cada nome cumpre, e a q1.1.5 dependia disso.
Erros técnicos: nenhum relevante. O quiz tinha todas as respostas no índice 0.

## 4. Aproveitamento
BOM (~80%, no limite) — contra o T original de 80 min, cerca de 16 min não ensinam nada novo: ~2 min de leitura redundante, 2 exercícios duplicados (12 min) e 1 pergunta de mentor duplicada (2 min). Contra a duração declarada (M = 90 min), o aproveitamento cai para ~71%.

## 5. Pode ser mais curta?
NÃO — redução prevista: ~5%. A teoria é só 23% do tempo; o resto é prática dentro das quantidades da seção 7 (4 exercícios, 3 mentor, 1 desafio). Os itens duplicados foram trocados por prática que cobre lacunas dos objetivos, e não simplesmente cortados.

## 6. Explicação mais direta
SIM — `concept`: uma definição só, em `definition-box`, antes da justificativa; `internals`: a lista vira tabela "Etapa · O que acontece · Exemplo de falha", que liga o modelo ao diagnóstico; `architecture`: o parágrafo com 10 nomes de cloud vira tabela papel → nome; `history`+`evolution`: um parágrafo + a tabela de fases no lugar de três versões da mesma sequência; `analogy`: cada elemento da cidade mapeado a um elemento da rede, e o limite em 1 frase.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantém o cenário e o callout "a rede caiu"; sai a lista meta de temas do curso. |
| history | FUNDIR (com evolution) e ENXUGAR | Fica o fato que explica a tecnologia (recursos caros, não "ter internet") + a tabela de fases; sai a "história da escala" repetida. |
| problem | MANTER | Recebe "Custo" (deepDive.financialImpact), controle de mudanças (deepDive.operationalImpact) e "nem tudo deve ser conectado" (deepDive.whenNotToUse). |
| evolution | FUNDIR (com history) | A tabela foi para history; a prosa de abertura repetia a tabela. |
| concept | MANTER (reescrita) | Definição única; "sistema sociotécnico" explícito (objetivo 3); callouts "O que a rede não garante" (deepDive.limitations) e "Erros comuns" (commonMistakes). |
| internals | ENXUGAR | Lista vira tabela com exemplo de falha por etapa (objetivo 5); sai o meta-texto. |
| architecture | ENXUGAR | Lista mantida com a função de cada papel; papéis sobrepostos (vindo de ex1.1.3); nomes de cloud em tabela papel → nome. |
| analogy | ENXUGAR | Mapeamento cidade → rede mais preciso; limite em 1 frase. |
| simpleExample | MANTER | Acrescidos valores típicos (192.168.0.15, gateway 192.168.0.1) e TLS. |
| enterpriseExample | MANTER | Específico (separação por função, VLAN, NAC, SIEM); pequenos ajustes. |
| cloudExample | ENXUGAR | Sai a lista de recursos (agora na tabela de architecture); fica o cenário concreto. |
| devsecopsExample | ENXUGAR | Mantém as causas concretas de falha do pipeline e o IaC; sai a frase de efeito. |
| securityExample | FUNDIR (tabela com security) e ENXUGAR | Fica o parágrafo dos quatro papéis da rede em segurança com exemplo; a tabela de riscos já está em security (a linha "Falta de logs" virou vulnerabilidade). |
| diagram | MANTER | SVG correto e legível; ids `m01l01-*`, `<title>` e `<desc>` preservados; a frase introdutória agora descreve o desenho. |
| labIntro | REMOVER | Invisível; texto-padrão de 39 aulas (D08). |
| exercisesIntro | REMOVER | Invisível; meta-texto. |
| challengeIntro | REMOVER | Invisível; meta-texto. |
| solutionIntro | REMOVER | Invisível; meta-texto. |
| summary | MANTER (reescrita) | 5 bullets; primeiro = deepDive.mentalModel. |
| nextTheme | ENXUGAR | 1 frase com o título real da 1.2. |
| lab | — | Não existe; `progressRules.oneOf` = exerciseDone/practicalExerciseDone, que são atendidos pelos exercícios. |
| quiz | MANTER (corrigido) | Formato padrão; distratores absurdos trocados por plausíveis; +q1.1.7 (conectividade × autorização); respostas distribuídas (1,2,0,3,1,2,0). |
| flashcards | MANTER | 6 cards corretos, não copiam o quiz. |
| mentorQuestions | MANTER (1 trocada) | Q1 e Q2 ficam; Q3 (rede plana, igual ao desafio) trocada por "quando não conectar um sistema" (deepDive.whenNotToUse). |
| exercises | MANTER (2 trocados) | ex1.1.1 e ex1.1.3 ficam; ex1.1.2 (igual à mentor Q2) → ex1.1.5 (sintoma → etapa da cadeia); ex1.1.4 (igual ao desafio) → ex1.1.6 (papéis em casa/empresa/cloud, objetivo 4). |
| challenge | MANTER | Cenário concreto, rubrica de 100 pontos coerente. |
| commentedSolution | MANTER | Raciocínio, passos e respostas erradas comuns específicas. |
| glossary | MANTER | 5 termos, todos usados na aula. |
| security | ENXUGAR | Sem duplicatas entre hardening/goodPractices e monitoring/detectionIdeas; +vulnerabilidade "Fluxos sem registro" (vinda da tabela de securityExample). |
| troubleshooting | MANTER | Comandos corretos, com finalidade, esperado e interpretação; árvore de decisão útil. |
| references | MANTER | Reais (Módulo 0, OSI/ISO, docs oficiais de cloud). |
| linksToOtherCourses | MANTER | Pertinentes. |
| deepDive | MOVER (summary, concept, problem, mentorQuestions) | mentalModel → summary; limitations → concept; whenNotToUse → problem + mentor Q3; operational/financialImpact → problem; keyTerms, whenToUse e securityImpact já cobertos (glossary, problem, security) → removidos. |
| commonMistakes | MOVER (concept) | Callout "Erros comuns" com causa e correção. |
| networkContext | MANTER | Metadado. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Rede existe para compartilhar informações, serviços e recursos de forma previsível | MANTIDO | motivation |
| 2 | "A rede caiu" é impreciso (cabo, Wi-Fi, DHCP, DNS, gateway, firewall, proxy, autenticação, certificado, servidor, rota, política cloud, aplicação) | MANTIDO | motivation (callout) |
| 3 | Primeiras redes: compartilhar recursos caros (processamento, armazenamento, impressoras, terminais), não "ter internet"; antes, cartões, fitas e discos | MANTIDO | history |
| 4 | Expansão da rede: hoje conecta usuários, APIs, containers, serverless, IoT, ambientes híbridos | MANTIDO | history (último parágrafo); a sequência prédios/cidades/países foi REMOVIDA por ser duplicada da tabela |
| 5 | Fases isolados → LAN → internet → cloud/mobilidade, com limitação e o que veio depois (firewalls, NAT, DNS, TLS, VPN; Zero Trust, SDN, SASE, IaC) | MANTIDO | history (tabela) |
| 6 | Participantes em lugares, tecnologias, organizações e níveis de confiança diferentes | MANTIDO | problem |
| 7 | Exigências: compartilhamento, comunicação, escala, controle, operação, segurança | MANTIDO | problem |
| 8 | Conectividade não é autorização | MANTIDO | problem, concept (erros comuns), summary, q1.1.7, fc1.1.5, security.badPractices |
| 9 | Sem rede = ilhas de informação; rede mal projetada = superfície de ataque | MANTIDO | problem |
| 10 | Definição: dispositivos, meios, protocolos, endereços, serviços e políticas | MANTIDO | concept (definition-box), summary, q1.1.1, fc1.1.1 |
| 11 | Definição operacional: direto ou por intermediários, regras comuns, controles (permitido, observado, protegido) | MANTIDO | concept (fundida com a 10) |
| 12 | Cadeia de 8 etapas: origem, formato (HTTP, SMB, DNS), endereçamento, encapsulamento (transporte, rede, enlace), meio (elétrico, luz, rádio), intermediários, destino, controle (permitir, bloquear, registrar, modificar) | MANTIDO | internals (tabela) |
| 13 | O sintoma "não acessa" pode ter causa em qualquer etapa | MANTIDO | internals |
| 14 | Papéis: finais, intermediários, meios (cobre, fibra, rádio, links virtuais, túneis, backbones), protocolos (formato, ordem, erro, estado, interpretação), serviços essenciais (DHCP, DNS, NTP, diretórios, autenticação, observabilidade), políticas | MANTIDO | architecture |
| 15 | Nomes em cloud: VPC/VNet, subnet, route table, peering, NAT gateway, SG, NSG, firewall gerenciado, LB, private endpoint | MANTIDO | architecture (tabela papel → nome) |
| 16 | Analogia da cidade e seu limite (pacotes, encapsulamento, filtragem, retransmissão, criptografia) | MANTIDO | analogy (a lista do limite foi encurtada: DNS/NAT/TLS/estado saíram por redundância) |
| 17 | Exemplo doméstico: AP, roteador entrega IP, NAT, DNS, conexão, negociação de segurança | MANTIDO | simpleExample (+ valores e TLS) |
| 18 | Empresa: separar usuários, servidores, visitantes, telefonia, câmeras, impressoras, administração; notebook acessa internet, sistemas, arquivos, VPN, diretório, EDR, proxy, SIEM | MANTIDO | enterpriseExample |
| 19 | Ferramentas corporativas: VLANs, sub-redes, roteadores, firewalls, proxies, NAC, VPN, DNS interno, DHCP controlado, logs | MANTIDO | enterpriseExample |
| 20 | Cloud: rede definida por software; subnet privada → banco por private endpoint, saída por NAT gateway, entrada por LB, SG; erro → indisponibilidade, exposição, custo de tráfego | MANTIDO | cloudExample |
| 21 | Pipeline falha por DNS do runner, registry inalcançável, proxy, sem rota para cluster privado | MANTIDO | devsecopsExample, q1.1.6, troubleshooting.symptoms |
| 22 | IaC cria redes; erro de regra abre demais, bloqueia deploy, impede observabilidade | MANTIDO | devsecopsExample |
| 23 | Rede em segurança: superfície de ataque, movimento lateral, fonte de evidência, ponto de controle | MANTIDO | securityExample |
| 24 | Rede plana × segmentada (segmentação exige regras mantidas e logs) | MANTIDO | securityExample, security.vulnerabilities, q1.1.3, challenge |
| 25 | Riscos: rede plana, serviço exposto, falta de logs, confundir conectividade com autorização | MANTIDO | security.vulnerabilities (3) + security.badPractices |
| 26 | Modelo mental: cadeia origem, dados, protocolo, endereço, meio, intermediários, destino, política, evidência | MANTIDO | summary (1º bullet) — vindo de deepDive |
| 27 | Limitações: rede não garante serviço; velocidade não corrige tudo; cloud abstrai o cabo mas não elimina a rede | MANTIDO | concept (callout) — vindo de deepDive |
| 28 | Quando não conectar: isolamento por segurança/regulação; risco sem necessidade operacional | MANTIDO | problem, mentor Q3 — vindo de deepDive |
| 29 | Impacto operacional: documentação, monitoramento, controle de mudanças | MANTIDO | problem (Operação) — vindo de deepDive; "interdependências → observabilidade" REMOVIDO por estar coberto em internals ("sequência de dependências") |
| 30 | Impacto financeiro: equipamentos, links, licenças, equipe; em cloud, tráfego, NAT gateway, firewalls gerenciados, LB, flow logs | MANTIDO | problem (Custo) — vindo de deepDive |
| 31 | Erros comuns: rede = internet; conectividade × permissão; chamar tudo de problema de rede (com causa e correção) | MANTIDO | concept (callout) — vindo de commonMistakes |
| 32 | Perguntas diagnósticas (escopo, IP, gateway, DNS, caminho, porta, firewall/proxy/VPN) | MANTIDO | troubleshooting.diagnosticQuestions, mentor Q2 |
| 33 | Comandos: ipconfig /all; ping gateway && tracert 8.8.8.8; ip addr/ip route/resolvectl status; ping -c 4 do gateway; show ip interface brief (up/up, administratively down) | MANTIDO | troubleshooting.commands (sem mudança) |
| 34 | Árvore de decisão: sem IP; IP sem gateway; pinga IP externo mas nome falha → DNS; DNS ok mas app falha → porta, protocolo, TLS, proxy, autenticação, política | MANTIDO | troubleshooting.decisionTree; referida em internals; exercitada em ex1.1.5 |
| 35 | NAT não é firewall suficiente; VPN não torna acesso seguro automaticamente; bastion, private endpoints; MFA; bloqueio padrão; baseline; varreduras internas | MANTIDO | security |
| 36 | VPC/VNet = rede virtual | MANTIDO | architecture (tabela), q1.1.5 |
| 37 | Internet é rede de redes; LAN, corporativa e cloud também são redes | MANTIDO | concept (erros comuns), fc1.1.2, ex1.1.1 |
| 38 | Senha forte no Wi-Fi não resolve segmentação; banda não substitui arquitetura; ping ≠ autorização | MANTIDO | commentedSolution.commonWrongAnswers |
| 39 | Papéis sobrepostos: DNS/aplicação são serviços que rodam em servidores; firewall também aplica política | MANTIDO | architecture, ex1.1.3 |
| 40 | Blast radius / pergunta sobre colocar servidores e usuários na mesma rede | REMOVIDO | duplicado no challenge (tarefa 3), q1.1.3 e security.vulnerabilities[0] |
| 41 | Exercício "cinco perguntas quando a rede cai" | REMOVIDO | duplicado da mentor Q2 (mesmas ideias esperadas) |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que redes existem antes de decorar equipamentos e protocolos | motivation, history, problem; mentor Q3; ex1.1.1 |
| Diferenciar dispositivo final, intermediário, meio, serviço, protocolo e política | concept, architecture; q1.1.4; fc1.1.3–4; ex1.1.3; challenge |
| Entender rede como sistema sociotécnico (tecnologia, operação, segurança, custo, finalidade) | concept ("sistema sociotécnico"), problem (Operação, Segurança, Custo), mentor Q3 |
| Relacionar redes domésticas, corporativas, cloud e DevSecOps | simpleExample, enterpriseExample, cloudExample, devsecopsExample, tabela de cloud em architecture; q1.1.5, q1.1.6; ex1.1.6 |
| Criar um primeiro modelo mental para diagnosticar problemas básicos de conectividade | internals (tabela com falha por etapa), summary, troubleshooting; q1.1.2, q1.1.7; ex1.1.5; mentor Q2 |

## 10. O que mudou na nova versão
- history e evolution fundidas: um parágrafo com o fato que explica a tecnologia + a tabela de fases.
- concept com uma definição só, "sistema sociotécnico" explícito e dois callouts vindos de campos invisíveis (limitações e erros comuns).
- internals em tabela, com um exemplo de falha por etapa e ligação explícita com a árvore de decisão.
- architecture com tabela papel → nome em cloud e os papéis sobrepostos.
- problem com "Custo" e "nem tudo deve ser conectado" (antes só no deepDive).
- securityExample reduzido ao parágrafo; a tabela de riscos foi fundida em `security` (+ vulnerabilidade "Fluxos sem registro"); hardening e monitoring sem duplicatas.
- Quiz: distratores plausíveis, respostas distribuídas, +q1.1.7 (conectividade × autorização). Mentor Q3 e 2 exercícios duplicados trocados por prática nova (ex1.1.5, ex1.1.6), com ids inéditos.
- summary com o modelo mental; nextTheme em 1 frase; labIntro/exercisesIntro/challengeIntro/solutionIntro, deepDive e commonMistakes removidos.
- `duration` 75-105 → 70-100 min; `estimatedStudyTimeMinutes` 105 → 100; subtitle encurtado.

## 11. Depois
Palavras visíveis: 3598 → 4357 (+21%) · Duração: 75-105 min → 70-100 min (T 80,1 → 83,4 min) · Quiz corrigido: sim (7 questões)
Cortes brutos: 264 palavras (7%) por campo; no diff por frase, 124 de 272 frases do original foram reescritas ou removidas, e todas as que sumiram estão cobertas em outra forma ou no inventário como REMOVIDO. O saldo positivo vem de: conteúdo movido de campos invisíveis (~280 palavras), distratores plausíveis e a q1.1.7 no quiz (+213), os 2 exercícios trocados por versões com resposta esperada detalhada (+185) e as tabelas de internals e architecture, que cobrem os objetivos 3–5. `validar`: ok, sem erros nem avisos.

## 12. Revisão humana
- O `requiredLabs` do módulo m01 lista "lab-1.1", mas a aula não tem lab (o `progressRules` usa exerciseDone/practicalExerciseDone). Fica para a etapa de fim de módulo (D09).
- As palavras visíveis subiram 21% (T +3,3 min), por conteúdo movido de campos invisíveis e prática nova que substitui itens duplicados. Confirmar se o acréscimo é aceitável numa aula de linguiça BAIXA.
- Mentor Q3 nova (computador de exame de uma clínica, "quando não conectar") é um cenário criado a partir de deepDive.whenNotToUse. Conferir o encaixe pedagógico.
- Em internals, a linha "Encapsulamento" diz que as camadas são detalhadas no Módulo 2, com base na nota da referência OSI ("Será aprofundado no Módulo 2"). Confirmar.
- No SVG (mantido sem alteração), as setas roteador → servidor interno e roteador → internet usam `svg-flow--response`, embora representem a ida do tráfego. Não foi corrigido porque o desenho não fica errado para o aluno.

```json
{
  "id": "1.1", "modulo": "m01", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "O que é uma rede e por que existe",
  "duracao_declarada": "75-105 min", "T_original_min": 80.1, "duracao_nova": "70-100 min", "veredito_duracao": "ORGANIZADA",
  "T_nova_min": 83.4, "duracao_nova_estimated_max": 100,
  "linguica_nivel": "BAIXA", "linguica_pct": 12, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 5, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 3598, "palavras_visiveis_depois": 4357,
  "palavras_invisiveis_antes": 444, "palavras_invisiveis_depois": 41,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:evolution", "problem": "MANTER", "evolution": "FUNDIR:history",
    "concept": "MANTER", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "lab": "INEXISTENTE", "quiz": "MANTER", "flashcards": "MANTER", "mentorQuestions": "MANTER", "exercises": "MANTER",
    "challenge": "MANTER", "commentedSolution": "MANTER", "glossary": "MANTER", "security": "ENXUGAR",
    "troubleshooting": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER",
    "deepDive": "MOVER:summary/concept/problem/mentorQuestions", "commonMistakes": "MOVER:concept", "networkContext": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "requiredLabs do m01 lista lab-1.1, mas a aula não tem lab (D09)",
    "palavras visíveis +21% por conteúdo movido de invisíveis e prática nova; confirmar se é aceitável",
    "mentor Q3 nova (clínica, quando não conectar) criada a partir de deepDive.whenNotToUse",
    "internals cita o Módulo 2 para as camadas, com base na nota da referência OSI",
    "SVG mantido: setas de ida usam svg-flow--response"
  ]
}
```
