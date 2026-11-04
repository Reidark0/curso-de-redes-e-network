export const lesson0107 = {
  "id": "1.7",
  "moduleId": "m01",
  "order": 7,
  "title": "Equipamentos de rede: NIC, hub, switch, roteador, AP e firewall",
  "subtitle": "Como entender o papel de cada equipamento antes de configurar, diagnosticar ou proteger uma rede.",
  "duration": "75-105 min",
  "estimatedStudyTimeMinutes": 105,
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
    "Diferenciar NIC, hub, switch, roteador, access point e firewall.",
    "Entender o papel de cada equipamento por camada, tabela interna e decisão de encaminhamento.",
    "Evitar confusões comuns entre conectar, comutar, rotear, distribuir Wi‑Fi e filtrar tráfego.",
    "Relacionar equipamentos físicos com equivalentes virtuais em cloud e DevSecOps.",
    "Diagnosticar problemas iniciais escolhendo o equipamento certo para investigar.",
    "Compreender riscos de segurança criados por equipamentos mal posicionados ou mal configurados."
  ],
  "learningOutcomes": [
    "Dado um diagrama simples, o aluno identifica quais equipamentos estão atuando como finais, intermediários e controles de segurança.",
    "Dado um sintoma de falha, o aluno propõe se deve investigar NIC, cabo, switch, roteador, AP, firewall ou serviço.",
    "Dado um cenário de cloud, o aluno reconhece equivalentes como NIC virtual, route table, security group, NAT gateway, load balancer e firewall gerenciado.",
    "Dado um incidente de segurança, o aluno identifica quais equipamentos podem fornecer evidências úteis."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Um usuário abre chamado: “a internet caiu”. Para ele, tudo é uma coisa só. Para você, essa frase não é diagnóstico: a falha pode estar na placa de rede do notebook, no cabo, na porta do switch, no access point, no roteador, no firewall, no DNS, no provedor, numa regra de bloqueio, num certificado, numa VPN, numa rota ou no próprio serviço remoto.</p>\n  <p>Cada equipamento toma uma decisão diferente, com informações diferentes, e registra evidências diferentes. Um switch não resolve o mesmo problema que um roteador. Um firewall não é um roteador “mais caro”. Um access point não é a internet sem fio. Uma NIC não é só “a entrada do cabo”.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> o SOC vê tráfego suspeito saindo de uma máquina. Para investigar, você precisa saber se a evidência está no host, no switch, no AP, no firewall, no roteador, no proxy ou nos logs do serviço. Sem conhecer o papel de cada equipamento, o diagnóstico vira tentativa e erro.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Uma rede precisa conectar dispositivos, comutar quadros, rotear pacotes, dar acesso sem fio, aplicar política e registrar eventos. Cada equipamento se especializou numa dessas tarefas. Veja o que falta quando um deles não existe:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem NIC:</strong> o dispositivo final não tem interface para participar da rede.</li>\n    <li><strong>Sem switch:</strong> a LAN cabeada não escala para muitos dispositivos locais.</li>\n    <li><strong>Sem roteador:</strong> redes diferentes não sabem como alcançar umas às outras.</li>\n    <li><strong>Sem AP:</strong> dispositivos sem fio não entram na rede local de forma controlada.</li>\n    <li><strong>Sem firewall:</strong> há conectividade, mas sem controle de política, inspeção e registro.</li>\n    <li><strong>Com hub em produção:</strong> o tráfego é repetido para todas as portas, com perda de desempenho e de privacidade.</li>\n  </ul>\n</section>\n",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>Evolução</h2>\n  <p>As primeiras LANs usavam hubs: todos os computadores disputavam o mesmo meio (um único domínio de colisão), e o desempenho caía conforme o tráfego crescia. Os switches resolveram isso aprendendo endereços MAC; os roteadores interligaram redes por IP; os APs levaram a rede para o rádio; e os firewalls passaram de filtros simples de pacotes para inspeção de estado, aplicação, identidade e contexto. Hoje quase todos esses papéis também existem em software.</p>\n  <div class=\"responsive-table\">\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Equipamento</th><th>Problema original</th><th>Limitação</th><th>Evolução moderna</th></tr></thead>\n    <tbody>\n      <tr><td>NIC</td><td>Conectar o host ao meio</td><td>Depende de driver, cabo, Wi‑Fi e configuração</td><td>NIC virtual, SR-IOV, offload, eBPF</td></tr>\n      <tr><td>Hub</td><td>Repetir sinal para várias portas</td><td>Colisão, baixa eficiência e pouca privacidade</td><td>Praticamente substituído por switches</td></tr>\n      <tr><td>Switch</td><td>Conectar hosts na LAN com eficiência</td><td>Não separa redes IP por si só</td><td>VLANs, STP, PoE, port security, switches L3</td></tr>\n      <tr><td>Roteador</td><td>Interligar redes diferentes</td><td>Não é política completa de segurança por padrão</td><td>SD-WAN, cloud route tables, roteamento dinâmico</td></tr>\n      <tr><td>AP</td><td>Dar acesso sem fio à rede</td><td>Rádio sofre interferência e tem alcance limitado</td><td>Controladoras, Wi‑Fi 6/7, WPA3, NAC</td></tr>\n      <tr><td>Firewall</td><td>Controlar tráfego entre zonas</td><td>Regra ruim cria falsa sensação de segurança</td><td>NGFW, WAF, security groups, ZTNA, cloud firewall</td></tr>\n    </tbody>\n  </table>\n  </div>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>Equipamentos de rede são componentes físicos ou virtuais que participam da comunicação entre dispositivos: interfaces de acesso, repetidores, comutadores, roteadores, pontes sem fio e pontos de controle de segurança.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> entender um equipamento de rede é responder sete perguntas: que problema ele resolve, em que camada atua, que informação lê, que tabela mantém, que decisão toma, que falhas produz e que evidências registra.</div>\n  <p>Não basta saber que a caixa se chama “switch”: o que importa é que ela aprende MACs e encaminha quadros dentro de um domínio de camada 2. O nome comercial também engana, porque uma mesma caixa pode acumular vários papéis.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Cada equipamento decide com base em informações diferentes. Essa é a chave para diagnosticar.</p>\n  <ol class=\"flow-list\">\n    <li><strong>NIC:</strong> negocia link, velocidade e duplex; possui endereço MAC; envia e recebe quadros; depende de driver e da configuração do sistema operacional.</li>\n    <li><strong>Hub:</strong> recebe o sinal numa porta e repete para todas as outras. Não aprende MAC, não filtra e não entende destino.</li>\n    <li><strong>Switch:</strong> lê o MAC de origem de cada quadro e anota em que porta ele está (tabela MAC). Para encaminhar, procura o MAC de destino na tabela e envia só pela porta correspondente. Se o destino ainda não está na tabela, ou se o quadro é broadcast, envia por todas as portas da VLAN, exceto a de origem.</li>\n    <li><strong>Roteador:</strong> lê o endereço IP de destino, consulta a tabela de rotas e decide o próximo salto para alcançar outra rede.</li>\n    <li><strong>Access point:</strong> conecta clientes Wi‑Fi à rede cabeada, gerenciando SSID, autenticação Wi‑Fi, canal, potência, associação e roaming.</li>\n    <li><strong>Firewall:</strong> compara o tráfego com políticas, estado de conexão, zonas, portas, protocolos, aplicações, usuários e contexto; permite, bloqueia e registra eventos.</li>\n  </ol>\n  <p>Daí vem a diferença de alcance: no hub, todas as portas compartilham um único domínio de colisão; no switch, cada porta é um domínio de colisão separado, mas as portas da mesma VLAN continuam no mesmo domínio de broadcast; o roteador separa domínios de broadcast, porque não repassa broadcast de camada 2 de uma rede para outra.</p>\n  <h3>As duas tabelas, com valores</h3>\n  <div class=\"responsive-table\">\n  <table class=\"data-table\">\n    <thead><tr><th>Tabela</th><th>Entrada de exemplo</th><th>Leitura</th></tr></thead>\n    <tbody>\n      <tr><td>Tabela MAC (switch)</td><td>VLAN 10 · 00:1a:2b:3c:4d:5e · Gi0/3</td><td>Quadros para esse MAC, na VLAN 10, saem só pela porta Gi0/3.</td></tr>\n      <tr><td>Tabela de rotas (roteador)</td><td>192.168.10.0/24 · conectada · Gi0/0</td><td>Destinos dessa rede estão diretamente ligados à interface Gi0/0.</td></tr>\n      <tr><td>Tabela de rotas (roteador)</td><td>0.0.0.0/0 · via 203.0.113.1</td><td>Rota default: o que não casa com outra rota vai para o próximo salto 203.0.113.1.</td></tr>\n    </tbody>\n  </table>\n  </div>\n  <p>Equipamentos modernos acumulam papéis. O roteador residencial costuma reunir switch, AP, NAT, DHCP e firewall básico na mesma caixa, e um switch L3 também roteia. Em empresa, a separação costuma ser mais clara para ganhar controle, escala e visibilidade.</p>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Switch e roteador fazem a mesma coisa:</strong> a confusão vem do roteador doméstico, que tem os dois na mesma caixa. Switch comuta quadros por MAC dentro da LAN; roteador encaminha pacotes por IP entre redes. Misturar os dois leva a procurar um problema entre redes na LAN, ou o contrário.</li>\n      <li><strong>Firewall é roteador com bloqueio:</strong> muitos firewalls também roteiam, mas o papel principal é política e inspeção. Quem pensa só em rota ignora regras, zonas, estado e logs.</li>\n      <li><strong>AP é sinônimo de internet:</strong> o AP só conecta o cliente sem fio à rede. DNS, rota, firewall e provedor também precisam funcionar.</li>\n      <li><strong>Ignorar NIC e driver:</strong> a interface é invisível quando funciona, e falhas de driver, energia, velocidade ou MAC passam despercebidas. Comece verificando interface, link, IP, gateway, DNS e logs locais.</li>\n    </ul>\n  </div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>Numa rede pequena, o caminho parece simples: notebook → switch → roteador/firewall → internet. Numa empresa, ele pode envolver NIC, tomada, patch panel, switch de acesso, switch de distribuição, firewall interno, roteador de borda, proxy, VPN, WAF, link MPLS, SD-WAN ou cloud.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Camada de acesso:</strong> onde usuários, impressoras, câmeras, APs e telefones se conectam. Switches de acesso e APs ficam aqui.</li>\n    <li><strong>Camada de distribuição:</strong> agrega tráfego, aplica algumas políticas e conecta blocos da rede.</li>\n    <li><strong>Borda:</strong> saída para internet, WAN, parceiros, VPNs ou cloud. Firewalls, roteadores e links ficam aqui.</li>\n    <li><strong>Serviços:</strong> servidores, DNS, DHCP, identidade, aplicações, bancos e observabilidade.</li>\n    <li><strong>Controle de segurança:</strong> firewalls, NAC, IDS/IPS, WAF, proxy, EDR e logs.</li>\n  </ul>\n  <p>O desenho depende de porte, risco, orçamento, disponibilidade e operação. Uma pequena empresa pode usar um firewall, um switch e APs; um ambiente maduro separa funções, zonas e responsabilidades. Equipamentos gerenciáveis custam mais (firewalls avançados ainda exigem licenças de inspeção e suporte), mas geram logs e métricas que os domésticos não geram; o equipamento barato cobra depois, em indisponibilidade, retrabalho e falta de evidência. Cada equipamento a mais também exige documentação, backup de configuração e monitoramento.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense numa empresa física. A NIC é a porta individual de cada pessoa para entrar no prédio. O switch é a recepção interna, que sabe em qual sala cada pessoa trabalha. O roteador é a logística, que sabe enviar coisas para outros prédios. O access point é uma entrada sem fio para pessoas autorizadas que não chegam pelo corredor. O firewall é a segurança que verifica as regras de entrada e saída entre áreas.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> a analogia ajuda a lembrar papéis, mas equipamentos reais trabalham com quadros, pacotes, tabelas, estados e temporizadores.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu notebook usa uma NIC Wi‑Fi para se conectar ao roteador residencial. Essa caixa provavelmente combina AP, switch, roteador, NAT, DHCP e firewall básico. Quando você conecta um cabo Ethernet nela, a parte de switch recebe seu quadro. Quando você acessa a internet, a parte de roteamento/NAT encaminha o tráfego para a rede do provedor.</p>\n  <p>Se o Wi‑Fi está conectado, mas nada abre, o problema pode não ser o AP. Pode ser DNS, rota, firewall, link do provedor ou serviço remoto. Se o cabo não acende link, o problema provavelmente está mais próximo de NIC, cabo, porta ou energia.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, um notebook se conecta a um switch de acesso. Esse switch pode aplicar VLAN, autenticação 802.1X, port security e PoE para telefones ou APs. O tráfego segue para um firewall interno, que decide se a rede de usuários pode acessar servidores. Depois, um roteador ou firewall de borda encaminha tráfego para internet, datacenter, filial ou cloud.</p>\n  <p>Em incidentes, cada equipamento fornece evidências diferentes. O switch pode mostrar porta, MAC e VLAN. O firewall pode mostrar conexão permitida ou bloqueada. O roteador pode mostrar rota. O AP pode mostrar cliente associado, RSSI e SSID. O host pode mostrar IP, gateway, DNS e processos.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, os equipamentos viram componentes lógicos. Uma VM tem NIC virtual; o hypervisor tem vSwitch. Uma VPC ou VNet possui subnets, route tables, gateways, NAT gateways, load balancers, security groups, NSGs e firewalls gerenciados; em Kubernetes, ingress controller e service mesh. Não há cabo RJ‑45 visível, mas os papéis continuam existindo.</p>\n  <p>Cloud não eliminou a rede: tornou-a mais programável e abstrata. O troubleshooting muda: em vez de olhar o LED da porta, você olha rota, security group, ACL, flow log, peering, private endpoint, DNS privado e políticas de identidade. Dois cuidados: security group filtra tráfego aplicado à instância ou interface, mas não o trate como firewall completo sem entender seus limites; e NAT gateway, firewall gerenciado, load balancer e tráfego entre zonas geram custo recorrente.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, os papéis de rede aparecem como código. Terraform cria security groups, route tables, load balancers e firewalls. Kubernetes cria Services, Ingress, NetworkPolicies e interfaces virtuais de pods.</p>\n  <p>Quando uma pipeline falha ao acessar um registry privado, a causa pode ser DNS, rota, firewall, proxy, regra de security group, certificado TLS ou credencial. Pensar nos papéis ajuda a separar “problema de acesso lógico” de “problema de caminho de rede”.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1100 520\" role=\"img\" aria-labelledby=\"m01l07-title m01l07-desc\">\n    <title id=\"m01l07-title\">Papéis dos equipamentos de rede</title>\n    <desc id=\"m01l07-desc\">Diagrama mostrando dispositivo final com NIC, hub legado, switch, roteador, access point e firewall, com fluxos de rede e pontos de política.</desc>\n    <defs>\n      <marker id=\"m01l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"35\" y=\"85\" width=\"150\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"116\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n    <text x=\"110\" y=\"140\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dispositivo final</text>\n\n    <rect x=\"35\" y=\"245\" width=\"150\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"276\" text-anchor=\"middle\" class=\"svg-label\">NIC</text>\n    <text x=\"110\" y=\"300\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Interface de rede</text>\n\n    <rect x=\"245\" y=\"90\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"320\" y=\"120\" text-anchor=\"middle\" class=\"svg-label\">Hub</text>\n    <text x=\"320\" y=\"144\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Repetidor legado</text>\n\n    <rect x=\"455\" y=\"90\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"530\" y=\"120\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"530\" y=\"144\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2 / MAC</text>\n\n    <rect x=\"665\" y=\"90\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"740\" y=\"120\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text>\n    <text x=\"740\" y=\"144\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 3 / IP</text>\n\n    <rect x=\"875\" y=\"90\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"950\" y=\"120\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"950\" y=\"144\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Política e inspeção</text>\n\n    <rect x=\"455\" y=\"260\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"530\" y=\"290\" text-anchor=\"middle\" class=\"svg-label\">Servidor</text>\n    <text x=\"530\" y=\"314\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Serviço local</text>\n\n    <rect x=\"665\" y=\"260\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"740\" y=\"290\" text-anchor=\"middle\" class=\"svg-label\">AP</text>\n    <text x=\"740\" y=\"314\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi para Ethernet</text>\n\n    <rect x=\"875\" y=\"260\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"950\" y=\"290\" text-anchor=\"middle\" class=\"svg-label\">Internet / Cloud</text>\n    <text x=\"950\" y=\"314\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Redes externas</text>\n\n    <line x1=\"185\" y1=\"125\" x2=\"245\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"395\" y1=\"125\" x2=\"455\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"605\" y1=\"125\" x2=\"665\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"815\" y1=\"125\" x2=\"875\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"950\" y1=\"160\" x2=\"950\" y2=\"260\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"530\" y1=\"160\" x2=\"530\" y2=\"260\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"740\" y1=\"260\" x2=\"740\" y2=\"160\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"185\" y1=\"281\" x2=\"455\" y2=\"295\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n\n    <rect x=\"250\" y=\"385\" width=\"210\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"355\" y=\"415\" text-anchor=\"middle\" class=\"svg-label\">Pergunta de diagnóstico</text>\n    <text x=\"355\" y=\"440\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quem repete, comuta, roteia,</text>\n    <text x=\"355\" y=\"462\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">distribui Wi‑Fi ou aplica política?</text>\n\n    <rect x=\"600\" y=\"385\" width=\"270\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"735\" y=\"415\" text-anchor=\"middle\" class=\"svg-label\">Regra mental</text>\n    <text x=\"735\" y=\"440\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Equipamento não é só caixa:</text>\n    <text x=\"735\" y=\"462\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">é papel, camada, tabela e política.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> entenda cada equipamento pelo problema que resolve, pela camada, pela informação que lê, pela tabela que mantém, pela decisão que toma e pelas evidências que registra.</li>\n    <li><strong>O que lembrar:</strong> NIC conecta o host; hub repete; switch comuta por MAC; roteador encaminha por IP; AP conecta clientes sem fio; firewall aplica política.</li>\n    <li><strong>Erro comum:</strong> achar que todo equipamento que “passa internet” faz a mesma coisa, ou que NAT e SSID oculto substituem firewall e autenticação.</li>\n    <li><strong>Uso real:</strong> o diagnóstico profissional depende de saber em qual equipamento procurar a evidência, inclusive quando ele é virtual, em cloud.</li>\n  </ul>\n</section>\n",
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
  "troubleshooting": {
    "symptoms": [
      "Sem link físico",
      "Wi‑Fi conectado sem internet",
      "Apenas uma sala sem rede",
      "Apenas uma VLAN sem acesso",
      "Firewall bloqueando tráfego esperado",
      "Cloud VM sem saída para internet"
    ],
    "diagnosticQuestions": [
      "O problema ocorre em um host, vários hosts, uma porta, um switch, um SSID ou uma rede inteira?",
      "A interface tem link, IP, máscara, gateway e DNS?",
      "O tráfego falha dentro da LAN, entre redes ou na saída para internet/cloud?",
      "Existe política de firewall ou security group bloqueando?",
      "Há logs no switch, AP, firewall, roteador ou host?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\ngetmac /v\nGet-NetAdapter\nTest-NetConnection 8.8.8.8 -Port 53",
        "purpose": "Ver interface, MAC, IP, gateway, DNS e teste básico de conectividade.",
        "expectedObservation": "Adaptador ativo, endereço IPv4 válido, gateway e DNS configurados.",
        "interpretation": "Se a interface está desconectada ou sem IP, investigue NIC, cabo, Wi‑Fi, DHCP ou política local."
      },
      {
        "platform": "Linux",
        "command": "ip link\nip addr\nip route\nss -tulpen",
        "purpose": "Ver interfaces, endereços, rotas e serviços ouvindo no host.",
        "expectedObservation": "Interface UP, IP válido e rota default quando necessário.",
        "interpretation": "Sem rota default, o host pode falar localmente mas não sair para outras redes."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow mac address-table\nshow cdp neighbors\nshow interfaces status",
        "purpose": "Ver portas, IPs, vizinhos, tabela MAC e estado físico em equipamentos Cisco.",
        "expectedObservation": "Interfaces relevantes em up/up, MACs aprendidos e vizinhos esperados.",
        "interpretation": "Porta down, sem MAC aprendido ou vizinho inesperado indica caminho físico/lógico a investigar."
      }
    ],
    "decisionTree": [
      {
        "if": "Um único host falha",
        "then": "Verificar NIC, IP, cabo/Wi‑Fi, DHCP, DNS e firewall local."
      },
      {
        "if": "Todos os hosts do mesmo switch falham",
        "then": "Verificar switch, uplink, energia, VLAN, STP e porta de distribuição. Falha coletiva aponta para equipamento compartilhado: não analise host por host."
      },
      {
        "if": "Somente tráfego para outra rede falha",
        "then": "Verificar gateway, rota, firewall e ACL/security group."
      },
      {
        "if": "Somente Wi‑Fi falha",
        "then": "Verificar AP, SSID, autenticação, rádio, interferência e VLAN associada. Comprar mais banda de internet não resolve falha restrita ao rádio."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Desativar portas físicas ociosas ou colocá-las em VLAN restrita.",
      "Usar 802.1X, port security ou NAC quando o risco justificar.",
      "Separar redes por função e aplicar firewall entre zonas.",
      "Manter firmware de switches, roteadores, APs e firewalls atualizado.",
      "Registrar logs de firewall, APs e equipamentos críticos em local centralizado.",
      "Proteger documentação de rede e backups de configuração.",
      "Inventariar NICs e interfaces, físicas e virtuais, para rastrear dispositivos finais e não deixar interfaces expostas sem necessidade."
    ],
    "badPractices": [
      "Usar AP doméstico não autorizado em rede corporativa.",
      "Manter firewall com regra any-any sem justificativa e revisão.",
      "Conectar switches não gerenciáveis em áreas críticas sem inventário.",
      "Não trocar senhas padrão de equipamentos.",
      "Não saber qual equipamento fornece evidência em incidente.",
      "Deixar porta de switch em VLAN indevida, dando ao dispositivo acesso a uma rede que ele não deveria alcançar.",
      "Usar hub em produção (ele só tem lugar em laboratório didático controlado)."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Achar que NAT substitui firewall.",
      "Achar que SSID oculto é controle de segurança suficiente.",
      "Achar que cloud não tem rede porque não há equipamento físico visível.",
      "Achar que o firewall compensa uma arquitetura ruim mesmo com regras permissivas demais."
    ],
    "vulnerabilities": [
      {
        "name": "Porta física exposta",
        "description": "Tomadas ou portas de switch ativas em áreas acessíveis podem permitir conexão não autorizada.",
        "defensiveExplanation": "O risco é a entrada de um dispositivo não gerenciado na rede interna.",
        "mitigation": "Desativar portas não usadas, usar 802.1X, VLAN de quarentena, port security e monitoramento."
      },
      {
        "name": "Firewall permissivo",
        "description": "Regras amplas permitem tráfego além do necessário entre redes.",
        "defensiveExplanation": "Isso aumenta superfície de ataque e facilita movimento lateral após comprometimento.",
        "mitigation": "Aplicar menor privilégio, revisar regras, registrar justificativas e monitorar hits."
      },
      {
        "name": "AP não autorizado",
        "description": "Um access point conectado sem controle pode criar ponte insegura para a rede cabeada.",
        "defensiveExplanation": "Usuários ou atacantes próximos podem tentar acessar a rede por rádio.",
        "mitigation": "Inventário, detecção de rogue AP, 802.1X, segmentação e políticas físicas."
      },
      {
        "name": "AP mal configurado",
        "description": "Senha fraca, SSID inadequado ou falta de isolamento entre clientes expõem a rede sem fio.",
        "defensiveExplanation": "Quem está ao alcance do rádio pode entrar na rede ou alcançar outros clientes conectados.",
        "mitigation": "WPA3 ou WPA2-Enterprise, rede de visitantes segmentada e isolada, e monitoramento de associações."
      },
      {
        "name": "Roteamento incorreto",
        "description": "Uma rota errada ou não documentada faz o tráfego passar por um caminho não previsto.",
        "defensiveExplanation": "O tráfego pode ficar indisponível ou atravessar um trecho sem a inspeção e o registro esperados.",
        "mitigation": "Controlar e documentar rotas, validar cada mudança e monitorar rotas criadas para destinos inesperados."
      }
    ],
    "monitoring": [
      "Logs de firewall",
      "Tabela MAC e eventos de porta",
      "Eventos de associação Wi‑Fi",
      "Flow logs em cloud",
      "Mudanças de configuração",
      "Alertas de portas novas ou MACs desconhecidos"
    ],
    "hardening": [
      "Senhas fortes e únicas",
      "Gerenciamento fora da rede de usuários",
      "SSH/HTTPS em vez de protocolos inseguros",
      "Backup de configuração",
      "MFA para consoles cloud",
      "Controle de acesso baseado em função"
    ],
    "detectionIdeas": [
      "MAC novo em porta sensível",
      "Aumento de bloqueios no firewall",
      "Cliente Wi‑Fi associado em horário incomum",
      "Regra de security group alterada",
      "Rota criada para destino inesperado"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que não basta dizer que um equipamento ‘passa internet’?",
      "hints": [
        "Pense em papel e decisão.",
        "Compare switch, roteador e firewall."
      ],
      "expectedIdeas": [
        "camadas",
        "MAC",
        "IP",
        "política",
        "evidência"
      ],
      "explanation": "Equipamentos diferentes tomam decisões diferentes. Sem separar papéis, o diagnóstico fica impreciso."
    },
    {
      "type": "diagnóstico",
      "question": "Um host consegue pingar outro host da mesma LAN, mas não acessa a internet. Qual equipamento você investigaria primeiro depois do host?",
      "hints": [
        "A LAN parece funcionar.",
        "A saída para outra rede depende do próximo salto."
      ],
      "expectedIdeas": [
        "gateway",
        "roteador",
        "firewall",
        "rota",
        "NAT",
        "DNS"
      ],
      "explanation": "Se a LAN funciona, o problema provavelmente está em roteamento, firewall, NAT, DNS ou link externo, não no switch local inicialmente."
    },
    {
      "type": "cenário real",
      "question": "Em uma empresa, por que APs domésticos conectados sem autorização são perigosos?",
      "hints": [
        "Pense em ponte entre rádio e rede interna.",
        "Pense em autenticação e segmentação."
      ],
      "expectedIdeas": [
        "rogue AP",
        "acesso indevido",
        "segmentação",
        "WPA",
        "802.1X",
        "monitoramento"
      ],
      "explanation": "Um AP não autorizado pode expor a rede cabeada pelo rádio e contornar controles corporativos."
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
      "id": "q1.7.3",
      "question": "Qual prática reduz risco de conexão indevida em uma tomada de rede pública?",
      "options": [
        "Ocultar o SSID da rede corporativa",
        "Ativar NAT no roteador de borda",
        "Usar 802.1X ou desativar a porta/colocá-la em VLAN restrita",
        "Trocar o switch da sala por um hub"
      ],
      "answer": 2,
      "explanation": "Porta física exposta exige controle de acesso (802.1X), desativação ou segmentação restrita. SSID oculto e NAT não controlam quem se conecta a uma tomada cabeada, e hub só piora a privacidade.",
      "topic": "segurança física",
      "difficulty": "iniciante-intermediário",
      "type": "segurança"
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
      "id": "q1.7.5",
      "question": "Em cloud, qual elemento se parece conceitualmente com uma regra de firewall aplicada a uma instância ou interface?",
      "options": [
        "Route table da VPC",
        "NAT gateway",
        "Load balancer",
        "Security group ou NSG"
      ],
      "answer": 3,
      "explanation": "Security groups e NSGs aplicam políticas de tráfego a recursos virtuais. Route table decide caminho, NAT gateway traduz endereços para saída e load balancer distribui conexões.",
      "topic": "cloud",
      "difficulty": "iniciante-intermediário",
      "type": "cloud"
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
        "Envia o quadro por todas as portas da VLAN, exceto a de origem",
        "Consulta a tabela de rotas e envia ao gateway",
        "Devolve o quadro para a porta de origem"
      ],
      "answer": 1,
      "explanation": "Sem entrada para o destino, o switch inunda o quadro pelas portas da mesma VLAN, exceto a de entrada. Quando o destino responde, o switch aprende o MAC dele pela origem do quadro de resposta.",
      "topic": "switch",
      "difficulty": "iniciante-intermediário",
      "type": "mecanismo"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.7.8",
      "front": "O que a NIC negocia e de que ela depende?",
      "back": "Negocia link, velocidade e duplex e tem um endereço MAC. Depende de driver e da configuração do sistema operacional; por isso falhas de driver, energia ou velocidade aparecem como “sem rede”.",
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
      "back": "Conectar clientes sem fio à rede, gerenciando SSID, rádio, associação e autenticação Wi‑Fi.",
      "tags": [
        "AP",
        "Wi‑Fi"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.7.5",
      "front": "Firewall é igual a roteador?",
      "back": "Não. Ele pode rotear, mas seu papel principal é aplicar política, inspeção e registro entre zonas ou contextos.",
      "tags": [
        "firewall",
        "segurança"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc1.7.9",
      "front": "Hub, switch e roteador: o que cada um faz com domínios de colisão e de broadcast?",
      "back": "Hub: todas as portas num único domínio de colisão. Switch: cada porta é um domínio de colisão, mas a VLAN inteira é um domínio de broadcast. Roteador: separa domínios de broadcast.",
      "tags": [
        "hub",
        "switch",
        "roteador",
        "domínios"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc1.7.7",
      "front": "NAT substitui firewall?",
      "back": "Não. NAT altera endereçamento; política explícita, inspeção e registro são papel do firewall.",
      "tags": [
        "NAT",
        "firewall"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex1.7.1",
      "type": "conceitual",
      "prompt": "Explique, com suas palavras, a diferença entre switch, roteador e firewall.",
      "expectedAnswer": "Switch conecta dispositivos na LAN usando MAC; roteador interliga redes usando IP; firewall aplica políticas e inspeção entre zonas, redes ou contextos.",
      "explanation": "A resposta deve separar decisão de camada 2, camada 3 e política de segurança."
    },
    {
      "id": "ex1.7.2",
      "type": "diagnóstico",
      "prompt": "Um usuário está conectado ao Wi‑Fi, mas não recebe IP. Quais hipóteses você levantaria?",
      "expectedAnswer": "Problema no AP, VLAN associada ao SSID, DHCP, autenticação, alcance/interferência ou política de rede.",
      "explanation": "Conexão ao SSID não garante DHCP nem acesso à rede correta."
    },
    {
      "id": "ex1.7.3",
      "type": "arquitetura",
      "prompt": "Desenhe uma rede pequena com notebook, switch, AP, firewall e internet. Indique o papel de cada componente.",
      "expectedAnswer": "Notebook como dispositivo final/NIC; switch como camada 2; AP como ponte Wi‑Fi; firewall como política/borda; internet como rede externa.",
      "explanation": "O objetivo é mapear papéis, não marcas comerciais."
    },
    {
      "id": "ex1.7.4",
      "type": "segurança",
      "prompt": "Liste três riscos de segurança relacionados a equipamentos de rede mal configurados.",
      "expectedAnswer": "Porta física exposta, firewall permissivo, AP não autorizado, firmware desatualizado, senha padrão, logs ausentes.",
      "explanation": "Equipamentos são controles e também podem ser pontos fracos."
    }
  ],
  "challenge": {
    "title": "Organize os papéis de rede de uma pequena empresa",
    "scenario": "Uma empresa possui um roteador doméstico fazendo Wi‑Fi, um switch não gerenciável, algumas câmeras IP, computadores administrativos e um servidor local. Ninguém sabe onde aplicar política, onde coletar logs ou como separar visitantes.",
    "tasks": [
      "Identificar os papéis existentes",
      "Propor separação mínima de funções",
      "Indicar onde aplicar firewall e segmentação",
      "Indicar quais evidências coletar em incidente",
      "Sugerir melhorias sem gastar demais"
    ],
    "constraints": [
      "A empresa tem orçamento limitado",
      "Visitantes não devem acessar servidor local",
      "Câmeras precisam ficar isoladas",
      "A solução deve ser explicável para equipe júnior"
    ],
    "expectedDeliverables": [
      "Tabela de equipamentos e papéis",
      "Diagrama físico/lógico simples",
      "Lista de riscos",
      "Plano de melhorias por prioridade",
      "Comandos ou evidências de validação"
    ],
    "gradingRubric": [
      {
        "criterion": "Identificação correta dos papéis",
        "points": 30,
        "description": "Distingue switch, roteador, AP, firewall, host e serviço."
      },
      {
        "criterion": "Segurança e segmentação",
        "points": 30,
        "description": "Propõe isolamento de visitantes, câmeras e servidor."
      },
      {
        "criterion": "Viabilidade operacional",
        "points": 20,
        "description": "Considera custo, documentação, equipe e manutenção."
      },
      {
        "criterion": "Evidências e validação",
        "points": 20,
        "description": "Define como confirmar conectividade, políticas e logs."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos papéis: quem conecta hosts, quem distribui Wi‑Fi, quem interliga redes e quem aplica política. Depois identificamos riscos: rede plana, visitantes misturados, câmeras acessíveis, ausência de logs e equipamentos domésticos. Em seguida propomos melhorias graduais.",
    "steps": [
      "Inventariar equipamentos e portas",
      "Separar rede administrativa, visitantes, câmeras e servidor",
      "Usar firewall ou roteador com VLANs se disponível",
      "Trocar AP doméstico por AP corporativo quando possível",
      "Registrar logs de firewall e eventos de Wi‑Fi",
      "Documentar gateway, SSIDs, VLANs e regras"
    ],
    "commonWrongAnswers": [
      {
        "answer": "Comprar um switch maior resolve tudo.",
        "whyItIsWrong": "Mais portas não criam segmentação, política ou logs por si só."
      },
      {
        "answer": "Colocar senha forte no Wi‑Fi resolve todos os riscos.",
        "whyItIsWrong": "Senha forte ajuda, mas não separa visitantes, câmeras, servidores e usuários internos."
      },
      {
        "answer": "NAT já é firewall suficiente.",
        "whyItIsWrong": "NAT altera endereçamento, mas não substitui política explícita, inspeção e registro adequados."
      }
    ],
    "finalAnswer": "Uma solução mínima seria usar um firewall/roteador capaz de VLANs, switch gerenciável e AP com SSIDs separados. Administrativos, visitantes, câmeras e servidor ficam em redes distintas. O firewall controla tráfego entre elas, visitantes não acessam servidor, câmeras acessam apenas o necessário, e logs de firewall/AP são preservados. Se o orçamento for muito baixo, a prioridade é documentar o ambiente, desativar portas desnecessárias, separar Wi‑Fi de visitantes e planejar substituição gradual dos equipamentos não gerenciáveis."
  },
  "glossary": [
    {
      "term": "NIC",
      "shortDefinition": "Interface de rede de um dispositivo final.",
      "longDefinition": "Componente físico ou virtual que permite que um host participe da rede, possuindo endereço MAC, driver e estado de link.",
      "example": "A placa Ethernet ou Wi‑Fi do notebook é uma NIC.",
      "relatedTerms": [
        "MAC",
        "interface",
        "driver"
      ],
      "relatedLessons": [
        "1.2",
        "1.5",
        "1.7"
      ]
    },
    {
      "term": "Switch",
      "shortDefinition": "Equipamento que comuta quadros em uma LAN usando endereços MAC.",
      "longDefinition": "Dispositivo de camada 2 que aprende MACs por porta e encaminha quadros dentro da rede local; quando não conhece o destino, envia o quadro por todas as portas da VLAN, exceto a de origem.",
      "example": "Um switch de acesso conecta computadores, impressoras e APs em uma sala.",
      "relatedTerms": [
        "MAC",
        "VLAN",
        "tabela MAC"
      ],
      "relatedLessons": [
        "1.7",
        "3.1"
      ]
    },
    {
      "term": "Roteador",
      "shortDefinition": "Equipamento que encaminha pacotes entre redes IP diferentes.",
      "longDefinition": "Dispositivo de camada 3 que usa tabela de rotas para decidir o próximo salto de pacotes IP.",
      "example": "O gateway padrão da rede local costuma ser um roteador ou firewall roteando para fora da LAN.",
      "relatedTerms": [
        "gateway",
        "rota",
        "IP"
      ],
      "relatedLessons": [
        "1.7",
        "4.1",
        "11.1"
      ]
    },
    {
      "term": "Access point",
      "shortDefinition": "Equipamento que conecta clientes Wi‑Fi à rede.",
      "longDefinition": "Dispositivo que gerencia rádio, SSID, associação, autenticação Wi‑Fi e ponte entre rede sem fio e cabeada.",
      "example": "O AP corporativo no teto fornece acesso Wi‑Fi para notebooks e celulares.",
      "relatedTerms": [
        "SSID",
        "WLAN",
        "802.11"
      ],
      "relatedLessons": [
        "1.3",
        "1.7",
        "12.1"
      ]
    },
    {
      "term": "Firewall",
      "shortDefinition": "Controle que aplica política de tráfego entre redes, zonas ou contextos.",
      "longDefinition": "Equipamento ou serviço que permite, bloqueia, inspeciona e registra tráfego com base em regras, estado, aplicação, usuário ou contexto.",
      "example": "Um firewall bloqueia acesso de visitantes ao servidor interno.",
      "relatedTerms": [
        "ACL",
        "zona",
        "política",
        "NGFW"
      ],
      "relatedLessons": [
        "1.7",
        "9.1"
      ]
    },
    {
      "term": "Hub",
      "shortDefinition": "Equipamento legado que repete sinais para todas as portas.",
      "longDefinition": "Repetidor multiporta sem inteligência de comutação e sem tabela MAC: todas as portas formam um único domínio de colisão, com limitações importantes de desempenho e privacidade.",
      "example": "Um hub em laboratório pode ajudar a demonstrar repetição, mas não deve ser usado em produção moderna.",
      "relatedTerms": [
        "repetidor",
        "colisão",
        "camada 1"
      ],
      "relatedLessons": [
        "1.7",
        "3.1"
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
      "1.8"
    ]
  }
};
