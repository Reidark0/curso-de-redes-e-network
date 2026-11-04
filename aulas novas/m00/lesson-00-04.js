export const lesson0004 = {
  "id": "0.4",
  "moduleId": "m00",
  "order": 4,
  "title": "Bit vs Byte em redes",
  "subtitle": "Como interpretar Mbps, MB/s, throughput, overhead e velocidade real sem cair em conclusões erradas.",
  "duration": "15-25 min + 30 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante",
  "type": "intermediária",
  "xp": 145,
  "tags": [
    "fundamentos",
    "bit",
    "byte",
    "mbps",
    "mb/s",
    "throughput",
    "overhead",
    "performance",
    "troubleshooting",
    "cloud",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "A aula 0.1 explica que informação digital é representada por estados interpretados como bits."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A aula 0.2 apresenta a relação entre bit, byte, binário e hexadecimal."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.3",
      "reason": "A aula 0.3 mostra como bytes podem representar texto em protocolos, logs e APIs."
    }
  ],
  "objectives": [
    "Diferenciar bit (b) e byte (B) em unidades de taxa e de armazenamento (Mbps × MB/s, GB × GiB) e converter entre elas (ex.: 500 Mbps ≈ 62,5 MB/s).",
    "Explicar por que a taxa útil vista pela aplicação fica abaixo da nominal do link (cerca de 5% de cabeçalhos num caso bom) e o que aumenta essa diferença.",
    "Estimar o tempo mínimo e o volume de uma transferência e usar a conta para decidir se um resultado de download é normal."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Você contrata internet de <strong>300 Mbps</strong>, começa a baixar um jogo e o navegador mostra <strong>32 MB/s</strong>. Parece que o provedor entrega um décimo do prometido, e a reação natural é reclamar, reiniciar o roteador ou abrir um chamado. Quase sempre, a internet está boa: o erro está na leitura dos números, que usam unidades diferentes.\n  </p>\n  <p>\n    Sem perceber isso, você troca equipamento, culpa o provedor ou passa horas investigando um problema que não existe. Nesta aula você aprende a converter essas unidades e a saber quanto abaixo do contratado ainda é normal. A mesma conta aparece no trabalho de redes e segurança: estimar quanto tempo leva um backup, quanto custa o tráfego em cloud ou quantos gigabytes saíram num possível vazamento de dados.\n  </p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    É isso que acontece quando dois jeitos de medir se encontram sem conversão. Redes e operadoras medem a capacidade de transmissão em bits por segundo, porque o meio transmite sinais que representam bits, um após o outro. Já arquivos são contados em bytes, e por isso navegadores e sistemas mostram a transferência em bytes por segundo. A mesma transferência ganha dois números diferentes.\n  </p>\n  <p>\n    A conta ingênua também engana no tempo: um arquivo de 1 GB numa conexão de 100 Mbps não baixa em 10 segundos, e sim em cerca de 80 no melhor caso. E nem o melhor caso chega inteiro à aplicação, porque a rede transporta, além do arquivo, bytes de controle. Esta aula mostra como converter as unidades, quanto esse controle custa e como estimar tempo e volume de uma transferência.\n  </p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>\n    <strong>Bit</strong> é a menor unidade de informação digital, 0 ou 1. <strong>Byte</strong> é um grupo de 8 bits. Em redes, a capacidade de transmissão é medida em bits por segundo (bps, Kbps, Mbps, Gbps). Arquivos são medidos em bytes (B, KB, MB, GB), e a transferência deles, em bytes por segundo (MB/s). Repare na letra: <strong>b</strong> minúsculo é bit; <strong>B</strong> maiúsculo é byte.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição operacional:</strong> Mbps mede quantos milhões de bits passam por segundo; MB/s mede quantos milhões de bytes passam por segundo. Como 1 byte = 8 bits, divida Mbps por 8 para obter MB/s e multiplique MB/s por 8 para obter Mbps. Exemplo: 100 Mbps equivalem a 12,5 MB/s, antes de overhead.\n  </div>\n  <div class=\"responsive-table\">\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Link anunciado</th><th>Conta rápida</th><th>Teto teórico em MB/s</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>100 Mbps</td><td>100 ÷ 8</td><td>12,5 MB/s</td></tr>\n      <tr><td>300 Mbps</td><td>300 ÷ 8</td><td>37,5 MB/s</td></tr>\n      <tr><td>500 Mbps</td><td>500 ÷ 8</td><td>62,5 MB/s</td></tr>\n      <tr><td>1 Gbps</td><td>1000 ÷ 8</td><td>125 MB/s</td></tr>\n    </tbody>\n  </table>\n  </div>\n  <h3>Nominal, útil, overhead e volume</h3>\n  <p>Quatro números diferentes costumam ser chamados de \"velocidade\". Separe-os antes de qualquer diagnóstico:</p>\n  <div class=\"responsive-table\">\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Conceito</th><th>O que significa</th><th>Exemplo</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Velocidade nominal</td><td>Capacidade anunciada ou negociada do link</td><td>1 Gbps na placa de rede</td></tr>\n      <tr><td>Taxa útil (throughput)</td><td>Dados do arquivo que chegam à aplicação por segundo</td><td>90 MB/s copiando um arquivo</td></tr>\n      <tr><td>Overhead</td><td>Bytes extras de controle que viajam junto com os dados</td><td>Cabeçalhos de Ethernet, IP, TCP e TLS</td></tr>\n      <tr><td>Volume transferido</td><td>Total de dados movimentados num período; não diz a velocidade</td><td>500 GB por mês</td></tr>\n    </tbody>\n  </table>\n  </div>\n  <h3>Prefixos decimais e binários: GB × GiB</h3>\n  <p>\n    Em taxas de rede, os prefixos são decimais: 1 Mbps = 1.000.000 bits por segundo e 1 Gbps = 1.000 Mbps. Em armazenamento existem duas convenções. A decimal usa 1 GB = 10<sup>9</sup> bytes. A binária usa 1 KiB = 1024 bytes, 1 MiB = 1024 KiB e 1 GiB = 1.073.741.824 bytes, cerca de 7% a mais que 1 GB. Alguns sistemas mostram \"GB\" calculando em GiB: por isso um disco de 1 TB (10<sup>12</sup> bytes) aparece no Windows como cerca de 931 GB. Os bytes são os mesmos; muda só a convenção. Na conta rápida de velocidade a diferença é pequena, mas em cobrança ou estimativa de volume confira qual convenção a ferramenta usa.\n  </p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Quando você baixa um arquivo, ele não viaja sozinho. A rede o divide em pedaços, e cada pedaço sai acompanhado de bytes de controle chamados <strong>cabeçalhos</strong>, um para cada protocolo do caminho: o do Ethernet (entrega no cabo local), o do IP (endereço de destino), o do TCP (ordem e confirmação de recebimento) e, num site com https, o do TLS (criptografia). Esses bytes ocupam o link, mas não fazem parte do arquivo: são o overhead. Como cada protocolo acrescenta o seu cabeçalho é o tema da aula 2.2.\n  </p>\n  <h3>Quanto o overhead custa num caso bom</h3>\n  <p>\n    Em Ethernet, cada pacote leva no máximo 1500 bytes. No cabo, somando os bytes de controle do próprio Ethernet e a pausa obrigatória entre um envio e outro, ele ocupa o equivalente a cerca de 1538 bytes. Dos 1500, 20 vão para o cabeçalho IP e 20 para o TCP, e sobram 1460 bytes do arquivo. Então 1460 ÷ 1538 ≈ 95%: numa porta de 1 Gbps, o máximo útil fica perto de 949 Mbps, ou cerca de 118 MB/s, e não 125 MB/s. TLS e retransmissões (pedaços perdidos que precisam ser enviados de novo) tiram mais um pouco.\n  </p>\n  <p>\n    Em redes boas, a perda fica nesses poucos por cento. Ela cresce quando outro ponto do caminho vira gargalo e limita a taxa: uma VPN acrescenta o próprio cabeçalho e criptografia a cada pacote; o Wi-Fi divide o ar com outros aparelhos e sofre interferência, por isso a taxa que ele anuncia não é taxa útil; e o servidor de origem, o disco ou a CPU podem não acompanhar o link. A conta mostra o teto; a medição mostra onde você está.\n  </p>\n  <div class=\"content-card\">\n    <strong>Fórmulas práticas:</strong>\n    <ul>\n      <li><code>MB/s ≈ Mbps ÷ 8</code> e <code>Mbps ≈ MB/s × 8</code></li>\n      <li><code>tempo em segundos ≈ tamanho em MB × 8 ÷ taxa em Mbps</code> (ex.: 1 GB = 1000 MB = 8000 megabits; 8000 ÷ 100 Mbps = 80 s)</li>\n      <li><code>volume ≈ taxa × tempo</code> (ex.: 100 Mbps = 12,5 MB/s; em 24 h, ou 86.400 s, são cerca de 1.080.000 MB, perto de 1 TB)</li>\n    </ul>\n  </div>\n  <div class=\"callout warning\"><strong>Erros comuns</strong><ul>\n    <li>Testar pelo Wi-Fi e concluir que o provedor está ruim: para medir o link contratado, teste por cabo, perto do roteador.</li>\n    <li>Testar com a VPN ligada e atribuir ao link a perda que vem do túnel.</li>\n    <li>Baixar de um único servidor lento e culpar a rede: repita com outro destino antes de concluir.</li>\n  </ul></div>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Pense numa estrada com caminhões de entrega. A capacidade da estrada é o link em Mbps, e a carga dos caminhões é o arquivo, medido em bytes. Os caminhões também levam documentos, lacres e etiquetas, que não são a carga mas são necessários para a entrega: isso é o overhead.\n  </p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Você contratou 500 Mbps em casa. Ao baixar um arquivo por cabo, o navegador mostra 55 MB/s. A conta rápida é:\n  </p>\n  <pre class=\"code-block\"><code>55 MB/s × 8 = 440 Mbps</code></pre>\n  <p>\n    Isso não indica problema. O teto teórico de 500 Mbps seria 62,5 MB/s, e você está vendo 55 MB/s de dados úteis, cerca de 88% do nominal. Considerando overhead, servidor de origem e variação do link, essa taxa está boa. O diagnóstico começa pela conversão, não pela reclamação.\n  </p>\n  <div class=\"content-card\">\n    <strong>Atalho mental:</strong> se o download em MB/s multiplicado por 8 chega perto do plano em Mbps, o resultado provavelmente está normal. Se fica muito distante, investigue Wi-Fi, cabo, VPN, roteador e servidor de origem.\n  </div>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1000 430\" role=\"img\" aria-labelledby=\"m00l04-title m00l04-desc\">\n    <title id=\"m00l04-title\">Relação entre Mbps, MB/s, overhead e throughput útil</title>\n    <desc id=\"m00l04-desc\">Diagrama mostrando um link anunciado em Mbps, conversão para MB/s, perda por overhead e entrega de throughput útil para a aplicação.</desc>\n    <defs>\n      <marker id=\"m00l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"70\" width=\"170\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"125\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Link nominal</text>\n    <text x=\"125\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">500 Mbps</text>\n    <rect x=\"280\" y=\"70\" width=\"190\" height=\"78\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"375\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Conversão</text>\n    <text x=\"375\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">500 ÷ 8 = 62,5 MB/s</text>\n    <rect x=\"550\" y=\"70\" width=\"190\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"645\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Overhead</text>\n    <text x=\"645\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ethernet + IP + TCP + TLS</text>\n    <rect x=\"810\" y=\"70\" width=\"150\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"885\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"885\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">55 MB/s úteis</text>\n    <line x1=\"210\" y1=\"109\" x2=\"280\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"470\" y1=\"109\" x2=\"550\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"740\" y1=\"109\" x2=\"810\" y2=\"109\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <rect x=\"110\" y=\"245\" width=\"230\" height=\"86\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"225\" y=\"278\" text-anchor=\"middle\" class=\"svg-label\">Download observado</text>\n    <text x=\"225\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">55 MB/s × 8 = 440 Mbps</text>\n    <rect x=\"390\" y=\"245\" width=\"230\" height=\"86\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"505\" y=\"278\" text-anchor=\"middle\" class=\"svg-label\">Diagnóstico</text>\n    <text x=\"505\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">converter antes de concluir</text>\n    <rect x=\"670\" y=\"245\" width=\"230\" height=\"86\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"785\" y=\"278\" text-anchor=\"middle\" class=\"svg-label\">Risco</text>\n    <text x=\"785\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">unidade errada = decisão errada</text>\n    <line x1=\"885\" y1=\"148\" x2=\"225\" y2=\"245\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"340\" y1=\"288\" x2=\"390\" y2=\"288\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"620\" y1=\"288\" x2=\"670\" y2=\"288\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <text x=\"500\" y=\"390\" text-anchor=\"middle\" class=\"svg-label\">A velocidade nominal do link não é igual à taxa útil vista pela aplicação.</text>\n  </svg>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> links são medidos em bits por segundo (Mbps); arquivos, em bytes (MB/s).</li>\n    <li>1 byte = 8 bits: Mbps ÷ 8 ≈ MB/s e MB/s × 8 ≈ Mbps (500 Mbps → 62,5 MB/s).</li>\n    <li>A taxa útil fica abaixo da nominal: cabeçalhos tiram cerca de 5%; Wi-Fi, VPN e servidor lento tiram mais.</li>\n    <li>Taxa não é volume: volume = taxa × tempo (100 Mbps por 24 h ≈ 1 TB).</li>\n    <li>GB (10<sup>9</sup> bytes) e GiB (2<sup>30</sup> bytes) são diferentes.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula <strong>0.5 — Como sinais físicos carregam dados</strong>, você desce para o mundo físico: como cabo, fibra e rádio transportam os sinais que representam os bits que você aprendeu a medir aqui.\n  </p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física",
      "Camada 2 - Enlace",
      "Camada 3 - Rede",
      "Camada 4 - Transporte",
      "Camada 7 - Aplicação"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "Wi-Fi",
      "IP",
      "TCP",
      "UDP",
      "TLS",
      "HTTP",
      "VPN"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "binário",
      "codificação"
    ],
    "enables": [
      "throughput",
      "overhead",
      "performance",
      "troubleshooting",
      "dimensionamento",
      "cloud networking",
      "segurança operacional"
    ]
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Numa porta de 1 Gbps, por cabo, uma cópia de arquivo entre dois computadores mostra 112 MB/s. Um colega diz que a rede está perdendo 10%, porque o certo seriam 125 MB/s. Ele está certo?",
      "hints": [
        "Qual é o máximo útil do TCP numa porta de 1 Gbps?",
        "Compare 112 MB/s com cerca de 118 MB/s."
      ],
      "expectedIdeas": [
        "125 MB/s é o teto sem overhead",
        "cabeçalhos tiram cerca de 5%",
        "máximo útil perto de 118 MB/s",
        "resultado bom"
      ],
      "explanation": "125 MB/s é o teto sem overhead. Com os cabeçalhos Ethernet, IP e TCP, o máximo útil fica perto de 118 MB/s, e 112 MB/s é cerca de 95% disso: um resultado bom. O pouco que falta pode vir do disco, da CPU ou de retransmissões."
    },
    {
      "type": "aplicação",
      "question": "Um site anuncia um arquivo de 4,7 GB. Depois do download, o gerenciador de arquivos mostra 4,38 GB. Faltou algum pedaço?",
      "hints": [
        "Que convenção o site usa? E o sistema?",
        "Divida 4,7 bilhões de bytes por 1.073.741.824."
      ],
      "expectedIdeas": [
        "GB decimal × GiB binário",
        "4,7 × 10^9 ÷ 2^30 ≈ 4,38",
        "os bytes são os mesmos",
        "nada faltou"
      ],
      "explanation": "O site usa GB decimal (4,7 × 10^9 bytes); o sistema divide por 2^30 e mostra o rótulo GB. 4.700.000.000 ÷ 1.073.741.824 ≈ 4,38. É o mesmo arquivo, contado com outra convenção."
    }
  ],
  "quiz": [
    {
      "id": "q0.4.1",
      "question": "100 Mbps equivalem teoricamente a aproximadamente quanto em MB/s?",
      "options": [
        "100 MB/s",
        "80 MB/s",
        "12,5 MB/s",
        "1,25 MB/s"
      ],
      "answer": 2,
      "explanation": "Como 1 byte tem 8 bits, 100 Mbps ÷ 8 = 12,5 MB/s antes de overhead.",
      "topic": "conversão",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.4.2",
      "question": "Um download aparece como 50 MB/s. Qual é a taxa aproximada em Mbps?",
      "options": [
        "50 Mbps",
        "100 Mbps",
        "250 Mbps",
        "400 Mbps"
      ],
      "answer": 3,
      "explanation": "50 MB/s × 8 = 400 Mbps.",
      "topic": "conversão",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.4.3",
      "question": "Qual afirmação está correta?",
      "options": [
        "Mbps é comum para links; MB/s é comum para downloads.",
        "Mbps e MB/s são a mesma unidade.",
        "MB/s mede megabits por segundo.",
        "1 byte tem 10 bits em redes."
      ],
      "answer": 0,
      "explanation": "Links são normalmente medidos em bits por segundo; downloads e arquivos frequentemente aparecem em bytes por segundo.",
      "topic": "unidades",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.4.4",
      "question": "Por que um link de 1 Gbps raramente entrega 125 MB/s úteis exatos para a aplicação?",
      "options": [
        "Porque 1 Gbps não existe.",
        "Por causa do overhead dos cabeçalhos e de gargalos no caminho.",
        "Porque byte e bit são iguais.",
        "Porque HTTP sempre limita tudo a 10 MB/s."
      ],
      "answer": 1,
      "explanation": "O teto teórico é 125 MB/s, mas protocolos, criptografia, retransmissões, servidor, disco e outros fatores reduzem a taxa útil.",
      "topic": "overhead",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q0.4.7",
      "question": "Um serviço em cloud envia dados a 100 Mbps sustentados durante 24 horas. Qual é o volume aproximado transferido, que é o que a cobrança de tráfego costuma considerar?",
      "options": [
        "100 MB",
        "12,5 GB",
        "100 GB",
        "Cerca de 1 TB"
      ],
      "answer": 3,
      "explanation": "100 Mbps ÷ 8 = 12,5 MB/s; 12,5 MB/s × 86.400 s ≈ 1.080.000 MB, cerca de 1 TB. A velocidade indica a taxa; a cobrança considera o volume acumulado.",
      "topic": "cloud",
      "difficulty": "intermediário",
      "type": "cloud"
    },
    {
      "id": "q0.4.8",
      "question": "Um disco vendido como 1 TB aparece no Windows como cerca de 931 GB. Qual é a explicação?",
      "options": [
        "O fabricante entrega menos bytes do que anuncia.",
        "O sistema calcula em unidades binárias (GiB): 10^12 bytes ÷ 1.073.741.824 ≈ 931.",
        "O overhead de TCP/IP consome cerca de 7% do disco.",
        "Como 1 byte tem 8 bits, parte da capacidade vira bits de controle."
      ],
      "answer": 1,
      "explanation": "O fabricante usa o prefixo decimal (1 TB = 10^12 bytes); o sistema divide por 2^30 (GiB) e mostra o rótulo \"GB\". Os bytes são os mesmos; muda só a convenção.",
      "topic": "unidades",
      "difficulty": "intermediário",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.4.1",
      "front": "O que é Mbps?",
      "back": "Megabits por segundo. Unidade comum para velocidade de links de rede.",
      "tags": [
        "unidades",
        "redes"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.4.2",
      "front": "O que é MB/s?",
      "back": "Megabytes por segundo. Unidade comum para taxa de transferência de arquivos e downloads.",
      "tags": [
        "unidades",
        "download"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.4.3",
      "front": "Conta rápida para Mbps virar MB/s",
      "back": "Divida Mbps por 8 para obter o teto teórico em MB/s.",
      "tags": [
        "conversão"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.4.4",
      "front": "Conta rápida para MB/s virar Mbps",
      "back": "Multiplique MB/s por 8 para estimar Mbps.",
      "tags": [
        "conversão"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.4.5",
      "front": "O que é overhead?",
      "back": "Custo adicional de transporte e controle, como cabeçalhos, criptografia, confirmações e retransmissões.",
      "tags": [
        "overhead",
        "protocolos"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.4.6",
      "front": "Por que Wi-Fi não é ideal para testar link contratado?",
      "back": "Porque o Wi-Fi acrescenta variáveis próprias, como distância, interferência e o ar dividido com outros aparelhos. Para medir o link, teste por cabo.",
      "tags": [
        "wifi",
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.4.7",
      "front": "GB × GiB",
      "back": "1 GB = 10^9 bytes (decimal, SI). 1 GiB = 2^30 = 1.073.741.824 bytes (binário, IEC), cerca de 7% maior. Taxas de rede usam prefixos decimais.",
      "tags": [
        "unidades"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.4.8",
      "front": "Como estimar o tempo mínimo de uma transferência?",
      "back": "Converta o tamanho para megabits (MB × 8) e divida pela taxa em Mbps. Ex.: 1 GB a 100 Mbps ≈ 8000 ÷ 100 = 80 s, antes de overhead.",
      "tags": [
        "conversão"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.4.4",
      "type": "cálculo",
      "prompt": "Um alerta mostra upload sustentado de 25 MB/s por 20 minutos. Estime o volume aproximado transferido.",
      "expectedAnswer": "25 MB/s × 1200 s = 30000 MB, aproximadamente 30 GB.",
      "explanation": "Para impacto de incidente, volume acumulado importa tanto quanto taxa instantânea."
    },
    {
      "id": "ex0.4.5",
      "type": "cálculo",
      "prompt": "O time de backup precisa copiar 500 GB da matriz para a filial por um link de 1 Gbps. Estime o tempo mínimo da cópia e diga por que o tempo real será maior.",
      "expectedAnswer": "500 GB × 8 = 4000 gigabits; 4000 ÷ 1 Gbps = 4000 s, pouco mais de 1 hora. Esse é o mínimo teórico: cabeçalhos (cerca de 5%), criptografia, retransmissões, o disco dos servidores e outros tráfegos no mesmo link aumentam o tempo.",
      "explanation": "O tempo sai do tamanho em bits dividido pela taxa em bits por segundo. O resultado é um piso, não uma promessa."
    }
  ],
  "challenge": {
    "title": "Parecer técnico sobre link e Wi-Fi",
    "scenario": "A empresa contratou 500 Mbps. Por cabo, um notebook baixa a 54 MB/s. No Wi-Fi, outro baixa a 28 MB/s. O gestor quer abrir chamado com o provedor porque acredita que a empresa está recebendo apenas 54 Mbps.",
    "tasks": [
      "Converter 54 MB/s e 28 MB/s para Mbps e comparar com o teto de 500 Mbps.",
      "Explicar por que o teste no Wi-Fi não prova problema no link contratado.",
      "Propor três testes antes de acionar o provedor."
    ],
    "constraints": [
      "Usar linguagem que um gestor entenda, sem afirmar certeza sem evidência."
    ],
    "expectedDeliverables": [
      "Um parecer de 5 a 8 linhas com os cálculos, a conclusão sobre cada teste e os testes propostos."
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro identifique as unidades: o gestor leu MB/s como Mbps. Depois converta as taxas observadas, compare com o teto de 500 Mbps lembrando que o teto útil é menor por overhead, e separe o teste por cabo do teste no Wi-Fi.",
    "steps": [
      "Teto teórico: 500 Mbps ÷ 8 = 62,5 MB/s.",
      "Cabo: 54 MB/s × 8 = 432 Mbps, cerca de 86% do nominal: plausível considerando overhead e servidor de origem.",
      "Wi-Fi: 28 MB/s × 8 = 224 Mbps. A queda está no meio sem fio, não no link: o mesmo link entregou 432 Mbps por cabo.",
      "Testes antes de acionar o provedor: repetir por cabo em outro computador, baixar de outro servidor, testar sem VPN e repetir em horários diferentes."
    ],
    "commonWrongAnswers": [
      {
        "answer": "A empresa recebe só 54 Mbps.",
        "whyItIsWrong": "O valor observado era 54 MB/s, que equivale a 432 Mbps."
      },
      {
        "answer": "O provedor está errado porque o Wi-Fi deu 28 MB/s.",
        "whyItIsWrong": "O Wi-Fi não isola o link contratado: ele acrescenta distância, interferência e o meio compartilhado."
      }
    ],
    "finalAnswer": "O teste por cabo, 54 MB/s, equivale a cerca de 432 Mbps úteis, aceitável para um link de 500 Mbps. O teste no Wi-Fi, 28 MB/s (224 Mbps), aponta para o meio sem fio. Antes de acionar o provedor, repita por cabo, com outro servidor, sem VPN e em outros horários."
  },
  "glossary": [
    {
      "term": "Ethernet",
      "shortDefinition": "Tecnologia de rede local cabeada; cada pedaço de dado enviado nela leva um cabeçalho Ethernet.",
      "example": "O cabo de rede ligado do computador ao roteador usa Ethernet.",
      "relatedLessons": [
        "3.1"
      ]
    },
    {
      "term": "IP",
      "shortDefinition": "Protocolo que leva os dados de uma rede a outra; seu cabeçalho traz os endereços de origem e destino.",
      "example": "Num pacote comum, o cabeçalho IP ocupa 20 bytes.",
      "relatedLessons": [
        "2.5",
        "4.1"
      ]
    },
    {
      "term": "TCP",
      "shortDefinition": "Protocolo que entrega os dados em ordem, confirma o recebimento e reenvia o que se perdeu.",
      "example": "Num pacote comum, o cabeçalho TCP ocupa 20 bytes.",
      "relatedLessons": [
        "2.6",
        "6.4"
      ]
    },
    {
      "term": "TLS",
      "shortDefinition": "Protocolo que criptografa a conexão entre o navegador (ou outro programa) e o servidor; é o que faz o https.",
      "relatedLessons": [
        "8.3"
      ]
    },
    {
      "term": "VPN",
      "shortDefinition": "Túnel criptografado entre dois pontos; cada pacote ganha um cabeçalho e criptografia extras, o que reduz a taxa útil.",
      "relatedLessons": [
        "10.1"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base conceitual sobre representação digital."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base sobre bit, byte, binário e hexadecimal."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.6",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aprofundará latência, largura de banda, throughput e perda."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "conceitos de pipelines",
      "reason": "Pipelines dependem de download de dependências, imagens, artefatos e logs; a interpretação correta de taxa e volume ajuda a diagnosticar lentidão."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "módulos de autenticação e logs",
      "lesson": "logs e auditoria",
      "reason": "Eventos de autenticação, tokens e auditoria geram volume de dados que precisa ser dimensionado corretamente em SIEM e cloud."
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
      "0.5"
    ]
  }
};
