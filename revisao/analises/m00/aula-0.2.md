# Aula 0.2 — Bits, bytes, binário e hexadecimal
Tipo: fundamental · Duração declarada: 65-90 min · Palavras visíveis / invisíveis (antes): 5802 / 603

## 1. Duração
T pela fórmula = 124,8 min (teoria 26,2 [3406 palavras], diagramas 3, quiz 6, flashcards 3, mentor 6, exercícios 24, desafio 20, lab 36,6). O `lab.estimatedTimeMinutes` = 90 não é plausível para 6 passos curtos de conversão (faixa plausível 18–73 min), então vale a alternativa de 5 min/passo + leitura (36,6 min).
Veredito: **SUBESTIMADA** — M = 77,5 min < 0,8×T = 99,8 min. A faixa recomendada era 105-150 min. A divisão faz sentido para uma aula fundamental: 23% de leitura e o resto em prática (lab, exercícios e desafio), por isso não é DESEQUILIBRADA. O lab declarava sozinho 90 min, o tempo da aula inteira.

## 2. Encheção de linguiça
Nível: **MÉDIA (~15%)**. Os cortes brutos por campo somam 704 palavras (12%), mais cerca de 150 palavras de itens de prática duplicados que foram trocados (fc0.2.3, fc0.2.5, ex0.2.2, ex0.2.3, q0.2.1). Evidências:
- `evolution` inteira repete `history`, com uma segunda tabela das mesmas 3 bases: "O decimal é amigável, o binário mostra a estrutura real de bits, e o hexadecimal cria uma ponte compacta…". O mesmo resumo aparece também na analogia, no `summary` e no `deepDive.mentalModel`.
- Meta-texto: "Esta aula existe para construir a base matemática mínima… Aqui, cada conceito será conectado a redes" (motivation); "Como vimos na aula anterior" (history); "A maturidade técnica consiste em reconhecer…" (evolution).
- Os tamanhos de campo aparecem duas vezes: em `problem` ("Uma porta TCP ou UDP tem 16 bits. Um endereço MAC tem 48 bits…") e em `architecture`, que primeiro dá um parágrafo e depois uma lista com o mesmo conteúdo.
- Aviso de ética genérico em `securityExample`: "O limite ético é claro: nesta aula… Não há instrução para burlar controles".
- Exemplos por ambiente com listas genéricas: "tokens podem conter dados codificados; logs podem registrar payloads em bytes; ferramentas de SAST/DAST podem apontar…" (devsecops) e "Custos também entram na conversa…" (cloud).
- `security` se sobrepõe a si mesmo e ao `deepDive.securityImpact`: "Tratar hexadecimal como se fosse criptografia" (badPractices) repete "Concluir que payload ilegível está criptografado" (commonErrors); "Padronizar documentação…" (hardening) repete goodPractices[0].
- Ritual do lab: 3 safetyNotes ("não executa varredura, exploração…", "O objetivo é defensivo…") num lab de conversão local.
- Prática repetida: 10→00001010 aparece em q0.2.4, fc0.2.5, ex0.2.2 e mentor 2; FF=255 aparece em q0.2.3 e fc0.2.3. O `lab.challenge` (10.0.1.255) é idêntico às tarefas 1–2 do `challenge`.
- Campos invisíveis: `deepDive` (253 palavras), `commonMistakes` (176) e os 4 intros (127).
- As 2 frases repetidas entre aulas ("a solução comentada mostra o raciocínio passo a passo", referência "Redes e Network v2.0 — Aula 0.1") estavam em campo invisível ou numa referência interna.

## 3. Conteúdo útil
**FORTE**. O que tem valor real: a tabela de pesos 128…1 com 192 = 11000000; o método de agrupar nibbles; 192.168.10.50 = C0 A8 0A 32; a tabela unidade × valores × exemplo em redes; /24 = 255.255.255.0 em binário; EtherType 0x0800/0x86DD; a tabela de riscos com 4D 5A / FF D8; um lab executável com PowerShell e Python (PadLeft, 08b, 02X); o mentor sobre C0 A8 01 01.
Lacunas (para cumprir os `objectives`): "palavra numérica" (word) só era citada de passagem em `evolution`; não havia a regra geral 2^n; a conversão hex→decimal só aparecia na explicação do quiz; bit × byte (Mb/s × MB/s) só existia em campo invisível ou como item solto de segurança; o prefixo 0x não era explicado; não se mostrava que o MAC muda de separador conforme a ferramenta.
Erros técnicos: o desafio pedia para "documentar o host 10.0.1.255" com máscara 255.255.255.0, mas com /24 esse endereço é o broadcast de 10.0.1.0/24 e não pode ser um host. Corrigido. Na troubleshooting, a observação esperada do comando Cisco era vaga ("dependendo da plataforma e versão").

## 4. Aproveitamento
**BOM** (~93%). Contra o T original de 124,8 min, só uns 7 min de teoria e o ritual do lab não ensinam: o resto é mecanismo, exemplos e prática ligados aos objetivos. Contra a duração declarada (77,5 min), o problema é outro: a aula promete menos tempo do que a prática exige.

## 5. Pode ser mais curta?
**NÃO** — redução prevista: ~2% (124,8 → 122,2 min). A prática domina o T (≈ 96 min) e está alinhada aos objetivos. O corte de linguiça na teoria foi em parte compensado pelo conteúdo movido dos campos invisíveis e pelas lacunas preenchidas.

## 6. Explicação mais direta
**SIM**.
- `history` + `evolution`: dois parágrafos e uma tabela única (base, símbolos, vantagem, limitação, onde aparece) no lugar de duas tabelas e três parágrafos.
- `architecture`: uma tabela camada × campo × tamanho × exibição no lugar do parágrafo e da lista repetidos.
- `problem`: sai a lista de tamanhos (agora na arquitetura); fica a consequência de cada lacuna.
- `analogy`: um parágrafo, com o limite em uma frase.
- `concept`: a regra 2^n vem antes da tabela, para que os limites 0–255 e 0–65535 tenham uma explicação.

## 7. Estrutura: o que fica e o que sai
| Seção/bloco | Decisão | Justificativa |
|---|---|---|
| motivation | ENXUGAR | Mantidos os valores concretos e o callout do FF; cortado o parágrafo de meta-texto |
| history | ENXUGAR | Fica o porquê (2 estados → base 2; hex = 4 bits); recebe a tabela de vantagens e limitações de `evolution` |
| problem | ENXUGAR | Sai a lista de tamanhos de campo (vai para `architecture`); ficam a flow-list (4 itens) e o callout hex ≠ criptografia |
| evolution | FUNDIR:history | Repetia `history`, com tabela redundante |
| concept | MANTER (ampliado) | Acrescentados word, motivo do termo "octeto", prefixo 0x, regra 2^n e b × B (lacunas dos objetivos e conteúdo de `commonMistakes`) |
| internals | MANTER (ampliado) | Mecanismo preservado; acrescentados o método de subtração, hex→decimal e o callout "Erros comuns" (vindo de `commonMistakes`) |
| architecture | ENXUGAR | Prosa e lista viram uma tabela por camada, com MAC em 3 formatos e EtherType |
| analogy | ENXUGAR | Analogia boa, mas repetia o exemplo; limite reduzido a 1 frase |
| simpleExample | MANTER | Concreto, com valores |
| enterpriseExample | ENXUGAR | Fica /24, MAC e EtherType; sai a frase genérica do SOC; entra 1 frase sobre broadcast (necessária para o desafio) |
| cloudExample | ENXUGAR | Fica CIDR = contagem de bits e o caso das VNets sobrepostas; o parágrafo de custos vira uma oração |
| devsecopsExample | ENXUGAR | Ficam a validação de CIDR e o hash em hex; a lista genérica dá lugar a um exemplo concreto (sha256 = 64 dígitos hex = 32 bytes) |
| securityExample | ENXUGAR | A tabela de riscos fica, com a explicação de 4D 5A e FF D8; sai o aviso de ética genérico |
| diagram | MANTER | Correto e legível; ids e title/desc preservados |
| labIntro | REMOVER | Invisível |
| exercisesIntro | REMOVER | Invisível |
| challengeIntro | REMOVER | Invisível |
| solutionIntro | REMOVER | Invisível |
| summary | MANTER | 5 bullets; o `deepDive.mentalModel` vira a "Ideia central"; acrescentados 2^n e Mb/s × MB/s |
| nextTheme | ENXUGAR | 1 frase, coerente com a 0.3 |
| networkContext | MANTER | Metadado |
| deepDive | MOVER:summary/concept/architecture/security | mentalModel → summary; limitations → architecture (MAC em formatos diferentes) e security.goodPractices; financialImpact → cloudExample; securityImpact já coberto em security; removido |
| commonMistakes | MOVER:internals | Callout "Erros comuns" (bit×byte, zeros, hex×cripto, /24); "b minúsculo × B maiúsculo" → concept; removido |
| security | ENXUGAR | Sem duplicatas internas: 4 boas práticas, 3 más práticas, 4 erros comuns, 2 vulnerabilidades, 2 itens de monitoramento, 3 de hardening, 3 ideias de detecção |
| troubleshooting | MANTER | Comandos corretos; a observação e a interpretação do comando Cisco ficaram concretas (formato 0011.2233.4455, bia) |
| lab | ENXUGAR | Passos e validação intactos; safetyNotes 3→1; improvements 4→2; `lab.challenge` trocado (era idêntico ao desafio) pelo MAC da própria máquina; estimatedTimeMinutes 90→35 |
| quiz | MANTER (ajustado) | 7 questões; q0.2.1 (trivial) substituída por q0.2.7 (maior porta, 2^16−1); adicionada q0.2.8 (prefixo 0x) |
| flashcards | MANTER (ajustado) | 7 cards; removidos fc0.2.3 e fc0.2.5 (cópias do quiz); fc0.2.2 ajustado; novos fc0.2.7 (2^n), fc0.2.8 (b×B), fc0.2.9 (formatos de MAC) |
| mentorQuestions | MANTER | 3 perguntas de raciocínio, boas |
| exercises | MANTER (ajustado) | 4; ex0.2.2 (= q0.2.4/mentor 2) e ex0.2.3 (= mentor 1/q0.2.6) substituídos por ex0.2.5 (hex→decimal: AC 10 20 01) e ex0.2.6 (MB/s→Mb/s) |
| challenge | MANTER (corrigido) | "host 10.0.1.255" → "endereço"; nova tarefa sobre o último octeto com /24; rubrica com a mesma pontuação |
| commentedSolution | MANTER (corrigido) | Novo passo e finalAnswer sobre o broadcast de 10.0.1.0/24 |
| glossary | MANTER | 5 termos, todos usados |
| references | MANTER | Mantidas; ver Revisão humana |
| linksToOtherCourses | MANTER | — |

## 8. Inventário de conceitos
| # | Conceito/fato | Na nova versão | Onde / motivo |
|---|---|---|---|
| 1 | Bit = menor unidade, 2 estados | MANTIDO | concept, glossary, fc0.2.1 |
| 2 | Nibble = 4 bits | MANTIDO | concept (texto e tabela) |
| 3 | Byte = 8 bits | MANTIDO | concept, summary, fc0.2.2 |
| 4 | Octeto = exatamente 8 bits, termo de redes | MANTIDO | concept (com o motivo histórico), glossary |
| 5 | Word/palavra e registradores | MANTIDO | concept (word definida); "registradores" REMOVIDO: citação sem explicação, fora do escopo |
| 6 | Bases 2/10/16; A–F = 10–15 | MANTIDO | concept (definition-box), history (tabela) |
| 7 | Base 2 natural porque o circuito tem 2 estados; base 10 humana | MANTIDO | history |
| 8 | Binário longo demais (MAC de 48 bits) | MANTIDO | history |
| 9 | 1 hex = 4 bits; 2 hex = 1 byte | MANTIDO | history, concept, summary, q0.2.2 |
| 10 | Vantagem e limitação de cada base | MANTIDO | history (tabela fundida) |
| 11 | Faixas: 8 bits 0–255, 16 bits 0–65535 | MANTIDO | concept (tabela + regra 2^n), architecture, q0.2.7 |
| 12 | Tamanhos: porta 16, MAC 48, IPv4 32, IPv6 128, flags 1 bit | MANTIDO | architecture (tabela) |
| 13 | Camada física: bits como sinais elétricos/ópticos/rádio | MANTIDO | architecture |
| 14 | Payload = sequência de bytes (texto, JSON, Base64…) | MANTIDO | architecture |
| 15 | Posição e peso (potências de 10, 2, 16) | MANTIDO | internals |
| 16 | Pesos 128…1; 192 = 11000000 | MANTIDO | internals (tabela), lab passo 2 |
| 17 | 168 = 10101000; 10 = 00001010; 50 = 00110010 | MANTIDO | internals, simpleExample, lab |
| 18 | Zeros à esquerda em campo fixo | MANTIDO | internals (texto + callout), securityExample, q0.2.4, mentor 2 |
| 19 | Binário→hex por nibbles (4 passos) | MANTIDO | internals (ol) |
| 20 | 192.168.10.50 = C0 A8 0A 32 | MANTIDO | internals, simpleExample, diagram, lab |
| 21 | FF = 255 = 11111111 | MANTIDO | concept, internals, q0.2.3, ex0.2.1 |
| 22 | Hex não é criptografia; segurança depende de CIA/autenticação | MANTIDO | problem (callout), internals (callout), summary, q0.2.5, fc0.2.6 |
| 23 | Distinguir valor bruto, representação, codificação, compressão, serialização e criptografia | MANTIDO | architecture (callout de segurança) |
| 24 | /24 = 255.255.255.0 = 24 bits ligados; /25, /26, VLSM | MANTIDO | enterpriseExample, internals (callout), challenge |
| 25 | MAC 00:1A:2B:3C:4D:5E, cada par = 1 byte | MANTIDO | enterpriseExample, q0.2.6 |
| 26 | EtherType 0x0800 (IPv4), 0x86DD (IPv6) | MANTIDO | architecture, enterpriseExample, q0.2.8 |
| 27 | CIDR em VPC/VNet; o prefixo conta bits de rede; sobreposição quebra peering/VPN | MANTIDO | cloudExample |
| 28 | Impacto financeiro de blocos mal planejados | MANTIDO | cloudExample (1 oração) |
| 29 | Validação de CIDR em IaC/pipeline; política contra sub-redes grandes | MANTIDO | devsecopsExample, security.hardening |
| 30 | Hashes de imagem e fingerprints em hex | MANTIDO | devsecopsExample |
| 31 | Tokens codificados / SAST-DAST de encoding | REMOVIDO | genérico; o tema de tokens e encoding é da aula 0.3 |
| 32 | Riscos: 4D 5A / FF D8, zeros, payload sem contexto | MANTIDO | securityExample (tabela) |
| 33 | b minúsculo = bit, B = byte; Mb/s × MB/s | MANTIDO (movido de commonMistakes) | concept, summary, fc0.2.8, ex0.2.6, security.commonErrors |
| 34 | C0 A8 = 192.168 (privado), não é malicioso por si | MANTIDO | security.commonErrors, mentor 3 |
| 35 | Comandos PowerShell [Convert]::ToString/PadLeft; Python 08b/02X | MANTIDO | troubleshooting, lab passos 4–5 |
| 36 | Cisco `show interfaces` exibe MAC em hex | MANTIDO | troubleshooting (formato 0011.2233.4455, bia) |
| 37 | Todos os bits de host em 1 = broadcast (depende da máscara) | MANTIDO (movido de lab.solution) | enterpriseExample, challenge, commentedSolution |
| 38 | Ferramentas exibem o mesmo valor de formas diferentes | MANTIDO | architecture (MAC em 3 formatos), fc0.2.9 |
| 39 | Usar ferramentas para validar conversões em mudanças críticas | MANTIDO | security.goodPractices |
| 40 | Sistema contábil, "cor de imagem" na analogia | REMOVIDO | detalhes da analogia, sem conteúdo técnico |

## 9. Cobertura dos objetivos
| Objetivo | Onde é coberto na nova versão |
|---|---|
| Diferenciar bit, byte, nibble, octeto e palavra numérica | concept (parágrafo + tabela), glossary, fc0.2.1/fc0.2.2 |
| Converter entre decimal, binário e hexadecimal sem calculadora | internals (pesos, subtração, nibbles, hex→decimal), simpleExample, lab passos 1–3, ex0.2.1, ex0.2.5, q0.2.3, challenge |
| Explicar por que hex é comum em MAC, IPv6, EtherType, dumps, hashes, certificados, payloads | history, architecture, devsecopsExample, securityExample, mentor 1, q0.2.2, q0.2.8 |
| Ler um octeto IPv4 em binário e entender os zeros à esquerda | internals, callout "Erros comuns", q0.2.4, mentor 2, lab passo 3 e troubleshooting |
| Preparar para subnetting, máscaras, flags, análise de tráfego e troubleshooting | enterpriseExample (/24, broadcast), architecture (flags), cloudExample, troubleshooting, challenge |

## 10. O que mudou na nova versão
- `evolution` fundida em `history`, com uma tabela única das bases; os 4 intros invisíveis removidos.
- `architecture` reescrita como tabela por camada (MAC em formato Linux/Windows/Cisco, EtherType, flags).
- `concept`: word, motivo do termo "octeto", prefixo 0x, regra 2^n e bit × byte (Mb/s × MB/s).
- `internals`: método de subtração, conversão hex→decimal e callout "Erros comuns" (de `commonMistakes`).
- `deepDive` e `commonMistakes` movidos e removidos; mentalModel virou a primeira linha do `summary`.
- Correção técnica no desafio: 10.0.1.255/24 é broadcast, não host; tarefa e passo da solução acrescentados.
- Quiz: q0.2.1 trocada por q0.2.7; q0.2.8 adicionada (7 questões, gabarito 1,3,1,2,2,0,3).
- Flashcards sem cópias do quiz; exercícios sem duplicatas (novos ex0.2.5 e ex0.2.6).
- Lab: ritual reduzido, desafio próprio (MAC da máquina), `estimatedTimeMinutes` 90→35.
- `security` sem itens repetidos; comando Cisco com observação e interpretação concretas.
- `duration` 65-90 → 105-145 min; `estimatedStudyTimeMinutes` 90 → 145.

## 11. Depois
Palavras visíveis: 5802 → 5748 (−0,9%) · Invisíveis: 603 → 47 (só `networkContext`) · Duração: 65-90 min → 105-145 min (T 124,8 → 122,2) · Quiz corrigido: sim (7 questões, formato padrão com `answer` numérico).
Aviso do `validar`: "ids de quiz originais ausentes: q0.2.1". É intencional: a questão era trivial (decoreba de "quantos bits em 1 byte") e foi substituída por q0.2.7, com id inédito.
Pela 11.7: os cortes brutos (704, 12%) ficam abaixo da linguiça estimada (~15%). As palavras visíveis quase não caíram porque entrou conteúdo dos campos invisíveis (`commonMistakes`, `deepDive`) e das lacunas dos objetivos (word, 2^n, 0x, hex→decimal, Mb/s).

## 12. Revisão humana
- Referências: "Redes e Network v1.1 — Aula 0.2 (fonte pedagógica congelada)" e "Conceitos fundamentais de representação binária e hexadecimal / Base técnica consolidada (internal:foundations)" não são referências externas verificáveis, e a nota da v1.1 é meta de produção do curso. Foram mantidas (regra de preservar). Avaliar se devem sair.
- Desafio: o original pedia para "documentar o host 10.0.1.255" com máscara /24, mas esse é o endereço de broadcast. Corrigi para "endereço" e acrescentei a tarefa e o passo da solução sobre o broadcast. A pontuação da rubrica ficou igual; só a descrição do critério "/24" passou a incluir o broadcast. Confirmar se a mudança está de acordo com a intenção.
- q0.2.1 foi removida (trivial). Respostas salvas dos alunos para esse id deixam de contar.
- `lab.estimatedTimeMinutes` corrigido de 90 para 35 (6 passos curtos). A `duration` subiu de 65-90 para 105-145 min pela fórmula fixa (a original estava SUBESTIMADA).
- Fatos acrescentados para cobrir os objetivos, verificáveis mas que vale conferir: o byte nem sempre teve 8 bits em arquiteturas antigas; word de 16/32/64 bits; 4D 5A = "MZ" (executáveis Windows) e FF D8 = início de JPEG; digest sha256 = 64 dígitos hex = 32 bytes; formato Cisco `0011.2233.4455 (bia …)`; `ipconfig /all` mostra o MAC com hífens e `ip link` com dois-pontos.

```json
{
  "id": "0.2", "modulo": "m00", "tipo": "fundamental", "status": "CONCLUIDA",
  "titulo": "Bits, bytes, binário e hexadecimal",
  "duracao_declarada": "65-90 min", "T_original_min": 124.8, "duracao_nova": "105-145 min", "T_nova_min": 122.2, "duracao_nova_estimated_max": 145,
  "veredito_duracao": "SUBESTIMADA",
  "linguica_nivel": "MÉDIA", "linguica_pct": 15, "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "pode_ser_mais_curta": false, "reducao_tempo_pct": 2, "explicacao_mais_direta": true,
  "palavras_visiveis_antes": 5802, "palavras_visiveis_depois": 5748,
  "palavras_invisiveis_antes": 603, "palavras_invisiveis_depois": 47,
  "secoes": {
    "motivation": "ENXUGAR", "history": "ENXUGAR", "problem": "ENXUGAR", "evolution": "FUNDIR:history",
    "concept": "MANTER", "internals": "MANTER", "architecture": "ENXUGAR", "analogy": "ENXUGAR",
    "simpleExample": "MANTER", "enterpriseExample": "ENXUGAR", "cloudExample": "ENXUGAR", "devsecopsExample": "ENXUGAR",
    "securityExample": "ENXUGAR", "diagram": "MANTER", "labIntro": "REMOVER", "exercisesIntro": "REMOVER",
    "challengeIntro": "REMOVER", "solutionIntro": "REMOVER", "summary": "MANTER", "nextTheme": "ENXUGAR",
    "networkContext": "MANTER", "deepDive": "MOVER:summary/concept/architecture/security", "commonMistakes": "MOVER:internals",
    "security": "ENXUGAR", "troubleshooting": "MANTER", "lab": "ENXUGAR", "quiz": "MANTER", "flashcards": "MANTER",
    "mentorQuestions": "MANTER", "exercises": "MANTER", "challenge": "MANTER", "commentedSolution": "MANTER",
    "glossary": "MANTER", "references": "MANTER", "linksToOtherCourses": "MANTER"
  },
  "quiz_corrigido": true, "quiz_questoes": 7, "objetivos_cobertos": true,
  "revisao_humana": [
    "Referências v1.1 (fonte congelada) e 'Base técnica consolidada' não são verificáveis; mantidas, avaliar remoção",
    "Desafio: 10.0.1.255/24 é broadcast, não host; corrigido para 'endereço' e acrescentados tarefa e passo sobre broadcast (rubrica com mesma pontuação)",
    "q0.2.1 removida (trivial): respostas salvas para esse id deixam de contar",
    "lab.estimatedTimeMinutes 90→35; duration 65-90→105-145 pela fórmula",
    "Conferir fatos acrescentados: byte nem sempre 8 bits em arquiteturas antigas, word 16/32/64, 4D 5A=MZ e FF D8=JPEG, sha256=64 hex, formato Cisco com bia, separadores de MAC no ipconfig/ip link"
  ]
}
```

> **Controle de qualidade do m00 (revisor independente):** APROVADA. Quiz e cálculos novos conferidos. Perdas menores aceitas: no `problem`, "confundir hash com encoding" (a tabela de transformações da 0.1 cobre) e "binário não é necessariamente baixo nível ofensivo".
