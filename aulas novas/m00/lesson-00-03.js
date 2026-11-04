export const lesson0003 = {
  "id": "0.3",
  "moduleId": "m00",
  "order": 3,
  "title": "ASCII, Unicode, UTF-8 e Base64",
  "subtitle": "Como texto vira bytes em redes, logs, APIs, tokens e análise de segurança.",
  "duration": "15-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 170,
  "tags": [
    "fundamentos",
    "texto",
    "ascii",
    "unicode",
    "utf-8",
    "base64",
    "http",
    "apis",
    "logs",
    "tokens",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "A aula 0.1 explica que computadores representam informação como estados interpretados como bits."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A aula 0.2 apresenta bits, bytes, binário e hexadecimal, que são a base para entender caracteres, codificações e Base64."
    }
  ],
  "objectives": [
    "Diferenciar caractere, ponto de código (Unicode) e codificação (UTF-8), e contar quantos bytes um texto ocupa em UTF-8 (ex.: Olá = 4F 6C C3 A1, 4 bytes).",
    "Explicar, byte a byte, por que á vira Ã¡ quando bytes UTF-8 são lidos como Latin-1, e reconhecer esse padrão num texto quebrado.",
    "Explicar como o Base64 reescreve cada 3 bytes como 4 caracteres, calcular o tamanho resultante e justificar por que ele não protege segredos."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Você faz um cadastro numa loja on-line com o nome João, e o e-mail de confirmação chega para “JoÃ£o”. No mesmo dia, tenta enviar por e-mail um arquivo de 20 MB num serviço que aceita mensagens de até 25 MB, e a mensagem é recusada por ser grande demais.\n  </p>\n  <p>\n    Os dois casos parecem defeito, mas cada um tem uma explicação exata, que dá para conferir byte a byte. Sem ela, o caminho comum é culpar a rede, tentar de novo ou apagar os acentos dos nomes, e nada disso resolve. Nesta aula você abre as regras que transformam texto em bytes e bytes em texto, e passa a explicar os dois casos com números. Em segurança, essa leitura é rotina: credenciais, tokens e registros de sistemas chegam escritos nessas regras, e confundir uma delas com proteção expõe segredos.\n  </p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    É isso que acontece quando texto vira bytes por uma regra e é lido por outra, ou quando bytes precisam passar por um canal que só aceita texto. Nos dois casos a rede entregou os bytes intactos; o que falhou foi a regra.\n  </p>\n  <p>\n    As regras de texto se multiplicaram porque a primeira, o ASCII, só cobria o inglês. Cada região criou então a sua tabela, e o mesmo byte passou a significar letras diferentes conforme quem lia. O Unicode e o UTF-8 resolveram isso, mas sistemas antigos e configurações erradas continuam misturando regras.\n  </p>\n  <p>\n    Já o e-mail e formatos como o JSON foram feitos para carregar texto, e um arquivo (uma foto, um PDF) é feito de bytes quaisquer. Para levá-lo por esses canais, os bytes são reescritos como texto em Base64, e isso tem um custo de tamanho. Esta aula mostra as duas regras por dentro.\n  </p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>\n    Três ideias separam o que você vê na tela do que viaja pela rede. Um <strong>caractere</strong> é o símbolo que você percebe, como <code>A</code>, <code>ç</code> ou <code>€</code>. Um <strong>ponto de código</strong> é o número que o Unicode atribui a esse caractere, escrito como <code>U+</code> seguido de hexadecimal: <code>A</code> é <code>U+0041</code> e <code>á</code> é <code>U+00E1</code>. Uma <strong>codificação</strong> é a regra que transforma esses números em bytes.\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr><th>Padrão</th><th>O que é</th><th>Exemplo</th></tr>\n      </thead>\n      <tbody>\n        <tr><td>ASCII</td><td>Tabela de 7 bits: 128 valores (0 a 127) para letras sem acento, dígitos, pontuação e controles</td><td><code>A</code> = 65 = <code>41</code></td></tr>\n        <tr><td>Latin-1, Windows-1252</td><td>Tabelas regionais de 1 byte: usam os valores 128 a 255 para acentos</td><td><code>E1</code> = <code>á</code></td></tr>\n        <tr><td>Unicode</td><td>Lista universal: um ponto de código para cada caractere de qualquer idioma. Não define bytes</td><td><code>á</code> = <code>U+00E1</code></td></tr>\n        <tr><td>UTF-8</td><td>Codificação do Unicode em 1 a 4 bytes; o ASCII continua igual, em 1 byte</td><td><code>á</code> = <code>C3 A1</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>\n    Como a mesma letra pode virar bytes diferentes, quem recebe precisa saber qual codificação foi usada. Por isso muitos formatos a declaram: uma página web costuma informar <code>charset=utf-8</code> no cabeçalho <code>Content-Type</code>. Se a declaração falta ou está errada, o receptor adivinha, e pode errar.\n  </p>\n  <p>\n    <strong>Base64</strong> resolve outro problema: ele não transforma letras em bytes, e sim bytes quaisquer em texto, usando só 64 caracteres seguros. Como na codificação de texto, a regra é pública: qualquer um reverte, sem chave. Base64 muda a forma dos dados, não os protege.\n  </p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <h3>Do texto aos bytes (UTF-8)</h3>\n  <p>\n    Acompanhe a palavra <code>Olá</code>: três caracteres, com pontos de código <code>U+004F</code>, <code>U+006C</code> e <code>U+00E1</code>. Em UTF-8, <code>O</code> e <code>l</code> ocupam 1 byte cada (<code>4F</code> e <code>6C</code>, os mesmos valores do ASCII), e <code>á</code> ocupa 2 bytes: <code>C3 A1</code>. Resultado: 3 caracteres, 4 bytes. Esses bytes viajam pela rede como quaisquer outros; o receptor os transforma de volta em texto com a codificação que ele espera. O tamanho de cada caractere depende do ponto de código:\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr><th>Faixa de pontos de código</th><th>Bytes em UTF-8</th><th>Exemplo</th></tr>\n      </thead>\n      <tbody>\n        <tr><td><code>U+0000</code> a <code>U+007F</code> (ASCII)</td><td>1</td><td><code>A</code> = <code>41</code></td></tr>\n        <tr><td><code>U+0080</code> a <code>U+07FF</code></td><td>2</td><td><code>á</code> = <code>C3 A1</code>, <code>ç</code> = <code>C3 A7</code>, <code>ã</code> = <code>C3 A3</code></td></tr>\n        <tr><td><code>U+0800</code> a <code>U+FFFF</code></td><td>3</td><td><code>€</code> (<code>U+20AC</code>) = <code>E2 82 AC</code></td></tr>\n        <tr><td><code>U+10000</code> em diante</td><td>4</td><td>😀 (<code>U+1F600</code>) = <code>F0 9F 98 80</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n  <h3>Por que “á” vira “Ã¡”</h3>\n  <p>\n    O texto quebrado tem uma causa exata: os bytes UTF-8 de <code>á</code>, <code>C3 A1</code>, foram lidos com uma tabela de 1 byte por caractere, como Latin-1 ou Windows-1252. Nessas tabelas, <code>C3</code> é <code>Ã</code> e <code>A1</code> é <code>¡</code>. Do mesmo jeito, <code>ç</code> (<code>C3 A7</code>) vira <code>Ã§</code> e <code>ã</code> (<code>C3 A3</code>) vira <code>Ã£</code>, e foi assim que João virou “JoÃ£o”. Ver <code>Ã</code> seguido de outro símbolo é uma pista forte de UTF-8 lido como Latin-1. O caminho inverso também acontece: o byte Latin-1 <code>E1</code> (<code>á</code>) sozinho não é UTF-8 válido, e o receptor em UTF-8 costuma mostrar o símbolo de substituição <code>�</code>, como em “Usu�rio”.\n  </p>\n  <h3>Base64: bytes como texto</h3>\n  <p>\n    Nem todo canal de texto aceita qualquer byte: valores de controle e bytes binários podem ser alterados ou rejeitados num e-mail ou num JSON. O Base64 reescreve os bytes com 64 caracteres seguros, numerados nesta ordem: <code>A–Z</code> valem 0 a 25, <code>a–z</code> valem 26 a 51, <code>0–9</code> valem 52 a 61, <code>+</code> vale 62 e <code>/</code> vale 63.\n  </p>\n  <ol class=\"flow-list\">\n    <li>Junte os bytes em blocos de 3 (24 bits).</li>\n    <li>Divida cada bloco em 4 grupos de 6 bits; 6 bits dão 64 combinações.</li>\n    <li>Troque cada grupo pelo caractere de mesmo número.</li>\n    <li>Se o último bloco tiver só 1 ou 2 bytes, complete a saída com <code>==</code> ou <code>=</code> (preenchimento).</li>\n  </ol>\n  <p>\n    Exemplo: <code>Hel</code> = <code>48 65 6C</code> = <code>01001000 01100101 01101100</code>. Em grupos de 6 bits: <code>010010</code> <code>000110</code> <code>010101</code> <code>101100</code> = 18, 6, 21, 44 = <code>S</code>, <code>G</code>, <code>V</code>, <code>s</code>. Por isso <code>Hello</code> (5 bytes) começa com <code>SGVs</code> e termina como <code>SGVsbG8=</code>: o último bloco tem 2 bytes e ganha um <code>=</code>.\n  </p>\n  <p>\n    Consequência prática: cada 3 bytes viram 4 caracteres, então o Base64 aumenta o tamanho em cerca de 33%. Anexos de e-mail viajam em Base64, e é por isso que o arquivo de 20 MB da Motivação vira uma mensagem de cerca de 27 MB e passa do limite de 25 MB. A variante <strong>Base64URL</strong>, usada em endereços web e tokens, troca <code>+</code> por <code>-</code> e <code>/</code> por <code>_</code> e costuma omitir o <code>=</code>.\n  </p>\n  <div class=\"callout warning\">\n    <strong>Erros comuns</strong>\n    <ul>\n      <li>Achar que 1 caractere = 1 byte. Isso só vale no ASCII: limites medidos em bytes (uma coluna de banco, um campo de formulário) falham com acentos e emojis.</li>\n      <li>Achar que textos iguais na tela têm os mesmos bytes. <code>á</code> pode ser um ponto de código só, <code>U+00E1</code> (<code>C3 A1</code>), ou <code>a</code> seguido do acento combinante <code>U+0301</code> (<code>61 CC 81</code>). Sistemas que comparam nomes precisam converter os dois para a mesma forma antes.</li>\n    </ul>\n  </div>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Pense no Unicode como uma lista internacional que diz “este símbolo existe e tem este número”, e no UTF-8 como o jeito de embalar cada número em envelopes de 1 a 4 bytes. O Base64 é uma caixa padronizada que deixa qualquer objeto passar por um transporte que só aceita caixas: ela não tranca nada, e quem recebe abre sem chave.\n  </p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Um sistema de cadastro guarda o nome numa coluna de banco de dados limitada a 10 bytes. O programador testou com <code>Francisco</code>: 9 letras sem acento, 9 bytes, cabe. Aí chega a cliente <code>Conceição</code>, também com 9 letras:\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr><th>Texto</th><th>Caracteres</th><th>Bytes em UTF-8 (hex)</th><th>Total de bytes</th></tr>\n      </thead>\n      <tbody>\n        <tr><td><code>Francisco</code></td><td>9</td><td><code>46 72 61 6E 63 69 73 63 6F</code></td><td>9</td></tr>\n        <tr><td><code>Conceição</code></td><td>9</td><td><code>43 6F 6E 63 65 69 C3 A7 C3 A3 6F</code></td><td>11</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>\n    O <code>ç</code> e o <code>ã</code> ocupam 2 bytes cada, então o nome tem 11 bytes e não cabe. Se o sistema simplesmente cortar no 10º byte, sobra <code>C3</code> sozinho no fim, metade do <code>ã</code>, e a tela mostra <code>Conceiç�</code>. O erro não está no nome da cliente: está em medir em caracteres um limite que é em bytes.\n  </p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m00l03-title m00l03-desc\">\n    <title id=\"m00l03-title\">Texto, Unicode, UTF-8, Base64 e leitura no receptor</title>\n    <desc id=\"m00l03-desc\">O texto Olá vira os pontos de código U+004F U+006C U+00E1 e depois os bytes UTF-8 4F 6C C3 A1, que a rede entrega intactos. Os mesmos bytes podem ser reescritos em Base64 como T2zDoQ==. Lidos como UTF-8, voltam a ser Olá; lidos como Latin-1, viram OlÃ¡.</desc>\n    <defs>\n      <marker id=\"m00l03-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"70\" width=\"150\" height=\"74\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"105\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Texto</text>\n    <text x=\"105\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Olá</text>\n    <rect x=\"230\" y=\"70\" width=\"160\" height=\"74\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"310\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Unicode</text>\n    <text x=\"310\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">U+004F U+006C U+00E1</text>\n    <rect x=\"450\" y=\"70\" width=\"160\" height=\"74\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"530\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">UTF-8</text>\n    <text x=\"530\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">4F 6C C3 A1</text>\n    <rect x=\"690\" y=\"70\" width=\"190\" height=\"74\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"785\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Rede</text>\n    <text x=\"785\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">entrega os bytes intactos</text>\n    <line x1=\"180\" y1=\"107\" x2=\"230\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"390\" y1=\"107\" x2=\"450\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"610\" y1=\"107\" x2=\"690\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <rect x=\"140\" y=\"235\" width=\"210\" height=\"82\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"245\" y=\"268\" text-anchor=\"middle\" class=\"svg-label\">Base64 (opcional)</text>\n    <text x=\"245\" y=\"293\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">T2zDoQ==: mesmos bytes</text>\n    <rect x=\"430\" y=\"235\" width=\"210\" height=\"82\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"535\" y=\"268\" text-anchor=\"middle\" class=\"svg-label\">Lido como UTF-8</text>\n    <text x=\"535\" y=\"293\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Olá</text>\n    <rect x=\"720\" y=\"235\" width=\"210\" height=\"82\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"825\" y=\"268\" text-anchor=\"middle\" class=\"svg-label\">Lido como Latin-1</text>\n    <text x=\"825\" y=\"293\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">OlÃ¡ (C3 = Ã, A1 = ¡)</text>\n    <line x1=\"530\" y1=\"144\" x2=\"245\" y2=\"235\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"785\" y1=\"144\" x2=\"535\" y2=\"235\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"785\" y1=\"144\" x2=\"825\" y2=\"235\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <text x=\"490\" y=\"378\" text-anchor=\"middle\" class=\"svg-label\">A rede entrega bytes; o texto só volta certo se o receptor usar a mesma codificação.</text>\n  </svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> o Unicode dá um número a cada caractere (<code>á</code> = <code>U+00E1</code>); o UTF-8 o transforma em 1 a 4 bytes (<code>á</code> = <code>C3 A1</code>).</li>\n    <li>O ASCII ocupa 1 byte e não muda no UTF-8; acentos ocupam 2 bytes.</li>\n    <li><code>Ã¡</code> no lugar de <code>á</code>: bytes UTF-8 lidos como Latin-1, não falha de rede.</li>\n    <li>Base64: cada 3 bytes viram 4 caracteres (cerca de 33% maior); reverte sem chave, não é sigilo.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula <strong>0.4 — Bit vs Byte em redes</strong>, você usa bits e bytes para medir velocidade e entende por que um link de 500 Mbps não baixa 500 MB por segundo.\n  </p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 7 - Aplicação",
      "Camada 6 - Apresentação como modelo conceitual"
    ],
    "tcpIpLayers": [
      "Aplicação"
    ],
    "relatedProtocols": [
      "HTTP",
      "SMTP",
      "DNS",
      "TLS",
      "SSH",
      "Syslog"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "binário",
      "hexadecimal"
    ],
    "enables": [
      "HTTP",
      "APIs",
      "logs",
      "tokens",
      "certificados",
      "análise de payload",
      "segurança de aplicações"
    ]
  },
  "lab": {
    "id": "lab-0.3",
    "title": "Observando UTF-8 e Base64 na prática",
    "labType": "security",
    "objective": "Ver quantos bytes cada caractere ocupa em UTF-8, reproduzir o texto quebrado Ã¡ e acompanhar o Base64 transformando 3 bytes em 4 caracteres.",
    "tools": [
      "Terminal Linux/macOS (com xxd ou od, iconv, base64 e Python 3) ou Windows PowerShell (de preferência o PowerShell 7)"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Ver os bytes UTF-8 de Olá",
        "instruction": "Mostre, em hexadecimal, os bytes do texto Olá.",
        "command": "Linux/macOS: printf 'Olá' | xxd -p (sem xxd: printf 'Olá' | od -An -tx1)\nWindows PowerShell: [Text.Encoding]::UTF8.GetBytes('Olá') | ForEach-Object { $_.ToString('X2') }",
        "expectedOutput": "4f6cc3a1 (no PowerShell, 4F, 6C, C3 e A1, um por linha).",
        "explanation": "O e l são ASCII e ocupam 1 byte cada; á ocupa 2 bytes, C3 A1. São 3 caracteres e 4 bytes."
      },
      {
        "number": 2,
        "title": "Comparar caracteres e bytes",
        "instruction": "Conte caracteres e bytes de textos com e sem acento e de um símbolo fora do Latin-1. O comando é para Linux/macOS; no Windows, salve as três linhas do meio num arquivo .py e rode com python.",
        "command": "python3 - <<'PY'\nfor s in ['Ola', 'Olá', 'ação', '€']:\n    b = s.encode('utf-8')\n    print(s, 'caracteres=', len(s), 'bytes=', len(b), 'hex=', b.hex())\nPY",
        "expectedOutput": "Ola caracteres= 3 bytes= 3 hex= 4f6c61\nOlá caracteres= 3 bytes= 4 hex= 4f6cc3a1\nação caracteres= 4 bytes= 6 hex= 61c3a7c3a36f\n€ caracteres= 1 bytes= 3 hex= e282ac",
        "explanation": "Cada linha confirma a tabela de faixas do UTF-8: ASCII em 1 byte, á, ç e ã em 2, o € em 3."
      },
      {
        "number": 3,
        "title": "Reproduzir o texto quebrado",
        "instruction": "Pegue os bytes UTF-8 de Usuário e leia-os como se fossem Latin-1 (ISO-8859-1).",
        "command": "Linux/macOS: printf 'Usuário' | iconv -f ISO-8859-1 -t UTF-8\nWindows PowerShell: [Text.Encoding]::GetEncoding('ISO-8859-1').GetString([Text.Encoding]::UTF8.GetBytes('Usuário'))",
        "expectedOutput": "UsuÃ¡rio",
        "explanation": "O iconv trata cada byte como um caractere Latin-1: C3 vira Ã e A1 vira ¡. É exatamente o erro de um programa que lê UTF-8 com a regra errada. Nenhum byte se perdeu."
      },
      {
        "number": 4,
        "title": "Acompanhar o Base64 e o preenchimento",
        "instruction": "Codifique Hel (3 bytes) e Hello (5 bytes) em Base64 e compare os tamanhos.",
        "command": "Linux/macOS: printf 'Hel' | base64; printf 'Hello' | base64\nWindows PowerShell: [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('Hel')); [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('Hello'))",
        "expectedOutput": "SGVs\nSGVsbG8=",
        "explanation": "3 bytes viram 4 caracteres, sem preenchimento: é o bloco calculado à mão na aula. Hello tem um bloco completo e um de 2 bytes, que vira 4 caracteres terminados em =."
      }
    ],
    "expectedResult": "Você viu que Olá ocupa 4 bytes e o € ocupa 3, reproduziu UsuÃ¡rio lendo bytes UTF-8 como Latin-1 e confirmou que o Base64 transforma cada 3 bytes em 4 caracteres, com = quando o último bloco está incompleto."
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Um sistema antigo gera arquivos de texto em ASCII, só com letras sem acento, números e pontuação. Um sistema novo, que lê tudo como UTF-8, vai abrir esses arquivos corretamente? E se um dia o sistema antigo passar a gravar á em Latin-1?",
      "hints": [
        "Compare os bytes de A no ASCII e no UTF-8.",
        "Qual é o byte de á em Latin-1? Ele é UTF-8 válido sozinho?"
      ],
      "expectedIdeas": [
        "ASCII é UTF-8 válido",
        "mesmos bytes de 1 byte",
        "E1 sozinho é inválido em UTF-8",
        "símbolo de substituição"
      ],
      "explanation": "Sim: o UTF-8 mantém o ASCII com os mesmos valores, então um arquivo só com ASCII já é UTF-8 válido. Já o á gravado em Latin-1 é o byte E1, que sozinho não é UTF-8 válido; o sistema novo deve mostrar o símbolo de substituição no lugar dele."
    },
    {
      "type": "diagnóstico",
      "question": "Num registro de sistema você encontra o valor dGVzdGU6MTIz. Ele não tem = no fim. Isso descarta a hipótese de Base64? Como você testaria, e com que cuidado?",
      "hints": [
        "Quando o Base64 coloca =? Quantos caracteres tem o valor?",
        "Decodificar revela o conteúdo original."
      ],
      "expectedIdeas": [
        "= só quando o último bloco está incompleto",
        "12 caracteres = 9 bytes",
        "decodificar localmente",
        "tratar como possivelmente sensível"
      ],
      "explanation": "Não descarta: o = só aparece quando o último bloco tem 1 ou 2 bytes. 12 caracteres correspondem a 3 blocos completos, 9 bytes. Decodificar localmente (echo dGVzdGU6MTIz | base64 -d) dá teste:123, um par usuário:senha. Como o conteúdo pode ser uma credencial, decodifique só na sua máquina e não cole o resultado em chats ou chamados."
    }
  ],
  "quiz": [
    {
      "id": "q0.3.1",
      "question": "Qual afirmação descreve melhor o papel do UTF-8?",
      "options": [
        "É uma codificação que transforma caracteres Unicode em bytes.",
        "É um algoritmo de criptografia para proteger texto.",
        "É um protocolo de roteamento entre redes.",
        "É um tipo de endereço MAC."
      ],
      "answer": 0,
      "explanation": "UTF-8 é uma codificação de Unicode em bytes. Ele não oferece sigilo e não é protocolo de rede.",
      "topic": "utf-8",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.3.2",
      "question": "Por que Base64 não deve ser usado como mecanismo de proteção de segredo?",
      "options": [
        "Porque só funciona em sistemas Linux.",
        "Porque altera o endereço IP de origem.",
        "Porque pode ser revertido sem chave.",
        "Porque sempre corrompe dados binários."
      ],
      "answer": 2,
      "explanation": "Base64 é uma representação reversível de bytes em texto. Qualquer pessoa com o valor pode decodificar se conhecer a regra.",
      "topic": "base64",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q0.3.4",
      "question": "Qual diferença entre Unicode e UTF-8 está correta?",
      "options": [
        "Unicode é criptografia; UTF-8 é firewall.",
        "Unicode é usado apenas em IPv4; UTF-8 apenas em switches.",
        "Não há diferença: os termos são sempre sinônimos perfeitos.",
        "Unicode define pontos de código; UTF-8 define como codificá-los em bytes."
      ],
      "answer": 3,
      "explanation": "Unicode organiza o repertório de caracteres. UTF-8 é uma forma de representar esses caracteres em bytes.",
      "topic": "unicode",
      "difficulty": "intermediário",
      "type": "comparação"
    },
    {
      "id": "q0.3.7",
      "question": "Um log mostra JoÃ£o no lugar de João. Qual é a explicação mais provável?",
      "options": [
        "O pacote perdeu bytes no caminho e o TCP não retransmitiu.",
        "O nome foi criptografado por um malware.",
        "Os bytes UTF-8 de ã (C3 A3) foram lidos como Latin-1/Windows-1252, em que C3 = Ã e A3 = £.",
        "O nome foi convertido para Base64 antes de ser gravado."
      ],
      "answer": 2,
      "explanation": "O padrão Ã seguido de outro símbolo é típico de UTF-8 interpretado como tabela de 1 byte. O TCP entrega bytes íntegros; o erro está na interpretação.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q0.3.8",
      "question": "Uma coluna aceita no máximo 10 bytes. Por que Conceição (9 caracteres) não cabe se for gravada em UTF-8?",
      "options": [
        "Porque UTF-8 usa sempre 2 bytes por caractere, totalizando 18 bytes.",
        "Porque ç e ã ocupam 2 bytes cada em UTF-8, totalizando 11 bytes.",
        "Porque UTF-8 acrescenta um byte de preenchimento = ao final do texto.",
        "Porque o texto é convertido para Base64 antes de ser gravado."
      ],
      "answer": 1,
      "explanation": "Os 7 caracteres ASCII ocupam 1 byte cada e ç (C3 A7) e ã (C3 A3) ocupam 2 cada: 7 + 4 = 11 bytes. Limites em bytes não são limites em caracteres.",
      "topic": "utf-8",
      "difficulty": "intermediário",
      "type": "cálculo"
    },
    {
      "id": "q0.3.9",
      "question": "Um serviço envia um arquivo de 300 bytes em Base64 dentro de um JSON. Quantos caracteres terá o valor Base64?",
      "options": [
        "300",
        "225",
        "600",
        "400"
      ],
      "answer": 3,
      "explanation": "Base64 converte cada bloco de 3 bytes em 4 caracteres: 300 ÷ 3 = 100 blocos × 4 = 400 caracteres, cerca de 33% a mais. Como 300 é múltiplo de 3, não há =.",
      "topic": "base64",
      "difficulty": "intermediário",
      "type": "cálculo"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.3.1",
      "front": "O que é ASCII?",
      "back": "Uma tabela de 7 bits (128 valores, 0 a 127) que associa números a caracteres básicos do inglês e a controles. Ex.: A = 65 = 0x41.",
      "tags": [
        "ascii",
        "texto"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.3.2",
      "front": "O que é Unicode?",
      "back": "Um padrão que atribui pontos de código a um repertório amplo de caracteres do mundo todo.",
      "tags": [
        "unicode",
        "texto"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.3.3",
      "front": "O que é UTF-8?",
      "back": "Uma codificação que transforma pontos de código Unicode em sequências de bytes.",
      "tags": [
        "utf-8",
        "bytes"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.3.4",
      "front": "Base64 é criptografia?",
      "back": "Não. Base64 é uma representação reversível de bytes como texto e não oferece sigilo.",
      "tags": [
        "base64",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.3.5",
      "front": "Por que um caractere pode ocupar mais de 1 byte?",
      "back": "Porque codificações como UTF-8 usam múltiplos bytes para representar caracteres fora do ASCII básico.",
      "tags": [
        "utf-8",
        "bytes"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.3.7",
      "front": "Qual a diferença entre Base64 e Base64URL?",
      "back": "Base64URL troca + por - e / por _ e costuma omitir o =, para caber em endereços web e tokens.",
      "tags": [
        "base64",
        "tokens"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex0.3.6",
      "type": "prático",
      "prompt": "Calcule sem ferramenta e depois confira no terminal: (a) quantos bytes Coração ocupa em UTF-8; (b) quantos caracteres Base64 resultam de 12 bytes e de 11 bytes, e quantos = aparecem em cada caso.",
      "expectedAnswer": "(a) 9 bytes: 7 caracteres, dos quais ç e ã ocupam 2 bytes cada. (b) 12 bytes = 4 blocos de 3 = 16 caracteres, sem =. 11 bytes = 3 blocos completos + 2 bytes = 16 caracteres com um = no final.",
      "explanation": "O exercício fixa as duas contas que mais causam erro em validações e limites: bytes por caractere em UTF-8 e o crescimento de 4/3 do Base64."
    },
    {
      "id": "ex0.3.7",
      "type": "prático",
      "prompt": "Codifique à mão o texto Oi! em Base64, como no exemplo do Hel: escreva os 3 bytes em hexadecimal e em binário, separe em grupos de 6 bits e troque cada grupo pelo caractere da tabela. Depois confira no terminal (printf 'Oi!' | base64).",
      "expectedAnswer": "O = 4F, i = 69, ! = 21: 01001111 01101001 00100001. Grupos de 6 bits: 010011 110110 100100 100001 = 19, 54, 36, 33 = T, 2, k, h. Resultado: T2kh, sem = porque o bloco tem 3 bytes completos.",
      "explanation": "O exercício repete o algoritmo com valores novos, incluindo um grupo que cai nos dígitos (54 = 2) e outro nas minúsculas (36 = k)."
    }
  ],
  "challenge": {
    "title": "Dois sistemas, dois erros diferentes",
    "scenario": "O sistema A envia cadastros para o sistema B, e B envia relatórios de volta para A. O nome do campo Usuário aparece como Usu�rio nas telas de B e como UsuÃ¡rio nos relatórios abertos em A. A equipe acha que a rede entre os dois está corrompendo os dados.",
    "tasks": [
      "Dizer qual codificação cada sistema usa e explicar cada erro pelos bytes do á.",
      "Dizer como confirmar olhando os bytes.",
      "Propor uma correção que preserve os acentos."
    ],
    "expectedDeliverables": [
      "Uma explicação de 5 a 8 linhas, com os bytes esperados em cada sentido."
    ]
  },
  "commentedSolution": {
    "reasoning": "São dois sintomas diferentes, então provavelmente são duas leituras erradas, uma em cada sentido. Use as pistas da aula: Ã + símbolo indica UTF-8 lido como Latin-1; � indica bytes que não são UTF-8 válido.",
    "steps": [
      "B mostra Usu�rio: recebeu um byte que não é UTF-8 válido. É o E1, o á em Latin-1. Logo, A grava em Latin-1 e B lê em UTF-8.",
      "A mostra UsuÃ¡rio: recebeu C3 A1, o á em UTF-8, e leu cada byte como um caractere Latin-1 (C3 = Ã, A1 = ¡). Logo, B grava em UTF-8 e A lê em Latin-1.",
      "Confirme olhando os bytes de cada lado (xxd ou Format-Hex): E1 na saída de A, C3 A1 na saída de B.",
      "Corrija alinhando os dois em UTF-8, ou convertendo a saída de A para UTF-8 antes de enviar, e declarando a codificação quando o formato permitir."
    ],
    "commonMistakes": [
      "Culpar a rede: os bytes chegam exatamente como saíram.",
      "Remover os acentos: esconde o sintoma e estraga os dados."
    ],
    "finalAnswer": "A usa Latin-1 (á = E1) e B usa UTF-8 (á = C3 A1); cada um lê o que recebe com a própria regra. A solução é alinhar a codificação dos dois, preferencialmente em UTF-8."
  },
  "glossary": [
    {
      "term": "Content-Type",
      "shortDefinition": "Cabeçalho do HTTP que informa o tipo do conteúdo enviado e, muitas vezes, a codificação do texto.",
      "example": "Content-Type: text/html; charset=utf-8",
      "relatedLessons": [
        "8.2"
      ]
    },
    {
      "term": "JSON",
      "shortDefinition": "Formato de texto usado por sistemas e APIs para trocar dados organizados em campos e valores.",
      "example": "{\"nome\": \"Conceição\"}",
      "relatedLessons": [
        "8.6"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "The Unicode Standard",
      "organization": "Unicode Consortium",
      "url": "https://www.unicode.org/standard/standard.html",
      "note": "Referência conceitual para Unicode e pontos de código."
    },
    {
      "type": "rfc",
      "title": "RFC 3629 - UTF-8, a transformation format of ISO 10646",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc3629",
      "note": "Referência técnica estável sobre UTF-8."
    },
    {
      "type": "rfc",
      "title": "RFC 4648 - The Base16, Base32, and Base64 Data Encodings",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc4648",
      "note": "Referência técnica sobre Base64 e outras codificações."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 - Aula 0.2",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m00/0.2",
      "note": "Base necessária sobre bits, bytes, binário e hexadecimal."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e Segurança de Workloads",
      "lesson": "Secrets e configuração",
      "reason": "Kubernetes Secrets usam Base64 para representar bytes em YAML/JSON, mas exigem RBAC, criptografia e gestão segura."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Tokens, Claims e Federação",
      "lesson": "JWT, claims e representação de tokens",
      "reason": "JWT usa Base64URL em suas partes, o que não deve ser confundido com criptografia do conteúdo."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "0.4"
    ]
  }
};
