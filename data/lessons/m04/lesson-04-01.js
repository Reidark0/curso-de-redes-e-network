export const lesson0401 = {
  "id": "4.1",
  "moduleId": "m04",
  "order": 1,
  "title": "Por que o IPv4 existe",
  "subtitle": "Como a rede deixa de ser uma LAN isolada e passa a interligar redes usando endereçamento lógico e roteamento.",
  "duration": "95-135 min",
  "estimatedStudyTimeMinutes": 135,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Imagine que você está no suporte ou no SOC e recebe um chamado: “o notebook tem cabo conectado, o Wi-Fi funciona, mas o sistema de outra filial não abre”. No Módulo 3 você aprendeu que Ethernet entrega frames dentro da rede local usando endereços MAC. Mas o sistema está em outra rede. O MAC do servidor remoto não está na sua LAN, o switch local não sabe encaminhar para uma rede distante e o broadcast ARP não atravessa roteadores.</p><p>É aqui que o IPv4 aparece como uma das ideias mais importantes da história das redes: um endereço lógico capaz de identificar redes e hosts de forma hierárquica, permitindo que roteadores encaminhem pacotes entre redes diferentes. Sem IPv4, Ethernet seria excelente dentro de uma LAN, mas não resolveria a comunicação entre departamentos, prédios, filiais, datacenters, provedores e cloud.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> quando alguém confunde MAC, IP, gateway e DNS, o troubleshooting vira tentativa e erro. IPv4 é o ponto em que a rede deixa de ser apenas local e passa a ser interligada.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>Antes da internet moderna, muitas redes eram ilhas. Cada tecnologia de rede local resolvia seu próprio domínio, mas não havia uma forma universal e escalável de interligar redes heterogêneas. O objetivo da arquitetura TCP/IP era permitir comunicação entre redes diferentes, com equipamentos diferentes, administradas por organizações diferentes.</p><p>O IPv4 surgiu nesse contexto como protocolo de Camada 3: ele fornece endereçamento lógico, identificação de origem e destino, campos de controle e capacidade de roteamento. A Ethernet continuou importante, mas passou a cumprir principalmente a entrega local de quadros. O IP ficou responsável pelo caminho lógico entre redes.</p><p>A versão 4 do IP tornou-se dominante por décadas. Mesmo com o surgimento do IPv6, o IPv4 ainda está presente em redes domésticas, empresas, cloud, VPNs, NAT, firewalls, logs, SIEMs, balanceadores e troubleshooting diário.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema que o IPv4 resolve é o endereçamento entre redes. Ethernet usa MAC para entrega local, mas MAC não diz em qual rede um host está, não possui hierarquia global prática e não é usado por roteadores para escolher caminhos entre redes.</p><ul class=\"flow-list\"><li><strong>Sem IP:</strong> redes locais não teriam um esquema padronizado para interligação.</li><li><strong>Sem máscara:</strong> o host não saberia separar parte de rede e parte de host.</li><li><strong>Sem gateway:</strong> um host não saberia para onde enviar tráfego destinado a outra rede.</li><li><strong>Sem roteamento:</strong> cada LAN seria uma ilha operacional.</li><li><strong>Sem campos IP:</strong> firewalls, logs, NAT, VPN e ferramentas de diagnóstico perderiam grande parte do contexto.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução do endereçamento mostra a passagem de comunicação local para comunicação inter-redes. Primeiro, a máquina precisava entregar bits no meio físico. Depois, Ethernet organizou frames e endereços MAC. Em seguida, o IP trouxe endereçamento lógico e roteável. Mais tarde, sub-redes, CIDR, NAT, DHCP, VPN e cloud networking ampliaram o uso do IPv4 em ambientes cada vez maiores.</p><table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead><tbody><tr><td>Endereçamento físico/MAC</td><td>Identifica interfaces locais</td><td>Não organiza redes remotas</td><td>Endereçamento lógico IP</td></tr><tr><td>Redes locais isoladas</td><td>Comunicação dentro da LAN</td><td>Não escala para filiais e internet</td><td>Roteadores e IP</td></tr><tr><td>Endereçamento classful</td><td>Classes A, B e C fixas</td><td>Desperdício de endereços</td><td>CIDR e subnetting</td></tr><tr><td>IPv4 público para tudo</td><td>Cada host poderia ter IP global</td><td>Escassez de endereços</td><td>NAT, IPv6 e redes privadas</td></tr></tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>IPv4 é um protocolo de Camada 3 usado para endereçamento lógico e roteamento de pacotes entre redes. Um endereço IPv4 possui 32 bits, normalmente escrito em quatro octetos decimais, como <code>192.168.10.20</code>. Ele não substitui Ethernet: ele trabalha acima dela. Ethernet entrega o frame ao próximo salto local; IPv4 identifica origem e destino lógico do pacote.</p><div class=\"definition-box\"><strong>Definição:</strong> IPv4 é o protocolo que permite identificar hosts e redes de forma lógica, possibilitando que roteadores encaminhem pacotes entre redes diferentes.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Quando um host precisa enviar tráfego, ele executa uma decisão local antes de transmitir qualquer frame. Essa decisão depende do próprio IP, da máscara de rede, do IP de destino e da rota padrão.</p><ol class=\"flow-list\"><li>O host recebe ou possui um endereço IPv4, uma máscara, gateway e DNS.</li><li>Ele compara o próprio IP com o IP de destino usando a máscara.</li><li>Se o destino estiver na mesma rede, o host tenta descobrir o MAC do destino com ARP.</li><li>Se o destino estiver em outra rede, o host tenta descobrir o MAC do gateway com ARP.</li><li>O pacote IPv4 mantém IP de origem e IP de destino.</li><li>O frame Ethernet usa MAC de origem e MAC de destino apenas para o próximo salto local.</li><li>Cada roteador remove o frame local, analisa o pacote IP e cria um novo frame para o próximo enlace.</li></ol>\n<div class=\"callout callout--mentor\"><strong>Modelo mental v2.0:</strong> o host não pergunta “qual cabo leva ao destino?”. Ele pergunta primeiro “o destino pertence à minha rede lógica?”. Se sim, ele usa ARP para o destino. Se não, usa ARP para o gateway. Essa separação evita confundir entrega local, roteamento e resolução de nomes.</div><p>Um detalhe essencial para troubleshooting é que o IP de destino do pacote não muda quando o pacote sai da LAN. O que muda a cada enlace é o frame de Camada 2. Por isso, em um capture local você vê o MAC do gateway como destino Ethernet mesmo quando o IP de destino é um servidor remoto.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Na arquitetura de rede, IPv4 fica entre a entrega local da Camada 2 e os protocolos de transporte da Camada 4. Ele depende de Ethernet, Wi-Fi, PPP, túneis ou redes virtuais para transportar seus pacotes em cada enlace. Acima dele, TCP, UDP, ICMP e outros protocolos usam o IP como base para comunicação.</p><ul><li><strong>Camada OSI:</strong> Camada 3 — Rede.</li><li><strong>Camada TCP/IP:</strong> Internet.</li><li><strong>Componentes:</strong> hosts, interfaces, roteadores, gateways, firewalls, NAT, VPNs e route tables.</li><li><strong>Pontos de falha:</strong> IP incorreto, máscara errada, gateway ausente, rota faltando, conflito de IP, NAT incorreto ou bloqueio de firewall.</li></ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em uma empresa com vários prédios. O MAC é como a mesa dentro de um andar específico: útil para entrega local. O IPv4 é como o endereço completo do prédio, andar e setor, permitindo encaminhar a entrega para outra unidade. O gateway é a portaria que encaminha correspondência para fora do prédio local.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> pacotes IP não carregam uma rota completa como um envelope postal. Cada roteador decide apenas o próximo salto usando sua tabela de rotas.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Seu notebook tem o IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. Quando você acessa <code>192.168.1.80</code>, o destino está na mesma rede <code>192.168.1.0/24</code>, então o notebook busca o MAC de <code>192.168.1.80</code>. Quando acessa <code>8.8.8.8</code>, o destino está fora da rede local, então o notebook busca o MAC do gateway <code>192.168.1.1</code>.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, usuários da VLAN 10 podem estar na rede <code>10.10.10.0/24</code>, servidores na rede <code>10.10.20.0/24</code> e impressoras na rede <code>10.10.30.0/24</code>. O IPv4 permite separar essas redes, criar rotas, aplicar políticas em firewall, registrar logs por origem/destino e diagnosticar problemas por segmento.</p><p>Um erro de máscara pode fazer um host acreditar que um servidor remoto é local, tentando ARP onde deveria usar gateway. Uma rota ausente pode permitir acesso local, mas quebrar comunicação com outra filial. Um conflito de IP pode gerar sintomas intermitentes e difíceis de diagnosticar.</p>\n<p>Em ambientes corporativos, esse raciocínio aparece em incidentes de migração de VLAN, troca de firewall, implantação de filial e alteração de rota. Uma estação pode ter IP aparentemente correto e ainda assim falhar se a máscara fizer o host acreditar que um destino remoto está local, ou se o gateway configurado não pertence à sub-rede do host.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, IPv4 aparece em VPCs, VNets, subnets, route tables, NAT Gateways, load balancers, private endpoints e security groups. Mesmo quando a infraestrutura é virtual, o raciocínio é o mesmo: uma instância tem IP privado, pertence a uma sub-rede, usa uma tabela de rotas e passa por controles de segurança.</p><p>Custos também entram na arquitetura. NAT Gateway, tráfego entre zonas, firewall gerenciado e logs de fluxo podem gerar cobrança. Por isso, desenhar IPv4 em cloud não é apenas “escolher um bloco”: envolve segurança, custo, observabilidade e operação.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, IPv4 aparece em pipelines que acessam registries, runners self-hosted, allowlists temporárias, clusters Kubernetes, NetworkPolicies, ingress controllers, scanners e conexões com bancos. Um erro de CIDR em Terraform pode expor uma porta para a internet ou bloquear um pipeline legítimo.</p><p>Quando um deploy falha, o problema pode não ser o código. Pode ser rota, DNS, firewall, security group, proxy, NAT, subnet, endpoint privado ou conflito de IP em ambiente híbrido.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>IPv4 é central para segurança defensiva porque muitos controles e evidências usam IP de origem, IP de destino, porta, protocolo e rota. Firewalls, WAFs, SIEMs, EDRs, flow logs, VPNs e IDS dependem de interpretação correta de endereços.</p><table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody><tr><td>Rede plana</td><td>Muitos ativos no mesmo segmento</td><td>Movimento lateral facilitado</td><td>Segmentação, firewall interno e menor privilégio</td></tr><tr><td>IP público exposto</td><td>Serviço acessível da internet</td><td>Superfície de ataque maior</td><td>Security groups restritivos, WAF, VPN/ZTNA</td></tr><tr><td>Logs mal interpretados</td><td>NAT e proxies ocultam origem real</td><td>Investigação incorreta</td><td>Preservar headers confiáveis e logs de NAT/proxy</td></tr><tr><td>Allowlist ampla</td><td>CIDR permissivo como <code>0.0.0.0/0</code></td><td>Acesso excessivo</td><td>Escopo mínimo, revisão e expiração</td></tr></tbody></table>\n<p>Do ponto de vista defensivo, IPv4 também é a unidade básica de muitas decisões de segurança: listas de permissão, regras de firewall, logs de proxy, alertas de SIEM e investigações de origem. Porém, IP sozinho não é identidade forte. Em redes com DHCP, NAT, VPN, proxy ou balanceadores, a atribuição correta exige correlação com horário, lease, autenticação e caminho de rede.</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m04l01-title m04l01-desc\">\n  <title id=\"m04l01-title\">IPv4 como endereçamento lógico entre redes</title>\n  <desc id=\"m04l01-desc\">Um host envia um pacote IPv4 para outra rede usando o gateway local, enquanto Ethernet troca os endereços MAC a cada enlace.</desc>\n  <defs>\n    <marker id=\"m04l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n  </defs>\n  <rect x=\"40\" y=\"145\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"115\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n  <text x=\"115\" y=\"204\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.20</text>\n  <rect x=\"250\" y=\"145\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"325\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Switch LAN</text>\n  <text x=\"325\" y=\"204\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2</text>\n  <rect x=\"460\" y=\"145\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"535\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n  <text x=\"535\" y=\"204\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1</text>\n  <rect x=\"690\" y=\"145\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"765\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Servidor B</text>\n  <text x=\"765\" y=\"204\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 10.20.30.40</text>\n  <line x1=\"190\" y1=\"185\" x2=\"250\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l01-arrow)\" />\n  <line x1=\"400\" y1=\"185\" x2=\"460\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l01-arrow)\" />\n  <line x1=\"610\" y1=\"185\" x2=\"690\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l01-arrow)\" />\n  <rect x=\"70\" y=\"55\" width=\"730\" height=\"54\" rx=\"12\" class=\"svg-boundary\" />\n  <text x=\"435\" y=\"87\" text-anchor=\"middle\" class=\"svg-label\">Pacote IPv4 mantém IP origem 192.168.10.20 e IP destino 10.20.30.40</text>\n  <rect x=\"70\" y=\"285\" width=\"730\" height=\"60\" rx=\"12\" class=\"svg-zone\" />\n  <text x=\"435\" y=\"312\" text-anchor=\"middle\" class=\"svg-label\">Frames Ethernet mudam MAC origem/destino a cada enlace</text>\n  <text x=\"435\" y=\"335\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IPv4 identifica origem/destino lógico; Ethernet entrega ao próximo salto local</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório desta aula coleta evidências IPv4 básicas do host e constrói a primeira matriz de decisão: IP próprio, máscara, gateway, destino local, destino remoto e rota padrão. O objetivo não é “decorar comando”, mas aprender a interpretar o que cada evidência permite concluir.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam a diferença entre IPv4 e MAC, a função do gateway e a decisão local de envio para destino local ou remoto.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Você receberá um cenário de empresa pequena com três redes e precisará explicar por que IPv4 é necessário, onde Ethernet termina, onde o gateway entra e quais riscos de segurança aparecem.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra o raciocínio: primeiro separar Camada 2 de Camada 3, depois identificar rede local, gateway, rota, controle de segurança e evidências de validação.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li>IPv4 existe para endereçamento lógico e roteamento entre redes.</li><li>MAC entrega localmente; IP identifica origem e destino lógico.</li><li>Gateway é o próximo salto para destinos fora da rede local.</li><li>Máscara define qual parte do endereço representa a rede.</li><li>Segurança e troubleshooting dependem de interpretar IP, rota, NAT e logs corretamente.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, vamos abrir a estrutura do endereço IPv4 e seus octetos. A aula 4.2 transforma a ideia de “IP como endereço lógico” em leitura técnica de 32 bits, quatro octetos, decimal pontuado e limites numéricos.</p>\n</section>"
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
  "deepDive": {
    "mentalModel": "IPv4 é o endereço lógico que permite decidir se o destino está na rede local ou se o pacote precisa ir ao gateway para alcançar outra rede.",
    "keyTerms": [
      "IPv4",
      "endereço lógico",
      "máscara",
      "gateway",
      "rota",
      "pacote"
    ],
    "limitations": [
      "IPv4 tem espaço de endereços limitado.",
      "IPv4 por si só não garante entrega, confidencialidade, autenticação ou autorização.",
      "Um IP identifica um ponto lógico de rede em determinado momento, não necessariamente uma pessoa ou processo."
    ],
    "whenToUse": [
      "Endereçar hosts e redes em ambientes IPv4.",
      "Planejar sub-redes, rotas, NAT e políticas de firewall.",
      "Interpretar logs e evidências de conectividade."
    ],
    "whenNotToUse": [
      "Como substituto de identidade forte.",
      "Como único controle de segurança.",
      "Como prova absoluta de autoria sem contexto de NAT, proxy, DHCP e logs."
    ],
    "operationalImpact": [
      "Exige documentação de sub-redes, gateways, reservas e rotas.",
      "Erros de máscara, gateway ou rota geram troubleshooting complexo.",
      "Mudanças de IP podem afetar firewall, DNS, monitoramento e allowlists.",
      "Mudanças de gateway, máscara ou rota devem ser tratadas como mudança de arquitetura, não apenas ajuste de estação, porque podem alterar caminhos, logs e controles de segurança."
    ],
    "financialImpact": [
      "Em cloud, IP público, NAT Gateway, firewall gerenciado, tráfego entre zonas e logs podem gerar custo recorrente.",
      "Endereçamento mal planejado pode exigir retrabalho, renumeração e janelas de manutenção.",
      "Em cloud, escolher entre IP público, NAT gerenciado, bastion, VPN ou endpoint privado muda custo recorrente e também o esforço de operação."
    ],
    "securityImpact": [
      "IPv4 é usado em regras de firewall, logs, SIEM e segmentação.",
      "Redes planas aumentam movimento lateral.",
      "Allowlists amplas e IP público exposto aumentam superfície de ataque."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Confundir IP com MAC.",
      "whyItHappens": "Ambos aparecem como identificadores de rede.",
      "consequence": "O aluno tenta resolver problema de roteamento olhando apenas tabela MAC ou ARP.",
      "correction": "MAC é entrega local de Camada 2; IPv4 é endereçamento lógico roteável de Camada 3."
    },
    {
      "mistake": "Achar que DNS é necessário para pingar um IP.",
      "whyItHappens": "Muitos acessos usam nomes, como sites e APIs.",
      "consequence": "Diagnóstico perde tempo com DNS quando o problema é IP, rota ou gateway.",
      "correction": "DNS traduz nome em IP; tráfego para IP direto não depende de DNS."
    },
    {
      "mistake": "Usar IP como identidade de usuário.",
      "whyItHappens": "Logs frequentemente mostram IP de origem.",
      "consequence": "Investigação pode atribuir ação à pessoa errada em ambientes com NAT, DHCP ou proxy.",
      "correction": "Correlacionar IP com DHCP, autenticação, proxy, EDR, VPN e horário."
    }
  ],
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
      "Planejar blocos IPv4 por função e criticidade.",
      "Evitar redes planas.",
      "Documentar sub-redes, gateways e rotas.",
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
      "Interpretar IP de origem sem considerar proxy, NAT ou VPN."
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
      "Segmentação por função.",
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
  "protocolFields": [
    {
      "field": "Source Address",
      "size": "32 bits",
      "purpose": "Identificar o endereço IPv4 de origem do pacote.",
      "securityObservation": "Pode ser alterado em alguns cenários; em redes internas, precisa ser correlacionado com DHCP, NAT, VPN e logs."
    },
    {
      "field": "Destination Address",
      "size": "32 bits",
      "purpose": "Identificar o endereço IPv4 de destino.",
      "securityObservation": "Útil para firewall, roteamento, flow logs e investigação."
    },
    {
      "field": "TTL",
      "size": "8 bits",
      "purpose": "Limitar a vida do pacote e ajudar a evitar loops infinitos.",
      "securityObservation": "Aparece em traceroute e pode ajudar a inferir caminho, mas não deve ser usado como prova isolada."
    },
    {
      "field": "Protocol",
      "size": "8 bits",
      "purpose": "Indicar o protocolo transportado, como ICMP, TCP ou UDP.",
      "securityObservation": "Firewalls e IDS usam esse campo junto com portas e estado para decisões."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Compara IP local e IP de destino usando a máscara.",
      "detail": "Decide se o destino é local ou remoto.",
      "possibleFailure": "Máscara incorreta gera decisão errada."
    },
    {
      "step": 2,
      "actor": "Host",
      "action": "Escolhe o próximo salto.",
      "detail": "Destino local usa MAC do destino; destino remoto usa MAC do gateway.",
      "possibleFailure": "Gateway ausente impede comunicação com outras redes."
    },
    {
      "step": 3,
      "actor": "ARP/Ethernet",
      "action": "Resolve o MAC necessário para o próximo salto local.",
      "detail": "ARP Request/Reply ocorre dentro da VLAN local.",
      "possibleFailure": "VLAN errada ou ARP inconsistente impede entrega local."
    },
    {
      "step": 4,
      "actor": "Roteador/Gateway",
      "action": "Analisa o pacote IPv4 e consulta tabela de rotas.",
      "detail": "Escolhe próximo salto para a rede de destino.",
      "possibleFailure": "Rota ausente ou firewall bloqueando causa falha."
    }
  ],
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
      "Ter acesso a um terminal Windows ou Linux.",
      "Usar apenas sua própria máquina ou laboratório autorizado."
    ],
    "tools": [
      "Windows PowerShell ou Prompt de Comando",
      "Terminal Linux",
      "Opcional: Cisco Packet Tracer",
      "Opcional: Wireshark somente em ambiente autorizado"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varreduras em redes de terceiros.",
      "Não publique IPs públicos, MACs, gateways ou topologia interna sem sanitização.",
      "Colete apenas evidências do seu próprio host ou laboratório autorizado."
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
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
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
      },
      {
        "symptom": "Gateway não responde",
        "probableCause": "Falha L1/L2, VLAN errada, ARP inconsistente ou ICMP bloqueado.",
        "howToConfirm": "Ver link, VLAN, ARP e logs locais.",
        "fix": "Corrigir causa raiz antes de testar DNS ou aplicação."
      }
    ],
    "improvements": [
      "Montar o mesmo cenário no Packet Tracer com duas redes e um roteador.",
      "Adicionar uma tabela de evidências sanitizada ao seu caderno técnico.",
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
      "type": "conceito",
      "q": "Qual problema principal o IPv4 resolve?",
      "opts": [
        "Endereçamento lógico e roteamento entre redes",
        "Criptografia de pacotes",
        "Substituição completa do MAC",
        "Tradução de nomes em endereços"
      ],
      "a": 0,
      "exp": "IPv4 identifica origem e destino lógico e permite roteamento entre redes.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q4.1.2",
      "type": "comparação",
      "q": "Qual afirmação diferencia corretamente MAC e IPv4?",
      "opts": [
        "MAC é usado para entrega local; IPv4 é endereço lógico roteável",
        "MAC é sempre público; IPv4 é sempre privado",
        "IPv4 só funciona dentro da LAN; MAC funciona na internet",
        "MAC substitui gateway"
      ],
      "a": 0,
      "exp": "MAC atua no enlace local; IPv4 permite comunicação lógica entre redes.",
      "difficulty": "iniciante",
      "topic": "mac-vs-ip"
    },
    {
      "id": "q4.1.3",
      "type": "diagnóstico",
      "q": "Um host tem IP e máscara, mas não tem gateway. Qual sintoma é provável?",
      "opts": [
        "Acessa apenas recursos locais, mas falha para redes externas",
        "Não consegue converter texto em UTF-8",
        "Todos os switches param de aprender MAC",
        "O DNS sempre passa a criptografar respostas"
      ],
      "a": 0,
      "exp": "Sem gateway, destinos fora da rede local não têm próximo salto.",
      "difficulty": "iniciante",
      "topic": "gateway"
    },
    {
      "id": "q4.1.4",
      "type": "segurança",
      "q": "Por que não é seguro confiar apenas em IP de origem como identidade?",
      "opts": [
        "Porque NAT, DHCP, proxy e VPN podem alterar ou compartilhar contexto de origem",
        "Porque IP sempre muda a cada pacote",
        "Porque IP é um algoritmo de criptografia fraco",
        "Porque MAC é globalmente roteável"
      ],
      "a": 0,
      "exp": "IP precisa ser correlacionado com outros logs e identidades.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q4.1.5",
      "type": "cloud",
      "q": "Em cloud, qual recurso se relaciona diretamente com o encaminhamento IPv4 entre sub-redes?",
      "opts": [
        "Route table",
        "Fonte do servidor",
        "Teclado do operador",
        "Encoding UTF-8"
      ],
      "a": 0,
      "exp": "Route tables definem como pacotes são encaminhados em redes cloud.",
      "difficulty": "iniciante",
      "topic": "cloud"
    },
    {
      "id": "q4.1.6",
      "type": "troubleshooting",
      "q": "Se o gateway não responde, qual abordagem vem antes de culpar DNS?",
      "opts": [
        "Validar L1/L2, VLAN, ARP, IP e firewall local",
        "Trocar o certificado TLS",
        "Reinstalar o navegador",
        "Alterar o JSON da aplicação"
      ],
      "a": 0,
      "exp": "DNS atua depois que a conectividade básica está coerente.",
      "difficulty": "iniciante",
      "topic": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc4.1.1",
      "front": "O que é IPv4?",
      "back": "Protocolo de Camada 3 usado para endereçamento lógico e roteamento entre redes.",
      "tags": [
        "ipv4"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.1.2",
      "front": "MAC e IP são iguais?",
      "back": "Não. MAC entrega localmente na Camada 2; IPv4 identifica origem/destino lógico na Camada 3.",
      "tags": [
        "mac",
        "ipv4"
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
      "back": "Não. IPv4 endereça e roteia; segurança depende de controles como firewall, segmentação, IAM, logs e criptografia.",
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
      "id": "fc4.1.6",
      "front": "Por que IP de origem em log não prova autoria sozinho?",
      "back": "Porque pode haver NAT, DHCP, proxy, VPN, compartilhamento de dispositivo ou falta de correlação com identidade.",
      "tags": [
        "logs",
        "segurança"
      ],
      "difficulty": "intermediário"
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
      "id": "ex4.1.2",
      "type": "diagnóstico",
      "prompt": "Um host acessa outro host na mesma rede, mas não acessa a internet. Liste três hipóteses IPv4.",
      "expectedAnswer": "Gateway ausente/incorreto, rota default ausente, firewall/NAT/rota externa bloqueando.",
      "explanation": "Se local funciona, L2 pode estar ok; falhas externas apontam para gateway, rota ou controle."
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
      "example": "/24 equivale, em geral, a 255.255.255.0.",
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
