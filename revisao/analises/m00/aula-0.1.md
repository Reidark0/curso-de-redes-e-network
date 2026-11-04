# Aula 0.1 — Como computadores representam informação
Tipo: fundamental · Duração declarada: 55-80 min · Palavras visíveis / invisíveis (antes): 6802 / 646

## 1. Duração
T pela fórmula = 127,7 min (teoria 30,7 · diagramas 3 · quiz 6 · flashcards 3 · mentor 6 · exercícios 24 · desafio 20 · lab 35)
Veredito: **SUBESTIMADA**. M = 67,5 min < 0,8×T (102 min). O lab declara 35 min para 7 passos curtos (alternativa da fórmula: 43 min), o que é plausível. A divisão está equilibrada para uma aula fundamental com lab: 26% de leitura, o resto é prática e fixação. O que puxa o tempo para cima é a parte fixa da fórmula (exercícios 24 + desafio 20), e não a leitura.

## 2. Encheção de linguiça
Nível: **MÉDIA (~20%)**. Evidências:
- `history`: narrativa de telégrafo, cartões e válvulas mais uma tabela de "épocas". Só a frase "dois estados são mais fáceis de distinguir… se um bit muda, o dado muda" explica o mecanismo.
- `evolution`: o 1º parágrafo é narrativa genérica ("busca por confiabilidade, velocidade, densidade…"); o 2º repete o exemplo do `concept` ("o mesmo valor binário pode representar um número, uma letra…").
- `motivation`: o callout "Problema real" e "Esta aula é a base invisível de todo o curso" repetem a ideia dos parágrafos anteriores e do `problem`.
- `problem`: a lista "Que escala ele permite? / Que risco ele reduz?" é meta-texto que repete a motivação.
- `analogy`: o "Limite da analogia" ocupa 50 palavras ("temporização, modulação, ruído, multiplexação, criptografia, buffers…").
- `securityExample`: a tabela de riscos duplica `security.vulnerabilities`/`badPractices` (Base64, parsing, logs, falso positivo), e o "Limite ético" é um aviso padrão.
- `enterpriseExample`/`cloudExample`/`devsecopsExample`: listas genéricas ("Um commit vira diff. Um build vira imagem… Um teste vira relatório"; "Um firewall registra logs… Um EDR coleta eventos… Um balanceador mede conexões").
- `simpleExample`: o "Mini fluxo" repete a cadeia do `internals`.
- Lab: a frase repetida em 56 aulas, "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório" (3×); os passos 5 e 7 se sobrepõem; `validation` repete os comandos dos passos; `safetyNotes` traz um aviso ritual ("objetivo é defensivo e educacional"); `improvements` repete o `lab.challenge`.
- Base64 = não é criptografia aparece em quiz q3, fc5, ex3, `security` (4×), `commentedSolution` e lab, quase sempre com as mesmas palavras.
- O exercício 4 (fluxo de 5 etapas da mensagem) pergunta a mesma coisa que o desafio e a solução comentada.
- Conteúdo guardado em invisíveis: `deepDive` (285 palavras) e `commonMistakes` (160).

## 3. Conteúdo útil
**PARCIAL**. Pontos de valor: a separação informação × representação × interpretação; o 01000001 = 65 = A como exemplo de "sem contexto, bits são bits"; a cadeia de 7 etapas; as imperfeições físicas (CRC, codificação de linha); a tabela "nível / quem interpreta / falha típica" (útil para troubleshooting); flow log × captura; o lab com Format-Hex/xxd/Base64; a árvore de decisão.
Lacunas: (1) nenhum valor concreto: a aula manda ver os bytes de "rede", mas nunca diz quais são (72 65 64 65), e o lab tem resultados esperados vagos ("uma string Base64"); (2) cita "codificação, compressão, serialização, criptografia, hash" o tempo todo sem diferenciá-los, embora o learningOutcome 5 exija isso; (3) o objetivo 4 (por que binário/hex aparecem em IPv4 e MAC) só é coberto por listas, sem dizer que o IPv4 tem 4 bytes e o MAC tem 6; (4) payload e UTF-8 são usados sem definição numa aula 0.1.
Erros técnicos: (a) o diagrama encadeia Sinal físico → Cloud → Ferramentas → Destino, como se o destino recebesse os dados via SIEM/Wireshark; (b) "MAC criptográfico" aparece sem distinção do endereço MAC, o que é ambíguo para iniciantes; (c) o desafio do lab ("palavra acentuada usa mais bytes") falha no Windows PowerShell 5.1, que grava em ANSI por padrão (ver Revisão humana).

## 4. Aproveitamento
**BOM**. Cerca de 87% do tempo (aproximadamente 111 de 128 min) vai para prática e conceitos do objetivo. As perdas são cerca de 8 min de leitura redundante, os 6 min do exercício 4 duplicado e o ritual do lab.

## 5. Pode ser mais curta?
**NÃO**. Redução prevista: ~3% (T 127,7 → 124,5). A linguiça está quase toda na teoria, que vale só 31 min, e o tempo é dominado pelas partes fixas de prática (lab 35, exercícios 24, desafio 20).

## 6. Explicação mais direta
**SIM**.
- `concept`: definição na caixa antes de tudo, sem repetir a 1ª frase do parágrafo.
- `simpleExample`: tabela r/e/d/e → decimal/hex/binário no lugar da prosa e do mini fluxo.
- `history` + `problem`: 1 parágrafo "Por que dois estados?" no lugar de uma seção de história com tabela.
- `evolution` + `architecture`: uma só tabela por nível, no lugar de uma tabela e de uma lista de camadas com conteúdo sobreposto.
- `securityExample`: um exemplo concreto (Authorization: Basic) no lugar de uma tabela que repete o bloco `security`.
- Lab: resultados esperados concretos (72 65 64 65, cmVkZQ==).

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Fica o cenário SOC e a pergunta-guia; saem o callout "Problema real" e "base invisível do curso", que eram repetidos |
| history | FUNDIR:problem | Virou o bloco "Por que dois estados?" (telégrafo, cartões e tensão em 1 frase; o motivo da escolha binária e o bit trocado); a tabela de épocas saiu |
| problem | ENXUGAR | Mantém o mecanismo (sinal → bits → interpretação) e a escala; sai a lista de meta-perguntas; o callout de erro foi para o `concept` |
| evolution | FUNDIR:architecture | A tabela por nível foi para `architecture`; o parágrafo narrativo e o exemplo repetido saíram |
| concept | ENXUGAR | Núcleo mantido. Ganhou uma tabela codificação/serialização/compressão/criptografia/hash (lacuna do LO5) e o callout "Erros comuns" (veio de `commonMistakes`) |
| internals | ENXUGAR | Os 7 passos e as imperfeições físicas ficam; o parágrafo inicial, que repetia a lista, foi cortado; "MAC criptográfico" foi esclarecido |
| architecture | ENXUGAR | Tabela única: níveis (de `evolution`) com o papel das camadas de enlace, rede e transporte (da lista antiga) + parágrafo de troubleshooting |
| analogy | ENXUGAR | Analogia boa mantida; o limite ficou em 1 frase |
| simpleExample | ENXUGAR | A = 65 mantido; o mini fluxo foi trocado por uma tabela de bytes de "rede"; entraram "ação" = 6 bytes e IPv4 = 4 bytes / MAC = 6 bytes (objetivo 4) |
| enterpriseExample | ENXUGAR | Ficam os casos específicos (log legado quebrado, payload em hex); a lista genérica de sensores saiu |
| cloudExample | ENXUGAR | Flow log × captura mantido (cai no quiz); o custo ficou em 1 frase |
| devsecopsExample | ENXUGAR | Ficam imagem (camadas, manifestos, hashes, blobs), token OIDC e Base64 em Secret do Kubernetes; a lista "commit vira diff…" saiu |
| securityExample | ENXUGAR | Fica o parágrafo "controles interpretam"; a tabela de riscos foi FUNDIDA com `security` (estava duplicada) e o "Limite ético" saiu (as safetyNotes do lab cobrem); entrou o exemplo HTTP Basic |
| diagram | MANTER (corrigido) | O fluxo estava errado (Sinal → Cloud → Ferramentas → Destino). Agora: Sinal → Destino, e Ferramentas/Cloud ficam como observadores de cópias e resumos. Ids e title/desc preservados |
| labIntro | REMOVER | Invisível; o texto só apresentava o lab |
| exercisesIntro | REMOVER | Invisível; meta-texto |
| challengeIntro | REMOVER | Invisível; repetia o cenário do desafio |
| solutionIntro | REMOVER | Invisível; repetia o `commentedSolution.reasoning` |
| summary | MANTER | 5 bullets; o 1º agora é o `deepDive.mentalModel`; acrescentados "1 byte = 8 bits" e "rede = 72 65 64 65" |
| nextTheme | ENXUGAR | 1 frase com o título real da 0.2 |
| deepDive | MOVER:summary | O mentalModel virou o 1º bullet do resumo. keyTerms, limitations, when*, operational, financial e securityImpact já estavam cobertos no conteúdo visível (concept, architecture, cloud, security); o campo foi removido |
| commonMistakes | MOVER:concept | Os 4 erros viraram o callout "Erros comuns" no `concept`; campo removido |
| networkContext | MANTER | Metadado |
| security | ENXUGAR | Saíram as repetições internas sobre Base64 (goodPractices 4, commonErrors 2), o aviso de autorização e o item de bytes anormais duplicado entre monitoring e detection; o "falso positivo e perda de confiança" veio da tabela do securityExample |
| troubleshooting | MANTER | Comandos e árvore corretos; saídas esperadas concretas no xxd e no base64; ajustes leves de redação |
| lab | ENXUGAR | Sai o ritual (analysisTask 3×, safetyNote, improvements repetidos, comandos duplicados na validation); os passos 5 e 7 foram fundidos; entra o passo "Decodificar o Base64"; resultados esperados concretos; troubleshooting de newline unificado e item novo sobre o PowerShell 5.1; lab.solution com os bytes de "ação" |
| quiz | ENXUGAR/AJUSTAR | q0.1.1 (trivial, copiava o fc1) foi trocada por q0.1.7 (01000001 sem contexto); entrou q0.1.8 (ação = 6 bytes). 7 questões, gabarito 0,1,2,2,1,3,0 |
| flashcards | AJUSTAR | Saíram fc3 e fc5 (cópias de q2/q3); entraram fc7 (rede em hex), fc8 (0a = LF) e fc9 (checksum × MAC criptográfico). Ficam 7 |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, todas boas |
| exercises | AJUSTAR | ex4 saiu (duplicava o desafio); ex3 ficou prático (decodificar um Basic); entrou ex5 (classificar níveis). Ficam 4 |
| challenge | ENXUGAR | Saiu a restrição ritual "foco defensivo e educacional" |
| commentedSolution | MANTER | Correta e alinhada ao desafio |
| glossary | MANTER (+2) | Os 6 termos são usados; entraram UTF-8 e Payload, usados na aula sem definição |
| references | MANTER | Referências internas do curso (sem URL), mantidas como estavam |
| linksToOtherCourses | MANTER | Coerentes |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Representação digital = informação → bits armazenáveis, transmissíveis e reinterpretáveis | MANTIDO | concept (definition-box) |
| 2 | Bit: menor unidade, 2 estados, 0/1 | MANTIDO | concept; glossary; fc1 |
| 3 | Byte = 8 bits | MANTIDO | concept; summary; fc2; glossary |
| 4 | Informação × representação × interpretação | MANTIDO | concept |
| 5 | 01000001 = 65 = A, instrução ou byte de arquivo; sem contexto, bits são bits | MANTIDO | concept; simpleExample; q0.1.7 |
| 6 | Protocolos dão contexto: Ethernet (quadro), IPv4 (versão, tamanho, origem, destino), TCP (portas, seq, ack, flags), HTTP, TLS | MANTIDO | concept |
| 7 | Cadeia de 7 etapas (intenção → reconstrução; UTF-8, JSON, ASN.1; cabeçalhos) | MANTIDO | internals; diagram; commentedSolution |
| 8 | Imperfeições: interferência (cabo), ruído/reflexão/disputa (rádio), atenuação/conectorização (fibra) | MANTIDO | internals |
| 9 | Hardware mede e decide 0/1 → tolerâncias, sincronização, codificação de linha, checksums, CRC, retransmissões | MANTIDO | internals |
| 10 | Parser seguro, certificado, checksum (acidental) × MAC criptográfico (malicioso), SIEM | MANTIDO | internals (callout security, esclarecido); fc9 |
| 11 | Dois estados são mais fáceis de distinguir com ruído | MANTIDO | problem ("Por que dois estados?"); mentor 1; fc4 |
| 12 | Precursores: telégrafo (curto/longo), cartões (furo/sem furo), níveis de tensão | MANTIDO | problem (1 frase); a tabela de épocas foi REMOVIDA (história que não explica o mecanismo) |
| 13 | Mundo contínuo × representação discreta | MANTIDO | problem |
| 14 | Um bit trocado na transmissão muda o dado interpretado | MANTIDO | problem; architecture (bit flip) |
| 15 | Tabela de níveis: quem interpreta e falha típica | MANTIDO | architecture |
| 16 | Papel das camadas física, enlace, rede, transporte e aplicação | MANTIDO | architecture (dentro da tabela) |
| 17 | Troubleshooting por nível (sinal falha; encoding errado parece aplicação; criptografado = só metadados; binário ≠ ataque) | MANTIDO | architecture |
| 18 | Erro: "o computador envia um site/senha"; o significado depende de acordo entre origem e destino | MANTIDO | concept (Erros comuns); commentedSolution |
| 19 | Analogia das lâmpadas (0/1, 8 sinais = byte, código combinado) | MANTIDO | analogy |
| 20 | Representação diferente → caracteres estranhos com codificação errada | MANTIDO | simpleExample |
| 21 | Log legado com caracteres quebrados = falha de codificação, não de rede | MANTIDO | enterpriseExample; mentor 2 |
| 22 | Payload em hex: procurar padrões, cabeçalhos, strings | MANTIDO | enterpriseExample |
| 23 | Sensores (firewall, proxy, SIEM, EDR) produzem interpretações; coleta errada compromete a investigação | MANTIDO | enterpriseExample |
| 24 | Flow log = resumo (origem, destino, porta, protocolo, ação, bytes, pacotes, horário) ≠ captura | MANTIDO | cloudExample; q0.1.6 |
| 25 | Custo de logs, retenção e transferência em cloud | MANTIDO | cloudExample (1 frase) |
| 26 | Imagem de container = camadas, manifestos, hashes, blobs; token OIDC codificado e assinado | MANTIDO | devsecopsExample |
| 27 | Falhas comuns em automação: encoding, serialização, escaping, truncamento, YAML, Base64 em secrets | MANTIDO | devsecopsExample |
| 28 | Base64 é codificação reversível, não criptografia | MANTIDO | concept (tabela); securityExample; lab passos 4–5; q0.1.3; ex3; security |
| 29 | Parsing/canonicalização ambíguos → bypass; normalizar, validar, testar malformados | MANTIDO | security.vulnerabilities |
| 30 | Logging fraco → investigação inconclusiva; padrão, timezone, integridade, retenção | MANTIDO | security.vulnerabilities; decisionTree |
| 31 | Interpretação precipitada de payload → falso positivo e perda de confiança | MANTIDO | security.badPractices; q0.1.4; mentor 3 |
| 32 | Mitigações: criptografia, cofre, rotação, mascaramento, TLS, validação de schema | MANTIDO | security (vulnerabilities, hardening) |
| 33 | Monitoração/detecção: bytes anormais, erros de parser, segredos em logs, tamanho esperado × real | MANTIDO | security.monitoring/detectionIdeas (duplicata fundida) |
| 34 | Comandos Format-Hex, certutil -encode, xxd -g 1, base64, show interfaces (CRC, input errors) | MANTIDO | troubleshooting.commands |
| 35 | Árvore de decisão com 4 ramos | MANTIDO | troubleshooting.decisionTree |
| 36 | Lab: criar sem newline (-NoNewline / printf), ver texto, hex e Base64 | MANTIDO | lab passos 1–4 |
| 37 | Newline extra altera bytes e Base64; xxd ausente → hexdump -C | MANTIDO | lab.troubleshooting (2 itens fundidos); fc8 |
| 38 | Acentuados usam mais de 1 byte em UTF-8 | MANTIDO | simpleExample; lab.challenge/solution; q0.1.8; glossary UTF-8 |
| 39 | Wireshark mostra interpretação; formato desconhecido → bytes brutos | MANTIDO | lab passo 6; fc6; diagram |
| 40 | Pular binário/hex torna subnetting/MAC/IPv6 decoreba | MANTIDO | concept (Erros comuns) |
| 41 | Modelo mental "cadeia de traduções" (deepDive) | MANTIDO | summary (1º bullet) |
| 42 | "Diagnósticos ruins custam tempo e levam à compra de appliances" (deepDive.financialImpact) | REMOVIDO | genérico, sem conteúdo técnico; o custo concreto ficou no cloudExample |
| 43 | "Execute testes de payload só com autorização" / "Limite ético" | REMOVIDO | aviso ritual repetido; as safetyNotes do lab mantêm o essencial (só textos de teste, não coletar payload de terceiros) |

Itens novos (lacunas): bytes de "rede" (72 65 64 65 / cmVkZQ==), decodificação do Base64, tabela codificação/serialização/compressão/criptografia/hash, IPv4 = 4 bytes / MAC = 6 bytes, HTTP Basic, Base64 em Secret do Kubernetes, 0a/0d 0a, PowerShell 5.1 em ANSI, glossário UTF-8 e Payload. Valores conferidos no terminal (`od`, `base64`).

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Explicar por que computadores usam estados físicos interpretados como bits | problem ("Por que dois estados?"); internals; mentor 1; fc4 |
| Diferenciar informação, dado, bit, byte, sinal e interpretação por protocolo | concept; architecture (tabela); Erros comuns; ex1, ex5; q0.1.2 |
| Conectar representação com redes, pacotes, logs, cloud, DevSecOps e segurança | architecture; exemplos enterprise/cloud/devsecops/security; security; q0.1.4, q0.1.6 |
| Reconhecer por que binário/hex aparecem em IPv4, MAC, TLS, payloads, logs | simpleExample (tabela de bytes, IPv4 = 4 bytes, MAC = 6 bytes); lab passo 3; Erros comuns; nextTheme |
| Executar lab local texto → bytes e relacionar com tráfego | lab (7 passos, resultados concretos, passo 6 sobre Wireshark) |

## 10. O que mudou na nova versão
- 6 seções a menos: history foi fundida em problem; evolution, em architecture; os 4 *Intro invisíveis foram removidos.
- `concept` ganhou a tabela das transformações (codificação, serialização, compressão, criptografia, hash) e o callout "Erros comuns" (vindo de `commonMistakes`).
- `simpleExample` ficou concreto: a tabela de bytes de "rede", "ação" = 6 bytes, IPv4 com 4 bytes e MAC com 6.
- `securityExample` trocou a tabela duplicada pelo exemplo `Authorization: Basic` (o Base64 de usuario:senha).
- Diagrama: o fluxo foi corrigido (Sinal → Destino), e Ferramentas/Cloud ficaram como observadores dentro de um `svg-boundary`; ids preservados.
- Lab: sai o ritual; entra o passo "Decodificar o Base64"; resultados esperados concretos; troubleshooting com 0a/0d 0a e PowerShell 5.1; a solução do desafio mostra os bytes.
- Quiz: q0.1.1 foi trocada por q0.1.7 e entrou q0.1.8. Flashcards: 2 trocadas, 1 nova. Exercícios: ex4 trocado por ex5 e ex3 ficou prático. Glossário: +UTF-8 e +Payload.
- `deepDive` e `commonMistakes` foram removidos, com o conteúdo útil já movido. A duração foi atualizada para 105-150 min (estimatedStudyTimeMinutes = 150).
- Aviso do `validar` justificado: "ids de quiz originais ausentes: q0.1.1". A questão foi substituída de propósito (trivial e cópia do fc1), e o id não foi reaproveitado.

## 11. Depois
Palavras visíveis: 6802 → 6455 (−5,1%) · invisíveis: 646 → 40 (só networkContext) · Duração: 55-80 min → 105-150 min (T 127,7 → 124,5) · Quiz corrigido: sim (formato `a/q/opts/exp` → padrão; 7 questões)
A redução líquida (−5%) é menor que a linguiça estimada (~20%) porque, segundo 11.7, entraram conteúdo vindo de invisíveis (cerca de 150 palavras) e os acréscimos que cobrem lacunas: tabela de transformações, bytes concretos, 2 termos de glossário, 1 questão e 1 flashcard (cerca de 900 palavras). O corte bruto ficou perto de 1250 palavras (~18%), coerente com a estimativa.

## 12. Revisão humana
1. Lab troubleshooting: "o Windows PowerShell 5.1 grava com Set-Content na página de código ANSI do sistema; o PowerShell 7, em UTF-8". Confirmar num Windows real, porque disso depende o desafio do lab (ação = 6 bytes).
2. Diagrama corrigido: conferir visualmente no app a nova disposição (Destino abaixo de Sinal físico; caixa tracejada "Observadores" com Ferramentas e Cloud; seta "cópias e resumos").
3. A duração subiu de 55-80 para 105-150 min pela fórmula fixa, enquanto o módulo m00 declara `estimatedHours: 14` para 10 aulas. Decidir no fechamento do módulo se o total do módulo deve acompanhar.
4. `lab.labType` = "security" foi mantido, embora o lab seja conceitual e local; avaliar se outro tipo seria mais adequado.
5. As referências são cursos internos com `url` vazio; mantidas como estavam, sem verificação de existência.

```json
{
  "id": "0.1", "modulo": "m00", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Como computadores representam informação",
  "duracao_declarada": "55-80 min", "T_original_min": 127.7, "duracao_nova": "105-150 min", "T_nova_min": 124.5, "duracao_nova_estimated_max": 150,
  "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 20, "conteudo_util": "PARCIAL", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 3, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 6802, "palavras_visiveis_depois": 6455,
  "palavras_invisiveis_antes": 646, "palavras_invisiveis_depois": 40,
  "secoes": {
    "motivation": "ENXUGAR", "history": "FUNDIR:problem", "problem": "ENXUGAR", "evolution": "FUNDIR:architecture",
    "concept": "ENXUGAR", "internals": "ENXUGAR", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "ENXUGAR", "enterpriseExample": "ENXUGAR", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "deepDive": "MOVER:summary", "commonMistakes": "MOVER:concept", "networkContext": "MANTER",
    "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER", "mentorQuestions": "MANTER", "exercises": "MANTER",
    "challenge": "ENXUGAR", "commentedSolution": "MANTER", "glossary": "MANTER", "security": "ENXUGAR",
    "troubleshooting": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Confirmar que Set-Content no Windows PowerShell 5.1 grava em ANSI (afeta o desafio do lab com 'ação')",
    "Conferir visualmente o diagrama corrigido (fluxo Sinal -> Destino; observadores em svg-boundary)",
    "Duração subiu para 105-150 min pela fórmula; avaliar estimatedHours do módulo m00",
    "lab.labType 'security' mantido em lab conceitual/local",
    "Referências internas sem URL mantidas sem verificação"
  ]
}
```
