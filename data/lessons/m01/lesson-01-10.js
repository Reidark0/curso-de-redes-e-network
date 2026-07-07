export const lesson0110 = {
  "id": "1.10",
  "moduleId": "m01",
  "order": 10,
  "title": "Revisão e mini-projeto: mapear sua rede",
  "subtitle": "Consolide os fundamentos do Módulo 1 criando um mapa físico e lógico com inventário, evidências, métricas, riscos e próximos passos.",
  "duration": "70-105 min",
  "estimatedStudyTimeMinutes": 105,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Depois de aprender o que é uma rede, quais dispositivos participam dela, quais tipos de rede existem, como topologias físicas e lógicas diferem, quais meios carregam os sinais, como o cabeamento estruturado organiza o ambiente, quais equipamentos tomam decisões e quais métricas descrevem qualidade, chega a hora de transformar tudo isso em um artefato prático: um mapa inicial da sua rede.</p>\n  <p>Mapear uma rede não é desenhar caixinhas bonitas. É criar uma visão técnica que ajude alguém a entender onde estão os dispositivos finais, quais equipamentos intermediários existem, quais serviços são usados, quais caminhos são prováveis, quais evidências foram coletadas e quais riscos aparecem. Em suporte, redes, SOC, cloud e DevSecOps, um mapa bem feito reduz tempo de diagnóstico, melhora comunicação entre times e evita decisões baseadas em chute.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma empresa pequena tem internet instável, Wi-Fi ruim, impressoras inacessíveis, servidores internos sem documentação e nenhum inventário confiável. Antes de trocar firewall, contratar link novo ou culpar o provedor, o primeiro trabalho profissional é mapear o ambiente e separar evidência de opinião.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>As primeiras redes eram pequenas o suficiente para que seus operadores soubessem de cabeça onde cada equipamento estava. Com a expansão das LANs, redes de campus, WANs, datacenters e cloud, essa memória informal deixou de funcionar. Surgiram diagramas físicos, diagramas lógicos, inventários de ativos, etiquetas de portas, documentação de racks, mapas de VLANs, tabelas de endereçamento, CMDBs e ferramentas de descoberta.</p>\n  <p>Na prática, porém, muitas organizações ainda operam redes críticas com documentação incompleta, desatualizada ou puramente visual. O desenho mostra um firewall, mas não mostra regras. Mostra um switch, mas não mostra portas, VLANs ou enlaces. Mostra um servidor, mas não mostra serviços, DNS, dependências ou dono. A revisão deste módulo existe para corrigir essa visão: rede é um sistema composto por dispositivos, meios, serviços, políticas, métricas e evidências.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>Sem mapa, o diagnóstico começa no escuro. Um incidente pode parecer problema de aplicação quando é DNS. Pode parecer problema de internet quando é gateway. Pode parecer falha de servidor quando é VLAN, Wi-Fi, cabo, firewall ou rota. Sem inventário, também é difícil aplicar segurança: não se protege o que não se conhece.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Problema operacional:</strong> chamados demoram porque ninguém sabe o caminho real do tráfego.</li>\n    <li><strong>Problema de segurança:</strong> ativos desconhecidos, APs não autorizados, portas abertas e serviços expostos permanecem invisíveis.</li>\n    <li><strong>Problema financeiro:</strong> empresas compram banda, appliances ou licenças sem saber se o gargalo está em outro lugar.</li>\n    <li><strong>Problema de cloud:</strong> subnets, rotas, endpoints privados e security groups são criados sem relação clara com a rede corporativa.</li>\n    <li><strong>Problema de DevSecOps:</strong> pipelines falham ao acessar registries, APIs ou clusters porque dependências de rede não foram mapeadas.</li>\n  </ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>O mapeamento de redes evoluiu de desenhos manuais para documentação viva. Ainda é útil desenhar em papel, mas ambientes modernos exigem evidências: comandos, capturas autorizadas, inventário, logs, métricas e exportação de configurações.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funciona</th><th>Limitação</th><th>Uso moderno</th></tr></thead>\n    <tbody>\n      <tr><td>Desenho informal</td><td>Alguém desenha roteador, switch e hosts</td><td>Fica desatualizado rapidamente</td><td>Útil como rascunho inicial</td></tr>\n      <tr><td>Inventário manual</td><td>Lista dispositivos, IPs e funções</td><td>Depende de disciplina</td><td>Base para documentação pequena</td></tr>\n      <tr><td>Descoberta por ferramenta</td><td>Usa SNMP, logs ou agentes</td><td>Pode não ver tudo e exige permissão</td><td>Ambientes médios e grandes</td></tr>\n      <tr><td>Documentação como código</td><td>Rede declarada em IaC e versionada</td><td>Nem tudo nasce automatizado</td><td>Cloud, plataformas e DevSecOps</td></tr>\n      <tr><td>Observabilidade</td><td>Métricas, logs e traces validam comportamento</td><td>Exige maturidade operacional</td><td>SRE, SOC e operações modernas</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Mapear uma rede é representar, com evidências, os componentes que participam da comunicação, os meios que os conectam, os caminhos prováveis do tráfego, os serviços utilizados, as métricas observadas, os pontos de falha e os riscos relevantes.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> um mapa de rede é uma documentação técnica que combina visão física, visão lógica, inventário, papéis dos equipamentos, serviços, endereçamento inicial, métricas e riscos, permitindo diagnóstico, operação, segurança e evolução arquitetural.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Um mapa útil nasce de perguntas ordenadas. Primeiro, você identifica o host e sua configuração local. Depois, identifica o gateway, os equipamentos intermediários, os meios, os serviços, os caminhos e as métricas. Por fim, registra riscos e limitações.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Identificar o host:</strong> nome, sistema, interface, IP, máscara, gateway, DNS e tipo de conexão.</li>\n    <li><strong>Identificar a vizinhança:</strong> gateway, ARP/neighbor table, switch/AP quando conhecido e meio usado.</li>\n    <li><strong>Identificar serviços:</strong> DNS, DHCP, internet, impressora, servidor interno, aplicação ou API.</li>\n    <li><strong>Identificar caminho:</strong> saltos visíveis, roteador, firewall, proxy, VPN ou link WAN.</li>\n    <li><strong>Coletar métricas:</strong> latência, perda, jitter aproximado, throughput percebido e disponibilidade observada.</li>\n    <li><strong>Registrar riscos:</strong> Wi-Fi fraco, porta exposta, DNS suspeito, rede plana, documentação ausente ou caminho crítico sem redundância.</li>\n  </ol>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>A arquitetura do mini-projeto do Módulo 1 deve separar quatro visões complementares:</p>\n  <ul>\n    <li><strong>Visão física:</strong> cabos, Wi-Fi, rack, patch panel, AP, switch, roteador, firewall e links.</li>\n    <li><strong>Visão lógica:</strong> IPs, gateway, DNS, serviços, redes envolvidas, caminho provável e políticas.</li>\n    <li><strong>Visão operacional:</strong> métricas, sintomas, comandos executados, resultados e evidências.</li>\n    <li><strong>Visão de segurança:</strong> riscos, exposição, ativos desconhecidos, portas, Wi-Fi, documentação e mitigação.</li>\n  </ul>\n  <p>Essas quatro visões preparam o aluno para o Módulo 2, onde o Modelo OSI será usado para organizar ainda melhor o raciocínio por camadas.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Mapear uma rede é parecido com mapear uma clínica, hospital ou empresa. Não basta saber que existe uma recepção. É preciso saber onde ficam as salas, quais corredores conectam os setores, quais portas são restritas, onde estão equipamentos críticos, quem depende de quem e quais caminhos são alternativos em caso de falha.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes mudam dinamicamente. DHCP altera endereços, Wi-Fi muda qualidade, rotas podem variar, firewalls aplicam políticas invisíveis e cloud abstrai componentes físicos. Por isso o mapa deve ser acompanhado de evidências e data de coleta.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, um mapa inicial pode registrar: notebook no Wi-Fi, celular no Wi-Fi, smart TV no Wi-Fi, roteador do provedor como gateway, DNS entregue por DHCP, impressora na rede local e internet via fibra. O mapa também pode anotar sintomas: Wi-Fi ruim no quarto, latência maior em jogos e perda de sinal quando a porta do cômodo fecha.</p>\n  <p>Mesmo simples, esse mapa já ajuda a evitar confusão. Se apenas o notebook falha, o problema pode estar no host. Se todos falham, pode ser gateway, link ou provedor. Se nomes não resolvem, DNS entra na investigação. Se só o quarto tem problema, o meio rádio e a posição do AP viram hipótese.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa pequena, o mini-projeto pode mapear usuários administrativos, equipe financeira, impressoras, Wi-Fi corporativo, Wi-Fi visitante, switch de acesso, firewall, link de internet, servidor de arquivos e DNS/DHCP. O documento deve indicar quais dispositivos são finais, quais são intermediários e quais serviços sustentam operação.</p>\n  <p>Do ponto de vista empresarial, o mapa ajuda em suporte, auditoria, inventário, renovação de equipamentos, segmentação futura, troubleshooting de indisponibilidade e planejamento de segurança. Ele também reduz dependência de uma única pessoa que “sabe onde tudo está”.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, o equivalente ao mapa inclui VPC ou VNet, subnets, route tables, security groups ou NSGs, NAT Gateway, load balancer, private endpoints, DNS privado, VPN, peering e firewall gerenciado. O aluno ainda não precisa dominar todos esses serviços agora, mas deve reconhecer que cloud também é rede.</p>\n  <p>A diferença é que muitos elementos não aparecem como cabos ou portas físicas. Eles aparecem como objetos lógicos. Por isso, o hábito de separar visão física, lógica, operacional e segurança será essencial nos módulos de Cloud Networking.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, mapear rede evita pipelines frágeis. Um runner precisa acessar repositório, registry, scanner, cluster Kubernetes, vault, banco de dados de teste, proxy corporativo e APIs externas. Se essas dependências não estão mapeadas, cada falha vira surpresa.</p>\n  <p>O mapa pode virar documentação versionada junto ao repositório: quais endpoints são necessários, quais portas são usadas, quais redes são permitidas, quais identidades são utilizadas e quais evidências devem ser coletadas quando o pipeline falha.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Para segurança, o mapa inicial revela superfície de ataque. Ele mostra portas físicas expostas, Wi-Fi visitante mal separado, dispositivos desconhecidos, serviços sem dono, DNS suspeito, caminho sem firewall, ausência de logs ou dependência crítica sem redundância.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece no mapa</th><th>Impacto</th><th>Mitigação inicial</th></tr></thead>\n    <tbody>\n      <tr><td>Rede plana</td><td>Todos os dispositivos no mesmo segmento</td><td>Movimento lateral facilitado</td><td>Planejar segmentação e políticas</td></tr>\n      <tr><td>Ativo desconhecido</td><td>Dispositivo sem dono ou função</td><td>Risco de comprometimento invisível</td><td>Inventário, NAC e validação</td></tr>\n      <tr><td>Wi-Fi visitante mal isolado</td><td>Visitantes acessam recursos internos</td><td>Exposição indevida</td><td>SSID separado, VLAN e firewall</td></tr>\n      <tr><td>Evidência vazada</td><td>Mapa com IPs e nomes internos compartilhado sem controle</td><td>Vazamento de informação</td><td>Sanitização e classificação documental</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 470\" role=\"img\" aria-labelledby=\"m01l10-title m01l10-desc\">\n    <title id=\"m01l10-title\">Mini-projeto de mapeamento de rede</title>\n    <desc id=\"m01l10-desc\">Diagrama mostrando host do aluno, rede local, gateway, serviços, internet ou cloud, evidências e riscos.</desc>\n    <defs>\n      <marker id=\"m01l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"112\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Seu host</text>\n    <text x=\"112\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP, DNS, gateway</text>\n    <rect x=\"250\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"322\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Acesso</text>\n    <text x=\"322\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">switch/AP/meio</text>\n    <rect x=\"460\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"532\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n    <text x=\"532\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota padrão</text>\n    <rect x=\"670\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"742\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Política</text>\n    <text x=\"742\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">firewall/proxy</text>\n    <rect x=\"835\" y=\"70\" width=\"110\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"890\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Serviços</text>\n    <text x=\"890\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNS/web/cloud</text>\n    <line x1=\"185\" y1=\"108\" x2=\"250\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"395\" y1=\"108\" x2=\"460\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"605\" y1=\"108\" x2=\"670\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"815\" y1=\"108\" x2=\"835\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <rect x=\"90\" y=\"230\" width=\"220\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"200\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n    <text x=\"200\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ipconfig, ping, arp</text>\n    <text x=\"200\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tracert, nslookup</text>\n    <rect x=\"380\" y=\"230\" width=\"220\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"490\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Mapa</text>\n    <text x=\"490\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">físico + lógico</text>\n    <text x=\"490\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">serviços + métricas</text>\n    <rect x=\"670\" y=\"230\" width=\"220\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--attacker\"></rect>\n    <text x=\"780\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Riscos</text>\n    <text x=\"780\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rede plana, Wi-Fi</text>\n    <text x=\"780\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ativo desconhecido</text>\n    <line x1=\"310\" y1=\"282\" x2=\"380\" y2=\"282\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"600\" y1=\"282\" x2=\"670\" y2=\"282\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <text x=\"490\" y=\"405\" text-anchor=\"middle\" class=\"svg-label\">Mini-projeto: desenhar, evidenciar, interpretar, apontar riscos e preparar o Modelo OSI.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>O laboratório desta aula é o mini-projeto final do Módulo 1: mapear sua rede de forma segura, criando um relatório com inventário, topologia física, topologia lógica, serviços, métricas, evidências, riscos e próximos passos.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios reforçam a diferença entre mapa físico, mapa lógico, inventário, evidência e risco.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>O desafio é transformar o mapa da sua rede em um artefato apresentável para um time técnico, com linguagem clara e sem expor dados sensíveis.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra como organizar o raciocínio, o que deve aparecer no relatório e como evitar conclusões exageradas a partir de evidências limitadas.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li>Uma rede deve ser vista como sistema de comunicação, operação e segurança.</li>\n    <li>Mapas úteis combinam visão física, visão lógica, serviços, métricas, evidências e riscos.</li>\n    <li>Comandos simples geram evidências, mas não substituem interpretação.</li>\n    <li>Documentação sem data, fonte e limitação pode ser tão perigosa quanto ausência de documentação.</li>\n    <li>O Módulo 1 prepara a base prática para o Modelo OSI no Módulo 2.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>No próximo módulo, você estudará o <strong>Modelo OSI</strong>. Agora que você já sabe identificar dispositivos, meios, topologias, equipamentos, métricas e comandos iniciais, o Modelo OSI vai organizar esse conhecimento em camadas. Em vez de dizer apenas “a rede caiu”, você começará a perguntar: o problema está na camada física, enlace, rede, transporte, sessão, apresentação ou aplicação?</p>\n</section>"
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
  "deepDive": {
    "mentalModel": "Um mapa de rede é uma hipótese documentada e evidenciada sobre como a comunicação acontece. Ele deve mostrar o que se sabe, como se sabe e quais limites ainda existem.",
    "keyTerms": [
      "mapa físico",
      "mapa lógico",
      "inventário",
      "evidência",
      "risco",
      "dependência",
      "ponto de falha"
    ],
    "limitations": [
      "Comandos locais não mostram todas as políticas de firewall.",
      "tracert pode omitir saltos que não respondem ICMP.",
      "ARP só mostra vizinhança local recente.",
      "Mapas ficam obsoletos se não forem atualizados."
    ],
    "whenToUse": [
      "Ao iniciar suporte em uma rede desconhecida.",
      "Antes de redesenhar uma infraestrutura.",
      "Antes de propor segmentação ou firewall.",
      "Após incidentes para entender exposição e dependências.",
      "Antes de migrar serviços para cloud."
    ],
    "whenNotToUse": [
      "Não use mapeamento como varredura não autorizada.",
      "Não compartilhe mapas internos sem sanitização.",
      "Não trate o mapa como verdade absoluta sem data e evidências."
    ],
    "operationalImpact": [
      "Reduz tempo de diagnóstico.",
      "Melhora comunicação entre suporte, redes, segurança e aplicação.",
      "Exige atualização periódica.",
      "Ajuda a criar runbooks e checklists."
    ],
    "financialImpact": [
      "Evita compras desnecessárias de banda ou equipamentos.",
      "Pode revelar necessidade real de switches, APs, cabeamento ou links redundantes.",
      "Reduz custo de incidentes repetidos."
    ],
    "securityImpact": [
      "Revela ativos desconhecidos e pontos de exposição.",
      "Ajuda a priorizar segmentação e controles.",
      "Pode vazar informação sensível se compartilhado sem cuidado."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Fazer apenas um desenho bonito sem evidências.",
      "whyItHappens": "Ferramentas de diagrama dão sensação de documentação completa.",
      "consequence": "O mapa não ajuda no troubleshooting real.",
      "correction": "Anexar comandos, data, fonte e limitações."
    },
    {
      "mistake": "Misturar topologia física e lógica sem distinguir.",
      "whyItHappens": "Ambas falam de caminhos e conexões.",
      "consequence": "O aluno acha que o cabo físico determina sozinho o caminho do tráfego.",
      "correction": "Criar seções separadas para físico e lógico."
    },
    {
      "mistake": "Compartilhar IPs, nomes internos e prints sem sanitização.",
      "whyItHappens": "O foco fica só na resolução do problema.",
      "consequence": "Vazamento de informações úteis para atacantes.",
      "correction": "Mascarar dados sensíveis antes de compartilhar."
    },
    {
      "mistake": "Concluir causa raiz com uma única evidência.",
      "whyItHappens": "O primeiro comando parece confirmar a hipótese favorita.",
      "consequence": "Correção errada ou incompleta.",
      "correction": "Cruzar evidências: configuração, alcance, DNS, caminho e métricas."
    }
  ],
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
        "command": "ipconfig /all && arp -a && tracert 8.8.8.8 && nslookup exemplo.com",
        "purpose": "Coletar configuração, vizinhança local, caminho e DNS.",
        "expectedObservation": "IP, gateway, DNS, entradas ARP, saltos e resolução de nome.",
        "interpretation": "Use como evidência inicial, não como conclusão absoluta."
      },
      {
        "platform": "Linux",
        "command": "ip addr; ip route; ip neigh; tracepath 8.8.8.8; nslookup exemplo.com",
        "purpose": "Coletar informações equivalentes no Linux.",
        "expectedObservation": "Interface ativa, rota default, vizinhos locais, caminho e DNS.",
        "interpretation": "Compare com a documentação esperada."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow mac address-table\nshow arp\nshow cdp neighbors\nshow ip route",
        "purpose": "Coletar evidências de interfaces, MACs, ARP, vizinhos e rotas em equipamento autorizado.",
        "expectedObservation": "Interfaces up/up, tabelas coerentes e vizinhos conhecidos.",
        "interpretation": "Use apenas em equipamentos sob autorização."
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
      "Separar Wi-Fi visitante da rede interna.",
      "Documentar ativos desconhecidos como pendência de segurança.",
      "Guardar mapas internos em repositório ou ferramenta com controle de acesso."
    ],
    "badPractices": [
      "Publicar mapa interno em canal aberto.",
      "Varredura sem autorização para completar inventário.",
      "Assumir que NAT substitui firewall.",
      "Ignorar dispositivos não identificados.",
      "Manter racks e patch panels sem controle físico."
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
      "Controle físico de racks.",
      "Segmentação inicial.",
      "Wi-Fi visitante isolado.",
      "Logs de DHCP, DNS e firewall.",
      "Documentação com controle de acesso."
    ],
    "detectionIdeas": [
      "Comparar inventário esperado com dispositivos observados.",
      "Revisar leases DHCP.",
      "Conferir DNS usado por estações.",
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
    "estimatedTimeMinutes": 105,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varreduras agressivas em redes de terceiros.",
      "Não compartilhe prints com IPs públicos, nomes internos ou MACs sem sanitizar.",
      "Não altere configurações de roteadores, switches ou firewalls sem autorização.",
      "Este laboratório é defensivo e documental."
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
        "instruction": "Registre IP, máscara, gateway, DNS e interface.",
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
        "expectedOutput": "Respostas ou falhas documentadas.",
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
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
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
        "instruction": "Liste riscos iniciais e o que você ainda não sabe.",
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
        "expected": "IP, gateway e DNS registrados",
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
      "Adicionar data de atualização ao mapa.",
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
      "Qual parte do mapa é física?",
      "Qual parte do mapa é lógica?",
      "Que dado você não deve compartilhar publicamente?",
      "Que risco merece ação primeiro?"
    ],
    "challenge": "Transforme seu relatório em uma página de documentação técnica para um time de suporte, redes ou segurança.",
    "solution": "Uma boa solução apresenta escopo autorizado, inventário mínimo, visão física, visão lógica, evidências sanitizadas, riscos priorizados e próximos passos realistas. Ela não promete ter descoberto tudo e não expõe informações sensíveis."
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
      "type": "conceito",
      "q": "Qual é a melhor definição de mapa de rede no contexto deste módulo?",
      "opts": [
        "Um desenho decorativo da internet",
        "Um documento com visão física, lógica, serviços, evidências, métricas e riscos",
        "Uma lista de senhas de roteadores",
        "Um comando que descobre tudo automaticamente"
      ],
      "a": 1,
      "exp": "Mapa útil combina várias visões e evidências, não apenas desenho.",
      "difficulty": "iniciante",
      "topic": "mapeamento"
    },
    {
      "id": "q1.10.2",
      "type": "comparação",
      "q": "Qual item pertence mais claramente à visão física?",
      "opts": [
        "DNS primário",
        "Cabo entre tomada e switch",
        "Regra de firewall",
        "Nome FQDN de aplicação"
      ],
      "a": 1,
      "exp": "Cabos, portas, rack, patch panel e APs fazem parte da visão física.",
      "difficulty": "iniciante",
      "topic": "topologia"
    },
    {
      "id": "q1.10.3",
      "type": "diagnóstico",
      "q": "Qual comando ajuda a identificar gateway e DNS no Windows?",
      "opts": [
        "ipconfig /all",
        "format c:",
        "whoami",
        "mkdir"
      ],
      "a": 0,
      "exp": "ipconfig /all mostra configuração IP detalhada no Windows.",
      "difficulty": "iniciante",
      "topic": "comandos"
    },
    {
      "id": "q1.10.4",
      "type": "segurança",
      "q": "Por que mapas de rede devem ser protegidos?",
      "opts": [
        "Porque sempre consomem muita CPU",
        "Porque podem revelar IPs, caminhos, nomes internos e controles",
        "Porque impedem DHCP",
        "Porque substituem firewall"
      ],
      "a": 1,
      "exp": "Mapas internos ajudam defesa, mas também podem ajudar reconhecimento ofensivo se vazarem.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q1.10.5",
      "type": "cenário",
      "q": "Um tracert mostra asteriscos em alguns saltos. Qual interpretação é mais correta?",
      "opts": [
        "A internet inteira caiu",
        "Asteriscos sempre indicam invasão",
        "Alguns dispositivos podem não responder ICMP ou filtrar respostas",
        "O DNS está sempre incorreto"
      ],
      "a": 2,
      "exp": "Ausência de resposta em um salto não prova queda; pode ser política de resposta ICMP.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q1.10.6",
      "type": "arquitetura",
      "q": "Qual é o próximo assunto natural após mapear fundamentos de rede?",
      "opts": [
        "Modelo OSI",
        "Design gráfico",
        "Criptomoedas",
        "Edição de vídeo"
      ],
      "a": 0,
      "exp": "O Modelo OSI organiza o diagnóstico e a arquitetura por camadas.",
      "difficulty": "iniciante",
      "topic": "próximo módulo"
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
      "id": "fc1.10.4",
      "front": "Mapa de rede é documento sensível?",
      "back": "Sim. Pode revelar ativos, caminhos, controles, nomes internos e IPs.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
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
      "id": "fc1.10.6",
      "front": "Qual módulo vem depois do Módulo 1?",
      "back": "Modelo OSI, para organizar o raciocínio por camadas.",
      "tags": [
        "roadmap"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.10.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre mapa físico e mapa lógico usando uma rede doméstica como exemplo.",
      "expectedAnswer": "Mapa físico descreve cabos, Wi-Fi, roteador e posição dos equipamentos. Mapa lógico descreve IP, gateway, DNS, serviços e caminhos.",
      "explanation": "A separação evita confundir infraestrutura visível com comportamento do tráfego."
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
    "title": "Documente uma rede pequena para apresentação técnica",
    "scenario": "Você recebeu a tarefa de documentar uma rede pequena antes de uma melhoria de segurança. O gestor quer um documento claro, sem excesso, mas útil para suporte, redes e segurança.",
    "tasks": [
      "Definir escopo",
      "Criar inventário mínimo",
      "Desenhar mapa físico",
      "Desenhar mapa lógico",
      "Coletar evidências sanitizadas",
      "Listar métricas observadas",
      "Apontar riscos e próximos passos"
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
    "finalAnswer": "Um bom relatório de Módulo 1 deve permitir que outro técnico entenda a rede básica, saiba quais evidências foram coletadas, reconheça limitações e veja quais riscos devem ser tratados primeiro."
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
