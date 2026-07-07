export const lesson0807 = {
  "id": "8.7",
  "moduleId": "m08",
  "order": 7,
  "title": "HTTP/2, HTTP/3, QUIC e performance",
  "subtitle": "Entenda por que a Web evoluiu além do HTTP/1.1, como multiplexação, compressão de headers, TLS, QUIC sobre UDP e CDNs mudam performance, troubleshooting e segurança.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "redes",
    "http",
    "http2",
    "http3",
    "quic",
    "tls",
    "udp",
    "performance",
    "cdn",
    "proxy",
    "waf",
    "api",
    "cloud",
    "devsecops",
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
      "reason": "HTTP/2 e HTTP/3 continuam resolvendo o mesmo problema de aplicação, mas com modelos de transporte mais eficientes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.2",
      "title": "Requisições e respostas: métodos, URLs, headers, body e status codes",
      "reason": "Métodos, URLs, headers, status codes e body continuam existindo nas versões modernas do HTTP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.3",
      "title": "HTTPS, TLS, certificados, SNI e cadeia de confiança",
      "reason": "HTTP/2 e HTTP/3 na prática dependem fortemente de TLS, ALPN, SNI e validação de certificados."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.4",
      "title": "TCP: confiabilidade, janela, retransmissão e congestionamento",
      "reason": "HTTP/2 roda normalmente sobre TCP/TLS e sofre com head-of-line blocking no transporte."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.5",
      "title": "UDP: simplicidade, latência e aplicações em tempo real",
      "reason": "HTTP/3 usa QUIC sobre UDP, com confiabilidade e controle de congestionamento implementados acima do UDP."
    }
  ],
  "objectives": [
    "Explicar por que HTTP/1.1 passou a ter limitações de performance em aplicações modernas.",
    "Diferenciar HTTP/1.1, HTTP/2 e HTTP/3 sem confundir versão de HTTP com TCP, UDP, TLS ou QUIC.",
    "Entender multiplexação, streams, frames, compressão de headers e priorização em HTTP/2.",
    "Entender QUIC como protocolo sobre UDP que integra TLS 1.3, streams, controle de congestionamento e migração de conexão.",
    "Relacionar HTTP/2 e HTTP/3 com CDNs, WAFs, proxies, load balancers, APIs, mobile, cloud e DevSecOps.",
    "Diagnosticar problemas de performance HTTP separando DNS, TCP, TLS, ALPN, versão HTTP, cache, CDN, proxy, backend e aplicação."
  ],
  "learningOutcomes": [
    "Descrever as diferenças práticas entre conexões HTTP/1.1, streams HTTP/2 e conexões QUIC/HTTP/3.",
    "Interpretar sinais básicos de negociação de protocolo usando curl, navegador, openssl, logs e DevTools.",
    "Explicar por que HTTP/2 reduz múltiplas conexões TCP e por que HTTP/3 reduz alguns impactos do head-of-line blocking.",
    "Identificar quando uma falha de HTTP/3 é causada por bloqueio de UDP/443, proxy intermediário, WAF, CDN ou política corporativa.",
    "Criar uma checklist defensiva para habilitar HTTP/2/HTTP/3 com observabilidade, fallback, TLS correto, logs e validação de performance."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>No começo da Web, uma página tinha poucos arquivos: um HTML, talvez uma imagem e algum CSS simples. Hoje, uma aplicação web pode carregar dezenas ou centenas de recursos: HTML, CSS, JavaScript, fontes, imagens, chamadas de API, pixels de observabilidade, service workers e conteúdo vindo de CDNs. Se cada recurso depender de uma fila lenta, o usuário sente demora, a aplicação parece instável e o time de operações começa a investigar sintomas difíceis.</p>\n  <p>HTTP/2 e HTTP/3 surgiram para reduzir gargalos de performance sem mudar a ideia central de HTTP: cliente envia requisições e servidor responde. A diferença é que o caminho interno ficou mais eficiente. Em vez de tratar cada requisição como uma conversa isolada e pesada, versões modernas multiplexam streams, comprimem headers e tentam reduzir impactos de latência, perda e reconexões.</p>\n  <div class='callout'><strong>Ideia central:</strong> HTTP/2 e HTTP/3 não substituem DNS, TLS, TCP, UDP, proxy ou aplicação. Eles otimizam como mensagens HTTP trafegam sobre a rede.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>O HTTP/1.0 era simples: abrir conexão, enviar requisição, receber resposta e encerrar. Isso funcionava bem para páginas pequenas, mas se tornou caro conforme páginas passaram a carregar muitos objetos. O HTTP/1.1 melhorou com conexões persistentes e pipelining, mas o pipelining teve baixa adoção prática por problemas de compatibilidade e bloqueio de resposta em fila.</p>\n  <p>Para contornar limitações, navegadores abriram várias conexões TCP paralelas por domínio. Isso melhorou a experiência, mas aumentou custo de handshake, consumo de recursos, competição por congestion window e complexidade em proxies e servidores. Técnicas como domain sharding, sprites e concatenação de arquivos eram otimizações que tratavam sintomas do protocolo.</p>\n  <p>O HTTP/2 nasceu a partir do SPDY e trouxe multiplexação em uma única conexão, frames binários e compressão de headers. Depois, o HTTP/3 migrou a base de transporte para QUIC sobre UDP, integrando TLS 1.3 e reduzindo alguns problemas de TCP, especialmente em redes móveis, perda de pacotes e mudança de rede.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema não era apenas largura de banda. Muitas aplicações sofrem por latência, handshakes repetidos, bloqueio de fila, perda de pacotes e excesso de conexões. Em HTTP/1.1, quando muitas requisições competem, o navegador precisa administrar várias conexões e o servidor precisa lidar com mais estado de transporte.</p>\n  <p>Outro problema é que headers HTTP são repetitivos: cookies, authorization, user-agent, accept, host, cache-control e outros aparecem repetidamente. Em APIs corporativas, cada chamada pode carregar headers grandes. Sem compressão e multiplexação, muito tempo e bytes são gastos carregando metadados repetidos.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> aplicações modernas precisam carregar muitos recursos e chamadas de API com baixa latência, segurança TLS e observabilidade, sem abrir conexões demais nem transformar perda de pacote em lentidão generalizada.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <table class='comparison-table'><thead><tr><th>Versão</th><th>Base comum</th><th>Melhoria principal</th><th>Limitação importante</th></tr></thead><tbody><tr><td>HTTP/1.0</td><td>TCP</td><td>Simplicidade</td><td>Conexões curtas e custo repetido</td></tr><tr><td>HTTP/1.1</td><td>TCP</td><td>Conexões persistentes e host virtual</td><td>Muitas conexões paralelas e filas</td></tr><tr><td>HTTP/2</td><td>Normalmente TLS sobre TCP</td><td>Multiplexação, frames e compressão de headers</td><td>Ainda sofre com head-of-line blocking do TCP</td></tr><tr><td>HTTP/3</td><td>QUIC sobre UDP com TLS 1.3</td><td>Streams independentes e melhor comportamento em perda/mobilidade</td><td>Depende de UDP/443 liberado e suporte de intermediários</td></tr></tbody></table>\n  <p>A evolução não eliminou HTTP/1.1. Muitas redes ainda usam fallback, proxies legados, inspeção TLS, appliances e backends que falam HTTP/1.1 atrás de um load balancer moderno. Em arquitetura corporativa, é comum o cliente falar HTTP/2 ou HTTP/3 com a borda, enquanto a borda fala HTTP/1.1 ou HTTP/2 com o backend.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>HTTP/2</strong> preserva a semântica HTTP, mas muda a forma de transportar mensagens: usa frames binários, streams multiplexados, compressão HPACK e uma única conexão TCP para várias requisições simultâneas. Para o desenvolvedor, ainda existem métodos, headers, status codes e body. Para a rede, a conversa fica mais compacta e multiplexada.</p>\n  <p><strong>HTTP/3</strong> preserva a semântica HTTP, mas troca a base de transporte para QUIC. QUIC roda sobre UDP, incorpora TLS 1.3, cria streams independentes, reduz custo de reconexão e permite melhor continuidade quando o cliente muda de rede, como de Wi-Fi para 4G/5G.</p>\n  <div class='definition-box'>HTTP/2 e HTTP/3 são versões da camada de aplicação. QUIC é um protocolo de transporte acima de UDP. TLS protege a comunicação. SNI e ALPN ajudam cliente e servidor a escolher nome e protocolo durante a negociação.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>No HTTP/2, depois de DNS, TCP e TLS, cliente e servidor negociam suporte por ALPN. Se ambos aceitarem <code>h2</code>, a comunicação HTTP passa a usar frames binários. Cada requisição e resposta pertence a um stream. Vários streams podem compartilhar a mesma conexão, evitando abrir uma conexão TCP para cada recurso.</p>\n  <ol class='flow-list'>\n    <li>Cliente resolve o nome do serviço.</li>\n    <li>Cliente abre TCP com o endpoint HTTPS.</li>\n    <li>Durante TLS, cliente anuncia protocolos suportados via ALPN, como <code>h2</code> e <code>http/1.1</code>.</li>\n    <li>Servidor escolhe o protocolo compatível.</li>\n    <li>Em HTTP/2, requisições viram frames dentro de streams multiplexados.</li>\n    <li>Headers podem ser comprimidos com HPACK.</li>\n    <li>Respostas chegam em streams independentes dentro da mesma conexão TCP.</li>\n  </ol>\n  <p>No HTTP/3, o fluxo muda: o cliente usa UDP/443 e QUIC. QUIC negocia criptografia com TLS 1.3 embutido, cria streams e transporta HTTP/3. Como os streams são tratados no QUIC, perda em um stream não precisa bloquear todos os outros da mesma forma que uma perda TCP pode afetar o fluxo inteiro.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura moderna, HTTP/2 e HTTP/3 aparecem principalmente na borda: CDN, WAF, load balancer, reverse proxy, API gateway ou ingress controller. A borda pode aceitar HTTP/3 dos clientes e encaminhar HTTP/2 ou HTTP/1.1 para backends internos. Isso é normal, desde que haja observabilidade, cabeçalhos corretos, política de segurança e entendimento do ponto de terminação TLS.</p>\n  <p>Essa arquitetura melhora performance percebida, mas também cria novas perguntas: onde o TLS termina? Quem registra logs? O WAF entende HTTP/2 e HTTP/3? UDP/443 está liberado? Existe fallback para HTTP/2 ou HTTP/1.1? O backend está protegido contra acesso direto? Como correlacionar request IDs entre CDN, WAF, gateway e aplicação?</p>\n  <table class='data-table'><thead><tr><th>Componente</th><th>Papel</th><th>Ponto de atenção</th></tr></thead><tbody><tr><td>CDN</td><td>Aproxima conteúdo do usuário</td><td>Cache, invalidação, headers e logs</td></tr><tr><td>WAF</td><td>Filtra tráfego HTTP</td><td>Suporte a HTTP/2/3 e bypass de backend</td></tr><tr><td>Load balancer</td><td>Distribui chamadas</td><td>TLS termination, health check e protocolo backend</td></tr><tr><td>API Gateway</td><td>Política, autenticação e quota</td><td>Rate limit, JWT, request ID e tracing</td></tr><tr><td>Backend</td><td>Executa regra de negócio</td><td>Não deve depender de estar exposto diretamente</td></tr></tbody></table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine um restaurante. HTTP/1.1 é como pedir um prato por vez em várias filas diferentes. Se uma fila trava, você abre outra, mas isso consome mais atendentes. HTTP/2 é como ter uma única mesa com vários pedidos numerados sendo tratados ao mesmo tempo pelo mesmo garçom. HTTP/3 é como um sistema de pedidos por aplicativo em que cada pedido tem seu próprio acompanhamento e a troca de rede do cliente não necessariamente perde a conversa inteira.</p>\n  <p>A analogia tem limite: protocolos não são garçons, e performance real depende de rede, servidor, cache, aplicação, banco e cliente. Ainda assim, ela ajuda a entender a motivação: reduzir filas desnecessárias e melhorar paralelismo sem perder controle.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você abre uma página que carrega HTML, CSS, JavaScript, três imagens e duas chamadas de API. Em HTTP/1.1, o navegador pode abrir várias conexões para buscar tudo em paralelo. Em HTTP/2, muitas dessas requisições podem seguir por uma única conexão TLS, em streams diferentes. Em HTTP/3, essa conversa pode ocorrer sobre QUIC/UDP, com streams independentes e menor impacto de algumas perdas.</p>\n  <p>Para o usuário, o resultado esperado é carregamento mais fluido. Para quem opera a rede, o importante é enxergar se a versão negociada é realmente <code>h2</code> ou <code>h3</code>, se há fallback, se UDP/443 está bloqueado e se o problema está no protocolo ou no backend.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa publica o portal de clientes atrás de CDN, WAF e load balancer. Usuários externos negociam HTTP/3 com a CDN quando possível. A CDN conversa com o WAF em HTTP/2. O WAF encaminha para o load balancer, e o load balancer fala HTTP/1.1 com os backends legados.</p>\n  <p>Essa cadeia pode funcionar muito bem, mas precisa ser documentada. Se o time de Segurança bloqueia UDP/443 na borda, HTTP/3 deixa de funcionar e clientes fazem fallback para HTTP/2. Se o WAF não entende corretamente determinada combinação de frames, pode gerar falso positivo. Se os logs não preservam request ID, fica difícil saber em qual etapa a latência surgiu.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, serviços gerenciados como CDNs, application load balancers, API gateways e ingress controllers podem habilitar HTTP/2 ou HTTP/3 com poucas opções de configuração. Isso facilita adoção, mas também pode esconder detalhes: política TLS, ciphers, suporte a ALPN, logs de borda, comportamento de cache e protocolo usado até o backend.</p>\n  <p>Em uma arquitetura híbrida, a borda cloud pode receber HTTP/3, mas o tráfego para o datacenter pode passar por VPN, firewall, proxy e backend HTTP/1.1. Uma melhoria na borda não resolve lentidão causada por banco de dados, rota ruim, MTU, WAF mal calibrado ou backend saturado.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a versão HTTP negociada pode ser validada em testes automatizados. Um pipeline pode verificar se o endpoint público suporta TLS correto, ALPN, HTTP/2, headers de segurança, compressão adequada, cache-control coerente e request IDs. Também pode medir latência p95/p99 e falhar quando uma mudança aumenta tempo de resposta além do limite acordado.</p>\n  <p>Em Kubernetes, Ingress, Gateway API e service mesh podem terminar TLS, fazer roteamento HTTP e coletar métricas. O risco é habilitar recursos sem governança: HTTP/2 até o ingress, mas backend sem limite de concorrência; QUIC habilitado na borda sem logs suficientes; ou CDN cacheando respostas sensíveis por erro de header.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>HTTP/2 e HTTP/3 melhoram performance, mas não tornam a aplicação automaticamente segura. Ainda é necessário validar autenticação, autorização, CORS, headers, rate limit, body size, upload, cache, WAF, logs e exposição direta do backend.</p>\n  <p>Novas versões também mudam a superfície de inspeção. Dispositivos antigos podem não interpretar HTTP/2 corretamente. HTTP/3 usa UDP/443, o que pode contornar controles pensados apenas em TCP/443 se a arquitetura não estiver preparada. Além disso, alguns ataques exploram quantidade de streams, headers comprimidos, consumo de memória, requisições lentas ou comportamento de proxies.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> habilitar HTTP/2 ou HTTP/3 exige observabilidade, limites, WAF compatível, fallback compreendido, logs confiáveis e validação de configuração na borda e no backend.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 620' role='img' aria-labelledby='m08l07-title m08l07-desc'>\n    <title id='m08l07-title'>HTTP/2, HTTP/3 e QUIC em uma arquitetura moderna</title>\n    <desc id='m08l07-desc'>Diagrama mostrando cliente, DNS, CDN/WAF, load balancer, gateway e backend, com HTTP/3 sobre QUIC UDP, HTTP/2 sobre TCP TLS e fallback para HTTP/1.1.</desc>\n    <defs><marker id='m08l07-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'/></marker></defs>\n    <rect x='35' y='70' width='130' height='85' rx='14' class='svg-node svg-node--client'/>\n    <text x='100' y='104' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='100' y='130' text-anchor='middle' class='svg-label svg-label--small'>browser/mobile</text>\n    <rect x='205' y='70' width='115' height='85' rx='14' class='svg-node svg-node--cloud'/>\n    <text x='262' y='104' text-anchor='middle' class='svg-label'>DNS</text>\n    <text x='262' y='130' text-anchor='middle' class='svg-label svg-label--small'>api.exemplo</text>\n    <rect x='360' y='55' width='150' height='115' rx='16' class='svg-node svg-node--firewall'/>\n    <text x='435' y='88' text-anchor='middle' class='svg-label'>CDN/WAF</text>\n    <text x='435' y='116' text-anchor='middle' class='svg-label svg-label--small'>h3/QUIC UDP 443</text>\n    <text x='435' y='140' text-anchor='middle' class='svg-label svg-label--small'>h2/TLS TCP 443</text>\n    <rect x='555' y='70' width='145' height='85' rx='14' class='svg-node svg-node--router'/>\n    <text x='627' y='103' text-anchor='middle' class='svg-label'>Load Balancer</text>\n    <text x='627' y='130' text-anchor='middle' class='svg-label svg-label--small'>ALPN • TLS</text>\n    <rect x='740' y='70' width='145' height='85' rx='14' class='svg-node svg-node--server'/>\n    <text x='812' y='103' text-anchor='middle' class='svg-label'>API Backend</text>\n    <text x='812' y='130' text-anchor='middle' class='svg-label svg-label--small'>HTTP/1.1 ou h2</text>\n    <rect x='165' y='265' width='185' height='95' rx='14' class='svg-node svg-node--security'/>\n    <text x='257' y='298' text-anchor='middle' class='svg-label'>HTTP/2</text>\n    <text x='257' y='325' text-anchor='middle' class='svg-label svg-label--small'>frames • streams • HPACK</text>\n    <rect x='415' y='265' width='185' height='95' rx='14' class='svg-node svg-node--cloud'/>\n    <text x='507' y='298' text-anchor='middle' class='svg-label'>HTTP/3</text>\n    <text x='507' y='325' text-anchor='middle' class='svg-label svg-label--small'>QUIC • UDP • TLS 1.3</text>\n    <rect x='665' y='265' width='185' height='95' rx='14' class='svg-node svg-node--security'/>\n    <text x='757' y='298' text-anchor='middle' class='svg-label'>Observabilidade</text>\n    <text x='757' y='325' text-anchor='middle' class='svg-label svg-label--small'>logs • traces • p95/p99</text>\n    <rect x='165' y='450' width='685' height='90' rx='16' class='svg-zone'/>\n    <text x='507' y='485' text-anchor='middle' class='svg-label'>Checklist de performance e segurança</text>\n    <text x='507' y='515' text-anchor='middle' class='svg-label svg-label--small'>ALPN • TLS • UDP/443 • fallback • cache • WAF • limites • request ID • backend protegido</text>\n    <line x1='165' y1='112' x2='205' y2='112' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l07-arrow)'/>\n    <line x1='320' y1='112' x2='360' y2='112' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l07-arrow)'/>\n    <line x1='510' y1='112' x2='555' y2='112' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l07-arrow)'/>\n    <line x1='700' y1='112' x2='740' y2='112' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l07-arrow)'/>\n    <line x1='435' y1='170' x2='257' y2='265' class='svg-flow svg-flow--response' marker-end='url(#m08l07-arrow)'/>\n    <line x1='435' y1='170' x2='507' y2='265' class='svg-flow svg-flow--response' marker-end='url(#m08l07-arrow)'/>\n    <line x1='627' y1='155' x2='757' y2='265' class='svg-flow svg-flow--response' marker-end='url(#m08l07-arrow)'/>\n    <text x='490' y='205' text-anchor='middle' class='svg-label svg-label--small'>A versão HTTP pode mudar entre cliente, borda, proxy e backend</text>\n    <text x='490' y='585' text-anchor='middle' class='svg-label'>Performance moderna depende de protocolo, rede, cache, backend, observabilidade e governança</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório você vai investigar qual versão HTTP é negociada por um endpoint, comparar sinais de HTTP/1.1, HTTP/2 e possível HTTP/3, verificar TLS/ALPN, observar DevTools e montar uma matriz de performance e segurança. O objetivo não é forçar tráfego em terceiros, mas aprender um método defensivo e reproduzível.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam comparação entre versões HTTP, interpretação de ALPN, análise de sintomas de performance, identificação de bloqueio de UDP/443 e desenho de fallback seguro.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá o cenário de uma API lenta para usuários móveis. Seu desafio será separar problemas de DNS, TLS, HTTP/2, HTTP/3, CDN, WAF, cache e backend, propondo um plano de teste com evidências.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada aplica investigação por camadas: resolução de nome, negociação TLS/ALPN, versão HTTP, tempo de conexão, TTFB, cache, WAF, gateway, backend, logs e métricas p95/p99.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>HTTP/2 e HTTP/3 existem para melhorar eficiência e performance da comunicação HTTP moderna. HTTP/2 introduz multiplexação, frames binários e compressão de headers sobre uma conexão normalmente protegida por TLS/TCP. HTTP/3 usa QUIC sobre UDP, com TLS 1.3 integrado e streams mais independentes.</p>\n  <p>Essas tecnologias ajudam, mas não resolvem tudo. Latência de backend, consultas lentas, cache incorreto, WAF mal configurado, bloqueio de UDP/443, logs pobres e TLS mal gerido ainda derrubam performance e segurança. A competência prática está em medir, comparar e diagnosticar com evidências.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula você estudará troubleshooting HTTP com curl, navegador, logs e traces. Agora que você entende versões modernas e performance, vamos criar um método prático para diagnosticar problemas HTTP reais de ponta a ponta.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "HTTP/2",
      "HTTP/3",
      "QUIC",
      "TLS",
      "Performance"
    ],
    "beforeThisLesson": "O aluno já entende HTTP básico, requisição/resposta, HTTPS/TLS, cookies/tokens, proxies, APIs e transporte TCP/UDP.",
    "afterThisLesson": "O aluno entende por que HTTP/2 e HTTP/3 existem, como são negociados e quais impactos geram em performance, segurança, troubleshooting e arquitetura.",
    "dependsOn": [
      "DNS",
      "TCP",
      "UDP",
      "TLS",
      "ALPN",
      "HTTP",
      "Proxy",
      "WAF",
      "CDN",
      "Load balancer",
      "Observabilidade"
    ]
  },
  "protocolFields": [
    {
      "field": "ALPN",
      "meaning": "Extensão TLS usada para negociar o protocolo de aplicação, como h2 ou http/1.1.",
      "securityNote": "Sem visibilidade de ALPN, troubleshooting de versão HTTP fica impreciso."
    },
    {
      "field": "HTTP/2 Stream ID",
      "meaning": "Identifica streams independentes dentro de uma conexão HTTP/2.",
      "securityNote": "Limites de streams ajudam a evitar abuso de concorrência."
    },
    {
      "field": "HTTP/2 Frame",
      "meaning": "Unidade binária de transporte de dados, headers e controle em HTTP/2.",
      "securityNote": "WAFs e proxies precisam entender frames corretamente."
    },
    {
      "field": "HPACK/QPACK",
      "meaning": "Mecanismos de compressão de headers em HTTP/2 e HTTP/3.",
      "securityNote": "Compressão de headers exige cuidado com limites e consumo de memória."
    },
    {
      "field": "QUIC Connection ID",
      "meaning": "Identificador que permite manter associação lógica mesmo com mudanças de IP/rede.",
      "securityNote": "Ajuda mobilidade, mas exige logs adequados para correlação."
    },
    {
      "field": "UDP/443",
      "meaning": "Porta normalmente usada por QUIC/HTTP/3.",
      "securityNote": "Controles que olham apenas TCP/443 podem não cobrir HTTP/3."
    },
    {
      "field": "Alt-Svc",
      "meaning": "Header que pode anunciar disponibilidade de HTTP/3 ou serviços alternativos.",
      "securityNote": "Anúncios de serviço devem ser coerentes com política de borda e monitoramento."
    }
  ],
  "packetFlow": [
    "Cliente resolve DNS do serviço HTTP/HTTPS.",
    "Cliente tenta conexão HTTPS com TLS e anuncia protocolos suportados via ALPN.",
    "Se negociado HTTP/2, mensagens HTTP trafegam como frames em streams multiplexados sobre TCP/TLS.",
    "Se disponível HTTP/3, o cliente pode usar QUIC sobre UDP/443, com TLS 1.3 integrado.",
    "CDN/WAF/load balancer pode terminar a conexão moderna e encaminhar outro protocolo para o backend.",
    "Logs e traces devem registrar versão HTTP, request ID, latência, status, cache e backend escolhido.",
    "Em falha de HTTP/3, o cliente pode fazer fallback para HTTP/2 ou HTTP/1.1, dependendo de suporte e política."
  ],
  "deepDive": {
    "title": "Head-of-line blocking e por que HTTP/3 importa",
    "content": "Em HTTP/2, vários streams compartilham uma conexão TCP. Se um pacote TCP é perdido, TCP precisa recuperar a sequência antes de entregar dados posteriores para a aplicação. Isso pode atrasar streams que, no nível HTTP/2, seriam independentes. HTTP/3, usando QUIC, move multiplexação para cima do UDP e permite tratamento mais independente de streams. Isso não torna perda irrelevante, mas reduz certos efeitos de bloqueio e melhora comportamento em redes móveis e instáveis.",
    "securityAngle": "Mudanças de transporte alteram inspeção, telemetria e controles. Organizações precisam decidir como tratar UDP/443, logs QUIC, fallback e compatibilidade com WAF/CDN."
  },
  "commonMistakes": [
    "Achar que HTTP/2 ou HTTP/3 corrige backend lento.",
    "Confundir HTTP/3 com simplesmente 'HTTP sobre UDP' sem entender QUIC e TLS 1.3.",
    "Bloquear UDP/443 sem documentar impacto em HTTP/3 e sem fallback monitorado.",
    "Habilitar HTTP/2/3 na borda, mas não coletar versão HTTP, latência por etapa e request ID.",
    "Assumir que todos os proxies, WAFs e ferramentas de inspeção entendem corretamente HTTP/2 e HTTP/3.",
    "Cachear respostas sensíveis por erro de headers durante otimização de performance."
  ],
  "troubleshooting": {
    "method": "Separar negociação, transporte, protocolo, borda e backend.",
    "steps": [
      "Verifique DNS e IP de destino.",
      "Teste TLS, SNI e ALPN.",
      "Identifique se a resposta veio em HTTP/1.1, HTTP/2 ou HTTP/3.",
      "Compare comportamento com e sem CDN/proxy quando permitido.",
      "Verifique DevTools: protocolo, cache, TTFB, timing e waterfall.",
      "Colete logs da borda: CDN, WAF, load balancer, gateway e backend.",
      "Compare p50, p95 e p99 antes de concluir que o protocolo é a causa.",
      "Teste fallback quando UDP/443 é bloqueado em ambiente controlado."
    ],
    "commands": [
      {
        "platform": "Linux/macOS",
        "command": "curl -I --http2 https://api.exemplo.com",
        "purpose": "Forçar tentativa de HTTP/2 e observar headers/status."
      },
      {
        "platform": "Linux/macOS",
        "command": "curl -I --http3 https://api.exemplo.com",
        "purpose": "Testar HTTP/3 quando a build do curl suporta QUIC."
      },
      {
        "platform": "Linux/macOS",
        "command": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -alpn h2,http/1.1",
        "purpose": "Verificar TLS, SNI, certificado e protocolo ALPN negociado."
      },
      {
        "platform": "Linux",
        "command": "tcpdump -n 'tcp port 443 or udp port 443'",
        "purpose": "Observar se o tráfego usa TCP/443 ou UDP/443 em teste autorizado."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection api.exemplo.com -Port 443",
        "purpose": "Validar conectividade TCP/443."
      },
      {
        "platform": "Navegador",
        "command": "DevTools > Network > Protocol/Timing",
        "purpose": "Ver protocolo, cache, TTFB, waterfall e latência por recurso."
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a HTTP/2, HTTP/3, QUIC e performance.",
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
      "Habilitar HTTP/2/3 apenas em componentes suportados e monitorados.",
      "Manter TLS moderno, certificados válidos e ALPN correto.",
      "Registrar versão HTTP, request ID, cache status, latência, origem e backend.",
      "Garantir que WAF/CDN/proxy cubram HTTP/2 e HTTP/3 ou documentar fallback.",
      "Aplicar limites de tamanho de header, body, quantidade de streams, taxa e concorrência.",
      "Bloquear acesso direto ao backend quando a política exige passagem pela borda."
    ],
    "badPractices": [
      "Habilitar HTTP/3 sem monitorar UDP/443.",
      "Desativar TLS verification para 'resolver' erro de certificado.",
      "Aceitar qualquer origem no cache/CDN sem revisar headers sensíveis.",
      "Permitir backend público além do WAF.",
      "Não testar fallback em redes corporativas que bloqueiam UDP.",
      "Comparar performance só por média e ignorar p95/p99."
    ],
    "threats": [
      "Bypass de WAF por backend exposto diretamente.",
      "Abuso de streams, headers ou conexões para consumo de recurso.",
      "Inspeção incompleta de HTTP/2/HTTP/3 por appliances legados.",
      "Exfiltração ou bypass por UDP/443 quando controles só cobrem TCP/443.",
      "Cache indevido de respostas autenticadas ou sensíveis.",
      "Falta de logs para investigar incidentes em borda CDN/WAF."
    ],
    "mitigations": [
      "Inventariar todos os pontos de terminação TLS e protocolos aceitos.",
      "Usar WAF/CDN/API Gateway compatíveis com versões modernas.",
      "Aplicar rate limit, stream limits, header limits e body limits.",
      "Coletar logs padronizados com request ID e versão HTTP.",
      "Validar configurações em pipeline e por scanner defensivo autorizado.",
      "Proteger backends com rede privada, security groups e regras de origem confiável."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em HTTP/2, HTTP/3, QUIC e performance",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Inventariar todos os pontos de terminação TLS e protocolos aceitos.",
      "Usar WAF/CDN/API Gateway compatíveis com versões modernas.",
      "Aplicar rate limit, stream limits, header limits e body limits.",
      "Coletar logs padronizados com request ID e versão HTTP.",
      "Validar configurações em pipeline e por scanner defensivo autorizado.",
      "Proteger backends com rede privada, security groups e regras de origem confiável."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-8.7",
    "title": "Investigando HTTP/2, HTTP/3, QUIC e performance de forma defensiva",
    "labType": "cloud",
    "objective": "Identificar versão HTTP negociada, sinais de ALPN, uso de TCP/443 versus UDP/443, cache, timing e possíveis gargalos de performance.",
    "scenario": "Laboratório Neste laboratório você vai investigar qual versão HTTP é negociada por um endpoint, comparar sinais de HTTP/1.1, HTTP/2 e possível HTTP/3, verificar TLS/ALPN, observar DevTools e montar uma matriz de performance e segurança. O objetivo não é forçar tráfego em terceiros, mas aprender um método defensivo e reproduzível.",
    "topology": "Estação do aluno -> DNS -> Internet/lab endpoint -> CDN/WAF/load balancer opcional -> aplicação HTTP/HTTPS de teste.",
    "architecture": "O laboratório separa cliente, resolução de nome, TLS/ALPN, versão HTTP, transporte, borda, cache e backend. Quando não houver endpoint próprio, use apenas domínios públicos de forma passiva e comandos de consulta não invasivos.",
    "prerequisites": [
      "curl com suporte a HTTP/2",
      "openssl",
      "navegador com DevTools",
      "tcpdump ou Wireshark opcional",
      "ambiente próprio ou endpoint de laboratório para testes mais detalhados"
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 180,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não faça carga, stress test ou benchmark agressivo em terceiros.",
      "Não capture tráfego de outras pessoas.",
      "Sanitize domínios internos, IPs públicos, cookies, tokens e headers sensíveis.",
      "Use endpoints próprios para testes repetidos ou comparativos.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Resolver o nome",
        "instruction": "Consulte DNS do endpoint escolhido.",
        "command": "dig api.exemplo.com\nResolve-DnsName api.exemplo.com",
        "expectedOutput": "Você identifica IPs, CNAME/CDN e possíveis múltiplas respostas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “HTTP/2, HTTP/3, QUIC e performance” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Verificar TLS e ALPN",
        "instruction": "Teste SNI, certificado e protocolo negociado.",
        "command": "openssl s_client -connect api.exemplo.com:443 -servername api.exemplo.com -alpn h2,http/1.1",
        "expectedOutput": "A saída indica certificado e protocolo ALPN selecionado quando disponível.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “HTTP/2, HTTP/3, QUIC e performance” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Testar HTTP/2 com curl",
        "instruction": "Faça uma requisição de cabeçalhos e observe versão e status.",
        "command": "curl -I --http2 https://api.exemplo.com\ncurl -v --http2 https://api.exemplo.com",
        "expectedOutput": "O curl mostra negociação, headers e status code.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “HTTP/2, HTTP/3, QUIC e performance” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Verificar HTTP/3 quando suportado",
        "instruction": "Use curl com suporte a HTTP/3 ou DevTools do navegador.",
        "command": "curl -I --http3 https://api.exemplo.com",
        "expectedOutput": "Se suportado, o cliente usa HTTP/3; se não, ocorre erro ou fallback dependendo da ferramenta.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “HTTP/2, HTTP/3, QUIC e performance” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Observar TCP/443 versus UDP/443",
        "instruction": "Em ambiente autorizado, capture apenas metadados de conexão.",
        "command": "sudo tcpdump -n 'tcp port 443 or udp port 443'",
        "expectedOutput": "Você identifica se o cliente usou TCP/443, UDP/443 ou ambos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “HTTP/2, HTTP/3, QUIC e performance” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Analisar DevTools",
        "instruction": "Abra a aba Network e observe Protocol, Timing, TTFB, cache e waterfall.",
        "command": "DevTools > Network > Protocol\nDevTools > Network > Timing",
        "expectedOutput": "Você vê quais recursos usam h2/h3, quais vêm de cache e quais demoram no servidor.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “HTTP/2, HTTP/3, QUIC e performance” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Montar matriz de diagnóstico",
        "instruction": "Documente protocolo, transporte, cache, status, TTFB, borda e backend provável.",
        "command": "Planilha ou markdown de evidências",
        "expectedOutput": "Você possui uma visão clara de onde investigar performance.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “HTTP/2, HTTP/3, QUIC e performance” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “HTTP/2, HTTP/3, QUIC e performance”.",
    "validation": [
      {
        "check": "A entrega mínima é uma matriz com DNS, TLS/ALPN, versão HTTP, transporte, status code, cache, TTFB e hipótese de gargalo.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "A entrega mínima é uma matriz com DNS, TLS/ALPN, versão HTTP, transporte, status code, cache, TTFB e hipótese de gargalo.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se curl não suporta HTTP/3, use DevTools ou instale build compatível em laboratório.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se HTTP/3 falhar, teste se UDP/443 está bloqueado.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se h2 não negociar, verifique ALPN, TLS e configuração do servidor/load balancer.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se TTFB for alto, investigue backend, banco, WAF, cache miss e rota até origem.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se DevTools mostra cache, repita com cache desabilitado para diagnóstico controlado.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar métricas p95/p99 por protocolo.",
      "Comparar CDN on/off em ambiente próprio.",
      "Criar teste automatizado de ALPN/TLS no pipeline.",
      "Registrar request ID de ponta a ponta.",
      "Adicionar alertas para queda de suporte a HTTP/2/3 ou aumento de fallback."
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
      "Qual evidência mostra que o laboratório de “HTTP/2, HTTP/3, QUIC e performance” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Diagnosticar lentidão em API móvel com HTTP/2/HTTP/3",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "expectedOutcome": "Ao final, você consegue dizer se um serviço negocia HTTP/2/HTTP/3, se há fallback, se UDP/443 participa, quais sinais aparecem em DevTools/curl e onde buscar gargalos."
  },
  "mentorQuestions": [
    "Quando HTTP/3 melhora a experiência e quando ele não muda quase nada?",
    "Como você provaria que a lentidão está no backend e não na negociação HTTP?",
    "Quais controles precisam ser revisados antes de liberar UDP/443 para QUIC em uma empresa?"
  ],
  "quiz": [
    {
      "question": "Qual é uma das principais melhorias do HTTP/2 sobre HTTP/1.1?",
      "options": [
        "Eliminar DNS",
        "Multiplexar streams em uma conexão",
        "Substituir TLS",
        "Usar apenas UDP"
      ],
      "answer": 1,
      "explanation": "HTTP/2 usa streams multiplexados e frames binários, normalmente sobre TLS/TCP."
    },
    {
      "question": "HTTP/3 usa qual base de transporte?",
      "options": [
        "TCP puro",
        "ICMP",
        "QUIC sobre UDP",
        "SMTP"
      ],
      "answer": 2,
      "explanation": "HTTP/3 transporta semântica HTTP sobre QUIC, que roda sobre UDP."
    },
    {
      "question": "ALPN é importante porque:",
      "options": [
        "Define o endereço IP",
        "Negocia protocolo de aplicação durante TLS",
        "Substitui certificados",
        "Resolve cache DNS"
      ],
      "answer": 1,
      "explanation": "ALPN permite cliente e servidor escolherem h2, http/1.1 e outros protocolos durante TLS."
    },
    {
      "question": "Bloquear UDP/443 pode afetar diretamente:",
      "options": [
        "HTTP/3/QUIC",
        "ARP",
        "DHCP DORA",
        "STP"
      ],
      "answer": 0,
      "explanation": "HTTP/3 usa QUIC sobre UDP, geralmente na porta 443."
    },
    {
      "question": "Uma melhoria de HTTP/2/3 não corrige automaticamente:",
      "options": [
        "Backend lento",
        "Uso de streams",
        "Compressão de headers",
        "Negociação de protocolo"
      ],
      "answer": 0,
      "explanation": "Se o backend demora para processar, trocar versão HTTP pode não resolver o gargalo principal."
    },
    {
      "question": "Qual prática é defensiva ao habilitar HTTP/3?",
      "options": [
        "Desativar logs para reduzir latência",
        "Permitir backend público direto",
        "Monitorar UDP/443, fallback, versão HTTP e logs de borda",
        "Ignorar WAF porque QUIC já é seguro"
      ],
      "answer": 2,
      "explanation": "HTTP/3 exige visibilidade e governança, especialmente por usar UDP/443 e componentes de borda."
    }
  ],
  "flashcards": [
    {
      "front": "O que HTTP/2 muda em relação ao HTTP/1.1?",
      "back": "Mantém a semântica HTTP, mas usa frames binários, streams multiplexados e compressão de headers."
    },
    {
      "front": "O que é QUIC?",
      "back": "Um protocolo sobre UDP que integra TLS 1.3, streams, confiabilidade e controle de congestionamento, usado pelo HTTP/3."
    },
    {
      "front": "O que é ALPN?",
      "back": "Extensão TLS usada para negociar o protocolo de aplicação, como h2 ou http/1.1."
    },
    {
      "front": "Por que HTTP/3 usa UDP/443?",
      "back": "Porque QUIC roda sobre UDP e normalmente usa a porta 443 para atravessar redes que já permitem tráfego web seguro."
    },
    {
      "front": "HTTP/2 elimina head-of-line blocking?",
      "back": "Ele reduz bloqueio no nível HTTP, mas ainda pode sofrer com head-of-line blocking do TCP."
    },
    {
      "front": "Qual cuidado de segurança é essencial com HTTP/3?",
      "back": "Garantir que UDP/443 seja monitorado, que WAF/CDN suportem o protocolo e que haja fallback e logs adequados."
    }
  ],
  "exercises": [
    {
      "title": "Comparar versões",
      "prompt": "Explique em uma tabela as diferenças entre HTTP/1.1, HTTP/2 e HTTP/3 em transporte, multiplexação e pontos de troubleshooting.",
      "expectedAnswer": "HTTP/1.1 usa TCP e múltiplas conexões; HTTP/2 usa frames/streams sobre TCP/TLS; HTTP/3 usa QUIC sobre UDP com TLS 1.3 integrado."
    },
    {
      "title": "Diagnóstico de bloqueio UDP",
      "prompt": "Uma aplicação funciona em HTTP/2, mas nunca negocia HTTP/3 em uma rede corporativa. Liste hipóteses e evidências.",
      "expectedAnswer": "Bloqueio UDP/443, proxy sem suporte, cliente sem HTTP/3, servidor/CDN sem h3, política de inspeção. Evidências: DevTools, tcpdump, logs de firewall e curl."
    },
    {
      "title": "Backend lento",
      "prompt": "O DevTools mostra h2 negociado, mas TTFB alto. Qual caminho de investigação?",
      "expectedAnswer": "Verificar logs de gateway, WAF, backend, banco, cache miss, p95/p99, request ID e tempo de processamento."
    },
    {
      "title": "Governança",
      "prompt": "Crie uma checklist mínima para habilitar HTTP/3 em uma API pública.",
      "expectedAnswer": "TLS, ALPN, UDP/443, WAF/CDN compatível, logs, fallback, rate limit, cache, request ID, métricas e teste em pipeline."
    }
  ],
  "challenge": {
    "title": "Diagnosticar lentidão em API móvel com HTTP/2/HTTP/3",
    "scenario": "Usuários mobile relatam lentidão intermitente em uma API pública. No escritório a API parece normal. A CDN anuncia HTTP/3, mas a rede corporativa bloqueia UDP/443. Logs mostram p95 alto apenas em algumas regiões.",
    "tasks": [
      "Montar hipóteses por camada.",
      "Definir evidências para DNS, TLS/ALPN, HTTP/2, HTTP/3, UDP/443, CDN, WAF e backend.",
      "Criar plano de testes seguro.",
      "Propor mitigação temporária e correção definitiva.",
      "Definir métricas que devem ser acompanhadas após a mudança."
    ],
    "rubric": [
      "Separa protocolo de backend.",
      "Não faz testes agressivos em produção.",
      "Inclui fallback e logs de borda.",
      "Considera rede móvel e regiões.",
      "Propõe métricas p95/p99 e request ID."
    ]
  },
  "commentedSolution": {
    "summary": "A lentidão deve ser investigada por camadas: primeiro DNS e CDN, depois TLS/ALPN, versão HTTP, transporte TCP/UDP, cache, WAF, gateway, backend e banco. O bloqueio de UDP/443 explica ausência de HTTP/3 na rede corporativa, mas não necessariamente explica p95 alto em mobile. É preciso comparar regiões, cache hit/miss, TTFB e logs por request ID.",
    "steps": [
      "Validar h2/h3 com DevTools e curl.",
      "Capturar metadados de TCP/443 e UDP/443 em ambiente autorizado.",
      "Comparar p95/p99 por região e por protocolo.",
      "Verificar cache hit/miss e WAF processing time.",
      "Correlacionar request ID até backend.",
      "Aplicar mitigação com cache, ajuste de origem, fallback monitorado ou roteamento regional conforme evidência."
    ],
    "keyTakeaway": "HTTP/3 é uma ferramenta de performance, não um diagnóstico por si só. A causa real precisa ser comprovada por medições e logs correlacionados."
  },
  "glossary": [
    {
      "term": "HTTP/2",
      "definition": "Versão do HTTP que usa frames binários, multiplexação de streams e compressão de headers."
    },
    {
      "term": "HTTP/3",
      "definition": "Versão do HTTP que roda sobre QUIC em vez de TCP."
    },
    {
      "term": "QUIC",
      "definition": "Protocolo sobre UDP com TLS 1.3 integrado, streams e controle de congestionamento."
    },
    {
      "term": "ALPN",
      "definition": "Extensão TLS para negociar o protocolo de aplicação."
    },
    {
      "term": "Head-of-line blocking",
      "definition": "Situação em que um item perdido ou atrasado bloqueia a entrega de itens posteriores."
    },
    {
      "term": "TTFB",
      "definition": "Time to First Byte, métrica que indica o tempo até o primeiro byte da resposta."
    }
  ],
  "references": [
    "RFC 7540 — Hypertext Transfer Protocol Version 2",
    "RFC 9114 — HTTP/3",
    "RFC 9000 — QUIC: A UDP-Based Multiplexed and Secure Transport",
    "RFC 8446 — TLS 1.3",
    "Documentação de navegadores sobre DevTools Network e protocolo HTTP"
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "Módulo 8",
      "lesson": "8.4",
      "reason": "TCP e congestionamento explicam parte dos limites do HTTP/2."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 8",
      "lesson": "8.5",
      "reason": "UDP é a base sobre a qual QUIC roda."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e observabilidade",
      "reason": "Testes de performance, headers e protocolo podem entrar em pipelines e SLOs."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Tokens e autenticação",
      "reason": "APIs modernas usam TLS e tokens; performance não elimina validação de identidade."
    }
  ],
  "progressRules": {
    "completionCriteria": [
      "Ler todas as seções obrigatórias.",
      "Concluir o laboratório lab-8.7.",
      "Acertar pelo menos 70% do quiz.",
      "Entregar matriz de diagnóstico com versão HTTP, transporte, TLS/ALPN, cache, TTFB e hipótese de gargalo."
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "8.8"
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
