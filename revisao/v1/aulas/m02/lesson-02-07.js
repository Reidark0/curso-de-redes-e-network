export const lesson0207 = {
  "id": "2.7",
  "moduleId": "m02",
  "order": 7,
  "title": "Camadas 5, 6 e 7 — Sessão, Apresentação e Aplicação",
  "subtitle": "Onde a comunicação deixa de ser só entrega de pacotes e passa a envolver sessões, formatos, criptografia, protocolos de aplicação e APIs.",
  "duration": "65-90 min",
  "estimatedStudyTimeMinutes": 90,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 205,
  "tags": [
    "redes",
    "modelo osi",
    "camada 5",
    "camada 6",
    "camada 7",
    "sessão",
    "apresentação",
    "aplicação",
    "http",
    "tls",
    "dns",
    "api",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 apresentou o Modelo OSI como método de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "A aula 2.2 explicou encapsulamento, desencapsulamento e PDUs."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.6",
      "reason": "A aula 2.6 explicou TCP, UDP, portas e conexões, que sustentam muitos protocolos de aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.3",
      "reason": "A aula 0.3 explicou codificações como UTF-8 e Base64, essenciais para entender apresentação de dados."
    }
  ],
  "objectives": [
    "Explicar o papel das Camadas 5, 6 e 7 no Modelo OSI.",
    "Diferenciar sessão, apresentação e aplicação sem decorar nomes vazios.",
    "Relacionar TLS, codificação, serialização, HTTP, DNS, APIs e autenticação com as camadas superiores.",
    "Diagnosticar quando a rede funciona, mas a aplicação, o certificado, o formato ou a sessão falha.",
    "Entender riscos de segurança em TLS, headers, cookies, tokens, dados codificados, logs e APIs.",
    "Coletar evidências defensivas de aplicação com comandos seguros e interpretação por camadas."
  ],
  "learningOutcomes": [
    "Dado um erro de acesso a sistema, o aluno separa falha de TCP, TLS, HTTP, DNS, autenticação e autorização.",
    "Dado um output de curl ou navegador, o aluno identifica evidências de camada de aplicação e apresentação.",
    "Dado um token, cookie ou payload Base64, o aluno entende que representação não significa proteção criptográfica.",
    "Dado um cenário de API em cloud, o aluno explica o papel de DNS, TCP, TLS, HTTP, gateway, sessão e identidade.",
    "Dado um alerta de segurança, o aluno sabe procurar evidências em logs de aplicação, proxy, WAF e IAM sem executar ataques."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Até a Camada 4, a rede entrega bytes à porta certa. Muitos incidentes reais começam depois disso: o ping responde, a rota existe, a porta 443 abre, mas o usuário vê certificado inválido, erro de login, JSON malformado, HTTP 500, CORS bloqueando a aplicação, cookie ausente ou token recusado.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma API interna está inacessível para uma pipeline. O host resolve DNS, conecta em TCP/443 e recebe resposta do servidor, mas a pipeline falha com erro de certificado ou HTTP 401. Se você parar na Camada 4, vai concluir que \"a rede está funcionando\" e encerrar a investigação. A rede funciona; o problema está em TLS, sessão, autenticação, autorização, formato do payload ou política de aplicação.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Sem separar sessão, apresentação e aplicação, o diagnóstico fica raso: o técnico testa ping e porta e declara \"rede ok\", o desenvolvedor diz \"é rede\", e quem vê 401 ou 403 trata como indisponibilidade. Cada área descreve o mesmo sintoma com outra linguagem. As camadas superiores dão quatro perguntas para separar o problema:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sessão:</strong> quem está conversando, por quanto tempo, com qual contexto, cookie, token, estado ou negociação?</li>\n    <li><strong>Apresentação:</strong> os dados estão no formato certo, codificados corretamente, criptografados, comprimidos ou serializados como esperado?</li>\n    <li><strong>Aplicação:</strong> o protocolo de aplicação entende a requisição, o endpoint existe, o método é aceito e a resposta tem significado?</li>\n    <li><strong>Segurança:</strong> o certificado é confiável, o token é válido, a política permite, o WAF não bloqueou e os logs confirmam?</li>\n  </ul>\n  <p>Essas camadas não substituem IP, TCP ou UDP: dependem deles. Elas explicam por que \"consegui conectar\" não significa \"o sistema funcionou\".</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> a Camada 5 (sessão) organiza sessões e o contexto da comunicação; a Camada 6 (apresentação) trata representação, codificação, serialização, compressão e criptografia dos dados; a Camada 7 (aplicação) define os protocolos e as regras de interação usados diretamente pelas aplicações.</div>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Camada</th><th>O que trata</th><th>Exemplos</th><th>Sintoma típico de falha</th></tr></thead>\n    <tbody>\n      <tr><td>5 — Sessão</td><td>Estado e continuidade lógica da conversa</td><td>Login, cookie de sessão, token, tempo de expiração</td><td>Usuário \"cai\" do sistema, 401 depois que a sessão ou o token expira</td></tr>\n      <tr><td>6 — Apresentação</td><td>Como os bytes viram dados compreensíveis e protegidos</td><td>UTF-8, Base64, JSON, compressão, TLS</td><td>Certificado inválido, caracteres trocados, JSON que o servidor não consegue interpretar</td></tr>\n      <tr><td>7 — Aplicação</td><td>Comandos, respostas e erros do protocolo</td><td>HTTP (método, path, headers, status), DNS, SMTP, SSH, APIs</td><td>404, 403, 500, rota de API ausente, método não aceito</td></tr>\n    </tbody>\n  </table></div>\n  <p>Na internet real, essas funções se misturam. O OSI não descreve perfeitamente a pilha TCP/IP: TLS pode ser visto como apresentação, porque criptografa e negocia parâmetros de segurança, mas na pilha TCP/IP fica entre o transporte e a aplicação. Uma única requisição HTTP pode carregar JSON em UTF-8, usar TLS, manter sessão com cookie, enviar token no header <code>Authorization</code>, negociar formato por <code>Content-Type</code>, controlar cache e responder 200, 301, 401, 403, 404 ou 500. O valor do OSI aqui não é traçar uma fronteira perfeita, e sim ensinar a perguntar: em que nível o problema aparece?</p>\n  <div class=\"callout warning\"><strong>O que cada evidência não prova:</strong>\n    <ul>\n      <li>TLS válido não garante que a aplicação é segura.</li>\n      <li>HTTP 200 não garante que o resultado de negócio está correto.</li>\n      <li>Token válido não significa autorização para todas as ações.</li>\n    </ul>\n    A regra vale nos dois sentidos: não declare problema de aplicação antes de testar DNS, rota, porta e TLS.</div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Num acesso HTTPS a uma API, as funções superiores aparecem em sequência. Cada etapa tem uma falha típica, e cada falha deixa uma evidência diferente.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>#</th><th>O que acontece</th><th>Falha típica</th></tr></thead>\n    <tbody>\n      <tr><td>1</td><td>O cliente resolve o nome da API por DNS.</td><td>Nome não resolve ou aponta para o destino errado.</td></tr>\n      <tr><td>2</td><td>O cliente estabelece TCP com a porta de destino, normalmente 443.</td><td>Timeout ou recusa: volte às Camadas 3 e 4.</td></tr>\n      <tr><td>3</td><td>O cliente inicia TLS, valida o certificado, negocia parâmetros e estabelece o canal criptografado.</td><td>Certificado expirado, CA não confiável, SNI incorreto, nome fora do SAN ou inspeção corporativa mal configurada.</td></tr>\n      <tr><td>4</td><td>O cliente monta a requisição HTTP: método, URL, headers, cookies, token, <code>Content-Type</code> e corpo.</td><td>Header ausente, payload inválido, encoding errado ou token expirado.</td></tr>\n      <tr><td>5</td><td>Proxy, WAF ou API gateway aplicam política: rota, quota, assinatura, token, tamanho e padrões de payload.</td><td>Bloqueio 403, rate limit 429, rota não publicada (404) ou regra mal calibrada.</td></tr>\n      <tr><td>6</td><td>O servidor interpreta o corpo (por exemplo, JSON em UTF-8) e valida sessão, cookie, token, claim, escopo ou política.</td><td>401 (autenticação) ou 403 (autorização).</td></tr>\n      <tr><td>7</td><td>A aplicação executa a regra de negócio e responde com status, headers e payload.</td><td>404, 409, 422, 500 ou erro de contrato.</td></tr>\n    </tbody>\n  </table></div>\n  <p>Proxy, WAF, API gateway e logs podem registrar, transformar, bloquear ou enriquecer a transação em qualquer ponto. Certificado expirado não é falha de roteamento. HTTP 401 não é porta fechada. JSON inválido não é problema de cabo. Erro de CORS não é ausência de internet. Essa separação reduz o retrabalho entre redes, segurança, plataforma e desenvolvimento.</p>\n  <h3>Campos que você lê no diagnóstico</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Campo</th><th>Para que serve</th><th>Observação de segurança</th></tr></thead>\n    <tbody>\n      <tr><td>Método HTTP</td><td>Indica a ação desejada: GET, POST, PUT, DELETE.</td><td>Método inesperado pode indicar erro de cliente, contrato quebrado ou tentativa indevida.</td></tr>\n      <tr><td>Status HTTP (3 dígitos)</td><td>Informa o resultado: 200, 301, 401, 403, 404, 500.</td><td>Qualquer status prova que um componente HTTP respondeu: a rede entregou a requisição.</td></tr>\n      <tr><td><code>Content-Type</code></td><td>Indica o formato do corpo, como <code>application/json</code> ou <code>text/html</code>.</td><td>Formato incorreto pode quebrar a validação ou abrir risco se a aplicação confiar demais no cliente.</td></tr>\n      <tr><td><code>Authorization</code></td><td>Transporta credenciais ou tokens.</td><td>Nunca deve aparecer em logs, prints, tickets ou evidências sem sanitização.</td></tr>\n      <tr><td>Subject/SAN do certificado</td><td>Vincula o certificado aos nomes de domínio esperados.</td><td>Nome incorreto, cadeia inválida ou expiração causam falha e risco de confiança.</td></tr>\n    </tbody>\n  </table></div>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Achar que TCP/443 aberto prova que a aplicação funciona.</strong> O teste de porta é o mais fácil, então o incidente é fechado cedo e volta. Valide também certificado, status HTTP, headers, payload e logs de aplicação.</li>\n      <li><strong>Tratar 401 e 403 como queda de rede.</strong> O usuário relata \"sistema fora\" e o time errado investiga por horas. 401 indica autenticação; 403 indica autorização ou política negada.</li>\n      <li><strong>Ignorar o certificado na pipeline com opção insecure (<code>curl -k</code>).</strong> Resolve o erro na hora, mas mascara interceptação ou configuração errada. Corrija CA, cadeia, SAN, SNI e renovação.</li>\n    </ul>\n  </div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>As camadas superiores aparecem em vários componentes além do servidor final, e cada um pode ser a origem da resposta que você vê:</p>\n  <ul>\n    <li><strong>Navegador ou cliente:</strong> monta a requisição, mantém cookies, valida o certificado e interpreta a resposta.</li>\n    <li><strong>Proxy corporativo:</strong> registra, filtra, autentica ou inspeciona o tráfego conforme a política.</li>\n    <li><strong>WAF:</strong> avalia padrões de requisição e pode bloquear tráfego de aplicação.</li>\n    <li><strong>Load balancer:</strong> termina TLS, distribui tráfego e faz health checks.</li>\n    <li><strong>API gateway:</strong> valida rotas, quotas, tokens, headers e versões de API.</li>\n    <li><strong>IdP/IAM:</strong> emite tokens, valida sessão e aplica políticas de acesso.</li>\n    <li><strong>Aplicação:</strong> interpreta método, path, payload, regras de negócio e autorização.</li>\n  </ul>\n  <p>Em cloud, esses elementos costumam ser serviços gerenciados. Em DevSecOps, viram configuração declarativa em Terraform, Helm, Kubernetes Ingress, Gateway API, annotations, secrets, certificados e policies.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Imagine uma reunião corporativa. As camadas inferiores são o prédio, a sala, a porta e a entrega das pessoas ao local correto. A Camada 5 é a organização da reunião: quem participa, quando começa, quando termina e qual contexto está mantido. A Camada 6 é o idioma, o formato dos documentos e a criptografia das mensagens. A Camada 7 é a pauta, as regras da conversa e as decisões tomadas.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> na rede real essas funções se misturam (TLS, HTTP, cookies e tokens não ficam em caixas isoladas), então o diagnóstico precisa de evidência concreta.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Você abre um site no navegador. O DNS resolve o nome, o TCP conecta na porta 443 e o TLS valida o certificado. Depois disso, o navegador envia uma requisição HTTP. O servidor responde HTML, CSS, JavaScript ou JSON. Se o certificado estiver vencido, o navegador alerta antes de confiar no canal. Se o servidor responder 404, a rede funcionou, mas o recurso não foi encontrado. Se responder 401, a aplicação exige autenticação. Se responder 500, há erro interno no serviço.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Na empresa, o usuário acessa um portal interno passando por proxy, firewall, load balancer, WAF, aplicação e provedor de identidade. Ele reclama que \"a rede caiu\". O analista verifica que o TCP/443 estabelece e o TLS está válido, mas o WAF bloqueou a requisição por header ausente ou payload fora do padrão. O problema é de aplicação/política, não de cabo, rota ou porta.</p>\n  <p>Essa distinção muda a equipe envolvida, a evidência coletada e a solução: ajustar uma regra de WAF, corrigir o cliente, renovar o certificado, ajustar o cookie SameSite, sincronizar o relógio do IdP (SSO com SAML, OAuth2 e OIDC depende de relógio, cookies e claims corretos) ou revisar escopos de token.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, um acesso a API pode passar por DNS gerenciado, CDN, WAF, load balancer, API gateway, serviço de identidade, service mesh e backend em container. A VPC/VNet, as subnets e os security groups podem estar corretos, e a API falhar por certificado errado, domínio fora do SAN, rota de API ausente, authorizer mal configurado, token sem claim ou payload maior que o limite do gateway.</p>\n  <p>Essas camadas também custam: logs de WAF, API gateway e load balancer, certificados gerenciados e observabilidade geram cobrança recorrente de armazenamento e retenção.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em pipelines, as camadas superiores aparecem quando um runner acessa registry, API de cloud, Vault, GitHub, Kubernetes API Server ou um endpoint interno. O TCP pode abrir e o job falhar por certificado não confiável, proxy corporativo, token expirado, escopo insuficiente, JSON inválido, erro 429 de rate limit ou política de admission controller.</p>\n  <p>Pipelines maduros validam certificados, registram as respostas HTTP, não imprimem tokens, usam secrets corretamente e distinguem erro de rede de erro de autenticação.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m02l07-title m02l07-desc\">\n    <title id=\"m02l07-title\">Camadas 5, 6 e 7 no acesso a uma API HTTPS</title>\n    <desc id=\"m02l07-desc\">O diagrama mostra cliente, TLS, sessão, formato de dados, HTTP, API gateway, identidade e aplicação.</desc>\n    <defs>\n      <marker id=\"m02l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"130\" width=\"160\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"120\" y=\"165\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"120\" y=\"192\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cookie/token</text>\n    <text x=\"120\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">requisição HTTP</text>\n    <rect x=\"280\" y=\"75\" width=\"160\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"360\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Camada 6</text>\n    <text x=\"360\" y=\"132\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TLS / formato</text>\n    <rect x=\"280\" y=\"190\" width=\"160\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"360\" y=\"223\" text-anchor=\"middle\" class=\"svg-label\">Camada 5</text>\n    <text x=\"360\" y=\"247\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sessão / contexto</text>\n    <rect x=\"525\" y=\"130\" width=\"185\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"617\" y=\"165\" text-anchor=\"middle\" class=\"svg-label\">WAF / API Gateway</text>\n    <text x=\"617\" y=\"192\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">headers, rota, quota</text>\n    <text x=\"617\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">validação de token</text>\n    <rect x=\"790\" y=\"130\" width=\"155\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"867\" y=\"165\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"867\" y=\"192\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">HTTP / JSON</text>\n    <text x=\"867\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">regra de negócio</text>\n    <line x1=\"200\" y1=\"180\" x2=\"280\" y2=\"112\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l07-arrow)\"></line>\n    <line x1=\"200\" y1=\"190\" x2=\"280\" y2=\"225\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l07-arrow)\"></line>\n    <line x1=\"440\" y1=\"183\" x2=\"525\" y2=\"183\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l07-arrow)\"></line>\n    <line x1=\"710\" y1=\"183\" x2=\"790\" y2=\"183\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l07-arrow)\"></line>\n    <rect x=\"70\" y=\"330\" width=\"840\" height=\"150\" rx=\"18\" class=\"content-card\"></rect>\n    <text x=\"490\" y=\"365\" text-anchor=\"middle\" class=\"svg-label\">Perguntas de diagnóstico nas camadas superiores</text>\n    <text x=\"110\" y=\"400\" class=\"svg-label svg-label--small\">Camada 5: a sessão existe, expirou ou perdeu contexto?</text>\n    <text x=\"110\" y=\"428\" class=\"svg-label svg-label--small\">Camada 6: TLS, codificação, compressão ou serialização estão corretos?</text>\n    <text x=\"110\" y=\"456\" class=\"svg-label svg-label--small\">Camada 7: método, path, header, payload, status HTTP e autorização fazem sentido?</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Modelo mental:</strong> TCP entrega bytes a uma porta; TLS protege o canal; o encoding define como bytes viram texto; HTTP define método, headers e resposta; sessão e identidade definem contexto e permissão.</li>\n    <li><strong>O que lembrar:</strong> porta aberta não prova TLS válido, payload correto, sessão ativa ou autorização.</li>\n    <li><strong>Erro comum:</strong> chamar qualquer erro HTTP, TLS ou de autenticação de \"problema de rede\". 401 é autenticação; 403 é autorização ou política.</li>\n    <li><strong>Uso real:</strong> diagnóstico de sites, APIs, SSO, WAF, proxies, gateways, pipelines e aplicações cloud.</li>\n    <li><strong>Segurança:</strong> tokens, cookies, certificados, headers e logs são ativos e evidências sensíveis; Base64 não protege nada.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você junta as sete camadas num método prático de troubleshooting: um fluxo de diagnóstico completo, da física à aplicação, que transforma sintomas vagos em hipóteses testáveis.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 5",
      "Camada 6",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Aplicação"
    ],
    "relatedProtocols": [
      "HTTP",
      "HTTPS",
      "TLS",
      "DNS",
      "SMTP",
      "SSH",
      "SAML",
      "OIDC",
      "OAuth2",
      "gRPC"
    ],
    "dependsOn": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "TCP",
      "UDP",
      "portas",
      "UTF-8",
      "Base64"
    ],
    "enables": [
      "APIs",
      "web",
      "SSO",
      "WAF",
      "API Gateway",
      "proxy",
      "observabilidade",
      "IAM",
      "DevSecOps"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Porta abre, mas navegador mostra erro de certificado.",
      "curl retorna 401, 403, 404, 500 ou 502.",
      "Pipeline falha em registry ou API com erro TLS.",
      "Aplicação funciona no navegador, mas falha no script.",
      "Usuário autentica, mas não acessa recurso."
    ],
    "diagnosticQuestions": [
      "DNS resolve para o destino esperado?",
      "TCP conecta na porta correta?",
      "TLS valida certificado e nome?",
      "Qual código HTTP retorna?",
      "Headers e Content-Type estão corretos?",
      "Token, cookie ou sessão estão válidos?",
      "WAF, proxy ou API gateway registrou bloqueio?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection exemplo.com -Port 443",
        "purpose": "Validar conectividade TCP até a porta 443.",
        "expectedObservation": "TcpTestSucceeded True quando a conexão TCP abre.",
        "interpretation": "Se falhar, investigar transporte antes de TLS/HTTP."
      },
      {
        "platform": "Windows",
        "command": "curl.exe -I https://exemplo.com",
        "purpose": "Observar headers e status HTTP sem baixar o corpo completo.",
        "expectedObservation": "Status HTTP e headers de resposta.",
        "interpretation": "Ajuda a diferenciar HTTP 200, 301, 401, 403, 404 e 500."
      },
      {
        "platform": "Linux",
        "command": "curl -vkI https://exemplo.com",
        "purpose": "Ver detalhes de TLS e headers HTTP em diagnóstico controlado.",
        "expectedObservation": "Negociação TLS, certificado apresentado e status HTTP.",
        "interpretation": "Use -k apenas para diagnóstico; não transforme em prática operacional."
      },
      {
        "platform": "Linux",
        "command": "openssl s_client -connect exemplo.com:443 -servername exemplo.com </dev/null",
        "purpose": "Inspecionar certificado e cadeia TLS.",
        "expectedObservation": "Certificado, validade, subject, issuer e verificação.",
        "interpretation": "Erro de certificado é camada de apresentação/segurança, não necessariamente rota."
      },
      {
        "platform": "Cisco IOS",
        "command": "show logging | include SSL|HTTP|AUTH|DENY",
        "purpose": "Buscar evidências em equipamentos que registram inspeção, proxy ou negação.",
        "expectedObservation": "Eventos relacionados a sessão, aplicação ou bloqueios.",
        "interpretation": "A disponibilidade de logs depende do equipamento e configuração."
      }
    ],
    "decisionTree": [
      {
        "if": "TCP/443 não conecta",
        "then": "Voltar para Camada 3/4: rota, firewall, listener ou ACL."
      },
      {
        "if": "TCP conecta, mas TLS falha",
        "then": "Verificar certificado, SNI, cadeia, validade, CA e inspeção corporativa."
      },
      {
        "if": "TLS funciona, mas HTTP retorna 401",
        "then": "Investigar autenticação, token, sessão ou credenciais."
      },
      {
        "if": "HTTP retorna 403",
        "then": "Investigar autorização, WAF, API gateway, escopo, grupo ou política."
      },
      {
        "if": "HTTP retorna 500",
        "then": "Coletar logs da aplicação, backend, dependências e correlação por request ID."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Validar certificados e não ignorar erros TLS em produção.",
      "Sanitizar tokens, cookies, headers e payloads antes de anexar evidências.",
      "Usar HTTPS com configurações modernas e renovação automatizada.",
      "Registrar request IDs e eventos úteis sem vazar segredos.",
      "Aplicar menor privilégio em tokens, escopos e sessões."
    ],
    "badPractices": [
      "Usar curl -k como solução permanente.",
      "Confiar apenas em WAF sem corrigir a aplicação."
    ],
    "commonErrors": [
      "Confundir encoding com criptografia: Base64 é reversível por qualquer pessoa.",
      "Não correlacionar logs de WAF, IAM e aplicação.",
      "Não controlar expiração e rotação de certificados."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição de token em logs",
        "description": "Headers, cookies ou payloads sensíveis aparecem em logs ou evidências.",
        "defensiveExplanation": "O risco é roubo de sessão ou reuso indevido de credenciais.",
        "mitigation": "Mascaramento, retenção mínima, rotação, DLP e menor privilégio."
      },
      {
        "name": "TLS mal validado",
        "description": "Clientes ignoram validação de certificado ou aceitam CA incorreta.",
        "defensiveExplanation": "Isso enfraquece a garantia de identidade do servidor.",
        "mitigation": "Corrigir cadeia, SNI, SAN e CA corporativa; manter inventário de certificados com renovação automática e monitoramento de validade."
      },
      {
        "name": "CORS permissivo",
        "description": "Aplicação permite origins amplas e credenciais indevidas.",
        "defensiveExplanation": "Pode ampliar exposição em aplicações web.",
        "mitigation": "Origins explícitas, revisão de credenciais e testes defensivos."
      },
      {
        "name": "WAF mal calibrado",
        "description": "Regras do WAF bloqueiam requisições legítimas com 403 ou deixam passar payloads perigosos.",
        "defensiveExplanation": "O erro de calibração causa indisponibilidade aparente para usuários legítimos ou exposição da aplicação.",
        "mitigation": "Começar em modo monitorado, fazer tuning, testes controlados e revisão periódica das regras."
      },
      {
        "name": "Erro verboso",
        "description": "Aplicação retorna stack trace, query, path interno ou segredo em resposta.",
        "defensiveExplanation": "Detalhes internos ajudam reconhecimento por terceiros.",
        "mitigation": "Mensagens genéricas ao usuário e logs detalhados apenas em ambiente protegido."
      }
    ],
    "monitoring": [
      "Logs de WAF, proxy, gateway, aplicação e IAM.",
      "Taxa de 401, 403, 404, 429 e 5xx: erros nas camadas superiores derrubam o serviço sem gerar tráfego anormal na rede.",
      "Falhas TLS e certificados próximos do vencimento.",
      "Uso anormal de tokens ou sessões."
    ],
    "hardening": [
      "TLS moderno e certificados gerenciados.",
      "Headers de segurança adequados.",
      "Validação de entrada e Content-Type.",
      "Sessões com expiração e proteção de cookies.",
      "Rate limiting e autenticação forte."
    ],
    "detectionIdeas": [
      "Aumento de 401 pode indicar credenciais expiradas ou tentativa indevida.",
      "Aumento de 403 pode indicar mudança de política, WAF ou abuso.",
      "Picos de 5xx podem indicar falha de backend.",
      "Erros TLS em massa podem indicar certificado expirado."
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma porta aberta não significa que a aplicação está saudável?",
      "hints": [
        "Pense no que vem depois do TCP.",
        "TLS, HTTP e autenticação ainda podem falhar."
      ],
      "expectedIdeas": [
        "transporte",
        "TLS",
        "HTTP",
        "sessão",
        "autorização"
      ],
      "explanation": "Camada 4 entrega bytes ao serviço; as camadas superiores dão significado, segurança, formato e autorização."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário faz login no portal, navega normalmente por um tempo e de repente toda requisição passa a retornar 401, sem nenhuma mudança de rede. Que hipóteses e evidências você procuraria antes de abrir chamado para a equipe de redes?",
      "hints": [
        "Funcionou antes: o que tem prazo de validade?",
        "Pense em sessão, cookie, token e relógio do IdP."
      ],
      "expectedIdeas": [
        "sessão expirada",
        "token expirado",
        "cookie ausente ou bloqueado (SameSite)",
        "relógio do IdP dessincronizado",
        "logs do IdP e da aplicação"
      ],
      "explanation": "401 depois de um período funcionando aponta para a Camada 5: o contexto (sessão ou token) expirou ou deixou de ser enviado. A rede está entregando as respostas; a evidência está no IdP, nos cookies e nos logs de autenticação."
    },
    {
      "type": "cenário real",
      "question": "Uma pipeline acessa uma API interna e falha por certificado. Como você explicaria isso para redes, plataforma e segurança?",
      "hints": [
        "Separe TCP de TLS.",
        "Pense em CA, SAN, SNI e renovação."
      ],
      "expectedIdeas": [
        "TCP funciona",
        "TLS falha",
        "cadeia de confiança",
        "certificado",
        "automação"
      ],
      "explanation": "A explicação correta evita liberar regras desnecessárias de firewall e direciona a correção para certificado/confiança."
    }
  ],
  "quiz": [
    {
      "id": "q2.7.1",
      "question": "Qual é a melhor descrição para as camadas superiores do OSI no diagnóstico prático?",
      "options": [
        "Elas decidem o caminho dos pacotes entre redes diferentes.",
        "Elas tratam sessão, representação dos dados e protocolos de aplicação.",
        "Elas entregam os bytes à porta correta do serviço.",
        "Elas definem o endereçamento físico (MAC) no segmento local."
      ],
      "answer": 1,
      "explanation": "Sessão, apresentação e aplicação organizam contexto, formato, TLS, HTTP e APIs. Caminho entre redes é Camada 3, entrega à porta é Camada 4 e MAC é Camada 2.",
      "topic": "modelo osi",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.7.2",
      "question": "TCP/443 conecta, mas o navegador alerta certificado expirado. Onde investigar primeiro?",
      "options": [
        "Camada 4: porta 443 bloqueada no firewall",
        "Camada 3: rota até o servidor",
        "Camada de apresentação/TLS: validade e cadeia do certificado",
        "Camada 7: permissão do usuário na aplicação"
      ],
      "answer": 2,
      "explanation": "Se o TCP/443 conectou, porta e rota funcionam. O alerta de certificado expirado aponta para a validação TLS; autorização só entraria depois de um canal TLS confiável.",
      "topic": "tls",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.7.3",
      "question": "Por que Base64 não deve ser tratado como proteção de segredo?",
      "options": [
        "Porque é apenas uma representação reversível de bytes em texto, sem chave.",
        "Porque usa uma chave curta que pode ser quebrada por força bruta.",
        "Porque protege o dado em trânsito, mas não em repouso.",
        "Porque comprime o dado e perde parte da informação."
      ],
      "answer": 0,
      "explanation": "Base64 codifica, não criptografa: não há chave, e qualquer pessoa decodifica o valor. Não protege confidencialidade nem em trânsito nem em repouso.",
      "topic": "encoding",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q2.7.4",
      "question": "Uma API retorna HTTP 401. Qual hipótese é mais provável?",
      "options": [
        "Erro interno no backend da aplicação.",
        "Porta 443 fechada no firewall.",
        "Recurso inexistente no servidor.",
        "Falha de autenticação: credencial ausente, inválida ou expirada."
      ],
      "answer": 3,
      "explanation": "401 está ligado a autenticação, e o fato de haver resposta HTTP mostra que a rede entregou a requisição. Porta fechada não geraria resposta HTTP; recurso inexistente é 404 e erro interno é 500.",
      "topic": "http",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q2.7.5",
      "question": "Qual diferença prática entre 401 e 403?",
      "options": [
        "401 aponta autorização negada; 403 aponta credencial ausente.",
        "401 aponta autenticação; 403 aponta autorização ou política negada.",
        "401 indica recurso inexistente; 403 indica erro interno do servidor.",
        "Ambos indicam que a conexão TCP foi recusada."
      ],
      "answer": 1,
      "explanation": "401: o serviço não sabe quem você é (credencial ausente ou inválida). 403: sabe, mas a política nega. A distinção indica se você aciona IAM/credencial ou permissão, WAF e gateway.",
      "topic": "status http",
      "difficulty": "iniciante-intermediário",
      "type": "comparação"
    },
    {
      "id": "q2.7.6",
      "question": "Em uma pipeline, usar curl -k permanentemente para resolver erro TLS é uma má prática porque:",
      "options": [
        "Faz o servidor deixar de exigir autenticação.",
        "Desativa a criptografia e envia os dados em texto claro.",
        "Ignora a validação do certificado e pode mascarar interceptação ou erro de confiança.",
        "Faz o curl ignorar o status HTTP da resposta."
      ],
      "answer": 2,
      "explanation": "Com -k o canal continua criptografado, mas o cliente deixa de verificar a identidade do servidor. Use só em diagnóstico controlado; a correção é ajustar CA, cadeia, SAN, SNI ou renovação.",
      "topic": "pipeline",
      "difficulty": "intermediário",
      "type": "devsecops"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.7.1",
      "front": "O que a Camada 5 representa no OSI?",
      "back": "Sessão e contexto de comunicação, como manutenção de estado, login, cookies e continuidade lógica da conversa.",
      "tags": [
        "osi",
        "sessão"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.7.2",
      "front": "O que a Camada 6 representa?",
      "back": "Apresentação dos dados: codificação, serialização, compressão e criptografia, como UTF-8, JSON e TLS.",
      "tags": [
        "osi",
        "apresentação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.7.3",
      "front": "O que a Camada 7 representa?",
      "back": "Protocolos e regras de aplicação, como HTTP, DNS, SMTP, SSH, APIs e códigos de resposta.",
      "tags": [
        "osi",
        "aplicação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.7.7",
      "front": "HTTP 200 garante que a operação deu certo?",
      "back": "Não. Indica que a requisição HTTP foi processada; o resultado de negócio ainda pode estar errado. Confira payload e logs da aplicação.",
      "tags": [
        "http",
        "troubleshooting"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc2.7.8",
      "front": "Para que serve o SAN de um certificado?",
      "back": "Lista os nomes de domínio que o certificado cobre. Se o nome acessado não estiver no SAN, a validação TLS falha mesmo com TCP/443 aberto.",
      "tags": [
        "tls",
        "certificado"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc2.7.6",
      "front": "HTTP 403 normalmente indica o quê?",
      "back": "Acesso negado por autorização, WAF, API gateway ou política, mesmo que a aplicação esteja respondendo.",
      "tags": [
        "http",
        "segurança"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.7.2",
      "type": "diagnóstico",
      "prompt": "Classifique os sintomas: timeout TCP, certificado expirado, HTTP 401, JSON inválido e HTTP 500.",
      "expectedAnswer": "Timeout TCP: transporte/rede; certificado expirado: apresentação/TLS; 401: autenticação; JSON inválido: apresentação/aplicação; 500: aplicação/backend.",
      "explanation": "A classificação orienta a equipe e evidência correta."
    },
    {
      "id": "ex2.7.3",
      "type": "segurança",
      "prompt": "Liste três cuidados ao anexar evidências de curl em um ticket.",
      "expectedAnswer": "Remover tokens/cookies, ocultar dados pessoais, evitar payloads sensíveis, mascarar headers Authorization, manter request ID se necessário.",
      "explanation": "Evidência técnica pode conter credenciais e dados protegidos."
    },
    {
      "id": "ex2.7.4",
      "type": "cloud",
      "prompt": "Uma API em cloud retorna 403 atrás de um API Gateway. Cite quatro hipóteses.",
      "expectedAnswer": "Token sem escopo, authorizer negando, WAF bloqueando, rota não permitida, API key ausente, resource policy negando origem ou método não autorizado.",
      "explanation": "403 indica resposta de política/aplicação, não simples falha de link."
    }
  ],
  "challenge": {
    "title": "Diagnóstico de API que conecta, mas não autentica",
    "scenario": "Uma aplicação interna acessada por navegador funciona para alguns usuários, mas falha para uma pipeline. TCP/443 conecta, DNS resolve e o certificado parece válido no navegador. A pipeline recebe 401 ou erro TLS dependendo do ambiente.",
    "tasks": [
      "Criar uma matriz por camada para TCP, TLS, HTTP, sessão, token e autorização.",
      "Listar evidências que devem ser coletadas sem vazar segredo.",
      "Separar hipóteses de redes, plataforma, segurança, IAM e aplicação.",
      "Propor correções seguras sem usar bypass permanente de TLS."
    ],
    "constraints": [
      "Não usar tokens reais no relatório.",
      "Não recomendar curl -k como solução permanente.",
      "Não atribuir causa única sem evidência.",
      "Incluir pelo menos uma hipótese de certificado e uma de IAM."
    ],
    "expectedDeliverables": [
      "Matriz por camada",
      "Lista de comandos seguros",
      "Tabela de hipóteses",
      "Plano de validação",
      "Riscos de segurança"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação por camadas",
        "points": 30,
        "description": "Diferencia transporte, TLS, HTTP, sessão, autenticação e autorização."
      },
      {
        "criterion": "Segurança das evidências",
        "points": 25,
        "description": "Remove tokens, cookies e dados sensíveis."
      },
      {
        "criterion": "Hipóteses completas",
        "points": 25,
        "description": "Inclui certificado, token, escopo, WAF, gateway e aplicação."
      },
      {
        "criterion": "Correção operacional",
        "points": 20,
        "description": "Propõe correções sustentáveis e não bypasses frágeis."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O primeiro passo é não confundir conectividade com sucesso de aplicação. Se TCP conecta, o problema pode estar acima. Se TLS falha apenas na pipeline, pode haver CA ausente, SNI, proxy corporativo ou cadeia não instalada no ambiente do runner. Se retorna 401, é autenticação; se retorna 403, autorização ou política. Logs de gateway, WAF, IAM e aplicação devem ser correlacionados por request ID.",
    "steps": [
      "Validar DNS e TCP/443.",
      "Validar TLS com SNI e cadeia de confiança.",
      "Coletar status HTTP e headers sanitizados.",
      "Verificar se a pipeline envia token correto sem expor o valor.",
      "Correlacionar logs de IAM, WAF, API gateway e aplicação.",
      "Corrigir CA/certificado, escopos, audience, rota ou política conforme evidência."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar any-any no firewall.",
        "whyItIsWrong": "A porta já conecta; ampliar firewall não resolve TLS, token ou autorização e aumenta risco."
      },
      {
        "answer": "Usar curl -k para sempre.",
        "whyItIsWrong": "Ignora validação TLS e transforma um diagnóstico em vulnerabilidade operacional."
      },
      {
        "answer": "Dizer que 401 é problema de rede.",
        "whyItIsWrong": "401 é resposta de aplicação/autenticação; a rede entregou a resposta."
      }
    ],
    "finalAnswer": "A solução correta separa evidências: transporte funciona, TLS deve ser validado, HTTP deve ser interpretado, autenticação deve ser confirmada sem expor segredo, autorização deve ser verificada por escopos/políticas e logs devem ser correlacionados. A correção provável será CA/certificado no runner, ajuste de token/escopo/audience, regra de WAF/gateway ou configuração da aplicação."
  },
  "glossary": [
    {
      "term": "Sessão",
      "shortDefinition": "Contexto lógico mantido entre cliente e serviço.",
      "longDefinition": "Pode envolver cookies, tokens, identificadores, tempo de expiração e estado de autenticação.",
      "example": "Um login web mantém sessão para evitar pedir credenciais a cada clique.",
      "relatedTerms": [
        "cookie",
        "token",
        "estado"
      ],
      "relatedLessons": [
        "2.7",
        "8.4",
        "10.6"
      ]
    },
    {
      "term": "TLS",
      "shortDefinition": "Protocolo usado para proteger comunicação, validar identidade do servidor e criptografar dados em trânsito.",
      "longDefinition": "TLS negocia parâmetros, usa certificados e cria canal seguro para protocolos como HTTP.",
      "example": "HTTPS normalmente é HTTP sobre TLS.",
      "relatedTerms": [
        "certificado",
        "HTTPS",
        "CA"
      ],
      "relatedLessons": [
        "2.7",
        "8.3",
        "8.4"
      ]
    },
    {
      "term": "HTTP status code",
      "shortDefinition": "Código que indica o resultado de uma requisição HTTP.",
      "longDefinition": "Códigos como 200, 301, 401, 403, 404 e 500 ajudam a diagnosticar aplicação e política.",
      "example": "403 indica acesso negado, não necessariamente rede indisponível.",
      "relatedTerms": [
        "HTTP",
        "API",
        "WAF"
      ],
      "relatedLessons": [
        "2.7",
        "8.1"
      ]
    },
    {
      "term": "Content-Type",
      "shortDefinition": "Header que indica o formato do corpo da mensagem.",
      "longDefinition": "Ajuda cliente e servidor a interpretar dados como JSON, HTML, texto ou binário.",
      "example": "application/json indica corpo JSON.",
      "relatedTerms": [
        "JSON",
        "header",
        "encoding"
      ],
      "relatedLessons": [
        "0.3",
        "2.7",
        "8.2"
      ]
    },
    {
      "term": "WAF",
      "shortDefinition": "Firewall de aplicação web que inspeciona requisições HTTP/HTTPS.",
      "longDefinition": "Pode bloquear padrões suspeitos, impor regras e gerar logs de camada de aplicação.",
      "example": "Um WAF pode retornar 403 para uma requisição que viola política.",
      "relatedTerms": [
        "HTTP",
        "proxy",
        "segurança"
      ],
      "relatedLessons": [
        "2.7",
        "9.6"
      ]
    },
    {
      "term": "API Gateway",
      "shortDefinition": "Componente que publica, roteia, protege e observa APIs.",
      "longDefinition": "Pode validar tokens, limites, rotas, headers e transformar requisições.",
      "example": "Uma rota não publicada no gateway pode retornar 404 mesmo com backend saudável.",
      "relatedTerms": [
        "API",
        "OIDC",
        "WAF"
      ],
      "relatedLessons": [
        "2.7",
        "8.7"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network — Aula 0.3: ASCII, Unicode, UTF-8 e Base64",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para entender codificação e representação."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Aula 2.6: Camada 4 — Transporte",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para portas e conexões antes das camadas superiores."
    },
    {
      "type": "rfc",
      "title": "RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc8446",
      "note": "Referência moderna de TLS."
    },
    {
      "type": "rfc",
      "title": "RFC 9110 — HTTP Semantics",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc9110",
      "note": "Referência para semântica HTTP."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m08",
      "lesson": "kubernetes-ingress-secrets",
      "reason": "Ingress, certificados, secrets e gateways dependem de TLS e HTTP."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m03",
      "lesson": "oidc-saml-sessoes",
      "reason": "OIDC, SAML, tokens e sessões dependem de HTTP, TLS, cookies e redirecionamentos."
    },
    {
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.x",
      "reason": "HTTP, HTTPS, TLS, proxies e APIs serão aprofundados no Módulo 8."
    }
  ],
  "progressRules": {
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
      "2.8"
    ]
  }
};
