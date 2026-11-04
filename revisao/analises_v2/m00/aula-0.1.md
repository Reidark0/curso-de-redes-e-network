# Aula 0.1 — Como computadores representam informação (v2)
Base: v1 · Tipo: fundamental · Módulo: m00 (Fundamentos da Computação) · Aula de referência (Apêndice A)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | os 3 do Apêndice A, literalmente (sem crases: campo de texto puro) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 143 palavras; gancho "aÃ§Ã£o"; consequência (culpar rede/servidor/ataque); carreira = 1 frase (analista olhando bytes de um alerta) |
| Resumo 4–5 itens + frase final | cumpre (aviso) | texto exato do Apêndice A; 92 palavras contando a frase final |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 4: UTF-8 (0.3), Hexadecimal (0.2), Base64 (0.3), TLS (8.3) |
| Problema 80–150, sem repetir o gancho | cumpre | 144 palavras; retoma com "é isso que acontece quando os dois lados não usam a mesma regra"; dois estados/ruído; regra combinada; telégrafo e cartões em 1 frase |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | cadeia só no Funcionamento interno + diagrama |
| Arquitetura só se acrescenta | removida | a tabela de níveis repetia a cadeia e trazia quadro/pacote/segmento/MTU (módulo 2) |
| Diagrama mantido/corrigido | mantido (rótulos ajustados) | caixas de observadores: "Wireshark, logs, SIEM" → "Captura / cópia dos bytes"; "Cloud / flow logs" → "Logs / resumos, métricas" (termos não explicados) |
| Erros comuns ≤3, sem repetição | não se aplica | callout da v1 removido: os 4 itens repetiam Conceito/Resumo/quiz ou não eram deste tema |
| Termos avançados cortados ou no glossário | cumpre | saíram payload, SIEM, flow log, CRC, MAC criptográfico, MTU, serialização, hash |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample = HTTP Basic para iniciante; analogia das lâmpadas em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud, devsecops e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 0) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saiu q0.1.6 (flow log); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 5; saíram fc0.1.6 (Wireshark) e fc0.1.9 (Checksum/CRC × MAC) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos (bytes de "rede", bytes de "ação", Base64, decodificar); 400 palavras; 20 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre (aviso) | mentor 2, exercícios 2, desafio novo do CSV com solução comentada |
| nextTheme 1–2 frases | cumpre | 2 frases (0.2 e 0.3) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}`, unlocks/accessPolicy preservados; "15-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/challenge/solution |

Verificação do quiz contra a aula v2: q0.1.2 (dado × sinal) → lista do Conceito; q0.1.3 (Base64 reversível) → Conceito + Exemplo; q0.1.4 (bytes ilegíveis) → "Mudar a forma não é proteger"; q0.1.5 (onde o significado é reconstruído) → Funcionamento interno, passo "Volta"; q0.1.7 (`01000001`) → Conceito; q0.1.8 ("ação" = 6 bytes) → Conceito. Gabaritos em 0,1,2,2,3,0.

## 2. O que saiu e por quê
- Motivação: cenário do alerta do SOC (virou 1 frase de carreira) e frase "computadores não entendem significado humano…" (repetia o Problema); lista MAC/IPv4/subnetting/flags TCP/TLS (prévias).
- Problema: "camadas de interpretação: padrões elétricos, quadros, pacotes…" (prévia 0.8 / 2.2); 2 parágrafos encolhidos.
- Conceito: o que Ethernet, IPv4, TCP, HTTP e TLS definem (prévias); tabela das 5 transformações (serialização, compressão, hash: prévias 2.7 / 0.3); callout de erros comuns (repetição).
- Funcionamento interno: passo de encapsulamento com portas, IPs, MAC, checksums e flags (prévia 2.2, ficou meia frase); lista de imperfeições por meio e "codificação de linha, sincronização, CRC" (prévia 0.5); callout "Ligação com segurança" (parser, certificado, checksum/CRC × MAC criptográfico, SIEM).
- Arquitetura inteira (repetia a cadeia; quadro/pacote/segmento/MTU/fragmentação = módulo 2).
- Analogia: "limite da analogia" (temporização, modulação: termos avançados).
- simpleExample da v1 (letra A, tabela de "rede", IPv4/MAC em bytes): a letra A foi para o Conceito, a tabela para o Funcionamento interno, IPv4/MAC saiu (prévia 0.2/3.2). O HTTP Basic do securityExample virou o simpleExample.
- enterpriseExample (repetia o gancho), cloudExample, devsecopsExample, securityExample (seção do template).
- security e troubleshooting (módulo 0).
- learningOutcomes (seção do template).
- Lab: passos 2 ("visualizar como texto"), 6 ("relacionar com análise de tráfego") e 7 ("registrar evidências"), safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions, challenge/solution do lab (ritual ou repetição; o "ação" virou o passo 2).
- Quiz q0.1.6 (flow log de cloud). Flashcards fc0.1.6 e fc0.1.9.
- Mentor: "log com caracteres quebrados" (sobreposição com o desafio novo) e "payload ilegível" (repete q0.1.4).
- Exercícios: ex0.1.1 (é a questão 1 do quiz) e ex0.1.2 (repete q0.1.7).
- Desafio "cadeia invisível de uma mensagem" (reexplicava a ideia central) → trocado pelo desafio do CSV.
- Glossário: Informação, Dado digital, Bit, Byte, Sinal físico e Codificação (a aula ensina); Payload (não é mais citado).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Campos que Ethernet, IPv4, TCP, HTTP e TLS definem | prévia | 2.2–2.7, 3.2, 8.1, 8.3 |
| Encapsulamento com cabeçalhos (portas, IPs, MAC, flags) | prévia | 2.2 |
| Quadro, pacote, segmento, MTU, fragmentação | prévia | 2.2 (MTU também 6.4) |
| Serialização (JSON, ASN.1) | prévia / termo avançado | 2.7 |
| Hash (SHA-256) e compressão como linha de tabela | prévia (compressão segue citada como "arquivo compactado") | 0.3 |
| Checksum/CRC × MAC criptográfico | termo avançado / prévia | 2.3, 8.3 |
| Imperfeições por meio (reflexão, atenuação, conectorização), codificação de linha, sincronização | prévia | 0.5, 1.5, 2.3 |
| Ferramentas mostram interpretações (Wireshark, SIEM) como texto | prévia | 2.2, 15.11 |
| Flow log ≠ captura; custo de logs em cloud | prévia | 14.12 |
| Imagens de container, token OIDC, Secret do Kubernetes em Base64 | exemplo por ambiente | 14.11 |
| WAF, antivírus, IDS e parser como interpretadores | exemplo por ambiente / prévia | 8.5, 9.6 |
| Tráfego criptografado: analista vê só metadados | prévia | 8.3 |
| IPv4 = 4 bytes, MAC = 6 bytes em hexadecimal | prévia | 0.2, 3.2 |
| Logs legados com encoding quebrado (exemplo empresarial) | repetição do gancho | — |
| Vulnerabilidades (segredo codificado, canonicalização, logging fraco), boas/más práticas, monitoramento, hardening, detecção | seção removida (módulo 0) | 0.3 (Base64), 8.9, 16.x |
| Comandos de troubleshooting (certutil, show interfaces em Cisco IOS) e árvore de decisão | seção removida (módulo 0) | 0.5, 2.8 |
| Cenário do alerta do SOC | reduzido a 1 frase | — |

## 4. Acréscimos
- Conceito: por que "ação" vira "aÃ§Ã£o" (6 bytes lidos com uma regra de 1 byte por letra). Fecha a lacuna entre o gancho e o quiz q0.1.8, como pede o Apêndice A.
- Conceito: lista curta separando informação, dado, byte, bit e sinal (o objetivo 2 e a q0.1.2 dependem dela; na v1 o "sinal" só aparecia no callout e na Arquitetura).
- Conceito: "bytes ilegíveis podem ser texto com regra errada, imagem, arquivo compactado, codificação ou criptografia" (substitui a tabela de transformações e sustenta a q0.1.4).
- Mentor novo: um bit trocado (`01000001` → `01000011`, A → C) e a necessidade de detectar erros.
- Desafio novo do CSV "aÃ§Ã£o" com solução comentada (Apêndice A).
- Glossário: TLS → 8.3 (citado no exemplo, não explicado).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 6.801 | 6.461 | 3.075 |
| Teoria (palavras) | 4.116 | 3.523 | 1.282 |
| Núcleo (min, fórmula v2) | 40,7 | 37,1 | 18,9 |
| Prática extra (min) | 80 | 80 | 51 (→ 50) |
| duration declarada | 55-80 min | 105-150 min | 15-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- "Resumo com 92 palavras (máx. 90)": o texto é o exigido literalmente pelo Apêndice A, mais a frase final padrão (13 palavras). Não dá para encurtar sem descumprir o apêndice.
- "prática extra com 610 palavras (padrão ~150–250 por bloco)": por bloco ficou mentor 167, exercícios 181, desafio + solução 262. Cada item aplica algo novo (bit trocado, decodificar outro cabeçalho, classificar casos concretos, diagnosticar o CSV).
- "análise ainda não escrita": resolvido por este arquivo.

## 7. Revisão humana
- Diagrama: os rótulos das caixas de observadores mudaram (SIEM e flow logs saíram porque a aula não os explica). O Apêndice A diz "Mantido"; confirme se aceita o ajuste.
- O Resumo exigido pelo Apêndice A tem 92 palavras e sempre gera aviso no `validar`. Vale ajustar o limite ou aceitar a exceção.
- O Conceito ficou com 290 palavras (alvo ~200) por causa da lista dos 5 níveis e da explicação do "aÃ§Ã£o"; o Funcionamento interno com 216 (alvo ~170) porque recebeu a tabela de "rede".
- Lab, Windows: comandos não testados em Windows. O Base64 agora usa `[System.Text.Encoding]::UTF8.GetBytes('rede')` em vez de `ReadAllBytes('.\arquivo')`, porque o .NET resolve caminho relativo pelo diretório do processo, não pelo do PowerShell. No passo 2, o PowerShell 5.1 grava `ação` em ANSI (aviso mantido da v1).
- Quiz: q0.1.4 trocou "captura mostra payload ilegível" por "ferramenta que copia o tráfego mostra bytes ilegíveis" (payload saiu do texto); na q0.1.5, a opção correta trocou "camadas de interpretação" por "no destino, quando protocolos, sistema operacional e aplicação interpretam…". Os ids foram mantidos.
- "Protocolo" não entrou no glossário: a aula o define em 1 frase e aponta a 0.7.
- references (3 itens internos com url vazia) e linksToOtherCourses (DevSecOps e IAM) mantidos como na v1; confirme se ainda fazem sentido sem os exemplos de DevSecOps.

```json
{
  "id": "0.1", "modulo": "m00", "titulo": "Como computadores representam informação", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 17,
  "acrescimos": ["Conceito: explicação de por que 'ação' vira 'aÃ§Ã£o'", "Conceito: lista informação/dado/byte/bit/sinal", "Conceito: hipóteses para bytes ilegíveis", "Mentor: bit trocado (A → C)", "Desafio do CSV 'aÃ§Ã£o' com solução", "Glossário: TLS → 8.3"],
  "palavras_visiveis": { "original": 6801, "v1": 6461, "v2": 3075 },
  "nucleo_min": { "original": 40.7, "v1": 37.1, "v2": 18.9 }, "pratica_extra_min": { "original": 80, "v1": 80, "v2": 50 },
  "duration_v2": "15-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Conceito agora separa os 5 níveis numa lista curta e explica o gancho 'aÃ§Ã£o' pelos próprios bytes, sem tabelas de transformações nem prévias de protocolos.",
  "revisao_humana": ["Rótulos do diagrama ajustados (SIEM/flow logs saíram)", "Resumo do Apêndice A tem 92 palavras (aviso permanente)", "Conceito 290 e Funcionamento 216 palavras, acima do alvo", "Comandos do lab no Windows não testados; troca de ReadAllBytes por UTF8.GetBytes", "Redação das questões q0.1.4 e q0.1.5 ajustada", "Protocolo fora do glossário (definido em 1 frase, aponta 0.7)", "references/linksToOtherCourses mantidos da v1"]
}
```
