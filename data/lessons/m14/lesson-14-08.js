export const lesson1408 = {
  "id": "14.8",
  "moduleId": "m14",
  "order": 8,
  "title": "VPN híbrida, Direct Connect, ExpressRoute e BGP na cloud",
  "subtitle": "Como conectar datacenter, filiais e cloud com túneis, links dedicados, anúncios de rota e controles defensivos.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 320,
  "tags": [
    "cloud networking",
    "vpn",
    "ipsec",
    "direct connect",
    "expressroute",
    "interconnect",
    "bgp",
    "híbrido",
    "roteamento",
    "segurança",
    "troubleshooting",
    "custos"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m10",
      "lesson": "10.x",
      "reason": "VPN, túneis e acesso remoto são base para entender VPN site-to-site."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.x",
      "reason": "BGP e troubleshooting de caminhos são fundamentais para conectividade híbrida."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.4",
      "reason": "Conectividade híbrida depende de route tables, next hops e propagação de rotas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.7",
      "reason": "Ambientes híbridos também dependem de DNS público, privado e resolução condicional."
    }
  ],
  "objectives": [
    "Explicar por que conectividade híbrida existe em cloud networking.",
    "Diferenciar VPN site-to-site, Direct Connect, ExpressRoute e Cloud Interconnect.",
    "Entender o papel do BGP na troca dinâmica de rotas entre datacenter e cloud.",
    "Projetar redundância com túneis, links, zonas, regiões e provedores.",
    "Identificar riscos de rota, assimetria, prefixos sobrepostos, propagação indevida e egress inesperado.",
    "Criar um plano defensivo de validação, troubleshooting, logs e custos para conexão híbrida."
  ],
  "learningOutcomes": [
    "Dado um cenário híbrido, o aluno escolhe entre VPN, link dedicado ou combinação dos dois.",
    "Dado um problema de conectividade, o aluno separa falha de túnel, BGP, rota, firewall, DNS e aplicação.",
    "Dado um conjunto de CIDRs, o aluno identifica sobreposição e risco de anúncio indevido.",
    "Dado um desenho cloud, o aluno propõe redundância e observabilidade para conectividade híbrida."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n\n  <p>Imagine que uma empresa migrou parte de seus sistemas para cloud, mas ainda mantém Active Directory, banco legado, appliances de segurança, sistemas de pagamento e estações administrativas no datacenter. A aplicação nova roda em uma VPC/VNet privada. Ela precisa consultar um serviço legado interno, autenticar usuários, registrar logs no SIEM corporativo e permitir que administradores acessem recursos sem expor portas na internet. Como fazer isso sem transformar a cloud em uma ilha desconectada ou abrir tudo com IP público?</p>\n  <p>Esse é o problema da conectividade híbrida. A cloud não substitui imediatamente o datacenter. Durante muitos anos, empresas operam em modo híbrido: parte on-premises, parte cloud, parte SaaS, parte Kubernetes, parte legado. Redes híbridas precisam conectar mundos diferentes com previsibilidade, segurança, auditoria, custo controlado e capacidade de troubleshooting.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma VPN sobe, o BGP estabelece, mas apenas algumas subnets acessam a cloud. Outras funcionam em um sentido e falham no retorno. O time de aplicação diz que “a cloud caiu”, o time de rede diz que “a rota está anunciada”, o time de segurança diz que “o firewall bloqueou por política” e ninguém tem uma visão completa do caminho.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n\n  <p>Antes da cloud, conectar locais corporativos já era um desafio: matriz, filiais, datacenters, parceiros e provedores precisavam trocar tráfego por links MPLS, circuitos dedicados, VPNs IPsec, roteamento estático ou BGP. O objetivo era interligar redes com controle de rota, criptografia quando necessário e acordos operacionais claros.</p>\n  <p>Com a cloud, esse problema ganhou nova escala. A empresa passou a criar redes virtuais em minutos, em regiões diferentes, com subnets novas, gateways gerenciados, firewalls cloud, endpoints privados e workloads elásticos. A conectividade deixou de ser apenas “um cabo entre dois prédios” e virou integração entre plano físico, plano virtual e plano de controle do provedor.</p>\n  <p>As primeiras integrações cloud muitas vezes usavam VPN site-to-site por ser rápida e relativamente barata. Depois, ambientes críticos passaram a usar links dedicados, como AWS Direct Connect, Azure ExpressRoute e Google Cloud Interconnect, para maior previsibilidade, throughput e menor dependência da internet pública. Em paralelo, BGP se tornou o mecanismo natural para troca dinâmica de rotas entre roteadores corporativos e gateways cloud.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n\n  <p>O problema técnico é conectar redes administrativas e domínios de controle diferentes sem perder segurança, rastreabilidade, disponibilidade e clareza operacional.</p>\n  <ul>\n    <li><strong>Endereçamento:</strong> CIDRs on-premises e cloud não podem se sobrepor se houver roteamento direto.</li>\n    <li><strong>Roteamento:</strong> rotas precisam ir e voltar pelo caminho esperado; rota de ida sem rota de retorno gera falha intermitente.</li>\n    <li><strong>Segurança:</strong> conexão híbrida não deve virar túnel amplo com acesso irrestrito a todas as redes.</li>\n    <li><strong>Disponibilidade:</strong> um único túnel, link ou roteador pode virar ponto único de falha.</li>\n    <li><strong>Custo:</strong> tráfego, links dedicados, gateways, appliances, logs e egress geram cobrança recorrente.</li>\n    <li><strong>Troubleshooting:</strong> uma falha pode estar em IPsec, BGP, rota, firewall, DNS, MTU, assimetria ou aplicação.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha comum:</strong> achar que “VPN conectada” significa “ambiente híbrido pronto”. A VPN é apenas o transporte. A arquitetura real depende de rotas, políticas, DNS, identidade, logs e validação fim a fim.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n\n  <p>A conectividade híbrida evoluiu de túneis pontuais para arquiteturas regionais com trânsito, roteamento dinâmico, links dedicados, inspeção centralizada e automação por IaC.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funciona</th><th>Vantagem</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>VPN com rota estática</td><td>Prefixos são configurados manualmente</td><td>Simples para poucos blocos</td><td>Escala mal e aumenta erro operacional</td></tr>\n      <tr><td>VPN com BGP</td><td>Gateways trocam rotas dinamicamente</td><td>Melhor failover e menor operação manual</td><td>Exige desenho de anúncios, filtros e métricas</td></tr>\n      <tr><td>Link dedicado</td><td>Circuito privado conecta rede corporativa ao provedor</td><td>Mais previsibilidade e throughput</td><td>Custo, prazo de provisionamento e dependência de operadora</td></tr>\n      <tr><td>Híbrido com hub/transit</td><td>Conectividade centralizada em hub, transit gateway ou virtual WAN</td><td>Escala melhor para múltiplas redes</td><td>Aumenta impacto de erro central</td></tr>\n      <tr><td>Zero Trust/privado por aplicação</td><td>Acesso controlado por identidade, recurso e contexto</td><td>Reduz confiança implícita em rede</td><td>Não elimina necessidade de roteamento e DNS corretos</td></tr>\n    </tbody>\n  </table>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n\n  <p>VPN híbrida é a conexão criptografada, normalmente IPsec, entre uma rede corporativa e uma rede cloud usando a internet ou transporte equivalente. Links dedicados, como Direct Connect, ExpressRoute e Cloud Interconnect, criam conectividade privada entre a rede do cliente e o provedor cloud por meio de portas, circuitos, parceiros e roteamento BGP. BGP é o protocolo que permite a troca dinâmica de rotas entre sistemas autônomos ou domínios administrativos.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> conectividade híbrida em cloud é o conjunto de túneis, circuitos, gateways, rotas, políticas, anúncios BGP, DNS e controles de segurança que permite tráfego privado e governado entre datacenter, filiais, clouds e serviços gerenciados.</div>\n  <p>O ponto central é que conectividade híbrida não é apenas “alcançar IP privado”. É decidir quais redes podem se ver, por quais caminhos, com qual redundância, com qual inspeção, com quais logs e com qual custo.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Um fluxo híbrido típico envolve várias decisões internas.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Origem inicia tráfego:</strong> um servidor on-premises tenta acessar <code>10.40.20.15</code> em uma subnet privada da cloud.</li>\n    <li><strong>Roteador local consulta tabela:</strong> ele procura a rota mais específica para o prefixo cloud.</li>\n    <li><strong>Next hop é escolhido:</strong> pode ser túnel VPN, circuito dedicado, firewall, SD-WAN ou roteador de borda.</li>\n    <li><strong>Se houver IPsec:</strong> políticas, IKE, chaves, algoritmos e Security Associations precisam estar corretos.</li>\n    <li><strong>Se houver BGP:</strong> peers trocam prefixos, ASNs, atributos, keepalives e rotas instaláveis.</li>\n    <li><strong>Cloud recebe tráfego:</strong> o gateway cloud encaminha para route table, subnet, security group/NSG e firewall.</li>\n    <li><strong>Retorno precisa existir:</strong> a subnet cloud precisa saber como devolver tráfego ao prefixo on-premises.</li>\n    <li><strong>Logs confirmam:</strong> flow logs, firewall logs, VPN metrics, BGP status e SIEM ajudam a reconstruir o caminho.</li>\n  </ol>\n  <p>Falhas comuns aparecem quando apenas um desses passos está correto. Por exemplo: BGP estabelecido, mas prefixo filtrado; túnel ativo, mas security group negando; rota instalada, mas firewall corporativo sem regra; DNS resolvendo para IP privado, mas rota de retorno ausente.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Arquiteturas híbridas maduras separam conectividade, inspeção, resolução de nomes, segmentação e operação.</p>\n  <ul>\n    <li><strong>Datacenter/filial:</strong> roteadores de borda, firewalls, SD-WAN, DNS, IAM e sistemas legados.</li>\n    <li><strong>Conexão:</strong> VPN IPsec, circuito dedicado ou ambos em redundância.</li>\n    <li><strong>Gateway cloud:</strong> VPN Gateway, Virtual Private Gateway, Transit Gateway, Virtual WAN, Cloud Router ou equivalente.</li>\n    <li><strong>Hub cloud:</strong> rede central com firewall, DNS resolver, bastion, observabilidade e conectividade compartilhada.</li>\n    <li><strong>Spokes:</strong> VPCs/VNets de aplicações separadas por ambiente, criticidade e domínio de negócio.</li>\n    <li><strong>Segurança:</strong> roteamento filtrado, SG/NSG, NACL, firewall, logs, IAM e menor privilégio por fluxo.</li>\n  </ul>\n  <p>O desenho precisa evitar dois extremos: uma conexão ponto a ponto caótica para cada aplicação e um hub superpermissivo que conecta tudo com tudo.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em conectividade híbrida como criar estradas entre cidades administradas por governos diferentes. A VPN é uma estrada protegida por túnel. O link dedicado é uma estrada privada contratada. O BGP é o sistema de placas e mapas que informa quais bairros podem ser alcançados por qual caminho. O firewall é a alfândega. O DNS é a agenda de endereços. O SIEM é o centro de monitoramento que registra quem passou, quando e por onde.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> pacotes não “dirigem” sozinhos. Roteadores tomam decisões por tabelas, prefixos, métricas e políticas. Além disso, tráfego de ida e volta pode seguir caminhos diferentes, o que complica investigação e inspeção stateful.</div>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Em um laboratório pequeno, uma empresa tem uma rede local <code>192.168.10.0/24</code> e uma VPC com <code>10.20.0.0/16</code>. Uma VPN site-to-site é criada entre o firewall da empresa e o gateway da cloud. A rota on-premises aponta <code>10.20.0.0/16</code> para a VPN. A route table da VPC aponta <code>192.168.10.0/24</code> para o gateway VPN. Security groups permitem apenas TCP/443 de um servidor específico. O teste correto não é “pingar tudo”; é validar o fluxo autorizado e confirmar que fluxos não autorizados são negados e registrados.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa grande, há duas conexões dedicadas para a cloud em localidades distintas, mais VPNs de backup. BGP anuncia prefixos corporativos filtrados para a cloud e recebe apenas prefixos autorizados. Um hub central inspeciona tráfego com firewall e NDR. Ambientes de produção, homologação, desenvolvimento e dados ficam em spokes separados. DNS híbrido resolve nomes internos entre datacenter e cloud. O SOC recebe logs de BGP, VPN, firewall, flow logs e IAM.</p>\n  <p>Esse desenho é mais caro e complexo, mas permite resiliência, menor privilégio, troubleshooting por evidência e governança. Sem esse planejamento, a conectividade híbrida vira um grande atalho de movimento lateral.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Na AWS, a organização pode usar Site-to-Site VPN para conexão criptografada com dois túneis, Direct Connect para conexão dedicada, Virtual Private Gateway ou Transit Gateway para anexar redes e BGP para rotas dinâmicas. No Azure, VPN Gateway e ExpressRoute conectam redes on-premises a VNets, com BGP em cenários de roteamento dinâmico. No Google Cloud, HA VPN, Cloud Interconnect e Cloud Router permitem troca dinâmica de rotas com redes remotas.</p>\n  <p>Apesar dos nomes mudarem, a pergunta arquitetural é a mesma: quais prefixos serão anunciados, quais caminhos serão preferidos, onde haverá inspeção, como será o failover, como os logs serão coletados e como evitar que uma rota ampla transforme a cloud inteira em extensão irrestrita do datacenter.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, conectividade híbrida deve ser descrita e validada como código. Módulos Terraform podem declarar VPN gateways, route tables, BGP ASN, propagação de rotas, associações de subnets, flow logs, alertas e regras de firewall. Pipelines podem impedir CIDR sobreposto, rota default para on-premises sem justificativa, prefixo amplo demais, ausência de logs ou security group que permita acesso administrativo de qualquer rede corporativa.</p>\n  <p>O pipeline não substitui a revisão de arquitetura. Ele transforma decisões aprovadas em guardrails repetíveis. Mudanças de rotas e anúncios BGP devem ter revisão, plano de rollback e janela operacional quando afetarem produção.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Conectividade híbrida é um controle e também uma superfície de risco. Ela pode permitir acesso privado seguro a sistemas críticos, mas também pode criar caminho amplo para movimento lateral se redes inteiras forem anunciadas sem segmentação. O risco não está apenas no túnel; está na política de rota e na autorização que vem depois.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>CIDR sobreposto</td><td>Cloud e datacenter usam o mesmo bloco</td><td>Rotas ambíguas e falha de integração</td><td>IPAM, revisão de CIDR e plano de renumeração</td></tr>\n      <tr><td>Anúncio amplo</td><td><code>10.0.0.0/8</code> propagado sem necessidade</td><td>Exposição lateral e troubleshooting complexo</td><td>Filtros de prefixo e menor privilégio por rota</td></tr>\n      <tr><td>Rota assimétrica</td><td>Ida pela VPN e volta por outro caminho</td><td>Firewall stateful bloqueia ou logs ficam incompletos</td><td>Desenho de preferência, métricas e inspeção consistente</td></tr>\n      <tr><td>VPN sem observabilidade</td><td>Túnel cai e ninguém recebe alerta</td><td>Indisponibilidade silenciosa</td><td>Métricas, alarmes, logs e teste periódico</td></tr>\n      <tr><td>Cloud como extensão plana</td><td>Todos os segmentos on-premises acessam todos os spokes</td><td>Movimento lateral ampliado</td><td>Segmentação, firewall, IAM, Zero Trust e matriz de fluxos</td></tr>\n    </tbody>\n  </table>\n</section>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1040 600\" role=\"img\" aria-labelledby=\"hybrid-title hybrid-desc\">\n    <title id=\"hybrid-title\">Conectividade híbrida com VPN, link dedicado e BGP</title>\n    <desc id=\"hybrid-desc\">Datacenter se conecta a um hub cloud por VPN IPsec e link dedicado. BGP troca rotas, o firewall inspeciona tráfego e spokes privados hospedam aplicações.</desc>\n    <defs>\n      <marker id=\"arrow-hybrid-1408\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"120\" width=\"230\" height=\"310\" rx=\"18\" class=\"svg-boundary\" />\n    <text x=\"150\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Datacenter / filial</text>\n    <rect x=\"70\" y=\"160\" width=\"155\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"148\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Roteador BGP</text>\n    <rect x=\"70\" y=\"285\" width=\"155\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"148\" y=\"327\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <rect x=\"335\" y=\"80\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"430\" y=\"116\" text-anchor=\"middle\" class=\"svg-label\">VPN IPsec</text>\n    <text x=\"430\" y=\"142\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">túneis redundantes</text>\n    <rect x=\"335\" y=\"250\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"430\" y=\"286\" text-anchor=\"middle\" class=\"svg-label\">Link dedicado</text>\n    <text x=\"430\" y=\"312\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DX / ER / Interconnect</text>\n    <rect x=\"605\" y=\"95\" width=\"250\" height=\"400\" rx=\"18\" class=\"svg-boundary\" />\n    <text x=\"730\" y=\"78\" text-anchor=\"middle\" class=\"svg-label\">Hub cloud</text>\n    <rect x=\"640\" y=\"125\" width=\"175\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"728\" y=\"166\" text-anchor=\"middle\" class=\"svg-label\">Gateway / Cloud Router</text>\n    <rect x=\"640\" y=\"245\" width=\"175\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"728\" y=\"286\" text-anchor=\"middle\" class=\"svg-label\">Firewall / NVA</text>\n    <rect x=\"640\" y=\"365\" width=\"175\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"728\" y=\"406\" text-anchor=\"middle\" class=\"svg-label\">Flow logs / SIEM</text>\n    <rect x=\"900\" y=\"145\" width=\"105\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"952\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Spoke</text>\n    <text x=\"952\" y=\"202\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">App</text>\n    <rect x=\"900\" y=\"280\" width=\"105\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"952\" y=\"313\" text-anchor=\"middle\" class=\"svg-label\">Spoke</text>\n    <text x=\"952\" y=\"337\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dados</text>\n    <line x1=\"225\" y1=\"195\" x2=\"335\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-hybrid-1408)\" />\n    <line x1=\"525\" y1=\"125\" x2=\"640\" y2=\"160\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-hybrid-1408)\" />\n    <line x1=\"225\" y1=\"320\" x2=\"335\" y2=\"295\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-hybrid-1408)\" />\n    <line x1=\"525\" y1=\"295\" x2=\"640\" y2=\"160\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-hybrid-1408)\" />\n    <line x1=\"728\" y1=\"195\" x2=\"728\" y2=\"245\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-hybrid-1408)\" />\n    <line x1=\"815\" y1=\"280\" x2=\"900\" y2=\"182\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-hybrid-1408)\" />\n    <line x1=\"815\" y1=\"300\" x2=\"900\" y2=\"318\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-hybrid-1408)\" />\n    <line x1=\"728\" y1=\"315\" x2=\"728\" y2=\"365\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-hybrid-1408)\" />\n    <text x=\"520\" y=\"530\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BGP anuncia prefixos; firewalls autorizam fluxos; logs provam o caminho; DNS privado ajuda workloads a encontrar destinos corretos.</text>\n  </svg>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios treinam escolha de conectividade, análise de prefixos, troubleshooting de rota assimétrica, filtros de BGP e matriz de fluxos.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio simula uma empresa que precisa integrar datacenter, cloud e filiais sem criar uma rede plana, mantendo disponibilidade, auditoria e custo previsível.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como pensar em caminhos, prefixos, redundância, inspeção e logs antes de escolher serviços específicos do provedor.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n\n  <ul>\n    <li><strong>Ideia central:</strong> conectividade híbrida é roteamento privado governado entre domínios diferentes.</li>\n    <li><strong>O que lembrar:</strong> VPN é transporte criptografado; link dedicado é conectividade privada; BGP troca rotas; firewall autoriza fluxos.</li>\n    <li><strong>Erro comum:</strong> anunciar prefixos amplos e tratar a cloud como extensão plana do datacenter.</li>\n    <li><strong>Uso real:</strong> arquiteturas maduras combinam redundância, filtros de rota, inspeção, DNS privado, logs, alertas e validação periódica.</li>\n  </ul>\n\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, vamos estudar <strong>Peering, Transit Gateway, Virtual WAN e Hub-Spoke</strong>. Depois de conectar datacenter e cloud, precisamos entender como múltiplas VPCs, VNets, regiões e contas se interligam sem virar uma malha caótica de conexões ponto a ponto.</p>\n\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4",
      "Camada 7 para DNS e aplicações"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IPsec",
      "IKEv2",
      "ESP",
      "BGP",
      "TCP/179",
      "ICMP",
      "DNS",
      "TLS"
    ],
    "dependsOn": [
      "IPv4",
      "subnetting",
      "roteamento",
      "BGP",
      "VPN",
      "firewall",
      "DNS privado",
      "logs"
    ],
    "enables": [
      "cloud híbrida",
      "acesso privado",
      "integração com legado",
      "DR",
      "trânsito cloud",
      "arquitetura hub-spoke"
    ]
  },
  "protocolFields": [
    {
      "field": "Prefixo BGP",
      "size": "variável",
      "purpose": "Representar redes anunciadas entre datacenter e cloud.",
      "securityObservation": "Prefixos amplos demais aumentam exposição lateral."
    },
    {
      "field": "ASN",
      "size": "16 ou 32 bits",
      "purpose": "Identificar domínio de roteamento BGP.",
      "securityObservation": "Planejamento errado de ASN pode dificultar integração com múltiplos provedores."
    },
    {
      "field": "IKE/IPsec Security Association",
      "size": "variável",
      "purpose": "Manter parâmetros de criptografia e sessão de túnel.",
      "securityObservation": "Algoritmos fracos ou chaves mal geridas reduzem segurança do túnel."
    },
    {
      "field": "Next hop",
      "size": "endereço IP",
      "purpose": "Definir para onde o roteador envia tráfego para um prefixo.",
      "securityObservation": "Next hop errado causa blackhole, assimetria ou bypass de inspeção."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Servidor on-premises",
      "action": "Envia tráfego para IP privado cloud",
      "detail": "Consulta rota local para prefixo cloud.",
      "possibleFailure": "Sem rota para o prefixo cloud."
    },
    {
      "step": 2,
      "actor": "Roteador/firewall corporativo",
      "action": "Escolhe VPN ou link dedicado",
      "detail": "Usa rota estática, BGP e política de preferência.",
      "possibleFailure": "Prefixo não recebido, rota menos específica ou preferência errada."
    },
    {
      "step": 3,
      "actor": "Gateway cloud",
      "action": "Recebe tráfego e encaminha para route table",
      "detail": "Propagação de rota ou associação de subnet precisa estar correta.",
      "possibleFailure": "Route table do spoke não aponta retorno para on-premises."
    },
    {
      "step": 4,
      "actor": "Controles cloud",
      "action": "Aplicam SG/NSG/firewall",
      "detail": "Rota permite caminho, mas política decide autorização.",
      "possibleFailure": "Firewall ou security group bloqueia o fluxo."
    },
    {
      "step": 5,
      "actor": "Workload cloud",
      "action": "Responde ao fluxo",
      "detail": "Resposta precisa seguir caminho compatível com inspeção stateful.",
      "possibleFailure": "Rota assimétrica ou NAT inesperado."
    }
  ],
  "trafficCapture": {
    "tool": "Logs de VPN/BGP, flow logs, firewall logs, tcpdump controlado em host autorizado",
    "filter": "host <ip-origem> and host <ip-destino> ou tcp port 179 para BGP em laboratório autorizado",
    "whatToObserve": [
      "Prefixo anunciado",
      "next hop",
      "SYN sem SYN-ACK",
      "ICMP unreachable",
      "drops no firewall",
      "túnel ativo/inativo",
      "BGP established/idle"
    ],
    "interpretation": "O objetivo é provar em qual etapa o caminho quebra: túnel, BGP, rota, política, DNS ou aplicação."
  },
  "deepDive": {
    "mentalModel": "Conectividade híbrida é uma composição de transporte, roteamento, política e observabilidade. Transporte sem rota não funciona; rota sem política é risco; política sem logs não é operável.",
    "keyTerms": [
      "VPN site-to-site",
      "IPsec",
      "Direct Connect",
      "ExpressRoute",
      "Cloud Interconnect",
      "BGP",
      "ASN",
      "prefixo",
      "rota propagada",
      "rota estática",
      "route filter",
      "hub-spoke"
    ],
    "limitations": [
      "VPN pela internet pode ter latência e jitter variáveis.",
      "Link dedicado não é automaticamente criptografado em todos os cenários.",
      "BGP não decide autorização, apenas roteamento.",
      "Conectividade híbrida não resolve CIDR sobreposto sem NAT, renumeração ou desenho especial."
    ],
    "whenToUse": [
      "Integração com sistemas legados privados.",
      "Migração gradual para cloud.",
      "Acesso privado a serviços críticos.",
      "DR híbrido.",
      "Ambientes regulados que exigem caminho privado e auditável."
    ],
    "whenNotToUse": [
      "Quando SaaS ou API pública com Zero Trust atende melhor.",
      "Quando o custo e a operação do link dedicado não se justificam.",
      "Quando CIDRs são sobrepostos e não há plano de remediação.",
      "Quando a conexão seria usada para liberar tudo sem segmentação."
    ],
    "operationalImpact": [
      "Exige monitoramento contínuo de túnel, BGP, rotas, latência, perda e drops.",
      "Mudanças de prefixo precisam de governança.",
      "Troubleshooting envolve times de rede, cloud, segurança, operadora e aplicação.",
      "Roteamento híbrido precisa de documentação e testes de failover."
    ],
    "financialImpact": [
      "VPN, gateways, links dedicados, portas, parceiros, tráfego, logs e appliances podem gerar custos recorrentes.",
      "Egress e tráfego inter-regional podem custar mais que o esperado.",
      "Links dedicados têm custo fixo mesmo quando pouco usados.",
      "Redundância aumenta custo, mas reduz risco de indisponibilidade."
    ],
    "securityImpact": [
      "Prefixos amplos ampliam superfície de movimento lateral.",
      "Sem logs, incidentes híbridos ficam difíceis de investigar.",
      "Rotas assimétricas podem quebrar inspeção stateful.",
      "BGP sem filtros pode propagar rotas indevidas."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Usar VPN como substituto de arquitetura de segurança.",
      "whyItHappens": "O túnel dá sensação de ambiente privado e confiável.",
      "consequence": "A cloud vira extensão plana do datacenter.",
      "correction": "Aplicar segmentação, matriz de fluxos, filtros de rota, firewall e logs."
    },
    {
      "mistake": "Anunciar CIDRs grandes demais.",
      "whyItHappens": "Parece mais simples anunciar um bloco amplo do que listar prefixos necessários.",
      "consequence": "Aumenta exposição e dificulta investigação.",
      "correction": "Usar anúncios mínimos, route filters e documentação de owner por prefixo."
    },
    {
      "mistake": "Não testar failover.",
      "whyItHappens": "A redundância é configurada, mas nunca validada.",
      "consequence": "No incidente real, rotas não convergem como esperado.",
      "correction": "Executar testes controlados, medir tempo de convergência e registrar evidências."
    },
    {
      "mistake": "Ignorar DNS híbrido.",
      "whyItHappens": "O time foca apenas em túnel e BGP.",
      "consequence": "Aplicações resolvem nomes errados ou usam endpoints públicos.",
      "correction": "Documentar resolvers, encaminhamento condicional e private DNS."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "VPN aparece conectada, mas aplicação não responde.",
      "BGP em idle ou active.",
      "BGP established, mas prefixo não aparece na route table.",
      "Tráfego funciona em um sentido e falha no retorno.",
      "Latência alta ou perda intermitente.",
      "Aplicação usa IP público em vez de caminho privado."
    ],
    "diagnosticQuestions": [
      "O túnel está ativo nos dois lados?",
      "O BGP está established?",
      "Quais prefixos foram anunciados e aceitos?",
      "A subnet cloud tem rota de retorno?",
      "Firewall/security group/NSG permite o fluxo?",
      "Existe NAT ou assimetria?",
      "O DNS resolve para o IP esperado?"
    ],
    "commands": [
      {
        "platform": "Linux",
        "command": "ip route get <destino>\ntraceroute <destino>\nmtr <destino>\ntcpdump -ni any host <origem> and host <destino>",
        "purpose": "Ver rota local, caminho provável, perda e tráfego observado em host autorizado.",
        "expectedObservation": "Rota aponta para o gateway correto e pacotes de ida e volta aparecem.",
        "interpretation": "Se há SYN sem resposta, investigar retorno, firewall ou destino."
      },
      {
        "platform": "Windows",
        "command": "route print\ntracert <destino>\nTest-NetConnection <destino> -Port 443\nResolve-DnsName <fqdn>",
        "purpose": "Validar rota, caminho, porta e resolução DNS.",
        "expectedObservation": "Destino resolve para IP esperado e porta autorizada responde.",
        "interpretation": "Falha de DNS, rota e porta indicam domínios diferentes de troubleshooting."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip bgp summary\nshow ip route <prefixo>\nshow crypto ikev2 sa\nshow crypto ipsec sa",
        "purpose": "Validar BGP, rota, IKE e IPsec em roteador/firewall autorizado.",
        "expectedObservation": "BGP established, rota instalada e contadores IPsec aumentando.",
        "interpretation": "Se BGP está estabelecido mas sem rota, verificar filtros e prefixos."
      },
      {
        "platform": "Cloud",
        "command": "Verificar VPN tunnel status, BGP peer status, effective routes, flow logs e firewall logs no console/API do provedor.",
        "purpose": "Confirmar estado gerenciado e caminho dentro da cloud.",
        "expectedObservation": "Túnel ativo, BGP established, rotas propagadas e fluxo permitido.",
        "interpretation": "Se cloud mostra drop, a falha pode estar na política, não no túnel."
      }
    ],
    "decisionTree": [
      {
        "if": "Túnel VPN down",
        "then": "Validar IP público, IKE/IPsec, chaves, algoritmos, ACL de criptografia, NAT-T e conectividade internet."
      },
      {
        "if": "Túnel up e BGP down",
        "then": "Validar ASN, peer IP, TCP/179, senha MD5 quando aplicável e filtros."
      },
      {
        "if": "BGP up e sem rota",
        "then": "Validar anúncios, route filters, propagação para route table e prefix limits."
      },
      {
        "if": "Rota existe e fluxo falha",
        "then": "Validar firewall, SG/NSG, NACL, rota de retorno, DNS e serviço."
      },
      {
        "if": "Funciona de forma intermitente",
        "then": "Validar failover, assimetria, MTU, perda, latência e preferência entre links."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Filtrar prefixos BGP anunciados e recebidos.",
      "Documentar owner, criticidade e justificativa de cada prefixo.",
      "Usar matriz de fluxos para autorizar apenas tráfego necessário.",
      "Monitorar túnel, BGP, flow logs, firewall logs e alterações de rota.",
      "Testar failover periodicamente.",
      "Separar ambientes e spokes por criticidade."
    ],
    "badPractices": [
      "Anunciar todos os prefixos corporativos para todas as VPCs/VNets.",
      "Usar VPN como rede plana sem firewall interno.",
      "Não coletar logs de conexão híbrida.",
      "Não documentar rotas efetivas.",
      "Permitir acesso administrativo amplo a partir de toda rede corporativa."
    ],
    "commonErrors": [
      "Confundir rota com permissão.",
      "Achar que link dedicado sempre é criptografado fim a fim.",
      "Ignorar rota de retorno.",
      "Esquecer DNS híbrido.",
      "Não revisar CIDR sobreposto antes da migração."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por conectividade ampla",
        "description": "Quando datacenter e cloud são conectados com rotas amplas e poucas políticas, um comprometimento pode atravessar domínios.",
        "defensiveExplanation": "O risco nasce de confiança implícita e falta de segmentação.",
        "mitigation": "Menor privilégio por rota e fluxo, firewall, microsegmentação, IAM e logs."
      },
      {
        "name": "Propagação indevida de rotas",
        "description": "Prefixos errados podem ser anunciados para ambientes que não deveriam alcançá-los.",
        "defensiveExplanation": "BGP automatiza conectividade; sem filtros, automatiza erro também.",
        "mitigation": "Prefix lists, route maps, filtros, revisão e alertas de mudança."
      },
      {
        "name": "Falha de inspeção por assimetria",
        "description": "Tráfego de ida e volta percorre dispositivos diferentes, quebrando firewall stateful.",
        "defensiveExplanation": "O firewall não vê a sessão completa e pode negar retorno ou perder visibilidade.",
        "mitigation": "Desenho de simetria, roteamento consistente e logs em pontos corretos."
      }
    ],
    "monitoring": [
      "Estado de túneis VPN",
      "Estado de BGP peers",
      "Mudança de prefixos anunciados",
      "Rotas efetivas",
      "Drops em firewall",
      "Flow logs entre on-premises e cloud",
      "Latência, perda e jitter",
      "Eventos de alteração em gateways e route tables"
    ],
    "hardening": [
      "Usar algoritmos fortes de IPsec",
      "Restringir gestão dos gateways",
      "MFA e aprovação para mudanças de rota",
      "Logs obrigatórios",
      "Tags e owners",
      "Separação entre produção e não produção",
      "Rotas mínimas necessárias"
    ],
    "detectionIdeas": [
      "Alerta quando prefixo novo é anunciado",
      "Alerta quando BGP cai",
      "Alerta quando tráfego lateral aumenta entre datacenter e cloud",
      "Alerta de tentativa administrativa fora da matriz",
      "Detecção de egress inesperado por link híbrido"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que BGP não deve ser tratado como controle de segurança?",
      "hints": [
        "Pense na diferença entre alcance e autorização.",
        "Pense no papel do firewall e da matriz de fluxos."
      ],
      "expectedIdeas": [
        "BGP anuncia caminhos",
        "firewall autoriza",
        "rotas amplas aumentam risco",
        "logs e políticas continuam necessários"
      ],
      "explanation": "BGP decide alcançabilidade. Segurança exige controles adicionais: filtros, firewall, IAM, logs e segmentação."
    },
    {
      "type": "diagnóstico",
      "question": "Uma aplicação cloud não acessa um serviço on-premises. O túnel VPN está up. O que você verificaria?",
      "hints": [
        "Não pare no estado do túnel.",
        "Separe BGP, rota, firewall, DNS e aplicação."
      ],
      "expectedIdeas": [
        "BGP established",
        "prefixo recebido",
        "route table",
        "security group",
        "firewall on-prem",
        "rota de retorno",
        "DNS"
      ],
      "explanation": "VPN up só prova transporte. O caminho completo depende de várias camadas."
    },
    {
      "type": "cenário real",
      "question": "Uma diretoria quer link dedicado porque acha que isso elimina todos os riscos. Como você explicaria a limitação?",
      "hints": [
        "Pense em criptografia, autorização, movimento lateral e logs.",
        "Pense em custo fixo e operação."
      ],
      "expectedIdeas": [
        "link dedicado melhora previsibilidade",
        "não substitui firewall",
        "não elimina IAM",
        "pode não criptografar por padrão",
        "precisa BGP e observabilidade"
      ],
      "explanation": "Link dedicado melhora o transporte, mas segurança e governança dependem do desenho completo."
    }
  ],
  "quiz": [
    {
      "id": "q14.8.1",
      "type": "conceito",
      "q": "Qual afirmação descreve melhor uma VPN site-to-site em cloud?",
      "opts": [
        "Um túnel criptografado entre rede corporativa e rede cloud, normalmente usando IPsec.",
        "Um DNS privado para resolver nomes internos.",
        "Um firewall que substitui BGP.",
        "Um tipo de subnet pública."
      ],
      "a": 0,
      "exp": "VPN site-to-site conecta redes por túnel, geralmente IPsec. Ela não substitui DNS, firewall ou BGP.",
      "difficulty": "iniciante",
      "topic": "vpn"
    },
    {
      "id": "q14.8.2",
      "type": "comparação",
      "q": "Qual diferença prática entre VPN e link dedicado é mais correta?",
      "opts": [
        "VPN normalmente usa internet como transporte criptografado; link dedicado oferece conexão privada/provisionada com maior previsibilidade.",
        "VPN sempre é mais rápida que link dedicado.",
        "Link dedicado sempre dispensa roteamento.",
        "VPN elimina necessidade de firewall."
      ],
      "a": 0,
      "exp": "Links dedicados costumam oferecer caminho privado/provisionado, mas ainda exigem roteamento e controles.",
      "difficulty": "intermediário",
      "topic": "direct connect"
    },
    {
      "id": "q14.8.3",
      "type": "diagnóstico",
      "q": "BGP está established, mas a subnet cloud não alcança o datacenter. Qual hipótese faz sentido?",
      "opts": [
        "O prefixo on-premises não foi propagado para a route table correta ou a rota de retorno está ausente.",
        "BGP established garante automaticamente conectividade fim a fim.",
        "DNS sempre é a causa.",
        "TLS está necessariamente expirado."
      ],
      "a": 0,
      "exp": "BGP estabelecido não garante que rotas estejam aceitas, propagadas, instaladas e autorizadas por firewall.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q14.8.4",
      "type": "segurança",
      "q": "Qual prática reduz risco de movimento lateral em conexão híbrida?",
      "opts": [
        "Anunciar apenas prefixos necessários e aplicar firewall/matriz de fluxos.",
        "Anunciar 10.0.0.0/8 para simplificar.",
        "Permitir qualquer porta entre datacenter e cloud.",
        "Desativar logs para reduzir custo."
      ],
      "a": 0,
      "exp": "Menor privilégio em rotas e fluxos reduz exposição e melhora investigação.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q14.8.5",
      "type": "custo",
      "q": "Por que link dedicado pode não ser a melhor escolha para todo cenário?",
      "opts": [
        "Pode ter custo fixo, prazo de provisionamento e operação especializada.",
        "Porque não permite BGP.",
        "Porque não suporta tráfego privado.",
        "Porque sempre é menos seguro que VPN."
      ],
      "a": 0,
      "exp": "Link dedicado pode ser excelente, mas precisa justificar custo, prazo, redundância e operação.",
      "difficulty": "intermediário",
      "topic": "custos"
    },
    {
      "id": "q14.8.6",
      "type": "arquitetura",
      "q": "Qual combinação é mais adequada para ambiente crítico híbrido?",
      "opts": [
        "Redundância, BGP filtrado, matriz de fluxos, inspeção, logs e teste de failover.",
        "Um único túnel VPN e rota ampla para tudo.",
        "Acesso público aos serviços para evitar roteamento.",
        "DNS público para todos os serviços internos."
      ],
      "a": 0,
      "exp": "Arquitetura crítica precisa de redundância, controle de rotas, segurança e evidência operacional.",
      "difficulty": "avançado",
      "topic": "arquitetura"
    }
  ],
  "flashcards": [
    {
      "id": "fc14.8.1",
      "front": "O que é VPN site-to-site?",
      "back": "Conexão entre redes, normalmente criptografada com IPsec, usada para integrar ambientes privados por meio de túneis.",
      "tags": [
        "vpn",
        "cloud"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.8.2",
      "front": "O que o BGP faz em cloud híbrida?",
      "back": "Troca rotas dinamicamente entre rede corporativa e cloud, permitindo anúncio e recebimento de prefixos.",
      "tags": [
        "bgp",
        "roteamento"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.8.3",
      "front": "Direct Connect, ExpressRoute e Interconnect substituem firewall?",
      "back": "Não. Eles fornecem conectividade privada/provisionada, mas autorização continua dependendo de firewall, SG/NSG, IAM e políticas.",
      "tags": [
        "segurança",
        "link dedicado"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.8.4",
      "front": "Por que CIDR sobreposto é grave em conectividade híbrida?",
      "back": "Porque o roteamento não consegue distinguir corretamente redes com o mesmo endereço, causando falhas e necessidade de NAT ou renumeração.",
      "tags": [
        "cidr",
        "ipam"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.8.5",
      "front": "O que é rota assimétrica?",
      "back": "É quando tráfego de ida e volta segue caminhos diferentes, podendo quebrar firewall stateful e dificultar investigação.",
      "tags": [
        "troubleshooting",
        "rota"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.8.6",
      "front": "Qual evidência mínima coletar em falha híbrida?",
      "back": "Status do túnel, status BGP, prefixos recebidos, route table, firewall/SG/NSG logs, flow logs e resolução DNS.",
      "tags": [
        "evidência",
        "soc"
      ],
      "difficulty": "avançado"
    }
  ],
  "exercises": [
    {
      "id": "ex14.8.1",
      "type": "arquitetura",
      "prompt": "Uma empresa tem datacenter 10.0.0.0/8 e quer conectar uma VPC 10.20.0.0/16. Qual problema aparece?",
      "expectedAnswer": "Há sobreposição, porque 10.20.0.0/16 está contido em 10.0.0.0/8. O roteamento direto ficará ambíguo.",
      "explanation": "Antes de criar VPN ou BGP, é preciso resolver IPAM, renumeração ou NAT controlado."
    },
    {
      "id": "ex14.8.2",
      "type": "segurança",
      "prompt": "Explique por que anunciar apenas prefixos específicos é mais seguro que anunciar um bloco amplo.",
      "expectedAnswer": "Prefixos específicos reduzem alcance lateral, tornam políticas mais claras e facilitam troubleshooting e auditoria.",
      "explanation": "Roteamento também é superfície de exposição."
    },
    {
      "id": "ex14.8.3",
      "type": "diagnóstico",
      "prompt": "VPN up, BGP established, mas aplicação falha. Liste cinco hipóteses restantes.",
      "expectedAnswer": "Route table sem propagação, rota de retorno ausente, firewall/SG/NSG bloqueando, DNS resolvendo errado, serviço indisponível, MTU/assimetria.",
      "explanation": "Transporte e BGP são apenas parte do caminho."
    },
    {
      "id": "ex14.8.4",
      "type": "custos",
      "prompt": "Liste três custos recorrentes possíveis em conectividade híbrida.",
      "expectedAnswer": "Gateway VPN, porta/link dedicado, transferência de dados, appliances/firewalls, logs/monitoramento e suporte/operadora.",
      "explanation": "Mesmo sem VM nova, rede cloud gera custos operacionais e financeiros."
    }
  ],
  "challenge": {
    "title": "Desenhar conectividade híbrida para ambiente regulado",
    "scenario": "Uma empresa regulada precisa conectar datacenter, duas filiais e uma cloud com produção e dados. A aplicação cloud precisa acessar apenas dois serviços legados. Administradores devem acessar cloud por caminho controlado. O SOC precisa investigar qualquer fluxo híbrido.",
    "tasks": [
      "Escolher VPN, link dedicado ou combinação.",
      "Definir CIDRs e validar sobreposição.",
      "Listar prefixos BGP anunciados em cada direção.",
      "Criar matriz de fluxos autorizados.",
      "Definir pontos de firewall e logs.",
      "Planejar failover e teste de DR."
    ],
    "constraints": [
      "Não permitir rede plana entre datacenter e cloud.",
      "Não usar rota default para on-premises sem justificativa.",
      "Todos os fluxos devem ter owner.",
      "Deve haver plano de rollback para mudança de rota.",
      "Deve haver coleta de evidência para SOC."
    ],
    "expectedDeliverables": [
      "Diagrama de topologia",
      "Tabela de CIDRs",
      "Lista de anúncios BGP",
      "Matriz de fluxos",
      "Plano de logs",
      "Plano de failover",
      "Riscos residuais"
    ],
    "gradingRubric": [
      {
        "criterion": "Roteamento",
        "points": 25,
        "description": "Prefixos mínimos, sem sobreposição e com retorno claro."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Firewall, matriz de fluxos, menor privilégio e controle administrativo."
      },
      {
        "criterion": "Disponibilidade",
        "points": 20,
        "description": "Redundância e failover testável."
      },
      {
        "criterion": "Observabilidade",
        "points": 20,
        "description": "Logs, métricas e evidências suficientes para SOC."
      },
      {
        "criterion": "Custo e operação",
        "points": 10,
        "description": "Decisões justificadas por criticidade e custo."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Começamos pelo inventário de redes e fluxos, não pelo serviço cloud. Depois escolhemos transporte, definimos rotas, aplicamos autorização e fechamos com observabilidade e failover.",
    "steps": [
      "Validar CIDRs e sobreposição.",
      "Definir quais fluxos realmente precisam atravessar a conexão.",
      "Escolher link dedicado primário e VPN de backup se a criticidade justificar.",
      "Usar BGP com filtros de prefixo.",
      "Centralizar inspeção no hub cloud e no firewall corporativo.",
      "Coletar logs de VPN, BGP, firewall, DNS e flow logs.",
      "Testar failover em janela controlada."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Anunciar 10.0.0.0/8 para simplificar.",
        "whyItIsWrong": "Aumenta exposição, pode causar conflito e dificulta troubleshooting."
      },
      {
        "answer": "Usar link dedicado sem firewall porque é privado.",
        "whyItIsWrong": "Privacidade de transporte não equivale a autorização por fluxo."
      },
      {
        "answer": "Validar apenas ping.",
        "whyItIsWrong": "Ping não prova aplicação, TLS, DNS, porta, firewall nem rota de retorno correta."
      }
    ],
    "finalAnswer": "Uma solução madura usa CIDRs planejados, anúncios BGP mínimos, conexão redundante, inspeção centralizada, matriz de fluxos, DNS híbrido, logs integrados ao SIEM, alertas de túnel/BGP e testes periódicos de failover."
  },
  "glossary": [
    {
      "term": "VPN site-to-site",
      "shortDefinition": "Túnel entre redes, geralmente criptografado por IPsec.",
      "longDefinition": "Conexão usada para integrar redes privadas de locais diferentes, como datacenter e VPC/VNet.",
      "example": "Firewall corporativo conectado a VPN Gateway cloud.",
      "relatedTerms": [
        "IPsec",
        "IKE",
        "túnel"
      ],
      "relatedLessons": [
        "10.x",
        "14.8"
      ]
    },
    {
      "term": "Direct Connect",
      "shortDefinition": "Serviço AWS de conectividade dedicada.",
      "longDefinition": "Permite conectar rede corporativa a AWS por localidade Direct Connect e interfaces virtuais.",
      "example": "Private VIF para acessar VPC por IP privado.",
      "relatedTerms": [
        "VIF",
        "BGP",
        "link dedicado"
      ],
      "relatedLessons": [
        "14.8"
      ]
    },
    {
      "term": "ExpressRoute",
      "shortDefinition": "Serviço Azure de conectividade privada dedicada.",
      "longDefinition": "Permite conectividade privada entre rede on-premises e serviços Microsoft/Azure por circuito ExpressRoute.",
      "example": "Private peering para VNets.",
      "relatedTerms": [
        "private peering",
        "BGP",
        "circuito"
      ],
      "relatedLessons": [
        "14.8"
      ]
    },
    {
      "term": "Cloud Interconnect",
      "shortDefinition": "Serviço Google Cloud para conectividade dedicada ou por parceiro.",
      "longDefinition": "Conecta rede local ao Google Cloud usando VLAN attachments e Cloud Router/BGP.",
      "example": "Partner Interconnect com Cloud Router anunciando rotas.",
      "relatedTerms": [
        "Cloud Router",
        "BGP",
        "VLAN attachment"
      ],
      "relatedLessons": [
        "14.8"
      ]
    },
    {
      "term": "BGP",
      "shortDefinition": "Protocolo de roteamento usado para troca dinâmica de prefixos.",
      "longDefinition": "Em cloud híbrida, BGP anuncia e recebe rotas entre rede corporativa e gateways cloud.",
      "example": "Datacenter anuncia 10.10.50.0/24 para a cloud.",
      "relatedTerms": [
        "ASN",
        "prefixo",
        "route filter"
      ],
      "relatedLessons": [
        "11.x",
        "14.8"
      ]
    },
    {
      "term": "Rota assimétrica",
      "shortDefinition": "Tráfego de ida e volta usa caminhos diferentes.",
      "longDefinition": "Pode quebrar firewalls stateful e dificultar observabilidade quando os dois sentidos não passam pelo mesmo ponto de inspeção.",
      "example": "Ida pelo link dedicado e volta pela VPN.",
      "relatedTerms": [
        "stateful firewall",
        "troubleshooting",
        "BGP"
      ],
      "relatedLessons": [
        "14.4",
        "14.8"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "How AWS Site-to-Site VPN works",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpn/latest/s2svpn/how_it_works.html",
      "note": "Base para túneis VPN redundantes e gateway AWS."
    },
    {
      "type": "official-doc",
      "title": "Static and dynamic routing in AWS Site-to-Site VPN",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpn/latest/s2svpn/vpn-static-dynamic.html",
      "note": "Base para uso de BGP em VPN site-to-site."
    },
    {
      "type": "official-doc",
      "title": "Direct Connect virtual interfaces",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html",
      "note": "Base para private, public e transit VIFs."
    },
    {
      "type": "official-doc",
      "title": "ExpressRoute routing requirements",
      "organization": "Microsoft Azure",
      "url": "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-routing",
      "note": "Base para roteamento e BGP em ExpressRoute."
    },
    {
      "type": "official-doc",
      "title": "Cloud Router overview",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/network-connectivity/docs/router/concepts/overview",
      "note": "Base para Cloud Router e BGP com Cloud VPN/Interconnect."
    },
    {
      "type": "internal-course",
      "title": "Roteamento, OSPF, BGP e Troubleshooting de Caminhos",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m11",
      "note": "Pré-requisito conceitual para BGP e caminhos."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m10",
      "lesson": "10.x",
      "reason": "VPN site-to-site depende de túneis, criptografia e acesso remoto."
    },
    {
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.x",
      "reason": "BGP e troubleshooting de caminhos são necessários para conectividade híbrida."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC",
      "lesson": "Terraform",
      "reason": "Conectividade híbrida deve ser versionada, revisada e validada como código."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM corporativo",
      "lesson": "Acesso condicional",
      "reason": "Conectividade privada não substitui identidade, autenticação e autorização."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Identidades de workload e serviços",
      "lesson": "Service principals, OIDC federation, managed identities e contas de serviço",
      "reason": "Serviços, pipelines e workloads acessam recursos usando identidade própria, não apenas endereço IP ou regra de firewall."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    }
  ],
  "pedagogicalMap": {
    "problem": "Conectar datacenter e cloud sem criar rede plana, custos invisíveis ou troubleshooting impossível.",
    "concept": "VPN, links dedicados e BGP formam o transporte e roteamento de cloud híbrida.",
    "internalMechanism": "Túneis/circuitos transportam tráfego; BGP troca prefixos; route tables escolhem caminhos; firewalls autorizam; logs provam.",
    "realUse": "Migração gradual, sistemas legados, DR, SOC centralizado e acesso privado a serviços críticos.",
    "commonMistake": "Confundir VPN up com conectividade fim a fim autorizada.",
    "securityImpact": "Rotas amplas e falta de segmentação ampliam movimento lateral entre datacenter e cloud.",
    "operationalImpact": "Exige monitoramento de túneis, BGP, rotas, latência, perda, firewall e DNS.",
    "summary": "Cloud híbrida segura é uma arquitetura de caminhos privados, prefixos mínimos, controles explícitos e evidência operacional."
  },
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "exerciseDone",
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "14.9"
    ]
  }
};
