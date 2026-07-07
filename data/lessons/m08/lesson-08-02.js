export const lesson0802 = {
  "id": "8.2",
  "moduleId": "m08",
  "order": 2,
  "title": "Requisições e respostas: métodos, URLs, headers, body e status codes",
  "subtitle": "Aprenda a ler uma conversa HTTP real: como uma URL vira uma requisição, como métodos expressam intenção, como headers carregam contexto, como o body transporta dados e como status codes orientam troubleshooting, segurança e automação.",
  "duration": "120-175 min",
  "estimatedStudyTimeMinutes": 175,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 270,
  "tags": [
    "redes",
    "http",
    "api",
    "url",
    "headers",
    "status codes",
    "curl",
    "troubleshooting",
    "web",
    "segurança",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.1",
      "title": "Por que HTTP existe",
      "reason": "Esta aula aprofunda a estrutura da requisição e resposta apresentada na aula anterior."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "HTTP usa sockets e portas para conectar cliente e servidor."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.1",
      "title": "Por que DNS existe",
      "reason": "URLs normalmente usam nomes, que precisam ser resolvidos antes da requisição."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.9",
      "title": "Segurança em transporte: exposição, scans, TLS e hardening",
      "reason": "A análise de headers e métodos exige visão de exposição e hardening de transporte."
    }
  ],
  "objectives": [
    "Decompor uma URL em esquema, host, porta, caminho, query string e fragmento.",
    "Explicar a função de métodos HTTP como GET, POST, PUT, PATCH, DELETE, HEAD e OPTIONS.",
    "Ler headers de requisição e resposta com foco em diagnóstico e segurança.",
    "Diferenciar body de requisição, body de resposta, query string e headers.",
    "Interpretar classes de status codes 1xx, 2xx, 3xx, 4xx e 5xx.",
    "Usar curl, navegador e logs para investigar falhas HTTP de forma metódica."
  ],
  "learningOutcomes": [
    "Ler uma requisição HTTP crua e identificar cada campo importante.",
    "Montar comandos curl seguros para GET, POST, headers e análise de status.",
    "Explicar por que 401, 403, 404, 409, 429, 500, 502, 503 e 504 apontam causas diferentes.",
    "Separar erro de cliente, erro de proxy, erro de backend e erro de aplicação.",
    "Criar uma matriz de endpoints com método, rota, autenticação, dono e logs esperados."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Na aula anterior você entendeu por que HTTP existe. Agora vamos abrir a conversa HTTP por dentro. Em ambientes reais, quase todo incidente web começa com perguntas como: qual URL foi chamada? Qual método? Quais headers chegaram ao backend? O corpo foi aceito? O proxy devolveu 502 ou a aplicação devolveu 500? O cliente recebeu 401 por falta de autenticação ou 403 por falta de autorização?</p><p>Sem saber ler uma requisição e uma resposta, o profissional de redes, segurança ou DevSecOps fica preso a sintomas genéricos. Com essa leitura, você consegue separar falhas de DNS, TCP, TLS, proxy, WAF, aplicação, autenticação e autorização.</p><div class='callout'><strong>Ideia central:</strong> HTTP é uma conversa estruturada. Método, URL, headers, body e status code são evidências técnicas, não detalhes decorativos.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>HTTP começou simples: um cliente pedia um recurso e o servidor respondia. Conforme a Web deixou de servir apenas documentos e passou a sustentar aplicações, formulários, APIs, login, cache, proxies e integrações, a estrutura da mensagem HTTP precisou carregar mais contexto.</p><p>Os métodos passaram a expressar intenção. Headers passaram a transportar metadados de formato, autenticação, cache, idioma, origem, compressão, sessão e segurança. Status codes passaram a permitir que clientes, proxies e observabilidade entendessem o resultado sem interpretar todo o corpo da resposta.</p><p>Hoje, essa estrutura é usada não apenas por navegadores, mas por APIs REST, webhooks, pipelines, health checks, CDNs, WAFs, API gateways, load balancers, service meshes e ferramentas de monitoramento.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Sem estrutura padronizada, cliente e servidor precisariam combinar formatos próprios para cada aplicação. Um proxy não saberia distinguir sucesso de erro. Um cache não saberia se pode armazenar a resposta. Um cliente não saberia se deve autenticar novamente, redirecionar, repetir a requisição ou exibir erro.</p><p>Outro problema é investigativo. Quando uma API falha, dizer apenas <em>não funciona</em> é inútil. Você precisa saber se houve 400 por payload inválido, 401 por token ausente, 403 por autorização negada, 404 por rota inexistente, 409 por conflito, 429 por rate limit, 500 por erro interno, 502 por upstream inválido, 503 por indisponibilidade ou 504 por timeout.</p><div class='callout callout--problem'><strong>Problema prático:</strong> a mesma URL pode falhar por método errado, header ausente, body inválido, token expirado, proxy mal roteado, backend fora do ar ou política de WAF. Cada evidência aponta para uma equipe e uma correção diferente.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>As primeiras versões de HTTP eram simples e muito próximas de transferência de documentos. Com HTTP/1.1, o cabeçalho <code>Host</code> se tornou essencial para hospedar múltiplos sites no mesmo IP, conexões persistentes reduziram overhead, e cache/negociação de conteúdo amadureceram.</p><p>Com APIs e arquiteturas distribuídas, métodos e status codes passaram a ter papel central em contratos de integração. Mais tarde, HTTP/2 e HTTP/3 melhoraram performance e multiplexação, mas a semântica básica continuou: requisição, resposta, método, URL, headers, body e status.</p><p>Na segurança moderna, headers como <code>Authorization</code>, <code>Cookie</code>, <code>Set-Cookie</code>, <code>Strict-Transport-Security</code>, <code>Content-Security-Policy</code> e <code>Cache-Control</code> viraram parte direta do hardening.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p>Uma <strong>requisição HTTP</strong> é uma mensagem enviada pelo cliente ao servidor. Ela contém uma linha inicial com método e alvo, headers com metadados e um corpo opcional. Uma <strong>resposta HTTP</strong> é a mensagem devolvida pelo servidor ou intermediário, contendo status code, headers e corpo opcional.</p><div class='definition-box'>Requisição HTTP = intenção + recurso + contexto + dados opcionais. Resposta HTTP = resultado + metadados + conteúdo opcional.</div><p>Essa estrutura permite que humanos, ferramentas e sistemas automatizados leiam a conversa e tomem decisões: autenticar, negar, redirecionar, repetir, cachear, alertar, bloquear, registrar ou encaminhar.</p>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Uma URL como <code>https://api.empresa.com:443/v1/pedidos?status=aberto</code> não é uma coisa única. Ela tem partes com funções diferentes.</p><table class='data-table'><thead><tr><th>Parte</th><th>Exemplo</th><th>Função</th></tr></thead><tbody><tr><td>Esquema</td><td>https</td><td>Define protocolo e expectativa de TLS</td></tr><tr><td>Host</td><td>api.empresa.com</td><td>Nome resolvido por DNS e usado em Host/SNI</td></tr><tr><td>Porta</td><td>443</td><td>Processo/serviço de destino no transporte</td></tr><tr><td>Caminho</td><td>/v1/pedidos</td><td>Recurso ou rota na aplicação</td></tr><tr><td>Query string</td><td>?status=aberto</td><td>Parâmetros de consulta</td></tr><tr><td>Fragmento</td><td>#secao</td><td>Âncora local do cliente; normalmente não vai ao servidor</td></tr></tbody></table><p>Depois de resolver DNS, abrir transporte e negociar TLS, o cliente envia uma mensagem com método, caminho, headers e body opcional. O servidor responde com status code, headers e body.</p>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04d-8-2-request-response-anatomy'>\n  <h4>Anatomia defensiva de uma requisição e de uma resposta</h4>\n  <p>Uma requisição HTTP não é apenas uma URL. Ela combina método, path, query string, versão/protocolo, headers e corpo. A resposta combina status code, headers e corpo. Para troubleshooting, cada parte responde uma pergunta: qual ação foi solicitada, qual recurso foi alvo, quais formatos foram negociados, como o cliente se identificou, qual política intermediária foi aplicada e como o servidor classificou o resultado.</p>\n  <p>O erro comum é olhar apenas o status final. Dois testes para a mesma URL podem gerar resultados diferentes se mudarem método, header <code>Accept</code>, header <code>Content-Type</code>, token, cookie, Host, SNI, origem, proxy ou corpo JSON. Por isso, evidência HTTP boa precisa registrar request e response, não apenas “deu erro”.</p>\n</div>",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura corporativa, a requisição raramente chega direto à aplicação. Ela pode atravessar CDN, proxy reverso, WAF, load balancer, API gateway, ingress controller, service mesh e backend. Cada camada pode ler ou alterar partes específicas da mensagem HTTP.</p><table class='comparison-table'><thead><tr><th>Elemento HTTP</th><th>Quem usa</th><th>Uso operacional</th><th>Risco</th></tr></thead><tbody><tr><td>Método</td><td>Aplicação, WAF, API Gateway</td><td>Permitir GET/POST e bloquear métodos indevidos</td><td>Métodos perigosos expostos</td></tr><tr><td>Path</td><td>Proxy, Gateway, Backend</td><td>Roteamento por endpoint</td><td>Bypass por rota alternativa</td></tr><tr><td>Headers</td><td>Cliente, proxy, app, observabilidade</td><td>Autenticação, conteúdo, cache e correlação</td><td>Vazamento de token em logs</td></tr><tr><td>Body</td><td>Aplicação e validação</td><td>Dados enviados pelo cliente</td><td>Payload malicioso ou grande demais</td></tr><tr><td>Status</td><td>Cliente, monitoramento, proxy</td><td>Sinalizar sucesso, erro ou timeout</td><td>Status incorreto mascarando falha</td></tr></tbody></table>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04d-8-2-gateway-contract'>\n  <h4>Contrato HTTP entre cliente, gateway e aplicação</h4>\n  <p>Em APIs corporativas, o contrato HTTP define o que o cliente pode fazer. O gateway pode exigir método correto, header de autenticação, <code>Content-Type</code>, tamanho máximo de corpo, rota válida, tenant, versão da API e rate limit. A aplicação, por sua vez, valida autorização de negócio, schema, parâmetros e estado do recurso.</p>\n  <table class='data-table'>\n    <thead><tr><th>Parte</th><th>Exemplo</th><th>Falha típica</th><th>Evidência</th></tr></thead>\n    <tbody>\n      <tr><td>Método</td><td>GET, POST, PUT, DELETE</td><td>405 Method Not Allowed</td><td><code>curl -X</code> e logs do gateway</td></tr>\n      <tr><td>Path</td><td>/v1/orders</td><td>404 ou rota errada</td><td>path normalizado e upstream escolhido</td></tr>\n      <tr><td>Authorization</td><td>Bearer token</td><td>401 ou 403</td><td>presença do header sem registrar valor</td></tr>\n      <tr><td>Content-Type</td><td>application/json</td><td>415 ou parsing incorreto</td><td>headers e erro de validação</td></tr>\n      <tr><td>Body</td><td>{\"id\":123}</td><td>400 por schema inválido</td><td>payload sanitizado e mensagem de erro</td></tr>\n      <tr><td>Upstream</td><td>serviço backend</td><td>502/504</td><td>logs do gateway, timeout e health check</td></tr>\n    </tbody>\n  </table>\n</div>",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine um protocolo de atendimento em uma empresa. A URL é o endereço do departamento e do formulário. O método é a intenção: consultar, criar, alterar ou remover. Os headers são os documentos anexos e instruções de atendimento. O body é o conteúdo do pedido. O status code é a resposta padronizada: aceito, negado, inexistente, erro interno ou tente novamente.</p><p>A analogia ajuda, mas HTTP é mais rígido e automatizado. Um proxy pode tomar decisões só lendo método, path, Host e headers. Um SIEM pode gerar alerta por status 401 em excesso. Um cache pode armazenar ou recusar respostas com base em headers.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Ao abrir uma página, o navegador pode enviar algo semelhante a:</p><pre><code>GET /aulas HTTP/1.1\nHost: universidade.local\nAccept: text/html\nUser-Agent: navegador\n</code></pre><p>O servidor pode responder:</p><pre><code>HTTP/1.1 200 OK\nContent-Type: text/html\nCache-Control: no-cache\n\n&lt;html&gt;...&lt;/html&gt;</code></pre><p>Mesmo nesse exemplo simples, já existem evidências: método, recurso, host, tipo aceito, status, tipo de conteúdo e política de cache.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa publica <code>https://portal.empresa.com</code> atrás de WAF e load balancer. O cliente envia <code>GET /dashboard</code>. O WAF verifica método, Host, path, headers e cookies. O load balancer escolhe um backend saudável. A aplicação valida sessão e responde 200, 302, 401 ou 403.</p><p>Quando o usuário reclama, o time precisa correlacionar request ID no WAF, status no load balancer, logs da aplicação, identidade do usuário e headers relevantes. Sem entender a estrutura HTTP, a investigação vira tentativa e erro.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, HTTP pode atravessar CDN, WAF gerenciado, Application Load Balancer, API Gateway, ingress Kubernetes, service mesh e serviço backend. O roteamento pode depender do Host header, path, método, header customizado ou versão da API.</p><p>Um erro 403 pode vir do WAF, do API Gateway, da aplicação ou de uma política IAM integrada. Um 502 pode vir do load balancer porque o target não respondeu corretamente. Um 504 pode indicar timeout entre gateway e backend. A camada exata que emitiu o status importa muito.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Pipelines modernos testam endpoints HTTP com health checks, smoke tests e validações de contrato. Um deploy pode passar se <code>/health</code> retorna 200, mas falhar funcionalmente se <code>/api/v1/orders</code> retorna 500 por migração de banco incompleta.</p><p>Em IaC, métodos permitidos, paths, CORS, headers obrigatórios, autenticação e rate limit devem ser versionados. Em observabilidade, request ID e correlation ID ligam proxy, gateway, aplicação e logs de auditoria.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Para segurança, HTTP é onde aparecem tokens, cookies, sessões, payloads, APIs administrativas, dados pessoais e erros de aplicação. Headers mal configurados podem expor sessão, permitir cache indevido ou enfraquecer proteção no navegador.</p><p>Uma regra de WAF pode bloquear <code>POST /admin</code>, mas se existe <code>PUT /internal/admin</code> sem controle, o risco continua. Uma API pode exigir token, mas se logs armazenam <code>Authorization: Bearer</code> completo, o controle vira fonte de vazamento.</p><div class='callout callout--security'><strong>Princípio defensivo:</strong> registre evidências suficientes para investigar, mas nunca registre segredos completos.</div>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04d-8-2-headers-logs-risk'>\n  <h4>Headers e corpo como evidência e risco</h4>\n  <p>Headers ajudam muito no diagnóstico, mas também carregam dados sensíveis. <code>Authorization</code>, <code>Cookie</code>, <code>Set-Cookie</code>, tokens CSRF, IDs de sessão e payloads com dados pessoais não devem ser copiados integralmente para tickets ou chats. O padrão profissional é registrar presença, tipo e metadados, mascarando valores.</p>\n  <p>O mesmo vale para corpo JSON. Para validar erro 400, talvez seja necessário mostrar campos e formato, mas não valores reais de CPF, senha, token, e-mail pessoal ou dados financeiros. Evidência boa permite reproduzir a falha sem vazar segredo.</p>\n</div>",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 580' role='img' aria-labelledby='m08l02-title m08l02-desc'>\n    <title id='m08l02-title'>Estrutura de requisição e resposta HTTP</title>\n    <desc id='m08l02-desc'>Cliente envia método, URL, headers e body para proxy e aplicação; servidor responde status, headers e body.</desc>\n    <defs><marker id='m08l02-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'/></marker></defs>\n    <rect x='40' y='70' width='180' height='110' rx='14' class='svg-node svg-node--client'/>\n    <text x='130' y='115' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='130' y='142' text-anchor='middle' class='svg-label svg-label--small'>browser, curl, app</text>\n    <rect x='300' y='70' width='190' height='110' rx='14' class='svg-node svg-node--firewall'/>\n    <text x='395' y='113' text-anchor='middle' class='svg-label'>Proxy/WAF</text>\n    <text x='395' y='142' text-anchor='middle' class='svg-label svg-label--small'>lê Host, path, headers</text>\n    <rect x='585' y='70' width='180' height='110' rx='14' class='svg-node svg-node--server'/>\n    <text x='675' y='115' text-anchor='middle' class='svg-label'>Aplicação</text>\n    <text x='675' y='142' text-anchor='middle' class='svg-label svg-label--small'>rota + regra + lógica</text>\n    <line x1='225' y1='125' x2='295' y2='125' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l02-arrow)'/>\n    <line x1='495' y1='125' x2='580' y2='125' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l02-arrow)'/>\n    <rect x='70' y='245' width='360' height='210' rx='12' class='svg-zone'/>\n    <text x='250' y='277' text-anchor='middle' class='svg-label'>Requisição HTTP</text>\n    <text x='95' y='315' class='svg-label svg-label--small'>POST /api/v1/pedidos?status=aberto HTTP/1.1</text>\n    <text x='95' y='345' class='svg-label svg-label--small'>Host: api.empresa.com</text>\n    <text x='95' y='375' class='svg-label svg-label--small'>Authorization: Bearer ***</text>\n    <text x='95' y='405' class='svg-label svg-label--small'>Content-Type: application/json</text>\n    <text x='95' y='435' class='svg-label svg-label--small'>{ body JSON }</text>\n    <rect x='545' y='245' width='360' height='210' rx='12' class='svg-zone'/>\n    <text x='725' y='277' text-anchor='middle' class='svg-label'>Resposta HTTP</text>\n    <text x='570' y='315' class='svg-label svg-label--small'>HTTP/1.1 201 Created</text>\n    <text x='570' y='345' class='svg-label svg-label--small'>Content-Type: application/json</text>\n    <text x='570' y='375' class='svg-label svg-label--small'>Cache-Control: no-store</text>\n    <text x='570' y='405' class='svg-label svg-label--small'>X-Request-ID: req-123</text>\n    <text x='570' y='435' class='svg-label svg-label--small'>{ resposta JSON }</text>\n    <line x1='545' y1='470' x2='430' y2='470' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m08l02-arrow)'/>\n    <line x1='430' y1='470' x2='250' y2='470' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m08l02-arrow)'/>\n    <text x='490' y='525' text-anchor='middle' class='svg-label svg-label--small'>Método + URL + headers + body formam a evidência da requisição; status + headers + body formam a evidência da resposta.</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório você vai usar curl, navegador e logs locais para decompor uma requisição e uma resposta HTTP. O foco é defensivo: entender evidências sem expor tokens reais ou payloads sensíveis.</p>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04d-8-2-curl-lab-purpose'>\n  <h4>O que este lab precisa provar</h4>\n  <p>Ao final do laboratório, você deve conseguir apontar, com evidência, qual parte da troca HTTP mudou: método, URL, header, body, status code, redirect, gateway, autenticação, autorização ou upstream. O objetivo não é decorar códigos, mas ler a conversa de aplicação como um analista de infraestrutura, DevSecOps ou segurança.</p>\n</div>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam decomposição de URL, escolha de método correto, leitura de headers e interpretação de status codes em incidentes reais.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário de API que retorna códigos diferentes conforme método, token, payload e proxy. Sua tarefa é montar um diagnóstico completo e seguro.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada mostra como ler a mensagem HTTP sem pular camadas: URL, método, headers obrigatórios, body, status, headers de resposta, request ID e logs.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Requisições e respostas HTTP são mensagens estruturadas. Métodos expressam intenção, URLs apontam recursos, headers carregam contexto, bodies transportam dados e status codes resumem o resultado. Em troubleshooting, esses campos viram evidências. Em segurança, viram pontos de controle.</p><p>Entender essa estrutura prepara você para HTTPS/TLS, cookies, APIs REST, proxies, WAFs, load balancers e hardening HTTP.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará HTTPS, TLS, certificados, SNI e cadeia de confiança. A pergunta muda de <em>como a mensagem HTTP é estruturada</em> para <em>como proteger essa conversa contra interceptação e falsificação</em>.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Camada 6",
      "Camada 4"
    ],
    "beforeThisLesson": "O aluno entende por que HTTP existe e já estudou DNS, TCP, UDP, portas, NAT e troubleshooting básico.",
    "afterThisLesson": "O aluno consegue ler e interpretar mensagens HTTP reais, separando método, URL, headers, body e status code.",
    "dependsOn": [
      "DNS",
      "TCP",
      "TLS",
      "Portas",
      "Proxies",
      "APIs",
      "Logs"
    ]
  },
  "protocolFields": [
    {
      "field": "Method",
      "meaning": "Indica a intenção da requisição, como GET, POST, PUT, PATCH, DELETE, HEAD ou OPTIONS.",
      "securityNote": "Métodos desnecessários devem ser bloqueados ou autenticados; métodos administrativos ampliam superfície de ataque."
    },
    {
      "field": "Request Target / Path",
      "meaning": "Indica o recurso solicitado, incluindo caminho e, muitas vezes, query string.",
      "securityNote": "Paths sensíveis precisam de autorização e logs; query string pode vazar tokens se mal usada."
    },
    {
      "field": "Host",
      "meaning": "Nome do host solicitado, essencial para virtual hosts, proxies e roteamento por domínio.",
      "securityNote": "Validação fraca pode permitir host header injection ou roteamento indevido."
    },
    {
      "field": "Headers",
      "meaning": "Metadados da conversa: Accept, Content-Type, Authorization, Cookie, Cache-Control, User-Agent e outros.",
      "securityNote": "Headers podem conter segredos; devem ser mascarados em logs."
    },
    {
      "field": "Body",
      "meaning": "Dados enviados ao servidor ou devolvidos pelo servidor, comuns em JSON, HTML, formulários e arquivos.",
      "securityNote": "Corpo precisa de validação, limite de tamanho e proteção contra vazamento."
    },
    {
      "field": "Status Code",
      "meaning": "Código numérico que resume o resultado da resposta.",
      "securityNote": "Códigos ajudam investigação, mas mensagens detalhadas demais podem vazar tecnologia interna."
    }
  ],
  "packetFlow": [
    "Cliente recebe ou monta uma URL.",
    "Cliente separa esquema, host, porta, path e query string.",
    "DNS resolve o host e transporte conecta ao serviço.",
    "Cliente envia linha de requisição com método e alvo.",
    "Cliente adiciona headers obrigatórios e opcionais.",
    "Cliente envia body quando o método e a operação exigem dados.",
    "Proxy/WAF/gateway pode validar Host, método, path, headers e tamanho do body.",
    "Aplicação processa rota, autenticação, autorização, validação e regra de negócio.",
    "Servidor/intermediário devolve status, headers e body.",
    "Cliente interpreta status, redirecionamento, cache, cookies e conteúdo."
  ],
  "deepDive": {
    "title": "Status code é evidência, não diagnóstico completo",
    "points": [
      "Um 400 sugere requisição malformada ou payload inválido, mas logs da aplicação confirmam a causa.",
      "Um 401 indica problema de autenticação; 403 indica acesso negado ou política bloqueando.",
      "Um 404 pode ser recurso inexistente, rota errada ou ocultação deliberada de recurso.",
      "Um 429 indica rate limit e deve ser correlacionado com identidade, IP, endpoint e janela de tempo.",
      "Um 500 aponta erro interno, mas 502/503/504 frequentemente envolvem proxy, gateway, backend ou timeout.",
      "A fonte que emitiu o status importa: navegador, CDN, WAF, gateway, load balancer ou aplicação."
    ],
    "operationalImpact": [
      "Métodos, headers e status codes padronizam integrações, mas exigem contrato de API e observabilidade consistente.",
      "Gateways e proxies podem alterar ou remover headers, criando bugs difíceis se não houver request ID e logs correlacionáveis.",
      "Mudanças de método, path ou Content-Type precisam ser testadas em pipeline antes de produção."
    ],
    "financialImpact": [
      "Logs de request/response são valiosos, mas aumentam custo de armazenamento e SIEM.",
      "API Gateways, WAFs, tracing e rate limiting reduzem risco, mas adicionam cobrança e complexidade operacional.",
      "Falhas de contrato HTTP podem gerar indisponibilidade, retrabalho e aumento de incidentes entre times."
    ],
    "securityImpact": [
      "Headers de autenticação, cookies e corpos de requisição podem vazar segredo se forem registrados sem mascaramento.",
      "Métodos perigosos expostos sem autorização adequada ampliam risco de alteração ou exclusão indevida de dados.",
      "Status codes e mensagens detalhadas demais podem revelar estrutura interna, rotas e tecnologias."
    ]
  },
  "commonMistakes": [
    "Enviar token em query string e depois vazar em logs, histórico e referer.",
    "Usar POST para tudo e perder semântica útil de cache, idempotência e auditoria.",
    "Tratar 401 e 403 como se fossem o mesmo problema.",
    "Ver 502 e investigar apenas o código da aplicação, ignorando proxy e upstream.",
    "Registrar Authorization e Cookie completos em logs de troubleshooting.",
    "Assumir que 200 OK significa sucesso de negócio sem validar body e contrato.",
    "Confundir redirecionamento 301/302 com falha de rede."
  ],
  "troubleshooting": {
    "method": "Ler a conversa HTTP em ordem: URL, DNS, transporte/TLS, método, path, headers, body, status, headers de resposta, body e logs correlacionados.",
    "windows": [
      "Resolve-DnsName api.empresa.local",
      "Test-NetConnection api.empresa.local -Port 443",
      "curl.exe -vk https://api.empresa.local/v1/health",
      "curl.exe -i -X POST https://api.empresa.local/v1/pedidos -H \"Content-Type: application/json\" --data \"{}\"",
      "Invoke-WebRequest https://api.empresa.local/v1/health -Headers @{\"X-Request-ID\"=\"teste\"}"
    ],
    "linux": [
      "dig api.empresa.local",
      "curl -vk https://api.empresa.local/v1/health",
      "curl -i -X OPTIONS https://api.empresa.local/v1/pedidos",
      "curl -i -H 'Accept: application/json' https://api.empresa.local/v1/pedidos",
      "sudo tcpdump -n host <ip> and port 443"
    ],
    "browser": [
      "Abrir DevTools na aba Network",
      "Conferir Request URL, Method, Status, Remote Address e Timing",
      "Comparar request headers e response headers",
      "Verificar redirects, cookies e cache",
      "Copiar como curl após remover tokens reais"
    ],
    "proxyGateway": [
      "Conferir se Host e path bateram na regra esperada",
      "Verificar método permitido",
      "Conferir tamanho máximo de body",
      "Validar request ID/correlation ID",
      "Comparar status emitido pelo gateway e pelo backend"
    ],
    "cloud": [
      "Validar listener e regra por Host/path",
      "Conferir WAF logs por request ID",
      "Validar target/backend health",
      "Conferir status 4xx/5xx no load balancer",
      "Verificar logs da função, container ou aplicação"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Requisições e respostas: métodos, URLs, headers, body e status codes.",
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
    "commands": [
      {
        "platform": "Linux/Windows",
        "command": "curl -vk https://httpbin.org/get",
        "purpose": "Observar request, TLS, status, headers e corpo.",
        "expectedObservation": "Saída mostra negociação e resposta HTTP.",
        "interpretation": "Se falhar antes dos headers, investigar DNS/TCP/TLS/proxy."
      },
      {
        "platform": "Linux/Windows",
        "command": "curl -s -D - https://example.com/ -o /dev/null",
        "purpose": "Coletar headers sem body.",
        "expectedObservation": "Status e headers de resposta.",
        "interpretation": "Útil para cache, redirects e headers de segurança."
      },
      {
        "platform": "Linux/Windows",
        "command": "curl -i -X POST https://httpbin.org/post -H \"Content-Type: application/json\" --data \"{}\"",
        "purpose": "Validar método, body e Content-Type.",
        "expectedObservation": "Resposta HTTP com corpo JSON.",
        "interpretation": "400/415 sugerem problema de payload ou tipo de mídia."
      },
      {
        "platform": "Navegador",
        "command": "DevTools > Network > Copy as cURL",
        "purpose": "Reproduzir a requisição do navegador no terminal.",
        "expectedObservation": "Comando equivalente com headers.",
        "interpretation": "Remover tokens antes de compartilhar."
      },
      {
        "platform": "Proxy/API Gateway",
        "command": "grep \"lab-8-2-001\" access.log",
        "purpose": "Correlacionar request ID com logs.",
        "expectedObservation": "Entrada correspondente no gateway/backend.",
        "interpretation": "Sem correlação, a análise fica incompleta."
      }
    ],
    "decisionTree": [
      {
        "if": "400",
        "then": "Validar query string, body, schema, Content-Type e limite de tamanho."
      },
      {
        "if": "401",
        "then": "Verificar autenticação ausente, token expirado ou cookie inválido."
      },
      {
        "if": "403",
        "then": "Verificar autorização, política de WAF, ACL, escopo ou regra de gateway."
      },
      {
        "if": "415",
        "then": "Conferir Content-Type, Accept e formato real do body."
      },
      {
        "if": "429",
        "then": "Checar rate limit por IP, usuário, token, rota e janela de tempo."
      },
      {
        "if": "502/504",
        "then": "Correlacionar gateway, health check, upstream, timeout e request ID."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Permitir apenas métodos necessários por endpoint.",
      "Exigir autenticação e autorização por rota sensível.",
      "Mascarar Authorization, Cookie, Set-Cookie e dados pessoais em logs.",
      "Usar request ID para correlação segura entre camadas.",
      "Definir limites de tamanho de body e timeout.",
      "Configurar Cache-Control adequado para dados privados.",
      "Documentar endpoints, métodos, donos e exposição."
    ],
    "badPractices": [
      "Aceitar qualquer método HTTP sem necessidade.",
      "Colocar tokens em query string.",
      "Logar payloads sensíveis sem mascaramento.",
      "Retornar stack trace detalhado para clientes externos.",
      "Permitir Host header arbitrário em proxy reverso.",
      "Usar 200 OK para erros de negócio sem contrato claro."
    ],
    "attacksAndDefenses": [
      {
        "risk": "Method abuse",
        "defense": "Bloquear métodos não usados e validar autorização por método e rota."
      },
      {
        "risk": "Host header injection",
        "defense": "Validar hosts permitidos no proxy e na aplicação."
      },
      {
        "risk": "Token leakage",
        "defense": "Não usar tokens em query string e mascarar headers sensíveis."
      },
      {
        "risk": "Cache indevido de dados privados",
        "defense": "Usar Cache-Control: no-store/private conforme o caso."
      },
      {
        "risk": "Payload excessivo",
        "defense": "Configurar limites de body, timeouts e rate limits."
      },
      {
        "risk": "Erro detalhado exposto",
        "defense": "Retornar mensagens genéricas ao cliente e registrar detalhes com acesso controlado."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Requisições e respostas: métodos, URLs, headers, body e status codes",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Remover exceções permanentes sem justificativa."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-8.2",
    "title": "HTTP request/response com curl, headers, métodos e status codes",
    "labType": "local",
    "objective": "Coletar, comparar e interpretar requisições e respostas HTTP usando curl, sem expor tokens, cookies ou payloads sensíveis.",
    "scenario": "Você está investigando uma API que “não funciona”. A tarefa é provar se o problema está no método, URL, header, body, status code, proxy ou backend.",
    "topology": "Terminal do aluno -> DNS -> TCP/TLS -> servidor HTTP ou endpoint autorizado -> logs/artefato sanitizado.",
    "architecture": "Cliente HTTP envia método, path, headers e body; intermediários podem alterar ou bloquear a requisição; a resposta retorna status, headers e corpo.",
    "prerequisites": [
      "Aulas 8.1 e 6.2 concluídas ou revisadas.",
      "curl instalado no Windows, Linux ou macOS.",
      "Usar apenas endpoints próprios, de laboratório ou públicos de demonstração sem dados sensíveis."
    ],
    "tools": [
      "curl",
      "DevTools do navegador",
      "jq opcional",
      "editor de texto",
      "endpoint de teste autorizado como httpbin.org ou serviço interno de laboratório"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Não registre Authorization, Cookie, Set-Cookie ou tokens reais no relatório.",
      "Não faça testes agressivos contra sistemas de terceiros.",
      "Use dados fictícios e remova IDs internos antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Preparar variáveis e endpoint seguro",
        "instruction": "Defina um endpoint de laboratório e registre a URL em partes: scheme, host, porta, path e query string.",
        "command": "URL=\"https://httpbin.org/get?status=aberto\"\nprintf \"%s\\n\" \"$URL\"",
        "expectedOutput": "URL registrada e pronta para os próximos testes.",
        "evidence": "Tabela URL | scheme | host | porta | path | query | observação.",
        "explanation": "Separar URL em partes evita confundir problema de rota, host, query string e transporte."
      },
      {
        "number": 2,
        "title": "Executar GET verboso",
        "instruction": "Colete a conversa HTTP e TLS em modo verboso.",
        "command": "curl -vk \"$URL\" -H \"Accept: application/json\"",
        "expectedOutput": "Saída com conexão, negociação TLS, linha de request, headers, status e corpo JSON.",
        "evidence": "Trecho sanitizado contendo método, Host, status code e Content-Type.",
        "explanation": "O modo verboso ajuda a separar DNS/TCP/TLS de HTTP."
      },
      {
        "number": 3,
        "title": "Coletar somente headers de resposta",
        "instruction": "Use HEAD ou descarte o corpo para analisar headers sem ruído.",
        "command": "curl -I https://example.com/\ncurl -s -D - https://example.com/ -o /dev/null",
        "expectedOutput": "Status line e headers de resposta.",
        "evidence": "Lista de headers relevantes: Date, Server, Content-Type, Cache-Control, Location, Strict-Transport-Security quando existir.",
        "explanation": "Headers mostram comportamento de cache, redirecionamento, conteúdo e segurança."
      },
      {
        "number": 4,
        "title": "Comparar métodos permitidos",
        "instruction": "Teste OPTIONS e um método inadequado para observar resposta do endpoint ou gateway.",
        "command": "curl -i -X OPTIONS https://httpbin.org/anything\ncurl -i -X DELETE https://httpbin.org/status/405",
        "expectedOutput": "Status e headers que indicam métodos aceitos ou erro controlado.",
        "evidence": "Tabela método | status | header Allow | interpretação.",
        "explanation": "405 aponta método não permitido, diferente de 401, 403, 404 ou 500."
      },
      {
        "number": 5,
        "title": "Enviar JSON com Content-Type explícito",
        "instruction": "Envie um POST com body JSON e observe como o servidor ecoa ou interpreta o payload.",
        "command": "curl -i -X POST https://httpbin.org/post \\\n  -H \"Content-Type: application/json\" \\\n  -H \"Accept: application/json\" \\\n  --data \"{\"item\":\"livro\",\"quantidade\":1}\"",
        "expectedOutput": "Status 200/201 em endpoint de teste e corpo JSON refletindo headers e payload.",
        "evidence": "Request body fictício, Content-Type e status de resposta.",
        "explanation": "Sem Content-Type correto, APIs podem retornar 400 ou 415."
      },
      {
        "number": 6,
        "title": "Simular status codes comuns",
        "instruction": "Colete códigos 200, 301/302, 401, 403, 404, 429, 500, 502 e 504 em endpoint controlado ou simulado.",
        "command": "for c in 200 301 401 403 404 429 500 502 504; do curl -s -o /dev/null -w \"%{http_code} %{url_effective}\\n\" \"https://httpbin.org/status/$c\"; done",
        "expectedOutput": "Lista de status codes retornados.",
        "evidence": "Tabela status | significado | provável dono | próxima evidência.",
        "explanation": "Status code reduz o espaço de investigação, mas não substitui logs."
      },
      {
        "number": 7,
        "title": "Adicionar request ID/correlation ID",
        "instruction": "Envie um identificador fictício para treinar correlação com logs.",
        "command": "curl -i https://httpbin.org/anything -H \"X-Request-ID: lab-8-2-001\"",
        "expectedOutput": "O header aparece ecoado no endpoint de laboratório ou nos logs internos.",
        "evidence": "Request ID usado e camada onde ele aparece.",
        "explanation": "Sem correlação, incidentes HTTP viram caça manual em múltiplos sistemas."
      },
      {
        "number": 8,
        "title": "Sanitizar evidências",
        "instruction": "Crie uma versão compartilhável dos comandos e respostas removendo segredos.",
        "command": "printf \"%s\\n\" \"Authorization: Bearer <REDACTED>\" \"Cookie: <REDACTED>\" \"X-Request-ID: lab-8-2-001\"",
        "expectedOutput": "Relatório sem tokens, cookies ou dados pessoais.",
        "evidence": "Arquivo ou bloco de evidências sanitizado.",
        "explanation": "Troubleshooting não pode virar vazamento de credenciais."
      }
    ],
    "expectedResult": "O aluno entrega uma matriz de requisição/resposta com método, URL, headers, body, status, origem provável do erro e evidências sanitizadas.",
    "validation": [
      {
        "check": "GET verboso coletado",
        "command": "curl -vk \"$URL\"",
        "expected": "Exibe request, TLS, status e headers.",
        "ifFails": "Validar DNS, proxy, conectividade e endpoint."
      },
      {
        "check": "Headers coletados sem body",
        "command": "curl -s -D - https://example.com/ -o /dev/null",
        "expected": "Headers aparecem no stdout.",
        "ifFails": "Testar curl -I ou outro endpoint."
      },
      {
        "check": "POST JSON com Content-Type",
        "command": "curl -i -X POST https://httpbin.org/post -H \"Content-Type: application/json\" --data \"{}\"",
        "expected": "Resposta HTTP e corpo JSON.",
        "ifFails": "Conferir aspas, Content-Type e saída do proxy."
      },
      {
        "check": "Status codes interpretados",
        "command": "curl -s -o /dev/null -w \"%{http_code}\\n\" https://httpbin.org/status/404",
        "expected": "404",
        "ifFails": "Usar endpoint autorizado equivalente."
      },
      {
        "check": "Evidência sanitizada",
        "method": "Revisão manual",
        "expected": "Sem Authorization, Cookie, tokens ou dados reais.",
        "ifFails": "Mascarar valores antes de compartilhar."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "curl conecta, mas retorna 401",
        "probableCause": "Autenticação ausente ou token expirado.",
        "howToConfirm": "Verificar header Authorization sem expor valor e logs de identity provider.",
        "fix": "Renovar credencial ou ajustar fluxo de autenticação."
      },
      {
        "symptom": "415 Unsupported Media Type",
        "probableCause": "Content-Type ausente ou incompatível com o body.",
        "howToConfirm": "Comparar headers enviados com contrato da API.",
        "fix": "Enviar Content-Type correto e payload válido."
      },
      {
        "symptom": "502/504",
        "probableCause": "Falha entre gateway/proxy e upstream.",
        "howToConfirm": "Correlacionar request ID no gateway e no backend.",
        "fix": "Validar rota, health check, timeout e disponibilidade do upstream."
      },
      {
        "symptom": "Resposta diferente entre navegador e curl",
        "probableCause": "Cookies, cache, User-Agent, redirects ou CORS.",
        "howToConfirm": "Comparar request headers e seguir redirects com -L.",
        "fix": "Reproduzir exatamente os headers relevantes e limpar cache quando necessário."
      }
    ],
    "improvements": [
      "Adicionar jq para formatar JSON.",
      "Comparar HTTP/1.1 e HTTP/2 quando o servidor suportar.",
      "Integrar request ID com logs reais do proxy em ambiente de laboratório."
    ],
    "evidenceToCollect": [
      "Comando curl usado.",
      "Status code e headers de resposta.",
      "Payload fictício enviado.",
      "Request ID/correlation ID.",
      "Matriz status -> causa provável -> próxima evidência.",
      "Relatório sanitizado."
    ],
    "questions": [
      "Qual diferença operacional entre 401 e 403?",
      "Por que 502 e 504 normalmente exigem olhar gateway e upstream?",
      "Por que token em query string é perigoso?"
    ],
    "challenge": "Monte um runbook curto para diferenciar 400, 401, 403, 404, 415, 429, 500, 502 e 504 em uma API corporativa.",
    "solution": "Comece registrando método, URL, headers e body sanitizados. Depois identifique quem gerou o status: cliente, WAF, gateway, aplicação ou upstream. Use request ID para correlacionar logs e indique a próxima evidência necessária para cada classe de erro."
  },
  "mentorQuestions": [
    "Qual parte da URL realmente vai para o servidor e qual parte fica apenas no cliente?",
    "Por que um 403 não deve ser tratado como erro de rede?",
    "Quais headers você nunca deveria copiar para um ticket sem mascaramento?"
  ],
  "quiz": [
    {
      "question": "Qual elemento HTTP expressa a intenção da requisição?",
      "options": [
        "TTL",
        "Método",
        "MAC",
        "Métrica"
      ],
      "answer": 1,
      "explanation": "O método expressa intenção, como GET, POST, PUT ou DELETE."
    },
    {
      "question": "Qual classe de status codes normalmente indica erro do cliente?",
      "options": [
        "1xx",
        "2xx",
        "3xx",
        "4xx"
      ],
      "answer": 3,
      "explanation": "4xx indica problemas associados à requisição do cliente, autenticação, autorização ou recurso."
    },
    {
      "question": "Um 502 geralmente sugere investigar:",
      "options": [
        "Apenas o mouse do usuário",
        "Proxy/gateway e upstream",
        "Somente ARP local",
        "Apenas octeto IPv4"
      ],
      "answer": 1,
      "explanation": "502 normalmente é emitido por intermediário que não recebeu resposta válida do upstream."
    },
    {
      "question": "Qual header costuma carregar token e deve ser mascarado em logs?",
      "options": [
        "Authorization",
        "Accept-Language",
        "Date",
        "User-Agent"
      ],
      "answer": 0,
      "explanation": "Authorization frequentemente carrega credenciais ou tokens bearer."
    },
    {
      "question": "Qual status indica método não permitido no recurso?",
      "options": [
        "200",
        "301",
        "405",
        "504"
      ],
      "answer": 2,
      "explanation": "405 Method Not Allowed indica que o método não é aceito naquele recurso."
    },
    {
      "question": "Query string é adequada para tokens sensíveis?",
      "options": [
        "Sim, sempre",
        "Sim, porque não aparece em logs",
        "Não, pode vazar em logs, histórico e referer",
        "Somente em UDP"
      ],
      "answer": 2,
      "explanation": "Tokens em query string podem vazar em vários pontos de observabilidade e histórico."
    }
  ],
  "flashcards": [
    {
      "front": "Método HTTP",
      "back": "Campo que expressa intenção da requisição, como GET, POST, PUT, PATCH ou DELETE."
    },
    {
      "front": "Header HTTP",
      "back": "Metadado da requisição ou resposta, usado para conteúdo, autenticação, cache, rastreio e segurança."
    },
    {
      "front": "Body",
      "back": "Corpo da mensagem HTTP, usado para transportar dados como JSON, HTML, formulário ou arquivo."
    },
    {
      "front": "Status 4xx",
      "back": "Classe que indica problema associado à requisição do cliente, autenticação, autorização ou recurso."
    },
    {
      "front": "Status 5xx",
      "back": "Classe que indica erro no servidor ou intermediário, como backend, gateway ou timeout."
    },
    {
      "front": "Request ID",
      "back": "Identificador usado para correlacionar uma requisição entre proxy, gateway, aplicação e logs."
    }
  ],
  "exercises": [
    {
      "id": "ex8.2.1",
      "type": "diagnóstico",
      "title": "Decompor URL",
      "prompt": "Separe esquema, host, porta, path e query string em https://api.exemplo.com:443/v1/users?id=10.",
      "expectedAnswer": "Esquema https, host api.exemplo.com, porta 443, path /v1/users, query string id=10."
    },
    {
      "id": "ex8.2.2",
      "type": "diagnóstico",
      "title": "Interpretar 401 e 403",
      "prompt": "Explique a diferença operacional entre 401 e 403.",
      "expectedAnswer": "401 indica autenticação ausente/inválida; 403 indica acesso negado mesmo com identidade conhecida ou política bloqueando."
    },
    {
      "id": "ex8.2.3",
      "type": "diagnóstico",
      "title": "Headers sensíveis",
      "prompt": "Liste quatro headers que merecem cuidado em logs.",
      "expectedAnswer": "Authorization, Cookie, Set-Cookie, X-API-Key ou headers customizados com tokens."
    },
    {
      "id": "ex8.2.4",
      "type": "diagnóstico",
      "title": "502 versus 500",
      "prompt": "Por que 502 e 500 apontam investigações diferentes?",
      "expectedAnswer": "500 tende a ser erro interno da aplicação; 502 costuma vir de proxy/gateway sem resposta válida do upstream."
    },
    {
      "id": "ex8.2.p1-06.1",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de evidências para diferenciar falha de DNS, TCP, TLS, HTTP, gateway e aplicação usando os comandos do laboratório.",
      "expectedAnswer": "A matriz deve incluir comando, evidência esperada, interpretação e próximo passo para cada camada.",
      "explanation": "Troubleshooting profissional evita pular direto para a aplicação quando a falha pode estar em DNS, transporte, TLS ou proxy."
    }
  ],
  "challenge": {
    "title": "API com respostas divergentes",
    "scenario": "Uma API em https://api.corp.local/v2/invoices retorna 200 via navegador, 401 via curl, 405 quando o pipeline executa validação e 502 em alguns horários pelo API Gateway.",
    "tasks": [
      "Montar sequência de diagnóstico",
      "Identificar evidências por camada",
      "Explicar hipóteses para cada status",
      "Propor correções seguras",
      "Definir quais dados devem ser mascarados no ticket"
    ],
    "rubric": [
      "Diferencia navegador, curl e pipeline",
      "Analisa método e headers",
      "Investiga gateway/upstream para 502",
      "Não expõe tokens",
      "Propõe request ID e logs correlacionados"
    ]
  },
  "commentedSolution": {
    "summary": "O cenário tem múltiplos sintomas que provavelmente não possuem uma única causa. É necessário comparar método, headers, autenticação, path, gateway e logs por request ID.",
    "steps": [
      "Registrar URL, horário, origem e cliente de cada teste.",
      "Comparar método usado pelo navegador, curl e pipeline.",
      "Comparar headers Authorization, Accept e Content-Type sem revelar valores sensíveis.",
      "Verificar se o pipeline usa método não permitido, explicando 405.",
      "Investigar ausência ou expiração de token no curl para explicar 401.",
      "Consultar logs do API Gateway e upstream nos horários de 502.",
      "Validar health check, timeout, rota por path e disponibilidade do backend.",
      "Criar correção com contrato de API, headers obrigatórios, request ID e alertas por status."
    ],
    "keyLessons": [
      "Status codes diferentes podem ter causas diferentes",
      "Método e headers mudam o resultado",
      "502 exige olhar intermediários",
      "Evidência boa não precisa vazar segredo"
    ]
  },
  "glossary": [
    {
      "term": "URL",
      "definition": "Identificador de recurso que inclui esquema, host, caminho e parâmetros opcionais."
    },
    {
      "term": "Método HTTP",
      "definition": "Verbo que expressa a intenção da requisição."
    },
    {
      "term": "Header",
      "definition": "Metadado de requisição ou resposta HTTP."
    },
    {
      "term": "Body",
      "definition": "Corpo da mensagem HTTP com dados enviados ou recebidos."
    },
    {
      "term": "Status code",
      "definition": "Código numérico que resume o resultado de uma resposta HTTP."
    },
    {
      "term": "Request ID",
      "definition": "Identificador de correlação usado para rastrear uma requisição entre camadas."
    }
  ],
  "references": [
    {
      "title": "RFC 9110 — HTTP Semantics",
      "type": "standard",
      "note": "Referência moderna para semântica, métodos, status e headers HTTP."
    },
    {
      "title": "MDN Web Docs — HTTP Messages",
      "type": "documentation",
      "note": "Referência prática para estrutura de mensagens HTTP."
    },
    {
      "title": "OWASP API Security Top 10",
      "type": "security",
      "note": "Contexto de riscos recorrentes em APIs HTTP."
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
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e deploy",
      "reason": "Smoke tests e health checks dependem de métodos, headers e status codes corretos."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "OIDC e SAML",
      "reason": "Fluxos de identidade usam redirects, cookies, tokens e endpoints HTTP/HTTPS."
    }
  ],
  "progressRules": {
    "minReadSections": 16,
    "mustCompleteLab": true,
    "minQuizScore": 70,
    "unlockNextLesson": "8.3",
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
      "8.3"
    ]
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
