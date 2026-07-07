export const lesson0410 = {
  "id": "4.10",
  "moduleId": "m04",
  "order": 10,
  "title": "Revisão prática de IPv4 e preparação para subnetting",
  "subtitle": "Integração prática de endereços IPv4, octetos, máscara, CIDR, rede, hosts, broadcast, gateway, DHCP, ICMP e troubleshooting antes de iniciar subnetting.",
  "duration": "95-135 min",
  "estimatedStudyTimeMinutes": 135,
  "difficulty": "iniciante-intermediário",
  "type": "ligação/revisão",
  "xp": 235,
  "tags": [
    "redes",
    "ipv4",
    "endereçamento",
    "cidr",
    "máscara",
    "gateway",
    "dhcp",
    "icmp",
    "troubleshooting",
    "subnetting",
    "revisão",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.1",
      "reason": "Explica por que IPv4 existe e como complementa Ethernet e ARP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.2",
      "reason": "Ensina IPv4 como 32 bits divididos em quatro octetos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.3",
      "reason": "Explica máscara de rede, CIDR e separação entre bits de rede e host."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.4",
      "reason": "Explica endereço de rede, hosts utilizáveis e broadcast."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "reason": "Explica gateway padrão, rota local e rota default."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.6",
      "reason": "Classifica endereços públicos, privados, loopback e APIPA."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.7",
      "reason": "Explica configuração manual, DHCP e reservas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.8",
      "reason": "Apresenta ICMP, ping, TTL e traceroute."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.9",
      "reason": "Apresenta o método prático de troubleshooting IPv4."
    }
  ],
  "objectives": [
    "Consolidar os conceitos do Módulo 4 em um fluxo único de comunicação IPv4.",
    "Ler um endereço IPv4 com máscara/CIDR e identificar rede, hosts, broadcast, gateway e escopo.",
    "Explicar a decisão do host entre destino local e destino remoto.",
    "Relacionar DHCP, ARP, ICMP, DNS e tabela de rotas sem confundir suas funções.",
    "Preparar a base mental para subnetting sem decorar tabelas de forma mecânica.",
    "Produzir um relatório técnico sanitizado de endereçamento e diagnóstico IPv4."
  ],
  "learningOutcomes": [
    "Dado um IP com CIDR, o aluno identifica o que já consegue inferir e o que ainda exige cálculo de sub-rede.",
    "Dado um sintoma de conectividade, o aluno monta uma ordem segura de testes: host, interface, IP, máscara, gateway, ARP, rota, ICMP, DNS e serviço.",
    "Dado um cenário corporativo, o aluno separa problemas de endereçamento de problemas de firewall, DNS e aplicação.",
    "Dado um desenho de rede, o aluno explica onde IPv4 atua, onde Ethernet atua e onde o gateway muda o enlace.",
    "Dado um planejamento inicial, o aluno reconhece por que subnetting será necessário no próximo módulo."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Até aqui, o aluno aprendeu as peças separadas do IPv4: endereço, octetos, máscara, CIDR, rede, host, broadcast, gateway, DHCP, ICMP e troubleshooting. A dificuldade real começa quando essas peças aparecem juntas em um chamado: <strong>um computador tem IP, mas não acessa o sistema</strong>; <strong>uma VM responde ping, mas a aplicação não abre</strong>; <strong>um servidor está na VLAN correta, mas o gateway não responde</strong>; <strong>um ambiente cloud usa CIDR privado, mas conflita com a VPN</strong>.</p>\n<p>Esta aula existe para transformar peças soltas em raciocínio operacional. IPv4 não deve ser entendido como quatro números separados por pontos. Ele é uma estrutura de decisão: quem sou eu, qual é minha rede, quem está comigo, para onde envio destinos remotos e quais evidências confirmam essa jornada.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> muita gente começa subnetting decorando tabela de /24, /25, /26 e /27 sem entender por que rede, broadcast e gateway existem. O resultado é frágil: a pessoa até acerta exercícios simples, mas erra planejamento, troubleshooting e segurança.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>IPv4 nasceu para permitir comunicação entre redes diferentes em um ambiente que crescia além de uma única LAN. Ethernet resolvia entrega local por MAC; ARP resolvia IPv4 para MAC dentro do mesmo enlace; roteadores encaminhavam pacotes entre redes. Com o crescimento da Internet, endereços precisaram ser organizados em blocos, máscaras, rotas e políticas.</p>\n<p>No início, redes eram organizadas por classes fixas. Com o crescimento acelerado, esse modelo ficou rígido demais. CIDR trouxe flexibilidade, permitindo representar prefixos como <code>/24</code>, <code>/26</code>, <code>/30</code> e <code>/32</code>. Essa evolução preparou o caminho para subnetting, sumarização de rotas, uso eficiente de endereços e desenho de redes corporativas.</p>\n<p>Hoje, mesmo com IPv6, IPv4 continua presente em LANs, NAT, VPNs, clouds, containers, firewalls, balanceadores, proxies, appliances e integrações legadas. Dominar IPv4 ainda é requisito prático para redes, segurança, cloud e DevSecOps.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema central é que um endereço IPv4 isolado não diz o suficiente. <code>192.168.10.25</code> pode estar em <code>192.168.10.0/24</code>, <code>192.168.10.0/25</code>, <code>192.168.10.16/28</code> ou outro bloco, dependendo da máscara. Sem a máscara, não sabemos corretamente quem é local, quem é remoto, qual é o broadcast e qual gateway faz sentido.</p>\n<table class=\"data-table\"><thead><tr><th>Peça</th><th>O que responde</th><th>Erro comum</th></tr></thead><tbody><tr><td>IPv4</td><td>Qual é o endereço lógico do host</td><td>Achar que IP sozinho define a rede</td></tr><tr><td>Máscara/CIDR</td><td>Quantos bits são de rede</td><td>Confundir /24 com 24 hosts</td></tr><tr><td>Rede</td><td>Qual bloco identifica o segmento</td><td>Usar endereço de rede como host</td></tr><tr><td>Broadcast</td><td>Qual endereço representa todos os hosts do segmento</td><td>Usar broadcast como host</td></tr><tr><td>Gateway</td><td>Para onde enviar destinos remotos</td><td>Configurar gateway fora da sub-rede</td></tr><tr><td>DHCP</td><td>Como a configuração é entregue</td><td>Sobrepor pool DHCP com IP manual</td></tr><tr><td>ICMP</td><td>Como testar alcance e caminho com cuidado</td><td>Tratar ping como prova total</td></tr></tbody></table>\n<div class=\"callout callout--warning\"><strong>Consequência operacional:</strong> quando esses conceitos são confundidos, surgem falhas difíceis: IP duplicado, máscara errada, gateway inalcançável, conflito de VPN, rota para o lugar errado, firewall liberando bloco grande demais e diagnóstico inconclusivo.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução do endereçamento IPv4 pode ser entendida como uma busca por escala e controle. Primeiro, bastava identificar máquinas. Depois, foi necessário identificar redes. Em seguida, foi necessário dividir redes em sub-redes menores. Por fim, ambientes corporativos passaram a exigir integração com DHCP, IPAM, firewall, VPN, cloud, logs, automação e governança.</p>\n<ol class=\"flow-list\"><li><strong>Endereçamento simples:</strong> hosts recebiam IPs em redes pequenas e pouco segmentadas.</li><li><strong>Máscaras e rotas:</strong> redes passaram a ser separadas por prefixos e gateways.</li><li><strong>CIDR:</strong> prefixos flexíveis substituíram dependência rígida de classes.</li><li><strong>Subnetting:</strong> blocos passaram a ser divididos de forma planejada para áreas, VLANs, links e serviços.</li><li><strong>Operação moderna:</strong> o endereço passou a fazer parte de inventário, IaC, firewall, SIEM, observabilidade, NAC e desenho zero trust.</li></ol>\n<p>O próximo módulo será uma consequência natural desta evolução: se uma empresa recebe ou escolhe um bloco, como dividir esse bloco corretamente sem desperdiçar endereços, sem criar sobreposição e sem quebrar comunicação?</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>A revisão prática de IPv4 consiste em enxergar o endereço como parte de um conjunto: <strong>IP + máscara + gateway + rota + ARP + política</strong>. A comunicação só funciona quando essas peças estão coerentes.</p>\n<div class=\"definition-box\"><strong>Modelo mental:</strong> o IP identifica logicamente o host; a máscara define a vizinhança local; o gateway conecta a outras redes; ARP encontra o MAC do próximo salto local; ICMP ajuda a diagnosticar; DHCP pode entregar a configuração; DNS resolve nomes; firewall e políticas decidem permissões.</div>\n<table class=\"comparison-table\"><thead><tr><th>Pergunta</th><th>Conceito necessário</th><th>Exemplo</th></tr></thead><tbody><tr><td>Qual é minha rede?</td><td>IP + máscara/CIDR</td><td><code>192.168.10.25/24</code> pertence a <code>192.168.10.0/24</code></td></tr><tr><td>Quem está local?</td><td>Rede e faixa de hosts</td><td><code>192.168.10.50</code> está no mesmo /24</td></tr><tr><td>Para onde envio destino remoto?</td><td>Gateway e rota default</td><td><code>0.0.0.0/0 via 192.168.10.1</code></td></tr><tr><td>Qual MAC eu uso?</td><td>ARP</td><td>MAC do destino local ou MAC do gateway</td></tr><tr><td>Como testo caminho?</td><td>ICMP, TTL e traceroute</td><td><code>ping</code>, <code>tracert</code>, <code>traceroute</code></td></tr></tbody></table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Quando um host precisa se comunicar, o sistema operacional não simplesmente joga um pacote na rede. Ele segue uma sequência lógica. Primeiro, valida a interface. Depois, verifica se possui IP, máscara e gateway. Se o destino foi informado por nome, consulta DNS. Com o IP de destino em mãos, aplica a máscara para descobrir se o destino está na mesma rede local.</p>\n<p>Se o destino for local, o host precisa do MAC do próprio destino. Se o destino for remoto, o host precisa do MAC do gateway. Em ambos os casos, ARP atua apenas dentro do domínio de broadcast local. O frame Ethernet carrega MACs válidos naquele enlace; o pacote IPv4 carrega IP de origem e destino fim a fim. A cada roteador, o frame muda, mas o pacote IPv4 segue seu caminho, com TTL decrementado.</p>\n<ol class=\"flow-list\"><li>Aplicação solicita comunicação com um destino.</li><li>DNS resolve nome para IP, se necessário.</li><li>Host consulta tabela de rotas.</li><li>Máscara/CIDR define se o destino é local ou remoto.</li><li>Host consulta cache ARP para o destino local ou gateway.</li><li>Se necessário, ARP Request descobre o MAC do próximo salto.</li><li>Frame Ethernet é enviado ao switch.</li><li>Switch encaminha pelo MAC de destino.</li><li>Gateway roteia para outra rede, decrementando TTL.</li><li>Políticas de firewall, ACLs e serviços podem permitir ou bloquear o fluxo.</li></ol>\n<div class=\"callout callout--security\"><strong>Visão de segurança:</strong> logs de firewall mostram IPs; switches veem MACs; DHCP associa lease a host; NAC associa identidade a porta; SIEM correlaciona tudo. Sem entendimento de IPv4, a investigação fica cega.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma arquitetura corporativa, IPv4 aparece em várias camadas: endpoint, servidor, VLAN, gateway, firewall, VPN, cloud, balanceador, DNS, proxy e observabilidade. O endereço não é apenas um dado técnico; ele define zona, escopo, política, rota, risco e responsabilidade operacional.</p>\n<table class=\"data-table\"><thead><tr><th>Componente</th><th>Papel no IPv4</th><th>Evidência típica</th></tr></thead><tbody><tr><td>Endpoint</td><td>Usa IP, máscara, gateway e DNS</td><td><code>ipconfig /all</code>, <code>ip addr</code></td></tr><tr><td>Switch</td><td>Entrega frames dentro da VLAN</td><td><code>show mac address-table</code>, <code>show vlan brief</code></td></tr><tr><td>Gateway</td><td>Roteia para outras redes</td><td><code>show ip route</code>, <code>show arp</code></td></tr><tr><td>DHCP</td><td>Entrega configuração IPv4</td><td>lease, escopo, reserva, relay</td></tr><tr><td>Firewall</td><td>Aplica política entre zonas</td><td>logs de allow/deny por IP e porta</td></tr><tr><td>Cloud</td><td>Define VPC/VNet, subnets, rotas e security groups</td><td>route tables, NSG/SG, NACL</td></tr></tbody></table>\n<p>A arquitetura correta evita sobreposição de CIDR, rede plana, gateway sem controle, DHCP sem governança e exposição pública acidental. O desenho de endereçamento é parte da arquitetura, não apenas configuração de host.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em uma cidade. O endereço IPv4 é como o endereço de uma casa. A máscara é como o limite do bairro. O gateway é a avenida principal que leva para outros bairros. ARP é perguntar dentro do bairro: <em>qual casa corresponde a este endereço?</em>. DNS é a lista telefônica que transforma nome em endereço. Firewall é a portaria que decide se a visita pode entrar.</p>\n<p>Subnetting, que virá depois, é o planejamento urbano: dividir uma cidade grande em bairros menores, com limites claros, rotas previsíveis e regras de acesso. Se os bairros forem desenhados sem critério, ambulâncias, entregas, segurança e manutenção se perdem.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não têm apenas ruas físicas. Existem VLANs, túneis, NAT, VPN, rotas virtuais, firewalls, proxies e caminhos assimétricos. A analogia ajuda a começar, mas o diagnóstico exige evidência técnica.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Considere um notebook com:</p>\n<table class=\"data-table\"><tbody><tr><th>IP</th><td><code>192.168.1.50</code></td></tr><tr><th>Máscara</th><td><code>255.255.255.0</code> ou <code>/24</code></td></tr><tr><th>Rede</th><td><code>192.168.1.0/24</code></td></tr><tr><th>Hosts utilizáveis</th><td><code>192.168.1.1</code> a <code>192.168.1.254</code></td></tr><tr><th>Broadcast</th><td><code>192.168.1.255</code></td></tr><tr><th>Gateway</th><td><code>192.168.1.1</code></td></tr></tbody></table>\n<p>Se o notebook fala com <code>192.168.1.80</code>, o destino está na mesma rede. O host faz ARP para descobrir o MAC de <code>192.168.1.80</code>. Se fala com <code>8.8.8.8</code>, o destino é remoto. O host faz ARP para o gateway <code>192.168.1.1</code> e entrega o frame a ele.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Uma empresa separa redes por função:</p>\n<table class=\"data-table\"><thead><tr><th>Zona</th><th>CIDR</th><th>Gateway</th><th>Observação</th></tr></thead><tbody><tr><td>Usuários</td><td><code>10.20.10.0/24</code></td><td><code>10.20.10.1</code></td><td>Estações corporativas</td></tr><tr><td>Servidores</td><td><code>10.20.20.0/24</code></td><td><code>10.20.20.1</code></td><td>Aplicações internas</td></tr><tr><td>Impressoras</td><td><code>10.20.30.0/24</code></td><td><code>10.20.30.1</code></td><td>Serviços restritos</td></tr><tr><td>Visitantes</td><td><code>10.20.90.0/24</code></td><td><code>10.20.90.1</code></td><td>Sem acesso à rede interna</td></tr></tbody></table>\n<p>Esse desenho permite políticas: usuários podem acessar aplicações específicas; visitantes só acessam Internet; impressoras não devem iniciar comunicação para servidores críticos. IPv4, VLAN e firewall trabalham juntos.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, uma VPC/VNet também usa blocos CIDR. Uma organização pode criar uma rede <code>10.40.0.0/16</code> e dividir em subnets para aplicação, banco, balanceador e administração. Embora switches físicos sejam abstraídos, os conceitos continuam: sub-rede, rota, gateway, tabelas de rota, NAT, firewall e endereço privado.</p>\n<div class=\"callout callout--problem\"><strong>Problema comum:</strong> escolher <code>10.0.0.0/16</code> em todos os ambientes parece simples, mas pode impedir VPN, peering ou integração híbrida por sobreposição de CIDR.</div>\n<p>No próximo módulo, subnetting ajudará a planejar esses blocos antes que eles virem dívida técnica.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, IPv4 aparece em pipelines, runners, containers, Kubernetes, allowlists, scanners, webhooks e conexões com bancos. Um erro de endereçamento pode parecer erro de aplicação: timeout no deploy, webhook que não chega, runner sem acesso ao registry, pod que não resolve DNS ou scanner bloqueado pelo firewall.</p>\n<p>Quando a infraestrutura é criada por IaC, CIDRs e rotas viram código. Isso é excelente para auditoria, mas perigoso quando alguém copia um bloco sem entender impacto. Uma alteração em security group permitindo <code>10.0.0.0/8</code> pode abrir muito mais do que o necessário.</p>\n<div class=\"definition-box\"><strong>Boa prática DevSecOps:</strong> documentar CIDR, função, owner, ambiente, justificativa, rota, controles e logs esperados no mesmo repositório de infraestrutura.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Para Segurança da Informação, IPv4 é parte da investigação. Um alerta pode dizer que <code>10.20.10.55</code> tentou acessar um servidor. Sozinho, esse IP não prova identidade. É preciso correlacionar DHCP, NAC, autenticação, EDR, switchport, horário, NAT, proxy e logs de firewall.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Mitigação</th></tr></thead><tbody><tr><td>Allowlist ampla</td><td><code>10.0.0.0/8</code> liberado sem necessidade</td><td>Menor privilégio por CIDR e porta</td></tr><tr><td>Sobreposição de redes</td><td>VPN não roteia corretamente</td><td>Planejamento IPAM e revisão de arquitetura</td></tr><tr><td>IP privado tratado como seguro</td><td>Serviços internos expostos lateralmente</td><td>Segmentação, firewall interno, autenticação forte</td></tr><tr><td>Logs sem contexto</td><td>IP não aponta para usuário real</td><td>Correlacionar DHCP, NAC, EDR e identidade</td></tr><tr><td>Gateway falso ou DHCP rogue</td><td>Tráfego desviado ou APIPA</td><td>DHCP snooping, DAI, NAC e monitoramento</td></tr></tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<p>O diagrama resume o fluxo mental do Módulo 4: ler a configuração, decidir local/remoto, resolver MAC, enviar ao gateway quando necessário e registrar evidências.</p>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m04l10-title m04l10-desc\">\n<title id=\"m04l10-title\">Fluxo integrado de IPv4 antes de subnetting</title>\n<desc id=\"m04l10-desc\">Host com IPv4, máscara e gateway decide se o destino é local ou remoto, usa ARP e encaminha para o gateway, com evidências para troubleshooting e segurança.</desc>\n<defs><marker id=\"m04l10-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"38\" y=\"54\" width=\"210\" height=\"122\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n<text x=\"143\" y=\"86\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n<text x=\"143\" y=\"114\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.25/24</text>\n<text x=\"143\" y=\"140\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">GW 192.168.10.1</text>\n<rect x=\"326\" y=\"54\" width=\"196\" height=\"122\" rx=\"14\" class=\"svg-node svg-node--switch\"></rect>\n<text x=\"424\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">Switch/VLAN</text>\n<text x=\"424\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Entrega por MAC</text>\n<rect x=\"602\" y=\"54\" width=\"196\" height=\"122\" rx=\"14\" class=\"svg-node svg-node--router\"></rect>\n<text x=\"700\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n<text x=\"700\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Roteia para fora</text>\n<rect x=\"846\" y=\"54\" width=\"98\" height=\"122\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect>\n<text x=\"895\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Rede</text>\n<text x=\"895\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">remota</text>\n<path d=\"M 248 115 L 326 115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l10-arrow)\"></path>\n<path d=\"M 522 115 L 602 115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l10-arrow)\"></path>\n<path d=\"M 798 115 L 846 115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l10-arrow)\"></path>\n<rect x=\"62\" y=\"230\" width=\"230\" height=\"234\" rx=\"14\" class=\"svg-zone\"></rect>\n<text x=\"177\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Cálculo mental</text>\n<text x=\"88\" y=\"296\" class=\"svg-label svg-label--small\">IP + máscara</text>\n<text x=\"88\" y=\"324\" class=\"svg-label svg-label--small\">rede e broadcast</text>\n<text x=\"88\" y=\"352\" class=\"svg-label svg-label--small\">host utilizável?</text>\n<text x=\"88\" y=\"380\" class=\"svg-label svg-label--small\">destino local?</text>\n<text x=\"88\" y=\"408\" class=\"svg-label svg-label--small\">gateway coerente?</text>\n<rect x=\"376\" y=\"230\" width=\"230\" height=\"234\" rx=\"14\" class=\"svg-zone\"></rect>\n<text x=\"491\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Evidência</text>\n<text x=\"402\" y=\"296\" class=\"svg-label svg-label--small\">ipconfig /all</text>\n<text x=\"402\" y=\"324\" class=\"svg-label svg-label--small\">ip addr / ip route</text>\n<text x=\"402\" y=\"352\" class=\"svg-label svg-label--small\">arp -a / ip neigh</text>\n<text x=\"402\" y=\"380\" class=\"svg-label svg-label--small\">ping / traceroute</text>\n<text x=\"402\" y=\"408\" class=\"svg-label svg-label--small\">logs firewall/DHCP</text>\n<rect x=\"690\" y=\"230\" width=\"230\" height=\"234\" rx=\"14\" class=\"svg-zone\"></rect>\n<text x=\"805\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Próximo módulo</text>\n<text x=\"716\" y=\"296\" class=\"svg-label svg-label--small\">dividir blocos</text>\n<text x=\"716\" y=\"324\" class=\"svg-label svg-label--small\">calcular /25, /26...</text>\n<text x=\"716\" y=\"352\" class=\"svg-label svg-label--small\">planejar VLANs</text>\n<text x=\"716\" y=\"380\" class=\"svg-label svg-label--small\">evitar sobreposição</text>\n<text x=\"716\" y=\"408\" class=\"svg-label svg-label--small\">documentar IPAM</text>\n<path d=\"M 292 347 L 376 347\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m04l10-arrow)\"></path>\n<path d=\"M 606 347 L 690 347\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m04l10-arrow)\"></path>\n<rect x=\"278\" y=\"494\" width=\"424\" height=\"42\" rx=\"10\" class=\"svg-badge\"></rect>\n<text x=\"490\" y=\"521\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IPv4 sólido: entender antes de calcular subnetting</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios revisam leitura de IPv4, máscara, gateway, DHCP, ICMP e diagnóstico. O objetivo é pensar como analista, não apenas responder contas isoladas.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio simula uma pequena empresa que precisa documentar endereçamento atual e se preparar para dividir a rede em sub-redes no próximo módulo.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como unir cálculo, diagnóstico e decisão arquitetural sem pular etapas.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>O Módulo 4 ensinou que IPv4 é uma linguagem de localização lógica. IP identifica o host; máscara/CIDR define o bloco; endereço de rede identifica a sub-rede; broadcast representa todos os hosts do segmento; gateway leva para fora; DHCP entrega configuração; ICMP auxilia diagnóstico; troubleshooting organiza evidências.</p>\n<p>A base agora está pronta para subnetting. O próximo passo será aprender a dividir blocos IPv4 de forma planejada, calculando novas redes, intervalos de hosts, broadcasts, gateways e impactos de segurança.</p>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>O próximo módulo será dedicado a <strong>Subnetting e planejamento de endereçamento IPv4</strong>. Antes de continuar, revise especialmente: octetos e binário, máscara/CIDR, rede, hosts, broadcast e gateway.</p>\n</section>"
  },
  "networkContext": {
    "scope": "Revisão integrada de IPv4 em LAN, gateway, DHCP, ICMP, troubleshooting e preparação para subnetting.",
    "layers": [
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "relatedLessons": [
      "0.2",
      "2.5",
      "3.5",
      "3.10",
      "4.1",
      "4.2",
      "4.3",
      "4.4",
      "4.5",
      "4.6",
      "4.7",
      "4.8",
      "4.9"
    ],
    "typicalSymptoms": [
      "IP fora do bloco",
      "máscara errada",
      "gateway fora da sub-rede",
      "APIPA",
      "DHCP falhando",
      "ping inconclusivo",
      "CIDR sobreposto",
      "allowlist ampla",
      "DNS confundido com IP"
    ]
  },
  "protocolFields": [
    {
      "name": "IPv4 Address",
      "description": "Endereço lógico de 32 bits apresentado em quatro octetos decimais."
    },
    {
      "name": "CIDR Prefix",
      "description": "Quantidade de bits de rede, como /24, /26 ou /32."
    },
    {
      "name": "Subnet Mask",
      "description": "Representação decimal pontuada dos bits de rede e host."
    },
    {
      "name": "Network Address",
      "description": "Primeiro endereço lógico do bloco, usado para identificar a sub-rede."
    },
    {
      "name": "Usable Host Range",
      "description": "Intervalo normalmente atribuível a hosts, excluindo rede e broadcast em redes tradicionais."
    },
    {
      "name": "Broadcast Address",
      "description": "Último endereço do bloco em redes IPv4 tradicionais com broadcast."
    },
    {
      "name": "Default Gateway",
      "description": "Próximo salto local usado para alcançar destinos fora da sub-rede."
    },
    {
      "name": "ARP Mapping",
      "description": "Associação entre IPv4 e MAC dentro do enlace local."
    },
    {
      "name": "DHCP Lease",
      "description": "Configuração IPv4 entregue dinamicamente com tempo de concessão."
    },
    {
      "name": "ICMP Type/Code",
      "description": "Campo usado para respostas de controle como Echo Reply, Destination Unreachable e Time Exceeded."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "title": "Aplicação solicita comunicação",
      "description": "O usuário acessa um IP, nome DNS ou serviço."
    },
    {
      "step": 2,
      "title": "Host identifica configuração",
      "description": "IP, máscara, gateway, DNS e rotas são consultados."
    },
    {
      "step": 3,
      "title": "Destino é resolvido",
      "description": "Se houver nome, DNS tenta obter o endereço IP."
    },
    {
      "step": 4,
      "title": "Máscara define localidade",
      "description": "O host decide se o destino está na rede local ou fora dela."
    },
    {
      "step": 5,
      "title": "Rota escolhe próximo salto",
      "description": "Destino local vai direto; destino remoto usa gateway ou rota mais específica."
    },
    {
      "step": 6,
      "title": "ARP resolve MAC",
      "description": "O host encontra o MAC do destino local ou do gateway."
    },
    {
      "step": 7,
      "title": "Frame segue pela LAN",
      "description": "Switches encaminham com base na tabela MAC dentro da VLAN."
    },
    {
      "step": 8,
      "title": "Gateway roteia",
      "description": "Roteador ou firewall encaminha o pacote para outra rede e decrementa TTL."
    },
    {
      "step": 9,
      "title": "Políticas são avaliadas",
      "description": "Firewall, ACL, security group, NAC e filtros locais podem bloquear."
    },
    {
      "step": 10,
      "title": "Evidências são registradas",
      "description": "Diagnóstico responsável documenta testes, saídas, hipótese e próximo passo."
    }
  ],
  "deepDive": {
    "title": "O que precisa estar automático na sua cabeça antes de subnetting",
    "sections": [
      {
        "title": "IP sem máscara é incompleto",
        "content": "Nunca avalie um endereço IPv4 corporativo sem saber seu prefixo. O mesmo IP pode pertencer a blocos diferentes dependendo do CIDR."
      },
      {
        "title": "Gateway precisa estar na rede local",
        "content": "Um host normalmente só consegue usar como gateway um próximo salto alcançável no próprio enlace lógico."
      },
      {
        "title": "ARP não atravessa roteador",
        "content": "ARP resolve MAC no domínio local. Para destinos remotos, o MAC relevante é o do gateway, não o do servidor final."
      },
      {
        "title": "Ping não prova aplicação",
        "content": "ICMP testa um tipo de alcance, mas não confirma DNS, porta TCP, TLS, autenticação, proxy ou estado da aplicação."
      },
      {
        "title": "CIDR é também segurança",
        "content": "Um prefixo grande demais em firewall ou cloud amplia superfície de ataque e dificulta investigação."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que /24 significa 24 hosts",
      "impact": "Erra cálculo de rede e hosts.",
      "correction": "/24 significa 24 bits de rede e 8 bits de host."
    },
    {
      "mistake": "Configurar gateway fora da sub-rede",
      "impact": "Host não consegue sair da rede local.",
      "correction": "Gateway deve ser alcançável no enlace local, salvo arquiteturas específicas."
    },
    {
      "mistake": "Usar endereço de rede ou broadcast como host",
      "impact": "Conflitos e comportamento imprevisível.",
      "correction": "Identifique rede, primeiro host, último host e broadcast antes de atribuir IP."
    },
    {
      "mistake": "Confundir IP privado com ambiente seguro",
      "impact": "Serviços internos ficam expostos lateralmente.",
      "correction": "Use segmentação, firewall, autenticação, logs e menor privilégio."
    },
    {
      "mistake": "Tratar APIPA como IP válido de produção",
      "impact": "Ignora falha de DHCP ou conectividade local.",
      "correction": "Investigue DHCP, VLAN, cabo, Wi-Fi, porta, NAC e escopo."
    },
    {
      "mistake": "Liberar CIDR amplo em allowlist",
      "impact": "Aumenta superfície de ataque.",
      "correction": "Libere o menor prefixo e portas necessárias, com owner e expiração quando possível."
    }
  ],
  "troubleshooting": {
    "method": "Diagnóstico IPv4 integrado antes de subnetting",
    "checklist": [
      "Confirmar interface ativa e conectada.",
      "Coletar IP, máscara, gateway e DNS.",
      "Classificar escopo do endereço: público, privado, loopback ou APIPA.",
      "Identificar rede, faixa de hosts e broadcast.",
      "Verificar se o gateway pertence ao bloco local.",
      "Consultar tabela de rotas e rota default.",
      "Verificar ARP do gateway ou destino local.",
      "Testar loopback, IP local, gateway, destino por IP e destino por nome.",
      "Diferenciar ICMP bloqueado de falha real de aplicação.",
      "Registrar evidências sanitizadas e hipótese provável."
    ],
    "commands": [
      {
        "windows": [
          "ipconfig /all",
          "route print",
          "arp -a",
          "ping 127.0.0.1",
          "ping <gateway>",
          "tracert <destino>",
          "nslookup <nome>",
          "Test-NetConnection <host> -Port <porta>",
          "Get-NetIPConfiguration",
          "Get-NetNeighbor"
        ],
        "linux": [
          "ip addr",
          "ip route",
          "ip neigh",
          "ping -c 4 127.0.0.1",
          "ping -c 4 <gateway>",
          "traceroute <destino>",
          "tracepath <destino>",
          "resolvectl status",
          "dig <nome>",
          "curl -v http://<host>:<porta>",
          "ss -tulpn"
        ],
        "cisco": [
          "show ip interface brief",
          "show interfaces status",
          "show vlan brief",
          "show mac address-table",
          "show arp",
          "show ip route",
          "show running-config | section interface",
          "show ip dhcp binding",
          "show logging"
        ]
      }
    ],
    "evidenceToCollect": [
      "IP/máscara/gateway",
      "rota default",
      "ARP do gateway",
      "resultado de ping para gateway",
      "resultado de traceroute",
      "DNS usado",
      "porta testada",
      "VLAN/porta quando aplicável",
      "logs relevantes",
      "horário e escopo do impacto"
    ],
    "falsePositives": [
      "ping bloqueado por política",
      "traceroute com asteriscos por rate limit",
      "rota assimétrica",
      "DNS cacheado",
      "gateway virtual em alta disponibilidade",
      "cloud reservando endereços adicionais"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Revisão prática de IPv4 e preparação para subnetting.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "principles": [
      "Menor privilégio em CIDR e portas",
      "Segmentação por função",
      "IPAM e documentação",
      "Correlação entre IP, identidade e tempo",
      "Não confiar apenas em IP privado",
      "Sanitização de evidências"
    ],
    "goodPractices": [
      "Planejar blocos antes de criar VPN, VPC/VNet ou VLANs.",
      "Evitar sobreposição de CIDR entre ambientes.",
      "Registrar owner, função e criticidade de cada bloco.",
      "Usar DHCP snooping, DAI, NAC e logs quando disponíveis.",
      "Criar allowlists específicas e revisáveis.",
      "Correlacionar IP com DHCP, NAC, EDR, autenticação e firewall."
    ],
    "badPractices": [
      "Liberar 0.0.0.0/0 sem justificativa.",
      "Tratar 10.0.0.0/8 como confiável por padrão.",
      "Copiar CIDR de outro projeto sem validar conflitos.",
      "Publicar prints com IPs, nomes internos e topologia completa.",
      "Alterar máscara/gateway em produção sem plano de rollback."
    ],
    "vulnerabilities": [
      {
        "name": "Rede plana",
        "description": "Risco relacionado à aula 4.10 — Revisão prática de IPv4 e preparação para subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentação"
      },
      {
        "name": "CIDR amplo",
        "description": "Risco relacionado à aula 4.10 — Revisão prática de IPv4 e preparação para subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "firewall interno"
      },
      {
        "name": "DHCP rogue",
        "description": "Risco relacionado à aula 4.10 — Revisão prática de IPv4 e preparação para subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "NAC/802.1X"
      },
      {
        "name": "ARP spoofing",
        "description": "Risco relacionado à aula 4.10 — Revisão prática de IPv4 e preparação para subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "DHCP snooping"
      },
      {
        "name": "IP duplicado",
        "description": "Risco relacionado à aula 4.10 — Revisão prática de IPv4 e preparação para subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Dynamic ARP Inspection"
      },
      {
        "name": "sobreposição de rotas",
        "description": "Risco relacionado à aula 4.10 — Revisão prática de IPv4 e preparação para subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM"
      },
      {
        "name": "exposição pública acidental",
        "description": "Risco relacionado à aula 4.10 — Revisão prática de IPv4 e preparação para subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IaC com revisão"
      },
      {
        "name": "logs sem contexto",
        "description": "Risco relacionado à aula 4.10 — Revisão prática de IPv4 e preparação para subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "monitoramento e SIEM"
      }
    ],
    "mitigations": [
      "Segmentação",
      "firewall interno",
      "NAC/802.1X",
      "DHCP snooping",
      "Dynamic ARP Inspection",
      "IPAM",
      "IaC com revisão",
      "monitoramento e SIEM",
      "menor privilégio",
      "revisão periódica de allowlists"
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
      "Segmentação",
      "firewall interno",
      "NAC/802.1X",
      "DHCP snooping",
      "Dynamic ARP Inspection",
      "IPAM",
      "IaC com revisão",
      "monitoramento e SIEM",
      "menor privilégio",
      "revisão periódica de allowlists"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um IP sem máscara é insuficiente para diagnóstico?",
      "hints": [
        "A máscara define a rede.",
        "Sem rede não há decisão local/remoto."
      ],
      "expectedIdeas": [
        "máscara",
        "CIDR",
        "rede",
        "gateway",
        "local/remoto"
      ],
      "explanation": "O IP isolado não mostra quais bits são de rede. Sem isso, não sabemos se o destino é local, qual gateway faz sentido nem qual broadcast pertence ao bloco."
    },
    {
      "type": "diagnóstico",
      "question": "Um host tem 169.254.10.20 e não acessa a rede. Qual hipótese inicial?",
      "hints": [
        "Revise APIPA.",
        "Pense em DHCP."
      ],
      "expectedIdeas": [
        "APIPA",
        "DHCP",
        "VLAN",
        "cabo",
        "Wi-Fi",
        "NAC"
      ],
      "explanation": "169.254.0.0/16 indica endereço link-local/APIPA em muitos sistemas, normalmente associado a falha de DHCP ou conectividade local."
    },
    {
      "type": "cenário real",
      "question": "Ping no gateway funciona, mas HTTPS para a aplicação falha. Por que ainda não dá para culpar o IPv4?",
      "hints": [
        "Ping testa ICMP.",
        "HTTPS usa TCP 443 e aplicação."
      ],
      "expectedIdeas": [
        "ICMP",
        "TCP",
        "porta",
        "firewall",
        "DNS",
        "TLS",
        "aplicação"
      ],
      "explanation": "Ping no gateway prova apenas parte do caminho local. A falha pode estar em DNS, rota remota, firewall, porta, TLS, proxy ou aplicação."
    }
  ],
  "quiz": [
    {
      "q": "Qual combinação é necessária para identificar corretamente a rede de um host IPv4?",
      "opts": [
        "IP sozinho",
        "IP e porta TCP",
        "IP e máscara/CIDR",
        "MAC e DNS"
      ],
      "a": 2,
      "exp": "O IP precisa da máscara ou prefixo CIDR para separar rede e host."
    },
    {
      "q": "Em uma comunicação para destino remoto, qual MAC o host normalmente precisa resolver primeiro?",
      "opts": [
        "MAC do servidor remoto",
        "MAC do gateway",
        "MAC do DNS público",
        "MAC do firewall remoto"
      ],
      "a": 1,
      "exp": "Para destino fora da sub-rede, o frame local é entregue ao gateway."
    },
    {
      "q": "O que APIPA normalmente sugere em um endpoint?",
      "opts": [
        "Gateway muito rápido",
        "Falha de DHCP ou conectividade local",
        "Servidor HTTPS fora",
        "DNS público correto"
      ],
      "a": 1,
      "exp": "Endereços 169.254.0.0/16 costumam aparecer quando a configuração automática via DHCP falha."
    },
    {
      "q": "Por que ping não prova que uma aplicação está funcionando?",
      "opts": [
        "Porque ping usa DNS sempre",
        "Porque ICMP não testa necessariamente porta, TLS, autenticação e aplicação",
        "Porque ping altera a tabela ARP permanentemente",
        "Porque ping só existe em IPv6"
      ],
      "a": 1,
      "exp": "Ping testa ICMP; aplicação pode depender de TCP/UDP, DNS, TLS, proxy, credenciais e estado do serviço."
    },
    {
      "q": "Qual prática reduz risco em allowlists IPv4?",
      "opts": [
        "Liberar 10.0.0.0/8 para tudo",
        "Usar 0.0.0.0/0 por simplicidade",
        "Aplicar menor privilégio por CIDR, porta e justificativa",
        "Confiar em IP privado como autenticação"
      ],
      "a": 2,
      "exp": "Menor privilégio por origem, destino, porta e contexto reduz superfície de ataque."
    },
    {
      "q": "Qual é o principal objetivo desta aula 4.10?",
      "opts": [
        "Substituir o módulo de subnetting",
        "Consolidar IPv4 e preparar o raciocínio para subnetting",
        "Ensinar apenas DNS",
        "Ensinar apenas firewall"
      ],
      "a": 1,
      "exp": "A aula integra o Módulo 4 e prepara a base para dividir blocos IPv4 no próximo módulo."
    }
  ],
  "flashcards": [
    {
      "front": "IP + máscara",
      "back": "Conjunto mínimo para identificar a sub-rede de um host."
    },
    {
      "front": "Gateway padrão",
      "back": "Próximo salto local usado quando o destino não pertence à rede local."
    },
    {
      "front": "ARP em destino remoto",
      "back": "Resolve o MAC do gateway, não o MAC final do servidor remoto."
    },
    {
      "front": "APIPA",
      "back": "Faixa 169.254.0.0/16 usada como link-local quando a configuração automática falha em muitos sistemas."
    },
    {
      "front": "Ping",
      "back": "Teste ICMP útil, mas insuficiente para provar aplicação funcionando."
    },
    {
      "front": "Subnetting",
      "back": "Divisão planejada de um bloco IP em sub-redes menores, com rede, hosts, broadcast e gateway próprios."
    }
  ],
  "exercises": [
    {
      "id": "ex-4.10-1",
      "type": "conceitual",
      "prompt": "Explique por que 192.168.10.25 sozinho não basta para saber o broadcast da rede.",
      "expectedAnswer": "Porque o broadcast depende da máscara/CIDR. O mesmo IP pode pertencer a blocos diferentes."
    },
    {
      "id": "ex-4.10-2",
      "type": "diagnóstico",
      "prompt": "Um host recebeu 169.254.44.10. Liste três causas prováveis e três evidências para coletar.",
      "expectedAnswer": "Causas: DHCP indisponível, VLAN errada, Wi-Fi/cabo/porta/NAC. Evidências: ipconfig/ip addr, logs DHCP, status de interface, VLAN/porta, rota e ARP."
    },
    {
      "id": "ex-4.10-3",
      "type": "arquitetura",
      "prompt": "Por que liberar 10.0.0.0/8 em um firewall interno pode ser perigoso?",
      "expectedAnswer": "Porque libera um bloco privado enorme, ampliando movimento lateral e dificultando auditoria. O correto é menor privilégio por CIDR e porta."
    },
    {
      "id": "ex-4.10-4",
      "type": "preparação",
      "prompt": "Liste cinco perguntas que devem ser respondidas antes de dividir uma rede em sub-redes.",
      "expectedAnswer": "Quantas redes são necessárias, quantos hosts por rede, quais zonas existem, quais blocos não podem sobrepor, quais gateways/rotas/políticas serão usados."
    }
  ],
  "challenge": {
    "title": "Desafio — Preparar uma pequena rede para subnetting",
    "scenario": "Uma empresa usa atualmente 192.168.50.0/24 para usuários, impressoras, câmeras e servidores pequenos. Tudo está na mesma rede. A TI quer separar por função no próximo módulo, mas antes precisa documentar o estado atual.",
    "tasks": [
      "Identificar rede, faixa de hosts e broadcast do bloco atual.",
      "Definir quais grupos deveriam virar sub-redes separadas.",
      "Listar riscos de manter tudo em uma única rede.",
      "Listar evidências que devem ser coletadas antes da mudança.",
      "Criar perguntas para o planejamento de subnetting."
    ],
    "deliverables": [
      "Tabela do bloco atual",
      "Lista de zonas futuras",
      "Matriz de riscos",
      "Checklist de evidências",
      "Perguntas abertas para subnetting"
    ],
    "constraints": [
      "Não calcular ainda os novos prefixos finais",
      "Não propor mudanças em produção sem janela",
      "Não publicar IPs reais se usar ambiente próprio"
    ],
    "rubric": [
      "Identificou rede/hosts/broadcast corretamente",
      "Separou zonas por função e risco",
      "Relacionou segurança e operação",
      "Gerou perguntas úteis para subnetting",
      "Sanitizou evidências"
    ]
  },
  "commentedSolution": {
    "summary": "A solução responsável começa documentando o bloco atual 192.168.50.0/24, reconhecendo que há 256 endereços totais e, no modelo clássico, 254 hosts utilizáveis. O gateway provavelmente ocupa um desses hosts, como 192.168.50.1, mas isso deve ser confirmado.",
    "steps": [
      {
        "step": 1,
        "comment": "Documentar o estado atual evita redes novas criadas por chute."
      },
      {
        "step": 2,
        "comment": "Usuários, impressoras, câmeras e servidores têm perfis de risco diferentes; devem ser candidatos a sub-redes/VLANs diferentes."
      },
      {
        "step": 3,
        "comment": "Antes de calcular prefixos, é preciso estimar quantidade de hosts, crescimento, DHCP, reservas e políticas."
      },
      {
        "step": 4,
        "comment": "A matriz de riscos deve citar movimento lateral, broadcast excessivo, dificuldade de logs e falta de menor privilégio."
      },
      {
        "step": 5,
        "comment": "O próximo módulo ensinará a transformar esses requisitos em prefixos como /25, /26, /27 ou outros, conforme necessidade."
      }
    ],
    "finalAnswer": "A rede atual deve ser tratada como baseline. O objetivo agora não é dividir imediatamente, mas preparar os requisitos: quantas zonas, quantos hosts, quais gateways, quais políticas e quais blocos não podem sobrepor. Essa preparação torna subnetting uma decisão arquitetural, não uma conta isolada."
  },
  "glossary": [
    {
      "term": "Baseline IPv4",
      "definition": "Estado atual documentado de endereçamento, rotas, gateways e evidências antes de uma mudança."
    },
    {
      "term": "CIDR",
      "definition": "Notação que indica quantos bits pertencem ao prefixo de rede."
    },
    {
      "term": "Rede",
      "definition": "Endereço que identifica o bloco IP, normalmente não atribuído a hosts em redes tradicionais."
    },
    {
      "term": "Broadcast",
      "definition": "Endereço usado para alcançar todos os hosts de uma sub-rede IPv4 tradicional."
    },
    {
      "term": "Gateway",
      "definition": "Próximo salto local usado para comunicação com redes remotas."
    },
    {
      "term": "IPAM",
      "definition": "Processo ou ferramenta para gerenciar endereços IP, sub-redes, reservas, owners e documentação."
    }
  ],
  "references": [
    {
      "title": "Curso Redes e Network — Módulo 0",
      "description": "Base de bits, bytes, binário e representação de informação."
    },
    {
      "title": "Curso Redes e Network — Módulo 3",
      "description": "Ethernet, MAC, ARP, VLANs e entrega local."
    },
    {
      "title": "Curso Redes e Network — Módulo 4",
      "description": "IPv4, máscara, CIDR, gateway, DHCP, ICMP e troubleshooting."
    },
    {
      "title": "Próximo curso/módulo relacionado",
      "description": "Subnetting, planejamento de endereçamento, sumarização e desenho de redes."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e redes de cloud",
      "reason": "CIDRs e rotas aparecem em Terraform, módulos de VPC/VNet e security groups."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso condicional e contexto de rede",
      "reason": "Políticas de acesso podem usar origem de rede, VPN, IP público e segmentos internos como sinais de contexto."
    }
  ],
  "progressRules": {
    "requiresQuiz": true,
    "requiresLab": true,
    "minimumQuizScore": 70,
    "minimumInteractions": [
      "diagram-viewed",
      "lab-completed",
      "challenge-submitted",
      "flashcards-reviewed"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "5.1"
    ],
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "anyOf": [
        "quizScoreAtLeast",
        "checklistDone"
      ]
    }
  }
};
