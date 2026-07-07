export const lesson0804 = {
  "id": "8.4",
  "moduleId": "m08",
  "order": 4,
  "title": "Cookies, sessões, tokens e estado em aplicações web",
  "subtitle": "Entenda como aplicações web mantêm contexto sobre HTTP: cookies, sessões no servidor, tokens, JWT, flags de segurança, CSRF, XSS, SameSite, troubleshooting e arquitetura corporativa.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "redes",
    "http",
    "cookies",
    "sessões",
    "tokens",
    "jwt",
    "autenticação",
    "segurança",
    "csrf",
    "xss",
    "api",
    "devsecops",
    "cloud",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.1",
      "title": "Por que HTTP existe",
      "reason": "Cookies e tokens existem porque HTTP é baseado em requisições independentes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.2",
      "title": "Requisições e respostas: métodos, URLs, headers, body e status codes",
      "reason": "Estado web é transportado principalmente em headers, cookies e bodies."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.3",
      "title": "HTTPS, TLS, certificados, SNI e cadeia de confiança",
      "reason": "Credenciais de sessão e tokens precisam trafegar protegidos por TLS."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.3",
      "title": "TCP: handshake, estado e encerramento",
      "reason": "Estado de aplicação não é o mesmo que estado de conexão TCP."
    }
  ],
  "objectives": [
    "Explicar por que HTTP é originalmente stateless e por que aplicações precisam manter estado.",
    "Diferenciar cookie, sessão server-side, token bearer, JWT, refresh token e API key.",
    "Entender flags de cookie como Secure, HttpOnly, SameSite, Domain, Path, Expires e Max-Age.",
    "Relacionar sessões e tokens com proxies, balanceadores, sticky session, cache, APIs, cloud e DevSecOps.",
    "Reconhecer riscos como roubo de sessão, XSS, CSRF, fixation, replay, vazamento em logs e token sem expiração.",
    "Diagnosticar problemas de login, logout, redirecionamento, cookie bloqueado, CORS, SameSite e TLS."
  ],
  "learningOutcomes": [
    "Ler Set-Cookie e Cookie em requisições e respostas HTTP sem expor segredos reais.",
    "Explicar por que TLS protege o transporte, mas não impede XSS de roubar dados acessíveis ao JavaScript.",
    "Escolher boas flags de cookies para sessão web corporativa.",
    "Diferenciar autenticação, sessão e autorização em uma aplicação web/API.",
    "Montar um runbook de troubleshooting para problemas de sessão atrás de proxy, WAF e load balancer."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>HTTP foi desenhado como um modelo de requisição e resposta. Um cliente pede um recurso, o servidor responde, e a próxima requisição pode chegar como se fosse uma conversa nova. Isso é excelente para simplicidade e escala, mas cria um problema imediato: como o servidor sabe que duas requisições pertencem ao mesmo usuário?</p>\n  <p>Sem algum mecanismo de estado, uma loja virtual esqueceria o carrinho a cada clique, um portal corporativo pediria login em toda página, uma API não saberia quem chamou o endpoint e um sistema de segurança não conseguiria correlacionar ações de uma mesma sessão.</p>\n  <div class='callout'><strong>Ideia central:</strong> cookies, sessões e tokens são formas de transportar ou referenciar contexto entre requisições HTTP independentes.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>A Web inicial era formada por documentos públicos e navegação simples. Conforme aplicações web ganharam login, preferências, carrinhos, permissões, painéis administrativos e integrações, surgiu a necessidade de lembrar contexto entre requisições.</p>\n  <p>Cookies apareceram como um mecanismo simples: o servidor envia pequenos pares nome-valor ao navegador, e o navegador os devolve automaticamente em requisições futuras para o escopo correspondente. Depois, arquiteturas passaram a usar sessões server-side, tokens bearer, JWTs, federação de identidade e mecanismos complementares para APIs e aplicações distribuídas.</p>\n  <p>Hoje, estado web aparece em navegadores, mobile apps, APIs REST, webhooks, SSO corporativo, gateways, WAFs, service mesh e ambientes cloud. Por isso, entender cookies e tokens não é apenas tema de desenvolvimento: é base para Segurança, Redes, IAM, DevSecOps e resposta a incidentes.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema técnico é simples de enunciar: HTTP por si só não carrega memória entre requisições. O servidor recebe <code>GET /painel</code>, depois <code>POST /pedido</code>, depois <code>GET /perfil</code>. Como saber se tudo pertence ao mesmo usuário autenticado?</p>\n  <p>Uma solução ingênua seria enviar usuário e senha em toda requisição. Isso é perigoso e ruim operacionalmente. Outra seria gravar estado no IP de origem, mas NAT, proxies, redes móveis e balanceadores tornam isso impreciso. Cookies e tokens resolvem parte desse problema, mas introduzem riscos: quem rouba um token ou cookie de sessão pode se passar pelo usuário enquanto ele for válido.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> manter estado em HTTP exige identificar o cliente sem transformar credenciais, sessões e tokens em pontos frágeis de segurança.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>A evolução foi de páginas praticamente sem estado para aplicações ricas e distribuídas. Primeiro, cookies eram usados para preferências e sessões simples. Depois, servidores passaram a manter uma tabela de sessão e enviar ao navegador apenas um identificador opaco, como <code>session_id</code>.</p>\n  <p>Com APIs e arquiteturas distribuídas, tokens bearer e JWTs ganharam espaço. Em vez de depender sempre de um estado central no servidor, algumas arquiteturas passaram a usar tokens assinados com claims, escopos e expiração. Com SSO e federação, cookies de sessão de IdPs, authorization codes, access tokens e refresh tokens passaram a fazer parte do fluxo.</p>\n  <p>A evolução trouxe escala e flexibilidade, mas também novos riscos: tokens em localStorage, cookies sem flags, sessões sem rotação, refresh tokens longos demais, logs com Authorization, CORS permissivo, CSRF, XSS e integrações que confundem autenticação com autorização.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>Cookie</strong> é um dado que o servidor pede ao navegador para armazenar e reenviar automaticamente em requisições futuras dentro de um escopo de domínio e caminho. <strong>Sessão</strong> é o contexto associado a um usuário ou interação, muitas vezes guardado no servidor e referenciado por um cookie de sessão. <strong>Token</strong> é uma credencial apresentada pelo cliente para provar uma autorização ou autenticação concedida anteriormente.</p>\n  <div class='definition-box'>Cookie não é sinônimo de sessão. Um cookie pode carregar o identificador de uma sessão, uma preferência ou outro valor. A sessão pode estar no servidor, em um cache distribuído, em um banco ou parcialmente codificada em token assinado.</div>\n  <p>Em termos práticos, cookies aparecem no header <code>Cookie</code> da requisição e são criados/alterados pelo header <code>Set-Cookie</code> na resposta. Tokens bearer normalmente aparecem no header <code>Authorization: Bearer ...</code>, embora também possam aparecer em cookies, o que muda os riscos e controles.</p>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Um fluxo clássico de sessão web começa com uma requisição de login. O servidor valida credenciais, cria uma sessão e responde com <code>Set-Cookie</code>. Nas próximas requisições, o navegador envia o cookie automaticamente, permitindo que o servidor recupere o contexto.</p>\n  <ol class='flow-list'>\n    <li>Cliente acessa a aplicação via HTTPS.</li>\n    <li>Usuário envia credenciais para o endpoint de autenticação.</li>\n    <li>Servidor valida credenciais e cria uma sessão ou emite tokens.</li>\n    <li>Servidor responde com <code>Set-Cookie</code> ou com corpo contendo token.</li>\n    <li>Navegador ou cliente armazena a credencial conforme o mecanismo usado.</li>\n    <li>Requisições futuras enviam <code>Cookie</code> ou <code>Authorization</code>.</li>\n    <li>Backend, gateway ou middleware valida sessão/token e aplica autorização.</li>\n  </ol>\n  <table class='data-table'><thead><tr><th>Mecanismo</th><th>Onde fica o estado?</th><th>Vantagem</th><th>Risco comum</th></tr></thead><tbody><tr><td>Sessão server-side</td><td>Servidor, cache ou banco</td><td>Revogação e controle central mais simples</td><td>Sticky session ou armazenamento compartilhado mal planejado</td></tr><tr><td>Cookie de sessão</td><td>No navegador, referenciando sessão</td><td>Envio automático pelo navegador</td><td>Sem Secure/HttpOnly/SameSite adequado</td></tr><tr><td>JWT</td><td>Token assinado no cliente</td><td>Validação distribuída e interoperável</td><td>Expiração longa, claims excessivos e revogação difícil</td></tr><tr><td>Bearer token</td><td>Cliente apresenta no Authorization</td><td>Comum para APIs</td><td>Quem possui o token consegue usá-lo</td></tr><tr><td>API key</td><td>Segredo estático por cliente/app</td><td>Simples para automação</td><td>Vazamento em código, logs e pipelines</td></tr></tbody></table>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma aplicação simples, o próprio backend autentica o usuário, cria a sessão e valida cookies. Em uma arquitetura corporativa, o caminho pode incluir navegador, CDN, WAF, proxy reverso, load balancer, API gateway, IdP, serviço de sessão, cache distribuído e múltiplos backends.</p>\n  <p>Esse desenho muda decisões operacionais. Se a sessão fica em memória local de um backend, o balanceador talvez precise de sticky session. Se a sessão fica em Redis ou banco compartilhado, qualquer backend pode atender. Se a autenticação usa tokens, o gateway pode validar assinatura antes de encaminhar. Se há SSO, cookies do IdP e cookies da aplicação podem coexistir.</p>\n  <table class='comparison-table'><thead><tr><th>Arquitetura</th><th>Uso comum</th><th>Ponto de atenção</th></tr></thead><tbody><tr><td>Sessão local no backend</td><td>Aplicações pequenas ou legadas</td><td>Escala horizontal e failover difíceis</td></tr><tr><td>Sessão compartilhada</td><td>Clusters web</td><td>Cache/banco de sessão vira dependência crítica</td></tr><tr><td>JWT validado no gateway</td><td>APIs e microserviços</td><td>Revogação, escopos e expiração exigem cuidado</td></tr><tr><td>SSO/OIDC</td><td>Ambiente corporativo</td><td>Separar sessão do IdP, sessão da aplicação e autorização local</td></tr><tr><td>mTLS + token</td><td>Serviço-a-serviço sensível</td><td>Gerenciar certificados e identidade de workload</td></tr></tbody></table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine um prédio corporativo. Na recepção, você mostra documento e recebe um crachá temporário. A cada porta, não precisa mostrar documento completo novamente; apresenta o crachá. O crachá não é sua identidade real, mas é uma prova temporária de que você passou pela recepção.</p>\n  <p>O cookie de sessão é parecido com esse crachá. Se alguém roubar seu crachá, pode tentar entrar como você. Por isso existem validade, foto, catracas, áreas permitidas, logs, bloqueio e recolhimento. Em aplicações web, os equivalentes são expiração, rotação, HttpOnly, Secure, SameSite, escopos, MFA, logout, revogação, logs e detecção de anomalia.</p>\n  <div class='callout'><strong>Limite da analogia:</strong> cookies e tokens podem ser copiados perfeitamente; por isso o controle técnico precisa ser mais rigoroso que um crachá físico.</div>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você acessa <code>https://loja.exemplo/login</code>, envia usuário e senha, e o servidor responde:</p>\n  <pre><code>Set-Cookie: sid=abc123; Path=/; Secure; HttpOnly; SameSite=Lax</code></pre>\n  <p>Nas próximas requisições para aquele domínio e caminho, o navegador envia:</p>\n  <pre><code>Cookie: sid=abc123</code></pre>\n  <p>O servidor usa <code>sid=abc123</code> para buscar a sessão no backend e descobrir que aquele usuário está autenticado. O cookie não precisa conter a senha nem os dados completos do usuário.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa possui um portal interno atrás de WAF e load balancer. O usuário autentica via SSO corporativo. O IdP emite tokens e a aplicação cria sua própria sessão. O WAF registra request ID, o load balancer distribui tráfego, e o backend consulta um Redis de sessões.</p>\n  <p>Quando um usuário relata logout inesperado, a equipe precisa verificar: cookie foi enviado? SameSite bloqueou em redirecionamento? TTL da sessão expirou? O Redis teve failover? O balanceador perdeu sticky session? O proxy removeu header? O domínio do cookie está errado? O relógio dos servidores está correto?</p>\n  <p>Esse exemplo mostra que sessão web é arquitetura, não apenas código. Ela depende de DNS, HTTPS, headers, proxies, tempo, cache, armazenamento, logs e governança.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, sessões e tokens passam por serviços como Application Load Balancer, API Gateway, ingress controller, WAF, identity providers, managed Redis, secret managers e observability stacks. Cookies podem ser usados para afinidade de sessão, enquanto tokens podem ser validados no gateway antes de chegar ao backend.</p>\n  <p>Também existem riscos específicos. Um domínio público pode apontar para um ambiente de homologação que reutiliza cookies. Um WAF pode fazer TLS termination e registrar headers sensíveis. Um API Gateway pode aceitar tokens com issuer errado. Uma função serverless pode gravar Authorization em log por acidente.</p>\n  <div class='callout callout--warning'><strong>Atenção:</strong> cloud facilita publicar aplicações, mas também facilita espalhar fluxos de autenticação sem inventário, sem expiração e sem logs adequados.</div>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em pipelines, tokens aparecem em variáveis de ambiente, secrets, headers Authorization, webhooks e chamadas entre ferramentas. Uma esteira que executa testes de API precisa simular login ou usar token de teste. Se esse token for gravado em log, artifact ou relatório de falha, o pipeline vira fonte de vazamento.</p>\n  <p>Boas práticas incluem mascaramento de secrets, escopos mínimos, expiração curta, rotação automática, ambientes separados, tokens diferentes por finalidade, testes que validem flags de cookies e análise de headers de segurança como parte do CI/CD.</p>\n  <p>Em Kubernetes, ingress, service mesh e API gateways podem validar tokens, injetar headers, remover headers perigosos ou exigir mTLS. Mas isso precisa estar documentado como contrato da plataforma, não como comportamento implícito.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Uma investigação identifica acessos suspeitos ao painel administrativo com cookie válido. A equipe não pode concluir automaticamente que a senha foi roubada: pode ter havido roubo de sessão via XSS, token em log, malware no endpoint, reutilização de refresh token, proxy indevido ou cookie sem proteção.</p>\n  <p>O analista deve correlacionar IP, user-agent, fingerprint, horário, MFA, rotação de sessão, logs de WAF, logs de aplicação, revogação, mudança de privilégio e eventos de IdP. Sessões e tokens são evidências sensíveis: devem ser sanitizados antes de compartilhar em tickets, chats ou relatórios.</p>\n  <div class='callout callout--security'><strong>Defesa:</strong> proteja o canal com TLS, reduza exposição de tokens, aplique flags corretas, use MFA quando adequado, monitore anomalias e tenha capacidade de revogação.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama SVG — cookies, sessão e token</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 620' role='img' aria-labelledby='m08l04-title m08l04-desc'>\n    <title id='m08l04-title'>Fluxo de estado em aplicação web</title>\n    <desc id='m08l04-desc'>Cliente autentica, recebe cookie ou token, passa por WAF e load balancer e acessa backend que valida sessão ou token.</desc>\n    <defs><marker id='m08l04-arrow' markerWidth='10' markerHeight='10' refX='9' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'/></marker></defs>\n    <rect x='30' y='40' width='170' height='90' rx='16' class='svg-node svg-node--client'/>\n    <text x='115' y='82' text-anchor='middle' class='svg-label'>Navegador</text>\n    <text x='115' y='106' text-anchor='middle' class='svg-label svg-label--small'>Cookie / Token</text>\n    <rect x='270' y='40' width='170' height='90' rx='16' class='svg-node svg-node--security'/>\n    <text x='355' y='82' text-anchor='middle' class='svg-label'>WAF / Proxy</text>\n    <text x='355' y='106' text-anchor='middle' class='svg-label svg-label--small'>TLS + logs</text>\n    <rect x='510' y='40' width='170' height='90' rx='16' class='svg-node svg-node--router'/>\n    <text x='595' y='82' text-anchor='middle' class='svg-label'>Load Balancer</text>\n    <text x='595' y='106' text-anchor='middle' class='svg-label svg-label--small'>Sticky opcional</text>\n    <rect x='750' y='40' width='170' height='90' rx='16' class='svg-node svg-node--server'/>\n    <text x='835' y='82' text-anchor='middle' class='svg-label'>Backend</text>\n    <text x='835' y='106' text-anchor='middle' class='svg-label svg-label--small'>Valida sessão</text>\n    <rect x='270' y='260' width='170' height='90' rx='16' class='svg-node svg-node--cloud'/>\n    <text x='355' y='302' text-anchor='middle' class='svg-label'>IdP / SSO</text>\n    <text x='355' y='326' text-anchor='middle' class='svg-label svg-label--small'>Emite tokens</text>\n    <rect x='510' y='260' width='170' height='90' rx='16' class='svg-node svg-node--server'/>\n    <text x='595' y='302' text-anchor='middle' class='svg-label'>Store sessão</text>\n    <text x='595' y='326' text-anchor='middle' class='svg-label svg-label--small'>Redis / DB</text>\n    <rect x='750' y='260' width='170' height='90' rx='16' class='svg-node svg-node--security'/>\n    <text x='835' y='302' text-anchor='middle' class='svg-label'>SIEM</text>\n    <text x='835' y='326' text-anchor='middle' class='svg-label svg-label--small'>Eventos e alertas</text>\n    <line x1='200' y1='85' x2='270' y2='85' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l04-arrow)'/>\n    <line x1='440' y1='85' x2='510' y2='85' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l04-arrow)'/>\n    <line x1='680' y1='85' x2='750' y2='85' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l04-arrow)'/>\n    <line x1='835' y1='130' x2='650' y2='260' class='svg-flow svg-flow--response' marker-end='url(#m08l04-arrow)'/>\n    <line x1='355' y1='260' x2='355' y2='130' class='svg-flow svg-flow--request' marker-end='url(#m08l04-arrow)'/>\n    <line x1='835' y1='130' x2='835' y2='260' class='svg-flow svg-flow--blocked' marker-end='url(#m08l04-arrow)'/>\n    <text x='490' y='180' class='svg-label svg-label--small'>Cookie: sid=...</text>\n    <text x='490' y='205' class='svg-label svg-label--small'>Authorization: Bearer ...</text>\n    <text x='490' y='455' text-anchor='middle' class='svg-label'>Estado web atravessa rede, proxy, balanceador, backend, IdP e observabilidade</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório você vai observar cookies e tokens de forma segura usando navegador, DevTools e curl. O objetivo não é capturar credenciais reais, mas aprender a identificar headers, flags, escopo e sintomas comuns de falha de sessão.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam leitura de <code>Set-Cookie</code>, escolha de flags, diferenciação entre sessão e token, interpretação de problemas de SameSite e construção de checklist defensivo.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você investigará um cenário de login que funciona localmente, mas falha atrás de proxy e domínio corporativo. Sua tarefa será identificar problemas de Domain, Path, Secure, SameSite, TLS e headers preservados.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada aplica um método por camadas: DNS, HTTPS, domínio do cookie, path, flags, redirecionamentos, proxy, backend, store de sessão e logs de autenticação.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>HTTP não mantém estado por natureza. Cookies, sessões e tokens criam formas de reconhecer usuários e clientes entre requisições. Cookies são enviados automaticamente pelo navegador conforme escopo. Sessões normalmente ficam no servidor e são referenciadas por um identificador. Tokens são credenciais apresentadas pelo cliente, frequentemente usadas em APIs.</p>\n  <p>Segurança de estado web depende de TLS, flags corretas, expiração, rotação, escopo mínimo, proteção contra XSS/CSRF, logs seguros, revogação e governança. Uma falha de sessão pode estar no código, no proxy, no balanceador, no domínio, no SameSite, no relógio, no store de sessão ou na política de identidade.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula você estudará proxies, reverse proxies, WAFs e load balancers HTTP. Depois de entender estado web, veremos onde esse tráfego é terminado, inspecionado, roteado e protegido em arquiteturas corporativas.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Aplicação web",
      "Identidade e sessão"
    ],
    "beforeThisLesson": "O aluno já entende HTTP, headers, status codes, HTTPS/TLS, DNS, TCP e portas.",
    "afterThisLesson": "O aluno consegue explicar como estado web é mantido, protegido e diagnosticado em aplicações e APIs.",
    "dependsOn": [
      "HTTP",
      "HTTPS",
      "TLS",
      "Headers",
      "DNS",
      "TCP",
      "Proxy",
      "Load balancer",
      "IAM"
    ]
  },
  "protocolFields": [
    {
      "field": "Set-Cookie",
      "meaning": "Header de resposta usado pelo servidor para criar ou alterar cookies no navegador.",
      "securityNote": "Deve usar Secure, HttpOnly e SameSite adequados para cookies sensíveis."
    },
    {
      "field": "Cookie",
      "meaning": "Header de requisição enviado automaticamente pelo navegador com cookies aplicáveis ao domínio/caminho.",
      "securityNote": "Pode conter identificadores de sessão; nunca deve ser compartilhado em evidências sem sanitização."
    },
    {
      "field": "Authorization",
      "meaning": "Header comum para tokens bearer, basic auth e outros esquemas de autorização.",
      "securityNote": "Tokens bearer funcionam como credenciais; devem ser mascarados em logs."
    },
    {
      "field": "Secure",
      "meaning": "Flag de cookie que restringe envio a HTTPS.",
      "securityNote": "Obrigatória para cookies de sessão em produção."
    },
    {
      "field": "HttpOnly",
      "meaning": "Flag que impede acesso ao cookie via JavaScript no navegador.",
      "securityNote": "Reduz impacto de XSS sobre cookies de sessão, mas não corrige XSS."
    },
    {
      "field": "SameSite",
      "meaning": "Controla envio de cookies em navegação cross-site.",
      "securityNote": "Ajuda contra CSRF, mas pode quebrar fluxos legítimos de SSO se mal configurado."
    },
    {
      "field": "Domain e Path",
      "meaning": "Definem escopo de envio do cookie.",
      "securityNote": "Escopo amplo demais expõe cookies a subdomínios e caminhos desnecessários."
    },
    {
      "field": "Expires / Max-Age",
      "meaning": "Define persistência do cookie.",
      "securityNote": "Sessões longas aumentam janela de abuso em caso de roubo."
    }
  ],
  "packetFlow": [
    "Cliente resolve o domínio e acessa a aplicação via HTTPS.",
    "Servidor apresenta tela ou endpoint de login.",
    "Cliente envia credenciais ou recebe redirecionamento para IdP.",
    "Servidor/IdP valida identidade e cria sessão ou emite token.",
    "Resposta retorna Set-Cookie ou corpo com token conforme arquitetura.",
    "Navegador armazena cookie seguindo Domain, Path, Secure, HttpOnly e SameSite.",
    "Requisições futuras enviam Cookie ou Authorization.",
    "Proxy/WAF/LB encaminha preservando headers necessários e registrando logs sanitizados.",
    "Backend ou gateway valida sessão/token e aplica autorização.",
    "SIEM correlaciona eventos de login, uso, expiração, revogação e anomalia."
  ],
  "deepDive": {
    "title": "Estado web é diferente de autenticação e autorização",
    "points": [
      "Autenticação responde quem é o usuário ou cliente.",
      "Sessão mantém continuidade entre requisições depois da autenticação.",
      "Autorização decide o que aquela identidade pode fazer.",
      "Um token válido não deve conceder acesso além dos escopos e políticas associados.",
      "Um cookie protegido no transporte ainda pode ser abusado se a aplicação tiver CSRF, XSS ou lógica de autorização falha.",
      "O logout precisa invalidar sessão/token conforme a arquitetura; apagar apenas o cookie no navegador pode não revogar credenciais no servidor."
    ]
  },
  "commonMistakes": [
    "Confundir cookie com sessão e achar que todo estado está no navegador.",
    "Guardar token sensível em localStorage sem avaliar risco de XSS.",
    "Criar cookies de sessão sem Secure, HttpOnly e SameSite adequado.",
    "Usar Domain amplo demais, expondo cookie a subdomínios desnecessários.",
    "Registrar Cookie ou Authorization completos em logs de proxy, aplicação ou pipeline.",
    "Usar JWT com expiração muito longa e sem estratégia de revogação.",
    "Quebrar SSO ao alterar SameSite sem testar fluxos de redirecionamento.",
    "Usar sticky session para esconder problema de arquitetura de sessão compartilhada."
  ],
  "troubleshooting": {
    "method": "Diagnosticar estado web por camadas: DNS/HTTPS, domínio, path, Set-Cookie, armazenamento no navegador, envio do Cookie, Authorization, proxy/WAF, backend, store de sessão, IdP e logs.",
    "browser": [
      "Abrir DevTools em Network e Application/Storage.",
      "Inspecionar Set-Cookie na resposta de login sem copiar valores reais.",
      "Verificar se o cookie aparece no armazenamento e se é enviado nas próximas requisições.",
      "Comparar Domain, Path, Secure, HttpOnly, SameSite, Expires e Max-Age.",
      "Testar janela anônima para reduzir interferência de extensões e cache."
    ],
    "curl": [
      "curl -vkI https://app.exemplo.local/login",
      "curl -vk -c cookies.txt -b cookies.txt https://app.exemplo.local/painel",
      "curl -vk -H 'Authorization: Bearer <TOKEN_SANITIZADO>' https://api.exemplo.local/me",
      "curl -vk --resolve app.exemplo.local:443:<IP> https://app.exemplo.local/health",
      "Nunca salvar cookies/tokens reais em arquivos compartilhados."
    ],
    "windows": [
      "Resolve-DnsName app.exemplo.local",
      "Test-NetConnection app.exemplo.local -Port 443",
      "curl.exe -vkI https://app.exemplo.local/health",
      "Verificar horário do sistema quando tokens falham por exp/nbf/iat",
      "Coletar evidências com valores sensíveis mascarados."
    ],
    "linux": [
      "dig app.exemplo.local",
      "curl -vkI https://app.exemplo.local/health",
      "date -u",
      "sudo tcpdump -n host <ip> and port 443",
      "grep request_id logs_app.log | sed para mascarar Cookie/Authorization antes de compartilhar"
    ],
    "proxyGateway": [
      "Conferir se proxy preserva Host, X-Forwarded-Proto e headers exigidos.",
      "Validar se TLS termination muda percepção de Secure ou scheme no backend.",
      "Checar se WAF remove Authorization ou Cookie por política.",
      "Comparar request ID do gateway com log do backend.",
      "Verificar sticky session, health checks e store de sessão compartilhado."
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Cookies, sessões, tokens e estado em aplicações web.",
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
      "Usar HTTPS obrigatório para qualquer cookie ou token sensível.",
      "Aplicar Secure, HttpOnly e SameSite de forma consciente em cookies de sessão.",
      "Usar expiração curta e rotação de sessão após login, elevação de privilégio e troca de senha.",
      "Mascarar Cookie, Authorization, refresh tokens e session IDs em logs e traces.",
      "Separar autenticação de autorização e validar escopos/permissões em cada operação sensível.",
      "Implementar proteção contra CSRF quando cookies são enviados automaticamente em ações sensíveis.",
      "Planejar revogação e logout server-side quando houver sessão ou refresh token.",
      "Monitorar anomalias de sessão: país impossível, user-agent incomum, troca brusca de IP e uso simultâneo suspeito."
    ],
    "badPractices": [
      "Usar HTTP puro para login, sessão ou token.",
      "Armazenar tokens longos em localStorage sem avaliar ameaça de XSS.",
      "Colocar JWT completo em URL ou query string.",
      "Usar segredo de API compartilhado entre vários sistemas sem dono e sem rotação.",
      "Permitir cookies de sessão para todos os subdomínios sem necessidade.",
      "Tratar JWT decodificado como confiável sem validar assinatura, issuer, audience e expiração.",
      "Copiar cookies reais para tickets ou chats de suporte."
    ],
    "attacksAndDefenses": [
      {
        "risk": "Roubo de sessão",
        "defense": "TLS, HttpOnly, Secure, expiração, rotação, detecção de anomalia e revogação."
      },
      {
        "risk": "XSS acessando tokens",
        "defense": "CSP, sanitização, HttpOnly quando aplicável, revisão de frontend e testes de segurança."
      },
      {
        "risk": "CSRF",
        "defense": "SameSite, anti-CSRF token, validação de origem e desenho correto de métodos HTTP."
      },
      {
        "risk": "Session fixation",
        "defense": "Rotacionar identificador de sessão após autenticação e mudanças de privilégio."
      },
      {
        "risk": "Token replay",
        "defense": "Expiração curta, audience/issuer corretos, mTLS ou binding quando apropriado e monitoramento."
      },
      {
        "risk": "Vazamento em logs",
        "defense": "Redação automática de headers sensíveis no proxy, aplicação, APM e pipeline."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Cookies, sessões, tokens e estado em aplicações web",
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
    "id": "lab-8.4",
    "title": "Observando cookies, sessões e tokens com segurança",
    "labType": "cloud",
    "objective": "Identificar como cookies e tokens aparecem em HTTP/HTTPS, interpretar flags de segurança e diagnosticar uma falha de sessão sem expor credenciais reais.",
    "scenario": "Laboratório Neste laboratório você vai observar cookies e tokens de forma segura usando navegador, DevTools e curl. O objetivo não é capturar credenciais reais, mas aprender a identificar headers, flags, escopo e sintomas comuns de falha de sessão.",
    "topology": "Navegador ou curl acessando uma aplicação de teste HTTPS, passando por proxy/load balancer conceitual e backend com store de sessão.",
    "architecture": "Cliente -> DNS -> HTTPS -> WAF/Proxy -> Load Balancer -> Backend -> Store de sessão/IdP -> Logs/SIEM.",
    "prerequisites": [
      "Navegador com DevTools",
      "curl",
      "Acesso a um site/aplicação de teste ou laboratório local",
      "Ambiente onde você tenha autorização para analisar headers"
    ],
    "tools": [
      "Terminal Linux",
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
        "title": "Abrir DevTools",
        "instruction": "Abra uma aplicação de teste e vá para a aba Network.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "As requisições HTTP/HTTPS aparecem com headers e status codes.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Cookies, sessões, tokens e estado em aplicações web” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Localizar Set-Cookie",
        "instruction": "Após login ou primeira visita, procure o header Set-Cookie na resposta.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você identifica nome do cookie e flags, sem copiar o valor real.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Cookies, sessões, tokens e estado em aplicações web” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Verificar envio do Cookie",
        "instruction": "Acesse uma página autenticada e veja se o header Cookie foi enviado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "O navegador envia cookies compatíveis com domínio e path.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Cookies, sessões, tokens e estado em aplicações web” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Testar com curl de forma controlada",
        "instruction": "Use curl com cookie jar em ambiente de teste: curl -vk -c cookies.txt -b cookies.txt <URL>.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "curl armazena e reenvia cookies entre chamadas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Cookies, sessões, tokens e estado em aplicações web” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Comparar sessão e token",
        "instruction": "Identifique se a aplicação usa Cookie, Authorization Bearer ou ambos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você diferencia credencial enviada automaticamente pelo navegador de token enviado explicitamente pelo cliente.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Cookies, sessões, tokens e estado em aplicações web” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Diagnosticar falha simulada",
        "instruction": "Analise um cenário: cookie sem Secure em HTTPS, SameSite incompatível com SSO, Domain incorreto ou token expirado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você propõe causa provável e evidência necessária.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Cookies, sessões, tokens e estado em aplicações web” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Sanitizar evidências",
        "instruction": "Remova valores de Cookie, Authorization e tokens antes de salvar prints ou logs.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Relatório não contém credenciais reutilizáveis.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Cookies, sessões, tokens e estado em aplicações web” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "Ao final, você consegue ler headers de estado web, avaliar flags de segurança e montar uma hipótese de troubleshooting sem vazar credenciais.",
    "validation": [
      {
        "check": "Checklist preenchido com Set-Cookie, Cookie/Authorization, flags, status codes, redirects, store de sessão e logs sanitizados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Checklist preenchido com Set-Cookie, Cookie/Authorization, flags, status codes, redirects, store de sessão e logs sanitizados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Cookie não aparece: verificar Domain, Path, Secure, SameSite e bloqueios do navegador.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Cookie aparece mas não é enviado: verificar escopo, HTTPS, redirecionamentos e política cross-site.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Token falha: verificar expiração, issuer, audience, assinatura, relógio e escopo.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Funciona em um backend mas não em outro: verificar sticky session ou store compartilhado.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Funciona direto mas falha no proxy: verificar Host, X-Forwarded-Proto, TLS termination e headers removidos.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar testes automatizados de flags de cookie no pipeline.",
      "Redigir headers sensíveis nos logs do proxy e aplicação.",
      "Criar alertas para sessões anômalas e refresh tokens reutilizados.",
      "Documentar política de expiração, rotação e revogação.",
      "Integrar eventos de autenticação ao SIEM."
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
      "Qual evidência mostra que o laboratório de “Cookies, sessões, tokens e estado em aplicações web” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Login funciona direto, mas falha via domínio corporativo",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "safetyRules": [
      "Não copie cookies, tokens ou Authorization reais para relatório.",
      "Não capture tráfego de terceiros.",
      "Use apenas ambiente próprio, de laboratório ou explicitamente autorizado.",
      "Mascare qualquer valor sensível com <TOKEN_REMOVIDO> ou <COOKIE_REMOVIDO>."
    ]
  },
  "mentorQuestions": [
    "Por que uma conexão TCP estabelecida não significa que o usuário está autenticado?",
    "Quando é melhor usar sessão server-side em vez de JWT autocontido?",
    "Como você investigaria um login que funciona no localhost mas falha atrás do load balancer?"
  ],
  "quiz": [
    {
      "question": "Qual header cria ou altera cookies no navegador?",
      "options": [
        "Cookie",
        "Set-Cookie",
        "Authorization",
        "Location"
      ],
      "answer": "Set-Cookie",
      "explanation": "Set-Cookie é enviado pelo servidor na resposta; Cookie é enviado pelo cliente na requisição."
    },
    {
      "question": "Qual flag reduz o risco de JavaScript acessar um cookie sensível?",
      "options": [
        "Secure",
        "HttpOnly",
        "Path",
        "Max-Age"
      ],
      "answer": "HttpOnly",
      "explanation": "HttpOnly impede acesso via document.cookie, embora não corrija XSS por completo."
    },
    {
      "question": "Qual flag exige envio do cookie apenas por HTTPS?",
      "options": [
        "Secure",
        "SameSite",
        "Domain",
        "Expires"
      ],
      "answer": "Secure",
      "explanation": "Secure restringe o envio do cookie a conexões HTTPS."
    },
    {
      "question": "Qual risco SameSite ajuda a reduzir?",
      "options": [
        "DDoS volumétrico",
        "CSRF",
        "ARP spoofing",
        "BGP hijack"
      ],
      "answer": "CSRF",
      "explanation": "SameSite reduz envio automático de cookies em contextos cross-site, ajudando contra CSRF."
    },
    {
      "question": "Por que tokens bearer são sensíveis?",
      "options": [
        "Porque sempre criptografam o disco",
        "Porque quem possui o token pode usá-lo enquanto for válido",
        "Porque substituem DNS",
        "Porque só funcionam em UDP"
      ],
      "answer": "Porque quem possui o token pode usá-lo enquanto for válido",
      "explanation": "Bearer significa que a posse do token é suficiente para apresentá-lo como credencial."
    },
    {
      "question": "Em um cluster web, qual problema pode surgir se a sessão fica apenas na memória local de um backend?",
      "options": [
        "TTL DNS alto",
        "Necessidade de sticky session ou perda de sessão ao trocar de backend",
        "ARP cache vazio",
        "SNI ausente"
      ],
      "answer": "Necessidade de sticky session ou perda de sessão ao trocar de backend",
      "explanation": "Se outro backend não conhece a sessão, o usuário pode parecer deslogado."
    }
  ],
  "flashcards": [
    {
      "front": "Cookie",
      "back": "Dado armazenado pelo navegador e enviado automaticamente conforme domínio/caminho."
    },
    {
      "front": "Sessão server-side",
      "back": "Contexto mantido no servidor/cache/banco e normalmente referenciado por um identificador no cookie."
    },
    {
      "front": "Bearer token",
      "back": "Credencial apresentada pelo cliente; quem possui o token pode tentar usá-lo."
    },
    {
      "front": "HttpOnly",
      "back": "Flag que impede acesso do JavaScript ao cookie."
    },
    {
      "front": "SameSite",
      "back": "Controle de envio de cookie em requisições cross-site, útil contra CSRF."
    },
    {
      "front": "Session fixation",
      "back": "Ataque em que o identificador de sessão é fixado antes da autenticação; mitigado com rotação após login."
    }
  ],
  "exercises": [
    {
      "title": "Interpretar Set-Cookie",
      "prompt": "Analise: Set-Cookie: sid=XYZ; Path=/; Secure; HttpOnly; SameSite=Lax. Quais proteções existem e o que falta avaliar?",
      "expectedAnswer": "Secure, HttpOnly e SameSite=Lax existem; falta avaliar Domain, expiração, rotação, escopo, backend e política de CSRF."
    },
    {
      "title": "Cookie vs token",
      "prompt": "Explique diferença operacional entre Cookie de sessão e Authorization Bearer.",
      "expectedAnswer": "Cookie é enviado automaticamente pelo navegador conforme escopo; bearer token é geralmente enviado explicitamente pelo cliente no header Authorization."
    },
    {
      "title": "Falha atrás de proxy",
      "prompt": "Uma aplicação gera cookie Secure, mas backend acredita que requisição é HTTP e não HTTPS. O que verificar?",
      "expectedAnswer": "TLS termination, X-Forwarded-Proto, configuração de trusted proxy e geração correta de cookies."
    },
    {
      "title": "JWT longo demais",
      "prompt": "Quais riscos existem em um JWT com validade de 30 dias para painel administrativo?",
      "expectedAnswer": "Janela longa de abuso, revogação difícil, replay, exposição em logs/storage e impacto maior de vazamento."
    }
  ],
  "challenge": {
    "title": "Login funciona direto, mas falha via domínio corporativo",
    "scenario": "A aplicação autentica corretamente em https://app-lab.local, mas em https://portal.empresa.com o usuário volta para a tela de login após autenticar. Há WAF, proxy reverso e dois backends.",
    "tasks": [
      "Listar hipóteses por camada.",
      "Definir evidências necessárias sem coletar cookies reais.",
      "Verificar Domain, Path, Secure, SameSite e redirects.",
      "Verificar sticky session ou store compartilhado.",
      "Propor correção e controle preventivo."
    ],
    "acceptanceCriteria": [
      "Separar problema de DNS/TLS de problema de sessão.",
      "Não expor tokens ou cookies reais.",
      "Considerar proxy, X-Forwarded-Proto e balanceamento.",
      "Incluir validação pós-correção."
    ]
  },
  "commentedSolution": {
    "summary": "A causa mais provável em cenários assim costuma estar em escopo de cookie, SameSite, percepção incorreta de HTTPS atrás do proxy, domínio diferente ou store de sessão não compartilhado.",
    "steps": [
      "Confirmar que DNS e HTTPS estão corretos para portal.empresa.com.",
      "Verificar se a resposta de login contém Set-Cookie com Domain compatível com portal.empresa.com.",
      "Checar se Secure está presente e se o backend reconhece X-Forwarded-Proto=https.",
      "Validar se SameSite não bloqueia retorno de SSO ou redirecionamento cross-site.",
      "Confirmar que a próxima requisição envia Cookie ao domínio correto.",
      "Comparar logs do WAF, load balancer e backend com request ID.",
      "Verificar se ambos backends conseguem consultar o mesmo store de sessão ou se há sticky session configurada.",
      "Corrigir configuração, sanitizar evidências e criar teste automatizado para flags e login via domínio final."
    ],
    "lessonsLearned": [
      "Estado web depende de headers e infraestrutura.",
      "TLS termination pode afetar geração de cookie Secure.",
      "Cookies são escopados por domínio e caminho.",
      "SSO e SameSite exigem testes específicos.",
      "Logs devem mascarar credenciais de sessão."
    ]
  },
  "glossary": [
    {
      "term": "Cookie",
      "definition": "Pequeno dado armazenado pelo navegador e enviado automaticamente em requisições compatíveis com seu escopo."
    },
    {
      "term": "Sessão",
      "definition": "Contexto que permite reconhecer uma sequência de requisições como pertencente ao mesmo usuário ou cliente."
    },
    {
      "term": "JWT",
      "definition": "Token estruturado e assinado contendo claims como issuer, subject, audience e expiração."
    },
    {
      "term": "Bearer token",
      "definition": "Credencial que concede acesso a quem a apresenta enquanto for válida."
    },
    {
      "term": "CSRF",
      "definition": "Ataque que induz o navegador autenticado a enviar requisição não desejada com cookies válidos."
    },
    {
      "term": "XSS",
      "definition": "Falha que permite executar JavaScript malicioso no contexto de uma página confiável."
    },
    {
      "term": "SameSite",
      "definition": "Atributo de cookie que controla envio em contextos cross-site."
    },
    {
      "term": "Sticky session",
      "definition": "Técnica de balanceamento que tenta manter o mesmo cliente no mesmo backend."
    }
  ],
  "references": [
    {
      "title": "RFC 6265bis — HTTP State Management Mechanism",
      "type": "standard"
    },
    {
      "title": "OWASP Session Management Cheat Sheet",
      "type": "security-guide"
    },
    {
      "title": "OWASP Cross-Site Request Forgery Prevention Cheat Sheet",
      "type": "security-guide"
    },
    {
      "title": "OWASP JSON Web Token for Java Cheat Sheet",
      "type": "security-guide"
    },
    {
      "title": "MDN Web Docs — HTTP cookies",
      "type": "documentation"
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "OIDC e tokens",
      "reason": "Tokens e sessões se conectam diretamente a autenticação moderna, OIDC, refresh tokens e claims."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e secrets",
      "reason": "Tokens aparecem em pipelines, variáveis de ambiente, webhooks e automações."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 8",
      "reason": "Cookies e tokens dependem de transporte, TLS, portas e firewalls stateful."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "Ler todas as seções",
      "Concluir laboratório lab-8.4",
      "Acertar pelo menos 70% do quiz",
      "Entregar checklist de flags de cookie e troubleshooting"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "8.5"
    ],
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "oneOf": [
          "labMarkedDone",
          "practicalExerciseDone"
        ]
      }
  }
};
