# Aula 1.5 — Meios de transmissão: cobre, fibra e rádio (v2)
Base: v1 · Tipo: fundamental · Módulo: m01 (Fundamentos de Redes)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: diferenciar os meios (sinal, alcance, custo, uso); explicar como atenuação/ruído/interferência/meio compartilhado viram erros CRC, velocidade menor, reenvios e quedas; escolher o meio para um caso simples e reconhecer sintoma físico. Saiu o objetivo "planejar para casa, empresa, datacenter, campus e cloud" (lista de áreas) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes removido por `ajustar regras`; history/evolution já não existiam na v1 |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 139 palavras; filial com quedas, todos culpam sistema/ataque/operadora, era um cabo amassado; consequência = dias perdidos no lugar errado; carreira em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 85 palavras, 5 itens + frase padrão |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 4: Quadro (2.4), CRC (3.1), PoE (1.6), SNR (12.2). Citados em 1 frase e aprofundados nessas aulas (mesmo critério da 0.1). Saíram Meio de transmissão, Atenuação, Interferência, Transceptor (a aula ensina) |
| Problema 80–150, sem repetir o gancho | cumpre | 131 palavras; "é isso que acontece quando se esquece que toda rede depende de um sinal chegando bem"; liga à 0.5; história em 1 frase (cobre no acesso, fibra nas ligações longas, rádio na mobilidade) |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | mecanismo no Funcionamento interno (ciclo, 4 pares × 2 pares, CRC, tabela de fenômenos) + diagrama; Conceito traz a comparação |
| Arquitetura só se acrescenta | removida | camadas acesso/distribuição/core/datacenter/campus/cloud eram prévia; a convivência dos três meios num caminho já está no diagrama e no Exemplo simples |
| Diagrama mantido/corrigido | mantido (rótulos ajustados) | os subtítulos punham o meio dentro dos nós ("Cobre + PoE" no AP, "Fibra" no core); agora os nós dizem o papel e os enlaces levam os rótulos "rádio", "cobre", "fibra"; `desc` reescrita |
| Erros comuns ≤3, sem repetição | cumpre | 3: luz acesa ≠ link saudável; Wi‑Fi como cabo invisível; link ativo ≠ acesso autorizado. Saiu "fibra só por ser mais rápida" (vai para o mentor e o desafio) |
| Termos avançados cortados ou no glossário | cumpre | saíram duplex, flaps, jitter, orçamento/potência óptica, DOM, site survey, análise de espectro, NAC/802.1X, VLAN de quarentena, port-security, spine-leaf, VPC, Direct Connect |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | simpleExample da casa (rádio → cobre → fibra; Wi‑Fi do quarto × cabo) com `Get-NetAdapter`/`netsh wlan show interfaces`; analogia em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | enterpriseExample e cloudExample removidos |
| Segurança / Troubleshooting (3.5) | cumpre | removidos (módulo 1) |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; saiu q1.5.6 (cloud); quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 7; fc1.5.6 sem NAC/802.1X; fc1.5.1 e fc1.5.7 reescritos |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não se aplica | não havia lab; a observação prática virou o exercício ex1.5.5 |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2 (177 palavras), exercícios 2 (180), desafio + solução 258 |
| nextTheme 1–2 frases | cumpre | 1 frase, aponta a 1.6 |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}`, unlocks ["1.6"] e accessPolicy preservados; "15-25 min + 30 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | nenhum (base v1); `longDefinition` opcional tirado do glossário por tamanho |

Verificação do quiz contra a aula v2: q1.5.1 (tipo de sinal) → definição do Conceito; q1.5.2 (erros CRC) → Funcionamento interno, "Validação", + glossário; q1.5.3 (vantagem da fibra) → tabela do Conceito (alcance, interferência elétrica; transceptor, curvas e custo por ponto refutam os distratores); q1.5.4 (portas expostas) → 3º erro comum; q1.5.5 (Wi‑Fi não é cabo invisível) → 2º erro comum + linha "Meio compartilhado"; q1.5.7 (cabo de 130 m) → "canal Ethernet de até 100 m" + atenuação. Gabaritos em 1,2,0,3,1,3.

## 2. O que saiu e por quê
- Motivação: lista "antes do IP, do TCP, do TLS e do login" e a frase "redes não transportam conceitos abstratos" (repetiam o Problema/0.5); o caso da VPN/SOC/CRC foi reescrito sem VPN, SOC e CRC (termos não explicados naquele ponto).
- Problema: coaxial em barramento, lista de rádios (Bluetooth, 4G/5G, enlaces ponto a ponto, IoT) e a lista "sem entender cobre/fibra/rádio/segurança" (repetia o Conceito e os erros comuns).
- Conceito: linha "Custo" e "Evite quando" da tabela (fundidas em Vantagens/Limitações); jitter, renegociação; orçamento óptico, site survey; erro comum "fibra só por ser mais rápida" (vai para mentor e desafio) e NAC/802.1X/inventário (prévia 3.9).
- Funcionamento interno: frase do trançamento/blindagem, reflexões; "TCP retransmite, TLS demora, HTTP parece lento" (virou "os dados precisam ser reenviados"); certificação de cabos e análise de espectro (prévia 1.6 / 12.2).
- Arquitetura inteira (prévia de desenho de campus/datacenter/cloud; redundância com rotas distintas já vista na 1.4).
- Analogia: "limite da analogia" e "terceiros escutando".
- enterpriseExample (evidências de troubleshooting com duplex, input errors, potência óptica) e cloudExample (VPC, Direct Connect, ExpressRoute, multi-região): seção do template / prévia 14.8.
- security e troubleshooting (módulo 1), learningOutcomes.
- Quiz q1.5.6 (cloud). Mentor "por que não basta dizer que a rede está configurada" (reexplicava a ideia central). Exercícios ex1.5.1 (escolher meios numa rede pequena: é o desafio) e ex1.5.3 (controles de acesso físico: repete q1.5.4 e era conteúdo de `security`) e ex1.5.4 (redundância do enlace entre prédios: tema da 1.4 e sobreposto ao mentor). Rubrica do desafio, 1 tarefa e 2 restrições.
- Glossário: Meio de transmissão, Atenuação, Interferência, Transceptor (a aula ensina).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Coaxial compartilhado em barramento nas primeiras LANs | history condensada | 1.4 (barramento) |
| Outros rádios: Bluetooth, 4G/5G, enlaces ponto a ponto, IoT | prévia | 12.1 |
| Orçamento óptico, potência óptica Tx/Rx, DOM, `show interfaces transceiver` | termo avançado / prévia | 2.3 |
| Duplex, flaps, histórico de flaps, input errors | termo avançado | 2.3, 3.1 |
| Jitter como efeito do meio | prévia | 1.8 |
| Site survey, potência de AP, análise de espectro, densidade, roaming | prévia | 12.2, 12.6 |
| Certificação de cabos, etiquetagem e documentação física | prévia | 1.6 |
| NAC/802.1X, VLAN de quarentena, port-security | prévia | 3.9, 12.5 |
| WPA2/WPA3-Enterprise, rotação de credenciais, Wi‑Fi além do perímetro como vulnerabilidade | prévia (seção removida) | 12.5, 12.8 |
| Rede de visitantes isolada / movimento lateral | prévia (o "visitantes em rede separada" segue no desafio) | 12.7, 13.2 |
| Monitoramento/detecção: AP rogue, MAC × inventário, porta ativa fora do expediente | seção removida (módulo 1) | 12.8, 3.9 |
| Meio único como ponto único de falha; redundância com rotas físicas distintas | já visto / prévia | 1.4, 14.8 |
| Camadas acesso/distribuição/core, datacenter, campus, spine-leaf | prévia | 1.4 (spine-leaf), 3.x |
| Cloud: VPC abstrai a física, Direct Connect, ExpressRoute, multi-região | prévia / exemplo por ambiente | 14.8 |
| Comandos Cisco IOS (`show interfaces status`, `counters errors`) e árvore de decisão | seção removida (módulo 1) | 1.8, 2.4 |
| TCP retransmite / TLS demora (cadeia de sintomas por protocolo) | termo avançado (simplificado) | 6.4 |

## 4. Acréscimos
- Funcionamento interno: definição de "velocidade negociada" em 1 frase e "cada quadro leva um código de verificação, o CRC" (o quiz q1.5.2, o exercício ex1.5.2 e o objetivo 2 dependem disso; na v1 o CRC só era citado).
- Exemplo simples: os comandos `Get-NetAdapter` e `netsh wlan show interfaces` (vindos do troubleshooting removido) para o aluno ver a diferença cabo × Wi‑Fi.
- Exercício novo ex1.5.5: medir a velocidade do link / sinal do Wi‑Fi na própria máquina e repetir longe do roteador (comandos do troubleshooting da v1).
- Mentor: a pergunta dos dois prédios ganhou números (300 m vs. 100 m) e o caso de "fibra é exagero".
- Desafio: segundo prédio a 250 m (força a fibra pelo limite de 100 m) e verificação de cada meio.
- Glossário: Quadro → 2.4.
- Diagrama: rótulos "rádio", "cobre" e "fibra" nos enlaces.

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 3.693 | 4.089 | 2.779 |
| Teoria (palavras) | 2.509 | 2.583 | 1.351 |
| Núcleo (min, fórmula v2) | 28,3 | 29,9 | 19,4 |
| Prática extra (min) | 45 | 45 | 31 (→ 30) |
| duration declarada | 75-110 min | 70-100 min | 15-25 min + 30 min de prática extra |

## 6. Avisos do validar e justificativas
- Nenhum aviso de conteúdo. O único aviso ("análise ainda não escrita") é resolvido por este arquivo.

## 7. Revisão humana
- Diagrama: subtítulos dos nós trocados (cliente sem fio / recebe energia (PoE) / acesso / ligação principal) e rótulos de meio acrescentados nos enlaces; confira o encaixe visual do rótulo "rádio" (x=245, y=185) abaixo da curva.
- Palavras visíveis caíram 32% em relação à v1 (alvo ~50%): a v1 desta aula não tinha lab e o que sobra é sobretudo quiz (489) e flashcards (180); a teoria caiu 48%.
- q1.5.4 trocou a opção correta "Desativar portas não usadas e usar NAC/802.1X" por "Desativar as portas que não estão em uso e proteger racks e salas técnicas" (NAC/802.1X saiu do texto). Id mantido.
- Afirmação "a fibra isola eletricamente as duas pontas" (veio da v1, "isolamento elétrico"): vale para fibra sem elementos metálicos; cabos com armadura metálica são exceção não citada.
- Exercício ex1.5.5: `ethtool` e `iw` podem exigir instalação ou sudo em algumas distribuições; comandos não testados em Windows nesta sessão.
- references e linksToOtherCourses mantidos da v1.

```json
{
  "id": "1.5", "modulo": "m01", "titulo": "Meios de transmissão: cobre, fibra e rádio", "status": "CONCLUIDA", "base": "v1",
  "secoes_removidas": ["learningOutcomes", "architecture", "enterpriseExample", "cloudExample", "security", "troubleshooting"],
  "conceitos_removidos": 16,
  "acrescimos": ["Funcionamento interno: velocidade negociada e CRC explicados em 1 frase", "Exemplo simples: Get-NetAdapter e netsh wlan show interfaces", "Exercício ex1.5.5: medir link/sinal na própria máquina", "Mentor dos dois prédios com 300 m vs 100 m", "Desafio: segundo prédio a 250 m e verificação por meio", "Glossário: Quadro → 2.4", "Diagrama: rótulos de meio nos enlaces"],
  "palavras_visiveis": { "original": 3693, "v1": 4089, "v2": 2779 },
  "nucleo_min": { "original": 28.3, "v1": 29.9, "v2": 19.4 }, "pratica_extra_min": { "original": 45, "v1": 45, "v2": 30 },
  "duration_v2": "15-25 min + 30 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "O Funcionamento interno agora explica velocidade negociada (4 pares × 2 pares) e CRC em frases curtas, sem a cadeia TCP/TLS/HTTP nem prévias de arquitetura e cloud.",
  "revisao_humana": ["Rótulos do diagrama ajustados; conferir encaixe do rótulo 'rádio'", "Redução de 32% nas palavras visíveis (teoria -48%)", "Opção correta da q1.5.4 sem NAC/802.1X", "Isolamento elétrico da fibra sem a exceção de cabos com armadura metálica", "ethtool/iw podem exigir instalação ou sudo; comandos não testados no Windows", "references/linksToOtherCourses mantidos da v1"]
}
```

## 8. Correções após o revisor independente
- Glossário: no termo CRC, `relatedLessons` passou de ["3.1"] para ["3.2"] (Frame Ethernet e endereço MAC, onde o campo de verificação do quadro é ensinado).
- Mentor: a pergunta 2 (dois prédios a 300 m → fibra) repetia o desafio. Agora: "Uma câmera precisa ficar a 130 m do switch, em área externa: quais são as opções e o que você escolheria?". Hints, expectedIdeas e explanation usam só o que a aula ensina: canal de cobre até 100 m e atenuação; fibra (alcance, transceptor, sem interferência elétrica, isolamento elétrico); switch intermediário para que cada trecho de cobre fique abaixo de 100 m; enlace de rádio quando não dá para passar cabo (obstáculos e interferência); energia da câmera por PoE. Escolha indicada: fibra em área externa; rádio quando cabo for inviável. Complementa a q1.5.7 (cabo de 130 m que cai e volta) sem repeti-la: a questão diagnostica, o mentor pede a solução.
- Funcionamento interno, item Validação: "o quadro é descartado e precisa ser reenviado" virou "o quadro é descartado. A Ethernet não reenvia nada: quem percebe a falta e reenvia os dados é uma camada de cima (no Wi‑Fi, o próprio rádio também retransmite o quadro)".
- Métricas após o fechamento: visíveis 2.938, teoria 1.375, núcleo 19,6 min, prática extra 750 palavras (31 min); duration inalterada ("15-25 min + 30 min de prática extra", estimatedStudyTimeMinutes 25), por isso a tabela 5 e o JSON não mudaram. validar: ok, sem erros e sem avisos.

