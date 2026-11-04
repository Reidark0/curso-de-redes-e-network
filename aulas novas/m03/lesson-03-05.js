export const lesson0305 = {
  "id": "3.5",
  "moduleId": "m03",
  "order": 5,
  "title": "ARP: transformando IPv4 em MAC na rede local",
  "subtitle": "O protocolo que permite ao IPv4 usar Ethernet para entregar frames dentro da LAN.",
  "duration": "90-125 min",
  "estimatedStudyTimeMinutes": 125,
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
    "Explicar por que ARP existe.",
    "Diferenciar IP, MAC, próximo salto e gateway.",
    "Descrever ARP Request, ARP Reply e cache ARP.",
    "Usar comandos defensivos para consultar e interpretar a tabela ARP.",
    "Relacionar ARP com troubleshooting, segurança de LAN e mitigação de riscos."
  ],
  "learningOutcomes": [
    "Dado um IP de destino, o aluno identifica se ARP buscará o MAC do destino ou do gateway.",
    "Dada uma tabela ARP, o aluno interpreta associações IP-MAC e entradas suspeitas.",
    "Dado um problema de conectividade local, o aluno valida IP, máscara, gateway, ARP e VLAN.",
    "Dado um cenário de segurança, o aluno explica riscos defensivos de ARP spoofing sem executar ataque.",
    "Dado um ambiente cloud ou virtual, o aluno transfere o modelo mental de próximo salto para redes abstraídas."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>Você quer acessar <code>192.168.10.1</code>, mas a placa de rede só consegue pôr um frame no cabo se souber o <strong>MAC de destino</strong>. Como o computador descobre qual MAC corresponde àquele IP? É essa pergunta que explica por que um notebook com IP, máscara e gateway corretos ainda pode não falar com o roteador local, e é ela que aparece em falhas de gateway, VLAN errada, impressoras que somem e investigações de ARP spoofing.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> antes de mandar qualquer pacote para fora da rede, o host precisa descobrir o MAC do gateway dentro da LAN. Se o ARP falhar, nada que dependa daquele próximo salto local funciona, e o sintoma parece \"internet fora\".</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>IP e MAC têm escopos diferentes. O IP é um endereço lógico de Camada 3: serve para raciocinar sobre redes, sub-redes e roteamento. O MAC é o endereço de Camada 2 que entrega frames dentro do enlace local. Um pacote IP não atravessa a Ethernet sozinho: ele precisa ir dentro de um frame com MAC de origem e MAC de destino.</p>\n<p>Seria possível manter uma tabela manual IP-MAC em cada host, mas isso quebra em qualquer rede real: placas são trocadas, impressoras entram, VMs aparecem e somem, notebooks mudam de rede. O ARP (Address Resolution Protocol) automatiza essa ligação com um mecanismo simples: perguntar em broadcast quem tem aquele IPv4 e guardar a resposta por algum tempo. Essa simplicidade tem um preço: o ARP foi criado <strong>sem autenticação</strong>, e isso é a origem dos riscos de segurança que você verá adiante.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<div class=\"definition-box\"><strong>ARP</strong> é o protocolo usado no IPv4 para descobrir o endereço MAC associado a um endereço IPv4 <strong>dentro da rede local</strong>. Ele responde a uma única pergunta: \"qual MAC devo usar para entregar este frame ao próximo salto?\"</div>\n<p>O ARP não resolve nomes (isso é DNS), não roteia pacotes (isso é o roteador), não protege a comunicação e não atravessa roteadores: ele fica restrito ao domínio de broadcast, ou seja, à VLAN. No IPv6 não existe ARP clássico; o mesmo problema é resolvido pelo Neighbor Discovery (NDP), sobre ICMPv6.</p>\n<p>A frase \"ARP transforma IPv4 em MAC\" exige um cuidado: o IP que o ARP resolve é o do <strong>próximo salto</strong>, que nem sempre é o destino final.</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Host <code>192.168.1.50/24</code> quer falar com…</th><th>Mesma sub-rede?</th><th>Próximo salto</th><th>ARP pergunta por</th></tr></thead><tbody>\n<tr><td><code>192.168.1.80</code> (impressora)</td><td>Sim</td><td>O próprio destino</td><td>MAC de <code>192.168.1.80</code></td></tr>\n<tr><td><code>203.0.113.10</code> (site externo)</td><td>Não</td><td>Gateway <code>192.168.1.1</code></td><td>MAC de <code>192.168.1.1</code>, nunca o do site</td></tr>\n</tbody></table></div>\n<p>No segundo caso, o gateway recebe o frame local, remove a Camada 2, analisa o pacote IP e decide o próximo salto seguinte.</p>\n<div class=\"callout warning\"><strong>Erros comuns:</strong>\n<ul>\n<li><strong>Confundir ARP com DNS:</strong> você trata uma falha local como falha de nomes e investiga o lugar errado.</li>\n<li><strong>Tratar MAC como identidade forte:</strong> o MAC parece único e físico, mas pode ser falsificado; controle de acesso exige autenticação, NAC e logs.</li>\n<li><strong>Ignorar IP duplicado:</strong> o sintoma é intermitente e parece aleatório; verifique alertas, DHCP e mudança de MAC para o mesmo IP.</li>\n</ul></div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<p>O ARP começa antes da pergunta em broadcast: primeiro o host compara o próprio IP com o IP de destino usando a máscara e decide quem é o próximo salto.</p>\n<ol class=\"flow-list\"><li>O host precisa enviar tráfego para um IP.</li><li>Ele verifica, pela máscara, se o IP está na mesma sub-rede.</li><li>Define o próximo salto: o próprio destino (local) ou o gateway (externo).</li><li>Consulta o cache ARP para ver se já conhece o MAC daquele próximo salto.</li><li>Se não conhece, envia um <strong>ARP Request</strong> em broadcast para <code>ff:ff:ff:ff:ff:ff</code>, que alcança toda a VLAN.</li><li>O dono do IP responde com um <strong>ARP Reply</strong>, normalmente em unicast, direto para quem perguntou.</li><li>O host grava a associação IP-MAC no cache por tempo limitado.</li><li>O pacote IP é encapsulado em um frame Ethernet com o MAC resolvido e sai em unicast.</li></ol>\n<h3>Onde cada etapa pode falhar</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Etapa</th><th>Falha possível</th></tr></thead><tbody>\n<tr><td>Decidir o próximo salto</td><td>Máscara errada faz o host fazer ARP para o alvo errado (um destino remoto tratado como local, ou o contrário).</td></tr>\n<tr><td>Consultar o cache</td><td>Entrada desatualizada, IP duplicado ou MAC inesperado.</td></tr>\n<tr><td>Request em broadcast</td><td>VLAN errada ou broadcast storm: o dono do IP não recebe a pergunta ou não responde de forma confiável.</td></tr>\n<tr><td>Reply</td><td>Resposta indevida, IP duplicado ou spoofing.</td></tr>\n<tr><td>Tráfego unicast</td><td>Mesmo com ARP funcionando, firewall, rota, porta ou aplicação ainda podem falhar.</td></tr>\n</tbody></table></div>\n<h3>Campos da mensagem ARP</h3>\n<p>Num frame Ethernet, o ARP é identificado pelo EtherType <code>0x0806</code>. Os campos que importam numa captura:</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>Tamanho</th><th>Função</th><th>Observação defensiva</th></tr></thead><tbody>\n<tr><td>Hardware Type</td><td>16 bits</td><td>Tecnologia de enlace (Ethernet).</td><td>Estável numa LAN Ethernet; valor inesperado sugere captura fora do contexto.</td></tr>\n<tr><td>Protocol Type</td><td>16 bits</td><td>Protocolo lógico resolvido (IPv4).</td><td>Separa ARP de outros protocolos encapsulados.</td></tr>\n<tr><td>Operation</td><td>16 bits</td><td>1 = Request, 2 = Reply.</td><td>Volume alto de Replies, ou Replies que ninguém pediu, merece investigação.</td></tr>\n<tr><td>Sender MAC / IP</td><td>48 + 32 bits</td><td>Quem anuncia a associação.</td><td>Pode ser falsificado: não é identidade forte.</td></tr>\n<tr><td>Target MAC / IP</td><td>48 + 32 bits</td><td>O IP procurado. No Request, o Target MAC vai zerado, porque é justamente o que se procura.</td><td>Requests para muitos IPs em sequência indicam varredura ou comportamento anômalo.</td></tr>\n</tbody></table></div>\n<h3>Como ler a tabela ARP</h3>\n<pre class=\"code-block\"><code>Linux:   192.168.1.1 dev wlan0 lladdr aa:bb:cc:dd:ee:ff REACHABLE\nWindows: 192.168.1.1           aa-bb-cc-dd-ee-ff     dinâmico</code></pre>\n<p>Cada linha associa um IP a um MAC. No Linux (<code>ip neigh</code>), <code>REACHABLE</code> indica entrada confirmada há pouco, <code>STALE</code> indica entrada ainda utilizável mas não confirmada recentemente, e <code>FAILED</code> indica que o host perguntou e ninguém respondeu. No Windows (<code>arp -a</code>), as entradas aprendidas por ARP aparecem como dinâmicas. Uma entrada do gateway com MAC diferente do documentado, ou que muda ao longo do dia, é uma evidência a investigar, não uma conclusão.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2>\n<p>O ARP vive na fronteira entre Camada 2 e Camada 3: usa broadcast Ethernet para resolver uma necessidade do IPv4. Cada componente da LAN tem um papel nele:</p>\n<ul><li><strong>Host final:</strong> mantém o cache ARP e envia ARP Requests quando precisa.</li><li><strong>Switch:</strong> encaminha o broadcast ARP dentro da VLAN e aprende MACs pelos frames que passam.</li><li><strong>Gateway:</strong> responde ARP pelo IP da sua interface local.</li><li><strong>Firewall roteado:</strong> pode ser o próprio gateway e responder ARP nas redes conectadas.</li><li><strong>VLAN:</strong> limita o alcance do broadcast ARP.</li><li><strong>Cloud/virtualização:</strong> pode esconder o ARP, mas continua trabalhando com interfaces, próximo salto e resolução local, controlada pelo provedor ou pelo hypervisor.</li></ul>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n<p>O IP é o nome de uma pessoa num andar de escritório; para entregar um envelope, você precisa saber em qual mesa ela está. ARP é perguntar em voz alta no andar: \"quem é 192.168.10.1?\" A pessoa certa responde \"sou eu, minha mesa é esta\", e por algum tempo você entrega direto naquela mesa.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> diferente de uma mesa, um MAC pode ser falsificado ou mudar (troca de placa, virtualização, failover), e qualquer um no andar pode responder \"sou eu\".</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Seu notebook tem IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. Você abre um site. O site está fora da sua rede, então o notebook sabe que deve entregar o pacote ao gateway; para pôr o frame no Wi-Fi, ele precisa do MAC do roteador.</p>\n<p>Se o cache ARP já contém <code>192.168.1.1 → aa:bb:cc:dd:ee:ff</code>, o envio segue sem pergunta nova. Se não contém, o notebook envia um ARP Request em broadcast, o roteador responde e a entrada passa a aparecer em <code>arp -a</code>. Só então o notebook consegue enviar frames ao gateway.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n<p>Numa filial, os usuários recebem IP via DHCP mas não acessam os sistemas internos, e o chamado chega como \"problema de DNS ou de firewall\". O analista confere IP, máscara e gateway e depois roda <code>arp -a</code>: o gateway não aparece. A investigação passa para a Camada 2: VLAN, trunk, porta, gateway desligado, firewall local ou bloqueio.</p>\n<p>Em outro cenário, o MAC do gateway muda várias vezes durante o dia. Isso pode ser failover legítimo, IP duplicado, MAC flapping ou comportamento suspeito, e só a correlação com o switch e a documentação diz qual.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud</h2>\n<p>Em cloud pública você raramente vê ARP como numa LAN física: o provedor abstrai a Camada 2 para oferecer redes virtuais isoladas e escaláveis. O modelo mental continua valendo. Se uma VM não acessa um banco privado, as perguntas são as mesmas: a interface tem IP? a subnet está correta? existe rota? o próximo salto é válido? há security group, NSG, NACL, firewall ou tabela de rota bloqueando? A cloud só muda onde a resolução do próximo salto é implementada e quanto dela você enxerga.</p>\n<p>Já em laboratórios com VMs, bridges do Docker ou Kubernetes local (Kind, Minikube), o ARP acontece de verdade entre as interfaces ligadas à mesma bridge virtual. Uma falha que parece de autenticação num runner que acessa um registry interno pode estar no caminho local: bridge, gateway, rota, firewall ou ARP, e um IP duplicado entre VMs causa os mesmos sintomas intermitentes de uma LAN física.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 430\" role=\"img\" aria-labelledby=\"arp-title arp-desc\">\n  <title id=\"arp-title\">ARP resolvendo IPv4 para MAC na rede local</title>\n  <desc id=\"arp-desc\">Host cliente pergunta em broadcast quem possui o IP do gateway. O gateway responde com seu endereço MAC e o cliente passa a enviar o frame unicast.</desc>\n  <defs>\n    <marker id=\"m03l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n  </defs>\n  <rect x=\"40\" y=\"72\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"125\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n  <text x=\"125\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.25</text>\n  <text x=\"125\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC aa:aa...</text>\n  <rect x=\"405\" y=\"72\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"490\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n  <text x=\"490\" y=\"132\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN 10</text>\n  <rect x=\"770\" y=\"72\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"855\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n  <text x=\"855\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.1</text>\n  <text x=\"855\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC bb:bb...</text>\n  <line x1=\"210\" y1=\"116\" x2=\"405\" y2=\"116\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <line x1=\"575\" y1=\"116\" x2=\"770\" y2=\"116\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <text x=\"490\" y=\"55\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP Request: Quem tem 192.168.10.1? Diga para 192.168.10.25</text>\n  <line x1=\"770\" y1=\"205\" x2=\"575\" y2=\"205\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <line x1=\"405\" y1=\"205\" x2=\"210\" y2=\"205\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <text x=\"490\" y=\"240\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP Reply: 192.168.10.1 está em bb:bb:bb:bb:bb:bb</text>\n  <rect x=\"250\" y=\"300\" width=\"480\" height=\"84\" rx=\"14\" class=\"svg-node svg-node--security\" />\n  <text x=\"490\" y=\"328\" text-anchor=\"middle\" class=\"svg-label\">Cache ARP do Host A</text>\n  <text x=\"490\" y=\"354\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1 → bb:bb:bb:bb:bb:bb por tempo limitado</text>\n  <text x=\"490\" y=\"376\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Risco defensivo: ARP não autentica nativamente a resposta</text>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul><li><strong>Ideia central:</strong> o ARP não pergunta onde está o servidor final; ele pergunta qual MAC local deve receber o próximo frame.</li><li><strong>Mecanismo:</strong> o host decide o próximo salto pela máscara, consulta o cache, envia ARP Request em broadcast, recebe ARP Reply em unicast e guarda a associação por tempo limitado.</li><li><strong>Gateway:</strong> para destino externo, o ARP busca o MAC do gateway; o ARP não atravessa roteadores e não é DNS.</li><li><strong>Diagnóstico:</strong> sem entrada ARP para o gateway, investigue VLAN, link e gateway antes de DNS ou aplicação.</li><li><strong>Segurança:</strong> o ARP não autentica respostas; segmente, use DAI, DHCP snooping e 802.1X, e monitore mudanças de MAC do gateway.</li></ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>Na aula 3.6, cache ARP e troubleshooting de rede local: como a tabela ARP é mantida e expira, e como interpretar cache incorreto, IP duplicado ou gateway suspeito.</p>\n</section>\n"
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
      "Host não pinga o gateway.",
      "Gateway aparece com MAC diferente do esperado.",
      "Conectividade intermitente com um IP local.",
      "Acesso a nomes falha porque o gateway nem é alcançado.",
      "Tabela ARP não recebe entrada para o próximo salto."
    ],
    "diagnosticQuestions": [
      "O IP e a máscara do host estão corretos?",
      "O destino está na mesma sub-rede ou precisa do gateway?",
      "O gateway responde ARP?",
      "A VLAN da porta está correta?",
      "Há duplicidade de IP ou MAC flapping?",
      "O problema é local, rota, DNS, transporte ou aplicação?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\narp -a\nping <gateway>\ntracert 8.8.8.8",
        "purpose": "Ver configuração, tabela ARP, alcance ao gateway e caminho inicial.",
        "expectedObservation": "Gateway configurado, entrada ARP para o gateway e resposta ao ping quando ICMP não estiver bloqueado.",
        "interpretation": "Sem ARP para gateway sugere problema local antes de DNS e internet."
      },
      {
        "platform": "Linux",
        "command": "ip addr\nip route\nip neigh\nping -c 4 <gateway>",
        "purpose": "Ver IP, rota default, vizinhos ARP/NDP e alcance ao gateway.",
        "expectedObservation": "Rota default via gateway e entrada REACHABLE/STALE em ip neigh.",
        "interpretation": "Estado FAILED ou ausência persistente pode indicar falha L2/VLAN/gateway."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow arp\nshow mac address-table dynamic\nshow vlan brief",
        "purpose": "Correlacionar IP, ARP, tabela MAC e VLAN no equipamento de rede.",
        "expectedObservation": "Gateway ativo, ARP esperado, MAC aprendido na porta correta e VLAN correta.",
        "interpretation": "Divergência entre ARP, MAC table e VLAN aponta para problema de Camada 2 ou endereçamento."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não tem IP ou gateway",
        "then": "Verificar DHCP, configuração estática ou perfil de rede."
      },
      {
        "if": "Host tem IP, mas não tem ARP do gateway",
        "then": "Verificar VLAN, cabo/Wi-Fi, switch, gateway e firewall local."
      },
      {
        "if": "ARP do gateway muda frequentemente",
        "then": "Investigar failover legítimo, MAC flapping, IP duplicado ou spoofing."
      },
      {
        "if": "ARP do gateway funciona, mas o site por nome não abre",
        "then": "Testar o IP direto e rodar nslookup/dig; depois avançar para DNS, rota, porta, TLS e aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Segmentar redes por VLAN e função (usuários, servidores, visitantes, câmeras, gestão).",
      "Usar DHCP snooping, Dynamic ARP Inspection (DAI) e port security quando disponíveis.",
      "Monitorar mudanças de MAC para IPs críticos, como gateways.",
      "Usar criptografia ponta a ponta para reduzir o impacto de interceptação local.",
      "Sanitizar capturas e tabelas ARP (IPs, MACs, topologia) e controlar o acesso a elas antes de compartilhar evidências."
    ],
    "badPractices": [
      "Manter rede plana com muitos ativos críticos: o ARP alcança todos, com mais ruído e mais superfície lateral.",
      "Confiar apenas em MAC como controle de acesso.",
      "Compartilhar PCAPs internos sem revisão.",
      "Executar ferramentas ofensivas de ARP em rede real sem autorização.",
      "Ignorar alertas de IP duplicado."
    ],
    "commonErrors": [
      "Confundir conectividade local com autorização.",
      "Achar que NAT ou VLAN elimina risco de ARP spoofing dentro da mesma VLAN.",
      "Tratar mudança de MAC sempre como ataque, ignorando failover legítimo."
    ],
    "vulnerabilities": [
      {
        "name": "ARP spoofing",
        "description": "Um agente responde ARP de forma indevida para convencer os hosts de que o MAC dele corresponde ao IP do gateway ou de outro host. Aparece como MAC do gateway mudando de forma inesperada. O impacto vai de negação de serviço a interceptação (em tráfego sem criptografia adequada) ou redirecionamento.",
        "defensiveExplanation": "É possível porque o ARP não autentica respostas. O risco é local à VLAN; NAT ou VLAN não o eliminam dentro da mesma VLAN.",
        "mitigation": "DAI, DHCP snooping, 802.1X/NAC, port security, VLANs menores, criptografia ponta a ponta, logs e investigação de mudanças de MAC."
      },
      {
        "name": "IP duplicado",
        "description": "Dois dispositivos usam o mesmo IP e respondem ARP de forma conflitante, causando conectividade intermitente.",
        "defensiveExplanation": "Pode ser erro operacional ou sinal de comportamento indevido.",
        "mitigation": "DHCP centralizado, reservas documentadas, alertas de duplicidade e inventário."
      }
    ],
    "monitoring": [
      "Mudança inesperada de MAC do gateway.",
      "Volume anormal de ARP Requests/Replies.",
      "Alertas de duplicate IP.",
      "MAC flapping em portas de switch.",
      "Broadcast ARP elevado por VLAN."
    ],
    "hardening": [
      "Desabilitar portas não usadas.",
      "Aplicar 802.1X/NAC onde possível.",
      "Manter documentação dos gateways e dos MACs esperados."
    ],
    "detectionIdeas": [
      "Comparar o ARP do host com a tabela MAC do switch.",
      "Capturar apenas o tráfego necessário e autorizado.",
      "Correlacionar logs de switch, DHCP e firewall."
    ]
  },
  "lab": {
    "id": "lab-3.5",
    "title": "Observando ARP de forma defensiva",
    "labType": "security",
    "objective": "Identificar gateway, consultar tabela ARP, gerar tráfego leve e interpretar a associação IP-MAC do próximo salto.",
    "scenario": "Você está em um notebook de laboratório ou estação autorizada e precisa confirmar se o host consegue resolver o MAC do gateway local.",
    "topology": "Host do aluno -> switch/AP -> gateway local -> rede externa opcional",
    "architecture": "Rede local IPv4 comum, com host em uma subnet e gateway padrão configurado.",
    "prerequisites": [
      "Ter concluído as aulas 3.1 a 3.4."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Opcional: Wireshark em ambiente autorizado (filtro arp) para ver Request e Reply"
    ],
    "estimatedTimeMinutes": 30,
    "cost": "zero",
    "safetyNotes": [
      "Use apenas rede própria, doméstica ou laboratório autorizado; não capture tráfego de terceiros.",
      "Use só comandos de consulta e tráfego leve: nada de spoofing ou flooding.",
      "Sanitize IPs, MACs e nomes antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar o gateway",
        "instruction": "Descubra o gateway padrão do host.",
        "command": "Windows: ipconfig /all\nLinux: ip route | grep default",
        "expectedOutput": "Endereço IPv4 do gateway padrão.",
        "explanation": "Esse é o IP cujo MAC normalmente será resolvido por ARP para tráfego fora da rede local."
      },
      {
        "number": 2,
        "title": "Consultar a tabela ARP atual",
        "instruction": "Liste as associações IP-MAC conhecidas pelo host.",
        "command": "Windows: arp -a\nLinux: ip neigh",
        "expectedOutput": "Entradas contendo IPs locais e endereços MAC associados.",
        "explanation": "A tabela mostra resoluções recentes ou conhecidas. Nem toda entrada indica tráfego ativo neste momento."
      },
      {
        "number": 3,
        "title": "Gerar tráfego leve para o gateway",
        "instruction": "Envie poucos pacotes ICMP ao gateway para criar ou atualizar a entrada ARP.",
        "command": "Windows: ping <gateway>\nLinux: ping -c 4 <gateway>",
        "expectedOutput": "Respostas do gateway, se ele permitir ICMP. Mesmo sem resposta ao ping, a entrada ARP aparece, porque a resolução do MAC acontece antes do envio do primeiro pacote.",
        "explanation": "O objetivo não é testar internet, mas observar a resolução local do próximo salto."
      },
      {
        "number": 4,
        "title": "Reconsultar ARP",
        "instruction": "Verifique se o gateway aparece com um MAC associado.",
        "command": "Windows: arp -a\nLinux: ip neigh show <gateway>",
        "expectedOutput": "IP do gateway associado a um endereço MAC.",
        "explanation": "Essa associação permite que o host entregue frames ao gateway."
      },
      {
        "number": 5,
        "title": "Interpretar evidências",
        "instruction": "Registre as evidências coletadas numa tabela sanitizada.",
        "analysisTask": "Monte uma tabela com IP do host, máscara, gateway, MAC do gateway (mascarado), estado da entrada (REACHABLE, STALE, dinâmico…) e uma linha dizendo o que essa entrada prova e o que não prova.",
        "expectedOutput": "Tabela sanitizada com IPs/MACs mascarados quando necessário.",
        "explanation": "O valor está na interpretação: a entrada prova que houve resolução IP-MAC do gateway, mas não prova que DNS, porta, TLS, HTTP, autenticação ou autorização funcionam."
      }
    ],
    "expectedResult": "O aluno deve explicar por que o host precisa do MAC do gateway e como evidenciar essa resolução sem executar ações ofensivas.",
    "validation": [
      {
        "check": "Gateway identificado",
        "command": "ipconfig /all ou ip route",
        "expected": "Gateway padrão configurado.",
        "ifFails": "Verificar DHCP, configuração estática ou conectividade local."
      },
      {
        "check": "Entrada ARP do gateway aparece",
        "command": "arp -a ou ip neigh",
        "expected": "IP do gateway associado a um MAC.",
        "ifFails": "Pingue o gateway, confira VLAN, Wi-Fi/cabo e disponibilidade do gateway."
      },
      {
        "check": "Interpretação correta",
        "command": "Relatório do aluno",
        "expected": "Explicação diferencia ARP, DNS, rota e porta.",
        "ifFails": "Revisar aulas 2.5, 3.2 e 3.4."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Gateway não aparece no ARP",
        "probableCause": "Ainda não houve tráfego para o gateway, VLAN errada, gateway indisponível ou bloqueio local.",
        "howToConfirm": "Validar IP/máscara, pingar o gateway, reconsultar o ARP e verificar o link.",
        "fix": "Corrigir endereçamento, porta/VLAN ou disponibilidade do gateway."
      }
    ],
    "improvements": [
      "Capturar o ARP Request/Reply no Wireshark em laboratório próprio e conferir os campos Operation, Sender e Target.",
      "Repetir em Packet Tracer com dois hosts e um gateway.",
      "Comparar a tabela ARP do host com a tabela MAC do switch."
    ],
    "evidenceToCollect": [
      "Gateway padrão e comando utilizado.",
      "Entrada ARP do gateway (sanitizada).",
      "Interpretação: o que a entrada prova e o que não prova."
    ],
    "questions": [
      "Por que o ARP Request usa broadcast e o ARP Reply normalmente pode ser unicast?",
      "Por que MAC não deve ser tratado como identidade forte?"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que o IPv4 precisou de ARP em redes Ethernet?",
      "hints": [
        "Pense na diferença entre IP e MAC.",
        "Pense no frame Ethernet."
      ],
      "expectedIdeas": [
        "IP é lógico",
        "MAC é local",
        "frame precisa de MAC de destino",
        "ARP automatiza a descoberta"
      ],
      "explanation": "A resposta deve mostrar que ARP resolve uma necessidade de encapsulamento local."
    },
    {
      "type": "diagnóstico",
      "question": "Um host tem IP correto, mas não tem entrada ARP para o gateway. O que você verificaria antes de culpar DNS?",
      "hints": [
        "Pense em Camada 2 e 3 local.",
        "Pense em VLAN e gateway."
      ],
      "expectedIdeas": [
        "máscara",
        "gateway",
        "link",
        "VLAN",
        "porta",
        "gateway indisponível",
        "firewall local"
      ],
      "explanation": "Valide o caminho local na ordem: IP/máscara/gateway, link e VLAN, ARP do gateway, tabela MAC do switch. Só depois avance para rota, DNS, porta e aplicação."
    },
    {
      "type": "diagnóstico",
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
        "a causa é a máscara, não o gateway nem o DNS",
        "exceção: se o gateway tiver proxy ARP habilitado, ele responde no lugar do destino e o erro de máscara fica mascarado"
      ],
      "explanation": "A decisão de próximo salto vem antes do ARP. Máscara errada faz o host perguntar pelo alvo errado."
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
        "Rotear pacotes entre ASNs"
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
      "explanation": "A ausência de autenticação nativa permite respostas indevidas em uma mesma VLAN.",
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
      "front": "Quais controles de switch reduzem o risco de ARP spoofing?",
      "back": "DAI (Dynamic ARP Inspection), DHCP snooping, port security e 802.1X/NAC; VLANs menores e criptografia ponta a ponta reduzem o impacto.",
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
    },
    {
      "id": "ex3.5.3",
      "type": "segurança",
      "prompt": "Por que permitir muitos dispositivos críticos na mesma VLAN aumenta o risco relacionado a ARP?",
      "expectedAnswer": "Porque ARP broadcast e possíveis manipulações ficam no mesmo domínio, ampliando descoberta, ruído e impacto lateral.",
      "explanation": "Segmentação reduz escopo de broadcast e de incidentes locais."
    }
  ],
  "challenge": {
    "title": "Gateway com MAC suspeito",
    "scenario": "Usuários de uma VLAN relatam queda intermitente. Em alguns hosts, o MAC associado ao gateway muda durante o expediente.",
    "tasks": [
      "Montar hipóteses defensivas.",
      "Listar evidências seguras a coletar.",
      "Separar falhas operacionais de suspeita de incidente.",
      "Propor mitigação sem executar ataque."
    ],
    "constraints": [
      "Não usar ferramentas ofensivas.",
      "Não capturar tráfego de terceiros sem autorização.",
      "Sanitizar evidências.",
      "Considerar failover legítimo antes de concluir ataque."
    ],
    "expectedDeliverables": [
      "Matriz de hipóteses",
      "Lista de comandos",
      "Plano de correlação com switch/DHCP/firewall",
      "Recomendações de hardening"
    ],
    "gradingRubric": [
      {
        "criterion": "Raciocínio por camadas",
        "points": 30,
        "description": "Distingue ARP, VLAN, gateway, rota e aplicação."
      },
      {
        "criterion": "Segurança defensiva",
        "points": 30,
        "description": "Inclui detecção, mitigação e limites éticos."
      },
      {
        "criterion": "Evidências",
        "points": 25,
        "description": "Coleta dados úteis sem expor informações sensíveis."
      },
      {
        "criterion": "Clareza operacional",
        "points": 15,
        "description": "Propõe próximos passos executáveis e seguros."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A mudança de MAC do gateway pode ser legítima ou problemática. Primeiro é preciso conhecer a arquitetura: existe HSRP/VRRP, cluster de firewall ou troca planejada? Depois correlacionar ARP nos hosts, MAC table no switch, logs de DHCP e eventos de porta.",
    "steps": [
      "Registrar horário e hosts afetados.",
      "Verificar IP/máscara/gateway.",
      "Consultar ARP nos hosts afetados.",
      "Consultar tabela MAC e VLAN no switch.",
      "Verificar se há protocolo de alta disponibilidade legítimo.",
      "Procurar IP duplicado e MAC flapping.",
      "Aplicar mitigação: segmentação, DAI, DHCP snooping, 802.1X e monitoramento."
    ],
    "commonWrongAnswers": [
      {
        "answer": "É sempre ataque.",
        "whyItIsWrong": "Ambientes com alta disponibilidade podem mudar MAC de forma legítima."
      },
      {
        "answer": "Limpar ARP resolve definitivamente.",
        "whyItIsWrong": "Limpar cache é teste temporário; não corrige causa raiz."
      },
      {
        "answer": "Trocar DNS resolve.",
        "whyItIsWrong": "O sintoma ocorre antes da resolução de nomes."
      }
    ],
    "finalAnswer": "A investigação correta trata a mudança de MAC como evidência a correlacionar, não como conclusão. O plano deve validar arquitetura, VLAN, IP duplicado, MAC flapping e controles L2, mantendo foco defensivo."
  },
  "glossary": [
    {
      "term": "ARP",
      "shortDefinition": "Protocolo que resolve IPv4 para MAC na rede local.",
      "longDefinition": "Address Resolution Protocol permite que um host IPv4 descubra o endereço MAC do próximo salto local para encapsular pacotes IP em frames Ethernet.",
      "example": "Descobrir o MAC do gateway 192.168.1.1.",
      "relatedTerms": [
        "MAC",
        "IPv4",
        "gateway",
        "broadcast"
      ]
    },
    {
      "term": "ARP Request",
      "shortDefinition": "Pergunta ARP enviada em broadcast.",
      "longDefinition": "Enviado para ff:ff:ff:ff:ff:ff, alcança todos os hosts da VLAN; o campo Operation vale 1.",
      "example": "Quem tem 192.168.1.1?",
      "relatedTerms": [
        "broadcast",
        "VLAN"
      ]
    },
    {
      "term": "ARP Reply",
      "shortDefinition": "Resposta ARP com associação IP-MAC.",
      "longDefinition": "Enviada normalmente em unicast para quem perguntou; o campo Operation vale 2.",
      "example": "192.168.1.1 está em aa:bb:cc:dd:ee:ff.",
      "relatedTerms": [
        "cache ARP",
        "MAC"
      ]
    },
    {
      "term": "Cache ARP",
      "shortDefinition": "Tabela temporária de associações IP-MAC.",
      "longDefinition": "Tabela mantida pelo host para evitar perguntar repetidamente pelo mesmo IP local.",
      "example": "arp -a no Windows ou ip neigh no Linux.",
      "relatedTerms": [
        "tabela ARP",
        "neighbor table"
      ]
    },
    {
      "term": "Próximo salto",
      "shortDefinition": "Dispositivo local para onde o host entrega o próximo frame/pacote.",
      "longDefinition": "Pode ser o próprio destino se estiver na mesma rede ou o gateway se o destino estiver fora da rede local.",
      "example": "Gateway padrão em uma LAN doméstica.",
      "relatedTerms": [
        "gateway",
        "rota default"
      ]
    },
    {
      "term": "ARP spoofing",
      "shortDefinition": "Anúncio ARP indevido usado para associar IP legítimo a MAC errado.",
      "longDefinition": "Risco de Camada 2 em que respostas ARP falsas podem causar interceptação ou negação de serviço dentro da mesma VLAN.",
      "example": "Anunciar falsamente o IP do gateway com outro MAC.",
      "relatedTerms": [
        "DAI",
        "DHCP snooping",
        "802.1X"
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
      "3.6"
    ]
  }
};
