# Aula 0.3 — ASCII, Unicode, UTF-8 e Base64 (v2)
Base: v1 · Tipo: fundamental · Módulo: m00 (Fundamentos da Computação)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: caractere/ponto de código/codificação + contar bytes (Olá = 4F 6C C3 A1); explicar á → Ã¡ byte a byte; Base64 3 → 4 caracteres, tamanho e por que não protege. Saíram o objetivo histórico do ASCII e a lista "HTTP, APIs, logs, tokens, certificados…" |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; history apagado (ASCII/tabelas regionais viraram 2 frases no Problema e a tabela de padrões no Conceito); evolution não existia na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 139 palavras; gancho novo: "JoÃ£o" no e-mail de confirmação e anexo de 20 MB recusado num limite de 25 MB; consequência (culpar a rede, tentar de novo, apagar acentos); segurança em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 4 itens + frase; 83 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 2: Content-Type (8.2), JSON (8.6). Os 6 da v1 (ASCII, Ponto de código, Unicode, UTF-8, Base64, Encoding) são ensinados pela aula |
| Problema 80–150, sem repetir o gancho | cumpre | 147 palavras; "é isso que acontece quando…"; história em 2 frases; diz que a aula mostra as duas regras por dentro |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | texto → bytes (Olá) só no Funcionamento interno + diagrama; content-card "Fluxo mental" removido (repetia a cadeia) |
| Arquitetura só se acrescenta | removida | lista de camadas (TCP/QUIC, TLS, observabilidade, IaC) era prévia do módulo 2; o `charset` em `Content-Type` foi para o Conceito |
| Diagrama mantido/corrigido | corrigido | cadeia Olá → U+… → 4F 6C C3 A1 → rede mantida; caixas "Logs/SIEM" e "Risco" trocadas por "Lido como UTF-8: Olá" e "Lido como Latin-1: OlÃ¡"; Base64 mostra o valor real T2zDoQ== |
| Erros comuns ≤3, sem repetição | cumpre | 2: 1 caractere = 1 byte; textos iguais na tela com bytes diferentes (U+00E1 × a + U+0301) |
| Termos avançados cortados ou no glossário | cumpre | saíram HMAC, hash, assinatura digital, PEM, JWT, NFC, mojibake, SIEM, WAF, QUIC, IaC, Kubernetes Secret, UTF-16/32 |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample novo: coluna de 10 bytes, Francisco (9 bytes) × Conceição (11 bytes), os 10 primeiros bytes viram "Conceiçã" (com limite de 9 bytes, "Conceiç�"); analogia (envelopes/caixa) em 2 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e devsecops removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 0) |
| Quiz 5–6, respondível pela aula | cumpre | 6; saiu q0.3.5 (Kubernetes Secret); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6; saiu fc0.3.6 (logs/SIEM); fc0.3.7 sem "JWT" |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos, 383 palavras, 20 min: bytes de Olá; caracteres × bytes (Ola, Olá, ação, €); reproduzir UsuÃ¡rio com iconv; Hel/Hello em Base64 |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (novos), exercícios 2 (ex0.3.6 + ex0.3.7 novo), desafio novo com solução |
| nextTheme 1–2 frases | cumpre | 1 frase (0.4) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` lab/exercício); unlocks/accessPolicy preservados; "15-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/challenge/solution |

Verificação do quiz contra a aula v2: q0.3.1 (papel do UTF-8) → tabela do Conceito; q0.3.2 (Base64 reversível sem chave) → Conceito, último parágrafo; q0.3.4 (Unicode × UTF-8) → Conceito (definições e tabela); q0.3.7 (JoÃ£o) → Funcionamento interno, "Por que á vira Ã¡" (ã = C3 A3 → Ã£, com o próprio João); q0.3.8 (Conceição em 10 bytes) → Exemplo simples + tabela de faixas; q0.3.9 (300 bytes → 400 caracteres) → Funcionamento interno, Base64 (3 → 4). Gabaritos em 0, 2, 3, 2, 1, 3.

## 2. O que saiu e por quê
- Motivação: cenário do SOC com alerta de API e callout "Problema real" (firewall, TLS, API em outra codificação): termos não explicados e repetição do Problema; substituídos por um gancho que o aluno já viveu (e-mail com "JoÃ£o" e anexo recusado).
- História inteira (seção do template): ASCII 7 bits e as tabelas regionais ficaram em 2 frases no Problema e na tabela de padrões do Conceito; UTF-16/UTF-32 e a linha Base64 da tabela saíram.
- Problema: lista de usos (HTTP, DNS, Basic, PEM, JWT), lista de 4 riscos (HMAC, assinatura, logs de auditoria) e callout de normalização com NFC (o caso U+00E1 × a + U+0301 foi para Erros comuns, sem "NFC").
- Conceito: parágrafo "para redes, o ponto central" (API JSON, PEM), tabela Termo/Pergunta/Exemplo (repetia as definições) e a tabela codificação × criptografia × hash × assinatura/HMAC (termos avançados; codificação × criptografia já está na 0.1 e fica em 1 frase).
- Funcionamento interno: "dentro de HTTP sobre TCP/IP" (prévia), exemplo admin:admin, content-card "Fluxo mental" (repetia a cadeia do diagrama), "Base64URL usada em JWT" (virou "endereços web e tokens").
- Arquitetura inteira (prévia do módulo 2 e de observabilidade/IaC).
- Analogia: "limite da analogia" (hash, assinatura).
- simpleExample da v1 (Ola/Olá/ação + Hello em Base64): repetia o Funcionamento interno e a 0.1; trocado pelo caso da coluna de 10 bytes.
- enterpriseExample (ERP em Windows-1252, WAF, SIEM), cloudExample (Base64 em JSON, custo 1,33×), devsecopsExample (Kubernetes Secret): seção do template.
- security e troubleshooting (módulo 0).
- learningOutcomes (seção do template).
- Lab: passos 1 e 2 fundidos (Windows/Linux do mesmo comando); passos 3–4 de admin:admin (codificar/decodificar já feito no lab da 0.1) trocados pelo iconv (reproduzir UsuÃ¡rio, vindo do troubleshooting da v1) e por Hel/Hello (preenchimento); scenario, topology, architecture, cost, safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions, challenge/solution do lab (ritual).
- Quiz q0.3.5 (Kubernetes Secret). Flashcard fc0.3.6 (logs/SIEM).
- Mentor: "rede entrega bytes e app exibe errado" (repete a ideia central e a q0.3.7), proxy + HMAC (termos avançados), Kubernetes Secret (exemplo por ambiente).
- Exercícios: ex0.3.1 (repete q0.3.4 e o Conceito), ex0.3.2 (decodificar SGVsbG8=, repete o lab e o exercício da 0.1), ex0.3.5 (SÃ£o Paulo, repete a q0.3.7; o diagnóstico nos dois sentidos foi para o desafio).
- Desafio da integração com rubrica de 100 pontos e "mitigação de DevSecOps" (relatório genérico, cheio de prévias) → trocado por um desafio de aplicação com os dois sentidos do erro.
- Glossário: os 6 termos da v1 (ensinados pela aula).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| UTF-16 e UTF-32 como outras codificações do Unicode | termo avançado, não necessário | — |
| Hash, assinatura digital e HMAC (tabela e mentor do proxy) | termo avançado / prévia | 8.3, 8.4 |
| Certificados PEM em Base64 | prévia | 8.3 |
| JWT com partes em Base64URL | prévia (Base64URL ficou em 1 frase) | 8.4 |
| HTTP Basic com admin:admin | repetição (exemplo central da 0.1) | 0.1, 8.6 |
| Normalização NFC e "bypass por normalização" em WAF | termo avançado / prévia (o caso U+00E1 × a + U+0301 ficou) | 8.5 |
| Homógrafos (а cirílico × a latino) | seção removida (security, módulo 0) | — |
| Base64 em JSON de cloud e custo 1 GB → 1,33 GB | exemplo por ambiente (o +33% ficou, aplicado ao anexo de e-mail) | — |
| Kubernetes Secret em Base64, RBAC, etcd, cofres, OIDC | exemplo por ambiente | — (curso DevSecOps em linksToOtherCourses) |
| Camadas: TCP/QUIC, TLS, observabilidade, IaC (Arquitetura) | prévia | 2.6, 2.7, 8.3 |
| Logs/SIEM corrompidos, perda de evidência, detecção de Base64 em logs | seção removida (módulo 0) | 7.9, 16.11 |
| Comandos `file -i` e `curl -sI … content-type` | seção removida (troubleshooting, módulo 0) | 8.2, 8.8 |
| Cenário do SOC com alerta de API | substituído por gancho do dia a dia | — |
| ERP exportando CSV em Windows-1252 para SIEM | exemplo por ambiente (o mecanismo está no Funcionamento interno e no desafio) | — |

## 4. Acréscimos
- Motivação nova (João → "JoÃ£o" e anexo de 20 MB recusado num limite de 25 MB) e o fechamento do segundo caso no Funcionamento interno ("anexos de e-mail viajam em Base64… cerca de 27 MB").
- Funcionamento interno: valores numéricos dos 64 caracteres (A–Z 0–25, a–z 26–51, 0–9 52–61, + 62, / 63), necessários para o aluno refazer o exemplo do Hel e o ex0.3.7; "ç (C3 A7) vira Ã§".
- simpleExample novo: Francisco × Conceição numa coluna de 10 bytes, com os 10 primeiros bytes mostrando "Conceiçã" e, num limite de 9 bytes, "Conceiç�" (corrigido após o revisor independente do m00: a versão anterior dizia que o corte no 10º byte deixava "Conceiç�", o que estava errado; conferido com `printf 'Conceição' | head -c 10 | od -An -tx1`).
- Diagrama: receptores UTF-8 × Latin-1 e o Base64 real de Olá (T2zDoQ==, conferido).
- Lab: passo do iconv (vinha do troubleshooting da v1), € na contagem de bytes, passo Hel/Hello (saídas conferidas no terminal Linux).
- Mentor novo: compatibilidade ASCII/UTF-8 e o byte Latin-1 E1; valor dGVzdGU6MTIz sem = (conferido: teste:123).
- Exercício novo ex0.3.7: codificar "Oi!" à mão (T2kh, conferido).
- Desafio novo com solução comentada: A em Latin-1 e B em UTF-8 (Usu�rio num sentido, UsuÃ¡rio no outro).
- Glossário: Content-Type (8.2) e JSON (8.6).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 5.881 | 6.034 | 3.264 |
| Teoria (palavras) | 3.666 | 3.504 | 1.439 |
| Núcleo (min, fórmula v2) | 37,2 | 37,0 | 20,1 |
| Prática extra (min) | 90 | 75 | 51 (→ 50) |
| duration declarada | 70-95 min | 100-145 min | 15-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- "análise ainda não escrita": resolvido por este arquivo. Nenhum outro aviso.

## 7. Revisão humana
- Gancho do anexo: a Motivação e o Funcionamento interno afirmam que anexos de e-mail viajam em Base64 e que um arquivo de 20 MB vira uma mensagem de ~27 MB, recusada num limite de 25 MB. O mecanismo é o do MIME (4/3 mais quebras de linha); confirme se aceita o exemplo genérico de "serviço com limite de 25 MB".
- Comandos do lab no Windows não testados (só o Linux foi executado): `GetEncoding('ISO-8859-1').GetString(...)` no passo 3 e o `€` no script Python salvo em .py no passo 2.
- Diagrama: caixas "Logs/SIEM" e "Risco" trocadas pelos dois receptores (UTF-8 e Latin-1); confirme se os rótulos cabem nas caixas no app.
- Funcionamento interno ficou com 529 palavras: é o mecanismo do tema (tabela de faixas UTF-8, texto quebrado nos dois sentidos, algoritmo do Base64 com exemplo calculado).
- q0.3.2 é quase igual à q0.1.3 da aula 0.1 (Base64 não protege segredo). Mantida porque é objetivo desta aula; avalie trocar por uma questão de cálculo do preenchimento.
- references (Unicode, RFC 3629, RFC 4648, aula 0.2) e linksToOtherCourses (Kubernetes Secrets e JWT) mantidos como na v1; os links citam temas que saíram da aula.

```json
{
  "id": "0.3", "modulo": "m00", "titulo": "ASCII, Unicode, UTF-8 e Base64", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "history", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "security", "troubleshooting"],
  "conceitos_removidos": 14,
  "acrescimos": ["Motivação nova (JoÃ£o e anexo de 20 MB) com fechamento no Funcionamento interno", "Funcionamento interno: valores dos 64 caracteres do Base64 e ç → Ã§", "simpleExample: Francisco × Conceição numa coluna de 10 bytes", "Diagrama: receptores UTF-8 × Latin-1 e T2zDoQ==", "Lab: iconv, € e Hel/Hello", "Mentor: compatibilidade ASCII/UTF-8; Base64 sem =", "Exercício ex0.3.7: Oi! → T2kh à mão", "Desafio novo: Latin-1 × UTF-8 nos dois sentidos", "Glossário: Content-Type (8.2) e JSON (8.6)"],
  "palavras_visiveis": { "original": 5881, "v1": 6034, "v2": 3264 },
  "nucleo_min": { "original": 37.2, "v1": 37.0, "v2": 20.1 }, "pratica_extra_min": { "original": 90, "v1": 75, "v2": 50 },
  "duration_v2": "15-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Conceito junta ASCII, tabelas regionais, Unicode e UTF-8 numa tabela de 4 linhas, e o Funcionamento interno explica o texto quebrado nos dois sentidos pelos próprios bytes, sem tabelas de hash/assinatura nem prévias de HTTP, JWT e PEM.",
  "revisao_humana": ["Gancho do anexo de 20 MB × limite de 25 MB (Base64 no e-mail)", "Comandos do lab no Windows não testados", "Rótulos novos do diagrama", "Funcionamento interno com 529 palavras (mecanismo do tema)", "q0.3.2 quase igual à q0.1.3", "references/linksToOtherCourses mantidos da v1"]
}
```
