export const lesson0201 = {
  "id": "2.1",
  "moduleId": "m02",
  "order": 1,
  "title": "Por que o Modelo OSI existe",
  "subtitle": "Como um modelo de camadas transforma redes complexas em diagnóstico, arquitetura, documentação e comunicação entre times.",
  "duration": "15-25 min + 30 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "modelo osi",
    "camadas",
    "troubleshooting",
    "arquitetura",
    "segurança",
    "diagnóstico",
    "tcp/ip",
    "wireshark",
    "fundamentos"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "reason": "O Modelo OSI depende de bits, sinais, protocolos, métricas e pensamento em camadas vistos no Módulo 0."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m01",
      "reason": "É necessário entender dispositivos, topologias, meios, equipamentos, métricas e diagnóstico inicial antes de organizar esses elementos em camadas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "A aula 0.8 introduziu pensamento em camadas como método mental de troubleshooting."
    }
  ],
  "objectives": [
    "Explicar por que o Modelo OSI existe (vocabulário comum para dividir a comunicação em responsabilidades) e diferenciá-lo de uma implementação real, como a pilha TCP/IP.",
    "Listar as sete camadas do OSI, com a pergunta que cada uma responde, e dizer em qual camada TCP/IP cada uma se encaixa.",
    "Transformar um sintoma vago, como \"o sistema não abre\", em perguntas com evidência por camada, de baixo para cima, sem confundir conectividade com autorização."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Imagine um chamado: <em>“o sistema não abre”</em>. A frase é vaga demais para agir. O cabo pode estar solto, o Wi-Fi fraco, o notebook sem IP, o gateway errado, o nome sem resolver no DNS, a porta do servidor bloqueada, o certificado inválido, a aplicação fora do ar ou a senha recusada. São causas diferentes, e cada uma é resolvida por uma pessoa diferente.</p>\n  <p>Sem um jeito de separar essas possibilidades, o chamado passa de time em time: redes diz que há rota, segurança diz que o firewall não bloqueou, a equipe da aplicação diz que o serviço está no ar, e o usuário continua parado. Nesta aula você conhece o mapa que o mercado inteiro usa para dividir esse problema em partes. Na segurança, é o mesmo mapa que ajuda a dizer em que camada um ataque acontece e qual controle o barra.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando toda falha recebe o mesmo rótulo de “problema de rede”. Um DNS que não resolve é diferente de um cabo solto, e uma porta bloqueada é diferente de uma senha errada. Com um rótulo só, o time errado é acionado, coisas são reiniciadas sem necessidade e as evidências se perdem.</p>\n  <p>A falta de vocabulário comum é antiga: antes da padronização, cada fabricante tinha protocolos e termos próprios, e equipamentos de marcas diferentes conversavam mal. A ISO criou então o Modelo OSI como referência para dividir a comunicação em responsabilidades. A internet acabou rodando sobre outra pilha, a TCP/IP, mas o vocabulário do OSI ficou: “problema de camada 2” e “bloqueio na camada 4” são frases do dia a dia de redes, segurança e cloud. Esta aula mostra as sete camadas e como usá-las para transformar um sintoma em perguntas.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> o Modelo OSI (Open Systems Interconnection) é um modelo conceitual de referência, com sete camadas, que descreve as responsabilidades da comunicação entre sistemas, do sinal físico até a aplicação. Ele serve para explicar, diagnosticar e documentar redes; não é um protocolo que roda nos equipamentos.</div>\n  <p>As camadas são numeradas de baixo para cima: a 1 fica mais perto do fio, a 7 mais perto do usuário. Cada uma responde a uma pergunta diferente:</p>\n  <div class=\"responsive-table\"><table class=\"data-table comparison-table\">\n    <thead><tr><th>Camada</th><th>Nome</th><th>Pergunta principal</th><th>Exemplos</th></tr></thead>\n    <tbody>\n      <tr><td>7</td><td>Aplicação</td><td>Que serviço o usuário ou o sistema está usando?</td><td>HTTP, DNS, e-mail, login na aplicação</td></tr>\n      <tr><td>6</td><td>Apresentação</td><td>Como os dados são representados, codificados ou protegidos?</td><td>UTF-8, Base64, compressão, criptografia (TLS)</td></tr>\n      <tr><td>5</td><td>Sessão</td><td>Como a conversa é aberta, mantida e retomada?</td><td>sessão de login que continua ativa, reconexão</td></tr>\n      <tr><td>4</td><td>Transporte</td><td>Qual porta e qual conexão levam os dados?</td><td>TCP, UDP, portas (443 no HTTPS)</td></tr>\n      <tr><td>3</td><td>Rede</td><td>Como os dados chegam a outra rede?</td><td>endereço IP, gateway, rotas, roteador</td></tr>\n      <tr><td>2</td><td>Enlace</td><td>Como os dados são entregues dentro da rede local?</td><td>Ethernet, Wi-Fi, endereço MAC, ARP, switch</td></tr>\n      <tr><td>1</td><td>Física</td><td>Como os bits viram sinal no meio?</td><td>cabo, fibra, rádio, conectores, ruído</td></tr>\n    </tbody>\n  </table></div>\n  <h3>OSI × TCP/IP</h3>\n  <p>A internet usa a pilha TCP/IP, que tem quatro camadas e agrupa responsabilidades que o OSI separa:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>TCP/IP</th><th>Camadas OSI equivalentes</th><th>Exemplos</th></tr></thead>\n    <tbody>\n      <tr><td>Aplicação</td><td>7, 6 e 5</td><td>HTTP, DNS, TLS, e-mail (SMTP)</td></tr>\n      <tr><td>Transporte</td><td>4</td><td>TCP, UDP</td></tr>\n      <tr><td>Internet</td><td>3</td><td>IPv4, IPv6, ICMP</td></tr>\n      <tr><td>Acesso à rede</td><td>2 e 1</td><td>Ethernet, Wi-Fi, ARP, cabo, fibra</td></tr>\n    </tbody>\n  </table></div>\n  <div class=\"callout warning\"><strong>O OSI é um mapa, não a implementação:</strong> nem todo protocolo cabe em uma camada só. O TLS, por exemplo, protege os dados (papel da camada 6), mas roda sobre o TCP e é acionado pela própria aplicação. E componentes reais, como firewalls, costumam operar em várias camadas ao mesmo tempo. Use o OSI para organizar perguntas, não como substituto da documentação de cada protocolo.</div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Cada camada cumpre sua responsabilidade usando o serviço da camada de baixo e oferece um serviço à de cima. O navegador, na camada 7, não precisa saber se a conexão é por cabo ou Wi-Fi: ele conta com o transporte, que conta com a rede, e assim por diante até o sinal.</p>\n  <p>Ao enviar, os dados descem da camada 7 até a 1. Pelo caminho, cada camada acrescenta o que precisa para fazer seu trabalho, como a porta (camada 4), o endereço IP (camada 3) e o endereço MAC (camada 2), e a camada física transforma tudo em sinal. No destino, o caminho é o inverso: do sinal até a aplicação, cada camada lê e retira o que é seu.</p>\n  <h3>Do sintoma à hipótese</h3>\n  <p>No diagnóstico, transforme cada camada em uma pergunta que se responde com uma evidência e siga de baixo para cima, sem pular etapas. A <strong>primeira evidência que falha aponta a camada provável</strong> e, com ela, o time que deve investigar. Se tudo até a camada 4 funciona e o sistema recusa o acesso, o problema não é de conectividade: autenticação (provar quem você é) e autorização (o que você pode fazer) são da aplicação. Conectividade não é autorização.</p>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Tratar ping como prova de que o serviço funciona:</strong> ele só mostra que o destino responde ao ICMP; não testa a porta, o TLS, a aplicação nem o login. E muitos servidores bloqueiam ICMP enquanto a porta 443 funciona.</li>\n      <li><strong>Decorar as camadas sem usar:</strong> associe cada uma a uma pergunta, uma evidência e um ponto de falha.</li>\n      <li><strong>Culpar uma camada sem evidência:</strong> “é o firewall” é hipótese até um teste confirmar; pular etapas leva ao time errado.</li>\n    </ul>\n  </div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense no envio de uma encomenda: a estrada e o caminhão são a camada física, a entrega dentro do bairro é o enlace, a escolha de cidades e rotas é a rede e a confirmação de recebimento é o transporte. As camadas de cima cuidam do idioma do documento, da conversa e do serviço final. Se a encomenda não chega, você pergunta em que trecho ela parou, em vez de culpar “o correio”.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Você abre um site no notebook e a página não carrega. Para ela aparecer, uma cadeia de condições precisa funcionar:</p>\n  <ol>\n    <li><strong>Camada 1:</strong> o cabo está conectado ou o Wi-Fi tem sinal.</li>\n    <li><strong>Camada 2:</strong> o notebook consegue entregar dados ao roteador da rede local.</li>\n    <li><strong>Camada 3:</strong> o IP do servidor é alcançável, passando pelo gateway.</li>\n    <li><strong>Camada 4:</strong> a conexão com a porta 443 do servidor abre.</li>\n    <li><strong>Camadas 5 a 7:</strong> o TLS negocia a criptografia, o HTTP envia o pedido e o servidor responde.</li>\n  </ol>\n  <p>Se a página não abre, a pergunta é: em qual dessas etapas a evidência quebra? Um caso típico: o ping ao IP do servidor responde, mas o site não abre pelo nome. As camadas 1 a 3 funcionam até o servidor. O DNS, que transforma o nome do site em IP, é um serviço da camada 7, então a suspeita vai para ele, não para o cabo.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m02l01-title m02l01-desc\">\n    <title id=\"m02l01-title\">Modelo OSI como pilha de diagnóstico</title>\n    <desc id=\"m02l01-desc\">Diagrama mostrando as sete camadas do Modelo OSI à esquerda e, à direita, o caminho do diagnóstico: o sintoma vira uma pergunta com evidência por camada, e a primeira evidência que falha leva à hipótese e ao time responsável.</desc>\n    <defs>\n      <marker id=\"m02l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"70\" y=\"40\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"220\" y=\"73\" text-anchor=\"middle\" class=\"svg-label\">7 Aplicação — HTTP, DNS, API</text>\n    <rect x=\"70\" y=\"100\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"220\" y=\"133\" text-anchor=\"middle\" class=\"svg-label\">6 Apresentação — formato, codificação, TLS</text>\n    <rect x=\"70\" y=\"160\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"220\" y=\"193\" text-anchor=\"middle\" class=\"svg-label\">5 Sessão — estado e continuidade</text>\n    <rect x=\"70\" y=\"220\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"220\" y=\"253\" text-anchor=\"middle\" class=\"svg-label\">4 Transporte — TCP, UDP, portas</text>\n    <rect x=\"70\" y=\"280\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"220\" y=\"313\" text-anchor=\"middle\" class=\"svg-label\">3 Rede — IP, rota, gateway</text>\n    <rect x=\"70\" y=\"340\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"220\" y=\"373\" text-anchor=\"middle\" class=\"svg-label\">2 Enlace — MAC, switch, VLAN, ARP</text>\n    <rect x=\"70\" y=\"400\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"220\" y=\"433\" text-anchor=\"middle\" class=\"svg-label\">1 Física — cabo, fibra, rádio, sinal</text>\n\n    <rect x=\"555\" y=\"75\" width=\"300\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"705\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Sintoma</text>\n    <text x=\"705\" y=\"135\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">“o sistema não abre”</text>\n    <text x=\"705\" y=\"160\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">não é diagnóstico</text>\n\n    <rect x=\"555\" y=\"225\" width=\"300\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"705\" y=\"258\" text-anchor=\"middle\" class=\"svg-label\">Evidências por camada</text>\n    <text x=\"705\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">link, IP, rota, porta, TLS, HTTP</text>\n    <text x=\"705\" y=\"310\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">de baixo para cima, sem pular etapas</text>\n\n    <rect x=\"555\" y=\"375\" width=\"300\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"705\" y=\"410\" text-anchor=\"middle\" class=\"svg-label\">Hipótese e time responsável</text>\n    <text x=\"705\" y=\"438\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">vem da primeira evidência que falha</text>\n\n    <line x1=\"370\" y1=\"280\" x2=\"555\" y2=\"280\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l01-arrow)\"></line>\n    <text x=\"462\" y=\"268\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">uma pergunta</text>\n    <text x=\"462\" y=\"300\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">por camada</text>\n    <line x1=\"705\" y1=\"185\" x2=\"705\" y2=\"225\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l01-arrow)\"></line>\n    <line x1=\"705\" y1=\"335\" x2=\"705\" y2=\"375\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l01-arrow)\"></line>\n    <text x=\"490\" y=\"495\" text-anchor=\"middle\" class=\"svg-label\">O OSI não é decoração: é um mapa para transformar sintoma em evidência e evidência em hipótese.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> o OSI é um mapa de perguntas; a primeira evidência que falha aponta a camada provável.</li>\n    <li>Sete camadas, de baixo para cima: Física, Enlace, Rede, Transporte, Sessão, Apresentação e Aplicação.</li>\n    <li>O OSI é um modelo de referência; a internet roda sobre TCP/IP, que junta as camadas 5 a 7 em Aplicação.</li>\n    <li>Ping ou porta aberta não provam que a aplicação funciona nem que o acesso é permitido.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 2.2, você vai ver encapsulamento, desencapsulamento e PDUs: como os dados descem e sobem pela pilha, ganhando cabeçalhos, endereços e controles em cada camada.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 5",
      "Camada 6",
      "Camada 7"
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
      "IPv4",
      "IPv6",
      "ICMP",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [
      "bits",
      "sinais físicos",
      "protocolos",
      "métricas",
      "diagnóstico inicial",
      "dispositivos de rede"
    ],
    "enables": [
      "encapsulamento",
      "Wireshark",
      "troubleshooting por camadas",
      "segurança de redes",
      "modelo TCP/IP",
      "firewalls",
      "cloud networking"
    ]
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "Um colega diz: \"o Wi-Fi está conectado, então a rede está boa\". O que essa evidência prova e o que ainda falta verificar até o site abrir?",
      "hints": [
        "Wi-Fi conectado é evidência de quais camadas?",
        "Percorra as camadas de baixo para cima."
      ],
      "expectedIdeas": [
        "camadas 1 e 2",
        "IP e gateway",
        "rota até o destino",
        "DNS",
        "porta",
        "aplicação e login"
      ],
      "explanation": "Wi-Fi conectado mostra sinal e associação à rede local (camadas 1 e 2). Ainda falta ver se o notebook tem IP e alcança o gateway (3), se o destino é alcançável, se o nome resolve, se a porta abre (4) e se a aplicação responde e aceita o acesso (5 a 7)."
    },
    {
      "type": "cenário real",
      "question": "Em uma reunião de incidente, como você usaria OSI para evitar que todos culpem “a rede”?",
      "hints": [
        "Pense em evidências por camada.",
        "Pense em responsáveis e logs."
      ],
      "expectedIdeas": [
        "matriz de evidências",
        "camada provável",
        "logs",
        "comandos",
        "responsabilidade",
        "hipótese"
      ],
      "explanation": "Você pode transformar o sintoma em perguntas por camada, listar evidências já coletadas e direcionar o próximo teste ao ponto mais provável."
    }
  ],
  "quiz": [
    {
      "id": "q2.1.1",
      "question": "Qual é a principal utilidade prática do Modelo OSI?",
      "options": [
        "Substituir TCP/IP na internet moderna",
        "Organizar responsabilidades de comunicação em camadas",
        "Criptografar conexões HTTP automaticamente",
        "Aumentar a velocidade física do cabo"
      ],
      "answer": 1,
      "explanation": "O OSI é um modelo de referência que organiza responsabilidades e ajuda no ensino, documentação e troubleshooting.",
      "topic": "modelo osi",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.1.7",
      "question": "No modelo TCP/IP de quatro camadas, onde ficam as responsabilidades que o OSI separa nas camadas 5 (Sessão), 6 (Apresentação) e 7 (Aplicação)?",
      "options": [
        "Na camada de Transporte",
        "Divididas entre Internet e Transporte",
        "Todas na camada de Aplicação",
        "Na camada de Acesso à rede"
      ],
      "answer": 2,
      "explanation": "O TCP/IP agrupa sessão, apresentação e aplicação em uma única camada de Aplicação (HTTP, DNS, TLS). Transporte equivale à camada 4, Internet à 3 e Acesso à rede às camadas 2 e 1.",
      "topic": "osi x tcp/ip",
      "difficulty": "iniciante-intermediário",
      "type": "comparação"
    },
    {
      "id": "q2.1.8",
      "question": "O cabo está conectado, o notebook tem IP e o ping ao IP do servidor responde, mas a conexão com a porta 443 do servidor falha. Onde está a hipótese mais provável?",
      "options": [
        "Na camada 1, porque o cabo pode estar com defeito",
        "Na camada 7, porque o HTTP sempre é a causa",
        "Em nenhuma: sem reiniciar o servidor não dá para levantar hipótese",
        "Na camada 4: a porta pode estar bloqueada ou o serviço não está escutando"
      ],
      "answer": 3,
      "explanation": "As evidências das camadas 1 a 3 passaram; a primeira que falha é a da porta, que é responsabilidade da camada 4 (Transporte). É ali que a investigação continua.",
      "topic": "diagnóstico por camadas",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q2.1.3",
      "question": "Por que ping bem-sucedido não prova que uma aplicação web está funcionando?",
      "options": [
        "Porque ICMP/alcance não valida porta TCP, TLS, HTTP, autenticação ou aplicação",
        "Porque ping testa apenas DNS",
        "Porque ping sempre usa camada 7",
        "Porque ping só funciona em redes sem roteador"
      ],
      "answer": 0,
      "explanation": "Ping pode indicar algum alcance ICMP, mas não valida os mecanismos de transporte e aplicação necessários para um serviço web.",
      "topic": "troubleshooting",
      "difficulty": "iniciante-intermediário",
      "type": "comparação"
    },
    {
      "id": "q2.1.5",
      "question": "Um servidor de aplicação alcança a porta do banco de dados, mas recebe erro de permissão ao entrar. Qual distinção o OSI ajuda a fazer?",
      "options": [
        "Todo erro de banco é de camada 1",
        "Conectividade não é o mesmo que autorização",
        "Abrir mais portas no firewall resolve erros de permissão",
        "DNS sempre é a causa"
      ],
      "answer": 1,
      "explanation": "A porta alcançada mostra que a conectividade até a camada 4 funciona. A permissão depende de autenticação e autorização, que são da aplicação.",
      "topic": "conectividade x autorização",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.1.6",
      "question": "Qual afirmação sobre OSI está correta?",
      "options": [
        "Todo produto moderno atua em uma única camada",
        "O OSI elimina a necessidade de logs",
        "O OSI é um modelo conceitual; componentes reais podem operar em várias camadas",
        "O OSI torna desnecessário entender TCP/IP"
      ],
      "answer": 2,
      "explanation": "O OSI é uma referência. Firewalls, proxies, WAFs e load balancers podem atuar em múltiplas camadas.",
      "topic": "limitações",
      "difficulty": "intermediário",
      "type": "arquitetura"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.1.1",
      "front": "O que é o Modelo OSI?",
      "back": "Um modelo conceitual de referência com sete camadas (Física, Enlace, Rede, Transporte, Sessão, Apresentação e Aplicação) usado para organizar as responsabilidades da comunicação em rede.",
      "tags": [
        "osi",
        "camadas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.1.2",
      "front": "Qual camada trata de cabo, fibra, rádio e sinal?",
      "back": "Camada 1 — Física.",
      "tags": [
        "camada 1"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.1.3",
      "front": "Qual camada trata de endereço MAC, switch e ARP?",
      "back": "Camada 2 — Enlace.",
      "tags": [
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.1.4",
      "front": "Qual camada trata de IP, roteamento e gateway?",
      "back": "Camada 3 — Rede.",
      "tags": [
        "camada 3"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.1.5",
      "front": "Qual camada trata de TCP, UDP e portas?",
      "back": "Camada 4 — Transporte.",
      "tags": [
        "camada 4"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.1.6",
      "front": "Qual erro comum o OSI ajuda a evitar?",
      "back": "Chamar qualquer falha de “problema de rede” sem evidência por camada.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.1.1",
      "type": "classificação",
      "prompt": "Classifique os itens em camadas prováveis: cabo desconectado, MAC address, rota default, porta TCP 443, erro HTTP 403.",
      "expectedAnswer": "Cabo desconectado: camada 1; MAC address: camada 2; rota default: camada 3; porta TCP 443: camada 4; erro HTTP 403 (acesso proibido): camada 7, um problema de autorização na aplicação.",
      "explanation": "A classificação ajuda a não misturar conectividade física, enlace, rede, transporte e aplicação."
    },
    {
      "id": "ex2.1.4",
      "type": "arquitetura",
      "prompt": "Escolha um serviço que você usa (no trabalho ou em casa) e descreva uma evidência de camada 1, de camada 2 ou 3, de camada 4 e de camada 7 que mostraria que ele funciona.",
      "expectedAnswer": "Resposta variável: deve conter uma evidência física ou de Wi-Fi, uma de IP ou gateway, uma de porta e uma resposta da aplicação.",
      "explanation": "O exercício força a aplicar o modelo a uma situação real."
    }
  ],
  "challenge": {
    "title": "Transforme um chamado genérico em investigação por camadas",
    "scenario": "Um colega do escritório diz: \"não consigo acessar o sistema financeiro\". O sistema é um site interno acessado por HTTPS, pelo nome, com login corporativo. Outros colegas acessam normalmente.",
    "tasks": [
      "Montar uma tabela com as camadas e, para cada uma, uma pergunta de diagnóstico e a evidência que a responde (comando, mensagem ou log).",
      "Separar conectividade, DNS, porta, TLS, aplicação e autorização.",
      "Dizer qual time acionar conforme a primeira evidência que falhar."
    ],
    "constraints": [
      "Não assumir que o firewall é a causa sem evidência.",
      "Sanitizar IPs, nomes internos e usuários antes de compartilhar a tabela."
    ],
    "expectedDeliverables": [
      "Tabela de diagnóstico por camada",
      "Hipótese inicial e próximo passo"
    ]
  },
  "commentedSolution": {
    "reasoning": "Não aceite o sintoma como diagnóstico. Como outros colegas acessam, o sistema provavelmente está no ar: a diferença está no caminho ou na conta deste usuário.",
    "steps": [
      "Camadas 1 e 2: o cabo ou o Wi-Fi do colega está ativo?",
      "Camada 3: ipconfig mostra IP e gateway coerentes? O gateway responde ao ping?",
      "DNS: nslookup do nome do sistema retorna o mesmo IP que os outros colegas recebem?",
      "Camada 4: a conexão com a porta 443 abre? (Se o ping falhar, não conclua nada: ICMP pode estar bloqueado.)",
      "Camadas 5 a 7: aparece erro de certificado, erro HTTP ou recusa de login? Recusa de login aponta para a conta ou a permissão, não para a rede."
    ],
    "commonWrongAnswers": [
      {
        "answer": "É firewall, libera tudo.",
        "whyItIsWrong": "Não há evidência de falha na camada 4, e liberar tudo cria um risco grave."
      },
      {
        "answer": "Se ping falha, o servidor está fora.",
        "whyItIsWrong": "ICMP pode estar bloqueado enquanto a porta 443 funciona."
      }
    ],
    "finalAnswer": "Monte a matriz por camada e pare na primeira evidência que falha. Nome não resolve: DNS. Nome resolve e a porta 443 não abre: rota, firewall ou serviço (time de redes ou segurança). Porta abre e o login é recusado: conta ou permissão (time da aplicação ou de identidade)."
  },
  "glossary": [
    {
      "term": "Porta",
      "shortDefinition": "Número que identifica, dentro de um computador, qual serviço deve receber os dados de uma conexão.",
      "example": "Um site HTTPS costuma atender na porta TCP 443.",
      "relatedLessons": [
        "2.6"
      ]
    },
    {
      "term": "TLS",
      "shortDefinition": "Protocolo que criptografa a conexão entre o navegador (ou outro programa) e o servidor; é o que faz o https.",
      "example": "Um certificado inválido faz o TLS falhar mesmo com a porta 443 aberta.",
      "relatedLessons": [
        "2.7",
        "8.3"
      ]
    },
    {
      "term": "ICMP",
      "shortDefinition": "Protocolo de mensagens de controle da camada de rede; é o que o ping usa.",
      "example": "Um servidor pode bloquear ICMP (não responde ao ping) e ainda atender na porta 443.",
      "relatedLessons": [
        "4.8"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "ISO/IEC 7498-1 — Open Systems Interconnection Basic Reference Model",
      "organization": "ISO/IEC",
      "url": "",
      "note": "Referência conceitual histórica do Modelo OSI."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 0 Aula 0.8",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Pensamento em camadas antes do Modelo OSI formal."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 1 Aula 1.9",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Diagnóstico inicial com comandos básicos que serão organizados por camadas."
    },
    {
      "type": "rfc",
      "title": "RFC 1122 — Requirements for Internet Hosts",
      "organization": "IETF",
      "url": "",
      "note": "Útil para comparar pilha TCP/IP real com modelos conceituais."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "fundamentos de troubleshooting",
      "reason": "Pipelines, runners e plataformas internas dependem de diagnóstico por camadas quando falham ao acessar registries, APIs e clusters."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "fundamentos de autenticação e autorização",
      "reason": "O OSI ajuda a separar conectividade de falhas de identidade, sessão, token e autorização."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "2.2"
    ]
  }
};
