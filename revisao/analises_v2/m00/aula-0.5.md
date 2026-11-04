# Aula 0.5 — Como sinais físicos carregam dados (v2)
Base: v1 · Tipo: fundamental · Módulo: m00 (Fundamentos da Computação)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: bits → sinal → bits e por que ruído/atenuação causam erro; cobre × fibra × rádio (inclui meio compartilhado); verificar status, velocidade negociada e sinal e separar link ausente de degradado. Saíram "equipamentos Cisco" e "conectar com segurança, cloud, DevSecOps" |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 143 palavras; gancho: Wi‑Fi bom ao lado do roteador e ruim no quarto do fundo; consequência: culpar internet/site/computador; carreira em 1 frase (trocar um cabo em minutos × horas revendo configuração) |
| Resumo 4–5 itens + frase final | cumpre | 5 itens + frase; 90 palavras |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 3: Placa de rede (1.7), CRC (3.2), Canal Wi‑Fi (12.2) |
| Problema 80–150, sem repetir o gancho | cumpre | 133 palavras; retoma com "é isso que acontece quando o sinal chega fraco ou misturado com ruído", liga à decisão 0/1 da aula 0.1 e diz o que a aula resolve |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | cadeia bits → sinal → atenuação/ruído → decisão → CRC só no Funcionamento interno + diagrama |
| Arquitetura só se acrescenta | removida | host/acesso/distribuição/borda/cloud: prévia do módulo 1 (1.4, 1.6, 1.7) e de cloud |
| Diagrama mantido/corrigido | mantido | SVG intacto; legenda encurtada para 1 frase |
| Erros comuns ≤3, sem repetição | cumpre | 3 (ignorar velocidade negociada; concluir sobre Wi‑Fi com um teste só; culpar a camada física sem evidência), movidos do Problema para o fim do Funcionamento interno |
| Termos avançados cortados ou no glossário | cumpre | saíram transceiver, DAC, OFDM, MIMO, duplex/late collisions, FCS, patch panel, OTDR, analisador de espectro, site survey, 802.1X, NAC, rogue AP, flapping, Cisco IOS |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample = cabo velho que derruba o link de 1 Gbps para 100 Mbps, com a conta do download de 1 GB (8 s → 80 s); analogia da lanterna em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterprise, cloud e devsecops removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 0) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6; saiu fc0.5.4 (erro físico em switch); entrou fc0.5.9 (ausente × degradado) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | cumpre | 4 passos: status/velocidade, sinal Wi‑Fi perto, sinal Wi‑Fi longe, link ausente ao desconectar o cabo; 417 palavras; 20 min |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre (aviso) | mentor 2 (fibra entre prédios; cabo junto do motor do elevador), exercícios 2 (NO-CARRIER × 100Mb/s; divisão do canal Wi‑Fi), desafio da sala de treinamento simplificado |
| nextTheme 1–2 frases | cumpre | 1 frase (0.6), mantido da v1 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}` (saiu o `oneOf` lab/exercício), unlocks/accessPolicy preservados; "15-25 min + 50 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | lab sem scenario/topology/architecture/cost/safetyNotes/validation/troubleshooting/improvements/evidenceToCollect/questions/challenge/solution; challenge sem constraints/gradingRubric |

Verificação do quiz contra a aula v2: q0.5.1 (o que a camada física faz) → Conceito, parágrafo da camada física; q0.5.2 (fibra = luz, sem interferência elétrica) → tabela dos três meios; q0.5.3 (1 Gbps → 100 Mbps) → Funcionamento interno (velocidade negociada + tabela) e Exemplo; q0.5.5 (Wi‑Fi cai longe do roteador) → passos de atenuação/ruído + tabela; q0.5.8 (muitos notebooks no mesmo canal) → parágrafo "meio compartilhado" do Conceito; q0.5.9 (sinal fraco com ruído → bits errados, bloco descartado) → passos Recepção e Verificação. Gabaritos em 1, 2, 0, 1, 0, 3.

## 2. O que saiu e por quê
- Motivação: frase "bits, bytes, hexadecimal… são representações abstratas" (repetia o Conceito), lista de 11 causas físicas (transceiver, duplex, crimpagem: termos avançados), callout do "problema real" corporativo com DNS/firewall/switch (trocado por gancho doméstico) e o parágrafo de segurança física (seção de segurança removida no módulo 0).
- Problema: lista de 5 cenários (sem sinal, sinal fraco, interferência, meio compartilhado, instalação ruim), que repetia o Funcionamento interno; resistência/capacitância/reflexão (termos avançados); callout de 5 erros comuns (reduzido a 3 e movido).
- Conceito: lista do que a camada física define (frequência, potência, sincronização, modo de operação); coluna "Evolução técnica" da tabela (OFDM, MIMO, monomodo/multimodo: prévia 12.3/1.5); frase do telégrafo; parágrafo de datacenter (DAC, tráfego leste‑oeste: termo avançado/prévia).
- Funcionamento interno: passo "serialização" (fundido na conversão em sinal); "modulação, temporização, símbolos"; FCS/checksums/TCP (prévia 3.2/6.x; ficou o CRC, no glossário); linhas da tabela com Cisco IOS, duplex/late collisions, CRC/input errors no switch e flapping; callout "Limite do que você vê" (OTDR, analisador de espectro, site survey).
- Arquitetura inteira (prévia do módulo 1 e de cloud).
- Analogia: "limite da analogia" (múltiplos níveis, frequências, símbolos).
- simpleExample: parte do Wi‑Fi em outro cômodo (virou o gancho da Motivação).
- enterpriseExample, cloudExample, devsecopsExample (seção do template).
- security e troubleshooting (módulo 0).
- learningOutcomes (seção do template).
- Lab: passo 2 (ipconfig /all: IP, gateway e DNS não são deste tema), passo 6 (ping ao gateway: gateway e ping vêm na 1.9), passo 7 ("registrar evidências": ritual), passos Windows/Linux fundidos; scenario, topology, architecture, cost, safetyNotes, validation, troubleshooting, improvements, evidenceToCollect, questions, challenge/solution do lab.
- Quiz: q0.5.4 (tomada em área pública: segurança, seção removida), q0.5.6 (cloud: exemplo por ambiente), q0.5.7 (CRC/input errors em switch com Cisco: prévia 15.3/3.x).
- Flashcards: fc0.5.4 (erros físicos em switch).
- Mentor: "por que não basta dizer que redes transportam bits" (reexplica a ideia central), "IP e gateway corretos, perda intermitente" (sobreposição com o desafio), "tomadas em sala de reunião" (segurança).
- Exercícios: ex0.5.1 (reexplicar a ideia central), ex0.5.2 (lista de hipóteses: sobreposição com o desafio, com transceiver/patch panel), ex0.5.4 (comparar os três meios: repete a tabela).
- Desafio: constraints, gradingRubric, entregáveis corporativos (resumo executivo), tarefas de mitigação e de controles de segurança; a solução perdeu switch/AP/uplink/VLAN/firewall.
- Glossário: Camada física (definida no Conceito), Atenuação, Interferência e Velocidade negociada (a aula explica), Transceiver, Rogue AP e Duplex (não são mais citados).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Duplex, half/full, late collisions | termo avançado / prévia | 1.6, 15.3 |
| Contadores CRC/input errors e comandos `show interfaces` (Cisco IOS) | prévia (equipamento não ensinado) | 15.3 |
| Transceiver, SFP, DAC, uplink | termo avançado / prévia | 1.5, 1.7 |
| Patch panel, rack, cabeamento estruturado, crimpagem | prévia | 1.6 |
| OFDM, MIMO, modulação, bandas 2,4/5/6 GHz | prévia | 12.2, 12.3 |
| Fibra monomodo × multimodo, lasers/LEDs | prévia | 1.5, 2.3 |
| Resistência, capacitância, reflexão, sincronização, codificação de linha | termo avançado | 2.3 |
| FCS e checksums; retransmissão pelo TCP ou pelo próprio Wi‑Fi | prévia (fica "algum protocolo pede o reenvio") | 3.2, 6.x |
| Instrumentos profissionais (certificador, OTDR, analisador de espectro, site survey) | termo avançado | 1.6, 12.9 |
| Flapping (link alternando up/down) | termo avançado (fica "quedas curtas") | 15.3 |
| Velocidade de link ≠ throughput | já ensinado na 0.4; aprofundado na 0.6 | 0.4, 0.6 |
| Camada física no host/acesso/distribuição/borda/cloud | prévia | 1.4, 1.7, 14.1 |
| Camada física abstraída em cloud (limites de instância, NIC virtual, zonas) | exemplo por ambiente | 14.1, 14.2 |
| Runners, registry, Kubernetes, Direct Connect/ExpressRoute, SD‑WAN | exemplo por ambiente | 10.x, 14.x |
| Segurança física: portas expostas, racks, rogue AP, 802.1X, NAC, port security, monitoramento de MACs | seção removida (módulo 0) | 1.6, 3.9, 12.8, 12.5 |
| Árvore de decisão de troubleshooting físico e `ipconfig /all` | seção removida (módulo 0) / prévia | 1.9, 2.8, 15.3 |
| Ping ao gateway para comparar cabo e Wi‑Fi | prévia | 1.9 |
| Telégrafo e telefone como precursores | história (fora do padrão) | — |

## 4. Acréscimos
- Conceito: "cobre até cerca de 100 m por cabo" e "fibra de centenas de metros a quilômetros" na tabela (o Resumo e o mentor 1 dependem disso; a v1 dizia só "limite de distância").
- Conceito: parágrafo sobre meio compartilhado (cada computador tem o seu fio × todos no mesmo canal se revezam). Sustenta a q0.5.8 e o desafio; na v1 o termo aparecia sem explicação.
- Funcionamento interno: definição de velocidade negociada em 1 frase (o quiz, o lab e o exemplo dependem dela; na v1 só o glossário a definia).
- simpleExample: 1 Gbps no cobre usa os 4 pares e 100 Mbps usa 2, e a conta do download de 1 GB (8 s → 80 s), ligando com a 0.4.
- Lab: passo 3 (repetir a medida de Wi‑Fi longe do roteador) e passo 4 (desconectar o próprio cabo e ver o link ausente).
- Quiz q0.5.9 (sinal fraco → bits errados → bloco descartado), no lugar das questões removidas, sobre o mecanismo central.
- Flashcard fc0.5.9 (ausente × degradado). Mentor novo: fibra entre prédios; cabo junto do motor do elevador. Exercício novo ex0.5.6 (divisão do canal Wi‑Fi, com conversão para MB/s como na 0.4).
- Glossário: Placa de rede (1.7), CRC (3.2), Canal Wi‑Fi (12.2).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 5.589 | 5.716 | 3.483 |
| Teoria (palavras) | 3.305 | 3.115 | 1.462 |
| Núcleo (min, fórmula v2) | 34,4 | 35,0 | 20,2 |
| Prática extra (min) | 80 | 85 | 51 (→ 50) |
| duration declarada | 70-100 min | 110-155 min | 15-25 min + 50 min de prática extra |

## 6. Avisos do validar e justificativas
- "prática extra com 772 palavras (~750 no total)": por bloco ficou mentor 241, exercícios 221, desafio + solução 310. Cada item aplica algo que a aula não resolve pronto (escolher meio pela distância, explicar interferência num caso, interpretar duas saídas de comando, dividir a capacidade do canal, isolar a causa por comparação de meios). 22 palavras acima do total não justificam cortar um item.
- "análise ainda não escrita": resolvido por este arquivo.

## 7. Revisão humana
- simpleExample: "1 Gbps no cobre usa os 4 pares; 100 Mbps usa 2; com um par ruim o link pode subir em 100 Mbps". É o comportamento de 1000BASE-T/100BASE-TX e do recuo automático de velocidade de muitas placas, mas nem toda placa recua (algumas simplesmente não sobem o link). O texto diz "pode"; confirme o nível de detalhe.
- Lab, comandos não testados nesta revisão: no Linux, a coluna RATE do `nmcli dev wifi list` é a taxa máxima anunciada, não a atual, por isso o passo 3 manda comparar SIGNAL; no Windows em português, os rótulos do `netsh wlan show interfaces` aparecem traduzidos (Sinal, Canal, Taxa de recepção).
- Exercício ex0.5.6 (300 Mbps ÷ 10 = 30 Mbps) é uma simplificação (divisão igual, sem custo de disputa), avisada na resposta ("na prática, um pouco menos").
- q0.5.1 ainda usa o termo "camada física", que o Conceito define em 1 frase e aponta para a 0.8; não entrou no glossário (mesma decisão do "Protocolo" na 0.1).
- O subtitle e as tags mantidos da v1 ainda citam "disponibilidade e segurança" e "segurança", embora a seção de segurança tenha saído.
- references (IEEE 802.3 e 802.11 com url vazia, internas 0.4 e Módulo 12) e linksToOtherCourses (Infra/DevSecOps e IAM, 802.1X/NAC) mantidos como na v1; o link de IAM fala de 802.1X/NAC, que não está mais na aula.

```json
{
  "id": "0.5", "modulo": "m00", "titulo": "Como sinais físicos carregam dados", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "devsecopsExample", "security", "troubleshooting"],
  "conceitos_removidos": 18,
  "acrescimos": ["Conceito: distâncias de cobre (~100 m) e fibra", "Conceito: parágrafo sobre meio compartilhado", "Funcionamento interno: definição de velocidade negociada", "Exemplo: 4 pares × 2 pares e conta do download de 1 GB", "Lab: medir Wi-Fi longe do roteador e ver link ausente", "Quiz q0.5.9 (ruído → bloco descartado)", "Flashcard fc0.5.9", "Mentor: fibra entre prédios; cabo junto do motor", "Exercício ex0.5.6 (divisão do canal Wi-Fi)", "Glossário: Placa de rede, CRC, Canal"],
  "palavras_visiveis": { "original": 5589, "v1": 5716, "v2": 3483 },
  "nucleo_min": { "original": 34.4, "v1": 35.0, "v2": 20.2 }, "pratica_extra_min": { "original": 80, "v1": 85, "v2": 50 },
  "duration_v2": "15-25 min + 50 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "mantido",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Funcionamento interno agora segue um único caminho (sinal → atenuação/ruído → decisão → CRC) e termina na diferença entre link ausente e degradado, com uma tabela só do que o aluno vê no próprio computador, sem Cisco, duplex nem transceivers.",
  "revisao_humana": ["Detalhe 4 pares/2 pares e recuo para 100 Mbps no exemplo", "Comandos do lab não testados (RATE do nmcli; rótulos do netsh traduzidos)", "Simplificação da divisão do canal no ex0.5.6", "'Camada física' fora do glossário (definida no Conceito, aponta 0.8)", "subtitle/tags ainda citam segurança", "references/linksToOtherCourses mantidos da v1 (IAM cita 802.1X/NAC)"]
}
```
