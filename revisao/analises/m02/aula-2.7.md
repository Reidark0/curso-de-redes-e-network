# Aula 2.7 — Camadas 5, 6 e 7 — Sessão, Apresentação e Aplicação
Tipo: fundamental · Duração declarada: 85-120 min · Palavras visíveis / invisíveis (antes): 4055 / 772

## 1. Duração
T pela fórmula = 82,5 min (teoria 20,5, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 0 — a aula não tem lab)
Faixa recomendada (original): 70-100 min.
Veredito: **INFLADA** — M = 102,5 min > 1,2×T (99 min). A divisão teoria/prática (28% leitura) é adequada a uma aula fundamental de diagnóstico; o excesso está na promessa de tempo e em ~13 min de conteúdo duplicado (history/evolution/securityExample, exercício e pergunta de mentor repetidos).

## 2. Encheção de linguiça
Nível: **MÉDIA (~17%)**. Evidências:
- `history` repete a motivação: "boa parte dos incidentes não é 'cabo desconectado' nem 'rota ausente'; é certificado expirado, token inválido…" (mesma lista da `motivation`). Só o trecho "TLS… na pilha TCP/IP fica entre transporte e aplicação" e "HTTP… carrega sessão por cookies… cache" ensina algo.
- `evolution`: tabela histórica (protocolos simples → web inicial → APIs → identidade federada → segurança de aplicação) com colunas genéricas ("Pouca segurança, pouca padronização e pouca observabilidade"; "Detecção contextual, policy as code e resposta automatizada") que não ajudam no diagnóstico. Só "SSO depende de DNS, TLS, relógio, cookies, claims" é útil.
- `motivation` §1 recapitula a pilha inteira ("bits viram sinais, sinais viram frames…") e §2 antecipa a definição do `concept`.
- `securityExample` sobrepõe `security`: as linhas "Token em log", "CORS permissivo" e "Certificado inválido" repetem `security.vulnerabilities`; o parágrafo inicial repete `hardening`.
- `security.badPractices` é o negativo de `vulnerabilities` ("Armazenar tokens em logs", "Aceitar qualquer origem CORS", "Expor erros internos").
- `devsecopsExample` §2: "Este tema se conecta diretamente ao curso Infraestrutura Moderna…" (repete `linksToOtherCourses`); `cloudExample` §2 genérico ("exigem desenho, governança e automação").
- Limite da analogia em 3 frases.
- Prática duplicada: `ex2.7.1` (certificado ≠ roteamento) repete `q2.7.2`, a pergunta de mentor 3 e o texto do `internals`; mentor 2 ("curl retorna 403, quais hipóteses?") repete `ex2.7.4`; `fc2.7.5` (Base64) copia `q2.7.3`; `fc2.7.4` repete mentor 1 e o resumo.
- Campos invisíveis com conteúdo bom: `protocolFields`, `packetFlow`, `deepDive`, `commonMistakes` (~620 palavras); intros invisíveis rituais (frase-padrão de 39 aulas: "Esta aula não possui laboratório independente…").

## 3. Conteúdo útil
**FORTE**. Valioso: a sequência DNS → TCP → TLS → HTTP → sessão/identidade → regra de negócio, a distinção 401 × 403, a separação "porta aberta ≠ aplicação saudável", os comandos `Test-NetConnection`, `curl -I`, `curl -vkI`, `openssl s_client -servername`, a árvore de decisão, e o desafio com rubrica. Os campos invisíveis tinham o melhor material de diagnóstico (falha típica por etapa, campos HTTP/TLS, erros comuns).
Lacunas: a Camada 5 (sessão) quase não tinha prática (nenhum item exercitava expiração de sessão/token); os quizzes tinham distratores absurdos ("só funciona em roteadores Cisco", "exige fibra óptica"), que não testam nada.
Erros técnicos: nenhum relevante.

## 4. Aproveitamento
**BOM** — ~84% do T original (≈69 de 82,5 min) ensina ou pratica os objetivos; o restante é história genérica, exemplo de segurança duplicado e itens de prática repetidos. Contra a duração declarada (102,5 min), o aproveitamento cai para ~67%, porque a promessa de tempo estava inflada.

## 5. Pode ser mais curta?
**NÃO** (pelo critério 6.6, em T) — redução prevista de T: 8% (82,5 → 76,1 min), porque o conteúdo movido dos campos invisíveis repõe boa parte do texto cortado. A duração declarada cai 25% (ponto médio 102,5 → 77,5 min).

## 6. Explicação mais direta
**SIM** —
- `concept`: definição + tabela por camada (o que trata / exemplos / sintoma típico) no lugar de prosa; o trecho útil de `history` (posição do TLS na pilha TCP/IP) entra aqui em uma frase.
- `internals`: a lista numerada vira tabela "o que acontece × falha típica" (fundida com `packetFlow`), seguida da tabela de campos (`protocolFields`) e do callout "Erros comuns".
- `motivation`: de 2 parágrafos + callout para 1 parágrafo + callout.
- Limite da analogia em 1 frase.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Recapitulação da pilha reduzida a 1 frase; §2 (definições) vai para concept; callout do problema mantido |
| history | FUNDIR:concept | Só a posição do TLS na pilha TCP/IP e o "HTTP carrega sessão, formato e cache" ensinam algo; o resto repete motivation |
| problem | ENXUGAR | Cadeia de "culpas" em 1 frase; as 4 perguntas de diagnóstico ficam |
| evolution | REMOVER | História genérica; "SSO depende de relógio, cookies, claims" foi para enterpriseExample |
| concept | MANTER (reestruturado) | Definição + tabela por camada + mistura OSI×TCP/IP + callout "o que cada evidência não prova" (deepDive.limitations) |
| internals | MANTER (reestruturado) | Fluxo em tabela com falha típica (packetFlow), tabela de campos (protocolFields), callout Erros comuns (commonMistakes) |
| architecture | MANTER | Visão de componentes útil; ajustes mínimos |
| analogy | ENXUGAR | Analogia boa; limite em 1 frase |
| simpleExample | MANTER | Concreto (404/401/500, certificado vencido) |
| enterpriseExample | MANTER | Específico (WAF bloqueando, SameSite, relógio do IdP); recebeu a dependência do SSO vinda de evolution |
| cloudExample | ENXUGAR | §1 específico mantido; §2 reduzido ao fato de custo (com deepDive.financialImpact) |
| devsecopsExample | ENXUGAR | Removida a frase-propaganda do outro curso (já em linksToOtherCourses) |
| securityExample | FUNDIR:security | Tabela duplicava vulnerabilities; "WAF mal calibrado" virou vulnerabilidade; inventário/renovação foi para a mitigação de "TLS mal validado" |
| diagram | MANTER | Correto e legível; só o h2 sem número |
| labIntro | REMOVER | Invisível; frase-padrão de 39 aulas |
| exercisesIntro | REMOVER | Invisível, meta-texto |
| challengeIntro | REMOVER | Invisível; repete o cenário do challenge |
| solutionIntro | REMOVER | Invisível; repete o finalAnswer |
| summary | MANTER | 5 bullets; primeira linha = deepDive.mentalModel; 401×403 e Base64 incorporados |
| nextTheme | ENXUGAR | 1 frase coerente com 2.8 ("Diagnóstico por camadas: método prático de troubleshooting") |
| networkContext | MANTER | Metadado |
| protocolFields | MOVER:internals | Virou a tabela "Campos que você lê no diagnóstico" |
| packetFlow | MOVER:internals | Coluna "Falha típica" da tabela do fluxo |
| deepDive | MOVER:summary/concept/cloudExample/security | mentalModel → summary; limitations/whenNotToUse → callout no concept; financialImpact → cloudExample; "erro sem consumo anormal de rede" → security.monitoring; keyTerms/securityImpact/whenToUse/operationalImpact removidos (duplicados em glossary, security e architecture) |
| commonMistakes | MOVER:internals | Callout "Erros comuns" (3 itens); o de Base64 já está em security.commonErrors |
| lab | — | Não existe na original; progressRules não exige (oneOf exerciseDone/practicalExerciseDone). Ver Revisão humana |
| quiz | MANTER (distratores refeitos) | 6 questões mantidas com os mesmos ids; distratores absurdos trocados por plausíveis; explicações dizem por que os distratores estão errados; gabarito redistribuído |
| flashcards | ENXUGAR/trocar | fc2.7.4 e fc2.7.5 (duplicavam mentor 1 e q2.7.3) trocados por fc2.7.7 (HTTP 200) e fc2.7.8 (SAN), conteúdo movido de deepDive/protocolFields; continuam 6 |
| mentorQuestions | MANTER (1 troca) | Mentor 2 (403, duplicava ex2.7.4) trocado por pergunta de sessão expirada (Camada 5, sem prática antes); continuam 3 |
| exercises | ENXUGAR | ex2.7.1 removido (duplicava q2.7.2, mentor 3 e internals); ficam 3 |
| challenge | MANTER | Cenário, restrições e rubrica bons |
| commentedSolution | MANTER | Raciocínio e erros comuns específicos |
| glossary | MANTER | 6 termos, todos usados na aula |
| security | ENXUGAR | badPractices 5→2 (os outros 3 eram o negativo das vulnerabilidades); commonErrors sem o item duplicado no callout; +1 vulnerabilidade (de securityExample); monitoring com o fato de deepDive |
| troubleshooting | MANTER | Comandos corretos com purpose/expected/interpretation; árvore de decisão boa |
| references | MANTER | Reais (RFC 8446, RFC 9110, aulas internas) |
| linksToOtherCourses | MANTER | Sem alteração |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Definição das Camadas 5, 6 e 7 | MANTIDO | concept (definition-box + tabela); flashcards fc2.7.1–3 |
| 2 | Porta aberta/TCP 443 não prova aplicação saudável | MANTIDO | motivation, summary, internals (Erros comuns), mentor 1 |
| 3 | Funções das camadas superiores se misturam; OSI não descreve perfeitamente TCP/IP | MANTIDO | concept §2, analogy |
| 4 | TLS = apresentação no OSI, mas entre transporte e aplicação no TCP/IP | MANTIDO | concept §2 |
| 5 | HTTP carrega sessão (cookie), autenticação (header), formato (Content-Type) e cache | MANTIDO | concept §2 |
| 6 | Quatro perguntas: sessão, apresentação, aplicação, segurança | MANTIDO | problem |
| 7 | Camadas superiores dependem de IP/TCP/UDP | MANTIDO | problem |
| 8 | Sequência DNS → TCP → TLS → HTTP → interpretação → sessão/token → regra de negócio → logs | MANTIDO | internals (tabela) |
| 9 | Falhas TLS: expirado, CA não confiável, SNI, SAN, inspeção corporativa | MANTIDO | internals passo 3, troubleshooting, cloudExample |
| 10 | Falhas de requisição: header ausente, payload inválido, encoding errado, token expirado | MANTIDO | internals passo 4 |
| 11 | Gateway/WAF: 403, 429 rate limit, rota não publicada (404) | MANTIDO | internals passo 5, glossary API Gateway, devsecopsExample |
| 12 | Respostas de aplicação 401, 403, 404, 409, 422, 500, erro de contrato | MANTIDO | internals passos 6–7 |
| 13 | Certificado expirado ≠ roteamento; 401 ≠ porta fechada; JSON inválido ≠ cabo; CORS ≠ sem internet | MANTIDO | internals §após tabela |
| 14 | Campos: método, status, Content-Type, Authorization, Subject/SAN (com observação de segurança) | MANTIDO | internals (tabela de campos) — movido de protocolFields |
| 15 | Componentes: cliente, proxy, WAF, LB (termina TLS), API gateway, IdP/IAM, aplicação | MANTIDO | architecture |
| 16 | Em DevSecOps viram configuração declarativa (Terraform, Helm, Ingress, Gateway API) | MANTIDO | architecture |
| 17 | 401 = autenticação; 403 = autorização/política | MANTIDO | internals (Erros comuns), summary, quiz q2.7.4–5, fc2.7.6 |
| 18 | Base64 é representação, não criptografia | MANTIDO | summary, security.commonErrors, quiz q2.7.3, concept (tabela) |
| 19 | curl -k só em diagnóstico; corrigir CA, cadeia, SAN, SNI, renovação | MANTIDO | internals (Erros comuns), security, troubleshooting, quiz q2.7.6 |
| 20 | Limitações: TLS válido ≠ app segura; HTTP 200 ≠ negócio certo; token válido ≠ autorização total | MANTIDO | concept (callout) — movido de deepDive; fc2.7.7 |
| 21 | Não declarar problema de aplicação antes de testar DNS, rota, porta e TLS | MANTIDO | concept (callout) — movido de deepDive.whenNotToUse |
| 22 | Modelo mental (TCP bytes; TLS canal; encoding; HTTP; sessão/identidade) | MANTIDO | summary 1º bullet — movido de deepDive |
| 23 | Exemplo navegador: 404, 401, 500, certificado vencido | MANTIDO | simpleExample |
| 24 | WAF bloqueando por header ausente; SameSite; relógio do IdP; escopos | MANTIDO | enterpriseExample |
| 25 | SSO (SAML/OAuth2/OIDC) depende de relógio, cookies e claims | MANTIDO | enterpriseExample — vindo de evolution |
| 26 | Falhas em cloud: SAN, rota de API, authorizer, claim, limite de payload do gateway | MANTIDO | cloudExample |
| 27 | Custo recorrente de logs WAF/gateway/LB, certificados gerenciados e observabilidade | MANTIDO | cloudExample §2 |
| 28 | Falhas em pipeline: CA não confiável, proxy, token, escopo, JSON, 429, admission controller | MANTIDO | devsecopsExample |
| 29 | Vulnerabilidades: token em log, TLS mal validado, CORS permissivo, erro verboso | MANTIDO | security.vulnerabilities |
| 30 | WAF mal calibrado (403 em legítimos ou bypass; modo monitorado e tuning) | MANTIDO | security.vulnerabilities — movido de securityExample |
| 31 | Inventário e renovação automática de certificados | MANTIDO | security.vulnerabilities (TLS mal validado), commonErrors, goodPractices |
| 32 | Erros nas camadas superiores derrubam o serviço sem tráfego anormal de rede | MANTIDO | security.monitoring — movido de deepDive.financialImpact |
| 33 | Comandos Test-NetConnection, curl -I, curl -vkI, openssl s_client -servername, show logging | MANTIDO | troubleshooting.commands |
| 34 | Árvore de decisão TCP → TLS → 401 → 403 → 500 | MANTIDO | troubleshooting.decisionTree |
| 35 | Sanitizar tokens/cookies/Authorization nas evidências | MANTIDO | security.goodPractices, internals (tabela), ex2.7.3, challenge |
| 36 | Linha de evolução histórica (texto claro → HTTPS → APIs/OpenAPI/gRPC → federação → Zero Trust/policy as code) | REMOVIDO | Fora do escopo: história que não explica o diagnóstico; protocolos aprofundados no módulo 8 |
| 37 | "HTTP sem criptografia permitia roubo de sessão" (web inicial) | REMOVIDO | Fora do escopo (história); o risco atual está em security (token em log, TLS mal validado) |
| 38 | TLS fraco, headers sensíveis, sessão sem expiração, Content-Type não validado (parágrafo de securityExample) | MANTIDO | security.hardening (duplicado lá) |
| 39 | deepDive.operationalImpact / securityImpact / keyTerms / whenToUse | REMOVIDO | Duplicados em architecture, security, glossary e summary |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar o papel das Camadas 5, 6 e 7 no OSI | concept (definição + tabela), summary, fc2.7.1–3, q2.7.1 |
| Diferenciar sessão, apresentação e aplicação sem decorar nomes vazios | concept (tabela com sintoma típico), problem (4 perguntas), analogy, ex2.7.2 |
| Relacionar TLS, codificação, serialização, HTTP, DNS, APIs e autenticação com as camadas | concept §2, internals (fluxo + campos), diagram |
| Diagnosticar quando a rede funciona, mas aplicação, certificado, formato ou sessão falha | internals, troubleshooting, simple/enterprise/cloud/devsecops examples, mentor 1–3, q2.7.2/4/5, challenge |
| Entender riscos em TLS, headers, cookies, tokens, dados codificados, logs e APIs | security (vulnerabilidades, hardening, monitoring), internals (campos), q2.7.3/6, ex2.7.3 |
| Coletar evidências defensivas com comandos seguros e interpretação por camadas | troubleshooting.commands/decisionTree, ex2.7.3, challenge, commentedSolution |

## 10. O que mudou na nova versão
- Removidos `history`, `evolution`, `securityExample` e os quatro intros invisíveis; o útil de cada um foi fundido em concept, enterpriseExample e security.
- Movidos os campos invisíveis `protocolFields`, `packetFlow`, `deepDive` e `commonMistakes` para internals, concept, summary, cloudExample e security (é por isso que as palavras visíveis sobem ~4%, apesar de T cair).
- `concept`: tabela por camada (reestruturação de definição + flashcards). **Acréscimo novo justificado:** a coluna "Sintoma típico de falha" tem duas formulações novas ("usuário 'cai' do sistema, 401 depois que a sessão expira"; "caracteres trocados") — necessárias para o objetivo 2 (diferenciar as camadas pelo sintoma), que antes só era coberto por definição.
- `internals`: lista → tabela com falha típica; tabela de campos; callout Erros comuns. A frase "Qualquer status prova que um componente HTTP respondeu" vem da explicação do mentor 2 original ("Se há 403, algum componente de aplicação respondeu").
- Quiz: mesmas 6 questões e ids; distratores absurdos trocados por plausíveis (outras camadas, 401↔403 invertidos, "-k desativa a criptografia", "Base64 usa chave curta"); explicações dizem por que cada distrator falha; gabarito redistribuído com `quiz_embaralhar` (0:1, 1:2, 2:2, 3:1). **Acréscimo novo justificado:** a explicação de q2.7.6 afirma que com `-k` o canal continua criptografado e só a verificação de identidade é desligada — fato verificável (opção `--insecure` do curl), necessário para refutar o distrator.
- Flashcards: 2 trocas (fc2.7.4 → fc2.7.7 HTTP 200, de deepDive.limitations; fc2.7.5 → fc2.7.8 SAN, de protocolFields). Continuam 6.
- Mentor: pergunta 2 trocada (403 duplicava ex2.7.4) por "401 depois de um tempo funcionando" — **substituição, não acréscimo**: cobre a Camada 5 (objetivo 4, "a sessão falha"), que não tinha nenhum item de prática; é respondível pelo concept (tabela) e pelo enterpriseExample (SameSite, relógio do IdP). Continuam 3.
- Exercícios: 4 → 3 (ex2.7.1 removido por duplicar q2.7.2, mentor 3 e internals).
- Security: badPractices 5 → 2; commonErrors sem "Tratar 403 como indisponibilidade" (está no callout Erros comuns); +"WAF mal calibrado" (movido de securityExample); monitoring com o fato de deepDive.
- `duration` 85-120 → 65-90 min; `estimatedStudyTimeMinutes` 120 → 90; subtítulo enxugado; h2 sem números.

## 11. Depois
Palavras visíveis: 4055 → 4239 (+4,5%; ~620 palavras movidas de campos invisíveis e +179 no quiz pelas explicações dos distratores; teoria visível 2659 → 2612) · Invisíveis: 772 → 40 (só networkContext) · Cortes brutos: 680 (17%, coerente com a linguiça estimada) · Duração: 85-120 min → 65-90 min (T 82,5 → 76,1) · Quiz corrigido: sim (6 questões, distratores e gabarito)

## 12. Revisão humana
- O módulo m02 lista `lab-2.7` em `assessment.requiredLabs`, mas a aula original não tem `lab` (nem antes nem depois da revisão; `progressRules` usa exerciseDone/practicalExerciseDone). Não criei lab (seria conteúdo novo fora do escopo); decidir se o requisito do módulo deve ser removido ou se a aula precisa de lab.
- `glossary[].relatedLessons` foi mantido (o app não exibe; o `validar` não acusou). Confirmar se é metadado a preservar.
- `linksToOtherCourses` aponta para a lição "8.x" do módulo 8 (genérico); mantido como estava.

```json
{
  "id": "2.7", "modulo": "m02", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Camadas 5, 6 e 7 — Sessão, Apresentação e Aplicação",
  "duracao_declarada": "85-120 min", "T_original_min": 82.5, "duracao_nova": "65-90 min", "veredito_duracao": "INFLADA",
  "T_nova_min": 76.1, "duracao_nova_estimated_max": 90,
  "linguica_nivel": "MÉDIA", "linguica_pct": 17, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 8, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 4055, "palavras_visiveis_depois": 4239,
  "palavras_invisiveis_antes": 772, "palavras_invisiveis_depois": 40,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:concept", "problem": "ENXUGAR", "evolution": "REMOVER",
    "concept": "MANTER", "internals": "MANTER", "architecture": "MANTER", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "MANTER", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "protocolFields": "MOVER:internals", "packetFlow": "MOVER:internals",
    "deepDive": "MOVER:summary", "commonMistakes": "MOVER:internals",
    "quiz": "MANTER", "flashcards": "ENXUGAR", "mentorQuestions": "MANTER", "exercises": "ENXUGAR",
    "challenge": "MANTER", "commentedSolution": "MANTER", "glossary": "MANTER", "security": "ENXUGAR",
    "troubleshooting": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 6, "objetivos_cobertos": true,
  "revisao_humana": [
    "Módulo m02 exige lab-2.7 em requiredLabs, mas a aula não tem lab (antes e depois)",
    "glossary[].relatedLessons mantido (não exibido); confirmar se é metadado a preservar",
    "linksToOtherCourses com lição genérica '8.x' mantida"
  ]
}
```
