export const lesson1406 = {
  "id": "14.6",
  "moduleId": "m14",
  "order": 6,
  "title": "Load Balancers, health checks, TLS e publicação de serviços",
  "subtitle": "Como publicar aplicações em cloud com disponibilidade, segurança, observabilidade e troubleshooting previsível.",
  "duration": "100-160 min",
  "estimatedStudyTimeMinutes": 160,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 300,
  "tags": [
    "cloud networking",
    "load balancer",
    "health check",
    "tls",
    "waf",
    "dns",
    "aws",
    "azure",
    "gcp",
    "segurança",
    "troubleshooting",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.4",
      "reason": "Load balancer depende de rotas, gateways, NAT e caminhos de rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.5",
      "reason": "Publicação segura depende de security groups, NSGs, NACLs e cloud firewalls."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.x",
      "reason": "TLS, HTTP, HTTPS, proxies e APIs são base para load balancers L7."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.x",
      "reason": "Arquitetura defensiva, logs, SIEM e resposta orientam publicação segura."
    }
  ],
  "objectives": [
    "Diferenciar load balancers de camada 4 e camada 7.",
    "Explicar listener, backend pool, target group, health check, TLS termination, re-encryption e pass-through.",
    "Desenhar publicação segura com DNS, WAF, load balancer, subnets privadas e logs.",
    "Relacionar health checks com disponibilidade real, rollout, autoscaling e troubleshooting.",
    "Avaliar impactos de custo, segurança, privacidade e observabilidade em load balancers gerenciados.",
    "Criar critérios DevSecOps para impedir publicação insegura por IaC ou pipeline."
  ],
  "learningOutcomes": [
    "Dado um serviço, o aluno escolhe L4 ou L7 com justificativa técnica.",
    "Dado um erro 502/503, o aluno investiga listener, target group, health check, backend, rota, firewall e aplicação.",
    "Dado um desenho TLS, o aluno identifica riscos de terminação, recriptografia e certificado vencido.",
    "Dado um pipeline de publicação, o aluno propõe guardrails de logs, TLS, WAF e backend privado."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Uma aplicação web corporativa foi publicada em cloud. Durante o teste inicial, tudo parecia simples: um DNS público aponta para um endereço de entrada, o load balancer recebe HTTPS e encaminha para duas instâncias em subnets privadas. Na primeira janela de mudança, porém, os sintomas aparecem: metade dos usuários recebe erro intermitente, o certificado TLS foi instalado no lugar errado, um health check marca servidores saudáveis como indisponíveis, o firewall permite tráfego do mundo inteiro até os backends e ninguém sabe dizer se o TLS termina no balanceador, no ingress ou na aplicação.</p>\n  <p>Load balancer é uma das peças mais importantes de Cloud Networking porque ele transforma múltiplos servidores, containers ou pods em um serviço aparentemente único. Ele melhora disponibilidade, escala, publicação e manutenção, mas também vira ponto crítico de segurança, custo, observabilidade e troubleshooting.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> publicar serviço em cloud não é apenas abrir uma porta. É decidir quem recebe tráfego, em que camada, com qual certificado, com qual health check, com qual política de TLS, com qual logging e com qual proteção contra exposição direta dos backends.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Antes da cloud, balanceamento costumava ser feito por appliances físicos ou virtuais no datacenter. A equipe de redes publicava um VIP, configurava pools de servidores, health checks, persistência de sessão e, muitas vezes, TLS offload. Esse modelo era poderoso, mas exigia compra de hardware, capacidade pré-planejada, licenças, atualização manual e alto conhecimento especializado.</p>\n  <p>Com a cloud, o balanceador passou a ser serviço gerenciado. Em vez de comprar appliance, a equipe cria um Application Load Balancer, Network Load Balancer, Azure Load Balancer, Application Gateway, Google Cloud Load Balancer ou recurso equivalente via console, API, Terraform ou pipeline. A promessa é elasticidade, integração com certificados gerenciados, autoscaling, logs e health checks. A armadilha é acreditar que serviço gerenciado elimina arquitetura. Ele elimina parte da operação física, mas aumenta a necessidade de desenho correto.</p>\n  <p>A evolução mais importante foi a separação entre balanceadores de camada 4, que entendem conexões TCP/UDP, e balanceadores de camada 7, que entendem HTTP, host, path, cabeçalhos, cookies, redirecionamentos e integração com WAF.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é publicar serviços de forma resiliente e segura sem expor servidores diretamente, sem mandar tráfego para instâncias quebradas e sem perder controle sobre TLS, logs, rotas, regras e custos.</p>\n  <ul>\n    <li><strong>Disponibilidade:</strong> se um backend falha, o usuário não deve ser enviado para ele.</li>\n    <li><strong>Escala:</strong> se a demanda aumenta, novos backends precisam entrar no pool sem mudar DNS manualmente.</li>\n    <li><strong>Segurança:</strong> backends não devem aceitar tráfego direto da internet quando o ponto de entrada autorizado é o load balancer.</li>\n    <li><strong>TLS:</strong> a equipe precisa decidir entre TLS termination, re-encryption, pass-through e mTLS quando aplicável.</li>\n    <li><strong>Observabilidade:</strong> logs do load balancer, health checks, WAF, aplicação e flow logs precisam formar uma linha do tempo coerente.</li>\n    <li><strong>Troubleshooting:</strong> erro 502, 503, timeout, certificado inválido e health check falhando têm causas diferentes.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Regra mental:</strong> load balancer não corrige aplicação quebrada, rota errada, certificado ruim, DNS mal planejado ou política de firewall permissiva. Ele torna esses erros mais visíveis e, às vezes, mais caros.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução dos load balancers em cloud pode ser entendida por camada e responsabilidade.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Tipo</th><th>Camada</th><th>O que enxerga</th><th>Uso típico</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>DNS round-robin</td><td>Nome</td><td>Registros DNS</td><td>Distribuição simples</td><td>Não entende saúde real por requisição</td></tr>\n      <tr><td>Network Load Balancer</td><td>L4</td><td>IP, porta, protocolo e conexão</td><td>TCP/UDP, baixa latência, tráfego não HTTP</td><td>Não roteia por path HTTP</td></tr>\n      <tr><td>Application Load Balancer</td><td>L7</td><td>Host, path, método, headers e cookies</td><td>Aplicações web, APIs, microserviços</td><td>Mais complexo e dependente de HTTP/TLS</td></tr>\n      <tr><td>Application Gateway / WAF</td><td>L7</td><td>HTTP, TLS, regras de aplicação</td><td>Publicação web protegida</td><td>Custo, tuning e risco de falso positivo</td></tr>\n      <tr><td>Ingress Controller</td><td>L7/Kubernetes</td><td>Recursos Kubernetes e HTTP</td><td>Publicação de serviços em cluster</td><td>Depende de cluster, controlador e integração cloud</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Load balancer é um componente que recebe tráfego em um ponto de entrada e distribui esse tráfego para um conjunto de backends, considerando regras de roteamento, saúde dos alvos, protocolo, portas, certificados e políticas de segurança.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> em cloud networking, load balancer é um serviço gerenciado ou componente de rede que publica um endpoint, avalia conexões ou requisições, escolhe um backend elegível e encaminha o tráfego apenas para alvos considerados saudáveis.</div>\n  <p>O conceito não deve ser reduzido a “dividir carga”. Em ambiente corporativo, load balancer também é ponto de terminação TLS, ponto de aplicação de WAF, ponto de observabilidade, ponto de integração com autoscaling, ponto de controle de exposição pública e ponto de troubleshooting.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Um fluxo típico de publicação com load balancer acontece em etapas.</p>\n  <ol class=\"flow-list\">\n    <li><strong>DNS resolve o nome:</strong> o usuário acessa <code>app.empresa.com</code> e recebe o endereço ou alias do load balancer.</li>\n    <li><strong>Listener recebe tráfego:</strong> o listener espera conexões em protocolo e porta, como HTTPS 443.</li>\n    <li><strong>TLS é negociado:</strong> o certificado pode estar no load balancer, no backend ou em ambos, dependendo do desenho.</li>\n    <li><strong>Regra é avaliada:</strong> em L7, host, path e headers podem decidir o target group ou backend pool.</li>\n    <li><strong>Health check filtra alvos:</strong> backends que não respondem como esperado são removidos temporariamente da rotação.</li>\n    <li><strong>Tráfego é encaminhado:</strong> a conexão ou requisição segue para um backend permitido por rotas, security groups, NSGs ou firewall.</li>\n    <li><strong>Logs são gerados:</strong> access logs, WAF logs, métricas, health events e flow logs ajudam a explicar o que aconteceu.</li>\n  </ol>\n  <p>O erro comum é olhar somente para o backend. Em um incidente real, a causa pode estar no DNS, listener, certificado, regra de roteamento, health check, target group, rota, firewall, timeout, aplicação ou dependência do backend.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em arquitetura cloud segura, o load balancer normalmente fica entre usuários e workloads privados. O padrão comum é: DNS público aponta para um load balancer público; o load balancer encaminha para backends em subnets privadas; backends aceitam tráfego apenas do load balancer; logs são enviados para armazenamento, SIEM ou observabilidade; WAF pode proteger camada HTTP; certificados são gerenciados com processo de renovação.</p>\n  <ul>\n    <li><strong>Camada envolvida:</strong> L4 para TCP/UDP ou L7 para HTTP/HTTPS.</li>\n    <li><strong>Componentes:</strong> DNS, listener, certificado, target group/backend pool, health check, security group/NSG, WAF, logs e aplicação.</li>\n    <li><strong>Dependências:</strong> rotas, subnets, IAM, certificados, DNS, autoscaling, observabilidade e regras de firewall.</li>\n    <li><strong>Pontos de falha:</strong> health check incorreto, certificado vencido, backend bloqueando origem do load balancer, timeout incompatível, WAF bloqueando tráfego legítimo, DNS apontando para recurso errado.</li>\n  </ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Imagine um hospital com uma recepção central. O paciente não escolhe diretamente o médico; ele chega na recepção, informa o problema, a recepção verifica quais médicos estão disponíveis e encaminha para o atendimento correto. Se um médico está indisponível, a recepção deixa de encaminhar pacientes para ele. Se o caso exige especialidade, a recepção envia para uma fila específica.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> load balancer não entende, por padrão, qualidade médica ou lógica de negócio profunda. Ele decide com base em protocolos, regras, health checks e métricas configuradas. Se o health check for superficial, ele pode considerar saudável um backend que responde <code>/health</code>, mas falha em dependência crítica.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em um laboratório pequeno, você tem duas VMs rodando a mesma aplicação na porta 8080. Um load balancer recebe HTTPS na porta 443 e distribui requisições para as duas VMs. O usuário acessa um único nome, como <code>app.lab.local</code>, sem saber qual VM respondeu.</p>\n  <p>Se uma VM parar de responder ao health check <code>/health</code>, o load balancer remove essa VM da rotação. Quando ela volta a responder corretamente, ela é reinserida. A experiência esperada é continuidade do serviço, desde que a aplicação seja stateless ou tenha sessão bem planejada.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um portal interno é publicado por um Application Load Balancer ou Application Gateway. Usuários externos passam por DNS, CDN, WAF, load balancer e backends privados. O time de segurança exige TLS 1.2 ou superior, logs de acesso, bloqueio de portas administrativas, certificados gerenciados, WAF em modo monitor antes de bloquear, health checks adequados e evidência no SIEM.</p>\n  <p>O desenho empresarial também precisa responder: quem pode criar listeners públicos? Quem aprova certificado? Quem recebe alerta de backend unhealthy? Quem revisa regra de WAF? Qual é o processo para blue/green deploy? Como rollback é feito? Qual métrica prova que o problema é no balanceador e não na aplicação?</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Na AWS, um Application Load Balancer opera na camada 7 e roteia para target groups; um Network Load Balancer opera na camada 4 e é comum para tráfego TCP/UDP de baixa latência. No Azure, Azure Load Balancer atende cenários L4, enquanto Application Gateway atua como proxy L7 com recursos como WAF e TLS. No Google Cloud, Cloud Load Balancing oferece opções HTTP(S), TCP/SSL, UDP e balanceamento global ou regional conforme o tipo.</p>\n  <p>A decisão não é “qual é melhor”, mas “qual combina com o protocolo, a camada, o modelo de segurança, a necessidade de WAF, os logs, a latência, o custo e o modo de operação”. Publicar uma API HTTP com roteamento por path pede L7. Publicar TCP sem entendimento HTTP pode pedir L4. Publicar Kubernetes pode envolver Ingress, Gateway API ou load balancer gerenciado pelo provedor.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, load balancers devem ser criados por IaC e validados por pipeline. Regras úteis incluem: não permitir listener HTTP público sem redirecionamento para HTTPS; exigir TLS policy aprovada; impedir backend público quando o padrão é privado; exigir access logs; exigir health check em endpoint específico; exigir tags de owner, ambiente e criticidade; impedir certificado expirado ou manual sem processo de renovação.</p>\n  <p>Em Kubernetes, pipelines podem criar ingress, certificates, services e annotations que resultam em load balancers reais no provedor. Um erro de annotation pode expor serviço interno na internet. Por isso, plataforma, segurança e rede precisam definir templates, políticas e revisões automatizadas.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Load balancer é um ponto de segurança crítico. Ele pode reduzir exposição dos backends, centralizar TLS, aplicar WAF e registrar acesso. Mas também pode criar falsa sensação de proteção: se os backends aceitam tráfego direto da internet, se o TLS termina no load balancer e segue sem criptografia em rede não confiável, se o WAF está desligado, se logs não existem ou se health check não representa saúde real, a arquitetura continua frágil.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Backend exposto</td><td>Regra permite internet direta na VM/container</td><td>Bypass de WAF e controles centrais</td><td>Permitir origem apenas do load balancer ou rede autorizada</td></tr>\n      <tr><td>TLS fraco</td><td>Policy antiga, certificado vencido ou cadeia incompleta</td><td>Falha de confiança e risco de interceptação</td><td>Política TLS aprovada, monitoramento de expiração e automação</td></tr>\n      <tr><td>Health check superficial</td><td><code>/health</code> responde mesmo sem banco ou dependência crítica</td><td>Usuário recebe erro apesar de alvo saudável</td><td>Health check que represente prontidão real sem expor segredo</td></tr>\n      <tr><td>Logs ausentes</td><td>Sem access logs ou WAF logs</td><td>Investigação fraca</td><td>Enviar logs para storage/SIEM com retenção adequada</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"lb-title-1406 lb-desc-1406\">\n    <title id=\"lb-title-1406\">Publicação segura com load balancer</title>\n    <desc id=\"lb-desc-1406\">Usuário acessa DNS, WAF e load balancer. O load balancer faz health check, aplica TLS e envia tráfego apenas para backends saudáveis em subnets privadas, gerando logs para SIEM.</desc>\n    <defs>\n      <marker id=\"arrow-lb-1406\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"210\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"105\" y=\"250\" text-anchor=\"middle\" class=\"svg-label\">Usuário</text>\n    <rect x=\"220\" y=\"80\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"290\" y=\"122\" text-anchor=\"middle\" class=\"svg-label\">DNS</text>\n    <rect x=\"220\" y=\"210\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"290\" y=\"250\" text-anchor=\"middle\" class=\"svg-label\">WAF/CDN</text>\n    <rect x=\"420\" y=\"190\" width=\"170\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"505\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">Load Balancer</text>\n    <text x=\"505\" y=\"252\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Listener HTTPS</text>\n    <text x=\"505\" y=\"276\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TLS + regras + health</text>\n    <rect x=\"665\" y=\"110\" width=\"135\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"732\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Backend A</text>\n    <rect x=\"665\" y=\"250\" width=\"135\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"732\" y=\"290\" text-anchor=\"middle\" class=\"svg-label\">Backend B</text>\n    <rect x=\"665\" y=\"390\" width=\"135\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"732\" y=\"430\" text-anchor=\"middle\" class=\"svg-label\">Backend C</text>\n    <rect x=\"835\" y=\"210\" width=\"110\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"890\" y=\"250\" text-anchor=\"middle\" class=\"svg-label\">SIEM</text>\n    <rect x=\"635\" y=\"80\" width=\"195\" height=\"400\" rx=\"18\" class=\"svg-boundary\" />\n    <text x=\"732\" y=\"72\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Subnets privadas</text>\n    <line x1=\"170\" y1=\"245\" x2=\"220\" y2=\"245\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-lb-1406)\" />\n    <line x1=\"290\" y1=\"150\" x2=\"290\" y2=\"210\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-lb-1406)\" />\n    <line x1=\"360\" y1=\"245\" x2=\"420\" y2=\"245\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-lb-1406)\" />\n    <line x1=\"590\" y1=\"220\" x2=\"665\" y2=\"145\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-lb-1406)\" />\n    <line x1=\"590\" y1=\"245\" x2=\"665\" y2=\"285\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-lb-1406)\" />\n    <line x1=\"590\" y1=\"270\" x2=\"665\" y2=\"425\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#arrow-lb-1406)\" />\n    <line x1=\"590\" y1=\"300\" x2=\"835\" y2=\"245\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-lb-1406)\" />\n    <text x=\"615\" y=\"405\" class=\"svg-label svg-label--small\">Backend C unhealthy</text>\n    <text x=\"490\" y=\"500\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNS encontra o ponto de entrada; WAF filtra; LB aplica listener/TLS/regras; health check evita backend ruim; logs alimentam investigação.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório é conceitual e defensivo, sem custo cloud. Você irá desenhar a publicação de uma aplicação web com load balancer, health checks, TLS, regras de rede, WAF e logs, e depois simular falhas comuns de troubleshooting.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam escolha de tipo de load balancer, leitura de health checks, desenho TLS e análise de erros 502/503/timeouts.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula a publicação de uma aplicação crítica em cloud com requisitos de segurança, disponibilidade, rastreabilidade e custo controlado.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada explica como decidir entre L4 e L7, onde terminar TLS, como desenhar health checks e como impedir bypass dos controles centrais.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> load balancer é ponto de publicação, distribuição, saúde, TLS, segurança e observabilidade.</li>\n    <li><strong>O que lembrar:</strong> L4 distribui conexões; L7 entende HTTP e permite roteamento por host/path.</li>\n    <li><strong>Erro comum:</strong> considerar backend saudável com health check superficial.</li>\n    <li><strong>Uso real:</strong> publicação segura em cloud combina DNS, WAF, LB, certificados, regras, logs e resposta a incidente.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, vamos estudar <strong>DNS público, DNS privado, split-horizon e service discovery</strong>. Depois de publicar serviços com load balancer, precisamos entender como nomes direcionam usuários, aplicações e serviços internos para os destinos corretos.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 4",
      "Camada 7",
      "Camada 3 para roteamento até backends"
    ],
    "tcpIpLayers": [
      "Transporte",
      "Aplicação",
      "Internet"
    ],
    "relatedProtocols": [
      "TCP",
      "UDP",
      "HTTP",
      "HTTPS",
      "TLS",
      "DNS",
      "ICMP"
    ],
    "dependsOn": [
      "DNS",
      "TLS",
      "HTTP",
      "route tables",
      "security groups",
      "NSG",
      "firewall",
      "logs"
    ],
    "enables": [
      "alta disponibilidade",
      "publicação segura",
      "autoscaling",
      "blue-green deployment",
      "WAF",
      "observabilidade"
    ]
  },
  "protocolFields": [
    {
      "field": "listener protocol/port",
      "size": "variável",
      "purpose": "Define onde o load balancer recebe tráfego.",
      "securityObservation": "Listener público indevido expõe serviço além do necessário."
    },
    {
      "field": "TLS certificate",
      "size": "variável",
      "purpose": "Prova identidade do serviço ao cliente.",
      "securityObservation": "Certificado vencido, CN/SAN incorreto ou chain incompleta causa falha de confiança."
    },
    {
      "field": "health check path",
      "size": "HTTP/TCP conforme tipo",
      "purpose": "Determina se um backend recebe tráfego.",
      "securityObservation": "Health check superficial pode ocultar falha real de dependência."
    },
    {
      "field": "target/backend",
      "size": "recurso cloud",
      "purpose": "Define servidores, IPs, containers ou funções que receberão tráfego.",
      "securityObservation": "Backends devem aceitar origem do LB, não internet direta."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Resolve DNS e abre conexão",
      "detail": "Nome público aponta para o load balancer ou alias.",
      "possibleFailure": "DNS incorreto, cache antigo ou certificado incompatível com nome."
    },
    {
      "step": 2,
      "actor": "Load balancer",
      "action": "Recebe no listener",
      "detail": "Listener valida protocolo, porta, certificado e regras.",
      "possibleFailure": "Listener ausente, TLS policy incompatível ou certificado vencido."
    },
    {
      "step": 3,
      "actor": "Health checker",
      "action": "Avalia backends",
      "detail": "Somente alvos saudáveis recebem tráfego.",
      "possibleFailure": "Health check bloqueado por firewall ou endpoint de saúde ruim."
    },
    {
      "step": 4,
      "actor": "Backend",
      "action": "Processa requisição",
      "detail": "Backend responde ao LB, que responde ao cliente.",
      "possibleFailure": "Timeout, porta errada, rota ausente, SG/NSG bloqueando ou aplicação com erro."
    },
    {
      "step": 5,
      "actor": "SIEM/Observabilidade",
      "action": "Recebe logs e métricas",
      "detail": "Access logs, WAF logs, health events e flow logs permitem investigação.",
      "possibleFailure": "Logs desabilitados, sem correlação com request ID ou retenção insuficiente."
    }
  ],
  "deepDive": {
    "mentalModel": "Load balancer é a recepção técnica do serviço: recebe tráfego, decide para onde enviar, evita alvos ruins, aplica parte da segurança e gera evidência.",
    "keyTerms": [
      "listener",
      "target group",
      "backend pool",
      "health check",
      "TLS termination",
      "TLS pass-through",
      "WAF",
      "sticky session",
      "timeout",
      "access logs"
    ],
    "limitations": [
      "Não corrige aplicação sem estado mal desenhada.",
      "Não substitui autenticação e autorização.",
      "Não protege backend exposto diretamente.",
      "Não resolve DNS incorreto ou certificado vencido sem gestão operacional.",
      "Pode aumentar custo de tráfego, logs e processamento."
    ],
    "whenToUse": [
      "Use L7 para HTTP/HTTPS com roteamento por host/path, WAF e TLS centralizado.",
      "Use L4 para tráfego TCP/UDP, baixa latência ou protocolos não HTTP.",
      "Use health checks específicos para readiness real.",
      "Use logs e métricas para investigação e capacity planning."
    ],
    "whenNotToUse": [
      "Não use L7 para protocolo que ele não entende.",
      "Não exponha backend diretamente se o LB é ponto oficial de entrada.",
      "Não use sticky session para mascarar aplicação stateful mal planejada sem entender impacto.",
      "Não faça health check autenticado com segredo exposto."
    ],
    "operationalImpact": [
      "Exige gestão de certificados, DNS, health checks, logs, métricas, timeouts e regras.",
      "Pode virar dependência crítica de publicação.",
      "Mudanças em WAF e listener precisam de processo de teste e rollback."
    ],
    "financialImpact": [
      "Pode gerar custo por hora, LCU/capacidade, dados processados, regras WAF, logs e tráfego inter-zona/inter-região.",
      "Health checks e logs excessivos podem aumentar custos indiretos.",
      "CDN pode reduzir egress de origem, mas adiciona camada operacional."
    ],
    "securityImpact": [
      "Reduz exposição de backends quando bem desenhado.",
      "Centraliza TLS e WAF, mas cria ponto de bypass se backends continuam públicos.",
      "Gera logs valiosos para SOC quando habilitado e retido."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Liberar backend para 0.0.0.0/0 porque o load balancer já existe.",
      "whyItHappens": "Confusão entre publicar serviço e proteger caminho real.",
      "consequence": "Atacante pode bypassar WAF e regras do LB.",
      "correction": "Permitir no backend apenas origem do LB, subnet autorizada ou grupo adequado."
    },
    {
      "mistake": "Usar health check que sempre retorna 200.",
      "whyItHappens": "Desejo de evitar falso negativo.",
      "consequence": "LB envia tráfego para backend incapaz de atender usuário real.",
      "correction": "Criar endpoint de readiness que valide dependências críticas de forma segura."
    },
    {
      "mistake": "Terminar TLS no LB e enviar HTTP para backend sem avaliar risco.",
      "whyItHappens": "Busca por simplicidade operacional.",
      "consequence": "Tráfego interno fica em claro em caminho que talvez não seja confiável o bastante.",
      "correction": "Avaliar re-encryption ou TLS fim a fim quando risco, compliance ou arquitetura exigirem."
    },
    {
      "mistake": "Não habilitar access logs.",
      "whyItHappens": "Economia ou desconhecimento.",
      "consequence": "Investigações ficam sem usuário, path, status, target e tempo de resposta.",
      "correction": "Definir retenção, formato, destino e correlação com SIEM desde o desenho."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Erro 502/503 intermitente",
      "Certificado inválido",
      "Backend unhealthy",
      "Timeout no cliente",
      "WAF bloqueando falso positivo",
      "Usuários de uma região com maior latência"
    ],
    "diagnosticQuestions": [
      "DNS aponta para o LB correto?",
      "Listener existe na porta esperada?",
      "Certificado cobre o nome acessado?",
      "Health check chega ao backend?",
      "Security Group/NSG permite origem do LB?",
      "Backend escuta na porta esperada?",
      "Logs do LB mostram target, status e latência?"
    ],
    "commands": [
      {
        "platform": "Linux",
        "command": "curl -vk https://app.exemplo.com/health",
        "purpose": "Validar TLS, resposta HTTP e caminho público.",
        "expectedObservation": "Certificado apresentado, handshake concluído e status esperado.",
        "interpretation": "Falha aqui pode indicar DNS, TLS, WAF, LB ou aplicação."
      },
      {
        "platform": "Linux",
        "command": "openssl s_client -connect app.exemplo.com:443 -servername app.exemplo.com",
        "purpose": "Inspecionar certificado e cadeia TLS.",
        "expectedObservation": "Certificate chain e CN/SAN compatíveis.",
        "interpretation": "Erro de verify, nome ou chain aponta problema de certificado."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection app.exemplo.com -Port 443",
        "purpose": "Validar conectividade TCP até o endpoint publicado.",
        "expectedObservation": "TcpTestSucceeded: True.",
        "interpretation": "Se falhar, verificar DNS, rota, firewall local, WAF/LB e publicação."
      },
      {
        "platform": "AWS CLI",
        "command": "aws elbv2 describe-target-health --target-group-arn <arn>",
        "purpose": "Ver saúde dos targets em um target group.",
        "expectedObservation": "Targets em estado healthy.",
        "interpretation": "Unhealthy exige investigar health check, rota, SG, porta e aplicação."
      },
      {
        "platform": "Azure CLI",
        "command": "az network application-gateway show-backend-health --name <gateway> --resource-group <rg>",
        "purpose": "Ver saúde de backends no Application Gateway.",
        "expectedObservation": "Backends saudáveis e probes bem-sucedidos.",
        "interpretation": "Falha indica problema de probe, certificado, rota, NSG ou aplicação."
      }
    ],
    "decisionTree": [
      {
        "if": "Cliente recebe erro de certificado",
        "then": "Verificar nome DNS, certificado no listener, cadeia, expiração e política TLS."
      },
      {
        "if": "Todos os targets estão unhealthy",
        "then": "Verificar health check path, porta, SG/NSG, rota, firewall do host e resposta local da aplicação."
      },
      {
        "if": "Apenas um target falha",
        "then": "Comparar versão, logs, porta, dependências, CPU/memória e configuração daquele backend."
      },
      {
        "if": "Erro aparece só em paths específicos",
        "then": "Investigar regra L7, WAF, aplicação, autenticação e backend pool associado."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Permitir tráfego para backends apenas a partir do load balancer ou caminho autorizado.",
      "Usar TLS policy aprovada e monitorar expiração de certificados.",
      "Habilitar access logs, WAF logs e métricas de health check.",
      "Separar load balancers públicos e internos.",
      "Testar WAF em modo monitor antes de bloquear quando aplicável.",
      "Definir health checks que representem prontidão real sem expor dados sensíveis."
    ],
    "badPractices": [
      "Expor backends diretamente na internet.",
      "Usar certificado manual sem renovação controlada.",
      "Desabilitar logs para reduzir custo sem avaliar impacto investigativo.",
      "Colocar health check em endpoint que sempre retorna sucesso.",
      "Usar HTTP interno sem avaliação de risco."
    ],
    "commonErrors": [
      "Confundir balanceamento com autorização.",
      "Achar que WAF corrige aplicação vulnerável.",
      "Confundir 503 de health check com problema de DNS.",
      "Ignorar timeouts e limites do LB no desenho de APIs longas."
    ],
    "vulnerabilities": [
      {
        "name": "Bypass de ponto de entrada",
        "description": "Backend aceita tráfego direto, contornando WAF/LB.",
        "defensiveExplanation": "Atacante pode acessar IP público ou rota alternativa e evitar controles centrais.",
        "mitigation": "Backends privados, regras restritivas, validação de origem e monitoramento de fluxos diretos."
      },
      {
        "name": "TLS mal configurado",
        "description": "Certificado vencido, cipher fraco ou chain incorreta.",
        "defensiveExplanation": "Usuários perdem confiança e integrações quebram.",
        "mitigation": "Certificados gerenciados, alerta de expiração, TLS policy moderna e testes automatizados."
      },
      {
        "name": "Health check enganoso",
        "description": "Alvo saudável para o LB, mas incapaz de atender usuário.",
        "defensiveExplanation": "Incidente intermitente fica difícil de diagnosticar.",
        "mitigation": "Readiness real, dependências críticas e métricas de erro por target."
      }
    ],
    "monitoring": [
      "Taxa de 4xx/5xx por listener e target.",
      "Targets unhealthy e mudança de estado.",
      "Handshake TLS e erro de certificado.",
      "WAF blocks e false positives.",
      "Latência do LB e do backend.",
      "Picos de requests por IP, país, ASN ou path."
    ],
    "hardening": [
      "Bloquear acesso direto aos backends.",
      "Restringir protocolos e TLS policy.",
      "Habilitar logs e retenção.",
      "Aplicar WAF onde há HTTP público crítico.",
      "Usar IaC e revisão para listeners públicos."
    ],
    "detectionIdeas": [
      "Detectar backend recebendo origem diferente do LB.",
      "Alertar certificado próximo de expirar.",
      "Alertar target unhealthy em múltiplas AZs.",
      "Detectar aumento de 502/503 por deploy.",
      "Correlacionar WAF blocks com IP, URI e autenticação."
    ]
  },
  "lab": {
    "id": "lab-14.6",
    "title": "Projetando publicação segura com load balancer, health check e TLS",
    "labType": "cloud",
    "objective": "Criar um desenho defensivo para publicar uma aplicação web em cloud com LB, WAF, TLS, health checks, backends privados, logs e plano de troubleshooting.",
    "scenario": "Uma empresa publicará um portal de atendimento externo. A aplicação roda em duas zonas, usa backends privados e precisa de HTTPS, logs para SIEM e capacidade de deploy seguro.",
    "topology": "Usuário -> DNS -> CDN/WAF opcional -> Load Balancer HTTPS -> backends privados em duas zonas -> logs/SIEM.",
    "architecture": "Load balancer público L7, backends privados, regras permitindo apenas origem do LB, health check de readiness, TLS no listener e re-encryption quando exigido.",
    "prerequisites": [
      "Conhecer HTTP/HTTPS e TLS do módulo 8.",
      "Conhecer rotas e controles cloud das aulas 14.4 e 14.5.",
      "Conhecer logs e SIEM do módulo 13."
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Opcional: draw.io offline ou papel",
      "Opcional: terminal para comandos de validação conceitual"
    ],
    "estimatedTimeMinutes": 80,
    "cost": "zero",
    "safetyNotes": [
      "Não provisionar recursos reais sem orçamento e política de limpeza.",
      "Não usar domínio real sem autorização.",
      "Não expor IPs, certificados ou logs sensíveis em evidências públicas."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir tipo de LB",
        "instruction": "Escolha L4 ou L7 para portal HTTPS com roteamento por path e possível WAF.",
        "command": "Arquitetura: L7 Application Load Balancer / Application Gateway / HTTPS Load Balancer",
        "expectedOutput": "Justificativa: L7 porque há HTTP, TLS, path/host e WAF.",
        "explanation": "A escolha de camada define quais regras e logs estarão disponíveis."
      },
      {
        "number": 2,
        "title": "Desenhar fluxo principal",
        "instruction": "Escreva o fluxo DNS -> WAF -> LB -> backend privado -> logs.",
        "command": "Fluxo: app.exemplo.com -> WAF/CDN -> HTTPS listener 443 -> target group app-8080 -> SIEM",
        "expectedOutput": "Fluxo completo com nomes dos componentes.",
        "explanation": "Isso evita confundir ponto público, backend e observabilidade."
      },
      {
        "number": 3,
        "title": "Definir TLS",
        "instruction": "Escolha onde TLS termina e se haverá re-encryption até o backend.",
        "command": "TLS: cliente->LB HTTPS; LB->backend HTTPS se compliance exigir; certificado gerenciado no LB",
        "expectedOutput": "Decisão documentada com risco e justificativa.",
        "explanation": "TLS termination simplifica operação, mas pode exigir criptografia até backend em ambientes sensíveis."
      },
      {
        "number": 4,
        "title": "Definir health check",
        "instruction": "Crie um endpoint de health check que valide prontidão sem expor segredo.",
        "command": "GET /ready retorna 200 apenas se aplicação e dependências essenciais estiverem prontas",
        "expectedOutput": "Critério de sucesso e falha documentados.",
        "explanation": "Readiness evita mandar tráfego para backend que responde, mas não atende usuário."
      },
      {
        "number": 5,
        "title": "Definir regras de rede",
        "instruction": "Escreva regras mínimas para LB e backends.",
        "command": "LB inbound: internet 443; backend inbound: origem LB porta 8080/8443; admin: sem internet direta",
        "expectedOutput": "Backends não aceitam origem 0.0.0.0/0.",
        "explanation": "O objetivo é impedir bypass do ponto oficial de entrada."
      },
      {
        "number": 6,
        "title": "Definir logs e alertas",
        "instruction": "Liste logs e métricas necessários para SOC e operação.",
        "command": "Access logs, WAF logs, target health, 4xx/5xx, TLS errors, flow logs, deploy markers",
        "expectedOutput": "Plano de telemetria com destino e retenção.",
        "explanation": "Sem logs, publicação segura não é auditável nem investigável."
      },
      {
        "number": 7,
        "title": "Simular falhas",
        "instruction": "Crie três cenários de falha e como investigá-los.",
        "command": "Cenários: certificado vencido; todos targets unhealthy; 503 após deploy",
        "expectedOutput": "Para cada cenário: hipótese, evidência e ação de contenção.",
        "explanation": "Isso treina troubleshooting antes do incidente real."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um desenho completo de publicação segura com LB, TLS, health checks, regras de rede, logs e playbook de troubleshooting.",
    "validation": [
      {
        "check": "Backends privados",
        "command": "Revisar matriz de regras",
        "expected": "Backends aceitam apenas origem do LB ou rede autorizada.",
        "ifFails": "Remover origem 0.0.0.0/0 e documentar exceção se existir."
      },
      {
        "check": "TLS definido",
        "command": "Revisar desenho de certificados",
        "expected": "Certificado gerenciado, política TLS e renovação documentadas.",
        "ifFails": "Adicionar owner, alerta de expiração e processo de rotação."
      },
      {
        "check": "Health check útil",
        "command": "Revisar endpoint /ready",
        "expected": "Health check reflete prontidão real sem segredo.",
        "ifFails": "Separar liveness de readiness e ajustar dependências."
      },
      {
        "check": "Logs suficientes",
        "command": "Revisar plano de telemetria",
        "expected": "Access logs, WAF logs e métricas de target health enviados para observabilidade/SIEM.",
        "ifFails": "Adicionar destino, retenção, owner e alerta."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Todos os backends unhealthy",
        "probableCause": "Health check bloqueado por SG/NSG, porta errada ou endpoint incorreto.",
        "howToConfirm": "Verificar logs de health check, porta da aplicação e regras inbound.",
        "fix": "Permitir origem do LB na porta correta e ajustar endpoint."
      },
      {
        "symptom": "Erro de certificado",
        "probableCause": "Certificado vencido, nome errado ou cadeia incompleta.",
        "howToConfirm": "Testar com openssl s_client ou navegador e revisar listener.",
        "fix": "Instalar certificado correto e automatizar renovação."
      },
      {
        "symptom": "502 após deploy",
        "probableCause": "Aplicação não escuta na porta esperada ou resposta inválida ao LB.",
        "howToConfirm": "Comparar target health, logs do backend e versão implantada.",
        "fix": "Rollback, ajuste de porta ou correção do container/app."
      },
      {
        "symptom": "WAF bloqueia usuário legítimo",
        "probableCause": "Regra agressiva ou falso positivo.",
        "howToConfirm": "Correlacionar WAF log com request ID, URI e IP.",
        "fix": "Tuning controlado, exceção específica e revisão de regra."
      }
    ],
    "improvements": [
      "Adicionar blue/green deployment.",
      "Adicionar canary release com métricas.",
      "Adicionar WAF em modo monitor antes de bloqueio.",
      "Adicionar mTLS para APIs internas sensíveis.",
      "Adicionar CDN para reduzir latência e egress de origem."
    ],
    "evidenceToCollect": [
      "Diagrama final",
      "Matriz de fluxos",
      "Decisão de TLS",
      "Definição de health check",
      "Plano de logs",
      "Três cenários de troubleshooting"
    ],
    "questions": [
      "Por que L7 é melhor que L4 neste portal?",
      "O backend precisa ser público?",
      "O health check mede liveness ou readiness?",
      "Qual log prova que uma requisição chegou ao backend?"
    ],
    "challenge": "Adapte o desenho para uma API interna que deve ser acessada apenas por serviços de uma VNet/VPC privada e por pipeline autorizado.",
    "solution": "Use load balancer interno ou private endpoint conforme provedor, sem DNS público, com TLS interno, autenticação de serviço, regras restritas por origem, logs e política IaC impedindo exposição pública."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que load balancer não deve ser visto apenas como divisor de carga?",
      "hints": [
        "Pense em TLS, WAF, logs e health checks.",
        "Pense em publicação segura."
      ],
      "expectedIdeas": [
        "ponto de entrada",
        "segurança",
        "observabilidade",
        "disponibilidade"
      ],
      "explanation": "Em cloud, LB participa de arquitetura, segurança e operação."
    },
    {
      "type": "diagnóstico",
      "question": "Todos os targets ficaram unhealthy após mudança de segurança. O que você verifica primeiro?",
      "hints": [
        "Health check tem origem específica.",
        "Verifique porta e SG/NSG."
      ],
      "expectedIdeas": [
        "health check",
        "porta",
        "origem do LB",
        "firewall",
        "endpoint"
      ],
      "explanation": "A primeira hipótese forte é bloqueio ou endpoint de health check errado."
    },
    {
      "type": "cenário real",
      "question": "Uma aplicação exige compliance forte. TLS deve terminar no LB ou seguir até o backend?",
      "hints": [
        "Pense em risco do caminho interno.",
        "Pense em operação de certificados."
      ],
      "expectedIdeas": [
        "TLS termination",
        "re-encryption",
        "pass-through",
        "compliance",
        "observabilidade"
      ],
      "explanation": "A decisão depende de risco, requisitos, capacidade de inspeção e operação."
    }
  ],
  "quiz": [
    {
      "id": "q14.6.1",
      "type": "conceito",
      "q": "Qual é uma diferença central entre load balancer L4 e L7?",
      "opts": [
        "L4 entende conexões/portas; L7 entende HTTP como host e path.",
        "L4 só funciona em Wi-Fi.",
        "L7 não suporta TLS.",
        "L4 sempre substitui DNS."
      ],
      "a": 0,
      "exp": "L4 opera em transporte; L7 entende elementos de aplicação como HTTP.",
      "difficulty": "intermediário",
      "topic": "camadas"
    },
    {
      "id": "q14.6.2",
      "type": "segurança",
      "q": "Qual prática reduz risco de bypass do WAF/LB?",
      "opts": [
        "Permitir acesso direto aos backends pela internet.",
        "Permitir nos backends apenas origem do load balancer.",
        "Desabilitar access logs.",
        "Usar health check que sempre retorna 200."
      ],
      "a": 1,
      "exp": "Backends privados e restritos ao LB impedem contornar o ponto oficial de entrada.",
      "difficulty": "intermediário",
      "topic": "exposição"
    },
    {
      "id": "q14.6.3",
      "type": "diagnóstico",
      "q": "Todos os targets estão unhealthy. Qual hipótese deve ser testada cedo?",
      "opts": [
        "Health check bloqueado por SG/NSG ou endpoint incorreto.",
        "Usuário digitou senha errada.",
        "DNS reverso ausente sempre causa unhealthy.",
        "O WAF sempre é a causa."
      ],
      "a": 0,
      "exp": "Health check depende de porta, rota, regras e endpoint correto.",
      "difficulty": "intermediário",
      "topic": "health check"
    },
    {
      "id": "q14.6.4",
      "type": "tls",
      "q": "O que é TLS termination no load balancer?",
      "opts": [
        "O cliente encerra a aplicação.",
        "O LB negocia TLS com o cliente e pode encaminhar tráfego descriptografado ou recriptografado ao backend.",
        "O DNS criptografa pacotes IP.",
        "O backend nunca vê requisições."
      ],
      "a": 1,
      "exp": "TLS termina no LB quando ele apresenta certificado e descriptografa a conexão de entrada.",
      "difficulty": "intermediário",
      "topic": "TLS"
    },
    {
      "id": "q14.6.5",
      "type": "devsecops",
      "q": "Qual guardrail de pipeline é útil para publicação segura?",
      "opts": [
        "Permitir listener público HTTP sem justificativa.",
        "Exigir logs, TLS policy aprovada e backend privado para serviços internet-facing.",
        "Ignorar certificado porque cloud é segura.",
        "Remover health checks para evitar falhas."
      ],
      "a": 1,
      "exp": "Guardrails devem impedir padrões inseguros antes do deploy.",
      "difficulty": "intermediário",
      "topic": "policy as code"
    },
    {
      "id": "q14.6.6",
      "type": "cloud",
      "q": "Por que health check precisa representar readiness real?",
      "opts": [
        "Para garantir que o alvo consiga atender usuários, não apenas responder qualquer 200.",
        "Para aumentar custo de DNS.",
        "Para substituir autenticação.",
        "Para impedir logs."
      ],
      "a": 0,
      "exp": "Um alvo pode estar vivo, mas sem dependências críticas; readiness mede prontidão de atendimento.",
      "difficulty": "intermediário",
      "topic": "resiliência"
    }
  ],
  "flashcards": [
    {
      "id": "fc14.6.1",
      "front": "O que é listener?",
      "back": "Configuração do load balancer que recebe conexões em protocolo e porta específicos.",
      "tags": [
        "load balancer"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.6.2",
      "front": "O que é target group/backend pool?",
      "back": "Conjunto de backends que podem receber tráfego do load balancer.",
      "tags": [
        "backend"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.6.3",
      "front": "O que é health check?",
      "back": "Teste usado pelo LB para decidir se um backend pode receber tráfego.",
      "tags": [
        "health check"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.6.4",
      "front": "L4 vs L7?",
      "back": "L4 entende transporte como TCP/UDP; L7 entende aplicação como HTTP, host e path.",
      "tags": [
        "camadas"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.6.5",
      "front": "Risco de backend público?",
      "back": "Permite bypass do load balancer, WAF e logs centrais.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.6.6",
      "front": "TLS termination é sempre suficiente?",
      "back": "Não. Alguns cenários exigem re-encryption ou TLS fim a fim por risco ou compliance.",
      "tags": [
        "TLS"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex14.6.1",
      "type": "arquitetura",
      "prompt": "Escolha L4 ou L7 para uma API HTTPS com roteamento por /api e /admin.",
      "expectedAnswer": "L7, pois precisa entender HTTP path e pode integrar WAF e TLS termination.",
      "explanation": "L4 não entende path HTTP."
    },
    {
      "id": "ex14.6.2",
      "type": "diagnóstico",
      "prompt": "Targets unhealthy após endurecimento de SG. Liste três verificações.",
      "expectedAnswer": "Origem do health checker/LB permitida, porta correta, endpoint /health ou /ready respondendo, rota e firewall do host.",
      "explanation": "Health check falha por caminho, porta, aplicação ou controle de rede."
    },
    {
      "id": "ex14.6.3",
      "type": "segurança",
      "prompt": "Explique por que backend não deve aceitar tráfego 0.0.0.0/0.",
      "expectedAnswer": "Porque permite acesso direto e bypass de WAF, LB, logs e políticas centrais.",
      "explanation": "O backend deve ser privado ou restrito ao LB."
    },
    {
      "id": "ex14.6.4",
      "type": "devsecops",
      "prompt": "Crie três políticas IaC para load balancer público.",
      "expectedAnswer": "Exigir HTTPS/TLS policy aprovada, access logs habilitados e backends privados/restritos ao LB.",
      "explanation": "Políticas evitam exposição insegura por automação."
    }
  ],
  "challenge": {
    "title": "Publicar portal externo com segurança e disponibilidade",
    "scenario": "Uma empresa precisa publicar um portal HTTPS com duas zonas, WAF, backends privados, logs para SIEM e deploy sem indisponibilidade.",
    "tasks": [
      "Escolher tipo de load balancer.",
      "Definir TLS e certificado.",
      "Definir health check.",
      "Criar matriz de fluxos.",
      "Definir logs e alertas.",
      "Criar plano de troubleshooting para 502/503/certificado."
    ],
    "constraints": [
      "Backends não podem ser públicos.",
      "Deve haver HTTPS para clientes.",
      "Logs precisam ser retidos por 90 dias.",
      "Mudanças devem ser feitas por IaC.",
      "Custo deve ser controlado."
    ],
    "expectedDeliverables": [
      "Diagrama",
      "Matriz de fluxos",
      "Decisão TLS",
      "Definição de health check",
      "Plano de logs",
      "Playbook de troubleshooting"
    ],
    "gradingRubric": [
      {
        "criterion": "Segurança de exposição",
        "points": 25,
        "description": "Backends privados e tráfego permitido apenas pelo LB."
      },
      {
        "criterion": "TLS e certificados",
        "points": 20,
        "description": "Política TLS, certificado e renovação bem definidos."
      },
      {
        "criterion": "Health checks",
        "points": 20,
        "description": "Readiness coerente com aplicação e dependências."
      },
      {
        "criterion": "Observabilidade",
        "points": 20,
        "description": "Logs, métricas e alertas suficientes para SOC/operação."
      },
      {
        "criterion": "Troubleshooting",
        "points": 15,
        "description": "Playbook cobre falhas comuns com evidências."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Começamos pela natureza do serviço: HTTP/HTTPS público com necessidade de WAF e roteamento. Isso aponta para L7. Depois protegemos backends, definimos TLS, validamos saúde real e garantimos evidência.",
    "steps": [
      "Usar load balancer L7 público com listener HTTPS.",
      "Associar certificado gerenciado e política TLS aprovada.",
      "Colocar backends em subnets privadas.",
      "Permitir no backend apenas origem do LB na porta da aplicação.",
      "Criar health check /ready que valide dependências críticas sem expor segredo.",
      "Habilitar WAF em modo monitor e depois bloqueio gradual.",
      "Enviar access logs, WAF logs, target health e métricas para observabilidade/SIEM.",
      "Criar playbooks para certificado, 502, 503 e backend unhealthy."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Publicar cada VM diretamente com IP público.",
        "whyItIsWrong": "Aumenta exposição, dificulta TLS/logs e contorna controles centrais."
      },
      {
        "answer": "Usar health check que sempre retorna 200.",
        "whyItIsWrong": "Não mede prontidão real e mascara falhas."
      },
      {
        "answer": "Desabilitar logs para reduzir custo.",
        "whyItIsWrong": "Economia pequena pode destruir capacidade de investigação."
      }
    ],
    "finalAnswer": "A arquitetura recomendada usa L7 público com HTTPS, WAF, backends privados, regras restritas ao LB, health check de readiness, logs centralizados, TLS gerenciado e guardrails IaC."
  },
  "glossary": [
    {
      "term": "Load Balancer",
      "shortDefinition": "Componente que distribui tráfego entre backends.",
      "longDefinition": "Serviço ou appliance que recebe tráfego em um ponto de entrada e encaminha para alvos elegíveis conforme regras e saúde.",
      "example": "Application Load Balancer publicando uma API em duas zonas.",
      "relatedTerms": [
        "listener",
        "target group",
        "health check"
      ],
      "relatedLessons": [
        "14.6"
      ]
    },
    {
      "term": "Listener",
      "shortDefinition": "Porta e protocolo de entrada do load balancer.",
      "longDefinition": "Configuração que define como o LB recebe conexões, como HTTPS 443.",
      "example": "Listener HTTPS com certificado gerenciado.",
      "relatedTerms": [
        "TLS",
        "certificado"
      ],
      "relatedLessons": [
        "14.6"
      ]
    },
    {
      "term": "Health Check",
      "shortDefinition": "Teste de saúde dos backends.",
      "longDefinition": "Verificação periódica que decide se um alvo pode receber tráfego.",
      "example": "GET /ready retorna 200 quando aplicação está pronta.",
      "relatedTerms": [
        "readiness",
        "target group"
      ],
      "relatedLessons": [
        "14.6"
      ]
    },
    {
      "term": "TLS termination",
      "shortDefinition": "Encerramento da sessão TLS no load balancer.",
      "longDefinition": "O LB apresenta certificado ao cliente e descriptografa a conexão de entrada antes de encaminhar ao backend.",
      "example": "HTTPS cliente->ALB e HTTP/HTTPS ALB->backend.",
      "relatedTerms": [
        "re-encryption",
        "pass-through"
      ],
      "relatedLessons": [
        "14.6"
      ]
    },
    {
      "term": "WAF",
      "shortDefinition": "Firewall de aplicação web.",
      "longDefinition": "Controle L7 que inspeciona requisições HTTP/HTTPS em busca de padrões maliciosos ou violações de política.",
      "example": "WAF bloqueando tentativa de SQL injection em rota pública.",
      "relatedTerms": [
        "HTTP",
        "L7"
      ],
      "relatedLessons": [
        "13.4",
        "14.6"
      ]
    },
    {
      "term": "Backend pool",
      "shortDefinition": "Conjunto de servidores atrás do LB.",
      "longDefinition": "Grupo de alvos que recebem tráfego quando estão saudáveis.",
      "example": "Duas instâncias em subnets privadas registradas no pool.",
      "relatedTerms": [
        "target group",
        "health check"
      ],
      "relatedLessons": [
        "14.6"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Elastic Load Balancing Documentation",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/elasticloadbalancing/",
      "note": "Documentação geral de ELB, tipos de LB e health checks."
    },
    {
      "type": "official-doc",
      "title": "Listeners for your Application Load Balancers",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-listeners.html",
      "note": "Listeners, regras e roteamento do ALB."
    },
    {
      "type": "official-doc",
      "title": "Create an HTTPS listener for your Application Load Balancer",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html",
      "note": "TLS termination e certificados no ALB."
    },
    {
      "type": "official-doc",
      "title": "Azure Application Gateway health probes overview",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/application-gateway/application-gateway-probe-overview",
      "note": "Health probes e roteamento para backends saudáveis."
    },
    {
      "type": "official-doc",
      "title": "Azure Load Balancer health probes",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/load-balancer/load-balancer-custom-probe-overview",
      "note": "Health probes do Azure Load Balancer e origem de probe."
    },
    {
      "type": "official-doc",
      "title": "Cloud Load Balancing health checks",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/load-balancing/docs/health-check-concepts",
      "note": "Conceitos de health checks no Google Cloud."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.x",
      "reason": "TLS, HTTP e HTTPS são base para load balancers L7."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "Logs e SIEM são essenciais para investigação de publicação cloud."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m10",
      "lesson": "10.x",
      "reason": "Pipelines e IaC devem criar e validar load balancers com guardrails."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
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
      "14.7"
    ]
  }
};
