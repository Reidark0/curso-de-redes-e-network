export const lesson0002 = {
  "id": "0.2",
  "moduleId": "m00",
  "order": 2,
  "title": "Bits, bytes, binário e hexadecimal",
  "subtitle": "A linguagem numérica que aparece por trás de IPv4, máscaras, MAC, IPv6, dumps, logs e análise de pacotes.",
  "duration": "15-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 160,
  "tags": [
    "fundamentos",
    "bits",
    "bytes",
    "binário",
    "hexadecimal",
    "ipv4",
    "mac",
    "subnetting",
    "wireshark",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "A aula 0.1 explica que computadores representam informação usando estados físicos interpretados como bits. Esta aula aprofunda como esses bits são agrupados, escritos e lidos em bases numéricas."
    }
  ],
  "objectives": [
    "Diferenciar bit, nibble, byte e octeto e calcular quantos valores cabem em n bits (8 bits: 0 a 255; 16 bits: 0 a 65535).",
    "Converter valores entre decimal, binário e hexadecimal à mão, pelos pesos das posições, preservando os zeros à esquerda.",
    "Ler bytes escritos em hexadecimal (como C0 A8 0A 32 ou um endereço MAC) e explicar por que hexadecimal é só uma escrita compacta dos bits, não criptografia."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Abra as configurações de rede do seu computador ou rode <code>ipconfig /all</code> e você verá números como <code>192.168.10.50</code> e, mais abaixo, um “endereço físico” como <code>3C-52-82-1A-2B-3C</code>. No laboratório da aula 0.1, a palavra “rede” apareceu como <code>72 65 64 65</code>. Parecem três linguagens diferentes, mas são todos bytes, só que escritos de jeitos diferentes.</p>\n  <p>\n    Quem não sabe ler esses jeitos de escrever acaba decorando em vez de entender. Mais adiante, máscaras de rede viram fórmulas sem sentido, e uma listagem de bytes em hexadecimal parece código secreto, quando muitas vezes é só um endereço comum. Para quem trabalha com redes ou segurança, ler binário e hexadecimal é tão básico quanto ler as horas: aparece em configuração, em captura de tráfego e em log.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    Esses números parecem de mundos diferentes porque máquina e pessoa precisam de escritas diferentes para os mesmos bits. O circuito trabalha em base 2, com dois estados, como você viu na aula 0.1. Só que binário fica longo demais para humanos: um endereço físico de 48 bits escrito em binário tem 48 caracteres, difíceis de ler, copiar e comparar. O decimal, que usamos no dia a dia, é curto, mas esconde onde está cada bit.</p>\n  <p>\n    A solução adotada foi o hexadecimal (base 16), em que cada dígito corresponde a exatamente 4 bits. Por isso as ferramentas alternam entre as três bases, e você precisa ler qualquer uma delas e passar de uma para outra. Esta aula mostra como cada base funciona e como converter à mão.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>\n    Um <strong>bit</strong> tem dois estados, 0 ou 1. Um <strong>nibble</strong> é um grupo de 4 bits. Um <strong>byte</strong> é um grupo de 8 bits. Um <strong>octeto</strong> também tem 8 bits; as redes preferem esse nome porque ele garante o tamanho exato, já que em computadores antigos o byte nem sempre tinha 8 bits.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> binário é a escrita de números em base 2 (símbolos 0 e 1); decimal, em base 10 (0 a 9); hexadecimal, em base 16 (0 a 9 e as letras A a F, que valem 10 a 15). O prefixo <code>0x</code>, como em <code>0x0800</code>, avisa que o número está em hexadecimal.\n  </div>\n  <p>\n    Com <em>n</em> bits você representa 2<sup>n</sup> valores, de 0 até 2<sup>n</sup> − 1. É daí que vêm limites que você verá em todo o curso:\n  </p>\n  <div class=\"responsive-table\">\n  <table class=\"data-table\">\n    <thead>\n      <tr>\n        <th>Unidade</th>\n        <th>Tamanho</th>\n        <th>Quantidade de valores</th>\n        <th>Exemplo em redes</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Bit</td>\n        <td>1 bit</td>\n        <td>2 valores: 0 ou 1</td>\n        <td>Uma opção ligada ou desligada</td>\n      </tr>\n      <tr>\n        <td>Nibble</td>\n        <td>4 bits</td>\n        <td>16 valores: 0 a 15</td>\n        <td>Um dígito hexadecimal</td>\n      </tr>\n      <tr>\n        <td>Byte / octeto</td>\n        <td>8 bits</td>\n        <td>256 valores: 0 a 255</td>\n        <td>Cada parte de um IPv4, como o 192 de 192.168.10.50</td>\n      </tr>\n      <tr>\n        <td>2 bytes</td>\n        <td>16 bits</td>\n        <td>65536 valores: 0 a 65535</td>\n        <td>Um número de porta, como 443</td>\n      </tr>\n    </tbody>\n  </table>\n  </div>\n  <p>\n    A regra mais importante desta aula: <strong>1 dígito hexadecimal = 4 bits; 2 dígitos hexadecimais = 8 bits = 1 byte</strong>. Por isso <code>FF</code> é um byte com todos os bits em 1, <code>11111111</code>, que vale 255 em decimal.\n  </p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Toda conversão se apoia em posição e peso. No decimal, cada posição vale uma potência de 10; no binário, uma potência de 2; no hexadecimal, uma potência de 16. O número é a soma de cada símbolo multiplicado pelo peso da sua posição.\n  </p>\n  <h3>Como ler um byte em binário</h3>\n  <p>\n    Um octeto tem 8 posições. Da esquerda para a direita, os pesos são 128, 64, 32, 16, 8, 4, 2 e 1. Bit em 1: o peso entra na soma. Bit em 0: não entra.\n  </p>\n  <div class=\"responsive-table\">\n  <table class=\"data-table\">\n    <thead>\n      <tr>\n        <th>Bit</th>\n        <th>7</th>\n        <th>6</th>\n        <th>5</th>\n        <th>4</th>\n        <th>3</th>\n        <th>2</th>\n        <th>1</th>\n        <th>0</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Peso</td>\n        <td>128</td>\n        <td>64</td>\n        <td>32</td>\n        <td>16</td>\n        <td>8</td>\n        <td>4</td>\n        <td>2</td>\n        <td>1</td>\n      </tr>\n      <tr>\n        <td>192</td>\n        <td>1</td>\n        <td>1</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n      </tr>\n    </tbody>\n  </table>\n  </div>\n  <p>\n    Na tabela, <code>11000000</code> vale 128 + 64 = 192. Da mesma forma, <code>168</code> é <code>10101000</code> (128 + 32 + 8) e <code>10</code> é <code>00001010</code> (8 + 2). Para converter de decimal para binário, percorra os pesos da esquerda para a direita: se o peso cabe no que falta, marque 1 e subtraia; se não cabe, marque 0.\n  </p>\n  <h3>Como hexadecimal compacta binário</h3>\n  <p>\n    Hexadecimal trabalha em grupos de 4 bits. O binário <code>1100</code> vale 12, que em hexadecimal é <code>C</code>; <code>0000</code> vale 0. Portanto <code>11000000</code> vira <code>C0</code>, e <code>10101000</code> (<code>1010</code> = A, <code>1000</code> = 8) vira <code>A8</code>. O passo a passo:\n  </p>\n  <ol class=\"flow-list\">\n    <li>Separe o octeto em dois grupos de 4 bits.</li>\n    <li>Converta cada grupo para decimal entre 0 e 15.</li>\n    <li>Troque 10, 11, 12, 13, 14 e 15 por A, B, C, D, E e F.</li>\n    <li>Junte os dois dígitos hexadecimais.</li>\n  </ol>\n  <p>\n    No caminho inverso, de hexadecimal para decimal, multiplique o dígito da esquerda por 16 e some o da direita: <code>FF</code> = 15 × 16 + 15 = 255; <code>A8</code> = 10 × 16 + 8 = 168; <code>0A</code> = 0 × 16 + 10 = 10.\n  </p>\n  <div class=\"callout warning\">\n    <strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Remover zeros à esquerda:</strong> <code>1010</code> é o valor 10, mas o octeto completo é <code>00001010</code>, e em hexadecimal é <code>0A</code>, não <code>A</code>. Todo octeto tem 8 bits; sem os zeros, você compara campos de tamanhos diferentes.</li>\n      <li><strong>Ler <code>FF</code> como 15:</strong> <code>F</code> sozinho vale 15, mas <code>FF</code> são dois dígitos, ou seja, um byte inteiro: 255.</li>\n      <li><strong>Achar que hexadecimal é criptografia:</strong> hexadecimal é só uma forma de escrever os bytes; qualquer um converte de volta, sem chave.</li>\n    </ul>\n  </div>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    A mesma quantia de dinheiro pode ser dita (“cento e noventa e dois reais”), escrita (<code>192</code>) ou separada em notas (100 + 50 + 20 + 20 + 2). A quantia não muda; muda só a forma de registrar. Com bases é igual: <code>192</code>, <code>11000000</code> e <code>C0</code> são o mesmo valor.\n  </p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Pegue o endereço IPv4 <code>192.168.10.50</code>. Para você, são quatro números decimais. Para a rede, é um endereço de 32 bits dividido em quatro octetos:\n  </p>\n  <div class=\"responsive-table\">\n  <table class=\"data-table\">\n    <thead>\n      <tr>\n        <th>Decimal</th>\n        <th>Binário</th>\n        <th>Hexadecimal</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr><td>192</td><td>11000000</td><td>C0</td></tr>\n      <tr><td>168</td><td>10101000</td><td>A8</td></tr>\n      <tr><td>10</td><td>00001010</td><td>0A</td></tr>\n      <tr><td>50</td><td>00110010</td><td>32</td></tr>\n    </tbody>\n  </table>\n  </div>\n  <p>\n    Numa listagem de bytes, como a do <code>Format-Hex</code> ou do <code>xxd</code> que você usou na aula 0.1, esse endereço aparece como <code>C0 A8 0A 32</code>. Não é outra informação nem um código: são os mesmos 4 bytes numa escrita mais compacta.\n  </p>\n  <p>\n    O “endereço físico” da placa de rede (o endereço MAC) segue a mesma lógica. No Windows ele aparece como <code>3C-52-82-1A-2B-3C</code>; no Linux, como <code>3c:52:82:1a:2b:3c</code>. São seis pares hexadecimais, ou seja, 6 bytes (48 bits). Separador e maiúsculas mudam conforme a ferramenta; os bytes são os mesmos.\n  </p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <p>O diagrama mostra como o mesmo valor pode ser visto em decimal, binário e hexadecimal, e como isso aparece em um IPv4 real.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 420\" role=\"img\" aria-labelledby=\"m00l02-title m00l02-desc\">\n    <title id=\"m00l02-title\">Conversão entre decimal, binário e hexadecimal</title>\n    <desc id=\"m00l02-desc\">O valor decimal 192 é representado como 11000000 em binário e C0 em hexadecimal. O IPv4 192.168.10.50 é dividido em quatro octetos.</desc>\n    <defs>\n      <marker id=\"m00l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"40\" y=\"40\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"150\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Decimal</text>\n    <text x=\"150\" y=\"102\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192</text>\n\n    <line x1=\"260\" y1=\"80\" x2=\"370\" y2=\"80\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l02-arrow)\" />\n\n    <rect x=\"370\" y=\"40\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"480\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Binário</text>\n    <text x=\"480\" y=\"102\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">11000000</text>\n\n    <line x1=\"590\" y1=\"80\" x2=\"700\" y2=\"80\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l02-arrow)\" />\n\n    <rect x=\"700\" y=\"40\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"810\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Hexadecimal</text>\n    <text x=\"810\" y=\"102\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">C0</text>\n\n    <rect x=\"70\" y=\"185\" width=\"820\" height=\"170\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"220\" text-anchor=\"middle\" class=\"svg-label\">IPv4 192.168.10.50 como quatro octetos</text>\n\n    <rect x=\"110\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"190\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192</text>\n    <text x=\"190\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">C0</text>\n\n    <rect x=\"310\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"390\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">168</text>\n    <text x=\"390\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">A8</text>\n\n    <rect x=\"510\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"590\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10</text>\n    <text x=\"590\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">0A</text>\n\n    <rect x=\"710\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"790\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">50</text>\n    <text x=\"790\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">32</text>\n\n    <text x=\"480\" y=\"382\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cada octeto tem 8 bits; cada par hexadecimal representa 1 byte.</text>\n  </svg>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> decimal, binário e hexadecimal são três escritas dos mesmos bits: <code>192</code> = <code>11000000</code> = <code>C0</code>.</li>\n    <li>1 byte (octeto) = 8 bits; 1 dígito hexadecimal = 4 bits; 2 dígitos = 1 byte.</li>\n    <li>n bits guardam 2<sup>n</sup> valores: 8 bits vão de 0 a 255; 16 bits, de 0 a 65535.</li>\n    <li>Pesos do octeto: 128, 64, 32, 16, 8, 4, 2, 1. Mantenha os zeros à esquerda: 10 = <code>00001010</code> = <code>0A</code>.</li>\n    <li>Hexadecimal é só uma escrita compacta; não é criptografia.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula 0.3, “ASCII, Unicode, UTF-8 e Base64”, você vê por dentro as regras que transformam texto em bytes e como o Base64 reescreve esses bytes. Depois, a aula 0.4 usa bits e bytes para medir velocidade, como na diferença entre Mb/s e MB/s.\n  </p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "ICMP",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [
      "Representação digital da informação",
      "Estados físicos interpretados como bits"
    ],
    "enables": [
      "Subnetting",
      "Máscaras IPv4",
      "Endereços MAC",
      "IPv6",
      "Flags TCP",
      "Análise de pacotes",
      "Codificações de aplicação"
    ]
  },
  "lab": {
    "id": "lab-0.2",
    "title": "Converter IPv4 para binário e hexadecimal",
    "labType": "local",
    "objective": "Converter os octetos de um IPv4 à mão, conferir no terminal e ler em bytes o endereço MAC da sua própria placa de rede.",
    "tools": [
      "Windows PowerShell ou terminal Linux/macOS (com Python 3)"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Converter os octetos à mão",
        "instruction": "Separe 192.168.10.50 em quatro octetos e converta cada um para binário com os pesos 128, 64, 32, 16, 8, 4, 2 e 1, sempre com 8 bits. Depois converta cada grupo de 4 bits para um dígito hexadecimal.",
        "expectedOutput": "192 = 11000000 = C0; 168 = 10101000 = A8; 10 = 00001010 = 0A; 50 = 00110010 = 32.",
        "explanation": "50 = 32 + 16 + 2, por isso os bits de peso 32, 16 e 2 ficam em 1."
      },
      {
        "number": 2,
        "title": "Conferir no terminal",
        "instruction": "Peça ao terminal a mesma conversão, forçando 8 bits e 2 dígitos hexadecimais.",
        "command": "Windows PowerShell: 192,168,10,50 | ForEach-Object { \"$($_) -> $([Convert]::ToString($_,2).PadLeft(8,'0')) -> $([Convert]::ToString($_,16).ToUpper().PadLeft(2,'0'))\" }\nLinux/macOS: python3 -c \"for n in [192,168,10,50]: print(f'{n} -> {n:08b} -> {n:02X}')\"",
        "expectedOutput": "192 -> 11000000 -> C0, 168 -> 10101000 -> A8, 10 -> 00001010 -> 0A e 50 -> 00110010 -> 32.",
        "explanation": "Se algum valor não bater com o passo 1, refaça a soma dos pesos daquele octeto."
      },
      {
        "number": 3,
        "title": "Ver a ferramenta cortar os zeros",
        "instruction": "Converta o 10 de novo, agora sem pedir tamanho fixo.",
        "command": "Windows PowerShell: [Convert]::ToString(10,2); [Convert]::ToString(10,16)\nLinux/macOS: python3 -c \"print(format(10,'b'), format(10,'X'))\"",
        "expectedOutput": "1010 e a (no Python, 1010 A).",
        "explanation": "O valor está certo, mas a ferramenta mostra o mínimo de dígitos. Num octeto, o certo é 00001010 e 0A: é você quem precisa completar o campo (PadLeft no PowerShell, 08b e 02X no Python)."
      },
      {
        "number": 4,
        "title": "Ler o MAC da sua placa",
        "instruction": "Mostre o endereço físico (MAC) da sua placa de rede, conte os bytes e converta o primeiro byte para binário e decimal.",
        "command": "Windows: ipconfig /all (linha Endereço Físico ou Physical Address)\nLinux: ip link (linha link/ether)\nmacOS: ifconfig en0 | grep ether",
        "expectedOutput": "Seis pares hexadecimais, como 3C-52-82-1A-2B-3C (Windows) ou 3c:52:82:1a:2b:3c (Linux/macOS).",
        "explanation": "Seis pares = 6 bytes = 48 bits. Com o primeiro byte 3C: 3 = 0011 e C = 1100, logo 00111100; em decimal, 3 × 16 + 12 = 60. Ignore a interface lo (loopback), cujo MAC é só zeros."
      }
    ],
    "expectedResult": "Você converteu 192.168.10.50 para 11000000.10101000.00001010.00110010 e C0 A8 0A 32, viu que a ferramenta corta zeros à esquerda se você não pedir 8 bits e leu o MAC da sua placa como 6 bytes."
  },
  "mentorQuestions": [
    {
      "type": "cenário real",
      "question": "Numa listagem de bytes em hexadecimal aparece C0 A8 01 01. Que hipótese simples você testaria antes de considerar isso suspeito?",
      "hints": [
        "Converta C0 e A8 para decimal.",
        "Pense nos endereços que você vê no roteador de casa.",
        "Não classifique risco sem contexto."
      ],
      "expectedIdeas": [
        "C0 = 192",
        "A8 = 168",
        "192.168.1.1",
        "endereço comum",
        "contexto"
      ],
      "explanation": "C0 A8 01 01 são os 4 bytes de 192.168.1.1, endereço comum de roteadores domésticos. Isso não prova que está tudo bem nem que é ataque; mostra que a leitura correta vem antes de qualquer conclusão de segurança."
    },
    {
      "type": "aplicação",
      "question": "Um campo de um protocolo tem 12 bits. Quantos valores diferentes ele guarda, qual é o maior deles e quantos dígitos hexadecimais são necessários para escrevê-lo?",
      "hints": [
        "Use 2 elevado ao número de bits.",
        "Cada dígito hexadecimal cobre 4 bits."
      ],
      "expectedIdeas": [
        "2^12 = 4096 valores",
        "0 a 4095",
        "3 dígitos hexadecimais",
        "FFF"
      ],
      "explanation": "Com 12 bits há 2^12 = 4096 valores, de 0 a 4095. Como cada dígito hexadecimal cobre 4 bits, bastam 3 dígitos: o maior valor é FFF."
    }
  ],
  "quiz": [
    {
      "id": "q0.2.2",
      "question": "Por que 2 dígitos hexadecimais representam exatamente 1 byte?",
      "options": [
        "Porque cada dígito hexadecimal representa 2 bits.",
        "Porque cada dígito hexadecimal representa 4 bits, então dois representam 8 bits.",
        "Porque hexadecimal sempre representa endereços IP.",
        "Porque todo número hexadecimal é criptografado."
      ],
      "answer": 1,
      "explanation": "A base 16 possui 16 valores possíveis por dígito, o que equivale a 4 bits. Dois dígitos hexadecimais representam 8 bits, ou 1 byte.",
      "topic": "hexadecimal",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.2.3",
      "question": "Qual é o valor decimal de FF em hexadecimal?",
      "options": [
        "15",
        "127",
        "240",
        "255"
      ],
      "answer": 3,
      "explanation": "F vale 15. FF = 15 × 16 + 15 = 255. Também é o byte 11111111.",
      "topic": "conversão",
      "difficulty": "iniciante",
      "type": "cálculo"
    },
    {
      "id": "q0.2.4",
      "question": "Em IPv4, por que devemos representar o decimal 10 como 00001010 quando estamos mostrando o octeto completo?",
      "options": [
        "Porque 1010 está matematicamente errado.",
        "Porque todo octeto IPv4 tem 8 bits e os zeros à esquerda completam o campo.",
        "Porque 10 decimal sempre significa hexadecimal.",
        "Porque IPv4 usa 10 bits por octeto."
      ],
      "answer": 1,
      "explanation": "O valor 1010 está correto como valor binário mínimo, mas o octeto completo precisa de 8 bits: 00001010.",
      "topic": "ipv4",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.2.6",
      "question": "Um MAC é exibido como AA:BB:CC:DD:EE:FF. Quantos bytes ele possui?",
      "options": [
        "3 bytes",
        "4 bytes",
        "6 bytes",
        "12 bytes"
      ],
      "answer": 2,
      "explanation": "Cada par hexadecimal representa 1 byte. O endereço possui seis pares: AA, BB, CC, DD, EE e FF. Portanto, são 6 bytes.",
      "topic": "mac",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q0.2.7",
      "question": "Uma porta TCP ou UDP é um campo de 16 bits. Qual é o maior número de porta possível?",
      "options": [
        "65535",
        "255",
        "65536",
        "1023"
      ],
      "answer": 0,
      "explanation": "Com 16 bits há 2^16 = 65536 valores, de 0 a 65535. 255 é o limite de um campo de 8 bits, e 65536 é a quantidade de valores, não o maior deles.",
      "topic": "unidades",
      "difficulty": "iniciante",
      "type": "cálculo"
    },
    {
      "id": "q0.2.8",
      "question": "Na saída de uma ferramenta aparece o valor 0x0800. O que o prefixo 0x indica?",
      "options": [
        "Que o valor está criptografado.",
        "Que o valor está escrito em binário.",
        "Que o campo é opcional e pode ser ignorado.",
        "Que o valor está escrito em hexadecimal."
      ],
      "answer": 3,
      "explanation": "0x é o prefixo que indica hexadecimal. 0x0800 são os 2 bytes 08 e 00 escritos em hexadecimal; nada ali está criptografado.",
      "topic": "hexadecimal",
      "difficulty": "iniciante",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.2.10",
      "front": "Quais são os pesos das posições de um octeto?",
      "back": "Da esquerda para a direita: 128, 64, 32, 16, 8, 4, 2 e 1. Ex.: 11000000 = 128 + 64 = 192.",
      "tags": [
        "binário",
        "octeto"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.2",
      "front": "Qual é a diferença entre byte e octeto?",
      "back": "Na prática, nenhuma: os dois têm 8 bits. As redes dizem octeto para garantir o tamanho exato, porque em computadores antigos o byte nem sempre tinha 8 bits.",
      "tags": [
        "byte",
        "octeto"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.4",
      "front": "Por que hexadecimal é útil em redes?",
      "back": "Porque compacta binário: 1 dígito hex representa 4 bits e 2 dígitos representam 1 byte.",
      "tags": [
        "hexadecimal",
        "redes"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.6",
      "front": "Hexadecimal é criptografia?",
      "back": "Não. Hexadecimal é apenas uma forma de representar números e bytes de maneira compacta.",
      "tags": [
        "segurança",
        "hexadecimal"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.7",
      "front": "Quantos valores cabem em n bits?",
      "back": "2^n valores, de 0 a 2^n − 1. Ex.: 8 bits = 256 valores (0 a 255); 16 bits = 65536 valores (0 a 65535).",
      "tags": [
        "bits",
        "unidades"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.9",
      "front": "Como o mesmo MAC aparece no Windows e no Linux?",
      "back": "3C-52-82-1A-2B-3C no Windows e 3c:52:82:1a:2b:3c no Linux. Os 6 bytes são os mesmos; só mudam o separador e as maiúsculas.",
      "tags": [
        "mac",
        "hexadecimal"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.2.7",
      "type": "cálculo",
      "prompt": "Converta o decimal 200 para binário de 8 bits e para hexadecimal, mostrando quais pesos você usou.",
      "expectedAnswer": "200 = 128 + 64 + 8 = 11001000 = C8.",
      "explanation": "128 cabe em 200 (sobram 72), 64 cabe (sobram 8), 32 e 16 não cabem, 8 cabe (sobra 0), 4, 2 e 1 ficam em 0. Em hexadecimal, 1100 = C e 1000 = 8."
    },
    {
      "id": "ex0.2.5",
      "type": "cálculo",
      "prompt": "Uma listagem de bytes mostra AC 10 20 01 no lugar de um endereço IPv4. Converta esses bytes para binário e para a forma decimal com pontos.",
      "expectedAnswer": "AC 10 20 01 = 10101100.00010000.00100000.00000001 = 172.16.32.1.",
      "explanation": "Cada par hexadecimal é um octeto. AC = 10 × 16 + 12 = 172; 10 = 1 × 16 + 0 = 16; 20 = 2 × 16 + 0 = 32; 01 = 1. Em binário, cada dígito hex vira 4 bits: A = 1010, C = 1100, e assim por diante."
    }
  ],
  "challenge": {
    "title": "Um endereço em três escritas",
    "scenario": "Um colega anotou num chamado o endereço 10.0.1.255, a máscara 255.255.255.0 e o MAC AA:BB:CC:DD:EE:FF de um equipamento. Ele precisa encontrar esses valores numa listagem de bytes em hexadecimal e não entende por que os números parecem tão diferentes.",
    "tasks": [
      "Converter 10.0.1.255 para binário, com 8 bits por octeto, e para hexadecimal, com 2 dígitos por byte.",
      "Converter a máscara 255.255.255.0 para binário e contar quantos bits estão em 1.",
      "Dizer quantos bytes e quantos bits tem o MAC.",
      "Dizer como o endereço 10.0.1.255 apareceria na listagem de bytes."
    ],
    "constraints": [
      "Explicar o raciocínio, não só o resultado da calculadora.",
      "Preservar zeros à esquerda em binário e hexadecimal."
    ],
    "expectedDeliverables": [
      "Uma tabela curta com as conversões e 2 ou 3 linhas de explicação."
    ]
  },
  "commentedSolution": {
    "reasoning": "Comece pelo tamanho de cada campo: IPv4 e máscara têm quatro octetos de 8 bits; o MAC tem seis bytes. Depois converta cada campo sem perder esse tamanho.",
    "steps": [
      "Separe 10.0.1.255 em 10, 0, 1 e 255 e converta cada octeto para 8 bits: 00001010, 00000000, 00000001 e 11111111.",
      "Converta cada octeto para hexadecimal: 0A, 00, 01 e FF.",
      "Converta a máscara: 255.255.255.0 = 11111111.11111111.11111111.00000000. São 24 bits em 1 (na aula 4.3 você verá que é isso que o /24 indica).",
      "Leia o MAC AA:BB:CC:DD:EE:FF como seis pares hexadecimais: 6 bytes, 48 bits.",
      "Na listagem de bytes, o endereço aparece como 0A 00 01 FF."
    ],
    "commonWrongAnswers": [
      {
        "answer": "10.0.1.255 em binário é 1010.0.1.11111111.",
        "whyItIsWrong": "Os valores estão matematicamente reconhecíveis, mas os octetos não foram preservados com 8 bits. Em redes, isso atrapalha máscara e comparação de bits."
      },
      {
        "answer": "AA:BB:CC:DD:EE:FF tem 12 bytes porque tem 12 caracteres hexadecimais.",
        "whyItIsWrong": "Cada byte é representado por dois dígitos hexadecimais. Portanto 12 dígitos hexadecimais equivalem a 6 bytes."
      },
      {
        "answer": "10.0.1.255 em hexadecimal é A 0 1 FF.",
        "whyItIsWrong": "Cada byte ocupa 2 dígitos hexadecimais: o certo é 0A 00 01 FF."
      }
    ],
    "finalAnswer": "10.0.1.255 = 00001010.00000000.00000001.11111111 = 0A 00 01 FF. A máscara 255.255.255.0 tem 24 bits em 1. O MAC AA:BB:CC:DD:EE:FF tem 6 bytes (48 bits). Na listagem, o endereço aparece como 0A 00 01 FF."
  },
  "glossary": [
    {
      "term": "Endereço IPv4",
      "shortDefinition": "Endereço de 32 bits que identifica um dispositivo numa rede IP, escrito como quatro números decimais separados por pontos.",
      "example": "192.168.10.50",
      "relatedLessons": [
        "4.2"
      ]
    },
    {
      "term": "Endereço MAC",
      "shortDefinition": "Endereço físico de 6 bytes gravado na placa de rede, escrito como seis pares hexadecimais.",
      "example": "3C-52-82-1A-2B-3C",
      "relatedLessons": [
        "3.2"
      ]
    },
    {
      "term": "Porta",
      "shortDefinition": "Número de 16 bits (0 a 65535) que indica para qual programa do computador uma comunicação se destina.",
      "example": "443 é a porta usada por sites com https.",
      "relatedLessons": [
        "6.2"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.1: Como computadores representam informação",
      "organization": "Deixando de ser TBN",
      "url": "internal:0.1",
      "note": "Base conceitual para entender bits como representação de estados físicos."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v1.1 — Aula 0.2: Bits, bytes, binário e hexadecimal",
      "organization": "Deixando de ser TBN",
      "url": "internal:v1.1:0.2",
      "note": "Fonte pedagógica congelada usada para preservar ID, título e objetivos aproveitáveis."
    },
    {
      "type": "standard",
      "title": "Conceitos fundamentais de representação binária e hexadecimal",
      "organization": "Base técnica consolidada",
      "url": "internal:foundations",
      "note": "Conteúdo estável usado como base para redes, sistemas e segurança."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "fundamentos",
      "reason": "Pipelines, IaC e validação de CIDR dependem de entendimento de bits, bytes e representação de valores."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "tokens-e-codificacao",
      "lesson": "base64-tokens-claims",
      "reason": "A próxima aula sobre codificação prepara a base para entender tokens, claims, payloads e representações em autenticação moderna."
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
      "0.3"
    ]
  }
};
