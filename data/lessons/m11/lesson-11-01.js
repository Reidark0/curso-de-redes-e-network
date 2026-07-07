export const lesson1101 = {
  "id": "11.1",
  "moduleId": "m11",
  "order": 1,
  "title": "Por que roteamento existe",
  "subtitle": "Entenda por que redes diferentes precisam de roteadores, tabelas de rotas, next hop, gateway e caminho de retorno para que pacotes IPv4 atravessem LANs, VLANs, filiais, datacenters, cloud e Internet.",
  "duration": "100-140 min",
  "estimatedStudyTimeMinutes": 140,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 240,
  "tags": [
    "redes",
    "ipv4",
    "roteamento",
    "gateway",
    "next hop",
    "tabela de rotas",
    "camada 3",
    "troubleshooting",
    "segurança",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m04",
      "reason": "Roteamento depende de IPv4, máscara, gateway, rota local, ICMP e troubleshooting."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m05",
      "reason": "Subnetting define os prefixos que aparecem nas tabelas de rotas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "ARP explica como o host encontra o MAC do gateway antes de enviar tráfego para outra rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "VLANs frequentemente criam múltiplas redes que precisam de roteamento inter-VLAN."
    }
  ],
  "objectives": [
    "Explicar por que roteamento existe e qual problema ele resolve.",
    "Diferenciar entrega local de Camada 2 e encaminhamento entre redes de Camada 3.",
    "Entender o papel de gateway padrão, next hop, tabela de rotas e rota de retorno.",
    "Relacionar roteamento com VLANs, sub-redes, firewall, VPN, cloud e Internet.",
    "Aplicar um método inicial de troubleshooting para separar falha local, falha de rota e falha de retorno.",
    "Reconhecer impactos de segurança causados por rotas amplas, rotas indevidas e caminhos assimétricos."
  ],
  "learningOutcomes": [
    "Dado um destino IPv4, o aluno explica se o host entrega localmente ou envia ao gateway.",
    "Dado um cenário com duas sub-redes, o aluno descreve o caminho de ida e a necessidade de rota de volta.",
    "Dado um traceroute, o aluno interpreta saltos como decisões de encaminhamento entre roteadores.",
    "Dado um problema de conectividade, o aluno separa ARP, gateway, rota, firewall, DNS e aplicação.",
    "Dado um desenho de rede, o aluno identifica onde o roteamento deve existir e onde políticas de segurança devem ser aplicadas."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Até agora, você aprendeu que uma rede local consegue entregar frames usando MAC, que ARP descobre o MAC associado a um IPv4 local, que IPv4 identifica hosts de forma lógica e que subnetting divide blocos em sub-redes. Mas surge uma pergunta inevitável: se o destino está fora da minha sub-rede, como o pacote chega lá?</p>\n<p>Essa pergunta aparece todos os dias em TI e Segurança. Um notebook acessa um servidor em outra VLAN. Uma aplicação em Kubernetes chama um banco em outra subnet. Um usuário remoto entra por VPN. Uma filial acessa o datacenter. Uma VM privada sai para a Internet por NAT. Um firewall permite uma origem, mas a resposta não volta. Em todos esses casos, existe roteamento.</p>\n<div class=\"callout callout--problem\"><strong>Ideia central:</strong> Ethernet entrega dentro de um domínio local. Roteamento permite que pacotes IPv4 atravessem redes diferentes, salto por salto, usando tabelas de rotas e decisões de próximo salto.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>As primeiras redes de computadores eram pequenas e muitas vezes locais. Quando as organizações começaram a conectar redes separadas, laboratórios, universidades e provedores, a simples entrega local deixou de ser suficiente. Era necessário ter equipamentos capazes de decidir para onde enviar pacotes destinados a redes diferentes.</p>\n<p>O IP foi projetado para permitir interconexão entre redes heterogêneas. O roteamento nasceu dessa necessidade: em vez de exigir que todos os dispositivos estivessem no mesmo domínio local, diferentes redes poderiam ser conectadas por roteadores. Cada roteador conheceria alguns caminhos e encaminharia pacotes para o próximo salto.</p>\n<p>Com o crescimento da Internet, de empresas, de filiais, de VPNs, de datacenters e de cloud, o roteamento deixou de ser apenas uma função de roteadores físicos. Hoje ele aparece em firewalls, switches camada 3, hosts Linux, hipervisores, appliances virtuais, VPCs, VNets, service meshes, Kubernetes CNIs e plataformas de cloud.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>Sem roteamento, cada rede ficaria isolada ou todos os dispositivos precisariam estar no mesmo domínio de broadcast. Isso seria ruim por motivos técnicos, operacionais e de segurança. Redes enormes têm mais broadcast, mais risco de loops, mais dificuldade de troubleshooting, maior blast radius e menor controle de acesso.</p>\n<p>Outro problema é que o endereço MAC só resolve entrega no enlace local. Um MAC não é um endereço global que serve para alcançar qualquer ponto da Internet. Quando o destino está em outra rede, o host não tenta descobrir o MAC do destino final. Ele entrega o frame ao gateway local, e o gateway encaminha o pacote IP para a próxima etapa.</p>\n<div class=\"callout callout--warning\"><strong>Erro comum:</strong> pensar que o pacote sai da origem já sabendo todos os roteadores do caminho. Na prática, cada roteador toma sua própria decisão com base na própria tabela de rotas.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>No começo, rotas podiam ser configuradas manualmente em ambientes pequenos. Com o crescimento das redes, surgiram protocolos dinâmicos para trocar informações de rota. Em ambientes corporativos, switches camada 3 passaram a fazer roteamento inter-VLAN, firewalls se tornaram pontos centrais de política e roteamento, e provedores de Internet passaram a usar protocolos próprios para grande escala.</p>\n<table class=\"data-table\"><thead><tr><th>Fase</th><th>Motivação</th><th>Limitação</th></tr></thead><tbody><tr><td>Rede plana</td><td>Simplicidade inicial</td><td>Broadcast, insegurança e baixa escala</td></tr><tr><td>Rota estática</td><td>Controle simples de caminho</td><td>Manutenção manual e risco de erro</td></tr><tr><td>Roteamento inter-VLAN</td><td>Separar departamentos e zonas</td><td>Exige gateway, política e troubleshooting</td></tr><tr><td>Protocolos dinâmicos</td><td>Escala e adaptação</td><td>Complexidade e necessidade de governança</td></tr><tr><td>Cloud networking</td><td>Automação e redes virtuais</td><td>Risco de CIDR sobreposto e rotas amplas</td></tr></tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>Roteamento</strong> é o processo de escolher o próximo salto para entregar um pacote IP até uma rede de destino. O roteador não precisa conhecer cada host individualmente; ele precisa conhecer prefixos de rede e saber para qual interface ou próximo salto enviar pacotes destinados a esses prefixos.</p>\n<div class=\"definition-box\"><strong>Definição prática:</strong> roteamento é a função que responde: “para chegar ao prefixo de destino, devo entregar este pacote por qual interface ou para qual próximo roteador?”</div>\n<p>Em um host comum, a decisão começa de forma simples: se o destino está na mesma sub-rede, entrega local via ARP e Ethernet. Se o destino está fora, entrega ao gateway padrão. Em um roteador, a decisão consulta a tabela de rotas, escolhe a rota mais específica aplicável e encaminha o pacote.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<ol class=\"flow-list\"><li>O host recebe um destino IPv4, como 10.20.30.50.</li><li>Ele compara o destino com seu próprio IP e máscara para saber se está na rede local.</li><li>Se o destino for local, usa ARP para descobrir o MAC do destino.</li><li>Se o destino for remoto, consulta sua rota default e decide enviar para o gateway.</li><li>O host usa ARP para descobrir o MAC do gateway.</li><li>O frame Ethernet vai ao gateway, mas o pacote IP continua com destino final 10.20.30.50.</li><li>O roteador remove o frame recebido, consulta sua tabela de rotas e escolhe o próximo salto.</li><li>O roteador cria um novo frame para o próximo enlace e encaminha o mesmo pacote IP, com TTL decrementado.</li><li>O processo se repete até a rede de destino.</li><li>A resposta precisa ter caminho de volta; caso contrário, a comunicação parece “morrer” no retorno.</li></ol>\n<div class=\"callout callout--security\"><strong>Detalhe essencial:</strong> o MAC muda a cada enlace. O IP de origem e destino normalmente permanece como referência fim a fim até módulos como NAT alterarem esse comportamento.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Arquiteturalmente, roteamento fica entre redes. Em uma empresa pequena, o roteador da borda pode conectar LAN, Internet e VPN. Em uma empresa média, switches camada 3 podem rotear entre VLANs internas, enquanto firewalls controlam acesso entre zonas. Em cloud, route tables conectam subnets a gateways, NAT, firewalls, peering, VPN e endpoints privados.</p>\n<table class=\"comparison-table\"><thead><tr><th>Componente</th><th>Função no roteamento</th><th>Cuidado operacional</th></tr></thead><tbody><tr><td>Host</td><td>Decide local ou gateway</td><td>IP, máscara e gateway precisam estar corretos</td></tr><tr><td>Switch L2</td><td>Entrega frames dentro da VLAN</td><td>Não roteia entre sub-redes</td></tr><tr><td>Switch L3</td><td>Roteia entre VLANs</td><td>Exige SVIs, rotas e políticas</td></tr><tr><td>Firewall</td><td>Roteia e filtra entre zonas</td><td>Rota e regra são coisas diferentes</td></tr><tr><td>Cloud route table</td><td>Define próximo salto virtual</td><td>Rotas amplas podem expor subnets</td></tr></tbody></table>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine uma empresa com vários prédios. Dentro de um prédio, o entregador sabe circular pelos corredores e entregar diretamente em uma sala. Isso se parece com Ethernet dentro de uma LAN. Mas, se a entrega precisa ir para outro prédio, o entregador leva o pacote até a portaria ou central de expedição. A portaria decide o próximo caminho: outro prédio, outra cidade ou transportadora.</p>\n<p>O gateway é essa portaria. A tabela de rotas é o mapa de destinos conhecidos. O próximo salto é a próxima portaria no caminho. A rota de retorno é a instrução que permite que a resposta volte para quem enviou.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não possuem uma única portaria universal. Cada roteador conhece sua própria visão do mapa e decide localmente.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Seu notebook tem IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. Você tenta acessar <code>8.8.8.8</code>. Como 8.8.8.8 não pertence a <code>192.168.1.0/24</code>, o notebook não faz ARP para 8.8.8.8. Ele faz ARP para o gateway <code>192.168.1.1</code>, coloca o MAC do gateway no frame Ethernet e envia o pacote IP cujo destino final continua sendo 8.8.8.8.</p>\n<p>O roteador doméstico recebe o frame, olha o pacote IP, consulta a rota default para a Internet e encaminha o pacote para o provedor. No retorno, a resposta precisa encontrar o caminho de volta até sua rede.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, usuários estão na VLAN 10, servidores na VLAN 20, gerência na VLAN 30 e convidados na VLAN 40. Cada VLAN possui uma sub-rede e um gateway. Para um usuário acessar um servidor, o tráfego precisa sair da VLAN de usuários e ser roteado para a VLAN de servidores. Esse roteamento pode acontecer em um switch L3 ou firewall.</p>\n<p>Do ponto de vista de segurança, não basta existir rota. É necessário definir política: usuários podem acessar apenas portas específicas nos servidores? Convidados podem acessar rede interna? Gerência pode administrar switches? Logs de gateway e firewall identificam origem real?</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em uma VPC ou VNet, cada subnet possui uma tabela de rotas efetiva. Uma subnet pública pode ter rota para um Internet Gateway. Uma subnet privada pode ter rota default para NAT Gateway ou firewall. Subnets de banco podem não ter saída direta para Internet e podem aceitar tráfego apenas de subnets de aplicação.</p>\n<p>Quando uma aplicação na cloud não alcança um banco, a causa pode estar em security group, NACL, firewall, DNS, identidade, rota de ida ou rota de volta. O troubleshooting precisa separar cada camada. Roteamento é uma parte do caminho, não a única.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, roteamento aparece em pipelines que provisionam VPCs, VNets, subnets, tabelas de rotas, NAT, peering, VPN e firewalls com Terraform, Pulumi, Bicep ou CloudFormation. Um erro de rota pode fazer uma aplicação privada sair indevidamente para a Internet ou impedir comunicação entre ambientes.</p>\n<p>Boas equipes tratam rotas como código revisável: cada rota precisa ter justificativa, dono, ambiente, destino, próximo salto e impacto de segurança. Policy as code pode bloquear <code>0.0.0.0/0</code> para destinos sensíveis, rotas conflitantes e CIDRs sobrepostos.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Roteamento influencia diretamente o blast radius. Se toda rede consegue rotear para toda rede, um incidente em uma estação pode alcançar servidores, bancos, gerência e ambientes críticos. Se as rotas e políticas são segmentadas, o movimento lateral fica mais difícil.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Sintoma</th><th>Mitigação</th></tr></thead><tbody><tr><td>Rota ampla demais</td><td>Muitos segmentos alcançáveis sem necessidade</td><td>Menor privilégio de rede, firewall e revisão de rotas</td></tr><tr><td>Sem rota de retorno</td><td>Pedido chega, resposta não volta</td><td>Validar caminho bidirecional</td></tr><tr><td>Caminho assimétrico</td><td>Firewall stateful derruba resposta</td><td>Desenhar simetria ou ajustar arquitetura conscientemente</td></tr><tr><td>Gateway indevido</td><td>Tráfego sai por caminho não monitorado</td><td>NAC, DHCP controlado, inventário e logs</td></tr></tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<p>O diagrama mostra a diferença essencial entre entrega local de Camada 2 e roteamento entre redes de Camada 3. O MAC muda a cada enlace; o IP de origem e destino permanece como referência fim a fim, salvo quando NAT aparece em módulos posteriores.</p>\n<svg class=\"lesson-svg\" viewBox=\"0 0 1120 690\" role=\"img\" aria-labelledby=\"m11l01-title m11l01-desc\">\n<title id=\"m11l01-title\">Roteamento IPv4 entre redes</title>\n<desc id=\"m11l01-desc\">Host de uma sub-rede envia pacote para gateway, roteador consulta tabela de rotas e encaminha ao próximo salto até a rede de destino.</desc>\n<defs><marker id=\"m11l01-arrow\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\"></path></marker></defs>\n<g class=\"svg-zone\"><rect x=\"50\" y=\"80\" width=\"295\" height=\"420\" rx=\"18\"></rect><text x=\"75\" y=\"120\" class=\"svg-label\">Rede A - 192.168.10.0/24</text></g>\n<g class=\"svg-zone\"><rect x=\"775\" y=\"80\" width=\"295\" height=\"420\" rx=\"18\"></rect><text x=\"800\" y=\"120\" class=\"svg-label\">Rede B - 10.20.30.0/24</text></g>\n<g class=\"svg-node svg-node--client\"><rect x=\"90\" y=\"210\" width=\"180\" height=\"110\" rx=\"14\"></rect><text x=\"127\" y=\"248\" class=\"svg-label\">Host A</text><text x=\"105\" y=\"278\" class=\"svg-label--small\">192.168.10.25</text><text x=\"105\" y=\"303\" class=\"svg-label--small\">GW 192.168.10.1</text></g>\n<g class=\"svg-node svg-node--router\"><rect x=\"410\" y=\"190\" width=\"250\" height=\"150\" rx=\"16\"></rect><text x=\"475\" y=\"235\" class=\"svg-label\">Roteador R1</text><text x=\"435\" y=\"266\" class=\"svg-label--small\">192.168.10.1 / 172.16.0.1</text><text x=\"435\" y=\"294\" class=\"svg-label--small\">Tabela de rotas</text></g>\n<g class=\"svg-node svg-node--server\"><rect x=\"840\" y=\"210\" width=\"180\" height=\"110\" rx=\"14\"></rect><text x=\"885\" y=\"248\" class=\"svg-label\">Servidor B</text><text x=\"858\" y=\"278\" class=\"svg-label--small\">10.20.30.50</text><text x=\"858\" y=\"303\" class=\"svg-label--small\">GW 10.20.30.1</text></g>\n<g class=\"svg-node svg-node--cloud\"><rect x=\"470\" y=\"445\" width=\"170\" height=\"105\" rx=\"14\"></rect><text x=\"505\" y=\"485\" class=\"svg-label\">Próximo</text><text x=\"508\" y=\"514\" class=\"svg-label\">salto</text></g>\n<line x1=\"270\" y1=\"265\" x2=\"410\" y2=\"265\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l01-arrow)\"></line>\n<line x1=\"660\" y1=\"265\" x2=\"840\" y2=\"265\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l01-arrow)\"></line>\n<line x1=\"535\" y1=\"340\" x2=\"535\" y2=\"445\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m11l01-arrow)\"></line>\n<text x=\"290\" y=\"248\" class=\"svg-label--small\">Frame L2 para MAC do gateway</text>\n<text x=\"680\" y=\"248\" class=\"svg-label--small\">Novo frame L2 no próximo enlace</text>\n<text x=\"432\" y=\"380\" class=\"svg-label--small\">Decisão L3: destino 10.20.30.50 pertence a qual rota?</text>\n<g class=\"svg-node svg-node--security\"><rect x=\"155\" y=\"555\" width=\"810\" height=\"75\" rx=\"14\"></rect><text x=\"190\" y=\"588\" class=\"svg-label\">Regra mental</text><text x=\"190\" y=\"615\" class=\"svg-label--small\">Switch entrega dentro da rede local. Roteador conecta redes diferentes. Toda ida precisa de caminho de volta.</text></g>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>Neste laboratório, você vai observar a diferença entre destino local e destino remoto, identificar gateway, tabela de rotas, rota default, ARP do gateway e caminho com traceroute. O objetivo não é configurar roteamento avançado ainda, mas entender a decisão fundamental que sustenta todo o módulo.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios treinam identificação de destino local/remoto, gateway correto, rota de retorno, diferença entre L2 e L3 e interpretação inicial de traceroute.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Você receberá três redes, dois roteadores e um problema de comunicação. Sua missão será explicar o caminho esperado, apontar onde a rota falta e propor uma correção segura.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada reforça a diferença entre rota de ida, rota de volta e política de firewall. Também mostra por que pingar o gateway não prova que uma rede remota está corretamente roteada.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>Roteamento existe porque redes diferentes precisam se comunicar sem ficarem todas no mesmo domínio local. O host decide se o destino é local ou remoto. Se for remoto, entrega ao gateway. Cada roteador consulta sua tabela de rotas, escolhe o próximo salto e encaminha o pacote. A resposta também precisa de caminho de volta.</p>\n<p>O ponto mais importante desta aula é separar claramente: switch entrega frames dentro da VLAN; roteador encaminha pacotes entre redes; firewall pode rotear e filtrar; cloud route table define próximos saltos virtuais; e troubleshooting precisa validar ida, volta e política.</p>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você estudará <strong>tabela de rotas e longest prefix match</strong>. Verá como um roteador escolhe a rota mais específica quando várias rotas parecem combinar com o mesmo destino.</p>\n</section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula abre o módulo de roteamento IPv4 e conecta os fundamentos de Ethernet, ARP, IPv4, subnetting, VLANs e troubleshooting.",
    "previousConcepts": [
      "Ethernet",
      "MAC",
      "ARP",
      "IPv4",
      "máscara",
      "CIDR",
      "gateway",
      "subnetting",
      "VLAN",
      "ICMP",
      "traceroute"
    ],
    "nextConcepts": [
      "tabela de rotas",
      "longest prefix match",
      "rota default",
      "rota estática",
      "inter-VLAN",
      "métrica",
      "distância administrativa",
      "OSPF",
      "BGP"
    ]
  },
  "protocolFields": [
    {
      "name": "IP de origem",
      "description": "Endereço IPv4 do host que iniciou o pacote."
    },
    {
      "name": "IP de destino",
      "description": "Endereço IPv4 final que o pacote tenta alcançar."
    },
    {
      "name": "Máscara/CIDR",
      "description": "Define se um destino pertence à rede local ou precisa ir ao gateway."
    },
    {
      "name": "Gateway padrão",
      "description": "Próximo salto usado pelo host quando não existe rota mais específica."
    },
    {
      "name": "Next hop",
      "description": "Roteador ou interface para onde o pacote será entregue na próxima etapa."
    },
    {
      "name": "Interface de saída",
      "description": "Interface pela qual o pacote sai após a decisão de roteamento."
    },
    {
      "name": "TTL",
      "description": "Campo decrementado a cada roteador para evitar loops infinitos."
    },
    {
      "name": "Prefixo de destino",
      "description": "Rede ou bloco que a rota anuncia como alcançável."
    },
    {
      "name": "Rota de retorno",
      "description": "Caminho necessário para que a resposta volte até a origem."
    }
  ],
  "packetFlow": [
    "O host compara o IP de destino com seu próprio IP e máscara.",
    "Se o destino é local, o host usa ARP para descobrir o MAC do destino.",
    "Se o destino é remoto, o host consulta a rota default ou rota mais específica.",
    "O host usa ARP para descobrir o MAC do gateway ou próximo salto local.",
    "O frame Ethernet é entregue ao gateway; o pacote IP mantém o destino final.",
    "O roteador consulta a tabela de rotas e escolhe o melhor próximo salto.",
    "O roteador decrementa TTL e cria um novo frame no enlace de saída.",
    "Cada roteador repete o processo até alcançar a rede de destino.",
    "A resposta precisa seguir caminho de volta válido e permitido por políticas."
  ],
  "deepDive": {
    "title": "A pergunta mais importante do roteamento: para onde entrego o próximo pacote?",
    "points": [
      "Roteamento não é descobrir o caminho inteiro em um único host; é decisão salto a salto.",
      "A tabela de rotas trabalha com prefixos, não com nomes de aplicação.",
      "A rota mais específica ganha de rotas mais amplas quando ambas combinam com o destino.",
      "O gateway padrão é apenas uma rota default, não uma entidade mágica.",
      "A comunicação de ida e volta pode falhar em pontos diferentes.",
      "Firewalls stateful podem bloquear caminhos assimétricos mesmo quando há rotas válidas."
    ],
    "workedExample": "Host 192.168.10.25/24 acessa 10.20.30.50. Como 10.20.30.50 não pertence a 192.168.10.0/24, o host envia o pacote ao gateway 192.168.10.1. O gateway consulta sua tabela. Se possuir rota para 10.20.30.0/24, encaminha para a interface ou próximo salto apropriado. O servidor responde para 192.168.10.25, e seu gateway também precisa saber alcançar 192.168.10.0/24."
  },
  "commonMistakes": [
    {
      "mistake": "Confundir switch L2 com roteador.",
      "impact": "O aluno espera que uma VLAN alcance outra sem gateway L3.",
      "fix": "Separar forwarding por MAC dentro da VLAN e roteamento por IP entre redes."
    },
    {
      "mistake": "Pingar o gateway e concluir que a rede remota está OK.",
      "impact": "Ignora rotas além do primeiro salto.",
      "fix": "Testar gateway, destino por IP, traceroute, rota de ida e rota de volta."
    },
    {
      "mistake": "Esquecer rota de retorno.",
      "impact": "O pacote chega ao destino, mas a resposta não volta.",
      "fix": "Validar tabela de rotas dos dois lados e políticas intermediárias."
    },
    {
      "mistake": "Confundir DNS com roteamento.",
      "impact": "O diagnóstico começa pelo nome quando o caminho IP nem funciona.",
      "fix": "Testar primeiro por IP, depois por nome, depois por porta/aplicação."
    },
    {
      "mistake": "Criar rotas muito amplas para resolver pressa operacional.",
      "impact": "Aumenta blast radius e exposição lateral.",
      "fix": "Usar rotas específicas, segmentação e revisão de segurança."
    }
  ],
  "troubleshooting": {
    "method": "Diagnóstico inicial de roteamento IPv4: IP/máscara, gateway, ARP do gateway, rota default, ping do gateway, ping do destino por IP, traceroute, rota de retorno, firewall e aplicação.",
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Ver IP, máscara, gateway e DNS."
      },
      {
        "platform": "Windows",
        "command": "route print",
        "purpose": "Ver tabela de rotas local."
      },
      {
        "platform": "Windows",
        "command": "arp -a",
        "purpose": "Confirmar MAC do gateway."
      },
      {
        "platform": "Windows",
        "command": "tracert 10.20.30.50",
        "purpose": "Ver saltos até o destino."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route",
        "purpose": "Ver interfaces, endereços e rotas."
      },
      {
        "platform": "Linux",
        "command": "ip neigh",
        "purpose": "Ver vizinhos ARP, inclusive gateway."
      },
      {
        "platform": "Linux",
        "command": "traceroute 10.20.30.50 || tracepath 10.20.30.50",
        "purpose": "Mapear caminho por saltos."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route",
        "purpose": "Ver tabela de roteamento."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief",
        "purpose": "Confirmar interfaces ativas e endereços."
      },
      {
        "platform": "Cisco IOS",
        "command": "traceroute 10.20.30.50",
        "purpose": "Ver caminho a partir do dispositivo Cisco."
      }
    ],
    "symptoms": [
      {
        "symptom": "Gateway não responde",
        "likelyCauses": [
          "gateway errado",
          "VLAN incorreta",
          "ARP falhando",
          "porta bloqueada",
          "firewall local"
        ],
        "firstChecks": [
          "IP/máscara",
          "ARP",
          "link",
          "VLAN"
        ]
      },
      {
        "symptom": "Gateway responde, destino remoto não",
        "likelyCauses": [
          "rota ausente",
          "firewall",
          "rota de retorno ausente",
          "destino desligado"
        ],
        "firstChecks": [
          "route print/ip route",
          "traceroute",
          "show ip route",
          "política"
        ]
      },
      {
        "symptom": "Traceroute para em um salto",
        "likelyCauses": [
          "filtro ICMP",
          "rota ausente",
          "firewall",
          "TTL expirado sem resposta"
        ],
        "firstChecks": [
          "teste de porta",
          "logs",
          "rotas",
          "política"
        ]
      },
      {
        "symptom": "Funciona de uma origem mas não de outra",
        "likelyCauses": [
          "rota específica",
          "ACL",
          "NACL",
          "security group",
          "segmentação"
        ],
        "firstChecks": [
          "matriz de origem/destino",
          "logs de firewall",
          "rotas efetivas"
        ]
      }
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Adicionar rota ampla para resolver incidente sem análise.",
      "Permitir qualquer comunicação entre VLANs segmentadas.",
      "Ignorar rota de retorno.",
      "Confundir NAT, firewall e roteamento como se fossem a mesma coisa.",
      "Não registrar mudanças de roteamento em Git, CMDB, IPAM ou change management."
    ],
    "vulnerabilities": [
      {
        "name": "Rotas indevidas que expõem redes internas.",
        "description": "Risco relacionado à aula 11.1 — Por que roteamento existe.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão de rotas por pares."
      },
      {
        "name": "Caminhos assimétricos que quebram inspeção stateful.",
        "description": "Risco relacionado à aula 11.1 — Por que roteamento existe.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Matriz de comunicação entre zonas."
      },
      {
        "name": "CIDR sobreposto em VPN ou cloud.",
        "description": "Risco relacionado à aula 11.1 — Por que roteamento existe.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Logs de firewall, roteador e route tables cloud."
      },
      {
        "name": "Gateway não autorizado ou não monitorado.",
        "description": "Risco relacionado à aula 11.1 — Por que roteamento existe.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Validação automática de CIDR em IaC."
      },
      {
        "name": "Falta de segmentação entre zonas críticas.",
        "description": "Risco relacionado à aula 11.1 — Por que roteamento existe.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Uso de rotas específicas e políticas de menor privilégio."
      }
    ],
    "mitigations": [
      "Revisão de rotas por pares.",
      "Matriz de comunicação entre zonas.",
      "Logs de firewall, roteador e route tables cloud.",
      "Validação automática de CIDR em IaC.",
      "Uso de rotas específicas e políticas de menor privilégio.",
      "Documentação IPAM e ownership claros."
    ],
    "goodPractices": [
      "Manter rotas tão específicas quanto necessário.",
      "Documentar dono, finalidade e justificativa de cada rota relevante.",
      "Separar roteamento de política: rota permite caminho, firewall decide permissão.",
      "Validar rota de retorno em mudanças de VPN, cloud, filial e datacenter.",
      "Monitorar alterações em tabelas de rota, route tables cloud e dispositivos de borda.",
      "Evitar caminhos não monitorados para zonas sensíveis.",
      "Revisar rotas default e destinos 0.0.0.0/0 com rigor."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar roteamento, OSPF, BGP e caminhos com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Revisão de rotas por pares.",
      "Matriz de comunicação entre zonas.",
      "Logs de firewall, roteador e route tables cloud.",
      "Validação automática de CIDR em IaC.",
      "Uso de rotas específicas e políticas de menor privilégio.",
      "Documentação IPAM e ownership claros."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-11.1",
    "title": "Observando a decisão local versus remota no roteamento IPv4",
    "labType": "cloud",
    "objective": "Identificar quando um host usa entrega local e quando usa gateway, verificando IP, máscara, rota default, ARP do gateway e caminho com traceroute.",
    "scenario": "15. Laboratório Neste laboratório, você vai observar a diferença entre destino local e destino remoto, identificar gateway, tabela de rotas, rota default, ARP do gateway e caminho com traceroute. O objetivo não é configurar roteamento avançado ainda, mas entender a decisão fundamental que sustenta todo o módulo.",
    "topology": "Um computador Windows ou Linux conectado a uma rede com gateway e acesso a pelo menos um destino externo ou a outra rede simulada no Packet Tracer.",
    "architecture": "Host local -> switch/AP -> gateway padrão -> próximos roteadores -> destino remoto. O laboratório observa a decisão no host e os primeiros sinais do caminho.",
    "prerequisites": [
      "Windows PowerShell ou terminal Linux",
      "Permissão para executar comandos de rede locais",
      "Opcional: Cisco Packet Tracer",
      "Opcional: Wireshark apenas em rede própria/laboratório"
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 80,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não capture tráfego de terceiros.",
      "Não altere rotas em máquina corporativa sem autorização.",
      "Sanitize IP público, MAC, nome de host e domínio antes de anexar evidências.",
      "Não execute testes agressivos em redes que você não administra.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "1. Registrar configuração IP",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "Windows: ipconfig /all\nLinux: ip addr\nLinux: ip route",
        "expectedOutput": "Você identifica IP local, prefixo/máscara e gateway padrão.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Por que roteamento existe” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "2. Testar destino local",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "ping <gateway>\narp -a\nLinux: ip neigh",
        "expectedOutput": "O gateway aparece no cache ARP/neighbor.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Por que roteamento existe” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "3. Testar destino remoto por IP",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "Windows: ping 8.8.8.8\nLinux: ping -c 4 8.8.8.8",
        "expectedOutput": "O host tenta alcançar destino remoto usando rota default.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Por que roteamento existe” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "4. Ver tabela de rotas local",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "Windows: route print\nLinux: ip route",
        "expectedOutput": "Você encontra uma rota default via gateway e uma rota conectada para a rede local.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Por que roteamento existe” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "5. Observar o caminho",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "Windows: tracert 8.8.8.8\nLinux: traceroute 8.8.8.8 || tracepath 8.8.8.8",
        "expectedOutput": "O primeiro salto normalmente é seu gateway ou roteador de borda.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Por que roteamento existe” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "6. Produzir matriz de evidências",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "Tabela: IP/máscara, gateway, rota default, ARP gateway, ping gateway, ping destino, traceroute",
        "expectedOutput": "Você separa evidências locais, de gateway e de caminho remoto.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Por que roteamento existe” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "Ao final, o aluno consegue explicar por que tráfego local usa ARP para o destino e tráfego remoto usa ARP para o gateway, além de interpretar rota default e primeiros saltos.",
    "validation": [
      {
        "check": "IP/máscara/gateway identificados",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "IP/máscara/gateway identificados",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Rota default localizada",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Rota default localizada",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "ARP/neighbor do gateway encontrado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "ARP/neighbor do gateway encontrado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Ping do gateway testado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Ping do gateway testado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Destino remoto testado por IP",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Destino remoto testado por IP",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Traceroute interpretado com cautela",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Traceroute interpretado com cautela",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Gateway fora da sub-rede indica configuração incorreta",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "APIPA indica possível falha DHCP",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Sem rota default limita acesso remoto",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "ARP incompleto sugere problema local",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Traceroute incompleto pode ser filtro e não falha de rota",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Repetir o laboratório em Packet Tracer com duas redes",
      "Adicionar um roteador intermediário",
      "Documentar rota de ida e rota de volta",
      "Comparar resultado com VPN ligada e desligada",
      "Criar diagrama sanitizado do caminho"
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
      "Qual evidência mostra que o laboratório de “Por que roteamento existe” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Desafio: identifique a falta de rota",
    "solution": "Roteamento correto exige caminho bidirecional e política permitindo o tráfego. O gateway local ser alcançável comprova apenas conectividade até o primeiro salto, não até a rede remota."
  },
  "mentorQuestions": [
    {
      "type": "conceitual",
      "question": "Por que o host não faz ARP para o IP final quando o destino está em outra rede?",
      "hints": [
        "ARP é local",
        "Pense no papel do gateway"
      ],
      "expectedIdeas": [
        "gateway",
        "sub-rede",
        "ARP local",
        "MAC do próximo salto"
      ],
      "explanation": "O host só precisa entregar o frame no enlace local. Para destino remoto, o próximo salto local é o gateway."
    },
    {
      "type": "diagnóstico",
      "question": "Você pinga o gateway, mas não pinga um servidor em outra sub-rede. Quais hipóteses vêm antes de culpar DNS?",
      "hints": [
        "Teste por IP",
        "Pense em rota e retorno"
      ],
      "expectedIdeas": [
        "rota",
        "firewall",
        "retorno",
        "traceroute",
        "gateway"
      ],
      "explanation": "DNS só resolve nome. Se por IP não funciona, o problema está em caminho, política, host ou serviço, não inicialmente em DNS."
    },
    {
      "type": "arquitetura",
      "question": "Em uma rede com VLAN de usuários e VLAN de servidores, onde o controle de acesso deve aparecer?",
      "hints": [
        "Rota não é permissão",
        "Pense em firewall ou ACL"
      ],
      "expectedIdeas": [
        "firewall",
        "ACL",
        "gateway",
        "inter-VLAN",
        "menor privilégio"
      ],
      "explanation": "O roteamento fornece caminho; políticas de segurança controlam quais origens podem acessar quais destinos e portas."
    }
  ],
  "quiz": [
    {
      "q": "Roteamento IPv4 atua principalmente em qual camada do modelo OSI?",
      "opts": [
        "Camada 1",
        "Camada 2",
        "Camada 3",
        "Camada 7"
      ],
      "a": 2,
      "exp": "Roteamento usa endereços IP e prefixos, portanto é função de Camada 3."
    },
    {
      "q": "Se um destino não está na mesma sub-rede do host, o host normalmente envia o pacote para:",
      "opts": [
        "O MAC do destino final",
        "O gateway padrão",
        "O servidor DNS",
        "O endereço de broadcast"
      ],
      "a": 1,
      "exp": "O host entrega o frame ao gateway local, que encaminha o pacote para outras redes."
    },
    {
      "q": "Qual afirmação melhor descreve o MAC em uma comunicação roteada?",
      "opts": [
        "O MAC de destino final permanece igual em todos os enlaces",
        "O MAC muda a cada enlace",
        "O MAC substitui o IP",
        "O MAC é usado globalmente na Internet"
      ],
      "a": 1,
      "exp": "Cada enlace Ethernet usa seus próprios MACs de origem e destino. O pacote IP é encaminhado salto a salto."
    },
    {
      "q": "Por que a rota de retorno é importante?",
      "opts": [
        "Porque DNS depende dela",
        "Porque a resposta precisa voltar até a origem",
        "Porque ARP atravessa roteadores",
        "Porque ela substitui firewall"
      ],
      "a": 1,
      "exp": "Comunicação é bidirecional. Se o destino não sabe voltar, a sessão falha."
    },
    {
      "q": "Qual comando mostra a tabela de rotas em Linux?",
      "opts": [
        "ip neigh",
        "ip route",
        "arp -a",
        "nslookup"
      ],
      "a": 1,
      "exp": "ip route mostra rotas conectadas, default e rotas específicas no Linux."
    },
    {
      "q": "Qual é um risco de rotas amplas demais?",
      "opts": [
        "Reduzir blast radius",
        "Impedir qualquer comunicação",
        "Aumentar exposição entre segmentos",
        "Eliminar a necessidade de firewall"
      ],
      "a": 2,
      "exp": "Rotas amplas podem permitir alcance excessivo entre redes e aumentar movimento lateral."
    }
  ],
  "flashcards": [
    {
      "front": "O que é roteamento?",
      "back": "Processo de escolher o próximo salto para entregar pacotes IP entre redes diferentes."
    },
    {
      "front": "O que é gateway padrão?",
      "back": "Rota usada pelo host para destinos que não pertencem à rede local e não têm rota mais específica."
    },
    {
      "front": "O que é next hop?",
      "back": "O próximo roteador ou interface para onde o pacote será entregue."
    },
    {
      "front": "O que muda a cada enlace em uma comunicação roteada?",
      "back": "O frame Ethernet e os endereços MAC de origem/destino do enlace."
    },
    {
      "front": "O que normalmente permanece como destino final?",
      "back": "O IP de destino do pacote, salvo alterações como NAT em módulos posteriores."
    },
    {
      "front": "Por que rota de retorno importa?",
      "back": "Porque a resposta precisa saber voltar para a origem por um caminho permitido."
    }
  ],
  "exercises": [
    {
      "id": "ex-6.1-1",
      "type": "conceitual",
      "question": "Explique a diferença entre encaminhamento L2 dentro de uma VLAN e roteamento L3 entre sub-redes.",
      "expectedAnswer": "L2 usa MAC e frames dentro do mesmo domínio local/VLAN; L3 usa IP, tabela de rotas e próximo salto para conectar redes diferentes."
    },
    {
      "id": "ex-6.1-2",
      "type": "diagnóstico",
      "question": "Um host 192.168.10.20/24 tenta acessar 192.168.10.80. Ele usa gateway? Justifique.",
      "expectedAnswer": "Não, o destino está na mesma rede 192.168.10.0/24. O host usa ARP para descobrir o MAC do destino e entrega localmente."
    },
    {
      "id": "ex-6.1-3",
      "type": "diagnóstico",
      "question": "Um host 192.168.10.20/24 tenta acessar 10.20.30.50. Ele faz ARP para qual IP primeiro?",
      "expectedAnswer": "Faz ARP para o gateway local, não para 10.20.30.50, porque o destino é remoto."
    },
    {
      "id": "ex-6.1-4",
      "type": "segurança",
      "question": "Por que criar rota entre todas as VLANs sem política de firewall é perigoso?",
      "expectedAnswer": "Porque aumenta alcance lateral. Segmentação real exige rota controlada e política explícita de origem, destino e porta."
    }
  ],
  "challenge": {
    "title": "Desafio: identifique a falta de rota",
    "scenario": "Rede A 192.168.10.0/24 usa gateway R1 192.168.10.1. Rede B 10.20.30.0/24 usa gateway R2 10.20.30.1. R1 alcança R2 por 172.16.0.0/30. Hosts da Rede A não alcançam a Rede B.",
    "tasks": [
      "Desenhar o caminho esperado de ida.",
      "Desenhar o caminho esperado de volta.",
      "Listar rotas mínimas que R1 e R2 precisam conhecer.",
      "Explicar por que pingar apenas o gateway local não resolve o diagnóstico.",
      "Indicar onde firewall/ACL deveria ser validado."
    ],
    "rubric": [
      "Identifica corretamente origem, destino e gateways",
      "Inclui rota de ida",
      "Inclui rota de retorno",
      "Separa rota de política",
      "Propõe validação com ping/traceroute/tabela de rotas"
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada do desafio",
    "steps": [
      "Host da Rede A entrega tráfego remoto ao gateway R1.",
      "R1 precisa ter rota para 10.20.30.0/24 via o enlace até R2 ou interface apropriada.",
      "R2 precisa ter rota de retorno para 192.168.10.0/24 via o enlace até R1.",
      "Se a rota de ida existir mas a de volta não, o pacote pode chegar ao destino, mas a resposta não retorna.",
      "Após rotas, validar política: ACL, firewall, security group ou NACL podem bloquear mesmo com rota correta.",
      "O diagnóstico mínimo inclui show/ip route nos roteadores, ping de salto a salto e traceroute nos dois sentidos quando possível."
    ],
    "finalAnswer": "Roteamento correto exige caminho bidirecional e política permitindo o tráfego. O gateway local ser alcançável comprova apenas conectividade até o primeiro salto, não até a rede remota."
  },
  "glossary": [
    {
      "term": "Roteamento",
      "definition": "Processo de encaminhar pacotes IP entre redes diferentes."
    },
    {
      "term": "Gateway padrão",
      "definition": "Roteador usado por um host para alcançar destinos fora da rede local."
    },
    {
      "term": "Next hop",
      "definition": "Próximo dispositivo ou interface para onde o pacote será enviado."
    },
    {
      "term": "Tabela de rotas",
      "definition": "Conjunto de rotas usadas para escolher a saída de pacotes."
    },
    {
      "term": "Rota de retorno",
      "definition": "Caminho necessário para a resposta voltar ao emissor."
    },
    {
      "term": "TTL",
      "definition": "Campo IP decrementado por roteadores para evitar loops infinitos."
    }
  ],
  "references": [
    {
      "title": "RFC 791 - Internet Protocol",
      "type": "rfc",
      "note": "Base conceitual do IPv4."
    },
    {
      "title": "Cisco - IP Routing fundamentals",
      "type": "vendor-doc",
      "note": "Referência prática para roteamento, tabela de rotas e encaminhamento."
    },
    {
      "title": "Linux ip-route manual",
      "type": "manual",
      "note": "Referência para tabela de rotas em Linux."
    },
    {
      "title": "Microsoft route command documentation",
      "type": "vendor-doc",
      "note": "Referência para inspeção de rotas no Windows."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud networking e IaC",
      "reason": "Route tables em cloud geralmente são provisionadas e revisadas como infraestrutura como código."
    },
    {
      "course": "Identity, Access Management e Segurança de Identidades",
      "module": "Acesso entre serviços",
      "reason": "Roteamento permite caminho de rede, mas identidade e autorização controlam quem pode usar o serviço."
    }
  ],
  "progressRules": {
    "completionCriteria": [
      "Ler todas as seções obrigatórias",
      "Concluir o laboratório lab-11.1",
      "Acertar pelo menos 70% do quiz",
      "Responder ao desafio com rota de ida e volta",
      "Registrar pelo menos uma nota sobre diferença entre rota e política"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "11.2"
    ],
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "oneOf": [
          "labMarkedDone",
          "practicalExerciseDone"
        ]
      }
  }
};
