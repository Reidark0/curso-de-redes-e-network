export const lesson0301 = {
  "id": "3.1",
  "moduleId": "m03",
  "order": 1,
  "title": "Ethernet: a base da rede local cabeada",
  "subtitle": "Como a tecnologia que domina redes locais transforma bits em quadros, endereços MAC, enlaces e evidências de troubleshooting.",
  "duration": "85-120 min",
  "estimatedStudyTimeMinutes": 120,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Imagine que um usuário está sentado ao lado do switch, conectado por cabo, com o notebook mostrando ícone de rede, mas não consegue acessar o sistema interno. Outro usuário, na mesma sala, funciona normalmente. O chamado chega como “sem internet”, mas o problema pode estar no cabo, na placa de rede, na porta do switch, na negociação de velocidade, na VLAN, na tabela MAC, no ARP, no gateway, no DNS ou na aplicação.</p><p>Ethernet é um dos primeiros lugares onde esse tipo de investigação precisa passar. Ela é a base de grande parte das redes locais cabeadas. Antes de falar profundamente de IP, roteamento, firewall ou DNS, é necessário entender como dois equipamentos dentro de uma LAN conseguem enviar quadros um ao outro usando endereços de camada 2.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> em uma empresa, trocar um cabo de uma porta para outra pode colocar o usuário em VLAN errada, derrubar autenticação 802.1X, quebrar acesso a impressoras, mudar políticas de firewall e gerar alerta no NAC. Para entender esse efeito, você precisa saber o que Ethernet faz e o que ela não faz.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>Ethernet surgiu para resolver um problema muito concreto: permitir que computadores próximos compartilhassem um meio de comunicação local de forma padronizada. Antes de redes locais amplamente padronizadas, conectar computadores envolvia soluções proprietárias, topologias pouco flexíveis e dificuldades de interoperabilidade.</p><p>As primeiras formas de Ethernet trabalhavam com meio compartilhado. Vários dispositivos podiam disputar o mesmo canal de comunicação. Por isso conceitos como colisão, domínio de colisão e detecção de colisão eram importantes. Com o tempo, hubs foram substituídos por switches, links full-duplex se tornaram comuns e a Ethernet moderna passou a oferecer desempenho, simplicidade e interoperabilidade muito superiores.</p><p>Mesmo em ambientes atuais com Wi-Fi, cloud, VPN, SD-WAN, Kubernetes e redes virtuais, Ethernet continua sendo uma base conceitual essencial. Datacenters, racks, servidores, switches, firewalls, uplinks, access points e appliances ainda dependem de ideias de enlace, quadros, endereços MAC e comutação.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>O problema que Ethernet resolve é a comunicação local entre dispositivos conectados a uma mesma rede de enlace. Um computador pode ter dados para enviar, mas esses dados precisam atravessar uma interface física, respeitar um formato de quadro, indicar origem e destino local e chegar ao próximo equipamento.</p><ul class=\"flow-list\"><li><strong>Sem padronização:</strong> cada fabricante poderia usar formato diferente de transmissão local.</li><li><strong>Sem endereço de enlace:</strong> o switch não saberia para qual porta encaminhar o tráfego.</li><li><strong>Sem quadro:</strong> os bits no fio não teriam começo, fim, origem, destino e verificação.</li><li><strong>Sem regras de enlace:</strong> haveria dificuldade para detectar erro, organizar acesso ao meio e interoperar equipamentos.</li><li><strong>Sem diagnóstico de Ethernet:</strong> todo problema local pareceria problema de IP, DNS ou internet.</li></ul><p>Ethernet não substitui IP, não faz roteamento entre redes, não autentica usuários por padrão, não criptografa o tráfego por si só e não decide autorização de aplicação. Ela fornece a base local para transportar quadros entre interfaces dentro de um domínio de camada 2.</p></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><p>A Ethernet evoluiu de redes com meio compartilhado para redes comutadas, full-duplex, de alta velocidade e altamente integradas a datacenters e campus corporativos.</p><table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead><tbody><tr><td>Ethernet em meio compartilhado</td><td>Vários hosts disputavam o mesmo meio.</td><td>Colisões, baixa escalabilidade e desempenho limitado.</td><td>Uso crescente de bridges e switches.</td></tr><tr><td>Hub</td><td>Repetia sinais para todas as portas.</td><td>Todos compartilhavam o mesmo domínio de colisão.</td><td>Switch com aprendizado de MAC.</td></tr><tr><td>Switch Ethernet</td><td>Encaminha frames com base em tabela MAC.</td><td>Exige controle contra loops e boa segmentação.</td><td>VLANs, STP, trunks e redes comutadas modernas.</td></tr><tr><td>Ethernet em datacenter</td><td>Alta velocidade em switches top-of-rack, agregação e spine-leaf.</td><td>Mais complexidade operacional e risco de impacto amplo.</td><td>Automação, observabilidade, EVPN/VXLAN e políticas de rede.</td></tr></tbody></table><p>O ponto mais importante é perceber que Ethernet não é apenas um cabo. Ethernet envolve formato de frame, endereçamento MAC, regras de encaminhamento local, meios físicos compatíveis e comportamento esperado dos equipamentos de camada 2.</p></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p>Ethernet é uma família de tecnologias de rede local que define como dispositivos se comunicam em camada de enlace, principalmente em redes cabeadas. Ela especifica aspectos físicos e de enlace, como meios de transmissão, velocidades, endereçamento MAC, formato de frame e comportamento de comunicação local.</p><div class=\"definition-box\"><strong>Definição:</strong> Ethernet é uma tecnologia de LAN que permite a troca de quadros entre interfaces de rede usando endereços MAC e regras padronizadas de camada 2.</div><p>Em termos práticos, quando seu computador envia tráfego para o gateway em uma rede cabeada, ele não joga “um pacote IP puro” no cabo. Ele encapsula esse pacote IP dentro de um frame Ethernet com MAC de origem, MAC de destino e outros campos. O switch observa o frame e decide para qual porta encaminhá-lo.</p></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><p>O funcionamento interno básico de Ethernet envolve interface de rede, meio físico, frame, endereço MAC, switch e verificação de erro.</p><ol class=\"flow-list\"><li>Uma aplicação gera dados que descem pela pilha de protocolos.</li><li>O IP define o endereço lógico de origem e destino.</li><li>Para enviar na LAN, o host precisa de um destino de camada 2: normalmente o MAC do host local ou do gateway.</li><li>A placa de rede monta um frame Ethernet com MAC de origem, MAC de destino, tipo de protocolo transportado e dados.</li><li>O frame vira sinais no meio físico: eletricidade em cobre, luz em fibra ou outro meio compatível.</li><li>O switch recebe o frame, aprende o MAC de origem em uma porta e procura o MAC de destino em sua tabela.</li><li>Se souber a porta do destino, encaminha apenas para ela. Se não souber, pode fazer flooding dentro do domínio apropriado.</li><li>O destino recebe o frame, verifica integridade e entrega o conteúdo para a camada superior.</li></ol><p>Esse fluxo explica por que problemas de camada 2 podem parecer misteriosos. IP e DNS podem estar corretos, mas se a VLAN estiver errada, a porta estiver bloqueada, o MAC não for aprendido, houver loop, cabo ruim ou negociação incorreta, a comunicação local falha.</p></section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>Na arquitetura de redes, Ethernet aparece principalmente na borda de acesso, nos uplinks entre switches, em links de servidores, em firewalls, em access points cabeados, em appliances e em conexões de datacenter.</p><ul class=\"flow-list\"><li><strong>Camada envolvida:</strong> principalmente Camada 2, com componentes de Camada 1.</li><li><strong>Componentes:</strong> NIC, cabo, transceptor, switch, patch panel, porta access, trunk e VLAN.</li><li><strong>Dependências:</strong> meio físico funcional, negociação correta, domínio de broadcast, tabela MAC e, muitas vezes, ARP.</li><li><strong>Pontos de falha:</strong> cabo, conector, porta, velocidade/duplex, VLAN errada, loop, STP, tabela MAC instável e segurança de porta.</li><li><strong>Pontos de segurança:</strong> acesso físico, portas não utilizadas, autenticação de rede, segmentação, monitoramento de MAC e proteção contra abusos de camada 2.</li></ul><p>Em uma empresa, Ethernet raramente aparece isolada. Ela sustenta VLANs, roteamento entre redes, firewalls internos, Wi-Fi corporativo, telefonia IP, câmeras, impressoras, servidores e conexões de infraestrutura crítica.</p></section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Pense em Ethernet como o sistema interno de entrega de correspondências dentro de um prédio. O endereço IP seria como o endereço lógico do destinatário no mundo maior, mas dentro do prédio o entregador precisa saber em qual sala entregar o envelope. O endereço MAC funciona como essa identificação local da interface, e o switch funciona como uma portaria inteligente que aprende onde cada sala está conectada.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> uma rede Ethernet não entrega pacotes com pessoas andando pelo prédio. Ela trabalha com sinais, frames, tabelas MAC, temporização e regras de camada 2. Além disso, endereços MAC podem ser alterados em software e o switch aprende dinamicamente, o que não é igual a uma sala física fixa.</div></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2><p>Em casa, seu computador conectado por cabo ao roteador usa Ethernet na conexão local. Ao acessar um site, o computador pode precisar enviar tráfego ao gateway padrão. Para isso, ele envia frames Ethernet para o MAC da interface LAN do roteador. O roteador remove o frame local, processa o pacote IP e encaminha para outra rede.</p><p>Se o cabo estiver ruim, a porta negociar a 100 Mbps em vez de 1 Gbps, o link ficar caindo ou o adaptador estiver desabilitado, o problema acontece antes mesmo de DNS ou HTTP entrarem em cena. É por isso que uma investigação básica começa verificando link, interface, velocidade, gateway e evidências locais.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Em uma empresa, uma estação de trabalho normalmente se conecta a uma tomada de rede, que vai para um patch panel e depois para uma porta de switch de acesso. Essa porta pode estar em uma VLAN específica, com autenticação 802.1X, controle de MAC, PoE para telefone IP ou políticas de segurança.</p><p>Um erro simples, como patch cord no ponto errado, porta configurada na VLAN errada ou documentação desatualizada, pode fazer o usuário receber IP incorreto, não alcançar o gateway ou aparecer em segmento não autorizado. Para o SOC, a mesma camada gera evidências: MAC de origem, porta do switch, VLAN, horário de conexão, alterações de link e possíveis anomalias.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em cloud pública, o aluno normalmente não configura Ethernet física diretamente. O provedor abstrai switches, cabos, interfaces físicas e parte da camada 2. Ainda assim, a lógica de interface, endereço, enlace local e encapsulamento continua importante para entender NIC virtual, subnet, route table, load balancer, security group, private endpoint e redes virtuais.</p><p>Em ambientes híbridos, Ethernet volta a aparecer de forma explícita: links dedicados, appliances físicos, firewalls, switches de datacenter, racks, cross-connects, conexões com provedores, portas trunk e handoff para circuitos WAN. Mesmo quando a cloud abstrai a camada física, a operação corporativa ainda depende de uma base Ethernet confiável.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Em DevSecOps, Ethernet parece distante do pipeline, mas afeta runners self-hosted, registries internos, clusters Kubernetes on-premises, appliances de segurança, storage de rede e conectividade entre ambientes. Um pipeline pode falhar ao baixar imagem de container não porque o Docker esteja errado, mas porque a rede local do runner está com VLAN incorreta, porta bloqueada ou caminho físico instável.</p><p>Também existe uma ponte conceitual importante: bridges Linux, veth pairs, CNIs e redes de containers simulam ou abstraem comportamentos de camada 2. Entender Ethernet ajuda a compreender por que containers têm interfaces, MACs virtuais, bridges e regras de encaminhamento local.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>Ethernet não oferece segurança forte por padrão. Em uma LAN mal controlada, um dispositivo conectado fisicamente pode tentar observar tráfego local permitido, abusar de broadcast, explorar configurações fracas, gerar flooding ou se apresentar com identificadores falsos. O foco aqui é defensivo: entender os riscos para desenhar controles.</p><table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody><tr><td>Porta física exposta</td><td>Tomada ativa em local público.</td><td>Dispositivo não autorizado entra na LAN.</td><td>Desativar portas, NAC, 802.1X, controle físico.</td></tr><tr><td>Rede plana</td><td>Muitos ativos no mesmo domínio de broadcast.</td><td>Movimento lateral e maior impacto de incidentes.</td><td>VLANs, firewall interno, segmentação e logs.</td></tr><tr><td>MAC instável ou desconhecido</td><td>Tabela MAC muda rapidamente ou aparece MAC inesperado.</td><td>Dificulta rastreabilidade e pode indicar abuso ou erro.</td><td>Monitoramento, port security, inventário e investigação.</td></tr><tr><td>Loop de camada 2</td><td>Broadcast storm, CPU alta em switches, rede instável.</td><td>Indisponibilidade ampla.</td><td>STP, BPDU Guard, desenho correto e controle de mudanças.</td></tr></tbody></table></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2><svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m03l01-title m03l01-desc\"><title id=\"m03l01-title\">Ethernet na rede local cabeada</title><desc id=\"m03l01-desc\">Host envia um frame Ethernet para o switch, que aprende o MAC de origem e encaminha para o gateway ou servidor local.</desc><defs><marker id=\"m03l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs><rect x=\"40\" y=\"110\" width=\"160\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\"/><text x=\"120\" y=\"143\" text-anchor=\"middle\" class=\"svg-label\">Host</text><text x=\"120\" y=\"168\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC origem</text><rect x=\"285\" y=\"110\" width=\"180\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--switch\"/><text x=\"375\" y=\"143\" text-anchor=\"middle\" class=\"svg-label\">Switch</text><text x=\"375\" y=\"168\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela MAC</text><rect x=\"565\" y=\"70\" width=\"170\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--router\"/><text x=\"650\" y=\"103\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"650\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Próximo salto</text><rect x=\"565\" y=\"205\" width=\"170\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--server\"/><text x=\"650\" y=\"238\" text-anchor=\"middle\" class=\"svg-label\">Servidor local</text><text x=\"650\" y=\"263\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Mesmo domínio</text><rect x=\"790\" y=\"125\" width=\"150\" height=\"88\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"865\" y=\"158\" text-anchor=\"middle\" class=\"svg-label\">Controles</text><text x=\"865\" y=\"183\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN / NAC</text><line x1=\"200\" y1=\"151\" x2=\"285\" y2=\"151\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l01-arrow)\"/><line x1=\"465\" y1=\"140\" x2=\"565\" y2=\"112\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l01-arrow)\"/><line x1=\"465\" y1=\"165\" x2=\"565\" y2=\"246\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l01-arrow)\"/><line x1=\"735\" y1=\"151\" x2=\"790\" y2=\"169\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m03l01-arrow)\"/><rect x=\"80\" y=\"350\" width=\"820\" height=\"92\" rx=\"16\" class=\"svg-zone\"/><text x=\"490\" y=\"382\" text-anchor=\"middle\" class=\"svg-label\">Frame Ethernet</text><text x=\"490\" y=\"412\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC destino | MAC origem | EtherType | Dados encapsulados | FCS</text></svg><p>O diagrama mostra a ideia central: na LAN cabeada, o host não envia apenas dados abstratos. Ele transmite frames Ethernet. O switch aprende endereços MAC, encaminha frames e pode aplicar ou participar de controles como VLAN, autenticação e segmentação.</p></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>O laboratório desta aula é defensivo e local. Você vai levantar evidências básicas de Ethernet no seu próprio computador: interface, MAC, estado do link, velocidade quando disponível, gateway, vizinhança ARP e interpretação por camadas. O objetivo não é invadir, varrer ou interferir na rede. O objetivo é aprender a reconhecer a presença da Ethernet e separar evidências físicas, enlace e IP.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios reforçam a distinção entre Ethernet, IP, switch, gateway, MAC e serviços. A intenção é impedir confusões comuns antes de avançar para frames, switches, ARP e VLANs.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>O desafio simula um chamado em que um usuário conectado por cabo não acessa sistemas internos. Você precisará montar hipóteses de Camada 1, Camada 2 e Camada 3, indicar evidências e propor uma sequência segura de investigação.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra como raciocinar sem pular etapas: verificar link físico, interface, MAC, VLAN/switchport, gateway, ARP e só depois avançar para DNS ou aplicação.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><ul><li><strong>Ideia central:</strong> Ethernet é a base de comunicação local cabeada em camada 2.</li><li><strong>O que lembrar:</strong> hosts enviam frames com MAC de origem e destino; switches aprendem MACs por porta.</li><li><strong>Erro comum:</strong> confundir Ethernet com internet, IP, Wi-Fi ou roteamento.</li><li><strong>Uso real:</strong> LAN corporativa, datacenter, acesso de usuários, servidores, appliances, switches e gateways.</li><li><strong>Segurança:</strong> portas físicas, VLANs, NAC, inventário e monitoramento são essenciais.</li></ul></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, vamos abrir o frame Ethernet e estudar seus campos principais: MAC de destino, MAC de origem, EtherType, dados e FCS. Isso prepara o caminho para entender switches, ARP, VLANs e análise de tráfego em Wireshark.</p></section>"
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
  "protocolFields": [
    {
      "field": "Destination MAC",
      "size": "48 bits",
      "purpose": "Identificar o destino local do frame Ethernet.",
      "securityObservation": "Pode apontar para gateway, host local, broadcast ou multicast; deve ser interpretado no contexto da LAN."
    },
    {
      "field": "Source MAC",
      "size": "48 bits",
      "purpose": "Identificar a interface que originou o frame no enlace local.",
      "securityObservation": "Pode ser alterado em software, portanto não deve ser usado sozinho como identidade forte."
    },
    {
      "field": "EtherType",
      "size": "16 bits",
      "purpose": "Indicar qual protocolo de camada superior está encapsulado, como IPv4, IPv6 ou ARP.",
      "securityObservation": "Ajuda na análise defensiva de tráfego e filtros de captura."
    },
    {
      "field": "FCS",
      "size": "32 bits",
      "purpose": "Permitir verificação de erro no frame.",
      "securityObservation": "Erros físicos ou de enlace podem aparecer como CRC/FCS em equipamentos gerenciáveis."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Recebe dados das camadas superiores.",
      "detail": "O pacote IP precisa ser transportado dentro de um frame Ethernet na LAN.",
      "possibleFailure": "Interface desabilitada ou sem link físico."
    },
    {
      "step": 2,
      "actor": "Host",
      "action": "Define o MAC de destino local.",
      "detail": "Pode ser o MAC do host na mesma rede ou do gateway, normalmente descoberto via ARP para IPv4.",
      "possibleFailure": "ARP ausente, cache incorreto ou destino fora do domínio esperado."
    },
    {
      "step": 3,
      "actor": "NIC",
      "action": "Monta e transmite o frame.",
      "detail": "Frame contém MAC destino, MAC origem, EtherType, payload e verificação.",
      "possibleFailure": "Cabo ruim, duplex/velocidade problemática ou erro físico."
    },
    {
      "step": 4,
      "actor": "Switch",
      "action": "Aprende o MAC de origem e encaminha pelo MAC de destino.",
      "detail": "A tabela MAC associa endereços a portas por tempo limitado.",
      "possibleFailure": "Tabela instável, VLAN errada, loop ou flooding excessivo."
    },
    {
      "step": 5,
      "actor": "Destino",
      "action": "Recebe o frame e entrega payload para a próxima camada.",
      "detail": "Se o frame for para o gateway, o roteador processa o pacote IP e decide o próximo salto.",
      "possibleFailure": "Gateway indisponível, porta bloqueada ou política impedindo tráfego."
    }
  ],
  "deepDive": {
    "mentalModel": "Ethernet é o envelope local da LAN cabeada: ela entrega quadros entre interfaces próximas usando MACs e switches, enquanto IP cuida do endereçamento lógico entre redes.",
    "keyTerms": [
      "Ethernet",
      "LAN",
      "frame",
      "MAC",
      "switch",
      "NIC",
      "EtherType",
      "FCS",
      "domínio de broadcast"
    ],
    "limitations": [
      "Não roteia entre redes por si só.",
      "Não autentica usuário por padrão.",
      "Não criptografa tráfego por padrão.",
      "Não substitui firewall, IAM ou controle de aplicação.",
      "Não resolve problemas de DNS, TLS ou HTTP."
    ],
    "whenToUse": [
      "Conectar hosts em LAN cabeada.",
      "Ligar servidores, switches, firewalls, APs e appliances.",
      "Criar base física e de enlace para redes corporativas.",
      "Investigar problemas locais antes de culpar IP ou aplicação."
    ],
    "whenNotToUse": [
      "Quando mobilidade sem fio é requisito principal.",
      "Quando a comunicação precisa atravessar redes sem roteamento.",
      "Quando o problema está claramente em aplicação, IAM ou autorização.",
      "Quando controles criptográficos de ponta a ponta são exigidos sem outras camadas."
    ],
    "operationalImpact": [
      "Exige documentação de portas, VLANs, racks e patch panels.",
      "Problemas físicos podem causar sintomas intermitentes difíceis.",
      "Switches precisam de configuração, monitoramento e controle de mudanças.",
      "Alterações de porta ou VLAN podem afetar segurança e operação."
    ],
    "financialImpact": [
      "Switches, cabos, patch panels, racks, certificação e mão de obra têm custo.",
      "Ambientes maiores exigem switches gerenciáveis e ferramentas de monitoramento.",
      "Falhas de cabeamento podem gerar horas de troubleshooting e indisponibilidade.",
      "Redundância aumenta custo, mas reduz impacto operacional."
    ],
    "securityImpact": [
      "Portas ativas sem controle podem permitir acesso indevido.",
      "MAC não é identidade forte.",
      "Rede plana amplia movimento lateral.",
      "VLAN e NAC ajudam, mas não substituem autenticação e autorização de aplicação."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Confundir Ethernet com internet.",
      "whyItHappens": "Os termos aparecem juntos no cotidiano.",
      "consequence": "O aluno diagnostica problemas locais como se fossem falhas do provedor.",
      "correction": "Ethernet é tecnologia de LAN; internet é interconexão de redes usando IP e roteamento."
    },
    {
      "mistake": "Achar que MAC identifica usuário de forma segura.",
      "whyItHappens": "MAC parece um identificador único e fixo.",
      "consequence": "Controles de segurança ficam frágeis.",
      "correction": "MAC pode ser alterado; use NAC, autenticação, inventário e logs correlacionados."
    },
    {
      "mistake": "Ignorar VLAN ao trocar cabo de porta.",
      "whyItHappens": "A porta parece fisicamente igual.",
      "consequence": "Host entra em segmento errado ou perde acesso.",
      "correction": "Validar configuração do switchport, VLAN, trunk/access e documentação."
    },
    {
      "mistake": "Culpar DNS antes de verificar link e gateway.",
      "whyItHappens": "Muitos problemas aparecem ao acessar nomes.",
      "consequence": "Tempo perdido em camada errada.",
      "correction": "Usar método por camadas: link, IP local, gateway, DNS, transporte e aplicação."
    }
  ],
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
        "command": "Get-NetAdapter | Format-Table Name, Status, LinkSpeed, MacAddress\nipconfig /all\narp -a",
        "purpose": "Ver adaptador, link, velocidade, MAC, IP, gateway e vizinhança ARP.",
        "expectedObservation": "Adaptador Up, velocidade coerente, MAC presente e gateway configurado.",
        "interpretation": "Se o adaptador está Down ou sem gateway, investigar Camada 1/2 antes de DNS ou HTTP."
      },
      {
        "platform": "Linux",
        "command": "ip link\nip addr\nip route\nip neigh",
        "purpose": "Ver estado da interface, MAC, IP, rota default e vizinhos locais.",
        "expectedObservation": "Interface UP/LOWER_UP, endereço IP, rota default e vizinho para gateway.",
        "interpretation": "Sem LOWER_UP indica possível problema físico; sem vizinho indica problema local ou ARP ainda não resolvido."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status\nshow mac address-table\nshow vlan brief\nshow interfaces counters errors",
        "purpose": "Ver portas, VLAN, MACs aprendidos e erros físicos/de enlace.",
        "expectedObservation": "Porta connected, VLAN correta, MAC aprendido e poucos erros.",
        "interpretation": "CRC, flaps ou VLAN incorreta indicam investigação de camada física/enlace."
      }
    ],
    "decisionTree": [
      {
        "if": "Interface sem link",
        "then": "Verificar cabo, porta, NIC, patch panel, switchport e energia do equipamento."
      },
      {
        "if": "Link existe, mas gateway não responde",
        "then": "Verificar IP, máscara, VLAN, ARP, gateway e firewall local."
      },
      {
        "if": "MAC aparece em porta inesperada",
        "then": "Verificar documentação, patching, movimentação física, spoofing ou loop."
      },
      {
        "if": "Erros CRC ou flaps",
        "then": "Investigar cabo, conector, transceptor, interferência, porta ou negociação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar portas, VLANs e patch panels.",
      "Desativar portas não utilizadas.",
      "Usar 802.1X/NAC quando aplicável.",
      "Monitorar mudanças de MAC e eventos de link.",
      "Separar redes por função com VLANs e controles adicionais.",
      "Proteger racks, switches e tomadas em áreas públicas."
    ],
    "badPractices": [
      "Deixar portas ativas sem necessidade.",
      "Usar rede plana para todos os ativos.",
      "Confiar apenas em MAC como identidade.",
      "Não registrar mudanças físicas.",
      "Não monitorar switchports críticos.",
      "Ignorar erros CRC e flaps recorrentes."
    ],
    "commonErrors": [
      "Tratar VLAN como firewall absoluto.",
      "Achar que cabo funcionando significa rede segura.",
      "Confundir link físico com autorização de aplicação.",
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
      "Aplicar descrição em switchports",
      "Separar VLANs por função",
      "Usar BPDU Guard quando aplicável",
      "Controlar trunks",
      "Aplicar NAC/802.1X",
      "Restringir acesso administrativo ao switch"
    ],
    "detectionIdeas": [
      "Alertar MAC desconhecido em porta sensível",
      "Correlacionar porta física com inventário",
      "Monitorar aumento de broadcast",
      "Investigar flaps recorrentes",
      "Comparar documentação com estado real do switch"
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
      "Ter concluído os Módulos 0, 1 e as aulas 2.1 a 2.10.",
      "Usar apenas equipamentos próprios ou ambiente autorizado.",
      "Não executar varreduras agressivas nem interferir em redes de terceiros."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Opcional: acesso autorizado a switch Cisco ou Packet Tracer",
      "Opcional: Wireshark apenas para observação local autorizada"
    ],
    "estimatedTimeMinutes": 45,
    "cost": "zero",
    "safetyNotes": [
      "Não conecte dispositivos em portas corporativas sem autorização.",
      "Não altere MAC, VLAN ou configuração de switch em ambiente real.",
      "Sanitize MACs, IPs públicos, nomes de host e topologia antes de compartilhar evidências.",
      "O laboratório é defensivo e de observação."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar interfaces locais",
        "instruction": "Liste interfaces de rede e observe nome, estado, MAC e velocidade quando disponível.",
        "command": "Windows:\nGet-NetAdapter | Format-Table Name, Status, LinkSpeed, MacAddress\n\nLinux:\nip link",
        "expectedOutput": "Interface ativa, MAC local e, no Windows, LinkSpeed quando suportado.",
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
        "instruction": "Crie uma pequena tabela com Camada 1, Camada 2 e Camada 3, evidência coletada e interpretação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz com link/interface, MAC/vizinhança e IP/gateway.",
        "explanation": "A matriz evita pular direto para DNS ou aplicação sem validar Ethernet."
      }
    ],
    "expectedResult": "O aluno deve identificar interface, MAC, estado do link, configuração IP, gateway, vizinhança ARP e, se autorizado, porta/VLAN/MAC no switch.",
    "validation": [
      {
        "check": "Interface ativa",
        "command": "Get-NetAdapter ou ip link",
        "expected": "Status Up/connected ou equivalente.",
        "ifFails": "Verificar cabo, adaptador, porta física, Wi-Fi desativado ou driver."
      },
      {
        "check": "Gateway configurado",
        "command": "ipconfig /all ou ip route",
        "expected": "Gateway/default route presente.",
        "ifFails": "Verificar DHCP, configuração manual, VLAN e serviço de rede."
      },
      {
        "check": "Vizinho para gateway",
        "command": "arp -a ou ip neigh",
        "expected": "IP do gateway associado a MAC.",
        "ifFails": "Gerar tráfego para o gateway e verificar link/VLAN/ARP."
      },
      {
        "check": "Switch aprende MAC correto",
        "command": "show mac address-table",
        "expected": "MAC do host na porta esperada.",
        "ifFails": "Verificar patching, VLAN, porta, segurança de porta e documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Interface aparece desconectada",
        "probableCause": "Cabo, porta, adaptador, patch panel ou switch desligado.",
        "howToConfirm": "Ver estado da interface e LEDs/porta do switch se autorizado.",
        "fix": "Testar outro cabo/porta em ambiente autorizado e acionar equipe responsável."
      },
      {
        "symptom": "Link ativo, mas sem gateway",
        "probableCause": "DHCP falhou, VLAN errada ou configuração manual incompleta.",
        "howToConfirm": "Ver ipconfig/ip route e VLAN da porta.",
        "fix": "Corrigir escopo DHCP, VLAN ou configuração IP conforme política."
      },
      {
        "symptom": "Gateway configurado, mas ARP não resolve",
        "probableCause": "Gateway fora do domínio, máscara incorreta, VLAN errada ou bloqueio local.",
        "howToConfirm": "Comparar IP/máscara, VLAN e tabela ARP/neigh.",
        "fix": "Corrigir endereçamento, VLAN ou caminho local."
      },
      {
        "symptom": "Erros CRC ou flaps",
        "probableCause": "Cabo ruim, conector, interferência, porta defeituosa ou transceptor.",
        "howToConfirm": "Contadores do switch e histórico de link.",
        "fix": "Substituir componentes e documentar mudança."
      }
    ],
    "improvements": [
      "Repetir o laboratório no Packet Tracer com switch gerenciável.",
      "Adicionar captura Wireshark de ARP em ambiente próprio.",
      "Criar inventário sanitizado de portas, MACs e VLANs.",
      "Comparar Ethernet cabeada com Wi-Fi e anotar diferenças de evidência."
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
      "Por que uma VLAN errada pode parecer problema de DHCP?",
      "Por que uma porta física exposta é risco de segurança?"
    ],
    "challenge": "Monte um relatório sanitizado explicando se seu host tem evidências suficientes de Ethernet funcional e quais testes faltariam para provar conectividade completa até uma aplicação.",
    "solution": "Uma boa solução separa evidências por camada: Camada 1 com interface/link, Camada 2 com MAC/vizinho/switch, Camada 3 com IP/gateway, Camada 4 com porta e camadas superiores com TLS/HTTP/autenticação. Não declare aplicação funcional apenas porque Ethernet está ativa."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que Ethernet não é a mesma coisa que internet?",
      "hints": [
        "Pense em LAN e roteamento.",
        "Pense em MAC e IP."
      ],
      "expectedIdeas": [
        "Ethernet é camada 2 local",
        "internet envolve IP e roteamento",
        "LAN",
        "MAC",
        "gateway"
      ],
      "explanation": "Ethernet entrega frames localmente; a internet depende de interconexão de redes, IP, roteamento e serviços."
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
      "type": "conceito",
      "q": "Qual é a melhor descrição de Ethernet?",
      "opts": [
        "Tecnologia de LAN que troca frames usando endereços MAC",
        "Protocolo de tradução de nomes em IPs",
        "Sistema de autenticação de usuários web",
        "Protocolo de roteamento entre provedores"
      ],
      "a": 0,
      "exp": "Ethernet atua principalmente na comunicação local de camada 2 usando frames e endereços MAC.",
      "difficulty": "iniciante",
      "topic": "ethernet"
    },
    {
      "id": "q3.1.2",
      "type": "comparação",
      "q": "Qual afirmação diferencia corretamente MAC e IP?",
      "opts": [
        "MAC é endereço local de enlace; IP é endereço lógico de rede",
        "MAC substitui IP em redes modernas",
        "IP só existe em redes Wi-Fi",
        "MAC é sempre identidade forte de usuário"
      ],
      "a": 0,
      "exp": "MAC é usado no enlace local; IP identifica logicamente origem/destino em camada de rede.",
      "difficulty": "iniciante",
      "topic": "mac-ip"
    },
    {
      "id": "q3.1.3",
      "type": "diagnóstico",
      "q": "Um host cabeado mostra interface desconectada. Qual camada deve ser investigada primeiro?",
      "opts": [
        "Camada 1",
        "Camada 4",
        "Camada 7",
        "Camada de autenticação da aplicação"
      ],
      "a": 0,
      "exp": "Interface desconectada aponta inicialmente para meio físico, porta, cabo, NIC ou switch.",
      "difficulty": "iniciante",
      "topic": "troubleshooting"
    },
    {
      "id": "q3.1.4",
      "type": "segurança",
      "q": "Por que MAC não deve ser usado sozinho como controle forte de identidade?",
      "opts": [
        "Porque pode ser alterado ou falsificado em muitos sistemas",
        "Porque MAC só existe em servidores cloud",
        "Porque MAC criptografa o tráfego",
        "Porque MAC impede ARP automaticamente"
      ],
      "a": 0,
      "exp": "MAC pode ser alterado em software; controles fortes exigem autenticação, NAC, logs e correlação.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q3.1.5",
      "type": "arquitetura",
      "q": "Em uma LAN cabeada com switch, o switch encaminha frames principalmente com base em quê?",
      "opts": [
        "Tabela MAC",
        "Tabela DNS",
        "Código HTTP",
        "Token JWT"
      ],
      "a": 0,
      "exp": "Switches Ethernet aprendem MACs por porta e usam a tabela MAC para encaminhar frames.",
      "difficulty": "iniciante",
      "topic": "switching"
    },
    {
      "id": "q3.1.6",
      "type": "cloud",
      "q": "Em cloud pública, por que ainda vale entender Ethernet mesmo que a camada física seja abstraída?",
      "opts": [
        "Porque conceitos de interface, enlace, encapsulamento e segmentação continuam úteis",
        "Porque o cliente sempre configura cabos físicos da cloud",
        "Porque Ethernet substitui security groups",
        "Porque IP deixa de existir em cloud"
      ],
      "a": 0,
      "exp": "Cloud abstrai muitos detalhes físicos, mas redes virtuais ainda dependem de conceitos de interface, enlace e encapsulamento.",
      "difficulty": "intermediário",
      "topic": "cloud"
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
      "id": "fc3.1.3",
      "front": "Switch encaminha frames com base em quê?",
      "back": "Principalmente na tabela MAC, que associa endereços MAC a portas.",
      "tags": [
        "switch",
        "mac"
      ],
      "difficulty": "iniciante"
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
      "id": "fc3.1.5",
      "front": "Por que portas físicas expostas são risco?",
      "back": "Podem permitir conexão de dispositivos não autorizados à LAN se não houver controles físicos e lógicos.",
      "tags": [
        "segurança",
        "lan"
      ],
      "difficulty": "intermediário"
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
      "id": "ex3.1.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras por que Ethernet não é sinônimo de internet.",
      "expectedAnswer": "Ethernet é tecnologia de rede local de camada 2; internet envolve IP, roteamento entre redes e serviços superiores.",
      "explanation": "A confusão ocorre porque em casa o cabo Ethernet costuma ser o caminho para acessar a internet."
    },
    {
      "id": "ex3.1.2",
      "type": "diagnóstico",
      "prompt": "Um notebook conectado por cabo não recebe IP. Liste quatro hipóteses antes de culpar DNS.",
      "expectedAnswer": "Cabo/porta sem link, VLAN errada, switchport bloqueada/desabilitada, DHCP inacessível, autenticação 802.1X/NAC, NIC desabilitada.",
      "explanation": "DNS só entra depois que há conectividade IP mínima."
    },
    {
      "id": "ex3.1.3",
      "type": "segurança",
      "prompt": "Liste três controles para reduzir risco de portas Ethernet em áreas públicas.",
      "expectedAnswer": "Desativar portas não usadas, usar 802.1X/NAC, controle físico, VLAN restrita, monitoramento de MAC e alertas de link.",
      "explanation": "Segurança de acesso começa antes da aplicação, na borda física e de enlace."
    },
    {
      "id": "ex3.1.4",
      "type": "arquitetura",
      "prompt": "Desenhe uma topologia simples host -> switch -> gateway e indique onde aparecem MAC, frame, IP e rota default.",
      "expectedAnswer": "MAC e frame aparecem no enlace host-switch-gateway; IP e rota default aparecem na decisão de camada 3 para sair da rede local.",
      "explanation": "O objetivo é separar camada 2 e camada 3 no mesmo fluxo."
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
