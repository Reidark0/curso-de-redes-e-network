export const lesson1106 = {
  "id": "11.6",
  "moduleId": "m11",
  "order": 6,
  "title": "Métrica, distância administrativa e escolha de caminho",
  "subtitle": "Entenda como roteadores, sistemas operacionais, firewalls e clouds escolhem entre rotas concorrentes, por que uma rota vence outra, como métricas e distância administrativa afetam redundância e como diagnosticar escolhas inesperadas de caminho.",
  "duration": "110-155 min",
  "estimatedStudyTimeMinutes": 155,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 255,
  "tags": [
    "redes",
    "ipv4",
    "roteamento",
    "métrica",
    "distância administrativa",
    "next hop",
    "longest prefix match",
    "rota estática",
    "rota dinâmica",
    "redundância",
    "ospf",
    "bgp",
    "cloud",
    "devsecops",
    "segurança",
    "troubleshooting",
    "packet-tracer",
    "gns3",
    "troubleshooting real",
    "roteamento avançado"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.1",
      "reason": "A aula 11.1 explica por que roteamento existe e como pacotes atravessam redes diferentes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.2",
      "reason": "A aula 11.2 apresenta tabela de rotas e longest prefix match, que vêm antes da análise de métrica e distância administrativa."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.4",
      "reason": "A aula 11.4 explica rotas estáticas e rotas flutuantes, que usam distância administrativa para backup."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m05",
      "reason": "O módulo 5 ensina prefixos e subnetting, fundamentais para comparar rotas sobrepostas."
    }
  ],
  "objectives": [
    "Diferenciar longest prefix match, distância administrativa e métrica.",
    "Explicar a ordem prática de escolha de rotas quando existem caminhos concorrentes.",
    "Entender por que uma rota conectada, estática, OSPF, EIGRP, RIP ou BGP pode vencer outra, dependendo da plataforma.",
    "Compreender rotas de backup, rotas flutuantes e múltiplos caminhos de custo igual.",
    "Relacionar escolha de caminho com troubleshooting, segurança, cloud, VPN, SD-WAN e DevSecOps.",
    "Diagnosticar casos de caminho inesperado, assimetria, bypass de firewall e rota legada."
  ],
  "learningOutcomes": [
    "Dada uma tabela de rotas com prefixos diferentes, o aluno identifica a rota vencedora por longest prefix match.",
    "Dadas duas rotas para o mesmo prefixo vindas de fontes diferentes, o aluno explica a influência da distância administrativa.",
    "Dadas duas rotas do mesmo protocolo para o mesmo prefixo, o aluno usa a métrica para escolher o caminho preferido.",
    "Dado um cenário de backup, o aluno propõe uma rota flutuante com distância administrativa maior que a rota principal.",
    "Dado um incidente de caminho inesperado, o aluno coleta evidências com route print, ip route, show ip route, traceroute e logs."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Em um desenho de rede real, normalmente existe mais de um caminho possível. Um escritório pode sair pela Internet principal ou por um link 4G de backup. Um datacenter pode alcançar uma rede por MPLS ou por VPN. Uma VPC pode ter rota para um firewall central, para um NAT Gateway ou para um peering. Quando há várias rotas, a pergunta crítica deixa de ser apenas \"existe rota?\" e passa a ser: <strong>qual rota vence?</strong></p><p>Essa pergunta aparece em troubleshooting, segurança e disponibilidade. Uma rota aparentemente pequena pode desviar tráfego de inspeção, uma rota de backup pode nunca entrar, uma rota dinâmica pode perder para uma estática esquecida, e uma rota mais específica pode vencer uma rota default mesmo quando isso não era esperado.</p><div class=\"callout callout--problem\"><strong>Ideia central:</strong> a escolha de caminho geralmente segue uma sequência: primeiro o prefixo mais específico, depois a preferência da fonte da rota, depois a métrica interna daquele protocolo ou mecanismo.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>Nas primeiras redes IP, muitos caminhos eram definidos manualmente. Rotas estáticas eram suficientes para ambientes pequenos, mas se tornaram difíceis de manter quando redes cresceram, links falharam e novos sites passaram a ser conectados.</p><p>Protocolos de roteamento dinâmico surgiram para automatizar descoberta de caminhos. RIP usava contagem de saltos, OSPF introduziu custo baseado em topologia de estado de enlace, EIGRP combinou métricas, e BGP passou a tratar política de roteamento entre sistemas autônomos. Cada mecanismo trouxe sua própria forma de medir preferência.</p><p>Com o tempo, os equipamentos precisaram comparar rotas vindas de origens diferentes: conectadas, estáticas, OSPF, BGP, rotas aprendidas por VPN, SD-WAN e cloud route tables. Daí vem a necessidade de regras de desempate: prefixo, distância administrativa, métrica e políticas.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>Imagine que um roteador conhece três rotas para alcançar o destino 10.20.30.55: uma rota default 0.0.0.0/0 para a Internet, uma rota 10.20.0.0/16 para a VPN e uma rota 10.20.30.0/24 para um firewall interno. Qual delas deve ser usada?</p><p>Se a rede escolhesse aleatoriamente, o tráfego seria imprevisível. Se escolhesse sempre a rota aprendida primeiro, mudanças de boot causariam caos. Se escolhesse sempre o menor número de saltos, poderia ignorar política de segurança. O roteamento precisa de critérios determinísticos.</p><div class=\"callout callout--warning\"><strong>Erro comum:</strong> acreditar que métrica sempre é o primeiro critério. Na prática, a rota mais específica costuma vencer antes. Métrica só costuma ser comparada entre rotas equivalentes do mesmo tipo ou protocolo.</div></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><table class=\"data-table\"><thead><tr><th>Etapa</th><th>Critério principal</th><th>Exemplo</th><th>Limitação</th></tr></thead><tbody><tr><td>Rotas manuais simples</td><td>Administrador define o caminho</td><td>ip route 10.0.0.0/8 next-hop</td><td>Não escala bem e depende de documentação perfeita</td></tr><tr><td>Rotas estáticas com backup</td><td>Distância administrativa alterada</td><td>Rota flutuante</td><td>Falha lógica pode não derrubar a interface</td></tr><tr><td>Protocolos dinâmicos internos</td><td>Métrica do protocolo</td><td>OSPF cost</td><td>Exige desenho e convergência</td></tr><tr><td>Roteamento entre domínios</td><td>Política e atributos</td><td>BGP</td><td>Mais complexo e sensível a erro</td></tr><tr><td>Cloud e SD-WAN</td><td>Route tables, prioridades e políticas</td><td>NAT, firewall, VPN, peering</td><td>Abstrações diferentes por provedor</td></tr></tbody></table></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p>A escolha de caminho é o processo pelo qual um dispositivo decide qual rota instalar ou usar para encaminhar um pacote. Em termos didáticos, pense em três perguntas.</p><ol class=\"flow-list\"><li><strong>Qual rota combina melhor com o destino?</strong> Essa é a regra do longest prefix match.</li><li><strong>Se existem rotas para o mesmo prefixo vindas de origens diferentes, qual fonte é mais confiável?</strong> Essa é a distância administrativa, ou conceito equivalente.</li><li><strong>Se existem rotas equivalentes pelo mesmo protocolo, qual caminho é mais barato?</strong> Essa é a métrica.</li></ol><div class=\"definition-box\"><strong>Definição prática:</strong> prefixo escolhe a rota mais específica; distância administrativa escolhe a origem mais preferida; métrica escolhe o melhor caminho dentro da mesma origem/protocolo.</div></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><p>O fluxo interno de decisão pode ser resumido assim:</p><ol class=\"flow-list\"><li>O pacote chega com um endereço IPv4 de destino.</li><li>O dispositivo consulta a tabela de encaminhamento ou tabela de rotas.</li><li>Ele encontra todas as rotas cujo prefixo contém o destino.</li><li>Escolhe a rota com prefixo mais longo, por exemplo /24 vence /16, que vence /8, que vence /0.</li><li>Se houver rotas candidatas para o mesmo prefixo vindas de fontes diferentes, escolhe a de menor distância administrativa ou prioridade equivalente.</li><li>Se houver múltiplas rotas do mesmo protocolo para o mesmo prefixo, compara métricas.</li><li>Se houver empate real, pode instalar ECMP, balanceamento por fluxo ou múltiplos next hops, dependendo da plataforma.</li><li>Depois de escolher, encaminha para o next hop ou interface de saída.</li></ol><p>Essa ordem explica por que uma rota específica incorreta pode causar problema enorme mesmo que a rota default esteja perfeita.</p></section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>Em arquitetura corporativa, a escolha de caminho aparece em várias camadas.</p><table class=\"comparison-table\"><thead><tr><th>Local</th><th>Como escolhe caminho</th><th>Risco comum</th><th>Evidência</th></tr></thead><tbody><tr><td>Host Windows/Linux</td><td>Prefixo, métrica da interface e rota default</td><td>VPN adiciona rota mais específica e desvia tráfego</td><td>route print, ip route</td></tr><tr><td>Roteador Cisco</td><td>Prefixo, distância administrativa e métrica</td><td>Rota estática antiga vence rota dinâmica</td><td>show ip route</td></tr><tr><td>Firewall</td><td>RIB/FIB, política, zonas e NAT</td><td>Rota assimétrica quebra sessão stateful</td><td>logs de sessão e tabela de rotas</td></tr><tr><td>Cloud</td><td>Route table, especificidade, propagação e prioridade do provedor</td><td>Subnet sai direto para Internet em vez de firewall</td><td>effective routes, flow logs</td></tr><tr><td>SD-WAN</td><td>Política, SLA, métrica dinâmica e aplicação</td><td>Caminho muda conforme jitter/perda</td><td>telemetria e eventos de path</td></tr></tbody></table></section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Imagine um serviço de entregas. Para enviar uma encomenda, primeiro ele procura a regra de endereço mais detalhada. Uma regra para \"Rua A, número 120\" é mais útil que uma regra para \"Bairro Centro\". Isso é o longest prefix match.</p><p>Se houver duas empresas autorizadas a entregar no mesmo endereço, a empresa pode ter uma lista de confiança: frota própria vence terceirizada, terceirizada premium vence comum. Isso lembra distância administrativa.</p><p>Se houver duas rotas da mesma empresa para o mesmo endereço, ela escolhe a mais barata, rápida ou confiável. Isso lembra métrica. A limitação da analogia é que redes precisam ser determinísticas e podem ter política técnica muito mais rígida que uma entrega humana.</p></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2><p>Um notebook tem estas rotas:</p><table class=\"data-table\"><thead><tr><th>Destino</th><th>Gateway</th><th>Interface</th></tr></thead><tbody><tr><td>0.0.0.0/0</td><td>192.168.1.1</td><td>Wi-Fi</td></tr><tr><td>10.0.0.0/8</td><td>10.8.0.1</td><td>VPN</td></tr><tr><td>10.20.30.0/24</td><td>10.8.0.5</td><td>VPN</td></tr></tbody></table><p>Para acessar 10.20.30.55, a rota /24 vence. Para acessar 10.99.1.10, a rota /8 vence. Para acessar 8.8.8.8, a rota default vence. O critério inicial não é \"qual gateway parece melhor\", mas qual prefixo mais específico contém o destino.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Uma empresa tem matriz e filial conectadas por MPLS e VPN IPsec. A rota principal para 172.20.40.0/24 vem pelo MPLS. A rota de backup, estática flutuante, usa a VPN com distância administrativa maior. Enquanto o MPLS está ativo, ele vence. Se o caminho principal falha de forma detectável, a rota de backup entra.</p><p>O problema aparece quando a falha não derruba a interface, mas há perda no caminho. A rota principal continua instalada, o backup nunca entra e a aplicação fica indisponível. Por isso, em redes reais, rotas flutuantes podem exigir IP SLA, tracking, BFD, monitoramento ou protocolo dinâmico.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em uma VPC/VNet, uma subnet pode ter rota default para um NAT Gateway, rotas específicas para um peering, rotas propagadas por VPN e rotas para um firewall central. Uma rota 10.50.0.0/16 para VPN pode conviver com uma rota 10.50.20.0/24 para um appliance de segurança. O /24 vence para aquele bloco específico.</p><p>O impacto financeiro também importa. Um caminho por firewall gerenciado, NAT Gateway, peering ou appliance pode ter custos diferentes de processamento e tráfego. Uma rota errada pode tanto quebrar segurança quanto aumentar custo de transferência.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Em IaC, rotas são código. Um pull request pode adicionar uma rota mais específica que desvia tráfego de um firewall central. Um runner self-hosted pode ter rota de VPN que muda o caminho até repositórios internos. Um cluster Kubernetes pode ter rotas de pods, services, nodes e egress gateways competindo com rotas da VPC.</p><p>Por isso pipelines maduros validam route tables, impedem 0.0.0.0/0 indevido, detectam CIDRs sobrepostos e exigem revisão de segurança quando rotas apontam para Internet Gateway, NAT, VPN, peering ou firewall.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>Segurança depende de caminho previsível. Se o tráfego deveria passar por firewall, IDS ou proxy, uma rota mais específica pode criar bypass. Se a ida passa por um firewall stateful e a volta passa por outro caminho, a sessão pode ser descartada. Se uma rota default aponta para Internet sem inspeção, há risco de exfiltração.</p><table class=\"risk-table\"><thead><tr><th>Risco</th><th>Causa comum</th><th>Mitigação</th></tr></thead><tbody><tr><td>Bypass de inspeção</td><td>Rota específica apontando fora do firewall</td><td>Governança, revisão de rotas e flow logs</td></tr><tr><td>Assimetria</td><td>Ida e volta por caminhos diferentes</td><td>Desenho de retorno, NAT consistente e monitoramento</td></tr><tr><td>Exfiltração</td><td>Default route ampla para saída externa</td><td>Egress control, proxy, firewall e alertas</td></tr><tr><td>Indisponibilidade</td><td>Rota de backup não entra</td><td>Tracking, BFD, protocolo dinâmico ou teste periódico</td></tr></tbody></table></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2><svg class=\"lesson-svg\" viewBox=\"0 0 960 540\" role=\"img\" aria-labelledby=\"m11l06-title m11l06-desc\"><title id=\"m11l06-title\">Escolha de caminho por prefixo, distância administrativa e métrica</title><desc id=\"m11l06-desc\">Diagrama mostra um roteador comparando rotas concorrentes por especificidade, origem e custo.</desc><defs><marker id=\"m11l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs><rect x=\"35\" y=\"42\" width=\"890\" height=\"456\" rx=\"18\" class=\"svg-zone\"></rect><rect x=\"70\" y=\"215\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\"></rect><text x=\"145\" y=\"248\" text-anchor=\"middle\" class=\"svg-label\">Origem</text><text x=\"145\" y=\"273\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.1.1.50</text><rect x=\"365\" y=\"195\" width=\"190\" height=\"120\" rx=\"16\" class=\"svg-node svg-node--router\"></rect><text x=\"460\" y=\"232\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text><text x=\"460\" y=\"258\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela de rotas</text><text x=\"460\" y=\"283\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">prefixo → AD → métrica</text><rect x=\"710\" y=\"78\" width=\"160\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--firewall\"></rect><text x=\"790\" y=\"110\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text><text x=\"790\" y=\"132\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.20.30.0/24</text><rect x=\"710\" y=\"235\" width=\"160\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect><text x=\"790\" y=\"267\" text-anchor=\"middle\" class=\"svg-label\">VPN</text><text x=\"790\" y=\"289\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.20.0.0/16</text><rect x=\"710\" y=\"390\" width=\"160\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--server\"></rect><text x=\"790\" y=\"422\" text-anchor=\"middle\" class=\"svg-label\">Default</text><text x=\"790\" y=\"444\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">0.0.0.0/0</text><line x1=\"220\" y1=\"255\" x2=\"365\" y2=\"255\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l06-arrow)\"></line><line x1=\"555\" y1=\"230\" x2=\"710\" y2=\"113\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l06-arrow)\"></line><line x1=\"555\" y1=\"255\" x2=\"710\" y2=\"270\" class=\"svg-flow\" marker-end=\"url(#m11l06-arrow)\"></line><line x1=\"555\" y1=\"282\" x2=\"710\" y2=\"425\" class=\"svg-flow\" marker-end=\"url(#m11l06-arrow)\"></line><rect x=\"260\" y=\"58\" width=\"420\" height=\"48\" rx=\"14\" class=\"svg-badge\"></rect><text x=\"470\" y=\"88\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Destino 10.20.30.55: /24 vence /16 e /0</text><text x=\"620\" y=\"152\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mais específico</text><text x=\"626\" y=\"258\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">menos específico</text><text x=\"626\" y=\"382\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">último recurso</text></svg></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>O laboratório reforça a decisão real da tabela de rotas: primeiro prefixo mais específico, depois preferência da origem da rota, depois métrica dentro do protocolo. O aluno deve prever o caminho, provar na tabela e explicar surpresas.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios focam em identificar a rota vencedora, justificar desempates e reconhecer quando métrica não é o critério inicial.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>Você receberá uma rede com matriz, VPN, firewall e rota default. Sua missão será explicar por que determinado tráfego está desviando do caminho esperado e propor correção segura.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra como comparar prefixos, origem da rota, distância administrativa, métrica e evidências de traceroute para fechar diagnóstico sem chute.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>A escolha de caminho não é mágica. Primeiro o dispositivo encontra a rota mais específica para o destino. Quando há rotas equivalentes para o mesmo prefixo, ele usa preferência da origem, como distância administrativa. Quando ainda há concorrência dentro do mesmo protocolo, usa métrica.</p><p>Esse conhecimento é essencial para disponibilidade, segurança, cloud e troubleshooting. Muitos incidentes não são falta de rota; são escolha errada de caminho, rota mais específica indevida, backup que não entra, assimetria ou bypass de inspeção.</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, você estudará <strong>OSPF introdutório</strong>, entendendo como um protocolo dinâmico interno descobre topologia, calcula custo e converge após mudanças.</p></section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula explica como dispositivos escolhem entre rotas concorrentes, preparando o aluno para OSPF, BGP, troubleshooting avançado, SD-WAN, VPN e route tables em cloud.",
    "previousConcepts": [
      "gateway padrão",
      "tabela de rotas",
      "longest prefix match",
      "rota default",
      "rota estática",
      "rota flutuante",
      "subnetting"
    ],
    "nextConcepts": [
      "OSPF",
      "BGP",
      "ECMP",
      "convergência",
      "rota dinâmica",
      "policy based routing",
      "troubleshooting avançado de caminho"
    ]
  },
  "protocolFields": [
    {
      "name": "Prefixo",
      "description": "Bloco de destino da rota, como 10.20.30.0/24 ou 0.0.0.0/0."
    },
    {
      "name": "Prefix length",
      "description": "Quantidade de bits de rede. Quanto maior, mais específica é a rota."
    },
    {
      "name": "Next hop",
      "description": "Próximo dispositivo para onde o pacote deve ser encaminhado."
    },
    {
      "name": "Interface de saída",
      "description": "Interface pela qual o tráfego deixará o dispositivo."
    },
    {
      "name": "Distância administrativa",
      "description": "Preferência atribuída à origem da rota em diversas plataformas, especialmente em roteadores Cisco."
    },
    {
      "name": "Métrica",
      "description": "Custo interno usado por um protocolo ou sistema para escolher entre caminhos equivalentes."
    },
    {
      "name": "Origem da rota",
      "description": "Indica se a rota é conectada, estática, OSPF, BGP, RIP, propagada por VPN, cloud ou outro mecanismo."
    },
    {
      "name": "ECMP",
      "description": "Uso de múltiplos caminhos de custo igual quando a plataforma suporta balanceamento."
    }
  ],
  "packetFlow": [
    "Dispositivo recebe pacote IPv4 com destino definido.",
    "Consulta a tabela de rotas ou FIB.",
    "Filtra rotas que contêm o endereço de destino.",
    "Seleciona a rota com maior prefix length.",
    "Se houver empate de prefixo, compara preferência da origem da rota, como distância administrativa.",
    "Se a origem/protocolo também for equivalente, compara métrica.",
    "Se ainda houver empate e a plataforma permitir, instala múltiplos next hops por ECMP.",
    "Encaminha o pacote para o next hop ou interface de saída escolhida.",
    "Logs, flow records e traceroute podem confirmar o caminho realmente usado."
  ],
  "deepDive": {
    "title": "A ordem mental correta: especificidade, origem e custo",
    "content": "Uma forma segura de raciocinar é separar três camadas. A primeira é a especificidade: uma rota /24 vence uma /16 para endereços dentro daquele /24. A segunda é a origem: para o mesmo prefixo, uma rota conectada normalmente vence uma estática, e uma estática pode vencer OSPF, dependendo da plataforma e configuração. A terceira é o custo: dentro do mesmo protocolo, a métrica decide o melhor caminho. Confundir essas camadas leva a diagnósticos errados, especialmente em ambientes com VPN, cloud, firewall e roteamento dinâmico."
  },
  "commonMistakes": [
    "Comparar métrica antes de verificar prefixo mais específico.",
    "Esquecer que uma rota /32 pode desviar apenas um host específico.",
    "Manter rota estática antiga que vence rota dinâmica esperada.",
    "Criar rota flutuante com distância administrativa menor que a rota principal.",
    "Achar que traceroute sempre mostra exatamente o caminho da aplicação.",
    "Ignorar rota de retorno e diagnosticar apenas a ida.",
    "Não revisar effective routes em cloud antes de culpar firewall ou DNS.",
    "Permitir que IaC crie rotas mais específicas sem revisão de segurança."
  ],
  "troubleshooting": {
    "symptoms": [
      "Tráfego passa por link errado.",
      "Rota de backup não assume após falha.",
      "Traceroute mostra caminho diferente do desenho.",
      "Aplicação falha apenas quando VPN está conectada.",
      "Firewall não registra tráfego que deveria passar por ele.",
      "Cloud mostra rota efetiva diferente da route table esperada.",
      "Ping funciona por um caminho, mas TCP falha por outro."
    ],
    "checks": [
      "Identificar o destino exato e listar todas as rotas que combinam com ele.",
      "Comparar prefix length antes de olhar métrica.",
      "Verificar origem da rota e distância administrativa/prioridade.",
      "Comparar métricas somente entre rotas equivalentes.",
      "Validar rota de retorno no destino e no caminho inverso.",
      "Executar traceroute/mtr e comparar com logs de firewall/flow logs.",
      "Em cloud, verificar rotas efetivas, propagadas e associadas à subnet correta.",
      "Checar mudanças recentes em VPN, SD-WAN, IaC ou roteamento dinâmico."
    ],
    "tools": [
      "route print",
      "Get-NetRoute",
      "Get-NetIPConfiguration",
      "tracert",
      "Test-NetConnection",
      "ip route",
      "ip route get",
      "tracepath",
      "traceroute",
      "mtr",
      "ss",
      "show ip route",
      "show ip cef",
      "show running-config | include ip route",
      "show interfaces",
      "show ip protocols",
      "show logging",
      "cloud effective routes",
      "flow logs",
      "SIEM"
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && nslookup exemplo.local",
        "purpose": "Coletar configuração local, rotas e resolução DNS.",
        "expectedObservation": "IP, gateway, DNS e rotas coerentes com o cenário.",
        "interpretation": "Falhas nessa etapa indicam problemas de base antes da aplicação."
      }
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Criar rotas estáticas sem documentação.",
      "Deixar rotas temporárias permanentes.",
      "Adicionar 0.0.0.0/0 para resolver rapidamente um problema de conectividade.",
      "Permitir que qualquer pipeline altere route tables críticas sem revisão.",
      "Ignorar assimetria em firewalls stateful.",
      "Não monitorar mudanças de rota em VPN ou BGP."
    ],
    "vulnerabilities": [
      {
        "name": "bypass de firewall",
        "description": "Risco relacionado à aula 11.6 — Métrica, distância administrativa e escolha de caminho.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "governança de rotas"
      },
      {
        "name": "exfiltração por saída não inspecionada",
        "description": "Risco relacionado à aula 11.6 — Métrica, distância administrativa e escolha de caminho.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "controle de mudança"
      },
      {
        "name": "route leak interno",
        "description": "Risco relacionado à aula 11.6 — Métrica, distância administrativa e escolha de caminho.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IaC com validação"
      },
      {
        "name": "sequestro de caminho por rota específica",
        "description": "Risco relacionado à aula 11.6 — Métrica, distância administrativa e escolha de caminho.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "policy as code"
      },
      {
        "name": "caminho assimétrico quebrando inspeção",
        "description": "Risco relacionado à aula 11.6 — Métrica, distância administrativa e escolha de caminho.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "alertas de route table"
      },
      {
        "name": "failover inoperante",
        "description": "Risco relacionado à aula 11.6 — Métrica, distância administrativa e escolha de caminho.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "flow logs"
      },
      {
        "name": "sobreposição de CIDR",
        "description": "Risco relacionado à aula 11.6 — Métrica, distância administrativa e escolha de caminho.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "BFD ou tracking"
      }
    ],
    "mitigations": [
      "governança de rotas",
      "controle de mudança",
      "IaC com validação",
      "policy as code",
      "alertas de route table",
      "flow logs",
      "BFD ou tracking",
      "revisão de prefixos específicos",
      "segmentação e egress filtering"
    ],
    "goodPractices": [
      "Documentar rotas críticas com dono, justificativa, origem e data de revisão.",
      "Revisar rotas mais específicas que desviam tráfego de firewalls centrais.",
      "Validar caminho de ida e volta para fluxos sensíveis.",
      "Usar mudança controlada e revisão por pares para route tables e rotas estáticas.",
      "Monitorar alterações de rotas e anúncios dinâmicos.",
      "Usar flow logs para confirmar se o caminho real bate com a arquitetura.",
      "Aplicar policy as code para impedir rotas amplas sem aprovação.",
      "Testar cenários de failover periodicamente."
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
      "governança de rotas",
      "controle de mudança",
      "IaC com validação",
      "policy as code",
      "alertas de route table",
      "flow logs",
      "BFD ou tracking",
      "revisão de prefixos específicos",
      "segmentação e egress filtering"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "labType": "gns3",
    "title": "GNS3/Packet Tracer: por que uma rota vence outra — prefixo, AD, métrica e ECMP",
    "objective": "Diagnosticar a escolha de caminho comparando longest prefix match, distância administrativa, métrica, rota estática, OSPF e default route.",
    "scenario": "Uma rede possui dois caminhos para o mesmo destino: uma rota estática, uma rota OSPF e uma rota default. O aluno deve prever qual rota será usada, provar na tabela, criar uma rota mais específica e observar como a decisão muda.",
    "topology": "R1 com LAN 10.10.10.0/24; R2 caminho principal; R3 caminho alternativo; rede destino 10.50.50.0/24; rota default para Internet simulada.",
    "architecture": "A decisão de encaminhamento ocorre em camadas: primeiro prefixo mais específico; depois preferência da fonte da rota, como distância administrativa; depois métrica dentro do protocolo; por fim, empate pode gerar ECMP quando a plataforma permite.",
    "prerequisites": [
      "Concluir aulas 11.1–11.5.",
      "Entender rota estática, rota default e noção introdutória de OSPF."
    ],
    "tools": [
      "GNS3 ou Packet Tracer",
      "Cisco IOS",
      "Opcional: Linux com ip route para comparação"
    ],
    "estimatedTimeMinutes": 100,
    "cost": "zero em Packet Tracer; local em GNS3",
    "safetyNotes": [
      "Use laboratório isolado.",
      "Não altere métricas ou AD em produção sem entender impacto de convergência e retorno."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Montar três caminhos lógicos",
        "instruction": "Crie R1 ligado a R2 e R3, ambos com acesso ao destino 10.50.50.0/24.",
        "command": "Topologia: R1-R2-DST e R1-R3-DST",
        "expectedOutput": "R1 possui dois next hops possíveis.",
        "explanation": "Sem múltiplos caminhos, não há decisão comparativa para observar."
      },
      {
        "number": 2,
        "title": "Configurar rota default",
        "instruction": "Em R1, configure uma rota default para R2.",
        "command": "ip route 0.0.0.0 0.0.0.0 172.16.12.2",
        "expectedOutput": "show ip route mostra S* 0.0.0.0/0.",
        "explanation": "A default serve como último recurso, mas perde para rotas específicas."
      },
      {
        "number": 3,
        "title": "Configurar rota estática específica",
        "instruction": "Adicione rota para 10.50.50.0/24 via R3.",
        "command": "ip route 10.50.50.0 255.255.255.0 172.16.13.2",
        "expectedOutput": "Rota /24 vence a default /0.",
        "explanation": "Longest prefix match vem antes de distância administrativa."
      },
      {
        "number": 4,
        "title": "Validar decisão por destino exato",
        "instruction": "Consulte a rota para um IP específico do destino.",
        "command": "show ip route 10.50.50.10",
        "expectedOutput": "R1 escolhe a rota /24 via R3.",
        "explanation": "Diagnóstico profissional pergunta: qual rota será usada para este IP específico?"
      },
      {
        "number": 5,
        "title": "Adicionar OSPF para o mesmo prefixo",
        "instruction": "Configure OSPF anunciando 10.50.50.0/24 pelo caminho R2.",
        "command": "router ospf 1\n network 172.16.12.0 0.0.0.3 area 0\n network 10.50.50.0 0.0.0.255 area 0",
        "expectedOutput": "A rota OSPF pode ser aprendida, mas rota estática ainda vence por AD menor se o mesmo prefixo.",
        "explanation": "Quando prefixo é igual, fonte da rota/AD decide entre estática e OSPF."
      },
      {
        "number": 6,
        "title": "Criar rota estática flutuante",
        "instruction": "Ajuste a rota estática para AD maior e observe OSPF vencer.",
        "command": "no ip route 10.50.50.0 255.255.255.0 172.16.13.2\nip route 10.50.50.0 255.255.255.0 172.16.13.2 200",
        "expectedOutput": "Rota OSPF passa a vencer enquanto estiver disponível.",
        "explanation": "AD maior transforma a rota estática em backup."
      },
      {
        "number": 7,
        "title": "Criar rota mais específica",
        "instruction": "Adicione uma rota /32 ou /28 para um host/subconjunto do destino via caminho alternativo.",
        "command": "ip route 10.50.50.10 255.255.255.255 172.16.13.2",
        "expectedOutput": "Para 10.50.50.10, a rota /32 vence mesmo que OSPF tenha AD menor para o /24.",
        "explanation": "Prefixo mais específico vence antes de AD. Esse ponto explica muitas surpresas de produção."
      },
      {
        "number": 8,
        "title": "Simular métrica OSPF",
        "instruction": "Altere custo de interface em dois caminhos OSPF equivalentes.",
        "command": "interface g0/1\n ip ospf cost 100\nshow ip route ospf",
        "expectedOutput": "O caminho com menor custo OSPF é escolhido dentro do protocolo.",
        "explanation": "Métrica compara caminhos da mesma origem/protocolo, não substitui longest prefix match."
      },
      {
        "number": 9,
        "title": "Observar ECMP quando houver empate",
        "instruction": "Configure custos iguais entre dois caminhos OSPF e veja se a plataforma instala múltiplos next hops.",
        "command": "show ip route 10.50.50.0",
        "expectedOutput": "Dependendo da plataforma, aparecem dois next hops para o mesmo prefixo.",
        "explanation": "ECMP não é a mesma coisa que rota flutuante: ambos os caminhos podem ser usados."
      },
      {
        "number": 10,
        "title": "Criar tabela de decisão",
        "instruction": "Monte uma tabela com destino, prefixo vencedor, AD, métrica e next hop.",
        "command": "Destino | rota candidata | prefixo | AD | métrica | next hop | vencedor",
        "expectedOutput": "Tabela explica cada decisão de encaminhamento.",
        "explanation": "A habilidade principal é prever a decisão antes de culpar firewall ou aplicação."
      }
    ],
    "expectedResult": "O aluno deve demonstrar que longest prefix match vem antes de distância administrativa, que AD decide entre fontes para o mesmo prefixo, que métrica decide dentro do mesmo protocolo e que ECMP/rota flutuante são conceitos diferentes.",
    "validation": [
      {
        "check": "Default route existe",
        "command": "show ip route 0.0.0.0",
        "expected": "S* 0.0.0.0/0 via next hop definido.",
        "ifFails": "Corrigir rota default."
      },
      {
        "check": "Rota específica vence default",
        "command": "show ip route 10.50.50.10",
        "expected": "Rota /24 ou mais específica, não a default.",
        "ifFails": "Verificar prefixo, máscara e next hop."
      },
      {
        "check": "AD decide com mesmo prefixo",
        "command": "show ip route 10.50.50.0",
        "expected": "Fonte com AD menor vence quando prefixo é igual.",
        "ifFails": "Verificar se ambas as rotas existem como candidatas."
      },
      {
        "check": "Rota /32 vence para host específico",
        "command": "show ip route 10.50.50.10",
        "expected": "Rota host /32 escolhida.",
        "ifFails": "Corrigir máscara /32 e destino."
      },
      {
        "check": "Métrica OSPF influencia caminho OSPF",
        "command": "show ip ospf interface; show ip route ospf",
        "expected": "Caminho OSPF muda conforme custo.",
        "ifFails": "Verificar OSPF neighbor, área e custo de interface."
      },
      {
        "check": "ECMP identificado corretamente",
        "command": "show ip route prefixo",
        "expected": "Múltiplos next hops apenas se houver empate válido.",
        "ifFails": "Não confundir com failover; revisar métricas."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Tráfego sai por caminho inesperado",
        "probableCause": "Rota mais específica esquecida.",
        "howToConfirm": "show ip route destino-exato.",
        "fix": "Remover ou corrigir rota específica indevida."
      },
      {
        "symptom": "OSPF não vence rota estática",
        "probableCause": "AD da estática menor para o mesmo prefixo.",
        "howToConfirm": "show ip route e show running-config | include ip route.",
        "fix": "Remover estática ou torná-la flutuante."
      },
      {
        "symptom": "Default route usada indevidamente",
        "probableCause": "Rota específica ausente.",
        "howToConfirm": "show ip route prefixo e traceroute.",
        "fix": "Adicionar rota específica ou corrigir anúncio dinâmico."
      },
      {
        "symptom": "Dois caminhos aparecem na tabela",
        "probableCause": "ECMP por métricas iguais.",
        "howToConfirm": "show ip route prefixo.",
        "fix": "Ajustar custo/métrica se política exigir caminho único."
      },
      {
        "symptom": "Mudança de métrica não altera caminho",
        "probableCause": "Outra rota com prefixo mais específico ou fonte preferida está vencendo.",
        "howToConfirm": "Comparar prefixos e AD antes de métrica.",
        "fix": "Corrigir a camada de decisão adequada."
      },
      {
        "symptom": "Rota flutuante nunca entra",
        "probableCause": "Rota principal ainda instalada ou tracking ausente para falha lógica.",
        "howToConfirm": "show ip route e simulação de falha física/lógica.",
        "fix": "Usar tracking/IP SLA em cenário que exige detectar destino remoto."
      }
    ],
    "improvements": [
      "Adicionar IP SLA tracking para falha lógica.",
      "Comparar Cisco IOS com Linux ip route metric.",
      "Adicionar cenário cloud com route table mais específica para firewall appliance.",
      "Criar simulado com 10 tabelas de rotas e perguntas de caminho vencedor."
    ],
    "evidenceToCollect": [
      "show ip route destino-exato antes/depois de cada mudança.",
      "show ip protocols.",
      "show ip ospf interface.",
      "Traceroute por caminho escolhido.",
      "Tabela de decisão preenchida."
    ],
    "questions": [
      "Por que uma rota /32 pode vencer uma rota OSPF para /24?",
      "Quando a distância administrativa é considerada?",
      "Qual a diferença entre métrica e AD?",
      "ECMP é backup ou uso simultâneo?",
      "Como uma rota mais específica pode virar risco de segurança?"
    ],
    "challenge": "Receba uma tabela com default, estática /24, OSPF /24 e estática /32. Determine o caminho para cinco IPs e justifique cada decisão.",
    "solution": "A solução aplica primeiro longest prefix match para cada destino. Só quando duas rotas têm o mesmo prefixo compara AD. Métrica só é usada dentro da mesma fonte/protocolo. Se houver empate de custo e a plataforma permitir, múltiplos next hops podem ser instalados como ECMP.",
    "id": "lab-11.6"
  },
  "mentorQuestions": [
    "Antes de olhar métrica, qual é o prefixo mais específico que contém o destino?",
    "Se duas rotas têm o mesmo prefixo, elas vieram da mesma fonte ou de fontes diferentes?",
    "O caminho de volta segue o mesmo ponto de inspeção ou existe risco de assimetria?"
  ],
  "quiz": [
    {
      "question": "Qual regra geralmente vem antes da métrica na escolha de rota?",
      "options": [
        "Gateway com menor IP",
        "Longest prefix match",
        "Nome da interface",
        "Quantidade de VLANs"
      ],
      "answer": "Longest prefix match",
      "explanation": "A rota mais específica para o destino normalmente vence antes da comparação de métrica."
    },
    {
      "question": "Uma rota 10.10.20.0/24 e uma rota 10.10.0.0/16 alcançam 10.10.20.50. Qual vence?",
      "options": [
        "/16",
        "/24",
        "0.0.0.0/0",
        "A de maior gateway"
      ],
      "answer": "/24",
      "explanation": "/24 é mais específica que /16 para o destino 10.10.20.50."
    },
    {
      "question": "Distância administrativa ajuda a comparar principalmente o quê?",
      "options": [
        "Tamanho do cabo",
        "Origem ou fonte da rota",
        "Velocidade da placa de rede",
        "Porta TCP"
      ],
      "answer": "Origem ou fonte da rota",
      "explanation": "Ela expressa preferência entre rotas vindas de origens diferentes, como conectada, estática ou protocolo dinâmico."
    },
    {
      "question": "Métrica costuma ser comparada quando:",
      "options": [
        "As rotas são para destinos DNS",
        "As rotas são equivalentes dentro do mesmo protocolo ou mecanismo",
        "O pacote é ARP",
        "A VLAN é nativa"
      ],
      "answer": "As rotas são equivalentes dentro do mesmo protocolo ou mecanismo",
      "explanation": "Métrica é custo interno de um protocolo ou sistema, não uma unidade universal entre protocolos diferentes."
    },
    {
      "question": "Qual risco de uma rota mais específica indevida?",
      "options": [
        "Aumentar resolução de tela",
        "Desviar tráfego de um firewall ou inspeção",
        "Apagar MAC address-table",
        "Criar novo endereço IPv6"
      ],
      "answer": "Desviar tráfego de um firewall ou inspeção",
      "explanation": "Rotas específicas podem criar bypass de controles se apontarem para caminho não inspecionado."
    },
    {
      "question": "Uma rota flutuante deve ter distância administrativa em relação à rota principal:",
      "options": [
        "Menor, para sempre vencer",
        "Igual, para duplicar tráfego",
        "Maior, para ficar como backup",
        "Zero, para ficar invisível"
      ],
      "answer": "Maior, para ficar como backup",
      "explanation": "A rota flutuante normalmente tem preferência menor, entrando apenas quando a principal deixa de ser válida."
    },
    {
      "id": "q11.6-p1-1",
      "type": "diagnóstico",
      "q": "Uma rota /32 por um caminho ruim está fazendo apenas um servidor remoto falhar, enquanto outros IPs do mesmo /24 funcionam. Qual conceito explica isso?",
      "opts": [
        "Longest prefix match",
        "DNS round-robin",
        "NAT hairpin",
        "TLS SNI"
      ],
      "a": 0,
      "exp": "A rota /32 é mais específica que o /24 e vence para aquele IP exato.",
      "difficulty": "intermediário",
      "topic": "longest prefix match"
    }
  ],
  "flashcards": [
    {
      "front": "O que é longest prefix match?",
      "back": "Regra que escolhe a rota mais específica cujo prefixo contém o endereço de destino."
    },
    {
      "front": "O que é distância administrativa?",
      "back": "Preferência atribuída à origem da rota, usada para comparar rotas para o mesmo prefixo vindas de fontes diferentes."
    },
    {
      "front": "O que é métrica?",
      "back": "Custo usado por um protocolo ou mecanismo para escolher entre caminhos equivalentes."
    },
    {
      "front": "Por que /24 vence /16 para um host dentro do /24?",
      "back": "Porque /24 é mais específico, tem mais bits de rede e descreve um conjunto menor de destinos."
    },
    {
      "front": "O que é rota flutuante?",
      "back": "Rota de backup configurada com preferência menor, normalmente distância administrativa maior."
    },
    {
      "front": "O que é caminho assimétrico?",
      "back": "Quando o tráfego de ida e o tráfego de volta seguem caminhos diferentes, podendo afetar firewalls stateful e troubleshooting."
    }
  ],
  "exercises": [
    {
      "id": "ex-6.6-1",
      "title": "Escolha por prefixo",
      "prompt": "Para o destino 172.16.8.20, compare as rotas 0.0.0.0/0, 172.16.0.0/16 e 172.16.8.0/24. Qual vence e por quê?",
      "expectedAnswer": "172.16.8.0/24 vence por ser o prefixo mais específico que contém o destino."
    },
    {
      "id": "ex-6.6-2",
      "title": "Rota estática versus dinâmica",
      "prompt": "Duas rotas para 10.1.0.0/16 existem: uma estática e uma OSPF. Em muitos roteadores, qual tende a vencer por padrão e que conceito explica isso?",
      "expectedAnswer": "A estática tende a vencer por distância administrativa menor, dependendo da plataforma e configuração."
    },
    {
      "id": "ex-6.6-3",
      "title": "Rota flutuante",
      "prompt": "Explique por que uma rota de backup deve ter preferência menor que a rota principal.",
      "expectedAnswer": "Para não competir com o caminho principal enquanto ele está saudável; ela deve entrar apenas em falha ou retirada da rota principal."
    },
    {
      "id": "ex-6.6-4",
      "title": "Segurança de caminho",
      "prompt": "Uma rota /32 foi criada apontando um servidor crítico para fora do firewall central. Qual risco isso cria e qual evidência você coletaria?",
      "expectedAnswer": "Pode criar bypass de inspeção; coletaria tabela de rotas, traceroute, logs de firewall/flow logs e histórico de mudança."
    },
    {
      "id": "ex11.6-p1-1",
      "type": "tabela de rotas",
      "prompt": "Para o destino 10.50.50.10, existem rotas 0.0.0.0/0 via A, 10.50.50.0/24 via B e 10.50.50.10/32 via C. Qual vence e por quê?",
      "expectedAnswer": "A rota /32 via C vence por longest prefix match, independentemente de a default ou a /24 terem AD diferente.",
      "explanation": "Prefixo mais específico é avaliado antes de AD."
    },
    {
      "id": "ex11.6-p1-2",
      "type": "comparação",
      "prompt": "Explique diferença entre AD, métrica e ECMP.",
      "expectedAnswer": "AD compara fontes de rota para o mesmo prefixo; métrica compara caminhos dentro do mesmo protocolo; ECMP instala múltiplos next hops quando há empate válido.",
      "explanation": "Misturar esses conceitos gera diagnóstico incorreto."
    }
  ],
  "challenge": {
    "title": "Diagnosticar desvio de caminho em rede híbrida",
    "scenario": "Uma empresa esperava que o tráfego para 10.70.30.40 passasse pelo firewall central. A route table possui 0.0.0.0/0 para NAT, 10.70.0.0/16 para VPN e 10.70.30.40/32 para peering direto. O firewall não registra tráfego para esse servidor.",
    "tasks": [
      "Identificar a rota vencedora.",
      "Explicar por que o firewall não vê o tráfego.",
      "Listar evidências necessárias.",
      "Propor correção segura.",
      "Descrever como evitar recorrência em IaC."
    ],
    "successCriteria": [
      "Usa longest prefix match corretamente.",
      "Reconhece risco de bypass.",
      "Inclui rota de retorno e logs na análise.",
      "Propõe revisão de route table e policy as code.",
      "Não resolve com allowlist ampla ou 0.0.0.0/0."
    ],
    "rubric": [
      {
        "item": "Análise de prefixo",
        "points": 30
      },
      {
        "item": "Impacto de segurança",
        "points": 25
      },
      {
        "item": "Evidências e comandos",
        "points": 20
      },
      {
        "item": "Correção segura",
        "points": 15
      },
      {
        "item": "Prevenção via governança/IaC",
        "points": 10
      }
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
    "title": "Solução comentada do desafio",
    "steps": [
      "O destino 10.70.30.40 combina com as três rotas: /0, /16 e /32.",
      "A rota 10.70.30.40/32 vence por ser a mais específica possível para aquele host.",
      "Se essa rota aponta para peering direto, o tráfego não passa pelo firewall central; por isso não há log no firewall.",
      "As evidências incluem route table/effective routes, traceroute, flow logs, logs do firewall, histórico do pull request e validação da rota de retorno.",
      "A correção pode remover a /32 indevida ou apontá-la para o firewall, dependendo da arquitetura aprovada.",
      "A prevenção exige policy as code para detectar rotas host-specific ou mais específicas que desviem controles centrais."
    ],
    "finalAnswer": "A rota /32 é a causa provável do desvio. O problema não é ausência de firewall, mas escolha de caminho que contorna o firewall. A correção deve restaurar o caminho aprovado e criar controles para impedir rotas específicas sem revisão de segurança."
  },
  "glossary": [
    {
      "term": "Longest prefix match",
      "definition": "Regra de escolha da rota mais específica que contém o destino."
    },
    {
      "term": "Distância administrativa",
      "definition": "Preferência entre origens de rotas, comum em roteadores Cisco e conceitos equivalentes em outras plataformas."
    },
    {
      "term": "Métrica",
      "definition": "Custo usado dentro de um protocolo ou mecanismo para escolher entre caminhos equivalentes."
    },
    {
      "term": "Rota flutuante",
      "definition": "Rota de backup configurada com preferência menor para entrar quando a rota principal falha."
    },
    {
      "term": "ECMP",
      "definition": "Equal-Cost Multi-Path, uso de múltiplos caminhos de mesmo custo."
    },
    {
      "term": "Caminho assimétrico",
      "definition": "Situação em que ida e volta seguem caminhos diferentes."
    }
  ],
  "references": [
    {
      "title": "Curso Redes e Network v2.0 — Módulo 4",
      "description": "Base de IPv4, gateway, rota local e ICMP."
    },
    {
      "title": "Curso Redes e Network v2.0 — Módulo 5",
      "description": "Base de prefixos, CIDR, subnetting e planejamento de endereçamento."
    },
    {
      "title": "Cisco IOS — show ip route e distância administrativa",
      "description": "Referência operacional para interpretação de rotas em roteadores Cisco."
    },
    {
      "title": "Linux iproute2 — ip route",
      "description": "Referência operacional para leitura e teste de rotas em Linux."
    },
    {
      "title": "Documentação de provedores cloud — effective routes/route tables",
      "description": "Conceitos aplicáveis a VPC/VNet e redes híbridas."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e pipelines",
      "reason": "Route tables e políticas de rede devem ser versionadas, revisadas e testadas como código."
    },
    {
      "course": "Identity, Access Management e Segurança de Identidades",
      "module": "Acesso entre serviços",
      "reason": "Rotas determinam alcançabilidade de serviços; IAM determina autorização. Um não substitui o outro."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "viewedAllSections",
      "completedLab",
      "quizScoreAtLeast70",
      "submittedChallenge"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "11.7"
    ],
    "recommendedReview": [
      "6.2",
      "6.3",
      "6.4",
      "5.4"
    ],
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "oneOf": [
          "labMarkedDone",
          "practicalExerciseDone"
        ]
      }
  }
};
