# Aula 0.2 — Bits, bytes, binário e hexadecimal (v2)
Base: v1 · Tipo: fundamental · Módulo: m00 (Fundamentos da Computação)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: unidades e 2^n; conversão à mão pelos pesos com zeros à esquerda; ler bytes em hexadecimal (IPv4, MAC) e saber que não é criptografia. Saíram "palavra numérica", a lista de áreas (EtherType, hashes, certificados, payloads) e "preparar a base para subnetting…" (prévia) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history removido (a ideia "binário é longo, hex = 4 bits por dígito" virou 2 frases do Problema); evolution não existia |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 124 palavras; gancho: o `ipconfig /all` mostra 192.168.10.50 e 3C-52-82-1A-2B-3C, e o lab da 0.1 mostrou "rede" = 72 65 64 65; consequência: decorar em vez de entender, achar que hexadecimal é código secreto; carreira em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase; 90 palavras com a frase |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 3: Endereço IPv4 (4.2), Endereço MAC (3.2), Porta (6.2). Saíram Bit, Byte, Octeto, Hexadecimal e Zeros à esquerda (a aula ensina) |
| Problema 80–150, sem repetir o gancho | cumpre | 127 palavras; "parecem de mundos diferentes porque máquina e pessoa precisam de escritas diferentes"; binário longo (48 bits), decimal esconde os bits, hex = 4 bits por dígito |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | "mesmo valor em três escritas" no Conceito/Funcionamento + diagrama; sem Mb/s × MB/s, /24, VLSM, EtherType, IPv6, flags TCP |
| Arquitetura só se acrescenta | removida | tabela de campos por camada (MAC, EtherType, IPv4, IPv6, portas, flags, payload) era prévia de 3.2, 4.2, 6.2, 6.3; o MAC (6 bytes, separadores) foi para o Exemplo |
| Diagrama mantido/corrigido | mantido | 192 = 11000000 = C0 e os 4 octetos de 192.168.10.50; valores conferidos |
| Erros comuns ≤3, sem repetição | cumpre | 3: remover zeros à esquerda (agora também 0A × A), ler FF como 15 (veio de `security.commonErrors`), achar que hex é criptografia. Saíram "bit × byte" (0.4) e "decorar /24" (4.3/5.x) |
| Termos avançados cortados ou no glossário | cumpre | saíram EtherType, IPv6, flags TCP, payload, MTU, throughput, VLSM, CIDR, Wireshark, dump (virou "listagem de bytes"), Cisco; IPv4, MAC e porta foram para o glossário |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample = 192.168.10.50 nas três bases + como aparece no Format-Hex/xxd da 0.1 + o MAC no Windows e no Linux; analogia do dinheiro em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud, devsecops e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 0) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saiu q0.2.5; q0.2.8 sem EtherType; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6; saíram fc0.2.1 (duplicava fc0.1.1 na página do módulo) e fc0.2.8 (Mb/s, aula 0.4); novo fc0.2.10 (pesos do octeto); fc0.2.2 e fc0.2.9 reescritos |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos, 362 palavras, 20 min: converter à mão, conferir no terminal, ver a ferramenta cortar os zeros, ler o MAC da própria placa |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2, exercícios 2, desafio reescrito sem /24 e broadcast |
| nextTheme 1–2 frases | cumpre | 2 frases: 0.3 e a prévia Mb/s × MB/s da 0.4 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` lab/exercício), unlocks/accessPolicy preservados; "15-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/challenge/solution; challenge sem gradingRubric |

Verificação do quiz contra a aula v2: q0.2.2 (2 dígitos hex = 1 byte) → regra em negrito do Conceito e linha "Nibble" da tabela; q0.2.3 (FF = 255) → Conceito e Funcionamento ("FF = 15 × 16 + 15"); q0.2.4 (10 = 00001010) → Funcionamento + callout de erros comuns; q0.2.6 (MAC = 6 bytes) → Exemplo simples; q0.2.7 (porta de 16 bits → 65535) → tabela 2^n do Conceito; q0.2.8 (prefixo 0x) → definição do Conceito. Gabaritos em 1, 3, 1, 2, 0, 3.

## 2. O que saiu e por quê
- Motivação: a lista de valores (255.255.255.0, 0x0800, fe80::1) e de lugares (Wireshark, firewall, certificados, hashes) e o callout "analista vê FF": prévias/termos avançados; o "FF = 15?" virou erro comum.
- history: seção do template; a tabela de bases (onde cada uma aparece: TTL, EtherType, flags…) era prévia. Ficou 1–2 frases no Problema.
- Problema: lista "sem binário/sem byte/sem hex/sem zeros" (subnetting, payload, MTU, throughput, EtherType: prévias) e callout "hex não é criptografia" (repetido; ficou só no callout de erros comuns).
- Conceito: "palavra (word)" (termo fora do tema, não usado depois); parágrafo Mb/s × MB/s (prévia da 0.4); "flag TCP" na tabela (termo avançado → "uma opção ligada ou desligada").
- Funcionamento interno: frase "IPv4 aparece como C0 A8 0A 32" (passou para o Exemplo); erros "bit × byte" (0.4) e "decorar /24" (4.3, 5.2, 5.6).
- architecture inteira (prévia de 3.2, 4.2, 6.2, 6.3; MAC aproveitado no Exemplo).
- Analogia: "limite da analogia" (o significado do byte depende do contexto já é a 0.1).
- simpleExample: "quando o Wireshark mostra…" (troca por Format-Hex/xxd, que o aluno já usou na 0.1).
- enterpriseExample (VLAN, /24, broadcast, EtherType), cloudExample (VPC, CIDR, peering), devsecopsExample (Terraform, digest sha256), securityExample (assinaturas MZ/JPEG, tabela de riscos): seção do template e prévias.
- security e troubleshooting: módulo 0.
- Resumo: itens "uso real" (lista de siglas) e o erro Mb/s × MB/s.
- Lab: passos 1 (separar octetos, trivial), 4 e 5 (fundidos num só "conferir no terminal") e 6 ("criar evidência"); scenario, topology, architecture, cost, safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions; o challenge/solution do lab (MAC da placa) virou o passo 4.
- Quiz q0.2.5 ("hex em análise de segurança"): repete o tema das q0.1.3/q0.1.4 da aula 0.1; o "não é criptografia" continua testado como distrator da q0.2.8.
- Flashcards fc0.2.1 (repetia fc0.1.1) e fc0.2.8 (Mb/s, aula 0.4).
- Mentor: "por que hex é mais usado que binário" (reexplica a ideia central) e "10 → 1010" (repete q0.2.4).
- Exercícios: ex0.2.1 (255 → FF repete q0.2.3), ex0.2.6 (MB/s, aula 0.4), ex0.2.4 (alerta em hex: genérico, repete o erro comum e o mentor).
- Desafio: tarefas de /24 e broadcast (4.3/4.4), "observação de segurança" e gradingRubric.
- Glossário: Bit, Byte, Octeto, Hexadecimal, Zeros à esquerda (a aula ensina).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Palavra (word) do processador, 16/32/64 bits | termo fora do tema | — |
| Mb/s × MB/s, 100 Mb/s ≈ 12,5 MB/s, overhead | prévia | 0.4 |
| Máscara /24 = 255.255.255.0 em binário, bits de rede e host, VLSM | prévia | 4.3, 5.2, 5.6 |
| Broadcast (todos os bits de host em 1) | prévia | 4.4 |
| EtherType (0x0800 IPv4, 0x86DD IPv6) | termo avançado / prévia | 3.2 |
| IPv6 em grupos hexadecimais (fe80::1), 128 bits | prévia | (sem aula específica no índice; 2.5/4.x) |
| Tamanho dos campos por camada (porta 16 bits, flags TCP 1 bit, payload) | prévia | 6.2, 6.3, 2.2 |
| Formato Cisco do MAC (3c52.821a.2b3c) e `show interfaces` | equipamento não ensinado | 3.2 |
| Blocos CIDR em VPC/VNet, sobreposição, peering | exemplo por ambiente | 5.9, 14.x |
| Validação de CIDR em Terraform/pipeline; digest sha256 de imagem (64 hex = 32 bytes) | exemplo por ambiente | 5.9 |
| Assinaturas de arquivo 4D 5A (MZ) e FF D8 (JPEG) | exemplo por ambiente / termo avançado | 15.11 |
| Ferramentas mostram interpretação; distinguir codificação, compressão, serialização, criptografia | repetição da 0.1 | 0.1, 0.3 |
| O significado do byte depende do contexto ("limite da analogia") | repetição da 0.1 | 0.1 |
| Boas/más práticas, vulnerabilidades, monitoramento, hardening, detecção | seção removida (módulo 0) | 5.9, 15.11 |
| Comandos de troubleshooting e árvore de decisão | seção removida (módulo 0) | — (os comandos de conversão estão no lab) |

## 4. Acréscimos
- Exemplo simples: o MAC no Windows e no Linux como 6 pares = 6 bytes (vinha da Arquitetura); a ligação com o Format-Hex/xxd da aula 0.1. Necessário para a q0.2.6 e o objetivo 3.
- Erro comum "ler FF como 15" (vinha de `security.commonErrors`) e o caso `0A` × `A` no erro dos zeros à esquerda.
- Lab: passo 3 novo (a ferramenta mostra `1010` e `a` sem tamanho fixo) e passo 4 (MAC da própria placa, vinha do challenge do lab).
- Mentor novo: campo de 12 bits (4096 valores, 0 a 4095, 3 dígitos hex).
- Exercício novo ex0.2.7: 200 = 11001000 = C8.
- Flashcard novo fc0.2.10: pesos do octeto.
- Glossário: Endereço IPv4 (4.2), Endereço MAC (3.2), Porta (6.2).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 5.801 | 5.747 | 2.925 |
| Teoria (palavras) | 3.503 | 3.201 | 1.270 |
| Núcleo (min, fórmula v2) | 35,9 | 34,6 | 18,8 |
| Prática extra (min) | 75 | 80 | 51 (→ 50) |
| duration declarada | 65-90 min | 105-145 min | 15-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- "análise ainda não escrita": resolvido por este arquivo. Nenhum outro aviso.

## 7. Revisão humana
- Lab: comandos do Windows PowerShell não testados (o do passo 2 é o mesmo da v1; o do passo 3 é `[Convert]::ToString(10,2)` / `[Convert]::ToString(10,16)`, que deve mostrar `1010` e `a`). Os comandos Python foram testados. O de Linux virou one-liner (`python3 -c`) no lugar do heredoc da v1.
- Lab passo 4, macOS: `ifconfig en0 | grep ether` supõe que a interface principal é `en0`.
- Quiz: q0.2.5 removida; q0.2.8 trocou "o EtherType aparece como 0x0800" por "aparece o valor 0x0800" e a explicação não cita mais IPv4. Ids mantidos.
- Flashcards fc0.2.2 e fc0.2.9 reescritos com os mesmos ids (byte × octeto; MAC sem o formato Cisco).
- IPv6 não tem aula específica no índice; a prévia cortada ficou sem aula de destino.
- references (inclui "Redes e Network v1.1 — fonte pedagógica congelada", com url `internal:`) e linksToOtherCourses mantidos como na v1; subtitle e tags (ipv6, subnetting, wireshark) também.

```json
{
  "id": "0.2", "modulo": "m00", "titulo": "Bits, bytes, binário e hexadecimal", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "history", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 15,
  "acrescimos": ["Exemplo: MAC no Windows/Linux = 6 bytes e ligação com Format-Hex/xxd da 0.1", "Erro comum: ler FF como 15; 0A x A", "Lab: passo de zeros cortados pela ferramenta e passo do MAC da própria placa", "Mentor: campo de 12 bits", "Exercício ex0.2.7: 200 = 11001000 = C8", "Flashcard fc0.2.10: pesos do octeto", "Glossário: Endereço IPv4 (4.2), Endereço MAC (3.2), Porta (6.2)"],
  "palavras_visiveis": { "original": 5801, "v1": 5747, "v2": 2925 },
  "nucleo_min": { "original": 35.9, "v1": 34.6, "v2": 18.8 }, "pratica_extra_min": { "original": 75, "v1": 80, "v2": 50 },
  "duration_v2": "15-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "A aula agora vai direto ao mecanismo (pesos do octeto, grupos de 4 bits, ×16) e usa um único exemplo concreto, 192.168.10.50 e o MAC da placa, sem tabelas de campos por camada nem exemplos de cloud/DevSecOps.",
  "revisao_humana": ["Comandos PowerShell do lab não testados; Linux virou one-liner python3 -c", "macOS supõe interface en0", "q0.2.5 removida; q0.2.8 sem EtherType", "fc0.2.2 e fc0.2.9 reescritos com os mesmos ids", "Prévia de IPv6 sem aula de destino no índice", "references/linksToOtherCourses/subtitle/tags mantidos da v1"]
}
```
