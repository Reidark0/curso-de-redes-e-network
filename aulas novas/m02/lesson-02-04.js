export const lesson0204 = {
  "id": "2.4",
  "moduleId": "m02",
  "order": 4,
  "title": "Camada 2 — Enlace: frames, MAC, switch, VLAN e ARP",
  "subtitle": "Como bits viram quadros e são entregues dentro da LAN por MAC, switches, VLANs e ARP.",
  "duration": "15-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 205,
  "tags": [
    "redes",
    "modelo osi",
    "camada 2",
    "ethernet",
    "frame",
    "mac",
    "switch",
    "vlan",
    "arp",
    "lan",
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
      "reason": "A aula 2.2 explicou encapsulamento e PDUs, incluindo o quadro como PDU de Camada 2."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.3",
      "reason": "A aula 2.3 mostrou que bits precisam atravessar cobre, fibra ou rádio antes de serem organizados em quadros."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.7",
      "reason": "A aula 1.7 apresentou switch, AP, firewall e outros equipamentos de rede."
    }
  ],
  "objectives": [
    "Explicar o papel da Camada 2: organizar bits em quadros e entregá-los dentro da rede local por endereço MAC, sem rotear entre redes.",
    "Descrever como o switch aprende endereços MAC e encaminha quadros (unicast ou flooding) e por que a VLAN limita o broadcast a um domínio.",
    "Explicar como o ARP descobre o MAC do destino local ou do gateway e ler a tabela ARP (arp -a, ip neigh) para reconhecer uma falha de entrega local."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Você leva o notebook para outra sala do escritório e liga o cabo na tomada da parede. O ícone mostra rede conectada, o notebook recebe um endereço IP e até abre sites da internet. Mas o sistema interno da empresa não abre, e o endereço recebido começa com 10.40, enquanto o de todo mundo da sua equipe começa com 192.168.10. Alguém sugere trocar o DNS; outro culpa o firewall.</p>\n  <p>Nenhum dos dois. A porta do switch ligada àquela tomada está configurada na rede de visitantes. O cabo funciona e o switch entrega os quadros, mas dentro do grupo errado, onde outro servidor distribui os endereços e outro gateway leva só à internet. Sem entender a Camada 2, você gasta horas nas camadas de cima. Em suporte, redes e segurança, conferir a entrega local antes de tudo é o primeiro filtro de quase todo chamado.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando os bits chegam ao switch, mas a entrega dentro da rede local segue regras que você não enxerga. A Camada 1 (aula 2.3) só transmite bits: ela não sabe onde começa e termina uma mensagem, quem é o destinatário na rede local, por qual porta do switch a mensagem deve sair nem quais aparelhos devem ficar separados.</p>\n  <p>A Camada 2, ou Enlace, resolve essa entrega local. Ela organiza os bits em quadros, identifica origem e destino por endereço MAC, deixa o switch escolher a porta certa e separa grupos de aparelhos com VLANs. Quando o host só conhece o IP do destino, o ARP descobre o MAC correspondente. Nas primeiras redes, o hub repetia cada quadro em todas as portas; o switch passou a aprender onde está cada MAC e a enviar o quadro só para lá.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> a Camada 2 organiza bits em quadros (frames) e entrega esses quadros entre interfaces da mesma rede local, usando endereços MAC.</div>\n  <p>O <strong>endereço MAC</strong> tem 48 bits, escritos como 6 bytes em hexadecimal, por exemplo <code>AA:BB:CC:DD:EE:FF</code>. Ele identifica a placa de rede (NIC) e só tem sentido dentro da rede local. O endereço <code>FF:FF:FF:FF:FF:FF</code> é o <strong>broadcast</strong>: um quadro enviado para ele chega a todas as interfaces do mesmo <strong>domínio de broadcast</strong>.</p>\n  <p>O <strong>switch</strong> lê o MAC de destino de cada quadro e o entrega só na porta onde esse MAC está; o Funcionamento interno mostra como ele aprende isso. Uma <strong>VLAN</strong> divide o switch em redes locais separadas: por exemplo, usuários na VLAN 10 e visitantes na VLAN 40. Cada VLAN é um domínio de broadcast próprio: um quadro de uma VLAN nunca é entregue nas portas de outra. Uma porta de acesso (access) pertence a uma única VLAN; entre switches, uma porta trunk leva várias VLANs no mesmo cabo, marcando cada quadro com o número da VLAN (aula 3.7).</p>\n  <p>A Camada 2 não roteia. Para alcançar outra rede, inclusive outra VLAN, o quadro vai para o <strong>gateway</strong>, em geral um por VLAN, que encaminha o pacote pela Camada 3 (aula 2.5).</p>\n  <p>O <strong>ARP</strong> (Address Resolution Protocol) liga os dois endereços no IPv4. O host sabe o IP com que quer falar, mas, para montar o quadro, precisa do MAC. O ARP pergunta por broadcast \"quem tem este IP?\", e o dono do IP responde com o seu MAC.</p>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Confundir MAC com IP:</strong> o MAC serve à entrega do quadro dentro da rede local; o IP, ao endereçamento lógico e ao roteamento entre redes.</li>\n      <li><strong>Achar que VLAN é firewall:</strong> a VLAN separa domínios de broadcast, mas, se o gateway rotear livremente entre VLANs, o acesso acontece. Quem filtra é o firewall ou a ACL (lista de regras de acesso) no ponto de roteamento.</li>\n      <li><strong>Culpar o DNS quando o host não alcança o gateway:</strong> sem resposta de ARP, nenhum quadro sai da rede local; confira IP, máscara, gateway, tabela ARP e a VLAN da porta primeiro.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <h3>Campos principais do quadro Ethernet</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>Tamanho</th><th>Para que serve</th></tr></thead><tbody>\n    <tr><td>MAC de destino</td><td>48 bits</td><td>Indica o destinatário local do quadro.</td></tr>\n    <tr><td>MAC de origem</td><td>48 bits</td><td>Indica a interface que enviou o quadro. É por ele que o switch aprende onde cada aparelho está.</td></tr>\n    <tr><td>EtherType</td><td>16 bits</td><td>Indica o protocolo que vai dentro do quadro: <code>0x0800</code> = IPv4, <code>0x0806</code> = ARP.</td></tr>\n    <tr><td>Payload</td><td>variável</td><td>Carrega a PDU da camada de cima, por exemplo o pacote IPv4 (aula 2.2).</td></tr>\n    <tr><td>FCS</td><td>32 bits</td><td>Detecta erro no quadro: o receptor descarta o quadro com FCS inválido e conta um erro CRC (aula 2.3).</td></tr>\n  </tbody></table></div>\n  <h3>Do IP ao quadro entregue</h3>\n  <ol class=\"flow-list\">\n    <li>O host compara o IP de destino com o seu IP e máscara: o destino está na rede local ou fora dela?</li>\n    <li>Se for local, precisa do MAC do destino; se for remoto, do MAC do gateway. Primeiro procura na sua tabela ARP.</li>\n    <li>Se não conhece o MAC, envia um ARP Request para <code>FF:FF:FF:FF:FF:FF</code>, que alcança toda a VLAN: \"quem tem o IP X?\".</li>\n    <li>Só o dono do IP (o destino ou o gateway) responde, com um ARP Reply contendo o seu MAC. O host guarda a associação IP → MAC na tabela ARP.</li>\n    <li>O host monta o quadro: MAC de destino, MAC de origem, EtherType, payload e FCS.</li>\n    <li>O switch recebe o quadro e anota na tabela MAC: \"este MAC de origem está nesta porta\".</li>\n    <li>Se o MAC de destino está na tabela, o switch envia o quadro só pela porta dele (unicast). Se não está, faz <strong>flooding</strong>: copia o quadro para todas as outras portas da mesma VLAN, nunca para outras VLANs. Quando o destino responder, o switch aprende onde ele está.</li>\n    <li>O destino confere o FCS e o MAC de destino e passa o payload para a camada de cima.</li>\n  </ol>\n  <p>Se uma etapa falha, as seguintes nem acontecem. Com a máscara errada, o host faz ARP para um destino que deveria ir ao gateway. Com o host e o gateway em VLANs diferentes, o ARP Request não chega ao gateway e ninguém responde. Nos dois casos, DNS e aplicação podem estar perfeitos e mesmo assim nada funciona.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense na recepção de um prédio comercial. A Camada 1 é o corredor; a Camada 2 é a recepção, que entrega cada envelope na mesa certa dentro do prédio, e o MAC é a identificação da mesa. As VLANs são andares separados: usam o mesmo prédio, mas a correspondência de um andar não é distribuída no outro.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu notebook (192.168.0.15/24) acessa um site. Como o site está fora da rede 192.168.0.0/24, o quadro sai com o MAC de destino do roteador de casa (o gateway 192.168.0.1), e não com o do servidor do site. Se o notebook ainda não conhece esse MAC, faz ARP. Depois de um <code>ping 192.168.0.1</code>, a tabela ARP no Linux mostra algo como (valores ilustrativos):</p>\n  <pre class=\"code-block\">$ ip neigh\n192.168.0.1 dev wlan0 lladdr a4:2b:b0:12:34:56 REACHABLE</pre>\n  <p>Leitura: o IP do gateway está associado a um MAC (<code>lladdr</code>), e a entrada foi confirmada há pouco (REACHABLE; STALE indica uma entrada ainda guardada, mas não confirmada há algum tempo). No Windows, <code>arp -a</code> mostra a mesma associação. Se aparecer <code>FAILED</code>, sem <code>lladdr</code>, o ARP não teve resposta: o problema está na entrega local (Wi-Fi, cabo, VLAN ou o próprio gateway), mesmo que pareça \"internet fora do ar\".</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m02l04-title m02l04-desc\">\n    <title id=\"m02l04-title\">Camada 2: ARP, switch, tabela MAC e VLAN</title>\n    <desc id=\"m02l04-desc\">Dois hosts da mesma VLAN ligados a um switch. O Host A pergunta por broadcast, com ARP, quem tem o IP do Host B; o switch aprende em que porta está cada MAC e passa a entregar os quadros por unicast. Broadcast e flooding ficam dentro da VLAN; para sair dela, o quadro vai ao gateway.</desc>\n    <defs>\n      <marker id=\"m02l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"40\" width=\"920\" height=\"420\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"76\" text-anchor=\"middle\" class=\"svg-label\">VLAN 10 (192.168.10.0/24): um domínio de broadcast</text>\n\n    <rect x=\"70\" y=\"140\" width=\"150\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"145\" y=\"174\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n    <text x=\"145\" y=\"198\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.10</text>\n    <text x=\"145\" y=\"216\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC AA:AA</text>\n\n    <rect x=\"390\" y=\"122\" width=\"200\" height=\"120\" rx=\"16\" class=\"svg-node svg-node--switch\" />\n    <text x=\"490\" y=\"156\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"490\" y=\"182\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Aprende MAC por porta</text>\n    <text x=\"490\" y=\"205\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Encaminha quadros</text>\n    <text x=\"490\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Separa VLANs</text>\n\n    <rect x=\"760\" y=\"140\" width=\"150\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"835\" y=\"174\" text-anchor=\"middle\" class=\"svg-label\">Host B</text>\n    <text x=\"835\" y=\"198\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.20</text>\n    <text x=\"835\" y=\"216\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC BB:BB</text>\n\n    <line x1=\"220\" y1=\"180\" x2=\"390\" y2=\"180\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n    <line x1=\"590\" y1=\"180\" x2=\"760\" y2=\"180\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n    <text x=\"305\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quadro Ethernet</text>\n    <text x=\"675\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Unicast se o MAC é conhecido</text>\n\n    <rect x=\"95\" y=\"300\" width=\"250\" height=\"88\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"220\" y=\"329\" text-anchor=\"middle\" class=\"svg-label\">ARP Request</text>\n    <text x=\"220\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quem tem 192.168.10.20?</text>\n    <text x=\"220\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Broadcast dentro da VLAN</text>\n\n    <rect x=\"635\" y=\"300\" width=\"250\" height=\"88\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"760\" y=\"329\" text-anchor=\"middle\" class=\"svg-label\">Tabela MAC</text>\n    <text x=\"760\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">AA:AA → porta 1</text>\n    <text x=\"760\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BB:BB → porta 2</text>\n\n    <path d=\"M220 300 C260 260 350 248 430 238\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n    <path d=\"M590 238 C650 250 710 270 760 300\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l04-arrow)\" />\n\n    <text x=\"490\" y=\"430\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Broadcast (ARP) e flooding não saem da VLAN 10; para outra rede, o quadro vai ao gateway.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> a Camada 2 entrega quadros na rede local: o ARP descobre o MAC, o switch escolhe a porta e a VLAN limita o alcance.</li>\n    <li>O MAC (48 bits) identifica a interface só na rede local; o IP é da Camada 3.</li>\n    <li>O switch aprende o MAC de origem por porta; destino desconhecido vira flooding na mesma VLAN.</li>\n    <li>Destino fora da rede: o quadro leva o MAC do gateway, não o do servidor.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 2.5, Camada 3 — Rede: IP, roteamento, gateway e TTL, você verá o que acontece depois que o frame chega ao gateway: como o pacote sai da rede local e atravessa outras redes.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "Ethernet",
      "ARP",
      "802.1Q",
      "STP",
      "LLDP",
      "CDP"
    ],
    "dependsOn": [
      "Camada 1",
      "bits",
      "sinais",
      "frames",
      "encapsulamento",
      "dispositivos de rede"
    ],
    "enables": [
      "IPv4",
      "gateway padrão",
      "switching",
      "VLAN",
      "ARP",
      "segurança de LAN",
      "troubleshooting local"
    ]
  },
  "lab": {
    "id": "lab-2.4",
    "title": "Ver o ARP em ação no seu computador",
    "labType": "security",
    "objective": "Ver o seu MAC, a entrada ARP do gateway e o que acontece quando o ARP não recebe resposta.",
    "prerequisites": [
      "Um computador ligado à rede de casa ou do trabalho e um terminal. Não é preciso acesso ao switch."
    ],
    "tools": [
      "Windows: Prompt de Comando ou PowerShell",
      "Linux: terminal com o comando ip"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Ver o MAC, o IP e o gateway",
        "instruction": "Descubra o MAC da interface que está em uso, o seu IP com a máscara e o gateway. Anote o IP do gateway.",
        "command": "Windows: ipconfig /all\nLinux: ip addr && ip route",
        "expectedOutput": "Windows: Endereço Físico (o MAC), Endereço IPv4, Máscara de Sub-rede e Gateway Padrão. Linux: link/ether (o MAC), inet 192.168.0.15/24 e default via 192.168.0.1.",
        "explanation": "O gateway é o vizinho que recebe os quadros sempre que o destino está fora da rede local."
      },
      {
        "number": 2,
        "title": "Ver o ARP do gateway",
        "instruction": "Faça ping para o gateway e, em seguida, liste a tabela ARP.",
        "command": "Windows: ping <IP_DO_GATEWAY>, depois arp -a\nLinux: ping -c 3 <IP_DO_GATEWAY>, depois ip neigh",
        "expectedOutput": "Respostas do gateway e uma linha que liga o IP dele a um MAC (Linux: REACHABLE ou STALE; Windows: dinâmico).",
        "explanation": "Para enviar o ping, o computador precisou do MAC do gateway; se não o tinha, fez um ARP Request e guardou a resposta."
      },
      {
        "number": 3,
        "title": "Pingar um destino fora da rede",
        "instruction": "Faça ping para 8.8.8.8 e liste a tabela ARP de novo. Procure uma linha com 8.8.8.8.",
        "command": "Windows: ping 8.8.8.8, depois arp -a\nLinux: ping -c 3 8.8.8.8, depois ip neigh",
        "expectedOutput": "Nenhuma linha com 8.8.8.8; a do gateway continua lá.",
        "explanation": "O ARP só pergunta por endereços da rede local: os quadros para 8.8.8.8 saíram com o MAC do gateway. Mesmo que a rede bloqueie ping para a internet, a tabela fica igual."
      },
      {
        "number": 4,
        "title": "Ver um ARP sem resposta",
        "instruction": "Escolha um IP provavelmente livre na sua rede, como o final .250 (ex.: 192.168.0.250 numa rede 192.168.0.0/24), faça ping e liste a tabela ARP. Se alguém responder, escolha outro final.",
        "command": "Windows: ping 192.168.0.250, depois arp -a\nLinux: ping -c 3 192.168.0.250, depois ip neigh",
        "expectedOutput": "O ping mostra Host de destino inacessível (Destination Host Unreachable) vindo do seu próprio IP, ou só tempo esgotado. No Linux, ip neigh mostra o endereço como INCOMPLETE ou FAILED, sem MAC; no Windows, arp -a não mostra MAC para ele.",
        "explanation": "Ninguém respondeu ao ARP, então o computador nem montou o quadro do ping. É o sintoma de um host em VLAN errada tentando falar com o gateway."
      }
    ],
    "expectedResult": "Você viu o seu MAC, a associação IP → MAC do gateway criada pelo ARP, que um destino remoto não entra na tabela ARP e como fica um ARP sem resposta."
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "Um host 192.168.10.10 foi configurado por engano com máscara /16 em vez de /24 e precisa falar com 192.168.20.5, que está em outra VLAN. O que acontece na Camada 2 e por que a comunicação falha?",
      "hints": [
        "Com /16, o host considera 192.168.20.5 local ou remoto?",
        "A quem ele vai pedir o MAC, e esse pedido alcança a outra VLAN?"
      ],
      "expectedIdeas": [
        "com /16, o host acha que o destino é local",
        "ARP direto para 192.168.20.5, sem usar o gateway",
        "o broadcast não sai da VLAN e ninguém responde"
      ],
      "explanation": "Com /16, o host trata 192.168.20.5 como local e faz ARP direto para ele, sem usar o gateway. O broadcast não sai da VLAN e ninguém responde: parece falha remota, mas a causa é a máscara."
    },
    {
      "type": "aplicação",
      "question": "Um switch recém-ligado tem a tabela MAC vazia, e os hosts já se conhecem. Na mesma VLAN, A (porta 1) envia um quadro para B (porta 2), B responde e, depois, C (porta 3) envia um quadro para A. Em quais quadros houve flooding e como fica a tabela MAC?",
      "hints": [
        "O switch aprende pelo MAC de origem.",
        "Flooding só ocorre quando o MAC de destino não está na tabela."
      ],
      "expectedIdeas": [
        "só A → B sofre flooding",
        "tabela final: A porta 1, B porta 2, C porta 3"
      ],
      "explanation": "Primeiro quadro: o switch aprende A na porta 1 e, sem conhecer B, faz flooding. Resposta: aprende B na porta 2 e entrega a A por unicast. Quadro de C: aprende C na porta 3 e entrega a A por unicast. Um único flooding."
    }
  ],
  "quiz": [
    {
      "id": "q2.4.7",
      "question": "Qual campo do frame Ethernet indica se o payload carrega um pacote IPv4 ou uma mensagem ARP?",
      "options": [
        "MAC de destino",
        "EtherType",
        "FCS",
        "MAC de origem"
      ],
      "answer": 1,
      "explanation": "O EtherType (16 bits) indica o protocolo do payload. Os MACs identificam as interfaces, e o FCS só detecta erro no quadro.",
      "topic": "frame Ethernet",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.4.8",
      "question": "Seu notebook 192.168.10.10/24 envia um pacote para 8.8.8.8. Qual MAC de destino vai no frame que sai da placa de rede?",
      "options": [
        "O broadcast FF:FF:FF:FF:FF:FF, porque o destino está na internet",
        "O MAC da interface do servidor 8.8.8.8",
        "O MAC do gateway da rede 192.168.10.0/24",
        "O MAC do próprio notebook, que o switch troca pelo do destino"
      ],
      "answer": 2,
      "explanation": "8.8.8.8 está fora da rede local, então o frame vai ao gateway: o IP de destino continua 8.8.8.8, mas o MAC de destino é o do gateway, obtido por ARP. O broadcast só aparece no ARP Request.",
      "topic": "MAC vs IP",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q2.4.3",
      "question": "Um host não consegue pingar o gateway e não há entrada ARP para ele. Qual hipótese deve ser considerada cedo?",
      "options": [
        "Problema local de VLAN, porta, gateway ou enlace",
        "Servidor DNS configurado incorretamente no host",
        "Certificado TLS expirado no servidor web",
        "Firewall de borda bloqueando a saída para a internet"
      ],
      "answer": 0,
      "explanation": "Sem ARP para o gateway, o host nem entrega o frame ao primeiro salto. DNS, TLS e firewall de borda ficam depois; foque a entrega local.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.4.4",
      "question": "Por que VLAN não deve ser tratada como firewall?",
      "options": [
        "Porque VLAN só separa portas físicas e não funciona com máquinas virtuais.",
        "Porque VLAN criptografa o tráfego, e o firewall não consegue inspecioná-lo.",
        "Porque frames de uma VLAN sempre chegam às outras VLANs por flooding.",
        "Porque VLAN separa domínios de broadcast, mas a política de acesso entre segmentos exige firewall ou ACL."
      ],
      "answer": 3,
      "explanation": "A VLAN isola o domínio de broadcast; se houver roteamento permissivo entre VLANs, o acesso acontece. Quem filtra é a ACL ou o firewall no ponto de roteamento. VLAN não criptografa e o flooding não sai da VLAN.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q2.4.5",
      "question": "Um switch recebe um frame unicast para MAC desconhecido dentro de uma VLAN. O que ele tende a fazer?",
      "options": [
        "Envia o frame para todas as portas de todas as VLANs",
        "Faz flooding nas demais portas da mesma VLAN",
        "Descarta o frame até aprender o MAC de destino",
        "Encaminha o frame ao gateway para ser roteado"
      ],
      "answer": 1,
      "explanation": "Com MAC de destino desconhecido, o switch replica o frame só dentro daquela VLAN. Quando o destino responde, o switch aprende o MAC dele e passa a usar unicast.",
      "topic": "switching",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q2.4.9",
      "question": "Um switch recém-ligado recebe, na porta 3, um quadro com MAC de origem AA:AA:AA:11:11:11 e MAC de destino BB:BB:BB:22:22:22. O que ele anota na tabela MAC?",
      "options": [
        "AA:AA:AA:11:11:11 na porta 3",
        "BB:BB:BB:22:22:22 na porta 3",
        "Os dois MACs na porta 3",
        "Nada, até receber um ARP Reply"
      ],
      "answer": 0,
      "explanation": "O switch aprende só pelo MAC de origem: quem enviou o quadro está na porta por onde ele entrou. Onde está o destino ele ainda não sabe, por isso faz flooding na VLAN. O switch não depende do ARP para aprender.",
      "topic": "switching",
      "difficulty": "iniciante",
      "type": "cenário"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.4.1",
      "front": "O que é um frame Ethernet?",
      "back": "É a unidade de dados da Camada 2 usada para transportar payload localmente com MAC de origem, MAC de destino e campos de controle.",
      "tags": [
        "camada 2",
        "ethernet"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.4.2",
      "front": "Para que serve o endereço MAC?",
      "back": "Identificar uma interface na entrega local de Camada 2. Tem 48 bits, escritos em hexadecimal (ex.: AA:BB:CC:DD:EE:FF); FF:FF:FF:FF:FF:FF é o endereço de broadcast.",
      "tags": [
        "mac",
        "lan"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.4.3",
      "front": "O que um switch aprende?",
      "back": "Aprende endereços MAC de origem associados às portas por onde os frames entram.",
      "tags": [
        "switch",
        "mac table"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.4.4",
      "front": "O que é uma VLAN?",
      "back": "Uma separação lógica de Camada 2 que cria domínios de broadcast distintos na mesma infraestrutura física.",
      "tags": [
        "vlan",
        "segmentação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.4.5",
      "front": "Para que serve ARP no IPv4?",
      "back": "Para descobrir o MAC correspondente a um IP local ou ao gateway dentro da LAN.",
      "tags": [
        "arp",
        "ipv4"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.4.8",
      "front": "Num ping para um IP da sua rede local, o que indica a mensagem Host de destino inacessível vinda do seu próprio IP?",
      "back": "Que o ARP não teve resposta: o computador não descobriu o MAC do destino e nem conseguiu montar o quadro.",
      "tags": [
        "arp",
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex2.4.5",
      "type": "interpretação",
      "prompt": "Um host Linux com IP fixo 192.168.10.50/24 não pinga o gateway 192.168.10.1. Depois do ping, ip neigh mostra \"192.168.10.1 dev eth0 FAILED\". A equipe de rede consulta a tabela MAC do switch e encontra o MAC do host na porta 12, VLAN 30; pela documentação, esse ponto deveria estar na VLAN 10, a do gateway. Interprete as evidências e diga a hipótese principal e o próximo passo.",
      "expectedAnswer": "FAILED, sem MAC: o ARP para o gateway não teve resposta. O host está na VLAN 30, e o broadcast ARP não alcança o gateway da VLAN 10. Hipótese: porta 12 na VLAN errada. Próximo passo: a equipe de rede corrige a VLAN da porta numa mudança autorizada; depois, repita ping e ip neigh.",
      "explanation": "Cruzar a evidência do host (ARP) com a do switch (VLAN e porta) localiza a falha antes de suspeitar de DNS ou firewall."
    },
    {
      "id": "ex2.4.6",
      "type": "aplicação",
      "prompt": "Seu notebook tem IP 192.168.0.15/24 e gateway 192.168.0.1. Em /24, um destino é local quando os três primeiros números são iguais aos seus. Para cada destino, diga por qual IP o notebook pergunta no ARP: (a) 192.168.0.40, uma impressora; (b) 8.8.8.8; (c) 192.168.1.40; (d) 192.168.0.1.",
      "expectedAnswer": "(a) 192.168.0.40 (local); (b) 192.168.0.1 (remoto, vai ao gateway); (c) 192.168.0.1 (192.168.1.x é outra rede, apesar de parecida); (d) 192.168.0.1 (o gateway é local).",
      "explanation": "O ARP pergunta sempre pelo próximo vizinho na rede local. O item (c) mostra que a decisão vem da máscara, não da semelhança dos números."
    }
  ],
  "challenge": {
    "title": "Os primeiros quadros de um ping",
    "scenario": "O notebook N (192.168.10.10/24, MAC 3c:52:82:aa:bb:cc) está na porta 1 de um switch; o gateway G (192.168.10.1, MAC a4:2b:b0:12:34:56), na porta 8, na mesma VLAN. A tabela ARP de N e a tabela MAC do switch estão vazias. N executa ping 8.8.8.8.",
    "tasks": [
      "Liste, em ordem, os quadros que passam pelo switch até o primeiro ping chegar ao gateway, com MAC de origem, MAC de destino e EtherType.",
      "Diga o que o switch aprende em cada quadro e se o entrega por unicast ou por flooding."
    ],
    "expectedDeliverables": [
      "Uma tabela com uma linha por quadro (MACs, EtherType e ação do switch) e a tabela MAC final."
    ]
  },
  "commentedSolution": {
    "reasoning": "8.8.8.8 está fora de 192.168.10.0/24, então N precisa do MAC do gateway. Com a tabela ARP vazia, o ARP vem antes do ping.",
    "steps": [
      "Quadro 1, ARP Request: origem 3c:52:82:aa:bb:cc, destino ff:ff:ff:ff:ff:ff, EtherType 0x0806 (quem tem 192.168.10.1?). O switch aprende N na porta 1 e, como é broadcast, copia o quadro para todas as outras portas da VLAN.",
      "Quadro 2, ARP Reply: origem a4:2b:b0:12:34:56, destino 3c:52:82:aa:bb:cc, EtherType 0x0806. O switch aprende G na porta 8 e, como já conhece N, entrega só pela porta 1. N guarda 192.168.10.1 → a4:2b:b0:12:34:56.",
      "Quadro 3, ping: origem 3c:52:82:aa:bb:cc, destino a4:2b:b0:12:34:56, EtherType 0x0800, IP de destino 8.8.8.8. O switch já conhece G e entrega só pela porta 8."
    ],
    "commonMistakes": [
      "Pôr o MAC de 8.8.8.8 no quadro 3: o ARP não sai da rede local, então N nunca descobre esse MAC.",
      "Achar que o ARP Reply é broadcast: ele vai direto a quem perguntou."
    ],
    "finalAnswer": "ARP Request em broadcast (flooding na VLAN), ARP Reply por unicast até N e o ping com MAC de destino do gateway e IP de destino 8.8.8.8. Tabela MAC final: N na porta 1, G na porta 8."
  },
  "glossary": [
    {
      "term": "Gateway padrão",
      "shortDefinition": "O roteador da rede local que recebe os pacotes cujo destino está fora dela.",
      "example": "Numa casa com rede 192.168.0.0/24, o gateway costuma ser o roteador, 192.168.0.1.",
      "relatedLessons": [
        "2.5",
        "4.5"
      ]
    },
    {
      "term": "Máscara (/24)",
      "shortDefinition": "Indica qual parte do IP identifica a rede. É com ela que o host decide se o destino é local ou remoto.",
      "example": "Em 192.168.0.15/24, a rede é 192.168.0.0: os três primeiros números precisam ser iguais para o destino ser local.",
      "relatedLessons": [
        "2.5",
        "4.3"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_3-2022.html",
      "note": "Referência para Ethernet."
    },
    {
      "type": "standard",
      "title": "IEEE 802.1Q VLANs",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_1Q-2022.html",
      "note": "Referência para VLAN tagging e bridging."
    },
    {
      "type": "rfc",
      "title": "RFC 826 — An Ethernet Address Resolution Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc826",
      "note": "Referência histórica e técnica sobre ARP."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Encapsulamento, desencapsulamento e PDUs."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e redes de plataforma",
      "lesson": "NetworkPolicy e CNI",
      "reason": "Isolamento de rede em clusters depende de conceitos de enlace, overlays, bridges e segmentação."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso condicional e Zero Trust",
      "lesson": "Controle de acesso por dispositivo e rede",
      "reason": "NAC, postura de dispositivo e segmentação de rede se conectam com decisões de identidade e acesso."
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
      "2.5"
    ]
  }
};
