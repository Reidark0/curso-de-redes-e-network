export const lesson0306 = {
  "id": "3.6",
  "moduleId": "m03",
  "order": 6,
  "title": "Cache ARP e troubleshooting de rede local",
  "subtitle": "Como ler a tabela ARP e usá-la para diagnosticar falhas locais sem confundir Camada 2, Camada 3, DNS e aplicação.",
  "duration": "100-140 min",
  "estimatedStudyTimeMinutes": 140,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 215,
  "tags": [
    "redes",
    "ethernet",
    "arp",
    "cache arp",
    "troubleshooting",
    "camada 2",
    "camada 3",
    "gateway",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "É necessário entender ARP Request, ARP Reply e a função do ARP na resolução IPv4 para MAC."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.5",
      "reason": "A aula depende do entendimento de IP, gateway, rota e próximo salto."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.9",
      "reason": "A aula usa comandos básicos de diagnóstico como ping, arp, ipconfig, tracert e nslookup."
    }
  ],
  "objectives": [
    "Explicar por que existe cache ARP e qual problema ele resolve.",
    "Interpretar entradas ARP dinâmicas, estáticas, incompletas e suspeitas.",
    "Diagnosticar falhas locais envolvendo gateway, IP duplicado, VLAN incorreta, MAC inconsistente e cache desatualizado.",
    "Usar comandos seguros em Windows, Linux e Cisco IOS para coletar evidências de ARP.",
    "Relacionar cache ARP com segurança defensiva, monitoramento e mitigação de riscos de Camada 2."
  ],
  "learningOutcomes": [
    "Dada uma tabela ARP, o aluno identifica o MAC do gateway e avalia se a associação é coerente.",
    "Dado um sintoma de rede local, o aluno monta uma sequência de verificação sem culpar DNS ou aplicação cedo demais.",
    "Dado um IP duplicado ou MAC flapping, o aluno descreve evidências esperadas e possíveis causas.",
    "Dado um ambiente corporativo, o aluno propõe controles defensivos para reduzir risco de ARP spoofing e rede plana.",
    "Dado um relatório de troubleshooting, o aluno sabe quais evidências sanitizar antes de compartilhar."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>Um usuário abre chamado: “a internet caiu”. O computador tem IP, máscara, gateway e DNS, o Wi-Fi aparece conectado e o cabo está encaixado, mas nada abre, nem sistemas internos nem sites externos. Se você testar só DNS ou aplicação, pode perder a causa real: o host talvez não consiga entregar frames ao gateway porque a associação IP-MAC local está ausente, errada, duplicada ou instável.</p>\n<p>O cache ARP mostra quais endereços IPv4 o host conseguiu resolver para MAC dentro da LAN. Ler essa tabela é uma das formas mais rápidas de separar falha local (Camada 2, gateway, VLAN) de falha em DNS ou aplicação.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um notebook obtém IP por DHCP, mas alterna entre momentos em que pinga o gateway e momentos em que falha. O cache ARP mostra o mesmo IP do gateway associado a MACs diferentes ao longo do tempo. Isso é evidência forte de erro operacional, IP duplicado, gateway redundante mal entendido ou possível abuso de ARP.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>Resolver o MAC a cada pacote seria ineficiente: cada consulta ARP é um broadcast, consome processamento em todos os hosts da VLAN e adiciona latência antes do envio. Por isso os sistemas operacionais guardam as respostas numa tabela temporária, o cache ARP. O host ganha velocidade, mas passa a depender de uma informação que pode expirar, ficar incompleta, ser sobrescrita ou indicar conflito.</p>\n<ul class=\"flow-list\"><li><strong>Eficiência:</strong> guardar IP-MAC reduz broadcasts repetidos.</li><li><strong>Atualização:</strong> entradas precisam expirar porque dispositivos mudam de porta, NIC, VM, VLAN ou gateway.</li><li><strong>Diagnóstico:</strong> uma entrada ausente ou incompleta indica que a resolução local falhou.</li></ul>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<div class=\"definition-box\"><strong>Cache ARP</strong> é a tabela local que guarda, por tempo limitado, associações entre endereços IPv4 e endereços MAC resolvidos por ARP. Em vez de perguntar em broadcast toda vez que precisa falar com o gateway ou com outro host da mesma rede, o sistema consulta essa tabela.</div>\n<p>O cache só contém vizinhos da mesma sub-rede: hosts locais e o gateway. ARP não atravessa roteadores, então você nunca verá ali o IP de um site externo. Para destinos fora da sub-rede, a entrada que importa é a do gateway.</p>\n<p>Uma entrada pode ser <strong>dinâmica</strong> (aprendida automaticamente e com expiração) ou <strong>estática</strong> (configurada manualmente). Entradas estáticas são difíceis de manter e propensas a erro; use-as só em casos específicos e documentados. Uma entrada também pode estar <strong>completa</strong> (há IP e MAC) ou <strong>incompleta</strong> (o host perguntou e ainda não recebeu resposta).</p>\n<p>Cada entrada traz o IPv4 do vizinho (32 bits), o MAC associado (48 bits em Ethernet), o tipo ou estado e a interface por onde foi aprendida. Uma entrada numa interface inesperada pode indicar rota, VPN, bridge ou configuração incorreta.</p>\n<h3>Lendo a saída</h3>\n<p>Windows (<code>arp -a</code>; em sistemas em português, as colunas e os tipos aparecem traduzidos):</p>\n<pre class=\"code-block\"><code>Interface: 192.168.1.50 --- 0x5\n  Internet Address      Physical Address      Type\n  192.168.1.1           a4-2b-b0-11-22-33     dynamic\n  192.168.1.255         ff-ff-ff-ff-ff-ff     static</code></pre>\n<p>A primeira linha é o gateway, aprendido por ARP. A segunda é o broadcast da sub-rede, criado pelo próprio sistema: estático não quer dizer que alguém o configurou à mão.</p>\n<p>Linux (<code>ip neigh</code>):</p>\n<pre class=\"code-block\"><code>192.168.1.1 dev wlan0 lladdr a4:2b:b0:11:22:33 REACHABLE\n192.168.1.20 dev wlan0 lladdr 3c:52:82:aa:10:20 STALE\n192.168.1.77 dev wlan0  INCOMPLETE\n192.168.1.88 dev wlan0  FAILED</code></pre>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Estado (Linux; os nomes variam por sistema)</th><th>Significado</th><th>Preocupa?</th></tr></thead><tbody>\n<tr><td>REACHABLE</td><td>Associação confirmada recentemente.</td><td>Não.</td></tr>\n<tr><td>STALE</td><td>MAC conhecido, mas sem confirmação recente; será reverificado no próximo uso.</td><td>Não, é o estado normal de vizinhos pouco usados.</td></tr>\n<tr><td>INCOMPLETE</td><td>ARP Request enviado, resposta ainda não chegou.</td><td>Sim, se persistir para o gateway.</td></tr>\n<tr><td>FAILED</td><td>As tentativas acabaram sem resposta.</td><td>Sim: a resolução local falhou.</td></tr>\n<tr><td>PERMANENT</td><td>Entrada estática configurada manualmente.</td><td>Só se não estiver documentada.</td></tr>\n</tbody></table></div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<p>Cada passo do envio pode falhar de um jeito diferente, e o cache ARP mostra em qual deles o problema está.</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>#</th><th>O que acontece</th><th>O que pode falhar</th></tr></thead><tbody>\n<tr><td>1</td><td>A aplicação gera tráfego para um IP e a pilha IP escolhe o próximo salto: o próprio destino, se estiver na sub-rede, ou o gateway.</td><td>Máscara incorreta faz o host procurar ARP para o destino errado ou usar o gateway indevidamente.</td></tr>\n<tr><td>2</td><td>O host consulta o cache ARP pelo IP do próximo salto. Se há entrada válida, monta o frame Ethernet com aquele MAC.</td><td>Entrada antiga, incompleta ou inconsistente causa falha local ou intermitência.</td></tr>\n<tr><td>3</td><td>Sem entrada, o host envia ARP Request em broadcast para a VLAN; enquanto espera, a entrada aparece como incompleta.</td><td>VLAN errada, isolamento de Wi-Fi, gateway fora do ar ou broadcast bloqueado impedem a resposta.</td></tr>\n<tr><td>4</td><td>O gateway ou o destino local responde com ARP Reply; o host atualiza o cache e passa a enviar frames unicast.</td><td>Resposta com MAC inesperado exige correlação com switch, DHCP, NAC e HA.</td></tr>\n<tr><td>5</td><td>A entrada expira depois de um tempo ou é substituída por uma resposta mais nova.</td><td>Uma resposta nova sobrescreve a antiga sem autenticação: é aí que conflitos e abusos aparecem.</td></tr>\n</tbody></table></div>\n<p>Essa mecânica explica por que limpar o cache ARP às vezes “resolve” o problema por alguns minutos, mas raramente resolve a causa raiz. Se a causa é IP duplicado, VLAN errada, loop, ARP spoofing, gateway em HA mal documentado ou switch instável, a entrada problemática volta.</p>\n<div class=\"callout warning\"><strong>Erros comuns</strong><ul>\n<li><strong>Confundir ARP com DNS:</strong> DNS resolve nome para IP; ARP resolve o IP do próximo salto local (normalmente o gateway) para MAC. Se o gateway não responde, culpar o DNS é olhar para a camada errada.</li>\n<li><strong>Limpar o cache e encerrar o chamado:</strong> limpar é um teste controlado, não a solução. Colete a tabela antes de limpar, ou a evidência some.</li>\n<li><strong>Tratar MAC como identidade forte:</strong> políticas baseadas só em MAC são frágeis, porque o MAC pode ser alterado.</li>\n<li><strong>Ignorar alta disponibilidade:</strong> em HSRP/VRRP o MAC do gateway pode mudar legitimamente. Documente o MAC virtual esperado para não gerar falso positivo.</li>\n<li><strong>Mexer em firewall ou DNS cedo demais:</strong> colete em ordem IP, rota, vizinhos ARP, DNS, porta TCP, TLS e resposta HTTP, e só altere algo depois de provar que a LAN e o gateway funcionam.</li>\n</ul></div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2>\n<p>Hosts, servidores, roteadores, firewalls, switches L3, balanceadores e hypervisors mantêm cada um o seu cache ARP, e cada um vê a rede local do seu ponto de vista. Por isso o troubleshooting correlaciona várias fontes:</p>\n<ul><li><strong>Host:</strong> mostra se conseguiu resolver o MAC do gateway.</li><li><strong>Switch L2:</strong> mostra em qual porta e VLAN o MAC aparece (tabela MAC).</li><li><strong>Gateway/firewall:</strong> mostra quais IPs foram resolvidos em cada interface ou VLAN.</li><li><strong>DHCP:</strong> confirma quem deveria usar determinado IP (lease ou reserva).</li><li><strong>NAC/802.1X:</strong> relaciona identidade, porta, MAC e política.</li><li><strong>SIEM/NMS:</strong> correlaciona mudanças, flaps e alertas no tempo.</li></ul>\n<p>Em alta disponibilidade (HSRP, VRRP, clusters de firewall), os hosts usam um gateway virtual cujo MAC virtual pode passar de um equipamento para outro num failover. Sem essa informação documentada, um MAC mudando parece suspeito.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n<p>Imagine uma portaria que guarda uma lista temporária: “o ramal 101 corresponde à mesa da Ana”, “o ramal 102 corresponde à mesa do Bruno”. Em vez de perguntar a todo o escritório onde está cada pessoa a cada entrega, o mensageiro consulta a lista. Isso economiza tempo. Mas se alguém muda de mesa, se duas pessoas usam o mesmo ramal ou se alguém informa um local falso, a entrega vai para o lugar errado.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> o ARP é automático e não autentica respostas: o host atualiza o cache sem verificar quem as enviou.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Em casa, seu notebook tem IP <code>192.168.1.50</code> e gateway <code>192.168.1.1</code>. Quando você acessa um site, o destino final não está na sua LAN, então o notebook precisa enviar o pacote ao roteador. Ele consulta o cache ARP procurando o MAC de <code>192.168.1.1</code>; se não encontrar, pergunta em broadcast e, ao receber a resposta, guarda a associação por algum tempo.</p>\n<p>Se o gateway não aparece no cache e o ARP Request fica sem resposta, as hipóteses são cabo desconectado, Wi-Fi isolado, VLAN errada, gateway desligado, firewall local incomum ou problema físico. Se o gateway aparece com MAC diferente a cada minuto, investigue o contexto antes de concluir: pode ser HA legítimo, troca de equipamento, IP duplicado ou comportamento suspeito.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n<p>Uma estação da VLAN administrativa não acessa o ERP interno. O analista coleta <code>ipconfig /all</code>, <code>arp -a</code>, ping para o gateway e a tabela MAC do switch. O host resolveu o gateway, mas o switch mostra o MAC do gateway em uma porta inesperada. Isso muda o diagnóstico: o problema provavelmente não está no ERP nem no DNS, e sim em cabeamento, VLAN, porta de acesso, trunk, loop ou equipamento conectado indevidamente.</p>\n<p>Em outro caso, uma impressora com IP fixo entra em conflito com uma reserva DHCP. Os usuários alternam entre imprimir e falhar, e o cache ARP de máquinas diferentes mostra o mesmo IP associado a MACs diferentes. A evidência aponta para conflito de IP, e não para “driver de impressora ruim”.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud</h2>\n<p>Em cloud pública, o provedor ou o hypervisor abstrai a Camada 2: você normalmente não vê broadcast ARP, e aplicar às cegas os comandos de LAN física leva a conclusões erradas. A pergunta continua a mesma (“qual é o próximo salto e a camada local consegue entregá-lo?”), mas as evidências mudam: route tables, interfaces virtuais (ENI), security groups/NSGs, NACLs, flow logs, peering e logs dos appliances. Em ambientes híbridos, firewalls e appliances virtuais ainda mantêm tabelas ARP nos segmentos conectados.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>Exemplo em Segurança</h2>\n<p>Como ARP não autentica respostas, uma rede sem segmentação e sem controles de switch fica exposta a manipulações locais. O foco aqui é defensivo: reconhecer os sinais e aplicar controles.</p>\n<div class=\"responsive-table\"><table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Sinal defensivo</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>ARP spoofing</td><td>MAC do gateway muda sem janela planejada.</td><td>Intercepção local ou negação de serviço.</td><td>Dynamic ARP Inspection, DHCP snooping, 802.1X, segmentação e monitoramento.</td></tr>\n<tr><td>IP duplicado</td><td>Mesmo IP associado a MACs diferentes.</td><td>Conectividade intermitente.</td><td>DHCP controlado, reservas, inventário e alerta de conflito.</td></tr>\n<tr><td>MAC flapping</td><td>MAC aparece alternando portas.</td><td>Instabilidade e possível loop.</td><td>Verificar cabeamento, trunks, loops, STP e equipamentos indevidos.</td></tr>\n<tr><td>Evidência sensível</td><td>Prints de ARP expõem IPs, MACs e gateways.</td><td>Vazamento de topologia.</td><td>Sanitizar evidências antes de compartilhar.</td></tr>\n</tbody></table></div>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 1040 460\" role=\"img\" aria-labelledby=\"arp-cache-title arp-cache-desc\">\n  <title id=\"arp-cache-title\">Cache ARP e troubleshooting de rede local</title>\n  <desc id=\"arp-cache-desc\">Um host consulta o cache ARP antes de enviar frames ao gateway. A investigação correlaciona cache ARP, tabela MAC do switch e ARP do gateway.</desc>\n  <defs><marker id=\"m03l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n  <rect x=\"40\" y=\"78\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"130\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n  <text x=\"130\" y=\"138\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Consulta cache ARP</text>\n  <rect x=\"300\" y=\"60\" width=\"200\" height=\"130\" rx=\"14\" class=\"svg-node svg-node--security\" />\n  <text x=\"400\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">Cache ARP</text>\n  <text x=\"400\" y=\"120\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1 → bb:bb</text>\n  <text x=\"400\" y=\"145\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">dinâmica / expira</text>\n  <text x=\"400\" y=\"170\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">incompleta = investigar</text>\n  <rect x=\"590\" y=\"78\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"680\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n  <text x=\"680\" y=\"138\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC table / porta</text>\n  <rect x=\"840\" y=\"78\" width=\"170\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"925\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n  <text x=\"925\" y=\"138\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP / rota</text>\n  <line x1=\"220\" y1=\"122\" x2=\"300\" y2=\"122\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l06-arrow)\" />\n  <line x1=\"500\" y1=\"122\" x2=\"590\" y2=\"122\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l06-arrow)\" />\n  <line x1=\"770\" y1=\"122\" x2=\"840\" y2=\"122\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l06-arrow)\" />\n  <rect x=\"90\" y=\"280\" width=\"860\" height=\"98\" rx=\"14\" class=\"svg-zone\" />\n  <text x=\"520\" y=\"312\" text-anchor=\"middle\" class=\"svg-label\">Matriz de evidências</text>\n  <text x=\"520\" y=\"340\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Host: arp -a / ip neigh → Switch: show mac address-table → Gateway: show arp → DHCP/NAC/SIEM</text>\n  <text x=\"520\" y=\"365\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Se o MAC muda sem contexto, investigue HA, IP duplicado, VLAN, loop ou abuso defensivo de ARP</text>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul><li><strong>Ideia central:</strong> o cache ARP é uma fotografia temporária do mapa IP-MAC local. Ele não prova identidade; mostra o que aquele host acredita, naquele momento, sobre o próximo salto.</li><li><strong>Como ler:</strong> só aparecem vizinhos da sub-rede e o gateway; REACHABLE e STALE são normais, INCOMPLETE ou FAILED para o gateway indicam falha de resolução local.</li><li><strong>Erro comum:</strong> limpar o cache ARP e considerar o problema resolvido sem investigar a causa raiz.</li><li><strong>Uso real:</strong> diagnóstico de gateway, IP duplicado, VLAN errada, MAC flapping e loop antes de culpar DNS ou aplicação.</li><li><strong>Segurança:</strong> MAC mudando exige contexto (HA, troca, conflito ou abuso); correlacione ARP com switch, DHCP, NAC e logs e sanitize as evidências.</li></ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>Broadcast, ARP e cache ARP ficam limitados ao domínio de broadcast. Na próxima aula você verá como as VLANs dividem esse domínio em Camada 2 para reduzir ruído, risco lateral e confusão operacional.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
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
      "IPv4",
      "ICMP",
      "DHCP",
      "802.1Q"
    ],
    "dependsOn": [
      "Frame Ethernet",
      "Endereço MAC",
      "ARP",
      "Gateway",
      "Tabela MAC"
    ],
    "enables": [
      "Troubleshooting de LAN",
      "Diagnóstico de gateway",
      "Detecção defensiva de IP duplicado",
      "Preparação para VLANs"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Host não pinga gateway.",
      "Conectividade local intermitente.",
      "Mesmo IP aparece com MACs diferentes.",
      "Entrada ARP incompleta ou failed.",
      "MAC flapping em switch.",
      "Usuários dizem que DNS ou internet caiu, mas gateway falha."
    ],
    "diagnosticQuestions": [
      "O host tem IP, máscara e gateway coerentes?",
      "O gateway aparece no cache ARP?",
      "O MAC do gateway corresponde ao esperado?",
      "O switch vê esse MAC em qual porta e VLAN?",
      "Há DHCP lease ou reserva para esse IP?",
      "Existe HA que explique MAC virtual ou mudança planejada?",
      "Há alertas de loop, flapping, port security ou DAI?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\narp -a\nping <gateway>\nroute print",
        "purpose": "Ver configuração local, cache ARP, alcance do gateway e rota default.",
        "expectedObservation": "Gateway configurado, entrada ARP para o gateway e rota default coerente.",
        "interpretation": "Se o gateway não aparece no ARP após ping, investigue Camada 2, gateway, VLAN ou isolamento."
      },
      {
        "platform": "Linux",
        "command": "ip addr\nip route\nip neigh\nping -c 4 <gateway>",
        "purpose": "Ver interface, rota, vizinhos ARP/NDP e conectividade local.",
        "expectedObservation": "Entrada REACHABLE/STALE para o gateway após tráfego.",
        "interpretation": "FAILED/INCOMPLETE indica falha de resolução local ou ausência de resposta."
      },
      {
        "platform": "Cisco IOS",
        "command": "show arp\nshow mac address-table\nshow interfaces status\nshow vlan brief",
        "purpose": "Correlacionar IP-MAC, MAC-porta, estado físico e VLAN.",
        "expectedObservation": "MAC do host/gateway em porta e VLAN esperadas.",
        "interpretation": "MAC em porta inesperada, flapping ou VLAN errada muda a hipótese."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não pinga gateway e não há entrada ARP do gateway",
        "then": "Verificar cabo/Wi-Fi, VLAN, IP/máscara, gateway ativo e isolamento local."
      },
      {
        "if": "Entrada ARP do gateway muda entre MACs sem documentação de HA",
        "then": "Correlacionar com switch, DHCP/NAC e logs; investigar conflito ou abuso defensivo."
      },
      {
        "if": "Gateway responde, mas sites por nome falham",
        "then": "ARP provavelmente não é a causa principal; teste nslookup/dig e o acesso por IP e avance para DNS e camadas superiores."
      },
      {
        "if": "MAC aparece alternando portas no switch",
        "then": "Investigar loop, equipamento indevido, virtualização, trunk ou MAC flapping."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Segmentar redes para reduzir domínio de broadcast.",
      "Habilitar DHCP snooping e Dynamic ARP Inspection quando suportado.",
      "Usar 802.1X/NAC em portas de acesso críticas.",
      "Monitorar MAC flapping e mudanças inesperadas de gateway.",
      "Usar criptografia ponta a ponta (TLS, VPN) para que uma intercepção local não exponha o conteúdo.",
      "Sanitizar prints e PCAPs antes de compartilhar."
    ],
    "badPractices": [
      "Rede plana com muitos hosts sem controle.",
      "Portas físicas ativas em áreas públicas.",
      "Políticas baseadas apenas em MAC.",
      "Ignorar alertas de MAC flapping.",
      "Compartilhar tabela ARP completa em chamados externos sem sanitização."
    ],
    "commonErrors": [
      "Achar que NAT ou firewall resolve risco de ARP local.",
      "Ignorar HA legítimo e gerar falso positivo.",
      "Concluir que há manipulação ARP com base numa única tabela ARP, sem comparar outros hosts e o switch."
    ],
    "vulnerabilities": [
      {
        "name": "Manipulação de ARP em LAN",
        "description": "ARP não autentica nativamente respostas, permitindo risco conceitual de associação indevida IP-MAC em redes locais vulneráveis.",
        "defensiveExplanation": "O foco defensivo é detectar mudança anormal, limitar o domínio de broadcast e aplicar controles de switch.",
        "mitigation": "Dynamic ARP Inspection, DHCP snooping, port security, 802.1X/NAC, segmentação e monitoramento."
      },
      {
        "name": "IP duplicado",
        "description": "Dois ativos usando o mesmo IP podem causar alternância de MAC no cache.",
        "defensiveExplanation": "A evidência aparece como intermitência e MACs diferentes para o mesmo IP.",
        "mitigation": "DHCP centralizado, reservas, inventário, alertas e documentação."
      }
    ],
    "monitoring": [
      "Alertas de MAC flapping.",
      "Mudanças no MAC do gateway.",
      "Eventos de DAI/DHCP snooping.",
      "Conflitos de IP em DHCP/NAC.",
      "Aumento anormal de broadcast ARP."
    ],
    "hardening": [
      "Desativar portas não usadas.",
      "Documentar gateways virtuais e MACs esperados.",
      "Coletar logs de infraestrutura de acesso."
    ],
    "detectionIdeas": [
      "Comparar ARP de múltiplos hosts com tabela MAC do switch.",
      "Verificar se o MAC do gateway aparece em porta inesperada.",
      "Correlacionar horários de falha com mudanças, loops ou alertas.",
      "Usar PCAP apenas em ambiente autorizado e sanitizar evidências."
    ]
  },
  "lab": {
    "id": "lab-3.6",
    "title": "Investigando cache ARP de forma defensiva",
    "labType": "security",
    "objective": "Coletar e interpretar evidências de cache ARP para diagnosticar conectividade local com o gateway.",
    "scenario": "Você é chamado para investigar uma estação que às vezes não acessa sistemas internos. Antes de culpar DNS, firewall ou aplicação, você precisa validar a resolução local para o gateway.",
    "topology": "Host do aluno -> switch/AP -> gateway da rede local -> demais redes/Internet",
    "architecture": "Uma LAN simples com host final, domínio de broadcast, gateway e possível switch ou roteador doméstico/corporativo.",
    "prerequisites": [
      "Ter permissão para executar comandos no próprio computador.",
      "Conhecer o gateway local ou estar autorizado a consultá-lo."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Opcional: acesso somente leitura a switch Cisco em laboratório",
      "Editor de texto para relatório"
    ],
    "estimatedTimeMinutes": 35,
    "cost": "zero",
    "safetyNotes": [
      "Execute apenas na sua máquina ou em laboratório autorizado; não faça spoofing, varredura agressiva nem alterações na rede.",
      "Não altere ARP de terceiros nem capture tráfego sensível sem autorização.",
      "Sanitize IPs públicos, MACs e nomes internos antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar configuração local",
        "instruction": "Colete IP, máscara, gateway e interface usada.",
        "command": "Windows: ipconfig /all\nLinux: ip addr && ip route",
        "expectedOutput": "Endereço IPv4, máscara/prefixo, gateway padrão e interface ativa.",
        "explanation": "Sem IP, máscara e gateway coerentes, a análise de ARP fica sem contexto."
      },
      {
        "number": 2,
        "title": "Consultar cache ARP antes do teste",
        "instruction": "Liste as entradas ARP atuais e procure o gateway.",
        "command": "Windows: arp -a\nLinux: ip neigh",
        "expectedOutput": "Tabela com IPs locais associados a MACs ou estados como REACHABLE/STALE/INCOMPLETE.",
        "explanation": "A tabela mostra o que o host acredita sobre IPs e MACs locais naquele momento."
      },
      {
        "number": 3,
        "title": "Gerar tráfego leve para o gateway",
        "instruction": "Envie poucos pings para o gateway para provocar resolução ARP se necessário.",
        "command": "Windows: ping <gateway>\nLinux: ping -c 4 <gateway>",
        "expectedOutput": "Respostas do gateway ou falha explícita.",
        "explanation": "Após tráfego, espera-se que o cache contenha entrada para o gateway se a LAN local estiver funcionando."
      },
      {
        "number": 4,
        "title": "Consultar cache ARP depois do teste",
        "instruction": "Liste novamente a tabela ARP e compare com a coleta anterior.",
        "command": "Windows: arp -a\nLinux: ip neigh",
        "expectedOutput": "Entrada do gateway associada a um MAC ou estado de falha/incompleto.",
        "explanation": "Mudanças entre antes e depois ajudam a entender se o host conseguiu resolver o próximo salto."
      },
      {
        "number": 5,
        "title": "Montar matriz de evidências",
        "instruction": "Crie uma tabela com interface, IP local, gateway, MAC do gateway, resultado do ping e interpretação.",
        "analysisTask": "Escreva uma interpretação de uma frase para o resultado. Exemplo: “gateway REACHABLE, MAC igual nas duas coletas, ping ok: entrega local ao gateway funciona”.",
        "expectedOutput": "Matriz curta e sanitizada de evidências.",
        "explanation": "Troubleshooting profissional precisa de evidência organizada, não apenas prints soltos."
      },
      {
        "number": 6,
        "title": "Opcional em laboratório Cisco",
        "instruction": "Se tiver acesso autorizado, correlacione ARP e tabela MAC no switch/gateway.",
        "command": "show arp\nshow mac address-table\nshow interfaces status\nshow vlan brief",
        "expectedOutput": "MACs em portas e VLANs esperadas.",
        "explanation": "A correlação entre host, switch e gateway fortalece ou corrige a hipótese."
      }
    ],
    "expectedResult": "O aluno deve identificar o gateway, verificar se há entrada ARP para ele, interpretar o estado da entrada e escrever uma hipótese técnica curta.",
    "validation": [
      {
        "check": "Gateway configurado",
        "command": "ipconfig /all ou ip route",
        "expected": "Gateway padrão presente e coerente com a rede local.",
        "ifFails": "Revisar DHCP, configuração manual, VPN e interface ativa."
      },
      {
        "check": "Entrada ARP do gateway",
        "command": "arp -a ou ip neigh",
        "expected": "IP do gateway associado a MAC ou estado interpretável.",
        "ifFails": "Gerar ping leve ao gateway e repetir; se continuar incompleto, investigar L1/L2/gateway."
      },
      {
        "check": "Relatório sanitizado",
        "command": "Revisão manual",
        "expected": "Sem IP público, nome interno sensível ou MAC completo desnecessário.",
        "ifFails": "Mascarar dados antes de compartilhar."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Entrada do gateway não aparece",
        "probableCause": "Nenhum tráfego recente, gateway inacessível, VLAN errada, cabo/Wi-Fi ou isolamento.",
        "howToConfirm": "Pingue o gateway e verifique IP, máscara e interface ativa.",
        "fix": "Corrigir conectividade local antes de investigar DNS ou aplicação."
      },
      {
        "symptom": "Entrada aparece como INCOMPLETE ou FAILED",
        "probableCause": "ARP Request não recebeu resposta.",
        "howToConfirm": "Verificar gateway, VLAN, link físico, isolamento Wi-Fi e switch.",
        "fix": "Escalar para validação de Camada 1/2 e gateway."
      }
    ],
    "improvements": [
      "Comparar resultados antes e depois de trocar de Wi-Fi para cabo.",
      "Observar ARP Request e ARP Reply no Wireshark com o filtro arp, só na sua máquina ou em laboratório autorizado."
    ],
    "evidenceToCollect": [
      "IP/máscara/gateway sanitizados",
      "Tabela ARP antes e depois",
      "Resultado de ping ao gateway",
      "Interface usada",
      "Hipótese técnica",
      "Limites da evidência"
    ],
    "questions": [
      "A entrada do gateway é coerente com o ambiente (estado, MAC e interface)?",
      "O MAC do gateway mudou entre as coletas sem explicação?",
      "Que evidências do switch confirmariam ou descartariam a sua hipótese?"
    ],
    "challenge": "Monte um relatório de uma página explicando como você diferenciaria falha de ARP, IP duplicado, VLAN errada e DNS indisponível.",
    "solution": "A solução deve começar por IP/máscara/gateway, consultar ARP, testar gateway, correlacionar com switch/DHCP/NAC quando possível e só depois avançar para DNS e aplicação. IP duplicado tende a aparecer como MAC variável para o mesmo IP; VLAN errada tende a impedir alcance ao gateway correto; DNS falha com gateway funcional; falha de ARP aparece como entrada ausente/incompleta para o próximo salto."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que o cache ARP existe se o host poderia enviar ARP Request toda vez?",
      "hints": [
        "Pense em broadcast.",
        "Pense em eficiência e latência."
      ],
      "expectedIdeas": [
        "reduzir broadcast",
        "ganhar eficiência",
        "guardar associação temporária",
        "evitar consulta repetida"
      ],
      "explanation": "O cache reduz custo operacional da LAN, mas precisa expirar porque a rede muda."
    },
    {
      "type": "diagnóstico",
      "question": "Um colega limpou o cache ARP de um host e o acesso voltou. Por que isso não encerra o chamado, e o que deveria ter sido feito antes?",
      "hints": [
        "Pense no que o comando apaga.",
        "Pense nas causas que fazem a entrada errada voltar."
      ],
      "expectedIdeas": [
        "limpar o cache é teste, não correção",
        "coletar a tabela ARP antes de limpar",
        "causa raiz possível: IP duplicado, VLAN errada, loop, HA ou spoofing",
        "acompanhar se a entrada volta a mudar"
      ],
      "explanation": "Limpar o cache só força uma nova resolução. Se a causa persiste, a entrada problemática volta, e sem a coleta anterior a evidência se perdeu."
    },
    {
      "type": "cenário real",
      "question": "O MAC do gateway muda durante o dia. Como investigar sem assumir ataque imediatamente?",
      "hints": [
        "Pense em HA.",
        "Pense em documentação e correlação."
      ],
      "expectedIdeas": [
        "verificar HSRP/VRRP",
        "comparar o ARP de vários hosts",
        "consultar a tabela MAC do switch",
        "DHCP/NAC e logs de DAI/port security",
        "janela de mudança",
        "IP duplicado"
      ],
      "explanation": "Mudança de MAC pode ser legítima em alta disponibilidade, mas precisa de contexto e evidência."
    }
  ],
  "quiz": [
    {
      "id": "q3.6.1",
      "question": "Qual é a função principal do cache ARP?",
      "options": [
        "Resolver nomes DNS para IPs públicos",
        "Guardar associações temporárias entre IPv4 e MAC na rede local",
        "Criptografar frames Ethernet",
        "Substituir a tabela de rotas"
      ],
      "answer": 1,
      "explanation": "Cache ARP guarda associações IP-MAC aprendidas localmente para reduzir broadcast e acelerar comunicação.",
      "topic": "cache ARP",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q3.6.2",
      "question": "Um host não pinga o gateway e a entrada ARP do gateway fica incompleta. Qual hipótese é mais coerente?",
      "options": [
        "Rota default ausente na tabela de rotas",
        "Servidor DNS configurado incorretamente",
        "Falha de resolução local para o gateway",
        "Certificado TLS expirado"
      ],
      "answer": 2,
      "explanation": "Entrada incompleta indica que o host enviou o ARP Request e não recebeu resposta. DNS e TLS atuam depois, e a falta de rota default não impede o ARP para o gateway, que está na sub-rede conectada.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q3.6.3",
      "question": "Uma política libera o acesso à rede apenas pelo MAC do notebook. Por que ela é frágil?",
      "options": [
        "Porque o MAC pode ser alterado ou falsificado",
        "Porque o switch remove o MAC do frame antes de encaminhá-lo",
        "Porque o MAC é criptografado e o switch não consegue lê-lo",
        "Porque o MAC só tem significado fora da rede local"
      ],
      "answer": 0,
      "explanation": "MAC é evidência local útil, mas pode ser alterado; não é autenticação forte por si só. Por isso se usa 802.1X/NAC.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q3.6.4",
      "question": "Se o gateway responde ao ping, mas nomes de sites não resolvem, qual camada deve ser investigada em seguida?",
      "options": [
        "Tabela MAC do switch, por suspeita de MAC flapping",
        "Camada física, porque o cabo deve estar com defeito",
        "Cache ARP do gateway, que deve ser limpo",
        "Resolução de nomes (DNS)"
      ],
      "answer": 3,
      "explanation": "Se o gateway responde, a resolução local funcionou. O próximo passo é testar DNS (nslookup/dig) e o acesso por IP.",
      "topic": "camadas",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q3.6.5",
      "question": "O mesmo IP aparece com dois MACs diferentes em coletas próximas. Qual ação é adequada?",
      "options": [
        "Bloquear a porta do switch imediatamente, porque é ataque",
        "Correlacionar com DHCP, switch, NAC e documentação de HA",
        "Limpar o cache ARP e encerrar o chamado",
        "Trocar o servidor DNS do host"
      ],
      "answer": 1,
      "explanation": "MAC variável para o mesmo IP precisa de contexto: HA, troca planejada, IP duplicado ou abuso local. Bloquear ou limpar sem evidência pode derrubar um gateway legítimo ou apagar a prova.",
      "topic": "investigação",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q3.6.7",
      "question": "Em um host Linux, ip neigh mostra: 192.168.1.1 dev eth0 lladdr a4:2b:b0:11:22:33 STALE. O que isso indica?",
      "options": [
        "A entrada foi configurada manualmente pelo administrador",
        "O gateway parou de responder e a entrada precisa ser removida",
        "O MAC do gateway é conhecido, mas não foi confirmado recentemente; será reverificado no próximo uso",
        "Outro host está respondendo pelo IP do gateway"
      ],
      "answer": 2,
      "explanation": "STALE é o estado normal de um vizinho pouco usado: a associação continua válida e o kernel a confirma no próximo envio. Falha seria INCOMPLETE ou FAILED; entrada manual aparece como PERMANENT.",
      "topic": "Linux",
      "difficulty": "intermediário",
      "type": "interpretação"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.6.7",
      "front": "Por que entradas ARP dinâmicas expiram?",
      "back": "Porque dispositivos mudam de NIC, porta, VM, VLAN ou gateway; uma entrada antiga mandaria frames para o MAC errado.",
      "tags": [
        "arp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.6.2",
      "front": "Entrada ARP incompleta sugere o quê?",
      "back": "O host tentou resolver o MAC, mas não recebeu resposta ARP válida.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.6.3",
      "front": "Limpar cache ARP resolve causa raiz?",
      "back": "Normalmente não. É teste ou mitigação temporária; a causa deve ser investigada.",
      "tags": [
        "operação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.6.4",
      "front": "MAC do gateway mudando sempre é ataque?",
      "back": "Não. Pode ser HA, troca planejada, IP duplicado ou comportamento suspeito. Exige correlação.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.6.8",
      "front": "MAC flapping no switch sugere o quê?",
      "back": "O mesmo MAC alternando entre portas: loop, equipamento conectado indevidamente, virtualização ou trunk incorreto.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.6.6",
      "front": "Qual controle ajuda a mitigar manipulação ARP em switches?",
      "back": "Dynamic ARP Inspection, normalmente combinado com DHCP snooping.",
      "tags": [
        "hardening"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.6.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre DNS e ARP usando um exemplo de acesso a um site.",
      "expectedAnswer": "DNS resolve nome para IP; ARP resolve o IP do próximo salto local, normalmente o gateway, para MAC.",
      "explanation": "O acesso a site pode depender de ambos, mas em camadas diferentes."
    },
    {
      "id": "ex3.6.2",
      "type": "diagnóstico",
      "prompt": "Um host tem gateway configurado, mas a entrada ARP do gateway aparece como incompleta. Liste três hipóteses.",
      "expectedAnswer": "Gateway indisponível, VLAN errada, problema físico/Wi-Fi, máscara/gateway incorretos, isolamento ou bloqueio local.",
      "explanation": "A falha ocorre antes de DNS e aplicação."
    },
    {
      "id": "ex3.6.5",
      "type": "interpretação",
      "prompt": "Um host tem gateway 192.168.10.1 e ip neigh mostra: (1) 192.168.10.1 dev eth0 lladdr 00:1a:2b:3c:4d:5e REACHABLE; (2) 192.168.10.20 dev eth0 lladdr 3c:52:82:aa:10:20 STALE; (3) 192.168.10.77 dev eth0 INCOMPLETE. O que está normal e o que você investigaria?",
      "expectedAnswer": "(1) Gateway resolvido e confirmado recentemente: a entrega local ao gateway funciona. (2) STALE é normal: o vizinho não foi usado há algum tempo e será reverificado no próximo uso. (3) O host tentou resolver 192.168.10.77 e não teve resposta: esse host pode estar desligado, fora da VLAN ou com outro IP; só importa se ele for um destino necessário. Como o gateway está REACHABLE, uma falha de acesso à internet deve ser investigada em DNS ou camadas superiores.",
      "explanation": "Ler estado por estado evita tratar STALE como falha e mostra que uma entrada incompleta só pesa no diagnóstico quando é de um próximo salto necessário."
    },
    {
      "id": "ex3.6.4",
      "type": "arquitetura",
      "prompt": "Por que VLANs ajudam a reduzir o impacto de problemas com ARP?",
      "expectedAnswer": "Porque limitam o domínio de broadcast e reduzem o número de hosts alcançados por ARP dentro de um segmento.",
      "explanation": "VLAN não autentica ARP, mas reduz escopo e facilita controle."
    }
  ],
  "challenge": {
    "title": "Investigue intermitência local sem culpar DNS cedo demais",
    "scenario": "Uma equipe relata que o sistema interno fica inacessível de forma intermitente. O gateway às vezes responde, às vezes não. Dois analistas anteriores limparam cache ARP e disseram que resolveu, mas o problema voltou.",
    "tasks": [
      "Criar uma sequência de diagnóstico por camadas.",
      "Definir evidências mínimas no host, switch, gateway e DHCP/NAC.",
      "Explicar como diferenciar IP duplicado, VLAN errada, HA legítimo e abuso ARP defensivo.",
      "Propor mitigação sem ações ofensivas."
    ],
    "constraints": [
      "Não executar spoofing.",
      "Não derrubar portas sem aprovação.",
      "Sanitizar evidências.",
      "Não alterar firewall antes de provar a camada local."
    ],
    "expectedDeliverables": [
      "Matriz de evidências",
      "Hipóteses priorizadas",
      "Plano de validação",
      "Riscos e mitigação",
      "Resumo executivo para gestor"
    ],
    "gradingRubric": [
      {
        "criterion": "Sequência por camadas",
        "points": 25,
        "description": "Valida IP, gateway, ARP, switch e só depois DNS/aplicação."
      },
      {
        "criterion": "Correlação de evidências",
        "points": 25,
        "description": "Usa host, switch, gateway, DHCP/NAC e documentação."
      },
      {
        "criterion": "Segurança defensiva",
        "points": 25,
        "description": "Inclui mitigação sem instruções ofensivas."
      },
      {
        "criterion": "Clareza operacional",
        "points": 25,
        "description": "Entrega relatório claro, sanitizado e acionável."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O erro comum é confundir sintoma com causa. Se o gateway falha intermitentemente, DNS e aplicação podem ser vítimas, não causa. A investigação deve começar pela configuração local e pela resolução do próximo salto.",
    "steps": [
      "Coletar IP, máscara, gateway e interface.",
      "Consultar ARP antes/depois de pingar o gateway.",
      "Comparar MAC do gateway com documentação e outros hosts.",
      "Consultar switch para MAC table, VLAN e flapping.",
      "Consultar DHCP/NAC para conflito de IP ou troca de ativo.",
      "Verificar HA legítimo antes de classificar como suspeito.",
      "Propor correção: documentação, segmentação, DAI, DHCP snooping, port security, 802.1X e correção de conflito."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Trocar DNS imediatamente.",
        "whyItIsWrong": "DNS não explica gateway inacessível ou ARP incompleto."
      },
      {
        "answer": "Limpar cache ARP como solução final.",
        "whyItIsWrong": "Pode mascarar a causa raiz e o problema retorna."
      },
      {
        "answer": "Assumir ataque sem verificar HA.",
        "whyItIsWrong": "Gateways redundantes podem usar MAC virtual ou mudança legítima."
      }
    ],
    "finalAnswer": "A resposta correta é tratar cache ARP como evidência local temporária, correlacioná-la com switch, gateway, DHCP/NAC e documentação, e só então propor correção operacional ou controle defensivo."
  },
  "glossary": [
    {
      "term": "Cache ARP",
      "shortDefinition": "Tabela temporária de associações IPv4-MAC.",
      "longDefinition": "Estrutura mantida por hosts e equipamentos para reutilizar resoluções ARP sem novo broadcast a cada comunicação.",
      "example": "192.168.10.1 associado a bb:bb:bb:bb:bb:bb.",
      "relatedTerms": [
        "ARP",
        "MAC",
        "gateway"
      ],
      "relatedLessons": [
        "3.5",
        "3.6",
        "3.7"
      ]
    },
    {
      "term": "Entrada incompleta",
      "shortDefinition": "Estado em que a resolução ARP ainda não obteve MAC.",
      "longDefinition": "Indica que o host tentou resolver um IP local ou gateway, mas ainda não recebeu resposta válida.",
      "example": "ip neigh mostra INCOMPLETE para o gateway.",
      "relatedTerms": [
        "ARP Request",
        "troubleshooting"
      ],
      "relatedLessons": [
        "3.5",
        "3.6"
      ]
    },
    {
      "term": "MAC flapping",
      "shortDefinition": "Mesmo MAC alternando entre portas de switch.",
      "longDefinition": "Pode indicar loop, equipamento conectado indevidamente, virtualização, trunk incorreto ou instabilidade.",
      "example": "Switch registra o MAC do gateway em portas diferentes.",
      "relatedTerms": [
        "switch",
        "tabela MAC"
      ],
      "relatedLessons": [
        "3.3",
        "3.6",
        "3.8"
      ]
    },
    {
      "term": "IP duplicado",
      "shortDefinition": "Dois dispositivos usando o mesmo endereço IP.",
      "longDefinition": "Causa intermitência porque hosts podem alternar a associação ARP para MACs diferentes.",
      "example": "192.168.10.50 aparece com dois MACs distintos.",
      "relatedTerms": [
        "DHCP",
        "ARP"
      ],
      "relatedLessons": [
        "3.6",
        "4.0"
      ]
    },
    {
      "term": "Dynamic ARP Inspection",
      "shortDefinition": "Controle de switch para validar ARP em redes Ethernet.",
      "longDefinition": "Recurso que usa informações confiáveis, geralmente do DHCP snooping, para bloquear respostas ARP inconsistentes.",
      "example": "Switch bloqueia ARP Reply não autorizado.",
      "relatedTerms": [
        "DHCP snooping",
        "port security"
      ],
      "relatedLessons": [
        "3.6",
        "3.9"
      ]
    },
    {
      "term": "Gateway virtual",
      "shortDefinition": "Endereço gateway representado por mecanismo de alta disponibilidade.",
      "longDefinition": "Em protocolos como HSRP/VRRP, hosts usam um gateway lógico que pode estar ativo em equipamentos diferentes.",
      "example": "MAC virtual do gateway muda após failover planejado.",
      "relatedTerms": [
        "HA",
        "VRRP",
        "HSRP"
      ],
      "relatedLessons": [
        "3.6",
        "11.0"
      ]
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "RFC 826 — An Ethernet Address Resolution Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc826",
      "note": "Referência clássica do ARP."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 3.5",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aula anterior sobre ARP Request e ARP Reply."
    },
    {
      "type": "standard",
      "title": "IEEE 802.1X e controles de acesso em LAN",
      "organization": "IEEE",
      "url": "",
      "note": "Referência conceitual para autenticação de acesso em redes cabeadas."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e automação",
      "lesson": "a definir",
      "reason": "Troubleshooting padronizado pode virar runbook automatizado e coleta de evidências em pipelines/ops."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Identidade de dispositivos e acesso condicional",
      "lesson": "a definir",
      "reason": "MAC sozinho não é identidade forte; NAC e 802.1X relacionam dispositivo, usuário e política."
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
      "3.7"
    ]
  }
};
