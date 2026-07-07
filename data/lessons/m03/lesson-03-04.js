export const lesson0304 = {
  "id": "3.4",
  "moduleId": "m03",
  "order": 4,
  "title": "Domínios de colisão, broadcast e hub vs switch",
  "subtitle": "Por que hubs repetiam tudo, como switches reduziram colisões e por que broadcast ainda precisa ser controlado.",
  "duration": "85-120 min",
  "estimatedStudyTimeMinutes": 120,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Quando alguém diz “a rede está lenta”, a causa pode estar em muitos lugares. Mas, em redes locais, alguns problemas têm origem em conceitos que parecem antigos: colisão, broadcast e a diferença entre hub e switch. Mesmo que hubs praticamente tenham desaparecido de ambientes corporativos modernos, entender o que eles faziam ajuda a entender por que switches foram tão importantes e por que broadcast ainda precisa ser controlado.</p>\n<p>Imagine uma empresa pequena com vários computadores, impressoras, câmeras IP e telefones VoIP na mesma rede. Ninguém usa hub, todos estão em switches modernos, mas a rede sofre com lentidão intermitente. O problema pode não ser colisão clássica, mas pode ser excesso de broadcast, loop de Camada 2, storm, VLAN mal planejada ou equipamento doméstico conectado indevidamente. Sem entender domínio de colisão e domínio de broadcast, o aluno fica sem linguagem para separar esses sintomas.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um switch de acesso começa a registrar aumento de broadcasts e quedas de performance. O time reinicia firewall, troca DNS e culpa a internet, mas a causa está em uma porta de switch com loop ou equipamento incorreto. Esta aula ensina a investigar isso pela lente correta.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>No começo das redes Ethernet, vários hosts compartilhavam o mesmo meio físico. Quando dois dispositivos transmitiam ao mesmo tempo, ocorria colisão. A rede precisava detectar esse evento e tentar novamente. Esse comportamento fazia sentido em redes pequenas e em uma época em que o tráfego era muito menor.</p>\n<p>Depois vieram os hubs, que facilitaram a conexão física em estrela, mas continuavam funcionando como repetidores. Um hub recebia sinais em uma porta e repetia para todas as outras. Ele não aprendia MAC, não separava conversas e não reduzia o domínio de colisão. Ele apenas tornava o cabeamento mais conveniente.</p>\n<p>Switches Ethernet mudaram a LAN. Cada porta passou a operar como um segmento separado, com aprendizado MAC e encaminhamento seletivo. Em redes full-duplex modernas, a colisão clássica praticamente deixa de ser um problema. Porém, broadcast continua existindo, porque certos protocolos precisam alcançar todos os hosts de um mesmo domínio lógico, como ARP em IPv4.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema central é que nem todo tráfego local é igual. Tráfego unicast deve ir apenas ao destino certo. Tráfego broadcast deve alcançar todos os dispositivos do mesmo domínio. Tráfego desconhecido pode precisar ser temporariamente inundado. Se tudo fosse enviado para todos, a rede desperdiçaria banda e exporia dados. Se nada pudesse alcançar todos, protocolos como ARP não funcionariam.</p>\n<ul class=\"flow-list\"><li><strong>Colisão:</strong> disputa simultânea pelo mesmo meio em redes compartilhadas ou half-duplex.</li><li><strong>Domínio de colisão:</strong> conjunto de dispositivos que podem colidir entre si.</li><li><strong>Broadcast:</strong> frame enviado para todos os dispositivos do mesmo domínio lógico.</li><li><strong>Domínio de broadcast:</strong> conjunto de hosts que recebem broadcasts entre si, normalmente limitado por VLAN e roteadores.</li><li><strong>Switch:</strong> reduz colisões, mas não elimina broadcast dentro da VLAN.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução da Ethernet local pode ser entendida como a busca por menos disputa, menos repetição desnecessária e mais isolamento.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Como funcionava</th><th>Problema</th><th>Evolução</th></tr></thead><tbody>\n<tr><td>Meio compartilhado</td><td>Vários hosts transmitiam no mesmo meio.</td><td>Colisões e baixa escalabilidade.</td><td>Topologia física com hubs.</td></tr>\n<tr><td>Hub</td><td>Repetia sinais para todas as portas.</td><td>Um único domínio de colisão e exposição de tráfego.</td><td>Switch Ethernet.</td></tr>\n<tr><td>Switch half/full-duplex</td><td>Aprende MACs e encaminha seletivamente.</td><td>Broadcast ainda alcança toda a VLAN.</td><td>VLANs e roteamento entre segmentos.</td></tr>\n<tr><td>LAN segmentada</td><td>VLANs limitam domínios de broadcast.</td><td>Exige governança, roteamento e políticas.</td><td>Segurança L2, NAC, STP, automação e observabilidade.</td></tr>\n</tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>Domínio de colisão</strong> é o conjunto de dispositivos que compartilham um meio onde transmissões simultâneas podem interferir entre si. Em redes com hubs e half-duplex, vários hosts pertenciam ao mesmo domínio de colisão. Em switches modernos full-duplex, cada porta tende a ser seu próprio domínio, tornando colisões clássicas raras.</p>\n<p><strong>Domínio de broadcast</strong> é o conjunto de dispositivos que recebem frames broadcast entre si. Um switch encaminha broadcast para todas as portas da mesma VLAN, exceto a porta de entrada. Roteadores normalmente não encaminham broadcasts de Camada 2 para outras redes. Por isso, VLANs e roteadores são usados para limitar domínios de broadcast.</p>\n<div class=\"definition-box\"><strong>Definição prática:</strong> switch reduz domínio de colisão; VLAN e roteador limitam domínio de broadcast.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Para entender a diferença, acompanhe o que acontece em três cenários.</p>\n<ol class=\"flow-list\"><li><strong>Hub:</strong> recebe bits em uma porta e repete para todas. Se dois hosts falam ao mesmo tempo em meio half-duplex, há colisão.</li><li><strong>Switch com unicast conhecido:</strong> recebe frame, consulta tabela MAC e envia apenas para a porta do destino.</li><li><strong>Switch com broadcast:</strong> recebe frame para <code>ff:ff:ff:ff:ff:ff</code> e envia para todas as portas da mesma VLAN, exceto a origem.</li><li><strong>Switch com VLANs:</strong> limita o broadcast à VLAN correta.</li><li><strong>Roteador ou gateway L3:</strong> separa domínios de broadcast e encaminha pacotes entre redes usando IP, não frames broadcast L2.</li></ol>\n<p>O ponto crucial é que um switch não é um roteador. Ele separa colisões por porta e encaminha frames com base em MAC, mas, se todos os hosts estão na mesma VLAN, eles ainda compartilham o mesmo domínio de broadcast.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em arquitetura corporativa, domínios de colisão são raramente o limitador principal em switches modernos, mas domínios de broadcast continuam críticos. Uma rede plana com centenas ou milhares de dispositivos na mesma VLAN aumenta ARP, ruído, escopo de falhas e superfície de movimento lateral.</p>\n<ul><li><strong>Acesso:</strong> switches conectam usuários, impressoras, APs, telefones e câmeras.</li><li><strong>Distribuição:</strong> agrega switches de acesso e aplica roteamento, filtros ou políticas.</li><li><strong>Core:</strong> transporta tráfego de alto volume com baixa latência.</li><li><strong>VLANs:</strong> separam domínios de broadcast por função.</li><li><strong>Firewall/roteador:</strong> controla tráfego entre segmentos.</li></ul>\n<p>Em cloud, conceitos parecidos aparecem em subnets, route tables, security groups e domínios de broadcast abstraídos pelo provedor. Você raramente vê broadcast L2 puro em cloud pública, mas ainda precisa entender segmentação e escopo de falha.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine uma sala de reunião. Um hub é como um viva-voz que repete tudo para todos, mesmo quando a conversa é entre duas pessoas. Um switch é como uma recepcionista que sabe em qual sala cada pessoa está e entrega recados diretamente. Broadcast é como um aviso no alto-falante do andar: todos daquele andar escutam.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não têm intenção humana. Switches não “entendem” o conteúdo da conversa; eles tomam decisões com base em campos de frame, portas, VLANs e tabelas.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Em casa, seu notebook, celular, smart TV e impressora podem estar na mesma rede. Quando o notebook precisa descobrir o MAC do gateway usando ARP, ele envia um broadcast. Todos os dispositivos da mesma rede local recebem esse frame, mesmo que apenas o gateway responda. Isso é normal em pequena escala.</p>\n<p>Se todos os dispositivos estiverem em uma única rede, broadcasts são simples de operar, mas também aumentam o alcance de descoberta e ruído. Por isso, redes de visitantes, IoT e trabalho costumam ser separadas em ambientes mais maduros.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, colocar usuários, impressoras, servidores, câmeras, VoIP e visitantes na mesma VLAN cria um domínio de broadcast grande e perigoso. Isso facilita descoberta, aumenta ruído, dificulta troubleshooting e amplia impacto de um dispositivo mal configurado.</p>\n<p>Uma arquitetura melhor separa VLANs por função: usuários, servidores, voz, visitantes, gestão, câmeras e dispositivos industriais. O tráfego entre segmentos passa por roteador, firewall ou camada de política. Assim, broadcast fica contido e acessos podem ser registrados e controlados.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Cloud pública normalmente abstrai Camada 2 e evita que o cliente dependa de broadcast Ethernet tradicional. Ainda assim, a lógica de escopo permanece: uma subnet representa um domínio administrativo de endereçamento e política; route tables decidem caminhos; security groups/NSGs controlam portas e origens; firewalls centralizados podem separar zonas.</p>\n<p>O erro equivalente em cloud é criar uma VPC/VNet plana, com subnets públicas demais e regras amplas. Mesmo sem broadcast L2 visível, o problema arquitetural é parecido: escopo grande demais, pouco isolamento e pouca governança.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, segmentação de rede aparece em runners self-hosted, clusters Kubernetes, ambientes de build, registries internos e redes de deploy. Um runner que compila código e tem acesso irrestrito a segmentos internos vira ponte de risco.</p>\n<p>IaC deve declarar redes, subnets, regras e segmentação de forma revisável. Em Kubernetes, CNIs, NetworkPolicies e Services abstraem parte da rede, mas os fundamentos continuam: limitar escopo, documentar caminhos, controlar comunicação lateral e coletar evidências.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Do ponto de vista defensivo, domínios grandes demais aumentam superfície de movimento lateral, descoberta interna, broadcast storms e impacto de loops. Hubs são inseguros porque expõem tráfego para todos os hosts. Switches reduzem exposição unicast, mas não devem ser confundidos com controles de autorização.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>Rede plana</td><td>Todos na mesma VLAN</td><td>Movimento lateral e broadcast amplo</td><td>VLANs, firewall interno, NAC e logs</td></tr>\n<tr><td>Broadcast storm</td><td>Tráfego broadcast excessivo</td><td>Indisponibilidade de LAN</td><td>STP, storm control e loop prevention</td></tr>\n<tr><td>Hub ou mini-switch indevido</td><td>Equipamento não autorizado em porta</td><td>Exposição e loop</td><td>Port security, 802.1X, inspeção física</td></tr>\n<tr><td>Segmentação falsa</td><td>VLAN sem política entre segmentos</td><td>Acesso amplo entre redes</td><td>Roteamento controlado, ACLs e firewall</td></tr>\n</tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 540\" role=\"img\" aria-labelledby=\"m03l04-title m03l04-desc\">\n<title id=\"m03l04-title\">Hub, switch, domínio de colisão e domínio de broadcast</title>\n<desc id=\"m03l04-desc\">Comparação entre hub repetindo tráfego para todos, switch separando domínios de colisão por porta e broadcast alcançando todas as portas da mesma VLAN.</desc>\n<defs><marker id=\"m03l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n<rect x=\"30\" y=\"55\" width=\"420\" height=\"190\" rx=\"18\" class=\"svg-zone\" />\n<text x=\"240\" y=\"85\" text-anchor=\"middle\" class=\"svg-label\">Hub: um domínio de colisão compartilhado</text>\n<rect x=\"190\" y=\"135\" width=\"100\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n<text x=\"240\" y=\"168\" text-anchor=\"middle\" class=\"svg-label\">Hub</text>\n<rect x=\"60\" y=\"135\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"108\" y=\"168\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n<rect x=\"325\" y=\"95\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"373\" y=\"128\" text-anchor=\"middle\" class=\"svg-label\">Host B</text>\n<rect x=\"325\" y=\"185\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"373\" y=\"218\" text-anchor=\"middle\" class=\"svg-label\">Host C</text>\n<line x1=\"155\" y1=\"162\" x2=\"190\" y2=\"162\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<line x1=\"290\" y1=\"155\" x2=\"325\" y2=\"125\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<line x1=\"290\" y1=\"170\" x2=\"325\" y2=\"210\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<text x=\"240\" y=\"222\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Repetição para todos • colisões possíveis</text>\n<rect x=\"530\" y=\"55\" width=\"420\" height=\"190\" rx=\"18\" class=\"svg-zone\" />\n<text x=\"740\" y=\"85\" text-anchor=\"middle\" class=\"svg-label\">Switch: colisão isolada por porta</text>\n<rect x=\"690\" y=\"135\" width=\"105\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n<text x=\"742\" y=\"168\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n<rect x=\"560\" y=\"135\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"608\" y=\"168\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n<rect x=\"830\" y=\"95\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"878\" y=\"128\" text-anchor=\"middle\" class=\"svg-label\">Host B</text>\n<rect x=\"830\" y=\"185\" width=\"95\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n<text x=\"878\" y=\"218\" text-anchor=\"middle\" class=\"svg-label\">Host C</text>\n<line x1=\"655\" y1=\"162\" x2=\"690\" y2=\"162\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<line x1=\"795\" y1=\"155\" x2=\"830\" y2=\"125\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<line x1=\"795\" y1=\"174\" x2=\"830\" y2=\"210\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m03l04-arrow)\" />\n<text x=\"740\" y=\"222\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Unicast conhecido vai só para a porta correta</text>\n<rect x=\"95\" y=\"315\" width=\"790\" height=\"165\" rx=\"18\" class=\"svg-zone\" />\n<text x=\"490\" y=\"345\" text-anchor=\"middle\" class=\"svg-label\">Domínio de broadcast: todos na mesma VLAN recebem broadcasts</text>\n<rect x=\"180\" y=\"385\" width=\"110\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" /><text x=\"235\" y=\"418\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n<rect x=\"435\" y=\"385\" width=\"110\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--switch\" /><text x=\"490\" y=\"418\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n<rect x=\"690\" y=\"385\" width=\"110\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" /><text x=\"745\" y=\"418\" text-anchor=\"middle\" class=\"svg-label\">Host B/C</text>\n<line x1=\"290\" y1=\"412\" x2=\"435\" y2=\"412\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<line x1=\"545\" y1=\"412\" x2=\"690\" y2=\"412\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l04-arrow)\" />\n<text x=\"490\" y=\"465\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP Request e outros broadcasts ficam dentro da VLAN, mas alcançam todos os membros dela</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório desta aula orienta o aluno a mapear domínios de colisão e broadcast de forma segura em uma rede pequena ou em simulação. O objetivo não é gerar tráfego anormal, mas interpretar topologia, portas, VLANs e evidências.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam a diferença entre hub, switch, colisão, broadcast, VLAN e roteamento. O foco é raciocínio operacional, não memorização.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio coloca você em uma empresa com rede plana, impressoras, câmeras, usuários e visitantes no mesmo domínio de broadcast. Sua tarefa será propor uma segmentação segura e justificável.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como separar sintomas físicos, ruído de broadcast, ausência de VLAN, loop de Camada 2 e falhas de política entre segmentos.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li><strong>Ideia central:</strong> switches reduzem colisões, mas broadcasts continuam existindo dentro da VLAN.</li><li><strong>O que lembrar:</strong> hub repete; switch aprende e encaminha; VLAN limita broadcast; roteador separa redes.</li><li><strong>Erro comum:</strong> achar que switch elimina todos os problemas de Camada 2.</li><li><strong>Uso real:</strong> diagnóstico de loops, storms, VLANs, rede plana e desempenho de LAN.</li><li><strong>Segurança:</strong> domínios grandes demais ampliam descoberta, movimento lateral e impacto de falhas.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula estudaremos ARP: o mecanismo que permite ao IPv4 descobrir o endereço MAC do próximo salto dentro da rede local. Broadcast será essencial para entender por que ARP funciona e por que ARP spoofing existe como risco defensivo.</p>\n</section>"
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
  "protocolFields": [
    {
      "field": "Destination MAC ff:ff:ff:ff:ff:ff",
      "size": "48 bits",
      "purpose": "Representar broadcast Ethernet para todos os hosts da VLAN.",
      "securityObservation": "Broadcast excessivo pode indicar loop, storm, varredura ruidosa ou projeto inadequado."
    },
    {
      "field": "Source MAC",
      "size": "48 bits",
      "purpose": "Permitir aprendizado do switch e rastreio defensivo de origem por porta/VLAN.",
      "securityObservation": "MAC pode ser falsificado; não trate como identidade forte."
    },
    {
      "field": "VLAN ID",
      "size": "12 bits no tag 802.1Q",
      "purpose": "Separar domínios de broadcast no mesmo ambiente físico.",
      "securityObservation": "VLAN errada ou trunk permissivo pode expor segmentos."
    },
    {
      "field": "FCS",
      "size": "32 bits",
      "purpose": "Detectar erro no frame Ethernet.",
      "securityObservation": "Erros recorrentes podem indicar problema físico, interferência ou equipamento defeituoso."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host A",
      "action": "Envia ARP Request em broadcast.",
      "detail": "Destination MAC é ff:ff:ff:ff:ff:ff.",
      "possibleFailure": "Broadcast excessivo em rede grande causa ruído e lentidão."
    },
    {
      "step": 2,
      "actor": "Switch",
      "action": "Recebe o frame e aprende o MAC de origem.",
      "detail": "Registra Source MAC na porta e VLAN de entrada.",
      "possibleFailure": "MAC flapping ou porta com equipamento não autorizado."
    },
    {
      "step": 3,
      "actor": "Switch",
      "action": "Replica broadcast dentro da VLAN.",
      "detail": "Envia para todas as portas membros da VLAN, exceto a origem.",
      "possibleFailure": "Loop sem STP pode multiplicar broadcasts."
    },
    {
      "step": 4,
      "actor": "Roteador/Gateway",
      "action": "Não encaminha broadcast L2 para outra rede.",
      "detail": "Roteamento separa domínios de broadcast.",
      "possibleFailure": "Rede plana demais mantém escopo de broadcast grande."
    }
  ],
  "deepDive": {
    "mentalModel": "Colisão é disputa pelo meio; broadcast é alcance lógico dentro da VLAN. Switch resolve muito do problema de colisão, mas broadcast precisa de segmentação.",
    "keyTerms": [
      "domínio de colisão",
      "domínio de broadcast",
      "hub",
      "switch",
      "VLAN",
      "storm control"
    ],
    "limitations": [
      "Switch não substitui firewall.",
      "VLAN sem política não garante autorização.",
      "Broadcast pequeno é normal; broadcast excessivo exige investigação."
    ],
    "whenToUse": [
      "Ao desenhar LANs.",
      "Ao investigar lentidão local.",
      "Ao planejar VLANs.",
      "Ao revisar riscos de movimento lateral."
    ],
    "whenNotToUse": [
      "Não use domínio de colisão como explicação para todo problema moderno.",
      "Não trate VLAN como solução única de segurança."
    ],
    "operationalImpact": [
      "Segmentar reduz ruído, mas exige documentação e roteamento entre VLANs.",
      "Storm control e STP precisam ser monitorados para evitar indisponibilidade."
    ],
    "financialImpact": [
      "Switches gerenciáveis, NAC e monitoramento custam mais, mas reduzem risco operacional.",
      "Redes planas parecem baratas, mas aumentam custo de incidentes e troubleshooting."
    ],
    "securityImpact": [
      "Domínios grandes aumentam descoberta interna, escopo de falhas e movimento lateral."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que switch elimina broadcast.",
      "whyItHappens": "O aluno vê que switch envia unicast seletivamente.",
      "consequence": "Projeta VLANs grandes demais.",
      "correction": "Switch reduz colisão e unicast desnecessário, mas broadcast continua dentro da VLAN."
    },
    {
      "mistake": "Confundir VLAN com firewall.",
      "whyItHappens": "VLAN separa domínios de broadcast.",
      "consequence": "Acesso entre VLANs pode ficar liberado no roteamento.",
      "correction": "Use ACLs, firewall e política entre segmentos."
    },
    {
      "mistake": "Ignorar equipamentos domésticos conectados em portas corporativas.",
      "whyItHappens": "Mini-switches parecem inofensivos.",
      "consequence": "Loop, expansão não documentada e risco físico.",
      "correction": "Use inventário, port security, 802.1X e inspeção."
    }
  ],
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
        "command": "show mac address-table\nshow interfaces counters errors\nshow spanning-tree\nshow storm-control",
        "purpose": "Ver tabela MAC, erros, STP e controle de storm.",
        "expectedObservation": "MACs estáveis, sem erros anormais, STP consistente.",
        "interpretation": "MAC flapping, erros ou eventos STP indicam investigação de L2."
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
      "Habilitar STP, BPDU Guard, port security ou 802.1X conforme cenário.",
      "Monitorar broadcast, MAC flapping e eventos de storm control.",
      "Documentar portas, trunks e exceções."
    ],
    "badPractices": [
      "Manter todos os ativos em uma única VLAN.",
      "Permitir mini-switches não autorizados.",
      "Desabilitar STP sem justificativa.",
      "Usar VLAN como único controle de segurança.",
      "Não registrar mudanças em portas de acesso."
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
        "defensiveExplanation": "Pode causar indisponibilidade local e mascarar a causa real.",
        "mitigation": "STP, BPDU Guard, storm control, documentação e resposta operacional."
      },
      {
        "name": "Rede plana e movimento lateral",
        "description": "Muitos ativos compartilham o mesmo domínio lógico.",
        "defensiveExplanation": "Facilita descoberta e propagação após comprometimento.",
        "mitigation": "Segmentação, firewall interno, NAC, logs e menor privilégio."
      }
    ],
    "monitoring": [
      "Eventos STP",
      "MAC flapping",
      "Contadores de broadcast/multicast",
      "Erros CRC",
      "Mudanças de porta",
      "Alertas NAC"
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
    "scenario": "Você recebeu o desenho de uma rede pequena com usuários, impressora, AP e gateway. Sua tarefa é classificar domínios, propor segmentação e coletar evidências seguras.",
    "topology": "Hosts -> switch de acesso -> gateway/firewall; opcionalmente um hub/mini-switch conceitual para comparação.",
    "architecture": "LAN Ethernet com uma ou mais VLANs, switch de acesso e gateway L3 separando domínios de broadcast.",
    "prerequisites": [
      "Aulas 3.1 a 3.3",
      "Acesso a terminal local ou simulador",
      "Não realizar testes intrusivos em rede de produção"
    ],
    "tools": [
      "Windows PowerShell ou CMD",
      "Linux terminal",
      "Opcional: Packet Tracer/GNS3",
      "Opcional: switch Cisco autorizado"
    ],
    "estimatedTimeMinutes": 120,
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
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
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
        "title": "Classificar domínio de broadcast",
        "instruction": "Identifique quais dispositivos provavelmente recebem broadcasts entre si.",
        "command": "Análise conceitual baseada em IP, VLAN e gateway.",
        "expectedOutput": "Lista de dispositivos no mesmo domínio de broadcast.",
        "explanation": "Hosts na mesma VLAN/sub-rede normalmente compartilham broadcasts L2."
      },
      {
        "number": 5,
        "title": "Comparar hub e switch",
        "instruction": "Explique como o tráfego se comportaria se o dispositivo central fosse hub e como se comporta com switch.",
        "command": "Opcional Cisco: show mac address-table",
        "expectedOutput": "Tabela comparando repetição total vs forwarding seletivo.",
        "explanation": "A comparação fixa o motivo histórico da substituição de hubs por switches."
      },
      {
        "number": 6,
        "title": "Propor segmentação defensiva",
        "instruction": "Sugira VLANs para usuários, visitantes, impressoras, gestão e IoT/câmeras.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de segmentação com justificativa e riscos reduzidos.",
        "explanation": "A segmentação reduz domínio de broadcast e escopo de movimento lateral."
      }
    ],
    "expectedResult": "O aluno deve entregar mapa físico/lógico, classificação de domínio de colisão e broadcast, riscos e proposta de segmentação.",
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
        "check": "Plano de segmentação tem justificativa",
        "command": "Revisão do relatório",
        "expected": "Cada VLAN possui função e risco reduzido",
        "ifFails": "Explique o problema que cada separação resolve."
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
      "Repetir em Packet Tracer com hub e switch.",
      "Adicionar VLANs e observar redução de broadcast.",
      "Criar matriz de riscos por segmento.",
      "Adicionar controles como BPDU Guard, storm control e 802.1X."
    ],
    "evidenceToCollect": [
      "Mapa físico simples",
      "Tabela de dispositivos",
      "Saída sanitizada de ipconfig/ip addr",
      "Saída sanitizada de arp/ip neigh",
      "Plano de VLANs proposto",
      "Lista de riscos e mitigações"
    ],
    "questions": [
      "Qual problema o switch resolveu em relação ao hub?",
      "O que ainda continua alcançando toda a VLAN?",
      "Por que roteadores separam domínios de broadcast?",
      "Qual risco de uma única VLAN para toda a empresa?"
    ],
    "challenge": "Desenhe uma rede pequena com usuários, visitantes, impressoras e câmeras. Separe domínios de broadcast e defina quais comunicações devem passar por firewall.",
    "solution": "Uma solução defensiva separa usuários, visitantes, impressoras e câmeras em VLANs distintas; limita comunicação entre VLANs por firewall/ACL; mantém gestão em VLAN restrita; usa STP, storm control, port security/802.1X e documentação de portas."
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
      "type": "conceito",
      "q": "O que um hub faz com sinais recebidos em uma porta?",
      "opts": [
        "Repete para todas as portas",
        "Encaminha apenas para o MAC correto",
        "Roteia para outra rede",
        "Criptografa o frame"
      ],
      "a": 0,
      "exp": "Hub é repetidor; ele não aprende MAC nem filtra tráfego.",
      "difficulty": "iniciante",
      "topic": "hub"
    },
    {
      "id": "q3.4.2",
      "type": "comparação",
      "q": "O que o switch reduz em comparação com hubs?",
      "opts": [
        "Domínios de colisão compartilhados",
        "Necessidade de IP",
        "Broadcast dentro da VLAN",
        "Uso de ARP"
      ],
      "a": 0,
      "exp": "Switches segmentam colisão por porta, mas broadcasts continuam na VLAN.",
      "difficulty": "iniciante",
      "topic": "switch"
    },
    {
      "id": "q3.4.3",
      "type": "diagnóstico",
      "q": "Broadcast excessivo em uma VLAN pode indicar primeiro qual problema?",
      "opts": [
        "Loop ou storm de Camada 2",
        "Certificado TLS expirado",
        "Senha errada no sistema",
        "Erro de Unicode"
      ],
      "a": 0,
      "exp": "Broadcast storm e loops são hipóteses de Camada 2.",
      "difficulty": "intermediário",
      "topic": "broadcast"
    },
    {
      "id": "q3.4.4",
      "type": "segurança",
      "q": "Qual prática reduz o escopo de broadcast e movimento lateral?",
      "opts": [
        "Segmentar por VLAN e controlar tráfego entre segmentos",
        "Colocar todos na mesma rede",
        "Desabilitar logs",
        "Trocar DNS público"
      ],
      "a": 0,
      "exp": "VLAN reduz domínio de broadcast; política controla tráfego entre redes.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q3.4.5",
      "type": "arquitetura",
      "q": "Quem normalmente separa domínios de broadcast?",
      "opts": [
        "Roteador ou interface L3",
        "Hub",
        "Cabo RJ-45",
        "Servidor DNS"
      ],
      "a": 0,
      "exp": "Roteadores e gateways L3 separam redes e não encaminham broadcasts L2 comuns.",
      "difficulty": "iniciante",
      "topic": "L3"
    },
    {
      "id": "q3.4.6",
      "type": "pegadinha",
      "q": "Qual afirmação é correta?",
      "opts": [
        "Switch reduz colisão, mas não elimina broadcast dentro da VLAN",
        "Switch elimina ARP",
        "VLAN é igual a firewall",
        "Hub aprende MAC"
      ],
      "a": 0,
      "exp": "Essa é a distinção mais importante da aula.",
      "difficulty": "intermediário",
      "topic": "síntese"
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
      "id": "fc3.4.3",
      "front": "Hub aprende MAC?",
      "back": "Não. Hub apenas repete sinais para todas as portas.",
      "tags": [
        "hub"
      ],
      "difficulty": "iniciante"
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
      "id": "fc3.4.5",
      "front": "O que limita broadcast em LAN?",
      "back": "VLANs e roteamento/gateways L3 separam domínios de broadcast.",
      "tags": [
        "VLAN"
      ],
      "difficulty": "intermediário"
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
      "id": "ex3.4.2",
      "type": "arquitetura",
      "prompt": "Uma empresa tem usuários, câmeras e visitantes na mesma VLAN. Liste dois riscos.",
      "expectedAnswer": "Movimento lateral e broadcast amplo; também descoberta de ativos e dificuldade de política.",
      "explanation": "Segmentos com funções diferentes não deveriam compartilhar o mesmo domínio sem necessidade."
    },
    {
      "id": "ex3.4.3",
      "type": "diagnóstico",
      "prompt": "Que evidências você buscaria em um switch diante de suspeita de broadcast storm?",
      "expectedAnswer": "Contadores de broadcast/multicast, eventos STP, MAC flapping, storm-control e interfaces com tráfego anormal.",
      "explanation": "O diagnóstico deve usar evidências, não reinicializações aleatórias."
    },
    {
      "id": "ex3.4.4",
      "type": "comparação",
      "prompt": "Por que um switch é melhor que um hub para tráfego unicast?",
      "expectedAnswer": "Porque aprende MACs e encaminha unicast conhecido apenas para a porta correta.",
      "explanation": "Isso reduz exposição, ruído e disputa."
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
