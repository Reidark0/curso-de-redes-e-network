export const lesson0102 = {
  "id": "1.2",
  "moduleId": "m01",
  "order": 2,
  "title": "Dispositivos finais, intermediários e serviços",
  "subtitle": "Como separar quem usa a rede, quem transporta a comunicação e qual função está sendo oferecida.",
  "duration": "15-20 min + 30 min de prática extra",
  "estimatedStudyTimeMinutes": 20,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 185,
  "tags": [
    "redes",
    "fundamentos",
    "hosts",
    "switch",
    "roteador",
    "firewall",
    "serviços",
    "inventário",
    "segurança",
    "troubleshooting",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.1",
      "reason": "A aula 1.1 define rede como sistema de comunicação. Agora a rede será decomposta em papéis: finais, intermediários e serviços."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "A classificação por papéis usa o pensamento em camadas e a separação entre dispositivo, protocolo, meio, serviço e política."
    }
  ],
  "objectives": [
    "Diferenciar dispositivo final, dispositivo intermediário, serviço e política, sem confundir servidor (a máquina) com serviço (a função que ela oferece).",
    "Classificar um elemento pelo papel que ele exerce no fluxo analisado, reconhecendo equipamentos que acumulam papéis, como o roteador Wi-Fi de casa e o firewall.",
    "Mapear um acesso simples (origem, nome, caminho, política e serviço) e usar esse mapa para levantar hipóteses quando algo não abre."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Alguém avisa: “o servidor caiu, o sistema não abre”. A equipe reinicia a máquina. Durante dez minutos, o e-mail interno e a pasta de arquivos compartilhada também ficam fora do ar, porque rodavam na mesma máquina. Quando ela volta, o sistema continua sem abrir: a máquina nunca tinha caído. O programa que entrega o sistema estava parado, ou o nome do sistema apontava para outro endereço.</p>\n  <p>O erro começou no vocabulário: “servidor”, “sistema” e “rede” foram tratados como a mesma coisa, e a correção atingiu a peça errada. Nesta aula você aprende a separar quem usa a rede, quem leva o tráfego pelo caminho e qual função está sendo oferecida. Essa é a primeira pergunta de qualquer chamado de suporte ou alerta de segurança: qual peça, com qual papel, falhou?</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando todos os elementos de uma comunicação são chamados só de “rede” ou “servidor”. Um único acesso envolve vários componentes, cada um com uma responsabilidade. Sem separar os papéis, você pode:</p>\n  <ul>\n    <li>reiniciar um servidor quando o problema era a tradução do nome;</li>\n    <li>trocar um cabo quando o problema era falta de permissão;</li>\n    <li>culpar o firewall quando o serviço nem estava em execução;</li>\n    <li>liberar uma regra ampla quando bastava corrigir o endereço de destino.</li>\n  </ul>\n  <p>Os papéis só se multiplicaram com o tempo: as primeiras redes ligavam terminais a um computador central; hoje há switches, roteadores, firewalls e serviços contratados na internet. A pergunta continua a mesma, e esta aula dá um método para respondê-la: quem consome, quem encaminha, quem aplica a regra e qual função está sendo entregue?</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> <strong>dispositivo final</strong> é a origem ou o destino de uma comunicação (notebook, celular, servidor, impressora, câmera). <strong>Dispositivo intermediário</strong> fica no caminho e encaminha, filtra, traduz ou inspeciona o tráfego dos outros (switch, roteador, access point, firewall). <strong>Serviço</strong> é uma função oferecida pela rede para outros usarem (DNS, que traduz nomes em endereços IP; DHCP, que entrega endereços IP aos aparelhos; um site; uma pasta compartilhada). Um quarto papel atravessa os três: a <strong>política</strong>, a regra que decide o que pode passar, normalmente aplicada num intermediário como o firewall.</div>\n  <h3>Servidor não é serviço</h3>\n  <p>Servidor é a máquina, física ou virtual. Serviço é o programa que atende pedidos nela, cada um numa porta: a mesma máquina pode hospedar o site da empresa (HTTPS, porta 443), o acesso remoto dos administradores (SSH, porta 22) e um banco de dados. Por isso a máquina pode estar ligada e responder ao ping enquanto o site está parado.</p>\n  <h3>Classifique pelo papel, não pelo nome</h3>\n  <p>O mesmo equipamento muda de papel conforme o fluxo que você analisa. O firewall é intermediário para o tráfego dos outros, mas é destino quando você abre a página de administração dele. O roteador Wi-Fi de casa acumula cinco funções: access point, switch, roteador, NAT e servidor DHCP. Pergunte sempre: neste fluxo, o que esse elemento está fazendo?</p>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Achar que o intermediário só transporta.</strong> Ele pode bloquear, traduzir endereços, registrar e inspecionar o tráfego. Como concentra o tráfego e as regras de muitos aparelhos, quem o invade ou o configura mal afeta todos os fluxos que passam por ele.</li>\n      <li><strong>Deixar impressoras, câmeras e outros aparelhos “inteligentes” fora da conta.</strong> Todo aparelho com IP, firmware ou senha é dispositivo final: sem inventário, ele fica com firmware antigo e senha de fábrica sem ninguém perceber.</li>\n      <li><strong>Tratar a classificação como diagnóstico.</strong> Ela organiza as hipóteses e diz quem é o dono de cada uma (suporte, rede, segurança, sistemas), mas não prova a causa.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Acompanhe um notebook (10.10.1.25) abrindo <code>https://intranet.empresa.local</code>, o sistema interno da empresa. Os endereços são ilustrativos; o que importa é o papel de cada elemento em cada passo.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Origem:</strong> o navegador do notebook (dispositivo final) cria o pedido.</li>\n    <li><strong>Nome:</strong> o serviço DNS da empresa traduz <code>intranet.empresa.local</code> para um endereço, por exemplo 10.20.0.15.</li>\n    <li><strong>Caminho:</strong> o access point ou o switch leva o tráfego dentro da rede local; o roteador o encaminha para a rede dos servidores; um balanceador de carga pode repartir os pedidos entre vários servidores iguais.</li>\n    <li><strong>Política:</strong> o firewall entre a rede dos usuários e a dos servidores permite ou nega a conexão para a porta 443.</li>\n    <li><strong>Serviço:</strong> o programa do site, rodando num servidor (dispositivo final de destino), atende na porta 443 e responde.</li>\n  </ol>\n  <p>Cada passo vira uma hipótese com dono quando algo falha: o notebook (suporte), o DNS e o servidor (sistemas), o caminho (rede), a regra (segurança). E cada elemento deixa registros do que viu, que servem de evidência.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense numa empresa física. Os funcionários que pedem e recebem documentos são os dispositivos finais; corredores, recepção e elevadores são os intermediários; o RH e o financeiro são os serviços; crachás e regras de acesso são as políticas.</p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu celular abre um vídeo. O celular é dispositivo final. O roteador Wi-Fi é intermediário (access point, switch, roteador e NAT) e ainda oferece o serviço DHCP. O DNS do provedor traduz o nome do site de vídeo, e o site é o serviço acessado.</p>\n  <p>Se o vídeo não carrega, não basta dizer “a internet caiu”. Teste papel por papel:</p>\n  <ol>\n    <li>O celular está no Wi-Fi e recebeu um IP? Se sim, o access point e o DHCP fizeram sua parte.</li>\n    <li>O gateway (o próprio roteador) responde ao ping? Se sim, o caminho até ele funciona.</li>\n    <li>Os nomes resolvem? Se o IP e o gateway estão certos e só os nomes falham, a suspeita é o DNS.</li>\n    <li>Outros sites abrem? Se sim, só aquele serviço está fora, e o problema não é sua rede.</li>\n  </ol>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 430\" role=\"img\" aria-labelledby=\"m01l02-title m01l02-desc\">\n    <title id=\"m01l02-title\">Dispositivos finais, intermediários e serviços</title>\n    <desc id=\"m01l02-desc\">Um dispositivo final de origem acessa um serviço passando por intermediários (access point ou switch, roteador ou balanceador) e por uma política (firewall). O serviço roda num servidor, o dispositivo final de destino. Cada elemento deixa evidências.</desc>\n    <defs>\n      <marker id=\"m01l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"55\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"115\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Dispositivo final</text>\n    <text x=\"115\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Notebook / celular</text>\n    <rect x=\"260\" y=\"55\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"335\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Intermediário</text>\n    <text x=\"335\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">AP / Switch</text>\n    <rect x=\"470\" y=\"55\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"545\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Política</text>\n    <text x=\"545\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Firewall / ACL</text>\n    <rect x=\"670\" y=\"55\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"755\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Intermediário</text>\n    <text x=\"755\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Roteador / balanceador</text>\n    <rect x=\"790\" y=\"250\" width=\"160\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"870\" y=\"284\" text-anchor=\"middle\" class=\"svg-label\">Dispositivo final</text>\n    <text x=\"870\" y=\"309\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Servidor / VM</text>\n    <rect x=\"495\" y=\"250\" width=\"200\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"595\" y=\"284\" text-anchor=\"middle\" class=\"svg-label\">Serviço</text>\n    <text x=\"595\" y=\"309\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNS / HTTP / API</text>\n    <line x1=\"200\" y1=\"95\" x2=\"260\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l02-arrow)\" />\n    <line x1=\"410\" y1=\"95\" x2=\"470\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l02-arrow)\" />\n    <line x1=\"620\" y1=\"95\" x2=\"670\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l02-arrow)\" />\n    <path d=\"M755 135 C760 190, 740 235, 695 275\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l02-arrow)\" />\n    <line x1=\"695\" y1=\"292\" x2=\"790\" y2=\"292\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l02-arrow)\" />\n    <text x=\"500\" y=\"185\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Perguntas do diagnóstico: quem iniciou? quem encaminhou? qual serviço? qual política?</text>\n    <rect x=\"70\" y=\"250\" width=\"300\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"220\" y=\"282\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n    <text x=\"220\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP, rota, porta, log, regra, processo</text>\n  </svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> classifique pelo papel no fluxo: dispositivo final (origem ou destino), intermediário (encaminha, filtra, traduz), serviço (função oferecida) e política (o que pode passar).</li>\n    <li>Servidor é a máquina; serviço é a função que ela oferece numa porta. Máquina ligada não prova serviço funcionando.</li>\n    <li>Um equipamento pode acumular papéis, como o roteador Wi-Fi de casa.</li>\n    <li>Mapear origem, nome, caminho, política e serviço transforma “não abre” em hipóteses com dono.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 1.3 você amplia o mapa com os tipos de rede (PAN, LAN, WLAN, CAN, MAN, WAN e SAN) e vê como alcance e finalidade mudam custo, operação e segurança.</p>\n</section>\n"
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
      "ARP",
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "DNS",
      "DHCP",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [
      "rede como sistema",
      "bits",
      "sinais",
      "protocolos",
      "pensamento em camadas"
    ],
    "enables": [
      "tipos de rede",
      "topologias",
      "equipamentos de rede",
      "inventário",
      "firewall",
      "cloud networking",
      "troubleshooting"
    ]
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Você abre no navegador a página de configuração do roteador Wi-Fi de casa (http://192.168.0.1). Nesse fluxo, qual é o papel do roteador? E quando, logo depois, o celular assiste a um vídeo da internet?",
      "hints": [
        "Classifique pelo papel no fluxo, não pelo nome.",
        "Quem é o destino do pedido em cada caso?"
      ],
      "expectedIdeas": [
        "destino",
        "dispositivo final",
        "serviço de administração",
        "intermediário no vídeo"
      ],
      "explanation": "Na página de configuração, o roteador é o destino: um dispositivo final que oferece um serviço de administração. No vídeo, ele é intermediário: só leva o tráfego entre o celular e o site, que é o destino."
    },
    {
      "type": "reflexão",
      "question": "A impressora do escritório nunca recebeu atualização e ainda usa a senha de fábrica admin. Por que isso é um problema da rede inteira, e não só da impressora?",
      "hints": [
        "Ela tem IP e oferece serviços.",
        "Quem mais está na mesma rede que ela?"
      ],
      "expectedIdeas": [
        "dispositivo final",
        "IP",
        "senha de fábrica",
        "firmware",
        "inventário",
        "ponto de entrada"
      ],
      "explanation": "A impressora é um dispositivo final com IP, firmware e serviços (impressão, página web). Com senha de fábrica, qualquer um na rede pode controlá-la e usá-la como ponto de partida para alcançar os outros aparelhos. Por isso ela entra no inventário."
    }
  ],
  "quiz": [
    {
      "id": "q1.2.1",
      "question": "Qual alternativa representa melhor um dispositivo intermediário?",
      "options": [
        "Um switch que liga os computadores de um andar à rede",
        "Um notebook abrindo um site interno",
        "O serviço DNS que traduz nomes para endereços",
        "Uma regra que permite HTTPS da rede de usuários"
      ],
      "answer": 0,
      "explanation": "O switch é intermediário porque fica no caminho e leva o tráfego entre os aparelhos da rede local. O notebook é dispositivo final, o DNS é serviço e a regra é política.",
      "topic": "papéis de rede",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.2.2",
      "question": "DNS é melhor classificado como:",
      "options": [
        "Dispositivo intermediário",
        "Serviço",
        "Dispositivo final",
        "Política"
      ],
      "answer": 1,
      "explanation": "DNS é um serviço: uma função oferecida pela rede que traduz nomes em endereços. Ele roda num servidor (dispositivo final), mas não é o servidor.",
      "topic": "serviços",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.2.3",
      "question": "Um servidor executa HTTP, SSH e banco de dados. O servidor e os serviços são a mesma coisa?",
      "options": [
        "Sim: se o servidor responde ping, HTTP, SSH e banco também estão funcionando",
        "Sim: cada servidor oferece um único serviço, então os nomes se equivalem",
        "Não. HTTP, SSH e banco são dispositivos intermediários dentro do servidor",
        "Não. O servidor é a máquina; HTTP, SSH e banco são serviços que ela hospeda"
      ],
      "answer": 3,
      "explanation": "Uma mesma máquina pode hospedar vários serviços, cada um na sua porta. Ela pode estar ligada e responder ao ping com um desses serviços parado.",
      "topic": "servidor vs serviço",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q1.2.4",
      "question": "Um host tem IP e pinga o gateway, mas não acessa um site por nome. Qual hipótese deve ser investigada primeiro?",
      "options": [
        "Switch de acesso",
        "DHCP",
        "DNS",
        "Placa de rede do host"
      ],
      "answer": 2,
      "explanation": "O host já tem IP (DHCP funcionou) e pinga o gateway (placa, cabo e switch de acesso funcionam). Se só o acesso por nome falha, DNS é a hipótese forte.",
      "topic": "troubleshooting",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q1.2.5",
      "question": "Por que intermediários como firewalls e roteadores precisam de proteção reforçada?",
      "options": [
        "Porque concentram o tráfego e as regras de muitos aparelhos",
        "Porque são dispositivos finais e iniciam a maior parte das comunicações",
        "Porque só transportam tráfego e não conseguem alterá-lo",
        "Porque não têm página de administração e só podem ser protegidos fisicamente"
      ],
      "answer": 0,
      "explanation": "Intermediários ficam no caminho de muitos fluxos e aplicam regras. Quem invade ou configura mal um deles afeta todos esses fluxos.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q1.2.7",
      "question": "O roteador Wi-Fi de casa oferece Wi-Fi, entrega IP aos celulares por DHCP e faz NAT para a internet. Qual classificação é a mais precisa?",
      "options": [
        "Apenas roteador, porque esse é o nome do equipamento",
        "Dispositivo final, porque tem endereço IP",
        "Um equipamento que acumula papéis: intermediário (access point, switch, roteador, NAT) e serviço (DHCP)",
        "Apenas serviço, porque entrega DHCP"
      ],
      "answer": 2,
      "explanation": "Classifique pelo papel no fluxo, não pelo nome. O mesmo equipamento comuta, roteia, traduz endereços e ainda hospeda o serviço DHCP.",
      "topic": "papéis acumulados",
      "difficulty": "iniciante",
      "type": "cenário"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.2.1",
      "front": "O que é dispositivo final?",
      "back": "É a origem ou o destino de uma comunicação, como notebook, celular, servidor, impressora ou câmera.",
      "tags": [
        "fundamentos",
        "host"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.2.2",
      "front": "O que é dispositivo intermediário?",
      "back": "É um elemento que fica no caminho e encaminha, filtra, traduz ou inspeciona o tráfego dos outros, como switch, roteador, access point, firewall ou balanceador de carga.",
      "tags": [
        "fundamentos",
        "intermediários"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.2.3",
      "front": "Servidor e serviço são iguais?",
      "back": "Não. Servidor é a máquina, física ou virtual; serviço é a função que ela oferece numa porta, como um site, DNS, SSH ou banco de dados.",
      "tags": [
        "serviços"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.2.4",
      "front": "Por que classificar papéis ajuda no troubleshooting?",
      "back": "Porque transforma “não abre” em hipóteses separadas, cada uma com dono: origem, nome, caminho, política e serviço.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.2.7",
      "front": "Intermediário só transporta tráfego?",
      "back": "Não. Ele também pode bloquear, traduzir endereços (NAT), registrar e inspecionar o tráfego.",
      "tags": [
        "intermediários"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.2.6",
      "front": "Qual é o risco de um aparelho fora do inventário?",
      "back": "Ninguém o atualiza nem o vigia: ele pode ficar com firmware antigo, senha de fábrica e serviços expostos na rede.",
      "tags": [
        "segurança",
        "inventário"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.2.1",
      "type": "classificação",
      "prompt": "Classifique cada elemento pelo papel que exerce quando um funcionário abre o sistema interno: notebook, access point, switch, DNS, firewall, servidor web e o site do sistema.",
      "expectedAnswer": "Notebook: dispositivo final de origem. Access point e switch: intermediários. DNS: serviço. Firewall: intermediário que aplica a política. Servidor web: dispositivo final de destino. Site do sistema: serviço hospedado no servidor web.",
      "explanation": "Servidor e site aparecem separados porque a máquina e a função que ela oferece são coisas diferentes."
    },
    {
      "id": "ex1.2.5",
      "type": "diagnóstico",
      "prompt": "O sistema de RH abre para quem está na rede do andar do RH, mas não para quem está na rede do andar de vendas. O servidor está ligado e o serviço atende normalmente o pessoal do RH. Qual papel é o suspeito principal e por quê?",
      "expectedAnswer": "O caminho entre as duas redes: um intermediário (roteador) ou, mais provavelmente, a política (regra de firewall) que permite o RH e nega vendas. O dispositivo final de destino e o serviço funcionam, porque atendem o RH.",
      "explanation": "Se o serviço responde para uma origem e não para outra, a diferença está no que fica entre elas: caminho ou regra."
    }
  ],
  "challenge": {
    "title": "Classifique a rede de um pequeno escritório",
    "scenario": "Um escritório tem 12 notebooks, 2 impressoras, 1 roteador com firewall, 2 switches, 1 access point, 1 servidor que guarda os arquivos compartilhados e também roda o DNS interno e o DHCP, e usa um sistema web contratado na internet.",
    "tasks": [
      "Classificar cada item como dispositivo final, intermediário, serviço ou política.",
      "Apontar os itens que acumulam mais de um papel.",
      "Indicar quais itens costumam ficar fora do inventário e por que isso é um risco."
    ],
    "expectedDeliverables": [
      "Uma tabela com item e papel, mais 3 a 5 linhas sobre papéis acumulados e inventário."
    ]
  },
  "commentedSolution": {
    "reasoning": "Separe a coisa física (a máquina ou o equipamento) da função que ela oferece e do que ela faz com o tráfego dos outros. Um mesmo item pode aparecer em mais de uma linha.",
    "steps": [
      "Notebooks e impressoras: dispositivos finais.",
      "Switches e access point: intermediários.",
      "Roteador com firewall: intermediário (encaminha e traduz endereços) e ponto de política (as regras do firewall); é destino quando alguém abre a administração dele.",
      "Servidor: dispositivo final que hospeda três serviços (arquivos compartilhados, DNS e DHCP).",
      "Sistema web: serviço externo; o caminho até ele passa pelo roteador e pelo provedor.",
      "Inventário: impressoras e o access point costumam ser esquecidos, mas têm IP, firmware e senha."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Classificar o servidor apenas como serviço.",
        "whyItIsWrong": "A máquina é dispositivo final; arquivos, DNS e DHCP são os serviços que ela oferece. Reiniciá-la derruba os três."
      },
      {
        "answer": "Chamar o roteador com firewall só de roteador.",
        "whyItIsWrong": "Ele também filtra, traduz endereços e registra tráfego; ignorar isso esconde onde a política é aplicada."
      }
    ],
    "finalAnswer": "Notebooks, impressoras e servidor são dispositivos finais; switches, access point e roteador são intermediários; arquivos, DNS, DHCP e o sistema web são serviços; as regras do firewall são a política. Roteador e servidor acumulam papéis, e impressoras e access point precisam entrar no inventário."
  },
  "glossary": [
    {
      "term": "Porta",
      "shortDefinition": "Número que identifica qual serviço, dentro de uma máquina, deve receber um pedido.",
      "example": "Na mesma máquina, o site atende na porta 443 e o acesso remoto (SSH) na porta 22.",
      "relatedLessons": [
        "6.2"
      ]
    },
    {
      "term": "Ping",
      "shortDefinition": "Comando que envia um pedido simples a um endereço e espera a resposta, para testar se ele é alcançável.",
      "longDefinition": "Uma resposta ao ping mostra que a máquina está ligada e alcançável, não que os serviços dela estejam funcionando.",
      "example": "ping 192.168.0.1 testa se o roteador de casa responde.",
      "relatedLessons": [
        "1.9",
        "4.8"
      ]
    },
    {
      "term": "Gateway padrão",
      "shortDefinition": "O equipamento, normalmente o roteador, para onde o aparelho envia tudo o que é de fora da rede local.",
      "example": "Em casa, o gateway costuma ser o roteador Wi-Fi, como 192.168.0.1.",
      "relatedLessons": [
        "4.5"
      ]
    },
    {
      "term": "NAT",
      "shortDefinition": "Tradução de endereços: o roteador troca os endereços internos dos aparelhos pelo seu endereço na internet.",
      "example": "Celular, notebook e TV de casa saem para a internet com o mesmo endereço público do roteador.",
      "relatedLessons": [
        "7.8"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base conceitual de bits, sinais, protocolos e pensamento em camadas."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Relação com pipelines, runners, registries, clusters e automação."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Relação entre conectividade, serviços, identidade e autorização."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "fundamentos",
      "reason": "Runners, registries, clusters e APIs também devem ser classificados como workloads, intermediários, serviços e políticas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "fundamentos",
      "reason": "Acesso a serviço depende de rede, mas também de autenticação, autorização e identidade."
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
      "1.3"
    ]
  }
};
