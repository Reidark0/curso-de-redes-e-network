export const lesson0906 = {
  "id": "9.6",
  "moduleId": "m09",
  "order": 6,
  "title": "WAF, regras HTTP e proteção de APIs",
  "subtitle": "Entenda por que firewalls de rede não bastam para proteger aplicações web e APIs, como um WAF interpreta tráfego HTTP e como desenhar regras defensivas sem quebrar o negócio.",
  "duration": "125-185 min",
  "estimatedStudyTimeMinutes": 185,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 285,
  "tags": [
    "redes",
    "network",
    "firewall",
    "WAF",
    "HTTP",
    "HTTPS",
    "API",
    "OWASP",
    "API Gateway",
    "rate limiting",
    "DevSecOps",
    "segurança",
    "cloud",
    "troubleshooting",
    "p1-07",
    "firewall-lab-v2-final"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.2",
      "title": "Requisições e respostas: métodos, URLs, headers, body e status codes",
      "reason": "WAF decide com base nos elementos de uma requisição HTTP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.3",
      "title": "HTTPS, TLS, certificados, SNI e cadeia de confiança",
      "reason": "WAF normalmente fica em pontos de TLS termination ou integração com proxy/load balancer."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.5",
      "title": "Proxies, reverse proxies, WAFs e load balancers HTTP",
      "reason": "WAF é uma especialização de inspeção HTTP dentro da arquitetura de publicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.6",
      "title": "APIs REST, JSON, autenticação e contratos",
      "reason": "Proteção de API exige entender endpoints, métodos, contratos, tokens e payloads JSON."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.5",
      "title": "NAT, port forwarding e publicação controlada",
      "reason": "Serviços publicados sem WAF/API Gateway ficam expostos diretamente."
    }
  ],
  "objectives": [
    "Explicar a diferença entre firewall de rede, NGFW, WAF, reverse proxy e API Gateway.",
    "Descrever como um WAF avalia método, host, path, headers, cookies, query string e body HTTP.",
    "Relacionar WAF com OWASP Top 10, OWASP API Security Top 10, virtual patching e defesa em profundidade.",
    "Diferenciar regras gerenciadas, regras customizadas, allowlists, blocklists, rate limiting e bot protection.",
    "Planejar implantação de WAF com TLS termination, logs, modo monitor, tuning, exceções e resposta a falso positivo.",
    "Diagnosticar bloqueios HTTP analisando status code, request ID, regra acionada, logs de WAF e logs de aplicação."
  ],
  "learningOutcomes": [
    "Identificar quando um problema deve ser tratado em firewall L3/L4, WAF L7 ou API Gateway.",
    "Ler uma evidência de WAF e explicar qual parte da requisição disparou a regra.",
    "Desenhar proteção para uma API publicada usando WAF, rate limit, autenticação, contrato e backend privado.",
    "Evitar bypass garantindo que o backend só aceite tráfego vindo da camada de borda autorizada.",
    "Criar um processo seguro para ativar regras em modo monitor, ajustar exceções e migrar para bloqueio.",
    "Explicar por que WAF reduz risco, mas não corrige arquitetura insegura, autorização quebrada ou código vulnerável."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Um firewall tradicional consegue dizer: “este IP pode falar com aquele IP na porta 443”. Isso é essencial, mas não responde perguntas como: o corpo JSON contém um campo inesperado? O parâmetro de busca carrega uma tentativa de injeção? O endpoint administrativo está recebendo força bruta? A origem está chamando a API mil vezes por minuto? O header <code>Host</code> está tentando explorar roteamento indevido?</p>\n  <p>Aplicações web e APIs vivem na camada HTTP. Ali existem métodos, caminhos, headers, cookies, tokens, payloads, status codes, CORS, contratos, versões e identidades. Um <strong>WAF</strong>, Web Application Firewall, surgiu para inspecionar esse nível da conversa.</p>\n  <div class='callout'><strong>Ideia central:</strong> firewall de rede controla caminho e porta; WAF controla parte do comportamento HTTP; API Gateway controla publicação, contrato, autenticação e consumo; nenhum deles substitui código seguro.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No início da Web, muitos controles ficavam no servidor de aplicação e em firewalls de perímetro. À medida que aplicações passaram a receber formulários, cookies, upload, parâmetros dinâmicos e sessões, ataques como SQL injection, cross-site scripting e path traversal se tornaram comuns. Firewalls L3/L4 não enxergavam o significado dessas requisições.</p>\n  <p>Os WAFs apareceram como uma camada intermediária capaz de entender HTTP e aplicar regras. Primeiro, eram appliances na borda do datacenter. Depois, tornaram-se recursos de CDN, balanceadores, reverse proxies, cloud providers, ingress controllers e API gateways.</p>\n  <p>Com microsserviços, APIs e DevSecOps, o WAF deixou de ser apenas “caixa de segurança” na borda. Hoje ele participa de pipeline, observabilidade, resposta a incidentes, proteção temporária de vulnerabilidade, rate limiting, defesa contra bots e governança de exposição pública.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema não é apenas permitir ou negar uma porta. O problema é decidir se uma requisição HTTP específica faz sentido para uma aplicação específica, em um contexto específico. Duas requisições podem usar o mesmo IP de origem, mesmo destino, mesma porta 443 e mesmo TLS, mas uma pode ser legítima e a outra maliciosa.</p>\n  <p>Exemplo: <code>GET /produtos?id=10</code> pode ser normal. Já <code>GET /produtos?id=10%20OR%201=1</code> pode indicar tentativa de injeção. Para o firewall de rede, ambas são TCP/443 permitido. Para o WAF, elas são requisições semanticamente diferentes.</p>\n  <div class='callout callout--problem'><strong>Problema clássico:</strong> a empresa publica uma API atrás de HTTPS e load balancer, mas o backend aceita qualquer payload, não há limite de requisições, o WAF está em modo permissivo, logs não são enviados ao SIEM e o backend também está exposto diretamente.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <table class='comparison-table'>\n    <thead><tr><th>Camada</th><th>Controle</th><th>Enxerga</th><th>Não resolve sozinho</th></tr></thead>\n    <tbody>\n      <tr><td>L3/L4</td><td>Firewall/ACL</td><td>IP, protocolo, porta e estado</td><td>Payload HTTP, regras de negócio e autorização</td></tr>\n      <tr><td>L7 básico</td><td>Reverse proxy</td><td>Host, path, headers e roteamento</td><td>Detecção profunda de ataques e governança de API</td></tr>\n      <tr><td>L7 segurança</td><td>WAF</td><td>Assinaturas, anomalias, parâmetros, cookies, body e reputação</td><td>Correção do código, IAM e desenho de autorização</td></tr>\n      <tr><td>L7 API</td><td>API Gateway</td><td>Contratos, rotas, tokens, quotas, chaves e versões</td><td>Lógica interna vulnerável e dados sensíveis mal protegidos</td></tr>\n      <tr><td>DevSecOps</td><td>Policy as code</td><td>Configuração versionada, revisão e automação</td><td>Tuning contínuo, contexto de negócio e investigação humana</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>WAF</strong> é um controle de segurança de camada 7 que inspeciona requisições e respostas HTTP/HTTPS para detectar, registrar, desafiar, limitar ou bloquear comportamentos considerados perigosos.</p>\n  <p>Ele pode operar com <strong>regras gerenciadas</strong>, criadas pelo fornecedor; <strong>regras customizadas</strong>, criadas pela equipe; <strong>allowlists</strong>, para permitir padrões conhecidos; <strong>blocklists</strong>, para bloquear padrões; <strong>rate limiting</strong>, para reduzir abuso; e <strong>bot protection</strong>, para diferenciar clientes automatizados de usuários legítimos.</p>\n  <div class='definition-box'>WAF não é mágica. Ele é uma barreira de inspeção e contenção. Ele ajuda a reduzir risco, ganhar tempo, padronizar logs e aplicar controles, mas vulnerabilidades devem ser corrigidas na aplicação, no contrato, na autorização, na infraestrutura e no processo.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Em uma publicação típica, o cliente resolve DNS, abre conexão HTTPS, chega à CDN, WAF, load balancer ou API Gateway, e só depois a requisição segue para o backend privado. O WAF observa a requisição HTTP já decifrada no ponto de inspeção, normalmente após TLS termination.</p>\n  <ol class='flow-list'>\n    <li>O cliente envia uma requisição com método, host, path, query string, headers, cookies e body.</li>\n    <li>O WAF normaliza a requisição, decodifica partes relevantes e remove ambiguidades conhecidas.</li>\n    <li>Regras gerenciadas e customizadas avaliam padrões de ataque, anomalias e política corporativa.</li>\n    <li>Rate limit, reputação, geografia, headers e comportamento podem influenciar a decisão.</li>\n    <li>A ação pode ser permitir, registrar, desafiar, bloquear, redirecionar ou aplicar mitigação.</li>\n    <li>O evento recebe request ID e logs para correlação com proxy, aplicação, SIEM e APM.</li>\n  </ol>\n  <p>Um detalhe crítico: se o backend também aceitar tráfego direto da Internet ou de redes não autorizadas, o atacante pode contornar o WAF. Por isso, WAF precisa ser combinado com rotas, security groups, ACLs, firewall e segmentação.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em arquitetura corporativa, WAF raramente trabalha isolado. Ele fica em uma cadeia de publicação composta por DNS, CDN, load balancer, reverse proxy, API Gateway, autenticação, observabilidade e backend privado.</p>\n  <table class='data-table'>\n    <thead><tr><th>Componente</th><th>Papel</th><th>Cuidado de segurança</th></tr></thead>\n    <tbody>\n      <tr><td>DNS/CDN</td><td>Leva o usuário até a borda mais próxima</td><td>Evitar exposição de origem real e registrar tráfego de borda</td></tr>\n      <tr><td>WAF</td><td>Inspeciona HTTP e aplica regras</td><td>Ativar modo monitor antes de bloqueios agressivos</td></tr>\n      <tr><td>Load balancer</td><td>Distribui tráfego e health checks</td><td>Preservar request ID e origem confiável</td></tr>\n      <tr><td>API Gateway</td><td>Controla rotas, tokens, quotas, versões e contrato</td><td>Não confiar só no gateway; backend também valida autorização</td></tr>\n      <tr><td>Backend privado</td><td>Executa regra de negócio</td><td>Permitir origem apenas da camada autorizada</td></tr>\n      <tr><td>SIEM/APM</td><td>Correlaciona logs, métricas e traces</td><td>Sanitizar tokens, cookies e payloads sensíveis</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine um prédio corporativo. O firewall de rede é como a portaria que decide se carros podem entrar pelo portão. O WAF é como um inspetor que analisa o conteúdo das entregas: o pacote tem remetente estranho? Está tentando entrar por uma porta errada? Declara um item, mas carrega outro? Chegou em volume incompatível com o normal?</p>\n  <p>Já o API Gateway é como uma recepção com agenda: verifica se o visitante tem autorização, qual serviço ele pode acessar, quantas vezes pode solicitar atendimento e qual formulário precisa preencher. Se o prédio tiver uma porta lateral aberta direto para a sala dos servidores, toda essa proteção pode ser burlada.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Uma aplicação possui o endpoint <code>/login</code>. O firewall permite TCP/443 porque o site precisa estar disponível. O WAF observa que o mesmo IP tenta centenas de requisições por minuto, com payloads diferentes e padrões de brute force. A regra de rate limit passa a responder <code>429 Too Many Requests</code> ou bloqueia temporariamente a origem.</p>\n  <p>Outro exemplo: uma URL recebe <code>?q=&lt;script&gt;alert(1)&lt;/script&gt;</code>. O WAF pode detectar padrão de XSS e bloquear a requisição antes que ela chegue à aplicação vulnerável.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa publica o portal de clientes e uma API de pedidos. O tráfego entra por CDN, passa pelo WAF em modo bloqueio para regras estáveis, chega ao API Gateway para validação de token e quota, e somente então alcança microserviços privados.</p>\n  <p>As equipes de segurança e plataforma mantêm um processo: novas regras entram em modo monitor, falsos positivos são analisados, exceções precisam de dono e validade, logs vão para o SIEM, alertas de regra crítica são enviados ao SOC e mudanças são revisadas em pull request.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, WAF pode estar associado a CDN, application load balancer, application gateway, API Gateway, ingress controller ou serviço gerenciado de borda. A arquitetura recomendada costuma manter backends em subnets privadas, sem IP público, aceitando tráfego apenas da camada de publicação.</p>\n  <p>O WAF em cloud também permite automação: regras como código, ambientes separados, logs em storage, métricas em monitoramento, alarmes de anomalia, dashboards por aplicação e integração com inventário de ativos expostos.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, WAF não deve ser configurado manualmente e esquecido. A configuração pode ser versionada em Terraform, Ansible, Helm, Kustomize ou templates nativos do provedor. Pull requests mostram alteração de regra, exceção, escopo, prioridade, ação e validade.</p>\n  <p>Pipelines podem validar que aplicações públicas têm WAF associado, que logs estão habilitados, que regras críticas não foram desativadas, que APIs têm rate limit e que o backend não possui exposição pública direta. Isso transforma segurança de borda em prática governada, não em configuração artesanal.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Do ponto de vista defensivo, o WAF ajuda contra classes de ataques como SQL injection, XSS, path traversal, command injection, scanners automatizados, abuso de endpoints, bots simples, headers suspeitos e payloads fora do esperado.</p>\n  <p>Mas há limites importantes. WAF normalmente não entende autorização de negócio em profundidade. Se um usuário autenticado consegue acessar <code>/clientes/123</code> e também <code>/clientes/124</code> sem autorização, isso é um problema de controle de acesso na aplicação. O WAF pode ajudar com padrões e contrato, mas a correção real está no backend.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> WAF é camada de redução de risco, não desculpa para ignorar validação de input, autorização, autenticação forte, logs, testes e revisão de código.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 1200 720' role='img' aria-labelledby='m09l06-title m09l06-desc'>\n    <title id='m09l06-title'>WAF protegendo aplicação e API</title>\n    <desc id='m09l06-desc'>Fluxo de cliente para CDN, WAF, API Gateway, backend privado e logs no SIEM, com bloqueio de requisições maliciosas e bypass impedido.</desc>\n    <defs>\n      <marker id='m09l06-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path d='M0,0 L0,6 L9,3 z'></path>\n      </marker>\n    </defs>\n\n    <rect x='40' y='70' width='180' height='90' rx='16' class='svg-node svg-node--client'></rect>\n    <text x='130' y='105' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='130' y='130' text-anchor='middle' class='svg-label--small'>HTTPS / API call</text>\n\n    <rect x='285' y='70' width='180' height='90' rx='16' class='svg-node svg-node--cloud'></rect>\n    <text x='375' y='105' text-anchor='middle' class='svg-label'>CDN / Borda</text>\n    <text x='375' y='130' text-anchor='middle' class='svg-label--small'>DNS, cache, TLS</text>\n\n    <rect x='530' y='70' width='180' height='90' rx='16' class='svg-node svg-node--firewall'></rect>\n    <text x='620' y='100' text-anchor='middle' class='svg-label'>WAF</text>\n    <text x='620' y='125' text-anchor='middle' class='svg-label--small'>regras HTTP</text>\n    <text x='620' y='145' text-anchor='middle' class='svg-label--small'>OWASP, rate limit</text>\n\n    <rect x='775' y='70' width='180' height='90' rx='16' class='svg-node svg-node--router'></rect>\n    <text x='865' y='100' text-anchor='middle' class='svg-label'>API Gateway</text>\n    <text x='865' y='125' text-anchor='middle' class='svg-label--small'>token, quota</text>\n    <text x='865' y='145' text-anchor='middle' class='svg-label--small'>contrato e versão</text>\n\n    <rect x='1010' y='70' width='150' height='90' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='1085' y='105' text-anchor='middle' class='svg-label'>Backend</text>\n    <text x='1085' y='130' text-anchor='middle' class='svg-label--small'>privado</text>\n\n    <line x1='220' y1='115' x2='285' y2='115' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l06-arrow)'></line>\n    <line x1='465' y1='115' x2='530' y2='115' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l06-arrow)'></line>\n    <line x1='710' y1='115' x2='775' y2='115' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l06-arrow)'></line>\n    <line x1='955' y1='115' x2='1010' y2='115' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l06-arrow)'></line>\n\n    <rect x='530' y='240' width='180' height='80' rx='14' class='svg-node svg-node--attacker'></rect>\n    <text x='620' y='272' text-anchor='middle' class='svg-label'>Payload suspeito</text>\n    <text x='620' y='297' text-anchor='middle' class='svg-label--small'>SQLi / XSS / traversal</text>\n    <line x1='620' y1='240' x2='620' y2='162' class='svg-flow svg-flow--blocked' marker-end='url(#m09l06-arrow)'></line>\n    <text x='650' y='205' class='svg-label--small'>bloqueia ou monitora</text>\n\n    <rect x='775' y='240' width='180' height='80' rx='14' class='svg-node svg-node--security'></rect>\n    <text x='865' y='272' text-anchor='middle' class='svg-label'>Contrato API</text>\n    <text x='865' y='297' text-anchor='middle' class='svg-label--small'>método, path, schema</text>\n    <line x1='865' y1='240' x2='865' y2='162' class='svg-flow svg-flow--response' marker-end='url(#m09l06-arrow)'></line>\n\n    <rect x='1010' y='240' width='150' height='80' rx='14' class='svg-node svg-node--firewall'></rect>\n    <text x='1085' y='272' text-anchor='middle' class='svg-label'>ACL interna</text>\n    <text x='1085' y='297' text-anchor='middle' class='svg-label--small'>anti-bypass</text>\n    <line x1='1085' y1='240' x2='1085' y2='162' class='svg-flow svg-flow--response' marker-end='url(#m09l06-arrow)'></line>\n\n    <rect x='300' y='430' width='240' height='90' rx='16' class='svg-node svg-node--security'></rect>\n    <text x='420' y='465' text-anchor='middle' class='svg-label'>Logs WAF</text>\n    <text x='420' y='492' text-anchor='middle' class='svg-label--small'>regra, ação, request ID</text>\n\n    <rect x='660' y='430' width='240' height='90' rx='16' class='svg-node svg-node--security'></rect>\n    <text x='780' y='465' text-anchor='middle' class='svg-label'>SIEM / APM</text>\n    <text x='780' y='492' text-anchor='middle' class='svg-label--small'>correlação e alerta</text>\n\n    <line x1='620' y1='162' x2='440' y2='430' class='svg-flow svg-flow--response' marker-end='url(#m09l06-arrow)'></line>\n    <line x1='540' y1='475' x2='660' y2='475' class='svg-flow svg-flow--response' marker-end='url(#m09l06-arrow)'></line>\n\n    <rect x='70' y='590' width='1060' height='70' rx='16' class='svg-zone'></rect>\n    <text x='600' y='620' text-anchor='middle' class='svg-label'>WAF reduz risco na camada HTTP, mas precisa de backend privado, autenticação, autorização, contrato, logs e correção de código.</text>\n    <text x='600' y='646' text-anchor='middle' class='svg-label--small'>Sem anti-bypass e governança, o atacante procura o caminho que não passa pela inspeção.</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você desenhará uma política de WAF para uma API pública, criará uma matriz de regras, definirá modo monitor, ações de bloqueio, exceções temporárias, rate limiting, logs e controles anti-bypass.</p>\n</section>\n\n<div class=\"content-card\" data-enhancement=\"p1-07-9.6\"><h4>Reforço v2.0: laboratório de firewall orientado por evidência</h4><p>Este laboratório foi revisado na v2.0 para exigir matriz de fluxo, regra mínima, retorno, logs, contadores, evidências e rollback. O acesso à aula permanece livre; a conclusão usa critérios de progresso, não bloqueio de navegação.</p></div>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam identificação de camada correta de controle, leitura de eventos de WAF, desenho de regras HTTP e análise de falso positivo sem desativar proteção global.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário com uma API pública, endpoints críticos, falsos positivos, tentativas de ataque e risco de bypass. Sua missão será propor uma política equilibrada entre segurança, disponibilidade e rastreabilidade.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostrará como separar regras gerenciadas, regras customizadas, rate limit, exceções, API Gateway, logs, anti-bypass e backlog de correção no código.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>WAF é uma camada de inspeção HTTP que complementa firewalls, proxies e gateways. Ele ajuda a detectar e bloquear padrões de ataque, abuso, anomalias e violações de política, especialmente em aplicações web e APIs públicas.</p>\n  <p>Um bom desenho não se limita a ligar regras gerenciadas. É necessário proteger a origem, impedir bypass, habilitar logs, fazer tuning, tratar falsos positivos, revisar exceções, aplicar rate limit e corrigir vulnerabilidades na aplicação.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará security groups, NACLs e firewalls em cloud, entendendo como os mesmos conceitos aparecem em VPCs, VNets, subnets, workloads e políticas distribuídas.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Segurança",
      "HTTP",
      "API",
      "Cloud",
      "DevSecOps"
    ],
    "beforeThisLesson": "O aluno já entende HTTP, HTTPS, cookies, APIs, proxies, NAT, firewalls e publicação controlada.",
    "afterThisLesson": "O aluno conseguirá posicionar WAF e API Gateway em uma arquitetura segura, criar regras defensivas e investigar bloqueios HTTP.",
    "dependsOn": [
      "HTTP",
      "HTTPS",
      "TLS termination",
      "headers",
      "cookies",
      "JSON",
      "API Gateway",
      "logs",
      "SIEM",
      "firewall"
    ]
  },
  "protocolFields": [
    {
      "field": "Method",
      "meaning": "Verbo HTTP usado na requisição, como GET, POST, PUT ou DELETE.",
      "securityNote": "Métodos inesperados podem indicar abuso, enumeração ou contrato mal definido."
    },
    {
      "field": "Host",
      "meaning": "Nome do serviço solicitado pelo cliente.",
      "securityNote": "Host header indevido pode afetar roteamento, cache e geração de links."
    },
    {
      "field": "Path",
      "meaning": "Caminho do recurso solicitado.",
      "securityNote": "Paths administrativos, traversal e endpoints antigos devem ser monitorados."
    },
    {
      "field": "Query string",
      "meaning": "Parâmetros após o ponto de interrogação na URL.",
      "securityNote": "Parâmetros são superfície comum para injeção, enumeração e abuso."
    },
    {
      "field": "Headers",
      "meaning": "Metadados HTTP enviados pelo cliente.",
      "securityNote": "Headers como Authorization, Origin, Referer e X-Forwarded-For precisam de confiança controlada."
    },
    {
      "field": "Cookies",
      "meaning": "Estado de sessão enviado pelo navegador.",
      "securityNote": "Cookies roubados ou mal protegidos podem permitir sequestro de sessão."
    },
    {
      "field": "Body",
      "meaning": "Payload da requisição, frequentemente JSON em APIs.",
      "securityNote": "Campos inesperados, objetos profundos e payloads grandes podem indicar ataque ou contrato fraco."
    },
    {
      "field": "Status code",
      "meaning": "Resposta HTTP gerada pela borda, gateway ou backend.",
      "securityNote": "403, 429, 502 e 504 ajudam a localizar bloqueio, rate limit ou falha de upstream."
    },
    {
      "field": "Request ID",
      "meaning": "Identificador para correlacionar logs ponta a ponta.",
      "securityNote": "Sem correlação, investigar falsos positivos e incidentes fica lento."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Cliente envia requisição HTTPS",
      "description": "A chamada chega com método, host, path, headers, cookies, query e body.",
      "securityNote": "Tokens e cookies devem ser protegidos e nunca registrados integralmente."
    },
    {
      "step": 2,
      "name": "TLS é terminado na borda autorizada",
      "description": "CDN, WAF, load balancer ou gateway decifra o tráfego para inspeção L7.",
      "securityNote": "A chave privada e os certificados precisam de proteção e rotação."
    },
    {
      "step": 3,
      "name": "WAF normaliza e avalia",
      "description": "Regras gerenciadas e customizadas analisam padrões, anomalias e política.",
      "securityNote": "Normalização ajuda a reduzir evasões por encoding ou representação ambígua."
    },
    {
      "step": 4,
      "name": "Ação é aplicada",
      "description": "A requisição pode ser permitida, registrada, bloqueada, desafiada ou limitada.",
      "securityNote": "Regras novas devem passar por modo monitor para evitar indisponibilidade."
    },
    {
      "step": 5,
      "name": "API Gateway valida consumo",
      "description": "Token, escopo, quota, versão e contrato podem ser avaliados antes do backend.",
      "securityNote": "Autorização de negócio ainda precisa existir no backend."
    },
    {
      "step": 6,
      "name": "Backend privado processa",
      "description": "A aplicação recebe apenas tráfego da camada autorizada.",
      "securityNote": "Controles de rede devem impedir bypass direto ao backend."
    },
    {
      "step": 7,
      "name": "Logs são correlacionados",
      "description": "WAF, gateway, aplicação e SIEM usam request ID para investigação.",
      "securityNote": "Logs devem ser úteis sem vazar Authorization, cookies ou dados sensíveis."
    }
  ],
  "deepDive": {
    "title": "WAF não corrige autorização quebrada",
    "paragraphs": [
      "Uma das confusões mais perigosas é acreditar que WAF resolve todos os problemas de API. Ele é bom em bloquear padrões conhecidos, abuso volumétrico, payloads suspeitos e violações simples de contrato. Porém, muitas falhas críticas de API são lógicas e dependem de contexto de negócio.",
      "Se um usuário autenticado consegue trocar um ID na URL e acessar dados de outro cliente, o problema é autorização no backend. O WAF pode talvez detectar enumeração agressiva, mas não sabe, sozinho, qual cliente deveria acessar qual recurso. O controle correto precisa estar na aplicação e no modelo de identidade.",
      "Por isso, WAF deve ser parte de uma defesa em profundidade: contrato, autenticação, autorização, validação de input, logs, rate limiting, testes de segurança, revisão de código e monitoramento contínuo. Ele compra tempo e reduz ruído, mas não substitui engenharia segura."
    ],
    "keyTakeaways": [
      "WAF é excelente para inspeção HTTP e mitigação de padrões conhecidos.",
      "API Gateway complementa WAF com contrato, autenticação, versão e quota.",
      "Backends continuam responsáveis por validação e autorização de negócio.",
      "Anti-bypass é obrigatório: backend privado deve aceitar apenas tráfego da borda autorizada.",
      "Logs e request IDs transformam bloqueios em evidências investigáveis."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Ativar WAF em bloqueio total sem modo monitor.",
      "impact": "Pode quebrar login, uploads, APIs e integrações legítimas.",
      "correction": "Comece em monitor, analise logs, ajuste exceções e depois ative bloqueios por criticidade."
    },
    {
      "mistake": "Desativar uma regra global por causa de um falso positivo isolado.",
      "impact": "Reduz proteção de todas as aplicações para corrigir um caso específico.",
      "correction": "Crie exceção limitada por host, path, parâmetro, origem, prazo e justificativa."
    },
    {
      "mistake": "Permitir acesso direto ao backend por IP público.",
      "impact": "Atacantes contornam WAF, rate limit, autenticação central e logs de borda.",
      "correction": "Remova IP público ou restrinja origem ao WAF/load balancer/API Gateway."
    },
    {
      "mistake": "Confiar cegamente em X-Forwarded-For enviado pelo cliente.",
      "impact": "Pode permitir bypass de allowlist ou logs incorretos.",
      "correction": "Aceite headers de origem apenas de proxies confiáveis e sobrescreva valores externos."
    },
    {
      "mistake": "Tratar WAF como correção permanente de vulnerabilidade.",
      "impact": "A aplicação continua vulnerável e pode ser explorada por caminhos não cobertos.",
      "correction": "Use WAF como mitigação temporária e acompanhe correção no backlog de engenharia."
    },
    {
      "mistake": "Registrar Authorization e cookies em logs brutos.",
      "impact": "Logs viram fonte de vazamento de credenciais e sessões.",
      "correction": "Mascarar segredos, reduzir payloads e aplicar retenção/controle de acesso."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Usuário recebe 403 ao acessar uma funcionalidade específica.",
      "API retorna 429 sob carga baixa aparente.",
      "Upload legítimo é bloqueado pelo WAF.",
      "Integração funciona em homologação, mas falha em produção.",
      "WAF registra SQLi ou XSS, mas aplicação não mostra erro.",
      "Backend é acessível mesmo sem passar pelo WAF.",
      "Logs de aplicação não possuem o mesmo request ID do WAF."
    ],
    "method": [
      "Colete horário, host, path, método, status code e request ID.",
      "Compare log de CDN/WAF, API Gateway, load balancer e aplicação.",
      "Identifique regra acionada, campo avaliado e ação aplicada.",
      "Reproduza com curl em ambiente autorizado, sanitizando tokens e cookies.",
      "Verifique se o bloqueio é falso positivo, ataque real, contrato quebrado ou excesso de taxa.",
      "Ajuste exceção mínima e temporária quando necessário.",
      "Valide que o backend não é acessível diretamente fora da borda autorizada."
    ],
    "commands": [
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "curl -vkI https://api.lab.local/health -H \"X-Request-ID: lab-9-6-001\"",
        "purpose": "Baseline HTTP",
        "expectedObservation": "Resposta baseline.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "curl -i -X OPTIONS https://api.lab.local/v1/recurso\ncurl -i -X POST https://api.lab.local/v1/recurso -H \"Content-Type: application/json\" --data \"{}\"",
        "purpose": "Métodos e contrato",
        "expectedObservation": "Status compatível.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "curl -s -D - https://api.lab.local/ -o /dev/null",
        "purpose": "Headers de segurança",
        "expectedObservation": "Hardening avaliado.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "curl -i https://api.lab.local/v1/recurso -H \"Origin: https://app.lab.local\"\ncurl -i https://api.lab.local/v1/recurso -H \"Origin: https://evil.example\"",
        "purpose": "CORS defensivo",
        "expectedObservation": "Origem permitida mínima.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      }
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "Qual é o 5-tuple do fluxo e em qual horário ele falhou?",
      "Qual controle tomou a decisão e qual evidência prova isso?",
      "A falha está na ida, no retorno, no estado, no NAT, no WAF ou no backend?"
    ],
    "decisionTree": [
      {
        "if": "Sem hits na regra",
        "then": "Verificar ponto de aplicação, direção, rota e origem real do fluxo."
      },
      {
        "if": "Allow existe mas aplicação falha",
        "then": "Separar transporte, TLS, WAF, backend e autorização."
      },
      {
        "if": "Retorno falha",
        "then": "Verificar state table, NACL/ACL stateless, portas efêmeras e caminho assimétrico."
      },
      {
        "if": "Regra ampla aparece",
        "then": "Substituir por matriz mínima com owner, validade, log e rollback."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Implantar WAF em modo monitor antes de bloqueios amplos.",
      "Combinar regras gerenciadas com regras customizadas por aplicação.",
      "Usar rate limit por endpoint, identidade, IP e chave quando aplicável.",
      "Enviar logs de WAF para SIEM com request ID e campos úteis.",
      "Mascarar Authorization, cookies e payloads sensíveis.",
      "Impedir acesso direto ao backend fora do WAF/API Gateway.",
      "Manter exceções com dono, justificativa, escopo e validade.",
      "Usar contrato de API e validação de schema quando possível.",
      "Integrar regras de WAF com IaC e revisão por pull request."
    ],
    "badPractices": [
      "Tratar WAF como substituto de desenvolvimento seguro.",
      "Desativar regras críticas sem análise de impacto.",
      "Criar allowlist ampla para resolver falso positivo rapidamente.",
      "Expor o IP real do backend na Internet.",
      "Confiar em headers de origem enviados diretamente pelo cliente.",
      "Não revisar exceções temporárias.",
      "Não registrar eventos bloqueados ou permitidos suspeitos."
    ],
    "vulnerabilities": [
      {
        "name": "Bypass de WAF por backend exposto diretamente.",
        "description": "Risco relacionado à aula 9.6 — WAF, regras HTTP e proteção de APIs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Bloquear tráfego direto ao backend por ACL/security group/firewall."
      },
      {
        "name": "Evasão por encoding ou normalização inconsistente.",
        "description": "Risco relacionado à aula 9.6 — WAF, regras HTTP e proteção de APIs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Habilitar normalização e regras atualizadas do fornecedor."
      },
      {
        "name": "Falso negativo em ataque lógico de autorização.",
        "description": "Risco relacionado à aula 9.6 — WAF, regras HTTP e proteção de APIs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Manter autorização no backend e testes de segurança de API."
      },
      {
        "name": "Falso positivo quebrando funcionalidade crítica.",
        "description": "Risco relacionado à aula 9.6 — WAF, regras HTTP e proteção de APIs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Criar exceções cirúrgicas com prazo e revisão."
      },
      {
        "name": "Rate limit ausente em endpoints sensíveis.",
        "description": "Risco relacionado à aula 9.6 — WAF, regras HTTP e proteção de APIs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Aplicar rate limit e proteção contra abuso."
      },
      {
        "name": "Vazamento de tokens em logs.",
        "description": "Risco relacionado à aula 9.6 — WAF, regras HTTP e proteção de APIs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Sanitizar logs e controlar acesso ao SIEM."
      },
      {
        "name": "Regra customizada ampla demais permitindo tráfego indevido.",
        "description": "Risco relacionado à aula 9.6 — WAF, regras HTTP e proteção de APIs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Automatizar configuração com policy as code e revisão técnica."
      }
    ],
    "mitigations": [
      "Bloquear tráfego direto ao backend por ACL/security group/firewall.",
      "Habilitar normalização e regras atualizadas do fornecedor.",
      "Manter autorização no backend e testes de segurança de API.",
      "Criar exceções cirúrgicas com prazo e revisão.",
      "Aplicar rate limit e proteção contra abuso.",
      "Sanitizar logs e controlar acesso ao SIEM.",
      "Automatizar configuração com policy as code e revisão técnica."
    ],
    "threatModel": [
      "Atacante externo tentando explorar payloads HTTP maliciosos.",
      "Bot abusando de login, busca, carrinho ou endpoint de API.",
      "Usuário autenticado explorando falha lógica de autorização.",
      "Atacante procurando IP real do backend para contornar a borda.",
      "Erro operacional desativando regras ou criando exceções amplas."
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
      "Bloquear tráfego direto ao backend por ACL/security group/firewall.",
      "Habilitar normalização e regras atualizadas do fornecedor.",
      "Manter autorização no backend e testes de segurança de API.",
      "Criar exceções cirúrgicas com prazo e revisão.",
      "Aplicar rate limit e proteção contra abuso.",
      "Sanitizar logs e controlar acesso ao SIEM.",
      "Automatizar configuração com policy as code e revisão técnica."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-9.6",
    "title": "WAF e proteção HTTP/API com curl, logs e falsos positivos controlados",
    "labType": "security",
    "objective": "Validar headers, métodos, status, request ID e logs de WAF/API Gateway de forma defensiva.",
    "scenario": "API retorna 403; é preciso diferenciar WAF, autorização, CORS, método incorreto e backend.",
    "topology": "Cliente -> WAF/API Gateway -> serviço HTTP autorizado -> logs/request ID.",
    "architecture": "WAF opera em L7 e complementa firewall de rede, TLS e autenticação.",
    "prerequisites": [
      "Revisar as aulas anteriores do M09 e os fundamentos de TCP/UDP, portas, IPv4, DNS e HTTP.",
      "Usar somente laboratório, simulação, dados fictícios ou ambiente explicitamente autorizado."
    ],
    "tools": [
      "curl",
      "DevTools",
      "logs sintéticos de WAF",
      "jq opcional"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não aplique mudanças em produção sem change, janela, backup e rollback.",
      "Não use any-any como solução de troubleshooting.",
      "Sanitize IPs, tokens, cookies, payloads e nomes internos antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Baseline HTTP",
        "instruction": "Faça HEAD/GET com request ID.",
        "expectedOutput": "Resposta baseline.",
        "evidence": "Status, headers e request ID.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "curl -vkI https://api.lab.local/health -H \"X-Request-ID: lab-9-6-001\""
      },
      {
        "number": 2,
        "title": "Métodos e contrato",
        "instruction": "Compare OPTIONS/POST conforme contrato.",
        "expectedOutput": "Status compatível.",
        "evidence": "Tabela método/status.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "curl -i -X OPTIONS https://api.lab.local/v1/recurso\ncurl -i -X POST https://api.lab.local/v1/recurso -H \"Content-Type: application/json\" --data \"{}\""
      },
      {
        "number": 3,
        "title": "Log WAF sintético",
        "instruction": "Classifique ruleId, action e requestId.",
        "expectedOutput": "WAF vs aplicação separado.",
        "evidence": "Análise WAF.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "analysisTask": "Tabela ruleId | ação | motivo | falso positivo?"
      },
      {
        "number": 4,
        "title": "Headers de segurança",
        "instruction": "Colete e classifique headers.",
        "expectedOutput": "Hardening avaliado.",
        "evidence": "Lista de headers.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "curl -s -D - https://api.lab.local/ -o /dev/null"
      },
      {
        "number": 5,
        "title": "CORS defensivo",
        "instruction": "Teste origem autorizada e não autorizada.",
        "expectedOutput": "Origem permitida mínima.",
        "evidence": "Comparação CORS.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "curl -i https://api.lab.local/v1/recurso -H \"Origin: https://app.lab.local\"\ncurl -i https://api.lab.local/v1/recurso -H \"Origin: https://evil.example\""
      },
      {
        "number": 6,
        "title": "Plano de ajuste",
        "instruction": "Recomende ajuste específico, dono e rollback.",
        "expectedOutput": "Sem desabilitar WAF globalmente.",
        "evidence": "Plano de mudança.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Registro de falso positivo/ajuste/rollback."
      }
    ],
    "expectedResult": "Entrega com matriz de fluxo, evidências, validação objetiva, análise de risco e rollback.",
    "validation": [
      {
        "check": "Request ID correlacionado",
        "expected": "Mesmo ID no cliente e log.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão do log"
      },
      {
        "check": "403 classificado",
        "expected": "Camada provável definida.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Análise"
      },
      {
        "check": "Sem tokens",
        "expected": "Credenciais redigidas.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão manual"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "403 intermitente",
        "probableCause": "WAF/rate limit/política por origem.",
        "howToConfirm": "Request ID e ruleId.",
        "fix": "Ajustar regra específica."
      },
      {
        "symptom": "CORS falha no navegador",
        "probableCause": "Headers CORS inadequados.",
        "howToConfirm": "DevTools e curl com Origin.",
        "fix": "Ajustar CORS mínimo."
      },
      {
        "symptom": "WAF count e app bloqueia",
        "probableCause": "Autorização no backend.",
        "howToConfirm": "Logs app/IAM.",
        "fix": "Corrigir permissão, não firewall."
      }
    ],
    "improvements": [
      "Adicionar integração com SIEM.",
      "Automatizar revisão periódica de regras.",
      "Transformar a matriz em policy as code quando fizer sentido."
    ],
    "evidenceToCollect": [
      "curl com request ID",
      "Headers",
      "Log WAF sintético",
      "Matriz CORS",
      "Plano de ajuste"
    ],
    "questions": [
      "Por que WAF não substitui autenticação?",
      "Como diferenciar 403 de WAF e app?"
    ],
    "challenge": "Decida se log WAF fictício é falso positivo.",
    "solution": "Correlacione request ID, ruleId, path, método, status e contrato; ajuste regra específica."
  },
  "mentorQuestions": [
    "Qual parte deste problema deve ser resolvida no firewall L3/L4, no WAF, no API Gateway e no backend?",
    "Como você provaria que o backend não pode ser acessado sem passar pelo WAF?",
    "Uma regra gerou falso positivo. Como resolver sem abrir uma exceção perigosa para toda a aplicação?",
    {
      "type": "diagnóstico",
      "question": "Que evidência provaria que o firewall tomou a decisão correta neste cenário?",
      "hints": [
        "Pense em log, contador, state table, flow log ou packet capture.",
        "Separe ida, retorno e camada de aplicação."
      ],
      "expectedIdeas": [
        "matriz de fluxo",
        "log de regra",
        "contador",
        "state table",
        "pcap",
        "rollback"
      ],
      "explanation": "Firewall profissional é operado por evidências, não por palpites."
    }
  ],
  "quiz": [
    {
      "id": "q10-6-1",
      "question": "Qual é a principal diferença entre firewall de rede e WAF?",
      "options": [
        "Firewall de rede inspeciona HTTP melhor que WAF",
        "WAF opera na camada HTTP e avalia elementos como path, headers, cookies e body",
        "WAF substitui autorização no backend",
        "Firewall de rede só funciona com UDP"
      ],
      "answer": 1,
      "explanation": "WAF é focado em camada 7 HTTP/HTTPS. Firewalls de rede trabalham principalmente com IP, protocolo, porta e estado."
    },
    {
      "id": "q10-6-2",
      "question": "Por que backend exposto diretamente é um problema em arquitetura com WAF?",
      "options": [
        "Porque melhora performance demais",
        "Porque permite bypass da inspeção e das políticas de borda",
        "Porque impede TLS",
        "Porque elimina a necessidade de logs"
      ],
      "answer": 1,
      "explanation": "Se o atacante acessa o backend sem passar pelo WAF, controles de inspeção, rate limit e logging de borda podem ser contornados."
    },
    {
      "id": "q10-6-3",
      "question": "Qual prática é mais segura ao ativar novas regras de WAF?",
      "options": [
        "Bloquear tudo imediatamente",
        "Começar em modo monitor, analisar eventos e ajustar exceções mínimas",
        "Desativar logs para reduzir ruído",
        "Permitir qualquer payload autenticado"
      ],
      "answer": 1,
      "explanation": "Modo monitor reduz risco de indisponibilidade por falso positivo."
    },
    {
      "id": "q10-6-4",
      "question": "Qual problema WAF normalmente não resolve sozinho?",
      "options": [
        "Alguns padrões de SQL injection",
        "Rate limit básico",
        "Autorização de negócio quebrada como IDOR/BOLA",
        "Bloqueio por path"
      ],
      "answer": 2,
      "explanation": "Autorização de negócio exige contexto da aplicação e deve ser implementada no backend."
    },
    {
      "id": "q10-6-5",
      "question": "O que deve existir em uma exceção de WAF bem governada?",
      "options": [
        "Escopo amplo e sem prazo",
        "Dono, justificativa, escopo, validade e revisão",
        "Somente o nome da regra",
        "Desativação global para todos os hosts"
      ],
      "answer": 1,
      "explanation": "Exceções precisam ser mínimas, temporárias, justificadas e revisáveis."
    },
    {
      "id": "q10-6-6",
      "question": "Qual campo ajuda a correlacionar bloqueio no WAF com erro na aplicação?",
      "options": [
        "Request ID",
        "TTL",
        "MAC de broadcast",
        "Máscara de sub-rede"
      ],
      "answer": 0,
      "explanation": "Request ID permite correlacionar logs de WAF, gateway, load balancer e aplicação."
    }
  ],
  "flashcards": [
    {
      "front": "O que é WAF?",
      "back": "Web Application Firewall: controle L7 que inspeciona tráfego HTTP/HTTPS para detectar, registrar, limitar ou bloquear comportamentos suspeitos."
    },
    {
      "front": "WAF substitui firewall de rede?",
      "back": "Não. Eles atuam em camadas diferentes e se complementam."
    },
    {
      "front": "O que é falso positivo em WAF?",
      "back": "Quando uma requisição legítima é classificada como maliciosa ou indevida."
    },
    {
      "front": "O que é virtual patching?",
      "back": "Mitigação temporária com regra de WAF enquanto a vulnerabilidade real é corrigida no código ou infraestrutura."
    },
    {
      "front": "Por que impedir bypass é essencial?",
      "back": "Porque backend acessível diretamente permite contornar WAF, gateway, rate limit e logs de borda."
    },
    {
      "front": "Qual a relação entre WAF e API Gateway?",
      "back": "WAF foca inspeção e mitigação HTTP; API Gateway foca publicação, contrato, autenticação, quota e versionamento."
    }
  ],
  "exercises": [
    {
      "id": "ex10-6-1",
      "title": "Classificar controles",
      "prompt": "Classifique os seguintes problemas entre firewall L3/L4, WAF, API Gateway e backend: porta 22 aberta para Internet, SQLi em query string, token sem escopo, IDOR em /clientes/{id}.",
      "expectedAnswer": "Porta 22: firewall; SQLi: WAF e correção no backend; token sem escopo: API Gateway/IAM e backend; IDOR: backend/autorização, com monitoramento complementar."
    },
    {
      "id": "ex10-6-2",
      "title": "Exceção segura",
      "prompt": "Uma regra de WAF bloqueia upload legítimo em /documentos. Escreva uma exceção segura.",
      "expectedAnswer": "Escopo por host/path/campo/regra, limite de tamanho, dono, justificativa, validade, logs e plano de correção; não desativar regra global."
    },
    {
      "id": "ex10-6-3",
      "title": "Anti-bypass",
      "prompt": "Explique como provar que uma API só é acessível pelo WAF/API Gateway.",
      "expectedAnswer": "Testar acesso direto ao IP/backend, revisar security groups/ACL/firewall, validar logs de borda, remover IP público e permitir origem somente da camada autorizada."
    },
    {
      "id": "ex10-6-4",
      "title": "Rate limit",
      "prompt": "Defina uma política de rate limit para /login e /busca.",
      "expectedAnswer": "/login com limites por IP e identidade, resposta 429 e alerta; /busca com limites por token/IP, cache quando possível e monitoramento de scraping."
    },
    {
      "id": "ex-9.6-p1-07-matriz",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de fluxo com origem, destino, protocolo, porta, direção, controle, log esperado e critério de rollback para o cenário da aula.",
      "expectedAnswer": "A resposta deve conter fluxo específico, sem any-any, com regra mínima, fonte de log, teste positivo/negativo e rollback.",
      "explanation": "Matriz de fluxo é a base para firewall operável e auditável."
    }
  ],
  "challenge": {
    "title": "Proteger API pública de clientes",
    "scenario": "Uma empresa expõe api.empresa.test com endpoints /login, /clientes/{id}, /pedidos, /relatorios e /admin. O tráfego passa por load balancer, mas ainda não há WAF. O backend tem IP público, logs não têm request ID e o time de produto reclama de risco de falso positivo.",
    "tasks": [
      "Desenhar a arquitetura alvo com WAF, API Gateway e backend privado.",
      "Definir regras gerenciadas em modo monitor e regras customizadas prioritárias.",
      "Criar rate limits para endpoints sensíveis.",
      "Definir processo de falso positivo.",
      "Criar plano anti-bypass.",
      "Criar plano de logging e SIEM sem vazar segredos."
    ],
    "deliverables": [
      "Diagrama textual da arquitetura.",
      "Matriz de regras WAF/API Gateway.",
      "Checklist anti-bypass.",
      "Runbook de falso positivo.",
      "Plano de logs e alertas."
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada do desafio",
    "sections": [
      {
        "title": "Arquitetura",
        "content": "DNS aponta para CDN/WAF. WAF encaminha para API Gateway ou load balancer. Backend fica em subnet privada e aceita origem somente da camada autorizada. Logs seguem para SIEM/APM com request ID."
      },
      {
        "title": "Regras",
        "content": "Regras gerenciadas OWASP entram em monitor inicialmente. Regras customizadas bloqueiam /admin público, métodos inesperados, payloads acima do limite e Content-Type incorreto em endpoints JSON."
      },
      {
        "title": "Rate limit",
        "content": "/login recebe limite por IP, identidade e tentativa; /relatorios recebe quota por usuário/token; /busca recebe limites para reduzir scraping e abuso."
      },
      {
        "title": "Falso positivo",
        "content": "Investigar request ID, regra, payload, endpoint e impacto. Se necessário, criar exceção mínima por host/path/campo/regra com validade e backlog de correção."
      },
      {
        "title": "Anti-bypass",
        "content": "Remover IP público do backend ou restringir security group/firewall à origem do WAF/gateway. Testar acesso direto e registrar evidência de bloqueio."
      },
      {
        "title": "Logs",
        "content": "Registrar ação, regra, host, path, método, status, origem confiável e request ID. Mascarar Authorization, cookies e dados sensíveis."
      }
    ]
  },
  "glossary": [
    {
      "term": "WAF",
      "definition": "Web Application Firewall, controle de segurança para inspeção de tráfego HTTP/HTTPS."
    },
    {
      "term": "Regra gerenciada",
      "definition": "Conjunto de regras mantido por fornecedor ou comunidade para detectar padrões comuns de ataque."
    },
    {
      "term": "Regra customizada",
      "definition": "Regra criada para uma aplicação, endpoint, header, path, método ou necessidade específica."
    },
    {
      "term": "Falso positivo",
      "definition": "Bloqueio de tráfego legítimo por regra de segurança."
    },
    {
      "term": "Falso negativo",
      "definition": "Tráfego malicioso permitido por não ser detectado."
    },
    {
      "term": "Virtual patching",
      "definition": "Mitigação temporária aplicada no WAF enquanto a vulnerabilidade é corrigida definitivamente."
    },
    {
      "term": "Rate limiting",
      "definition": "Controle que limita volume de requisições por origem, usuário, token, endpoint ou janela de tempo."
    },
    {
      "term": "API Gateway",
      "definition": "Componente que publica, autentica, limita, versiona e controla consumo de APIs."
    },
    {
      "term": "Bypass",
      "definition": "Caminho alternativo que contorna a camada de proteção esperada."
    },
    {
      "term": "Request ID",
      "definition": "Identificador usado para correlacionar uma requisição entre camadas e logs."
    }
  ],
  "references": [
    {
      "title": "OWASP Top 10",
      "type": "framework",
      "note": "Referência conceitual para riscos comuns em aplicações web."
    },
    {
      "title": "OWASP API Security Top 10",
      "type": "framework",
      "note": "Referência conceitual para riscos comuns em APIs."
    },
    {
      "title": "RFC 9110 — HTTP Semantics",
      "type": "standard",
      "note": "Base moderna para semântica HTTP."
    },
    {
      "title": "Curso Redes e Network — Módulo 9",
      "type": "internal-course",
      "note": "Base de HTTP, HTTPS, proxies, APIs e troubleshooting."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e IaC",
      "reason": "Regras de WAF e API Gateway devem ser versionadas e revisadas como código."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "OAuth2/OIDC e tokens",
      "reason": "Proteção de APIs depende de autenticação, escopos, claims e autorização."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 9",
      "reason": "WAF depende diretamente de HTTP, HTTPS, headers, cookies, APIs e troubleshooting."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "Ler todas as seções",
      "Concluir laboratório lab-9.6",
      "Acertar pelo menos 70% do quiz",
      "Entregar matriz de regras WAF/API Gateway"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "9.7"
    ],
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "labMarkedDone",
        "practicalExerciseDone"
      ]
    }
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
