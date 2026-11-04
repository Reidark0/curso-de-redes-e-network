export const lesson0007 = {
  "id": "0.7",
  "moduleId": "m00",
  "order": 7,
  "title": "O que é um protocolo",
  "subtitle": "Como computadores combinam regras, mensagens, estados e expectativas para conversar sem improviso.",
  "duration": "15-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
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
    "Explicar protocolo como o contrato que dá significado aos bytes trocados e diferenciar seus elementos: formato (sintaxe), significado (semântica), ordem, estado, tempo, erro e versão.",
    "Explicar por que protocolos precisam ser padrões públicos para que sistemas de fabricantes diferentes conversem (interoperabilidade).",
    "Ler as etapas de um acesso web (DNS, TCP, TLS e HTTP) e um código de status para dizer onde a conversa parou, sem confundir protocolo com porta nem ping respondendo com aplicação funcionando."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Você já viu esta tela: “404 – Página não encontrada”. O Wi-Fi funciona, outros sites abrem, e aquele endereço não carrega. Muita gente conclui que “a internet caiu” e reinicia o roteador. Não adianta: o servidor recebeu o pedido, entendeu o pedido e respondeu com um número combinado que quer dizer “não tenho isso”. A rede fez a parte dela; quem disse não foi a conversa entre os dois programas.</p>\n  <p>\n    Sem entender isso, você gasta tempo testando cabo, Wi-Fi e ping num problema que está nas regras dessa conversa. Nesta aula você vai ver que regras são essas, ler uma conversa real e descobrir em que ponto ela parou. No suporte, em redes e em segurança, separar “os bytes não chegaram” de “os bytes chegaram e foram recusados” é o primeiro passo de quase todo diagnóstico.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    É isso que acontece quando as duas pontas seguem as mesmas regras: até a recusa é entendida. E elas precisam dessas regras porque bytes não carregam significado sozinhos, como você viu na aula 0.1. Os bytes <code>47 45 54</code> são só três números; no começo de um pedido web, são o texto <code>GET</code>, que quer dizer “me envie este conteúdo”. Sem um acordo prévio, o servidor não saberia se o primeiro campo é um comando, um tamanho ou um nome de usuário, e o cliente não saberia se um silêncio quer dizer erro, demora ou fim da conversa.</p>\n  <p>\n    Nas primeiras redes, cada fabricante criava as próprias regras, e máquinas de marcas diferentes não conversavam entre si. A internet cresceu com regras públicas, que qualquer fabricante pode implementar. Esta aula mostra o que essas regras definem e como uma conversa acontece.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> protocolo é o contrato de comunicação entre sistemas. Ele diz o que pode ser enviado, em que formato, em que ordem, em que momento, que resposta esperar e o que fazer quando algo dá errado.\n  </div>\n  <p>Todo protocolo define, em maior ou menor grau:</p>\n  <ul>\n    <li><strong>Formato (sintaxe):</strong> quais campos a mensagem tem, como são separados e que tamanho têm.</li>\n    <li><strong>Significado (semântica):</strong> o que cada campo quer dizer e quais valores são válidos. Uma mensagem pode ter o formato certo e mesmo assim trazer um valor proibido.</li>\n    <li><strong>Ordem:</strong> qual mensagem vem antes e qual vem depois.</li>\n    <li><strong>Estado:</strong> em que fase da conversa cada lado está (por exemplo, antes ou depois de se identificar).</li>\n    <li><strong>Tempo:</strong> quanto esperar por uma resposta antes de tentar de novo ou desistir (o <em>timeout</em>).</li>\n    <li><strong>Erro:</strong> como recusar, avisar o motivo ou encerrar.</li>\n    <li><strong>Versão:</strong> como as duas pontas combinam qual versão e quais opções ambas entendem.</li>\n    <li><strong>Segurança:</strong> se e como cada lado prova quem é e protege o conteúdo. Nem todo protocolo faz isso; na web, quem cuida é o TLS (veja o Exemplo).</li>\n  </ul>\n  <p>\n    Essas regras só funcionam entre fabricantes diferentes se forem <strong>padronizadas</strong>: escritas em documentos públicos, como as RFCs do IETF, implementadas por vários fornecedores e testadas entre si. A capacidade de sistemas diferentes conversarem seguindo o mesmo padrão se chama <strong>interoperabilidade</strong>. É por isso que um navegador de uma empresa abre o site hospedado no servidor de outra.</p>\n  <p>\n    Alguns protocolos usam mensagens de texto legíveis, como o <code>GET</code> do pedido web; outros usam campos binários compactos, que você só lê com uma ferramenta. Nos dois casos, quem dá significado aos bytes é o contrato.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Uma conversa de protocolo costuma seguir estas fases:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Início:</strong> um lado, o <strong>cliente</strong>, decide falar com o outro, o <strong>servidor</strong>. Por exemplo, o navegador quer uma página.</li>\n    <li><strong>Negociação:</strong> muitos protocolos começam com uma troca inicial de mensagens para combinar versão e opções, chamada <strong>handshake</strong> (“aperto de mão”).</li>\n    <li><strong>Pedido:</strong> o cliente envia uma mensagem com os campos esperados, como o comando, o destino e a versão.</li>\n    <li><strong>Interpretação:</strong> o servidor lê os campos segundo o contrato e confere o estado da conversa. Um formato inválido, um valor proibido ou um pedido fora de hora (dados antes da identificação, por exemplo) recebe erro ou é descartado.</li>\n    <li><strong>Resposta:</strong> o servidor devolve o que foi pedido ou um <strong>código de status</strong> que explica o resultado: sucesso, recurso inexistente, falta de identificação, falta de permissão, erro interno.</li>\n    <li><strong>Espera:</strong> se a resposta não chega no tempo combinado, o cliente repete o pedido ou desiste com erro de timeout.</li>\n    <li><strong>Encerramento:</strong> a conversa termina por uma mensagem de fim, por timeout ou por erro.</li>\n  </ol>\n  <p>\n    A especificação diz como o protocolo deve se comportar, mas quem o executa é software real: um protocolo bem definido pode ter uma implementação com bugs, e um protocolo seguro pode ser mal configurado.</p>\n  <div class=\"callout warning\"><strong>Erros comuns</strong><ul>\n    <li><strong>Achar que protocolo é porta.</strong> Porta é só um número que separa conversas no computador (a 443 costuma ser a dos sites com https), tema da aula 2.6. O protocolo é o contrato inteiro, e um serviço pode até usar uma porta fora do padrão.</li>\n    <li><strong>Achar que ping respondendo prova que a aplicação funciona.</strong> Ping só mostra que o destino responde a um pedido de eco; não testa a conexão com o serviço, a criptografia nem o pedido.</li>\n    <li><strong>Tratar todo código de erro como problema de rede.</strong> Um 403, 404 ou 500 é uma resposta: a mensagem chegou e o servidor respondeu.</li>\n  </ul></div>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Pense numa ligação para abrir um chamado técnico: você cumprimenta, se identifica, descreve o problema, responde às perguntas, recebe um número e desliga. Se você disser só “azul, 443, erro, ontem”, a atendente ouve as palavras, mas não entende o pedido. Em redes, os bytes são as palavras; o protocolo é o roteiro da ligação, que diz o que cada lado espera ouvir e como responder.</p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Abrir <code>https://example.com</code> no navegador já encadeia quatro protocolos, cada um com seu contrato:</p>\n  <ol class=\"flow-list\">\n    <li><strong>DNS:</strong> traduz o nome <code>example.com</code> no endereço numérico do servidor.</li>\n    <li><strong>TCP:</strong> abre uma conexão até o servidor, na porta 443.</li>\n    <li><strong>TLS:</strong> combina a criptografia da conexão e confere o certificado, o documento digital que prova que o servidor é mesmo o <code>example.com</code>.</li>\n    <li><strong>HTTP:</strong> leva o pedido e traz a resposta. O pedido é texto:</li>\n  </ol>\n  <pre class=\"code-block\"><code>GET / HTTP/1.1\nHost: example.com\nAccept: text/html\n</code></pre>\n  <p>\n    A primeira linha traz o comando (<code>GET</code>), o caminho (<code>/</code>, a página inicial) e a versão. As outras são campos do cabeçalho, no formato <code>Nome: valor</code>. A resposta começa com uma linha de status, como <code>HTTP/1.1 200 OK</code> (sucesso) ou <code>HTTP/1.1 404 Not Found</code> (a página do gancho da Motivação).</p>\n  <p>\n    Cada etapa falha de um jeito, e o sintoma diz onde a conversa parou. Se o DNS falha, o nome não resolve e nada mais acontece. Se o TCP falha, a conexão não abre. Se o TLS falha, aparece um erro de certificado. Se o HTTP responde com erro, as três etapas anteriores funcionaram e o servidor recusou o pedido: 401 (faltou identificação ou ela é inválida), 403 (identificado, mas sem permissão), 404 (recurso não encontrado) ou 500 (erro interno do servidor). A ferramenta <code>curl</code>, usada no laboratório, mostra essas etapas uma a uma com a opção <code>-v</code>.</p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m00l07-title m00l07-desc\">\n    <title id=\"m00l07-title\">Protocolo como contrato de comunicação</title>\n    <desc id=\"m00l07-desc\">Diagrama mostrando cliente e servidor trocando mensagens com formato, ordem, estado, timeout, erro e segurança.</desc>\n    <defs>\n      <marker id=\"m00l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"45\" y=\"150\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"120\" y=\"184\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"120\" y=\"207\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">implementação A</text>\n    <rect x=\"785\" y=\"150\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"860\" y=\"184\" text-anchor=\"middle\" class=\"svg-label\">Servidor</text>\n    <text x=\"860\" y=\"207\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">implementação B</text>\n    <rect x=\"300\" y=\"40\" width=\"380\" height=\"86\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Contrato do protocolo</text>\n    <text x=\"490\" y=\"98\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">formato + significado + ordem + tempo + erro + segurança</text>\n    <line x1=\"195\" y1=\"170\" x2=\"785\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l07-arrow)\" />\n    <text x=\"490\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mensagem 1: versão, método, campos</text>\n    <line x1=\"785\" y1=\"205\" x2=\"195\" y2=\"205\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l07-arrow)\" />\n    <text x=\"490\" y=\"232\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mensagem 2: status, dados ou erro</text>\n    <rect x=\"245\" y=\"285\" width=\"135\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"312\" y=\"309\" text-anchor=\"middle\" class=\"svg-label\">Estado</text>\n    <text x=\"312\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fase da conversa</text>\n    <rect x=\"422\" y=\"285\" width=\"135\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"490\" y=\"309\" text-anchor=\"middle\" class=\"svg-label\">Timeout</text>\n    <text x=\"490\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">espera e repete</text>\n    <rect x=\"600\" y=\"285\" width=\"135\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"667\" y=\"309\" text-anchor=\"middle\" class=\"svg-label\">Erro</text>\n    <text x=\"667\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rejeitar ou corrigir</text>\n    <path d=\"M120 240 C170 310 205 315 245 315\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#m00l07-arrow)\" />\n    <path d=\"M860 240 C805 310 775 315 735 315\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m00l07-arrow)\" />\n  </svg>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> protocolo é o contrato que dá significado aos bytes: formato, significado, ordem, estado, tempo e erro.</li>\n    <li>Padrões públicos, como as RFCs, permitem que sistemas de fabricantes diferentes conversem.</li>\n    <li>Abrir um site encadeia DNS, TCP, TLS e HTTP; cada etapa falha de um jeito.</li>\n    <li>Um 403 ou 404 é uma resposta: a rede entregou e o servidor recusou.</li>\n    <li>Porta não é protocolo, e ping respondendo não prova que a aplicação funciona.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula <strong>0.8 — Como pensar em camadas</strong>, você vai organizar esses contratos em camadas, cada uma com sua responsabilidade, para diagnosticar problemas sem se perder.</p>\n</section>\n"
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
  "lab": {
    "id": "lab-0.7",
    "title": "Observando protocolos no próprio computador",
    "labType": "local",
    "objective": "Ver com o curl as etapas de uma conversa web, os campos do pedido e da resposta e onde a conversa para quando algo falha.",
    "prerequisites": [
      "Um terminal (Windows PowerShell, Linux ou macOS) e acesso comum à internet."
    ],
    "tools": [
      "curl (no Windows 10 e 11, use curl.exe, que já vem instalado)"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Ver a conversa inteira",
        "instruction": "Peça a página inicial de example.com em modo detalhado. Na saída, linhas com * são avisos do curl, > é o que ele enviou e < é o que o servidor respondeu.",
        "command": "Linux/macOS: curl -v https://example.com/ -o /dev/null\nWindows: curl.exe -v https://example.com/ -o NUL",
        "expectedOutput": "Na ordem: uma linha Trying com o endereço do servidor e :443; Connected to example.com; algumas linhas sobre TLS e o certificado (o texto muda conforme o sistema); o pedido começando com > GET / e > Host: example.com; e a resposta começando com < HTTP/1.1 200 ou < HTTP/2 200.",
        "explanation": "Cada bloco é uma etapa: o DNS deu o endereço, o TCP conectou, o TLS conferiu o certificado e o HTTP levou o pedido e trouxe o status. O -o descarta o corpo da página."
      },
      {
        "number": 2,
        "title": "Ler só o cabeçalho da resposta",
        "instruction": "Peça apenas o cabeçalho da resposta, sem o corpo da página.",
        "command": "Linux/macOS: curl -I https://example.com/\nWindows: curl.exe -I https://example.com/",
        "expectedOutput": "Uma linha de status (HTTP/1.1 200 OK ou HTTP/2 200) seguida de campos no formato Nome: valor, como content-type e date.",
        "explanation": "É o formato do contrato HTTP: primeiro o status, depois os campos que descrevem a resposta."
      },
      {
        "number": 3,
        "title": "Pedir uma página que não existe",
        "instruction": "Repita o passo 2 com um caminho inventado.",
        "command": "Linux/macOS: curl -I https://example.com/pagina-que-nao-existe\nWindows: curl.exe -I https://example.com/pagina-que-nao-existe",
        "expectedOutput": "Normalmente uma linha de status com 404. Se o servidor escolher outro código, a conclusão é a mesma.",
        "explanation": "DNS, TCP e TLS funcionaram, e o servidor respondeu dentro do contrato. Um 404 não é rede caída: é o servidor dizendo que não tem aquele recurso."
      },
      {
        "number": 4,
        "title": "Fazer a conversa parar no DNS",
        "instruction": "Peça um nome que não existe. Nomes terminados em .example são reservados e nunca resolvem.",
        "command": "Linux/macOS: curl -v https://nome-que-nao-existe.example/\nWindows: curl.exe -v https://nome-que-nao-existe.example/",
        "expectedOutput": "Uma mensagem como curl: (6) Could not resolve host: nome-que-nao-existe.example, sem nenhuma linha Connected, TLS, > ou <.",
        "explanation": "A conversa parou na primeira etapa: sem endereço, não há conexão, TLS nem pedido. No passo 3 o servidor recusou; aqui nada chegou a ele."
      }
    ],
    "expectedResult": "Você viu as etapas DNS, TCP, TLS e HTTP de um acesso real, leu os campos do pedido e da resposta e comparou uma recusa do servidor (404) com uma conversa que parou antes de começar (DNS)."
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Por que o protocolo precisa definir quanto tempo esperar por uma resposta? O que acontece se o cliente esperar para sempre? E se desistir depois de 10 ms numa rede com RTT de 150 ms (aula 0.6)?",
      "hints": [
        "Silêncio pode ser perda, demora ou servidor fora do ar.",
        "Compare o tempo de espera com o tempo de ida e volta."
      ],
      "expectedIdeas": [
        "timeout",
        "esperar para sempre trava o programa",
        "timeout menor que o RTT faz falhar sempre",
        "nova tentativa"
      ],
      "explanation": "Sem limite, o cliente pode travar esperando uma resposta que nunca vem. Com um limite menor que o RTT, ele desiste antes de a resposta poder chegar e falha mesmo com a rede funcionando."
    },
    {
      "type": "diagnóstico",
      "question": "O ping para um servidor responde e a conexão na porta 443 abre, mas a aplicação devolve 403. Que hipóteses você testaria, e quais você descartaria?",
      "hints": [
        "Em que etapa a conversa chegou?",
        "403 não é o mesmo que timeout nem que 401."
      ],
      "expectedIdeas": [
        "a rede entregou",
        "falta de permissão",
        "usuário ou conta errada",
        "regra do servidor",
        "descartar cabo e Wi-Fi"
      ],
      "explanation": "O 403 é uma resposta HTTP: DNS, TCP e TLS funcionaram e o servidor recusou o pedido. O foco vai para permissão, conta e regras do servidor, não para cabo, Wi-Fi ou firewall."
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
      "question": "Ping funciona, mas uma chamada HTTPS falha por erro de certificado. Que etapa deve ser investigada com prioridade?",
      "options": [
        "Largura de banda do link, porque certificados são arquivos grandes.",
        "Firewall da porta 443, porque o ping não usa essa porta.",
        "TLS e o certificado do servidor.",
        "ARP na rede local, porque o ping pode ter usado outro endereço MAC."
      ],
      "answer": 2,
      "explanation": "Ping só mostra que o destino responde a um pedido de eco. Um erro de certificado é uma falha da etapa TLS: a conexão chegou ao servidor, e o problema está no certificado que deveria provar a identidade dele.",
      "topic": "tls",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.7.3",
      "question": "Por que porta não é sinônimo de protocolo?",
      "options": [
        "Porque a porta só identifica uma conversa no computador, mas o protocolo define as regras de mensagem e comportamento.",
        "Porque cada protocolo usa obrigatoriamente uma única porta fixa, então a porta é só um apelido para ele.",
        "Porque a porta pertence ao cabo de rede e o protocolo só ao navegador.",
        "Porque portas só existem em redes Wi-Fi."
      ],
      "answer": 0,
      "explanation": "A porta é só um número que separa conversas no computador. O protocolo é o contrato completo: formato, significado, ordem, estado, tempo e erro. Um serviço pode até usar uma porta fora do padrão.",
      "topic": "portas",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.7.5",
      "question": "Uma API (um serviço que outros programas chamam por HTTP) retorna 401 quando chamada pelo servidor de testes, mas funciona no notebook do desenvolvedor. Qual hipótese é mais coerente?",
      "options": [
        "A porta 443 está bloqueada no firewall do servidor de testes.",
        "A credencial ou os campos do pedido enviados pelo servidor de testes são diferentes dos enviados pelo notebook.",
        "O servidor da API está fora do ar quando o servidor de testes faz a chamada.",
        "Há perda de pacotes entre o servidor de testes e a API, corrompendo o pedido."
      ],
      "answer": 1,
      "explanation": "401 é uma resposta HTTP: a conexão abriu, a mensagem chegou e o servidor respondeu. O código indica identificação ausente ou inválida, então compare a credencial e os campos do pedido entre o notebook e o servidor de testes.",
      "topic": "diagnóstico",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q0.7.6",
      "question": "O que o comando curl -v ajuda a observar em uma comunicação HTTPS?",
      "options": [
        "O conteúdo descriptografado do tráfego de outros programas da máquina.",
        "Todos os roteadores no caminho até o servidor.",
        "Etapas como DNS, conexão, TLS, os campos do pedido e a resposta HTTP.",
        "As conexões abertas por todos os programas do computador."
      ],
      "answer": 2,
      "explanation": "curl -v mostra a conversa do próprio curl: o endereço a que ele se conectou, a negociação TLS, os campos enviados e recebidos e o status HTTP. Não mostra o caminho pela rede nem o tráfego de outros programas.",
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
        "Tempo: quanto esperar antes de desistir.",
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
      "back": "Não. Ping só mostra que o destino responde a um pedido de eco; não testa a conexão com o serviço, o TLS, o HTTP nem a identificação.",
      "tags": [
        "ping",
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.7.3",
      "front": "O que é handshake?",
      "back": "É a troca inicial de mensagens em que as duas pontas combinam versão, opções e parâmetros antes da conversa principal.",
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
      "id": "fc0.7.8",
      "front": "Por que protocolos precisam ser padrões públicos?",
      "back": "Para que sistemas de fabricantes diferentes implementem as mesmas regras e conversem entre si (interoperabilidade). Na internet, esses padrões são publicados em documentos como as RFCs do IETF.",
      "tags": [
        "padrão",
        "interoperabilidade"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.7.9",
      "front": "Sintaxe × semântica em um protocolo",
      "back": "Sintaxe é o formato: quais campos existem e como são separados. Semântica é o significado: o que cada campo quer dizer e quais valores são válidos.",
      "tags": [
        "sintaxe",
        "semântica"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.7.2",
      "type": "diagnóstico",
      "prompt": "Um sistema retorna HTTP 404. Liste duas hipóteses que não sejam 'a internet caiu'.",
      "expectedAnswer": "Endereço digitado errado, página removida ou renomeada, link antigo apontando para um caminho que não existe mais, ou o pedido indo para o servidor errado.",
      "explanation": "404 é uma resposta HTTP: o servidor recebeu e entendeu o pedido, mas não encontrou o recurso pedido."
    },
    {
      "id": "ex0.7.5",
      "type": "classificação",
      "prompt": "Diga qual elemento do contrato (formato, significado, ordem, estado, tempo ou versão) foi violado em cada caso: (a) a mensagem chega sem um campo obrigatório; (b) o campo quantidade chega com o valor -5; (c) o cliente pede dados antes de se identificar e o servidor recusa; (d) o servidor leva 40 s para responder e o cliente desiste em 30 s; (e) o cliente só fala a versão 3 e o servidor só entende as versões 1 e 2.",
      "expectedAnswer": "(a) formato (sintaxe); (b) significado (semântica): o campo existe, mas o valor não é válido; (c) ordem e estado: o pedido veio na fase errada da conversa; (d) tempo (timeout); (e) versão: a negociação não encontra uma versão comum.",
      "explanation": "O exercício aplica a lista do Conceito a casos concretos. Saber qual regra quebrou indica onde procurar a correção."
    }
  ],
  "challenge": {
    "title": "Três chamados de “a internet não funciona”",
    "scenario": "Na mesma manhã, três colegas abrem chamados dizendo que a internet não funciona. Você pede que cada um rode curl -v no endereço que tentou abrir. A: curl: (6) Could not resolve host: intranet.empresa.local. B: a saída mostra Connected to portal.empresa.com port 443 e termina com um erro de certificado expirado. C: a saída mostra a conexão, o TLS, o pedido > GET /relatorios e a resposta < HTTP/1.1 403 Forbidden.",
    "tasks": [
      "Para cada chamado, dizer em que etapa (DNS, TCP, TLS ou HTTP) a conversa parou e quais etapas já funcionaram.",
      "Dizer o que cada falha significa e quem deve olhar o problema.",
      "Dizer por que reiniciar o roteador não resolve nenhum dos três."
    ],
    "expectedDeliverables": [
      "Uma tabela curta com chamado, etapa em que parou, o que já funcionou e próximo passo."
    ]
  },
  "commentedSolution": {
    "reasoning": "Leia a saída do curl na ordem das etapas e veja qual foi a última que funcionou. O ponto de parada diz onde está o problema.",
    "steps": [
      "Chamado A: parou no DNS. O nome intranet.empresa.local não foi traduzido em endereço, então não houve conexão, TLS nem pedido. Verifique se o nome está certo e se o servidor de nomes da empresa conhece esse nome.",
      "Chamado B: DNS e TCP funcionaram (Connected ... port 443); parou no TLS. O certificado que prova a identidade do portal venceu. Quem administra o portal precisa renová-lo; o usuário não deve ignorar o aviso.",
      "Chamado C: DNS, TCP e TLS funcionaram, e o HTTP respondeu 403: o servidor recebeu o pedido e negou a permissão. Verifique se a conta do colega tem acesso a /relatorios.",
      "Nos três casos a falha está num serviço específico; reiniciar o roteador não muda o nome, o certificado nem a permissão."
    ],
    "commonMistakes": [
      "Mandar ignorar o erro de certificado para “funcionar logo”: isso desliga a prova de identidade do servidor.",
      "Ler o 403 como falha de conexão, quando ele prova que a conexão funcionou."
    ],
    "finalAnswer": "A parou no DNS (nome não resolve), B parou no TLS (certificado expirado) e C chegou ao HTTP e recebeu 403 (sem permissão). Cada um vai para um responsável diferente, e nenhum se resolve reiniciando o roteador."
  },
  "glossary": [
    {
      "term": "DNS",
      "shortDefinition": "Protocolo que traduz nomes, como example.com, no endereço numérico do servidor.",
      "example": "Sem DNS, o navegador não sabe para onde mandar o pedido de example.com.",
      "relatedLessons": [
        "7.1",
        "7.3"
      ]
    },
    {
      "term": "TCP",
      "shortDefinition": "Protocolo que abre uma conexão confiável entre dois computadores antes de os dados passarem.",
      "example": "O navegador abre uma conexão TCP na porta 443 do servidor antes do TLS e do HTTP.",
      "relatedLessons": [
        "2.6",
        "6.3"
      ]
    },
    {
      "term": "TLS",
      "shortDefinition": "Protocolo que criptografa a conexão e confere o certificado do servidor; é o que transforma http em https.",
      "example": "Um certificado expirado faz a etapa TLS falhar antes de qualquer pedido HTTP.",
      "relatedLessons": [
        "8.3"
      ]
    },
    {
      "term": "HTTP",
      "shortDefinition": "Protocolo de pedidos e respostas usado pela web: o cliente envia um comando, como GET, e o servidor responde com um código de status e o conteúdo.",
      "example": "GET / HTTP/1.1 pede a página inicial; HTTP/1.1 404 Not Found diz que o recurso não existe.",
      "relatedLessons": [
        "8.1",
        "8.2"
      ]
    },
    {
      "term": "Porta",
      "shortDefinition": "Número que o computador usa para separar conversas de rede diferentes; não é o protocolo.",
      "example": "Sites com https costumam usar a porta 443.",
      "relatedLessons": [
        "2.6"
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
      "quizScoreAtLeast": 70
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
