export const lesson0305 = {
  "id": "3.5",
  "moduleId": "m03",
  "order": 5,
  "title": "ARP: transformando IPv4 em MAC na rede local",
  "subtitle": "O protocolo que permite ao IPv4 usar Ethernet para entregar frames dentro da LAN.",
  "duration": "20-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 215,
  "tags": [
    "redes",
    "ethernet",
    "arp",
    "ipv4",
    "mac",
    "gateway",
    "camada 2",
    "camada 3",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.2",
      "reason": "É necessário entender frame Ethernet e endereço MAC."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.4",
      "reason": "ARP usa broadcast dentro do domínio de broadcast."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.5",
      "reason": "É necessário entender IP, gateway e próximo salto."
    }
  ],
  "objectives": [
    "Explicar por que o IPv4 precisa do ARP para entregar pacotes numa rede Ethernet e descrever o ARP Request, o ARP Reply e o cache ARP.",
    "Decidir, pela máscara, se o ARP vai buscar o MAC do próprio destino ou o do gateway.",
    "Ler a tabela ARP com arp -a ou ip neigh e explicar por que a falta de autenticação do ARP permite o ARP spoofing e como se defender dele."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>O notebook mostra \"conectado\", o <code>ipconfig</code> exibe IP, máscara e gateway certinhos, e mesmo assim nenhum site abre. A reação comum é trocar o DNS, reiniciar o navegador ou ligar para o provedor. Nada disso resolve quando o problema está um passo antes: para pôr qualquer frame no cabo ou no Wi-Fi, a placa de rede precisa do <strong>MAC</strong> do roteador, e o computador só tem o <strong>IP</strong> dele.</p>\n<p>Se essa tradução de IP para MAC não acontece, nenhum pacote sai da rede local, e o sintoma parece \"internet fora\". Nesta aula você vai ver como o computador descobre esse MAC, conferir o resultado no seu próprio terminal e entender por que, como qualquer máquina da rede pode responder a essa pergunta, ela também abre espaço para um ataque clássico: o ARP spoofing.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>É isso que acontece quando um host sabe para qual IP quer falar, mas não sabe qual MAC colocar no frame. IP e MAC têm escopos diferentes: o IP é o endereço lógico de Camada 3, usado para decidir entre redes; o MAC é o endereço de Camada 2 que entrega frames dentro do enlace local. Um pacote IP não atravessa a Ethernet sozinho: ele viaja dentro de um frame com MAC de origem e de destino.</p>\n<p>Manter à mão uma tabela IP-MAC em cada host não funciona: placas são trocadas, impressoras entram, notebooks mudam de rede. O ARP (Address Resolution Protocol) automatiza essa ligação: pergunta em broadcast quem tem aquele IPv4 e guarda a resposta por algum tempo. A simplicidade tem um preço: o ARP aceita respostas <strong>sem autenticação</strong>.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<div class=\"definition-box\"><strong>ARP</strong> é o protocolo usado no IPv4 para descobrir o endereço MAC associado a um endereço IPv4 <strong>dentro da rede local</strong>. Ele responde a uma única pergunta: \"qual MAC devo usar para entregar este frame ao próximo salto?\"</div>\n<p>O ARP não resolve nomes (isso é DNS), não roteia pacotes (isso é o roteador), não protege a comunicação e não atravessa roteadores: ele fica restrito ao domínio de broadcast, ou seja, à VLAN. Ele também é exclusivo do IPv4; o IPv6 resolve o mesmo problema com outro mecanismo.</p>\n<p>A frase \"ARP transforma IPv4 em MAC\" exige um cuidado: o IP que o ARP resolve é o do <strong>próximo salto</strong>, que nem sempre é o destino final. O host decide qual é o próximo salto comparando, pela máscara, o próprio IP com o IP de destino:</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Host <code>192.168.1.50/24</code> quer falar com…</th><th>Mesma sub-rede?</th><th>Próximo salto</th><th>ARP pergunta por</th></tr></thead><tbody>\n<tr><td><code>192.168.1.80</code> (impressora)</td><td>Sim</td><td>O próprio destino</td><td>MAC de <code>192.168.1.80</code></td></tr>\n<tr><td><code>203.0.113.10</code> (site externo)</td><td>Não</td><td>Gateway <code>192.168.1.1</code></td><td>MAC de <code>192.168.1.1</code>, nunca o do site</td></tr>\n</tbody></table></div>\n<p>No segundo caso, o gateway recebe o frame local, remove a Camada 2, analisa o pacote IP e escolhe o próximo salto seguinte. Por isso a sua tabela ARP só mostra vizinhos da sua sub-rede e o gateway, nunca os servidores da internet.</p>\n<div class=\"callout warning\"><strong>Erros comuns</strong>\n<ul>\n<li><strong>Concluir que o ARP falhou porque o ping não respondeu:</strong> o ARP acontece antes do primeiro pacote do ping. Se o gateway aparece na tabela ARP com um MAC, a resolução local funcionou; o gateway pode só estar bloqueando ping.</li>\n<li><strong>Esperar ver o MAC de um site em <code>arp -a</code>:</strong> para destinos de fora, o MAC usado é sempre o do gateway.</li>\n</ul></div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<p>Quando um host precisa enviar um pacote IPv4, o ARP entra assim:</p>\n<ol class=\"flow-list\"><li>O host verifica, pela máscara, se o IP de destino está na mesma sub-rede.</li><li>Define o próximo salto: o próprio destino (local) ou o gateway (externo).</li><li>Consulta o cache ARP para ver se já conhece o MAC desse próximo salto. Se conhece, pula para o passo 6.</li><li>Se não conhece, envia um <strong>ARP Request</strong> em broadcast para <code>ff:ff:ff:ff:ff:ff</code>, que alcança toda a VLAN: \"quem tem 192.168.1.1? Responda para 192.168.1.50\".</li><li>Só o dono daquele IP responde, com um <strong>ARP Reply</strong>, normalmente em unicast, direto para quem perguntou. O host grava a associação IP-MAC no cache por tempo limitado.</li><li>O pacote IP é colocado num frame Ethernet com o MAC resolvido e sai em unicast.</li></ol>\n<p>Se ninguém responde ao Request, o host não tem MAC para pôr no frame e o pacote não sai. Os sistemas avisam isso como \"host de destino inacessível\".</p>\n<h3>Campos da mensagem ARP</h3>\n<p>Num frame Ethernet, o ARP é identificado pelo EtherType <code>0x0806</code>. Request e Reply têm o mesmo formato; os campos que importam numa captura são:</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>Tamanho</th><th>Função</th></tr></thead><tbody>\n<tr><td>Hardware Type / Protocol Type</td><td>16 + 16 bits</td><td>A tecnologia de enlace (Ethernet) e o protocolo resolvido (IPv4).</td></tr>\n<tr><td>Operation</td><td>16 bits</td><td>1 = Request, 2 = Reply.</td></tr>\n<tr><td>Sender MAC / IP</td><td>48 + 32 bits</td><td>Quem envia a mensagem e a associação IP-MAC que ele anuncia.</td></tr>\n<tr><td>Target MAC / IP</td><td>48 + 32 bits</td><td>O IP procurado. No Request, o Target MAC vai zerado (<code>00:00:00:00:00:00</code>), porque é justamente o que se procura.</td></tr>\n</tbody></table></div>\n<p>No Reply, o MAC procurado vem no campo Sender: é a máquina que responde dizendo \"esse IP sou eu, e meu MAC é este\".</p>\n<h3>Como ler a tabela ARP</h3>\n<pre class=\"code-block\"><code>Linux (ip neigh):  192.168.1.1 dev wlan0 lladdr aa:bb:cc:dd:ee:ff REACHABLE\nWindows (arp -a):  192.168.1.1           aa-bb-cc-dd-ee-ff     dinâmico</code></pre>\n<p>Cada linha associa um IP a um MAC. No Linux, <code>REACHABLE</code> indica entrada confirmada há pouco, <code>STALE</code> indica entrada ainda utilizável mas não confirmada recentemente, e <code>FAILED</code> indica que o host perguntou e ninguém respondeu. No Windows, as entradas aprendidas por ARP aparecem como dinâmicas. A aula 3.6 detalha como esse cache é mantido e como ler entradas problemáticas.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n<p>O IP é o nome de uma pessoa num andar de escritório; para entregar um envelope, você precisa saber em qual mesa ela está. O ARP é perguntar em voz alta no andar \"quem é 192.168.1.1?\" e anotar a mesa de quem responde \"sou eu\". O problema é que qualquer pessoa no andar pode gritar \"sou eu\", e você acredita.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Seu notebook tem IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>, e acabou de se conectar ao Wi-Fi: a tabela ARP ainda não tem o gateway. Você manda imprimir na impressora <code>192.168.1.80</code> e depois abre um site hospedado em <code>203.0.113.10</code>. Em seguida, roda <code>arp -a</code> (trecho):</p>\n<pre class=\"code-block\"><code>  Endereço IP           Endereço físico       Tipo\n  192.168.1.1           aa-bb-cc-dd-ee-ff     dinâmico\n  192.168.1.80          11-22-33-44-55-66     dinâmico</code></pre>\n<p>Para imprimir, o notebook perguntou pelo MAC da própria impressora, que está na sua sub-rede. Para o site, perguntou pelo MAC do gateway e entregou a ele o frame. O IP <code>203.0.113.10</code> não aparece na tabela, e nunca vai aparecer: o notebook não precisa do MAC do site, só do MAC de quem dá o próximo passo.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 430\" role=\"img\" aria-labelledby=\"arp-title arp-desc\">\n  <title id=\"arp-title\">ARP resolvendo IPv4 para MAC na rede local</title>\n  <desc id=\"arp-desc\">Host cliente pergunta em broadcast quem possui o IP do gateway. O gateway responde com seu endereço MAC e o cliente passa a enviar o frame unicast.</desc>\n  <defs>\n    <marker id=\"m03l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n  </defs>\n  <rect x=\"40\" y=\"72\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"125\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n  <text x=\"125\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.25</text>\n  <text x=\"125\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC aa:aa...</text>\n  <rect x=\"405\" y=\"72\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"490\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n  <text x=\"490\" y=\"132\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN 10</text>\n  <rect x=\"770\" y=\"72\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"855\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n  <text x=\"855\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.1</text>\n  <text x=\"855\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC bb:bb...</text>\n  <line x1=\"210\" y1=\"116\" x2=\"405\" y2=\"116\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <line x1=\"575\" y1=\"116\" x2=\"770\" y2=\"116\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <text x=\"490\" y=\"55\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP Request: Quem tem 192.168.10.1? Diga para 192.168.10.25</text>\n  <line x1=\"770\" y1=\"205\" x2=\"575\" y2=\"205\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <line x1=\"405\" y1=\"205\" x2=\"210\" y2=\"205\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <text x=\"490\" y=\"240\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP Reply: 192.168.10.1 está em bb:bb:bb:bb:bb:bb</text>\n  <rect x=\"250\" y=\"300\" width=\"480\" height=\"84\" rx=\"14\" class=\"svg-node svg-node--security\" />\n  <text x=\"490\" y=\"328\" text-anchor=\"middle\" class=\"svg-label\">Cache ARP do Host A</text>\n  <text x=\"490\" y=\"354\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1 → bb:bb:bb:bb:bb:bb por tempo limitado</text>\n  <text x=\"490\" y=\"376\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Risco defensivo: ARP não autentica nativamente a resposta</text>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul><li><strong>Ideia central:</strong> o ARP descobre o MAC do próximo salto local, não o do servidor final.</li><li>Destino na mesma sub-rede: ARP pelo próprio destino. Fora dela: ARP pelo gateway.</li><li>Request em broadcast, Reply em unicast, resposta guardada no cache por tempo limitado.</li><li>O ARP não é DNS e não atravessa roteadores; a tabela aparece em <code>arp -a</code> e <code>ip neigh</code>.</li><li>O ARP não autentica respostas: isso permite o ARP spoofing.</li></ul>\n<p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>Na aula 3.6, \"Cache ARP e troubleshooting de rede local\", você vê como a tabela ARP é mantida e expira, e como interpretar entradas incompletas, IP duplicado ou um gateway com MAC suspeito.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2",
      "Camada 3"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet"
    ],
    "relatedProtocols": [
      "Ethernet",
      "IPv4",
      "ARP",
      "ICMP",
      "802.1Q"
    ],
    "dependsOn": [
      "Frame Ethernet",
      "Endereço MAC",
      "IPv4",
      "Gateway",
      "Broadcast"
    ],
    "enables": [
      "Comunicação IPv4 local",
      "Acesso ao gateway",
      "Troubleshooting L2/L3",
      "Segurança defensiva de LAN"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Host com IP, máscara e gateway, mas nada fora da rede local responde.",
      "Um único dispositivo da mesma sub-rede, como uma impressora, não responde.",
      "Um destino de outra sub-rede interna não responde, mas a internet funciona."
    ],
    "diagnosticQuestions": [
      "O destino está na mesma sub-rede (ARP pelo destino) ou fora dela (ARP pelo gateway)?",
      "O próximo salto que o host escolheu é o esperado?",
      "Depois de um ping, esse próximo salto tem entrada ARP com MAC?"
    ],
    "commands": [
      {
        "platform": "Linux",
        "command": "ip route get <destino>\nip neigh show <próximo salto>",
        "purpose": "Ver o próximo salto escolhido para um destino e o estado da entrada ARP dele.",
        "expectedObservation": "Destino externo: \"via <gateway>\"; destino local: sem \"via\". Entrada REACHABLE ou STALE.",
        "interpretation": "Destino remoto sem \"via\" indica máscara errada. FAILED indica ARP Request sem resposta."
      },
      {
        "platform": "Windows (PowerShell)",
        "command": "Find-NetRoute -RemoteIPAddress <destino>\nGet-NetNeighbor -IPAddress <próximo salto>",
        "purpose": "Ver o próximo salto (NextHop) escolhido para um destino e o estado da entrada ARP dele.",
        "expectedObservation": "Destino externo: NextHop = gateway; destino local: NextHop 0.0.0.0. Entrada Reachable ou Stale, com o MAC.",
        "interpretation": "NextHop inesperado indica máscara ou rota errada. Unreachable ou Incomplete indica ARP Request sem resposta."
      }
    ],
    "decisionTree": [
      {
        "if": "O gateway não ganha entrada ARP com MAC, mesmo depois de um ping",
        "then": "Problema local: confira cabo ou Wi-Fi, a VLAN da porta e se o gateway está ligado, antes de DNS ou firewall."
      },
      {
        "if": "Um destino remoto é tratado como local (sem \"via\" ou NextHop 0.0.0.0)",
        "then": "Corrija a máscara: o host está fazendo ARP pelo alvo errado."
      },
      {
        "if": "O destino local fica FAILED ou Unreachable",
        "then": "Verifique o próprio dispositivo: desligado, em outra VLAN ou com outro IP."
      }
    ]
  },
  "security": {
    "vulnerabilities": [
      {
        "name": "ARP spoofing",
        "description": "Uma máquina da mesma VLAN envia ARP Replies falsos dizendo que o IP do gateway (ou de outro host) está no MAC dela. As vítimas atualizam o cache e passam a entregar os frames a ela, que pode derrubar a comunicação, ler o tráfego sem criptografia ou redirecioná-lo.",
        "defensiveExplanation": "Funciona porque o ARP não autentica respostas: o host aceita o que chega e atualiza o cache. O ataque só alcança quem está na mesma VLAN do atacante.",
        "mitigation": "VLANs menores, inspeção de ARP no switch (DAI), criptografia ponta a ponta e monitoramento do MAC do gateway."
      }
    ],
    "goodPractices": [
      "Separar a rede em VLANs menores, por função (usuários, servidores, visitantes): o ARP spoofing só atinge quem está na mesma VLAN.",
      "Ativar no switch a inspeção de ARP (DAI), que descarta respostas ARP cuja associação IP-MAC não confere com os endereços entregues pelo DHCP.",
      "Usar criptografia ponta a ponta (como o HTTPS): mesmo que o tráfego seja desviado, o conteúdo continua ilegível para o atacante."
    ],
    "detectionIdeas": [
      "Anotar o MAC verdadeiro do gateway e compará-lo com arp -a ou ip neigh quando houver suspeita.",
      "Desconfiar quando dois IPs, como o do gateway e o de um host comum, aparecem com o mesmo MAC na tabela ARP, ou quando o MAC do gateway muda sem aviso.",
      "Antes de concluir que é ataque, descartar causas legítimas: um equipamento reserva que assume o IP do gateway (failover) também troca o MAC."
    ]
  },
  "lab": {
    "id": "lab-3.5",
    "title": "Observando o ARP na sua própria rede",
    "labType": "security",
    "objective": "Ver o ARP resolver o MAC do gateway, confirmar que destinos externos não entram na tabela e ver o que acontece quando ninguém responde.",
    "prerequisites": [
      "Um computador na sua rede doméstica ou num laboratório autorizado. Use só comandos de consulta e ping."
    ],
    "tools": [
      "Windows (Prompt de Comando ou PowerShell) ou terminal Linux"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Descobrir o gateway e ver a tabela ARP",
        "instruction": "Descubra o IP, a máscara e o gateway padrão do seu host e liste a tabela ARP atual.",
        "command": "Windows: ipconfig\narp -a\nLinux: ip -4 addr\nip route | grep default\nip neigh",
        "expectedOutput": "O IP do gateway (por exemplo, 192.168.1.1) e algumas entradas IP-MAC de vizinhos da sua sub-rede. O gateway pode já aparecer.",
        "explanation": "A tabela mostra o que o host já resolveu recentemente. Nem toda entrada indica tráfego neste momento."
      },
      {
        "number": 2,
        "title": "Fazer o host resolver o gateway",
        "instruction": "Pingue o gateway e consulte de novo a entrada dele.",
        "command": "Windows: ping -n 2 <gateway>\narp -a <gateway>\nLinux: ping -c 2 <gateway>\nip neigh show <gateway>",
        "expectedOutput": "O IP do gateway associado a um MAC: dinâmico no Windows, REACHABLE no Linux.",
        "explanation": "A entrada aparece mesmo que o gateway não responda ao ping, porque o ARP acontece antes do primeiro pacote."
      },
      {
        "number": 3,
        "title": "Falar com um destino externo",
        "instruction": "Pingue um endereço da internet e procure-o na tabela ARP.",
        "command": "Windows: ping -n 2 8.8.8.8\narp -a\nLinux: ping -c 2 8.8.8.8\nip neigh",
        "expectedOutput": "Nenhuma entrada para 8.8.8.8. Continua só o gateway (e os vizinhos locais).",
        "explanation": "8.8.8.8 está fora da sua sub-rede, então o próximo salto é o gateway: o frame saiu com o MAC dele."
      },
      {
        "number": 4,
        "title": "Perguntar por um IP que ninguém usa",
        "instruction": "Escolha um IP da sua sub-rede que nenhum dispositivo use (por exemplo, o .254 de uma rede /24, se não for o seu gateway), pingue-o e consulte a tabela.",
        "command": "Windows: ping -n 2 <ip livre>\nLinux: ping -c 2 <ip livre>\nip neigh show <ip livre>",
        "expectedOutput": "O ping responde \"Host de destino inacessível\" (Destination Host Unreachable), vindo do seu próprio IP. No Linux, a entrada fica FAILED (ou INCOMPLETE enquanto ainda pergunta); no Windows, o IP não aparece em arp -a.",
        "explanation": "O ARP Request saiu em broadcast e ninguém respondeu. Sem MAC de destino, o frame nem é montado: quem avisa a falha é o seu próprio host."
      }
    ],
    "expectedResult": "Você viu o MAC do gateway entrar na tabela ARP, confirmou que destinos externos usam o MAC do gateway e viu o host avisar \"inacessível\" quando o ARP fica sem resposta."
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Um host foi configurado com 192.168.1.50/16 em vez de /24; o gateway é 192.168.1.1. Ele tenta acessar 192.168.5.10, que fica em outra sub-rede /24, atrás do gateway. O que acontece com o ARP e por quê?",
      "hints": [
        "Com /16, quais IPs o host considera locais?",
        "Quem recebe um ARP Request em broadcast?"
      ],
      "expectedIdeas": [
        "com /16 o host acha que 192.168.5.10 está na mesma sub-rede",
        "faz ARP direto para 192.168.5.10 em vez de usar o gateway",
        "o broadcast fica na VLAN local e o destino não o recebe",
        "sem resposta, a comunicação falha",
        "a causa é a máscara, não o gateway nem o DNS"
      ],
      "explanation": "A decisão de próximo salto vem antes do ARP. Máscara errada faz o host perguntar pelo alvo errado."
    },
    {
      "type": "aplicação",
      "question": "Você roda arp -a e vê o gateway 192.168.1.1 e um notebook comum, 192.168.1.66, com o mesmo MAC. O que isso pode indicar e o que você conferiria antes de concluir?",
      "hints": [
        "Quem deveria ter o MAC do gateway?",
        "Existe explicação legítima para o MAC do gateway mudar?"
      ],
      "expectedIdeas": [
        "possível ARP spoofing: o 192.168.1.66 anunciou o IP do gateway",
        "comparar com o MAC verdadeiro do gateway",
        "descartar failover ou troca de equipamento",
        "pedir ao time de rede para ver em qual porta do switch esse MAC está"
      ],
      "explanation": "Um host comum respondendo pelo IP do gateway é o sinal típico de ARP spoofing. Como o ARP não autentica, a tabela mostra só o que o host acreditou; confirme com o MAC documentado e com o switch antes de agir."
    }
  ],
  "quiz": [
    {
      "id": "q3.5.1",
      "question": "Qual é a função principal do ARP em IPv4 sobre Ethernet?",
      "options": [
        "Resolver nome DNS para IP público",
        "Resolver IPv4 para MAC dentro da rede local",
        "Criptografar frames Ethernet",
        "Rotear pacotes entre redes diferentes"
      ],
      "answer": 1,
      "explanation": "ARP descobre o MAC associado a um IPv4 local ou ao próximo salto local.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q3.5.2",
      "question": "Um host quer acessar um site externo. Para qual IP ele normalmente faz ARP primeiro?",
      "options": [
        "Para o IP do servidor DNS raiz",
        "Para o IP público do site",
        "Para o IP do gateway padrão",
        "Para o endereço de broadcast da sub-rede"
      ],
      "answer": 2,
      "explanation": "Para destinos fora da rede local, o próximo salto é o gateway padrão.",
      "topic": "gateway",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q3.5.3",
      "question": "Por que ARP spoofing é possível conceitualmente?",
      "options": [
        "Porque ARP não autentica nativamente respostas",
        "Porque todo switch é roteador",
        "Porque DNS sempre usa ARP",
        "Porque TLS altera MACs"
      ],
      "answer": 0,
      "explanation": "O ARP aceita respostas sem autenticação: uma máquina da mesma VLAN pode anunciar o IP do gateway com o próprio MAC.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q3.5.8",
      "question": "Você pingou o gateway 192.168.1.1, que bloqueia ICMP: nenhuma resposta. Em seguida, ip neigh mostra \"192.168.1.1 dev wlan0 lladdr aa:bb:cc:dd:ee:ff REACHABLE\". O que você conclui?",
      "options": [
        "O gateway está fora do ar, porque não respondeu ao ping",
        "O host está na VLAN errada, porque o ping falhou",
        "O DNS está funcionando, porque o gateway aparece com MAC",
        "A resolução ARP do gateway funcionou; a falta de resposta ao ping não indica falha de Camada 2"
      ],
      "answer": 3,
      "explanation": "A resolução do MAC acontece antes do envio do ping. Uma entrada REACHABLE mostra que o gateway respondeu ao ARP; o ping sem resposta só indica que o ICMP foi bloqueado.",
      "topic": "comandos",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q3.5.7",
      "question": "O host 192.168.1.50/24 vai enviar dados para a impressora 192.168.1.80. Por qual IP ele faz ARP?",
      "options": [
        "192.168.1.1, o gateway padrão",
        "192.168.1.80, a própria impressora",
        "192.168.1.255, o broadcast da sub-rede",
        "Nenhum: na mesma sub-rede não é preciso ARP"
      ],
      "answer": 1,
      "explanation": "Com /24, 192.168.1.80 está na mesma sub-rede; o próximo salto é o próprio destino, e o ARP pergunta pelo MAC dele. Só destinos de fora usam o gateway.",
      "topic": "próximo salto",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q3.5.6",
      "question": "Se ARP para o gateway falha, qual hipótese é mais inicial?",
      "options": [
        "Porta 443 bloqueada no firewall de borda",
        "Servidor DNS configurado incorretamente",
        "Problema local: VLAN, link, máscara ou gateway",
        "Certificado TLS expirado no site"
      ],
      "answer": 2,
      "explanation": "Sem ARP para o gateway, nenhum pacote sai da LAN. DNS, firewall de borda e TLS só entram depois que o caminho local funciona.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "troubleshooting"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.5.7",
      "front": "Como são enviados o ARP Request e o ARP Reply?",
      "back": "Request: broadcast para ff:ff:ff:ff:ff:ff, alcançando toda a VLAN. Reply: normalmente unicast, direto para quem perguntou.",
      "tags": [
        "arp",
        "broadcast"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.5.2",
      "front": "ARP atravessa roteadores?",
      "back": "Não. ARP é local ao domínio de broadcast/VLAN.",
      "tags": [
        "arp",
        "roteamento"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.5.8",
      "front": "Qual EtherType identifica o ARP e qual campo separa Request de Reply?",
      "back": "EtherType 0x0806. O campo Operation: 1 = Request, 2 = Reply.",
      "tags": [
        "arp",
        "campos"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.5.9",
      "front": "Quais medidas reduzem o risco de ARP spoofing?",
      "back": "Inspeção de ARP no switch (DAI), VLANs menores e monitoramento do MAC do gateway; criptografia ponta a ponta (como o HTTPS) reduz o impacto se o tráfego for desviado.",
      "tags": [
        "segurança",
        "arp spoofing"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.5.5",
      "front": "Qual comando mostra ARP no Linux moderno?",
      "back": "ip neigh, além de arp -a em sistemas que ainda possuem net-tools.",
      "tags": [
        "linux",
        "comandos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.5.6",
      "front": "DNS e ARP fazem a mesma coisa?",
      "back": "Não. DNS resolve nomes para IP; ARP resolve IPv4 para MAC local.",
      "tags": [
        "dns",
        "arp"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex3.5.6",
      "type": "comando/output",
      "prompt": "Numa captura você vê um frame com destino Ethernet ff:ff:ff:ff:ff:ff, EtherType 0x0806, Operation = 1, Sender IP 192.168.10.25, Target IP 192.168.10.1 e Target MAC 00:00:00:00:00:00. Quem está perguntando o quê, e como deve chegar a resposta?",
      "expectedAnswer": "É um ARP Request: o host 192.168.10.25 pergunta qual MAC tem 192.168.10.1 (provavelmente o gateway). O Target MAC vai zerado porque é o que se procura. A resposta deve ser um ARP Reply (Operation = 2), normalmente em unicast para o MAC de 192.168.10.25, com o MAC de 192.168.10.1 no campo Sender.",
      "explanation": "Ler Operation, Sender e Target é o que permite separar perguntas de respostas e notar Replies que ninguém pediu."
    },
    {
      "id": "ex3.5.5",
      "type": "cálculo",
      "prompt": "Um host tem IP 10.0.5.20/24 e gateway 10.0.5.1. Para cada destino, diga por qual IP ele fará ARP: (a) 10.0.5.200; (b) 10.0.6.7; (c) 8.8.8.8.",
      "expectedAnswer": "(a) 10.0.5.200, porque está na mesma sub-rede 10.0.5.0/24; (b) 10.0.5.1, o gateway, porque 10.0.6.7 está em outra sub-rede; (c) 10.0.5.1, o gateway, porque o destino é externo.",
      "explanation": "Primeiro se decide o próximo salto pela máscara; o ARP só resolve o MAC desse próximo salto."
    }
  ],
  "challenge": {
    "title": "Gateway com MAC que muda",
    "scenario": "Usuários de uma VLAN relatam quedas intermitentes. Em alguns notebooks, o MAC associado ao gateway 10.0.5.1 muda durante o dia: às vezes é aa-bb-cc-00-00-01, às vezes 11-22-33-44-55-66, que também aparece na tabela para o IP 10.0.5.77.",
    "tasks": [
      "Listar pelo menos duas explicações possíveis, uma legítima e uma de ataque.",
      "Dizer quais evidências você coletaria com os comandos da aula.",
      "Propor duas medidas de proteção."
    ],
    "expectedDeliverables": [
      "Um texto curto (6 a 10 linhas) com hipóteses, evidências e medidas."
    ]
  },
  "commentedSolution": {
    "reasoning": "A mudança de MAC é uma evidência a correlacionar, não uma conclusão. O detalhe decisivo é que o segundo MAC também pertence a um host comum da VLAN.",
    "steps": [
      "Hipóteses: failover legítimo (um equipamento reserva assume o IP do gateway), outro aparelho configurado por engano com o IP 10.0.5.1, ou ARP spoofing a partir de 10.0.5.77.",
      "Evidências: arp -a ou ip neigh em vários horários nos notebooks afetados, anotando o MAC do gateway; comparar com o MAC documentado do gateway.",
      "O MAC 11-22-33-44-55-66 aparecer também para 10.0.5.77 indica que esse host está respondendo pelo IP do gateway: forte suspeita de ARP spoofing. Um equipamento reserva de failover não seria um notebook comum da VLAN.",
      "Medidas: pedir ao time de rede para localizar a porta do switch desse MAC, ativar DAI na VLAN, reduzir o tamanho da VLAN e garantir HTTPS no tráfego sensível."
    ],
    "commonMistakes": [
      "Concluir \"é ataque\" sem descartar failover ou erro de configuração.",
      "Limpar o cache ARP e dar o problema por resolvido: a resposta falsa volta."
    ],
    "finalAnswer": "Trate a troca de MAC como evidência: confirme o MAC verdadeiro do gateway, note que o MAC alternativo pertence a 10.0.5.77 e, se não houver explicação legítima, trate como ARP spoofing. Proteção: DAI, VLANs menores, criptografia e monitoramento do MAC do gateway."
  },
  "glossary": [
    {
      "term": "EtherType",
      "shortDefinition": "Campo do frame Ethernet que diz qual protocolo vai dentro dele.",
      "example": "0x0800 indica IPv4; 0x0806 indica ARP.",
      "relatedLessons": [
        "3.2"
      ]
    },
    {
      "term": "VLAN",
      "shortDefinition": "Divisão lógica de uma rede de switches em redes locais separadas; cada VLAN é um domínio de broadcast próprio.",
      "example": "Um ARP Request enviado na VLAN 10 não chega aos hosts da VLAN 20.",
      "relatedLessons": [
        "3.7"
      ]
    },
    {
      "term": "DAI (Dynamic ARP Inspection)",
      "shortDefinition": "Recurso de switch que confere cada mensagem ARP contra os endereços entregues pelo DHCP e descarta as que não batem.",
      "example": "Um notebook que anuncia o IP do gateway com o próprio MAC tem a resposta descartada pelo switch.",
      "relatedLessons": [
        "3.9"
      ]
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "RFC 826 — An Ethernet Address Resolution Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc826",
      "note": "Referência clássica do ARP para IPv4 em Ethernet."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Aula 2.5",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para IP, gateway, roteamento e TTL."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Aula 3.4",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para broadcast e domínio de broadcast."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Redes de laboratório e runners",
      "lesson": "Ambientes locais e bridges virtuais",
      "reason": "Bridges, VMs e runners podem depender do mesmo raciocínio de próximo salto local."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso seguro em redes corporativas",
      "lesson": "NAC e identidade de dispositivo",
      "reason": "ARP e MAC não substituem identidade forte; NAC e 802.1X complementam controles de acesso."
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
      "3.6"
    ]
  }
};
