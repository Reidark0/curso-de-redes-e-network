export const lesson0401 = {
  "id": "4.1",
  "moduleId": "m04",
  "order": 1,
  "title": "Por que o IPv4 existe",
  "subtitle": "Como a rede deixa de ser uma LAN isolada e passa a interligar redes usando endereçamento lógico e roteamento.",
  "duration": "100-140 min",
  "estimatedStudyTimeMinutes": 140,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 225,
  "tags": [
    "redes",
    "ipv4",
    "camada 3",
    "endereçamento",
    "gateway",
    "roteamento",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m03",
      "reason": "IPv4 depende do entendimento de Ethernet, MAC, ARP, VLANs e entrega local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.5",
      "reason": "A aula 2.5 introduziu Camada 3, IP, gateway, roteamento e TTL."
    }
  ],
  "objectives": [
    "Explicar por que IPv4 existe e qual problema ele resolve.",
    "Diferenciar endereço lógico IPv4 de endereço físico MAC.",
    "Entender o papel de máscara, gateway e roteadores na comunicação entre redes.",
    "Relacionar IPv4 com cloud, DevSecOps, segurança e troubleshooting.",
    "Evitar confusões comuns entre IP, MAC, DNS, rota e firewall."
  ],
  "learningOutcomes": [
    "Dado um destino local ou remoto, o aluno identifica se o host deve usar MAC do destino ou MAC do gateway.",
    "Dado um problema de conectividade, o aluno separa falha de Camada 2, Camada 3, DNS e aplicação.",
    "Dado um desenho simples de rede, o aluno explica por que roteadores precisam de endereçamento lógico.",
    "Dado um cenário cloud, o aluno reconhece subnets, route tables, NAT e security groups como partes do raciocínio IPv4."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>Imagine que você está no suporte ou no SOC e recebe um chamado: “o notebook tem cabo conectado, o Wi-Fi funciona, mas o sistema de outra filial não abre”. No Módulo 3 você viu que Ethernet entrega frames dentro da rede local usando endereços MAC. Mas o sistema está em outra rede: o MAC do servidor remoto não está na sua LAN, o switch local não sabe encaminhar para uma rede distante e o broadcast ARP não atravessa roteadores.</p><p>O IPv4 resolve exatamente isso: é um endereço lógico que identifica redes e hosts de forma hierárquica, para que roteadores encaminhem pacotes entre redes diferentes. Sem ele, Ethernet funcionaria bem dentro de uma LAN, mas não ligaria departamentos, prédios, filiais, datacenters, provedores e cloud.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> quando alguém confunde MAC, IP, gateway e DNS, o troubleshooting vira tentativa e erro.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>Antes da internet moderna, as redes eram ilhas: cada tecnologia local resolvia o próprio domínio, sem uma forma universal de interligar redes com equipamentos e administradores diferentes. A arquitetura TCP/IP nasceu para isso, e o IPv4 virou o protocolo de Camada 3 que fornece endereçamento lógico, origem e destino, campos de controle e roteamento. Ethernet ficou com a entrega local de quadros; o IP, com o caminho lógico entre redes.</p><p>O problema central é o endereçamento entre redes. MAC não diz em qual rede um host está, não tem hierarquia global prática e não é usado por roteadores para escolher caminhos.</p><ul class=\"flow-list\"><li><strong>Sem IP:</strong> redes locais não teriam um esquema padronizado para interligação.</li><li><strong>Sem máscara:</strong> o host não saberia separar parte de rede e parte de host.</li><li><strong>Sem gateway:</strong> o host não saberia para onde enviar tráfego destinado a outra rede.</li><li><strong>Sem roteamento:</strong> cada LAN seria uma ilha.</li><li><strong>Sem campos IP:</strong> firewalls, logs, NAT, VPN e ferramentas de diagnóstico perderiam o contexto de origem e destino.</li></ul>\n</section>\n",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>Evolução</h2>\n<p>Cada etapa resolveu uma limitação da anterior; as duas últimas linhas explicam por que você ainda vai estudar CIDR, NAT e IPv6 neste curso.</p><table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead><tbody><tr><td>Endereçamento físico/MAC</td><td>Identifica interfaces locais</td><td>Não organiza redes remotas</td><td>Endereçamento lógico IP</td></tr><tr><td>Redes locais isoladas</td><td>Comunicação dentro da LAN</td><td>Não escala para filiais e internet</td><td>Roteadores e IP</td></tr><tr><td>Endereçamento classful</td><td>Classes A, B e C fixas</td><td>Desperdício de endereços</td><td>CIDR e subnetting</td></tr><tr><td>IPv4 público para tudo</td><td>Cada host poderia ter IP global</td><td>Escassez de endereços (o espaço IPv4 é limitado)</td><td>NAT, IPv6 e redes privadas</td></tr></tbody></table>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<div class=\"definition-box\"><strong>Definição:</strong> IPv4 é o protocolo de Camada 3 que identifica hosts e redes de forma lógica, para que roteadores encaminhem pacotes entre redes diferentes.</div>\n<p>Um endereço IPv4 tem 32 bits, normalmente escritos em quatro octetos decimais, como <code>192.168.10.20</code>. Ele não substitui Ethernet: trabalha acima dela. Ethernet entrega o frame ao próximo salto local; IPv4 identifica a origem e o destino lógicos do pacote.</p>\n<p>O IPv4, sozinho, não garante entrega, confidencialidade, autenticação nem autorização. E um IP identifica um ponto lógico da rede em determinado momento, não necessariamente uma pessoa ou um processo.</p>\n<div class=\"callout warning\"><strong>Erros comuns:</strong><ul><li><strong>Confundir IP com MAC.</strong> Os dois aparecem como identificadores, e aí você tenta resolver roteamento olhando só tabela MAC ou ARP. MAC é entrega local (Camada 2); IPv4 é endereço lógico roteável (Camada 3).</li><li><strong>Achar que DNS é necessário para pingar um IP.</strong> DNS só traduz nome em IP; tráfego para um IP direto não depende de DNS. Se o ping por IP falha, o problema está em IP, rota, gateway ou bloqueio.</li><li><strong>Usar IP como identidade de usuário.</strong> Com NAT, DHCP ou proxy, a investigação pode atribuir a ação à pessoa errada. Correlacione o IP com DHCP, autenticação, proxy, EDR, VPN e horário.</li></ul></div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<p>Antes de transmitir qualquer frame, o host toma uma decisão local que depende do próprio IP, da máscara, do IP de destino e da rota padrão.</p><ol class=\"flow-list\"><li>O host recebe ou possui um endereço IPv4, uma máscara, gateway e DNS.</li><li>Ele compara o próprio IP com o IP de destino usando a máscara. <em>Falha típica: máscara incorreta gera decisão errada.</em></li><li>Se o destino estiver na mesma rede, o host descobre o MAC do destino com ARP.</li><li>Se o destino estiver em outra rede, o host descobre o MAC do gateway com ARP. <em>Falha típica: sem gateway, nada fora da rede local é alcançado.</em></li><li>O ARP Request/Reply acontece dentro da VLAN local. <em>Falha típica: VLAN errada ou ARP inconsistente impede a entrega local.</em></li><li>O pacote IPv4 mantém IP de origem e IP de destino; o frame Ethernet usa MAC de origem e MAC de destino só para o próximo salto local.</li><li>Cada roteador remove o frame local, analisa o pacote IP, consulta a tabela de rotas e cria um novo frame para o próximo enlace. <em>Falha típica: rota ausente ou firewall bloqueando.</em></li></ol>\n<div class=\"callout callout--mentor\"><strong>Modelo mental:</strong> o host não pergunta “qual cabo leva ao destino?”. Ele pergunta primeiro “o destino pertence à minha rede lógica?”. Se sim, usa ARP para o destino. Se não, usa ARP para o gateway. Essa separação evita confundir entrega local, roteamento e resolução de nomes.</div><p>Detalhe essencial para troubleshooting: o IP de destino do pacote não muda quando o pacote sai da LAN; o que muda a cada enlace é o frame de Camada 2. Por isso, numa captura local você vê o MAC do gateway como destino Ethernet mesmo quando o IP de destino é um servidor remoto.</p>\n<h3>Campos do cabeçalho que você mais vai ver</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>Tamanho</th><th>Para que serve</th><th>Observação de segurança</th></tr></thead><tbody><tr><td>Source Address</td><td>32 bits</td><td>Endereço IPv4 de origem</td><td>Pode ser alterado em alguns cenários; em rede interna, correlacione com DHCP, NAT, VPN e logs</td></tr><tr><td>Destination Address</td><td>32 bits</td><td>Endereço IPv4 de destino</td><td>Base de firewall, roteamento, flow logs e investigação</td></tr><tr><td>TTL</td><td>8 bits</td><td>Limita a vida do pacote e evita loops infinitos</td><td>Aparece no traceroute e ajuda a inferir caminho, mas não é prova isolada</td></tr><tr><td>Protocol</td><td>8 bits</td><td>Indica o protocolo transportado: ICMP, TCP ou UDP</td><td>Firewalls e IDS usam junto com portas e estado</td></tr></tbody></table></div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2>\n<p>IPv4 fica entre a entrega local da Camada 2 e os protocolos de transporte da Camada 4. Em cada enlace, ele depende de Ethernet, Wi-Fi, PPP, túneis ou redes virtuais para transportar seus pacotes. Acima dele, TCP, UDP, ICMP e outros protocolos usam o IP como base.</p><ul><li><strong>Camada OSI:</strong> Camada 3 — Rede.</li><li><strong>Camada TCP/IP:</strong> Internet.</li><li><strong>Componentes:</strong> hosts, interfaces, roteadores, gateways, firewalls, NAT, VPNs e route tables.</li><li><strong>Pontos de falha:</strong> IP incorreto, máscara errada, gateway ausente, rota faltando, conflito de IP, NAT incorreto ou bloqueio de firewall.</li></ul>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n<p>Pense numa empresa com vários prédios. O MAC é a mesa dentro de um andar: serve para a entrega local. O IPv4 é o endereço completo de prédio, andar e setor, que permite encaminhar a entrega para outra unidade. O gateway é a portaria que despacha a correspondência para fora do prédio.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> o pacote IP não carrega a rota completa como um envelope postal; cada roteador decide só o próximo salto pela sua tabela de rotas.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Seu notebook tem o IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. Quando você acessa <code>192.168.1.80</code>, o destino está na mesma rede <code>192.168.1.0/24</code>, então o notebook busca o MAC de <code>192.168.1.80</code>. Quando acessa <code>8.8.8.8</code>, o destino está fora da rede local, então o notebook busca o MAC do gateway <code>192.168.1.1</code>.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n<p>Numa empresa, os usuários da VLAN 10 podem estar em <code>10.10.10.0/24</code>, os servidores em <code>10.10.20.0/24</code> e as impressoras em <code>10.10.30.0/24</code>. O IPv4 permite separar essas redes, criar rotas, aplicar políticas de firewall, registrar logs por origem/destino e diagnosticar problemas por segmento.</p><p>Os incidentes típicos aparecem em migração de VLAN, troca de firewall, implantação de filial e alteração de rota:</p><ul><li>uma máscara errada faz o host acreditar que um servidor remoto é local, e ele tenta ARP onde deveria usar o gateway;</li><li>um gateway configurado que não pertence à sub-rede do host quebra a saída, mesmo com IP aparentemente correto;</li><li>uma rota ausente mantém o acesso local, mas quebra a comunicação com outra filial;</li><li>um conflito de IP gera sintomas intermitentes e difíceis de diagnosticar.</li></ul>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud</h2>\n<p>Em cloud, IPv4 aparece em VPCs, VNets, subnets, route tables, NAT Gateways, load balancers, private endpoints e security groups. O raciocínio é o mesmo da rede física: a instância tem IP privado, pertence a uma sub-rede, usa uma tabela de rotas e passa por controles de segurança.</p><p>O desenho também tem custo. IP público, NAT Gateway, tráfego entre zonas, firewall gerenciado e flow logs podem gerar cobrança recorrente, e escolher entre IP público, NAT gerenciado, bastion, VPN ou endpoint privado muda tanto o custo quanto o esforço de operação. Endereçamento mal planejado pode exigir renumeração e janelas de manutenção.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>Exemplo em DevSecOps</h2>\n<p>Pipelines acessam registries, runners self-hosted, clusters Kubernetes e bancos, e cada acesso passa por allowlists, NetworkPolicies e security groups definidos em CIDR. Um erro de CIDR em Terraform pode expor uma porta para a internet ou bloquear um pipeline legítimo. Por isso, quando um deploy falha, confira rota, DNS, firewall, security group, NAT e endpoint privado antes de culpar o código.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>Exemplo em Segurança</h2>\n<p>Firewalls, WAFs, SIEMs, EDRs, flow logs, VPNs e IDS decidem e registram eventos por IP de origem, IP de destino, porta, protocolo e rota. Interpretar mal um endereço leva a regra errada ou investigação errada:</p><table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody><tr><td>IP público exposto</td><td>Serviço acessível da internet</td><td>Superfície de ataque maior</td><td>Security groups restritivos, WAF, VPN/ZTNA</td></tr><tr><td>Logs mal interpretados</td><td>NAT e proxies ocultam a origem real</td><td>Investigação incorreta</td><td>Preservar headers confiáveis e logs de NAT/proxy</td></tr></tbody></table>\n<p>IP sozinho não é identidade forte. Em redes com DHCP, NAT, VPN, proxy ou balanceadores, atribuir um evento a alguém exige correlacionar horário, lease DHCP, autenticação e caminho de rede.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m04l01-title m04l01-desc\">\n  <title id=\"m04l01-title\">IPv4 como endereçamento lógico entre redes</title>\n  <desc id=\"m04l01-desc\">Um host envia um pacote IPv4 para outra rede usando o gateway local, enquanto Ethernet troca os endereços MAC a cada enlace.</desc>\n  <defs>\n    <marker id=\"m04l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n  </defs>\n  <rect x=\"40\" y=\"145\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"115\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n  <text x=\"115\" y=\"204\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.20</text>\n  <rect x=\"250\" y=\"145\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"325\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Switch LAN</text>\n  <text x=\"325\" y=\"204\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2</text>\n  <rect x=\"460\" y=\"145\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"535\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n  <text x=\"535\" y=\"204\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1</text>\n  <rect x=\"690\" y=\"145\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"765\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Servidor B</text>\n  <text x=\"765\" y=\"204\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 10.20.30.40</text>\n  <line x1=\"190\" y1=\"185\" x2=\"250\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l01-arrow)\" />\n  <line x1=\"400\" y1=\"185\" x2=\"460\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l01-arrow)\" />\n  <line x1=\"610\" y1=\"185\" x2=\"690\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l01-arrow)\" />\n  <rect x=\"70\" y=\"55\" width=\"730\" height=\"54\" rx=\"12\" class=\"svg-boundary\" />\n  <text x=\"435\" y=\"87\" text-anchor=\"middle\" class=\"svg-label\">Pacote IPv4 mantém IP origem 192.168.10.20 e IP destino 10.20.30.40</text>\n  <rect x=\"70\" y=\"285\" width=\"730\" height=\"60\" rx=\"12\" class=\"svg-zone\" />\n  <text x=\"435\" y=\"312\" text-anchor=\"middle\" class=\"svg-label\">Frames Ethernet mudam MAC origem/destino a cada enlace</text>\n  <text x=\"435\" y=\"335\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IPv4 identifica origem/destino lógico; Ethernet entrega ao próximo salto local</text>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul><li>IPv4 é o endereço lógico que permite decidir se o destino está na rede local ou se o pacote precisa ir ao gateway.</li><li>A máscara separa rede e host; para destino remoto, o host faz ARP para o gateway, não para o servidor.</li><li>O MAC muda a cada enlace; os IPs de origem e destino se mantêm.</li><li>IPv4 não garante segurança nem identidade: interprete IP sempre junto com rota, NAT e logs.</li></ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>Na aula 4.2, “Estrutura do endereço IPv4 e octetos”, você passa da ideia de “IP como endereço lógico” para a leitura técnica dos 32 bits: quatro octetos, decimal pontuado e limites de 0 a 255.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3 — Rede"
    ],
    "tcpIpLayers": [
      "Internet"
    ],
    "relatedProtocols": [
      "IPv4",
      "ICMP",
      "ARP",
      "TCP",
      "UDP"
    ],
    "dependsOn": [
      "Ethernet",
      "MAC",
      "ARP",
      "VLAN",
      "Camada 2"
    ],
    "enables": [
      "roteamento",
      "subnetting",
      "NAT",
      "firewall",
      "VPN",
      "cloud networking"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Host acessa recursos locais, mas não acessa outras redes.",
      "Host não pinga gateway.",
      "Conflito de IP intermitente.",
      "Aplicação falha por IP, não apenas por nome.",
      "Cloud VM não acessa internet ou rede privada."
    ],
    "diagnosticQuestions": [
      "Qual é o IP, máscara e gateway do host?",
      "O destino está na mesma rede ou em outra rede?",
      "Existe rota default?",
      "O gateway responde?",
      "O firewall ou security group permite o tráfego?",
      "Há NAT, proxy ou VPN no caminho?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && ping <gateway>",
        "purpose": "Ver IP, máscara, gateway, DNS, rotas e alcance do gateway.",
        "expectedObservation": "IP válido, máscara coerente, gateway presente e rota default.",
        "interpretation": "Sem gateway ou rota default, destinos externos à rede local tendem a falhar."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && ping -c 4 <gateway>",
        "purpose": "Ver endereços, rotas e conectividade ao gateway.",
        "expectedObservation": "Interface com IPv4 e rota default via gateway correto.",
        "interpretation": "Se o gateway não responde, validar L1/L2, VLAN, ARP e firewall local."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow ip route\nshow arp",
        "purpose": "Ver interfaces, rotas e resolução ARP em equipamento Cisco.",
        "expectedObservation": "Interfaces up/up, rotas esperadas e ARP para vizinhos locais.",
        "interpretation": "Sem rota ou ARP para próximo salto, investigar VLAN, endereçamento e enlace."
      },
      {
        "platform": "Windows",
        "command": "tracert <ip-destino>",
        "purpose": "Ver a sequência de saltos IP até um destino remoto.",
        "expectedObservation": "O primeiro salto normalmente deve ser o gateway padrão quando o destino está fora da rede local.",
        "interpretation": "Se o primeiro salto não aparece ou é inesperado, investigar gateway, rota default, VPN ou firewall local."
      },
      {
        "platform": "Linux",
        "command": "ip route get <ip-destino>",
        "purpose": "Mostrar qual rota o kernel escolheria para alcançar um destino específico.",
        "expectedObservation": "Saída com dev, src e via quando o destino exige gateway.",
        "interpretation": "Ajuda a diferenciar erro de rota local de bloqueio posterior em firewall, NAT ou provedor."
      },
      {
        "platform": "Windows PowerShell",
        "command": "Test-NetConnection <ip-destino> -TraceRoute",
        "purpose": "Combinar teste de conectividade e caminho em ambientes Windows modernos.",
        "expectedObservation": "Resultado com sucesso ou falha e lista de saltos quando permitido.",
        "interpretation": "Útil para registrar evidência em chamados e comparar com rotas Linux/Cisco."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não tem IP válido",
        "then": "Verificar DHCP, configuração manual, VLAN e cabo/Wi-Fi."
      },
      {
        "if": "Host tem IP mas não tem gateway",
        "then": "Configurar gateway ou validar DHCP."
      },
      {
        "if": "Gateway não responde",
        "then": "Voltar para L1/L2: cabo, Wi-Fi, VLAN, ARP e firewall local."
      },
      {
        "if": "Gateway responde mas destino remoto falha",
        "then": "Verificar rota, firewall, NAT, VPN e caminho externo."
      },
      {
        "if": "O IP remoto falha, mas gateway e DNS parecem corretos",
        "then": "Executar ip route get, tracert/traceroute e revisar firewall/NAT antes de alterar DNS ou aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Planejar blocos IPv4 por função e criticidade, evitando redes planas.",
      "Documentar sub-redes, gateways, reservas e rotas.",
      "Tratar mudança de gateway, máscara ou rota como mudança de arquitetura: ela pode alterar caminhos, logs, firewall, DNS, monitoramento e allowlists.",
      "Aplicar regras de firewall com menor privilégio.",
      "Coletar logs de firewall, NAT, VPN e flow logs.",
      "Revisar allowlists e expirá-las quando possível."
    ],
    "badPractices": [
      "Liberar 0.0.0.0/0 sem justificativa.",
      "Usar IP como único fator de confiança.",
      "Misturar usuários, servidores e visitantes na mesma rede.",
      "Não documentar NAT, DHCP e proxies.",
      "Criar exceções permanentes de firewall para resolver incidentes rapidamente."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Achar que IP privado é automaticamente seguro.",
      "Achar que NAT substitui firewall.",
      "Tratar IP de origem como prova de autoria sem correlacionar NAT, proxy, DHCP, VPN e logs."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição por regra ampla",
        "description": "Serviços ficam acessíveis de redes maiores que o necessário.",
        "defensiveExplanation": "O risco não é apenas o IP, mas a combinação de escopo de origem, porta, serviço e autenticação.",
        "mitigation": "Restringir CIDR, usar VPN/ZTNA, WAF, MFA, logs e revisão periódica."
      },
      {
        "name": "Movimento lateral em rede plana",
        "description": "Muitos ativos compartilham o mesmo domínio ou políticas permissivas.",
        "defensiveExplanation": "Após comprometimento de um host, o atacante encontra mais alvos acessíveis.",
        "mitigation": "Segmentar redes, aplicar firewall interno, monitorar conexões laterais e usar menor privilégio."
      }
    ],
    "monitoring": [
      "Flow logs por origem/destino/porta.",
      "Alertas de conexão lateral incomum.",
      "Mudanças de rota e security groups.",
      "Uso anormal de IPs públicos ou NAT."
    ],
    "hardening": [
      "Rotas explícitas e revisadas.",
      "Firewall default deny onde aplicável.",
      "IAM e identidade acima de confiança por IP.",
      "Logs preservados e correlacionados."
    ],
    "detectionIdeas": [
      "Origem com muitas conexões para redes internas.",
      "Conexões para portas não usadas.",
      "Tráfego saindo por NAT fora do padrão.",
      "Mudanças inesperadas em regras com CIDR amplo."
    ]
  },
  "lab": {
    "id": "lab-4.1",
    "title": "Identificando IPv4, máscara, gateway e decisão local de envio",
    "labType": "security",
    "objective": "Coletar evidências IPv4 básicas e explicar quando o host usa o MAC do destino ou do gateway.",
    "scenario": "Você está em um notebook de trabalho e precisa provar, de forma segura, se a configuração IPv4 local permite alcançar outras redes.",
    "topology": "Host -> switch/AP -> gateway -> outras redes/internet",
    "architecture": "Host IPv4 em uma LAN com gateway padrão e saída para destinos remotos.",
    "prerequisites": [
      "Ter concluído os módulos 0, 1, 2 e 3.",
      "Ter acesso a um terminal Windows ou Linux."
    ],
    "tools": [
      "Windows PowerShell ou Prompt de Comando",
      "Terminal Linux",
      "Opcional: Cisco Packet Tracer",
      "Opcional: Wireshark somente em ambiente autorizado"
    ],
    "estimatedTimeMinutes": 35,
    "cost": "zero",
    "safetyNotes": [
      "Colete evidências só do seu próprio host ou de laboratório autorizado; não faça varreduras em redes de terceiros.",
      "Sanitize IPs públicos, MACs, gateways e topologia interna antes de publicar qualquer evidência."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Coletar configuração IPv4 no Windows",
        "instruction": "No Windows, colete IP, máscara, gateway e DNS.",
        "command": "ipconfig /all",
        "expectedOutput": "Endereço IPv4, máscara de sub-rede, gateway padrão e servidores DNS.",
        "explanation": "Esses campos definem a identidade lógica local e o próximo salto para redes externas."
      },
      {
        "number": 2,
        "title": "Coletar configuração IPv4 no Linux",
        "instruction": "No Linux, colete endereços e rotas.",
        "command": "ip addr && ip route",
        "expectedOutput": "Interface com IPv4 e rota default via gateway.",
        "explanation": "A rota default mostra para onde o host envia destinos fora da rede local."
      },
      {
        "number": 3,
        "title": "Testar gateway",
        "instruction": "Teste apenas o gateway local identificado.",
        "command": "ping <ip-do-gateway>",
        "expectedOutput": "Respostas ICMP ou evidência de bloqueio controlado.",
        "explanation": "Se o gateway não responde, volte para L1/L2, VLAN, ARP e firewall local antes de culpar DNS."
      },
      {
        "number": 4,
        "title": "Observar ARP do gateway",
        "instruction": "Liste a tabela ARP após tentar acessar o gateway.",
        "command": "arp -a  # Windows\nip neigh  # Linux",
        "expectedOutput": "Entrada associando IP do gateway a um MAC.",
        "explanation": "Para falar com redes remotas, o host precisa entregar o frame ao MAC do gateway local."
      },
      {
        "number": 5,
        "title": "Registrar decisão local",
        "instruction": "Escolha um IP local e um IP remoto e explique qual MAC seria necessário em cada caso.",
        "analysisTask": "Monte uma tabela com as colunas destino, local ou remoto, próximo salto (MAC de quem) e evidência (saída do passo 4 ou do passo 6).",
        "expectedOutput": "Tabela com destino, local/remoto, próximo salto e evidência.",
        "explanation": "O objetivo é demonstrar entendimento, não gerar tráfego desnecessário."
      },
      {
        "number": 6,
        "title": "Comparar caminho local e remoto",
        "instruction": "Escolha um IP da sua rede local e um IP remoto conhecido. Compare a decisão do sistema operacional para cada destino.",
        "command": "ip route get <ip-local> && ip route get <ip-remoto>  # Linux\ntracert <ip-remoto>  # Windows",
        "expectedOutput": "Destino local sem gateway; destino remoto usando rota default ou caminho definido.",
        "explanation": "A comparação evidencia a razão de existir do IPv4: decidir redes e caminhos, não apenas identificar uma interface."
      }
    ],
    "expectedResult": "O aluno deve produzir uma matriz com IP local, máscara, gateway, rota default, entrada ARP do gateway e explicação de destino local versus remoto.",
    "validation": [
      {
        "check": "Existe IPv4 válido",
        "command": "ipconfig /all ou ip addr",
        "expected": "Endereço IPv4 atribuído à interface usada.",
        "ifFails": "Verificar DHCP, cabo, Wi-Fi, VLAN ou configuração manual."
      },
      {
        "check": "Existe rota default",
        "command": "route print ou ip route",
        "expected": "Rota padrão apontando para o gateway.",
        "ifFails": "Validar configuração de gateway ou DHCP."
      },
      {
        "check": "Gateway aparece em ARP",
        "command": "arp -a ou ip neigh",
        "expected": "IP do gateway associado a um MAC.",
        "ifFails": "Pingue o gateway e revise L1/L2, VLAN e firewall local."
      },
      {
        "check": "Decisão local documentada",
        "command": "ip route get <ip-remoto>  # Linux ou tracert <ip-remoto> no Windows",
        "expected": "Evidência do gateway ou primeiro salto usado para destino remoto.",
        "ifFails": "Revisar IP, máscara, gateway, VPN ativa e firewall local."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "IP começa com 169.254 no Windows",
        "probableCause": "APIPA por falha de DHCP.",
        "howToConfirm": "ipconfig /all mostra Autoconfiguration IPv4 Address.",
        "fix": "Verificar DHCP, VLAN, cabo/Wi-Fi e escopo disponível."
      },
      {
        "symptom": "Gateway vazio",
        "probableCause": "Configuração manual incompleta ou DHCP incorreto.",
        "howToConfirm": "ipconfig /all ou ip route sem default gateway.",
        "fix": "Corrigir configuração IPv4 ou escopo DHCP."
      }
    ],
    "improvements": [
      "Montar o mesmo cenário no Packet Tracer com duas redes e um roteador.",
      "Comparar o comportamento com VPN ligada e desligada, se autorizado."
    ],
    "evidenceToCollect": [
      "IP local e máscara sanitizados",
      "Gateway padrão",
      "Rota default",
      "Entrada ARP do gateway",
      "Tabela destino local/remoto/próximo salto",
      "Comparação entre destino local e destino remoto com rota ou primeiro salto registrado"
    ],
    "questions": [
      "Por que o host não busca o MAC de um servidor remoto?",
      "Qual é a diferença entre gateway e DNS?",
      "O que uma máscara errada pode causar?",
      "Por que IP privado não significa segurança automática?"
    ],
    "challenge": "Explique, com base nas evidências, por que um host com IP válido pode acessar recursos locais, mas falhar ao acessar outra rede.",
    "solution": "A solução deve verificar se há gateway, rota default, ARP para o gateway e políticas de firewall/rota. Se recursos locais funcionam, L1/L2 local pode estar parcialmente funcional; falhas para redes externas apontam para gateway, rota, firewall, NAT ou caminho remoto."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que Ethernet sozinha não resolve comunicação entre redes diferentes?",
      "hints": [
        "Pense no escopo do MAC.",
        "Pense no papel do roteador."
      ],
      "expectedIdeas": [
        "MAC é local",
        "IPv4 é lógico",
        "roteadores encaminham entre redes"
      ],
      "explanation": "A resposta deve separar entrega local de roteamento inter-redes."
    },
    {
      "type": "diagnóstico",
      "question": "Um host tem IP, máscara e DNS, mas não tem gateway. O que provavelmente funciona e o que falha?",
      "hints": [
        "Pense em destino local versus remoto.",
        "DNS não substitui rota default."
      ],
      "expectedIdeas": [
        "recursos locais podem funcionar",
        "outras redes falham",
        "rota default ausente"
      ],
      "explanation": "Sem gateway, o host não sabe para onde enviar destinos fora da rede local."
    },
    {
      "type": "cenário real",
      "question": "Em cloud, por que uma subnet com rota errada pode parecer problema de aplicação?",
      "hints": [
        "Pense em route table.",
        "Pense em security group e NAT."
      ],
      "expectedIdeas": [
        "pacotes não chegam",
        "serviço parece indisponível",
        "erro não é necessariamente do código"
      ],
      "explanation": "Aplicações dependem da rede subjacente, incluindo subnets, rotas, NAT e políticas."
    }
  ],
  "quiz": [
    {
      "id": "q4.1.1",
      "question": "Qual problema principal o IPv4 resolve?",
      "options": [
        "Criptografia de pacotes",
        "Endereçamento lógico e roteamento entre redes",
        "Substituição completa do MAC",
        "Tradução de nomes em endereços"
      ],
      "answer": 1,
      "explanation": "IPv4 identifica origem e destino lógico e permite roteamento entre redes.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q4.1.2",
      "question": "Qual afirmação diferencia corretamente MAC e IPv4?",
      "options": [
        "IPv4 só funciona dentro da LAN; os roteadores encaminham entre redes pelo MAC",
        "MAC identifica a rede do host; IPv4 identifica só a placa de rede",
        "MAC é usado para entrega local; IPv4 é endereço lógico roteável",
        "MAC e IPv4 de destino são trocados a cada roteador do caminho"
      ],
      "answer": 2,
      "explanation": "MAC atua só no enlace local e muda a cada salto; IPv4 identifica origem e destino lógicos, que se mantêm, e permite comunicação entre redes.",
      "topic": "mac-vs-ip",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q4.1.3",
      "question": "Um host tem IP e máscara, mas não tem gateway. Qual sintoma é provável?",
      "options": [
        "Acessa recursos da rede local, mas falha para outras redes",
        "Não acessa nem os hosts da própria rede local",
        "Acessa outras redes por IP, mas falha ao usar nomes",
        "Acessa outras redes normalmente, porque o switch encaminha o tráfego para fora"
      ],
      "answer": 0,
      "explanation": "Sem gateway, destinos fora da rede local não têm próximo salto. Destinos locais continuam funcionando, porque o host faz ARP direto para eles.",
      "topic": "gateway",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q4.1.7",
      "question": "O notebook 192.168.1.50/24, com gateway 192.168.1.1, envia um pacote para 8.8.8.8. Quais destinos vão no frame Ethernet e no pacote IPv4 que saem do notebook?",
      "options": [
        "MAC do servidor 8.8.8.8; IP de destino 8.8.8.8",
        "MAC de broadcast; IP de destino 8.8.8.8",
        "MAC do gateway 192.168.1.1; IP de destino 192.168.1.1",
        "MAC do gateway 192.168.1.1; IP de destino 8.8.8.8"
      ],
      "answer": 3,
      "explanation": "8.8.8.8 está fora de 192.168.1.0/24, então o host faz ARP para o gateway e usa o MAC dele no frame. O IP de destino do pacote continua 8.8.8.8 até o fim do caminho.",
      "topic": "decisao-local",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q4.1.4",
      "question": "Por que não é seguro confiar apenas em IP de origem como identidade?",
      "options": [
        "Porque o IP de origem é trocado a cada roteador do caminho",
        "Porque NAT, DHCP, proxy e VPN podem alterar ou compartilhar contexto de origem",
        "Porque endereços IPv4 privados não aparecem em logs de firewall",
        "Porque o cabeçalho IPv4 não tem campo de endereço de origem"
      ],
      "answer": 1,
      "explanation": "O IP de origem viaja no cabeçalho e se mantém no caminho, mas DHCP reatribui endereços, NAT e proxy concentram vários usuários num mesmo IP e VPN muda a origem aparente. Correlacione com lease, autenticação e horário.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q4.1.6",
      "question": "Se o gateway não responde, qual abordagem vem antes de culpar DNS?",
      "options": [
        "Limpar o cache DNS e testar de novo pelo nome",
        "Trocar o servidor DNS configurado no host",
        "Validar L1/L2, VLAN, ARP, IP e firewall local",
        "Reiniciar a aplicação que está falhando"
      ],
      "answer": 2,
      "explanation": "O gateway é testado por IP direto, sem DNS. Se ele não responde, o problema está antes: enlace, VLAN, ARP, endereçamento ou firewall local.",
      "topic": "diagnóstico",
      "difficulty": "iniciante",
      "type": "troubleshooting"
    }
  ],
  "flashcards": [
    {
      "id": "fc4.1.7",
      "front": "O que muda e o que se mantém quando um pacote atravessa um roteador?",
      "back": "Mudam os MACs de origem e destino (o roteador cria um novo frame para cada enlace); o IP de origem e o IP de destino se mantêm.",
      "tags": [
        "ipv4",
        "mac"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.1.8",
      "front": "Em que camada o IPv4 opera e o que fica acima e abaixo dele?",
      "back": "Camada 3 (Rede) no OSI, camada Internet no TCP/IP. Abaixo: Ethernet, Wi-Fi, PPP, túneis. Acima: TCP, UDP e ICMP.",
      "tags": [
        "ipv4",
        "camadas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.1.3",
      "front": "Para que serve o gateway padrão?",
      "back": "É o próximo salto usado pelo host para alcançar redes fora da rede local.",
      "tags": [
        "gateway"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.1.4",
      "front": "IPv4 garante segurança?",
      "back": "Não. IPv4 endereça e roteia, mas não garante entrega, confidencialidade nem autenticação; segurança depende de firewall, segmentação, IAM, logs e criptografia.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.1.5",
      "front": "O que a máscara ajuda a decidir?",
      "back": "Se um destino IPv4 está na rede local ou precisa ser enviado ao gateway.",
      "tags": [
        "máscara"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.1.9",
      "front": "Preciso de DNS para pingar 8.8.8.8?",
      "back": "Não. DNS só traduz nome em IP; tráfego para um IP direto não depende de DNS.",
      "tags": [
        "dns",
        "diagnóstico"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex4.1.1",
      "type": "conceitual",
      "prompt": "Explique por que o IPv4 não substitui Ethernet.",
      "expectedAnswer": "IPv4 fornece endereçamento lógico e roteamento; Ethernet entrega frames localmente usando MAC em cada enlace.",
      "explanation": "As duas tecnologias trabalham em camadas diferentes e se complementam."
    },
    {
      "id": "ex4.1.5",
      "type": "diagnóstico",
      "prompt": "O notebook 192.168.1.50 deveria usar máscara /24 (rede 192.168.1.0/24), mas foi configurado com /16, que faz o host considerar local todo endereço 192.168.x.x. Ele tenta acessar o servidor 192.168.20.10, que fica em outra rede, atrás do gateway 192.168.1.1. O que o notebook faz e qual sintoma aparece?",
      "expectedAnswer": "Com /16, o notebook conclui que 192.168.20.10 é local e faz ARP direto para ele, em vez de usar o gateway. Como o servidor não está na LAN, ninguém responde ao ARP e o acesso falha, enquanto os hosts de 192.168.1.0/24 continuam acessíveis.",
      "explanation": "Máscara errada gera decisão local errada: o frame nunca é entregue ao gateway para esse destino. Corrigir a máscara para /24 resolve."
    },
    {
      "id": "ex4.1.3",
      "type": "segurança",
      "prompt": "Explique por que permitir 0.0.0.0/0 para administração remota é ruim.",
      "expectedAnswer": "Expõe o serviço para qualquer origem, aumentando superfície de ataque. Deve-se restringir origem, usar VPN/ZTNA, MFA, logs e expiração.",
      "explanation": "Conectividade ampla sem necessidade viola menor privilégio."
    },
    {
      "id": "ex4.1.4",
      "type": "cloud",
      "prompt": "Relacione subnet, route table e security group em uma VM cloud.",
      "expectedAnswer": "A subnet define o segmento lógico, a route table define caminhos e o security group controla tráfego permitido para a interface/instância.",
      "explanation": "Os três elementos afetam conectividade, custo e segurança."
    }
  ],
  "challenge": {
    "title": "Explique o caminho IPv4 de um notebook até um sistema em outra rede",
    "scenario": "Um notebook na rede 192.168.10.0/24 precisa acessar um sistema em 10.20.30.40. O gateway local é 192.168.10.1.",
    "tasks": [
      "Explicar por que o destino não é local.",
      "Indicar qual MAC o notebook precisa descobrir primeiro.",
      "Listar comandos para validar IP, rota e ARP.",
      "Apontar dois riscos de segurança e duas mitigações.",
      "Diferenciar problema de IP, DNS e aplicação."
    ],
    "constraints": [
      "Não assumir acesso administrativo ao switch.",
      "Não executar varredura.",
      "Sanitizar IPs e MACs no relatório."
    ],
    "expectedDeliverables": [
      "Tabela de decisão local/remoto",
      "Lista de comandos",
      "Matriz de evidências",
      "Riscos e mitigação",
      "Conclusão técnica"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação MAC/IP/gateway",
        "points": 30,
        "description": "Diferencia entrega local e roteamento."
      },
      {
        "criterion": "Evidências de troubleshooting",
        "points": 30,
        "description": "Usa comandos corretos e interpreta resultados."
      },
      {
        "criterion": "Segurança defensiva",
        "points": 20,
        "description": "Aponta riscos reais e controles proporcionais."
      },
      {
        "criterion": "Clareza do relatório",
        "points": 20,
        "description": "Entrega raciocínio organizado e sanitizado."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro decidimos se 10.20.30.40 pertence à rede local 192.168.10.0/24. Como não pertence, o notebook não tenta descobrir o MAC do servidor remoto; ele precisa descobrir o MAC do gateway 192.168.10.1. Depois, o gateway roteia o pacote para o próximo caminho.",
    "steps": [
      "Identificar IP e máscara do notebook.",
      "Comparar destino com a rede local.",
      "Verificar gateway padrão.",
      "Validar ARP do gateway.",
      "Testar conectividade controlada.",
      "Verificar firewall, rota e logs caso o gateway responda mas o destino falhe."
    ],
    "commonWrongAnswers": [
      {
        "answer": "O notebook precisa do MAC do servidor remoto.",
        "whyItIsWrong": "MAC é usado apenas no enlace local. Para destino remoto, o MAC inicial é do gateway."
      },
      {
        "answer": "Se ping por IP falha, o problema é DNS.",
        "whyItIsWrong": "DNS só traduz nomes. Falha por IP aponta para rota, firewall, gateway, host remoto ou bloqueio ICMP."
      },
      {
        "answer": "IP privado é seguro por definição.",
        "whyItIsWrong": "IP privado reduz exposição direta, mas não substitui firewall, segmentação, autenticação e logs."
      }
    ],
    "finalAnswer": "O caminho correto começa no host, que identifica destino remoto, usa ARP para o gateway local, envia um frame Ethernet ao gateway contendo pacote IPv4 com destino 10.20.30.40, e depende de rotas e controles seguintes para alcançar o sistema."
  },
  "glossary": [
    {
      "term": "IPv4",
      "shortDefinition": "Protocolo de endereçamento lógico de 32 bits usado para comunicação entre redes.",
      "longDefinition": "IPv4 identifica origem e destino lógico de pacotes e permite que roteadores encaminhem tráfego entre redes diferentes.",
      "example": "192.168.10.20 é um endereço IPv4 privado comum em LANs.",
      "relatedTerms": [
        "IP",
        "gateway",
        "máscara",
        "roteamento"
      ],
      "relatedLessons": [
        "2.5",
        "3.5",
        "4.2"
      ]
    },
    {
      "term": "Gateway padrão",
      "shortDefinition": "Próximo salto usado para destinos fora da rede local.",
      "longDefinition": "O gateway padrão normalmente é um roteador ou firewall com interface na mesma sub-rede do host.",
      "example": "Em 192.168.1.0/24, o gateway pode ser 192.168.1.1.",
      "relatedTerms": [
        "rota default",
        "roteador",
        "sub-rede"
      ],
      "relatedLessons": [
        "2.5",
        "4.5"
      ]
    },
    {
      "term": "Máscara de rede",
      "shortDefinition": "Valor que separa parte de rede e parte de host no IPv4.",
      "longDefinition": "A máscara permite ao host decidir se o destino está localmente acessível ou se precisa ir ao gateway.",
      "example": "/24 equivale a 255.255.255.0.",
      "relatedTerms": [
        "CIDR",
        "subnetting"
      ],
      "relatedLessons": [
        "4.3",
        "5.1"
      ]
    },
    {
      "term": "Roteamento",
      "shortDefinition": "Processo de encaminhar pacotes entre redes.",
      "longDefinition": "Roteadores usam tabelas de rotas para escolher o próximo salto de pacotes IP.",
      "example": "Um pacote para outra filial passa por gateway, WAN e rotas intermediárias.",
      "relatedTerms": [
        "rota",
        "gateway",
        "TTL"
      ],
      "relatedLessons": [
        "2.5",
        "11.1"
      ]
    },
    {
      "term": "Endereço lógico",
      "shortDefinition": "Identificador usado por protocolos de rede para organizar comunicação entre redes.",
      "longDefinition": "No IPv4, o endereço lógico pode mudar conforme rede, DHCP, VPN ou cloud, diferentemente de um identificador físico local como MAC.",
      "example": "Um notebook pode ter IP diferente em casa, no trabalho e na VPN.",
      "relatedTerms": [
        "IPv4",
        "DHCP",
        "VPN"
      ],
      "relatedLessons": [
        "4.1",
        "4.7"
      ]
    },
    {
      "term": "Rota default",
      "shortDefinition": "Rota usada quando não há rota mais específica para o destino.",
      "longDefinition": "Em hosts comuns, a rota default aponta para o gateway padrão.",
      "example": "0.0.0.0/0 via 192.168.1.1.",
      "relatedTerms": [
        "gateway",
        "tabela de rotas"
      ],
      "relatedLessons": [
        "4.5",
        "11.1"
      ]
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Referência histórica e técnica do IPv4."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.5",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Introduz Camada 3, IP, gateway, roteamento e TTL."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 3.5",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Explica ARP como ponte entre IPv4 e MAC na LAN."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud Networking",
      "lesson": "subnets e route tables",
      "reason": "IPv4 é base para VPC/VNet, subnets, NAT, private endpoints e firewalls cloud."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso baseado em contexto",
      "lesson": "políticas condicionais por rede",
      "reason": "Algumas políticas usam IP como sinal de contexto, mas IP não substitui identidade forte."
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
      "4.2"
    ]
  }
};
