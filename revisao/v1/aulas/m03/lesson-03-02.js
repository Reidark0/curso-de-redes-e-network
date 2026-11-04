export const lesson0302 = {
  "id": "3.2",
  "moduleId": "m03",
  "order": 2,
  "title": "Frame Ethernet e endereço MAC",
  "subtitle": "O envelope local da LAN: origem, destino, tipo de payload e evidências de Camada 2.",
  "duration": "105-145 min",
  "estimatedStudyTimeMinutes": 145,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 210,
  "tags": [
    "redes",
    "ethernet",
    "frame",
    "mac",
    "camada 2",
    "wireshark",
    "switch",
    "arp",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.1",
      "reason": "É necessário entender Ethernet como base da LAN antes de abrir o frame."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.4",
      "reason": "A aula depende do entendimento de Camada 2, frames, MAC, switch e ARP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "MAC e EtherType são representados em hexadecimal."
    }
  ],
  "objectives": [
    "Explicar por que frames Ethernet existem e qual problema resolvem na LAN.",
    "Identificar os principais campos de um frame Ethernet.",
    "Diferenciar endereço MAC de endereço IP e entender o escopo local do MAC.",
    "Interpretar unicast, broadcast e multicast em cenários básicos.",
    "Relacionar MAC e frame com switch, ARP, VLAN, troubleshooting e segurança defensiva."
  ],
  "learningOutcomes": [
    "Dado um frame Ethernet simplificado, o aluno identifica MAC de origem, MAC de destino, EtherType, payload e FCS.",
    "Dado um fluxo host-gateway, o aluno explica por que o MAC de destino local pode ser o gateway e não o servidor final.",
    "Dado um MAC em evidência, o aluno evita tratá-lo como identidade forte sem correlação.",
    "Dado um problema de LAN, o aluno sabe coletar MAC local, ARP, gateway e evidências de switch de forma segura."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>Você abre uma captura no Wireshark e vê a linha <code>Ethernet II, Src: 3c:52:82:aa:10:22, Dst: ff:ff:ff:ff:ff:ff</code>. Para quem entende Camada 2, ela já conta uma história: qual interface enviou, para quem a entrega local se destina (aqui, todos os hosts do segmento, porque é um broadcast) e, no campo seguinte, qual protocolo vai dentro.</p>\n<p>O frame Ethernet é a unidade de entrega local, e o endereço MAC é o identificador de interface usado nessa entrega. Switch, tabela MAC, ARP, VLAN, flooding e port security, os temas das próximas aulas, dependem de você saber ler esses dois elementos.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um SOC observa tráfego estranho vindo de um MAC desconhecido, mas o IP muda ao longo do dia. Quem só olha IP perde a pista. Quem sabe interpretar MAC, OUI, porta de switch, VLAN e frame consegue relacionar evidências de rede, inventário e segurança física.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>No meio físico há só uma sequência de sinais. Sem uma estrutura, o receptor não saberia onde a mensagem começa e termina, a quem ela se destina nem qual protocolo deve processá-la. O frame resolve isso, e cada campo dele tem um motivo:</p>\n<ul class=\"flow-list\"><li><strong>Sem frame:</strong> os bits não formariam uma unidade de entrega local interpretável.</li><li><strong>Sem MAC de destino:</strong> o switch não teria critério para encaminhar o quadro.</li><li><strong>Sem MAC de origem:</strong> o switch não aprenderia em qual porta está cada interface.</li><li><strong>Sem EtherType:</strong> o receptor não saberia se o payload carrega IPv4, IPv6, ARP ou outro protocolo.</li><li><strong>Sem FCS:</strong> um quadro corrompido na transmissão seria entregue como se estivesse íntegro.</li></ul>\n<p>O frame resolve só a entrega local dentro de um domínio de Camada 2. Ele não roteia entre redes, não garante identidade forte, não criptografa, não autentica usuário e não substitui firewall.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<p>Um <strong>frame Ethernet</strong> é a unidade de dados da Camada 2 que a Ethernet usa para transportar informações dentro de uma rede local. Ele tem campos de endereçamento e controle e um payload com os dados das camadas superiores. O frame não é o pacote IP: ele <em>carrega</em> o pacote IP, que por sua vez carrega o segmento TCP.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> endereço MAC é um identificador de 48 bits (6 bytes) associado a uma interface de rede, usado como endereço local de Camada 2 em tecnologias como Ethernet.</div>\n<p>O MAC é escrito em hexadecimal, em seis pares, como <code>3c:52:82:aa:10:22</code> (o Windows usa hífens: <code>3C-52-82-AA-10-22</code>). Ele serve para entregar frames na LAN, mas não é identidade forte de usuário nem de dispositivo: pode ser alterado em software, clonado ou gerado por virtualização.</p>\n<h3>Como ler um MAC</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Parte</th><th>Onde fica</th><th>O que indica</th></tr></thead><tbody>\n<tr><td>OUI</td><td>3 primeiros bytes (24 bits)</td><td>Fabricante ou organização que recebeu o prefixo. Sugere o fabricante, mas não prova posse nem identidade.</td></tr>\n<tr><td>Bit I/G</td><td>bit menos significativo do 1º byte</td><td>0 = individual (unicast); 1 = grupo (multicast ou broadcast). Atalho: 2º dígito hex ímpar indica grupo.</td></tr>\n<tr><td>Bit U/L</td><td>2º bit menos significativo do 1º byte</td><td>0 = universal (gravado pelo fabricante); 1 = administrado localmente, como em VMs e no MAC aleatório de privacidade. Num unicast local, o 2º dígito hex é 2, 6, A ou E.</td></tr>\n</tbody></table></div>\n<h3>Unicast, broadcast e multicast</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Destino</th><th>Exemplo</th><th>Quem processa</th><th>Uso típico</th></tr></thead><tbody>\n<tr><td>Unicast</td><td><code>3c:52:82:aa:10:22</code> (0x3c é par)</td><td>Uma única interface</td><td>Tráfego normal, como host → gateway</td></tr>\n<tr><td>Broadcast</td><td><code>ff:ff:ff:ff:ff:ff</code></td><td>Todos os hosts do domínio de broadcast (a VLAN)</td><td>ARP Request, DHCP Discover</td></tr>\n<tr><td>Multicast</td><td><code>01:00:5e:00:00:fb</code> (IPv4), <code>33:33:00:00:00:01</code> (IPv6)</td><td>Interfaces inscritas no grupo; sem IGMP snooping, o switch inunda o frame na VLAN</td><td>mDNS, descoberta de vizinhos IPv6</td></tr>\n</tbody></table></div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<h3>Campos do frame Ethernet II</h3>\n<p>Ethernet II é o formato da maioria das capturas. Cada campo orienta uma decisão:</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>Tamanho</th><th>Função</th><th>O que observar</th></tr></thead><tbody>\n<tr><td>Preâmbulo + SFD</td><td>8 bytes</td><td>Sincroniza o receptor e marca o início do frame.</td><td>Camada física: não aparece em capturas; falhas físicas aparecem nos contadores da interface.</td></tr>\n<tr><td>MAC de destino</td><td>6 bytes</td><td>Destinatário local; o switch usa para escolher a porta de saída.</td><td>Pode ser unicast, multicast ou broadcast; interprete junto com a VLAN.</td></tr>\n<tr><td>MAC de origem</td><td>6 bytes</td><td>Interface que enviou; o switch usa para aprender a porta.</td><td>Pode ser alterado em software ou ser virtual.</td></tr>\n<tr><td>Tag 802.1Q (opcional)</td><td>4 bytes</td><td>Identifica a VLAN em trunks. Fica entre o MAC de origem e o EtherType e começa com 0x8100.</td><td>Configuração errada vaza ou isola tráfego.</td></tr>\n<tr><td>EtherType</td><td>2 bytes</td><td>Protocolo do payload: 0x0800 = IPv4, 0x0806 = ARP, 0x86DD = IPv6.</td><td>Útil em filtros; não diz se o conteúdo é seguro.</td></tr>\n<tr><td>Payload</td><td>46 a 1500 bytes (sem jumbo frames)</td><td>Pacote IP, mensagem ARP etc. Abaixo de 46 bytes, a placa completa com preenchimento (padding).</td><td>Pode conter dados sensíveis se a camada superior não criptografar.</td></tr>\n<tr><td>FCS</td><td>4 bytes (32 bits)</td><td>CRC calculado sobre o frame; o receptor recalcula e descarta o frame se não bater.</td><td>Só detecta, não corrige. Erros CRC/FCS no switch apontam cabo, porta, transceptor ou interferência.</td></tr>\n</tbody></table></div>\n<p>Sem preâmbulo e sem tag, um frame tem de 64 a 1518 bytes (6 + 6 + 2 + 46…1500 + 4). Numa captura feita no próprio host, o FCS muitas vezes também não aparece, porque a placa o confere e o remove antes de entregar o frame ao sistema.</p>\n<h3>Do envio à entrega</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Passo</th><th>O que acontece</th><th>O que pode falhar</th></tr></thead><tbody>\n<tr><td>1. Host escolhe o próximo salto</td><td>Destino na mesma sub-rede: o próprio host. Fora dela: o gateway.</td><td>Máscara ou gateway configurados errado.</td></tr>\n<tr><td>2. Host descobre o MAC</td><td>Em IPv4, consulta o cache ARP ou envia um ARP Request em broadcast.</td><td>Cache obsoleto, resposta inconsistente, VLAN errada.</td></tr>\n<tr><td>3. NIC monta e transmite</td><td>Preenche os campos e transmite como sinais no meio físico.</td><td>Interface down, driver, cabo ruim.</td></tr>\n<tr><td>4. Switch encaminha</td><td>Lê o MAC de origem e atualiza a tabela MAC; lê o MAC de destino e escolhe a porta.</td><td>Flooding, tabela instável, loop, porta em VLAN errada.</td></tr>\n<tr><td>5. Destino recebe</td><td>Confere o FCS e entrega o payload ao protocolo indicado pelo EtherType.</td><td>FCS inválido (frame descartado) ou destino fora do domínio de broadcast.</td></tr>\n</tbody></table></div>\n<div class=\"callout warning\"><strong>Erros comuns</strong><ul><li><strong>Confundir MAC com IP:</strong> o MAC entrega o frame na LAN; o IP endereça logicamente entre redes.</li><li><strong>Achar que o MAC do servidor final aparece no frame:</strong> os MACs mudam a cada enlace roteado; os IPs de origem e destino permanecem no pacote.</li><li><strong>Tratar o MAC como a identidade de uma pessoa:</strong> ele é evidência de interface; correlacione com porta, VLAN, autenticação e logs.</li><li><strong>Ver todo broadcast como ataque:</strong> ARP e DHCP usam broadcast legitimamente; avalie volume, origem e padrão.</li></ul></div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2>\n<p>Numa rede corporativa, frames Ethernet circulam em enlaces de acesso, uplinks, trunks, servidores, hypervisors e switches virtuais. Saber o papel de cada componente diante do frame mostra onde procurar um problema:</p>\n<ul class=\"flow-list\"><li><strong>Host:</strong> tem uma NIC com MAC físico ou virtual.</li><li><strong>Switch de acesso:</strong> aprende MACs por porta e encaminha frames.</li><li><strong>VLAN:</strong> separa domínios lógicos de Camada 2; um broadcast não sai da VLAN.</li><li><strong>Gateway:</strong> recebe os frames destinados ao seu MAC quando o tráfego precisa sair da rede local.</li><li><strong>Firewall:</strong> pode ver o frame no enlace local, mas normalmente aplica política nas camadas superiores.</li><li><strong>NAC/802.1X:</strong> pode usar porta, MAC e identidade para controlar acesso; o MAC isolado não basta.</li></ul>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n<p>Pense no frame Ethernet como um envelope de malote interno de um prédio. Ele não traz o endereço completo da cidade, só a sala de origem e a sala de destino dentro daquele prédio. O switch é a recepção que sabe em qual corredor fica cada sala.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> o envelope não viaja até a cidade de destino. A cada salto roteado, o pacote IP é colocado num novo frame, com MACs diferentes.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Seu notebook quer acessar o roteador doméstico em <code>192.168.1.1</code>. Antes de enviar o pacote IP, ele precisa mandar um frame para o MAC da interface LAN do roteador. Se não souber esse MAC, usa ARP. Quando descobre, monta um frame Ethernet com o MAC da sua placa na origem e o MAC do roteador no destino.</p>\n<p>Ao rodar <code>arp -a</code>, você vê a associação entre o IP do gateway e um endereço físico. Ela não representa a internet: é só a entrega local até o gateway. Ao acessar um site externo, o MAC de destino continua sendo o do gateway; depois dele, o pacote segue por outros enlaces, cada um com seus próprios frames.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n<p>Numa empresa, um notebook ligado à tomada de rede acessa um sistema interno pelo caminho notebook → tomada → patch panel → switch de acesso → firewall/gateway → servidor. No primeiro trecho, o frame leva o pacote até o próximo equipamento local. O switch aprende o MAC do notebook numa porta específica e usa a tabela MAC para encaminhar os frames de retorno.</p>\n<p>Três leituras úteis no dia a dia:</p>\n<ul><li>Notebook ligado numa porta sem documentação pode cair na VLAN errada.</li><li>MAC ausente da tabela do switch: talvez falte link, autenticação, VLAN correta ou simplesmente tráfego.</li><li>MAC alternando rapidamente entre portas: pode ser loop, mobilidade, virtualização, docking station, spoofing ou erro operacional.</li></ul>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud</h2>\n<p>Em cloud pública, você não administra switches físicos nem vê broadcast Ethernet como numa LAN local. Cada máquina virtual tem interfaces e MACs virtuais, e uma rede definida por software por trás, que o provedor abstrai para que clientes não compartilhem o mesmo domínio de broadcast.</p>\n<p>Isso pesa em migrações: sistemas legados que dependem de broadcast, descoberta em Camada 2 ou de um MAC específico podem não funcionar igual na cloud. Em ambientes locais e híbridos (hypervisors, bridges Linux, redes Docker, appliances virtuais, runners self-hosted), o raciocínio de Camada 2 volta: um pipeline pode falhar ao baixar artefatos porque a interface virtual do runner está na VLAN errada ou fora do bridge correto, e não por erro no código.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m03l02-title m03l02-desc\">\n<title id=\"m03l02-title\">Frame Ethernet e endereço MAC</title>\n<desc id=\"m03l02-desc\">Diagrama mostra um host enviando um frame Ethernet para o gateway através de um switch, com campos de MAC de destino, MAC de origem, EtherType, payload e FCS.</desc>\n<defs><marker id=\"m03l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path></marker></defs>\n<rect x=\"40\" y=\"90\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\"></rect><text x=\"115\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Host</text><text x=\"115\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC A</text>\n<rect x=\"410\" y=\"90\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect><text x=\"490\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Switch</text><text x=\"490\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela MAC</text>\n<rect x=\"790\" y=\"90\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\"></rect><text x=\"865\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"865\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC B</text>\n<line x1=\"190\" y1=\"125\" x2=\"410\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l02-arrow)\"></line>\n<line x1=\"570\" y1=\"125\" x2=\"790\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l02-arrow)\"></line>\n<rect x=\"100\" y=\"240\" width=\"125\" height=\"52\" rx=\"8\" class=\"svg-node\"></rect><text x=\"162\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dst MAC B</text>\n<rect x=\"225\" y=\"240\" width=\"125\" height=\"52\" rx=\"8\" class=\"svg-node\"></rect><text x=\"287\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Src MAC A</text>\n<rect x=\"350\" y=\"240\" width=\"115\" height=\"52\" rx=\"8\" class=\"svg-node\"></rect><text x=\"407\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">EtherType</text>\n<rect x=\"465\" y=\"240\" width=\"245\" height=\"52\" rx=\"8\" class=\"svg-node svg-node--server\"></rect><text x=\"587\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Payload: IP / ARP / IPv6</text>\n<rect x=\"710\" y=\"240\" width=\"95\" height=\"52\" rx=\"8\" class=\"svg-node svg-node--security\"></rect><text x=\"757\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">FCS</text>\n<text x=\"490\" y=\"220\" text-anchor=\"middle\" class=\"svg-label\">Frame Ethernet: envelope local da LAN</text>\n<path d=\"M160 292 C240 360, 710 360, 760 292\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m03l02-arrow)\"></path>\n<text x=\"490\" y=\"385\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">A cada salto roteado, os MACs locais podem mudar; o IP de origem/destino permanece no pacote.</text>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul><li><strong>Ideia central:</strong> o frame é o envelope local da LAN. O MAC leva o frame até a próxima interface do enlace; o IP leva o pacote até o destino final. A cada salto roteado, os MACs mudam e os IPs permanecem.</li><li><strong>Campos:</strong> MAC de destino (6 bytes), MAC de origem (6), EtherType (2), payload (46–1500) e FCS (4); a tag 802.1Q opcional soma 4.</li><li><strong>Tipo de destino:</strong> <code>ff:ff:ff:ff:ff:ff</code> é broadcast; bit I/G = 1 no primeiro byte indica multicast; 0 indica unicast.</li><li><strong>Fora da sub-rede:</strong> o MAC de destino é o do gateway, não o do servidor final.</li><li><strong>Segurança:</strong> MAC é evidência de interface, não identidade forte; correlacione com porta, VLAN, DHCP, NAC, inventário e logs.</li></ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>Na próxima aula, você vai ver como switches aprendem endereços MAC, fazem forwarding e por que o flooding acontece. O frame e o MAC desta aula são a matéria-prima da tabela MAC.</p>\n</section>\n"
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
      "IPv4",
      "IPv6",
      "802.1Q",
      "STP"
    ],
    "dependsOn": [
      "Ethernet",
      "Modelo OSI",
      "Binário e hexadecimal",
      "Camada 2"
    ],
    "enables": [
      "Switching",
      "Tabela MAC",
      "ARP",
      "VLAN",
      "Port Security",
      "Análise de captura"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Host não aparece na tabela MAC do switch.",
      "Gateway não aparece em arp -a.",
      "Tráfego chega por flooding ou VLAN errada.",
      "MAC aparece em porta inesperada.",
      "CRC/FCS errors em interface gerenciável."
    ],
    "diagnosticQuestions": [
      "A interface tem link físico?",
      "Qual é o MAC local do host?",
      "O gateway aparece na tabela ARP?",
      "O switch aprendeu o MAC em qual porta e VLAN?",
      "Há mudança recente de cabo, docking station, VM ou VLAN?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "getmac /v\nipconfig /all\narp -a",
        "purpose": "Ver MAC local, IP, gateway, DNS e cache ARP.",
        "expectedObservation": "Interface ativa com endereço físico e gateway associado a um MAC.",
        "interpretation": "Ajuda a correlacionar host, IP, MAC e próximo salto local."
      },
      {
        "platform": "Linux",
        "command": "ip link\nip addr\nip neigh\nip route",
        "purpose": "Ver interfaces, MAC, endereços IP, vizinhos e rota default.",
        "expectedObservation": "Interface UP, MAC local e vizinho do gateway em REACHABLE/STALE.",
        "interpretation": "Se não há vizinho para o gateway, investigue Camada 2, ARP, VLAN ou gateway."
      },
      {
        "platform": "Cisco IOS",
        "command": "show mac address-table\nshow interfaces status\nshow interfaces counters errors\nshow arp",
        "purpose": "Correlacionar MACs, portas, VLANs, status de link, erros e ARP.",
        "expectedObservation": "MAC do host aprendido na porta e VLAN corretas, sem erros excessivos.",
        "interpretation": "Porta errada, VLAN errada ou erros físicos apontam para causa operacional."
      }
    ],
    "decisionTree": [
      {
        "if": "Interface sem link",
        "then": "Investigar cabo, porta, NIC, PoE, patch panel e switch antes de IP."
      },
      {
        "if": "Host tem IP, mas gateway não aparece no ARP",
        "then": "Verificar VLAN, máscara, gateway, ARP bloqueado ou gateway indisponível."
      },
      {
        "if": "MAC aparece em porta diferente da documentação",
        "then": "Validar mudança física, docking, VM, switch intermediário ou risco de spoofing."
      },
      {
        "if": "Há muitos broadcasts",
        "then": "Medir volume, identificar origem e avaliar ARP, loop, falha ou desenho de VLAN."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Correlacionar MAC com porta, VLAN, NAC, DHCP, firewall e inventário antes de concluir algo.",
      "Monitorar mudanças incomuns de MAC por porta.",
      "Sanitizar capturas antes de compartilhar."
    ],
    "badPractices": [
      "Usar MAC allowlist como único controle de segurança.",
      "Deixar tomadas em áreas públicas ativas sem controle.",
      "Investigar incidente apenas por IP, sem olhar a Camada 2.",
      "Compartilhar PCAPs completos sem remover dados sensíveis."
    ],
    "commonErrors": [
      "Confundir evidência técnica com prova de identidade.",
      "Ignorar MACs virtuais de VMs, containers e docking stations no inventário.",
      "Não documentar VLAN, porta física e uplinks de ativos críticos.",
      "Achar que switches não precisam de monitoramento."
    ],
    "vulnerabilities": [
      {
        "name": "MAC spoofing",
        "description": "Alteração do MAC apresentado por uma interface.",
        "defensiveExplanation": "Pode confundir inventário e controles fracos baseados apenas em MAC.",
        "mitigation": "802.1X, NAC, port security, correlação de logs e inventário confiável."
      },
      {
        "name": "MAC flooding",
        "description": "Excesso de MACs aprendidos pode afetar tabela MAC do switch.",
        "defensiveExplanation": "O risco defensivo é degradação e flooding em segmentos mal protegidos.",
        "mitigation": "Limite de MAC por porta, monitoramento, switches gerenciáveis e segmentação."
      },
      {
        "name": "Rede plana",
        "description": "Muitos ativos no mesmo domínio de broadcast.",
        "defensiveExplanation": "Amplia o alcance de broadcasts e a superfície de movimento lateral: tudo o que está na VLAN se enxerga em Camada 2.",
        "mitigation": "VLANs por função, ACLs, firewall interno e menor privilégio."
      },
      {
        "name": "Portas físicas expostas",
        "description": "Tomadas de rede ativas em áreas públicas ou sem controle.",
        "defensiveExplanation": "Qualquer pessoa com um cabo ganha acesso à LAN, e o MAC que ela apresentar pode ser qualquer um.",
        "mitigation": "Desativar portas ociosas, 802.1X/NAC, controle físico de racks e tomadas e alertas de link novo."
      },
      {
        "name": "Exposição de captura",
        "description": "PCAPs podem conter MACs, IPs, nomes internos e payloads.",
        "defensiveExplanation": "Evidências são úteis, mas podem revelar topologia e dados sensíveis.",
        "mitigation": "Sanitizar, reduzir escopo, proteger armazenamento e controlar acesso."
      }
    ],
    "monitoring": [
      "Mudança de MAC por porta.",
      "Quantidade anormal de MACs em uma mesma porta.",
      "Broadcast acima do padrão histórico.",
      "Erros CRC/FCS em interfaces críticas.",
      "Alertas NAC e autenticação 802.1X."
    ],
    "hardening": [
      "Port security (limite de MACs) em portas de acesso.",
      "802.1X/NAC.",
      "VLANs por função.",
      "Desativação de portas ociosas.",
      "Controle físico de racks e tomadas."
    ],
    "detectionIdeas": [
      "Comparar tabela MAC com inventário.",
      "Alertar MAC desconhecido em VLAN sensível.",
      "Correlacionar DHCP lease, switchport e EDR.",
      "Revisar PCAPs defensivos com filtros de escopo mínimo."
    ]
  },
  "lab": {
    "id": "lab-3.2",
    "title": "Observando MAC, ARP e evidências do frame Ethernet",
    "labType": "local",
    "objective": "Coletar evidências locais de Camada 2 e entender como MAC, ARP e gateway se relacionam em uma LAN.",
    "scenario": "Você está em um notebook conectado a uma rede comum e precisa documentar, de forma defensiva, qual é o MAC local, qual é o gateway, qual MAC está associado ao gateway e quais evidências seriam úteis para uma equipe de redes.",
    "topology": "Host do aluno -> switch/AP doméstico ou corporativo -> gateway local -> demais redes",
    "architecture": "Um host com interface Ethernet ou Wi-Fi usando IPv4, gateway padrão e resolução ARP/neighbor local. Em Wi-Fi o meio muda, mas a ideia de endereço de enlace e de próximo salto local é a mesma.",
    "prerequisites": [
      "Ter concluído as aulas 3.1, 2.4 e 1.9.",
      "Ter acesso ao terminal local."
    ],
    "tools": [
      "Windows PowerShell ou Prompt",
      "Terminal Linux",
      "Opcional: Wireshark",
      "Opcional: equipamento Cisco em laboratório autorizado"
    ],
    "estimatedTimeMinutes": 40,
    "cost": "zero",
    "safetyNotes": [
      "Não altere o MAC da interface nem execute varreduras ou testes ofensivos.",
      "Capture só na sua própria rede ou em ambiente autorizado; em rede corporativa, colete apenas evidências permitidas.",
      "Não compartilhe MACs, IPs públicos, nomes internos ou capturas sem sanitização."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar o MAC local",
        "instruction": "Liste as interfaces e anote o endereço físico da interface que está em uso (Windows ou Linux).",
        "command": "getmac /v\nipconfig /all      # Windows\nip link\nip addr            # Linux",
        "expectedOutput": "No Windows: nome da interface, Endereço Físico (ex.: 3C-52-82-AA-10-22), IPv4, máscara, gateway e DNS. No Linux: interfaces com link/ether, estado UP/DOWN e endereços IP.",
        "explanation": "O MAC local é o endereço de enlace da interface naquela rede (no Linux, campo link/ether). Se o 2º dígito hex for 2, 6, A ou E, ele é administrado localmente, por exemplo aleatório de privacidade."
      },
      {
        "number": 2,
        "title": "Descobrir o gateway padrão",
        "instruction": "Identifique a rota default para saber o próximo salto local.",
        "command": "route print   # Windows\nip route      # Linux",
        "expectedOutput": "Rota default apontando para o gateway local.",
        "explanation": "Quando o destino está fora da rede local, o frame normalmente vai para o MAC do gateway."
      },
      {
        "number": 3,
        "title": "Observar a associação IP-MAC do gateway",
        "instruction": "Liste o cache ARP/neighbor e procure o IP do gateway.",
        "command": "arp -a       # Windows\nip neigh    # Linux",
        "expectedOutput": "IP do gateway associado a um endereço físico/MAC.",
        "explanation": "Essa associação mostra qual MAC local receberá frames destinados ao próximo salto."
      },
      {
        "number": 4,
        "title": "Gerar tráfego legítimo mínimo",
        "instruction": "Faça um ping simples para o gateway ou para um destino autorizado para atualizar a tabela local.",
        "command": "ping <IP_DO_GATEWAY>",
        "expectedOutput": "Respostas do gateway ou tentativa registrada; tabela ARP atualizada.",
        "explanation": "O objetivo é observar evidência local, não testar terceiros."
      },
      {
        "number": 5,
        "title": "Opcional: ler os campos de um frame no Wireshark",
        "instruction": "Capture alguns segundos na interface do caminho real, aplique o filtro arp (ou eth.dst == ff:ff:ff:ff:ff:ff), abra um frame e expanda a linha Ethernet II. Sem ARP, use um frame IPv4 qualquer.",
        "command": "arp\neth.dst == ff:ff:ff:ff:ff:ff",
        "expectedOutput": "Ethernet II com Destination, Source e Type. Num ARP Request: Destination ff:ff:ff:ff:ff:ff e Type ARP (0x0806). Num frame IPv4: Type IPv4 (0x0800).",
        "explanation": "São os campos da tabela da aula. Preâmbulo e SFD nunca aparecem, e o FCS geralmente também não."
      },
      {
        "number": 6,
        "title": "Em laboratório Cisco autorizado",
        "instruction": "Se você tiver um switch Cisco de laboratório, correlacione MAC e porta.",
        "command": "show mac address-table\nshow interfaces status\nshow arp",
        "expectedOutput": "MACs aprendidos por VLAN/porta e status das interfaces.",
        "explanation": "Essa é a visão do switch, essencial para correlacionar host físico com porta e VLAN."
      },
      {
        "number": 7,
        "title": "Sanitizar evidências",
        "instruction": "Monte uma tabela com MAC local, IP, gateway, MAC do gateway e interface usada, mascarando os octetos finais de MACs e IPs e sem nomes sensíveis.",
        "expectedOutput": "Relatório com MACs parcialmente mascarados (ex.: 3c:52:82:xx:xx:xx), IPs internos reduzidos e sem nomes sensíveis.",
        "explanation": "Evidência técnica precisa ser útil sem expor dados desnecessários. Manter o OUI permite discutir o fabricante sem revelar a interface."
      }
    ],
    "expectedResult": "O aluno deve conseguir explicar qual é o MAC local, qual é o gateway, qual MAC representa o próximo salto e por que esse MAC não é necessariamente o servidor final acessado.",
    "validation": [
      {
        "check": "MAC local identificado",
        "command": "getmac /v ou ip link",
        "expected": "Interface ativa com endereço físico/link/ether.",
        "ifFails": "Verifique se a interface correta está ativa ou se você está olhando adaptador virtual errado."
      },
      {
        "check": "Gateway identificado",
        "command": "route print ou ip route",
        "expected": "Rota default com gateway local.",
        "ifFails": "Verifique se há conectividade, DHCP ou configuração manual."
      },
      {
        "check": "Gateway aparece em ARP/neighbor",
        "command": "arp -a ou ip neigh",
        "expected": "IP do gateway associado a MAC.",
        "ifFails": "Faça ping para o gateway; se persistir, investigue VLAN, gateway ou bloqueio local."
      },
      {
        "check": "Relatório sanitizado",
        "command": "Revisão manual",
        "expected": "Sem MAC completo, IP público, nomes internos ou tokens.",
        "ifFails": "Remova dados sensíveis antes de compartilhar."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Vários adaptadores aparecem",
        "probableCause": "VPN, WSL, Docker, virtualização ou Wi-Fi/Ethernet simultâneos.",
        "howToConfirm": "Compare rota default e interface usada.",
        "fix": "Documentar apenas a interface do caminho real."
      },
      {
        "symptom": "MAC muda entre testes",
        "probableCause": "Randomização de MAC, adaptador diferente, VM, docking station ou política de privacidade.",
        "howToConfirm": "Verifique configurações da interface e inventário.",
        "fix": "Registrar contexto e correlacionar com porta/VLAN quando possível."
      },
      {
        "symptom": "Comando Cisco não mostra o MAC esperado",
        "probableCause": "Porta errada, VLAN errada, MAC expirado da tabela (aging), switch intermediário ou falta de tráfego.",
        "howToConfirm": "Gerar tráfego autorizado e verificar VLAN/porta.",
        "fix": "Validar caminho físico, documentação e domínio de broadcast."
      }
    ],
    "improvements": [
      "Repetir o laboratório em Ethernet cabeada e em Wi-Fi e comparar as evidências.",
      "Comparar MAC físico, MAC virtual de VM e MAC de container bridge (veja o bit U/L)."
    ],
    "evidenceToCollect": [
      "MAC local parcialmente mascarado.",
      "IP e gateway parcialmente mascarados.",
      "Saída de arp -a ou ip neigh sanitizada.",
      "Descrição da interface usada.",
      "Opcional: campos Destination, Source e Type de um frame capturado.",
      "Hipótese sobre o próximo salto local."
    ],
    "questions": [
      "Por que o MAC do gateway aparece quando acesso um site externo?",
      "O que muda quando estou em Wi-Fi?"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que o frame Ethernet precisa de MAC de origem e MAC de destino se o pacote IP já tem IP de origem e destino?",
      "hints": [
        "Pense no escopo local da LAN.",
        "Pense no papel do switch."
      ],
      "expectedIdeas": [
        "entrega local",
        "switch",
        "tabela MAC",
        "encapsulamento"
      ],
      "explanation": "IP resolve endereçamento lógico entre redes; MAC resolve entrega local no enlace atual."
    },
    {
      "type": "diagnóstico",
      "question": "Um host tem IP correto, mas o gateway não aparece em ARP. O que você investigaria antes de culpar DNS?",
      "hints": [
        "Pense em Camada 1, 2 e 3.",
        "Pense em VLAN e gateway."
      ],
      "expectedIdeas": [
        "link",
        "VLAN",
        "máscara",
        "gateway",
        "ARP",
        "porta de switch"
      ],
      "explanation": "Sem alcançar o gateway local, DNS ainda nem é a primeira hipótese."
    },
    {
      "type": "diagnóstico",
      "question": "O mesmo MAC aparece na porta Gi1/0/5 e, minutos depois, na Gi1/0/12, alternando. Que hipóteses você levanta e que evidência separa cada uma?",
      "hints": [
        "Liste causas legítimas antes de pensar em ataque.",
        "Pense no que está fisicamente ligado em cada porta."
      ],
      "expectedIdeas": [
        "loop de Camada 2",
        "mobilidade ou docking station",
        "VM migrando entre hosts",
        "switch ou AP intermediário",
        "MAC spoofing",
        "documentação das portas e logs do switch"
      ],
      "explanation": "O switch registra a porta pelo MAC de origem do último frame. Duas portas significam dois caminhos (loop), interface que mudou de lugar (mobilidade, VM, docking) ou duas interfaces com o mesmo MAC (spoofing). O que está ligado em cada porta e o histórico de mudanças separam as hipóteses."
    }
  ],
  "quiz": [
    {
      "id": "q3.2.2",
      "question": "Qual afirmação diferencia corretamente MAC e IP?",
      "options": [
        "MAC é usado pelos roteadores entre redes; IP só dentro da LAN",
        "MAC faz a entrega local no enlace; IP faz o endereçamento lógico entre redes",
        "MAC e IP mudam juntos a cada salto roteado",
        "O IP substitui o MAC quando o destino está na mesma sub-rede"
      ],
      "answer": 1,
      "explanation": "O MAC tem escopo de enlace e muda a cada salto roteado; o IP permanece no pacote até o destino.",
      "topic": "mac-ip",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q3.2.3",
      "question": "Ao acessar um site externo, qual MAC normalmente aparece como destino no frame saindo do seu host?",
      "options": [
        "O MAC do servidor DNS configurado",
        "O MAC do servidor final na internet",
        "O MAC do gateway local",
        "O endereço de broadcast ff:ff:ff:ff:ff:ff"
      ],
      "answer": 2,
      "explanation": "Destino fora da sub-rede: o frame vai ao gateway; o IP de destino continua sendo o do servidor.",
      "topic": "gateway",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q3.2.4",
      "question": "Por que MAC não deve ser usado sozinho como controle forte de segurança?",
      "options": [
        "Porque pode ser alterado, clonado ou virtualizado e precisa de correlação",
        "Porque muda a cada salto dentro da própria LAN",
        "Porque o switch o criptografa e ninguém consegue lê-lo",
        "Porque só aparece em frames de broadcast"
      ],
      "answer": 0,
      "explanation": "O MAC pode ser spoofado, clonado ou virtual; combine NAC/802.1X com porta, VLAN, DHCP e logs.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q3.2.5",
      "question": "Qual campo indica se o payload do frame carrega IPv4, IPv6 ou ARP?",
      "options": [
        "Preâmbulo/SFD",
        "FCS",
        "OUI do MAC de origem",
        "EtherType"
      ],
      "answer": 3,
      "explanation": "O EtherType identifica o protocolo do payload (0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP). O FCS detecta erros, o OUI indica fabricante e o preâmbulo sincroniza o receptor.",
      "topic": "ethertype",
      "difficulty": "iniciante",
      "type": "campo técnico"
    },
    {
      "id": "q3.2.6",
      "question": "Se a tabela MAC do switch não mostra o MAC do host em uma porta, qual hipótese inicial é razoável?",
      "options": [
        "Servidor DNS fora do ar",
        "Sem link ou sem tráfego, porta errada, VLAN errada ou documentação incorreta",
        "EtherType incompatível com o switch",
        "Certificado TLS do servidor expirado"
      ],
      "answer": 1,
      "explanation": "O switch aprende o MAC pelo tráfego que chega à porta; a ausência aponta para Camada 1/2 ou para a operação.",
      "topic": "switch",
      "difficulty": "intermediário",
      "type": "troubleshooting"
    },
    {
      "id": "q3.2.7",
      "type": "campo técnico",
      "question": "Um frame tem MAC de destino 01:00:5e:00:00:fb. Como ele deve ser classificado?",
      "options": [
        "Unicast para uma placa do fabricante de OUI 01:00:5e",
        "Broadcast: o destino começa com 01",
        "Multicast: o bit menos significativo do primeiro byte (0x01) é 1",
        "Unicast administrado localmente: o segundo dígito hex é 1"
      ],
      "answer": 2,
      "explanation": "Bit I/G = 1 indica grupo. Broadcast é só ff:ff:ff:ff:ff:ff; 01:00:5e é o prefixo de multicast IPv4.",
      "difficulty": "intermediário",
      "topic": "multicast"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.2.7",
      "front": "Tamanhos dos campos de um frame Ethernet II",
      "back": "MAC destino 6 bytes, MAC origem 6, EtherType 2, payload 46–1500, FCS 4. Total de 64 a 1518 bytes sem preâmbulo e sem tag 802.1Q (que acrescenta 4).",
      "tags": [
        "frame",
        "campos"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.2.2",
      "front": "O que é um endereço MAC?",
      "back": "Identificador de 48 bits (6 bytes) da interface, usado na entrega local de enlace; os 3 primeiros bytes são o OUI do fabricante.",
      "tags": [
        "mac",
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.2.3",
      "front": "O MAC atravessa a internet inteira?",
      "back": "Não. MAC tem escopo local ao enlace; a cada salto roteado os MACs locais podem mudar.",
      "tags": [
        "mac",
        "roteamento"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.2.8",
      "front": "EtherType 0x0800, 0x0806 e 0x86DD",
      "back": "IPv4, ARP e IPv6. O valor 0x8100 na mesma posição indica uma tag 802.1Q de VLAN.",
      "tags": [
        "ethertype",
        "frame"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.2.9",
      "front": "Como saber se um MAC é administrado localmente?",
      "back": "Bit U/L (2º bit menos significativo do 1º byte) = 1. Num unicast, o 2º dígito hex é 2, 6, A ou E. Comum em VMs e em MAC aleatório de privacidade.",
      "tags": [
        "mac",
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.2.6",
      "front": "O que significa ff:ff:ff:ff:ff:ff?",
      "back": "É o endereço de broadcast Ethernet, usado para alcançar todos no domínio de broadcast.",
      "tags": [
        "broadcast",
        "ethernet"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex3.2.5",
      "type": "análise de frame",
      "prompt": "Uma captura mostra: Destination ff:ff:ff:ff:ff:ff, Source 3c:52:82:aa:10:22, Type 0x0806 e 28 bytes de dados. Identifique o tipo de destino, o protocolo do payload e o que a placa faz com um payload tão curto.",
      "expectedAnswer": "Destino broadcast; origem unicast universal (OUI 3c:52:82); 0x0806 = ARP, provavelmente um ARP Request. Como 28 bytes é menos que o mínimo de 46, a placa completa com padding.",
      "explanation": "Percorre a tabela de campos: destino, origem, EtherType e payload mínimo."
    },
    {
      "id": "ex3.2.2",
      "type": "comparação",
      "prompt": "Compare MAC e IP em escopo, função e risco de interpretação.",
      "expectedAnswer": "MAC é local ao enlace e usado por switches; IP é lógico e roteável. MAC não prova identidade forte, IP também precisa de contexto.",
      "explanation": "A comparação evita confundir entrega local com roteamento."
    },
    {
      "id": "ex3.2.3",
      "type": "diagnóstico",
      "prompt": "Você acessa um servidor externo. Por que o MAC de destino no frame local tende a ser o gateway?",
      "expectedAnswer": "Porque o servidor está fora da sub-rede local; o próximo salto local é o gateway.",
      "explanation": "O pacote IP vai para o servidor, mas o frame local vai para o gateway."
    },
    {
      "id": "ex3.2.6",
      "type": "classificação",
      "prompt": "Classifique cada MAC como unicast, multicast ou broadcast e como universal ou local: a) 00:1a:2b:3c:4d:5e  b) 33:33:00:00:00:01  c) ff:ff:ff:ff:ff:ff  d) 3e:52:82:aa:10:22.",
      "expectedAnswer": "a) unicast universal (0x00). b) multicast IPv6 (0x33: I/G = 1). c) broadcast. d) unicast administrado localmente (0x3e: I/G = 0, U/L = 1), típico de VM ou MAC aleatório.",
      "explanation": "Olhe o primeiro byte: 2º dígito hex ímpar indica grupo; 2, 6, A ou E num unicast indicam administração local."
    }
  ],
  "challenge": {
    "title": "MAC desconhecido em VLAN sensível",
    "scenario": "Durante uma revisão de logs, a equipe percebe um MAC desconhecido aparecendo em uma VLAN administrativa. O endereço apareceu por poucos minutos e depois sumiu.",
    "tasks": [
      "Montar hipóteses defensivas.",
      "Listar evidências necessárias.",
      "Indicar comandos ou fontes de dados.",
      "Propor ações proporcionais.",
      "Explicar por que não se deve concluir identidade apenas pelo MAC."
    ],
    "constraints": [
      "Não executar ataque nem alteração de MAC.",
      "Não bloquear produção sem critério.",
      "Sanitizar relatório.",
      "Separar fato, hipótese e recomendação."
    ],
    "expectedDeliverables": [
      "Matriz de investigação.",
      "Lista de evidências.",
      "Plano de contenção proporcional.",
      "Resumo executivo sanitizado."
    ],
    "gradingRubric": [
      {
        "criterion": "Correlação de evidências",
        "points": 30,
        "description": "Usa switchport, VLAN, DHCP, NAC, inventário e logs."
      },
      {
        "criterion": "Raciocínio por camadas",
        "points": 25,
        "description": "Separa Camada 2, IP, identidade e aplicação."
      },
      {
        "criterion": "Segurança defensiva",
        "points": 25,
        "description": "Propõe mitigação e monitoramento sem instrução ofensiva."
      },
      {
        "criterion": "Comunicação técnica",
        "points": 20,
        "description": "Relatório claro, sanitizado e proporcional."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A primeira etapa é tratar o MAC como evidência de interface, não como identidade. Depois, correlacionar onde apareceu, em qual VLAN, em qual horário, com qual IP/DHCP, se houve autenticação NAC e se há ativo correspondente no inventário.",
    "steps": [
      "Consultar tabela MAC histórica ou logs do switch.",
      "Identificar porta, VLAN e horário.",
      "Correlacionar DHCP lease e ARP.",
      "Consultar NAC/802.1X, se existir.",
      "Verificar inventário, EDR e dono do ponto físico.",
      "Avaliar contenção: desabilitar porta, mover para VLAN de quarentena ou monitorar conforme criticidade.",
      "Registrar lacunas e melhorar controles."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Bloquear todo tráfego da rede imediatamente.",
        "whyItIsWrong": "Pode causar indisponibilidade sem evidência proporcional."
      },
      {
        "answer": "Concluir que o usuário X é culpado porque o MAC apareceu no inventário antigo.",
        "whyItIsWrong": "MAC pode mudar, ser clonado ou estar associado a docking/VM; precisa de correlação."
      },
      {
        "answer": "Ignorar porque MAC não é identidade forte.",
        "whyItIsWrong": "Embora não prove identidade, é evidência útil e pode indicar risco real."
      }
    ],
    "finalAnswer": "Uma resposta madura coleta evidências de switch, VLAN, DHCP, NAC, inventário e logs; classifica hipóteses; aplica contenção proporcional; documenta limitações; e recomenda controles como 802.1X, port security, inventário atualizado e alertas de MAC desconhecido em VLAN sensível."
  },
  "glossary": [
    {
      "term": "Frame Ethernet",
      "shortDefinition": "Unidade de dados de Camada 2 usada pela Ethernet.",
      "longDefinition": "Estrutura que contém MAC de destino, MAC de origem, tipo de payload, dados e verificação de erro para entrega local.",
      "example": "Um pacote IPv4 pode ser transportado dentro de um frame Ethernet até o gateway.",
      "relatedTerms": [
        "MAC",
        "EtherType",
        "FCS"
      ],
      "relatedLessons": [
        "2.2",
        "2.4",
        "3.1",
        "3.3"
      ]
    },
    {
      "term": "Endereço MAC",
      "shortDefinition": "Identificador de 48 bits usado por interfaces em redes Ethernet.",
      "longDefinition": "Endereço de Camada 2 usado na entrega local de frames dentro de um domínio de enlace.",
      "example": "3c:52:82:aa:10:22 é uma representação comum de MAC.",
      "relatedTerms": [
        "OUI",
        "NIC",
        "switch"
      ],
      "relatedLessons": [
        "3.2",
        "3.3"
      ]
    },
    {
      "term": "EtherType",
      "shortDefinition": "Campo que identifica o protocolo carregado no payload do frame.",
      "longDefinition": "Campo de 16 bits usado em Ethernet II para indicar protocolos como IPv4, IPv6 ou ARP.",
      "example": "0x0800 indica IPv4; 0x0806 indica ARP.",
      "relatedTerms": [
        "IPv4",
        "ARP",
        "payload"
      ],
      "relatedLessons": [
        "3.2",
        "3.5"
      ]
    },
    {
      "term": "FCS",
      "shortDefinition": "Campo de verificação de erro do frame Ethernet.",
      "longDefinition": "Frame Check Sequence ajuda a detectar corrupção no frame durante transmissão.",
      "example": "Erros CRC/FCS em interfaces podem indicar cabo ou porta com problema.",
      "relatedTerms": [
        "CRC",
        "camada física",
        "troubleshooting"
      ],
      "relatedLessons": [
        "2.3",
        "3.2"
      ]
    },
    {
      "term": "Broadcast Ethernet",
      "shortDefinition": "Frame enviado para todos no domínio de broadcast.",
      "longDefinition": "Usa o endereço ff:ff:ff:ff:ff:ff como destino para alcançar todos os hosts do domínio local.",
      "example": "ARP Request usa broadcast para perguntar quem possui determinado IP.",
      "relatedTerms": [
        "ARP",
        "domínio de broadcast"
      ],
      "relatedLessons": [
        "3.4",
        "3.5"
      ]
    },
    {
      "term": "OUI",
      "shortDefinition": "Prefixo de 24 bits (3 primeiros bytes) do MAC associado ao fabricante ou organização.",
      "longDefinition": "Organizationally Unique Identifier é o prefixo que pode indicar o fabricante original do endereço MAC.",
      "example": "O OUI pode sugerir fabricante, mas não prova posse nem identidade do dispositivo.",
      "relatedTerms": [
        "MAC",
        "inventário"
      ],
      "relatedLessons": [
        "3.2",
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
      "title": "Modelo OSI — Camada 2",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m02/lesson-02-04",
      "note": "Revisar Camada 2 antes de avançar em switches e ARP."
    },
    {
      "type": "internal-course",
      "title": "Bits, bytes, binário e hexadecimal",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m00/lesson-00-02",
      "note": "Base para interpretar MAC e EtherType em hexadecimal."
    },
    {
      "type": "official-doc",
      "title": "Wireshark User's Guide",
      "organization": "Wireshark Foundation",
      "url": "https://www.wireshark.org/docs/",
      "note": "Útil para análise defensiva de frames e protocolos."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "redes de laboratório e automação",
      "lesson": "a definir",
      "reason": "Runners, bridges, VMs e redes locais dependem de interfaces e enlaces corretamente configurados."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "controles de acesso de rede",
      "lesson": "a definir",
      "reason": "NAC, 802.1X e identidade de dispositivo complementam evidências de MAC."
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
      "3.3"
    ]
  }
};
