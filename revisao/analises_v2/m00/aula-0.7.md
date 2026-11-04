# Aula 0.7 — O que é um protocolo (v2)
Base: v1 · Tipo: fundamental · Módulo: m00 (Fundamentos da Computação)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: elementos do contrato (sintaxe, semântica, ordem, estado, tempo, erro, versão); padronização/interoperabilidade; ler as etapas DNS/TCP/TLS/HTTP e um status para dizer onde a conversa parou. Saíram "relacionar com cloud/DevSecOps/APIs" (lista de áreas), "falhas em logs e capturas" e "riscos de segurança" (seções removidas) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 136 palavras; gancho "404 – Página não encontrada" (todo aluno já viu); consequência: reiniciar roteador/testar cabo num problema que é da conversa; carreira em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase; 86 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 5: DNS (7.1, 7.3), TCP (2.6, 6.3), TLS (8.3), HTTP (8.1, 8.2), Porta (2.6). Os 6 da v1 (Protocolo, Mensagem, Handshake, Timeout, Status code, Interoperabilidade) saíram: a aula os ensina |
| Problema 80–150, sem repetir o gancho | cumpre | 141 palavras; retoma com "é isso que acontece quando as duas pontas seguem as mesmas regras"; `47 45 54` = GET; ilhas de fabricantes → regras públicas em 2 frases |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | contrato e seus elementos só no Conceito; fases da conversa no Funcionamento; diagrama mostra o contrato |
| Arquitetura só se acrescenta | removida | listas de protocolos por categoria (Ethernet, ARP, Kerberos, SAML, Kubernetes, service mesh…) eram prévia; a cooperação de protocolos ficou no Exemplo |
| Diagrama mantido/corrigido | mantido | só o rótulo "espera e retry" → "espera e repete" (termo em inglês não explicado) |
| Erros comuns ≤3, sem repetição | cumpre | 3 no Funcionamento interno: porta ≠ protocolo, ping ≠ aplicação, código de erro ≠ rede (vinham de Problema + Arquitetura da v1). O Resumo os cita em 1 linha (exceção prevista) |
| Termos avançados cortados ou no glossário | cumpre | saíram ICMP, OIDC, SSO, JWT, mTLS, proxy, API gateway, multiplexação, schema, correlation ID, parsing, SNI, cadeia de confiança; handshake e código de status agora são explicados no texto |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample = abrir https://example.com: DNS → TCP → TLS → HTTP, pedido GET comentado, linha de status, onde cada etapa falha. Analogia do chamado telefônico em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud, devsecops e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 0) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saiu q0.7.4 (boas práticas de segurança, conteúdo removido); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 7; saiu fc0.7.6 (downgrade/versões antigas); novos fc0.7.8 (padrões/interoperabilidade) e fc0.7.9 (sintaxe × semântica) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos com curl: conversa completa (-v), cabeçalho da resposta (-I), 404 controlado, falha no DNS com nome .example; 416 palavras; 20 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (timeout × RTT da 0.6; 403 com ping e porta ok), exercícios 2 (hipóteses para 404; classificar 5 violações do contrato), desafio novo dos 3 chamados com saídas do curl |
| nextTheme 1–2 frases | cumpre | 1 frase (0.8) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` lab/exercício); unlocks/accessPolicy preservados; "15-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions |

Verificação do quiz contra a aula v2: q0.7.1 (definição) → Conceito, definição; q0.7.2 (ping ok, erro de certificado → TLS) → Exemplo ("se o TLS falha, aparece um erro de certificado") + erro comum do ping; q0.7.3 (porta ≠ protocolo) → Erros comuns; q0.7.5 (401 no servidor de testes, ok no notebook) → Exemplo (401 = identificação ausente ou inválida; erro HTTP = etapas anteriores funcionaram); q0.7.6 (curl -v) → Exemplo, última frase (+ lab); q0.7.7 (valor proibido em campo bem formado = semântica) → Conceito. Gabaritos em 1, 2, 0, 1, 2, 3.

## 2. O que saiu e por quê
- Objetivos 4–6: lista de áreas (TCP, UDP, APIs, cloud, DevSecOps), falhas em logs/capturas e riscos de segurança (seções removidas / prévias).
- Motivação: caso da API interna que quebrou após atualização (versão TLS, payload JSON, token: termos não explicados) → trocado pelo gancho do 404; lista de perguntas de diagnóstico (repetia o Funcionamento).
- Problema: lista de 8 elementos do contrato (movida para o Conceito, onde vira a definição); callout "porta ≠ protocolo" (foi para Erros comuns).
- Conceito: o que TCP, HTTP, DNS, TLS e OIDC definem (prévias 6.3, 8.2, 7.4, 8.3, 8.6).
- Funcionamento interno: tabela "Tipos de protocolo" (orientado a conexão × sem conexão = prévia 2.6/6.5; texto × binário ficou em 1 frase no Conceito); "protocolos diferentes compartilham a mesma porta com proxy/multiplexação" (termo avançado); exemplos de resolver, flags, reset.
- Arquitetura inteira (prévia de camadas 0.8/2.x e de identidade/plataforma; erros comuns foram para o Funcionamento).
- Analogia: "limite da analogia" (repetia a ideia de formato rígido).
- Exemplo simples: 429 (rate limit) e "inspeção TLS".
- enterpriseExample (SSO, claims, tabela sintoma × protocolo), cloudExample, devsecopsExample, securityExample (seção do template).
- security e troubleshooting (módulo 0).
- learningOutcomes (seção do template).
- Lab: passos 1 (netstat/ss: sockets e estados = prévia 6.8), 2 (Test-NetConnection/nc: alcance TCP = prévia 2.8/6.8) e 6 (registrar evidências: ritual); scenario, topology, architecture, cost, safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions. Entrou o passo da falha de DNS.
- Quiz q0.7.4 (boas práticas de segurança). Flashcard fc0.7.6 (downgrade).
- Mentor: "por que bytes sozinhos não bastam" (reexplica a ideia central) e "pipeline após rotação de credenciais" (DevSecOps).
- Exercícios: ex0.7.1 (bytes × protocolo: repete q0.7.1), ex0.7.3 (5 protocolos de login corporativo: OIDC/SAML/Kerberos, prévia 8.6), ex0.7.4 (desativar validação TLS: segurança cortada e coberta pelo desafio).
- Desafio "API de pagamentos em Kubernetes com 401/403" (Kubernetes, API gateway, IdP, rubrica de 100 pontos) → trocado pelo desafio dos três chamados.
- Glossário: os 6 termos da v1 (a aula os ensina).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Regras específicas de TCP (numerar bytes, confirmar, encerrar sessão) | prévia | 6.3 |
| Regras de DNS (tipo de registro) | prévia | 7.4 |
| Handshake TLS com certificados, chaves e algoritmos; SNI; cadeia de confiança; inspeção TLS | prévia | 8.3 |
| OIDC, OAuth, SAML, Kerberos, mTLS, SSO, JWT, claims | prévia | 8.6 |
| Protocolo orientado a conexão × sem conexão | prévia | 2.6, 6.5 |
| Várias aplicações na mesma porta via proxy/multiplexação | termo avançado | 8.5 |
| Pilha Ethernet/ARP/IP/ICMP/roteamento e categorias de protocolos | prévia | 0.8, 2.1–2.7 |
| Ping usa ICMP | termo avançado (ficou "pedido de eco") | 4.8 |
| 429 (limite de requisições) e demais status codes | prévia | 8.2 |
| Sockets, estados LISTEN/ESTABLISHED (netstat/ss) | prévia | 6.8 |
| Teste de alcance TCP (Test-NetConnection, nc) | prévia | 2.8, 6.8 |
| Load balancer, API Gateway, Private Endpoint, banco gerenciado | exemplo por ambiente | 8.5, 14.x |
| Git, registry, kubectl, IaC, federação OIDC em pipelines; clock skew | exemplo por ambiente | 8.6, 7.7 |
| Downgrade, replay, beaconing, exfiltração, SOC | exemplo por ambiente / seção removida | 8.9, 9.x, 16.x |
| Vulnerabilidades, boas/más práticas, monitoramento de 4xx/5xx, hardening, detecção | seção removida (módulo 0) | 8.9 |
| Sintomas, perguntas e árvore de decisão de troubleshooting; comandos Cisco IOS | seção removida (módulo 0) | 2.8, 8.8 |
| "Ignorar versão e negociação" (erro comum) | limite de 3 erros comuns; versão segue no Conceito | 8.6 |

## 4. Acréscimos
- Motivação nova com o gancho do 404 (a v1 usava um caso profissional com TLS/JSON/token, inacessível neste ponto).
- Conceito: item "Segurança" na lista de elementos, curto, para casar com o diagrama ("… + segurança"), e 1 frase texto × binário (substitui a tabela de tipos).
- Funcionamento interno: "cliente" e "servidor" definidos; handshake e código de status explicados no próprio texto (eram só glossário).
- Exemplo: cada um dos 4 protocolos em 1 linha (DNS, TCP, TLS com "certificado = documento que prova a identidade do servidor", HTTP), a linha de status `HTTP/1.1 404 Not Found` e a menção a `curl -v` (sustenta q0.7.2, q0.7.5 e q0.7.6).
- Lab: passo 4 (nome `.example`, que nunca resolve) para comparar "parou no DNS" com "o servidor recusou".
- Mentor novo sobre timeout × RTT (liga com a 0.6). Exercício novo ex0.7.5 (classificar violações do contrato). Desafio novo dos três chamados com solução comentada. Flashcards fc0.7.8 e fc0.7.9.
- Glossário novo: DNS, TCP, TLS, HTTP, Porta.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 5.834 | 5.604 | 3.588 |
| Teoria (palavras) | 3.617 | 3.174 | 1.459 |
| Núcleo (min, fórmula v2) | 36,8 | 34,4 | 20,2 |
| Prática extra (min) | 75 | 80 | 51 (→ 50) |
| duration declarada | 75-105 min | 105-145 min | 15-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- "análise ainda não escrita": resolvido por este arquivo. Nenhum outro aviso (a primeira rodada acusou prática extra com 796 palavras; mentor e solução foram encurtados para 749).

## 7. Revisão humana
- Lab não testado: a rede desta sessão bloqueia example.com. O 404 do passo 3 está descrito como "normalmente 404"; as linhas do `curl -v` variam entre Linux (OpenSSL) e Windows (Schannel) e entre HTTP/1.1 e HTTP/2, o que está avisado no texto.
- Passo 1 do lab usa `-o /dev/null` (Linux/macOS) e `-o NUL` (Windows) para descartar o corpo; confirme no Windows.
- Quiz: redação ajustada mantendo os ids. q0.7.2 ("camada/protocolo" → "etapa"; distrator "o ping usa outra porta" → "o ping não usa essa porta"; correta sem "cadeia de certificados"); q0.7.3 (2 distratores trocados por outros sem termos de camada); q0.7.5 (pipeline → servidor de testes, "API" explicada no enunciado); q0.7.6 (distratores sem traceroute/ss); q0.7.7 ("Temporização" → "Tempo", como no Conceito).
- Glossário traz Porta → 2.6 embora a aula dê 1 frase sobre ela no erro comum; confirme se prefere tirar.
- Motivação trocou o caso profissional da v1 (API que quebrou após atualização) pelo 404; confirme se o tom de entrada está adequado.
- tags (cloud, devsecops, apis), references (2 internas com url vazia + 3 RFCs reais) e linksToOtherCourses (DevSecOps, IAM) mantidos da v1.

```json
{
  "id": "0.7", "modulo": "m00", "titulo": "O que é um protocolo", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 17,
  "acrescimos": ["Motivação com o gancho do 404", "Conceito: item Segurança e frase texto × binário", "Funcionamento: cliente/servidor, handshake e código de status explicados", "Exemplo: papel de DNS/TCP/TLS/HTTP em 1 linha, linha de status e curl -v", "Lab: passo de falha no DNS", "Mentor timeout × RTT", "Exercício ex0.7.5 (classificar violações)", "Desafio dos três chamados com solução", "Flashcards fc0.7.8 e fc0.7.9", "Glossário DNS/TCP/TLS/HTTP/Porta"],
  "palavras_visiveis": { "original": 5834, "v1": 5604, "v2": 3588 },
  "nucleo_min": { "original": 36.8, "v1": 34.4, "v2": 20.2 }, "pratica_extra_min": { "original": 75, "v1": 80, "v2": 50 },
  "duration_v2": "15-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "Os elementos do contrato viraram uma lista única no Conceito e o diagnóstico por etapa ficou num só exemplo (abrir example.com), sem listas de protocolos de identidade, cloud e plataforma.",
  "revisao_humana": ["Lab não testado (rede bloqueada); 404 e saída do curl -v descritos com ressalva", "-o NUL no Windows a confirmar", "Redação de q0.7.2, q0.7.3, q0.7.5, q0.7.6 e q0.7.7 ajustada (ids mantidos)", "Porta no glossário apesar de 1 frase no texto", "Motivação trocada pelo gancho do 404", "tags/references/linksToOtherCourses mantidos da v1"]
}
```
