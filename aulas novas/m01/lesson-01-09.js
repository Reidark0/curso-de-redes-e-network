export const lesson0109 = {
  "id": "1.9",
  "moduleId": "m01",
  "order": 9,
  "title": "Diagnóstico inicial: ipconfig, ping, arp, tracert e nslookup",
  "subtitle": "Como coletar evidências básicas de configuração, alcance, vizinhança local, caminho e DNS antes de formular hipóteses.",
  "duration": "20-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "fundamentos",
    "diagnóstico",
    "troubleshooting",
    "ipconfig",
    "ping",
    "arp",
    "tracert",
    "nslookup",
    "dns",
    "icmp",
    "gateway",
    "evidências",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "Pensamento em camadas é necessário para diagnosticar sem pular etapas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.7",
      "reason": "É necessário entender os papéis de equipamentos como NIC, switch, roteador, AP e firewall."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.8",
      "reason": "Métricas ajudam a interpretar latência, perda e disponibilidade durante os testes iniciais."
    }
  ],
  "objectives": [
    "Explicar que pergunta ipconfig, ping, arp, tracert e nslookup respondem e o que cada um não prova.",
    "Seguir uma sequência de diagnóstico (configuração local, gateway, destino por IP, nome) para localizar onde a comunicação para antes de culpar rede, aplicação ou DNS.",
    "Interpretar resultados comuns: IP 169.254.x.x, gateway vazio, \"Esgotado o tempo limite\" × \"Host de destino inacessível\", asteriscos no tracert e NXDOMAIN × timeout no nslookup."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Você já viu o ícone do Wi‑Fi conectado e, mesmo assim, nenhum site abrir. A reação comum é reiniciar o roteador, desligar o notebook ou ligar para o suporte dizendo que “a internet caiu”. Às vezes funciona, mas ninguém descobre o que estava errado, e o problema volta. Na empresa é pior: um chamado genérico para “a rede” faz o time errado passar horas procurando uma falha que estava, por exemplo, no servidor DNS configurado no próprio notebook.</p>\n  <p>Cinco comandos que já vêm no Windows e no Linux mostram em poucos minutos onde a comunicação para: no próprio computador, na rede local, no caminho ou na tradução de nomes. Nesta aula você aprende que pergunta cada um responde e o que ele <strong>não</strong> prova. É o primeiro passo de qualquer analista de suporte, redes ou segurança antes de recorrer a ferramentas avançadas.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando se tenta resolver um sintoma sem saber em que ponto ele nasce. Para o usuário, “não acessa” é sempre igual, mas a causa pode ser um host sem endereço válido, a falta do gateway (o roteador que leva o tráfego para fora da rede local), um gateway que não responde, um caminho interrompido, um nome que não vira IP ou o próprio serviço fora do ar.</p>\n  <p>Testar ao acaso gasta tempo e leva a conclusões erradas, como investigar o DNS de um host que nem recebeu IP. A saída é testar em ordem, do mais próximo para o mais distante, e só subir um degrau quando o anterior estiver confirmado. Esta aula mostra essa sequência, o que cada comando revela e como ler as respostas mais comuns.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> diagnóstico inicial de rede é a coleta ordenada de evidências básicas (configuração local, gateway, alcance, caminho e resolução de nomes) para descobrir em que ponto a comunicação para, antes de formular hipóteses mais avançadas.</div>\n  <p>A ordem vai do mais próximo ao mais distante:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Configuração local:</strong> o host tem IP válido, gateway e servidor DNS?</li>\n    <li><strong>Gateway e rede local:</strong> o gateway responde e o host conhece o endereço físico (MAC) dele?</li>\n    <li><strong>Destino por IP e caminho:</strong> um IP fora da rede local responde? Por quais roteadores o tráfego passa?</li>\n    <li><strong>Nome:</strong> o DNS, serviço que traduz nomes como <code>example.com</code> em IPs, responde com o endereço certo?</li>\n  </ol>\n  <p>Cada comando responde a uma pergunta e tem um limite claro. Os equivalentes no Linux estão entre parênteses.</p>\n  <div class=\"responsive-table\"><table class=\"data-table comparison-table\">\n    <thead><tr><th>Comando</th><th>Pergunta que responde</th><th>O que não prova</th></tr></thead>\n    <tbody>\n      <tr><td><code>ipconfig /all</code> (<code>ip addr</code>, <code>ip route</code>)</td><td>Qual IP, máscara, gateway e DNS o host tem? Veio do DHCP?</td><td>Que o gateway ou o destino respondem.</td></tr>\n      <tr><td><code>ping</code></td><td>O destino responde a ICMP? Em quanto tempo?</td><td>Que a aplicação funciona; e a falta de resposta não prova que o destino está fora, porque ICMP pode ser bloqueado.</td></tr>\n      <tr><td><code>arp -a</code> (<code>ip neigh</code>)</td><td>O IP de um vizinho da rede local, como o gateway, já foi associado a um MAC?</td><td>Nada além da rede local: ARP não atravessa roteadores.</td></tr>\n      <tr><td><code>tracert</code> (<code>traceroute</code>, <code>tracepath</code>)</td><td>Quais roteadores (saltos) aparecem até o destino?</td><td>Onde está a falha: roteadores podem não responder ao teste e ainda assim encaminhar o tráfego.</td></tr>\n      <tr><td><code>nslookup</code> (também no Linux, ou <code>dig</code>)</td><td>O nome vira IP? Para qual IP? Qual servidor DNS respondeu?</td><td>Que o destino aceita a conexão ou que a aplicação funciona.</td></tr>\n    </tbody>\n  </table></div>\n  <p>Se tudo isso responde e a aplicação ainda falha, o problema está na porta ou na própria aplicação, que se testam com outras ferramentas, vistas mais adiante no curso.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <ul>\n    <li><strong><code>ipconfig /all</code>:</strong> só lê a configuração das placas de rede do Windows: endereço IPv4, máscara, gateway padrão, servidores DNS, se o DHCP está habilitado e qual servidor DHCP entregou o endereço. Não envia nada pela rede.</li>\n    <li><strong><code>ping</code>:</strong> envia uma mensagem ICMP Echo Request e espera um Echo Reply. Mede o tempo de ida e volta (a latência da aula 1.8), mas não testa a porta nem a aplicação do destino.</li>\n    <li><strong><code>arp -a</code>:</strong> para entregar algo a um vizinho da rede local, o host usa o ARP: pergunta à rede “quem tem este IP?” e guarda o MAC de quem respondeu. O comando mostra essa tabela ARP, com os IPs locais já associados a um MAC. Para falar com um destino de outra rede, o host só precisa do MAC do gateway; por isso servidores da internet nunca aparecem ali.</li>\n    <li><strong><code>tracert</code>:</strong> envia pacotes com TTL crescente (1, 2, 3…). Cada roteador diminui o TTL em 1; o que o zera descarta o pacote e pode avisar a origem, revelando um salto do caminho.</li>\n    <li><strong><code>nslookup</code>:</strong> pergunta um nome ao servidor DNS configurado (ou a outro, se você indicar: <code>nslookup example.com 8.8.8.8</code>) e mostra qual servidor respondeu e os IPs retornados.</li>\n  </ul>\n  <h3>Como ler os resultados</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>O que você vê</th><th>O que indica</th><th>Próximo passo</th></tr></thead>\n    <tbody>\n      <tr><td><code>ipconfig</code> com IPv4 <code>169.254.x.x</code> (APIPA)</td><td>O host não recebeu configuração do DHCP e criou um endereço provisório, que só serve para a rede local.</td><td>Investigar cabo, Wi‑Fi e DHCP antes de DNS ou aplicação.</td></tr>\n      <tr><td>Gateway padrão vazio</td><td>Sem rota padrão: o host fala com a própria sub-rede, mas não sabe para onde mandar tráfego de outras redes.</td><td>Revisar DHCP ou a configuração manual.</td></tr>\n      <tr><td>Servidor DNS desconhecido (não é o da empresa nem o do roteador)</td><td>Configuração manual, DHCP indevido ou comprometimento.</td><td>Comparar com o padrão esperado e acionar segurança se não houver explicação.</td></tr>\n      <tr><td><code>ping</code>: “Esgotado o tempo limite do pedido”</td><td>Nenhuma resposta voltou: ICMP filtrado, destino fora ou caminho interrompido.</td><td>Testar o gateway e outros destinos para isolar o ponto.</td></tr>\n      <tr><td><code>ping</code>: “Resposta de &lt;IP&gt;: Host de destino inacessível”</td><td>O equipamento cujo IP aparece (o próprio host ou um roteador) avisou que não consegue entregar, por exemplo porque o ARP ficou sem resposta ou falta rota.</td><td>Se o IP for o do próprio host, olhar o ARP e a rede local; se for um roteador, olhar a rota a partir dele.</td></tr>\n      <tr><td><code>tracert</code> com <code>* * *</code> em um salto, mas o destino final responde</td><td>Esse roteador não responde ao TTL expirado ou limita as respostas.</td><td>Não concluir falha; correlacionar com outras evidências.</td></tr>\n      <tr><td><code>nslookup</code> com NXDOMAIN (“Non-existent domain”)</td><td>O servidor DNS respondeu que o nome não existe para ele.</td><td>Conferir o nome e o servidor consultado: nomes internos da empresa só existem no DNS da empresa.</td></tr>\n      <tr><td><code>nslookup</code> com timeout</td><td>O servidor DNS não respondeu.</td><td>Testar o alcance até o servidor DNS e se ele é o esperado.</td></tr>\n    </tbody>\n  </table></div>\n  <div class=\"callout warning\"><strong>Erros comuns</strong><ul>\n    <li>Começar pelo fim: investigar DNS ou aplicação antes de confirmar IP e gateway.</li>\n    <li>Olhar só o endereço IPv4 no <code>ipconfig</code> e ignorar máscara, gateway e DNS.</li>\n    <li>Tratar silêncio como prova: ping sem resposta ou <code>* * *</code> no tracert podem ser só filtros de ICMP.</li>\n  </ul></div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Seu notebook está conectado ao Wi‑Fi de casa, mas nenhum site abre. Você sobe os degraus em ordem:</p>\n  <ol class=\"flow-list\">\n    <li><code>ipconfig /all</code> mostra IPv4 <code>192.168.0.23</code>, máscara <code>255.255.255.0</code>, gateway <code>192.168.0.1</code> e servidor DNS <code>192.168.0.1</code> (o próprio roteador). Configuração local: ok.</li>\n    <li><code>ping 192.168.0.1</code> recebe 4 respostas em cerca de 3 ms, e <code>arp -a</code> mostra o IP <code>192.168.0.1</code> associado a um MAC. Gateway: ok.</li>\n    <li><code>ping 8.8.8.8</code> (um servidor público do Google) recebe respostas em cerca de 20 ms. A saída para a internet por IP funciona.</li>\n    <li><code>nslookup example.com</code> termina em timeout: o servidor DNS <code>192.168.0.1</code> não respondeu.</li>\n  </ol>\n  <p>Conclusão: o problema não é o Wi‑Fi nem “a internet”, e sim a resolução de nomes. Para confirmar, pergunte a outro servidor: <code>nslookup example.com 8.8.8.8</code>. Se esse responder com um IP, o defeito está no DNS do roteador, e é isso que você relata, em vez de “a internet caiu”.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 430\" role=\"img\" aria-labelledby=\"m01l09-title m01l09-desc\">\n    <title id=\"m01l09-title\">Sequência de diagnóstico inicial de rede</title>\n    <desc id=\"m01l09-desc\">Fluxo mostrando host, configuração local, ARP, gateway, caminho, DNS e serviço, associado aos comandos ipconfig, ping, arp, tracert e nslookup.</desc>\n    <defs>\n      <marker id=\"m01l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"60\" width=\"145\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"107\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n    <text x=\"107\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ipconfig</text>\n\n    <rect x=\"235\" y=\"60\" width=\"145\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"307\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Rede local</text>\n    <text x=\"307\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">arp -a</text>\n\n    <rect x=\"435\" y=\"60\" width=\"145\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"507\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n    <text x=\"507\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ping gateway</text>\n\n    <rect x=\"635\" y=\"60\" width=\"145\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"707\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Caminho</text>\n    <text x=\"707\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tracert</text>\n\n    <rect x=\"835\" y=\"60\" width=\"110\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"890\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Serviço</text>\n    <text x=\"890\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">destino</text>\n\n    <line x1=\"180\" y1=\"95\" x2=\"235\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l09-arrow)\"></line>\n    <line x1=\"380\" y1=\"95\" x2=\"435\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l09-arrow)\"></line>\n    <line x1=\"580\" y1=\"95\" x2=\"635\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l09-arrow)\"></line>\n    <line x1=\"780\" y1=\"95\" x2=\"835\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l09-arrow)\"></line>\n\n    <rect x=\"90\" y=\"210\" width=\"180\" height=\"90\" rx=\"12\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"180\" y=\"240\" text-anchor=\"middle\" class=\"svg-label\">DNS</text>\n    <text x=\"180\" y=\"265\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">nslookup</text>\n    <text x=\"180\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">nome → IP</text>\n\n    <rect x=\"360\" y=\"205\" width=\"255\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"487\" y=\"235\" text-anchor=\"middle\" class=\"svg-label\">Interpretação</text>\n    <text x=\"487\" y=\"260\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">configuração, alcance, ARP, rota, DNS</text>\n    <text x=\"487\" y=\"282\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">evidência antes da hipótese</text>\n\n    <rect x=\"700\" y=\"210\" width=\"200\" height=\"90\" rx=\"12\" class=\"svg-node svg-node--attacker\"></rect>\n    <text x=\"800\" y=\"238\" text-anchor=\"middle\" class=\"svg-label\">Sinais de alerta</text>\n    <text x=\"800\" y=\"263\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 169.254.x.x</text>\n    <text x=\"800\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNS desconhecido</text>\n\n    <line x1=\"235\" y1=\"210\" x2=\"360\" y2=\"250\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m01l09-arrow)\"></line>\n    <line x1=\"615\" y1=\"250\" x2=\"700\" y2=\"250\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m01l09-arrow)\"></line>\n\n    <text x=\"490\" y=\"370\" text-anchor=\"middle\" class=\"svg-label\">Diagnóstico inicial: colete sinais pequenos, interprete em ordem e só então formule a hipótese.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> teste em degraus (configuração local, gateway, destino por IP, nome) e anote o que cada teste prova e o que não prova.</li>\n    <li><code>ipconfig</code>: configuração; <code>ping</code>: alcance ICMP; <code>arp -a</code>: vizinho virou MAC; <code>tracert</code>: saltos; <code>nslookup</code>: nome vira IP.</li>\n    <li>IP <code>169.254.x.x</code> aponta para DHCP; sem gateway, o host não sai da rede local.</li>\n    <li>Funciona por IP e falha por nome: investigue o DNS.</li>\n    <li>Ping sem resposta ou <code>* * *</code> no tracert não provam falha.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, a revisão e o mini-projeto do Módulo 1, você vai mapear sua rede usando estes comandos como fonte de evidências.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "ARP",
      "ICMP",
      "IPv4",
      "IPv6",
      "DNS",
      "TCP",
      "UDP"
    ],
    "dependsOn": [
      "pensamento em camadas",
      "equipamentos de rede",
      "métricas",
      "gateway",
      "DNS",
      "endereçamento"
    ],
    "enables": [
      "troubleshooting profissional",
      "mapeamento de rede",
      "análise de incidentes",
      "diagnóstico de DNS",
      "diagnóstico de conectividade"
    ]
  },
  "lab": {
    "id": "lab-1.9",
    "title": "Diagnóstico inicial na sua própria rede",
    "labType": "security",
    "objective": "Rodar a sequência de diagnóstico no seu computador e anotar o que cada degrau mostra.",
    "prerequisites": [
      "Use só o seu computador e a sua rede, ou uma rede em que você tenha permissão. Nenhum passo altera configuração."
    ],
    "tools": [
      "Prompt de Comando ou PowerShell (Windows), ou terminal (Linux)"
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "number": 1,
        "title": "Ver a configuração local",
        "instruction": "Anote IPv4, máscara, gateway padrão e servidores DNS da interface conectada.",
        "command": "Windows: ipconfig /all\nLinux: ip addr; ip route; cat /etc/resolv.conf",
        "expectedOutput": "Um IPv4 como 192.168.0.23, máscara 255.255.255.0, gateway 192.168.0.1 e ao menos um servidor DNS. No Linux, o gateway está na linha default via de ip route.",
        "explanation": "Um IPv4 169.254.x.x indica que o DHCP não respondeu. No Linux, se resolv.conf mostrar 127.0.0.53, rode resolvectl status para ver o servidor DNS real."
      },
      {
        "number": 2,
        "title": "Testar o gateway e ver a vizinhança",
        "instruction": "Faça ping no gateway do passo 1 e depois veja a tabela ARP.",
        "command": "Windows: ping <IP_DO_GATEWAY> e depois arp -a\nLinux: ping -c 4 <IP_DO_GATEWAY> e depois ip neigh",
        "expectedOutput": "Respostas em poucos milissegundos e o IP do gateway associado a um MAC na tabela.",
        "explanation": "O ping fez o host descobrir o MAC do gateway. Se o ping falhar mas o MAC aparecer, o gateway existe e talvez só filtre ICMP."
      },
      {
        "number": 3,
        "title": "Testar um destino por IP e o caminho",
        "instruction": "Faça ping num IP da internet e veja os saltos até ele. As opções -d (Windows) e -n (Linux) mostram só IPs, o que deixa o teste mais rápido.",
        "command": "Windows: ping 8.8.8.8 e depois tracert -d 8.8.8.8\nLinux: ping -c 4 8.8.8.8 e depois traceroute -n 8.8.8.8 (ou tracepath -n 8.8.8.8)",
        "expectedOutput": "Respostas do ping e uma lista de saltos em que o primeiro é o seu gateway. Alguns saltos podem mostrar * * *.",
        "explanation": "Se o destino final responde, os saltos com * * * só não respondem ao teste; não são pontos de falha."
      },
      {
        "number": 4,
        "title": "Testar a resolução de nomes",
        "instruction": "Consulte um nome que existe, o mesmo nome em outro servidor DNS e um nome que não pode existir (o domínio .invalid é reservado).",
        "command": "nslookup example.com\nnslookup example.com 8.8.8.8\nnslookup teste.invalid",
        "expectedOutput": "As duas primeiras mostram o servidor que respondeu e os IPs de example.com. A terceira termina em Non-existent domain (Windows) ou NXDOMAIN (Linux).",
        "explanation": "NXDOMAIN é uma resposta: o servidor funcionou e disse que o nome não existe. Timeout significa que ele não respondeu."
      }
    ],
    "expectedResult": "Para cada degrau (configuração local, gateway, destino por IP, nome) você tem a evidência coletada e sabe qual comando apontaria uma falha ali."
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Dois colegas estão na mesma sala, no mesmo Wi‑Fi: um acessa tudo, o outro nada. Qual comando você roda primeiro no notebook com problema e o que compara com o do colega?",
      "hints": [
        "Os dois deveriam ter recebido a mesma configuração da rede.",
        "Que linhas do ipconfig /all mudam de um notebook para o outro?"
      ],
      "expectedIdeas": [
        "ipconfig /all nos dois",
        "comparar faixa de IP, máscara, gateway e DNS",
        "169.254.x.x ou DNS diferente"
      ],
      "explanation": "Com a mesma rede, a configuração local deveria ser parecida: mesma faixa de IP, mesma máscara, mesmo gateway e mesmo DNS. A diferença entre os dois ipconfig /all costuma apontar o degrau quebrado, como um IP 169.254.x.x ou um DNS configurado à mão."
    },
    {
      "type": "diagnóstico",
      "question": "O ping para example.com recebe respostas, mas o site não abre no navegador. O que esse teste já provou e o que ainda falta testar?",
      "hints": [
        "Para pingar um nome, o host precisou traduzi-lo.",
        "O ping testa ICMP, não o serviço web."
      ],
      "expectedIdeas": [
        "o nome resolveu",
        "há alcance até o destino",
        "falta testar a porta e a aplicação"
      ],
      "explanation": "O ping por nome provou que o DNS respondeu e que o destino é alcançável por ICMP. Configuração local, gateway, caminho e nome estão ok; o que falta é o serviço web em si (porta e aplicação), que fica fora do diagnóstico inicial."
    }
  ],
  "quiz": [
    {
      "id": "q1.9.1",
      "question": "Qual pergunta o comando ipconfig /all responde melhor?",
      "options": [
        "Se o destino responde a ICMP",
        "Qual configuração de rede local o host possui",
        "Quais saltos existem até o destino",
        "Qual regra exata do firewall bloqueou o tráfego"
      ],
      "answer": 1,
      "explanation": "ipconfig /all mostra a configuração local: IP, máscara, gateway, DNS, DHCP e interfaces. Alcance ICMP, saltos e motivo de bloqueio são papel do ping, do tracert e dos logs do firewall.",
      "topic": "configuração local",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.9.2",
      "question": "Um host acessa um destino por IP, mas falha por nome. Qual comando é mais apropriado para investigar a próxima hipótese?",
      "options": [
        "arp -a",
        "tracert",
        "nslookup",
        "ping <gateway>"
      ],
      "answer": 2,
      "explanation": "Se o acesso por IP funciona, a configuração local, o gateway e o caminho já responderam. O que muda entre os dois testes é a resolução de nome, que se investiga com nslookup ou dig.",
      "topic": "DNS",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q1.9.7",
      "question": "No Windows, ping 192.168.1.50 (mesma sub-rede) retorna “Resposta de 192.168.1.20: Host de destino inacessível”, e 192.168.1.20 é o IP do próprio host. Qual interpretação é mais coerente?",
      "options": [
        "O próprio host não conseguiu entregar: o ARP para 192.168.1.50 provavelmente ficou sem resposta, então investigue a rede local e o destino",
        "O destino respondeu ao ping, mas a aplicação dele está fora",
        "Um firewall na internet filtrou o ICMP",
        "O DNS resolveu o nome para o IP errado"
      ],
      "answer": 0,
      "explanation": "A mensagem vem do IP do próprio host, que avisa que não conseguiu entregar. Na mesma sub-rede isso costuma acontecer quando o ARP não obtém o MAC do destino. Um filtro de ICMP costuma gerar “Esgotado o tempo limite do pedido”, e não há nome envolvido no teste.",
      "topic": "ping",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q1.9.4",
      "question": "O que a tabela ARP (arp -a) mostra principalmente?",
      "options": [
        "Os servidores DNS configurados no host",
        "O MAC de cada servidor da internet que o host acessou",
        "Os saltos até o destino e seus tempos",
        "Associações entre IP e MAC de vizinhos da rede local, como o gateway"
      ],
      "answer": 3,
      "explanation": "ARP resolve apenas vizinhos do mesmo segmento. Para destinos remotos o host usa o MAC do gateway, por isso servidores da internet não aparecem na tabela.",
      "topic": "ARP",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.9.5",
      "question": "O tracert mostra asteriscos em um salto intermediário, mas o destino final responde. Qual interpretação é mais prudente?",
      "options": [
        "A rede está necessariamente quebrada no salto com asteriscos",
        "O roteador pode estar filtrando ou limitando respostas, e é preciso correlacionar evidências",
        "O salto com asteriscos está descartando todo o tráfego até o destino",
        "O gateway local é a causa, porque é o primeiro salto"
      ],
      "answer": 1,
      "explanation": "Nem todo roteador responde a TTL expirado. Asteriscos não são prova isolada de falha.",
      "topic": "tracert",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q1.9.6",
      "question": "Se o host não tem gateway padrão configurado, qual efeito é esperado?",
      "options": [
        "Ele passa a usar o servidor DNS como gateway",
        "Ele perde também a comunicação com hosts da mesma sub-rede",
        "Ele alcança hosts da mesma sub-rede, mas não sabe para onde enviar tráfego destinado a outras redes",
        "Ele resolve por ARP o MAC do destino remoto e envia direto"
      ],
      "answer": 2,
      "explanation": "O gateway padrão é a rota para fora da sub-rede. Sem ele, a comunicação local continua (o ARP resolve vizinhos), mas o tráfego para outras redes não tem para onde ir.",
      "topic": "gateway",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.9.7",
      "front": "O ipconfig mostra IPv4 169.254.x.x. O que isso indica?",
      "back": "APIPA: o host não recebeu configuração IPv4 via DHCP. Investigue cabo, Wi‑Fi e DHCP antes de DNS ou aplicação.",
      "tags": [
        "ipconfig",
        "dhcp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.9.8",
      "front": "O ping falha, mas o site abre no navegador. O que isso indica?",
      "back": "Provavelmente o ICMP é filtrado no caminho ou no destino, enquanto o serviço web responde normalmente. Falta de resposta ao ping não prova queda.",
      "tags": [
        "ping",
        "icmp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.9.9",
      "front": "Por que o MAC de um servidor da internet não aparece no arp -a?",
      "back": "Porque o ARP só resolve vizinhos do mesmo segmento. Para um destino remoto, o host usa o MAC do gateway.",
      "tags": [
        "arp",
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.9.4",
      "front": "Para que serve tracert?",
      "back": "Para ver os saltos (roteadores) até um destino, usando pacotes com TTL crescente. Saltos sem resposta (* * *) não provam falha.",
      "tags": [
        "tracert",
        "rota"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.9.5",
      "front": "Quando usar nslookup?",
      "back": "Para testar a resolução de nomes: para qual IP o nome aponta e qual servidor DNS respondeu.",
      "tags": [
        "dns",
        "nslookup"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.9.10",
      "front": "nslookup: qual a diferença entre NXDOMAIN e timeout?",
      "back": "NXDOMAIN: o servidor DNS respondeu que o nome não existe para ele. Timeout: o servidor DNS não respondeu; teste o alcance até ele.",
      "tags": [
        "dns",
        "nslookup"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.9.2",
      "type": "diagnóstico",
      "prompt": "Um host tem IP válido, gateway configurado e ping para gateway responde. Ping para IP externo falha. Liste três hipóteses.",
      "expectedAnswer": "Algum ponto depois do gateway: falha na saída do roteador ou do provedor, um firewall bloqueando a saída ou o ICMP, ou o próprio destino fora do ar. Um tracert até o destino ajuda a ver até onde o caminho responde.",
      "explanation": "Como configuração local e gateway responderam, a investigação sobe para o caminho e o destino."
    },
    {
      "id": "ex1.9.5",
      "type": "comando/output",
      "prompt": "O ipconfig /all de um notebook mostra: Endereço IPv4 169.254.37.12, máscara 255.255.0.0, gateway padrão vazio, DHCP habilitado: Sim. Qual é a hipótese principal e por que ainda não faz sentido investigar DNS?",
      "expectedAnswer": "O host não recebeu configuração via DHCP (endereço APIPA 169.254.x.x e sem gateway). Investigue cabo ou Wi‑Fi e o servidor DHCP. DNS ainda não faz sentido porque, sem IP válido e sem gateway, o host nem alcança o servidor DNS.",
      "explanation": "Suba a escada em ordem: sem configuração local válida, os degraus seguintes (gateway, caminho, DNS) não têm como funcionar."
    }
  ],
  "challenge": {
    "title": "O sistema interno que não abre",
    "scenario": "No Wi‑Fi da empresa, um usuário abre sites públicos, mas não acessa sistema.interno.empresa.local. O time do sistema diz que ele está no ar. Você coleta: ipconfig /all mostra IPv4 10.20.5.40, máscara 255.255.255.0, gateway 10.20.5.1 e DNS 8.8.8.8; ping 10.20.5.1 responde; nslookup sistema.interno.empresa.local devolve Non-existent domain, respondido por 8.8.8.8. No notebook de um colega que acessa o sistema, o DNS é 10.20.0.10.",
    "tasks": [
      "Dizer em qual degrau está o problema e por quê.",
      "Indicar o comando que confirma a hipótese.",
      "Dizer o que corrige e o que escrever no chamado."
    ],
    "expectedDeliverables": [
      "Uma explicação de 5 a 8 linhas com a hipótese, o comando de confirmação e a correção."
    ]
  },
  "commentedSolution": {
    "reasoning": "Suba os degraus com as evidências que você já tem. A configuração local existe, o gateway responde e sites públicos abrem: o problema está no nome. O detalhe que decide é qual servidor DNS respondeu.",
    "steps": [
      "Configuração local e gateway: ok (IP válido, gateway responde).",
      "Nome: o servidor 8.8.8.8 é um DNS público. Ele respondeu NXDOMAIN, ou seja, funcionou e disse que não conhece o nome. Nomes internos da empresa só existem no DNS da empresa, que no colega é 10.20.0.10.",
      "Confirme perguntando ao DNS interno: nslookup sistema.interno.empresa.local 10.20.0.10. Se ele devolver um IP, a hipótese está confirmada.",
      "O DNS 8.8.8.8 é diferente do esperado: provavelmente foi configurado à mão. Volte o DNS para automático (DHCP) e, se ninguém souber explicar a mudança, avise a segurança."
    ],
    "commonMistakes": [
      "Concluir que o sistema caiu: o time do sistema e o notebook do colega mostram que ele está no ar.",
      "Ler NXDOMAIN como falha do DNS: o servidor respondeu; o problema é ter perguntado ao servidor errado."
    ],
    "finalAnswer": "O host usa o DNS público 8.8.8.8, que não conhece nomes internos e respondeu NXDOMAIN. Confirme com nslookup apontando para 10.20.0.10, volte o DNS para automático e registre no chamado: IP e gateway ok, nome interno não resolve porque o DNS configurado é 8.8.8.8, e não o DNS da empresa."
  },
  "glossary": [
    {
      "term": "ICMP",
      "shortDefinition": "Protocolo de mensagens de controle e erro do IP. O ping usa as mensagens Echo Request e Echo Reply.",
      "example": "Um firewall que bloqueia ICMP faz o ping falhar mesmo com o destino no ar.",
      "relatedLessons": [
        "4.8"
      ]
    },
    {
      "term": "TTL",
      "shortDefinition": "Contador em cada pacote IP que cada roteador diminui em 1; quando chega a zero, o pacote é descartado e o roteador pode avisar a origem.",
      "example": "O tracert envia pacotes com TTL 1, 2, 3… para descobrir cada salto.",
      "relatedLessons": [
        "4.8"
      ]
    },
    {
      "term": "DHCP",
      "shortDefinition": "Serviço que entrega automaticamente IP, máscara, gateway e DNS aos dispositivos da rede.",
      "example": "Sem resposta do DHCP, o Windows assume um endereço 169.254.x.x.",
      "relatedLessons": [
        "7.6"
      ]
    },
    {
      "term": "MAC",
      "shortDefinition": "Endereço físico da placa de rede, usado para entregar dados dentro da rede local.",
      "example": "O arp -a mostra o gateway 192.168.0.1 associado a um MAC como a4-2b-b0-12-34-56.",
      "relatedLessons": [
        "3.2"
      ]
    },
    {
      "term": "Máscara de sub-rede",
      "shortDefinition": "Valor que diz quais endereços IP estão na mesma rede local (sub-rede) que o host; o resto precisa passar pelo gateway.",
      "example": "Com IP 192.168.0.23 e máscara 255.255.255.0, os endereços 192.168.0.x estão na mesma sub-rede.",
      "relatedLessons": [
        "5.2"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Windows ipconfig",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/ipconfig",
      "note": "Referência oficial para uso do ipconfig."
    },
    {
      "type": "official-doc",
      "title": "Windows ping",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/ping",
      "note": "Referência oficial para uso do ping no Windows."
    },
    {
      "type": "official-doc",
      "title": "Windows tracert",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/tracert",
      "note": "Referência oficial para uso do tracert."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m00",
      "note": "Fundamentos de bits, protocolos, métricas e camadas."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e Operação",
      "lesson": "diagnóstico de pipelines e runners",
      "reason": "Falhas de pipeline frequentemente exigem separar DNS, proxy, rota, TLS e autorização."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Federação e Protocolos de Identidade",
      "lesson": "OIDC/SAML em troubleshooting",
      "reason": "Falhas de login podem parecer rede, mas dependem de DNS, HTTPS, redirects, cookies, TLS e identidade."
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
      "1.10"
    ]
  }
};
