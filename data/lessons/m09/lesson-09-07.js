export const lesson0907 = {
  "id": "9.7",
  "moduleId": "m09",
  "order": 7,
  "title": "Security groups, NACLs e firewalls em cloud",
  "subtitle": "Entenda como os conceitos de firewall, ACL, zonas, segmentação e publicação controlada aparecem em ambientes cloud usando VPCs, VNets, subnets, security groups, NACLs/NSGs, firewalls gerenciados e logs de fluxo.",
  "duration": "125-185 min",
  "estimatedStudyTimeMinutes": 185,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 285,
  "tags": [
    "redes",
    "network",
    "cloud",
    "firewall",
    "security groups",
    "NACL",
    "NSG",
    "VPC",
    "VNet",
    "subnet",
    "cloud firewall",
    "flow logs",
    "DevSecOps",
    "segurança",
    "troubleshooting",
    "p1-07",
    "firewall-lab-v2-final"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.6",
      "title": "IPv4 público, privado, loopback e APIPA",
      "reason": "Cloud separa recursos por endereçamento privado, público e subnets."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.6",
      "title": "VLSM: sub-redes de tamanhos diferentes",
      "reason": "VPCs e VNets usam subnets como unidade de desenho e controle."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "title": "Gateway padrão e rota local",
      "reason": "Controles cloud só fazem sentido quando combinados com route tables e gateways."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.2",
      "title": "ACLs, regras e ordem de processamento",
      "reason": "NACLs, NSGs e regras de firewall seguem lógica de avaliação por política."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.3",
      "title": "Firewalls stateless vs stateful",
      "reason": "Security groups e listas por subnet costumam diferir justamente em estado e direção."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.5",
      "title": "NAT, port forwarding e publicação controlada",
      "reason": "Cloud usa NAT Gateways, load balancers públicos e IPs públicos para controlar saída e entrada."
    }
  ],
  "objectives": [
    "Explicar como VPCs, VNets, subnets, route tables, gateways e workloads formam a rede cloud.",
    "Diferenciar security groups, NACLs, NSGs, firewalls gerenciados, WAFs e controles de endpoint privado.",
    "Relacionar controles stateful e stateless com tráfego de ida, retorno, portas efêmeras e troubleshooting.",
    "Desenhar uma arquitetura cloud com subnets públicas, privadas, administração protegida, saída controlada e backend sem exposição direta.",
    "Aplicar governança de regras em cloud com IaC, tags, donos, justificativas, validade, revisão e logs.",
    "Diagnosticar bloqueios e exposições usando route tables, flow logs, logs de firewall, logs de load balancer e testes de conectividade."
  ],
  "learningOutcomes": [
    "Ler uma política cloud e identificar se o controle está no nível da instância, subnet, firewall central, WAF ou gateway.",
    "Explicar por que security group stateful não se comporta como NACL stateless.",
    "Identificar exposição pública indevida em VMs, bancos, buckets, endpoints administrativos e APIs.",
    "Criar uma matriz de fluxo para ambiente cloud separando Internet, DMZ, aplicação, banco, administração e saída para terceiros.",
    "Selecionar evidências corretas para troubleshooting: rotas, regras, logs, contadores, captura, DNS e teste na porta.",
    "Descrever como DevSecOps transforma regra manual em política versionada, revisável e automatizada."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Em redes tradicionais, muita gente imagina um grande firewall físico entre a empresa e a Internet. Em cloud, essa imagem fica incompleta. O controle de tráfego passa a ser distribuído: existe regra na instância, regra na subnet, rota na tabela, NAT Gateway, load balancer, WAF, firewall gerenciado, endpoint privado, política de identidade, service mesh e logs de fluxo.</p>\n  <p>Isso é poderoso porque permite automação e granularidade. Também é perigoso porque uma única regra permissiva, um IP público esquecido, uma rota para Internet Gateway ou um security group reaproveitado pode expor um banco de dados, uma VM administrativa ou uma API interna.</p>\n  <div class='callout'><strong>Ideia central:</strong> em cloud, firewall não é um único equipamento. É uma composição de controles distribuídos que precisam concordar entre si: identidade, rede, rota, regra, publicação, logging e governança.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No datacenter clássico, redes eram segmentadas por VLANs, firewalls físicos, roteadores, DMZs e appliances especializados. Criar uma nova zona ou regra podia depender de chamado, mudança formal, cabeamento lógico e janelas de manutenção.</p>\n  <p>Com cloud pública, provedores passaram a oferecer redes virtuais programáveis. Surgiram VPCs, VNets, subnets, route tables, security groups, NACLs, NSGs, gateways, load balancers e firewalls gerenciados. O desenho de rede deixou de ser apenas configuração de equipamento e virou também código, template, módulo Terraform, política de pipeline e auditoria contínua.</p>\n  <p>A evolução trouxe uma mudança cultural: equipes de plataforma e DevSecOps precisam entregar autonomia sem permitir exposição acidental. Por isso, controles cloud modernos combinam política preventiva, detecção, logs, guardrails e revisão automatizada.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema em cloud é que conectividade pode ser criada muito rápido. Um desenvolvedor pode subir uma VM com IP público, abrir <code>0.0.0.0/0</code> para SSH, publicar um banco por engano, permitir saída irrestrita para qualquer destino ou duplicar um security group antigo sem entender o impacto.</p>\n  <p>Além disso, falhas de tráfego podem ser difíceis de diagnosticar porque vários controles precisam permitir o caminho ao mesmo tempo: DNS resolve? A rota aponta para o gateway correto? A subnet permite? O security group permite? O firewall central permite? O load balancer está saudável? O backend responde? O retorno segue o caminho esperado?</p>\n  <div class='callout callout--problem'><strong>Problema clássico:</strong> a aplicação está em subnet privada, mas não acessa uma API externa. A equipe abre portas no security group, mas esquece que a route table não tem caminho para NAT Gateway. O erro não era a regra da instância; era o caminho de saída.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <table class='comparison-table'>\n    <thead><tr><th>Modelo</th><th>Controle principal</th><th>Vantagem</th><th>Risco operacional</th></tr></thead>\n    <tbody>\n      <tr><td>Datacenter tradicional</td><td>Firewall físico e VLANs</td><td>Centralização e perímetro claro</td><td>Mudanças lentas e dependência de times especializados</td></tr>\n      <tr><td>Cloud inicial</td><td>Security group e subnet</td><td>Agilidade e autosserviço</td><td>Exposição acidental por regra ampla ou IP público</td></tr>\n      <tr><td>Cloud corporativa</td><td>Hub-spoke, firewall central, WAF e logs</td><td>Controle padronizado e observabilidade</td><td>Complexidade de rotas, exceções e múltiplas contas/projetos</td></tr>\n      <tr><td>DevSecOps</td><td>Infra as Code e policy as code</td><td>Revisão, automação e rastreabilidade</td><td>Templates ruins propagam erro em escala</td></tr>\n      <tr><td>Zero Trust/cloud native</td><td>Identidade, microsegmentação e endpoints privados</td><td>Menos confiança implícita na rede</td><td>Requer maturidade de identidade, logs e operação</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>Security group</strong> é um controle associado a um recurso ou interface de rede. Ele costuma funcionar como firewall stateful: se a ida é permitida, o retorno correspondente é aceito automaticamente.</p>\n  <p><strong>NACL</strong>, Network ACL, é um controle associado à subnet. Em muitos ambientes ele é stateless: regras de entrada e saída precisam ser planejadas separadamente, inclusive portas efêmeras de retorno.</p>\n  <p><strong>NSG</strong>, Network Security Group, termo comum em alguns provedores, pode ser aplicado a subnets e interfaces e usa prioridades de regras. A ideia central é parecida: controlar fluxo com base em origem, destino, porta, protocolo e direção.</p>\n  <p><strong>Cloud firewall</strong> ou firewall gerenciado é um controle mais centralizado, usado para inspeção, egress control, segmentação entre redes, inspeção north-south, inspeção east-west e logging avançado.</p>\n  <div class='definition-box'>Em cloud, você deve pensar em camadas: rota define se existe caminho; security group/NSG define se o recurso aceita; NACL define se a subnet permite; firewall central inspeciona; WAF entende HTTP; IAM define quem pode mudar tudo isso.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um pacote trafega em cloud, ele não passa apenas por um cabo e um firewall físico visível. Ele atravessa uma malha virtual controlada pelo provedor. O provedor avalia metadados de rede, tabela de rotas, regras associadas à interface, regras associadas à subnet, gateways e serviços gerenciados.</p>\n  <ol class='flow-list'>\n    <li>O cliente resolve o nome público ou privado do serviço.</li>\n    <li>O tráfego chega à borda: CDN, WAF, load balancer, VPN, Direct Connect/ExpressRoute/Interconnect ou Internet Gateway.</li>\n    <li>A route table determina o próximo salto: Internet Gateway, NAT Gateway, firewall, peering, transit gateway, gateway privado ou rota local.</li>\n    <li>Controles de subnet avaliam direção, prioridade e combinação origem/destino/protocolo/porta.</li>\n    <li>Controles do recurso avaliam se aquela interface ou workload aceita o fluxo.</li>\n    <li>Firewalls gerenciados e appliances podem inspecionar o tráfego, registrar logs e aplicar regras avançadas.</li>\n    <li>O retorno precisa ter caminho válido e política compatível, especialmente quando algum controle é stateless ou há roteamento assimétrico.</li>\n  </ol>\n  <p>Por isso, troubleshooting cloud exige raciocínio por camadas: nome, rota, política de subnet, política de recurso, firewall central, serviço de publicação, estado, retorno e logs.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma arquitetura cloud segura separa subnets públicas e privadas. A subnet pública deve hospedar componentes de entrada controlada, como load balancers e gateways. A subnet privada deve hospedar aplicações, bancos, filas, caches e serviços internos sem IP público direto.</p>\n  <table class='data-table'>\n    <thead><tr><th>Controle</th><th>Onde atua</th><th>Uso típico</th><th>Cuidado</th></tr></thead>\n    <tbody>\n      <tr><td>Route table</td><td>Subnet/rede virtual</td><td>Define caminho para Internet, NAT, peering, VPN ou firewall</td><td>Rota errada pode criar bypass ou falta de retorno</td></tr>\n      <tr><td>Security group</td><td>Interface/recurso</td><td>Permitir somente portas necessárias no workload</td><td>Reuso de grupos amplos cria exposição em cascata</td></tr>\n      <tr><td>NACL/NSG</td><td>Subnet/interface, conforme provedor</td><td>Barreira adicional e controle por prioridade</td><td>Ordem, direção e portas efêmeras causam erros comuns</td></tr>\n      <tr><td>NAT Gateway</td><td>Saída de subnet privada</td><td>Permitir saída sem IP público no workload</td><td>Egress irrestrito dificulta controle e investigação</td></tr>\n      <tr><td>Cloud Firewall</td><td>Hub, borda, egress ou entre redes</td><td>Inspeção central, logs e política corporativa</td><td>Rota precisa forçar passagem por ele</td></tr>\n      <tr><td>WAF/API Gateway</td><td>Borda HTTP/API</td><td>Inspeção L7, rate limit, contrato e autenticação</td><td>Backend não pode aceitar acesso direto</td></tr>\n      <tr><td>Private endpoint</td><td>Serviços gerenciados</td><td>Acesso privado a banco, storage e APIs internas</td><td>DNS privado e política de acesso precisam estar corretos</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine um condomínio corporativo. A rua pública leva até a portaria. A portaria confere quem pode entrar. Cada prédio tem catraca. Cada andar tem porta. Cada sala tem fechadura. O sistema de câmeras registra circulação. O fato de alguém passar pela portaria não significa que pode entrar em todas as salas.</p>\n  <p>Cloud funciona de forma parecida: DNS e load balancer são a entrada, WAF é a inspeção da conversa, route table é o caminho interno, NACL/NSG controla a área, security group controla a porta da sala, cloud firewall observa corredores importantes e logs registram o movimento.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você cria uma VM Linux para laboratório. Se atribuir IP público e abrir SSH para <code>0.0.0.0/0</code>, qualquer pessoa na Internet pode tentar autenticar. Mesmo que a senha seja forte ou você use chave, a superfície fica exposta.</p>\n  <p>Um desenho melhor seria: VM sem IP público, acesso por VPN, bastion ou serviço de gerenciamento do provedor; security group permitindo SSH apenas da rede administrativa; logs de acesso; e nenhuma porta administrativa aberta para Internet.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa possui uma aplicação de atendimento ao cliente. O tráfego público chega por DNS, CDN, WAF e load balancer. O load balancer encaminha para aplicações em subnets privadas. As aplicações acessam banco em outra subnet privada. Administradores acessam por VPN e bastion. A saída para terceiros passa por firewall central com logs.</p>\n  <p>Nessa arquitetura, a política é expressa como matriz: Internet só fala com WAF/load balancer em 443; load balancer fala com app em porta específica; app fala com banco na porta do banco; administração fala com bastion; bastion fala com servidores; ninguém fala direto com banco pela Internet.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em uma VPC/VNet típica, você desenha pelo menos três áreas: subnets públicas para componentes de entrada, subnets privadas para aplicação e subnets isoladas ou altamente restritas para dados. Route tables determinam quem tem caminho para Internet, NAT, firewall, peering ou serviço privado.</p>\n  <p>Security groups/NSGs protegem workloads. NACLs e regras por subnet criam barreiras adicionais. Cloud Firewall centraliza inspeção e logs. WAF protege HTTP. Private endpoints evitam que serviços gerenciados precisem ser acessados por endereço público. Flow logs ajudam a confirmar se o tráfego foi aceito, recusado ou nem chegou.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, regras de rede cloud não deveriam ser criadas manualmente no console sem revisão. O ideal é que VPCs/VNets, subnets, route tables, security groups, firewalls, WAFs e logs estejam declarados em IaC.</p>\n  <p>O pipeline pode reprovar regras como <code>0.0.0.0/0</code> para SSH/RDP, banco com IP público, security group sem tag de dono, regra sem justificativa, porta administrativa aberta, egress irrestrito em ambiente sensível ou WAF sem logging. Mudanças passam por revisão de código, aprovação e trilha de auditoria.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Em uma investigação, o SOC recebe alerta de tentativa de conexão para uma porta de banco. A análise começa verificando se o banco tem IP público. Depois verifica security group, NACL/NSG, route table, flow logs, firewall logs e eventos de configuração. Se a tentativa foi bloqueada na subnet, o risco é diferente de uma tentativa que chegou ao banco e foi recusada pela aplicação.</p>\n  <p>Para defesa, a equipe cria guardrails: proibir banco público, exigir WAF em APIs públicas, exigir flow logs, exigir private endpoint para serviços críticos, exigir dono e validade para exceções e alertar quando uma regra ampla for criada.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> todo recurso crítico deve começar privado. Exposição pública precisa ser exceção justificada, mínima, monitorada, revisada e preferencialmente mediada por WAF, gateway ou load balancer.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama SVG — controles de tráfego em cloud</h2>\n  <p>O diagrama mostra como controles diferentes aparecem em uma arquitetura cloud: borda pública, WAF, load balancer, subnets públicas e privadas, security groups, NACLs/NSGs, firewall central e logs.</p>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m09l07-title m09l07-desc'>\n    <title id='m09l07-title'>Security groups, NACLs e firewalls em cloud</title>\n    <desc id='m09l07-desc'>Fluxo de usuário da Internet passando por DNS, WAF, load balancer, subnet pública, subnet privada, security groups, NACLs, firewall central e SIEM.</desc>\n    <defs>\n      <marker id='m09l07-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto' markerUnits='strokeWidth'>\n        <path d='M0,0 L0,6 L9,3 z'></path>\n      </marker>\n    </defs>\n\n    <rect class='svg-zone' x='20' y='40' width='180' height='460' rx='18'></rect>\n    <text class='svg-label' x='110' y='70' text-anchor='middle'>Internet</text>\n    <rect class='svg-node svg-node--client' x='55' y='140' width='110' height='58' rx='12'></rect>\n    <text class='svg-label' x='110' y='165' text-anchor='middle'>Usuário</text>\n    <text class='svg-label svg-label--small' x='110' y='184' text-anchor='middle'>HTTPS</text>\n    <rect class='svg-node svg-node--attacker' x='55' y='280' width='110' height='58' rx='12'></rect>\n    <text class='svg-label' x='110' y='305' text-anchor='middle'>Atacante</text>\n    <text class='svg-label svg-label--small' x='110' y='324' text-anchor='middle'>scan direto</text>\n\n    <rect class='svg-zone' x='235' y='40' width='200' height='460' rx='18'></rect>\n    <text class='svg-label' x='335' y='70' text-anchor='middle'>Borda pública</text>\n    <rect class='svg-node svg-node--cloud' x='270' y='120' width='130' height='58' rx='12'></rect>\n    <text class='svg-label' x='335' y='145' text-anchor='middle'>DNS/CDN</text>\n    <text class='svg-label svg-label--small' x='335' y='164' text-anchor='middle'>nome público</text>\n    <rect class='svg-node svg-node--firewall' x='270' y='220' width='130' height='58' rx='12'></rect>\n    <text class='svg-label' x='335' y='245' text-anchor='middle'>WAF</text>\n    <text class='svg-label svg-label--small' x='335' y='264' text-anchor='middle'>L7 HTTP/API</text>\n    <rect class='svg-node svg-node--router' x='270' y='330' width='130' height='58' rx='12'></rect>\n    <text class='svg-label' x='335' y='355' text-anchor='middle'>Load Balancer</text>\n    <text class='svg-label svg-label--small' x='335' y='374' text-anchor='middle'>entrada controlada</text>\n\n    <rect class='svg-zone' x='470' y='40' width='210' height='460' rx='18'></rect>\n    <text class='svg-label' x='575' y='70' text-anchor='middle'>VPC/VNet</text>\n    <rect class='svg-node svg-node--switch' x='505' y='110' width='140' height='58' rx='12'></rect>\n    <text class='svg-label' x='575' y='135' text-anchor='middle'>Subnet pública</text>\n    <text class='svg-label svg-label--small' x='575' y='154' text-anchor='middle'>NACL/NSG</text>\n    <rect class='svg-node svg-node--firewall' x='505' y='220' width='140' height='58' rx='12'></rect>\n    <text class='svg-label' x='575' y='245' text-anchor='middle'>Cloud Firewall</text>\n    <text class='svg-label svg-label--small' x='575' y='264' text-anchor='middle'>egress/north-south</text>\n    <rect class='svg-node svg-node--server' x='505' y='340' width='140' height='58' rx='12'></rect>\n    <text class='svg-label' x='575' y='365' text-anchor='middle'>Subnet privada</text>\n    <text class='svg-label svg-label--small' x='575' y='384' text-anchor='middle'>apps sem IP público</text>\n\n    <rect class='svg-zone' x='720' y='40' width='230' height='460' rx='18'></rect>\n    <text class='svg-label' x='835' y='70' text-anchor='middle'>Workloads e observabilidade</text>\n    <rect class='svg-node svg-node--server' x='760' y='130' width='150' height='62' rx='12'></rect>\n    <text class='svg-label' x='835' y='156' text-anchor='middle'>VM/Pod/App</text>\n    <text class='svg-label svg-label--small' x='835' y='176' text-anchor='middle'>Security Group</text>\n    <rect class='svg-node svg-node--server' x='760' y='260' width='150' height='62' rx='12'></rect>\n    <text class='svg-label' x='835' y='286' text-anchor='middle'>Banco privado</text>\n    <text class='svg-label svg-label--small' x='835' y='306' text-anchor='middle'>sem Internet direta</text>\n    <rect class='svg-node svg-node--security' x='760' y='400' width='150' height='62' rx='12'></rect>\n    <text class='svg-label' x='835' y='426' text-anchor='middle'>Logs/SIEM</text>\n    <text class='svg-label svg-label--small' x='835' y='446' text-anchor='middle'>flow logs + alerts</text>\n\n    <path class='svg-flow svg-flow--request animated-flow' d='M165 169 C210 150,230 149,270 149' marker-end='url(#m09l07-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M335 178 L335 220' marker-end='url(#m09l07-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M335 278 L335 330' marker-end='url(#m09l07-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M400 359 C440 359,465 139,505 139' marker-end='url(#m09l07-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M575 168 L575 220' marker-end='url(#m09l07-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M575 278 L575 340' marker-end='url(#m09l07-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M645 369 C690 365,720 161,760 161' marker-end='url(#m09l07-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M835 192 L835 260' marker-end='url(#m09l07-arrow)'></path>\n    <path class='svg-flow svg-flow--response' d='M760 431 C680 455,520 455,400 400' marker-end='url(#m09l07-arrow)'></path>\n    <path class='svg-flow svg-flow--blocked' d='M165 309 C350 305,570 305,760 291' marker-end='url(#m09l07-arrow)'></path>\n    <text class='svg-badge' x='440' y='292'>bloqueio: backend não é público</text>\n    <text class='svg-badge' x='535' y='425'>flow logs</text>\n    <text class='svg-badge' x='673' y='146'>SG stateful</text>\n    <text class='svg-badge' x='615' y='108'>NACL/NSG por subnet</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você desenhará e validará uma política de tráfego cloud para uma aplicação web com frontend público, API privada, banco privado, saída controlada e administração protegida. O objetivo não é depender de um provedor específico, mas aprender o raciocínio que se aplica a AWS, Azure, GCP e ambientes híbridos.</p>\n</section>\n\n<div class=\"content-card\" data-enhancement=\"p1-07-9.7\"><h4>Reforço v2.0: laboratório de firewall orientado por evidência</h4><p>Este laboratório foi revisado na v2.0 para exigir matriz de fluxo, regra mínima, retorno, logs, contadores, evidências e rollback. O acesso à aula permanece livre; a conclusão usa critérios de progresso, não bloqueio de navegação.</p></div>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam a diferença entre controles de rota, subnet, recurso, borda, firewall central e WAF. Você também praticará leitura de cenários de exposição indevida e diagnóstico de tráfego bloqueado.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um ambiente cloud com uma API pública, subnets privadas, banco gerenciado, NAT Gateway, bastion e múltiplas regras. Sua missão será identificar exposições, corrigir políticas e propor uma matriz segura de tráfego.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada mostrará como separar rota de permissão, como escolher o controle adequado, como impedir bypass, como registrar evidências e como transformar a política em código revisável.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Security groups, NACLs/NSGs e firewalls em cloud são manifestações dos conceitos estudados no módulo: ACL, estado, zonas, NAT, WAF, segmentação, publicação controlada e governança. A diferença é que agora os controles são programáveis, distribuídos e altamente integrados a identidade, automação e logs.</p>\n  <p>O bom desenho cloud começa com workloads privados, entrada mediada por componentes controlados, saída monitorada, administração protegida, rotas explícitas, logs habilitados e regras mínimas com dono e justificativa.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você aprenderá troubleshooting de políticas com logs, contadores e packet capture, consolidando método prático para descobrir por que um fluxo foi permitido, negado, roteado incorretamente ou perdido no caminho.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camadas 3 e 4",
      "Cloud networking",
      "Segurança",
      "Governança",
      "Troubleshooting"
    ],
    "beforeThisLesson": "O aluno já entende firewalls, ACLs, estado, zonas, NAT, WAF e publicação controlada.",
    "afterThisLesson": "O aluno conseguirá mapear esses conceitos para cloud, diferenciando controles por rota, subnet, recurso, borda e firewall central.",
    "dependsOn": [
      "IPv4",
      "subnetting",
      "roteamento",
      "TCP/UDP",
      "NAT",
      "ACL",
      "stateful firewall",
      "WAF",
      "logs"
    ]
  },
  "protocolFields": [
    {
      "field": "Source CIDR",
      "meaning": "Faixa de origem permitida ou bloqueada.",
      "securityNote": "CIDRs amplos como 0.0.0.0/0 exigem justificativa e quase nunca são aceitáveis para administração."
    },
    {
      "field": "Destination CIDR/resource",
      "meaning": "Destino do fluxo, que pode ser subnet, workload, grupo ou serviço.",
      "securityNote": "Permissões para destino amplo aumentam movimento lateral."
    },
    {
      "field": "Protocol",
      "meaning": "Protocolo avaliado, como TCP, UDP ou ICMP.",
      "securityNote": "Permitir todos os protocolos reduz capacidade de controle e investigação."
    },
    {
      "field": "Port range",
      "meaning": "Porta ou intervalo de portas permitido.",
      "securityNote": "Portas efêmeras podem ser necessárias em controles stateless, mas devem ser entendidas."
    },
    {
      "field": "Direction",
      "meaning": "Entrada ou saída em relação ao recurso/subnet.",
      "securityNote": "Controles stateless exigem regras coerentes nos dois sentidos."
    },
    {
      "field": "Priority/order",
      "meaning": "Ordem de avaliação em controles que usam prioridade.",
      "securityNote": "Uma regra ampla com prioridade maior pode tornar regras específicas irrelevantes."
    },
    {
      "field": "State",
      "meaning": "Memória de conexão usada por controles stateful.",
      "securityNote": "Assumir stateful onde o controle é stateless causa bloqueios de retorno."
    },
    {
      "field": "Route target",
      "meaning": "Próximo salto definido pela tabela de rotas.",
      "securityNote": "Rota para Internet ou bypass de firewall pode expor serviços."
    },
    {
      "field": "Flow log action",
      "meaning": "Registro de ACCEPT, REJECT, DROP ou equivalente.",
      "securityNote": "Sem logs, troubleshooting e resposta a incidente ficam baseados em suposições."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Nome é resolvido",
      "description": "Cliente resolve DNS público ou privado do serviço.",
      "securityNote": "DNS privado errado pode enviar tráfego para endpoint público sem necessidade."
    },
    {
      "step": 2,
      "name": "Tráfego chega à borda",
      "description": "CDN, WAF, load balancer, VPN ou gateway recebe o fluxo.",
      "securityNote": "A borda deve ser o único caminho público autorizado para aplicações."
    },
    {
      "step": 3,
      "name": "Route table escolhe caminho",
      "description": "A subnet decide se o próximo salto é local, NAT, firewall, peering, gateway privado ou Internet.",
      "securityNote": "Rota errada pode causar bypass ou blackhole."
    },
    {
      "step": 4,
      "name": "Controle de subnet avalia",
      "description": "NACL/NSG ou controle equivalente avalia origem, destino, protocolo, porta e direção.",
      "securityNote": "Em controle stateless, retorno precisa de regra explícita."
    },
    {
      "step": 5,
      "name": "Controle do recurso avalia",
      "description": "Security group/NSG do workload decide se a interface aceita o fluxo.",
      "securityNote": "Grupos compartilhados podem abrir portas em recursos não previstos."
    },
    {
      "step": 6,
      "name": "Firewall central inspeciona",
      "description": "Quando a rota força passagem por firewall, ele aplica política corporativa e registra logs.",
      "securityNote": "Se a rota não passa pelo firewall, a política central não é aplicada."
    },
    {
      "step": 7,
      "name": "Workload responde",
      "description": "Aplicação, banco ou serviço retorna pelo caminho definido.",
      "securityNote": "Roteamento assimétrico pode quebrar estado e dificultar logs."
    },
    {
      "step": 8,
      "name": "Logs são coletados",
      "description": "Flow logs, firewall logs, LB logs, WAF logs e logs de aplicação são correlacionados.",
      "securityNote": "Request ID e metadados de origem ajudam investigação e auditoria."
    }
  ],
  "deepDive": {
    "title": "Security group não é substituto de arquitetura",
    "paragraphs": [
      "É comum ver ambientes cloud em que a segurança depende quase inteiramente de security groups. Eles são importantes, mas não resolvem tudo. Um security group permissivo pode ser associado a dezenas de recursos. Uma rota pública pode expor um recurso com regra aberta. Um workload comprometido pode usar saída irrestrita para exfiltrar dados.",
      "Arquitetura segura usa camadas: subnets privadas, ausência de IP público, load balancer como entrada, WAF para HTTP, security group mínimo, route table forçando firewall quando necessário, private endpoints para serviços gerenciados, logs e política automatizada.",
      "A pergunta correta não é apenas 'a porta está fechada?'. A pergunta é: existe caminho? quem pode iniciar? quem pode responder? o controle é stateful ou stateless? há bypass? há log? há dono? há prazo? há revisão?"
    ],
    "keyTakeaways": [
      "Security groups protegem recursos, mas não substituem segmentação e roteamento seguro.",
      "NACLs/NSGs e controles por subnet criam barreiras adicionais, porém exigem cuidado com ordem e direção.",
      "Firewalls gerenciados dependem de rotas para realmente enxergar o tráfego.",
      "Backends críticos devem ser privados e acessados por caminhos controlados.",
      "IaC e policy as code evitam que exceções manuais virem padrão invisível."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Abrir SSH ou RDP para 0.0.0.0/0.",
      "impact": "Aumenta tentativas de brute force, exploração e enumeração administrativa.",
      "correction": "Use VPN, bastion, acesso gerenciado, origem administrativa restrita e MFA."
    },
    {
      "mistake": "Atribuir IP público a banco ou backend interno.",
      "impact": "Cria exposição direta e contorna WAF, gateway e segmentação.",
      "correction": "Remova IP público e use subnet privada, private endpoint ou acesso via aplicação."
    },
    {
      "mistake": "Confundir route table com firewall.",
      "impact": "A equipe altera regras, mas o fluxo continua sem caminho ou passa por caminho indevido.",
      "correction": "Diagnostique rota e política separadamente."
    },
    {
      "mistake": "Assumir que todo controle cloud é stateful.",
      "impact": "Tráfego de retorno pode ser bloqueado ou portas efêmeras podem ser abertas de forma errada.",
      "correction": "Documente quais controles são stateful e quais exigem regras nos dois sentidos."
    },
    {
      "mistake": "Reutilizar security group genérico em muitos serviços.",
      "impact": "Uma abertura necessária para um serviço expõe todos os recursos associados.",
      "correction": "Use grupos por função, menor privilégio, tags, dono e revisão."
    },
    {
      "mistake": "Não habilitar flow logs.",
      "impact": "Troubleshooting e investigação ficam lentos e imprecisos.",
      "correction": "Habilite logs em subnets/VPC/VNet críticas e envie para SIEM com retenção adequada."
    },
    {
      "mistake": "Criar firewall central sem forçar rotas por ele.",
      "impact": "A política existe no desenho, mas parte do tráfego não passa pelo controle.",
      "correction": "Valide route tables, UDRs, transit/hub-spoke e logs de tráfego real."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "VM privada não acessa a Internet.",
      "API pública responde 502 no load balancer.",
      "Banco não aceita conexão da aplicação.",
      "Flow log mostra REJECT em subnet, mas security group parece correto.",
      "Tráfego passa direto entre redes sem aparecer no firewall central.",
      "Conexão funciona em uma direção, mas falha no retorno.",
      "Endpoint privado resolve para IP inesperado."
    ],
    "method": [
      "Confirme DNS público/privado e IP resolvido.",
      "Confirme route table da subnet de origem e destino.",
      "Verifique se o recurso tem IP público e se deveria ter.",
      "Revise security group/NSG associado à interface correta.",
      "Revise NACL/NSG de subnet, prioridade e direção.",
      "Valide NAT Gateway, Internet Gateway, VPN, peering ou firewall central.",
      "Leia flow logs para saber se foi ACCEPT, REJECT, DROP ou se não houve tráfego.",
      "Compare logs de load balancer, WAF, firewall e aplicação pelo horário e IP.",
      "Teste porta com curl, nc, Test-NetConnection ou ferramenta equivalente.",
      "Documente hipótese, teste, evidência e conclusão."
    ],
    "tools": [
      "curl -v",
      "nc -vz",
      "Test-NetConnection",
      "traceroute/tracert",
      "tcpdump",
      "flow logs",
      "load balancer logs",
      "WAF logs",
      "cloud firewall logs",
      "route table viewer",
      "reachability analyzer",
      "nmap autorizado"
    ],
    "decisionTree": [
      {
        "if": "Sem hits na regra",
        "then": "Verificar ponto de aplicação, direção, rota e origem real do fluxo."
      },
      {
        "if": "Allow existe mas aplicação falha",
        "then": "Separar transporte, TLS, WAF, backend e autorização."
      },
      {
        "if": "Retorno falha",
        "then": "Verificar state table, NACL/ACL stateless, portas efêmeras e caminho assimétrico."
      },
      {
        "if": "Regra ampla aparece",
        "then": "Substituir por matriz mínima com owner, validade, log e rollback."
      }
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "Qual é o 5-tuple do fluxo e em qual horário ele falhou?",
      "Qual controle tomou a decisão e qual evidência prova isso?",
      "A falha está na ida, no retorno, no estado, no NAT, no WAF ou no backend?"
    ],
    "commands": [
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "aws ec2 describe-security-groups --output table\naws ec2 describe-network-acls --output table\naz network nsg list -o table",
        "purpose": "Inventário read-only",
        "expectedObservation": "Inventário ou justificativa de simulação.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Abrir portas administrativas para qualquer origem.",
      "Publicar banco, cache, painel interno ou fila diretamente na Internet.",
      "Usar um security group global para todos os sistemas.",
      "Desabilitar logs para reduzir custo sem avaliar impacto de investigação.",
      "Confiar apenas em regra de rede e ignorar IAM, autenticação e autorização.",
      "Permitir egress irrestrito de ambientes sensíveis.",
      "Criar exceções manuais no console sem revisão ou rastreabilidade."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição pública indevida",
        "description": "Recurso interno recebe IP público ou regra ampla.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Subnets privadas, policy as code, alertas e revisão."
      },
      {
        "name": "Movimento lateral",
        "description": "Subnets e workloads falam entre si sem necessidade.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Segmentação, security groups por função e deny-by-default."
      },
      {
        "name": "Bypass de firewall central",
        "description": "Route table permite caminho alternativo sem inspeção.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Arquitetura hub-spoke, rotas obrigatórias e validação por logs."
      },
      {
        "name": "Exfiltração por egress livre",
        "description": "Workload comprometido envia dados para qualquer destino.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Egress control, proxy, firewall, DNS control e DLP quando aplicável."
      },
      {
        "name": "Administração exposta",
        "description": "SSH, RDP ou painel administrativo aberto para Internet.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "VPN, bastion, JIT access, MFA e origem restrita."
      },
      {
        "name": "Logs ausentes",
        "description": "Falhas e incidentes não deixam trilha suficiente.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Flow logs, SIEM, retenção e correlação com tags."
      }
    ],
    "goodPractices": [
      "Começar recursos críticos em subnets privadas e sem IP público.",
      "Usar WAF/API Gateway/load balancer como entrada pública controlada.",
      "Restringir administração a VPN, bastion ou serviço gerenciado com MFA.",
      "Aplicar menor privilégio em security groups/NSGs por função do workload.",
      "Habilitar flow logs, firewall logs, load balancer logs e WAF logs.",
      "Usar private endpoints para bancos, storage e serviços gerenciados sensíveis.",
      "Forçar tráfego sensível por firewall central quando a política exigir inspeção.",
      "Criar regras por IaC com dono, justificativa, validade e revisão.",
      "Alertar para IP público em recurso crítico, porta administrativa aberta e CIDR amplo.",
      "Revisar egress: saída irrestrita também é risco de exfiltração."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Remover exceções permanentes sem justificativa."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-9.7",
    "title": "Security Groups vs NACLs: stateful, stateless, retorno e portas efêmeras",
    "labType": "cloud",
    "objective": "Comparar SG stateful e NACL stateless sem criar recurso pago, usando matriz e comandos read-only opcionais.",
    "scenario": "VM em subnet privada acessa HTTPS externo e recebe tráfego de LB; retorno falha por NACL sem regra.",
    "topology": "Internet/LB -> subnet pública -> app privada -> SG stateful + NACL stateless -> flow logs.",
    "architecture": "SG acompanha estado por recurso/interface; NACL avalia entrada/saída da subnet sem memória.",
    "prerequisites": [
      "Revisar as aulas anteriores do M09 e os fundamentos de TCP/UDP, portas, IPv4, DNS e HTTP.",
      "Usar somente laboratório, simulação, dados fictícios ou ambiente explicitamente autorizado."
    ],
    "tools": [
      "Planilha",
      "AWS/Azure CLI opcional",
      "flow logs sintéticos",
      "matriz SG/NACL"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não aplique mudanças em produção sem change, janela, backup e rollback.",
      "Não use any-any como solução de troubleshooting.",
      "Sanitize IPs, tokens, cookies, payloads e nomes internos antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Classificar controles",
        "instruction": "Preencha SG vs NACL/NSG/firewall.",
        "expectedOutput": "Diferenças explícitas.",
        "evidence": "Comparação preenchida.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Tabela controle | stateful | escopo | direção | retorno | ordem."
      },
      {
        "number": 2,
        "title": "Fluxo HTTPS outbound",
        "instruction": "Modele saída app -> Internet 443 e retorno efêmero.",
        "expectedOutput": "Retorno previsto.",
        "evidence": "Retorno explícito na NACL.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Matriz SG/NACL ida e retorno."
      },
      {
        "number": 3,
        "title": "Fluxo LB -> app",
        "instruction": "Modele entrada do LB e resposta.",
        "expectedOutput": "Sem Internet direta ao app.",
        "evidence": "Regras por subnet/SG.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Matriz LB subnet -> app port; retorno app -> LB."
      },
      {
        "number": 4,
        "title": "Inventário read-only",
        "instruction": "Liste SG/NACL/NSG sem alterar ambiente se autorizado.",
        "expectedOutput": "Inventário ou justificativa de simulação.",
        "evidence": "Comando usado ou simulação.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "aws ec2 describe-security-groups --output table\naws ec2 describe-network-acls --output table\naz network nsg list -o table"
      },
      {
        "number": 5,
        "title": "Flow log sintético",
        "instruction": "Classifique ACCEPT/REJECT e porta efêmera.",
        "expectedOutput": "Retorno bloqueado identificado.",
        "evidence": "Tabela log/decisão.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "analysisTask": "srcaddr, dstaddr, srcport, dstport, action, interface, subnet."
      },
      {
        "number": 6,
        "title": "Correção mínima",
        "instruction": "Proponha regra de retorno ou ajuste.",
        "expectedOutput": "Sem abrir portas desnecessárias.",
        "evidence": "Plano de correção.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Change mínimo com risco, rollback e validação."
      }
    ],
    "expectedResult": "Entrega com matriz de fluxo, evidências, validação objetiva, análise de risco e rollback.",
    "validation": [
      {
        "check": "NACL com retorno",
        "expected": "Entrada/saída contempla portas efêmeras.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão da matriz"
      },
      {
        "check": "SG sem gestão aberta",
        "expected": "Sem SSH/RDP 0.0.0.0/0.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      },
      {
        "check": "Flow log interpretado",
        "expected": "ACCEPT/REJECT associado ao controle provável.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Timeout só em cloud",
        "probableCause": "NACL sem retorno/rota/SG inconsistente.",
        "howToConfirm": "Flow logs e matriz.",
        "fix": "Ajustar stateless/rota."
      },
      {
        "symptom": "SG permite e NACL rejeita",
        "probableCause": "NACL stateless bloqueia.",
        "howToConfirm": "Comparar SG allow e NACL reject.",
        "fix": "Adicionar regra NACL mínima."
      },
      {
        "symptom": "Gestão exposta",
        "probableCause": "SG amplo.",
        "howToConfirm": "describe-security-groups.",
        "fix": "Restringir bastion/ZTNA/VPN."
      }
    ],
    "improvements": [
      "Adicionar integração com SIEM.",
      "Automatizar revisão periódica de regras.",
      "Transformar a matriz em policy as code quando fizer sentido."
    ],
    "evidenceToCollect": [
      "Tabela SG vs NACL",
      "Matriz outbound",
      "Matriz LB->app",
      "Comandos read-only/simulação",
      "Flow log sintético",
      "Plano de correção"
    ],
    "questions": [
      "Por que SG e NACL diferem no retorno?",
      "Como flow log ajuda?"
    ],
    "challenge": "Explique HTTPS saindo da subnet mas resposta rejeitada.",
    "solution": "SG pode estar correto; NACL stateless precisa regra de retorno para portas efêmeras."
  },
  "mentorQuestions": [
    "Em qual camada você colocaria a regra: route table, NACL/NSG, security group, firewall central ou WAF? Por quê?",
    "Como você provaria que o backend não pode ser acessado diretamente da Internet?",
    "Se um fluxo não aparece nos logs do firewall central, quais hipóteses você levantaria?",
    {
      "type": "diagnóstico",
      "question": "Que evidência provaria que o firewall tomou a decisão correta neste cenário?",
      "hints": [
        "Pense em log, contador, state table, flow log ou packet capture.",
        "Separe ida, retorno e camada de aplicação."
      ],
      "expectedIdeas": [
        "matriz de fluxo",
        "log de regra",
        "contador",
        "state table",
        "pcap",
        "rollback"
      ],
      "explanation": "Firewall profissional é operado por evidências, não por palpites."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Qual é a diferença operacional mais importante entre security group stateful e NACL stateless?",
      "options": [
        "Security group só filtra UDP e NACL só filtra TCP",
        "Security group normalmente aceita retorno de fluxo permitido; NACL pode exigir regras explícitas nos dois sentidos",
        "NACL sempre entende HTTP e security group não",
        "Security group substitui route table"
      ],
      "answer": 1,
      "explanation": "Controles stateful mantêm estado de conexão; controles stateless avaliam pacotes de ida e volta separadamente."
    },
    {
      "id": "q2",
      "question": "Qual é o principal risco de colocar IP público em um banco de dados?",
      "options": [
        "Aumentar latência interna",
        "Permitir exposição direta e contornar camadas de borda e segmentação",
        "Impedir backup",
        "Bloquear DNS privado"
      ],
      "answer": 1,
      "explanation": "Banco público aumenta superfície de ataque e pode contornar aplicação, WAF, gateway e segmentação."
    },
    {
      "id": "q3",
      "question": "Uma VM privada não acessa a Internet. Abrir o security group resolve sempre?",
      "options": [
        "Sim, SG controla toda a conectividade",
        "Não, pode faltar rota para NAT Gateway, firewall ou gateway adequado",
        "Sim, desde que porta 443 esteja aberta inbound",
        "Não, porque VMs privadas nunca podem sair"
      ],
      "answer": 1,
      "explanation": "Conectividade depende de rota e caminho, não apenas regra do recurso."
    },
    {
      "id": "q4",
      "question": "Qual controle entende melhor parâmetros HTTP e payload JSON?",
      "options": [
        "Route table",
        "NACL",
        "WAF/API Gateway",
        "Security group L3"
      ],
      "answer": 2,
      "explanation": "WAF e API Gateway atuam em camada 7 e podem avaliar elementos HTTP/API."
    },
    {
      "id": "q5",
      "question": "Por que flow logs são importantes?",
      "options": [
        "Substituem autenticação",
        "Mostram evidências de aceitação/negação e ajudam troubleshooting/investigação",
        "Permitem que bancos fiquem públicos",
        "Eliminam necessidade de rota"
      ],
      "answer": 1,
      "explanation": "Flow logs ajudam a saber se houve tráfego, ação aplicada e metadados de origem/destino."
    },
    {
      "id": "q6",
      "question": "Qual é a melhor prática para administração cloud de VMs?",
      "options": [
        "SSH/RDP aberto para Internet com senha forte",
        "Acesso via VPN, bastion, serviço gerenciado, MFA e origem restrita",
        "Desabilitar logs para reduzir ruído",
        "Usar a mesma regra de produção em todos os ambientes"
      ],
      "answer": 1,
      "explanation": "Administração deve ser protegida, auditável e restrita."
    }
  ],
  "flashcards": [
    {
      "front": "Security group",
      "back": "Controle associado a recurso/interface, geralmente stateful, usado para permitir tráfego mínimo necessário."
    },
    {
      "front": "NACL",
      "back": "Controle por subnet, frequentemente stateless, que exige cuidado com direção, ordem e portas de retorno."
    },
    {
      "front": "Route table",
      "back": "Define caminho do tráfego; não é firewall, mas pode criar ou impedir passagem por controles."
    },
    {
      "front": "Cloud firewall",
      "back": "Firewall gerenciado ou appliance usado para inspeção central, egress control, segmentação e logs."
    },
    {
      "front": "Private endpoint",
      "back": "Forma de acessar serviço gerenciado por caminho privado, reduzindo dependência de exposição pública."
    },
    {
      "front": "Flow logs",
      "back": "Registros de tráfego aceito, recusado ou observado, úteis para troubleshooting, auditoria e SOC."
    }
  ],
  "exercises": [
    {
      "id": "ex1",
      "title": "Classifique controles",
      "prompt": "Classifique cada item como rota, controle de subnet, controle de recurso, borda L7 ou observabilidade: route table, WAF, security group, NACL, flow logs, load balancer.",
      "expectedAnswer": "Route table é rota; NACL é subnet; security group é recurso/interface; WAF é borda L7; load balancer é publicação/entrada; flow logs são observabilidade."
    },
    {
      "id": "ex2",
      "title": "Corrija exposição",
      "prompt": "Um banco gerenciado tem endpoint público e regra permitindo 0.0.0.0/0 na porta do banco. Proponha correção.",
      "expectedAnswer": "Remover acesso público, usar subnet/endpoint privado, permitir apenas origem da aplicação, habilitar logs e criar alerta/policy que impeça repetição."
    },
    {
      "id": "ex3",
      "title": "Diagnóstico de saída",
      "prompt": "Aplicação privada não consegue acessar API de pagamento externa. Liste hipóteses em ordem.",
      "expectedAnswer": "DNS, route table para NAT/firewall, SG/NSG egress, NACL de saída/retorno, firewall egress, resolução de proxy, rota de retorno, logs."
    },
    {
      "id": "ex4",
      "title": "Matriz mínima",
      "prompt": "Monte quatro fluxos mínimos para uma aplicação web cloud com API e banco privados.",
      "expectedAnswer": "Internet→WAF/LB 443; LB→App porta da aplicação; App→Banco porta do banco; Admin→Bastion/VPN→servidores; App→terceiros via NAT/firewall quando necessário."
    },
    {
      "id": "ex-9.7-p1-07-matriz",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de fluxo com origem, destino, protocolo, porta, direção, controle, log esperado e critério de rollback para o cenário da aula.",
      "expectedAnswer": "A resposta deve conter fluxo específico, sem any-any, com regra mínima, fonte de log, teste positivo/negativo e rollback.",
      "explanation": "Matriz de fluxo é a base para firewall operável e auditável."
    }
  ],
  "challenge": {
    "title": "Desenhar política cloud segura para uma API corporativa",
    "scenario": "Uma empresa publicou uma API em cloud. O load balancer é público, as aplicações estão em subnets privadas, o banco gerenciado tem endpoint público por legado, há NAT Gateway para saída, SSH está aberto para IPs residenciais da equipe e flow logs estão desabilitados. O time quer melhorar segurança sem derrubar a operação.",
    "tasks": [
      "Identificar cinco riscos prioritários.",
      "Criar matriz de fluxos autorizados.",
      "Definir quais controles ficam em WAF, security group, NACL/NSG, route table, firewall e IAM.",
      "Propor plano de migração para remover exposição pública do banco.",
      "Definir logs e alertas mínimos.",
      "Criar processo de exceção temporária para administração."
    ],
    "deliverable": "Documento curto com arquitetura alvo, matriz de comunicação, riscos, plano de correção, evidências de validação e política de governança."
  },
  "commentedSolution": {
    "title": "Solução comentada — política cloud segura",
    "steps": [
      {
        "step": 1,
        "analysis": "Riscos prioritários: banco público, SSH aberto para origens frágeis, ausência de flow logs, egress pouco controlado e possível bypass da borda.",
        "comment": "Comece por exposições diretas e ausência de evidência."
      },
      {
        "step": 2,
        "analysis": "Matriz alvo: Internet só fala com WAF/LB 443; LB fala com app; app fala com banco privado; admin entra por VPN/bastion; saída passa por NAT/firewall/proxy.",
        "comment": "A matriz transforma opinião em política verificável."
      },
      {
        "step": 3,
        "analysis": "WAF cuida de HTTP/API; security groups cuidam do mínimo por workload; NACL/NSG adiciona barreira por subnet; route tables forçam caminho; firewall controla egress e tráfego entre redes; IAM controla quem altera tudo.",
        "comment": "Cada controle resolve um problema diferente."
      },
      {
        "step": 4,
        "analysis": "Banco deve migrar para private endpoint ou acesso privado, removendo endpoint público após testes e janela controlada.",
        "comment": "Não remova legado sem plano de validação e rollback."
      },
      {
        "step": 5,
        "analysis": "Logs mínimos: flow logs, WAF, LB, firewall, DNS e aplicação, todos com retenção, tags e envio ao SIEM.",
        "comment": "Sem logs, não há prova de bloqueio nem investigação confiável."
      },
      {
        "step": 6,
        "analysis": "Administração passa para VPN/bastion/JIT com MFA. Exceções têm prazo, dono, ticket e alerta.",
        "comment": "Exceção sem prazo vira arquitetura permanente."
      }
    ]
  },
  "glossary": [
    {
      "term": "VPC/VNet",
      "definition": "Rede virtual isolada em cloud, usada para organizar subnets, rotas, gateways e controles."
    },
    {
      "term": "Security group",
      "definition": "Firewall lógico associado a recurso ou interface, normalmente stateful."
    },
    {
      "term": "NACL",
      "definition": "Lista de controle associada à subnet, frequentemente stateless."
    },
    {
      "term": "NSG",
      "definition": "Network Security Group, controle de tráfego usado em alguns provedores para subnets e interfaces."
    },
    {
      "term": "Route table",
      "definition": "Tabela que define próximo salto para destinos de rede."
    },
    {
      "term": "NAT Gateway",
      "definition": "Serviço que permite saída de recursos privados para destinos externos sem expor esses recursos para entrada direta."
    },
    {
      "term": "Cloud Firewall",
      "definition": "Firewall gerenciado ou appliance em cloud usado para inspeção e política centralizada."
    },
    {
      "term": "Private endpoint",
      "definition": "Endpoint privado para acessar serviço gerenciado sem usar caminho público."
    },
    {
      "term": "Flow logs",
      "definition": "Logs de metadados de tráfego de rede, úteis para troubleshooting e auditoria."
    },
    {
      "term": "Egress control",
      "definition": "Controle de tráfego de saída para reduzir exfiltração e abuso."
    }
  ],
  "references": [
    "Curso Redes e Network v2.0 — Módulo 4: IPv4 e Endereçamento.",
    "Curso Redes e Network v2.0 — Módulo 5: Subnetting e planejamento IPv4.",
    "Curso Redes e Network v2.0 — Módulo 6: Roteamento IPv4.",
    "Curso Redes e Network v2.0 — Módulo 8: TCP, UDP, portas e transporte.",
    "Curso Redes e Network v2.0 — Módulo 9: HTTP, HTTPS, proxies e APIs.",
    "Curso Infraestrutura Moderna, Platform Engineering e DevSecOps — módulos de IaC, cloud e pipelines.",
    "Curso Enterprise Identity, IAM, Segurança e Acessos — tópicos de identidade, acesso administrativo e zero trust."
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e Terraform/OpenTofu",
      "reason": "Regras cloud devem ser versionadas, revisadas e automatizadas."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Acesso administrativo e identidade em cloud",
      "reason": "Controle de rede precisa ser combinado com IAM, MFA, JIT e trilha de auditoria."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 9",
      "reason": "WAF, API Gateway, HTTPS e proxies são camadas de publicação HTTP em cloud."
    }
  ],
  "progressRules": {
    "requiredSections": [
      "motivation",
      "history",
      "problem",
      "evolution",
      "concept",
      "internals",
      "architecture",
      "analogy",
      "simpleExample",
      "enterpriseExample",
      "cloudExample",
      "devsecopsExample",
      "securityExample",
      "diagram",
      "labIntro",
      "exercisesIntro",
      "challengeIntro",
      "solutionIntro",
      "summary",
      "nextTheme"
    ],
    "minimumQuizScore": 70,
    "requiredLab": "lab-9.7",
    "unlockNextLesson": "9.8",
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
      "9.8"
    ]
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
