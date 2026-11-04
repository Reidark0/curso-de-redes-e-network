# Aula 0.9 — Laboratório integrador do Módulo 0 (v2)
Base: v1 · Tipo: ligação integradora · Módulo: m00 (Fundamentos da Computação)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: coletar evidências de uma conexão; interpretar no formato "mostra X, não mostra Y, próximo teste Z", de baixo para cima; usar octetos, Mbps/MB/s e Base64 mascarado ao ler e compartilhar evidências. Saíram "integrar 0.1 a 0.8" (vago), "construir relatório" (atividade, coberta pelo objetivo 2 e pelo lab) e "preparar para o Módulo 1" (prévia) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 145 palavras; gancho das equipes que se culpam ("o ping está normal"); consequência ("liberar tudo no firewall"); carreira = 1 frase (chamado útil / analista de segurança) |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase; 87 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 5: Gateway (1.9, 2.5), DNS (7.1), ICMP (4.8), TLS (8.3), Código de status HTTP (8.2). Saíram Evidência técnica, Hipótese, Relatório técnico, Sanitização e Limite da evidência (a aula os ensina) |
| Problema 80–150, sem repetir o gancho | cumpre | 126 palavras; retoma com "é isso que acontece quando cada teste é lido sozinho"; diz o que a aula resolve (evidência com limite, de baixo para cima) |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | a fórmula e as regras ficam no Conceito; a cadeia de etapas, na tabela do Funcionamento interno e no diagrama |
| Arquitetura só se acrescenta | não se aplica | não existia na v1 |
| Diagrama mantido/corrigido | mantido | sem mudanças: rótulos já usam só termos da aula |
| Erros comuns ≤3, sem repetição | não se aplica | não há callout; os erros típicos estão no Problema e na solução do desafio |
| Termos avançados cortados ou no glossário | cumpre | saíram 802.1X, VLAN, split tunnel, IdP, security group, NSG, NAT Gateway, endpoint privado, WAF, registry, egress, claims, exfiltração, payload |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample novo e concreto (perda de 25% já no ping ao gateway → Wi-Fi); analogia da encomenda em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud, devsecops e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 0); a sanitização de evidência virou a 3ª regra do Conceito |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saiu q0.9.6 (cloud); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6; fc0.9.6 e fc0.9.7 com o verso simplificado (saíram identidade/observabilidade, claims, WAF) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos (base local; latência, perda e caminho; nome, porta e HTTP; tabela e conclusão); 395 palavras; 30 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2, exercícios 3, desafio novo (duas rodadas de teste) com solução; 749 palavras |
| nextTheme 1–2 frases | cumpre | 1 frase (0.10 e Módulo 1) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `anyOf` com `checklistDone`); unlocks/accessPolicy preservados; "15-25 min + 65 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/solution |

Verificação do quiz contra a aula v2: q0.9.2 (ping responde) → tabela, linha "Latência e perda" + Resumo; q0.9.3 (Base64 em relatórios) → Conceito, regra "Mascare antes de compartilhar"; q0.9.4 (500 Mbps = 62,5 MB/s) → Funcionamento interno, "Taxas"; q0.9.8 (168 = 10101000 = A8) → Funcionamento interno, "Octetos"; q0.9.5 (conclusão responsável) → tabela, linha "Porta" (nome resolve e porta falha → rota, firewall, proxy ou serviço); q0.9.7 (`*` no tracert) → tabela, linha "Caminho". Gabaritos em 1,2,0,3,1,2.

## 2. O que saiu e por quê
- Objetivos 1, 4 e 5 da v1: vago, atividade e prévia do Módulo 1.
- Motivação: lista das peças do módulo e lista de 12 itens de evidência (repetição); "time de segurança suspeita do proxy" (encurtado).
- Problema: lista "o que quebra / confusões típicas / risco" virou um parágrafo; "velocidade negociada, cabo ruim" (0.5).
- Conceito: definição de "laboratório integrador" (trocada pela de evidência técnica, que é o tema); callout "Limites deste laboratório" com 4 itens virou 1 frase (observabilidade corporativa, captura de pacotes, logs do servidor saíram).
- Funcionamento interno: frase da cadeia corporativa (switches, firewalls, proxies, VPN, DNS interno, balanceadores, IdP: prévias); linhas "Representação" e "Taxa e volume" da tabela (viraram os 2 itens "Octetos" e "Taxas"); parágrafo "Por fim, duas etapas" (sanitização foi para o Conceito).
- Analogia: mapeamento item a item (encapsulamento, portaria = firewall/proxy/TLS/IdP) e "limite da analogia" (termos avançados).
- simpleExample da v1 (lista de perguntas sem valores) → trocado por um caso com valores.
- enterpriseExample (802.1X, VLAN, VPN, split tunnel; o caso do 403 segue no exercício ex0.9.5), cloudExample, devsecopsExample, securityExample com tabela de riscos (seção do template).
- security e troubleshooting (módulo 0).
- learningOutcomes (seção do template).
- Lab: de 12 para 4 passos. Saíram "criar o arquivo de relatório" e "registrar ambiente" (ritual; o horário entrou no passo 1), "representação de texto em bytes" e "IPv4 em octetos" com scripts Python/PowerShell (repetem os labs de 0.1–0.3 e 0.2; o octeto 168 ficou no texto e no quiz), "relacionar bit, byte, taxa e volume" (virou o exercício ex0.9.7), safetyNotes, validation, troubleshooting, improvements (Wireshark), evidenceToCollect, questions e solution (ritual ou repetição). Passos 5–9 fundidos em 3; 11–12 fundidos no passo 4.
- Quiz q0.9.6 (cloud: security group, WAF, IAM).
- Mentor: "sistema às vezes não abre, testes agora funcionam" (coberto pelo desafio novo); "DNS e ping ok, curl falha" (repete q0.9.5); "o que mascarar" (repete a regra do Conceito). Entraram 2 novos (ver Acréscimos).
- Exercícios: ex0.9.1 (reexplica a ideia central); ex0.9.2 (300 Mbps → MB/s repete q0.9.4).
- Desafio "Relatório de triagem para sistema lento" com 6 tarefas e rubrica (refazia o lab) → trocado por um caso novo com evidências dadas. Solução comentada refeita.
- Glossário: os 5 termos da v1 (a aula os ensina).
- Referência "The Unicode Standard" (a aula não trata mais de codificação de texto); tags "cloud" e "devsecops".

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Cadeia corporativa: switches, firewalls, proxies, VPN, DNS interno, balanceadores, IdP | prévia | 1.7, 8.5, 10.1, 14.7 |
| 802.1X, VLAN, split tunnel no acesso a um sistema financeiro | prévia / exemplo por ambiente | 12.5, 3.7, 10.6 |
| Falhas em cloud: security group, NSG, route table, DNS privado, endpoint privado, NAT Gateway, WAF, IAM | exemplo por ambiente | 14.4, 14.5, 14.7, 14.10, 15.10 |
| Falhas em pipeline: runner sem saída, proxy, TLS interceptado, registry, egress, secret | exemplo por ambiente | 15.8, 14.11 |
| Alerta de exfiltração (volume, taxa, padrão de DNS, logs de proxy) | exemplo por ambiente / prévia | 13.7, 16.9 |
| Tabela de riscos (evidência fraca, segredo exposto, alteração insegura, autenticação × autorização) | seção do template; segredo e firewall seguem no Conceito e no mentor | 9.9, 15.2 |
| Limites: ferramentas corporativas de observabilidade, captura de pacotes, logs do servidor | prévia (ficou 1 frase sobre limites dos comandos) | 15.2, 15.11 |
| Representação no lab: bytes, hex e Base64 de "Rede" por script | repetição dos labs anteriores | 0.1, 0.3 |
| Conversão de IPv4 em octetos por script (192, 10 e 50) | repetição; o octeto 168 ficou no texto | 0.2, 4.2 |
| Cálculo 100 MB a 40 MB/s × 500 Mbps | virou o exercício ex0.9.7 (40 MB/s = 320 Mbps = 64%) | 0.4 |
| `route print`, `nslookup`, `Get-ComputerInfo`, `uname`, `Invoke-WebRequest` | comandos redundantes ou ritual | 1.9, 11.9 |
| Melhorias do lab: Wireshark (DNS e TLS ClientHello), Wi-Fi × cabo, VM/WSL | ritual / prévia (Wi-Fi × cabo ficou no exemplo) | 15.11 |
| Monitoramento, hardening, detecção, árvore de decisão e comandos de troubleshooting | seção removida (módulo 0) | 2.8, 15.1–15.2 |
| Cloud: método por camadas evita confundir rota, DNS privado, security group, LB, WAF, IAM (q0.9.6) | exemplo por ambiente | 15.10 |
| Analogia: embalagem = encapsulamento; dados fragmentados, cacheados e balanceados | termo avançado | 2.2 |

## 4. Acréscimos
- Conceito: definição de evidência técnica e hipótese (antes só no glossário) e as 3 regras do relatório (de baixo para cima, horário, mascarar), que juntam o que a v1 espalhava em segurança, mentor e desafio.
- simpleExample novo com valores (ping ao gateway e a 8.8.8.8 com 25% de perda → rede local / Wi-Fi), aplicando a fórmula e ligando às aulas 0.5 e 0.6.
- Mentor novos: ping falha mas curl retorna 200 (limite do ICMP no sentido inverso da q0.9.2); colega quer liberar o firewall "só para testar" (vinha da tabela de riscos e dos commonWrongAnswers da v1).
- Exercício ex0.9.7 (40 MB/s × 500 Mbps), vindo do commonWrongAnswers e do passo 10 do lab da v1.
- Desafio novo: duas rodadas (09:10 ok; 14:30 com 60% de perda no gateway), com solução comentada.
- Glossário: Gateway, DNS, ICMP, TLS e Código de status HTTP (citados e não explicados).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 5.598 | 5.731 | 3.119 |
| Teoria (palavras) | 2.887 | 2.569 | 1.335 |
| Núcleo (min, fórmula v2) | 31,2 | 29,8 | 19,3 |
| Prática extra (min) | 135 | 135 | 67 (→ 65) |
| duration declarada | 80-120 min | 145-205 min | 15-25 min + 65 min de prática extra |

## 6. Avisos do validar e justificativas
- "análise ainda não escrita": resolvido por este arquivo. Na primeira rodada houve avisos de lab (454 palavras) e prática extra (846); o texto foi enxugado até 395 e 749, e o `validar` final não tem outros avisos.

## 7. Revisão humana
- Lab de uma aula "laboratório integrador" reduzido de 12 para 4 passos e de 90 para 30 min (estimativa minha). Os passos de representação (bytes, hex, Base64, octetos por script) saíram por repetirem os labs de 0.1–0.3; confirme se o integrador deve mantê-los.
- `labType` mudou de "cloud" para "troubleshooting" (o lab não tem nada de cloud).
- Comandos não testados em Windows nem na rede real: `Test-NetConnection` só existe no Windows; `curl.exe` exige Windows 10 1803 ou mais novo; a resposta de `example.com` (HTTP/1.1 200 ou HTTP/2 200) e a resposta a ping podem variar.
- Valores do exemplo (25% de perda) e do desafio (60% de perda, IPs 10.0.5.1 e 10.20.30.40, `financeiro.empresa.local`) são cenários ilustrativos, não saídas reais.
- Gateway no glossário aponta para 1.9 e 2.5; confirme a aula preferida.
- Subtitle mantido da v1 (cita "bases numéricas, sinais"), embora a aula agora trate pouco de sinais.
- references (0.1, 0.8, curl) e linksToOtherCourses mantidos da v1; "The Unicode Standard" removida.

```json
{
  "id": "0.9", "modulo": "m00", "titulo": "Laboratório integrador do Módulo 0", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "enterpriseExample", "cloudExample", "devsecopsExample", "securityExample", "security", "troubleshooting"],
  "conceitos_removidos": 15,
  "acrescimos": ["Conceito: definição de evidência/hipótese e 3 regras do relatório", "simpleExample com perda no gateway (Wi-Fi)", "Mentor: ping falha e curl 200", "Mentor: liberar firewall para testar", "Exercício ex0.9.7: 40 MB/s × 500 Mbps", "Desafio de duas rodadas com solução", "Glossário: Gateway, DNS, ICMP, TLS, Código de status HTTP"],
  "palavras_visiveis": { "original": 5598, "v1": 5731, "v2": 3119 },
  "nucleo_min": { "original": 31.2, "v1": 29.8, "v2": 19.3 }, "pratica_extra_min": { "original": 135, "v1": 135, "v2": 65 },
  "duration_v2": "15-25 min + 65 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O método virou uma fórmula ('mostra X, não mostra Y, próximo teste Z') com 3 regras e uma tabela de 7 etapas, aplicada num exemplo com valores, sem listas de ambientes nem lab de 12 passos.",
  "revisao_humana": ["Lab integrador reduzido de 12 para 4 passos e 90 para 30 min; passos de representação removidos", "labType cloud → troubleshooting", "Comandos não testados em Windows nem na rede real (Test-NetConnection, curl.exe, example.com)", "Valores do exemplo e do desafio são ilustrativos", "Gateway no glossário aponta para 1.9 e 2.5", "Subtitle mantido da v1", "references e linksToOtherCourses mantidos; Unicode removida"]
}
```
