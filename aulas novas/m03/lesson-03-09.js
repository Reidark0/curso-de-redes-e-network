export const lesson0309 = {
  "id": "3.9",
  "moduleId": "m03",
  "order": 9,
  "title": "Segurança em L2: ARP spoofing, MAC flooding e defesas",
  "subtitle": "Como reconhecer e reduzir abusos de ARP, tabela MAC, VLAN, trunks e portas físicas.",
  "duration": "100-140 min",
  "estimatedStudyTimeMinutes": 140,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 220,
  "tags": [
    "redes",
    "ethernet",
    "camada 2",
    "segurança",
    "arp",
    "mac flooding",
    "vlan",
    "switch",
    "nac",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.3",
      "reason": "É necessário entender aprendizado MAC, forwarding e flooding."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "ARP é um dos mecanismos centrais de risco e defesa em L2."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "VLANs são usadas como segmentação lógica de broadcast e precisam de configuração segura."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.8",
      "reason": "STP e controles associados reduzem risco de loops e storms."
    }
  ],
  "objectives": [
    "Explicar por que a Camada 2 é superfície crítica de segurança.",
    "Diferenciar ARP spoofing, MAC flooding, porta não autorizada, trunk indevido e loop de L2 em nível defensivo.",
    "Relacionar controles como port security, DHCP snooping, DAI, BPDU Guard, storm control, 802.1X e NAC.",
    "Interpretar evidências de switch, ARP, MAC table e logs sem executar ações ofensivas.",
    "Projetar uma matriz de riscos e defesas para uma LAN corporativa pequena."
  ],
  "learningOutcomes": [
    "Dado um sintoma de ARP inconsistente, o aluno lista hipóteses defensivas e evidências a coletar.",
    "Dado um switch com muitos MACs em uma porta, o aluno explica riscos e controles possíveis.",
    "Dado um desenho de VLANs, o aluno identifica trunks permissivos e portas sem controle.",
    "Dado um ambiente de acesso corporativo, o aluno propõe controles progressivos sem quebrar a operação.",
    "Dado um incidente de LAN, o aluno separa detecção, contenção, erradicação e prevenção."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>O time de segurança recebe alertas estranhos: o gateway aparece com MACs diferentes em momentos próximos, um switch registra muitas mudanças de MAC, usuários reclamam de lentidão intermitente e alguns hosts perdem sessão com sistemas internos. Não há malware evidente no endpoint nem queda física clara. O problema pode estar na Camada 2.</p>\n<p>Antes de chegar ao firewall, à VPN ou ao IAM, o pacote atravessa porta física, switch, VLAN e ARP. Se essa base for fraca, os controles de cima podem ser contornados ou ficar sem visibilidade.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> uma LAN sem controles de Camada 2 permite manipulação de ARP, abuso da tabela MAC, dispositivos não autorizados, loops, storms e movimento lateral. Aqui você aprende a reconhecer esses riscos de forma defensiva, que evidências coletar e quais controles reduzem o impacto.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>Os mecanismos da LAN foram criados para conectar, não para desconfiar. O switch aprende MACs automaticamente. O ARP aceita respostas sem autenticação. A porta física fica ativa para qualquer dispositivo. O broadcast alcança todos os hosts da VLAN. A VLAN segmenta broadcast, mas não é firewall, e um trunk mal configurado carrega VLANs demais. Essas características facilitam a operação, mas criam riscos quando não há controles.</p>\n<p>O switch não nasceu como ferramenta de segurança: port security, DHCP snooping, DAI, BPDU Guard, storm control e 802.1X/NAC vieram depois, quando a LAN passou a sustentar sistemas críticos. O foco aqui é defensivo: reconhecer como cada risco aparece e qual controle o reduz.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<div class=\"definition-box\"><strong>Definição:</strong> segurança de Camada 2 é o conjunto de controles e evidências que reduz a chance de um dispositivo não autorizado, mal configurado ou comprometido manipular o domínio local, causar indisponibilidade, observar tráfego indevido, alterar caminhos locais ou facilitar movimento lateral.</div>\n<p>Ela não substitui firewall, EDR, IAM, TLS ou segmentação de Camada 3/4: sustenta esses controles. Sinais se sobrepõem (MAC flapping pode ser loop ou virtualização), então o diagnóstico começa pela evidência.</p>\n<h3>Os cinco riscos que você precisa diferenciar</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Risco</th><th>Mecanismo explorado</th><th>Como aparece</th><th>Impacto</th></tr></thead><tbody>\n<tr><td>ARP spoofing (envenenamento ARP)</td><td>ARP aceita respostas sem autenticação.</td><td>Gateway muda de MAC no cache ARP; dois IPs com o mesmo MAC; alertas de IP duplicado.</td><td>Desvio, interceptação local ou interrupção do tráfego.</td></tr>\n<tr><td>MAC flooding</td><td>A tabela MAC (CAM) tem tamanho limitado.</td><td>Centenas de MACs numa porta de usuário; tabela instável; flooding anormal.</td><td>Instabilidade e exposição de tráfego dentro da VLAN.</td></tr>\n<tr><td>Porta não autorizada</td><td>Porta física ativa sem autenticação.</td><td>Dispositivo fora do inventário numa porta ativa.</td><td>Acesso indevido à LAN e movimento lateral.</td></tr>\n<tr><td>Trunk permissivo</td><td>Trunk com VLANs demais; native VLAN ou VLAN 1 em uso operacional.</td><td>VLANs atravessando uplinks sem necessidade.</td><td>Exposição de domínios indevidos e erro operacional.</td></tr>\n<tr><td>Loop de L2</td><td>Frame Ethernet não tem TTL; STP sem proteção nas portas de acesso.</td><td>Broadcast storm, MAC flapping e CPU alta no switch.</td><td>Indisponibilidade.</td></tr>\n</tbody></table></div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<p>Cada risco abusa de um passo normal do caminho do frame:</p>\n<ol class=\"flow-list\"><li><strong>Host envia o frame:</strong> o switch aprende o MAC de origem e o associa à porta e à VLAN de entrada. <em>Onde falha:</em> porta sem controle aceita qualquer dispositivo.</li><li><strong>Switch consulta a tabela MAC (CAM):</strong> destino conhecido vai para a porta certa; destino desconhecido, broadcast ou multicast é replicado (flooding) dentro da VLAN. <em>Onde falha:</em> MAC flooding aumenta o flooding.</li><li><strong>Host IPv4 usa ARP:</strong> o ARP Request é broadcast; o ARP Reply informa a associação IP-MAC, que o host guarda no cache ARP. <em>Onde falha:</em> ARP falso desvia ou interrompe o tráfego local.</li><li><strong>Trunks e STP:</strong> trunks carregam várias VLANs entre switches, APs, hypervisors e firewalls; o STP bloqueia caminhos redundantes. <em>Onde falha:</em> trunk com VLANs demais, BPDU em porta de usuário, loop.</li></ol>\n<h3>MAC flooding: quando o switch volta a se comportar como hub</h3>\n<p>Normalmente, cada porta recebe só o tráfego destinado a ela, mais broadcast, multicast e unknown unicast. A tabela MAC, porém, é finita. Se uma porta injeta milhares de MACs de origem falsos, a tabela enche, MACs legítimos que expiram não são reaprendidos e os frames para eles passam a ser inundados para todas as portas da VLAN. Resultado: instabilidade e tráfego exposto a qualquer host daquela VLAN.</p>\n<h3>ARP spoofing: o cache acredita em quem responde</h3>\n<p>O ARP não autentica respostas, e o host atualiza o cache mesmo com respostas que não pediu. Um dispositivo na mesma VLAN pode anunciar \"o IP do gateway está no meu MAC\": as vítimas passam a mandar para ele o tráfego que iria ao gateway. O risco fica restrito ao domínio de broadcast, o que explica por que segmentar reduz o alcance, e o TLS protege o conteúdo mesmo se o tráfego for desviado.</p>\n<h3>Campos que você observa nas evidências</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>O que observar</th></tr></thead><tbody>\n<tr><td>Source MAC (48 bits)</td><td>Mudança rápida de porta (MAC flapping): virtualização, redundância, loop ou comportamento suspeito.</td></tr>\n<tr><td>Destination MAC (48 bits)</td><td>Broadcast e unknown unicast em excesso.</td></tr>\n<tr><td>ARP Sender Protocol Address (32 bits no IPv4)</td><td>IP anunciado associado a um MAC inesperado: risco ou erro operacional.</td></tr>\n<tr><td>VLAN ID (12 bits no 802.1Q)</td><td>VLANs demais no trunk ou native VLAN insegura.</td></tr>\n<tr><td>BPDU (controle do STP)</td><td>BPDU em porta de usuário: switch indevido ou loop potencial.</td></tr>\n</tbody></table></div>\n<p>Uma falha de L2 costuma se disfarçar de problema de IP, DNS, aplicação ou autenticação; por isso colete evidências em várias camadas, com logs centralizados.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2>\n<p>A segurança de L2 fica na camada de acesso (portas de usuário, APs, trunks, impressoras, câmeras, telefones IP, IoT) e depende de DHCP, ARP, VLAN, NAC e logs centralizados. Cada controle verifica uma coisa diferente:</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Controle</th><th>O que faz</th><th>Risco que reduz</th><th>Cuidado</th></tr></thead><tbody>\n<tr><td>Port security</td><td>Limita quantos (ou quais) MACs a porta aprende; na violação, desliga a porta (err-disabled) ou descarta e registra.</td><td>MAC flooding, mini-switch indevido.</td><td>Telefone IP com PC, VMs e docks usam mais de um MAC. MAC pode ser alterado: não é identidade forte.</td></tr>\n<tr><td>DHCP snooping</td><td>Descarta respostas de servidor DHCP vindas de porta não confiável e grava bindings IP-MAC-VLAN-porta.</td><td>Servidor DHCP não autorizado; base para DAI e IP Source Guard.</td><td>Marque como confiáveis só os uplinks rumo ao servidor DHCP. IP estático não gera binding.</td></tr>\n<tr><td>Dynamic ARP Inspection (DAI)</td><td>Em portas não confiáveis, confere cada ARP com os bindings e descarta o que não bate.</td><td>ARP spoofing.</td><td>Depende do DHCP snooping; hosts com IP fixo precisam de binding estático.</td></tr>\n<tr><td>IP Source Guard</td><td>Descarta tráfego IP cuja origem não corresponde ao binding da porta.</td><td>IP de origem falsificado.</td><td>Mesma dependência do DHCP snooping.</td></tr>\n<tr><td>BPDU Guard (com PortFast)</td><td>Desliga (err-disabled) a porta de acesso que receber BPDU.</td><td>Switch indevido, loop.</td><td>Só em portas de borda, nunca em uplink entre switches.</td></tr>\n<tr><td>Root Guard</td><td>Bloqueia a porta que receber BPDU superior, para um switch indevido não virar root bridge.</td><td>Manipulação da topologia STP.</td><td>Use em portas voltadas para switches de acesso.</td></tr>\n<tr><td>Storm control</td><td>Descarta tráfego (ou desliga a porta) quando broadcast, multicast ou unknown unicast passa de um limiar.</td><td>Storm e flooding excessivo.</td><td>Limiar baixo demais corta tráfego legítimo.</td></tr>\n<tr><td>802.1X/NAC</td><td>Só libera a porta após autenticar dispositivo ou usuário; o NAC aplica VLAN, quarentena ou postura.</td><td>Porta não autorizada.</td><td>Legados (impressoras, câmeras) exigem MAB controlado ou exceção documentada.</td></tr>\n<tr><td>Trunks restritos</td><td>Allowed VLANs mínimas e native VLAN sem uso.</td><td>Trunk permissivo.</td><td>Revise a cada mudança e documente.</td></tr>\n</tbody></table></div>\n<div class=\"callout warning\"><strong>Implantar sem derrubar a produção:</strong> inventarie antes portas, MACs, VLANs, IPs estáticos e legados; ative em piloto, com janela, rollback e aviso ao service desk, e espere mais chamados no início. Comece por salas públicas, visitantes, IoT, impressoras, câmeras, BYOD e segmentos críticos. Switches sem esses recursos viram dívida operacional.</div>\n<p>Em cloud pública o provedor abstrai a L2 (sem ARP nem STP configuráveis; o isolamento vem de redes virtuais, security groups e NSGs). Em hypervisors, bridges Linux e redes de containers a L2 existe, e os mesmos riscos valem.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n<p>Pense num prédio corporativo. O firewall de borda é a portaria entre a empresa e a rua; a Camada 2 são as portas internas, os crachás de sala e as regras de circulação por andar. Uma porta de rede ativa numa sala de reunião é uma porta interna destrancada; uma rede plana é um prédio sem separação entre andares; um inventário errado faz a segurança investigar a sala errada.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> a defesa real depende das regras técnicas de frames, MAC, ARP e VLAN, configuradas e monitoradas.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Um host Linux na VLAN 10 perde acesso intermitente aos sistemas internos. O cache ARP (valores fictícios) mostra:</p>\n<pre class=\"code-block\"><code>$ ip neigh\n192.168.10.1  dev eth0 lladdr aa:bb:cc:11:22:33 REACHABLE\n192.168.10.57 dev eth0 lladdr aa:bb:cc:11:22:33 STALE</code></pre>\n<p>O gateway (192.168.10.1) e a estação 192.168.10.57 aparecem com o <strong>mesmo MAC</strong>, e o inventário registra outro MAC para o gateway. No switch, você procura onde esse MAC está:</p>\n<pre class=\"code-block\"><code>switch# show mac address-table address aabb.cc11.2233\nVlan    Mac Address       Type        Ports\n----    -----------       --------    -----\n  10    aabb.cc11.2233    DYNAMIC     Gi1/0/12</code></pre>\n<p>Interpretação: o MAC que responde pelo gateway está numa porta de usuário (Gi1/0/12), não no uplink do gateway. Antes de concluir ARP spoofing, descarte a explicação legítima: um gateway com HSRP/VRRP usa MAC virtual (0000.0c07.acXX no HSRP, 0000.5e00.01XX no VRRP), aprendido no uplink, não numa porta de acesso. Aqui a evidência aponta para associação ARP indevida; o controle que faltou é DAI com DHCP snooping.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n<p>Numa empresa com VLANs de usuários, voz, impressoras, câmeras e visitantes, uma porta de sala de reunião ficou na VLAN interna, sem 802.1X. Um notebook desconhecido é ligado nela e o SOC recebe alerta de ARP inconsistente para o gateway. A resposta separa quatro fases:</p>\n<ol><li><strong>Detecção:</strong> o alerta e o <code>show mac address-table</code> identificam porta, VLAN e MAC fora do inventário.</li><li><strong>Contenção:</strong> desligar a porta ou movê-la para a VLAN de quarentena, preservando antes os logs do switch.</li><li><strong>Erradicação:</strong> retirar o dispositivo e limpar os caches ARP dos hosts afetados.</li><li><strong>Prevenção:</strong> desabilitar portas sem uso, aplicar 802.1X/NAC nas salas públicas e DAI com DHCP snooping na VLAN.</li></ol>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m03l09-title m03l09-desc\">\n<title id=\"m03l09-title\">Segurança defensiva em Camada 2</title>\n<desc id=\"m03l09-desc\">Diagrama mostrando host, switch, gateway, atacante local hipotético, controles de L2 e evidências monitoradas.</desc>\n<defs><marker id=\"m03l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n<rect x=\"55\" y=\"150\" width=\"160\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--client\"/><text x=\"135\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Host legítimo</text><text x=\"135\" y=\"210\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN 10</text>\n<rect x=\"410\" y=\"140\" width=\"180\" height=\"92\" rx=\"14\" class=\"svg-node svg-node--switch\"/><text x=\"500\" y=\"176\" text-anchor=\"middle\" class=\"svg-label\">Switch acesso</text><text x=\"500\" y=\"202\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC table + controles</text>\n<rect x=\"755\" y=\"150\" width=\"160\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--router\"/><text x=\"835\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"835\" y=\"210\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">roteamento/firewall</text>\n<rect x=\"55\" y=\"330\" width=\"160\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--attacker\"/><text x=\"135\" y=\"365\" text-anchor=\"middle\" class=\"svg-label\">Dispositivo suspeito</text><text x=\"135\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta não autorizada</text>\n<line x1=\"215\" y1=\"190\" x2=\"410\" y2=\"190\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l09-arrow)\"/>\n<line x1=\"590\" y1=\"190\" x2=\"755\" y2=\"190\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l09-arrow)\"/>\n<line x1=\"215\" y1=\"370\" x2=\"410\" y2=\"220\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m03l09-arrow)\"/>\n<text x=\"320\" y=\"332\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bloqueio/alerta</text>\n<rect x=\"300\" y=\"30\" width=\"400\" height=\"66\" rx=\"14\" class=\"svg-zone\"/><text x=\"500\" y=\"58\" text-anchor=\"middle\" class=\"svg-label\">Controles</text><text x=\"500\" y=\"82\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">802.1X/NAC · Port Security · DHCP Snooping · DAI · BPDU Guard</text>\n<rect x=\"260\" y=\"455\" width=\"460\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"490\" y=\"484\" text-anchor=\"middle\" class=\"svg-label\">Evidências para SOC/NOC</text><text x=\"490\" y=\"510\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC flapping · ARP inconsistente · portas novas · storm · logs de switch</text>\n<line x1=\"500\" y1=\"232\" x2=\"490\" y2=\"455\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l09-arrow)\"/>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul><li><strong>Ideia central:</strong> segurança em L2 é controlar a porta de entrada local da rede: quem pode conectar, que VLAN recebe, quais MACs são esperados, quais ARPs são válidos e que anomalias viram alerta.</li><li><strong>Cinco riscos:</strong> ARP spoofing (ARP sem autenticação), MAC flooding (tabela MAC finita), porta não autorizada, trunk permissivo e loop de L2.</li><li><strong>Controles:</strong> DAI com DHCP snooping, port security, BPDU Guard, storm control, 802.1X/NAC e trunks restritos, em piloto e com rollback.</li><li><strong>Evidências:</strong> cache ARP, tabela MAC, MAC flapping, BPDUs em porta de acesso e logs de switch, DHCP e NAC; investigue antes de concluir ataque.</li><li><strong>Erro comum:</strong> achar que o firewall de borda protege o tráfego dentro da VLAN, ou que VLAN substitui firewall.</li></ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>A aula 3.10, \"Revisão prática: do frame ao gateway\", junta Ethernet, MAC, switch, ARP, VLAN, STP e os controles de L2 desta aula num fluxo completo de diagnóstico.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet"
    ],
    "relatedProtocols": [
      "Ethernet",
      "ARP",
      "STP/RSTP",
      "802.1Q",
      "802.1X",
      "DHCP",
      "ICMP"
    ],
    "dependsOn": [
      "MAC",
      "Switch",
      "ARP",
      "VLAN",
      "STP",
      "Broadcast"
    ],
    "enables": [
      "Hardening de LAN",
      "NAC",
      "Segmentação defensiva",
      "Detecção de anomalias L2",
      "Troubleshooting de acesso"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Gateway muda de MAC no ARP",
      "Muitos MACs em uma porta",
      "MAC flapping",
      "Broadcast elevado",
      "Dispositivos desconhecidos na VLAN",
      "Quedas intermitentes em uma área"
    ],
    "diagnosticQuestions": [
      "Qual porta e VLAN estão envolvidas?",
      "O MAC é conhecido no inventário?",
      "Há logs de NAC, DHCP ou switch?",
      "O gateway possui MAC virtual legítimo?",
      "Houve mudança recente de cabeamento, AP, switch ou hypervisor?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "arp -a\nipconfig /all\ngetmac /v",
        "purpose": "Ver ARP local, configuração IP e MACs das interfaces.",
        "expectedObservation": "Gateway com MAC consistente com o inventário e interface correta.",
        "interpretation": "Mudanças inesperadas exigem correlação com logs de switch e gateway."
      },
      {
        "platform": "Linux",
        "command": "ip neigh\nip link\nip route",
        "purpose": "Ver vizinhos ARP, interfaces e rotas.",
        "expectedObservation": "Gateway em REACHABLE/STALE com o MAC do inventário e nenhum outro IP com o mesmo MAC.",
        "interpretation": "FAILED/INCOMPLETE pode indicar falha local, VLAN, gateway ou ARP; dois IPs com o mesmo MAC pedem correlação com a tabela MAC do switch."
      },
      {
        "platform": "Cisco IOS",
        "command": "show mac address-table\nshow arp\nshow interfaces status\nshow interfaces counters errors\nshow interfaces trunk\nshow port-security interface\nshow ip dhcp snooping binding",
        "purpose": "Coletar evidências de MAC, ARP, portas, erros, trunks, port security e bindings DHCP.",
        "expectedObservation": "MACs coerentes com portas e VLANs esperadas; trunks só com as VLANs necessárias.",
        "interpretation": "Muitos MACs por porta, flapping, VLANs demais no trunk ou binding ausente indicam problema ou risco a investigar."
      }
    ],
    "decisionTree": [
      {
        "if": "MAC do gateway muda no host",
        "then": "Verificar se há HSRP/VRRP/GLBP legítimo (MAC virtual aprendido no uplink), comparar com a tabela MAC do switch e os logs do gateway."
      },
      {
        "if": "Muitos MACs aparecem em uma porta de usuário",
        "then": "Verificar mini-switch, bridge, hypervisor, telefone IP com porta pass-through ou comportamento suspeito."
      },
      {
        "if": "ARP fica incompleto",
        "then": "Verificar VLAN, link físico, gateway, ACL local, DHCP e porta do switch."
      },
      {
        "if": "Broadcast sobe rapidamente",
        "then": "Verificar loops, STP, storm control, MAC flapping e mudanças físicas recentes."
      },
      {
        "if": "Porta entra em err-disabled logo após ligar um equipamento novo",
        "then": "Verificar no log se foi BPDU Guard ou port security, identificar o equipamento (switch, hub, telefone IP) e só reativar depois de corrigir a causa."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Desabilitar portas não utilizadas.",
      "Usar VLANs por função e política inter-VLAN no gateway/firewall.",
      "Centralizar logs de switches, NAC, DHCP e firewall.",
      "Implantar controles de L2 em piloto, com janela e plano de rollback."
    ],
    "badPractices": [
      "Deixar todas as portas ativas na VLAN interna.",
      "Usar VLAN 1 como rede operacional padrão.",
      "Permitir todas as VLANs em todos os trunks sem necessidade."
    ],
    "commonErrors": [
      "Tratar VLAN como firewall: o tráfego entre VLANs é roteado e fica liberado se o gateway não tiver política; use firewall/ACL.",
      "Ignorar portas de salas públicas por focar em firewall, VPN e cloud; desabilite-as ou use 802.1X/NAC ou VLAN de quarentena.",
      "Concluir ataque ao ver MAC flapping: pode ser loop, virtualização ou redundância; colete STP, porta, VLAN e hypervisor antes.",
      "Confundir ARP (IP para MAC no segmento local) com DNS (nome para IP).",
      "Ignorar legados e IoT ao planejar 802.1X ou DAI.",
      "Compartilhar PCAPs e outputs sem sanitizar a topologia interna."
    ],
    "vulnerabilities": [
      {
        "name": "ARP spoofing",
        "description": "Associação IP-MAC falsa anunciada por um host da mesma VLAN.",
        "defensiveExplanation": "Como o ARP não autentica, as vítimas enviam ao MAC errado o tráfego do gateway.",
        "mitigation": "DAI com DHCP snooping, segmentação, TLS e monitoramento de ARP."
      },
      {
        "name": "MAC flooding",
        "description": "Excesso de MACs de origem que enche a tabela MAC.",
        "defensiveExplanation": "Com a tabela cheia, o switch inunda a VLAN; loop ou hypervisor mal configurado geram sintoma parecido.",
        "mitigation": "Port security com limite por porta, logs e investigação da causa."
      },
      {
        "name": "Porta física não controlada",
        "description": "Porta de switch acessível aceita dispositivo desconhecido.",
        "defensiveExplanation": "A LAN passa a depender da boa-fé de quem tem acesso físico.",
        "mitigation": "802.1X/NAC, portas desabilitadas, VLAN de quarentena e inventário."
      },
      {
        "name": "Trunk permissivo",
        "description": "Trunk carrega VLANs desnecessárias.",
        "defensiveExplanation": "Leva domínios de broadcast aonde não deveriam chegar e facilita erro operacional.",
        "mitigation": "Allowed VLANs mínimas, native VLAN sem uso e revisão de mudança."
      }
    ],
    "monitoring": [
      "Alertas de MAC flapping",
      "MACs por porta",
      "Mudanças de VLAN",
      "Eventos de port security e err-disabled",
      "BPDUs em portas de acesso",
      "ARP inconsistente",
      "Broadcast/storm control",
      "Logs de NAC e DHCP",
      "Syslog, SNMP/telemetria e NetFlow dos switches enviados ao SIEM"
    ],
    "hardening": [
      "Port security onde fizer sentido",
      "DHCP snooping",
      "Dynamic ARP Inspection",
      "IP Source Guard",
      "PortFast com BPDU Guard em portas de acesso",
      "Root Guard",
      "Storm control",
      "802.1X/NAC planejado",
      "Trunks com allowed VLANs restritas"
    ],
    "detectionIdeas": [
      "Comparar ARP de hosts críticos com tabela do gateway.",
      "Correlacionar MAC flapping com STP e mudanças físicas.",
      "Monitorar portas que aparecem com mais MACs do que o esperado.",
      "Alertar portas ativas fora do inventário."
    ]
  },
  "lab": {
    "id": "lab-3.9",
    "title": "Matriz defensiva de segurança em Camada 2",
    "labType": "security",
    "objective": "Criar uma matriz de riscos, controles e evidências de L2 para uma LAN pequena, sem executar ataques.",
    "scenario": "Você atua como analista de redes/segurança e precisa revisar uma LAN com usuários, impressoras, APs, visitantes e servidores locais.",
    "topology": "Usuários -> switch de acesso -> switch/firewall/gateway -> serviços internos; APs e impressoras conectados ao switch de acesso.",
    "architecture": "LAN segmentada por VLANs, com gateway inter-VLAN e coleta de logs de switch/NAC/DHCP/firewall.",
    "prerequisites": [
      "Ter estudado aulas 3.1 a 3.8.",
      "Usar apenas ambiente próprio, laboratório, Packet Tracer/GNS3 ou análise conceitual."
    ],
    "tools": [
      "Windows PowerShell",
      "Terminal Linux",
      "Cisco IOS/Packet Tracer/GNS3 opcional",
      "Planilha ou markdown para matriz",
      "Opcional: Wireshark apenas em rede própria"
    ],
    "estimatedTimeMinutes": 40,
    "cost": "zero",
    "safetyNotes": [
      "Não execute ARP spoofing, MAC flooding ou testes de negação de serviço em redes reais: faça só inventário, validação e raciocínio defensivo.",
      "Não colete PCAPs de terceiros sem autorização.",
      "Sanitize MACs, IPs, nomes de host e topologia antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir escopo da LAN",
        "instruction": "Liste segmentos lógicos: usuários, visitantes, impressoras, IoT, servidores e administração.",
        "expectedOutput": "Lista de VLANs ou grupos funcionais.",
        "explanation": "Não há defesa sem saber o que deve existir."
      },
      {
        "number": 2,
        "title": "Coletar evidências locais no host",
        "instruction": "Observe IP, gateway, MAC local e cache ARP.",
        "command": "Windows: ipconfig /all && arp -a\nLinux: ip addr && ip route && ip neigh",
        "expectedOutput": "IP, gateway, MAC local e associação ARP do gateway.",
        "explanation": "Essa é a visão do endpoint sobre a Camada 2/3 local."
      },
      {
        "number": 3,
        "title": "Mapear riscos por mecanismo",
        "instruction": "Crie linhas para ARP, MAC table, porta física, trunk, VLAN, STP e broadcast.",
        "expectedOutput": "Matriz com mecanismo, risco, impacto e evidência possível.",
        "explanation": "A matriz evita conclusões vagas como 'melhorar segurança'."
      },
      {
        "number": 4,
        "title": "Associar controles",
        "instruction": "Para cada risco, associe controles preventivos, detectivos e corretivos (ex.: DAI, DHCP snooping, port security, BPDU Guard, storm control, 802.1X/NAC), com o impacto operacional de cada um.",
        "expectedOutput": "Controles mapeados por risco.",
        "explanation": "Controles precisam ter motivo, escopo e impacto operacional."
      },
      {
        "number": 5,
        "title": "Planejar evidências de switch",
        "instruction": "Liste comandos que seriam usados em Cisco IOS ou equivalente gerenciado.",
        "command": "show mac address-table\nshow arp\nshow interfaces status\nshow interfaces trunk\nshow port-security\nshow spanning-tree\nshow ip dhcp snooping binding",
        "expectedOutput": "Plano de coleta de evidências.",
        "explanation": "Mesmo sem equipamento real, você deve saber o que procuraria."
      },
      {
        "number": 6,
        "title": "Criar plano de implantação seguro",
        "instruction": "Defina piloto, janela, rollback e comunicação para controles de L2.",
        "expectedOutput": "Plano com ordem de implantação e validação.",
        "explanation": "Segurança de L2 mal implantada pode derrubar produção."
      },
      {
        "number": 7,
        "title": "Sanitizar relatório",
        "instruction": "Remova ou mascare IPs, MACs, nomes internos e detalhes sensíveis antes de compartilhar.",
        "command": "Exemplo: 192.168.10.15 -> 192.168.10.x; aa:bb:cc:dd:ee:ff -> aa:bb:cc:xx:xx:xx",
        "expectedOutput": "Relatório seguro para revisão.",
        "explanation": "Evidências de rede são sensíveis e podem revelar topologia interna."
      }
    ],
    "expectedResult": "Ao final, o aluno terá uma matriz defensiva de L2 com riscos, controles, evidências, impacto e plano de implantação seguro.",
    "validation": [
      {
        "check": "Matriz contém riscos centrais de L2",
        "command": "Revisar linhas: ARP, MAC, porta, trunk, VLAN, STP, broadcast.",
        "expected": "Todos os mecanismos possuem risco e controle associados.",
        "ifFails": "Revisar aulas 3.3 a 3.8."
      },
      {
        "check": "Controles têm evidências",
        "command": "Verificar coluna de evidência/log.",
        "expected": "Cada controle tem pelo menos uma evidência de validação.",
        "ifFails": "Adicionar comandos e logs esperados."
      },
      {
        "check": "Plano não é disruptivo",
        "command": "Verificar piloto, rollback e exceções.",
        "expected": "Existe implantação gradual e segura.",
        "ifFails": "Adicionar piloto e plano de rollback."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não sei qual controle escolher.",
        "probableCause": "Risco ainda está genérico.",
        "howToConfirm": "Verifique se a linha descreve mecanismo, impacto e evidência.",
        "fix": "Especificar o risco antes de escolher controle."
      },
      {
        "symptom": "Controle parece quebrar dispositivos legados.",
        "probableCause": "802.1X/NAC ou DAI sem exceções planejadas.",
        "howToConfirm": "Listar impressoras, câmeras, telefones IP e IoT.",
        "fix": "Usar piloto, MAB controlado, VLAN quarentena ou exceção documentada."
      }
    ],
    "improvements": [
      "Integrar os logs ao SIEM.",
      "Criar baseline de MACs por porta.",
      "Definir alertas de MAC flapping.",
      "Revisar trunks e allowed VLANs trimestralmente."
    ],
    "evidenceToCollect": [
      "Matriz de riscos",
      "Cache ARP sanitizado",
      "Plano de comandos de switch",
      "Lista de controles",
      "Plano de implantação",
      "Relatório sanitizado"
    ],
    "questions": [
      "Quando port security ajuda e quando atrapalha?",
      "Quais evidências indicam ARP inconsistente?",
      "Como implantar 802.1X sem derrubar a operação?"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que não basta proteger apenas o firewall de borda se a LAN interna é plana e sem controle?",
      "hints": [
        "Pense em movimento lateral.",
        "Pense em tráfego dentro da mesma VLAN."
      ],
      "expectedIdeas": [
        "domínio local",
        "portas físicas",
        "ARP",
        "VLAN",
        "movimento lateral",
        "visibilidade"
      ],
      "explanation": "O firewall de borda não necessariamente vê ou controla tráfego entre hosts na mesma VLAN."
    },
    {
      "type": "diagnóstico",
      "question": "Logo após ativar port security com limite de 1 MAC, várias portas de usuário entraram em err-disabled. Que dispositivos legítimos explicam isso e como ajustar sem abrir mão do controle?",
      "hints": [
        "Pense no que fica conectado atrás do telefone IP.",
        "Pense em virtualização e docks."
      ],
      "expectedIdeas": [
        "telefone IP com PC atrás",
        "VMs em bridge e docks",
        "limite por perfil de porta",
        "registrar antes de desligar",
        "inventário, piloto e rollback"
      ],
      "explanation": "O limite precisa refletir o que cada porta realmente atende; port security sem inventário e sem piloto vira incidente operacional."
    },
    {
      "type": "cenário real",
      "question": "Você precisa implantar 802.1X em uma rede com impressoras e câmeras antigas. Qual seria uma abordagem segura?",
      "hints": [
        "Pense em piloto.",
        "Pense em exceções documentadas."
      ],
      "expectedIdeas": [
        "piloto",
        "NAC",
        "MAB",
        "VLAN quarentena",
        "inventário",
        "rollback"
      ],
      "explanation": "Controles de acesso precisam considerar dispositivos que não suportam autenticação moderna."
    }
  ],
  "quiz": [
    {
      "id": "q3.9.8",
      "question": "Milhares de MACs de origem falsos, vindos de uma porta, enchem a tabela MAC do switch. Qual é o efeito mais provável?",
      "options": [
        "O switch passa a rotear entre as VLANs.",
        "Frames para destinos não aprendidos são inundados em toda a VLAN.",
        "O switch descarta todos os broadcasts da VLAN.",
        "Os hosts da VLAN apagam o cache ARP."
      ],
      "answer": 1,
      "explanation": "Sem espaço para aprender os MACs legítimos, o switch trata os destinos como desconhecidos e faz flooding na VLAN: instabilidade e tráfego exposto.",
      "topic": "mac",
      "difficulty": "intermediário",
      "type": "conceito"
    },
    {
      "id": "q3.9.2",
      "question": "Por que um host passa a enviar ao MAC errado o tráfego destinado ao gateway?",
      "options": [
        "Porque o ARP não autentica respostas e o host aceita até respostas que não pediu.",
        "Porque o switch entrega o ARP Reply só ao gateway, que repassa a associação errada.",
        "Porque o DHCP reescreve o cache ARP a cada renovação.",
        "Porque o ARP usa TCP sem criptografia."
      ],
      "answer": 0,
      "explanation": "ARP não tem autenticação nativa: quem responde é aceito. Daí a necessidade de DAI, segmentação e monitoramento de ARP.",
      "topic": "arp",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q3.9.3",
      "question": "Uma porta de usuário mostra 3 MACs na tabela do switch. O que fazer antes de bloquear?",
      "options": [
        "Concluir MAC flooding e desligar a porta.",
        "Considerar telefone IP com PC, mini-switch, hypervisor ou anomalia e correlacionar com inventário, CDP/LLDP e logs.",
        "Concluir loop de STP, pois só loops geram vários MACs por porta.",
        "Concluir ARP spoofing: cada MAC extra é um IP falsificado."
      ],
      "answer": 1,
      "explanation": "Vários MACs numa porta podem ser legítimos ou anômalos; classifique a causa com evidência antes de bloquear.",
      "topic": "mac",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q3.9.4",
      "question": "Qual controle valida mensagens ARP com os bindings IP-MAC aprendidos do DHCP?",
      "options": [
        "IP Source Guard, sem DHCP snooping.",
        "BPDU Guard nas portas de acesso.",
        "Storm control com limiar de broadcast.",
        "Dynamic ARP Inspection com DHCP snooping."
      ],
      "answer": 3,
      "explanation": "DAI confere o ARP de portas não confiáveis com os bindings do DHCP snooping. IP Source Guard filtra tráfego IP, não ARP.",
      "topic": "defesa",
      "difficulty": "intermediário",
      "type": "arquitetura"
    },
    {
      "id": "q3.9.5",
      "question": "Qual configuração reduz o risco de trunk permissivo?",
      "options": [
        "Permitir todas as VLANs para evitar falhas após mudanças.",
        "Usar a VLAN 1 como native e como rede operacional.",
        "Permitir só as VLANs necessárias, com native VLAN sem uso.",
        "Ativar BPDU Guard no trunk entre switches."
      ],
      "answer": 2,
      "explanation": "O trunk deve carregar o mínimo necessário, com native VLAN sem uso. BPDU Guard num trunk entre switches derrubaria o link.",
      "topic": "vlan",
      "difficulty": "iniciante",
      "type": "boas práticas"
    },
    {
      "id": "q3.9.7",
      "question": "Após ativar DAI numa VLAN, impressoras com IP fixo perdem conectividade, mas PCs com DHCP funcionam. Causa mais provável?",
      "options": [
        "Sem binding de DHCP snooping para os IPs fixos, o DAI descarta os ARPs das impressoras.",
        "BPDU Guard desligou as portas das impressoras.",
        "Storm control bloqueou o broadcast de ARP.",
        "O trunk deixou de carregar a VLAN das impressoras."
      ],
      "answer": 0,
      "explanation": "IP fixo não gera binding no DHCP snooping; cadastre binding estático antes de ativar o DAI.",
      "topic": "defesa",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.9.1",
      "front": "VLAN substitui firewall?",
      "back": "Não. VLAN separa domínio de broadcast; política de acesso exige firewall, ACL ou controles equivalentes.",
      "tags": [
        "vlan",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.9.8",
      "front": "O que o DHCP snooping faz numa porta não confiável?",
      "back": "Descarta respostas de servidor DHCP vindas dela e grava bindings IP-MAC-VLAN-porta, usados por DAI e IP Source Guard.",
      "tags": [
        "dhcp",
        "dai"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.9.3",
      "front": "O que é MAC flooding em visão defensiva?",
      "back": "Excesso de MACs de origem (falsos ou anômalos) que enche a tabela MAC; o switch passa a inundar na VLAN os frames de destinos não aprendidos.",
      "tags": [
        "mac",
        "switch"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.9.4",
      "front": "Para que serve 802.1X/NAC?",
      "back": "Controlar acesso de dispositivos/usuários à rede, aplicando autenticação, postura e políticas.",
      "tags": [
        "nac",
        "802.1x"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.9.5",
      "front": "O que indica MAC flapping?",
      "back": "O mesmo MAC aparecendo alternadamente em portas diferentes, podendo indicar loop, redundância, virtualização ou anomalia.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.9.7",
      "front": "O que BPDU Guard faz e onde usar?",
      "back": "Desliga (err-disabled) a porta de acesso que receber BPDU. Use em portas PortFast de usuário, nunca em uplinks entre switches.",
      "tags": [
        "stp",
        "switch"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.9.5",
      "type": "diagnóstico",
      "prompt": "O switch gera alerta de port security e mostra centenas de MACs na porta Gi1/0/20, numa sala de treinamento; usuários da mesma VLAN relatam lentidão. Separe sua resposta em detecção, contenção, erradicação e prevenção.",
      "expectedAnswer": "Detecção: log de port security e show mac address-table/show port-security interface confirmam porta, VLAN e volume de MACs (descartar mini-switch ou hypervisor legítimo). Contenção: porta em err-disabled ou quarentena, com logs preservados. Erradicação: retirar o dispositivo e confirmar que tabela MAC e flooding normalizaram. Prevenção: limite por perfil de porta, 802.1X/NAC na sala, portas sem uso desabilitadas e alerta de MACs por porta no SIEM.",
      "explanation": "Separar as fases evita dois erros: bloquear sem evidência e restaurar o serviço sem corrigir a causa."
    },
    {
      "id": "ex3.9.2",
      "type": "diagnóstico",
      "prompt": "Um host mostra o gateway com MAC diferente do esperado. Liste três hipóteses defensivas antes de concluir ataque.",
      "expectedAnswer": "Alta disponibilidade com MAC virtual, troca legítima de equipamento/gateway, erro de inventário, ARP inconsistente, IP duplicado ou comportamento suspeito.",
      "explanation": "Nem toda anomalia é ataque; evidências evitam falso positivo."
    },
    {
      "id": "ex3.9.4",
      "type": "segurança",
      "prompt": "Crie uma linha de matriz para o risco 'trunk permissivo'.",
      "expectedAnswer": "Risco: trunk carrega VLANs desnecessárias. Impacto: exposição e erro operacional. Controle: allowed VLANs restritas, native VLAN não usada, revisão. Evidência: show interfaces trunk e documentação.",
      "explanation": "Uma matriz útil conecta risco, impacto, controle e evidência."
    }
  ],
  "challenge": {
    "title": "Desenhar uma estratégia defensiva de L2 para uma filial",
    "scenario": "Uma filial possui usuários, VoIP, impressoras, câmeras, visitantes e um pequeno rack com switches de acesso. A rede tem VLANs, mas portas públicas ainda estão ativas e trunks carregam VLANs demais.",
    "tasks": [
      "Identificar riscos de L2.",
      "Propor controles por segmento.",
      "Definir evidências de validação.",
      "Planejar implantação com piloto e rollback.",
      "Indicar o que deve ir para SIEM/NOC."
    ],
    "constraints": [
      "Não interromper telefonia IP.",
      "Dispositivos legados podem não suportar 802.1X.",
      "Não executar ataques ou testes disruptivos.",
      "Sanitizar evidências."
    ],
    "expectedDeliverables": [
      "Matriz de riscos",
      "Plano de controles",
      "Plano de logs/evidências",
      "Plano de implantação",
      "Resumo executivo"
    ],
    "gradingRubric": [
      {
        "criterion": "Riscos L2 identificados",
        "points": 25,
        "description": "Inclui ARP, MAC, portas, VLANs, trunks, STP e broadcast."
      },
      {
        "criterion": "Controles adequados",
        "points": 25,
        "description": "Escolhe controles com impacto operacional considerado."
      },
      {
        "criterion": "Evidências e validação",
        "points": 20,
        "description": "Define comandos, logs e critérios de sucesso."
      },
      {
        "criterion": "Implantação segura",
        "points": 20,
        "description": "Inclui piloto, rollback e comunicação."
      },
      {
        "criterion": "Clareza e sanitização",
        "points": 10,
        "description": "Relatório técnico sem dados sensíveis desnecessários."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos segmentos e ativos. Depois identificamos mecanismos de L2 que podem ser abusados ou falhar. Em seguida associamos controles graduais e evidências. Por fim, planejamos implantação sem quebrar dispositivos legados.",
    "steps": [
      "Listar VLANs e funções.",
      "Mapear portas públicas, trunks e dispositivos críticos.",
      "Associar riscos: ARP, MAC, VLAN, STP, portas e broadcast.",
      "Escolher controles: DHCP snooping, DAI, port security, BPDU Guard, storm control, NAC/802.1X.",
      "Definir evidências: logs de switch, NAC, DHCP, MAC table e ARP.",
      "Implantar em piloto com rollback.",
      "Sanitizar e documentar."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar todos na mesma VLAN para simplificar.",
        "whyItIsWrong": "Aumenta broadcast, movimento lateral e superfície de risco."
      },
      {
        "answer": "Ligar todos os controles de uma vez.",
        "whyItIsWrong": "Pode derrubar dispositivos legítimos e gerar incidente operacional."
      },
      {
        "answer": "Confiar apenas no firewall de borda.",
        "whyItIsWrong": "Tráfego dentro da mesma VLAN pode não passar pelo firewall."
      }
    ],
    "finalAnswer": "A solução recomendada segmenta por função, restringe trunks, protege portas de usuário, monitora anomalias, usa DAI/DHCP snooping onde viável, planeja NAC/802.1X gradualmente, mantém exceções documentadas para legados e centraliza evidências para SOC/NOC."
  },
  "glossary": [
    {
      "term": "ARP spoofing",
      "shortDefinition": "Manipulação indevida de associações IP-MAC em rede local.",
      "longDefinition": "Risco de Camada 2/3 no qual respostas ARP inconsistentes podem fazer hosts associarem um IP ao MAC errado.",
      "example": "Gateway aparece com MAC inesperado no cache ARP.",
      "relatedTerms": [
        "ARP",
        "DAI",
        "DHCP snooping"
      ],
      "relatedLessons": [
        "3.5",
        "3.6",
        "3.9"
      ]
    },
    {
      "term": "MAC flooding",
      "shortDefinition": "Presença ou geração anormal de muitos MACs que pressiona tabela do switch.",
      "longDefinition": "Condição que pode causar flooding, instabilidade ou indicar loop, bridge, hypervisor ou comportamento suspeito.",
      "example": "Uma porta de usuário aparece com centenas de MACs.",
      "relatedTerms": [
        "CAM table",
        "switch",
        "port security"
      ],
      "relatedLessons": [
        "3.3",
        "3.9"
      ]
    },
    {
      "term": "Port security",
      "shortDefinition": "Controle de switch para limitar ou regular MACs em uma porta.",
      "longDefinition": "Recurso usado para reduzir abuso de portas e controlar quantidade ou identidade de MACs permitidos.",
      "example": "Permitir no máximo dois MACs em uma porta de usuário.",
      "relatedTerms": [
        "switch",
        "MAC",
        "NAC"
      ],
      "relatedLessons": [
        "3.3",
        "3.9"
      ]
    },
    {
      "term": "DHCP snooping",
      "shortDefinition": "Controle que diferencia portas confiáveis e não confiáveis para DHCP.",
      "longDefinition": "Cria base de bindings IP-MAC-VLAN-porta que pode apoiar controles como DAI.",
      "example": "Bloquear servidor DHCP não autorizado em porta de usuário.",
      "relatedTerms": [
        "DHCP",
        "DAI",
        "IP Source Guard"
      ],
      "relatedLessons": [
        "3.9",
        "7.x"
      ]
    },
    {
      "term": "Dynamic ARP Inspection",
      "shortDefinition": "Controle que valida mensagens ARP em switches compatíveis.",
      "longDefinition": "Usa base confiável para bloquear ARP inconsistente e reduzir risco de manipulação local.",
      "example": "Bloquear ARP Reply que anuncia gateway com MAC não autorizado.",
      "relatedTerms": [
        "ARP",
        "DHCP snooping"
      ],
      "relatedLessons": [
        "3.5",
        "3.9"
      ]
    },
    {
      "term": "802.1X/NAC",
      "shortDefinition": "Controle de acesso à rede baseado em autenticação e política.",
      "longDefinition": "Permite autorizar dispositivos e usuários antes de liberar acesso à rede, geralmente com políticas por perfil.",
      "example": "Dispositivo corporativo vai para VLAN interna; desconhecido vai para quarentena.",
      "relatedTerms": [
        "identidade",
        "NAC",
        "VLAN"
      ],
      "relatedLessons": [
        "3.9"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.1Q — VLAN tagging",
      "organization": "IEEE",
      "url": "",
      "note": "Base conceitual para VLANs e trunking."
    },
    {
      "type": "standard",
      "title": "IEEE 802.1X — Port-Based Network Access Control",
      "organization": "IEEE",
      "url": "",
      "note": "Base conceitual para autenticação de acesso à rede."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Aula 3.5 ARP",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Pré-requisito direto para riscos e defesas ARP."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aprofunda relação entre identidade, dispositivo e controle de acesso."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e Operação",
      "lesson": "A definir",
      "reason": "Logs de rede, SIEM, telemetria e resposta a incidentes dependem de boa coleta operacional."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso corporativo",
      "lesson": "A definir",
      "reason": "802.1X, NAC e identidade de dispositivo conectam rede física com IAM corporativo."
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
      "3.10"
    ]
  }
};
