export const lesson1401 = {
  "id": "14.1",
  "moduleId": "m14",
  "order": 1,
  "title": "Por que Cloud Networking existe",
  "subtitle": "Como a cloud transformou redes físicas em redes virtuais programáveis, elásticas, auditáveis e cobradas por uso.",
  "duration": "15-25 min + 30 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "cloud networking",
    "vpc",
    "vnet",
    "subnet",
    "roteamento",
    "security groups",
    "nsg",
    "nat",
    "dns",
    "flow logs",
    "devsecops",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.x",
      "reason": "Cloud networking depende de IPv4, CIDR e endereçamento."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.x",
      "reason": "Subnets em cloud exigem raciocínio de subnetting e crescimento."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "DNS, DHCP e NAT aparecem de forma recorrente em cloud."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Security groups, NSGs, NACLs e cloud firewalls dependem de políticas de tráfego."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.10",
      "reason": "Arquitetura defensiva de rede prepara a visão de segurança necessária para cloud networking."
    }
  ],
  "objectives": [
    "Explicar por que cloud networking surgiu e o que muda em relação ao datacenter tradicional quando a rede vira objetos criados por API e cobrados por uso.",
    "Relacionar VPC/VNet, subnet, tabela de rotas, NAT Gateway, security group e flow logs aos fundamentos já estudados e reconhecê-los em AWS, Azure e Google Cloud.",
    "Separar o que o provedor opera do que é responsabilidade sua e apontar os riscos que a facilidade da cloud cria."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Uma equipe publica uma aplicação na cloud em uma tarde: a máquina virtual sobe, o banco de dados é criado e o balanceador de carga ganha um nome público. Ninguém comprou servidor, passou cabo ou abriu chamado para o time de firewall. Um mês depois chegam as surpresas: o banco aceitava conexões de qualquer endereço da internet, a fatura trouxe uma linha cara chamada “NAT Gateway: dados processados”, a homologação conseguia falar com a produção e, quando a segurança perguntou quem tinha acessado o banco, não havia registro nenhum.</p>\n  <p>Nada disso foi falha do provedor. Cada problema é um conceito que você já estudou (endereço público, NAT, segmentação, logs) configurado do jeito errado, só que em minutos. Quem trabalha com infraestrutura ou segurança encontra redes cloud em quase toda empresa, e são esses os erros que vai precisar evitar e encontrar.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando a velocidade da cloud chega antes dos fundamentos de rede. No datacenter tradicional, publicar um sistema exigia pedidos separados para servidor, VLAN, regra de firewall, balanceador e DNS, e cada pedido levava dias ou semanas. Esse modelo era lento e caro, mas obrigava alguém a revisar cada mudança.</p>\n  <p>A cloud resolveu a lentidão: quem tem permissão cria uma rede inteira em minutos, por um console ou por uma API, sem comprar equipamento. Com isso, um erro também nasce em minutos e se repete em todos os ambientes que copiam a mesma configuração. Esta aula mostra o que a cloud mudou na rede, o que continua igual e quais decisões continuam sendo suas.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> cloud networking é a rede de computadores aplicada à cloud: endereçamento, segmentação, rotas, filtros, publicação e logs viram objetos lógicos que você cria por API e que o provedor transforma em tráfego real sobre o hardware dele.</div>\n  <p>Para ver por que isso existe, compare três jeitos de construir uma rede:</p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Modelo</th><th>Como você cria a rede</th><th>Limitação</th></tr></thead>\n      <tbody>\n        <tr><td>Rede física</td><td>Compra switches, roteadores e firewalls e passa cabos.</td><td>Cada mudança leva dias ou semanas.</td></tr>\n        <tr><td>Datacenter virtualizado</td><td>Roda máquinas virtuais, com switches virtuais dentro dos servidores.</td><td>Mais ágil, mas o prédio e o hardware continuam sendo seus.</td></tr>\n        <tr><td>Cloud</td><td>Declara rede, subnets, rotas e regras por console, linha de comando ou código.</td><td>Rápida, mas cobrada por uso e fácil de errar em escala.</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>A cloud não elimina IP, CIDR, rota, NAT, porta, firewall nem DNS. Ela muda onde esses controles vivem (em objetos do provedor, não em caixas no rack), como são configurados (por API), como são cobrados (por hora e por volume de tráfego) e como são auditados (cada mudança fica registrada).</p>\n  <h3>Quem cuida do quê</h3>\n  <p>O provedor opera os prédios, os servidores, os cabos e a camada que isola a sua rede das redes de outros clientes no mesmo hardware. O desenho continua com você: quais endereços usar, o que fica público, quais fluxos as regras permitem, por onde o tráfego sai e se os logs estão ligados.</p>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li>Dar IP público a cada recurso para ele acessar a internet: para só sair, basta o NAT; para receber clientes, basta o balanceador ter endereço público.</li>\n      <li>Ignorar o custo do tráfego: NAT Gateway, load balancer, tráfego de saída para a internet (chamado de egress) e logs são cobrados por hora ou por GB e, em alguns casos, custam mais do que as máquinas.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Por baixo do console existe hardware compartilhado por muitos clientes. Você não configura esses switches: cria objetos lógicos, e o <strong>plano de controle</strong> do provedor (o software que guarda a sua configuração e a aplica nos servidores físicos) os transforma em comportamento de rede. Uma rede cloud mínima nasce assim:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Rede virtual:</strong> uma VPC (ou VNet) com um bloco CIDR, como <code>10.40.0.0/16</code>, isolada das redes de outros clientes mesmo que eles usem os mesmos endereços.</li>\n    <li><strong>Subnets:</strong> o bloco dividido por função, como uma subnet para a entrada pública e outra para a aplicação.</li>\n    <li><strong>Rotas:</strong> cada subnet usa uma tabela de rotas. Na pública, <code>0.0.0.0/0</code> aponta para o internet gateway, a porta da VPC para a internet. Na privada, aponta para um NAT Gateway, que deixa a aplicação sair sem receber conexões de fora.</li>\n    <li><strong>Filtros:</strong> security groups (AWS) e NSGs (Azure) dizem quais fluxos passam, por origem, destino, porta e protocolo.</li>\n    <li><strong>Publicação:</strong> um balanceador de carga (load balancer) na subnet pública recebe os clientes e repassa as conexões à aplicação privada.</li>\n    <li><strong>Registros:</strong> os flow logs anotam cada fluxo (origem, destino, portas, protocolo, aceito ou recusado), como o log de um firewall.</li>\n  </ol>\n  <p>Tudo isso pode ser feito no console ou escrito como código (infraestrutura como código, com ferramentas como o Terraform). A rede passa a ser versionada e revisável, mas um erro no código também se repete em todo ambiente criado a partir dele.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>No datacenter tradicional, você constrói o próprio prédio: compra o terreno, ergue as paredes, instala portões e câmeras. Na cloud, você aluga salas num condomínio que já existe e só define, por formulário, quais portas abrem, quem pode entrar e o que as câmeras gravam. Não ter construído o prédio não tira de você a responsabilidade por uma porta deixada aberta.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Uma loja virtual pequena vai para a AWS. A rede fica assim:</p>\n  <ul>\n    <li><strong>VPC</strong> <code>10.40.0.0/16</code>.</li>\n    <li><strong>Subnet pública</strong> <code>10.40.1.0/24</code>: só o load balancer, com endereço público, recebendo HTTPS (porta 443).</li>\n    <li><strong>Subnet privada</strong> <code>10.40.2.0/24</code>: a aplicação, sem IP público; o security group aceita a porta 443 só vindo do load balancer.</li>\n    <li><strong>Subnet privada</strong> <code>10.40.3.0/24</code>: o banco PostgreSQL gerenciado pelo provedor, sem IP público, aceitando a porta 5432 só vindo da aplicação.</li>\n    <li><strong>Saída e registros:</strong> a aplicação sai para a internet pelo NAT Gateway; flow logs ligados desde o primeiro dia.</li>\n  </ul>\n  <p>Em Azure ou Google Cloud, o desenho seria o mesmo; mudariam os nomes:</p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Função</th><th>AWS</th><th>Azure</th><th>Google Cloud</th></tr></thead>\n      <tbody>\n        <tr><td>Rede virtual isolada</td><td>VPC</td><td>Virtual Network (VNet)</td><td>VPC Network</td></tr>\n        <tr><td>Tabela de rotas</td><td>Route table</td><td>Route table</td><td>Rotas da VPC Network</td></tr>\n        <tr><td>Filtro de tráfego</td><td>Security group</td><td>Network Security Group (NSG)</td><td>Regras de firewall da VPC</td></tr>\n        <tr><td>Saída de recursos privados</td><td>NAT Gateway</td><td>NAT Gateway</td><td>Cloud NAT</td></tr>\n        <tr><td>Logs de fluxo</td><td>VPC Flow Logs</td><td>Virtual network flow logs</td><td>VPC Flow Logs</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>Entender o papel de cada objeto vale nos três provedores; decorar só os nomes, não.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <p>À esquerda, a rede feita de equipamentos; à direita, as mesmas funções como objetos lógicos dentro de uma VPC: a entrada pública chega pelo gateway ao load balancer, a aplicação fica na subnet privada e sai pelo NAT, e os flow logs registram os fluxos.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"cloud-net-title cloud-net-desc\">\n    <title id=\"cloud-net-title\">Do datacenter físico à rede virtual em cloud</title>\n    <desc id=\"cloud-net-desc\">Datacenter tradicional com switch, firewall, servidor e banco, ao lado de uma VPC ou VNet com subnet pública (load balancer), subnet privada (aplicação), gateway e NAT para entrada e saída, e flow logs registrando os fluxos.</desc>\n    <defs>\n      <marker id=\"arrow-cloud-1401\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"30\" y=\"60\" width=\"360\" height=\"400\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"210\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">Datacenter tradicional</text>\n\n    <rect x=\"70\" y=\"140\" width=\"110\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"125\" y=\"176\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Switch</text>\n\n    <rect x=\"240\" y=\"140\" width=\"110\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"295\" y=\"176\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Firewall</text>\n\n    <rect x=\"70\" y=\"260\" width=\"110\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"125\" y=\"296\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Servidor</text>\n\n    <rect x=\"240\" y=\"260\" width=\"110\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"295\" y=\"296\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Banco</text>\n\n    <line x1=\"180\" y1=\"171\" x2=\"240\" y2=\"171\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"125\" y1=\"202\" x2=\"125\" y2=\"260\" class=\"svg-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"295\" y1=\"202\" x2=\"295\" y2=\"260\" class=\"svg-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n\n    <rect x=\"430\" y=\"60\" width=\"500\" height=\"400\" rx=\"18\" class=\"svg-zone svg-node--cloud\" />\n    <text x=\"680\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">VPC / VNet / VPC Network</text>\n\n    <rect x=\"465\" y=\"125\" width=\"190\" height=\"120\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"560\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Subnet pública</text>\n    <rect x=\"500\" y=\"170\" width=\"120\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"560\" y=\"199\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Load Balancer</text>\n\n    <rect x=\"705\" y=\"125\" width=\"190\" height=\"120\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"800\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Subnet privada</text>\n    <rect x=\"735\" y=\"170\" width=\"130\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"800\" y=\"199\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Aplicação</text>\n\n    <rect x=\"465\" y=\"300\" width=\"190\" height=\"100\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"560\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Gateway / NAT</text>\n    <text x=\"560\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rota e egress</text>\n\n    <rect x=\"705\" y=\"300\" width=\"190\" height=\"100\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"800\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Flow logs</text>\n    <text x=\"800\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SIEM / auditoria</text>\n\n    <line x1=\"390\" y1=\"260\" x2=\"430\" y2=\"260\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"620\" y1=\"193\" x2=\"735\" y2=\"193\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"800\" y1=\"216\" x2=\"800\" y2=\"300\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"560\" y1=\"300\" x2=\"560\" y2=\"245\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"750\" y1=\"216\" x2=\"655\" y2=\"320\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-cloud-1401)\" />\n\n    <text x=\"480\" y=\"495\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cloud networking não elimina redes: transforma redes em objetos versionáveis, auditáveis e cobrados por uso.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> a cloud não elimina a rede; transforma switches, cabos e firewalls em objetos criados por API e cobrados por uso.</li>\n    <li>O provedor opera o hardware; endereços, rotas, regras e logs são seus.</li>\n    <li>VPC (AWS), VNet (Azure) e VPC Network (Google Cloud) são a mesma rede virtual isolada.</li>\n    <li>Recurso privado sai pelo NAT; a entrada pública passa pelo load balancer.</li>\n    <li>Criar rápido também é errar rápido: IP público, regra aberta, logs desligados.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 14.2, “Regiões, zonas de disponibilidade, edge e latência”, você vê onde esses objetos vivem fisicamente e como a localização afeta latência, disponibilidade e custo. Depois, a aula 14.3 ensina a escolher o CIDR da VPC e desenhar as subnets.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "TLS",
      "BGP",
      "IPsec"
    ],
    "dependsOn": [
      "CIDR",
      "subnetting",
      "roteamento",
      "NAT",
      "firewall",
      "DNS",
      "VPN",
      "Zero Trust",
      "segurança de redes"
    ],
    "enables": [
      "VPC",
      "VNet",
      "cloud load balancing",
      "private endpoint",
      "VPN híbrida",
      "cloud firewall",
      "Kubernetes networking"
    ]
  },
  "security": {
    "vulnerabilities": [
      {
        "name": "Exposição pública indevida",
        "description": "Banco, VM ou porta administrativa (SSH 22, RDP 3389) com IP público ou regra que aceita 0.0.0.0/0.",
        "defensiveExplanation": "Endereços públicos são varridos o tempo todo; um serviço exposto logo recebe tentativas de login e de exploração.",
        "mitigation": "Aplicação e banco em subnets privadas, entrada só pelo load balancer, administração só pela VPN ou de origens restritas."
      },
      {
        "name": "Ambientes misturados",
        "description": "Desenvolvimento, homologação e produção na mesma rede, ou regras que liberam tudo dentro da VPC.",
        "defensiveExplanation": "Um invasor num ambiente menos protegido alcança a produção sem passar por filtro.",
        "mitigation": "Separar ambientes em VPCs ou subnets diferentes e liberar só os fluxos necessários."
      },
      {
        "name": "Baixa visibilidade",
        "description": "Rede criada sem flow logs nem registro de quem alterou rotas e regras.",
        "defensiveExplanation": "Num incidente, não há linha do tempo de quem falou com quem.",
        "mitigation": "Ligar flow logs e auditoria de mudanças desde a criação e enviá-los ao SIEM."
      }
    ],
    "goodPractices": [
      "Workloads privados por padrão; entrada só pelo load balancer.",
      "Regras de menor privilégio, nunca 0.0.0.0/0 em porta administrativa.",
      "Flow logs ligados desde a criação e rede versionada como código revisado."
    ],
    "detectionIdeas": [
      "Regra nova liberando 0.0.0.0/0 para SSH, RDP ou porta de banco.",
      "Recurso novo recebendo IP público.",
      "Flow logs desligados."
    ]
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "Uma VM privada não acessa a internet. Quais hipóteses você testaria antes de culpar a aplicação?",
      "hints": [
        "Siga o pacote: rota, NAT, filtro, nome.",
        "O que os flow logs mostrariam?"
      ],
      "expectedIdeas": [
        "rota 0.0.0.0/0 para o NAT",
        "NAT Gateway existente",
        "filtro permitindo a saída",
        "DNS",
        "flow logs: aceito ou recusado"
      ],
      "explanation": "Siga o caminho pelos objetos da aula: a rota da subnet leva ao NAT? O NAT existe? O filtro libera a saída? O nome resolve? Os flow logs mostram o fluxo aceito ou recusado?"
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer migrar rápido para cloud. Qual risco aparece se cada squad criar sua própria VPC sem padrão?",
      "hints": [
        "Pense em CIDR, exposição e logs.",
        "Como ligar essas redes depois?"
      ],
      "expectedIdeas": [
        "CIDR sobreposto",
        "regras e exposição diferentes por time",
        "logs ausentes",
        "custo sem dono"
      ],
      "explanation": "Cada VPC vira um datacenter paralelo: CIDRs sobrepostos impedem ligar as redes depois, cada time expõe de um jeito e ninguém tem os logs de todas."
    }
  ],
  "quiz": [
    {
      "id": "q14.1.1",
      "question": "Qual é a melhor definição de cloud networking?",
      "options": [
        "Uso de objetos lógicos de rede em cloud para conectar, isolar, proteger, publicar e observar aplicações.",
        "A substituição completa de TCP/IP por APIs.",
        "Apenas a criação de máquinas virtuais com IP público.",
        "Um serviço exclusivo de Wi-Fi corporativo."
      ],
      "answer": 0,
      "explanation": "Cloud networking usa objetos lógicos, mas continua dependendo de TCP/IP, DNS, rotas e políticas.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q14.1.2",
      "question": "Qual trio de nomes corresponde ao mesmo bloco, a rede virtual isolada, nos três provedores?",
      "options": [
        "AWS S3, Azure DNS e Google Kubernetes Engine.",
        "AWS IAM, Azure Load Balancer e Google Cloud NAT.",
        "AWS VPC, Azure Virtual Network e Google Cloud VPC Network.",
        "AWS Lambda, Azure VM e Google Cloud Router."
      ],
      "answer": 2,
      "explanation": "VPC (AWS), Virtual Network (Azure) e VPC Network (Google Cloud) são a rede virtual isolada onde ficam subnets, rotas e filtros.",
      "topic": "multi-cloud",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q14.1.3",
      "question": "Qual prática reduz exposição em uma aplicação cloud?",
      "options": [
        "Colocar IP público em todos os recursos para facilitar suporte.",
        "Manter banco e aplicação privados e publicar a entrada só por um load balancer.",
        "Desativar logs para economizar sempre.",
        "Usar 0.0.0.0/0 para portas administrativas."
      ],
      "answer": 1,
      "explanation": "Com aplicação e banco sem IP público, só o load balancer fica exposto, e as regras dizem exatamente quem fala com quem.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q14.1.4",
      "question": "Qual item pode gerar custo de rede recorrente em cloud?",
      "options": [
        "Somente nomes de subnets.",
        "Somente tags de recursos.",
        "Somente CIDR privado sem tráfego.",
        "NAT Gateway, tráfego de saída (egress), load balancers e armazenamento de logs."
      ],
      "answer": 3,
      "explanation": "Na cloud, a rede é cobrada por uso: por hora de NAT Gateway e load balancer, por GB processado ou enviado para a internet e pelo armazenamento de logs.",
      "topic": "finops",
      "difficulty": "intermediário",
      "type": "custo"
    },
    {
      "id": "q14.1.7",
      "question": "Uma aplicação numa subnet privada precisa baixar atualizações da internet sem receber conexões de fora. Qual é a solução típica?",
      "options": [
        "Dar um IP público à aplicação e liberar todas as portas no security group.",
        "Mover a aplicação para a subnet do load balancer e remover o security group.",
        "Uma rota 0.0.0.0/0 da subnet privada apontando para um NAT Gateway.",
        "Desligar os flow logs para o tráfego de saída passar."
      ],
      "answer": 2,
      "explanation": "O NAT Gateway deixa recursos privados abrirem conexões para a internet sem receber conexões de fora; a rota 0.0.0.0/0 da subnet privada aponta para ele.",
      "topic": "nat",
      "difficulty": "intermediário",
      "type": "arquitetura"
    },
    {
      "id": "q14.1.8",
      "question": "Na cloud, uma regra deixou a porta 22 (SSH) de uma VM aberta para 0.0.0.0/0. Quem responde por essa regra?",
      "options": [
        "O provedor, porque a rede roda no hardware dele.",
        "A empresa cliente: o provedor opera o hardware e o isolamento, mas regras e exposição são do cliente.",
        "Ninguém, porque o provedor corrige regras perigosas automaticamente.",
        "O fabricante dos switches físicos do provedor."
      ],
      "answer": 1,
      "explanation": "O provedor cuida de prédios, servidores, cabos e do isolamento entre clientes; endereços, rotas, regras e exposição são de quem usa a cloud.",
      "topic": "responsabilidade",
      "difficulty": "iniciante",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc14.1.1",
      "front": "O que é uma VPC/VNet?",
      "back": "Uma rede virtual lógica em cloud usada para isolar, conectar e controlar workloads.",
      "tags": [
        "cloud",
        "vpc",
        "vnet"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.1.2",
      "front": "Cloud networking elimina TCP/IP?",
      "back": "Não. Ele abstrai a operação da rede, mas continua usando conceitos como IP, rota, porta, DNS, NAT e firewall.",
      "tags": [
        "fundamentos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.1.3",
      "front": "O que é egress?",
      "back": "Tráfego de saída de um ambiente, subnet, workload ou provedor para outro destino.",
      "tags": [
        "egress",
        "custo"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.1.4",
      "front": "Por que flow logs importam?",
      "back": "Eles registram metadados de tráfego úteis para troubleshooting, auditoria e detecção de segurança.",
      "tags": [
        "logs",
        "soc"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.1.5",
      "front": "Qual é o erro de usar IP público por conveniência?",
      "back": "Aumenta superfície de ataque e ignora opções de publicação controlada ou acesso privado.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.1.7",
      "front": "Na cloud, o que o provedor opera e o que continua com você?",
      "back": "O provedor opera prédios, servidores, cabos e o isolamento entre clientes. Você define endereços, subnets, rotas, regras, o que fica público e se os logs estão ligados.",
      "tags": [
        "responsabilidade",
        "cloud"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex14.1.3",
      "type": "segurança",
      "prompt": "Uma regra permite SSH de 0.0.0.0/0 para uma VM. Qual risco e qual correção?",
      "expectedAnswer": "Risco: SSH exposto à internet inteira, alvo de varreduras e tentativas de login. Correção: tirar 0.0.0.0/0 e liberar a porta 22 só para a VPN ou endereços restritos da empresa, com autenticação forte e logs ligados.",
      "explanation": "Portas administrativas públicas são alvos frequentes de varredura e abuso."
    },
    {
      "id": "ex14.1.5",
      "type": "diagnóstico",
      "prompt": "Na loja do exemplo, o item da fatura que mais cresceu foi 'NAT Gateway: dados processados'. Explique por que o tráfego da aplicação passa pelo NAT e como descobrir qual recurso e qual destino geram o volume.",
      "expectedAnswer": "A rota 0.0.0.0/0 da subnet privada aponta para o NAT, então todo tráfego da aplicação para fora da VPC passa por ele, e o NAT cobra por GB processado. Os flow logs mostram origem, destino, portas e volume de cada fluxo: dá para ver qual instância e qual destino concentram os dados.",
      "explanation": "Junta rota, NAT, custo por uso e flow logs num caso de fatura."
    }
  ],
  "challenge": {
    "title": "Primeiro desenho de rede cloud para uma aplicação web",
    "scenario": "Uma empresa vai levar para a cloud uma aplicação web e o banco dela. O datacenter atual usa 10.0.0.0/16 e continuará ligado. A segurança exige exposição mínima e logs.",
    "tasks": [
      "Escolher o CIDR da rede virtual e das subnets.",
      "Dizer o que fica público e o que fica privado, e como a entrada chega à aplicação.",
      "Dizer por onde a aplicação sai para a internet e quais regras liberam cada fluxo.",
      "Listar o que precisa ser registrado e dois custos de rede a acompanhar."
    ],
    "constraints": [
      "O banco não pode ter IP público.",
      "Acesso administrativo não pode ficar aberto para a internet.",
      "Produção e homologação não podem compartilhar a mesma subnet."
    ],
    "expectedDeliverables": [
      "Um desenho em texto ou tabela com CIDRs, subnets, rotas, regras, logs e custos."
    ]
  },
  "commentedSolution": {
    "reasoning": "Comece pelos fluxos, não pelos nomes de serviços: quem precisa falar com quem? Depois escolha endereços, rotas e regras que permitam só esses fluxos.",
    "steps": [
      "CIDR sem sobrepor o datacenter: 10.40.0.0/16 para produção e 10.41.0.0/16 para homologação.",
      "Subnets: pública 10.40.1.0/24 (só o load balancer); aplicação 10.40.2.0/24 e banco 10.40.3.0/24, privadas.",
      "Rotas: 0.0.0.0/0 para o internet gateway na pública e para o NAT Gateway nas privadas.",
      "Regras: 443 da internet para o load balancer e dele para a aplicação; porta do banco só a partir da aplicação; administração só pela VPN.",
      "Flow logs e auditoria ligados desde o início; acompanhar os GB processados no NAT e o armazenamento de logs."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Tudo numa subnet pública para simplificar.",
        "whyItIsWrong": "Expõe aplicação e banco e tira o controle da entrada."
      },
      {
        "answer": "Reusar 10.0.0.0/16 na VPC.",
        "whyItIsWrong": "Com endereços sobrepostos, as redes não se roteiam quando forem ligadas."
      },
      {
        "answer": "Desligar os logs para economizar.",
        "whyItIsWrong": "Deixa qualquer incidente sem linha do tempo."
      }
    ],
    "finalAnswer": "VPC 10.40.0.0/16, separada da homologação e sem sobrepor o datacenter; só o load balancer na subnet pública; aplicação e banco privados, saindo pelo NAT; regras só para os fluxos listados; flow logs ligados e custos de NAT e logs acompanhados."
  },
  "glossary": [
    {
      "term": "Load balancer",
      "shortDefinition": "Serviço que recebe as conexões dos clientes e as distribui entre os servidores atrás dele.",
      "relatedLessons": [
        "14.6"
      ]
    },
    {
      "term": "Security group e NSG",
      "shortDefinition": "Filtros de tráfego da cloud (security group na AWS, Network Security Group no Azure) que liberam fluxos por origem, destino, porta e protocolo.",
      "relatedLessons": [
        "14.5"
      ]
    },
    {
      "term": "Internet gateway",
      "shortDefinition": "Objeto que liga a VPC à internet; a rota 0.0.0.0/0 da subnet pública aponta para ele.",
      "relatedLessons": [
        "14.4"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "What is Amazon VPC?",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
      "note": "Referência sobre VPC como rede virtual logicamente isolada."
    },
    {
      "type": "official-doc",
      "title": "What is Azure Virtual Network?",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview",
      "note": "Referência sobre VNet como bloco fundamental de rede privada no Azure."
    },
    {
      "type": "official-doc",
      "title": "VPC networks",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/vpc/docs/vpc",
      "note": "Referência sobre VPC Network como versão virtual de rede física implementada no Google."
    },
    {
      "type": "official-doc",
      "title": "The NIST Definition of Cloud Computing",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/145/final",
      "note": "Base conceitual para cloud computing e acesso sob demanda a recursos configuráveis."
    },
    {
      "type": "official-doc",
      "title": "Pricing for NAT gateways",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-pricing.html",
      "note": "Referência de custo de NAT Gateway por hora e GB processado."
    },
    {
      "type": "official-doc",
      "title": "VPC Flow Logs",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
      "note": "Referência sobre logs de fluxo para tráfego IP em VPC."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.x",
      "reason": "Subnets em cloud dependem de subnetting."
    },
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Security groups e NSGs dependem de políticas de tráfego e firewall."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.10",
      "reason": "Cloud networking precisa herdar arquitetura defensiva de rede."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "cloud/iaC",
      "lesson": "IaC e pipelines",
      "reason": "Redes cloud devem ser versionadas e validadas por automação."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM",
      "lesson": "Identidade e políticas",
      "reason": "Cloud networking moderno se integra a IAM, ZTNA e acesso por contexto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
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
      "14.2"
    ]
  }
};
