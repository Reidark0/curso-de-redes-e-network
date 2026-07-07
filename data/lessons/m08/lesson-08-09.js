export const lesson0809 = {
  "id": "8.9",
  "moduleId": "m08",
  "order": 9,
  "title": "Segurança HTTP: headers, CORS, exposição e hardening",
  "subtitle": "Aprenda a endurecer aplicações HTTP/HTTPS com headers de segurança, CORS restrito, TLS adequado, cookies seguros, WAF, gateways, logs, redução de exposição e validação defensiva.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "redes",
    "http",
    "https",
    "segurança",
    "headers",
    "cors",
    "tls",
    "waf",
    "api-gateway",
    "hardening",
    "cookies",
    "devsecops",
    "cloud"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.1",
      "title": "Por que HTTP existe",
      "reason": "É necessário entender o papel do HTTP antes de endurecê-lo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.2",
      "title": "Requisições e respostas: métodos, URLs, headers, body e status codes",
      "reason": "Headers, métodos, status e body são o centro dos controles HTTP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.3",
      "title": "HTTPS, TLS, certificados, SNI e cadeia de confiança",
      "reason": "Hardening HTTP depende de TLS correto e certificado confiável."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.4",
      "title": "Cookies, sessões, tokens e estado em aplicações web",
      "reason": "Muitos controles HTTP protegem sessão, tokens e estado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.5",
      "title": "Proxies, reverse proxies, WAFs e load balancers HTTP",
      "reason": "Grande parte dos controles de borda vive em proxies, WAFs e gateways."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.8",
      "title": "Troubleshooting HTTP com curl, navegador, logs e traces",
      "reason": "Validar segurança HTTP exige coletar evidências com método."
    }
  ],
  "objectives": [
    "Explicar por que segurança HTTP vai além de usar HTTPS.",
    "Identificar headers de segurança e o risco que cada um reduz.",
    "Diferenciar CORS, Same-Origin Policy, autenticação e autorização.",
    "Avaliar exposição de serviços HTTP, backends, métodos, cookies, TLS e logs.",
    "Relacionar WAF, API Gateway, load balancer, reverse proxy e backend privado em uma arquitetura segura.",
    "Criar um checklist defensivo de hardening HTTP para ambientes corporativos e cloud."
  ],
  "learningOutcomes": [
    "Ler respostas HTTP e identificar headers de segurança ausentes ou mal configurados.",
    "Explicar por que CORS permissivo pode ser perigoso quando combinado com credenciais.",
    "Validar cookies com flags Secure, HttpOnly e SameSite.",
    "Reconhecer riscos de backend público, métodos desnecessários, TLS fraco e logs sensíveis.",
    "Montar uma matriz de hardening HTTP com dono, evidência, risco, correção e validação."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  \n  <p>Depois de entender como HTTP funciona, como HTTPS protege a comunicação, como proxies publicam aplicações e como diagnosticar falhas, chega o momento de responder uma pergunta essencial: <strong>como reduzir a superfície de ataque de uma aplicação HTTP/HTTPS?</strong></p>\n  <p>Aplicações web são portas de entrada naturais para usuários, integrações, APIs, automações e parceiros. Isso também as torna alvos frequentes. Uma API exposta com CORS permissivo, cookies sem flags, TLS fraco, headers ausentes, métodos perigosos ou backend acessível diretamente pode transformar um problema pequeno em incidente corporativo.</p>\n  <div class='callout'><strong>Ideia central:</strong> segurança HTTP não é apenas “usar HTTPS”. É controlar exposição, identidade, origem, métodos, headers, cache, cookies, logs, WAF, gateway e comportamento da aplicação.</div>\n\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  \n  <p>A Web nasceu simples: documentos, links e requisições HTTP. Conforme navegadores ganharam scripts, cookies, APIs, sessões, SPAs, integrações entre origens e aplicações distribuídas, o navegador virou uma plataforma de execução complexa.</p>\n  <p>Essa evolução trouxe mecanismos defensivos: Same-Origin Policy, CORS, cookies com <code>HttpOnly</code>, <code>Secure</code> e <code>SameSite</code>, headers como HSTS, CSP e X-Frame-Options, além de WAFs, API gateways, rate limiting e observabilidade.</p>\n  <p>O problema é que muitos ambientes corporativos cresceram por adição: uma exceção no firewall aqui, um CNAME temporário ali, um backend publicado direto, uma política CORS ampla para “resolver rápido”, um header removido por proxy, um certificado wildcard sem governança. Segurança HTTP moderna existe para organizar essa complexidade.</p>\n\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  \n  <p>HTTP é flexível demais para ser seguro por padrão. Qualquer cliente pode enviar headers arbitrários, métodos inesperados, payloads grandes, origens diferentes, cookies antigos, tokens vazados e requisições em alto volume. Além disso, proxies e gateways podem reescrever headers, esconder o IP real, terminar TLS, cachear respostas indevidas ou encaminhar tráfego para backends expostos.</p>\n  <p>Em segurança, o erro comum é enxergar apenas uma camada. O time de rede vê porta 443 liberada. O time de aplicação vê login funcionando. O time de cloud vê security group restrito. Mas o atacante procura o conjunto: endpoint legado, CORS permissivo, cabeçalho ausente, cache incorreto, token em log, método perigoso, backend direto, rate limit ausente ou TLS fraco.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> uma aplicação pode estar “funcionando” e ainda assim estar mal publicada, mal endurecida, mal observada e com controles HTTP insuficientes.</div>\n\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  \n  <table class='comparison-table'><thead><tr><th>Fase</th><th>Defesa comum</th><th>Limitação</th><th>Evolução necessária</th></tr></thead><tbody>\n  <tr><td>HTTP simples</td><td>Servidor web exposto</td><td>Sem criptografia e poucos controles</td><td>HTTPS e hardening básico</td></tr>\n  <tr><td>Aplicações com sessão</td><td>Cookies e login</td><td>Roubo de sessão, CSRF e XSS</td><td>Flags de cookie, SameSite, CSP e validação</td></tr>\n  <tr><td>APIs</td><td>Bearer token/API key</td><td>Tokens vazados, abuso e autorização fraca</td><td>Escopos, rate limit, logs e contratos</td></tr>\n  <tr><td>Cloud e borda</td><td>Load balancer e WAF</td><td>Bypass, headers falsos e backend direto</td><td>Zero Trust, gateway, private backend e SIEM</td></tr>\n  </tbody></table>\n  <p>A maturidade de segurança HTTP vem da combinação de controles no navegador, no protocolo, na borda, no gateway, na aplicação, no pipeline e na observabilidade.</p>\n\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  \n  <p><strong>Segurança HTTP</strong> é o conjunto de práticas para reduzir riscos em aplicações e APIs publicadas por HTTP/HTTPS, controlando quem acessa, de onde acessa, por qual método, com quais headers, por qual origem, com quais credenciais, sob quais políticas de cache, TLS, logs e rate limit.</p>\n  <p>Headers de segurança instruem o navegador; CORS controla quais origens podem ler respostas; WAF e gateways filtram padrões de ataque; TLS protege transporte; cookies seguros reduzem roubo de sessão; rate limiting reduz abuso; logs e traces permitem investigação; hardening reduz comportamento desnecessário.</p>\n  <div class='definition-box'>Hardening HTTP é transformar uma publicação “funcional” em uma publicação controlada, observável, mínima, auditável e resistente a abuso.</div>\n\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  \n  <p>Uma requisição HTTP segura passa por decisões em várias camadas. O DNS leva o cliente à borda. O TLS valida identidade e negocia criptografia. O WAF/API gateway pode aplicar políticas. O reverse proxy encaminha para o backend. A aplicação valida autenticação, autorização, método, payload, origem e sessão.</p>\n  <ol class='flow-list'>\n    <li>Cliente resolve o nome e acessa HTTPS.</li>\n    <li>TLS valida certificado, SNI, versão e cadeia de confiança.</li>\n    <li>Borda aplica política de exposição, WAF, rate limit e georregras quando existirem.</li>\n    <li>Gateway valida método, path, autenticação, token, escopos e contrato.</li>\n    <li>Aplicação aplica autorização de objeto, validação de entrada, CSRF, sessão e regras de negócio.</li>\n    <li>Resposta inclui headers de segurança, cache adequado e logs com request ID.</li>\n  </ol>\n  <p>Headers como <code>Strict-Transport-Security</code>, <code>Content-Security-Policy</code>, <code>X-Content-Type-Options</code>, <code>Referrer-Policy</code> e <code>Permissions-Policy</code> não substituem validação no servidor, mas reduzem classes importantes de abuso no navegador.</p>\n\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  \n  <p>Uma arquitetura HTTP defensiva separa a superfície pública da aplicação real. O cliente acessa CDN/WAF/load balancer/API gateway. O backend fica em rede privada, sem acesso direto da Internet. O gateway propaga request ID, aplica autenticação, registra logs e encaminha apenas fluxos esperados.</p>\n  <p>Em ambientes maduros, a política HTTP é tratada como código: TLS mínimo, headers obrigatórios, CORS restrito, métodos permitidos, rate limit, autenticação, WAF, logs, traces e testes de segurança em pipeline. Assim, uma mudança de aplicação não publica acidentalmente um endpoint inseguro.</p>\n  <table class='data-table'><thead><tr><th>Controle</th><th>Onde atua</th><th>O que reduz</th></tr></thead><tbody>\n  <tr><td>TLS/HSTS</td><td>Transporte e navegador</td><td>Downgrade, interceptação e uso acidental de HTTP</td></tr>\n  <tr><td>CSP</td><td>Navegador</td><td>Impacto de XSS e carregamento de fontes não autorizadas</td></tr>\n  <tr><td>CORS restrito</td><td>Navegador/API</td><td>Leitura indevida por origens não autorizadas</td></tr>\n  <tr><td>WAF/API Gateway</td><td>Borda</td><td>Abuso, payloads suspeitos, rate excessivo e endpoints indevidos</td></tr>\n  <tr><td>Logs/traces</td><td>Operação e segurança</td><td>Baixa visibilidade e resposta lenta</td></tr>\n  </tbody></table>\n\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  \n  <p>Imagine um prédio corporativo. HTTPS é a comunicação protegida com a recepção. O WAF é a triagem de segurança. O API gateway é a mesa que confere crachá, autorização e destino. O backend é a sala interna que não deveria ter porta direta para a rua.</p>\n  <p>Headers de segurança são as instruções dadas aos visitantes: não entregue dados a terceiros, não abra janelas desconhecidas, não carregue objetos de qualquer lugar, não reutilize credenciais fora do ambiente correto. CORS é a regra que define quais empresas externas podem ler determinadas respostas.</p>\n  <div class='callout callout--warning'><strong>Limite da analogia:</strong> no HTTP, clientes podem falsificar muitos headers. Por isso, controles críticos devem ser aplicados no servidor, na borda e na aplicação, não apenas confiando no que o cliente declara.</div>\n\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  \n  <p>Um site de teste está publicado em <code>https://app.exemplo.local</code>. Ele responde <code>200 OK</code>, mas não envia HSTS, não define <code>HttpOnly</code> no cookie de sessão e permite <code>Access-Control-Allow-Origin: *</code> mesmo usando credenciais.</p>\n  <p>Do ponto de vista funcional, o site “abre”. Do ponto de vista defensivo, há problemas: cookies podem ser mais expostos a scripts, o navegador não é instruído a preferir HTTPS, e CORS permissivo pode permitir leitura indevida em cenários perigosos.</p>\n\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  \n  <p>Uma empresa publica um portal interno para parceiros. O tráfego entra por WAF, passa por API gateway e chega a backends privados. A política exige TLS moderno, headers de segurança, CORS apenas para domínios autorizados, autenticação via IdP, rate limit por cliente, logs no SIEM e trace para troubleshooting.</p>\n  <p>O hardening não é opcional: cada endpoint precisa ter dono, justificativa, método permitido, escopo necessário, classificação de dados, logs e prazo de revisão. Sem isso, APIs antigas continuam expostas sem visibilidade.</p>\n\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  \n  <p>Em cloud, aplicações HTTP normalmente passam por CDN, WAF gerenciado, Application Load Balancer, API Gateway, ingress controller ou service mesh. Esses componentes podem terminar TLS, inserir headers, aplicar rate limit, registrar logs e encaminhar para sub-redes privadas.</p>\n  <p>O erro comum é proteger a borda, mas deixar o backend acessível por IP público ou security group amplo. O desenho correto reduz caminhos: cliente externo acessa somente a borda, e backends aceitam tráfego apenas do load balancer/gateway esperado.</p>\n\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  \n  <p>Em DevSecOps, hardening HTTP deve entrar no pipeline. A cada pull request, políticas podem validar headers obrigatórios, ausência de endpoints administrativos públicos, CORS restrito, OpenAPI atualizado, TLS mínimo, autenticação exigida e logs estruturados.</p>\n  <p>Com policy as code, a publicação insegura deixa de depender apenas de revisão manual. Um Ingress sem TLS, um security group com <code>0.0.0.0/0</code> para porta administrativa ou um CORS com wildcard pode bloquear o deploy antes de chegar à produção.</p>\n\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  \n  <p>Um time de segurança analisa uma aplicação exposta. O checklist encontra: <code>Server</code> revelando versão, ausência de HSTS, cookie sem <code>SameSite</code>, CORS permitindo origem não autorizada, endpoint <code>/debug</code> acessível, métodos <code>PUT</code> e <code>DELETE</code> disponíveis sem necessidade e logs com tokens.</p>\n  <p>A correção exige trabalho conjunto: aplicação remove endpoints e valida autorização; plataforma ajusta gateway e WAF; cloud restringe backend; segurança define headers mínimos; DevSecOps cria testes para evitar regressão.</p>\n  <div class='callout callout--security'><strong>Visão defensiva:</strong> não faça varreduras ou testes intrusivos em sistemas sem autorização. O objetivo aqui é aprender controles e validação segura em ambiente próprio ou autorizado.</div>\n\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 620' role='img' aria-labelledby='m08l09-title m08l09-desc'>\n    <title id='m08l09-title'>Segurança HTTP com headers, CORS, WAF e hardening</title>\n    <desc id='m08l09-desc'>Fluxo HTTP seguro passando por navegador, DNS, TLS, WAF, API Gateway, backend privado, SIEM e controles de segurança.</desc>\n    <defs>\n      <marker id='m08l09-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path>\n      </marker>\n    </defs>\n    <rect x='40' y='40' width='900' height='540' rx='18' class='svg-zone'></rect>\n    <text x='490' y='78' text-anchor='middle' class='svg-label'>Publicação HTTP/HTTPS endurecida</text>\n\n    <rect x='80' y='150' width='130' height='80' rx='12' class='svg-node svg-node--client'></rect>\n    <text x='145' y='178' text-anchor='middle' class='svg-label'>Navegador</text>\n    <text x='145' y='202' text-anchor='middle' class='svg-label svg-label--small'>CSP • HSTS • CORS</text>\n\n    <rect x='270' y='120' width='140' height='110' rx='12' class='svg-node svg-node--security'></rect>\n    <text x='340' y='150' text-anchor='middle' class='svg-label'>WAF/CDN</text>\n    <text x='340' y='174' text-anchor='middle' class='svg-label svg-label--small'>rate limit</text>\n    <text x='340' y='198' text-anchor='middle' class='svg-label svg-label--small'>bloqueios</text>\n\n    <rect x='470' y='120' width='150' height='110' rx='12' class='svg-node svg-node--firewall'></rect>\n    <text x='545' y='150' text-anchor='middle' class='svg-label'>API Gateway</text>\n    <text x='545' y='174' text-anchor='middle' class='svg-label svg-label--small'>auth • escopos</text>\n    <text x='545' y='198' text-anchor='middle' class='svg-label svg-label--small'>contrato</text>\n\n    <rect x='690' y='140' width='150' height='90' rx='12' class='svg-node svg-node--server'></rect>\n    <text x='765' y='170' text-anchor='middle' class='svg-label'>Backend privado</text>\n    <text x='765' y='194' text-anchor='middle' class='svg-label svg-label--small'>sem acesso direto</text>\n\n    <rect x='270' y='330' width='160' height='90' rx='12' class='svg-node svg-node--cloud'></rect>\n    <text x='350' y='360' text-anchor='middle' class='svg-label'>TLS</text>\n    <text x='350' y='384' text-anchor='middle' class='svg-label svg-label--small'>SNI • certificado</text>\n\n    <rect x='500' y='330' width='160' height='90' rx='12' class='svg-node svg-node--security'></rect>\n    <text x='580' y='360' text-anchor='middle' class='svg-label'>Headers</text>\n    <text x='580' y='384' text-anchor='middle' class='svg-label svg-label--small'>HSTS • CSP • X-CTO</text>\n\n    <rect x='720' y='330' width='150' height='90' rx='12' class='svg-node svg-node--server'></rect>\n    <text x='795' y='360' text-anchor='middle' class='svg-label'>SIEM/APM</text>\n    <text x='795' y='384' text-anchor='middle' class='svg-label svg-label--small'>logs • traces</text>\n\n    <line x1='210' y1='190' x2='270' y2='175' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l09-arrow)'></line>\n    <line x1='410' y1='175' x2='470' y2='175' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l09-arrow)'></line>\n    <line x1='620' y1='175' x2='690' y2='185' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l09-arrow)'></line>\n    <line x1='765' y1='230' x2='795' y2='330' class='svg-flow svg-flow--response' marker-end='url(#m08l09-arrow)'></line>\n    <line x1='545' y1='230' x2='580' y2='330' class='svg-flow svg-flow--response' marker-end='url(#m08l09-arrow)'></line>\n    <line x1='340' y1='230' x2='350' y2='330' class='svg-flow svg-flow--response' marker-end='url(#m08l09-arrow)'></line>\n\n    <text x='490' y='500' text-anchor='middle' class='svg-label'>Controles devem ser aplicados na borda, no gateway, no backend, no navegador e nos logs</text>\n    <text x='490' y='530' text-anchor='middle' class='svg-label svg-label--small'>Nenhum header compensa backend exposto, autorização fraca ou ausência de logs</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  \n  <p>Neste laboratório você vai avaliar defensivamente uma publicação HTTP/HTTPS. A atividade não exige exploração ofensiva: você coletará headers, TLS, CORS, métodos, cookies, exposição de backend, logs e evidências sanitizadas, criando um plano de hardening.</p>\n\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  \n  <p>Os exercícios treinam leitura de headers, avaliação de CORS, identificação de exposição, interpretação de cookies, análise de TLS e construção de uma matriz de hardening HTTP.</p>\n\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  \n  <p>Você receberá um cenário de API exposta com frontend público, backend em cloud, WAF parcial, cookies frágeis e CORS amplo. Seu desafio é criar um plano de correção priorizado por risco.</p>\n\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  \n  <p>A solução comentada mostra como separar achados cosméticos de riscos reais: backend público, token em log, CORS permissivo com credenciais, cookie sem proteção, ausência de TLS forte, rate limit inexistente e headers ausentes.</p>\n\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  \n  <p>Segurança HTTP exige mais do que HTTPS. É preciso controlar exposição, headers, CORS, cookies, métodos, autenticação, autorização, TLS, logs, WAF, API gateway e acesso ao backend.</p>\n  <p>Headers de segurança reduzem riscos no navegador. CORS controla leitura entre origens. WAF e gateway reduzem abuso na borda. Hardening de backend e rede impedem bypass. Logs e traces tornam investigação possível.</p>\n\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  \n  <p>Na próxima aula você fará a revisão prática do módulo: publicar e diagnosticar uma API segura, integrando HTTP, HTTPS, TLS, cookies, proxies, WAF, APIs, troubleshooting e hardening.</p>\n\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "HTTP",
      "HTTPS",
      "Segurança",
      "WAF",
      "API Gateway",
      "DevSecOps"
    ],
    "beforeThisLesson": "O aluno já entende HTTP, TLS, cookies, proxies, APIs, performance e troubleshooting HTTP.",
    "afterThisLesson": "O aluno consegue avaliar defensivamente uma publicação HTTP/HTTPS e propor hardening com evidências.",
    "dependsOn": [
      "DNS",
      "TCP",
      "TLS",
      "HTTP",
      "Cookies",
      "CORS",
      "Proxy",
      "WAF",
      "API Gateway",
      "Logs",
      "SIEM",
      "Cloud"
    ]
  },
  "protocolFields": [
    {
      "field": "Strict-Transport-Security",
      "meaning": "Instrui o navegador a usar HTTPS para o domínio durante um período.",
      "securityNote": "Reduz downgrade e uso acidental de HTTP; deve ser implantado com cuidado, especialmente com includeSubDomains."
    },
    {
      "field": "Content-Security-Policy",
      "meaning": "Define fontes permitidas para scripts, estilos, imagens, frames e conexões.",
      "securityNote": "Reduz impacto de XSS, mas não substitui correção de vulnerabilidades."
    },
    {
      "field": "Access-Control-Allow-Origin",
      "meaning": "Indica quais origens podem ler respostas cross-origin no navegador.",
      "securityNote": "Wildcard ou reflexão indevida de Origin pode expor dados quando combinado com credenciais."
    },
    {
      "field": "Set-Cookie",
      "meaning": "Cria ou altera cookies no navegador.",
      "securityNote": "Cookies de sessão devem usar Secure, HttpOnly, SameSite adequado, escopo mínimo de Domain/Path e expiração coerente."
    },
    {
      "field": "X-Content-Type-Options",
      "meaning": "Evita interpretação de conteúdo fora do tipo declarado quando usa nosniff.",
      "securityNote": "Reduz abuso por MIME sniffing."
    },
    {
      "field": "Referrer-Policy",
      "meaning": "Controla quanto da URL de origem é enviado como Referer.",
      "securityNote": "Evita vazamento de paths, tokens ou parâmetros sensíveis."
    },
    {
      "field": "Permissions-Policy",
      "meaning": "Controla APIs do navegador como câmera, microfone, geolocalização e sensores.",
      "securityNote": "Reduz abuso de recursos do navegador por páginas ou iframes."
    }
  ],
  "packetFlow": [
    "Cliente resolve DNS e acessa a URL via HTTPS.",
    "TLS valida certificado, SNI, cadeia e versão negociada.",
    "CDN/WAF aplica políticas de borda, bloqueio, rate limit e inspeção.",
    "API Gateway valida método, path, autenticação, escopos, CORS e contrato quando configurado.",
    "Backend processa autorização, sessão, validação de entrada e regra de negócio.",
    "Resposta retorna status, headers de segurança, cookies e políticas de cache.",
    "Logs e traces registram request ID, origem, decisão do WAF/gateway, status, latência e usuário quando aplicável.",
    "Equipe valida se o backend está privado e se não existe caminho de bypass da borda."
  ],
  "deepDive": {
    "title": "CORS não é autenticação e headers não são autorização",
    "content": "CORS é um controle do navegador que decide se uma página em uma origem pode ler a resposta de outra origem. Ele não impede que clientes não-navegador façam requisições, não substitui autenticação e não corrige autorização fraca. Da mesma forma, headers de segurança ajudam o navegador a se comportar de forma mais segura, mas não impedem backend público, regra de firewall ampla, BOLA/IDOR, token em log ou ausência de validação no servidor.",
    "securityAngle": "Em revisão defensiva, trate CORS, headers, TLS, WAF, autenticação e autorização como camadas complementares. Nenhuma delas resolve tudo sozinha.",
    "operationalImpact": [
      "Hardening HTTP exige inventário de aplicações, testes de regressão e governança de exceções.",
      "CSP, CORS e cookies podem quebrar frontend se aplicados sem mapeamento.",
      "Borda, WAF, CDN e backend precisam estar alinhados para evitar bypass."
    ],
    "financialImpact": [
      "WAF/CDN, SIEM, scanners e testes de regressão têm custo recorrente.",
      "Headers mal aplicados podem gerar indisponibilidade e retrabalho de desenvolvimento.",
      "Coleta de evidências e logs aumenta armazenamento, mas reduz tempo de investigação."
    ],
    "securityImpact": [
      "Headers reduzem risco no navegador, mas não substituem autorização no servidor.",
      "CORS permissivo com credenciais amplia exposição de dados.",
      "Exposição direta de backend pode contornar WAF, rate limit e políticas de borda."
    ]
  },
  "commonMistakes": [
    "Achar que HTTPS sozinho torna a aplicação segura.",
    "Usar Access-Control-Allow-Origin: * sem entender dados, credenciais e origens confiáveis.",
    "Deixar backend acessível diretamente por IP público, contornando WAF ou gateway.",
    "Configurar cookies de sessão sem Secure, HttpOnly ou SameSite apropriado.",
    "Expor métodos desnecessários como PUT, DELETE ou OPTIONS sem controle.",
    "Registrar Authorization, cookies ou tokens em logs de proxy e aplicação.",
    "Aplicar headers de segurança apenas no frontend e esquecer APIs.",
    "Aceitar --insecure, TLS legado ou certificado inválido como solução permanente.",
    "Confiar em X-Forwarded-For vindo diretamente do cliente sem normalização na borda."
  ],
  "troubleshooting": {
    "method": "Validação defensiva de publicação HTTP/HTTPS com foco em exposição, headers, CORS, TLS, cookies, logs e bypass.",
    "steps": [
      "Identificar domínio, endpoint, método, ambiente, dono e classificação de dados.",
      "Validar DNS, IP público, borda esperada e ausência de backend exposto diretamente.",
      "Validar TLS, certificado, cadeia, SNI, versão e expiração.",
      "Coletar headers de resposta e comparar com baseline corporativo.",
      "Avaliar cookies de sessão e flags de segurança.",
      "Testar CORS de forma controlada com origens esperadas e não esperadas.",
      "Verificar métodos permitidos e comportamento de OPTIONS/preflight.",
      "Confirmar WAF/API Gateway/rate limit/logs e propagação de request ID.",
      "Sanitizar tokens, cookies e dados sensíveis antes de compartilhar evidências.",
      "Registrar risco, evidência, impacto, correção, dono e validação pós-correção."
    ],
    "commands": [
      {
        "platform": "Linux/Windows",
        "command": "curl -s -D - -o /dev/null https://example.com/",
        "purpose": "Coletar headers.",
        "expectedObservation": "Headers de resposta.",
        "interpretation": "Base para análise de hardening."
      },
      {
        "platform": "Linux/macOS",
        "command": "openssl s_client -connect example.com:443 -servername example.com </dev/null",
        "purpose": "Validar TLS/SNI.",
        "expectedObservation": "Verify return code e certificado.",
        "interpretation": "TLS inválido deve ser resolvido antes de política HTTP."
      },
      {
        "platform": "Linux/Windows",
        "command": "curl -i -X OPTIONS https://example.com/ -H \"Origin: https://app.exemplo.local\" -H \"Access-Control-Request-Method: POST\"",
        "purpose": "Simular preflight CORS.",
        "expectedObservation": "Access-Control-* quando aplicável.",
        "interpretation": "CORS é decisão do navegador sobre leitura de resposta."
      },
      {
        "platform": "Navegador",
        "command": "DevTools > Network/Console",
        "purpose": "Ver violações CSP/CORS reais.",
        "expectedObservation": "Mensagens de bloqueio do navegador.",
        "interpretation": "Curl não reproduz todas as políticas do navegador."
      },
      {
        "platform": "DNS/Borda",
        "command": "dig example.com A && curl -vkI https://example.com/",
        "purpose": "Checar exposição e borda.",
        "expectedObservation": "IP/CNAME e headers esperados.",
        "interpretation": "Divergência pode indicar bypass ou rota errada."
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Segurança HTTP: headers, CORS, exposição e hardening.",
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
        "if": "CORS falha só no navegador",
        "then": "Verificar Origin, preflight, credentials e Access-Control-*."
      },
      {
        "if": "CSP bloqueia recurso legítimo",
        "then": "Usar Report-Only, ajustar fontes e validar regressão."
      },
      {
        "if": "Cookie sem atributos",
        "then": "Aplicar Secure, HttpOnly e SameSite conforme fluxo."
      },
      {
        "if": "HSTS ausente",
        "then": "Validar HTTPS completo e configurar HSTS gradualmente."
      },
      {
        "if": "Backend bypass possível",
        "then": "Restringir firewall/security group para aceitar tráfego só da borda."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter backends privados e acessíveis apenas por load balancer/gateway autorizado.",
      "Exigir TLS moderno, certificado válido, rotação e alerta de expiração.",
      "Aplicar HSTS após validar todos os subdomínios relevantes.",
      "Usar CSP progressivamente, começando em report-only quando necessário.",
      "Restringir CORS a origens conhecidas e evitar wildcard com credenciais.",
      "Configurar cookies de sessão com Secure, HttpOnly, SameSite, Domain e Path mínimos.",
      "Permitir apenas métodos HTTP necessários por endpoint.",
      "Aplicar rate limit, quotas e proteção contra abuso no gateway ou WAF.",
      "Propagar request ID e registrar decisões de WAF/gateway/backend no SIEM.",
      "Validar políticas HTTP em pipeline com testes automatizados e policy as code."
    ],
    "badPractices": [
      "Publicar backend diretamente na Internet e depender apenas de obscuridade.",
      "Usar CORS * por padrão para resolver erro de navegador.",
      "Remover validações TLS ou usar --insecure em scripts permanentes.",
      "Logar Authorization, cookies, JWTs ou payloads sensíveis.",
      "Confiar em headers de origem enviados pelo cliente sem normalização na borda.",
      "Expor endpoint de debug, actuator, métricas ou administração sem autenticação forte.",
      "Deixar métodos perigosos habilitados sem necessidade.",
      "Tratar WAF como substituto de correção na aplicação."
    ],
    "vulnerabilities": [
      {
        "name": "Roubo de sessão por cookie fraco ou XSS.",
        "description": "Risco relacionado à aula 8.9 — Segurança HTTP: headers, CORS, exposição e hardening.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Borda obrigatória com WAF/API Gateway e backends privados."
      },
      {
        "name": "CSRF quando cookies e SameSite são mal configurados.",
        "description": "Risco relacionado à aula 8.9 — Segurança HTTP: headers, CORS, exposição e hardening.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Headers de segurança mínimos com validação automatizada."
      },
      {
        "name": "CORS permissivo expondo respostas sensíveis no navegador.",
        "description": "Risco relacionado à aula 8.9 — Segurança HTTP: headers, CORS, exposição e hardening.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "CORS por allowlist, com revisão e evidência de necessidade."
      },
      {
        "name": "Subdomain takeover por CNAME órfão e publicação abandonada.",
        "description": "Risco relacionado à aula 8.9 — Segurança HTTP: headers, CORS, exposição e hardening.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Cookie hardening e proteção contra CSRF quando aplicável."
      },
      {
        "name": "Backend bypass contornando WAF/API Gateway.",
        "description": "Risco relacionado à aula 8.9 — Segurança HTTP: headers, CORS, exposição e hardening.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Autorização server-side por objeto, ação e escopo."
      },
      {
        "name": "Header spoofing, principalmente X-Forwarded-For e Host.",
        "description": "Risco relacionado à aula 8.9 — Segurança HTTP: headers, CORS, exposição e hardening.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Rate limiting, detecção de abuso e logs de decisão."
      },
      {
        "name": "Informação sensível em logs, headers, mensagens de erro e Referer.",
        "description": "Risco relacionado à aula 8.9 — Segurança HTTP: headers, CORS, exposição e hardening.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Sanitização de logs e mascaramento de segredos."
      },
      {
        "name": "TLS legado, certificado inválido ou cadeia incompleta.",
        "description": "Risco relacionado à aula 8.9 — Segurança HTTP: headers, CORS, exposição e hardening.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Inventário de domínios, subdomínios, CNAMEs e certificados."
      },
      {
        "name": "Rate limit ausente permitindo abuso de login, APIs e scraping.",
        "description": "Risco relacionado à aula 8.9 — Segurança HTTP: headers, CORS, exposição e hardening.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Testes em pipeline e revisão periódica de exposição."
      }
    ],
    "mitigations": [
      "Borda obrigatória com WAF/API Gateway e backends privados.",
      "Headers de segurança mínimos com validação automatizada.",
      "CORS por allowlist, com revisão e evidência de necessidade.",
      "Cookie hardening e proteção contra CSRF quando aplicável.",
      "Autorização server-side por objeto, ação e escopo.",
      "Rate limiting, detecção de abuso e logs de decisão.",
      "Sanitização de logs e mascaramento de segredos.",
      "Inventário de domínios, subdomínios, CNAMEs e certificados.",
      "Testes em pipeline e revisão periódica de exposição."
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
      "Borda obrigatória com WAF/API Gateway e backends privados.",
      "Headers de segurança mínimos com validação automatizada.",
      "CORS por allowlist, com revisão e evidência de necessidade.",
      "Cookie hardening e proteção contra CSRF quando aplicável.",
      "Autorização server-side por objeto, ação e escopo.",
      "Rate limiting, detecção de abuso e logs de decisão.",
      "Sanitização de logs e mascaramento de segredos.",
      "Inventário de domínios, subdomínios, CNAMEs e certificados.",
      "Testes em pipeline e revisão periódica de exposição."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-8.9",
    "title": "Headers, CORS e hardening HTTP com curl",
    "labType": "security",
    "objective": "Coletar e avaliar headers de segurança, política CORS, cookies e sinais de exposição HTTP em escopo autorizado.",
    "scenario": "Uma aplicação foi publicada atrás de proxy/WAF. Segurança pede evidências de HSTS, CSP, cookies, CORS, cache e exposição direta de backend.",
    "topology": "Cliente curl/navegador -> CDN/WAF/proxy autorizado -> aplicação -> relatório defensivo.",
    "architecture": "Headers orientam comportamento do navegador e caches; CORS controla leitura cross-origin no navegador; hardening reduz exposição, mas não substitui autorização no backend.",
    "prerequisites": [
      "Aulas 8.2 e 8.3 revisadas.",
      "Escopo autorizado por dono do sistema.",
      "curl e navegador disponíveis."
    ],
    "tools": [
      "curl",
      "DevTools",
      "openssl",
      "editor de texto",
      "opcional: jq"
    ],
    "estimatedTimeMinutes": 80,
    "cost": "zero",
    "safetyNotes": [
      "Executar somente em domínio próprio, laboratório ou sistema autorizado.",
      "Não explorar falhas; apenas coletar evidências defensivas.",
      "Remover cookies, tokens e dados pessoais do relatório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar escopo autorizado",
        "instruction": "Defina domínio, endpoints, dono, janela, limites e classificação dos dados.",
        "artifact": "Termo de escopo: domínio | endpoints | dono | limite | horário | contato.",
        "expectedOutput": "Escopo claro e auditável.",
        "evidence": "Escopo aprovado.",
        "explanation": "Hardening sem escopo vira teste indevido."
      },
      {
        "number": 2,
        "title": "Coletar headers básicos",
        "instruction": "Colete headers sem body.",
        "command": "curl -s -D - -o /dev/null https://example.com/",
        "expectedOutput": "Status e headers de resposta.",
        "evidence": "Headers sanitizados.",
        "explanation": "A primeira evidência mostra o que o navegador e intermediários recebem."
      },
      {
        "number": 3,
        "title": "Validar TLS e SNI rapidamente",
        "instruction": "Confirme que HTTPS está válido antes de avaliar headers.",
        "command": "openssl s_client -connect example.com:443 -servername example.com </dev/null | grep -E \"Verify return code|subject=|issuer=\"",
        "expectedOutput": "Verify return code e dados de certificado.",
        "evidence": "Resumo TLS/SNI.",
        "explanation": "HSTS não compensa certificado inválido."
      },
      {
        "number": 4,
        "title": "Avaliar headers de segurança",
        "instruction": "Procure HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy e X-Frame-Options.",
        "command": "curl -s -D - -o /dev/null https://example.com/ | grep -Ei \"strict-transport-security|content-security-policy|x-content-type-options|referrer-policy|permissions-policy|x-frame-options\"",
        "expectedOutput": "Headers presentes ou ausência explícita.",
        "evidence": "Tabela header | valor | risco | recomendação.",
        "explanation": "Ausência não é sempre vulnerabilidade crítica, mas precisa de decisão consciente."
      },
      {
        "number": 5,
        "title": "Checar cookies",
        "instruction": "Procure atributos Secure, HttpOnly e SameSite em Set-Cookie.",
        "command": "curl -s -D - -o /dev/null https://example.com/ | grep -Ei \"^set-cookie:\"",
        "expectedOutput": "Cookies e atributos quando existirem.",
        "evidence": "Cookies com valores mascarados e atributos preservados.",
        "explanation": "Valores de cookie devem ser ocultados, atributos devem ser avaliados."
      },
      {
        "number": 6,
        "title": "Simular preflight CORS",
        "instruction": "Envie OPTIONS com Origin e Access-Control-Request-Method em endpoint autorizado.",
        "command": "curl -i -X OPTIONS https://example.com/ \\\n  -H \"Origin: https://app.exemplo.local\" \\\n  -H \"Access-Control-Request-Method: POST\" \\\n  -H \"Access-Control-Request-Headers: authorization,content-type\"",
        "expectedOutput": "Headers Access-Control-* quando CORS for aplicável.",
        "evidence": "Origin usado, método solicitado e Access-Control-* retornados.",
        "explanation": "CORS controla leitura no navegador; não é autenticação."
      },
      {
        "number": 7,
        "title": "Comparar Origin confiável e não confiável",
        "instruction": "Repita com uma origem fictícia não autorizada e compare a resposta.",
        "command": "curl -i -X OPTIONS https://example.com/ \\\n  -H \"Origin: https://origem-nao-confiavel.invalid\" \\\n  -H \"Access-Control-Request-Method: POST\"",
        "expectedOutput": "A origem não confiável não deve receber permissão ampla.",
        "evidence": "Comparação de Access-Control-Allow-Origin.",
        "explanation": "Wildcard combinado com credenciais é sinal de risco."
      },
      {
        "number": 8,
        "title": "Avaliar cache de dados sensíveis",
        "instruction": "Procure Cache-Control, Pragma e Expires em endpoints autenticados ou sensíveis autorizados.",
        "command": "curl -s -D - -o /dev/null https://example.com/ | grep -Ei \"cache-control|pragma|expires\"",
        "expectedOutput": "Headers de cache documentados.",
        "evidence": "Decisão: público, privado, no-store ou max-age.",
        "explanation": "Cache incorreto pode expor dados em navegador, proxy ou CDN."
      },
      {
        "number": 9,
        "title": "Verificar exposição direta de backend",
        "instruction": "Compare headers, certificado e IPs esperados quando houver backend e borda conhecidos.",
        "command": "curl -vkI https://example.com/\ndig example.com A",
        "expectedOutput": "Endpoint passa pela borda esperada.",
        "evidence": "IP/CNAME, headers de borda e observação de backend direto.",
        "explanation": "Bypass de WAF/proxy compromete o modelo de proteção."
      },
      {
        "number": 10,
        "title": "Montar plano de hardening",
        "instruction": "Priorize recomendações por risco, impacto e possibilidade de quebra.",
        "artifact": "Plano: achado | evidência | risco | recomendação | impacto | dono | prioridade.",
        "expectedOutput": "Plano acionável, não checklist cego.",
        "evidence": "Plano final de hardening.",
        "explanation": "Headers podem quebrar funcionalidades; mudança exige teste."
      }
    ],
    "expectedResult": "O aluno entrega relatório de headers, CORS, cookies, TLS, cache e exposição com recomendações priorizadas e evidências sanitizadas.",
    "validation": [
      {
        "check": "Headers coletados",
        "command": "curl -s -D - -o /dev/null https://example.com/",
        "expected": "Status e headers.",
        "ifFails": "Validar URL, proxy e TLS."
      },
      {
        "check": "TLS validado",
        "command": "openssl s_client -connect example.com:443 -servername example.com </dev/null",
        "expected": "Handshake e verify return code.",
        "ifFails": "Corrigir TLS antes de hardening HTTP."
      },
      {
        "check": "Headers de segurança avaliados",
        "command": "grep -Ei \"strict-transport-security|content-security-policy|x-content-type-options|referrer-policy\" headers.txt",
        "expected": "Presentes ou ausência documentada.",
        "ifFails": "Salvar headers em arquivo e repetir."
      },
      {
        "check": "CORS testado",
        "command": "curl -i -X OPTIONS https://example.com/ -H \"Origin: https://app.exemplo.local\" -H \"Access-Control-Request-Method: POST\"",
        "expected": "Access-Control-* coerente quando aplicável.",
        "ifFails": "Confirmar que o endpoint implementa CORS."
      },
      {
        "check": "Cookies sanitizados",
        "method": "Revisão manual",
        "expected": "Valores mascarados e atributos preservados.",
        "ifFails": "Mascarar Set-Cookie antes de compartilhar."
      },
      {
        "check": "Plano priorizado",
        "method": "Revisão do relatório",
        "expected": "Risco, impacto, dono e prioridade.",
        "ifFails": "Converter checklist em plano acionável."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "CORS bloqueia no navegador, mas curl funciona",
        "probableCause": "CORS é política do navegador, não bloqueio de rede.",
        "howToConfirm": "Comparar DevTools Console/Network com curl OPTIONS.",
        "fix": "Ajustar Access-Control-* para origens autorizadas."
      },
      {
        "symptom": "HSTS ausente",
        "probableCause": "Header não configurado na borda ou aplicação.",
        "howToConfirm": "curl -s -D - e navegador.",
        "fix": "Adicionar HSTS após validar HTTPS em todos os subdomínios aplicáveis."
      },
      {
        "symptom": "CSP quebra frontend",
        "probableCause": "Fontes/scripts legítimos não foram mapeados.",
        "howToConfirm": "DevTools Console mostra violações CSP.",
        "fix": "Criar CSP em modo Report-Only antes de enforcement."
      },
      {
        "symptom": "Cookie sem Secure/HttpOnly/SameSite",
        "probableCause": "Configuração fraca de sessão.",
        "howToConfirm": "Set-Cookie em headers.",
        "fix": "Ajustar atributos conforme necessidade funcional."
      },
      {
        "symptom": "Backend acessível fora da borda",
        "probableCause": "DNS/IP ou firewall permite bypass.",
        "howToConfirm": "Comparar IP, Host, certificado e headers.",
        "fix": "Restringir origem ao proxy/WAF e remover exposição direta."
      }
    ],
    "improvements": [
      "Testar CSP Report-Only antes de aplicar bloqueio.",
      "Automatizar coleta de headers em pipeline.",
      "Adicionar baseline por tipo de aplicação: pública, interna, API, admin."
    ],
    "evidenceToCollect": [
      "Escopo autorizado.",
      "Headers completos sanitizados.",
      "Resumo TLS/SNI.",
      "Resultado de CORS para origem confiável e não confiável.",
      "Cookies com valores mascarados.",
      "Cache-Control.",
      "Plano de hardening priorizado."
    ],
    "questions": [
      "Por que CORS não substitui autenticação?",
      "Qual risco de HSTS sem HTTPS consistente?",
      "Por que CSP deve ser testado antes de enforcement?"
    ],
    "challenge": "Crie um relatório executivo e técnico com achados de hardening HTTP, priorizando risco real, impacto operacional e plano de mudança.",
    "solution": "Colete evidências, masque segredos, diferencie risco real de recomendação genérica, proponha mudanças graduais e valide com testes de regressão no navegador e no curl."
  },
  "mentorQuestions": [
    "Qual risco real existe se a aplicação usa HTTPS, mas o backend pode ser acessado diretamente pela Internet?",
    "Por que CORS permissivo não é a mesma coisa que ausência de autenticação, mas ainda pode ser perigoso?",
    "Quais headers você colocaria em um baseline mínimo para APIs e aplicações web?"
  ],
  "quiz": [
    {
      "question": "Qual afirmação sobre CORS está correta?",
      "options": [
        "CORS impede qualquer cliente de chamar a API",
        "CORS controla leitura cross-origin no navegador",
        "CORS substitui autenticação",
        "CORS só existe em HTTP/3"
      ],
      "answer": "CORS controla leitura cross-origin no navegador",
      "explanation": "CORS é aplicado pelo navegador e não substitui autenticação ou autorização server-side."
    },
    {
      "question": "Qual flag ajuda a impedir que JavaScript leia um cookie?",
      "options": [
        "Secure",
        "HttpOnly",
        "SameSite",
        "Path"
      ],
      "answer": "HttpOnly",
      "explanation": "HttpOnly reduz exposição do cookie a scripts no navegador."
    },
    {
      "question": "Qual header força preferência futura por HTTPS no navegador?",
      "options": [
        "HSTS",
        "CORS",
        "Accept",
        "Via"
      ],
      "answer": "HSTS",
      "explanation": "Strict-Transport-Security instrui o navegador a usar HTTPS por um período."
    },
    {
      "question": "Qual risco existe em backend público acessível diretamente?",
      "options": [
        "Melhora o WAF",
        "Contorna controles de borda",
        "Elimina necessidade de TLS",
        "Impede ataques HTTP"
      ],
      "answer": "Contorna controles de borda",
      "explanation": "Backends diretos podem permitir bypass de WAF, gateway, rate limit e logs."
    },
    {
      "question": "Qual prática é perigosa em logs HTTP?",
      "options": [
        "Registrar request ID",
        "Registrar status code",
        "Registrar Authorization Bearer completo",
        "Registrar latência"
      ],
      "answer": "Registrar Authorization Bearer completo",
      "explanation": "Tokens em logs podem permitir replay e comprometimento de sessão ou API."
    },
    {
      "question": "CSP ajuda principalmente contra qual classe de problema?",
      "options": [
        "Roteamento BGP",
        "Impacto de XSS e carregamento indevido de recursos",
        "DHCP rogue",
        "TTL de DNS"
      ],
      "answer": "Impacto de XSS e carregamento indevido de recursos",
      "explanation": "CSP restringe fontes e comportamentos do navegador, reduzindo impacto de XSS."
    }
  ],
  "flashcards": [
    {
      "front": "O que é HSTS?",
      "back": "Header que instrui o navegador a usar HTTPS para o domínio por um tempo definido."
    },
    {
      "front": "O que é CORS?",
      "back": "Mecanismo do navegador que controla se uma origem pode ler resposta de outra origem."
    },
    {
      "front": "O que faz HttpOnly?",
      "back": "Impede que scripts no navegador leiam determinado cookie."
    },
    {
      "front": "O que faz Secure em cookie?",
      "back": "Instrui o navegador a enviar o cookie apenas por HTTPS."
    },
    {
      "front": "Por que backend privado é importante?",
      "back": "Evita bypass de WAF, gateway, rate limit, autenticação de borda e logs centralizados."
    },
    {
      "front": "O que é hardening HTTP?",
      "back": "Redução de superfície HTTP com TLS, headers, CORS, cookies, métodos, logs, gateway, WAF e exposição mínima."
    }
  ],
  "exercises": [
    {
      "title": "Checklist de headers",
      "prompt": "Monte um baseline mínimo de headers para uma aplicação web corporativa e explique o risco reduzido por cada um.",
      "expectedAnswer": "Deve incluir HSTS, CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy e políticas de cache quando aplicável."
    },
    {
      "title": "Análise CORS",
      "prompt": "Explique por que Access-Control-Allow-Origin: * é especialmente problemático em APIs com dados sensíveis.",
      "expectedAnswer": "Porque pode permitir leitura por origens não controladas no navegador, especialmente quando combinado com credenciais ou má validação."
    },
    {
      "title": "Backend exposto",
      "prompt": "Descreva como provar que um backend está contornando o WAF e quais evidências coletar.",
      "expectedAnswer": "Comparar DNS/IP/caminho, headers de borda, logs do WAF, security groups, certificados, resposta direta e ausência de request ID da borda."
    },
    {
      "title": "Cookies seguros",
      "prompt": "Liste flags recomendadas para cookie de sessão e explique cada uma.",
      "expectedAnswer": "Secure, HttpOnly, SameSite adequado, Domain/Path mínimos e expiração coerente."
    },
    {
      "id": "ex8.9.p1-06.1",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de evidências para diferenciar falha de DNS, TCP, TLS, HTTP, gateway e aplicação usando os comandos do laboratório.",
      "expectedAnswer": "A matriz deve incluir comando, evidência esperada, interpretação e próximo passo para cada camada.",
      "explanation": "Troubleshooting profissional evita pular direto para a aplicação quando a falha pode estar em DNS, transporte, TLS ou proxy."
    }
  ],
  "challenge": {
    "title": "Plano de hardening para API corporativa exposta",
    "scenario": "Uma API pública usa HTTPS, mas permite CORS amplo, possui backend com IP público, cookies sem SameSite, logs com Authorization parcial, ausência de HSTS e métodos PUT/DELETE habilitados em endpoints que só deveriam aceitar GET/POST.",
    "tasks": [
      "Classificar os riscos por prioridade.",
      "Definir evidências necessárias.",
      "Propor correções técnicas.",
      "Definir validações pós-correção.",
      "Criar controles preventivos no pipeline."
    ],
    "successCriteria": [
      "Priorizar backend público, token/log e CORS indevido.",
      "Propor restrição de origem, headers, cookies e métodos.",
      "Incluir logs, request ID, WAF/API Gateway e IaC/policy as code.",
      "Não sugerir teste intrusivo sem autorização."
    ]
  },
  "commentedSolution": {
    "summary": "A correção começa fechando o caminho direto ao backend, porque ele pode contornar todos os controles de borda. Depois trata CORS, cookies, logs, métodos e headers. Em paralelo, cria validações automáticas para evitar regressão.",
    "steps": [
      "Restringir backend para aceitar tráfego apenas do load balancer/API Gateway.",
      "Remover tokens de logs e aplicar mascaramento de segredos.",
      "Trocar CORS amplo por allowlist de origens e revisar uso de credenciais.",
      "Configurar cookies com Secure, HttpOnly e SameSite adequado.",
      "Desabilitar métodos desnecessários por endpoint no gateway e na aplicação.",
      "Adicionar HSTS, CSP e demais headers conforme baseline.",
      "Ativar logs de WAF/gateway/backend com request ID e retenção adequada.",
      "Criar testes de CI para headers, CORS, TLS, exposição e contrato de API."
    ],
    "why": "Essa ordem reduz primeiro o maior bypass arquitetural, depois reduz vazamento de credenciais, abuso cross-origin, roubo de sessão, superfície de métodos e regressões futuras."
  },
  "glossary": [
    {
      "term": "HSTS",
      "definition": "Header que instrui o navegador a usar HTTPS para um domínio durante um período."
    },
    {
      "term": "CSP",
      "definition": "Política que restringe fontes e comportamentos de conteúdo carregado pelo navegador."
    },
    {
      "term": "CORS",
      "definition": "Mecanismo do navegador para controlar leitura de respostas entre origens diferentes."
    },
    {
      "term": "SameSite",
      "definition": "Atributo de cookie que controla envio em contextos cross-site."
    },
    {
      "term": "Hardening",
      "definition": "Processo de reduzir superfície de ataque e configurações inseguras."
    },
    {
      "term": "Backend bypass",
      "definition": "Acesso direto a um backend contornando WAF, proxy, gateway ou load balancer esperado."
    }
  ],
  "references": [
    {
      "title": "OWASP Secure Headers Project",
      "type": "referência conceitual",
      "note": "Usado como inspiração para o tema de headers defensivos."
    },
    {
      "title": "OWASP API Security Top 10",
      "type": "referência conceitual",
      "note": "Base conceitual para riscos em APIs, autorização e exposição."
    },
    {
      "title": "MDN Web Docs: HTTP headers, CORS and cookies",
      "type": "referência técnica",
      "note": "Referência geral para semântica de navegador e HTTP."
    },
    {
      "title": "RFC 9110 — HTTP Semantics",
      "type": "standard",
      "organization": "IETF",
      "note": "Semântica HTTP, métodos, status e mensagens."
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
      "reason": "Tokens, escopos, claims e autorização de APIs serão aprofundados na trilha de IAM."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e Policy as Code",
      "reason": "Validação automática de headers, TLS, CORS e exposição pertence ao ciclo DevSecOps."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 8",
      "reason": "Hardening HTTP depende de entender TCP, UDP, portas, NAT e firewalls stateful."
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
      "8.10"
    ]
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
