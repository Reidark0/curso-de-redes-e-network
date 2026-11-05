export const lesson0107 = {
  "id": "1.7",
  "moduleId": "m01",
  "order": 7,
  "title": "Equipamentos de rede: NIC, hub, switch, roteador, AP e firewall",
  "subtitle": "Como entender o papel de cada equipamento antes de configurar, diagnosticar ou proteger uma rede.",
  "duration": "15-25 min + 30 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "fundamentos",
    "NIC",
    "hub",
    "switch",
    "roteador",
    "access point",
    "firewall",
    "camadas",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.2",
      "reason": "É necessário diferenciar dispositivos finais, intermediários e serviços antes de estudar equipamentos específicos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.4",
      "reason": "Topologias físicas e lógicas ajudam a entender onde cada equipamento aparece no desenho da rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.6",
      "reason": "Cabeamento estruturado explica como os equipamentos são interligados fisicamente."
    }
  ],
  "objectives": [
    "Diferenciar NIC, hub, switch, roteador, access point e firewall pela informação que cada um lê e pela decisão que toma.",
    "Explicar como o switch usa a tabela MAC (aprender, encaminhar, inundar) e como o roteador usa a tabela de rotas (rede conectada e rota default).",
    "Diante de um sintoma (sem link, só o Wi-Fi falha, a rede local funciona mas a internet não), apontar qual equipamento investigar primeiro."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Um colega manda mensagem: “a internet caiu”. Para ele, a rede é uma caixa com luzes que “passa internet”. Você reinicia o roteador e nada muda. Reinicia de novo. Só que a falha pode estar em lugares bem diferentes: na placa de rede do notebook, que perdeu o link; na porta do switch; no access point, que parou de aceitar clientes; na saída para o provedor; ou numa regra de firewall que começou a bloquear um site.</p>\n  <p>Cada um desses equipamentos decide uma coisa diferente, com informações diferentes, e por isso cada um mostra pistas diferentes. Sem saber o papel de cada um, o diagnóstico vira tentativa e erro: reiniciar, trocar cabo, ligar para o provedor. Em segurança é igual: quando um alerta aponta uma máquina suspeita, o analista precisa saber se a evidência está no switch, no AP ou no firewall.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando todos os equipamentos são tratados como “a caixa que passa internet”. Uma rede precisa cumprir várias tarefas: ligar cada dispositivo ao meio, entregar dados entre máquinas da mesma rede local, levar dados de uma rede para outra, aceitar clientes sem fio e decidir o que pode passar. Cada equipamento se especializou numa dessas tarefas. As primeiras redes locais usavam hubs, que só repetiam o sinal; o switch surgiu para entregar cada dado apenas ao destino.</p>\n  <p>A confusão piora porque o roteador de casa junta quase tudo numa caixa só. Esta aula separa os papéis: que informação cada equipamento lê, que tabela ou regra consulta e que decisão toma. Com isso, você sabe por onde começar a investigar.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> um equipamento de rede é um componente, físico ou virtual, que participa da comunicação lendo uma informação do tráfego e tomando uma decisão sobre ele. Para entender qualquer um, responda três perguntas: o que ele lê, que tabela ou regra consulta e o que decide.</div>\n  <p>Duas informações aparecem o tempo todo nessas decisões:</p>\n  <ul>\n    <li><strong>Endereço MAC:</strong> identifica uma placa de rede dentro da rede local. Vem gravado na placa e é escrito em hexadecimal, como <code>00:1a:2b:3c:4d:5e</code>. Viaja no quadro, o bloco de dados que circula na rede local (aula 1.5).</li>\n    <li><strong>Endereço IP:</strong> identifica o dispositivo entre redes, como <code>192.168.10.25</code>. Viaja no pacote, que vai dentro do quadro e atravessa várias redes até o destino.</li>\n  </ul>\n  <p>Na linguagem das camadas (aula 0.8), o MAC é informação da camada 2 (enlace) e o IP, da camada 3 (rede). Por isso se diz que o switch é um equipamento de camada 2 e o roteador, de camada 3.</p>\n  <p>O nome da caixa engana. O roteador de casa é, ao mesmo tempo, switch, access point, roteador e firewall básico; um firewall de empresa também roteia. O que define o papel é a decisão tomada, não o nome na etiqueta.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Cada equipamento lê uma informação diferente e toma uma decisão diferente:</p>\n  <ol class=\"flow-list\">\n    <li><strong>NIC (placa de rede):</strong> liga o dispositivo final ao cabo ou ao rádio. Negocia o link e a velocidade com a outra ponta, tem o endereço MAC e envia e recebe quadros. Depende de driver e da configuração do sistema: quando algo falha aqui, o sistema mostra “sem rede”.</li>\n    <li><strong>Hub:</strong> recebe o sinal numa porta e o repete em todas as outras. Não lê endereço nenhum. Todos dividem o mesmo meio: enquanto um transmite, os outros esperam, e qualquer porta vê o tráfego de todas.</li>\n    <li><strong>Switch:</strong> lê os endereços MAC dos quadros e mantém a <strong>tabela MAC</strong>, que diz em que porta está cada MAC. Ele <em>aprende</em> (anota o MAC de origem de cada quadro e a porta por onde ele entrou), <em>encaminha</em> (se o MAC de destino está na tabela, envia o quadro só por aquela porta) e <em>inunda</em> (se o destino ainda não está na tabela, ou se o quadro é um broadcast, endereçado a todos, envia por todas as portas, exceto a de entrada; num switch dividido em VLANs, só pelas portas da mesma VLAN). Quando o destino responde, o switch aprende onde ele está.</li>\n    <li><strong>Roteador:</strong> lê o endereço IP de destino do pacote, consulta a <strong>tabela de rotas</strong> e escolhe o próximo salto, o próximo equipamento no caminho até a rede de destino. Ele não repassa broadcasts de uma rede para outra.</li>\n    <li><strong>Access point (AP):</strong> liga clientes sem fio à rede cabeada. Anuncia o nome da rede (SSID), autentica quem tem a senha, usa um canal de rádio e repassa os quadros entre o rádio e o cabo. Depois dele, o tráfego ainda depende do switch, do roteador e do resto.</li>\n    <li><strong>Firewall:</strong> compara cada conexão com regras (origem, destino, porta e protocolo; nos mais avançados, também aplicação e usuário). Permite, bloqueia e registra o que fez. Muitos firewalls também roteiam, mas o papel deles é decidir o que pode passar.</li>\n  </ol>\n  <h3>As duas tabelas, com valores</h3>\n  <div class=\"responsive-table\">\n  <table class=\"data-table\">\n    <thead><tr><th>Tabela</th><th>Entrada de exemplo</th><th>Leitura</th></tr></thead>\n    <tbody>\n      <tr><td>Tabela MAC (switch)</td><td>00:1a:2b:3c:4d:5e · porta 3</td><td>Quadros para esse MAC saem só pela porta 3.</td></tr>\n      <tr><td>Tabela de rotas (roteador)</td><td>192.168.10.0/24 · conectada · interface LAN</td><td>Destinos de 192.168.10.0 a 192.168.10.255 estão na rede ligada direto à interface LAN.</td></tr>\n      <tr><td>Tabela de rotas (roteador)</td><td>0.0.0.0/0 · via 203.0.113.1</td><td>Rota default: o que não casa com nenhuma outra rota segue para o próximo salto 203.0.113.1 (o provedor).</td></tr>\n    </tbody>\n  </table>\n  </div>\n  <p>O <code>/24</code> indica o tamanho da rede (aqui, os 256 endereços de 192.168.10.0 a 192.168.10.255); você aprende a calcular isso na aula 4.3.</p>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Switch e roteador fazem a mesma coisa:</strong> a confusão vem do roteador de casa, que tem os dois na mesma caixa. Misturar os papéis leva a procurar na rede local um problema que está entre redes, ou o contrário.</li>\n      <li><strong>Firewall é roteador com bloqueio:</strong> quem pensa só em rota ignora as regras e os registros, que são justamente onde o firewall mostra por que bloqueou uma conexão.</li>\n      <li><strong>Ignorar a NIC:</strong> a placa de rede é invisível quando funciona. Driver, energia ou velocidade errada aparecem como “sem rede”; comece verificando link e configuração do próprio host.</li>\n    </ul>\n  </div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense num prédio de escritórios. A NIC é a porta de cada sala; o switch é a recepção do andar, que sabe em que sala cada pessoa está; o roteador é o serviço de entregas, que sabe levar pacotes a outros prédios; o AP é a entrada para quem chega sem passar pelo corredor; e o firewall é a segurança, que confere quem pode entrar e sair de cada área. O hub seria alguém que grita cada recado para o andar inteiro.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu notebook usa a NIC Wi‑Fi para falar com o roteador residencial. Essa caixa cumpre vários papéis: o AP recebe o sinal de rádio; as portas LAN da parte de trás formam um pequeno switch; a parte de roteador envia ao provedor tudo o que não é da rede de casa (a rota default); e um firewall básico bloqueia conexões que chegam da internet sem terem sido pedidas. Ela ainda distribui endereços IP (DHCP) e faz NAT, como você viu na aula 1.2.</p>\n  <p>Separar os papéis ajuda a diagnosticar. Pergunte: o que funciona e o que falha passam por quais equipamentos em comum?</p>\n  <ul>\n    <li><strong>O notebook no cabo não acende a luz de link:</strong> a falha está perto da NIC, do cabo ou da porta. Rádio, rota e provedor nem entram em jogo.</li>\n    <li><strong>O notebook no Wi‑Fi imprime na impressora de casa, mas nenhum site abre:</strong> AP e switch estão funcionando, porque a rede local responde. O problema está do roteador para fora: rota, DNS, firewall ou link do provedor.</li>\n  </ul>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1100 520\" role=\"img\" aria-labelledby=\"m01l07-title m01l07-desc\">\n    <title id=\"m01l07-title\">Papéis dos equipamentos de rede</title>\n    <desc id=\"m01l07-desc\">Um notebook, pela sua NIC, liga-se a um switch, que lê endereços MAC. O switch também liga um servidor local e um access point, que atende um celular pelo rádio. Do switch, o tráfego para fora vai ao roteador, que lê o IP de destino, e ao firewall, que compara com regras, antes de chegar à internet. Um hub aparece à parte como equipamento legado que repete o sinal em todas as portas.</desc>\n    <defs>\n      <marker id=\"m01l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"30\" y=\"85\" width=\"160\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"116\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n    <text x=\"110\" y=\"140\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">NIC: placa de rede</text>\n\n    <rect x=\"250\" y=\"85\" width=\"160\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"330\" y=\"116\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"330\" y=\"140\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">lê MAC · tabela MAC</text>\n\n    <rect x=\"470\" y=\"85\" width=\"160\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"550\" y=\"116\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text>\n    <text x=\"550\" y=\"140\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">lê IP · tabela de rotas</text>\n\n    <rect x=\"690\" y=\"85\" width=\"160\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"770\" y=\"116\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"770\" y=\"140\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">compara com regras</text>\n\n    <rect x=\"910\" y=\"85\" width=\"160\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"990\" y=\"116\" text-anchor=\"middle\" class=\"svg-label\">Internet</text>\n    <text x=\"990\" y=\"140\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">outras redes</text>\n\n    <rect x=\"30\" y=\"255\" width=\"160\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"110\" y=\"286\" text-anchor=\"middle\" class=\"svg-label\">Access point</text>\n    <text x=\"110\" y=\"310\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rádio ↔ cabo</text>\n\n    <rect x=\"30\" y=\"410\" width=\"160\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"441\" text-anchor=\"middle\" class=\"svg-label\">Celular</text>\n    <text x=\"110\" y=\"465\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cliente Wi‑Fi</text>\n\n    <rect x=\"250\" y=\"255\" width=\"160\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"330\" y=\"286\" text-anchor=\"middle\" class=\"svg-label\">Servidor</text>\n    <text x=\"330\" y=\"310\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mesma rede local</text>\n\n    <line x1=\"190\" y1=\"121\" x2=\"250\" y2=\"121\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"410\" y1=\"121\" x2=\"470\" y2=\"121\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"630\" y1=\"121\" x2=\"690\" y2=\"121\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"850\" y1=\"121\" x2=\"910\" y2=\"121\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"330\" y1=\"157\" x2=\"330\" y2=\"255\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"190\" y1=\"275\" x2=\"285\" y2=\"157\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"110\" y1=\"410\" x2=\"110\" y2=\"327\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <text x=\"160\" y=\"375\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rádio</text>\n\n    <rect x=\"690\" y=\"225\" width=\"380\" height=\"120\" rx=\"14\" class=\"svg-boundary\" />\n    <text x=\"880\" y=\"248\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Legado: fora das redes modernas</text>\n    <rect x=\"800\" y=\"260\" width=\"160\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"880\" y=\"291\" text-anchor=\"middle\" class=\"svg-label\">Hub</text>\n    <text x=\"880\" y=\"315\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">repete em todas as portas</text>\n\n    <rect x=\"470\" y=\"395\" width=\"380\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"660\" y=\"425\" text-anchor=\"middle\" class=\"svg-label\">Pergunta de diagnóstico</text>\n    <text x=\"660\" y=\"450\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quem liga, repete, comuta, roteia,</text>\n    <text x=\"660\" y=\"470\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">dá acesso sem fio ou aplica regras?</text>\n\n    <text x=\"550\" y=\"505\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">No roteador de casa, switch, AP, roteador e firewall básico ficam na mesma caixa; os papéis continuam separados.</text>\n  </svg>\n</section>\n",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> cada equipamento lê uma informação, consulta uma tabela ou regra e toma uma decisão diferente.</li>\n    <li>NIC liga o host; hub repete em todas as portas; AP liga o Wi‑Fi à rede cabeada.</li>\n    <li>Switch lê MAC: aprende portas, encaminha só ao destino e inunda quando não o conhece.</li>\n    <li>Roteador lê o IP de destino e escolhe o próximo salto; firewall aplica regras.</li>\n    <li>Para diagnosticar: o que funciona e o que falha têm em comum?</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estuda métricas: latência, jitter, perda, throughput e disponibilidade. Depois de saber quem participa da rede, falta aprender a medir se a comunicação está boa, ruim, instável ou indisponível.</p>\n</section>\n"
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
      "ARP",
      "IPv4",
      "IPv6",
      "ICMP",
      "TCP",
      "UDP",
      "HTTP",
      "DNS",
      "802.11",
      "802.1X"
    ],
    "dependsOn": [
      "dispositivos finais",
      "topologias",
      "meios de transmissão",
      "cabeamento estruturado",
      "protocolos"
    ],
    "enables": [
      "switching",
      "roteamento",
      "segurança de borda",
      "Wi‑Fi corporativo",
      "segmentação",
      "troubleshooting"
    ]
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Um switch acabou de ser ligado, com a tabela MAC vazia. O PC A (porta 1) envia um quadro para o PC B (porta 5), B responde e A envia outro quadro. O que o switch faz com cada quadro?",
      "hints": [
        "Ele aprende sempre pelo MAC de origem."
      ],
      "expectedIdeas": [
        "aprende A e inunda",
        "aprende B e envia só pela porta 1",
        "envia só pela porta 5"
      ],
      "explanation": "1º quadro: anota A na porta 1 e, sem conhecer B, inunda. Resposta: anota B na porta 5 e envia só pela porta 1. 3º quadro: os dois estão na tabela, e o quadro sai só pela porta 5."
    },
    {
      "type": "cenário real",
      "question": "Um funcionário liga um roteador Wi-Fi doméstico numa tomada da empresa para melhorar o sinal na sala. Usando o papel do AP, explique o risco.",
      "hints": [
        "O que o AP faz entre o rádio e o cabo?"
      ],
      "expectedIdeas": [
        "o AP liga o rádio à rede cabeada",
        "quem alcança o sinal entra na rede interna",
        "senha fora do controle da equipe"
      ],
      "explanation": "O AP repassa quadros entre o rádio e o cabo. Ligado na tomada, dá a quem estiver ao alcance do sinal, até fora do prédio, uma entrada para a rede interna, com uma senha que a equipe de rede não controla."
    }
  ],
  "quiz": [
    {
      "id": "q1.7.1",
      "question": "Qual é o papel principal de uma NIC?",
      "options": [
        "Escolher o próximo salto para alcançar outra rede",
        "Conectar o dispositivo final à rede",
        "Aprender MACs e encaminhar quadros entre portas da LAN",
        "Aplicar regras de política entre zonas"
      ],
      "answer": 1,
      "explanation": "A NIC é a interface de rede do dispositivo final, com MAC, driver e link físico ou sem fio. Próximo salto é decisão do roteador, tabela MAC é do switch e política entre zonas é do firewall.",
      "topic": "NIC",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.7.2",
      "question": "Qual afirmação diferencia melhor switch e roteador?",
      "options": [
        "Switch encaminha pelo IP de destino; roteador encaminha pelo MAC de destino",
        "Switch repete o sinal para todas as portas; roteador aprende MACs",
        "Switch aplica política entre zonas; roteador conecta clientes Wi‑Fi",
        "Switch comuta quadros por MAC na LAN; roteador encaminha pacotes por IP entre redes"
      ],
      "answer": 3,
      "explanation": "Switch atua principalmente em camada 2, usando MAC e tabela MAC. Roteador atua em camada 3, usando IP de destino e tabela de rotas. Repetir para todas as portas é comportamento de hub.",
      "topic": "switch vs roteador",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.7.4",
      "question": "Usuários cabeados funcionam, mas usuários Wi‑Fi oscilam. Qual componente deve ganhar prioridade na investigação?",
      "options": [
        "Link do provedor de internet",
        "AP, rádio, canal, interferência e autenticação Wi‑Fi",
        "Regras do firewall de borda",
        "Tabela de rotas do roteador de borda"
      ],
      "answer": 1,
      "explanation": "Os usuários cabeados usam o mesmo provedor, firewall e roteador de borda e funcionam. Quando a falha é restrita ao Wi‑Fi, AP e radiofrequência são as hipóteses mais fortes.",
      "topic": "Wi‑Fi",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q1.7.6",
      "question": "Por que hub é pouco usado em redes modernas de produção?",
      "options": [
        "Porque repete o tráfego para todas as portas, sem tabela MAC",
        "Porque exige um endereço IP configurado em cada porta",
        "Porque bloqueia broadcast entre as portas",
        "Porque só funciona com fibra óptica"
      ],
      "answer": 0,
      "explanation": "Hubs repetem sinais para todas as portas e não aprendem MACs: todos disputam o mesmo meio, o desempenho cai e qualquer porta vê o tráfego das outras. Switches resolveram isso.",
      "topic": "hub",
      "difficulty": "iniciante",
      "type": "pegadinha"
    },
    {
      "id": "q1.7.7",
      "question": "Um switch recebe um quadro para um MAC de destino que ainda não está na tabela MAC. O que ele faz?",
      "options": [
        "Descarta o quadro e registra um log",
        "Envia o quadro por todas as portas, exceto a de entrada",
        "Consulta a tabela de rotas e envia ao gateway",
        "Devolve o quadro para a porta de origem"
      ],
      "answer": 1,
      "explanation": "Sem entrada para o destino, o switch inunda o quadro por todas as portas, exceto a de entrada (num switch dividido em VLANs, só pelas portas da mesma VLAN). Quando o destino responde, o switch aprende o MAC dele pela origem do quadro de resposta.",
      "topic": "switch",
      "difficulty": "iniciante-intermediário",
      "type": "mecanismo"
    },
    {
      "id": "q1.7.8",
      "question": "Um roteador tem duas rotas: 192.168.10.0/24 conectada à interface LAN e 0.0.0.0/0 via 203.0.113.1. Para onde ele envia um pacote com destino 8.8.8.8?",
      "options": [
        "Para a interface LAN, porque é a primeira rota da tabela",
        "Para todas as interfaces, porque o destino não está na tabela",
        "Para o próximo salto 203.0.113.1, pela rota default",
        "Para o switch, que procura 8.8.8.8 na tabela MAC"
      ],
      "answer": 2,
      "explanation": "8.8.8.8 não está entre 192.168.10.0 e 192.168.10.255, então não casa com a rede conectada. Sobra a rota default, que manda tudo o que não casa com outra rota para 203.0.113.1. Inundar é comportamento do switch, e a tabela MAC guarda MACs, não IPs.",
      "topic": "tabela de rotas",
      "difficulty": "iniciante",
      "type": "mecanismo"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.7.8",
      "front": "O que a NIC faz e de que ela depende?",
      "back": "Negocia o link e a velocidade, tem um endereço MAC e envia e recebe quadros. Depende de driver e da configuração do sistema; por isso falhas de driver, energia ou velocidade aparecem como “sem rede”.",
      "tags": [
        "NIC",
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.7.2",
      "front": "Qual é a decisão principal de um switch?",
      "back": "Encaminhar quadros na LAN com base em endereços MAC e tabela MAC.",
      "tags": [
        "switch",
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.7.3",
      "front": "Qual é a decisão principal de um roteador?",
      "back": "Encaminhar pacotes entre redes com base no endereço IP de destino e na tabela de rotas.",
      "tags": [
        "roteador",
        "camada 3"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.7.4",
      "front": "Qual é o papel de um AP?",
      "back": "Ligar clientes sem fio à rede cabeada: anuncia o SSID, autentica os clientes e repassa os quadros entre o rádio e o cabo.",
      "tags": [
        "AP",
        "Wi‑Fi"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.7.5",
      "front": "Firewall é igual a roteador?",
      "back": "Não. Ele pode rotear, mas seu papel principal é comparar conexões com regras, permitir ou bloquear e registrar o que fez.",
      "tags": [
        "firewall",
        "segurança"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc1.7.9",
      "front": "Hub, switch e roteador: quem recebe o tráfego?",
      "back": "Hub: repete tudo em todas as portas. Switch: entrega cada quadro só na porta do destino, mas broadcast e destino desconhecido vão para todas as portas. Roteador: não repassa broadcast de uma rede para outra.",
      "tags": [
        "hub",
        "switch",
        "roteador",
        "broadcast"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex1.7.2",
      "type": "diagnóstico",
      "prompt": "O celular de um usuário aparece conectado ao Wi-Fi da empresa, mas não recebe endereço IP. Outros celulares no mesmo AP funcionam. Que hipóteses você levanta e quais descarta?",
      "expectedAnswer": "Descarte AP, switch e o caminho até o DHCP (atendem os outros celulares) e também rota, firewall e provedor (só importam depois que há IP). Sobram o próprio celular (placa ou sistema; teste esquecer a rede e reconectar) e o DHCP sem endereços livres para distribuir.",
      "explanation": "Aplica a pergunta da aula: o que funciona e o que falha têm em comum? Aqui, só o celular é diferente."
    },
    {
      "id": "ex1.7.5",
      "type": "classificação",
      "prompt": "Diga qual papel (NIC, hub, switch, roteador, AP ou firewall) tomou cada decisão: (a) um quadro entrou na porta 2 e saiu só pela porta 7; (b) um pacote para 200.150.10.5 foi enviado ao provedor; (c) uma conexão para a porta 3389 de um servidor foi bloqueada e registrada; (d) o nome Escritorio apareceu na lista de redes do celular; (e) o sinal saiu por todas as portas sem nenhum endereço ser lido; (f) o notebook negociou link de 1 Gbps com a porta do switch.",
      "expectedAnswer": "(a) switch; (b) roteador, pela rota default; (c) firewall; (d) AP, que anuncia o SSID; (e) hub; (f) NIC.",
      "explanation": "Cada caso descreve uma decisão, não uma caixa: assim você reconhece os papéis mesmo dentro do roteador de casa."
    }
  ],
  "challenge": {
    "title": "Três chamados no mesmo escritório",
    "scenario": "Um escritório tem: um switch de 16 portas, com 8 PCs, uma impressora de rede e um AP no teto; do switch, o tráfego para fora passa pelo roteador e pelo firewall até o modem do provedor. Na mesma manhã chegam três chamados: (1) o PC da recepção mostra “cabo de rede desconectado”, e os outros PCs funcionam; (2) nenhum PC encontra a impressora, mas todos navegam na internet; (3) ninguém, no cabo ou no Wi-Fi, abre o site de um fornecedor, mas todos os outros sites abrem.",
    "tasks": [
      "Para cada chamado, dizer qual equipamento investigar primeiro e por quê.",
      "Dizer o que verificar nele e quais equipamentos ficam descartados."
    ],
    "expectedDeliverables": [
      "Uma tabela: chamado, suspeito, o que verificar, o que foi descartado."
    ]
  },
  "commentedSolution": {
    "reasoning": "Compare o que falha com o que funciona e procure o equipamento que só o caso com falha usa.",
    "steps": [
      "Chamado 1: só um PC, sem link. Suspeitos: NIC, patch cord ou porta do switch; confira a luz de link e troque cabo ou porta. Switch, roteador e firewall atendem os outros PCs.",
      "Chamado 2: todos perdem só a impressora, e a internet funciona, então switch, roteador e firewall estão bem. Suspeitos: NIC, cabo ou porta da impressora; confira se ela está ligada e com link.",
      "Chamado 3: todos perdem um único site, no cabo e no Wi-Fi. A rota default funciona (os outros sites abrem), e AP e switch não decidem nada sobre sites. Confirme pelo 4G do celular que o site está no ar; se estiver, procure nos registros do firewall um bloqueio para o endereço do fornecedor."
    ],
    "commonMistakes": [
      "Reiniciar o roteador nos três casos: ele é comum a tudo o que funciona.",
      "Culpar o AP no chamado 3: a falha também acontece no cabo."
    ],
    "finalAnswer": "1: NIC, cabo ou porta do PC. 2: NIC, cabo ou porta da impressora. 3: se o site abre de fora, regra do firewall. O suspeito é sempre o que só o caso com falha usa."
  },
  "glossary": [
    {
      "term": "VLAN",
      "shortDefinition": "Divisão das portas de um switch em redes locais separadas.",
      "example": "Num switch com VLANs, um broadcast da VLAN 10 não chega às portas da VLAN 20.",
      "relatedLessons": [
        "1.4",
        "3.7"
      ]
    },
    {
      "term": "NAT",
      "shortDefinition": "Tradução dos endereços internos da rede para o endereço que o provedor fornece, feita normalmente pelo roteador de borda.",
      "example": "Os aparelhos de casa usam 192.168.x.x, mas na internet todos aparecem com o mesmo IP público.",
      "relatedLessons": [
        "1.2",
        "9.5"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Módulo 0 — Fundamentos da Computação",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base de bits, sinais, protocolos e pensamento em camadas."
    },
    {
      "type": "internal-course",
      "title": "Módulo 1.6 — Cabeamento estruturado e padrões RJ-45",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Pré-requisito físico para entender interconexão de equipamentos."
    },
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Família de padrões relacionada a Ethernet e switches."
    },
    {
      "type": "standard",
      "title": "IEEE 802.11 Wireless LAN",
      "organization": "IEEE",
      "url": "",
      "note": "Família de padrões relacionada a Wi‑Fi e access points."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e Kubernetes",
      "lesson": "a definir",
      "reason": "NICs virtuais, load balancers, ingress controllers e security groups reaparecem em cloud e Kubernetes."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Controle de acesso e identidade",
      "lesson": "a definir",
      "reason": "802.1X, NAC, VPN e políticas de firewall se conectam com identidade e autorização."
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
      "1.8"
    ]
  }
};
