export const lesson0304 = {
  "id": "3.4",
  "moduleId": "m03",
  "order": 4,
  "title": "Domínios de colisão, broadcast e hub vs switch",
  "subtitle": "Por que hubs repetiam tudo, como switches acabaram com as colisões e por que o broadcast ainda precisa ser controlado.",
  "duration": "85-125 min",
  "estimatedStudyTimeMinutes": 125,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 210,
  "tags": [
    "redes",
    "ethernet",
    "hub",
    "switch",
    "domínio de colisão",
    "broadcast",
    "VLAN",
    "camada 2",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.1",
      "reason": "É necessário entender Ethernet como base da LAN."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.3",
      "reason": "A diferença entre forwarding e flooding ajuda a entender broadcast e switch."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.4",
      "reason": "A aula depende de Camada 2, frames e switches."
    }
  ],
  "objectives": [
    "Diferenciar domínio de colisão e domínio de broadcast.",
    "Explicar por que hubs foram substituídos por switches.",
    "Entender por que switches reduzem colisões, mas não eliminam broadcasts.",
    "Relacionar VLANs e roteadores ao controle de domínios de broadcast.",
    "Aplicar o conceito em troubleshooting e segurança defensiva de LAN."
  ],
  "learningOutcomes": [
    "Dado um desenho com hub, o aluno identifica que todos compartilham o domínio de colisão.",
    "Dado um switch, o aluno explica por que cada porta reduz colisões em links full-duplex.",
    "Dado um broadcast ARP, o aluno identifica quem recebe o frame dentro da VLAN.",
    "Dado um problema de lentidão em LAN, o aluno considera broadcast storm, loop e VLAN grande demais.",
    "Dado um cenário empresarial, o aluno propõe segmentação por VLAN e controle entre segmentos."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>Uma empresa pequena tem computadores, impressoras, câmeras IP e telefones VoIP na mesma rede, todos em switches modernos, e sofre com lentidão intermitente. Ninguém usa hub, então não é colisão clássica. Mas pode ser excesso de broadcast, loop de Camada 2, VLAN grande demais ou um mini-switch doméstico ligado onde não devia. Sem os conceitos de domínio de colisão e domínio de broadcast, você não tem como separar esses sintomas.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um switch de acesso começa a registrar aumento de broadcasts e quedas de desempenho. O time reinicia o firewall, troca o DNS e culpa a internet, mas a causa é uma porta de switch com loop ou um equipamento indevido. Esta aula ensina a investigar isso pela camada certa.</div>\n</section>\n",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>História</h2>\n<p>Na Ethernet original, vários hosts compartilhavam o mesmo meio físico. Se dois transmitiam ao mesmo tempo, os sinais colidiam; cada placa detectava a colisão e tentava de novo depois de um tempo aleatório (CSMA/CD). O hub só tornou o cabeamento mais conveniente (estrela): continuou repetindo tudo e mantendo um único domínio de colisão. O switch isolou cada porta, mas o broadcast continuou existindo, porque protocolos como o ARP do IPv4 precisam alcançar todos os hosts da rede local.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Como funcionava</th><th>Problema</th><th>O que veio depois</th></tr></thead><tbody>\n<tr><td>Meio compartilhado</td><td>Vários hosts no mesmo meio.</td><td>Colisões e baixa escalabilidade.</td><td>Hubs (estrela física).</td></tr>\n<tr><td>Hub</td><td>Repetia sinais para todas as portas.</td><td>Um único domínio de colisão e tráfego exposto a todos.</td><td>Switch Ethernet.</td></tr>\n<tr><td>Switch</td><td>Aprende MACs e encaminha seletivamente.</td><td>Broadcast ainda alcança toda a VLAN.</td><td>VLANs e roteamento entre segmentos.</td></tr>\n<tr><td>LAN segmentada</td><td>VLANs limitam domínios de broadcast.</td><td>Exige governança, roteamento e políticas.</td><td>Segurança L2, NAC, STP e observabilidade.</td></tr>\n</tbody></table>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>Nem todo tráfego local é igual. O unicast deve ir só ao destino certo. O broadcast precisa alcançar todos os dispositivos do mesmo domínio. O unicast para um MAC ainda desconhecido pode ser inundado temporariamente. Se tudo fosse enviado para todos, a rede desperdiçaria banda e exporia dados; se nada alcançasse todos, protocolos como o ARP não funcionariam. A pergunta da aula é: <strong>até onde cada tipo de tráfego vai, e o que define esse limite?</strong></p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<p><strong>Domínio de colisão</strong> é o conjunto de dispositivos que compartilham um meio onde transmissões simultâneas podem interferir entre si. Com hubs e links half-duplex, vários hosts ficam no mesmo domínio de colisão. Num switch, cada porta é o seu próprio domínio.</p>\n<p><strong>Domínio de broadcast</strong> é o conjunto de dispositivos que recebem os broadcasts uns dos outros. O switch encaminha broadcast para todas as portas da mesma VLAN, exceto a de entrada; o roteador não encaminha broadcast de Camada 2 para outras redes.</p>\n<div class=\"definition-box\"><strong>Definição prática:</strong> switch reduz domínio de colisão; VLAN e roteador limitam domínio de broadcast.</div>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Equipamento</th><th>Separa colisão?</th><th>Separa broadcast?</th></tr></thead><tbody>\n<tr><td>Hub</td><td>Não: todas as portas num só domínio</td><td>Não</td></tr>\n<tr><td>Switch (uma VLAN)</td><td>Sim: um domínio por porta</td><td>Não: toda a VLAN recebe</td></tr>\n<tr><td>VLANs no switch</td><td>Sim</td><td>Sim: um domínio por VLAN</td></tr>\n<tr><td>Roteador / interface L3</td><td>Sim</td><td>Sim: um domínio por interface</td></tr>\n</tbody></table></div>\n<div class=\"callout warning\"><strong>Erros comuns:</strong>\n<ul>\n<li><strong>Achar que o switch elimina broadcast</strong> e, por isso, projetar VLANs grandes demais.</li>\n<li><strong>Confundir VLAN com firewall.</strong> Com roteamento livre entre VLANs, o acesso continua aberto; use ACLs, firewall e política entre segmentos.</li>\n<li><strong>Culpar colisão por todo problema moderno.</strong> Em switches full-duplex, lentidão local costuma vir de broadcast excessivo, loop ou erro físico. Broadcast em pequena quantidade é normal; o excesso é que exige investigação.</li>\n<li><strong>Ignorar mini-switches domésticos em portas corporativas:</strong> criam loops e expansões não documentadas.</li>\n</ul></div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<ol class=\"flow-list\"><li><strong>Hub:</strong> recebe bits em uma porta e repete para todas. Se dois hosts falam ao mesmo tempo em half-duplex, há colisão.</li><li><strong>Switch com unicast conhecido:</strong> consulta a tabela MAC e envia só para a porta do destino.</li><li><strong>Switch com broadcast:</strong> envia para todas as portas da mesma VLAN, exceto a de origem (veja o fluxo abaixo).</li></ol>\n<h3>Por que o switch acaba com as colisões</h3>\n<p>Cada porta do switch é um link ponto a ponto com um único host. Em full-duplex, os dois lados transmitem e recebem ao mesmo tempo sem disputar o meio, e o CSMA/CD fica desativado. Colisões só reaparecem quando algum link opera em half-duplex: hub, equipamento antigo ou negociação de duplex errada.</p>\n<h3>Um ARP Request atravessando a LAN</h3>\n<ol class=\"flow-list\">\n<li><strong>Host A</strong> envia o ARP Request para <code>ff:ff:ff:ff:ff:ff</code>. Numa VLAN grande, muitos broadcasts viram ruído e lentidão.</li>\n<li><strong>Switch</strong> aprende o MAC de origem na porta e VLAN de entrada. MAC flapping ou um MAC desconhecido na porta merecem investigação.</li>\n<li><strong>Switch</strong> replica o frame para todas as portas da VLAN, exceto a de origem; as outras VLANs não recebem. Um loop sem STP multiplica esses broadcasts.</li>\n<li><strong>Gateway</strong> recebe o broadcast (é membro da VLAN), mas não o encaminha para outra rede: entre redes ele encaminha pacotes IP.</li>\n</ol>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>Tamanho</th><th>Papel aqui</th><th>Observação defensiva</th></tr></thead><tbody>\n<tr><td>Destination MAC <code>ff:ff:ff:ff:ff:ff</code></td><td>48 bits</td><td>Broadcast para a VLAN</td><td>Excesso indica loop, storm ou varredura ruidosa</td></tr>\n<tr><td>Source MAC</td><td>48 bits</td><td>Aprendizado e rastreio da origem por porta/VLAN</td><td>Pode ser falsificado; não é identidade forte</td></tr>\n<tr><td>VLAN ID</td><td>12 bits na tag 802.1Q</td><td>Separa domínios de broadcast no mesmo hardware</td><td>VLAN errada ou trunk permissivo expõe segmentos</td></tr>\n<tr><td>FCS</td><td>32 bits</td><td>Detecta erro no frame</td><td>Erros recorrentes indicam problema físico</td></tr>\n</tbody></table></div>\n<p>O ponto crucial: switch não é roteador. Hosts na mesma VLAN compartilham o mesmo domínio de broadcast, por melhor que seja o switch.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2>\n<p>Em redes corporativas com switches modernos, colisão raramente é o limitador; o domínio de broadcast é. Uma rede plana com centenas ou milhares de dispositivos na mesma VLAN aumenta o volume de ARP, o ruído, o escopo de falhas e a superfície de movimento lateral.</p>\n<ul><li><strong>Acesso:</strong> switches conectam usuários, impressoras, APs, telefones e câmeras.</li><li><strong>Distribuição:</strong> agrega os switches de acesso e aplica roteamento, filtros ou políticas.</li><li><strong>Core:</strong> transporta tráfego de alto volume com baixa latência.</li><li><strong>VLANs:</strong> separam domínios de broadcast por função.</li><li><strong>Firewall/roteador:</strong> controla o tráfego entre segmentos.</li></ul>\n<p>Segmentar tem custo operacional: cada VLAN exige documentação e roteamento entre segmentos, e STP e storm control precisam ser monitorados para não virarem fonte de indisponibilidade. A rede plana parece mais barata, mas cobra o preço em incidentes e em troubleshooting mais longo.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n<p>Imagine um andar de escritório. O hub é um viva-voz que repete tudo para todos, mesmo quando a conversa é entre duas pessoas. O switch é uma recepcionista que sabe em qual sala cada pessoa está e entrega o recado direto. O broadcast é o aviso no alto-falante do andar: todos daquele andar escutam, mas o andar de cima (outra VLAN) não.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> o switch não entende o conteúdo; decide só por campos do frame, porta, VLAN e tabela MAC.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Em casa, notebook, celular, smart TV e impressora costumam estar na mesma rede. Quando o notebook precisa do MAC do gateway, envia um ARP Request em broadcast. Todos os dispositivos da rede recebem esse frame, mas só o gateway responde. Em pequena escala, isso é normal.</p>\n<h3>Contando domínios</h3>\n<p>Um roteador R tem duas interfaces. A G0/0 vai para um switch S1 com 4 hosts; a G0/1 vai para um hub H com 3 hosts.</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Trecho</th><th>Domínios de colisão</th><th>Domínios de broadcast</th></tr></thead><tbody>\n<tr><td>S1 (4 portas de host + 1 porta para R)</td><td>5 (um por porta)</td><td>1</td></tr>\n<tr><td>H (3 hosts + interface G0/1 de R)</td><td>1 (o hub inteiro)</td><td>1</td></tr>\n<tr><td><strong>Total</strong></td><td><strong>6</strong></td><td><strong>2</strong> (um por interface de R)</td></tr>\n</tbody></table></div>\n<p>Se você dividir os 4 hosts de S1 em VLAN 10 e VLAN 20, roteadas por R, os domínios de broadcast passam a 3 e os de colisão continuam 6: VLAN mexe no broadcast, não na colisão.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n<p>Colocar usuários, impressoras, servidores, câmeras, VoIP e visitantes na mesma VLAN cria um domínio de broadcast grande: facilita a descoberta de ativos, aumenta o ruído, dificulta o troubleshooting e amplia o impacto de um dispositivo mal configurado.</p>\n<p>Uma arquitetura melhor separa VLANs por função (usuários, servidores, voz, visitantes, gestão, câmeras, dispositivos industriais) e faz o tráfego entre elas passar por roteador, firewall ou camada de política. Assim o broadcast fica contido e os acessos entre segmentos podem ser registrados e controlados.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud</h2>\n<p>A cloud pública normalmente abstrai a Camada 2: você raramente vê broadcast Ethernet puro e não deve depender dele. A lógica de escopo continua: a subnet delimita endereçamento e política, as route tables decidem caminhos e security groups/NSGs controlam portas e origens. O erro equivalente à rede plana é a VPC/VNet com subnets públicas demais e regras amplas: escopo grande, pouco isolamento e pouca governança.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 540\" role=\"img\" aria-labelledby=\"m03l04-title m03l04-desc\">\n<title id=\"m03l04-title\">Hub, switch, domínio de colisão e domínio de broadcast</title>\n<desc id=\"m03l04-desc\">Comparação entre hub repetindo tráfego para todos, switch separando domínios de colisão por porta e broadcast alcançando todas as portas da mesma VLAN.</desc>\n<defs><marker id=\"m03l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n<rect x=\"30\" y=\"55\" width=\"420\" height=\"190\" rx=\"18\" class=\"svg-zone\" />\n<text x=\"240\" y=\"85\" text-anchor=\"middle\" class=\"svg-label\">Hub: um domínio de colisão compartilhado</text>\n<rect x=\"190\" y=\"135\" width=\"100\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n<text x=\"240\" y=\"168\" text-anchor=\"middle\" class=\"svg-label\">Hub</text>\n<rect x=\"60\" y=\"135\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"108\" y=\"168\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n<rect x=\"325\" y=\"95\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"373\" y=\"128\" text-anchor=\"middle\" class=\"svg-label\">Host B</text>\n<rect x=\"325\" y=\"185\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"373\" y=\"218\" text-anchor=\"middle\" class=\"svg-label\">Host C</text>\n<line x1=\"155\" y1=\"162\" x2=\"190\" y2=\"162\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<line x1=\"290\" y1=\"155\" x2=\"325\" y2=\"125\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<line x1=\"290\" y1=\"170\" x2=\"325\" y2=\"210\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<text x=\"240\" y=\"222\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Repetição para todos • colisões possíveis</text>\n<rect x=\"530\" y=\"55\" width=\"420\" height=\"190\" rx=\"18\" class=\"svg-zone\" />\n<text x=\"740\" y=\"85\" text-anchor=\"middle\" class=\"svg-label\">Switch: colisão isolada por porta</text>\n<rect x=\"690\" y=\"135\" width=\"105\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n<text x=\"742\" y=\"168\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n<rect x=\"560\" y=\"135\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"608\" y=\"168\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n<rect x=\"830\" y=\"95\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"878\" y=\"128\" text-anchor=\"middle\" class=\"svg-label\">Host B</text>\n<rect x=\"830\" y=\"185\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"878\" y=\"218\" text-anchor=\"middle\" class=\"svg-label\">Host C</text>\n<line x1=\"655\" y1=\"162\" x2=\"690\" y2=\"162\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<line x1=\"795\" y1=\"155\" x2=\"830\" y2=\"125\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<line x1=\"795\" y1=\"174\" x2=\"830\" y2=\"210\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m03l04-arrow)\" />\n<text x=\"740\" y=\"222\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Unicast conhecido vai só para a porta correta</text>\n<rect x=\"95\" y=\"315\" width=\"790\" height=\"165\" rx=\"18\" class=\"svg-zone\" />\n<text x=\"490\" y=\"345\" text-anchor=\"middle\" class=\"svg-label\">Domínio de broadcast: todos na mesma VLAN recebem broadcasts</text>\n<rect x=\"180\" y=\"385\" width=\"110\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" /><text x=\"235\" y=\"418\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n<rect x=\"435\" y=\"385\" width=\"110\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--switch\" /><text x=\"490\" y=\"418\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n<rect x=\"690\" y=\"385\" width=\"110\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" /><text x=\"745\" y=\"418\" text-anchor=\"middle\" class=\"svg-label\">Host B/C</text>\n<line x1=\"290\" y1=\"412\" x2=\"435\" y2=\"412\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<line x1=\"545\" y1=\"412\" x2=\"690\" y2=\"412\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<text x=\"490\" y=\"465\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP Request e outros broadcasts ficam dentro da VLAN, mas alcançam todos os membros dela</text>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul><li><strong>Ideia central:</strong> colisão é disputa pelo meio; broadcast é alcance lógico dentro da VLAN. O switch resolve a colisão; o broadcast precisa de segmentação.</li><li><strong>O que lembrar:</strong> hub repete para todos; switch isola colisão por porta; VLAN e roteador limitam o broadcast.</li><li><strong>Erro comum:</strong> achar que o switch elimina broadcast ou que VLAN sozinha controla acesso.</li><li><strong>Uso real:</strong> diagnóstico de loops, storms, MAC flapping e VLANs grandes demais.</li><li><strong>Segurança:</strong> domínios grandes ampliam descoberta, movimento lateral e impacto de falhas.</li></ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>A próxima aula trata do ARP, que descobre o MAC do próximo salto a partir de um IPv4 dentro da rede local. O broadcast que você estudou aqui explica tanto por que o ARP funciona quanto por que o ARP spoofing é um risco.</p>\n</section>\n"
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
      "ARP",
      "802.1Q",
      "STP"
    ],
    "dependsOn": [
      "Ethernet",
      "Frame Ethernet",
      "Switch",
      "MAC",
      "VLAN"
    ],
    "enables": [
      "ARP",
      "VLAN",
      "STP",
      "Troubleshooting L2",
      "Segmentação de LAN"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "LAN lenta sem consumo alto de internet",
      "muitos broadcasts",
      "MAC flapping",
      "portas alternando up/down",
      "CPU alta em switch",
      "perda de pacotes local"
    ],
    "diagnosticQuestions": [
      "O problema afeta uma VLAN ou várias?",
      "Há loop físico?",
      "Há aumento de broadcast/multicast?",
      "Existe equipamento não autorizado?",
      "STP ou storm control registraram eventos?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "arp -a && ipconfig /all",
        "purpose": "Ver vizinhos ARP, gateway, DNS e escopo local.",
        "expectedObservation": "Gateway e vizinhos locais aparecem; broadcast não aparece diretamente, mas ARP dá pistas.",
        "interpretation": "Muitos vizinhos inesperados podem indicar rede plana grande."
      },
      {
        "platform": "Linux",
        "command": "ip neigh && ip -s link",
        "purpose": "Ver vizinhos e erros/estatísticas de interface.",
        "expectedObservation": "Entradas REACHABLE/STALE e contadores sem erros crescentes.",
        "interpretation": "Erros ou muitos vizinhos ajudam a formular hipóteses."
      },
      {
        "platform": "Cisco IOS",
        "command": "show mac address-table\nshow interfaces counters\nshow interfaces counters errors\nshow spanning-tree\nshow storm-control",
        "purpose": "Ver tabela MAC, contadores de broadcast/multicast por porta, erros, STP e storm control.",
        "expectedObservation": "MACs estáveis, contadores de broadcast sem picos, sem erros anormais, STP consistente.",
        "interpretation": "Porta com broadcast muito acima das outras, MAC flapping, erros ou eventos STP apontam para investigação de Camada 2."
      }
    ],
    "decisionTree": [
      {
        "if": "Broadcast excessivo em uma VLAN",
        "then": "Verificar loop, STP, storm control, equipamento indevido e tamanho da VLAN."
      },
      {
        "if": "MAC aparece alternando entre portas",
        "then": "Investigar loop, virtualização, trunk incorreto ou equipamento conectado em bridge."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Segmentar por função com VLANs.",
      "Controlar roteamento entre VLANs com firewall ou ACLs.",
      "Monitorar broadcast, MAC flapping e eventos de storm control.",
      "Documentar portas, trunks e exceções."
    ],
    "badPractices": [
      "Manter todos os ativos em uma única VLAN.",
      "Permitir mini-switches não autorizados.",
      "Desabilitar STP sem justificativa."
    ],
    "commonErrors": [
      "Confundir broadcast com tráfego de internet.",
      "Culpar DNS antes de verificar Camada 2.",
      "Abrir regras amplas entre VLANs sem análise."
    ],
    "vulnerabilities": [
      {
        "name": "Broadcast storm",
        "description": "Tráfego broadcast cresce de forma anormal, geralmente por loop ou equipamento mal configurado.",
        "defensiveExplanation": "Pode derrubar a LAN e levar o time a culpar internet ou DNS.",
        "mitigation": "STP, BPDU Guard, storm control, documentação e resposta operacional."
      },
      {
        "name": "Rede plana e movimento lateral",
        "description": "Muitos ativos na mesma VLAN e no mesmo domínio de broadcast.",
        "defensiveExplanation": "Facilita descoberta e propagação após comprometer um host.",
        "mitigation": "Segmentação, firewall interno, NAC, logs e menor privilégio."
      },
      {
        "name": "Hub ou mini-switch indevido",
        "description": "Equipamento não autorizado em porta de acesso.",
        "defensiveExplanation": "Hub expõe o tráfego a todos os hosts ligados a ele; mini-switch pode criar loop.",
        "mitigation": "Port security, 802.1X, BPDU Guard e inspeção física."
      },
      {
        "name": "Segmentação falsa",
        "description": "VLANs separadas, mas roteamento livre entre elas.",
        "defensiveExplanation": "VLAN limita broadcast, não autorização: sem política, um segmento alcança os outros.",
        "mitigation": "Roteamento controlado, ACLs e firewall entre segmentos."
      }
    ],
    "monitoring": [
      "Eventos STP",
      "MAC flapping",
      "Contadores de broadcast/multicast por porta",
      "Erros CRC"
    ],
    "hardening": [
      "Port security",
      "802.1X",
      "BPDU Guard",
      "Storm control",
      "Desabilitar portas não usadas",
      "Separar VLANs por função"
    ],
    "detectionIdeas": [
      "Aumento súbito de broadcast por VLAN",
      "MACs demais em uma porta de acesso",
      "Tráfego lateral inesperado",
      "Eventos recorrentes de topologia STP"
    ]
  },
  "lab": {
    "id": "lab-3.4",
    "title": "Mapeando domínios de colisão e broadcast em uma LAN pequena",
    "labType": "security",
    "objective": "Identificar onde colisões seriam possíveis, onde broadcasts alcançam hosts e quais controles reduzem risco de Camada 2.",
    "scenario": "Você recebeu uma rede pequena com usuários, impressora, AP e gateway. Sua tarefa é classificar os domínios, apontar os riscos de Camada 2 e coletar evidências seguras. A proposta completa de segmentação é o desafio da aula.",
    "topology": "Hosts -> switch de acesso -> gateway/firewall; opcionalmente um hub/mini-switch conceitual para comparação.",
    "architecture": "LAN Ethernet com uma ou mais VLANs, switch de acesso e gateway L3 separando domínios de broadcast.",
    "prerequisites": [
      "Aulas 3.1 a 3.3",
      "Acesso a terminal local ou simulador"
    ],
    "tools": [
      "Windows PowerShell ou CMD",
      "Linux terminal",
      "Opcional: Packet Tracer/GNS3",
      "Opcional: switch Cisco autorizado"
    ],
    "estimatedTimeMinutes": 30,
    "cost": "zero",
    "safetyNotes": [
      "Não gere tráfego de broadcast artificial em rede real.",
      "Não conecte cabos criando loop.",
      "Não altere VLANs em equipamentos corporativos sem autorização.",
      "Sanitize prints e endereços antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Desenhar a topologia física",
        "instruction": "Liste hosts, switch, gateway, AP e impressora. Marque o que está conectado a qual porta quando souber.",
        "analysisTask": "Marque no mapa os pontos onde poderia haver hub, mini-switch ou loop.",
        "expectedOutput": "Mapa físico simples com dispositivos e conexões.",
        "explanation": "A topologia física ajuda a localizar possíveis pontos de loop, hub ou mini-switch."
      },
      {
        "number": 2,
        "title": "Coletar configuração local",
        "instruction": "Verifique IP, máscara, gateway e interface local.",
        "command": "Windows: ipconfig /all\nLinux: ip addr && ip route",
        "expectedOutput": "Endereço IP, gateway padrão e interface ativa.",
        "explanation": "Esses dados indicam a rede local e ajudam a inferir domínio lógico."
      },
      {
        "number": 3,
        "title": "Observar vizinhança ARP",
        "instruction": "Liste entradas ARP/vizinhos locais.",
        "command": "Windows: arp -a\nLinux: ip neigh",
        "expectedOutput": "Gateway e alguns vizinhos locais conhecidos.",
        "explanation": "ARP usa broadcast inicialmente; muitos vizinhos podem indicar domínio grande."
      },
      {
        "number": 4,
        "title": "Classificar domínios de broadcast e de colisão",
        "instruction": "Identifique quais dispositivos provavelmente recebem broadcasts entre si e quantos domínios de colisão existem (um por porta de switch, um por hub).",
        "command": "Análise conceitual baseada em IP, VLAN e gateway.",
        "expectedOutput": "Lista de dispositivos por domínio de broadcast e contagem de domínios de colisão.",
        "explanation": "Hosts na mesma VLAN/sub-rede normalmente compartilham broadcasts L2.",
        "analysisTask": "Liste os riscos dessa classificação (rede plana, mini-switch, loop) e o controle que reduziria cada um."
      },
      {
        "number": 5,
        "title": "Comparar hub e switch",
        "instruction": "Explique como o tráfego se comportaria se o dispositivo central fosse hub e como se comporta com switch.",
        "command": "Opcional Cisco: show mac address-table",
        "expectedOutput": "Tabela comparando repetição total vs forwarding seletivo.",
        "explanation": "A comparação fixa o motivo histórico da substituição de hubs por switches."
      }
    ],
    "expectedResult": "Mapa físico/lógico, classificação dos domínios de colisão e de broadcast, comparação hub × switch e lista de riscos de Camada 2 com o controle de cada um.",
    "validation": [
      {
        "check": "Mapa identifica switch, gateway e hosts",
        "command": "Revisão visual",
        "expected": "Topologia coerente com conexões conhecidas",
        "ifFails": "Refaça o inventário com escopo menor."
      },
      {
        "check": "Domínio de broadcast foi classificado",
        "command": "Comparar IP/máscara/gateway e VLAN conhecida",
        "expected": "Hosts da mesma VLAN/sub-rede agrupados",
        "ifFails": "Revise aulas 2.4, 2.5 e 3.3."
      },
      {
        "check": "Riscos têm controle associado",
        "command": "Revisão do relatório",
        "expected": "Cada risco listado tem um controle (VLAN, STP, storm control, port security, 802.1X)",
        "ifFails": "Explique qual problema cada controle resolve."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não sei a VLAN",
        "probableCause": "Rede doméstica ou sem acesso ao switch",
        "howToConfirm": "Use IP/máscara e gateway como aproximação",
        "fix": "Declare a limitação no relatório."
      },
      {
        "symptom": "Muitos vizinhos ARP",
        "probableCause": "Rede plana grande",
        "howToConfirm": "Comparar escopo DHCP/sub-rede e inventário",
        "fix": "Propor segmentação e controle entre segmentos."
      },
      {
        "symptom": "Perda local ou instabilidade",
        "probableCause": "Loop, broadcast storm, cabo ruim ou Wi-Fi instável",
        "howToConfirm": "Ver logs do switch, contadores e STP quando autorizado",
        "fix": "Escalar para equipe de redes com evidências."
      }
    ],
    "improvements": [
      "Repetir em Packet Tracer com hub e switch e comparar o tráfego.",
      "Adicionar VLANs e controles como BPDU Guard, storm control e 802.1X."
    ],
    "evidenceToCollect": [
      "Mapa físico com dispositivos e conexões",
      "Saídas sanitizadas de ipconfig/ip addr e arp/ip neigh",
      "Classificação dos domínios de colisão e de broadcast",
      "Lista de riscos de Camada 2 e controles"
    ],
    "questions": [
      "O que ainda continua alcançando toda a VLAN depois da troca do hub pelo switch?",
      "Quantos domínios de colisão e de broadcast existem na rede que você mapeou, e o que separa cada um?"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que switches substituíram hubs se ambos conectam vários cabos?",
      "hints": [
        "Pense em repetição vs decisão.",
        "Pense em colisão e exposição."
      ],
      "expectedIdeas": [
        "aprendizado MAC",
        "forwarding seletivo",
        "menos colisão",
        "melhor escalabilidade"
      ],
      "explanation": "Switches não apenas conectam fisicamente; eles tomam decisões de Camada 2."
    },
    {
      "type": "diagnóstico",
      "question": "Uma VLAN inteira fica lenta e o link de internet não está saturado. Que hipótese de Camada 2 você testaria?",
      "hints": [
        "Pense em broadcast e loop.",
        "Procure eventos de STP ou storm."
      ],
      "expectedIdeas": [
        "broadcast storm",
        "loop",
        "MAC flapping",
        "storm control",
        "STP"
      ],
      "explanation": "Problemas locais podem não aparecer como consumo de internet."
    },
    {
      "type": "cenário real",
      "question": "Por que separar visitantes, câmeras e usuários em VLANs diferentes melhora segurança?",
      "hints": [
        "Pense em escopo de broadcast.",
        "Pense em movimento lateral."
      ],
      "expectedIdeas": [
        "reduz descoberta",
        "limita broadcast",
        "aplica política entre redes",
        "melhora logs"
      ],
      "explanation": "Segmentação cria limites operacionais e pontos de controle."
    }
  ],
  "quiz": [
    {
      "id": "q3.4.1",
      "question": "O que um hub faz com sinais recebidos em uma porta?",
      "options": [
        "Encaminha apenas para o MAC correto",
        "Repete para todas as portas",
        "Roteia para outra rede",
        "Criptografa o frame"
      ],
      "answer": 1,
      "explanation": "Hub é repetidor; ele não aprende MAC nem filtra tráfego.",
      "topic": "hub",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q3.4.2",
      "question": "O que o switch reduz em comparação com hubs?",
      "options": [
        "Broadcast dentro da VLAN",
        "Necessidade de IP",
        "Domínios de colisão compartilhados",
        "Uso de ARP"
      ],
      "answer": 2,
      "explanation": "Switches segmentam colisão por porta, mas broadcasts continuam na VLAN.",
      "topic": "switch",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q3.4.3",
      "question": "Broadcast excessivo em uma VLAN pode indicar primeiro qual problema?",
      "options": [
        "Loop ou storm de Camada 2",
        "Link de internet saturado",
        "Falha no servidor DNS",
        "Certificado TLS expirado"
      ],
      "answer": 0,
      "explanation": "Broadcast fica dentro da VLAN e não depende de internet nem de DNS; o excesso aponta primeiro para loop ou storm.",
      "topic": "broadcast",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q3.4.4",
      "question": "Qual prática reduz o escopo de broadcast e movimento lateral?",
      "options": [
        "Ativar full-duplex em todas as portas",
        "Trocar o hub por um switch na mesma VLAN",
        "Criar VLANs e liberar o roteamento entre todas",
        "Segmentar por VLAN e controlar o tráfego entre segmentos"
      ],
      "answer": 3,
      "explanation": "VLAN reduz o domínio de broadcast e a política entre segmentos limita o movimento lateral. Hub→switch e full-duplex só afetam colisão; VLANs com roteamento livre são segmentação falsa.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q3.4.5",
      "question": "Quem normalmente separa domínios de broadcast?",
      "options": [
        "Hub",
        "Roteador ou interface L3",
        "Cabo RJ-45",
        "Servidor DNS"
      ],
      "answer": 1,
      "explanation": "Roteadores e gateways L3 separam redes e não encaminham broadcasts L2 comuns.",
      "topic": "L3",
      "difficulty": "iniciante",
      "type": "arquitetura"
    },
    {
      "id": "q3.4.7",
      "question": "Um roteador liga uma interface a um switch com 3 hosts e outra a um hub com 5 hosts. Quantos domínios de colisão e de broadcast existem?",
      "options": [
        "9 de colisão e 1 de broadcast",
        "2 de colisão e 2 de broadcast",
        "5 de colisão e 2 de broadcast",
        "4 de colisão e 3 de broadcast"
      ],
      "answer": 2,
      "explanation": "Switch: 3 hosts + 1 porta para o roteador = 4 domínios de colisão. Hub: 1. Total 5. Cada interface do roteador delimita um domínio de broadcast: 2.",
      "topic": "contagem de domínios",
      "difficulty": "intermediário",
      "type": "cálculo"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.4.1",
      "front": "O que é domínio de colisão?",
      "back": "Conjunto de dispositivos que poderiam disputar o mesmo meio e gerar colisões.",
      "tags": [
        "ethernet"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.4.2",
      "front": "O que é domínio de broadcast?",
      "back": "Conjunto de dispositivos que recebem broadcasts entre si, normalmente dentro da mesma VLAN.",
      "tags": [
        "broadcast"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.4.7",
      "front": "Por que um link full-duplex não tem colisão?",
      "back": "É ponto a ponto entre host e porta do switch, e os dois lados transmitem e recebem ao mesmo tempo sem disputar o meio; o CSMA/CD fica desativado.",
      "tags": [
        "switch"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.4.4",
      "front": "Switch elimina broadcast?",
      "back": "Não. Switch encaminha broadcast dentro da VLAN.",
      "tags": [
        "switch"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.4.8",
      "front": "Para quais portas o switch envia um broadcast?",
      "back": "Para todas as portas da mesma VLAN, exceto a porta de entrada.",
      "tags": [
        "broadcast"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.4.6",
      "front": "Por que rede plana é arriscada?",
      "back": "Aumenta escopo de broadcast, descoberta interna e movimento lateral.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.4.1",
      "type": "conceitual",
      "prompt": "Explique em uma frase a diferença entre domínio de colisão e domínio de broadcast.",
      "expectedAnswer": "Colisão trata disputa pelo meio; broadcast trata alcance lógico de frames para todos na mesma VLAN.",
      "explanation": "São problemas diferentes: um físico/enlace histórico, outro de escopo lógico."
    },
    {
      "id": "ex3.4.5",
      "type": "análise",
      "prompt": "Um switch tem a VLAN 10 nas portas 1 a 4 e a VLAN 20 nas portas 5 a 8. O host da porta 2 envia um ARP Request. Quais portas recebem o frame?",
      "expectedAnswer": "As portas 1, 3 e 4 (VLAN 10, exceto a de entrada). As portas 5 a 8 não recebem, porque estão em outro domínio de broadcast.",
      "explanation": "O broadcast fica na VLAN de entrada; para chegar à VLAN 20 seria preciso roteamento, e o roteador não repassa broadcast L2."
    },
    {
      "id": "ex3.4.6",
      "type": "cálculo",
      "prompt": "Um roteador tem a G0/0 ligada a um switch com 6 hosts e a G0/1 a um hub com 4 hosts. Conte os domínios de colisão e de broadcast. O que muda se os 6 hosts do switch forem divididos em duas VLANs roteadas?",
      "expectedAnswer": "Colisão: 7 no switch (6 hosts + porta do roteador) + 1 no hub = 8. Broadcast: 2. Com duas VLANs, broadcast passa a 3 e colisão continua 8.",
      "explanation": "VLAN muda o broadcast, não a colisão."
    }
  ],
  "challenge": {
    "title": "Segmentar uma rede plana pequena",
    "scenario": "Uma filial possui usuários, visitantes, impressoras e câmeras na mesma rede. Há lentidão intermitente e preocupação de segurança.",
    "tasks": [
      "Identificar riscos da rede plana.",
      "Propor VLANs por função.",
      "Indicar quais comunicações devem ser permitidas entre segmentos.",
      "Listar evidências para investigar broadcast excessivo.",
      "Sugerir controles de Camada 2."
    ],
    "constraints": [
      "Não assumir compra imediata de equipamentos caros.",
      "Não interromper operação sem janela de mudança.",
      "Manter visitantes sem acesso a ativos internos."
    ],
    "expectedDeliverables": [
      "Tabela de VLANs",
      "Matriz de acesso entre segmentos",
      "Plano de evidências",
      "Lista de controles defensivos"
    ],
    "gradingRubric": [
      {
        "criterion": "Segmentação coerente",
        "points": 30,
        "description": "Separa funções com justificativa."
      },
      {
        "criterion": "Controle entre segmentos",
        "points": 25,
        "description": "Define tráfego permitido e negado."
      },
      {
        "criterion": "Troubleshooting",
        "points": 25,
        "description": "Coleta evidências de broadcast/loop antes de agir."
      },
      {
        "criterion": "Segurança e operação",
        "points": 20,
        "description": "Inclui controles e cuidado com mudança."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos escopo de broadcast por função; depois controlamos tráfego entre VLANs e só então aplicamos controles L2 e monitoramento.",
    "steps": [
      "Inventariar dispositivos.",
      "Criar VLANs para usuários, visitantes, impressoras, câmeras e gestão.",
      "Definir gateway/firewall entre VLANs.",
      "Permitir apenas fluxos necessários.",
      "Habilitar STP, storm control e controle de portas.",
      "Monitorar broadcast e eventos."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Trocar DNS para resolver lentidão.",
        "whyItIsWrong": "O sintoma pode estar em Camada 2 e não em resolução de nomes."
      },
      {
        "answer": "Colocar todos em uma VLAN maior.",
        "whyItIsWrong": "Aumenta o domínio de broadcast e o risco lateral."
      }
    ],
    "finalAnswer": "A solução segura é segmentar por função, controlar comunicação entre segmentos, monitorar eventos L2 e documentar portas, VLANs e exceções."
  },
  "glossary": [
    {
      "term": "Domínio de colisão",
      "shortDefinition": "Grupo de dispositivos que poderiam colidir em meio compartilhado.",
      "longDefinition": "Conceito histórico importante em Ethernet, especialmente com hubs e links half-duplex.",
      "example": "Vários hosts em um hub compartilham o mesmo domínio de colisão.",
      "relatedTerms": [
        "hub",
        "half-duplex"
      ],
      "relatedLessons": [
        "3.4"
      ]
    },
    {
      "term": "Domínio de broadcast",
      "shortDefinition": "Grupo de hosts que recebem broadcasts entre si.",
      "longDefinition": "Normalmente corresponde a uma VLAN ou rede local lógica.",
      "example": "Todos os hosts da VLAN 10 recebem um ARP Request da VLAN 10.",
      "relatedTerms": [
        "VLAN",
        "ARP"
      ],
      "relatedLessons": [
        "3.4",
        "3.5"
      ]
    },
    {
      "term": "Hub",
      "shortDefinition": "Dispositivo repetidor que envia sinais para todas as portas.",
      "longDefinition": "Não aprende MAC nem filtra tráfego, mantendo colisão compartilhada.",
      "example": "Um hub repete tráfego de A para B também para C.",
      "relatedTerms": [
        "repetidor",
        "colisão"
      ],
      "relatedLessons": [
        "3.4"
      ]
    },
    {
      "term": "Switch",
      "shortDefinition": "Dispositivo de Camada 2 que aprende MACs e encaminha frames.",
      "longDefinition": "Reduz colisões e encaminha unicast conhecido seletivamente.",
      "example": "Switch envia frame para a porta onde o MAC de destino foi aprendido.",
      "relatedTerms": [
        "tabela MAC",
        "forwarding"
      ],
      "relatedLessons": [
        "3.3",
        "3.4"
      ]
    },
    {
      "term": "Broadcast storm",
      "shortDefinition": "Crescimento anormal de tráfego broadcast.",
      "longDefinition": "Pode ocorrer por loop ou falha de controle, causando indisponibilidade local.",
      "example": "Um loop entre switches multiplica broadcasts até degradar a LAN.",
      "relatedTerms": [
        "STP",
        "storm control"
      ],
      "relatedLessons": [
        "3.4",
        "3.8"
      ]
    },
    {
      "term": "VLAN",
      "shortDefinition": "Segmentação lógica de Camada 2.",
      "longDefinition": "VLANs separam domínios de broadcast em switches gerenciáveis.",
      "example": "Visitantes ficam em VLAN separada dos servidores.",
      "relatedTerms": [
        "802.1Q",
        "trunk"
      ],
      "relatedLessons": [
        "3.7"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_3-2022.html",
      "note": "Referência normativa para Ethernet."
    },
    {
      "type": "internal-course",
      "title": "Modelo OSI — Camada 2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Revisar aula 2.4 antes de aprofundar Camada 2."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Redes de plataforma e ambientes internos",
      "lesson": "Conceitos de segmentação e observabilidade",
      "reason": "Runners, clusters e registries internos dependem de segmentação e controle de tráfego."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso condicionado e confiança de dispositivo",
      "lesson": "Controle de acesso por contexto",
      "reason": "802.1X/NAC e identidade de dispositivo se conectam à segurança de acesso."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "labMarkedDone",
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "3.5"
    ]
  }
};
