export const lesson0103 = {
  "id": "1.3",
  "moduleId": "m01",
  "order": 3,
  "title": "Tipos de rede: PAN, LAN, WLAN, CAN, MAN, WAN e SAN",
  "subtitle": "Como alcance, finalidade, meio e dono de uma rede mudam custo, operação e o lugar onde procurar uma falha.",
  "duration": "15-20 min + 30 min de prática extra",
  "estimatedStudyTimeMinutes": 20,
  "difficulty": "iniciante-intermediário",
  "type": "intermediária",
  "xp": 165,
  "tags": [
    "redes",
    "fundamentos",
    "PAN",
    "LAN",
    "WLAN",
    "CAN",
    "MAN",
    "WAN",
    "SAN",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.1",
      "reason": "É necessário entender rede como sistema de comunicação antes de classificar tipos de rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.2",
      "reason": "A classificação por tipo depende da distinção entre dispositivos finais, intermediários, serviços e políticas."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "O pensamento em camadas ajuda a separar alcance físico, função lógica e responsabilidade operacional."
    }
  ],
  "objectives": [
    "Diferenciar PAN, LAN, WLAN, CAN, MAN, WAN e SAN pelo alcance, pela finalidade, pelo meio e por quem controla a rede.",
    "Classificar as redes de um cenário real, como uma casa ou uma pequena empresa, reconhecendo que vários tipos coexistem.",
    "Usar o tipo de rede para localizar uma falha e saber quem acionar, sem confundir WLAN com internet, WAN com LAN ou SAN com NAS."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Você abre o notebook e nenhum site carrega. O ícone do Wi-Fi mostra sinal cheio, o fone Bluetooth continua tocando música do celular e alguém na sala ainda consegue imprimir. Mesmo assim, a frase que todo mundo diz é “a rede caiu”. Você reinicia o roteador, troca a senha do Wi-Fi, desliga o Bluetooth, e nada muda, porque o problema estava no link da operadora, do lado de fora da casa.</p>\n  <p>“A rede” é, na verdade, um conjunto de redes diferentes, com alcances e donos diferentes. Sem saber separá-las, você mexe na peça errada e liga para a pessoa errada. Nesta aula você aprende a dar nome a cada uma. Numa empresa, essa mesma classificação decide quem resolve cada falha (a equipe interna ou a operadora), quanto custa cada ligação e onde a segurança precisa de mais cuidado.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando tudo vira “a rede”: a falha de um trecho parece falha do conjunto. E as diferenças entre os trechos são grandes. As primeiras redes locais ligavam computadores de uma mesma sala para compartilhar impressoras e arquivos; depois vieram as ligações entre prédios, cidades e países, e redes feitas para um uso específico, como acesso sem fio, periféricos pessoais e armazenamento.</p>\n  <p>Cada uma dessas redes cobre uma distância, usa um meio, tem um dono e custa de um jeito. Uma ligação entre estados depende de uma operadora e cobra mensalidade; um cabo dentro do escritório é seu. Esta aula mostra como classificar uma rede por essas características e o que a sigla (PAN, LAN, WLAN, CAN, MAN, WAN ou SAN) diz sobre ela.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> tipos de rede são classificações que descrevem uma rede pelo <strong>alcance</strong> (que distância cobre), pela <strong>finalidade</strong> (para que serve), pelo <strong>meio</strong> (cabo, fibra ou rádio) e por <strong>quem a controla</strong>.\n  </div>\n  <p>Quem controla uma rede é o seu <strong>domínio administrativo</strong>: a própria organização, uma operadora contratada ou um provedor de cloud. Ele diz quem pode mudar a configuração e quem você aciona quando algo falha.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Tipo</th><th>Alcance típico</th><th>Finalidade</th><th>Limitação principal</th></tr></thead>\n    <tbody>\n      <tr><td>PAN (Personal Area Network)</td><td>Poucos metros ao redor de uma pessoa</td><td>Ligar periféricos pessoais: fone, relógio, celular</td><td>Alcance curto e bateria</td></tr>\n      <tr><td>LAN (Local Area Network)</td><td>Sala, casa, escritório, andar</td><td>Conectar computadores próximos, sob controle de quem os usa</td><td>Cabos e equipamentos para crescer</td></tr>\n      <tr><td>WLAN (Wireless LAN)</td><td>A área coberta pelo rádio</td><td>Mobilidade via Wi-Fi; é uma LAN sem fio</td><td>Interferência, sinal e meio compartilhado</td></tr>\n      <tr><td>CAN (Campus Area Network)</td><td>Campus, conjunto de prédios</td><td>Interligar prédios próximos da mesma organização, em geral com fibra própria</td><td>Cabeamento entre prédios e redundância</td></tr>\n      <tr><td>MAN (Metropolitan Area Network)</td><td>Cidade ou região metropolitana</td><td>Conectar locais dentro de uma área urbana, em geral com links de operadora</td><td>Dependência da operadora e custo do link</td></tr>\n      <tr><td>WAN (Wide Area Network)</td><td>Estados, países, o mundo</td><td>Conectar filiais, datacenters e a internet</td><td>Latência maior, custo mensal e operadora</td></tr>\n      <tr><td>SAN (Storage Area Network)</td><td>Datacenter</td><td>Ligar servidores ao armazenamento (storage)</td><td>Custo, complexidade e criticidade</td></tr>\n    </tbody>\n  </table></div>\n  <p>Repare que a maioria das siglas é definida pelo alcance, mas duas não: a WLAN se diferencia da LAN pelo meio (rádio), e a SAN pela finalidade (armazenamento). Essas categorias também não são caixas fechadas: a mesma casa ou empresa usa vários tipos ao mesmo tempo, ligados entre si.</p>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Achar que tudo é LAN porque é tudo da mesma empresa.</strong> A ligação com uma filial em outro estado é WAN, mesmo que a empresa pague por ela: quem a opera é a operadora.</li>\n      <li><strong>Esperar da WAN a resposta da LAN.</strong> Numa LAN, uma ida e volta leva menos de 1 ms; entre estados, dezenas de milissegundos. Um sistema que faz muitas consultas pequenas, rápido no mesmo prédio, fica lento quando o servidor vai para longe.</li>\n      <li><strong>Confundir SAN com NAS.</strong> Os dois põem armazenamento na rede, mas a SAN entrega ao servidor armazenamento em blocos: o servidor enxerga um disco, como se estivesse ligado nele, e o formata. O NAS é um aparelho que oferece pastas e arquivos compartilhados na rede comum.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Todo tipo de rede precisa de um meio, de regras de comunicação e de alguém que a opere. O que muda é a preocupação central de cada um:</p>\n  <ol class=\"flow-list\">\n    <li><strong>PAN:</strong> tecnologias de curto alcance e baixo consumo, como Bluetooth. A preocupação é o pareamento: só o fone que você autorizou conversa com o seu celular.</li>\n    <li><strong>LAN:</strong> cabos e switches dentro de um espaço que você controla. A preocupação é organizar quem fala com quem e manter cabos e equipamentos funcionando.</li>\n    <li><strong>WLAN:</strong> rádio e access points (APs). Todos dividem o mesmo ar, então a preocupação é sinal, interferência e quem tem a senha.</li>\n    <li><strong>CAN, MAN e WAN:</strong> ligações entre locais. Quanto maior a distância, mais a ligação depende de operadora, mais tempo cada ida e volta leva e mais caro é o link, cobrado todo mês.</li>\n    <li><strong>SAN:</strong> uma rede separada só para o tráfego entre servidores e storage. Se ela fica lenta, todos os servidores que guardam dados ali ficam lentos juntos.</li>\n  </ol>\n  <p>Por isso o tipo de rede muda as hipóteses quando algo falha. Na LAN você olha cabo e switch; na WLAN, sinal e senha; na WAN, o link e a operadora; na SAN, o caminho até o storage. Se um trecho funciona, a falha tende a estar em outro, e o tipo dele diz qual domínio administrativo acionar.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense em transporte. PAN é levar algo no bolso; LAN é circular dentro de casa; CAN, entre os prédios de uma universidade; MAN, dentro da cidade; WAN, pelas rodovias entre estados e países, que são de outro dono e cobram pedágio. A SAN é um corredor de serviço reservado para carga crítica dentro de um prédio.</p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Na sua casa, o celular ligado ao fone Bluetooth forma uma PAN. O notebook ligado ao roteador por cabo faz parte da LAN. O celular no Wi-Fi participa da WLAN. O roteador liga tudo isso ao link da operadora, que é o seu trecho de WAN até a internet. Um HD de rede (NAS) doméstico é um serviço de arquivos dentro da sua LAN, não uma SAN.</p>\n  <p>Agora volte à cena da Motivação. Sinal cheio no Wi-Fi prova que a WLAN funciona; a impressora respondendo prova que a LAN funciona; o fone tocando prova que a PAN funciona. O que sobra é a WAN: o link da operadora ou o que está além dele. Mexer no Wi-Fi ou no Bluetooth não resolve; o telefonema certo é para a operadora.</p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1040 460\" role=\"img\" aria-labelledby=\"m01l03-title m01l03-desc\">\n    <title id=\"m01l03-title\">Tipos de rede coexistindo em uma empresa</title>\n    <desc id=\"m01l03-desc\">Dentro da sede, controlada pela empresa, ficam a PAN (fone e celular), a WLAN (Wi-Fi), a LAN (cabos e switch), os servidores e a SAN, que liga os servidores ao storage. A LAN da sede se liga à WAN, controlada pela operadora, que leva à filial e à internet.</desc>\n    <rect x=\"30\" y=\"40\" width=\"600\" height=\"300\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"330\" y=\"68\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Sede: a empresa controla</text>\n\n    <rect x=\"60\" y=\"95\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"135\" y=\"126\" text-anchor=\"middle\" class=\"svg-label\">PAN</text>\n    <text x=\"135\" y=\"149\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fone e celular</text>\n\n    <rect x=\"245\" y=\"95\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"320\" y=\"126\" text-anchor=\"middle\" class=\"svg-label\">WLAN</text>\n    <text x=\"320\" y=\"149\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi (rádio)</text>\n\n    <rect x=\"430\" y=\"95\" width=\"170\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"515\" y=\"126\" text-anchor=\"middle\" class=\"svg-label\">LAN</text>\n    <text x=\"515\" y=\"149\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cabos e switch</text>\n\n    <rect x=\"430\" y=\"240\" width=\"170\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"515\" y=\"271\" text-anchor=\"middle\" class=\"svg-label\">Servidores</text>\n    <text x=\"515\" y=\"294\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sistemas internos</text>\n\n    <rect x=\"245\" y=\"240\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"320\" y=\"271\" text-anchor=\"middle\" class=\"svg-label\">SAN</text>\n    <text x=\"320\" y=\"294\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rede só de storage</text>\n\n    <rect x=\"60\" y=\"240\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"135\" y=\"271\" text-anchor=\"middle\" class=\"svg-label\">Storage</text>\n    <text x=\"135\" y=\"294\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">discos dos servidores</text>\n\n    <line x1=\"210\" y1=\"131\" x2=\"245\" y2=\"131\" class=\"svg-flow\" />\n    <line x1=\"395\" y1=\"131\" x2=\"430\" y2=\"131\" class=\"svg-flow\" />\n    <line x1=\"515\" y1=\"167\" x2=\"515\" y2=\"240\" class=\"svg-flow\" />\n    <line x1=\"430\" y1=\"276\" x2=\"395\" y2=\"276\" class=\"svg-flow\" />\n    <line x1=\"245\" y1=\"276\" x2=\"210\" y2=\"276\" class=\"svg-flow\" />\n\n    <rect x=\"670\" y=\"95\" width=\"160\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"750\" y=\"126\" text-anchor=\"middle\" class=\"svg-label\">WAN</text>\n    <text x=\"750\" y=\"149\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">link da operadora</text>\n    <text x=\"750\" y=\"82\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">a operadora controla</text>\n\n    <rect x=\"870\" y=\"95\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"945\" y=\"126\" text-anchor=\"middle\" class=\"svg-label\">Filial</text>\n    <text x=\"945\" y=\"149\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">outra LAN</text>\n\n    <rect x=\"870\" y=\"240\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"945\" y=\"271\" text-anchor=\"middle\" class=\"svg-label\">Internet</text>\n    <text x=\"945\" y=\"294\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sites e cloud</text>\n\n    <line x1=\"600\" y1=\"131\" x2=\"670\" y2=\"131\" class=\"svg-flow\" />\n    <line x1=\"830\" y1=\"131\" x2=\"870\" y2=\"131\" class=\"svg-flow\" />\n    <path d=\"M790 167 C810 220, 840 260, 870 270\" class=\"svg-flow\" />\n\n    <text x=\"520\" y=\"385\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Alcance curto e um só dono: PAN, WLAN, LAN e SAN. Entre locais distantes: WAN, de outro dono.</text>\n    <text x=\"520\" y=\"412\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ligando prédios de um mesmo campus, a rede seria uma CAN; locais na mesma cidade, uma MAN.</text>\n  </svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> classifique uma rede pelo alcance, pela finalidade, pelo meio e por quem a controla.</li>\n    <li>PAN é pessoal; LAN, local; WLAN, local sem fio; CAN, campus; MAN, cidade; WAN, longa distância; SAN, armazenamento.</li>\n    <li>Os tipos coexistem: sua casa já tem PAN, LAN, WLAN e um trecho de WAN.</li>\n    <li>Wi-Fi conectado não garante internet: a WLAN é só o trecho local.</li>\n    <li>WAN tem latência e custo maiores e costuma depender de operadora.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 1.4, topologias físicas e lógicas: duas redes do mesmo tipo, como duas LANs, podem ter desenhos muito diferentes, em estrela, em malha ou em árvore.</p>\n</section>\n"
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
      "Wi-Fi",
      "Bluetooth",
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "DNS",
      "DHCP",
      "iSCSI"
    ],
    "dependsOn": [
      "rede como sistema",
      "dispositivos finais",
      "dispositivos intermediários",
      "serviços",
      "meios de transmissão"
    ],
    "enables": [
      "topologias",
      "cabeamento",
      "equipamentos de rede",
      "WAN",
      "cloud networking",
      "VPN",
      "segmentação",
      "troubleshooting"
    ]
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Para montar cada tela, um sistema faz 200 consultas pequenas ao banco de dados, uma depois da outra. Com o banco na mesma LAN, cada ida e volta leva cerca de 0,5 ms; depois que o banco foi para outro estado, cerca de 30 ms, embora o link não esteja cheio. Quanto tempo cada tela passa esperando, antes e depois? O que daria para mudar?",
      "hints": [
        "Multiplique o número de consultas pelo tempo de cada ida e volta.",
        "Comprar um link com mais banda diminui o tempo de cada ida e volta?"
      ],
      "expectedIdeas": [
        "100 ms antes",
        "6 s depois",
        "latência da WAN",
        "menos idas e voltas",
        "aproximar dados e aplicação"
      ],
      "explanation": "Antes: 200 × 0,5 ms = 100 ms. Depois: 200 × 30 ms = 6 s por tela. Mais banda não encurta cada ida e volta; ajuda fazer menos consultas ou aproximar o banco da aplicação."
    },
    {
      "type": "aplicação",
      "question": "Seu fone Bluetooth começa a cortar o som quando você deixa o celular na mesa e vai até a cozinha, a uns 15 metros e duas paredes de distância. Que característica da PAN explica isso, e por que ela foi projetada assim?",
      "hints": [
        "Qual é o alcance típico de uma PAN?",
        "Pense na bateria de um fone."
      ],
      "expectedIdeas": [
        "alcance de poucos metros",
        "baixo consumo",
        "bateria",
        "paredes atrapalham o rádio"
      ],
      "explanation": "A PAN foi feita para alcançar poucos metros. Transmitir com pouca potência poupa a bateria do fone, mas limita o alcance, e paredes enfraquecem o sinal. É a troca que a PAN faz, não um defeito."
    }
  ],
  "quiz": [
    {
      "id": "q1.3.1",
      "question": "Qual alternativa descreve melhor uma LAN?",
      "options": [
        "Rede global da internet",
        "Rede local sob controle relativamente próximo, como casa, escritório ou andar",
        "Rede exclusiva de armazenamento em bloco",
        "Rede pessoal de poucos centímetros"
      ],
      "answer": 1,
      "explanation": "LAN é uma rede local, normalmente dentro de um ambiente limitado e administrável.",
      "topic": "LAN",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.3.2",
      "question": "Qual afirmação sobre LAN e WLAN está correta?",
      "options": [
        "WLAN cobre uma cidade, e LAN cobre um prédio",
        "WLAN é a parte da rede que leva à internet; LAN é só a rede interna",
        "WLAN muda o meio para rádio, mas mantém o alcance local de uma LAN",
        "WLAN dispensa roteador e operadora, porque o access point resolve tudo"
      ],
      "answer": 2,
      "explanation": "WLAN é uma LAN sem fio: mantém o alcance local, mas troca o meio (rádio). Chegar à internet depende do que vem depois dela: o roteador e o link da operadora (WAN).",
      "topic": "WLAN",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.3.3",
      "question": "Uma empresa liga a sede e uma filial, em estados diferentes, por um link contratado de uma operadora. Qual tipo de rede está mais associado a esse cenário?",
      "options": [
        "WAN",
        "MAN",
        "SAN",
        "WLAN"
      ],
      "answer": 0,
      "explanation": "Ligar locais distantes, em estados diferentes, é característica de WAN. MAN se limita a uma cidade ou região metropolitana.",
      "topic": "WAN",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q1.3.6",
      "question": "Qual é a diferença entre SAN e NAS?",
      "options": [
        "NAS é sempre corporativo e SAN é sempre doméstica",
        "SAN é a versão sem fio de um NAS",
        "SAN é uma rede especializada que entrega armazenamento em blocos aos servidores; NAS é um serviço de arquivos na rede comum",
        "SAN e NAS são o mesmo serviço com nomes de fabricantes diferentes"
      ],
      "answer": 2,
      "explanation": "Os dois põem armazenamento na rede, mas a SAN é uma rede dedicada em que o servidor enxerga um disco (blocos) e o formata; o NAS oferece pastas e arquivos prontos. Tratar uma SAN como compartilhamento de arquivos subestima o quanto ela é crítica.",
      "topic": "SAN",
      "difficulty": "intermediário",
      "type": "pegadinha comum"
    },
    {
      "id": "q1.3.7",
      "question": "Um notebook está conectado ao Wi-Fi do escritório com sinal cheio e consegue imprimir na impressora da sala, mas não abre nenhum site. Qual hipótese é a mais coerente?",
      "options": [
        "A SAN do datacenter está lenta",
        "O sinal Wi-Fi está fraco demais para navegar",
        "O fone Bluetooth do notebook está bloqueando a internet",
        "O problema está além da rede local: no link da operadora (WAN) ou depois dele"
      ],
      "answer": 3,
      "explanation": "Sinal cheio e impressão funcionando mostram que a WLAN e a LAN estão de pé. A hipótese se desloca para o que vem depois delas: o link da operadora (WAN) ou o que está além dele.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q1.3.8",
      "question": "Uma universidade liga com fibra própria os prédios do seu campus. Uma prefeitura liga escolas espalhadas pela cidade com links de operadora. Como classificar cada caso?",
      "options": [
        "Universidade: CAN; prefeitura: MAN",
        "Universidade: MAN; prefeitura: CAN",
        "Universidade: LAN; prefeitura: SAN",
        "Os dois casos são PAN, porque a organização é uma só"
      ],
      "answer": 0,
      "explanation": "CAN interliga prédios próximos de um campus sob uma organização. MAN conecta sites dentro de uma cidade ou região metropolitana e costuma depender de operadora.",
      "topic": "CAN/MAN",
      "difficulty": "iniciante",
      "type": "cenário"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.3.1",
      "front": "O que é PAN?",
      "back": "Personal Area Network: rede de curtíssimo alcance ao redor de uma pessoa, como Bluetooth entre celular e fone.",
      "tags": [
        "PAN"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.4",
      "front": "O que é WAN?",
      "back": "Wide Area Network: rede de longa distância, entre estados ou países, que liga filiais, datacenters e a internet; costuma depender de operadora.",
      "tags": [
        "WAN"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.5",
      "front": "O que é SAN?",
      "back": "Storage Area Network: rede separada que liga servidores ao armazenamento. O servidor enxerga um disco (blocos); um NAS, ao contrário, oferece pastas e arquivos na rede comum.",
      "tags": [
        "SAN",
        "storage"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.3.6",
      "front": "Qual pergunta ajuda a classificar um tipo de rede?",
      "back": "Qual é o alcance, para que ela serve, que meio usa e quem a controla?",
      "tags": [
        "arquitetura"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.7",
      "front": "CAN x MAN: qual a diferença?",
      "back": "CAN (Campus Area Network) interliga prédios de um campus da mesma organização, geralmente com fibra própria. MAN (Metropolitan Area Network) conecta locais dentro de uma cidade e costuma depender de operadora.",
      "tags": [
        "CAN",
        "MAN"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.8",
      "front": "Wi-Fi conectado garante acesso à internet?",
      "back": "Não. A WLAN é só o trecho local, por rádio; chegar à internet depende do roteador e do link da operadora (WAN).",
      "tags": [
        "WLAN",
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.3.1",
      "type": "conceitual",
      "prompt": "Classifique cada ligação pelo tipo de rede: (a) celular conectado a um relógio inteligente; (b) notebook no Wi-Fi do escritório; (c) sede em São Paulo ligada à filial no Recife; (d) servidores ligados ao storage por uma rede dedicada; (e) HD de rede (NAS) na sala de casa, acessado pelo Wi-Fi.",
      "expectedAnswer": "(a) PAN; (b) WLAN; (c) WAN; (d) SAN; (e) o NAS é um serviço de arquivos dentro da LAN/WLAN de casa, não uma SAN.",
      "explanation": "A classificação depende de alcance, finalidade e meio, não do nome do aparelho."
    },
    {
      "id": "ex1.3.5",
      "type": "diagnóstico",
      "prompt": "Você trabalha no suporte de uma empresa com sede e filial em estados diferentes. Para cada chamado, diga em que tipo de rede está a falha e quem deve resolvê-la (equipe interna ou operadora): (a) o Wi-Fi do 2º andar sumiu, mas o resto do prédio funciona; (b) na sede, ninguém abre nenhum site, mas os sistemas internos e as impressoras funcionam; (c) todos os sistemas que guardam dados no storage ficaram lentos ao mesmo tempo.",
      "expectedAnswer": "(a) WLAN, provavelmente o access point do andar: equipe interna. (b) WAN, o link de internet da sede: operadora (depois de conferir o roteador da empresa). (c) SAN: equipe interna do datacenter.",
      "explanation": "O tipo de rede aponta o trecho e o domínio administrativo: quem pode mexer nele."
    }
  ],
  "challenge": {
    "title": "Classifique as redes de uma empresa pequena",
    "scenario": "Uma empresa tem uma sede com 80 usuários em cabos e Wi-Fi, um Wi-Fi separado para visitantes, uma filial em outro estado, alguns servidores internos, backup em cloud e um storage ligado aos servidores por uma rede dedicada. Um usuário da filial liga dizendo que \"a rede caiu\": ele imprime normalmente na filial, mas não abre o sistema que fica na sede.",
    "tasks": [
      "Listar os tipos de rede do cenário e justificar cada um por alcance, finalidade ou meio.",
      "Dizer quem controla cada parte: a empresa ou a operadora.",
      "Dizer por qual tipo de rede você começa a investigar o chamado da filial, e por quê."
    ],
    "expectedDeliverables": [
      "Uma tabela com tipo de rede, onde aparece e quem controla, e 2 a 3 linhas sobre o chamado."
    ]
  },
  "commentedSolution": {
    "reasoning": "Classifique por alcance e finalidade antes de pensar em equipamentos; depois use o que funciona para descartar trechos.",
    "steps": [
      "Sede: LAN nos cabos e duas WLANs, a corporativa e a de visitantes. Filial: outra LAN. Tudo controlado pela empresa.",
      "Sede–filial: WAN, porque liga estados diferentes por link de operadora, que controla esse trecho. O backup em cloud chega pela internet, outro trecho de WAN.",
      "Servidores–storage: SAN, rede dedicada ao armazenamento, controlada pela empresa.",
      "Chamado: se o usuário imprime, a LAN da filial funciona. O próximo trecho é a WAN até a sede; comece por ele e, se estiver fora, acione a operadora."
    ],
    "commonMistakes": [
      "Dizer que tudo é LAN porque pertence à mesma empresa.",
      "Tratar o storage dedicado como um NAS na rede dos usuários.",
      "Começar pelo Wi-Fi ou pela impressora da filial: a impressão funcionando já mostra que a rede local está de pé."
    ],
    "finalAnswer": "LAN e duas WLANs na sede, LAN na filial, WAN até a filial e até a internet, SAN no storage. A operadora controla só a WAN. O chamado começa pela WAN sede–filial."
  },
  "glossary": [
    {
      "term": "Switch",
      "shortDefinition": "Equipamento que liga os computadores de uma LAN por cabo e entrega cada mensagem só na porta do destino.",
      "relatedLessons": [
        "1.7",
        "3.3"
      ]
    },
    {
      "term": "Access point (AP)",
      "shortDefinition": "Equipamento que cria o Wi-Fi: transmite e recebe por rádio e liga os dispositivos sem fio à rede cabeada.",
      "relatedLessons": [
        "1.7",
        "12.7"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802 family",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/ieee/802/",
      "note": "Família de padrões associada a redes locais e metropolitanas, incluindo Ethernet e Wi-Fi."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m00",
      "note": "Base conceitual de bits, sinais, protocolos, latência e pensamento em camadas."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "url": "internal://infra-platform-devsecops",
      "note": "Relação com IaC, pipelines, cloud, Kubernetes e ambientes híbridos."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e IaC",
      "lesson": "redes virtuais e automação",
      "reason": "VPC, VNet, subnets e security groups são tipos de rede representados como código."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso remoto e confiança",
      "lesson": "identidade em acesso de rede",
      "reason": "VPN, ZTNA e acesso a redes internas dependem de identidade, política e segmentação."
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
      "1.4"
    ]
  }
};
