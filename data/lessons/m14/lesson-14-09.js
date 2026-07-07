export const lesson1409 = {
  "id": "14.9",
  "moduleId": "m14",
  "order": 9,
  "title": "Peering, Transit Gateway, Virtual WAN e Hub-Spoke",
  "subtitle": "Como conectar múltiplas redes cloud sem criar uma malha insegura, cara e impossível de auditar.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 320,
  "tags": [
    "cloud networking",
    "peering",
    "transit gateway",
    "virtual wan",
    "hub-spoke",
    "vpc",
    "vnet",
    "roteamento",
    "segurança",
    "custos",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.3",
      "reason": "Peering e trânsito dependem de VPC/VNet, CIDR e desenho de subnets."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.4",
      "reason": "É necessário entender route tables, next hop, rota default e UDR."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.8",
      "reason": "Hub-spoke frequentemente integra VPN, Direct Connect, ExpressRoute, Interconnect e BGP."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.x",
      "reason": "Arquitetura de trânsito precisa de segmentação, menor privilégio, logs e defesa em profundidade."
    }
  ],
  "objectives": [
    "Diferenciar peering ponto a ponto, malha de peerings, hub-spoke e serviços de trânsito cloud.",
    "Explicar por que peering simples não deve ser assumido como transitivo.",
    "Desenhar uma arquitetura hub-spoke com inspeção, logs, DNS e conectividade híbrida.",
    "Identificar riscos de CIDR sobreposto, rota assimétrica, bypass de firewall e movimento lateral.",
    "Comparar AWS Transit Gateway, Azure Virtual WAN e padrões equivalentes em Google Cloud.",
    "Criar um plano de troubleshooting e custo para conectividade multi-VPC/VNet."
  ],
  "learningOutcomes": [
    "Dado um cenário com cinco redes cloud, o aluno escolhe peering ou hub/transit com justificativa.",
    "Dado um desenho com A-B e B-C pareados, o aluno identifica por que A não necessariamente alcança C.",
    "Dado um incidente de tráfego lateral, o aluno propõe centralização de inspeção e logs.",
    "Dado um conjunto de CIDRs, o aluno identifica conflitos e riscos antes de conectar redes."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n\n  <p>Imagine uma empresa que começou com uma única VPC para uma aplicação web. Depois vieram outra VPC para dados, uma VNet no Azure para analytics, uma VPC em outra conta para desenvolvimento, uma conexão VPN com o datacenter, um ambiente Kubernetes e uma necessidade de compartilhar serviços centrais como DNS, firewall, observabilidade e acesso administrativo. No começo, parecia simples criar peering entre redes. Depois de poucos meses, surgiram dezenas de conexões ponto a ponto, rotas manuais, exceções de firewall, custos inesperados e dúvidas sobre qual caminho o tráfego realmente percorre.</p>\n  <p>Esse é o motivo pelo qual peering, transit gateways, Virtual WAN e hub-spoke existem. Redes cloud crescem rápido. Se cada nova VPC, VNet ou projeto for conectado de qualquer forma, a arquitetura vira uma teia difícil de auditar, operar e proteger. O objetivo desta aula é transformar essa teia em um desenho intencional: quando usar peering direto, quando usar um hub, quando usar serviços de trânsito e quando evitar transitividade implícita.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma aplicação em uma VPC de produção precisa acessar um serviço no datacenter e também um banco em uma VPC de dados. A equipe cria peering entre produção e dados, uma VPN para o datacenter e assume que tudo conseguirá falar com tudo. Parte do tráfego funciona, parte falha, alguns logs mostram caminho pelo firewall e outros não. O erro central é assumir transitividade onde ela não existe ou permitir transitividade onde ela não deveria existir.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n\n  <p>Em redes tradicionais, organizações usavam topologias físicas e lógicas como estrela, malha parcial, hub-and-spoke, MPLS, backbone corporativo e datacenters centrais. O objetivo era parecido: conectar locais e sistemas sem criar uma malha impossível de operar. Quando a cloud surgiu, a primeira abstração forte foi a rede virtual isolada: VPC, VNet ou VPC Network. Cada uma funcionava como um domínio de rede privado, com CIDR, subnets, rotas e controles.</p>\n  <p>O primeiro passo natural foi conectar duas redes virtuais por peering. Peering é simples e eficiente para poucos pares. Porém, à medida que empresas passaram a usar múltiplas contas, assinaturas, projetos, regiões, ambientes e unidades de negócio, o peering ponto a ponto começou a gerar complexidade. Se dez redes precisam se conectar entre si, o número de relacionamentos cresce rapidamente. Além disso, muitos serviços de peering não fornecem transitividade automática: se A está pareada com B e B com C, isso não significa que A fale com C.</p>\n  <p>Para resolver esse problema, provedores criaram serviços de trânsito e arquiteturas hub-spoke. A AWS oferece Transit Gateway como hub de trânsito para VPCs e redes on-premises. O Azure oferece Virtual WAN e também topologias hub-spoke com Virtual Network Peering. O Google Cloud oferece Network Connectivity Center, VPC Network Peering e modelos de hub conectando VPCs, appliances e conectividade híbrida. O padrão comum é concentrar conectividade em um ponto governado, em vez de criar malha sem controle.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n\n  <p>O problema técnico é equilibrar conectividade e isolamento. Se tudo fica isolado demais, as aplicações não funcionam. Se tudo se conecta a tudo, a cloud vira uma rede plana distribuída com alto risco de movimento lateral, custo e troubleshooting complexo.</p>\n  <ul>\n    <li><strong>Escala operacional:</strong> peering ponto a ponto exige muitas rotas, muitas permissões e muita documentação quando há várias redes.</li>\n    <li><strong>Transitividade:</strong> peering simples normalmente não deve ser tratado como roteador central entre terceiros.</li>\n    <li><strong>Inspeção:</strong> se o tráfego passa diretamente entre spokes, ele pode bypassar firewall, NDR e logs centrais.</li>\n    <li><strong>CIDR:</strong> redes com blocos sobrepostos não roteiam corretamente por peering ou trânsito privado.</li>\n    <li><strong>Custo:</strong> trânsito, processamento por gateway, tráfego entre zonas/regiões e appliances podem gerar cobrança relevante.</li>\n    <li><strong>Governança:</strong> sem padrão, cada time cria conectividade de forma diferente, dificultando auditoria.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> desenhar conectividade cloud como se fosse apenas “ligar cabos virtuais”. Em cloud, cada conexão também implica rota, política, cobrança, logs, responsabilidade operacional e blast radius.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n\n  <p>As opções de conectividade entre redes cloud evoluíram de conexões ponto a ponto para modelos centrais de trânsito e governança.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Modelo</th><th>Como funciona</th><th>Quando ajuda</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Peering ponto a ponto</td><td>Duas redes privadas trocam tráfego diretamente por IP privado</td><td>Poucas redes, baixa complexidade, fluxo claro</td><td>Não escala bem para muitas redes e não deve ser assumido como transitivo</td></tr>\n      <tr><td>Malha de peerings</td><td>Muitas redes conectadas par a par</td><td>Ambientes pequenos com poucos domínios</td><td>Documentação, rotas e segurança ficam frágeis rapidamente</td></tr>\n      <tr><td>Hub-spoke</td><td>Spokes conectam ao hub central; o hub concentra serviços compartilhados</td><td>Ambientes corporativos com inspeção e governança</td><td>Hub mal desenhado vira gargalo e ponto de falha</td></tr>\n      <tr><td>Transit Gateway / Virtual WAN</td><td>Serviço gerenciado faz trânsito entre redes, VPNs e links</td><td>Múltiplas contas, assinaturas, VPCs/VNets, regiões e datacenters</td><td>Custo por attachment, processamento, roteamento e operação</td></tr>\n      <tr><td>Private service access/endpoints</td><td>Serviços específicos são acessados privadamente sem abrir rede inteira</td><td>Reduz exposição e blast radius</td><td>Não substitui todos os casos de roteamento entre redes</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n\n  <p><strong>Peering</strong> é uma conexão privada entre duas redes virtuais que permite tráfego por endereços privados, geralmente sem passar pela internet pública. <strong>Hub-spoke</strong> é um padrão arquitetural em que redes de aplicação, chamadas spokes, conectam-se a uma rede central, chamada hub, onde ficam serviços compartilhados como firewall, DNS, VPN, inspeção, bastion e observabilidade. <strong>Transit Gateway</strong>, <strong>Virtual WAN</strong> e serviços equivalentes são mecanismos gerenciados para escalar essa conectividade entre múltiplas redes e ambientes híbridos.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> arquitetura de trânsito cloud é o desenho que decide como VPCs, VNets, projetos, contas, ambientes, regiões e redes on-premises se conectam, quais caminhos são permitidos, onde há inspeção, quais rotas são propagadas, quais logs são coletados e quais custos são aceitos.</div>\n  <p>O conceito-chave é que conectividade não deve ser confundida com autorização. Só porque duas redes podem rotear entre si não significa que todos os recursos devem conversar. O desenho correto combina trânsito, segmentação, menor privilégio, inspeção, logs e automação.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Por baixo, peering e trânsito cloud dependem de tabelas de rota, anexos, gateways, políticas e propagação controlada de prefixos.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Criação da relação:</strong> duas redes são pareadas ou conectadas a um hub/transit gateway.</li>\n    <li><strong>Validação de CIDR:</strong> blocos sobrepostos normalmente impedem roteamento privado correto.</li>\n    <li><strong>Rotas são criadas ou propagadas:</strong> subnets precisam saber para onde enviar tráfego destinado a outros CIDRs.</li>\n    <li><strong>Controle de segurança é aplicado:</strong> SG/NSG, NACL, firewall, route tables e políticas centralizadas determinam se o fluxo pode passar.</li>\n    <li><strong>Tráfego atravessa o caminho escolhido:</strong> direto por peering, pelo hub, pelo firewall ou por serviço de trânsito.</li>\n    <li><strong>Retorno precisa ser simétrico ou compatível:</strong> firewalls stateful e NVAs podem quebrar com rota assimétrica.</li>\n    <li><strong>Logs registram evidências:</strong> flow logs, firewall logs, route analyzer, métricas de attachment e SIEM ajudam na investigação.</li>\n  </ol>\n  <p>A grande diferença entre peering e trânsito é o papel do componente intermediário. Peering conecta pares. Trânsito cria um ponto central capaz de encaminhar entre múltiplos anexos, desde que as tabelas e políticas permitam.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Uma arquitetura hub-spoke defensiva costuma conter:</p>\n  <ul>\n    <li><strong>Hub de conectividade:</strong> concentra VPN, link dedicado, transit gateway, Virtual WAN ou NVA.</li>\n    <li><strong>Hub de segurança:</strong> firewall, IDS/IPS/NDR, proxy, DNS resolver, bastion e logs.</li>\n    <li><strong>Spokes de aplicação:</strong> produção, desenvolvimento, dados, observabilidade, integração e serviços compartilhados.</li>\n    <li><strong>Contas/assinaturas/projetos separados:</strong> ajudam a isolar responsabilidades e blast radius.</li>\n    <li><strong>Rotas explícitas:</strong> tráfego entre spokes passa pelo hub quando precisa de inspeção.</li>\n    <li><strong>Políticas por fluxo:</strong> matriz de origem, destino, porta, protocolo, motivo, dono e evidência.</li>\n  </ul>\n  <p>Nem todo fluxo precisa passar por um firewall central. Em alguns casos, peering direto é adequado. Em outros, a centralização é obrigatória por compliance, inspeção ou auditoria. A decisão deve ser documentada e validada.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n\n  <p>Peering é como criar uma rua direta entre dois prédios. Funciona bem quando há poucos prédios e a rua tem propósito claro. Hub-spoke é como criar um terminal central: todos os prédios importantes se conectam ao terminal, onde há segurança, câmeras, controle de acesso e orientação. Transit Gateway ou Virtual WAN são como um terminal gerenciado em escala, preparado para conectar muitos prédios, bairros e cidades.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em rede cloud, a “rua” só existe se as tabelas de rota, políticas e anexos permitirem. Além disso, um caminho direto pode ser tecnicamente possível, mas proibido por governança.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Uma empresa tem duas VPCs: <code>10.10.0.0/16</code> para aplicação e <code>10.20.0.0/16</code> para banco de dados. Como há apenas duas redes e um fluxo específico, um peering direto pode ser suficiente. A route table da VPC de aplicação aponta <code>10.20.0.0/16</code> para o peering, e a route table da VPC de dados aponta <code>10.10.0.0/16</code> de volta. Security groups permitem apenas a porta do banco a partir dos servidores da aplicação.</p>\n  <p>O erro seria criar esse peering e liberar qualquer tráfego entre os CIDRs. O peering resolve caminho; a política de segurança resolve autorização.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Uma organização com dezenas de contas cloud usa um hub central por região. Cada aplicação fica em uma conta e VPC próprias. Spokes se conectam ao Transit Gateway. O datacenter se conecta ao hub por Direct Connect e VPN de backup. Todo tráfego entre spokes de ambientes críticos passa por firewall central. DNS privado, logs, NDR, SIEM e bastion ficam no hub de serviços compartilhados. Desenvolvimento não fala com produção, exceto por pipelines e APIs autorizadas.</p>\n  <p>O benefício é governança. O risco é concentração. Por isso, a arquitetura precisa de alta disponibilidade, múltiplas zonas, documentação de rotas, limites de propagação, tags de custo e playbooks de falha do hub.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Na AWS, o desenho pode usar VPC Peering para conexões simples e Transit Gateway para conectar múltiplas VPCs, VPNs e links dedicados. No Azure, o desenho pode usar Virtual Network Peering para spoke-to-hub e Azure Virtual WAN para hub gerenciado em escala. No Google Cloud, VPC Network Peering conecta redes VPC, enquanto Network Connectivity Center ajuda a centralizar conectividade entre redes, spokes e ambientes híbridos.</p>\n  <p>Apesar dos nomes diferentes, a pergunta é a mesma: o tráfego deve ser direto, centralizado, inspecionado, propagado, bloqueado ou substituído por acesso privado a serviço específico?</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, peering e transit não devem ser criados manualmente sem revisão. Terraform, Bicep, CloudFormation ou Deployment Manager devem declarar conexões, rotas, attachments, propagação, SG/NSG, tags, logs e exceções. Pipelines podem bloquear CIDR sobreposto, peering com produção a partir de desenvolvimento, rota default para hub sem firewall ou attachment sem flow logs.</p>\n  <p>Policy as code também ajuda a evitar drift: se alguém cria um peering emergencial no console e esquece de remover, a pipeline ou ferramenta de postura cloud deve apontar divergência.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Do ponto de vista de segurança, o maior risco é transformar trânsito cloud em movimento lateral como serviço. Um atacante que compromete uma workload em um spoke pode tentar alcançar outros spokes, datacenter, bancos, DNS, IAM ou sistemas de backup se a arquitetura permitir caminhos amplos.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Transitividade indevida</td><td>Spokes alcançam outros spokes sem inspeção</td><td>Movimento lateral</td><td>Rotas explícitas, firewall central e matriz de fluxos</td></tr>\n      <tr><td>CIDR sobreposto</td><td>Rotas não são instaladas ou tráfego vai ao destino errado</td><td>Falhas e bypasses</td><td>IPAM e validação antes da criação</td></tr>\n      <tr><td>Peering sem logs</td><td>Tráfego direto não aparece no SIEM</td><td>Baixa detecção</td><td>Flow logs, firewall logs e NDR em pontos críticos</td></tr>\n      <tr><td>Hub permissivo</td><td>Rotas e regras amplas no centro</td><td>Comprometimento em cascata</td><td>Menor privilégio por fluxo e revisão periódica</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra a diferença entre peering ponto a ponto e arquitetura hub-spoke com trânsito e inspeção centralizada.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1100 620\" role=\"img\" aria-labelledby=\"m14-09-title m14-09-desc\">\n    <title id=\"m14-09-title\">Peering, transit gateway, virtual WAN e hub-spoke</title>\n    <desc id=\"m14-09-desc\">Três spokes se conectam a um hub central com firewall, transit gateway ou virtual WAN. O datacenter entra pelo hub e o SIEM recebe logs.</desc>\n    <defs>\n      <marker id=\"m14-09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"420\" y=\"210\" width=\"260\" height=\"170\" rx=\"18\" class=\"svg-zone svg-zone--hub\" />\n    <text x=\"550\" y=\"238\" text-anchor=\"middle\" class=\"svg-label\">Hub Cloud</text>\n    <rect x=\"455\" y=\"260\" width=\"190\" height=\"46\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"550\" y=\"289\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Transit Gateway / Virtual WAN</text>\n    <rect x=\"455\" y=\"320\" width=\"190\" height=\"46\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"550\" y=\"349\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Firewall / inspeção</text>\n\n    <rect x=\"60\" y=\"70\" width=\"230\" height=\"110\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"175\" y=\"103\" text-anchor=\"middle\" class=\"svg-label\">Spoke Produção</text>\n    <text x=\"175\" y=\"133\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">apps + dados privados</text>\n\n    <rect x=\"810\" y=\"70\" width=\"230\" height=\"110\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"925\" y=\"103\" text-anchor=\"middle\" class=\"svg-label\">Spoke Dev/Test</text>\n    <text x=\"925\" y=\"133\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ambiente isolado</text>\n\n    <rect x=\"60\" y=\"430\" width=\"230\" height=\"110\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"175\" y=\"463\" text-anchor=\"middle\" class=\"svg-label\">Spoke Dados</text>\n    <text x=\"175\" y=\"493\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bancos e analytics</text>\n\n    <rect x=\"810\" y=\"430\" width=\"230\" height=\"110\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"925\" y=\"463\" text-anchor=\"middle\" class=\"svg-label\">Datacenter</text>\n    <text x=\"925\" y=\"493\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VPN / link dedicado</text>\n\n    <rect x=\"430\" y=\"30\" width=\"240\" height=\"92\" rx=\"16\" class=\"svg-node svg-node--security\" />\n    <text x=\"550\" y=\"64\" text-anchor=\"middle\" class=\"svg-label\">SIEM / NDR</text>\n    <text x=\"550\" y=\"92\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">flow logs, firewall logs, rotas</text>\n\n    <line x1=\"290\" y1=\"125\" x2=\"455\" y2=\"282\" class=\"svg-flow animated-flow\" marker-end=\"url(#m14-09-arrow)\" />\n    <line x1=\"810\" y1=\"125\" x2=\"645\" y2=\"282\" class=\"svg-flow animated-flow\" marker-end=\"url(#m14-09-arrow)\" />\n    <line x1=\"290\" y1=\"485\" x2=\"455\" y2=\"343\" class=\"svg-flow animated-flow\" marker-end=\"url(#m14-09-arrow)\" />\n    <line x1=\"810\" y1=\"485\" x2=\"645\" y2=\"343\" class=\"svg-flow animated-flow\" marker-end=\"url(#m14-09-arrow)\" />\n    <line x1=\"550\" y1=\"210\" x2=\"550\" y2=\"122\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m14-09-arrow)\" />\n\n    <line x1=\"290\" y1=\"180\" x2=\"810\" y2=\"180\" class=\"svg-flow svg-flow--blocked\" />\n    <text x=\"550\" y=\"172\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Sem transitividade por peering simples</text>\n\n    <text x=\"550\" y=\"410\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Trânsito controlado pelo hub: rota + política + inspeção + logs</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é conceitual e defensivo. Você não criará recursos pagos. O objetivo é desenhar e validar uma arquitetura hub-spoke para uma empresa fictícia, identificando quando usar peering direto, quando usar trânsito central e quando bloquear conectividade.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam decisão arquitetural: escolher entre peering e hub, identificar transitividade incorreta, corrigir CIDR sobreposto e propor inspeção centralizada sem quebrar disponibilidade.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio final pede que você desenhe uma rede cloud com produção, dados, desenvolvimento, observabilidade e datacenter, definindo caminhos permitidos, caminhos proibidos, logs e custos esperados.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como raciocinar por domínio de confiança, criticidade, fluxo necessário, custo e evidência. A resposta não é “usar Transit Gateway sempre”; é justificar cada conexão.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n\n  <ul>\n    <li><strong>Ideia central:</strong> peering conecta pares; hub/transit organiza conectividade em escala.</li>\n    <li><strong>O que lembrar:</strong> transitividade deve ser desenhada e controlada, não presumida.</li>\n    <li><strong>Erro comum:</strong> permitir que todo spoke fale com todo spoke sem inspeção e logs.</li>\n    <li><strong>Uso real:</strong> landing zones corporativas usam hub-spoke para conectividade, segurança, DNS, observabilidade e governança.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, você estudará <strong>Private Link, endpoints privados e serviços gerenciados</strong>. Depois de entender peering e trânsito, o próximo passo é perceber que nem todo acesso precisa abrir conectividade ampla entre redes. Muitas vezes, o desenho mais seguro é expor apenas um serviço privado específico, não uma VPC inteira.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4",
      "Camada 7 quando há inspeção por firewall/proxy"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IPv4",
      "IPv6",
      "BGP",
      "DNS",
      "TCP",
      "UDP",
      "TLS"
    ],
    "dependsOn": [
      "CIDR",
      "subnets",
      "route tables",
      "firewalls",
      "VPN",
      "BGP",
      "logs"
    ],
    "enables": [
      "landing zone",
      "hub-spoke",
      "conectividade híbrida",
      "governança multi-conta",
      "inspeção centralizada"
    ]
  },
  "protocolFields": [
    {
      "field": "Prefixo/CIDR",
      "size": "variável",
      "purpose": "Define o bloco roteável de cada rede virtual.",
      "securityObservation": "CIDR amplo ou sobreposto aumenta risco de conectividade indevida e falha operacional."
    },
    {
      "field": "Next hop",
      "size": "conceitual",
      "purpose": "Indica para onde o tráfego deve seguir em direção ao destino.",
      "securityObservation": "Next hop errado pode bypassar firewall ou gerar assimetria."
    },
    {
      "field": "Attachment",
      "size": "conceitual",
      "purpose": "Representa a conexão de uma VPC/VNet/VPN/link ao hub ou serviço de trânsito.",
      "securityObservation": "Attachment sem tabela/política correta pode ampliar blast radius."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Workload no spoke A",
      "action": "Envia tráfego para CIDR do spoke B.",
      "detail": "A subnet consulta a route table.",
      "possibleFailure": "Sem rota para o hub ou peering correto, o pacote é descartado."
    },
    {
      "step": 2,
      "actor": "Hub/transit",
      "action": "Recebe o tráfego e consulta sua tabela de rotas.",
      "detail": "O hub decide se encaminha ao spoke B, firewall ou datacenter.",
      "possibleFailure": "Propagação indevida ou ausência de rota causa blackhole."
    },
    {
      "step": 3,
      "actor": "Firewall central",
      "action": "Inspeciona política de origem, destino, porta e contexto.",
      "detail": "Permite ou bloqueia o fluxo e gera log.",
      "possibleFailure": "Rota assimétrica quebra inspeção stateful."
    },
    {
      "step": 4,
      "actor": "Spoke B",
      "action": "Recebe tráfego e aplica controles locais.",
      "detail": "SG/NSG/NACL ainda precisam permitir o fluxo.",
      "possibleFailure": "Rota de retorno ausente ou bloqueio local impede resposta."
    }
  ],
  "deepDive": {
    "mentalModel": "Trate conectividade cloud como um mapa de caminhos autorizados. Peering é uma estrada direta entre dois pontos; transit/hub é um centro de distribuição governado. O desenho correto começa por fluxos necessários, não por conexões disponíveis.",
    "keyTerms": [
      "peering",
      "hub-spoke",
      "transit gateway",
      "virtual WAN",
      "attachment",
      "route propagation",
      "inspection hub",
      "spoke",
      "CIDR overlap"
    ],
    "limitations": [
      "Peering ponto a ponto não escala bem em ambientes com muitas redes.",
      "Serviços de trânsito gerenciado geram custo por attachment, processamento e tráfego.",
      "Centralizar inspeção aumenta governança, mas pode introduzir gargalo e blast radius no hub.",
      "Conectar redes não substitui autenticação, autorização e criptografia de aplicação."
    ],
    "whenToUse": [
      "Use peering para poucas redes com fluxo simples, bem documentado e sem necessidade de trânsito central.",
      "Use hub-spoke quando houver múltiplas redes, conectividade híbrida, serviços compartilhados e inspeção central.",
      "Use transit gerenciado quando a escala operacional justificar custo e padronização.",
      "Use private endpoints quando o objetivo for acessar um serviço específico sem abrir rede inteira."
    ],
    "whenNotToUse": [
      "Não use peering em malha grande sem governança.",
      "Não use hub central como permissão any-any entre spokes.",
      "Não use transit gateway para todo fluxo sem estimar custo e logs.",
      "Não conecte CIDRs sobrepostos sem plano de renumeração ou NAT específico."
    ],
    "operationalImpact": [
      "Exige documentação de rotas, attachments, tabelas, propagação e donos de fluxo.",
      "Exige playbooks para falha do hub, perda de rota, blackhole e rota assimétrica.",
      "Exige revisão periódica de exceções e conectividade entre spokes."
    ],
    "financialImpact": [
      "Transit Gateway, Virtual WAN, firewalls, appliances, tráfego inter-regional, NAT e logs podem gerar custo recorrente.",
      "Peering pode parecer barato, mas custo operacional aumenta com malha complexa.",
      "Inspeção central pode concentrar volume e aumentar cobrança de processamento."
    ],
    "securityImpact": [
      "Hub-spoke melhora controle, mas hub permissivo amplia impacto de comprometimento.",
      "Peering direto sem logs reduz visibilidade.",
      "Transitividade mal controlada facilita movimento lateral entre ambientes."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Assumir que peering é transitivo.",
      "whyItHappens": "Em redes físicas, alunos imaginam que se A alcança B e B alcança C, então A alcança C.",
      "consequence": "Arquitetura falha ou cria caminhos inesperados por workarounds perigosos.",
      "correction": "Verifique a documentação do provedor e desenhe trânsito explicitamente com hub ou serviço apropriado."
    },
    {
      "mistake": "Usar hub-spoke como rede plana centralizada.",
      "whyItHappens": "O time quer reduzir chamados liberando tudo no hub.",
      "consequence": "Movimento lateral e auditoria fraca.",
      "correction": "Use matriz de fluxos, menor privilégio, firewall, logs e revisão."
    },
    {
      "mistake": "Ignorar custo de processamento e tráfego.",
      "whyItHappens": "A conexão lógica parece apenas uma rota.",
      "consequence": "Conta cloud aumenta com trânsito, logs e appliances.",
      "correction": "Estime custo antes, use tags e monitore tráfego por domínio."
    },
    {
      "mistake": "Criar peerings sem IPAM.",
      "whyItHappens": "Times escolhem CIDRs localmente.",
      "consequence": "Sobreposição impede conectividade e força renumeração.",
      "correction": "Adote IPAM, reservas por região/ambiente e validação em pipeline."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Spoke A não acessa Spoke B.",
      "Tráfego funciona em um sentido, mas resposta falha.",
      "Flow logs mostram rejeição no hub.",
      "Firewall central não vê tráfego esperado.",
      "Custo de trânsito subiu sem mudança aparente.",
      "Ambiente de dev alcança produção indevidamente."
    ],
    "diagnosticQuestions": [
      "Existe rota de ida e de volta?",
      "O tráfego passa pelo hub ou por peering direto?",
      "O peering suporta o tipo de trânsito esperado?",
      "Há CIDR sobreposto?",
      "Security groups/NSGs e firewall permitem o fluxo?",
      "Os logs estão habilitados no ponto certo?"
    ],
    "commands": [
      {
        "platform": "AWS",
        "command": "aws ec2 describe-transit-gateway-attachments && aws ec2 describe-route-tables",
        "purpose": "Listar attachments e route tables relevantes.",
        "expectedObservation": "Attachments available e rotas para CIDRs remotos.",
        "interpretation": "Sem attachment ou rota correta, o tráfego não terá caminho."
      },
      {
        "platform": "Azure",
        "command": "az network vnet peering list --resource-group <rg> --vnet-name <vnet> && az network nic show-effective-route-table --ids <nic-id>",
        "purpose": "Ver peerings e rotas efetivas.",
        "expectedObservation": "Peering conectado e rota efetiva para o destino.",
        "interpretation": "Rotas efetivas mostram se UDR, peering ou Virtual WAN estão influenciando o caminho."
      },
      {
        "platform": "Google Cloud",
        "command": "gcloud compute networks peerings list --network=<network> && gcloud compute routes list",
        "purpose": "Ver peerings e rotas VPC.",
        "expectedObservation": "Peering active e rota para prefixos esperados.",
        "interpretation": "Ausência de rotas ou peering inativo explica falha de conectividade."
      },
      {
        "platform": "Linux",
        "command": "traceroute <ip-destino> || tracepath <ip-destino>",
        "purpose": "Observar caminho aproximado quando permitido.",
        "expectedObservation": "Saltos coerentes com hub/firewall ou peering.",
        "interpretation": "Caminho inesperado sugere rota diferente da arquitetura planejada."
      }
    ],
    "decisionTree": [
      {
        "if": "Não há conectividade entre spokes",
        "then": "Verificar CIDR, peering/attachment, route tables dos dois lados e SG/NSG."
      },
      {
        "if": "Só ida funciona",
        "then": "Investigar rota de retorno, firewall stateful e assimetria."
      },
      {
        "if": "Firewall central não registra tráfego",
        "then": "Verificar se a rota está bypassando o hub por peering direto."
      },
      {
        "if": "Custo aumentou",
        "then": "Correlacionar métricas de bytes por attachment, logs, egress e tráfego inter-regional."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Planejar CIDRs com IPAM antes de conectar redes.",
      "Usar hub-spoke para ambientes com muitas redes e necessidade de inspeção.",
      "Documentar matriz de fluxos entre spokes.",
      "Habilitar flow logs e logs de firewall nos caminhos críticos.",
      "Bloquear spoke-to-spoke por padrão e liberar apenas fluxos justificados.",
      "Validar rotas e políticas em pipeline antes do deploy."
    ],
    "badPractices": [
      "Criar peering emergencial sem registro e sem expiração.",
      "Permitir propagação ampla de rotas sem filtro.",
      "Usar transit hub como any-any entre ambientes.",
      "Ignorar tráfego de retorno e assimetria.",
      "Conectar desenvolvimento e produção sem controles de identidade e logging."
    ],
    "commonErrors": [
      "Confundir rota com permissão.",
      "Confundir peering com transit gateway.",
      "Achar que firewall central vê tráfego que passa por peering direto.",
      "Não considerar custo de processamento por GB."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por trânsito amplo",
        "description": "Spokes alcançam redes críticas por rotas e políticas permissivas.",
        "defensiveExplanation": "Um atacante que compromete um workload pode procurar serviços em outros spokes se a arquitetura permitir.",
        "mitigation": "Deny by default, matriz de fluxos, inspeção central, SG/NSG estritos e logs."
      },
      {
        "name": "Bypass de inspeção por peering direto",
        "description": "Um peering criado fora do padrão permite tráfego sem passar pelo firewall central.",
        "defensiveExplanation": "A telemetria fica incompleta e controles esperados não são aplicados.",
        "mitigation": "Policy as code, inventário de peerings, route analysis e alertas de drift."
      },
      {
        "name": "CIDR sobreposto",
        "description": "Redes com prefixos iguais ou conflitantes não roteiam corretamente.",
        "defensiveExplanation": "Pode gerar falha, workaround inseguro ou NAT desnecessariamente complexo.",
        "mitigation": "IPAM, validação de CIDR em pipeline e governança de endereçamento."
      }
    ],
    "monitoring": [
      "Flow logs por VPC/VNet/subnet.",
      "Logs de firewall central.",
      "Métricas de Transit Gateway, Virtual WAN ou hub equivalente.",
      "Alertas de criação de peering/attachment.",
      "Custo por attachment e tráfego inter-regional."
    ],
    "hardening": [
      "Separar route tables por domínio.",
      "Desabilitar propagação automática quando não for necessária.",
      "Usar tags obrigatórias de dono, ambiente e finalidade.",
      "Revisar rotas e peerings periodicamente.",
      "Bloquear rotas amplas para ambientes sensíveis."
    ],
    "detectionIdeas": [
      "Alerta quando um spoke de dev alcança produção.",
      "Alerta para novo peering fora de change window.",
      "Detecção de tráfego leste-oeste incomum entre spokes.",
      "Correlação entre custo de transit e volume anômalo de bytes."
    ]
  },
  "lab": {
    "id": "lab-14.9",
    "title": "Desenhar uma arquitetura hub-spoke defensiva sem custo cloud",
    "labType": "cloud",
    "objective": "Criar um desenho de conectividade multi-VPC/VNet com decisões explícitas de peering, trânsito, inspeção, logs e custo.",
    "scenario": "Uma empresa tem quatro ambientes cloud: produção, dados, desenvolvimento e observabilidade. Ela também possui datacenter conectado por VPN/link dedicado. O objetivo é permitir fluxos mínimos necessários sem criar malha insegura.",
    "topology": "Datacenter -> hub cloud -> spokes de produção, dados, desenvolvimento e observabilidade; alguns fluxos diretos são proibidos.",
    "architecture": "Hub central com transit gateway/Virtual WAN/equivalente, firewall, DNS resolver e SIEM. Spokes isolados por ambiente e função.",
    "prerequisites": [
      "Ter estudado VPC/VNet, CIDR, route tables, security groups/NSGs e conectividade híbrida.",
      "Ter editor de texto, planilha ou ferramenta de desenho simples."
    ],
    "tools": [
      "Editor de texto",
      "Planilha",
      "Opcional: diagrams.net offline ou papel",
      "Opcional: CLI cloud apenas para leitura se houver ambiente autorizado"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não criar recursos cloud reais neste laboratório.",
      "Não conectar ambientes reais sem aprovação formal.",
      "Não usar CIDRs ou nomes reais da empresa em materiais compartilhados.",
      "O objetivo é desenho defensivo e revisão arquitetural.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir redes e CIDRs",
        "instruction": "Liste os ambientes e atribua CIDRs não sobrepostos.",
        "command": "Produção: 10.10.0.0/16\nDados: 10.20.0.0/16\nDesenvolvimento: 10.30.0.0/16\nObservabilidade: 10.40.0.0/16\nDatacenter: 172.16.0.0/16",
        "expectedOutput": "Tabela de redes sem sobreposição.",
        "explanation": "Sem endereçamento coerente, peering e trânsito privado ficam frágeis."
      },
      {
        "number": 2,
        "title": "Classificar domínios de confiança",
        "instruction": "Classifique cada spoke por criticidade e sensibilidade.",
        "command": "Produção=alta\nDados=muito alta\nDesenvolvimento=média\nObservabilidade=alta\nDatacenter=alta",
        "expectedOutput": "Lista de zonas e criticidade.",
        "explanation": "Domínios de confiança orientam rotas, inspeção e políticas."
      },
      {
        "number": 3,
        "title": "Escolher peering ou hub",
        "instruction": "Decida quais conexões serão diretas e quais passarão pelo hub.",
        "command": "Produção -> Dados: hub com inspeção\nProdução -> Observabilidade: hub\nDev -> Produção: bloqueado por padrão\nDatacenter -> Produção: hub com firewall",
        "expectedOutput": "Matriz de conectividade inicial.",
        "explanation": "A decisão deve seguir risco e necessidade, não conveniência."
      },
      {
        "number": 4,
        "title": "Criar matriz de fluxos",
        "instruction": "Para cada fluxo permitido, registre origem, destino, porta, protocolo, justificativa e dono.",
        "command": "Origem,Destino,Porta,Protocolo,Justificativa,Dono\nProd-app,Dados-db,5432,TCP,Consulta transacional,Time App\nProd-app,Obs-collector,443,TCP,Envio de métricas,SRE",
        "expectedOutput": "Matriz auditável de fluxos.",
        "explanation": "Sem matriz, regras viram exceções eternas."
      },
      {
        "number": 5,
        "title": "Definir inspeção e logs",
        "instruction": "Indique quais fluxos passam por firewall, quais geram flow logs e quais alertas vão ao SIEM.",
        "command": "Fluxos entre spokes críticos: firewall central + flow logs + SIEM\nFluxos de observabilidade: logs por serviço + métricas de volume\nNovos peerings: alerta de governança",
        "expectedOutput": "Plano de telemetria.",
        "explanation": "Conectividade sem visibilidade reduz capacidade de detecção."
      },
      {
        "number": 6,
        "title": "Mapear custos",
        "instruction": "Liste custos esperados por serviço, mesmo sem calcular valores exatos.",
        "command": "Custos: attachment/hub, processamento por GB, firewall, logs, tráfego inter-regional, storage de logs",
        "expectedOutput": "Lista de direcionadores de custo.",
        "explanation": "Arquitetura de trânsito pode concentrar cobrança e precisa de tags."
      },
      {
        "number": 7,
        "title": "Criar plano de troubleshooting",
        "instruction": "Defina como investigar falha entre dois spokes.",
        "command": "1. Validar CIDR\n2. Validar route table de origem\n3. Validar hub/transit route table\n4. Validar firewall\n5. Validar route table de destino\n6. Validar SG/NSG\n7. Validar logs",
        "expectedOutput": "Playbook de investigação.",
        "explanation": "O playbook evita tentativa e erro durante incidente."
      }
    ],
    "expectedResult": "Ao final, o aluno terá uma arquitetura hub-spoke documentada com CIDRs, matriz de fluxos, decisão de peering/transit, plano de logs, custos e troubleshooting.",
    "validation": [
      {
        "check": "CIDRs não se sobrepõem",
        "command": "Revisar tabela de endereçamento",
        "expected": "Nenhum bloco duplicado ou contido indevidamente em outro.",
        "ifFails": "Redesenhar IPAM antes de qualquer conexão."
      },
      {
        "check": "Fluxos proibidos estão explícitos",
        "command": "Revisar matriz de fluxos",
        "expected": "Dev não acessa produção diretamente; dados não recebem tráfego amplo.",
        "ifFails": "Adicionar negações e justificativas."
      },
      {
        "check": "Caminhos críticos têm logs",
        "command": "Revisar plano de telemetria",
        "expected": "Firewall logs e flow logs habilitados para caminhos sensíveis.",
        "ifFails": "Adicionar ponto de coleta ou mudar caminho pelo hub."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Spoke A não alcança Spoke B",
        "probableCause": "Rota ausente, propagação desabilitada ou SG/NSG bloqueando.",
        "howToConfirm": "Revisar route tables e matriz de fluxos.",
        "fix": "Adicionar rota/política justificada ou manter bloqueio se o fluxo não for aprovado."
      },
      {
        "symptom": "Firewall central não vê tráfego",
        "probableCause": "Peering direto bypassando hub.",
        "howToConfirm": "Analisar route table de origem e destino.",
        "fix": "Remover rota direta ou forçar caminho pelo hub quando inspeção for exigida."
      },
      {
        "symptom": "Custo alto no hub",
        "probableCause": "Tráfego volumoso passando por transit/firewall sem necessidade.",
        "howToConfirm": "Métricas por attachment, tags e flow logs.",
        "fix": "Reavaliar arquitetura, compressão, localização regional, CDN, private endpoints ou peering direto justificado."
      }
    ],
    "improvements": [
      "Adicionar política como código para bloquear CIDR sobreposto.",
      "Criar alertas para peerings não aprovados.",
      "Criar dashboard de custo por spoke.",
      "Adicionar teste automatizado de rotas esperadas.",
      "Criar revisão trimestral de matriz de fluxos."
    ],
    "evidenceToCollect": [
      "Tabela de CIDRs",
      "Diagrama hub-spoke",
      "Matriz de fluxos",
      "Plano de logs",
      "Plano de custos",
      "Playbook de troubleshooting"
    ],
    "questions": [
      "Quais fluxos realmente precisam existir?",
      "Quais fluxos devem passar por inspeção?",
      "Onde há maior risco de movimento lateral?",
      "Quais custos aumentam com centralização?",
      "Como detectar peering fora de padrão?"
    ],
    "challenge": "Adapte o desenho para três regiões, mantendo produção isolada e permitindo DR sem liberar tráfego any-any.",
    "solution": "Use hubs regionais, conectividade inter-regional controlada, rotas específicas, firewall em caminhos críticos, DNS planejado, replicação autorizada e logs centralizados. Evite assumir que todo spoke regional deve alcançar todos os demais."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que peering direto parece simples no começo, mas pode virar problema em escala?",
      "hints": [
        "Pense no número de relações.",
        "Pense em logs e troubleshooting."
      ],
      "expectedIdeas": [
        "malha",
        "rotas",
        "governança",
        "visibilidade",
        "custo operacional"
      ],
      "explanation": "O problema não é o peering em si, mas usá-lo como padrão universal sem governança."
    },
    {
      "type": "diagnóstico",
      "question": "Spoke A não acessa Spoke C, mas ambos têm peering com Spoke B. Qual hipótese vem primeiro?",
      "hints": [
        "Peering é necessariamente transitivo?",
        "Existe hub de trânsito?"
      ],
      "expectedIdeas": [
        "não transitividade",
        "rotas",
        "hub",
        "tabelas",
        "políticas"
      ],
      "explanation": "Em muitos provedores, peering ponto a ponto não cria trânsito automático entre terceiros."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer que desenvolvimento acesse produção para facilitar testes. Como responder arquiteturalmente?",
      "hints": [
        "Pense em menor privilégio.",
        "Pense em alternativa por API, dados mascarados e pipeline."
      ],
      "expectedIdeas": [
        "bloqueio por padrão",
        "acesso temporário",
        "aprovação",
        "logs",
        "dados mascarados",
        "ambiente de homologação"
      ],
      "explanation": "Facilidade operacional não justifica conectividade ampla entre ambientes de risco diferente."
    }
  ],
  "quiz": [
    {
      "id": "q14.9.1",
      "type": "conceito",
      "q": "Qual é a principal diferença entre peering ponto a ponto e arquitetura hub-spoke?",
      "opts": [
        "Peering conecta pares diretamente; hub-spoke centraliza conectividade e serviços compartilhados.",
        "Peering sempre é mais seguro que hub-spoke.",
        "Hub-spoke elimina a necessidade de rotas.",
        "Peering só existe em redes on-premises."
      ],
      "a": 0,
      "exp": "Peering é uma relação entre redes; hub-spoke organiza múltiplas redes em torno de um ponto central de trânsito, segurança e operação.",
      "difficulty": "intermediário",
      "topic": "peering"
    },
    {
      "id": "q14.9.2",
      "type": "diagnóstico",
      "q": "Se VPC A é pareada com VPC B e VPC B é pareada com VPC C, o que você deve assumir?",
      "opts": [
        "A alcança C automaticamente.",
        "A não deve ser considerada conectada a C sem suporte explícito de trânsito.",
        "BGP sempre resolve a transitividade.",
        "Security group substitui route table."
      ],
      "a": 1,
      "exp": "Peering simples frequentemente não oferece transitividade. É necessário verificar suporte e desenho de trânsito.",
      "difficulty": "intermediário",
      "topic": "transitividade"
    },
    {
      "id": "q14.9.3",
      "type": "segurança",
      "q": "Qual é o risco de permitir spoke-to-spoke amplo por um hub central?",
      "opts": [
        "Reduzir demais a superfície de ataque.",
        "Facilitar movimento lateral entre ambientes.",
        "Impedir qualquer tráfego legítimo.",
        "Eliminar custos de rede."
      ],
      "a": 1,
      "exp": "Hub central permissivo pode transformar a rede cloud em uma rede plana com trânsito amplo.",
      "difficulty": "avançado",
      "topic": "segurança"
    },
    {
      "id": "q14.9.4",
      "type": "custos",
      "q": "Qual custo pode aparecer em arquiteturas de trânsito cloud?",
      "opts": [
        "Somente custo de DNS público.",
        "Attachment, processamento por GB, tráfego inter-regional, firewall e logs.",
        "Nenhum custo, porque rotas são virtuais.",
        "Somente custo de VM."
      ],
      "a": 1,
      "exp": "Serviços de trânsito, appliances, logs e tráfego podem gerar cobrança relevante.",
      "difficulty": "intermediário",
      "topic": "custos"
    },
    {
      "id": "q14.9.5",
      "type": "troubleshooting",
      "q": "Firewall central não registra tráfego entre dois spokes, mas a comunicação funciona. Qual hipótese é forte?",
      "opts": [
        "O firewall está registrando em outra cor.",
        "Existe caminho direto ou peering bypassando o hub.",
        "DNS sempre está errado.",
        "TLS impede logs de rede."
      ],
      "a": 1,
      "exp": "Se tráfego funciona mas não aparece no firewall central, pode estar seguindo caminho alternativo.",
      "difficulty": "avançado",
      "topic": "troubleshooting"
    },
    {
      "id": "q14.9.6",
      "type": "arquitetura",
      "q": "Quando o peering direto tende a ser uma boa escolha?",
      "opts": [
        "Quando há dezenas de redes e inspeção central obrigatória.",
        "Quando há duas redes com fluxo claro, baixo risco e boa documentação.",
        "Quando existe CIDR sobreposto.",
        "Quando se deseja trânsito entre todos os ambientes."
      ],
      "a": 1,
      "exp": "Peering direto pode ser adequado em cenários simples e bem controlados.",
      "difficulty": "intermediário",
      "topic": "decisão"
    }
  ],
  "flashcards": [
    {
      "id": "fc14.9.1",
      "front": "O que é peering cloud?",
      "back": "Conexão privada entre duas redes virtuais para rotear tráfego por IP privado.",
      "tags": [
        "peering"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.9.2",
      "front": "Peering é automaticamente transitivo?",
      "back": "Não. Em geral, não se deve assumir transitividade sem suporte explícito e desenho de rotas.",
      "tags": [
        "transitividade"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.9.3",
      "front": "O que é hub-spoke?",
      "back": "Padrão em que spokes de aplicação se conectam a um hub central de conectividade, segurança e serviços compartilhados.",
      "tags": [
        "hub-spoke"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.9.4",
      "front": "Qual risco de um hub permissivo?",
      "back": "Ele pode permitir movimento lateral amplo entre ambientes e aumentar blast radius.",
      "tags": [
        "segurança"
      ],
      "difficulty": "avançado"
    },
    {
      "id": "fc14.9.5",
      "front": "O que é attachment em serviços de trânsito?",
      "back": "É a associação de uma rede, VPN, link ou recurso ao hub/transit para participar do roteamento.",
      "tags": [
        "transit gateway"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.9.6",
      "front": "Por que IPAM importa em peering/transit?",
      "back": "Porque CIDRs sobrepostos impedem roteamento privado correto e podem exigir renumeração cara.",
      "tags": [
        "ipam",
        "cidr"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex14.9.1",
      "type": "conceitual",
      "prompt": "Explique por que uma malha de peerings fica difícil de operar conforme o número de redes aumenta.",
      "expectedAnswer": "Porque cada nova rede pode exigir múltiplas relações, rotas, regras, logs e revisões. A complexidade cresce rapidamente e aumenta risco de erro.",
      "explanation": "O problema é escala operacional e governança, não apenas tecnologia."
    },
    {
      "id": "ex14.9.2",
      "type": "arquitetura",
      "prompt": "Você tem produção, dados, dev e observabilidade. Quais fluxos passariam pelo hub?",
      "expectedAnswer": "Fluxos críticos como produção-dados, datacenter-produção e dev-produção quando excepcionalmente aprovados devem passar por hub/firewall/logs; observabilidade pode receber dados de produção por fluxos específicos.",
      "explanation": "A decisão depende de risco e necessidade, mas fluxos sensíveis exigem inspeção e evidência."
    },
    {
      "id": "ex14.9.3",
      "type": "diagnóstico",
      "prompt": "A aplicação em produção acessa dados, mas o firewall central não vê o tráfego. Liste três hipóteses.",
      "expectedAnswer": "Peering direto bypassando hub; rota mais específica apontando para caminho alternativo; logs do firewall incorretos/desabilitados; tráfego indo por endpoint privado específico.",
      "explanation": "Antes de concluir falha de logging, valide caminho efetivo."
    },
    {
      "id": "ex14.9.4",
      "type": "custos",
      "prompt": "Liste quatro direcionadores de custo em arquitetura com transit gateway ou Virtual WAN.",
      "expectedAnswer": "Attachments, processamento por GB, tráfego inter-regional, firewall/NVA, logs, NAT, VPN/link dedicado e armazenamento de logs.",
      "explanation": "Redes cloud têm custo recorrente por tráfego e serviços gerenciados."
    }
  ],
  "challenge": {
    "title": "Desenhe conectividade para uma landing zone com cinco spokes",
    "scenario": "Uma empresa terá spokes de produção, dados, desenvolvimento, observabilidade e segurança, além de datacenter conectado por VPN e link dedicado.",
    "tasks": [
      "Definir CIDRs não sobrepostos.",
      "Escolher quais conexões usam hub/transit e quais usam peering direto, se houver.",
      "Criar matriz de fluxos permitidos e negados.",
      "Indicar onde ficam firewall, DNS privado, bastion, logs e SIEM.",
      "Listar riscos residuais e custos."
    ],
    "constraints": [
      "Desenvolvimento não pode acessar produção diretamente.",
      "Dados só aceitam conexões de aplicações autorizadas.",
      "Todos os fluxos críticos precisam de logs.",
      "Datacenter não pode alcançar todos os spokes por padrão."
    ],
    "expectedDeliverables": [
      "Diagrama hub-spoke",
      "Tabela de CIDRs",
      "Matriz de fluxos",
      "Plano de logs",
      "Plano de custo",
      "Playbook de troubleshooting"
    ],
    "gradingRubric": [
      {
        "criterion": "Segmentação e menor privilégio",
        "points": 30,
        "description": "Fluxos são específicos e justificados."
      },
      {
        "criterion": "Roteamento e conectividade",
        "points": 25,
        "description": "Rotas de ida e volta são coerentes e sem CIDR sobreposto."
      },
      {
        "criterion": "Segurança e logs",
        "points": 25,
        "description": "Inspeção e evidências existem nos caminhos críticos."
      },
      {
        "criterion": "Custo e operação",
        "points": 20,
        "description": "Custos e troubleshooting foram considerados."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Começamos identificando domínios de confiança e fluxos de negócio. Depois escolhemos trânsito central para caminhos críticos e evitamos peering direto onde ele reduza visibilidade. Em seguida, validamos CIDRs, rotas, políticas e logs.",
    "steps": [
      "Reservar CIDRs com IPAM.",
      "Separar spokes por ambiente e criticidade.",
      "Definir hub de conectividade e segurança.",
      "Criar matriz de fluxos mínimos.",
      "Forçar inspeção em caminhos críticos.",
      "Habilitar logs e tags de custo.",
      "Criar playbook de falha e revisão periódica."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Criar peering entre todos os spokes.",
        "whyItIsWrong": "Escala mal, reduz visibilidade e aumenta risco de movimento lateral."
      },
      {
        "answer": "Mandar todo tráfego para o hub sem exceção nem estimativa.",
        "whyItIsWrong": "Pode criar gargalo, custo alto e dependência crítica sem necessidade."
      },
      {
        "answer": "Permitir dev acessar produção para facilitar testes.",
        "whyItIsWrong": "Quebra separação de ambientes e aumenta risco operacional e de segurança."
      }
    ],
    "finalAnswer": "Uma solução equilibrada usa hub central com firewall, DNS privado, logs e conectividade híbrida; spokes separados por função; rotas específicas; bloqueio por padrão entre ambientes; fluxos críticos inspecionados; observabilidade centralizada; tags de custo; e validação de CIDR/rota/política em pipeline."
  },
  "glossary": [
    {
      "term": "Peering",
      "shortDefinition": "Conexão privada entre duas redes virtuais.",
      "longDefinition": "Permite que recursos em duas redes virtuais troquem tráfego por IP privado, respeitando rotas e controles de segurança.",
      "example": "VPC de aplicação pareada com VPC de dados.",
      "relatedTerms": [
        "VPC",
        "VNet",
        "route table"
      ],
      "relatedLessons": [
        "14.3",
        "14.4"
      ]
    },
    {
      "term": "Hub-spoke",
      "shortDefinition": "Topologia com rede central e redes de aplicação conectadas a ela.",
      "longDefinition": "O hub concentra conectividade, segurança e serviços compartilhados; os spokes hospedam workloads ou domínios específicos.",
      "example": "Hub com firewall e VPN conectando spokes de produção e dados.",
      "relatedTerms": [
        "hub",
        "spoke",
        "firewall"
      ],
      "relatedLessons": [
        "13.10",
        "14.8"
      ]
    },
    {
      "term": "Transit Gateway",
      "shortDefinition": "Serviço de trânsito cloud para interconectar VPCs e redes on-premises.",
      "longDefinition": "Funciona como hub de roteamento gerenciado para múltiplos attachments, rotas e domínios de conectividade.",
      "example": "AWS Transit Gateway conectando VPCs e VPNs.",
      "relatedTerms": [
        "attachment",
        "route propagation"
      ],
      "relatedLessons": [
        "14.8"
      ]
    },
    {
      "term": "Virtual WAN",
      "shortDefinition": "Serviço Azure para conectividade, roteamento e segurança em escala.",
      "longDefinition": "Fornece hubs gerenciados para conectar VNets, branches, usuários remotos e serviços de segurança.",
      "example": "Azure Virtual WAN conectando VNets e filiais.",
      "relatedTerms": [
        "Azure",
        "hub"
      ],
      "relatedLessons": [
        "14.8"
      ]
    },
    {
      "term": "Transitividade",
      "shortDefinition": "Capacidade de uma rede alcançar outra por meio de uma terceira.",
      "longDefinition": "Em peering cloud, transitividade geralmente não deve ser assumida sem serviço de trânsito ou configuração explícita.",
      "example": "A-B e B-C não significam necessariamente A-C.",
      "relatedTerms": [
        "peering",
        "roteamento"
      ],
      "relatedLessons": [
        "11.x",
        "14.4"
      ]
    },
    {
      "term": "Attachment",
      "shortDefinition": "Vínculo de uma rede ou conexão a um serviço de trânsito.",
      "longDefinition": "Representa a associação de VPC, VPN, link ou componente ao hub/transit para participar do roteamento.",
      "example": "VPC attachment em um Transit Gateway.",
      "relatedTerms": [
        "hub",
        "transit gateway"
      ],
      "relatedLessons": [
        "14.8"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "What is AWS Transit Gateway?",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html",
      "note": "Define Transit Gateway como hub de trânsito para VPCs e redes on-premises."
    },
    {
      "type": "official-doc",
      "title": "How VPC peering connections work",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html",
      "note": "Documenta relação um-para-um e ausência de transitividade em VPC peering."
    },
    {
      "type": "official-doc",
      "title": "Azure Virtual WAN documentation",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/virtual-wan/",
      "note": "Descreve Virtual WAN como serviço de rede com conectividade, segurança e roteamento."
    },
    {
      "type": "official-doc",
      "title": "Hub-spoke network topology in Azure",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/architecture/networking/architecture/hub-spoke",
      "note": "Referência para topologia hub-spoke no Azure."
    },
    {
      "type": "official-doc",
      "title": "VPC Network Peering",
      "organization": "Google Cloud",
      "url": "https://cloud.google.com/vpc/docs/vpc-peering",
      "note": "Referência para peering entre redes VPC e suas limitações."
    },
    {
      "type": "official-doc",
      "title": "AWS Transit Gateway pricing",
      "organization": "AWS",
      "url": "https://aws.amazon.com/transit-gateway/pricing/",
      "note": "Referência de cobrança por processamento de dados e attachments."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.x",
      "reason": "Peering e transit dependem de roteamento, rotas mais específicas e troubleshooting de caminhos."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Hub-spoke precisa de segmentação e redução de movimento lateral."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m12",
      "lesson": "IaC e pipelines",
      "reason": "Conectividade cloud deve ser versionada, revisada e validada por automação."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM",
      "lesson": "Zero Trust",
      "reason": "Conectividade privada deve ser combinada com identidade, contexto e menor privilégio."
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
  "pedagogicalMap": {
    "problem": "Múltiplas redes cloud precisam se conectar sem virar malha insegura.",
    "concept": "Peering conecta pares; hub/transit organiza conectividade em escala.",
    "internalMechanism": "Rotas, attachments, propagação, tabelas, controles e logs definem o caminho real.",
    "realUse": "Landing zones corporativas, conectividade híbrida e multi-conta.",
    "commonMistake": "Assumir transitividade em peering ou liberar any-any no hub.",
    "securityImpact": "Trânsito amplo aumenta movimento lateral; hub com inspeção melhora controle quando bem desenhado.",
    "operationalImpact": "Exige IPAM, documentação, tags, logs, playbooks e revisão de custos.",
    "summary": "Conectar redes é fácil; governar caminhos, custos e permissões é a parte profissional."
  },
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
      "14.10"
    ]
  }
};
