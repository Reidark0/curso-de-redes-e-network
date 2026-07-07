export const lesson0406 = {
  "id": "4.6",
  "moduleId": "m04",
  "order": 6,
  "title": "IPv4 público, privado, loopback e APIPA",
  "subtitle": "Como diferenciar escopo, finalidade e comportamento dos principais tipos de endereços IPv4.",
  "duration": "90-125 min",
  "estimatedStudyTimeMinutes": 125,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 220,
  "tags": [
    "redes",
    "ipv4",
    "endereçamento",
    "ip público",
    "ip privado",
    "loopback",
    "apipa",
    "nat",
    "dhcp",
    "cloud",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.1",
      "reason": "A aula 4.1 explicou por que IPv4 existe e como ele complementa Ethernet e roteamento."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.3",
      "reason": "A aula 4.3 explicou máscara e CIDR, necessários para reconhecer blocos de endereços."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.4",
      "reason": "A aula 4.4 explicou endereço de rede, hosts e broadcast, base para validar se um endereço pode ser usado por um host."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "reason": "A aula 4.5 explicou gateway padrão e rota local, necessários para entender quando um endereço precisa ser roteado."
    }
  ],
  "objectives": [
    "Diferenciar endereços IPv4 públicos, privados, loopback, link-local/APIPA e endereços reservados.",
    "Explicar por que endereços privados não são roteados diretamente na internet pública.",
    "Relacionar endereços privados com NAT, firewall, VPN, cloud e ambientes corporativos.",
    "Usar loopback para testes locais sem depender da rede física.",
    "Identificar APIPA como sintoma frequente de falha de DHCP ou isolamento local."
  ],
  "learningOutcomes": [
    "Dado um endereço IPv4, o aluno classifica seu escopo e finalidade.",
    "Dado um host com 169.254.x.x, o aluno explica por que isso sugere falha de DHCP ou ausência de configuração válida.",
    "Dado um serviço em 127.0.0.1, o aluno explica por que ele não está exposto na rede externa por padrão.",
    "Dado um desenho cloud, o aluno diferencia IP privado, IP público, NAT gateway e exposição direta."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n\n<p>Depois de aprender IP, máscara, rede, broadcast e gateway, surge uma dúvida que aparece todos os dias em suporte, infraestrutura, cloud e segurança: <strong>todo endereço IPv4 funciona do mesmo jeito?</strong></p>\n<p>A resposta é não. Um endereço <code>192.168.1.10</code> normalmente identifica um host dentro de uma rede privada. Um endereço <code>8.8.8.8</code> é publicamente roteável. Um endereço <code>127.0.0.1</code> aponta para o próprio host. Um endereço <code>169.254.10.20</code> pode indicar que o host não conseguiu receber configuração via DHCP. Confundir esses escopos gera diagnósticos errados, exposição acidental e arquiteturas frágeis.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um servidor web funciona acessando <code>http://127.0.0.1:8080</code> no próprio servidor, mas ninguém da rede consegue acessar. Outro notebook recebeu <code>169.254.33.8</code> e não fala com a internet. Em cloud, uma VM tem IP privado, mas a equipe acha que ela está exposta publicamente. Todos esses casos exigem entender o tipo de IPv4, não apenas ler os quatro octetos.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n\n<p>No início das redes IP, a quantidade de endereços parecia suficiente e o modelo era mais simples: dispositivos conectados à internet poderiam, em muitos casos, possuir endereços globalmente roteáveis. Com o crescimento explosivo da internet, ficou claro que o espaço IPv4 era limitado e que seria necessário separar endereços de uso interno, endereços públicos e intervalos especiais.</p>\n<p>Essa separação permitiu que redes internas crescessem usando blocos privados sem consumir endereços públicos. O NAT se tornou comum para permitir que muitos dispositivos privados compartilhassem um ou poucos endereços públicos. O loopback tornou-se essencial para testar serviços no próprio host. O APIPA surgiu como mecanismo de autoconfiguração quando não há configuração manual nem resposta DHCP.</p>\n<p>Hoje, esses tipos de endereço aparecem em redes domésticas, datacenters, ambientes cloud, VPNs, containers, Kubernetes, firewalls, proxies e pipelines de DevSecOps. Entender escopo IPv4 é uma habilidade de base para não confundir conectividade local, exposição pública e falhas de configuração.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n\n<p>O problema central é que o mesmo formato visual — quatro números separados por pontos — pode representar funções completamente diferentes. Sem reconhecer o escopo, uma pessoa pode tratar um endereço privado como público, tratar loopback como IP de rede, interpretar APIPA como configuração válida ou expor um serviço sem perceber.</p>\n<ul class=\"flow-list\"><li><strong>IP público:</strong> pode ser roteado na internet pública, dependendo de políticas, provedor e firewall.</li><li><strong>IP privado:</strong> é usado dentro de redes internas e não deve ser anunciado diretamente na internet pública.</li><li><strong>Loopback:</strong> representa o próprio host, usado para testes locais e comunicação interna.</li><li><strong>APIPA/link-local:</strong> aparece quando o host se autoconfigura na faixa <code>169.254.0.0/16</code>, geralmente por falha de DHCP.</li><li><strong>Reservados/especiais:</strong> têm finalidades específicas e não devem ser usados como hosts comuns.</li></ul>\n<div class=\"callout callout--warning\"><strong>Erro comum:</strong> ver um endereço começando com <code>10.</code>, <code>172.</code> ou <code>192.</code> e concluir automaticamente que ele é seguro. Endereço privado reduz roteamento público direto, mas não substitui firewall, autenticação, segmentação ou monitoramento.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n\n<p>A evolução do endereçamento IPv4 reflete o crescimento das redes e a necessidade de escopo. Em vez de todo dispositivo usar endereços públicos, redes passaram a usar blocos privados internamente, NAT na borda, loopback para testes locais e endereços automáticos para situações sem DHCP.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Tipo</th><th>Exemplo</th><th>Uso principal</th><th>Cuidados</th></tr></thead><tbody><tr><td>Público</td><td><code>8.8.8.8</code></td><td>Roteamento global na internet</td><td>Exposição, firewall, DDoS, logs e superfície de ataque</td></tr><tr><td>Privado</td><td><code>10.10.20.5</code></td><td>Redes internas, VPCs, VLANs e VPNs</td><td>Sobreposição de CIDR, NAT, roteamento interno e segmentação</td></tr><tr><td>Loopback</td><td><code>127.0.0.1</code></td><td>Teste e comunicação dentro do próprio host</td><td>Serviço em loopback não fica acessível externamente por padrão</td></tr><tr><td>APIPA/link-local</td><td><code>169.254.12.34</code></td><td>Autoconfiguração local quando DHCP falha</td><td>Indica diagnóstico de DHCP, cabo, VLAN, Wi-Fi ou escopo</td></tr></tbody></table>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n\n<p>O conceito principal desta aula é <strong>escopo de endereço IPv4</strong>. O escopo define onde aquele endereço faz sentido e como ele deve ser tratado por hosts, roteadores, firewalls e aplicações.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> um endereço IPv4 não é apenas um identificador numérico. Ele também pertence a um intervalo com uma finalidade operacional. Saber se ele é público, privado, loopback ou APIPA muda completamente a interpretação do diagnóstico e da arquitetura.</div>\n<table class=\"data-table\"><thead><tr><th>Categoria</th><th>Blocos mais importantes</th><th>Resumo</th></tr></thead><tbody><tr><td>Privados</td><td><code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code></td><td>Uso interno; precisam de roteamento interno, VPN ou NAT para sair.</td></tr><tr><td>Loopback</td><td><code>127.0.0.0/8</code></td><td>Aponta para o próprio host; comum usar <code>127.0.0.1</code>.</td></tr><tr><td>APIPA/link-local</td><td><code>169.254.0.0/16</code></td><td>Autoconfiguração local quando não há configuração IPv4 válida.</td></tr><tr><td>Públicos</td><td>Fora dos intervalos privados/especiais</td><td>Podem ser roteáveis globalmente, respeitando políticas e alocação.</td></tr></tbody></table>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n\n<p>Quando uma interface recebe um endereço IPv4, o sistema operacional não interpreta apenas o número. Ele considera o endereço, a máscara, a tabela de rotas, o gateway, a origem da configuração e o escopo daquele bloco.</p>\n<ol class=\"flow-list\"><li>O host recebe ou define um IPv4 manualmente, via DHCP, via cloud-init, via hypervisor ou via CNI.</li><li>O sistema identifica máscara, gateway, DNS e rotas associadas.</li><li>Se o endereço é privado, ele pode funcionar internamente, mas não é roteado diretamente pela internet pública.</li><li>Se o endereço é público, ele pode ser alcançável externamente se rotas, firewall, NAT e políticas permitirem.</li><li>Se a aplicação escuta em <code>127.0.0.1</code>, ela aceita conexões apenas do próprio host.</li><li>Se a interface cai em <code>169.254.0.0/16</code>, o host provavelmente não obteve configuração DHCP válida.</li><li>Para sair para redes remotas, o host ainda depende de gateway e rota default.</li></ol>\n<p>Esse funcionamento explica por que “tenho IP” não é uma evidência suficiente de conectividade. É necessário perguntar: que tipo de IP, com qual máscara, com qual gateway, em qual interface e com qual rota?</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n\n<p>Na arquitetura de redes, a separação entre público, privado, loopback e APIPA evita que todos os endereços sejam tratados como equivalentes. Ela influencia desenho de VLANs, NAT, VPN, DMZ, VPC, subnets, bastions, proxies e firewalls.</p>\n<ul><li><strong>Rede interna:</strong> normalmente usa endereços privados e aplica segmentação, firewall e roteamento interno.</li><li><strong>Borda:</strong> traduz ou encaminha tráfego entre endereços privados e públicos usando NAT, proxy, firewall ou load balancer.</li><li><strong>Host local:</strong> usa loopback para testes, serviços internos, sockets locais e comunicação entre processos.</li><li><strong>Falha de configuração:</strong> APIPA ajuda o host a ter um endereço local, mas geralmente indica falha para acessar o restante da rede.</li><li><strong>Cloud:</strong> uma instância costuma ter IP privado dentro da VPC/VNet e pode ter IP público, NAT gateway ou load balancer para comunicação externa.</li></ul>\n<div class=\"callout callout--security\"><strong>Segurança:</strong> IP privado não significa automaticamente seguro. Se houver VPN, peering, rota interna, túnel, malware, credencial comprometida ou firewall permissivo, um endereço privado pode ser alcançável a partir de muitos lugares.</div>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n\n<p>Imagine endereços como diferentes tipos de localização. Um IP público é parecido com um endereço postal acessível por qualquer transportadora autorizada. Um IP privado é como o número de uma sala dentro de um prédio: faz sentido internamente, mas alguém de fora precisa passar pela recepção. O loopback é como falar consigo mesmo dentro da própria sala. O APIPA é como receber uma identificação temporária porque a portaria não conseguiu registrar você corretamente.</p>\n<p>A analogia ajuda, mas tem limites. Redes não têm uma única recepção universal. O papel de “recepção” pode ser NAT, firewall, proxy, VPN, load balancer, gateway, route table ou serviço gerenciado de cloud.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n\n<p>Em uma rede doméstica, o notebook pode receber <code>192.168.0.25/24</code> via DHCP. Esse é um endereço privado. O roteador Wi-Fi pode ter <code>192.168.0.1</code> internamente e um endereço público na interface de internet. Quando o notebook acessa um site, o tráfego sai com IP privado até o roteador; o roteador usa NAT para representar a comunicação usando o IP público.</p>\n<p>Se o mesmo notebook mostrar <code>169.254.45.10</code>, a hipótese muda: talvez o DHCP não respondeu, a senha do Wi-Fi falhou, a VLAN está errada, o cabo está desconectado, o switch bloqueou a porta ou o escopo DHCP esgotou.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n\n<p>Em uma empresa, estações podem usar <code>10.20.30.0/24</code>, servidores podem ficar em <code>10.30.10.0/24</code> e impressoras em <code>10.40.5.0/24</code>. Esses blocos privados são roteados internamente por switches L3, firewalls ou roteadores. Para sair para internet, normalmente passam por firewall, proxy, NAT e monitoramento.</p>\n<p>O time de segurança não deve assumir que “por ser privado está protegido”. O controle real vem de segmentação, regras de firewall, NAC, autenticação, inventário, logging e princípio do menor privilégio. Em incidentes, IP privado precisa ser correlacionado com usuário, hostname, MAC, porta de switch, lease DHCP, VPN e horário.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n\n<p>Em cloud, uma VM normalmente recebe um IP privado dentro de uma VPC/VNet, como <code>10.0.2.15</code>. Para ser acessada da internet, pode receber IP público, ficar atrás de um load balancer público, sair por NAT gateway ou permanecer totalmente privada acessível apenas por VPN, bastion, peering ou serviço privado.</p>\n<p>Esse desenho afeta segurança e custo. NAT gateways podem gerar custo por hora e por volume de dados. IP público aumenta superfície de ataque. Subnets privadas reduzem exposição direta, mas exigem desenho correto de rota, DNS, endpoint privado e observabilidade.</p>\n<div class=\"callout callout--warning\"><strong>Armadilha cloud:</strong> uma instância sem IP público ainda pode sair para a internet se houver rota para NAT gateway. Uma instância com IP público pode não estar acessível se security group, NACL, firewall do SO ou rota não permitirem.</div>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n\n<p>Em pipelines, IaC e plataformas internas, endereços IPv4 aparecem em variáveis de ambiente, allowlists, security groups, manifests Kubernetes, ingress controllers, runners self-hosted, bridges Docker e redes de teste. Um erro comum é liberar <code>0.0.0.0/0</code> para facilitar um deploy e esquecer a regra aberta.</p>\n<p>Outro erro comum é confundir <code>localhost</code> dentro de um container com <code>localhost</code> do host. Dentro de um container, <code>127.0.0.1</code> aponta para o próprio container, não para o notebook ou para outro serviço, salvo configurações específicas de rede. Essa diferença explica muitos problemas de conexão entre aplicações, bancos e proxies em ambientes de desenvolvimento.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n\n<p>Em segurança, classificar o endereço é parte da triagem. Um alerta vindo de IP público pode apontar origem externa, proxy, CDN, scanner ou NAT corporativo. Um alerta envolvendo IP privado exige correlação interna. Um serviço ouvindo em loopback pode ser seguro contra acesso remoto direto, mas ainda pode ser explorado localmente por outro processo comprometido. Um APIPA em estação corporativa pode indicar falha de DHCP, rogue device, VLAN errada ou tentativa de isolamento.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Cenário</th><th>Risco</th><th>Mitigação</th></tr></thead><tbody><tr><td>Serviço exposto em IP público</td><td>Varredura, exploração e DDoS</td><td>Firewall, WAF, hardening, autenticação, rate limit e logs</td></tr><tr><td>Allowlist ampla de IP privado</td><td>Movimentação lateral</td><td>Segmentação, menor privilégio, revisão de CIDR e microsegmentação</td></tr><tr><td>Loopback tratado como exposição externa</td><td>Diagnóstico errado</td><td>Validar interface de bind e portas escutando</td></tr><tr><td>APIPA ignorado</td><td>Host isolado sem diagnóstico correto</td><td>Verificar DHCP, VLAN, cabo, Wi-Fi, porta de switch e escopo</td></tr></tbody></table>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 620\" role=\"img\" aria-labelledby=\"m04l06-title m04l06-desc\">\n  <title id=\"m04l06-title\">Escopos IPv4: público, privado, loopback e APIPA</title>\n  <desc id=\"m04l06-desc\">Diagrama mostrando host privado, NAT/firewall, internet pública, loopback local e APIPA como sintoma de falha de DHCP.</desc>\n  <defs>\n    <marker id=\"m04l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\" /></marker>\n  </defs>\n  <rect x=\"35\" y=\"45\" width=\"910\" height=\"530\" rx=\"20\" class=\"svg-zone\" />\n  <text x=\"490\" y=\"82\" text-anchor=\"middle\" class=\"svg-label\">IPv4 não é só número: cada faixa tem escopo e finalidade</text>\n  <rect x=\"80\" y=\"145\" width=\"190\" height=\"125\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"175\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Host interno</text>\n  <text x=\"175\" y=\"215\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.20.30.25</text>\n  <text x=\"175\" y=\"242\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP privado</text>\n  <rect x=\"395\" y=\"145\" width=\"190\" height=\"125\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n  <text x=\"490\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Firewall/NAT</text>\n  <text x=\"490\" y=\"215\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Traduz saída</text>\n  <text x=\"490\" y=\"242\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Política + logs</text>\n  <rect x=\"710\" y=\"145\" width=\"190\" height=\"125\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n  <text x=\"805\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Internet</text>\n  <text x=\"805\" y=\"215\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">203.0.113.10</text>\n  <text x=\"805\" y=\"242\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP público/exemplo</text>\n  <line x1=\"270\" y1=\"207\" x2=\"395\" y2=\"207\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l06-arrow)\" />\n  <line x1=\"585\" y1=\"207\" x2=\"710\" y2=\"207\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l06-arrow)\" />\n  <text x=\"332\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">privado</text>\n  <text x=\"647\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">público/NAT</text>\n  <rect x=\"80\" y=\"365\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"175\" y=\"402\" text-anchor=\"middle\" class=\"svg-label\">Loopback</text>\n  <text x=\"175\" y=\"432\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">127.0.0.1</text>\n  <text x=\"175\" y=\"458\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">o próprio host</text>\n  <rect x=\"395\" y=\"365\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--warning\" />\n  <text x=\"490\" y=\"402\" text-anchor=\"middle\" class=\"svg-label\">APIPA</text>\n  <text x=\"490\" y=\"432\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">169.254.0.0/16</text>\n  <text x=\"490\" y=\"458\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DHCP falhou?</text>\n  <rect x=\"710\" y=\"365\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--security\" />\n  <text x=\"805\" y=\"402\" text-anchor=\"middle\" class=\"svg-label\">Controles</text>\n  <text x=\"805\" y=\"432\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Firewall, NAT, NAC</text>\n  <text x=\"805\" y=\"458\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Logs e segmentação</text>\n  <line x1=\"270\" y1=\"420\" x2=\"395\" y2=\"420\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m04l06-arrow)\" />\n  <line x1=\"585\" y1=\"420\" x2=\"710\" y2=\"420\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l06-arrow)\" />\n  <text x=\"490\" y=\"535\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Diagnóstico correto começa perguntando: este IP é público, privado, loopback, APIPA ou reservado?</text>\n</svg>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n\n<p>O laboratório desta aula treina a classificação de endereços IPv4, a identificação de loopback, a leitura de IP privado/público e o diagnóstico de APIPA. O objetivo é observar e documentar, sem alterar ambientes de produção.</p>\n\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n\n<p>Os exercícios reforçam a identificação de escopo IPv4, a diferença entre exposição pública e privada, e a interpretação de sintomas envolvendo loopback e APIPA.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n\n<p>Você irá analisar quatro hosts com endereços diferentes e decidir quais têm conectividade local, quais dependem de NAT, quais estão restritos ao próprio host e quais indicam falha de configuração.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n\n<p>A solução comentada classifica cada endereço, interpreta o escopo, relaciona com gateway/DHCP/NAT e mostra como evitar conclusões perigosas baseadas apenas no formato visual do IP.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n\n<ul><li>IPv4 público pode ser roteável na internet, se políticas e rotas permitirem.</li><li>IPv4 privado é usado internamente e normalmente precisa de NAT, VPN ou roteamento privado para alcançar outros domínios.</li><li><code>127.0.0.1</code> aponta para o próprio host.</li><li><code>169.254.0.0/16</code> indica autoconfiguração link-local/APIPA, frequentemente associada a falha de DHCP.</li><li>IP privado não substitui firewall, autenticação ou segmentação.</li><li>Em cloud, uma instância pode ter IP privado, IP público, NAT ou load balancer, cada um com impacto operacional e financeiro.</li></ul>\n\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n\n<p>Na próxima aula, estudaremos <strong>Configuração IPv4: manual, DHCP e reservas</strong>. Depois de reconhecer os tipos de endereço, vamos entender como um host recebe ou define sua configuração IPv4 na prática.</p>\n\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3 — Rede",
      "Camada 2 — Enlace"
    ],
    "tcpIpLayers": [
      "Internet",
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "IPv4",
      "DHCP",
      "ARP",
      "ICMP",
      "NAT",
      "DNS"
    ],
    "dependsOn": [
      "CIDR",
      "máscara",
      "gateway",
      "rota default",
      "DHCP",
      "NAT"
    ],
    "enables": [
      "diagnóstico de endereços",
      "planejamento de IPAM",
      "desenho cloud",
      "controle de exposição",
      "troubleshooting DHCP"
    ]
  },
  "protocolFields": [
    {
      "name": "IPv4 Address",
      "bits": "32",
      "description": "Endereço atribuído à interface ou usado como destino/origem.",
      "securityNote": "O escopo do endereço muda a interpretação de logs e alertas."
    },
    {
      "name": "Private Range",
      "bits": "variável",
      "description": "Blocos reservados para uso interno, como 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16.",
      "securityNote": "Privado não significa confiável; exige segmentação e política."
    },
    {
      "name": "Public Address",
      "bits": "32",
      "description": "Endereço potencialmente roteável na internet pública, quando corretamente alocado e anunciado.",
      "securityNote": "Exposição pública aumenta superfície de ataque e exige hardening e monitoramento."
    },
    {
      "name": "Loopback Range",
      "bits": "127.0.0.0/8",
      "description": "Intervalo que aponta para o próprio host, com uso comum de 127.0.0.1.",
      "securityNote": "Serviços em loopback podem ser abusados por processos locais comprometidos."
    },
    {
      "name": "APIPA/Link-local",
      "bits": "169.254.0.0/16",
      "description": "Endereço autoconfigurado para comunicação local quando não há configuração IPv4 válida.",
      "securityNote": "Pode indicar falha de DHCP, isolamento ou problema de VLAN/porta."
    },
    {
      "name": "NAT Boundary",
      "bits": "conceitual",
      "description": "Ponto em que endereços privados são traduzidos para comunicação externa.",
      "securityNote": "Logs de NAT são essenciais para atribuição e investigação."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Host obtém endereço",
      "description": "A interface recebe IP manual, DHCP, cloud-init, hypervisor ou autoconfiguração.",
      "layer": "Camada 3",
      "securityNote": "A origem da configuração ajuda a diferenciar erro humano, DHCP, política cloud ou falha local."
    },
    {
      "step": 2,
      "name": "Sistema classifica escopo",
      "description": "O sistema e o operador interpretam se o IP é privado, público, loopback, APIPA ou reservado.",
      "layer": "Camada 3",
      "securityNote": "Classificação incorreta gera diagnósticos e regras de firewall erradas."
    },
    {
      "step": 3,
      "name": "Aplicação escolhe bind",
      "description": "Serviços podem escutar em 127.0.0.1, IP privado, 0.0.0.0 ou IP público.",
      "layer": "Aplicação/Rede",
      "securityNote": "Bind em 0.0.0.0 pode expor serviço em mais interfaces do que o esperado."
    },
    {
      "step": 4,
      "name": "Host decide rota",
      "description": "Para sair, consulta rota local, rota default e gateway.",
      "layer": "Camada 3",
      "securityNote": "IP privado sem rota/NAT/VPN não alcança internet pública diretamente."
    },
    {
      "step": 5,
      "name": "Borda aplica política",
      "description": "Firewall, NAT, proxy ou load balancer controla tradução e acesso.",
      "layer": "Camada 3/4/7",
      "securityNote": "Política permissiva transforma IP público em risco crítico."
    },
    {
      "step": 6,
      "name": "Logs registram evento",
      "description": "DHCP, NAT, firewall, proxy e endpoint registram evidências.",
      "layer": "Operacional",
      "securityNote": "Sem correlação de horário, IP privado pode apontar para o host errado."
    }
  ],
  "deepDive": {
    "mentalModel": "Antes de investigar conectividade, classifique o endereço. Pergunte: ele é público, privado, loopback, APIPA ou especial? Depois valide máscara, gateway, rota, DHCP, NAT e firewall.",
    "keyTerms": [
      "IP público",
      "IP privado",
      "loopback",
      "APIPA",
      "link-local",
      "NAT",
      "escopo"
    ],
    "limitations": [
      "Endereço privado não garante segurança.",
      "Endereço público não garante acessibilidade; firewall e rotas podem bloquear.",
      "Loopback funciona apenas no próprio host, salvo proxies ou túneis específicos.",
      "APIPA permite comunicação link-local limitada, mas não substitui configuração válida.",
      "Faixas especiais não devem ser usadas como endereços comuns de host."
    ],
    "whenToUse": [
      "Ao diagnosticar conectividade de estação ou servidor.",
      "Ao planejar subnets em redes corporativas e cloud.",
      "Ao revisar regras de firewall, NAT, VPN e security groups.",
      "Ao configurar serviços locais, containers e ambientes de desenvolvimento.",
      "Ao investigar alertas de segurança com IPs internos e externos."
    ],
    "whenNotToUse": [
      "Não use IP privado como se fosse publicamente acessível.",
      "Não use IP público sem política de exposição e hardening.",
      "Não trate APIPA como configuração normal de produção.",
      "Não exponha serviços de desenvolvimento apenas porque funcionam em loopback."
    ],
    "operationalImpact": [
      "Classificação correta reduz tempo de troubleshooting.",
      "Planejamento errado de IP privado causa sobreposição em VPN, peering e fusões de rede.",
      "IP público mal controlado aumenta risco de incidente.",
      "NAT e egress cloud podem gerar custos significativos.",
      "Logs de DHCP/NAT são necessários para auditoria e resposta a incidentes."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que todo IP 172.x.x.x é privado.",
      "whyItHappens": "O aluno memoriza 172, mas esquece que o bloco privado é 172.16.0.0/12.",
      "correction": "Validar se o segundo octeto está entre 16 e 31."
    },
    {
      "mistake": "Achar que 127.0.0.1 é o IP da rede.",
      "whyItHappens": "Serviços locais funcionam no navegador e parecem acessíveis.",
      "correction": "Entender que loopback aponta para o próprio host."
    },
    {
      "mistake": "Ignorar 169.254.x.x.",
      "whyItHappens": "O host mostra um IP e parece configurado.",
      "correction": "Tratar APIPA como forte indicador de falha de DHCP ou isolamento."
    },
    {
      "mistake": "Liberar 0.0.0.0/0 em cloud para testar.",
      "whyItHappens": "Pressa para fazer uma aplicação funcionar.",
      "correction": "Usar menor privilégio, origem específica, bastion, VPN ou endpoint privado."
    },
    {
      "mistake": "Assumir que IP privado não aparece em incidente externo.",
      "whyItHappens": "Confusão entre roteamento público e alcance por VPN, malware, túnel ou peering.",
      "correction": "Analisar caminhos internos, VPNs, proxies, logs e identidade do ativo."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host recebeu 169.254.x.x e não acessa rede corporativa.",
      "Serviço funciona em 127.0.0.1, mas não de outra máquina.",
      "VM cloud tem IP privado, mas equipe espera acesso direto da internet.",
      "Firewall registra IP privado, mas não há identificação clara do usuário.",
      "VPN não conecta por sobreposição de CIDR privado."
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Ver IP, máscara, gateway, DHCP habilitado e DNS."
      },
      {
        "platform": "Windows",
        "command": "route print",
        "purpose": "Ver rotas locais, default e interfaces."
      },
      {
        "platform": "Windows PowerShell",
        "command": "Get-NetIPAddress | Sort-Object InterfaceAlias",
        "purpose": "Listar endereços por interface e facilitar identificação de loopback/APIPA."
      },
      {
        "platform": "Linux",
        "command": "ip addr",
        "purpose": "Ver endereços IPv4 por interface."
      },
      {
        "platform": "Linux",
        "command": "ip route",
        "purpose": "Ver rotas, gateway e escopo."
      },
      {
        "platform": "Linux",
        "command": "ss -lntup",
        "purpose": "Ver serviços escutando em 127.0.0.1, 0.0.0.0 ou IP específico."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief",
        "purpose": "Ver interfaces e endereços IPv4 configurados."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route",
        "purpose": "Ver rotas e caminhos para redes públicas/privadas."
      },
      {
        "platform": "Cloud",
        "command": "Revisar route table, public IP, NAT gateway, security group e firewall do SO",
        "purpose": "Confirmar se IP privado, IP público e caminho de saída/entrada estão coerentes."
      }
    ],
    "decisionTree": [
      "O IP está em 169.254.0.0/16? Investigue DHCP, VLAN, cabo, Wi-Fi, escopo e porta de switch.",
      "O serviço escuta em 127.0.0.1? Testes remotos não acessarão diretamente.",
      "O IP é privado? Verifique gateway, rota, NAT, VPN, peering e firewall interno.",
      "O IP é público? Verifique se há rota, firewall, política cloud, serviço escutando e hardening.",
      "Existe sobreposição de CIDR entre redes? Investigue VPN, cloud peering e rotas conflitantes."
    ],
    "evidenceToCollect": [
      "IP, máscara, gateway e interface",
      "Origem da configuração: DHCP, manual, cloud, container ou APIPA",
      "Tabela de rotas",
      "Portas escutando e endereço de bind",
      "Regras de firewall/security group/NACL",
      "Lease DHCP, NAT logs e logs de autenticação quando aplicável"
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ]
  },
  "security": {
    "badPractices": [
      "Abrir 0.0.0.0/0 para portas administrativas.",
      "Tratar IP privado como zona confiável sem autenticação.",
      "Ignorar APIPA em estações de produção.",
      "Publicar banco de dados diretamente em IP público.",
      "Não correlacionar NAT com identidade do host/usuário.",
      "Usar blocos privados sem planejamento de IPAM e sem considerar VPN/peering."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição acidental de serviços em IP público.",
        "description": "Risco relacionado à aula 4.6 — IPv4 público, privado, loopback e APIPA.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Menor privilégio em firewall e security groups."
      },
      {
        "name": "Movimentação lateral em redes privadas planas.",
        "description": "Risco relacionado à aula 4.6 — IPv4 público, privado, loopback e APIPA.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentação por VLAN, subnet, firewall e identidade."
      },
      {
        "name": "Bypass por allowlists privadas amplas.",
        "description": "Risco relacionado à aula 4.6 — IPv4 público, privado, loopback e APIPA.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM e documentação de blocos privados."
      },
      {
        "name": "Falhas de atribuição em investigações por falta de logs NAT/DHCP.",
        "description": "Risco relacionado à aula 4.6 — IPv4 público, privado, loopback e APIPA.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Monitoramento de IP público e inventário de exposição externa."
      },
      {
        "name": "Serviços locais abusados por malware ou usuário local comprometido.",
        "description": "Risco relacionado à aula 4.6 — IPv4 público, privado, loopback e APIPA.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Logs centralizados de DHCP, NAT, proxy, firewall e VPN."
      },
      {
        "name": "Sobreposição de CIDR causando roteamento ambíguo.",
        "description": "Risco relacionado à aula 4.6 — IPv4 público, privado, loopback e APIPA.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Uso de private endpoints, bastion, ZTNA e controles de administração."
      }
    ],
    "mitigations": [
      "Menor privilégio em firewall e security groups.",
      "Segmentação por VLAN, subnet, firewall e identidade.",
      "IPAM e documentação de blocos privados.",
      "Monitoramento de IP público e inventário de exposição externa.",
      "Logs centralizados de DHCP, NAT, proxy, firewall e VPN.",
      "Uso de private endpoints, bastion, ZTNA e controles de administração."
    ],
    "safeLabRules": [
      "Não testar exposição pública em ativos reais sem autorização.",
      "Não publicar serviços internos na internet para validar aula.",
      "Sanitizar IPs públicos reais antes de compartilhar evidências.",
      "Não alterar DHCP, NAT ou firewall de produção durante o laboratório."
    ],
    "goodPractices": [
      "Usar IPs privados em redes internas e limitar exposição pública ao mínimo necessário.",
      "Aplicar firewall, security groups e ACLs com menor privilégio.",
      "Evitar allowlists amplas como 10.0.0.0/8 sem justificativa forte.",
      "Registrar DHCP, NAT, VPN, proxy e firewall para rastreabilidade.",
      "Usar VPN, bastion, private endpoints ou zero trust para administração.",
      "Revisar bind de serviços para não expor aplicações de desenvolvimento."
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
      "Menor privilégio em firewall e security groups.",
      "Segmentação por VLAN, subnet, firewall e identidade.",
      "IPAM e documentação de blocos privados.",
      "Monitoramento de IP público e inventário de exposição externa.",
      "Logs centralizados de DHCP, NAT, proxy, firewall e VPN.",
      "Uso de private endpoints, bastion, ZTNA e controles de administração."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-4.6",
    "title": "Classificando IPv4 público, privado, loopback e APIPA",
    "labType": "cloud",
    "objective": "Classificar endereços IPv4, identificar escopo, validar loopback, reconhecer APIPA e relacionar endereços com gateway, DHCP e exposição.",
    "scenario": "15. Laboratório O laboratório desta aula treina a classificação de endereços IPv4, a identificação de loopback, a leitura de IP privado/público e o diagnóstico de APIPA. O objetivo é observar e documentar, sem alterar ambientes de produção.",
    "topology": "Um computador Windows ou Linux, acesso a terminal, navegador local e, opcionalmente, ambiente de laboratório com VM ou Packet Tracer.",
    "architecture": "Host local com interfaces IPv4, loopback, possível DHCP, gateway local e observação de rotas. Opcionalmente, comparar com uma VM cloud ou ambiente simulado.",
    "prerequisites": [
      "Windows, Linux ou macOS com terminal",
      "Permissão para executar comandos de leitura",
      "Opcional: Wireshark, Packet Tracer ou VM de laboratório",
      "Não usar rede de produção para testes destrutivos"
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 125,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não publicar serviços de laboratório na internet sem autorização.",
      "Não compartilhar IP público real sem sanitização.",
      "Não modificar DHCP de rede corporativa.",
      "Não executar testes de exposição contra terceiros.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar endereços da máquina",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "Windows: ipconfig /all\nLinux: ip addr\nLinux: ip route",
        "expectedOutput": "Você identifica pelo menos o IP da interface ativa, máscara/prefixo e gateway, se houver.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “IPv4 público, privado, loopback e APIPA” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Validar loopback",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "Windows/Linux: ping 127.0.0.1\nLinux: ss -lntup\nWindows PowerShell: Get-NetTCPConnection -State Listen",
        "expectedOutput": "O loopback responde localmente e serviços locais podem escutar em 127.0.0.1.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “IPv4 público, privado, loopback e APIPA” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Reconhecer IP privado",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "Windows: ipconfig\nLinux: ip -4 addr show",
        "expectedOutput": "Você determina se o host está usando IP privado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “IPv4 público, privado, loopback e APIPA” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Investigar rota de saída",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "Windows: route print\nLinux: ip route",
        "expectedOutput": "Você encontra uma rota default, se o host tiver saída configurada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “IPv4 público, privado, loopback e APIPA” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Simular diagnóstico APIPA de forma segura",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "command": "Não execute mudanças em produção\nOpcional em VM isolada: desabilitar temporariamente DHCP e observar comportamento",
        "expectedOutput": "Você associa APIPA a falha de DHCP ou ausência de configuração válida.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “IPv4 público, privado, loopback e APIPA” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Documentar matriz de escopo",
        "instruction": "Execute o passo descrito e registre o resultado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você classifica cada endereço e justifica a decisão.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “IPv4 público, privado, loopback e APIPA” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “IPv4 público, privado, loopback e APIPA”.",
    "validation": [
      {
        "check": "Entregar uma matriz com endereço, categoria, finalidade, alcance esperado, riscos e evidências coletadas.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Entregar uma matriz com endereço, categoria, finalidade, alcance esperado, riscos e evidências coletadas.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se os comandos variam por sistema, registre o equivalente disponível. O foco é leitura e interpretação, não alteração de rede.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar comparação com uma VM cloud privada/pública.",
      "Documentar regras de security group/NAT em laboratório controlado.",
      "Criar checklist de revisão de exposição IPv4.",
      "Adicionar IPAM simples com blocos privados e donos."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “IPv4 público, privado, loopback e APIPA” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Matriz de escopo IPv4 para diagnóstico e segurança",
    "solution": "Endereço IPv4 precisa ser analisado por escopo. Público, privado, loopback e APIPA representam comportamentos diferentes. O diagnóstico maduro valida IP, máscara, rota, gateway, DHCP, NAT, bind de serviço e controles de segurança antes de concluir causa raiz.",
    "duration": "60-90 min",
    "expectedOutcome": "Ao final, o aluno classifica endereços IPv4 por escopo, reconhece loopback e APIPA, e relaciona IP privado/público com roteamento, NAT, firewall e troubleshooting."
  },
  "mentorQuestions": [
    {
      "question": "Por que 127.0.0.1 funciona mesmo sem cabo de rede conectado?",
      "hint": "Pense no loopback como interface lógica interna do próprio host.",
      "expectedAnswer": "Porque loopback não depende da rede física; ele representa comunicação local dentro da pilha TCP/IP do próprio host."
    },
    {
      "question": "Por que um IP privado não é automaticamente seguro?",
      "hint": "Pense em VPN, malware, peering, redes internas planas e firewalls permissivos.",
      "expectedAnswer": "Porque ele pode ser alcançado por caminhos internos, VPNs, túneis ou redes comprometidas; segurança depende de controles, não apenas de escopo privado."
    },
    {
      "question": "O que você investigaria ao ver 169.254.x.x em uma estação?",
      "hint": "Pense em DHCP e conectividade local.",
      "expectedAnswer": "Investigaria DHCP, VLAN, cabo, Wi-Fi, escopo esgotado, porta de switch, NAC, firewall local e configuração manual ausente."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Qual faixa é privada?",
      "options": [
        "8.8.8.8/32",
        "10.0.0.0/8",
        "127.0.0.0/8",
        "169.254.0.0/16"
      ],
      "answer": 1,
      "explanation": "10.0.0.0/8 é um dos blocos privados clássicos."
    },
    {
      "id": "q2",
      "question": "Qual é o uso mais comum de 127.0.0.1?",
      "options": [
        "Gateway padrão",
        "Broadcast",
        "Loopback local",
        "APIPA"
      ],
      "answer": 2,
      "explanation": "127.0.0.1 aponta para o próprio host."
    },
    {
      "id": "q3",
      "question": "Um host com 169.254.10.20 geralmente sugere o quê?",
      "options": [
        "Sucesso de NAT",
        "Falha ou ausência de configuração DHCP válida",
        "IP público válido",
        "Gateway configurado corretamente"
      ],
      "answer": 1,
      "explanation": "169.254.0.0/16 é link-local/APIPA, comum quando DHCP falha."
    },
    {
      "id": "q4",
      "question": "Qual afirmação é correta sobre IP privado?",
      "options": [
        "É sempre seguro",
        "É roteado diretamente na internet pública",
        "É usado internamente e normalmente precisa de NAT/VPN/roteamento privado para outros domínios",
        "Só existe em redes domésticas"
      ],
      "answer": 2,
      "explanation": "IP privado é para uso interno; sua conectividade depende de roteamento, NAT, VPN ou políticas internas."
    },
    {
      "id": "q5",
      "question": "Qual endereço NÃO está no bloco privado 172.16.0.0/12?",
      "options": [
        "172.16.1.1",
        "172.20.5.5",
        "172.31.255.10",
        "172.40.1.1"
      ],
      "answer": 3,
      "explanation": "O bloco privado 172.16/12 vai de 172.16.0.0 a 172.31.255.255."
    },
    {
      "id": "q6",
      "question": "Em containers, 127.0.0.1 dentro de um container normalmente aponta para quê?",
      "options": [
        "O roteador da LAN",
        "O próprio container",
        "Sempre o host físico",
        "O DNS público"
      ],
      "answer": 1,
      "explanation": "Loopback é local ao namespace de rede do ambiente onde o processo roda."
    }
  ],
  "flashcards": [
    {
      "front": "Quais são os três blocos privados IPv4 clássicos?",
      "back": "10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16."
    },
    {
      "front": "O que é 127.0.0.1?",
      "back": "É o loopback local, usado para comunicação com o próprio host."
    },
    {
      "front": "O que sugere um IP 169.254.x.x?",
      "back": "Autoconfiguração link-local/APIPA, frequentemente por falha de DHCP ou ausência de configuração válida."
    },
    {
      "front": "IP privado é automaticamente seguro?",
      "back": "Não. Ele reduz roteamento público direto, mas precisa de firewall, segmentação, autenticação e monitoramento."
    },
    {
      "front": "Por que NAT é comum com IP privado?",
      "back": "Porque IPs privados não são roteados diretamente na internet pública; NAT permite saída usando endereço público."
    },
    {
      "front": "O que significa serviço escutando em 0.0.0.0?",
      "back": "Geralmente significa escutar em todas as interfaces disponíveis, podendo expor mais do que o esperado."
    }
  ],
  "exercises": [
    {
      "id": "ex1",
      "title": "Classificação rápida",
      "prompt": "Classifique: 10.1.2.3, 172.16.5.5, 172.32.5.5, 192.168.10.10, 127.0.0.1, 169.254.9.9.",
      "expectedAnswer": "Privado, privado, não privado por esse bloco, privado, loopback, APIPA/link-local.",
      "difficulty": "básico"
    },
    {
      "id": "ex2",
      "title": "Loopback e exposição",
      "prompt": "Explique por que uma aplicação acessível em http://127.0.0.1:5000 no servidor pode não abrir no navegador de outro computador.",
      "expectedAnswer": "Porque 127.0.0.1 aponta para o próprio host. A aplicação pode estar vinculada apenas ao loopback, sem escutar na interface de rede.",
      "difficulty": "básico"
    },
    {
      "id": "ex3",
      "title": "APIPA em estação",
      "prompt": "Uma estação recebeu 169.254.44.20 e não acessa sistemas internos. Liste hipóteses e evidências.",
      "expectedAnswer": "DHCP indisponível, VLAN errada, cabo/porta/Wi-Fi, escopo esgotado, NAC, switch bloqueado; evidências incluem ipconfig/ip addr, logs DHCP, porta switch, VLAN e eventos do endpoint.",
      "difficulty": "intermediário"
    },
    {
      "id": "ex4",
      "title": "Cloud privada/pública",
      "prompt": "Uma VM tem 10.0.2.15 e acessa internet. Ela tem IP público? Explique possibilidades.",
      "expectedAnswer": "Não necessariamente. Ela pode sair por NAT gateway, proxy, firewall ou appliance. Ter saída não significa ter IP público próprio nem entrada pública permitida.",
      "difficulty": "intermediário"
    }
  ],
  "challenge": {
    "title": "Matriz de escopo IPv4 para diagnóstico e segurança",
    "scenario": "Você recebeu uma lista de ativos: notebook A com 169.254.11.20, servidor B com 10.30.2.15, aplicação C em 127.0.0.1:8080, VM D com IP privado 10.0.1.20 atrás de NAT e serviço E com IP público. A equipe quer saber o que está acessível, o que indica falha e o que exige controle de exposição.",
    "tasks": [
      "Classificar cada endereço por escopo.",
      "Explicar o alcance esperado de cada ativo.",
      "Indicar riscos de segurança e operação.",
      "Propor evidências a coletar.",
      "Propor controles para o serviço público e para a rede privada."
    ],
    "deliverables": [
      "Tabela de classificação",
      "Fluxo de diagnóstico",
      "Matriz de riscos",
      "Controles recomendados",
      "Resumo executivo sanitizado"
    ],
    "rubric": [
      {
        "criterion": "Classificação correta",
        "points": 30
      },
      {
        "criterion": "Relação com DHCP, NAT, gateway e loopback",
        "points": 25
      },
      {
        "criterion": "Riscos e mitigação defensiva",
        "points": 25
      },
      {
        "criterion": "Clareza operacional e evidências",
        "points": 20
      }
    ]
  },
  "commentedSolution": {
    "summary": "A análise correta começa classificando escopo antes de falar em firewall, DNS ou aplicação.",
    "steps": [
      {
        "step": 1,
        "comment": "Notebook A com 169.254.11.20 está em APIPA/link-local. A hipótese principal é falha DHCP ou isolamento local."
      },
      {
        "step": 2,
        "comment": "Servidor B com 10.30.2.15 usa IP privado. Ele pode ser alcançável internamente, por VPN ou peering, mas não diretamente pela internet pública sem NAT/proxy/load balancer."
      },
      {
        "step": 3,
        "comment": "Aplicação C em 127.0.0.1:8080 está limitada ao próprio host, salvo redirecionamentos, túneis ou proxies."
      },
      {
        "step": 4,
        "comment": "VM D com 10.0.1.20 atrás de NAT pode sair para internet sem possuir IP público próprio de entrada."
      },
      {
        "step": 5,
        "comment": "Serviço E com IP público exige revisão de firewall, hardening, logs, autenticação, proteção DDoS/WAF se aplicável e inventário de exposição."
      }
    ],
    "finalAnswer": "Endereço IPv4 precisa ser analisado por escopo. Público, privado, loopback e APIPA representam comportamentos diferentes. O diagnóstico maduro valida IP, máscara, rota, gateway, DHCP, NAT, bind de serviço e controles de segurança antes de concluir causa raiz."
  },
  "glossary": [
    {
      "term": "IP público",
      "definition": "Endereço IPv4 potencialmente roteável na internet pública, conforme alocação, rotas e políticas."
    },
    {
      "term": "IP privado",
      "definition": "Endereço reservado para uso interno, como 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16."
    },
    {
      "term": "Loopback",
      "definition": "Endereço lógico que aponta para o próprio host, com uso comum de 127.0.0.1."
    },
    {
      "term": "APIPA",
      "definition": "Autoconfiguração IPv4 link-local na faixa 169.254.0.0/16, comum quando DHCP falha."
    },
    {
      "term": "NAT",
      "definition": "Tradução de endereços de rede, frequentemente usada para permitir que hosts privados acessem redes externas usando IP público."
    },
    {
      "term": "Escopo",
      "definition": "Contexto em que um endereço é válido e como ele deve ser roteado, protegido e interpretado."
    }
  ],
  "references": [
    {
      "type": "internal",
      "title": "Redes e Network — Módulo 4.1",
      "description": "Por que o IPv4 existe."
    },
    {
      "type": "internal",
      "title": "Redes e Network — Módulo 4.5",
      "description": "Gateway padrão e rota local."
    },
    {
      "type": "internal",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "description": "Relacionar endereçamento com cloud, IaC, NAT, security groups e pipelines."
    },
    {
      "type": "internal",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "description": "Relacionar exposição de rede com identidade, acesso remoto, VPN, bastion e zero trust."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud networking",
      "reason": "IP privado, NAT gateway, subnet pública/privada e security groups serão usados em deploys cloud."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso remoto e Zero Trust",
      "reason": "Endereços privados e públicos influenciam VPN, bastion, ZTNA e políticas de acesso."
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
    "minimumQuizScore": 70,
    "requiredFlashcardsReviewed": 4,
    "requiredExercisesCompleted": 3,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "4.7"
    ]
  }
};
