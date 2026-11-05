export const lesson0205 = {
  "id": "2.5",
  "moduleId": "m02",
  "order": 5,
  "title": "Camada 3 — Rede: IP, roteamento, gateway e TTL",
  "subtitle": "A camada que leva pacotes entre redes com endereços IP, tabelas de rotas, gateways e TTL.",
  "duration": "20-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 205,
  "tags": [
    "redes",
    "modelo osi",
    "camada 3",
    "ip",
    "roteamento",
    "gateway",
    "ttl",
    "traceroute",
    "cloud networking",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 apresentou o Modelo OSI como ferramenta de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "A aula 2.2 explicou encapsulamento e mostrou o pacote como PDU da Camada 3."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.4",
      "reason": "A aula 2.4 explicou a entrega local por frames, MAC, switch, VLAN e ARP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.9",
      "reason": "A aula 1.9 apresentou comandos iniciais de diagnóstico como ipconfig, ping, tracert e nslookup."
    }
  ],
  "objectives": [
    "Explicar o papel da Camada 3: levar pacotes entre redes diferentes com endereços IP, decidindo salto a salto em gateways e roteadores.",
    "Usar IP e máscara para decidir se um destino é local ou vai ao gateway, e ler uma tabela de rotas (ip route, route print) escolhendo a rota mais específica.",
    "Explicar o que o TTL evita, como o traceroute o usa e por que os MACs mudam a cada enlace enquanto os IPs de origem e destino ficam."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Você abre um site hospedado em outro país, numa rede que seu notebook nunca viu, e a página carrega em menos de um segundo. Seu notebook não conhece esse caminho. Ele sabe só o próprio endereço IP, a máscara e o endereço do roteador de casa, o gateway. Todo o resto é decidido salto a salto, por roteadores que ele também não conhece.</p>\n  <p>Quando uma dessas peças está errada, o sintoma engana: a impressora da sala funciona, mas nenhum site abre, nem digitando um IP como <code>8.8.8.8</code>. Quem não entende a Camada 3 reinicia o roteador, troca o DNS ou culpa o provedor sem olhar onde o pacote parou. É o mesmo raciocínio que resolve, numa empresa ou em cloud, a filial que não alcança o datacenter ou a máquina virtual que não sai para a internet.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Sair da rede local é justamente o que a Camada 2 não faz. Na aula 2.4 você viu que ela entrega quadros pelo MAC dentro da rede local. Mas o MAC identifica uma interface; ele não diz <em>onde</em> ela está. Se a internet inteira dependesse de MAC e broadcast, cada equipamento teria de conhecer todos os outros, e o broadcast inundaria tudo. O IP, criado com a própria internet para interligar redes diferentes, resolve isso com um endereço hierárquico: uma parte indica a rede, a outra indica o host. Com ele, a Camada 3 cuida de três coisas:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Endereçamento lógico:</strong> identificar redes e hosts de forma hierárquica.</li>\n    <li><strong>Decisão de caminho:</strong> escolher para onde enviar o que vai para outra rede.</li>\n    <li><strong>Controle de loops:</strong> o TTL impede que um pacote circule para sempre.</li>\n  </ul>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> Camada 3 (Rede) é a camada que usa endereços lógicos, como o IP, para levar pacotes entre redes diferentes por meio de roteadores, gateways e tabelas de rotas. Em TCP/IP, o protocolo dessa função é o IP (IPv4 e IPv6).</div>\n  <p>O host não precisa conhecer os caminhos da internet. Ele precisa de três informações: seu IP, sua máscara (que diz qual é a rede local) e seu gateway padrão (para onde mandar o que não é local). Cada roteador no caminho consulta a própria tabela de rotas e decide só o <strong>próximo salto</strong>.</p>\n  <p>A máscara diz quantos bits do IP, contados da esquerda, identificam a rede. Nos casos mais comuns ela marca números inteiros do endereço: <code>/8</code> (<code>255.0.0.0</code>) fixa o primeiro número, <code>/16</code> (<code>255.255.0.0</code>) os dois primeiros e <code>/24</code> (<code>255.255.255.0</code>) os três primeiros. Com <code>192.168.1.50/24</code>, a rede local é <code>192.168.1.0/24</code>: <code>192.168.1.80</code> está nela; <code>192.168.20.10</code> e <code>8.8.8.8</code> não. Quanto maior o número depois da barra, menor e mais específica é a rede. Outras máscaras e o cálculo completo ficam para as aulas 4.3 e 5.2.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Peça</th><th>O que é</th><th>Exemplo</th></tr></thead>\n    <tbody>\n      <tr><td>IP</td><td>Endereço lógico do host</td><td><code>192.168.1.50</code></td></tr>\n      <tr><td>Máscara</td><td>Quantos bits são da rede; separa local de remoto</td><td><code>/24</code> = <code>255.255.255.0</code></td></tr>\n      <tr><td>Rede local</td><td>IP + máscara</td><td><code>192.168.1.0/24</code></td></tr>\n      <tr><td>Gateway padrão</td><td>Roteador usado para destinos fora da rede local</td><td><code>192.168.1.1</code></td></tr>\n      <tr><td>Rota default</td><td>Rota usada quando nenhuma outra combina; aponta para o gateway</td><td><code>0.0.0.0/0 via 192.168.1.1</code></td></tr>\n      <tr><td>TTL</td><td>Contador de vida do pacote, decrementado a cada roteador</td><td>Chegou a 0: descarte</td></tr>\n    </tbody>\n  </table></div>\n  <p>Dois limites para guardar desde já. O IP <strong>não garante entrega</strong>: confirmar e retransmitir fica com a Camada 4. E <strong>roteamento não é autorização</strong>: a rota só diz que o pacote consegue chegar; quem decide se ele pode passar é um firewall ou o próprio serviço. Por isso, numa rede plana, em que todos os segmentos se alcançam sem filtro, um computador invadido alcança todos eles e pode saltar de um para outro, o que se chama movimento lateral.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <h3>O caminho de um pacote, passo a passo</h3>\n  <ol class=\"flow-list\">\n    <li>O host aplica a máscara ao próprio IP e ao IP de destino para saber se o destino está na mesma rede. <em>Falha típica: máscara errada faz o host tratar destino remoto como local, ou local como remoto.</em></li>\n    <li>Destino na mesma rede: entrega local, via ARP e Camada 2.</li>\n    <li>Destino fora da rede: o host consulta as próprias rotas; na maioria dos hosts só existe a default, que envia o pacote ao gateway padrão. Para isso ainda precisa do MAC do gateway, descoberto via ARP. <em>Falha típica: gateway ausente ou errado impede a saída da rede local.</em></li>\n    <li>O gateway recebe o quadro, remove o encapsulamento de Camada 2 e analisa o pacote IP.</li>\n    <li>O roteador consulta a tabela de rotas e escolhe a rota <strong>mais específica</strong> (maior prefixo) que combina com o destino.</li>\n    <li>O TTL é decrementado. Se chegar a zero, o pacote é descartado e o roteador pode devolver uma mensagem ICMP Time Exceeded. <em>Falha típica: num loop de roteamento, os pacotes giram entre roteadores até o TTL zerar.</em></li>\n    <li>O roteador reencapsula o pacote num novo quadro de Camada 2 para o próximo salto.</li>\n    <li>O processo se repete até a rede de destino, ou até o descarte por rota ausente, política ou falha. A resposta faz o caminho inverso e precisa de uma <strong>rota de retorno</strong>.</li>\n  </ol>\n  <p>Ponto-chave: os IPs de origem e destino normalmente permanecem de ponta a ponta, enquanto os MACs mudam a cada enlace. A exceção mais comum é o NAT do roteador de casa, que troca o IP de origem.</p>\n\n  <h3>Campos do cabeçalho IPv4 usados nessas decisões</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Campo</th><th>Tamanho</th><th>Função</th></tr></thead>\n    <tbody>\n      <tr><td>Source IP</td><td>32 bits</td><td>Endereço lógico de origem</td></tr>\n      <tr><td>Destination IP</td><td>32 bits</td><td>Endereço lógico de destino; base da decisão de rota</td></tr>\n      <tr><td>TTL</td><td>8 bits</td><td>Limita a vida do pacote e evita loops infinitos</td></tr>\n      <tr><td>Protocol</td><td>8 bits</td><td>Indica o que vai dentro do pacote: TCP, UDP ou ICMP</td></tr>\n    </tbody>\n  </table></div>\n\n  <h3>Lendo uma tabela de rotas</h3>\n  <p>Exemplo de saída de <code>ip route</code> num host Linux com IP <code>192.168.1.50/24</code>:</p>\n  <pre class=\"code-block\"><code>default via 192.168.1.1 dev eth0\n10.0.0.0/8 via 192.168.1.254 dev eth0\n192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.50</code></pre>\n  <p>A última linha é a rede conectada, que o sistema cria sozinho a partir do IP e da máscara: o que cai nela é entregue direto, sem gateway. Quando várias rotas combinam com o destino, vence a mais específica:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Destino</th><th>Rotas que combinam</th><th>Escolhida (mais específica)</th><th>Resultado</th></tr></thead>\n    <tbody>\n      <tr><td><code>192.168.1.80</code></td><td>/24 e default</td><td><code>192.168.1.0/24</code></td><td>Entrega local (rede conectada)</td></tr>\n      <tr><td><code>10.20.30.40</code></td><td>/8 e default</td><td><code>10.0.0.0/8</code></td><td>Envia para <code>192.168.1.254</code></td></tr>\n      <tr><td><code>8.8.8.8</code></td><td>só a default</td><td><code>0.0.0.0/0</code></td><td>Envia para o gateway <code>192.168.1.1</code></td></tr>\n    </tbody>\n  </table></div>\n  <p>No Windows, o equivalente é <code>route print</code>; a default aparece como destino <code>0.0.0.0</code> com máscara <code>0.0.0.0</code>.</p>\n\n  <h3>Como o traceroute usa o TTL</h3>\n  <p>O traceroute (<code>tracert</code> no Windows) envia sondas com TTL 1, depois 2, depois 3, e assim por diante. Cada roteador em que o TTL chega a zero devolve um ICMP Time Exceeded e, assim, aparece como um salto na lista. Um asterisco significa só que aquele salto não respondeu: ele pode filtrar ICMP e ainda assim encaminhar o tráfego. Por isso o traceroute é evidência parcial: pode ser bloqueado, incompleto ou assimétrico (a volta pode seguir outro caminho).</p>\n\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>\"Pinguei o gateway, então a internet funciona.\"</strong> O gateway é o primeiro salto e costuma responder mesmo quando as rotas depois dele falham. Valide por etapas: gateway, rota, caminho e só então DNS e aplicação.</li>\n      <li><strong>Confundir gateway com DNS.</strong> Os dois aparecem juntos na configuração, mas o gateway encaminha tráfego e o DNS traduz nomes. Trocar um quando o problema é o outro não resolve.</li>\n      <li><strong>Esquecer a rota de retorno.</strong> O pacote chega, mas a resposta não volta porque o destino (ou um roteador no meio) não tem rota para a rede de origem. Valide rotas e políticas nos dois sentidos.</li>\n    </ul>\n  </div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense numa cidade. A Camada 2 é a entrega dentro de um condomínio: basta saber o bloco e o apartamento. A Camada 3 é o sistema de endereços e estradas entre bairros e cidades: o gateway é a portaria, a saída do condomínio; em cada cruzamento, uma placa indica só a próxima estrada; e o TTL é um limite de tentativas para que uma entrega perdida não circule para sempre.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu notebook tem IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. Ao acessar outro dispositivo em <code>192.168.1.80</code>, o tráfego é local. Ao acessar <code>8.8.8.8</code>, o destino não está em <code>192.168.1.0/24</code>, então o notebook envia o pacote ao gateway.</p>\n  <p>Repare: o quadro Ethernet que sai do notebook tem como MAC de destino o MAC do roteador, mas o pacote IP dentro dele tem destino <code>8.8.8.8</code>. O roteador recebe, remove o quadro local, decrementa o TTL e encaminha o pacote pelo próximo enlace, dentro de um quadro novo.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m02l05-title m02l05-desc\">\n    <title id=\"m02l05-title\">Camada 3: IP, roteamento, gateway e TTL</title>\n    <desc id=\"m02l05-desc\">Um host envia pacote IP para outra rede usando gateway, roteador, tabela de rotas e redução de TTL a cada salto.</desc>\n    <defs>\n      <marker id=\"m02l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n\n    <rect x=\"35\" y=\"80\" width=\"250\" height=\"330\" rx=\"18\" class=\"svg-zone\"></rect>\n    <text x=\"160\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">Rede local 192.168.10.0/24</text>\n\n    <rect x=\"70\" y=\"165\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"145\" y=\"195\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n    <text x=\"145\" y=\"217\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.50</text>\n\n    <rect x=\"90\" y=\"295\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"165\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"165\" y=\"348\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2</text>\n\n    <rect x=\"350\" y=\"180\" width=\"165\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"432\" y=\"214\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n    <text x=\"432\" y=\"238\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1</text>\n    <text x=\"432\" y=\"260\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rota default</text>\n\n    <rect x=\"590\" y=\"170\" width=\"165\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"672\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text>\n    <text x=\"672\" y=\"229\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela de rotas</text>\n    <text x=\"672\" y=\"252\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TTL -1</text>\n\n    <rect x=\"805\" y=\"145\" width=\"135\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"872\" y=\"179\" text-anchor=\"middle\" class=\"svg-label\">Servidor</text>\n    <text x=\"872\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">203.0.113.20</text>\n\n    <line x1=\"220\" y1=\"200\" x2=\"350\" y2=\"222\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"515\" y1=\"225\" x2=\"590\" y2=\"225\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"755\" y1=\"218\" x2=\"805\" y2=\"195\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n\n    <line x1=\"805\" y1=\"215\" x2=\"755\" y2=\"245\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"590\" y1=\"252\" x2=\"515\" y2=\"252\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"350\" y1=\"250\" x2=\"220\" y2=\"220\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n\n    <rect x=\"330\" y=\"340\" width=\"450\" height=\"145\" rx=\"16\" class=\"content-card\"></rect>\n    <text x=\"555\" y=\"370\" text-anchor=\"middle\" class=\"svg-label\">Decisões da Camada 3</text>\n    <text x=\"360\" y=\"402\" class=\"svg-label svg-label--small\">1. Destino está na minha rede?</text>\n    <text x=\"360\" y=\"428\" class=\"svg-label svg-label--small\">2. Se não estiver, qual é o próximo salto?</text>\n    <text x=\"360\" y=\"454\" class=\"svg-label svg-label--small\">3. Qual rota da tabela combina melhor?</text>\n    <text x=\"360\" y=\"480\" class=\"svg-label svg-label--small\">4. Reduzir TTL e encaminhar ou descartar.</text>\n\n    <text x=\"145\" y=\"455\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2 entrega ao MAC do gateway.</text>\n    <text x=\"650\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 3 escolhe caminhos entre redes.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> a Camada 3 leva pacotes entre redes: o host decide entre entrega local e gateway; cada roteador escolhe só o próximo salto.</li>\n    <li>IP e máscara definem a rede local; o resto segue a rota default.</li>\n    <li>Na tabela de rotas vence a rota mais específica (maior prefixo).</li>\n    <li>Cada roteador decrementa o TTL; em zero, o pacote é descartado.</li>\n    <li>Os MACs mudam a cada enlace; os IPs de origem e destino normalmente ficam.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 2.6, Camada 4 — Transporte: TCP, UDP, portas e conexões, você verá como, depois que o pacote chega ao host certo, as portas e conexões entregam os dados ao programa correto.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3"
    ],
    "tcpIpLayers": [
      "Internet"
    ],
    "relatedProtocols": [
      "IPv4",
      "IPv6",
      "ICMP",
      "ARP",
      "OSPF",
      "BGP"
    ],
    "dependsOn": [
      "Camada 1",
      "Camada 2",
      "encapsulamento",
      "frames",
      "MAC",
      "ARP",
      "métricas"
    ],
    "enables": [
      "roteamento",
      "gateway padrão",
      "traceroute",
      "NAT",
      "VPN",
      "firewall",
      "cloud networking",
      "TCP",
      "UDP"
    ]
  },
  "lab": {
    "id": "lab-2.5",
    "title": "Coletando evidências de Camada 3: IP, gateway, rotas e TTL",
    "labType": "local",
    "objective": "Encontrar o IP, a máscara e o gateway do seu computador, ler a tabela de rotas e ver, com o traceroute, os saltos até um destino externo.",
    "tools": [
      "Windows: Prompt de Comando ou PowerShell",
      "Linux: terminal (traceroute ou tracepath)"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Coletar IP, máscara e gateway",
        "instruction": "Na interface ativa, identifique o IPv4, a máscara (ou o prefixo) e o gateway padrão. Aplique a máscara ao seu IP e escreva qual é a sua rede local.",
        "command": "Windows: ipconfig /all\nLinux: ip addr",
        "expectedOutput": "A interface ativa com IPv4 e máscara (no Linux, um prefixo como 192.168.1.50/24). O Windows também mostra o gateway padrão; no Linux, ele aparece no passo 2.",
        "explanation": "IP, máscara e gateway são as três peças que o host usa para decidir entre entrega local e gateway. Com 192.168.1.50/24, por exemplo, a rede local é 192.168.1.0/24."
      },
      {
        "number": 2,
        "title": "Ler a tabela de rotas",
        "instruction": "Liste a tabela de rotas e localize a rota default e a rota da rede conectada. Depois, para dois destinos, um IP da sua própria rede e 8.8.8.8, diga qual rota vence e qual é o próximo salto.",
        "command": "Windows: route print\nLinux: ip route",
        "expectedOutput": "Uma rota default (default via <gateway> no Linux; destino 0.0.0.0 com máscara 0.0.0.0 no Windows) e a rota da rede conectada. O IP da sua rede usa a rede conectada; 8.8.8.8 só combina com a default e vai ao gateway.",
        "explanation": "Quando várias rotas combinam com o destino, vence a mais específica (maior prefixo). A default só é usada quando nenhuma outra combina."
      },
      {
        "number": 3,
        "title": "Testar o gateway",
        "instruction": "Pingue o gateway encontrado no passo 1.",
        "command": "ping <IP_DO_GATEWAY>",
        "expectedOutput": "Respostas em poucos milissegundos, ou nenhuma resposta se o gateway filtrar ICMP.",
        "explanation": "Se o gateway responde, a saída da rede local está ok, mas isso não prova que existe caminho até redes remotas. Se não responde e o ICMP não é filtrado, o problema está antes dele: cabo, Wi-Fi, IP, máscara ou VLAN."
      },
      {
        "number": 4,
        "title": "Observar os saltos pelo TTL",
        "instruction": "Rode o traceroute até 8.8.8.8 e compare o primeiro salto com o gateway do passo 1.",
        "command": "Windows: tracert 8.8.8.8\nLinux: traceroute 8.8.8.8 (ou tracepath 8.8.8.8)",
        "expectedOutput": "Uma lista numerada de saltos; o primeiro é o seu gateway. Alguns saltos podem aparecer como asteriscos.",
        "explanation": "Cada salto é um roteador em que o TTL da sonda chegou a zero e que devolveu um ICMP Time Exceeded. O primeiro é o gateway porque é para ele que a rota default manda tudo o que não é local."
      }
    ],
    "expectedResult": "Você identificou a sua rede local, viu a rota default apontando para o gateway, escolheu a rota que vence para dois destinos e viu o gateway como primeiro salto do traceroute."
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "Um host 192.168.10.50 foi configurado por engano com máscara /16 em vez de /24. Ele acessa a internet, mas não alcança o servidor 192.168.20.10, que fica em outra sub-rede /24 atrás do roteador. Por quê?",
      "hints": [
        "Aplique a máscara /16 aos dois endereços.",
        "Pense no que o host faz quando acha que o destino é local."
      ],
      "expectedIdeas": [
        "com /16, 192.168.20.10 parece estar na rede local",
        "o host tenta entregar direto via ARP, em vez de usar o gateway",
        "ninguém responde ao ARP na LAN",
        "8.8.8.8 continua fora da /16 e vai ao gateway"
      ],
      "explanation": "Com /16, a rede local vira 192.168.0.0/16 e 192.168.20.10 parece fazer parte dela. O host tenta entregar localmente via ARP, mas o servidor está em outro segmento e não responde. Destinos como 8.8.8.8 continuam fora da /16 e seguem para o gateway, por isso a internet funciona."
    },
    {
      "type": "diagnóstico",
      "question": "Você roda tracert até um site. O salto 1 é 192.168.1.1, o salto 3 aparece como * * * e os saltos 4 a 9 respondem normalmente, até o destino. O roteador do salto 3 está com defeito? O que esse resultado mostra?",
      "hints": [
        "Os pacotes passaram pelo salto 3 para chegar aos saltos seguintes?",
        "Lembre o que o asterisco significa no traceroute."
      ],
      "expectedIdeas": [
        "os saltos seguintes responderam, então o salto 3 encaminhou o tráfego",
        "ele só não devolveu o ICMP Time Exceeded (filtro)",
        "traceroute é evidência parcial"
      ],
      "explanation": "As sondas passaram pelo salto 3 para chegar aos seguintes: ele encaminha pacotes, só não responde quando o TTL zera nele, provavelmente por filtrar ICMP. Falha seria a lista parar ali e nunca chegar ao destino."
    }
  ],
  "quiz": [
    {
      "id": "q2.5.1",
      "question": "Qual é a principal função da Camada 3 no Modelo OSI?",
      "options": [
        "Entregar quadros dentro da rede local usando endereços MAC.",
        "Encaminhar pacotes entre redes usando endereços lógicos (IP).",
        "Garantir a entrega confiável dos dados com confirmações e retransmissões.",
        "Traduzir nomes de domínio em endereços IP."
      ],
      "answer": 1,
      "explanation": "A Camada 3 trata endereçamento lógico e roteamento entre redes. Entrega local por MAC é Camada 2, entrega confiável fica com a Camada 4 (o IP não garante entrega) e tradução de nomes é papel do DNS.",
      "topic": "camada 3",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.5.2",
      "question": "Um host acessa outro dispositivo na mesma LAN, mas não alcança 8.8.8.8 nem pelo IP. Qual item de Camada 3 deve ser verificado cedo?",
      "options": [
        "Servidor DNS configurado no host.",
        "Tabela MAC do switch de acesso.",
        "Gateway padrão e rota default.",
        "Rota da rede local conectada."
      ],
      "answer": 2,
      "explanation": "A entrega local funciona, então a Camada 2 e a rota da rede conectada estão ok; como o teste é por IP, DNS não explica a falha. Sem gateway ou rota default, o host fica limitado à rede local.",
      "topic": "gateway",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q2.5.3",
      "question": "Qual afirmação diferencia MAC e IP corretamente?",
      "options": [
        "O MAC é usado na entrega dentro de cada enlace; o IP identifica origem e destino lógicos entre redes.",
        "O IP substitui o MAC quando o destino está na mesma LAN.",
        "O MAC de destino permanece o mesmo do host até o servidor final.",
        "O IP de destino muda a cada roteador, enquanto o MAC fica fixo."
      ],
      "answer": 0,
      "explanation": "MAC e IP coexistem no encapsulamento: o frame (e seus MACs) é refeito a cada enlace, enquanto o IP de destino normalmente fica de ponta a ponta.",
      "topic": "mac vs ip",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q2.5.4",
      "question": "Por que uma rede plana, com rotas amplas entre segmentos, aumenta o risco?",
      "options": [
        "Porque o excesso de rotas impede a autenticação dos usuários.",
        "Porque rotas amplas desativam os firewalls entre as redes.",
        "Porque o TTL dos pacotes expira mais rápido em redes grandes.",
        "Porque um host comprometido alcança muitos segmentos, o que facilita o movimento lateral."
      ],
      "answer": 3,
      "explanation": "Rotas definem alcance. Quanto maior o alcance sem política entre segmentos, maior o impacto de um comprometimento.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q2.5.7",
      "question": "A tabela de um roteador tem 10.0.0.0/8 via R1, 10.20.0.0/16 via R2 e 0.0.0.0/0 via R3. Para onde vai um pacote destinado a 10.20.5.5?",
      "options": [
        "Para R1, porque 10.0.0.0/8 foi a primeira rota da tabela que combinou.",
        "Para R2, porque 10.20.0.0/16 é a rota mais específica que combina.",
        "Para R3, porque destinos fora da rede local sempre usam a rota default.",
        "Para R1 e R2 ao mesmo tempo, dividindo a carga."
      ],
      "answer": 1,
      "explanation": "As três rotas combinam com 10.20.5.5, mas vence a de maior prefixo (/16). A default (/0) só é usada quando nenhuma outra combina.",
      "topic": "tabela de rotas",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.5.6",
      "question": "O que o TTL ajuda a evitar?",
      "options": [
        "Que dois hosts usem o mesmo endereço IP na rede local.",
        "Perda de pacotes por congestionamento no enlace.",
        "Pacotes circulando indefinidamente em loops de roteamento.",
        "Entrega de pacotes ao MAC de destino errado."
      ],
      "answer": 2,
      "explanation": "Cada roteador decrementa o TTL; ao chegar a zero, o pacote é descartado. É o mesmo mecanismo que o traceroute explora para descobrir os saltos.",
      "topic": "ttl",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.5.1",
      "front": "O que é gateway padrão?",
      "back": "É o próximo salto usado por um host para alcançar destinos fora da rede local.",
      "tags": [
        "gateway",
        "camada 3"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.2",
      "front": "O que a tabela de rotas decide?",
      "back": "Qual próximo salto ou interface usar para alcançar um destino IP. Quando várias rotas combinam, vence a mais específica (maior prefixo).",
      "tags": [
        "rotas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.7",
      "front": "O que acontece quando o TTL chega a zero?",
      "back": "O roteador descarta o pacote e pode devolver ICMP Time Exceeded. O traceroute usa isso para descobrir cada salto.",
      "tags": [
        "ttl",
        "traceroute"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.4",
      "front": "MAC muda a cada salto roteado?",
      "back": "Sim, o encapsulamento de Camada 2 muda a cada enlace; IP de origem/destino normalmente permanece.",
      "tags": [
        "mac",
        "ip"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.5.5",
      "front": "DNS resolve problema de rota?",
      "back": "Não. DNS traduz nomes; rota/gateway determinam caminho de rede.",
      "tags": [
        "dns",
        "roteamento"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.6",
      "front": "Conectividade é autorização?",
      "back": "Não. Alcançar uma rede não significa ter permissão para acessar serviços.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex2.5.6",
      "type": "comando/output",
      "prompt": "Um host tem esta tabela: default via 10.1.1.1; 172.16.0.0/16 via 10.1.1.254; 10.1.1.0/24 conectada. Para 172.16.5.9, 10.1.1.77 e 1.1.1.1, qual rota vence e qual é o próximo salto?",
      "expectedAnswer": "172.16.5.9: rota 172.16.0.0/16, próximo salto 10.1.1.254. 10.1.1.77: rede conectada 10.1.1.0/24, entrega local via ARP. 1.1.1.1: só a default combina, próximo salto 10.1.1.1.",
      "explanation": "Vence a rota mais específica que combina com o destino; a default só é usada quando nenhuma outra combina."
    },
    {
      "id": "ex2.5.7",
      "type": "conceitual",
      "prompt": "Seu notebook 192.168.50.20/24, com gateway 192.168.50.1, acessa o servidor 203.0.113.20. O pacote sai com TTL 64 e passa por três roteadores (o gateway e mais dois) até o servidor. (a) No quadro que sai do notebook, qual é o MAC de destino e qual é o IP de destino? (b) Com que TTL o pacote chega ao servidor? E se, por um erro de rotas, ele ficasse girando entre dois roteadores?",
      "expectedAnswer": "(a) MAC de destino: o do gateway 192.168.50.1, descoberto via ARP; IP de destino: 203.0.113.20. (b) 64 - 3 = 61. Num loop, cada passagem tira 1 do TTL; quando ele chega a zero, o roteador descarta o pacote e pode devolver um ICMP Time Exceeded.",
      "explanation": "O quadro é refeito a cada enlace, o IP de destino fica de ponta a ponta e cada roteador tira 1 do TTL."
    }
  ],
  "challenge": {
    "title": "Filial acessa internet, mas não acessa sistema no datacenter",
    "scenario": "Uma filial usa a rede 10.20.10.0/24 e se liga ao datacenter, que usa 10.50.30.0/24, por um link entre os roteadores das duas pontas. Os usuários acessam a internet normalmente, mas não conseguem acessar o sistema 10.50.30.20 no datacenter. O gateway local responde ao ping e o DNS resolve o nome do sistema para o IP correto.",
    "tasks": [
      "Listar hipóteses de Camada 3 em ordem lógica, do host até o datacenter e de volta.",
      "Indicar o comando ou a evidência que confirma ou descarta cada hipótese.",
      "Explicar para onde vai o pacote se o gateway da filial não tiver rota para 10.50.30.0/24."
    ],
    "expectedDeliverables": [
      "Uma tabela curta com hipótese, evidência e resultado esperado."
    ]
  },
  "commentedSolution": {
    "reasoning": "Internet funcionando e DNS resolvendo descartam IP, máscara e gateway do host e a resolução de nomes. A falha está no caminho específico até 10.50.30.20 ou na volta. Siga o pacote salto a salto.",
    "steps": [
      "Host: route print ou ip route. 10.50.30.20 não está na rede local 10.20.10.0/24, então o pacote vai ao gateway.",
      "Caminho: tracert 10.50.30.20. O primeiro salto deve ser o gateway da filial; veja onde a lista para.",
      "Rota de ida: o gateway da filial precisa de uma rota para 10.50.30.0/24 (ou uma rede maior que a contenha) apontando para o link do datacenter. Sem ela, o destino só combina com a default e o pacote vai para o provedor de internet: o traceroute mostra saltos do provedor.",
      "Rota de volta: o roteador do datacenter precisa de uma rota para 10.20.10.0/24. Sem ela, o pedido chega, mas a resposta se perde.",
      "Política: com rota nos dois sentidos, verifique com a equipe responsável se um firewall entre as redes bloqueia o fluxo."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Trocar o DNS.",
        "whyItIsWrong": "O enunciado diz que o DNS resolve corretamente; o problema está depois da tradução do nome."
      },
      {
        "answer": "Concluir que o servidor está fora do ar sem validar as rotas.",
        "whyItIsWrong": "A falha pode estar na rota de ida, na de volta ou num firewall no caminho."
      }
    ],
    "finalAnswer": "Hipótese principal: falta rota entre 10.20.10.0/24 e 10.50.30.0/24, na ida (o pacote segue a default para a internet) ou na volta; depois, um firewall no caminho. Confirme com ip route/route print, tracert e as tabelas de rotas dos roteadores."
  },
  "glossary": [
    {
      "term": "ICMP",
      "shortDefinition": "Protocolo de mensagens de controle e de erro do IP. O ping e o Time Exceeded que o traceroute recebe são mensagens ICMP.",
      "relatedLessons": [
        "1.9",
        "4.8"
      ]
    },
    {
      "term": "ARP",
      "shortDefinition": "Protocolo que descobre o MAC correspondente a um IP da rede local, como o MAC do gateway.",
      "relatedLessons": [
        "2.4",
        "3.5"
      ]
    },
    {
      "term": "NAT",
      "shortDefinition": "Tradução de endereços: o roteador troca o IP de origem dos computadores da rede interna pelo seu próprio IP ao enviar para a internet, e desfaz a troca na resposta.",
      "relatedLessons": [
        "6.7",
        "7.8"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.2 Encapsulamento, desencapsulamento e PDUs",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para entender pacote como PDU de Camada 3."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.4 Camada 2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para diferenciar entrega local por MAC e encaminhamento por IP."
    },
    {
      "type": "rfc",
      "title": "Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Referência histórica do IPv4."
    },
    {
      "type": "rfc",
      "title": "Internet Control Message Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc792",
      "note": "Base conceitual para mensagens ICMP usadas em diagnóstico."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud Networking",
      "lesson": "subnets-route-tables",
      "reason": "Route tables, gateways e peering em cloud dependem do raciocínio de Camada 3."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso entre serviços",
      "lesson": "service-to-service-connectivity",
      "reason": "Conectividade de rede não substitui autenticação/autorização, mas é pré-requisito para muitos fluxos de identidade."
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
      "2.6"
    ]
  }
};
