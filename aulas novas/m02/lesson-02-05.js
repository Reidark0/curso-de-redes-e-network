export const lesson0205 = {
  "id": "2.5",
  "moduleId": "m02",
  "order": 5,
  "title": "Camada 3 — Rede: IP, roteamento, gateway e TTL",
  "subtitle": "A camada que leva pacotes entre redes com endereços IP, tabelas de rotas, gateways e TTL.",
  "duration": "90-130 min",
  "estimatedStudyTimeMinutes": 130,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 205,
  "tags": [
    "redes",
    "modelo osi",
    "camada 3",
    "ip",
    "roteamento",
    "gateway",
    "ttl",
    "traceroute",
    "cloud networking",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 apresentou o Modelo OSI como ferramenta de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "A aula 2.2 explicou encapsulamento e mostrou o pacote como PDU da Camada 3."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.4",
      "reason": "A aula 2.4 explicou a entrega local por frames, MAC, switch, VLAN e ARP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.9",
      "reason": "A aula 1.9 apresentou comandos iniciais de diagnóstico como ipconfig, ping, tracert e nslookup."
    }
  ],
  "objectives": [
    "Explicar o papel da Camada 3 no Modelo OSI.",
    "Diferenciar IP, máscara, rede local, gateway, rota e TTL.",
    "Descrever como um host decide se envia localmente ou para o gateway.",
    "Interpretar tabela de rotas e rota default em nível introdutório.",
    "Relacionar Camada 3 com cloud networking, DevSecOps, segurança e troubleshooting.",
    "Coletar evidências básicas com Windows, Linux e Cisco IOS."
  ],
  "learningOutcomes": [
    "Dado um IP e uma máscara, o aluno identifica se o destino está na mesma rede ou exige gateway.",
    "Dado um sintoma de alcance remoto, o aluno verifica gateway, rota e caminho antes de culpar DNS ou aplicação.",
    "Dado um traceroute, o aluno entende que TTL revela saltos intermediários de forma aproximada.",
    "Dado um cenário cloud, o aluno reconhece que subnet, route table e gateway são peças de Camada 3.",
    "Dado um risco de movimento lateral, o aluno explica como rotas e segmentação influenciam o impacto."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>A Camada 2 entrega quadros dentro de uma rede local. Ela não explica como um notebook na sua LAN chega a um servidor em outra filial, a um site na internet ou a uma API em cloud. Isso é trabalho da Camada 3: endereçamento lógico (IP), decisão de caminho (rotas e gateway) e limite de vida do pacote (TTL).</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um usuário pinga o gateway local, mas não acessa sistemas em outra filial. A placa funciona, a VLAN parece correta e o switch aprendeu o MAC. O problema provavelmente não é Camada 1 nem 2: é hora de investigar IP, máscara, gateway, tabela de rotas, firewall e caminho entre redes.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Se todos os dispositivos do mundo dependessem só de MAC e broadcast, a rede global seria inviável: excesso de broadcast, nenhuma hierarquia, nenhuma sumarização e pouco controle. O MAC identifica uma interface dentro de um enlace; ele não diz <em>onde</em> o host está. O IP nasceu, como parte da arquitetura da internet, para resolver isso: ele indica a posição do host numa estrutura lógica de redes e sub-redes, o que permite conectar LANs, WANs, datacenters, provedores e nuvens.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Endereçamento lógico:</strong> identificar redes e hosts de forma hierárquica.</li>\n    <li><strong>Decisão de caminho:</strong> escolher para onde enviar pacotes destinados a outras redes.</li>\n    <li><strong>Controle de loops:</strong> o TTL impede que um pacote circule para sempre.</li>\n  </ul>\n  <p>Com a Camada 3 mal configurada, o host acessa a LAN mas não sai dela, duas sub-redes não se comunicam ou a VPN conecta mas não alcança os sistemas.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> Camada 3 (Rede) é a camada que usa endereços lógicos, como o IP, para levar pacotes entre redes diferentes por meio de roteadores, gateways e tabelas de rotas. Em TCP/IP, o protocolo dessa função é o IP (IPv4 e IPv6).</div>\n  <p>O host não precisa conhecer os caminhos da internet. Ele precisa saber quatro coisas: seu IP, sua máscara (que define qual é a rede local), seu gateway padrão (para onde mandar o que não é local) e, se houver, outras rotas locais. Cada roteador no caminho consulta a própria tabela de rotas e decide só o <strong>próximo salto</strong>.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Peça</th><th>O que é</th><th>Exemplo</th></tr></thead>\n    <tbody>\n      <tr><td>IP</td><td>Endereço lógico do host</td><td><code>192.168.1.50</code></td></tr>\n      <tr><td>Máscara</td><td>Define quantos bits são da rede; separa local de remoto</td><td><code>/24</code> = <code>255.255.255.0</code></td></tr>\n      <tr><td>Rede local</td><td>IP + máscara</td><td><code>192.168.1.0/24</code></td></tr>\n      <tr><td>Gateway padrão</td><td>Roteador usado para destinos fora da rede local</td><td><code>192.168.1.1</code></td></tr>\n      <tr><td>Rota default</td><td>Rota usada quando nenhuma outra combina; aponta para o gateway</td><td><code>0.0.0.0/0 via 192.168.1.1</code></td></tr>\n      <tr><td>TTL</td><td>Contador de vida do pacote, decrementado a cada roteador</td><td>Chegou a 0: descarte</td></tr>\n    </tbody>\n  </table></div>\n  <p>Dois limites para guardar desde já: o IP <strong>não garante entrega</strong> (isso fica com a Camada 4 e acima), e <strong>roteamento não é autorização</strong>: alcançar uma rede não significa ter permissão para acessar seus serviços.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <h3>O caminho de um pacote, passo a passo</h3>\n  <ol class=\"flow-list\">\n    <li>O host aplica a máscara ao próprio IP e ao IP de destino para saber se o destino está na mesma sub-rede. <em>Falha típica: máscara errada faz o host tratar destino remoto como local, ou local como remoto.</em></li>\n    <li>Destino na mesma sub-rede: entrega local, via ARP e Camada 2.</li>\n    <li>Destino fora da sub-rede: o host consulta as próprias rotas; na maioria dos hosts só existe a default, que envia o pacote ao gateway padrão. Para isso ainda precisa do MAC do gateway, descoberto via ARP. <em>Falha típica: gateway ausente ou errado impede a saída da rede local.</em></li>\n    <li>O gateway recebe o frame, remove o encapsulamento de Camada 2 e analisa o pacote IP.</li>\n    <li>O roteador consulta a tabela de rotas e escolhe a rota <strong>mais específica</strong> (maior prefixo) que combina com o destino. <em>Falha típica: rota ausente ou errada manda o tráfego para o caminho indevido.</em></li>\n    <li>O TTL é decrementado. Se chegar a zero, o pacote é descartado e o roteador pode devolver um ICMP Time Exceeded. <em>Falha típica: loop de roteamento gera perda e respostas de TTL expirado.</em></li>\n    <li>O roteador reencapsula o pacote num novo frame de Camada 2 para o próximo salto.</li>\n    <li>O processo se repete até a rede de destino, ou até o descarte por rota ausente, política ou falha. A resposta faz o caminho inverso e precisa de <strong>rota de retorno</strong>. <em>Falha típica: a ida funciona, mas a rota ou o firewall de volta falha.</em></li>\n  </ol>\n  <p>Ponto-chave: os IPs de origem e destino normalmente permanecem de ponta a ponta, enquanto os MACs mudam a cada enlace.</p>\n\n  <h3>Campos do cabeçalho IPv4 usados nessas decisões</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Campo</th><th>Tamanho</th><th>Função</th><th>Observação de segurança</th></tr></thead>\n    <tbody>\n      <tr><td>Source IP</td><td>32 bits</td><td>Endereço lógico de origem</td><td>Pode ser falsificado em alguns cenários; filtros anti-spoofing reduzem o risco.</td></tr>\n      <tr><td>Destination IP</td><td>32 bits</td><td>Endereço lógico de destino; base da decisão de rota</td><td>Firewalls e roteamento avaliam este campo.</td></tr>\n      <tr><td>TTL</td><td>8 bits</td><td>Limita a vida do pacote e evita loops infinitos</td><td>Viabiliza o traceroute, mas também revela parte do caminho.</td></tr>\n      <tr><td>Protocol</td><td>8 bits</td><td>Indica o protocolo acima: TCP, UDP ou ICMP</td><td>Usado em filtros, logs e investigação.</td></tr>\n    </tbody>\n  </table></div>\n\n  <h3>Lendo uma tabela de rotas</h3>\n  <p>Exemplo de saída de <code>ip route</code> num host Linux com IP <code>192.168.1.50/24</code>:</p>\n  <pre class=\"code-block\"><code>default via 192.168.1.1 dev eth0\n10.0.0.0/8 via 192.168.1.254 dev eth0\n192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.50</code></pre>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Destino</th><th>Rotas que combinam</th><th>Escolhida (mais específica)</th><th>Resultado</th></tr></thead>\n    <tbody>\n      <tr><td><code>192.168.1.80</code></td><td>/24 e default</td><td><code>192.168.1.0/24</code></td><td>Entrega local (rede conectada)</td></tr>\n      <tr><td><code>10.20.30.40</code></td><td>/8 e default</td><td><code>10.0.0.0/8</code></td><td>Envia para <code>192.168.1.254</code></td></tr>\n      <tr><td><code>8.8.8.8</code></td><td>só a default</td><td><code>0.0.0.0/0</code></td><td>Envia para o gateway <code>192.168.1.1</code></td></tr>\n    </tbody>\n  </table></div>\n  <p>No Windows, o equivalente é <code>route print</code> (a default aparece como destino <code>0.0.0.0</code> com máscara <code>0.0.0.0</code>); no Cisco IOS, <code>show ip route</code>, que mostra rotas conectadas, estáticas e dinâmicas.</p>\n\n  <h3>Como o traceroute usa o TTL</h3>\n  <p>O traceroute (<code>tracert</code> no Windows) envia sondas com TTL 1, depois 2, depois 3, e assim por diante. Cada roteador em que o TTL chega a zero devolve um ICMP Time Exceeded, e assim aparece como um salto na lista. Um asterisco significa só que aquele salto não respondeu: ele pode filtrar ICMP. Por isso o traceroute é evidência parcial: pode ser bloqueado, incompleto ou assimétrico (a volta pode seguir outro caminho), e em cloud parte do caminho físico é abstraída pelo provedor.</p>\n\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>\"Pinguei o gateway, então a internet funciona.\"</strong> O gateway é o primeiro salto e costuma responder mesmo quando as rotas externas falham. Valide em etapas: gateway, rota, caminho, DNS, porta e aplicação.</li>\n      <li><strong>Confundir gateway com DNS.</strong> Os dois aparecem juntos na configuração, mas o gateway encaminha tráfego e o DNS traduz nomes. Trocar um quando o problema é o outro não resolve.</li>\n      <li><strong>Esquecer a rota de retorno.</strong> O teste foca a ida; o pacote chega, mas a resposta não volta. Valide rotas e políticas nos dois sentidos.</li>\n      <li><strong>Tratar o traceroute como mapa absoluto.</strong> Ele é evidência parcial, como visto acima.</li>\n    </ul>\n  </div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <ul class=\"flow-list\">\n    <li><strong>Host:</strong> IP, máscara, gateway e rotas locais.</li>\n    <li><strong>Gateway padrão:</strong> primeiro roteador para destinos fora da rede local (pode ser um roteador, um firewall ou uma SVI de switch de Camada 3).</li>\n    <li><strong>Roteador/firewall:</strong> encaminha ou bloqueia pacotes entre redes.</li>\n    <li><strong>Tabela de rotas:</strong> define qual próximo salto atende cada destino. Rotas podem ser conectadas (redes da própria interface), estáticas (configuradas à mão, sujeitas a erro e difíceis de escalar) ou dinâmicas (aprendidas por protocolos de roteamento como OSPF e, entre redes autônomas na internet, BGP).</li>\n    <li><strong>Cloud:</strong> subnets, route tables, Internet Gateway, NAT Gateway, VPN Gateway e peering, todos definidos por software.</li>\n  </ul>\n  <p>É na Camada 3 que conectividade e política se encontram. Um caminho pode existir tecnicamente e ainda assim ser bloqueado por firewall, ACL, security group, NSG ou NetworkPolicy.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense numa cidade. A Camada 2 é a entrega dentro de um condomínio: basta saber o bloco e o apartamento. A Camada 3 é o sistema de endereços e estradas entre bairros e cidades. O gateway é a portaria, a saída do condomínio; a tabela de rotas é o mapa que diz qual estrada seguir; o TTL é um limite de tentativas para que uma entrega perdida não circule para sempre.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> ninguém planeja a viagem inteira: cada roteador decide só o próximo salto, e a volta pode seguir outro caminho.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu notebook tem IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. Ao acessar outro dispositivo em <code>192.168.1.80</code>, o tráfego é local. Ao acessar <code>8.8.8.8</code>, o destino não está em <code>192.168.1.0/24</code>, então o notebook envia o pacote ao gateway.</p>\n  <p>Repare: o frame Ethernet que sai do notebook tem como MAC de destino o MAC do roteador, mas o pacote IP dentro dele tem destino <code>8.8.8.8</code>. O roteador recebe, remove o frame local, decrementa o TTL e encaminha o pacote pelo próximo enlace, dentro de um frame novo.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Numa empresa, usuários, servidores, impressoras, voz, Wi-Fi corporativo, visitantes e gerenciamento costumam ficar em redes diferentes. A comunicação entre elas depende de roteamento <strong>e</strong> de política: a VLAN administrativa acessa o sistema interno, mas a rede de visitantes não deve alcançar servidores.</p>\n  <p>Quando uma filial não acessa o datacenter, o suspeito raramente é só o host: confira a rota para a rede remota, a rota de retorno, se a VPN anuncia essa rede, o firewall e o NAT no caminho. O desafio da aula trabalha exatamente esse caso.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, a Camada 3 aparece em VPC/VNet, subnets, route tables, gateways (Internet, NAT, VPN, Transit Gateway), peering, links dedicados (ExpressRoute, Direct Connect), Network Security Groups e firewalls gerenciados.</p>\n  <p>Erro comum: criar uma VM numa subnet e assumir que ela terá internet ou acesso privado automaticamente. Ela precisa de rota para o gateway adequado e de políticas que permitam o tráfego. Outro erro: criar peering entre redes e esquecer as rotas, o DNS privado ou as regras de retorno.</p>\n  <div class=\"callout callout--warning\"><strong>Custo:</strong> NAT Gateways, firewalls gerenciados, VPNs, links dedicados, tráfego entre zonas e flow logs têm custo recorrente. Uma rota mal desenhada pode mandar tráfego entre zonas ou regiões sem necessidade e aumentar a cobrança.</div>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Uma pipeline que acessa registry privado, cluster Kubernetes, banco interno ou runner self-hosted falha com timeout. Antes de culpar o código, verifique a Camada 3: pode faltar rota, gateway, regra de firewall ou resolução entre redes.</p>\n  <p>Por isso a infraestrutura como código deve declarar subnets, route tables, gateways, peering, security groups <strong>e as rotas de retorno</strong>. Policy as code pode barrar rotas públicas indevidas, subnets expostas e caminhos que violem a segmentação.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m02l05-title m02l05-desc\">\n    <title id=\"m02l05-title\">Camada 3: IP, roteamento, gateway e TTL</title>\n    <desc id=\"m02l05-desc\">Um host envia pacote IP para outra rede usando gateway, roteador, tabela de rotas e redução de TTL a cada salto.</desc>\n    <defs>\n      <marker id=\"m02l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n\n    <rect x=\"35\" y=\"80\" width=\"250\" height=\"330\" rx=\"18\" class=\"svg-zone\"></rect>\n    <text x=\"160\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">Rede local 192.168.10.0/24</text>\n\n    <rect x=\"70\" y=\"165\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"145\" y=\"195\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n    <text x=\"145\" y=\"217\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.50</text>\n\n    <rect x=\"90\" y=\"295\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"165\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"165\" y=\"348\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2</text>\n\n    <rect x=\"350\" y=\"180\" width=\"165\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"432\" y=\"214\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n    <text x=\"432\" y=\"238\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1</text>\n    <text x=\"432\" y=\"260\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rota default</text>\n\n    <rect x=\"590\" y=\"170\" width=\"165\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"672\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text>\n    <text x=\"672\" y=\"229\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela de rotas</text>\n    <text x=\"672\" y=\"252\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TTL -1</text>\n\n    <rect x=\"805\" y=\"145\" width=\"135\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"872\" y=\"179\" text-anchor=\"middle\" class=\"svg-label\">Servidor</text>\n    <text x=\"872\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">203.0.113.20</text>\n\n    <line x1=\"220\" y1=\"200\" x2=\"350\" y2=\"222\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"515\" y1=\"225\" x2=\"590\" y2=\"225\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"755\" y1=\"218\" x2=\"805\" y2=\"195\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n\n    <line x1=\"805\" y1=\"215\" x2=\"755\" y2=\"245\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"590\" y1=\"252\" x2=\"515\" y2=\"252\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"350\" y1=\"250\" x2=\"220\" y2=\"220\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n\n    <rect x=\"330\" y=\"340\" width=\"450\" height=\"145\" rx=\"16\" class=\"content-card\"></rect>\n    <text x=\"555\" y=\"370\" text-anchor=\"middle\" class=\"svg-label\">Decisões da Camada 3</text>\n    <text x=\"360\" y=\"402\" class=\"svg-label svg-label--small\">1. Destino está na minha rede?</text>\n    <text x=\"360\" y=\"428\" class=\"svg-label svg-label--small\">2. Se não estiver, qual é o próximo salto?</text>\n    <text x=\"360\" y=\"454\" class=\"svg-label svg-label--small\">3. Qual rota da tabela combina melhor?</text>\n    <text x=\"360\" y=\"480\" class=\"svg-label svg-label--small\">4. Reduzir TTL e encaminhar ou descartar.</text>\n\n    <text x=\"145\" y=\"455\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2 entrega ao MAC do gateway.</text>\n    <text x=\"650\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 3 escolhe caminhos entre redes.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> a Camada 3 endereça e encaminha pacotes entre redes. Ela responde a duas perguntas: o destino é local? Se não, qual próximo salto recebe o pacote?</li>\n    <li><strong>Como decide:</strong> o host usa IP e máscara para separar local de remoto; o remoto vai ao gateway pela rota default; cada roteador escolhe a rota mais específica e decrementa o TTL.</li>\n    <li><strong>O que lembrar:</strong> o MAC muda a cada enlace; o IP de origem e destino normalmente fica de ponta a ponta.</li>\n    <li><strong>Erro comum:</strong> achar que pingar o gateway prova que a internet ou a rede remota funcionam; esquecer a rota de retorno.</li>\n    <li><strong>Segurança:</strong> rotas definem alcance; alcance sem política amplia o movimento lateral.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 2.6, Camada 4 — Transporte: TCP, UDP, portas e conexões, você verá como, depois que o pacote chega à rede certa, as aplicações usam portas e conexões para entregar os dados ao serviço correto.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3"
    ],
    "tcpIpLayers": [
      "Internet"
    ],
    "relatedProtocols": [
      "IPv4",
      "IPv6",
      "ICMP",
      "ARP",
      "OSPF",
      "BGP"
    ],
    "dependsOn": [
      "Camada 1",
      "Camada 2",
      "encapsulamento",
      "frames",
      "MAC",
      "ARP",
      "métricas"
    ],
    "enables": [
      "roteamento",
      "gateway padrão",
      "traceroute",
      "NAT",
      "VPN",
      "firewall",
      "cloud networking",
      "TCP",
      "UDP"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Host acessa rede local, mas não acessa internet.",
      "Ping no gateway funciona, mas rede remota não responde.",
      "VPN conecta, mas sistemas internos não abrem.",
      "Traceroute para em determinado salto.",
      "Cloud VM não acessa internet ou rede pareada."
    ],
    "diagnosticQuestions": [
      "IP e máscara estão corretos?",
      "Gateway padrão existe e responde?",
      "A rota para o destino existe (e a VPN anuncia a rede remota)?",
      "Há rota de retorno?",
      "Firewall, ACL, SG ou NSG permite o fluxo?",
      "O caminho exige NAT?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print",
        "purpose": "Ver IP, máscara, gateway, DNS e tabela de rotas.",
        "expectedObservation": "Interface com IPv4, máscara e gateway; rota default 0.0.0.0/0 apontando para o gateway.",
        "interpretation": "Sem gateway ou rota default, o host pode ficar preso à rede local."
      },
      {
        "platform": "Windows",
        "command": "tracert 8.8.8.8",
        "purpose": "Observar saltos até um destino externo.",
        "expectedObservation": "Primeiro salto geralmente é o gateway local.",
        "interpretation": "Falha no primeiro salto indica problema local/gateway; falha depois pode indicar rota, firewall ou provedor."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route",
        "purpose": "Ver endereços, máscaras e rotas configuradas.",
        "expectedObservation": "Rota default via gateway apropriado.",
        "interpretation": "A ausência de default via impede saída para destinos fora das rotas conhecidas."
      },
      {
        "platform": "Linux",
        "command": "traceroute 8.8.8.8 || tracepath 8.8.8.8",
        "purpose": "Observar caminho e possíveis limites de MTU/rota.",
        "expectedObservation": "Lista de saltos ou ponto de parada.",
        "interpretation": "A saída é evidência parcial e pode ser filtrada por dispositivos."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief && show ip route",
        "purpose": "Ver interfaces, IPs, estado e tabela de rotas.",
        "expectedObservation": "Interfaces up/up e rotas conectadas, estáticas ou dinâmicas.",
        "interpretation": "Interface down, rota ausente ou rota errada afetam alcance entre redes."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não pinga o gateway",
        "then": "Revisar Camada 1, Camada 2, IP, máscara e VLAN antes de culpar roteamento externo."
      },
      {
        "if": "Gateway responde, mas destino externo não",
        "then": "Verificar rota default, firewall, NAT e caminho upstream."
      },
      {
        "if": "Destino recebe, mas resposta não volta",
        "then": "Verificar rota de retorno, NAT, firewall stateful e políticas no sentido inverso."
      },
      {
        "if": "Traceroute mostra loop ou TTL expirado",
        "then": "Investigar rotas conflitantes, redistribuição incorreta ou rota default circular."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar sub-redes, gateways, rotas e responsáveis.",
      "Segmentar por função e criticidade, com firewall/ACL entre redes sensíveis.",
      "Revisar route tables em mudanças de cloud e VPN.",
      "Sanitizar traceroutes e tabelas de rota antes de compartilhar."
    ],
    "badPractices": [
      "Criar rotas amplas sem justificativa.",
      "Permitir any-any entre segmentos internos.",
      "Assumir que a rede interna é confiável.",
      "Ignorar a rota de retorno em projetos híbridos."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Achar que NAT é firewall.",
      "Diagnosticar DNS antes de validar gateway e rota."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por alcance excessivo",
        "description": "Um host comprometido é usado para descobrir quais redes são alcançáveis. Numa rede plana ou com rotas permissivas (ex.: subnet sensível alcançável a partir da rede de usuários), o atacante chega a muitos segmentos.",
        "defensiveExplanation": "O risco não é só a existência da rota, mas a ausência de política e de monitoramento entre as redes.",
        "mitigation": "Segmentação, firewall interno, ACLs, menor privilégio, flow logs e revisão de rotas com gestão de mudanças."
      },
      {
        "name": "Exposição pública por rota indevida",
        "description": "Uma subnet ou instância pode ganhar entrada ou saída pública por uma rota para o gateway de internet sem os controles adequados.",
        "defensiveExplanation": "Em cloud, route tables e security groups precisam ser avaliados em conjunto: a rota abre o caminho, a política decide o que passa.",
        "mitigation": "Revisão de IaC, policy as code, configuração privada por padrão e alertas de exposição."
      },
      {
        "name": "Revelação de topologia por TTL e traceroute",
        "description": "Cada roteador que zera o TTL responde com ICMP Time Exceeded; por isso um traceroute lista saltos e endereços internos.",
        "defensiveExplanation": "Evidências de diagnóstico sem sanitização, ou respostas ICMP liberadas para fora, revelam parte da topologia.",
        "mitigation": "Sanitizar evidências antes de compartilhar e controlar a exposição externa de respostas ICMP."
      }
    ],
    "monitoring": [
      "Flow logs entre sub-redes.",
      "Alterações de route table.",
      "Conexões incomuns entre segmentos.",
      "Logs de firewall e VPN."
    ],
    "hardening": [
      "Aplicar menor privilégio de rede: remover rotas desnecessárias e bloquear tráfego lateral não justificado.",
      "Usar bastion, private endpoints e ZTNA quando adequado.",
      "Controlar quem pode alterar route tables e gateways."
    ],
    "detectionIdeas": [
      "Comparar fluxos reais com a matriz de comunicação esperada.",
      "Alertar sobre novas rotas para 0.0.0.0/0 em subnets sensíveis.",
      "Detectar varreduras e traceroutes incomuns entre redes internas.",
      "Monitorar ICMP TTL exceeded repetido, indício de loop de roteamento."
    ]
  },
  "lab": {
    "id": "lab-2.5",
    "title": "Coletando evidências de Camada 3: IP, gateway, rotas e TTL",
    "labType": "local",
    "objective": "Identificar configuração IP, gateway, tabela de rotas e caminho básico até um destino externo ou interno, interpretando evidências sem alterar a rede.",
    "scenario": "Você está em um notebook de trabalho ou laboratório e precisa montar um relatório defensivo de Camada 3 para diferenciar problema local, gateway, rota e caminho.",
    "topology": "Host do aluno -> switch/AP -> gateway local -> roteador/firewall/provedor -> destino de teste.",
    "architecture": "Rede local com host configurado por DHCP ou IP estático, gateway padrão e acesso a pelo menos um destino de teste permitido.",
    "prerequisites": [
      "Ter concluído as aulas 2.1 a 2.4.",
      "Ter permissão para executar comandos locais de diagnóstico."
    ],
    "tools": [
      "Windows PowerShell ou Prompt",
      "Terminal Linux",
      "Opcional: Cisco Packet Tracer",
      "Editor de texto para relatório"
    ],
    "estimatedTimeMinutes": 30,
    "cost": "zero",
    "safetyNotes": [
      "Use apenas destinos próprios, públicos de teste ou autorizados.",
      "Não execute scan de portas nem descoberta agressiva.",
      "Não compartilhe IPs públicos, nomes internos ou rotas privadas sem sanitizar.",
      "Em ambiente corporativo, siga a política interna de coleta de evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Coletar IP, máscara e gateway",
        "instruction": "Na interface ativa, identifique IPv4, máscara, gateway padrão e servidores DNS.",
        "command": "ipconfig /all   # Windows\nip addr         # Linux",
        "expectedOutput": "Interface ativa com IPv4, máscara (ou prefixo, como /24), gateway padrão e DNS.",
        "explanation": "Esses dados mostram se o host tem a configuração mínima de Camada 3 para sair da rede local."
      },
      {
        "number": 2,
        "title": "Ler a tabela de rotas",
        "instruction": "Liste a tabela de rotas e localize a rota default e a rota da rede conectada.",
        "command": "route print  # Windows\nip route     # Linux",
        "analysisTask": "Para dois destinos, um IP da sua própria rede e 8.8.8.8, indique qual rota da tabela será usada e qual é o próximo salto.",
        "expectedOutput": "Rota default (0.0.0.0/0 ou default via <gateway>) e rota da rede conectada. O IP local usa a rede conectada; 8.8.8.8 usa a default.",
        "explanation": "A tabela determina o próximo salto de cada destino; quando várias rotas combinam, vence a mais específica."
      },
      {
        "number": 3,
        "title": "Testar alcance do gateway",
        "instruction": "Pingue o gateway identificado, quando ICMP for permitido.",
        "command": "ping <IP_DO_GATEWAY>",
        "expectedOutput": "Respostas com baixa latência, ou indicação de bloqueio se ICMP for filtrado.",
        "explanation": "Se o gateway não responde, investigue Camada 1/2, IP, máscara, VLAN ou política local. Se responde, isso ainda não prova que o caminho até redes remotas existe."
      },
      {
        "number": 4,
        "title": "Observar o caminho pelo TTL",
        "instruction": "Execute traceroute/tracert para um destino permitido.",
        "command": "tracert 8.8.8.8        # Windows\ntraceroute 8.8.8.8     # Linux, se instalado\ntracepath 8.8.8.8      # Linux, alternativa comum",
        "expectedOutput": "Lista de saltos, começando normalmente pelo gateway, ou pontos de filtragem (asteriscos).",
        "explanation": "Cada salto normalmente é um roteador que zerou o TTL da sonda e devolveu ICMP Time Exceeded."
      },
      {
        "number": 5,
        "title": "Registrar a interpretação",
        "instruction": "Monte uma tabela com as colunas evidência, camada, interpretação e hipótese descartada.",
        "analysisTask": "Registre uma linha para cada evidência dos passos 1 a 4. Exemplo: gateway responde ao ping → Camada 3 local ok → descartada a hipótese de IP, máscara ou gateway errados.",
        "expectedOutput": "Relatório com IP, gateway, rota default, teste do gateway e caminho observado.",
        "explanation": "O objetivo é transformar comandos em raciocínio técnico, não apenas colar saídas."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um relatório sanitizado de Camada 3 com IP, máscara, gateway, rota default, teste de caminho e hipóteses de diagnóstico.",
    "validation": [
      {
        "check": "Gateway identificado",
        "command": "ipconfig /all ou ip route",
        "expected": "Gateway padrão/default via presente.",
        "ifFails": "Verificar DHCP, IP estático, interface ativa ou política da rede."
      },
      {
        "check": "Rota default presente",
        "command": "route print ou ip route",
        "expected": "0.0.0.0/0 ou default via gateway.",
        "ifFails": "Sem rota default, o host pode não alcançar destinos externos."
      },
      {
        "check": "Caminho observado",
        "command": "tracert/traceroute/tracepath",
        "expected": "Primeiro salto ou indicação de filtragem.",
        "ifFails": "ICMP pode estar bloqueado; usar evidência alternativa e registrar limite."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Traceroute para no primeiro salto",
        "probableCause": "Gateway sem rota, firewall, NAT ausente ou política upstream.",
        "howToConfirm": "Testar outros destinos e verificar rota default/firewall.",
        "fix": "Corrigir rota, NAT ou política conforme autorização."
      },
      {
        "symptom": "Traceroute mostra asteriscos",
        "probableCause": "Dispositivo não responde ICMP/UDP TTL exceeded ou filtra diagnóstico.",
        "howToConfirm": "Testar com outro protocolo ou validar logs.",
        "fix": "Registrar limitação; não assumir indisponibilidade apenas por asteriscos."
      }
    ],
    "improvements": [
      "Repetir o teste em rede cabeada e Wi-Fi para comparar caminhos.",
      "Comparar com a route table de uma cloud ou de um laboratório Packet Tracer."
    ],
    "evidenceToCollect": [
      "IP e máscara sanitizados.",
      "Gateway padrão.",
      "Rota default.",
      "Resultado do teste ao gateway.",
      "Traceroute/tracert sanitizado.",
      "Interpretação em tabela."
    ],
    "questions": [
      "Qual evidência mostra que o host tem rota para fora da rede local?",
      "Por que o primeiro salto costuma ser o gateway?",
      "Por que traceroute pode estar incompleto mesmo quando a aplicação funciona?"
    ],
    "challenge": "Explique por que uma VM em cloud com IP privado pode não acessar a internet mesmo tendo DNS configurado.",
    "solution": "DNS apenas traduz nomes. Para sair para a internet, a VM precisa de rota adequada para NAT Gateway, firewall ou Internet Gateway, além de políticas permitindo o tráfego e rota de retorno. Em subnets privadas, a ausência de NAT/rota ou bloqueio por security group/NSG impede o acesso."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que a Camada 3 precisou existir se a Camada 2 já entrega quadros?",
      "hints": [
        "Pense em redes diferentes.",
        "Pense em broadcast e escala."
      ],
      "expectedIdeas": [
        "endereçamento lógico",
        "roteamento",
        "gateway",
        "escala",
        "internet"
      ],
      "explanation": "Camada 2 resolve entrega local; Camada 3 permite atravessar redes diferentes de forma hierárquica."
    },
    {
      "type": "diagnóstico",
      "question": "Um host pinga o gateway, mas não acessa uma rede remota. O que você verificaria em seguida?",
      "hints": [
        "Pense em rota default.",
        "Pense em rota de retorno e firewall."
      ],
      "expectedIdeas": [
        "route print/ip route",
        "traceroute",
        "firewall",
        "NAT",
        "rota de retorno"
      ],
      "explanation": "O gateway local responder não prova que existe caminho completo até a rede remota."
    },
    {
      "type": "diagnóstico",
      "question": "Um host 192.168.10.50 foi configurado por engano com máscara /16 em vez de /24. Ele acessa a internet, mas não alcança o servidor 192.168.20.10, que fica em outra sub-rede /24 atrás do roteador. Por quê?",
      "hints": [
        "Aplique a máscara /16 aos dois endereços.",
        "Pense no que o host faz quando acha que o destino é local."
      ],
      "expectedIdeas": [
        "com /16, 192.168.20.10 parece estar na rede local",
        "o host tenta ARP direto pelo servidor em vez de usar o gateway",
        "ninguém responde ao ARP na LAN",
        "8.8.8.8 continua fora da rede e vai ao gateway",
        "corrigir a máscara"
      ],
      "explanation": "Com /16, a rede local vira 192.168.0.0/16 e 192.168.20.10 parece fazer parte dela. O host tenta entregar localmente via ARP, mas o servidor está em outro segmento e não responde. Destinos como 8.8.8.8 continuam fora da /16 e seguem para o gateway, por isso a internet funciona."
    }
  ],
  "quiz": [
    {
      "id": "q2.5.1",
      "question": "Qual é a principal função da Camada 3 no Modelo OSI?",
      "options": [
        "Entregar quadros dentro da rede local usando endereços MAC.",
        "Encaminhar pacotes entre redes usando endereços lógicos (IP).",
        "Garantir a entrega confiável dos dados com confirmações e retransmissões.",
        "Traduzir nomes de domínio em endereços IP."
      ],
      "answer": 1,
      "explanation": "A Camada 3 trata endereçamento lógico e roteamento entre redes. Entrega local por MAC é Camada 2, entrega confiável fica com a Camada 4 (o IP não garante entrega) e tradução de nomes é papel do DNS.",
      "topic": "camada 3",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.5.2",
      "question": "Um host acessa outro dispositivo na mesma LAN, mas não alcança 8.8.8.8 nem pelo IP. Qual item de Camada 3 deve ser verificado cedo?",
      "options": [
        "Servidor DNS configurado no host.",
        "Tabela MAC do switch de acesso.",
        "Gateway padrão e rota default.",
        "Rota da rede local conectada."
      ],
      "answer": 2,
      "explanation": "A entrega local funciona, então a Camada 2 e a rota da rede conectada estão ok; como o teste é por IP, DNS não explica a falha. Sem gateway ou rota default, o host fica limitado à rede local.",
      "topic": "gateway",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q2.5.3",
      "question": "Qual afirmação diferencia MAC e IP corretamente?",
      "options": [
        "O MAC é usado na entrega dentro de cada enlace; o IP identifica origem e destino lógicos entre redes.",
        "O IP substitui o MAC quando o destino está na mesma LAN.",
        "O MAC de destino permanece o mesmo do host até o servidor final.",
        "O IP de destino muda a cada roteador, enquanto o MAC fica fixo."
      ],
      "answer": 0,
      "explanation": "MAC e IP coexistem no encapsulamento: o frame (e seus MACs) é refeito a cada enlace, enquanto o IP de destino normalmente fica de ponta a ponta.",
      "topic": "mac vs ip",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q2.5.4",
      "question": "Por que uma rede plana, com rotas amplas entre segmentos, aumenta o risco?",
      "options": [
        "Porque o excesso de rotas impede a autenticação dos usuários.",
        "Porque rotas amplas desativam os firewalls entre as redes.",
        "Porque o TTL dos pacotes expira mais rápido em redes grandes.",
        "Porque um host comprometido alcança muitos segmentos, o que facilita o movimento lateral."
      ],
      "answer": 3,
      "explanation": "Rotas definem alcance. Quanto maior o alcance sem política entre segmentos, maior o impacto de um comprometimento.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q2.5.7",
      "question": "A tabela de um roteador tem 10.0.0.0/8 via R1, 10.20.0.0/16 via R2 e 0.0.0.0/0 via R3. Para onde vai um pacote destinado a 10.20.5.5?",
      "options": [
        "Para R1, porque 10.0.0.0/8 foi a primeira rota da tabela que combinou.",
        "Para R2, porque 10.20.0.0/16 é a rota mais específica que combina.",
        "Para R3, porque destinos fora da rede local sempre usam a rota default.",
        "Para R1 e R2 ao mesmo tempo, dividindo a carga."
      ],
      "answer": 1,
      "explanation": "As três rotas combinam com 10.20.5.5, mas vence a de maior prefixo (/16). A default (/0) só é usada quando nenhuma outra combina.",
      "topic": "tabela de rotas",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.5.6",
      "question": "O que o TTL ajuda a evitar?",
      "options": [
        "Fragmentação de pacotes maiores que o MTU.",
        "Perda de pacotes por congestionamento no enlace.",
        "Pacotes circulando indefinidamente em loops de roteamento.",
        "Entrega de pacotes ao MAC de destino errado."
      ],
      "answer": 2,
      "explanation": "Cada roteador decrementa o TTL; ao chegar a zero, o pacote é descartado. É o mesmo mecanismo que o traceroute explora para descobrir os saltos.",
      "topic": "ttl",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.5.1",
      "front": "O que é gateway padrão?",
      "back": "É o próximo salto usado por um host para alcançar destinos fora da rede local.",
      "tags": [
        "gateway",
        "camada 3"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.2",
      "front": "O que a tabela de rotas decide?",
      "back": "Qual próximo salto ou interface usar para alcançar um destino IP. Quando várias rotas combinam, vence a mais específica (maior prefixo).",
      "tags": [
        "rotas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.7",
      "front": "O que acontece quando o TTL chega a zero?",
      "back": "O roteador descarta o pacote e pode devolver ICMP Time Exceeded. O traceroute usa isso para descobrir cada salto.",
      "tags": [
        "ttl",
        "traceroute"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.4",
      "front": "MAC muda a cada salto roteado?",
      "back": "Sim, o encapsulamento de Camada 2 muda a cada enlace; IP de origem/destino normalmente permanece.",
      "tags": [
        "mac",
        "ip"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.5.5",
      "front": "DNS resolve problema de rota?",
      "back": "Não. DNS traduz nomes; rota/gateway determinam caminho de rede.",
      "tags": [
        "dns",
        "roteamento"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.6",
      "front": "Conectividade é autorização?",
      "back": "Não. Alcançar uma rede não significa ter permissão para acessar serviços.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex2.5.5",
      "type": "conceitual",
      "prompt": "Seu notebook 192.168.1.50/24, com gateway 192.168.1.1, acessa 8.8.8.8. No frame que sai do notebook, qual é o MAC de destino e qual é o IP de destino? O que muda depois que o roteador encaminha o pacote?",
      "expectedAnswer": "MAC de destino: o MAC do gateway 192.168.1.1, descoberto via ARP. IP de destino: 8.8.8.8. Depois do roteador, o frame é novo (MACs do próximo enlace), o IP de destino continua 8.8.8.8 e o TTL foi decrementado em 1.",
      "explanation": "O frame de Camada 2 é refeito a cada enlace; o IP de destino fica de ponta a ponta. (Num roteador doméstico com NAT o IP de origem muda, por isso a pergunta trata só do destino.)"
    },
    {
      "id": "ex2.5.2",
      "type": "diagnóstico",
      "prompt": "Um host tem IP 192.168.10.50/24 e quer acessar 192.168.20.10. O destino é local? O que o host deve usar?",
      "expectedAnswer": "Não é local, pois está em outra rede /24. O host deve enviar ao gateway padrão.",
      "explanation": "192.168.10.0/24 e 192.168.20.0/24 são redes diferentes."
    },
    {
      "id": "ex2.5.6",
      "type": "comando/output",
      "prompt": "Um host tem esta tabela: default via 10.1.1.1; 172.16.0.0/16 via 10.1.1.254; 10.1.1.0/24 conectada. Para 172.16.5.9, 10.1.1.77 e 1.1.1.1, qual rota vence e qual é o próximo salto?",
      "expectedAnswer": "172.16.5.9: rota 172.16.0.0/16, próximo salto 10.1.1.254. 10.1.1.77: rede conectada 10.1.1.0/24, entrega local via ARP. 1.1.1.1: só a default combina, próximo salto 10.1.1.1.",
      "explanation": "Vence a rota mais específica que combina com o destino; a default só é usada quando nenhuma outra combina."
    }
  ],
  "challenge": {
    "title": "Filial acessa internet, mas não acessa sistema no datacenter",
    "scenario": "Uma filial usa a rede 10.20.10.0/24. Os usuários acessam a internet normalmente, mas não conseguem acessar o sistema 10.50.30.20 no datacenter. O gateway local responde. O DNS resolve o nome do sistema para o IP correto.",
    "tasks": [
      "Listar hipóteses de Camada 3 em ordem lógica.",
      "Indicar comandos ou evidências para validar cada hipótese.",
      "Separar problema de rota, firewall, NAT e rota de retorno.",
      "Propor mitigação operacional e melhoria de documentação."
    ],
    "constraints": [
      "Não executar varredura de portas.",
      "Não alterar configuração de roteadores ou firewalls.",
      "Sanitizar evidências antes de compartilhar.",
      "Trabalhar apenas com comandos de diagnóstico autorizados."
    ],
    "expectedDeliverables": [
      "Tabela de hipóteses e evidências.",
      "Diagrama lógico simples do caminho.",
      "Lista de comandos.",
      "Resumo executivo para equipe de rede/segurança."
    ],
    "gradingRubric": [
      {
        "criterion": "Ordem de diagnóstico",
        "points": 30,
        "description": "Verifica IP local, gateway, rota, caminho, firewall e retorno sem pular etapas."
      },
      {
        "criterion": "Evidências corretas",
        "points": 30,
        "description": "Usa route print/ip route, traceroute e logs adequados."
      },
      {
        "criterion": "Segurança e ética",
        "points": 20,
        "description": "Evita scans e sanitiza informações."
      },
      {
        "criterion": "Clareza do relatório",
        "points": 20,
        "description": "Comunica achados e próximos passos de forma objetiva."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Como internet funciona e DNS resolve, a falha provavelmente está no caminho específico para 10.50.30.20, em política ou em retorno. O diagnóstico deve validar primeiro se a filial possui rota para 10.50.30.0/24 ou rota via VPN/MPLS, depois onde o caminho para, e então se firewall/NAT/retorno bloqueiam.",
    "steps": [
      "Confirmar IP, máscara e gateway do host.",
      "Verificar tabela de rotas local.",
      "Executar traceroute/tracert para 10.50.30.20 se autorizado.",
      "Validar se gateway/firewall da filial conhece a rota para o datacenter.",
      "Validar rota de retorno do datacenter para 10.20.10.0/24.",
      "Checar políticas de firewall/ACL entre filial e datacenter.",
      "Registrar evidências sanitizadas e encaminhar para equipe responsável."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Trocar DNS imediatamente.",
        "whyItIsWrong": "O enunciado diz que DNS resolve corretamente; o problema está depois da tradução de nome."
      },
      {
        "answer": "Concluir que o servidor está fora sem validar rota.",
        "whyItIsWrong": "A falha pode estar em caminho, firewall ou retorno."
      },
      {
        "answer": "Fazer scan agressivo no datacenter.",
        "whyItIsWrong": "Além de não ser necessário, pode violar política e gerar alerta de segurança."
      }
    ],
    "finalAnswer": "A hipótese principal é falha de rota/política entre a rede 10.20.10.0/24 e o datacenter 10.50.30.0/24, incluindo rota ausente, firewall bloqueando ou rota de retorno inexistente. A solução é coletar evidências de Camada 3, validar caminho e acionar a equipe responsável com relatório claro."
  },
  "glossary": [
    {
      "term": "Camada 3",
      "shortDefinition": "Camada de rede responsável por endereçamento lógico e encaminhamento entre redes.",
      "example": "IPv4 encaminhado de uma LAN para a internet via gateway.",
      "relatedTerms": [
        "IP",
        "roteamento",
        "gateway"
      ],
      "relatedLessons": [
        "2.1",
        "2.2",
        "2.5"
      ]
    },
    {
      "term": "Gateway padrão",
      "shortDefinition": "Próximo salto usado para destinos fora da rede local.",
      "example": "192.168.1.1 em uma rede doméstica.",
      "relatedTerms": [
        "rota default",
        "roteador"
      ],
      "relatedLessons": [
        "1.9",
        "2.5"
      ]
    },
    {
      "term": "Tabela de rotas",
      "shortDefinition": "Conjunto de destinos e próximos saltos usados para encaminhamento.",
      "example": "default via 192.168.1.1 no Linux.",
      "relatedTerms": [
        "route print",
        "ip route"
      ],
      "relatedLessons": [
        "2.5"
      ]
    },
    {
      "term": "TTL",
      "shortDefinition": "Campo que limita a vida de um pacote IP.",
      "example": "Traceroute explora TTL para descobrir saltos.",
      "relatedTerms": [
        "ICMP",
        "traceroute"
      ],
      "relatedLessons": [
        "2.5"
      ]
    },
    {
      "term": "Rota default",
      "shortDefinition": "Rota usada quando nenhuma rota mais específica combina com o destino.",
      "example": "0.0.0.0/0 via 192.168.1.1.",
      "relatedTerms": [
        "gateway",
        "default via"
      ],
      "relatedLessons": [
        "2.5"
      ]
    },
    {
      "term": "Próximo salto",
      "shortDefinition": "Roteador ou gateway para onde o pacote será enviado em seguida.",
      "example": "Um firewall pode ser o próximo salto para redes remotas.",
      "relatedTerms": [
        "roteamento",
        "gateway"
      ],
      "relatedLessons": [
        "2.5"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.2 Encapsulamento, desencapsulamento e PDUs",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para entender pacote como PDU de Camada 3."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.4 Camada 2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para diferenciar entrega local por MAC e encaminhamento por IP."
    },
    {
      "type": "rfc",
      "title": "Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Referência histórica do IPv4."
    },
    {
      "type": "rfc",
      "title": "Internet Control Message Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc792",
      "note": "Base conceitual para mensagens ICMP usadas em diagnóstico."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud Networking",
      "lesson": "subnets-route-tables",
      "reason": "Route tables, gateways e peering em cloud dependem do raciocínio de Camada 3."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso entre serviços",
      "lesson": "service-to-service-connectivity",
      "reason": "Conectividade de rede não substitui autenticação/autorização, mas é pré-requisito para muitos fluxos de identidade."
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
      "2.6"
    ]
  }
};
