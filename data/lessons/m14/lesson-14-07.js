export const lesson1407 = {
  "id": "14.7",
  "moduleId": "m14",
  "order": 7,
  "title": "DNS público, DNS privado, split-horizon e service discovery",
  "subtitle": "Como nomes direcionam usuários, workloads e serviços para caminhos públicos, privados, híbridos e dinâmicos em cloud.",
  "duration": "100-160 min",
  "estimatedStudyTimeMinutes": 160,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 300,
  "tags": [
    "cloud networking",
    "dns",
    "dns privado",
    "split-horizon",
    "service discovery",
    "route 53",
    "azure private dns",
    "cloud dns",
    "kubernetes",
    "segurança",
    "devsecops",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "DNS, DHCP, NAT e serviços essenciais são base para entender resolução em cloud."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.3",
      "reason": "DNS privado em cloud depende de VPC/VNet, CIDR e associação de redes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.6",
      "reason": "Publicação de serviços com load balancer depende de DNS público e privado."
    },
    {
      "type": "module",
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes",
      "lesson": "service discovery",
      "reason": "Service discovery em Kubernetes usa DNS interno para serviços e pods."
    }
  ],
  "objectives": [
    "Diferenciar DNS público, DNS privado, split-horizon e service discovery.",
    "Explicar como zonas privadas se associam a VPCs, VNets ou redes privadas.",
    "Desenhar resolução híbrida entre datacenter e cloud.",
    "Diagnosticar respostas DNS diferentes por origem, cache, TTL, zona e resolver.",
    "Relacionar DNS privado com private endpoints, egress control, custos e segurança.",
    "Definir guardrails DevSecOps para criação de registros e zonas via IaC."
  ],
  "learningOutcomes": [
    "Dado um FQDN, o aluno identifica se a resposta esperada deve ser pública, privada ou dependente da origem.",
    "Dado um incidente de acesso errado, o aluno coleta evidências de resolver, resposta, TTL, rota e logs.",
    "Dado um desenho híbrido, o aluno propõe encaminhamento condicional e query logging.",
    "Dado um serviço dinâmico, o aluno diferencia DNS estático de service discovery."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Uma aplicação foi publicada com load balancer, certificado TLS e subnets privadas. No teste interno, <code>api.empresa.local</code> resolve para um IP privado e funciona. No teste externo, <code>api.empresa.com</code> resolve para o load balancer público e também funciona. Mas, depois de uma migração para cloud, alguns workloads dentro da VPC continuam tentando acessar o endpoint público, pagando tráfego desnecessário, passando por NAT e WAF sem necessidade, enquanto outros resolvem para o IP privado correto. Em paralelo, o time de segurança encontra uma zona DNS privada com registros antigos apontando para um banco desativado e ninguém sabe qual resolver está respondendo cada consulta.</p>\n  <p>DNS em cloud é uma das áreas em que rede, aplicação, segurança, IAM, DevSecOps e custo se encontram. Nomes não são apenas conveniência humana. Em ambientes modernos, nomes decidem se um serviço será acessado por caminho público ou privado, se um workload usará private endpoint, se um microserviço encontrará outro dentro de um cluster, se uma aplicação acessará um banco gerenciado sem sair para a internet e se uma equipe conseguirá investigar um incidente com linha do tempo confiável.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> quando DNS público, DNS privado, split-horizon e service discovery não são desenhados juntos, a empresa cria caminhos invisíveis, custos inesperados, exposição pública acidental, troubleshooting confuso e falhas de segurança difíceis de explicar.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>DNS nasceu para resolver um problema básico da internet: pessoas e sistemas não deveriam depender de memorizar endereços IP. Antes do DNS, nomes eram mantidos em arquivos como <code>hosts</code>, o que funcionava em redes pequenas, mas não escalava para uma internet global. O DNS distribuiu essa responsabilidade em uma hierarquia de zonas, servidores autoritativos, resolvers recursivos e registros.</p>\n  <p>No datacenter tradicional, era comum existir DNS público para serviços expostos na internet e DNS interno para servidores corporativos, Active Directory, bancos, aplicações internas e appliances. Em cloud, essa separação ficou mais complexa: cada provedor oferece zonas privadas, resolvers gerenciados, integração com VPC/VNet, endpoints privados, nomes automáticos para serviços gerenciados, service discovery de containers e conectividade híbrida com datacenter.</p>\n  <p>A evolução foi de “nome aponta para IP” para “nome representa intenção de acesso”. O mesmo nome pode apontar para IP público fora da rede e para IP privado dentro da VPC. Um serviço pode mudar de backend sem mudar nome. Um pod Kubernetes pode ser descoberto por nome de serviço. Um banco gerenciado pode ter o mesmo FQDN público resolvendo para private endpoint dentro de uma VNet. Isso é poderoso, mas exige governança.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é controlar a resolução de nomes em ambientes com múltiplos domínios, redes, provedores, contas, VNets, VPCs, clusters, private endpoints, serviços gerenciados e datacenter híbrido.</p>\n  <ul>\n    <li><strong>Exposição:</strong> um serviço interno pode acabar resolvendo para endpoint público por falta de DNS privado.</li>\n    <li><strong>Custo:</strong> tráfego interno pode sair por NAT, WAF ou internet quando deveria permanecer privado.</li>\n    <li><strong>Segurança:</strong> nomes antigos, zonas órfãs e registros amplos podem facilitar acesso indevido ou confundir investigações.</li>\n    <li><strong>Troubleshooting:</strong> o mesmo FQDN pode retornar respostas diferentes dependendo de onde a consulta foi feita.</li>\n    <li><strong>Híbrido:</strong> datacenter e cloud precisam resolver nomes entre si sem abrir servidores DNS indevidamente.</li>\n    <li><strong>DevSecOps:</strong> pipelines criam serviços rapidamente; sem governança, DNS vira dívida técnica automatizada.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha comum:</strong> testar DNS apenas do notebook do administrador. A pergunta correta é: qual resposta DNS o workload real recebe a partir da subnet, VPC/VNet, cluster, conta e resolver onde ele executa?</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução do DNS em cloud pode ser vista como aumento de contexto. O DNS deixa de ser apenas global e passa a ter respostas condicionadas por rede, escopo e integração de serviço.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Modelo</th><th>Como funciona</th><th>Benefício</th><th>Risco principal</th></tr></thead>\n    <tbody>\n      <tr><td>Arquivo hosts</td><td>Nome local apontando para IP fixo</td><td>Simples para teste</td><td>Não escala e cria divergência invisível</td></tr>\n      <tr><td>DNS público</td><td>Zona autoritativa acessível pela internet</td><td>Publica serviços externos</td><td>Expor nomes, IPs ou serviços indevidos</td></tr>\n      <tr><td>DNS privado</td><td>Zona associada a VPC/VNet ou rede privada</td><td>Resolve nomes internos sem internet</td><td>Conflito, zona órfã e falta de governança</td></tr>\n      <tr><td>Split-horizon</td><td>Mesmo nome com respostas diferentes por origem</td><td>Mesmo FQDN para acesso interno e externo</td><td>Troubleshooting mais difícil</td></tr>\n      <tr><td>Service discovery</td><td>Registro dinâmico de serviços e endpoints</td><td>Suporta microserviços e autoscaling</td><td>Dependência crítica de controle, saúde e identidade</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>DNS público é o conjunto de zonas e registros resolvíveis a partir da internet. DNS privado é a resolução de nomes restrita a redes privadas, como VPCs, VNets, redes híbridas ou clusters. Split-horizon DNS é o desenho em que o mesmo nome pode retornar respostas diferentes dependendo de onde a consulta vem. Service discovery é o mecanismo pelo qual aplicações descobrem serviços sem depender de IPs fixos, geralmente usando DNS, API de controle ou registro dinâmico.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> em Cloud Networking, DNS é o plano de nomes que decide como usuários, workloads e serviços descobrem endpoints públicos, privados, híbridos e dinâmicos, preservando intenção de acesso, isolamento, segurança e observabilidade.</div>\n  <p>DNS não substitui firewall, IAM, TLS ou segmentação. Ele aponta o caminho inicial. A autorização real continua dependendo de política de rede, autenticação, criptografia, identidade e controle de acesso.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Um fluxo de resolução em cloud costuma passar por várias decisões.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Workload consulta um nome:</strong> por exemplo, <code>db.prod.empresa.internal</code>.</li>\n    <li><strong>Stub resolver encaminha:</strong> o sistema operacional envia a consulta ao resolver configurado por DHCP, imagem, VPC/VNet ou cluster.</li>\n    <li><strong>Resolver decide escopo:</strong> verifica cache, zonas privadas associadas, regras de encaminhamento e resolução pública.</li>\n    <li><strong>Zona autoritativa responde:</strong> a resposta pode vir de zona pública, zona privada, resolver on-premises, serviço gerenciado ou DNS do cluster.</li>\n    <li><strong>TTL controla cache:</strong> clientes e resolvers podem manter respostas por tempo definido, afetando failover e migração.</li>\n    <li><strong>Aplicação conecta:</strong> o IP retornado precisa ser alcançável por rotas, security groups, NSGs, firewall e políticas.</li>\n    <li><strong>Logs permitem investigar:</strong> query logs, flow logs, firewall logs e logs de aplicação ajudam a confirmar caminho real.</li>\n  </ol>\n  <p>O ponto crítico é que DNS resolve nomes, mas não garante conectividade. Se o nome resolve para IP privado, ainda é preciso rota. Se há rota, ainda é preciso regra. Se há regra, ainda é preciso autenticação e TLS confiável.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura DNS cloud madura costuma separar zonas públicas, zonas privadas, resolução híbrida, service discovery e logging.</p>\n  <ul>\n    <li><strong>Zona pública:</strong> nomes expostos, como <code>www.empresa.com</code> e <code>api.empresa.com</code>.</li>\n    <li><strong>Zona privada:</strong> nomes internos, como <code>db.prod.empresa.internal</code>, <code>vault.shared.internal</code> ou endpoints privados.</li>\n    <li><strong>Split-horizon:</strong> mesmo FQDN com resposta pública para usuários externos e resposta privada para workloads internos.</li>\n    <li><strong>Resolver híbrido:</strong> encaminha consultas entre datacenter e cloud por VPN, Direct Connect ou ExpressRoute.</li>\n    <li><strong>Service discovery:</strong> registra serviços dinâmicos em Kubernetes, ECS, Cloud Map, Service Directory ou mecanismos equivalentes.</li>\n    <li><strong>Observabilidade:</strong> query logs, métricas, alterações de zona, auditoria IAM e alertas de alteração suspeita.</li>\n  </ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma empresa com recepção pública e ramais internos. Para uma pessoa de fora, “Financeiro” pode significar ligar para o número público da recepção. Para alguém dentro do prédio, “Financeiro” pode ser o ramal interno. O nome é parecido, mas o caminho muda conforme a origem e a permissão.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> no DNS real, respostas ficam em cache, podem existir múltiplas zonas autoritativas, resolvers intermediários, TTL, delegação, encaminhamento condicional e integração com serviços automatizados.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, seu roteador pode resolver nomes locais como <code>impressora.local</code> ou permitir que dispositivos descubram serviços na LAN. Na internet, <code>site.com</code> resolve via DNS público. Se você cria uma entrada local apontando <code>meuapp.local</code> para um IP da sua rede, esse nome funciona dentro de casa, mas não fora.</p>\n  <p>Em cloud, o raciocínio é parecido, mas em escala corporativa: nomes públicos atendem usuários externos; nomes privados atendem workloads internos; e o mesmo nome pode ter respostas diferentes dependendo da rede de origem.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma empresa mantém <code>erp.empresa.com</code> para usuários externos via load balancer público e <code>erp.empresa.com</code> internamente apontando para um load balancer privado. O objetivo é permitir que usuários internos usem o mesmo nome, mas sigam por caminho privado, com menor latência, menor custo e menor exposição.</p>\n  <p>Ao mesmo tempo, bancos, mensageria, vault, APIs internas e endpoints administrativos ficam em zonas privadas. O datacenter resolve esses nomes via encaminhamento condicional para resolvers da cloud, e a cloud resolve nomes legados via resolvers on-premises. O SOC monitora alterações de registros críticos e consultas incomuns.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Na AWS, uma private hosted zone pode ser associada a VPCs para que registros privados respondam dentro dessas VPCs. Route 53 Resolver endpoints permitem cenários híbridos de encaminhamento entre VPC e datacenter. No Azure, Private DNS zones fornecem resolução privada para VNets e são fundamentais para Private Endpoint. No Google Cloud, Cloud DNS oferece zonas públicas e privadas associadas a redes VPC, além de recursos para encaminhamento e peering DNS.</p>\n  <p>O desenho correto evita que workloads acessem serviços gerenciados pelo endpoint público quando existe endpoint privado, reduz dependência de NAT e facilita aplicação de políticas de menor privilégio.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, DNS é criado por infraestrutura como código. Um pipeline pode criar zona privada, registro de aplicação, entrada de service discovery, associação com VPC/VNet e logs de consulta. Isso permite padronização, mas também automatiza erros se não houver revisão.</p>\n  <p>Boas práticas incluem policies que impedem wildcard público sem justificativa, exigem TTL apropriado, bloqueiam registros apontando para IPs fora das faixas aprovadas, obrigam owner/tag de registros e acionam revisão para alterações em domínios críticos. Em Kubernetes, service discovery por DNS permite que aplicações chamem <code>api.namespace.svc.cluster.local</code>, mas esse nome deve ser acompanhado de NetworkPolicies, autenticação e observabilidade.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>DNS aparece em praticamente todo incidente: comando e controle, exfiltração, malware, phishing, acesso a serviços internos, descoberta de ativos e troubleshooting de acessos. Em cloud, alterações de DNS podem redirecionar tráfego para endpoints errados, quebrar TLS, expor serviços ou criar bypass de private endpoints.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Zona privada órfã</td><td>Registros antigos sem owner</td><td>Conexão com serviço errado</td><td>Inventário, tags, revisão e expiração controlada</td></tr>\n      <tr><td>Split-horizon mal documentado</td><td>Respostas diferentes sem evidência</td><td>Troubleshooting confuso</td><td>Matriz de resolução por origem e logs de consulta</td></tr>\n      <tr><td>Bypass de endpoint privado</td><td>Workload resolve FQDN público</td><td>Custo, exposição e perda de controle</td><td>Private DNS, rotas, políticas e bloqueio de egress</td></tr>\n      <tr><td>Alteração maliciosa</td><td>Registro crítico alterado</td><td>Redirecionamento de tráfego</td><td>IAM mínimo, MFA, aprovação e alerta de auditoria</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"dns-cloud-title dns-cloud-desc\">\n    <title id=\"dns-cloud-title\">DNS público, DNS privado, split-horizon e service discovery</title>\n    <desc id=\"dns-cloud-desc\">Usuários externos usam DNS público para acessar load balancer público, enquanto workloads internos usam DNS privado para endpoints privados e service discovery.</desc>\n    <defs>\n      <marker id=\"arrow-dns-1407\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"70\" width=\"145\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"108\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Usuário externo</text>\n    <rect x=\"250\" y=\"55\" width=\"150\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"325\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">DNS público</text>\n    <text x=\"325\" y=\"118\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">api.empresa.com</text>\n    <rect x=\"470\" y=\"70\" width=\"145\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"542\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">LB público</text>\n    <rect x=\"675\" y=\"55\" width=\"230\" height=\"420\" rx=\"18\" class=\"svg-boundary\" />\n    <text x=\"790\" y=\"42\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VPC/VNet privada</text>\n    <rect x=\"705\" y=\"95\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"785\" y=\"137\" text-anchor=\"middle\" class=\"svg-label\">App privada</text>\n    <rect x=\"705\" y=\"215\" width=\"160\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"785\" y=\"250\" text-anchor=\"middle\" class=\"svg-label\">DNS privado</text>\n    <text x=\"785\" y=\"276\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">internal zone</text>\n    <rect x=\"705\" y=\"350\" width=\"160\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"785\" y=\"385\" text-anchor=\"middle\" class=\"svg-label\">Service discovery</text>\n    <text x=\"785\" y=\"411\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">K8s / Cloud Map</text>\n    <rect x=\"45\" y=\"360\" width=\"155\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"122\" y=\"402\" text-anchor=\"middle\" class=\"svg-label\">Datacenter</text>\n    <rect x=\"280\" y=\"335\" width=\"170\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"365\" y=\"374\" text-anchor=\"middle\" class=\"svg-label\">Resolver híbrido</text>\n    <text x=\"365\" y=\"400\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">forward rules</text>\n    <rect x=\"500\" y=\"355\" width=\"135\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"567\" y=\"397\" text-anchor=\"middle\" class=\"svg-label\">Query logs</text>\n    <line x1=\"180\" y1=\"105\" x2=\"250\" y2=\"100\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-dns-1407)\" />\n    <line x1=\"400\" y1=\"100\" x2=\"470\" y2=\"105\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-dns-1407)\" />\n    <line x1=\"615\" y1=\"105\" x2=\"705\" y2=\"130\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-dns-1407)\" />\n    <line x1=\"200\" y1=\"395\" x2=\"280\" y2=\"390\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-dns-1407)\" />\n    <line x1=\"450\" y1=\"375\" x2=\"705\" y2=\"255\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-dns-1407)\" />\n    <line x1=\"450\" y1=\"410\" x2=\"500\" y2=\"390\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-dns-1407)\" />\n    <line x1=\"785\" y1=\"295\" x2=\"785\" y2=\"350\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-dns-1407)\" />\n    <text x=\"500\" y=\"510\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNS decide o primeiro caminho; rotas, firewall, IAM, TLS e logs confirmam se o acesso é permitido e investigável.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório é conceitual e defensivo, sem custo cloud. Você irá desenhar uma arquitetura de DNS público, DNS privado, split-horizon e service discovery para uma aplicação corporativa em cloud híbrida.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam diagnóstico de resolução, escolha de zona, TTL, private endpoint, split-horizon e service discovery.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma migração em que a mesma aplicação precisa ser acessível publicamente por usuários externos, privadamente por workloads internos e por service discovery dentro de um cluster.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada explica como separar nomes públicos, privados e dinâmicos sem criar rotas inesperadas, custos desnecessários ou exposição indevida.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> DNS em cloud é plano de descoberta e intenção de acesso.</li>\n    <li><strong>O que lembrar:</strong> DNS público publica serviços externos; DNS privado orienta workloads internos; split-horizon muda resposta por origem.</li>\n    <li><strong>Erro comum:</strong> achar que nome privado garante segurança sem rota, firewall, IAM e TLS.</li>\n    <li><strong>Uso real:</strong> cloud segura usa DNS privado, private endpoints, logs de consulta, governança IaC e resolução híbrida documentada.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, vamos estudar <strong>VPN híbrida, Direct Connect, ExpressRoute e BGP na cloud</strong>. Depois de entender nomes públicos e privados, precisamos entender como redes corporativas e clouds se conectam de forma previsível, segura e roteável.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 7",
      "Camada 3 como consequência da resolução"
    ],
    "tcpIpLayers": [
      "Aplicação",
      "Internet"
    ],
    "relatedProtocols": [
      "DNS",
      "UDP/53",
      "TCP/53",
      "DoT",
      "DoH",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [
      "DNS",
      "VPC/VNet",
      "subnets",
      "route tables",
      "security groups",
      "NSG",
      "private endpoints",
      "load balancers"
    ],
    "enables": [
      "private endpoints",
      "resolução híbrida",
      "service discovery",
      "microserviços",
      "publicação segura",
      "troubleshooting por nome"
    ]
  },
  "protocolFields": [
    {
      "field": "QNAME",
      "size": "variável",
      "purpose": "Nome consultado pelo cliente.",
      "securityObservation": "Consultas a domínios raros, recém-criados ou inesperados podem indicar malware ou erro de configuração."
    },
    {
      "field": "QTYPE",
      "size": "16 bits",
      "purpose": "Tipo de registro solicitado, como A, AAAA, CNAME, SRV ou TXT.",
      "securityObservation": "Uso anormal de TXT ou volume incomum de NXDOMAIN pode exigir investigação."
    },
    {
      "field": "TTL",
      "size": "32 bits",
      "purpose": "Tempo de cache da resposta.",
      "securityObservation": "TTL muito alto dificulta failover; TTL muito baixo aumenta volume de consultas."
    },
    {
      "field": "RCODE",
      "size": "4 bits",
      "purpose": "Código de resposta, como NOERROR ou NXDOMAIN.",
      "securityObservation": "Aumento de NXDOMAIN pode indicar erro, enumeração, malware ou falha de service discovery."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Workload",
      "action": "Consulta um FQDN",
      "detail": "A aplicação pede ao sistema operacional o endereço de um serviço.",
      "possibleFailure": "Configuração de resolver errada ou search domain inadequado."
    },
    {
      "step": 2,
      "actor": "Resolver da VPC/VNet",
      "action": "Verifica zona privada e regras",
      "detail": "O resolver avalia zonas associadas e encaminhamentos condicionais.",
      "possibleFailure": "Zona não associada à rede correta ou regra de forward ausente."
    },
    {
      "step": 3,
      "actor": "Zona autoritativa",
      "action": "Retorna registro",
      "detail": "A resposta pode ser pública, privada ou vinda de resolver on-premises.",
      "possibleFailure": "Registro antigo, CNAME quebrado ou TTL dificultando mudança."
    },
    {
      "step": 4,
      "actor": "Aplicação",
      "action": "Conecta ao IP retornado",
      "detail": "Rotas, firewall, security group, IAM e TLS precisam permitir o caminho.",
      "possibleFailure": "DNS correto, mas rota ou regra bloqueando."
    }
  ],
  "trafficCapture": {
    "tool": "dig, nslookup, Resolve-DnsName, query logs do provedor e tcpdump/Wireshark quando autorizado",
    "filter": "udp port 53 or tcp port 53",
    "whatToObserve": [
      "QNAME consultado",
      "servidor DNS consultado",
      "TTL",
      "RCODE",
      "resposta pública versus privada",
      "diferença por origem"
    ],
    "interpretation": "A resposta DNS precisa ser analisada junto com origem da consulta, resolver usado, cache, zona autoritativa e caminho de rede subsequente."
  },
  "deepDive": {
    "mentalModel": "DNS em cloud é o mapa de intenção: o nome deve levar cada origem ao endpoint correto, com menor exposição, menor custo e evidência investigável.",
    "keyTerms": [
      "DNS público",
      "DNS privado",
      "split-horizon",
      "private hosted zone",
      "Private DNS zone",
      "Cloud DNS private zone",
      "service discovery",
      "resolver",
      "TTL",
      "forwarder",
      "conditional forwarding",
      "query logging"
    ],
    "limitations": [
      "DNS não autoriza acesso por si só.",
      "DNS pode ser cacheado fora do controle imediato.",
      "Split-horizon aumenta complexidade de troubleshooting.",
      "Service discovery depende de saúde e registro correto dos serviços."
    ],
    "whenToUse": [
      "Quando workloads precisam acessar serviços por nomes privados.",
      "Quando private endpoints devem substituir acesso público.",
      "Quando datacenter e cloud precisam resolver nomes entre si.",
      "Quando microserviços precisam descobrir endpoints dinâmicos."
    ],
    "whenNotToUse": [
      "Não usar DNS como substituto de firewall, IAM ou TLS.",
      "Não criar zonas privadas duplicadas sem owner e documentação.",
      "Não usar wildcard amplo sem controle e logging."
    ],
    "operationalImpact": [
      "Exige inventário de zonas, registros, owners, TTLs e associações.",
      "Exige runbooks de resolução por origem.",
      "Exige logs de consulta e auditoria de alterações."
    ],
    "financialImpact": [
      "Zonas, consultas, resolvers, endpoints, logs e tráfego podem gerar custo recorrente.",
      "DNS privado correto pode reduzir tráfego por NAT ou internet.",
      "Query logging aumenta custo de ingestão e armazenamento."
    ],
    "securityImpact": [
      "Reduz exposição quando direciona para endpoints privados.",
      "Permite detectar domínios suspeitos e mudanças críticas.",
      "Pode criar bypass se split-horizon estiver errado ou se egress público estiver livre."
    ]
  },
  "realWorld": {
    "homeScenario": "Nome local de impressora ou NAS funciona apenas na rede doméstica.",
    "smallBusinessScenario": "Empresa usa DNS interno para sistemas locais e DNS público para site institucional.",
    "enterpriseScenario": "Empresa híbrida usa resolvers condicionais entre datacenter e cloud, com zonas privadas por ambiente.",
    "cloudScenario": "Workloads em VPC resolvem banco gerenciado para private endpoint e usuários externos resolvem aplicação para load balancer público.",
    "incidentScenario": "Aplicação interna passa a resolver endpoint público após alteração de zona privada, aumentando custo e exposição."
  },
  "commonMistakes": [
    {
      "mistake": "Achar que DNS privado é controle de autorização.",
      "whyItHappens": "O serviço fica invisível para a internet, então parece seguro por si só.",
      "consequence": "Falta de firewall, IAM e TLS adequados.",
      "correction": "DNS privado deve ser combinado com rede, identidade, criptografia, logs e menor privilégio."
    },
    {
      "mistake": "Não documentar split-horizon.",
      "whyItHappens": "O mesmo nome funcionar de formas diferentes parece conveniente.",
      "consequence": "Troubleshooting demorado e decisões erradas em incidentes.",
      "correction": "Manter matriz de respostas por origem e runbook de testes."
    },
    {
      "mistake": "Usar TTL inadequado.",
      "whyItHappens": "TTL é tratado como detalhe de DNS.",
      "consequence": "Failover lento ou volume excessivo de consultas.",
      "correction": "Definir TTL conforme criticidade, frequência de mudança e carga esperada."
    },
    {
      "mistake": "Permitir criação livre de registros em pipeline.",
      "whyItHappens": "Automação prioriza velocidade.",
      "consequence": "Registros órfãos, nomes inconsistentes e exposição acidental.",
      "correction": "Usar IaC, revisão, policies, tags e inventário."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Funciona fora, falha dentro",
      "Funciona em uma VPC, falha em outra",
      "Mesmo FQDN retorna IP diferente",
      "Private endpoint não é usado",
      "NXDOMAIN inesperado",
      "Erro TLS após mudança de DNS",
      "Custo de NAT aumenta após migração"
    ],
    "diagnosticQuestions": [
      "De qual origem a consulta foi feita?",
      "Qual resolver respondeu?",
      "Existe zona privada associada a essa rede?",
      "Há cache local ou intermediário?",
      "Qual TTL foi retornado?",
      "O IP retornado tem rota e regra permitida?",
      "Há logs de query e auditoria de alteração?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Resolve-DnsName api.empresa.com; nslookup api.empresa.com; ipconfig /all",
        "purpose": "Ver resposta DNS e servidores configurados.",
        "expectedObservation": "Servidor DNS, endereço retornado e tipo de resposta.",
        "interpretation": "Compare respostas entre rede corporativa, VPN, cloud e internet."
      },
      {
        "platform": "Linux",
        "command": "dig api.empresa.com +short; dig api.empresa.com; resolvectl status",
        "purpose": "Ver resposta, TTL, resolver e configuração local.",
        "expectedObservation": "Resposta A/AAAA/CNAME, TTL e servidor consultado.",
        "interpretation": "Resposta diferente por origem pode ser split-horizon esperado ou erro de associação."
      },
      {
        "platform": "Cloud",
        "command": "Consultar query logs, zonas privadas associadas, resolver rules e registros do provedor.",
        "purpose": "Confirmar escopo real de zona e encaminhamento.",
        "expectedObservation": "Consulta vindo da rede esperada e resposta compatível.",
        "interpretation": "Sem log, a investigação depende de hipóteses frágeis."
      }
    ],
    "decisionTree": [
      {
        "if": "Nome resolve para IP público dentro da VPC/VNet",
        "then": "Verificar zona privada, associação de rede, private endpoint DNS e cache."
      },
      {
        "if": "NXDOMAIN apenas em workloads internos",
        "then": "Verificar search domain, zona privada, forwarding e política de resolver."
      },
      {
        "if": "DNS resolve certo, conexão falha",
        "then": "Investigar rota, security group/NSG, firewall, endpoint e TLS."
      },
      {
        "if": "Resposta muda lentamente após alteração",
        "then": "Verificar TTL, cache local, cache de resolver e propagação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Separar zonas públicas e privadas com owners claros.",
      "Usar DNS privado para private endpoints e serviços internos.",
      "Registrar query logs para domínios críticos.",
      "Aplicar IAM mínimo para alteração de zonas e registros.",
      "Validar alterações DNS em pipeline com policy as code.",
      "Monitorar alterações em registros de alta criticidade."
    ],
    "badPractices": [
      "Usar wildcard público sem justificativa.",
      "Criar zonas privadas duplicadas sem governança.",
      "Depender de DNS para segurança sem firewall/IAM/TLS.",
      "Permitir qualquer workload resolver e acessar internet livremente.",
      "Não auditar quem alterou registros críticos."
    ],
    "commonErrors": [
      "Confundir DNS público com endpoint público.",
      "Confundir private DNS com private endpoint.",
      "Não testar da origem real do workload.",
      "Ignorar TTL durante migração."
    ],
    "vulnerabilities": [
      {
        "name": "Redirecionamento por alteração indevida de DNS",
        "description": "Um registro crítico pode ser alterado para endpoint errado ou malicioso.",
        "defensiveExplanation": "A defesa depende de IAM mínimo, MFA, revisão, auditoria, alerta e validação de certificado.",
        "mitigation": "Controle de mudança, logs de auditoria, aprovação, detecção e rollback."
      },
      {
        "name": "Bypass de endpoint privado",
        "description": "Workload resolve FQDN público e acessa serviço por internet ou NAT.",
        "defensiveExplanation": "Isso aumenta custo e reduz controle de rede.",
        "mitigation": "Private DNS correto, egress control, flow logs e testes automatizados."
      }
    ],
    "monitoring": [
      "Query logs de domínios críticos",
      "Alterações em zonas e registros",
      "Aumento de NXDOMAIN",
      "Consultas para domínios raros",
      "Workloads acessando IPs públicos de serviços que deveriam ser privados"
    ],
    "hardening": [
      "IAM mínimo para DNS",
      "MFA para mudanças críticas",
      "Separação por ambiente",
      "Tags de owner e criticidade",
      "Revisão periódica de registros órfãos",
      "DNSSEC para zonas públicas quando aplicável"
    ],
    "detectionIdeas": [
      "Alerta para mudança de CNAME crítico",
      "Alerta para consultas incomuns por workload",
      "Correlação entre DNS público resolvido e tráfego por NAT",
      "Detecção de split-horizon quebrado por comparação automatizada"
    ]
  },
  "lab": {
    "id": "lab-14.7",
    "title": "Desenhar DNS público, privado, split-horizon e service discovery para uma aplicação híbrida",
    "labType": "cloud",
    "objective": "Criar um desenho de resolução de nomes seguro, privado, observável e diagnosticável sem provisionar recursos cloud.",
    "scenario": "Uma empresa migrará uma aplicação chamada Portal para cloud. Usuários externos acessam portal.empresa.com. Workloads internos na VPC/VNet devem usar caminho privado. O datacenter precisa resolver serviços cloud privados. Um cluster Kubernetes precisa descobrir APIs internas por service discovery.",
    "topology": "Internet -> DNS público -> WAF/LB público; VPC/VNet -> DNS privado -> LB privado/private endpoint; Datacenter -> resolver híbrido -> cloud resolver; Cluster -> DNS interno/service discovery.",
    "architecture": "Arquitetura híbrida com zona pública empresa.com, zona privada internal.empresa, split-horizon para portal.empresa.com, resolvers condicionais entre datacenter e cloud, query logging e políticas de alteração por IaC.",
    "prerequisites": [
      "Conhecer DNS básico do módulo 7.",
      "Conhecer VPC/VNet e subnets da aula 14.3.",
      "Conhecer load balancers da aula 14.6.",
      "Ter editor de texto ou planilha para documentar a matriz."
    ],
    "tools": [
      "Editor de texto",
      "Opcional: draw.io local ou papel",
      "Comandos conceituais: dig, nslookup, Resolve-DnsName"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não altere zonas DNS reais durante o laboratório.",
      "Não publique domínios ou IPs internos reais em materiais compartilhados.",
      "Use nomes fictícios e faixas de exemplo.",
      "O objetivo é desenho defensivo e troubleshooting, não manipulação de tráfego real.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir nomes e origens",
        "instruction": "Liste quais nomes serão resolvidos por usuários externos, workloads internos, datacenter e cluster.",
        "command": "Tabela: origem | nome | resposta esperada | resolver esperado | observabilidade",
        "expectedOutput": "Matriz inicial de resolução.",
        "explanation": "DNS deve ser testado por origem, não apenas por nome."
      },
      {
        "number": 2,
        "title": "Separar zonas públicas e privadas",
        "instruction": "Defina quais registros ficam na zona pública e quais ficam em zona privada.",
        "command": "Zona pública: empresa.com\nZona privada: internal.empresa\nSplit-horizon: portal.empresa.com",
        "expectedOutput": "Lista de zonas com propósito e owner.",
        "explanation": "Separação evita exposição indevida e melhora troubleshooting."
      },
      {
        "number": 3,
        "title": "Desenhar split-horizon",
        "instruction": "Para portal.empresa.com, defina resposta externa e resposta interna.",
        "command": "Externo: portal.empresa.com -> LB público\nInterno: portal.empresa.com -> LB privado",
        "expectedOutput": "Duas respostas esperadas documentadas por origem.",
        "explanation": "O mesmo nome pode preservar experiência do usuário e usar caminho privado internamente."
      },
      {
        "number": 4,
        "title": "Definir resolução híbrida",
        "instruction": "Descreva como datacenter resolverá nomes cloud privados e como cloud resolverá nomes legados do datacenter.",
        "command": "Datacenter -> forward internal.empresa para resolver cloud\nCloud -> forward corp.local para resolver on-premises",
        "expectedOutput": "Plano de encaminhamento condicional.",
        "explanation": "Híbrido precisa de fluxo DNS bidirecional controlado por VPN/Direct Connect/ExpressRoute."
      },
      {
        "number": 5,
        "title": "Mapear service discovery",
        "instruction": "Defina como serviços dinâmicos serão descobertos dentro do cluster ou plataforma.",
        "command": "api.namespace.svc.cluster.local -> Service Kubernetes\norders.service.internal -> service registry",
        "expectedOutput": "Plano de discovery interno.",
        "explanation": "Service discovery reduz dependência de IP fixo, mas exige saúde, identidade e observabilidade."
      },
      {
        "number": 6,
        "title": "Adicionar controles de segurança",
        "instruction": "Inclua IAM, logs, revisão, TTL, alertas e bloqueios de egress para impedir bypass.",
        "command": "Controles: query logs, audit logs, IAM mínimo, MFA, policy as code, egress deny by default",
        "expectedOutput": "Checklist de segurança DNS.",
        "explanation": "DNS seguro depende de governança, não apenas de registros corretos."
      },
      {
        "number": 7,
        "title": "Criar plano de validação",
        "instruction": "Escreva comandos de teste por origem e resultado esperado.",
        "command": "dig portal.empresa.com\nnslookup portal.empresa.com\nResolve-DnsName portal.empresa.com",
        "expectedOutput": "Plano de validação por origem: internet, VPC/VNet, datacenter, cluster.",
        "explanation": "Sem teste por origem, split-horizon não é comprovado."
      }
    ],
    "expectedResult": "Ao final, o aluno terá uma arquitetura DNS cloud documentada, com zonas, registros, respostas por origem, resolução híbrida, service discovery, logs e controles defensivos.",
    "validation": [
      {
        "check": "Matriz por origem existe",
        "command": "Revisar tabela origem | nome | resposta | resolver | logs",
        "expected": "Cada origem tem resposta esperada documentada.",
        "ifFails": "Volte ao passo 1 e separe usuário externo, workload interno, datacenter e cluster."
      },
      {
        "check": "Split-horizon está claro",
        "command": "Comparar resposta externa e interna para o mesmo FQDN",
        "expected": "Respostas diferentes são intencionais e documentadas.",
        "ifFails": "Evite split-horizon até haver runbook e owner."
      },
      {
        "check": "Resolução híbrida tem direção definida",
        "command": "Verificar forwarders condicionais",
        "expected": "Datacenter e cloud sabem para onde encaminhar domínios específicos.",
        "ifFails": "Adicionar regras de encaminhamento e caminho privado entre redes."
      },
      {
        "check": "Segurança e logs estão previstos",
        "command": "Revisar IAM, audit logs, query logs e alertas",
        "expected": "Mudanças e consultas críticas são investigáveis.",
        "ifFails": "Adicionar logging antes da produção."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Workload interno resolve IP público",
        "probableCause": "Zona privada não associada ou private DNS ausente.",
        "howToConfirm": "Executar dig/nslookup dentro da rede do workload e verificar resolver usado.",
        "fix": "Associar zona privada, corrigir registros e controlar egress."
      },
      {
        "symptom": "Datacenter não resolve nomes cloud",
        "probableCause": "Forwarder condicional ausente ou resolver inbound inacessível.",
        "howToConfirm": "Testar consulta do datacenter e validar rota/VPN para resolver cloud.",
        "fix": "Criar endpoint inbound/outbound ou mecanismo equivalente e regra de forward."
      },
      {
        "symptom": "Mudança DNS não surte efeito",
        "probableCause": "Cache por TTL alto.",
        "howToConfirm": "Verificar TTL retornado e caches intermediários.",
        "fix": "Planejar redução de TTL antes de migração."
      },
      {
        "symptom": "Aplicação resolve corretamente, mas falha conexão",
        "probableCause": "Problema de rota, firewall, SG/NSG ou TLS, não DNS.",
        "howToConfirm": "Testar conexão ao IP retornado e revisar flow/firewall logs.",
        "fix": "Corrigir política de rede ou certificado."
      }
    ],
    "improvements": [
      "Criar testes automatizados de resolução por origem.",
      "Criar alerta para alteração de registros críticos.",
      "Adicionar query logging para domínios sensíveis.",
      "Integrar inventário de DNS com CMDB.",
      "Criar limpeza trimestral de registros órfãos."
    ],
    "evidenceToCollect": [
      "Matriz de resolução por origem",
      "Desenho de zonas públicas e privadas",
      "Plano de resolvers híbridos",
      "Plano de logs e auditoria",
      "Lista de owners por zona/registro",
      "Plano de validação com comandos"
    ],
    "questions": [
      "Por que DNS privado não substitui firewall?",
      "Quando split-horizon ajuda e quando atrapalha?",
      "Como provar que um workload usou private endpoint?",
      "Qual risco de TTL alto durante migração?"
    ],
    "challenge": "Desenhe a resolução de nomes para um sistema financeiro que possui portal público, API interna, banco gerenciado com private endpoint, integração com datacenter e microserviços em Kubernetes.",
    "solution": "A solução deve usar zona pública apenas para portal externo, zona privada para APIs e banco, split-horizon quando o mesmo FQDN precisar de caminho interno/externo, encaminhamento condicional entre datacenter e cloud, service discovery no cluster, logs de consulta, IAM mínimo e egress control para impedir bypass de endpoints privados."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que DNS em cloud não pode ser tratado apenas como detalhe de aplicação?",
      "hints": [
        "Pense em caminho de rede.",
        "Pense em private endpoints, NAT e custos."
      ],
      "expectedIdeas": [
        "intenção de acesso",
        "exposição",
        "custo",
        "troubleshooting",
        "segurança"
      ],
      "explanation": "DNS decide o primeiro destino que a aplicação tentará acessar; isso influencia rota, segurança, custo e investigação."
    },
    {
      "type": "diagnóstico",
      "question": "Um workload dentro da VPC resolve um banco gerenciado para IP público. O que você verificaria?",
      "hints": [
        "Pense em zona privada.",
        "Pense em resolver usado e endpoint privado."
      ],
      "expectedIdeas": [
        "private DNS",
        "associação de VPC",
        "cache",
        "resolver",
        "egress control"
      ],
      "explanation": "A investigação deve confirmar origem da consulta, zona privada, associação, TTL e caminho real."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer usar o mesmo FQDN para usuários internos e externos. Qual cuidado é essencial?",
      "hints": [
        "Pense em split-horizon.",
        "Pense em documentação e logs."
      ],
      "expectedIdeas": [
        "respostas por origem",
        "runbook",
        "logs",
        "TTL",
        "validação"
      ],
      "explanation": "Split-horizon é poderoso, mas precisa ser documentado e testado por origem para não virar armadilha operacional."
    }
  ],
  "quiz": [
    {
      "id": "q14.7.1",
      "type": "conceito",
      "q": "Qual é a diferença central entre DNS público e DNS privado em cloud?",
      "opts": [
        "DNS público é resolvível pela internet; DNS privado é restrito a redes privadas associadas.",
        "DNS privado sempre usa criptografia e DNS público nunca usa.",
        "DNS público só usa A record; DNS privado só usa CNAME.",
        "DNS privado substitui firewall e IAM."
      ],
      "a": 0,
      "exp": "DNS privado restringe o escopo de resolução, mas não substitui controles de acesso.",
      "difficulty": "iniciante",
      "topic": "dns privado"
    },
    {
      "id": "q14.7.2",
      "type": "cenário",
      "q": "O mesmo FQDN retorna IP público fora da empresa e IP privado dentro da VPC. Isso é exemplo de quê?",
      "opts": [
        "Split-horizon DNS",
        "NAT Gateway",
        "BGP anycast obrigatório",
        "NACL stateless"
      ],
      "a": 0,
      "exp": "Split-horizon permite respostas diferentes conforme origem ou escopo de resolução.",
      "difficulty": "intermediário",
      "topic": "split-horizon"
    },
    {
      "id": "q14.7.3",
      "type": "diagnóstico",
      "q": "Um private endpoint foi criado, mas a aplicação ainda acessa o endpoint público. Qual hipótese deve ser testada primeiro?",
      "opts": [
        "DNS privado ou associação da zona privada está incorreto.",
        "O protocolo TCP não funciona em cloud.",
        "Todo acesso privado exige IPv6.",
        "O load balancer precisa ser L4 obrigatoriamente."
      ],
      "a": 0,
      "exp": "Private endpoint depende de resolução privada correta para o nome do serviço.",
      "difficulty": "intermediário",
      "topic": "private endpoint"
    },
    {
      "id": "q14.7.4",
      "type": "segurança",
      "q": "Por que alterar registros DNS críticos deve gerar alerta?",
      "opts": [
        "Porque DNS pode redirecionar tráfego para destinos errados ou inesperados.",
        "Porque DNS sempre contém senhas.",
        "Porque toda consulta DNS derruba a aplicação.",
        "Porque TTL alto impede qualquer ataque."
      ],
      "a": 0,
      "exp": "Mudanças DNS podem afetar tráfego, TLS, exposição e disponibilidade.",
      "difficulty": "intermediário",
      "topic": "monitoramento"
    },
    {
      "id": "q14.7.5",
      "type": "troubleshooting",
      "q": "DNS resolve corretamente para IP privado, mas a conexão falha. Qual conclusão é mais correta?",
      "opts": [
        "A investigação deve continuar em rota, firewall, SG/NSG, endpoint e TLS.",
        "DNS está necessariamente errado.",
        "Não há como testar isso.",
        "O TTL deve ser zero."
      ],
      "a": 0,
      "exp": "Resolução correta não garante conectividade nem autorização.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q14.7.6",
      "type": "devsecops",
      "q": "Qual guardrail de pipeline ajuda a reduzir risco DNS?",
      "opts": [
        "Exigir owner, ambiente, aprovação e policy para registros críticos.",
        "Permitir wildcard público por padrão.",
        "Criar registros manualmente fora do IaC.",
        "Ignorar query logs para reduzir evidência."
      ],
      "a": 0,
      "exp": "Governança em IaC reduz registros órfãos, exposição e alterações sem rastreabilidade.",
      "difficulty": "intermediário",
      "topic": "devsecops"
    }
  ],
  "flashcards": [
    {
      "id": "fc14.7.1",
      "front": "O que é DNS privado?",
      "back": "Resolução de nomes restrita a redes privadas, como VPCs, VNets, redes híbridas ou clusters.",
      "tags": [
        "dns",
        "cloud"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.7.2",
      "front": "O que é split-horizon DNS?",
      "back": "Modelo em que o mesmo nome pode retornar respostas diferentes dependendo da origem da consulta.",
      "tags": [
        "dns",
        "split-horizon"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.7.3",
      "front": "DNS privado substitui firewall?",
      "back": "Não. DNS aponta nomes; firewall, IAM, TLS e políticas autorizam e protegem o acesso.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.7.4",
      "front": "Por que TTL importa em migrações?",
      "back": "Porque caches podem manter respostas antigas, atrasando failover ou mudança de endpoint.",
      "tags": [
        "ttl",
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.7.5",
      "front": "O que é service discovery?",
      "back": "Mecanismo para aplicações descobrirem serviços dinamicamente, sem depender de IPs fixos.",
      "tags": [
        "service discovery",
        "kubernetes"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.7.6",
      "front": "Qual evidência confirma resolução DNS real?",
      "back": "Consulta feita da origem real, resolver usado, resposta, TTL, query logs e correlação com conexão/flow logs.",
      "tags": [
        "evidência",
        "soc"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex14.7.1",
      "type": "conceitual",
      "prompt": "Explique por que o mesmo FQDN pode ter resposta pública e privada.",
      "expectedAnswer": "Isso ocorre em split-horizon DNS, quando zonas ou resolvers diferentes respondem conforme a origem da consulta.",
      "explanation": "O objetivo é preservar o nome enquanto direciona tráfego interno para caminho privado e externo para caminho público."
    },
    {
      "id": "ex14.7.2",
      "type": "diagnóstico",
      "prompt": "Um servidor no datacenter não resolve nomes privados da cloud. Liste três hipóteses.",
      "expectedAnswer": "Forwarder condicional ausente, resolver cloud inacessível por rota/VPN, zona privada não associada ou regra de firewall bloqueando DNS.",
      "explanation": "Híbrido exige DNS e caminho de rede funcionando."
    },
    {
      "id": "ex14.7.3",
      "type": "segurança",
      "prompt": "Cite três controles para proteger alterações DNS críticas.",
      "expectedAnswer": "IAM mínimo, MFA, aprovação, audit logs, alerta de mudança, IaC revisado e tags de owner.",
      "explanation": "DNS é ponto de controle sensível e precisa de governança."
    },
    {
      "id": "ex14.7.4",
      "type": "cloud",
      "prompt": "Desenhe uma estratégia para impedir que workloads acessem banco gerenciado por endpoint público.",
      "expectedAnswer": "Usar private endpoint, private DNS, rotas privadas, bloquear egress público indevido e monitorar flow/query logs.",
      "explanation": "A proteção exige DNS correto e controle de rede."
    }
  ],
  "challenge": {
    "title": "Projetar DNS para aplicação híbrida com acesso público, privado e service discovery",
    "scenario": "Uma empresa migrará um sistema para cloud. Usuários externos usam portal.empresa.com. Workloads internos devem usar caminho privado. O datacenter precisa resolver serviços cloud. Microserviços em Kubernetes precisam descobrir APIs internas.",
    "tasks": [
      "Definir zonas públicas e privadas.",
      "Desenhar split-horizon para o portal.",
      "Planejar resolução híbrida.",
      "Definir service discovery no cluster.",
      "Criar controles de segurança e logs.",
      "Criar plano de validação por origem."
    ],
    "constraints": [
      "Não expor banco ou APIs internas publicamente.",
      "Evitar tráfego interno por NAT quando houver caminho privado.",
      "Toda zona e registro crítico deve ter owner.",
      "A solução precisa ser auditável."
    ],
    "expectedDeliverables": [
      "Matriz de resolução por origem",
      "Diagrama de DNS",
      "Plano de zonas e registros",
      "Plano de logging e auditoria",
      "Runbook de troubleshooting"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação público/privado",
        "points": 20,
        "description": "Zonas e registros corretos para cada escopo."
      },
      {
        "criterion": "Híbrido e service discovery",
        "points": 20,
        "description": "Resolução entre datacenter, cloud e cluster documentada."
      },
      {
        "criterion": "Segurança",
        "points": 20,
        "description": "IAM, logs, egress control e private endpoints considerados."
      },
      {
        "criterion": "Troubleshooting",
        "points": 20,
        "description": "Comandos e evidências por origem definidos."
      },
      {
        "criterion": "Clareza arquitetural",
        "points": 20,
        "description": "Desenho compreensível e justificável."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa separando origens: internet, VPC/VNet, datacenter e cluster. Depois define qual nome cada origem consulta e qual resposta deve receber. Em seguida, conecta DNS à rede: se a resposta é privada, precisa de rota privada, política e TLS. Por fim, adiciona logs e governança para tornar o desenho operável.",
    "steps": [
      "Criar zona pública empresa.com apenas para serviços externos.",
      "Criar zona privada internal.empresa para serviços internos.",
      "Usar split-horizon para portal.empresa.com quando interno e externo precisam do mesmo nome.",
      "Associar zonas privadas às redes corretas.",
      "Configurar encaminhamento condicional entre datacenter e cloud.",
      "Usar service discovery no cluster para serviços dinâmicos.",
      "Habilitar query logs e auditoria de mudanças.",
      "Criar testes por origem com dig, nslookup e Resolve-DnsName."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar todos os registros no DNS público.",
        "whyItIsWrong": "Expõe nomes internos e incentiva acesso por caminhos públicos."
      },
      {
        "answer": "Usar apenas DNS privado e remover DNS público.",
        "whyItIsWrong": "Usuários externos legítimos precisam resolver serviços públicos."
      },
      {
        "answer": "Criar split-horizon sem documentação.",
        "whyItIsWrong": "Dificulta troubleshooting e resposta a incidente."
      }
    ],
    "finalAnswer": "A arquitetura recomendada usa DNS público para entrada externa, DNS privado para workloads e endpoints internos, split-horizon documentado para nomes compartilhados, resolvers híbridos por encaminhamento condicional, service discovery para microserviços, private endpoints para serviços gerenciados, e controles de IAM, logs, alertas, TTL planejado e egress control."
  },
  "glossary": [
    {
      "term": "DNS público",
      "shortDefinition": "Zona DNS resolvível pela internet.",
      "longDefinition": "Conjunto de registros autoritativos acessíveis publicamente para publicar serviços externos.",
      "example": "www.empresa.com apontando para CDN ou load balancer público.",
      "relatedTerms": [
        "zona pública",
        "FQDN",
        "registro A"
      ],
      "relatedLessons": [
        "7.x",
        "14.6",
        "14.7"
      ]
    },
    {
      "term": "DNS privado",
      "shortDefinition": "DNS restrito a redes privadas.",
      "longDefinition": "Resolução de nomes associada a VPCs, VNets, redes privadas ou clusters, usada para serviços internos.",
      "example": "db.prod.internal resolvendo para IP privado.",
      "relatedTerms": [
        "private hosted zone",
        "Private DNS zone",
        "Cloud DNS private zone"
      ],
      "relatedLessons": [
        "14.3",
        "14.7",
        "14.10"
      ]
    },
    {
      "term": "Split-horizon DNS",
      "shortDefinition": "Mesmo nome com respostas diferentes conforme origem.",
      "longDefinition": "Estratégia de DNS em que consultas internas e externas para o mesmo nome recebem respostas distintas.",
      "example": "portal.empresa.com retorna LB público fora e LB privado dentro.",
      "relatedTerms": [
        "DNS privado",
        "zona pública",
        "zona privada"
      ],
      "relatedLessons": [
        "14.7"
      ]
    },
    {
      "term": "Service discovery",
      "shortDefinition": "Descoberta dinâmica de serviços.",
      "longDefinition": "Mecanismo que permite aplicações encontrarem serviços sem IPs fixos, usando DNS, API ou registry.",
      "example": "api.namespace.svc.cluster.local no Kubernetes.",
      "relatedTerms": [
        "Kubernetes Service",
        "Cloud Map",
        "Service Directory"
      ],
      "relatedLessons": [
        "14.7",
        "14.11"
      ]
    },
    {
      "term": "TTL",
      "shortDefinition": "Tempo de cache de uma resposta DNS.",
      "longDefinition": "Valor que indica por quanto tempo resolvers e clientes podem armazenar uma resposta.",
      "example": "TTL de 300 segundos durante migração controlada.",
      "relatedTerms": [
        "cache",
        "resolver",
        "failover"
      ],
      "relatedLessons": [
        "7.x",
        "14.7"
      ]
    },
    {
      "term": "Resolver híbrido",
      "shortDefinition": "Mecanismo de resolução entre datacenter e cloud.",
      "longDefinition": "Conjunto de resolvers e regras de encaminhamento que permite consulta DNS entre redes on-premises e cloud.",
      "example": "Datacenter encaminha internal.empresa para resolver da VPC.",
      "relatedTerms": [
        "conditional forwarding",
        "VPN",
        "Direct Connect",
        "ExpressRoute"
      ],
      "relatedLessons": [
        "14.7",
        "14.8"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Working with private hosted zones",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-private.html",
      "note": "Referência sobre zonas privadas associadas a VPCs."
    },
    {
      "type": "official-doc",
      "title": "Route 53 Resolver inbound endpoints",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-forwarding-inbound-queries.html",
      "note": "Referência para resolução híbrida com VPC Resolver."
    },
    {
      "type": "official-doc",
      "title": "Azure Private DNS zones scenarios",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/dns/private-dns-scenarios",
      "note": "Cenários de DNS privado no Azure."
    },
    {
      "type": "official-doc",
      "title": "Cloud DNS zones overview",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/dns/docs/zones/zones-overview",
      "note": "Tipos de zonas públicas e privadas no Google Cloud."
    },
    {
      "type": "official-doc",
      "title": "DNS for Services and Pods",
      "organization": "Kubernetes",
      "url": "https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/",
      "note": "Service discovery via DNS em Kubernetes."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "DNS básico é pré-requisito direto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes",
      "lesson": "Service discovery",
      "reason": "Kubernetes usa DNS para descoberta de serviços e pods."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM corporativo",
      "lesson": "controle de mudanças e menor privilégio",
      "reason": "Alterações DNS críticas precisam de IAM mínimo, auditoria e governança."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e plataforma de aplicações",
      "lesson": "Service, Ingress, CNI, NetworkPolicy e operação de clusters",
      "reason": "Kubernetes depende de redes, DNS, balanceamento, políticas e observabilidade para operar aplicações modernas."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Identidades de workload e serviços",
      "lesson": "Service principals, OIDC federation, managed identities e contas de serviço",
      "reason": "Serviços, pipelines e workloads acessam recursos usando identidade própria, não apenas endereço IP ou regra de firewall."
    }
  ],
  "pedagogicalMap": {
    "problem": "Nomes podem apontar para caminhos públicos, privados, híbridos ou dinâmicos sem clareza.",
    "concept": "DNS cloud organiza resolução pública, privada, split-horizon e service discovery.",
    "internalMechanism": "Resolver avalia cache, zonas, regras de encaminhamento e retorna registros com TTL.",
    "realUse": "Private endpoints, service discovery, DNS híbrido e publicação segura.",
    "commonMistake": "Testar DNS apenas do notebook e não da origem real do workload.",
    "securityImpact": "DNS incorreto pode expor serviços ou criar bypass de controles privados.",
    "operationalImpact": "Exige inventário, logs, runbooks e governança de mudanças.",
    "summary": "DNS é o plano de nomes que guia o primeiro salto lógico da aplicação; segurança exige controles adicionais."
  },
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
      "14.8"
    ]
  }
};
