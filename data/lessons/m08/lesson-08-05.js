export const lesson0805 = {
  "id": "8.5",
  "moduleId": "m08",
  "order": 5,
  "title": "Proxies, reverse proxies, WAFs e load balancers HTTP",
  "subtitle": "Entenda como tráfego HTTP/HTTPS é encaminhado, terminado, inspecionado, balanceado e protegido por proxies, reverse proxies, WAFs, API gateways e load balancers em arquiteturas corporativas e cloud.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "redes",
    "http",
    "https",
    "proxy",
    "reverse proxy",
    "waf",
    "load balancer",
    "api gateway",
    "tls termination",
    "headers",
    "segurança",
    "cloud",
    "devsecops",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.1",
      "title": "Por que HTTP existe",
      "reason": "Proxies e balanceadores operam sobre requisições e respostas HTTP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.2",
      "title": "Requisições e respostas: métodos, URLs, headers, body e status codes",
      "reason": "É necessário entender métodos, URLs, headers, body e status codes para diagnosticar intermediários HTTP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.3",
      "title": "HTTPS, TLS, certificados, SNI e cadeia de confiança",
      "reason": "Reverse proxies e load balancers frequentemente fazem TLS termination ou recriptografia."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.4",
      "title": "Cookies, sessões, tokens e estado em aplicações web",
      "reason": "Balanceadores, WAFs e proxies podem afetar cookies, sessões, headers e autenticação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.7",
      "title": "NAT, PAT, firewalls stateful e rastreamento de conexão",
      "reason": "Intermediários HTTP coexistem com NAT, firewall, tabelas de estado e logs de rede."
    }
  ],
  "objectives": [
    "Diferenciar proxy direto, reverse proxy, WAF, load balancer HTTP, API gateway e ingress controller.",
    "Explicar por que empresas colocam intermediários HTTP entre clientes e aplicações.",
    "Entender TLS termination, TLS passthrough, recriptografia, SNI e roteamento por host/path.",
    "Analisar headers de encaminhamento como Host, X-Forwarded-For, X-Forwarded-Proto, Forwarded e X-Request-ID.",
    "Reconhecer riscos de bypass, spoofing de headers, WAF mal posicionado, health checks inseguros e logs sensíveis.",
    "Diagnosticar falhas HTTP envolvendo proxy, WAF, load balancer, backend, certificados, sessão, rota e status codes 502/503/504."
  ],
  "learningOutcomes": [
    "Desenhar o caminho HTTP entre cliente, DNS, CDN, WAF, load balancer, proxy reverso e backend.",
    "Explicar onde TLS pode terminar e quais são os impactos de segurança e observabilidade.",
    "Ler headers e logs de intermediários sem vazar cookies, tokens ou IPs sensíveis desnecessariamente.",
    "Separar falhas de aplicação de falhas de proxy, WAF, balanceamento, health check e backend.",
    "Montar uma matriz defensiva de publicação HTTP/HTTPS com controles, donos, logs e critérios de validação."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Uma aplicação web raramente é exposta diretamente na Internet em ambientes corporativos. Entre o navegador e o backend normalmente existem DNS, CDN, WAF, reverse proxy, load balancer, API gateway, firewall, NAT, ingress controller, service mesh e coletores de logs. Cada componente resolve um problema real: disponibilidade, segurança, distribuição de carga, roteamento por domínio, centralização TLS, observabilidade e controle de acesso.</p>\n  <p>Sem esses intermediários, cada aplicação teria que lidar sozinha com certificados, IP público, rate limit, bloqueio de ataques, compressão, logs, roteamento de múltiplos domínios, blue/green deployment e failover. Isso não escala operacionalmente e aumenta muito o risco de exposição incorreta.</p>\n  <div class='callout'><strong>Ideia central:</strong> proxies, WAFs e load balancers transformam publicação HTTP em uma arquitetura controlada, observável e defensável.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No início da Web, um servidor HTTP podia receber conexões diretamente dos clientes. Conforme sites cresceram, surgiu a necessidade de cache, distribuição de carga, alta disponibilidade e proteção contra tráfego malicioso. Proxies diretos ajudaram redes corporativas a controlar navegação de usuários; reverse proxies ajudaram servidores a publicar múltiplas aplicações atrás de um ponto comum.</p>\n  <p>Com comércio eletrônico, SaaS e APIs, o papel dos intermediários aumentou. Load balancers passaram a distribuir tráfego entre backends. WAFs começaram a aplicar regras de segurança em camada de aplicação. CDNs aproximaram conteúdo dos usuários. API gateways adicionaram autenticação, rate limit, versionamento e políticas de consumo.</p>\n  <p>Em cloud e Kubernetes, esse padrão virou padrão operacional: ALB, Application Gateway, Cloud Load Balancing, Ingress, service mesh e gateways gerenciados são formas modernas de aplicar os mesmos princípios em escala elástica.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema não é apenas “receber HTTP”. O problema é publicar uma aplicação para muitos usuários, com disponibilidade, segurança, certificado correto, roteamento correto, logs, proteção contra abuso, controle de versão, manutenção sem indisponibilidade e isolamento entre backends.</p>\n  <p>Se cada backend for exposto diretamente, a empresa perde controle central. Certificados ficam espalhados, logs ficam inconsistentes, regras de firewall se multiplicam, headers sensíveis podem vazar, mudanças são difíceis de auditar e aplicações antigas podem continuar acessíveis por caminhos não documentados.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> publicar HTTP/HTTPS com segurança exige separar entrada pública, inspeção, roteamento, balanceamento, estado, logs e backend.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>A evolução passou por servidores web diretos, proxies de cache, reverse proxies, load balancers L4, load balancers L7, WAFs, CDNs, API gateways e malhas de serviço. Cada etapa adicionou um nível de controle.</p>\n  <p>No load balancing L4, a decisão costuma usar IP e porta. No L7, o dispositivo entende HTTP: host, path, headers, cookies, método e status. Isso permite rotear <code>api.exemplo.com/v1</code> para um backend e <code>app.exemplo.com</code> para outro, aplicar regras de segurança por endpoint e coletar logs com contexto de aplicação.</p>\n  <p>Em ambientes modernos, a evolução também trouxe automação: certificados emitidos automaticamente, regras descritas em IaC, deploy via pipeline, WAF policy as code, tracing distribuído e observabilidade integrada.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>Proxy direto</strong> fica do lado do cliente e controla a saída dele para a Internet. <strong>Reverse proxy</strong> fica do lado do servidor e recebe tráfego em nome das aplicações. <strong>Load balancer</strong> distribui requisições entre múltiplos backends. <strong>WAF</strong> inspeciona HTTP para bloquear padrões maliciosos. <strong>API gateway</strong> governa APIs com autenticação, rate limit, roteamento, transformação e observabilidade.</p>\n  <div class='definition-box'>Um reverse proxy não é “só um redirecionador”. Ele pode terminar TLS, alterar headers, aplicar compressão, rotear por host/path, autenticar, bloquear, registrar logs e mascarar a topologia interna.</div>\n  <table class='comparison-table'><thead><tr><th>Componente</th><th>Problema que resolve</th><th>Exemplo de uso</th><th>Risco comum</th></tr></thead><tbody><tr><td>Proxy direto</td><td>Controlar navegação de clientes</td><td>Usuários corporativos acessando Internet</td><td>Bypass por DNS/rota alternativa</td></tr><tr><td>Reverse proxy</td><td>Publicar aplicações por domínio/path</td><td>Nginx, Caddy, Apache, Envoy</td><td>Headers incorretos e bypass ao backend</td></tr><tr><td>Load balancer L7</td><td>Distribuir e rotear HTTP</td><td>ALB, Application Gateway, Ingress</td><td>Health check fraco ou rota errada</td></tr><tr><td>WAF</td><td>Filtrar ataques HTTP conhecidos</td><td>Bloqueio de padrões de SQLi/XSS</td><td>Modo monitor eterno ou falso positivo sem processo</td></tr><tr><td>API Gateway</td><td>Governar consumo de APIs</td><td>Rate limit, JWT, versionamento</td><td>Autorização duplicada ou inconsistente</td></tr></tbody></table>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando o cliente acessa uma aplicação publicada, ele normalmente resolve o DNS para o IP público de um intermediário. Esse intermediário recebe a conexão TCP/TLS, identifica o host solicitado por SNI e/ou header <code>Host</code>, aplica políticas e escolhe um backend.</p>\n  <ol class='flow-list'>\n    <li>Cliente resolve <code>api.exemplo.com</code> via DNS.</li>\n    <li>Cliente abre TCP para <code>443</code> no endereço do proxy/load balancer/CDN.</li>\n    <li>Durante TLS, SNI indica o nome desejado antes do HTTP protegido.</li>\n    <li>O intermediário valida política, certificado, WAF, rate limit e rota HTTP.</li>\n    <li>O intermediário encaminha a requisição ao backend, preservando ou reescrevendo headers.</li>\n    <li>O backend responde ao intermediário.</li>\n    <li>O intermediário registra logs, aplica compressão/cache/política e responde ao cliente.</li>\n  </ol>\n  <p>Em TLS termination, o TLS do cliente termina no intermediário. Depois disso, o tráfego até o backend pode seguir em HTTP interno ou ser recriptografado. Em TLS passthrough, o intermediário não descriptografa o HTTP; ele encaminha a conexão para o backend, geralmente usando SNI ou regras L4.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma arquitetura HTTP corporativa típica possui camadas. Na borda, DNS público aponta para CDN, WAF ou load balancer. O WAF aplica políticas de aplicação. O load balancer distribui tráfego para um conjunto de backends. O reverse proxy interno pode rotear por host/path para serviços diferentes. Logs seguem para SIEM, métricas para observabilidade e traces para APM.</p>\n  <p>Em Kubernetes, o Ingress Controller ou Gateway API executa papel semelhante: recebe tráfego HTTP/HTTPS, termina TLS, aplica regras por host/path e envia para Services. Em service mesh, proxies sidecar ou gateways podem aplicar mTLS, retries, timeouts, circuit breaking e telemetria.</p>\n  <p>Em cloud, serviços gerenciados como Application Load Balancer, Azure Application Gateway, Cloud Load Balancing, API Gateway e WAF reduzem operação direta, mas não eliminam responsabilidade de desenho: certificados, regras, logs, escopo público/privado, integração com DNS e política de segurança continuam sendo decisões críticas.</p>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense em um prédio corporativo. O visitante não entra diretamente na sala do time de engenharia. Ele passa pela recepção, identifica o destino, recebe autorização, é encaminhado ao elevador correto e suas entradas podem ser registradas. A recepção não faz o trabalho do time, mas controla a entrada, aplica regras e sabe encaminhar.</p>\n  <p>O reverse proxy é essa recepção para aplicações. O WAF é uma triagem de segurança. O load balancer é o sistema que decide qual atendente disponível receberá a demanda. O API gateway é uma recepção especializada para contratos de API, consumo, autenticação e limites.</p>\n  <div class='callout callout--warning'><strong>Limite da analogia:</strong> diferente de uma recepção humana, intermediários HTTP dependem de configuração precisa. Um header confiado indevidamente pode permitir spoofing; uma rota direta ao backend pode contornar todos os controles.</div>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você hospeda uma aplicação local na porta <code>3000</code>, mas quer acessá-la por <code>https://app.local</code>. Um reverse proxy escuta em <code>443</code>, apresenta o certificado, recebe a requisição e encaminha internamente para <code>127.0.0.1:3000</code>.</p>\n  <p>O cliente não precisa saber que a aplicação real roda em <code>3000</code>. O proxy pode adicionar <code>X-Forwarded-Proto: https</code>, <code>X-Forwarded-For</code> e <code>X-Request-ID</code>. A aplicação usa esses headers para gerar URLs corretas, registrar IP de origem real e correlacionar logs.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa publica <code>portal.empresa.com</code>, <code>api.empresa.com</code> e <code>admin.empresa.com</code>. Todos apontam para um WAF/load balancer. O WAF aplica regras diferentes para cada host. O portal aceita tráfego público. A API exige autenticação e rate limit. O admin só aceita IPs corporativos, MFA e políticas adicionais.</p>\n  <p>O load balancer envia tráfego para múltiplas instâncias saudáveis. Health checks removem backends com falha. Logs do WAF e do balanceador alimentam o SIEM. A equipe de segurança revisa regras de exposição e a equipe de plataforma gerencia certificados e rotas por IaC.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, um Application Load Balancer público pode terminar TLS e encaminhar para backends privados em sub-redes internas. Um WAF gerenciado fica associado ao load balancer. Security groups permitem que a Internet fale apenas com o ALB e que o ALB fale com os backends na porta necessária.</p>\n  <p>Em Azure, o Application Gateway com WAF pode publicar aplicações em VNets. Em AWS, ALB + WAF + ACM + Route 53 é um padrão comum. Em GCP, HTTPS Load Balancer + Cloud Armor + Managed Certificates cumpre papel semelhante. A lógica é a mesma: entrada controlada, backends privados, logs e políticas.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a publicação HTTP deve ser versionada e revisável. Regras de host/path, certificados, WAF, rate limit, CORS, headers de segurança e timeouts podem ser declarados em Terraform, Helm, manifests Kubernetes ou políticas de gateway.</p>\n  <p>Pipelines podem validar que nenhum backend fica público diretamente, que TLS mínimo está configurado, que logs estão habilitados, que <code>X-Forwarded-Proto</code> é preservado e que rotas administrativas exigem autenticação forte. Isso transforma publicação web em um processo auditável, não em configuração manual emergencial.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Um incidente comum ocorre quando o WAF protege <code>https://app.empresa.com</code>, mas o backend ainda tem IP público aceitando tráfego direto. Um atacante pode contornar o WAF e atingir a aplicação sem inspeção. Outro problema comum é confiar cegamente em <code>X-Forwarded-For</code> vindo do cliente; se o proxy não sobrescrever esse header, logs e controles baseados em IP podem ser enganados.</p>\n  <p>Boas práticas incluem bloquear acesso direto aos backends, permitir origem apenas do load balancer, sanitizar headers, habilitar logs, usar TLS forte, proteger chaves privadas, aplicar WAF em modo bloqueio com processo de falso positivo, revisar health checks e manter runbooks de troubleshooting.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> o backend deve confiar apenas em headers inseridos por intermediários controlados e alcançáveis por caminhos de rede controlados.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m08l05-title m08l05-desc'>\n    <title id='m08l05-title'>Fluxo HTTP com CDN, WAF, load balancer, reverse proxy, backends e observabilidade</title>\n    <desc id='m08l05-desc'>Diagrama mostrando cliente acessando DNS, WAF, load balancer, reverse proxy, múltiplos backends e SIEM, com TLS termination, headers e logs.</desc>\n    <defs>\n      <marker id='m08l05-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow'/>\n      </marker>\n    </defs>\n    <rect x='25' y='35' width='145' height='90' rx='14' class='svg-node svg-node--client'/>\n    <text x='97' y='75' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='97' y='100' text-anchor='middle' class='svg-label svg-label--small'>Browser/API client</text>\n    <rect x='210' y='35' width='125' height='90' rx='14' class='svg-node svg-node--cloud'/>\n    <text x='272' y='75' text-anchor='middle' class='svg-label'>DNS/CDN</text>\n    <text x='272' y='100' text-anchor='middle' class='svg-label svg-label--small'>entrada pública</text>\n    <rect x='375' y='35' width='125' height='90' rx='14' class='svg-node svg-node--firewall'/>\n    <text x='437' y='75' text-anchor='middle' class='svg-label'>WAF</text>\n    <text x='437' y='100' text-anchor='middle' class='svg-label svg-label--small'>política L7</text>\n    <rect x='540' y='35' width='145' height='90' rx='14' class='svg-node svg-node--router'/>\n    <text x='612' y='72' text-anchor='middle' class='svg-label'>Load balancer</text>\n    <text x='612' y='99' text-anchor='middle' class='svg-label svg-label--small'>TLS / host / path</text>\n    <rect x='725' y='35' width='160' height='90' rx='14' class='svg-node svg-node--server'/>\n    <text x='805' y='72' text-anchor='middle' class='svg-label'>Reverse proxy</text>\n    <text x='805' y='99' text-anchor='middle' class='svg-label svg-label--small'>headers e rota</text>\n    <rect x='130' y='230' width='150' height='85' rx='14' class='svg-node svg-node--server'/>\n    <text x='205' y='265' text-anchor='middle' class='svg-label'>Backend A</text>\n    <text x='205' y='290' text-anchor='middle' class='svg-label svg-label--small'>/api/v1</text>\n    <rect x='330' y='230' width='150' height='85' rx='14' class='svg-node svg-node--server'/>\n    <text x='405' y='265' text-anchor='middle' class='svg-label'>Backend B</text>\n    <text x='405' y='290' text-anchor='middle' class='svg-label svg-label--small'>/app</text>\n    <rect x='530' y='230' width='150' height='85' rx='14' class='svg-node svg-node--server'/>\n    <text x='605' y='265' text-anchor='middle' class='svg-label'>Backend C</text>\n    <text x='605' y='290' text-anchor='middle' class='svg-label svg-label--small'>admin</text>\n    <rect x='735' y='230' width='160' height='85' rx='14' class='svg-node svg-node--security'/>\n    <text x='815' y='265' text-anchor='middle' class='svg-label'>SIEM/APM</text>\n    <text x='815' y='290' text-anchor='middle' class='svg-label svg-label--small'>logs, traces</text>\n    <rect x='190' y='400' width='600' height='90' rx='16' class='svg-zone'/>\n    <text x='490' y='432' text-anchor='middle' class='svg-label'>Controles críticos</text>\n    <text x='490' y='462' text-anchor='middle' class='svg-label svg-label--small'>bloquear acesso direto ao backend • preservar headers confiáveis • validar TLS • registrar request ID • revisar WAF</text>\n    <line x1='170' y1='80' x2='210' y2='80' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l05-arrow)'/>\n    <line x1='335' y1='80' x2='375' y2='80' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l05-arrow)'/>\n    <line x1='500' y1='80' x2='540' y2='80' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l05-arrow)'/>\n    <line x1='685' y1='80' x2='725' y2='80' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l05-arrow)'/>\n    <line x1='785' y1='125' x2='230' y2='230' class='svg-flow svg-flow--request' marker-end='url(#m08l05-arrow)'/>\n    <line x1='805' y1='125' x2='430' y2='230' class='svg-flow svg-flow--request' marker-end='url(#m08l05-arrow)'/>\n    <line x1='825' y1='125' x2='630' y2='230' class='svg-flow svg-flow--request' marker-end='url(#m08l05-arrow)'/>\n    <line x1='612' y1='125' x2='815' y2='230' class='svg-flow svg-flow--response' marker-end='url(#m08l05-arrow)'/>\n    <line x1='437' y1='125' x2='815' y2='230' class='svg-flow svg-flow--response' marker-end='url(#m08l05-arrow)'/>\n    <line x1='605' y1='315' x2='735' y2='272' class='svg-flow svg-flow--response' marker-end='url(#m08l05-arrow)'/>\n    <text x='490' y='160' text-anchor='middle' class='svg-label svg-label--small'>Host, Path, SNI, X-Forwarded-For, X-Request-ID, Cookie, Authorization</text>\n    <text x='490' y='530' text-anchor='middle' class='svg-label'>Intermediários HTTP concentram publicação, segurança, roteamento e observabilidade</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório você vai desenhar e validar uma publicação HTTP/HTTPS com reverse proxy, WAF/load balancer lógico, headers de encaminhamento, health check e logs. O foco é defensivo: entender o caminho, impedir bypass e coletar evidências sanitizadas.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam identificação de componentes, leitura de headers, interpretação de status codes gerados por intermediários e escolha de arquitetura para cenários corporativos.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário em que a aplicação funciona diretamente no backend, mas falha quando publicada atrás de WAF e load balancer. Seu desafio será identificar se a falha está em TLS, SNI, Host, path rewrite, health check, cookie, header removido ou política de WAF.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada aplica um método por camadas: DNS, TCP, TLS/SNI, certificado, WAF, rota host/path, headers, health check, backend, logs, request ID e política de segurança.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Proxies, reverse proxies, WAFs e load balancers HTTP existem porque publicar aplicações exige mais do que abrir uma porta. Eles centralizam entrada, terminam TLS, roteiam por host/path, distribuem carga, aplicam políticas, coletam logs e reduzem exposição direta dos backends.</p>\n  <p>O ganho operacional vem com responsabilidade: configurar headers corretamente, bloquear bypass, proteger certificados, revisar WAF, validar health checks, preservar request IDs, sanitizar logs e declarar regras por IaC. Muitos incidentes web acontecem não porque o backend era desconhecido, mas porque ele ficou acessível por um caminho fora do controle esperado.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula você estudará APIs REST, JSON, autenticação e contratos. Depois de entender a infraestrutura que publica HTTP, veremos como APIs são estruturadas, protegidas, versionadas e diagnosticadas.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "HTTP/HTTPS",
      "Publicação de aplicações",
      "Segurança de borda"
    ],
    "beforeThisLesson": "O aluno já entende HTTP, headers, status codes, HTTPS/TLS, cookies, tokens, TCP, portas, NAT e firewall stateful.",
    "afterThisLesson": "O aluno consegue desenhar e diagnosticar publicação HTTP/HTTPS com proxies, WAFs, load balancers, gateways e backends privados.",
    "dependsOn": [
      "DNS",
      "TCP",
      "TLS",
      "HTTP",
      "Headers",
      "Cookies",
      "Firewall",
      "NAT",
      "Observabilidade",
      "Cloud"
    ]
  },
  "protocolFields": [
    {
      "field": "Host",
      "meaning": "Indica o host HTTP solicitado e permite virtual hosts e roteamento por domínio.",
      "securityNote": "Host header não deve ser confiado sem validação; pode afetar geração de URLs e políticas."
    },
    {
      "field": "SNI",
      "meaning": "Nome enviado no handshake TLS para selecionar certificado/rota antes do HTTP protegido.",
      "securityNote": "SNI ajuda roteamento TLS, mas pode vazar nome de destino em TLS tradicional sem ECH."
    },
    {
      "field": "X-Forwarded-For",
      "meaning": "Header não padronizado muito usado para registrar IP original do cliente por trás de proxies.",
      "securityNote": "Deve ser sobrescrito ou saneado por proxy confiável; cliente pode falsificar se aceito diretamente."
    },
    {
      "field": "X-Forwarded-Proto",
      "meaning": "Indica o esquema original visto pelo proxy, como http ou https.",
      "securityNote": "Importante para redirects, cookies Secure e geração de links; erro causa loops ou cookies não enviados."
    },
    {
      "field": "Forwarded",
      "meaning": "Header padronizado que pode carregar informações de proxy como for, proto e host.",
      "securityNote": "Assim como X-Forwarded-*, só deve ser confiado a partir de intermediários controlados."
    },
    {
      "field": "X-Request-ID",
      "meaning": "Identificador de correlação para seguir a mesma requisição entre proxy, gateway e backend.",
      "securityNote": "Não deve conter dados pessoais; deve ser registrado de forma consistente nos logs."
    },
    {
      "field": "Via",
      "meaning": "Indica presença de intermediários HTTP no caminho.",
      "securityNote": "Pode revelar infraestrutura; algumas organizações limitam exposição desses detalhes."
    },
    {
      "field": "Set-Cookie",
      "meaning": "Pode ser alterado por proxy para Domain, Path, Secure ou SameSite em alguns desenhos.",
      "securityNote": "Reescrita incorreta quebra sessão ou amplia escopo de credenciais."
    }
  ],
  "packetFlow": [
    "Cliente resolve o domínio público para o endereço do intermediário HTTP.",
    "Cliente abre conexão TCP/443 com CDN, WAF, load balancer ou reverse proxy.",
    "Durante TLS, SNI indica o nome desejado e o intermediário apresenta o certificado correto.",
    "O intermediário aplica políticas de WAF, rate limit, tamanho de body, métodos e listas de controle.",
    "A regra L7 escolhe backend por Host, path, header, método, cookie ou peso de balanceamento.",
    "O intermediário adiciona headers de encaminhamento e request ID confiáveis.",
    "Backend processa a requisição e responde ao intermediário.",
    "O intermediário registra logs, atualiza métricas, aplica política de resposta e retorna ao cliente.",
    "SIEM/APM correlaciona logs de WAF, gateway, load balancer e aplicação."
  ],
  "deepDive": {
    "title": "TLS termination, passthrough e recriptografia",
    "points": [
      "TLS termination permite ao proxy ver HTTP, aplicar WAF, roteamento por path, compressão e logs detalhados.",
      "TLS passthrough preserva criptografia até o backend, mas limita inspeção HTTP no intermediário.",
      "Recriptografia encerra TLS no intermediário e abre novo TLS até o backend, protegendo também o trecho interno.",
      "mTLS entre proxy e backend adiciona autenticação mútua e reduz risco de backend aceitar tráfego indevido.",
      "A escolha impacta observabilidade, segurança, performance, troubleshooting e responsabilidade operacional sobre certificados."
    ]
  },
  "commonMistakes": [
    "Deixar backend acessível diretamente pela Internet ou por rede ampla, contornando WAF e proxy.",
    "Confiar em X-Forwarded-For enviado pelo cliente sem saneamento no proxy.",
    "Não preservar X-Forwarded-Proto, causando redirects errados e cookies Secure quebrados.",
    "Configurar health check em endpoint que não representa dependências críticas da aplicação.",
    "Usar WAF em modo apenas monitoramento sem processo de evolução para bloqueio.",
    "Misturar roteamento por path com aplicação que assume path raiz sem ajustar base path.",
    "Registrar Authorization, Cookie ou payloads sensíveis em logs de proxy.",
    "Não correlacionar request ID entre WAF, load balancer e backend."
  ],
  "troubleshooting": {
    "method": "Diagnosticar publicação HTTP por camadas: DNS, TCP, TLS/SNI, certificado, WAF, regra de host/path, headers de encaminhamento, balanceamento, health check, backend, logs e resposta final.",
    "browser": [
      "Abrir DevTools e verificar URL final, redirects, status code, headers e cookies.",
      "Comparar requisição direta ao domínio público com rota interna controlada.",
      "Verificar se erro é 4xx de cliente/política ou 5xx de proxy/backend.",
      "Correlacionar request ID exibido no header ou log."
    ],
    "curl": [
      "curl -vkI https://app.exemplo.local/health",
      "curl -vk --resolve app.exemplo.local:443:<IP_DO_LB> https://app.exemplo.local/api/status",
      "curl -vk -H 'Host: app.exemplo.local' https://<IP_DO_PROXY>/",
      "curl -vk --path-as-is https://app.exemplo.local/api/../admin",
      "curl -vk -H 'X-Request-ID: lab-sanitizado-001' https://app.exemplo.local/health"
    ],
    "openssl": [
      "openssl s_client -connect app.exemplo.local:443 -servername app.exemplo.local -showcerts",
      "Verificar SAN, issuer, validade, cadeia e certificado apresentado para cada SNI.",
      "Comparar certificado público com certificado esperado no inventário."
    ],
    "linux": [
      "dig app.exemplo.local",
      "ss -tlnp",
      "sudo tcpdump -n host <ip_do_proxy> and port 443",
      "grep '<request_id>' access.log error.log waf.log"
    ],
    "windows": [
      "Resolve-DnsName app.exemplo.local",
      "Test-NetConnection app.exemplo.local -Port 443",
      "curl.exe -vkI https://app.exemplo.local/health",
      "Get-Date para validar horário em erros TLS"
    ],
    "cloud": [
      "Verificar listeners, target groups/backend pools e health checks.",
      "Conferir security groups/NSGs permitindo origem apenas do load balancer.",
      "Consultar WAF logs, access logs, flow logs e métricas de 4xx/5xx.",
      "Validar certificados gerenciados e associação ao listener correto."
    ],
    "ciscoFirewall": [
      "show logging | include <ip>",
      "show access-lists",
      "show conn | include <ip>",
      "Verificar NAT, ACL e caminho simétrico até o proxy ou load balancer."
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Proxies, reverse proxies, WAFs e load balancers HTTP.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && nslookup exemplo.local",
        "purpose": "Coletar configuração local, rotas e resolução DNS.",
        "expectedObservation": "IP, gateway, DNS e rotas coerentes com o cenário.",
        "interpretation": "Falhas nessa etapa indicam problemas de base antes da aplicação."
      }
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Backends privados, acessíveis apenas por load balancer/proxy controlado.",
      "WAF aplicado antes da aplicação e com processo de tuning e bloqueio.",
      "Headers X-Forwarded-* saneados no primeiro proxy confiável.",
      "TLS forte, certificados rotacionados e alertas de expiração.",
      "Logs de acesso, WAF e backend correlacionados por request ID.",
      "Regras de publicação e WAF declaradas como código e revisadas por pull request.",
      "Health checks específicos, autenticados quando necessário e sem expor dados sensíveis.",
      "Rate limiting e limites de tamanho de body para endpoints expostos."
    ],
    "badPractices": [
      "Publicar backend diretamente com IP público e confiar apenas no WAF por DNS.",
      "Permitir 0.0.0.0/0 diretamente em portas administrativas ou backends internos.",
      "Desabilitar validação TLS entre proxy e backend sem justificativa.",
      "Usar --insecure como solução permanente para falhas de certificado.",
      "Registrar cookies, tokens e bodies sensíveis em logs de borda.",
      "Criar exceções WAF amplas para resolver falso positivo sem investigação."
    ],
    "vulnerabilities": [
      {
        "name": "Bypass de WAF por acesso direto ao backend.",
        "description": "Risco relacionado à aula 8.5 — Proxies, reverse proxies, WAFs e load balancers HTTP.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Bloquear backend para aceitar tráfego somente de sub-redes ou identidades do proxy/load balancer."
      },
      {
        "name": "Host header injection.",
        "description": "Risco relacionado à aula 8.5 — Proxies, reverse proxies, WAFs e load balancers HTTP.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Normalizar e validar Host, Forwarded e X-Forwarded-*."
      },
      {
        "name": "Spoofing de X-Forwarded-For.",
        "description": "Risco relacionado à aula 8.5 — Proxies, reverse proxies, WAFs e load balancers HTTP.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Aplicar mTLS ou allowlist forte no trecho proxy-backend quando apropriado."
      },
      {
        "name": "TLS fraco ou certificado errado.",
        "description": "Risco relacionado à aula 8.5 — Proxies, reverse proxies, WAFs e load balancers HTTP.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Usar WAF, rate limit e regras específicas por aplicação."
      },
      {
        "name": "Path traversal chegando ao backend por normalização inconsistente.",
        "description": "Risco relacionado à aula 8.5 — Proxies, reverse proxies, WAFs e load balancers HTTP.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Habilitar logs sanitizados e correlação ponta a ponta."
      },
      {
        "name": "Request smuggling em cadeias proxy/backend mal compatíveis.",
        "description": "Risco relacionado à aula 8.5 — Proxies, reverse proxies, WAFs e load balancers HTTP.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Testar publicação por caminhos alternativos para detectar bypass."
      },
      {
        "name": "Exposição de painéis administrativos por rota mal configurada.",
        "description": "Risco relacionado à aula 8.5 — Proxies, reverse proxies, WAFs e load balancers HTTP.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Manter inventário de domínios, certificados, listeners, rotas e donos."
      },
      {
        "name": "Logs com Authorization e Cookie completos.",
        "description": "Risco relacionado à aula 8.5 — Proxies, reverse proxies, WAFs e load balancers HTTP.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Bloquear backend para aceitar tráfego somente de sub-redes ou identidades do proxy/load balancer."
      }
    ],
    "mitigations": [
      "Bloquear backend para aceitar tráfego somente de sub-redes ou identidades do proxy/load balancer.",
      "Normalizar e validar Host, Forwarded e X-Forwarded-*.",
      "Aplicar mTLS ou allowlist forte no trecho proxy-backend quando apropriado.",
      "Usar WAF, rate limit e regras específicas por aplicação.",
      "Habilitar logs sanitizados e correlação ponta a ponta.",
      "Testar publicação por caminhos alternativos para detectar bypass.",
      "Manter inventário de domínios, certificados, listeners, rotas e donos."
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
      "Bloquear backend para aceitar tráfego somente de sub-redes ou identidades do proxy/load balancer.",
      "Normalizar e validar Host, Forwarded e X-Forwarded-*.",
      "Aplicar mTLS ou allowlist forte no trecho proxy-backend quando apropriado.",
      "Usar WAF, rate limit e regras específicas por aplicação.",
      "Habilitar logs sanitizados e correlação ponta a ponta.",
      "Testar publicação por caminhos alternativos para detectar bypass.",
      "Manter inventário de domínios, certificados, listeners, rotas e donos."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-8.5",
    "title": "Desenhar e validar uma publicação HTTP/HTTPS com proxy, WAF e load balancer",
    "labType": "cloud",
    "objective": "Construir um runbook defensivo para publicar e diagnosticar uma aplicação HTTP/HTTPS passando por DNS, WAF, load balancer/reverse proxy, backend, logs e controles de bypass.",
    "scenario": "Laboratório Neste laboratório você vai desenhar e validar uma publicação HTTP/HTTPS com reverse proxy, WAF/load balancer lógico, headers de encaminhamento, health check e logs. O foco é defensivo: entender o caminho, impedir bypass e coletar evidências sanitizadas.",
    "topology": "Cliente -> DNS -> WAF lógico -> Load balancer/reverse proxy -> Backend A/B -> Logs/SIEM. Opcional: simular localmente com Caddy/Nginx/Traefik e um backend simples.",
    "architecture": "O proxy recebe HTTPS em 443, escolhe backend por Host/Path, adiciona request ID e headers de encaminhamento, registra logs e impede acesso direto ao backend.",
    "prerequisites": [
      "Ambiente de laboratório próprio ou simulado",
      "curl e navegador com DevTools",
      "Opcional: Docker com Nginx/Caddy/Traefik e app simples",
      "Não usar sistemas de terceiros sem autorização"
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 180,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Mapear o fluxo esperado",
        "instruction": "Desenhe cliente, DNS, WAF, load balancer/proxy, backend, logs e controles de rede.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Fluxo documentado com origem, destino, protocolo, porta, domínio, certificado e dono.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Proxies, reverse proxies, WAFs e load balancers HTTP” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Validar DNS e entrada pública",
        "instruction": "Use dig/Resolve-DnsName para confirmar para onde o domínio aponta.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "O domínio aponta para o intermediário, não para backend direto.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Proxies, reverse proxies, WAFs e load balancers HTTP” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Validar TLS e SNI",
        "instruction": "Use curl -vkI e openssl s_client com -servername para conferir certificado apresentado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Certificado possui SAN correto, cadeia válida e listener correto.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Proxies, reverse proxies, WAFs e load balancers HTTP” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Verificar roteamento HTTP",
        "instruction": "Teste paths esperados como /health, /api e /app com curl e DevTools.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Cada host/path chega ao backend correto e retorna status esperado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Proxies, reverse proxies, WAFs e load balancers HTTP” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Inspecionar headers de encaminhamento",
        "instruction": "Verifique Host, X-Forwarded-For, X-Forwarded-Proto e X-Request-ID em logs ou endpoint controlado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Headers são inseridos/saneados pelo proxy, não aceitos cegamente do cliente.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Proxies, reverse proxies, WAFs e load balancers HTTP” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Validar health check e balanceamento",
        "instruction": "Liste backends, status de saúde e critérios do health check.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Somente backends saudáveis recebem tráfego.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Proxies, reverse proxies, WAFs e load balancers HTTP” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Testar controles de bypass",
        "instruction": "Confirme que backend não aceita tráfego direto fora do proxy/load balancer.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Acesso direto é bloqueado por firewall, security group, NSG ou ACL.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Proxies, reverse proxies, WAFs e load balancers HTTP” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Revisar WAF e logs",
        "instruction": "Documente políticas WAF, modo de operação, logs, request ID e retenção.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Há trilha de auditoria para requisições permitidas e bloqueadas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Proxies, reverse proxies, WAFs e load balancers HTTP” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Criar runbook de erro 502/503/504",
        "instruction": "Escreva hipóteses e testes para cada status gerado por intermediários.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Runbook separa falha de backend, health check, timeout, DNS, TLS e WAF.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Proxies, reverse proxies, WAFs e load balancers HTTP” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "Ao final, o aluno terá uma matriz de publicação HTTP/HTTPS segura, um diagrama de fluxo, evidências sanitizadas, checklist de headers/TLS/WAF e runbook de troubleshooting.",
    "validation": [
      {
        "check": "DNS aponta para intermediário controlado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "DNS aponta para intermediário controlado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "TLS apresenta certificado correto por SNI",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "TLS apresenta certificado correto por SNI",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Backends não são públicos diretamente",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Backends não são públicos diretamente",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Headers de encaminhamento são saneados",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Headers de encaminhamento são saneados",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "WAF e access logs estão habilitados",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "WAF e access logs estão habilitados",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Request ID correlaciona proxy e backend",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Request ID correlaciona proxy e backend",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Health checks são significativos",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Health checks são significativos",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Erro 502 geralmente indica falha ao falar com backend ou resposta inválida.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Erro 503 pode indicar backend indisponível, pool vazio, manutenção ou WAF/proxy recusando.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Erro 504 indica timeout entre intermediário e backend ou dependência lenta.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Redirect loop frequentemente envolve X-Forwarded-Proto ou percepção incorreta de HTTPS.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Cookie não enviado pode envolver Domain, Path, Secure, SameSite ou TLS termination.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Certificado errado pode indicar SNI ausente, listener incorreto ou certificado default.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar mTLS proxy-backend",
      "Criar dashboards por status code e latency percentiles",
      "Versionar regras em IaC",
      "Adicionar rate limit por rota",
      "Criar testes sintéticos por endpoint crítico",
      "Automatizar alerta de expiração de certificado"
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
      "Qual evidência mostra que o laboratório de “Proxies, reverse proxies, WAFs e load balancers HTTP” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Aplicação falha atrás do WAF, mas funciona direto no backend",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "duration": "90-130 min"
  },
  "mentorQuestions": [
    "Se um WAF protege o domínio, mas o backend aceita tráfego direto, qual controle realmente falhou?",
    "Por que X-Forwarded-For não deve ser usado como fonte confiável se o primeiro proxy não saneia esse header?",
    "Quando você escolheria TLS passthrough em vez de TLS termination no load balancer?"
  ],
  "quiz": [
    {
      "question": "Qual é a principal diferença entre proxy direto e reverse proxy?",
      "options": [
        "Proxy direto representa clientes; reverse proxy representa servidores/aplicações",
        "Proxy direto usa UDP; reverse proxy usa TCP",
        "Proxy direto só existe em cloud; reverse proxy só existe on-premises",
        "Não existe diferença"
      ],
      "answer": 0,
      "explanation": "Proxy direto normalmente controla saída de clientes; reverse proxy publica aplicações do lado do servidor."
    },
    {
      "question": "O que TLS termination permite ao intermediário fazer?",
      "options": [
        "Inspecionar HTTP descriptografado e aplicar políticas L7",
        "Eliminar necessidade de certificados",
        "Transformar TCP em UDP",
        "Impedir todos os ataques web automaticamente"
      ],
      "answer": 0,
      "explanation": "Ao terminar TLS, o intermediário consegue ver HTTP e aplicar roteamento, logs e WAF. Isso exige proteção adequada do trecho interno."
    },
    {
      "question": "Qual risco existe ao confiar cegamente em X-Forwarded-For?",
      "options": [
        "Cliente pode falsificar o header se o proxy não saneá-lo",
        "O DNS deixa de funcionar",
        "O TLS sempre expira",
        "O backend perde sua porta TCP"
      ],
      "answer": 0,
      "explanation": "Headers X-Forwarded-* podem ser enviados pelo próprio cliente; o proxy confiável deve sobrescrever ou normalizar."
    },
    {
      "question": "Um erro 504 em um gateway geralmente indica:",
      "options": [
        "Timeout entre intermediário e backend/dependência",
        "Senha inválida do usuário",
        "Registro MX ausente",
        "ARP spoofing confirmado"
      ],
      "answer": 0,
      "explanation": "504 Gateway Timeout costuma indicar que o gateway/proxy não recebeu resposta a tempo do upstream."
    },
    {
      "question": "Qual prática reduz bypass de WAF?",
      "options": [
        "Permitir acesso ao backend apenas a partir do WAF/load balancer",
        "Publicar o backend em IP público diferente",
        "Desabilitar logs para reduzir ruído",
        "Aceitar qualquer Host header"
      ],
      "answer": 0,
      "explanation": "O backend deve estar protegido para aceitar tráfego apenas de caminhos controlados."
    },
    {
      "question": "Qual componente é mais associado a rate limit, autenticação de API, contratos e versionamento?",
      "options": [
        "API gateway",
        "Hub Ethernet",
        "ARP cache",
        "Cabo console"
      ],
      "answer": 0,
      "explanation": "API gateways governam consumo de APIs com políticas de autenticação, limites, versionamento e observabilidade."
    }
  ],
  "flashcards": [
    {
      "front": "Proxy direto",
      "back": "Intermediário do lado do cliente, usado para controlar ou observar saída para a Internet."
    },
    {
      "front": "Reverse proxy",
      "back": "Intermediário do lado do servidor, usado para publicar e encaminhar requisições para aplicações internas."
    },
    {
      "front": "WAF",
      "back": "Firewall de aplicação web que inspeciona HTTP/HTTPS e aplica regras contra padrões maliciosos."
    },
    {
      "front": "TLS termination",
      "back": "Encerramento da sessão TLS no intermediário, permitindo inspeção e roteamento HTTP."
    },
    {
      "front": "X-Request-ID",
      "back": "Identificador usado para correlacionar a mesma requisição entre proxy, gateway, backend e logs."
    },
    {
      "front": "Bypass de WAF",
      "back": "Acesso à aplicação por caminho que evita o WAF, normalmente por backend exposto diretamente."
    }
  ],
  "exercises": [
    {
      "title": "Classificar componentes",
      "prompt": "Explique a diferença entre proxy direto, reverse proxy, WAF, load balancer e API gateway.",
      "expectedAnswer": "Cada componente deve ser descrito pelo problema que resolve, não apenas pelo produto usado."
    },
    {
      "title": "Interpretar status codes de intermediários",
      "prompt": "Diferencie causas prováveis de 502, 503 e 504 em uma aplicação atrás de proxy.",
      "expectedAnswer": "502: resposta inválida/falha upstream; 503: serviço indisponível/pool vazio/manutenção; 504: timeout upstream."
    },
    {
      "title": "Revisar headers",
      "prompt": "Liste quais headers você verificaria quando uma aplicação gera redirects errados atrás de TLS termination.",
      "expectedAnswer": "Host, X-Forwarded-Proto, X-Forwarded-Host, Forwarded, Location, Set-Cookie e request ID."
    },
    {
      "title": "Detectar bypass",
      "prompt": "Como provar defensivamente que um backend não pode ser acessado diretamente fora do load balancer?",
      "expectedAnswer": "Mostrar políticas de rede/security group/ACL, rotas e logs demonstrando origem permitida apenas do intermediário controlado."
    }
  ],
  "challenge": {
    "title": "Aplicação falha atrás do WAF, mas funciona direto no backend",
    "scenario": "Uma API responde 200 quando acessada diretamente pelo backend interno, mas retorna 502/504 quando publicada em https://api.empresa.local. O time de aplicação diz que o problema é rede; o time de rede diz que o backend está saudável.",
    "tasks": [
      "Montar hipóteses por camada",
      "Definir comandos e logs para validar DNS, TCP, TLS, WAF, rota HTTP e backend",
      "Listar headers que precisam ser preservados",
      "Criar plano para eliminar bypass ao backend",
      "Propor correção e evidências de validação"
    ],
    "rubric": [
      "Separação clara entre DNS/TCP/TLS/HTTP/backend",
      "Uso de request ID e logs correlacionados",
      "Análise de 502/503/504",
      "Consideração de WAF e health check",
      "Tratamento de segurança e bypass"
    ]
  },
  "commentedSolution": {
    "summary": "A investigação começa confirmando que o domínio aponta para o intermediário correto, que TLS apresenta certificado certo por SNI, que a regra de host/path envia para o pool correto e que o backend está saudável do ponto de vista do load balancer, não apenas quando acessado manualmente.",
    "steps": [
      "Executar curl -vkI no domínio público e registrar status, certificado, headers e request ID.",
      "Usar openssl s_client com SNI para confirmar certificado e listener.",
      "Verificar access log/WAF log pelo request ID e identificar se a requisição foi bloqueada, roteada ou enviada ao upstream.",
      "Conferir health check: path, método, host header, timeout, código esperado e dependências.",
      "Comparar headers recebidos no backend com os enviados pelo cliente, especialmente Host e X-Forwarded-Proto.",
      "Se houver 504, medir latência e timeout entre proxy e backend; se houver 502, revisar protocolo, porta, certificado upstream e resposta inválida.",
      "Bloquear acesso direto ao backend e validar que apenas o intermediário alcança a aplicação.",
      "Documentar correção em IaC e adicionar teste sintético para evitar regressão."
    ],
    "keyTakeaway": "A pergunta correta não é apenas se o backend responde. É se ele responde pelo caminho oficial, com TLS, headers, política, health check, logs e controles esperados."
  },
  "glossary": [
    {
      "term": "Proxy direto",
      "definition": "Intermediário usado por clientes para acessar recursos externos."
    },
    {
      "term": "Reverse proxy",
      "definition": "Intermediário que recebe tráfego em nome de aplicações servidoras."
    },
    {
      "term": "WAF",
      "definition": "Web Application Firewall, controle que inspeciona requisições HTTP/HTTPS para bloquear padrões maliciosos."
    },
    {
      "term": "Load balancer L7",
      "definition": "Balanceador que entende camada HTTP e pode rotear por host, path, headers, cookies e status."
    },
    {
      "term": "TLS termination",
      "definition": "Encerramento da sessão TLS em um intermediário como proxy, WAF ou load balancer."
    },
    {
      "term": "Health check",
      "definition": "Teste periódico usado para decidir se um backend pode receber tráfego."
    },
    {
      "term": "Request ID",
      "definition": "Identificador de correlação usado para seguir uma requisição entre componentes."
    },
    {
      "term": "Bypass de WAF",
      "definition": "Acesso à aplicação por caminho que evita a inspeção do WAF."
    }
  ],
  "references": [
    {
      "title": "RFC 9110 — HTTP Semantics",
      "type": "standard",
      "note": "Base conceitual de métodos, headers, status codes e semântica HTTP."
    },
    {
      "title": "OWASP Cheat Sheet Series — HTTP Headers, TLS, Logging e WAF",
      "type": "security",
      "note": "Referência prática para hardening de aplicações HTTP."
    },
    {
      "title": "Documentação de provedores cloud sobre Application Load Balancer, Application Gateway, Cloud Load Balancing e WAF",
      "type": "vendor",
      "note": "Usar documentação oficial do ambiente onde o laboratório será aplicado."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Ingress, Service Mesh e plataformas internas",
      "reason": "Proxies e gateways aparecem como blocos de plataforma para publicar serviços."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "SSO, tokens e federação",
      "reason": "Gateways e proxies frequentemente integram autenticação, autorização e propagação de identidade."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 8",
      "reason": "NAT, firewall stateful, TCP, UDP e portas explicam a base de transporte por trás dos intermediários HTTP."
    }
  ],
  "progressRules": {
    "minimumReadSections": 18,
    "minimumQuizScore": 70,
    "requiredLab": true,
    "requiredChallenge": true,
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
      "8.6"
    ]
  }
};
