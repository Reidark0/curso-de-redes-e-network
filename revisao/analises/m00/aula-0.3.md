# Aula 0.3 — ASCII, Unicode, UTF-8 e Base64
Tipo: fundamental · Duração declarada: 70-95 min · Palavras visíveis / invisíveis (antes): 5882 / 682

## 1. Duração
T pela fórmula = 134,3 min (teoria 27,3, diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 45)
Veredito: SUBESTIMADA. M = 82,5 min < 0,8×T = 107,4 min. A divisão entre teoria (23%) e prática faz sentido para uma aula fundamental com lab de terminal. O lab declara 45 min para 5 comandos de uma linha mais uma tabela de evidências, o que a ferramenta aceita como plausível (alternativa 30,9 min) mas está inflado: na nova versão vai para 30 min. Faixa recomendada original: 115-160 min.

## 2. Encheção de linguiça
Nível: MÉDIA (~16%). Evidências:
- `evolution` repete `history` e `concept`: "quais caracteres existem, qual número representa cada caractere e como esse número vira bytes"; a tabela "O que é / O que não é" repete a tabela de `history` e a de `concept`; o parágrafo final ("prefira UTF-8 de ponta a ponta…") repete `architecture`, o callout de `enterpriseExample` e `security.goodPractices`.
- A recomendação "padronizar UTF-8, testar caracteres internacionais, declarar charset" aparece 5 vezes (evolution, architecture, callout do enterprise, security, commentedSolution).
- `securityExample` sobrepõe `security`: a tabela de riscos tem 3 linhas idênticas às `vulnerabilities`, e o aviso de ética ("Não é aceitável usar esse conhecimento…") repete `lab.safetyNotes`.
- `cloudExample`: lista genérica de serviços ("funções serverless, filas, eventos, logs gerenciados, objetos em storage, API gateways…") e uma tabela que não ensina nada específico. `devsecopsExample` abre com lista parecida ("repositórios Git, pipelines, arquivos YAML, manifests…").
- Meta-texto: "Esta aula mostra como texto vira número… Esse fundamento será usado mais tarde em HTTP, DNS, TLS…" (motivation); "Vamos acompanhar uma frase simples… Para um humano, isso é texto" (internals).
- `troubleshooting.commands` repete os passos 1–4 do lab (mesmos comandos Base64) e tem um `show logging` de Cisco sem relação com o diagnóstico.
- O cenário "API falha só com acentos" aparece em motivation, enterprise, decisionTree, mentor 2, quiz q0.3.3, exercício ex0.3.3, desafio e cenário do lab. O Kubernetes Secret aparece em devsecops, mentor 3, quiz q0.3.5 e exercício ex0.3.4.
- Ritual de lab: safetyNote "O objetivo é entender codificação defensivamente…"; improvements "em aula futura"; 2 das 4 `lab.questions` repetem quiz e mentor.
- Frases repetidas entre aulas (frases_repetidas): só "o laboratório desta aula é local e seguro" (labIntro, invisível) e "por que base64 não deve ser tratado como" (lab.questions, removida por duplicar o quiz).
- Campos invisíveis com conteúdo: deepDive (295 palavras) e commonMistakes (181).

## 3. Conteúdo útil
FORTE. O que tem de realmente valioso: separação clara caractere/ponto de código/codificação; exemplos concretos e corretos (`Olá` = `4F 6C C3 A1`, `admin:admin` = `YWRtaW46YWRtaW4=`, `Hello` = `SGVsbG8=`); Base64 com blocos de 6 bits; armadilha de normalização e homógrafos; lab executável com saídas verificáveis; desafio e solução comentada bem amarrados (separar transporte de interpretação).
Lacunas: (1) o mecanismo do texto quebrado `UsuÃ¡rio` aparece 3 vezes e nunca é explicado (bytes UTF-8 lidos como Latin-1, `C3`=Ã, `A1`=¡), o que é central para o learning outcome 4; (2) o learning outcome 1 pede o binário do caractere ASCII e a aula só dá decimal e hex; (3) não diz que ASCII tem 7 bits/128 valores (o que explica por que "não coube"); (4) não diz quantos bytes UTF-8 usa por faixa (a aula só menciona 1 a 4 no glossário); (5) Base64: falta o crescimento de 4/3 (~33%), o alfabeto e o significado de `=`/`==`, e a diferença do Base64URL (citado mas não explicado); (6) não há comando para descobrir a codificação de um arquivo ou o charset declarado por um servidor (diagnóstico pedido no learning outcome 4).
Erros técnicos: a tabela do exemplo simples chama os bytes de "aproximados" (são exatos) e põe a saída Base64 na coluna "Bytes em UTF-8". O passo 5 do lab usa `python -` com heredoc (não roda no PowerShell, e em muitas distribuições Linux o comando é `python3`) e tem resultado esperado vago.

## 4. Aproveitamento
MÉDIO (~78%). Contra o T original de 134 min, cerca de 30 min não ensinam nada novo: ~7 min de leitura redundante (evolution, securityExample, listas genéricas de cloud e DevSecOps, meta-texto), ~15 min de lab inflado (45 min para 5 comandos) e ~8 min de exercício e mentor repetindo o mesmo cenário (API com acento, Kubernetes Secret). Contra a duração declarada (82,5 min) a conta nem fecha: a aula já não cabe no tempo que promete.

## 5. Pode ser mais curta?
SIM. Redução prevista: ~16% do T (cortes de redundância ≈ 6 min e lab de 45 para 30 min), sem perder nenhum item do inventário. A redução real ficou em 11% (134,3 → 119,5 min) porque a nova versão acrescenta o conteúdo que faltava para cumprir os objetivos (lacunas 1–6).

## 6. Explicação mais direta
SIM.
- `internals`: a lista de 7 passos ("o usuário digita… a aplicação representa… a codificação transforma…") virou duas frases, e o "Fluxo mental" ficou. O Base64 ganhou um procedimento numerado e uma conta feita bit a bit (`Hel` → `SGVs`) no lugar da descrição genérica "reagrupa em blocos de 6 bits".
- `history` + `evolution`: duas tabelas comparativas (Época/Problema/Limitação/Impacto e O que é/O que não é/Exemplo) viraram uma só.
- `securityExample`: o parágrafo "codificação é reversível… criptografia depende de chave… hash é unidirecional… assinatura…" virou uma tabela de 4 linhas em `concept` (chave? reversível? para que serve).
- `simpleExample`: tabela com colunas certas (caracteres × bytes × total).

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Fica o caso do SOC e o callout. Saem a lista longa e o meta-texto "esta aula mostra… será usado mais tarde". |
| history | ENXUGAR | Fica: explica por que existe mojibake (fragmentação de tabelas de 8 bits) e por que UTF-8 venceu (compatível com ASCII). Ganha 7 bits/128 valores e o binário de A. Recebe a tabela única fundida com evolution. |
| problem | ENXUGAR | Fica a lista de onde texto e Base64 aparecem nos protocolos. Sai o item de lista redundante. A armadilha de normalização ganhou um exemplo concreto (`C3 A1` × `61 CC 81`). |
| evolution | FUNDIR:history | A tabela "o que é / o que não é" foi para history, o parágrafo sobre canais que não aceitam qualquer byte foi para internals, e a recomendação final já está em security. |
| concept | MANTER | Núcleo. Recebe a tabela codificação × criptografia × hash × assinatura (vinda de securityExample). |
| internals | MANTER | Núcleo, com os passos enxugados. Recebe: tabela de bytes por faixa do UTF-8, mecanismo do `UsuÃ¡rio`, procedimento do Base64 com conta bit a bit, 4/3 (~33%), Base64URL e o erro comum "1 caractere = 1 byte" (vindo de commonMistakes). |
| architecture | ENXUGAR | Fica a visão por camada, com um exemplo real de `Content-Type`. Sai o parágrafo final de recomendações (duplicado). |
| analogy | ENXUGAR | A analogia é boa. O limite ficou em 1 frase. |
| simpleExample | MANTER | Concreto. Tabela corrigida (bytes exatos, colunas certas, mais `ação`). |
| enterpriseExample | ENXUGAR | Fica o caso ERP Windows-1252 → UTF-8 e a pergunta "original, escapada, codificada, normalizada ou truncada?". Sai o callout repetido. |
| cloudExample | ENXUGAR | Fica só o específico: Base64 dentro de JSON custa ~33% a mais (1 GB → 1,33 GB). Saem a lista genérica e a tabela. |
| devsecopsExample | ENXUGAR | Fica o Kubernetes Secret e o callout de commit. Sai a lista genérica. |
| securityExample | FUNDIR:security | Riscos já em security.vulnerabilities. O homógrafo virou a 4ª vulnerabilidade, a distinção codificação/cripto/hash/assinatura foi para concept e o aviso de ética foi removido (lab.safetyNotes cobre). |
| diagram | MANTER | Correto e legível. Só o `<h2>` perdeu o número. |
| labIntro | REMOVER | Invisível. |
| exercisesIntro | REMOVER | Invisível. |
| challengeIntro | REMOVER | Invisível. |
| solutionIntro | REMOVER | Invisível. |
| summary | ENXUGAR | 5 bullets. A primeira linha vem do deepDive.mentalModel, e os bullets ganharam números (128, 1 a 4 bytes, 4/3) e a pista de diagnóstico. |
| nextTheme | ENXUGAR | 1 frase coerente com 0.4 (Mbps × MB/s). |
| networkContext | MANTER | Metadado. |
| deepDive | MOVER:summary/internals/security | mentalModel → summary. limitations e whenNotToUse → internals (tamanho, 1 caractere ≠ 1 byte) e security.badPractices (+ "converter repetidas vezes"). financialImpact → cloudExample (+33%) e goodPractices (logar só o necessário). securityImpact → security.vulnerabilities (homógrafos). operationalImpact já estava em architecture e troubleshooting. Campo removido. |
| commonMistakes | MOVER:internals/security/commentedSolution | "1 caractere = 1 byte" → callout em internals. "Base64 é criptografia" → concept e security. "Culpar a rede" → decisionTree e commentedSolution.commonWrongAnswers. "Copiar Base64 para tickets" → security.commonErrors e goodPractices. Campo removido. |
| security | ENXUGAR | Fundido com securityExample (+homógrafos), +2 práticas vindas do deepDive. Saiu "Criar testes…" de monitoring (era uma boa prática repetida). |
| troubleshooting | ENXUGAR | Ficam os 2 comandos de bytes, symptoms, questions e decisionTree. Saem os 2 comandos Base64 (duplicavam o lab) e o `show logging`. Entram `file -i`, a reprodução do mojibake com `iconv` e o `curl -sI` para ver o charset declarado. |
| lab | ENXUGAR | Executável. estimatedTimeMinutes 45 → 30. Passo 2 com alternativa `od`. Passo 5 com `python3`, nota para Windows e saída esperada exata. Cortes: safetyNote ritual, 2 improvements "aula futura", 2 questions duplicadas e a menção "aula futura" na topologia. |
| quiz | ENXUGAR | 6 → 7 questões. Saem q0.3.3 (distratores "Ataque BGP", "cabo físico"; duplicava ex/mentor/desafio) e q0.3.6 (distratores triviais "somente tabela ARP"). Entram q0.3.7 (mojibake), q0.3.8 (limite em bytes) e q0.3.9 (tamanho Base64), com respostas nas posições 2, 1 e 3. |
| flashcards | ENXUGAR | fc0.3.1 ganhou 7 bits/128. Novo fc0.3.7 (Base64URL). Total 7. |
| mentorQuestions | ENXUGAR | A 2ª (API com acento, igual a ex0.3.3, quiz q0.3.3 e desafio) foi trocada por uma questão de HMAC × bytes (escape `á`, NFC/NFD, CRLF), que cobre o learning outcome 5. |
| exercises | ENXUGAR | ex0.3.3 (hipóteses, igual à tarefa 1 do desafio) → ex0.3.5 (mojibake byte a byte). ex0.3.4 (Kubernetes, igual a mentor 3 e quiz q0.3.5) → ex0.3.6 (contas de bytes UTF-8 e Base64). |
| challenge | MANTER | Bom e alinhado. |
| commentedSolution | MANTER | Bom. |
| glossary | MANTER | +"Ponto de código" (termo central). ASCII com 7 bits e o binário. |
| references | MANTER | Reais (Unicode, RFC 3629, RFC 4648, aula 0.2). |
| linksToOtherCourses | MANTER | Reais. |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Rede transporta bytes; aplicação interpreta | MANTIDO | summary, concept, architecture, diagram |
| 2 | Caractere / ponto de código / codificação / charset (definições) | MANTIDO | concept |
| 3 | ASCII: tabela de caracteres básicos do inglês | MANTIDO | history, glossary, flashcard |
| 4 | A = 65 = 0x41 | MANTIDO | history (+ binário 0100 0001), glossary |
| 5 | Tabelas locais geram fragmentação (mesmo valor, caracteres diferentes) | MANTIDO | history (com Latin-1/Windows-1252) |
| 6 | Unicode: repertório universal, U+0041, U+00E1 | MANTIDO | history, concept, glossary |
| 7 | Ponto de código não é a sequência de bytes; UTF-8/16/32 | MANTIDO | history, glossary "Ponto de código" |
| 8 | UTF-8 dominante por compatibilidade com ASCII | MANTIDO | history |
| 9 | á = C3 A1; Olá = 4F 6C C3 A1 (4 bytes) | MANTIDO | internals, simpleExample, diagram, lab |
| 10 | UTF-8 usa 1 a 4 bytes | MANTIDO | internals (tabela por faixa), summary, glossary |
| 11 | Caracteres ≠ bytes (validação, truncamento) | MANTIDO | internals (callout de erro comum), quiz q0.3.8 |
| 12 | Base64: blocos de 6 bits, tabela de 64 caracteres, `=` de preenchimento | MANTIDO | internals (procedimento e conta) |
| 13 | Base64 resolve canais que não aceitam qualquer byte (e-mail, JSON, XML, PEM, HTTP) | MANTIDO | internals |
| 14 | Hello = SGVsbG8=; admin:admin = YWRtaW46YWRtaW4= | MANTIDO | internals, simpleExample, history, lab, exercício |
| 15 | Base64 é reversível sem chave; não é sigilo | MANTIDO | concept, simpleExample, summary, security, quiz q0.3.2 |
| 16 | Base64 aumenta tamanho e custo | MANTIDO | internals (~33%), cloudExample, quiz q0.3.9 |
| 17 | Codificação × criptografia × hash × assinatura | MANTIDO | concept (tabela) |
| 18 | Basic usa Base64; PEM é Base64; JWT usa Base64URL | MANTIDO | problem, internals (Base64URL), summary |
| 19 | Mudar bytes invalida HMAC/assinatura/hash | MANTIDO | problem, analogy, concept, mentor 2, decisionTree |
| 20 | Normalização Unicode e acentos compostos | MANTIDO | problem (com bytes), security, mentor 2 |
| 21 | Homógrafos (phishing, fraude) | MANTIDO | security.vulnerabilities (MOVIDO de securityExample) |
| 22 | Normalização inconsistente WAF/aplicação/banco → bypass, FP/FN | MANTIDO | security.vulnerabilities, enterpriseExample |
| 23 | Logs quebrados prejudicam busca e correlação | MANTIDO | problem, security.vulnerabilities, flashcard |
| 24 | Charset/Content-Type em HTTP; TLS não corrige codificação | MANTIDO | architecture, troubleshooting |
| 25 | Camadas: aplicação, protocolo, transporte, segurança, observabilidade, automação | MANTIDO | architecture |
| 26 | Legado CSV com codificação local → pipeline → SIEM | MANTIDO | enterpriseExample |
| 27 | Pergunta "original, escapado, codificado, normalizado, truncado?" | MANTIDO | enterpriseExample, troubleshooting.diagnosticQuestions |
| 28 | Kubernetes Secret em Base64 ≠ criptografado; RBAC, etcd, rotação | MANTIDO | devsecopsExample, mentor 3, quiz q0.3.5 |
| 29 | Commitar segredo em Base64; usar cofres, OIDC, menor privilégio | MANTIDO | devsecopsExample |
| 30 | Comandos PowerShell/Linux de bytes e Base64 (encode/decode) | MANTIDO | lab passos 1–4, troubleshooting (bytes) |
| 31 | Comandos Base64 em troubleshooting.commands | REMOVIDO | duplicados no lab, passos 3 e 4 |
| 32 | `show logging` (Cisco) | REMOVIDO | fora do escopo: não diagnostica codificação |
| 33 | Mascarar segredos, não logar Authorization, secret scanning | MANTIDO | security |
| 34 | Ética: não expor credenciais de terceiros | MANTIDO | lab.safetyNotes, challenge.constraints (o parágrafo de securityExample foi removido por duplicado) |
| 35 | Remover acentos não resolve | MANTIDO | commentedSolution.commonWrongAnswers |
| 36 | Uso histórico de "charset" varia | MANTIDO | concept |
| 37 | Camada conceitual: aplicação/apresentação (quiz q0.3.6) | MANTIDO | architecture e networkContext (questão removida por trivial) |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar caractere, código, codificação, byte e representação textual | concept (definições e tabela), internals, ex0.3.1, glossary |
| Por que ASCII bastou e depois não bastou | history (7 bits/128 valores, tabelas locais, Unicode), tabela de history, flashcard fc0.3.1 |
| Unicode como repertório e UTF-8 como codificação | history, concept, internals (bytes por faixa), quiz q0.3.1/q0.3.4/q0.3.8 |
| O que Base64 resolve e por que não é criptografia/hash/segurança | internals (procedimento, 4/3, Base64URL), concept (tabela cripto/hash/assinatura), devsecops, lab 3–4, quiz q0.3.2/q0.3.5/q0.3.9 |
| Relacionar com HTTP, APIs, logs, tokens, certificados, headers, troubleshooting e segurança | problem, architecture, internals (mojibake), troubleshooting (file -i, iconv, curl), security, mentor 2, ex0.3.5, quiz q0.3.7, desafio |

## 10. O que mudou na nova versão
- Removidas as seções `evolution` (fundida em history) e `securityExample` (fundida em security e concept), mais os 4 `*Intro` invisíveis, `deepDive` e `commonMistakes` (conteúdo movido).
- Acrescentado o que faltava para os objetivos: ASCII de 7 bits e o binário de A; bytes por faixa do UTF-8 (com `€` e emoji); mecanismo do `UsuÃ¡rio` (C3 A1 lido como Latin-1); Base64 passo a passo com conta bit a bit, alfabeto, `=`/`==`, ~33%, Base64URL; exemplo de normalização com bytes; tabela codificação × criptografia × hash × assinatura.
- Troubleshooting: os comandos duplicados do lab e o `show logging` deram lugar a `file -i`, `iconv` (reprodução do mojibake) e `curl -sI` (charset declarado).
- Corrigidos o exemplo simples ("aproximados" e a coluna errada) e o passo 5 do lab (`python3`, nota para Windows, saída exata). `lab.estimatedTimeMinutes` 45 → 30 (5 comandos de uma linha; 5 min/passo + leitura ≈ 31 min).
- Quiz: −2 questões triviais e +3 de raciocínio/cálculo (7 no total, posições de resposta variadas). Exercícios: 2 duplicados trocados por mojibake e contas de bytes. Mentor: a questão duplicada foi trocada por HMAC × bytes. Flashcard novo sobre Base64URL. Glossário: +Ponto de código.
- `<h2>` sem número; tabelas novas em `responsive-table` + `data-table`; callout novo com `callout warning`.
- duration 70-95 → 100-145 min; estimatedStudyTimeMinutes 95 → 145.

## 11. Depois
Palavras visíveis: 5882 → 6035 (+2,6%; cortes brutos 827 = 14%, acréscimos 980, a maior parte vinda de campos invisíveis e das lacunas preenchidas) · Invisíveis: 682 → 31 (só networkContext) · Duração: declarada 70-95 min → nova 100-145 min (T 134,3 → 119,5 min; veredito novo ORGANIZADA, 24% de teoria) · Quiz corrigido: sim (7 questões; formato padronizado, `a` → `answer`; q0.3.3 e q0.3.6 substituídas por q0.3.7–q0.3.9)
Aviso do `validar`: "ids de quiz originais ausentes: q0.3.3, q0.3.6". É intencional: as questões foram trocadas por triviais/duplicadas (regra 7.7 e 11.5), e os ids novos são inéditos.

## 12. Revisão humana
- A duração declarada sobe de 70-95 para 100-145 min. É consequência da fórmula fixa (a original estava SUBESTIMADA), mas muda o que o aluno vê no card da aula.
- `lab.estimatedTimeMinutes` reduzido de 45 para 30 min por julgamento (5 comandos curtos). Confirmar se o curso prefere manter 45.
- Questões q0.3.3 e q0.3.6 removidas: quem já tinha respondido perde essas respostas salvas (ids não reaproveitados).
- Conteúdo técnico acrescentado e conferido localmente (python3/iconv/file/base64): faixas de bytes do UTF-8, mojibake via Latin-1, Base64 bit a bit, `61 CC 81`, `file -i`, `iconv`. O comando `curl -sI … | grep -i '^content-type'` usa um endpoint genérico (`SEU-ENDPOINT`); a saída exata depende do servidor.
- O `glossary[].relatedLessons` (subcampo não exibido) foi mantido como estava, porque o `validar` não reclamou dele.

```json
{
  "id": "0.3", "modulo": "m00", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "ASCII, Unicode, UTF-8 e Base64",
  "duracao_declarada": "70-95 min", "T_original_min": 134.3, "duracao_nova": "100-145 min", "T_nova_min": 119.5, "duracao_nova_estimated_max": 145,
  "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 16, "conteudo_util": "FORTE", "aproveitamento": "MÉDIO",
  "pode_ser_mais_curta": true, "reducao_tempo_pct": 11, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 5882, "palavras_visiveis_depois": 6035,
  "palavras_invisiveis_antes": 682, "palavras_invisiveis_depois": 31,
  "secoes": {
    "motivation": "ENXUGAR", "history": "ENXUGAR", "problem": "ENXUGAR", "evolution": "FUNDIR:history",
    "concept": "MANTER", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "FUNDIR:security", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "ENXUGAR", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary/internals/security", "commonMistakes": "MOVER:internals/security/commentedSolution",
    "security": "ENXUGAR", "troubleshooting": "ENXUGAR", "lab": "ENXUGAR", "quiz": "ENXUGAR", "flashcards": "ENXUGAR",
    "mentorQuestions": "ENXUGAR", "exercises": "ENXUGAR", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Duração declarada sobe de 70-95 para 100-145 min (fórmula fixa; original SUBESTIMADA).",
    "lab.estimatedTimeMinutes reduzido de 45 para 30 min por julgamento.",
    "q0.3.3 e q0.3.6 removidas: respostas salvas dessas questões deixam de existir.",
    "Conteúdo técnico acrescentado (faixas UTF-8, mojibake, Base64 bit a bit, file -i, iconv, curl -sI) conferido localmente; saída do curl depende do servidor.",
    "glossary[].relatedLessons (subcampo não exibido) mantido como no original."
  ]
}
```
