# Aula 1.6 — Cabeamento estruturado e padrões RJ-45 (v2)
Base: v1 · Tipo: fundamental · Módulo: m01 (Fundamentos de Redes)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: caminho do ponto + identificação + limite de 100 m; T568A×B, cabo direto/cruzado e 4 pares em 1 Gbps; categoria/interferência/PoE/tipo de teste ligados a sintomas. Saíram "diagnosticar com evidências" e "impactos de segurança física" (viraram erro comum, mentor e desafio) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 147 palavras; rack sem etiquetas, estação em 100 Mbps, alguém puxa cabos e derruba câmera e telefone; consequência = tentativa e erro com o defeito escondido; carreira/segurança em 1 frase (alerta numa porta do switch → qual tomada) |
| Resumo 4–5 itens + frase final | cumpre | 90 palavras, 5 itens + frase padrão |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 4: Ethernet (3.1), Erro CRC (3.2), Switch (1.7), Access point (1.7). Saíram Cabeamento estruturado, RJ-45, Patch panel, T568A/B, PoE, Cabo horizontal, Patch cord, Certificação (a aula ensina) |
| Problema 80–150, sem repetir o gancho | cumpre | 137 palavras; "é isso que acontece quando a rede cresce com cabos instalados um a um"; diz as 4 coisas que a aula resolve e o custo × benefício. Saiu a tabela "Sem… / O que acontece" (repetia Conceito, Funcionamento e erros comuns) |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | caminho do ponto só no Funcionamento interno + diagrama; Conceito = definição, RJ-45, T568A/B e pares |
| Arquitetura só se acrescenta | removida | áreas (trabalho, horizontal, sala de telecom, backbone) repetiam o caminho; a única novidade (backbone em fibra) virou 1 frase no Funcionamento; tabela de decisões por ponto repetia PoE e porta pública |
| Diagrama mantido/corrigido | mantido (ajustado) | rótulos "patch cord", "até 90 m", "patch cord de rack" e "Canal completo: até 100 m" acrescentados (os patch cords estavam só na `desc`); "porta/VLAN/PoE" → "porta, velocidade, PoE"; zona Segurança sem 802.1X/VLAN; "patching" → "registro de mudanças"; `desc` reescrita |
| Erros comuns ≤3, sem repetição | cumpre | 3: qualquer cabo RJ-45 serve; não identificar; porta ativa em área pública. Saiu "misturar A e B" (repetia o item "cabo direto" do Conceito) |
| Termos avançados cortados ou no glossário | cumpre | saíram duplex, quadros Ethernet, VLAN, 802.1X, port security, CMDB, NEXT, perda de retorno, mapa de fios, UTP, datasheet, 1000BASE-T/10GBASE-T na tabela, VPC, cross-connect; "diafonia" explicada em 1 frase |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample da casa em 100 Mbps (`Get-NetAdapter`, par azul/marrom, trocar o patch cord) mantido; analogia da instalação elétrica em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterpriseExample (etiqueta 2A-034) virou 1 parágrafo de identificação no Funcionamento; cloudExample removido |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 1) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saíram q1.6.2 (sobreposta à q1.6.8 e ao exemplo) e q1.6.4 (porta pública; dependia de 802.1X/port security e tinha distratores fracos); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 7 mantidos da v1; todos sobre conteúdo que ficou (diafonia agora explicada) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre (reescrito) | 4 passos: ver link e velocidade, padrão do patch cord pelo pino 1, seguir o caminho físico, trocar o patch cord e ver o link cair/voltar; 423 palavras; 20 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (patch cord trocado sem efeito → seguir o caminho; tomada da recepção); exercícios 2 (CRC com continuidade ok; canal de 99 m com 95 m horizontais); desafio da pequena empresa enxugado, com cálculo de PoE e ponto a 110 m |
| nextTheme 1–2 frases | cumpre | 2 frases, aponta a 1.7 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` lab/exercício), unlocks ["1.7"] e accessPolicy preservados; "20-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/challenge/solution; challenge sem constraints/gradingRubric |

Verificação do quiz contra a aula v2: q1.6.1 (definição) → definition-box do Conceito; q1.6.3 (mesmo padrão nas duas pontas) → item "Cabo direto"; q1.6.5 (patch panel) → passo 5 do caminho; q1.6.6 (AP reiniciando) → "PoE: energia pelo mesmo cabo" (orçamento estourado → reinicia) e "eletricamente equivalentes"; q1.6.7 (diferença A×B) → "T568A e T568B: o que muda de verdade"; q1.6.8 (par marrom rompido) → item "Por que os pares importam" + tabela de pinos. Gabaritos em 1,0,1,2,3,0.

## 2. O que saiu e por quê
- Motivação: cenário da empresa que cresceu reescrito como gancho concreto (rack sem etiqueta, puxar cabos); callout do SOC virou 1 frase de carreira.
- Problema: história dos "primeiros ambientes" condensada em 1 frase; tabela de 5 linhas "Sem…/O que acontece/O que o estruturado faz" (repetia Conceito, Funcionamento e erros comuns; trazia 802.1X, VLANs, port security).
- Conceito: "pinos 4, 5, 7 e 8 iguais" (redundante com a tabela); parêntese do crossover gigabit completo (caso raro, termo avançado).
- Funcionamento interno: lista de causas de link apagado (repetia o caminho); duplex, quadros Ethernet; UTP, reatores; 1000BASE-T/10GBASE-T na tabela; exemplo de PoE 3 APs + 6 câmeras (foi para a solução do desafio, trocado por outro exemplo); "confira no datasheet"; mapa de fios, NEXT, perda de retorno; erro comum "misturar A e B".
- Arquitetura inteira (repetia o caminho; tabela de decisões repetia PoE e porta pública).
- Analogia: hidráulica e "limite da analogia" (protocolos, VLANs, autenticação).
- enterpriseExample (virou parágrafo de identificação no Funcionamento, sem VLAN e 802.1X) e cloudExample (seção do template).
- security e troubleshooting (módulo 1), learningOutcomes.
- Quiz q1.6.2 e q1.6.4. Mentor "mais que crimpar" (reexplicava a ideia central). Exercícios ex1.6.1 (repetia q1.6.5 e o caminho) e ex1.6.5 (identificar T568A pelo pino 1: sobreposto ao passo 2 do lab, à q1.6.7 e à q1.6.3).
- Lab: passos 1, 2, 5, 6, 7, 8 da v1 (escolher ponto, hostname, Cisco IOS `show interfaces`, classificar risco, produzir inventário: ritual ou equipamento não ensinado) e todos os blocos invisíveis.
- Desafio: impressoras, 2 tarefas (controles de segurança detalhados, plano de rollback), restrições, rubrica, 3 respostas erradas comentadas.
- Glossário: 8 termos que a aula ensina.

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| 802.1X, port security, VLAN por função/visitante, VLAN restrita | prévia | 3.7, 3.9 |
| Duplex negociado | termo avançado | 3.1 |
| Quadros Ethernet encaminhados pelo switch | prévia | 3.2, 3.3 |
| Áreas da norma (área de trabalho, sala de telecomunicações) | repetição do caminho | — |
| Backbone entre racks/andares/prédios | reduzido a 1 frase ("ligação em fibra") | 1.5 |
| Crossover gigabit completo (azul e marrom também trocam) | caso raro / termo avançado | — |
| Mapa de fios; NEXT; perda de retorno | termo avançado ("diafonia" ficou, explicada) | — |
| Causas de link apagado (interface desabilitada, política bloqueando) | repetição / prévia | 1.9, 2.8 |
| Comandos `ipconfig /all`, `show interfaces status`, `show interfaces`, `show power inline` e árvore de decisão | seção removida (módulo 1) / Cisco IOS não ensinado | 1.8, 1.9, 2.8 |
| Vulnerabilidades (porta ativa, rastreabilidade, sabotagem no rack, PoE sem planejamento), boas/más práticas, monitoramento e detecção | seção removida (módulo 1); porta pública ficou como erro comum e PoE no Funcionamento | 3.9 |
| CMDB, controle de mudança, lacres, espelhamento físico de tráfego, sigilo de diagramas físicos | prévia / ritual | 3.9 |
| Inventário com VLAN, serviço e responsável | prévia (VLAN) | 3.7, 1.10 |
| Cloud: VPC abstrai o cabo; cross-connect, colocation, VLAN de transporte | exemplo por ambiente | 14.8 |
| Uso real/resumo "reduz troubleshooting, erro humano, indisponibilidade" | repetição | — |

## 4. Acréscimos
- Funcionamento interno: exemplo de orçamento PoE novo (120 W, 4 APs de 25 W, cabem 2 câmeras de 7 W e não 3), para não repetir o cálculo que foi para o desafio.
- Funcionamento interno: "diafonia (o sinal de um par vazando para o par vizinho)" — definição de 1 frase, porque o flashcard fc1.6.9 e o exercício ex1.6.2 dependem dela.
- Diagrama: rótulos dos patch cords, "até 90 m" e linha do canal de 100 m.
- Lab reescrito em 4 passos executáveis em casa (link/velocidade, pino 1, caminho, troca do patch cord).
- Mentor novo: patch cord da mesa trocado sem efeito → seguir o caminho em partes.
- Desafio: switch com 150 W e ponto do depósito a 110 m (dados para o aluno aplicar os dois limites).
- Glossário: Ethernet (3.1), Erro CRC (3.2), Switch (1.7), Access point (1.7).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.763 | 6.201 | 3.803 |
| Teoria (palavras) | 2.735 | 3.446 | 1.775 |
| Núcleo (min, fórmula v2) | 30 | 37,5 | 22,7 |
| Prática extra (min) | 105 | 105 | 51 (→ 50) |
| duration declarada | 80-115 min | 130-180 min | 20-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- Nenhum aviso de conteúdo. O único aviso da primeira rodada foi "análise ainda não escrita", resolvido por este arquivo.
- Palavras visíveis (3.803) ficaram acima da proporção da 0.1 (~metade da v1 seria ~3.100): a aula tem duas tabelas que são o mecanismo do tema (pinagem T568A/B e categorias) e um quiz de 502 palavras com opções longas; a teoria caiu de 3.446 para 1.775.

## 7. Revisão humana
- Glossário: "Erro CRC" aponta a 3.2 (campos do frame), enquanto a 1.5 v2 apontou CRC para a 3.1. Escolha uma das duas para o curso.
- Lab: comandos `Get-NetAdapter`/`ethtool` e as saídas "Disconnected" e "Link detected: no" não foram testados nesta sessão; em algumas distribuições `ethtool` precisa de sudo para mostrar tudo.
- Valor "até cerca de 13 mm" de destrançamento (TIA-568) e "10 Gbps em Cat6 até cerca de 55 m" mantidos da v1, não reconferidos.
- Quiz: q1.6.1 trocou o distrator "VLANs e regras de firewall" por "regras de firewall"; q1.6.6 trocou "Escopo DHCP da VLAN dos APs" por "Endereço IP configurado no AP" (VLAN/DHCP não são ensinados aqui). Ids mantidos.
- A segurança física (porta pública) ficou só como erro comum, mentor e desafio; a q1.6.4 saiu. Confirme se aceita a aula sem questão de segurança.
- references (TIA-568, IEEE 802.3, aula 1.5) e linksToOtherCourses mantidos da v1.

```json
{
  "id": "1.6", "modulo": "m01", "titulo": "Cabeamento estruturado e padrões RJ-45", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "security", "troubleshooting"],
  "conceitos_removidos": 14,
  "acrescimos": ["Funcionamento: novo exemplo de orçamento PoE (120 W)", "Funcionamento: definição de diafonia em 1 frase", "Diagrama: rótulos dos patch cords e do canal de 100 m", "Lab reescrito em 4 passos", "Mentor: patch cord trocado sem efeito", "Desafio: 150 W de PoE e ponto a 110 m", "Glossário: Ethernet, Erro CRC, Switch, Access point"],
  "palavras_visiveis": { "original": 4763, "v1": 6201, "v2": 3803 },
  "nucleo_min": { "original": 30, "v1": 37.5, "v2": 22.7 }, "pratica_extra_min": { "original": 105, "v1": 105, "v2": 50 },
  "duration_v2": "20-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O caminho do ponto virou uma lista única com a identificação logo em seguida, sem a Arquitetura e a tabela do Problema que repetiam o mesmo caminho, e o lab passou a mostrar o link e a velocidade reais do aluno.",
  "revisao_humana": ["CRC → 3.2 aqui e 3.1 na 1.5", "Comandos e saídas do lab não testados", "13 mm e 55 m mantidos da v1 sem reconferir", "Distratores de q1.6.1 e q1.6.6 ajustados", "Sem questão de segurança física (q1.6.4 saiu)", "references/linksToOtherCourses mantidos"]
}
```
