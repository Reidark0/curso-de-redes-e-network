export const lesson0202 = {
  "id": "2.2",
  "moduleId": "m02",
  "order": 2,
  "title": "Encapsulamento, desencapsulamento e PDUs",
  "subtitle": "Como dados de aplicação viram segmentos, pacotes, quadros e bits — e por que isso muda o troubleshooting.",
  "duration": "20-25 min + 35 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 200,
  "tags": [
    "redes",
    "modelo osi",
    "encapsulamento",
    "pdu",
    "wireshark",
    "tcp",
    "ip",
    "ethernet",
    "mtu",
    "vpn",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 explicou por que o Modelo OSI existe e como usar camadas como linguagem de diagnóstico."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "reason": "É necessário entender bits, bytes, protocolos e pensamento em camadas."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m01",
      "reason": "É necessário reconhecer dispositivos, topologias, equipamentos e comandos básicos de diagnóstico."
    }
  ],
  "objectives": [
    "Explicar encapsulamento e desencapsulamento: o que cada camada acrescenta e como o destino usa cada cabeçalho para saber o que vem dentro.",
    "Diferenciar dados, segmento, datagrama, pacote, quadro e bits, e dizer o que switch e roteador leem e por que o quadro é refeito a cada salto.",
    "Calcular quanto os cabeçalhos ocupam numa MTU de 1500 bytes e explicar por que um túnel (VPN) faz pacotes grandes falharem enquanto os pequenos passam."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Você trabalha de casa pela VPN da empresa. O login funciona, o sistema interno abre e as páginas carregam. Mas, ao anexar um arquivo de alguns megabytes, o envio fica parado e termina em erro. No escritório, sem VPN, o mesmo envio funciona. A reação comum é culpar o sistema, reinstalar o cliente da VPN ou pedir mais banda, e nada disso resolve.</p>\n  <p>O que separa o que passa do que trava não é o conteúdo, é o tamanho. Tudo o que sai do seu computador vai embrulhado em vários cabeçalhos, um por camada, e a VPN acrescenta mais um embrulho. Nesta aula você vê como esse embrulho é montado e desmontado, quanto espaço ele ocupa e por que ele explica esse sintoma. É a mesma base que permite a quem trabalha com segurança ler uma captura de tráfego e saber o que cada equipamento do caminho conseguiu ver.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando não se enxerga que uma mensagem viaja dentro de vários envelopes. Os dados da aplicação (uma requisição HTTP, uma consulta DNS, um arquivo) não dizem, sozinhos, como atravessar a rede. Falta responder:</p>\n  <ul>\n    <li>qual programa do destino deve receber os dados (a porta, na camada de transporte);</li>\n    <li>para qual computador, em qual rede, eles vão (o endereço IP, na camada de rede);</li>\n    <li>para qual equipamento do enlace local entregar agora (o endereço MAC, na camada de enlace);</li>\n    <li>como virar sinal no cabo, na fibra ou no rádio (a camada física).</li>\n  </ul>\n  <p>Cada camada responde à sua pergunta acrescentando um cabeçalho, e o destino precisa desfazer tudo na ordem inversa. Esses cabeçalhos ocupam bytes num espaço limitado, e é por isso que um envelope a mais pode deixar os pacotes grandes sem lugar.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p><strong>Encapsulamento</strong> é o processo em que os dados recebidos da camada de cima ganham as informações de que a camada de baixo precisa: quase sempre um <strong>cabeçalho</strong>, na frente, e às vezes um <strong>trailer</strong>, no fim. Na Ethernet, o trailer é o FCS (Frame Check Sequence), de 4 bytes, que permite ao receptor detectar um quadro corrompido. <strong>Desencapsulamento</strong> é o inverso: o destino lê, confere e remove essas informações, camada por camada, até entregar só os dados à aplicação.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> PDU (Protocol Data Unit) é o nome genérico da unidade de dados de uma camada, com o cabeçalho dessa camada. Cada camada dá um nome à sua PDU.</div>\n  <div class=\"responsive-table\"><table class=\"data-table comparison-table\">\n    <thead><tr><th>Camada</th><th>PDU</th><th>O que a camada acrescenta</th><th>Exemplo</th></tr></thead>\n    <tbody>\n      <tr><td>Aplicação</td><td>Dados</td><td>A mensagem da aplicação</td><td>Requisição HTTP, consulta DNS</td></tr>\n      <tr><td>Transporte</td><td>Segmento (TCP) ou datagrama (UDP)</td><td>Portas de origem e destino; no TCP, também sequência e controle</td><td>TCP 443, UDP 53</td></tr>\n      <tr><td>Rede</td><td>Pacote</td><td>IP de origem, IP de destino, TTL, protocolo de dentro</td><td>IPv4 ou IPv6</td></tr>\n      <tr><td>Enlace</td><td>Quadro</td><td>MAC de origem, MAC de destino, tipo do conteúdo e FCS</td><td>Ethernet, Wi-Fi</td></tr>\n      <tr><td>Física</td><td>Bits</td><td>Nada: transforma o quadro em sinal</td><td>Cobre, fibra ou rádio</td></tr>\n    </tbody>\n  </table></div>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Chamar toda PDU de pacote.</strong> O diagnóstico passa a misturar quadro, pacote e segmento. Use “pacote” só para a camada de rede e “PDU” como termo genérico.</li>\n      <li><strong>Confundir encapsular com cifrar.</strong> Encapsular acrescenta contexto; cifrar esconde conteúdo. Num site com https, o TLS cifra só os dados da aplicação: os cabeçalhos TCP, IP e Ethernet que vêm por fora continuam legíveis, porque os equipamentos do caminho precisam deles. Quem observa o caminho vê IPs, portas e tamanhos, mas não o conteúdo.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Acompanhe seu notebook (IP 192.168.1.20, gateway 192.168.1.1) enviando uma requisição a um site em 203.0.113.10, com o nome já resolvido e a conexão já aberta:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Aplicação:</strong> o navegador cria a requisição HTTP. São os <strong>dados</strong>.</li>\n    <li><strong>Transporte:</strong> o TCP acrescenta um cabeçalho com a porta de origem, temporária (ex.: 51514), a porta de destino 443, o número de sequência e um checksum. Agora é um <strong>segmento</strong>.</li>\n    <li><strong>Rede:</strong> o IP acrescenta a origem 192.168.1.20, o destino 203.0.113.10, o TTL (um contador que cada roteador diminui, para o pacote não circular para sempre) e o número do protocolo de dentro (6 = TCP). Agora é um <strong>pacote</strong>.</li>\n    <li><strong>Enlace:</strong> a placa acrescenta o MAC dela como origem e, como destino, o MAC do gateway, porque o site está fora da sua rede. Acrescenta também o tipo do conteúdo (EtherType 0x0800 = IPv4) e, no fim, o FCS. Agora é um <strong>quadro</strong>.</li>\n    <li><strong>Física:</strong> o quadro vira bits e os bits viram sinal elétrico, luz ou rádio.</li>\n  </ol>\n  <p>No servidor, o desencapsulamento usa os próprios cabeçalhos para saber o que vem dentro: a placa confere o FCS e lê o EtherType 0x0800 (é IPv4); o IP confere que o destino é ele e lê o protocolo 6 (é TCP); o TCP lê a porta 443 e entrega os dados ao programa que atende nela. A aplicação recebe só a requisição, sem nenhum cabeçalho.</p>\n\n  <h3>Quanto espaço os envelopes ocupam: MTU</h3>\n  <p>Cada enlace aceita um tamanho máximo de pacote, a <strong>MTU</strong> (Maximum Transmission Unit): 1500 bytes na Ethernet comum, contados a partir do cabeçalho IP. Tudo o que as camadas acrescentam sai desse espaço:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Parte</th><th>Bytes</th></tr></thead>\n    <tbody>\n      <tr><td>Cabeçalho Ethernet + FCS</td><td>14 + 4 (fora da MTU)</td></tr>\n      <tr><td>Cabeçalho IPv4 sem opções</td><td>20 (IPv6: 40)</td></tr>\n      <tr><td>Cabeçalho TCP sem opções</td><td>20 (UDP: 8)</td></tr>\n      <tr><td>Dados que cabem num pacote cheio, com IPv4 e TCP</td><td>1500 − 20 − 20 = 1460</td></tr>\n    </tbody>\n  </table></div>\n  <p>Esse limite de 1460 bytes de dados por segmento tem nome, <strong>MSS</strong> (Maximum Segment Size), e volta na aula 6.4.</p>\n  <p><strong>Túneis somam envelopes.</strong> Uma VPN pega o pacote inteiro (cabeçalho IP, cabeçalho TCP e dados), em geral o cifra, e o põe dentro de outro pacote, com cabeçalhos novos. Num túnel GRE, um dos tipos mais simples, são 24 bytes a mais (um cabeçalho IPv4 externo de 20 e o GRE de 4): sobre um enlace de 1500, o pacote de dentro só pode ter 1476. Pacotes pequenos cabem com folga; os grandes, como os de um upload, não.</p>\n  <p>Quando um pacote não cabe, o roteador o divide em pedaços (fragmentação) ou, se ele vem marcado para não ser dividido, o descarta e avisa a origem com uma mensagem ICMP, para ela mandar pacotes menores. Esse mecanismo é o <strong>Path MTU Discovery (PMTUD)</strong>. Se um firewall do caminho bloqueia esse ICMP, a origem nunca fica sabendo: o login e as páginas pequenas passam, e o upload trava.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>O encapsulamento não acontece só na origem: ele se refaz a cada salto. O notebook monta todos os envelopes e entrega o quadro ao gateway. O roteador abre o quadro, lê o pacote IP, escolhe o próximo salto, diminui o TTL em 1 e monta um <strong>quadro novo</strong> para o enlace seguinte, com os MACs desse enlace. Resultado: os MACs mudam a cada salto, e os IPs de origem e destino seguem iguais de ponta a ponta (exceto quando há NAT).</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Equipamento</th><th>O que lê</th><th>O que decide ou faz</th></tr></thead>\n    <tbody>\n      <tr><td>Switch</td><td>Quadro (MAC)</td><td>Por qual porta sai o quadro, dentro da LAN</td></tr>\n      <tr><td>Roteador</td><td>Pacote (IP)</td><td>Qual é o próximo salto; monta um quadro novo a cada enlace</td></tr>\n      <tr><td>Firewall</td><td>IP, porta e estado da conexão; alguns também a aplicação</td><td>Permite ou bloqueia o fluxo</td></tr>\n    </tbody>\n  </table></div>\n  <p>Por isso equipamentos e ferramentas diferentes enxergam partes diferentes da mesma comunicação: o roteador encaminha sem entender a página, e o switch, sem olhar o IP.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense numa carta: o texto vai num envelope com o destinatário, o envelope vai num malote e o malote vai num caminhão. Cada pessoa no caminho lê só a sua etiqueta, e quem recebe abre tudo na ordem inversa e lê só a carta. Na rede, a diferença é que cada roteador troca o “caminhão” (o quadro) a cada trecho e mantém o envelope (o pacote).</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>No mesmo notebook, você roda <code>nslookup example.com 8.8.8.8</code> com o Wireshark capturando. Ao clicar no pacote da consulta, o Wireshark mostra o desencapsulamento de fora para dentro, uma linha por camada (resumido):</p>\n  <pre class=\"code-block\">Frame 1: 71 bytes on wire\nEthernet II, Src: (MAC do notebook), Dst: (MAC do gateway 192.168.1.1)\nInternet Protocol Version 4, Src: 192.168.1.20, Dst: 8.8.8.8\nUser Datagram Protocol, Src Port: 53124, Dst Port: 53\nDomain Name System (query)</pre>\n  <p>Leia cada linha como uma PDU: <code>Frame</code> é o que a placa capturou; <code>Ethernet II</code> é o quadro, com destino no gateway, e não no 8.8.8.8, porque o servidor está fora da sua rede; <code>Internet Protocol Version 4</code> é o pacote, com o destino final; <code>User Datagram Protocol</code> é o datagrama, que aponta a porta 53 do DNS; e <code>Domain Name System</code> são os dados.</p>\n  <p>Some os bytes: 14 do cabeçalho Ethernet + 20 do IPv4 + 8 do UDP + 29 da consulta = 71 (a captura normalmente não mostra os 4 bytes do FCS). Numa mensagem pequena como essa, 42 dos 71 bytes são envelope.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"m02l02-title m02l02-desc\">\n    <title id=\"m02l02-title\">Encapsulamento e desencapsulamento no Modelo OSI</title>\n    <desc id=\"m02l02-desc\">Cliente encapsula dados em segmento, pacote, quadro e bits; servidor desencapsula na ordem inversa.</desc>\n    <defs>\n      <marker id=\"m02l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"40\" y=\"40\" width=\"250\" height=\"420\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"165\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Origem: encapsula</text>\n\n    <rect x=\"670\" y=\"40\" width=\"250\" height=\"420\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"795\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Destino: desencapsula</text>\n\n    <rect x=\"90\" y=\"105\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--client\" />\n    <text x=\"165\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dados</text>\n\n    <rect x=\"90\" y=\"170\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"165\" y=\"199\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Segmento TCP/UDP</text>\n\n    <rect x=\"90\" y=\"235\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--router\" />\n    <text x=\"165\" y=\"264\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Pacote IP</text>\n\n    <rect x=\"90\" y=\"300\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--switch\" />\n    <text x=\"165\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quadro Ethernet</text>\n\n    <rect x=\"90\" y=\"365\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"165\" y=\"394\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Bits / Sinais</text>\n\n    <line x1=\"165\" y1=\"151\" x2=\"165\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"165\" y1=\"216\" x2=\"165\" y2=\"235\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"165\" y1=\"281\" x2=\"165\" y2=\"300\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"165\" y1=\"346\" x2=\"165\" y2=\"365\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n\n    <rect x=\"355\" y=\"210\" width=\"250\" height=\"100\" rx=\"18\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"480\" y=\"245\" text-anchor=\"middle\" class=\"svg-label\">Rede</text>\n    <text x=\"480\" y=\"276\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Switches, roteadores, firewalls</text>\n\n    <line x1=\"240\" y1=\"388\" x2=\"355\" y2=\"280\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"605\" y1=\"280\" x2=\"720\" y2=\"388\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n\n    <rect x=\"720\" y=\"365\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"795\" y=\"394\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Bits / Sinais</text>\n\n    <rect x=\"720\" y=\"300\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--switch\" />\n    <text x=\"795\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quadro Ethernet</text>\n\n    <rect x=\"720\" y=\"235\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--router\" />\n    <text x=\"795\" y=\"264\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Pacote IP</text>\n\n    <rect x=\"720\" y=\"170\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"795\" y=\"199\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Segmento TCP/UDP</text>\n\n    <rect x=\"720\" y=\"105\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"795\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dados</text>\n\n    <line x1=\"795\" y1=\"365\" x2=\"795\" y2=\"346\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"795\" y1=\"300\" x2=\"795\" y2=\"281\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"795\" y1=\"235\" x2=\"795\" y2=\"216\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"795\" y1=\"170\" x2=\"795\" y2=\"151\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n\n    <text x=\"480\" y=\"360\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">PDU muda conforme a camada: dados → segmento → pacote → quadro → bits</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> cada camada acrescenta seu cabeçalho ao que vem de cima; no destino, cada uma lê o seu e o remove.</li>\n    <li>PDUs: dados, segmento (TCP) ou datagrama (UDP), pacote, quadro e bits.</li>\n    <li>O roteador lê o pacote e monta um quadro novo a cada salto: o MAC muda, o IP fica.</li>\n    <li>Com MTU 1500, sobram 1460 bytes de dados num segmento TCP sobre IPv4.</li>\n    <li>Túneis somam cabeçalhos: pacotes grandes deixam de caber; os pequenos passam.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 2.3, “Camada 1 — Física: bits no fio, luz e rádio”, você vê como os bits do fim da pilha viram sinais no cobre, na fibra e no rádio, e quais limites cada meio impõe.</p>\n</section>\n"
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
      "TLS",
      "IPsec",
      "VXLAN"
    ],
    "dependsOn": [
      "Modelo OSI",
      "protocolo",
      "bits e bytes",
      "topologia",
      "equipamentos de rede",
      "diagnóstico inicial"
    ],
    "enables": [
      "Wireshark",
      "tcpdump",
      "análise de firewall",
      "MTU",
      "MSS",
      "fragmentação",
      "VPN",
      "cloud networking",
      "Kubernetes networking"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que o roteador monta um quadro novo a cada salto, em vez de repassar o quadro que recebeu? Pense num caminho em que o primeiro trecho é Wi-Fi e o segundo é a fibra da operadora.",
      "hints": [
        "Para quem o MAC de destino do quadro original aponta?",
        "Os dois trechos usam a mesma tecnologia de enlace?"
      ],
      "expectedIdeas": [
        "o MAC só vale no enlace local",
        "cada enlace tem sua tecnologia e seus endereços",
        "o IP basta para o caminho todo"
      ],
      "explanation": "O quadro só leva os dados ao próximo equipamento do mesmo enlace. No trecho seguinte, os endereços e às vezes a tecnologia são outros; o roteador guarda o pacote e o põe num quadro feito para aquele enlace."
    },
    {
      "type": "aplicação",
      "question": "Um colega propõe resolver os uploads que travam na VPN aumentando a MTU do notebook para 9000 bytes. Por que isso não ajuda?",
      "hints": [
        "Onde está o limite: no notebook ou no caminho?",
        "O pacote de dentro do túnel precisa caber em quê?"
      ],
      "expectedIdeas": [
        "o limite é a MTU do caminho e do túnel",
        "pacotes maiores cabem ainda menos",
        "a solução é reduzir o tamanho, não aumentar"
      ],
      "explanation": "O limite está no caminho: o pacote de dentro mais o envelope do túnel precisam caber em 1500 bytes. Pacotes de 9000 cabem menos ainda. O ajuste é o contrário: pacotes menores dentro do túnel."
    }
  ],
  "quiz": [
    {
      "id": "q2.2.1",
      "question": "O que é encapsulamento em redes?",
      "options": [
        "Remover cabeçalhos no destino para entregar os dados à aplicação",
        "Adicionar informações de camada aos dados recebidos da camada superior",
        "Criptografar o tráfego para que ninguém leia o conteúdo",
        "Dividir os dados em pedaços menores para caberem na MTU"
      ],
      "answer": 1,
      "explanation": "Encapsular é acrescentar cabeçalhos (e às vezes trailers) para a camada inferior tratar os dados. Remover cabeçalhos no destino é desencapsulamento; cifrar é criptografia; dividir por tamanho é segmentação ou fragmentação.",
      "topic": "encapsulamento",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.2.2",
      "question": "Qual associação está mais correta?",
      "options": [
        "Segmento = camada de rede",
        "Pacote = camada de transporte",
        "Quadro = camada de enlace",
        "Datagrama UDP = camada de enlace"
      ],
      "answer": 2,
      "explanation": "Quadro é a PDU da camada 2 (ex.: Ethernet). Pacote é da camada de rede; segmento TCP e datagrama UDP são da camada de transporte.",
      "topic": "pdu",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q2.2.3",
      "question": "Um acesso via VPN funciona para páginas pequenas, mas falha em uploads grandes. Qual hipótese deve ser considerada?",
      "options": [
        "Overhead do túnel e MTU efetiva menor",
        "DNS resolvendo o portal para o IP errado",
        "Credencial da VPN expirada",
        "Porta 443 bloqueada no firewall"
      ],
      "answer": 0,
      "explanation": "Se páginas pequenas carregam, DNS, credencial e porta 443 funcionam. A VPN acrescenta cabeçalhos e reduz a MTU efetiva: pacotes grandes passam a ser fragmentados ou descartados.",
      "topic": "mtu",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.2.5",
      "question": "Em tráfego para um servidor fora da LAN, o endereço MAC de destino do quadro local normalmente é de quem?",
      "options": [
        "Do servidor final na internet",
        "Do gateway local",
        "Do switch de acesso",
        "Do servidor DNS configurado"
      ],
      "answer": 1,
      "explanation": "O quadro é entregue ao próximo salto local, que para destinos fora da LAN é o gateway. O IP de destino continua sendo o do servidor final; o switch encaminha o quadro, mas não é o destinatário.",
      "topic": "ethernet",
      "difficulty": "intermediário",
      "type": "arquitetura"
    },
    {
      "id": "q2.2.8",
      "question": "Você acessa um site com https. Alguém captura o tráfego num cabo entre o seu notebook e o servidor. O que essa pessoa consegue ler?",
      "options": [
        "Nada: o TLS cifra todos os cabeçalhos e os dados",
        "O conteúdo da requisição, mas não os IPs",
        "Só os bits, sem nenhuma informação de camada",
        "Os IPs, as portas e os tamanhos, mas não o conteúdo da requisição"
      ],
      "answer": 3,
      "explanation": "O TLS cifra os dados da aplicação. Os cabeçalhos TCP, IP e Ethernet ficam por fora e continuam legíveis, porque os equipamentos do caminho precisam deles para entregar o tráfego.",
      "topic": "encapsulamento e criptografia",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q2.2.9",
      "question": "Um pacote sai do seu notebook e passa por dois roteadores até o servidor, sem NAT no caminho. O que muda a cada salto?",
      "options": [
        "Os MACs do quadro e o TTL; os IPs de origem e destino continuam os mesmos",
        "O IP de destino, que passa a ser o do próximo roteador",
        "Nada: o quadro que saiu do notebook chega intacto ao servidor",
        "A porta de destino, que cada roteador troca pela sua"
      ],
      "answer": 0,
      "explanation": "Cada roteador lê o pacote, diminui o TTL e monta um quadro novo, com os MACs do enlace seguinte. Os IPs indicam a origem e o destino final e não mudam; as portas estão no segmento, que o roteador não altera.",
      "topic": "encapsulamento por salto",
      "difficulty": "iniciante",
      "type": "arquitetura"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.2.1",
      "front": "O que é PDU?",
      "back": "Protocol Data Unit: unidade de dados tratada por uma camada específica.",
      "tags": [
        "osi",
        "pdu"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.2.2",
      "front": "Qual PDU costuma ser associada à camada 2?",
      "back": "Quadro, como um quadro Ethernet.",
      "tags": [
        "ethernet",
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.2.3",
      "front": "Qual PDU costuma ser associada à camada 3?",
      "back": "Pacote, como um pacote IPv4 ou IPv6.",
      "tags": [
        "ip",
        "camada 3"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.2.4",
      "front": "Por que uma VPN reduz o tamanho útil dos pacotes?",
      "back": "Porque põe o pacote inteiro dentro de outro, com cabeçalhos extras. Num túnel GRE sobre um enlace de 1500 bytes, o pacote de dentro só pode ter 1476.",
      "tags": [
        "vpn",
        "mtu"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.2.7",
      "front": "O que é MSS e quanto vale com MTU 1500?",
      "back": "Maximum Segment Size: o maior volume de dados TCP por segmento. Com MTU 1500 e cabeçalhos IPv4 e TCP sem opções: 1500 − 20 − 20 = 1460 bytes.",
      "tags": [
        "tcp",
        "mtu"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.2.8",
      "front": "O que muda e o que fica quando o pacote passa por um roteador?",
      "back": "Mudam os MACs (o roteador monta um quadro novo para o enlace seguinte) e o TTL, que diminui 1. Os IPs de origem e destino ficam, exceto com NAT.",
      "tags": [
        "roteador",
        "encapsulamento"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.2.9",
      "front": "Como o destino sabe que um quadro Ethernet carrega IPv4 e que o pacote carrega TCP?",
      "back": "Pelos próprios cabeçalhos: o EtherType 0x0800 indica IPv4, e o campo de protocolo 6 no IP indica TCP. Cada cabeçalho diz o que vem dentro.",
      "tags": [
        "desencapsulamento",
        "ethernet",
        "ip"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex2.2.6",
      "type": "cálculo",
      "prompt": "O navegador envia uma requisição HTTP de 400 bytes por TCP sobre IPv4, numa rede Ethernet, sem opções nos cabeçalhos. Quantos bytes tem o quadro, contando o FCS? Quantos desses bytes são envelope?",
      "expectedAnswer": "400 + 20 (TCP) + 20 (IPv4) + 14 (Ethernet) + 4 (FCS) = 458 bytes. O envelope são 58 bytes, cerca de 13% do quadro.",
      "explanation": "O exercício aplica a tabela de cabeçalhos a uma mensagem concreta. Quanto menor a mensagem, maior a fração de envelope."
    },
    {
      "id": "ex2.2.7",
      "type": "diagnóstico",
      "prompt": "No seu notebook (192.168.1.20, gateway 192.168.1.1), você captura a resposta que o servidor 203.0.113.10 mandou à sua requisição. Quais IPs e quais MACs de origem e de destino você espera ver nesse quadro?",
      "expectedAnswer": "IP de origem 203.0.113.10 e IP de destino 192.168.1.20. MAC de origem: o do gateway (foi ele que montou o último quadro). MAC de destino: o do notebook.",
      "explanation": "Na volta, o último salto é o gateway, então o quadro que chega ao notebook vem do MAC dele, mesmo que o IP de origem seja o do servidor."
    },
    {
      "id": "ex2.2.3",
      "type": "diagnóstico",
      "prompt": "Um firewall L4 libera TCP 443, mas a aplicação retorna HTTP 403. O problema está necessariamente na rede?",
      "expectedAnswer": "Não. TCP 443 pode estar liberado, mas HTTP 403 indica resposta de aplicação/autorização/política em camada superior.",
      "explanation": "Porta aberta não garante autorização ou sucesso da aplicação."
    }
  ],
  "challenge": {
    "title": "O que a captura mostra quando a VPN está ligada",
    "scenario": "Em casa, com a VPN da empresa ligada, você abre o sistema interno em 10.2.30.40, porta 443, e captura o tráfego na placa Wi-Fi do notebook. Para sua surpresa, o endereço 10.2.30.40 não aparece em nenhum pacote: só há pacotes UDP entre o seu notebook e o servidor da VPN, 198.51.100.20.",
    "tasks": [
      "Explicar por que 10.2.30.40 não aparece na captura.",
      "Listar os envelopes de um pacote da sua requisição, de fora para dentro.",
      "Dizer o que o provedor de internet consegue ver desse tráfego.",
      "Explicar por que o pacote de dentro não pode ter 1500 bytes."
    ],
    "expectedDeliverables": [
      "Uma explicação de 5 a 8 linhas, com a lista de envelopes."
    ]
  },
  "commentedSolution": {
    "reasoning": "Um túnel põe o pacote inteiro, com seus cabeçalhos, dentro de outro pacote. A placa Wi-Fi só enxerga o envelope de fora.",
    "steps": [
      "O pacote para 10.2.30.40 é cifrado pela VPN e vira os dados de um datagrama UDP entre o notebook e 198.51.100.20; por isso só esse par de IPs aparece.",
      "De fora para dentro: quadro Wi-Fi (notebook → gateway), pacote IP externo (notebook → 198.51.100.20), datagrama UDP, cabeçalho da VPN e, cifrados, o pacote IP interno (→ 10.2.30.40), o segmento TCP para a porta 443 e os dados.",
      "O provedor vê só o envelope de fora: que você fala com o servidor da VPN, por UDP, com certos tamanhos e horários.",
      "O pacote de dentro mais os cabeçalhos externos precisam caber nos 1500 bytes do caminho: é a conta do GRE (1500 − 24 = 1476), com um envelope maior."
    ],
    "commonMistakes": [
      "Achar que a requisição não saiu: ela está dentro dos pacotes UDP.",
      "Achar que a VPN esconde tudo: o envelope de fora continua visível."
    ],
    "finalAnswer": "A requisição viaja cifrada dentro de pacotes UDP para o servidor da VPN, e a placa Wi-Fi só vê esse envelope. Os cabeçalhos extras consomem parte dos 1500 bytes, por isso o pacote de dentro precisa ser menor."
  },
  "glossary": [
    {
      "term": "VPN",
      "shortDefinition": "Rede privada virtual: um túnel, em geral cifrado, que leva pacotes de uma rede privada por dentro de outra rede, como a internet.",
      "example": "Em casa, a VPN da empresa leva seus pacotes para o sistema interno dentro de pacotes enviados ao servidor da VPN.",
      "relatedLessons": [
        "10.1",
        "10.2"
      ]
    },
    {
      "term": "TLS",
      "shortDefinition": "Protocolo que cifra os dados da aplicação entre o programa e o servidor; é o que faz o https.",
      "example": "Com https, o conteúdo da requisição é cifrado, mas os cabeçalhos TCP e IP continuam legíveis.",
      "relatedLessons": [
        "8.3"
      ]
    },
    {
      "term": "ICMP",
      "shortDefinition": "Protocolo de mensagens de controle e erro do IP; é o que o ping usa.",
      "example": "Um roteador manda à origem uma mensagem ICMP quando um pacote grande demais não pode ser dividido.",
      "relatedLessons": [
        "4.8"
      ]
    },
    {
      "term": "NAT",
      "shortDefinition": "Tradução de endereços: o roteador troca o IP de origem (ou de destino) dos pacotes, como o roteador de casa faz com os IPs privados.",
      "example": "O pacote sai do notebook com origem 192.168.1.20 e chega à internet com o IP público do roteador.",
      "relatedLessons": [
        "6.7",
        "9.5"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base conceitual do Modelo OSI."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.4",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base sobre bit, byte, throughput e overhead."
    },
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Referência conceitual para quadros Ethernet e camada de enlace."
    },
    {
      "type": "rfc",
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Referência para o cabeçalho IPv4, TTL e o bit DF."
    },
    {
      "type": "rfc",
      "title": "RFC 1191 — Path MTU Discovery",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc1191",
      "note": "Como a origem descobre a MTU do caminho usando o ICMP Fragmentation Needed."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes Networking",
      "lesson": "CNI, Services e Ingress",
      "reason": "Kubernetes usa encapsulamento, overlays e políticas de rede que dependem deste conceito."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Federação e protocolos de identidade",
      "lesson": "OIDC/SAML sobre HTTP/TLS",
      "reason": "Protocolos de identidade trafegam dentro de camadas de transporte, segurança e aplicação."
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
      "2.3"
    ]
  }
};
