export const lesson0307 = {
  "id": "3.7",
  "moduleId": "m03",
  "order": 7,
  "title": "VLANs como segmentação de camada 2",
  "subtitle": "Como separar domínios de broadcast, organizar a LAN e preparar políticas sem confundir VLAN com firewall.",
  "duration": "100-145 min",
  "estimatedStudyTimeMinutes": 145,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 215,
  "tags": [
    "redes",
    "ethernet",
    "vlan",
    "802.1q",
    "camada 2",
    "segmentação",
    "trunk",
    "access port",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.4",
      "reason": "É necessário entender domínios de broadcast e por que switches não eliminam broadcast dentro da mesma VLAN."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "ARP e broadcast ajudam a entender por que VLANs limitam alcance de descoberta local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.4",
      "reason": "A aula depende de Camada 2, frames, MAC e switches."
    }
  ],
  "objectives": [
    "Explicar por que VLANs existem e qual problema resolvem.",
    "Diferenciar VLAN, sub-rede, firewall, rota e domínio de broadcast.",
    "Entender portas access, portas trunk, tagging 802.1Q e native VLAN em nível conceitual.",
    "Planejar uma segmentação simples por função e risco.",
    "Aplicar troubleshooting e segurança defensiva em ambientes com VLANs."
  ],
  "learningOutcomes": [
    "Dado um desenho de LAN, o aluno identifica domínios de broadcast e sugere VLANs coerentes.",
    "Dado um sintoma de host na VLAN errada, o aluno propõe evidências e comandos para validar.",
    "Dado um trunk, o aluno explica por que as VLANs permitidas devem ser documentadas e restritas.",
    "Dado um cenário de segurança, o aluno diferencia segmentação L2 de política inter-VLAN.",
    "Dado um projeto pequeno, o aluno cria tabela de VLANs, portas, gateways e regras esperadas."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>Imagine uma empresa pequena em que computadores administrativos, notebooks de visitantes, câmeras IP, impressoras e servidores estão todos na mesma LAN. Tudo “funciona” até que um notebook infectado começa a gerar broadcast, uma câmera antiga tenta falar com os servidores e um visitante descobre as impressoras corporativas. Não existe limite entre grupos de risco diferentes.</p>\n<p>A VLAN resolve parte desse problema: ela divide logicamente a rede local em domínios de Camada 2 separados, usando os mesmos switches físicos. Em vez de comprar um switch para cada grupo, você cria redes lógicas dentro do switch, e a comunicação entre elas passa a depender de roteamento e política.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>O problema que a VLAN resolve não é “bloquear tudo”: é separar domínios de broadcast e organizar a LAN em grupos lógicos. Numa rede plana, todo broadcast de ARP, DHCP ou descoberta local alcança todos os hosts, uma falha local afeta todos os grupos e as regras de firewall e os logs ficam confusos.</p>\n<p>Antes das VLANs, ter duas redes exigia cabos e switches separados. O padrão IEEE 802.1Q trouxe a separação lógica: uma marcação (tag) no frame permite que várias VLANs passem pelo mesmo cabo.</p>\n<div class=\"responsive-table\"><table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funciona</th><th>Limitação</th><th>Uso hoje</th></tr></thead><tbody>\n<tr><td>Rede plana</td><td>Todos na mesma LAN/VLAN.</td><td>Broadcast amplo e pouco controle.</td><td>Só ambientes muito pequenos ou temporários.</td></tr>\n<tr><td>Separação física</td><td>Switches e cabos diferentes por grupo.</td><td>Custo alto e pouca flexibilidade.</td><td>Ambientes que exigem isolamento físico.</td></tr>\n<tr><td>VLAN</td><td>Separação lógica de Camada 2.</td><td>Exige roteamento e política entre VLANs.</td><td>Padrão corporativo para LANs.</td></tr>\n<tr><td>VRF/SDN/overlay</td><td>Segmentação em L3 ou overlay.</td><td>Maior complexidade operacional.</td><td>Datacenter, cloud e multi-tenant.</td></tr>\n</tbody></table></div>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<div class=\"definition-box\"><strong>Definição:</strong> VLAN (Virtual LAN) é um identificador lógico que separa frames Ethernet em domínios de broadcast distintos dentro da mesma infraestrutura física de switches.</div>\n<p>Dispositivos na mesma VLAN compartilham o mesmo domínio de broadcast. Dispositivos em VLANs diferentes, mesmo ligados ao mesmo switch, ficam separados em Camada 2. Para um host de uma VLAN falar com um host de outra, é preciso <strong>roteamento inter-VLAN</strong> em um roteador, switch camada 3 ou firewall.</p>\n<h3>VLAN não é sub-rede, rota nem firewall</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Conceito</th><th>Camada</th><th>O que faz</th><th>Relação com a VLAN</th></tr></thead><tbody>\n<tr><td>Domínio de broadcast</td><td>2</td><td>Conjunto de hosts que recebe o mesmo broadcast (ARP, DHCP).</td><td>Cada VLAN forma o seu próprio domínio.</td></tr>\n<tr><td>VLAN</td><td>2</td><td>Define em qual domínio o switch coloca cada porta e cada frame.</td><td>—</td></tr>\n<tr><td>Sub-rede</td><td>3</td><td>Faixa de endereços IP (ex.: 192.168.10.0/24) com um gateway.</td><td>Normalmente uma sub-rede por VLAN, com gateway documentado. Misturar as duas coisas deixa DHCP, gateway e roteamento inconsistentes.</td></tr>\n<tr><td>Rota</td><td>3</td><td>Diz para onde enviar pacotes destinados a outra sub-rede.</td><td>Sem rota e gateway, uma VLAN não alcança a outra.</td></tr>\n<tr><td>Firewall/ACL</td><td>3–4 (ou acima)</td><td>Permite ou bloqueia fluxos por origem, destino e porta.</td><td>Aplicado no roteamento entre VLANs; a VLAN sozinha não filtra nada.</td></tr>\n</tbody></table></div>\n<div class=\"callout warning\"><strong>Erro comum:</strong> achar que VLAN é firewall. Como ela separa redes, parece bloquear tudo, mas a comunicação inter-VLAN pode ficar liberada sem controle. A VLAN também não criptografa nem autentica usuário ou dispositivo: quem controla a comunicação é o firewall/ACL, com logs, no roteamento entre VLANs.</div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<p>O switch associa cada porta, cada frame e cada entrada da tabela MAC a uma VLAN. Há dois modos de porta:</p>\n<ul>\n<li><strong>Porta access:</strong> pertence a uma única VLAN (a <em>access VLAN</em>) e liga um host final. O host envia frames comuns, sem tag; o switch classifica o tráfego na VLAN configurada para a porta. Porta na VLAN errada põe o host no domínio de broadcast errado.</li>\n<li><strong>Porta trunk:</strong> transporta várias VLANs no mesmo enlace, entre switches, roteadores, firewalls, hypervisors ou APs. Cada frame leva uma tag 802.1Q que indica a VLAN.</li>\n</ul>\n<h3>A tag 802.1Q e a native VLAN</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Elemento</th><th>Tamanho/onde</th><th>Para que serve</th><th>Cuidado</th></tr></thead><tbody>\n<tr><td>Tag 802.1Q</td><td>4 bytes adicionados ao frame Ethernet no trunk</td><td>Carregar a VLAN e a prioridade do frame.</td><td>Portas de usuário comuns não devem aceitar frames com tag.</td></tr>\n<tr><td>VLAN ID</td><td>12 bits dentro da tag</td><td>Identificar a VLAN (0 e 4095 são reservados: sobram 4.094 VLANs).</td><td>Restrinja e documente as VLANs permitidas em cada trunk.</td></tr>\n<tr><td>Native VLAN</td><td>Configuração do trunk</td><td>VLAN atribuída aos frames que trafegam <em>sem tag</em> no trunk.</td><td>Planeje-a, não ponha hosts sensíveis nela e use a mesma nas duas pontas.</td></tr>\n</tbody></table></div>\n<p>Por que a mesma native VLAN nas duas pontas? Se o switch A usa native VLAN 1 e o switch B usa native VLAN 99, os frames que A envia sem tag (VLAN 1) entram na VLAN 99 em B: as duas VLANs se misturam sem ninguém perceber.</p>\n<h3>Caminho de um frame</h3>\n<ol>\n<li>O host na porta access envia um frame comum, sem saber que está em uma VLAN.</li>\n<li>O switch associa o frame à VLAN da porta e aprende o MAC de origem <em>naquela</em> VLAN: a tabela MAC é por VLAN (VLAN inconsistente ou MAC flapping atrapalham o encaminhamento).</li>\n<li>Destino conhecido na mesma VLAN: o switch encaminha pela porta certa. Broadcast: vai só para as portas da mesma VLAN, por isso ARP e DHCP não passam para outra VLAN sem gateway ou DHCP relay.</li>\n<li>No trunk, o frame segue com a tag da VLAN até o próximo switch, roteador ou firewall, desde que a VLAN esteja na lista de permitidas.</li>\n<li>Destino em outra VLAN: o frame não atravessa sozinho. O gateway roteia quando a política permite, aplicando ACLs e logs.</li>\n</ol>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2>\n<p>Em uma rede corporativa, cada VLAN costuma representar uma função ou nível de risco: usuários, servidores, voz, convidados, gerenciamento, impressoras, câmeras/IoT, laboratórios e DMZ interna. Cada uma normalmente tem sub-rede IP, gateway, política de firewall, logs e dono operacional.</p>\n<ul>\n<li><strong>Componentes:</strong> switches, portas access, trunks, gateway (roteador, switch L3 ou firewall), DHCP, NAC e documentação.</li>\n<li><strong>Pontos de falha:</strong> VLAN errada na porta, VLAN fora do trunk, native VLAN mal planejada, gateway ausente e DHCP/relay incorreto. Uma VLAN errada costuma parecer falha de IP ou de DNS.</li>\n<li><strong>Custo e operação:</strong> exige switches gerenciáveis, gateway L3 e controle de mudanças nos switches, mas sai mais barato que switches separados para cada rede.</li>\n</ul>\n<p>Não use VLAN como única barreira para dados altamente sensíveis, sem documentação e dono, nem para esconder problemas de inventário ou de identidade.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n<p>Pense em um prédio corporativo. Várias equipes usam o mesmo prédio, os mesmos elevadores e a mesma instalação elétrica, mas ficam em salas diferentes. A sala separa as conversas; para alguém de uma sala chegar a outra, precisa passar por uma porta com recepção e regras. A VLAN é a sala; a porta entre as salas é o roteamento com política.</p>\n<div class=\"callout warning\"><strong>Limite da analogia:</strong> a parede bloqueia pessoas fisicamente; a VLAN só separa a Camada 2, e a proteção real entre VLANs depende de a “porta” (roteamento/firewall) estar bem configurada.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Em casa, muitos roteadores oferecem uma rede principal e uma rede de convidados no Wi-Fi, separadas com conceitos parecidos com VLAN: os convidados acessam a internet, mas não devem alcançar seus notebooks e impressoras.</p>\n<p>No Packet Tracer ou em um switch gerenciável de laboratório, crie a VLAN 10 para usuários e a VLAN 20 para servidores. Dois computadores na VLAN 10 se comunicam localmente. Um computador da VLAN 10 não fala com um servidor da VLAN 20 sem um gateway inter-VLAN.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n<p>Uma empresa pode usar: VLAN 10 para usuários administrativos, VLAN 20 para servidores internos, VLAN 30 para telefonia IP, VLAN 40 para convidados, VLAN 50 para câmeras e VLAN 99 para gerenciamento de rede.</p>\n<p>Com isso, o broadcast fica restrito a cada grupo e o firewall aplica a política: convidados não acessam servidores; câmeras só enviam vídeo para o gravador; usuários acessam apenas os sistemas de que precisam; o gerenciamento só é aceito a partir de estações administrativas.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud e DevSecOps</h2>\n<p>Em cloud pública você raramente configura VLANs diretamente: VPCs/VNets, subnets, route tables, security groups/NSGs e firewalls fazem o papel de separação lógica, controle de caminho e política. O raciocínio é o mesmo.</p>\n<p>Em ambientes híbridos e on-premises, VLANs continuam em datacenters, hypervisors, firewalls e links para a cloud. Um erro de VLAN em um trunk físico pode parecer problema de cloud, VPN, DNS ou pipeline: um runner self-hosted na VLAN errada, por exemplo, não consegue baixar imagens do registry privado.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 1080 520\" role=\"img\" aria-labelledby=\"vlan-title vlan-desc\">\n  <title id=\"vlan-title\">VLANs como segmentação de Camada 2</title>\n  <desc id=\"vlan-desc\">Um switch separa portas access em VLANs diferentes. Broadcasts, ARP e frames locais ficam limitados à VLAN; o tráfego entre a VLAN 10 e a VLAN 20 não atravessa o switch direto: sobe pelo trunk 802.1Q até o gateway L3/firewall, que roteia conforme a política.</desc>\n  <defs>\n    <marker id=\"m03l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n    <marker id=\"m03l07-arrow-back\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto-start-reverse\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n  </defs>\n  <rect x=\"40\" y=\"72\" width=\"260\" height=\"320\" rx=\"18\" class=\"svg-zone\" />\n  <text x=\"170\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">VLAN 10 — Usuários</text>\n  <rect x=\"82\" y=\"145\" width=\"160\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--client\" />\n  <text x=\"162\" y=\"181\" text-anchor=\"middle\" class=\"svg-label\">PC Financeiro</text>\n  <rect x=\"82\" y=\"250\" width=\"160\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--client\" />\n  <text x=\"162\" y=\"286\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n  <rect x=\"410\" y=\"98\" width=\"250\" height=\"250\" rx=\"18\" class=\"svg-node svg-node--switch\" />\n  <text x=\"535\" y=\"135\" text-anchor=\"middle\" class=\"svg-label\">Switch L2</text>\n  <text x=\"535\" y=\"165\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Portas access: VLAN 10/20</text>\n  <text x=\"535\" y=\"195\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Trunk: VLANs permitidas</text>\n  <text x=\"535\" y=\"225\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela MAC por VLAN</text>\n  <text x=\"535\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Broadcast limitado por VLAN</text>\n  <rect x=\"780\" y=\"72\" width=\"260\" height=\"320\" rx=\"18\" class=\"svg-zone\" />\n  <text x=\"910\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">VLAN 20 — Servidores</text>\n  <rect x=\"825\" y=\"145\" width=\"170\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--server\" />\n  <text x=\"910\" y=\"181\" text-anchor=\"middle\" class=\"svg-label\">Servidor interno</text>\n  <rect x=\"825\" y=\"250\" width=\"170\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--security\" />\n  <text x=\"910\" y=\"286\" text-anchor=\"middle\" class=\"svg-label\">SIEM/Logs</text>\n  <line x1=\"242\" y1=\"176\" x2=\"410\" y2=\"176\" class=\"svg-flow\" />\n  <line x1=\"242\" y1=\"281\" x2=\"410\" y2=\"281\" class=\"svg-flow\" />\n  <line x1=\"660\" y1=\"176\" x2=\"825\" y2=\"176\" class=\"svg-flow\" />\n  <line x1=\"660\" y1=\"281\" x2=\"825\" y2=\"281\" class=\"svg-flow\" />\n  <text x=\"326\" y=\"166\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">access 10</text>\n  <text x=\"326\" y=\"271\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">access 10</text>\n  <text x=\"742\" y=\"166\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">access 20</text>\n  <text x=\"742\" y=\"271\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">access 20</text>\n  <rect x=\"410\" y=\"410\" width=\"250\" height=\"76\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n  <text x=\"535\" y=\"440\" text-anchor=\"middle\" class=\"svg-label\">Gateway L3 / Firewall</text>\n  <text x=\"535\" y=\"464\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Roteia entre VLANs com política</text>\n  <line x1=\"535\" y1=\"350\" x2=\"535\" y2=\"408\" class=\"svg-flow animated-flow\" marker-start=\"url(#m03l07-arrow-back)\" marker-end=\"url(#m03l07-arrow)\" />\n  <text x=\"550\" y=\"384\" text-anchor=\"start\" class=\"svg-label svg-label--small\">Trunk 802.1Q (tags 10 e 20)</text>\n  <text x=\"535\" y=\"35\" text-anchor=\"middle\" class=\"svg-label\">VLAN não é firewall: ela separa broadcast; política vem no roteamento/firewall</text>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul>\n<li><strong>Modelo mental:</strong> VLAN é uma sala lógica dentro do switch; limita o broadcast, e a porta entre as salas é o roteamento com política.</li>\n<li><strong>Portas:</strong> access liga um host a uma VLAN, sem tag; trunk leva várias VLANs com tag 802.1Q; frames sem tag no trunk vão para a native VLAN.</li>\n<li><strong>Camada 3:</strong> em geral, uma sub-rede e um gateway por VLAN; falar com outra VLAN exige roteamento inter-VLAN.</li>\n<li><strong>Erro comum:</strong> achar que VLAN é firewall. Ela não filtra, não criptografa e não autentica.</li>\n<li><strong>Segurança:</strong> trunks com VLANs restritas, native VLAN sem hosts, firewall/ACL entre VLANs e documentação.</li>\n</ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>Na próxima aula, você estuda o STP, protocolo que evita loops e broadcast storms em redes com switches redundantes. As VLANs organizam os domínios de broadcast; o STP impede que caminhos redundantes os derrubem com um loop de Camada 2.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2",
      "Camada 3"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet"
    ],
    "relatedProtocols": [
      "Ethernet",
      "IEEE 802.1Q",
      "ARP",
      "IPv4",
      "DHCP",
      "STP"
    ],
    "dependsOn": [
      "Switches",
      "Frame Ethernet",
      "MAC",
      "Broadcast",
      "ARP",
      "Gateway"
    ],
    "enables": [
      "Segmentação de LAN",
      "Inter-VLAN routing",
      "Políticas de firewall",
      "Wi-Fi corporativo",
      "Preparação para STP"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Host recebe IP de sub-rede errada.",
      "Host não recebe DHCP.",
      "Hosts em VLANs diferentes não se comunicam.",
      "Wi-Fi corporativo cai na rede errada.",
      "Servidor acessível por um segmento, mas não por outro."
    ],
    "diagnosticQuestions": [
      "A porta do host está na VLAN correta?",
      "A VLAN existe no switch?",
      "A VLAN está permitida no trunk?",
      "O gateway da VLAN existe e está ativo?",
      "O DHCP/relay está correto?",
      "Há política inter-VLAN bloqueando?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && arp -a && route print",
        "purpose": "Ver IP, gateway, DNS, ARP e rota local.",
        "expectedObservation": "IP e gateway compatíveis com a VLAN esperada.",
        "interpretation": "IP de sub-rede errada sugere VLAN/SSID/DHCP incorreto."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && ip neigh",
        "purpose": "Ver endereços, rota default e vizinhos ARP.",
        "expectedObservation": "Interface na sub-rede correta e gateway resolvido.",
        "interpretation": "Gateway ausente ou vizinho FAILED indica problema local."
      },
      {
        "platform": "Cisco IOS",
        "command": "show vlan brief\nshow interfaces trunk\nshow mac address-table vlan 10\nshow interfaces status",
        "purpose": "Validar VLANs, trunks, MACs e portas.",
        "expectedObservation": "Porta access na VLAN correta e trunk ativo, com a VLAN necessária na lista de permitidas e a mesma native VLAN nas duas pontas.",
        "interpretation": "VLAN não permitida no trunk ou porta na VLAN errada explica isolamento."
      }
    ],
    "decisionTree": [
      {
        "if": "Host pegou IP de sub-rede errada",
        "then": "Verificar VLAN da porta, SSID, DHCP scope e documentação."
      },
      {
        "if": "Host não recebe DHCP",
        "then": "Verificar VLAN, trunk, DHCP server, relay/helper e bloqueios."
      },
      {
        "if": "Hosts na mesma VLAN não se comunicam",
        "then": "Verificar Camada 1, porta, VLAN, tabela MAC, firewall local e ARP."
      },
      {
        "if": "VLANs diferentes não se comunicam",
        "then": "Verificar gateway, rota, firewall/ACL e logs inter-VLAN."
      },
      {
        "if": "Broadcast excessivo em uma VLAN",
        "then": "Procurar loop, dispositivo ruidoso ou rede plana demais com contadores de interface, logs e SPAN/monitoramento autorizado; aplicar STP, storm control ou nova segmentação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Separar redes por função e risco.",
      "Documentar VLAN ID, nome, sub-rede, gateway, dono e finalidade.",
      "Usar portas access para hosts finais.",
      "Aplicar firewall/ACL entre VLANs com menor privilégio e revisar as exceções."
    ],
    "badPractices": [
      "Usar rede plana para tudo.",
      "Permitir todas as VLANs em todos os trunks sem necessidade.",
      "Usar a VLAN padrão de fábrica (VLAN 1) para tudo ou para hosts sensíveis.",
      "Achar que VLAN substitui autenticação, firewall ou monitoramento."
    ],
    "commonErrors": [
      "Colocar servidor na VLAN de usuários.",
      "Configurar porta de AP ou hypervisor sem trunk correto.",
      "Esquecer DHCP relay.",
      "Criar VLAN sem gateway documentado."
    ],
    "vulnerabilities": [
      {
        "name": "Segmentação fraca por roteamento permissivo",
        "description": "VLANs existem, mas o firewall permite qualquer tráfego entre elas.",
        "defensiveExplanation": "O risco não está na VLAN em si, mas na ausência de política efetiva entre segmentos.",
        "mitigation": "Aplicar regras mínimas, logs e revisão periódica."
      },
      {
        "name": "Trunk indevido em porta de usuário",
        "description": "Uma porta que deveria ser access é configurada como trunk.",
        "defensiveExplanation": "Isso aumenta risco de exposição de múltiplos segmentos.",
        "mitigation": "Portas access por padrão, inventário, revisão de configuração e NAC."
      },
      {
        "name": "Native VLAN mal planejada",
        "description": "O trunk usa a VLAN padrão como native VLAN com hosts sensíveis, ou as duas pontas têm native VLANs diferentes.",
        "defensiveExplanation": "Frames sem tag caem na native VLAN; com valores diferentes nas pontas, duas VLANs se misturam sem controle.",
        "mitigation": "Native VLAN dedicada, sem hosts, igual nas duas pontas e documentada."
      },
      {
        "name": "Rede de convidados mal isolada",
        "description": "Visitantes conseguem alcançar ativos internos.",
        "defensiveExplanation": "A separação lógica não foi acompanhada por política e validação.",
        "mitigation": "VLAN de convidados, firewall, bloqueio lateral e testes de validação."
      }
    ],
    "monitoring": [
      "Mudanças de configuração em switches, inclusive criação ou alteração de trunks.",
      "DHCP oferecido em VLANs erradas.",
      "Tráfego inter-VLAN fora do padrão nos logs do firewall."
    ],
    "hardening": [
      "Desabilitar portas não usadas e colocá-las em uma VLAN de estacionamento.",
      "Restringir allowed VLANs em trunks.",
      "Usar DHCP snooping, DAI e port security onde aplicável.",
      "Usar 802.1X/NAC para controle de acesso."
    ],
    "detectionIdeas": [
      "Alertar quando uma porta access vira trunk.",
      "Comparar MAC/IP/VLAN com o inventário para achar MACs inesperados em VLANs sensíveis.",
      "Detectar variações anormais de broadcast por VLAN."
    ]
  },
  "lab": {
    "id": "lab-3.7",
    "title": "Planejando e validando VLANs em uma LAN pequena",
    "labType": "security",
    "objective": "Criar uma segmentação simples com VLANs, portas access, trunk, gateway inter-VLAN e política mínima esperada.",
    "scenario": "Uma empresa pequena precisa separar usuários, servidores, convidados e gerenciamento sem comprar switches separados.",
    "topology": "PC-Usuário -> Switch; Servidor -> Switch; AP/Convidado -> Switch; Switch -> Roteador/Firewall ou Switch L3 por trunk.",
    "architecture": "VLAN 10 usuários, VLAN 20 servidores, VLAN 40 convidados, VLAN 99 gerenciamento; comunicação inter-VLAN apenas via gateway com política.",
    "prerequisites": [
      "Entender Ethernet, switches, ARP, broadcast e gateway.",
      "Ter Cisco Packet Tracer, GNS3, switch de laboratório ou fazer versão conceitual em tabela."
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "Opcional: switch gerenciável de laboratório",
      "Windows/Linux para comandos de validação",
      "Editor de texto para tabela de VLANs"
    ],
    "estimatedTimeMinutes": 45,
    "cost": "zero",
    "safetyNotes": [
      "Use Packet Tracer, GNS3 ou um switch de laboratório isolado; não altere VLANs de uma rede real sem autorização formal.",
      "Não colete nem compartilhe MACs/IPs reais sem sanitização."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir grupos e riscos",
        "instruction": "Liste grupos que não devem ficar no mesmo domínio de broadcast.",
        "command": "Tabela: Usuarios, Servidores, Convidados, Gerenciamento",
        "expectedOutput": "Lista de grupos com finalidade e nível de risco.",
        "explanation": "VLAN deve nascer de necessidade operacional e de segurança, não de numeração aleatória."
      },
      {
        "number": 2,
        "title": "Criar plano de VLANs",
        "instruction": "Crie uma tabela com VLAN ID, nome, sub-rede, gateway e dono.",
        "command": "VLAN 10 Usuarios 192.168.10.0/24 GW 192.168.10.1\nVLAN 20 Servidores 192.168.20.0/24 GW 192.168.20.1\nVLAN 40 Convidados 192.168.40.0/24 GW 192.168.40.1\nVLAN 99 Gerenciamento 192.168.99.0/24 GW 192.168.99.1",
        "expectedOutput": "Tabela coerente de segmentação.",
        "explanation": "Normalmente cada VLAN possui sua própria sub-rede e gateway."
      },
      {
        "number": 3,
        "title": "Configurar VLANs no switch de laboratório",
        "instruction": "No Packet Tracer ou switch autorizado, crie VLANs e nomes.",
        "command": "configure terminal\nvlan 10\n name USUARIOS\nvlan 20\n name SERVIDORES\nvlan 40\n name CONVIDADOS\nvlan 99\n name GERENCIAMENTO",
        "expectedOutput": "VLANs criadas no switch.",
        "explanation": "A criação da VLAN permite associar portas e trunks."
      },
      {
        "number": 4,
        "title": "Configurar portas access",
        "instruction": "Associe as portas dos hosts finais às VLANs corretas. Use duas portas na VLAN 10 para poder testar a comunicação dentro da mesma VLAN.",
        "command": "interface fa0/1\n switchport mode access\n switchport access vlan 10\ninterface fa0/3\n switchport mode access\n switchport access vlan 10\ninterface fa0/2\n switchport mode access\n switchport access vlan 20",
        "expectedOutput": "Portas finais em modo access.",
        "explanation": "Hosts finais não devem receber trunk sem necessidade."
      },
      {
        "number": 5,
        "title": "Configurar trunk controlado",
        "instruction": "Configure o enlace para roteador/firewall/switch L3 permitindo apenas VLANs necessárias.",
        "command": "interface fa0/24\n switchport mode trunk\n switchport trunk allowed vlan 10,20,40,99",
        "expectedOutput": "Trunk ativo com lista restrita de VLANs.",
        "explanation": "Evita carregar VLANs desnecessárias por todo o ambiente."
      },
      {
        "number": 6,
        "title": "Validar configuração",
        "instruction": "Verifique VLANs, trunks e MACs aprendidos.",
        "command": "show vlan brief\nshow interfaces trunk\nshow mac address-table",
        "expectedOutput": "Portas nas VLANs corretas e trunk permitindo VLANs planejadas.",
        "explanation": "Validar evita concluir pela intenção: compare a saída com o plano da etapa 2."
      },
      {
        "number": 7,
        "title": "Testar comunicação esperada",
        "instruction": "Configure IP estático nos hosts conforme o plano (ex.: PCs 192.168.10.11 e 192.168.10.12/24, servidor 192.168.20.10/24) e teste a mesma VLAN e entre VLANs.",
        "command": "ping <gateway-da-vlan>\nping <host-da-mesma-vlan>\nping <host-de-outra-vlan>",
        "expectedOutput": "Ping na mesma VLAN funciona. Sem gateway inter-VLAN configurado, o ping para a outra VLAN falha; se o seu lab tiver gateway (roteador ou switch L3), o resultado depende do roteamento e da política.",
        "explanation": "A falha do ping entre VLANs sem gateway é a evidência de que a VLAN separa a Camada 2; comunicação entre VLANs precisa de L3."
      },
      {
        "number": 8,
        "title": "Registrar evidências sanitizadas",
        "instruction": "Monte relatório com tabela, diagrama, comandos e interpretação.",
        "command": "Relatório: VLAN, porta, trunk, gateway, política, evidência, risco",
        "expectedOutput": "Dossiê técnico sem dados sensíveis reais.",
        "explanation": "Documentação é parte da segurança e do troubleshooting."
      }
    ],
    "expectedResult": "O aluno deve conseguir explicar a segmentação, mostrar quais portas pertencem a cada VLAN, validar trunks e diferenciar separação L2 de política L3/L4.",
    "validation": [
      {
        "check": "VLANs existem",
        "command": "show vlan brief",
        "expected": "VLAN 10, 20, 40 e 99 aparecem com nomes corretos.",
        "ifFails": "Criar VLANs e revisar modo de configuração."
      },
      {
        "check": "Portas access corretas",
        "command": "show vlan brief",
        "expected": "Portas de usuários e servidores aparecem nas VLANs planejadas.",
        "ifFails": "Revisar switchport mode access e switchport access vlan."
      },
      {
        "check": "Trunk controlado",
        "command": "show interfaces trunk",
        "expected": "Trunk permite somente VLANs necessárias.",
        "ifFails": "Revisar allowed VLAN list e estado do enlace."
      },
      {
        "check": "Gateway acessível",
        "command": "ping <gateway-da-vlan>",
        "expected": "Resposta, se houver gateway configurado para a VLAN no seu lab.",
        "ifFails": "Verificar IP, máscara, VLAN, trunk, gateway e firewall."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Host pegou IP da VLAN errada",
        "probableCause": "Porta access ou SSID mapeado para VLAN incorreta.",
        "howToConfirm": "Comparar ipconfig/ip addr com show vlan brief.",
        "fix": "Corrigir VLAN da porta/SSID e renovar DHCP."
      },
      {
        "symptom": "VLAN não atravessa trunk",
        "probableCause": "VLAN não permitida no trunk ou não criada no switch.",
        "howToConfirm": "show interfaces trunk e show vlan brief.",
        "fix": "Criar VLAN e ajustar allowed VLANs."
      },
      {
        "symptom": "Mesmo com VLAN correta, não acessa outra VLAN",
        "probableCause": "Ausência de roteamento inter-VLAN ou bloqueio de firewall.",
        "howToConfirm": "Testar gateway, rota e logs de firewall.",
        "fix": "Configurar gateway/política mínima necessária."
      }
    ],
    "improvements": [
      "Adicionar DHCP relay por VLAN.",
      "Criar regras inter-VLAN por menor privilégio.",
      "Adicionar 802.1X/NAC em portas de usuário."
    ],
    "evidenceToCollect": [
      "Tabela de VLANs",
      "Saídas de show vlan brief, show interfaces trunk e show mac address-table",
      "IP/gateway sanitizados dos hosts e resultado dos pings",
      "Diagrama físico/lógico",
      "Regras inter-VLAN esperadas"
    ],
    "questions": [
      "Por que VLAN limita ARP, e o que isso tem a ver com o ping que falhou entre VLANs?",
      "O que muda entre porta access e trunk na saída de show interfaces trunk?"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma VLAN não deve ser explicada apenas como “uma rede separada”?",
      "hints": [
        "Pense em Camada 2.",
        "Pense em broadcast e ARP."
      ],
      "expectedIdeas": [
        "domínio de broadcast",
        "separação lógica",
        "não é firewall",
        "precisa de gateway para inter-VLAN"
      ],
      "explanation": "A resposta ideal mostra que VLAN separa frames e broadcasts em L2, mas política vem depois."
    },
    {
      "type": "diagnóstico",
      "question": "Dois switches estão ligados por trunk. A VLAN 10 funciona entre eles, mas hosts da VLAN 20 só falam com quem está no mesmo switch. Que hipóteses você testa e com quais evidências?",
      "hints": [
        "Pense na lista de VLANs permitidas no trunk.",
        "Pense em onde a VLAN foi criada."
      ],
      "expectedIdeas": [
        "VLAN 20 fora da allowed list do trunk",
        "VLAN 20 não criada em um dos switches",
        "show interfaces trunk nas duas pontas",
        "show vlan brief"
      ],
      "explanation": "Se uma VLAN passa pelo trunk e outra não, o enlace está ativo; o problema é da VLAN 20: fora da lista de permitidas ou inexistente em um dos switches."
    },
    {
      "type": "cenário real",
      "question": "Um colega configurou native VLAN 1 em uma ponta do trunk e native VLAN 99 na outra. Nada parou de funcionar. Por que isso ainda é um problema?",
      "hints": [
        "O que acontece com um frame sem tag que chega ao trunk?",
        "Em qual VLAN cada switch coloca esse frame?"
      ],
      "expectedIdeas": [
        "frames sem tag vão para a native VLAN",
        "cada ponta coloca o frame em uma VLAN diferente",
        "VLAN 1 e VLAN 99 se misturam",
        "native VLAN igual nas duas pontas e sem hosts"
      ],
      "explanation": "Frames sem tag enviados na VLAN 1 por uma ponta entram na VLAN 99 na outra: duas VLANs se misturam em silêncio, quebrando a segmentação e confundindo o troubleshooting."
    }
  ],
  "quiz": [
    {
      "id": "q3.7.1",
      "question": "Qual é a função principal de uma VLAN?",
      "options": [
        "Criptografar o tráfego entre hosts do mesmo switch",
        "Separar domínios de broadcast em Camada 2",
        "Rotear pacotes entre sub-redes diferentes",
        "Autenticar dispositivos antes de liberar a porta"
      ],
      "answer": 1,
      "explanation": "VLAN separa domínios de broadcast. Ela não criptografa, não autentica e não roteia: o roteamento entre VLANs é feito por roteador, switch L3 ou firewall.",
      "topic": "vlan",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q3.7.2",
      "question": "Qual frase está correta?",
      "options": [
        "VLAN elimina a necessidade de gateway",
        "Porta trunk nunca carrega mais de uma VLAN",
        "Porta access normalmente conecta host final a uma VLAN",
        "Em porta access, o host precisa marcar seus frames com tag 802.1Q"
      ],
      "answer": 2,
      "explanation": "Portas access ligam hosts finais a uma VLAN e recebem frames sem tag. Trunks carregam várias VLANs, e sair da VLAN exige gateway.",
      "topic": "access trunk",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q3.7.3",
      "question": "Um host não recebe DHCP após mover de porta. Qual hipótese inicial é forte?",
      "options": [
        "Porta na VLAN errada ou VLAN sem DHCP/relay",
        "Servidor DNS interno fora do ar",
        "Certificado TLS do servidor expirado",
        "Gateway padrão configurado errado no host"
      ],
      "answer": 0,
      "explanation": "DHCP usa broadcast dentro da VLAN; mudança de porta com DHCP falhando aponta primeiro para a VLAN da porta ou o DHCP/relay. DNS, TLS e gateway só importam depois que o host tem IP.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q3.7.4",
      "question": "Por que VLAN não deve ser tratada como firewall?",
      "options": [
        "Porque VLAN só funciona em redes Wi-Fi",
        "Porque VLAN impede qualquer roteamento entre segmentos",
        "Porque VLAN já filtra portas TCP/UDP entre segmentos",
        "Porque ela separa L2, mas a política entre VLANs depende de roteamento com firewall/ACL"
      ],
      "answer": 3,
      "explanation": "VLAN separa o broadcast. Ela não impede o roteamento nem filtra portas: a comunicação entre VLANs deve ser controlada por política no gateway.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q3.7.5",
      "question": "Qual prática é mais segura para trunks?",
      "options": [
        "Permitir todas as VLANs em todos os trunks",
        "Permitir apenas as VLANs necessárias",
        "Usar trunk em portas de usuários comuns",
        "Usar a VLAN 1 como native VLAN com hosts"
      ],
      "answer": 1,
      "explanation": "Allowed VLAN list restrita reduz a superfície de erro e a exposição. Trunk em porta de usuário e native VLAN com hosts aumentam o risco.",
      "topic": "trunk",
      "difficulty": "intermediário",
      "type": "arquitetura"
    },
    {
      "id": "q3.7.7",
      "question": "Um PC ligado a uma porta access na VLAN 10 envia um frame comum, sem tag. Como o switch sabe a qual VLAN o frame pertence?",
      "options": [
        "Pela native VLAN do trunk mais próximo",
        "Pelo VLAN ID que o PC grava no cabeçalho IP",
        "Pela VLAN configurada na porta access de entrada",
        "Pelo endereço MAC de destino do frame"
      ],
      "answer": 2,
      "explanation": "Em porta access o host não marca o frame: o switch usa a VLAN configurada na porta. A tag 802.1Q só aparece no trunk, e a native VLAN vale para frames sem tag que chegam por trunk.",
      "topic": "access trunk",
      "difficulty": "intermediário",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.7.7",
      "front": "Qual o tamanho da tag 802.1Q e do VLAN ID?",
      "back": "A tag tem 4 bytes; o VLAN ID ocupa 12 bits dentro dela.",
      "tags": [
        "802.1q"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.7.8",
      "front": "O que é native VLAN?",
      "back": "A VLAN dos frames que trafegam sem tag em um trunk 802.1Q. Deve ser igual nas duas pontas e não ter hosts sensíveis.",
      "tags": [
        "trunk"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.7.3",
      "front": "O que é porta access?",
      "back": "Porta associada a uma VLAN para conectar host final sem tagging visível ao host.",
      "tags": [
        "switch"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.7.4",
      "front": "O que é trunk?",
      "back": "Link que transporta múltiplas VLANs, normalmente usando tags 802.1Q.",
      "tags": [
        "trunk"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.7.9",
      "front": "Qual a relação usual entre VLAN e sub-rede?",
      "back": "Normalmente uma sub-rede IP por VLAN, com gateway próprio documentado.",
      "tags": [
        "vlan"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.7.6",
      "front": "O que é roteamento inter-VLAN?",
      "back": "Comunicação entre VLANs diferentes por meio de roteador, switch L3 ou firewall.",
      "tags": [
        "roteamento"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.7.1",
      "type": "conceitual",
      "prompt": "Explique por que ARP de uma VLAN não deve alcançar hosts de outra VLAN.",
      "expectedAnswer": "Porque VLANs separam domínios de broadcast em Camada 2; ARP usa broadcast local e fica limitado ao domínio da VLAN.",
      "explanation": "Essa é uma das funções centrais da segmentação por VLAN."
    },
    {
      "id": "ex3.7.3",
      "type": "diagnóstico",
      "prompt": "Um host na porta Fa0/5 recebeu IP 192.168.20.50, mas deveria ser usuário da VLAN 10. O que verificar?",
      "expectedAnswer": "Verificar VLAN da porta, show vlan brief, DHCP scope, documentação e se a porta foi movida recentemente.",
      "explanation": "O IP de sub-rede errada sugere VLAN/porta/DHCP incorretos."
    },
    {
      "id": "ex3.7.4",
      "type": "segurança",
      "prompt": "Liste três controles além de VLAN para proteger comunicação entre usuários e servidores.",
      "expectedAnswer": "Firewall/ACL inter-VLAN, logs, 802.1X/NAC, menor privilégio, hardening, segmentação adicional e monitoramento.",
      "explanation": "VLAN é base, mas defesa real exige controles adicionais."
    }
  ],
  "challenge": {
    "title": "Segmentar uma filial pequena com VLANs",
    "scenario": "Uma filial possui 30 usuários, 5 servidores locais, Wi-Fi de convidados, 12 câmeras IP e equipamentos de rede gerenciáveis. Hoje tudo está na mesma rede.",
    "tasks": [
      "Criar tabela de VLANs com ID, nome, sub-rede, gateway e dono.",
      "Definir quais portas seriam access e quais seriam trunk.",
      "Indicar política mínima entre VLANs.",
      "Definir evidências de validação.",
      "Listar riscos e mitigações."
    ],
    "constraints": [
      "Convidados não podem acessar redes internas.",
      "Câmeras só podem falar com o gravador.",
      "Gerenciamento deve ser restrito.",
      "A solução deve ser documentável e testável."
    ],
    "expectedDeliverables": [
      "Tabela de VLANs",
      "Diagrama físico/lógico",
      "Lista de trunks e allowed VLANs",
      "Políticas inter-VLAN",
      "Plano de validação",
      "Matriz de riscos"
    ],
    "gradingRubric": [
      {
        "criterion": "Segmentação por função e risco",
        "points": 25,
        "description": "VLANs fazem sentido e reduzem mistura de ativos."
      },
      {
        "criterion": "Política inter-VLAN",
        "points": 25,
        "description": "Comunicação entre segmentos respeita menor privilégio."
      },
      {
        "criterion": "Validação técnica",
        "points": 20,
        "description": "Inclui comandos e evidências concretas."
      },
      {
        "criterion": "Segurança e documentação",
        "points": 20,
        "description": "Inclui riscos, mitigação, logs e sanitização."
      },
      {
        "criterion": "Clareza operacional",
        "points": 10,
        "description": "Plano pode ser entendido e mantido por outra pessoa."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro identificamos grupos com funções e riscos diferentes. Depois criamos VLANs e sub-redes. Em seguida definimos portas access para hosts, trunks restritos entre equipamentos e roteamento/firewall para tráfego necessário. Por fim validamos com comandos e logs.",
    "steps": [
      "Criar VLAN 10 para usuários, VLAN 20 para servidores, VLAN 40 para convidados, VLAN 50 para câmeras e VLAN 99 para gerenciamento.",
      "Associar portas de hosts finais como access.",
      "Configurar trunks apenas entre switch, firewall, AP corporativo ou hypervisor, permitindo só VLANs necessárias.",
      "Definir gateway por VLAN no firewall/switch L3.",
      "Aplicar política: convidados só internet; câmeras só gravador; usuários só serviços necessários; gerenciamento restrito.",
      "Validar com show vlan brief, show interfaces trunk, ping gateway, logs e testes controlados."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar todos na VLAN 1 e bloquear depois no antivírus.",
        "whyItIsWrong": "Não reduz broadcast nem cria segmentação de rede."
      },
      {
        "answer": "Criar VLANs, mas liberar any-any no firewall.",
        "whyItIsWrong": "A segmentação vira apenas organização, sem controle efetivo de comunicação."
      },
      {
        "answer": "Configurar todas as portas como trunk.",
        "whyItIsWrong": "Aumenta risco operacional e exposição desnecessária."
      }
    ],
    "finalAnswer": "Uma solução adequada combina VLANs por função, trunks mínimos, gateway/firewall para inter-VLAN, DHCP por segmento, logs, documentação e validação. VLAN separa L2; política controla L3/L4/L7."
  },
  "glossary": [
    {
      "term": "VLAN",
      "shortDefinition": "LAN virtual que separa domínios de broadcast em Camada 2.",
      "longDefinition": "Segmentação lógica em switches Ethernet que permite organizar hosts em redes locais distintas usando a mesma infraestrutura física.",
      "example": "VLAN 10 para usuários e VLAN 20 para servidores.",
      "relatedTerms": [
        "802.1Q",
        "trunk",
        "access port",
        "broadcast domain"
      ],
      "relatedLessons": [
        "3.4",
        "3.7",
        "4.1"
      ]
    },
    {
      "term": "802.1Q",
      "shortDefinition": "Padrão de marcação de VLAN em frames Ethernet.",
      "longDefinition": "Adiciona uma tag ao frame em links trunk para identificar a VLAN.",
      "example": "Um trunk entre switches carrega VLANs 10, 20 e 99 com tags 802.1Q.",
      "relatedTerms": [
        "tag",
        "trunk",
        "VLAN ID"
      ],
      "relatedLessons": [
        "3.7",
        "3.8"
      ]
    },
    {
      "term": "Porta access",
      "shortDefinition": "Porta de switch associada a uma única VLAN para host final.",
      "longDefinition": "Modo de porta usado normalmente para computadores, impressoras, câmeras ou telefones, onde o switch classifica o tráfego em uma VLAN específica.",
      "example": "Fa0/1 configurada como access vlan 10.",
      "relatedTerms": [
        "switchport",
        "VLAN"
      ],
      "relatedLessons": [
        "3.7"
      ]
    },
    {
      "term": "Porta trunk",
      "shortDefinition": "Porta que transporta múltiplas VLANs.",
      "longDefinition": "Usada entre switches, roteadores, firewalls, APs corporativos ou hypervisors para carregar tráfego marcado de diferentes VLANs.",
      "example": "Fa0/24 trunk permitido para VLANs 10,20,40,99.",
      "relatedTerms": [
        "802.1Q",
        "native VLAN"
      ],
      "relatedLessons": [
        "3.7",
        "3.8"
      ]
    },
    {
      "term": "Native VLAN",
      "shortDefinition": "VLAN atribuída aos frames sem tag em um trunk 802.1Q.",
      "longDefinition": "Configuração do trunk que define em qual VLAN entram os frames recebidos sem tag; deve ser igual nas duas pontas.",
      "example": "Trunk Fa0/24 com native VLAN 999, sem nenhuma porta access nela.",
      "relatedTerms": [
        "802.1Q",
        "trunk"
      ],
      "relatedLessons": [
        "3.7"
      ]
    },
    {
      "term": "Domínio de broadcast",
      "shortDefinition": "Conjunto de hosts que recebe o mesmo broadcast de Camada 2.",
      "longDefinition": "Em redes com VLAN, cada VLAN forma seu próprio domínio de broadcast.",
      "example": "ARP Request da VLAN 10 não deve alcançar hosts da VLAN 20.",
      "relatedTerms": [
        "ARP",
        "broadcast",
        "VLAN"
      ],
      "relatedLessons": [
        "3.4",
        "3.5",
        "3.7"
      ]
    },
    {
      "term": "Roteamento inter-VLAN",
      "shortDefinition": "Comunicação entre VLANs por Camada 3.",
      "longDefinition": "Processo em que roteador, switch L3 ou firewall encaminha tráfego entre sub-redes associadas a VLANs diferentes.",
      "example": "Usuário da VLAN 10 acessa servidor da VLAN 20 por meio do firewall.",
      "relatedTerms": [
        "gateway",
        "firewall",
        "ACL"
      ],
      "relatedLessons": [
        "2.5",
        "3.7",
        "4.1"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.1Q — Bridges and Bridged Networks",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_1Q-2022.html",
      "note": "Referência do padrão de VLAN tagging e bridging."
    },
    {
      "type": "internal-course",
      "title": "Modelo OSI — Camada 2",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m02/lesson-2.4",
      "note": "Base conceitual para frames, MAC e switches."
    },
    {
      "type": "internal-course",
      "title": "ARP: transformando IPv4 em MAC",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m03/lesson-3.5",
      "note": "Mostra por que broadcast local precisa ser controlado."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e plataformas internas",
      "lesson": "NetworkPolicy e segmentação",
      "reason": "VLANs ensinam segmentação em rede física; Kubernetes e cloud aplicam raciocínio semelhante em camadas diferentes."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust e controle de acesso",
      "lesson": "Acesso baseado em identidade",
      "reason": "VLAN não autentica identidade; IAM e Zero Trust complementam segmentação de rede."
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
      "3.8"
    ]
  }
};
