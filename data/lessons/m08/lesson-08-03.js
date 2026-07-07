export const lesson0803 = {
  "id": "8.3",
  "moduleId": "m08",
  "order": 3,
  "title": "HTTPS, TLS, certificados, SNI e cadeia de confiança",
  "subtitle": "Entenda como HTTP ganha confidencialidade, integridade e autenticação por meio de TLS: handshake, certificados, autoridade certificadora, SNI, cadeia de confiança, erros comuns, proxies, WAFs, cloud e troubleshooting defensivo.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "redes",
    "http",
    "https",
    "tls",
    "certificados",
    "sni",
    "pki",
    "segurança",
    "proxy",
    "waf",
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
      "reason": "HTTPS protege a conversa HTTP apresentada no início do módulo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.2",
      "title": "Requisições e respostas: métodos, URLs, headers, body e status codes",
      "reason": "TLS protege a troca de métodos, URLs, headers, bodies e status codes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.3",
      "title": "TCP: handshake, estado e encerramento",
      "reason": "TLS normalmente começa depois de uma conexão TCP estabelecida."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.1",
      "title": "Por que DNS existe",
      "reason": "Certificados e SNI dependem do nome usado pelo cliente, não apenas do IP."
    }
  ],
  "objectives": [
    "Explicar por que HTTPS não é um protocolo separado de aplicação, mas HTTP protegido por TLS.",
    "Descrever a função de TLS em confidencialidade, integridade e autenticação do servidor.",
    "Entender certificado, chave pública, chave privada, CA, cadeia de confiança e validação pelo cliente.",
    "Explicar o papel de SNI quando vários sites HTTPS compartilham o mesmo IP e a mesma porta.",
    "Diagnosticar erros comuns de HTTPS: certificado expirado, nome incompatível, CA não confiável, cadeia incompleta e protocolo/cifra incompatível.",
    "Relacionar TLS com proxies reversos, WAFs, load balancers, service mesh, mTLS, cloud e DevSecOps."
  ],
  "learningOutcomes": [
    "Ler a saída de curl e openssl s_client para identificar certificado, SNI, emissor, validade e cadeia.",
    "Diferenciar criptografia de transporte, autenticação do servidor e autenticação de cliente com mTLS.",
    "Explicar por que um certificado válido para um domínio pode falhar em outro nome ou ambiente interno.",
    "Montar um checklist defensivo de publicação HTTPS para aplicação ou API.",
    "Separar falha de DNS, TCP, TLS, proxy e aplicação durante um incidente web."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Na aula anterior você aprendeu a ler uma conversa HTTP. O problema é que HTTP puro viaja em texto claro: método, path, headers, cookies, tokens, body e status podem ser observados ou alterados por qualquer ponto no caminho que consiga interceptar o tráfego.</p>\n  <p>Em ambientes corporativos, isso é inaceitável. Uma API de RH, um portal de banco, um webhook de pipeline, um painel de SIEM ou uma aplicação interna podem transportar credenciais, sessões, dados pessoais e decisões de negócio. HTTPS surge para proteger essa conversa contra espionagem, adulteração e falsificação do servidor.</p>\n  <div class='callout'><strong>Ideia central:</strong> HTTPS é HTTP transportado dentro de uma sessão TLS. TCP entrega bytes, HTTP estrutura a conversa e TLS protege a conversa.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No começo da Web, muitos sites trafegavam HTTP sem criptografia. Isso fazia sentido em um período de documentos públicos e baixa transacionalidade. Conforme a Web passou a hospedar bancos, comércio eletrônico, e-mail, autenticação, APIs e serviços corporativos, ficou claro que não bastava entregar páginas: era necessário proteger a comunicação.</p>\n  <p>SSL foi uma das primeiras tentativas populares de criar uma camada criptográfica para a Web. Com o amadurecimento do ecossistema, TLS substituiu SSL como padrão moderno. A ideia permaneceu: antes de enviar dados HTTP sensíveis, cliente e servidor negociam parâmetros criptográficos, validam identidade e criam chaves de sessão.</p>\n  <p>Hoje, TLS está em navegadores, APIs, service meshes, bancos de dados, mensageria, VPNs, pipelines, proxies, WAFs, CDNs, load balancers e plataformas cloud. Ele deixou de ser um detalhe de navegador e virou fundamento de confiança digital.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Sem TLS, uma requisição HTTP pode ser lida e modificada no caminho. Um atacante em uma rede Wi-Fi, um proxy mal configurado, um equipamento comprometido ou uma rota indevida poderia capturar cookies, tokens, payloads e respostas. Além disso, o cliente não teria uma forma robusta de saber se está falando com o servidor legítimo.</p>\n  <p>Mas criptografar não resolve tudo sozinho. O cliente também precisa validar identidade. Não adianta uma conexão criptografada com o servidor errado. Por isso entram certificados, nomes, autoridade certificadora e cadeia de confiança.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> HTTPS precisa responder três perguntas: estou falando com o servidor certo? Ninguém consegue ler a conversa? Ninguém consegue alterar a conversa sem ser detectado?</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>A evolução de HTTPS acompanhou a evolução da própria Internet. No início, certificados eram caros e usados principalmente em login e pagamento. Depois, a pressão por privacidade, a automação de certificados e o crescimento de APIs tornaram HTTPS o padrão esperado para praticamente todo serviço web.</p>\n  <p>Também houve evolução técnica. Versões antigas de SSL/TLS, cifras fracas e algoritmos obsoletos foram abandonados. TLS moderno reduziu round trips, fortaleceu a negociação criptográfica e melhorou a segurança padrão. Ao mesmo tempo, SNI permitiu hospedar múltiplos sites HTTPS no mesmo IP, pois o cliente informa o nome desejado durante o handshake.</p>\n  <p>Em arquiteturas atuais, TLS pode terminar no load balancer, seguir até o backend, ser recriptografado em proxies, ou existir ponta a ponta com mTLS entre serviços. Cada escolha muda troubleshooting, custo operacional, observabilidade e superfície de risco.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>HTTPS</strong> é o uso de HTTP sobre uma sessão protegida por TLS. O TLS fornece confidencialidade, integridade e autenticação do servidor. Confidencialidade significa que terceiros não devem conseguir ler o conteúdo. Integridade significa que alterações no caminho devem ser detectadas. Autenticação do servidor significa que o cliente valida que o certificado apresentado corresponde ao nome acessado e foi emitido por uma cadeia confiável.</p>\n  <div class='definition-box'>HTTPS = HTTP + TLS. Certificado não “criptografa o site inteiro”; ele participa da validação de identidade e da negociação segura que permite criar chaves de sessão.</div>\n  <p>Na prática, quando você acessa <code>https://api.empresa.com</code>, o navegador ou cliente valida DNS, abre TCP, negocia TLS usando SNI, valida certificado, estabelece chaves e só então envia a requisição HTTP protegida.</p>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>O fluxo simplificado começa antes do HTTP. Primeiro o nome é resolvido via DNS. Depois o cliente abre uma conexão TCP para a porta 443. Em seguida começa o handshake TLS.</p>\n  <ol class='flow-list'>\n    <li>Cliente envia <strong>ClientHello</strong>, com versões suportadas, cifras, extensões e normalmente o <strong>SNI</strong> com o nome do host.</li>\n    <li>Servidor responde com parâmetros escolhidos e apresenta seu <strong>certificado</strong> ou cadeia de certificados.</li>\n    <li>Cliente valida nome, validade, emissor, cadeia, uso permitido e confiança da CA raiz/intermediária.</li>\n    <li>Cliente e servidor negociam material criptográfico para gerar chaves de sessão.</li>\n    <li>Depois do TLS estabelecido, o HTTP trafega protegido dentro dessa sessão.</li>\n  </ol>\n  <table class='data-table'><thead><tr><th>Elemento</th><th>Função</th><th>Erro comum</th></tr></thead><tbody><tr><td>Certificado</td><td>Associa uma chave pública a nomes e uma identidade validável</td><td>Certificado vencido ou emitido para outro nome</td></tr><tr><td>Chave privada</td><td>Prova posse da identidade no servidor</td><td>Chave exposta em repositório ou imagem</td></tr><tr><td>CA</td><td>Entidade que assina certificados</td><td>CA interna ausente no trust store do cliente</td></tr><tr><td>Cadeia</td><td>Conecta certificado final a uma CA confiável</td><td>Intermediário não enviado pelo servidor</td></tr><tr><td>SNI</td><td>Informa o nome desejado no handshake</td><td>Servidor entrega certificado padrão errado</td></tr></tbody></table>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura simples, o TLS termina no próprio servidor web. Em arquiteturas corporativas, porém, o TLS frequentemente termina em uma borda: CDN, WAF, proxy reverso, load balancer, ingress controller ou API gateway. Depois disso, o tráfego pode seguir em HTTP interno, HTTPS recriptografado ou mTLS até o backend.</p>\n  <table class='comparison-table'><thead><tr><th>Modelo</th><th>Como funciona</th><th>Vantagem</th><th>Limitação/Risco</th></tr></thead><tbody><tr><td>TLS fim a fim</td><td>Cliente negocia TLS diretamente com a aplicação</td><td>Menos pontos de exposição intermediária</td><td>Menos inspeção e mais complexidade por serviço</td></tr><tr><td>TLS termination</td><td>Load balancer/WAF encerra TLS e fala com backend</td><td>Centraliza certificados, WAF e logs</td><td>Trecho interno pode ficar sem criptografia se mal desenhado</td></tr><tr><td>Recriptografia</td><td>Borda encerra TLS e abre novo TLS para backend</td><td>Equilibra inspeção e proteção interna</td><td>Exige gestão de certificados internos</td></tr><tr><td>mTLS</td><td>Cliente e servidor apresentam certificados</td><td>Autenticação forte entre serviços</td><td>Gestão de identidade, rotação e revogação mais complexa</td></tr></tbody></table>\n  <p>Não existe um único modelo sempre correto. A escolha depende de compliance, inspeção, latência, custo, automação, observabilidade, privacidade e capacidade operacional.</p>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine que você precisa enviar um contrato por uma empresa de entregas. HTTP puro seria entregar o contrato aberto, visível para todos no caminho. TLS coloca o contrato em um cofre lacrado. O certificado funciona como um documento que prova que a pessoa recebendo o cofre representa a empresa correta. A cadeia de confiança é a sequência de cartórios e autoridades que tornam esse documento confiável.</p>\n  <p>A analogia tem limite: TLS não garante que a aplicação é segura, que o usuário está autorizado ou que o backend não tem vulnerabilidades. Ele protege o canal e valida identidade criptográfica, mas não substitui autenticação, autorização, validação de entrada, logging ou hardening HTTP.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você acessa <code>https://exemplo.local</code>. O cliente resolve o nome, conecta na porta 443, envia ClientHello com SNI <code>exemplo.local</code>, recebe um certificado válido para esse nome, valida a cadeia e só então envia <code>GET /</code>.</p>\n  <p>Se o certificado estiver vencido, o navegador alerta. Se o certificado for de <code>outro.local</code>, há erro de nome. Se a CA não for confiável, há erro de confiança. Se a cadeia intermediária estiver incompleta, alguns clientes podem falhar mesmo que o certificado pareça correto no servidor.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa publica <code>portal.empresa.com</code> atrás de um WAF e load balancer. O certificado público fica na borda. O WAF inspeciona HTTP, aplica políticas, adiciona request ID e encaminha para backends internos. Para compliance, o tráfego da borda até o backend também usa TLS com certificados emitidos por uma CA interna.</p>\n  <p>O time de segurança precisa controlar vencimento de certificados, versões TLS, cifras, HSTS, logs, SNI, nomes alternativos, certificados internos e exceções de inspeção. O time de operações precisa diagnosticar se uma falha 525, 502 ou handshake failed veio do cliente, WAF, load balancer, backend ou trust store.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, certificados podem ser gerenciados por serviços como Certificate Manager, Key Vault, Application Gateway, Load Balancer HTTP, CDN ou API Gateway. O nome público aponta via DNS para a borda cloud. O TLS pode terminar nessa borda e seguir para serviços privados, containers, funções serverless ou endpoints internos.</p>\n  <p>Erros comuns incluem esquecer de associar o certificado ao listener, usar SNI incorreto, não incluir o SAN adequado, misturar certificado de ambiente dev com produção, não configurar cadeia intermediária ou permitir políticas TLS antigas por compatibilidade legada.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em pipelines, TLS aparece em testes de integração, chamadas para APIs externas, webhooks, registries, scanners, runners, service meshes e publicação de ingress. IaC deve declarar certificados, listeners, políticas TLS, redirecionamento HTTP para HTTPS, secrets, rotação e alertas de vencimento.</p>\n  <p>Uma boa pipeline não valida apenas se o endpoint responde. Ela verifica se o certificado é válido, se o nome bate, se versões fracas estão desabilitadas, se HSTS está presente quando aplicável, se o backend correto responde e se segredos não foram logados durante troubleshooting.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Para Segurança da Informação, HTTPS reduz espionagem e adulteração no caminho, mas também cria pontos de atenção. TLS termination concentra chaves e tráfego claro em uma borda. Inspeção TLS corporativa precisa ser governada. Certificados wildcard ampliam impacto se a chave privada vazar. Certificados internos exigem trust store bem gerido.</p>\n  <div class='callout callout--security'><strong>Boa prática:</strong> trate certificado como ativo crítico. Controle emissão, escopo, proprietário, validade, rotação, armazenamento da chave privada, logs de uso e alertas de expiração.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <p>O diagrama mostra o fluxo de HTTPS com DNS, TCP, SNI, certificado, cadeia de confiança, sessão TLS e HTTP protegido.</p>\n  <svg class='lesson-svg' viewBox='0 0 960 600' role='img' aria-labelledby='m08l03-title m08l03-desc'>\n    <title id='m08l03-title'>Fluxo HTTPS com TLS, SNI e cadeia de confiança</title>\n    <desc id='m08l03-desc'>Cliente resolve DNS, abre TCP, envia SNI, valida certificado e troca HTTP dentro de TLS.</desc>\n    <defs><marker id='m08l03-arrow' markerWidth='10' markerHeight='10' refX='9' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'/></marker></defs>\n    <rect x='35' y='80' width='150' height='80' rx='14' class='svg-node svg-node--client'/>\n    <text x='110' y='115' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='110' y='140' text-anchor='middle' class='svg-label svg-label--small'>Browser/curl</text>\n    <rect x='235' y='80' width='150' height='80' rx='14' class='svg-node svg-node--server'/>\n    <text x='310' y='115' text-anchor='middle' class='svg-label'>DNS</text>\n    <text x='310' y='140' text-anchor='middle' class='svg-label svg-label--small'>api.empresa.com</text>\n    <rect x='455' y='80' width='180' height='80' rx='14' class='svg-node svg-node--firewall'/>\n    <text x='545' y='112' text-anchor='middle' class='svg-label'>WAF / LB</text>\n    <text x='545' y='138' text-anchor='middle' class='svg-label svg-label--small'>TLS termination</text>\n    <rect x='735' y='80' width='170' height='80' rx='14' class='svg-node svg-node--server'/>\n    <text x='820' y='112' text-anchor='middle' class='svg-label'>Backend</text>\n    <text x='820' y='138' text-anchor='middle' class='svg-label svg-label--small'>HTTP/HTTPS</text>\n    <line x1='185' y1='120' x2='235' y2='120' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l03-arrow)'/>\n    <text x='210' y='100' text-anchor='middle' class='svg-label svg-label--small'>1 DNS</text>\n    <line x1='385' y1='120' x2='455' y2='120' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m08l03-arrow)'/>\n    <text x='420' y='100' text-anchor='middle' class='svg-label svg-label--small'>IP</text>\n    <line x1='110' y1='190' x2='545' y2='190' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l03-arrow)'/>\n    <text x='330' y='178' text-anchor='middle' class='svg-label svg-label--small'>2 TCP 443</text>\n    <line x1='110' y1='250' x2='545' y2='250' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l03-arrow)'/>\n    <text x='330' y='238' text-anchor='middle' class='svg-label svg-label--small'>3 ClientHello + SNI: api.empresa.com</text>\n    <rect x='390' y='290' width='310' height='115' rx='14' class='svg-node svg-node--security'/>\n    <text x='545' y='320' text-anchor='middle' class='svg-label'>Certificado</text>\n    <text x='545' y='348' text-anchor='middle' class='svg-label svg-label--small'>SAN: api.empresa.com</text>\n    <text x='545' y='374' text-anchor='middle' class='svg-label svg-label--small'>Emitido por CA intermediária</text>\n    <line x1='545' y1='290' x2='545' y2='250' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m08l03-arrow)'/>\n    <rect x='70' y='435' width='250' height='90' rx='14' class='svg-node svg-node--security'/>\n    <text x='195' y='465' text-anchor='middle' class='svg-label'>Trust store</text>\n    <text x='195' y='493' text-anchor='middle' class='svg-label svg-label--small'>CA raiz + intermediárias</text>\n    <line x1='390' y1='350' x2='320' y2='465' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m08l03-arrow)'/>\n    <line x1='545' y1='440' x2='820' y2='440' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m08l03-arrow)'/>\n    <text x='682' y='425' text-anchor='middle' class='svg-label svg-label--small'>4 HTTP protegido / recriptografado</text>\n    <line x1='820' y1='485' x2='545' y2='485' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m08l03-arrow)'/>\n    <line x1='545' y1='530' x2='110' y2='530' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m08l03-arrow)'/>\n    <text x='330' y='555' text-anchor='middle' class='svg-label svg-label--small'>Resposta HTTP protegida por TLS</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório você vai validar uma conexão HTTPS de forma defensiva: DNS, TCP, SNI, certificado, cadeia, validade, protocolo, status HTTP e headers. O objetivo é aprender a separar erro de certificado de erro de aplicação.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam leitura de certificado, identificação de erro TLS, interpretação de SNI, análise de cadeia e montagem de checklist de publicação segura.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário de API atrás de load balancer com falhas intermitentes de TLS. Sua tarefa será diagnosticar nome, certificado, SNI, cadeia, backend e proxy sem expor segredos.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada mostra como investigar HTTPS por camadas: DNS, TCP, ClientHello/SNI, certificado, cadeia, trust store, política TLS, proxy e resposta HTTP.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>HTTPS é HTTP protegido por TLS. TLS fornece confidencialidade, integridade e autenticação do servidor. Certificados ligam nomes a chaves públicas e são validados por uma cadeia de confiança. SNI permite que o servidor escolha o certificado correto para o nome solicitado.</p>\n  <p>Em ambientes reais, TLS está conectado a DNS, TCP, proxies, WAFs, load balancers, certificados internos, mTLS, cloud, pipelines e observabilidade. Saber diagnosticar HTTPS é essencial para Segurança, Redes, DevSecOps e Operações.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula você estudará cookies, sessões, tokens e estado em aplicações web. Depois de proteger o canal com TLS, precisamos entender como aplicações reconhecem usuários e mantêm contexto entre requisições.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Camada 6",
      "Camada 4"
    ],
    "beforeThisLesson": "O aluno já entende HTTP básico, requisições, respostas, DNS, TCP, portas e firewall stateful.",
    "afterThisLesson": "O aluno consegue explicar e diagnosticar HTTPS/TLS, certificados, SNI e cadeia de confiança em ambientes reais.",
    "dependsOn": [
      "DNS",
      "TCP",
      "HTTP",
      "PKI",
      "Certificados",
      "Proxies",
      "Load balancers",
      "WAFs"
    ]
  },
  "protocolFields": [
    {
      "field": "ClientHello",
      "meaning": "Mensagem inicial do cliente TLS com versões, cifras, extensões e SNI.",
      "securityNote": "Permite observar intenção de conexão; versões/cifras fracas devem ser desabilitadas."
    },
    {
      "field": "SNI",
      "meaning": "Nome do servidor desejado enviado durante o handshake TLS.",
      "securityNote": "SNI errado pode entregar certificado incorreto; também pode vazar o nome acessado quando não protegido por ECH."
    },
    {
      "field": "Certificate",
      "meaning": "Certificado apresentado pelo servidor com chave pública, nomes, emissor e validade.",
      "securityNote": "Deve ter SAN correto, validade adequada, cadeia completa e chave privada protegida."
    },
    {
      "field": "SAN",
      "meaning": "Subject Alternative Name; lista de nomes para os quais o certificado é válido.",
      "securityNote": "CN legado não deve ser usado como única referência; SAN amplo demais aumenta risco."
    },
    {
      "field": "Issuer",
      "meaning": "Autoridade que emitiu o certificado ou certificado intermediário.",
      "securityNote": "Cliente precisa confiar na cadeia até uma raiz conhecida ou gerenciada."
    },
    {
      "field": "Session Keys",
      "meaning": "Chaves temporárias negociadas para proteger a sessão.",
      "securityNote": "Não devem ser reutilizadas de forma insegura; forward secrecy reduz impacto de vazamentos futuros."
    }
  ],
  "packetFlow": [
    "Cliente resolve o nome do serviço via DNS.",
    "Cliente abre conexão TCP com o endereço e a porta 443.",
    "Cliente envia ClientHello com SNI e capacidades TLS.",
    "Servidor escolhe parâmetros e envia certificado/cadeia.",
    "Cliente valida nome, validade, cadeia, CA e uso permitido.",
    "Cliente e servidor negociam chaves de sessão.",
    "HTTP passa a trafegar protegido dentro do túnel TLS.",
    "Proxy/WAF/LB pode terminar TLS, inspecionar HTTP e reencaminhar ao backend.",
    "Logs e métricas devem correlacionar handshake, status HTTP e backend."
  ],
  "deepDive": {
    "title": "TLS não substitui segurança da aplicação",
    "points": [
      "TLS protege o canal, mas não corrige autorização fraca, SQL injection, XSS ou lógica insegura.",
      "Certificado válido não significa que o backend é seguro; significa que a identidade do endpoint foi validada segundo a cadeia configurada.",
      "mTLS autentica cliente e servidor, mas ainda exige autorização e governança de identidade.",
      "TLS termination melhora inspeção e operação, mas cria ponto sensível onde tráfego pode estar claro.",
      "Certificados wildcard reduzem esforço operacional, mas ampliam impacto se a chave privada vazar.",
      "Erros de cadeia podem aparecer apenas em alguns clientes, especialmente sistemas legados ou containers com trust store incompleta."
    ],
    "operationalImpact": [
      "TLS exige gestão de certificados, monitoramento de validade, cadeia correta e padronização de clientes.",
      "Termination em proxy/load balancer melhora operação, mas cria ponto sensível onde tráfego pode estar em claro.",
      "SNI, SAN e trust store precisam estar documentados para evitar incidentes intermitentes."
    ],
    "financialImpact": [
      "Certificados públicos, HSM, appliances, WAF, balanceadores e ferramentas de monitoramento podem gerar custo recorrente.",
      "Falhas de renovação causam indisponibilidade e acionamento fora de horário.",
      "Logs e inspeção TLS aumentam custo de armazenamento e operação."
    ],
    "securityImpact": [
      "TLS reduz interceptação, mas não substitui autenticação, autorização e validação de aplicação.",
      "Chaves privadas vazadas ou certificados wildcard ampliam impacto.",
      "Desabilitar validação TLS ou usar -k em produção remove proteção contra impersonation."
    ]
  },
  "commonMistakes": [
    "Renovar certificado público e esquecer certificado interno do backend.",
    "Acessar serviço por IP e esperar que certificado emitido para nome funcione.",
    "Não enviar cadeia intermediária completa no servidor ou load balancer.",
    "Usar certificado wildcard sem controle forte da chave privada.",
    "Desabilitar validação TLS em código, curl ou pipeline para ‘resolver rápido’.",
    "Permitir TLS antigo por compatibilidade sem plano de eliminação.",
    "Confundir erro 502 do proxy com erro de certificado do cliente."
  ],
  "troubleshooting": {
    "method": "Investigar HTTPS por camadas: DNS, TCP 443, SNI, certificado, cadeia, trust store, política TLS, proxy/load balancer, backend e status HTTP.",
    "windows": [
      "Resolve-DnsName api.empresa.com",
      "Test-NetConnection api.empresa.com -Port 443",
      "curl.exe -vkI https://api.empresa.com/health",
      "curl.exe --resolve api.empresa.com:443:<IP> -vk https://api.empresa.com/health",
      "certutil -urlcache * delete"
    ],
    "linux": [
      "dig api.empresa.com",
      "curl -vkI https://api.empresa.com/health",
      "openssl s_client -connect api.empresa.com:443 -servername api.empresa.com -showcerts",
      "echo | openssl s_client -connect api.empresa.com:443 -servername api.empresa.com 2>/dev/null | openssl x509 -noout -issuer -subject -dates -ext subjectAltName",
      "sudo tcpdump -n host <ip> and port 443"
    ],
    "browser": [
      "Verificar cadeado e detalhes do certificado",
      "Abrir DevTools e comparar Security, Network, status e timing",
      "Validar nome, emissor, validade e cadeia",
      "Testar janela anônima para reduzir interferência de cache/extensões",
      "Copiar como curl sem tokens reais para reprodução controlada"
    ],
    "proxyGateway": [
      "Conferir listener 443 e certificado associado",
      "Validar SNI/Host rules",
      "Checar política TLS mínima e cifras permitidas",
      "Validar health checks do backend via HTTPS quando aplicável",
      "Comparar logs de WAF/LB com logs do backend por request ID"
    ],
    "cloud": [
      "Conferir certificado gerenciado e domínio associado",
      "Verificar listener HTTPS, regra por host/path e backend pool",
      "Validar private DNS se o backend usa endpoints privados",
      "Checar logs de TLS negotiation e 4xx/5xx no balanceador",
      "Garantir alertas de expiração e rotação automática quando disponível"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a HTTPS, TLS, certificados, SNI e cadeia de confiança.",
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
        "platform": "Linux/macOS",
        "command": "dig example.com A",
        "purpose": "Confirmar DNS antes do TLS.",
        "expectedObservation": "A ou CNAME retornado.",
        "interpretation": "Destino errado causa certificado inesperado."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection example.com -Port 443",
        "purpose": "Validar transporte TCP.",
        "expectedObservation": "TcpTestSucceeded True.",
        "interpretation": "Sem TCP não há handshake TLS."
      },
      {
        "platform": "Linux/macOS",
        "command": "openssl s_client -connect example.com:443 -servername example.com -showcerts </dev/null",
        "purpose": "Inspecionar handshake, SNI, cadeia e verify code.",
        "expectedObservation": "Certificado, cipher, protocolo e verify return code.",
        "interpretation": "Base principal para diagnóstico TLS."
      },
      {
        "platform": "Linux/macOS",
        "command": "openssl x509 -noout -subject -issuer -dates -ext subjectAltName",
        "purpose": "Ler campos do certificado capturado.",
        "expectedObservation": "SAN, issuer e validade.",
        "interpretation": "Nome e validade precisam bater com o endpoint."
      },
      {
        "platform": "Linux/Windows",
        "command": "curl -vI https://example.com/",
        "purpose": "Validar HTTPS de ponta a ponta.",
        "expectedObservation": "TLS validado e status HTTP.",
        "interpretation": "Se TLS passa e HTTP falha, investigar camada de aplicação."
      }
    ],
    "decisionTree": [
      {
        "if": "Falha antes do certificado",
        "then": "Investigar DNS, rota, proxy, firewall e TCP 443."
      },
      {
        "if": "Certificado apresentado para outro nome",
        "then": "Verificar SNI, Host, DNS e virtual host."
      },
      {
        "if": "Certificado vencido",
        "then": "Renovar certificado e validar rollout em todos os nós."
      },
      {
        "if": "Issuer desconhecido",
        "then": "Conferir cadeia intermediária e trust store do cliente."
      },
      {
        "if": "curl -k funciona",
        "then": "Não considerar resolvido; corrigir validação TLS real."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar HTTPS por padrão e redirecionar HTTP para HTTPS quando aplicável.",
      "Manter TLS moderno e desabilitar protocolos/cifras obsoletos.",
      "Automatizar emissão, renovação e alerta de expiração de certificados.",
      "Proteger chaves privadas em cofres, HSMs ou serviços gerenciados.",
      "Validar certificado em clientes, scripts e pipelines; não usar bypass permanente.",
      "Usar mTLS para integrações serviço-a-serviço quando houver exigência forte de identidade.",
      "Documentar dono, escopo, SANs, CA, validade e ponto de terminação TLS."
    ],
    "badPractices": [
      "Rodar HTTP puro para dados sensíveis.",
      "Desabilitar validação TLS em produção.",
      "Compartilhar chave privada por chat, e-mail ou repositório.",
      "Usar certificado curinga sem governança.",
      "Aceitar qualquer CA interna em qualquer ambiente sem escopo.",
      "Deixar certificados expirarem sem alerta.",
      "Permitir TLS legado por tempo indefinido."
    ],
    "attacksAndDefenses": [
      {
        "risk": "Man-in-the-middle",
        "defense": "Validação de certificado, TLS moderno, HSTS e bloqueio de bypass de trust."
      },
      {
        "risk": "Certificado emitido para nome errado",
        "defense": "Revisão de SANs, automação de emissão e testes de SNI por ambiente."
      },
      {
        "risk": "Chave privada vazada",
        "defense": "Cofre de segredos, rotação imediata, revogação e escopo mínimo do certificado."
      },
      {
        "risk": "Downgrade para protocolo fraco",
        "defense": "Política TLS mínima e testes contínuos de configuração."
      },
      {
        "risk": "TLS termination sem proteção interna",
        "defense": "Recriptografia ou mTLS até backend quando risco/compliance exigir."
      },
      {
        "risk": "Cliente ignora validação TLS",
        "defense": "Bloquear verify=false em pipelines, SDKs e código revisado."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em HTTPS, TLS, certificados, SNI e cadeia de confiança",
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
    "id": "lab-8.3",
    "title": "TLS, certificado, SNI e cadeia de confiança com openssl",
    "labType": "local",
    "objective": "Inspecionar uma conexão HTTPS para validar DNS, porta 443, SNI, certificado, validade, SAN, issuer, cadeia e erros comuns de TLS.",
    "scenario": "Um serviço HTTPS funciona no navegador de alguns usuários, mas falha em containers, scripts ou clientes legados. Você precisa provar se o problema é DNS, TCP, SNI, certificado, cadeia, trust store ou versão de TLS.",
    "topology": "Cliente local -> DNS -> TCP 443 -> handshake TLS com SNI -> certificado e cadeia -> resposta HTTP.",
    "architecture": "TLS fica entre transporte e HTTP. O cliente valida identidade do servidor antes de confiar no canal.",
    "prerequisites": [
      "Aulas 8.1 e 8.2 revisadas.",
      "openssl e curl disponíveis.",
      "Usar domínio próprio/autorizado ou domínio público de demonstração como example.com apenas para inspeção passiva."
    ],
    "tools": [
      "openssl",
      "curl",
      "dig ou Resolve-DnsName",
      "nc ou Test-NetConnection",
      "navegador"
    ],
    "estimatedTimeMinutes": 70,
    "cost": "zero",
    "safetyNotes": [
      "Não colete chaves privadas.",
      "Não faça varredura em massa.",
      "Não desative validação TLS em produção; -k só deve ser usado para diagnóstico controlado."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Resolver o nome",
        "instruction": "Confirme o IP/CNAME antes de culpar TLS.",
        "command": "dig example.com A\nResolve-DnsName example.com",
        "expectedOutput": "Registros DNS ou CNAME esperados.",
        "evidence": "Nome, IP/CNAME e resolver usado.",
        "explanation": "TLS depende do nome correto; split DNS pode mudar completamente o destino."
      },
      {
        "number": 2,
        "title": "Validar TCP 443",
        "instruction": "Teste se a porta 443 abre antes do handshake.",
        "command": "nc -vz example.com 443\nTest-NetConnection example.com -Port 443",
        "expectedOutput": "Conexão TCP bem-sucedida.",
        "evidence": "Resultado do teste de porta.",
        "explanation": "Sem TCP, não existe handshake TLS."
      },
      {
        "number": 3,
        "title": "Inspecionar handshake com SNI",
        "instruction": "Use openssl informando -servername para simular cliente moderno.",
        "command": "openssl s_client -connect example.com:443 -servername example.com -showcerts </dev/null",
        "expectedOutput": "Certificado apresentado, cadeia, protocolo, cipher e verify return code.",
        "evidence": "Subject, issuer, SAN, validade, protocolo, cipher e verify return code.",
        "explanation": "Sem SNI, servidores com múltiplos sites podem apresentar certificado errado."
      },
      {
        "number": 4,
        "title": "Comparar com ausência de SNI",
        "instruction": "Remova -servername e veja se o certificado muda.",
        "command": "openssl s_client -connect example.com:443 -showcerts </dev/null",
        "expectedOutput": "Pode apresentar o mesmo certificado ou certificado default, dependendo do servidor.",
        "evidence": "Diferença entre handshake com e sem SNI.",
        "explanation": "Esse teste explica incidentes em clientes antigos, probes e scripts mal configurados."
      },
      {
        "number": 5,
        "title": "Extrair campos do certificado",
        "instruction": "Capture o primeiro certificado e leia subject, issuer, datas e SAN.",
        "command": "openssl s_client -connect example.com:443 -servername example.com -showcerts </dev/null 2>/dev/null | openssl x509 -noout -subject -issuer -dates -ext subjectAltName",
        "expectedOutput": "Subject, issuer, notBefore, notAfter e Subject Alternative Name.",
        "evidence": "Campos relevantes do certificado.",
        "explanation": "Nome incompatível, certificado vencido ou SAN ausente são causas frequentes de falha."
      },
      {
        "number": 6,
        "title": "Validar com curl sem ignorar TLS",
        "instruction": "Faça requisição HEAD com validação normal.",
        "command": "curl -vI https://example.com/",
        "expectedOutput": "TLS validado e resposta HTTP.",
        "evidence": "Trecho com certificado validado e status HTTP.",
        "explanation": "Se openssl mostra problema, curl normalmente também falha sem -k."
      },
      {
        "number": 7,
        "title": "Demonstrar risco de -k apenas como diagnóstico",
        "instruction": "Compare erro real com uso de -k, explicando por que isso não é correção.",
        "command": "curl -vkI https://example.com/",
        "expectedOutput": "O -k ignora validação do certificado, mas não torna a solução segura.",
        "evidence": "Anotação: “-k usado apenas para diagnóstico; não aplicar em produção”.",
        "explanation": "Ignorar validação remove uma proteção central contra interceptação e impersonation."
      },
      {
        "number": 8,
        "title": "Montar matriz de causa TLS",
        "instruction": "Classifique o problema observado.",
        "artifact": "Tabela: sintoma | evidência | causa provável | correção | dono.",
        "expectedOutput": "Matriz com DNS, TCP, SNI, validade, SAN, cadeia, trust store e versão TLS.",
        "evidence": "Matriz final do laboratório.",
        "explanation": "TLS exige análise por camadas, não tentativa aleatória de flags."
      }
    ],
    "expectedResult": "O aluno entrega evidência de handshake TLS com SNI, certificado, validade, cadeia e interpretação segura dos erros.",
    "validation": [
      {
        "check": "DNS resolvido",
        "command": "dig example.com A",
        "expected": "Registro ou CNAME retornado.",
        "ifFails": "Verificar conectividade DNS, resolver e split DNS."
      },
      {
        "check": "TCP 443 acessível",
        "command": "nc -vz example.com 443",
        "expected": "succeeded/open.",
        "ifFails": "Investigar firewall, proxy, rota ou bloqueio de saída."
      },
      {
        "check": "Handshake com SNI executado",
        "command": "openssl s_client -connect example.com:443 -servername example.com </dev/null",
        "expected": "Verify return code: 0 ou erro interpretável.",
        "ifFails": "Conferir nome, proxy TLS, cadeia e trust store."
      },
      {
        "check": "Certificado lido",
        "command": "openssl x509 -noout -subject -issuer -dates -ext subjectAltName",
        "expected": "Subject, issuer, datas e SAN.",
        "ifFails": "Repetir captura do certificado corretamente."
      },
      {
        "check": "HTTP sobre TLS validado",
        "command": "curl -vI https://example.com/",
        "expected": "Status HTTP após TLS.",
        "ifFails": "Diferenciar falha TLS de falha HTTP."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "certificate has expired",
        "probableCause": "Certificado vencido.",
        "howToConfirm": "openssl x509 -noout -dates.",
        "fix": "Renovar certificado e validar cadeia implantada."
      },
      {
        "symptom": "hostname mismatch",
        "probableCause": "SAN não contém o nome acessado.",
        "howToConfirm": "Verificar subjectAltName.",
        "fix": "Emitir certificado com SAN correto ou ajustar DNS/Host."
      },
      {
        "symptom": "unable to get local issuer certificate",
        "probableCause": "Cadeia incompleta ou trust store desatualizada.",
        "howToConfirm": "Comparar cadeia enviada e trust store do cliente.",
        "fix": "Instalar cadeia intermediária correta ou atualizar trust store."
      },
      {
        "symptom": "Certificado diferente com e sem SNI",
        "probableCause": "Cliente não envia SNI ou endpoint virtualizado.",
        "howToConfirm": "Comparar openssl com e sem -servername.",
        "fix": "Configurar cliente/probe para enviar SNI correto."
      },
      {
        "symptom": "curl -k funciona, curl normal falha",
        "probableCause": "Validação TLS real está falhando.",
        "howToConfirm": "Comparar saída com e sem -k.",
        "fix": "Corrigir certificado/cadeia/nome; não usar -k como solução."
      }
    ],
    "improvements": [
      "Testar endpoint interno com certificado corporativo.",
      "Comparar TLS 1.2 e TLS 1.3 quando suportado.",
      "Adicionar verificação automatizada de validade em monitoramento."
    ],
    "evidenceToCollect": [
      "DNS/CNAME do endpoint.",
      "Teste TCP 443.",
      "Saída openssl com SNI.",
      "Subject, issuer, SAN e datas.",
      "Verify return code.",
      "Comando curl validando HTTPS.",
      "Matriz de causa TLS."
    ],
    "questions": [
      "Por que SNI é necessário em virtual hosting HTTPS?",
      "Por que -k não resolve segurança?",
      "Como cadeia incompleta aparece em clientes diferentes?"
    ],
    "challenge": "Escreva um runbook para diferenciar certificado vencido, SAN incorreto, cadeia incompleta, ausência de SNI e bloqueio TCP 443.",
    "solution": "Comece por DNS e TCP. Depois compare openssl com e sem SNI, leia SAN/datas/issuer e valide com curl sem -k. Corrija a causa raiz: certificado, cadeia, trust store, DNS ou cliente sem SNI."
  },
  "mentorQuestions": [
    "Por que HTTPS precisa validar nome e cadeia, e não apenas criptografar bytes?",
    "O que muda quando o TLS termina no load balancer em vez de terminar no backend?",
    "Como você provaria que uma falha é de certificado e não de aplicação?"
  ],
  "quiz": [
    {
      "question": "HTTPS é melhor descrito como:",
      "options": [
        "HTTP sobre TLS",
        "DNS sobre TCP",
        "TCP sem portas",
        "Um substituto para firewall"
      ],
      "answer": 0,
      "explanation": "HTTPS é HTTP protegido por TLS."
    },
    {
      "question": "Qual elemento informa ao servidor o nome desejado durante o handshake TLS?",
      "options": [
        "TTL",
        "SNI",
        "MX",
        "RST"
      ],
      "answer": 1,
      "explanation": "SNI permite que o servidor escolha o certificado correto para o nome solicitado."
    },
    {
      "question": "Um certificado válido para api.empresa.com normalmente falha quando acessado por IP porque:",
      "options": [
        "TLS não usa DNS",
        "O IP não está no SAN do certificado",
        "HTTP não aceita IP",
        "TCP bloqueia certificados"
      ],
      "answer": 1,
      "explanation": "A validação compara o nome acessado com os nomes permitidos no certificado."
    },
    {
      "question": "Qual prática é perigosa em produção?",
      "options": [
        "Validar cadeia",
        "Usar HSTS quando adequado",
        "Desabilitar validação TLS",
        "Alertar expiração"
      ],
      "answer": 2,
      "explanation": "Desabilitar validação TLS remove proteção contra servidor falso."
    },
    {
      "question": "mTLS adiciona principalmente:",
      "options": [
        "Autenticação também do cliente por certificado",
        "Compressão HTTP",
        "Roteamento BGP",
        "Cache DNS"
      ],
      "answer": 0,
      "explanation": "mTLS exige certificado do cliente e do servidor."
    },
    {
      "question": "Cadeia incompleta geralmente envolve:",
      "options": [
        "Falta de certificado intermediário",
        "Porta UDP errada",
        "Status 404",
        "Query string inválida"
      ],
      "answer": 0,
      "explanation": "O servidor pode não enviar intermediários necessários para formar caminho até uma raiz confiável."
    }
  ],
  "flashcards": [
    {
      "front": "O que é HTTPS?",
      "back": "HTTP trafegando dentro de uma sessão TLS."
    },
    {
      "front": "Para que serve SNI?",
      "back": "Informar o nome do host durante o handshake TLS para selecionar o certificado correto."
    },
    {
      "front": "O que é SAN?",
      "back": "Subject Alternative Name: lista de nomes para os quais o certificado é válido."
    },
    {
      "front": "O que é cadeia de confiança?",
      "back": "Sequência certificado final -> intermediária(s) -> raiz confiável."
    },
    {
      "front": "O que é TLS termination?",
      "back": "Quando um proxy, WAF ou load balancer encerra TLS antes de encaminhar ao backend."
    },
    {
      "front": "O que mTLS adiciona?",
      "back": "Autenticação do cliente por certificado, além do servidor."
    }
  ],
  "exercises": [
    {
      "title": "Classifique erros TLS",
      "prompt": "Liste três erros comuns de HTTPS e explique a causa provável de cada um.",
      "expectedAnswer": "Certificado expirado, nome incompatível, CA não confiável/cadeia incompleta, protocolo/cifra incompatível."
    },
    {
      "title": "Desenhe o fluxo",
      "prompt": "Desenhe o fluxo DNS -> TCP -> TLS -> HTTP para https://api.exemplo.com.",
      "expectedAnswer": "Deve incluir resolução DNS, conexão 443, ClientHello/SNI, certificado, validação e HTTP protegido."
    },
    {
      "title": "Compare modelos",
      "prompt": "Compare TLS termination e recriptografia até backend.",
      "expectedAnswer": "Termination centraliza inspeção/certificados; recriptografia protege trecho interno, mas exige gestão adicional."
    },
    {
      "title": "Checklist defensivo",
      "prompt": "Monte cinco itens para publicar uma API HTTPS segura.",
      "expectedAnswer": "SAN correto, cadeia completa, TLS moderno, segredo protegido, alerta de expiração, redirecionamento HTTPS, logs e headers."
    },
    {
      "id": "ex8.3.p1-06.1",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de evidências para diferenciar falha de DNS, TCP, TLS, HTTP, gateway e aplicação usando os comandos do laboratório.",
      "expectedAnswer": "A matriz deve incluir comando, evidência esperada, interpretação e próximo passo para cada camada.",
      "explanation": "Troubleshooting profissional evita pular direto para a aplicação quando a falha pode estar em DNS, transporte, TLS ou proxy."
    }
  ],
  "challenge": {
    "title": "API com erro intermitente de TLS atrás de load balancer",
    "scenario": "Usuários relatam que https://api.corp.example funciona no navegador, mas falha em alguns containers e em um runner de CI. O load balancer usa certificado público e o backend usa certificado interno.",
    "tasks": [
      "Listar hipóteses por camada.",
      "Criar comandos de teste com curl e openssl.",
      "Explicar como validar SNI e cadeia.",
      "Propor evidências sanitizadas.",
      "Sugerir correções permanentes."
    ],
    "rubric": [
      "Separa DNS/TCP/TLS/HTTP.",
      "Não recomenda --insecure como solução.",
      "Considera trust store de containers.",
      "Considera cadeia intermediária e CA interna.",
      "Inclui alertas e automação de rotação."
    ]
  },
  "commentedSolution": {
    "summary": "A investigação deve começar provando DNS e TCP, depois validar TLS com SNI explícito, cadeia, SAN, validade e trust store do cliente. Se navegador funciona e containers falham, a hipótese forte é CA bundle/trust store ou cadeia intermediária ausente.",
    "steps": [
      "Executar dig/Resolve-DnsName para confirmar destino.",
      "Executar Test-NetConnection ou nc para confirmar TCP/443.",
      "Executar curl -vkI para observar onde falha.",
      "Executar openssl s_client com -servername para validar SNI e cadeia.",
      "Comparar trust store do runner/container com máquina que funciona.",
      "Corrigir cadeia no load balancer ou instalar CA interna corretamente nos clientes internos.",
      "Adicionar teste automatizado de validade, SAN e cadeia no pipeline."
    ],
    "lesson": "O erro TLS raramente é resolvido olhando apenas para a aplicação. HTTPS atravessa nome, transporte, certificado, CA, proxy, backend e política operacional."
  },
  "glossary": [
    {
      "term": "HTTPS",
      "definition": "HTTP protegido por TLS."
    },
    {
      "term": "TLS",
      "definition": "Protocolo que fornece confidencialidade, integridade e autenticação para conexões."
    },
    {
      "term": "Certificado",
      "definition": "Documento digital que associa uma chave pública a nomes e uma identidade validável."
    },
    {
      "term": "SNI",
      "definition": "Extensão TLS que informa o nome do servidor desejado durante o handshake."
    },
    {
      "term": "CA",
      "definition": "Autoridade certificadora que emite ou assina certificados."
    },
    {
      "term": "mTLS",
      "definition": "TLS mútuo, onde cliente e servidor apresentam certificados."
    }
  ],
  "references": [
    {
      "title": "RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3",
      "type": "standard",
      "url": "https://www.rfc-editor.org/rfc/rfc8446"
    },
    {
      "title": "RFC 6066 — TLS Extensions: Server Name Indication",
      "type": "standard",
      "url": "https://www.rfc-editor.org/rfc/rfc6066"
    },
    {
      "title": "Mozilla TLS Configuration Guidelines",
      "type": "guide",
      "url": "https://wiki.mozilla.org/Security/Server_Side_TLS"
    },
    {
      "title": "OWASP Transport Layer Protection Cheat Sheet",
      "type": "security-guide",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html"
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
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Módulo de CI/CD e publicação segura",
      "reason": "Automação de certificados, ingress, secrets e policy as code aparecem em pipelines de plataforma."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Identidade de serviços e confiança",
      "reason": "mTLS, certificados e identidade de workloads conectam transporte seguro com autenticação entre serviços."
    }
  ],
  "progressRules": {
    "requiredSections": [
      "motivation",
      "concept",
      "internals",
      "architecture",
      "securityExample",
      "diagram",
      "lab",
      "challenge",
      "summary"
    ],
    "quizMinimumScore": 70,
    "labRequired": true,
    "unlockNextLesson": true,
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
      "8.4"
    ]
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
