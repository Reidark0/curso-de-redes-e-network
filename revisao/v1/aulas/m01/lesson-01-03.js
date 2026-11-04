export const lesson0103 = {
  "id": "1.3",
  "moduleId": "m01",
  "order": 3,
  "title": "Tipos de rede: PAN, LAN, WLAN, CAN, MAN, WAN e SAN",
  "subtitle": "Como alcance, finalidade, meio e domínio administrativo mudam arquitetura, operação, custo e segurança.",
  "duration": "70-100 min",
  "estimatedStudyTimeMinutes": 100,
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
    "cloud",
    "segurança",
    "arquitetura",
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
    "Diferenciar PAN, LAN, WLAN, CAN, MAN, WAN e SAN pelo alcance e finalidade.",
    "Relacionar cada tipo de rede com custos, riscos, operação e troubleshooting.",
    "Entender como tipos de rede coexistem em uma arquitetura corporativa moderna.",
    "Reconhecer equivalentes em cloud networking e ambientes híbridos.",
    "Evitar decisões ruins causadas por decorar siglas sem entender contexto."
  ],
  "learningOutcomes": [
    "Dado um cenário, o aluno classifica corretamente o tipo ou os tipos de rede envolvidos.",
    "Dado um problema de conectividade, o aluno identifica se a hipótese envolve LAN, WLAN, WAN, cloud ou serviço especializado.",
    "Dada uma arquitetura simples, o aluno aponta riscos e controles de segurança coerentes com cada tipo de rede."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>A rede entre seu fone Bluetooth e o celular, o Wi-Fi da sua casa, a rede cabeada de uma empresa, o link entre filiais, a rede de storage de um datacenter e a internet resolvem o mesmo problema básico (comunicação), mas com escalas, riscos, custos e donos muito diferentes.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> chamar tudo de “rede” esconde essas diferenças. Classificar o tipo de rede diz qual meio usar, quem administra, que latência e disponibilidade esperar, onde pôr firewall, quanto custa crescer e quais logs coletar. Uma LAN interna, uma WAN entre filiais, uma WLAN corporativa e uma SAN de datacenter têm requisitos, ameaças e troubleshooting diferentes.</div>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>As siglas surgiram conforme a comunicação ganhou escala: redes locais para compartilhar impressoras e servidores, depois ligações entre prédios, cidades, filiais e datacenters, e redes especializadas para mobilidade (sem fio), periféricos pessoais e armazenamento. Cada uma nasceu para um objetivo diferente:</p>\n  <ul class=\"flow-list\">\n    <li><strong>LAN:</strong> baixa latência e controle interno.</li>\n    <li><strong>WAN:</strong> ligar locais distantes.</li>\n    <li><strong>WLAN:</strong> mobilidade, enfrentando interferência.</li>\n    <li><strong>SAN:</strong> acesso rápido e confiável a armazenamento.</li>\n    <li><strong>PAN:</strong> proximidade e baixo consumo.</li>\n  </ul>\n  <p>Para classificar uma rede, olhe cinco dimensões:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Alcance:</strong> centímetros, sala, prédio, campus, cidade, país ou mundo.</li>\n    <li><strong>Meio:</strong> cobre, fibra, rádio, links de operadora ou rede virtual em cloud.</li>\n    <li><strong>Controle (domínio administrativo):</strong> você, a operadora, o provedor cloud ou várias organizações.</li>\n    <li><strong>Risco:</strong> exposição física, rádio, terceiros, internet, movimento lateral ou indisponibilidade crítica.</li>\n    <li><strong>Custo:</strong> cabo local, APs, switches, circuitos de operadora, VPN, firewalls, storage fabric ou tráfego cloud.</li>\n  </ul>\n  <p>Sem essa classificação, a equipe aplica a solução errada: trata Wi-Fi como se fosse cabo, link WAN como se fosse LAN, põe armazenamento crítico em rede comum sem isolamento ou desenha cloud sem entender alcance e domínio administrativo.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>Tipos de rede são classificações que descrevem o alcance, a finalidade, o meio de transmissão e o domínio administrativo de uma rede.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Tipo</th><th>Alcance típico</th><th>Finalidade</th><th>Limitação principal</th></tr></thead>\n    <tbody>\n      <tr><td>PAN (Personal Area Network)</td><td>Pessoa ou poucos metros</td><td>Periféricos, sensores, celular, wearable</td><td>Baixo alcance, bateria, pareamento e segurança local</td></tr>\n      <tr><td>LAN (Local Area Network)</td><td>Sala, casa, escritório, andar</td><td>Conectar hosts próximos com alto controle</td><td>Broadcast, cabos, switches, segmentação e crescimento</td></tr>\n      <tr><td>WLAN (Wireless LAN)</td><td>Ambiente coberto por rádio</td><td>Mobilidade via Wi-Fi; é uma LAN sem fio</td><td>Interferência, sinal, autenticação e compartilhamento do meio</td></tr>\n      <tr><td>CAN (Campus Area Network)</td><td>Campus, conjunto de prédios</td><td>Interligar unidades próximas sob uma organização</td><td>Backbone, fibra, redundância e administração central</td></tr>\n      <tr><td>MAN (Metropolitan Area Network)</td><td>Cidade ou região metropolitana</td><td>Conectar sites dentro de área urbana</td><td>Dependência de operadora e custo de link</td></tr>\n      <tr><td>WAN (Wide Area Network)</td><td>Região, país ou global</td><td>Conectar filiais, datacenters, internet e cloud</td><td>Latência, custo, SLA, roteamento e segurança</td></tr>\n      <tr><td>SAN (Storage Area Network)</td><td>Datacenter ou ambiente especializado</td><td>Conectar servidores a armazenamento</td><td>Complexidade, custo, isolamento e criticidade</td></tr>\n    </tbody>\n  </table></div>\n  <p>Essas categorias não são caixas rígidas: a mesma empresa tem LAN na filial, WLAN para usuários móveis, WAN entre filiais, SAN no datacenter e redes virtuais em cloud. A sigla não substitui o desenho da arquitetura; ela é o ponto de partida.</p>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Achar que WLAN é “a internet”.</strong> WLAN é o acesso local por rádio; a internet depende de gateway, rota, DNS e provedor. Sem essa separação, o diagnóstico confunde rádio local com acesso WAN.</li>\n      <li><strong>Tratar WAN com a latência de uma LAN.</strong> Uma aplicação que funcionava no mesmo prédio fica lenta quando vai para a filial ou a cloud, por protocolos “tagarelas” (chatty), replicação ruim ou dependência síncrona. Projete considerando latência, perda, SLA, cache e filas.</li>\n      <li><strong>Confundir SAN com NAS.</strong> Os dois põem armazenamento na rede, mas SAN é uma rede especializada que entrega armazenamento em blocos aos servidores; NAS é um serviço de arquivos dentro da rede comum. Confundir leva a subestimar criticidade, desempenho e isolamento.</li>\n      <li><strong>Achar que cloud dispensa redes.</strong> O cabo fica invisível, mas VPC/VNet, subnets, rotas, security groups, endpoints privados e tráfego continuam sendo seu problema; ignorá-los gera subnets públicas, rotas permissivas e custos inesperados.</li>\n      <li><strong>Supor que toda conexão entre sites é internet pública</strong> (ou que toda rede sem fio é insegura por definição). Verifique o serviço contratado e os controles aplicados antes de concluir.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Todo tipo de rede precisa de meio, regras de comunicação, endereçamento, encaminhamento, controle de acesso e observabilidade. O que muda é onde está a preocupação central:</p>\n  <ol class=\"flow-list\">\n    <li><strong>PAN:</strong> tecnologias de curto alcance e baixo consumo. Foco em pareamento, proximidade e autorização entre dispositivos.</li>\n    <li><strong>LAN:</strong> normalmente Ethernet e switches. Foco em comutação local, endereçamento, VLANs, broadcast, gateway e cabeamento.</li>\n    <li><strong>WLAN:</strong> rádio e access points. Foco em sinal, canal, interferência, autenticação, roaming e densidade de usuários.</li>\n    <li><strong>CAN/MAN/WAN:</strong> enlaces entre locais. Foco em roteamento, redundância, operadora, criptografia e política de tráfego.</li>\n    <li><strong>SAN:</strong> separa o tráfego de armazenamento para desempenho e confiabilidade. Foco em latência, disponibilidade, isolamento e integridade.</li>\n  </ol>\n  <p>Em troubleshooting, o tipo de rede muda as hipóteses: em LAN você olha cabo, switch, VLAN e gateway; em WLAN, sinal e autenticação; em WAN, rota, SLA, VPN e operadora; em SAN, paths, zoning, storage e latência.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>Numa arquitetura corporativa, os tipos de rede aparecem empilhados e conectados. Um notebook acessa a WLAN, que se liga à LAN do prédio, que alcança serviços internos, passa por firewalls, usa a WAN para chegar a outra filial e pode consumir recursos em cloud. Um servidor de virtualização pode estar ao mesmo tempo na LAN de gerenciamento, na rede de produção e numa SAN.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Borda de usuário:</strong> PAN, WLAN e LAN.</li>\n    <li><strong>Distribuição interna:</strong> LAN e CAN, geralmente com switches, VLANs e roteamento interno.</li>\n    <li><strong>Interconexão distante:</strong> MAN e WAN, com links de operadora, VPN, SD-WAN ou conexão dedicada.</li>\n    <li><strong>Datacenter:</strong> LAN de servidores, rede de gerenciamento, rede de backup e SAN.</li>\n    <li><strong>Cloud:</strong> redes virtuais, subnets, peering, VPN, links dedicados (ExpressRoute/Direct Connect) e endpoints privados.</li>\n  </ul>\n  <h3>Operação e custo por tipo</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Tipo</th><th>O que a operação exige</th><th>Onde está o custo</th></tr></thead>\n    <tbody>\n      <tr><td>PAN e LAN pequena</td><td>Suporte e segurança básicos</td><td>Baixo custo inicial</td></tr>\n      <tr><td>LAN e WLAN</td><td>Inventário local, cabeamento, APs, switches e suporte ao usuário</td><td>WLAN corporativa pode exigir APs gerenciados, controladora, licenças e site survey</td></tr>\n      <tr><td>WAN</td><td>Gestão de operadora, SLA, redundância, roteamento e monitoramento de disponibilidade</td><td>Links dedicados têm custo recorrente alto</td></tr>\n      <tr><td>SAN</td><td>Operação especializada, controle rigoroso e planejamento de performance</td><td>Storage, switches especializados, licenças, redundância e equipe especializada</td></tr>\n      <tr><td>Cloud</td><td>Documentar subnets, rotas, peering, endpoints e custos de tráfego</td><td>Tráfego entre regiões, NAT gateways, firewalls gerenciados e links dedicados</td></tr>\n    </tbody>\n  </table></div>\n  <p>A decisão arquitetural não é escolher uma sigla: é saber qual tipo de rede resolve qual problema e onde aplicar segmentação, segurança, redundância e monitoramento.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense em sistemas de transporte. PAN é levar algo no bolso. LAN é circular dentro de uma casa ou escritório. CAN é circular entre os prédios de uma universidade. MAN é o transporte dentro de uma cidade. WAN são as rodovias entre estados ou países. SAN é um corredor técnico reservado para carga crítica dentro de uma instalação.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> ela ajuda com o alcance, mas redes não levam objetos inteiros: dividem a informação em unidades e usam protocolos, endereços, filas, retransmissões e políticas.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Na sua casa, o celular conectado ao fone Bluetooth forma uma PAN. O notebook ligado ao roteador por cabo faz parte da LAN. O celular no Wi-Fi participa da WLAN. O roteador da operadora liga sua rede doméstica à WAN da internet. Um HD de rede ou NAS doméstico é um serviço de arquivos dentro da sua LAN, não uma SAN.</p>\n  <p>Quando “a internet cai”, a classificação ajuda: o Wi-Fi pode estar funcionando e a WAN indisponível; a LAN pode continuar imprimindo enquanto os serviços externos falham. O problema não é “a rede” inteira, e sim um domínio específico.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa média pode ter LAN cabeada para estações fixas, WLAN corporativa para notebooks, WLAN de visitantes isolada, CAN ligando prédios próximos, WAN ligando filiais, VPN para usuários remotos e SAN no datacenter. Cada tipo tem dono, custo, política e risco próprios, e o time de segurança traduz isso em requisitos: a WLAN de visitantes não acessa a LAN interna, a WAN entre filiais passa por firewall, a SAN não é roteável para usuários, a rede de gerenciamento é separada e os logs de autenticação Wi-Fi vão para o SIEM.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud as siglas mudam, mas os conceitos continuam. Uma VPC (AWS, GCP) ou VNet (Azure) é a rede virtual controlada pelo cliente. Subnets organizam segmentos. Peering conecta redes virtuais. VPN e links dedicados ligam a rede corporativa à cloud e fazem o papel de WAN híbrida. Private endpoints dão acesso privado a serviços gerenciados.</p>\n  <p>Não ver cabo não significa não ter arquitetura de rede: você ainda precisa entender alcance, rota, domínio administrativo, custo de tráfego, inspeção, DNS privado e políticas. Como essa rede é declarada em IaC (subnets, rotas, security groups, endpoints, conexões híbridas), policy as code no pipeline pode impedir que um serviço de produção fique exposto em subnet pública.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>Cada tipo de rede muda o modelo de ameaça e a superfície de ataque:</p>\n  <div class=\"responsive-table\"><table class=\"data-table risk-table\">\n    <thead><tr><th>Tipo</th><th>Risco comum</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>WLAN</td><td>Senha fraca, rogue AP, cobertura indevida</td><td>Acesso não autorizado ou interceptação local</td><td>WPA2/WPA3 Enterprise, segmentação, logs e site survey</td></tr>\n      <tr><td>LAN</td><td>Rede plana sem segmentação</td><td>Movimento lateral após comprometimento</td><td>VLANs, ACLs, NAC, firewall interno e monitoramento</td></tr>\n      <tr><td>WAN</td><td>Link sem criptografia ou política fraca</td><td>Exposição entre sites e indisponibilidade</td><td>VPN, SD-WAN seguro, redundância e SLA</td></tr>\n      <tr><td>SAN</td><td>Acesso indevido a storage</td><td>Perda, corrupção ou vazamento de dados críticos</td><td>Isolamento, zoning, autenticação, multipath e auditoria</td></tr>\n      <tr><td>Cloud</td><td>Subnet pública indevida</td><td>Exposição direta de workloads</td><td>Private subnets, security groups mínimos e endpoints privados</td></tr>\n    </tbody>\n  </table></div>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1040 520\" role=\"img\" aria-labelledby=\"m01l03-title m01l03-desc\">\n    <title id=\"m01l03-title\">Tipos de rede por alcance e finalidade</title>\n    <desc id=\"m01l03-desc\">Diagrama comparando PAN, LAN, WLAN, CAN, MAN, WAN e SAN dentro de uma arquitetura corporativa.</desc>\n    <defs>\n      <marker id=\"m01l03-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"55\" width=\"135\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"102\" y=\"84\" text-anchor=\"middle\" class=\"svg-label\">PAN</text>\n    <text x=\"102\" y=\"107\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Pessoa</text>\n    <rect x=\"210\" y=\"55\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"282\" y=\"84\" text-anchor=\"middle\" class=\"svg-label\">LAN</text>\n    <text x=\"282\" y=\"107\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Sala / andar</text>\n    <rect x=\"395\" y=\"55\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"467\" y=\"84\" text-anchor=\"middle\" class=\"svg-label\">WLAN</text>\n    <text x=\"467\" y=\"107\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi</text>\n    <rect x=\"580\" y=\"55\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"652\" y=\"84\" text-anchor=\"middle\" class=\"svg-label\">CAN</text>\n    <text x=\"652\" y=\"107\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Campus</text>\n    <rect x=\"765\" y=\"55\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"837\" y=\"84\" text-anchor=\"middle\" class=\"svg-label\">MAN</text>\n    <text x=\"837\" y=\"107\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cidade</text>\n    <rect x=\"430\" y=\"220\" width=\"180\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"520\" y=\"253\" text-anchor=\"middle\" class=\"svg-label\">WAN</text>\n    <text x=\"520\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Filiais / internet / cloud</text>\n    <rect x=\"720\" y=\"220\" width=\"185\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"812\" y=\"253\" text-anchor=\"middle\" class=\"svg-label\">SAN</text>\n    <text x=\"812\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Storage crítico</text>\n    <line x1=\"170\" y1=\"90\" x2=\"210\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <line x1=\"355\" y1=\"90\" x2=\"395\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <line x1=\"540\" y1=\"90\" x2=\"580\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <line x1=\"725\" y1=\"90\" x2=\"765\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <path d=\"M650 125 C630 170, 590 200, 555 220\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <line x1=\"610\" y1=\"260\" x2=\"720\" y2=\"260\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <rect x=\"120\" y=\"365\" width=\"800\" height=\"95\" rx=\"16\" class=\"svg-node svg-node--security\" />\n    <text x=\"520\" y=\"400\" text-anchor=\"middle\" class=\"svg-label\">Decisão arquitetural</text>\n    <text x=\"520\" y=\"428\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">alcance + finalidade + meio + controle + custo + risco + evidência</text>\n  </svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Modelo mental:</strong> para classificar uma rede, pergunte qual alcance ela cobre, que finalidade atende, quem a controla, qual meio usa, que risco cria e que evidência comprova que funciona.</li>\n    <li><strong>As siglas:</strong> PAN é pessoal; LAN é local; WLAN é local sem fio; CAN é campus; MAN é metropolitana; WAN é longa distância; SAN é armazenamento.</li>\n    <li><strong>Na prática, os tipos coexistem:</strong> WLAN e LAN na borda, CAN/MAN/WAN entre locais, SAN no datacenter e VPC/VNet na cloud.</li>\n    <li><strong>Erro comum:</strong> decorar siglas sem entender o impacto: Wi-Fi não é internet, WAN não tem latência de LAN, SAN não é NAS.</li>\n    <li><strong>Uso real:</strong> a classificação orienta arquitetura, troubleshooting, orçamento, segmentação e monitoramento.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, topologias físicas e lógicas: duas redes do mesmo tipo, como duas LANs, podem ter desenhos muito diferentes (estrela, malha, hub-and-spoke, spine-leaf ou topologia virtual em cloud).</p>\n</section>\n"
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
  "troubleshooting": {
    "symptoms": [
      "Wi-Fi conectado, mas sem internet",
      "Filial lenta",
      "Servidor local acessível, cloud inacessível",
      "Storage com alta latência",
      "Usuários visitantes acessando recursos internos"
    ],
    "diagnosticQuestions": [
      "O problema está em PAN, LAN, WLAN, WAN, cloud ou serviço específico?",
      "O usuário consegue acessar recursos locais?",
      "Há perda, latência alta ou falha de resolução de nome?",
      "O tráfego passa por operadora, VPN, firewall ou proxy?",
      "Existe isolamento correto entre redes?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && ping <gateway> && tracert <destino>",
        "purpose": "Ver configuração local, testar LAN/WLAN e observar caminho até o destino.",
        "expectedObservation": "IP, gateway, DNS, resposta do gateway e saltos até o destino.",
        "interpretation": "Se gateway responde e destino externo falha, a hipótese se desloca para DNS, WAN, firewall ou serviço."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && ping -c 4 <gateway> && traceroute <destino>",
        "purpose": "Ver interfaces, rotas e caminho de rede.",
        "expectedObservation": "Interface com IP, rota default e resposta do gateway.",
        "interpretation": "Ajuda a separar problema local, rota, WAN ou destino."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow vlan brief\nshow ip route",
        "purpose": "Ver interfaces, VLANs e rotas em equipamento de rede.",
        "expectedObservation": "Interfaces up/up, VLANs esperadas e rotas corretas.",
        "interpretation": "Permite verificar LAN, segmentação e encaminhamento."
      }
    ],
    "decisionTree": [
      {
        "if": "Dispositivo vê Wi-Fi, mas não pinga gateway",
        "then": "Investigar WLAN, autenticação, sinal, VLAN associada ao SSID e AP."
      },
      {
        "if": "Pinga gateway, mas não acessa internet",
        "then": "Investigar DNS, rota default, NAT, firewall, WAN ou provedor."
      },
      {
        "if": "Recursos locais funcionam, mas filial/cloud está lenta",
        "then": "Investigar WAN, VPN, latência, perda, MTU, firewall e aplicação."
      },
      {
        "if": "Storage apresenta lentidão crítica",
        "then": "Investigar SAN, paths, latência, congestionamento, zoning e storage backend."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Separar redes por função e criticidade: usuários, servidores, visitantes, IoT, gerência e storage.",
      "Isolar a rede de visitantes da rede interna.",
      "Criptografar links WAN e acessos remotos.",
      "Manter SAN e gerenciamento fora do alcance de usuários comuns.",
      "Documentar domínio administrativo, rotas, responsáveis e logs por tipo de rede."
    ],
    "badPractices": [
      "Usar uma única LAN plana para usuários, servidores, impressoras, visitantes e IoT.",
      "Expor storage ou gerenciamento em redes de usuário.",
      "Criar subnets públicas em cloud sem necessidade."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Achar que NAT substitui firewall.",
      "Achar que SSID separado sempre significa isolamento real.",
      "Ignorar custo e risco de tráfego entre regiões cloud."
    ],
    "vulnerabilities": [
      {
        "name": "Rede plana com movimento lateral",
        "description": "Usuários, servidores e dispositivos diversos ficam no mesmo domínio, facilitando propagação após comprometimento.",
        "defensiveExplanation": "O risco aumenta porque o atacante não encontra barreiras internas suficientes.",
        "mitigation": "Segmentação, ACLs, firewall interno, NAC, EDR e monitoramento."
      },
      {
        "name": "WLAN de visitantes sem isolamento",
        "description": "Convidados conseguem alcançar recursos internos por erro de VLAN, firewall ou portal.",
        "defensiveExplanation": "O meio sem fio amplia acesso físico ao perímetro lógico da organização.",
        "mitigation": "SSID segregado, VLAN dedicada, firewall, captive portal e logs."
      },
      {
        "name": "Exposição indevida em cloud",
        "description": "Workloads ficam em subnet pública ou com security group amplo sem necessidade.",
        "defensiveExplanation": "A internet passa a alcançar serviços que deveriam ser privados.",
        "mitigation": "Private subnets, endpoints privados, security groups mínimos, WAF quando aplicável e revisão de IaC."
      }
    ],
    "monitoring": [
      "Logs de firewall por zona",
      "Autenticação Wi-Fi",
      "NetFlow ou equivalente",
      "Métricas de link WAN",
      "Eventos de security group",
      "Logs de VPN e DNS"
    ],
    "hardening": [
      "Desabilitar portas de switch não usadas",
      "Aplicar menor privilégio em ACLs e security groups",
      "Proteger as interfaces de gerência",
      "Revisar rotas e exposição pública"
    ],
    "detectionIdeas": [
      "Acesso de visitantes a redes internas",
      "Picos de tráfego entre segmentos",
      "Conexões incomuns para storage",
      "Mudanças não autorizadas em rotas",
      "Subnets públicas criadas por IaC sem aprovação"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que decorar as siglas PAN, LAN, WLAN, CAN, MAN, WAN e SAN não é suficiente?",
      "hints": [
        "Pense em custo, risco e operação.",
        "Pense no que muda entre Wi-Fi, filial e storage."
      ],
      "expectedIdeas": [
        "alcance",
        "finalidade",
        "meio",
        "controle",
        "segurança",
        "troubleshooting"
      ],
      "explanation": "A utilidade da classificação está em orientar decisões técnicas, não em memorizar nomes."
    },
    {
      "type": "diagnóstico",
      "question": "Um sistema interno funcionava bem com o banco de dados na mesma LAN. Depois que o banco foi movido para a cloud, em outra região, cada tela passou a demorar vários segundos, embora o link não esteja saturado. Por que isso acontece?",
      "hints": [
        "Compare a latência típica de uma LAN com a de uma WAN.",
        "Pense em quantas idas e voltas cada tela faz até o banco."
      ],
      "expectedIdeas": [
        "latência de WAN",
        "protocolo chatty",
        "muitas idas e voltas",
        "dependência síncrona",
        "cache",
        "arquitetura distribuída"
      ],
      "explanation": "WAN não tem a latência de uma LAN. Uma aplicação que faz muitas consultas pequenas e síncronas multiplica essa latência a cada ida e volta. A solução passa por projetar para WAN: menos idas e voltas, cache, filas ou aproximar dados e aplicação."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer liberar Wi-Fi de visitantes. Por que não basta criar outro nome de rede?",
      "hints": [
        "SSID não é sempre isolamento.",
        "Pense em VLAN, firewall e logs."
      ],
      "expectedIdeas": [
        "segmentação",
        "VLAN",
        "ACL",
        "firewall",
        "portal",
        "logs",
        "menor privilégio"
      ],
      "explanation": "O SSID é a face visível. O isolamento real depende de segmentação, políticas e validação."
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
        "WLAN dispensa gateway e DNS, porque o access point resolve tudo"
      ],
      "answer": 2,
      "explanation": "WLAN é uma LAN sem fio: mantém a finalidade local, mas muda o meio (rádio) e os riscos. Internet depende de gateway, rota, DNS e WAN.",
      "topic": "WLAN",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.3.3",
      "question": "Uma empresa conecta sede e filial em estados diferentes por VPN sobre link de operadora. Qual tipo de rede está mais associado a esse cenário?",
      "options": [
        "WAN",
        "MAN",
        "SAN",
        "WLAN"
      ],
      "answer": 0,
      "explanation": "Ligar locais distantes, em estados diferentes, é característica de WAN, mesmo quando a ligação usa VPN. MAN se limita a uma cidade ou região metropolitana.",
      "topic": "WAN",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q1.3.4",
      "question": "Qual é um risco típico de uma LAN plana?",
      "options": [
        "Tornar a WAN mais lenta que a LAN",
        "Impedir que usuários alcancem impressoras e servidores",
        "Exigir roteamento entre todos os hosts",
        "Facilitar movimento lateral após comprometimento"
      ],
      "answer": 3,
      "explanation": "Sem barreiras internas, um host comprometido alcança os demais. A mitigação é segmentar com VLANs, ACLs e firewall interno.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q1.3.5",
      "question": "Em cloud, qual recurso representa a rede virtual do cliente, dentro da qual ficam as subnets e as rotas?",
      "options": [
        "Private endpoint",
        "VPC/VNet",
        "Security group",
        "NAT gateway"
      ],
      "answer": 1,
      "explanation": "VPC (AWS, GCP) e VNet (Azure) são a rede virtual. Private endpoint, security group e NAT gateway são recursos que ficam dentro ou na borda dela.",
      "topic": "cloud",
      "difficulty": "iniciante",
      "type": "cloud"
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
      "explanation": "Os dois põem armazenamento na rede, mas a SAN é uma rede dedicada, crítica e isolada. Tratá-la como compartilhamento de arquivos subestima criticidade e isolamento.",
      "topic": "SAN",
      "difficulty": "intermediário",
      "type": "pegadinha comum"
    },
    {
      "id": "q1.3.7",
      "question": "Um notebook está associado ao Wi-Fi corporativo e responde ao ping do gateway, mas não abre nenhum site. Qual hipótese é a mais coerente?",
      "options": [
        "A SAN do datacenter está congestionada",
        "O sinal Wi-Fi está fraco demais para navegar",
        "A PAN Bluetooth do notebook está bloqueando a internet",
        "O problema está além da WLAN: DNS, rota default, NAT, firewall ou WAN/provedor"
      ],
      "answer": 3,
      "explanation": "Se o gateway responde, a WLAN e a LAN local estão funcionando. A hipótese se desloca para o que vem depois do gateway: DNS, rota default, NAT, firewall, WAN ou provedor.",
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
      "back": "Wide Area Network: rede de longa distância, usada para conectar filiais, datacenters, internet e cloud.",
      "tags": [
        "WAN"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.5",
      "front": "O que é SAN?",
      "back": "Storage Area Network: rede especializada para conectar servidores a armazenamento crítico.",
      "tags": [
        "SAN",
        "storage"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.3.6",
      "front": "Qual pergunta ajuda a classificar um tipo de rede?",
      "back": "Qual é o alcance, a finalidade, o meio, quem controla, qual custo e qual risco?",
      "tags": [
        "arquitetura"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.7",
      "front": "CAN x MAN: qual a diferença?",
      "back": "CAN (Campus Area Network) interliga prédios de um campus sob uma organização, geralmente com backbone próprio. MAN (Metropolitan Area Network) conecta sites dentro de uma cidade e costuma depender de operadora.",
      "tags": [
        "CAN",
        "MAN"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.8",
      "front": "Wi-Fi conectado garante acesso à internet?",
      "back": "Não. A WLAN é só o acesso local por rádio; a internet depende de gateway, rota, DNS, NAT e WAN/provedor.",
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
      "prompt": "Classifique: celular conectado a relógio inteligente; notebook conectado ao Wi-Fi corporativo; sede conectada à filial; servidor conectado a storage crítico.",
      "expectedAnswer": "Celular-relógio: PAN; notebook no Wi-Fi: WLAN; sede-filial: WAN; servidor-storage crítico: SAN.",
      "explanation": "A classificação depende de alcance e finalidade."
    },
    {
      "id": "ex1.3.2",
      "type": "diagnóstico",
      "prompt": "Um usuário imprime em uma impressora local, mas não acessa um sistema na cloud. O problema está necessariamente na LAN? Explique.",
      "expectedAnswer": "Não. Se a impressora local funciona, parte da LAN/WLAN pode estar operacional. A falha pode estar em DNS, WAN, firewall, proxy, rota, autenticação ou serviço cloud.",
      "explanation": "A separação por tipo evita culpar toda a rede."
    },
    {
      "id": "ex1.3.3",
      "type": "segurança",
      "prompt": "Liste três controles para Wi-Fi de visitantes em uma empresa.",
      "expectedAnswer": "SSID separado, VLAN dedicada, firewall bloqueando rede interna, captive portal, logs, limitação de banda e rotação de credenciais.",
      "explanation": "O objetivo é impedir que visitantes acessem recursos internos."
    },
    {
      "id": "ex1.3.4",
      "type": "cloud",
      "prompt": "Dê dois exemplos de recursos cloud que representam decisões de rede.",
      "expectedAnswer": "VPC/VNet, subnets, route tables, security groups, NAT gateway, VPN, peering, private endpoints, firewall gerenciado.",
      "explanation": "Cloud oculta cabos, mas não elimina arquitetura de rede."
    }
  ],
  "challenge": {
    "title": "Planeje os tipos de rede de uma empresa pequena",
    "scenario": "Uma empresa tem uma sede com 80 usuários, Wi-Fi corporativo, Wi-Fi de visitantes, uma filial em outra cidade, alguns servidores internos, backup em cloud e um storage crítico para virtualização.",
    "tasks": [
      "Identificar quais tipos de rede aparecem no cenário.",
      "Descrever a finalidade de cada tipo.",
      "Indicar pelo menos cinco riscos.",
      "Indicar controles defensivos para cada risco.",
      "Explicar quais evidências validariam o desenho."
    ],
    "constraints": [
      "Visitantes não podem acessar rede interna.",
      "Storage crítico não pode ficar acessível a usuários comuns.",
      "Conexão com filial deve ser segura.",
      "Cloud deve preferir acesso privado quando possível."
    ],
    "expectedDeliverables": [
      "Tabela de tipos de rede",
      "Mapa textual da arquitetura",
      "Lista de riscos e mitigações",
      "Plano de evidências",
      "Resumo executivo"
    ],
    "gradingRubric": [
      {
        "criterion": "Classificação correta dos tipos",
        "points": 30,
        "description": "Identifica LAN, WLAN, WAN, SAN e cloud/híbrida com justificativa."
      },
      {
        "criterion": "Risco e mitigação",
        "points": 30,
        "description": "Aponta riscos reais e controles coerentes."
      },
      {
        "criterion": "Clareza operacional",
        "points": 20,
        "description": "Explica donos, evidências e troubleshooting."
      },
      {
        "criterion": "Integração com cloud e segurança",
        "points": 20,
        "description": "Considera VPN, private endpoints, segmentação e logs."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos o cenário por alcance e finalidade. Depois indicamos quais redes precisam de isolamento e que evidências comprovam cada parte. Por fim, relacionamos riscos e controles.",
    "steps": [
      "Classificar rede local cabeada como LAN.",
      "Classificar Wi-Fi corporativo e de visitantes como WLANs distintas.",
      "Classificar conexão com filial como WAN, possivelmente VPN ou SD-WAN.",
      "Classificar storage crítico como SAN ou rede especializada de armazenamento.",
      "Classificar cloud como rede virtual integrada por VPN, peering ou endpoint privado.",
      "Definir controles: VLANs, firewall, criptografia, logs, private endpoints e isolamento de gerenciamento."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Tudo é LAN porque está na empresa.",
        "whyItIsWrong": "A filial, cloud, Wi-Fi e storage possuem alcance, finalidade e riscos diferentes."
      },
      {
        "answer": "Criar SSID de visitantes basta para isolar.",
        "whyItIsWrong": "SSID não garante isolamento sem VLAN, firewall, política e validação."
      },
      {
        "answer": "Storage pode ficar na mesma rede dos usuários.",
        "whyItIsWrong": "Storage crítico exige isolamento e controle rigoroso para reduzir risco e preservar performance."
      }
    ],
    "finalAnswer": "Uma solução adequada usa LAN para usuários e servidores locais, WLAN corporativa separada da WLAN de visitantes, WAN/VPN para filial, rede especializada para storage, integração cloud preferencialmente privada e controles de segmentação, criptografia, logging e menor privilégio."
  },
  "glossary": [
    {
      "term": "PAN",
      "shortDefinition": "Rede pessoal de curto alcance.",
      "longDefinition": "Personal Area Network, usada para comunicação entre dispositivos próximos de uma pessoa, como celular, fone e wearable.",
      "example": "Celular conectado a um fone Bluetooth.",
      "relatedTerms": [
        "Bluetooth",
        "periférico",
        "pareamento"
      ],
      "relatedLessons": [
        "1.3",
        "12.1"
      ]
    },
    {
      "term": "LAN",
      "shortDefinition": "Rede local.",
      "longDefinition": "Local Area Network, usada para conectar dispositivos dentro de um espaço limitado como casa, escritório, laboratório ou andar.",
      "example": "Computadores ligados a switches em uma empresa.",
      "relatedTerms": [
        "Ethernet",
        "switch",
        "VLAN"
      ],
      "relatedLessons": [
        "1.3",
        "3.1"
      ]
    },
    {
      "term": "WLAN",
      "shortDefinition": "Rede local sem fio.",
      "longDefinition": "Wireless Local Area Network, normalmente implementada com Wi-Fi e access points.",
      "example": "Wi-Fi corporativo autenticado por usuário.",
      "relatedTerms": [
        "Wi-Fi",
        "SSID",
        "access point"
      ],
      "relatedLessons": [
        "1.3",
        "12.1"
      ]
    },
    {
      "term": "WAN",
      "shortDefinition": "Rede de longa distância.",
      "longDefinition": "Wide Area Network, usada para conectar locais distantes, filiais, datacenters, internet e cloud.",
      "example": "VPN entre sede e filial.",
      "relatedTerms": [
        "VPN",
        "SD-WAN",
        "operadora",
        "SLA"
      ],
      "relatedLessons": [
        "1.3",
        "10.1",
        "11.1"
      ]
    },
    {
      "term": "SAN",
      "shortDefinition": "Rede de armazenamento.",
      "longDefinition": "Storage Area Network, rede especializada que entrega armazenamento em blocos a servidores em datacenter. Não confundir com NAS, que é um serviço de arquivos na rede comum.",
      "example": "Cluster de virtualização acessando storage por rede dedicada.",
      "relatedTerms": [
        "storage",
        "iSCSI",
        "Fibre Channel",
        "multipath"
      ],
      "relatedLessons": [
        "1.3"
      ]
    },
    {
      "term": "Domínio administrativo",
      "shortDefinition": "Quem controla uma rede ou parte dela.",
      "longDefinition": "Indica se a rede é gerida pela própria organização, operadora, provedor cloud ou terceiro.",
      "example": "A LAN da empresa é interna; o link de operadora pertence a terceiro.",
      "relatedTerms": [
        "SLA",
        "responsabilidade compartilhada",
        "operadora"
      ],
      "relatedLessons": [
        "1.3",
        "14.1"
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
      "quizScoreAtLeast": 70,
      "oneOf": [
        "exerciseDone",
        "practicalExerciseDone"
      ]
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
