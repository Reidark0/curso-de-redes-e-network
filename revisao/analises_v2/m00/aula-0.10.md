# Aula 0.10 — Revisão do Módulo 0 (v2)
Base: v1 · Tipo: ligação/revisão · Módulo: m00 (Fundamentos da Computação)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: cadeia de perguntas aplicada a um sintoma vago; pares que geram diagnóstico errado; lacunas pelo checklist. Saíram "sem lista decorada" (genérico), "treinar cenários" (atividade) e "preparar para topologia, enlace… no Módulo 1" (prévia → nextTheme) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 144 palavras; gancho do chamado "está lento"; consequência: pedir banda para atraso, culpar a rede por 403, colar senha em Base64; carreira em 1 frase. Saiu a lista de 10 termos do módulo |
| Resumo 4–5 itens + frase final | cumpre | 85 palavras; 5 itens de 1 linha (cadeia, Mbps ÷ 8, Base64, banda/throughput/latência, ping ≠ permissão) + frase padrão |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 3: Overhead (0.4), RTT (0.6), HTTP 403 (8.2). Os 5 da v1 eram conceitos desta própria aula (revisão ativa, mapa mental, prontidão, lacuna, limite da evidência) |
| Problema 80–150, sem repetir o gancho | cumpre | 111 palavras; retoma com "esses chutes acontecem quando os fundamentos ficam soltos"; saíram a lista "sem X, você…" (repetia a cadeia) e o callout "Erro de base" (repetia o parágrafo) |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | cadeia só no Funcionamento interno (8 passos, cada um com a aula de origem) + diagrama; a tabela "aula a aula" saiu porque repetia a cadeia e a coluna "Prepara para" era lista de siglas futuras |
| Arquitetura só se acrescenta | não se aplica | não havia na v1 |
| Diagrama mantido/corrigido | mantido | mapa mental do módulo, sem alteração |
| Erros comuns ≤3, sem repetição | cumpre | 2 itens (só reler; começar pela aplicação). Saiu "confundir termos parecidos" (repetia a tabela de pares) |
| Termos avançados cortados ou no glossário | cumpre | saíram serialização, pipeline, registry, runner, security group, endpoint privado, any-any, exfiltração, túnel, inspeção TLS, WAF, Cisco IOS; overhead/RTT/403 no glossário; gateway explicado em 1 aposto no exemplo |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample reescrito a partir do enterpriseExample ("sistema financeiro lento") com valores: 110 MB em 10 s = 88 Mbps; ping 2 ms ao gateway × 180 ms ao servidor; limite da evidência. Analogia da biblioteca removida (o tema não é abstrato; repetia a lista de conceitos + "limite da analogia") |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise (virou o simpleExample), devsecops/cloud e securityExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 0); "mascarar antes de compartilhar" ficou como pergunta do passo Evidência, no exercício ex0.10.4 e no desafio |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saiu q0.10.4 (banda × throughput, definição já coberta pela tabela e aplicada na q0.10.8); q0.10.6 sem "pipeline". quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6; fc0.10.1 (cadeia) e fc0.10.6 (evidência) atualizados para a cadeia nova |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não se aplica | não havia (a prática integradora é a 0.9) |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (130 palavras), exercícios 3 (187), desafio + solução (320, reduzido) |
| nextTheme 1–2 frases | cumpre | 2 frases, aponta a 1.1; saiu a lista de temas do Módulo 1 (topologias, LAN, WAN, switches…) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `anyOf` com checklistDone), unlocks ["1.1"] e accessPolicy preservados; "15-25 min + 35 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | nenhum; `challenge.gradingRubric` removido (ritual de rubrica numa aula de revisão) |

Verificação do quiz contra a aula v2: q0.10.2 (Base64) → linha "Codificação × criptografia" + Resumo; q0.10.3 (o que ping não prova) → linha "Conectividade × autorização" ("não mostra permissão nem aplicação saudável"); q0.10.5 (pensar em camadas) → passo 7 da cadeia + callout "começar pela aplicação"; q0.10.6 (HTTP 403) → linha "Conectividade × autorização"; q0.10.7 (200 Mbps → 25 MB/s) → linha "Bit × byte" (÷ 8); q0.10.8 (lento a cada clique) → linha "Latência × largura de banda" + Exemplo simples. Gabaritos em 1,2,3,1,2,3.

## 2. O que saiu e por quê
- Objetivos 1, 4 e 5 da v1: genérico, atividade e prévia do Módulo 1 (→ nextTheme).
- Motivação: lista "bits, bytes, hexadecimal, UTF-8, Base64… são as ferramentas" (lista de termos); "o que separa o iniciante perdido do profissional" (encheção).
- Problema: lista "sem bits e bytes… sem camadas…" (repetia a cadeia do Funcionamento interno); callout "Erro de base" (repetição).
- Conceito: tabela "O módulo, aula a aula" (repetia a cadeia; coluna "Prepara para" com MAC, IPv6, cloud billing, VPN, IAM = prévias); callout item "confundir termos parecidos" (repetia a tabela).
- Funcionamento interno: frase "é o primeiro ensaio do que você fará em redes"; passos "Informação"/"Representação"/"Forma humana" fundidos em "Dado" e "Bytes"; passo "Segurança" fundido em "Evidência".
- Analogia da biblioteca + "limite da analogia" (lista de conceitos de novo; tema não abstrato).
- simpleExample da v1 ("você abre um site… aparece o módulo inteiro"): repetia a cadeia; trocado pelo caso do enterpriseExample com números.
- enterpriseExample (virou o simpleExample), devsecopsExample, securityExample (seções do template; termos de cloud/DevSecOps/SOC).
- security e troubleshooting (módulo 0), incluindo comandos Cisco IOS.
- learningOutcomes (seção do template).
- Quiz q0.10.4 (banda × throughput: definição que a tabela dá e a q0.10.8 aplica).
- Mentor "Um usuário diz que o sistema está fora…" (sobreposição com o desafio e o exemplo); mentor "ideia mais importante do Módulo 0" trocado por uma pergunta que aplica o checklist.
- Exercícios ex0.10.1 (informação/dado/bit/byte: recordação da 0.1 e da tabela) e ex0.10.2 (tabela de métricas: repetia a tabela de pares).
- Desafio: tarefa "lista de assuntos do Módulo 1" (prévia), 2 de 4 restrições, 4 de 5 entregáveis, gradingRubric (ritual); solução: passo "listar assuntos do Módulo 1".
- Glossário: os 5 termos da v1 (conceitos desta aula, todos apontando para a própria 0.10).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Para que cada aula do módulo "prepara" (MAC, IPv4/IPv6, máscaras, tokens, IAM, cloud billing, backups, VPN, proxy, OSI/TCP-IP) | prévia / lista de siglas | 2.1, 3.2, 4.1, 8.6, 14.x |
| Serialização como algo que se confunde com codificação | termo avançado | 2.7 |
| Pipelines, registries, runners, cofres de segredo, security groups, endpoints privados, custo de transferência em cloud | exemplo por ambiente | 14.x |
| Timeout × senha errada; throughput baixo num runner por disco/CPU | exemplo por ambiente (DevSecOps) | 8.8, 15.8 |
| Latência anormal como túnel; volume de saída como exfiltração; regra any-any | exemplo de segurança / prévia | 9.x, 16.x |
| Inspeção TLS e proxy no diagnóstico do sistema lento | termo avançado / prévia | 8.5 |
| Sanitização: IPs internos, nomes de hosts, retenção de logs; boas/más práticas, monitoramento, hardening, detecção | seção removida (módulo 0); o essencial ("mascarar antes de compartilhar") ficou na cadeia, no ex0.10.4 e no desafio | 0.9 (já ensina mascarar) |
| Comandos ipconfig/ip/ping/tracert/curl/Test-NetConnection e Cisco IOS (show ip interface brief…) | seção removida (módulo 0); a coleta é o tema da 0.9 | 0.9, 1.9, 4.9 |
| Árvore de decisão (gateway, DNS, porta × login, download × plano) | seção removida (módulo 0); o raciocínio está na cadeia e no desafio | 1.9 |
| Protocolo definindo "estado" | simplificação (formato, ordem, erros e significado ficaram) | 0.7 |
| Analogia "aprender a ler antes de frequentar bibliotecas" | repetição / tema não abstrato | — |
| Lista de áreas de "uso real" no Resumo (logs, dumps, times técnicos) | lista de termos | — |

## 4. Acréscimos
- Exemplo simples com valores concretos (110 MB em 10 s = 11 MB/s = 88 Mbps; ping 2 ms × 180 ms) para mostrar a cadeia aplicada a "está lento" e sustentar a q0.10.8.
- Funcionamento interno: cada passo da cadeia passou a indicar a aula de origem (substitui a tabela "aula a aula").
- Exercício ex0.10.5 (backup de 45 GB em 1 h num link de 100 Mbps): aplica Mbps → MB/s e banda × throughput a um caso novo.
- Mentor novo: explicar sem consultar o item mais frágil do checklist (aplica o objetivo 3).
- Glossário: Overhead (0.4), RTT (0.6), HTTP 403 (8.2).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 3.839 | 4.107 | 2.680 |
| Teoria (palavras) | 2.558 | 2.566 | 1.308 |
| Núcleo (min, fórmula v2) | 28,7 | 29,7 | 19,1 |
| Prática extra (min) | 45 | 45 | 37 (→ 35) |
| duration declarada | 70-100 min | 70-100 min | 15-25 min + 35 min de prática extra |

## 6. Avisos do validar e justificativas
- "análise ainda não escrita": resolvido por este arquivo. Nenhum outro aviso.

## 7. Revisão humana
- Diagrama mantido como na v1: ele termina em "Camadas → Módulo 1" e não tem a etapa "Evidência", que a cadeia do texto inclui (passo 8). Não está errado, mas poderia ganhar essa caixa.
- HTTP 403 está no glossário (→ 8.2) embora a tabela de pares diga em 1 frase o que ele significa; a aula não explica códigos de status HTTP. Confirme se fica.
- Valores do Exemplo simples (110 MB em 10 s; 2 ms até o gateway, 180 ms até o servidor) são um cenário ilustrativo, não uma medição.
- q0.10.2 (Base64) é quase igual à q0.1.3 da aula 0.1; mantida porque a revisão cobra o par codificação × criptografia.
- q0.10.4 removida: id aposentado, não reaproveitado.
- references e linksToOtherCourses (DevSecOps e IAM) mantidos como na v1, como na 0.1.

```json
{
  "id": "0.10", "modulo": "m00", "titulo": "Revisão do Módulo 0", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "analogy", "enterpriseExample", "devsecopsExample", "securityExample", "security", "troubleshooting", "challenge.gradingRubric"],
  "conceitos_removidos": 12,
  "acrescimos": ["Exemplo simples com valores (88 Mbps, 2 ms × 180 ms)", "Cadeia com a aula de origem em cada passo", "Exercício ex0.10.5 (backup de 45 GB)", "Mentor: explicar o item mais frágil do checklist", "Glossário: Overhead (0.4), RTT (0.6), HTTP 403 (8.2)"],
  "palavras_visiveis": { "original": 3839, "v1": 4107, "v2": 2680 },
  "nucleo_min": { "original": 28.7, "v1": 29.7, "v2": 19.1 }, "pratica_extra_min": { "original": 45, "v1": 45, "v2": 35 },
  "duration_v2": "15-25 min + 35 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "A cadeia do módulo aparece uma vez, como 8 perguntas com a aula de origem, e é aplicada num chamado 'está lento' com números, em vez de tabela aula a aula, analogia e três exemplos por ambiente.",
  "revisao_humana": ["Diagrama sem a etapa Evidência (mantido da v1)", "HTTP 403 no glossário apesar da frase na tabela", "Valores do Exemplo simples são ilustrativos", "q0.10.2 quase igual à q0.1.3", "q0.10.4 removida (id aposentado)", "references/linksToOtherCourses mantidos da v1"]
}
```
