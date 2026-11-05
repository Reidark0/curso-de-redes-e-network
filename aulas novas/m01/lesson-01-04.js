export const lesson0104 = {
  "id": "1.4",
  "moduleId": "m01",
  "order": 4,
  "title": "Topologias físicas e lógicas",
  "subtitle": "Como separar o desenho dos cabos do caminho real do tráfego para diagnosticar, proteger e evoluir redes.",
  "duration": "15-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 185,
  "tags": [
    "redes",
    "fundamentos",
    "topologia física",
    "topologia lógica",
    "estrela",
    "malha",
    "barramento",
    "anel",
    "hub-and-spoke",
    "spine-leaf",
    "cloud",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.1",
      "reason": "É necessário entender rede como sistema de comunicação antes de analisar seu desenho."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.2",
      "reason": "Topologias envolvem dispositivos finais, intermediários, serviços e políticas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.3",
      "reason": "O tipo de rede influencia quais topologias fazem sentido em cada escala."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "Pensar em camadas ajuda a separar caminho físico, caminho lógico e serviço percebido pelo usuário."
    }
  ],
  "objectives": [
    "Diferenciar topologia física (como os equipamentos estão ligados) de topologia lógica (por onde o tráfego passa e sob quais regras) e explicar por que computadores no mesmo switch podem estar em redes lógicas diferentes.",
    "Reconhecer as topologias barramento, anel, estrela, árvore, malha, hub-and-spoke e spine-leaf, com a vantagem e a limitação de cada uma.",
    "Apontar pontos únicos de falha numa topologia e relacionar redundância com disponibilidade e custo."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Num escritório, dois computadores lado a lado estão ligados ao mesmo switch. Um imprime normalmente; o outro não encontra a impressora. O técnico troca o cabo, muda a porta do switch, troca até o switch. Nada resolve, e a tarde vai embora.</p>\n  <p>O cabo nunca foi o problema. Os dois computadores estão fisicamente juntos, mas o switch foi configurado para colocá-los em redes separadas, e só uma delas pode falar com a impressora. Quem olha só para os cabos enxerga um desenho; o tráfego segue outro.</p>\n  <p>Nesta aula você aprende a separar esses dois desenhos e a reconhecer as formas mais comuns de ligar uma rede. Em segurança, é esse segundo desenho, o das regras e caminhos, que diz até onde um computador invadido consegue chegar.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando se olha só um dos desenhos da rede. Toda rede tem pelo menos dois ao mesmo tempo, e os dois são verdadeiros: o físico, com cabos, rádio, portas e equipamentos, e o lógico, com quem pode falar com quem, por qual caminho e sob quais regras.</p>\n  <p>Nas redes antigas, em barramento ou em anel, os dois desenhos quase coincidiam. Com switches, redes separadas no mesmo equipamento, firewalls, túneis pela internet e cloud, eles se afastaram: hoje a mesma estrela de cabos pode esconder várias redes lógicas.</p>\n  <p>Além disso, quem projeta a rede escolhe uma forma de ligar as peças, e cada forma troca custo por resistência a falhas. Esta aula mostra como separar as duas visões e o que cada forma comum oferece e cobra.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>Topologia de rede é a forma como os elementos de uma rede estão organizados e conectados. Ela pode ser vista de dois jeitos.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> a <strong>topologia física</strong> descreve como cabos, enlaces de rádio, portas e equipamentos estão ligados. A <strong>topologia lógica</strong> descreve como o tráfego realmente flui: que grupos de dispositivos existem, que caminhos são usados e que regras controlam a comunicação.</div>\n  <p>As duas podem ser bem diferentes. Um switch pode ser configurado para dividir suas portas em redes separadas, chamadas VLANs: dois computadores no mesmo switch, em VLANs diferentes, só se falam se um roteador ou firewall deixar.</p>\n  <p>Em cloud, você não vê cabos nem switches: a topologia física fica com o provedor. A lógica continua existindo, em redes virtuais, rotas e regras, e é você quem a define.</p>\n  <p>A topologia lógica também define o estrago de uma invasão. Numa <strong>rede plana</strong>, em que todos ficam no mesmo grupo lógico, um computador invadido alcança todos os outros sem passar por nenhuma barreira. Separar a rede em grupos e controlar a passagem entre eles limita o alcance do invasor (tema da aula 9.4).</p>\n  <h3>Formas comuns de ligar uma rede</h3>\n  <div class=\"responsive-table\">\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Topologia</th><th>Como se liga</th><th>Vantagem</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Barramento</td><td>Todos compartilham um mesmo meio (quase sumiu)</td><td>Simples e barato em pequena escala</td><td>Transmissões simultâneas se atrapalham; uma falha no meio derruba todos</td></tr>\n      <tr><td>Anel</td><td>Cada nó ligado ao seguinte, fechando um círculo (anéis de fibra de operadoras)</td><td>Caminho previsível</td><td>Sem caminho reserva, um trecho com falha interrompe o anel</td></tr>\n      <tr><td>Estrela</td><td>Todos ligados a um ponto central (quase toda rede local)</td><td>Fácil de operar; um cabo ruim afeta só um dispositivo</td><td>O equipamento central é ponto único de falha</td></tr>\n      <tr><td>Árvore</td><td>Estrelas ligadas em hierarquia (redes de empresas)</td><td>Organiza andares, prédios e campus</td><td>Os níveis de cima concentram tráfego e podem virar gargalo</td></tr>\n      <tr><td>Malha</td><td>Vários caminhos entre os nós (núcleo de operadoras, Wi-Fi mesh)</td><td>Se um enlace cai, o tráfego usa outro</td><td>Mais enlaces, portas, custo e complexidade</td></tr>\n      <tr><td>Hub-and-spoke</td><td>Pontas (spokes) ligadas só a um centro (hub), como filiais à matriz</td><td>Controle centralizado</td><td>Dependência do hub; tráfego entre pontas dá a volta pelo centro</td></tr>\n      <tr><td>Spine-leaf</td><td>Cada switch leaf (folha) ligado a todos os spines (espinha), em datacenters</td><td>Servidores em leafs diferentes ficam sempre à mesma distância (leaf, spine, leaf); cresce acrescentando switches</td><td>Mais portas, cabos, planejamento e custo</td></tr>\n    </tbody>\n  </table>\n  </div>\n  <p>Um <strong>ponto único de falha</strong> é um componente sem alternativa cuja queda derruba uma função inteira, como o switch central de uma estrela. As formas com mais caminhos eliminam esses pontos, mas custam mais.</p>\n  <div class=\"callout warning\"><strong>Erros comuns</strong><ul>\n    <li><strong>Usar o diagrama como decoração:</strong> um bom diagrama responde quem fala com quem, por onde e sob qual regra. Simples demais esconde riscos; complexo demais ninguém usa.</li>\n    <li><strong>Confiar num diagrama antigo:</strong> redes mudam. Se o diagrama contradiz o que você observa na rede, vale a observação, e o diagrama precisa ser atualizado.</li>\n  </ul></div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>A topologia física diz quais caminhos existem. A lógica nasce das decisões que cada equipamento toma no meio do caminho. Acompanhe um computador enviando dados a um servidor:</p>\n  <ol class=\"flow-list\">\n    <li><strong>O computador decide:</strong> o destino está na mesma rede local ou fora dela? Se está fora, ele entrega os dados ao gateway, o equipamento que leva o tráfego para outras redes.</li>\n    <li><strong>O primeiro equipamento recebe:</strong> o switch ou o ponto de acesso Wi-Fi a que o computador está ligado leva os dados adiante, até o destino local ou até o gateway.</li>\n    <li><strong>Cada intermediário aplica sua lógica:</strong> o switch escolhe a porta de saída e respeita a separação em VLANs; o roteador escolhe a próxima rede; o firewall permite ou bloqueia conforme as regras.</li>\n    <li><strong>O caminho pode mudar:</strong> se há caminhos redundantes e um enlace cai, os equipamentos passam a usar outro. Numa estrela sem redundância, não há para onde desviar.</li>\n  </ol>\n  <p>Por isso topologia não é um desenho estático: uma mudança de regra altera a topologia lógica sem que nenhum cabo saia do lugar, e é assim que um diagrama fica desatualizado.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>Em empresas, a árvore costuma ser organizada em três níveis:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Acesso:</strong> switches e pontos de acesso Wi-Fi onde usuários, impressoras e câmeras se conectam, em estrela.</li>\n    <li><strong>Distribuição:</strong> switches que agregam os de acesso de um andar ou prédio; aqui começam a separação em VLANs e as regras entre elas.</li>\n    <li><strong>Núcleo (core):</strong> ligações de alta capacidade entre prédios, datacenter, internet e firewalls.</li>\n  </ul>\n  <p>O cabo que liga um switch de acesso à distribuição (o <em>uplink</em>) e cada switch de distribuição são pontos únicos de falha para quem está abaixo deles. Dobrá-los aproxima a árvore de uma malha, mas custa mais switches, portas e energia: superdimensionar desperdiça orçamento; subdimensionar aumenta o risco de queda.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense numa cidade. A topologia física são as ruas, pontes e túneis; a lógica são as regras de trânsito: mão única, faixas exclusivas, bloqueios. Dois endereços vizinhos no mapa podem exigir uma volta enorme por causa de uma ponte fechada, assim como dois computadores no mesmo switch podem precisar passar por um firewall para se falar.</p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Desenhe a rede da sua casa nas duas visões.</p>\n  <ul>\n    <li><strong>Física:</strong> uma estrela. Celulares, notebook e TV se ligam por rádio ao roteador Wi-Fi, que se liga por cabo ao modem ou à fibra da operadora.</li>\n    <li><strong>Lógica:</strong> todos estão na mesma rede local e enviam ao roteador, que é o gateway, tudo o que vai para a internet. Uma <em>rede de visitantes</em> no mesmo roteador é uma segunda rede lógica: acessa a internet, mas não enxerga seus dispositivos.</li>\n  </ul>\n  <p>O roteador e o link da operadora são pontos únicos de falha: se um deles cai, a casa inteira fica sem internet. E quando o Wi-Fi aparece conectado mas nada abre, a parte física (o rádio) pode estar boa enquanto a lógica, do gateway para fora, está quebrada.</p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 540\" role=\"img\" aria-labelledby=\"m01l04-title m01l04-desc\">\n    <title id=\"m01l04-title\">Topologia física e topologia lógica</title>\n    <desc id=\"m01l04-desc\">Diagrama comparando a conexão física por switch central com caminhos lógicos separados por VLAN, firewall, WAN e cloud.</desc>\n    <defs>\n      <marker id=\"m01l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"35\" width=\"420\" height=\"210\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"245\" y=\"68\" text-anchor=\"middle\" class=\"svg-label\">Topologia física</text>\n    <rect x=\"190\" y=\"125\" width=\"115\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"247\" y=\"162\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Switch</text>\n    <rect x=\"65\" y=\"115\" width=\"95\" height=\"50\" rx=\"10\" class=\"svg-node svg-node--client\" />\n    <text x=\"112\" y=\"145\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Usuário</text>\n    <rect x=\"335\" y=\"115\" width=\"90\" height=\"50\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"380\" y=\"145\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Servidor</text>\n    <rect x=\"85\" y=\"185\" width=\"95\" height=\"42\" rx=\"10\" class=\"svg-node svg-node--client\" />\n    <text x=\"132\" y=\"211\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Impressora</text>\n    <line x1=\"160\" y1=\"140\" x2=\"190\" y2=\"150\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <line x1=\"305\" y1=\"150\" x2=\"335\" y2=\"140\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <line x1=\"180\" y1=\"205\" x2=\"205\" y2=\"180\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <rect x=\"525\" y=\"35\" width=\"420\" height=\"430\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"735\" y=\"68\" text-anchor=\"middle\" class=\"svg-label\">Topologia lógica</text>\n    <rect x=\"565\" y=\"105\" width=\"120\" height=\"60\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"625\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN</text>\n    <text x=\"625\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Usuários</text>\n    <rect x=\"760\" y=\"105\" width=\"120\" height=\"60\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"820\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN</text>\n    <text x=\"820\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Servidores</text>\n    <rect x=\"655\" y=\"230\" width=\"120\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"715\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Firewall</text>\n    <text x=\"715\" y=\"275\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">regras</text>\n    <rect x=\"565\" y=\"365\" width=\"125\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"627\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">WAN</text>\n    <text x=\"627\" y=\"410\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Filial</text>\n    <rect x=\"755\" y=\"365\" width=\"125\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"817\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cloud</text>\n    <text x=\"817\" y=\"410\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rede virtual</text>\n    <path d=\"M625 165 C640 190, 670 210, 695 230\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <path d=\"M820 165 C800 195, 760 215, 735 230\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <line x1=\"690\" y1=\"292\" x2=\"640\" y2=\"365\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <line x1=\"745\" y1=\"292\" x2=\"805\" y2=\"365\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <rect x=\"70\" y=\"330\" width=\"380\" height=\"105\" rx=\"16\" class=\"svg-node svg-node--security\" />\n    <text x=\"260\" y=\"365\" text-anchor=\"middle\" class=\"svg-label\">Lição principal</text>\n    <text x=\"260\" y=\"393\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mesmo switch não significa mesma rede lógica</text>\n    <text x=\"260\" y=\"418\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">regras decidem quem passa de uma rede a outra</text>\n  </svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> a topologia física mostra como os equipamentos se ligam; a lógica, por onde o tráfego passa e sob quais regras.</li>\n    <li>Estar no mesmo switch não significa estar na mesma rede lógica.</li>\n    <li>Cada forma (estrela, árvore, malha, spine-leaf…) troca custo e simplicidade por resistência a falhas, controle ou escala.</li>\n    <li>Ponto único de falha é o componente sem alternativa; eliminá-lo custa enlaces e equipamentos.</li>\n    <li>Em cloud, a física some da sua vista, mas a lógica continua.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 1.5, meios de transmissão: cobre, fibra e rádio. A topologia mostra como os pontos se ligam; o meio explica por onde o sinal passa e que limites físicos aparecem na prática.</p>\n</section>\n"
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
      "STP",
      "ARP",
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "TLS",
      "BGP",
      "OSPF"
    ],
    "dependsOn": [
      "rede como sistema",
      "dispositivos finais",
      "dispositivos intermediários",
      "tipos de rede",
      "pensamento em camadas"
    ],
    "enables": [
      "meios de transmissão",
      "cabeamento estruturado",
      "switching",
      "VLAN",
      "roteamento",
      "firewall",
      "cloud networking",
      "troubleshooting profissional"
    ]
  },
  "lab": {
    "id": "lab-1.4",
    "title": "Mapa físico e lógico da sua rede",
    "labType": "local",
    "objective": "Descobrir por onde o tráfego do seu computador sai para a internet e desenhar sua rede nas duas visões.",
    "tools": [
      "Windows: Prompt de Comando ou PowerShell. Linux/macOS: terminal",
      "Papel ou editor de texto para os desenhos"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Ver sua interface e seu gateway",
        "instruction": "Descubra por qual interface seu computador está conectado (cabo ou Wi-Fi) e qual é o gateway padrão.",
        "command": "Windows: ipconfig /all\nLinux: ip addr && ip route\nmacOS: ifconfig && netstat -rn",
        "expectedOutput": "A interface ativa (Ethernet ou Wi-Fi) com um endereço IP e uma linha de gateway padrão (no Linux, a linha que começa com default via).",
        "explanation": "A interface diz como você se liga fisicamente: cabo ou rádio. O gateway é o primeiro passo do caminho lógico para fora da rede local; em casa, costuma ser o roteador Wi-Fi."
      },
      {
        "number": 2,
        "title": "Ver o caminho até a internet",
        "instruction": "Liste os equipamentos que encaminham seus dados até um destino público.",
        "command": "Windows: tracert 1.1.1.1\nLinux: traceroute 1.1.1.1 (ou tracepath 1.1.1.1)\nmacOS: traceroute 1.1.1.1",
        "expectedOutput": "Uma lista numerada de saltos: o primeiro é o seu gateway; os seguintes são da operadora e da internet. Alguns podem aparecer como *.",
        "explanation": "Este é o caminho lógico do seu tráfego, que nenhum cabo à vista mostra. Um * só indica que aquele equipamento não respondeu ao teste."
      },
      {
        "number": 3,
        "title": "Desenhar o mapa físico",
        "instruction": "Desenhe seu computador, o roteador ou ponto de acesso, o modem ou a fibra da operadora e os outros dispositivos que você conhece. Indique o que é cabo e o que é rádio.",
        "expectedOutput": "Um desenho simples, provavelmente uma estrela com o roteador no centro.",
        "explanation": "O que você não viu nem mediu fica marcado como hipótese."
      },
      {
        "number": 4,
        "title": "Desenhar o mapa lógico e os pontos únicos de falha",
        "instruction": "Em outro desenho, mostre a rede local, o gateway do passo 1 e o caminho do passo 2. Se houver rede de visitantes, desenhe-a separada. Circule cada componente cuja queda deixaria todos sem internet.",
        "expectedOutput": "Um mapa lógico com rede local, gateway e saída para a internet, e pelo menos dois pontos únicos de falha circulados, como o roteador e o link da operadora.",
        "explanation": "São os mesmos equipamentos vistos de outro jeito. Os pontos circulados são onde uma redundância faria diferença, e custaria dinheiro."
      }
    ],
    "expectedResult": "Dois desenhos da sua rede, o físico e o lógico, com o gateway, o caminho até a internet e os pontos únicos de falha marcados."
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "Metade dos usuários de um andar perdeu acesso aos servidores; a outra metade continua funcionando. Como a topologia ajuda a localizar a causa antes de mexer em qualquer equipamento?",
      "hints": [
        "Procure o que os afetados têm em comum e os outros não têm.",
        "Olhe as duas visões: switch de acesso e ponto de acesso Wi-Fi no físico; VLAN, gateway e regras no lógico."
      ],
      "expectedIdeas": [
        "ponto comum",
        "switch de acesso ou uplink",
        "VLAN",
        "regra de firewall",
        "diagrama atualizado"
      ],
      "explanation": "Comparar afetados e não afetados nos dois mapas revela o componente que só os afetados compartilham: um switch, um uplink, uma VLAN ou uma regra. Se o diagrama contradiz o que você observa, vale a observação."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa tem a matriz e 5 filiais, e todas precisam acessar o sistema que fica na matriz. Compare ligar cada filial só à matriz (hub-and-spoke) com ligar todas as unidades entre si (malha completa): custo, controle e o que acontece se a matriz cair.",
      "hints": [
        "Conte os enlaces de cada desenho.",
        "Uma malha ajuda se o próprio sistema, na matriz, estiver fora do ar?"
      ],
      "expectedIdeas": [
        "hub-and-spoke: 5 enlaces",
        "malha completa: 15 enlaces",
        "hub é ponto único de falha",
        "redundância na matriz"
      ],
      "explanation": "Hub-and-spoke usa 5 enlaces e centraliza o controle, mas a matriz vira ponto único de falha. A malha completa de 6 unidades usa 15 enlaces (6 × 5 ÷ 2) e dá caminhos alternativos, com mais custo e complexidade. Como o sistema está na matriz, a malha não resolve a queda dela: para isso é preciso redundância na própria matriz."
    }
  ],
  "quiz": [
    {
      "id": "q1.4.1",
      "question": "Qual alternativa descreve melhor topologia lógica?",
      "options": [
        "A disposição de cabos, portas e racks que ligam os equipamentos",
        "O caminho e as regras de comunicação percebidos pelo tráfego",
        "A lista de equipamentos e modelos instalados na rede",
        "A velocidade contratada do link de internet"
      ],
      "answer": 1,
      "explanation": "Topologia lógica descreve grupos, caminhos e regras do tráfego. Cabos, portas e racks são a topologia física.",
      "topic": "topologia lógica",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.4.2",
      "question": "Dois computadores estão no mesmo switch, mas em VLANs diferentes. O que é correto afirmar?",
      "options": [
        "Eles obrigatoriamente estão na mesma rede lógica",
        "Eles se comunicam diretamente porque compartilham o switch",
        "Eles podem estar fisicamente próximos e logicamente separados",
        "Só um cabo diferente poderia separá-los"
      ],
      "answer": 2,
      "explanation": "A topologia física é a mesma, mas a lógica separa os dois em VLANs diferentes: eles só se falam se um roteador ou firewall deixar.",
      "topic": "VLAN",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q1.4.3",
      "question": "Qual topologia tende a oferecer maior resistência a falhas por ter vários caminhos, mas aumenta custo e complexidade?",
      "options": [
        "Malha",
        "Barramento",
        "Estrela",
        "Hub-and-spoke"
      ],
      "answer": 0,
      "explanation": "A malha cria caminhos alternativos, mas exige mais enlaces, portas, planejamento e custo.",
      "topic": "malha",
      "difficulty": "iniciante-intermediário",
      "type": "comparação"
    },
    {
      "id": "q1.4.4",
      "question": "Por que uma rede plana, com todos os dispositivos no mesmo grupo lógico, é problemática em segurança?",
      "options": [
        "Porque impede a comunicação entre usuários e servidores",
        "Porque exige um switch para cada computador",
        "Porque precisa de mais firewalls internos",
        "Porque um computador invadido alcança todos os outros sem passar por nenhuma barreira"
      ],
      "answer": 3,
      "explanation": "Sem separação em grupos e sem controle entre eles, um computador comprometido alcança todos os outros. Separar a rede limita o alcance do invasor.",
      "topic": "segurança",
      "difficulty": "iniciante-intermediário",
      "type": "segurança"
    },
    {
      "id": "q1.4.5",
      "question": "Em cloud, você não vê cabos nem switches. O que é correto afirmar sobre a topologia?",
      "options": [
        "Não existe topologia, porque tudo é virtual",
        "A física fica com o provedor, mas a lógica continua existindo em redes virtuais, rotas e regras que você define",
        "A topologia lógica fica escondida, mas a física é igual à de uma rede local",
        "A topologia passa a ser sempre uma malha completa"
      ],
      "answer": 1,
      "explanation": "O provedor esconde switches, racks e cabos, mas a topologia lógica continua em redes virtuais, rotas e regras, definidas por você.",
      "topic": "cloud",
      "difficulty": "iniciante",
      "type": "cloud"
    },
    {
      "id": "q1.4.7",
      "type": "comparação",
      "question": "Em um datacenter spine-leaf, cada leaf se conecta a todos os spines. Qual é o principal benefício e o principal custo desse desenho?",
      "options": [
        "Controle centralizado em um hub, ao custo de caminhos mais longos",
        "Cabeamento mínimo, ao custo de transmissões que se atrapalham no meio compartilhado",
        "Caminho circular previsível, ao custo de um trecho com falha interromper o círculo",
        "Mesma distância entre servidores em leafs diferentes e crescimento simples, ao custo de mais portas e planejamento"
      ],
      "answer": 3,
      "explanation": "Em spine-leaf, servidores em leafs diferentes sempre passam por leaf, spine e leaf, e a rede cresce acrescentando switches; o preço é mais portas, cabos e planejamento. As outras opções descrevem hub-and-spoke, barramento e anel.",
      "difficulty": "iniciante-intermediário",
      "topic": "spine-leaf"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.4.1",
      "front": "O que é topologia física?",
      "back": "É o desenho das ligações reais: cabos, enlaces de rádio, portas e equipamentos como switches, roteadores e pontos de acesso.",
      "tags": [
        "topologia"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.4.2",
      "front": "O que é topologia lógica?",
      "back": "É a forma como o tráfego realmente flui: que grupos de dispositivos existem (como VLANs), que caminhos são usados e que regras controlam a comunicação.",
      "tags": [
        "topologia lógica"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.4.8",
      "front": "O que é um ponto único de falha?",
      "back": "Um componente sem alternativa cuja queda derruba uma função inteira, como o switch central de uma estrela ou o único link de internet.",
      "tags": [
        "disponibilidade"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.4.4",
      "front": "Qual o risco de topologia hub-and-spoke?",
      "back": "O hub pode virar gargalo ou ponto único de falha se não houver redundância e capacidade adequada.",
      "tags": [
        "WAN",
        "arquitetura"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.4.7",
      "front": "Na árvore de acesso, distribuição e núcleo (core), onde começam a separação em VLANs e as regras entre elas?",
      "back": "Na distribuição, que agrega os switches de acesso. O acesso conecta usuários e dispositivos; o núcleo liga prédios, datacenter, internet e firewalls.",
      "tags": [
        "arquitetura",
        "árvore"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex1.4.5",
      "type": "diagnóstico",
      "prompt": "Uma loja tem 8 computadores ligados por cabo a um switch. O switch se liga ao roteador, que se liga ao modem da operadora. (a) Qual é a topologia física da loja? (b) Quais são os pontos únicos de falha para o acesso à internet? (c) Proponha uma melhoria para um deles e diga quanto ela custa em equipamentos ou enlaces.",
      "expectedAnswer": "(a) Estrela, com o switch no centro. (b) O switch, o roteador, o modem e o link da operadora. (c) Por exemplo, um segundo link de outra operadora com um roteador capaz de usar os dois: custa mais um contrato e, conforme o caso, mais um equipamento.",
      "explanation": "Cada ponto único de falha pode ser eliminado, mas toda redundância tem preço."
    },
    {
      "id": "ex1.4.6",
      "type": "classificação",
      "prompt": "Qual topologia da tabela do Conceito descreve cada caso? (a) 30 filiais, cada uma ligada só à matriz; (b) 4 roteadores de uma operadora, cada um ligado aos outros 3; (c) um escritório com todos os computadores ligados a um switch; (d) um datacenter onde cada switch dos servidores se liga a todos os switches centrais; (e) um prédio com um switch por andar, todos ligados a um switch central.",
      "expectedAnswer": "(a) hub-and-spoke; (b) malha; (c) estrela; (d) spine-leaf; (e) árvore.",
      "explanation": "Reconhecer a forma é o primeiro passo para achar o ponto único de falha e o gargalo."
    }
  ],
  "challenge": {
    "title": "Desenhe duas visões de uma rede pequena",
    "scenario": "Uma empresa tem 20 usuários, Wi-Fi corporativo, Wi-Fi de visitantes, dois servidores internos, uma impressora, um switch, um firewall e um link de internet. Os visitantes não podem acessar os servidores nem a impressora.",
    "tasks": [
      "Desenhar a topologia física simplificada.",
      "Desenhar a topologia lógica, separando usuários, visitantes e servidores.",
      "Indicar onde fica o controle que impede visitantes de chegar aos servidores.",
      "Apontar dois pontos únicos de falha."
    ],
    "expectedDeliverables": [
      "Mapa físico",
      "Mapa lógico",
      "Lista de pontos únicos de falha"
    ]
  },
  "commentedSolution": {
    "reasoning": "Separe o que existe fisicamente do que precisa existir logicamente, agrupe os dispositivos por necessidade e decida onde a passagem entre os grupos é controlada.",
    "steps": [
      "Mapa físico: uma estrela. Computadores, impressora, servidores e pontos de acesso Wi-Fi ligados ao switch; o switch ao firewall; o firewall ao link de internet.",
      "Mapa lógico: três redes separadas, por exemplo VLANs: usuários (com a impressora), visitantes e servidores. Cada Wi-Fi entra na rede do seu grupo.",
      "Controle: o tráfego entre as redes passa pelo firewall, que deixa visitantes irem só para a internet.",
      "Pontos únicos de falha: switch, firewall e link de internet."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar todos na mesma rede e confiar na senha do Wi-Fi.",
        "whyItIsWrong": "Senha de Wi-Fi não separa ninguém: um visitante ou um dispositivo invadido alcançaria os servidores."
      },
      {
        "answer": "Desenhar uma só figura misturando cabos e regras.",
        "whyItIsWrong": "Esconde que usuários e visitantes usam o mesmo switch, mas estão em redes lógicas diferentes."
      }
    ],
    "finalAnswer": "Fisicamente, uma estrela em torno do switch, com o firewall entre o switch e a internet. Logicamente, redes separadas para usuários, visitantes e servidores, com o firewall controlando a passagem: visitantes só vão para a internet."
  },
  "glossary": [
    {
      "term": "VLAN",
      "shortDefinition": "Rede lógica separada criada dentro de um switch: portas em VLANs diferentes não se falam diretamente.",
      "example": "Usuários e servidores no mesmo switch, em VLANs diferentes, só se comunicam por um roteador ou firewall.",
      "relatedLessons": [
        "3.7"
      ]
    },
    {
      "term": "Gateway",
      "shortDefinition": "O equipamento, geralmente um roteador, para o qual o computador envia o tráfego destinado a outras redes.",
      "example": "Em casa, o gateway costuma ser o próprio roteador Wi-Fi.",
      "relatedLessons": [
        "4.5"
      ]
    },
    {
      "term": "Firewall",
      "shortDefinition": "Equipamento ou software que permite ou bloqueia tráfego conforme regras.",
      "example": "Um firewall entre a rede de visitantes e a de servidores bloqueia o acesso dos visitantes.",
      "relatedLessons": [
        "1.7",
        "9.3"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base de camadas, sinais, protocolos e métricas."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 1.3",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Tipos de rede usados como contexto para topologias."
    },
    {
      "type": "standard",
      "title": "IEEE 802 family",
      "organization": "IEEE",
      "url": "",
      "note": "Família de padrões relacionada a LANs, Ethernet e Wi-Fi."
    },
    {
      "type": "official-doc",
      "title": "Cloud networking architecture documentation",
      "organization": "AWS, Microsoft Azure e Google Cloud",
      "url": "",
      "note": "Usar documentação oficial do provedor ao desenhar topologias cloud reais."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e IaC",
      "lesson": "Terraform e redes cloud",
      "reason": "Topologia lógica em cloud costuma ser criada como código."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes",
      "lesson": "Services, Ingress e NetworkPolicies",
      "reason": "Kubernetes possui topologias lógicas próprias acima da rede física."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust",
      "lesson": "Acesso baseado em identidade e contexto",
      "reason": "Zero Trust depende de entender caminhos, zonas e pontos de decisão de política."
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
      "1.5"
    ]
  }
};
