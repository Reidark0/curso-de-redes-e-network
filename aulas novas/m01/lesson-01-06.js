export const lesson0106 = {
  "id": "1.6",
  "moduleId": "m01",
  "order": 6,
  "title": "Cabeamento estruturado e padrões RJ-45",
  "subtitle": "Como organizar a rede física de forma padronizada, documentada, testável e segura, da tomada de rede até o patch panel e o switch.",
  "duration": "20-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "fundamentos",
    "cabeamento estruturado",
    "RJ-45",
    "Ethernet",
    "patch panel",
    "rack",
    "T568A",
    "T568B",
    "PoE",
    "troubleshooting",
    "segurança física"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.4",
      "reason": "Topologias físicas e lógicas ajudam a entender por que o cabeamento precisa ser planejado e documentado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.5",
      "reason": "A aula anterior explicou os meios de transmissão, especialmente cobre, fibra e rádio."
    }
  ],
  "objectives": [
    "Descrever o caminho de um ponto de rede estruturado (patch cord, tomada, cabo horizontal, patch panel, patch cord de rack e switch), o papel da identificação e o limite de 100 m do canal.",
    "Explicar a diferença entre T568A e T568B, quando um cabo é direto ou cruzado e por que 1 Gbps precisa dos quatro pares.",
    "Relacionar categoria, interferência, orçamento PoE e o tipo de teste (continuidade ou certificação) a sintomas como porta em 100 Mbps, erros intermitentes e AP que reinicia."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Você assume o suporte de um escritório que cresceu rápido. No rack, dezenas de cabos azuis iguais saem do switch, sem nenhuma etiqueta. Um usuário reclama que a rede está lenta, e o computador dele mostra conexão de 100 Mbps, embora a placa e o switch sejam de 1 Gbps. Para descobrir qual porta é a dele, alguém começa a puxar cabos para ver qual luz apaga e, no caminho, derruba a câmera da recepção e o telefone do financeiro.</p>\n  <p>Sem um caminho físico padronizado e identificado, cada manutenção vira tentativa e erro, e o defeito real, um cabo ruim, continua escondido. Nesta aula você aprende a organizar e a ler esse caminho. É a mesma informação de que a equipe de segurança precisa quando um alerta aponta tráfego estranho vindo de uma porta do switch: saber a qual tomada e a qual sala ela leva.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando a rede cresce com cabos instalados um a um, cada um do jeito de quem instalou. Funciona enquanto a rede é pequena. O problema aparece quando é preciso mudar alguém de mesa, trocar um switch ou diagnosticar uma falha com pressa: ninguém sabe o que liga a quê, e cada ponta pode ter sido montada de um jeito.</p>\n  <p>O desafio não é fazer o cabo funcionar uma vez, e sim ter uma infraestrutura física que continue previsível depois de mudanças, expansões e incidentes. O cabeamento estruturado resolve isso com quatro coisas: um caminho com partes padronizadas, um único padrão de terminação, identificação de cada ponto e testes que medem o desempenho do cabo. Custa mais no início (rack, patch panels, certificação), mas reduz o tempo de manutenção e de rede parada.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> cabeamento estruturado é a infraestrutura física planejada que liga as áreas de trabalho ao rack de forma padronizada, identificada, testada e preparada para mudanças. Inclui cabos, tomadas, patch panels, racks, etiquetas, documentação e testes.</div>\n  <h3>O conector RJ-45</h3>\n  <p>O conector das pontas dos cabos Ethernet de par trançado é chamado de RJ-45 na prática de TI. O nome técnico é <strong>8P8C</strong> (8 posições, 8 contatos); \"RJ-45\" vem da telefonia, mas virou o nome popular. O cabo tem <strong>4 pares trançados</strong> (laranja, verde, azul e marrom), e cada par tem um fio de cor sólida e um fio branco listrado.</p>\n  <h3>T568A e T568B: o que muda de verdade</h3>\n  <p>T568A e T568B são as duas ordens padronizadas para encaixar os 8 fios nos pinos do conector. Elas são eletricamente equivalentes. A única diferença é que <strong>os pares laranja e verde trocam de lugar</strong>; azul e marrom ficam nos mesmos pinos. Você não precisa decorar a tabela: basta lembrar que o pino 1 é branco-verde no A e branco-laranja no B.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Pino</th><th>T568A</th><th>T568B</th><th>Uso em 10/100 Mbps</th></tr></thead>\n    <tbody>\n      <tr><td>1</td><td>branco-verde</td><td>branco-laranja</td><td>transmissão</td></tr>\n      <tr><td>2</td><td>verde</td><td>laranja</td><td>transmissão</td></tr>\n      <tr><td>3</td><td>branco-laranja</td><td>branco-verde</td><td>recepção</td></tr>\n      <tr><td>4</td><td>azul</td><td>azul</td><td>não usado</td></tr>\n      <tr><td>5</td><td>branco-azul</td><td>branco-azul</td><td>não usado</td></tr>\n      <tr><td>6</td><td>laranja</td><td>verde</td><td>recepção</td></tr>\n      <tr><td>7</td><td>branco-marrom</td><td>branco-marrom</td><td>não usado</td></tr>\n      <tr><td>8</td><td>marrom</td><td>marrom</td><td>não usado</td></tr>\n    </tbody>\n  </table></div>\n  <ul>\n    <li><strong>Cabo direto:</strong> o mesmo padrão nas duas pontas (A–A ou B–B). É o cabo comum entre computador e tomada, ou entre patch panel e switch. Escolha um padrão e use-o no ambiente inteiro.</li>\n    <li><strong>Cabo cruzado (crossover):</strong> A numa ponta e B na outra, o que liga a transmissão de um lado à recepção do outro. Era usado entre equipamentos iguais (PC–PC, switch–switch). Hoje a maioria das portas tem <strong>Auto-MDI-X</strong>, que detecta e corrige isso sozinha. Por isso um cabo misturado por engano pode até funcionar, mas foge do padrão e confunde a manutenção.</li>\n    <li><strong>Por que os pares importam:</strong> 10 e 100 Mbps usam só os pinos 1, 2, 3 e 6 (dois pares). 1 Gbps (1000BASE-T) usa os <strong>quatro pares</strong>. Um cabo com o par azul ou marrom rompido, mal crimpado ou trocado pode dar link a 100 Mbps e nunca chegar a 1 Gbps. É a causa clássica do sintoma \"porta em 100 Mbps em vez de 1 Gbps\".</li>\n  </ul>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <h3>O caminho de um ponto de rede</h3>\n  <p>Um ponto de rede estruturado não é um cabo único até o switch. É um caminho com várias partes, e cada uma pode falhar:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Dispositivo final:</strong> computador, telefone IP, impressora, câmera ou access point (AP).</li>\n    <li><strong>Patch cord:</strong> cabo flexível e curto que liga o equipamento à tomada.</li>\n    <li><strong>Tomada (keystone):</strong> conector fixo na parede ou no piso, onde o cabo horizontal termina.</li>\n    <li><strong>Cabo horizontal:</strong> cabo fixo, passado pela parede ou pelo piso, da tomada até o rack.</li>\n    <li><strong>Patch panel:</strong> painel no rack onde os cabos horizontais terminam, cada um numa porta identificada.</li>\n    <li><strong>Patch cord de rack:</strong> cabo curto que liga a porta do patch panel à porta do switch.</li>\n    <li><strong>Switch:</strong> o equipamento ativo, que negocia a velocidade do link, pode fornecer energia (PoE) e encaminha o tráfego.</li>\n  </ol>\n  <p>Cada ponto recebe uma etiqueta que aparece nas duas pontas do cabo horizontal: <code>2A-034</code> (prédio 2, andar A, ponto 034) está na tomada e na porta 34 do patch panel, e o inventário registra a sala e a porta do switch. Assim, quando uma porta dá problema, você sabe a qual mesa ir; quando alguém muda de mesa, sabe qual patch cord trocar no rack. Entre racks e andares, as distâncias costumam passar do limite do cobre, e a ligação é feita em fibra.</p>\n  <h3>Categoria, distância e interferência</h3>\n  <p>A categoria diz até que frequência o cabo foi projetado e, portanto, que velocidade ele sustenta. Em todas elas o limite do canal é <strong>100 m</strong>: até 90 m de cabo horizontal fixo mais até 10 m somados de patch cords. Acima disso a atenuação cresce, os erros aumentam e a porta pode negociar velocidade menor ou nem subir.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Categoria</th><th>Frequência</th><th>O que sustenta</th></tr></thead>\n    <tbody>\n      <tr><td>Cat5e</td><td>100 MHz</td><td>1 Gbps até 100 m</td></tr>\n      <tr><td>Cat6</td><td>250 MHz</td><td>1 Gbps até 100 m; 10 Gbps só em trechos curtos (até cerca de 55 m)</td></tr>\n      <tr><td>Cat6A</td><td>500 MHz</td><td>10 Gbps até 100 m</td></tr>\n    </tbody>\n  </table></div>\n  <p>O trançado dos pares é o que cancela o ruído. A interferência aparece quando a instalação desfaz essa proteção: cabo correndo junto de cabos de energia ou motores; pares destrançados demais na terminação (o recomendado é no máximo cerca de 13 mm); dobras fechadas ou abraçadeiras que esmagam o cabo. O sintoma típico são erros CRC e lentidão intermitente, não a falta total de link.</p>\n  <h3>PoE: energia pelo mesmo cabo</h3>\n  <p>Com PoE (Power over Ethernet), a porta do switch envia energia pelo mesmo cabo dos dados para APs, câmeras e telefones IP. Os padrões mais comuns entregam até 15,4 W por porta (802.3af), até 30 W (802.3at, o PoE+) e até 60 W ou 90 W (802.3bt). Além do limite por porta, o switch tem um <strong>orçamento PoE</strong>: a potência total que consegue entregar a todas as portas juntas. Um switch com orçamento de 120 W que já alimenta 4 APs de 25 W (100 W) tem 20 W livres: cabem mais duas câmeras de 7 W, não três. Quando o orçamento estoura, alguns dispositivos não ligam ou reiniciam.</p>\n  <h3>Continuidade não é certificação</h3>\n  <ul>\n    <li><strong>Testador de continuidade:</strong> mostra se cada fio chega ao pino certo na outra ponta. Detecta fio aberto, curto e fios trocados de posição.</li>\n    <li><strong>O que ele não pega:</strong> desempenho. O caso clássico é o <strong>par dividido</strong> (split pair): cada pino está ligado ao pino correto do outro lado, mas os dois fios de um sinal pertencem a pares diferentes. A continuidade passa, o trançado não cancela o ruído, e a porta gera erros sob carga.</li>\n    <li><strong>Certificador:</strong> mede comprimento, atenuação e diafonia (o sinal de um par vazando para o par vizinho) e compara com os limites da categoria. É o que garante que um ponto Cat6 se comporta como Cat6.</li>\n  </ul>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li>Achar que qualquer cabo com RJ-45 serve para qualquer velocidade. Por fora os cabos parecem iguais; confira categoria, comprimento e terminação.</li>\n      <li>Não identificar tomadas e patch panel porque \"a rede é pequena\". Cada mudança vira tentativa e erro, e a documentação fica errada se as mudanças não forem registradas.</li>\n      <li>Deixar portas ativas em áreas públicas, como a recepção, por conveniência. Um ponto bem instalado não significa acesso autorizado: desative a porta no switch até que ela seja necessária.</li>\n    </ul>\n  </div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense no cabeamento estruturado como a instalação elétrica de um prédio. Ninguém aceita fios passando soltos pelo chão: há quadro de distribuição, tomadas fixas, conduítes e disjuntores identificados. O rack com o patch panel faz o papel do quadro, e a etiqueta diz que tomada cada porta alimenta.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, você liga um cabo do roteador ao computador e a internet parece lenta. No PowerShell, <code>Get-NetAdapter</code> mostra <code>LinkSpeed 100 Mbps</code>, embora o roteador e a placa sejam de 1 Gbps. Você talvez culpe o provedor, mas o problema está entre a placa de rede e a porta: um conector mal crimpado, um cabo dobrado demais ou partido parcialmente pode romper o par azul ou marrom, e sem os quatro pares não há 1 Gbps. Trocar o patch cord por um Cat5e ou Cat6 em bom estado e conferir de novo o <code>LinkSpeed</code> resolve ou descarta essa hipótese em um minuto.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1040 430\" role=\"img\" aria-labelledby=\"m01l06-title m01l06-desc\">\n    <title id=\"m01l06-title\">Caminho do cabeamento estruturado até o switch</title>\n    <desc id=\"m01l06-desc\">O diagrama mostra o caminho de um ponto de rede: notebook, patch cord, tomada, cabo horizontal, patch panel, patch cord de rack e switch, com o limite de 100 m do canal. Abaixo, os três cuidados do cabeamento estruturado: padrão físico, operação e segurança.</desc>\n    <defs>\n      <marker id=\"m01l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"97\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n    <text x=\"97\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">dispositivo final</text>\n    <rect x=\"220\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"287\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Tomada</text>\n    <text x=\"287\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">keystone</text>\n    <rect x=\"410\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"477\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Cabo horizontal</text>\n    <text x=\"477\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">infraestrutura</text>\n    <rect x=\"600\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"667\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Patch panel</text>\n    <text x=\"667\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta identificada</text>\n    <rect x=\"790\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"857\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"857\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta, velocidade, PoE</text>\n    <line x1=\"165\" y1=\"131\" x2=\"220\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <line x1=\"355\" y1=\"131\" x2=\"410\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <line x1=\"545\" y1=\"131\" x2=\"600\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <line x1=\"735\" y1=\"131\" x2=\"790\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <text x=\"192\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">patch cord</text>\n    <text x=\"477\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">até 90 m</text>\n    <text x=\"762\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">patch cord de rack</text>\n    <text x=\"477\" y=\"222\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Canal completo: até 100 m (90 m de cabo horizontal + 10 m de patch cords)</text>\n    <rect x=\"70\" y=\"245\" width=\"260\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"200\" y=\"275\" text-anchor=\"middle\" class=\"svg-label\">Padrão físico</text>\n    <text x=\"200\" y=\"302\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">categoria, distância, terminação</text>\n    <text x=\"200\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">T568A/B e qualidade do conector</text>\n    <rect x=\"390\" y=\"245\" width=\"260\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"520\" y=\"275\" text-anchor=\"middle\" class=\"svg-label\">Operação</text>\n    <text x=\"520\" y=\"302\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">etiqueta, inventário, registro de mudanças</text>\n    <text x=\"520\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">testes: continuidade e certificação</text>\n    <rect x=\"710\" y=\"245\" width=\"260\" height=\"105\" rx=\"14\" class=\"svg-zone svg-node--security\" />\n    <text x=\"840\" y=\"275\" text-anchor=\"middle\" class=\"svg-label\">Segurança</text>\n    <text x=\"840\" y=\"302\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">portas ociosas desativadas</text>\n    <text x=\"840\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rack trancado, porta rastreável</text>\n  </svg>\n</section>\n",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> cabeamento estruturado é um caminho físico padronizado, identificado e testado da tomada ao switch.</li>\n    <li>Patch cord → tomada → cabo horizontal (até 90 m) → patch panel → patch cord → switch: canal de até 100 m.</li>\n    <li>T568A × T568B: só laranja e verde trocam; use o mesmo padrão nas duas pontas.</li>\n    <li>1 Gbps usa os quatro pares; com o azul ou o marrom com defeito, a porta fica em 100 Mbps.</li>\n    <li>\"Deu link\" não basta: continuidade não mede desempenho.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 1.7 você estuda os equipamentos ligados nas pontas desse caminho: placa de rede, hub, switch, roteador, access point e firewall. A pergunta muda de \"por onde o sinal passa?\" para \"quem recebe, encaminha, filtra ou distribui esse tráfego?\".</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "Ethernet",
      "PoE",
      "LLDP",
      "CDP",
      "802.1X"
    ],
    "dependsOn": [
      "meios de transmissão",
      "topologia física",
      "sinais físicos"
    ],
    "enables": [
      "switching",
      "VLAN",
      "port security",
      "troubleshooting físico",
      "inventário de rede"
    ]
  },
  "lab": {
    "id": "lab-1.6",
    "title": "Do computador à tomada: link, velocidade e padrão do cabo",
    "labType": "troubleshooting",
    "objective": "Ver o estado e a velocidade do seu link cabeado, identificar o padrão do patch cord e seguir o caminho físico do ponto.",
    "prerequisites": [
      "Um computador ligado à rede por cabo (em casa, o cabo até o roteador serve)."
    ],
    "tools": [
      "Windows PowerShell ou terminal Linux (ethtool, se disponível)"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Ver link e velocidade",
        "instruction": "Mostre o estado e a velocidade negociada da interface cabeada.",
        "command": "Windows PowerShell: Get-NetAdapter | Format-Table Name, Status, LinkSpeed\nLinux: ip link show; depois ethtool <interface> (troque <interface> pelo nome, como eth0 ou enp3s0)",
        "expectedOutput": "Status Up e LinkSpeed 1 Gbps (no Linux, state UP e Speed: 1000Mb/s); em equipamentos antigos, 100 Mbps.",
        "explanation": "A velocidade é negociada entre a placa e a porta do outro lado. Se as duas são de 1 Gbps e o resultado é 100 Mbps, desconfie do par azul ou marrom."
      },
      {
        "number": 2,
        "title": "Identificar o padrão do patch cord",
        "instruction": "Se o conector for transparente, segure-o com a trava para baixo e os contatos virados para você: o pino 1 fica à esquerda. Veja a cor do fio do pino 1 nas duas pontas.",
        "expectedOutput": "Branco-laranja no pino 1 indica T568B; branco-verde indica T568A. As duas pontas iguais indicam cabo direto.",
        "explanation": "Patch cords de fábrica costumam ser T568B nas duas pontas. Pontas diferentes formam um cabo cruzado: funciona graças ao Auto-MDI-X, mas foge do padrão."
      },
      {
        "number": 3,
        "title": "Seguir o caminho físico",
        "instruction": "Sem desconectar nada, siga o cabo do computador. Anote se ele vai direto ao roteador ou switch (comum em casa) ou a uma tomada; se houver tomada, anote a etiqueta e, com acesso autorizado ao rack, a porta do patch panel.",
        "expectedOutput": "Uma linha como: notebook → patch cord → tomada 2A-034 → patch panel porta 34 → switch; ou, em casa: notebook → patch cord → roteador.",
        "explanation": "Em casa o caminho costuma ter só um patch cord. Num escritório, uma tomada sem etiqueta é uma falha de documentação."
      },
      {
        "number": 4,
        "title": "Testar a hipótese do patch cord",
        "instruction": "Se puder ficar um minuto sem rede, troque o patch cord por outro (ou desconecte e reconecte o mesmo) e repita o comando do passo 1.",
        "expectedOutput": "Desconectado, Status Disconnected (no Linux, Link detected: no). Reconectado, o link volta; se antes estava em 100 Mbps e agora mostra 1 Gbps, o defeito estava no patch cord antigo.",
        "explanation": "Trocar uma parte do caminho por vez isola a falha. Se a velocidade continuar baixa, siga adiante: tomada, cabo horizontal, patch cord do rack ou porta."
      }
    ],
    "expectedResult": "Você viu o estado e a velocidade do seu link, identificou o padrão do patch cord pelo pino 1 e descreveu o caminho físico do seu ponto."
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "Um computador negocia 100 Mbps numa rede que deveria ser de 1 Gbps. Você trocou o patch cord da mesa e nada mudou. Onde continua procurando, e em que ordem?",
      "hints": [
        "Lembre-se das partes do caminho entre a mesa e o switch.",
        "Qual delas dá para trocar com mais facilidade?"
      ],
      "expectedIdeas": [
        "patch cord do rack",
        "porta do patch panel",
        "tomada/keystone",
        "cabo horizontal",
        "porta do switch",
        "certificação do ponto"
      ],
      "explanation": "O patch cord da mesa era só a primeira parte. Siga o caminho: troque o patch cord do rack ou teste outra porta do switch (fácil), depois confira a terminação da tomada e do patch panel e, por fim, teste ou certifique o cabo horizontal."
    },
    {
      "type": "cenário real",
      "question": "Uma tomada ativa fica na recepção, onde visitantes esperam. Como você reduziria o risco sem perder a utilidade do ponto?",
      "hints": [
        "O que acontece se a porta do switch estiver desativada?",
        "Como saber se alguém ligou algo ali?"
      ],
      "expectedIdeas": [
        "desativar a porta no switch quando ociosa",
        "ativar só quando houver uso conhecido",
        "identificar a tomada no inventário",
        "acompanhar quando o link sobe"
      ],
      "explanation": "Um ponto físico bem instalado não autoriza ninguém. Desativar a porta ociosa e saber exatamente qual porta do switch atende a recepção já reduz o risco; controles de autenticação na porta são vistos na aula 3.9."
    }
  ],
  "quiz": [
    {
      "id": "q1.6.1",
      "question": "Qual é a melhor definição de cabeamento estruturado?",
      "options": [
        "A instalação de cabos da categoria mais alta disponível em todos os pontos",
        "Infraestrutura física planejada, identificada, documentada e testada que liga as áreas de trabalho ao rack",
        "A ligação direta de cada equipamento ao switch com cabos cortados sob medida",
        "O conjunto de regras de firewall que separa os setores da empresa"
      ],
      "answer": 1,
      "explanation": "Cabeamento estruturado é organização e padrão: componentes, identificação, documentação e testes. Categoria alta sem identificação nem testes não é estruturado, e regras de firewall são controle lógico, não físico.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.6.3",
      "question": "Para um cabo direto comum, qual prática reduz confusão operacional?",
      "options": [
        "Usar o mesmo padrão de terminação nas duas pontas e documentá-lo",
        "Usar T568A numa ponta e T568B na outra",
        "Escolher o padrão de cada ponta conforme a cor do cabo",
        "Terminar o patch panel em T568B e a tomada no padrão que o instalador preferir"
      ],
      "answer": 0,
      "explanation": "Cabo direto tem o mesmo padrão nas duas pontas. A numa ponta e B na outra forma um cabo cruzado; padrão escolhido ponto a ponto impede a manutenção previsível.",
      "topic": "T568A/T568B",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.6.5",
      "question": "Qual componente normalmente concentra a terminação dos cabos horizontais no rack?",
      "options": [
        "Keystone",
        "Patch panel",
        "Patch cord de rack",
        "Switch de acesso"
      ],
      "answer": 1,
      "explanation": "Os cabos horizontais terminam no patch panel. O keystone fica na ponta da área de trabalho, o patch cord de rack liga patch panel e switch, e o switch é o equipamento ativo.",
      "topic": "componentes",
      "difficulty": "iniciante",
      "type": "operação"
    },
    {
      "id": "q1.6.6",
      "question": "Um AP no teto reinicia várias vezes ao dia. Qual item de cabeamento/infra deve ser verificado?",
      "options": [
        "Endereço IP configurado no AP",
        "Canal Wi-Fi configurado no AP",
        "Orçamento PoE do switch e qualidade do cabo",
        "Padrão T568A ou T568B usado nas duas pontas do cabo"
      ],
      "answer": 2,
      "explanation": "O AP recebe energia e dados pelo cabo; orçamento PoE estourado ou cabo ruim faz o equipamento reiniciar. Endereço IP e canal Wi-Fi não desligam o AP, e cabos A–A ou B–B funcionam igualmente.",
      "topic": "PoE",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q1.6.7",
      "question": "Qual é a diferença entre os padrões T568A e T568B?",
      "options": [
        "Os pares azul e marrom trocam de posição; laranja e verde ficam nos mesmos pinos",
        "T568B usa os quatro pares e T568A usa apenas dois",
        "T568A é para cabo Cat5e e T568B é para Cat6",
        "Os pares laranja e verde trocam de posição; azul e marrom ficam nos mesmos pinos"
      ],
      "answer": 3,
      "explanation": "Os dois padrões são eletricamente equivalentes e usam os mesmos 8 fios; só os pares laranja e verde mudam de lugar. O padrão não depende da categoria do cabo.",
      "topic": "T568A/T568B",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.6.8",
      "question": "Um cabo com o par marrom rompido dá link a 100 Mbps, mas não a 1 Gbps. Por quê?",
      "options": [
        "10/100 Mbps usa só os pinos 1, 2, 3 e 6, enquanto 1000BASE-T precisa dos quatro pares",
        "O par marrom transporta a energia PoE que o 1 Gbps exige",
        "O par marrom é o único que tem trançado, e sem ele a interferência limita a velocidade",
        "O switch reduz a velocidade de propósito para economizar energia quando falta um par"
      ],
      "answer": 0,
      "explanation": "Em 10/100 Mbps os pares azul e marrom não são usados, então o link sobe. 1 Gbps transmite pelos quatro pares e não funciona com um deles rompido.",
      "topic": "pares e velocidade",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.6.2",
      "front": "O que é patch panel?",
      "back": "Painel no rack onde os cabos horizontais terminam de forma organizada e identificada.",
      "tags": [
        "rack",
        "patch panel"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.4",
      "front": "Por que 'deu link' não basta?",
      "back": "Porque o cabo pode ter link, mas negociar velocidade menor, gerar erros ou falhar sob carga.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.6.6",
      "front": "O que PoE adiciona ao cabeamento?",
      "back": "Além de dados, a porta fornece energia para dispositivos como APs, câmeras e telefones IP.",
      "tags": [
        "PoE"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.7",
      "front": "Ordem dos fios no T568B (pinos 1 a 8)?",
      "back": "Branco-laranja, laranja, branco-verde, azul, branco-azul, verde, branco-marrom, marrom. No T568A, laranja e verde trocam de lugar.",
      "tags": [
        "T568B"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.8",
      "front": "Qual é o limite de comprimento de um canal de par trançado?",
      "back": "100 m: até 90 m de cabo horizontal fixo mais até 10 m somados de patch cords.",
      "tags": [
        "distância"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.9",
      "front": "O que é par dividido (split pair) e por que o testador de continuidade não pega?",
      "back": "Os fios de um sinal estão em pares diferentes; cada pino chega ao pino certo, então a continuidade passa, mas o trançado não cancela ruído e surgem erros. Só a certificação (diafonia) detecta.",
      "tags": [
        "certificação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.6.10",
      "front": "O que é Auto-MDI-X?",
      "back": "Recurso da porta que detecta se transmissão e recepção precisam ser cruzadas e corrige sozinho, dispensando o cabo crossover.",
      "tags": [
        "crossover"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex1.6.2",
      "type": "diagnóstico",
      "prompt": "Uma porta tem link a 1 Gbps, mas fica lenta nos horários de pico e os erros CRC sobem. O cabo passou no testador de continuidade. Cite três causas físicas possíveis e como confirmar a mais provável.",
      "expectedAnswer": "Par dividido, pares destrançados demais na terminação, cabo junto de cabos de energia ou motores, cabo esmagado, patch cord ruim. Confirmação: trocar o patch cord; se os erros continuarem, certificar o ponto, porque o certificador mede diafonia e o testador de continuidade não.",
      "explanation": "Erros sob carga, com o link de pé, apontam para ruído que o trançado deixou de cancelar."
    },
    {
      "id": "ex1.6.6",
      "type": "cálculo",
      "prompt": "Um AP fica a 95 m de cabo horizontal do rack. Ele usa 2 m de patch cord no teto e 2 m no rack. O canal está dentro do padrão? Se não estiver, que alternativas você propõe?",
      "expectedAnswer": "Não. O canal soma 99 m, mas o cabo horizontal passa do limite de 90 m para o trecho fixo. Alternativas: reposicionar o AP ou o rack para encurtar o trecho horizontal, ou instalar um switch pequeno mais perto do AP, ligado ao rack por fibra.",
      "explanation": "O limite de 100 m é do canal inteiro, com no máximo 90 m de cabo fixo. Fora dele a atenuação aumenta e surgem erros, velocidade menor ou falha de PoE."
    }
  ],
  "challenge": {
    "title": "Organizar o cabeamento de uma pequena empresa",
    "scenario": "Uma empresa com 20 usuários, 3 APs no teto e 6 câmeras IP usa cabos improvisados ligados direto a um switch sobre a mesa. Vai comprar um rack, um patch panel e um switch com PoE+ e orçamento de 150 W. Os APs consomem até 25 W e as câmeras até 7 W. Um dos pontos fica no depósito, a 110 m de cabo do rack.",
    "tasks": [
      "Descrever o caminho padrão de um ponto e como cada ponto será identificado.",
      "Escolher a categoria do cabo e o padrão de terminação, e dizer o que fazer com o ponto do depósito.",
      "Verificar se o orçamento PoE do switch atende APs e câmeras.",
      "Dizer o que fazer com as portas sem uso e com a tomada da recepção."
    ],
    "expectedDeliverables": [
      "Um plano de 6 a 10 linhas com o cálculo do PoE."
    ]
  },
  "commentedSolution": {
    "reasoning": "Comece pelos limites: 100 m por canal e o orçamento PoE do switch.",
    "steps": [
      "Caminho: dispositivo → patch cord → tomada → cabo horizontal → patch panel → patch cord → switch, com a mesma etiqueta na tomada e na porta do patch panel e um inventário que liga cada ponto à porta do switch.",
      "Cabo Cat6 (1 Gbps com folga) e T568B nas duas pontas de todos os cabos.",
      "Depósito: 110 m passa do limite de 100 m. Mude o ponto de lugar, leve um switch pequeno para mais perto ou faça a ligação em fibra.",
      "PoE: 3 × 25 W + 6 × 7 W = 75 + 42 = 117 W. Cabe nos 150 W, com 33 W de folga.",
      "Portas sem uso ficam desativadas; a da recepção só é ativada quando houver uso conhecido."
    ],
    "commonMistakes": [
      "Ligar o ponto do depósito porque deu link: acima de 100 m surgem erros e velocidade menor.",
      "Somar só os APs e esquecer as câmeras no orçamento PoE."
    ],
    "finalAnswer": "Patch panel no rack, Cat6 em T568B, etiquetas iguais nas duas pontas, depósito resolvido sem passar de 100 m, 117 W de PoE dentro dos 150 W e portas ociosas desativadas."
  },
  "glossary": [
    {
      "term": "Ethernet",
      "shortDefinition": "A tecnologia padrão das redes locais cabeadas; define como os dados são enviados pelo cabo de par trançado ou pela fibra.",
      "relatedLessons": [
        "3.1"
      ]
    },
    {
      "term": "Erro CRC",
      "shortDefinition": "Contador da porta que aumenta quando chegam dados corrompidos no caminho, normalmente por ruído, conector ruim ou cabo danificado.",
      "example": "Uma porta com link a 1 Gbps, mas com erros CRC subindo, aponta para um problema físico.",
      "relatedLessons": [
        "3.2"
      ]
    },
    {
      "term": "Switch",
      "shortDefinition": "Equipamento que interliga os dispositivos da rede local e encaminha o tráfego entre suas portas.",
      "relatedLessons": [
        "1.7"
      ]
    },
    {
      "term": "Access point (AP)",
      "shortDefinition": "Equipamento que conecta dispositivos Wi-Fi à rede cabeada; costuma ficar no teto e receber energia por PoE.",
      "relatedLessons": [
        "1.7"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "ANSI/TIA-568 (série de normas de cabeamento de telecomunicações)",
      "organization": "TIA",
      "url": "",
      "note": "Norma de cabeamento estruturado; define os padrões de terminação T568A/T568B, categorias e limites de distância."
    },
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Padrão Ethernet: 10/100/1000BASE-T, 10GBASE-T e PoE (802.3af/at/bt)."
    },
    {
      "type": "internal-course",
      "title": "Meios de transmissão: cobre, fibra e rádio",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aula 1.5 deste curso."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "infraestrutura física e ambientes",
      "reason": "Racks, energia, cabeamento e mudança física impactam plataformas e pipelines."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "controle de acesso físico e lógico",
      "reason": "Portas físicas e autenticação de rede se conectam a identidade, autorização e Zero Trust."
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
      "1.7"
    ]
  }
};
