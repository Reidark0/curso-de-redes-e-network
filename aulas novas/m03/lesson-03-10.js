export const lesson0310 = {
  "id": "3.10",
  "moduleId": "m03",
  "order": 10,
  "title": "Revisão prática: do frame ao gateway",
  "subtitle": "Como juntar Ethernet, MAC, switch, broadcast, ARP, VLAN, STP e segurança em um fluxo real de diagnóstico.",
  "duration": "90-130 min",
  "estimatedStudyTimeMinutes": 130,
  "difficulty": "iniciante-intermediário",
  "type": "ligação/revisão",
  "xp": 225,
  "tags": [
    "redes",
    "ethernet",
    "camada 2",
    "mac",
    "switch",
    "arp",
    "vlan",
    "stp",
    "gateway",
    "troubleshooting",
    "segurança"
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
      "lesson": "3.5",
      "reason": "ARP conecta IPv4 ao MAC do próximo salto local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "VLANs definem o domínio de broadcast do fluxo local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.9",
      "reason": "A revisão inclui controles defensivos de Camada 2."
    }
  ],
  "objectives": [
    "Revisar o caminho de um frame Ethernet do host até o gateway.",
    "Relacionar MAC, ARP, switch, VLAN, broadcast, STP e controles defensivos em um único raciocínio.",
    "Criar uma matriz de diagnóstico para problemas de rede local.",
    "Separar falhas de Camada 2 de falhas de IP, DNS, TLS, HTTP e aplicação.",
    "Preparar o aluno para o Módulo 4, onde IPv4 e endereçamento serão aprofundados."
  ],
  "learningOutcomes": [
    "Dado um host sem acesso ao gateway, o aluno identifica evidências de L1, L2 e L3 em ordem.",
    "Dado um endereço IPv4 de destino, o aluno decide se o MAC necessário é do destino local ou do gateway.",
    "Dado um switch com VLANs, o aluno explica quais broadcasts ficam contidos e onde precisa haver roteamento.",
    "Dado um incidente de LAN, o aluno lista riscos e controles defensivos de L2.",
    "Dado um mini-cenário corporativo, o aluno entrega mapa físico, lógico, tabela de evidências e plano de mitigação."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>Um usuário está conectado por cabo, tem IP, mas não acessa o sistema interno. O primeiro impulso é culpar DNS, firewall, proxy ou a aplicação. Só que, antes de qualquer pacote IP chegar ao roteador, existe uma pergunta local: o host conseguiu montar e entregar um frame Ethernet ao próximo salto correto?</p><p>Esta revisão junta o Módulo 3 num raciocínio só. MAC, frame, switch, flooding, broadcast, ARP, VLAN, STP e segurança L2 formam uma cadeia. Quando um elo falha, o sintoma aparece como lentidão, perda de acesso, IP duplicado, gateway inacessível, queda de telefonia, impressora indisponível ou alerta de segurança.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> se você não entende o caminho do frame até o gateway, trata um problema de ARP como DNS, um problema de VLAN como firewall, um loop de L2 como lentidão genérica e uma porta física exposta como incidente de aplicação.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>O host não envia um pacote IP \"nu\" pelo cabo: ele encapsula os dados num frame Ethernet, define MAC de origem e destino, usa ARP quando precisa descobrir o MAC do próximo salto, entrega o frame ao switch, depende da VLAN correta e espera que a topologia não tenha loops nem bloqueios indevidos. Cada peça resolveu um problema, trouxe uma responsabilidade operacional e tem um jeito próprio de falhar:</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Peça</th><th>O que resolve → o que exige de você</th><th>Quando falha</th></tr></thead><tbody>\n<tr><td>Ethernet / MAC</td><td>Entrega local de frames → entender frames e meio físico</td><td>O frame não chega ao destino local correto</td></tr>\n<tr><td>Switch</td><td>Reduz colisões e encaminha por MAC → monitorar tabela MAC e flooding</td><td>Porta errada, flooding, MAC flapping</td></tr>\n<tr><td>ARP</td><td>Descobre o MAC de um IPv4 local → validar cache, gateway e inconsistências</td><td>O host não sabe qual MAC usar para o IP local ou o gateway</td></tr>\n<tr><td>VLAN</td><td>Separa domínios de broadcast → configurar access, trunk e roteamento inter-VLAN</td><td>O ARP Request nunca chega ao gateway esperado</td></tr>\n<tr><td>STP</td><td>Permite redundância sem loops de L2 → planejar root bridge e proteger portas</td><td>Loop ou porta bloqueada indevidamente derruba o caminho</td></tr>\n<tr><td>Controles L2</td><td>Reduzem abuso local → manter inventário, logs e exceções</td><td>Portas, ARP e tabela MAC abusados, ou controle mal planejado bloqueando tráfego legítimo</td></tr>\n</tbody></table></div>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<div class=\"definition-box\"><strong>Definição:</strong> diagnosticar do frame ao gateway é verificar se a entrega local de Camada 2 está correta antes de culpar camadas superiores como DNS, TLS, HTTP, autenticação ou aplicação.</div><p>Na prática, você acompanha o frame do host até o gateway (ou até o destino local) e, a cada decisão — VLAN, destino local ou remoto, MAC usado, porta aprendida pelo switch, flooding, loop, controle na porta —, pergunta qual evidência confirma ou nega a hipótese. Se a evidência já mostra um erro puramente de aplicação, você não precisa refazer o caminho inteiro.</p>\n<h3>Matriz de diagnóstico</h3>\n<p>A matriz organiza camada, hipótese, evidência e próximo passo. Teste de baixo para cima e pare na primeira evidência que quebra:</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Camada</th><th>Pergunta</th><th>Evidência</th><th>Se falhar, investigue</th></tr></thead><tbody>\n<tr><td>L1</td><td>A interface tem link?</td><td><code>ip addr</code> (state DOWN, NO-CARRIER) ou <code>ipconfig /all</code> (mídia desconectada)</td><td>Cabo, porta, Wi-Fi</td></tr>\n<tr><td>Config. local</td><td>IP, máscara e gateway coerentes?</td><td><code>ipconfig /all</code>, <code>ip route</code></td><td>DHCP, configuração, VLAN da porta</td></tr>\n<tr><td>L2</td><td>O MAC do gateway foi resolvido?</td><td><code>arp -a</code>, <code>ip neigh</code> (INCOMPLETE/FAILED = não)</td><td>VLAN da porta, trunk, gateway ativo, controles L2</td></tr>\n<tr><td>L2 → gateway</td><td>O gateway responde?</td><td><code>ping &lt;gateway&gt;</code></td><td>Com ARP resolvido e ping falhando, o L2 provavelmente está ok: veja se o gateway ou um firewall local filtra ICMP</td></tr>\n<tr><td>L3 além do gateway</td><td>Um IP remoto responde?</td><td><code>ping &lt;IP remoto&gt;</code>, <code>tracert</code></td><td>Rota e firewall (Módulo 4 em diante)</td></tr>\n<tr><td>DNS</td><td>Funciona por IP e falha por nome?</td><td>Mesmo destino testado por IP e por nome</td><td>Resolução de nomes</td></tr>\n<tr><td>TLS / HTTP / aplicação</td><td>Conecta, mas dá erro de certificado, HTTP ou login?</td><td>Mensagem do navegador, logs da aplicação</td><td>Certificado, aplicação, autenticação</td></tr>\n</tbody></table></div>\n<p><strong>Limites do método:</strong> ele organiza o raciocínio, mas não substitui captura de tráfego nem logs reais. Em cloud pública, o provedor abstrai quase toda a Camada 2, e virtualização e overlays mudam o que você enxerga. Em ambiente híbrido, porém, VLANs, trunks e ARP do datacenter continuam no caminho até a VPN: a falha pode estar antes dela.</p>\n<div class=\"callout warning\"><strong>Erros comuns</strong><ul><li><strong>Culpar DNS antes de testar o gateway:</strong> DNS é causa frequente de falha por nome, mas, se o gateway nem é alcançado, o problema está em ARP, VLAN ou gateway. Valide IP, máscara, gateway, ARP e ping local primeiro.</li><li><strong>Achar que VLAN é firewall:</strong> a VLAN separa broadcast e parece isolamento completo, mas o tráfego inter-VLAN fica permitido se não houver política. Use VLAN para segmentar L2 e firewall/ACL para controlar acesso.</li><li><strong>Limpar o cache ARP e declarar o problema resolvido:</strong> a limpeza mascara o sintoma por um tempo e a causa volta. Colete evidências de switch, ARP, DHCP, VLAN e logs.</li></ul></div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>#</th><th>Quem</th><th>O que acontece</th><th>Falha típica</th></tr></thead><tbody>\n<tr><td>1</td><td>Host</td><td>Compara o IP de destino com o próprio IP e a máscara. Destino local: o MAC necessário é o do próprio destino. Destino remoto: é o MAC do gateway.</td><td>Máscara ou gateway incorretos</td></tr>\n<tr><td>2</td><td>Host</td><td>Consulta o cache ARP. Sem entrada válida, envia ARP Request em broadcast dentro da VLAN.</td><td>Entrada ausente, INCOMPLETE/FAILED ou inconsistente</td></tr>\n<tr><td>3</td><td>Switch</td><td>Aprende o MAC de origem na porta (tabela MAC por VLAN) e encaminha pelo MAC de destino. Broadcast ou MAC desconhecido: flooding dentro da VLAN.</td><td>MAC flapping, flooding, porta errada</td></tr>\n<tr><td>4</td><td>Trunk / uplink</td><td>Só as VLANs permitidas atravessam o enlace, identificadas pela tag 802.1Q.</td><td>VLAN ausente no trunk</td></tr>\n<tr><td>5</td><td>STP</td><td>Bloqueia caminhos redundantes quando necessário para impedir loops.</td><td>Loop, ou bloqueio inesperado do caminho em uso</td></tr>\n<tr><td>6</td><td>Controles L2</td><td>Permitem, negam, alertam ou colocam a porta em quarentena.</td><td>Controle mal planejado bloqueando tráfego legítimo</td></tr>\n<tr><td>7</td><td>Gateway</td><td>Recebe o frame local e processa o pacote IP. Daqui em diante começa o roteamento para outras redes.</td><td>Gateway errado, firewall local ou rota ausente</td></tr>\n</tbody></table></div>\n<h3>Campos que você confere</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>Tamanho</th><th>Para que serve</th><th>Atenção</th></tr></thead><tbody>\n<tr><td>Destination MAC</td><td>48 bits</td><td>Próximo destino local do frame: destino, gateway ou broadcast</td><td>Um MAC inesperado merece investigação</td></tr>\n<tr><td>Source MAC</td><td>48 bits</td><td>Interface que originou o frame naquele enlace</td><td>Não é identidade forte: pode mudar ou ser falsificado</td></tr>\n<tr><td>Tag 802.1Q</td><td>32 bits</td><td>Carrega o VLAN ID em enlaces trunk</td><td>Trunks permissivos ampliam erro e exposição</td></tr>\n<tr><td>ARP Sender/Target</td><td>variável</td><td>Associa IPv4 e MAC na rede local</td><td>ARP não autentica a associação</td></tr>\n</tbody></table></div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2>\n<p>Numa rede corporativa, o frame percorre host → NIC → cabo ou rádio → switch de acesso (VLAN da porta) → uplink/trunk → switch de distribuição → gateway ou firewall. Só então começa o roteamento de Camada 3. Cada trecho depende do anterior: Camada 1 funcional, Camada 2 coerente e Camada 3 configurada.</p><div class=\"callout warning\"><strong>Erro comum de desenho:</strong> documentar só IPs e firewalls e ignorar portas físicas, VLANs, trunks, STP, ARP e tabela MAC — onde está boa parte das falhas de LAN.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Em casa, seu notebook quer abrir a interface do roteador em <code>192.168.1.1</code> e precisa do MAC dele. Sem entrada ARP, envia um ARP Request em broadcast; o roteador responde com seu MAC; o notebook monta o frame Ethernet com esse MAC de destino e o entrega ao switch ou AP integrado.</p><p>Três desvios comuns: se você troca o roteador, a entrada ARP antiga pode ficar temporariamente incorreta; se o Wi-Fi isola clientes, alguns broadcasts não chegam a outros dispositivos; e um cabo ruim pode parecer problema de IP quando a causa é física.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n<p>Um usuário na VLAN 10 tenta acessar um servidor na VLAN 30. O primeiro salto não é o servidor: é o gateway da VLAN 10. O host usa ARP para descobrir o MAC do gateway e entrega o frame ao switch; o switch encaminha pela porta correta; o gateway roteia para a VLAN 30, onde políticas de firewall podem ser aplicadas.</p><p>Onde isso quebra: se a porta do usuário estiver na VLAN errada, o ARP procura um gateway que não existe naquele domínio. Se o trunk não permite a VLAN 10, o broadcast não atravessa. Se o STP bloqueou um uplink de forma inesperada, o caminho falha. Se o DAI bloquear uma resposta ARP legítima por falta de DHCP snooping correto, o sintoma é gateway inacessível.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>Exemplo em Segurança</h2>\n<p>O fluxo do frame ao gateway ajuda a separar incidente de rede local de incidente de aplicação. Um alerta de ARP inconsistente pede evidências de cache ARP, tabela MAC, porta do switch, DHCP snooping e logs. Um alerta de MAC flapping pede investigar loops, redundância, virtualização, docking stations e APs antes de concluir que há comportamento anômalo.</p><div class=\"responsive-table\"><table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Evidência</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody><tr><td>ARP inconsistente</td><td>Gateway com MAC alternando</td><td>Perda, desvio ou interceptação local</td><td>DAI, DHCP snooping, monitoramento e TLS</td></tr><tr><td>MAC flapping</td><td>Mesmo MAC em portas diferentes</td><td>Instabilidade e forwarding incorreto</td><td>Investigar loop, virtualização e STP</td></tr><tr><td>Trunk permissivo</td><td>VLANs demais em uplink</td><td>Exposição lateral e erro operacional</td><td>Allowed VLANs mínimas e revisão</td></tr><tr><td>Porta aberta</td><td>Dispositivo desconhecido</td><td>Acesso indevido à LAN</td><td>802.1X/NAC, port security e quarentena</td></tr></tbody></table></div>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 1040 600\" role=\"img\" aria-labelledby=\"m03l10-title m03l10-desc\">\n<title id=\"m03l10-title\">Revisão prática: do frame ao gateway</title>\n<desc id=\"m03l10-desc\">Fluxo didático mostrando um host encapsulando dados em frame Ethernet, consultando ARP, passando pelo switch, VLAN, STP e chegando ao gateway.</desc>\n<defs><marker id=\"m03l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n<rect x=\"40\" y=\"120\" width=\"160\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\"/><text x=\"120\" y=\"153\" text-anchor=\"middle\" class=\"svg-label\">Host</text><text x=\"120\" y=\"179\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP + MAC + ARP</text>\n<rect x=\"300\" y=\"112\" width=\"180\" height=\"98\" rx=\"14\" class=\"svg-node svg-node--switch\"/><text x=\"390\" y=\"148\" text-anchor=\"middle\" class=\"svg-label\">Switch acesso</text><text x=\"390\" y=\"174\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC table</text><text x=\"390\" y=\"196\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN 10</text>\n<rect x=\"565\" y=\"112\" width=\"180\" height=\"98\" rx=\"14\" class=\"svg-node svg-node--switch\"/><text x=\"655\" y=\"148\" text-anchor=\"middle\" class=\"svg-label\">Distribuição</text><text x=\"655\" y=\"174\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">trunk + STP</text><text x=\"655\" y=\"196\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">allowed VLANs</text>\n<rect x=\"840\" y=\"120\" width=\"160\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--router\"/><text x=\"920\" y=\"153\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"920\" y=\"179\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">próximo salto</text>\n<line x1=\"200\" y1=\"160\" x2=\"300\" y2=\"160\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l10-arrow)\"/>\n<line x1=\"480\" y1=\"160\" x2=\"565\" y2=\"160\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l10-arrow)\"/>\n<line x1=\"745\" y1=\"160\" x2=\"840\" y2=\"160\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l10-arrow)\"/>\n<rect x=\"55\" y=\"300\" width=\"220\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"165\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Evidências no host</text><text x=\"165\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">arp -a · ipconfig · ping</text>\n<rect x=\"315\" y=\"300\" width=\"220\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"425\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Evidências no switch</text><text x=\"425\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC table · VLAN · STP</text>\n<rect x=\"575\" y=\"300\" width=\"220\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"685\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Controles L2</text><text x=\"685\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DAI · snooping · BPDU Guard</text>\n<rect x=\"835\" y=\"300\" width=\"170\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"920\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"920\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota + firewall</text>\n<line x1=\"165\" y1=\"300\" x2=\"120\" y2=\"202\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m03l10-arrow)\"/>\n<line x1=\"425\" y1=\"300\" x2=\"390\" y2=\"210\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m03l10-arrow)\"/>\n<line x1=\"685\" y1=\"300\" x2=\"655\" y2=\"210\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m03l10-arrow)\"/>\n<line x1=\"920\" y1=\"300\" x2=\"920\" y2=\"202\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m03l10-arrow)\"/>\n<rect x=\"180\" y=\"465\" width=\"700\" height=\"74\" rx=\"14\" class=\"svg-zone\"/><text x=\"530\" y=\"496\" text-anchor=\"middle\" class=\"svg-label\">Pergunta da revisão</text><text x=\"530\" y=\"522\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">O frame chegou ao gateway certo? Se não chegou, em qual evidência a hipótese quebrou?</text>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul><li><strong>Modelo mental:</strong> siga o frame até o gateway — destino local ou remoto, MAC necessário, ARP, switch, VLAN, STP, controles e evidências.</li><li><strong>Regra do MAC:</strong> destino na mesma rede usa o MAC do próprio destino; destino em outra rede usa o MAC do gateway.</li><li><strong>VLAN separa broadcast, não aplica política:</strong> o tráfego entre VLANs passa pelo gateway, onde firewall/ACL decide o que é permitido.</li><li><strong>Erro comum:</strong> culpar DNS ou firewall antes de validar IP, gateway, ARP e VLAN.</li><li><strong>Uso real:</strong> troubleshooting, desenho de LAN, hardening, SOC/NOC e documentação.</li></ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>No Módulo 4, começando por \"Por que o IPv4 existe\", você sai da entrega local e passa ao endereçamento lógico: como a máscara define a rede, como o host decide que um destino é remoto e por que o gateway é o próximo salto.</p>\n</section>\n"
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
      "IPv4",
      "ICMP",
      "DHCP"
    ],
    "dependsOn": [
      "Ethernet",
      "MAC",
      "Switch",
      "ARP",
      "VLAN",
      "STP"
    ],
    "enables": [
      "IPv4",
      "Gateway padrão",
      "Roteamento",
      "Troubleshooting profissional",
      "Segurança de LAN"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Gateway não responde.",
      "ARP incompleto ou inconsistente.",
      "MAC flapping.",
      "Host na VLAN errada.",
      "Broadcast storm.",
      "Acesso intermitente a serviços locais."
    ],
    "diagnosticQuestions": [
      "O host tem IP, máscara e gateway coerentes?",
      "O MAC do gateway aparece no cache ARP?",
      "O switch vê o MAC do host na porta esperada?",
      "A porta está na VLAN correta?",
      "O trunk permite a VLAN?",
      "STP bloqueou alguma porta crítica?",
      "Há controles L2 bloqueando a comunicação?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && arp -a && ping <gateway> && tracert <destino>",
        "purpose": "Ver configuração local, cache ARP e alcance ao gateway.",
        "expectedObservation": "Gateway configurado, entrada ARP para gateway e resposta de ping quando ICMP permitido.",
        "interpretation": "Se gateway não responde e ARP está incompleto, investigar L2 antes de DNS."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && ip neigh && ping -c 4 <gateway>",
        "purpose": "Ver endereço, rota default, vizinhos ARP e conectividade local.",
        "expectedObservation": "default via correto e vizinho ARP em estado válido.",
        "interpretation": "Estado FAILED/INCOMPLETE aponta para problema local ou bloqueio."
      },
      {
        "platform": "Cisco IOS",
        "command": "show mac address-table dynamic\nshow vlan brief\nshow interfaces trunk\nshow spanning-tree\nshow arp",
        "purpose": "Validar tabela MAC, VLANs, trunks, STP e ARP no equipamento.",
        "expectedObservation": "MACs nas portas esperadas, VLAN permitida no trunk e STP estável.",
        "interpretation": "MAC flapping, VLAN ausente ou porta bloqueada explicam muitos sintomas de LAN."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não pinga o gateway e o ARP está INCOMPLETE/FAILED",
        "then": "Verificar cabo/Wi-Fi, VLAN da porta, trunk, gateway ativo e controles L2. Corrigir a causa específica, sem liberar regras amplas."
      },
      {
        "if": "MAC do gateway muda repetidamente",
        "then": "Separar alta disponibilidade legítima (documentar o desenho de HA) de IP duplicado ou ARP inconsistente, usando logs, tabela MAC e cache ARP."
      },
      {
        "if": "Mesmo MAC aparece em portas diferentes",
        "then": "Investigar loop, virtualização, docking, AP bridge ou anomalia."
      },
      {
        "if": "Broadcast elevado e lentidão para toda a VLAN",
        "then": "Suspeitar de loop, ARP excessivo ou rede plana: conferir eventos de STP, counters e logs do switch; corrigir o loop, ajustar o STP e aplicar storm control."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar portas, VLANs, uplinks e gateways (inventário).",
      "Desabilitar portas não usadas ou colocá-las em VLAN de quarentena.",
      "Implantar NAC, DAI e demais controles L2 de forma gradual e planejada, para não bloquear tráfego legítimo.",
      "Sanitizar evidências antes de compartilhar relatórios."
    ],
    "badPractices": [
      "Deixar trunks permitindo todas as VLANs sem necessidade.",
      "Confiar apenas em firewall de borda.",
      "Investigar incidentes mexendo em switch sem janela ou autorização.",
      "Publicar MACs, IPs e topologia em documentos abertos."
    ],
    "commonErrors": [
      "Não correlacionar ARP com tabela MAC.",
      "Ignorar STP em redes redundantes.",
      "Tratar MAC como identidade forte."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição lateral em LAN plana",
        "description": "Todos os ativos compartilham o mesmo domínio local.",
        "defensiveExplanation": "Facilita descoberta, broadcast excessivo e alcance lateral.",
        "mitigation": "VLANs, firewall intersegmento, NAC, monitoramento e menor privilégio."
      },
      {
        "name": "ARP inconsistente",
        "description": "Associações IP-MAC instáveis ou suspeitas.",
        "defensiveExplanation": "Pode indicar erro operacional, HA mal entendido ou tentativa de desvio local.",
        "mitigation": "DAI, DHCP snooping, logs, segmentação e investigação controlada."
      }
    ],
    "monitoring": [
      "MAC flapping e MAC moves.",
      "Portas novas ativas e MACs novos em portas críticas.",
      "Mudança do MAC do gateway.",
      "Crescimento de broadcast.",
      "Eventos de STP.",
      "Bloqueios de DAI/NAC."
    ],
    "hardening": [
      "Port security seletivo.",
      "802.1X/NAC.",
      "DHCP snooping + DAI (o DAI valida respostas ARP contra a base confiável do DHCP snooping).",
      "BPDU Guard em portas de acesso.",
      "Root Guard onde aplicável.",
      "Allowed VLANs restritas em trunks.",
      "Storm control."
    ],
    "detectionIdeas": [
      "Correlacionar logs de switch, DHCP, ARP, NAC, firewall e EDR."
    ]
  },
  "lab": {
    "id": "lab-3.10",
    "title": "Mini-projeto: do frame Ethernet ao gateway",
    "labType": "security",
    "objective": "Construir um relatório técnico que explique e valide o caminho local de um host até o gateway, com foco em Ethernet, MAC, ARP, switch, VLAN, STP e controles defensivos.",
    "scenario": "Você está revisando uma LAN pequena antes de avançar para IPv4. O objetivo é documentar o fluxo local sem executar ações ofensivas e sem alterar equipamentos de produção.",
    "topology": "Host -> switch de acesso -> trunk/uplink -> gateway/firewall -> outras redes",
    "architecture": "Rede local com ao menos um host, gateway padrão, domínio de broadcast, switch ou AP e possibilidade de VLAN lógica.",
    "prerequisites": [
      "Ter concluído as aulas 3.1 a 3.9.",
      "Ter autorização para coletar informações no próprio ambiente ou usar laboratório controlado."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Comandos ipconfig, arp, ping, tracert, ip, ip neigh",
      "Opcional: acesso read-only a switch Cisco/Packet Tracer",
      "Editor de texto para relatório"
    ],
    "estimatedTimeMinutes": 35,
    "cost": "zero",
    "safetyNotes": [
      "Não altere configurações de switch em ambiente real sem autorização.",
      "Não execute ARP spoofing, MAC flooding, loops físicos ou ataques de broadcast.",
      "Remova IPs públicos, MACs completos, nomes internos e topologia sensível antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar configuração local",
        "instruction": "Colete IP, máscara, gateway e interface ativa.",
        "command": "ipconfig /all  # Windows\nip addr && ip route  # Linux",
        "expectedOutput": "Configuração local com gateway padrão identificado.",
        "explanation": "Sem IP, máscara e gateway coerentes, o diagnóstico de L2/L3 fica incompleto."
      },
      {
        "number": 2,
        "title": "Validar ARP do gateway",
        "instruction": "Verifique se existe associação IP-MAC para o gateway.",
        "command": "arp -a  # Windows\nip neigh  # Linux",
        "expectedOutput": "Entrada para o gateway com MAC correspondente.",
        "explanation": "O host precisa do MAC do gateway para falar com redes externas."
      },
      {
        "number": 3,
        "title": "Testar alcance local",
        "instruction": "Teste conectividade com o gateway e registre resultado.",
        "command": "ping <gateway>",
        "expectedOutput": "Respostas quando ICMP for permitido.",
        "explanation": "Falha aqui sugere investigar camada física, VLAN, ARP, controle local ou gateway."
      },
      {
        "number": 4,
        "title": "Mapear hipótese de switch/VLAN",
        "instruction": "Descreva em texto qual porta, VLAN e caminho você acredita que o frame percorre. Se tiver Packet Tracer ou acesso read-only, valide com comandos Cisco.",
        "command": "show mac address-table dynamic\nshow vlan brief\nshow interfaces trunk\nshow spanning-tree",
        "expectedOutput": "MACs nas portas esperadas, VLAN correta e STP estável.",
        "explanation": "Essa etapa conecta a visão do host com a visão do switch."
      },
      {
        "number": 5,
        "title": "Construir matriz de evidências",
        "instruction": "Monte uma tabela com camada, hipótese, evidência, comando, interpretação e próximo passo. Use a matriz de diagnóstico da seção Conceito como ponto de partida.",
        "expectedOutput": "Matriz de diagnóstico do frame ao gateway, uma linha por hipótese. Ex.: L2 | VLAN errada | porta em VLAN 20, host espera VLAN 10 | show vlan brief | hipótese confirmada | corrigir a VLAN da porta com autorização.",
        "explanation": "O objetivo é raciocínio estruturado, não volume de comandos."
      },
      {
        "number": 6,
        "title": "Sanitizar e entregar relatório",
        "instruction": "Remova dados sensíveis (IPs públicos, MACs completos, nomes internos) e escreva uma conclusão técnica.",
        "expectedOutput": "Relatório sanitizado com fluxo, riscos, evidências e próximos passos.",
        "explanation": "Documentação segura é parte da prática profissional."
      }
    ],
    "expectedResult": "O aluno deve entregar uma matriz explicando como o frame sai do host, qual MAC é usado, como ARP entra no fluxo, qual papel do switch/VLAN/STP e quais controles defensivos são relevantes.",
    "validation": [
      {
        "check": "Gateway identificado",
        "command": "ipconfig /all ou ip route",
        "expected": "Gateway padrão coerente com a rede local.",
        "ifFails": "Revisar configuração IP, DHCP, interface ativa e VLAN."
      },
      {
        "check": "ARP do gateway presente",
        "command": "arp -a ou ip neigh",
        "expected": "Entrada IP-MAC do gateway ou estado válido.",
        "ifFails": "Testar ping ao gateway e investigar L2."
      },
      {
        "check": "Raciocínio de VLAN documentado",
        "command": "show vlan brief / documentação lógica",
        "expected": "VLAN do host e gateway explicadas.",
        "ifFails": "Revisar porta access, trunk e domínio de broadcast."
      }
    ],
    "improvements": [
      "Refazer o lab em Packet Tracer com dois switches e duas VLANs.",
      "Criar checklist padronizado para chamados de gateway inacessível.",
      "Comparar o mesmo fluxo em rede cabeada e Wi-Fi."
    ],
    "evidenceToCollect": [
      "IP/máscara/gateway sanitizados",
      "Entrada ARP do gateway sanitizada",
      "Mapa físico/lógico simplificado",
      "Tabela de hipóteses e evidências",
      "Riscos e controles defensivos"
    ],
    "questions": [
      "O que muda no frame quando o destino está na mesma VLAN e na mesma rede IP?",
      "Por que o STP pode bloquear um caminho aparentemente bom?"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que o frame precisa chegar ao gateway antes de qualquer roteamento para outra rede acontecer?",
      "hints": [
        "Pense na diferença entre entrega local e entrega entre redes.",
        "Pense em MAC de destino."
      ],
      "expectedIdeas": [
        "próximo salto",
        "MAC do gateway",
        "ARP",
        "Camada 2 antes da Camada 3"
      ],
      "explanation": "O host entrega localmente ao gateway; só depois o roteador encaminha o pacote para outras redes."
    },
    {
      "type": "diagnóstico",
      "question": "Dois usuários na mesma sala e na mesma rede IP: um acessa tudo, o outro não pinga o gateway. Como você usa essa comparação para localizar a falha antes de pensar em DNS?",
      "hints": [
        "O que os dois compartilham e o que é exclusivo de cada um?",
        "Compare porta, VLAN e entrada ARP."
      ],
      "expectedIdeas": [
        "gateway, trunk e uplink provavelmente estão ok, pois o outro alcança",
        "focar no trecho exclusivo: cabo/Wi-Fi, porta, VLAN, controle L2",
        "comparar ip route/ip neigh (ou ipconfig/arp -a) dos dois",
        "ver se o switch tem o MAC do host na porta e VLAN esperadas"
      ],
      "explanation": "O usuário que funciona é a linha de base: o que é comum aos dois provavelmente está saudável, então a investigação começa no trecho exclusivo do host com falha. DNS é irrelevante enquanto o gateway não responde."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer separar visitantes, usuários e servidores. Que partes do Módulo 3 entram no desenho?",
      "hints": [
        "VLAN",
        "gateway",
        "firewall",
        "portas de acesso",
        "trunks"
      ],
      "expectedIdeas": [
        "segmentação por função",
        "broadcast contido em cada VLAN",
        "roteamento inter-VLAN no gateway/firewall com política",
        "trunks com allowed VLANs mínimas",
        "802.1X/NAC nas portas de acesso",
        "logs"
      ],
      "explanation": "VLANs separam broadcast; políticas precisam de firewall/ACL e controles L2."
    }
  ],
  "quiz": [
    {
      "id": "q3.10.1",
      "question": "Para acessar um destino fora da rede local, qual MAC normalmente aparece como destino no frame Ethernet inicial?",
      "options": [
        "MAC do servidor remoto",
        "MAC do gateway padrão",
        "MAC do switch de acesso",
        "MAC de broadcast, sempre"
      ],
      "answer": 1,
      "explanation": "Para destinos remotos, o host entrega o frame ao gateway padrão. O switch de acesso só encaminha; não é o destino do frame.",
      "topic": "gateway",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q3.10.2",
      "question": "Se o ARP para o gateway fica INCOMPLETE/FAILED, qual hipótese deve ser investigada cedo?",
      "options": [
        "Certificado TLS expirado",
        "Falha na resolução DNS do nome do sistema",
        "Problema local de L2, VLAN, cabo, Wi-Fi ou gateway",
        "Rota ausente no roteador de borda da internet"
      ],
      "answer": 2,
      "explanation": "Sem ARP resolvido para o gateway, o frame nem sai da rede local: o problema está antes de rotas remotas, DNS e TLS.",
      "topic": "ARP",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q3.10.3",
      "question": "Qual afirmação sobre VLAN está correta?",
      "options": [
        "VLAN separa domínio de broadcast, mas não substitui firewall",
        "VLAN criptografa automaticamente todo tráfego",
        "VLAN elimina necessidade de gateway",
        "VLAN impede qualquer ataque de L2"
      ],
      "answer": 0,
      "explanation": "VLAN segmenta L2, mas política entre segmentos exige roteamento controlado, firewall/ACL e monitoramento.",
      "topic": "VLAN",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q3.10.4",
      "question": "No switch, o que caracteriza MAC flapping?",
      "options": [
        "O switch inundando frames destinados a um MAC desconhecido",
        "Um IP associado a dois MACs no cache ARP do host",
        "A porta alternando entre up e down",
        "O mesmo MAC aparecendo alternadamente em portas diferentes"
      ],
      "answer": 3,
      "explanation": "É o mesmo MAC mudando de porta na tabela MAC (loop, virtualização ou anomalia). IP com dois MACs é inconsistência de ARP; porta caindo é problema de link.",
      "topic": "switch",
      "difficulty": "intermediário",
      "type": "troubleshooting"
    },
    {
      "id": "q3.10.5",
      "question": "Qual tecnologia evita loops em topologias Ethernet redundantes?",
      "options": [
        "Storm control",
        "STP/RSTP",
        "Tag 802.1Q",
        "Dynamic ARP Inspection"
      ],
      "answer": 1,
      "explanation": "STP/RSTP bloqueia caminhos redundantes para evitar loops de L2. Storm control só limita o broadcast quando a tempestade já acontece.",
      "topic": "STP",
      "difficulty": "iniciante",
      "type": "arquitetura"
    },
    {
      "id": "q3.10.6",
      "question": "Qual controle ajuda a validar associações ARP usando base confiável de DHCP snooping?",
      "options": [
        "BPDU Guard",
        "Port security",
        "Dynamic ARP Inspection",
        "Storm control"
      ],
      "answer": 2,
      "explanation": "O DAI valida respostas ARP contra a base confiável do DHCP snooping. Port security limita MACs por porta; BPDU Guard protege portas de acesso contra BPDUs.",
      "topic": "DAI",
      "difficulty": "intermediário",
      "type": "segurança"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.10.7",
      "front": "Destino na mesma sub-rede: qual MAC vai no frame?",
      "back": "O MAC do próprio destino, descoberto via ARP. O gateway só entra quando o destino é remoto.",
      "tags": [
        "mac",
        "arp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.10.10",
      "front": "O MAC do gateway mudou no cache ARP. Quais duas explicações você precisa separar?",
      "back": "Alta disponibilidade legítima (failover) ou IP duplicado/ARP inconsistente. Confirme com logs, tabela MAC e desenho de HA.",
      "tags": [
        "arp",
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.10.8",
      "front": "Quais comandos, no host, mostram configuração, cache ARP e alcance do gateway?",
      "back": "Windows: ipconfig /all, arp -a, ping <gateway>. Linux: ip addr, ip route, ip neigh, ping -c 4 <gateway>.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.10.4",
      "front": "Por que ARP é crítico?",
      "back": "Porque resolve IPv4 para MAC dentro da rede local.",
      "tags": [
        "arp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.10.9",
      "front": "Um uplink aparece bloqueado no show spanning-tree. É falha?",
      "back": "Não necessariamente: o STP bloqueia o caminho redundante para evitar loop. Investigue se o bloqueio for inesperado ou derrubar o único caminho.",
      "tags": [
        "stp"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.10.6",
      "front": "Qual é a pergunta central da revisão?",
      "back": "O frame chegou ao próximo salto correto? Se não, em qual evidência o fluxo quebrou?",
      "tags": [
        "revisão"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.10.5",
      "type": "cálculo",
      "prompt": "Um host tem IP 192.168.10.23/24 (os três primeiros octetos identificam a rede) e gateway 192.168.10.1. Para cada destino, diga qual MAC vai como destino no frame: (a) 192.168.10.50; (b) 10.0.30.5; (c) 192.168.11.7.",
      "expectedAnswer": "(a) O MAC do próprio 192.168.10.50, que está na mesma rede 192.168.10.0/24. (b) O MAC do gateway 192.168.10.1, porque 10.0.30.5 é remoto. (c) O MAC do gateway: com /24, 192.168.11.7 está em outra rede, mesmo parecendo próximo.",
      "explanation": "O MAC serve à entrega local. Para destinos remotos, o host resolve por ARP o MAC do gateway, não o do destino final."
    },
    {
      "id": "ex3.10.2",
      "type": "diagnóstico",
      "prompt": "Um host não pinga o gateway e o ARP está incompleto. Liste quatro hipóteses.",
      "expectedAnswer": "Cabo/Wi-Fi, VLAN errada na porta, trunk sem a VLAN, gateway fora, porta bloqueada por controle L2 (ex.: DAI, port security) ou STP/loop. Firewall filtrando ICMP não explica o caso: com ARP incompleto, o problema está antes do ping.",
      "explanation": "A falha acontece antes de DNS e aplicação: sem o MAC do gateway, o frame nem sai da rede local."
    },
    {
      "id": "ex3.10.6",
      "type": "diagnóstico",
      "prompt": "Diga em que camada você começaria a investigar cada caso: (a) ip neigh mostra o gateway como FAILED; (b) ping ao gateway e ao IP do servidor funcionam, mas o acesso pelo nome falha; (c) o servidor responde por IP e o navegador mostra erro de certificado; (d) show interfaces trunk mostra que a VLAN 10 não está permitida no uplink.",
      "expectedAnswer": "(a) L2 local: ARP, VLAN da porta, cabo/Wi-Fi ou gateway. (b) DNS: o caminho até o servidor funciona. (c) TLS: rede e alcance estão ok. (d) L2: sem a VLAN no trunk, o broadcast e o ARP da VLAN 10 não chegam ao gateway.",
      "explanation": "A matriz testa de baixo para cima: só faz sentido culpar DNS ou TLS depois que gateway e ARP estão confirmados."
    }
  ],
  "challenge": {
    "title": "Mini-projeto final do Módulo 3: do frame ao gateway",
    "scenario": "Uma filial possui usuários cabeados, Wi-Fi corporativo, rede de visitantes, impressoras e um firewall que atua como gateway das VLANs. Há reclamações de lentidão e alguns hosts não alcançam o gateway.",
    "tasks": [
      "Criar mapa físico e lógico simplificado.",
      "Explicar o caminho do frame de um usuário até o gateway.",
      "Listar evidências para validar ARP, MAC table, VLAN e STP.",
      "Identificar riscos de L2 e controles mínimos.",
      "Produzir conclusão técnica sanitizada."
    ],
    "constraints": [
      "Não executar ataque ou varredura agressiva.",
      "Não alterar switch real sem autorização.",
      "Separar hipótese de evidência.",
      "Não expor MACs/IPs completos no relatório final."
    ],
    "expectedDeliverables": [
      "Mapa físico/lógico",
      "Matriz de diagnóstico",
      "Tabela de riscos e controles",
      "Plano de validação",
      "Resumo executivo"
    ],
    "gradingRubric": [
      {
        "criterion": "Fluxo técnico correto",
        "points": 30,
        "description": "Explica destino local/remoto, ARP, MAC, switch, VLAN, STP e gateway."
      },
      {
        "criterion": "Evidências",
        "points": 25,
        "description": "Usa comandos e observações coerentes sem extrapolar conclusões."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Propõe controles defensivos adequados e preserva dados sensíveis."
      },
      {
        "criterion": "Clareza operacional",
        "points": 20,
        "description": "Organiza hipóteses, riscos e próximos passos sem mudanças perigosas."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa identificando o domínio local do host. Se o destino for remoto, o frame deve ir ao gateway. Em seguida validamos ARP, MAC table, VLAN, trunk e STP. Só depois avançamos para IP, DNS, TLS, HTTP ou aplicação.",
    "steps": [
      "Registrar IP, máscara e gateway.",
      "Verificar ARP do gateway.",
      "Validar se o switch aprende o MAC do host na porta correta.",
      "Confirmar VLAN da porta e VLAN permitida no trunk.",
      "Verificar STP, loops e eventos de MAC flapping.",
      "Listar controles defensivos e evidências sanitizadas.",
      "Escrever conclusão com causa provável e próximos passos."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar tudo no firewall para testar.",
        "whyItIsWrong": "Se o problema é ARP, VLAN ou STP, mudar firewall não resolve e pode criar risco."
      },
      {
        "answer": "Usar VLAN como único controle de segurança.",
        "whyItIsWrong": "VLAN separa broadcast, mas não substitui política de acesso e monitoramento."
      }
    ],
    "finalAnswer": "Uma resposta madura valida o caminho local primeiro: host configurado, ARP coerente, switch aprendendo o MAC na porta correta, VLAN correta, trunk permitindo a VLAN, STP estável e gateway acessível. O desenho final separa VLANs por função (usuários, Wi-Fi corporativo, visitantes, impressoras), com gateway por VLAN no firewall, trunks restritos às VLANs necessárias, STP planejado, portas de acesso protegidas e logs coletados, aplicando os controles L2 sem quebrar a operação e documentando evidências sem expor dados sensíveis."
  },
  "glossary": [
    {
      "term": "Próximo salto",
      "shortDefinition": "Dispositivo local para o qual o host entrega o frame quando precisa alcançar outra rede.",
      "longDefinition": "Normalmente é o gateway padrão da sub-rede. O host precisa do MAC desse dispositivo para enviar o frame Ethernet inicial.",
      "example": "Para acessar 8.8.8.8, o notebook envia o frame ao MAC do roteador local.",
      "relatedTerms": [
        "gateway",
        "ARP",
        "MAC"
      ],
      "relatedLessons": [
        "2.5",
        "3.5",
        "4.1"
      ]
    },
    {
      "term": "Matriz de diagnóstico",
      "shortDefinition": "Tabela que organiza hipótese, evidência, comando, interpretação e próximo passo.",
      "longDefinition": "Ajuda a evitar conclusões precipitadas e documentar troubleshooting profissional.",
      "example": "Hipótese: VLAN errada; evidência: porta em VLAN 20, host espera VLAN 10.",
      "relatedTerms": [
        "troubleshooting",
        "evidência"
      ],
      "relatedLessons": [
        "2.8",
        "15.1"
      ]
    },
    {
      "term": "Controle L2",
      "shortDefinition": "Mecanismo defensivo aplicado na camada de enlace ou acesso.",
      "longDefinition": "Inclui port security, 802.1X/NAC, DAI, DHCP snooping, BPDU Guard e storm control.",
      "example": "BPDU Guard em portas de usuário reduz risco de switch indevido causar loop.",
      "relatedTerms": [
        "NAC",
        "DAI",
        "BPDU Guard"
      ],
      "relatedLessons": [
        "3.9"
      ]
    },
    {
      "term": "Relatório sanitizado",
      "shortDefinition": "Documento técnico que remove dados sensíveis antes de compartilhamento.",
      "longDefinition": "Evita expor IPs, MACs completos, nomes internos, topologia e controles em detalhes desnecessários.",
      "example": "Trocar 192.168.10.23 por host usuário A e mascarar MAC completo.",
      "relatedTerms": [
        "evidência",
        "segurança"
      ],
      "relatedLessons": [
        "2.9",
        "16.1"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/",
      "note": "Referência conceitual para Ethernet."
    },
    {
      "type": "standard",
      "title": "IEEE 802.1Q VLAN Tagging",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/",
      "note": "Referência conceitual para VLANs."
    },
    {
      "type": "rfc",
      "title": "RFC 826 — An Ethernet Address Resolution Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc826",
      "note": "Referência histórica do ARP."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 4",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "IPv4 e endereçamento serão aprofundados no próximo módulo."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m08",
      "lesson": "infra-hibrida",
      "reason": "Runners e clusters on-premises dependem de LAN, VLANs e gateways corretos."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m01",
      "lesson": "controles-de-acesso",
      "reason": "NAC, 802.1X e segmentação se conectam a identidade de dispositivo e usuário."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "anyOf": [
        "quizScoreAtLeast",
        "checklistDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "4.1"
    ]
  }
};
