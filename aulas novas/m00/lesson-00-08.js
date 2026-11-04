export const lesson0008 = {
  "id": "0.8",
  "moduleId": "m00",
  "order": 8,
  "title": "Como pensar em camadas",
  "subtitle": "O método mental que separa problema físico, endereçamento, transporte, aplicação, identidade e segurança sem transformar troubleshooting em adivinhação.",
  "duration": "15-25 min + 30 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante",
  "type": "ligação",
  "xp": 140,
  "tags": [
    "fundamentos",
    "camadas",
    "modelo osi",
    "tcp/ip",
    "troubleshooting",
    "arquitetura",
    "segurança",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "É necessário entender que toda comunicação digital começa com informação representada em bits."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.5",
      "reason": "Pensar em camadas exige reconhecer que existe uma base física carregando os sinais."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.6",
      "reason": "Latência, perda, throughput e jitter ajudam a diferenciar falhas de caminho, capacidade e aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.7",
      "reason": "Protocolos são contratos; o pensamento em camadas organiza esses contratos por responsabilidade."
    }
  ],
  "objectives": [
    "Explicar por que a comunicação em rede é dividida em camadas, cada uma com uma responsabilidade, e como o encapsulamento as encadeia num acesso HTTPS.",
    "Diagnosticar uma falha subindo as camadas em ordem e dizer o que cada evidência prova e o que não prova (ping, porta, TLS, 401 e 403).",
    "Explicar que modelos como OSI e TCP/IP são mapas para organizar hipóteses, não a descrição exata de cada pacote."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Você já deve ter ouvido, ou dito, que “a internet caiu” quando só um site não abria. No trabalho, a versão disso é o chamado “o sistema não funciona”. Imagine um caso: o ping para o servidor responde, mas o login falha. Um analista conclui que “a rede está funcionando”; outro, que “é problema de senha”. Sem método, cada um testa uma coisa: trocam o DNS, reiniciam o serviço, pedem para liberar o firewall. Às vezes acertam por sorte; outras vezes abrem uma porta perigosa e o problema continua.\n  </p>\n  <p>\n    Os dois podem estar errados, porque o ping testa só um pedaço do caminho. Nesta aula você vai organizar esses pedaços em camadas e saber o que cada teste prova. É o método que suporte, redes, segurança e cloud usam para discutir uma falha com evidências, sem empurrá-la de uma equipe para outra.\n  </p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    É isso que acontece quando tudo vira “a rede”. Um simples acesso a <code>https://sistema.empresa.local</code> depende de Wi-Fi, endereço IP, caminho até o servidor, DNS, porta, TLS, HTTP, login e permissão. Se todas essas peças são tratadas como uma coisa só, não há como saber qual testar primeiro nem o que um teste que passou realmente prova.\n  </p>\n  <p>\n    Modelos em camadas existem para dividir essa complexidade em responsabilidades. Por isso equipes e fabricantes diferentes trabalham em partes diferentes: quem fabrica a placa de rede não implementa HTTP, e quem desenvolve a API não lida com o sinal elétrico no cabo. Esta aula mostra quais são essas camadas, como os dados passam por elas e como usá-las para testar cada hipótese no lugar certo.\n  </p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> pensar em camadas é dividir uma comunicação em responsabilidades separadas, cada uma cumprida por seus próprios protocolos e testada com sua própria evidência.\n  </div>\n  <p>Cada camada responde a uma pergunta diferente:</p>\n  <ul>\n    <li><strong>Física:</strong> existe sinal no cabo, na fibra ou no rádio?</li>\n    <li><strong>Enlace:</strong> os dados chegam ao próximo equipamento da rede local, como o roteador de casa?</li>\n    <li><strong>Rede:</strong> existe endereço e caminho até o destino, mesmo que ele esteja em outra rede?</li>\n    <li><strong>Transporte:</strong> a conversa chega ao programa certo no servidor, identificado pela porta?</li>\n    <li><strong>Aplicação:</strong> as mensagens seguem o protocolo e fazem sentido (DNS, TLS, HTTP)?</li>\n    <li><strong>Identidade e autorização:</strong> quem está pedindo e o que essa pessoa pode fazer?</li>\n  </ul>\n  <h3>Modelos são mapas, não o pacote real</h3>\n  <p>\n    O <strong>modelo OSI</strong> divide a comunicação em sete camadas e é o mapa usado para ensinar e diagnosticar. A <strong>pilha TCP/IP</strong>, com quatro camadas, descreve como a internet foi de fato construída. Identidade e autorização não aparecem em nenhum dos dois, mas causam boa parte das falhas que chegam como “a rede caiu”. Nenhum modelo é a realidade completa: um firewall, por exemplo, pode decidir olhando endereços, portas e até o conteúdo de uma requisição HTTP, ou seja, atua em várias camadas ao mesmo tempo. Use o modelo para organizar hipóteses, nunca para ignorar uma evidência direta.\n  </p>\n  <div class=\"callout warning\">\n    <strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Culpar o DNS por qualquer falha de acesso.</strong> Teste a resolução do nome; se ela funciona, continue subindo: porta, TLS, HTTP.</li>\n      <li><strong>Pedir para liberar o firewall sem saber a camada da falha.</strong> Se o problema era certificado ou permissão, a liberação não resolve e ainda deixa uma porta exposta.</li>\n      <li><strong>Confundir autenticação com autorização.</strong> Autenticação verifica quem é o usuário; autorização decide o que ele pode fazer. Em HTTP, 401 costuma indicar credencial ausente ou inválida; 403 indica que o servidor entendeu o pedido e recusou a ação, o que, para um usuário já autenticado, aponta para autorização.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Quando você abre <code>https://sistema.empresa.local</code>, os dados descem pelas camadas na origem. Cada camada acrescenta aos dados que recebeu de cima as informações de que precisa para cumprir sua responsabilidade: isso é o <strong>encapsulamento</strong>. No destino, cada camada lê e retira a sua parte e entrega o resto à camada de cima (desencapsulamento).\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Aplicação:</strong> o navegador monta a requisição HTTP, o pedido da página.</li>\n    <li><strong>TLS:</strong> protege a conversa com criptografia e confere o certificado do servidor.</li>\n    <li><strong>Transporte:</strong> o TCP acrescenta as portas, que indicam qual programa recebe os dados, e controla a conversa.</li>\n    <li><strong>Rede:</strong> o IP acrescenta os endereços de origem e destino, usados para achar o caminho entre redes.</li>\n    <li><strong>Enlace:</strong> Ethernet ou Wi-Fi entrega os dados ao próximo equipamento da rede local.</li>\n    <li><strong>Física:</strong> cobre, fibra ou rádio transportam os bits como sinais.</li>\n  </ol>\n  <p>\n    Só quando tudo isso funciona o servidor recebe o pedido. Aí entram duas camadas que não fazem parte dos protocolos de rede: a identidade (quem está pedindo) e a autorização (o que essa pessoa pode fazer).\n  </p>\n  <p>\n    Essa ordem dá a regra do diagnóstico: <strong>um teste que passa prova a sua camada e as de baixo, nunca as de cima</strong>. Uma resposta 403 prova que sinal, caminho, porta e TLS funcionaram, porque o servidor recebeu o pedido e o recusou. Já um ping respondendo prova só que o servidor é alcançável pela rede; porta, TLS e aplicação continuam sem teste.\n  </p>\n  <p>\n    As camadas também se influenciam: um cabo com defeito pode causar perdas que deixam a aplicação lenta, e um firewall pode bloquear uma porta mesmo com o caminho funcionando.\n  </p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Pense na entrega de um documento numa empresa: precisa existir estrada até o prédio, o entregador precisa achar o endereço, a recepção decide se ele entra e quem recebe confere se o pedido faz sentido. Cada etapa é uma camada, e uma não substitui a outra: endereço certo não garante entrada, e entrada liberada não garante que o documento seja aceito.\n  </p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Seu notebook não abre um site. Em vez de testar ao acaso, suba as camadas em ordem e só avance quando a anterior estiver confirmada:\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Pergunta</th><th>Camada aproximada</th><th>Como verificar</th></tr></thead>\n      <tbody>\n        <tr><td>Estou conectado ao cabo ou ao Wi-Fi?</td><td>Física/enlace</td><td>Ícone de rede, status da interface</td></tr>\n        <tr><td>Tenho endereço IP e gateway?</td><td>Rede</td><td><code>ipconfig</code> (Windows), <code>ip addr</code> e <code>ip route</code> (Linux)</td></tr>\n        <tr><td>O nome do site resolve?</td><td>Aplicação (DNS)</td><td><code>nslookup</code>, <code>dig</code></td></tr>\n        <tr><td>A porta 443 responde?</td><td>Transporte</td><td><code>Test-NetConnection</code>, <code>curl -v</code></td></tr>\n        <tr><td>O TLS negocia?</td><td>Aplicação (TLS)</td><td><code>curl -v</code> (mostra a negociação e o certificado)</td></tr>\n        <tr><td>A aplicação aceita o pedido?</td><td>Aplicação/identidade</td><td>Código HTTP (200, 401, 403), mensagem de erro</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>\n    A primeira pergunta com resposta “não” mostra onde procurar. Se o nome não resolve, de nada adianta reiniciar o servidor; se a aplicação responde 403, de nada adianta trocar o cabo.\n  </p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 100 980 385\" role=\"img\" aria-labelledby=\"m00l08-title m00l08-desc\">\n    <title id=\"m00l08-title\">Pensamento em camadas aplicado ao troubleshooting</title>\n    <desc id=\"m00l08-desc\">Diagrama em pilha mostrando as camadas física, enlace, rede, transporte, aplicação e identidade e autorização. Uma seta sobe as hipóteses camada a camada; outra desce para validar a base.</desc>\n    <defs>\n      <marker id=\"m00l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"80\" y=\"400\" width=\"820\" height=\"48\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"490\" y=\"430\" text-anchor=\"middle\" class=\"svg-label\">Física: sinal, cabo, fibra, rádio, energia, interferência</text>\n    <rect x=\"110\" y=\"345\" width=\"760\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"490\" y=\"375\" text-anchor=\"middle\" class=\"svg-label\">Enlace: Ethernet, Wi-Fi, entrega na rede local</text>\n    <rect x=\"140\" y=\"290\" width=\"700\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"490\" y=\"320\" text-anchor=\"middle\" class=\"svg-label\">Rede: endereço IP, gateway, caminho entre redes</text>\n    <rect x=\"170\" y=\"235\" width=\"640\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"490\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Transporte: TCP, UDP, portas</text>\n    <rect x=\"200\" y=\"180\" width=\"580\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"490\" y=\"210\" text-anchor=\"middle\" class=\"svg-label\">Aplicação: DNS, TLS, HTTP, códigos de status</text>\n    <rect x=\"230\" y=\"125\" width=\"520\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"490\" y=\"155\" text-anchor=\"middle\" class=\"svg-label\">Identidade e autorização: login, permissões</text>\n    <line x1=\"930\" y1=\"425\" x2=\"930\" y2=\"150\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l08-arrow)\" />\n    <text x=\"935\" y=\"472\" text-anchor=\"end\" class=\"svg-label svg-label--small\">subir hipóteses</text>\n    <line x1=\"50\" y1=\"150\" x2=\"50\" y2=\"425\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l08-arrow)\" />\n    <text x=\"45\" y=\"472\" class=\"svg-label svg-label--small\">descer para validar base</text>\n  </svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> cada camada tem uma responsabilidade: sinal, entrega local, caminho, porta, protocolo, identidade e permissão.</li>\n    <li>Cada camada acrescenta suas informações aos dados (encapsulamento); no destino, cada uma retira a sua.</li>\n    <li>Um teste prova a sua camada e as de baixo, nunca as de cima: ping respondendo não prova que o site funciona.</li>\n    <li>401 aponta para autenticação; 403, para autorização.</li>\n    <li>OSI e TCP/IP são mapas, não a descrição exata de cada pacote.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    No Laboratório integrador do Módulo 0 (aula 0.9), você vai aplicar bits, codificação, sinais, métricas, protocolos e camadas a evidências reais, registrando o que cada comando prova e o que ele não prova.\n  </p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Modelo mental preparatório para todas as camadas OSI"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "IPv4",
      "TCP",
      "UDP",
      "DNS",
      "TLS",
      "HTTP",
      "OIDC"
    ],
    "dependsOn": [
      "bits",
      "sinais físicos",
      "latência",
      "largura de banda",
      "throughput",
      "protocolo"
    ],
    "enables": [
      "Modelo OSI",
      "troubleshooting estruturado",
      "arquitetura de redes",
      "cloud networking",
      "segurança em camadas"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que modelos em camadas ajudam mais no diagnóstico do que uma lista solta de comandos?",
      "hints": [
        "Pense em hipótese e evidência.",
        "Pense em responsabilidades diferentes."
      ],
      "expectedIdeas": [
        "organização",
        "redução de tentativa e erro",
        "separação de responsabilidades",
        "comunicação entre equipes"
      ],
      "explanation": "Comandos sem modelo mental podem gerar dados sem interpretação. Camadas ajudam a saber o que cada comando confirma ou não confirma."
    },
    {
      "type": "diagnóstico",
      "question": "Um site abre no celular pela rede móvel (4G), mas não abre no notebook ligado ao Wi-Fi de casa, com o mesmo usuário e a mesma senha. Quais camadas são iguais nos dois casos, quais mudam e por onde você começaria?",
      "hints": [
        "O site, a aplicação e a conta são os mesmos.",
        "Pense no que muda entre o 4G e o Wi-Fi: meio, endereço, caminho e o DNS usado por cada rede."
      ],
      "expectedIdeas": [
        "aplicação e identidade são as mesmas",
        "meio físico e enlace mudam (rádio do celular x Wi-Fi)",
        "endereço IP, gateway e caminho mudam",
        "o DNS usado pode ser outro",
        "começar pela conexão e pelo endereço do notebook, depois resolução do nome e porta"
      ],
      "explanation": "Se a mesma conta funciona em outro caminho, a aplicação e a identidade estão saudáveis. A diferença está nas camadas de baixo: conexão ao Wi-Fi, endereço e gateway, DNS da rede de casa e porta. Comece por elas, em ordem, antes de mexer na senha."
    }
  ],
  "quiz": [
    {
      "id": "q0.8.1",
      "question": "Qual é a melhor descrição de pensamento em camadas?",
      "options": [
        "Um método para organizar responsabilidades e evidências de comunicação",
        "Uma lista fixa de comandos que deve ser executada sempre na mesma ordem",
        "Uma regra para começar todo diagnóstico pela camada de aplicação",
        "Um modelo que descreve exatamente os cabeçalhos de cada pacote real"
      ],
      "answer": 0,
      "explanation": "Camadas são um modelo mental para separar responsabilidades e investigar com evidências. Não são uma receita fixa de comandos nem uma descrição exata dos pacotes reais.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.8.2",
      "question": "Ping para um servidor responde, mas o site HTTPS não abre. O que é correto concluir?",
      "options": [
        "Toda a aplicação está saudável",
        "Há alguma conectividade, mas ainda é preciso testar porta, TLS e aplicação",
        "DNS obrigatoriamente está quebrado",
        "O problema só pode ser físico"
      ],
      "answer": 1,
      "explanation": "Ping é uma evidência limitada: mostra que o servidor é alcançável pela rede, mas não testa a porta, o TLS nem a aplicação. Um teste prova a sua camada e as de baixo, nunca as de cima.",
      "topic": "troubleshooting",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.8.4",
      "question": "Uma API retorna 403. Qual hipótese deve ser considerada antes de alterar rota ou firewall?",
      "options": [
        "Cabo rompido entre o usuário e o switch",
        "Autorização: o usuário não tem permissão para essa ação",
        "Rota ausente até a rede da API",
        "Firewall bloqueando a porta 443"
      ],
      "answer": 1,
      "explanation": "Um 403 é uma resposta HTTP: a requisição atravessou cabo, caminho, porta e TLS e chegou ao servidor, que a recusou. Por isso a hipótese inicial é autorização, não rota nem firewall.",
      "topic": "diagnóstico",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.8.5",
      "question": "Por que o modelo OSI é útil mesmo que a internet real use a pilha TCP/IP?",
      "options": [
        "Porque é um mapa didático para separar responsabilidades",
        "Porque todos os pacotes carregam exatamente sete cabeçalhos OSI",
        "Porque substitui documentação de rede",
        "Porque descreve exatamente como os sistemas operacionais implementam a pilha"
      ],
      "answer": 0,
      "explanation": "O OSI é muito útil como modelo pedagógico e de diagnóstico, mesmo quando a implementação real não encaixa perfeitamente em sete camadas rígidas.",
      "topic": "modelos",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.8.6",
      "question": "Um usuário recebe 401 em uma API; outro, já autenticado, recebe 403 na mesma API. Qual leitura é a mais adequada?",
      "options": [
        "Os dois casos indicam falha de rede entre cliente e API",
        "401 indica falta de permissão e 403 indica credencial ausente",
        "Os dois códigos significam que o serviço está indisponível",
        "401 aponta para autenticação; 403 aponta para autorização"
      ],
      "answer": 3,
      "explanation": "401 costuma indicar credencial ausente ou inválida (autenticação). 403 indica que o servidor entendeu o pedido e recusou a ação; para um usuário já autenticado, isso aponta para autorização. Em ambos os casos a rede entregou a requisição.",
      "topic": "identidade",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.8.7",
      "question": "Num acesso HTTPS, qual sequência descreve o encapsulamento, da aplicação até o meio físico?",
      "options": [
        "TCP, HTTP, IP, TLS, Ethernet/Wi-Fi, sinal",
        "HTTP, IP, TLS, TCP, Ethernet/Wi-Fi, sinal",
        "HTTP, TLS, TCP, IP, Ethernet/Wi-Fi, sinal",
        "Ethernet/Wi-Fi, IP, TCP, TLS, HTTP, sinal"
      ],
      "answer": 2,
      "explanation": "A requisição HTTP é protegida pelo TLS, carregada pelo TCP (portas), endereçada pelo IP, entregue ao próximo salto por Ethernet ou Wi-Fi e transmitida como sinal. No destino, o caminho inverso é o desencapsulamento.",
      "topic": "encapsulamento",
      "difficulty": "iniciante",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.8.1",
      "front": "O que significa pensar em camadas?",
      "back": "Separar uma comunicação em responsabilidades testáveis, como meio físico, enlace, rede, transporte, aplicação, identidade e política.",
      "tags": [
        "camadas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.8.8",
      "front": "O que é encapsulamento?",
      "back": "No envio, cada camada acrescenta aos dados da camada de cima as informações de que precisa (como portas e endereços). No destino, cada camada retira a sua parte: é o desencapsulamento.",
      "tags": [
        "encapsulamento"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.8.6",
      "front": "A porta 443 conecta, mas o TLS falha. Onde investigar?",
      "back": "A falha está acima do transporte, na negociação do TLS, geralmente no certificado do servidor. A rede e a porta já funcionaram.",
      "tags": [
        "troubleshooting",
        "tls"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.8.3",
      "front": "Qual é a diferença entre autenticação e autorização?",
      "back": "Autenticação verifica quem é o usuário ou sistema. Autorização decide o que essa identidade pode fazer.",
      "tags": [
        "iam",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.8.7",
      "front": "Por que dizemos que modelos em camadas são mapas, não a realidade?",
      "back": "Porque nem todo protocolo se encaixa perfeitamente num modelo e alguns equipamentos, como firewalls que olham endereços, portas e conteúdo HTTP, atuam em várias camadas ao mesmo tempo.",
      "tags": [
        "modelos"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.8.1",
      "type": "conceitual",
      "prompt": "Explique por que 'a rede está lenta' não é diagnóstico suficiente.",
      "expectedAnswer": "Porque lentidão pode vir de camadas diferentes: perda ou interferência no meio físico, latência no caminho, pouca capacidade (throughput), demora na resolução do DNS, na negociação do TLS ou no próprio servidor. É preciso separar hipóteses por camada e coletar evidência de cada uma.",
      "explanation": "Termos vagos não apontam causa. Camadas transformam sintoma em perguntas testáveis."
    },
    {
      "id": "ex0.8.4",
      "type": "classificação",
      "prompt": "Para cada evidência, diga qual é a camada mais alta que ela confirma: (a) o ícone mostra o notebook conectado ao Wi-Fi; (b) nslookup sistema.empresa.local devolve um endereço IP; (c) Test-NetConnection sistema.empresa.local -Port 443 dá sucesso; (d) o navegador mostra um erro de certificado; (e) a API responde 401.",
      "expectedAnswer": "(a) física/enlace: há conexão com a rede local; (b) a resolução de nomes (DNS) funciona, o que exige que as camadas de baixo funcionem até o servidor DNS; (c) transporte: a porta 443 aceita conexão; (d) o transporte funciona, mas a falha está no TLS; (e) aplicação: o servidor recebeu e entendeu o pedido, e a falha está na autenticação.",
      "explanation": "Cada evidência prova a sua camada e as de baixo. Saber onde ela para mostra qual é a próxima pergunta a fazer."
    }
  ],
  "challenge": {
    "title": "O site interno que não abre pelo nome",
    "scenario": "Um colega diz que o site interno sistema.empresa.local não abre e pede para liberar o firewall. Você coleta três evidências: o notebook está no Wi-Fi e tem endereço IP e gateway; nslookup sistema.empresa.local responde que o nome não foi encontrado; Test-NetConnection 10.0.0.20 -Port 443, usando o endereço do servidor que está na documentação, dá sucesso.",
    "tasks": [
      "Dizer em qual camada está a falha.",
      "Dizer quais camadas as evidências já provam que funcionam.",
      "Dizer se liberar o firewall resolve e qual seria o próximo passo."
    ],
    "expectedDeliverables": [
      "Uma explicação de 5 a 8 linhas, citando a evidência que sustenta cada conclusão."
    ]
  },
  "commentedSolution": {
    "reasoning": "Suba as camadas e veja onde está o primeiro “não”. Cada teste que passou prova a sua camada e as de baixo.",
    "steps": [
      "Wi-Fi conectado, com IP e gateway: física, enlace e configuração de rede do notebook funcionam.",
      "Test-NetConnection na porta 443 do endereço 10.0.0.20 deu sucesso: existe caminho até o servidor e a porta aceita conexão. Rede e transporte funcionam, e nenhum firewall está bloqueando esse acesso.",
      "nslookup não encontra o nome: a falha está na resolução de nomes (DNS), uma camada de aplicação que o navegador precisa antes de se conectar.",
      "Próximo passo: verificar se o nome está cadastrado no DNS da empresa e se o notebook usa o servidor DNS certo, e acionar quem cuida do DNS com essas evidências."
    ],
    "commonMistakes": [
      "Liberar o firewall: a porta 443 já conecta, então o firewall não é o problema e a liberação só aumenta a exposição.",
      "Concluir que o servidor está fora do ar: ele aceitou conexão na porta 443."
    ],
    "finalAnswer": "A falha é de DNS: o nome sistema.empresa.local não resolve, embora rede e porta funcionem (o teste pelo endereço deu sucesso). Liberar o firewall não resolve; corrija o cadastro do nome ou o DNS usado pelo notebook."
  },
  "glossary": [
    {
      "term": "Ping",
      "shortDefinition": "Comando que envia um pedido simples a um endereço e mede se e quando a resposta volta.",
      "example": "ping 10.0.0.20 respondendo mostra que o servidor é alcançável, mas não testa a porta nem a aplicação.",
      "relatedLessons": [
        "1.9",
        "4.8"
      ]
    },
    {
      "term": "Gateway",
      "shortDefinition": "O equipamento, normalmente um roteador, para o qual o computador envia os dados destinados a outras redes.",
      "example": "Em casa, o gateway costuma ser o roteador Wi-Fi.",
      "relatedLessons": [
        "2.5"
      ]
    },
    {
      "term": "Certificado",
      "shortDefinition": "Documento digital que o servidor apresenta no TLS para provar sua identidade.",
      "example": "Um certificado vencido ou emitido para outro nome faz o navegador mostrar um erro antes de abrir a página.",
      "relatedLessons": [
        "8.3"
      ]
    },
    {
      "term": "Modelo OSI",
      "shortDefinition": "Modelo de referência que divide a comunicação em rede em sete camadas, cada uma com uma responsabilidade.",
      "example": "É o mapa usado em todo o Módulo 2 para ensinar e diagnosticar redes.",
      "relatedLessons": [
        "2.1"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 0, aulas 0.1 a 0.7",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Fundamentos necessários para o pensamento em camadas."
    },
    {
      "type": "standard",
      "title": "ISO/IEC 7498-1 — Open Systems Interconnection Basic Reference Model",
      "organization": "ISO/IEC",
      "url": "",
      "note": "Referência conceitual clássica para o modelo OSI."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "O pensamento em camadas será usado em CI/CD, Kubernetes, proxies, ingress e observabilidade."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Autenticação, autorização, claims e políticas são camadas modernas acima da conectividade."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "base",
      "reason": "Pipelines, containers e Kubernetes exigem separar rede, plataforma, API, identidade e política."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "base",
      "reason": "A aula diferencia conectividade, autenticação e autorização, base para IAM."
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
      "0.9"
    ]
  }
};
