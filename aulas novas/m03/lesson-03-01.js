export const lesson0301 = {
  "id": "3.1",
  "moduleId": "m03",
  "order": 1,
  "title": "Ethernet: a base da rede local cabeada",
  "subtitle": "Como a tecnologia que domina as redes locais transforma bits em quadros, endereços MAC, enlaces e evidências de troubleshooting.",
  "duration": "100-140 min",
  "estimatedStudyTimeMinutes": 140,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 210,
  "tags": [
    "redes",
    "ethernet",
    "camada 2",
    "lan",
    "mac",
    "switch",
    "frame",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "reason": "Ethernet depende de bits, bytes, sinais, protocolos, métricas e pensamento em camadas."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m01",
      "reason": "O aluno precisa conhecer dispositivos, meios de transmissão, cabeamento, equipamentos e métricas de rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.4",
      "reason": "Ethernet é um dos principais assuntos práticos da Camada 2 do Modelo OSI."
    }
  ],
  "objectives": [
    "Explicar por que Ethernet existe e qual problema ela resolveu nas redes locais.",
    "Diferenciar Ethernet como tecnologia de enlace de IP, TCP, Wi-Fi e internet.",
    "Entender os elementos fundamentais: NIC, meio físico, frame, MAC, switch e domínio local.",
    "Relacionar Ethernet com troubleshooting, segurança, cloud híbrida, DevSecOps e ambientes corporativos.",
    "Preparar o aluno para frame Ethernet, endereço MAC, switches, ARP e VLANs nas próximas aulas."
  ],
  "learningOutcomes": [
    "Dado um cenário de rede local, o aluno identifica onde Ethernet aparece.",
    "Dado um sintoma de conectividade local, o aluno separa problemas físicos, enlace, IP e aplicação.",
    "Dado um fluxo entre host e gateway, o aluno descreve que o IP precisa viajar dentro de um frame Ethernet na LAN cabeada.",
    "Dado um inventário de rede, o aluno reconhece evidências básicas de Ethernet, como link, NIC, MAC, switchport, velocidade e duplex."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2><p>Um usuário está conectado por cabo ao switch da sala. O notebook mostra ícone de rede, mas ele não acessa o sistema interno, enquanto o colega ao lado funciona normalmente. O chamado chega como “sem internet”, mas a causa pode estar no cabo, na placa de rede, na porta do switch, na negociação de velocidade, na VLAN, na tabela MAC, no ARP, no gateway, no DNS ou na aplicação.</p><p>Boa parte dessa lista é Ethernet. Antes de investigar IP, roteamento, firewall ou DNS, você precisa saber como dois equipamentos da mesma LAN trocam quadros usando endereços de camada 2.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> em uma empresa, trocar o cabo de uma porta para outra pode colocar o usuário na VLAN errada, derrubar a autenticação 802.1X, quebrar o acesso a impressoras, mudar as políticas de firewall aplicadas e gerar alerta no NAC. Para entender esse efeito, você precisa saber o que Ethernet faz e o que ela não faz.</div></section>\n",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>História e evolução</h2><p>Ethernet surgiu para que computadores próximos compartilhassem um meio local de forma padronizada, no lugar de soluções proprietárias. Nas primeiras versões, vários dispositivos disputavam o mesmo canal, daí os conceitos de colisão, domínio de colisão e detecção de colisão. Switches e links full-duplex eliminaram esse limite, e por isso a Ethernet moderna gira em torno de switches e tabelas MAC.</p><table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead><tbody><tr><td>Ethernet em meio compartilhado</td><td>Vários hosts disputavam o mesmo meio.</td><td>Colisões, baixa escalabilidade e desempenho limitado.</td><td>Uso crescente de bridges e switches.</td></tr><tr><td>Hub</td><td>Repetia sinais para todas as portas.</td><td>Todos compartilhavam o mesmo domínio de colisão.</td><td>Switch com aprendizado de MAC.</td></tr><tr><td>Switch Ethernet</td><td>Encaminha frames com base em tabela MAC.</td><td>Exige controle contra loops e boa segmentação.</td><td>VLANs, STP, trunks e redes comutadas modernas.</td></tr><tr><td>Ethernet em datacenter</td><td>Alta velocidade em switches top-of-rack, agregação e spine-leaf.</td><td>Mais complexidade operacional e risco de impacto amplo.</td><td>Automação, observabilidade, EVPN/VXLAN e políticas de rede.</td></tr></tbody></table></section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2><p>Ethernet resolve a comunicação local entre dispositivos ligados à mesma rede de enlace. Os dados de um computador precisam atravessar uma interface física, seguir um formato de quadro, indicar origem e destino locais e chegar ao próximo equipamento. Se faltar uma dessas peças:</p><ul class=\"flow-list\"><li><strong>Sem padronização:</strong> cada fabricante usaria um formato próprio de transmissão local.</li><li><strong>Sem endereço de enlace:</strong> o switch não saberia para qual porta encaminhar o tráfego.</li><li><strong>Sem quadro:</strong> os bits no fio não teriam começo, fim, origem, destino e verificação de erro.</li></ul><p>Ethernet <strong>não</strong> substitui o IP, não roteia entre redes, não autentica usuários, não criptografa o tráfego e não decide autorização de aplicação. Também não resolve problemas de DNS, TLS ou HTTP. Ela só transporta quadros entre interfaces dentro de um domínio de camada 2.</p></section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2><div class=\"definition-box\"><strong>Definição:</strong> Ethernet (IEEE 802.3) é uma família de tecnologias de LAN que permite a troca de quadros (frames) entre interfaces de rede usando endereços MAC. Ela define a parte física e a de enlace: meios, velocidades, endereçamento MAC, formato do frame e regras da comunicação local.</div><p>Seu computador cabeado não põe “um pacote IP puro” no cabo: ele encapsula o pacote IP num frame Ethernet com MAC de origem, MAC de destino e outros campos, e o switch lê o frame para decidir a porta de saída. O frame vale só até o próximo equipamento de camada 3. O roteador descarta o frame e monta outro, com novos MACs, para o trecho seguinte; os IPs do pacote continuam os mesmos (exceto se houver NAT).</p><h3>Ethernet não é Wi-Fi, IP, TCP nem internet</h3><div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Tecnologia</th><th>Camada</th><th>O que faz</th><th>Identifica por</th></tr></thead><tbody><tr><td>Ethernet (IEEE 802.3)</td><td>1 e 2</td><td>Entrega frames entre interfaces da mesma LAN cabeada.</td><td>MAC</td></tr><tr><td>Wi-Fi (IEEE 802.11)</td><td>1 e 2</td><td>O mesmo papel de enlace, pelo ar; o access point repassa os quadros para a Ethernet cabeada.</td><td>MAC</td></tr><tr><td>IP</td><td>3</td><td>Endereço lógico de origem e destino; roteamento entre redes.</td><td>Endereço IP</td></tr><tr><td>TCP</td><td>4</td><td>Entrega confiável entre aplicações nas pontas, com retransmissão.</td><td>Porta</td></tr><tr><td>Internet</td><td>—</td><td>Muitas redes interligadas por IP; cada trecho local usa Ethernet, Wi-Fi ou outro enlace.</td><td>—</td></tr></tbody></table></div><div class=\"callout warning\"><strong>Erros comuns:</strong><ul><li><strong>Confundir Ethernet com internet:</strong> leva a tratar um problema local como falha do provedor.</li><li><strong>Usar o MAC como identidade:</strong> ele pode ser alterado em software; correlacione com NAC, autenticação, inventário e logs.</li><li><strong>Trocar o cabo de porta sem olhar a VLAN:</strong> a porta parece igual, mas o host cai em outro segmento. Confira o switchport (access/trunk) e a documentação.</li><li><strong>Culpar o DNS primeiro:</strong> siga a ordem link → IP local → gateway → DNS → transporte → aplicação.</li></ul></div></section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2><p>Cada etapa de um envio na LAN cabeada tem uma falha típica:</p><div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>#</th><th>Quem</th><th>O que acontece</th><th>O que pode falhar</th></tr></thead><tbody><tr><td>1</td><td>Host</td><td>Os dados descem pela pilha; o IP define origem e destino lógicos.</td><td>Interface desabilitada ou sem link físico.</td></tr><tr><td>2</td><td>Host</td><td>Escolhe o MAC de destino local: o do host na mesma rede ou o do gateway (em IPv4, descoberto via ARP).</td><td>ARP sem resposta, cache incorreto ou destino fora do domínio esperado.</td></tr><tr><td>3</td><td>NIC</td><td>Monta o frame e o transmite como sinais: eletricidade no cobre, luz na fibra.</td><td>Cabo ruim, velocidade/duplex mal negociados ou erro físico.</td></tr><tr><td>4</td><td>Switch</td><td>Aprende o MAC de origem na porta de entrada (a entrada expira após um tempo) e procura o MAC de destino na tabela: se achar, encaminha só para aquela porta; se não, faz flooding para as outras portas do mesmo domínio de broadcast (VLAN).</td><td>Tabela instável, VLAN errada, loop ou flooding excessivo.</td></tr><tr><td>5</td><td>Destino</td><td>Confere o FCS e entrega o conteúdo à camada superior. Se for o gateway, ele processa o pacote IP e escolhe o próximo salto.</td><td>Gateway indisponível, porta bloqueada ou política impedindo o tráfego.</td></tr></tbody></table></div><p>Por isso IP e DNS podem estar certos e a comunicação local falhar mesmo assim.</p><h3>Campos principais do frame</h3><div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>Tamanho</th><th>Função</th><th>Na análise</th></tr></thead><tbody><tr><td>MAC de destino</td><td>48 bits</td><td>Destino local do frame.</td><td>Gateway, host local, broadcast ou multicast.</td></tr><tr><td>MAC de origem</td><td>48 bits</td><td>Interface que gerou o frame no enlace.</td><td>Pode ser alterado em software: não é identidade forte.</td></tr><tr><td>EtherType</td><td>16 bits</td><td>Protocolo encapsulado (IPv4, IPv6, ARP…).</td><td>Base de filtros de captura.</td></tr><tr><td>FCS</td><td>32 bits</td><td>Verificação de erro do frame.</td><td>Falhas físicas viram erros CRC/FCS no switch.</td></tr></tbody></table></div></section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2><p>Ethernet aparece na borda de acesso, nos uplinks entre switches, nos links de servidores, firewalls, access points e appliances e no datacenter, e sustenta VLANs, Wi-Fi corporativo, telefonia IP, câmeras e impressoras.</p><ul class=\"flow-list\"><li><strong>Camadas:</strong> principalmente Camada 2, com componentes de Camada 1.</li><li><strong>Componentes:</strong> NIC, cabo, transceptor, switch, patch panel, porta access, trunk e VLAN.</li><li><strong>Dependências:</strong> meio físico funcional, negociação correta, domínio de broadcast, tabela MAC e, muitas vezes, ARP.</li><li><strong>Pontos de falha:</strong> cabo, conector, porta, velocidade/duplex, VLAN errada, loop, STP, tabela MAC instável e segurança de porta.</li><li><strong>Pontos de segurança:</strong> acesso físico, portas não utilizadas, autenticação de rede, segmentação, monitoramento de MAC e proteção contra abusos de camada 2.</li><li><strong>Operação:</strong> exige documentar portas, VLANs, racks e patch panels; mudar porta ou VLAN afeta operação e segurança.</li></ul></section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2><p>Pense em Ethernet como a entrega interna de correspondência em um prédio. O endereço IP é o endereço do destinatário no mundo maior, mas, dentro do prédio, o entregador precisa saber em qual sala deixar o envelope. O MAC é essa identificação local da interface, e o switch é uma portaria que aprende onde cada sala está ligada.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> ao contrário de uma sala, o MAC pode ser alterado em software e o switch reaprende a posição dele dinamicamente.</div></section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2><p>Em casa, seu computador ligado por cabo ao roteador usa Ethernet no trecho local. Para acessar um site, ele envia frames Ethernet para o MAC da interface LAN do roteador (o gateway padrão). O roteador retira o frame, processa o pacote IP e o encaminha para outra rede.</p><p>Se o cabo estiver ruim, a porta negociar 100 Mbps em vez de 1 Gbps, o link ficar caindo ou o adaptador estiver desabilitado, o problema acontece antes de DNS ou HTTP entrarem em cena. Por isso uma investigação básica começa por link, interface, velocidade, gateway e evidências locais.</p></section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2><p>Em uma empresa, uma estação de trabalho normalmente se conecta a uma tomada de rede, que vai para um patch panel e depois para uma porta de switch de acesso. Essa porta pode estar em uma VLAN específica, com autenticação 802.1X, controle de MAC, PoE para telefone IP ou políticas de segurança.</p><p>Um erro simples, como patch cord no ponto errado, porta configurada na VLAN errada ou documentação desatualizada, pode fazer o usuário receber IP incorreto, não alcançar o gateway ou aparecer em segmento não autorizado. Para o SOC, a mesma camada gera evidências: MAC de origem, porta do switch, VLAN, horário de conexão, alterações de link e possíveis anomalias.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud</h2><p>Em cloud pública, o provedor abstrai switches, cabos e boa parte da camada 2: você trabalha com NIC virtual (que ainda tem MAC), subnet, route table e security group. Em ambientes híbridos, a Ethernet volta a aparecer de forma explícita: links dedicados, cross-connects, appliances e firewalls físicos, portas trunk e o handoff para o circuito do provedor. Uma VLAN errada nesse handoff derruba a conexão híbrida mesmo com rotas e políticas corretas na cloud.</p></section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>Exemplo em DevSecOps</h2><p>Um pipeline pode falhar ao baixar uma imagem de container não porque o Docker esteja errado, mas porque o runner self-hosted está numa VLAN incorreta, numa porta bloqueada ou num caminho físico instável. Além disso, bridges Linux, veth pairs e CNIs reproduzem comportamentos de camada 2 em software: é por isso que containers têm interfaces, MACs virtuais, bridges e regras de encaminhamento local.</p></section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama</h2><svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m03l01-title m03l01-desc\"><title id=\"m03l01-title\">Ethernet na rede local cabeada</title><desc id=\"m03l01-desc\">Host envia um frame Ethernet para o switch, que aprende o MAC de origem e encaminha para o gateway ou servidor local.</desc><defs><marker id=\"m03l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs><rect x=\"40\" y=\"110\" width=\"160\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\"/><text x=\"120\" y=\"143\" text-anchor=\"middle\" class=\"svg-label\">Host</text><text x=\"120\" y=\"168\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC origem</text><rect x=\"285\" y=\"110\" width=\"180\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--switch\"/><text x=\"375\" y=\"143\" text-anchor=\"middle\" class=\"svg-label\">Switch</text><text x=\"375\" y=\"168\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela MAC</text><rect x=\"565\" y=\"70\" width=\"170\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--router\"/><text x=\"650\" y=\"103\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"650\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Próximo salto</text><rect x=\"565\" y=\"205\" width=\"170\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--server\"/><text x=\"650\" y=\"238\" text-anchor=\"middle\" class=\"svg-label\">Servidor local</text><text x=\"650\" y=\"263\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Mesmo domínio</text><rect x=\"790\" y=\"125\" width=\"150\" height=\"88\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"865\" y=\"158\" text-anchor=\"middle\" class=\"svg-label\">Controles</text><text x=\"865\" y=\"183\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN / NAC</text><line x1=\"200\" y1=\"151\" x2=\"285\" y2=\"151\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l01-arrow)\"/><line x1=\"465\" y1=\"140\" x2=\"565\" y2=\"112\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l01-arrow)\"/><line x1=\"465\" y1=\"165\" x2=\"565\" y2=\"246\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l01-arrow)\"/><line x1=\"735\" y1=\"151\" x2=\"790\" y2=\"169\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m03l01-arrow)\"/><rect x=\"80\" y=\"350\" width=\"820\" height=\"92\" rx=\"16\" class=\"svg-zone\"/><text x=\"490\" y=\"382\" text-anchor=\"middle\" class=\"svg-label\">Frame Ethernet</text><text x=\"490\" y=\"412\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC destino | MAC origem | EtherType | Dados encapsulados | FCS</text></svg><p>Na LAN cabeada, o host transmite frames Ethernet. O switch aprende o MAC de origem, encaminha o frame para o gateway ou para o servidor local e participa de controles como VLAN, autenticação (NAC) e segmentação.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2><ul><li><strong>Ideia central:</strong> Ethernet é o envelope local da LAN cabeada: entrega frames entre interfaces próximas usando MACs e switches; o IP cuida do endereçamento entre redes.</li><li><strong>Como funciona:</strong> o host põe o pacote IP num frame; o switch aprende MACs por porta e encaminha, ou faz flooding se não conhece o destino.</li><li><strong>Erro comum:</strong> confundir Ethernet com internet, IP ou Wi-Fi e culpar o DNS antes de checar link e gateway.</li><li><strong>Diagnóstico:</strong> Camada 1 (link, velocidade, duplex, CRC) → Camada 2 (MAC, VLAN, ARP) → Camada 3 (IP, gateway).</li><li><strong>Segurança:</strong> MAC não é identidade forte; portas, VLANs, NAC/802.1X, inventário e monitoramento são a base.</li></ul></section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2><p>Na próxima aula, vamos abrir o frame Ethernet e estudar seus campos principais: MAC de destino, MAC de origem, EtherType, dados e FCS. Isso prepara o caminho para entender switches, ARP, VLANs e análise de tráfego em Wireshark.</p></section>"
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
      "IPv4",
      "IPv6",
      "VLAN",
      "STP"
    ],
    "dependsOn": [
      "Modelo OSI",
      "Meios de transmissão",
      "Cabeamento",
      "Equipamentos de rede"
    ],
    "enables": [
      "Frame Ethernet",
      "Endereço MAC",
      "Switching",
      "ARP",
      "VLAN",
      "Segurança de camada 2"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Ícone de cabo desconectado",
      "Link negociado em velocidade baixa",
      "Gateway não responde",
      "MAC não aparece na tabela do switch",
      "Rede intermitente",
      "CRC errors no switch",
      "Usuário em VLAN errada"
    ],
    "diagnosticQuestions": [
      "A interface está ativa?",
      "Há link físico?",
      "Qual é o MAC da interface?",
      "A porta do switch aprende o MAC correto?",
      "A VLAN da porta está correta?",
      "O gateway está no mesmo domínio esperado?",
      "Há erros físicos ou flaps?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetAdapter | Format-Table Name, Status, LinkSpeed, FullDuplex, MacAddress\nipconfig /all\narp -a",
        "purpose": "Ver adaptador, link, velocidade, duplex, MAC, IP, gateway e vizinhança ARP.",
        "expectedObservation": "Adaptador Up, velocidade coerente, MAC presente e gateway configurado.",
        "interpretation": "Se o adaptador está Down ou sem gateway, investigar Camada 1/2 antes de DNS ou HTTP."
      },
      {
        "platform": "Linux",
        "command": "ip link\nip addr\nip route\nip neigh\nethtool <interface>",
        "purpose": "Ver estado da interface, MAC, IP, rota default e vizinhos; o ethtool (se instalado) mostra velocidade e duplex.",
        "expectedObservation": "Interface UP/LOWER_UP, endereço IP, rota default, vizinho para o gateway e Speed/Duplex coerentes com a porta.",
        "interpretation": "Sem LOWER_UP: possível problema físico. Sem vizinho: problema local ou ARP não resolvido. Velocidade baixa ou half-duplex: cabo, porta ou negociação."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status\nshow mac address-table\nshow vlan brief\nshow interfaces counters errors",
        "purpose": "Ver portas, VLAN, MACs aprendidos e erros físicos/de enlace.",
        "expectedObservation": "Porta connected, velocidade e duplex esperados, VLAN correta, MAC aprendido e poucos erros.",
        "interpretation": "CRC, flaps ou VLAN incorreta indicam investigação de camada física/enlace."
      }
    ],
    "decisionTree": [
      {
        "if": "Interface sem link",
        "then": "Verificar cabo, porta, NIC, patch panel, switchport e energia do equipamento."
      },
      {
        "if": "Link ativo, mas sem IP ou sem gateway",
        "then": "Verificar DHCP, configuração manual, VLAN da porta e autenticação 802.1X/NAC."
      },
      {
        "if": "Gateway configurado, mas ARP não resolve ou o gateway não responde",
        "then": "Comparar IP e máscara (o gateway está na mesma sub-rede?), VLAN, tabela ARP/neigh e firewall local."
      },
      {
        "if": "MAC aparece em porta inesperada",
        "then": "Verificar documentação, patching, movimentação física, spoofing ou loop."
      },
      {
        "if": "Erros CRC ou flaps",
        "then": "Investigar cabo, conector, transceptor, interferência, porta ou negociação; substituir o componente e documentar a mudança."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar portas, VLANs e patch panels e aplicar descrição nos switchports.",
      "Proteger racks, switches e tomadas em áreas públicas.",
      "Monitorar mudanças de MAC e eventos de link.",
      "Registrar mudanças físicas (troca de porta, patch cord, equipamento)."
    ],
    "badPractices": [
      "Usar rede plana para todos os ativos.",
      "Confiar apenas no MAC como identidade.",
      "Ignorar erros CRC e flaps recorrentes."
    ],
    "commonErrors": [
      "Tratar VLAN como firewall absoluto.",
      "Achar que cabo funcionando significa rede segura ou acesso autorizado à aplicação.",
      "Não sanitizar MACs e topologia em relatórios compartilhados."
    ],
    "vulnerabilities": [
      {
        "name": "Acesso físico indevido",
        "description": "Portas de rede acessíveis podem permitir conexão de dispositivos não autorizados.",
        "defensiveExplanation": "O risco está na entrada não controlada na camada de acesso.",
        "mitigation": "Controle físico, portas desativadas, 802.1X/NAC, inventário e alertas."
      },
      {
        "name": "MAC spoofing",
        "description": "Um dispositivo pode alterar o MAC apresentado à rede.",
        "defensiveExplanation": "MAC não deve ser tratado como identidade forte isolada.",
        "mitigation": "Autenticação forte, NAC, correlação de logs e políticas por identidade."
      },
      {
        "name": "Rede plana",
        "description": "Muitos ativos no mesmo domínio aumentam alcance lateral.",
        "defensiveExplanation": "A ausência de segmentação amplia impacto de comprometimentos.",
        "mitigation": "VLANs, firewalls internos, menor privilégio, logs e revisão periódica."
      },
      {
        "name": "Loop de camada 2",
        "description": "Um cabo ligando duas portas da mesma rede faz broadcasts circularem sem fim (broadcast storm), com CPU alta nos switches e rede instável.",
        "defensiveExplanation": "O frame Ethernet não tem contador de saltos; sem proteção, um único loop derruba a rede inteira.",
        "mitigation": "STP, BPDU Guard nas portas de acesso, desenho correto e controle de mudanças."
      }
    ],
    "monitoring": [
      "Eventos de link up/down",
      "MAC aprendido em porta nova",
      "Alteração de VLAN",
      "CRC errors",
      "Port security violations",
      "Autenticação 802.1X/NAC",
      "Mudanças de configuração de switch"
    ],
    "hardening": [
      "Desativar portas não usadas",
      "Separar VLANs por função, com firewall interno entre segmentos",
      "Aplicar NAC/802.1X",
      "Usar BPDU Guard quando aplicável",
      "Controlar trunks",
      "Restringir acesso administrativo ao switch"
    ],
    "detectionIdeas": [
      "Alertar MAC desconhecido em porta sensível",
      "Monitorar aumento de broadcast (sinal de loop)",
      "Comparar documentação e inventário com o estado real do switch"
    ]
  },
  "lab": {
    "id": "lab-3.1",
    "title": "Identificando evidências básicas de Ethernet na rede local",
    "labType": "security",
    "objective": "Coletar e interpretar evidências defensivas de Ethernet no próprio computador e, quando houver acesso autorizado, em switch gerenciável.",
    "scenario": "Você está investigando se um host conectado à rede local possui link, interface, MAC, gateway e evidências básicas de camada 2 coerentes.",
    "topology": "Host do aluno -> cabo ou adaptador de rede -> switch/roteador local -> gateway",
    "architecture": "Rede local simples com host final, interface Ethernet ou Wi-Fi equivalente para comparação, gateway e possível switch de acesso.",
    "prerequisites": [
      "Computador próprio com Windows ou Linux.",
      "Para o passo 5: Packet Tracer ou switch com acesso autorizado."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Opcional: acesso autorizado a switch Cisco ou Packet Tracer",
      "Opcional: Wireshark apenas para observação local autorizada"
    ],
    "estimatedTimeMinutes": 40,
    "cost": "zero",
    "safetyNotes": [
      "Observe apenas: não conecte dispositivos em portas corporativas nem altere MAC, VLAN ou switch em ambiente real sem autorização.",
      "Sanitize MACs, IPs públicos, nomes de host e topologia antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar interfaces locais",
        "instruction": "Liste interfaces de rede e observe nome, estado, MAC e velocidade quando disponível.",
        "command": "Windows:\nGet-NetAdapter | Format-Table Name, Status, LinkSpeed, FullDuplex, MacAddress\n\nLinux:\nip link\nethtool <interface>   # velocidade e duplex, se instalado",
        "expectedOutput": "Interface ativa, MAC local e velocidade/duplex quando o sistema informar.",
        "explanation": "A interface é a porta lógica/física pela qual Ethernet aparece no host."
      },
      {
        "number": 2,
        "title": "Ver configuração IP associada",
        "instruction": "Colete IP, máscara, gateway e DNS para não confundir Camada 2 com Camada 3.",
        "command": "Windows:\nipconfig /all\n\nLinux:\nip addr && ip route",
        "expectedOutput": "Endereço IP, rota default/gateway e interface associada.",
        "explanation": "Ethernet transporta quadros, mas IP e gateway indicam como o host sai da rede local."
      },
      {
        "number": 3,
        "title": "Observar vizinhança local",
        "instruction": "Verifique se há associação local entre IP e MAC, especialmente para o gateway.",
        "command": "Windows:\narp -a\n\nLinux:\nip neigh",
        "expectedOutput": "Entradas com IPs locais associados a endereços MAC.",
        "explanation": "Em IPv4, ARP ajuda o host a descobrir o MAC do próximo salto local."
      },
      {
        "number": 4,
        "title": "Testar gateway com cuidado",
        "instruction": "Teste apenas o gateway configurado, sem varrer a rede.",
        "command": "Windows:\nping <IP_DO_GATEWAY>\n\nLinux:\nping -c 4 <IP_DO_GATEWAY>",
        "expectedOutput": "Respostas do gateway ou bloqueio controlado por política.",
        "explanation": "Se o gateway não responde, investigue link, VLAN, IP, máscara, ARP e política local."
      },
      {
        "number": 5,
        "title": "Opcional autorizado: verificar switch",
        "instruction": "Em laboratório, Packet Tracer ou switch autorizado, observe porta, VLAN, MAC e erros.",
        "command": "Cisco IOS:\nshow interfaces status\nshow mac address-table\nshow vlan brief\nshow interfaces counters errors",
        "expectedOutput": "Porta connected, VLAN esperada, MAC aprendido e contadores coerentes.",
        "explanation": "O switch é a melhor fonte para confirmar se o MAC do host foi aprendido na porta correta."
      },
      {
        "number": 6,
        "title": "Montar interpretação por camada",
        "instruction": "Monte uma tabela com uma linha por camada: Camada 1 (estado do link, velocidade, duplex), Camada 2 (MAC local, MAC do gateway na tabela ARP/neigh, porta/VLAN se tiver o switch) e Camada 3 (IP, máscara, gateway, resposta do ping). Em cada linha, anote a evidência e a sua interpretação.",
        "expectedOutput": "Matriz com link/interface, MAC/vizinhança e IP/gateway.",
        "explanation": "A matriz evita pular direto para DNS ou aplicação sem validar Ethernet."
      }
    ],
    "expectedResult": "Interface, MAC, estado do link, IP, gateway e vizinhança ARP identificados e, se autorizado, porta/VLAN/MAC no switch.",
    "validation": [
      {
        "check": "Interface ativa",
        "expected": "Status Up/connected ou equivalente.",
        "ifFails": "Verificar cabo, adaptador, porta física, Wi-Fi desativado ou driver."
      },
      {
        "check": "Gateway configurado",
        "expected": "Gateway/default route presente.",
        "ifFails": "Verificar DHCP, configuração manual, VLAN e serviço de rede."
      },
      {
        "check": "Vizinho para gateway",
        "expected": "IP do gateway associado a MAC.",
        "ifFails": "Gerar tráfego para o gateway e verificar link/VLAN/ARP."
      },
      {
        "check": "Switch aprende MAC correto",
        "expected": "MAC do host na porta esperada.",
        "ifFails": "Verificar patching, VLAN, porta, segurança de porta e documentação."
      }
    ],
    "improvements": [
      "Capturar o ARP para o gateway no Wireshark, em ambiente próprio.",
      "Repetir os passos 1 a 3 no Wi-Fi e comparar as evidências com as da interface cabeada."
    ],
    "evidenceToCollect": [
      "Nome da interface",
      "MAC local sanitizado",
      "Estado do link",
      "Velocidade negociada quando disponível",
      "IP/máscara/gateway",
      "Entrada ARP/neigh do gateway",
      "Se autorizado, porta/VLAN/MAC no switch",
      "Interpretação por camada"
    ],
    "questions": [
      "Por que MAC não substitui IP?",
      "Por que link ativo não garante acesso à aplicação?",
      "Por que uma VLAN errada pode parecer problema de DHCP?"
    ],
    "challenge": "Monte um relatório sanitizado explicando se seu host tem evidências suficientes de Ethernet funcional e quais testes faltariam para provar conectividade completa até uma aplicação.",
    "solution": "Uma boa solução separa evidências por camada: Camada 1 com interface/link, Camada 2 com MAC/vizinho/switch, Camada 3 com IP/gateway, Camada 4 com porta e camadas superiores com TLS/HTTP/autenticação. Não declare aplicação funcional apenas porque Ethernet está ativa."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Num caminho até a internet, por que o MAC de destino muda a cada roteador, mas o IP de destino não?",
      "hints": [
        "Pense em até onde vale um frame Ethernet.",
        "Pense no que o roteador faz com o frame que recebe."
      ],
      "expectedIdeas": [
        "frame vale só no enlace local",
        "roteador descarta o frame e monta outro",
        "MAC do próximo salto",
        "IP é endereço lógico fim a fim",
        "exceção: NAT"
      ],
      "explanation": "O frame só vale até o próximo equipamento de camada 3: cada roteador o descarta, decide pelo IP e monta um frame novo. Por isso Ethernet não é internet."
    },
    {
      "type": "diagnóstico",
      "question": "Um host tem cabo conectado, mas não recebe IP. Quais hipóteses de camada 2 você verificaria antes de culpar DNS?",
      "hints": [
        "Pense em VLAN.",
        "Pense em switchport e autenticação."
      ],
      "expectedIdeas": [
        "VLAN errada",
        "porta bloqueada",
        "802.1X",
        "switchport",
        "link",
        "DHCP em outra camada"
      ],
      "explanation": "Sem IP, DNS ainda nem entrou no diagnóstico. Link, VLAN, switchport e acesso ao DHCP precisam ser verificados."
    },
    {
      "type": "cenário real",
      "question": "Por que uma empresa não deve deixar tomadas de rede ativas em salas públicas?",
      "hints": [
        "Pense em acesso físico.",
        "Pense em NAC e segmentação."
      ],
      "expectedIdeas": [
        "dispositivo não autorizado",
        "acesso à LAN",
        "NAC",
        "802.1X",
        "portas desativadas",
        "risco"
      ],
      "explanation": "Porta ativa exposta pode permitir conexão indevida à rede local. Controles físicos e lógicos reduzem esse risco."
    }
  ],
  "quiz": [
    {
      "id": "q3.1.1",
      "question": "Qual é a melhor descrição de Ethernet?",
      "options": [
        "Protocolo de tradução de nomes em IPs",
        "Tecnologia de LAN que troca frames usando endereços MAC",
        "Sistema de autenticação de usuários web",
        "Protocolo de roteamento entre provedores"
      ],
      "answer": 1,
      "explanation": "Ethernet atua principalmente na comunicação local de camada 2 usando frames e endereços MAC.",
      "topic": "ethernet",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q3.1.2",
      "question": "Qual afirmação diferencia corretamente MAC e IP?",
      "options": [
        "IP só existe em redes Wi-Fi",
        "MAC substitui IP em redes modernas",
        "MAC é endereço local de enlace; IP é endereço lógico de rede",
        "MAC é sempre identidade forte de usuário"
      ],
      "answer": 2,
      "explanation": "MAC é usado no enlace local; IP identifica logicamente origem/destino em camada de rede.",
      "topic": "mac-ip",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q3.1.3",
      "question": "Um host cabeado mostra interface desconectada. Qual camada deve ser investigada primeiro?",
      "options": [
        "Camada 1: cabo, porta, NIC",
        "Camada 3: IP e gateway",
        "Camada 7: DNS e aplicação",
        "Camada 4: portas TCP"
      ],
      "answer": 0,
      "explanation": "Interface desconectada aponta inicialmente para meio físico, porta, cabo, NIC ou switch.",
      "topic": "troubleshooting",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q3.1.4",
      "question": "Por que MAC não deve ser usado sozinho como controle forte de identidade?",
      "options": [
        "Porque MAC impede ARP automaticamente",
        "Porque MAC só existe em servidores cloud",
        "Porque MAC criptografa o tráfego",
        "Porque pode ser alterado ou falsificado em muitos sistemas"
      ],
      "answer": 3,
      "explanation": "MAC pode ser alterado em software; controles fortes exigem autenticação, NAC, logs e correlação.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q3.1.5",
      "question": "Em uma LAN cabeada com switch, o switch encaminha frames principalmente com base em quê?",
      "options": [
        "Tabela ARP",
        "Tabela MAC",
        "Tabela de rotas",
        "EtherType do frame"
      ],
      "answer": 1,
      "explanation": "O switch aprende MACs por porta e encaminha pela tabela MAC. A tabela ARP (IP→MAC) fica nos hosts e roteadores; a tabela de rotas é decisão de Camada 3.",
      "topic": "switching",
      "difficulty": "iniciante",
      "type": "arquitetura"
    },
    {
      "id": "q3.1.7",
      "type": "diagnóstico",
      "question": "Seu notebook cabeado envia um pacote para um servidor na internet. Qual MAC de destino vai no frame que sai do notebook?",
      "options": [
        "O MAC de broadcast, sempre",
        "O MAC do servidor na internet",
        "O MAC da interface LAN do gateway padrão",
        "O MAC do servidor DNS configurado"
      ],
      "answer": 2,
      "explanation": "O servidor está em outra rede, então o frame vai para o MAC do gateway (descoberto via ARP em IPv4); o IP de destino continua sendo o do servidor.",
      "topic": "encapsulamento",
      "difficulty": "intermediário"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.1.1",
      "front": "O que é Ethernet?",
      "back": "Uma família de tecnologias de LAN que permite comunicação local por frames e endereços MAC.",
      "tags": [
        "ethernet",
        "lan"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.1.2",
      "front": "Qual PDU é associada à Camada 2?",
      "back": "Frame ou quadro.",
      "tags": [
        "osi",
        "pdu"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.1.7",
      "front": "O que o switch faz com um frame cujo MAC de destino não está na tabela?",
      "back": "Faz flooding: envia o frame para as outras portas do mesmo domínio de broadcast (VLAN), e aprende a porta do destino quando ele responder.",
      "tags": [
        "switch",
        "flooding"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.1.4",
      "front": "Ethernet roteia entre redes?",
      "back": "Não. Roteamento entre redes é função de Camada 3, usando IP e roteadores/gateways.",
      "tags": [
        "ethernet",
        "ip"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.1.8",
      "front": "Qual padrão IEEE define a Ethernet e qual define o Wi-Fi?",
      "back": "Ethernet: IEEE 802.3. Wi-Fi: IEEE 802.11. Os dois são tecnologias de enlace que usam endereços MAC.",
      "tags": [
        "ethernet",
        "wi-fi"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.1.6",
      "front": "O que o EtherType indica?",
      "back": "Qual protocolo de camada superior está encapsulado no frame Ethernet, como IPv4, IPv6 ou ARP.",
      "tags": [
        "frame",
        "ethertype"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.1.4",
      "type": "arquitetura",
      "prompt": "Desenhe uma topologia simples host -> switch -> gateway e indique onde aparecem MAC, frame, IP e rota default.",
      "expectedAnswer": "MAC e frame aparecem no enlace host-switch-gateway; IP e rota default aparecem na decisão de camada 3 para sair da rede local.",
      "explanation": "O objetivo é separar camada 2 e camada 3 no mesmo fluxo."
    },
    {
      "id": "ex3.1.5",
      "type": "diagnóstico",
      "prompt": "Usuários reclamam de lentidão. O notebook, ligado a um switch gigabit, mostra no Get-NetAdapter Status Up e LinkSpeed 100 Mbps. Qual camada você investiga primeiro e com quais evidências?",
      "expectedAnswer": "Camada 1: cabo ou conector danificado, cabo de categoria inadequada, ou porta/NIC com velocidade fixa ou negociação ruim. Evidências: velocidade e duplex no host e na porta (show interfaces status), erros CRC (show interfaces counters errors) e teste com outro cabo, em ambiente autorizado.",
      "explanation": "Link ativo não é link saudável: velocidade abaixo do esperado aponta para a camada física antes de IP, DNS ou aplicação."
    },
    {
      "id": "ex3.1.6",
      "type": "diagnóstico",
      "prompt": "O show mac address-table mostra o MAC do notebook de um usuário na porta Gi1/0/12, mas a documentação diz Gi1/0/5. Quais hipóteses você levanta e o que verifica?",
      "expectedAnswer": "Hipóteses: patch cord em outro ponto, usuário que mudou de mesa, documentação desatualizada, MAC clonado por outro dispositivo ou loop (MAC alternando entre portas). Verificar patch panel, se o MAC aparece em mais de uma porta, eventos de link e logs de NAC/802.1X.",
      "explanation": "A tabela MAC mostra onde o switch viu o MAC por último; não prova identidade."
    }
  ],
  "challenge": {
    "title": "Diagnóstico inicial de falha em host cabeado",
    "scenario": "Um usuário conectado por cabo à rede corporativa não acessa o sistema interno. Outros usuários funcionam. Você não tem autorização para alterar switch, apenas coletar evidências e orientar a equipe responsável.",
    "tasks": [
      "Separar hipóteses de Camada 1, 2 e 3.",
      "Listar comandos seguros no host.",
      "Indicar evidências a pedir ao time de redes no switch.",
      "Apontar riscos de segurança relacionados.",
      "Produzir conclusão provisória sem afirmar além das evidências."
    ],
    "constraints": [
      "Não executar varredura na rede.",
      "Não alterar MAC, IP, VLAN ou switchport.",
      "Sanitizar dados sensíveis.",
      "Usar somente ambiente autorizado."
    ],
    "expectedDeliverables": [
      "Matriz de hipóteses por camada",
      "Lista de comandos",
      "Lista de evidências de switch",
      "Riscos e mitigações",
      "Conclusão técnica provisória"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta de camadas",
        "points": 25,
        "description": "Distingue físico, enlace e rede."
      },
      {
        "criterion": "Evidências adequadas",
        "points": 25,
        "description": "Usa comandos e logs apropriados sem ações invasivas."
      },
      {
        "criterion": "Segurança e ética",
        "points": 20,
        "description": "Respeita autorização, sanitização e limites do laboratório."
      },
      {
        "criterion": "Raciocínio técnico",
        "points": 20,
        "description": "Não pula para DNS/aplicação sem validar base local."
      },
      {
        "criterion": "Clareza do relatório",
        "points": 10,
        "description": "Entrega conclusão objetiva e acionável."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos o sintoma em camadas. Se o host é cabeado e outros funcionam, hipóteses locais ganham força: cabo, porta, NIC, VLAN, autenticação, DHCP ou configuração local. DNS e aplicação só devem ser investigados depois de confirmar IP, gateway e transporte.",
    "steps": [
      "Verificar interface e link no host.",
      "Coletar MAC, IP, máscara, gateway e DNS.",
      "Verificar ARP/neigh do gateway.",
      "Pedir ao time de redes porta, VLAN, MAC aprendido e erros físicos.",
      "Comparar evidências com documentação.",
      "Registrar riscos e não alterar configuração sem mudança aprovada."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Reiniciar o DNS ou trocar navegador primeiro.",
        "whyItIsWrong": "O sintoma pode estar antes de IP/DNS; é preciso validar link, VLAN, gateway e ARP."
      },
      {
        "answer": "Liberar any-any no firewall para testar.",
        "whyItIsWrong": "É uma mudança ampla, insegura e não prova a causa de camada 2."
      },
      {
        "answer": "Confiar apenas no MAC como identidade do usuário.",
        "whyItIsWrong": "MAC pode mudar; deve ser correlacionado com porta, autenticação, inventário e logs."
      }
    ],
    "finalAnswer": "A resposta correta é produzir uma matriz com hipóteses de Camada 1, 2 e 3, coletar evidências locais e do switch, interpretar sem extrapolar e encaminhar ação para a equipe responsável conforme evidência: cabo/porta, VLAN/autenticação, DHCP/gateway ou camada superior."
  },
  "glossary": [
    {
      "term": "Ethernet",
      "shortDefinition": "Tecnologia de LAN baseada em frames e endereços MAC.",
      "longDefinition": "Família de padrões usada para comunicação local em redes cabeadas e ambientes de infraestrutura, cobrindo aspectos físicos e de enlace.",
      "example": "Um notebook conectado por cabo a um switch usa Ethernet para enviar frames ao gateway.",
      "relatedTerms": [
        "frame",
        "MAC",
        "switch",
        "LAN"
      ],
      "relatedLessons": [
        "2.4",
        "3.2",
        "3.3"
      ]
    },
    {
      "term": "Frame Ethernet",
      "shortDefinition": "PDU de Camada 2 usada em Ethernet.",
      "longDefinition": "Estrutura que contém MAC de origem, MAC de destino, EtherType, dados encapsulados e verificação de erro.",
      "example": "Um pacote IPv4 pode viajar dentro de um frame Ethernet.",
      "relatedTerms": [
        "PDU",
        "EtherType",
        "FCS"
      ],
      "relatedLessons": [
        "2.2",
        "3.2"
      ]
    },
    {
      "term": "MAC",
      "shortDefinition": "Endereço de camada 2 associado a uma interface de rede.",
      "longDefinition": "Identificador de 48 bits usado em redes Ethernet para comunicação local no enlace.",
      "example": "O switch aprende o MAC do notebook em uma porta específica.",
      "relatedTerms": [
        "NIC",
        "switch",
        "ARP"
      ],
      "relatedLessons": [
        "3.2",
        "3.3",
        "3.5"
      ]
    },
    {
      "term": "Switch",
      "shortDefinition": "Equipamento que encaminha frames com base em MACs aprendidos.",
      "longDefinition": "Dispositivo de camada 2 que associa endereços MAC a portas e encaminha frames dentro da LAN.",
      "example": "Um switch envia o frame apenas para a porta onde o MAC de destino foi aprendido.",
      "relatedTerms": [
        "tabela MAC",
        "VLAN",
        "flooding"
      ],
      "relatedLessons": [
        "3.3",
        "3.4",
        "3.7"
      ]
    },
    {
      "term": "EtherType",
      "shortDefinition": "Campo que indica o protocolo encapsulado no frame Ethernet.",
      "longDefinition": "Campo de 16 bits que informa se o payload do frame carrega IPv4, IPv6, ARP ou outro protocolo.",
      "example": "0x0800 indica IPv4 em muitos frames Ethernet.",
      "relatedTerms": [
        "frame",
        "IPv4",
        "ARP"
      ],
      "relatedLessons": [
        "3.2",
        "3.5"
      ]
    },
    {
      "term": "Domínio de broadcast",
      "shortDefinition": "Escopo em que broadcasts de camada 2 são propagados.",
      "longDefinition": "Área lógica da LAN onde frames broadcast podem alcançar dispositivos, normalmente delimitada por VLANs e roteadores.",
      "example": "ARP Request em uma VLAN é broadcast dentro daquele domínio.",
      "relatedTerms": [
        "broadcast",
        "VLAN",
        "ARP"
      ],
      "relatedLessons": [
        "3.4",
        "3.5",
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
      "note": "Referência normativa para Ethernet; consultar quando for necessário validar detalhes de padrão."
    },
    {
      "type": "internal-course",
      "title": "Modelo OSI — Camada 2",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m02/2.4",
      "note": "Base conceitual imediata para Ethernet."
    },
    {
      "type": "internal-course",
      "title": "Cabeamento estruturado e padrões RJ-45",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m01/1.6",
      "note": "Base física anterior à Ethernet prática."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Redes de plataforma e Kubernetes",
      "lesson": "CNIs, bridges e services",
      "reason": "Conceitos de enlace ajudam a entender bridges Linux, veth e redes de containers."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso condicional e dispositivos",
      "lesson": "Identidade do dispositivo",
      "reason": "MAC não é identidade forte; controles modernos exigem autenticação e postura de dispositivo."
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
      "3.2"
    ]
  }
};
