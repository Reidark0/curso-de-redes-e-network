export const lesson0810 = {
  "id": "8.10",
  "moduleId": "m08",
  "order": 10,
  "title": "Revisão prática: publicar e diagnosticar uma API segura",
  "subtitle": "Integre HTTP, HTTPS/TLS, cookies, sessões, proxies, WAFs, API gateways, REST, JSON, observabilidade, troubleshooting e hardening para publicar e diagnosticar uma API corporativa segura de ponta a ponta.",
  "duration": "120-190 min",
  "estimatedStudyTimeMinutes": 190,
  "difficulty": "intermediário",
  "type": "ligação/revisão",
  "xp": 290,
  "tags": [
    "redes",
    "http",
    "https",
    "api",
    "rest",
    "json",
    "tls",
    "proxy",
    "waf",
    "api-gateway",
    "troubleshooting",
    "segurança",
    "devsecops",
    "cloud",
    "observabilidade"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.1",
      "title": "Por que HTTP existe",
      "reason": "A revisão depende da motivação e do modelo requisição-resposta."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.2",
      "title": "Requisições e respostas: métodos, URLs, headers, body e status codes",
      "reason": "Métodos, URLs, headers, body e status codes são a linguagem operacional da API."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.3",
      "title": "HTTPS, TLS, certificados, SNI e cadeia de confiança",
      "reason": "A publicação segura depende de TLS correto e certificado confiável."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.4",
      "title": "Cookies, sessões, tokens e estado em aplicações web",
      "reason": "APIs e aplicações web dependem de autenticação, sessão e tokens protegidos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.5",
      "title": "Proxies, reverse proxies, WAFs e load balancers HTTP",
      "reason": "A maioria das APIs corporativas é publicada por intermediários HTTP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.6",
      "title": "APIs REST, JSON, autenticação e contratos",
      "reason": "A revisão final exige contrato, endpoints, autenticação e JSON."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.7",
      "title": "HTTP/2, HTTP/3, QUIC e performance",
      "reason": "Publicações modernas podem usar múltiplas versões de HTTP e caminhos de borda."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.8",
      "title": "Troubleshooting HTTP com curl, navegador, logs e traces",
      "reason": "O aluno precisa diagnosticar por evidência, não por tentativa aleatória."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.9",
      "title": "Segurança HTTP: headers, CORS, exposição e hardening",
      "reason": "A revisão final consolida hardening HTTP e controles defensivos."
    }
  ],
  "objectives": [
    "Publicar mentalmente uma API segura de ponta a ponta, do DNS ao backend.",
    "Separar responsabilidades entre DNS, TLS, WAF, load balancer, API gateway, backend, IdP, logs e traces.",
    "Construir uma matriz de endpoints, métodos, autenticação, autorização, dados, riscos e evidências.",
    "Diagnosticar falhas HTTP/HTTPS usando curl, navegador, logs, traces e leitura de status codes.",
    "Aplicar checklist de hardening com TLS, headers, CORS, cookies, rate limit, backend privado e observabilidade.",
    "Preparar a transição para módulos posteriores de aplicações, cloud, identidade, DevSecOps e segurança corporativa."
  ],
  "learningOutcomes": [
    "Desenhar o fluxo completo de uma requisição HTTPS até uma API corporativa.",
    "Identificar onde uma falha ocorreu: DNS, TCP, TLS, proxy, WAF, gateway, backend, autenticação, autorização ou dependência.",
    "Interpretar evidências de curl, DevTools, logs de borda, logs de aplicação e traces distribuídos.",
    "Criar um plano de publicação segura com controles mínimos obrigatórios.",
    "Explicar riscos como backend exposto, CORS permissivo, token em log, certificado inválido, rate limit ausente e autorização fraca."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  \n  <p>Ao final deste módulo, você já sabe que uma aplicação web não é apenas “um site na porta 443”. Existe DNS, TCP, TLS, SNI, certificado, HTTP, headers, cookies, tokens, proxies, WAFs, gateways, logs, traces, backend, banco de dados e políticas de segurança trabalhando em conjunto.</p>\n  <p>A motivação desta revisão é transformar esse conhecimento em capacidade operacional: <strong>publicar, validar, diagnosticar e defender uma API segura</strong>. Em ambientes corporativos, não basta a API responder <code>200 OK</code>; ela precisa responder pelo caminho correto, com TLS correto, autenticação correta, autorização correta, logs úteis e exposição mínima.</p>\n  <div class='callout'><strong>Ideia central:</strong> uma API segura é uma cadeia. Se DNS, TLS, proxy, WAF, gateway, backend, identidade, logs ou rede estiverem mal configurados, o risco aparece mesmo que a aplicação pareça funcionar.</div>\n\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  \n  <p>HTTP começou como um protocolo simples para trocar documentos. Com o tempo, a Web passou a hospedar sistemas bancários, ERPs, consoles de cloud, APIs públicas, webhooks, aplicações móveis, integrações entre empresas e microsserviços. O que antes era uma página virou uma malha de serviços.</p>\n  <p>Essa evolução exigiu camadas adicionais: HTTPS para proteger transporte, cookies e sessões para manter estado, proxies para publicar serviços, WAFs para reduzir ataques comuns, API gateways para governar APIs, contratos OpenAPI para padronizar consumo e observabilidade para investigar falhas.</p>\n  <p>O resultado é que publicar uma API moderna é um exercício de arquitetura. A aplicação pode estar correta, mas se o backend estiver público, o WAF puder ser contornado, o certificado estiver incompleto, os logs vazarem tokens ou a autorização for fraca, o sistema continua inseguro.</p>\n\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  \n  <p>O problema prático é que incidentes HTTP raramente têm uma única causa visível. Um usuário diz “a API caiu”. O desenvolvedor vê erro <code>502</code>. O time de rede vê TCP funcionando. O time de segurança vê um WAF bloqueando. O time de cloud vê health check falhando. O time de identidade vê token expirado. Todos podem estar vendo uma parte real do problema.</p>\n  <p>Outro problema é a falsa segurança. Uma API atrás de HTTPS pode aceitar CORS amplo, expor métodos desnecessários, aceitar tokens sem escopo, registrar <code>Authorization</code> em logs, usar TLS fraco, permitir acesso direto ao backend ou não possuir rate limiting.</p>\n  <div class='callout callout--problem'><strong>Problema de revisão:</strong> como desenhar e diagnosticar uma API considerando rede, transporte, TLS, HTTP, identidade, autorização, proxy, logs e segurança ao mesmo tempo?</div>\n\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  \n  <table class='comparison-table'><thead><tr><th>Etapa</th><th>Forma simples</th><th>Problema</th><th>Forma madura</th></tr></thead><tbody>\n    <tr><td>Publicação</td><td>Servidor web público</td><td>Superfície direta e pouco controle</td><td>CDN/WAF/API Gateway com backend privado</td></tr>\n    <tr><td>Criptografia</td><td>HTTPS básico</td><td>Certificado vencido, cadeia incompleta, TLS legado</td><td>TLS gerenciado, rotação, alertas, SNI correto e política mínima</td></tr>\n    <tr><td>Autenticação</td><td>Token ou cookie</td><td>Token em log, sessão fraca, replay</td><td>OIDC/OAuth2, escopos, expiração, rotação e logs sanitizados</td></tr>\n    <tr><td>Diagnóstico</td><td>“Testa no navegador”</td><td>Pouca evidência e baixa reprodutibilidade</td><td>curl, DevTools, logs, traces, request ID e runbook</td></tr>\n    <tr><td>Governança</td><td>Alteração manual</td><td>Drift e exceções invisíveis</td><td>IaC, policy as code, revisão por PR e inventário</td></tr>\n  </tbody></table>\n\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  \n  <p><strong>Publicar e diagnosticar uma API segura</strong> significa controlar o caminho completo entre consumidor e serviço: nome DNS, resolução, rota, TCP, TLS, HTTP, proxy, WAF, API gateway, autenticação, autorização, backend, dependências, logs, métricas e traces.</p>\n  <p>O ponto mais importante é que cada camada responde uma pergunta diferente. DNS responde “qual destino?”. TCP responde “a porta está alcançável?”. TLS responde “estou falando com quem eu acredito estar falando?”. HTTP responde “qual recurso, método, headers e status?”. Autenticação responde “quem é você?”. Autorização responde “você pode acessar este objeto?”. Logs e traces respondem “o que aconteceu, onde e com qual correlação?”.</p>\n  <div class='definition-box'>Uma API segura é uma publicação mínima, autenticada, autorizada, criptografada, observável, governada, com backend protegido e comportamento validado por evidências.</div>\n\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  \n  <ol class='flow-list'>\n    <li>O cliente resolve <code>api.empresa.com</code> via DNS.</li>\n    <li>O cliente abre TCP para a borda na porta 443.</li>\n    <li>O handshake TLS valida SNI, certificado, SAN, cadeia de confiança e versão negociada.</li>\n    <li>O cliente envia a requisição HTTP com método, path, headers, token/cookie e body quando necessário.</li>\n    <li>A borda, o WAF ou o API Gateway aplicam regras: tamanho, método, rota, rate limit, assinatura, CORS, autenticação e logging.</li>\n    <li>O backend recebe a requisição normalizada, valida autorização de negócio e chama dependências internas.</li>\n    <li>A resposta retorna com status code coerente, headers de segurança, cache correto e correlation ID.</li>\n    <li>Logs e traces permitem reconstruir o caminho sem expor tokens, cookies ou dados sensíveis.</li>\n  </ol>\n  <p>Quando algo falha, você não deve pular diretamente para “é firewall” ou “é aplicação”. O diagnóstico maduro coleta evidências em cada fronteira: cliente, DNS, TLS, proxy, gateway, backend e dependências.</p>\n\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  \n  <p>Uma arquitetura recomendada para API corporativa exposta usa uma borda pública controlada e backends privados. O cliente acessa DNS público, que aponta para CDN/WAF ou load balancer. O TLS termina na borda ou no gateway, com recriptografia até o backend quando necessário. O backend não deve aceitar tráfego direto da Internet.</p>\n  <table class='data-table'><thead><tr><th>Componente</th><th>Responsabilidade</th><th>Evidência esperada</th></tr></thead><tbody>\n    <tr><td>DNS</td><td>Direcionar para borda correta</td><td>Registro, TTL e ausência de destino legado</td></tr>\n    <tr><td>TLS</td><td>Identidade e criptografia</td><td>Certificado válido, SAN, cadeia e política TLS</td></tr>\n    <tr><td>WAF/API Gateway</td><td>Política, autenticação, rate limit e logs</td><td>Regras, request ID, decisões e métricas</td></tr>\n    <tr><td>Backend</td><td>Regra de negócio e autorização</td><td>Logs sanitizados, autorização por objeto e health checks</td></tr>\n    <tr><td>Observabilidade</td><td>Correlação e investigação</td><td>Logs, métricas, traces, p95/p99 e erros por camada</td></tr>\n  </tbody></table>\n\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  \n  <p>Pense em uma API como a recepção de um prédio corporativo. O DNS é o endereço do prédio. O TLS é o documento que prova que você chegou ao prédio correto. O WAF é a triagem de segurança na entrada. O API Gateway é a recepção que verifica crachá, destino e autorização. O backend é o setor interno que executa o serviço. Os logs são as câmeras e o livro de registro.</p>\n  <p>Se o visitante consegue entrar por uma porta lateral sem recepção, todo o controle da entrada principal perde valor. Do mesmo modo, se o backend fica público e permite acesso direto, WAF, gateway e rate limit podem ser contornados.</p>\n\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  \n  <p>Você publica uma API de teste em <code>https://api.lab.local/v1/health</code>. O teste mínimo não é apenas abrir no navegador. Você valida DNS, TCP/443, certificado, status <code>200</code>, headers, tempo de resposta, body esperado e logs com request ID.</p>\n  <pre><code>curl -v https://api.lab.local/v1/health\ncurl -s -D - -o /dev/null https://api.lab.local/v1/health</code></pre>\n\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  \n  <p>Uma empresa publica a API de pedidos para parceiros. O desenho correto inclui DNS público, WAF, API Gateway, autenticação OIDC client credentials, escopos por operação, rate limit por parceiro, backend privado, logs sanitizados, traces e matriz de endpoints.</p>\n  <p>O erro comum seria liberar o backend diretamente para “facilitar teste”, manter CORS amplo, permitir <code>DELETE</code> sem necessidade, registrar tokens em logs e depender apenas de uma regra de firewall ampla.</p>\n\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  \n  <p>Em cloud, a API pode passar por DNS gerenciado, CDN, WAF, load balancer, API Gateway, função serverless ou pods Kubernetes. Cada camada possui logs próprios e políticas próprias. O diagnóstico precisa correlacionar request ID entre borda, gateway e backend.</p>\n  <p>Controles típicos incluem security group/NSG restritivo, backend em sub-rede privada, route table sem exposição direta, WAF gerenciado, certificate manager, private link/private endpoint, secrets manager e flow logs.</p>\n\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  \n  <p>Em DevSecOps, a publicação da API deve ser declarada como código. O repositório pode conter contrato OpenAPI, manifesto de gateway, política de CORS, rate limit, headers obrigatórios, certificados gerenciados, testes de contrato, testes de segurança e validações no pipeline.</p>\n  <p>Um pull request que amplia CORS para <code>*</code>, remove autenticação de um endpoint sensível, expõe o backend ou reduz exigência TLS deve falhar em política automatizada ou exigir revisão de segurança.</p>\n\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  \n  <p>Em uma revisão defensiva, a equipe identifica que <code>api.empresa.com</code> passa pelo WAF, mas <code>backend-api-prod.elb.cloudprovider.com</code> também está público. Isso permite bypass do WAF. A correção não é apenas “criar regra no WAF”, mas tornar o backend privado, restringir origem ao gateway, revisar DNS, logs e alertas.</p>\n  <div class='callout callout--security'><strong>Boa prática:</strong> toda API pública deve ter dono, classificação de dados, matriz de métodos, contrato, autenticação, autorização, rate limit, logs, TLS válido, CORS mínimo, backend privado e evidências de validação.</div>\n\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama SVG</h2>\n  \n  <svg class='lesson-svg' viewBox='0 0 1100 620' role='img' aria-labelledby='m08l10-title m08l10-desc'>\n    <title id='m08l10-title'>Publicação e diagnóstico de uma API segura</title>\n    <desc id='m08l10-desc'>Fluxo de cliente para DNS, borda, WAF, API Gateway, backend privado, dependências internas, logs, traces e SIEM.</desc>\n    <defs>\n      <marker id='m08l10-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path></marker>\n    </defs>\n    <rect x='30' y='60' width='150' height='90' rx='12' class='svg-node svg-node--client'></rect>\n    <text x='105' y='96' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='105' y='122' text-anchor='middle' class='svg-label svg-label--small'>curl • browser • app</text>\n\n    <rect x='240' y='60' width='150' height='90' rx='12' class='svg-node svg-node--server'></rect>\n    <text x='315' y='96' text-anchor='middle' class='svg-label'>DNS</text>\n    <text x='315' y='122' text-anchor='middle' class='svg-label svg-label--small'>api.empresa.com</text>\n\n    <rect x='450' y='60' width='150' height='90' rx='12' class='svg-node svg-node--firewall'></rect>\n    <text x='525' y='92' text-anchor='middle' class='svg-label'>Borda</text>\n    <text x='525' y='118' text-anchor='middle' class='svg-label svg-label--small'>CDN • WAF • TLS</text>\n\n    <rect x='660' y='60' width='150' height='90' rx='12' class='svg-node svg-node--router'></rect>\n    <text x='735' y='92' text-anchor='middle' class='svg-label'>API Gateway</text>\n    <text x='735' y='118' text-anchor='middle' class='svg-label svg-label--small'>auth • quota • logs</text>\n\n    <rect x='870' y='60' width='170' height='90' rx='12' class='svg-node svg-node--server'></rect>\n    <text x='955' y='92' text-anchor='middle' class='svg-label'>Backend privado</text>\n    <text x='955' y='118' text-anchor='middle' class='svg-label svg-label--small'>serviço interno</text>\n\n    <rect x='870' y='240' width='170' height='90' rx='12' class='svg-node svg-node--cloud'></rect>\n    <text x='955' y='274' text-anchor='middle' class='svg-label'>Dependências</text>\n    <text x='955' y='300' text-anchor='middle' class='svg-label svg-label--small'>DB • fila • IdP</text>\n\n    <rect x='450' y='430' width='150' height='90' rx='12' class='svg-node svg-node--security'></rect>\n    <text x='525' y='462' text-anchor='middle' class='svg-label'>SIEM</text>\n    <text x='525' y='488' text-anchor='middle' class='svg-label svg-label--small'>logs sanitizados</text>\n\n    <rect x='660' y='430' width='150' height='90' rx='12' class='svg-node svg-node--security'></rect>\n    <text x='735' y='462' text-anchor='middle' class='svg-label'>APM/Traces</text>\n    <text x='735' y='488' text-anchor='middle' class='svg-label svg-label--small'>request ID</text>\n\n    <line x1='180' y1='105' x2='240' y2='105' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l10-arrow)'></line>\n    <line x1='390' y1='105' x2='450' y2='105' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l10-arrow)'></line>\n    <line x1='600' y1='105' x2='660' y2='105' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l10-arrow)'></line>\n    <line x1='810' y1='105' x2='870' y2='105' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l10-arrow)'></line>\n    <line x1='955' y1='150' x2='955' y2='240' class='svg-flow svg-flow--request' marker-end='url(#m08l10-arrow)'></line>\n    <line x1='525' y1='150' x2='525' y2='430' class='svg-flow svg-flow--response' marker-end='url(#m08l10-arrow)'></line>\n    <line x1='735' y1='150' x2='735' y2='430' class='svg-flow svg-flow--response' marker-end='url(#m08l10-arrow)'></line>\n    <line x1='870' y1='470' x2='810' y2='470' class='svg-flow svg-flow--blocked' marker-end='url(#m08l10-arrow)'></line>\n    <text x='840' y='455' text-anchor='middle' class='svg-label svg-label--small'>backend não público</text>\n\n    <text x='550' y='575' text-anchor='middle' class='svg-label'>Diagnóstico: DNS → TCP → TLS → HTTP → Gateway/WAF → Backend → Dependências → Logs/Traces</text>\n  </svg>\n\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  \n  <p>Neste laboratório final, você construirá um runbook de publicação e diagnóstico de uma API segura. A atividade usa evidências defensivas: DNS, TLS, headers, status codes, CORS, cookies/tokens sanitizados, logs, traces e matriz de fluxos.</p>\n\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  \n  <p>Os exercícios consolidam análise de arquitetura, leitura de status codes, desenho de matriz de endpoints, troubleshooting com curl e criação de checklist de hardening HTTP.</p>\n\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  \n  <p>Você receberá um cenário de API de pagamentos com falhas intermitentes, WAF parcial, CORS amplo, backend acessível diretamente, certificado perto de expirar e logs contendo dados sensíveis. Seu desafio é priorizar correções e montar um plano de validação.</p>\n\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  \n  <p>A solução comentada mostra como separar urgência operacional de risco de segurança: restaurar disponibilidade, proteger backend, corrigir TLS, restringir CORS, sanitizar logs, reforçar autenticação/autorização e implantar monitoramento.</p>\n\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  \n  <p>Publicar uma API segura exige integração entre rede, transporte, TLS, HTTP, identidade, autorização, proxies, WAF, API Gateway, backend privado, observabilidade e governança. Cada camada reduz um tipo de risco e gera evidências diferentes.</p>\n  <p>O diagnóstico maduro segue método. Você valida DNS, rota, porta, TLS, HTTP, status, headers, CORS, autenticação, autorização, logs, traces e dependências antes de concluir a causa raiz.</p>\n\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  \n  <p>No próximo módulo, você avançará para temas de aplicação, exposição e integração corporativa que dependem diretamente desta base: publicação segura, serviços modernos, identidade, APIs, cloud, DevSecOps e arquitetura de plataforma.</p>\n\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "HTTP",
      "HTTPS",
      "TLS",
      "API Gateway",
      "WAF",
      "Observabilidade",
      "Segurança"
    ],
    "beforeThisLesson": "O aluno estudou HTTP, HTTPS/TLS, cookies, proxies, APIs REST, performance, troubleshooting e hardening.",
    "afterThisLesson": "O aluno consegue desenhar, validar e diagnosticar uma API segura ponta a ponta.",
    "dependsOn": [
      "DNS",
      "TCP",
      "TLS",
      "HTTP",
      "Cookies",
      "Tokens",
      "Proxy",
      "WAF",
      "API Gateway",
      "REST",
      "JSON",
      "Logs",
      "Traces",
      "Cloud"
    ]
  },
  "protocolFields": [
    {
      "field": "Host / :authority",
      "meaning": "Identifica o host lógico solicitado em HTTP/1.1 ou HTTP/2.",
      "securityNote": "Host header indevido pode afetar roteamento, cache, links absolutos e validações."
    },
    {
      "field": "Authorization",
      "meaning": "Transporta credenciais como Bearer token ou esquema equivalente.",
      "securityNote": "Nunca deve aparecer em logs, traces, screenshots ou tickets sem sanitização."
    },
    {
      "field": "Cookie / Set-Cookie",
      "meaning": "Transporta estado de sessão entre cliente e servidor.",
      "securityNote": "Exige Secure, HttpOnly, SameSite, escopo mínimo e expiração coerente."
    },
    {
      "field": "X-Request-ID / traceparent",
      "meaning": "Permite correlação entre borda, gateway, backend e traces.",
      "securityNote": "Não deve conter dados pessoais, token, sessão ou identificador sensível não necessário."
    },
    {
      "field": "Access-Control-Allow-Origin",
      "meaning": "Define quais origens podem ler respostas cross-origin no navegador.",
      "securityNote": "Deve ser restrito e consistente com credenciais, dados e autenticação."
    },
    {
      "field": "Strict-Transport-Security",
      "meaning": "Instrui navegadores a usar HTTPS para o domínio.",
      "securityNote": "Reduz downgrade, mas exige planejamento antes de includeSubDomains/preload."
    },
    {
      "field": "Status code",
      "meaning": "Sinaliza resultado da requisição: sucesso, redirecionamento, erro de cliente ou erro de servidor.",
      "securityNote": "Status codes e mensagens não devem vazar detalhes internos desnecessários."
    }
  ],
  "packetFlow": [
    "Cliente resolve DNS do domínio da API.",
    "Cliente estabelece TCP e negocia TLS com SNI e certificado válido.",
    "Cliente envia requisição HTTP com método, path, headers, token/cookie e body.",
    "CDN/WAF/load balancer aplica política de borda e encaminha com request ID.",
    "API Gateway valida contrato, autenticação, escopos, rate limit, CORS e roteamento.",
    "Backend privado valida autorização de objeto, processa regra de negócio e chama dependências.",
    "Resposta volta com status code, headers de segurança, cache correto e corpo esperado.",
    "Logs e traces registram a jornada sem expor segredos ou dados sensíveis."
  ],
  "deepDive": {
    "title": "O caminho feliz não prova segurança",
    "content": "Uma requisição retornando 200 OK prova apenas que um caminho funcionou para aquele caso. Ela não prova que o backend está privado, que autorização por objeto existe, que CORS está correto, que tokens não vazam em logs, que o certificado rotacionará a tempo, que o WAF cobre todos os caminhos ou que o rate limit impede abuso. Por isso a validação final precisa combinar testes funcionais, evidências de arquitetura, logs, traces e revisão de configuração.",
    "securityAngle": "A revisão defensiva deve procurar caminhos alternativos, exposição direta, exceções antigas e controles ausentes, não apenas confirmar disponibilidade."
  },
  "commonMistakes": [
    "Testar apenas no navegador e ignorar curl, headers, TLS, logs e traces.",
    "Considerar 200 OK como prova de segurança.",
    "Manter backend público além do WAF/API Gateway.",
    "Registrar Authorization, cookies, tokens ou payloads sensíveis em logs.",
    "Usar CORS amplo para resolver problema de integração sem avaliar dados e credenciais.",
    "Não diferenciar 401, 403, 404, 429, 502, 503 e 504.",
    "Aceitar certificado inválido com --insecure como solução permanente.",
    "Não ter request ID/correlation ID entre borda, gateway e backend.",
    "Permitir métodos HTTP desnecessários ou endpoints legados sem dono.",
    "Não validar rate limit, quotas e alertas de abuso."
  ],
  "troubleshooting": {
    "method": "Runbook ponta a ponta para API HTTP/HTTPS segura.",
    "steps": [
      "Definir endpoint, método, ambiente, usuário/cliente, horário e impacto.",
      "Validar DNS, IP de borda, TTL e ausência de destino legado.",
      "Validar TCP/443 e TLS com SNI, certificado, SAN, cadeia, validade e versão.",
      "Executar curl com verbose, headers e body sanitizado.",
      "Interpretar status code e identificar se o erro vem de cliente, WAF/gateway, backend ou dependência.",
      "Coletar X-Request-ID, traceparent ou correlation ID.",
      "Correlacionar logs de CDN/WAF/load balancer/API Gateway/backend.",
      "Validar autenticação, autorização, escopos, CORS, cookies e rate limit quando aplicável.",
      "Verificar se backend não está público e se só aceita tráfego da borda/gateway.",
      "Registrar causa raiz, evidências sanitizadas, correção e validação pós-mudança."
    ],
    "commands": [
      {
        "platform": "Linux/macOS/Windows",
        "command": "curl -vk https://api.exemplo.com/v1/health",
        "purpose": "Ver DNS resolvido, handshake TLS, headers e resposta HTTP."
      },
      {
        "platform": "Linux/macOS/Windows",
        "command": "curl -s -D - -o /dev/null https://api.exemplo.com/v1/health",
        "purpose": "Coletar somente headers e status para evidência."
      },
      {
        "platform": "Linux/macOS",
        "command": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -showcerts </dev/null",
        "purpose": "Validar SNI, certificado, SAN, issuer, cadeia e validade."
      },
      {
        "platform": "Windows PowerShell",
        "command": "Test-NetConnection api.exemplo.com -Port 443",
        "purpose": "Separar falha de conectividade TCP de falha HTTP/TLS/aplicação."
      },
      {
        "platform": "Linux",
        "command": "dig api.exemplo.com A +short && dig api.exemplo.com CNAME +short",
        "purpose": "Validar resolução DNS e CNAMEs relevantes."
      },
      {
        "platform": "Linux/macOS/Windows",
        "command": "curl -i -H 'Origin: https://origem-teste.exemplo' https://api.exemplo.com/v1/recurso",
        "purpose": "Verificar resposta CORS de forma controlada."
      },
      {
        "platform": "Linux",
        "command": "tcpdump -ni any host <ip-da-borda> and port 443",
        "purpose": "Capturar metadados de conexão com cuidado e sem expor payload quando possível."
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Revisão prática: publicar e diagnosticar uma API segura.",
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
    "principles": [
      "Exposição mínima",
      "Backend privado",
      "TLS forte",
      "Autenticação e autorização explícitas",
      "Logs sanitizados",
      "Rate limit",
      "CORS restrito",
      "Governança por código",
      "Observabilidade ponta a ponta"
    ],
    "goodPractices": [
      "Publicar APIs por WAF/API Gateway/load balancer controlado.",
      "Manter backends privados e acessíveis apenas por componentes autorizados.",
      "Usar TLS válido, rotação automatizada e alertas de expiração.",
      "Aplicar autenticação, autorização por objeto e escopos mínimos.",
      "Usar headers de segurança e CORS restrito por origem necessária.",
      "Sanitizar logs e mascarar tokens, cookies e payloads sensíveis.",
      "Correlacionar logs e traces por request ID.",
      "Definir rate limit, quotas e alertas de abuso.",
      "Revisar mudanças de gateway, WAF, DNS, TLS e CORS por pull request."
    ],
    "badPractices": [
      "Expor backend direto na Internet.",
      "Usar 0.0.0.0/0 em administração ou origem de backend sem justificativa.",
      "Permitir CORS amplo com credenciais.",
      "Logar Authorization, Cookie ou refresh token.",
      "Desativar validação TLS para resolver incidente.",
      "Não diferenciar autenticação de autorização.",
      "Confiar somente em WAF sem corrigir backend.",
      "Não possuir dono e contrato para endpoints publicados."
    ],
    "attackSurfaces": [
      "DNS público",
      "TLS/certificados",
      "WAF/API Gateway",
      "headers HTTP",
      "CORS",
      "cookies/tokens",
      "endpoints REST",
      "rate limit",
      "logs/traces",
      "backend direto",
      "dependências internas"
    ],
    "mitigations": [
      "WAF",
      "API Gateway",
      "private backend",
      "mTLS quando necessário",
      "OIDC/OAuth2",
      "escopos",
      "headers seguros",
      "CORS restrito",
      "rate limiting",
      "SIEM",
      "APM",
      "IaC",
      "policy as code",
      "revisão de contratos"
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Revisão prática: publicar e diagnosticar uma API segura",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "WAF",
      "API Gateway",
      "private backend",
      "mTLS quando necessário",
      "OIDC/OAuth2",
      "escopos",
      "headers seguros",
      "CORS restrito",
      "rate limiting",
      "SIEM",
      "APM",
      "IaC",
      "policy as code",
      "revisão de contratos"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-8.10",
    "title": "Publicar e diagnosticar uma API segura ponta a ponta",
    "labType": "cloud",
    "objective": "Criar um runbook e uma matriz de validação para uma API HTTP/HTTPS publicada com borda, gateway, backend privado, TLS, autenticação, headers, logs e traces.",
    "scenario": "Laboratório Neste laboratório final, você construirá um runbook de publicação e diagnóstico de uma API segura. A atividade usa evidências defensivas: DNS, TLS, headers, status codes, CORS, cookies/tokens sanitizados, logs, traces e matriz de fluxos.",
    "topology": "Cliente → DNS → CDN/WAF ou Load Balancer → API Gateway/Reverse Proxy → Backend privado → Dependências internas → Logs/SIEM/APM.",
    "architecture": "A API deve ter domínio público, TLS válido, backend não acessível diretamente, autenticação documentada, endpoints versionados, logs sanitizados e correlation ID propagado.",
    "prerequisites": [
      "Ambiente de laboratório ou endpoint próprio autorizado",
      "curl",
      "navegador com DevTools",
      "openssl ou ferramenta equivalente",
      "acesso a logs de aplicação ou simulação de logs",
      "planilha/matriz para evidências"
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 190,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não testar endpoints de terceiros sem autorização.",
      "Não publicar tokens, cookies, IPs internos, nomes reais de clientes ou payloads sensíveis em evidências.",
      "Não executar varredura agressiva; esta atividade é de validação defensiva e documentação.",
      "Use domínios e IPs fictícios ao compartilhar resultados.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Mapear a API",
        "instruction": "Identifique domínio, ambiente, dono, endpoints principais, métodos permitidos, dados tratados e consumidores.",
        "command": "GET /v1/health\nGET /v1/orders/{id}\nPOST /v1/orders",
        "expectedOutput": "Tabela inicial com endpoint, método, autenticação, autorização, dados e dono.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: publicar e diagnosticar uma API segura” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Validar DNS e borda",
        "instruction": "Verifique se o domínio aponta para a borda esperada e não para backend direto.",
        "command": "dig api.exemplo.com A\ndig api.exemplo.com CNAME\nResolve-DnsName api.exemplo.com",
        "expectedOutput": "Destino coerente com CDN/WAF/load balancer/API Gateway.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: publicar e diagnosticar uma API segura” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Validar TLS",
        "instruction": "Verifique certificado, SAN, SNI, cadeia, validade e versão negociada.",
        "command": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -showcerts </dev/null\ncurl -vk https://api.exemplo.com/v1/health",
        "expectedOutput": "Certificado válido, nome compatível, cadeia completa e sem uso de --insecure em operação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: publicar e diagnosticar uma API segura” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Coletar resposta HTTP",
        "instruction": "Colete status, headers e body mínimo sem expor dados sensíveis.",
        "command": "curl -s -D - -o /dev/null https://api.exemplo.com/v1/health\ncurl -i https://api.exemplo.com/v1/health",
        "expectedOutput": "Status code coerente, headers de segurança e request ID presentes.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: publicar e diagnosticar uma API segura” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Validar autenticação e autorização",
        "instruction": "Compare respostas sem token, com token inválido, com token válido e com escopo insuficiente.",
        "command": "curl -i https://api.exemplo.com/v1/orders\ncurl -i -H 'Authorization: Bearer <TOKEN_SANITIZADO>' https://api.exemplo.com/v1/orders",
        "expectedOutput": "Diferença clara entre 401, 403 e sucesso autorizado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: publicar e diagnosticar uma API segura” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Validar CORS e métodos",
        "instruction": "Teste origens esperadas e não esperadas, além de métodos permitidos.",
        "command": "curl -i -H 'Origin: https://app.exemplo.com' https://api.exemplo.com/v1/orders\ncurl -i -X OPTIONS https://api.exemplo.com/v1/orders",
        "expectedOutput": "CORS restrito e métodos coerentes com contrato.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: publicar e diagnosticar uma API segura” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Correlacionar logs e traces",
        "instruction": "Use o request ID para localizar a mesma requisição na borda, gateway e backend.",
        "command": "grep '<REQUEST_ID>' logs-gateway.log\ngrep '<REQUEST_ID>' logs-backend.log",
        "expectedOutput": "Linha do tempo com status, latência, decisão de política e backend acionado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: publicar e diagnosticar uma API segura” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Testar cenário de erro controlado",
        "instruction": "Provoque erro de endpoint inexistente, método incorreto ou payload inválido para avaliar status e logs.",
        "command": "curl -i https://api.exemplo.com/v1/inexistente\ncurl -i -X DELETE https://api.exemplo.com/v1/orders/123",
        "expectedOutput": "404/405/400 coerentes, sem vazamento de stack trace ou segredo.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: publicar e diagnosticar uma API segura” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Criar matriz de riscos",
        "instruction": "Documente achados, impacto, probabilidade, correção, dono e validação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz priorizada com ações de hardening e evidências sanitizadas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: publicar e diagnosticar uma API segura” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Revisão prática: publicar e diagnosticar uma API segura”.",
    "validation": [
      {
        "check": "DNS aponta para borda correta",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "DNS aponta para borda correta",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "TLS válido",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "TLS válido",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Headers de segurança presentes",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Headers de segurança presentes",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "CORS restrito",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "CORS restrito",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Backend privado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Backend privado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Autenticação e autorização testadas",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Autenticação e autorização testadas",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Logs sanitizados",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Logs sanitizados",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Request ID correlacionado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Request ID correlacionado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Rate limit e WAF documentados",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Rate limit e WAF documentados",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se DNS resolve errado, verificar zona, CNAME, TTL e cache.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se TLS falha, verificar SNI, SAN, cadeia, validade e trust store.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se 502 ocorre, verificar health check, backend, timeout e conectividade interna.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se 403 ocorre, separar bloqueio de WAF, autorização e escopo.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se 504 ocorre, investigar timeout em gateway, backend ou dependência.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se logs não correlacionam, revisar propagação de request ID.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Automatizar checklist em pipeline.",
      "Versionar contrato OpenAPI.",
      "Adicionar testes sintéticos.",
      "Enviar logs para SIEM e traces para APM.",
      "Aplicar policy as code para CORS, TLS, headers e exposição.",
      "Criar dashboard com p95/p99, 4xx, 5xx, WAF blocks e rate limit."
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
      "Qual evidência mostra que o laboratório de “Revisão prática: publicar e diagnosticar uma API segura” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Publicar e diagnosticar API de pagamentos segura",
    "solution": "Uma API segura precisa funcionar e também resistir a abuso. A correção final deve deixar a API atrás de WAF/API Gateway, com backend privado, TLS válido, CORS restrito, logs sanitizados, autenticação/autorização claras, rate limit, observabilidade e evidências versionadas.",
    "expectedOutcome": "Ao final, o aluno terá um runbook completo de publicação e diagnóstico de API segura, com matriz de endpoints, evidências, riscos e correções priorizadas."
  },
  "mentorQuestions": [
    "Quando uma API retorna 502, quais camadas você investigaria antes de culpar o backend?",
    "Por que backend privado é um controle tão importante mesmo quando existe WAF?",
    "Qual diferença prática entre autenticação bem-sucedida e autorização correta por objeto?"
  ],
  "quiz": [
    {
      "question": "Qual evidência melhor confirma que o backend não está sendo acessado diretamente pela Internet?",
      "options": [
        "A API retorna 200 OK",
        "O domínio usa HTTPS",
        "As regras de rede permitem acesso ao backend apenas pela borda/gateway esperado",
        "O navegador mostra cadeado"
      ],
      "answer": 2,
      "explanation": "HTTPS e 200 OK não provam isolamento. É necessário validar caminho e regras de rede/origem."
    },
    {
      "question": "O que um 401 normalmente indica?",
      "options": [
        "Usuário autenticado, mas sem permissão",
        "Cliente não autenticado ou credencial inválida/ausente",
        "Backend indisponível",
        "Timeout de gateway"
      ],
      "answer": 1,
      "explanation": "401 se relaciona à autenticação. 403 normalmente se relaciona à autorização."
    },
    {
      "question": "Qual header ajuda a correlacionar logs entre gateway e backend?",
      "options": [
        "Content-Type",
        "X-Request-ID ou traceparent",
        "Accept",
        "User-Agent"
      ],
      "answer": 1,
      "explanation": "Request IDs e trace context permitem seguir a mesma requisição entre componentes."
    },
    {
      "question": "Por que CORS amplo pode ser perigoso?",
      "options": [
        "Porque abre a porta TCP 443",
        "Porque permite que qualquer servidor altere o DNS",
        "Porque pode permitir leitura por origens indevidas no navegador, especialmente com credenciais",
        "Porque substitui TLS"
      ],
      "answer": 2,
      "explanation": "CORS controla leitura cross-origin no navegador e deve ser restrito conforme dados e credenciais."
    },
    {
      "question": "Qual é a abordagem correta para tokens em logs?",
      "options": [
        "Registrar para facilitar debug",
        "Registrar apenas refresh token",
        "Sanitizar/mascarar e evitar persistir segredos",
        "Enviar para todos os times"
      ],
      "answer": 2,
      "explanation": "Tokens e cookies são segredos e não devem aparecer em logs ou evidências compartilhadas."
    },
    {
      "question": "Qual status costuma apontar timeout em proxy/gateway aguardando backend?",
      "options": [
        "301",
        "401",
        "404",
        "504"
      ],
      "answer": 3,
      "explanation": "504 Gateway Timeout costuma indicar que um intermediário não recebeu resposta a tempo de um upstream."
    }
  ],
  "flashcards": [
    {
      "front": "Uma API com HTTPS está automaticamente segura?",
      "back": "Não. HTTPS protege transporte, mas não corrige autorização fraca, CORS amplo, backend exposto, logs sensíveis ou ausência de rate limit."
    },
    {
      "front": "O que é backend privado?",
      "back": "Backend acessível apenas por componentes autorizados, como load balancer, WAF ou API Gateway, e não diretamente pela Internet."
    },
    {
      "front": "401 versus 403",
      "back": "401 indica problema de autenticação; 403 indica usuário/cliente reconhecido, mas sem permissão suficiente."
    },
    {
      "front": "Para que serve X-Request-ID?",
      "back": "Para correlacionar uma requisição entre borda, gateway, backend, logs e traces."
    },
    {
      "front": "Por que sanitizar evidências?",
      "back": "Porque headers, cookies, tokens, payloads e logs podem conter segredos e dados sensíveis."
    },
    {
      "front": "O que validar em TLS?",
      "back": "SNI, certificado, SAN, issuer, cadeia, validade, versão negociada e política corporativa."
    }
  ],
  "exercises": [
    {
      "title": "Matriz de endpoints",
      "prompt": "Crie uma tabela com 5 endpoints, métodos, autenticação, autorização, dados tratados, dono e status esperado.",
      "expectedAnswer": "A resposta deve separar GET/POST/PUT/DELETE, indicar escopos/autorização e status coerentes como 200, 201, 400, 401, 403, 404 e 409."
    },
    {
      "title": "Diagnóstico de 502",
      "prompt": "Liste pelo menos 6 causas possíveis para 502 em uma API atrás de gateway.",
      "expectedAnswer": "Health check falhando, backend indisponível, porta errada, DNS interno errado, TLS upstream inválido, timeout curto, rota/firewall interno, deploy quebrado."
    },
    {
      "title": "Checklist de TLS",
      "prompt": "Monte uma checklist de validação TLS para uma API pública.",
      "expectedAnswer": "SNI, SAN, cadeia completa, expiração, issuer confiável, TLS mínimo, alertas, rotação, ausência de --insecure e logs de falhas."
    },
    {
      "title": "Hardening HTTP",
      "prompt": "Escolha 8 controles para endurecer uma API HTTP/HTTPS.",
      "expectedAnswer": "Backend privado, WAF, API Gateway, TLS forte, headers, CORS restrito, autenticação/autorizações, rate limit, logs sanitizados, request ID, policy as code."
    }
  ],
  "challenge": {
    "title": "Publicar e diagnosticar API de pagamentos segura",
    "scenario": "A empresa publicou a API https://api-pagamentos.exemplo.com. Parceiros reclamam de erros 502 e 504. Segurança encontrou CORS amplo, backend público por hostname cloud, certificado expirando em 5 dias, logs com Authorization e ausência de rate limit em endpoints de consulta.",
    "tasks": [
      "Criar matriz de fluxo ponta a ponta.",
      "Priorizar riscos e ações imediatas.",
      "Montar comandos de validação defensiva.",
      "Definir evidências que devem ser coletadas e sanitizadas.",
      "Propor estado final seguro."
    ],
    "rubric": [
      "Prioriza backend público e logs com token como riscos altos",
      "Separa disponibilidade de segurança",
      "Usa status codes e logs para investigar 502/504",
      "Inclui TLS, CORS, rate limit, WAF/API Gateway e observabilidade",
      "Propõe validação pós-correção"
    ]
  },
  "commentedSolution": {
    "summary": "A solução deve tratar o problema como incidente misto: disponibilidade e exposição. Primeiro, coletar request IDs, logs e health checks para 502/504. Em paralelo, bloquear acesso direto ao backend, sanitizar logs, renovar certificado, restringir CORS e implantar rate limit.",
    "steps": [
      "Confirmar DNS, borda esperada e backend público indevido.",
      "Coletar exemplos de 502/504 com timestamp e request ID.",
      "Verificar health checks, timeout, conectividade e logs do gateway/backend.",
      "Restringir backend para aceitar apenas origem do gateway/load balancer.",
      "Remover Authorization/cookies de logs e rotacionar segredos potencialmente expostos.",
      "Renovar certificado e criar alerta de expiração.",
      "Trocar CORS amplo por allowlist explícita de origens confiáveis.",
      "Adicionar rate limit e alertas para abuso.",
      "Validar com curl, DevTools, logs, traces e matriz de controles."
    ],
    "finalAnswer": "Uma API segura precisa funcionar e também resistir a abuso. A correção final deve deixar a API atrás de WAF/API Gateway, com backend privado, TLS válido, CORS restrito, logs sanitizados, autenticação/autorização claras, rate limit, observabilidade e evidências versionadas."
  },
  "glossary": [
    {
      "term": "API Gateway",
      "definition": "Componente que publica, roteia, autentica, limita, observa e governa APIs."
    },
    {
      "term": "WAF",
      "definition": "Firewall de aplicação web que aplica regras HTTP para reduzir ataques comuns e abuso."
    },
    {
      "term": "Correlation ID",
      "definition": "Identificador usado para seguir uma requisição por múltiplos componentes."
    },
    {
      "term": "Backend privado",
      "definition": "Serviço interno não acessível diretamente pela Internet."
    },
    {
      "term": "CORS",
      "definition": "Mecanismo de navegador que controla leitura de respostas entre origens diferentes."
    },
    {
      "term": "Hardening",
      "definition": "Redução de superfície de ataque por configuração mínima, controles e validações."
    },
    {
      "term": "Trace distribuído",
      "definition": "Registro de uma transação passando por múltiplos serviços, com tempos e dependências."
    },
    {
      "term": "Rate limit",
      "definition": "Limite de requisições por cliente, token, IP, rota ou janela temporal."
    }
  ],
  "references": [
    "RFC 9110 — HTTP Semantics",
    "RFC 9112 — HTTP/1.1",
    "RFC 8446 — TLS 1.3",
    "OWASP API Security Top 10",
    "OWASP Secure Headers Project",
    "OWASP Cheat Sheet Series — REST Security, TLS, Logging, CORS e Session Management"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e IaC",
      "reason": "A publicação segura de APIs deve ser automatizada e revisada por pipeline."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "OIDC/OAuth2",
      "reason": "APIs modernas dependem de identidade, tokens, escopos e claims."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 8",
      "reason": "Portas, TCP, UDP, NAT e firewall stateful sustentam o acesso HTTP/HTTPS."
    }
  ],
  "progressRules": {
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "anyOf": [
          "quizScoreAtLeast",
          "checklistDone"
        ]
      },
    "minimumQuizScore": 70,
    "estimatedXp": 290,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "9.1"
    ]
  }
};
