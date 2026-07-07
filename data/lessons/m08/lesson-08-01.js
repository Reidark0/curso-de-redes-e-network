export const lesson0801 = {
  "id": "8.1",
  "moduleId": "m08",
  "order": 1,
  "title": "Por que HTTP existe",
  "subtitle": "Entenda por que a Web precisava de um protocolo de aplicação simples, textual e interoperável, como HTTP organiza requisições e respostas, e por que ele é a base de sites, APIs, proxies, gateways, observabilidade e segurança moderna.",
  "duration": "115-170 min",
  "estimatedStudyTimeMinutes": 170,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 265,
  "tags": [
    "redes",
    "http",
    "https",
    "web",
    "api",
    "proxy",
    "camada de aplicação",
    "troubleshooting",
    "cloud",
    "devsecops",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.1",
      "title": "Por que DNS existe",
      "reason": "HTTP normalmente começa com resolução de nomes antes da conexão ao servidor."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.1",
      "title": "Por que a camada de transporte existe",
      "reason": "HTTP usa TCP ou transportes equivalentes para alcançar a aplicação no destino."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.3",
      "title": "TCP: handshake, estado e encerramento",
      "reason": "HTTP/1.1 e HTTP/2 sobre TLS dependem de conexão TCP estabelecida."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.9",
      "title": "Segurança em transporte: exposição, scans, TLS e hardening",
      "reason": "HTTP moderno quase sempre aparece como HTTPS e precisa de hardening de exposição."
    }
  ],
  "objectives": [
    "Explicar por que HTTP existe e qual problema ele resolveu na Web.",
    "Diferenciar protocolo de aplicação, transporte, porta, rota, DNS e conteúdo.",
    "Descrever o modelo requisição-resposta do HTTP.",
    "Entender a função de métodos, caminho, cabeçalhos, corpo, status code e cookies em visão inicial.",
    "Relacionar HTTP com sites, APIs, proxies, load balancers, observabilidade, cloud e DevSecOps.",
    "Identificar riscos defensivos: HTTP sem TLS, headers ausentes, exposição indevida, métodos perigosos e logs sensíveis."
  ],
  "learningOutcomes": [
    "Ler uma requisição HTTP simples e uma resposta HTTP simples.",
    "Explicar o caminho de uma requisição desde DNS até aplicação web.",
    "Separar falhas de DNS, TCP, TLS, HTTP e aplicação.",
    "Usar curl e ferramentas do navegador para observar headers, status codes e latência básica.",
    "Montar uma matriz inicial de controles de segurança para serviços HTTP/HTTPS."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Até aqui você estudou como encontrar um destino com DNS, chegar ao IP com roteamento, abrir uma conversa com TCP/UDP e identificar serviços por portas. Mas, quando a conexão chega ao servidor web, ainda falta uma pergunta: <strong>qual linguagem cliente e servidor usam para pedir e entregar recursos?</strong></p><p>HTTP existe para padronizar essa conversa. O navegador, um aplicativo mobile, um pipeline, um webhook, uma API interna e um health check precisam de um formato comum para dizer: quero este recurso, aceito este tipo de resposta, envio estes dados, recebi este código de status.</p><div class='callout'><strong>Ideia central:</strong> TCP entrega bytes entre processos. HTTP dá significado a esses bytes no mundo web: requisição, resposta, método, caminho, cabeçalho, corpo e status.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>A Web nasceu da necessidade de compartilhar documentos e referências entre sistemas diferentes. Antes dela, serviços de rede existiam, mas cada sistema tendia a usar formatos próprios ou protocolos específicos. Era difícil criar uma camada universal simples para acessar documentos e, depois, aplicações.</p><p>HTTP surgiu como protocolo simples de transferência de hipertexto. No começo, a ideia era buscar documentos. Com o tempo, ele evoluiu para sustentar páginas dinâmicas, formulários, sessões, APIs REST, streaming, proxies, autenticação, gateways, observabilidade e integração entre serviços.</p><p>A grande força do HTTP foi combinar simplicidade operacional, interoperabilidade e extensibilidade por cabeçalhos. Por isso ele virou o idioma dominante da Web e de grande parte das APIs corporativas.</p>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04d-8-1-http-history-web-corp'>\n  <h4>Da busca de documentos à camada universal de integração</h4>\n  <p>O HTTP começou com uma proposta simples: permitir que um cliente pedisse um recurso identificado por uma URL e recebesse uma resposta compreensível. Essa simplicidade foi decisiva. Em vez de cada aplicação inventar seu próprio protocolo, a Web ganhou uma gramática comum que navegadores, servidores, proxies e ferramentas de linha de comando podiam interpretar.</p>\n  <p>O ponto importante para infraestrutura é que HTTP deixou de ser apenas “página web”. Em empresas, ele se tornou a linguagem de APIs, health checks, webhooks, portais internos, painéis de observabilidade, integrações entre sistemas e automações de pipeline. Por isso, quando um serviço HTTP falha, a investigação não pode parar em “a porta 443 abre”. É preciso verificar se a conversa de aplicação está correta.</p>\n</div>",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Sem um protocolo comum de aplicação, cada cliente precisaria entender um formato diferente para cada servidor. Um navegador não conseguiria falar com qualquer site. Uma API não teria convenções padronizadas para métodos, status, conteúdo, cache, autenticação e negociação de formato.</p><p>Outro problema é operacional: redes modernas têm proxies, balanceadores, WAFs, gateways de API, CDNs e service meshes. Esses componentes precisam entender a conversa em nível de aplicação para aplicar roteamento por caminho, autenticação, cabeçalhos, compressão, cache, logs, rate limit e políticas de segurança.</p><div class='callout callout--problem'><strong>Problema prático:</strong> IP e TCP dizem onde e como conectar; HTTP diz o que está sendo pedido, como responder e como interpretar sucesso, erro, redirecionamento ou falha de aplicação.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>HTTP evoluiu de um protocolo simples para buscar documentos para uma família de padrões usados por aplicações distribuídas. HTTP/1.0 formalizou requisições e respostas. HTTP/1.1 popularizou conexões persistentes, Host header e melhor uso de cache. HTTP/2 trouxe multiplexação em uma única conexão e compressão de cabeçalhos. HTTP/3 passou a usar QUIC sobre UDP para reduzir impactos de latência e perda em certos cenários.</p><p>Ao mesmo tempo, HTTPS deixou de ser opcional e passou a ser requisito básico. TLS protege confidencialidade, integridade e autenticação do servidor. Em ambientes corporativos, HTTP também passou a ser inspecionado por proxies, WAFs, API gateways e ferramentas de observabilidade.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>HTTP</strong> é um protocolo de aplicação baseado em requisição e resposta. Um cliente envia uma requisição para um recurso. O servidor devolve uma resposta com código de status, cabeçalhos e, muitas vezes, um corpo.</p><p>Uma requisição HTTP típica contém método, caminho, versão, cabeçalhos e corpo opcional. Uma resposta contém versão, status code, razão textual, cabeçalhos e corpo opcional.</p><div class='definition-box'>HTTP é o protocolo de aplicação que estrutura a conversa entre clientes e servidores web, permitindo solicitar recursos, enviar dados, receber respostas, negociar formatos e sinalizar estados de sucesso ou erro.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando você acessa uma URL, várias camadas entram em ação antes do HTTP aparecer. Primeiro o nome é resolvido por DNS. Depois o cliente escolhe rota, abre uma conexão TCP ou QUIC, negocia TLS se for HTTPS e, então, envia a requisição HTTP.</p><ol class='flow-list'><li>Usuário ou aplicação informa uma URL.</li><li>O cliente separa esquema, host, porta, caminho e query string.</li><li>DNS resolve o host para um ou mais IPs.</li><li>A camada de transporte estabelece conexão ou sessão adequada.</li><li>Se for HTTPS, ocorre negociação TLS e validação do certificado.</li><li>O cliente envia método, caminho, headers e corpo opcional.</li><li>Proxies, balanceadores, WAFs ou gateways podem inspecionar e encaminhar a requisição.</li><li>O servidor ou aplicação processa e devolve status, headers e corpo.</li><li>O cliente interpreta status, cache, cookies, redirecionamentos e conteúdo.</li></ol>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04d-8-1-http-layer-separation'>\n  <h4>Separando DNS, TCP, TLS, HTTP e aplicação</h4>\n  <p>HTTP aparece depois que outras etapas já funcionaram. DNS precisa resolver o nome, a rota precisa levar ao destino, TCP ou QUIC precisa criar um canal de transporte e, em HTTPS, TLS precisa autenticar o servidor e proteger a sessão. Só depois disso o cliente envia método, caminho, headers e corpo.</p>\n  <p>Essa ordem evita diagnósticos confusos. Um <code>NXDOMAIN</code> é problema de nome. Um timeout na porta 443 é transporte, rota ou política. Um erro de certificado é TLS. Um <code>404</code> é HTTP/aplicação ou roteamento de caminho. Um <code>502</code> normalmente aponta para intermediário ou upstream. A aula de HTTP precisa treinar esse raciocínio porque ele aparece todos os dias em cloud, DevSecOps, SOC e operação.</p>\n</div>",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>HTTP raramente é apenas cliente e servidor direto. Em ambientes reais, a requisição passa por DNS, CDN, proxy, WAF, load balancer, API gateway, ingress controller, service mesh, aplicação e banco de dados. Cada componente pode adicionar headers, encerrar TLS, recriptografar, aplicar política ou gerar logs.</p><table class='data-table'><thead><tr><th>Componente</th><th>Papel com HTTP</th><th>Risco se mal configurado</th></tr></thead><tbody><tr><td>Navegador/cliente</td><td>Envia requisições e interpreta respostas</td><td>Cache incorreto, cookies inseguros, erro de TLS ignorado</td></tr><tr><td>Proxy/CDN</td><td>Cache, otimização e proteção na borda</td><td>Expor conteúdo privado ou manter cache sensível</td></tr><tr><td>WAF/API Gateway</td><td>Política, autenticação, rate limit e roteamento</td><td>Bypass por rota não coberta ou regra permissiva</td></tr><tr><td>Load balancer</td><td>Distribui requisições e executa health checks</td><td>Health check superficial e backend ruim considerado saudável</td></tr><tr><td>Aplicação</td><td>Processa método, rota, sessão e corpo</td><td>Falhas de autenticação, autorização e validação</td></tr></tbody></table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense no HTTP como o formulário padronizado de atendimento de uma empresa. O endereço do prédio é o IP. O ramal é a porta. O formulário HTTP diz o que você quer, qual documento procura, quais dados está enviando e como a empresa deve responder.</p><p>A analogia tem limite: HTTP não é apenas um formulário humano. Ele carrega cabeçalhos técnicos, cookies, tokens, formatos, redirecionamentos, políticas de cache e sinais de segurança que afetam diretamente performance e proteção.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Quando você abre <code>https://exemplo.com/aulas</code>, o navegador resolve <code>exemplo.com</code>, conecta na porta 443, negocia TLS e envia uma requisição parecida com <code>GET /aulas HTTP/1.1</code> com cabeçalhos como <code>Host</code>, <code>User-Agent</code> e <code>Accept</code>. O servidor responde com <code>200 OK</code>, headers e HTML.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, uma aplicação interna pode expor <code>https://portal.corp.local</code>. A requisição entra por um load balancer, passa por WAF, segue para um serviço de frontend, chama uma API interna e consulta um banco. Logs HTTP registram método, caminho, status, tempo de resposta, usuário autenticado, IP de origem real via headers controlados e correlação por request ID.</p>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04d-8-1-enterprise-flow'>\n  <h4>Exemplo empresarial: portal interno atrás de gateway</h4>\n  <p>Imagine um portal de RH acessado por colaboradores. O usuário digita uma URL, o DNS interno responde um endereço privado, o tráfego passa por proxy corporativo, WAF, balanceador e chega a uma aplicação. Se o usuário recebe <code>403</code>, o problema pode ser autorização. Se recebe <code>502</code>, pode ser upstream indisponível. Se recebe erro de certificado, pode ser SNI, cadeia de confiança ou inspeção TLS. Se recebe <code>200</code> com conteúdo errado, pode ser cache, Host header ou roteamento por path.</p>\n  <p>O HTTP dá visibilidade para investigar esses cenários porque cada etapa deixa pistas: status code, header, cookie, request ID, server timing, Via, X-Forwarded-For, logs do gateway, logs da aplicação e métricas de latência.</p>\n</div>",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Na cloud, HTTP costuma passar por serviços gerenciados: CDN, Application Load Balancer, API Gateway, WAF, ingress Kubernetes, service mesh e funções serverless. Cada camada pode terminar TLS, aplicar autenticação, validar JWT, limitar taxa, gerar métricas e encaminhar para backends privados.</p><p>O erro comum é abrir o backend diretamente para a Internet e também expor o caminho pelo gateway. Isso cria bypass de controles e dificulta logs, rastreabilidade e resposta a incidentes.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, HTTP aparece em pipelines, webhooks, APIs de deploy, health checks, scanners DAST, testes de contrato, gateways e observabilidade. Um pipeline pode publicar uma API, configurar rotas no gateway, aplicar WAF, exigir TLS, gerar documentação OpenAPI e validar status codes em testes automatizados.</p><p>Como HTTP carrega headers, tokens e corpos de requisição, logs precisam ser úteis sem vazar segredos. Isso exige mascaramento de Authorization, cookies, dados pessoais e payloads sensíveis.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Do ponto de vista defensivo, HTTP é uma das superfícies mais críticas. Ataques contra autenticação, autorização, sessão, headers, uploads, APIs, redirecionamentos, CORS e cache acontecem em cima do protocolo de aplicação.</p><p>Mesmo nesta aula introdutória, a regra é clara: HTTP sem TLS deve ser exceção controlada; métodos expostos devem ser mínimos; headers de segurança precisam ser avaliados; logs devem permitir investigação; e APIs devem ser publicadas atrás de controles explícitos.</p><div class='callout callout--security'><strong>Controle inicial:</strong> todo serviço HTTP/HTTPS precisa de dono, justificativa, origem permitida, TLS, logs, autenticação quando aplicável e plano de correção de exposição indevida.</div>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04d-8-1-http-security-boundaries'>\n  <h4>HTTP como fronteira de segurança</h4>\n  <p>HTTP carrega identidade, sessão, token, payload, rota e intenção. Isso faz dele um ponto central de controle defensivo. Um gateway pode exigir autenticação, um WAF pode bloquear padrões perigosos, um proxy pode registrar destino, um service mesh pode aplicar política entre serviços e uma aplicação pode validar autorização por recurso.</p>\n  <p>Mas HTTP também cria riscos: tokens em logs, cookies sem proteção, headers ausentes, cache indevido de dados privados, endpoints administrativos publicados, bypass de gateway por backend exposto diretamente e health checks que retornam sucesso mesmo quando a lógica crítica está indisponível.</p>\n</div>",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 1040 620' role='img' aria-labelledby='m08l01-title m08l01-desc'>\n    <title id='m08l01-title'>Fluxo HTTP do cliente até a aplicação</title>\n    <desc id='m08l01-desc'>Diagrama mostrando DNS, conexão TLS, requisição HTTP, proxy, WAF, load balancer, aplicação e resposta.</desc>\n    <defs>\n      <marker id='m08l01-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path>\n      </marker>\n    </defs>\n    <rect x='40' y='70' width='150' height='110' rx='16' class='svg-node svg-node--client'></rect>\n    <text x='115' y='112' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='115' y='140' text-anchor='middle' class='svg-label svg-label--small'>Browser/API</text>\n    <rect x='250' y='70' width='150' height='110' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='325' y='112' text-anchor='middle' class='svg-label'>DNS</text>\n    <text x='325' y='140' text-anchor='middle' class='svg-label svg-label--small'>nome → IP</text>\n    <rect x='460' y='70' width='160' height='110' rx='16' class='svg-node svg-node--firewall'></rect>\n    <text x='540' y='104' text-anchor='middle' class='svg-label'>Proxy/WAF</text>\n    <text x='540' y='132' text-anchor='middle' class='svg-label svg-label--small'>headers + política</text>\n    <text x='540' y='156' text-anchor='middle' class='svg-label svg-label--small'>TLS + logs</text>\n    <rect x='680' y='70' width='150' height='110' rx='16' class='svg-node svg-node--router'></rect>\n    <text x='755' y='112' text-anchor='middle' class='svg-label'>Load Balancer</text>\n    <text x='755' y='140' text-anchor='middle' class='svg-label svg-label--small'>roteia /api</text>\n    <rect x='890' y='70' width='120' height='110' rx='16' class='svg-node svg-node--cloud'></rect>\n    <text x='950' y='112' text-anchor='middle' class='svg-label'>App</text>\n    <text x='950' y='140' text-anchor='middle' class='svg-label svg-label--small'>responde</text>\n    <line x1='190' y1='125' x2='250' y2='125' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l01-arrow)'></line>\n    <line x1='400' y1='125' x2='460' y2='125' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l01-arrow)'></line>\n    <line x1='620' y1='125' x2='680' y2='125' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l01-arrow)'></line>\n    <line x1='830' y1='125' x2='890' y2='125' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l01-arrow)'></line>\n    <rect x='70' y='250' width='900' height='120' rx='18' class='svg-zone'></rect>\n    <text x='520' y='288' text-anchor='middle' class='svg-label'>Requisição HTTP</text>\n    <text x='520' y='322' text-anchor='middle' class='svg-label svg-label--small'>GET /api/produtos HTTP/1.1 | Host: loja.exemplo | Accept: application/json | Authorization: Bearer ***</text>\n    <rect x='70' y='420' width='900' height='120' rx='18' class='svg-zone'></rect>\n    <text x='520' y='458' text-anchor='middle' class='svg-label'>Resposta HTTP</text>\n    <text x='520' y='492' text-anchor='middle' class='svg-label svg-label--small'>HTTP/1.1 200 OK | Content-Type: application/json | Cache-Control | Set-Cookie seguro</text>\n  </svg>\n</section>\n",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam leitura de requisições, interpretação de status codes, separação entre erro de rede e erro de aplicação, e análise inicial de headers de segurança.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário em que uma API retorna erro depois de uma mudança de proxy. Sua missão é montar uma investigação com DNS, conexão, TLS, método, caminho, headers, status, logs e hipótese de causa raiz.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada mostra como seguir o fluxo em ordem: resolver nome, conectar na porta, negociar TLS, enviar requisição, ler status, comparar headers e validar logs no proxy e na aplicação.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>HTTP existe para padronizar a conversa entre clientes e servidores de aplicação. Ele transforma uma conexão de transporte em uma troca compreensível: método, caminho, headers, corpo e status. Essa estrutura sustenta sites, APIs, webhooks, health checks, proxies, gateways e serviços modernos.</p><p>Para segurança, HTTP é crítico porque carrega identidade, sessão, tokens, dados sensíveis, comandos de API e respostas de aplicação. Diagnosticar HTTP exige não confundir DNS, TCP, TLS, HTTP e lógica da aplicação.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará a estrutura de uma requisição e resposta HTTP em mais detalhes: métodos, URLs, headers, corpo, status codes e como interpretar evidências com curl, navegador e logs.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Camada 4",
      "Camada 3"
    ],
    "beforeThisLesson": "O aluno entende DNS, roteamento, TCP/UDP, portas, NAT, firewall e troubleshooting de transporte.",
    "afterThisLesson": "O aluno entende por que HTTP é o protocolo de aplicação dominante para Web e APIs.",
    "dependsOn": [
      "DNS",
      "TCP",
      "TLS",
      "Portas",
      "Firewalls",
      "Proxies",
      "APIs"
    ]
  },
  "protocolFields": [
    {
      "field": "Method",
      "meaning": "Indica a intenção da requisição, como GET, POST, PUT, PATCH ou DELETE.",
      "securityNote": "Métodos desnecessários devem ser bloqueados ou controlados; métodos perigosos ampliam superfície de ataque."
    },
    {
      "field": "Path",
      "meaning": "Identifica o recurso solicitado no servidor, como /api/users.",
      "securityNote": "Caminhos sensíveis exigem autenticação, autorização e logs."
    },
    {
      "field": "Host",
      "meaning": "Indica o nome do host solicitado, essencial para virtual hosts e proxies.",
      "securityNote": "Validação incorreta pode causar host header injection ou roteamento indevido."
    },
    {
      "field": "Headers",
      "meaning": "Metadados da requisição ou resposta, como Content-Type, Authorization e Cache-Control.",
      "securityNote": "Headers podem conter tokens e dados sensíveis; logs devem mascarar segredos."
    },
    {
      "field": "Body",
      "meaning": "Conteúdo enviado ou recebido, comum em POST/PUT/PATCH e respostas JSON/HTML.",
      "securityNote": "Corpo deve ser validado, limitado em tamanho e protegido contra vazamento em logs."
    },
    {
      "field": "Status Code",
      "meaning": "Código que sinaliza resultado, como 200, 301, 401, 403, 404 ou 500.",
      "securityNote": "Status codes ajudam investigação, mas respostas detalhadas demais podem vazar informações."
    }
  ],
  "packetFlow": [
    "Cliente interpreta a URL e identifica esquema, host, porta e caminho.",
    "DNS resolve o host para IP.",
    "Cliente estabelece conexão TCP ou QUIC com a porta do serviço.",
    "Em HTTPS, cliente e servidor negociam TLS e validam certificado.",
    "Cliente envia requisição HTTP com método, caminho, headers e corpo opcional.",
    "Proxy, WAF, gateway ou load balancer aplicam políticas e encaminham a requisição.",
    "Aplicação processa a requisição e gera resposta HTTP.",
    "Resposta retorna com status code, headers e corpo.",
    "Cliente interpreta status, cookies, cache, redirecionamentos e conteúdo."
  ],
  "deepDive": {
    "title": "HTTP é visível para infraestrutura e para aplicação",
    "points": [
      "Firewalls tradicionais veem IP, porta e estado; proxies e WAFs veem método, caminho e headers.",
      "Um 200 OK não garante que o negócio funcionou; pode ser uma página de erro HTML com status incorreto.",
      "Um 502 pode vir de proxy ou load balancer sem a aplicação sequer processar a requisição.",
      "Um 401 indica autenticação ausente ou inválida; um 403 indica, em geral, acesso negado mesmo com identidade conhecida.",
      "HTTP moderno depende de TLS, observabilidade, logs correlacionáveis e governança de publicação."
    ],
    "operationalImpact": [
      "HTTP facilita interoperabilidade, mas adiciona dependência de proxies, gateways, certificados, logs e roteamento por host/path.",
      "Troubleshooting HTTP exige correlação entre cliente, DNS, transporte, TLS, intermediários e aplicação.",
      "Health checks HTTP precisam validar o comportamento certo, não apenas porta aberta ou página estática."
    ],
    "financialImpact": [
      "CDN, WAF, API Gateway, balanceadores, logs e observabilidade HTTP podem gerar custo recorrente em cloud.",
      "Armazenar logs HTTP detalhados aumenta custo de SIEM e exige política de retenção e mascaramento.",
      "Falhas HTTP em serviços críticos geram custo de indisponibilidade mesmo quando a rede básica está saudável."
    ],
    "securityImpact": [
      "HTTP sem TLS expõe conteúdo e credenciais em trânsito.",
      "Headers, cookies e tokens mal protegidos ampliam risco de sequestro de sessão e vazamento.",
      "Backends expostos fora do gateway criam bypass de autenticação, WAF, rate limit e auditoria."
    ]
  },
  "commonMistakes": [
    "Confundir HTTP com HTTPS e esquecer que HTTPS é HTTP protegido por TLS.",
    "Dizer que a rede caiu quando o erro é 500 de aplicação.",
    "Dizer que a aplicação caiu quando o erro é DNS ou TLS.",
    "Logar Authorization, cookies e payloads sensíveis sem mascaramento.",
    "Publicar backend diretamente e também via gateway, criando bypass.",
    "Usar health check que só valida porta aberta e não valida endpoint real."
  ],
  "troubleshooting": {
    "method": "Separar DNS, rota, TCP, TLS, HTTP, proxy e aplicação, preservando evidências sem vazar segredos.",
    "windows": [
      "Resolve-DnsName app.exemplo.local",
      "Test-NetConnection app.exemplo.local -Port 443",
      "curl.exe -vk https://app.exemplo.local/health",
      "Invoke-WebRequest https://app.exemplo.local/health",
      "netstat -ano | findstr :443"
    ],
    "linux": [
      "dig app.exemplo.local",
      "ip route get <ip>",
      "curl -vk https://app.exemplo.local/health",
      "curl -I https://app.exemplo.local",
      "openssl s_client -connect app.exemplo.local:443 -servername app.exemplo.local",
      "sudo tcpdump -n host <ip> and port 443"
    ],
    "browser": [
      "Abrir DevTools",
      "Verificar aba Network",
      "Conferir status code, headers e timing",
      "Verificar certificado",
      "Conferir redirects e cookies"
    ],
    "proxyGateway": [
      "Conferir logs de WAF/API Gateway",
      "Validar rota por Host e path",
      "Conferir headers encaminhados",
      "Validar status upstream",
      "Conferir request ID/correlation ID"
    ],
    "cloud": [
      "Verificar listener HTTPS",
      "Verificar target group/backend health",
      "Validar WAF logs",
      "Conferir security group/NSG",
      "Conferir logs da aplicação e do gateway"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Por que HTTP existe.",
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
        "command": "Resolve-DnsName app.exemplo.local; Test-NetConnection app.exemplo.local -Port 443",
        "purpose": "Separar resolução DNS de conectividade TCP na porta do serviço.",
        "expectedObservation": "Nome resolve e porta conecta, ou falha clara em uma dessas fases.",
        "interpretation": "Se DNS ou TCP falham, ainda não é diagnóstico HTTP."
      },
      {
        "platform": "Windows",
        "command": "curl.exe -vk https://app.exemplo.local/health",
        "purpose": "Observar TLS, requisição HTTP, status code e headers no Windows.",
        "expectedObservation": "Saída mostra handshake TLS, request, response headers e status.",
        "interpretation": "Status 4xx/5xx move a investigação para HTTP, proxy, gateway ou aplicação."
      },
      {
        "platform": "Windows",
        "command": "Invoke-WebRequest https://app.exemplo.local/health -Headers @{\"X-Request-ID\"=\"lab-001\"}",
        "purpose": "Enviar header de correlação para investigar logs.",
        "expectedObservation": "Resposta com status, headers e eventualmente request ID refletido.",
        "interpretation": "Request ID facilita cruzar cliente, gateway e aplicação."
      },
      {
        "platform": "Linux",
        "command": "dig app.exemplo.local A +short; ip route get <ip>",
        "purpose": "Validar IP retornado e caminho local antes do HTTP.",
        "expectedObservation": "IP e rota coerentes com ambiente esperado.",
        "interpretation": "Resposta DNS errada ou rota inesperada muda a hipótese."
      },
      {
        "platform": "Linux",
        "command": "curl -vk -H \"X-Request-ID: lab-001\" https://app.exemplo.local/health",
        "purpose": "Inspecionar requisição/resposta com TLS, headers e status.",
        "expectedObservation": "Mostra certificado, ALPN quando aplicável, status e headers.",
        "interpretation": "Ajuda a separar TLS, HTTP e aplicação."
      },
      {
        "platform": "Linux",
        "command": "curl -I https://app.exemplo.local; curl -s -o /dev/null -w \"%{http_code} %{time_total}\\n\" https://app.exemplo.local/health",
        "purpose": "Coletar status e latência sem baixar corpo completo.",
        "expectedObservation": "Código HTTP e tempo total aparecem de forma objetiva.",
        "interpretation": "Útil para monitoramento, pipeline e comparação entre origens."
      },
      {
        "platform": "TLS",
        "command": "openssl s_client -connect app.exemplo.local:443 -servername app.exemplo.local </dev/null",
        "purpose": "Validar certificado e SNI antes de culpar HTTP.",
        "expectedObservation": "Cadeia, CN/SAN, validade e negociação aparecem na saída.",
        "interpretation": "Erro aqui indica TLS, não método, path ou status HTTP."
      },
      {
        "platform": "Proxy/Gateway",
        "command": "Filtrar logs por X-Request-ID=lab-001, host=app.exemplo.local, path=/health",
        "purpose": "Correlacionar a requisição nos intermediários.",
        "expectedObservation": "Logs mostram decisão, upstream, status e latência.",
        "interpretation": "Sem log pode indicar bypass, rota errada, DNS errado ou logging ausente."
      }
    ],
    "decisionTree": [
      {
        "if": "Nome não resolve ou resolve IP inesperado",
        "then": "Validar DNS, split DNS, cache, arquivo hosts e resolvedor configurado antes de testar HTTP."
      },
      {
        "if": "Porta 443 não conecta",
        "then": "Investigar rota, firewall, SG/NSG, balanceador, listener e serviço antes de analisar status code."
      },
      {
        "if": "TLS falha antes de aparecer status HTTP",
        "then": "Verificar SNI, validade, cadeia de certificado, CN/SAN, inspeção TLS e trust store."
      },
      {
        "if": "Status 502/504 aparece",
        "then": "Focar em proxy, gateway, upstream, health check, timeout, DNS interno e logs de intermediários."
      },
      {
        "if": "Status 401/403 aparece",
        "then": "Separar autenticação ausente/inválida de autorização negada e conferir headers sem vazar tokens."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar HTTPS por padrão.",
      "Inventariar endpoints, donos e exposição.",
      "Aplicar autenticação e autorização no ponto correto.",
      "Mascarar tokens, cookies e dados sensíveis em logs.",
      "Usar headers de segurança adequados.",
      "Validar métodos permitidos e tamanho de payload.",
      "Registrar request ID para correlação entre proxy, gateway e aplicação."
    ],
    "badPractices": [
      "Expor HTTP sem TLS para tráfego sensível.",
      "Permitir todos os métodos HTTP sem necessidade.",
      "Aceitar qualquer Host header.",
      "Criar bypass direto para backend privado.",
      "Guardar payloads completos de login em logs.",
      "Ignorar status 4xx/5xx em monitoramento."
    ],
    "attacksAndDefenses": [
      {
        "risk": "Exposição sem TLS",
        "defense": "Redirecionar HTTP para HTTPS e exigir TLS moderno."
      },
      {
        "risk": "Vazamento de tokens em logs",
        "defense": "Mascarar Authorization, Cookie e parâmetros sensíveis."
      },
      {
        "risk": "Bypass de WAF/API Gateway",
        "defense": "Restringir backend a origens controladas e redes privadas."
      },
      {
        "risk": "Métodos perigosos expostos",
        "defense": "Permitir apenas métodos necessários por rota."
      },
      {
        "risk": "Cache de conteúdo privado",
        "defense": "Configurar Cache-Control adequado e separar cache público/privado."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Por que HTTP existe",
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
  "mentorQuestions": [
    "Se DNS resolve e a porta 443 conecta, por que a aplicação ainda pode falhar?",
    "Qual é a diferença entre status 401, 403, 404, 500 e 502 do ponto de vista operacional?",
    "Por que logs HTTP precisam mascarar Authorization e Cookie?"
  ],
  "quiz": [
    {
      "question": "Qual problema o HTTP resolve?",
      "options": [
        "Escolher rota IP",
        "Padronizar requisições e respostas de aplicação",
        "Converter IP em MAC",
        "Sincronizar relógios"
      ],
      "answer": 1,
      "explanation": "HTTP estrutura a conversa de aplicação entre cliente e servidor."
    },
    {
      "question": "HTTPS é melhor descrito como:",
      "options": [
        "HTTP protegido por TLS",
        "DNS com criptografia",
        "TCP sem handshake",
        "UDP com estado"
      ],
      "answer": 0,
      "explanation": "HTTPS usa HTTP sobre uma camada TLS."
    },
    {
      "question": "Qual campo indica a intenção da requisição HTTP?",
      "options": [
        "TTL",
        "MAC",
        "Method",
        "ASN"
      ],
      "answer": 2,
      "explanation": "GET, POST, PUT e DELETE são métodos HTTP."
    },
    {
      "question": "Um erro 500 normalmente aponta para:",
      "options": [
        "Falha de aplicação/servidor",
        "ARP ausente",
        "Máscara IPv4 inválida",
        "Gateway inexistente sempre"
      ],
      "answer": 0,
      "explanation": "5xx indica falha no lado servidor ou upstream."
    },
    {
      "question": "Qual item deve ser mascarado em logs HTTP?",
      "options": [
        "Status code",
        "Authorization",
        "Método GET",
        "Tempo de resposta"
      ],
      "answer": 1,
      "explanation": "Authorization pode conter tokens ou credenciais."
    },
    {
      "question": "Um 502 em proxy/load balancer sugere investigar:",
      "options": [
        "Somente DNS público",
        "Upstream/backend e conectividade entre proxy e aplicação",
        "Apenas teclado do usuário",
        "Somente endereço MAC local"
      ],
      "answer": 1,
      "explanation": "502 geralmente aparece quando o proxy não recebeu resposta válida do upstream."
    }
  ],
  "flashcards": [
    {
      "front": "HTTP",
      "back": "Protocolo de aplicação baseado em requisição e resposta usado por Web e APIs."
    },
    {
      "front": "Método HTTP",
      "back": "Indica a intenção da requisição, como GET, POST, PUT ou DELETE."
    },
    {
      "front": "Status code",
      "back": "Código de resposta que indica sucesso, redirecionamento, erro do cliente ou erro do servidor."
    },
    {
      "front": "Header HTTP",
      "back": "Metadado da requisição ou resposta, como Host, Authorization, Content-Type ou Cache-Control."
    },
    {
      "front": "HTTPS",
      "back": "HTTP protegido por TLS, usado para confidencialidade, integridade e autenticação do servidor."
    },
    {
      "front": "WAF",
      "back": "Controle que inspeciona tráfego HTTP/HTTPS para aplicar regras de segurança de aplicação."
    }
  ],
  "exercises": [
    {
      "id": "ex8.1.1",
      "type": "diagnóstico",
      "title": "Ler uma requisição",
      "prompt": "Explique os campos método, caminho, Host e Authorization em uma requisição HTTP.",
      "expectedAnswer": "Método indica ação, caminho indica recurso, Host indica domínio solicitado e Authorization carrega credencial/token."
    },
    {
      "id": "ex8.1.2",
      "type": "diagnóstico",
      "title": "Separar camadas",
      "prompt": "DNS resolve, TCP conecta, TLS falha. Isso é erro HTTP?",
      "expectedAnswer": "Não. A falha ocorre antes da requisição HTTP útil, na negociação ou validação TLS."
    },
    {
      "id": "ex8.1.3",
      "type": "diagnóstico",
      "title": "Interpretar status",
      "prompt": "Compare 401, 403 e 404.",
      "expectedAnswer": "401 é autenticação ausente/inválida; 403 é acesso negado; 404 é recurso não encontrado ou ocultado."
    },
    {
      "id": "ex8.1.4",
      "type": "diagnóstico",
      "title": "Segurança de logs",
      "prompt": "Quais campos você mascararia em logs HTTP?",
      "expectedAnswer": "Authorization, Cookie, Set-Cookie, tokens em query string, dados pessoais e payloads sensíveis."
    }
  ],
  "challenge": {
    "title": "API atrás de proxy passou a retornar 502",
    "scenario": "Após uma mudança no proxy reverso, clientes recebem 502 ao acessar https://api.corp.local/v1/orders. DNS resolve e a porta 443 conecta. A aplicação informa que está no ar.",
    "tasks": [
      "Montar sequência de diagnóstico",
      "Separar DNS, TCP, TLS, proxy e aplicação",
      "Listar evidências necessárias",
      "Apontar hipóteses de causa",
      "Propor correção segura"
    ],
    "rubric": [
      "Inclui testes com curl -vk e headers",
      "Verifica rota do proxy para upstream",
      "Confere logs do proxy e aplicação por request ID",
      "Valida certificado/SNI quando aplicável",
      "Não expõe tokens ou cookies em evidências"
    ]
  },
  "commentedSolution": {
    "summary": "A investigação deve começar confirmando DNS e conexão externa, mas 502 indica foco provável no proxy ou upstream.",
    "steps": [
      "Resolver api.corp.local e validar IP esperado.",
      "Testar 443/TCP e negociação TLS com SNI correto.",
      "Executar curl -vk para observar status, headers e eventual request ID.",
      "Consultar logs do proxy pelo horário e request ID.",
      "Testar conectividade do proxy até o backend real.",
      "Verificar se o path /v1/orders está roteado para upstream correto.",
      "Validar health check e porta do backend.",
      "Corrigir rota upstream, DNS interno, porta, certificado ou política conforme evidência."
    ],
    "keyLessons": [
      "502 geralmente vem de intermediário",
      "DNS e TCP funcionando não garantem HTTP saudável",
      "Request ID acelera correlação",
      "Logs devem ser úteis sem vazar segredos"
    ]
  },
  "glossary": [
    {
      "term": "HTTP",
      "definition": "Protocolo de aplicação de requisição e resposta usado por Web e APIs."
    },
    {
      "term": "HTTPS",
      "definition": "HTTP protegido por TLS."
    },
    {
      "term": "Método",
      "definition": "Verbo da requisição que expressa intenção, como GET ou POST."
    },
    {
      "term": "Header",
      "definition": "Metadado transportado em requisições e respostas HTTP."
    },
    {
      "term": "Status code",
      "definition": "Código numérico que resume o resultado da resposta HTTP."
    },
    {
      "term": "Proxy reverso",
      "definition": "Intermediário que recebe requisições de clientes e encaminha para servidores internos."
    }
  ],
  "references": [
    {
      "title": "RFC 9110 — HTTP Semantics",
      "type": "standard",
      "note": "Base conceitual moderna para semântica HTTP."
    },
    {
      "title": "OWASP HTTP Security Response Headers",
      "type": "security",
      "note": "Referência para headers defensivos em aplicações web."
    },
    {
      "title": "MDN Web Docs — HTTP",
      "type": "documentation",
      "note": "Boa referência prática para métodos, headers e status codes."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e deploy",
      "reason": "Health checks, APIs e gateways HTTP aparecem em deploys automatizados."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "OIDC e SAML",
      "reason": "Fluxos modernos de identidade usam HTTP redirects, cookies, tokens e endpoints HTTPS."
    }
  ],
  "progressRules": {
    "minReadSections": 16,
    "mustCompleteLab": true,
    "minQuizScore": 70,
    "unlockNextLesson": "8.2",
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
      "8.2"
    ]
  }
};
