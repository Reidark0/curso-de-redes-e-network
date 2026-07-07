export const lesson1109 = {
  "id": "11.9",
  "moduleId": "m11",
  "order": 9,
  "title": "Troubleshooting com traceroute, mtr, route print e ip route",
  "subtitle": "Aprenda a diagnosticar caminhos IPv4 separando tabela de rotas, escolha de próximo salto, ICMP, perda, latência, rota de retorno, filtros e diferenças entre Windows, Linux, Cisco e cloud.",
  "duration": "115-165 min",
  "estimatedStudyTimeMinutes": 165,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 265,
  "tags": [
    "redes",
    "ipv4",
    "roteamento",
    "troubleshooting",
    "traceroute",
    "tracert",
    "mtr",
    "route print",
    "ip route",
    "ip route get",
    "show ip route",
    "icmp",
    "ttl",
    "gateway",
    "longest prefix match",
    "rota de retorno",
    "caminho assimétrico",
    "firewall",
    "cloud",
    "segurança",
    "devsecops",
    "packet-tracer",
    "gns3",
    "troubleshooting real",
    "roteamento avançado"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.8",
      "reason": "A aula 4.8 apresenta ICMP, ping, TTL e traceroute, que são a base operacional desta aula."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.1",
      "reason": "A aula 11.1 explica a diferença entre entrega local e roteamento entre redes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.2",
      "reason": "A aula 11.2 ensina tabela de rotas e longest prefix match, essenciais para interpretar o caminho escolhido."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.3",
      "reason": "A rota default e o gateway de último recurso aparecem em praticamente todo diagnóstico de saída."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.6",
      "reason": "Métrica e distância administrativa ajudam a explicar por que uma rota venceu outra."
    }
  ],
  "objectives": [
    "Criar um método prático de troubleshooting IPv4 por evidências, não por tentativa aleatória.",
    "Interpretar tabelas de rotas em Windows, Linux, Cisco e ambientes cloud.",
    "Usar traceroute, tracert, mtr, ping, route print, ip route, ip route get e show ip route de forma correta.",
    "Diferenciar falha de rota, falha de gateway, falha de DNS, bloqueio de firewall, perda, latência e aplicação indisponível.",
    "Entender limitações de traceroute, ICMP filtrado, rate limit, rota assimétrica e saltos que não respondem.",
    "Montar evidências sanitizadas para NOC, SOC, provedor, time de cloud ou time de aplicação."
  ],
  "learningOutcomes": [
    "Dado um host sem acesso externo, o aluno verifica IP, máscara, gateway, ARP, DNS e rota default antes de culpar a Internet.",
    "Dada uma tabela de rotas, o aluno identifica qual rota será usada por longest prefix match.",
    "Dado um traceroute com asteriscos, o aluno diferencia perda real de ICMP filtrado ou rate limit.",
    "Dado um cenário de VPN/cloud, o aluno procura rota de ida, rota de retorno, security group/NACL/firewall e sobreposição de CIDR.",
    "Dado um problema intermitente, o aluno usa mtr ou pathping para observar perda e latência ao longo do tempo.",
    "Dada uma evidência de produção, o aluno remove IPs sensíveis quando necessário e documenta horário, origem, destino, ferramenta e hipótese."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Em redes reais, a frase “não está conectando” quase nunca é diagnóstico. Ela pode significar IP errado, gateway ausente, rota default quebrada, DNS falhando, firewall bloqueando, rota de retorno inexistente, NAT incorreto, link com perda, aplicação fora do ar ou política de segurança negando o tráfego.</p><p>O papel de quem trabalha com infraestrutura, redes, cloud, DevSecOps ou segurança é transformar reclamações vagas em evidências. Para isso, é preciso saber ler a tabela de rotas, testar o próximo salto, observar o caminho salto a salto e separar falha de conectividade de falha de aplicação.</p><div class=\"callout callout--problem\"><strong>Ideia central:</strong> troubleshooting bom não é rodar comandos aleatórios. É formular hipóteses, coletar evidências na ordem certa e provar onde o tráfego para.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>Ferramentas como <code>ping</code> e <code>traceroute</code> nasceram porque redes IP cresceram rápido e operadores precisavam de formas simples de testar alcance, latência e caminho. O ICMP permitiu mensagens de controle, como Echo Reply e Time Exceeded, que se tornaram fundamentais para diagnóstico.</p><p>Com o tempo, ambientes ficaram mais complexos: NAT, firewalls stateful, VPNs, clouds, SD-WAN, balanceadores, proxies, containers, Kubernetes e políticas de segurança passaram a interferir no caminho. Por isso, ferramentas antigas continuam úteis, mas precisam ser interpretadas com cuidado.</p><p>Hoje, diagnosticar roteamento exige combinar ferramentas clássicas com leitura de route tables, logs, flow logs, security groups, ACLs, tabelas de firewall e observabilidade.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>Um usuário diz: “consigo pingar o gateway, mas não acesso o sistema”. Outro diz: “o traceroute para no meio”. Um desenvolvedor afirma: “a API funciona localmente, mas não da VM na cloud”. Um analista de segurança observa tráfego saindo por um caminho que não passa pelo firewall esperado.</p><p>Todos esses casos podem envolver roteamento, mas nenhum deve ser tratado como certeza sem evidências. <code>ping</code> funcionando não prova que TCP/443 funciona. <code>traceroute</code> com asteriscos não prova que o pacote morreu. DNS resolvendo não prova que a rota existe. Rota de ida funcionando não prova que a rota de retorno existe.</p><div class=\"callout callout--warning\"><strong>Problema clássico:</strong> equipes diferentes olham apenas sua própria camada. O time de rede diz “tem rota”, o time de firewall diz “não chegou tráfego”, o time de aplicação diz “porta está aberta”. A aula ensina a montar uma sequência que une as evidências.</div></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><ol class=\"flow-list\"><li><strong>Diagnóstico básico:</strong> ping para loopback, IP local, gateway e destino.</li><li><strong>Diagnóstico de rota:</strong> leitura da tabela de rotas e escolha do próximo salto.</li><li><strong>Diagnóstico salto a salto:</strong> traceroute/tracert usando TTL para revelar roteadores no caminho.</li><li><strong>Diagnóstico contínuo:</strong> mtr/pathping combinando perda e latência ao longo do tempo.</li><li><strong>Diagnóstico moderno:</strong> flow logs, firewall logs, cloud route tables, NACLs, security groups, NAT gateways, proxies e observabilidade.</li><li><strong>Diagnóstico como engenharia:</strong> evidência, hipótese, teste, conclusão e rollback.</li></ol></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p>Troubleshooting de roteamento IPv4 é o processo de descobrir como um pacote deveria sair de uma origem, qual rota será escolhida, qual próximo salto receberá o frame, por onde o tráfego passa, se existe rota de retorno e se algum controle de segurança bloqueia a comunicação.</p><p>As ferramentas principais desta aula são: <code>route print</code> e <code>Get-NetRoute</code> no Windows; <code>ip route</code> e <code>ip route get</code> no Linux; <code>show ip route</code> no Cisco; <code>traceroute</code>, <code>tracert</code>, <code>mtr</code>, <code>pathping</code>, <code>ping</code> e testes de porta.</p><div class=\"definition-box\"><strong>Definição prática:</strong> a tabela de rotas mostra a decisão esperada. O traceroute sugere o caminho observado. Logs e testes de porta indicam se políticas e aplicações permitem o tráfego.</div></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><p>Antes de qualquer pacote sair, o host consulta sua tabela de rotas. Ele compara o IP de destino com as rotas disponíveis e aplica longest prefix match. A rota escolhida aponta para uma interface de saída e, geralmente, para um next hop. Se o destino for remoto, o host não tenta descobrir o MAC do destino final: ele usa ARP para descobrir o MAC do gateway/next hop.</p><p>O <code>traceroute</code> explora o campo TTL. Ele envia pacotes com TTL baixo. Quando o TTL chega a zero, um roteador no caminho pode responder com ICMP Time Exceeded. Repetindo isso com TTL 1, 2, 3 e assim por diante, a ferramenta estima os saltos até o destino.</p><p>O <code>mtr</code> combina repetição contínua com estatísticas de perda e latência. Ele é útil para problemas intermitentes, mas exige interpretação: um salto intermediário pode deixar de responder a ICMP e ainda assim encaminhar tráfego normalmente.</p></section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>Em uma arquitetura corporativa, o caminho de um pacote pode atravessar host, switch, gateway da VLAN, firewall, roteador, VPN, SD-WAN, NAT, link de provedor, cloud edge, load balancer e serviço. Cada ponto pode ter uma tabela de rotas e uma política.</p><table class=\"data-table\"><thead><tr><th>Ponto</th><th>O que verificar</th><th>Ferramentas</th></tr></thead><tbody><tr><td>Host</td><td>IP, máscara, gateway, DNS, tabela de rotas</td><td>ipconfig, route print, ip route</td></tr><tr><td>Gateway</td><td>ARP, interface, VLAN, rota de saída</td><td>show arp, show ip route</td></tr><tr><td>Firewall</td><td>Policy, NAT, sessão, rota, logs</td><td>logs, flow, packet tracer do fabricante</td></tr><tr><td>Cloud</td><td>Route table, SG, NACL, NAT, peering, VPN</td><td>console, CLI, flow logs</td></tr><tr><td>Destino</td><td>Serviço, porta, listener, rota de retorno</td><td>ss, netstat, curl, Test-NetConnection</td></tr></tbody></table></section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Imagine que você precisa entregar um documento em outra cidade. A tabela de rotas é seu mapa com regras: para bairros locais, vá direto; para outras cidades, vá até a rodoviária; para um bairro específico, use uma rota especial. O traceroute é como perguntar em cada pedágio por onde o documento passou.</p><p>Mas a analogia tem limite. Alguns pedágios podem não responder perguntas, mas ainda deixar o documento passar. Outros podem responder lentamente por não priorizar perguntas administrativas. Por isso, ausência de resposta em um salto não é automaticamente falha de encaminhamento.</p></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2><p>Seu notebook tem IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. Você tenta acessar <code>8.8.8.8</code>. O host consulta a tabela de rotas, percebe que <code>8.8.8.8</code> não está na rede local e escolhe a rota default <code>0.0.0.0/0</code> via <code>192.168.1.1</code>.</p><p>O comando <code>route print</code> ou <code>ip route</code> confirma a rota default. O comando <code>traceroute 8.8.8.8</code> mostra os saltos. Se o primeiro salto falhar, suspeite de gateway, ARP, Wi-Fi, VLAN ou firewall local. Se o primeiro salto responder e o caminho parar depois, a investigação muda para roteador, provedor, NAT ou políticas externas.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Uma estação da VLAN Usuários tenta acessar um servidor na VLAN Servidores. O usuário diz que “a rede caiu”. O diagnóstico correto começa no host: IP, máscara, gateway, DNS e rota. Depois valida ARP para o gateway, ping para gateway, traceroute para o servidor, logs do firewall entre VLANs e rota de retorno do servidor.</p><p>Em empresas, a falha frequentemente está em políticas entre zonas: usuários podem acessar portal web, mas não banco; servidores podem responder apenas por portas específicas; convidados não devem acessar rede interna; gestão deve ser isolada. Troubleshooting precisa respeitar a matriz de comunicação aprovada.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em uma VPC/VNet, uma VM privada não acessa a Internet. Possíveis causas: rota default ausente para NAT Gateway, NAT em subnet errada, security group bloqueando saída, NACL negando retorno, DNS privado incorreto, rota mais específica desviando tráfego para VPN ou tabela de rotas associada à subnet errada.</p><p>O diagnóstico combina comandos no sistema operacional com leitura da route table da cloud. Em clouds, também é comum haver ferramentas de reachability analyzer, flow logs e testes de conectividade gerenciados.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Um runner de CI/CD não consegue baixar dependências, mas a aplicação em produção funciona. O problema pode estar em proxy corporativo, rota default do runner, security group, DNS, NAT Gateway, firewall de saída ou allowlist de repositório. Rodar <code>curl</code> sem olhar rota e política pode levar a conclusões erradas.</p><p>Em pipelines, o diagnóstico deve virar evidência reprodutível: comando executado, origem, destino, horário, saída sanitizada, rota esperada, rota observada e alteração recente. Isso reduz discussões entre times e permite rollback seguro.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>Para Segurança da Informação, troubleshooting de rota é parte de investigação. Uma rota mais específica pode desviar tráfego de inspeção. Um NAT mal posicionado pode esconder origem. Um caminho assimétrico pode quebrar firewall stateful. Uma rota default aberta pode permitir saída não controlada.</p><p>Ao coletar evidências, evite divulgar IPs públicos, nomes internos, ASN, topologia, regras de firewall e rotas sensíveis sem necessidade. Em relatórios, sanitize dados e mantenha o suficiente para provar a hipótese.</p><div class=\"callout callout--security\"><strong>Boa prática:</strong> nunca trate traceroute como ferramenta ofensiva neste curso. Use-o para diagnóstico autorizado, em redes próprias, laboratório, cloud sob sua gestão ou ambientes explicitamente permitidos.</div></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2><svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m11l09-title m11l09-desc\"><title id=\"m11l09-title\">Fluxo de troubleshooting de roteamento IPv4</title><desc id=\"m11l09-desc\">Diagrama mostrando host, tabela de rotas, gateway, firewall, cloud, destino e ferramentas como route print, ip route, traceroute e mtr.</desc><defs><marker id=\"m11l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M 0 0 L 9 3 L 0 6 z\" class=\"svg-flow\"></path></marker></defs><rect x=\"35\" y=\"55\" width=\"170\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--client\"></rect><text x=\"120\" y=\"93\" text-anchor=\"middle\" class=\"svg-label\">Host origem</text><text x=\"120\" y=\"120\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">route print / ip route</text><rect x=\"260\" y=\"55\" width=\"170\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--router\"></rect><text x=\"345\" y=\"93\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"345\" y=\"120\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP + next hop</text><rect x=\"485\" y=\"55\" width=\"170\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--firewall\"></rect><text x=\"570\" y=\"93\" text-anchor=\"middle\" class=\"svg-label\">Firewall/NAT</text><text x=\"570\" y=\"120\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">policy + sessão</text><rect x=\"710\" y=\"55\" width=\"220\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect><text x=\"820\" y=\"93\" text-anchor=\"middle\" class=\"svg-label\">Destino / Cloud</text><text x=\"820\" y=\"120\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SG/NACL/serviço</text><path d=\"M 205 103 L 260 103\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l09-arrow)\"></path><path d=\"M 430 103 L 485 103\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l09-arrow)\"></path><path d=\"M 655 103 L 710 103\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l09-arrow)\"></path><path d=\"M 820 150 C 790 215 660 230 610 270\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m11l09-arrow)\"></path><rect x=\"70\" y=\"230\" width=\"250\" height=\"245\" rx=\"14\" class=\"svg-node svg-node--server\"></rect><text x=\"195\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Sequência recomendada</text><text x=\"95\" y=\"300\" class=\"svg-label svg-label--small\">1. IP/máscara/gateway</text><text x=\"95\" y=\"327\" class=\"svg-label svg-label--small\">2. tabela de rotas</text><text x=\"95\" y=\"354\" class=\"svg-label svg-label--small\">3. ARP do gateway</text><text x=\"95\" y=\"381\" class=\"svg-label svg-label--small\">4. ping/traceroute/mtr</text><text x=\"95\" y=\"408\" class=\"svg-label svg-label--small\">5. teste de porta</text><text x=\"95\" y=\"435\" class=\"svg-label svg-label--small\">6. logs e retorno</text><rect x=\"380\" y=\"230\" width=\"250\" height=\"245\" rx=\"14\" class=\"svg-node svg-node--security\"></rect><text x=\"505\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Interpretação</text><text x=\"405\" y=\"300\" class=\"svg-label svg-label--small\">* não significa sempre perda</text><text x=\"405\" y=\"327\" class=\"svg-label svg-label--small\">ping não prova aplicação</text><text x=\"405\" y=\"354\" class=\"svg-label svg-label--small\">TTL revela saltos</text><text x=\"405\" y=\"381\" class=\"svg-label svg-label--small\">mtr mostra tendência</text><text x=\"405\" y=\"408\" class=\"svg-label svg-label--small\">retorno também importa</text><text x=\"405\" y=\"435\" class=\"svg-label svg-label--small\">sanitize evidências</text><rect x=\"690\" y=\"230\" width=\"220\" height=\"245\" rx=\"14\" class=\"svg-node svg-node--attacker\"></rect><text x=\"800\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Riscos comuns</text><text x=\"715\" y=\"300\" class=\"svg-label svg-label--small\">rota específica indevida</text><text x=\"715\" y=\"327\" class=\"svg-label svg-label--small\">caminho assimétrico</text><text x=\"715\" y=\"354\" class=\"svg-label svg-label--small\">firewall stateful</text><text x=\"715\" y=\"381\" class=\"svg-label svg-label--small\">NAT incorreto</text><text x=\"715\" y=\"408\" class=\"svg-label svg-label--small\">CIDR sobreposto</text><text x=\"715\" y=\"435\" class=\"svg-label svg-label--small\">ICMP filtrado</text></svg></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>O laboratório virou uma sequência de cinco incidentes guiados. O objetivo é treinar método: hipótese, comando, evidência, interpretação, decisão e RCA, separando rota, política, retorno e MTU.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios treinam interpretação de route table, traceroute, mtr, perda intermediária, rota default, rota específica e falhas de retorno.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>Você receberá evidências de uma estação, um servidor e um gateway. Sua missão é identificar onde o fluxo quebra e propor a correção mínima segura.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra como comparar rota esperada, rota observada, logs e teste de aplicação sem pular camadas.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>Troubleshooting de roteamento IPv4 exige método. Primeiro confirme a configuração local. Depois leia a tabela de rotas. Em seguida valide gateway, ARP, ICMP, traceroute/mtr, teste de porta, políticas e rota de retorno.</p><p>A principal maturidade desta aula é interpretar limites das ferramentas. Asterisco no traceroute não é necessariamente perda. Ping funcionando não prova serviço. Rota de ida não prova rota de volta. Uma rota mais específica pode desviar tráfego de controles de segurança.</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, <strong>6.10 — Revisão prática: desenhar rede roteada segura</strong>, você vai consolidar o módulo inteiro desenhando uma rede roteada com sub-redes, gateways, rotas, redundância, inter-VLAN, firewall, cloud e plano de validação.</p></section>"
  },
  "networkContext": {
    "layers": [
      "Camada 3",
      "Plano de dados",
      "Plano de controle",
      "Troubleshooting operacional"
    ],
    "relatedConcepts": [
      "tabela de rotas",
      "longest prefix match",
      "rota default",
      "next hop",
      "TTL",
      "ICMP Time Exceeded",
      "traceroute",
      "mtr",
      "rota de retorno",
      "caminho assimétrico",
      "firewall stateful",
      "NAT",
      "cloud route table"
    ],
    "previousLessons": [
      "4.8",
      "6.1",
      "6.2",
      "6.3",
      "6.6",
      "6.8"
    ],
    "nextLessons": [
      "11.10"
    ]
  },
  "protocolFields": [
    {
      "name": "Destino",
      "meaning": "Endereço IPv4 ou prefixo que o host tenta alcançar.",
      "securityNote": "Destino sensível pode revelar sistema interno; sanitize evidências."
    },
    {
      "name": "Prefixo da rota",
      "meaning": "Rede que combina com o destino na tabela de rotas.",
      "securityNote": "Rotas amplas demais podem permitir caminhos não inspecionados."
    },
    {
      "name": "Next hop/Gateway",
      "meaning": "Próximo roteador que receberá o pacote.",
      "securityNote": "Gateway incorreto ou falso pode desviar tráfego."
    },
    {
      "name": "Interface de saída",
      "meaning": "Interface pela qual o pacote sairá.",
      "securityNote": "Interface errada pode indicar métrica indevida, VPN ativa ou rota mais específica."
    },
    {
      "name": "Métrica",
      "meaning": "Critério usado para escolher entre rotas comparáveis.",
      "securityNote": "Métrica mal ajustada pode usar link inseguro ou caro."
    },
    {
      "name": "TTL",
      "meaning": "Contador decrementado a cada salto, usado por traceroute.",
      "securityNote": "TTL ajuda diagnóstico, mas respostas ICMP podem ser filtradas."
    },
    {
      "name": "ICMP Time Exceeded",
      "meaning": "Mensagem usada para revelar saltos intermediários.",
      "securityNote": "Ausência de resposta não prova bloqueio do tráfego real."
    },
    {
      "name": "Rota de retorno",
      "meaning": "Caminho que o destino usa para responder à origem.",
      "securityNote": "Sem retorno, conexão falha mesmo com ida correta."
    }
  ],
  "packetFlow": [
    "O host recebe uma tentativa de comunicação para um destino IPv4.",
    "O sistema operacional consulta a tabela de rotas.",
    "O longest prefix match escolhe a rota mais específica compatível.",
    "A rota aponta para interface de saída e next hop.",
    "Se o next hop estiver na LAN, o host usa ARP para obter o MAC correspondente.",
    "O pacote segue para gateway, firewall, roteador, VPN ou cloud edge.",
    "Cada roteador repete a decisão usando sua própria tabela de rotas.",
    "Traceroute revela parte do caminho usando TTL e ICMP Time Exceeded.",
    "O destino precisa ter rota e política de retorno para responder.",
    "Logs e testes de porta confirmam se a aplicação e a política permitem o fluxo."
  ],
  "deepDive": {
    "title": "Por que traceroute não é verdade absoluta",
    "points": [
      "Traceroute revela respostas ICMP de roteadores, não necessariamente todos os dispositivos no caminho.",
      "Um roteador pode encaminhar pacotes normalmente e não responder a TTL expirado por política ou rate limit.",
      "Firewall e NAT podem alterar a visibilidade do caminho.",
      "O caminho de ida pode ser diferente do caminho de volta.",
      "Traceroute baseado em UDP, ICMP ou TCP pode produzir resultados diferentes.",
      "MTR mostra tendência estatística, mas perda em salto intermediário só importa se também aparece nos saltos seguintes ou no destino."
    ]
  },
  "commonMistakes": [
    "Achar que ping funcionando significa que a aplicação está saudável.",
    "Achar que asterisco no traceroute sempre significa pacote bloqueado.",
    "Ignorar a tabela de rotas local e começar pelo provedor.",
    "Não testar rota de retorno.",
    "Confundir falha de DNS com falha de roteamento.",
    "Não considerar firewall stateful, NAT, SG/NACL ou proxy.",
    "Divulgar evidências com IPs, nomes internos e topologia sensível.",
    "Rodar mtr por poucos segundos e concluir que há perda intermitente."
  ],
  "troubleshooting": {
    "method": "Separar configuração local, decisão de rota, alcance do gateway, caminho salto a salto, política de segurança, serviço de destino e rota de retorno.",
    "steps": [
      "Registrar origem, destino, horário, rede usada, VPN ativa e sintoma observado.",
      "Verificar IP, máscara, gateway, DNS e interface ativa.",
      "Ler a tabela de rotas e identificar a rota que vence para o destino.",
      "Validar ARP/neighbor para o gateway quando aplicável.",
      "Testar ping para loopback, IP local, gateway e destino por IP.",
      "Executar traceroute/tracert e interpretar saltos com cuidado.",
      "Executar mtr/pathping quando houver suspeita de perda ou latência intermitente.",
      "Testar porta da aplicação com curl, Test-NetConnection, nc ou equivalente.",
      "Checar logs de firewall, flow logs, security groups, NACLs e NAT.",
      "Confirmar rota de retorno no destino ou no domínio remoto.",
      "Documentar hipótese, evidências, conclusão e próxima ação."
    ],
    "commands": [
      {
        "windows": [
          "ipconfig /all",
          "route print",
          "Get-NetRoute",
          "Get-NetIPConfiguration",
          "Get-NetNeighbor",
          "ping <destino>",
          "tracert <destino>",
          "pathping <destino>",
          "Test-NetConnection <destino> -Port 443",
          "Resolve-DnsName <nome>"
        ],
        "linux": [
          "ip addr",
          "ip route",
          "ip route get <destino>",
          "ip neigh",
          "ping -c 4 <destino>",
          "traceroute <destino>",
          "mtr <destino>",
          "tracepath <destino>",
          "curl -Iv https://<destino>",
          "ss -tulpen",
          "resolvectl status",
          "dig <nome>"
        ],
        "cisco": [
          "show ip interface brief",
          "show ip route",
          "show ip route <prefixo>",
          "show arp",
          "show access-lists",
          "show logging",
          "ping <destino>",
          "traceroute <destino>",
          "show running-config | include ip route"
        ],
        "cloud": [
          "Verificar route table associada à subnet",
          "Verificar security group/firewall de origem e destino",
          "Verificar NACL/NSG e regras de retorno",
          "Verificar NAT Gateway, Internet Gateway, peering e VPN",
          "Consultar flow logs",
          "Usar ferramenta de reachability quando disponível"
        ]
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Troubleshooting com traceroute, mtr, route print e ip route.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Executar diagnóstico apenas em ambientes autorizados.",
      "Sanitizar evidências antes de compartilhar externamente.",
      "Correlacionar traceroute com logs de firewall e flow logs.",
      "Validar se o tráfego passa por pontos de inspeção esperados.",
      "Documentar mudanças recentes de rota, NAT, ACL, SG/NACL e VPN.",
      "Confirmar rota de retorno antes de abrir regras amplas."
    ],
    "badPractices": [
      "Abrir 0.0.0.0/0 para resolver problema sem causa raiz.",
      "Assumir que ICMP bloqueado significa serviço bloqueado.",
      "Compartilhar topologia interna completa em tickets externos.",
      "Desabilitar firewall para testar sem janela ou rollback.",
      "Criar rota mais específica temporária e esquecer em produção."
    ],
    "vulnerabilities": [
      {
        "name": "Bypass de firewall por rota específica indevida.",
        "description": "Risco relacionado à aula 11.9 — Troubleshooting com traceroute, mtr, route print e ip route.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Governança de mudanças de rota."
      },
      {
        "name": "Exposição de rede por rota default ampla.",
        "description": "Risco relacionado à aula 11.9 — Troubleshooting com traceroute, mtr, route print e ip route.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Matriz de comunicação aprovada."
      },
      {
        "name": "Caminho assimétrico quebrando inspeção stateful.",
        "description": "Risco relacionado à aula 11.9 — Troubleshooting com traceroute, mtr, route print e ip route.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Flow logs e SIEM."
      },
      {
        "name": "Vazamento de informações em traceroute, DNS reverso e mensagens ICMP.",
        "description": "Risco relacionado à aula 11.9 — Troubleshooting com traceroute, mtr, route print e ip route.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentação por zona."
      },
      {
        "name": "NAT ou rota de retorno permitindo comunicação não prevista.",
        "description": "Risco relacionado à aula 11.9 — Troubleshooting com traceroute, mtr, route print e ip route.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Rotas específicas justificadas e revisadas."
      }
    ],
    "mitigations": [
      "Governança de mudanças de rota.",
      "Matriz de comunicação aprovada.",
      "Flow logs e SIEM.",
      "Segmentação por zona.",
      "Rotas específicas justificadas e revisadas.",
      "Security groups/ACLs mínimos.",
      "Monitoramento de latência, perda e reachability."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar roteamento, OSPF, BGP e caminhos com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Governança de mudanças de rota.",
      "Matriz de comunicação aprovada.",
      "Flow logs e SIEM.",
      "Segmentação por zona.",
      "Rotas específicas justificadas e revisadas.",
      "Security groups/ACLs mínimos.",
      "Monitoramento de latência, perda e reachability."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "labType": "troubleshooting",
    "title": "Diagnóstico guiado: cinco falhas de caminho com route print, ip route, traceroute, mtr e show ip route",
    "objective": "Transformar troubleshooting de rota em método: separar sintoma, hipótese, evidência, teste, decisão e RCA usando Windows, Linux, Cisco e cloud route tables.",
    "scenario": "O aluno recebe cinco incidentes: gateway errado, rota mais específica indevida, ausência de rota de retorno, ACL bloqueando ICMP/TCP e blackhole por MTU/túnel. Para cada incidente, deve coletar evidência e explicar a causa raiz.",
    "topology": "Host Windows, host Linux, roteador/firewall, rede remota, caminho VPN/cloud e uma aplicação TCP simulada.",
    "architecture": "Troubleshooting de caminho exige olhar host, tabela de rotas, gateway, DNS quando aplicável, firewall, rota de retorno, NAT/VPN e evidências de cada salto. O laboratório não assume que ping é prova suficiente.",
    "prerequisites": [
      "Concluir aulas 11.1–11.8.",
      "Saber usar ping, traceroute/tracert, route print, ip route e show ip route."
    ],
    "tools": [
      "Windows PowerShell/CMD",
      "Linux terminal",
      "Cisco IOS ou simulador",
      "mtr/traceroute/tracert",
      "curl/Test-NetConnection",
      "Opcional: Wireshark/tcpdump"
    ],
    "estimatedTimeMinutes": 150,
    "cost": "zero/local",
    "safetyNotes": [
      "Execute apenas em laboratório ou ambiente autorizado.",
      "Não faça varredura de redes de terceiros.",
      "Ao testar portas, use serviços próprios ou ambiente controlado."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Preparar ficha de incidente",
        "instruction": "Crie uma tabela com sintoma, hipótese, comando, evidência, interpretação e próxima ação.",
        "command": "Incidente | Sintoma | Hipótese | Comando | Evidência | Decisão | RCA",
        "expectedOutput": "Modelo de diagnóstico preenchido ao longo do lab.",
        "explanation": "Troubleshooting profissional é rastreável e evita pular para conclusões."
      },
      {
        "number": 2,
        "title": "Incidente 1: gateway errado no host",
        "instruction": "Configure gateway incorreto e teste conectividade fora da rede local.",
        "command": "Windows: ipconfig /all && route print\nLinux: ip addr && ip route",
        "expectedOutput": "Host tem IP local, mas rota default aponta para gateway errado ou ausente.",
        "explanation": "Se o problema está no host, alterar roteador ou firewall desperdiça tempo."
      },
      {
        "number": 3,
        "title": "Corrigir incidente 1",
        "instruction": "Ajuste gateway e valide.",
        "command": "Windows: netsh interface ip set address name=\"Ethernet\" static 10.10.10.10 255.255.255.0 10.10.10.1\nLinux: sudo ip route replace default via 10.10.10.1",
        "expectedOutput": "Host alcança gateway e rede remota conforme rota.",
        "explanation": "A correção deve ser comprovada com teste e rota."
      },
      {
        "number": 4,
        "title": "Incidente 2: rota mais específica indevida",
        "instruction": "Adicione uma rota /32 ou /24 que desvia tráfego para next hop errado.",
        "command": "Linux: sudo ip route add 10.50.50.10/32 via 10.10.10.254\nWindows: route add 10.50.50.10 mask 255.255.255.255 10.10.10.254",
        "expectedOutput": "Apenas o destino específico falha; outros destinos da mesma rede podem funcionar.",
        "explanation": "Esse sintoma ensina longest prefix match em troubleshooting real."
      },
      {
        "number": 5,
        "title": "Diagnosticar incidente 2",
        "instruction": "Compare rota para destino exato e para a rede.",
        "command": "Linux: ip route get 10.50.50.10\nWindows: route print 10.50.50.10\nCisco: show ip route 10.50.50.10",
        "expectedOutput": "Rota mais específica aponta para next hop indevido.",
        "explanation": "Sempre pergunte: qual rota será usada para este IP específico?"
      },
      {
        "number": 6,
        "title": "Incidente 3: sem rota de retorno",
        "instruction": "Remova rota de retorno no roteador remoto e teste ping/traceroute.",
        "command": "Cisco remoto: no ip route 10.10.10.0 255.255.255.0 172.16.23.1",
        "expectedOutput": "Pacote de ida chega, mas resposta não retorna; sintomas podem parecer firewall.",
        "explanation": "Rota de retorno ausente é uma das causas mais confundidas com bloqueio."
      },
      {
        "number": 7,
        "title": "Provar rota de retorno ausente",
        "instruction": "Teste do lado remoto para origem e examine tabela de rotas.",
        "command": "Cisco: show ip route 10.10.10.10\ntraceroute 10.10.10.10",
        "expectedOutput": "Destino não sabe voltar ou usa caminho errado.",
        "explanation": "Troubleshooting deve ser bidirecional."
      },
      {
        "number": 8,
        "title": "Incidente 4: ACL bloqueando ICMP ou TCP",
        "instruction": "Aplique regra que bloqueia ICMP mas permite TCP, ou o contrário.",
        "command": "Cisco: access-list 101 deny icmp any host 10.50.50.10\naccess-list 101 permit ip any any",
        "expectedOutput": "Ping falha, mas teste TCP pode funcionar, ou vice-versa.",
        "explanation": "Ping falhando não prova que a rota está quebrada."
      },
      {
        "number": 9,
        "title": "Separar rota de política",
        "instruction": "Use traceroute, Test-NetConnection/curl e logs/contadores de ACL.",
        "command": "Windows: Test-NetConnection 10.50.50.10 -Port 443\nLinux: curl -vk https://10.50.50.10\nCisco: show access-lists",
        "expectedOutput": "Rota pode estar correta enquanto política bloqueia protocolo específico.",
        "explanation": "Roteamento responde por caminho; firewall responde por autorização."
      },
      {
        "number": 10,
        "title": "Incidente 5: MTU/MSS em túnel",
        "instruction": "Simule caminho com túnel/VPN e teste pacotes maiores com DF.",
        "command": "Windows: ping 10.50.50.10 -f -l 1472\nLinux: ping -M do -s 1472 10.50.50.10",
        "expectedOutput": "Pacotes pequenos funcionam; pacotes grandes falham.",
        "explanation": "Blackhole de MTU costuma quebrar aplicações enquanto ping pequeno funciona."
      },
      {
        "number": 11,
        "title": "Coletar evidências por camada",
        "instruction": "Para cada incidente, colete rota do host, rota do roteador, caminho, teste de porta e logs.",
        "command": "ipconfig /all | route print | ip route | ip route get | show ip route | traceroute | mtr | show access-lists",
        "expectedOutput": "Conjunto de evidências por hipótese.",
        "explanation": "Um bom diagnóstico mostra por que hipóteses foram descartadas."
      },
      {
        "number": 12,
        "title": "Escrever RCA e prevenção",
        "instruction": "Para cada falha, escreva causa raiz, correção, prevenção e monitoramento.",
        "command": "RCA: causa | impacto | correção | prevenção | alerta futuro",
        "expectedOutput": "Cinco RCAs curtos e objetivos.",
        "explanation": "O objetivo final é reduzir recorrência, não apenas resolver o chamado atual."
      }
    ],
    "expectedResult": "O aluno deve diagnosticar cinco falhas de caminho, separando roteamento, política, retorno e MTU, e entregar evidências com RCA.",
    "validation": [
      {
        "check": "Host tem rota default correta",
        "command": "Windows route print / Linux ip route",
        "expected": "Default aponta para gateway local correto.",
        "ifFails": "Corrigir gateway antes de investigar a rede."
      },
      {
        "check": "Rota para destino exato conhecida",
        "command": "ip route get destino / show ip route destino",
        "expected": "Next hop previsto pelo desenho.",
        "ifFails": "Procurar rota mais específica ou default errada."
      },
      {
        "check": "Traceroute interpretado corretamente",
        "command": "tracert/traceroute/mtr destino",
        "expected": "Saltos coerentes; ausência de resposta não é interpretada isoladamente como queda.",
        "ifFails": "Combinar com outros testes e logs."
      },
      {
        "check": "Rota de retorno validada",
        "command": "show ip route origem no lado remoto",
        "expected": "Destino sabe voltar para a origem.",
        "ifFails": "Adicionar rota de retorno ou corrigir caminho assimétrico."
      },
      {
        "check": "Política separada de rota",
        "command": "Test-NetConnection/curl + show access-lists/logs",
        "expected": "Bloqueio de porta/protocolo identificado quando rota está OK.",
        "ifFails": "Não concluir apenas com ping."
      },
      {
        "check": "MTU testada quando há túnel",
        "command": "ping com DF e tamanhos variados",
        "expected": "Tamanho máximo identificado ou descartado como hipótese.",
        "ifFails": "Ajustar MSS/MTU em ambiente controlado."
      },
      {
        "check": "RCA completo",
        "command": "Revisar tabela de incidentes",
        "expected": "Cada incidente tem evidência, causa, correção e prevenção.",
        "ifFails": "Completar diagnóstico antes de encerrar."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Ping para IP remoto falha",
        "probableCause": "Pode ser rota, retorno, firewall, ICMP bloqueado ou MTU.",
        "howToConfirm": "Não usar apenas ping; combine rota, traceroute, teste TCP e logs.",
        "fix": "Corrigir a causa confirmada por evidência."
      },
      {
        "symptom": "Traceroute para em um salto",
        "probableCause": "Filtro de ICMP/TTL excedido, rota ausente ou firewall.",
        "howToConfirm": "Testar porta TCP e ver logs/rotas no salto.",
        "fix": "Não tratar traceroute isoladamente como prova final."
      },
      {
        "symptom": "Aplicação falha, ping funciona",
        "probableCause": "Firewall L4/L7, DNS, TLS, proxy ou MTU.",
        "howToConfirm": "curl -v, Test-NetConnection, logs e captura.",
        "fix": "Corrigir política/aplicação/MTU conforme evidência."
      },
      {
        "symptom": "Somente um IP falha dentro da rede remota",
        "probableCause": "Rota host /32, firewall específico ou host down.",
        "howToConfirm": "ip route get IP específico e teste a outros IPs do mesmo prefixo.",
        "fix": "Remover rota específica indevida ou corrigir host/política."
      },
      {
        "symptom": "Funciona de A para B, mas não de B para A",
        "probableCause": "Rota assimétrica, firewall stateful, NAT ou retorno ausente.",
        "howToConfirm": "Traceroute nos dois sentidos e logs de firewall/NAT.",
        "fix": "Alinhar rota de retorno e política stateful."
      },
      {
        "symptom": "Falhas só em VPN/cloud",
        "probableCause": "CIDR sobreposto, route table, propagação de rota, MTU/MSS, DNS ou security group.",
        "howToConfirm": "Ver route tables, flow logs, teste DF e DNS.",
        "fix": "Corrigir CIDR/rota/política/MTU e registrar arquitetura."
      }
    ],
    "improvements": [
      "Criar runbook de incidentes de rota.",
      "Adicionar flow logs de cloud ao diagnóstico.",
      "Usar tcpdump/Wireshark para confirmar ida e ausência de volta.",
      "Criar automação que coleta ip route, route print e traceroute.",
      "Adicionar matriz de decisão para quando escalar para time de rede, firewall, cloud ou aplicação."
    ],
    "evidenceToCollect": [
      "ipconfig /all.",
      "route print.",
      "ip addr e ip route.",
      "ip route get destino.",
      "show ip route destino.",
      "traceroute/tracert/mtr.",
      "Test-NetConnection/curl.",
      "Contadores/logs de ACL/firewall.",
      "Teste de MTU com DF.",
      "RCA dos cinco incidentes."
    ],
    "questions": [
      "Por que ping sozinho é uma evidência fraca?",
      "Como você prova que a rota de ida está correta?",
      "Como você prova que a resposta sabe voltar?",
      "Quando uma falha de MTU parece falha de aplicação?",
      "Qual evidência separa firewall de roteamento?"
    ],
    "challenge": "Receba um ticket: “usuários da filial acessam o portal interno, mas upload de arquivos grandes falha apenas pela VPN”. Monte hipótese, comandos, evidências, causa raiz provável e correção.",
    "solution": "A solução começa validando rota e DNS, depois testa TCP da aplicação, compara acesso dentro e fora da VPN, executa ping com DF/tamanhos progressivos, verifica logs de firewall/VPN e conclui provável problema de MTU/MSS se pacotes pequenos funcionam e maiores falham. A correção é ajustar MSS clamping/MTU no túnel conforme plataforma, validar novamente e documentar prevenção.",
    "id": "lab-11.9"
  },
  "mentorQuestions": [
    "Qual rota exatamente seu sistema usará para este destino e por quê?",
    "O problema é de ida, retorno, política, DNS ou aplicação? Qual evidência sustenta sua resposta?",
    "Se o traceroute mostra asteriscos no salto 5, que hipóteses você deve considerar antes de afirmar perda?"
  ],
  "quiz": [
    {
      "question": "Qual é a primeira fonte de verdade para saber o próximo salto escolhido por um host?",
      "options": [
        "Tabela de rotas",
        "DNS",
        "Histórico do navegador",
        "Nome do switch"
      ],
      "answer": "Tabela de rotas",
      "explanation": "A tabela de rotas define qual prefixo combina com o destino e qual next hop/interface será usado."
    },
    {
      "question": "Um asterisco em traceroute sempre significa que o pacote foi bloqueado?",
      "options": [
        "Sim",
        "Não",
        "Somente em redes locais",
        "Somente em BGP"
      ],
      "answer": "Não",
      "explanation": "O salto pode apenas não responder a ICMP/TTL expirado, aplicar rate limit ou ocultar respostas."
    },
    {
      "question": "O que o comando ip route get <destino> ajuda a descobrir no Linux?",
      "options": [
        "A rota efetiva para o destino",
        "A senha do roteador",
        "O conteúdo HTTP",
        "O fabricante do cabo"
      ],
      "answer": "A rota efetiva para o destino",
      "explanation": "Ele mostra a decisão de roteamento para um destino específico."
    },
    {
      "question": "Ping para o destino funcionando prova que a aplicação na porta 443 funciona?",
      "options": [
        "Sim",
        "Não",
        "Sempre em Linux",
        "Apenas em cloud"
      ],
      "answer": "Não",
      "explanation": "ICMP pode funcionar enquanto TCP/443 é bloqueado ou a aplicação está fora do ar."
    },
    {
      "question": "Por que rota de retorno importa?",
      "options": [
        "Porque a resposta precisa voltar para a origem",
        "Porque DNS sempre usa retorno manual",
        "Porque ARP cruza Internet",
        "Porque elimina firewall"
      ],
      "answer": "Porque a resposta precisa voltar para a origem",
      "explanation": "Sem caminho de retorno permitido, a comunicação falha mesmo que a ida pareça correta."
    },
    {
      "question": "Qual risco de uma rota mais específica indevida?",
      "options": [
        "Desviar tráfego de controles esperados",
        "Aumentar tamanho do cabo",
        "Mudar o endereço MAC de todos os hosts",
        "Desabilitar DNS automaticamente"
      ],
      "answer": "Desviar tráfego de controles esperados",
      "explanation": "Rotas específicas vencem rotas amplas e podem criar bypass de firewall ou inspeção."
    },
    {
      "id": "q11.9-p1-1",
      "type": "diagnóstico",
      "q": "Ping falha, mas Test-NetConnection para TCP/443 funciona. Qual conclusão é mais correta?",
      "opts": [
        "A rota pode estar funcional e ICMP pode estar bloqueado",
        "DNS está obrigatoriamente quebrado",
        "O cabo está desconectado",
        "BGP está sempre indisponível"
      ],
      "a": 0,
      "exp": "Ping usa ICMP. Um bloqueio de ICMP não prova falha de rota nem de aplicação TCP.",
      "difficulty": "iniciante-intermediário",
      "topic": "troubleshooting"
    }
  ],
  "flashcards": [
    {
      "front": "route print",
      "back": "Comando Windows para exibir a tabela de rotas IPv4/IPv6."
    },
    {
      "front": "ip route get",
      "back": "Comando Linux para mostrar a rota efetiva até um destino específico."
    },
    {
      "front": "traceroute/tracert",
      "back": "Ferramenta que usa TTL para estimar saltos até o destino."
    },
    {
      "front": "mtr/pathping",
      "back": "Ferramentas que combinam caminho e estatísticas de perda/latência ao longo do tempo."
    },
    {
      "front": "Rota de retorno",
      "back": "Caminho usado pelo destino para responder à origem."
    },
    {
      "front": "Caminho assimétrico",
      "back": "Quando ida e volta usam caminhos diferentes, podendo quebrar firewalls stateful ou confundir diagnóstico."
    }
  ],
  "exercises": [
    {
      "title": "Leitura de rota efetiva",
      "prompt": "Explique como descobrir a rota efetiva para 10.20.30.40 no Windows e no Linux.",
      "expectedAnswer": "Windows: route print/Get-NetRoute e possível Test-NetConnection. Linux: ip route get 10.20.30.40. Depois interpretar prefixo, gateway e interface."
    },
    {
      "title": "Traceroute com asteriscos",
      "prompt": "Um traceroute mostra resposta até o salto 4, asteriscos no 5 e resposta normal no 6 e no destino. O salto 5 está derrubando pacotes?",
      "expectedAnswer": "Não necessariamente. Se saltos posteriores e destino respondem, o salto 5 provavelmente encaminha tráfego mas não responde ao traceroute ou aplica rate limit."
    },
    {
      "title": "Ping funciona, HTTPS falha",
      "prompt": "Liste três causas possíveis quando ping para o servidor funciona, mas HTTPS falha.",
      "expectedAnswer": "Firewall/SG bloqueando TCP/443, serviço não escutando, proxy/TLS/aplicação com erro, rota de retorno específica para TCP, NAT ou balanceador incorreto."
    },
    {
      "title": "Cloud privada sem Internet",
      "prompt": "Uma VM privada não acessa repositórios externos. Quais componentes verificar?",
      "expectedAnswer": "Route table da subnet, NAT Gateway, regras de saída, NACL/NSG, DNS, proxy corporativo, rota mais específica para VPN e flow logs."
    },
    {
      "id": "ex11.9-p1-1",
      "type": "RCA",
      "prompt": "Monte RCA para um caso em que ping pequeno funciona pela VPN, mas upload grande falha.",
      "expectedAnswer": "Hipótese de MTU/MSS. Validar com ping DF e tamanhos variados, curl/Test-NetConnection, logs de VPN/firewall. Corrigir MSS clamping/MTU e documentar prevenção.",
      "explanation": "Nem toda falha de aplicação é DNS, firewall ou rota."
    },
    {
      "id": "ex11.9-p1-2",
      "type": "diagnóstico",
      "prompt": "Como separar ausência de rota de retorno de bloqueio de firewall?",
      "expectedAnswer": "Testar rota no sentido reverso, traceroute reverso, show ip route origem no destino/gateway remoto e logs de firewall. Firewall mostra deny; retorno ausente mostra caminho inexistente ou incorreto.",
      "explanation": "Troubleshooting bidirecional evita falsa conclusão."
    }
  ],
  "challenge": {
    "title": "Diagnosticar acesso de uma filial a uma aplicação na cloud",
    "scenario": "Uma filial 10.30.20.0/24 acessa a aplicação 10.80.5.10:443 pela VPN. Usuários dizem que a aplicação parou. Ping ao gateway local funciona. DNS resolve. Traceroute para 10.80.5.10 para no firewall da matriz. A route table da cloud tem rota para 10.30.0.0/16 via VPN antiga, mas a filial foi migrada para 10.30.20.0/24 por novo túnel.",
    "tasks": [
      "Identificar hipóteses prováveis.",
      "Listar evidências adicionais necessárias.",
      "Dizer qual rota de retorno deve ser verificada.",
      "Propor correção mínima segura.",
      "Indicar riscos de abrir regra ampla para resolver rapidamente."
    ],
    "rubric": [
      "Usa tabela de rotas e longest prefix match.",
      "Considera rota de retorno na cloud.",
      "Não culpa apenas DNS ou aplicação.",
      "Propõe correção específica, não 0.0.0.0/0.",
      "Inclui validação pós-mudança e rollback."
    ],
    "gradingRubric": [
      {
        "criterion": "Correção técnica de rotas e caminhos",
        "points": 25,
        "description": "Prefixos, next hops, retorno, AD/métrica e caminhos efetivos estão corretos."
      },
      {
        "criterion": "Validação e evidências",
        "points": 25,
        "description": "A resposta inclui comandos, outputs esperados, testes positivos e testes negativos."
      },
      {
        "criterion": "Troubleshooting e RCA",
        "points": 20,
        "description": "O aluno identifica hipóteses, evidências, causa raiz e prevenção."
      },
      {
        "criterion": "Segurança e governança",
        "points": 20,
        "description": "A solução evita bypass, excesso de permissão, anúncios indevidos e falta de logs."
      },
      {
        "criterion": "Clareza operacional",
        "points": 10,
        "description": "Entrega documentação, rollback e próximos passos de melhoria."
      }
    ]
  },
  "commentedSolution": {
    "summary": "A causa provável é rota de retorno incorreta ou associação errada de route table/túnel para o prefixo da filial. Como DNS resolve e gateway local funciona, o foco passa a rota, firewall, VPN e retorno.",
    "steps": [
      "Confirmar no host da filial a rota efetiva para 10.80.5.10.",
      "Confirmar no firewall da matriz se o pacote chega e se há policy/NAT adequado.",
      "Verificar na cloud a rota para 10.30.20.0/24 especificamente.",
      "Comparar rota antiga 10.30.0.0/16 com rota nova mais específica e o túnel correto.",
      "Corrigir route table ou propagação de rota para apontar retorno ao túnel correto.",
      "Validar com Test-NetConnection/curl na porta 443 e flow logs.",
      "Evitar abrir 0.0.0.0/0 ou liberar qualquer origem como solução emergencial sem controle."
    ]
  },
  "glossary": [
    {
      "term": "Traceroute",
      "definition": "Ferramenta que estima o caminho até um destino usando TTL e respostas ICMP ou variações por UDP/TCP."
    },
    {
      "term": "MTR",
      "definition": "Ferramenta que combina traceroute contínuo com estatísticas de perda e latência."
    },
    {
      "term": "Route print",
      "definition": "Comando Windows para exibir a tabela de rotas."
    },
    {
      "term": "ip route",
      "definition": "Comando Linux para listar rotas configuradas."
    },
    {
      "term": "ip route get",
      "definition": "Comando Linux que mostra a rota efetiva para um destino específico."
    },
    {
      "term": "Caminho assimétrico",
      "definition": "Situação em que ida e volta usam caminhos diferentes."
    },
    {
      "term": "Rota de retorno",
      "definition": "Caminho usado pelo destino para responder à origem."
    },
    {
      "term": "ICMP Time Exceeded",
      "definition": "Mensagem gerada quando o TTL chega a zero, usada por traceroute para revelar saltos."
    }
  ],
  "references": [
    {
      "title": "RFC 792 — Internet Control Message Protocol",
      "type": "rfc",
      "note": "Base conceitual do ICMP usado por ping e mensagens de controle."
    },
    {
      "title": "RFC 1812 — Requirements for IPv4 Routers",
      "type": "rfc",
      "note": "Referência clássica para comportamento de roteadores IPv4."
    },
    {
      "title": "Documentação Linux iproute2",
      "type": "documentation",
      "note": "Base para comandos ip route, ip route get e ip neigh."
    },
    {
      "title": "Documentação Microsoft de TCP/IP e PowerShell networking",
      "type": "documentation",
      "note": "Base para route print, Get-NetRoute e Test-NetConnection."
    },
    {
      "title": "Documentação Cisco IOS Routing and Switching",
      "type": "documentation",
      "note": "Base para show ip route, ping e traceroute em Cisco."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e troubleshooting",
      "reason": "A coleta de evidências de rede deve se conectar a logs, métricas, traces e runbooks de operação."
    },
    {
      "course": "Identity, Access Management e Segurança de Identidades",
      "module": "Acesso entre serviços",
      "reason": "Falhas de rede podem ser confundidas com falhas de autenticação/autorização; separar rede, identidade e aplicação é essencial."
    }
  ],
  "progressRules": {
    "requiredSections": [
      "motivation",
      "concept",
      "internals",
      "diagram",
      "lab",
      "quiz",
      "challenge",
      "summary"
    ],
    "minimumQuizScore": 70,
    "minimumLabStepsCompleted": 8,
    "unlockNextLesson": "11.10",
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
      "11.10"
    ]
  }
};
