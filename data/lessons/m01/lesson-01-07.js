export const lesson0107 = {
  "id": "1.7",
  "moduleId": "m01",
  "order": 7,
  "title": "Equipamentos de rede: NIC, hub, switch, roteador, AP e firewall",
  "subtitle": "Como entender o papel de cada equipamento antes de configurar, diagnosticar ou proteger uma rede.",
  "duration": "80-115 min",
  "estimatedStudyTimeMinutes": 115,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "fundamentos",
    "NIC",
    "hub",
    "switch",
    "roteador",
    "access point",
    "firewall",
    "camadas",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.2",
      "reason": "É necessário diferenciar dispositivos finais, intermediários e serviços antes de estudar equipamentos específicos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.4",
      "reason": "Topologias físicas e lógicas ajudam a entender onde cada equipamento aparece no desenho da rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.6",
      "reason": "Cabeamento estruturado explica como os equipamentos são interligados fisicamente."
    }
  ],
  "objectives": [
    "Diferenciar NIC, hub, switch, roteador, access point e firewall.",
    "Entender o papel de cada equipamento por camada, tabela interna e decisão de encaminhamento.",
    "Evitar confusões comuns entre conectar, comutar, rotear, distribuir Wi‑Fi e filtrar tráfego.",
    "Relacionar equipamentos físicos com equivalentes virtuais em cloud e DevSecOps.",
    "Diagnosticar problemas iniciais escolhendo o equipamento certo para investigar.",
    "Compreender riscos de segurança criados por equipamentos mal posicionados ou mal configurados."
  ],
  "learningOutcomes": [
    "Dado um diagrama simples, o aluno identifica quais equipamentos estão atuando como finais, intermediários e controles de segurança.",
    "Dado um sintoma de falha, o aluno propõe se deve investigar NIC, cabo, switch, roteador, AP, firewall ou serviço.",
    "Dado um cenário de cloud, o aluno reconhece equivalentes como NIC virtual, route table, security group, NAT gateway, load balancer e firewall gerenciado.",
    "Dado um incidente de segurança, o aluno identifica quais equipamentos podem fornecer evidências úteis."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine que um usuário abre chamado dizendo: “a internet caiu”. Para ele, tudo é uma coisa só. Para quem trabalha com TI e Segurança, essa frase não é diagnóstico. Pode ser a placa de rede do notebook, o cabo, a porta do switch, o access point, o roteador, o firewall, o DNS, o provedor, uma regra de bloqueio, um certificado, uma VPN, uma rota ou o próprio serviço remoto.</p>\n  <p>Antes de estudar protocolos em profundidade, você precisa saber quem participa da rede e qual papel cada equipamento exerce. Um switch não resolve o mesmo problema que um roteador. Um firewall não é apenas um roteador “mais caro”. Um access point não é a internet sem fio. Uma NIC não é só “a entrada do cabo”. Cada elemento toma decisões diferentes, trabalha com informações diferentes e gera evidências diferentes.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> em um incidente, o SOC vê tráfego suspeito saindo de uma máquina. Para investigar, é preciso saber se a evidência relevante está no host, na NIC, no switch, no firewall, no roteador, no AP, no proxy ou nos logs do serviço. Sem entender os papéis dos equipamentos, o diagnóstico vira tentativa e erro.</div>\n</section>\n",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>As primeiras redes locais eram muito mais simples. Computadores precisavam apenas compartilhar recursos dentro de uma sala ou laboratório. Equipamentos como hubs repetiam sinais para várias portas, funcionando como extensões físicas do meio. Com o crescimento do tráfego, isso se tornou insuficiente: todos competiam pelo mesmo domínio de colisão, o desempenho caía e a análise de tráfego era confusa.</p>\n  <p>Os switches surgiram para encaminhar quadros de forma mais inteligente dentro da rede local, aprendendo endereços MAC e reduzindo colisões. Roteadores permitiram interligar redes diferentes usando endereços IP e tabelas de rota. Access points levaram a rede para o rádio, permitindo mobilidade. Firewalls passaram a aplicar políticas de segurança, primeiro com filtros simples e depois com inspeção de estado, aplicação, identidade e contexto.</p>\n  <p>Hoje muitos desses papéis existem tanto em caixas físicas quanto em software: NIC virtual em VM, vSwitch em hypervisor, route table em cloud, security group, firewall gerenciado, load balancer, gateway NAT, ingress controller e service mesh. Mesmo quando a “caixa” desaparece, o papel lógico continua existindo.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema que esses equipamentos resolvem é a especialização. Uma rede precisa conectar dispositivos, repetir sinais, comutar quadros, rotear pacotes, distribuir acesso sem fio, aplicar política, registrar eventos e isolar riscos. Tentar fazer tudo com um único conceito cria confusão.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem NIC:</strong> o dispositivo final não tem interface para participar da rede.</li>\n    <li><strong>Sem switch:</strong> a LAN cabeada não escala bem para muitos dispositivos locais.</li>\n    <li><strong>Sem roteador:</strong> redes diferentes não sabem como alcançar umas às outras.</li>\n    <li><strong>Sem AP:</strong> dispositivos sem fio não entram na rede local de forma controlada.</li>\n    <li><strong>Sem firewall:</strong> conectividade pode existir sem controle suficiente de política, inspeção e registro.</li>\n    <li><strong>Com hub em produção:</strong> o tráfego é repetido sem inteligência, criando limitações de desempenho e privacidade.</li>\n  </ul>\n</section>\n",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução dos equipamentos acompanha a evolução dos problemas. À medida que as redes cresceram, cada equipamento passou a resolver uma dor específica de escala, organização, desempenho ou segurança.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Equipamento</th><th>Problema original</th><th>Como decide</th><th>Limitação</th><th>Evolução moderna</th></tr></thead>\n    <tbody>\n      <tr><td>NIC</td><td>Conectar o host ao meio</td><td>Interface, driver, MAC, link</td><td>Depende de driver, cabo, Wi‑Fi e configuração</td><td>NIC virtual, SR-IOV, offload, eBPF</td></tr>\n      <tr><td>Hub</td><td>Repetir sinal para várias portas</td><td>Não decide; apenas repete</td><td>Colisão, baixa eficiência e pouca privacidade</td><td>Praticamente substituído por switches</td></tr>\n      <tr><td>Switch</td><td>Conectar hosts na LAN com eficiência</td><td>Tabela MAC</td><td>Não separa redes IP por si só</td><td>VLANs, STP, PoE, port security, switches L3</td></tr>\n      <tr><td>Roteador</td><td>Interligar redes diferentes</td><td>Tabela de rotas</td><td>Não é política completa de segurança por padrão</td><td>SD-WAN, cloud route tables, roteamento dinâmico</td></tr>\n      <tr><td>AP</td><td>Dar acesso sem fio à rede</td><td>Associação Wi‑Fi, SSID, rádio e bridge</td><td>Rádio sofre interferência e alcance limitado</td><td>Controladoras, Wi‑Fi 6/7, WPA3, NAC</td></tr>\n      <tr><td>Firewall</td><td>Controlar tráfego entre zonas</td><td>Regras, estado, aplicação e contexto</td><td>Regra ruim cria falsa sensação de segurança</td><td>NGFW, WAF, security groups, ZTNA, cloud firewall</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Equipamentos de rede são componentes físicos ou virtuais que participam da comunicação entre dispositivos. Eles podem atuar como interfaces de acesso, repetidores, comutadores, roteadores, pontes sem fio ou pontos de controle de segurança.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> entender um equipamento de rede significa identificar seu papel, sua camada predominante, sua tabela interna, sua decisão principal, seus pontos de falha, seus logs e seus limites.</div>\n  <p>Essa definição evita decorar nomes. O mais importante não é saber que uma caixa se chama “switch”, mas entender que ela aprende MACs e encaminha quadros dentro de um domínio de camada 2. O mesmo vale para roteador, firewall e AP: cada um precisa ser entendido pelo problema que resolve.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Cada equipamento decide com base em informações diferentes. Essa é a chave para diagnosticar.</p>\n  <ol class=\"flow-list\">\n    <li><strong>NIC:</strong> negocia link, velocidade e duplex; possui endereço MAC; entrega e recebe quadros; depende de driver e configuração do sistema operacional.</li>\n    <li><strong>Hub:</strong> recebe sinal em uma porta e repete para todas as outras. Não aprende MAC, não filtra e não entende destino.</li>\n    <li><strong>Switch:</strong> lê o endereço MAC de origem, aprende em qual porta ele está e usa a tabela MAC para enviar quadros apenas pela porta provável do destino.</li>\n    <li><strong>Roteador:</strong> lê o endereço IP de destino, consulta a tabela de rotas e decide o próximo salto para alcançar outra rede.</li>\n    <li><strong>Access point:</strong> conecta clientes Wi‑Fi à rede cabeada, gerenciando SSID, autenticação Wi‑Fi, canal, potência, associação e roaming.</li>\n    <li><strong>Firewall:</strong> compara tráfego com políticas, estado de conexão, zonas, portas, protocolos, aplicações, usuários e contexto, permitindo, bloqueando ou registrando eventos.</li>\n  </ol>\n  <p>Na prática, equipamentos modernos podem acumular papéis. Um roteador residencial costuma ter switch, AP, NAT, DHCP e firewall básico na mesma caixa. Em empresa, a separação costuma ser mais clara para aumentar controle, escala e visibilidade.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura pequena, o caminho pode parecer simples: notebook → switch → roteador/firewall → internet. Em uma empresa, esse caminho pode envolver NIC, tomada, patch panel, switch de acesso, switch de distribuição, firewall interno, roteador de borda, proxy, VPN, WAF, link MPLS, SD-WAN ou cloud.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Camada de acesso:</strong> onde usuários, impressoras, câmeras, APs e telefones se conectam. Switches de acesso e APs são comuns aqui.</li>\n    <li><strong>Camada de distribuição:</strong> agrega tráfego, aplica algumas políticas e conecta blocos da rede.</li>\n    <li><strong>Borda:</strong> ponto de saída para internet, WAN, parceiros, VPNs ou cloud. Firewalls, roteadores e links ficam aqui.</li>\n    <li><strong>Serviços:</strong> servidores, DNS, DHCP, identidade, aplicações, bancos e observabilidade.</li>\n    <li><strong>Controle de segurança:</strong> firewalls, NAC, IDS/IPS, WAF, proxy, EDR e logs.</li>\n  </ul>\n  <p>A arquitetura correta depende de porte, risco, orçamento, disponibilidade e operação. Uma pequena empresa pode usar um firewall com switch e APs. Um ambiente corporativo maduro separa funções, zonas e responsabilidades.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma empresa física. A NIC é a porta individual de cada pessoa para entrar no prédio. O switch é a recepção interna que sabe em qual sala cada pessoa trabalha. O roteador é o setor de logística que sabe enviar coisas para outros prédios. O access point é uma entrada sem fio para pessoas autorizadas que não estão conectadas por cabo. O firewall é a segurança que verifica regras de entrada e saída entre áreas.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não são prédios. Equipamentos reais trabalham com quadros, pacotes, tabelas, estados, temporizadores e protocolos. A analogia ajuda a lembrar papéis, mas não substitui entender camada 2, camada 3, política e logs.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, seu notebook usa uma NIC Wi‑Fi para se conectar ao roteador residencial. Essa caixa provavelmente combina AP, switch, roteador, NAT, DHCP e firewall básico. Quando você conecta um cabo Ethernet nela, a parte de switch recebe seu quadro. Quando você acessa a internet, a parte de roteamento/NAT encaminha o tráfego para a rede do provedor.</p>\n  <p>Se o Wi‑Fi está conectado, mas nada abre, o problema pode não ser o AP. Pode ser DNS, rota, firewall, link do provedor ou serviço remoto. Se o cabo não acende link, o problema provavelmente está mais próximo de NIC, cabo, porta ou energia.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um notebook se conecta a um switch de acesso. Esse switch pode aplicar VLAN, autenticação 802.1X, port security e PoE para telefones ou APs. O tráfego segue para um firewall interno, que decide se a rede de usuários pode acessar servidores. Depois, um roteador ou firewall de borda encaminha tráfego para internet, datacenter, filial ou cloud.</p>\n  <p>Em incidentes, cada equipamento fornece evidências diferentes. O switch pode mostrar porta, MAC e VLAN. O firewall pode mostrar conexão permitida ou bloqueada. O roteador pode mostrar rota. O AP pode mostrar cliente associado, RSSI e SSID. O host pode mostrar IP, gateway, DNS e processos.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, muitos equipamentos viram componentes lógicos. Uma VM tem NIC virtual. Uma VPC ou VNet possui subnets, route tables, gateways, NAT gateways, load balancers, security groups, NSGs e firewalls gerenciados. Não há um “cabo RJ‑45” visível, mas os papéis continuam existindo.</p>\n  <p>Um erro comum é achar que cloud eliminou rede. Na verdade, cloud tornou a rede mais programável e abstrata. O troubleshooting muda: em vez de olhar LED de porta, você olha rota, security group, ACL, flow log, peering, private endpoint, DNS privado e políticas de identidade.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, equipamentos e papéis de rede aparecem em automação. Terraform cria security groups, route tables, load balancers e firewalls. Kubernetes cria Services, Ingress, NetworkPolicies e interfaces virtuais de pods. Pipelines precisam acessar registries, scanners, repositórios e ambientes de deploy.</p>\n  <p>Quando uma pipeline falha ao acessar um registry privado, a causa pode ser DNS, rota, firewall, proxy, regra de security group, certificado TLS ou credencial. Pensar nos papéis dos equipamentos ajuda a separar “problema de acesso lógico” de “problema de caminho de rede”.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Do ponto de vista de segurança, equipamentos de rede são pontos de controle e pontos de evidência. Um switch mal configurado pode permitir VLAN indevida. Um AP fraco pode expor a rede sem fio. Um firewall permissivo pode permitir movimento lateral. Um roteador com rota errada pode mandar tráfego por caminho inseguro. Uma NIC comprometida ou interface virtual exposta pode ampliar superfície de ataque.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Porta de switch exposta</td><td>Tomada ativa em área pública</td><td>Acesso físico à rede interna</td><td>Port security, 802.1X, VLAN restrita e portas desativadas</td></tr>\n      <tr><td>Firewall any-any</td><td>Regras amplas demais</td><td>Movimento lateral e exposição indevida</td><td>Menor privilégio, revisão de regras e logs</td></tr>\n      <tr><td>AP mal configurado</td><td>Senha fraca, SSID inadequado ou isolamento ausente</td><td>Acesso sem fio indevido</td><td>WPA3/WPA2-Enterprise, segmentação e monitoramento</td></tr>\n      <tr><td>Roteamento incorreto</td><td>Tráfego passa por caminho não previsto</td><td>Indisponibilidade ou exposição</td><td>Controle de rotas, documentação e validação</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1100 520\" role=\"img\" aria-labelledby=\"m01l07-title m01l07-desc\">\n    <title id=\"m01l07-title\">Papéis dos equipamentos de rede</title>\n    <desc id=\"m01l07-desc\">Diagrama mostrando dispositivo final com NIC, hub legado, switch, roteador, access point e firewall, com fluxos de rede e pontos de política.</desc>\n    <defs>\n      <marker id=\"m01l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"35\" y=\"85\" width=\"150\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"116\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n    <text x=\"110\" y=\"140\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dispositivo final</text>\n\n    <rect x=\"35\" y=\"245\" width=\"150\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"276\" text-anchor=\"middle\" class=\"svg-label\">NIC</text>\n    <text x=\"110\" y=\"300\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Interface de rede</text>\n\n    <rect x=\"245\" y=\"90\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"320\" y=\"120\" text-anchor=\"middle\" class=\"svg-label\">Hub</text>\n    <text x=\"320\" y=\"144\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Repetidor legado</text>\n\n    <rect x=\"455\" y=\"90\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"530\" y=\"120\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"530\" y=\"144\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2 / MAC</text>\n\n    <rect x=\"665\" y=\"90\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"740\" y=\"120\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text>\n    <text x=\"740\" y=\"144\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 3 / IP</text>\n\n    <rect x=\"875\" y=\"90\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"950\" y=\"120\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"950\" y=\"144\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Política e inspeção</text>\n\n    <rect x=\"455\" y=\"260\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"530\" y=\"290\" text-anchor=\"middle\" class=\"svg-label\">Servidor</text>\n    <text x=\"530\" y=\"314\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Serviço local</text>\n\n    <rect x=\"665\" y=\"260\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"740\" y=\"290\" text-anchor=\"middle\" class=\"svg-label\">AP</text>\n    <text x=\"740\" y=\"314\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi para Ethernet</text>\n\n    <rect x=\"875\" y=\"260\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"950\" y=\"290\" text-anchor=\"middle\" class=\"svg-label\">Internet / Cloud</text>\n    <text x=\"950\" y=\"314\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Redes externas</text>\n\n    <line x1=\"185\" y1=\"125\" x2=\"245\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"395\" y1=\"125\" x2=\"455\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"605\" y1=\"125\" x2=\"665\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"815\" y1=\"125\" x2=\"875\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"950\" y1=\"160\" x2=\"950\" y2=\"260\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"530\" y1=\"160\" x2=\"530\" y2=\"260\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"740\" y1=\"260\" x2=\"740\" y2=\"160\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n    <line x1=\"185\" y1=\"281\" x2=\"455\" y2=\"295\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l07-arrow)\" />\n\n    <rect x=\"250\" y=\"385\" width=\"210\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"355\" y=\"415\" text-anchor=\"middle\" class=\"svg-label\">Pergunta de diagnóstico</text>\n    <text x=\"355\" y=\"440\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quem repete, comuta, roteia,</text>\n    <text x=\"355\" y=\"462\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">distribui Wi‑Fi ou aplica política?</text>\n\n    <rect x=\"600\" y=\"385\" width=\"270\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"735\" y=\"415\" text-anchor=\"middle\" class=\"svg-label\">Regra mental</text>\n    <text x=\"735\" y=\"440\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Equipamento não é só caixa:</text>\n    <text x=\"735\" y=\"462\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">é papel, camada, tabela e política.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam a capacidade de distinguir papéis e escolher onde investigar primeiro em cenários de falha.</p>\n</section>\n",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma pequena empresa com equipamentos misturados em uma única caixa, switches sem documentação e Wi‑Fi corporativo. Você deverá propor uma separação mínima de papéis, riscos e evidências.</p>\n</section>\n",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como raciocinar por papéis: quem conecta o host, quem comuta na LAN, quem roteia entre redes, quem distribui Wi‑Fi e quem aplica política.</p>\n</section>\n",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> equipamentos de rede devem ser entendidos por papel, camada, decisão, tabela e evidência.</li>\n    <li><strong>O que lembrar:</strong> NIC conecta o host; hub repete; switch comuta por MAC; roteador encaminha por IP; AP conecta clientes sem fio; firewall aplica política.</li>\n    <li><strong>Erro comum:</strong> achar que todo equipamento que “passa internet” faz a mesma coisa.</li>\n    <li><strong>Uso real:</strong> diagnóstico profissional depende de saber em qual equipamento procurar evidência.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, estudaremos métricas: latência, jitter, perda, throughput e disponibilidade. Depois de saber quem participa da rede, você precisa aprender como medir se a comunicação está boa, ruim, instável ou indisponível.</p>\n</section>\n"
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
      "Ethernet",
      "ARP",
      "IPv4",
      "IPv6",
      "ICMP",
      "TCP",
      "UDP",
      "HTTP",
      "DNS",
      "802.11",
      "802.1X"
    ],
    "dependsOn": [
      "dispositivos finais",
      "topologias",
      "meios de transmissão",
      "cabeamento estruturado",
      "protocolos"
    ],
    "enables": [
      "switching",
      "roteamento",
      "segurança de borda",
      "Wi‑Fi corporativo",
      "segmentação",
      "troubleshooting"
    ]
  },
  "deepDive": {
    "mentalModel": "Para entender um equipamento, pergunte: qual problema ele resolve, em que camada atua, que informação lê, que tabela mantém, que decisão toma, que falhas produz e que evidências registra.",
    "keyTerms": [
      "NIC",
      "MAC",
      "hub",
      "switch",
      "tabela MAC",
      "roteador",
      "tabela de rotas",
      "access point",
      "SSID",
      "firewall",
      "zona",
      "política"
    ],
    "limitations": [
      "Equipamentos modernos podem acumular papéis, então o nome comercial da caixa nem sempre revela tudo que ela faz.",
      "Um firewall não corrige arquitetura ruim se as regras forem permissivas demais.",
      "Um switch não substitui roteamento, ainda que alguns switches L3 também roteiem.",
      "Um AP não resolve problemas de WAN, DNS ou serviço remoto.",
      "Cloud abstrai equipamentos físicos, mas não elimina os papéis de rede."
    ],
    "whenToUse": [
      "Use switches para conectar múltiplos dispositivos em uma LAN de forma eficiente.",
      "Use roteadores ou funções de roteamento para interligar redes IP diferentes.",
      "Use APs para acesso sem fio controlado e planejado.",
      "Use firewalls para aplicar política entre zonas, redes, usuários, aplicações ou ambientes.",
      "Use inventário de NICs e interfaces para rastrear dispositivos finais."
    ],
    "whenNotToUse": [
      "Não use hub em produção moderna, salvo em laboratório didático controlado.",
      "Não use roteador como substituto conceitual de firewall sem políticas adequadas.",
      "Não coloque AP doméstico sem controle dentro de rede corporativa.",
      "Não trate security group como firewall completo sem entender seus limites.",
      "Não diagnostique aplicação antes de validar interface, rota e política básica quando os sintomas indicam rede."
    ],
    "operationalImpact": [
      "Separar papéis facilita troubleshooting e reduz mudanças arriscadas.",
      "Mais equipamentos aumentam visibilidade, mas também exigem documentação, backup de configuração e monitoramento.",
      "Equipamentos gerenciáveis geram logs e métricas melhores que dispositivos domésticos ou não gerenciáveis.",
      "Padronizar marcas e modelos simplifica suporte, atualização e reposição."
    ],
    "financialImpact": [
      "Switches gerenciáveis, firewalls e APs corporativos custam mais, mas reduzem risco operacional.",
      "Firewalls avançados podem envolver licenças de inspeção, suporte e atualização de inteligência de ameaças.",
      "Em cloud, NAT gateway, firewall gerenciado, load balancer e tráfego entre zonas podem gerar custo recorrente.",
      "Equipamentos baratos podem gerar custo oculto em indisponibilidade, retrabalho e falta de logs."
    ],
    "securityImpact": [
      "Equipamentos são controles e fontes de evidência para investigação.",
      "Má configuração pode criar falsa sensação de segurança.",
      "Portas físicas, SSIDs e regras de firewall devem seguir menor privilégio.",
      "A documentação de rede é sensível e deve ser protegida."
    ],
    "decisionTable": [
      {
        "situation": "Usuário tem link físico, mas não acessa outra rede",
        "recommendedChoice": "Verificar gateway, rota e firewall",
        "why": "Switch local pode estar funcionando, mas tráfego entre redes depende de camada 3 e política",
        "risk": "Culpar cabo ou AP sem evidência"
      },
      {
        "situation": "Vários usuários cabeados na mesma sala caem ao mesmo tempo",
        "recommendedChoice": "Investigar switch de acesso, uplink ou energia",
        "why": "Falha coletiva sugere equipamento intermediário compartilhado",
        "risk": "Analisar cada host isoladamente e perder tempo"
      },
      {
        "situation": "Usuários Wi‑Fi reclamam de instabilidade, cabeados não",
        "recommendedChoice": "Investigar AP, rádio, canal, interferência e autenticação Wi‑Fi",
        "why": "Sintoma restrito ao meio sem fio aponta para AP ou RF",
        "risk": "Comprar mais banda de internet sem resolver"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que switch e roteador fazem a mesma coisa.",
      "whyItHappens": "Em roteadores domésticos, switch e roteador ficam na mesma caixa.",
      "consequence": "Diagnóstico errado entre problema local de LAN e problema entre redes.",
      "correction": "Switch comuta quadros por MAC dentro da LAN; roteador encaminha pacotes por IP entre redes."
    },
    {
      "mistake": "Achar que firewall é apenas roteador com bloqueio.",
      "whyItHappens": "Muitos firewalls também roteiam.",
      "consequence": "Regras, zonas, estado e logs são ignorados.",
      "correction": "Firewall é ponto de política e inspeção; roteamento é apenas parte do caminho."
    },
    {
      "mistake": "Tratar AP como sinônimo de internet.",
      "whyItHappens": "Para usuários, Wi‑Fi e internet parecem a mesma coisa.",
      "consequence": "Problemas de DNS, rota ou firewall são atribuídos ao rádio sem análise.",
      "correction": "AP conecta cliente sem fio à rede; acesso à internet depende de outros componentes."
    },
    {
      "mistake": "Ignorar NIC e driver no troubleshooting.",
      "whyItHappens": "A interface é invisível quando funciona.",
      "consequence": "Falhas locais de driver, energia, velocidade ou MAC passam despercebidas.",
      "correction": "Comece verificando interface, link, IP, gateway, DNS e logs locais."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Sem link físico",
      "Wi‑Fi conectado sem internet",
      "Apenas uma sala sem rede",
      "Apenas uma VLAN sem acesso",
      "Firewall bloqueando tráfego esperado",
      "Cloud VM sem saída para internet"
    ],
    "diagnosticQuestions": [
      "O problema ocorre em um host, vários hosts, uma porta, um switch, um SSID ou uma rede inteira?",
      "A interface tem link, IP, máscara, gateway e DNS?",
      "O tráfego falha dentro da LAN, entre redes ou na saída para internet/cloud?",
      "Existe política de firewall ou security group bloqueando?",
      "Há logs no switch, AP, firewall, roteador ou host?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\ngetmac /v\nGet-NetAdapter\nTest-NetConnection 8.8.8.8 -Port 53",
        "purpose": "Ver interface, MAC, IP, gateway, DNS e teste básico de conectividade.",
        "expectedObservation": "Adaptador ativo, endereço IPv4 válido, gateway e DNS configurados.",
        "interpretation": "Se a interface está desconectada ou sem IP, investigue NIC, cabo, Wi‑Fi, DHCP ou política local."
      },
      {
        "platform": "Linux",
        "command": "ip link\nip addr\nip route\nss -tulpen",
        "purpose": "Ver interfaces, endereços, rotas e serviços ouvindo no host.",
        "expectedObservation": "Interface UP, IP válido e rota default quando necessário.",
        "interpretation": "Sem rota default, o host pode falar localmente mas não sair para outras redes."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow mac address-table\nshow cdp neighbors\nshow interfaces status",
        "purpose": "Ver portas, IPs, vizinhos, tabela MAC e estado físico em equipamentos Cisco.",
        "expectedObservation": "Interfaces relevantes em up/up, MACs aprendidos e vizinhos esperados.",
        "interpretation": "Porta down, sem MAC aprendido ou vizinho inesperado indica caminho físico/lógico a investigar."
      }
    ],
    "decisionTree": [
      {
        "if": "Um único host falha",
        "then": "Verificar NIC, IP, cabo/Wi‑Fi, DHCP, DNS e firewall local."
      },
      {
        "if": "Todos os hosts do mesmo switch falham",
        "then": "Verificar switch, uplink, energia, VLAN, STP e porta de distribuição."
      },
      {
        "if": "Somente tráfego para outra rede falha",
        "then": "Verificar gateway, rota, firewall e ACL/security group."
      },
      {
        "if": "Somente Wi‑Fi falha",
        "then": "Verificar AP, SSID, autenticação, rádio, interferência e VLAN associada."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Desativar portas físicas ociosas ou colocá-las em VLAN restrita.",
      "Usar 802.1X, port security ou NAC quando o risco justificar.",
      "Separar redes por função e aplicar firewall entre zonas.",
      "Manter firmware de switches, roteadores, APs e firewalls atualizado.",
      "Registrar logs de firewall, APs e equipamentos críticos em local centralizado.",
      "Proteger documentação de rede e backups de configuração."
    ],
    "badPractices": [
      "Usar AP doméstico não autorizado em rede corporativa.",
      "Manter firewall com regra any-any sem justificativa e revisão.",
      "Conectar switches não gerenciáveis em áreas críticas sem inventário.",
      "Não trocar senhas padrão de equipamentos.",
      "Não saber qual equipamento fornece evidência em incidente."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Achar que NAT substitui firewall.",
      "Achar que SSID oculto é controle de segurança suficiente.",
      "Achar que cloud não tem rede porque não há equipamento físico visível."
    ],
    "vulnerabilities": [
      {
        "name": "Porta física exposta",
        "description": "Tomadas ou portas de switch ativas em áreas acessíveis podem permitir conexão não autorizada.",
        "defensiveExplanation": "O risco é a entrada de um dispositivo não gerenciado na rede interna.",
        "mitigation": "Desativar portas não usadas, usar 802.1X, VLAN de quarentena, port security e monitoramento."
      },
      {
        "name": "Firewall permissivo",
        "description": "Regras amplas permitem tráfego além do necessário entre redes.",
        "defensiveExplanation": "Isso aumenta superfície de ataque e facilita movimento lateral após comprometimento.",
        "mitigation": "Aplicar menor privilégio, revisar regras, registrar justificativas e monitorar hits."
      },
      {
        "name": "AP não autorizado",
        "description": "Um access point conectado sem controle pode criar ponte insegura para a rede cabeada.",
        "defensiveExplanation": "Usuários ou atacantes próximos podem tentar acessar a rede por rádio.",
        "mitigation": "Inventário, detecção de rogue AP, 802.1X, segmentação e políticas físicas."
      }
    ],
    "monitoring": [
      "Logs de firewall",
      "Tabela MAC e eventos de porta",
      "Eventos de associação Wi‑Fi",
      "Flow logs em cloud",
      "Mudanças de configuração",
      "Alertas de portas novas ou MACs desconhecidos"
    ],
    "hardening": [
      "Senhas fortes e únicas",
      "Gerenciamento fora da rede de usuários",
      "SSH/HTTPS em vez de protocolos inseguros",
      "Backup de configuração",
      "MFA para consoles cloud",
      "Controle de acesso baseado em função"
    ],
    "detectionIdeas": [
      "MAC novo em porta sensível",
      "Aumento de bloqueios no firewall",
      "Cliente Wi‑Fi associado em horário incomum",
      "Regra de security group alterada",
      "Rota criada para destino inesperado"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que não basta dizer que um equipamento ‘passa internet’?",
      "hints": [
        "Pense em papel e decisão.",
        "Compare switch, roteador e firewall."
      ],
      "expectedIdeas": [
        "camadas",
        "MAC",
        "IP",
        "política",
        "evidência"
      ],
      "explanation": "Equipamentos diferentes tomam decisões diferentes. Sem separar papéis, o diagnóstico fica impreciso."
    },
    {
      "type": "diagnóstico",
      "question": "Um host consegue pingar outro host da mesma LAN, mas não acessa a internet. Qual equipamento você investigaria primeiro depois do host?",
      "hints": [
        "A LAN parece funcionar.",
        "A saída para outra rede depende do próximo salto."
      ],
      "expectedIdeas": [
        "gateway",
        "roteador",
        "firewall",
        "rota",
        "NAT",
        "DNS"
      ],
      "explanation": "Se a LAN funciona, o problema provavelmente está em roteamento, firewall, NAT, DNS ou link externo, não no switch local inicialmente."
    },
    {
      "type": "cenário real",
      "question": "Em uma empresa, por que APs domésticos conectados sem autorização são perigosos?",
      "hints": [
        "Pense em ponte entre rádio e rede interna.",
        "Pense em autenticação e segmentação."
      ],
      "expectedIdeas": [
        "rogue AP",
        "acesso indevido",
        "segmentação",
        "WPA",
        "802.1X",
        "monitoramento"
      ],
      "explanation": "Um AP não autorizado pode expor a rede cabeada pelo rádio e contornar controles corporativos."
    }
  ],
  "quiz": [
    {
      "id": "q1.7.1",
      "type": "conceito",
      "q": "Qual é o papel principal de uma NIC?",
      "opts": [
        "Conectar o dispositivo final à rede",
        "Aplicar regras de firewall entre zonas",
        "Traduzir nomes DNS",
        "Armazenar logs do SIEM"
      ],
      "a": 0,
      "exp": "A NIC é a interface de rede do dispositivo final, com MAC, driver e link físico ou sem fio.",
      "difficulty": "iniciante",
      "topic": "NIC"
    },
    {
      "id": "q1.7.2",
      "type": "comparação",
      "q": "Qual afirmação diferencia melhor switch e roteador?",
      "opts": [
        "Switch comuta quadros por MAC; roteador encaminha pacotes por IP",
        "Switch sempre usa internet; roteador sempre usa Wi‑Fi",
        "Switch criptografa; roteador descriptografa",
        "Não há diferença técnica"
      ],
      "a": 0,
      "exp": "Switch atua principalmente em camada 2 usando MAC. Roteador atua em camada 3 usando IP e tabela de rotas.",
      "difficulty": "iniciante",
      "topic": "switch vs roteador"
    },
    {
      "id": "q1.7.3",
      "type": "segurança",
      "q": "Qual prática reduz risco de conexão indevida em uma tomada de rede pública?",
      "opts": [
        "802.1X ou porta desativada/VLAN restrita",
        "Trocar o papel de parede do desktop",
        "Aumentar brilho do monitor",
        "Usar Base64 no SSID"
      ],
      "a": 0,
      "exp": "Portas físicas expostas exigem controle de acesso, desativação ou segmentação restrita.",
      "difficulty": "iniciante-intermediário",
      "topic": "segurança física"
    },
    {
      "id": "q1.7.4",
      "type": "diagnóstico",
      "q": "Usuários cabeados funcionam, mas usuários Wi‑Fi oscilam. Qual componente deve ganhar prioridade na investigação?",
      "opts": [
        "AP, rádio, canal, interferência e autenticação Wi‑Fi",
        "Somente o cabo do servidor",
        "A tabela Unicode",
        "A pinagem T568A do datacenter remoto"
      ],
      "a": 0,
      "exp": "Quando a falha é restrita ao Wi‑Fi, AP e radiofrequência são hipóteses fortes.",
      "difficulty": "iniciante",
      "topic": "Wi‑Fi"
    },
    {
      "id": "q1.7.5",
      "type": "cloud",
      "q": "Em cloud, qual elemento se parece conceitualmente com uma regra de firewall aplicada a uma instância ou interface?",
      "opts": [
        "Security group ou NSG",
        "Fonte do terminal",
        "Tabela ASCII",
        "Patch cord RJ‑45"
      ],
      "a": 0,
      "exp": "Security groups e NSGs aplicam políticas de tráfego em recursos virtuais.",
      "difficulty": "iniciante-intermediário",
      "topic": "cloud"
    },
    {
      "id": "q1.7.6",
      "type": "pegadinha",
      "q": "Por que hub é pouco usado em redes modernas de produção?",
      "opts": [
        "Porque repete tráfego sem inteligência, criando limitações de desempenho e privacidade",
        "Porque usa endereços IPv6 obrigatoriamente",
        "Porque só funciona em fibra óptica",
        "Porque substitui firewalls avançados"
      ],
      "a": 0,
      "exp": "Hubs repetem sinais para todas as portas e não aprendem MACs, ao contrário de switches.",
      "difficulty": "iniciante",
      "topic": "hub"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.7.1",
      "front": "O que é uma NIC?",
      "back": "É a interface de rede do dispositivo final, responsável por conectar o host ao meio de comunicação.",
      "tags": [
        "NIC",
        "fundamentos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.7.2",
      "front": "Qual é a decisão principal de um switch?",
      "back": "Encaminhar quadros na LAN com base em endereços MAC e tabela MAC.",
      "tags": [
        "switch",
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.7.3",
      "front": "Qual é a decisão principal de um roteador?",
      "back": "Encaminhar pacotes entre redes com base no endereço IP de destino e na tabela de rotas.",
      "tags": [
        "roteador",
        "camada 3"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.7.4",
      "front": "Qual é o papel de um AP?",
      "back": "Conectar clientes sem fio à rede, gerenciando SSID, rádio, associação e autenticação Wi‑Fi.",
      "tags": [
        "AP",
        "Wi‑Fi"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.7.5",
      "front": "Firewall é igual a roteador?",
      "back": "Não. Ele pode rotear, mas seu papel principal é aplicar política, inspeção e registro entre zonas ou contextos.",
      "tags": [
        "firewall",
        "segurança"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc1.7.6",
      "front": "Por que hubs são legados?",
      "back": "Porque apenas repetem sinais para todas as portas, sem tabela MAC, filtragem ou eficiência moderna.",
      "tags": [
        "hub",
        "legado"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.7.1",
      "type": "conceitual",
      "prompt": "Explique, com suas palavras, a diferença entre switch, roteador e firewall.",
      "expectedAnswer": "Switch conecta dispositivos na LAN usando MAC; roteador interliga redes usando IP; firewall aplica políticas e inspeção entre zonas, redes ou contextos.",
      "explanation": "A resposta deve separar decisão de camada 2, camada 3 e política de segurança."
    },
    {
      "id": "ex1.7.2",
      "type": "diagnóstico",
      "prompt": "Um usuário está conectado ao Wi‑Fi, mas não recebe IP. Quais hipóteses você levantaria?",
      "expectedAnswer": "Problema no AP, VLAN associada ao SSID, DHCP, autenticação, alcance/interferência ou política de rede.",
      "explanation": "Conexão ao SSID não garante DHCP nem acesso à rede correta."
    },
    {
      "id": "ex1.7.3",
      "type": "arquitetura",
      "prompt": "Desenhe uma rede pequena com notebook, switch, AP, firewall e internet. Indique o papel de cada componente.",
      "expectedAnswer": "Notebook como dispositivo final/NIC; switch como camada 2; AP como ponte Wi‑Fi; firewall como política/borda; internet como rede externa.",
      "explanation": "O objetivo é mapear papéis, não marcas comerciais."
    },
    {
      "id": "ex1.7.4",
      "type": "segurança",
      "prompt": "Liste três riscos de segurança relacionados a equipamentos de rede mal configurados.",
      "expectedAnswer": "Porta física exposta, firewall permissivo, AP não autorizado, firmware desatualizado, senha padrão, logs ausentes.",
      "explanation": "Equipamentos são controles e também podem ser pontos fracos."
    }
  ],
  "challenge": {
    "title": "Organize os papéis de rede de uma pequena empresa",
    "scenario": "Uma empresa possui um roteador doméstico fazendo Wi‑Fi, um switch não gerenciável, algumas câmeras IP, computadores administrativos e um servidor local. Ninguém sabe onde aplicar política, onde coletar logs ou como separar visitantes.",
    "tasks": [
      "Identificar os papéis existentes",
      "Propor separação mínima de funções",
      "Indicar onde aplicar firewall e segmentação",
      "Indicar quais evidências coletar em incidente",
      "Sugerir melhorias sem gastar demais"
    ],
    "constraints": [
      "A empresa tem orçamento limitado",
      "Visitantes não devem acessar servidor local",
      "Câmeras precisam ficar isoladas",
      "A solução deve ser explicável para equipe júnior"
    ],
    "expectedDeliverables": [
      "Tabela de equipamentos e papéis",
      "Diagrama físico/lógico simples",
      "Lista de riscos",
      "Plano de melhorias por prioridade",
      "Comandos ou evidências de validação"
    ],
    "gradingRubric": [
      {
        "criterion": "Identificação correta dos papéis",
        "points": 30,
        "description": "Distingue switch, roteador, AP, firewall, host e serviço."
      },
      {
        "criterion": "Segurança e segmentação",
        "points": 30,
        "description": "Propõe isolamento de visitantes, câmeras e servidor."
      },
      {
        "criterion": "Viabilidade operacional",
        "points": 20,
        "description": "Considera custo, documentação, equipe e manutenção."
      },
      {
        "criterion": "Evidências e validação",
        "points": 20,
        "description": "Define como confirmar conectividade, políticas e logs."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos papéis: quem conecta hosts, quem distribui Wi‑Fi, quem interliga redes e quem aplica política. Depois identificamos riscos: rede plana, visitantes misturados, câmeras acessíveis, ausência de logs e equipamentos domésticos. Em seguida propomos melhorias graduais.",
    "steps": [
      "Inventariar equipamentos e portas",
      "Separar rede administrativa, visitantes, câmeras e servidor",
      "Usar firewall ou roteador com VLANs se disponível",
      "Trocar AP doméstico por AP corporativo quando possível",
      "Registrar logs de firewall e eventos de Wi‑Fi",
      "Documentar gateway, SSIDs, VLANs e regras"
    ],
    "commonWrongAnswers": [
      {
        "answer": "Comprar um switch maior resolve tudo.",
        "whyItIsWrong": "Mais portas não criam segmentação, política ou logs por si só."
      },
      {
        "answer": "Colocar senha forte no Wi‑Fi resolve todos os riscos.",
        "whyItIsWrong": "Senha forte ajuda, mas não separa visitantes, câmeras, servidores e usuários internos."
      },
      {
        "answer": "NAT já é firewall suficiente.",
        "whyItIsWrong": "NAT altera endereçamento, mas não substitui política explícita, inspeção e registro adequados."
      }
    ],
    "finalAnswer": "Uma solução mínima seria usar um firewall/roteador capaz de VLANs, switch gerenciável e AP com SSIDs separados. Administrativos, visitantes, câmeras e servidor ficam em redes distintas. O firewall controla tráfego entre elas, visitantes não acessam servidor, câmeras acessam apenas o necessário, e logs de firewall/AP são preservados. Se o orçamento for muito baixo, a prioridade é documentar o ambiente, desativar portas desnecessárias, separar Wi‑Fi de visitantes e planejar substituição gradual dos equipamentos não gerenciáveis."
  },
  "glossary": [
    {
      "term": "NIC",
      "shortDefinition": "Interface de rede de um dispositivo final.",
      "longDefinition": "Componente físico ou virtual que permite que um host participe da rede, possuindo endereço MAC, driver e estado de link.",
      "example": "A placa Ethernet ou Wi‑Fi do notebook é uma NIC.",
      "relatedTerms": [
        "MAC",
        "interface",
        "driver"
      ],
      "relatedLessons": [
        "1.2",
        "1.5",
        "1.7"
      ]
    },
    {
      "term": "Switch",
      "shortDefinition": "Equipamento que comuta quadros em uma LAN usando endereços MAC.",
      "longDefinition": "Dispositivo de camada 2 que aprende MACs por porta e encaminha quadros dentro da rede local.",
      "example": "Um switch de acesso conecta computadores, impressoras e APs em uma sala.",
      "relatedTerms": [
        "MAC",
        "VLAN",
        "tabela MAC"
      ],
      "relatedLessons": [
        "1.7",
        "3.1"
      ]
    },
    {
      "term": "Roteador",
      "shortDefinition": "Equipamento que encaminha pacotes entre redes IP diferentes.",
      "longDefinition": "Dispositivo de camada 3 que usa tabela de rotas para decidir o próximo salto de pacotes IP.",
      "example": "O gateway padrão da rede local costuma ser um roteador ou firewall roteando para fora da LAN.",
      "relatedTerms": [
        "gateway",
        "rota",
        "IP"
      ],
      "relatedLessons": [
        "1.7",
        "4.1",
        "11.1"
      ]
    },
    {
      "term": "Access point",
      "shortDefinition": "Equipamento que conecta clientes Wi‑Fi à rede.",
      "longDefinition": "Dispositivo que gerencia rádio, SSID, associação, autenticação Wi‑Fi e ponte entre rede sem fio e cabeada.",
      "example": "O AP corporativo no teto fornece acesso Wi‑Fi para notebooks e celulares.",
      "relatedTerms": [
        "SSID",
        "WLAN",
        "802.11"
      ],
      "relatedLessons": [
        "1.3",
        "1.7",
        "12.1"
      ]
    },
    {
      "term": "Firewall",
      "shortDefinition": "Controle que aplica política de tráfego entre redes, zonas ou contextos.",
      "longDefinition": "Equipamento ou serviço que permite, bloqueia, inspeciona e registra tráfego com base em regras, estado, aplicação, usuário ou contexto.",
      "example": "Um firewall bloqueia acesso de visitantes ao servidor interno.",
      "relatedTerms": [
        "ACL",
        "zona",
        "política",
        "NGFW"
      ],
      "relatedLessons": [
        "1.7",
        "9.1"
      ]
    },
    {
      "term": "Hub",
      "shortDefinition": "Equipamento legado que repete sinais para todas as portas.",
      "longDefinition": "Repetidor multiporta sem inteligência de comutação, sem tabela MAC e com limitações importantes de desempenho e privacidade.",
      "example": "Um hub em laboratório pode ajudar a demonstrar repetição, mas não deve ser usado em produção moderna.",
      "relatedTerms": [
        "repetidor",
        "colisão",
        "camada 1"
      ],
      "relatedLessons": [
        "1.7",
        "3.1"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Módulo 0 — Fundamentos da Computação",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base de bits, sinais, protocolos e pensamento em camadas."
    },
    {
      "type": "internal-course",
      "title": "Módulo 1.6 — Cabeamento estruturado e padrões RJ-45",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Pré-requisito físico para entender interconexão de equipamentos."
    },
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Família de padrões relacionada a Ethernet e switches."
    },
    {
      "type": "standard",
      "title": "IEEE 802.11 Wireless LAN",
      "organization": "IEEE",
      "url": "",
      "note": "Família de padrões relacionada a Wi‑Fi e access points."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e Kubernetes",
      "lesson": "a definir",
      "reason": "NICs virtuais, load balancers, ingress controllers e security groups reaparecem em cloud e Kubernetes."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Controle de acesso e identidade",
      "lesson": "a definir",
      "reason": "802.1X, NAC, VPN e políticas de firewall se conectam com identidade e autorização."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "exerciseDone",
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "1.8"
    ]
  }
};
