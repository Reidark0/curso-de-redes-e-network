export const lesson0001 = {
  "id": "0.1",
  "moduleId": "m00",
  "order": 1,
  "title": "Como computadores representam informação",
  "subtitle": "Antes de IP, porta, firewall ou cloud: como uma máquina transforma o mundo real em bits que podem ser transportados e interpretados?",
  "duration": "15-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 150,
  "tags": [
    "fundamentos",
    "bits",
    "bytes",
    "representação digital",
    "sinais",
    "redes",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [],
  "objectives": [
    "Explicar por que computadores representam informação com dois estados físicos (bits).",
    "Diferenciar informação, dado, byte, bit e sinal, e explicar que o significado vem da interpretação (codificação ou protocolo).",
    "Ver os bytes de um texto (ex.: \"rede\" = 72 65 64 65) e explicar por que a mesma sequência pode significar coisas diferentes."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Você provavelmente já viu isto num e-mail, num site ou numa planilha: no lugar de “ação” aparece “aÃ§Ã£o”. Nada foi corrompido no caminho, nenhum vírus mexeu no texto e a rede não perdeu nada. Os bytes que chegaram são exatamente os que saíram. O que mudou foi a regra usada para lê-los: quem gravou usou uma tabela para transformar letras em números, e quem abriu usou outra para transformar os números de volta em letras.</p>\n  <p>\n    Sem entender isso, é fácil culpar a rede, o servidor ou um ataque por um problema que está só na leitura. Nesta aula você vai ver os bytes de uma palavra e descobrir por que “ação” vira “aÃ§Ã£o”. É a mesma habilidade que, mais adiante, permite a um analista de segurança olhar os bytes de um alerta e separar texto comum, dado codificado e tráfego realmente suspeito.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    É isso que acontece quando os dois lados não usam a mesma regra. E a regra é necessária porque significado não atravessa cabos, fibras nem ondas de rádio: o que atravessa é um sinal físico, que o destino precisa transformar de volta em bits e depois em dado.</p>\n  <p>\n    Para esse transporte ser confiável, a computação usa só dois estados, como tensão alta ou baixa. O mundo real é contínuo e cheio de ruído: distinguir dois estados bem separados é muito mais seguro do que distinguir dez níveis parecidos. Telégrafos (sinal curto ou longo) e cartões perfurados (furo ou ausência de furo) já usavam essa ideia.</p>\n  <p>\n    Mas dois estados só resolvem o transporte. Para que um grupo de bits volte a ser a letra certa, origem e destino precisam combinar uma regra de leitura. Esta aula mostra essa cadeia e onde a regra entra.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> representação digital é a conversão de algo com significado (uma palavra, uma foto, uma senha) em uma sequência padronizada de bits.\n  </div>\n  <p>Separe cinco coisas que costumam ser misturadas:</p>\n  <ul>\n    <li><strong>Informação:</strong> o que se quer comunicar, como avisar alguém que a reunião mudou.</li>\n    <li><strong>Dado:</strong> a informação representada de um jeito que um programa manipula, como um texto ou um arquivo.</li>\n    <li><strong>Byte:</strong> um grupo de 8 bits, a unidade em que os dados são guardados e transmitidos.</li>\n    <li><strong>Bit:</strong> a menor unidade de informação digital, com dois estados, escritos como 0 e 1.</li>\n    <li><strong>Sinal:</strong> o fenômeno físico que transporta os bits: tensão no cobre, luz na fibra, onda de rádio.</li>\n  </ul>\n  <p>\n    Bits não carregam significado sozinhos. O byte <code>01000001</code> vale 65: lido como número, é 65; lido com uma regra de texto, é a letra A. Uma regra que transforma texto em bytes se chama <strong>codificação</strong>. Na mais usada hoje, o UTF-8, letras sem acento ocupam 1 byte cada, mas “ç” e “ã” ocupam 2 bytes cada. Por isso “ação” tem 4 letras e ocupa 6 bytes, escritos em hexadecimal como <code>61 c3 a7 c3 a3 6f</code>. Se outro programa ler esses bytes com uma regra antiga, de 1 byte por letra, cada par <code>c3 a7</code> e <code>c3 a3</code> vira dois símbolos: “aÃ§Ã£o”. Em redes, as regras combinadas que dizem como interpretar cada byte se chamam <strong>protocolos</strong> (tema da aula 0.7).</p>\n  <h3>Mudar a forma não é proteger</h3>\n  <p>\n    <strong>Codificação</strong> (UTF-8, hexadecimal, Base64) é uma regra pública: qualquer um reverte. <strong>Criptografia</strong> só se reverte com a chave. Por isso bytes ilegíveis não provam nada sozinhos: podem ser texto lido com a regra errada, uma imagem, um arquivo compactado, dados codificados ou, aí sim, criptografados. Antes de concluir “é ataque”, descubra qual regra os bytes seguem.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Quando você envia a palavra “rede” por uma aplicação, ela passa por uma cadeia de traduções, e o destino faz o caminho inverso:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Dado:</strong> a aplicação tem o texto “rede”.</li>\n    <li><strong>Bytes:</strong> a codificação transforma cada letra em um byte: <code>72 65 64 65</code> (em hexadecimal).</li>\n    <li><strong>Bits:</strong> cada byte é uma sequência de 8 bits; <code>72</code> é <code>01110010</code>. No caminho, os protocolos de rede acrescentam seus próprios bytes de controle, como o endereço de destino.</li>\n    <li><strong>Sinal:</strong> a placa de rede transforma os bits em tensão elétrica no cabo, pulsos de luz na fibra ou ondas de rádio no Wi-Fi.</li>\n    <li><strong>Volta:</strong> o destino mede o sinal, recupera bits e bytes, e o sistema e a aplicação os interpretam com as mesmas regras (protocolos e codificação) para mostrar “rede”.</li>\n  </ol>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr>\n          <th>Caractere</th>\n          <th>Decimal</th>\n          <th>Hexadecimal</th>\n          <th>Binário</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr><td>r</td><td>114</td><td>72</td><td>01110010</td></tr>\n        <tr><td>e</td><td>101</td><td>65</td><td>01100101</td></tr>\n        <tr><td>d</td><td>100</td><td>64</td><td>01100100</td></tr>\n        <tr><td>e</td><td>101</td><td>65</td><td>01100101</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>\n    Cada linha mostra o mesmo byte escrito de quatro formas; converter entre elas é o tema da aula 0.2. Já o hardware não enxerga 0 e 1 abstratos: ele mede um fenômeno físico (uma tensão, uma intensidade de luz) e decide se aquilo é 0 ou 1. Ruído pode atrapalhar essa decisão e trocar um bit; por isso as redes têm mecanismos para detectar erros e retransmitir dados.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Imagine duas pessoas trocando mensagens com uma lâmpada: apagada é 0, acesa é 1, e cada grupo de oito sinais forma um byte. Quem recebe só entende a mensagem se usar, para transformar bytes em letras, a mesma tabela de quem enviou. Fio, fibra e rádio fazem o papel da lâmpada; a tabela combinada é a codificação.</p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Alguns sites e sistemas antigos usam um tipo simples de login chamado autenticação HTTP Basic. Quando você digita usuário e senha, o navegador passa a enviar, junto com cada pedido ao site, uma linha assim:</p>\n  <pre class=\"code-block\">Authorization: Basic dXN1YXJpbzpzZW5oYQ==</pre>\n  <p>\n    Lido como texto, <code>dXN1YXJpbzpzZW5oYQ==</code> parece embaralhado. Mas ele está só em Base64, uma codificação que reescreve quaisquer bytes usando letras, números e alguns símbolos. Lido com a regra certa, o mesmo valor é <code>usuario:senha</code>.</p>\n  <p>\n    Qualquer pessoa que capture essa linha decodifica a senha com um comando, sem chave nenhuma (o laboratório mostra como). Base64 só mudou a forma. Quem protege a senha nesse caso é o TLS, a criptografia da conexão que aparece como <code>https://</code> no endereço: sem ele, a senha viaja exposta.</p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 420\" role=\"img\" aria-labelledby=\"m00l01-svg-title m00l01-svg-desc\">\n    <title id=\"m00l01-svg-title\">Cadeia de representação da informação em redes</title>\n    <desc id=\"m00l01-svg-desc\">O diagrama mostra uma intenção humana sendo convertida em dado de aplicação, bytes, bits e sinais físicos, que o destino reconstrói e interpreta. Ferramentas de captura e registros (logs) observam cópias ou resumos desse tráfego, ou seja, representações, não o significado original.</desc>\n    <defs>\n      <marker id=\"m00l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"30\" y=\"70\" width=\"130\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"95\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Intenção</text>\n    <text x=\"95\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">abrir um site</text>\n\n    <rect x=\"205\" y=\"70\" width=\"140\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"275\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"275\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">HTTP, JSON, texto</text>\n\n    <rect x=\"390\" y=\"70\" width=\"130\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"455\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Bytes</text>\n    <text x=\"455\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">valores 0-255</text>\n\n    <rect x=\"565\" y=\"70\" width=\"130\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"630\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Bits</text>\n    <text x=\"630\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">0 e 1</text>\n\n    <rect x=\"740\" y=\"70\" width=\"170\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"825\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Sinal físico</text>\n    <text x=\"825\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tensão, luz, rádio</text>\n\n    <line x1=\"160\" y1=\"106\" x2=\"205\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <line x1=\"345\" y1=\"106\" x2=\"390\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <line x1=\"520\" y1=\"106\" x2=\"565\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <line x1=\"695\" y1=\"106\" x2=\"740\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n\n    <rect x=\"740\" y=\"250\" width=\"170\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"825\" y=\"281\" text-anchor=\"middle\" class=\"svg-label\">Destino</text>\n    <text x=\"825\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">reconstrói e interpreta</text>\n\n    <line x1=\"825\" y1=\"142\" x2=\"825\" y2=\"250\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n\n    <rect x=\"40\" y=\"215\" width=\"600\" height=\"125\" rx=\"12\" class=\"svg-boundary\" />\n    <text x=\"340\" y=\"236\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Observadores: veem representações do tráfego</text>\n\n    <rect x=\"70\" y=\"250\" width=\"250\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"195\" y=\"281\" text-anchor=\"middle\" class=\"svg-label\">Captura</text>\n    <text x=\"195\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cópia dos bytes</text>\n\n    <rect x=\"360\" y=\"250\" width=\"250\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"485\" y=\"281\" text-anchor=\"middle\" class=\"svg-label\">Logs</text>\n    <text x=\"485\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">resumos, métricas</text>\n\n    <path d=\"M825 196 C760 196 700 200 642 236\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <text x=\"735\" y=\"186\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cópias e resumos</text>\n\n    <text x=\"480\" y=\"378\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">O significado não viaja sozinho: ele é reconstruído por camadas de interpretação.</text>\n    <text x=\"480\" y=\"400\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Captura e log mostram uma interpretação dos bytes, não a realidade completa.</text>\n  </svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> rede é uma cadeia de traduções: dado → bytes → bits → sinal → bits → dado. O significado só volta quando o destino usa a regra certa.</li>\n    <li>Informação, dado, byte, bit e sinal são coisas diferentes. 1 byte = 8 bits.</li>\n    <li>Os mesmos bytes mudam de sentido conforme a regra: <code>01000001</code> pode ser o número 65 ou a letra A.</li>\n    <li>Bytes ilegíveis não são, por si só, criptografia nem ataque.</li>\n    <li>Base64 e hexadecimal mudam a forma dos dados; não protegem nada.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula 0.2, “Bits, bytes, binário e hexadecimal”, você aprende a converter valores como <code>72</code> e <code>01110010</code> entre decimal, binário e hexadecimal. Depois, a aula 0.3 mostra por dentro as regras de texto (ASCII, Unicode e UTF-8) e o Base64.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Base conceitual da Camada Física",
      "Preparação para Camada de Enlace",
      "Preparação para Camada de Aplicação"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "IPv4",
      "TCP",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [],
    "enables": [
      "bits e bytes",
      "binário e hexadecimal",
      "endereçamento MAC",
      "IPv4",
      "captura de tráfego",
      "troubleshooting",
      "análise de payloads"
    ]
  },
  "lab": {
    "id": "lab-0.1",
    "title": "Da palavra ao byte: observando representação digital antes da rede",
    "labType": "security",
    "objective": "Ver os bytes de uma palavra comum e de uma acentuada, e comprovar que Base64 se reverte sem chave.",
    "prerequisites": [
      "Saber abrir um terminal. Não é preciso conhecimento de redes."
    ],
    "tools": [
      "Windows PowerShell (de preferência o PowerShell 7) ou terminal Linux/macOS",
      "No Linux/macOS: xxd ou hexdump"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Ver os bytes de \"rede\"",
        "instruction": "Crie um arquivo contendo só a palavra rede, sem quebra de linha no final, e mostre o conteúdo como bytes.",
        "command": "Windows PowerShell: Set-Content -Path .\\m00-aula01.txt -Value 'rede' -NoNewline; Format-Hex -Path .\\m00-aula01.txt\nLinux/macOS: printf 'rede' > m00-aula01.txt; xxd -g 1 m00-aula01.txt (ou hexdump -C m00-aula01.txt)",
        "expectedOutput": "Os bytes 72 65 64 65, um por letra, com a palavra rede ao lado, na coluna de texto.",
        "explanation": "O arquivo guarda 4 bytes, mostrados em hexadecimal (r = 72, e = 65, d = 64). Se aparecer um 0a (ou 0d 0a) a mais no fim, o arquivo ganhou uma quebra de linha, que também é um byte: recrie-o sem ela."
      },
      {
        "number": 2,
        "title": "Ver os bytes de \"ação\"",
        "instruction": "Repita o passo 1 com a palavra ação e conte os bytes.",
        "command": "Windows PowerShell 7: Set-Content -Path .\\acao.txt -Value 'ação' -NoNewline; Format-Hex -Path .\\acao.txt\nLinux/macOS: printf 'ação' > acao.txt; xxd -g 1 acao.txt (ou hexdump -C acao.txt)",
        "expectedOutput": "Os bytes 61 c3 a7 c3 a3 6f: 6 bytes para 4 letras. A coluna de texto pode mostrar pontos ou símbolos no lugar de ç e ã.",
        "explanation": "Em UTF-8, ç (c3 a7) e ã (c3 a3) ocupam 2 bytes cada. A coluna de texto lê 1 byte por vez e erra os acentos: a mesma confusão do aÃ§Ã£o. No Windows PowerShell 5.1 o arquivo sai com 1 byte por letra, porque ele grava em outra codificação; use o PowerShell 7 ou o Linux."
      },
      {
        "number": 3,
        "title": "Codificar \"rede\" em Base64",
        "instruction": "Transforme os bytes de rede em Base64.",
        "command": "Windows PowerShell: [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes('rede'))\nLinux/macOS: printf 'rede' | base64",
        "expectedOutput": "cmVkZQ==",
        "explanation": "Os mesmos 4 bytes, escritos só com letras, números e sinais seguros para trafegar como texto. Nada foi escondido."
      },
      {
        "number": 4,
        "title": "Decodificar o Base64",
        "instruction": "Reverta a string do passo 3 sem usar chave ou senha.",
        "command": "Windows PowerShell: [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('cmVkZQ=='))\nLinux/macOS: echo 'cmVkZQ==' | base64 -d",
        "expectedOutput": "rede",
        "explanation": "Qualquer pessoa com a string recupera o conteúdo. Por isso o Authorization: Basic do exemplo não protege a senha."
      }
    ],
    "expectedResult": "Você viu que rede ocupa 4 bytes (72 65 64 65), que ação ocupa 6 bytes (61 c3 a7 c3 a3 6f) e que Base64 muda a forma dos bytes (cmVkZQ==) sem proteger nada."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que usar só dois estados físicos, lidos como 0 e 1, é mais confiável do que representar muitos níveis diferentes?",
      "hints": [
        "Pense em ruído e em hardware real.",
        "Separar dois estados é mais fácil do que separar dez estados parecidos."
      ],
      "expectedIdeas": [
        "ruído",
        "margem",
        "confiabilidade",
        "hardware"
      ],
      "explanation": "Com dois estados, a distância entre os valores possíveis é grande, e o hardware decide certo mesmo com ruído ou pequenas variações físicas."
    },
    {
      "type": "aplicação",
      "question": "Por causa de ruído no cabo, um único bit do byte 01000001 chega trocado: o destino recebe 01000011. Se esse byte fizer parte de um texto, o que o destino mostra? O que isso diz sobre a importância de detectar erros na transmissão?",
      "hints": [
        "01000001 vale 65 (A). Quanto vale 01000011?",
        "E se ninguém perceber a troca?"
      ],
      "expectedIdeas": [
        "67, letra C",
        "um bit muda o byte",
        "detectar erro e retransmitir"
      ],
      "explanation": "01000011 vale 67, a letra C: um bit trocado muda o dado. O destino não adivinha o valor certo, então a rede precisa detectar o erro e pedir o dado de novo."
    }
  ],
  "quiz": [
    {
      "id": "q0.1.2",
      "question": "Qual alternativa diferencia corretamente dado e sinal físico?",
      "options": [
        "Dado é a informação representada; sinal físico é o fenômeno usado para transportar bits.",
        "Dado e sinal físico são sinônimos em redes.",
        "Sinal físico só existe em Wi-Fi, nunca em cabo.",
        "Dado é sempre criptografado; sinal físico é sempre texto."
      ],
      "answer": 0,
      "explanation": "Dados são representações interpretáveis. Sinais físicos são variações de tensão, luz ou rádio usadas para transportar bits.",
      "topic": "representação",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.1.3",
      "question": "Por que Base64 não deve ser tratado como mecanismo de proteção de segredo?",
      "options": [
        "Porque Base64 só funciona em Linux.",
        "Porque Base64 é uma codificação reversível, não criptografia.",
        "Porque Base64 remove todos os bytes do arquivo.",
        "Porque Base64 impede logs de serem coletados."
      ],
      "answer": 1,
      "explanation": "Base64 representa bytes usando caracteres textuais. Qualquer pessoa que tenha a string pode decodificá-la sem uma chave secreta.",
      "topic": "codificação vs criptografia",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q0.1.4",
      "question": "Uma ferramenta que copia o tráfego da rede mostra o conteúdo de uma mensagem como bytes ilegíveis. Qual é a conclusão correta?",
      "options": [
        "É definitivamente um ataque.",
        "É definitivamente erro de cabo.",
        "Pode ser binário, compressão, criptografia, codificação ou outro formato; é preciso contexto.",
        "Não pode ser tráfego legítimo."
      ],
      "answer": 2,
      "explanation": "Bytes ilegíveis não bastam para concluir ataque nem criptografia. Podem ser texto lido com a regra errada, formato binário, dado compactado, codificado ou criptografado; é preciso descobrir qual regra eles seguem.",
      "topic": "análise de payload",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.1.5",
      "question": "Em uma comunicação de rede, onde o significado humano é reconstruído?",
      "options": [
        "Apenas no cabo de rede.",
        "Apenas no roteador.",
        "No destino, quando protocolos, sistema operacional e aplicação interpretam os bits com as regras combinadas.",
        "No endereço IP de origem."
      ],
      "answer": 2,
      "explanation": "O meio físico transporta sinais. O significado é reconstruído no destino, quando hardware e software recuperam bits e bytes e os interpretam segundo as mesmas regras (protocolos e codificação) usadas na origem.",
      "topic": "camadas",
      "difficulty": "iniciante",
      "type": "arquitetura"
    },
    {
      "id": "q0.1.7",
      "question": "Em um dump aparece o byte 01000001. O que você pode afirmar sem conhecer o formato dos dados?",
      "options": [
        "É obrigatoriamente a letra A.",
        "É um pedaço de payload criptografado.",
        "É um endereço IP inválido.",
        "É um byte de valor 65, que pode ser a letra A, o número 65 ou parte de outro campo, conforme o contexto."
      ],
      "answer": 3,
      "explanation": "Sem contexto, bits são apenas bits. 01000001 vale 65 e, em ASCII/UTF-8, corresponde à letra A, mas pode ser número, instrução ou parte de um campo de protocolo; quem define o significado é o formato ou protocolo.",
      "topic": "interpretação",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.1.8",
      "question": "Um arquivo em UTF-8 contém apenas a palavra ação (4 letras) e ocupa 6 bytes. Por quê?",
      "options": [
        "Porque ç e ã ocupam 2 bytes cada em UTF-8.",
        "Porque todo arquivo UTF-8 reserva 2 bytes para cabeçalho.",
        "Porque cada letra ocupa 1,5 byte.",
        "Porque o arquivo foi criptografado ao ser salvo."
      ],
      "answer": 0,
      "explanation": "Em UTF-8, letras sem acento ocupam 1 byte e caracteres como ç e ã ocupam 2: 61 c3 a7 c3 a3 6f. Letras visíveis e bytes não são a mesma coisa.",
      "topic": "codificação",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.1.1",
      "front": "O que é um bit?",
      "back": "É a menor unidade de informação digital, com dois estados possíveis, normalmente representados como 0 e 1.",
      "tags": [
        "bit",
        "fundamentos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.1.2",
      "front": "O que é um byte?",
      "back": "É um grupo de 8 bits. Bytes são usados para representar números, caracteres, campos de protocolo, arquivos e muitos outros dados.",
      "tags": [
        "byte",
        "fundamentos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.1.4",
      "front": "Por que computadores usam representação binária?",
      "back": "Porque dois estados são mais fáceis e confiáveis de distinguir em hardware real sujeito a ruído, variação e imperfeições.",
      "tags": [
        "binário",
        "hardware"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.1.7",
      "front": "Como fica a palavra rede em bytes (hexadecimal)?",
      "back": "72 65 64 65: um byte por letra (r = 72, e = 65, d = 64).",
      "tags": [
        "bytes",
        "hexadecimal"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.1.8",
      "front": "O que é o byte 0a no fim de um arquivo de texto?",
      "back": "A quebra de linha (LF). No Windows ela costuma ser 0d 0a (CR LF). Ela muda o tamanho do arquivo e o Base64 gerado.",
      "tags": [
        "bytes",
        "quebra de linha"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.1.3",
      "type": "diagnóstico",
      "prompt": "Um colega afirma que o cabeçalho Authorization: Basic YWRtaW46MTIzNDU2 está seguro porque não é legível. Decodifique o valor (no Linux, echo YWRtaW46MTIzNDU2 | base64 -d; no Windows, o comando do passo 4 do laboratório, trocando a string) e corrija a afirmação de forma técnica e educada.",
      "expectedAnswer": "O valor decodifica para admin:123456, ou seja, usuário e senha em texto claro. Base64 é codificação reversível, sem chave: quem capturar o cabeçalho recupera a credencial. Ela só fica protegida se a conexão usar TLS (https).",
      "explanation": "O exercício aplica o exemplo da aula a um valor novo e combate a confusão entre codificação e criptografia."
    },
    {
      "id": "ex0.1.5",
      "type": "classificação",
      "prompt": "Classifique cada item como informação, dado, byte, bit ou sinal: (a) um pulso de luz em uma fibra; (b) o valor 72 em hexadecimal; (c) o 1 na última posição de 01000001; (d) o arquivo lista.txt com nomes de clientes; (e) a intenção de avisar um colega que a reunião mudou.",
      "expectedAnswer": "(a) sinal; (b) byte (em texto UTF-8, a letra r); (c) bit; (d) dado; (e) informação.",
      "explanation": "O exercício verifica se você separa os cinco níveis do Conceito em casos concretos."
    }
  ],
  "challenge": {
    "title": "O CSV que mostrou aÃ§Ã£o",
    "scenario": "Um colega exportou de um sistema uma planilha no formato CSV com uma coluna chamada ação. Ao abrir o arquivo no programa de planilhas, viu aÃ§Ã£o no cabeçalho e concluiu que o arquivo chegou corrompido pela rede. Ele quer baixá-lo de novo.",
    "tasks": [
      "Explicar o que aconteceu com a palavra.",
      "Dizer quais bytes você espera encontrar no arquivo e como confirmá-los com os comandos do laboratório.",
      "Dizer se baixar o arquivo de novo resolve e o que resolveria."
    ],
    "expectedDeliverables": [
      "Uma explicação de 5 a 8 linhas, com os bytes esperados e o comando usado."
    ]
  },
  "commentedSolution": {
    "reasoning": "Comece pelos bytes, não pela tela. A tela mostra uma interpretação; os bytes mostram o que o arquivo realmente contém.",
    "steps": [
      "Olhe os bytes: xxd -g 1 arquivo.csv | head (Linux) ou Format-Hex -Path .\\arquivo.csv (PowerShell). Se aparecer 61 c3 a7 c3 a3 6f, ação foi gravada corretamente em UTF-8.",
      "Leia esses 6 bytes com uma regra antiga, de 1 byte por letra: c3 vira Ã, a7 vira § e a3 vira £. Resultado: aÃ§Ã£o, o que o colega viu.",
      "Os bytes estão íntegros; nada se perdeu na rede. O programa de planilhas usou outra codificação.",
      "Importe o CSV escolhendo UTF-8 como codificação, opção comum na importação dos programas de planilha."
    ],
    "commonMistakes": [
      "Baixar de novo ou culpar a rede: o novo download traz os mesmos bytes.",
      "Achar que símbolos estranhos indicam criptografia ou ataque."
    ],
    "finalAnswer": "O arquivo está certo (61 c3 a7 c3 a3 6f, UTF-8); o programa de planilhas o leu com uma regra de 1 byte por letra. Confirme olhando os bytes e corrija importando o CSV como UTF-8."
  },
  "glossary": [
    {
      "term": "UTF-8",
      "shortDefinition": "A codificação de texto mais usada hoje: transforma cada caractere em 1 a 4 bytes.",
      "longDefinition": "Letras sem acento ocupam 1 byte; caracteres como ç e ã ocupam 2 bytes. É a codificação padrão da web, de APIs e de logs.",
      "example": "rede ocupa 4 bytes (72 65 64 65); ação ocupa 6 (61 c3 a7 c3 a3 6f).",
      "relatedLessons": [
        "0.3"
      ]
    },
    {
      "term": "Hexadecimal",
      "shortDefinition": "Forma de escrever números com 16 símbolos (0-9 e a-f); cada byte vira exatamente 2 dígitos.",
      "example": "O byte 01110010 (114 em decimal) é escrito 72 em hexadecimal.",
      "relatedLessons": [
        "0.2"
      ]
    },
    {
      "term": "Base64",
      "shortDefinition": "Codificação que reescreve quaisquer bytes usando só letras, números e alguns símbolos, para trafegarem como texto.",
      "longDefinition": "Qualquer um decodifica, sem chave: Base64 muda a forma dos dados, não os protege.",
      "example": "rede em Base64 é cmVkZQ==.",
      "relatedLessons": [
        "0.3"
      ]
    },
    {
      "term": "TLS",
      "shortDefinition": "Protocolo que criptografa a conexão entre o navegador (ou outro programa) e o servidor; é o que faz o https.",
      "example": "Um cabeçalho Authorization: Basic enviado dentro de TLS não pode ser lido por quem captura o tráfego no caminho.",
      "relatedLessons": [
        "8.3"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Esta aula fundamenta as próximas aulas sobre bits, bytes, binário, hexadecimal, codificação e sinais físicos."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "A noção de artefatos, logs, manifestos e imagens de container depende de representação digital."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Tokens, claims, certificados e credenciais são estruturas digitais que precisam ser codificadas, assinadas, transmitidas e interpretadas."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Fundamentos de automação e pipelines",
      "lesson": "Artefatos, logs e evidências de build",
      "reason": "Pipelines manipulam representações digitais como imagens, manifestos, relatórios e logs."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Tokens, claims e federação",
      "lesson": "Base conceitual para entender tokens codificados e assinados",
      "reason": "Tokens de identidade dependem de codificação, serialização, assinatura e interpretação correta."
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
      "0.2"
    ]
  }
};
