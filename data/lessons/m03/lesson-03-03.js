export const lesson0303 = {
  "id": "3.3",
  "moduleId": "m03",
  "order": 3,
  "title": "Switches: aprendizado MAC, forwarding e flooding",
  "subtitle": "Como o switch decide para qual porta enviar um frame e por que, às vezes, ele precisa inundar a LAN.",
  "duration": "90-125 min",
  "estimatedStudyTimeMinutes": 125,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 215,
  "tags": [
    "redes",
    "ethernet",
    "switch",
    "tabela MAC",
    "forwarding",
    "flooding",
    "camada 2",
    "broadcast",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.1",
      "reason": "É necessário entender Ethernet como base da LAN antes de estudar o comportamento do switch."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.2",
      "reason": "O switch toma decisões lendo endereços MAC em frames Ethernet."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.4",
      "reason": "A aula depende do entendimento de Camada 2, frames e domínio de broadcast."
    }
  ],
  "objectives": [
    "Explicar por que switches existem e qual problema resolveram em relação a hubs e redes compartilhadas.",
    "Descrever como o switch aprende endereços MAC a partir do MAC de origem dos frames.",
    "Diferenciar forwarding, filtering, flooding e broadcast.",
    "Interpretar tabela MAC, porta, VLAN e aging time em troubleshooting defensivo.",
    "Relacionar aprendizado MAC com segurança de Camada 2, loops, MAC flooding, port security e segmentação."
  ],
  "learningOutcomes": [
    "Dado um frame entrando em uma porta, o aluno explica como o switch aprende o MAC de origem.",
    "Dado um MAC de destino conhecido, o aluno identifica que o switch faz forwarding seletivo para a porta aprendida.",
    "Dado um MAC de destino desconhecido, o aluno explica por que o switch faz flooding dentro da VLAN.",
    "Dado um problema de LAN, o aluno coleta tabela MAC, porta, VLAN e contadores para montar hipótese defensiva.",
    "Dado um cenário de segurança, o aluno propõe controles como port security, 802.1X, segmentação, logs e monitoramento."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Imagine que você conecta um notebook em uma tomada de rede corporativa. O cabo acende link, o sistema recebe IP, mas ninguém configurou manualmente no switch: “o notebook do Rafael está na porta 14”. Mesmo assim, poucos segundos depois, outros dispositivos conseguem responder ao seu tráfego local. Como o switch descobriu onde você está? Como ele sabe para qual porta enviar um frame? E por que, em alguns momentos, um frame pode ser enviado para várias portas?</p>\n<p>Essa aula responde a uma das perguntas mais importantes da Camada 2: <strong>como um switch aprende e decide</strong>. O switch não é apenas uma “régua de rede”. Ele mantém uma tabela dinâmica chamada tabela MAC, observa frames que entram, aprende endereços por porta e VLAN, encaminha frames conhecidos de forma seletiva e inunda frames desconhecidos quando ainda não sabe o caminho.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> uma equipe percebe tráfego inesperado em uma VLAN sensível e encontra a tabela MAC mudando rapidamente. Sem entender aprendizado MAC, forwarding e flooding, é fácil culpar firewall, DNS ou IP. Com o modelo correto, a investigação começa olhando porta, VLAN, MAC aprendido, aging, flapping, loop e controles de Camada 2.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>Antes dos switches modernos, redes Ethernet frequentemente usavam meios compartilhados ou hubs. Um hub repetia bits para todas as portas. Ele não aprendia MAC, não entendia destino e não reduzia colisões de forma inteligente. Em uma rede assim, todos competiam pelo mesmo domínio de colisão e muito tráfego era visível para todos os dispositivos conectados.</p>\n<p>O switch surgiu para resolver esse problema operacional: permitir que a LAN crescesse com mais eficiência. Em vez de repetir tudo para todos, o switch passou a examinar frames Ethernet, aprender onde estão os MACs e encaminhar tráfego apenas pela porta necessária quando possível. Isso reduziu colisões, melhorou desempenho e tornou a LAN muito mais escalável.</p>\n<p>Com o tempo, switches também passaram a suportar VLANs, trunks, STP, agregação de links, ACLs, port security, 802.1X, QoS, espelhamento de porta e integração com controladoras. Mas a base continua a mesma: um switch de Camada 2 aprende MACs, mantém uma tabela e decide o que fazer com cada frame.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema que o switch resolve é a entrega eficiente de frames dentro de uma rede local. Se todo frame fosse enviado para todos, a LAN desperdiçaria banda, aumentaria exposição de tráfego, dificultaria troubleshooting e escalaria mal. Mas se o switch exigisse configuração manual de cada MAC em cada porta, a operação seria impraticável.</p>\n<ul class=\"flow-list\"><li><strong>Sem aprendizado automático:</strong> cada mudança de porta exigiria configuração manual.</li><li><strong>Sem forwarding seletivo:</strong> tráfego unicast seria desnecessariamente visível para muitos hosts.</li><li><strong>Sem flooding controlado:</strong> um destino desconhecido nunca seria alcançado.</li><li><strong>Sem aging:</strong> a tabela MAC ficaria presa a informações antigas.</li><li><strong>Sem segmentação por VLAN:</strong> aprendizados de redes diferentes se misturariam.</li></ul>\n<p>O switch resolve entrega local de frames. Ele não substitui roteador, firewall, IAM, criptografia, EDR ou WAF. Ele não sabe se o usuário pode acessar a aplicação; ele decide, principalmente, por qual porta um frame Ethernet deve sair dentro de uma VLAN.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução da LAN pode ser vista como uma tentativa de reduzir ruído operacional, colisão, exposição desnecessária e complexidade manual.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead><tbody>\n<tr><td>Meio compartilhado</td><td>Vários hosts disputavam o mesmo meio.</td><td>Colisões, baixa escalabilidade e difícil isolamento.</td><td>Hubs e depois switches.</td></tr>\n<tr><td>Hub</td><td>Repetia bits para todas as portas.</td><td>Não aprendia MAC nem filtrava tráfego.</td><td>Switch com tabela MAC.</td></tr>\n<tr><td>Switch básico</td><td>Aprendia MACs e encaminhava por porta.</td><td>Sem segmentação lógica avançada.</td><td>Switch com VLANs.</td></tr>\n<tr><td>Switch gerenciável</td><td>Adicionou VLAN, STP, logs, port security e monitoramento.</td><td>Exige configuração, documentação e governança.</td><td>Integração com NAC, automação e controladoras.</td></tr>\n<tr><td>Switch virtual/overlay</td><td>Comutação em hypervisors, containers e redes definidas por software.</td><td>Mais abstração e troubleshooting distribuído.</td><td>SDN, CNI, VXLAN e políticas automatizadas.</td></tr>\n</tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>Um <strong>switch Ethernet</strong> é um dispositivo de Camada 2 que recebe frames em portas, aprende endereços MAC de origem, registra esses MACs em uma tabela associada a portas e VLANs, e usa essa tabela para encaminhar frames de forma seletiva.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> aprendizado MAC é o processo pelo qual o switch observa o MAC de origem de um frame e registra que aquele MAC está alcançável pela porta onde o frame entrou.</div>\n<p>Quando o switch conhece o MAC de destino, ele faz <strong>forwarding</strong> para a porta correta. Quando o destino está na mesma porta de entrada, ele pode filtrar e não reenviar. Quando não conhece o destino, faz <strong>flooding</strong> dentro daquela VLAN. Quando o destino é broadcast, como <code>ff:ff:ff:ff:ff:ff</code>, ele também envia para todas as portas relevantes da VLAN, exceto a porta de entrada.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>O switch toma decisões simples, mas extremamente importantes. Ele não precisa abrir HTTP, TLS ou aplicação para encaminhar um frame Ethernet comum. Ele olha principalmente para os campos de Camada 2.</p>\n<ol class=\"flow-list\"><li>Um frame entra em uma porta do switch.</li><li>O switch lê o <strong>MAC de origem</strong> e atualiza a tabela MAC com porta, VLAN e tempo.</li><li>O switch lê o <strong>MAC de destino</strong>.</li><li>Se o destino é broadcast ou multicast, envia para as portas aplicáveis da VLAN.</li><li>Se o destino unicast é conhecido, encaminha apenas para a porta registrada.</li><li>Se o destino unicast é desconhecido, faz flooding para tentar alcançar o destino.</li><li>Se a entrada MAC envelhece sem tráfego, ela expira pelo aging time.</li></ol>\n<p>A tabela MAC costuma ter entradas dinâmicas, aprendidas automaticamente, e entradas estáticas, configuradas manualmente em alguns cenários. Em switches gerenciáveis, a tabela também é separada por VLAN. Isso é essencial: o mesmo endereço MAC em VLANs diferentes ou uma porta trunk carregando várias VLANs exige contexto. Sem VLAN, a tabela seria ambígua em redes segmentadas.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma arquitetura de rede, switches ficam normalmente no acesso, na distribuição e no core. Em redes pequenas, um único switch pode conectar hosts, impressoras, APs e o gateway. Em redes empresariais, switches de acesso conectam usuários e dispositivos; switches de distribuição agregam prédios, andares ou racks; e switches de core conectam grandes blocos da rede.</p>\n<ul><li><strong>Camada envolvida:</strong> principalmente Camada 2, embora alguns switches façam também Camada 3.</li><li><strong>Componentes envolvidos:</strong> NIC, cabo, switchport, VLAN, tabela MAC, gateway, uplinks e trunks.</li><li><strong>Dependências:</strong> camada física funcional, frame Ethernet válido, VLAN correta e ausência de loop.</li><li><strong>Pontos de falha:</strong> porta errada, VLAN errada, cabo ruim, MAC flapping, loop, tabela saturada, STP bloqueando ou port security atuando.</li></ul>\n<p>Em cloud, o switch físico geralmente desaparece da visão do usuário, mas a ideia de encaminhamento local, tabela interna e domínio de rede reaparece em hypervisors, bridges, vSwitches, VPC/VNet, subnets e overlays.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em um porteiro de um prédio empresarial com várias salas. Quando alguém sai da sala 204 e entrega uma correspondência, o porteiro aprende que aquela pessoa fica na sala 204. Quando chega uma correspondência para alguém que ele já conhece, ele envia diretamente para a sala certa. Quando não sabe onde a pessoa está, ele pergunta ou envia a notificação para várias áreas permitidas até descobrir.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> o switch não entende pessoas, permissões de negócio ou identidade real. Ele aprende endereços MAC observados em portas. Esse aprendizado é útil, mas não é autenticação forte nem autorização.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Em casa, seu notebook está conectado a um switch ou roteador doméstico com portas LAN. Quando o notebook envia um frame para o gateway, o equipamento aprende o MAC do notebook na porta onde o cabo está conectado. Quando o gateway responde, o switch já sabe para qual porta devolver o frame.</p>\n<p>Se você conecta um novo dispositivo e ele envia um ARP Request em broadcast, o switch envia esse broadcast para outras portas da mesma LAN. Quando as respostas começam, ele aprende mais MACs e passa a encaminhar tráfego de forma mais seletiva.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, um switch de acesso pode conectar dezenas de estações, telefones IP, impressoras, câmeras, APs e uplinks. A tabela MAC ajuda a equipe a responder perguntas práticas: qual porta viu determinado MAC? Em qual VLAN? O MAC mudou de porta? O mesmo MAC aparece em duas portas alternadamente? Existe flooding excessivo? Há indício de loop?</p>\n<p>Esse raciocínio é usado em troubleshooting e segurança. Um MAC flapping entre duas portas pode indicar loop, cabo indevido, dispositivo com bridge, virtualização mal configurada ou ataque/abuso. Uma tabela MAC saturando pode indicar condição anormal e exigir contenção defensiva. Uma porta com muitos MACs pode ser normal em uplink ou anormal em porta de usuário.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud pública, você geralmente não acessa o switch físico. Ainda assim, instâncias têm interfaces virtuais, hypervisors fazem encaminhamento, redes virtuais isolam tráfego e provedores controlam domínio de Camada 2 para evitar riscos clássicos como sniffing amplo ou ARP spoofing entre tenants.</p>\n<p>O conceito aparece em NIC virtual, bridge local, vSwitch, overlay, VXLAN, CNI de Kubernetes e appliances virtuais. Quando uma VM perde conectividade, o diagnóstico pode envolver security group, rota, sistema operacional e aplicação, mas também interface virtual, MAC virtual, bridge e políticas de rede do hypervisor.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, switches e aprendizado MAC aparecem indiretamente em laboratórios com VMs, Docker bridges, runners self-hosted, clusters Kubernetes locais, GNS3, Packet Tracer e ambientes híbridos. Um pipeline pode falhar ao acessar um registry interno por causa de rota, DNS ou firewall, mas também por causa de VLAN errada, bridge quebrada ou interface virtual sem conectividade.</p>\n<p>IaC e automação ajudam a documentar e padronizar redes, mas não eliminam a necessidade de entender Camada 2. Um laboratório automatizado que cria várias VMs conectadas a uma bridge precisa respeitar o mesmo raciocínio: interfaces, MACs, domínios, encaminhamento e isolamento.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Do ponto de vista defensivo, switches reduzem exposição em comparação com hubs, mas não tornam a LAN automaticamente segura. A tabela MAC pode ser abusada, portas físicas podem ser usadas indevidamente, flooding pode aumentar visibilidade de tráfego e loops podem causar indisponibilidade.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação defensiva</th></tr></thead><tbody>\n<tr><td>MAC flooding</td><td>Muitos MACs diferentes aparecem rapidamente em uma porta.</td><td>Saturação da tabela e flooding anormal.</td><td>Port security, limites de MAC, 802.1X, monitoramento e resposta proporcional.</td></tr>\n<tr><td>MAC flapping</td><td>Mesmo MAC alterna entre portas.</td><td>Instabilidade, loop ou bridge indevida.</td><td>Investigar cabos, STP, uplinks, virtualização e logs.</td></tr>\n<tr><td>Porta física exposta</td><td>Dispositivo não autorizado conectado.</td><td>Acesso inicial à LAN.</td><td>802.1X, NAC, VLAN de quarentena, bloqueio de portas não usadas.</td></tr>\n<tr><td>Flooding excessivo</td><td>Unicast desconhecido e broadcast crescem.</td><td>Ruído, perda de desempenho e exposição.</td><td>Segmentação, correção de loops, STP, storm control e análise de causa.</td></tr>\n</tbody></table>\n<p>O foco aqui é defensivo: entender os conceitos para detectar, mitigar e documentar. Não execute testes de abuso em redes reais sem autorização explícita e ambiente controlado.</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m03l03-title m03l03-desc\">\n<title id=\"m03l03-title\">Switch aprendendo MAC, fazendo forwarding e flooding</title>\n<desc id=\"m03l03-desc\">Diagrama mostra três hosts conectados a um switch. O switch aprende MAC de origem, consulta tabela MAC e decide entre encaminhar para uma porta conhecida ou inundar a VLAN quando o destino é desconhecido.</desc>\n<defs><marker id=\"m03l03-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n<rect x=\"390\" y=\"190\" width=\"210\" height=\"110\" rx=\"16\" class=\"svg-node svg-node--switch\" />\n<text x=\"495\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">Switch L2</text>\n<text x=\"495\" y=\"250\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela MAC</text>\n<text x=\"495\" y=\"274\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC A → porta 1</text>\n<rect x=\"70\" y=\"70\" width=\"180\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n<text x=\"160\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n<text x=\"160\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC A / porta 1</text>\n<rect x=\"730\" y=\"70\" width=\"180\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n<text x=\"820\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Host B</text>\n<text x=\"820\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC B / porta 2</text>\n<rect x=\"70\" y=\"360\" width=\"180\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n<text x=\"160\" y=\"395\" text-anchor=\"middle\" class=\"svg-label\">Host C</text>\n<text x=\"160\" y=\"418\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC C / porta 3</text>\n<rect x=\"720\" y=\"350\" width=\"210\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--security\" />\n<text x=\"825\" y=\"384\" text-anchor=\"middle\" class=\"svg-label\">Controles</text>\n<text x=\"825\" y=\"408\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Port security • 802.1X</text>\n<text x=\"825\" y=\"430\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Logs • Storm control</text>\n<line x1=\"250\" y1=\"110\" x2=\"390\" y2=\"220\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l03-arrow)\" />\n<text x=\"300\" y=\"145\" class=\"svg-label svg-label--small\">1. aprende origem</text>\n<line x1=\"600\" y1=\"220\" x2=\"730\" y2=\"110\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l03-arrow)\" />\n<text x=\"640\" y=\"145\" class=\"svg-label svg-label--small\">2. destino conhecido</text>\n<line x1=\"390\" y1=\"270\" x2=\"250\" y2=\"400\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m03l03-arrow)\" />\n<text x=\"280\" y=\"340\" class=\"svg-label svg-label--small\">flooding se desconhecido</text>\n<line x1=\"600\" y1=\"285\" x2=\"720\" y2=\"395\" class=\"svg-flow\" marker-end=\"url(#m03l03-arrow)\" />\n<text x=\"650\" y=\"335\" class=\"svg-label svg-label--small\">monitorar anomalias</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório desta aula ensina a raciocinar como o switch: observar portas, MACs, VLANs e sintomas. Ele pode ser feito de forma conceitual/local e, opcionalmente, em Cisco Packet Tracer, GNS3 ou switch real autorizado. O foco é defensivo e não envolve ataques.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam a diferença entre aprendizado por MAC de origem, forwarding por MAC de destino, flooding por destino desconhecido e broadcast por endereço especial.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio simula uma LAN corporativa com MAC flapping e flooding anormal. Você deverá montar hipóteses, evidências e mitigação defensiva sem alterar a rede de produção sem controle.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como separar loop, dispositivo em bridge, virtualização, uplink mal documentado, ataque de saturação de MAC e erro operacional de VLAN.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li><strong>Ideia central:</strong> switch aprende MAC de origem e encaminha com base no MAC de destino.</li><li><strong>O que lembrar:</strong> forwarding é seletivo; flooding acontece quando o destino é desconhecido ou quando o frame é broadcast/multicast conforme o caso.</li><li><strong>Erro comum:</strong> achar que flooding é sempre ataque; muitas vezes é comportamento normal inicial.</li><li><strong>Uso real:</strong> tabela MAC, VLAN, porta, aging, troubleshooting e segurança de LAN.</li><li><strong>Segurança:</strong> monitore MAC flapping, muitos MACs por porta, flooding excessivo e portas físicas expostas.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, estudaremos domínios de colisão, broadcast e a diferença entre hub e switch. Isso consolida por que switches substituíram hubs e prepara o caminho para ARP, VLANs e STP.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
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
      "Frame Ethernet",
      "Endereço MAC",
      "Camada 2",
      "VLAN"
    ],
    "enables": [
      "Switching",
      "Forwarding",
      "Flooding controlado",
      "Tabela MAC",
      "Port security",
      "Troubleshooting L2"
    ]
  },
  "protocolFields": [
    {
      "field": "Source MAC",
      "size": "48 bits",
      "purpose": "Permitir que o switch aprenda em qual porta e VLAN aquele MAC está alcançável.",
      "securityObservation": "MAC de origem pode ser falsificado; use como evidência, não como identidade absoluta."
    },
    {
      "field": "Destination MAC",
      "size": "48 bits",
      "purpose": "Permitir que o switch decida se faz forwarding, filtering ou flooding.",
      "securityObservation": "Destino desconhecido gera flooding; excesso pode indicar anomalia ou topologia mal planejada."
    },
    {
      "field": "VLAN ID",
      "size": "12 bits no tag 802.1Q quando presente",
      "purpose": "Separar domínios lógicos no mesmo switch ou trunk.",
      "securityObservation": "VLAN errada pode causar exposição, isolamento indevido ou bypass operacional."
    },
    {
      "field": "EtherType",
      "size": "16 bits",
      "purpose": "Indicar o protocolo carregado no payload.",
      "securityObservation": "Ajuda em filtros e investigação, mas não substitui inspeção de camadas superiores."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host A",
      "action": "Envia frame para Host B.",
      "detail": "O frame entra no switch pela porta 1 com Source MAC A e Destination MAC B.",
      "possibleFailure": "Interface down, cabo ruim ou VLAN errada."
    },
    {
      "step": 2,
      "actor": "Switch",
      "action": "Aprende o MAC de origem.",
      "detail": "Registra MAC A associado à porta 1 e à VLAN correspondente.",
      "possibleFailure": "Tabela saturada, MAC flapping ou port security bloqueando."
    },
    {
      "step": 3,
      "actor": "Switch",
      "action": "Procura o MAC de destino.",
      "detail": "Consulta a tabela MAC por MAC B dentro da mesma VLAN.",
      "possibleFailure": "MAC B desconhecido, aging expirado ou destino em outra VLAN."
    },
    {
      "step": 4,
      "actor": "Switch",
      "action": "Encaminha ou inunda.",
      "detail": "Se MAC B é conhecido, encaminha para a porta aprendida; se desconhecido, faz flooding na VLAN.",
      "possibleFailure": "Flooding excessivo, loop ou domínio de broadcast grande."
    },
    {
      "step": 5,
      "actor": "Host B",
      "action": "Recebe o frame se estiver no domínio correto.",
      "detail": "Depois que Host B responde, o switch também aprende MAC B pela porta de entrada.",
      "possibleFailure": "Host desligado, porta bloqueada, VLAN errada ou política de segurança."
    }
  ],
  "deepDive": {
    "mentalModel": "O switch é uma central de entrega local: aprende remetentes, consulta destinatários e só abre o leque quando ainda não sabe onde entregar.",
    "keyTerms": [
      "switch",
      "tabela MAC",
      "CAM table",
      "forwarding",
      "filtering",
      "flooding",
      "aging time",
      "MAC flapping",
      "VLAN"
    ],
    "limitations": [
      "Switch L2 não roteia entre redes sem função L3.",
      "MAC não é identidade forte.",
      "Flooding normal pode ocorrer antes do aprendizado.",
      "Tabela MAC dinâmica pode expirar ou ser afetada por loops.",
      "Sem VLANs, redes grandes ficam ruidosas e inseguras."
    ],
    "whenToUse": [
      "Diagnosticar conectividade local.",
      "Mapear porta de um dispositivo.",
      "Investigar flooding, MAC flapping e loops.",
      "Planejar segmentação e segurança de acesso."
    ],
    "whenNotToUse": [
      "Para substituir firewall de Camada 3/4/7.",
      "Para provar identidade de usuário sem NAC/IAM.",
      "Para diagnosticar sozinho erro HTTP, TLS ou aplicação.",
      "Para concluir incidente sem correlação."
    ],
    "operationalImpact": [
      "Requer documentação de portas, VLANs, uplinks e dispositivos conectados.",
      "Exige monitoramento de eventos como link flap, MAC move, err-disable e STP changes.",
      "Ajuda muito em troubleshooting, mas aumenta complexidade quando há trunks, virtualização e switches em cascata."
    ],
    "financialImpact": [
      "Switches gerenciáveis custam mais que equipamentos simples, mas reduzem tempo de diagnóstico e aumentam controle.",
      "Recursos como 802.1X, NAC e monitoramento podem exigir licenças ou plataforma adicional.",
      "Falhas de L2 podem gerar custo indireto alto por indisponibilidade."
    ],
    "securityImpact": [
      "Switches reduzem exposição em relação a hubs, mas precisam de port security, 802.1X, segmentação e logs para segurança robusta.",
      "Portas físicas não controladas podem permitir acesso inicial.",
      "MAC flooding e loops podem afetar confidencialidade e disponibilidade."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que switch envia tudo para todos como um hub.",
      "whyItHappens": "Ambos têm várias portas e conectam dispositivos.",
      "consequence": "O aluno interpreta errado capturas e riscos.",
      "correction": "Switch encaminha seletivamente quando conhece o MAC de destino; hub repete tudo."
    },
    {
      "mistake": "Achar que flooding é sempre ataque.",
      "whyItHappens": "O termo parece negativo.",
      "consequence": "Incidentes normais viram falsos positivos.",
      "correction": "Flooding pode ser comportamento normal quando o destino é desconhecido; o problema é excesso, persistência ou contexto suspeito."
    },
    {
      "mistake": "Usar MAC como prova definitiva de identidade.",
      "whyItHappens": "MAC parece único e ligado ao hardware.",
      "consequence": "Investigações podem culpar errado ou ignorar virtualização/spoofing.",
      "correction": "Correlacione MAC com porta, VLAN, DHCP, NAC, inventário, EDR e horário."
    },
    {
      "mistake": "Ignorar VLAN ao olhar tabela MAC.",
      "whyItHappens": "Muitos exemplos didáticos mostram uma LAN plana.",
      "consequence": "A equipe interpreta porta ou MAC fora de contexto.",
      "correction": "Sempre verifique MAC, porta e VLAN juntos."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host local não comunica com outro host na mesma VLAN.",
      "MAC aparece alternando entre portas.",
      "Tráfego broadcast/flooding elevado.",
      "Porta entra em err-disabled.",
      "Switch aprende muitos MACs em porta de usuário."
    ],
    "diagnosticQuestions": [
      "A porta está up/up?",
      "A VLAN da porta está correta?",
      "O MAC do host aparece na tabela MAC?",
      "O MAC aparece em mais de uma porta?",
      "Há mudanças recentes de STP ou link flap?",
      "A porta é de usuário, trunk, uplink ou AP?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "getmac /v\narp -a\nipconfig /all",
        "purpose": "Coletar MAC local, vizinhos ARP e configuração de rede.",
        "expectedObservation": "MAC da interface ativa, gateway e entradas ARP.",
        "interpretation": "Ajuda a relacionar host, gateway e evidências locais antes de consultar o switch."
      },
      {
        "platform": "Linux",
        "command": "ip link\nip neigh\nip route",
        "purpose": "Ver interfaces, MACs, vizinhos de enlace e rota default.",
        "expectedObservation": "Interface up, endereço link/ether e vizinho do gateway.",
        "interpretation": "Confirma evidências locais de Camada 2 e Camada 3."
      },
      {
        "platform": "Cisco IOS",
        "command": "show mac address-table dynamic\nshow mac address-table interface <interface>\nshow interfaces status\nshow interfaces counters errors\nshow logging",
        "purpose": "Ver MACs aprendidos, portas, VLANs, estado e eventos.",
        "expectedObservation": "MAC associado a uma porta/VLAN esperada, sem erros ou flapping anormal.",
        "interpretation": "Permite confirmar aprendizado, forwarding e anomalias de L2."
      }
    ],
    "decisionTree": [
      {
        "if": "MAC do host não aparece na tabela do switch",
        "then": "Verificar link físico, VLAN da porta, autenticação 802.1X/NAC, cabo, NIC e se o host enviou tráfego recente."
      },
      {
        "if": "Mesmo MAC aparece alternando entre portas",
        "then": "Investigar loop, bridge indevida, VM, docking, uplink, STP e logs de MAC move."
      },
      {
        "if": "Muitos MACs aparecem em porta de usuário",
        "then": "Verificar se é AP, telefone IP, mini-switch não autorizado, hypervisor ou comportamento suspeito."
      },
      {
        "if": "Flooding é persistente e alto",
        "then": "Avaliar tabela MAC, aging, loops, storm control, broadcast domain e tráfego anômalo."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar porta, VLAN, dispositivo esperado e dono do ponto.",
      "Desabilitar portas não usadas ou colocá-las em VLAN de quarentena.",
      "Usar 802.1X/NAC quando possível.",
      "Configurar port security de forma proporcional e testada.",
      "Monitorar MAC flapping, link flap, STP changes e muitos MACs por porta.",
      "Separar usuários, servidores, visitantes, gestão e IoT em VLANs adequadas."
    ],
    "badPractices": [
      "Deixar portas de parede ativas sem controle.",
      "Usar uma LAN plana para tudo.",
      "Confiar em MAC como autenticação forte.",
      "Bloquear portas em produção sem entender impacto.",
      "Ignorar logs de switch em investigação."
    ],
    "commonErrors": [
      "Confundir flooding normal inicial com incidente.",
      "Não considerar trunks e APs ao contar MACs por porta.",
      "Tratar MAC virtual de VM/container como equipamento físico.",
      "Esquecer que tabela MAC expira."
    ],
    "vulnerabilities": [
      {
        "name": "MAC flooding",
        "description": "Grande quantidade de MACs pode pressionar a tabela do switch e aumentar flooding.",
        "defensiveExplanation": "Monitore volume de MACs por porta, limite MACs em portas de usuário, use NAC e investigue origem antes de agir.",
        "mitigation": "Port security, storm control, 802.1X/NAC, segmentação, logs e resposta proporcional."
      },
      {
        "name": "Porta física não controlada",
        "description": "Pontos de rede ativos podem permitir conexão de dispositivos não autorizados.",
        "defensiveExplanation": "Controle físico e lógico deve complementar o switch; endereço MAC sozinho não basta.",
        "mitigation": "Desabilitar portas ociosas, NAC, VLAN de quarentena, inventário e inspeções."
      },
      {
        "name": "MAC flapping",
        "description": "Mesmo MAC aparece em portas diferentes de forma rápida.",
        "defensiveExplanation": "Pode indicar loop, bridge indevida, virtualização, erro de cabeamento ou comportamento malicioso.",
        "mitigation": "Investigar STP, topologia, logs, uplinks, APs, hypervisors e aplicar contenção proporcional."
      }
    ],
    "monitoring": [
      "Alertas de MAC move/flapping.",
      "Quantidade de MACs por porta.",
      "Portas em err-disabled.",
      "Eventos de STP topology change.",
      "Broadcast/flooding elevado.",
      "Mudanças fora de janela em VLAN/trunk."
    ],
    "hardening": [
      "Port security em portas de acesso.",
      "802.1X/NAC.",
      "Storm control.",
      "BPDU Guard onde aplicável.",
      "Desabilitar DTP em ambientes Cisco quando não usado.",
      "Documentação e revisão periódica de portas."
    ],
    "detectionIdeas": [
      "Comparar MACs aprendidos com inventário.",
      "Gerar alerta quando porta de usuário tiver muitos MACs.",
      "Correlacionar MAC, VLAN, DHCP, NAC e autenticação.",
      "Monitorar mudanças de STP e link flap."
    ]
  },
  "lab": {
    "id": "lab-3.3",
    "title": "Observando aprendizado MAC, forwarding e flooding de forma defensiva",
    "labType": "security",
    "objective": "Entender como um switch aprende MACs, quando encaminha seletivamente e quando faz flooding, usando evidências seguras e sem executar ataques.",
    "scenario": "Você recebeu a tarefa de explicar por que um host aparece em determinada porta do switch e por que alguns frames de descoberta/broadcast aparecem para vários dispositivos na mesma VLAN.",
    "topology": "Host A -> Switch -> Host B/Gateway; opcionalmente Host C na mesma VLAN para raciocinar sobre flooding.",
    "architecture": "Rede local Ethernet com switch de acesso, portas access em uma VLAN e gateway local. O laboratório pode ser conceitual, local, Packet Tracer, GNS3 ou switch real autorizado.",
    "prerequisites": [
      "Ter concluído as aulas 3.1 e 3.2.",
      "Ter acesso a terminal Windows/Linux.",
      "Opcional: Packet Tracer, GNS3 ou switch gerenciável autorizado."
    ],
    "tools": [
      "Windows PowerShell ou Prompt",
      "Terminal Linux",
      "Opcional: Cisco Packet Tracer",
      "Opcional: switch gerenciável autorizado",
      "Opcional: Wireshark apenas em ambiente permitido"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Não execute MAC flooding, spoofing ou ataques em redes reais.",
      "Não altere VLANs, portas ou configurações de switch sem autorização.",
      "Sanitize MACs, IPs, nomes de host e identificadores ao documentar.",
      "Em rede corporativa, apenas observe comandos autorizados ou simule em laboratório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Coletar MAC local",
        "instruction": "Identifique o MAC da interface ativa do seu computador.",
        "command": "Windows: getmac /v\nLinux: ip link",
        "expectedOutput": "Endereço MAC/link da interface ativa.",
        "explanation": "Esse MAC é o que o switch poderá aprender como origem quando seu host enviar frames."
      },
      {
        "number": 2,
        "title": "Gerar tráfego local seguro",
        "instruction": "Faça um ping para o gateway para gerar tráfego local comum.",
        "command": "Windows: ping <gateway>\nLinux: ping -c 4 <gateway>",
        "expectedOutput": "Respostas ou, se ICMP for bloqueado, pelo menos tentativa de tráfego para o gateway.",
        "explanation": "Ao enviar tráfego, o host força a rede a usar ARP e frames Ethernet."
      },
      {
        "number": 3,
        "title": "Observar vizinhos locais",
        "instruction": "Veja a tabela ARP/neighbor do host.",
        "command": "Windows: arp -a\nLinux: ip neigh",
        "expectedOutput": "Entrada do gateway com IP e MAC correspondente.",
        "explanation": "A tabela local mostra a associação entre IP do próximo salto e MAC local usado na entrega Ethernet."
      },
      {
        "number": 4,
        "title": "Raciocinar como o switch",
        "instruction": "Desenhe uma tabela com MAC de origem, porta de entrada, VLAN e ação esperada do switch.",
        "command": "Conceitual: MAC A -> porta 1 -> VLAN 10; MAC B desconhecido -> flooding na VLAN 10",
        "expectedOutput": "Tabela simples de aprendizado e decisão.",
        "explanation": "Mesmo sem acesso ao switch, você pode modelar a decisão: aprender origem e consultar destino."
      },
      {
        "number": 5,
        "title": "Opcional Cisco: consultar tabela MAC",
        "instruction": "Em switch autorizado ou simulador, observe a tabela MAC dinâmica.",
        "command": "show mac address-table dynamic\nshow mac address-table interface <interface>",
        "expectedOutput": "MACs associados a VLANs e portas.",
        "explanation": "Essa é a evidência direta do aprendizado MAC no switch."
      },
      {
        "number": 6,
        "title": "Analisar anomalias hipotéticas",
        "instruction": "Liste o que você investigaria se o mesmo MAC aparecesse em duas portas alternando.",
        "command": "show logging\nshow spanning-tree detail\nshow interfaces status",
        "expectedOutput": "Plano de investigação com logs, STP, portas, uplinks e inventário.",
        "explanation": "MAC flapping exige correlação; não conclua causa sem evidência."
      }
    ],
    "expectedResult": "O aluno deve produzir uma tabela explicando aprendizado MAC, forwarding e flooding, além de um pequeno relatório de evidências e hipóteses defensivas.",
    "validation": [
      {
        "check": "MAC local identificado",
        "command": "getmac /v ou ip link",
        "expected": "MAC da interface ativa documentado de forma sanitizada.",
        "ifFails": "Verificar interface correta, Wi-Fi/Ethernet ativa e permissões."
      },
      {
        "check": "Gateway ou vizinho local observado",
        "command": "arp -a ou ip neigh",
        "expected": "Entrada do gateway ou vizinho local.",
        "ifFails": "Gerar tráfego para o gateway e verificar configuração IP."
      },
      {
        "check": "Tabela conceitual de switch preenchida",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expected": "Origem aprendida, destino consultado e ação descrita.",
        "ifFails": "Revisar diferença entre MAC de origem e MAC de destino."
      },
      {
        "check": "Opcional Cisco validado",
        "command": "show mac address-table dynamic",
        "expected": "MACs associados a VLANs e portas.",
        "ifFails": "Gerar tráfego, verificar VLAN, link e modo da porta."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "MAC não aparece no switch",
        "probableCause": "Host não enviou tráfego, porta errada, VLAN errada ou aging expirado.",
        "howToConfirm": "Gerar tráfego e consultar tabela MAC por interface/VLAN.",
        "fix": "Validar link, VLAN, interface e tráfego recente."
      },
      {
        "symptom": "MAC aparece em várias portas",
        "probableCause": "Loop, bridge, VM, docking, uplink ou MAC flapping.",
        "howToConfirm": "Ver logs, STP, topologia física e histórico de MAC moves.",
        "fix": "Corrigir topologia, remover bridge indevida ou aplicar controles apropriados."
      },
      {
        "symptom": "Flooding alto",
        "probableCause": "Destino desconhecido persistente, tabela saturada, loop ou broadcast domain grande.",
        "howToConfirm": "Analisar contadores, storm control, tabela MAC e captura autorizada.",
        "fix": "Segmentar, corrigir loop, ajustar controles e investigar origem."
      }
    ],
    "improvements": [
      "Repetir em Packet Tracer com três hosts e um switch.",
      "Criar tabela de MACs esperados por porta em laboratório.",
      "Adicionar VLANs na próxima etapa para entender separação por domínio.",
      "Comparar comportamento de hub e switch na aula 3.4."
    ],
    "evidenceToCollect": [
      "MAC local sanitizado",
      "Gateway sanitizado",
      "Tabela ARP/neighbor",
      "Tabela conceitual de aprendizado MAC",
      "Opcional: saída sanitizada de show mac address-table",
      "Hipóteses e limitações"
    ],
    "questions": [
      "Por que o switch aprende pelo MAC de origem e não pelo MAC de destino?",
      "Quando flooding é comportamento normal?",
      "Por que VLAN precisa fazer parte da leitura da tabela MAC?",
      "Por que MAC não prova identidade de usuário?"
    ],
    "challenge": "Explique como investigaria MAC flapping entre duas portas sem interromper produção desnecessariamente.",
    "solution": "Coletaria logs de MAC move, tabela MAC por VLAN, estado das interfaces, STP, topologia física, inventário e contexto de uplinks/APs/virtualização. Só aplicaria bloqueio ou mudança após evidência proporcional, priorizando contenção segura e janela controlada."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um switch precisa aprender MACs dinamicamente em vez de exigir configuração manual?",
      "hints": [
        "Pense em mobilidade de hosts.",
        "Pense em operação diária."
      ],
      "expectedIdeas": [
        "escala",
        "automação",
        "mudança de porta",
        "redução de configuração manual"
      ],
      "explanation": "O aprendizado dinâmico permite que a LAN funcione mesmo com dispositivos mudando de porta, desde que controles de segurança complementem esse comportamento."
    },
    {
      "type": "diagnóstico",
      "question": "Um MAC aparece alternando entre duas portas. Quais hipóteses você levantaria antes de agir?",
      "hints": [
        "Pense em loop.",
        "Pense em virtualização e bridge.",
        "Pense em uplink e AP."
      ],
      "expectedIdeas": [
        "MAC flapping",
        "loop",
        "bridge",
        "VM",
        "AP",
        "uplink",
        "STP"
      ],
      "explanation": "A resposta madura separa causa física, lógica, virtual e de segurança antes de aplicar contenção."
    },
    {
      "type": "cenário real",
      "question": "Uma porta de usuário aprende 80 MACs em poucos minutos. Isso é sempre ataque?",
      "hints": [
        "Pense em AP, telefone IP, mini-switch e hypervisor.",
        "Pense em inventário."
      ],
      "expectedIdeas": [
        "pode ser anormal",
        "precisa de contexto",
        "validar função da porta",
        "correlacionar logs"
      ],
      "explanation": "Muitos MACs em porta de usuário podem indicar risco, mas o contexto define se é AP autorizado, trunk mal configurado, virtualização ou abuso."
    }
  ],
  "quiz": [
    {
      "id": "q3.3.1",
      "type": "conceito",
      "q": "Qual campo o switch usa para aprender que um MAC está em determinada porta?",
      "opts": [
        "MAC de origem do frame",
        "MAC de destino do frame",
        "Endereço IP público",
        "Nome DNS do host"
      ],
      "a": 0,
      "exp": "O switch aprende observando o MAC de origem do frame que entra em uma porta.",
      "difficulty": "iniciante",
      "topic": "aprendizado MAC"
    },
    {
      "id": "q3.3.2",
      "type": "diagnóstico",
      "q": "Quando o switch recebe um frame unicast para um MAC de destino desconhecido, o comportamento esperado é:",
      "opts": [
        "Descartar sempre",
        "Fazer flooding dentro da VLAN",
        "Enviar ao roteador automaticamente",
        "Converter para broadcast IP"
      ],
      "a": 1,
      "exp": "Unknown unicast flooding é o comportamento esperado quando o destino ainda não está na tabela MAC.",
      "difficulty": "iniciante-intermediário",
      "topic": "flooding"
    },
    {
      "id": "q3.3.3",
      "type": "comparação",
      "q": "Qual é a principal diferença entre hub e switch?",
      "opts": [
        "Hub roteia IP; switch não",
        "Hub repete para todos; switch aprende MAC e encaminha seletivamente",
        "Hub criptografa tráfego; switch descriptografa",
        "Switch só funciona com Wi-Fi"
      ],
      "a": 1,
      "exp": "Hub repete sinais; switch usa tabela MAC para encaminhar frames de forma seletiva.",
      "difficulty": "iniciante",
      "topic": "hub vs switch"
    },
    {
      "id": "q3.3.4",
      "type": "segurança",
      "q": "Por que MAC não deve ser tratado como identidade forte?",
      "opts": [
        "Porque pode ser virtualizado, alterado ou clonado",
        "Porque sempre atravessa a internet",
        "Porque é criptografado por padrão",
        "Porque switches ignoram MAC"
      ],
      "a": 0,
      "exp": "MAC é evidência útil, mas pode ser alterado/virtualizado e precisa de correlação com outros controles.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q3.3.5",
      "type": "troubleshooting",
      "q": "Mesmo MAC alternando entre duas portas indica principalmente qual tipo de investigação?",
      "opts": [
        "MAC flapping, loop, bridge ou virtualização",
        "Erro de senha HTTP",
        "Expiração de certificado TLS",
        "Problema exclusivo de DNS externo"
      ],
      "a": 0,
      "exp": "MAC flapping é evidência de Camada 2 e deve levar a investigar loop, bridge, uplinks, virtualização e logs.",
      "difficulty": "intermediário",
      "topic": "MAC flapping"
    },
    {
      "id": "q3.3.6",
      "type": "arquitetura",
      "q": "Por que a VLAN precisa ser considerada ao ler a tabela MAC?",
      "opts": [
        "Porque o aprendizado MAC é contextual ao domínio/VLAN",
        "Porque VLAN substitui endereço MAC",
        "Porque VLAN é sempre Camada 7",
        "Porque VLAN impede qualquer broadcast"
      ],
      "a": 0,
      "exp": "A tabela MAC deve ser lida junto com VLAN e porta; a mesma porta pode carregar múltiplas VLANs em trunks.",
      "difficulty": "intermediário",
      "topic": "VLAN"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.3.1",
      "front": "Como um switch aprende MACs?",
      "back": "Observando o MAC de origem dos frames que entram em suas portas e associando MAC, porta e VLAN.",
      "tags": [
        "switch",
        "mac"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.3.2",
      "front": "O que é forwarding?",
      "back": "É o encaminhamento seletivo de um frame para a porta onde o MAC de destino é conhecido.",
      "tags": [
        "forwarding"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.3.3",
      "front": "O que é flooding?",
      "back": "É o envio de um frame para várias portas da mesma VLAN quando o destino é desconhecido ou quando o frame é broadcast/multicast conforme o caso.",
      "tags": [
        "flooding"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.3.4",
      "front": "O que é MAC flapping?",
      "back": "É quando o mesmo MAC aparece alternando entre portas, podendo indicar loop, bridge, uplink, virtualização ou anomalia.",
      "tags": [
        "troubleshooting",
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.3.5",
      "front": "Por que MAC não é identidade forte?",
      "back": "Porque pode ser alterado, clonado, virtualizado ou compartilhado em cenários específicos; precisa de correlação.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.3.6",
      "front": "O que é aging time da tabela MAC?",
      "back": "É o tempo após o qual uma entrada MAC dinâmica expira se não houver tráfego renovando o aprendizado.",
      "tags": [
        "tabela MAC"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.3.1",
      "type": "conceitual",
      "prompt": "Explique por que o switch aprende usando MAC de origem e encaminha usando MAC de destino.",
      "expectedAnswer": "O MAC de origem informa de onde veio o frame e permite aprender a porta do remetente; o MAC de destino informa para onde o frame deve ser entregue.",
      "explanation": "Essa separação é a base de aprendizado e decisão de encaminhamento."
    },
    {
      "id": "ex3.3.2",
      "type": "diagnóstico",
      "prompt": "Um switch mostra o MAC 00:11:22:33:44:55 alternando entre Gi0/3 e Gi0/7. Liste quatro hipóteses.",
      "expectedAnswer": "Loop, dispositivo em bridge, AP/uplink, VM/hypervisor, docking station, erro de cabeamento ou comportamento suspeito.",
      "explanation": "MAC flapping é sintoma; a causa precisa de evidências adicionais."
    },
    {
      "id": "ex3.3.3",
      "type": "arquitetura",
      "prompt": "Desenhe uma tabela com três hosts, suas portas, VLANs e ação esperada do switch para destino conhecido e desconhecido.",
      "expectedAnswer": "Tabela contendo MAC A/porta/VLAN, MAC B/porta/VLAN, MAC C/porta/VLAN; destino conhecido gera forwarding; desconhecido gera flooding na VLAN.",
      "explanation": "O exercício força a pensar no switch como tabela e decisão."
    },
    {
      "id": "ex3.3.4",
      "type": "segurança",
      "prompt": "Uma porta de usuário aprende 40 MACs. O que você verificaria antes de bloquear?",
      "expectedAnswer": "Função da porta, se é AP, telefone, mini-switch, hypervisor, trunk, logs, inventário, NAC, VLAN e horário da mudança.",
      "explanation": "A resposta correta evita indisponibilidade e separa contexto legítimo de risco."
    }
  ],
  "challenge": {
    "title": "Flooding e MAC flapping em uma VLAN administrativa",
    "scenario": "Durante a manhã, usuários relatam lentidão intermitente. O switch de acesso mostra aumento de flooding, eventos de MAC move e uma porta de usuário aprendendo muitos MACs.",
    "tasks": [
      "Montar hipóteses defensivas.",
      "Listar evidências necessárias.",
      "Separar ações imediatas de ações de correção definitiva.",
      "Propor controles preventivos.",
      "Escrever um resumo técnico sanitizado."
    ],
    "constraints": [
      "Não executar ataques.",
      "Não desligar portas críticas sem validação.",
      "Considerar AP, telefone IP, mini-switch, VM e loop.",
      "Separar fato, hipótese e recomendação."
    ],
    "expectedDeliverables": [
      "Matriz de hipóteses.",
      "Lista de comandos e evidências.",
      "Plano de contenção proporcional.",
      "Plano de prevenção.",
      "Relatório sanitizado."
    ],
    "gradingRubric": [
      {
        "criterion": "Raciocínio de Camada 2",
        "points": 30,
        "description": "Usa tabela MAC, VLAN, porta, aging, STP e logs."
      },
      {
        "criterion": "Segurança defensiva",
        "points": 25,
        "description": "Propõe controles sem instrução ofensiva perigosa."
      },
      {
        "criterion": "Operação segura",
        "points": 25,
        "description": "Evita ações disruptivas sem evidência."
      },
      {
        "criterion": "Comunicação técnica",
        "points": 20,
        "description": "Produz relatório claro e sanitizado."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O caso não deve começar com conclusões. Flooding e MAC flapping são sintomas de Camada 2. A investigação deve identificar porta, VLAN, histórico, função da porta, STP, contadores e mudanças recentes antes de aplicar contenção.",
    "steps": [
      "Coletar show mac address-table e logs de MAC move.",
      "Verificar interface, VLAN, trunk/access e descrição da porta.",
      "Checar STP topology changes e link flap.",
      "Comparar número de MACs por porta com inventário.",
      "Identificar se a porta é AP, telefone, uplink, hypervisor ou usuário final.",
      "Aplicar contenção proporcional: isolar porta suspeita, mover para quarentena ou agendar correção.",
      "Recomendar port security, 802.1X, storm control, BPDU Guard e documentação."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Desligar todos os switches da área.",
        "whyItIsWrong": "É ação desproporcional e causa indisponibilidade ampla sem evidência suficiente."
      },
      {
        "answer": "Ignorar porque flooding é normal.",
        "whyItIsWrong": "Flooding inicial pode ser normal, mas aumento persistente com MAC flapping exige investigação."
      },
      {
        "answer": "Concluir que é ataque apenas porque há muitos MACs.",
        "whyItIsWrong": "Pode ser AP, hypervisor, telefone IP, mini-switch ou trunk mal documentado."
      }
    ],
    "finalAnswer": "Uma resposta madura coleta evidências de switch, STP, VLAN, portas, inventário e logs; classifica hipóteses; aplica contenção proporcional; e recomenda controles preventivos. O relatório deve separar fatos observados, hipóteses e ações recomendadas."
  },
  "glossary": [
    {
      "term": "Tabela MAC",
      "shortDefinition": "Tabela usada pelo switch para associar MACs a portas e VLANs.",
      "longDefinition": "Estrutura dinâmica ou estática que permite ao switch encaminhar frames com base no MAC de destino.",
      "example": "MAC A aprendido na porta Gi0/1 da VLAN 10.",
      "relatedTerms": [
        "switch",
        "forwarding",
        "VLAN"
      ],
      "relatedLessons": [
        "3.2",
        "3.3",
        "3.7"
      ]
    },
    {
      "term": "Forwarding",
      "shortDefinition": "Encaminhamento seletivo de frame para a porta correta.",
      "longDefinition": "Acontece quando o switch conhece o MAC de destino dentro da VLAN e envia o frame apenas pela porta associada.",
      "example": "Frame para MAC B sai apenas pela porta onde MAC B foi aprendido.",
      "relatedTerms": [
        "switch",
        "tabela MAC"
      ],
      "relatedLessons": [
        "3.3"
      ]
    },
    {
      "term": "Flooding",
      "shortDefinition": "Envio de frame para múltiplas portas da VLAN.",
      "longDefinition": "Acontece com broadcast, alguns multicast e unicast desconhecido, respeitando o domínio de broadcast/VLAN.",
      "example": "ARP Request é enviado para várias portas da VLAN.",
      "relatedTerms": [
        "broadcast",
        "unknown unicast"
      ],
      "relatedLessons": [
        "3.3",
        "3.4",
        "3.5"
      ]
    },
    {
      "term": "MAC flapping",
      "shortDefinition": "Mesmo MAC alternando rapidamente entre portas.",
      "longDefinition": "Sintoma que pode indicar loop, bridge indevida, virtualização, uplink mal documentado ou anomalia.",
      "example": "O switch registra MAC X ora na porta 5, ora na porta 7.",
      "relatedTerms": [
        "loop",
        "STP",
        "troubleshooting"
      ],
      "relatedLessons": [
        "3.3",
        "3.8",
        "3.9"
      ]
    },
    {
      "term": "Aging time",
      "shortDefinition": "Tempo de expiração de uma entrada MAC dinâmica.",
      "longDefinition": "Se o switch não vê tráfego daquele MAC por certo período, remove a entrada da tabela.",
      "example": "Após expirar, um novo frame para o destino pode gerar flooding até reaprender.",
      "relatedTerms": [
        "tabela MAC",
        "flooding"
      ],
      "relatedLessons": [
        "3.3"
      ]
    },
    {
      "term": "CAM table",
      "shortDefinition": "Nome comum para a tabela de encaminhamento MAC em switches.",
      "longDefinition": "Tabela de memória associativa usada para decisões rápidas de encaminhamento por MAC.",
      "example": "Alguns materiais chamam tabela MAC de CAM table.",
      "relatedTerms": [
        "tabela MAC",
        "switch"
      ],
      "relatedLessons": [
        "3.3",
        "3.9"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_3-2022.html",
      "note": "Referência normativa principal para Ethernet."
    },
    {
      "type": "internal-course",
      "title": "Frame Ethernet e endereço MAC",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m03/lesson-03-02",
      "note": "Aula base para entender o que o switch lê em cada frame."
    },
    {
      "type": "internal-course",
      "title": "Camada 2 — Enlace",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m02/lesson-02-04",
      "note": "Base conceitual do Modelo OSI para switching."
    },
    {
      "type": "official-doc",
      "title": "Cisco Catalyst Switch Software Configuration Guides",
      "organization": "Cisco",
      "url": "https://www.cisco.com/",
      "note": "Referência prática para comandos e recursos de switching em equipamentos Cisco."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "redes de laboratório e virtualização",
      "lesson": "a definir",
      "reason": "Bridges, vSwitches, runners e laboratórios com VMs dependem do entendimento de switching e aprendizado MAC."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "controles de acesso de rede",
      "lesson": "a definir",
      "reason": "802.1X/NAC complementa o controle de acesso em portas de switch e evita confiar apenas em MAC."
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
      "3.4"
    ]
  }
};
