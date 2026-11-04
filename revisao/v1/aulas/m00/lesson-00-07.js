export const lesson0007 = {
  "id": "0.7",
  "moduleId": "m00",
  "order": 7,
  "title": "O que é um protocolo",
  "subtitle": "Como computadores combinam regras, mensagens, estados e expectativas para conversar sem improviso.",
  "duration": "105-145 min",
  "estimatedStudyTimeMinutes": 145,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 185,
  "tags": [
    "fundamentos",
    "protocolos",
    "regras",
    "mensagens",
    "estados",
    "handshake",
    "timeout",
    "troubleshooting",
    "segurança",
    "cloud",
    "devsecops",
    "apis"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "A aula 0.1 explica que computadores representam informação como dados digitais."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A aula 0.2 apresenta bits, bytes e representações usadas em campos de protocolos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.6",
      "reason": "A aula 0.6 mostra que tempo, perda e throughput influenciam a comunicação entre sistemas."
    }
  ],
  "objectives": [
    "Explicar protocolo como conjunto de regras de comunicação, não apenas como nome de tecnologia.",
    "Diferenciar sintaxe, semântica, temporização, estados, mensagens, erros e negociação.",
    "Entender por que protocolos precisam de padrões para permitir interoperabilidade entre fabricantes, sistemas e linguagens.",
    "Relacionar protocolos com TCP, UDP, HTTP, DNS, TLS, APIs, autenticação, cloud e DevSecOps.",
    "Identificar falhas comuns de protocolo em logs, capturas, comandos e sintomas de troubleshooting.",
    "Analisar riscos de segurança quando protocolos são mal implementados, mal configurados ou usados fora de contexto."
  ],
  "learningOutcomes": [
    "Dado um protocolo desconhecido, o aluno consegue perguntar quais mensagens existem, em que ordem aparecem, quais campos carregam e quais erros são esperados.",
    "Dado um problema de comunicação, o aluno consegue separar falha de conectividade, falha de formato, falha de estado, falha de autenticação e falha de temporização.",
    "Dado um log de aplicação ou rede, o aluno consegue reconhecer que códigos, timeouts, rejeições e negociações fazem parte de protocolos.",
    "Dado um desenho de arquitetura, o aluno consegue apontar quais protocolos unem cliente, proxy, gateway, API, banco, serviço interno e identidade.",
    "Dado um cenário de segurança, o aluno consegue explicar por que validação, versão, criptografia, autenticação e logs importam em protocolos."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Um computador consegue enviar bytes para outro, mas isso, sozinho, não garante comunicação. O receptor precisa saber onde a mensagem começa e termina, que campos existem, quais valores são permitidos, o que responder, quanto esperar, como tratar erro, quando autenticar e quando encerrar a conversa. Esse conjunto de regras é um <strong>protocolo</strong>.\n  </p>\n  <div class=\"callout\">\n    <strong>Problema real:</strong> um sistema interno parou de integrar com uma API depois de uma atualização. O servidor responde ao ping, o DNS resolve, a porta está aberta e o firewall permite o tráfego. Mesmo assim, a chamada falha. O caminho existe; o que quebrou foi a conversa: versão TLS incompatível, cabeçalho HTTP obrigatório ausente, token expirado ou payload JSON fora do formato esperado.\n  </div>\n  <p>\n    Entender protocolo muda a forma de diagnosticar. Em vez de perguntar só “tem rede?”, você passa a perguntar: a mensagem está no formato certo e na ordem certa? O servidor esperava autenticação antes? Houve negociação de versão? O timeout faz sentido? Um proxy alterou algum cabeçalho?\n  </p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    O problema que um protocolo resolve é a ambiguidade: bytes não carregam significado universal. A sequência <code>47 45 54</code> pode ser só três bytes. Numa requisição HTTP, esses bytes são o texto <code>GET</code>, o método da requisição. O significado existe porque cliente e servidor combinaram antes o mesmo protocolo.\n  </p>\n  <p>\n    Sem esse acordo, um servidor não saberia se o primeiro campo é tamanho, comando, versão, usuário ou conteúdo. Um cliente não saberia se a falta de resposta significa erro, processamento demorado, bloqueio, perda ou encerramento normal. Um protocolo responde a essas dúvidas definindo:\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Formato (sintaxe):</strong> quais campos existem, como são separados e que tamanho têm.</li>\n    <li><strong>Significado (semântica):</strong> o que cada campo quer dizer e quais valores são válidos.</li>\n    <li><strong>Ordem:</strong> qual mensagem vem antes e qual vem depois.</li>\n    <li><strong>Tempo (temporização):</strong> quanto esperar antes de tentar de novo ou desistir.</li>\n    <li><strong>Estado:</strong> em qual fase da conversa cliente e servidor estão.</li>\n    <li><strong>Versão e negociação:</strong> como as partes combinam versão, algoritmos e opções que ambas suportam.</li>\n    <li><strong>Erro:</strong> como rejeitar, redirecionar, negar, repetir ou encerrar.</li>\n    <li><strong>Segurança:</strong> como autenticar, autorizar, criptografar, validar e registrar.</li>\n  </ul>\n  <p>\n    Essas regras só funcionam entre fabricantes diferentes se forem <strong>padronizadas</strong>. Nas primeiras redes, cada fornecedor criava formatos próprios, e máquinas de fornecedores distintos viravam ilhas incompatíveis. A internet cresceu com protocolos abertos, publicados em documentos públicos (como as RFCs do IETF), implementados por vários fornecedores e testados entre si. Essa capacidade de sistemas diferentes conversarem seguindo o mesmo padrão é a <strong>interoperabilidade</strong>.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Erro comum:</strong> achar que protocolo é sinônimo de porta. Porta é apenas um identificador usado em protocolos de transporte para separar conversas. O protocolo inclui regras de mensagem, estado, temporização, erro, versão e comportamento.\n  </div>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> protocolo é o contrato de comunicação entre sistemas. Ele diz o que pode ser enviado, em que formato, em que ordem, em qual momento, com qual resposta esperada e como lidar com exceções.\n  </div>\n  <p>\n    A definição vale para qualquer protocolo, de rede ou de aplicação. TCP tem regras para estabelecer conexão, numerar bytes, confirmar recebimento e encerrar sessão. HTTP tem regras para método, URL, headers, status code e corpo. DNS tem regras para pergunta, tipo de registro e resposta. TLS tem regras para handshake, certificados, chaves e algoritmos. OIDC tem regras para autenticação federada, redirecionamento, tokens e validação.\n  </p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Por dentro, um protocolo combina seis elementos: <strong>mensagens</strong>, <strong>campos</strong>, <strong>estados</strong>, <strong>temporização</strong>, <strong>erros</strong> e <strong>negociação</strong>. Nem todo protocolo tem todos de forma complexa, mas quase todos têm parte deles. Uma conversa típica segue estas fases:\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Início:</strong> uma entidade decide iniciar a comunicação. Pode ser um cliente abrindo conexão TCP, um navegador enviando HTTP ou um resolver perguntando ao DNS.</li>\n    <li><strong>Mensagem inicial:</strong> a primeira mensagem carrega os campos esperados, como versão, método, identificador, tamanho, flags ou destino.</li>\n    <li><strong>Interpretação:</strong> o receptor lê os campos de acordo com o protocolo. Se o formato for inválido, responde com erro ou descarta.</li>\n    <li><strong>Estado:</strong> algumas conversas mudam de fase. Exemplo: antes de autenticar, durante a autenticação, autenticado, encerrando.</li>\n    <li><strong>Resposta:</strong> o receptor responde com sucesso, erro, redirecionamento, desafio de autenticação, confirmação ou o dado pedido.</li>\n    <li><strong>Timeout e repetição:</strong> se algo demora demais, a implementação decide esperar, reenviar, abrir nova conexão ou falhar.</li>\n    <li><strong>Encerramento:</strong> a conversa termina por mensagem explícita, timeout, reset, erro ou fechamento do transporte.</li>\n  </ol>\n  <h3>Tipos de protocolo</h3>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Tipo</th><th>Característica</th><th>Vantagem</th><th>Limitação</th></tr></thead>\n      <tbody>\n        <tr><td>Texto simples</td><td>Mensagens legíveis por humanos</td><td>Facilita depuração e aprendizado</td><td>Pode ser verboso, exige cuidado com parsing e, nos protocolos antigos, costuma trafegar sem criptografia nem autenticação forte</td></tr>\n        <tr><td>Binário</td><td>Campos compactos e estruturados</td><td>Eficiência e controle de tamanho</td><td>Mais difícil de ler sem ferramenta</td></tr>\n        <tr><td>Orientado a conexão</td><td>Mantém estado de conversa</td><td>Permite confiabilidade e sequência</td><td>Mais complexo e sensível a timeouts</td></tr>\n        <tr><td>Sem conexão</td><td>Mensagens independentes</td><td>Menor overhead e simplicidade</td><td>A aplicação precisa lidar com perda e ordem</td></tr>\n        <tr><td>Seguro por negociação</td><td>Combina versões, chaves e algoritmos</td><td>Protege confidencialidade e integridade</td><td>Falhas de configuração geram incompatibilidade</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <h3>Especificação × implementação</h3>\n  <p>\n    A especificação define o comportamento esperado, mas quem executa o protocolo é software e hardware real, que pode ter bugs, configurações incorretas, versões incompatíveis, limites de buffer, parsing inseguro, timeouts agressivos ou logs insuficientes. Daí três cuidados:\n  </p>\n  <ul>\n    <li>um protocolo bem definido não garante implementação correta;</li>\n    <li>um protocolo seguro pode ser configurado de forma insegura;</li>\n    <li>protocolos diferentes podem compartilhar a mesma porta quando há proxy, multiplexação ou encapsulamento.</li>\n  </ul>\n  <p>\n    Por isso, troubleshooting de protocolo exige teoria e evidência prática.\n  </p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>\n    Em vez de um único protocolo resolver tudo, vários cooperam, cada um com seu contrato. Ethernet entrega quadros na rede local. IP endereça e encaminha pacotes entre redes. TCP oferece conexão confiável sobre IP. TLS protege a comunicação. HTTP organiza requisições e respostas. OIDC, por cima de HTTP e TLS, organiza autenticação federada e tokens.\n  </p>\n  <ul>\n    <li><strong>Conectividade:</strong> Ethernet, ARP, IP, ICMP, TCP, UDP e roteamento.</li>\n    <li><strong>Aplicação:</strong> DNS, HTTP, SSH, SMTP, APIs e bancos de dados organizam serviços.</li>\n    <li><strong>Segurança e identidade:</strong> TLS, mTLS, Kerberos, SAML, OIDC e OAuth criam confiança, identidade e proteção.</li>\n    <li><strong>Plataforma:</strong> Kubernetes, service mesh, ingress, API gateway e observabilidade usam protocolos para automatizar comunicação.</li>\n  </ul>\n  <p>\n    Um usuário acessando uma aplicação web pode passar por Wi‑Fi, Ethernet, IP, TCP, TLS, HTTP, DNS, autenticação federada, APIs internas e conexão com banco. Cada trecho pode funcionar ou falhar de forma diferente. Às vezes a rede entrega os bytes perfeitamente, mas a aplicação rejeita a mensagem porque o contrato não foi cumprido.\n  </p>\n  <div class=\"callout warning\">\n    <strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Achar que ping funcionando prova que a aplicação funciona.</strong> Ping testa ICMP e alcance básico; não valida TCP na porta do serviço, TLS, HTTP, autenticação nem a API.</li>\n      <li><strong>Tratar todo erro 4xx ou 5xx como problema de rede.</strong> Esses códigos são respostas do protocolo de aplicação: o servidor recebeu a mensagem e respondeu. Leia os logs da aplicação antes de mexer em firewall e link.</li>\n      <li><strong>Ignorar versão e negociação.</strong> Uma atualização de TLS, API ou schema pode fazer cliente e servidor deixarem de se entender. Documente as versões suportadas, as depreciações e os testes de compatibilidade.</li>\n    </ul>\n  </div>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Imagine uma ligação para abrir um chamado técnico. Existe uma ordem: você cumprimenta, se identifica, informa o problema, responde perguntas, recebe um número de protocolo e encerra. Se você começar falando apenas “azul, 443, erro, ontem”, a pessoa ouve os sons, mas não entende o sentido.\n  </p>\n  <p>\n    Em redes, os bytes são como sons ou letras. O protocolo é a gramática, o formulário, a sequência e a etiqueta da conversa: define o que a outra parte espera receber e como deve responder.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> humanos toleram ambiguidade e improviso; computadores exigem formato rígido, e um caractere a mais, um campo ausente ou uma versão incompatível pode derrubar a comunicação inteira.\n  </div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Acessar um site já envolve vários protocolos cooperando. O DNS traduz o nome para um IP. O TCP, na maioria dos casos, estabelece a conexão. O TLS negocia a criptografia e valida o certificado quando o acesso é HTTPS. O HTTP envia uma requisição com método, caminho, headers e às vezes corpo. O servidor responde com status code, headers e conteúdo.\n  </p>\n  <pre class=\"code-block\"><code>GET / HTTP/1.1\nHost: exemplo.local\nUser-Agent: navegador\nAccept: text/html\n\n</code></pre>\n  <p>\n    Essa pequena mensagem só faz sentido porque cliente e servidor conhecem HTTP. Sem esse contrato, seriam apenas bytes numa conexão.\n  </p>\n  <p>\n    Se algo falhar, o erro depende da etapa. Se o DNS falhar, o nome não resolve. Se o TCP falhar, a porta pode estar fechada ou bloqueada. Se o TLS falhar, pode haver problema de certificado, versão ou inspeção. Se o HTTP responder com erro, o servidor recebeu e entendeu a mensagem e devolveu, por exemplo, 401 (credencial ausente ou inválida), 403 (identidade reconhecida, mas sem permissão), 404 (recurso não encontrado), 429 (limite de requisições excedido) ou 500 (erro interno do servidor). Cada erro pertence a uma parte diferente da conversa.\n  </p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>\n    Considere uma aplicação interna que autentica via SSO. O usuário abre a aplicação com HTTPS. A aplicação redireciona para o provedor de identidade. O navegador carrega cookies, parâmetros e tokens. O provedor autentica o usuário e devolve uma resposta assinada. A aplicação valida assinatura, emissor, audiência, expiração e claims. Tudo isso é protocolo. Um relógio errado, certificado expirado, redirect URI diferente ou token com audiência incorreta pode quebrar o login mesmo com a rede perfeita.\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Sintoma</th><th>Possível camada/protocolo</th><th>Evidência útil</th><th>Hipótese</th></tr></thead>\n      <tbody>\n        <tr><td>Nome não resolve</td><td>DNS</td><td>Resposta NXDOMAIN ou timeout</td><td>Registro ausente, split DNS ou bloqueio</td></tr>\n        <tr><td>Porta não conecta</td><td>TCP/firewall</td><td>Timeout ou connection refused</td><td>Serviço parado, ACL ou rota</td></tr>\n        <tr><td>Erro de certificado</td><td>TLS</td><td>Certificado expirado ou CN/SAN incorreto</td><td>Problema de PKI ou inspeção</td></tr>\n        <tr><td>403 após login</td><td>HTTP/autorização</td><td>Status code e logs de aplicação</td><td>Usuário autenticado sem permissão</td></tr>\n        <tr><td>Token rejeitado</td><td>OIDC/OAuth</td><td>Issuer, audience, expiração e assinatura</td><td>Contrato de identidade quebrado</td></tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>\n    Em cloud, os protocolos continuam lá, mas muitas partes ficam escondidas atrás de serviços gerenciados. Um load balancer pode aceitar HTTPS na borda e falar HTTP com o backend. Um API Gateway pode validar o JWT antes de encaminhar a requisição. Um Private Endpoint muda o caminho de rede sem alterar o protocolo da aplicação. Um banco gerenciado pode exigir TLS, certificado ou autenticação por identidade.\n  </p>\n  <p>\n    O risco é achar que “a cloud resolve a comunicação”. Uma API publicada num API Gateway exige TLS, header de autenticação, método permitido, rota correta e payload JSON válido: a VPC pode estar certa e o DNS pode resolver, e a chamada ainda falha se a mensagem não cumprir o contrato.\n  </p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>\n    Pipelines conversam o tempo todo por protocolos: o Git clona e envia código, o registry publica imagens por HTTPS, o kubectl fala com o API Server do Kubernetes por HTTPS autenticado, providers de IaC chamam APIs cloud por HTTP/TLS, e a federação OIDC permite que o pipeline assuma uma identidade temporária sem guardar segredo fixo.\n  </p>\n  <p>\n    Por isso, quando um pipeline falha, o erro muitas vezes é de protocolo: token expirado, certificado não confiável, proxy interceptando TLS, API retornando 429 por limite de taxa, endpoint exigindo outro método, payload fora do schema, versão de API removida ou diferença de relógio (clock skew) invalidando uma assinatura. Ler o protocolo permite depurar a automação sem adivinhar.\n  </p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>\n    Protocolos são uma fronteira de segurança: definem o que é aceito, rejeitado, autenticado, registrado e criptografado. Um protocolo mal configurado pode permitir downgrade de versão, autenticação fraca, exposição de dados, parsing inseguro, replay ou bypass de controle.\n  </p>\n  <p>\n    Num SOC, conhecer o comportamento normal de um protocolo é o que permite diferenciar tráfego legítimo de varredura, abuso, exfiltração, beaconing, tentativa de autenticação indevida ou simples erro operacional.\n  </p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m00l07-title m00l07-desc\">\n    <title id=\"m00l07-title\">Protocolo como contrato de comunicação</title>\n    <desc id=\"m00l07-desc\">Diagrama mostrando cliente e servidor trocando mensagens com formato, ordem, estado, timeout, erro e segurança.</desc>\n    <defs>\n      <marker id=\"m00l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"45\" y=\"150\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"120\" y=\"184\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"120\" y=\"207\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">implementação A</text>\n    <rect x=\"785\" y=\"150\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"860\" y=\"184\" text-anchor=\"middle\" class=\"svg-label\">Servidor</text>\n    <text x=\"860\" y=\"207\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">implementação B</text>\n    <rect x=\"300\" y=\"40\" width=\"380\" height=\"86\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Contrato do protocolo</text>\n    <text x=\"490\" y=\"98\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">formato + significado + ordem + tempo + erro + segurança</text>\n    <line x1=\"195\" y1=\"170\" x2=\"785\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l07-arrow)\" />\n    <text x=\"490\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mensagem 1: versão, método, campos</text>\n    <line x1=\"785\" y1=\"205\" x2=\"195\" y2=\"205\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l07-arrow)\" />\n    <text x=\"490\" y=\"232\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mensagem 2: status, dados ou erro</text>\n    <rect x=\"245\" y=\"285\" width=\"135\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"312\" y=\"309\" text-anchor=\"middle\" class=\"svg-label\">Estado</text>\n    <text x=\"312\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fase da conversa</text>\n    <rect x=\"422\" y=\"285\" width=\"135\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"490\" y=\"309\" text-anchor=\"middle\" class=\"svg-label\">Timeout</text>\n    <text x=\"490\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">espera e retry</text>\n    <rect x=\"600\" y=\"285\" width=\"135\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"667\" y=\"309\" text-anchor=\"middle\" class=\"svg-label\">Erro</text>\n    <text x=\"667\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rejeitar ou corrigir</text>\n    <path d=\"M120 240 C170 310 205 315 245 315\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#m00l07-arrow)\" />\n    <path d=\"M860 240 C805 310 775 315 735 315\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m00l07-arrow)\" />\n  </svg>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> protocolo é o contrato que dá significado aos bytes trocados entre sistemas; padrões abertos permitem que fabricantes diferentes se entendam.</li>\n    <li><strong>Como ler qualquer protocolo:</strong> pergunte quem inicia, que mensagens existem, quais campos são obrigatórios, quais estados existem, quais erros são possíveis, quanto tempo esperar e que controles de segurança protegem a conversa.</li>\n    <li><strong>Erro comum:</strong> reduzir protocolo a porta ou concluir que “ping funciona, então a aplicação funciona”.</li>\n    <li><strong>Uso real:</strong> separar a falha por etapa (DNS, TCP, TLS, HTTP, autenticação) em APIs, SSO, pipelines e cloud.</li>\n    <li><strong>Segurança:</strong> versões antigas, validação fraca e segredos em logs transformam o protocolo em ponto de risco.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula <strong>0.8 — Como pensar em camadas</strong>, você vai organizar esses contratos em camadas (físico, enlace, rede, transporte, aplicação e segurança) para diagnosticar problemas sem se perder.\n  </p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Todas as camadas, com foco conceitual em aplicação, transporte, rede e enlace"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "ARP",
      "IP",
      "ICMP",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "TLS",
      "SSH",
      "SMTP",
      "OIDC",
      "SAML"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "codificação",
      "sinais",
      "latência",
      "throughput"
    ],
    "enables": [
      "Modelo OSI",
      "TCP/IP",
      "HTTP",
      "DNS",
      "TLS",
      "APIs",
      "IAM",
      "troubleshooting",
      "análise de tráfego"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Conectividade básica funciona, mas aplicação falha",
      "Erro de certificado",
      "Status HTTP inesperado",
      "Timeout após autenticação",
      "API retorna payload inválido",
      "Pipeline falha em chamada a serviço externo"
    ],
    "diagnosticQuestions": [
      "Qual protocolo está sendo usado em cada trecho?",
      "O problema ocorre antes ou depois de DNS?",
      "A porta abre, mas o handshake TLS falha?",
      "Há status code, mensagem de erro ou correlation ID?",
      "Houve mudança de versão, certificado, token, schema ou proxy?",
      "Cliente e servidor concordam sobre método, headers, payload e autenticação?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection example.com -Port 443",
        "purpose": "Validar se há alcance TCP até uma porta específica.",
        "expectedObservation": "TcpTestSucceeded True quando a conexão TCP é possível.",
        "interpretation": "Confirma transporte básico, mas não valida TLS, HTTP ou autenticação."
      },
      {
        "platform": "Windows",
        "command": "curl.exe -I https://example.com",
        "purpose": "Ver headers e status HTTP de forma simples.",
        "expectedObservation": "Status como HTTP/1.1 200, 301, 403 ou 500.",
        "interpretation": "Mostra resposta do protocolo HTTP e ajuda a separar rede de aplicação."
      },
      {
        "platform": "Linux",
        "command": "curl -v https://example.com/",
        "purpose": "Observar DNS, conexão, negociação TLS, headers e resposta HTTP.",
        "expectedObservation": "Linhas com connected, TLS handshake, certificado e status HTTP.",
        "interpretation": "Permite identificar em qual fase a conversa falha."
      },
      {
        "platform": "Linux",
        "command": "ss -tulpen",
        "purpose": "Listar sockets TCP/UDP em escuta e processos associados.",
        "expectedObservation": "Portas, endereços locais e processos.",
        "interpretation": "Ajuda a verificar se o serviço está ouvindo onde deveria."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief",
        "purpose": "Validar estado básico de interfaces antes de culpar protocolos superiores.",
        "expectedObservation": "Interfaces relevantes em up/up.",
        "interpretation": "Se a base está down, protocolos superiores naturalmente falharão."
      },
      {
        "platform": "Cisco IOS",
        "command": "show access-lists",
        "purpose": "Verificar se ACLs podem bloquear um protocolo ou porta.",
        "expectedObservation": "Regras permit/deny com contadores.",
        "interpretation": "Ajuda a correlacionar política de rede com falha de comunicação."
      }
    ],
    "decisionTree": [
      {
        "if": "A interface ou o link está down (cabo, Wi‑Fi, interface fora de up/up)",
        "then": "Resolver a camada física e o enlace antes de investigar protocolos superiores."
      },
      {
        "if": "DNS não resolve o nome",
        "then": "Investigar DNS antes de TCP, TLS ou HTTP."
      },
      {
        "if": "TCP não conecta na porta",
        "then": "Verificar serviço, rota, firewall, ACL, security group ou listener."
      },
      {
        "if": "TCP conecta, mas TLS falha",
        "then": "Verificar certificado, SNI, versão TLS, cadeia de confiança e inspeção."
      },
      {
        "if": "TLS funciona, mas HTTP retorna erro",
        "then": "Ler status code, headers, método, rota, autenticação e logs da aplicação."
      },
      {
        "if": "HTTP funciona manualmente, mas pipeline falha",
        "then": "Comparar token, proxy, variáveis, versão da API, payload e rate limit."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar protocolos, portas, versões e fluxos autorizados.",
      "Definir versões mínimas seguras e desabilitar as obsoletas quando houver alternativa.",
      "Validar formato, tamanho, origem, assinatura e autorização das mensagens.",
      "Registrar status, erro, correlation ID e etapa da falha sem expor segredos.",
      "Usar TLS, autenticação forte e autorização explícita quando o protocolo transportar dados sensíveis."
    ],
    "badPractices": [
      "Liberar portas sem entender o protocolo e o fluxo real.",
      "Aceitar qualquer versão por compatibilidade indefinida.",
      "Registrar tokens, senhas, cookies ou payloads sensíveis em logs.",
      "Assumir que rede interna é automaticamente confiável.",
      "Ignorar erros de certificado ou desativar validação TLS para 'funcionar rápido'."
    ],
    "commonErrors": [
      "Confundir autenticação com autorização.",
      "Confundir criptografia com validação de identidade.",
      "Concluir que porta aberta significa serviço seguro.",
      "Não testar comportamento de erro, timeout e retry.",
      "Não observar diferença entre cliente, proxy, gateway e backend."
    ],
    "vulnerabilities": [
      {
        "name": "Downgrade de protocolo",
        "description": "Cliente e servidor aceitam versão antiga ou mais fraca por compatibilidade.",
        "defensiveExplanation": "O risco é a comunicação cair para uma versão menos segura quando a configuração permite negociação fraca.",
        "mitigation": "Definir versões mínimas, monitorar negociação e remover legados com plano de transição."
      },
      {
        "name": "Validação insuficiente de mensagem",
        "description": "O serviço aceita campos fora do padrão, tamanhos inesperados ou formatos ambíguos.",
        "defensiveExplanation": "Parsing frágil pode causar erro, comportamento inesperado, bypass lógico ou indisponibilidade.",
        "mitigation": "Validar schema, limites de tamanho, tipos, assinatura, origem e autorização."
      },
      {
        "name": "Serviço sem autenticação",
        "description": "O serviço aceita comandos ou consultas sem exigir identidade, confiando apenas em estar na rede interna.",
        "defensiveExplanation": "Qualquer origem que alcance a porta consegue usar o serviço, o que permite acesso indevido e impede atribuir as ações a alguém.",
        "mitigation": "Exigir autenticação forte e autorização por serviço e restringir as origens permitidas com segmentação."
      },
      {
        "name": "Exposição de segredo em protocolo de aplicação",
        "description": "Tokens ou credenciais aparecem em URL, query string, headers logados ou mensagens de erro.",
        "defensiveExplanation": "Segredos em locais logados ou compartilhados podem vazar para SIEM, proxy, histórico ou suporte.",
        "mitigation": "Mascarar logs, usar headers apropriados, reduzir retenção sensível e rotacionar credenciais expostas."
      }
    ],
    "monitoring": [
      "Alertar para picos de 401, 403, 404, 429 e 5xx por rota ou cliente.",
      "Falhas de handshake TLS por versão ou certificado e uso de versões legadas.",
      "Taxa anormal de resets, timeouts e retries.",
      "Mudança repentina de user-agent, método, payload ou endpoint.",
      "Tentativas repetidas de autenticação ou tokens inválidos."
    ],
    "hardening": [
      "Aplicar autenticação e autorização por serviço.",
      "Usar schema validation em APIs.",
      "Limitar tamanho de payload e taxa de requisições.",
      "Padronizar erros sem revelar detalhes sensíveis."
    ],
    "detectionIdeas": [
      "Correlacionar logs de proxy, WAF, aplicação e identidade.",
      "Observar destinos, portas e protocolos incomuns por segmento.",
      "Usar correlation ID para seguir a conversa entre camadas."
    ]
  },
  "lab": {
    "id": "lab-0.7",
    "title": "Observando protocolos no próprio computador",
    "labType": "local",
    "objective": "Identificar evidências de protocolos em uso: sockets, DNS, TCP, TLS, HTTP, status codes e estados de conexão.",
    "scenario": "Você é analista de suporte ou segurança e recebeu a informação de que um serviço web não funciona. Antes de culpar a rede, você irá coletar evidências por etapa da conversa.",
    "topology": "Notebook do aluno -> rede local -> internet -> serviço HTTP/HTTPS público usado apenas para leitura de headers",
    "architecture": "Host cliente executando comandos locais de diagnóstico. Não há exploração, varredura agressiva ou teste de carga.",
    "prerequisites": [
      "Acesso a um terminal Windows PowerShell ou Linux.",
      "Conexão comum com a internet.",
      "Conhecimento das aulas 0.1 a 0.6."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "curl",
      "Test-NetConnection no Windows",
      "ss ou netstat",
      "Opcional: navegador com DevTools"
    ],
    "estimatedTimeMinutes": 35,
    "cost": "zero",
    "safetyNotes": [
      "Não faça varreduras nem testes de carga: use apenas requisições simples de leitura.",
      "Não cole tokens, cookies ou credenciais em comandos."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar conexões locais",
        "instruction": "Liste conexões ou sockets para perceber que aplicações usam endereços, portas e estados.",
        "command": "Windows: netstat -ano\nLinux: ss -tunap   # todas as conexões TCP/UDP com estado\nLinux: ss -tulpen  # só os sockets em escuta",
        "expectedOutput": "Lista de conexões com endereços e portas locais/remotos, estados (LISTENING/LISTEN, ESTABLISHED/ESTAB) e, em alguns casos, o processo. No Linux, sem sudo, o processo só aparece para conexões do seu usuário.",
        "explanation": "Isso mostra que conversas de rede são separadas por protocolo de transporte, endereços, portas e estado."
      },
      {
        "number": 2,
        "title": "Testar alcance TCP até HTTPS",
        "instruction": "Verifique se o host consegue abrir conexão TCP na porta 443 de um destino conhecido.",
        "command": "Windows: Test-NetConnection example.com -Port 443\nLinux: nc -vz example.com 443  # se netcat estiver instalado",
        "expectedOutput": "Sucesso de conexão TCP ou indicação de falha.",
        "explanation": "Conexão TCP bem-sucedida prova transporte básico, mas ainda não prova TLS, HTTP, autenticação ou aplicação."
      },
      {
        "number": 3,
        "title": "Observar HTTP e TLS com curl",
        "instruction": "Use curl em modo verboso para observar fases da conversa.",
        "command": "Linux/macOS: curl -v https://example.com/\nWindows: curl.exe -v https://example.com/",
        "expectedOutput": "Linhas indicando resolução, conexão, TLS handshake, certificado, requisição HTTP e status de resposta.",
        "explanation": "O modo verboso ajuda a separar etapas: DNS, TCP, TLS e HTTP."
      },
      {
        "number": 4,
        "title": "Comparar headers sem baixar corpo completo",
        "instruction": "Peça apenas os headers HTTP para observar status e metadados.",
        "command": "Linux/macOS: curl -I https://example.com/\nWindows: curl.exe -I https://example.com/",
        "expectedOutput": "Status HTTP e headers, como content-type, server, cache-control ou date.",
        "explanation": "Headers são parte do protocolo HTTP e mostram como o servidor descreve a resposta."
      },
      {
        "number": 5,
        "title": "Provocar erro controlado de rota inexistente",
        "instruction": "Acesse um caminho improvável para observar um status de erro HTTP sem causar dano.",
        "command": "Linux/macOS: curl -I https://example.com/caminho-inexistente-para-lab-redes-v2\nWindows: curl.exe -I https://example.com/caminho-inexistente-para-lab-redes-v2",
        "expectedOutput": "Possível status 404 ou outro código controlado pelo servidor.",
        "explanation": "Erros também fazem parte do protocolo. Um 404 não significa que a rede caiu; significa que o servidor respondeu que o recurso não foi encontrado."
      },
      {
        "number": 6,
        "title": "Registrar evidências",
        "instruction": "Anote em uma tabela: comando, etapa observada, resultado, hipótese confirmada e hipótese não confirmada.",
        "expectedOutput": "Tabela de evidências do laboratório.",
        "explanation": "Troubleshooting profissional depende de evidências organizadas, não de impressões soltas."
      }
    ],
    "expectedResult": "O aluno deve conseguir explicar que uma comunicação web envolve múltiplos protocolos e que cada comando valida apenas uma parte da conversa.",
    "validation": [
      {
        "check": "Conexões locais foram listadas",
        "command": "netstat -ano ou ss -tunap",
        "expected": "Saída com portas, endereços e estados.",
        "ifFails": "Executar o terminal com permissões normais e tentar também netstat sem opções avançadas."
      },
      {
        "check": "HTTP/TLS foi observado",
        "command": "curl -v https://example.com/ (no Windows: curl.exe -v)",
        "expected": "Saída com etapas de conexão, TLS e resposta HTTP.",
        "ifFails": "Verificar conexão, proxy corporativo, bloqueio local ou ausência do curl."
      },
      {
        "check": "Headers foram coletados",
        "command": "curl -I https://example.com/ (no Windows: curl.exe -I)",
        "expected": "Status HTTP e headers.",
        "ifFails": "Testar outro destino permitido pela rede ou usar navegador DevTools."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "curl não existe no sistema",
        "probableCause": "Ambiente antigo ou PATH não configurado.",
        "howToConfirm": "Executar curl --version.",
        "fix": "No Windows moderno, usar curl.exe; no Linux, instalar pelo gerenciador de pacotes se permitido."
      },
      {
        "symptom": "TLS falha em rede corporativa",
        "probableCause": "Proxy com inspeção TLS ou certificado raiz não confiável.",
        "howToConfirm": "Comparar certificado visto no navegador e no curl, se permitido pela política interna.",
        "fix": "Seguir política corporativa e validar cadeia de certificados com a equipe responsável."
      },
      {
        "symptom": "TCP conecta, mas HTTP retorna 403",
        "probableCause": "Servidor recusou autorização, política, região, user-agent ou rota.",
        "howToConfirm": "Ler status e headers, comparar com navegador e logs se for serviço interno.",
        "fix": "Investigar regra de aplicação, autenticação, WAF ou permissão."
      }
    ],
    "improvements": [
      "Observar a aba Network do navegador (DevTools) e comparar com a saída do curl.",
      "Fazer o mesmo raciocínio com DNS usando nslookup ou dig."
    ],
    "evidenceToCollect": [
      "Saída de netstat ou ss com dados sensíveis ocultados.",
      "Saída resumida de curl -v mostrando as fases.",
      "Headers coletados com curl -I.",
      "Tabela com etapa, evidência e interpretação."
    ],
    "questions": [
      "Qual comando validou transporte, mas não validou aplicação?",
      "Qual evidência pertence ao protocolo HTTP?",
      "Um 404 significa queda de rede?",
      "Por que TLS pode falhar mesmo quando TCP conecta?"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que bytes sozinhos não bastam para haver comunicação entre dois sistemas?",
      "hints": [
        "Pense em significado.",
        "Pense em ordem e formato."
      ],
      "expectedIdeas": [
        "contrato",
        "campos",
        "mensagens",
        "interpretação",
        "estado"
      ],
      "explanation": "Bytes precisam de regras compartilhadas. O protocolo transforma bytes em mensagens com significado."
    },
    {
      "type": "diagnóstico",
      "question": "Um servidor responde ping e a porta 443 conecta, mas a aplicação retorna 403. Que hipóteses você testaria?",
      "hints": [
        "Pense em TLS e HTTP.",
        "403 não é a mesma coisa que timeout."
      ],
      "expectedIdeas": [
        "autorização",
        "WAF",
        "token",
        "rota",
        "header",
        "política"
      ],
      "explanation": "403 indica resposta de camada de aplicação. A conectividade básica existe; agora o foco deve ir para autorização, política e contrato HTTP/API."
    },
    {
      "type": "cenário real",
      "question": "Em um pipeline, uma chamada para cloud falha após rotação de credenciais. Como o conceito de protocolo ajuda?",
      "hints": [
        "Pense em autenticação.",
        "Pense em contrato de API."
      ],
      "expectedIdeas": [
        "token",
        "assinatura",
        "headers",
        "expiração",
        "versão de API",
        "logs"
      ],
      "explanation": "O pipeline fala com APIs por protocolos. A falha pode estar na forma como credenciais, headers e assinaturas são enviados."
    }
  ],
  "quiz": [
    {
      "id": "q0.7.1",
      "question": "Qual é a melhor definição de protocolo em redes e sistemas?",
      "options": [
        "O número de porta que identifica um serviço, como 443 para HTTPS.",
        "Um conjunto de regras que define formato, ordem, significado, erro e comportamento da comunicação.",
        "O meio físico ou sem fio pelo qual os bits trafegam entre dois equipamentos.",
        "A regra de firewall que autoriza um fluxo entre origem e destino."
      ],
      "answer": 1,
      "explanation": "Protocolo é o contrato de comunicação. Porta, meio físico e regra de firewall participam da comunicação, mas nenhum deles define formato, ordem, significado e tratamento de erro das mensagens.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.7.2",
      "question": "Ping funciona, mas uma chamada HTTPS falha por certificado. Qual camada/protocolo deve ser investigado com prioridade?",
      "options": [
        "Largura de banda do link, porque certificados são arquivos grandes.",
        "Firewall da porta 443, porque o ping usa outra porta.",
        "TLS e cadeia de certificados.",
        "ARP na rede local, porque o ping pode ter usado outro endereço MAC."
      ],
      "answer": 2,
      "explanation": "Ping indica alcance ICMP básico (e não usa porta). Um erro de certificado é uma resposta da negociação TLS: a conexão chegou ao servidor, e o problema está na confiança no certificado.",
      "topic": "tls",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.7.3",
      "question": "Por que porta não é sinônimo de protocolo?",
      "options": [
        "Porque a porta identifica uma conversa no transporte, mas o protocolo define regras de mensagem e comportamento.",
        "Porque cada protocolo usa obrigatoriamente uma única porta fixa, então a porta é só um apelido para ele.",
        "Porque a porta pertence à camada física e o protocolo à camada de aplicação.",
        "Porque portas só existem no UDP, e protocolos orientados a conexão não as usam."
      ],
      "answer": 0,
      "explanation": "Portas ajudam a separar fluxos no transporte (TCP e UDP), mas o protocolo é o contrato completo. Um serviço pode rodar em porta não padrão, e protocolos diferentes podem compartilhar uma porta com proxy ou multiplexação.",
      "topic": "portas",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.7.4",
      "question": "Qual prática reduz risco em protocolos que transportam dados sensíveis?",
      "options": [
        "Aceitar todas as versões antigas por compatibilidade.",
        "Desativar validação de certificado para evitar erros.",
        "Registrar tokens completos para facilitar suporte.",
        "Usar TLS, autenticação, autorização, validação de entrada e logs sem segredos."
      ],
      "answer": 3,
      "explanation": "Segurança de protocolo depende de proteção, validação, controle e evidência sem vazamento de segredos.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q0.7.5",
      "question": "Uma API retorna 401 no pipeline, mas funciona no notebook do desenvolvedor. Qual hipótese é mais coerente?",
      "options": [
        "A porta 443 está bloqueada no firewall do runner do pipeline.",
        "Credencial, token, header, identidade ou contexto do pipeline estão diferentes.",
        "O servidor da API está fora do ar quando o pipeline roda.",
        "Há perda de pacotes entre o runner e a API, corrompendo a requisição."
      ],
      "answer": 1,
      "explanation": "401 é uma resposta HTTP: o servidor estava no ar, a porta conectou e a mensagem chegou. O código indica credencial ausente ou inválida, então compare identidade, token e headers entre o notebook e o pipeline.",
      "topic": "devsecops",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q0.7.6",
      "question": "O que o comando curl -v ajuda a observar em uma comunicação HTTPS?",
      "options": [
        "O conteúdo descriptografado do tráfego de outros programas da máquina.",
        "Todos os roteadores no caminho até o servidor, como o traceroute.",
        "Etapas como DNS, conexão, TLS, headers e resposta HTTP.",
        "Os sockets em escuta no computador local, como o ss -tulpen."
      ],
      "answer": 2,
      "explanation": "curl -v mostra a conversa do próprio curl: IP conectado, negociação TLS, headers enviados e recebidos e status HTTP. Não mostra saltos de rede nem o tráfego de outros programas.",
      "topic": "ferramentas",
      "difficulty": "iniciante",
      "type": "troubleshooting"
    },
    {
      "id": "q0.7.7",
      "question": "Uma mensagem chega com todos os campos separados corretamente e no tamanho certo, mas um dos campos traz um valor que o protocolo não permite. Que aspecto do contrato foi violado?",
      "options": [
        "Estado: a fase da conversa em que cliente e servidor estão.",
        "Sintaxe: a forma como os campos são separados e dimensionados.",
        "Temporização: quanto tempo esperar antes de desistir.",
        "Semântica: o significado e os valores válidos de cada campo."
      ],
      "answer": 3,
      "explanation": "O formato (sintaxe) está correto; o problema é o valor do campo, que pertence à semântica. Temporização e estado tratam de tempo e de fase da conversa, não do conteúdo do campo.",
      "topic": "conceito",
      "difficulty": "intermediário",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.7.1",
      "front": "O que é um protocolo?",
      "back": "É um conjunto de regras que define como sistemas trocam mensagens, interpretam campos, seguem ordem, tratam erros e encerram comunicação.",
      "tags": [
        "protocolo"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.7.7",
      "front": "Ping funcionando prova que a aplicação funciona?",
      "back": "Não. Ping testa ICMP e alcance básico; não valida a porta TCP do serviço, o TLS, o HTTP nem a autenticação.",
      "tags": [
        "ping",
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.7.3",
      "front": "O que é handshake?",
      "back": "É uma sequência inicial de mensagens usada para negociar parâmetros, estabelecer estado ou preparar uma comunicação.",
      "tags": [
        "handshake"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.7.4",
      "front": "Por que protocolos têm códigos de erro?",
      "back": "Para que o receptor informe de forma previsível o motivo de falha, rejeição, redirecionamento ou indisponibilidade.",
      "tags": [
        "erros"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.7.5",
      "front": "O que significa estado em um protocolo?",
      "back": "É a fase atual da conversa, como conectando, autenticando, autenticado, transferindo ou encerrando.",
      "tags": [
        "estado"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.7.6",
      "front": "Qual risco de aceitar versões antigas de protocolo?",
      "back": "Pode permitir comportamento legado, criptografia fraca, downgrade ou incompatibilidade difícil de monitorar.",
      "tags": [
        "segurança",
        "versão"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex0.7.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras a diferença entre bytes transmitidos e protocolo.",
      "expectedAnswer": "Bytes são os dados brutos transmitidos. Protocolo é o conjunto de regras que diz como esses bytes devem ser organizados, interpretados e respondidos.",
      "explanation": "Sem protocolo, o receptor pode receber bytes, mas não necessariamente entender o significado."
    },
    {
      "id": "ex0.7.2",
      "type": "diagnóstico",
      "prompt": "Um sistema retorna HTTP 404. Liste duas hipóteses que não sejam 'a internet caiu'.",
      "expectedAnswer": "Rota inexistente, URL errada, recurso removido, proxy encaminhando para backend incorreto ou aplicação não publicando aquele caminho.",
      "explanation": "404 é uma resposta do protocolo HTTP indicando que o servidor respondeu, mas não encontrou o recurso no contexto da requisição."
    },
    {
      "id": "ex0.7.3",
      "type": "arquitetura",
      "prompt": "Liste pelo menos cinco protocolos que podem participar do acesso a uma aplicação web com login corporativo.",
      "expectedAnswer": "DNS, TCP, TLS, HTTP, OIDC/SAML/OAuth, além de possivelmente Kerberos, LDAP, mTLS ou protocolos internos de banco/API.",
      "explanation": "Aplicações modernas combinam várias camadas de protocolo."
    },
    {
      "id": "ex0.7.4",
      "type": "segurança",
      "prompt": "Por que desativar validação de certificado TLS para 'resolver rápido' é perigoso?",
      "expectedAnswer": "Porque remove uma verificação de identidade e confiança, permitindo conexões com destinos falsos ou intermediários não confiáveis.",
      "explanation": "A falha de certificado deve ser investigada, não ignorada permanentemente."
    }
  ],
  "challenge": {
    "title": "Diagnosticar falha de integração mesmo com conectividade básica funcionando",
    "scenario": "Uma aplicação em Kubernetes chama uma API de pagamentos externa. DNS resolve, TCP 443 conecta e ping para a internet funciona. Mesmo assim, o pipeline de testes falha com 401 em ambiente de homologação e 403 em produção.",
    "tasks": [
      "Separar as etapas de protocolo envolvidas.",
      "Listar evidências que você coletaria em cada etapa.",
      "Explicar diferença provável entre 401 e 403.",
      "Indicar quais logs procurar em aplicação, proxy, API gateway e provedor de identidade.",
      "Propor mitigação sem expor tokens em logs."
    ],
    "constraints": [
      "Não executar teste de carga.",
      "Não registrar tokens completos.",
      "Não desativar TLS.",
      "Não liberar firewall any-any como solução.",
      "Usar raciocínio defensivo e evidências."
    ],
    "expectedDeliverables": [
      "Tabela de etapas DNS/TCP/TLS/HTTP/Auth/API.",
      "Lista de comandos seguros.",
      "Hipóteses priorizadas.",
      "Plano de correção e validação.",
      "Cuidados de segurança com segredos."
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta por protocolo",
        "points": 30,
        "description": "Distingue DNS, transporte, TLS, HTTP e autenticação."
      },
      {
        "criterion": "Evidências adequadas",
        "points": 25,
        "description": "Coleta logs e comandos sem vazar credenciais."
      },
      {
        "criterion": "Interpretação de 401 e 403",
        "points": 20,
        "description": "Diferencia autenticação ausente/inválida de autorização/política."
      },
      {
        "criterion": "Segurança operacional",
        "points": 15,
        "description": "Não propõe bypass inseguro como solução permanente."
      },
      {
        "criterion": "Clareza da solução",
        "points": 10,
        "description": "Apresenta plano aplicável e validável."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A conectividade básica já foi parcialmente validada: DNS resolve e TCP 443 conecta. Portanto, a investigação deve subir de camada: TLS, HTTP, autenticação, autorização e contrato da API. 401 normalmente indica credencial ausente, inválida ou expirada. 403 normalmente indica que a identidade foi reconhecida ou a requisição chegou, mas a ação foi negada por permissão, política, WAF ou regra de acesso.",
    "steps": [
      "Confirmar DNS e destino correto em homologação e produção.",
      "Validar conexão TCP 443 sem assumir sucesso de aplicação.",
      "Verificar TLS, certificado, SNI e cadeia de confiança.",
      "Coletar status HTTP, headers e correlation ID sem expor token.",
      "Comparar identidade usada pelo pipeline em homologação e produção.",
      "Validar audience, issuer, expiração, escopo e permissões do token.",
      "Consultar logs do API gateway, WAF, aplicação e provedor de identidade.",
      "Corrigir credencial, permissão, escopo, rota ou política e repetir teste controlado."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar todo tráfego no firewall.",
        "whyItIsWrong": "O transporte já conecta; a falha é de protocolo de aplicação/autenticação. Any-any aumenta risco e não resolve contrato de API."
      },
      {
        "answer": "Desativar validação TLS.",
        "whyItIsWrong": "Isso remove proteção de identidade e confidencialidade, além de mascarar a causa real."
      },
      {
        "answer": "Colar o token completo no log para depurar.",
        "whyItIsWrong": "Isso pode vazar credencial para SIEM, suporte, histórico de pipeline e terceiros."
      }
    ],
    "finalAnswer": "A solução correta é investigar por protocolo e por etapa: DNS, TCP, TLS, HTTP, autenticação e autorização. 401 aponta para credencial/token; 403 aponta para permissão/política. Corrigir o contrato de identidade e API é mais seguro do que abrir rede ou desativar TLS."
  },
  "glossary": [
    {
      "term": "Protocolo",
      "shortDefinition": "Conjunto de regras de comunicação entre sistemas.",
      "longDefinition": "Define formato, significado, ordem, estados, temporização, erro, versões e, quando aplicável, segurança da comunicação.",
      "example": "HTTP define métodos, headers, status codes e corpo de mensagem.",
      "relatedTerms": [
        "mensagem",
        "estado",
        "handshake"
      ],
      "relatedLessons": [
        "0.7",
        "0.8",
        "6.1",
        "8.1"
      ]
    },
    {
      "term": "Mensagem",
      "shortDefinition": "Unidade de comunicação definida por um protocolo.",
      "longDefinition": "Pode conter campos, cabeçalhos, corpo, flags, códigos e identificadores interpretados segundo regras específicas.",
      "example": "Uma requisição HTTP GET é uma mensagem do cliente para o servidor.",
      "relatedTerms": [
        "campo",
        "payload"
      ],
      "relatedLessons": [
        "0.7",
        "8.1"
      ]
    },
    {
      "term": "Handshake",
      "shortDefinition": "Troca inicial de mensagens para estabelecer parâmetros ou estado.",
      "longDefinition": "Usado em protocolos como TCP e TLS para iniciar uma conversa com regras e parâmetros conhecidos.",
      "example": "O handshake TLS negocia versão, chaves e certificado.",
      "relatedTerms": [
        "estado",
        "TLS",
        "TCP"
      ],
      "relatedLessons": [
        "0.7",
        "6.2",
        "8.4"
      ]
    },
    {
      "term": "Timeout",
      "shortDefinition": "Tempo máximo de espera por uma resposta antes de considerar falha.",
      "longDefinition": "Evita que sistemas esperem indefinidamente e influencia retry, erro e experiência do usuário.",
      "example": "Uma API pode desistir após 30 segundos sem resposta do backend.",
      "relatedTerms": [
        "latência",
        "retry"
      ],
      "relatedLessons": [
        "0.6",
        "0.7",
        "15.1"
      ]
    },
    {
      "term": "Status code",
      "shortDefinition": "Código de resposta que resume o resultado de uma operação em alguns protocolos.",
      "longDefinition": "No HTTP, códigos como 200, 401, 403, 404 e 500 ajudam a classificar sucesso, autenticação, autorização, recurso ausente e erro interno.",
      "example": "HTTP 403 indica acesso proibido no contexto da requisição.",
      "relatedTerms": [
        "HTTP",
        "erro",
        "autorização"
      ],
      "relatedLessons": [
        "0.7",
        "8.1",
        "13.4"
      ]
    },
    {
      "term": "Interoperabilidade",
      "shortDefinition": "Capacidade de sistemas diferentes funcionarem juntos seguindo o mesmo padrão.",
      "longDefinition": "Protocolos padronizados permitem que implementações de fornecedores, linguagens e plataformas diferentes se comuniquem.",
      "example": "Um navegador e um servidor de fabricantes diferentes conseguem conversar usando HTTP e TLS.",
      "relatedTerms": [
        "padrão",
        "RFC",
        "versão"
      ],
      "relatedLessons": [
        "0.7",
        "0.8"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base sobre representação digital da informação."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.6",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base sobre latência, largura de banda e throughput."
    },
    {
      "type": "rfc",
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Exemplo clássico de especificação de protocolo de rede."
    },
    {
      "type": "rfc",
      "title": "RFC 768 — User Datagram Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc768",
      "note": "Exemplo de protocolo simples de transporte."
    },
    {
      "type": "rfc",
      "title": "RFC 9110 — HTTP Semantics",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc9110",
      "note": "Exemplo moderno de semântica de protocolo de aplicação."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e automação",
      "lesson": "APIs e integrações de pipeline",
      "reason": "Pipelines dependem de protocolos HTTP/TLS, autenticação e contratos de API."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Protocolos de identidade",
      "lesson": "SAML, OIDC e OAuth",
      "reason": "Protocolos de identidade são contratos de autenticação e autorização sobre HTTP/TLS."
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
      "0.8"
    ]
  }
};
