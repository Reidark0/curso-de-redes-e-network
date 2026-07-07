export const lesson0204 = {
  "id": "2.4",
  "moduleId": "m02",
  "order": 4,
  "title": "Camada 2 — Enlace: frames, MAC, switch, VLAN e ARP",
  "subtitle": "A camada que transforma bits em quadros, entrega tráfego dentro da LAN e sustenta Ethernet, switching, VLANs e ARP.",
  "duration": "85-120 min",
  "estimatedStudyTimeMinutes": 120,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 205,
  "tags": [
    "redes",
    "modelo osi",
    "camada 2",
    "ethernet",
    "frame",
    "mac",
    "switch",
    "vlan",
    "arp",
    "lan",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 apresentou o Modelo OSI como método de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "A aula 2.2 explicou encapsulamento e PDUs, incluindo o quadro como PDU de Camada 2."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.3",
      "reason": "A aula 2.3 mostrou que bits precisam atravessar cobre, fibra ou rádio antes de serem organizados em quadros."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.7",
      "reason": "A aula 1.7 apresentou switch, AP, firewall e outros equipamentos de rede."
    }
  ],
  "objectives": [
    "Explicar o papel da Camada 2 no Modelo OSI.",
    "Diferenciar frame, MAC, switch, VLAN e ARP.",
    "Descrever como switches aprendem endereços MAC e encaminham quadros.",
    "Entender broadcast, flooding, domínio de broadcast e segmentação por VLAN.",
    "Coletar evidências básicas de Camada 2 em Windows, Linux e Cisco IOS.",
    "Relacionar Camada 2 com segurança defensiva, cloud, DevSecOps e troubleshooting."
  ],
  "learningOutcomes": [
    "Dado um sintoma local, o aluno consegue separar hipótese física, Camada 2 e Camada 3.",
    "Dado um cenário com VLAN errada, o aluno identifica impacto operacional e evidências necessárias.",
    "Dado um IP de gateway, o aluno entende por que ARP é necessário para descobrir o MAC local.",
    "Dado um output de tabela ARP ou MAC, o aluno interpreta origem, destino e porta provável.",
    "Dado um risco de rede plana, o aluno propõe segmentação e controles defensivos."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Quando alguém diz “a rede não funciona”, muitas vezes a investigação começa pelo IP, pelo DNS ou pelo firewall. Mas antes de existir pacote IP, antes de existir TCP, antes de existir HTTP e antes de existir autenticação, existe uma pergunta de Camada 2: como um dispositivo entrega um quadro para outro dispositivo dentro da mesma rede local?</p>\n  <p>A Camada 2, chamada de Enlace de Dados, é a camada que organiza os bits vindos da Camada 1 em estruturas chamadas frames, ou quadros. Ela usa endereços MAC, switches, VLANs, controle de erro local e, em redes IPv4 sobre Ethernet, depende de ARP para descobrir qual MAC corresponde a um IP dentro da LAN.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma estação recebe IP correto por DHCP, mas não consegue falar com o gateway. O DNS não é o problema. A rota padrão existe. O cabo está conectado. Ao investigar, a equipe descobre que a porta está na VLAN errada. O problema estava na Camada 2.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>As primeiras redes locais precisavam resolver um problema prático: vários equipamentos precisavam compartilhar um meio físico e ainda assim identificar quem estava falando com quem. Ethernet surgiu nesse contexto, inicialmente com meios compartilhados, colisões e regras de acesso ao meio. Com o tempo, hubs foram substituídos por switches, e a rede local deixou de ser um grande domínio compartilhado para se tornar um ambiente com encaminhamento mais inteligente por endereço MAC.</p>\n  <p>A evolução da Camada 2 acompanhou a evolução das empresas. À medida que escritórios cresceram, datacenters surgiram e redes passaram a carregar voz, vídeo, sistemas críticos e acesso à internet, tornou-se necessário separar logicamente grupos de dispositivos. VLANs surgiram como uma forma de criar múltiplas redes lógicas usando a mesma infraestrutura física de switches.</p>\n  <p>ARP também nasceu para resolver um ponto de integração entre o mundo lógico do IPv4 e o mundo local da Ethernet. Um host pode saber o IP de destino, mas uma placa Ethernet precisa de um MAC de destino para montar o quadro. ARP faz essa ponte dentro da rede local.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>A Camada 2 resolve o problema de entrega local. A Camada 1 transmite bits, mas não sabe onde começa um quadro, onde termina, quem é o destinatário local, qual porta do switch deve receber o tráfego, nem se dois grupos lógicos devem ficar separados.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Delimitação:</strong> transformar fluxo de bits em quadros identificáveis.</li>\n    <li><strong>Endereçamento local:</strong> identificar origem e destino por MAC dentro do enlace.</li>\n    <li><strong>Comutação:</strong> permitir que switches encaminhem tráfego para a porta correta.</li>\n    <li><strong>Segmentação:</strong> separar domínios de broadcast com VLANs.</li>\n    <li><strong>Resolução local:</strong> permitir que IPv4 descubra MAC com ARP.</li>\n    <li><strong>Diagnóstico:</strong> diferenciar falha física, VLAN errada, MAC ausente, loop e problema de gateway.</li>\n  </ul>\n  <p>Sem Camada 2, redes locais seriam uma massa confusa de sinais. Sem entender Camada 2, o profissional tende a culpar IP, firewall ou aplicação quando o defeito pode estar em VLAN, porta, trunk, tabela MAC ou ARP.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A Camada 2 evoluiu de redes compartilhadas para redes comutadas, segmentadas e protegidas.</p>\n  <table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Como funcionava</th><th>Limitação</th><th>Evolução</th></tr></thead><tbody>\n    <tr><td>Meio compartilhado</td><td>Vários hosts disputavam o mesmo domínio físico.</td><td>Colisões, baixa escala e baixa previsibilidade.</td><td>Switches e enlaces dedicados.</td></tr>\n    <tr><td>Hub</td><td>Replicava sinais para todas as portas.</td><td>Não aprendia MAC e expunha todo tráfego local.</td><td>Switch com tabela MAC.</td></tr>\n    <tr><td>Switch básico</td><td>Aprendia MAC por porta e encaminhava quadros.</td><td>Rede plana e broadcast amplo.</td><td>VLANs e trunks.</td></tr>\n    <tr><td>VLAN</td><td>Separava redes lógicas no mesmo switch.</td><td>Exige planejamento, trunks e gateway por VLAN.</td><td>Segmentação, ACLs, firewalls e NAC.</td></tr>\n    <tr><td>Segurança moderna</td><td>Port security, 802.1X, inspeção ARP, logs e monitoramento.</td><td>Mais complexidade operacional.</td><td>Zero Trust, NAC, microsegmentação e SDN.</td></tr>\n  </tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>A Camada 2 do Modelo OSI, ou Enlace de Dados, é responsável por entregar quadros entre dispositivos conectados ao mesmo enlace ou domínio local. Em Ethernet, ela usa frames, endereços MAC, switches, controle de erro local e VLANs.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> Camada 2 é a camada que organiza bits em quadros e permite a comunicação local entre interfaces de rede, usando endereços de enlace, como MAC, e mecanismos como switching, VLANs e ARP em redes IPv4/Ethernet.</div>\n  <p>Ela não substitui a Camada 3. Um switch de Camada 2 entrega quadros dentro de uma rede local ou VLAN. Para sair da rede local, o tráfego precisa de um gateway roteando na Camada 3.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Em uma LAN Ethernet simples, o funcionamento interno pode ser entendido em etapas.</p>\n  <ol class=\"flow-list\">\n    <li>O host decide enviar dados para outro IP.</li>\n    <li>Ele verifica se o destino está na mesma rede IP ou se deve enviar ao gateway.</li>\n    <li>Se precisa entregar localmente, procura o MAC correspondente na tabela ARP.</li>\n    <li>Se não conhece o MAC, envia um ARP Request em broadcast dentro da VLAN.</li>\n    <li>O destino, ou o gateway, responde com ARP Reply informando seu MAC.</li>\n    <li>O host monta um frame Ethernet com MAC de origem, MAC de destino, EtherType, payload e FCS.</li>\n    <li>O switch recebe o frame, aprende o MAC de origem pela porta de entrada e consulta sua tabela MAC.</li>\n    <li>Se conhece o destino, encaminha pela porta correta; se não conhece, faz flooding dentro da VLAN.</li>\n    <li>O destino recebe o quadro, valida a entrega local e passa o payload para a camada superior.</li>\n  </ol>\n  <p>Essa dinâmica explica por que problemas de ARP, VLAN, trunk, tabela MAC e loops podem derrubar uma rede mesmo quando IP, DNS e aplicação parecem corretos no papel.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Na arquitetura corporativa, a Camada 2 aparece nos switches de acesso, links trunk, VLANs de usuários, VLANs de servidores, VLANs de voz, VLANs de visitantes, uplinks para distribuição, interfaces virtuais, bridges, redes de virtualização e domínios de broadcast.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Host:</strong> possui uma NIC com endereço MAC.</li>\n    <li><strong>Switch de acesso:</strong> conecta dispositivos finais e aprende MACs por porta.</li>\n    <li><strong>VLAN:</strong> separa domínios lógicos de Camada 2.</li>\n    <li><strong>Trunk:</strong> transporta múltiplas VLANs entre switches ou até hipervisores.</li>\n    <li><strong>Gateway:</strong> faz a transição para Camada 3 quando o destino está fora da VLAN.</li>\n    <li><strong>Segurança:</strong> port security, NAC, 802.1X, DHCP snooping, Dynamic ARP Inspection e monitoramento.</li>\n  </ul>\n  <p>Em cloud, a Camada 2 física costuma ser abstraída. Você trabalha com subnets, route tables e security groups, mas tecnologias internas de virtualização ainda precisam resolver entrega local, encapsulamento e isolamento entre tenants.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Imagine um prédio corporativo. A Camada 1 é o corredor físico por onde as pessoas andam. A Camada 2 é o sistema de salas, crachás locais e recepção interna: ela sabe entregar uma correspondência para a mesa correta dentro daquele prédio. O MAC é como uma identificação local da mesa. A VLAN é como separar andares ou áreas internas: financeiro, visitantes, TI e diretoria podem usar a mesma estrutura predial, mas não pertencem ao mesmo espaço lógico.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não funcionam com pessoas tomando decisões conscientes. Switches seguem tabelas, estados, temporizadores e regras. Além disso, uma VLAN não é segurança completa por si só; ela precisa ser combinada com roteamento, firewall, autenticação e monitoramento.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, seu notebook se conecta ao roteador Wi-Fi. Quando você acessa o gateway local, o notebook precisa entregar o tráfego ao MAC da interface do roteador. Se ele não souber esse MAC, usa ARP. O AP ou switch encaminha quadros localmente. Se houver um cabo ruim, sinal Wi-Fi instável ou conflito de ARP, o problema pode parecer internet lenta, mas a causa está na entrega local.</p>\n  <p>Outro exemplo: uma Smart TV conectada por cabo aparece no roteador com um endereço MAC. O roteador usa esse MAC para identificar a interface local, aplicar algumas políticas simples e entregar quadros na rede doméstica.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, usuários podem estar na VLAN 10, impressoras na VLAN 20, servidores na VLAN 30 e visitantes na VLAN 40. Um switch de acesso conecta tudo fisicamente, mas separa logicamente os domínios. Se uma porta de usuário for configurada por engano na VLAN de servidores, o risco é operacional e de segurança.</p>\n  <p>Um incidente comum é o usuário mudar de mesa e o ponto de rede estar em VLAN errada. O notebook recebe IP inesperado, não acessa sistemas internos ou cai em rede de visitantes. O diagnóstico correto exige olhar porta do switch, VLAN atribuída, tabela MAC, DHCP e gateway.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud pública, o aluno raramente administra switches de Camada 2 diretamente. AWS, Azure e Google Cloud abstraem a rede física. Mesmo assim, o conceito continua importante para entender isolamento, rede virtual, subnets, interfaces virtuais, MACs virtuais, overlay networking, load balancers internos e appliances virtuais.</p>\n  <p>Em ambientes híbridos, a Camada 2 aparece novamente quando existe extensão de rede, virtualização on-premises, VMware, Hyper-V, bridges, VLANs em links dedicados, ExpressRoute, Direct Connect, VPNs e appliances de segurança conectando datacenter e cloud.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, Camada 2 aparece em runners self-hosted, clusters Kubernetes locais, bridges Docker, redes de containers, CNI, laboratórios com VMs, VLANs para ambientes de build, segmentação de registries internos e isolamento de ambientes de teste.</p>\n  <p>Um pipeline pode falhar ao baixar uma imagem de container não porque o registry caiu, mas porque o runner está em VLAN sem rota, sem gateway correto ou sem permissão de firewall após uma mudança de switch. A investigação começa com evidências: interface, IP, gateway, ARP, caminho e política.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>A Camada 2 possui riscos específicos. ARP não possui autenticação nativa no IPv4. Switches podem sofrer loops. Portas físicas podem ser usadas por dispositivos não autorizados. VLANs mal planejadas podem expor sistemas. Uma rede plana facilita movimento lateral.</p>\n  <table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n    <tr><td>ARP spoofing</td><td>Associação falsa entre IP e MAC</td><td>Interceptação ou indisponibilidade local</td><td>Dynamic ARP Inspection, segmentação, criptografia e monitoramento</td></tr>\n    <tr><td>Porta exposta</td><td>Tomada ativa em sala pública</td><td>Acesso não autorizado à LAN</td><td>802.1X, NAC, port security e shutdown de portas não usadas</td></tr>\n    <tr><td>VLAN errada</td><td>Host em segmento indevido</td><td>Acesso indevido ou falha operacional</td><td>Documentação, revisão de mudança e automação</td></tr>\n    <tr><td>Loop de Camada 2</td><td>Broadcast storm e rede indisponível</td><td>Queda ampla da LAN</td><td>STP, BPDU Guard, monitoramento e mudança controlada</td></tr>\n  </tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m02l04-title m02l04-desc\">\n    <title id=\"m02l04-title\">Camada 2: quadro Ethernet, switch, tabela MAC, VLAN e ARP</title>\n    <desc id=\"m02l04-desc\">Diagrama mostrando dois hosts em VLANs, um switch aprendendo endereços MAC, ARP resolvendo IP para MAC e o limite entre domínio de broadcast e roteamento.</desc>\n    <defs>\n      <marker id=\"m02l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"40\" width=\"920\" height=\"420\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"76\" text-anchor=\"middle\" class=\"svg-label\">Domínio de Camada 2: switches, MAC, frames, VLANs e broadcast ARP</text>\n\n    <rect x=\"70\" y=\"140\" width=\"150\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"145\" y=\"174\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n    <text x=\"145\" y=\"198\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.10</text>\n    <text x=\"145\" y=\"216\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC AA:AA</text>\n\n    <rect x=\"390\" y=\"122\" width=\"200\" height=\"120\" rx=\"16\" class=\"svg-node svg-node--switch\" />\n    <text x=\"490\" y=\"156\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"490\" y=\"182\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Aprende MAC por porta</text>\n    <text x=\"490\" y=\"205\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Encaminha frames</text>\n    <text x=\"490\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Separa VLANs</text>\n\n    <rect x=\"760\" y=\"140\" width=\"150\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"835\" y=\"174\" text-anchor=\"middle\" class=\"svg-label\">Host B</text>\n    <text x=\"835\" y=\"198\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.20</text>\n    <text x=\"835\" y=\"216\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC BB:BB</text>\n\n    <line x1=\"220\" y1=\"180\" x2=\"390\" y2=\"180\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n    <line x1=\"590\" y1=\"180\" x2=\"760\" y2=\"180\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n    <text x=\"305\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Frame Ethernet</text>\n    <text x=\"675\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Unicast se MAC conhecida</text>\n\n    <rect x=\"95\" y=\"300\" width=\"250\" height=\"88\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"220\" y=\"329\" text-anchor=\"middle\" class=\"svg-label\">ARP Request</text>\n    <text x=\"220\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quem tem 192.168.10.20?</text>\n    <text x=\"220\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Broadcast dentro da VLAN</text>\n\n    <rect x=\"635\" y=\"300\" width=\"250\" height=\"88\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"760\" y=\"329\" text-anchor=\"middle\" class=\"svg-label\">Tabela MAC</text>\n    <text x=\"760\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">AA:AA → porta 1</text>\n    <text x=\"760\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BB:BB → porta 2</text>\n\n    <path d=\"M220 300 C260 260 350 248 430 238\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n    <path d=\"M590 238 C650 250 710 270 760 300\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n\n    <line x1=\"490\" y1=\"242\" x2=\"490\" y2=\"445\" class=\"svg-boundary\" />\n    <text x=\"515\" y=\"425\" class=\"svg-label svg-label--small\">Limite lógico: VLAN / domínio de broadcast</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula cria uma análise defensiva de Camada 2. Você vai identificar MAC local, gateway, tabela ARP, hipótese de VLAN e evidências de switch sem executar ataques nem alterar a rede.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam a diferença entre frame, MAC, IP, ARP, VLAN, gateway e switch.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você receberá um cenário em que uma estação está conectada fisicamente, mas não acessa o gateway. A tarefa será propor hipóteses ordenadas de Camada 2 e evidências para confirmar cada uma.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostrará como sair de sintomas vagos para evidências: link, VLAN, MAC aprendido, ARP, gateway e domínio de broadcast.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> Camada 2 entrega frames dentro do domínio local.</li>\n    <li><strong>O que lembrar:</strong> MAC é endereço local; IP é endereço lógico de Camada 3.</li>\n    <li><strong>Erro comum:</strong> confundir VLAN com firewall ou achar que switch sempre roteia.</li>\n    <li><strong>Uso real:</strong> troubleshooting de VLAN, ARP, switch, MAC table, trunk e loops.</li>\n    <li><strong>Segurança:</strong> proteger portas, segmentar, monitorar ARP e evitar rede plana.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você estudará a Camada 3 — Rede: IP, roteamento, gateway e TTL. Depois de entender como a entrega local funciona por frames e MAC, veremos como o tráfego sai de uma rede local e atravessa outras redes.</p>\n</section>"
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
      "STP",
      "LLDP",
      "CDP"
    ],
    "dependsOn": [
      "Camada 1",
      "bits",
      "sinais",
      "frames",
      "encapsulamento",
      "dispositivos de rede"
    ],
    "enables": [
      "IPv4",
      "gateway padrão",
      "switching",
      "VLAN",
      "ARP",
      "segurança de LAN",
      "troubleshooting local"
    ]
  },
  "protocolFields": [
    {
      "field": "Destination MAC",
      "size": "48 bits",
      "purpose": "Indicar o destinatário local do frame Ethernet.",
      "securityObservation": "Pode ser alvo de confusão em ataques de spoofing ou flooding; deve ser monitorado em redes críticas."
    },
    {
      "field": "Source MAC",
      "size": "48 bits",
      "purpose": "Indicar a interface de origem do frame.",
      "securityObservation": "Switches aprendem tabela MAC a partir desse campo; falsificação pode afetar visibilidade e segurança."
    },
    {
      "field": "EtherType",
      "size": "16 bits",
      "purpose": "Indicar qual protocolo de camada superior está no payload, como IPv4 ou ARP.",
      "securityObservation": "Ajuda análise de tráfego e filtros defensivos."
    },
    {
      "field": "FCS",
      "size": "32 bits",
      "purpose": "Detectar erro no quadro Ethernet.",
      "securityObservation": "Erros recorrentes indicam problema físico ou de enlace, não necessariamente ataque."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host A",
      "action": "Verifica se o IP de destino é local.",
      "detail": "Se for local, precisa do MAC do destino; se for remoto, precisa do MAC do gateway.",
      "possibleFailure": "Máscara errada faz o host tentar ARP para destino que deveria ir ao gateway."
    },
    {
      "step": 2,
      "actor": "Host A",
      "action": "Consulta tabela ARP.",
      "detail": "Procura IP→MAC já conhecido.",
      "possibleFailure": "Entrada ARP ausente, stale ou falsa pode causar falha ou risco."
    },
    {
      "step": 3,
      "actor": "Switch",
      "action": "Recebe o frame e aprende MAC de origem.",
      "detail": "Associa MAC de origem à porta de entrada.",
      "possibleFailure": "Loop ou MAC flapping indica instabilidade ou topologia incorreta."
    },
    {
      "step": 4,
      "actor": "Switch",
      "action": "Encaminha ou faz flooding.",
      "detail": "Se conhece o MAC de destino, envia na porta correta; se não, replica dentro da VLAN.",
      "possibleFailure": "VLAN errada impede o destino de receber broadcast ou unicast."
    }
  ],
  "deepDive": {
    "mentalModel": "Camada 2 é o sistema de entrega local: ela não decide rotas globais, mas permite que interfaces na mesma rede lógica entreguem frames usando MAC, switches e VLANs.",
    "keyTerms": [
      "frame",
      "MAC",
      "switch",
      "VLAN",
      "ARP",
      "broadcast",
      "flooding",
      "trunk",
      "access port",
      "tabela MAC",
      "domínio de broadcast"
    ],
    "limitations": [
      "Camada 2 não roteia entre redes IP diferentes, salvo equipamentos multicamada.",
      "VLAN separa domínio de broadcast, mas não substitui firewall nem política de acesso.",
      "ARP funciona apenas no contexto IPv4 local; IPv6 usa Neighbor Discovery.",
      "Em cloud pública, parte da Camada 2 é abstraída e não exposta diretamente ao cliente."
    ],
    "whenToUse": [
      "Diagnosticar VLAN errada, ARP ausente, MAC não aprendido, loops e problemas locais.",
      "Planejar segmentação de usuários, servidores, voz, visitantes e gerenciamento.",
      "Investigar falhas entre host e gateway.",
      "Desenhar laboratório com switches, APs e VLANs."
    ],
    "whenNotToUse": [
      "Para explicar falhas puramente de DNS, HTTP ou autenticação sem evidências locais.",
      "Como substituto de controles de Camada 3/4/7.",
      "Para executar testes ofensivos de ARP em redes reais sem autorização."
    ],
    "operationalImpact": [
      "Exige documentação de portas, VLANs, trunks e uplinks.",
      "Aumenta a necessidade de controle de mudanças em switches.",
      "Melhora troubleshooting quando tabelas MAC, ARP e VLANs são coletadas corretamente.",
      "Erros de Camada 2 podem gerar incidentes amplos, como broadcast storm."
    ],
    "financialImpact": [
      "Switches gerenciáveis, NAC, controladoras Wi-Fi e ferramentas de monitoramento têm custo.",
      "Segmentação reduz risco, mas aumenta operação e documentação.",
      "Loops e falhas de VLAN podem causar indisponibilidade cara.",
      "Em datacenters, redes leaf-spine e transceptores aumentam investimento."
    ],
    "securityImpact": [
      "Rede plana facilita movimento lateral.",
      "ARP sem autenticação nativa pode ser abusado.",
      "Portas ativas sem controle expõem a LAN.",
      "VLANs mal configuradas podem permitir acesso indevido."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que VLAN é firewall.",
      "whyItHappens": "VLAN separa redes e parece bloquear tráfego por si só.",
      "consequence": "Acesso indevido pode ocorrer quando há roteamento permissivo entre VLANs.",
      "correction": "Usar VLAN para segmentação de broadcast e firewall/ACL para política de acesso."
    },
    {
      "mistake": "Confundir MAC com IP.",
      "whyItHappens": "Ambos identificam algo na rede.",
      "consequence": "Diagnóstico mistura entrega local com roteamento.",
      "correction": "MAC é usado na entrega local do frame; IP é usado para endereçamento lógico e roteamento."
    },
    {
      "mistake": "Ignorar ARP quando o host não alcança o gateway.",
      "whyItHappens": "Profissionais iniciantes pulam direto para DNS ou internet.",
      "consequence": "Problemas locais de VLAN, gateway ou ARP passam despercebidos.",
      "correction": "Verificar IP, máscara, gateway, ARP e porta/VLAN antes de culpar DNS."
    },
    {
      "mistake": "Deixar portas não usadas ativas.",
      "whyItHappens": "Facilita manutenção rápida.",
      "consequence": "Aumenta risco de conexão não autorizada.",
      "correction": "Desativar portas sem uso e aplicar 802.1X/NAC/port security quando viável."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host não pinga o gateway",
      "Host recebe IP de VLAN errada",
      "MAC aparece em porta inesperada",
      "ARP incompleto ou ausente",
      "Broadcast excessivo",
      "Loop de rede",
      "Conectividade funciona em uma tomada e falha em outra"
    ],
    "diagnosticQuestions": [
      "A interface física está up?",
      "A porta está na VLAN correta?",
      "O switch aprendeu o MAC do host?",
      "O host possui entrada ARP para o gateway?",
      "O gateway está na mesma VLAN/sub-rede?",
      "Há flapping de MAC ou loop?",
      "A porta é access ou trunk?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && arp -a",
        "purpose": "Ver IP, máscara, gateway, DNS, MAC e tabela ARP.",
        "expectedObservation": "Gateway configurado e entrada ARP correspondente após tentativa de ping.",
        "interpretation": "Gateway sem ARP pode indicar falha local, VLAN errada ou gateway inacessível."
      },
      {
        "platform": "Windows",
        "command": "Get-NetAdapter | Format-Table Name, Status, MacAddress, LinkSpeed",
        "purpose": "Ver estado, MAC e velocidade da interface.",
        "expectedObservation": "Interface em Up com MAC e velocidade coerentes.",
        "interpretation": "Interface down ou velocidade estranha aponta para Camada 1/2."
      },
      {
        "platform": "Linux",
        "command": "ip link && ip addr && ip neigh",
        "purpose": "Ver interfaces, endereços e vizinhos ARP/neighbor.",
        "expectedObservation": "Interface UP e entrada REACHABLE/STALE para gateway após tráfego.",
        "interpretation": "Entrada FAILED sugere problema de entrega local."
      },
      {
        "platform": "Linux",
        "command": "bridge link 2>/dev/null || true",
        "purpose": "Ver bridges locais em hosts com virtualização ou containers.",
        "expectedObservation": "Interfaces bridge quando Docker/VMs usam rede local.",
        "interpretation": "Ajuda a separar rede física de bridge virtual."
      },
      {
        "platform": "Cisco IOS",
        "command": "show mac address-table dynamic",
        "purpose": "Ver MACs aprendidos por VLAN e porta.",
        "expectedObservation": "MAC do host aparece na VLAN e porta esperadas.",
        "interpretation": "MAC ausente ou em VLAN/porta errada orienta investigação."
      },
      {
        "platform": "Cisco IOS",
        "command": "show vlan brief && show interfaces trunk",
        "purpose": "Ver VLANs de acesso e trunks.",
        "expectedObservation": "Porta do usuário na VLAN correta e trunks transportando VLANs necessárias.",
        "interpretation": "VLAN ausente no trunk ou porta errada causa falha local."
      },
      {
        "platform": "Cisco IOS",
        "command": "show spanning-tree summary",
        "purpose": "Ver estado geral de STP e proteção contra loops.",
        "expectedObservation": "STP ativo e sem mudanças anormais constantes.",
        "interpretation": "Mudanças frequentes podem indicar loop ou instabilidade."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não pinga gateway e não há entrada ARP para o gateway",
        "then": "Verificar VLAN, porta do switch, gateway ativo, máscara e conectividade física."
      },
      {
        "if": "MAC do host aparece em porta diferente da documentada",
        "then": "Investigar patch panel, mudança física, loop, VM bridge ou documentação desatualizada."
      },
      {
        "if": "Broadcast excessivo ou rede inteira lenta",
        "then": "Investigar loop de Camada 2, storm control, STP e equipamento recém-conectado."
      },
      {
        "if": "Host recebe IP de rede inesperada",
        "then": "Verificar VLAN da porta, escopo DHCP e trunk até o servidor DHCP ou relay."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Segmentar redes por VLAN conforme função e risco.",
      "Aplicar firewall/ACL entre VLANs quando houver roteamento.",
      "Desativar portas não utilizadas.",
      "Usar 802.1X, NAC ou port security quando aplicável.",
      "Monitorar ARP, MAC flapping, loops, STP e alterações de VLAN.",
      "Documentar portas, trunks, VLANs e exceções."
    ],
    "badPractices": [
      "Manter rede plana para usuários, servidores, visitantes e impressoras.",
      "Confiar em VLAN como único controle de segurança.",
      "Permitir qualquer dispositivo em qualquer tomada ativa.",
      "Não monitorar switches de acesso.",
      "Executar testes de ARP spoofing em rede real sem autorização."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Achar que NAT ou VLAN substitui firewall.",
      "Ignorar logs e tabelas do switch.",
      "Deixar trunks permitindo todas as VLANs sem necessidade."
    ],
    "vulnerabilities": [
      {
        "name": "ARP spoofing",
        "description": "Um dispositivo anuncia associação IP-MAC falsa dentro da LAN.",
        "defensiveExplanation": "O risco é interceptação, redirecionamento ou negação de serviço local. A análise deve focar detecção e mitigação, não execução ofensiva.",
        "mitigation": "Dynamic ARP Inspection, DHCP snooping, segmentação, criptografia fim a fim, NAC e monitoramento."
      },
      {
        "name": "Rede plana",
        "description": "Usuários, servidores, impressoras e visitantes compartilham o mesmo domínio lógico.",
        "defensiveExplanation": "Um comprometimento em um host pode alcançar muitos alvos lateralmente.",
        "mitigation": "VLANs por função, firewalls internos, menor privilégio e telemetria."
      },
      {
        "name": "Porta física exposta",
        "description": "Tomadas ativas permitem conexão de dispositivos não autorizados.",
        "defensiveExplanation": "Acesso físico pode virar acesso lógico se não houver controle.",
        "mitigation": "802.1X, NAC, port security, shutdown de portas e controle físico."
      },
      {
        "name": "Loop de Camada 2",
        "description": "Conexão indevida cria tempestade de broadcast.",
        "defensiveExplanation": "Pode causar indisponibilidade ampla sem envolver IP ou aplicação.",
        "mitigation": "STP, BPDU Guard, storm control e mudanças controladas."
      }
    ],
    "monitoring": [
      "MAC flapping",
      "Mudanças frequentes de STP",
      "Broadcast anormal",
      "ARP suspeito",
      "Portas subindo fora de janela",
      "Dispositivos novos em VLAN sensível"
    ],
    "hardening": [
      "Desativar portas sem uso",
      "Limitar VLANs em trunks",
      "Usar VLAN nativa não utilizada",
      "Aplicar BPDU Guard em portas de acesso",
      "Habilitar DHCP snooping e Dynamic ARP Inspection quando suportado",
      "Controlar acesso físico a racks"
    ],
    "detectionIdeas": [
      "Comparar tabela ARP dos hosts com inventário esperado",
      "Alertar MAC novo em VLAN crítica",
      "Monitorar eventos de port-security",
      "Investigar gateway MAC alterando sem mudança planejada",
      "Correlacionar DHCP, switch e EDR"
    ]
  },
  "lab": {
    "id": "lab-2.4",
    "title": "Diagnóstico defensivo de Camada 2: MAC, ARP, switch e VLAN",
    "labType": "security",
    "objective": "Coletar e interpretar evidências básicas de Camada 2 sem executar ações ofensivas ou alterar a rede.",
    "scenario": "Você precisa investigar se um host está corretamente conectado à LAN e se consegue resolver o MAC do gateway local.",
    "topology": "Host do aluno -> switch/AP -> gateway local -> demais redes",
    "architecture": "Rede local com host, interface de acesso, domínio de broadcast, gateway e, quando disponível, switch gerenciável.",
    "prerequisites": [
      "Ter concluído as aulas 2.1, 2.2 e 2.3.",
      "Ter permissão para executar comandos locais no próprio computador.",
      "Acesso ao switch é opcional e deve ocorrer apenas em laboratório autorizado."
    ],
    "tools": [
      "Windows PowerShell ou Prompt",
      "Terminal Linux",
      "Opcional: Cisco Packet Tracer ou switch de laboratório",
      "Opcional: Wireshark em ambiente autorizado"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Não execute ARP spoofing, flooding, varredura agressiva ou mudança de VLAN em rede real.",
      "Não publique MACs, IPs internos, nomes de host ou prints sem sanitização.",
      "Comandos Cisco devem ser usados apenas em laboratório próprio ou autorizado.",
      "O objetivo é defesa, diagnóstico e documentação."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar interface e MAC local",
        "instruction": "Colete o nome da interface, status, velocidade e MAC do seu host.",
        "command": "Windows: Get-NetAdapter | Format-Table Name, Status, MacAddress, LinkSpeed\nLinux: ip link",
        "expectedOutput": "Interface ativa com MAC e estado UP/Up.",
        "explanation": "O MAC local é o identificador de Camada 2 da interface."
      },
      {
        "number": 2,
        "title": "Identificar IP, máscara e gateway",
        "instruction": "Colete configuração de Camada 3 para saber qual gateway deve ser resolvido por ARP.",
        "command": "Windows: ipconfig /all\nLinux: ip addr && ip route",
        "expectedOutput": "Endereço IP, máscara/prefixo e gateway padrão.",
        "explanation": "Mesmo sendo aula de Camada 2, o ARP depende da decisão de destino local feita a partir do IP e máscara."
      },
      {
        "number": 3,
        "title": "Observar tabela ARP/neighbor",
        "instruction": "Liste a tabela ARP antes e depois de testar alcance ao gateway.",
        "command": "Windows: arp -a\nLinux: ip neigh",
        "expectedOutput": "Entrada associando o IP do gateway a um endereço MAC.",
        "explanation": "A presença do gateway na tabela ARP indica que a entrega local ao gateway foi resolvida."
      },
      {
        "number": 4,
        "title": "Gerar tráfego local simples",
        "instruction": "Faça ping para o gateway e observe se a entrada ARP aparece ou muda.",
        "command": "Windows: ping <IP_DO_GATEWAY> && arp -a\nLinux: ping -c 3 <IP_DO_GATEWAY> && ip neigh",
        "expectedOutput": "Respostas do gateway e entrada ARP correspondente.",
        "explanation": "Se o ping falha e o ARP não resolve, a hipótese local fica mais forte."
      },
      {
        "number": 5,
        "title": "Opcional: verificar switch em laboratório",
        "instruction": "Em um switch de laboratório, confirme se o MAC do host aparece na porta e VLAN esperadas.",
        "command": "Cisco IOS: show mac address-table dynamic\nCisco IOS: show vlan brief\nCisco IOS: show interfaces trunk",
        "expectedOutput": "MAC do host na VLAN/porta esperada; trunk transportando VLAN necessária.",
        "explanation": "A tabela MAC do switch conecta a evidência do host à evidência da infraestrutura."
      },
      {
        "number": 6,
        "title": "Montar matriz de hipóteses",
        "instruction": "Classifique evidências em físico, Camada 2 e Camada 3.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz com sintoma, evidência, hipótese e próximo teste.",
        "explanation": "O objetivo é não pular diretamente para DNS, firewall ou aplicação."
      }
    ],
    "expectedResult": "O aluno deve conseguir explicar se o host possui MAC local, se conhece o gateway por ARP e quais evidências seriam necessárias no switch para confirmar VLAN e porta.",
    "validation": [
      {
        "check": "Interface ativa",
        "command": "Get-NetAdapter ou ip link",
        "expected": "Interface principal Up/UP",
        "ifFails": "Verificar cabo, Wi-Fi, driver, adaptador ou Camada 1."
      },
      {
        "check": "Gateway conhecido",
        "command": "ipconfig /all ou ip route",
        "expected": "Gateway padrão configurado",
        "ifFails": "Verificar DHCP, configuração manual, VPN ou perfil de rede."
      },
      {
        "check": "ARP para gateway",
        "command": "arp -a ou ip neigh",
        "expected": "IP do gateway associado a MAC",
        "ifFails": "Ping no gateway; se continuar falhando, investigar VLAN, porta, gateway e Camada 1."
      },
      {
        "check": "MAC aprendido no switch, se aplicável",
        "command": "show mac address-table dynamic",
        "expected": "MAC na porta e VLAN esperadas",
        "ifFails": "Verificar patch panel, porta, VLAN, trunk e documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Gateway não aparece na tabela ARP",
        "probableCause": "Gateway fora da VLAN, porta em VLAN errada, gateway inativo ou falha física.",
        "howToConfirm": "Verificar VLAN da porta, ping ao gateway e tabela MAC do switch.",
        "fix": "Corrigir VLAN/porta/gateway em janela autorizada ou escalar para rede."
      },
      {
        "symptom": "MAC aparece em porta inesperada",
        "probableCause": "Patch panel/documentação errada, mudança física, loop ou VM bridge.",
        "howToConfirm": "Conferir ponto físico e tabela MAC em switches envolvidos.",
        "fix": "Atualizar documentação e corrigir conexão conforme mudança controlada."
      },
      {
        "symptom": "IP recebido de rede errada",
        "probableCause": "Porta em VLAN errada ou DHCP indevido.",
        "howToConfirm": "Comparar VLAN da porta com escopo DHCP recebido.",
        "fix": "Corrigir VLAN ou escopo DHCP autorizado."
      },
      {
        "symptom": "Rede muito lenta para todos na VLAN",
        "probableCause": "Loop, broadcast storm ou flooding anormal.",
        "howToConfirm": "Ver eventos de STP, broadcast e CPU do switch.",
        "fix": "Isolar porta problemática e aplicar proteções como STP/BPDU Guard/storm control."
      }
    ],
    "improvements": [
      "Repetir o laboratório no Packet Tracer com duas VLANs.",
      "Adicionar captura Wireshark de ARP em ambiente controlado.",
      "Criar inventário de MACs autorizados por VLAN.",
      "Documentar portas de acesso e trunks."
    ],
    "evidenceToCollect": [
      "MAC local sanitizado",
      "IP/máscara/gateway sanitizados",
      "Entrada ARP do gateway",
      "Tabela de hipóteses",
      "Opcional: porta/VLAN do switch em laboratório"
    ],
    "questions": [
      "Por que ARP usa broadcast?",
      "Por que VLAN errada pode impedir acesso ao gateway?",
      "Por que MAC não substitui IP?",
      "Por que VLAN não é firewall?"
    ],
    "challenge": "Em laboratório, um host tem link ativo e IP aparentemente correto, mas não pinga o gateway. Monte uma sequência de diagnóstico de Camada 1, 2 e 3 com evidências.",
    "solution": "Comece verificando interface e link. Depois confirme IP, máscara e gateway. Em seguida, gere tráfego ao gateway e observe ARP. Se ARP falhar, verifique VLAN da porta, tabela MAC do switch e gateway da VLAN. Só depois avance para firewall, DNS ou aplicação."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que a Camada 2 precisa existir se a Camada 3 já tem endereços IP?",
      "hints": [
        "Pense na entrega local dentro da LAN.",
        "Pense no que uma placa Ethernet precisa para montar um frame."
      ],
      "expectedIdeas": [
        "MAC",
        "frame",
        "entrega local",
        "ARP",
        "switch"
      ],
      "explanation": "IP identifica logicamente origem/destino, mas Ethernet entrega quadros usando MAC dentro do enlace local."
    },
    {
      "type": "diagnóstico",
      "question": "Um host não pinga o gateway. Quais evidências de Camada 2 você coletaria antes de culpar DNS?",
      "hints": [
        "DNS nem participa do ping por IP.",
        "Pense em ARP, VLAN e tabela MAC."
      ],
      "expectedIdeas": [
        "arp -a",
        "ip neigh",
        "VLAN da porta",
        "MAC address-table",
        "gateway",
        "link"
      ],
      "explanation": "Se o gateway não é resolvido por ARP, o problema está antes de DNS e possivelmente antes de roteamento."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa mantém usuários, servidores e visitantes na mesma LAN. Qual é o risco e qual seria uma melhoria inicial?",
      "hints": [
        "Pense em movimento lateral.",
        "Pense em domínio de broadcast e política entre segmentos."
      ],
      "expectedIdeas": [
        "rede plana",
        "VLAN",
        "firewall entre VLANs",
        "menor privilégio",
        "monitoramento"
      ],
      "explanation": "Segmentar por função reduz superfície lateral, mas precisa ser acompanhada de política, logs e controle de acesso."
    }
  ],
  "quiz": [
    {
      "id": "q2.4.1",
      "type": "conceito",
      "q": "Qual é a PDU típica da Camada 2 em Ethernet?",
      "opts": [
        "Frame/quadro",
        "Pacote IP",
        "Segmento TCP",
        "Mensagem HTTP"
      ],
      "a": 0,
      "exp": "Na Camada 2, a unidade de dados é o frame ou quadro Ethernet.",
      "difficulty": "iniciante",
      "topic": "PDU"
    },
    {
      "id": "q2.4.2",
      "type": "comparação",
      "q": "Qual afirmação diferencia corretamente MAC e IP?",
      "opts": [
        "MAC é usado para entrega local; IP é usado para endereçamento lógico e roteamento.",
        "MAC substitui IP em redes modernas.",
        "IP só existe dentro do switch.",
        "MAC é sempre público na internet."
      ],
      "a": 0,
      "exp": "MAC atua no enlace local; IP permite endereçamento lógico entre redes.",
      "difficulty": "iniciante",
      "topic": "MAC vs IP"
    },
    {
      "id": "q2.4.3",
      "type": "diagnóstico",
      "q": "Um host não consegue pingar o gateway e não há entrada ARP para ele. Qual hipótese deve ser considerada cedo?",
      "opts": [
        "Problema local de VLAN, porta, gateway ou enlace",
        "Erro de certificado TLS",
        "Falha de JavaScript no navegador",
        "Senha incorreta no SSO"
      ],
      "a": 0,
      "exp": "Sem ARP para o gateway, a investigação deve focar entrega local antes de aplicação ou identidade.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q2.4.4",
      "type": "segurança",
      "q": "Por que VLAN não deve ser tratada como firewall?",
      "opts": [
        "Porque VLAN separa domínio lógico, mas política de acesso exige controle entre segmentos.",
        "Porque VLAN criptografa todo o tráfego automaticamente.",
        "Porque VLAN só funciona em Wi-Fi.",
        "Porque VLAN elimina necessidade de logs."
      ],
      "a": 0,
      "exp": "VLAN ajuda segmentação, mas controle de acesso entre VLANs depende de roteamento, ACLs, firewalls e políticas.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q2.4.5",
      "type": "cenário",
      "q": "Um switch recebe um frame unicast para MAC desconhecido dentro de uma VLAN. O que ele tende a fazer?",
      "opts": [
        "Flooding dentro da VLAN",
        "Enviar para todas as VLANs",
        "Descartar sempre",
        "Roteá-lo para a internet"
      ],
      "a": 0,
      "exp": "Quando o destino é desconhecido, o switch pode replicar dentro do domínio daquela VLAN para tentar alcançar o destino.",
      "difficulty": "intermediário",
      "topic": "switching"
    },
    {
      "id": "q2.4.6",
      "type": "comando",
      "q": "Qual comando Cisco ajuda a ver MACs aprendidos por porta?",
      "opts": [
        "show mac address-table dynamic",
        "show ip route",
        "show version",
        "show clock"
      ],
      "a": 0,
      "exp": "show mac address-table dynamic mostra a tabela MAC dinâmica do switch.",
      "difficulty": "iniciante",
      "topic": "Cisco IOS"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.4.1",
      "front": "O que é um frame Ethernet?",
      "back": "É a unidade de dados da Camada 2 usada para transportar payload localmente com MAC de origem, MAC de destino e campos de controle.",
      "tags": [
        "camada 2",
        "ethernet"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.4.2",
      "front": "Para que serve o endereço MAC?",
      "back": "Para identificar uma interface no contexto de entrega local de Camada 2.",
      "tags": [
        "mac",
        "lan"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.4.3",
      "front": "O que um switch aprende?",
      "back": "Aprende endereços MAC de origem associados às portas por onde os frames entram.",
      "tags": [
        "switch",
        "mac table"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.4.4",
      "front": "O que é uma VLAN?",
      "back": "Uma separação lógica de Camada 2 que cria domínios de broadcast distintos na mesma infraestrutura física.",
      "tags": [
        "vlan",
        "segmentação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.4.5",
      "front": "Para que serve ARP no IPv4?",
      "back": "Para descobrir o MAC correspondente a um IP local ou ao gateway dentro da LAN.",
      "tags": [
        "arp",
        "ipv4"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.4.6",
      "front": "VLAN é firewall?",
      "back": "Não. VLAN segmenta domínio de broadcast; firewall/ACL aplica política de acesso entre segmentos.",
      "tags": [
        "segurança",
        "vlan"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.4.1",
      "type": "conceitual",
      "prompt": "Explique por que um host precisa de ARP para falar com o gateway em IPv4/Ethernet.",
      "expectedAnswer": "Porque o host envia frames Ethernet usando MAC de destino. Mesmo conhecendo o IP do gateway, ele precisa descobrir o MAC local do gateway para montar o frame.",
      "explanation": "ARP conecta o mundo IPv4 ao mundo Ethernet dentro da rede local."
    },
    {
      "id": "ex2.4.2",
      "type": "diagnóstico",
      "prompt": "Um host tem link ativo e IP correto, mas não pinga o gateway. Liste quatro hipóteses de Camada 2.",
      "expectedAnswer": "VLAN errada, gateway fora da VLAN, ARP não resolvendo, MAC não aprendido no switch, loop/broadcast storm ou porta bloqueada por segurança.",
      "explanation": "Essas hipóteses ficam antes de DNS e aplicação."
    },
    {
      "id": "ex2.4.3",
      "type": "arquitetura",
      "prompt": "Projete uma separação inicial de VLANs para usuários, servidores, visitantes e gerenciamento.",
      "expectedAnswer": "Criar VLANs distintas por função, roteamento controlado por firewall/ACL, visitantes sem acesso interno e gerenciamento restrito a administradores.",
      "explanation": "Segmentação reduz broadcast e movimento lateral, mas precisa de política entre VLANs."
    },
    {
      "id": "ex2.4.4",
      "type": "segurança",
      "prompt": "Explique por que portas não usadas devem ficar desativadas em ambiente corporativo.",
      "expectedAnswer": "Porque portas ativas permitem conexão física não autorizada e podem dar acesso à LAN se não houver 802.1X/NAC ou controle equivalente.",
      "explanation": "Segurança de Camada 2 começa no acesso físico e lógico à porta."
    }
  ],
  "challenge": {
    "title": "Diagnóstico de host sem acesso ao gateway",
    "scenario": "Após uma mudança de mesa, um usuário recebe IP, mas não consegue acessar sistemas internos nem pingar o gateway. Outros usuários da mesma área funcionam.",
    "tasks": [
      "Listar hipóteses por Camada 1, Camada 2 e Camada 3.",
      "Indicar comandos no host.",
      "Indicar comandos no switch, se houver laboratório autorizado.",
      "Explicar como validar VLAN, ARP e tabela MAC.",
      "Propor mitigação e documentação pós-incidente."
    ],
    "constraints": [
      "Não alterar produção sem autorização.",
      "Não executar ataque ARP ou varredura agressiva.",
      "Sanitizar evidências.",
      "Priorizar testes reversíveis e de baixo risco."
    ],
    "expectedDeliverables": [
      "Matriz de hipóteses",
      "Comandos e evidências esperadas",
      "Diagrama simples do caminho local",
      "Plano de correção",
      "Checklist de prevenção"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta por camadas",
        "points": 25,
        "description": "Diferencia físico, Camada 2 e Camada 3."
      },
      {
        "criterion": "Uso correto de evidências",
        "points": 25,
        "description": "Usa ARP, MAC table, VLAN e IP sem conclusões precipitadas."
      },
      {
        "criterion": "Segurança e ética",
        "points": 20,
        "description": "Evita ações ofensivas e sanitiza dados."
      },
      {
        "criterion": "Mitigação operacional",
        "points": 20,
        "description": "Propõe correção e documentação."
      },
      {
        "criterion": "Clareza",
        "points": 10,
        "description": "Entrega relatório compreensível."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O caso começa com uma pista importante: a mudança de mesa. Isso aumenta a probabilidade de porta, patch panel ou VLAN errada. Como o usuário recebe IP, ainda precisamos verificar se esse IP pertence à rede esperada e se o gateway é alcançável por ARP.",
    "steps": [
      "Verificar estado físico da interface.",
      "Coletar IP, máscara, gateway e MAC local.",
      "Tentar ping no gateway e observar ARP.",
      "Se ARP falhar, verificar VLAN da porta e tabela MAC no switch autorizado.",
      "Comparar a porta atual com documentação do ponto de rede.",
      "Corrigir VLAN/patch/documentação em mudança autorizada.",
      "Registrar evidências sanitizadas e prevenção."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Reinstalar navegador ou trocar DNS primeiro.",
        "whyItIsWrong": "O sintoma é falha no gateway; DNS e navegador vêm depois."
      },
      {
        "answer": "Liberar qualquer-any no firewall.",
        "whyItIsWrong": "Firewall entre redes não resolve host que nem alcança gateway local."
      },
      {
        "answer": "Dizer que VLAN é segurança suficiente.",
        "whyItIsWrong": "VLAN segmenta, mas controle de acesso exige políticas entre segmentos."
      }
    ],
    "finalAnswer": "A hipótese principal é erro local após mudança física: porta em VLAN incorreta, patch errado ou MAC não aprendido no switch esperado. A validação passa por interface, IP/máscara/gateway, ARP para gateway, tabela MAC e VLAN da porta. A correção deve ser controlada, documentada e acompanhada de prevenção."
  },
  "glossary": [
    {
      "term": "Frame",
      "shortDefinition": "PDU da Camada 2.",
      "longDefinition": "Unidade de dados usada por Ethernet para transportar payload localmente com campos como MAC de origem, MAC de destino, EtherType e FCS.",
      "example": "Um pacote IPv4 pode ser carregado dentro de um frame Ethernet.",
      "relatedTerms": [
        "Ethernet",
        "MAC",
        "FCS"
      ],
      "relatedLessons": [
        "2.2",
        "2.4",
        "3.1"
      ]
    },
    {
      "term": "Endereço MAC",
      "shortDefinition": "Identificador de Camada 2 de uma interface.",
      "longDefinition": "Endereço usado na entrega local de frames em redes como Ethernet e Wi-Fi.",
      "example": "AA:BB:CC:DD:EE:FF é um formato comum de representação de MAC.",
      "relatedTerms": [
        "NIC",
        "switch",
        "ARP"
      ],
      "relatedLessons": [
        "1.7",
        "2.4",
        "3.2"
      ]
    },
    {
      "term": "Switch",
      "shortDefinition": "Equipamento que encaminha frames com base em MAC.",
      "longDefinition": "Dispositivo de rede que aprende endereços MAC por porta e encaminha quadros dentro de uma LAN/VLAN.",
      "example": "Um switch envia tráfego unicast apenas pela porta onde aprendeu o MAC de destino.",
      "relatedTerms": [
        "tabela MAC",
        "VLAN",
        "frame"
      ],
      "relatedLessons": [
        "1.7",
        "2.4",
        "3.5"
      ]
    },
    {
      "term": "VLAN",
      "shortDefinition": "Rede lógica de Camada 2.",
      "longDefinition": "Mecanismo que separa domínios de broadcast dentro da mesma infraestrutura física de switches.",
      "example": "Usuários podem ficar na VLAN 10 e visitantes na VLAN 40.",
      "relatedTerms": [
        "802.1Q",
        "trunk",
        "segmentação"
      ],
      "relatedLessons": [
        "2.4",
        "3.8"
      ]
    },
    {
      "term": "ARP",
      "shortDefinition": "Protocolo que resolve IPv4 para MAC local.",
      "longDefinition": "Address Resolution Protocol permite que um host descubra o endereço MAC associado a um IP dentro da mesma rede local.",
      "example": "Antes de falar com o gateway 192.168.1.1, o host descobre o MAC dele via ARP.",
      "relatedTerms": [
        "IPv4",
        "MAC",
        "gateway"
      ],
      "relatedLessons": [
        "2.4",
        "3.9",
        "4.1"
      ]
    },
    {
      "term": "Domínio de broadcast",
      "shortDefinition": "Área onde broadcasts de Camada 2 são propagados.",
      "longDefinition": "Conjunto de interfaces que recebem tráfego broadcast dentro da mesma rede lógica de Camada 2.",
      "example": "Cada VLAN costuma representar um domínio de broadcast separado.",
      "relatedTerms": [
        "broadcast",
        "VLAN",
        "LAN"
      ],
      "relatedLessons": [
        "2.4",
        "3.8"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_3-2022.html",
      "note": "Referência para Ethernet."
    },
    {
      "type": "standard",
      "title": "IEEE 802.1Q VLANs",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_1Q-2022.html",
      "note": "Referência para VLAN tagging e bridging."
    },
    {
      "type": "rfc",
      "title": "RFC 826 — An Ethernet Address Resolution Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc826",
      "note": "Referência histórica e técnica sobre ARP."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Encapsulamento, desencapsulamento e PDUs."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e redes de plataforma",
      "lesson": "NetworkPolicy e CNI",
      "reason": "Isolamento de rede em clusters depende de conceitos de enlace, overlays, bridges e segmentação."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso condicional e Zero Trust",
      "lesson": "Controle de acesso por dispositivo e rede",
      "reason": "NAC, postura de dispositivo e segmentação de rede se conectam com decisões de identidade e acesso."
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
      "2.5"
    ]
  }
};
