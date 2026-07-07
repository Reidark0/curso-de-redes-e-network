export const lesson0407 = {
  "id": "4.7",
  "moduleId": "m04",
  "order": 7,
  "title": "Configuração IPv4: manual, DHCP e reservas",
  "subtitle": "Como hosts recebem endereço, máscara, gateway e DNS; quando configurar manualmente, quando usar DHCP e quando reservar endereços.",
  "duration": "95-130 min",
  "estimatedStudyTimeMinutes": 130,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 225,
  "tags": [
    "redes",
    "ipv4",
    "dhcp",
    "ip estático",
    "reserva dhcp",
    "gateway",
    "dns",
    "ipam",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.3",
      "reason": "Máscara e CIDR são necessários para validar se uma configuração IPv4 faz sentido."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.4",
      "reason": "Rede, hosts e broadcast ajudam a evitar endereços inválidos ou conflitos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "reason": "Gateway padrão e rota local explicam como o host sai da própria rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.6",
      "reason": "Escopos público, privado, loopback e APIPA ajudam a interpretar falhas de configuração."
    }
  ],
  "objectives": [
    "Explicar os três modelos principais de configuração IPv4: manual, DHCP dinâmico e reserva DHCP.",
    "Entender quais parâmetros mínimos um host precisa para operar em uma rede IPv4.",
    "Descrever o fluxo DHCP Discover, Offer, Request e Acknowledgement de forma operacional.",
    "Diferenciar IP estático configurado no host de reserva DHCP configurada no servidor DHCP.",
    "Relacionar configuração IPv4 com segurança, inventário, IPAM, logs e troubleshooting."
  ],
  "learningOutcomes": [
    "Dado um host, o aluno identifica IP, máscara, gateway, DNS e origem da configuração.",
    "Dado um cenário com conflito de IP, o aluno diferencia erro de configuração manual, reserva incorreta e escopo DHCP sobreposto.",
    "Dado um host com APIPA, o aluno monta uma hipótese de falha envolvendo DHCP, VLAN, cabo, Wi-Fi, firewall ou NAC.",
    "Dado um servidor crítico, o aluno escolhe entre IP estático e reserva DHCP justificando impactos operacionais e de segurança."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Depois de aprender o que é IPv4, máscara, rede, broadcast, gateway e tipos de endereço, surge a pergunta prática: <strong>como um computador recebe essa configuração?</strong></p>\n<p>Um notebook conectado ao Wi-Fi geralmente recebe tudo automaticamente. Um servidor pode usar endereço fixo. Uma impressora pode parecer fixa, mas na verdade usar uma reserva DHCP. Uma VM em cloud pode receber IP privado por metadados da plataforma. Um container pode receber IP por uma bridge local ou por um plugin CNI.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> duas máquinas usam o mesmo IP porque alguém configurou manualmente um endereço que também estava no escopo DHCP. O sintoma aparece como lentidão, conexões intermitentes, alerta de IP duplicado, ARP mudando de MAC e aplicações caindo sem causa aparente.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>No início das redes TCP/IP, configurar endereços manualmente era comum. Ambientes eram menores, havia menos dispositivos e a mudança de topologia era mais lenta. O administrador anotava IP, máscara, gateway e DNS em planilhas ou documentação local.</p>\n<p>Com o crescimento de redes corporativas, notebooks, Wi-Fi, impressoras, telefones IP, VMs e dispositivos móveis, a configuração manual se tornou fonte de erro operacional. Era necessário um mecanismo automático para entregar parâmetros de rede de forma consistente. Protocolos como BOOTP abriram caminho para o DHCP, que automatizou a atribuição de endereços e opções.</p>\n<p>Hoje, DHCP continua essencial em LANs, data centers, redes de usuários, Wi-Fi corporativo e ambientes virtualizados. Em cloud, o conceito permanece, ainda que implementado por mecanismos próprios da plataforma. O desafio moderno não é apenas distribuir IP; é distribuir IP com governança, inventário, segurança, logs e integração com automação.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>Um host IPv4 precisa de mais do que um número. Para funcionar bem, ele normalmente precisa de endereço IPv4, máscara, gateway padrão e DNS. Em redes corporativas, também pode receber domínio de busca, servidores NTP, opções de boot, VLAN de voz e outras opções.</p>\n<ul class=\"flow-list\"><li><strong>Manual:</strong> previsível, mas sujeito a erro humano e conflito se não houver controle.</li><li><strong>DHCP dinâmico:</strong> escalável para usuários e dispositivos móveis, mas depende de serviço DHCP saudável.</li><li><strong>Reserva DHCP:</strong> combina previsibilidade com gestão centralizada, usando o MAC do cliente como referência.</li><li><strong>Cloud/virtualização:</strong> a plataforma entrega IP e rotas por mecanismos próprios, mas os princípios continuam semelhantes.</li></ul>\n<div class=\"callout callout--warning\"><strong>Erro comum:</strong> chamar qualquer IP fixo de IP estático. Um endereço configurado manualmente no host é uma coisa; uma reserva DHCP no servidor é outra. Operacionalmente, elas têm impactos diferentes.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução da configuração IPv4 saiu de anotações manuais para mecanismos centralizados e depois para automação integrada com inventário, cloud e segurança.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Como funcionava</th><th>Vantagem</th><th>Limitação</th></tr></thead><tbody><tr><td>Manual</td><td>Administrador configura IP, máscara, gateway e DNS em cada host</td><td>Controle direto</td><td>Escala mal e gera conflitos</td></tr><tr><td>DHCP dinâmico</td><td>Servidor entrega configuração automaticamente</td><td>Escala para muitos clientes</td><td>Depende de escopo, relay e serviço disponível</td></tr><tr><td>Reserva DHCP</td><td>Servidor entrega sempre o mesmo IP para um cliente conhecido</td><td>Previsibilidade centralizada</td><td>Requer inventário confiável de MAC/dispositivo</td></tr><tr><td>IPAM/automação</td><td>Configuração é integrada com CMDB, IaC, cloud e pipelines</td><td>Governança e rastreabilidade</td><td>Exige processo e disciplina operacional</td></tr></tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>Configuração IPv4</strong> é o conjunto de parâmetros que permite a um host participar corretamente de uma rede IPv4.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> configurar IPv4 não é apenas atribuir um endereço. É definir identidade lógica, fronteira da rede local, rota de saída e serviços auxiliares como DNS.</div>\n<table class=\"data-table\"><thead><tr><th>Parâmetro</th><th>Exemplo</th><th>Função</th><th>Falha comum</th></tr></thead><tbody><tr><td>IPv4</td><td><code>192.168.10.25</code></td><td>Identifica o host na rede</td><td>Conflito com outro host</td></tr><tr><td>Máscara/CIDR</td><td><code>255.255.255.0</code> / <code>/24</code></td><td>Define rede local e parte de host</td><td>Máscara errada quebra decisão local/remota</td></tr><tr><td>Gateway</td><td><code>192.168.10.1</code></td><td>Saída para outras redes</td><td>Gateway fora da sub-rede ou incorreto</td></tr><tr><td>DNS</td><td><code>192.168.10.10</code></td><td>Resolve nomes para IPs</td><td>Rede funciona por IP, mas nomes falham</td></tr></tbody></table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>No DHCP, o host começa sem saber seu IPv4 final. Ele usa mensagens de broadcast para localizar um servidor e negociar uma concessão temporária chamada <em>lease</em>.</p>\n<ol class=\"flow-list\"><li><strong>Discover:</strong> o cliente pergunta na rede se há servidor DHCP disponível.</li><li><strong>Offer:</strong> o servidor oferece um IP e opções como máscara, gateway e DNS.</li><li><strong>Request:</strong> o cliente solicita formalmente a oferta escolhida.</li><li><strong>Acknowledgement:</strong> o servidor confirma a concessão.</li><li><strong>Uso:</strong> o host configura interface, rota local, rota default e DNS.</li><li><strong>Renovação:</strong> antes do lease expirar, o cliente tenta renovar o endereço.</li></ol>\n<p>Quando o DHCP falha e não há configuração manual válida, muitos sistemas usam APIPA/link-local em <code>169.254.0.0/16</code>. Isso permite comunicação local limitada, mas geralmente indica que algo impediu a obtenção de configuração correta.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma rede corporativa, o servidor DHCP nem sempre está na mesma VLAN do cliente. Como DHCP usa broadcast inicial, roteadores e switches L3 podem atuar como <strong>DHCP relay</strong>, encaminhando a solicitação para um servidor central.</p>\n<table class=\"data-table\"><thead><tr><th>Componente</th><th>Papel</th><th>Impacto operacional</th></tr></thead><tbody><tr><td>Cliente</td><td>Solicita configuração IPv4</td><td>Depende de link, VLAN, NIC, Wi-Fi e política de acesso</td></tr><tr><td>Switch/AP</td><td>Entrega quadros e aplica VLAN/NAC</td><td>VLAN errada impede DHCP correto</td></tr><tr><td>DHCP relay</td><td>Encaminha requisições entre VLAN e servidor</td><td>Relay ausente ou errado causa APIPA</td></tr><tr><td>Servidor DHCP</td><td>Mantém escopos, reservas e leases</td><td>Escopo esgotado gera falha em massa</td></tr><tr><td>IPAM</td><td>Documenta uso de endereços</td><td>Reduz conflitos e melhora auditoria</td></tr></tbody></table>\n<div class=\"callout\"><strong>Arquitetura mental:</strong> DHCP não é apenas comodidade. Ele é parte da governança da rede. Escopos, reservas, logs, exclusões e integração com IPAM ajudam a manter previsibilidade.</div>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine um prédio corporativo. Uma configuração manual é como alguém escrever no crachá sua própria sala, ramal e andar. Pode funcionar se todos seguirem uma planilha perfeita, mas qualquer erro causa duplicidade.</p>\n<p>DHCP é como a recepção entregar um crachá temporário com sala, andar, ramal e regras de acesso. Reserva DHCP é quando a recepção reconhece uma pessoa cadastrada e entrega sempre o mesmo crachá. IPAM é o sistema que registra quem recebeu qual crachá, quando e por quê.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes são mais rigorosas do que crachás. Um IP duplicado pode provocar comportamento intermitente, cache ARP inconsistente, logs ambíguos e impacto em segurança.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Um notebook em casa conecta ao Wi-Fi. O roteador residencial atua como servidor DHCP e entrega:</p>\n<ul><li>IPv4: <code>192.168.1.34</code></li><li>Máscara: <code>255.255.255.0</code></li><li>Gateway: <code>192.168.1.1</code></li><li>DNS: normalmente o roteador ou servidores externos</li></ul>\n<p>Se o roteador estiver com DHCP desativado ou o notebook cair em uma VLAN/SSID errado, o host pode receber <code>169.254.x.x</code>. Nesse caso, o problema não é “internet lenta”; o host nem recebeu configuração IPv4 válida.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, notebooks de usuários usam DHCP dinâmico. Impressoras, câmeras, pontos de acesso e alguns servidores usam reserva DHCP ou IP estático controlado por IPAM. VLANs diferentes têm escopos diferentes.</p>\n<p>Um erro clássico ocorre quando alguém configura manualmente uma impressora com <code>10.20.30.50</code>, mas esse endereço pertence ao pool DHCP de usuários. Em algum momento, o DHCP entrega o mesmo IP a um notebook. O resultado pode ser ARP flapping, impressão intermitente e logs apontando alternadamente para MACs diferentes.</p>\n<div class=\"callout callout--security\"><strong>Visão de segurança:</strong> DHCP logs, NAC, tabela MAC, ARP e autenticação de porta ajudam a descobrir qual dispositivo usou determinado IP em determinado horário.</div>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, uma VM normalmente recebe um IP privado dentro de uma subnet da VPC/VNet. O usuário não administra um servidor DHCP tradicional, mas a plataforma entrega configuração de rede de forma automatizada.</p>\n<p>Reservas e endereços fixos aparecem como IP privado estático, Elastic IP, public IP, private endpoint, NAT gateway ou load balancer. O conceito continua: há um endereço, uma sub-rede, uma rota, um gateway implícito ou explícito e políticas de segurança controlando tráfego.</p>\n<p>Financeiramente, endereços públicos, NAT gateways, load balancers e tráfego entre zonas/regiões podem gerar custo. Operacionalmente, usar IP fixo sem necessidade pode criar acoplamento frágil; usar DNS interno e service discovery costuma ser mais resiliente.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Pipelines, runners, containers e clusters também dependem de configuração IP. Um runner self-hosted pode falhar ao acessar repositórios internos se receber gateway errado. Um container pode falar com o host por bridge, mas não alcançar a rede corporativa por falta de rota. Um cluster Kubernetes pode depender de CNI, service CIDR e pod CIDR corretamente planejados.</p>\n<p>Em automação, endereços devem ser tratados como inventário. Terraform, Ansible, IPAM, DNS interno e CMDB precisam estar alinhados. Do contrário, um pipeline pode criar uma VM em uma subnet sobreposta, liberar um security group amplo ou registrar DNS para um IP que será reciclado.</p>\n<div class=\"callout\"><strong>Boa prática DevSecOps:</strong> tratar IP, subnet, reserva, DNS e regra de firewall como código revisável, com validação antes do deploy.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>A configuração IPv4 impacta diretamente investigação e defesa. Um alerta de SIEM com IP interno só é útil se for possível correlacionar DHCP lease, usuário, MAC, switchport, VLAN e horário. Sem isso, a atribuição pode estar errada.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Sintoma</th><th>Mitigação</th></tr></thead><tbody><tr><td>DHCP rogue</td><td>Clientes recebem gateway/DNS estranho</td><td>DHCP snooping, NAC, portas controladas</td></tr><tr><td>Conflito de IP</td><td>Conectividade intermitente e ARP alternando</td><td>IPAM, exclusões, reservas e monitoramento</td></tr><tr><td>Escopo esgotado</td><td>Clientes caem em APIPA</td><td>Planejamento de capacidade e alertas</td></tr><tr><td>DNS malicioso</td><td>Resolução aponta para destino indevido</td><td>Opções DHCP controladas e inspeção de logs</td></tr><tr><td>Inventário fraco</td><td>IP não identifica corretamente o ativo</td><td>Correlação DHCP, NAC, EDR e CMDB</td></tr></tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<p>O diagrama mostra o fluxo DHCP e os pontos de controle que influenciam a configuração IPv4.</p>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 600\" role=\"img\" aria-labelledby=\"m04l07-title m04l07-desc\">\n<title id=\"m04l07-title\">DHCP entregando configuração IPv4</title>\n<desc id=\"m04l07-desc\">Cliente envia DHCP Discover, switch encaminha, relay leva ao servidor DHCP, servidor responde com IP, máscara, gateway e DNS.</desc>\n<defs><marker id=\"m04l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\" /></marker></defs>\n<rect x=\"45\" y=\"55\" width=\"890\" height=\"490\" rx=\"20\" class=\"svg-zone\" />\n<text x=\"490\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">Configuração IPv4 via DHCP</text>\n<rect x=\"85\" y=\"185\" width=\"170\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--client\" />\n<text x=\"170\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n<text x=\"170\" y=\"253\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Sem IP válido</text>\n<text x=\"170\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Discover</text>\n<rect x=\"320\" y=\"185\" width=\"170\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n<text x=\"405\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">Switch/AP</text>\n<text x=\"405\" y=\"253\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN correta?</text>\n<text x=\"405\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">NAC/porta</text>\n<rect x=\"555\" y=\"185\" width=\"170\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--router\" />\n<text x=\"640\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">Relay/Gateway</text>\n<text x=\"640\" y=\"253\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Encaminha</text>\n<text x=\"640\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">para DHCP</text>\n<rect x=\"790\" y=\"185\" width=\"145\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--server\" />\n<text x=\"862\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">DHCP</text>\n<text x=\"862\" y=\"253\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Escopo</text>\n<text x=\"862\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Reserva/lease</text>\n<line x1=\"255\" y1=\"230\" x2=\"320\" y2=\"230\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l07-arrow)\" />\n<line x1=\"490\" y1=\"230\" x2=\"555\" y2=\"230\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l07-arrow)\" />\n<line x1=\"725\" y1=\"230\" x2=\"790\" y2=\"230\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l07-arrow)\" />\n<line x1=\"790\" y1=\"275\" x2=\"725\" y2=\"275\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m04l07-arrow)\" />\n<line x1=\"555\" y1=\"275\" x2=\"490\" y2=\"275\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m04l07-arrow)\" />\n<line x1=\"320\" y1=\"275\" x2=\"255\" y2=\"275\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m04l07-arrow)\" />\n<rect x=\"105\" y=\"390\" width=\"760\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--security\" />\n<text x=\"485\" y=\"426\" text-anchor=\"middle\" class=\"svg-label\">Configuração entregue</text>\n<text x=\"485\" y=\"456\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IPv4 + máscara + gateway + DNS + lease + opções</text>\n<text x=\"490\" y=\"525\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Se qualquer elo falhar — VLAN, relay, escopo, servidor, NAC — o cliente pode ficar sem configuração válida.</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório treina identificação da origem da configuração IPv4, leitura de lease DHCP, comparação entre IP manual e DHCP, e diagnóstico de APIPA sem alterar produção.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam a escolha entre manual, DHCP e reserva, além da interpretação de falhas como gateway incorreto, DNS errado, escopo esgotado e conflito de IP.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Você irá analisar um incidente em que parte dos notebooks recebeu APIPA, uma impressora entrou em conflito com um notebook e o DNS entregue por DHCP está diferente do padrão corporativo.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada separa sintomas por camada, valida configuração, identifica provável DHCP rogue ou escopo incorreto e propõe correções com IPAM, reservas e controles de porta.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li>Configuração IPv4 inclui IP, máscara, gateway, DNS e origem da configuração.</li><li>IP manual dá controle, mas exige governança rigorosa.</li><li>DHCP dinâmico escala melhor para clientes móveis e redes de usuários.</li><li>Reserva DHCP entrega previsibilidade com gestão centralizada.</li><li>APIPA geralmente indica falha de DHCP ou ausência de configuração válida.</li><li>DHCP logs, IPAM, NAC e inventário são essenciais para segurança e resposta a incidentes.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, estudaremos <strong>ICMP, ping, TTL e traceroute</strong>. Depois de entender como o host recebe IPv4, vamos aprender como testar alcance e caminho de rede.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3 — Rede",
      "Camada 2 — Enlace",
      "Camada 7 — Aplicação"
    ],
    "tcpIpLayers": [
      "Internet",
      "Acesso à rede",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IPv4",
      "DHCP",
      "ARP",
      "DNS",
      "ICMP",
      "NTP"
    ],
    "dependsOn": [
      "IPv4",
      "máscara",
      "gateway",
      "broadcast",
      "VLAN",
      "DHCP relay"
    ],
    "enables": [
      "troubleshooting de configuração",
      "IPAM",
      "reservas DHCP",
      "inventário",
      "auditoria de rede"
    ]
  },
  "protocolFields": [
    {
      "name": "DHCP Discover",
      "bits": "mensagem",
      "description": "Cliente procura servidores DHCP disponíveis, geralmente via broadcast.",
      "securityNote": "Pode ser afetado por VLAN errada, bloqueio de broadcast ou porta não autorizada."
    },
    {
      "name": "DHCP Offer",
      "bits": "mensagem",
      "description": "Servidor oferece endereço e opções ao cliente.",
      "securityNote": "Servidor rogue pode oferecer gateway ou DNS malicioso."
    },
    {
      "name": "DHCP Request",
      "bits": "mensagem",
      "description": "Cliente solicita a oferta escolhida.",
      "securityNote": "Logs ajudam a correlacionar cliente, MAC e endereço solicitado."
    },
    {
      "name": "DHCP ACK",
      "bits": "mensagem",
      "description": "Servidor confirma lease e opções finais.",
      "securityNote": "A confirmação deve ser registrada para auditoria."
    },
    {
      "name": "Lease Time",
      "bits": "variável",
      "description": "Tempo pelo qual o endereço é concedido ao cliente.",
      "securityNote": "Leases longos demais prejudicam recuperação; curtos demais aumentam ruído operacional."
    },
    {
      "name": "Option Router/DNS",
      "bits": "opções",
      "description": "Opções que informam gateway padrão e servidores DNS.",
      "securityNote": "DNS/gateway indevidos podem causar interceptação ou indisponibilidade."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Cliente conecta",
      "description": "Host entra na rede física, Wi-Fi, VLAN, VM ou segmento virtual.",
      "layer": "Camada 1/2",
      "securityNote": "Porta errada, VLAN errada ou NAC bloqueado impedem configuração correta."
    },
    {
      "step": 2,
      "name": "DHCP Discover",
      "description": "Cliente envia broadcast procurando servidor DHCP.",
      "layer": "Camada 2/3/7",
      "securityNote": "Broadcast revela presença de novo cliente e pode ser observado no domínio local."
    },
    {
      "step": 3,
      "name": "Relay ou entrega local",
      "description": "Se o servidor estiver em outra rede, o gateway/relay encaminha a solicitação.",
      "layer": "Camada 3",
      "securityNote": "Relay incorreto aponta clientes para escopo errado."
    },
    {
      "step": 4,
      "name": "Offer e Request",
      "description": "Servidor oferece endereço e cliente solicita a concessão.",
      "layer": "Aplicação sobre UDP",
      "securityNote": "Conflitos surgem quando escopo DHCP sobrepõe IPs manuais."
    },
    {
      "step": 5,
      "name": "ACK e aplicação da configuração",
      "description": "Cliente instala IP, máscara, gateway, DNS e rotas.",
      "layer": "Sistema operacional",
      "securityNote": "Gateway/DNS maliciosos comprometem navegação e inspeção."
    },
    {
      "step": 6,
      "name": "Renovação e auditoria",
      "description": "Cliente renova lease e logs registram MAC, IP e horário.",
      "layer": "Operacional",
      "securityNote": "Sem logs sincronizados, resposta a incidentes perde rastreabilidade."
    }
  ],
  "deepDive": {
    "mentalModel": "Ao investigar configuração IPv4, pergunte: quem entregou este IP, por quanto tempo, com qual máscara, qual gateway, qual DNS e em qual VLAN?",
    "keyTerms": [
      "DHCP",
      "lease",
      "escopo",
      "reserva",
      "IPAM",
      "DHCP relay",
      "APIPA",
      "DHCP rogue"
    ],
    "limitations": [
      "DHCP não autentica tudo por padrão.",
      "Reserva por MAC pode falhar com troca de placa, dock, Wi-Fi aleatório ou spoofing.",
      "IP manual escala mal sem IPAM.",
      "APIPA não substitui configuração válida de rede."
    ],
    "whenToUse": [
      "Use DHCP dinâmico para estações, Wi-Fi e dispositivos móveis.",
      "Use reserva DHCP para impressoras, APs, câmeras e ativos que precisam de previsibilidade com gestão centralizada.",
      "Use IP manual apenas quando houver justificativa, documentação e exclusão do escopo DHCP.",
      "Use IPAM para redes médias e grandes."
    ],
    "whenNotToUse": [
      "Não configure IP manual dentro de pool DHCP.",
      "Não use reserva DHCP como substituto de inventário.",
      "Não aceite DNS/gateway desconhecido sem validar origem.",
      "Não deixe DHCP sem logs e sem controle em rede corporativa."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Configurar IP manual dentro do pool DHCP",
      "impact": "Conflito intermitente e ARP alternando entre MACs",
      "fix": "Criar exclusões, reservas e registrar no IPAM."
    },
    {
      "mistake": "Confundir IP estático com reserva DHCP",
      "impact": "Troubleshooting e documentação ficam incorretos",
      "fix": "Documentar a origem da configuração."
    },
    {
      "mistake": "Ignorar gateway e DNS",
      "impact": "Host pode falar localmente, mas falhar internet ou nomes",
      "fix": "Validar todos os parâmetros, não apenas o IP."
    },
    {
      "mistake": "Tratar APIPA como IP válido normal",
      "impact": "Perda de tempo investigando aplicação quando o problema é configuração",
      "fix": "Verificar DHCP, VLAN, cabo, Wi-Fi, relay e escopo."
    },
    {
      "mistake": "Não manter logs DHCP",
      "impact": "Investigação de incidente não consegue associar IP a dispositivo",
      "fix": "Centralizar logs, sincronizar NTP e integrar com SIEM."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host com 169.254.x.x",
      "Conectividade local funciona mas internet não",
      "Rede funciona por IP mas não por nome",
      "Conflito de IP detectado",
      "Clientes de uma VLAN não recebem IP",
      "Leases acabam ou mudam com frequência"
    ],
    "decisionTree": [
      {
        "question": "O host recebeu IP válido?",
        "ifYes": "Verifique máscara, gateway e DNS.",
        "ifNo": "Verifique DHCP, cabo/Wi-Fi, VLAN, NAC e relay."
      },
      {
        "question": "O gateway está na mesma rede do host?",
        "ifYes": "Teste ARP e ping no gateway.",
        "ifNo": "Corrija máscara, gateway ou escopo DHCP."
      },
      {
        "question": "O problema é só resolução de nomes?",
        "ifYes": "Verifique DNS entregue por DHCP e sufixos de busca.",
        "ifNo": "Continue analisando rota, firewall e conectividade."
      },
      {
        "question": "Há conflito de IP?",
        "ifYes": "Compare ARP, logs DHCP, tabela MAC e IPAM.",
        "ifNo": "Verifique escopo esgotado, relay ou bloqueios."
      }
    ],
    "commands": [
      {
        "windows": [
          "ipconfig /all",
          "ipconfig /release",
          "ipconfig /renew",
          "arp -a",
          "route print",
          "Get-NetIPConfiguration",
          "Get-DnsClientServerAddress"
        ],
        "linux": [
          "ip addr",
          "ip route",
          "ip neigh",
          "resolvectl status",
          "nmcli device show",
          "sudo dhclient -v <interface>",
          "sudo tcpdump -n -e port 67 or port 68"
        ],
        "cisco": [
          "show ip dhcp binding",
          "show ip dhcp pool",
          "show ip interface brief",
          "show running-config | include helper-address",
          "show mac address-table",
          "show vlan brief",
          "show ip dhcp snooping"
        ]
      }
    ],
    "evidenceToCollect": [
      "IP, máscara, gateway e DNS",
      "origem DHCP/manual",
      "MAC do cliente",
      "VLAN e switchport",
      "lease DHCP",
      "horário com timezone",
      "logs do servidor DHCP",
      "captura sanitizada de DORA se necessário"
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ]
  },
  "security": {
    "badPractices": [
      "Permitir qualquer servidor DHCP em portas de usuário.",
      "Configurar IP manual sem documentação.",
      "Usar pools grandes sem inventário.",
      "Misturar servidores críticos em faixa dinâmica sem reserva.",
      "Confiar no IP como identidade forte de usuário."
    ],
    "vulnerabilities": [
      {
        "name": "DHCP rogue",
        "description": "Risco relacionado à aula 4.7 — Configuração IPv4: manual, DHCP e reservas.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "DHCP snooping"
      },
      {
        "name": "exhaustion de escopo",
        "description": "Risco relacionado à aula 4.7 — Configuração IPv4: manual, DHCP e reservas.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "port security"
      },
      {
        "name": "conflito de IP",
        "description": "Risco relacionado à aula 4.7 — Configuração IPv4: manual, DHCP e reservas.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "802.1X/NAC"
      },
      {
        "name": "DNS/gateway malicioso",
        "description": "Risco relacionado à aula 4.7 — Configuração IPv4: manual, DHCP e reservas.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM"
      },
      {
        "name": "MAC spoofing em reserva DHCP",
        "description": "Risco relacionado à aula 4.7 — Configuração IPv4: manual, DHCP e reservas.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "alertas de escopo"
      },
      {
        "name": "falha de atribuição e APIPA",
        "description": "Risco relacionado à aula 4.7 — Configuração IPv4: manual, DHCP e reservas.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "SIEM com logs DHCP"
      }
    ],
    "mitigations": [
      "DHCP snooping",
      "port security",
      "802.1X/NAC",
      "IPAM",
      "alertas de escopo",
      "SIEM com logs DHCP",
      "separação por VLAN",
      "controle de mudanças"
    ],
    "incidentResponse": [
      "Preservar logs DHCP e switch",
      "coletar MAC/IP/porta/horário",
      "verificar presença de DHCP rogue",
      "isolar porta suspeita",
      "corrigir escopo e reservas",
      "documentar lições aprendidas"
    ],
    "goodPractices": [
      "Ativar DHCP snooping em switches gerenciáveis quando suportado.",
      "Usar IPAM para evitar sobreposição e conflitos.",
      "Separar pools dinâmicos de faixas reservadas/estáticas.",
      "Registrar DHCP logs com NTP consistente.",
      "Controlar portas de acesso com NAC/802.1X onde aplicável.",
      "Monitorar DNS e gateway entregues por DHCP."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "DHCP snooping",
      "port security",
      "802.1X/NAC",
      "IPAM",
      "alertas de escopo",
      "SIEM com logs DHCP",
      "separação por VLAN",
      "controle de mudanças"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-4.7",
    "title": "Investigando configuração IPv4: manual, DHCP e reservas",
    "labType": "security",
    "objective": "Identificar a origem da configuração IPv4 de um host, validar IP/máscara/gateway/DNS, reconhecer sinais de DHCP e montar uma matriz de diagnóstico segura.",
    "scenario": "15. Laboratório O laboratório treina identificação da origem da configuração IPv4, leitura de lease DHCP, comparação entre IP manual e DHCP, e diagnóstico de APIPA sem alterar produção.",
    "topology": "Um host Windows ou Linux conectado a uma rede local; opcionalmente um roteador doméstico, VM, switch gerenciável ou Packet Tracer com servidor DHCP.",
    "architecture": "Cliente conectado a uma VLAN/rede local, recebendo configuração por DHCP ou usando configuração manual. Gateway e DNS são validados como parâmetros separados.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 130,
    "cost": "zero",
    "safetyNotes": [
      "Não altere configurações de produção sem autorização.",
      "Não rode DHCP server em rede real sem isolamento.",
      "Não renove IP em servidor crítico sem janela de manutenção.",
      "Sanitize IP público, MAC, hostname, domínio e usuário antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar configuração atual",
        "instruction": "Anote IP, máscara, gateway, DNS, MAC e interface ativa.",
        "command": "Windows: ipconfig /all\nLinux: ip addr show && ip route\nCisco IOS/Packet Tracer: show ip interface brief",
        "expectedOutput": "Você identifica os parâmetros principais e a interface usada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Configuração IPv4: manual, DHCP e reservas” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Identificar origem da configuração",
        "instruction": "Verifique se a configuração é DHCP, manual, cloud ou gerenciada por ferramenta de rede.",
        "command": "Windows: ipconfig /all | findstr /i DHCP\nPowerShell: Get-NetIPConfiguration | Format-List\nLinux: nmcli device show || cat /var/lib/dhcp/dhclient*.leases 2>/dev/null\nCisco IOS/Packet Tracer: show running-config | section dhcp",
        "expectedOutput": "Você diferencia configuração automática de manual.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Configuração IPv4: manual, DHCP e reservas” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Validar gateway e rota default",
        "instruction": "Verifique se há rota default e se ela aponta para o gateway correto.",
        "command": "Windows: route print\nPowerShell: Get-NetRoute -DestinationPrefix 0.0.0.0/0\nLinux: ip route | grep default\nCisco IOS/Packet Tracer: show ip route | include Gateway|0.0.0.0",
        "expectedOutput": "A rota default existe quando a rede exige saída para outros destinos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Configuração IPv4: manual, DHCP e reservas” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Validar DNS",
        "instruction": "Compare DNS configurado com o padrão esperado da rede.",
        "command": "Windows: ipconfig /all | findstr /i DNS\nPowerShell: Get-DnsClientServerAddress\nLinux: resolvectl status || cat /etc/resolv.conf\nTeste: nslookup exemplo.local 127.0.0.1  # substitua pelo DNS autorizado do laboratório",
        "expectedOutput": "DNS está alinhado ao ambiente ou a divergência é explicada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Configuração IPv4: manual, DHCP e reservas” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Observar DHCP de forma segura",
        "instruction": "Em laboratório isolado ou host autorizado, observe renovação DHCP ou captura de tráfego DORA.",
        "command": "Windows: ipconfig /release && ipconfig /renew && ipconfig /all\nLinux NetworkManager: sudo nmcli networking off && sudo nmcli networking on\nCaptura autorizada: tcpdump -ni <interface> 'port 67 or port 68'\nCisco IOS/Packet Tracer: show ip dhcp binding && show ip dhcp pool",
        "expectedOutput": "Você reconhece Discover, Offer, Request e ACK.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Configuração IPv4: manual, DHCP e reservas” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Montar matriz de diagnóstico",
        "instruction": "Crie uma tabela com sintoma, hipótese, evidência, comando e correção proposta.",
        "command": "Crie uma tabela com as colunas: Sintoma | Hipótese | Evidência | Comando usado | Interpretação | Correção proposta | Risco de mudança | Rollback",
        "expectedOutput": "Você produz evidência clara para suporte, NOC ou SOC.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Configuração IPv4: manual, DHCP e reservas” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "Ao final, o aluno consegue explicar como o host recebeu IPv4, se a configuração é coerente e quais evidências sustentam o diagnóstico.",
    "validation": [
      {
        "check": "A entrega deve incluir parâmetros IPv4, origem da configuração, gateway, DNS, hipótese de falha e ações corretivas.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "A entrega deve incluir parâmetros IPv4, origem da configuração, gateway, DNS, hipótese de falha e ações corretivas.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se não houver DHCP, verifique cabo, Wi-Fi, VLAN, relay e servidor.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se houver APIPA, não comece pelo navegador; comece pela configuração IP.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se só nomes falham, valide DNS.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se há conflito, compare ARP, MAC, DHCP lease e switchport.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Integrar DHCP logs ao SIEM.",
      "Criar IPAM simples para laboratório.",
      "Simular DHCP relay em Packet Tracer.",
      "Comparar IP manual, DHCP dinâmico e reserva DHCP em ambiente isolado."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Configuração IPv4: manual, DHCP e reservas” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Incidente de configuração IPv4 em uma filial",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "duration": "60-90 min"
  },
  "mentorQuestions": [
    "Quando você escolheria reserva DHCP em vez de IP manual para uma impressora corporativa?",
    "Por que um host com IP, mas sem gateway correto, pode parecer parcialmente funcional?",
    "Quais evidências você coletaria para provar que um DHCP rogue entregou gateway indevido?"
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Qual conjunto mínimo costuma permitir que um host IPv4 funcione em uma rede com acesso externo?",
      "options": [
        "IP, máscara, gateway e DNS",
        "Apenas IP",
        "Apenas MAC",
        "Somente DNS"
      ],
      "answer": "IP, máscara, gateway e DNS",
      "explanation": "IP e máscara definem identidade/rede; gateway permite saída; DNS resolve nomes."
    },
    {
      "id": "q2",
      "question": "O que é uma reserva DHCP?",
      "options": [
        "Um IP sempre entregue a um cliente específico pelo servidor DHCP",
        "Um endereço aleatório público",
        "Um IP configurado manualmente dentro do host",
        "Um endereço APIPA"
      ],
      "answer": "Um IP sempre entregue a um cliente específico pelo servidor DHCP",
      "explanation": "Reserva DHCP centraliza a atribuição previsível, geralmente associada ao MAC ou identificador do cliente."
    },
    {
      "id": "q3",
      "question": "Um host com 169.254.20.10 provavelmente indica:",
      "options": [
        "Falha ou ausência de configuração DHCP válida",
        "Conexão pública bem-sucedida",
        "DNS funcionando",
        "Gateway correto"
      ],
      "answer": "Falha ou ausência de configuração DHCP válida",
      "explanation": "169.254.0.0/16 é faixa link-local/APIPA."
    },
    {
      "id": "q4",
      "question": "Qual controle ajuda a reduzir DHCP rogue em switches gerenciáveis?",
      "options": [
        "DHCP snooping",
        "Aumentar TTL",
        "Trocar DNS público",
        "Desativar ARP"
      ],
      "answer": "DHCP snooping",
      "explanation": "DHCP snooping permite confiar apenas em portas autorizadas para respostas DHCP."
    },
    {
      "id": "q5",
      "question": "Por que configurar IP manual dentro do pool DHCP é perigoso?",
      "options": [
        "Pode causar conflito quando o DHCP entregar o mesmo IP",
        "Impede uso de máscara",
        "Desativa Ethernet",
        "Remove o endereço MAC"
      ],
      "answer": "Pode causar conflito quando o DHCP entregar o mesmo IP",
      "explanation": "Pools e endereços manuais devem ser separados por exclusões, reservas e IPAM."
    },
    {
      "id": "q6",
      "question": "Se ping por IP funciona, mas acesso por nome falha, a hipótese mais provável é:",
      "options": [
        "DNS",
        "Cabo rompido",
        "Máscara sempre /8",
        "ARP desnecessário"
      ],
      "answer": "DNS",
      "explanation": "Conectividade IP funcionando e nomes falhando aponta para resolução de nomes."
    }
  ],
  "flashcards": [
    {
      "front": "O que é DHCP?",
      "back": "Protocolo que entrega configuração de rede automaticamente, incluindo IP, máscara, gateway, DNS e lease."
    },
    {
      "front": "O que é lease DHCP?",
      "back": "Tempo de concessão de um endereço/configuração ao cliente."
    },
    {
      "front": "O que é reserva DHCP?",
      "back": "Regra no servidor DHCP que entrega sempre o mesmo IP a um cliente específico."
    },
    {
      "front": "O que APIPA geralmente indica?",
      "back": "Falha ou ausência de configuração IPv4 válida via DHCP/manual."
    },
    {
      "front": "Qual risco de DHCP rogue?",
      "back": "Clientes podem receber gateway ou DNS malicioso, causando interceptação ou indisponibilidade."
    },
    {
      "front": "Por que IPAM importa?",
      "back": "Porque registra uso de endereços, evita conflitos e melhora auditoria e resposta a incidentes."
    }
  ],
  "exercises": [
    {
      "id": "e1",
      "prompt": "Explique a diferença operacional entre IP manual e reserva DHCP.",
      "expectedAnswer": "IP manual é configurado no host; reserva DHCP é centralizada no servidor DHCP, permitindo previsibilidade com gestão centralizada."
    },
    {
      "id": "e2",
      "prompt": "Um notebook recebeu 169.254.44.10. Liste cinco hipóteses.",
      "expectedAnswer": "Falha DHCP, cabo/Wi-Fi, VLAN errada, relay incorreto, NAC bloqueando, escopo esgotado ou servidor DHCP indisponível."
    },
    {
      "id": "e3",
      "prompt": "Por que DHCP logs são importantes para segurança?",
      "expectedAnswer": "Eles associam IP, MAC, lease e horário, ajudando a identificar qual ativo usou determinado IP."
    },
    {
      "id": "e4",
      "prompt": "Um host acessa 8.8.8.8 por IP, mas não acessa google.com. Qual parâmetro verificar?",
      "expectedAnswer": "DNS entregue/configurado no host."
    }
  ],
  "challenge": {
    "title": "Incidente de configuração IPv4 em uma filial",
    "scenario": "Uma filial relata que parte dos notebooks está sem internet. Alguns hosts receberam 169.254.x.x. Uma impressora crítica responde às vezes e às vezes não. Um analista encontrou DNS diferente em alguns clientes.",
    "tasks": [
      "Separar sintomas por hipótese",
      "Listar comandos para coletar evidências",
      "Indicar como validar DHCP rogue",
      "Propor correções imediatas e preventivas",
      "Montar relatório sanitizado"
    ],
    "rubric": [
      "Classifica APIPA corretamente",
      "Diferencia DNS, gateway e DHCP",
      "Inclui evidências de DHCP, ARP, MAC e switchport",
      "Propõe DHCP snooping/IPAM/reservas",
      "Evita ações destrutivas sem autorização"
    ]
  },
  "commentedSolution": {
    "summary": "O incidente sugere múltiplas causas possíveis: falha de DHCP para parte dos clientes, possível conflito de IP envolvendo impressora e possível DHCP rogue ou escopo incorreto entregando DNS inesperado.",
    "steps": [
      "Coletar ipconfig/ip addr dos clientes afetados.",
      "Verificar leases no servidor DHCP e escopos disponíveis.",
      "Comparar ARP da impressora com tabela MAC do switch.",
      "Identificar portas que enviam respostas DHCP não autorizadas.",
      "Isolar servidor DHCP rogue, se confirmado.",
      "Corrigir escopos, reservas, exclusões e documentação IPAM.",
      "Ativar DHCP snooping e monitoramento."
    ],
    "why": "A solução separa sintomas e evita tratar tudo como problema de internet. APIPA aponta para falha de atribuição; DNS diferente aponta para opção DHCP indevida; impressora intermitente aponta para conflito IP ou MAC/ARP instável."
  },
  "glossary": [
    {
      "term": "DHCP",
      "definition": "Protocolo que entrega configuração IP automaticamente aos clientes."
    },
    {
      "term": "Lease",
      "definition": "Período de validade da configuração concedida pelo DHCP."
    },
    {
      "term": "Escopo DHCP",
      "definition": "Intervalo de endereços que o servidor DHCP pode distribuir."
    },
    {
      "term": "Reserva DHCP",
      "definition": "Associação para entregar IP previsível a um cliente específico."
    },
    {
      "term": "DHCP Relay",
      "definition": "Função que encaminha requisições DHCP entre redes/VLANs."
    },
    {
      "term": "DHCP Rogue",
      "definition": "Servidor DHCP não autorizado entregando configuração indevida."
    }
  ],
  "references": [
    {
      "title": "RFC 2131 — Dynamic Host Configuration Protocol",
      "type": "rfc",
      "note": "Referência técnica base do DHCP."
    },
    {
      "title": "RFC 2132 — DHCP Options and BOOTP Vendor Extensions",
      "type": "rfc",
      "note": "Define opções comuns entregues por DHCP."
    },
    {
      "title": "Cisco — DHCP Snooping Concepts",
      "type": "vendor-doc",
      "note": "Referência operacional para controle defensivo em switches."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Automação e IaC",
      "reason": "IPAM, DNS, subnets e regras devem ser versionados e revisados em ambientes modernos."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Identidade de dispositivos e acesso condicional",
      "reason": "NAC, 802.1X e inventário unem identidade de dispositivo com controle de rede."
    }
  ],
  "progressRules": {
    "requiredSections": [
      "motivation",
      "concept",
      "internals",
      "architecture",
      "securityExample",
      "diagram",
      "lab",
      "summary"
    ],
    "requiredQuizScore": 70,
    "requiredLabCompletion": true,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "4.8"
    ],
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "oneOf": [
          "labMarkedDone",
          "practicalExerciseDone"
        ]
      }
  }
};
