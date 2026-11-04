export const lesson0204 = {
  "id": "2.4",
  "moduleId": "m02",
  "order": 4,
  "title": "Camada 2 — Enlace: frames, MAC, switch, VLAN e ARP",
  "subtitle": "Como bits viram quadros e são entregues dentro da LAN por MAC, switches, VLANs e ARP.",
  "duration": "110-155 min",
  "estimatedStudyTimeMinutes": 155,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Antes de qualquer pacote IP, TCP ou HTTP chegar ao destino, um dispositivo precisa entregar um quadro a outro dentro da mesma rede local. Essa entrega é trabalho da Camada 2 (Enlace de Dados): ela organiza em quadros (frames) os bits que vêm da Camada 1, endereça cada quadro por MAC, comuta pelos switches, separa grupos por VLAN e, em IPv4 sobre Ethernet, usa ARP para descobrir qual MAC corresponde a um IP da LAN.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma estação recebe IP correto por DHCP, mas não consegue falar com o gateway. O DNS não é o problema, a rota padrão existe e o cabo está conectado. A equipe descobre que a porta do switch está na VLAN errada. O problema estava na Camada 2.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>A Camada 1 transmite bits, mas não sabe onde começa e termina um quadro, quem é o destinatário local, por qual porta do switch o tráfego deve sair nem se dois grupos de dispositivos devem ficar separados. A Camada 2 resolve a entrega local:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Delimitação:</strong> transformar o fluxo de bits em quadros identificáveis.</li>\n    <li><strong>Endereçamento local:</strong> identificar origem e destino por MAC dentro do enlace.</li>\n    <li><strong>Comutação:</strong> permitir que switches encaminhem o tráfego para a porta correta.</li>\n    <li><strong>Segmentação:</strong> separar domínios de broadcast com VLANs.</li>\n    <li><strong>Resolução local:</strong> permitir que o IPv4 descubra o MAC com ARP.</li>\n    <li><strong>Diagnóstico:</strong> diferenciar falha física, VLAN errada, MAC ausente, loop e problema de gateway.</li>\n  </ul>\n  <p>As primeiras redes Ethernet usavam um meio compartilhado, com colisões e pouca escala. O hub repetia o sinal em todas as portas sem aprender MAC, expondo todo o tráfego local. O switch resolveu isso aprendendo em que porta está cada MAC e enviando o quadro só para ela. Com redes maiores (voz, servidores, visitantes), vieram as VLANs: várias redes lógicas sobre os mesmos switches.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> a Camada 2 organiza bits em quadros e entrega esses quadros entre interfaces do mesmo enlace ou domínio local, usando endereços de enlace (MAC) e mecanismos como switching, VLANs e, em redes IPv4/Ethernet, ARP.</div>\n  <p>O <strong>endereço MAC</strong> tem 48 bits e é escrito como 6 bytes em hexadecimal, por exemplo <code>AA:BB:CC:DD:EE:FF</code>. Ele identifica a interface (NIC) no enlace. <code>FF:FF:FF:FF:FF:FF</code> é o broadcast: o quadro chega a todas as interfaces do domínio de broadcast, que, numa rede com VLANs, é a própria VLAN.</p>\n  <p>A Camada 2 não substitui a Camada 3: um switch de Camada 2 entrega quadros dentro da LAN ou VLAN e não roteia entre redes IP (só equipamentos multicamada fazem as duas coisas). Para sair da rede local, o tráfego precisa de um gateway. O ARP também é local e próprio do IPv4; no IPv6, essa função é do Neighbor Discovery.</p>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Confundir MAC com IP:</strong> o MAC serve à entrega local do quadro; o IP, ao endereçamento lógico e ao roteamento. Misturar os dois confunde entrega local com roteamento no diagnóstico.</li>\n      <li><strong>Achar que VLAN é firewall:</strong> a VLAN separa domínios de broadcast, mas, com roteamento permissivo entre VLANs, o acesso indevido acontece. Política entre VLANs é papel de firewall ou ACL.</li>\n      <li><strong>Ignorar ARP quando o host não alcança o gateway:</strong> verifique IP, máscara, gateway, ARP e porta/VLAN antes de culpar o DNS.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <h3>Campos principais do frame Ethernet</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>Tamanho</th><th>Para que serve</th><th>O que observar</th></tr></thead><tbody>\n    <tr><td>MAC de destino</td><td>48 bits</td><td>Indica o destinatário local do frame.</td><td>Alvo de spoofing e flooding; monitore em redes críticas.</td></tr>\n    <tr><td>MAC de origem</td><td>48 bits</td><td>Indica a interface que enviou o frame.</td><td>O switch aprende a tabela MAC por ele; falsificá-lo afeta visibilidade e segurança.</td></tr>\n    <tr><td>EtherType</td><td>16 bits</td><td>Indica o protocolo que está no payload, como IPv4 ou ARP.</td><td>Ajuda a análise de tráfego e os filtros defensivos.</td></tr>\n    <tr><td>Payload</td><td>variável</td><td>Carrega a PDU de cima (ex.: o pacote IPv4).</td><td>—</td></tr>\n    <tr><td>FCS</td><td>32 bits</td><td>Detecta erro no quadro; o receptor descarta o frame com FCS inválido.</td><td>Erros recorrentes indicam problema físico ou de enlace, não necessariamente ataque.</td></tr>\n  </tbody></table></div>\n  <h3>Do IP ao frame entregue</h3>\n  <ol class=\"flow-list\">\n    <li>O host compara o IP de destino com o seu IP e máscara: o destino é local ou remoto?</li>\n    <li>Se for local, precisa do MAC do destino; se for remoto, do MAC do gateway. Primeiro procura na tabela ARP.</li>\n    <li>Se não conhece o MAC, envia um ARP Request ao broadcast <code>FF:FF:FF:FF:FF:FF</code>, que alcança toda a VLAN: \"quem tem o IP X?\".</li>\n    <li>O dono do IP (destino ou gateway) responde com um ARP Reply com o seu MAC, e o host guarda a associação IP→MAC.</li>\n    <li>O host monta o frame: MAC de destino, MAC de origem, EtherType, payload e FCS.</li>\n    <li>O switch recebe o frame, aprende o MAC de origem associado à porta de entrada e consulta a tabela MAC.</li>\n    <li>Se conhece o MAC de destino, encaminha só pela porta dele (unicast). Se não conhece, faz flooding: replica o frame em todas as demais portas da mesma VLAN, nunca em outras.</li>\n    <li>O destino recebe o quadro, confere o FCS e o MAC de destino e passa o payload para a camada superior.</li>\n  </ol>\n  <h3>Onde cada etapa costuma falhar</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Etapa</th><th>Falha típica</th></tr></thead><tbody>\n    <tr><td>Decisão local × remoto</td><td>Máscara errada faz o host tentar ARP para um destino que deveria ir ao gateway.</td></tr>\n    <tr><td>Tabela ARP</td><td>Entrada ausente, desatualizada (stale) ou falsa causa falha ou risco de interceptação.</td></tr>\n    <tr><td>Aprendizado no switch</td><td>Loop ou MAC flapping (o mesmo MAC alternando entre portas) indica instabilidade ou topologia incorreta.</td></tr>\n    <tr><td>Encaminhamento</td><td>Host ou gateway em VLAN errada não recebe o broadcast ARP nem o unicast.</td></tr>\n  </tbody></table></div>\n  <p>Por isso, ARP, VLAN, trunk, tabela MAC e loops derrubam a comunicação mesmo com IP, DNS e aplicação corretos no papel.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>Numa rede corporativa, a Camada 2 está nos switches de acesso, nos links trunk e uplinks para a distribuição, nas VLANs (usuários, servidores, voz, visitantes, gerenciamento) e nas bridges de virtualização.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Host:</strong> tem uma NIC com endereço MAC.</li>\n    <li><strong>Switch de acesso:</strong> conecta dispositivos finais e aprende MACs por porta.</li>\n    <li><strong>VLAN:</strong> separa domínios lógicos de Camada 2.</li>\n    <li><strong>Porta access:</strong> pertence a uma única VLAN; o host envia e recebe frames comuns, sem marcação de VLAN.</li>\n    <li><strong>Trunk:</strong> transporta várias VLANs no mesmo link entre switches ou até hipervisores. Cada frame leva uma tag IEEE 802.1Q com o número da VLAN (VLAN ID), para que o outro lado saiba a qual VLAN ele pertence. A VLAN nativa do trunk trafega sem tag.</li>\n    <li><strong>Gateway:</strong> faz a passagem para a Camada 3 quando o destino está fora da VLAN; em geral há um gateway por VLAN.</li>\n    <li><strong>Controles:</strong> port security, NAC/802.1X, DHCP snooping, Dynamic ARP Inspection e STP com BPDU Guard contra loops.</li>\n  </ul>\n  <p>Consequência prática: se a VLAN do usuário não estiver na lista de VLANs permitidas no trunk até o gateway ou o servidor DHCP, a porta de acesso pode estar certa e mesmo assim o host fica isolado.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Imagine um prédio corporativo. A Camada 1 é o corredor por onde as pessoas andam. A Camada 2 é a recepção interna, que entrega a correspondência na mesa certa dentro daquele prédio; o MAC é a identificação da mesa. A VLAN separa andares: financeiro, visitantes, TI e diretoria usam a mesma estrutura predial, mas não estão no mesmo espaço lógico.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> switches não tomam decisões conscientes, seguem tabelas e temporizadores, e um andar separado (VLAN) não impede ninguém de subir se não houver controle de acesso entre andares (firewall/ACL).</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu notebook (192.168.0.15/24) acessa um site. Como o site está fora da rede 192.168.0.0/24, o frame sai com o MAC de destino do roteador (gateway 192.168.0.1), e não do servidor do site. Se o notebook ainda não conhece esse MAC, faz ARP. Depois de um <code>ping 192.168.0.1</code>, a tabela de vizinhos no Linux mostra algo como (valores ilustrativos):</p>\n  <pre class=\"code-block\">$ ip neigh\n192.168.0.1 dev wlan0 lladdr a4:2b:b0:12:34:56 REACHABLE</pre>\n  <p>Leitura: o IP do gateway está associado a um MAC e a entrada foi confirmada recentemente (REACHABLE; STALE indica uma entrada ainda válida que não é confirmada há algum tempo). Se aparecer <code>FAILED</code> e sem <code>lladdr</code>, o ARP não teve resposta: o problema está na entrega local (Wi-Fi, cabo, VLAN ou gateway), mesmo que pareça \"internet lenta\".</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Numa empresa, usuários ficam na VLAN 10, impressoras na VLAN 20, servidores na VLAN 30 e visitantes na VLAN 40. O mesmo switch conecta tudo fisicamente, mas separa os domínios. Incidente comum: o usuário muda de mesa e o novo ponto está na VLAN errada. O notebook recebe IP de outra rede, não acessa sistemas internos ou cai na rede de visitantes; se a porta estiver na VLAN de servidores, o risco é também de segurança.</p>\n  <p>No switch, a tabela MAC mostra onde o notebook foi aprendido (valores ilustrativos):</p>\n  <pre class=\"code-block\">Switch# show mac address-table dynamic\n          Mac Address Table\n-------------------------------------------\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n  40    aabb.cc00.0110    DYNAMIC     Gi0/7</pre>\n  <p>Leitura: o MAC do notebook (aabb.cc00.0110, no formato Cisco) foi aprendido na porta Gi0/7, mas na VLAN 40, de visitantes. Se a documentação diz VLAN 10 para esse ponto, a hipótese de VLAN errada se confirma: confira com <code>show vlan brief</code> e corrija a porta numa mudança autorizada. O diagnóstico completo olha porta, VLAN, tabela MAC, DHCP e gateway.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud pública (AWS, Azure, Google Cloud), você não administra switches nem VLANs: trabalha com subnets, route tables, security groups e interfaces virtuais com MAC virtual. O provedor resolve a entrega local e o isolamento entre clientes (tenants) por baixo, com overlay e encapsulamento. A Camada 2 volta a aparecer em ambientes híbridos: VLANs em links dedicados (Direct Connect, ExpressRoute) e bridges de virtualização on-premises (VMware, Hyper-V) que ligam datacenter e cloud.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a Camada 2 aparece em runners self-hosted, bridges Docker, redes de containers (CNI), VMs de laboratório e VLANs que isolam ambientes de build e registries internos. Um pipeline pode falhar ao baixar uma imagem de container não porque o registry caiu, mas porque, depois de uma mudança no switch, o runner ficou numa VLAN sem gateway correto. A investigação começa pelas evidências locais do runner: interface, IP, gateway e ARP; só depois vêm rota e política de firewall.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m02l04-title m02l04-desc\">\n    <title id=\"m02l04-title\">Camada 2: quadro Ethernet, switch, tabela MAC, VLAN e ARP</title>\n    <desc id=\"m02l04-desc\">Diagrama mostrando dois hosts em VLANs, um switch aprendendo endereços MAC, ARP resolvendo IP para MAC e o limite entre domínio de broadcast e roteamento.</desc>\n    <defs>\n      <marker id=\"m02l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"40\" width=\"920\" height=\"420\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"76\" text-anchor=\"middle\" class=\"svg-label\">Domínio de Camada 2: switches, MAC, frames, VLANs e broadcast ARP</text>\n\n    <rect x=\"70\" y=\"140\" width=\"150\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"145\" y=\"174\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n    <text x=\"145\" y=\"198\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.10</text>\n    <text x=\"145\" y=\"216\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC AA:AA</text>\n\n    <rect x=\"390\" y=\"122\" width=\"200\" height=\"120\" rx=\"16\" class=\"svg-node svg-node--switch\" />\n    <text x=\"490\" y=\"156\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"490\" y=\"182\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Aprende MAC por porta</text>\n    <text x=\"490\" y=\"205\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Encaminha frames</text>\n    <text x=\"490\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Separa VLANs</text>\n\n    <rect x=\"760\" y=\"140\" width=\"150\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"835\" y=\"174\" text-anchor=\"middle\" class=\"svg-label\">Host B</text>\n    <text x=\"835\" y=\"198\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.20</text>\n    <text x=\"835\" y=\"216\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC BB:BB</text>\n\n    <line x1=\"220\" y1=\"180\" x2=\"390\" y2=\"180\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n    <line x1=\"590\" y1=\"180\" x2=\"760\" y2=\"180\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n    <text x=\"305\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Frame Ethernet</text>\n    <text x=\"675\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Unicast se o MAC é conhecido</text>\n\n    <rect x=\"95\" y=\"300\" width=\"250\" height=\"88\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"220\" y=\"329\" text-anchor=\"middle\" class=\"svg-label\">ARP Request</text>\n    <text x=\"220\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quem tem 192.168.10.20?</text>\n    <text x=\"220\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Broadcast dentro da VLAN</text>\n\n    <rect x=\"635\" y=\"300\" width=\"250\" height=\"88\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"760\" y=\"329\" text-anchor=\"middle\" class=\"svg-label\">Tabela MAC</text>\n    <text x=\"760\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">AA:AA → porta 1</text>\n    <text x=\"760\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BB:BB → porta 2</text>\n\n    <path d=\"M220 300 C260 260 350 248 430 238\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n    <path d=\"M590 238 C650 250 710 270 760 300\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n\n    <line x1=\"490\" y1=\"242\" x2=\"490\" y2=\"445\" class=\"svg-boundary\" />\n    <text x=\"515\" y=\"425\" class=\"svg-label svg-label--small\">Limite lógico: VLAN / domínio de broadcast</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> a Camada 2 é o sistema de entrega local: não decide rotas, mas faz interfaces da mesma rede lógica trocarem frames usando MAC, switches e VLANs.</li>\n    <li><strong>Mecanismo:</strong> o switch aprende o MAC de origem por porta, envia unicast ao MAC conhecido e faz flooding (só na VLAN) ao desconhecido; o ARP descobre por broadcast o MAC do destino local ou do gateway.</li>\n    <li><strong>O que lembrar:</strong> MAC é endereço local, IP é lógico (Camada 3). Porta access tem uma VLAN; trunk leva várias, com tag 802.1Q.</li>\n    <li><strong>Erro comum:</strong> tratar VLAN como firewall ou pular para DNS sem olhar ARP, VLAN e tabela MAC.</li>\n    <li><strong>Segurança:</strong> desativar portas sem uso, controlar o tráfego entre VLANs, monitorar ARP e MAC flapping, evitar loops com STP/BPDU Guard.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 2.5, Camada 3 — Rede: IP, roteamento, gateway e TTL, você verá o que acontece depois que o frame chega ao gateway: como o pacote sai da rede local e atravessa outras redes.</p>\n</section>\n"
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
        "then": "Verificar VLAN da porta, gateway ativo na mesma VLAN, máscara, conectividade física e se a porta foi bloqueada por port security; corrigir em janela autorizada ou escalar para a equipe de rede."
      },
      {
        "if": "MAC do host aparece em porta diferente da documentada",
        "then": "Investigar patch panel, mudança física, loop, bridge de VM ou documentação desatualizada, conferindo o ponto físico e a tabela MAC dos switches envolvidos; atualizar a documentação."
      },
      {
        "if": "Broadcast excessivo ou rede inteira lenta",
        "then": "Investigar loop: eventos de STP, broadcast, CPU do switch e equipamento recém-conectado; isolar a porta e aplicar BPDU Guard e storm control."
      },
      {
        "if": "Host recebe IP de rede inesperada",
        "then": "Comparar a VLAN da porta com o escopo DHCP recebido, verificar o trunk até o servidor DHCP ou relay e procurar DHCP não autorizado."
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
      "Não monitorar switches de acesso."
    ],
    "commonErrors": [
      "Achar que NAT ou VLAN substitui firewall.",
      "Ignorar logs e tabelas do switch.",
      "Deixar trunks permitindo todas as VLANs sem necessidade."
    ],
    "vulnerabilities": [
      {
        "name": "ARP spoofing",
        "description": "ARP não tem autenticação nativa no IPv4: um dispositivo da mesma VLAN pode anunciar uma associação IP-MAC falsa (por exemplo, dizendo ser o gateway).",
        "defensiveExplanation": "O risco é interceptação, redirecionamento ou negação de serviço local. Um sinal típico é o MAC do gateway mudar na tabela ARP dos hosts sem mudança planejada.",
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
        "name": "Porta em VLAN errada",
        "description": "Uma porta configurada por engano coloca o host em outro segmento, por exemplo um notebook de usuário na VLAN de servidores.",
        "defensiveExplanation": "Além da falha operacional, o host passa a alcançar sistemas que não deveria, e um visitante pode cair numa rede interna.",
        "mitigation": "Documentação de portas e VLANs, revisão de mudança, automação da configuração e alerta de MAC novo em VLAN crítica."
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
    "estimatedTimeMinutes": 45,
    "cost": "zero",
    "safetyNotes": [
      "Não execute ARP spoofing, flooding, varredura agressiva ou mudança de VLAN em rede real.",
      "Não publique MACs, IPs internos, nomes de host ou prints sem sanitização.",
      "Use comandos Cisco apenas em laboratório próprio ou autorizado (switch físico ou Packet Tracer)."
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
        "explanation": "O ARP depende da decisão local × remoto, feita com IP e máscara: é ela que diz se o host vai procurar o MAC do destino ou o do gateway."
      },
      {
        "number": 3,
        "title": "Observar tabela ARP/neighbor",
        "instruction": "Liste a tabela ARP antes de gerar tráfego e anote se o gateway já aparece.",
        "command": "Windows: arp -a\nLinux: ip neigh",
        "expectedOutput": "O gateway pode já aparecer (tráfego recente) ou não aparecer (entrada expirada).",
        "explanation": "Serve de linha de base para comparar com o passo 4."
      },
      {
        "number": 4,
        "title": "Gerar tráfego local simples",
        "instruction": "Faça ping para o gateway e observe se a entrada ARP aparece ou muda.",
        "command": "Windows: ping <IP_DO_GATEWAY> && arp -a\nLinux: ping -c 3 <IP_DO_GATEWAY> && ip neigh",
        "expectedOutput": "Respostas do gateway e entrada ARP associando o IP do gateway a um MAC (no Linux, REACHABLE ou STALE).",
        "explanation": "Se a entrada ARP apareceu, a entrega local ao gateway foi resolvida. Se o ping falha e a entrada fica FAILED/INCOMPLETE ou não aparece, a hipótese de problema local (VLAN, porta, gateway ou Camada 1) fica mais forte."
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
        "instruction": "Monte uma tabela com as colunas Sintoma, Evidência (saída do passo 1 a 5), Camada (física, 2 ou 3), Hipótese e Próximo teste, com pelo menos uma linha por camada.",
        "expectedOutput": "Matriz com sintoma, evidência, camada, hipótese e próximo teste.",
        "explanation": "A matriz impede pular direto para DNS, firewall ou aplicação sem evidência local."
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
    "improvements": [
      "Repetir o laboratório no Packet Tracer com duas VLANs e um trunk, e observar o que muda na tabela MAC.",
      "Capturar o ARP Request e o ARP Reply no Wireshark em ambiente controlado e conferir o MAC de destino FF:FF:FF:FF:FF:FF e o EtherType."
    ],
    "evidenceToCollect": [
      "MAC local sanitizado",
      "IP/máscara/gateway sanitizados",
      "Entrada ARP do gateway",
      "Tabela de hipóteses",
      "Opcional: porta/VLAN do switch em laboratório"
    ],
    "questions": [
      "Por que o ARP Request usa broadcast e o que isso implica para o alcance dele?",
      "Por que uma VLAN errada pode impedir o acesso ao gateway mesmo com cabo e IP aparentemente certos?",
      "Por que o MAC não substitui o IP?"
    ]
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
      "question": "Um host com IP 192.168.10.10 foi configurado por engano com máscara /16 em vez de /24 e precisa falar com 192.168.20.5, que está em outra VLAN. O que acontece na Camada 2 e por que a comunicação falha?",
      "hints": [
        "Com /16, o host considera 192.168.20.5 local ou remoto?",
        "A quem ele vai pedir o MAC, e esse pedido alcança a outra VLAN?"
      ],
      "expectedIdeas": [
        "decisão local × remoto pela máscara",
        "ARP Request direto para 192.168.20.5",
        "broadcast fica dentro da VLAN",
        "ninguém responde ao ARP",
        "gateway não é usado",
        "corrigir a máscara"
      ],
      "explanation": "Com /16, o host acha que 192.168.20.5 é local e pergunta por ele via ARP, em vez de usar o gateway. O broadcast não sai da VLAN, ninguém responde e a entrada fica incompleta: parece falha remota, mas a causa é a decisão local × remoto."
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
      "id": "q2.4.7",
      "question": "Qual campo do frame Ethernet indica se o payload carrega um pacote IPv4 ou uma mensagem ARP?",
      "options": [
        "MAC de destino",
        "EtherType",
        "FCS",
        "MAC de origem"
      ],
      "answer": 1,
      "explanation": "O EtherType (16 bits) indica o protocolo do payload. Os MACs identificam as interfaces, e o FCS só detecta erro no quadro.",
      "topic": "frame Ethernet",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.4.8",
      "question": "Seu notebook 192.168.10.10/24 envia um pacote para 8.8.8.8. Qual MAC de destino vai no frame que sai da placa de rede?",
      "options": [
        "O broadcast FF:FF:FF:FF:FF:FF, porque o destino está na internet",
        "O MAC da interface do servidor 8.8.8.8",
        "O MAC do gateway da rede 192.168.10.0/24",
        "O MAC do próprio notebook, que o switch troca pelo do destino"
      ],
      "answer": 2,
      "explanation": "8.8.8.8 está fora da rede local, então o frame vai ao gateway: o IP de destino continua 8.8.8.8, mas o MAC de destino é o do gateway, obtido por ARP. O broadcast só aparece no ARP Request.",
      "topic": "MAC vs IP",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q2.4.3",
      "question": "Um host não consegue pingar o gateway e não há entrada ARP para ele. Qual hipótese deve ser considerada cedo?",
      "options": [
        "Problema local de VLAN, porta, gateway ou enlace",
        "Servidor DNS configurado incorretamente no host",
        "Certificado TLS expirado no servidor web",
        "Firewall de borda bloqueando a saída para a internet"
      ],
      "answer": 0,
      "explanation": "Sem ARP para o gateway, o host nem entrega o frame ao primeiro salto. DNS, TLS e firewall de borda ficam depois; foque a entrega local.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.4.4",
      "question": "Por que VLAN não deve ser tratada como firewall?",
      "options": [
        "Porque VLAN só separa portas físicas e não funciona com máquinas virtuais.",
        "Porque VLAN criptografa o tráfego, e o firewall não consegue inspecioná-lo.",
        "Porque frames de uma VLAN sempre chegam às outras VLANs por flooding.",
        "Porque VLAN separa domínios de broadcast, mas a política de acesso entre segmentos exige firewall ou ACL."
      ],
      "answer": 3,
      "explanation": "A VLAN isola o domínio de broadcast; se houver roteamento permissivo entre VLANs, o acesso acontece. Quem filtra é a ACL ou o firewall no ponto de roteamento. VLAN não criptografa e o flooding não sai da VLAN.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q2.4.5",
      "question": "Um switch recebe um frame unicast para MAC desconhecido dentro de uma VLAN. O que ele tende a fazer?",
      "options": [
        "Envia o frame para todas as portas de todas as VLANs",
        "Faz flooding nas demais portas da mesma VLAN",
        "Descarta o frame até aprender o MAC de destino",
        "Encaminha o frame ao gateway para ser roteado"
      ],
      "answer": 1,
      "explanation": "Com MAC de destino desconhecido, o switch replica o frame só dentro daquela VLAN. Quando o destino responde, o switch aprende o MAC dele e passa a usar unicast.",
      "topic": "switching",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q2.4.6",
      "question": "Você quer confirmar em qual porta e em qual VLAN um switch Cisco aprendeu o MAC do notebook de um usuário. Qual comando usa?",
      "options": [
        "show interfaces trunk",
        "show vlan brief",
        "show mac address-table dynamic",
        "show ip route"
      ],
      "answer": 2,
      "explanation": "show mac address-table dynamic lista VLAN, MAC e porta de cada endereço aprendido. show vlan brief mostra as portas de cada VLAN, sem MACs; show interfaces trunk mostra os trunks; show ip route é Camada 3.",
      "topic": "Cisco IOS",
      "difficulty": "iniciante",
      "type": "comando"
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
      "back": "Identificar uma interface na entrega local de Camada 2. Tem 48 bits, escritos em hexadecimal (ex.: AA:BB:CC:DD:EE:FF); FF:FF:FF:FF:FF:FF é o endereço de broadcast.",
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
      "id": "fc2.4.7",
      "front": "Qual a diferença entre porta access e trunk?",
      "back": "Porta access pertence a uma única VLAN e envia frames sem tag. Trunk leva várias VLANs no mesmo link, marcando cada frame com a tag 802.1Q (VLAN ID); só a VLAN nativa trafega sem tag.",
      "tags": [
        "vlan",
        "trunk",
        "802.1q"
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
      "id": "ex2.4.5",
      "type": "interpretação",
      "prompt": "Um host Linux com IP fixo 192.168.10.50/24 não pinga o gateway 192.168.10.1. Após o ping, ip neigh mostra \"192.168.10.1 dev eth0 FAILED\". No switch, show mac address-table dynamic mostra o MAC do host na porta Gi0/12, VLAN 30; pela documentação, esse ponto deveria estar na VLAN 10, a do gateway. Interprete as saídas e diga a hipótese principal e o próximo passo.",
      "expectedAnswer": "FAILED sem MAC: o ARP para o gateway não teve resposta, a entrega local falhou. O switch aprende o host na VLAN 30, então o broadcast ARP fica na VLAN 30 e não alcança o gateway da VLAN 10. Hipótese: porta Gi0/12 na VLAN errada. Próximo passo: confirmar com show vlan brief, corrigir a VLAN da porta em mudança autorizada e repetir ping e ip neigh.",
      "explanation": "Cruzar a evidência do host (ARP) com a do switch (VLAN e porta) localiza a falha antes de suspeitar de DNS, firewall ou aplicação."
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
        "whyItIsWrong": "O sintoma é falha no gateway, e um ping por IP nem usa DNS; DNS e navegador vêm depois."
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
