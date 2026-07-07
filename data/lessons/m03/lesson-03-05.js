export const lesson0305 = {
  "id": "3.5",
  "moduleId": "m03",
  "order": 5,
  "title": "ARP: transformando IPv4 em MAC na rede local",
  "subtitle": "O protocolo invisível que permite ao IPv4 usar Ethernet para entregar frames dentro da LAN.",
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Você já aprendeu que Ethernet entrega frames usando endereços MAC e que IPv4 identifica hosts usando endereços IP. Agora aparece uma pergunta inevitável: se o usuário quer acessar <code>192.168.10.1</code>, mas a placa de rede só coloca um frame no cabo usando MAC de destino, como o computador descobre qual MAC corresponde àquele IP?</p>\n<p>Essa pergunta não é acadêmica. Ela aparece quando um notebook está com IP correto, máscara correta e gateway configurado, mas não consegue falar com o roteador local. Aparece em incidentes de rede local, em análise de pacotes, em troubleshooting de impressoras, em falhas de gateway, em redes com VLAN errada e em investigações defensivas de ARP spoofing.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um host tenta acessar a internet. Ele sabe o IP do gateway, mas antes de enviar qualquer pacote para fora da rede, precisa descobrir o MAC do gateway dentro da LAN. Se ARP falhar, nada que dependa daquele próximo salto local funciona.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>ARP, Address Resolution Protocol, surgiu junto com o crescimento das redes TCP/IP sobre Ethernet. O IPv4 fornecia endereçamento lógico, útil para redes diferentes, roteamento e organização. A Ethernet fornecia entrega local por frames e endereços MAC. As duas tecnologias resolviam problemas diferentes, mas precisavam trabalhar juntas.</p>\n<p>Antes de um mecanismo automático, seria necessário manter uma tabela manual relacionando IPs e MACs. Isso até poderia funcionar em uma rede minúscula e estática, mas quebraria rapidamente em ambientes reais: computadores mudam de porta, placas são trocadas, impressoras são adicionadas, VMs aparecem e desaparecem, notebooks entram e saem da rede.</p>\n<p>ARP resolveu essa ligação de forma simples: perguntar em broadcast quem possui determinado endereço IPv4 e receber uma resposta com o MAC correspondente. A simplicidade tornou o protocolo eficiente e quase invisível para o usuário, mas também deixou limitações importantes de segurança, porque ARP não foi criado com autenticação forte.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema técnico é a diferença de escopo entre IP e MAC. O IP é um endereço lógico de Camada 3. Ele permite raciocinar sobre redes, sub-redes e roteamento. O MAC é um endereço usado em Camada 2 para entregar frames dentro do enlace local. Um pacote IP não atravessa a Ethernet sozinho; ele precisa ser encapsulado em um frame com MAC de origem e MAC de destino.</p>\n<ul class=\"flow-list\"><li><strong>Para falar com host da mesma rede:</strong> o computador precisa descobrir o MAC do próprio destino.</li><li><strong>Para falar com host de outra rede:</strong> o computador precisa descobrir o MAC do gateway padrão, não o MAC do destino final.</li><li><strong>Para evitar consulta manual:</strong> o host usa ARP Request e ARP Reply.</li><li><strong>Para ganhar eficiência:</strong> a resposta é guardada temporariamente no cache ARP.</li><li><strong>Para troubleshooting:</strong> a tabela ARP vira evidência sobre a comunicação local.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A resolução entre endereço lógico e endereço local evoluiu conforme as redes ficaram maiores e mais dinâmicas.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead><tbody>\n<tr><td>Tabela manual</td><td>Administrador configurava relação IP-MAC.</td><td>Não escala e quebra com mudanças.</td><td>ARP dinâmico.</td></tr>\n<tr><td>ARP dinâmico</td><td>Host pergunta em broadcast e recebe resposta.</td><td>Não autentica nativamente a resposta.</td><td>Controles de switch, segmentação e monitoramento.</td></tr>\n<tr><td>ARP em LAN segmentada</td><td>Broadcast fica limitado à VLAN.</td><td>VLAN grande demais amplia ruído e risco.</td><td>VLANs menores, roteamento e políticas.</td></tr>\n<tr><td>Cloud pública</td><td>Provedor abstrai muitos detalhes de L2.</td><td>O aluno deixa de ver ARP diretamente, mas o conceito de próximo salto continua.</td><td>Route tables, ENIs, overlays e controles gerenciados.</td></tr>\n<tr><td>IPv6</td><td>Usa Neighbor Discovery em vez de ARP clássico.</td><td>Resolve problema semelhante com outro mecanismo.</td><td>NDP, ICMPv6 e controles próprios.</td></tr>\n</tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>ARP</strong>, Address Resolution Protocol, é o protocolo usado no IPv4 para descobrir o endereço MAC associado a um endereço IPv4 dentro da rede local. Ele não resolve nomes como DNS, não roteia pacotes como um roteador e não protege a comunicação. Ele apenas responde a uma pergunta local: “qual MAC devo usar para entregar este frame ao próximo salto?”</p>\n<div class=\"definition-box\"><strong>Definição prática:</strong> ARP conecta o mundo lógico do IPv4 ao mundo local da Ethernet, permitindo que um host transforme o IP do destino local ou do gateway em um MAC de destino para o frame Ethernet.</div>\n<p>A frase “ARP transforma IPv4 em MAC” é útil, mas deve ser entendida com cuidado. Se o destino está fora da rede local, ARP não procura o MAC do servidor final na internet. Ele procura o MAC do gateway padrão. O gateway então recebe o frame local, remove a Camada 2, analisa o pacote IP e decide o próximo salto.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>O funcionamento interno do ARP começa antes da pergunta em broadcast. O host primeiro decide se o IP de destino está na mesma sub-rede. Para isso, compara o próprio IP e o IP de destino usando a máscara de rede. Se estiver na mesma rede, o próximo salto é o próprio destino. Se não estiver, o próximo salto é o gateway padrão.</p>\n<ol class=\"flow-list\"><li>O host precisa enviar tráfego para um IP.</li><li>Ele verifica se o IP está na mesma sub-rede.</li><li>Define o próximo salto: destino local ou gateway.</li><li>Consulta o cache ARP para saber se já conhece o MAC daquele próximo salto.</li><li>Se não conhece, envia um ARP Request em broadcast para <code>ff:ff:ff:ff:ff:ff</code>.</li><li>O dono do IP responde com ARP Reply, normalmente em unicast.</li><li>O host grava a associação IP-MAC no cache por tempo limitado.</li><li>O pacote IP é encapsulado em um frame Ethernet com o MAC resolvido.</li></ol>\n<p>Essa sequência explica muitos sintomas. Se o host não consegue resolver o MAC do gateway, o problema pode parecer “internet fora”, mas a falha real está antes: camada 2, VLAN, gateway local, cabo, Wi-Fi, filtro local ou ARP.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>ARP vive na fronteira prática entre Camada 2 e Camada 3. Ele usa Ethernet broadcast para resolver um problema necessário ao IPv4. Em uma arquitetura de rede, ele aparece em hosts, gateways, switches, firewalls em modo roteado, appliances, impressoras, servidores e VMs dentro da mesma VLAN.</p>\n<ul><li><strong>Host final:</strong> mantém cache ARP e envia ARP Requests quando necessário.</li><li><strong>Switch:</strong> encaminha broadcast ARP dentro da VLAN e aprende MACs pelo frame.</li><li><strong>Gateway:</strong> responde ARP pelo IP da interface local.</li><li><strong>Firewall roteado:</strong> pode ser o gateway e responder ARP nas redes conectadas.</li><li><strong>VLAN:</strong> limita o alcance do broadcast ARP.</li><li><strong>Cloud/virtualização:</strong> pode abstrair ARP, mas ainda trabalha com interfaces, próximo salto e resolução local controlada pelo provedor ou hypervisor.</li></ul>\n<p>Em troubleshooting, ARP ajuda a separar: tenho IP? tenho rota? consigo resolver o MAC do gateway? o MAC muda com frequência? há duplicidade de IP? há VLAN errada? há um equipamento respondendo indevidamente?</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine que o IP é o nome de uma pessoa dentro de um prédio corporativo, mas para entregar um envelope dentro do andar você precisa saber em qual mesa ela está. ARP é como perguntar no andar: “quem é 192.168.10.1?” A pessoa correta responde: “sou eu, minha mesa é esta”. Depois disso, você passa a entregar diretamente naquela mesa por algum tempo.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes, a pergunta ARP é broadcast técnico, a resposta vira entrada temporária em cache e o MAC não é identidade confiável. Diferente de uma mesa física, um MAC pode ser falsificado ou mudar por virtualização, troca de placa, failover ou configuração.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Seu notebook tem IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. Você tenta acessar um site. O site está fora da sua rede local, então o notebook sabe que deve enviar o pacote ao gateway. Mas para entregar o frame ao roteador Wi-Fi, ele precisa do MAC do roteador.</p>\n<p>Se o cache ARP já contém <code>192.168.1.1 → aa:bb:cc:dd:ee:ff</code>, o envio continua sem pergunta nova. Se não contém, o notebook envia ARP Request em broadcast. O roteador responde. A entrada aparece em <code>arp -a</code>. Só então o notebook consegue enviar frames ao gateway.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, ARP aparece quando estações acessam gateway, servidores locais, impressoras, appliances de segurança, balanceadores internos e sistemas legados. Uma falha de ARP pode derrubar uma VLAN inteira, confundir o SOC ou parecer problema de DNS ou firewall.</p>\n<p>Imagine uma filial onde usuários conseguem IP via DHCP, mas não acessam sistemas internos. O analista verifica IP, máscara e gateway. Depois executa <code>arp -a</code> e percebe que o gateway não aparece. Isso indica que a investigação deve olhar para Camada 2: VLAN, trunk, porta, gateway desligado, firewall local ou bloqueio. Em outro cenário, o MAC do gateway muda várias vezes, sugerindo failover legítimo, duplicidade, flapping ou comportamento suspeito.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud pública, o aluno raramente manipula ARP diretamente como em uma LAN física. Provedores abstraem muitos detalhes de Camada 2 para oferecer redes virtuais escaláveis, isoladas e controladas. Ainda assim, o modelo mental permanece útil: uma instância tem uma interface virtual, uma subnet, uma rota e um próximo salto lógico.</p>\n<p>Ao investigar por que uma VM não acessa um banco privado, você pode não ver ARP tradicional, mas continuará perguntando: a interface tem IP? a subnet está correta? existe rota? o próximo salto é válido? há security group, NSG, NACL, firewall ou tabela de rota bloqueando? O ARP ensina que comunicação local depende de resolução do próximo salto; a cloud apenas muda onde essa resolução é implementada e quanto dela aparece para o usuário.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, ARP aparece indiretamente em laboratórios com VMs, Docker bridges, redes locais de Kubernetes, runners self-hosted, appliances virtuais e ambientes de teste. Quando uma pipeline aciona um runner local que precisa acessar um registry interno, a falha pode parecer de autenticação, mas a causa pode estar no caminho local: bridge, gateway, rota, firewall ou resolução ARP.</p>\n<p>Em Kubernetes on-premises ou laboratórios com Kind/Minikube, bridges virtuais e CNIs encapsulam ou simulam comportamentos de rede. Entender ARP ajuda a interpretar por que um container alcança outro, por que uma VM perde gateway, por que uma bridge tem tabela própria e por que um host com IP duplicado causa sintomas intermitentes.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>ARP não autentica nativamente quem responde. Isso cria riscos defensivos importantes. Em um ataque conceitual de ARP spoofing, um agente malicioso tenta convencer hosts de que seu MAC corresponde ao IP do gateway ou de outro host. O impacto pode ser negação de serviço, interceptação em redes sem criptografia adequada ou redirecionamento indevido.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>ARP spoofing</td><td>MAC do gateway muda de forma inesperada.</td><td>Interceptação ou indisponibilidade local.</td><td>Segmentação, DAI, DHCP snooping, 802.1X, criptografia ponta a ponta e monitoramento.</td></tr>\n<tr><td>IP duplicado</td><td>Dois hosts respondem pelo mesmo IP.</td><td>Conectividade intermitente.</td><td>DHCP controlado, reserva documentada e alerta de duplicidade.</td></tr>\n<tr><td>Rede plana</td><td>ARP alcança muitos hosts.</td><td>Maior ruído e superfície lateral.</td><td>VLANs, roteamento controlado e menor privilégio.</td></tr>\n<tr><td>PCAP sensível</td><td>Captura revela IPs, MACs e topologia.</td><td>Vazamento de informações internas.</td><td>Sanitização e controle de acesso a evidências.</td></tr>\n</tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 430\" role=\"img\" aria-labelledby=\"arp-title arp-desc\">\n  <title id=\"arp-title\">ARP resolvendo IPv4 para MAC na rede local</title>\n  <desc id=\"arp-desc\">Host cliente pergunta em broadcast quem possui o IP do gateway. O gateway responde com seu endereço MAC e o cliente passa a enviar o frame unicast.</desc>\n  <defs>\n    <marker id=\"m03l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n  </defs>\n  <rect x=\"40\" y=\"72\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"125\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Host A</text>\n  <text x=\"125\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.25</text>\n  <text x=\"125\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC aa:aa...</text>\n  <rect x=\"405\" y=\"72\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"490\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n  <text x=\"490\" y=\"132\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN 10</text>\n  <rect x=\"770\" y=\"72\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"855\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n  <text x=\"855\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP 192.168.10.1</text>\n  <text x=\"855\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC bb:bb...</text>\n  <line x1=\"210\" y1=\"116\" x2=\"405\" y2=\"116\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <line x1=\"575\" y1=\"116\" x2=\"770\" y2=\"116\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <text x=\"490\" y=\"55\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP Request: Quem tem 192.168.10.1? Diga para 192.168.10.25</text>\n  <line x1=\"770\" y1=\"205\" x2=\"575\" y2=\"205\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <line x1=\"405\" y1=\"205\" x2=\"210\" y2=\"205\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l05-arrow)\" />\n  <text x=\"490\" y=\"240\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP Reply: 192.168.10.1 está em bb:bb:bb:bb:bb:bb</text>\n  <rect x=\"250\" y=\"300\" width=\"480\" height=\"84\" rx=\"14\" class=\"svg-node svg-node--security\" />\n  <text x=\"490\" y=\"328\" text-anchor=\"middle\" class=\"svg-label\">Cache ARP do Host A</text>\n  <text x=\"490\" y=\"354\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1 → bb:bb:bb:bb:bb:bb por tempo limitado</text>\n  <text x=\"490\" y=\"376\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Risco defensivo: ARP não autentica nativamente a resposta</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>Neste laboratório, você observará ARP de forma defensiva usando comandos locais. O objetivo é identificar o gateway, consultar a tabela ARP, gerar tráfego leve e interpretar a associação IP-MAC criada. Não há ataque, não há spoofing e não há alteração indevida de rede.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios treinam a diferença entre IP de destino, próximo salto, MAC de destino, gateway, cache ARP e falhas comuns. O foco é produzir raciocínio técnico, não apenas reconhecer definições.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio coloca você em uma empresa com sintomas intermitentes de acesso ao gateway. Sua tarefa será montar uma hipótese defensiva, coletar evidências seguras e propor mitigação sem executar ações ofensivas.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como separar falha de ARP, falha de rota, DNS, firewall, IP duplicado, VLAN incorreta e possível manipulação maliciosa de Camada 2.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li><strong>Ideia central:</strong> ARP resolve IPv4 para MAC dentro da rede local.</li><li><strong>O que lembrar:</strong> para destino externo, ARP procura o MAC do gateway, não do servidor final.</li><li><strong>Erro comum:</strong> confundir ARP com DNS ou achar que ARP atravessa roteadores.</li><li><strong>Uso real:</strong> diagnóstico de gateway, VLAN, IP duplicado, cache ARP e falhas locais.</li><li><strong>Segurança:</strong> ARP não autentica nativamente respostas; monitore, segmente e use controles de switch.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você estudará cache ARP e troubleshooting de rede local. Agora que já sabe como o ARP descobre o MAC, o próximo passo é entender como a tabela ARP é mantida, quando expira, como limpar/consultar e como interpretar sintomas de cache incorreto, IP duplicado ou gateway suspeito.</p>\n</section>"
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
  "protocolFields": [
    {
      "field": "Hardware Type",
      "size": "16 bits",
      "purpose": "Indicar o tipo de tecnologia de enlace, como Ethernet.",
      "securityObservation": "Normalmente estável em LAN Ethernet; valor inesperado pode indicar captura fora do contexto esperado."
    },
    {
      "field": "Protocol Type",
      "size": "16 bits",
      "purpose": "Indicar o protocolo lógico resolvido, normalmente IPv4.",
      "securityObservation": "Ajuda a diferenciar ARP de outros protocolos encapsulados."
    },
    {
      "field": "Operation",
      "size": "16 bits",
      "purpose": "Distinguir ARP Request e ARP Reply.",
      "securityObservation": "Volume alto de replies ou replies inesperados pode ser evidência defensiva relevante."
    },
    {
      "field": "Sender MAC/IP",
      "size": "48 bits + 32 bits",
      "purpose": "Informar quem está anunciando a associação.",
      "securityObservation": "Pode ser falsificado; não trate como identidade forte."
    },
    {
      "field": "Target MAC/IP",
      "size": "48 bits + 32 bits",
      "purpose": "Indicar qual IP está sendo procurado ou respondido.",
      "securityObservation": "Requests para muitos IPs podem indicar descoberta ruidosa ou comportamento anômalo."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Decide o próximo salto.",
      "detail": "Compara IP de destino e máscara; escolhe destino local ou gateway.",
      "possibleFailure": "Máscara errada faz o host tentar ARP para o alvo errado ou usar gateway indevido."
    },
    {
      "step": 2,
      "actor": "Host",
      "action": "Consulta o cache ARP.",
      "detail": "Procura se já existe associação IP-MAC válida.",
      "possibleFailure": "Cache desatualizado, IP duplicado ou MAC inesperado."
    },
    {
      "step": 3,
      "actor": "Host",
      "action": "Envia ARP Request em broadcast.",
      "detail": "Frame Ethernet para ff:ff:ff:ff:ff:ff dentro da VLAN.",
      "possibleFailure": "VLAN errada ou broadcast storm impede resposta confiável."
    },
    {
      "step": 4,
      "actor": "Gateway ou destino local",
      "action": "Responde ARP Reply.",
      "detail": "Informa o MAC associado ao IP solicitado.",
      "possibleFailure": "Resposta indevida, duplicidade de IP ou spoofing."
    },
    {
      "step": 5,
      "actor": "Host",
      "action": "Envia o tráfego real em unicast.",
      "detail": "Encapsula o pacote IP em frame Ethernet com o MAC resolvido.",
      "possibleFailure": "Firewall, rota, porta ou aplicação ainda podem falhar depois do ARP funcionar."
    }
  ],
  "deepDive": {
    "mentalModel": "ARP não pergunta onde está o servidor final na internet; ele pergunta qual MAC local deve receber o próximo frame.",
    "keyTerms": [
      "ARP Request",
      "ARP Reply",
      "cache ARP",
      "gateway",
      "broadcast",
      "próximo salto"
    ],
    "limitations": [
      "ARP é local à rede/VLAN.",
      "ARP não autentica respostas nativamente.",
      "ARP não substitui DNS, rota ou firewall.",
      "ARP não existe da mesma forma em IPv6."
    ],
    "whenToUse": [
      "Ao diagnosticar comunicação com gateway.",
      "Ao investigar IP duplicado.",
      "Ao analisar capturas Ethernet/IPv4.",
      "Ao diferenciar falha L2, L3 e DNS."
    ],
    "whenNotToUse": [
      "Não use ARP para resolver nomes de domínio.",
      "Não conclua autorização apenas porque ARP funciona.",
      "Não execute testes ofensivos em redes reais."
    ],
    "operationalImpact": [
      "ARP é automático, mas exige VLANs bem planejadas e gateways estáveis.",
      "Problemas de ARP podem parecer DNS, internet ou firewall, aumentando tempo de troubleshooting."
    ],
    "financialImpact": [
      "Controles como switches gerenciáveis, NAC e monitoramento têm custo, mas reduzem risco e tempo de incidente.",
      "Ambientes cloud abstraem ARP, mas cobram por recursos de rede, logs e appliances de segurança."
    ],
    "securityImpact": [
      "ARP amplia risco em redes planas e sem controles de Camada 2; segmentação e criptografia reduzem impacto."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que ARP é DNS.",
      "whyItHappens": "Ambos parecem transformar uma coisa em outra.",
      "consequence": "O aluno diagnostica problema local como falha de nomes.",
      "correction": "DNS resolve nome para IP; ARP resolve IPv4 para MAC dentro da LAN."
    },
    {
      "mistake": "Achar que ARP descobre o MAC do site na internet.",
      "whyItHappens": "O usuário pensa no destino final, não no próximo salto.",
      "consequence": "Confusão sobre gateway e roteamento.",
      "correction": "Para destino fora da rede local, ARP busca o MAC do gateway."
    },
    {
      "mistake": "Confiar em MAC como identidade forte.",
      "whyItHappens": "MAC parece único e físico.",
      "consequence": "Políticas fracas e falsa sensação de segurança.",
      "correction": "MAC pode ser falsificado; use autenticação, NAC, logs e controles adicionais."
    },
    {
      "mistake": "Ignorar IP duplicado.",
      "whyItHappens": "O problema é intermitente e parece aleatório.",
      "consequence": "Perda de conectividade e incidentes difíceis de reproduzir.",
      "correction": "Verifique alertas, DHCP, ARP e mudança de MAC para o mesmo IP."
    }
  ],
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
        "if": "ARP funciona, mas site por nome não abre",
        "then": "Avançar para DNS, rota, porta, TLS e aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Segmentar redes por VLAN e função.",
      "Usar DHCP snooping, Dynamic ARP Inspection e port security quando disponíveis.",
      "Monitorar mudanças de MAC para IPs críticos como gateways.",
      "Usar criptografia ponta a ponta para reduzir impacto de interceptação local.",
      "Sanitizar capturas e tabelas ARP antes de compartilhar evidências."
    ],
    "badPractices": [
      "Manter rede plana com muitos ativos críticos.",
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
        "description": "Resposta ARP indevida tenta associar IP legítimo a MAC de outro dispositivo.",
        "defensiveExplanation": "O risco é local à VLAN e deve ser tratado por segmentação, controles de switch, criptografia e monitoramento.",
        "mitigation": "DAI, DHCP snooping, 802.1X/NAC, port security, VLANs menores, logs e investigação de mudanças de MAC."
      },
      {
        "name": "IP duplicado",
        "description": "Dois dispositivos usam o mesmo IP e respondem de forma conflitante.",
        "defensiveExplanation": "Pode ser erro operacional ou sinal de comportamento indevido.",
        "mitigation": "DHCP centralizado, reservas documentadas, alertas e inventário."
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
      "Ativar controles L2 em switches gerenciáveis.",
      "Desabilitar portas não usadas.",
      "Aplicar 802.1X/NAC onde possível.",
      "Separar usuários, servidores, visitantes, câmeras e gestão.",
      "Manter documentação de gateways e MACs esperados."
    ],
    "detectionIdeas": [
      "Comparar ARP do host com tabela MAC do switch.",
      "Capturar apenas tráfego necessário e autorizado.",
      "Correlacionar logs de switch, DHCP e firewall.",
      "Investigar mudanças repetidas no MAC do gateway."
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
      "Ter concluído as aulas 3.1 a 3.4.",
      "Usar apenas rede própria, doméstica ou laboratório autorizado.",
      "Não executar spoofing, flooding ou ferramentas ofensivas."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Opcional: Wireshark em ambiente autorizado",
      "Opcional: Cisco Packet Tracer para simulação"
    ],
    "estimatedTimeMinutes": 125,
    "cost": "zero",
    "safetyNotes": [
      "Não execute ARP spoofing.",
      "Não faça captura em rede de terceiros.",
      "Sanitize IPs, MACs e nomes antes de compartilhar evidências.",
      "Use apenas comandos de consulta e tráfego leve."
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
        "expectedOutput": "Respostas do gateway quando ICMP estiver permitido; mesmo sem resposta ICMP, ARP pode aparecer se houver comunicação local.",
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
        "instruction": "Registre IP do host, máscara, gateway, MAC do gateway e observações de estado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela sanitizada com IPs/MACs mascarados quando necessário.",
        "explanation": "O valor do laboratório está na interpretação, não na coleta bruta."
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
        "probableCause": "Sem tráfego para gateway, VLAN errada, gateway indisponível ou bloqueio local.",
        "howToConfirm": "Validar IP/máscara, pingar gateway e verificar link.",
        "fix": "Corrigir endereçamento, porta/VLAN ou disponibilidade do gateway."
      },
      {
        "symptom": "MAC do gateway muda",
        "probableCause": "Failover legítimo, IP duplicado, MAC flapping ou spoofing.",
        "howToConfirm": "Correlacionar com logs de switch, DHCP e documentação.",
        "fix": "Confirmar arquitetura, remover duplicidade e aplicar controles L2."
      },
      {
        "symptom": "ARP funciona, mas nomes não resolvem",
        "probableCause": "Problema posterior em DNS.",
        "howToConfirm": "Executar nslookup/dig e testar IP direto.",
        "fix": "Avançar diagnóstico para DNS."
      }
    ],
    "improvements": [
      "Repetir em Packet Tracer com dois hosts e um gateway.",
      "Capturar ARP Request/Reply no Wireshark em laboratório próprio.",
      "Comparar tabela ARP do host com tabela MAC do switch.",
      "Documentar MAC esperado do gateway em ambiente controlado."
    ],
    "evidenceToCollect": [
      "Gateway padrão.",
      "Entrada ARP do gateway.",
      "Comando utilizado.",
      "Interpretação sanitizada.",
      "Hipóteses descartadas."
    ],
    "questions": [
      "Por que ARP Request usa broadcast?",
      "Por que ARP Reply normalmente pode ser unicast?",
      "Para acessar um site externo, o ARP busca o MAC de quem?",
      "Por que MAC não deve ser tratado como identidade forte?"
    ],
    "challenge": "Monte uma matriz de diagnóstico para um host que tem IP correto, mas não consegue alcançar o gateway. Inclua hipóteses, evidências e próximas ações seguras.",
    "solution": "A matriz deve começar por IP/máscara/gateway, seguir para link/VLAN, verificar ARP do gateway, correlacionar com tabela MAC do switch e só depois avançar para rota, DNS, porta e aplicação. Não deve incluir ações ofensivas."
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
      "explanation": "DNS só deve ser investigado depois de validar o caminho local básico."
    },
    {
      "type": "cenário real",
      "question": "O MAC do gateway muda diversas vezes durante o dia. Quais hipóteses defensivas existem?",
      "hints": [
        "Nem toda mudança é ataque.",
        "Pense em HA e duplicidade."
      ],
      "expectedIdeas": [
        "failover legítimo",
        "VRRP/HSRP",
        "IP duplicado",
        "MAC flapping",
        "spoofing",
        "logs de switch"
      ],
      "explanation": "O analista deve correlacionar evidências antes de concluir incidente."
    }
  ],
  "quiz": [
    {
      "id": "q3.5.1",
      "type": "conceito",
      "q": "Qual é a função principal do ARP em IPv4 sobre Ethernet?",
      "opts": [
        "Resolver IPv4 para MAC dentro da rede local",
        "Resolver nome DNS para IP público",
        "Criptografar frames Ethernet",
        "Roteiar pacotes entre ASNs"
      ],
      "a": 0,
      "exp": "ARP descobre o MAC associado a um IPv4 local ou ao próximo salto local.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q3.5.2",
      "type": "cenário",
      "q": "Um host quer acessar um site externo. Para qual IP ele normalmente faz ARP primeiro?",
      "opts": [
        "Para o IP do gateway padrão",
        "Para o IP público do site",
        "Para o IP do servidor DNS raiz",
        "Para todos os IPs da internet"
      ],
      "a": 0,
      "exp": "Para destinos fora da rede local, o próximo salto é o gateway padrão.",
      "difficulty": "iniciante",
      "topic": "gateway"
    },
    {
      "id": "q3.5.3",
      "type": "segurança",
      "q": "Por que ARP spoofing é possível conceitualmente?",
      "opts": [
        "Porque ARP não autentica nativamente respostas",
        "Porque todo switch é roteador",
        "Porque DNS sempre usa ARP",
        "Porque TLS altera MACs"
      ],
      "a": 0,
      "exp": "A ausência de autenticação nativa permite respostas indevidas em uma mesma VLAN.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q3.5.4",
      "type": "diagnóstico",
      "q": "Qual comando mostra a tabela ARP no Windows?",
      "opts": [
        "arp -a",
        "route print",
        "nslookup",
        "netstat -ano"
      ],
      "a": 0,
      "exp": "arp -a lista associações IP-MAC conhecidas pelo host.",
      "difficulty": "iniciante",
      "topic": "comandos"
    },
    {
      "id": "q3.5.5",
      "type": "comparação",
      "q": "Qual afirmação está correta?",
      "opts": [
        "DNS resolve nomes; ARP resolve IPv4 para MAC local",
        "ARP resolve nomes; DNS resolve MAC",
        "ARP substitui firewall",
        "ARP atravessa roteadores por padrão"
      ],
      "a": 0,
      "exp": "DNS e ARP resolvem problemas diferentes em camadas diferentes.",
      "difficulty": "iniciante",
      "topic": "comparação"
    },
    {
      "id": "q3.5.6",
      "type": "troubleshooting",
      "q": "Se ARP para o gateway falha, qual hipótese é mais inicial?",
      "opts": [
        "Problema local de Camada 2/3, VLAN, link ou gateway",
        "Erro HTTP 500 no servidor externo",
        "Senha incorreta no SSO",
        "CORS bloqueando navegador"
      ],
      "a": 0,
      "exp": "Sem ARP para o gateway, a investigação deve começar localmente antes de aplicação ou identidade.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.5.1",
      "front": "O que ARP resolve?",
      "back": "Resolve um endereço IPv4 para um endereço MAC dentro da rede local.",
      "tags": [
        "arp",
        "ipv4",
        "mac"
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
      "id": "fc3.5.3",
      "front": "Para destino externo, ARP busca o MAC de quem?",
      "back": "Do gateway padrão, que é o próximo salto local.",
      "tags": [
        "gateway",
        "arp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.5.4",
      "front": "Por que ARP spoofing é risco?",
      "back": "Porque ARP não autentica nativamente respostas IP-MAC.",
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
      "id": "ex3.5.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras por que um host precisa de ARP para falar com o gateway.",
      "expectedAnswer": "Porque o host envia frames Ethernet localmente usando MAC de destino; para alcançar redes externas, ele precisa entregar o frame ao MAC do gateway.",
      "explanation": "O IP do destino final não é usado como MAC do frame local."
    },
    {
      "id": "ex3.5.2",
      "type": "diagnóstico",
      "prompt": "Um host tem IP 192.168.20.50/24 e gateway 192.168.20.1. A tabela ARP não mostra o gateway mesmo após ping. Liste três hipóteses.",
      "expectedAnswer": "VLAN errada, gateway indisponível, link/Wi-Fi com problema, máscara incorreta, firewall local ou porta bloqueada.",
      "explanation": "A falha está antes de DNS e aplicação."
    },
    {
      "id": "ex3.5.3",
      "type": "segurança",
      "prompt": "Por que permitir muitos dispositivos críticos na mesma VLAN aumenta o risco relacionado a ARP?",
      "expectedAnswer": "Porque ARP broadcast e possíveis manipulações ficam no mesmo domínio, ampliando descoberta, ruído e impacto lateral.",
      "explanation": "Segmentação reduz escopo de broadcast e de incidentes locais."
    },
    {
      "id": "ex3.5.4",
      "type": "comando/output",
      "prompt": "Você executou arp -a e viu o IP do gateway com um MAC. O que isso prova e o que não prova?",
      "expectedAnswer": "Prova que houve resolução local IP-MAC para o gateway. Não prova que DNS, porta, TLS, HTTP, autenticação ou autorização funcionam.",
      "explanation": "ARP é apenas uma etapa inicial do caminho."
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
      ],
      "relatedLessons": [
        "3.2",
        "3.4",
        "3.6"
      ]
    },
    {
      "term": "ARP Request",
      "shortDefinition": "Pergunta ARP enviada em broadcast.",
      "longDefinition": "Frame usado para perguntar qual dispositivo possui determinado IPv4 dentro da VLAN.",
      "example": "Quem tem 192.168.1.1?",
      "relatedTerms": [
        "broadcast",
        "VLAN"
      ],
      "relatedLessons": [
        "3.4",
        "3.5"
      ]
    },
    {
      "term": "ARP Reply",
      "shortDefinition": "Resposta ARP com associação IP-MAC.",
      "longDefinition": "Mensagem que informa o MAC associado ao IPv4 solicitado.",
      "example": "192.168.1.1 está em aa:bb:cc:dd:ee:ff.",
      "relatedTerms": [
        "cache ARP",
        "MAC"
      ],
      "relatedLessons": [
        "3.5",
        "3.6"
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
      ],
      "relatedLessons": [
        "3.6"
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
      ],
      "relatedLessons": [
        "2.5",
        "4.6"
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
      ],
      "relatedLessons": [
        "3.9",
        "13.4"
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
