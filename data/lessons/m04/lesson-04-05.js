export const lesson0405 = {
  "id": "4.5",
  "moduleId": "m04",
  "order": 5,
  "title": "Gateway padrão e rota local",
  "subtitle": "Como um host decide se entrega diretamente na rede local ou envia tráfego ao próximo salto.",
  "duration": "90-125 min",
  "estimatedStudyTimeMinutes": 125,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 220,
  "tags": [
    "redes",
    "ipv4",
    "gateway",
    "rota default",
    "rota local",
    "next hop",
    "arp",
    "roteamento",
    "cloud",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.1",
      "reason": "A aula 4.1 explicou por que IPv4 existe e como ele permite comunicação entre redes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.3",
      "reason": "A aula 4.3 explicou máscara e CIDR, base para decidir se um destino é local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.4",
      "reason": "A aula 4.4 explicou rede, hosts e broadcast, base para validar se o gateway está no bloco correto."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "A aula 3.5 explicou ARP, necessário para entender como o host descobre o MAC do gateway."
    }
  ],
  "objectives": [
    "Explicar o que é gateway padrão e por que ele existe.",
    "Diferenciar rota local, rota específica e rota default.",
    "Descrever como um host decide entre entregar ao destino local ou ao gateway.",
    "Relacionar gateway com ARP, VLANs, roteadores, firewalls e cloud.",
    "Diagnosticar problemas comuns de gateway ausente, incorreto ou inacessível."
  ],
  "learningOutcomes": [
    "Dado IP, máscara e destino, o aluno decide se o tráfego é local ou remoto.",
    "Dada uma tabela de rotas simples, o aluno identifica a rota default.",
    "Dado um gateway incorreto, o aluno explica o impacto operacional.",
    "Dado um cenário cloud, o aluno diferencia rota local e rota default para saída."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n\n<p>Depois de entender IPv4, máscara, CIDR, endereço de rede, hosts e broadcast, aparece a pergunta que conecta a rede local ao resto do mundo: quando um computador quer falar com um destino fora da sua própria rede, para onde ele envia o pacote?</p>\n<p>A resposta prática é o <strong>gateway padrão</strong>. Sem ele, o host até consegue falar com dispositivos da mesma rede local, mas não sabe para quem entregar pacotes destinados a outras redes. É por isso que um usuário pode conseguir pingar a impressora da sala, mas não acessar a internet; ou um servidor pode responder localmente, mas não alcançar uma API externa.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> uma estação está com IP <code>192.168.10.25/24</code>, máscara correta e DNS configurado. Ela pinga <code>192.168.10.30</code>, mas não acessa <code>8.8.8.8</code> nem sistemas externos. O problema pode não ser DNS, cabo ou firewall: pode ser ausência, erro ou inacessibilidade do gateway padrão.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n\n<p>O IPv4 nasceu para permitir comunicação entre redes diferentes. Ethernet resolvia a entrega dentro de um mesmo enlace local, mas não tinha uma forma global e hierárquica de levar tráfego de uma rede para outra. A internet só se tornou possível porque hosts e roteadores passaram a tomar decisões com base em endereços IP e tabelas de rota.</p>\n<p>Em redes pequenas, cada host poderia teoricamente conhecer rotas específicas para vários destinos. Isso, porém, não escala. Para simplificar a vida dos hosts finais, surgiu o uso prático de uma rota padrão: quando o destino não está na rede local e não existe uma rota mais específica, envie para um roteador conhecido. Esse roteador é o gateway padrão.</p>\n<p>Hoje, o conceito aparece em redes domésticas, VLANs corporativas, datacenters, redes cloud, containers, VPNs e Kubernetes. O nome muda um pouco — default gateway, next hop, default route, internet gateway, NAT gateway, route table — mas a ideia central permanece: existe um próximo salto responsável por levar o tráfego para fora do domínio local.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n\n<p>O problema que o gateway resolve é a falta de conhecimento completo no host final. Um notebook não precisa saber todas as rotas da internet, todas as redes internas da empresa ou todos os caminhos possíveis no datacenter. Ele precisa saber duas coisas básicas: quais destinos são locais e para qual próximo salto enviar os destinos que não são locais.</p>\n<ul class=\"flow-list\"><li><strong>Destino local:</strong> o host usa ARP para descobrir o MAC do próprio destino.</li><li><strong>Destino remoto:</strong> o host usa ARP para descobrir o MAC do gateway.</li><li><strong>Sem gateway:</strong> o host só consegue falar com a própria rede local, salvo rotas específicas.</li><li><strong>Gateway errado:</strong> o host entrega pacotes ao próximo salto incorreto ou inexistente.</li><li><strong>Gateway inacessível:</strong> a configuração parece correta, mas a entrega de Camada 2 falha.</li></ul>\n<div class=\"callout callout--warning\"><strong>Erro comum:</strong> achar que DNS resolve tudo. DNS transforma nomes em IPs. Gateway decide para onde enviar pacotes quando o IP de destino está fora da rede local.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n\n<p>O gateway padrão começou como uma forma simples de conectar uma rede local a outras redes. Com o crescimento das arquiteturas, ele evoluiu para uma peça central de roteamento, segurança, NAT, inspeção, segmentação e conectividade híbrida.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Contexto</th><th>Gateway típico</th><th>Função</th><th>Risco operacional</th></tr></thead><tbody><tr><td>Casa</td><td>Roteador Wi-Fi</td><td>Levar tráfego para a internet</td><td>Gateway incorreto ou DHCP quebrado</td></tr><tr><td>Empresa</td><td>Firewall, roteador ou SVI</td><td>Interligar VLANs e redes externas</td><td>Assimetria, ACL incorreta, HA mal configurado</td></tr><tr><td>Cloud</td><td>Route table, NAT gateway, internet gateway, virtual appliance</td><td>Definir saída e entrada de subnets</td><td>Rota default ampla, exposição indevida, custo de NAT</td></tr><tr><td>DevSecOps</td><td>Gateway de VPC/VNet, CNI, node, bridge</td><td>Permitir e controlar comunicação de workloads</td><td>Pipeline cria rota ou CIDR errado</td></tr></tbody></table>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n\n<p>O <strong>gateway padrão</strong> é o próximo salto usado por um host quando ele precisa enviar tráfego para um destino que não pertence à sua rede local e não existe uma rota mais específica. A <strong>rota local</strong> é a rota que cobre a própria rede do host, derivada do IP e da máscara.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> se um host tem <code>192.168.10.25/24</code> e gateway <code>192.168.10.1</code>, ele entende que <code>192.168.10.0/24</code> é local. Para destinos fora desse bloco, como <code>10.20.30.40</code> ou <code>8.8.8.8</code>, ele envia o pacote ao gateway <code>192.168.10.1</code>.</div>\n<p>Na tabela de rotas, a rota padrão costuma aparecer como <code>0.0.0.0/0</code>. Ela significa, de forma prática: “qualquer destino que não tenha uma rota mais específica deve seguir por este próximo salto”.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n\n<p>O processo interno de decisão do host é metódico. Ele não “manda tudo para o gateway”. Primeiro, ele verifica se o destino está na mesma rede local usando IP e máscara. Depois, consulta a tabela de rotas. Só então decide o próximo salto.</p>\n<ol class=\"flow-list\"><li>Aplicar a máscara ao IP local para descobrir a rede local.</li><li>Aplicar a mesma lógica ao IP de destino para avaliar se ele pertence ao mesmo bloco.</li><li>Se o destino for local, fazer ARP para o MAC do destino.</li><li>Se o destino for remoto, procurar rota mais específica na tabela de rotas.</li><li>Se não houver rota mais específica, usar a rota padrão <code>0.0.0.0/0</code>.</li><li>Fazer ARP para o MAC do gateway, não para o MAC do destino remoto.</li><li>Montar um frame Ethernet com MAC de destino do gateway e pacote IP com destino final preservado.</li><li>Entregar ao switch, que encaminha ao gateway.</li><li>O gateway remove o frame recebido, analisa o pacote IP e decide o próximo salto.</li></ol>\n<p>Esse ponto é essencial: o <strong>IP de destino não muda</strong> quando o host envia ao gateway. O que muda a cada enlace é o cabeçalho de Camada 2, especialmente os MACs de origem e destino.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n\n<p>Arquiteturalmente, o gateway padrão fica no limite lógico da rede local. Ele pode ser uma interface de roteador, uma interface VLAN em switch L3, um firewall, um appliance virtual, um roteador doméstico ou uma abstração de cloud. Em todos os casos, sua função é servir como próximo salto para tráfego que precisa sair do segmento local.</p>\n<ul><li><strong>Na LAN:</strong> o gateway geralmente está no mesmo bloco IPv4 dos hosts.</li><li><strong>Na VLAN:</strong> cada VLAN costuma ter seu próprio gateway.</li><li><strong>No firewall:</strong> o gateway também pode aplicar política, NAT, inspeção e logging.</li><li><strong>Na cloud:</strong> a rota default pode apontar para internet gateway, NAT gateway, firewall virtual, transit gateway ou appliance.</li><li><strong>Em HA:</strong> tecnologias como HSRP, VRRP ou CARP podem fornecer um IP virtual de gateway.</li></ul>\n<div class=\"callout callout--security\"><strong>Visão de segurança:</strong> o gateway é um ponto natural de controle e visibilidade. Colocar tráfego sensível para passar por um gateway sem logging, inspeção e política reduz muito a capacidade de detecção e resposta.</div>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n\n<p>Pense em um prédio empresarial. Dentro do seu andar, você sabe entregar documentos diretamente nas mesas das pessoas. Esse é o tráfego local. Mas se o documento precisa ir para outro prédio, você não sai procurando a mesa final sozinho: você entrega para a portaria ou expedição. A portaria é o gateway.</p>\n<p>O endereço final do envelope continua sendo o destinatário real. A portaria apenas é o próximo ponto de encaminhamento. Em redes, o host mantém o IP de destino final, mas entrega o frame Ethernet ao MAC do gateway.</p>\n<p>A limitação da analogia é que, em redes reais, a decisão é feita por tabelas de rota, máscaras, prefixos, ARP, políticas, NAT e métricas. Mesmo assim, a ideia central ajuda: <strong>para sair da sua rede local, você entrega ao próximo salto</strong>.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n\n<p>Imagine o notebook abaixo:</p>\n<table class=\"data-table\"><tbody><tr><th>IP</th><td><code>192.168.1.50</code></td></tr><tr><th>Máscara</th><td><code>255.255.255.0</code> ou <code>/24</code></td></tr><tr><th>Gateway</th><td><code>192.168.1.1</code></td></tr><tr><th>Destino A</th><td><code>192.168.1.80</code></td></tr><tr><th>Destino B</th><td><code>8.8.8.8</code></td></tr></tbody></table>\n<p>Para falar com <code>192.168.1.80</code>, o notebook percebe que o destino está em <code>192.168.1.0/24</code>. Ele faz ARP para o MAC de <code>192.168.1.80</code>. Para falar com <code>8.8.8.8</code>, percebe que o destino não está na rede local. Ele faz ARP para o MAC de <code>192.168.1.1</code> e entrega o pacote ao gateway.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n\n<p>Em uma empresa, a VLAN 10 pode ser usuários, a VLAN 20 servidores e a VLAN 30 impressoras. Cada VLAN tem seu próprio gateway:</p>\n<table class=\"data-table\"><thead><tr><th>VLAN</th><th>Bloco</th><th>Gateway</th><th>Função</th></tr></thead><tbody><tr><td>10</td><td><code>10.10.10.0/24</code></td><td><code>10.10.10.1</code></td><td>Usuários</td></tr><tr><td>20</td><td><code>10.10.20.0/24</code></td><td><code>10.10.20.1</code></td><td>Servidores</td></tr><tr><td>30</td><td><code>10.10.30.0/24</code></td><td><code>10.10.30.1</code></td><td>Impressoras</td></tr></tbody></table>\n<p>Quando um usuário da VLAN 10 acessa um servidor da VLAN 20, ele não faz ARP diretamente para o servidor. Ele entrega o tráfego ao gateway da VLAN 10. O roteamento entre VLANs e as políticas de firewall decidem se a comunicação é permitida.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n\n<p>Em cloud, o conceito aparece nas route tables. Uma subnet privada pode ter uma rota local para a VPC/VNet e uma rota default apontando para um NAT gateway. Uma subnet pública pode ter uma rota default apontando para um internet gateway. Uma subnet corporativa pode apontar tráfego default para um firewall virtual ou appliance de inspeção.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Subnet</th><th>Rota local</th><th>Rota default</th><th>Impacto</th></tr></thead><tbody><tr><td>Privada de aplicação</td><td>VPC/VNet</td><td>NAT gateway</td><td>Sai para internet sem receber entrada direta</td></tr><tr><td>Pública</td><td>VPC/VNet</td><td>Internet gateway</td><td>Pode expor recursos se regras permitirem</td></tr><tr><td>Inspecionada</td><td>VPC/VNet</td><td>Firewall virtual</td><td>Centraliza logs e política</td></tr></tbody></table>\n<p>O erro mais perigoso em cloud é criar uma rota default para internet sem entender security groups, NACLs, IP público, NAT, logging e exposição real do serviço.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n\n<p>Em DevSecOps, gateway e rota local aparecem em IaC, pipelines, containers e ambientes efêmeros. Um Terraform pode criar uma subnet, uma route table e uma rota default. Um pipeline pode subir um runner em uma subnet privada que precisa acessar repositórios externos por NAT. Um cluster Kubernetes pode depender do CNI para decidir o caminho entre pods, nodes e redes externas.</p>\n<p>Falhas comuns incluem: rota default ausente em ambiente de build, NAT gateway inexistente para runners privados, CIDR sobreposto com VPN corporativa, route table anexada à subnet errada e firewall virtual sem rota de retorno. O resultado é conhecido: pipeline “sem internet”, deploy que falha ao baixar imagem, aplicação que conecta ao banco mas não acessa API externa, ou tráfego que sai sem inspeção.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n\n<p>Do ponto de vista de Segurança da Informação, o gateway é um ponto de controle, mas também um ponto de risco. Quem controla o gateway controla parte importante do caminho do tráfego. Por isso, configurações de gateway precisam ser protegidas contra erro, alteração indevida e ataques de rede local.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Sintoma</th><th>Mitigação</th></tr></thead><tbody><tr><td>Gateway falso por DHCP indevido</td><td>Hosts passam a sair por equipamento não autorizado</td><td>DHCP snooping, NAC, segmentação e monitoramento</td></tr><tr><td>ARP spoofing contra gateway</td><td>MAC do gateway muda no cache ARP</td><td>DAI, port security, 802.1X, criptografia ponta a ponta</td></tr><tr><td>Rota default ampla em cloud</td><td>Serviços privados ganham saída/entrada indevida</td><td>Revisão de route tables, firewall, SG/NACL e logging</td></tr><tr><td>Gateway sem logs</td><td>Baixa visibilidade para investigação</td><td>Centralização em SIEM, NetFlow, firewall logs e alertas</td></tr></tbody></table>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m04l05-title m04l05-desc\">\n  <title id=\"m04l05-title\">Gateway padrão e rota local</title>\n  <desc id=\"m04l05-desc\">Diagrama mostrando um host decidindo entre destino local e destino remoto, usando ARP para o destino local ou para o gateway padrão.</desc>\n  <defs>\n    <marker id=\"m04l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\" /></marker>\n  </defs>\n  <rect x=\"35\" y=\"35\" width=\"910\" height=\"95\" rx=\"18\" class=\"svg-zone\" />\n  <text x=\"490\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Host: 192.168.10.25/24</text>\n  <text x=\"490\" y=\"104\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rede local: 192.168.10.0/24 | Gateway padrão: 192.168.10.1 | Rota default: 0.0.0.0/0</text>\n  <rect x=\"70\" y=\"210\" width=\"170\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"155\" y=\"248\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n  <text x=\"155\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.25</text>\n  <rect x=\"390\" y=\"200\" width=\"190\" height=\"125\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"485\" y=\"240\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n  <text x=\"485\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2</text>\n  <rect x=\"735\" y=\"205\" width=\"175\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"822\" y=\"245\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n  <text x=\"822\" y=\"275\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1</text>\n  <rect x=\"390\" y=\"400\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"485\" y=\"435\" text-anchor=\"middle\" class=\"svg-label\">Destino local</text>\n  <text x=\"485\" y=\"462\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.80</text>\n  <rect x=\"735\" y=\"400\" width=\"175\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n  <text x=\"822\" y=\"435\" text-anchor=\"middle\" class=\"svg-label\">Destino remoto</text>\n  <text x=\"822\" y=\"462\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">8.8.8.8</text>\n  <line x1=\"240\" y1=\"262\" x2=\"390\" y2=\"262\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l05-arrow)\" />\n  <line x1=\"580\" y1=\"262\" x2=\"735\" y2=\"262\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l05-arrow)\" />\n  <line x1=\"485\" y1=\"325\" x2=\"485\" y2=\"400\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l05-arrow)\" />\n  <line x1=\"822\" y1=\"320\" x2=\"822\" y2=\"400\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m04l05-arrow)\" />\n  <text x=\"310\" y=\"245\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP para destino local</text>\n  <text x=\"655\" y=\"245\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP para MAC do gateway</text>\n  <text x=\"710\" y=\"365\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP final continua remoto; MAC final do enlace é o gateway</text>\n</svg>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n\n<p>O laboratório desta aula treina a identificação de gateway padrão, rota local e rota default. A ideia não é alterar a rede de produção, mas observar a configuração existente, interpretar a tabela de rotas e relacionar gateway com ARP.</p>\n\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n\n<p>Os exercícios reforçam a decisão entre tráfego local e remoto, identificação da rota default e interpretação de gateways em redes domésticas, empresariais e cloud.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n\n<p>Você irá analisar uma estação que acessa recursos locais, mas não acessa a internet. A missão é criar uma hipótese técnica, coletar evidências e diferenciar problema de gateway, DNS, rota, ARP e firewall.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n\n<p>A solução comentada mostra como validar IP/máscara, rede local, gateway, rota default, ARP do gateway e conectividade por etapas, sem pular diretamente para conclusões.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n\n<ul><li>Gateway padrão é o próximo salto usado para destinos fora da rede local.</li><li>A rota local é derivada de IP e máscara.</li><li>A rota default geralmente aparece como <code>0.0.0.0/0</code>.</li><li>Para destino local, o host faz ARP para o destino.</li><li>Para destino remoto, o host faz ARP para o gateway.</li><li>O IP de destino final permanece; os MACs mudam a cada enlace.</li><li>Gateway errado, ausente ou inacessível é causa comum de falhas IPv4.</li></ul>\n\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n\n<p>Na próxima aula, estudaremos <strong>IPv4 público, privado, loopback e APIPA</strong>. Depois de entender o gateway, vamos separar os tipos de endereço e entender por que nem todo IPv4 tem o mesmo escopo ou a mesma função.</p>\n\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2 — Enlace",
      "Camada 3 — Rede"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet"
    ],
    "relatedProtocols": [
      "IPv4",
      "ARP",
      "ICMP",
      "DHCP",
      "TCP",
      "UDP"
    ],
    "dependsOn": [
      "máscara",
      "CIDR",
      "endereço de rede",
      "ARP",
      "tabela de rotas",
      "VLAN"
    ],
    "enables": [
      "roteamento entre redes",
      "inter-VLAN routing",
      "acesso à internet",
      "VPN",
      "cloud route tables",
      "troubleshooting IPv4"
    ]
  },
  "protocolFields": [
    {
      "name": "Destination IPv4",
      "bits": "32",
      "description": "Endereço IPv4 final que o host deseja alcançar.",
      "securityNote": "Logs de destino ajudam investigação, mas devem ser contextualizados com NAT, proxy e rota."
    },
    {
      "name": "Source IPv4",
      "bits": "32",
      "description": "Endereço IPv4 da origem antes de NAT ou tradução posterior.",
      "securityNote": "Pode mudar em firewalls/NAT, exigindo correlação de logs."
    },
    {
      "name": "Subnet Mask/CIDR",
      "bits": "variável",
      "description": "Define a rede local e separa bits de rede e host.",
      "securityNote": "Máscara errada pode transformar destino remoto em falso local ou vice-versa."
    },
    {
      "name": "Default Gateway",
      "bits": "32",
      "description": "IPv4 do próximo salto usado para destinos sem rota mais específica.",
      "securityNote": "Gateway falso ou indevido pode causar interceptação, perda de tráfego ou bypass de controles."
    },
    {
      "name": "Route Prefix",
      "bits": "variável",
      "description": "Prefixo da rota consultada na tabela de rotas.",
      "securityNote": "Rotas mais específicas podem desviar tráfego de caminhos monitorados."
    },
    {
      "name": "Next Hop",
      "bits": "32 ou interface",
      "description": "Próximo salto ou interface de saída escolhida para encaminhamento.",
      "securityNote": "Next hop errado pode gerar indisponibilidade ou tráfego fora da política."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Host recebe destino",
      "description": "A aplicação tenta comunicar com um IP de destino.",
      "layer": "Aplicação/Rede",
      "securityNote": "O nome DNS, se houver, já deve ter sido resolvido para um IP."
    },
    {
      "step": 2,
      "name": "Host calcula rede local",
      "description": "Usa IP e máscara para saber qual bloco é local.",
      "layer": "Camada 3",
      "securityNote": "Máscara incorreta altera toda a decisão de encaminhamento."
    },
    {
      "step": 3,
      "name": "Consulta tabela de rotas",
      "description": "Procura a rota mais específica para o destino.",
      "layer": "Camada 3",
      "securityNote": "Rotas estáticas indevidas podem burlar o caminho esperado."
    },
    {
      "step": 4,
      "name": "Decide próximo salto",
      "description": "Se local, usa o destino; se remoto, usa o gateway/next hop.",
      "layer": "Camada 3",
      "securityNote": "Gateway falso é risco crítico em rede local."
    },
    {
      "step": 5,
      "name": "Resolve MAC via ARP",
      "description": "Descobre o MAC do destino local ou do gateway.",
      "layer": "Camada 2",
      "securityNote": "ARP spoofing pode alterar o MAC associado ao gateway."
    },
    {
      "step": 6,
      "name": "Envia frame Ethernet",
      "description": "Frame vai ao MAC do próximo salto, mantendo IP de destino final.",
      "layer": "Camada 2/3",
      "securityNote": "Capturas devem ser sanitizadas antes de documentação."
    },
    {
      "step": 7,
      "name": "Gateway roteia",
      "description": "O gateway desencapsula o frame, analisa o pacote IP e escolhe a próxima rota.",
      "layer": "Camada 3",
      "securityNote": "Logs e políticas no gateway são essenciais para auditoria."
    }
  ],
  "deepDive": {
    "mentalModel": "O host primeiro pergunta: este destino está na minha rede local? Se sim, entrego diretamente. Se não, entrego ao gateway padrão ou a uma rota mais específica.",
    "keyTerms": [
      "gateway padrão",
      "rota local",
      "rota default",
      "next hop",
      "tabela de rotas",
      "0.0.0.0/0"
    ],
    "limitations": [
      "Gateway padrão não substitui firewall nem política de acesso.",
      "Rota default não garante retorno do tráfego.",
      "Um gateway correto na configuração pode estar inacessível na Camada 2.",
      "DNS funcionando não prova que gateway está correto."
    ],
    "whenToUse": [
      "Ao configurar hosts, servidores e impressoras.",
      "Ao criar VLANs e SVIs.",
      "Ao revisar route tables em cloud.",
      "Ao diagnosticar falta de acesso à internet ou redes remotas.",
      "Ao desenhar tráfego inspecionado por firewall."
    ],
    "whenNotToUse": [
      "Não use gateway fora da rede local do host.",
      "Não force rota default para internet em subnets que deveriam ser isoladas.",
      "Não assuma que todo tráfego deve sair pelo mesmo caminho em ambientes com políticas específicas."
    ],
    "operationalImpact": [
      "Gateway errado gera falhas amplas e aparenta ser problema de DNS ou firewall.",
      "Gateway centraliza tráfego e pode ser gargalo ou ponto único de falha.",
      "HA de gateway exige monitoramento de IP virtual, MAC virtual e convergência."
    ],
    "financialImpact": [
      "Em cloud, NAT gateways e appliances de inspeção podem gerar custo por hora e por volume de tráfego.",
      "Rotas erradas podem causar consumo de link, tráfego inter-região ou indisponibilidade.",
      "Troubleshooting de gateway mal documentado consome tempo de várias equipes."
    ],
    "securityImpact": [
      "Gateway é ponto crítico de inspeção, logging e controle.",
      "Gateway falso ou ARP spoofing pode causar interceptação ou negação de serviço.",
      "Rotas default amplas podem expor workloads que deveriam ficar privados."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Configurar gateway fora da sub-rede local.",
      "whyItHappens": "O aluno pensa no gateway como qualquer roteador, não como próximo salto alcançável localmente.",
      "consequence": "O host pode não conseguir resolver ARP para o gateway e não sai da rede.",
      "correction": "Validar se o gateway pertence ao bloco local e está dentro da faixa de hosts utilizáveis."
    },
    {
      "mistake": "Confundir gateway com DNS.",
      "whyItHappens": "Ambos aparecem na configuração de rede e ambos afetam acesso a serviços.",
      "consequence": "O diagnóstico vai para o lugar errado.",
      "correction": "Testar IP externo antes de nome; se IP externo falha, investigue rota/gateway antes de DNS."
    },
    {
      "mistake": "Achar que o MAC do destino remoto aparece no frame local.",
      "whyItHappens": "Mistura entre Camada 2 e Camada 3.",
      "consequence": "Interpretação errada de captura e ARP.",
      "correction": "Lembrar que o frame local usa MAC do gateway quando o destino IP é remoto."
    },
    {
      "mistake": "Criar rota default em cloud sem revisar exposição.",
      "whyItHappens": "Busca por conectividade rápida.",
      "consequence": "Workloads privados podem ganhar caminho indevido para internet.",
      "correction": "Revisar route tables, firewalls, security groups, NACLs, NAT e logs."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host acessa recursos locais, mas não acessa internet.",
      "Ping no gateway falha.",
      "ARP do gateway fica incompleto ou muda com frequência.",
      "Tabela de rotas não possui rota default.",
      "Cloud VM não acessa repositório externo mesmo com DNS resolvendo.",
      "Tráfego sai, mas resposta não volta por rota assimétrica."
    ],
    "diagnosticQuestions": [
      "Qual é o IP/máscara do host?",
      "Qual é a rede local calculada?",
      "O gateway está dentro da rede local?",
      "Existe rota default?",
      "O host consegue resolver ARP para o gateway?",
      "O gateway responde ICMP ou bloqueia ping por política?",
      "Há firewall, NAT, VPN ou route table interferindo?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Ver IP, máscara, gateway e DNS.",
        "expectedObservation": "Default Gateway presente e coerente com a sub-rede.",
        "interpretation": "Se gateway estiver ausente ou fora do bloco, o problema é de configuração de rede."
      },
      {
        "platform": "Windows",
        "command": "route print",
        "purpose": "Ver tabela de rotas.",
        "expectedObservation": "Rota 0.0.0.0/0 apontando para o gateway correto.",
        "interpretation": "Sem rota default, destinos remotos não têm caminho padrão."
      },
      {
        "platform": "Windows",
        "command": "arp -a",
        "purpose": "Ver resolução MAC do gateway.",
        "expectedObservation": "Entrada para o IP do gateway após teste de conectividade.",
        "interpretation": "Sem entrada ou entrada instável sugere problema de L2, ARP ou gateway falso."
      },
      {
        "platform": "Linux",
        "command": "ip addr show && ip route",
        "purpose": "Ver endereços, prefixos e rotas.",
        "expectedObservation": "default via <gateway> dev <interface>.",
        "interpretation": "Confirma rota default e interface de saída."
      },
      {
        "platform": "Linux",
        "command": "ip neigh show",
        "purpose": "Ver vizinhos ARP/NDP locais.",
        "expectedObservation": "Gateway em estado REACHABLE, STALE ou DELAY, dependendo do uso.",
        "interpretation": "FAILED ou INCOMPLETE sugere falha de L2/ARP."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route 0.0.0.0",
        "purpose": "Ver rota default em roteador/switch L3.",
        "expectedObservation": "Rota estática, dinâmica ou gateway of last resort.",
        "interpretation": "Sem rota default no gateway, hosts podem entregar ao roteador, mas ele não sabe para onde seguir."
      },
      {
        "platform": "Cisco IOS",
        "command": "show arp | include <ip-do-gateway-ou-host>",
        "purpose": "Validar ARP no equipamento de rede.",
        "expectedObservation": "IP associado ao MAC esperado.",
        "interpretation": "Ajuda a detectar conflito, ARP inconsistente ou equipamento errado."
      }
    ],
    "decisionTree": [
      {
        "if": "Destino local funciona, mas destino remoto falha",
        "then": "Verificar gateway, rota default e conectividade até o gateway."
      },
      {
        "if": "Gateway está fora da sub-rede local",
        "then": "Corrigir gateway ou máscara/CIDR."
      },
      {
        "if": "Não há rota 0.0.0.0/0",
        "then": "Adicionar/receber rota default por DHCP ou configuração manual, conforme política."
      },
      {
        "if": "ARP do gateway falha",
        "then": "Investigar VLAN, cabo, switch, gateway desligado, trunk, DAI ou port security."
      },
      {
        "if": "Gateway responde, mas internet falha",
        "then": "Investigar firewall, NAT, rota do gateway, DNS e política de saída."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Configurar gateway manualmente sem validar CIDR.",
      "Permitir qualquer equipamento anunciar DHCP na LAN.",
      "Usar rede plana com um único gateway para tudo.",
      "Criar rota default em cloud apenas para resolver pressa de conectividade.",
      "Compartilhar prints de rotas internas sem sanitização."
    ],
    "vulnerabilities": [
      {
        "name": "Gateway falso via DHCP rogue.",
        "description": "Risco relacionado à aula 4.5 — Gateway padrão e rota local.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "DHCP snooping."
      },
      {
        "name": "ARP spoofing contra o gateway.",
        "description": "Risco relacionado à aula 4.5 — Gateway padrão e rota local.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Dynamic ARP Inspection."
      },
      {
        "name": "Rota default insegura.",
        "description": "Risco relacionado à aula 4.5 — Gateway padrão e rota local.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "802.1X/NAC."
      },
      {
        "name": "Bypass de firewall por rota alternativa.",
        "description": "Risco relacionado à aula 4.5 — Gateway padrão e rota local.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Port security."
      },
      {
        "name": "Ausência de logs no ponto de saída.",
        "description": "Risco relacionado à aula 4.5 — Gateway padrão e rota local.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Controle de mudanças em rotas."
      },
      {
        "name": "Route table drift em IaC.",
        "description": "Risco relacionado à aula 4.5 — Gateway padrão e rota local.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão de IaC e policy-as-code."
      }
    ],
    "mitigations": [
      "DHCP snooping.",
      "Dynamic ARP Inspection.",
      "802.1X/NAC.",
      "Port security.",
      "Controle de mudanças em rotas.",
      "Revisão de IaC e policy-as-code.",
      "Firewall como ponto de inspeção obrigatório.",
      "Alertas para alterações de gateway/route table."
    ],
    "goodPractices": [
      "Documentar gateway por VLAN/subnet.",
      "Proteger DHCP contra servidores não autorizados.",
      "Usar DHCP snooping e Dynamic ARP Inspection quando disponível.",
      "Centralizar logs de firewall/gateway em SIEM.",
      "Aplicar princípio do menor privilégio em route tables cloud.",
      "Evitar rota default direta para internet em subnets sensíveis.",
      "Monitorar mudanças de rota, MAC do gateway e IP virtual de HA."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "DHCP snooping.",
      "Dynamic ARP Inspection.",
      "802.1X/NAC.",
      "Port security.",
      "Controle de mudanças em rotas.",
      "Revisão de IaC e policy-as-code.",
      "Firewall como ponto de inspeção obrigatório.",
      "Alertas para alterações de gateway/route table."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-4.5",
    "title": "Investigando gateway padrão e rota local com segurança",
    "labType": "cloud",
    "objective": "Identificar IP, máscara, rede local, gateway, rota default e ARP do gateway em um host real ou laboratório.",
    "scenario": "15. Laboratório O laboratório desta aula treina a identificação de gateway padrão, rota local e rota default. A ideia não é alterar a rede de produção, mas observar a configuração existente, interpretar a tabela de rotas e relacionar gateway com ARP.",
    "topology": "Um computador conectado a uma rede local com gateway padrão; opcionalmente um roteador/switch L3 no Packet Tracer ou laboratório doméstico.",
    "architecture": "Host final → switch/AP → gateway padrão → redes remotas/internet. O laboratório observa configuração e evidências sem alterar produção.",
    "prerequisites": [
      "Windows ou Linux",
      "Acesso a terminal",
      "Rede local funcional",
      "Opcional: Packet Tracer, Wireshark ou tcpdump",
      "Opcional: acesso read-only a switch/roteador"
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 125,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não altere gateway de máquinas de produção sem janela e autorização.",
      "Não execute técnicas de gateway falso, ARP spoofing ou DHCP rogue.",
      "Sanitize IP público, MAC, SSID, nomes de host e dados da empresa antes de registrar evidências.",
      "Em rede corporativa, use apenas comandos permitidos e evidências aprovadas.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Coletar configuração IP no Windows",
        "instruction": "Abra o terminal e colete IPv4, máscara, gateway e DNS.",
        "command": "ipconfig /all",
        "expectedOutput": "A saída mostra IPv4, Subnet Mask e Default Gateway.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Gateway padrão e rota local” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Coletar configuração IP no Linux",
        "instruction": "Em Linux, colete endereço com prefixo e rota default.",
        "command": "ip addr show\nip route",
        "expectedOutput": "A saída mostra endereço em CIDR e linha default via gateway.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Gateway padrão e rota local” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Identificar rota local e rota default",
        "instruction": "No Windows, consulte a tabela de rotas; no Linux, interprete a saída de ip route.",
        "command": "route print\nip route",
        "expectedOutput": "Deve existir uma rota para a rede local e uma rota default 0.0.0.0/0 ou default via.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Gateway padrão e rota local” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Testar conectividade com o gateway",
        "instruction": "Faça ping no gateway se a política permitir ICMP.",
        "command": "ping <gateway>\nping -c 4 <gateway>",
        "expectedOutput": "Resposta do gateway ou bloqueio conhecido por política.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Gateway padrão e rota local” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Verificar ARP do gateway",
        "instruction": "Consulte a tabela ARP/vizinhos após tentar alcançar o gateway.",
        "command": "arp -a\nip neigh show",
        "expectedOutput": "Entrada do gateway associada a um MAC.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Gateway padrão e rota local” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Testar destino remoto por IP",
        "instruction": "Teste conectividade com um IP remoto permitido pelo ambiente.",
        "command": "ping 8.8.8.8\nping -c 4 8.8.8.8",
        "expectedOutput": "Resposta se ICMP externo for permitido; caso contrário, ao menos tentativa sai pela rota default.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Gateway padrão e rota local” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Montar matriz de evidências",
        "instruction": "Organize IP, máscara, rede local, gateway, rota default, ARP do gateway e resultado dos testes.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Uma tabela técnica com evidências e interpretação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Gateway padrão e rota local” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Gateway padrão e rota local”.",
    "validation": [
      {
        "check": "A entrega deve conter tabela de rotas interpretada, cálculo da rede local, gateway validado e conclusão técnica.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "A entrega deve conter tabela de rotas interpretada, cálculo da rede local, gateway validado e conclusão técnica.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se comandos não existirem, usar equivalentes do sistema. Se ICMP for bloqueado, complementar com tabela de rotas, ARP, traceroute/tracert e logs autorizados.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Repetir em uma VM com IP manual errado para comparar sintomas.",
      "Montar cenário Packet Tracer com gateway ausente e gateway incorreto.",
      "Adicionar coleta de traceroute/tracert em ambiente autorizado.",
      "Relacionar o resultado com uma regra de firewall ou route table cloud."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Gateway padrão e rota local” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Diagnóstico de estação que não sai da rede local",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "expectedOutcome": "O aluno consegue explicar se o host tem rota local, rota default, gateway válido e resolução ARP para o gateway."
  },
  "mentorQuestions": [
    "Se o destino é 8.8.8.8, por que o host não faz ARP para 8.8.8.8?",
    "Como você provaria que um problema é de gateway e não de DNS?",
    "Em cloud, por que uma rota default para internet pode ser um problema de segurança?"
  ],
  "quiz": [
    {
      "question": "O que é gateway padrão?",
      "options": [
        "Servidor DNS principal",
        "Próximo salto usado para destinos sem rota mais específica",
        "Endereço de broadcast da rede",
        "MAC do switch"
      ],
      "answer": 1,
      "explanation": "Gateway padrão é o próximo salto usado quando não há rota mais específica para o destino."
    },
    {
      "question": "Qual rota representa a rota default em IPv4?",
      "options": [
        "255.255.255.255/32",
        "127.0.0.0/8",
        "0.0.0.0/0",
        "224.0.0.0/4"
      ],
      "answer": 2,
      "explanation": "0.0.0.0/0 representa qualquer destino IPv4 e funciona como rota padrão."
    },
    {
      "question": "Para destino remoto, qual MAC vai no frame Ethernet inicial?",
      "options": [
        "MAC do destino remoto",
        "MAC do DNS",
        "MAC do gateway",
        "MAC de broadcast sempre"
      ],
      "answer": 2,
      "explanation": "O host entrega o frame ao MAC do gateway, mantendo o IP de destino remoto no pacote."
    },
    {
      "question": "Um host sem gateway normalmente consegue falar com quem?",
      "options": [
        "Somente hosts locais e rotas específicas existentes",
        "Toda a internet",
        "Apenas DNS",
        "Nenhum host"
      ],
      "answer": 0,
      "explanation": "Sem gateway, o host ainda pode falar com destinos locais e rotas específicas configuradas."
    },
    {
      "question": "Gateway fora da sub-rede local causa qual problema típico?",
      "options": [
        "Melhora de performance",
        "Falha para alcançar o próximo salto por ARP",
        "Aumento automático de MTU",
        "Criação de rota BGP"
      ],
      "answer": 1,
      "explanation": "O gateway precisa ser alcançável no enlace local; se estiver fora, a resolução/entrega local falha."
    },
    {
      "question": "Qual controle ajuda contra gateway falso via DHCP indevido?",
      "options": [
        "DHCP snooping",
        "Apenas aumentar TTL",
        "Trocar DNS",
        "Desativar logs"
      ],
      "answer": 0,
      "explanation": "DHCP snooping ajuda a bloquear servidores DHCP não autorizados em switches compatíveis."
    }
  ],
  "flashcards": [
    {
      "front": "Gateway padrão",
      "back": "Próximo salto usado para tráfego cujo destino não possui rota mais específica."
    },
    {
      "front": "Rota default",
      "back": "Rota 0.0.0.0/0, usada como caminho padrão para destinos não conhecidos."
    },
    {
      "front": "Rota local",
      "back": "Rota para a própria rede do host, derivada do IP e da máscara."
    },
    {
      "front": "Next hop",
      "back": "Próximo equipamento ou endereço para onde o pacote deve ser encaminhado."
    },
    {
      "front": "ARP para destino remoto?",
      "back": "Não. O host faz ARP para o gateway quando o destino IP é remoto."
    },
    {
      "front": "Gateway e DNS",
      "back": "Gateway encaminha pacotes; DNS traduz nomes em endereços IP."
    }
  ],
  "exercises": [
    {
      "id": "ex-4.5-1",
      "title": "Local ou remoto?",
      "prompt": "Um host 192.168.10.25/24 quer falar com 192.168.10.80 e 192.168.20.80. Classifique cada destino.",
      "expectedAnswer": "192.168.10.80 é local; 192.168.20.80 é remoto e deve ir ao gateway, salvo rota mais específica.",
      "difficulty": "básico"
    },
    {
      "id": "ex-4.5-2",
      "title": "Gateway válido?",
      "prompt": "IP 10.0.5.30/24 com gateway 10.0.6.1. O gateway é válido como próximo salto local? Explique.",
      "expectedAnswer": "Não. Com /24, a rede local é 10.0.5.0/24; 10.0.6.1 está fora do bloco local.",
      "difficulty": "intermediário"
    },
    {
      "id": "ex-4.5-3",
      "title": "Interprete a rota default",
      "prompt": "Explique o significado de: default via 192.168.1.1 dev wlan0.",
      "expectedAnswer": "Destinos sem rota mais específica serão enviados ao gateway 192.168.1.1 pela interface wlan0.",
      "difficulty": "básico"
    },
    {
      "id": "ex-4.5-4",
      "title": "Cloud route table",
      "prompt": "Uma subnet privada tem rota local para 10.0.0.0/16 e não tem rota default. O que isso significa para saída à internet?",
      "expectedAnswer": "Os recursos podem comunicar dentro da VPC/VNet conforme rotas locais, mas não têm caminho padrão para internet sem NAT, firewall ou outra rota default.",
      "difficulty": "intermediário"
    }
  ],
  "challenge": {
    "title": "Diagnóstico de estação que não sai da rede local",
    "scenario": "Uma estação corporativa acessa impressoras e um servidor local na mesma VLAN, mas não acessa sistemas externos por IP. O usuário diz que 'a internet caiu'. Você tem as evidências: IP 10.10.40.55/24, gateway 10.10.41.1, DNS 10.10.1.10, rota default via 10.10.41.1 e ARP do gateway incompleto.",
    "tasks": [
      "Identificar o erro principal.",
      "Explicar por que o acesso local ainda funciona.",
      "Diferenciar esse problema de DNS.",
      "Propor correção segura.",
      "Listar evidências que devem entrar no relatório."
    ],
    "rubric": [
      "Calcula corretamente a rede local 10.10.40.0/24.",
      "Percebe que o gateway 10.10.41.1 está fora da rede local.",
      "Explica que DNS não é a causa primária para falha por IP.",
      "Propõe gateway dentro do bloco correto ou correção de máscara conforme desenho aprovado.",
      "Inclui ARP, rota default, IP/máscara e horário das evidências."
    ],
    "deliverable": "Relatório curto com causa provável, evidências, impacto e correção proposta."
  },
  "commentedSolution": {
    "summary": "A estação está em 10.10.40.55/24, portanto sua rede local é 10.10.40.0/24. O gateway configurado, 10.10.41.1, está fora da rede local. O host tenta usar esse gateway para destinos remotos, mas não consegue alcançá-lo corretamente no enlace local.",
    "steps": [
      "Calcule a rede local usando /24: 10.10.40.0 até 10.10.40.255.",
      "Verifique que 10.10.41.1 não pertence a esse bloco.",
      "Explique que hosts locais em 10.10.40.0/24 continuam acessíveis porque não dependem do gateway.",
      "Explique que falha por IP externo elimina DNS como primeira causa.",
      "Corrija o gateway para o IP aprovado da VLAN 40, por exemplo 10.10.40.1, ou ajuste máscara apenas se o desenho oficial exigir.",
      "Registre evidências sanitizadas: ipconfig/ip route, route print, ARP, testes local/remoto e horário."
    ],
    "whyItWorks": "A correção coloca o próximo salto dentro da rede local do host, permitindo ARP para o gateway e encaminhamento de destinos remotos.",
    "securityNotes": [
      "Confirmar a alteração com documentação de rede e change management.",
      "Não inventar gateway apenas porque parece padrão.",
      "Verificar se DHCP está distribuindo o gateway errado para mais hosts.",
      "Investigar alteração recente em escopo DHCP, VLAN ou template de configuração."
    ]
  },
  "glossary": [
    {
      "term": "Gateway padrão",
      "definition": "Próximo salto usado para destinos sem rota mais específica."
    },
    {
      "term": "Rota default",
      "definition": "Rota 0.0.0.0/0 usada como caminho padrão para destinos IPv4."
    },
    {
      "term": "Rota local",
      "definition": "Rota para a própria rede do host, calculada com IP e máscara."
    },
    {
      "term": "Next hop",
      "definition": "Próximo equipamento ou endereço para onde o tráfego será enviado."
    },
    {
      "term": "Tabela de rotas",
      "definition": "Estrutura usada pelo sistema para decidir por qual interface e próximo salto enviar pacotes."
    },
    {
      "term": "Rota mais específica",
      "definition": "Rota com prefixo maior que tem preferência sobre rotas mais genéricas."
    }
  ],
  "references": [
    {
      "title": "RFC 791 — Internet Protocol",
      "type": "rfc",
      "note": "Base conceitual do IPv4."
    },
    {
      "title": "RFC 1812 — Requirements for IP Version 4 Routers",
      "type": "rfc",
      "note": "Referência sobre comportamento de roteadores IPv4."
    },
    {
      "title": "Documentação Cisco IOS — show ip route",
      "type": "vendor-doc",
      "note": "Comandos de verificação de rotas e gateway of last resort."
    },
    {
      "title": "Documentação Microsoft — TCP/IP routing basics",
      "type": "vendor-doc",
      "note": "Conceitos de rota, gateway e tabela de rotas em Windows."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "ARP é necessário para entender como o host encontra o MAC do gateway."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud Networking",
      "lesson": "Route tables e NAT gateways",
      "reason": "Gateways e rotas default aparecem diretamente em VPC/VNet e subnets privadas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso entre serviços",
      "lesson": "Conectividade privada e identidades de workload",
      "reason": "Serviços privados dependem de rotas e gateways corretos antes de autenticação funcionar."
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
      "4.6"
    ],
    "recommendedReview": [
      "4.3",
      "4.4",
      "3.5"
    ]
  }
};
