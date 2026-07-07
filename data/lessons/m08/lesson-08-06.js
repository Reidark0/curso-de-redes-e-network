export const lesson0806 = {
  "id": "8.6",
  "moduleId": "m08",
  "order": 6,
  "title": "APIs REST, JSON, autenticação e contratos",
  "subtitle": "Entenda como APIs HTTP são modeladas, versionadas, autenticadas, documentadas e protegidas em ambientes corporativos, cloud e DevSecOps.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "redes",
    "http",
    "api",
    "rest",
    "json",
    "openapi",
    "autenticação",
    "tokens",
    "contratos",
    "gateway",
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
      "reason": "APIs REST usam HTTP como protocolo de aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.2",
      "title": "Requisições e respostas: métodos, URLs, headers, body e status codes",
      "reason": "Métodos, URLs, headers, body e status codes são a base de APIs."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.3",
      "title": "HTTPS, TLS, certificados, SNI e cadeia de confiança",
      "reason": "APIs corporativas devem ser publicadas sobre TLS e com validação adequada."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.4",
      "title": "Cookies, sessões, tokens e estado em aplicações web",
      "reason": "APIs modernas usam tokens bearer, JWT, API keys e integração com identidade."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.5",
      "title": "Proxies, reverse proxies, WAFs e load balancers HTTP",
      "reason": "APIs frequentemente são publicadas por API gateways, WAFs e proxies reversos."
    }
  ],
  "objectives": [
    "Explicar por que APIs existem e como diferem de páginas web tradicionais.",
    "Diferenciar recurso, endpoint, método HTTP, payload JSON, contrato e versão de API.",
    "Relacionar REST com métodos, status codes, headers, idempotência e representação de recursos.",
    "Entender autenticação e autorização em APIs usando API key, Basic, Bearer token, JWT, OAuth2/OIDC e mTLS em visão introdutória.",
    "Reconhecer riscos como IDOR, autorização fraca, token em log, contrato quebrado, mass assignment, rate limit ausente e versionamento improvisado.",
    "Diagnosticar APIs com curl, DevTools, logs, traces, request IDs, schemas e documentação OpenAPI."
  ],
  "learningOutcomes": [
    "Modelar uma API simples com endpoints, métodos, status codes e payloads JSON coerentes.",
    "Ler uma resposta JSON e separar erro de cliente, erro de autenticação, erro de autorização, erro de contrato e erro de backend.",
    "Explicar a diferença entre autenticação, autorização, escopos, claims e contrato de API.",
    "Desenhar uma publicação de API com gateway, WAF, rate limit, observabilidade, versionamento e backend privado.",
    "Construir um checklist defensivo para revisar endpoints, headers, tokens, CORS, logs, contratos e limites."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n\n  <p>Quando uma aplicação precisa conversar com outra, ela precisa de uma linguagem comum. Uma tela web é feita para humanos. Uma API é feita para sistemas. O aplicativo do celular, o frontend web, um pipeline CI/CD, um webhook de pagamento, um serviço de identidade e um sistema de faturamento podem conversar usando HTTP, JSON, contratos e regras de autenticação.</p>\n  <p>Sem APIs bem desenhadas, integrações viram improviso: cada sistema interpreta campos de forma diferente, erros não são padronizados, autenticação é inconsistente, mudanças quebram consumidores e logs não permitem rastrear incidentes. Em Segurança, APIs mal governadas são uma das maiores superfícies de exposição porque muitas vezes carregam dados sensíveis e regras de negócio críticas.</p>\n  <div class='callout'><strong>Ideia central:</strong> uma API é um contrato operacional entre sistemas. Ela não é apenas um endpoint que “devolve JSON”.</div>\n\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n\n  <p>Antes da popularização de APIs web, integrações corporativas usavam arquivos, bancos compartilhados, RPC, CORBA, SOAP/XML e conectores proprietários. Essas abordagens resolviam problemas reais, mas frequentemente eram pesadas, difíceis de depurar, fortemente acopladas e dependentes de ferramentas específicas.</p>\n  <p>Com a Web, HTTP se tornou uma base universal. REST popularizou a ideia de modelar recursos e manipulá-los com métodos HTTP. JSON se tornou dominante por ser simples, legível e fácil de usar em JavaScript, linguagens backend e ferramentas de automação.</p>\n  <p>Hoje, APIs são publicadas por API gateways, protegidas por WAFs, descritas por OpenAPI, consumidas por frontends, serviços, mobile apps, pipelines e parceiros. A evolução trouxe velocidade, mas também ampliou a necessidade de governança, observabilidade, autenticação forte e contratos versionados.</p>\n\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n\n  <p>O problema que APIs resolvem é a comunicação estruturada entre sistemas. Um sistema precisa dizer: qual recurso quer acessar, qual ação quer executar, qual formato aceita, qual identidade está usando, qual permissão possui e como interpretar sucesso ou falha.</p>\n  <p>Sem contrato, uma mudança simples pode quebrar consumidores. Um campo renomeado, um status code errado, um erro sem padrão, um endpoint sem versionamento ou uma autorização incompleta pode gerar falha operacional ou incidente de segurança.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> APIs precisam ser compreensíveis por clientes, seguras contra abuso, estáveis para integração e observáveis para troubleshooting.</div>\n\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n\n  <p>A evolução saiu de integrações ponto a ponto para contratos HTTP padronizados. APIs REST trouxeram recursos, métodos e status codes. JSON simplificou payloads. OAuth2 e OIDC ajudaram a separar identidade, autenticação, autorização e escopos. API gateways adicionaram rate limit, validação, analytics, transformação e políticas centralizadas.</p>\n  <p>Depois surgiram práticas de contrato: OpenAPI, mocks, testes de contrato, validação de schema, versionamento e documentação automática. Em DevSecOps, o contrato da API passou a ser tratado como artefato versionado no repositório, revisado em pull request e validado em pipeline.</p>\n  <p>APIs modernas também convivem com GraphQL, gRPC, eventos e filas. Mesmo assim, REST/JSON sobre HTTP continua sendo uma base essencial para entender integrações corporativas, cloud, segurança e troubleshooting.</p>\n\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n\n  <p>Uma <strong>API</strong> define como sistemas conversam. Em uma API REST, normalmente representamos coisas do domínio como recursos: usuários, pedidos, pagamentos, chamados, máquinas, sensores ou relatórios. Cada recurso é exposto por uma URL e manipulado com métodos HTTP.</p>\n  <div class='definition-box'>REST não significa “qualquer JSON em HTTP”. REST é um estilo arquitetural que usa recursos, representações, métodos padronizados, statelessness, cache quando aplicável e interface uniforme.</div>\n  <table class='comparison-table'><thead><tr><th>Elemento</th><th>Função</th><th>Exemplo</th><th>Erro comum</th></tr></thead><tbody><tr><td>Recurso</td><td>Entidade do domínio</td><td><code>/clientes/123</code></td><td>Modelar ações como recursos sem critério</td></tr><tr><td>Método</td><td>Intenção da operação</td><td><code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code></td><td>Usar <code>GET</code> para alterar estado</td></tr><tr><td>JSON</td><td>Representação dos dados</td><td><code>{\"nome\":\"Ana\"}</code></td><td>Sem schema, tipos inconsistentes</td></tr><tr><td>Status code</td><td>Resultado HTTP da operação</td><td><code>201</code>, <code>400</code>, <code>401</code>, <code>403</code>, <code>409</code></td><td>Responder sempre <code>200</code></td></tr><tr><td>Contrato</td><td>Regra esperada por clientes e servidores</td><td>OpenAPI</td><td>Mudar sem versionar</td></tr></tbody></table>\n\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n\n  <p>Uma chamada de API combina várias camadas. O cliente resolve DNS, abre TCP, negocia TLS, envia HTTP, inclui headers de autenticação, envia JSON quando necessário, passa por proxy/WAF/API gateway e chega ao backend. O backend valida autenticação, autorização, contrato, regras de negócio e responde com status code, headers e body.</p>\n  <ol class='flow-list'>\n    <li>Cliente monta a URL, método, headers e body.</li>\n    <li>Cliente resolve DNS e abre conexão TCP/TLS com o endpoint publicado.</li>\n    <li>API gateway ou reverse proxy recebe a requisição e aplica políticas iniciais.</li>\n    <li>WAF/rate limit pode bloquear padrões anômalos ou excesso de chamadas.</li>\n    <li>Serviço de identidade valida token, assinatura, expiração, audience, issuer e escopos.</li>\n    <li>Backend valida autorização de negócio e schema do payload.</li>\n    <li>Backend executa a operação e responde com status code e JSON padronizado.</li>\n    <li>Logs e traces correlacionam request ID, usuário, endpoint, status, latência e backend.</li>\n  </ol>\n  <p>O ponto crítico é que autenticação não é autorização. Saber quem chamou a API não significa que essa identidade pode acessar qualquer objeto ou executar qualquer ação.</p>\n\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n\n  <p>Em uma arquitetura corporativa, APIs raramente devem ficar expostas diretamente. O caminho saudável inclui DNS, TLS, WAF ou API gateway, autenticação, rate limit, roteamento, backend privado, logs e observabilidade.</p>\n  <p>O API gateway pode validar token, aplicar quota, limitar tamanho de payload, normalizar headers, registrar métricas, versionar rotas e encaminhar para serviços internos. O backend ainda precisa validar autorização e regras de negócio, porque gateway não substitui validação interna.</p>\n  <table class='data-table'><thead><tr><th>Camada</th><th>Responsabilidade</th><th>Exemplo de controle</th></tr></thead><tbody><tr><td>Borda</td><td>Receber tráfego externo</td><td>TLS forte, WAF, rate limit</td></tr><tr><td>Gateway</td><td>Governar consumo</td><td>JWT validation, quota, request ID</td></tr><tr><td>Serviço</td><td>Executar regra de negócio</td><td>Autorização por objeto, validação de schema</td></tr><tr><td>Dados</td><td>Persistir e consultar</td><td>Least privilege, auditoria, criptografia</td></tr><tr><td>Observabilidade</td><td>Investigar e operar</td><td>Logs, traces, métricas, SIEM</td></tr></tbody></table>\n\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n\n  <p>Pense em uma API como um balcão de atendimento corporativo. O cliente não entra no estoque, no financeiro ou no banco de dados. Ele faz um pedido por um formulário padronizado, apresenta credencial, recebe protocolo, e o atendente só executa o que o cliente tem permissão para pedir.</p>\n  <p>O contrato da API é o formulário. O token é a credencial. O gateway é a recepção. O backend é a área interna que executa o trabalho. O request ID é o número de protocolo. O log é o registro de atendimento.</p>\n  <div class='callout'><strong>Limite da analogia:</strong> em APIs, a velocidade e o volume são muito maiores. Um erro pequeno de autorização pode ser explorado milhares de vezes em segundos.</div>\n\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n\n  <p>Uma API de chamados pode ter o endpoint <code>GET /api/v1/tickets/123</code>. O método <code>GET</code> indica leitura, o path indica o recurso, o token identifica o usuário e o status code indica resultado.</p>\n  <pre><code>GET /api/v1/tickets/123 HTTP/1.1\nHost: suporte.exemplo.com\nAuthorization: Bearer &lt;token&gt;\nAccept: application/json\nX-Request-ID: req-2026-0001</code></pre>\n  <p>Se o usuário estiver autenticado, mas não for dono do chamado nem analista autorizado, a resposta correta não é “200 com dados vazados”. Pode ser <code>403 Forbidden</code> ou uma política que retorne <code>404</code> para não revelar existência do recurso.</p>\n\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n\n  <p>Em uma empresa, uma API de RH pode expor dados de colaboradores para folha de pagamento, portal interno e sistema de benefícios. Cada consumidor precisa de escopos diferentes. O portal pode ler dados do usuário autenticado; a folha pode ler dados necessários ao processamento; o parceiro de benefícios talvez só receba um subconjunto aprovado.</p>\n  <p>Sem controle por escopo e por objeto, um consumidor legítimo pode acessar dados além do necessário. Por isso, APIs corporativas exigem matriz de consumidores, escopos, endpoints, dados permitidos, logs, retenção, dono do contrato e aprovação de mudanças.</p>\n\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n\n  <p>Em cloud, APIs podem ser publicadas por API Gateway, Application Load Balancer, Cloud Run, Functions, Kubernetes Ingress ou serviços gerenciados. A rede define quem alcança a API; o gateway define políticas HTTP; a identidade define quem pode chamar; os logs e traces permitem investigar.</p>\n  <p>Um desenho comum é: DNS público aponta para gateway; gateway valida TLS e JWT; rotas encaminham para serviços privados; logs vão para SIEM; secrets ficam em cofre; deploy e políticas são definidos em IaC. O erro comum é publicar o backend diretamente com IP público e deixar o gateway como enfeite, não como ponto obrigatório.</p>\n\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, o contrato da API pode ser armazenado como <code>openapi.yaml</code>. O pipeline valida breaking changes, schema, exemplos, autenticação exigida, status codes documentados e presença de rate limit. Testes de contrato reduzem o risco de um serviço quebrar outro silenciosamente.</p>\n  <p>Também é possível aplicar policy as code: endpoints administrativos não podem ser públicos, APIs externas precisam de TLS, tokens não podem aparecer em logs, CORS deve ser explícito, payload máximo deve existir e endpoints sensíveis exigem autenticação forte.</p>\n\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n\n  <p>Um incidente clássico em APIs é o IDOR: o usuário autenticado acessa <code>/clientes/123</code> e descobre que pode trocar para <code>/clientes/124</code> e ver dados de outro cliente. A autenticação estava correta, mas a autorização por objeto estava ausente.</p>\n  <p>Outros riscos comuns incluem tokens em query string, JWT aceito sem validar assinatura, audience ou expiração, API key compartilhada entre sistemas, rate limit ausente, logs com payload sensível, CORS permissivo demais, mass assignment e ausência de versionamento.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> toda API deve validar identidade, autorização, escopo, objeto, contrato, tamanho, taxa de uso e trilha de auditoria.</div>\n\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 600' role='img' aria-labelledby='m08l06-title m08l06-desc'>\n    <title id='m08l06-title'>Arquitetura de API REST com JSON, autenticação, contrato e observabilidade</title>\n    <desc id='m08l06-desc'>Diagrama mostrando cliente chamando API via DNS, TLS, WAF, API Gateway, serviço de identidade, backend, banco de dados, contrato OpenAPI e SIEM.</desc>\n    <defs>\n      <marker id='m08l06-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'/></marker>\n    </defs>\n    <rect x='35' y='55' width='130' height='85' rx='14' class='svg-node svg-node--client'/>\n    <text x='100' y='90' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='100' y='115' text-anchor='middle' class='svg-label svg-label--small'>app, browser, pipeline</text>\n    <rect x='205' y='55' width='120' height='85' rx='14' class='svg-node svg-node--cloud'/>\n    <text x='265' y='90' text-anchor='middle' class='svg-label'>DNS/TLS</text>\n    <text x='265' y='115' text-anchor='middle' class='svg-label svg-label--small'>api.exemplo.com</text>\n    <rect x='365' y='55' width='130' height='85' rx='14' class='svg-node svg-node--firewall'/>\n    <text x='430' y='90' text-anchor='middle' class='svg-label'>WAF</text>\n    <text x='430' y='115' text-anchor='middle' class='svg-label svg-label--small'>filtro L7</text>\n    <rect x='535' y='55' width='145' height='85' rx='14' class='svg-node svg-node--router'/>\n    <text x='607' y='86' text-anchor='middle' class='svg-label'>API Gateway</text>\n    <text x='607' y='114' text-anchor='middle' class='svg-label svg-label--small'>auth, quota, rota</text>\n    <rect x='720' y='55' width='140' height='85' rx='14' class='svg-node svg-node--security'/>\n    <text x='790' y='88' text-anchor='middle' class='svg-label'>IdP</text>\n    <text x='790' y='114' text-anchor='middle' class='svg-label svg-label--small'>JWT/OAuth2/OIDC</text>\n    <rect x='185' y='245' width='150' height='90' rx='14' class='svg-node svg-node--server'/>\n    <text x='260' y='280' text-anchor='middle' class='svg-label'>Backend API</text>\n    <text x='260' y='306' text-anchor='middle' class='svg-label svg-label--small'>valida autorização</text>\n    <rect x='415' y='245' width='135' height='90' rx='14' class='svg-node svg-node--server'/>\n    <text x='482' y='280' text-anchor='middle' class='svg-label'>Banco</text>\n    <text x='482' y='306' text-anchor='middle' class='svg-label svg-label--small'>dados mínimos</text>\n    <rect x='635' y='245' width='145' height='90' rx='14' class='svg-node svg-node--cloud'/>\n    <text x='707' y='280' text-anchor='middle' class='svg-label'>OpenAPI</text>\n    <text x='707' y='306' text-anchor='middle' class='svg-label svg-label--small'>contrato versionado</text>\n    <rect x='310' y='430' width='345' height='90' rx='16' class='svg-node svg-node--security'/>\n    <text x='482' y='464' text-anchor='middle' class='svg-label'>Observabilidade e SIEM</text>\n    <text x='482' y='493' text-anchor='middle' class='svg-label svg-label--small'>request ID • usuário • escopo • status • latência • erro</text>\n    <line x1='165' y1='98' x2='205' y2='98' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l06-arrow)'/>\n    <line x1='325' y1='98' x2='365' y2='98' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l06-arrow)'/>\n    <line x1='495' y1='98' x2='535' y2='98' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l06-arrow)'/>\n    <line x1='680' y1='98' x2='720' y2='98' class='svg-flow svg-flow--request' marker-end='url(#m08l06-arrow)'/>\n    <line x1='607' y1='140' x2='285' y2='245' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l06-arrow)'/>\n    <line x1='335' y1='290' x2='415' y2='290' class='svg-flow svg-flow--request' marker-end='url(#m08l06-arrow)'/>\n    <line x1='707' y1='245' x2='607' y2='140' class='svg-flow svg-flow--response' marker-end='url(#m08l06-arrow)'/>\n    <line x1='260' y1='335' x2='430' y2='430' class='svg-flow svg-flow--response' marker-end='url(#m08l06-arrow)'/>\n    <line x1='607' y1='140' x2='535' y2='430' class='svg-flow svg-flow--response' marker-end='url(#m08l06-arrow)'/>\n    <text x='490' y='180' text-anchor='middle' class='svg-label svg-label--small'>GET /api/v1/pedidos/123 • Authorization: Bearer • Accept: application/json • X-Request-ID</text>\n    <text x='490' y='565' text-anchor='middle' class='svg-label'>API segura combina contrato, identidade, autorização, validação, gateway e observabilidade</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n\n  <p>Neste laboratório você vai analisar uma API REST fictícia, mapear endpoints, métodos, payloads, autenticação, status codes, contrato OpenAPI e controles defensivos. O objetivo é treinar leitura e diagnóstico sem depender de uma aplicação específica.</p>\n\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n\n  <p>Os exercícios treinam modelagem de recursos, escolha de métodos, interpretação de status codes, identificação de falhas de autorização e revisão de contratos JSON.</p>\n\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n\n  <p>Você receberá uma API de pedidos com falhas de contrato, autenticação e autorização. Seu desafio será propor endpoints, status codes, controles, logs e um plano de publicação seguro.</p>\n\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n\n  <p>A solução comentada aplica um método por camadas: contrato, método, URL, autenticação, autorização, validação de JSON, status code, rate limit, logs, traces e governança de mudança.</p>\n\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n\n  <p>APIs REST com JSON existem para permitir comunicação estruturada entre sistemas. Uma API saudável não é apenas um endpoint funcional: ela precisa de contrato, versionamento, autenticação, autorização, validação, observabilidade, limites de uso e documentação confiável.</p>\n  <p>Do ponto de vista de Segurança, APIs concentram riscos importantes: acesso indevido a objetos, tokens vazados, escopos amplos, payloads excessivos, logs sensíveis, CORS permissivo, rate limit ausente e mudanças quebrando consumidores. Por isso, API deve ser tratada como produto técnico governado, não como detalhe do backend.</p>\n\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n\n  <p>Na próxima aula você estudará HTTP/2, HTTP/3, QUIC e performance. Depois de entender contrato e segurança de APIs, veremos como versões modernas do HTTP mudam multiplexação, latência, transporte e diagnóstico.</p>\n\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "HTTP",
      "APIs",
      "Segurança de aplicação",
      "Contratos"
    ],
    "beforeThisLesson": "O aluno já entende HTTP, HTTPS/TLS, cookies, tokens, proxies, WAFs, load balancers e transporte TCP/UDP.",
    "afterThisLesson": "O aluno consegue analisar APIs REST/JSON, autenticação, contratos, status codes, publicação por gateway e riscos defensivos comuns.",
    "dependsOn": [
      "DNS",
      "TCP",
      "TLS",
      "HTTP",
      "Headers",
      "Cookies",
      "Tokens",
      "Proxy",
      "WAF",
      "Observabilidade"
    ]
  },
  "protocolFields": [
    {
      "field": "Method",
      "meaning": "Define a intenção HTTP da operação.",
      "securityNote": "Métodos destrutivos devem exigir autorização explícita e proteção contra uso indevido."
    },
    {
      "field": "Path",
      "meaning": "Identifica o recurso ou coleção da API.",
      "securityNote": "IDs no path precisam de autorização por objeto para evitar IDOR."
    },
    {
      "field": "Authorization",
      "meaning": "Transporta credencial como bearer token, basic ou outro esquema.",
      "securityNote": "Nunca registrar token completo em logs e nunca enviar em URL."
    },
    {
      "field": "Content-Type",
      "meaning": "Declara o tipo do body enviado pelo cliente.",
      "securityNote": "Validar tipo e tamanho para reduzir parsing indevido e abuso."
    },
    {
      "field": "Accept",
      "meaning": "Indica formato desejado na resposta.",
      "securityNote": "Negociação de conteúdo deve ser previsível e documentada."
    },
    {
      "field": "Status Code",
      "meaning": "Comunica resultado da operação.",
      "securityNote": "Códigos inconsistentes dificultam detecção, automação e troubleshooting."
    },
    {
      "field": "X-Request-ID",
      "meaning": "Identificador de correlação ponta a ponta.",
      "securityNote": "Deve ser sanitizado e não conter dado sensível."
    },
    {
      "field": "JSON body",
      "meaning": "Representação dos dados enviados ou recebidos.",
      "securityNote": "Validar schema, tipos, campos permitidos e tamanho máximo."
    }
  ],
  "packetFlow": [
    "Cliente resolve DNS do endpoint da API.",
    "Cliente estabelece TCP e TLS com o gateway ou load balancer.",
    "Cliente envia método, path, headers e JSON quando aplicável.",
    "WAF/API Gateway aplica política, autenticação, rate limit e roteamento.",
    "Backend valida contrato, autorização por objeto e regras de negócio.",
    "Backend responde com status code, headers e JSON padronizado.",
    "Logs, métricas e traces registram request ID, latência, status e identidade sanitizada."
  ],
  "deepDive": {
    "title": "REST, idempotência e segurança operacional",
    "content": "Métodos HTTP têm semântica. GET deve ser seguro e não alterar estado. PUT tende a substituir representação e pode ser idempotente. PATCH aplica alteração parcial. POST cria ou aciona processamento. DELETE remove ou desativa recurso. Quando a semântica é ignorada, caches, proxies, observabilidade e clientes automatizados podem se comportar de forma perigosa. Idempotência é importante para retry: se uma chamada falha por timeout, repetir a operação deve ou não gerar efeito duplicado? APIs maduras usam idempotency keys para operações sensíveis, especialmente pagamentos e integrações críticas.",
    "keyTakeaways": [
      "REST é mais do que JSON: envolve semântica, recursos, métodos e contratos.",
      "Autenticação identifica o consumidor; autorização decide o que ele pode fazer.",
      "Retries e timeouts exigem desenho cuidadoso para evitar duplicidade."
    ],
    "operationalImpact": [
      "APIs exigem contratos versionados, logs correlacionáveis, limites e tratamento claro de erro.",
      "Mudanças em payload, método ou status precisam passar por testes de compatibilidade.",
      "Retries, timeouts e idempotência precisam ser desenhados para evitar duplicidade."
    ],
    "financialImpact": [
      "API gateway, WAF, tracing, rate limit e SIEM adicionam custo, mas reduzem indisponibilidade e abuso.",
      "Erros de contrato geram retrabalho entre times e incidentes de integração.",
      "Logs ricos ajudam diagnóstico, mas aumentam custo de armazenamento e devem mascarar dados sensíveis."
    ],
    "securityImpact": [
      "Autenticação identifica o cliente; autorização decide o acesso ao recurso.",
      "Tokens e payloads podem vazar em logs se não houver sanitização.",
      "BOLA/IDOR, excesso de permissão e ausência de rate limit são riscos centrais em APIs."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Responder sempre HTTP 200 e colocar erro apenas no JSON.",
      "impact": "Quebra monitoramento, caches, clientes e diagnóstico.",
      "correction": "Usar status codes coerentes e corpo de erro padronizado."
    },
    {
      "mistake": "Validar apenas se o token existe.",
      "impact": "Permite acesso a objetos ou ações indevidas.",
      "correction": "Validar assinatura, expiração, audience, issuer, escopos e autorização por objeto."
    },
    {
      "mistake": "Colocar token em query string.",
      "impact": "Token aparece em logs, histórico, referer e ferramentas de observabilidade.",
      "correction": "Usar header Authorization e sanitização de logs."
    },
    {
      "mistake": "Mudar payload sem versionar contrato.",
      "impact": "Consumidores quebram sem aviso e integrações falham.",
      "correction": "Versionar API, usar testes de contrato e comunicar depreciação."
    },
    {
      "mistake": "Permitir CORS amplo sem necessidade.",
      "impact": "Aumenta superfície de uso indevido por navegadores.",
      "correction": "Definir origens, métodos e headers explicitamente."
    }
  ],
  "troubleshooting": {
    "method": "Diagnóstico por camadas de API",
    "steps": [
      "Confirmar DNS, TCP e TLS antes de analisar JSON.",
      "Reproduzir chamada com curl preservando método, headers e body.",
      "Verificar status code e corpo de erro padronizado.",
      "Conferir token: expiração, issuer, audience, escopos e relógio.",
      "Conferir se a autorização por objeto foi aplicada.",
      "Comparar payload enviado com schema documentado.",
      "Correlacionar X-Request-ID em gateway, backend, logs e SIEM.",
      "Verificar rate limit, WAF, CORS, timeout e logs do backend."
    ],
    "commands": [
      {
        "platform": "Linux/Windows",
        "command": "curl -i https://httpbin.org/json -H \"Accept: application/json\"",
        "purpose": "Testar GET JSON.",
        "expectedObservation": "Status 200 e JSON.",
        "interpretation": "Se falhar antes do status, investigar rede/TLS/proxy."
      },
      {
        "platform": "Linux/Windows",
        "command": "curl -i -X POST https://httpbin.org/post -H \"Content-Type: application/json\" --data \"{}\"",
        "purpose": "Testar POST JSON.",
        "expectedObservation": "Resposta com JSON ecoado.",
        "interpretation": "400/415 indicam problema de payload ou Content-Type."
      },
      {
        "platform": "Linux/Windows",
        "command": "curl -i https://httpbin.org/headers -H \"Authorization: Bearer <REDACTED>\"",
        "purpose": "Validar presença de header sensível sem vazar valor.",
        "expectedObservation": "Header enviado/ecoado em ambiente de teste.",
        "interpretation": "Nunca registrar token real."
      },
      {
        "platform": "Linux",
        "command": "curl -s https://httpbin.org/json | jq .",
        "purpose": "Validar estrutura JSON.",
        "expectedObservation": "JSON formatado.",
        "interpretation": "Erro de parsing indica resposta inesperada ou JSON inválido."
      },
      {
        "platform": "Pipeline",
        "command": "curl --fail-with-body --max-time 10 https://api.exemplo.local/health",
        "purpose": "Falhar pipeline em erro HTTP controlado.",
        "expectedObservation": "Exit code reflete falha HTTP/conectividade.",
        "interpretation": "Automação deve tratar timeout, retry e evidência."
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a APIs REST, JSON, autenticação e contratos.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A falha aparece antes ou depois da negociação TLS?",
      "O status veio da aplicação, do gateway, do WAF, do balanceador ou do cliente?",
      "Existe request ID/correlation ID para cruzar cliente, proxy e backend?"
    ],
    "decisionTree": [
      {
        "if": "400/422",
        "then": "Comparar body com schema e validar Content-Type."
      },
      {
        "if": "401",
        "then": "Validar autenticação, formato do token e expiração."
      },
      {
        "if": "403",
        "then": "Validar autorização, scope, role, objeto e política."
      },
      {
        "if": "409",
        "then": "Investigar conflito de estado, duplicidade e idempotency key."
      },
      {
        "if": "429",
        "then": "Aplicar backoff e verificar quota/rate limit."
      },
      {
        "if": "500",
        "then": "Correlacionar request ID com logs da aplicação sem culpar rede primeiro."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Aceitar qualquer token sem validar audience e issuer.",
      "Usar API key compartilhada por vários sistemas sem rotação.",
      "Expor documentação interna publicamente sem controle.",
      "Responder stack trace completo para clientes.",
      "Permitir alteração de campos sensíveis via mass assignment.",
      "Confiar apenas no WAF e não validar no backend."
    ],
    "vulnerabilities": [
      {
        "name": "IDOR/BOLA",
        "description": "Risco relacionado à aula 8.6 — APIs REST, JSON, autenticação e contratos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Autorização granular por objeto e ação."
      },
      {
        "name": "Broken authentication",
        "description": "Risco relacionado à aula 8.6 — APIs REST, JSON, autenticação e contratos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Schemas de entrada e saída com allowlist de campos."
      },
      {
        "name": "Broken function level authorization",
        "description": "Risco relacionado à aula 8.6 — APIs REST, JSON, autenticação e contratos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Token scopes e claims mínimos."
      },
      {
        "name": "Mass assignment",
        "description": "Risco relacionado à aula 8.6 — APIs REST, JSON, autenticação e contratos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Gateway com rate limit e validação inicial."
      },
      {
        "name": "Excessive data exposure",
        "description": "Risco relacionado à aula 8.6 — APIs REST, JSON, autenticação e contratos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Logs sanitizados e retenção adequada."
      },
      {
        "name": "Security misconfiguration",
        "description": "Risco relacionado à aula 8.6 — APIs REST, JSON, autenticação e contratos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Testes de contrato, SAST, DAST e revisão de API em PR."
      },
      {
        "name": "Rate limit ausente",
        "description": "Risco relacionado à aula 8.6 — APIs REST, JSON, autenticação e contratos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Monitoramento de anomalias por endpoint, consumidor e status code."
      },
      {
        "name": "Token leakage em logs",
        "description": "Risco relacionado à aula 8.6 — APIs REST, JSON, autenticação e contratos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Autorização granular por objeto e ação."
      },
      {
        "name": "CORS permissivo",
        "description": "Risco relacionado à aula 8.6 — APIs REST, JSON, autenticação e contratos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Autorização granular por objeto e ação."
      },
      {
        "name": "Contrato quebrado sem versionamento",
        "description": "Risco relacionado à aula 8.6 — APIs REST, JSON, autenticação e contratos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Autorização granular por objeto e ação."
      }
    ],
    "mitigations": [
      "Autorização granular por objeto e ação.",
      "Schemas de entrada e saída com allowlist de campos.",
      "Token scopes e claims mínimos.",
      "Gateway com rate limit e validação inicial.",
      "Logs sanitizados e retenção adequada.",
      "Testes de contrato, SAST, DAST e revisão de API em PR.",
      "Monitoramento de anomalias por endpoint, consumidor e status code."
    ],
    "goodPractices": [
      "Usar HTTPS obrigatório e tokens apenas em headers apropriados.",
      "Validar JWT completamente: assinatura, expiração, issuer, audience, algoritmo e escopos.",
      "Aplicar autorização por objeto, não apenas por endpoint.",
      "Definir rate limit, quota, tamanho máximo de payload e timeout.",
      "Padronizar erros sem vazar stack trace, tokens, SQL ou detalhes internos.",
      "Registrar request ID, consumidor, endpoint, status e latência sem dados sensíveis.",
      "Versionar contratos e executar testes de contrato em pipeline.",
      "Revisar CORS, cache e headers de segurança."
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
      "Autorização granular por objeto e ação.",
      "Schemas de entrada e saída com allowlist de campos.",
      "Token scopes e claims mínimos.",
      "Gateway com rate limit e validação inicial.",
      "Logs sanitizados e retenção adequada.",
      "Testes de contrato, SAST, DAST e revisão de API em PR.",
      "Monitoramento de anomalias por endpoint, consumidor e status code."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-8.6",
    "title": "API REST com GET, POST, JSON, status codes e autenticação simulada",
    "labType": "local",
    "objective": "Construir e testar chamadas REST com JSON, headers, status codes e autorização simulada usando curl e um endpoint de laboratório.",
    "scenario": "Uma integração entre pipeline e API de inventário falha. Você precisa demonstrar contrato, payload, Content-Type, autenticação simulada, respostas esperadas e evidências sanitizadas.",
    "topology": "Cliente curl -> endpoint REST de laboratório -> resposta JSON -> relatório de contrato e troubleshooting.",
    "architecture": "API REST expõe recursos; métodos HTTP expressam intenção; JSON transporta dados; headers indicam formato e credenciais; status codes comunicam resultado.",
    "prerequisites": [
      "Aulas 8.1 e 8.2 revisadas.",
      "curl disponível.",
      "jq opcional.",
      "Usar token fictício e dados de laboratório."
    ],
    "tools": [
      "curl",
      "jq opcional",
      "httpbin.org ou mock local",
      "editor de texto"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Nunca use token real em laboratório público.",
      "Não envie dados pessoais.",
      "Sanitize Authorization, Cookie, e-mails e IDs internos."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Mapear recursos e contrato",
        "instruction": "Escolha um recurso fictício, como pedidos, chamados ou ativos.",
        "artifact": "Tabela recurso | método | path | autenticação | body | status esperado.",
        "expectedOutput": "Contrato mínimo documentado.",
        "evidence": "Matriz de endpoints.",
        "explanation": "API madura começa por contrato observável."
      },
      {
        "number": 2,
        "title": "Executar GET com Accept JSON",
        "instruction": "Teste consulta de recurso em endpoint de laboratório.",
        "command": "curl -i https://httpbin.org/json -H \"Accept: application/json\"",
        "expectedOutput": "Status 200 e Content-Type compatível.",
        "evidence": "Status, Content-Type e trecho JSON sanitizado.",
        "explanation": "GET deve consultar, não alterar estado."
      },
      {
        "number": 3,
        "title": "Executar POST com JSON",
        "instruction": "Envie criação fictícia com Content-Type correto.",
        "command": "curl -i -X POST https://httpbin.org/post \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  --data \"{\"titulo\":\"chamado de teste\",\"prioridade\":\"baixa\"}\"",
        "expectedOutput": "Resposta com status de sucesso e JSON ecoado.",
        "evidence": "Payload fictício, headers e status.",
        "explanation": "Content-Type informa como o servidor deve interpretar o body."
      },
      {
        "number": 4,
        "title": "Simular autenticação com token fictício",
        "instruction": "Envie Authorization fictício e confirme que ele é tratado como evidência sensível.",
        "command": "curl -i https://httpbin.org/headers -H \"Authorization: Bearer TOKEN-FICTICIO-NAO-REAL\" -H \"X-Request-ID: lab-8-6-001\"",
        "expectedOutput": "Endpoint ecoa headers; relatório deve mascarar Authorization.",
        "evidence": "Header Authorization mascarado e X-Request-ID preservado.",
        "explanation": "O objetivo é treinar evidência sem vazar segredo."
      },
      {
        "number": 5,
        "title": "Testar erro de método/status",
        "instruction": "Colete status de erro controlado para diferenciar contrato e indisponibilidade.",
        "command": "for c in 400 401 403 404 409 422 429 500; do curl -s -o /dev/null -w \"%{http_code}\\n\" \"https://httpbin.org/status/$c\"; done",
        "expectedOutput": "Lista de status simulados.",
        "evidence": "Tabela status | significado | ação provável.",
        "explanation": "APIs bem desenhadas usam status para orientar cliente e operação."
      },
      {
        "number": 6,
        "title": "Validar JSON com jq opcional",
        "instruction": "Formate ou valide JSON quando jq estiver disponível.",
        "command": "curl -s https://httpbin.org/json | jq .",
        "expectedOutput": "JSON formatado ou erro claro se jq não estiver instalado.",
        "evidence": "JSON formatado ou observação de alternativa sem jq.",
        "explanation": "Validação de JSON evita confundir erro de sintaxe com erro de rede."
      },
      {
        "number": 7,
        "title": "Reproduzir timeout/retry de forma segura",
        "instruction": "Use timeout baixo para entender comportamento de cliente sem gerar carga.",
        "command": "curl --max-time 2 -i https://httpbin.org/delay/1",
        "expectedOutput": "Resposta dentro do limite ou timeout controlado.",
        "evidence": "Tempo, status e decisão de retry.",
        "explanation": "Retries precisam considerar idempotência para não duplicar operações."
      },
      {
        "number": 8,
        "title": "Gerar relatório sanitizado de contrato",
        "instruction": "Monte relatório com endpoints, payloads, status e riscos.",
        "artifact": "Relatório: contrato, comandos, respostas sanitizadas, riscos e decisões.",
        "expectedOutput": "Documento que outro analista consegue reproduzir sem expor segredos.",
        "evidence": "Relatório final.",
        "explanation": "APIs corporativas exigem rastreabilidade entre contrato, teste e evidência."
      }
    ],
    "expectedResult": "O aluno entrega contrato REST mínimo e evidências de GET, POST JSON, autenticação simulada, status codes e sanitização.",
    "validation": [
      {
        "check": "GET JSON executado",
        "command": "curl -i https://httpbin.org/json -H \"Accept: application/json\"",
        "expected": "200 e JSON.",
        "ifFails": "Validar conectividade, proxy e endpoint alternativo."
      },
      {
        "check": "POST JSON com Content-Type",
        "command": "curl -i -X POST https://httpbin.org/post -H \"Content-Type: application/json\" --data \"{}\"",
        "expected": "Resposta JSON.",
        "ifFails": "Conferir aspas e Content-Type."
      },
      {
        "check": "Authorization mascarado",
        "method": "Revisão manual do relatório",
        "expected": "TOKEN-FICTICIO ou <REDACTED>, nunca token real.",
        "ifFails": "Sanitizar relatório."
      },
      {
        "check": "Status codes interpretados",
        "command": "curl -s -o /dev/null -w \"%{http_code}\\n\" https://httpbin.org/status/422",
        "expected": "422",
        "ifFails": "Usar endpoint de simulação equivalente."
      },
      {
        "check": "Contrato documentado",
        "method": "Revisão da matriz de endpoints",
        "expected": "Método, path, auth, body e status esperado.",
        "ifFails": "Completar matriz."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "400/422",
        "probableCause": "Body fora do schema, JSON inválido ou campo obrigatório ausente.",
        "howToConfirm": "Comparar payload com contrato.",
        "fix": "Corrigir JSON, tipos e validação."
      },
      {
        "symptom": "401",
        "probableCause": "Token ausente, expirado ou mal formatado.",
        "howToConfirm": "Validar header Authorization sem expor valor.",
        "fix": "Renovar token ou corrigir fluxo de autenticação."
      },
      {
        "symptom": "403",
        "probableCause": "Identidade autenticada sem permissão/scope.",
        "howToConfirm": "Verificar claims/scopes e política.",
        "fix": "Ajustar autorização com menor privilégio."
      },
      {
        "symptom": "409",
        "probableCause": "Conflito de estado ou idempotência.",
        "howToConfirm": "Conferir recurso existente e idempotency key.",
        "fix": "Aplicar controle de conflito/retry seguro."
      },
      {
        "symptom": "429",
        "probableCause": "Rate limit.",
        "howToConfirm": "Verificar headers de limite e janela.",
        "fix": "Backoff, fila, quota ou ajuste de plano."
      }
    ],
    "improvements": [
      "Criar mock local com Python/Node para ambientes sem internet.",
      "Adicionar OpenAPI como contrato.",
      "Automatizar testes em pipeline com dados fictícios."
    ],
    "evidenceToCollect": [
      "Matriz de endpoints.",
      "Comandos curl GET/POST.",
      "Payloads JSON fictícios.",
      "Status codes coletados.",
      "Authorization mascarado.",
      "Request ID.",
      "Relatório final sanitizado."
    ],
    "questions": [
      "Por que GET não deve alterar estado?",
      "Qual diferença entre 401 e 403 em API?",
      "Quando retry pode duplicar operação?"
    ],
    "challenge": "Desenhe contrato de uma API de chamados com GET, POST, PATCH e DELETE, incluindo status esperados, autenticação, autorização, rate limit e logs.",
    "solution": "Liste recursos e métodos, defina payloads JSON, use status codes coerentes, proteja Authorization, adicione request ID, diferencie autenticação de autorização e documente comportamento de erro."
  },
  "mentorQuestions": [
    "O que muda entre autenticar uma chamada e autorizar acesso a um recurso específico?",
    "Por que uma API que responde sempre 200 dificulta operação e segurança?",
    "Que campos você jamais registraria integralmente nos logs de uma API?"
  ],
  "quiz": [
    {
      "question": "Em uma API REST, qual é a função principal do método HTTP?",
      "options": [
        "Indicar a intenção da operação",
        "Criptografar o payload",
        "Resolver o DNS",
        "Escolher o certificado"
      ],
      "answer": 0,
      "explanation": "Métodos como GET, POST, PUT, PATCH e DELETE indicam a intenção semântica da operação."
    },
    {
      "question": "Qual status code indica cliente autenticado, mas sem permissão suficiente?",
      "options": [
        "200",
        "401",
        "403",
        "500"
      ],
      "answer": 2,
      "explanation": "403 Forbidden indica que a identidade é conhecida, mas não autorizada para aquela ação/recurso."
    },
    {
      "question": "Qual é o risco de colocar token em query string?",
      "options": [
        "Melhora cache",
        "Pode vazar em logs, histórico e referer",
        "Impede TLS",
        "Força DNS reverso"
      ],
      "answer": 1,
      "explanation": "URLs aparecem em muitos locais; tokens devem ir em headers apropriados e logs devem ser sanitizados."
    },
    {
      "question": "OpenAPI é usado principalmente para quê?",
      "options": [
        "Descrever contrato de API",
        "Calcular rota BGP",
        "Criar VLAN",
        "Gerar certificado raiz"
      ],
      "answer": 0,
      "explanation": "OpenAPI descreve endpoints, métodos, parâmetros, schemas e respostas esperadas."
    },
    {
      "question": "IDOR/BOLA ocorre quando...",
      "options": [
        "O TLS expira",
        "O usuário acessa objeto de outro usuário por falha de autorização",
        "O DNS usa CNAME",
        "O pacote UDP é perdido"
      ],
      "answer": 1,
      "explanation": "A falha está na autorização por objeto, mesmo com autenticação válida."
    },
    {
      "question": "Qual controle reduz abuso volumétrico de API?",
      "options": [
        "Rate limit",
        "PTR",
        "ARP cache",
        "STP"
      ],
      "answer": 0,
      "explanation": "Rate limit e quotas ajudam a limitar abuso por consumidor, IP, token ou endpoint."
    }
  ],
  "flashcards": [
    {
      "front": "API",
      "back": "Contrato de comunicação entre sistemas, geralmente exposto por endpoints e formatos definidos."
    },
    {
      "front": "REST",
      "back": "Estilo arquitetural baseado em recursos, representações, métodos HTTP e interface uniforme."
    },
    {
      "front": "JSON",
      "back": "Formato textual comum para representar dados estruturados em APIs."
    },
    {
      "front": "JWT",
      "back": "Token assinado que pode carregar claims como issuer, audience, expiração e escopos."
    },
    {
      "front": "OpenAPI",
      "back": "Especificação para documentar e validar contratos de APIs HTTP."
    },
    {
      "front": "IDOR/BOLA",
      "back": "Falha em que um usuário acessa objetos de outro por autorização insuficiente."
    }
  ],
  "exercises": [
    {
      "title": "Escolha de métodos",
      "prompt": "Defina métodos HTTP para listar pedidos, criar pedido, alterar status e cancelar pedido.",
      "expectedAnswer": "GET para listar/consultar, POST para criar, PATCH para alteração parcial e DELETE ou PATCH para cancelamento conforme regra de negócio."
    },
    {
      "title": "Status codes",
      "prompt": "Escolha status para payload inválido, token ausente, sem permissão, conflito de versão e excesso de chamadas.",
      "expectedAnswer": "400/422, 401, 403, 409 e 429, com corpo de erro padronizado."
    },
    {
      "title": "Autorização por objeto",
      "prompt": "Explique como evitar que /clientes/123 seja usado para acessar cliente de outro usuário.",
      "expectedAnswer": "Validar no backend se a identidade e escopos têm permissão sobre aquele objeto específico."
    },
    {
      "title": "Logs seguros",
      "prompt": "Liste campos de log úteis e campos que devem ser mascarados.",
      "expectedAnswer": "Úteis: request ID, método, path normalizado, status, latência, consumidor. Mascarar: token, senha, dados pessoais e payload sensível."
    },
    {
      "id": "ex8.6.p1-06.1",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de evidências para diferenciar falha de DNS, TCP, TLS, HTTP, gateway e aplicação usando os comandos do laboratório.",
      "expectedAnswer": "A matriz deve incluir comando, evidência esperada, interpretação e próximo passo para cada camada.",
      "explanation": "Troubleshooting profissional evita pular direto para a aplicação quando a falha pode estar em DNS, transporte, TLS ou proxy."
    }
  ],
  "challenge": {
    "title": "Revisar uma API de pedidos antes da publicação",
    "scenario": "Uma equipe quer publicar /api/pedidos com GET, POST e DELETE. A API usa JWT, mas ainda não tem contrato OpenAPI, rate limit, logs padronizados nem validação por objeto.",
    "tasks": [
      "Criar matriz de endpoints",
      "Definir status codes",
      "Definir escopos",
      "Definir validação por objeto",
      "Propor campos de log",
      "Propor controles no API Gateway"
    ],
    "successCriteria": [
      "Contrato documentado",
      "Autorização por objeto incluída",
      "Tokens não aparecem em logs",
      "Rate limit definido",
      "Status codes coerentes",
      "Backend não exposto diretamente"
    ]
  },
  "commentedSolution": {
    "summary": "A solução segura trata a API como produto governado. Primeiro define contrato, depois autenticação, autorização, validação, publicação, logs e testes.",
    "steps": [
      "Criar OpenAPI com endpoints versionados em /api/v1.",
      "Usar GET para consulta, POST para criação, PATCH para alteração e DELETE apenas se a regra permitir remoção real.",
      "Exigir JWT com issuer, audience, expiração e escopos validados.",
      "Aplicar autorização por objeto no backend para cada pedido.",
      "Configurar API Gateway com TLS, rate limit, tamanho máximo de payload e request ID.",
      "Registrar logs sanitizados e correlacionar gateway, backend e SIEM.",
      "Executar testes de contrato e testes negativos no pipeline."
    ],
    "whyItWorks": "Essa abordagem reduz quebra de integração, limita abuso, melhora investigação e evita que autenticação seja confundida com autorização completa."
  },
  "glossary": [
    {
      "term": "Endpoint",
      "definition": "URL específica de uma API que representa recurso ou operação."
    },
    {
      "term": "Recurso",
      "definition": "Entidade manipulada pela API, como pedido, usuário ou chamado."
    },
    {
      "term": "Contrato",
      "definition": "Definição formal do que a API aceita e retorna."
    },
    {
      "term": "OpenAPI",
      "definition": "Formato comum para documentar APIs HTTP."
    },
    {
      "term": "JWT",
      "definition": "Token assinado com claims usado frequentemente em autenticação/autorização."
    },
    {
      "term": "Scope",
      "definition": "Permissão declarada que limita o que um token pode fazer."
    },
    {
      "term": "IDOR/BOLA",
      "definition": "Falha de autorização por objeto que permite acesso indevido a recursos."
    },
    {
      "term": "Rate limit",
      "definition": "Limite de requisições por janela de tempo, consumidor ou endpoint."
    }
  ],
  "references": [
    {
      "title": "RFC 9110 — HTTP Semantics",
      "type": "standard",
      "note": "Base conceitual para métodos, status e semântica HTTP."
    },
    {
      "title": "OpenAPI Specification",
      "type": "specification",
      "note": "Referência para contratos de APIs HTTP."
    },
    {
      "title": "OWASP API Security Top 10",
      "type": "security-guide",
      "note": "Referência defensiva para riscos comuns em APIs."
    },
    {
      "title": "OAuth 2.0 e OpenID Connect",
      "type": "identity",
      "note": "Serão aprofundados no curso de Enterprise Identity/IAM."
    },
    {
      "title": "OWASP Cheat Sheet Series — REST Security",
      "type": "security-guide",
      "organization": "OWASP",
      "note": "Boas práticas defensivas para APIs e HTTP."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "OIDC/OAuth2",
      "reason": "Autenticação e autorização de APIs usam conceitos de IdP, tokens, scopes, claims, issuer e audience."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e Platform Engineering",
      "reason": "Contratos OpenAPI, gateways, IaC e validação de segurança devem ser integrados a pipelines."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 8",
      "reason": "APIs dependem de transporte, portas, TLS, NAT, firewall e troubleshooting TCP/UDP."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "Ler todos os blocos conceituais",
      "Concluir quiz com aproveitamento mínimo",
      "Executar laboratório ou produzir matriz equivalente",
      "Responder ao desafio com solução comentada"
    ],
    "estimatedXp": 275,
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
      "8.7"
    ]
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
