export const lesson0104 = {
  "id": "1.4",
  "moduleId": "m01",
  "order": 4,
  "title": "Topologias físicas e lógicas",
  "subtitle": "Como separar o desenho dos cabos do caminho real do tráfego para diagnosticar, proteger e evoluir redes.",
  "duration": "75-105 min",
  "estimatedStudyTimeMinutes": 105,
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
    "Diferenciar topologia física e topologia lógica sem confundir desenho com comportamento do tráfego.",
    "Reconhecer topologias comuns como estrela, barramento, anel, malha, árvore, hub-and-spoke e spine-leaf.",
    "Relacionar topologia com disponibilidade, custo, desempenho, segurança e troubleshooting.",
    "Entender por que cloud e SDN tornam a topologia física menos visível, mas não irrelevante.",
    "Aprender a mapear uma rede pequena usando observação, comandos e hipóteses verificáveis."
  ],
  "learningOutcomes": [
    "Dado um diagrama simples, o aluno identifica se ele representa topologia física, lógica ou ambas.",
    "Dado um incidente, o aluno consegue levantar hipóteses de ponto único de falha, loop, caminho assimétrico ou gargalo.",
    "Dado um cenário empresarial, o aluno propõe melhorias de topologia com justificativa operacional e de segurança."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine que um usuário diz: “a rede caiu”. Você olha para o rack e vê cabos conectados. Outro colega abre um diagrama antigo e aponta que todos os computadores estão ligados ao mesmo switch. O firewall, porém, mostra que o tráfego está saindo por uma VPN, passando por um proxy, atravessando uma VPC em cloud e voltando para um serviço interno. Qual desenho representa a rede real?</p>\n  <p>A resposta é: depende do que você está tentando entender. O desenho dos cabos mostra uma parte da realidade. O caminho lógico do tráfego mostra outra. A política de firewall mostra outra. A rota em cloud mostra outra. A experiência do usuário junta tudo isso em um sintoma.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> profissionais iniciantes muitas vezes acreditam que topologia é apenas “desenhar bolinhas e linhas”. Em operação, topologia é uma ferramenta de diagnóstico, segurança, arquitetura e comunicação entre equipes.</div>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Nas redes antigas, a topologia física era muito próxima da topologia lógica. Em redes em barramento, vários dispositivos compartilhavam o mesmo meio físico. Em redes em anel, o tráfego seguia uma sequência previsível entre nós. Com Ethernet comutada, switches, VLANs, roteadores, firewalls, Wi-Fi, VPNs, overlays e cloud, essa relação ficou menos direta.</p>\n  <p>Hoje é comum uma rede parecer uma estrela fisicamente, mas se comportar logicamente como múltiplas redes separadas por VLANs. Também é comum um datacenter usar uma topologia física spine-leaf enquanto a aplicação enxerga redes virtuais, balanceadores e políticas abstratas.</p>\n  <p>A evolução das topologias acompanhou uma necessidade simples: conectar mais dispositivos, com menos colisão, mais disponibilidade, mais controle, menos gargalo e melhor capacidade de isolar falhas.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é que uma rede pode ter vários “desenhos verdadeiros” ao mesmo tempo. O desenho físico mostra cabos, rádio, portas, racks, switches e enlaces. O desenho lógico mostra VLANs, sub-redes, rotas, túneis, políticas, domínios de broadcast, caminhos de aplicação e dependências de serviço.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem topologia física:</strong> você não sabe onde há cabos, portas, APs, racks, uplinks e pontos únicos de falha.</li>\n    <li><strong>Sem topologia lógica:</strong> você não sabe por onde o tráfego passa, que políticas se aplicam, que segmentos existem e onde investigar.</li>\n    <li><strong>Sem topologia atualizada:</strong> o troubleshooting vira tentativa e erro.</li>\n    <li><strong>Sem separar camadas:</strong> você culpa o cabo quando o problema é rota, DNS, firewall, autenticação ou aplicação.</li>\n  </ul>\n  <p>Em segurança, a topologia também define impacto. Uma rede plana permite movimento lateral mais fácil. Uma topologia com segmentação e pontos de controle permite limitar blast radius, registrar eventos e aplicar menor privilégio.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>Topologias evoluíram para resolver limitações de escala, disponibilidade e controle. Algumas quase desapareceram como desenho físico comum, mas continuam importantes como modelo mental.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Topologia</th><th>Como funciona</th><th>Vantagem</th><th>Limitação</th><th>Uso conceitual atual</th></tr></thead>\n    <tbody>\n      <tr><td>Barramento</td><td>Todos compartilham um mesmo meio</td><td>Simples e barato em pequena escala</td><td>Colisão, falha do meio afeta todos, difícil escalar</td><td>Ajuda a entender meio compartilhado e broadcast</td></tr>\n      <tr><td>Anel</td><td>Nós conectados em sequência circular</td><td>Caminho previsível</td><td>Falhas podem afetar o circuito se não houver proteção</td><td>Útil para entender redundância em anéis metropolitanos</td></tr>\n      <tr><td>Estrela</td><td>Dispositivos ligados a um ponto central</td><td>Fácil operação e isolamento de host</td><td>Equipamento central vira ponto crítico</td><td>Comum em LANs com switches</td></tr>\n      <tr><td>Árvore</td><td>Estrelas conectadas em hierarquia</td><td>Organiza campus e prédios</td><td>Pode criar gargalos no núcleo</td><td>Base para acesso, distribuição e core</td></tr>\n      <tr><td>Malha</td><td>Múltiplos caminhos entre nós</td><td>Alta resiliência</td><td>Custo e complexidade</td><td>WAN, backbone, redes críticas e mesh wireless</td></tr>\n      <tr><td>Hub-and-spoke</td><td>Filiais falam com um hub central</td><td>Controle centralizado</td><td>Dependência do hub e caminhos longos</td><td>VPN, SD-WAN, cloud hub e redes corporativas</td></tr>\n      <tr><td>Spine-leaf</td><td>Folhas conectadas a spines</td><td>Baixa latência previsível e escalabilidade horizontal</td><td>Mais portas, planejamento e custo</td><td>Datacenter e cloud-like networking</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Topologia de rede é a forma como os elementos de uma rede são organizados e conectados. Ela pode ser analisada fisicamente, logicamente ou funcionalmente.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> topologia física descreve como cabos, enlaces, portas, APs e equipamentos estão conectados. Topologia lógica descreve como o tráfego realmente flui, quais segmentos existem, que caminhos são usados e que políticas controlam a comunicação.</div>\n  <p>Essa distinção é essencial: dois computadores podem estar conectados ao mesmo switch físico, mas separados logicamente por VLANs e firewall. Da mesma forma, dois servidores podem estar em prédios diferentes, mas parecer próximos para uma aplicação por causa de uma rede virtual, túnel ou balanceador.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Por dentro, topologia influencia como quadros, pacotes e fluxos encontram caminho. Na camada física, importam cabos, fibras, rádio, portas, uplinks e energia. Na camada de enlace, importam switches, VLANs, tabelas MAC e loops. Na camada de rede, importam IPs, sub-redes, gateways e rotas. Em camadas superiores, importam DNS, proxy, TLS, autenticação e aplicação.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Host decide destino:</strong> o computador determina se o destino parece local ou remoto.</li>\n    <li><strong>Camada local entrega ao próximo salto:</strong> normalmente via switch, AP ou gateway.</li>\n    <li><strong>Intermediários aplicam lógica:</strong> switches consultam MAC/VLAN; roteadores consultam rotas; firewalls aplicam política.</li>\n    <li><strong>Caminho pode mudar:</strong> redundância, balanceamento, falha, métrica ou política podem alterar o trajeto.</li>\n    <li><strong>Resposta pode voltar por caminho diferente:</strong> em algumas arquiteturas há assimetria, o que afeta firewall stateful, logs e troubleshooting.</li>\n  </ol>\n  <p>Topologia, portanto, não é apenas desenho estático. Ela é uma combinação de estrutura, estado, decisão e política.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma empresa, uma topologia típica pode ter acesso, distribuição e core. Usuários conectam-se em switches de acesso ou APs. Esses equipamentos sobem para uma camada de distribuição, onde podem existir VLANs, roteamento, ACLs e agregação. O core conecta datacenter, internet, WAN, firewalls e cloud.</p>\n  <p>Em cloud, o desenho físico fica invisível, mas a topologia lógica continua: VPC/VNet, subnets, route tables, security groups, firewalls, load balancers, private endpoints, peering, transit gateway, hub-and-spoke e zonas de disponibilidade.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Camada de acesso:</strong> onde usuários e endpoints entram.</li>\n    <li><strong>Camada de distribuição:</strong> onde políticas, agregação e roteamento começam a aparecer.</li>\n    <li><strong>Core/backbone:</strong> caminho de alta capacidade entre blocos da rede.</li>\n    <li><strong>Perímetro:</strong> firewalls, proxies, VPNs, WAFs e saída para internet.</li>\n    <li><strong>Cloud/híbrido:</strong> extensões lógicas da rede corporativa em provedores cloud.</li>\n  </ul>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma cidade. A topologia física são as ruas, pontes, túneis e prédios. A topologia lógica são as regras de trânsito: sentido das vias, faixas exclusivas, bloqueios, pedágios, rotas de emergência e aplicativos que escolhem caminhos diferentes conforme o trânsito.</p>\n  <p>Dois endereços podem estar próximos no mapa, mas a rota real pode dar uma volta enorme por causa de uma ponte bloqueada. Na rede, dois servidores podem estar no mesmo datacenter físico, mas em segmentos lógicos diferentes, passando por firewalls e políticas.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes tomam decisões em milissegundos, com tabelas, protocolos e políticas automatizadas. Pessoas escolhem caminhos conscientemente; pacotes seguem regras configuradas.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, seu notebook se conecta ao roteador Wi-Fi. Fisicamente, há rádio entre notebook e roteador. O roteador talvez esteja ligado por cabo ao modem da operadora. Logicamente, seu notebook recebe IP, gateway e DNS; depois envia tráfego para o gateway quando quer acessar a internet.</p>\n  <p>Se o Wi-Fi aparece conectado, mas a internet não funciona, a topologia física do rádio pode estar boa, enquanto a topologia lógica para fora da rede está quebrada: sem gateway, sem DNS, rota errada, modem sem link ou provedor indisponível.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, usuários podem estar conectados em switches de acesso em estrela. Esses switches sobem para switches de distribuição. Servidores ficam em outra rede. Visitantes usam Wi-Fi separado. O firewall controla comunicação entre usuários, servidores, internet e VPN.</p>\n  <p>Fisicamente, vários cabos podem ir para os mesmos racks. Logicamente, há VLAN de usuários, VLAN de servidores, rede de gestão, rede de impressoras, Wi-Fi corporativo, Wi-Fi visitante, VPN e links WAN. Um diagrama útil precisa mostrar as duas visões: onde as coisas estão e como o tráfego deve circular.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, você raramente vê cabos, switches físicos ou racks. Mesmo assim, topologia existe. Uma VPC ou VNet possui subnets, rotas, gateways, NAT, firewalls, load balancers, endpoints privados e peerings. Um desenho hub-and-spoke pode centralizar inspeção em uma VNet hub e conectar várias VNets spoke.</p>\n  <p>O erro comum é achar que por ser virtual não há topologia. Há sim: ela apenas é definida por software, APIs, rotas e políticas. Uma rota errada, um security group permissivo ou um peering mal planejado pode expor serviços ou quebrar aplicações.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, topologia aparece em pipelines, Kubernetes, ambientes efêmeros e infraestrutura como código. Um manifesto Terraform pode criar subnets, route tables, security groups e load balancers. Um cluster Kubernetes possui topologia lógica própria: Pods, Services, Ingress, NetworkPolicies, nodes e CNI.</p>\n  <p>Quando um deploy falha, a causa pode não estar no código da aplicação. Pode ser topologia: pipeline sem rota até o registry, runner sem saída para internet, Pod sem permissão de rede, Ingress mal configurado, service mesh interceptando tráfego ou firewall bloqueando conexão.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Topologia é uma ferramenta de defesa. Ela revela caminhos possíveis para atacantes, pontos de controle, áreas críticas, zonas de confiança e locais de coleta de logs. Um SOC que não entende topologia corre risco de interpretar alerta isolado sem enxergar movimento lateral ou caminho de exfiltração.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Rede plana</td><td>Todos os ativos no mesmo segmento</td><td>Movimento lateral facilitado</td><td>Segmentação, VLANs, ACLs, firewall interno e monitoramento</td></tr>\n      <tr><td>Ponto único de falha</td><td>Um switch, firewall ou link central sem redundância</td><td>Indisponibilidade ampla</td><td>Redundância, documentação e teste de failover</td></tr>\n      <tr><td>Caminho invisível</td><td>Tráfego passa por túnel, proxy ou peering não documentado</td><td>Falha de auditoria e resposta lenta</td><td>Inventário, diagrama lógico e revisão periódica</td></tr>\n      <tr><td>Assimetria inesperada</td><td>Ida e volta passam por caminhos diferentes</td><td>Firewall stateful pode bloquear ou logs ficam fragmentados</td><td>Planejamento de rotas, inspeção centralizada e observabilidade</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 540\" role=\"img\" aria-labelledby=\"m01l04-title m01l04-desc\">\n    <title id=\"m01l04-title\">Topologia física e topologia lógica</title>\n    <desc id=\"m01l04-desc\">Diagrama comparando a conexão física por switch central com caminhos lógicos separados por VLAN, firewall, WAN e cloud.</desc>\n    <defs>\n      <marker id=\"m01l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"35\" width=\"420\" height=\"210\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"245\" y=\"68\" text-anchor=\"middle\" class=\"svg-label\">Topologia física</text>\n    <rect x=\"190\" y=\"125\" width=\"115\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"247\" y=\"162\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Switch</text>\n    <rect x=\"65\" y=\"115\" width=\"95\" height=\"50\" rx=\"10\" class=\"svg-node svg-node--client\" />\n    <text x=\"112\" y=\"145\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Usuário</text>\n    <rect x=\"335\" y=\"115\" width=\"90\" height=\"50\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"380\" y=\"145\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Servidor</text>\n    <rect x=\"85\" y=\"185\" width=\"95\" height=\"42\" rx=\"10\" class=\"svg-node svg-node--client\" />\n    <text x=\"132\" y=\"211\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Impressora</text>\n    <line x1=\"160\" y1=\"140\" x2=\"190\" y2=\"150\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <line x1=\"305\" y1=\"150\" x2=\"335\" y2=\"140\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <line x1=\"180\" y1=\"205\" x2=\"205\" y2=\"180\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <rect x=\"525\" y=\"35\" width=\"420\" height=\"430\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"735\" y=\"68\" text-anchor=\"middle\" class=\"svg-label\">Topologia lógica</text>\n    <rect x=\"565\" y=\"105\" width=\"120\" height=\"60\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"625\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN Usuários</text>\n    <text x=\"625\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.10.10.0/24</text>\n    <rect x=\"760\" y=\"105\" width=\"120\" height=\"60\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"820\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN Servidores</text>\n    <text x=\"820\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.10.20.0/24</text>\n    <rect x=\"655\" y=\"230\" width=\"120\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"715\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Firewall</text>\n    <text x=\"715\" y=\"275\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Política</text>\n    <rect x=\"565\" y=\"365\" width=\"125\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"627\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">WAN</text>\n    <text x=\"627\" y=\"410\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Filial</text>\n    <rect x=\"755\" y=\"365\" width=\"125\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"817\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cloud</text>\n    <text x=\"817\" y=\"410\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VPC/VNet</text>\n    <path d=\"M625 165 C640 190, 670 210, 695 230\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <path d=\"M820 165 C800 195, 760 215, 735 230\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <line x1=\"690\" y1=\"292\" x2=\"640\" y2=\"365\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <line x1=\"745\" y1=\"292\" x2=\"805\" y2=\"365\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l04-arrow)\" />\n    <rect x=\"70\" y=\"330\" width=\"380\" height=\"105\" rx=\"16\" class=\"svg-node svg-node--security\" />\n    <text x=\"260\" y=\"365\" text-anchor=\"middle\" class=\"svg-label\">Lição principal</text>\n    <text x=\"260\" y=\"393\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mesmo cabo não significa mesmo segmento</text>\n    <text x=\"260\" y=\"418\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mesmo segmento não significa mesmo acesso</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula treina a criação de dois mapas: um físico e outro lógico. O objetivo é aprender a documentar evidências sem inventar caminhos que você ainda não comprovou.</p>\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam a diferença entre topologia física, lógica e funcional, além de aplicar o conceito em troubleshooting e segurança.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma rede pequena com usuários, servidores, visitantes, firewall e cloud. Você deve propor a topologia física e lógica mínima para reduzir risco e facilitar operação.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como justificar escolhas de topologia usando disponibilidade, custo, segurança, troubleshooting e crescimento futuro.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> topologia é o desenho físico e lógico da comunicação.</li>\n    <li><strong>O que lembrar:</strong> topologia física mostra conexões; topologia lógica mostra fluxo, segmentos, rotas e políticas.</li>\n    <li><strong>Erro comum:</strong> achar que estar no mesmo switch significa estar na mesma rede lógica.</li>\n    <li><strong>Uso real:</strong> topologia orienta troubleshooting, segurança, documentação, arquitetura e resposta a incidentes.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Depois de entender topologias, o próximo tema será meios de transmissão: cobre, fibra e rádio. A topologia mostra como os pontos se conectam; o meio explica por onde o sinal passa e quais limitações físicas aparecem na prática.</p>\n</section>\n"
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
  "deepDive": {
    "mentalModel": "Sempre pergunte: estou olhando para o cabo, para o segmento, para a rota, para a política, para o túnel ou para a aplicação? Topologia útil é aquela que responde a uma pergunta operacional.",
    "keyTerms": [
      "topologia física",
      "topologia lógica",
      "estrela",
      "barramento",
      "anel",
      "malha",
      "árvore",
      "hub-and-spoke",
      "spine-leaf",
      "ponto único de falha",
      "caminho assimétrico"
    ],
    "limitations": [
      "Diagramas ficam obsoletos rapidamente se não houver processo de atualização.",
      "Uma topologia lógica pode mudar dinamicamente por protocolos de roteamento, failover ou automação.",
      "Cloud e SDN ocultam parte da topologia física, mas não removem limites de latência, zonas, rotas e dependências.",
      "Um diagrama simples demais pode esconder riscos; um diagrama complexo demais pode impedir uso prático."
    ],
    "whenToUse": [
      "Ao diagnosticar falhas de conectividade.",
      "Ao planejar mudança em rede, firewall ou cloud.",
      "Ao responder incidentes de segurança.",
      "Ao explicar dependências para equipes de aplicação, SOC, infraestrutura e gestão.",
      "Ao criar documentação de ambiente."
    ],
    "whenNotToUse": [
      "Não use um diagrama antigo como verdade absoluta.",
      "Não trate topologia física como prova de caminho lógico.",
      "Não desenhe todas as conexões possíveis quando o objetivo é responder uma pergunta específica.",
      "Não publique diagramas sensíveis sem controle de acesso."
    ],
    "operationalImpact": [
      "Topologia bem documentada reduz tempo de diagnóstico.",
      "Redundância aumenta disponibilidade, mas exige teste de failover e monitoramento.",
      "Malha aumenta resiliência, mas também complexidade de operação.",
      "Hub-and-spoke simplifica controle central, mas pode criar gargalo no hub.",
      "Spine-leaf facilita escala em datacenter, mas exige planejamento de portas e custos."
    ],
    "financialImpact": [
      "Mais redundância significa mais switches, links, portas, licenças e energia.",
      "Topologias com enlaces dedicados ou links inter-regionais em cloud podem gerar custo recorrente.",
      "Documentação e monitoramento têm custo operacional, mas reduzem custo de indisponibilidade.",
      "Arquiteturas superdimensionadas desperdiçam orçamento; arquiteturas subdimensionadas aumentam risco de queda e retrabalho."
    ],
    "securityImpact": [
      "Topologia define possíveis caminhos de ataque e locais de controle.",
      "Rede plana aumenta movimento lateral.",
      "Segmentação lógica reduz impacto, mas depende de regras corretas.",
      "Diagramas expostos podem ajudar atacantes a entender o ambiente.",
      "Caminhos não documentados enfraquecem auditoria e resposta a incidentes."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Confundir topologia física com lógica.",
      "whyItHappens": "O aluno vê cabos e assume que o tráfego seguirá exatamente aquele desenho.",
      "consequence": "Diagnóstico errado, especialmente com VLAN, roteamento, VPN e cloud.",
      "correction": "Separar mapa físico, mapa lógico e mapa de aplicação."
    },
    {
      "mistake": "Achar que estrela sempre é segura.",
      "whyItHappens": "A estrela parece organizada e centralizada.",
      "consequence": "O switch central pode virar ponto único de falha e a rede ainda pode ser plana.",
      "correction": "Avaliar redundância, segmentação, políticas e monitoramento."
    },
    {
      "mistake": "Desenhar cloud como uma nuvem genérica.",
      "whyItHappens": "O provedor abstrai a infraestrutura física.",
      "consequence": "Rotas, security groups, subnets e custos ficam invisíveis.",
      "correction": "Representar VPC/VNet, subnets, gateways, firewalls, endpoints e peerings."
    },
    {
      "mistake": "Usar diagrama como decoração.",
      "whyItHappens": "Diagramas bonitos são confundidos com documentação útil.",
      "consequence": "A equipe não consegue usar o desenho para resolver incidentes.",
      "correction": "Todo diagrama deve responder: quem fala com quem, por onde, com que política e que evidência comprova."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Usuários conectados ao mesmo switch não se enxergam",
      "Falha intermitente quando um link cai",
      "Aplicação funciona localmente, mas falha pela VPN",
      "Firewall vê metade da conversa",
      "Wi-Fi conectado, mas tráfego não alcança servidores internos"
    ],
    "diagnosticQuestions": [
      "O problema está no caminho físico ou lógico?",
      "Os hosts estão na mesma VLAN ou apenas no mesmo switch?",
      "Qual gateway é usado?",
      "Existe firewall, proxy, VPN, NAT ou rota entre origem e destino?",
      "O retorno do tráfego volta pelo mesmo caminho?",
      "O diagrama usado está atualizado?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && tracert <destino>",
        "purpose": "Ver endereçamento, gateway, rotas locais e caminho até o destino.",
        "expectedObservation": "IP, máscara, gateway, DNS e saltos do caminho.",
        "interpretation": "Ajuda a diferenciar problema local, gateway, rota ou destino."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection <host> -Port 443 -TraceRoute",
        "purpose": "Testar conectividade de porta e caminho aproximado para um serviço.",
        "expectedObservation": "TcpTestSucceeded e rota exibida quando possível.",
        "interpretation": "Útil para separar camada 3 de serviço em porta específica."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && traceroute <destino>",
        "purpose": "Ver interfaces, rotas e caminho do tráfego.",
        "expectedObservation": "Interface com IP, rota default e saltos.",
        "interpretation": "Mostra se o host sabe para onde enviar tráfego."
      },
      {
        "platform": "Linux",
        "command": "ss -tulpen && curl -I https://example.com",
        "purpose": "Observar serviços locais e testar caminho HTTP/TLS de saída.",
        "expectedObservation": "Portas em escuta e headers HTTP.",
        "interpretation": "Ajuda a conectar topologia lógica com serviços reais."
      },
      {
        "platform": "Cisco IOS",
        "command": "show cdp neighbors && show interfaces status && show vlan brief",
        "purpose": "Mapear vizinhos, portas e VLANs em switches Cisco.",
        "expectedObservation": "Equipamentos vizinhos, estado das portas e VLANs configuradas.",
        "interpretation": "Ajuda a construir mapa físico e lógico em LAN."
      },
      {
        "platform": "Cisco IOS",
        "command": "show spanning-tree && show ip route",
        "purpose": "Ver estado de prevenção de loop e rotas quando aplicável.",
        "expectedObservation": "Portas bloqueadas/encaminhando e tabela de rotas.",
        "interpretation": "Ajuda a entender caminho lógico e redundância."
      }
    ],
    "decisionTree": [
      {
        "if": "Hosts no mesmo switch não se comunicam",
        "then": "Verificar VLAN, máscara, firewall local e gateway antes de culpar cabo."
      },
      {
        "if": "Apenas uma parte da rede caiu",
        "then": "Mapear se há ponto comum: switch de acesso, uplink, AP, firewall, rota ou link WAN."
      },
      {
        "if": "Firewall vê ida, mas não vê volta",
        "then": "Investigar caminho assimétrico, NAT, rota de retorno e política stateful."
      },
      {
        "if": "Diagrama contradiz evidência",
        "then": "Confiar na evidência coletada e registrar necessidade de atualizar documentação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter diagrama físico e lógico separados, mas relacionados.",
      "Documentar zonas, VLANs, subnets, gateways, firewalls, links WAN e cloud peerings.",
      "Aplicar segmentação por função e criticidade.",
      "Testar caminhos permitidos e bloqueados.",
      "Proteger diagramas como informação sensível.",
      "Revisar topologia após mudanças de rede, cloud ou firewall."
    ],
    "badPractices": [
      "Usar rede plana para usuários, servidores, visitantes e gestão.",
      "Guardar diagramas sensíveis em locais públicos.",
      "Criar túneis temporários sem documentação.",
      "Confiar em diagrama antigo durante incidente.",
      "Não registrar exceções de firewall e rotas manuais."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Achar que o mesmo switch significa mesma rede.",
      "Ignorar caminho de retorno.",
      "Desenhar só a internet e esquecer DNS, proxy, firewall e identidade.",
      "Não representar redes de gestão e backup."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por topologia plana",
        "description": "Quando muitos ativos ficam no mesmo segmento lógico, um host comprometido pode alcançar outros com menos barreiras.",
        "defensiveExplanation": "O risco aumenta quando não há segmentação, ACLs, firewall interno ou monitoramento lateral.",
        "mitigation": "Criar zonas, VLANs, ACLs, firewalls internos, EDR, logs e revisão de acessos."
      },
      {
        "name": "Ponto único de falha crítico",
        "description": "Um componente central sem redundância pode derrubar grande parte da rede.",
        "defensiveExplanation": "Ataques, falhas ou erros de configuração nesse ponto causam indisponibilidade ampla.",
        "mitigation": "Redundância, backup de configuração, monitoramento e testes de failover."
      },
      {
        "name": "Caminho oculto sem governança",
        "description": "Túneis, peerings ou exceções podem permitir tráfego fora dos controles principais.",
        "defensiveExplanation": "Isso reduz visibilidade e pode criar bypass de segurança.",
        "mitigation": "Inventário de conectividade, revisão periódica, logs centralizados e aprovação formal."
      }
    ],
    "monitoring": [
      "Mudanças em rotas e regras de firewall.",
      "Novas conexões entre segmentos que antes não se comunicavam.",
      "Tráfego lateral incomum.",
      "Queda de uplinks, links WAN ou túneis.",
      "Alertas de spanning-tree, loops ou flapping de porta."
    ],
    "hardening": [
      "Segmentar redes críticas.",
      "Usar redes separadas para gestão, backup, usuários, servidores e visitantes.",
      "Limitar rotas e peerings ao necessário.",
      "Aplicar menor privilégio em security groups e ACLs.",
      "Auditar diagramas e configurações periodicamente."
    ],
    "detectionIdeas": [
      "Comparar fluxos reais com topologia documentada.",
      "Usar NetFlow/sFlow ou logs de firewall para validar caminhos.",
      "Alertar quando segmento de visitante tenta acessar rede interna.",
      "Monitorar alterações de rota em cloud e em roteadores."
    ]
  },
  "lab": {
    "id": "lab-1.4",
    "title": "Criando mapa físico e lógico de uma rede pequena",
    "labType": "cloud",
    "objective": "Construir dois mapas complementares: um físico, baseado em conexões e equipamentos, e outro lógico, baseado em IP, gateway, serviços, rotas e políticas prováveis.",
    "scenario": "Você recebeu a tarefa de documentar uma rede doméstica, laboratório ou pequena empresa. O objetivo não é descobrir tudo de forma invasiva, mas coletar evidências seguras e organizar hipóteses verificáveis.",
    "topology": "Host do aluno -> Wi-Fi ou cabo -> roteador/switch/AP -> internet e serviços locais conhecidos.",
    "architecture": "Ambiente local simples com um ou mais dispositivos finais, equipamento de acesso, gateway, DNS, saída para internet e, opcionalmente, impressora, NAS, VM ou serviço local.",
    "prerequisites": [
      "Ter concluído as aulas 1.1 a 1.3.",
      "Ter acesso administrativo ao próprio computador.",
      "Executar apenas comandos permitidos em rede própria ou autorizada."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Opcional: interface web do roteador doméstico",
      "Opcional: Packet Tracer para simular topologia",
      "Editor de texto para desenhar mapa simples"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não faça varreduras agressivas em redes corporativas sem autorização.",
      "Não colete senhas, tokens, dados pessoais ou informações sensíveis de terceiros.",
      "Se estiver em rede da empresa, limite-se a comandos locais e documentação autorizada.",
      "Sanitize endereços públicos, nomes reais e dados internos antes de compartilhar evidências.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar sua conexão física ou sem fio",
        "instruction": "Descubra se seu host está conectado via cabo, Wi-Fi, VM, VPN ou adaptador virtual.",
        "command": "Windows: ipconfig /all\nLinux: ip addr",
        "expectedOutput": "Lista de interfaces com endereços IP, nomes de adaptadores e estado operacional.",
        "explanation": "Essa etapa inicia o mapa físico provável: por qual interface o host entra na rede."
      },
      {
        "number": 2,
        "title": "Identificar gateway e rede local",
        "instruction": "Localize gateway padrão, máscara e DNS para começar o mapa lógico.",
        "command": "Windows: ipconfig /all && route print\nLinux: ip route && resolvectl status 2>/dev/null || cat /etc/resolv.conf",
        "expectedOutput": "Gateway default, rota padrão e servidores DNS.",
        "explanation": "Gateway e rota default indicam para onde o tráfego sai quando o destino não está na rede local."
      },
      {
        "number": 3,
        "title": "Testar caminho até um destino externo",
        "instruction": "Observe os saltos até um destino público simples.",
        "command": "Windows: tracert 1.1.1.1\nLinux: traceroute 1.1.1.1 || tracepath 1.1.1.1",
        "expectedOutput": "Primeiro salto normalmente é o gateway local; saltos seguintes pertencem à operadora ou caminho externo.",
        "explanation": "Isso diferencia topologia local de caminho WAN/internet."
      },
      {
        "number": 4,
        "title": "Testar serviço por nome",
        "instruction": "Valide se o caminho lógico inclui resolução de nomes.",
        "command": "Windows: nslookup example.com\nLinux: dig example.com +short || nslookup example.com",
        "expectedOutput": "Um ou mais endereços IP resolvidos para o nome consultado.",
        "explanation": "A topologia funcional inclui DNS; sem DNS, a rede pode estar conectada mas aplicações por nome falham."
      },
      {
        "number": 5,
        "title": "Criar mapa físico inicial",
        "instruction": "Desenhe os componentes físicos ou prováveis: seu host, AP/roteador, switch se houver, modem, impressora, NAS ou outros equipamentos conhecidos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mapa físico simples com nós e conexões conhecidas ou marcadas como hipótese.",
        "explanation": "Não invente componentes: marque como hipótese quando você não tiver evidência."
      },
      {
        "number": 6,
        "title": "Criar mapa lógico inicial",
        "instruction": "Desenhe IP do host, rede local, gateway, DNS, saída para internet e serviços locais conhecidos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mapa lógico com rede, gateway, DNS e caminho de saída.",
        "explanation": "O mapa lógico responde como o tráfego se comporta, não apenas onde há cabos."
      },
      {
        "number": 7,
        "title": "Registrar riscos e pontos únicos de falha",
        "instruction": "Liste o que derrubaria a rede se falhasse e que caminhos deveriam ser segmentados.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista com pelo menos três riscos, como roteador único, Wi-Fi único, rede de visitantes sem isolamento ou falta de documentação.",
        "explanation": "Topologia útil sempre mostra impacto operacional e de segurança."
      }
    ],
    "expectedResult": "Ao final, o aluno deve ter dois mapas simples: topologia física e topologia lógica, além de uma lista de evidências, hipóteses, riscos e melhorias.",
    "validation": [
      {
        "check": "Gateway identificado",
        "command": "Windows: ipconfig /all\nLinux: ip route",
        "expected": "Gateway ou rota default visível.",
        "ifFails": "Verifique se há conexão ativa, VPN alterando rota ou interface sem IP."
      },
      {
        "check": "Caminho externo testado",
        "command": "tracert 1.1.1.1 ou traceroute/tracepath 1.1.1.1",
        "expected": "Primeiro salto local e saltos externos quando permitido.",
        "ifFails": "ICMP pode estar bloqueado; tente Test-NetConnection ou curl para um destino HTTP/HTTPS."
      },
      {
        "check": "DNS validado",
        "command": "nslookup example.com ou dig example.com",
        "expected": "Nome resolvido para endereço IP.",
        "ifFails": "Verifique DNS configurado, conectividade com DNS e políticas da rede."
      },
      {
        "check": "Mapa lógico separado do físico",
        "command": "Revisão manual",
        "expected": "O mapa físico mostra conexões; o lógico mostra IP, gateway, DNS, rotas e políticas prováveis.",
        "ifFails": "Reorganize o desenho em duas visões."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não aparece gateway",
        "probableCause": "Interface sem IP, rede desconectada ou VPN assumindo rota.",
        "howToConfirm": "Verificar ipconfig/ip route e estado da interface.",
        "fix": "Conectar à rede correta, renovar IP ou revisar VPN."
      },
      {
        "symptom": "Traceroute não mostra todos os saltos",
        "probableCause": "ICMP/TTL expirado bloqueado por firewall ou operadora.",
        "howToConfirm": "Testar conectividade HTTP com curl ou Test-NetConnection.",
        "fix": "Registrar limitação da evidência e usar outro método permitido."
      },
      {
        "symptom": "DNS falha mas IP responde",
        "probableCause": "Servidor DNS indisponível ou bloqueado.",
        "howToConfirm": "Ping/Test-NetConnection para IP e nslookup para nome.",
        "fix": "Revisar DNS configurado, rota até DNS ou política de firewall."
      },
      {
        "symptom": "Mapa físico não pode ser confirmado",
        "probableCause": "Sem acesso ao rack, AP ou roteador.",
        "howToConfirm": "Comparar documentação existente e evidências locais.",
        "fix": "Marcar como hipótese e solicitar confirmação autorizada."
      }
    ],
    "improvements": [
      "Criar versão em Packet Tracer da topologia.",
      "Adicionar VLANs e firewall lógico ao mapa.",
      "Documentar pontos únicos de falha.",
      "Criar checklist de atualização do diagrama após mudanças.",
      "Adicionar visão cloud se houver VPC/VNet ou VPN."
    ],
    "evidenceToCollect": [
      "Saída sanitizada de ipconfig ou ip addr",
      "Saída sanitizada de route print ou ip route",
      "Resultado de nslookup/dig",
      "Resultado de traceroute/tracert quando permitido",
      "Mapa físico simples",
      "Mapa lógico simples",
      "Lista de riscos e hipóteses"
    ],
    "questions": [
      "O que você conseguiu provar e o que ainda é hipótese?",
      "Qual é o ponto único de falha mais evidente?",
      "Seu mapa lógico mostra DNS, gateway e política ou apenas cabos?",
      "Há segmentos que deveriam estar separados?"
    ],
    "challenge": "Transforme sua topologia em uma proposta de melhoria com pelo menos uma ação de disponibilidade, uma de segurança e uma de documentação.",
    "solution": "Uma solução madura separa mapa físico e lógico, identifica evidências, marca hipóteses, aponta pontos únicos de falha e propõe melhorias proporcionais, como rede de visitantes isolada, documentação de gateway/DNS, backup de configuração e revisão de regras."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um diagrama de cabos não é suficiente para diagnosticar uma aplicação que não acessa um serviço?",
      "hints": [
        "Pense em IP, rota, firewall, DNS e autenticação.",
        "O caminho lógico pode não seguir o desenho físico aparente."
      ],
      "expectedIdeas": [
        "topologia física",
        "topologia lógica",
        "política",
        "rota",
        "serviço"
      ],
      "explanation": "A aplicação depende de várias camadas. O cabo pode estar funcionando enquanto uma rota, regra ou serviço falha."
    },
    {
      "type": "diagnóstico",
      "question": "Dois hosts estão no mesmo switch, mas não se comunicam. O que você verificaria antes de trocar cabos?",
      "hints": [
        "Pense em VLAN, IP, máscara e firewall local.",
        "Mesmo switch não significa mesmo segmento lógico."
      ],
      "expectedIdeas": [
        "VLAN",
        "máscara",
        "gateway",
        "firewall local",
        "ACL"
      ],
      "explanation": "A topologia lógica pode separar os hosts mesmo que estejam fisicamente próximos."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer conectar filiais à cloud. Que topologias lógicas você desenharia antes de liberar tráfego?",
      "hints": [
        "Considere hub-and-spoke, firewall central, VPN, peering e subnets.",
        "Pense em logs e menor privilégio."
      ],
      "expectedIdeas": [
        "hub-and-spoke",
        "VPC/VNet",
        "subnets",
        "rotas",
        "firewall",
        "logs",
        "segurança"
      ],
      "explanation": "Cloud networking exige mapa lógico explícito para evitar rotas permissivas, gargalos e falta de visibilidade."
    }
  ],
  "quiz": [
    {
      "id": "q1.4.1",
      "type": "conceito",
      "q": "Qual alternativa descreve melhor topologia lógica?",
      "opts": [
        "A cor dos cabos usados no rack",
        "O caminho e as regras de comunicação percebidos pelo tráfego",
        "A marca dos switches",
        "A velocidade contratada da internet"
      ],
      "a": 1,
      "exp": "Topologia lógica descreve segmentos, rotas, políticas e caminhos de tráfego, não apenas conexões físicas.",
      "difficulty": "iniciante",
      "topic": "topologia lógica"
    },
    {
      "id": "q1.4.2",
      "type": "cenário",
      "q": "Dois computadores estão no mesmo switch, mas em VLANs diferentes. O que é correto afirmar?",
      "opts": [
        "Eles obrigatoriamente estão na mesma rede lógica",
        "Eles podem estar fisicamente próximos e logicamente separados",
        "VLAN não afeta comunicação",
        "O switch não participa da comunicação"
      ],
      "a": 1,
      "exp": "A topologia física pode ser a mesma, mas a lógica pode separar tráfego por VLAN.",
      "difficulty": "iniciante",
      "topic": "VLAN"
    },
    {
      "id": "q1.4.3",
      "type": "comparação",
      "q": "Qual topologia tende a oferecer maior resiliência por múltiplos caminhos, mas aumenta custo e complexidade?",
      "opts": [
        "Barramento",
        "Malha",
        "Ponto único",
        "Rede plana"
      ],
      "a": 1,
      "exp": "Malha cria caminhos alternativos, mas exige mais enlaces, portas, planejamento e controle.",
      "difficulty": "iniciante-intermediário",
      "topic": "malha"
    },
    {
      "id": "q1.4.4",
      "type": "segurança",
      "q": "Por que uma rede plana é problemática em segurança?",
      "opts": [
        "Porque impede qualquer comunicação",
        "Porque facilita movimento lateral após comprometimento",
        "Porque elimina a necessidade de firewall",
        "Porque reduz todos os riscos automaticamente"
      ],
      "a": 1,
      "exp": "Sem segmentação, um ativo comprometido pode alcançar mais sistemas com menos barreiras.",
      "difficulty": "iniciante-intermediário",
      "topic": "segurança"
    },
    {
      "id": "q1.4.5",
      "type": "cloud",
      "q": "Em cloud, qual item representa parte da topologia lógica?",
      "opts": [
        "A cor do rack do provedor",
        "VPC/VNet, subnets, route tables e security groups",
        "O teclado do administrador",
        "O tamanho físico do datacenter"
      ],
      "a": 1,
      "exp": "Cloud abstrai a infraestrutura física, mas expõe topologia lógica por redes virtuais, rotas e políticas.",
      "difficulty": "iniciante",
      "topic": "cloud"
    },
    {
      "id": "q1.4.6",
      "type": "diagnóstico",
      "q": "Um firewall vê pacotes de ida, mas não vê a resposta. Qual hipótese topológica é importante?",
      "opts": [
        "Caminho assimétrico",
        "Cabo sempre quebrado",
        "DNS sempre correto",
        "Base64 mal codificado"
      ],
      "a": 0,
      "exp": "Em caminhos assimétricos, ida e volta passam por pontos diferentes, afetando firewalls stateful e logs.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.4.1",
      "front": "O que é topologia física?",
      "back": "É o desenho de conexões reais ou prováveis entre cabos, portas, APs, switches, roteadores, racks e enlaces.",
      "tags": [
        "topologia"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.4.2",
      "front": "O que é topologia lógica?",
      "back": "É a forma como o tráfego flui por segmentos, rotas, VLANs, firewalls, túneis, serviços e políticas.",
      "tags": [
        "topologia lógica"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.4.3",
      "front": "Mesmo switch significa mesma rede lógica?",
      "back": "Não. VLANs, ACLs, firewall e configurações podem separar hosts no mesmo equipamento físico.",
      "tags": [
        "VLAN",
        "switch"
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
      "id": "fc1.4.5",
      "front": "Por que diagramas de rede são sensíveis?",
      "back": "Eles revelam caminhos, zonas, controles, dependências e possíveis alvos para um atacante.",
      "tags": [
        "segurança",
        "documentação"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc1.4.6",
      "front": "O que é caminho assimétrico?",
      "back": "É quando o tráfego de ida e o de volta passam por caminhos diferentes, podendo afetar firewalls e observabilidade.",
      "tags": [
        "troubleshooting",
        "firewall"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex1.4.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras a diferença entre topologia física e lógica usando uma rede Wi-Fi doméstica como exemplo.",
      "expectedAnswer": "A física inclui notebook, rádio, roteador e modem; a lógica inclui IP, gateway, DNS, rota até internet e serviços acessados.",
      "explanation": "A resposta deve separar meio/conexão de fluxo/regra/serviço."
    },
    {
      "id": "ex1.4.2",
      "type": "diagnóstico",
      "prompt": "Dois hosts estão conectados ao mesmo switch, mas um não acessa o outro. Liste cinco hipóteses antes de concluir que o switch está com defeito.",
      "expectedAnswer": "VLAN diferente, máscara incorreta, firewall local, IP duplicado, ACL, gateway incorreto, porta bloqueada por STP ou política de segurança.",
      "explanation": "O problema pode estar na topologia lógica, não na física."
    },
    {
      "id": "ex1.4.3",
      "type": "arquitetura",
      "prompt": "Uma pequena empresa tem usuários, servidores e visitantes no mesmo Wi-Fi. Que melhoria topológica você sugeriria?",
      "expectedAnswer": "Separar rede de visitantes, rede corporativa e servidores; aplicar firewall/ACL entre segmentos; documentar gateway, DNS e políticas.",
      "explanation": "A melhoria reduz movimento lateral e torna troubleshooting mais claro."
    },
    {
      "id": "ex1.4.4",
      "type": "cloud",
      "prompt": "Em uma VNet/VPC com subnets pública e privada, o que representa a topologia lógica?",
      "expectedAnswer": "Subnets, route tables, internet gateway/NAT, security groups, firewall, load balancer, private endpoints e regras de comunicação.",
      "explanation": "Em cloud, a topologia é definida por software e políticas, mas continua determinando fluxo e risco."
    }
  ],
  "challenge": {
    "title": "Desenhe duas visões de uma rede pequena",
    "scenario": "Uma empresa pequena possui 20 usuários, Wi-Fi corporativo, Wi-Fi de visitantes, dois servidores internos, uma impressora, um firewall, um link de internet e uma conexão VPN para cloud.",
    "tasks": [
      "Desenhar uma topologia física simplificada.",
      "Desenhar uma topologia lógica separando usuários, visitantes, servidores e cloud.",
      "Indicar pelo menos três pontos de controle de segurança.",
      "Apontar dois pontos únicos de falha.",
      "Criar um plano de validação com comandos ou evidências."
    ],
    "constraints": [
      "Visitantes não podem acessar servidores internos.",
      "Servidores devem ser acessados apenas por usuários corporativos autorizados.",
      "A VPN cloud deve passar pelo firewall.",
      "O desenho deve ser simples o suficiente para troubleshooting."
    ],
    "expectedDeliverables": [
      "Mapa físico",
      "Mapa lógico",
      "Tabela de segmentos",
      "Lista de riscos",
      "Plano de validação"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação física e lógica",
        "points": 25,
        "description": "O aluno não mistura cabos com fluxo lógico no mesmo desenho sem legenda."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Visitantes, usuários, servidores e cloud possuem controles coerentes."
      },
      {
        "criterion": "Troubleshooting",
        "points": 20,
        "description": "O plano permite investigar gateway, DNS, rota, firewall e serviço."
      },
      {
        "criterion": "Disponibilidade",
        "points": 15,
        "description": "Pontos únicos de falha são identificados."
      },
      {
        "criterion": "Clareza",
        "points": 15,
        "description": "O desenho é compreensível e baseado em evidências ou hipóteses marcadas."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos o que existe fisicamente do que precisa existir logicamente. Depois identificamos grupos com necessidades diferentes: usuários, visitantes, servidores e cloud. Por fim, posicionamos controles e validamos caminhos permitidos e bloqueados.",
    "steps": [
      "Listar dispositivos e enlaces físicos.",
      "Criar segmentos lógicos por função.",
      "Definir gateway e firewall entre segmentos.",
      "Garantir que visitantes só acessem internet.",
      "Garantir que servidores não fiquem na mesma rede dos visitantes.",
      "Forçar tráfego cloud/VPN pelo firewall.",
      "Listar comandos de validação: ipconfig/ip route, ping, nslookup, traceroute, Test-NetConnection/curl."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar todos na mesma rede e confiar na senha do Wi-Fi.",
        "whyItIsWrong": "Senha Wi-Fi não substitui segmentação. Visitantes ou dispositivos comprometidos poderiam alcançar recursos internos."
      },
      {
        "answer": "Desenhar apenas uma nuvem chamada internet/cloud.",
        "whyItIsWrong": "Isso esconde VPN, rotas, firewall, subnets e pontos de controle."
      },
      {
        "answer": "Criar muitos segmentos sem plano de operação.",
        "whyItIsWrong": "Segmentação sem documentação e validação cria complexidade e falhas difíceis de diagnosticar."
      }
    ],
    "finalAnswer": "Uma solução adequada mostra fisicamente usuários/APs/switch/firewall/link/cloud e logicamente segmentos de usuários, visitantes, servidores e VPN cloud. Visitantes acessam somente internet. Usuários acessam servidores conforme regra. Servidores não iniciam tráfego livre para usuários. A VPN passa pelo firewall. O plano de validação testa IP, gateway, DNS, rota, porta e regras bloqueadas."
  },
  "glossary": [
    {
      "term": "Topologia física",
      "shortDefinition": "Forma como equipamentos e enlaces estão conectados fisicamente.",
      "longDefinition": "Representa cabos, portas, APs, switches, roteadores, racks, links e caminhos físicos ou de rádio.",
      "example": "Notebook conectado por Wi-Fi a um AP que está cabeado a um switch.",
      "relatedTerms": [
        "camada física",
        "meio",
        "cabeamento"
      ],
      "relatedLessons": [
        "0.5",
        "1.4",
        "1.5"
      ]
    },
    {
      "term": "Topologia lógica",
      "shortDefinition": "Forma como o tráfego flui por segmentos, rotas e políticas.",
      "longDefinition": "Representa VLANs, subnets, gateways, rotas, firewalls, túneis, serviços e caminhos funcionais.",
      "example": "Usuários e servidores no mesmo switch físico, mas separados por VLAN e firewall.",
      "relatedTerms": [
        "VLAN",
        "rota",
        "firewall"
      ],
      "relatedLessons": [
        "1.4",
        "2.1",
        "3.8",
        "4.1"
      ]
    },
    {
      "term": "Ponto único de falha",
      "shortDefinition": "Componente cuja falha derruba uma função importante sem alternativa automática.",
      "longDefinition": "Pode ser switch, firewall, roteador, link, AP, servidor DNS ou qualquer dependência sem redundância.",
      "example": "Um único firewall sem alta disponibilidade conectando toda empresa à internet.",
      "relatedTerms": [
        "disponibilidade",
        "redundância",
        "resiliência"
      ],
      "relatedLessons": [
        "0.6",
        "1.4",
        "15.1"
      ]
    },
    {
      "term": "Hub-and-spoke",
      "shortDefinition": "Topologia em que vários pontos remotos se conectam a um hub central.",
      "longDefinition": "Muito usada em WAN, VPN e cloud para centralizar inspeção, roteamento ou serviços compartilhados.",
      "example": "Filiais conectadas por VPN a um datacenter central.",
      "relatedTerms": [
        "WAN",
        "VPN",
        "cloud hub"
      ],
      "relatedLessons": [
        "1.4",
        "10.1",
        "14.4"
      ]
    },
    {
      "term": "Spine-leaf",
      "shortDefinition": "Topologia de datacenter com switches leaf conectados a switches spine.",
      "longDefinition": "Busca baixa latência previsível e escala horizontal, reduzindo gargalos tradicionais de hierarquias antigas.",
      "example": "Servidores conectados a leafs; leafs conectados a todos os spines.",
      "relatedTerms": [
        "datacenter",
        "east-west traffic",
        "underlay"
      ],
      "relatedLessons": [
        "1.4",
        "11.1",
        "14.8"
      ]
    },
    {
      "term": "Caminho assimétrico",
      "shortDefinition": "Quando ida e volta do tráfego usam caminhos diferentes.",
      "longDefinition": "Pode causar problemas em firewalls stateful, NAT, troubleshooting e correlação de logs.",
      "example": "Pacote sai por um firewall e retorna por outro que não viu o início da sessão.",
      "relatedTerms": [
        "roteamento",
        "firewall stateful",
        "NAT"
      ],
      "relatedLessons": [
        "1.4",
        "9.1",
        "11.5"
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
      "1.5"
    ]
  }
};
