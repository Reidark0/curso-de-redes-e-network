export const lesson0110 = {
  "id": "1.10",
  "moduleId": "m01",
  "order": 10,
  "title": "Revisão e mini-projeto: mapear sua rede",
  "subtitle": "Consolide os fundamentos do Módulo 1 criando um mapa físico e lógico com inventário, evidências, métricas, riscos e próximos passos.",
  "duration": "120-165 min",
  "estimatedStudyTimeMinutes": 165,
  "difficulty": "iniciante-intermediário",
  "type": "ligação/revisão",
  "xp": 205,
  "tags": [
    "redes",
    "fundamentos",
    "revisão",
    "mini-projeto",
    "mapeamento",
    "inventário",
    "topologia",
    "diagnóstico",
    "segurança",
    "documentação"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.1",
      "reason": "É necessário entender o conceito de rede como sistema de comunicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.7",
      "reason": "É necessário distinguir papéis de NIC, switch, roteador, AP e firewall."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.9",
      "reason": "O mini-projeto usa comandos de diagnóstico inicial para coletar evidências."
    }
  ],
  "objectives": [
    "Revisar os principais conceitos do Módulo 1.",
    "Criar um mapa físico e lógico de uma rede pequena.",
    "Classificar dispositivos finais, intermediários e serviços.",
    "Registrar meios de transmissão, topologias, equipamentos, métricas e evidências.",
    "Identificar riscos iniciais de segurança e operação.",
    "Preparar a transição para o Modelo OSI no Módulo 2."
  ],
  "learningOutcomes": [
    "Dada uma rede pequena, o aluno cria um inventário inicial de dispositivos e serviços.",
    "Dado um conjunto de comandos, o aluno registra evidências sem expor dados sensíveis.",
    "Dado um mapa físico, o aluno propõe uma visão lógica complementar.",
    "Dado um sintoma, o aluno relaciona métricas e comandos iniciais.",
    "Dado um ambiente simples, o aluno aponta riscos e próximos passos de melhoria."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Esta aula fecha o Módulo 1 com um artefato prático: o mapa inicial da sua rede. Nele você aplica o que já viu (dispositivos, tipos de rede, topologias, meios, cabeamento, equipamentos, métricas e comandos de diagnóstico).</p>\n  <p>Mapear não é desenhar caixinhas bonitas. É registrar onde estão os dispositivos finais, quais equipamentos intermediários e serviços existem, por onde o tráfego provavelmente passa, quais evidências sustentam isso e quais riscos aparecem. O mapa é o ponto de partida ao assumir uma rede desconhecida, antes de redesenhar, segmentar ou migrar para cloud, e depois de incidentes.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma empresa pequena tem internet instável, Wi-Fi ruim, impressoras inacessíveis, servidores internos sem documentação e nenhum inventário confiável. Antes de trocar firewall, contratar link novo ou culpar o provedor, o primeiro trabalho profissional é mapear o ambiente e separar evidência de opinião.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Sem mapa, o diagnóstico começa no escuro. Um incidente pode parecer problema de aplicação quando é DNS, problema de internet quando é gateway, ou falha de servidor quando é VLAN, Wi-Fi, cabo, firewall ou rota. Sem inventário, também não dá para aplicar segurança: não se protege o que não se conhece.</p>\n  <p>Um mapa só visual também não resolve. Muitas redes críticas ainda operam com documentação incompleta ou desatualizada: o desenho mostra um firewall, mas não as regras; mostra um switch, mas não as portas, VLANs e enlaces; mostra um servidor, mas não os serviços, o DNS, as dependências nem o dono.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Operação:</strong> chamados demoram porque ninguém sabe o caminho real do tráfego.</li>\n    <li><strong>Segurança:</strong> ativos desconhecidos, APs não autorizados, portas abertas e serviços expostos ficam invisíveis.</li>\n    <li><strong>Custo:</strong> a empresa compra banda, appliances ou licenças sem saber se o gargalo está em outro lugar.</li>\n    <li><strong>Cloud:</strong> subnets, rotas, endpoints privados e security groups são criados sem relação clara com a rede corporativa.</li>\n    <li><strong>DevSecOps:</strong> pipelines falham ao acessar registries, APIs ou clusters porque as dependências de rede não foram mapeadas.</li>\n  </ul>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> um mapa de rede é uma documentação técnica que combina visão física, visão lógica, inventário, papéis dos equipamentos, serviços, endereçamento inicial, métricas e riscos, para apoiar diagnóstico, operação, segurança e evolução da arquitetura.</div>\n  <p>Pense no mapa como uma <strong>hipótese documentada</strong> sobre como a comunicação acontece: ele mostra o que você sabe, como sabe (qual comando ou observação, quando e de onde) e o que ainda não sabe. O que foi confirmado por evidência é <strong>fato</strong>; o que você deduziu, como o caminho provável, é <strong>hipótese</strong>; o que não conseguiu confirmar é <strong>lacuna</strong>.</p>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Desenho bonito sem evidência.</strong> A ferramenta de diagrama dá sensação de documentação completa, mas o mapa não ajuda no troubleshooting real. Anexe comandos, data, fonte e limitações.</li>\n      <li><strong>Misturar físico e lógico.</strong> Os dois falam de conexões, e aí parece que o cabo determina sozinho o caminho do tráfego. Faça seções separadas.</li>\n      <li><strong>Compartilhar sem sanitizar.</strong> IPs, nomes internos e prints vazam informação útil para atacantes. Mascare antes de enviar.</li>\n      <li><strong>Concluir a causa com uma única evidência.</strong> O primeiro comando parece confirmar a hipótese favorita. Cruze configuração, alcance, DNS, caminho e métricas.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Um mapa útil nasce de perguntas feitas em ordem: do seu host para fora. Cada etapa tem uma evidência típica e um limite que você precisa anotar.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Etapa</th><th>O que registrar</th><th>Evidência (Windows · Linux)</th><th>Limite da evidência</th></tr></thead>\n    <tbody>\n      <tr><td>1. Host</td><td>Nome, sistema, interface, IP, máscara, gateway, DNS e tipo de conexão (cabo ou Wi-Fi)</td><td><code>ipconfig /all</code> · <code>ip addr</code>, <code>ip route</code></td><td>Mostra só o host onde você rodou o comando</td></tr>\n      <tr><td>2. Vizinhança</td><td>Gateway e seu MAC, outros vizinhos, switch/AP quando conhecido, meio usado</td><td><code>arp -a</code> · <code>ip neigh</code></td><td>ARP só mostra a vizinhança local recente, não a rede inteira</td></tr>\n      <tr><td>3. Serviços</td><td>DNS, DHCP, internet, impressora, servidor interno, aplicação ou API</td><td><code>nslookup exemplo.com</code> e a lista de serviços conhecidos</td><td>Serviço que você não usa não aparece</td></tr>\n      <tr><td>4. Caminho</td><td>Saltos visíveis, roteador, firewall, proxy, VPN ou link WAN</td><td><code>tracert 8.8.8.8</code> · <code>tracepath 8.8.8.8</code></td><td>Saltos que não respondem ICMP aparecem como asteriscos; comandos locais não mostram as regras de firewall</td></tr>\n      <tr><td>5. Métricas</td><td>Latência, perda, jitter aproximado, throughput percebido, disponibilidade observada</td><td><code>ping &lt;gateway&gt;</code>, <code>ping 8.8.8.8</code></td><td>ICMP pode ser bloqueado; um teste rápido pode não reproduzir um sintoma intermitente</td></tr>\n      <tr><td>6. Riscos</td><td>Wi-Fi fraco, porta exposta, DNS suspeito, rede plana, documentação ausente, caminho crítico sem redundância</td><td>Observação + resultado das etapas anteriores</td><td>O que não foi confirmado entra como lacuna, não como fato</td></tr>\n    </tbody>\n  </table></div>\n  <p>Toda a tabela vale para um momento: DHCP troca endereços, a qualidade do Wi-Fi varia e rotas mudam. Por isso cada evidência leva <strong>data e origem</strong>, e o mapa precisa ser atualizado, ou fica obsoleto.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>O mini-projeto separa quatro visões complementares da mesma rede:</p>\n  <ul>\n    <li><strong>Visão física:</strong> cabos, Wi-Fi, rack, patch panel, AP, switch, roteador, firewall e links.</li>\n    <li><strong>Visão lógica:</strong> IPs, gateway, DNS, serviços, redes envolvidas, caminho provável e políticas.</li>\n    <li><strong>Visão operacional:</strong> métricas, sintomas, comandos executados, resultados e evidências.</li>\n    <li><strong>Visão de segurança:</strong> riscos, exposição, ativos desconhecidos, portas, Wi-Fi, documentação e mitigação.</li>\n  </ul>\n  <p>Em cloud, a visão física quase desaparece: VPC ou VNet, subnets, route tables, security groups ou NSGs, NAT Gateway, load balancer, DNS privado, VPN e peering são objetos lógicos. O hábito de separar as quatro visões continua valendo. Em ambientes maiores, o inventário vem de ferramentas de descoberta (SNMP, agentes, logs, sempre com permissão) e de documentação como código; aqui você faz a versão manual, com comandos.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Mapear uma rede é parecido com mapear um hospital. Não basta saber que existe uma recepção: é preciso saber onde ficam as salas, quais corredores ligam os setores, quais portas são restritas, onde estão os equipamentos críticos, quem depende de quem e quais caminhos alternativos existem em caso de falha.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> o hospital fica parado; a rede muda sozinha (DHCP, Wi-Fi, rotas, políticas invisíveis, cloud), por isso o mapa precisa de evidências com data.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Um inventário inicial de uma casa, já classificado e sanitizado:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Item</th><th>Tipo</th><th>Meio</th><th>Evidência</th></tr></thead>\n    <tbody>\n      <tr><td>Notebook (host-A)</td><td>Dispositivo final</td><td>Wi-Fi</td><td><code>ipconfig /all</code>: IP 192.168.x.23, gateway 192.168.x.1</td></tr>\n      <tr><td>Celular e smart TV</td><td>Dispositivos finais</td><td>Wi-Fi</td><td>Lista de dispositivos conectados no roteador (se você o administra)</td></tr>\n      <tr><td>Impressora</td><td>Dispositivo final</td><td>Rede local</td><td>Aparece em <code>arp -a</code> depois de você imprimir</td></tr>\n      <tr><td>Roteador do provedor</td><td>Intermediário (gateway, AP Wi-Fi e NAT no mesmo aparelho)</td><td>Fibra até o provedor</td><td><code>arp -a</code> mostra o gateway; ping responde</td></tr>\n      <tr><td>DNS entregue por DHCP</td><td>Serviço</td><td>—</td><td><code>ipconfig /all</code> e <code>nslookup</code></td></tr>\n      <tr><td>Internet via fibra</td><td>Serviço (link)</td><td>Fibra</td><td><code>tracert 8.8.8.8</code></td></tr>\n    </tbody>\n  </table></div>\n  <p>O mapa também anota sintomas: Wi-Fi ruim no quarto, latência maior em jogos e perda de sinal quando a porta do cômodo fecha. Mesmo simples, ele já orienta o diagnóstico. Se só o notebook falha, o problema pode estar no host. Se todos falham, a suspeita vai para gateway, link ou provedor. Se nomes não resolvem, DNS entra na investigação. Se só o quarto tem problema, o meio rádio e a posição do AP viram hipótese.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa pequena, o mini-projeto mapeia usuários administrativos, equipe financeira, impressoras, Wi-Fi corporativo, Wi-Fi visitante, switch de acesso, firewall, link de internet, servidor de arquivos e DNS/DHCP. O documento indica quais dispositivos são finais, quais são intermediários e quais serviços sustentam a operação.</p>\n  <p>Esse mapa serve para suporte, auditoria, renovação de equipamentos, segmentação futura e planejamento de segurança, e tira da cabeça de uma só pessoa o conhecimento de “onde tudo está”. Ele revela, por exemplo, se o Wi-Fi visitante cai no mesmo segmento da equipe financeira.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>Para segurança, o mapa inicial revela a superfície de ataque. Os riscos mais comuns e como eles aparecem:</p>\n  <div class=\"responsive-table\"><table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece no mapa</th><th>Impacto</th><th>Mitigação inicial</th></tr></thead>\n    <tbody>\n      <tr><td>Rede plana</td><td>Todos os dispositivos no mesmo segmento</td><td>Movimento lateral facilitado</td><td>Planejar segmentação e políticas</td></tr>\n      <tr><td>Ativo desconhecido</td><td>Dispositivo sem dono ou função</td><td>Risco de comprometimento invisível</td><td>Inventário, NAC e validação</td></tr>\n      <tr><td>Wi-Fi visitante mal isolado</td><td>Visitantes acessam recursos internos</td><td>Exposição indevida</td><td>SSID separado, VLAN e firewall</td></tr>\n      <tr><td>Caminho sem controle</td><td>Tráfego entre redes sem firewall, sem logs ou dependência crítica sem redundância</td><td>Ataque ou falha sem detecção</td><td>Firewall entre segmentos, logs e redundância planejada</td></tr>\n      <tr><td>Evidência vazada</td><td>Mapa com IPs e nomes internos compartilhado sem controle</td><td>Vazamento de informação</td><td>Sanitização e classificação documental</td></tr>\n    </tbody>\n  </table></div>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 470\" role=\"img\" aria-labelledby=\"m01l10-title m01l10-desc\">\n    <title id=\"m01l10-title\">Mini-projeto de mapeamento de rede</title>\n    <desc id=\"m01l10-desc\">Diagrama mostrando host do aluno, rede local, gateway, serviços, internet ou cloud, evidências e riscos.</desc>\n    <defs>\n      <marker id=\"m01l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"112\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Seu host</text>\n    <text x=\"112\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP, DNS, gateway</text>\n    <rect x=\"250\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"322\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Acesso</text>\n    <text x=\"322\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">switch/AP/meio</text>\n    <rect x=\"460\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"532\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n    <text x=\"532\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota padrão</text>\n    <rect x=\"670\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"742\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Política</text>\n    <text x=\"742\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">firewall/proxy</text>\n    <rect x=\"835\" y=\"70\" width=\"110\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"890\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Serviços</text>\n    <text x=\"890\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNS/web/cloud</text>\n    <line x1=\"185\" y1=\"108\" x2=\"250\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"395\" y1=\"108\" x2=\"460\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"605\" y1=\"108\" x2=\"670\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"815\" y1=\"108\" x2=\"835\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <rect x=\"90\" y=\"230\" width=\"220\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"200\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n    <text x=\"200\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ipconfig, ping, arp</text>\n    <text x=\"200\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tracert, nslookup</text>\n    <rect x=\"380\" y=\"230\" width=\"220\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"490\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Mapa</text>\n    <text x=\"490\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">físico + lógico</text>\n    <text x=\"490\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">serviços + métricas</text>\n    <rect x=\"670\" y=\"230\" width=\"220\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--attacker\"></rect>\n    <text x=\"780\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Riscos</text>\n    <text x=\"780\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rede plana, Wi-Fi</text>\n    <text x=\"780\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ativo desconhecido</text>\n    <line x1=\"310\" y1=\"282\" x2=\"380\" y2=\"282\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"600\" y1=\"282\" x2=\"670\" y2=\"282\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <text x=\"490\" y=\"405\" text-anchor=\"middle\" class=\"svg-label\">Mini-projeto: desenhar, evidenciar, interpretar, apontar riscos e preparar o Modelo OSI.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li>Rede é um sistema de comunicação, operação e segurança; o mapa de rede é uma hipótese documentada sobre esse sistema: mostra o que você sabe, como sabe e o que ainda falta confirmar.</li>\n    <li>Mapas úteis separam visão física, lógica, operacional e de segurança, com inventário classificado em dispositivos finais, intermediários e serviços.</li>\n    <li>Comandos simples (<code>ipconfig</code>/<code>ip</code>, <code>arp</code>, <code>ping</code>, <code>tracert</code>, <code>nslookup</code>) geram evidências, mas cada um tem limites e nenhum substitui a interpretação.</li>\n    <li>Evidência sem data, fonte e limitação pode ser tão perigosa quanto não ter documentação.</li>\n    <li>Mapas internos são documentos sensíveis: sanitize antes de compartilhar e mapeie só redes autorizadas.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>No Módulo 2, a aula “Por que o Modelo OSI existe” organiza em camadas tudo o que você mapeou aqui. Em vez de dizer “a rede caiu”, você vai perguntar em qual camada está o problema: física, enlace, rede, transporte, sessão, apresentação ou aplicação.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física",
      "Camada 2 - Enlace",
      "Camada 3 - Rede",
      "Camada 4 - Transporte",
      "Camada 7 - Aplicação"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "Wi-Fi",
      "ARP",
      "ICMP",
      "DNS",
      "DHCP",
      "HTTP",
      "TCP",
      "UDP"
    ],
    "dependsOn": [
      "bits e sinais",
      "protocolos",
      "métricas",
      "equipamentos de rede",
      "diagnóstico inicial"
    ],
    "enables": [
      "Modelo OSI",
      "troubleshooting estruturado",
      "segmentação",
      "segurança de redes",
      "cloud networking"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Mapa não fecha com a realidade observada.",
      "Dispositivo aparece sem função clara.",
      "Gateway ou DNS diferem do esperado.",
      "Métricas variam muito entre testes.",
      "Usuários relatam sintomas que não aparecem no teste rápido."
    ],
    "diagnosticQuestions": [
      "Qual foi a fonte da evidência?",
      "Quando o dado foi coletado?",
      "O teste foi feito no host afetado?",
      "Existe diferença entre Wi-Fi e cabo?",
      "O nome DNS resolve para o IP esperado?",
      "O caminho passa por firewall, proxy, VPN ou NAT?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\narp -a\ntracert 8.8.8.8\nnslookup exemplo.com",
        "purpose": "Coletar configuração, vizinhança local, caminho e DNS.",
        "expectedObservation": "IP, gateway, DNS, entradas ARP, saltos e resolução de nome.",
        "interpretation": "Compare com o mapa esperado: gateway ou DNS diferente, gateway ausente do ARP ou nome que não resolve apontam a etapa a investigar. É evidência inicial, não conclusão."
      },
      {
        "platform": "Linux",
        "command": "ip addr; ip route; ip neigh; tracepath 8.8.8.8; nslookup exemplo.com",
        "purpose": "Coletar informações equivalentes no Linux.",
        "expectedObservation": "Interface ativa, rota default, vizinhos locais, caminho e DNS.",
        "interpretation": "default via indica o gateway; compare interface, rota, vizinhos e DNS com o mapa esperado."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow mac address-table\nshow arp\nshow cdp neighbors\nshow ip route",
        "purpose": "Coletar evidências de interfaces, MACs, ARP, vizinhos e rotas em equipamento autorizado.",
        "expectedObservation": "Interfaces up/up, tabelas coerentes e vizinhos conhecidos.",
        "interpretation": "Interface down, MAC inesperado ou vizinho CDP desconhecido indicam divergência entre mapa e realidade. Rode apenas em equipamento sob sua autorização."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não tem IP válido",
        "then": "Investigar DHCP, interface, cabo, Wi-Fi ou VLAN."
      },
      {
        "if": "Host tem IP, mas não pinga gateway",
        "then": "Investigar meio, VLAN, switch/AP, gateway ou firewall local."
      },
      {
        "if": "Gateway responde, mas DNS falha",
        "then": "Investigar servidor DNS, configuração DHCP, filtro ou resolução privada."
      },
      {
        "if": "DNS resolve, mas serviço não abre",
        "then": "Investigar rota, firewall, porta, proxy, TLS, autenticação ou aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Sanitizar evidências antes de compartilhar.",
      "Registrar data, origem e limitação do mapa.",
      "Documentar ativos desconhecidos como pendência de segurança.",
      "Guardar mapas internos em repositório ou ferramenta com controle de acesso."
    ],
    "badPractices": [
      "Publicar mapa interno em canal aberto.",
      "Fazer varredura sem autorização para completar o inventário.",
      "Assumir que NAT substitui firewall."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Confundir roteador doméstico com todos os papéis de rede.",
      "Achar que ausência de resposta ICMP prova que o destino caiu.",
      "Esquecer que cloud também tem rede lógica."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição de documentação sensível",
        "description": "Mapas revelam IPs, nomes, caminhos, firewalls e serviços.",
        "defensiveExplanation": "Um atacante com mapa interno economiza tempo de reconhecimento.",
        "mitigation": "Classificar, restringir acesso, sanitizar e versionar documentos."
      },
      {
        "name": "Ativos desconhecidos",
        "description": "Dispositivos sem dono ou função clara aparecem na rede.",
        "defensiveExplanation": "Podem ser equipamentos esquecidos, rogue devices ou sistemas fora de gestão.",
        "mitigation": "Inventário, NAC, revisão de DHCP, logs e processo de ownership."
      }
    ],
    "monitoring": [
      "Mudanças de gateway ou DNS entregues por DHCP.",
      "Novos dispositivos em tabelas ARP/DHCP.",
      "Aumento de perda ou latência por segmento.",
      "Conexões entre redes que deveriam ser isoladas."
    ],
    "hardening": [
      "Controle físico de racks e patch panels.",
      "Segmentação inicial.",
      "Wi-Fi visitante isolado da rede interna.",
      "Logs de DHCP, DNS e firewall."
    ],
    "detectionIdeas": [
      "Comparar inventário esperado com dispositivos observados.",
      "Revisar leases DHCP.",
      "Procurar APs não autorizados.",
      "Correlacionar queixas de usuários com métricas."
    ]
  },
  "lab": {
    "id": "lab-1.10",
    "title": "Mini-projeto: mapear sua rede com evidências",
    "labType": "security",
    "objective": "Criar um mapa físico e lógico inicial de uma rede pequena, registrando dispositivos, serviços, meios, métricas, evidências e riscos sem expor dados sensíveis.",
    "scenario": "Você irá mapear uma rede autorizada, como sua rede doméstica ou um laboratório controlado. O objetivo não é invadir, varrer ou descobrir tudo à força, mas documentar o que é seu e o que pode ser observado com comandos básicos.",
    "topology": "Host do aluno -> acesso cabeado ou Wi-Fi -> switch/AP/roteador -> gateway/firewall -> DNS/internet/serviços locais.",
    "architecture": "Mapa dividido em visão física, visão lógica, inventário, métricas, evidências, riscos e próximos passos.",
    "prerequisites": [
      "Ter concluído as aulas 1.1 a 1.9.",
      "Usar apenas rede própria, laboratório ou ambiente explicitamente autorizado.",
      "Ter terminal Windows PowerShell, Linux ou equivalente."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Editor de texto",
      "Planilha opcional",
      "Ferramenta de desenho opcional",
      "Cisco Packet Tracer opcional"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varreduras agressivas em redes de terceiros.",
      "Não compartilhe prints com IPs públicos, nomes internos ou MACs sem sanitizar.",
      "Não altere configurações de roteadores, switches ou firewalls sem autorização."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir escopo",
        "instruction": "Escolha uma rede autorizada e defina o que será mapeado.",
        "command": "Escopo sugerido: meu notebook, gateway, DNS, Wi-Fi/cabo, serviços locais conhecidos e internet.",
        "expectedOutput": "Escopo escrito em uma frase.",
        "explanation": "Escopo evita coleta excessiva e mantém o laboratório ético."
      },
      {
        "number": 2,
        "title": "Coletar configuração local",
        "instruction": "Registre IP, máscara, gateway, DNS e interface, com data e hora da coleta.",
        "command": "Windows: ipconfig /all\nLinux: ip addr; ip route",
        "expectedOutput": "Configuração local da interface ativa.",
        "explanation": "Essa é a base do mapa lógico."
      },
      {
        "number": 3,
        "title": "Identificar vizinhança local",
        "instruction": "Observe ARP ou tabela de vizinhos.",
        "command": "Windows: arp -a\nLinux: ip neigh",
        "expectedOutput": "Entradas locais, principalmente gateway.",
        "explanation": "Mostra relações locais recentes entre IP e MAC."
      },
      {
        "number": 4,
        "title": "Testar alcance básico",
        "instruction": "Teste gateway, DNS conhecido e um destino autorizado.",
        "command": "ping <gateway>\nping 8.8.8.8",
        "expectedOutput": "Respostas ou falhas documentadas, com latência média e perda.",
        "explanation": "Ajuda a separar falha local de falha externa, lembrando que ICMP pode ser bloqueado."
      },
      {
        "number": 5,
        "title": "Verificar caminho",
        "instruction": "Execute tracert ou tracepath para um destino externo autorizado.",
        "command": "Windows: tracert 8.8.8.8\nLinux: tracepath 8.8.8.8",
        "expectedOutput": "Saltos visíveis ou pontos sem resposta.",
        "explanation": "Caminho visível não é caminho completo, mas ajuda a documentar hipóteses."
      },
      {
        "number": 6,
        "title": "Verificar DNS",
        "instruction": "Teste resolução de um nome comum e, se existir, de um serviço local autorizado.",
        "command": "nslookup exemplo.com",
        "expectedOutput": "Nome resolvido para endereço IP.",
        "explanation": "Se IP funciona e DNS falha, a hipótese muda."
      },
      {
        "number": 7,
        "title": "Desenhar visão física",
        "instruction": "Descreva meio usado, roteador/AP, switch se houver, cabos e local físico aproximado.",
        "analysisTask": "Liste cada equipamento com o meio (cabo ou Wi-Fi) e o local aproximado, e classifique cada item como dispositivo final, intermediário ou serviço.",
        "expectedOutput": "Mapa físico simples.",
        "explanation": "A visão física ajuda a diagnosticar cabo, Wi-Fi, distância e energia."
      },
      {
        "number": 8,
        "title": "Desenhar visão lógica",
        "instruction": "Descreva host, rede, gateway, DNS, serviços e caminho provável.",
        "command": "Use as evidências dos passos anteriores.",
        "expectedOutput": "Mapa lógico simples.",
        "explanation": "A visão lógica prepara o raciocínio por camadas."
      },
      {
        "number": 9,
        "title": "Registrar riscos e lacunas",
        "instruction": "Liste riscos iniciais e lacunas (o que você ainda não confirmou), separando fato de hipótese.",
        "command": "Exemplos: Wi-Fi fraco, DNS desconhecido, ativo sem dono, falta de documentação.",
        "expectedOutput": "Tabela com risco, evidência, impacto e próxima ação.",
        "explanation": "Documentação madura inclui limites e pendências."
      },
      {
        "number": 10,
        "title": "Sanitizar relatório",
        "instruction": "Remova ou masque dados sensíveis antes de compartilhar.",
        "command": "Exemplo: 192.168.1.23 -> 192.168.x.23; nome interno -> host-A",
        "expectedOutput": "Relatório compartilhável.",
        "explanation": "Mapas de rede são documentos sensíveis."
      }
    ],
    "expectedResult": "Um relatório curto com escopo, inventário, mapa físico, mapa lógico, comandos executados, evidências, métricas básicas, riscos, limitações e próximos passos.",
    "validation": [
      {
        "check": "O relatório tem escopo definido",
        "command": "Revisar seção de escopo",
        "expected": "Escopo explícito e autorizado",
        "ifFails": "Defina a rede e os limites antes de continuar."
      },
      {
        "check": "Há evidências de configuração local",
        "command": "ipconfig /all ou ip addr/ip route",
        "expected": "IP, gateway e DNS registrados, com data da coleta",
        "ifFails": "Repita a coleta no host correto."
      },
      {
        "check": "Há mapa físico e lógico separados",
        "command": "Revisar relatório",
        "expected": "Duas visões distintas",
        "ifFails": "Separe cabos/equipamentos físicos de IPs/serviços/caminhos."
      },
      {
        "check": "Há riscos e lacunas",
        "command": "Revisar tabela final",
        "expected": "Pelo menos três riscos ou lacunas",
        "ifFails": "Releia as evidências e procure pontos de exposição ou incerteza."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não sei identificar o gateway",
        "probableCause": "Comando não foi interpretado corretamente",
        "howToConfirm": "Procure Default Gateway no Windows ou default via no Linux",
        "fix": "Revise a aula 1.9."
      },
      {
        "symptom": "tracert mostra asteriscos",
        "probableCause": "Saltos não respondem ICMP ou filtram mensagens",
        "howToConfirm": "Compare com ping e nslookup",
        "fix": "Registre como limitação, não como prova de queda."
      },
      {
        "symptom": "Não sei se um dispositivo é switch, roteador ou AP",
        "probableCause": "Equipamentos domésticos acumulam papéis",
        "howToConfirm": "Observe função: comuta portas, cria Wi-Fi, faz gateway, aplica NAT/firewall",
        "fix": "Classifique por papel, não apenas pelo nome comercial."
      }
    ],
    "improvements": [
      "Criar versão visual em SVG ou ferramenta de diagrama.",
      "Criar tabela de ownership dos dispositivos.",
      "Adicionar evidências de DHCP, DNS e firewall quando autorizado.",
      "Comparar rede cabeada e Wi-Fi."
    ],
    "evidenceToCollect": [
      "Escopo do laboratório",
      "Configuração local sanitizada",
      "Tabela ARP/vizinhos sanitizada",
      "Resultado de ping/tracert/nslookup",
      "Mapa físico",
      "Mapa lógico",
      "Tabela de riscos e lacunas"
    ],
    "questions": [
      "Qual evidência prova o gateway usado?",
      "Que parte do seu mapa é hipótese, e não fato?",
      "Que dado você não deve compartilhar publicamente?",
      "Que risco merece ação primeiro, e por quê?"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um mapa de rede sem evidências pode ser enganoso?",
      "hints": [
        "Pense em documentação desatualizada.",
        "Pense na diferença entre desenho e comportamento real."
      ],
      "expectedIdeas": [
        "evidência",
        "data de coleta",
        "limitações",
        "validação"
      ],
      "explanation": "Um mapa útil precisa indicar como as informações foram obtidas e quando foram coletadas."
    },
    {
      "type": "diagnóstico",
      "question": "Seu mapa mostra gateway correto, DNS correto e ping para IP externo funcionando, mas sites por nome falham. Qual hipótese ganha força?",
      "hints": [
        "IP funciona?",
        "Nome falha?"
      ],
      "expectedIdeas": [
        "DNS",
        "resolução de nomes",
        "proxy",
        "filtro"
      ],
      "explanation": "Se conectividade por IP funciona, mas nomes falham, DNS ou política associada ao nome deve ser investigada."
    },
    {
      "type": "cenário real",
      "question": "Você encontrou um dispositivo sem dono na rede. O que fazer de forma segura e profissional?",
      "hints": [
        "Não ataque o dispositivo.",
        "Pense em inventário e autorização."
      ],
      "expectedIdeas": [
        "registrar evidência",
        "acionar responsável",
        "verificar DHCP/logs",
        "NAC",
        "não varrer sem permissão"
      ],
      "explanation": "Ativos desconhecidos são risco, mas a resposta deve seguir processo autorizado."
    }
  ],
  "quiz": [
    {
      "id": "q1.10.1",
      "question": "Qual é a melhor definição de mapa de rede no contexto deste módulo?",
      "options": [
        "Um desenho decorativo da internet",
        "Um documento com visão física, lógica, serviços, evidências, métricas e riscos",
        "Uma lista de senhas de roteadores",
        "Um comando que descobre tudo automaticamente"
      ],
      "answer": 1,
      "explanation": "Mapa útil combina várias visões e evidências, não apenas desenho.",
      "topic": "mapeamento",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.10.2",
      "question": "Qual item pertence mais claramente à visão física?",
      "options": [
        "DNS primário",
        "Cabo entre tomada e switch",
        "Regra de firewall",
        "Nome FQDN de aplicação"
      ],
      "answer": 1,
      "explanation": "Cabos, portas, rack, patch panel e APs fazem parte da visão física.",
      "topic": "topologia",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.10.7",
      "question": "No seu mapa, o host tem IP válido, mas o ping para o gateway falha. Onde a investigação deve começar?",
      "options": [
        "No servidor DNS configurado",
        "No provedor de internet",
        "Na aplicação que o usuário tentou abrir",
        "No meio, VLAN, switch/AP, gateway ou firewall local"
      ],
      "answer": 3,
      "explanation": "Sem alcançar o gateway, o problema está antes dele. DNS, provedor e aplicação só entram depois que o gateway responde.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q1.10.4",
      "question": "Por que mapas de rede devem ser protegidos?",
      "options": [
        "Porque sempre consomem muita CPU",
        "Porque podem revelar IPs, caminhos, nomes internos e controles",
        "Porque impedem DHCP",
        "Porque substituem firewall"
      ],
      "answer": 1,
      "explanation": "Mapas internos ajudam defesa, mas também podem ajudar reconhecimento ofensivo se vazarem.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q1.10.5",
      "question": "Um tracert mostra asteriscos em alguns saltos. Qual interpretação é mais correta?",
      "options": [
        "A internet inteira caiu",
        "Asteriscos sempre indicam invasão",
        "Alguns dispositivos podem não responder ICMP ou filtrar respostas",
        "O DNS está sempre incorreto"
      ],
      "answer": 2,
      "explanation": "Ausência de resposta em um salto não prova queda; pode ser política de resposta ICMP.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q1.10.8",
      "question": "Você rodou arp -a no notebook e o servidor de arquivos, que fica em outra rede, não aparece na lista. O que registrar no mapa?",
      "options": [
        "Uma lacuna: ARP só mostra a vizinhança local recente",
        "Que o servidor de arquivos está desligado",
        "Que o switch bloqueou o servidor",
        "Que a tabela ARP está corrompida"
      ],
      "answer": 0,
      "explanation": "Para falar com um servidor de outra rede, o host usa o gateway; por isso o servidor nunca aparece no ARP local, e a ausência não prova nada sobre ele.",
      "topic": "evidências",
      "difficulty": "intermediário",
      "type": "cenário"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.10.1",
      "front": "O que é mapa físico?",
      "back": "Representação de cabos, portas, racks, APs, switches, localização e meios de transmissão.",
      "tags": [
        "topologia"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.10.2",
      "front": "O que é mapa lógico?",
      "back": "Representação de IPs, redes, gateways, DNS, serviços, políticas e caminhos prováveis.",
      "tags": [
        "topologia"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.10.3",
      "front": "Por que registrar data da evidência?",
      "back": "Porque redes mudam; sem data, a evidência pode estar obsoleta.",
      "tags": [
        "documentação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.10.7",
      "front": "Como sanitizar 192.168.1.23 e servidor-financeiro.empresa.local antes de compartilhar?",
      "back": "Mascare: 192.168.x.23 e servidor-A (ou host-A). Faça o mesmo com MACs, domínios e nomes de usuário.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.10.5",
      "front": "Qual comando mostra gateway e DNS no Windows?",
      "back": "ipconfig /all.",
      "tags": [
        "comandos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.10.8",
      "front": "No mapa, qual a diferença entre fato, hipótese e lacuna?",
      "back": "Fato: confirmado por evidência com data e origem. Hipótese: deduzido, como o caminho provável. Lacuna: o que ainda não foi confirmado.",
      "tags": [
        "documentação"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.10.5",
      "type": "classificação",
      "prompt": "Classifique cada item como dispositivo final, intermediário, serviço ou meio, e diga se ele entra na visão física, na lógica ou nas duas: notebook, AP, roteador doméstico, servidor DNS, impressora, cabo do notebook até o switch.",
      "expectedAnswer": "Notebook e impressora: finais, físicos e lógicos (têm IP). AP: intermediário, físico. Roteador doméstico: intermediário que acumula gateway, AP e NAT, físico e lógico. Servidor DNS: serviço, lógico. Cabo: meio, só físico.",
      "explanation": "Classifique por papel, não pelo nome comercial: o mesmo aparelho doméstico pode ser roteador, AP e switch ao mesmo tempo."
    },
    {
      "id": "ex1.10.2",
      "type": "prático",
      "prompt": "Liste cinco evidências que você coletaria antes de dizer que uma rede está com problema.",
      "expectedAnswer": "IP/máscara/gateway/DNS, ping para gateway, ARP do gateway, traceroute/tracert, nslookup, métricas de latência/perda.",
      "explanation": "A resposta deve mostrar coleta ordenada."
    },
    {
      "id": "ex1.10.3",
      "type": "segurança",
      "prompt": "Cite três informações que devem ser sanitizadas antes de compartilhar um mapa de rede.",
      "expectedAnswer": "IPs públicos ou internos sensíveis, nomes de host/domínio, MACs, nomes de usuários, nomes de sistemas, caminhos internos.",
      "explanation": "Mapas podem revelar superfície de ataque."
    },
    {
      "id": "ex1.10.4",
      "type": "arquitetura",
      "prompt": "Uma empresa tem Wi-Fi visitante e rede administrativa no mesmo segmento. Qual risco e qual melhoria inicial?",
      "expectedAnswer": "Risco de acesso indevido e movimento lateral. Melhoria: segmentar SSIDs em VLANs/redes diferentes e aplicar firewall/políticas.",
      "explanation": "O mini-projeto deve transformar observação em recomendação inicial."
    }
  ],
  "challenge": {
    "title": "Transforme o relatório do laboratório em documentação técnica",
    "scenario": "Antes de uma melhoria de segurança, o gestor de uma rede pequena quer um documento claro, sem excesso, útil para suporte, redes e segurança. Parta do relatório do laboratório (ou de outra rede autorizada) e transforme-o nesse documento.",
    "tasks": [
      "Revisar escopo e inventário mínimo, classificando dispositivos finais, intermediários e serviços",
      "Apresentar mapa físico e mapa lógico separados",
      "Marcar cada afirmação como fato (com evidência e data), hipótese ou lacuna",
      "Listar métricas observadas",
      "Priorizar os riscos e propor próximos passos",
      "Sanitizar tudo antes de entregar"
    ],
    "constraints": [
      "Não usar rede sem autorização",
      "Não expor dados sensíveis",
      "Não executar varredura agressiva",
      "Separar fato, hipótese e recomendação"
    ],
    "expectedDeliverables": [
      "Relatório de 1 a 3 páginas",
      "Tabela de inventário",
      "Mapa físico/lógico",
      "Tabela de riscos",
      "Checklist de prontidão para o Módulo 2"
    ],
    "gradingRubric": [
      {
        "criterion": "Escopo e ética",
        "points": 20,
        "description": "Define ambiente autorizado e limites de coleta."
      },
      {
        "criterion": "Qualidade do mapa",
        "points": 25,
        "description": "Separa físico, lógico, serviços e caminhos."
      },
      {
        "criterion": "Evidências",
        "points": 25,
        "description": "Inclui comandos, observações, data e limitações."
      },
      {
        "criterion": "Segurança",
        "points": 20,
        "description": "Sanitiza informações e identifica riscos relevantes."
      },
      {
        "criterion": "Clareza",
        "points": 10,
        "description": "Documento é compreensível para outro técnico."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa pelo escopo, porque sem escopo não há limite ético. Depois separa o que é observado fisicamente do que é inferido logicamente. Em seguida, adiciona evidências de comandos básicos e só então lista riscos e recomendações.",
    "steps": [
      "Definir rede autorizada.",
      "Coletar configuração local.",
      "Registrar gateway, DNS e vizinhos locais.",
      "Desenhar meios e equipamentos visíveis.",
      "Desenhar caminho lógico provável.",
      "Adicionar métricas e sintomas.",
      "Listar riscos, lacunas e próximos passos.",
      "Sanitizar antes de compartilhar."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Fazer apenas um desenho do roteador e dos computadores.",
        "whyItIsWrong": "Não inclui evidências, serviços, riscos nem visão lógica."
      },
      {
        "answer": "Executar varredura em toda a rede da empresa sem autorização.",
        "whyItIsWrong": "Viola limite ético e pode causar incidente operacional."
      },
      {
        "answer": "Publicar prints completos em grupo aberto.",
        "whyItIsWrong": "Pode vazar IPs, nomes internos e detalhes de segurança."
      }
    ],
    "finalAnswer": "Um bom relatório de Módulo 1 permite que outro técnico entenda a rede básica, saiba quais evidências foram coletadas, reconheça as limitações e veja quais riscos tratar primeiro. Ele não promete ter descoberto tudo: o que não foi confirmado aparece como lacuna, e nada sensível fica exposto."
  },
  "glossary": [
    {
      "term": "Mapa de rede",
      "shortDefinition": "Documento que representa componentes, caminhos, serviços, evidências e riscos de uma rede.",
      "longDefinition": "Pode combinar visão física, lógica, operacional e de segurança para apoiar diagnóstico e evolução.",
      "example": "Mapa de uma filial com switches, APs, gateway, DNS, impressoras e riscos.",
      "relatedTerms": [
        "topologia",
        "inventário",
        "evidência"
      ],
      "relatedLessons": [
        "1.4",
        "1.9",
        "2.1"
      ]
    },
    {
      "term": "Inventário",
      "shortDefinition": "Lista organizada de ativos, serviços e informações relevantes.",
      "longDefinition": "Inclui nome, função, tipo, localização, endereço, dono e observações quando possível.",
      "example": "Tabela com notebook, roteador, AP, impressora e servidor.",
      "relatedTerms": [
        "ativo",
        "CMDB"
      ],
      "relatedLessons": [
        "1.2",
        "1.7"
      ]
    },
    {
      "term": "Evidência",
      "shortDefinition": "Dado coletado que sustenta uma conclusão técnica.",
      "longDefinition": "Pode ser saída de comando, log, métrica, print sanitizado ou configuração exportada.",
      "example": "ipconfig mostrando gateway e DNS.",
      "relatedTerms": [
        "troubleshooting",
        "diagnóstico"
      ],
      "relatedLessons": [
        "1.8",
        "1.9"
      ]
    },
    {
      "term": "Lacuna",
      "shortDefinition": "Informação que ainda não foi confirmada.",
      "longDefinition": "Registrar lacunas evita tratar hipótese como fato.",
      "example": "Não foi possível confirmar se há firewall entre duas redes.",
      "relatedTerms": [
        "hipótese",
        "limitação"
      ],
      "relatedLessons": [
        "1.10"
      ]
    },
    {
      "term": "Sanitização",
      "shortDefinition": "Remoção ou mascaramento de dados sensíveis antes de compartilhar evidências.",
      "longDefinition": "Protege IPs, nomes internos, domínios, MACs, usuários e detalhes de infraestrutura.",
      "example": "Trocar servidor-financeiro.empresa.local por servidor-A.",
      "relatedTerms": [
        "segurança",
        "documentação"
      ],
      "relatedLessons": [
        "1.9",
        "1.10"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base de bits, sinais, métricas, protocolos e pensamento em camadas."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Fundamentos de redes usados no mini-projeto."
    },
    {
      "type": "standard",
      "title": "ISO/IEC 7498-1 — Basic Reference Model",
      "organization": "ISO/IEC",
      "url": "",
      "note": "Referência conceitual para o próximo módulo sobre OSI."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "fundamentos de infraestrutura",
      "reason": "Mapas de rede evoluem para documentação de infraestrutura e automação."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "fundamentos de identidade",
      "reason": "Serviços e acessos dependem de rede, DNS, caminhos e políticas bem documentadas."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "anyOf": [
        "quizScoreAtLeast",
        "checklistDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "2.1"
    ]
  }
};
