export const lesson0808 = {
  "id": "8.8",
  "moduleId": "m08",
  "order": 8,
  "title": "Troubleshooting HTTP com curl, navegador, logs e traces",
  "subtitle": "Aprenda um método operacional para diagnosticar falhas HTTP/HTTPS separando DNS, rota, TCP, TLS, status codes, headers, proxies, WAFs, load balancers, aplicação, logs e traces.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "redes",
    "http",
    "https",
    "curl",
    "devtools",
    "logs",
    "traces",
    "proxy",
    "waf",
    "load-balancer",
    "api",
    "observabilidade",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.1",
      "title": "Por que HTTP existe",
      "reason": "O diagnóstico HTTP depende de entender o papel do protocolo na camada de aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.2",
      "title": "Requisições e respostas: métodos, URLs, headers, body e status codes",
      "reason": "Métodos, URLs, headers, body e status codes são a matéria-prima do troubleshooting."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.3",
      "title": "HTTPS, TLS, certificados, SNI e cadeia de confiança",
      "reason": "Muitos problemas HTTP são, na verdade, problemas de TLS, certificado, SNI ou cadeia."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.5",
      "title": "Proxies, reverse proxies, WAFs e load balancers HTTP",
      "reason": "Intermediários HTTP são causas frequentes de 502, 503, 504, headers alterados e perda de contexto."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.7",
      "title": "HTTP/2, HTTP/3, QUIC e performance",
      "reason": "Versão HTTP, ALPN, QUIC, cache e CDN influenciam sintomas de performance e conectividade."
    }
  ],
  "objectives": [
    "Construir um método de troubleshooting HTTP ponta a ponta sem pular camadas.",
    "Usar curl e navegador para coletar evidências de DNS, TCP, TLS, headers, status codes, redirects e tempo de resposta.",
    "Interpretar logs de proxy, WAF, load balancer, API gateway, aplicação e backend usando request IDs.",
    "Diferenciar erros de cliente, autenticação, autorização, método, rota, backend, timeout, gateway e dependência interna.",
    "Relacionar traces distribuídos com latência por etapa, spans, dependências e gargalos reais.",
    "Criar um runbook defensivo de diagnóstico HTTP com evidências sanitizadas e hipótese testável."
  ],
  "learningOutcomes": [
    "Executar testes HTTP com curl preservando headers úteis e sem vazar tokens em evidências.",
    "Ler DevTools para entender status, protocolo, timing, redirects, cache, cookies, CORS e payload.",
    "Mapear um erro 502/503/504 até proxy, WAF, gateway, backend ou dependência.",
    "Usar request ID/correlation ID para atravessar logs de borda, gateway, aplicação e APM.",
    "Separar problemas de DNS, TCP, TLS, HTTP, autorização, backend e performance usando uma sequência reproduzível."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Quando uma aplicação web falha, o usuário normalmente diz apenas: “o site está fora”, “a API está lenta” ou “deu erro 500”. Para quem trabalha com redes, segurança, cloud ou DevSecOps, essa frase é insuficiente. O problema pode estar no DNS, na rota, no TCP, no TLS, no proxy, no WAF, no load balancer, no API gateway, no backend, no banco de dados, no IdP, no cache ou até em uma regra de CORS.</p>\n  <p>Troubleshooting HTTP é a capacidade de transformar uma reclamação genérica em evidências: qual URL, qual método, qual status code, qual header, qual IP, qual certificado, qual protocolo, qual request ID, qual tempo de resposta, qual componente respondeu e qual componente falhou. Sem isso, a equipe fica presa em suposições.</p>\n  <div class='callout'><strong>Ideia central:</strong> curl e navegador mostram o sintoma; logs e traces mostram onde o sintoma foi produzido.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No começo da Web, diagnosticar HTTP era relativamente simples: um cliente falava com um servidor e recebia uma resposta. Com o crescimento da Internet, surgiram caches, proxies, CDNs, balanceadores, WAFs, gateways, microsserviços e APIs distribuídas. O caminho deixou de ser uma linha reta.</p>\n  <p>Também mudou o nível de exigência. Antes bastava saber se a página carregava. Hoje é preciso saber se a API cumpre p95, se o status code é semanticamente correto, se o WAF bloqueou legitimamente, se o token expirou, se o certificado está correto, se um trace mostra gargalo no banco, se uma borda respondeu 504 e se o backend chegou a receber a requisição.</p>\n  <p>Por isso ferramentas como curl, DevTools, logs estruturados, request IDs e traces distribuídos viraram essenciais. Elas permitem reconstruir o caminho lógico da requisição.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O principal problema é que HTTP parece simples por fora, mas é composto por várias camadas e intermediários. Um erro <code>403</code> pode ser aplicação, WAF, API gateway, política de autorização, token inválido ou IP bloqueado. Um <code>502</code> pode ser backend indisponível, porta errada, TLS interno falhando, upstream fechado ou health check quebrado. Um <code>504</code> pode ser timeout no gateway, consulta lenta, fila no backend ou dependência externa.</p>\n  <p>Outro problema é a perda de contexto. Se o cliente gera um request ID, mas o proxy não repassa; se o WAF registra outro ID; se a aplicação não loga o status; se o trace não atravessa serviços; então cada equipe enxerga uma parte isolada do incidente.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> sem método, equipes confundem sintoma com causa. Reiniciam serviços, limpam cache, alteram firewall ou culpam DNS sem evidência suficiente.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <table class='comparison-table'><thead><tr><th>Fase</th><th>Diagnóstico comum</th><th>Limitação</th><th>Evolução necessária</th></tr></thead><tbody><tr><td>Servidor único</td><td>Ver log do web server</td><td>Poucos intermediários</td><td>Correlacionar cliente e servidor</td></tr><tr><td>Proxy/load balancer</td><td>Ver status na borda</td><td>Erro pode estar no upstream</td><td>Logs com upstream status e request ID</td></tr><tr><td>APIs/microsserviços</td><td>Ver log da aplicação</td><td>Dependências múltiplas</td><td>Tracing distribuído</td></tr><tr><td>Cloud/CDN/WAF</td><td>Ver painel da borda</td><td>Política pode bloquear antes do backend</td><td>Flow logs, WAF logs, APM e SIEM</td></tr></tbody></table>\n  <p>O troubleshooting moderno não substitui ferramentas antigas. Ele combina ferramentas clássicas, como <code>curl</code>, <code>dig</code> e captura de pacotes, com logs estruturados, métricas, traces, dashboards e conhecimento de arquitetura.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>Troubleshooting HTTP</strong> é o processo de diagnosticar uma falha de comunicação ou comportamento de aplicação web usando evidências do cliente, da rede, da camada TLS, dos intermediários HTTP, da aplicação e das dependências.</p>\n  <p>O método começa fora da aplicação: nome resolve? IP é esperado? porta responde? TLS negocia? certificado é válido? SNI está correto? HTTP retorna qual status? O redirect é esperado? O header indica cache, proxy, WAF ou backend? Depois avança para dentro: o request ID aparece no gateway? O backend recebeu? Qual dependência demorou? O trace mostra gargalo?</p>\n  <div class='definition-box'>Um diagnóstico HTTP bom responde: quem respondeu, com qual status, em quanto tempo, em qual etapa, com qual identificador de correlação e com qual evidência reproduzível.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Uma requisição HTTP real atravessa uma cadeia. Mesmo quando o usuário digita uma URL, o caminho interno envolve resolução DNS, conexão TCP ou QUIC, negociação TLS, envio de headers, possíveis redirects, inspeção por WAF, roteamento em proxy, health check de backend, execução da aplicação e chamada a dependências.</p>\n  <ol class='flow-list'>\n    <li>Cliente resolve o nome e escolhe um IP.</li>\n    <li>Cliente testa conectividade com TCP/443 ou UDP/443, dependendo do protocolo.</li>\n    <li>Cliente negocia TLS, SNI, certificado e ALPN.</li>\n    <li>Cliente envia método, URL, headers e body.</li>\n    <li>CDN/WAF/proxy pode redirecionar, bloquear, cachear, reescrever ou encaminhar.</li>\n    <li>Load balancer escolhe backend ou retorna erro de upstream.</li>\n    <li>Aplicação processa autenticação, autorização, validação e regra de negócio.</li>\n    <li>Dependências como banco, cache, fila, IdP e APIs externas impactam latência e status.</li>\n    <li>Logs, métricas e traces registram evidências para correlação.</li>\n  </ol>\n  <p>Por isso, uma resposta HTTP nunca deve ser interpretada isoladamente. O mesmo <code>401</code>, <code>403</code>, <code>404</code>, <code>429</code>, <code>500</code>, <code>502</code>, <code>503</code> ou <code>504</code> pode ter causas diferentes dependendo do componente que gerou a resposta.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura corporativa, a requisição HTTP raramente vai direto para o backend. Ela passa por DNS, CDN, WAF, load balancer, reverse proxy, API gateway, serviço de autenticação, service mesh e aplicação. Cada camada pode alterar headers, status, body, tempo de resposta e logs.</p>\n  <p>Por isso, a arquitetura precisa incluir observabilidade desde o desenho: request ID na borda, propagation de trace context, logs estruturados, métricas por status code, latência por rota, logs do WAF, logs do load balancer, logs da aplicação e integração com SIEM/APM.</p>\n  <table class='data-table'><thead><tr><th>Camada</th><th>O que verificar</th><th>Evidência</th></tr></thead><tbody><tr><td>Cliente</td><td>URL, headers, status, tempo</td><td>curl/DevTools</td></tr><tr><td>DNS/TLS</td><td>IP, SNI, certificado, ALPN</td><td>dig, openssl, curl -v</td></tr><tr><td>Borda</td><td>WAF, CDN, cache, rate limit</td><td>logs de borda</td></tr><tr><td>Gateway</td><td>upstream, route, timeout</td><td>access log e upstream log</td></tr><tr><td>Aplicação</td><td>auth, regra, dependência</td><td>logs e traces</td></tr></tbody></table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine que uma encomenda não chegou. Um diagnóstico ruim diz apenas “o entregador falhou”. Um diagnóstico bom reconstrói o caminho: o endereço estava correto? O porteiro recebeu? O pacote passou pela triagem? Foi bloqueado por falta de autorização? Ficou parado no depósito? O destinatário recusou? Há protocolo de entrega?</p>\n  <p>HTTP é parecido. O status code é o recado na porta, mas não conta sozinho toda a história. Você precisa olhar o rastreio completo: DNS, TLS, proxy, WAF, gateway, backend, dependências, logs e traces.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você acessa <code>https://app.exemplo.local/login</code> e recebe <code>404</code>. Um iniciante pode concluir que o servidor está fora. Mas <code>404</code> significa que algum componente respondeu dizendo que aquele recurso não foi encontrado. Pode ser path errado, rota do proxy errada, base path removido, rewrite incorreto, versão nova da aplicação ou chamada para ambiente errado.</p>\n  <p>Com <code>curl -v</code>, você verifica DNS, IP, TLS, status e headers. No DevTools, observa se houve redirect. No log do reverse proxy, procura o request ID. No log da aplicação, confirma se a requisição chegou. Assim você separa erro de publicação de erro de aplicação.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma API interna começa a retornar <code>504 Gateway Timeout</code>. O time de aplicação diz que não recebeu nada. O time de rede vê conectividade. O time de segurança vê o WAF permitindo a requisição. O load balancer, porém, mostra upstream timeout para apenas um grupo de backends.</p>\n  <p>O diagnóstico correto usa correlação: request ID no cliente, log do WAF, access log do load balancer, health check, log do backend e trace da aplicação. A causa pode ser um backend fora do pool, uma dependência lenta ou um timeout menor no gateway do que no serviço.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, um erro HTTP pode envolver DNS público, private DNS, CDN, WAF gerenciado, Application Load Balancer, API Gateway, ingress Kubernetes, security group, NACL/NSG, route table, NAT Gateway, endpoint privado e logs distribuídos. O status visto pelo cliente pode ter sido gerado por qualquer componente.</p>\n  <p>Por isso, o runbook deve cruzar camadas: resolver nome, verificar certificado, testar path direto pela borda, consultar logs do WAF, olhar target health, conferir status de upstream, analisar traces e validar se o backend tem saída para suas dependências.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em pipelines, troubleshooting HTTP aparece em testes de health check, smoke tests, deploy canário, testes de contrato, webhooks, APIs internas e validação de ingress. Um deploy pode passar nos testes unitários, mas falhar porque o ingress removeu um header, o path rewrite mudou ou o service mesh não propagou trace context.</p>\n  <p>Boas pipelines registram artefatos: saída de <code>curl</code> sanitizada, status esperado, headers obrigatórios, request ID, logs da borda, versão implantada, commit, ambiente e trace da requisição de teste.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Para Segurança, HTTP troubleshooting não é só disponibilidade. É também evidência. Um <code>403</code> do WAF pode indicar bloqueio correto. Um <code>200</code> com dados sensíveis pode indicar autorização quebrada. Um <code>302</code> para domínio inesperado pode indicar configuração errada ou abuso. Um header <code>Server</code> revelador pode expor tecnologia.</p>\n  <div class='callout callout--security'><strong>Defensivo:</strong> ao coletar evidências, nunca cole tokens, cookies de sessão, Authorization headers, dados pessoais, payloads sensíveis ou IPs internos sem sanitização.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <p>O troubleshooting HTTP precisa seguir o fluxo inteiro, porque o erro visto no navegador pode ter sido criado por DNS, rede, TLS, proxy, WAF, load balancer, API gateway, aplicação ou dependência interna.</p>\n  <svg class='lesson-svg' viewBox='0 0 980 620' role='img' aria-labelledby='m08l08-title m08l08-desc'>\n    <title id='m08l08-title'>Troubleshooting HTTP com curl, navegador, logs e traces</title>\n    <desc id='m08l08-desc'>Fluxo de diagnóstico HTTP de cliente para DNS, borda, WAF, load balancer, aplicação, logs, traces e SIEM.</desc>\n    <defs>\n      <marker id='m08l08-arrow' markerWidth='10' markerHeight='10' refX='9' refY='3' orient='auto' markerUnits='strokeWidth'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow'/>\n      </marker>\n    </defs>\n    <rect x='35' y='55' width='145' height='82' rx='14' class='svg-node svg-node--client'/>\n    <text x='107' y='88' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='107' y='112' text-anchor='middle' class='svg-label svg-label--small'>curl / browser</text>\n\n    <rect x='230' y='55' width='145' height='82' rx='14' class='svg-node svg-node--server'/>\n    <text x='302' y='88' text-anchor='middle' class='svg-label'>DNS</text>\n    <text x='302' y='112' text-anchor='middle' class='svg-label svg-label--small'>nome → IP</text>\n\n    <rect x='425' y='55' width='145' height='82' rx='14' class='svg-node svg-node--security'/>\n    <text x='497' y='88' text-anchor='middle' class='svg-label'>TLS</text>\n    <text x='497' y='112' text-anchor='middle' class='svg-label svg-label--small'>cert / SNI</text>\n\n    <rect x='620' y='55' width='145' height='82' rx='14' class='svg-node svg-node--firewall'/>\n    <text x='692' y='88' text-anchor='middle' class='svg-label'>Borda</text>\n    <text x='692' y='112' text-anchor='middle' class='svg-label svg-label--small'>CDN / WAF</text>\n\n    <rect x='815' y='55' width='130' height='82' rx='14' class='svg-node svg-node--router'/>\n    <text x='880' y='88' text-anchor='middle' class='svg-label'>LB/API GW</text>\n    <text x='880' y='112' text-anchor='middle' class='svg-label svg-label--small'>roteia</text>\n\n    <rect x='235' y='265' width='150' height='82' rx='14' class='svg-node svg-node--server'/>\n    <text x='310' y='298' text-anchor='middle' class='svg-label'>Backend</text>\n    <text x='310' y='322' text-anchor='middle' class='svg-label svg-label--small'>app/API</text>\n\n    <rect x='445' y='265' width='150' height='82' rx='14' class='svg-node svg-node--cloud'/>\n    <text x='520' y='298' text-anchor='middle' class='svg-label'>Dependências</text>\n    <text x='520' y='322' text-anchor='middle' class='svg-label svg-label--small'>DB/cache/IdP</text>\n\n    <rect x='665' y='265' width='150' height='82' rx='14' class='svg-node svg-node--security'/>\n    <text x='740' y='298' text-anchor='middle' class='svg-label'>Logs</text>\n    <text x='740' y='322' text-anchor='middle' class='svg-label svg-label--small'>request ID</text>\n\n    <rect x='445' y='455' width='150' height='82' rx='14' class='svg-node svg-node--security'/>\n    <text x='520' y='488' text-anchor='middle' class='svg-label'>Traces</text>\n    <text x='520' y='512' text-anchor='middle' class='svg-label svg-label--small'>span / latência</text>\n\n    <rect x='665' y='455' width='150' height='82' rx='14' class='svg-node svg-node--security'/>\n    <text x='740' y='488' text-anchor='middle' class='svg-label'>SIEM/APM</text>\n    <text x='740' y='512' text-anchor='middle' class='svg-label svg-label--small'>correlação</text>\n\n    <line x1='180' y1='96' x2='230' y2='96' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l08-arrow)'/>\n    <line x1='375' y1='96' x2='425' y2='96' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l08-arrow)'/>\n    <line x1='570' y1='96' x2='620' y2='96' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l08-arrow)'/>\n    <line x1='765' y1='96' x2='815' y2='96' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l08-arrow)'/>\n    <line x1='880' y1='137' x2='385' y2='280' class='svg-flow svg-flow--request' marker-end='url(#m08l08-arrow)'/>\n    <line x1='385' y1='306' x2='445' y2='306' class='svg-flow svg-flow--request' marker-end='url(#m08l08-arrow)'/>\n    <line x1='385' y1='335' x2='665' y2='306' class='svg-flow svg-flow--response' marker-end='url(#m08l08-arrow)'/>\n    <line x1='595' y1='496' x2='665' y2='496' class='svg-flow svg-flow--response' marker-end='url(#m08l08-arrow)'/>\n    <line x1='520' y1='347' x2='520' y2='455' class='svg-flow svg-flow--response' marker-end='url(#m08l08-arrow)'/>\n    <line x1='740' y1='347' x2='740' y2='455' class='svg-flow svg-flow--response' marker-end='url(#m08l08-arrow)'/>\n    <text x='490' y='205' text-anchor='middle' class='svg-label svg-label--small'>Use curl/DevTools para ver o sintoma; use logs/traces para localizar onde ele nasceu</text>\n    <text x='490' y='585' text-anchor='middle' class='svg-label'>Diagnóstico bom separa DNS, TCP, TLS, HTTP, proxy, backend, dependências e observabilidade</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório você vai construir um runbook de troubleshooting HTTP ponta a ponta. Você usará curl, navegador/DevTools, validação TLS, leitura de headers, status codes, request IDs, logs simulados e análise de trace para separar sintoma e causa provável.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam interpretação de status codes, headers, redirects, timeouts, erros de gateway, logs de upstream, request IDs e traces distribuídos.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário no qual uma API funciona para alguns usuários, mas falha para outros com mistura de <code>403</code>, <code>502</code> e <code>504</code>. Seu desafio será montar hipóteses, evidências necessárias e plano de investigação.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada aplica diagnóstico em sequência: cliente, DNS, TLS, HTTP, borda, WAF, gateway, backend, dependências, logs e traces. O foco é provar ou eliminar hipóteses com evidências.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Troubleshooting HTTP eficiente não começa reiniciando serviço. Começa identificando URL, método, status, headers, tempo, certificado, protocolo, componente que respondeu e request ID. Depois cruza essa evidência com logs e traces.</p>\n  <p>curl e DevTools mostram o que o cliente viu. Logs mostram o que cada intermediário fez. Traces mostram quanto tempo cada etapa consumiu. Juntos, eles permitem separar DNS, TCP, TLS, HTTP, proxy, WAF, load balancer, backend e dependência.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula você estudará segurança HTTP: headers, CORS, exposição e hardening. Depois de aprender a diagnosticar o fluxo, vamos aprender a endurecer a superfície HTTP e reduzir riscos de exposição.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "HTTP",
      "HTTPS",
      "Troubleshooting",
      "Observabilidade",
      "Segurança"
    ],
    "beforeThisLesson": "O aluno já entende HTTP, HTTPS/TLS, cookies, proxies, APIs e versões modernas HTTP/2/HTTP/3.",
    "afterThisLesson": "O aluno consegue diagnosticar falhas HTTP reais usando curl, navegador, logs, request IDs e traces.",
    "dependsOn": [
      "DNS",
      "TCP",
      "TLS",
      "HTTP",
      "Proxy",
      "WAF",
      "Load balancer",
      "Logs",
      "Tracing",
      "SIEM",
      "APM"
    ]
  },
  "protocolFields": [
    {
      "field": "Method",
      "meaning": "Verbo HTTP usado na requisição, como GET, POST, PUT ou DELETE.",
      "securityNote": "Métodos perigosos ou inesperados devem ser controlados e auditados."
    },
    {
      "field": "URL/Path",
      "meaning": "Recurso solicitado no servidor ou gateway.",
      "securityNote": "Paths podem revelar endpoints internos ou sofrer rewrite incorreto."
    },
    {
      "field": "Status Code",
      "meaning": "Código de resposta indicando resultado lógico da requisição.",
      "securityNote": "Status code deve ser interpretado com o componente que o gerou."
    },
    {
      "field": "Host",
      "meaning": "Nome virtual solicitado pelo cliente.",
      "securityNote": "Host header indevido pode causar roteamento incorreto ou abuso."
    },
    {
      "field": "X-Request-ID",
      "meaning": "Identificador de correlação entre borda, gateway e aplicação.",
      "securityNote": "Sem correlação, investigação e resposta a incidentes ficam frágeis."
    },
    {
      "field": "Server-Timing",
      "meaning": "Header opcional que expõe tempos por etapa.",
      "securityNote": "Útil para diagnóstico, mas deve evitar expor detalhes sensíveis."
    },
    {
      "field": "Traceparent",
      "meaning": "Header usado para propagação de contexto de trace distribuído.",
      "securityNote": "Deve ser controlado para evitar spoofing de contexto em logs."
    }
  ],
  "packetFlow": [
    "Cliente resolve o nome e escolhe o IP do serviço.",
    "Cliente estabelece transporte e TLS quando usa HTTPS.",
    "Cliente envia método, URL, headers e body.",
    "CDN/WAF/proxy aplica cache, política, bloqueio, rewrite ou encaminhamento.",
    "Load balancer/API gateway escolhe upstream e registra status de upstream.",
    "Aplicação processa autenticação, autorização, validação e regra de negócio.",
    "Dependências internas impactam latência e status final.",
    "Logs e traces registram request ID, status, latência, erro e componente responsável.",
    "Cliente recebe status, headers e body, que precisam ser interpretados com as evidências internas."
  ],
  "deepDive": {
    "title": "Status code não é causa raiz",
    "content": "Um status code é uma evidência, não a investigação completa. Um 502 normalmente indica que um intermediário não conseguiu resposta válida do upstream, mas não diz sozinho se a causa foi porta fechada, TLS interno, backend crashado, timeout, health check errado ou rota quebrada. Um 403 pode ser autorização da aplicação, bloqueio do WAF, regra do API Gateway, IP reputation ou token sem escopo. O método correto é perguntar: qual componente gerou esse status e qual log confirma isso?",
    "securityAngle": "Em incidentes, interpretar status sem logs pode levar a conclusões erradas. Segurança precisa de evidências correlacionadas para distinguir bloqueio legítimo, falso positivo, ataque, falha operacional ou configuração insegura."
  },
  "commonMistakes": [
    "Concluir que erro HTTP é problema da aplicação sem verificar DNS, TLS, proxy e WAF.",
    "Usar curl sem mostrar headers, redirects, certificado ou tempo de resposta.",
    "Colecionar evidências com tokens, cookies e dados sensíveis sem sanitização.",
    "Ignorar request ID e tentar correlacionar logs apenas por horário aproximado.",
    "Confundir 401 com 403, 502 com 504 ou timeout TCP com timeout HTTP.",
    "Testar apenas a URL pública e não validar logs da borda, gateway e backend.",
    "Achar que ping funcionando prova que HTTPS/API está funcionando.",
    "Limpar cache ou reiniciar serviço antes de coletar evidências do incidente."
  ],
  "troubleshooting": {
    "method": "Diagnóstico HTTP em camadas com evidências correlacionadas.",
    "steps": [
      "Registrar URL, método, horário, usuário afetado, origem, ambiente e erro observado.",
      "Resolver DNS e confirmar IP/endpoint esperado.",
      "Validar porta, TLS, SNI, certificado e ALPN.",
      "Usar curl com verbose, headers, redirects e métricas de tempo.",
      "Usar DevTools para verificar status, protocol, timing, cache, cookies, CORS e payload.",
      "Localizar request ID/correlation ID na resposta ou nos logs.",
      "Cruzar logs de CDN/WAF/load balancer/API gateway/backend.",
      "Verificar traces distribuídos para identificar etapa lenta ou erro de dependência.",
      "Confirmar se o status foi gerado na borda, gateway, aplicação ou dependência.",
      "Documentar causa provável, evidências, impacto, mitigação e prevenção."
    ],
    "commands": [
      {
        "platform": "Linux/macOS/Windows",
        "command": "curl -vkI https://api.exemplo.com/health",
        "purpose": "Ver TLS, headers e status sem baixar body."
      },
      {
        "platform": "Linux/macOS/Windows",
        "command": "curl -vL -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer} total=%{time_total} code=%{http_code}\\n' https://api.exemplo.com/v1/status",
        "purpose": "Medir tempos por etapa e seguir redirects."
      },
      {
        "platform": "Linux/macOS",
        "command": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -alpn h2,http/1.1",
        "purpose": "Validar SNI, certificado, cadeia e ALPN."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection api.exemplo.com -Port 443",
        "purpose": "Validar conectividade TCP/443."
      },
      {
        "platform": "Navegador",
        "command": "DevTools > Network > Preserve log > Headers/Timing/Initiator",
        "purpose": "Analisar status, redirects, cache, CORS, cookies, timing e origem da chamada."
      },
      {
        "platform": "Linux",
        "command": "tcpdump -n host <ip_do_endpoint> and port 443",
        "purpose": "Captura controlada de conectividade quando autorizado."
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Troubleshooting HTTP com curl, navegador, logs e traces.",
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
    "goodPractices": [
      "Sanitizar tokens, cookies, Authorization headers e payloads sensíveis antes de compartilhar evidências.",
      "Propagar request ID e trace context entre borda, gateway, aplicação e dependências.",
      "Registrar status do cliente e status do upstream separadamente.",
      "Manter logs do WAF, load balancer, API gateway e aplicação com retenção adequada.",
      "Usar curl e DevTools de forma reprodutível em runbooks.",
      "Diferenciar bloqueios de segurança legítimos de falhas operacionais.",
      "Incluir evidências de TLS, certificado e SNI em incidentes HTTPS.",
      "Registrar p95/p99 e não apenas média de latência."
    ],
    "badPractices": [
      "Enviar prints de DevTools contendo cookies ou tokens.",
      "Usar --insecure como solução permanente.",
      "Desabilitar WAF para testar sem coletar evidências antes.",
      "Compartilhar payloads com dados pessoais em tickets públicos.",
      "Concluir causa raiz apenas pelo status code.",
      "Ignorar logs de borda e olhar só a aplicação.",
      "Remover rate limit ou autenticação para 'ver se resolve'."
    ],
    "threats": [
      "Vazamento de credenciais em logs e evidências.",
      "Bypass de WAF por backend exposto diretamente.",
      "Host header abuse e roteamento indevido.",
      "CORS permissivo escondido por erro de frontend.",
      "Rate limit ausente causando 5xx sob abuso.",
      "Trace context forjado poluindo correlação de logs.",
      "Cache de respostas sensíveis por headers incorretos."
    ],
    "mitigations": [
      "Mascarar segredos em logs e tickets.",
      "Exigir passagem pela borda autorizada.",
      "Validar Host/SNI e headers encaminhados.",
      "Implementar logs estruturados e correlação ponta a ponta.",
      "Manter WAF em modo monitorado antes de bloqueios críticos quando possível.",
      "Definir runbooks para 401, 403, 404, 429, 500, 502, 503 e 504.",
      "Usar APM/tracing com amostragem e proteção de dados sensíveis."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Troubleshooting HTTP com curl, navegador, logs e traces",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Mascarar segredos em logs e tickets.",
      "Exigir passagem pela borda autorizada.",
      "Validar Host/SNI e headers encaminhados.",
      "Implementar logs estruturados e correlação ponta a ponta.",
      "Manter WAF em modo monitorado antes de bloqueios críticos quando possível.",
      "Definir runbooks para 401, 403, 404, 429, 500, 502, 503 e 504.",
      "Usar APM/tracing com amostragem e proteção de dados sensíveis."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-8.8",
    "title": "Runbook de troubleshooting HTTP ponta a ponta",
    "labType": "security",
    "objective": "Criar e aplicar um método de diagnóstico HTTP/HTTPS usando curl, navegador, TLS, headers, status codes, logs simulados e traces.",
    "scenario": "Laboratório Neste laboratório você vai construir um runbook de troubleshooting HTTP ponta a ponta. Você usará curl, navegador/DevTools, validação TLS, leitura de headers, status codes, request IDs, logs simulados e análise de trace para separar sintoma e causa provável.",
    "topology": "Cliente → DNS → CDN/WAF/reverse proxy → load balancer/API gateway → backend → dependências → logs/traces/SIEM.",
    "architecture": "O laboratório pode ser feito contra um serviço próprio, ambiente de laboratório local ou endpoint interno autorizado. Não use tokens reais nem payloads sensíveis em evidências.",
    "prerequisites": [
      "curl",
      "navegador com DevTools",
      "openssl opcional",
      "acesso a logs simulados ou reais autorizados",
      "editor para runbook"
    ],
    "tools": [
      "Terminal Linux",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 180,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não testar endpoints de terceiros sem autorização.",
      "Não publicar cookies, tokens, IPs internos ou payloads sensíveis.",
      "Não executar carga, fuzzing ou varredura agressiva: este laboratório é diagnóstico, não teste de intrusão."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar o sintoma",
        "instruction": "Anote URL, método, horário, origem, usuário afetado, status observado, ambiente e impacto.",
        "command": "# Exemplo de registro: GET https://api.exemplo.local/v1/pedidos -> 504 às 10:32",
        "expectedOutput": "Sintoma definido sem ambiguidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Troubleshooting HTTP com curl, navegador, logs e traces” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Validar DNS e endpoint",
        "instruction": "Confirme se o nome resolve para o endpoint esperado.",
        "command": "dig api.exemplo.local\nResolve-DnsName api.exemplo.local",
        "expectedOutput": "Nome, IP e tipo de resposta documentados.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Troubleshooting HTTP com curl, navegador, logs e traces” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Validar transporte e TLS",
        "instruction": "Teste conectividade e certificado.",
        "command": "curl -vkI https://api.exemplo.local\nopenssl s_client -connect api.exemplo.local:443 -servername api.exemplo.local -alpn h2,http/1.1",
        "expectedOutput": "Porta, TLS, SNI, certificado e ALPN avaliados.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Troubleshooting HTTP com curl, navegador, logs e traces” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Coletar status, headers e tempos",
        "instruction": "Use curl para medir etapas e preservar headers relevantes.",
        "command": "curl -vL -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} ttfb=%{time_starttransfer} total=%{time_total} code=%{http_code}\\n' https://api.exemplo.local/v1/health",
        "expectedOutput": "Tempos e status coletados em formato comparável.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Troubleshooting HTTP com curl, navegador, logs e traces” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Analisar no navegador",
        "instruction": "Use DevTools para observar redirects, cookies, CORS, cache, waterfall e timing.",
        "command": "DevTools > Network > Preserve log > Disable cache > Reload",
        "expectedOutput": "Evidências visuais e headers exportados de forma sanitizada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Troubleshooting HTTP com curl, navegador, logs e traces” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Correlacionar request ID",
        "instruction": "Procure X-Request-ID, traceparent ou correlation ID na resposta e nos logs.",
        "command": "grep '<request-id>' waf.log\ngrep '<request-id>' gateway.log\ngrep '<request-id>' app.log",
        "expectedOutput": "Caminho da requisição reconstruído por componente.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Troubleshooting HTTP com curl, navegador, logs e traces” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Localizar o componente gerador do erro",
        "instruction": "Determine se status foi gerado por WAF, gateway, backend ou dependência.",
        "command": "# comparar status externo, upstream_status, app_status e trace error",
        "expectedOutput": "Hipótese principal sustentada por evidências.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Troubleshooting HTTP com curl, navegador, logs e traces” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Montar runbook",
        "instruction": "Documente passos, comandos, campos de log e decisões para incidentes futuros.",
        "command": "# criar tabela: camada | teste | evidência | próximo passo",
        "expectedOutput": "Runbook pronto para reuso.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Troubleshooting HTTP com curl, navegador, logs e traces” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Troubleshooting HTTP com curl, navegador, logs e traces”.",
    "validation": [
      {
        "check": "O runbook diferencia DNS, TCP, TLS, HTTP, proxy, WAF, backend e dependências.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "O runbook diferencia DNS, TCP, TLS, HTTP, proxy, WAF, backend e dependências.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "As evidências estão sanitizadas.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "As evidências estão sanitizadas.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Há pelo menos um exemplo de curl com timing.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Há pelo menos um exemplo de curl com timing.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Há campos para request ID, status externo, upstream status, latência e componente responsável.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Há campos para request ID, status externo, upstream status, latência e componente responsável.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se curl falha antes de HTTP, investigar DNS/TCP/TLS.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se curl recebe 502/504, procurar logs de gateway/upstream.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se navegador falha e curl funciona, investigar cookies, CORS, cache, mixed content ou extensão/proxy local.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se logs não correlacionam, padronizar request ID e trace context.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar exemplos para 401, 403, 404, 429, 502, 503 e 504.",
      "Integrar checklist com pipeline de smoke test.",
      "Criar dashboard com status por rota, p95/p99, upstream e erro por componente.",
      "Adicionar mascaramento automático de headers sensíveis em logs."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Troubleshooting HTTP com curl, navegador, logs e traces” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "API intermitente com 403, 502 e 504",
    "solution": "A causa provável pode ser composta: WAF bloqueando parte das origens, gateway retornando 502 para targets não saudáveis e 504 para backend lento. A correção não é apenas mudar timeout; é padronizar observabilidade, revisar políticas, health checks, limites e dependências.",
    "expectedOutcome": "O aluno terá um runbook defensivo para diagnosticar falhas HTTP/HTTPS com evidências e correlação ponta a ponta."
  },
  "mentorQuestions": [
    "Qual componente gerou o status code observado: cliente, WAF, gateway, aplicação ou dependência?",
    "Que evidência prova que a requisição chegou ou não chegou ao backend?",
    "O erro é de conectividade, TLS, HTTP, autenticação, autorização, roteamento de proxy, backend ou performance?"
  ],
  "quiz": [
    {
      "question": "Por que status code sozinho não basta para causa raiz?",
      "options": [
        "Porque ele não informa necessariamente qual componente gerou a resposta",
        "Porque status codes são aleatórios",
        "Porque HTTP não usa status codes",
        "Porque curl ignora status codes"
      ],
      "answer": 0,
      "explanation": "O mesmo status pode ser gerado por camadas diferentes, como WAF, gateway ou backend."
    },
    {
      "question": "Qual ferramenta é mais adequada para ver waterfall, cache, cookies, CORS e timing no navegador?",
      "options": [
        "DevTools Network",
        "route print",
        "show arp",
        "ip neigh"
      ],
      "answer": 0,
      "explanation": "DevTools mostra detalhes do comportamento do navegador e da requisição HTTP."
    },
    {
      "question": "O que um 504 normalmente sugere?",
      "options": [
        "Timeout em gateway/proxy esperando upstream",
        "DNS inexistente obrigatoriamente",
        "Certificado expirado sempre",
        "Porta UDP fechada"
      ],
      "answer": 0,
      "explanation": "504 é Gateway Timeout, geralmente associado a um intermediário aguardando upstream."
    },
    {
      "question": "Qual header ajuda a correlacionar logs entre borda e backend?",
      "options": [
        "X-Request-ID",
        "Content-Length",
        "Accept-Language",
        "User-Agent apenas"
      ],
      "answer": 0,
      "explanation": "Request IDs/correlation IDs permitem seguir uma requisição entre componentes."
    },
    {
      "question": "Qual comando ajuda a medir DNS, connect, TLS, TTFB e total em curl?",
      "options": [
        "curl -w",
        "arp -a",
        "show vlan brief",
        "ipconfig /flushdns"
      ],
      "answer": 0,
      "explanation": "A opção -w do curl imprime métricas temporais úteis."
    },
    {
      "question": "Qual prática é insegura ao compartilhar evidências HTTP?",
      "options": [
        "Enviar cookies e tokens reais em prints",
        "Mascarar Authorization",
        "Remover dados pessoais",
        "Compartilhar request ID não sensível"
      ],
      "answer": 0,
      "explanation": "Cookies e tokens podem permitir sequestro de sessão ou abuso de credenciais."
    }
  ],
  "flashcards": [
    {
      "front": "O que curl mostra bem?",
      "back": "Status, headers, TLS, redirects, tempos e comportamento HTTP reproduzível."
    },
    {
      "front": "O que DevTools mostra bem?",
      "back": "Waterfall, cache, cookies, CORS, redirects, headers, payload e timing do navegador."
    },
    {
      "front": "O que logs mostram?",
      "back": "Qual componente recebeu, bloqueou, encaminhou ou respondeu à requisição."
    },
    {
      "front": "O que traces mostram?",
      "back": "Caminho interno da requisição, spans, latência e dependências chamadas."
    },
    {
      "front": "O que é X-Request-ID?",
      "back": "Identificador de correlação para seguir uma requisição entre camadas."
    },
    {
      "front": "Por que sanitizar evidências?",
      "back": "Para não vazar tokens, cookies, dados pessoais, IPs internos ou payloads sensíveis."
    }
  ],
  "exercises": [
    {
      "title": "Classifique o erro",
      "prompt": "Explique três causas possíveis para um 502 em uma arquitetura com WAF, load balancer e backend.",
      "expectedAnswer": "Upstream fechado, backend indisponível, TLS interno falhando, health check/pool incorreto ou proxy sem resposta válida."
    },
    {
      "title": "Monte comando curl",
      "prompt": "Escreva um comando curl para ver headers, seguir redirects e imprimir tempo total e status code.",
      "expectedAnswer": "curl -vL -w 'total=%{time_total} code=%{http_code}\n' https://exemplo.com"
    },
    {
      "title": "Correlacione logs",
      "prompt": "Liste quais logs você consultaria para uma API atrás de WAF e API Gateway.",
      "expectedAnswer": "Logs de DNS/CDN se houver, WAF, API Gateway, load balancer, aplicação, dependências, APM/traces e SIEM."
    },
    {
      "title": "Sanitize evidências",
      "prompt": "Quais campos você removeria antes de compartilhar uma captura HTTP?",
      "expectedAnswer": "Authorization, Cookie, Set-Cookie, tokens, dados pessoais, payload sensível, IPs internos se necessário e IDs sigilosos."
    }
  ],
  "challenge": {
    "title": "API intermitente com 403, 502 e 504",
    "scenario": "Usuários externos relatam falhas intermitentes em uma API publicada por CDN/WAF, API Gateway e backend Kubernetes. Alguns recebem 403, outros 502 e outros 504. O time de aplicação diz que parte das requisições nem aparece nos logs.",
    "tasks": [
      "Criar hipótese para cada status code.",
      "Definir evidências necessárias no cliente, WAF, gateway, backend e traces.",
      "Montar comandos curl seguros para reproduzir o problema.",
      "Definir quais dados devem ser sanitizados.",
      "Propor correção estrutural para melhorar diagnósticos futuros."
    ],
    "rubric": [
      "Diferencia 403, 502 e 504 por componente gerador.",
      "Usa request ID e logs por camada.",
      "Inclui TLS/SNI, headers, origem e método na análise.",
      "Evita expor tokens/cookies/payloads.",
      "Propõe observabilidade e runbook reutilizável."
    ]
  },
  "commentedSolution": {
    "summary": "A investigação deve separar bloqueios de segurança, falhas de upstream e timeouts.",
    "steps": [
      "Para 403, verificar WAF, API Gateway, autenticação, autorização, IP reputation, método e headers.",
      "Para 502, verificar se gateway recebeu resposta válida do upstream, health checks, porta, TLS interno e logs do backend.",
      "Para 504, verificar timeouts, latência de backend, dependências, filas e limites de gateway.",
      "Comparar request IDs: se não aparece no backend, erro ocorreu antes dele.",
      "Usar traces para ver se a requisição chegou à aplicação e onde consumiu tempo.",
      "Criar política de logs padronizada com request ID, upstream status, latência, backend escolhido e motivo de bloqueio."
    ],
    "finalAnswer": "A causa provável pode ser composta: WAF bloqueando parte das origens, gateway retornando 502 para targets não saudáveis e 504 para backend lento. A correção não é apenas mudar timeout; é padronizar observabilidade, revisar políticas, health checks, limites e dependências."
  },
  "glossary": [
    {
      "term": "curl",
      "definition": "Ferramenta de linha de comando para fazer requisições HTTP/HTTPS e observar detalhes de conexão e resposta."
    },
    {
      "term": "DevTools",
      "definition": "Ferramentas do navegador para inspecionar rede, console, armazenamento, cookies, cache e performance."
    },
    {
      "term": "Request ID",
      "definition": "Identificador usado para correlacionar uma requisição entre sistemas."
    },
    {
      "term": "Trace",
      "definition": "Representação distribuída do caminho de uma requisição por serviços e dependências."
    },
    {
      "term": "Upstream",
      "definition": "Servidor ou serviço para o qual um proxy/gateway encaminha uma requisição."
    },
    {
      "term": "TTFB",
      "definition": "Time To First Byte: tempo até o cliente receber o primeiro byte da resposta."
    }
  ],
  "references": [
    {
      "title": "RFC 9110 — HTTP Semantics",
      "type": "standard",
      "note": "Base conceitual moderna para semântica HTTP."
    },
    {
      "title": "Documentação curl",
      "type": "documentation",
      "note": "Referência para opções de diagnóstico HTTP."
    },
    {
      "title": "W3C Trace Context",
      "type": "standard",
      "note": "Padrão para propagação de contexto de traces distribuídos."
    },
    {
      "title": "OWASP Logging Cheat Sheet",
      "type": "security",
      "note": "Boas práticas de logs seguros."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e pipelines",
      "reason": "Logs, métricas, traces e smoke tests são integrados ao ciclo de entrega."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Tokens e autenticação",
      "reason": "Muitos erros HTTP envolvem autenticação, autorização, cookies, JWT e OIDC."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "readContent",
      "passQuiz",
      "completeLab",
      "submitChallenge"
    ],
    "minimumQuizScore": 70,
    "minimumLabStepsCompleted": 7,
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
      "8.9"
    ]
  }
};
