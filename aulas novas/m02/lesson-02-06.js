export const lesson0206 = {
  "id": "2.6",
  "moduleId": "m02",
  "order": 6,
  "title": "Camada 4 — Transporte: TCP, UDP, portas e conexões",
  "subtitle": "Como portas, conexões e estado entregam o tráfego ao processo certo, e o que cada teste de transporte prova.",
  "duration": "110-155 min",
  "estimatedStudyTimeMinutes": 155,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 210,
  "tags": [
    "redes",
    "modelo osi",
    "camada 4",
    "transporte",
    "tcp",
    "udp",
    "portas",
    "conexões",
    "firewall",
    "troubleshooting",
    "segurança"
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
      "reason": "A aula 2.2 explicou encapsulamento e mostrou a PDU de transporte dentro do pacote IP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.5",
      "reason": "A aula 2.5 explicou como o pacote IP chega até outra rede antes da aplicação conversar."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.9",
      "reason": "A aula 1.9 apresentou comandos iniciais de diagnóstico que serão usados para testar portas e conexões."
    }
  ],
  "objectives": [
    "Explicar o papel da Camada 4 no Modelo OSI.",
    "Diferenciar TCP, UDP, porta, socket, conexão e sessão de aplicação.",
    "Descrever o fluxo básico do TCP three-way handshake em nível defensivo.",
    "Entender por que firewalls e balanceadores usam portas e estado de conexão.",
    "Relacionar Camada 4 com APIs, TLS, Kubernetes, cloud, logs e segurança.",
    "Coletar evidências básicas de portas abertas, conexões estabelecidas e falhas de transporte."
  ],
  "learningOutcomes": [
    "Dado um erro de acesso a serviço, o aluno diferencia falha de rota, falha de porta, falha de TLS e falha de aplicação.",
    "Dado um comando netstat, ss ou Test-NetConnection, o aluno identifica porta local, porta remota e estado de conexão.",
    "Dado um fluxo TCP, o aluno explica SYN, SYN-ACK, ACK, FIN e RST em linguagem defensiva.",
    "Dado um cenário de firewall, o aluno entende por que liberar IP sem porta não define uma política suficiente.",
    "Dado um serviço UDP, o aluno entende por que ausência de conexão não significa ausência de risco."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Na Camada 3, o pacote IP chegou ao servidor. Mas alcançar o servidor não significa acessar o serviço certo: o mesmo host pode ter HTTPS na porta 443, SSH na 22, DNS na 53, um banco de dados e uma porta interna de métricas. A Camada 4 responde à pergunta que a Camada 3 não resolve: <strong>dentro do host, qual processo deve receber esse tráfego?</strong></p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> o servidor responde ping, a rota está correta e o DNS resolve, mas o sistema continua indisponível. A causa pode ser porta fechada, firewall bloqueando TCP/443, aplicação que não escuta, conexão resetada, timeout TCP, balanceador sem backend saudável ou serviço UDP sem resposta observável.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Um computador executa vários serviços ao mesmo tempo, e o IP identifica o host, não o processo. Além disso, o IP pode perder, atrasar ou reordenar pacotes. Por isso surgiram o TCP (confiável, ordenado e orientado à conexão) e o UDP (mais simples, sem conexão e com menos overhead). A Camada 4 resolve:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Multiplexação e demultiplexação:</strong> vários serviços no mesmo host, em portas diferentes; o sistema operacional entrega cada fluxo ao processo correto.</li>\n    <li><strong>Confiabilidade:</strong> o TCP confirma o recebimento, ordena os segmentos e retransmite.</li>\n    <li><strong>Baixa latência:</strong> o UDP evita handshake quando a aplicação aceita esse modelo.</li>\n    <li><strong>Controle de segurança:</strong> firewalls, NAT, balanceadores e security groups decidem por origem, destino, protocolo e porta.</li>\n  </ul>\n  <p>O erro comum é tratar conectividade IP como disponibilidade de serviço. Ping usa ICMP: não prova que TCP/443 está aberto, que o TLS negocia nem que a autenticação funciona. Cada camada precisa de evidência própria.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> a Camada 4 (Transporte) fornece comunicação lógica entre processos em hosts diferentes. Ela usa protocolos de transporte (em TCP/IP, principalmente TCP e UDP), portas e estados para entregar os dados ao serviço correto e, conforme o protocolo, oferecer confiabilidade, ordenação, controle de fluxo e de conexão.</div>\n  <p>Uma porta não é uma tomada física: é um número lógico de 16 bits (0 a 65535) que identifica serviços e fluxos. Por padrão, HTTP usa TCP/80; HTTPS, TCP/443; SSH, TCP/22; o DNS tradicional, UDP/53, mas também TCP/53 para respostas grandes e transferências de zona. Por isso, liberar só UDP/53 causa falhas que aparecem apenas em consultas grandes.</p>\n  <h3>TCP x UDP</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Aspecto</th><th>TCP</th><th>UDP</th></tr></thead>\n    <tbody>\n      <tr><td>Conexão</td><td>Three-way handshake antes dos dados</td><td>Nenhuma: envia datagramas direto</td></tr>\n      <tr><td>Garantias</td><td>Sequência, ACK, janela e retransmissão</td><td>Nenhuma nativa; a aplicação trata perda e ordem se precisar</td></tr>\n      <tr><td>Custo</td><td>Mais overhead, mais sensível a latência e perda</td><td>Menos overhead, menor latência</td></tr>\n      <tr><td>Uso típico</td><td>HTTP/HTTPS, SSH, bancos de dados</td><td>DNS, voz e vídeo, QUIC (base do HTTP/3)</td></tr>\n    </tbody>\n  </table></div>\n  <p>Nenhum dos dois é \"mais seguro\": a segurança vem de TLS, autenticação e política, acima do transporte.</p>\n  <h3>Porta, socket, conexão e sessão</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Termo</th><th>O que é</th><th>Exemplo</th></tr></thead>\n    <tbody>\n      <tr><td>Porta de serviço</td><td>Porta em que o servidor escuta (listener)</td><td>TCP/443 no servidor web</td></tr>\n      <tr><td>Porta efêmera</td><td>Porta local temporária que o cliente escolhe para cada conexão (49152–65535 no Windows e na faixa da IANA; 32768–60999 no Linux, por padrão)</td><td>52344 no notebook</td></tr>\n      <tr><td>Socket</td><td>Ponto de comunicação de um processo: IP + protocolo + porta</td><td>192.168.10.50:52344/TCP</td></tr>\n      <tr><td>Conexão TCP</td><td>Par de sockets, identificado pela 5-tupla: protocolo, IP e porta de origem, IP e porta de destino</td><td>192.168.10.50:52344 → 203.0.113.20:443</td></tr>\n      <tr><td>Sessão de aplicação</td><td>Estado acima do transporte (login, cookie, token); pode atravessar várias conexões TCP</td><td>Você continua logado depois que a conexão é refeita</td></tr>\n    </tbody>\n  </table></div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <ol class=\"flow-list\">\n    <li>A aplicação cliente pede ao sistema operacional uma conexão para IP, protocolo e porta de destino; o sistema escolhe uma porta local efêmera para esse fluxo.</li>\n    <li>No TCP, o cliente envia <strong>SYN</strong> (three-way handshake).</li>\n    <li>O servidor responde <strong>SYN-ACK</strong> se houver serviço escutando e as políticas permitirem.</li>\n    <li>O cliente envia <strong>ACK</strong> e a conexão fica estabelecida (ESTABLISHED).</li>\n    <li>Na transferência, o TCP usa números de sequência, confirmações, janelas e retransmissões.</li>\n    <li>No encerramento aparecem <strong>FIN</strong> e ACK; <strong>RST</strong> encerra de forma abrupta ou recusa a tentativa.</li>\n    <li>No UDP não há handshake: a aplicação envia datagramas e decide o que fazer sem resposta.</li>\n  </ol>\n  <h3>Campos do cabeçalho que aparecem em logs e capturas</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Campo</th><th>Tamanho</th><th>Função e leitura defensiva</th></tr></thead>\n    <tbody>\n      <tr><td>Source Port</td><td>16 bits</td><td>Porta de origem; ajuda a correlacionar conexões, mas não identifica o usuário</td></tr>\n      <tr><td>Destination Port</td><td>16 bits</td><td>Serviço de destino (TCP/443, UDP/53); porta permitida não garante conteúdo autorizado</td></tr>\n      <tr><td>Sequence Number</td><td>32 bits (TCP)</td><td>Ordena os bytes; anomalias indicam perda, retransmissão, reset ou manipulação</td></tr>\n      <tr><td>Flags TCP</td><td>bits de controle</td><td>SYN, ACK, FIN, RST; picos de SYN ou RST indicam problema operacional ou abuso</td></tr>\n      <tr><td>UDP Length</td><td>16 bits</td><td>Tamanho do datagrama UDP</td></tr>\n    </tbody>\n  </table></div>\n  <h3>O que o cliente observa ao enviar o SYN</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Resposta</th><th>Significado provável</th><th>Próxima hipótese</th></tr></thead>\n    <tbody>\n      <tr><td>SYN-ACK</td><td>Serviço escutando e caminho liberado</td><td>Transporte ok; testar TLS e aplicação</td></tr>\n      <tr><td>RST imediato</td><td>Host alcançado, mas nada escuta na porta, ou houve rejeição ativa</td><td>Listener, porta configurada, firewall que rejeita</td></tr>\n      <tr><td>Nada (SYN retransmitido até o timeout)</td><td>Descarte silencioso ou resposta que não volta</td><td>Firewall com DROP, rota assimétrica, host fora</td></tr>\n    </tbody>\n  </table></div>\n  <p>No UDP a leitura é menos clara: porta fechada costuma gerar ICMP \"port unreachable\", mas porta aberta pode simplesmente não responder. Ausência de resposta UDP não prova bloqueio.</p>\n  <p>Firewalls stateful usam esses estados para permitir a resposta de uma conexão iniciada por origem autorizada e bloquear o resto. O estado consome memória e pode virar gargalo sob carga ou ataque. E se a resposta volta por outro caminho (rota assimétrica), o firewall stateful desse caminho, que não viu o SYN, descarta o SYN-ACK: parece porta bloqueada, mas a causa é a rota.</p>\n  <div class=\"callout warning\"><strong>O que um teste de Camada 4 não prova:</strong> porta aberta não prova aplicação saudável; porta fechada não diz se o bloqueio é local, remoto ou intermediário; ICMP bloqueado não prova que o TCP está bloqueado.</div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>Cada componente do caminho participa da Camada 4 e pode falhar nela:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Componente</th><th>Papel na Camada 4</th><th>Falha típica</th></tr></thead>\n    <tbody>\n      <tr><td>Cliente</td><td>Escolhe a porta efêmera e inicia a conexão (52344 → TCP/443)</td><td>Firewall local, proxy ou política de egress bloqueia a saída</td></tr>\n      <tr><td>Firewall / security group</td><td>Avalia origem, destino, protocolo, porta e estado</td><td>Regra ausente, rota assimétrica, tabela de estado saturada</td></tr>\n      <tr><td>Load balancer</td><td>Recebe conexões num listener e encaminha para backends saudáveis</td><td>Listener na porta errada, health check falhando</td></tr>\n      <tr><td>Servidor</td><td>Escuta uma porta e responde SYN-ACK</td><td>Serviço parado, porta errada, listener na interface errada</td></tr>\n      <tr><td>Aplicação</td><td>Depois do TCP, inicia TLS, HTTP e autenticação</td><td>Certificado inválido, erro HTTP, acesso negado</td></tr>\n    </tbody>\n  </table></div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Imagine um prédio empresarial. O endereço IP é o endereço do prédio; a porta de transporte é a sala ou o ramal interno. O roteamento leva a correspondência até o prédio; a Camada 4 entrega ao departamento certo.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> portas não são locais fixos (podem estar filtradas, mapeadas por NAT ou balanceadas entre servidores), e a sala não representa o estado e as confirmações do TCP.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Seu notebook (192.168.10.50) acessa <code>https://example.com</code>. O DNS resolve um IP (aqui, 203.0.113.20). A Camada 3 leva o pacote até o servidor. A Camada 4 cria uma conexão TCP entre uma porta efêmera do notebook, como 52344, e a porta 443 do servidor. No Windows, <code>netstat -ano</code> mostraria algo assim:</p>\n  <pre class=\"code-block\"><code>  Proto  Endereço Local         Endereço Externo       Estado        PID\n  TCP    192.168.10.50:52344    203.0.113.20:443       ESTABLISHED   4120</code></pre>\n  <p>Leia assim: porta local efêmera 52344 (você é o cliente), porta remota 443 (o serviço HTTPS), conexão estabelecida, processo 4120 (o navegador). No servidor, o mesmo serviço apareceria como <code>LISTEN</code> na porta 443.</p>\n  <p>Se TCP/443 estiver bloqueado, a rota pode estar correta e o ping pode funcionar, mas o site não abre. Se TCP/443 abre, ainda faltam as Camadas 5, 6 e 7: TLS, certificado, HTTP, autenticação e autorização.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Um sistema de folha roda num servidor interno. Usuários acessam TCP/443 pelo navegador. Administradores acessam TCP/22 ou TCP/3389, de preferência por bastion, VPN ou ferramenta de acesso privilegiado. O banco escuta TCP/5432 ou TCP/1433, mas essa porta não deve estar acessível a partir das estações comuns.</p>\n  <p>Uma política madura descreve origem, destino, protocolo, porta, justificativa, responsável, expiração e logs. Liberar <code>any-any</code> porque \"não sabemos qual porta usa\" é má prática operacional e de segurança.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, portas aparecem em security groups, NSGs, regras de firewall, listeners e target groups de load balancers, health checks e private endpoints. Um serviço pode estar saudável internamente e ainda assim inacessível porque o listener do load balancer usa a porta errada, o security group não libera a porta de entrada a partir da origem certa, uma ACL stateless de sub-rede bloqueia o retorno ou o health check testa uma porta em que a aplicação não escuta.</p>\n  <p>Cada porta liberada sem necessidade aumenta a superfície de ataque e o volume de logs a monitorar.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em Kubernetes, o Service expõe pods com <code>port</code>, <code>targetPort</code> e <code>nodePort</code>. Um deploy falha porque a aplicação escuta em <code>8080</code>, mas o <code>targetPort</code> aponta para <code>80</code> (falha de Camada 4); ou porque o health check abre TCP/8080 com sucesso, mas a aplicação só responde HTTP em outro path (o transporte funciona; a falha é da aplicação).</p>\n  <p>Infraestrutura como código deve declarar portas com intenção clara, e regras temporárias precisam de prazo e justificativa. Testes de conectividade no pipeline devem separar DNS, rota, TCP, TLS e HTTP, para que o erro diga em que camada parou.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m02l06-title m02l06-desc\">\n    <title id=\"m02l06-title\">Camada 4 com TCP, UDP, portas e firewall</title>\n    <desc id=\"m02l06-desc\">Um cliente usa uma porta efêmera para acessar TCP 443 em um servidor, passando por firewall stateful. Também há exemplo de UDP 53 para DNS.</desc>\n    <defs>\n      <marker id=\"m02l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n\n    <rect x=\"40\" y=\"125\" width=\"170\" height=\"185\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"125\" y=\"163\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"125\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta local 52344</text>\n    <text x=\"125\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TCP SYN</text>\n    <text x=\"125\" y=\"294\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">consulta DNS (UDP)</text>\n\n    <rect x=\"305\" y=\"125\" width=\"185\" height=\"125\" rx=\"14\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"397\" y=\"163\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"397\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">stateful</text>\n    <text x=\"397\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">permite TCP/443</text>\n\n    <rect x=\"610\" y=\"125\" width=\"190\" height=\"125\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"705\" y=\"163\" text-anchor=\"middle\" class=\"svg-label\">Servidor Web</text>\n    <text x=\"705\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">escuta TCP/443</text>\n    <text x=\"705\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SYN-ACK</text>\n\n    <line x1=\"210\" y1=\"178\" x2=\"305\" y2=\"178\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l06-arrow)\"></line>\n    <line x1=\"490\" y1=\"178\" x2=\"610\" y2=\"178\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l06-arrow)\"></line>\n    <line x1=\"610\" y1=\"218\" x2=\"490\" y2=\"218\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l06-arrow)\"></line>\n    <line x1=\"305\" y1=\"218\" x2=\"210\" y2=\"218\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l06-arrow)\"></line>\n\n    <rect x=\"805\" y=\"255\" width=\"135\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"872\" y=\"283\" text-anchor=\"middle\" class=\"svg-label\">DNS</text>\n    <text x=\"872\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">UDP/53</text>\n\n    <line x1=\"210\" y1=\"290\" x2=\"805\" y2=\"290\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l06-arrow)\"></line>\n    <text x=\"500\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">UDP: sem handshake nativo, resposta depende da aplicação</text>\n\n    <rect x=\"60\" y=\"345\" width=\"690\" height=\"155\" rx=\"16\" class=\"content-card\"></rect>\n    <text x=\"405\" y=\"377\" text-anchor=\"middle\" class=\"svg-label\">Camada 4 responde</text>\n    <text x=\"95\" y=\"412\" class=\"svg-label svg-label--small\">1. Qual protocolo? TCP ou UDP?</text>\n    <text x=\"95\" y=\"438\" class=\"svg-label svg-label--small\">2. Qual porta de origem e destino?</text>\n    <text x=\"95\" y=\"464\" class=\"svg-label svg-label--small\">3. Existe serviço escutando?</text>\n    <text x=\"415\" y=\"412\" class=\"svg-label svg-label--small\">4. Firewall permite e acompanha estado?</text>\n    <text x=\"415\" y=\"438\" class=\"svg-label svg-label--small\">5. A conexão estabelece, reseta ou expira?</text>\n    <text x=\"415\" y=\"464\" class=\"svg-label svg-label--small\">6. Depois disso ainda faltam TLS e aplicação.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> o IP leva o pacote até o host; TCP/UDP e portas entregam o tráfego ao processo correto. O TCP cria uma conversa confiável e com estado; o UDP envia datagramas sem handshake.</li>\n    <li><strong>Diagnóstico:</strong> ping não testa porta. SYN-ACK = serviço escutando; RST = porta fechada ou rejeição; timeout = descarte ou resposta que não volta.</li>\n    <li><strong>Erro comum:</strong> confundir porta aberta com aplicação saudável ou com autorização.</li>\n    <li><strong>Segurança:</strong> firewalls, balanceadores e security groups decidem por porta e estado; portas expostas e saídas incomuns são sinais de risco.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará as Camadas 5, 6 e 7 (Sessão, Apresentação e Aplicação): o que acontece depois que a conexão TCP abre, com sessões, TLS, formatos de dados, HTTP, DNS, APIs e autenticação.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 4"
    ],
    "tcpIpLayers": [
      "Transporte"
    ],
    "relatedProtocols": [
      "TCP",
      "UDP",
      "ICMP",
      "TLS",
      "HTTP",
      "DNS",
      "QUIC"
    ],
    "dependsOn": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "encapsulamento",
      "IP",
      "roteamento",
      "métricas"
    ],
    "enables": [
      "HTTP",
      "TLS",
      "DNS",
      "APIs",
      "firewalls stateful",
      "load balancing",
      "Kubernetes Services",
      "observabilidade"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Ping funciona, mas site não abre",
      "Test-NetConnection falha em porta específica",
      "Conexão fica em timeout",
      "Conexão recebe reset",
      "Health check de load balancer falha",
      "API responde localmente, mas não pela rede",
      "DNS responde via UDP, mas transferências grandes falham"
    ],
    "diagnosticQuestions": [
      "O destino IP é alcançável?",
      "A porta correta está documentada?",
      "O serviço está escutando na interface correta?",
      "Há firewall local, de rede, cloud ou host?",
      "O teste falha por timeout ou reset?",
      "É TCP ou UDP?",
      "O problema ocorre antes ou depois de TLS/HTTP?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection example.com -Port 443",
        "purpose": "Testar conectividade TCP para uma porta específica.",
        "expectedObservation": "TcpTestSucceeded: True quando a conexão TCP é possível.",
        "interpretation": "Se falhar, investigar firewall, rota, proxy ou serviço. Se passar, TLS e aplicação ainda não foram testados."
      },
      {
        "platform": "Windows",
        "command": "netstat -ano | findstr ESTABLISHED",
        "purpose": "Listar conexões TCP estabelecidas e PIDs.",
        "expectedObservation": "Endereços locais/remotos, portas e estado ESTABLISHED.",
        "interpretation": "Porta local efêmera e porta remota conhecida indicam que esta máquina é o cliente; o PID mostra o processo."
      },
      {
        "platform": "Linux",
        "command": "ss -tulpen",
        "purpose": "Listar sockets TCP/UDP escutando e processos associados.",
        "expectedObservation": "LISTEN para TCP e UNCONN para UDP, com endereço local, porta e processo.",
        "interpretation": "Mostra se o serviço escuta e em qual interface: um listener só em 127.0.0.1 não aceita conexões de outras máquinas."
      },
      {
        "platform": "Linux",
        "command": "curl -vI https://example.com",
        "purpose": "Separar TCP, TLS e resposta HTTP (no Windows PowerShell, use curl.exe).",
        "expectedObservation": "\"Connected to ... port 443\", depois a negociação TLS e a linha de status HTTP.",
        "interpretation": "Se conecta mas o TLS falha, o problema já passou da Camada 4. Não use -k: ele ignora a validação do certificado e esconde o erro."
      },
      {
        "platform": "Cisco IOS",
        "command": "show access-lists",
        "purpose": "Verificar ACLs que podem permitir ou negar portas/protocolos.",
        "expectedObservation": "Regras com protocolos, origens, destinos e portas.",
        "interpretation": "Ajuda a confirmar bloqueio ou permissão de Camada 4."
      },
      {
        "platform": "Cisco IOS",
        "command": "show tcp brief",
        "purpose": "Observar conexões TCP conhecidas pelo equipamento, quando suportado.",
        "expectedObservation": "Conexões TCP e estados.",
        "interpretation": "Útil em equipamentos que participam de sessões de gerenciamento ou serviços."
      }
    ],
    "decisionTree": [
      {
        "if": "IP não é alcançável",
        "then": "Voltar para Camada 3: rota, gateway, firewall de rede e caminho."
      },
      {
        "if": "IP alcança, mas TCP dá timeout",
        "then": "Investigar firewall, serviço não respondendo, rota assimétrica ou descarte silencioso."
      },
      {
        "if": "TCP recebe RST",
        "then": "Investigar porta fechada, serviço rejeitando ou dispositivo intermediário resetando."
      },
      {
        "if": "TCP conecta, mas TLS falha",
        "then": "Subir para Camada 6: certificado, SNI, versão TLS, inspeção ou cadeia de confiança."
      },
      {
        "if": "TLS funciona, mas HTTP retorna 401/403/500",
        "then": "Subir para Camada 7 e identidade/autorização/aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar portas por serviço, origem, destino, responsável e justificativa.",
      "Aplicar menor privilégio em regras de firewall e security groups.",
      "Registrar conexões permitidas e negadas relevantes.",
      "Separar conectividade de autenticação e autorização.",
      "Usar bastion, VPN/ZTNA ou PAM para portas administrativas.",
      "Revisar periodicamente portas expostas."
    ],
    "badPractices": [
      "Liberar any-any para resolver troubleshooting.",
      "Expor SSH, RDP, banco ou painel administrativo para a internet sem controles fortes.",
      "Achar que porta 443 é sempre segura.",
      "Ignorar conexões de saída.",
      "Não saber qual aplicação escuta cada porta."
    ],
    "commonErrors": [
      "Confundir ping com teste de serviço.",
      "Confundir porta aberta com aplicação saudável ou autorizada: o handshake TCP não valida TLS, HTTP nem login.",
      "Tratar UDP sem resposta como bloqueio comprovado.",
      "Não correlacionar porta com processo e owner.",
      "Criar regra temporária e nunca remover."
    ],
    "vulnerabilities": [
      {
        "name": "Superfície de ataque por portas expostas",
        "description": "Serviços acessíveis além do necessário aumentam oportunidades de abuso.",
        "defensiveExplanation": "Um atacante procura serviços expostos, versões vulneráveis e interfaces administrativas para força bruta, exploração ou movimentação lateral. A defesa reduz a exposição e monitora tentativas.",
        "mitigation": "Allowlist, segmentação, bastion, MFA, patching, hardening e logs."
      },
      {
        "name": "Egress irrestrito",
        "description": "Saídas liberadas para qualquer destino e porta dificultam detecção de exfiltração e C2.",
        "defensiveExplanation": "Controle de saída impede que sistemas comprometidos se comuniquem livremente; exfiltração costuma aparecer como volume incomum para uma porta permitida, como 443.",
        "mitigation": "Proxy, firewall de saída, DNS controlado, allowlists, DLP e detecção comportamental."
      },
      {
        "name": "UDP mal entendido",
        "description": "A ausência de conexão é tratada como ausência de risco, e o UDP fica liberado sem controle.",
        "defensiveExplanation": "Sem handshake, a origem de um datagrama UDP pode ser forjada, o que permite amplificação, abuso de DNS e tráfego evasivo.",
        "mitigation": "Controle de egress, rate limit, logs de DNS e inspeção adequada."
      },
      {
        "name": "Saturação de estado",
        "description": "Firewalls e balanceadores stateful mantêm tabelas de conexão que podem saturar.",
        "defensiveExplanation": "Sob carga ou abuso, a tabela de estado pode virar gargalo operacional.",
        "mitigation": "Capacity planning, rate limit, SYN protection, observabilidade e arquitetura resiliente."
      }
    ],
    "monitoring": [
      "Logs de firewall permit/deny",
      "Flow logs em cloud",
      "Conexões por porta e destino",
      "Portas administrativas acessadas fora do padrão"
    ],
    "hardening": [
      "Fechar serviços não usados",
      "Bind de serviços apenas nas interfaces necessárias",
      "Inventário contínuo de serviços e portas"
    ],
    "detectionIdeas": [
      "Alertar nova porta em estado LISTEN",
      "Detectar aumento súbito de conexões para porta rara",
      "Detectar picos de SYN, RST e timeouts em serviços críticos",
      "Identificar conexões externas de servidores que não deveriam iniciar saída",
      "Correlacionar deny de firewall com incidente"
    ]
  },
  "lab": {
    "id": "lab-2.6",
    "title": "Coletando evidências de Camada 4 com segurança",
    "labType": "security",
    "objective": "Identificar portas, conexões, listeners e diferenças entre teste de transporte e teste de aplicação.",
    "scenario": "Você está investigando um serviço web que não abre. Em vez de concluir apenas com ping, irá coletar evidências de TCP/443, conexões locais e resposta HTTP.",
    "topology": "Notebook do aluno -> rede local -> firewall/roteador -> internet ou serviço permitido",
    "architecture": "Cliente usando porta efêmera para acessar uma porta bem conhecida em um servidor, com possíveis filtros de firewall no caminho.",
    "prerequisites": [
      "Ter concluído as aulas 2.1 a 2.5.",
      "Ter terminal Windows PowerShell ou Linux.",
      "Usar apenas destinos próprios ou serviços públicos comuns e permitidos, como example.com."
    ],
    "tools": [
      "Windows PowerShell",
      "Terminal Linux",
      "curl",
      "ss ou netstat",
      "Opcional: Wireshark em modo observação"
    ],
    "estimatedTimeMinutes": 45,
    "cost": "zero",
    "safetyNotes": [
      "Não faça varredura de portas: teste apenas as portas necessárias em destinos próprios ou permitidos.",
      "Não publique IPs internos, portas sensíveis ou PIDs sem sanitização."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar hipótese por camadas",
        "instruction": "Escreva uma hipótese para cada camada: Camada 3 (rota/IP), Camada 4 (porta/conexão), TLS e aplicação.",
        "expectedOutput": "Uma lista curta de hipóteses por camada.",
        "explanation": "Isso evita misturar porta, certificado, aplicação e autenticação no mesmo diagnóstico."
      },
      {
        "number": 2,
        "title": "Testar porta TCP no Windows",
        "instruction": "No Windows, teste TCP/443 para um destino permitido.",
        "command": "Test-NetConnection example.com -Port 443",
        "expectedOutput": "TcpTestSucceeded: True ou False (com RemoteAddress e RemotePort).",
        "explanation": "Esse comando testa Camada 4 para TCP, mas não prova que HTTP, TLS ou login funcionam."
      },
      {
        "number": 3,
        "title": "Separar TCP, TLS e HTTP com curl",
        "instruction": "Use curl em modo verbose para ver conexão, TLS e resposta HTTP. No Windows PowerShell, digite curl.exe (curl sozinho pode ser um alias de Invoke-WebRequest).",
        "command": "curl -vI https://example.com",
        "expectedOutput": "Uma linha \"Connected to ... port 443\", a negociação TLS e a linha de status HTTP com os headers.",
        "explanation": "Se a conexão TCP ocorre mas o TLS falha, o problema já está acima da Camada 4. Não use -k aqui: ele ignora a validação do certificado e esconde exatamente o erro que você quer ver."
      },
      {
        "number": 4,
        "title": "Listar conexões locais no Windows",
        "instruction": "Observe as conexões TCP estabelecidas e identifique, em uma delas, a porta local, a porta remota e o PID.",
        "command": "netstat -ano | findstr ESTABLISHED",
        "expectedOutput": "Lista de conexões com IPs, portas e PIDs.",
        "explanation": "Mostra que conexões usam porta local efêmera e porta remota de serviço."
      },
      {
        "number": 5,
        "title": "Listar listeners e sockets no Linux",
        "instruction": "No Linux, veja os serviços escutando e o endereço em que cada um escuta (0.0.0.0, 127.0.0.1 ou IP específico).",
        "command": "ss -tulpen",
        "expectedOutput": "Entradas LISTEN, UNCONN e conexões com portas.",
        "explanation": "Ajuda a diferenciar serviço escutando de conexão iniciada pelo cliente."
      },
      {
        "number": 6,
        "title": "Interpretar timeout versus reset",
        "instruction": "Escreva no relatório o que timeout e reset significam e qual hipótese cada um sugere.",
        "expectedOutput": "Uma explicação de que timeout sugere descarte/sem resposta e reset sugere rejeição/porta fechada ou reset intermediário.",
        "explanation": "A interpretação correta orienta a próxima hipótese."
      },
      {
        "number": 7,
        "title": "Sanitizar evidências",
        "instruction": "Antes de compartilhar, remova IPs internos, nomes de host sensíveis, PIDs e usuários.",
        "expectedOutput": "Evidências sanitizadas.",
        "explanation": "Diagnóstico técnico também precisa proteger informações da organização."
      }
    ],
    "expectedResult": "O aluno deve produzir um pequeno relatório distinguindo teste de IP, teste de porta TCP, conexão local, listener, TLS e resposta de aplicação.",
    "validation": [
      {
        "check": "O relatório separa Camada 3 e Camada 4",
        "command": "Revisar relatório",
        "expected": "Há campos separados para rota/IP e porta/conexão.",
        "ifFails": "Reorganize usando a matriz OSI das aulas anteriores."
      },
      {
        "check": "O teste de TCP/443 foi interpretado corretamente",
        "command": "Test-NetConnection example.com -Port 443 ou curl -vI https://example.com",
        "expected": "O aluno não afirma que porta aberta equivale a aplicação saudável.",
        "ifFails": "Releia a diferença entre transporte, TLS e HTTP."
      },
      {
        "check": "Evidências foram sanitizadas",
        "command": "Revisar saída coletada",
        "expected": "Sem IPs internos sensíveis, nomes reais ou PIDs desnecessários.",
        "ifFails": "Mascarar dados antes de compartilhar."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Test-NetConnection retorna falso",
        "probableCause": "Firewall, rota, proxy, bloqueio intermediário ou serviço indisponível.",
        "howToConfirm": "Testar rota, outro destino permitido, logs locais e política de firewall.",
        "fix": "Abrir chamado com evidências, sem pedir liberação ampla."
      },
      {
        "symptom": "curl conecta, mas falha em certificado",
        "probableCause": "Problema de TLS, inspeção, cadeia de confiança ou SNI.",
        "howToConfirm": "Ler as mensagens TLS do curl -v (sem -k) e validar o certificado.",
        "fix": "Encaminhar para análise de Camada 6/aplicação."
      },
      {
        "symptom": "ss não mostra listener esperado",
        "probableCause": "Serviço parado ou escutando em outra interface/porta.",
        "howToConfirm": "Verificar configuração do serviço e logs locais.",
        "fix": "Ajustar serviço, porta ou bind conforme arquitetura."
      }
    ],
    "improvements": [
      "Capturar o handshake TCP no Wireshark em laboratório local.",
      "Comparar TCP/443 com UDP/53 em uma consulta DNS permitida."
    ],
    "evidenceToCollect": [
      "Resultado de Test-NetConnection ou curl",
      "Lista sanitizada de conexões",
      "Lista de listeners, se aplicável",
      "Interpretação de timeout/reset/sucesso",
      "Conclusão por camada"
    ],
    "questions": [
      "O que uma porta efêmera representa?",
      "Por que firewall stateful precisa manter estado?",
      "Por que TCP estabelecido não prova login autorizado?"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que IP sozinho não identifica o serviço correto dentro de um servidor?",
      "hints": [
        "Pense em um servidor com SSH, HTTPS e banco ao mesmo tempo.",
        "Pense em portas."
      ],
      "expectedIdeas": [
        "multiplexação",
        "processos",
        "porta",
        "serviço",
        "socket"
      ],
      "explanation": "IP identifica o host lógico; a porta ajuda a entregar ao processo ou serviço correto."
    },
    {
      "type": "diagnóstico",
      "question": "A ida de uma conexão TCP passa pelo firewall stateful A, mas a resposta volta pelo firewall stateful B. O cliente vê timeout. Por que o problema parece ser porta bloqueada, e como você confirmaria a causa?",
      "hints": [
        "Pense no que o firewall precisa ver para aceitar o SYN-ACK.",
        "Compare o caminho de ida e o de volta."
      ],
      "expectedIdeas": [
        "firewall stateful",
        "tabela de estado",
        "rota assimétrica",
        "SYN-ACK descartado",
        "captura nos dois lados",
        "traceroute dos dois lados"
      ],
      "explanation": "O firewall só aceita o SYN-ACK de uma conexão cujo SYN ele viu. B nunca viu o SYN, então descarta a resposta e o cliente vê timeout. Uma captura no servidor mostrando o SYN-ACK enviado, e no cliente mostrando que ele não chegou, aponta para o caminho de volta e não para o serviço."
    },
    {
      "type": "cenário real",
      "question": "Por que liberar porta 443 para qualquer destino não é automaticamente seguro?",
      "hints": [
        "Pense em conteúdo dentro de HTTPS.",
        "Pense em egress e exfiltração."
      ],
      "expectedIdeas": [
        "porta não equivale a confiança",
        "exfiltração",
        "C2",
        "proxy",
        "logs",
        "allowlist"
      ],
      "explanation": "Porta 443 pode carregar tráfego legítimo ou abusivo. Controle precisa considerar destino, identidade, contexto, inspeção e logs."
    }
  ],
  "quiz": [
    {
      "id": "q2.6.1",
      "question": "Qual é a principal função da Camada 4 em relação à Camada 3?",
      "options": [
        "Escolher o próximo salto até a rede de destino",
        "Entregar o tráfego ao processo correto usando protocolos de transporte e portas",
        "Traduzir o nome do servidor em endereço IP",
        "Negociar o certificado e a criptografia da sessão"
      ],
      "answer": 1,
      "explanation": "Escolher o próximo salto é papel da Camada 3; resolver nomes é DNS (aplicação); certificado é TLS. A Camada 4 usa TCP/UDP e portas para comunicação entre processos.",
      "topic": "camada 4",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.6.2",
      "question": "Qual alternativa descreve melhor TCP?",
      "options": [
        "Envia datagramas sem handshake e deixa a perda para a aplicação",
        "Orientado à conexão, com estado, sequência, confirmação e retransmissão",
        "É sempre mais seguro que o UDP porque usa handshake",
        "Dispensa portas porque a conexão já identifica o processo"
      ],
      "answer": 1,
      "explanation": "TCP usa handshake, sequência, ACK e retransmissão. Enviar datagramas sem handshake descreve o UDP; segurança depende de TLS e política, não do TCP; e o TCP usa portas.",
      "topic": "tcp",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q2.6.3",
      "question": "Ping funciona, mas TCP/443 falha. Qual conclusão é mais correta?",
      "options": [
        "A conectividade IP existe, mas a porta, o firewall ou o serviço ainda podem estar com problema",
        "O serviço está saudável, porque o host responde",
        "O problema é de DNS, porque o nome não abriu",
        "O certificado TLS do servidor está vencido"
      ],
      "answer": 0,
      "explanation": "Ping testa ICMP e alcance básico, não TCP/443. Se o ping ao mesmo nome funcionou, o DNS já resolveu; e o TLS só começa depois que o TCP estabelece.",
      "topic": "troubleshooting",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.6.4",
      "question": "Qual é a melhor prática para regra de firewall de Camada 4?",
      "options": [
        "Liberar o IP do servidor para todas as portas, para evitar novos chamados",
        "Liberar a porta 443 para qualquer origem, já que HTTPS é criptografado",
        "Definir origem, destino, protocolo, porta, justificativa, prazo e logging",
        "Liberar a sub-rede inteira e confiar na autenticação da aplicação"
      ],
      "answer": 2,
      "explanation": "Liberar IP sem porta, ou porta sem origem, não define uma política suficiente. A regra precisa ser mínima, justificada, com prazo e auditável.",
      "topic": "firewall",
      "difficulty": "iniciante-intermediário",
      "type": "segurança"
    },
    {
      "id": "q2.6.7",
      "question": "Test-NetConnection para TCP/8443 falha. Na captura, cada SYN do cliente recebe um RST imediato do servidor. Qual é a hipótese mais provável?",
      "options": [
        "Um firewall está descartando os pacotes em silêncio",
        "Não há rota até a sub-rede do servidor",
        "O host foi alcançado, mas nenhum serviço está escutando na 8443 ou a conexão foi rejeitada ativamente",
        "O certificado TLS da API é inválido"
      ],
      "answer": 2,
      "explanation": "RST é uma resposta: o host (ou um dispositivo que rejeita ativamente) foi alcançado. Descarte silencioso e falta de rota não geram RST; costumam terminar em timeout. O TLS nem chegou a começar.",
      "topic": "troubleshooting",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.6.6",
      "question": "Uma porta TCP aberta prova que o usuário está autorizado a acessar a aplicação?",
      "options": [
        "Sim, porque o servidor aceitou a conexão",
        "Sim, desde que a porta seja 443",
        "Não, porque porta aberta indica que o firewall está desligado",
        "Não: indica só que o transporte respondeu; TLS, autenticação e autorização são verificados acima"
      ],
      "answer": 3,
      "explanation": "Transporte funcionando não prova TLS válido, sessão, autenticação nem autorização. E porta aberta não significa firewall desligado: a regra pode estar permitindo aquele fluxo.",
      "topic": "camadas",
      "difficulty": "iniciante-intermediário",
      "type": "pegadinha"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.6.7",
      "front": "O que identifica uma conexão TCP?",
      "back": "A 5-tupla: protocolo, IP e porta de origem, IP e porta de destino (um par de sockets).",
      "tags": [
        "portas"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc2.6.8",
      "front": "SYN, SYN-ACK, ACK, FIN e RST: o que cada um indica?",
      "back": "SYN pede conexão; SYN-ACK aceita; ACK confirma; FIN encerra de forma ordenada; RST encerra abruptamente ou recusa.",
      "tags": [
        "tcp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.6.3",
      "front": "UDP possui handshake nativo?",
      "back": "Não. UDP envia datagramas sem estabelecimento de conexão nativo.",
      "tags": [
        "udp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.6.9",
      "front": "LISTEN, ESTABLISHED e UNCONN em netstat/ss significam o quê?",
      "back": "LISTEN: serviço TCP aguardando conexões. ESTABLISHED: conexão TCP ativa. UNCONN: socket UDP aberto (o UDP não tem conexão).",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc2.6.5",
      "front": "O que é porta efêmera?",
      "back": "Porta local temporária que o sistema do cliente escolhe para cada conexão (ex.: 52344); é ela que distingue duas conexões simultâneas do mesmo cliente para o mesmo serviço.",
      "tags": [
        "portas"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc2.6.6",
      "front": "O que firewall stateful acompanha?",
      "back": "O estado de conexões/fluxos, como conexões TCP iniciadas e respostas permitidas.",
      "tags": [
        "firewall"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.6.5",
      "type": "interpretação",
      "prompt": "Interprete a linha de netstat -ano: 'TCP 192.168.10.50:52344 203.0.113.20:443 ESTABLISHED 4120'. Qual é a porta local, a porta remota, o estado, e esta máquina é cliente ou servidor?",
      "expectedAnswer": "Porta local 52344 (efêmera), porta remota 443 (HTTPS), estado ESTABLISHED (handshake concluído), PID 4120. Como a porta local é efêmera e a remota é de serviço, esta máquina é o cliente.",
      "explanation": "Ler porta local, porta remota e estado é o primeiro passo para saber quem iniciou o fluxo e qual serviço está envolvido."
    },
    {
      "id": "ex2.6.2",
      "type": "diagnóstico",
      "prompt": "Um servidor responde ping, mas TCP/22 dá timeout. Liste três hipóteses.",
      "expectedAnswer": "Firewall descartando em silêncio, serviço SSH parado sem resposta, rota de volta assimétrica, filtro intermediário. Se o serviço só estivesse em outra porta, o host normalmente responderia RST, e não timeout.",
      "explanation": "Timeout sugere descarte ou ausência de resposta, não cabo nem DNS (o ping já chegou ao IP)."
    },
    {
      "id": "ex2.6.3",
      "type": "comparação",
      "prompt": "Compare TCP e UDP em confiabilidade, estado e uso típico.",
      "expectedAnswer": "TCP é orientado à conexão e confiável; UDP é sem conexão nativa e mais simples. TCP é comum em HTTP/HTTPS/SSH; UDP em DNS, voz/vídeo e protocolos que controlam perda na aplicação.",
      "explanation": "A escolha depende do comportamento desejado, não de um ser universalmente melhor."
    },
    {
      "id": "ex2.6.4",
      "type": "segurança",
      "prompt": "Reescreva uma regra insegura 'allow any any' para acesso de usuários ao portal HTTPS interno.",
      "expectedAnswer": "Permitir apenas sub-rede/grupo de origem necessário para IP/FQDN do portal em TCP/443, com logging, owner, justificativa e validade.",
      "explanation": "Menor privilégio reduz superfície e melhora auditoria."
    }
  ],
  "challenge": {
    "title": "API interna inacessível na porta 8443",
    "scenario": "Uma equipe informa que a API de inventário em https://api-interna:8443 não responde a partir dos runners de CI. O DNS resolve e a rota para a sub-rede parece existir.",
    "tasks": [
      "Separar hipóteses de Camada 3, Camada 4, TLS e aplicação.",
      "Definir comandos de coleta para Windows/Linux conforme aplicável.",
      "Indicar evidências necessárias de firewall, load balancer e host.",
      "Propor correção de menor privilégio.",
      "Descrever como validar depois da correção."
    ],
    "constraints": [
      "Não pedir liberação any-any.",
      "Não fazer varredura ampla.",
      "Sanitizar evidências.",
      "Considerar que runners podem estar em sub-rede diferente dos usuários."
    ],
    "expectedDeliverables": [
      "Matriz por camada",
      "Lista de comandos",
      "Hipóteses e evidências",
      "Proposta de regra mínima",
      "Plano de validação"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação por camadas",
        "points": 25,
        "description": "Distingue IP/rota, TCP/porta, TLS e aplicação."
      },
      {
        "criterion": "Evidências de Camada 4",
        "points": 25,
        "description": "Inclui testes de porta, listener, firewall e estado."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Propõe menor privilégio, logging e sanitização."
      },
      {
        "criterion": "Validação",
        "points": 25,
        "description": "Define como confirmar sucesso sem extrapolar conclusões."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro confirmamos que DNS e rota não são a causa principal. Depois testamos TCP/8443 a partir dos runners, verificamos firewall de origem/destino, listener no backend, health check do balanceador e só então subimos para TLS e HTTP.",
    "steps": [
      "Registrar origem real dos runners.",
      "Resolver o nome da API e confirmar IP esperado.",
      "Testar TCP/8443 a partir de um runner (Test-NetConnection api-interna -Port 8443 no Windows; curl -v https://api-interna:8443 no Linux) e anotar se o resultado é sucesso, RST ou timeout.",
      "No servidor, confirmar com ss -tulpen se o serviço escuta na 8443 e em qual endereço (0.0.0.0 ou só 127.0.0.1).",
      "Conferir regras de firewall/security group/NSG para origem dos runners.",
      "Testar TLS/HTTP com curl verbose.",
      "Registrar logs de deny/allow e health check.",
      "Propor regra mínima com origem dos runners, destino da API e TCP/8443."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar todas as portas dos runners para a rede interna.",
        "whyItIsWrong": "Resolve por excesso, amplia risco e dificulta auditoria."
      },
      {
        "answer": "Culpar DNS porque a aplicação não abriu.",
        "whyItIsWrong": "O enunciado informa que DNS resolve; é preciso continuar por camadas."
      },
      {
        "answer": "Concluir que TLS está errado antes de testar TCP.",
        "whyItIsWrong": "TLS só começa depois que o transporte estabelece conexão."
      }
    ],
    "finalAnswer": "A solução correta é uma investigação por camadas: DNS resolve, rota existe, TCP/8443 precisa ser testado da origem real, firewall e listener precisam ser confirmados, e somente após o estabelecimento TCP devem ser avaliados TLS e HTTP. A correção deve ser específica para origem, destino, protocolo e porta, com logging e revisão."
  },
  "glossary": [
    {
      "term": "TCP",
      "shortDefinition": "Protocolo de transporte orientado à conexão.",
      "longDefinition": "TCP fornece comunicação confiável e ordenada usando handshake, números de sequência, confirmações, janelas e retransmissão.",
      "example": "HTTPS normalmente usa TCP/443.",
      "relatedTerms": [
        "porta",
        "three-way handshake",
        "ACK"
      ],
      "relatedLessons": [
        "2.6",
        "6.1"
      ]
    },
    {
      "term": "UDP",
      "shortDefinition": "Protocolo de transporte sem conexão nativa.",
      "longDefinition": "UDP envia datagramas sem handshake, sem confirmação nativa e com menor overhead, deixando garantias para a aplicação quando necessário.",
      "example": "DNS tradicional frequentemente usa UDP/53.",
      "relatedTerms": [
        "datagrama",
        "porta"
      ],
      "relatedLessons": [
        "2.6",
        "6.2"
      ]
    },
    {
      "term": "Porta",
      "shortDefinition": "Número lógico que identifica serviço ou fluxo de transporte.",
      "longDefinition": "Portas permitem que múltiplas aplicações usem o mesmo host e endereço IP, diferenciando serviços e conexões.",
      "example": "SSH usa TCP/22 por padrão.",
      "relatedTerms": [
        "socket",
        "listener",
        "porta efêmera"
      ],
      "relatedLessons": [
        "2.6",
        "6.3"
      ]
    },
    {
      "term": "Socket",
      "shortDefinition": "Combinação lógica de endereço, protocolo e porta usada por processos de rede.",
      "longDefinition": "Um socket representa um ponto de comunicação usado pelo sistema operacional para enviar e receber tráfego de rede.",
      "example": "192.168.10.50:52344 para 203.0.113.20:443 em TCP.",
      "relatedTerms": [
        "porta",
        "processo",
        "TCP"
      ],
      "relatedLessons": [
        "2.6"
      ]
    },
    {
      "term": "Three-way handshake",
      "shortDefinition": "Processo TCP de estabelecimento de conexão com SYN, SYN-ACK e ACK.",
      "longDefinition": "É a negociação inicial que sincroniza estado entre cliente e servidor antes da transmissão de dados em TCP.",
      "example": "Cliente envia SYN, servidor responde SYN-ACK, cliente confirma com ACK.",
      "relatedTerms": [
        "SYN",
        "ACK",
        "TCP"
      ],
      "relatedLessons": [
        "2.6",
        "6.1"
      ]
    },
    {
      "term": "Firewall stateful",
      "shortDefinition": "Firewall que acompanha estado de conexões ou fluxos.",
      "longDefinition": "Permite decisões mais contextuais, como liberar respostas a conexões iniciadas por origem permitida, mantendo tabela de estado.",
      "example": "Permitir resposta de TCP/443 para uma conexão iniciada pelo cliente interno.",
      "relatedTerms": [
        "firewall",
        "estado",
        "ACL"
      ],
      "relatedLessons": [
        "2.6",
        "9.1"
      ]
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "Transmission Control Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc9293",
      "note": "Referência moderna do TCP."
    },
    {
      "type": "rfc",
      "title": "User Datagram Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc768",
      "note": "Referência clássica do UDP."
    },
    {
      "type": "internal-course",
      "title": "Módulo 6 — TCP, UDP e Portas",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m06",
      "note": "O assunto será aprofundado no módulo específico de transporte."
    },
    {
      "type": "internal-course",
      "title": "Módulo 9 — Firewalls, ACLs, WAF e Políticas de Tráfego",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m09",
      "note": "Políticas baseadas em portas serão aprofundadas no módulo de firewalls."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e plataforma",
      "lesson": "Services, Ingress e NetworkPolicy",
      "reason": "Kubernetes usa abstrações de porta, targetPort, Service e política de rede."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Federação e autenticação moderna",
      "lesson": "OIDC, SAML e fluxos web",
      "reason": "Autenticação web depende de transporte funcionando, mas autorização ocorre acima da Camada 4."
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
      "2.7"
    ]
  }
};
