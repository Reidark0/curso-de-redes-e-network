# Revisão v2 — padrão único para todas as aulas

Você vai reaplicar a revisão do curso **inteiro** (190 aulas) seguindo um padrão novo, definido pelo dono do curso numa análise crítica da aula 0.1. Isso vale para as aulas que já foram revisadas na primeira passada (v1) e para as que ainda não foram. Trabalhe sozinho, sem parar para perguntas. Na dúvida, siga a **aula de referência 0.1** (Apêndice A) e registre a decisão em `revisao/DECISOES.md`.

Ordem de prioridade: **qualidade do que fica > seguir o padrão > cobrir todas as aulas > velocidade.**

---

## 1. Por que existe uma v2

A primeira passada (v1, guiada por `revisao/CRITERIOS.md`) corrigiu erros técnicos e o bug do quiz, mas fez as aulas **crescerem** (+1% a +11% de palavras visíveis por módulo). As causas, que este padrão corrige:

1. **Objetivos e "resultados de aprendizagem" foram tratados como contrato.** Para "cobri-los", a v1 acrescentou conteúdo (ex.: na 0.1, a tabela de 5 transformações e o parágrafo de IPv4/MAC).
2. **Prévias de módulos futuros dentro de aulas de fundamentos** (campos de protocolos, tabela que é o Modelo OSI, MAC criptográfico, flow logs, Kubernetes…).
3. **A mesma ideia central aparece até 6 vezes** (Motivação, Problema, Funcionamento, Arquitetura, Resumo, Desafio).
4. **Seções obrigatórias pelo template** mesmo quando o tema não pede (História, Evolução, 4 exemplos por ambiente, Segurança e Troubleshooting estruturados).
5. **Termos avançados citados à toa:** na 0.1 eram 47 termos técnicos (SIEM, OIDC, VPC, ASN.1, blob…).

**Regra de ouro da v2:** a aula existe para ensinar o seu tema a quem está **naquele ponto do curso**, no menor tempo, sem perder o que o tema exige. Nunca acrescente conteúdo para "cumprir" um objetivo, um campo ou uma seção. Só acrescente para fechar uma lacuna real do próprio tema e, nesse caso, registre na análise.

Continuam valendo da v1: preservar identidades (`id`, `moduleId`, `order`, nome da constante, `unlocks`, `lab.id` quando o lab ficar, `id` das questões existentes), não inventar fatos, comandos ou referências, não alterar arquivos originais, uma aula por vez com progresso em disco e commit + push após cada aula.

---

## 2. Preparação (uma vez)

1. **Branch.** O trabalho da v1 está no branch `claude/focused-pascal-00emu4`. Se o branch atual não tiver a pasta `revisao/`, faça `git fetch origin claude/focused-pascal-00emu4` e um merge dele no branch atual. Trabalhe e faça push sempre no branch atual. Sem force push e sem push na `main`.
2. **Garanta que nenhuma outra sessão está escrevendo no repositório.** Se o último commit do branch da v1 tiver menos de 15 minutos, espere 15 minutos e confira de novo antes de começar.
3. **Guarde a v1** sem apagar nada:
   - copie `aulas novas/` para `revisao/v1/aulas/`;
   - renomeie `revisao/CRITERIOS.md` para `revisao/CRITERIOS_V1.md`;
   - mantenha `revisao/analises/` como está; as análises da v2 vão em `revisao/analises_v2/`.
4. Salve este prompt em `revisao/PADRAO_V2.md`. Crie `revisao/CRITERIOS_V2.md` com as seções 3 a 8 e o Apêndice A.
5. Em `revisao/PROGRESSO.md`, acrescente uma coluna **V2** com status `PENDENTE` para as 190 aulas, mais as colunas de palavras e duração original → v1 → v2.
6. **Reaproveite as ferramentas** de `revisao/tools/` e atualize-as:
   - `extrair`: ganha a opção de base, `v1` (usa `revisao/v1/aulas/` quando existir) ou `original`;
   - `metricas`: passa a usar a fórmula da seção 6;
   - `validar`: passa a usar as checagens da seção 7;
   - `montar` e `build_single`: continuam lendo e gravando em `aulas novas/`.
7. Faça as **mudanças no app** da seção 5 antes do loop, e teste-as.

---

## 3. O padrão da aula (na ordem em que o app mostra)

**Base de cada aula:** se existe uma versão v1, parta dela, porque ela já tem correções técnicas conferidas, o quiz consertado e os valores verificados. Consulte o original só para recuperar algo que a v1 tenha perdido. Se não existe v1, parta do original e aplique também as correções de bugs que a v1 fazia (formato do quiz, campos invisíveis, conforme `CRITERIOS_V1.md`).

### 3.1 Introdução
- **Objetivos:** 2–3 por aula, mensuráveis e sobre o tema **desta** aula. Não entram:
  - listas de áreas ("conectar com redes, logs, cloud, DevSecOps…"): a ligação com a carreira vai para a Motivação;
  - prévias da próxima aula: vão para o `nextTheme`;
  - atividades ("executar um laboratório").
- **Resultados de aprendizagem:** remova o campo `learningOutcomes`. Situações boas no formato "Dado X…" podem virar perguntas do modo mentor ou exercícios.
- **Motivação** (100–150 palavras): um gancho que o aluno já viveu ou consegue imaginar **neste ponto do curso**, ou um cenário que termina mostrando a consequência (o que dá errado sem esse conhecimento). Sem listas de siglas de temas futuros. A ligação com segurança e cloud, quando houver, fica aqui em 1 frase.
- **Resumo** (4–5 itens de uma linha, ~70 palavras, sem listas de termos soltos). Ele aparece no topo da aula e serve de consulta rápida quando o aluno volta. Termina **sempre** com a frase exata:
  > *Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.*
- **Glossário:** no máximo 5 termos, só os **citados e não explicados** nesta aula. Cada um usa `relatedLessons` para apontar a aula que o explica, quando ela existir. Os conceitos que a própria aula ensina não entram. Sem termos assim, remova o campo.

### 3.2 Contexto
- **História e Evolução** não são seções: remova `content.history` e `content.evolution`. Quando ajudarem a explicar por que a tecnologia é como é, viram no máximo 1–2 frases dentro do Problema.
- **Problema:** sempre pequeno (80–150 palavras). Amarra-se ao gancho da Motivação sem repetir a mesma ideia ("é isso que acontece quando…") e diz o que a aula resolve de novo.

### 3.3 Conteúdo (Conceito, Funcionamento interno, Arquitetura e Diagrama)
- Mantenha o mecanismo central do tema e corte **prévias de módulos futuros**. Quando cortar uma prévia, aponte na análise a aula que a cobre (você pode consultar os títulos e objetivos de outras aulas para isso).
- A ideia ou cadeia central aparece **uma vez em texto e uma vez no diagrama**, e não de novo na Motivação, no Resumo, na Arquitetura e no Desafio.
- **Arquitetura** só existe se mostra algo que o Funcionamento interno não mostra. Se não, remova.
- **Diagrama:** mantenha e corrija se estiver errado.
- **Callout "Erros comuns":** no máximo 3 itens, só erros sobre **este** conteúdo que não estejam repetidos em outro lugar da aula.
- **Termos avançados:** evite sempre que possível. Um termo que não é explicado na aula e não é necessário para entendê-la sai do texto. Se for necessário, vai para o glossário. Se o glossário passar de 5 termos, o sinal é cortar termos do texto.

### 3.4 Exemplos
- **Um bom exemplo** (`simpleExample`) que deixe a ideia clara: concreto, com valores reais e escrito para quem está neste ponto do curso. Pode ser um caso profissional, desde que seja simples.
- **Analogia:** opcional, em 2–3 frases, só quando o conceito é abstrato. Sem parágrafo de "limite da analogia" cheio de termos técnicos.
- **Exemplos por ambiente** (`enterpriseExample`, `cloudExample`, `devsecopsExample`, `securityExample`) deixam de ser obrigatórios. Um deles só fica quando o tema da aula é aquele ambiente (ex.: cloud no módulo 14) ou quando ele mesmo é o melhor exemplo da aula, e nesse caso ocupa o lugar do `simpleExample`. Os outros saem.

### 3.5 Segurança estruturada e Troubleshooting
- **Módulos 0, 1 e 2** (Fundamentos da Computação, Fundamentos de Redes e Modelo OSI): remova `security` e `troubleshooting`.
- **A partir do módulo 3**, cada bloco só fica se a aula ensina algo com ataque e defesa próprios (`security`) ou que se inspeciona com uma ferramenta acessível ao aluno neste ponto (`troubleshooting`). Quando ficar, faz dieta:
  - `security` fica só com 3 listas: `vulnerabilities` (o risco e a mitigação), `goodPractices` (a proteção) e `detectionIdeas` (a detecção), com até 3 itens cada. As outras listas saem. Confirme no renderizador que as chaves ausentes não quebram nada.
  - `troubleshooting` fica com até 3 sintomas, até 3 perguntas de diagnóstico, só comandos do tema que o aluno já consegue usar e uma árvore de decisão curta. Sem comandos repetidos do lab e sem equipamentos que a aula não ensina (ex.: Cisco IOS numa aula de fundamentos).

### 3.6 Fixação
- **Quiz** (obrigatório): 5–6 questões, alinhadas ao conteúdo que ficou. Toda questão precisa ser respondível pela aula, então troque as que dependem de seções removidas. Mantenha o formato normalizado da v1 (`question`, `options`, `answer` como índice, `explanation`) e os `id`s. Os simulados mantêm todas as questões.
- **Flashcards:** 5–8 por aula, nenhum sobre conteúdo cortado. Ficam nos dados da aula, mas o app passa a mostrá-los **só na página do módulo** (seção 5).
- **Lab:** só existe se o aluno **executa algo e vê um resultado que não teria só lendo**. Quando existe: 3–4 passos, ~300–400 palavras, sem ritual (avisos de segurança e "melhorias" genéricos, "registre evidências"). Sem lab de verdade, remova o campo `lab`. Nada de bloco "Prática equivalente".
- **Prática extra (opcional):** modo mentor (2–3 perguntas), exercícios (2–4) e desafio com solução comentada (~150–250 palavras no total). Nenhum item repete uma questão do quiz ou reexplica a ideia central: cada um faz o aluno **aplicar**. Se não houver nada novo para aplicar, o item sai.

### 3.7 Navegação e metadados
- **`nextTheme`:** 1–2 frases. Pode carregar a prévia que saiu dos objetivos.
- **`progressRules.completeWhen`:** `{ "read": true, "quizScoreAtLeast": 70 }` em **todas** as aulas (lab e exercícios são opcionais). Exceção: aulas de projeto, capstone ou portfólio cujas regras usam entregáveis ou rubrica mantêm as regras próprias. Preserve `unlocks` e `accessPolicy`.
- **`duration`:** no formato `"X-Y min + Z min de prática extra"`, ou só `"X-Y min"` se não houver prática extra. `estimatedStudyTimeMinutes` = Y (só o núcleo).
- **Campos invisíveis:** removidos como na v1 (`networkContext` continua).
- **Módulos** (`aulas novas/modules/module-XX.js`): `estimatedHours` = soma do núcleo das aulas ÷ 60, arredondado; `assessment.requiredLabs` só com labs que existem.

---

## 4. Aulas especiais (as regras da v1 continuam)

- **Simulados:** mantêm todas as questões. O resto do padrão se aplica à moldura.
- **Projetos, capstone e portfólio:** o escopo e as regras de conclusão próprias ficam. Corte o texto ritual.
- **Revisão, ligação e roadmap:** enxutas.
- **Módulo 16:** o aviso de autorização e escopo aparece uma vez, de forma clara.

---

## 5. Mudanças permitidas no app (faça uma vez, antes do loop)

Altere só o necessário em `assets/js` e, se precisar, em `assets/css`. Não mude chaves de storage.

1. **Flashcards por módulo:**
   - tire os flashcards da página da aula (o painel e o item no índice "Fixação");
   - na página do módulo (`renderModuleDetail`), acrescente a seção **"Flashcards do módulo"**, juntando os flashcards de todas as aulas do módulo, com a aula de origem indicada em cada card;
   - reaproveite `renderFlashcards` e `bindFlashcards`, e garanta que o card vira ao clicar.
2. **Busca:** `services/search.js` indexa o quiz só por `q.q`, `q.opts` e `q.exp`. Faça a busca indexar também `question`, `options` e `explanation`, que é o formato padronizado.
3. **Textos fixos que ficaram incorretos:** por exemplo, a descrição do grupo "Contexto" fala em "história" e "evolução", que deixam de existir. Ajuste só textos assim.

Teste no navegador se houver Chromium/Playwright: uma aula sem flashcards, a página de um módulo com os flashcards virando e a busca encontrando um texto do quiz. Registre as mudanças em `DECISOES.md`.

---

## 6. Fórmula de duração (v2)

- **Núcleo** = palavras de teoria visível (Introdução + Contexto + Conteúdo + Exemplos + Segurança/Troubleshooting, se houver) ÷ 130 + 3 min por diagrama + 1 min por questão do quiz.
- **Prática extra** = lab (`lab.estimatedTimeMinutes`, se for plausível; senão 5 min por passo) + 2 min por pergunta do mentor + 6 min por exercício + 15 min de desafio com solução.
- **Faixa do núcleo:** [0,85×N ; 1,2×N], arredondada para múltiplos de 5. A prática extra é arredondada para múltiplos de 5.

---

## 7. Validação (v2)

**Erros (impedem concluir a aula):**
- tudo o que a v1 validava (sintaxe, identidades, HTML balanceado, quiz válido), exceto `progressRules`, que agora deve seguir a seção 3.7;
- `learningOutcomes`, `content.history` ou `content.evolution` presentes;
- `security` ou `troubleshooting` presentes no módulo 0, 1 ou 2;
- mais de 3 objetivos ou mais de 5 termos no glossário;
- Resumo sem a frase final padrão;
- quiz fora de 5–6 questões (exceto simulados) ou com questão que depende de seção removida;
- lab com bloco "Prática equivalente";
- `duration` fora do formato.

**Avisos (justifique na análise se passar):**
- Motivação acima de 150 palavras, Problema acima de 150, Resumo acima de 90;
- lab com mais de 4 passos;
- mais de 1 exemplo por ambiente;
- `security` com listas além das 3 permitidas.

**Manual:** leia a aula v2 inteira como um aluno daquele ponto do curso. Ela ensina o tema sem precisar de nada que foi cortado?

---

## 8. Loop (uma aula por vez, na ordem 0.1 → 17.12)

Use um subagente por aula, **um de cada vez**, como na v1. O subagente lê `CRITERIOS_V2.md` (incluindo o Apêndice A) e trabalha só na sua aula.

1. Marque a aula como EM ANDAMENTO na coluna V2.
2. Rode `extrair <id>` com a base certa (v1 se existir, senão original) e `metricas`.
3. Aplique o padrão da seção 3.
4. Escreva a análise curta em `revisao/analises_v2/mXX/aula-<id>.md` com:
   - checklist do padrão (cumpre / não se aplica / exceção justificada);
   - o que saiu e por quê (prévia de qual aula, repetição, termo avançado, seção do template);
   - **inventário só dos conceitos removidos**, cada um com o motivo e, se for uma prévia, a aula que o ensina;
   - métricas original → v1 → v2 (palavras visíveis, núcleo, prática extra);
   - itens para revisão humana.
5. Rode `montar` e `validar`. No máximo 2 correções; depois disso, FALHOU, e o build usa a v1 (ou o original).
6. Atualize `PROGRESSO.md` e faça commit + push.

**Comece pelo piloto:** 0.1 (a aula de referência), 3.5 (ARP: primeiro módulo em que Segurança e Troubleshooting podem voltar) e 14.1 (cloud, onde o exemplo de cloud faz sentido). Releia as três com olhar crítico, ajuste `CRITERIOS_V2.md` se precisar (registrando em `DECISOES.md`) e siga a ordem do curso a partir da 0.2.

**Ao fim de cada módulo:** atualize o arquivo do módulo, confira a continuidade (`nextTheme` e pré-requisitos) e rode um subagente revisor independente em 2 aulas. Ele confere duas coisas: (a) se o padrão foi cumprido; (b) se nada **do próprio tema** se perdeu.

**No fim:**
- gere `redes_e_network_v2_1_single.html` e valide como na v1, incluindo a página de módulo com flashcards;
- escreva `revisao/RELATORIO_FINAL_V2.md` com:
  - números original → v1 → v2 (palavras, horas de núcleo e de prática extra);
  - as listas pedidas na v1 (duração organizada, encheção, conteúdo útil, aproveitamento, aulas mais curtas, explicação mais direta), agora com os dados da v2;
  - as seções removidas por aula;
  - as mudanças no app;
  - os itens de revisão humana.

**Retomada:** se a sessão parar, leia `PROGRESSO.md` (coluna V2), `DECISOES.md` e `CRITERIOS_V2.md`, refaça do zero qualquer aula EM ANDAMENTO e continue da primeira PENDENTE.

---

## Apêndice A — Aula de referência 0.1 (decisões do dono do curso)

Use esta aula para calibrar todas as outras. Ordem de grandeza esperada para a 0.1: cerca de 3.000 palavras no total (hoje são ~6.800) e um núcleo de ~20–30 min, mais a prática extra.

| Item | Como fica na 0.1 |
|---|---|
| Objetivos | 1. Explicar por que computadores representam informação com dois estados físicos (bits). 2. Diferenciar informação, dado, byte, bit e sinal, e explicar que o significado vem da interpretação (codificação ou protocolo). 3. Ver os bytes de um texto (ex.: "rede" = `72 65 64 65`) e explicar por que a mesma sequência pode significar coisas diferentes. |
| Resultados de aprendizagem | Removidos |
| Motivação | Abre com o gancho "aÃ§Ã£o" no lugar de "ação": todo mundo já viu isso num e-mail ou site, e são os mesmos bytes lidos com a regra errada. Ligação com a carreira em 1 frase (o cenário do alerta do SOC pode ficar só como essa frase). Sai a frase que repete o Problema ("computadores não entendem significado humano…"). |
| Resumo | Exatamente:<br>• **Ideia central:** rede é uma cadeia de traduções: dado → bytes → bits → sinal → bits → dado. O significado só volta quando o destino usa a regra certa.<br>• Informação, dado, byte, bit e sinal são coisas diferentes. 1 byte = 8 bits.<br>• Os mesmos bytes mudam de sentido conforme a regra: `01000001` pode ser o número 65 ou a letra A.<br>• Bytes ilegíveis não são, por si só, criptografia nem ataque.<br>• Base64 e hexadecimal mudam a forma dos dados; não protegem nada.<br>*Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.* |
| Glossário | No máximo 5, entre candidatos como UTF-8, Payload, Hexadecimal (→ 0.2), Base64 e Protocolo, só os que a aula não explica |
| Problema | Uma frase retomando o gancho ("é isso que acontece quando os dois lados não usam a mesma regra") + por que dois estados (ruído) + por que é preciso uma regra combinada. Telégrafo e cartões perfurados em no máximo 1 frase. |
| Conceito (~200 palavras) | Fica: a definição de representação digital, bit e byte, `01000001` = 65 ou "A", "ação" tem 4 letras e ocupa 6 bytes em UTF-8 (explica o gancho), "protocolos são as regras combinadas" (1 frase) e "codificação: qualquer um reverte; criptografia: só com a chave" (2 linhas). Sai: o que Ethernet, IPv4, TCP, HTTP e TLS definem; a tabela de 5 transformações (serialização, compressão, hash); o callout de erros comuns repetido. |
| Funcionamento interno (~170) | Fica a cadeia em passos simples e "o hardware mede um fenômeno físico e decide se é 0 ou 1". Sai o detalhe do encapsulamento (portas, MAC, flags) e o parágrafo "Ligação com segurança" (checksum, CRC, MAC criptográfico, SIEM). |
| Arquitetura | Removida, ou no máximo 4 linhas (sinal, bit, byte, dado). Saem quadro, pacote, segmento, MTU e fragmentação (módulo 2). |
| Diagrama | Mantido |
| Exemplos | `simpleExample` = o caso do HTTP Basic, escrito para iniciante: "quando você faz login num site que usa um tipo antigo de autenticação, o navegador envia `Authorization: Basic dXN1YXJpbzpzZW5oYQ==`; lido como texto parece embaralhado, lido como Base64 é `usuario:senha`; qualquer um decodifica, só o TLS protege". Analogia das lâmpadas em 2–3 frases. Saem: empresarial (repetia o gancho), cloud, DevSecOps, o `securityExample` separado e o parágrafo de IPv4/MAC. |
| Segurança e Troubleshooting | Removidos |
| Quiz | 5–6 questões. Sai a questão do flow log de cloud. A da "ação = 6 bytes" fica, e o Conceito precisa explicar isso. |
| Flashcards | Saem "Checksum/CRC × MAC criptográfico" e "O que o Wireshark mostra?" |
| Lab | 3–4 passos: ver os bytes de "rede" e de "ação", codificar em Base64 e decodificar (~300–400 palavras). Saem "visualizar como texto", "relacionar com análise de tráfego" e "comparar e registrar evidências". |
| Prática extra | Mentor: 2–3 perguntas que não repitam o quiz. Exercícios: o de decodificar `Authorization: Basic YWRtaW46MTIzNDU2` fica (aplica o exemplo); sai o "diferencie informação, dado, bit e sinal" (é a questão 1 do quiz). Desafio novo, de aplicação: "um colega abriu um CSV e viu 'aÃ§Ã£o'; explique o que aconteceu e como confirmar olhando os bytes", com a solução comentada. |
| Conclusão | `{ "read": true, "quizScoreAtLeast": 70 }` |
