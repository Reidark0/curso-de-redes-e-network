export const lesson0203 = {
  "id": "2.3",
  "moduleId": "m02",
  "order": 3,
  "title": "Camada 1 — Física: bits no fio, luz e rádio",
  "subtitle": "Onde a comunicação deixa de ser abstração e vira sinal elétrico, pulso de luz ou onda de rádio.",
  "duration": "15-25 min + 45 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "modelo osi",
    "camada física",
    "cobre",
    "fibra",
    "rádio",
    "wi-fi",
    "sinal",
    "ruído",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 apresentou o Modelo OSI como ferramenta de diagnóstico por camadas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "A aula 2.2 explicou que, no fim do encapsulamento, quadros precisam virar bits e sinais físicos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.5",
      "reason": "A aula 1.5 apresentou cobre, fibra e rádio como meios de transmissão."
    }
  ],
  "objectives": [
    "Explicar o que a Camada 1 faz (transformar bits em sinal elétrico, luz ou rádio e reconstruí-los no receptor) e o que ela não faz.",
    "Relacionar cobre, fibra e rádio com seus limites (distância, atenuação, interferência, canal compartilhado) e com os sintomas que eles produzem.",
    "Ler as evidências de Camada 1 de uma interface (link, velocidade e duplex negociados, erros CRC, RSSI e SNR) e reconhecer velocidade reduzida e duplex mismatch."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Um colega reclama que a VPN cai, o sistema web trava e as chamadas de vídeo picotam. Você confere o que já aprendeu: o computador tem IP, o DNS resolve, o ping para o gateway responde e o firewall não mostra bloqueio. Depois de horas mexendo em configurações, alguém olha a porta do switch: o contador de erros crescia sem parar, e o cabo estava amassado atrás da mesa. A falha era física, mas todos os sintomas apareciam lá em cima, na aplicação.</p>\n  <p>Sem olhar a Camada 1, você gasta horas nas camadas erradas e às vezes troca equipamento caro por causa de um cabo de poucos reais. Nesta aula você aprende a ler as evidências do próprio link. Elas também importam para segurança: quem pluga um cabo numa tomada ativa ou abre um rack contorna boa parte dos controles lógicos.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando as camadas de cima herdam um meio ruim. Bits são abstrações: para atravessar um cabo, uma fibra ou o ar, 0 e 1 precisam virar algo mensurável, e o receptor precisa reconstruí-los a partir de um sinal que chega mais fraco e com ruído.</p>\n  <p>Cada meio tem limites próprios, como distância máxima, atenuação e interferência, e ambientes reais pioram tudo: conectores oxidam, cabos dobram, canais Wi-Fi lotam. Quanto maior a velocidade, menor a tolerância a erro. Esta aula mostra como a Camada 1 faz essa conversão, como as duas pontas de um cabo combinam velocidade e duplex e quais evidências mostram que o meio está falhando.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> no Modelo OSI, a Camada 1 (camada física) transmite e recebe bits brutos através de um meio físico, como cabo de cobre, fibra óptica ou rádio.</div>\n  <p>Ela define o meio, o conector, o tipo de sinal, a velocidade e a distância máxima. Ela não aprende MAC, não roteia, não resolve DNS e não autentica usuário: só cria a condição para que quadros, pacotes e dados existam nas camadas de cima.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Meio</th><th>Sinal</th><th>Distância típica</th><th>Ponto fraco</th><th>Onde aparece</th></tr></thead>\n    <tbody>\n      <tr><td>Par trançado de cobre</td><td>Variações elétricas</td><td>Até 100 m por segmento Ethernet</td><td>Interferência, crimpagem ruim, categoria inadequada</td><td>Estações, acesso, PoE</td></tr>\n      <tr><td>Fibra óptica</td><td>Pulsos de luz</td><td>Centenas de metros (multimodo) a quilômetros (monomodo)</td><td>Custo, transceptor compatível, curvatura, conector sujo</td><td>Uplinks, backbone, datacenter, WAN</td></tr>\n      <tr><td>Rádio (Wi-Fi)</td><td>Ondas eletromagnéticas</td><td>Dezenas de metros em ambiente interno</td><td>Paredes, distância, interferência, canal compartilhado</td><td>Mobilidade, escritórios, convidados</td></tr>\n    </tbody>\n  </table></div>\n  <p>No Wi-Fi, os clientes de um mesmo canal se revezam para transmitir. Por isso a qualidade varia com o número de clientes e com o ruído, e não só com a distância. A força do sinal recebido se chama <strong>RSSI</strong> e é medida em dBm, um número negativo: −50 dBm é um sinal forte, e perto de −80 dBm ele já é fraco. O que decide a qualidade, porém, é a <strong>SNR</strong> (relação sinal-ruído): quanto o sinal fica acima do ruído, em dB. Sinal forte com ruído alto ainda dá SNR baixa e rede ruim.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <ol class=\"flow-list\">\n    <li>A camada de enlace entrega à placa de rede os bits de um quadro.</li>\n    <li>A interface física transforma esses bits em sinal, seguindo o padrão do meio (por exemplo, 1000BASE-T para 1 Gbps no cobre): no cobre, variações elétricas controladas; na fibra, pulsos de luz emitidos por um transceptor (o módulo que converte sinal elétrico em luz, como um SFP); no rádio, ondas num canal.</li>\n    <li>O receptor mede o sinal, separa o que é informação do que é ruído e reconstrói os bits.</li>\n    <li>Se a qualidade for ruim, surgem erros, retransmissões, perda, taxa baixa ou queda de link.</li>\n  </ol>\n  <h3>Autonegociação, velocidade, duplex e CRC</h3>\n  <p>Ao conectar o cabo, as duas pontas usam a <strong>autonegociação</strong> para escolher a maior velocidade e o duplex que ambas suportam. <strong>Full duplex</strong> transmite e recebe ao mesmo tempo; <strong>half duplex</strong>, herança dos meios compartilhados antigos, alterna e tem colisões.</p>\n  <ul>\n    <li><strong>Velocidade abaixo do esperado:</strong> 1 Gbps (1000BASE-T) usa os quatro pares do cabo; 100 Mbps usa só dois. Com um par rompido, crimpagem ruim ou patch cord inadequado, muitos equipamentos sobem a 100 Mbps.</li>\n    <li><strong>Duplex mismatch:</strong> se um lado está fixo (ex.: 100/full) e o outro em automático, o automático detecta a velocidade, mas não o duplex, e assume half. O lado half registra <em>late collisions</em> (colisões tardias); o full, erros FCS/CRC. O ping funciona, mas a vazão despenca sob carga. Configure os dois lados iguais, de preferência ambos em automático.</li>\n    <li><strong>Erro CRC:</strong> o transmissor anexa ao quadro um código de verificação (FCS); o receptor recalcula e, se não bater, descarta o quadro e soma no contador de CRC. A verificação é da Camada 2, mas a causa costuma ser física: cabo, conector, interferência, transceptor ou porta.</li>\n  </ul>\n  <p>Os contadores de erro acumulam desde que o equipamento ligou ou desde que alguém os zerou: um número alto pode ser de ontem. Compare duas leituras com alguns minutos de intervalo; só o contador crescendo indica falha agora. E lembre que, do seu computador, você vê só o próprio link: os contadores da porta do switch e a visão do AP ficam nesses equipamentos.</p>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li>\"O LED está aceso\": link aceso não descarta CRC, velocidade baixa ou quedas rápidas do link.</li>\n      <li>Trocar switch ou firewall antes de testar o patch cord: comece pelo simples e reversível.</li>\n      <li>Insistir na Camada 1 com link up, velocidade certa e erros estáveis: aí a investigação sobe de camada.</li>\n    </ul>\n  </div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense na Camada 1 como a estrada por onde a carga passa: mesmo com endereço e documentos corretos, a entrega falha se a ponte caiu. A diferença é que o sinal não chega intacto como um caminhão: o receptor reconstrói os bits a partir de um sinal enfraquecido e com ruído.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Seu notebook está ligado por cabo ao roteador, mas a internet fica instável. Você troca o DNS, reinicia o navegador e culpa o provedor. Depois percebe que o conector RJ-45 está frouxo: no <code>Get-NetAdapter</code>, o Status da placa alterna entre Up e Disconnected. Cada queda do link derruba tudo o que estava em cima dele. O problema era Camada 1, e a solução foi trocar o patch cord.</p>\n  <p>No Wi-Fi, o mesmo notebook longe do roteador, com duas paredes no caminho, recebe sinal fraco: a taxa cai e o rádio retransmite muitos quadros. O site parece lento, mas o problema começa no rádio. Levar o notebook para perto do roteador, ou ligá-lo no cabo, é o teste que separa as duas coisas.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 420\" role=\"img\" aria-labelledby=\"m02l03-title m02l03-desc\">\n    <title id=\"m02l03-title\">Camada 1: bits virando sinais físicos</title>\n    <desc id=\"m02l03-desc\">Diagrama mostrando bits saindo de um host e sendo transmitidos por cobre, fibra e rádio até equipamentos de rede.</desc>\n    <defs>\n      <marker id=\"m02l03-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"150\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n    <text x=\"110\" y=\"202\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bits 0/1</text>\n    <rect x=\"250\" y=\"60\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"325\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Cobre</text>\n    <text x=\"325\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sinal elétrico</text>\n    <rect x=\"250\" y=\"175\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"325\" y=\"203\" text-anchor=\"middle\" class=\"svg-label\">Fibra</text>\n    <text x=\"325\" y=\"227\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">pulsos de luz</text>\n    <rect x=\"250\" y=\"290\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"325\" y=\"318\" text-anchor=\"middle\" class=\"svg-label\">Rádio</text>\n    <text x=\"325\" y=\"342\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">onda no ar</text>\n    <rect x=\"520\" y=\"150\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"595\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Equipamento</text>\n    <text x=\"595\" y=\"202\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">reconstrói bits</text>\n    <rect x=\"760\" y=\"150\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"835\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n    <text x=\"835\" y=\"202\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">link, erros, SNR</text>\n    <line x1=\"180\" y1=\"185\" x2=\"250\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"180\" y1=\"185\" x2=\"250\" y2=\"210\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"180\" y1=\"185\" x2=\"250\" y2=\"325\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"400\" y1=\"95\" x2=\"520\" y2=\"185\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"400\" y1=\"210\" x2=\"520\" y2=\"185\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"400\" y1=\"325\" x2=\"520\" y2=\"185\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"670\" y1=\"185\" x2=\"760\" y2=\"185\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <text x=\"480\" y=\"35\" text-anchor=\"middle\" class=\"svg-label\">Camada 1 não interpreta aplicação: ela transporta sinais</text>\n    <text x=\"480\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ruído, atenuação, interferência, distância e energia afetam todas as camadas acima.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> a Camada 1 transforma bits em sinal e sinal em bits; se o meio falha, as camadas acima herdam a falha.</li>\n    <li>Cobre: até 100 m. Fibra: quilômetros. Rádio: canal compartilhado.</li>\n    <li>Evidências: link, velocidade e duplex, CRC crescendo entre duas leituras, RSSI e SNR.</li>\n    <li>100 Mbps no lugar de 1 Gbps sugere par danificado; lado fixo contra automático gera duplex mismatch.</li>\n    <li>Olhe link e erros antes de culpar DNS, firewall ou aplicação.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 2.4, Camada 2 — Enlace: frames, MAC, switch, VLAN e ARP, você vai ver como a rede local organiza esses bits em quadros e entrega o tráfego dentro da LAN.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "Ethernet PHY",
      "IEEE 802.3",
      "IEEE 802.11",
      "Auto-negociação",
      "PoE"
    ],
    "dependsOn": [
      "bits e sinais",
      "meios de transmissão",
      "topologia física",
      "métricas de rede",
      "diagnóstico inicial"
    ],
    "enables": [
      "Camada 2",
      "Ethernet",
      "Wi-Fi",
      "switching",
      "VLAN",
      "ARP",
      "troubleshooting físico"
    ]
  },
  "lab": {
    "id": "lab-2.3",
    "title": "Lendo as evidências de Camada 1 do seu computador",
    "labType": "security",
    "objective": "Identificar o meio da sua conexão e ler estado do link, velocidade, duplex, erros e sinal Wi-Fi com comandos só de leitura.",
    "prerequisites": [
      "Ter acesso ao terminal do próprio computador. Os comandos só leem informações; nada é alterado."
    ],
    "tools": [
      "Windows PowerShell",
      "Terminal Linux (ip, ethtool e iw)"
    ],
    "estimatedTimeMinutes": 15,
    "steps": [
      {
        "number": 1,
        "title": "Identificar o meio usado",
        "instruction": "Determine se sua conexão principal usa cabo, Wi-Fi ou outro meio, e descarte interfaces virtuais.",
        "command": "Windows: Get-NetAdapter | Format-Table Name, InterfaceDescription, Status, LinkSpeed\nLinux: ip link show",
        "expectedOutput": "Interfaces com estado; no Windows, descrição e velocidade. No Linux, nomes como eth0/enp0s3 indicam cabo e wlan0/wlp2s0, Wi-Fi.",
        "explanation": "Antes de diagnosticar, você precisa saber qual meio físico sustenta sua conexão."
      },
      {
        "number": 2,
        "title": "Verificar velocidade, duplex e erros (cabo)",
        "instruction": "Se estiver no cabo, anote velocidade, duplex e contadores de erro. Espere alguns minutos e leia os erros de novo. No Linux, troque eth0 pelo nome da sua interface cabeada visto no passo 1.",
        "command": "Windows: netstat -e\nLinux: ethtool eth0 && ip -s link show eth0",
        "expectedOutput": "Linux: Speed e Duplex esperados (ex.: 1000Mb/s, Full) e RX/TX errors iguais nas duas leituras. Windows: a velocidade veio no passo 1; netstat -e mostra Errors e Discards, que também devem ficar estáveis.",
        "explanation": "Velocidade abaixo do esperado (100 Mb/s onde deveria haver 1000) sugere par danificado, patch cord ruim ou autonegociação; Duplex: Half sugere duplex mismatch; erros crescendo entre as duas leituras indicam problema no meio agora. Se o ethtool não estiver instalado, use só o ip -s link."
      },
      {
        "number": 3,
        "title": "Coletar evidência Wi-Fi, se aplicável",
        "instruction": "Se estiver no Wi-Fi, veja sinal, canal e taxa de transmissão. Depois, afaste-se do roteador (ou coloque uma parede no caminho) e repita o comando. No Linux, troque wlan0 pelo nome da sua interface sem fio.",
        "command": "Windows: netsh wlan show interfaces\nLinux: iw dev wlan0 link",
        "expectedOutput": "SSID, sinal (% no Windows, dBm no Linux), canal e taxa. Longe do roteador, o sinal e a taxa caem.",
        "explanation": "Você vê na prática que o rádio varia com a distância e com obstáculos. O comando mostra a força do sinal (RSSI), não a SNR: sinal bom com rede ruim pede olhar canal, ruído e número de clientes."
      }
    ],
    "expectedResult": "Você sabe qual meio sustenta sua conexão e anotou o estado do link, a velocidade e o duplex (ou o sinal e a taxa do Wi-Fi) e se os contadores de erro estão estáveis ou crescendo."
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "Um usuário diz: \"meu Wi-Fi está com sinal cheio, então o problema não é a rede\". Como você responderia e que evidências pediria?",
      "hints": [
        "O que as barras de sinal medem de fato?",
        "Pense em ruído, canal e quantos clientes dividem o ar."
      ],
      "expectedIdeas": [
        "barras mostram RSSI, não qualidade",
        "SNR",
        "canal congestionado ou interferência",
        "retransmissões",
        "número de clientes",
        "comparar com cabo"
      ],
      "explanation": "Sinal forte com ruído alto ainda dá SNR baixo, e canal cheio ou com interferência gera retransmissões e jitter. Repetir o teste no cabo isola o rádio."
    },
    {
      "type": "aplicação",
      "question": "Uma estação alterna entre 1 Gbps e 100 Mbps ao longo do dia. Como você investigaria, em que ordem, sem trocar equipamentos caros logo de cara?",
      "hints": [
        "Quantos pares 1 Gbps usa, e quantos 100 Mbps usa?",
        "Que testes são baratos e reversíveis? Troque um elemento por vez."
      ],
      "expectedIdeas": [
        "coletar velocidade e erros antes de mexer",
        "trocar o patch cord",
        "testar outra porta ou tomada conhecida",
        "comparar contadores de erro em duas leituras",
        "só depois suspeitar de placa ou switch"
      ],
      "explanation": "A queda para 100 Mbps aponta para um par com problema. Comece pelas evidências e pelo mais simples: patch cord, depois tomada e porta. Trocando um elemento por vez, você descobre qual deles leva o defeito junto."
    }
  ],
  "quiz": [
    {
      "id": "q2.3.1",
      "question": "Qual destas tarefas pertence à Camada 1 do Modelo OSI?",
      "options": [
        "Verificar o FCS do quadro e descartar quadros corrompidos",
        "Aprender em qual porta do switch está cada MAC",
        "Converter bits em sinal elétrico, luz ou rádio e reconstruí-los no receptor",
        "Escolher a interface de saída pelo IP de destino"
      ],
      "answer": 2,
      "explanation": "A Camada 1 transmite bits como sinais físicos. FCS e tabela MAC são Camada 2; escolher a saída por IP é Camada 3.",
      "topic": "camada física",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.3.7",
      "question": "Uma estação deveria negociar 1 Gbps, mas o ethtool mostra Speed: 100Mb/s. O cabo passa por tomada e patch panel. Qual hipótese você testa primeiro?",
      "options": [
        "DNS lento reduzindo a velocidade do link",
        "Par danificado no cabo ou no patch cord",
        "Rota padrão errada na estação",
        "Firewall limitando a banda da estação"
      ],
      "answer": 1,
      "explanation": "1 Gbps usa os quatro pares e 100 Mbps só dois; com um par ruim, muitos equipamentos sobem a 100 Mbps. DNS, rota e firewall não mudam a velocidade negociada.",
      "topic": "autonegociação",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.3.3",
      "question": "Um notebook no Wi-Fi recebe IP, mas chamadas ficam picotando e o sinal é fraco. Qual hipótese deve entrar cedo no diagnóstico?",
      "options": [
        "Falha no DHCP",
        "Erro de certificado TLS",
        "Rota padrão ausente",
        "Problema de RF: sinal fraco, interferência ou distância"
      ],
      "answer": 3,
      "explanation": "O IP veio (DHCP ok) e as chamadas passam, mas picotam: há perda e jitter. Com sinal fraco, RF entra cedo. Sem rota padrão, as chamadas nem completariam.",
      "topic": "wi-fi",
      "difficulty": "iniciante-intermediário",
      "type": "cenário"
    },
    {
      "id": "q2.3.6",
      "question": "Você suspeita de cabo ou porta com defeito numa estação ligada por cabo. Qual evidência é a mais direta?",
      "options": [
        "O contador de erros CRC da interface crescendo entre duas leituras",
        "A rota padrão presente na tabela de rotas",
        "O nome do site resolvido pelo DNS",
        "O certificado TLS do servidor válido"
      ],
      "answer": 0,
      "explanation": "Erros CRC crescendo mostram quadros chegando corrompidos, o que costuma ter causa física: cabo, conector, interferência ou porta. Rota, DNS e certificado são de outras camadas e não mostram a qualidade do sinal.",
      "topic": "evidências",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.3.8",
      "question": "Numa sala de reunião, o Wi-Fi funciona bem com 3 pessoas, mas fica lento quando 30 entram, todas com sinal forte. Qual a explicação mais provável?",
      "options": [
        "O roteador passou a bloquear o DNS",
        "Os clientes do mesmo canal se revezam para transmitir, e o tempo de cada um diminui",
        "O cabo de cobre da sala passou de 100 m",
        "Cada cliente novo precisa de um cabo de cobre adicional"
      ],
      "answer": 1,
      "explanation": "O rádio é um meio compartilhado: no mesmo canal, os clientes se revezam. Com mais clientes, cada um transmite menos tempo, e a força do sinal não mostra isso.",
      "topic": "wi-fi",
      "difficulty": "iniciante-intermediário",
      "type": "cenário"
    },
    {
      "id": "q2.3.9",
      "question": "Dois prédios a 10 km de distância precisam de um link cabeado entre seus switches. Qual meio é o adequado?",
      "options": [
        "Par trançado de cobre, direto entre os prédios",
        "Rádio Wi-Fi do escritório",
        "Fibra óptica monomodo",
        "Fibra óptica multimodo"
      ],
      "answer": 2,
      "explanation": "O cobre vai até 100 m por segmento, a fibra multimodo alcança centenas de metros e o Wi-Fi interno, dezenas. Para quilômetros, a fibra monomodo é a escolha.",
      "topic": "meios",
      "difficulty": "iniciante",
      "type": "aplicação"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.3.7",
      "front": "Qual a diferença entre RSSI e SNR no Wi-Fi?",
      "back": "RSSI é a força do sinal recebido (geralmente em dBm). SNR é quanto o sinal fica acima do ruído (em dB). Sinal forte com ruído alto ainda dá SNR baixo e rede ruim.",
      "tags": [
        "wi-fi",
        "rf"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.3.2",
      "front": "O que é atenuação?",
      "back": "Perda de intensidade do sinal ao longo do meio de transmissão.",
      "tags": [
        "sinal",
        "fibra",
        "cobre"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.3.3",
      "front": "O que erros CRC podem indicar?",
      "back": "Problemas físicos ou de enlace, como cabo ruim, porta defeituosa, interferência ou transceptor com problema.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.3.4",
      "front": "Por que Wi-Fi sofre mais variação que cabo?",
      "back": "Porque usa rádio em meio compartilhado, sujeito a distância, obstáculos, interferência e concorrência de canais.",
      "tags": [
        "wi-fi",
        "rf"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.3.5",
      "front": "Camada 1 autentica usuários?",
      "back": "Não. A Camada 1 só transmite e recebe sinais; autenticação é tarefa de camadas superiores e de sistemas de identidade.",
      "tags": [
        "camada física"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.3.8",
      "front": "Um contador de CRC alto prova que o problema está acontecendo agora?",
      "back": "Não. Contadores acumulam desde que o equipamento ligou ou desde que foram zerados. Compare duas leituras: só o contador crescendo indica falha atual.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.3.9",
      "front": "Por que um cabo com um par danificado costuma subir a 100 Mbps em vez de 1 Gbps?",
      "back": "1 Gbps (1000BASE-T) usa os quatro pares do cabo; 100 Mbps usa só dois. Sem um dos pares, a autonegociação cai para a velocidade que ainda funciona.",
      "tags": [
        "autonegociação",
        "cobre"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.3.6",
      "type": "classificação",
      "prompt": "Classifique cada evidência como Camada 1 ou outra camada: (a) ethtool mostra Speed: 100Mb/s numa porta de 1 Gbps; (b) o nslookup não resolve o nome do site; (c) RX errors cresce entre duas leituras; (d) o Wi-Fi mostra sinal de -82 dBm; (e) o computador não tem rota padrão; (f) ethtool mostra Link detected: no.",
      "expectedAnswer": "(a) Camada 1: velocidade negociada abaixo do esperado. (b) Outra camada: resolução de nomes (DNS). (c) Camada 1: quadros corrompidos no meio, contados pela verificação da Camada 2. (d) Camada 1: sinal de rádio fraco. (e) Outra camada: roteamento (Camada 3). (f) Camada 1: não há link físico.",
      "explanation": "Separar o que é do meio do que é lógico evita gastar horas na camada errada."
    },
    {
      "id": "ex2.3.5",
      "type": "diagnóstico",
      "prompt": "O ethtool do servidor mostra Speed: 100Mb/s, Duplex: Half. A porta do switch foi configurada fixa em 100/full, e o contador de erros FCS/CRC dela cresce. O ping funciona, mas cópias de arquivo são lentíssimas. O que está acontecendo e como corrigir?",
      "expectedAnswer": "Duplex mismatch: a porta do switch está fixa em 100/full; o servidor, em automático, detecta a velocidade mas não o duplex e assume half. O lado full acumula FCS/CRC; o half, late collisions. Configure os dois lados iguais (de preferência automático) em janela autorizada e confirme que os contadores param de crescer.",
      "explanation": "Ping gera pouco tráfego; sob carga, colisões e descartes derrubam a vazão."
    }
  ],
  "challenge": {
    "title": "Diagnóstico de queda intermitente no escritório",
    "scenario": "Uma equipe reclama que o sistema interno cai várias vezes ao dia. O firewall não mostra bloqueio e o DNS resolve normalmente. Alguns usuários estão por cabo e outros por Wi-Fi. Há relatos de mudança recente no rack.",
    "tasks": [
      "Montar hipóteses de Camada 1 para os usuários no cabo e para os usuários no Wi-Fi.",
      "Dizer quais evidências coletar no computador, no switch e no AP, e em que ordem.",
      "Propor uma correção reversível e dizer como confirmar que ela funcionou."
    ],
    "expectedDeliverables": [
      "Uma lista de hipóteses com a evidência que confirma ou descarta cada uma."
    ]
  },
  "commentedSolution": {
    "reasoning": "Os sintomas aparecem na aplicação, mas DNS e firewall estão normais e houve mudança recente no rack. Isso torna cabo, patch panel, porta ou uplink suspeitos. Usuários no cabo e no Wi-Fi precisam ser analisados separadamente.",
    "steps": [
      "Descobrir quais usuários são afetados e por qual meio se conectam: se só os do cabo caem, o rack sobe na lista.",
      "Nos computadores afetados, ler estado do link, velocidade e duplex, e ver se o link cai junto com o sistema.",
      "No switch, ler duas vezes os contadores de erro das portas afetadas e verificar se o link delas cai e volta.",
      "No AP, ver sinal, canal e número de clientes dos usuários do Wi-Fi.",
      "Trocar o patch cord ou mover o usuário para uma porta testada, em janela autorizada, e confirmar que os erros param de crescer e as quedas somem."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Reiniciar o servidor de aplicação imediatamente.",
        "whyItIsWrong": "Não há evidência inicial de falha de aplicação; isso pode gerar indisponibilidade sem atacar a causa."
      },
      {
        "answer": "Comprar um firewall novo.",
        "whyItIsWrong": "O firewall não mostra bloqueio e a hipótese física ainda não foi descartada."
      }
    ],
    "finalAnswer": "Comece pelas evidências de Camada 1, correlacione com a mudança no rack, separe usuários no cabo e no Wi-Fi e faça testes reversíveis autorizados. Só suba de camada quando link, velocidade e erros estiverem normais."
  },
  "glossary": [
    {
      "term": "Atenuação",
      "shortDefinition": "Perda de intensidade do sinal ao longo do meio de transmissão.",
      "longDefinition": "Acontece em cobre, fibra e rádio e aumenta com a distância. Quando o sinal chega fraco demais, o receptor erra os bits.",
      "example": "Fibra dobrada demais ou conector sujo aumentam a atenuação.",
      "relatedLessons": [
        "1.5"
      ]
    },
    {
      "term": "Patch cord",
      "shortDefinition": "Cabo curto que liga o computador à tomada ou a porta do switch ao patch panel.",
      "example": "Trocar o patch cord é o primeiro teste barato quando uma porta mostra erros ou velocidade baixa.",
      "relatedLessons": [
        "1.6"
      ]
    },
    {
      "term": "Quadro",
      "shortDefinition": "Unidade de dados da Camada 2: o que a placa de rede entrega à Camada 1 para virar sinal.",
      "example": "O FCS no fim do quadro permite ao receptor detectar bits trocados no caminho.",
      "relatedLessons": [
        "2.2"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Referência conceitual para Ethernet e camada física/enlace."
    },
    {
      "type": "standard",
      "title": "IEEE 802.11 Wireless LAN",
      "organization": "IEEE",
      "url": "",
      "note": "Referência conceitual para redes sem fio."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 1.5",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Meios de transmissão: cobre, fibra e rádio."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Encapsulamento, desencapsulamento e PDUs."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e Operação",
      "lesson": "SRE e SLIs",
      "reason": "Métricas físicas e disponibilidade sustentam SLIs e troubleshooting operacional."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso Corporativo",
      "lesson": "Controle de acesso à rede",
      "reason": "Controles como 802.1X/NAC conectam camada física, rede e identidade."
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
      "2.4"
    ]
  }
};
