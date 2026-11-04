export const lesson0005 = {
  "id": "0.5",
  "moduleId": "m00",
  "order": 5,
  "title": "Como sinais físicos carregam dados",
  "subtitle": "Como cobre, fibra e rádio transformam bits em sinais reais — e por que isso muda troubleshooting, disponibilidade e segurança.",
  "duration": "15-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 175,
  "tags": [
    "fundamentos",
    "camada física",
    "sinais",
    "cobre",
    "fibra",
    "wi-fi",
    "rádio",
    "ruído",
    "interferência",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "A aula 0.1 explica que computadores representam informação por estados interpretados como bits."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A aula 0.2 apresenta bits e bytes, que serão transportados fisicamente."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.4",
      "reason": "A aula 0.4 mostra que taxa de transmissão e throughput dependem do meio físico e de overhead."
    }
  ],
  "objectives": [
    "Explicar como bits viram sinais físicos (tensão, luz ou rádio), como o receptor os transforma de volta em bits e por que atenuação e ruído causam erros e perda.",
    "Diferenciar cobre, fibra óptica e rádio (Wi‑Fi) pelo tipo de sinal, pela vantagem e pela limitação típica de cada meio, incluindo o meio compartilhado do Wi‑Fi.",
    "Verificar no próprio computador o status do link, a velocidade negociada e o sinal Wi‑Fi, e diferenciar link ausente de link degradado."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Você provavelmente já passou por isto: ao lado do roteador, o Wi‑Fi está ótimo; no quarto do fundo, a chamada de vídeo trava e as páginas demoram a abrir. O site é o mesmo, a operadora é a mesma e o notebook também. O que mudou foi o caminho físico entre o notebook e o roteador: a distância, as paredes e os outros aparelhos usando o mesmo ar.</p>\n  <p>\n    Sem entender isso, é comum culpar a internet, o site ou o computador, e mexer no que não está quebrado. Nesta aula você vê como os bits viram eletricidade, luz ou ondas de rádio, por que esses sinais se degradam no caminho e onde o seu próprio computador mostra isso. No trabalho, é o que separa quem resolve uma queda trocando um cabo em minutos de quem passa horas revendo configurações que estavam certas.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    É isso que acontece quando o sinal chega fraco ou misturado com ruído. Na aula 0.1 você viu que o hardware mede um fenômeno físico e decide se ele é 0 ou 1. Essa decisão só é fácil quando o sinal chega forte e limpo. No caminho, ele perde força com a distância e recebe ruído de motores, lâmpadas, outros cabos e outros rádios.</p>\n  <p>\n    Quando o receptor decide errado, os dados chegam corrompidos e são descartados. Você vê perda, lentidão e quedas, mesmo com o ícone dizendo “conectado”. Por isso uma rede pode estar com tudo configurado certo e ainda funcionar mal. Esta aula mostra como cobre, fibra e rádio carregam os bits, o que degrada cada um e como reconhecer um problema físico antes de procurar o defeito em outro lugar.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> transportar dados fisicamente é converter bits em sinais capazes de atravessar um meio e, no destino, reconverter esses sinais em bits com o mínimo de erros.\n  </div>\n  <p>\n    Um <strong>sinal físico</strong> é uma variação mensurável num meio: tensão elétrica num cabo de cobre, luz numa fibra óptica ou uma onda de rádio no ar. Em redes, tudo o que trata do meio, do conector, da forma do sinal, da distância máxima e da velocidade se chama <strong>camada física</strong> (a ideia de camadas vem na aula 0.8). Ela não decide endereço, caminho nem conteúdo: só entrega bits. Se ela falha, tudo o que depende dela fica instável.</p>\n  <h3>Três meios, três jeitos de carregar bits</h3>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Meio</th><th>Sinal</th><th>Por que se usa</th><th>Limitação típica</th></tr></thead>\n      <tbody>\n        <tr><td>Cobre (o cabo de rede comum, com pares de fios trançados)</td><td>Variação de tensão nos fios</td><td>Barato, flexível, fácil de instalar</td><td>Até cerca de 100 m por cabo; sofre interferência elétrica; depende de conectores bem montados</td></tr>\n        <tr><td>Fibra óptica</td><td>Pulsos de luz guiados dentro de um fio de vidro</td><td>Alcança de centenas de metros a quilômetros, com alta capacidade; imune a interferência elétrica</td><td>Mais cara; não tolera curvas fortes nem conectores sujos</td></tr>\n        <tr><td>Rádio (Wi‑Fi)</td><td>Ondas eletromagnéticas no ar</td><td>Mobilidade, sem cabo</td><td>Perde força com distância e paredes; sofre interferência; meio compartilhado</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>\n    <strong>Meio compartilhado</strong> é a diferença mais importante do Wi‑Fi. No cabo, cada computador tem o seu próprio fio até o equipamento da rede. No Wi‑Fi, todos os aparelhos ligados ao mesmo roteador, no mesmo canal, dividem o mesmo ar e se revezam para transmitir: quanto mais aparelhos ativos, menor a fatia de tempo de cada um.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Os bytes que a aplicação quer enviar já viraram bits. A partir daí, a placa de rede (ou o rádio Wi‑Fi) e o meio fazem este caminho:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Conversão em sinal:</strong> a placa transforma os bits em padrões físicos: níveis de tensão, pulsos de luz ou variações numa onda de rádio. Os padrões reais não são só “alto = 1, baixo = 0”: usam vários níveis para levar mais bits por vez.</li>\n    <li><strong>Transmissão:</strong> o meio carrega o sinal até o outro lado.</li>\n    <li><strong>Atenuação:</strong> o sinal perde força com a distância, os conectores e as paredes.</li>\n    <li><strong>Ruído e interferência:</strong> sinais indesejados, de motores, fontes de energia e outros rádios, se somam ao sinal.</li>\n    <li><strong>Recepção:</strong> o receptor mede o que chegou e decide quais bits aquilo representa. Quanto maior a diferença entre a força do sinal e a do ruído (a <strong>relação sinal‑ruído</strong>, ou SNR), mais fácil decidir certo.</li>\n    <li><strong>Verificação:</strong> os dados viajam em blocos, e cada bloco leva no fim um código de verificação (o CRC). Se um único bit chegou trocado, o código não confere e o bloco inteiro é descartado; ele só volta se algum protocolo pedir o reenvio, o que custa tempo.</li>\n  </ol>\n  <p>\n    Por isso nem todo problema físico aparece como “cabo desconectado”. A camada física pode estar <strong>ausente</strong> (sem sinal, sem link) ou <strong>degradada</strong> (o link existe, mas com velocidade abaixo do esperado, perdas, quedas curtas ou Wi‑Fi oscilando). No cabo, um bom indicador é a <strong>velocidade negociada</strong>: ao conectar, as duas pontas combinam a maior velocidade que ambas suportam, e um cabo ruim pode deixá-la abaixo do esperado.</p>\n  <h3>Como isso aparece no seu computador</h3>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>O que você vê</th><th>Onde ver</th><th>O que sugere</th></tr></thead>\n      <tbody>\n        <tr><td><code>Disconnected</code> (Windows) ou <code>NO-CARRIER</code> e <code>state DOWN</code> (Linux)</td><td><code>Get-NetAdapter</code>, <code>ip link</code></td><td>Link ausente: cabo solto ou rompido, equipamento do outro lado desligado</td></tr>\n        <tr><td><code>Up</code> (Windows) ou <code>LOWER_UP</code> (Linux)</td><td><code>Get-NetAdapter</code>, <code>ip link</code></td><td>Há sinal; o link existe</td></tr>\n        <tr><td>Velocidade abaixo do esperado (100 Mbps em vez de 1 Gbps)</td><td><code>Get-NetAdapter</code>, <code>ethtool</code></td><td>Link degradado: cabo ruim, conector mal montado, porta antiga</td></tr>\n        <tr><td>Sinal fraco, taxa do Wi‑Fi variando</td><td><code>netsh wlan show interfaces</code>, <code>nmcli dev wifi list</code></td><td>Distância, paredes, interferência ou canal disputado</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <div class=\"callout warning\">\n    <strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Ignorar a velocidade negociada.</strong> O ícone só diz “conectado”; um cabo ruim pode deixar em 100 Mbps um link de 1 Gbps.</li>\n      <li><strong>Tirar conclusão sobre o Wi‑Fi com um teste só.</strong> O rádio muda com o lugar, o horário e o número de aparelhos ativos.</li>\n      <li><strong>Culpar a camada física sem evidência.</strong> Com link na velocidade esperada e sinal bom, trocar cabos não resolve.</li>\n    </ul>\n  </div>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Imagine mandar uma mensagem com uma lanterna: piscada curta é 0, piscada longa é 1. Se a outra pessoa conhece o código e vê a luz com clareza, reconstrói a mensagem. Com neblina, muita distância ou outra luz piscando ao lado, ela confunde as piscadas e lê errado.</p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Você liga o notebook ao roteador de casa com um cabo de rede e o sistema mostra link de 1 Gbps. Esse número é a velocidade negociada: a placa do notebook e o roteador anunciaram as velocidades que suportam e combinaram a maior que os dois têm em comum.</p>\n  <p>\n    Agora troque por um cabo velho, com um fio rompido ou um conector mal preso. No cobre, 1 Gbps usa os quatro pares de fios do cabo, e 100 Mbps usa só dois. Com um par ruim, o cabo não sustenta 1 Gbps: o link pode subir em 100 Mbps ou ficar caindo e voltando. O ícone continua dizendo “conectado”, mas baixar um arquivo de 1 GB, que levaria no mínimo cerca de 8 segundos a 1 Gbps, passa a levar no mínimo cerca de 80 segundos (1 GB = 8.000 megabits; 8.000 ÷ 100 = 80). Trocar o cabo resolve; reinstalar o navegador, não.</p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <p>\n    Os mesmos bits, <code>10110010</code>, podem atravessar qualquer um dos três meios; em todos, o sinal chega ao receptor com atenuação e ruído.\n  </p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 430\" role=\"img\" aria-labelledby=\"m00l05-title m00l05-desc\">\n    <title id=\"m00l05-title\">Bits representados por sinais físicos em cobre, fibra e rádio</title>\n    <desc id=\"m00l05-desc\">Um transmissor converte bits em sinais que podem atravessar cabo de cobre, fibra óptica ou rádio até um receptor, sujeito a ruído, atenuação e interferência.</desc>\n    <defs>\n      <marker id=\"m00l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"35\" y=\"170\" width=\"145\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"107\" y=\"198\" text-anchor=\"middle\" class=\"svg-label\">Transmissor</text>\n    <text x=\"107\" y=\"224\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bits: 10110010</text>\n\n    <rect x=\"790\" y=\"170\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"865\" y=\"198\" text-anchor=\"middle\" class=\"svg-label\">Receptor</text>\n    <text x=\"865\" y=\"224\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">interpreta sinais</text>\n\n    <rect x=\"250\" y=\"45\" width=\"460\" height=\"80\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"73\" text-anchor=\"middle\" class=\"svg-label\">Cobre</text>\n    <path d=\"M290 100 L330 65 L370 100 L410 65 L450 100 L490 65 L530 100 L570 65 L610 100 L650 65\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <text x=\"480\" y=\"118\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">variação elétrica: tensão/corrente</text>\n\n    <rect x=\"250\" y=\"175\" width=\"460\" height=\"80\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"203\" text-anchor=\"middle\" class=\"svg-label\">Fibra óptica</text>\n    <line x1=\"295\" y1=\"228\" x2=\"665\" y2=\"228\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <circle cx=\"335\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <circle cx=\"425\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <circle cx=\"515\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <circle cx=\"605\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <text x=\"480\" y=\"248\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">pulsos de luz guiados pela fibra</text>\n\n    <rect x=\"250\" y=\"305\" width=\"460\" height=\"80\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"333\" text-anchor=\"middle\" class=\"svg-label\">Rádio / Wi‑Fi</text>\n    <path d=\"M305 358 C365 318, 420 398, 480 358 S595 318, 655 358\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <text x=\"480\" y=\"378\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">onda eletromagnética compartilhada no ar</text>\n\n    <line x1=\"180\" y1=\"210\" x2=\"250\" y2=\"85\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"180\" y1=\"210\" x2=\"250\" y2=\"215\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"180\" y1=\"210\" x2=\"250\" y2=\"345\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n\n    <line x1=\"710\" y1=\"85\" x2=\"790\" y2=\"210\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"710\" y1=\"215\" x2=\"790\" y2=\"210\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"710\" y1=\"345\" x2=\"790\" y2=\"210\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n\n    <rect x=\"350\" y=\"5\" width=\"260\" height=\"30\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"480\" y=\"26\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ruído, atenuação, interferência e erro</text>\n  </svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> bits viram sinal físico (tensão, luz ou rádio), e o receptor decide de volta o que é 0 e 1.</li>\n    <li>Atenuação e ruído causam erros; um bit errado faz o bloco de dados ser descartado.</li>\n    <li>Cobre: barato, até ~100 m. Fibra: longe, sem interferência elétrica. Wi‑Fi: mobilidade, meio compartilhado.</li>\n    <li>Link ausente (sem sinal) não é link degradado (conectado, mas lento ou com perdas).</li>\n    <li>Confira status, velocidade negociada e sinal antes de culpar outra coisa.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula <strong>0.6 — Latência, largura de banda e throughput</strong>, você vai separar três medidas que aparecem em quase todo diagnóstico: quanto cabe no caminho, quanto realmente passa e quanto tempo os dados levam para ir e voltar.\n  </p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "Ethernet",
      "Wi‑Fi",
      "IEEE 802.3",
      "IEEE 802.11"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "taxa de transmissão",
      "representação digital"
    ],
    "enables": [
      "Ethernet",
      "Wi‑Fi",
      "camada de enlace",
      "endereço MAC",
      "switching",
      "troubleshooting físico",
      "segurança de acesso à rede"
    ]
  },
  "lab": {
    "id": "lab-0.5",
    "title": "Vendo a camada física no seu computador",
    "labType": "security",
    "objective": "Ver o status e a velocidade negociada das interfaces, medir o sinal Wi‑Fi perto e longe do roteador e ver como o sistema mostra um link ausente.",
    "prerequisites": [
      "Um computador com Windows ou Linux, numa rede sua ou autorizada. Para o passo 4, uma conexão por cabo."
    ],
    "tools": [
      "Windows PowerShell ou terminal Linux",
      "No Linux: ethtool (opcional) e nmcli"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Ver status e velocidade das interfaces",
        "instruction": "Liste as interfaces de rede e anote, para cada uma, o status e a velocidade negociada.",
        "command": "Windows PowerShell: Get-NetAdapter | Format-Table Name, InterfaceDescription, Status, LinkSpeed\nLinux: ip link; e, para a interface cabeada: sudo ethtool enp3s0  (troque enp3s0 pelo nome que o ip link mostrou)",
        "expectedOutput": "Windows: Status Up ou Disconnected e LinkSpeed como 1 Gbps ou 100 Mbps. Linux: LOWER_UP e state UP na interface em uso; no ethtool, Speed: 1000Mb/s e Link detected: yes.",
        "explanation": "Up/LOWER_UP mostra que há sinal. Com cabo bom e equipamentos atuais, o comum é 1 Gbps ou mais; 100 Mbps num link de 1 Gbps pede investigar o cabo ou a porta."
      },
      {
        "number": 2,
        "title": "Medir o sinal Wi‑Fi perto do roteador",
        "instruction": "Conectado ao Wi‑Fi, fique a 1 ou 2 metros do roteador e veja o sinal e a taxa da conexão.",
        "command": "Windows: netsh wlan show interfaces\nLinux: nmcli dev wifi list  (a sua rede é a linha marcada com *)",
        "expectedOutput": "Windows: canal, taxas de recepção e transmissão (Mbps) e sinal em %, provavelmente acima de 80%. Linux: a coluna SIGNAL da sua rede, também alta.",
        "explanation": "Anote os números: são a referência do próximo passo."
      },
      {
        "number": 3,
        "title": "Repetir longe do roteador",
        "instruction": "Vá para o cômodo mais distante, com pelo menos uma parede no meio, espere alguns segundos e repita o comando do passo 2.",
        "command": "O mesmo do passo 2.",
        "expectedOutput": "Sinal menor (por exemplo, de 90% para 40%) e, no Windows, taxa de recepção e transmissão mais baixas.",
        "explanation": "A configuração não mudou; só o caminho do rádio, com mais distância e paredes. É a atenuação, medida por você."
      },
      {
        "number": 4,
        "title": "Ver um link ausente",
        "instruction": "Se o seu computador estiver no cabo, na sua casa, desconecte o cabo dele, repita o comando do passo 1 e depois reconecte.",
        "command": "O mesmo do passo 1.",
        "expectedOutput": "Windows: Status Disconnected. Linux: NO-CARRIER e state DOWN; no ethtool, Link detected: no.",
        "explanation": "Sem sinal não há link: camada física ausente. No passo 1 o link existia, e a velocidade dizia se estava degradado."
      }
    ],
    "expectedResult": "Você viu o status e a velocidade negociada das suas interfaces, o sinal Wi‑Fi caindo com distância e paredes e como o sistema mostra um link ausente."
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Uma empresa precisa ligar a rede de dois prédios a 500 metros um do outro. Dentro de cada prédio, as mesas usam cabo de cobre. Por que o trecho entre os prédios costuma ser de fibra?",
      "hints": [
        "Compare 500 m com o alcance de um cabo de cobre.",
        "Pense no que existe ao longo de um trajeto externo."
      ],
      "expectedIdeas": [
        "cobre chega a cerca de 100 m por cabo",
        "fibra alcança quilômetros",
        "fibra não sofre interferência elétrica",
        "nas mesas o cobre é barato e suficiente"
      ],
      "explanation": "O cobre chega a cerca de 100 m por cabo; a fibra alcança quilômetros e não sofre interferência elétrica no trajeto. Nas mesas, as distâncias são curtas e o cobre é mais barato."
    },
    {
      "type": "diagnóstico",
      "question": "Um cabo de rede passa pelo mesmo duto que os cabos de energia do motor de um elevador. Sempre que o elevador anda, a conexão daquele computador perde dados, mas o link continua em 1 Gbps. Explique o que acontece com o sinal e o que resolveria.",
      "hints": [
        "O que o motor acrescenta ao sinal no cobre?",
        "Por que o link não cai, mas há perda?"
      ],
      "expectedIdeas": [
        "interferência elétrica",
        "SNR menor",
        "blocos descartados pelo CRC",
        "link degradado, não ausente",
        "afastar o cabo ou usar fibra"
      ],
      "explanation": "O motor gera interferência que reduz a relação sinal-ruído. O receptor erra alguns bits, os blocos são descartados pelo CRC e há perda com o link ativo (degradado, não ausente). Afastar o cabo da fonte de interferência ou usar fibra no trecho resolve."
    }
  ],
  "quiz": [
    {
      "id": "q0.5.1",
      "question": "O que a camada física faz em uma rede?",
      "options": [
        "Traduz nomes de sites em endereços IP.",
        "Converte bits em sinais que o meio transporta e, no destino, sinais de volta em bits.",
        "Decide quais conexões o firewall deve bloquear.",
        "Criptografa os dados antes de enviá-los."
      ],
      "answer": 1,
      "explanation": "A camada física trata do sinal no meio: tensão, luz ou rádio. Nomes, firewall e criptografia são assuntos de outras partes da rede.",
      "topic": "camada física",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.5.2",
      "question": "Qual alternativa descreve melhor a fibra óptica?",
      "options": [
        "Usa apenas tensão elétrica em pares de cobre.",
        "Usa ondas de rádio e dispensa qualquer cabo.",
        "Usa pulsos de luz e não sofre interferência elétrica.",
        "É igual ao Wi‑Fi, mas com conector físico."
      ],
      "answer": 2,
      "explanation": "Fibra óptica transporta pulsos de luz, alcança grandes distâncias e não sofre interferência elétrica, mas exige cuidado com curvas e conectores.",
      "topic": "fibra",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.5.3",
      "question": "Um link cabeado esperado em 1 Gbps aparece como 100 Mbps. Qual hipótese física faz sentido testar primeiro?",
      "options": [
        "Cabo ou porta negociando abaixo do esperado.",
        "Servidor DNS com cache expirado.",
        "Senha incorreta no sistema operacional.",
        "Certificado TLS vencido."
      ],
      "answer": 0,
      "explanation": "Velocidade negociada abaixo do esperado aponta para o meio: cabo ruim ou inadequado, conector mal montado ou porta antiga. DNS, senha e certificado não mudam a velocidade do link.",
      "topic": "troubleshooting",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.5.5",
      "question": "No Wi‑Fi, a taxa cai muito quando o usuário se afasta do roteador. Qual explicação é mais provável?",
      "options": [
        "O roteador trocou o endereço IP do notebook.",
        "O sinal de rádio foi degradado por distância, paredes ou interferência.",
        "O site passou a responder mais devagar longe do roteador.",
        "O cabo que liga o roteador à internet passou a negociar 100 Mbps."
      ],
      "answer": 1,
      "explanation": "Wi‑Fi depende do caminho físico. Distância, paredes e interferência enfraquecem o sinal e reduzem a taxa. O endereço, o site e o cabo do roteador não mudam porque o usuário andou.",
      "topic": "wi-fi",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q0.5.8",
      "question": "Por que o throughput de cada notebook cai quando muitos dispositivos usam o mesmo AP e canal Wi‑Fi?",
      "options": [
        "Porque o rádio é um meio compartilhado: os dispositivos se revezam no mesmo canal.",
        "Porque cada dispositivo recebe um endereço IP mais lento.",
        "Porque o Wi‑Fi converte bits em pulsos de luz.",
        "Porque o cabo do roteador perde força com mais usuários."
      ],
      "answer": 0,
      "explanation": "No Wi‑Fi, o canal de rádio é compartilhado. Quanto mais dispositivos disputam o meio, menor a fatia de tempo de cada um e menor o throughput real.",
      "topic": "wi-fi",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.5.9",
      "question": "O notebook mostra o link como conectado, mas o sinal chega fraco e com muito ruído. O que acontece com os dados?",
      "options": [
        "Os bits chegam todos certos, só que mais devagar.",
        "A placa de rede adivinha os bits errados e os corrige sem custo.",
        "O link é desligado automaticamente até o ruído passar.",
        "O receptor erra alguns bits; os blocos com erro são descartados e só são recuperados se forem reenviados."
      ],
      "answer": 3,
      "explanation": "Com pouca diferença entre sinal e ruído, o receptor decide errado alguns bits. O código de verificação (CRC) não confere, o bloco é descartado e só volta se algum protocolo pedir o reenvio: o usuário vê perda e lentidão com o link ainda conectado.",
      "topic": "ruído e erros",
      "difficulty": "iniciante",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.5.1",
      "front": "O que é sinal físico em redes?",
      "back": "É uma variação elétrica, óptica ou eletromagnética usada para representar bits em um meio."
    },
    {
      "id": "fc0.5.2",
      "front": "Qual meio usa pulsos de luz?",
      "back": "Fibra óptica."
    },
    {
      "id": "fc0.5.3",
      "front": "Por que Wi‑Fi é mais variável que cabo?",
      "back": "Porque usa rádio num meio compartilhado, sujeito a distância, paredes, interferência e à disputa com outros aparelhos no mesmo canal."
    },
    {
      "id": "fc0.5.7",
      "front": "O que NO-CARRIER e LOWER_UP indicam na saída de ip link?",
      "back": "LOWER_UP: a interface detecta sinal físico (o link existe). NO-CARRIER: nenhum sinal detectado, como cabo solto ou equipamento do outro lado desligado."
    },
    {
      "id": "fc0.5.8",
      "front": "O que é a relação sinal-ruído (SNR)?",
      "back": "A relação entre a força do sinal útil e a do ruído. Quanto maior, mais fácil o receptor decidir certo entre 0 e 1, e menos erros."
    },
    {
      "id": "fc0.5.9",
      "front": "Link ausente × link degradado",
      "back": "Ausente: não há sinal nem link (Disconnected, NO-CARRIER). Degradado: o link existe, mas com velocidade abaixo do esperado, perdas, quedas curtas ou Wi‑Fi oscilando."
    }
  ],
  "exercises": [
    {
      "id": "ex0.5.5",
      "type": "diagnóstico",
      "prompt": "Interprete duas evidências: (a) no Linux, ip link mostra a interface cabeada com NO-CARRIER e state DOWN; (b) em outro notebook, ethtool mostra Speed: 100Mb/s e Link detected: yes, numa porta que deveria operar em 1 Gbps. Qual a hipótese principal em cada caso e o que você testaria primeiro?",
      "expectedAnswer": "(a) Não há sinal físico: cabo desconectado ou rompido, ou o equipamento do outro lado desligado; teste reconectar ou trocar o cabo. (b) O link existe, mas negociou abaixo do esperado: cabo inadequado ou defeituoso, conector mal montado ou porta antiga; teste outro cabo e outra porta.",
      "explanation": "O primeiro caso é camada física ausente; o segundo, degradada: um pede procurar a falta de link, o outro a qualidade do link."
    },
    {
      "id": "ex0.5.6",
      "type": "cálculo",
      "prompt": "Um roteador Wi‑Fi entrega, na prática, cerca de 300 Mbps no canal. Quanto cada notebook recebe, no máximo, se 10 deles baixam arquivos ao mesmo tempo? Converta para MB/s como na aula 0.4. E se só 2 estiverem baixando?",
      "expectedAnswer": "Com 10: cerca de 30 Mbps cada, ou seja, uns 3,75 MB/s (30 ÷ 8). Com 2: cerca de 150 Mbps cada, uns 18,75 MB/s. Na prática, um pouco menos, porque o revezamento no canal também gasta tempo.",
      "explanation": "O Wi‑Fi é um meio compartilhado: os aparelhos no mesmo canal se revezam, e a capacidade do canal é dividida entre os que estão transmitindo."
    }
  ],
  "challenge": {
    "title": "A sala de treinamento que cai durante as aulas",
    "scenario": "Numa sala de treinamento, alguns notebooks usam cabo e outros, Wi‑Fi. Com a sala cheia (30 alunos), o sistema interno trava para quem está no Wi‑Fi. No cabo, e em outros setores, o mesmo sistema funciona bem. A equipe pensa em reinstalar o sistema.",
    "tasks": [
      "Listar as hipóteses em ordem, começando pela camada física, e o detalhe do cenário que aponta para cada uma.",
      "Dizer que evidências coletar com os comandos do laboratório.",
      "Dizer por que reinstalar o sistema não é o primeiro passo e o que resolveria."
    ],
    "expectedDeliverables": [
      "Uma explicação de 6 a 10 linhas."
    ]
  },
  "commentedSolution": {
    "reasoning": "Compare quem falha com quem funciona. O sistema funciona no cabo da mesma sala e em outros setores, então não é o sistema. Falha só no Wi‑Fi e só com a sala cheia: o que muda é quantos aparelhos dividem o rádio.",
    "steps": [
      "Hipótese principal: meio compartilhado. Com 30 notebooks no mesmo canal, cada um recebe uma fatia pequena do tempo de transmissão.",
      "Hipótese secundária: sinal fraco em parte da sala, que causaria falhas sempre nos mesmos lugares, mesmo com a sala vazia.",
      "Evidências: no Wi‑Fi, netsh wlan show interfaces ou nmcli dev wifi list, com a sala vazia e cheia; no cabo, Get-NetAdapter ou ethtool, confirmando 1 Gbps estável."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Reinstalar o sistema interno.",
        "whyItIsWrong": "O mesmo sistema funciona no cabo da mesma sala e em outros setores; o que falha é o meio."
      },
      {
        "answer": "Contratar mais internet.",
        "whyItIsWrong": "O sistema é interno e o gargalo é o rádio da sala; mais internet não muda quantos aparelhos dividem o canal."
      }
    ],
    "finalAnswer": "O problema está no meio: 30 notebooks dividindo o mesmo canal Wi‑Fi (e talvez sinal fraco em parte da sala). Confirme comparando sinal e taxa com a sala vazia e cheia; resolva levando parte dos notebooks para o cabo ou aumentando a capacidade do Wi‑Fi da sala, não reinstalando o sistema."
  },
  "glossary": [
    {
      "term": "Placa de rede",
      "shortDefinition": "O componente do computador que transforma bits em sinal no cabo ou no rádio e o sinal recebido de volta em bits.",
      "example": "O Get-NetAdapter lista as placas de rede do computador, cabeada e Wi‑Fi, com status e velocidade.",
      "relatedLessons": [
        "1.7"
      ]
    },
    {
      "term": "CRC",
      "shortDefinition": "Código de verificação calculado sobre um bloco de dados e enviado junto com ele; o receptor recalcula e, se não conferir, descarta o bloco.",
      "example": "Um único bit trocado pelo ruído faz o CRC não conferir.",
      "relatedLessons": [
        "3.2"
      ]
    },
    {
      "term": "Canal (Wi‑Fi)",
      "shortDefinition": "A faixa de frequência de rádio que um roteador Wi‑Fi usa; os aparelhos no mesmo canal dividem o meio.",
      "example": "O netsh wlan show interfaces mostra o canal da sua conexão.",
      "relatedLessons": [
        "12.2"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Referência normativa para Ethernet; útil para aprofundar camada física e enlace Ethernet."
    },
    {
      "type": "standard",
      "title": "IEEE 802.11 Wireless LAN",
      "organization": "IEEE",
      "url": "",
      "note": "Referência normativa para Wi‑Fi; será aprofundada no módulo de redes sem fio."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.4",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "A aula anterior explica bit, byte, Mbps, MB/s e throughput."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 12",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Redes wireless, RF e segurança sem fio serão aprofundadas posteriormente."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Datacenter, virtualização e plataformas",
      "lesson": "a definir",
      "reason": "Ambientes on-premises e híbridos dependem de cabeamento, uplinks, storage e rede física para sustentar plataformas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Controle de acesso corporativo",
      "lesson": "a definir",
      "reason": "Controles como 802.1X, NAC e acesso físico se conectam à identidade de dispositivos e usuários."
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
      "0.6"
    ]
  }
};
