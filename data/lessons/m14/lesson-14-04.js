export const lesson1404 = {
  "id": "14.4",
  "moduleId": "m14",
  "order": 4,
  "title": "Route tables, Internet Gateway, NAT Gateway e UDR",
  "subtitle": "Como a cloud decide para onde cada pacote vai, quando uma subnet fica pública, quando a saída passa por NAT e como rotas definidas pelo usuário mudam o caminho real.",
  "duration": "100-160 min",
  "estimatedStudyTimeMinutes": 160,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 290,
  "tags": [
    "cloud networking",
    "route tables",
    "internet gateway",
    "nat gateway",
    "udr",
    "egress",
    "aws",
    "azure",
    "gcp",
    "segurança",
    "troubleshooting",
    "custos"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.1",
      "reason": "É necessário entender por que cloud networking existe antes de estudar rotas cloud."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.3",
      "reason": "Rotas dependem do desenho de VPC/VNet, CIDR e subnets."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.x",
      "reason": "Gateway, rota default, next hop e troubleshooting de caminhos são base direta desta aula."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação e zonas de segurança orientam quais rotas devem existir e quais devem ser bloqueadas."
    }
  ],
  "objectives": [
    "Explicar como route tables controlam caminhos de tráfego em redes cloud.",
    "Diferenciar Internet Gateway, NAT Gateway, rota local, rota default e rota user-defined.",
    "Identificar quando uma subnet é pública, privada ou isolada pelo ponto de vista de roteamento.",
    "Relacionar rotas com firewall, security groups, NSGs, egress control, logs e custos.",
    "Diagnosticar falhas de conectividade causadas por rota ausente, next hop errado, rota assimétrica ou NAT mal posicionado.",
    "Projetar tabelas de rota para uma arquitetura cloud segura, observável e preparada para integração híbrida."
  ],
  "learningOutcomes": [
    "Dado um diagrama cloud, o aluno identifica a rota efetiva de saída para internet, datacenter, outra VPC/VNet e serviços privados.",
    "Dado um problema de VM privada sem acesso a atualizações, o aluno diferencia rota, NAT, DNS e firewall.",
    "Dado um requisito de inspeção centralizada, o aluno propõe UDR/route table para encaminhar tráfego por firewall/NVA.",
    "Dado um desenho com NAT Gateway, o aluno aponta riscos de custo, disponibilidade e logging."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Uma aplicação em cloud está em uma subnet privada. Ela precisa baixar atualizações, acessar uma API externa e enviar telemetria para um serviço SaaS. A equipe cria um NAT Gateway e adiciona uma rota default para ele. Funciona. Semanas depois, o custo de rede aumenta, o time de segurança percebe que todo egress passa sem inspeção suficiente, e uma conexão com o datacenter começa a falhar porque uma rota user-defined está enviando tráfego para o próximo salto errado. O problema não é “a cloud caiu”. O problema é que ninguém desenhou conscientemente o caminho dos pacotes.</p>\n  <p>Em cloud networking, roteamento é o ponto onde arquitetura, segurança, disponibilidade e custo se encontram. Uma rota pode tornar uma subnet pública, esconder servidores atrás de NAT, mandar tráfego para um firewall, criar caminho para VPN, ativar comunicação privada com serviços gerenciados ou gerar cobrança de egress. Por isso, entender route tables, Internet Gateway, NAT Gateway e UDR não é detalhe: é fundamento de arquitetura cloud segura.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> muitos incidentes de cloud começam com uma suposição errada sobre caminho de rede: “está privado porque não tem IP público”, “passa pelo firewall porque existe firewall”, “tem NAT então está seguro”, ou “a rota default resolve tudo”.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Nas redes tradicionais, o caminho de um pacote era decidido por roteadores, tabelas de rota, gateways, protocolos dinâmicos e políticas em appliances. O administrador olhava interfaces, next hops, roteamento estático, OSPF, BGP, NAT e firewall. Com a virtualização e a cloud, parte desse raciocínio foi abstraída por recursos programáveis: route tables, gateways gerenciados, NAT gerenciado, firewalls cloud, peering, transit e redes privadas virtuais.</p>\n  <p>Essa abstração trouxe velocidade. Em vez de comprar um roteador, instalar em rack, configurar interfaces e abrir chamado de circuito, a equipe declara uma route table por API. Mas a abstração também cria uma armadilha: como tudo aparece em telas amigáveis, parece que roteamento ficou simples. Na prática, a cloud apenas moveu a complexidade para objetos lógicos: subnet association, route priority, next hop type, route propagation, system routes, custom routes, NAT, appliances, gateways, endpoints e logs.</p>\n  <p>A evolução natural foi do roteador físico para o plano de controle cloud. AWS, Azure e Google Cloud usam nomes e modelos diferentes, mas a pergunta fundamental continua igual à do Módulo 11: dado um destino, qual é o próximo salto?</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é que uma rede cloud precisa decidir caminhos para muitos destinos diferentes: internet, subnets locais, outras VPCs/VNets, datacenter, serviços gerenciados, endpoints privados, firewalls e appliances. Se essa decisão não for explícita, documentada e validada, a rede pode ficar exposta, cara, intermitente ou invisível para o SOC.</p>\n  <ul>\n    <li><strong>Subnet pública por engano:</strong> uma rota default para Internet Gateway combinada com IP público pode expor workloads.</li>\n    <li><strong>Subnet privada sem saída:</strong> workloads sem NAT, proxy ou endpoint privado não conseguem atualizar pacotes nem acessar APIs externas.</li>\n    <li><strong>NAT confundido com firewall:</strong> NAT permite saída, mas não substitui política, inspeção, autenticação ou detecção.</li>\n    <li><strong>UDR/rota customizada errada:</strong> tráfego pode ser enviado para appliance incorreto, blackhole ou caminho assimétrico.</li>\n    <li><strong>Custos invisíveis:</strong> NAT, egress, tráfego entre zonas/regiões e logs podem crescer sem alerta.</li>\n    <li><strong>Falta de logs:</strong> sem flow logs e registros de firewall, o time não comprova qual caminho foi usado.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Regra mental:</strong> security group, NSG e firewall decidem se algo é permitido; route table decide para onde o pacote tenta ir. Sem rota correta, a política nem chega a ser testada.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução do roteamento em cloud pode ser entendida como a passagem de caminhos físicos para caminhos declarativos. O fundamento não mudou: cada pacote tem origem, destino e próximo salto. O que mudou foi a forma de expressar e automatizar esse próximo salto.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>Evolução em cloud</th></tr></thead>\n    <tbody>\n      <tr><td>Roteador físico</td><td>Interfaces, rotas estáticas/dinâmicas e appliances</td><td>Provisionamento lento e dependência física</td><td>Route tables e gateways gerenciados</td></tr>\n      <tr><td>DMZ tradicional</td><td>Servidores publicados atrás de firewall</td><td>Escala e automação limitadas</td><td>Subnets públicas, load balancers, WAF e rotas controladas</td></tr>\n      <tr><td>NAT appliance</td><td>Equipamento ou VM traduzindo endereços</td><td>Alta manutenção e ponto de falha</td><td>NAT Gateway/Cloud NAT gerenciado</td></tr>\n      <tr><td>Roteamento manual</td><td>Configuração individual em equipamentos</td><td>Erro humano e drift</td><td>IaC, policy as code, route validation e guardrails</td></tr>\n      <tr><td>Inspeção centralizada</td><td>Firewalls físicos em borda</td><td>Dificuldade para tráfego leste-oeste</td><td>UDR/custom routes para firewall/NVA e hub-spoke</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Uma <strong>route table</strong> é um conjunto de regras de roteamento associado a uma ou mais subnets ou gateways. Cada regra normalmente diz: “para este destino, envie o tráfego para este alvo ou próximo salto”. O destino pode ser um CIDR local, a internet, outra rede, um gateway, um NAT, uma interface de appliance, um peering, um transit hub, uma VPN ou um próximo salto virtual.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> em cloud networking, route tables, Internet Gateways, NAT Gateways e UDRs formam o mecanismo que decide se um workload alcança internet, redes privadas, serviços gerenciados, firewalls ou lugar nenhum.</div>\n  <p>Em AWS, fala-se em route tables, Internet Gateway e NAT Gateway. Em Azure, fala-se em system routes, route tables, user-defined routes, Internet, NAT Gateway e network virtual appliances. Em Google Cloud, rotas são associadas à VPC global, com rotas de subnet, rotas customizadas, rotas dinâmicas e Cloud NAT para saída sem IP público. Os nomes variam; o raciocínio é o mesmo.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Quando uma instância, VM ou workload envia um pacote, a cloud avalia uma sequência lógica: qual é o destino, qual rota mais específica combina, qual é o próximo salto, existe política permitindo, existe tradução NAT, existe retorno e existe logging suficiente para comprovar?</p>\n  <ol class=\"flow-list\">\n    <li><strong>O workload cria o pacote:</strong> origem, destino, protocolo e porta são definidos pela aplicação e pelo sistema operacional.</li>\n    <li><strong>A subnet fornece contexto:</strong> a subnet está associada a uma route table ou herda uma tabela principal/sistêmica.</li>\n    <li><strong>A rota mais específica vence:</strong> uma rota para <code>10.20.0.0/16</code> é mais específica que <code>0.0.0.0/0</code>.</li>\n    <li><strong>O próximo salto é escolhido:</strong> local, Internet Gateway, NAT Gateway, firewall/NVA, VPN, peering, transit ou blackhole.</li>\n    <li><strong>Políticas são aplicadas:</strong> security groups, NSGs, firewall rules, NACLs, cloud firewalls ou appliances podem permitir ou negar.</li>\n    <li><strong>NAT pode ocorrer:</strong> em saída para internet, workloads privados podem usar NAT para iniciar conexões sem receber conexões diretas de entrada.</li>\n    <li><strong>O retorno precisa existir:</strong> estado, rota reversa e simetria de caminho influenciam o sucesso.</li>\n    <li><strong>Logs registram evidências:</strong> flow logs, firewall logs, NAT logs, NSG flow logs ou logs de appliance ajudam o troubleshooting.</li>\n  </ol>\n  <p>O ponto crítico é que cloud routing não é apenas “rota default”. A rota default costuma ser o último recurso para destinos não conhecidos. Em arquitetura madura, tráfego para datacenter, serviços privados, endpoints, appliances e internet deve ter caminho intencional.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura cloud típica, as route tables separam papéis. Uma subnet pública tem rota para Internet Gateway e geralmente hospeda load balancers, bastions controlados ou appliances específicos. Uma subnet privada não recebe rota direta de entrada pela internet e usa NAT, proxy ou endpoints privados para saída. Uma subnet de dados pode ser isolada, aceitando apenas tráfego interno necessário. Uma subnet de segurança pode hospedar firewall/NVA, sensores ou gateways.</p>\n  <ul>\n    <li><strong>Camada envolvida:</strong> principalmente camada 3, mas com efeitos em segurança, identidade, aplicação e custo.</li>\n    <li><strong>Componentes envolvidos:</strong> subnets, route tables, gateways, NAT, firewalls, security groups, NSGs, NACLs, endpoints e logs.</li>\n    <li><strong>Dependências:</strong> CIDR, subnetting, DNS, NAT, firewall, IAM, logs e desenho multi-zona.</li>\n    <li><strong>Pontos de falha:</strong> rota ausente, rota errada, next hop indisponível, NAT saturado, appliance sem HA, política bloqueando retorno e ausência de logs.</li>\n  </ul>\n  <p>Arquiteturas avançadas usam hub-spoke, transit gateway, virtual WAN, firewalls centrais e rotas customizadas. Essas escolhas aumentam controle, mas também aumentam risco de erro. Por isso, cada rota deve ter dono, justificativa, impacto, ambiente, validação e plano de rollback.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Imagine um prédio corporativo com vários corredores. Cada sala representa uma subnet. A route table é a placa que diz: “para a rua, vá pela portaria”; “para o almoxarifado, vá pelo corredor interno”; “para área restrita, passe pela segurança”; “para área bloqueada, não há caminho”. O Internet Gateway é a portaria para a rua. O NAT Gateway é como uma recepção que permite funcionários saírem para resolver algo fora, mas não permite que qualquer pessoa da rua entre diretamente até a mesa do funcionário.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes reais, o caminho depende de prefixos, prioridade de rotas, estado de conexão, políticas, tradução de endereço e respostas simétricas. Não basta existir uma “porta”; o pacote precisa de rota, permissão e retorno.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em um laboratório pequeno na AWS, você cria uma VPC com duas subnets. A subnet pública tem uma route table com <code>0.0.0.0/0 → Internet Gateway</code>. A subnet privada tem <code>0.0.0.0/0 → NAT Gateway</code>. Um load balancer fica na subnet pública e encaminha tráfego para uma aplicação na subnet privada. A aplicação consegue acessar repositórios externos para atualizar pacotes porque sai via NAT, mas não recebe conexão direta da internet.</p>\n  <p>Se a aplicação não consegue baixar atualizações, você testa: existe rota default na subnet privada? O NAT está em subnet pública? O NAT tem caminho para Internet Gateway? O security group permite saída? O DNS resolve? O destino externo responde? Há logs mostrando tentativa de conexão?</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, a equipe cria uma landing zone com subnets para web, aplicação, dados, endpoints privados, segurança e gerenciamento. O tráfego norte-sul entra por load balancer e WAF. O tráfego de saída passa por NAT ou firewall e é registrado. O tráfego para datacenter passa por VPN ou link dedicado. O tráfego entre subnets sensíveis passa por firewall interno ou política equivalente. Rotas não são criadas por conveniência; são criadas por fluxo aprovado.</p>\n  <p>O desenho empresarial também precisa considerar segregação de ambientes. Produção, homologação e desenvolvimento podem ter contas/assinaturas/projetos separados. Se todos compartilham o mesmo egress, o SOC precisa diferenciar origem por tag, subnet, conta, workload e identidade. Sem isso, investigar um acesso suspeito vira adivinhação.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em AWS, a route table da subnet pode apontar a rota default para Internet Gateway, NAT Gateway, Transit Gateway, Virtual Private Gateway, peering ou appliance. Em Azure, system routes existem por padrão, e User Defined Routes podem alterar o próximo salto, por exemplo enviando tráfego para uma Network Virtual Appliance. Em Google Cloud, rotas definem caminhos para pacotes saindo de instâncias, e Cloud NAT permite saída para recursos sem IP externo.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Conceito</th><th>AWS</th><th>Azure</th><th>Google Cloud</th></tr></thead>\n    <tbody>\n      <tr><td>Tabela/rotas</td><td>VPC route tables</td><td>System routes e route tables com UDR</td><td>VPC routes</td></tr>\n      <tr><td>Entrada/saída internet direta</td><td>Internet Gateway</td><td>Rotas para Internet e IP público/load balancer</td><td>External IP / Cloud Router / internet gateway implícito do VPC</td></tr>\n      <tr><td>Saída privada</td><td>NAT Gateway</td><td>NAT Gateway</td><td>Cloud NAT</td></tr>\n      <tr><td>Inspeção centralizada</td><td>Appliance, firewall, TGW appliance mode</td><td>UDR para NVA/Azure Firewall</td><td>Custom routes para appliances/firewall</td></tr>\n      <tr><td>Evidência</td><td>VPC Flow Logs, NAT/firewall logs</td><td>NSG flow logs, firewall logs, Network Watcher</td><td>VPC Flow Logs, firewall logs, Cloud Logging</td></tr>\n    </tbody>\n  </table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, route tables e gateways devem ser tratados como código revisável. Um pull request que adiciona <code>0.0.0.0/0</code> para uma subnet sensível é uma mudança de segurança. Um módulo Terraform que cria NAT Gateway em todas as zonas é também uma decisão financeira. Um pipeline que altera UDR para enviar tráfego pelo firewall pode causar indisponibilidade se não houver validação de rota efetiva.</p>\n  <p>Boas práticas incluem revisão de IaC, testes estáticos para rotas perigosas, políticas que impedem subnets de dados com rota direta para internet, tagging obrigatório, ambiente de teste, plano de rollback e validação pós-deploy com comandos do provedor. A rede cloud deixa de ser configuração manual e vira artefato versionado.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Segurança de rotas cloud exige defender tanto a entrada quanto a saída. Muitas empresas focam em bloquear entrada da internet, mas esquecem egress. Um workload comprometido em subnet privada pode iniciar conexões para fora via NAT. Se a saída não passa por inspeção, allowlist, proxy ou logging adequado, o SOC perde visibilidade.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Subnet pública acidental</td><td>Rota para IGW + IP público em workload</td><td>Exposição direta</td><td>Policy as code, revisão de rotas, inventory e CSPM</td></tr>\n      <tr><td>Egress sem controle</td><td>Rota default para NAT sem firewall/proxy/logs</td><td>Exfiltração difícil de detectar</td><td>Egress control, logs, proxy, firewall e alertas</td></tr>\n      <tr><td>UDR errada</td><td>Next hop para appliance incorreto</td><td>Indisponibilidade ou bypass</td><td>Validação de rota efetiva e mudança com rollback</td></tr>\n      <tr><td>Rota assimétrica</td><td>Ida por firewall e volta por caminho diferente</td><td>Falha de sessão e troubleshooting difícil</td><td>Desenho simétrico, stateful firewall e testes por fluxo</td></tr>\n      <tr><td>NAT confundido com segurança</td><td>Equipe acha que NAT substitui firewall</td><td>Falsa sensação de proteção</td><td>Educação, matriz de fluxos e controles explícitos</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra a diferença entre uma subnet pública com rota para Internet Gateway, uma subnet privada com saída via NAT Gateway, uma subnet protegida por firewall/NVA e uma rota user-defined para tráfego híbrido.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1120 560\" role=\"img\" aria-labelledby=\"route-cloud-title route-cloud-desc\">\n    <title id=\"route-cloud-title\">Rotas, Internet Gateway, NAT Gateway e UDR em cloud</title>\n    <desc id=\"route-cloud-desc\">Uma VPC ou VNet com subnets públicas e privadas. A subnet pública aponta para Internet Gateway. A subnet privada aponta para NAT Gateway para saída. Uma rota user-defined envia tráfego interno para firewall ou appliance. Logs alimentam SIEM.</desc>\n    <defs>\n      <marker id=\"arrow-route-1404\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"45\" width=\"760\" height=\"410\" rx=\"20\" class=\"svg-boundary\" />\n    <text x=\"410\" y=\"78\" text-anchor=\"middle\" class=\"svg-label\">VPC / VNet / VPC Network</text>\n    <rect x=\"70\" y=\"115\" width=\"210\" height=\"115\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"175\" y=\"145\" text-anchor=\"middle\" class=\"svg-label\">Subnet pública</text>\n    <text x=\"175\" y=\"174\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota 0.0.0.0/0 → IGW</text>\n    <rect x=\"112\" y=\"190\" width=\"126\" height=\"28\" rx=\"8\" class=\"svg-node svg-node--server\" />\n    <text x=\"175\" y=\"210\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Load Balancer</text>\n    <rect x=\"325\" y=\"115\" width=\"210\" height=\"115\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"430\" y=\"145\" text-anchor=\"middle\" class=\"svg-label\">Subnet privada</text>\n    <text x=\"430\" y=\"174\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota 0.0.0.0/0 → NAT</text>\n    <rect x=\"367\" y=\"190\" width=\"126\" height=\"28\" rx=\"8\" class=\"svg-node svg-node--server\" />\n    <text x=\"430\" y=\"210\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">App/Worker</text>\n    <rect x=\"580\" y=\"115\" width=\"170\" height=\"115\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"665\" y=\"145\" text-anchor=\"middle\" class=\"svg-label\">Dados</text>\n    <text x=\"665\" y=\"174\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sem rota internet</text>\n    <rect x=\"612\" y=\"190\" width=\"106\" height=\"28\" rx=\"8\" class=\"svg-node svg-node--server\" />\n    <text x=\"665\" y=\"210\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Banco</text>\n    <rect x=\"94\" y=\"298\" width=\"150\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"169\" y=\"333\" text-anchor=\"middle\" class=\"svg-label\">Internet Gateway</text>\n    <rect x=\"350\" y=\"298\" width=\"150\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"425\" y=\"333\" text-anchor=\"middle\" class=\"svg-label\">NAT Gateway</text>\n    <rect x=\"590\" y=\"298\" width=\"150\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"665\" y=\"333\" text-anchor=\"middle\" class=\"svg-label\">Firewall / NVA</text>\n    <rect x=\"845\" y=\"105\" width=\"210\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"950\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Internet / SaaS</text>\n    <rect x=\"845\" y=\"238\" width=\"210\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"950\" y=\"283\" text-anchor=\"middle\" class=\"svg-label\">Datacenter / VPN</text>\n    <rect x=\"845\" y=\"370\" width=\"210\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"950\" y=\"414\" text-anchor=\"middle\" class=\"svg-label\">SIEM / Flow Logs</text>\n    <line x1=\"175\" y1=\"230\" x2=\"169\" y2=\"298\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-route-1404)\" />\n    <line x1=\"430\" y1=\"230\" x2=\"425\" y2=\"298\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-route-1404)\" />\n    <line x1=\"665\" y1=\"230\" x2=\"665\" y2=\"298\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#arrow-route-1404)\" />\n    <line x1=\"244\" y1=\"327\" x2=\"845\" y2=\"142\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-route-1404)\" />\n    <line x1=\"500\" y1=\"327\" x2=\"845\" y2=\"142\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-route-1404)\" />\n    <line x1=\"740\" y1=\"327\" x2=\"845\" y2=\"276\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-route-1404)\" />\n    <line x1=\"665\" y1=\"356\" x2=\"845\" y2=\"407\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-route-1404)\" />\n    <text x=\"320\" y=\"392\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rotas efetivas + políticas + logs determinam o caminho real</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é conceitual e defensivo. O objetivo é desenhar e validar uma tabela de rotas cloud sem criar recursos reais, evitando custo. Você irá receber um cenário, construir route tables, justificar cada rota, identificar riscos e definir como validar o caminho efetivo em AWS, Azure ou Google Cloud.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam leitura de rotas, identificação de subnets públicas/privadas, diagnóstico de egress e desenho de UDR para firewall.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma empresa que precisa publicar um sistema web, manter aplicação e banco privados, permitir saída controlada, conectar datacenter e garantir logs para investigação.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada prioriza raciocínio: primeiro classificar zonas, depois definir caminhos, depois aplicar controles, depois validar custo e evidência.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> route tables definem o caminho; políticas definem permissão; logs comprovam o que aconteceu.</li>\n    <li><strong>O que lembrar:</strong> uma subnet pública geralmente combina rota para internet e recurso publicamente endereçável; NAT permite saída, não autorização.</li>\n    <li><strong>Erro comum:</strong> acreditar que “privado” significa “seguro” sem validar rotas, egress, firewall, logs e retorno.</li>\n    <li><strong>Uso real:</strong> desenhar e revisar rotas é tarefa de arquitetura, segurança, SRE, plataforma e cloud governance.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, vamos aprofundar <strong>Security Groups, NSG, NACL e Cloud Firewalls</strong>. Depois de entender para onde o pacote tenta ir, precisamos entender quais controles permitem, bloqueiam, registram ou inspecionam esse tráfego.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4",
      "Camada 7 quando há proxy/firewall de aplicação"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação quando há proxy, WAF ou inspeção"
    ],
    "relatedProtocols": [
      "IPv4",
      "IPv6",
      "ICMP",
      "TCP",
      "UDP",
      "DNS",
      "BGP em conectividade híbrida"
    ],
    "dependsOn": [
      "CIDR",
      "subnetting",
      "gateway padrão",
      "NAT",
      "firewall",
      "logs"
    ],
    "enables": [
      "egress control",
      "hub-spoke",
      "firewall central",
      "VPN",
      "private endpoints",
      "troubleshooting cloud"
    ]
  },
  "protocolFields": [
    {
      "field": "Destination CIDR",
      "size": "variável",
      "purpose": "Indica o prefixo de destino que será comparado na tabela de rotas.",
      "securityObservation": "Rotas amplas como 0.0.0.0/0 precisam de justificativa e controle."
    },
    {
      "field": "Next hop / target",
      "size": "conceitual",
      "purpose": "Define para onde o pacote será enviado: local, gateway, NAT, firewall, VPN, peering ou blackhole.",
      "securityObservation": "Next hop errado pode causar bypass, indisponibilidade ou perda de visibilidade."
    },
    {
      "field": "Route priority / specificity",
      "size": "conceitual",
      "purpose": "Define qual rota vence quando múltiplas rotas combinam com o destino.",
      "securityObservation": "Uma rota mais específica pode contornar uma rota default esperada."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Workload privado",
      "action": "Envia pacote para API externa",
      "detail": "O destino não pertence ao CIDR local.",
      "possibleFailure": "DNS não resolve ou rota default ausente."
    },
    {
      "step": 2,
      "actor": "Route table da subnet",
      "action": "Seleciona 0.0.0.0/0 para NAT Gateway",
      "detail": "Rota default cobre destinos não conhecidos.",
      "possibleFailure": "Next hop NAT inexistente, indisponível ou em subnet sem internet."
    },
    {
      "step": 3,
      "actor": "NAT Gateway",
      "action": "Traduz origem privada para IP de saída",
      "detail": "Permite conexão iniciada de dentro para fora.",
      "possibleFailure": "Custo elevado, logs insuficientes ou destino bloqueado."
    },
    {
      "step": 4,
      "actor": "Firewall/política",
      "action": "Permite ou nega conforme regra",
      "detail": "Pode haver security group, NSG, firewall cloud ou proxy.",
      "possibleFailure": "Política permite demais ou bloqueia sem log."
    },
    {
      "step": 5,
      "actor": "Destino externo",
      "action": "Responde pela sessão estabelecida",
      "detail": "O retorno depende do estado e do caminho correto.",
      "possibleFailure": "Rota assimétrica, timeout ou bloqueio no retorno."
    }
  ],
  "deepDive": {
    "mentalModel": "Roteamento cloud é uma pergunta repetida para cada pacote: qual destino, qual rota mais específica, qual próximo salto, qual política, qual retorno e qual evidência?",
    "keyTerms": [
      "route table",
      "Internet Gateway",
      "NAT Gateway",
      "UDR",
      "next hop",
      "egress",
      "blackhole",
      "rota efetiva"
    ],
    "limitations": [
      "Route table não substitui firewall, IAM ou criptografia.",
      "NAT não prova que o tráfego é seguro; apenas traduz endereços para saída.",
      "Rotas corretas não garantem aplicação funcionando se DNS, TLS, proxy ou política estiverem errados.",
      "Inspeção centralizada aumenta controle, mas também cria dependência crítica e risco de gargalo."
    ],
    "whenToUse": [
      "Para separar caminhos de subnets públicas, privadas, dados e segurança.",
      "Para enviar egress por NAT, firewall, proxy ou appliance.",
      "Para conectar VPC/VNet a datacenter, transit, peering ou hub-spoke.",
      "Para implementar inspeção obrigatória e reduzir bypass."
    ],
    "whenNotToUse": [
      "Não use UDR/custom route como gambiarra sem documentação e validação.",
      "Não envie tudo para NAT se o requisito pede inspeção, allowlist e auditoria.",
      "Não crie rota default para internet em subnet de dados.",
      "Não centralize tráfego em appliance sem alta disponibilidade e plano de capacidade."
    ],
    "operationalImpact": [
      "Exige documentação de rotas por subnet, owner, justificativa, ambiente e plano de rollback.",
      "Muda troubleshooting: é preciso verificar rota efetiva antes de culpar firewall ou aplicação.",
      "Cria dependência de gateways e appliances gerenciados ou próprios.",
      "Exige monitoramento de disponibilidade, throughput, drops, logs e custo."
    ],
    "financialImpact": [
      "NAT Gateway pode cobrar por hora e por GB processado, dependendo do provedor.",
      "Egress para internet, entre regiões, entre zonas ou via appliances pode gerar custo recorrente.",
      "Flow logs e firewall logs aumentam custo de armazenamento e ingestão em SIEM.",
      "Arquitetura de inspeção central pode exigir appliance licenciado ou firewall gerenciado."
    ],
    "securityImpact": [
      "Route tables determinam se workloads podem alcançar internet, redes internas e serviços privados.",
      "UDR/custom routes podem forçar tráfego por firewall ou, se erradas, criar bypass.",
      "Egress control reduz risco de exfiltração e comunicação com destinos não autorizados.",
      "Logs de fluxo ajudam investigação, mas precisam de retenção e contexto."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que subnet privada é segura por definição.",
      "whyItHappens": "A equipe associa 'sem IP público' a 'sem risco'.",
      "consequence": "Workloads podem sair pela internet via NAT sem inspeção adequada.",
      "correction": "Validar rotas, egress, firewall, logs, endpoints privados e políticas."
    },
    {
      "mistake": "Confundir NAT Gateway com firewall.",
      "whyItHappens": "NAT esconde endereços privados e parece controle de segurança.",
      "consequence": "Permite saída ampla sem inspeção ou autorização granular.",
      "correction": "Usar firewall/proxy/allowlist/logs para controle de egress."
    },
    {
      "mistake": "Criar rota 0.0.0.0/0 sem justificar.",
      "whyItHappens": "É o caminho mais rápido para 'fazer funcionar'.",
      "consequence": "Expansão de superfície e custo imprevisível.",
      "correction": "Exigir revisão, owner, destino, ambiente e alternativa privada."
    },
    {
      "mistake": "Alterar UDR sem validar rota efetiva.",
      "whyItHappens": "O time presume que a rota aplicada é a rota usada.",
      "consequence": "Blackhole, bypass ou assimetria.",
      "correction": "Usar ferramentas de next hop, route analyzer e testes por fluxo."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "VM privada não acessa internet",
      "aplicação acessa internet mas não datacenter",
      "tráfego não passa pelo firewall",
      "custos de NAT aumentaram",
      "conexões intermitentes após mudança de UDR",
      "serviço responde em uma zona e falha em outra"
    ],
    "diagnosticQuestions": [
      "Qual é a subnet de origem e qual route table está associada?",
      "Qual destino exato está sendo testado e qual rota mais específica combina?",
      "O próximo salto existe e está disponível?",
      "A volta usa o mesmo caminho ou há assimetria?",
      "Há security group, NSG, NACL, firewall ou proxy bloqueando?",
      "Há flow logs ou logs de firewall mostrando accept/deny?"
    ],
    "commands": [
      {
        "platform": "AWS CLI",
        "command": "aws ec2 describe-route-tables --filters Name=vpc-id,Values=vpc-xxxxxxxx",
        "purpose": "Listar route tables e rotas de uma VPC.",
        "expectedObservation": "Rotas para local, IGW, NAT, TGW, VGW, peering ou ENI.",
        "interpretation": "Confirme se a subnet usa a tabela esperada e se a rota default aponta para o alvo correto."
      },
      {
        "platform": "AWS CLI",
        "command": "aws ec2 describe-nat-gateways --filter Name=vpc-id,Values=vpc-xxxxxxxx",
        "purpose": "Verificar NAT Gateways disponíveis.",
        "expectedObservation": "Estado available e subnet associada.",
        "interpretation": "NAT precisa estar disponível e com caminho adequado para internet."
      },
      {
        "platform": "Azure CLI",
        "command": "az network nic show-effective-route-table --resource-group RG --name NICNAME",
        "purpose": "Ver rotas efetivas de uma NIC.",
        "expectedObservation": "Lista de rotas efetivas com next hop.",
        "interpretation": "Útil para confirmar se UDR realmente alterou o caminho."
      },
      {
        "platform": "Azure CLI",
        "command": "az network watcher show-next-hop --resource-group RG --vm VMNAME --source-ip 10.10.1.4 --dest-ip 8.8.8.8",
        "purpose": "Identificar próximo salto para um destino.",
        "expectedObservation": "Next hop type e IP quando aplicável.",
        "interpretation": "Ajuda a distinguir problema de rota de problema de firewall."
      },
      {
        "platform": "Google Cloud CLI",
        "command": "gcloud compute routes list --filter='network:NETWORK_NAME'",
        "purpose": "Listar rotas em uma VPC do Google Cloud.",
        "expectedObservation": "Rotas de subnet, rotas customizadas e próximos saltos.",
        "interpretation": "Verifique prioridade, destino e next hop."
      },
      {
        "platform": "Linux na VM",
        "command": "ip route && curl -v https://example.com",
        "purpose": "Ver rota local e testar saída HTTP/TLS.",
        "expectedObservation": "Rota default local e tentativa de conexão.",
        "interpretation": "Ajuda a separar problema dentro da VM de problema na malha cloud."
      }
    ],
    "decisionTree": [
      {
        "if": "Destino não responde e não há flow log de saída",
        "then": "Verifique rota da subnet, security group/NSG e NACL antes de investigar aplicação."
      },
      {
        "if": "Flow log mostra deny",
        "then": "Investigue política de firewall/security group/NSG e não apenas roteamento."
      },
      {
        "if": "Tráfego sai via NAT mas custo explodiu",
        "then": "Mapeie destinos, volume, endpoints privados possíveis e logs por origem."
      },
      {
        "if": "Tráfego deveria passar por firewall mas aparece direto no NAT",
        "then": "Revisar UDR/custom route e associação de route table por subnet."
      }
    ]
  },
  "trafficCapture": {
    "tool": "Flow logs, firewall logs, tcpdump local quando autorizado e ferramentas de next hop do provedor",
    "filter": "srcaddr, dstaddr, dstport, action, nextHop, interfaceId, subnetId, vm/nic/resource",
    "whatToObserve": [
      "Rota efetiva",
      "accept/deny",
      "origem real",
      "destino externo",
      "volume em bytes",
      "subnet/NIC de origem",
      "horário e zona"
    ],
    "interpretation": "Em cloud, muitas vezes o melhor 'pacote' para investigação é metadado de fluxo. PCAP nem sempre está disponível, mas flow logs e next-hop tools ajudam a reconstruir o caminho."
  },
  "security": {
    "goodPractices": [
      "Documentar route tables por subnet, função, owner e justificativa.",
      "Evitar rota direta para internet em subnets de dados.",
      "Controlar egress com firewall, proxy, allowlist, endpoints privados e logs.",
      "Validar rota efetiva depois de mudanças de IaC.",
      "Alertar para rotas 0.0.0.0/0 em subnets sensíveis.",
      "Usar flow logs e retenção compatível com investigação."
    ],
    "badPractices": [
      "Usar NAT Gateway como substituto de firewall.",
      "Adicionar UDR sem plano de rollback.",
      "Permitir egress irrestrito por padrão.",
      "Não versionar route tables em IaC.",
      "Ignorar custo de NAT, egress e logs.",
      "Manter subnets de dados com caminho de saída não justificado."
    ],
    "commonErrors": [
      "Confundir rota com permissão",
      "Achar que IP privado impede saída",
      "Esquecer rota de retorno",
      "Não associar route table à subnet correta",
      "Não verificar rota mais específica"
    ],
    "vulnerabilities": [
      {
        "name": "Egress irrestrito",
        "description": "Workloads podem iniciar conexões para qualquer destino externo via NAT ou gateway.",
        "defensiveExplanation": "Isso facilita comunicação com destinos não autorizados e reduz capacidade de detecção.",
        "mitigation": "Egress firewall, proxy, allowlist, DNS control, endpoints privados e alertas de destino raro."
      },
      {
        "name": "Bypass de inspeção",
        "description": "Uma rota mais específica ou tabela associada incorretamente evita o firewall central.",
        "defensiveExplanation": "O tráfego parece estar protegido no desenho, mas segue outro caminho na prática.",
        "mitigation": "Validação de rota efetiva, testes automatizados, flow logs e guardrails em IaC."
      },
      {
        "name": "Rota para internet em subnet sensível",
        "description": "Subnets de dados ou administração ganham caminho direto ou indireto para internet sem necessidade.",
        "defensiveExplanation": "Aumenta risco de exposição, exfiltração e atualizações fora de processo.",
        "mitigation": "Subnets isoladas, endpoints privados, repositórios internos e política de exceção formal."
      }
    ],
    "monitoring": [
      "Mudanças em route tables",
      "Criação de NAT Gateways",
      "Rotas 0.0.0.0/0",
      "Aumento de bytes via NAT",
      "Destinos externos raros",
      "Flow logs com deny inesperado",
      "UDRs apontando para next hop novo"
    ],
    "hardening": [
      "Bloquear rotas públicas por padrão em subnets sensíveis",
      "Exigir tags e owner em gateways",
      "Usar policy as code",
      "Ativar flow logs",
      "Revisar rotas efetivas periodicamente",
      "Criar dashboards de custo por egress"
    ],
    "detectionIdeas": [
      "Alertar quando subnet de dados recebe rota default",
      "Comparar IaC desejado com estado real",
      "Detectar tráfego que não passa pelo firewall central",
      "Correlacionar picos de NAT com workloads e deployments"
    ]
  },
  "lab": {
    "id": "lab-14.4",
    "title": "Desenhar e validar route tables, NAT e UDR sem criar recursos cloud",
    "labType": "cloud",
    "objective": "Criar um plano de roteamento cloud seguro para subnets públicas, privadas, dados, segurança e conectividade híbrida, incluindo validação, troubleshooting, custos e evidências.",
    "scenario": "Uma empresa vai publicar uma aplicação web em cloud. O frontend entra por load balancer público, a aplicação fica privada, o banco não pode ter saída direta para internet, atualizações devem sair por NAT ou proxy, o tráfego para datacenter deve passar por VPN e todo egress sensível deve ser registrado.",
    "topology": "Internet -> Load Balancer público -> Subnet App privada -> Subnet Dados isolada; Subnet Segurança com firewall/NVA; VPN para datacenter; NAT/egress control para atualizações; Flow logs para SIEM.",
    "architecture": "Uma VPC/VNet com quatro subnets: public-ingress, private-app, private-data e security-egress. Cada subnet possui route table própria, com rotas explícitas para local, internet, NAT, firewall/NVA e datacenter quando aplicável.",
    "prerequisites": [
      "Ter estudado VPC/VNet, CIDR e subnets na aula 14.3.",
      "Entender rota default, gateway e NAT dos módulos anteriores.",
      "Não é necessário conta cloud; o laboratório é conceitual e sem custo."
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Opcional: draw.io/local ou papel",
      "Opcional: console cloud somente para observação, sem criar recursos"
    ],
    "estimatedTimeMinutes": 80,
    "cost": "zero",
    "safetyNotes": [
      "Não crie recursos cloud reais neste laboratório para evitar cobrança.",
      "Não use redes de terceiros como alvo de teste.",
      "O foco é desenho, validação e defesa.",
      "Não simule exfiltração real; use apenas hipóteses e eventos fictícios."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir zonas e subnets",
        "instruction": "Crie uma tabela com as subnets public-ingress, private-app, private-data e security-egress.",
        "command": "Subnet | CIDR | Função | Exposição | Route table | Logs | Owner",
        "expectedOutput": "Tabela inicial de subnets e funções.",
        "explanation": "Antes de criar rotas, é preciso saber o papel de cada zona."
      },
      {
        "number": 2,
        "title": "Criar route table da subnet pública",
        "instruction": "Defina uma rota local e uma rota default para Internet Gateway somente na subnet de ingresso público.",
        "command": "public-ingress: local -> VPC CIDR; 0.0.0.0/0 -> Internet Gateway",
        "expectedOutput": "Somente a subnet pública possui caminho direto de entrada/saída para internet.",
        "explanation": "A presença de IGW na route table não basta; exposição depende também de IP público, load balancer e políticas."
      },
      {
        "number": 3,
        "title": "Criar route table da aplicação privada",
        "instruction": "Defina rota local, rota para datacenter via VPN e rota default para NAT ou firewall de egress.",
        "command": "private-app: local -> VPC CIDR; datacenter CIDR -> VPN/TGW/VNet Gateway; 0.0.0.0/0 -> NAT ou firewall-egress",
        "expectedOutput": "Aplicação privada consegue sair de forma controlada e alcançar datacenter quando permitido.",
        "explanation": "Subnets privadas frequentemente precisam de saída, mas essa saída deve ser planejada e registrada."
      },
      {
        "number": 4,
        "title": "Criar route table da subnet de dados",
        "instruction": "Bloqueie saída default para internet e permita apenas caminhos internos necessários.",
        "command": "private-data: local -> VPC CIDR; app subnet -> local; sem 0.0.0.0/0",
        "expectedOutput": "Banco sem egress direto por padrão.",
        "explanation": "Dados sensíveis devem ter rotas mínimas e acessos justificados."
      },
      {
        "number": 5,
        "title": "Criar UDR/custom route para inspeção",
        "instruction": "Defina que tráfego para datacenter ou segmentos sensíveis passe por firewall/NVA quando a política exigir.",
        "command": "destino sensível -> firewall/NVA next hop",
        "expectedOutput": "Fluxos críticos passam por ponto de inspeção.",
        "explanation": "UDR/custom route permite inspeção centralizada, mas aumenta risco de assimetria e indisponibilidade se mal desenhada."
      },
      {
        "number": 6,
        "title": "Adicionar validação de rota efetiva",
        "instruction": "Para cada fluxo importante, escreva como você validaria o caminho no provedor escolhido.",
        "command": "AWS: describe-route-tables; Azure: show-effective-route-table / show-next-hop; GCP: gcloud compute routes list",
        "expectedOutput": "Plano de validação por fluxo.",
        "explanation": "Arquitetura sem validação vira desenho bonito, não controle real."
      },
      {
        "number": 7,
        "title": "Planejar logs e custo",
        "instruction": "Liste quais logs serão ativados e quais componentes geram custo recorrente.",
        "command": "Flow logs | Firewall logs | NAT bytes | Egress | SIEM ingest | Retenção",
        "expectedOutput": "Tabela de custo e evidência.",
        "explanation": "NAT, egress e logs podem se tornar custo relevante em produção."
      },
      {
        "number": 8,
        "title": "Criar plano de troubleshooting",
        "instruction": "Crie uma árvore de decisão para VM privada sem acesso externo.",
        "command": "DNS? rota? NAT? firewall? retorno? logs? destino?",
        "expectedOutput": "Playbook curto de troubleshooting.",
        "explanation": "Separar hipóteses evita culpar aplicação quando o problema é rota ou NAT."
      }
    ],
    "expectedResult": "Ao final, o aluno terá uma matriz de route tables por subnet, um plano de UDR/custom routes, um plano de validação, uma lista de riscos e uma estimativa qualitativa de custos de rede.",
    "validation": [
      {
        "check": "Subnets sensíveis não têm rota direta para internet",
        "command": "Revisar matriz de route tables",
        "expected": "private-data sem 0.0.0.0/0 para IGW/NAT salvo exceção justificada",
        "ifFails": "Remover rota default ou justificar e adicionar controle de egress."
      },
      {
        "check": "Aplicação privada possui saída controlada",
        "command": "Revisar private-app route table",
        "expected": "0.0.0.0/0 para NAT, firewall ou proxy planejado",
        "ifFails": "Adicionar caminho de saída controlado ou endpoints privados."
      },
      {
        "check": "Tráfego para datacenter tem rota específica",
        "command": "Comparar CIDR do datacenter com route tables",
        "expected": "CIDR on-premises aponta para VPN/TGW/VNet Gateway ou firewall",
        "ifFails": "Adicionar rota específica e validar retorno."
      },
      {
        "check": "Há evidência para investigação",
        "command": "Revisar plano de logs",
        "expected": "Flow logs e logs de firewall/NAT/SIEM definidos",
        "ifFails": "Ativar logs mínimos e definir retenção."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "VM privada não acessa internet",
        "probableCause": "Rota default ausente, NAT indisponível, DNS falhando ou firewall bloqueando.",
        "howToConfirm": "Verificar route table, NAT, flow logs e teste DNS/curl.",
        "fix": "Corrigir rota, NAT, DNS ou política conforme evidência."
      },
      {
        "symptom": "Tráfego não passa pelo firewall central",
        "probableCause": "Route table errada associada à subnet ou rota mais específica desviando caminho.",
        "howToConfirm": "Validar rota efetiva e flow logs.",
        "fix": "Corrigir associação da route table ou UDR/custom route."
      },
      {
        "symptom": "Custo de NAT aumentou",
        "probableCause": "Workloads usando internet para serviços que poderiam ser privados ou tráfego anormal.",
        "howToConfirm": "Correlacionar NAT bytes, flow logs e deployments.",
        "fix": "Usar endpoints privados, proxy/cache, allowlist e investigação de destino raro."
      },
      {
        "symptom": "Conexão com datacenter é intermitente",
        "probableCause": "Rota assimétrica, appliance sem HA, conflito de CIDR ou firewall stateful derrubando retorno.",
        "howToConfirm": "Testar ida/volta, logs do gateway, firewall e rota efetiva.",
        "fix": "Corrigir simetria, rotas específicas, HA ou CIDR."
      }
    ],
    "improvements": [
      "Adicionar policy as code para bloquear rotas públicas indevidas.",
      "Criar dashboard de egress por subnet e workload.",
      "Simular falha de NAT/appliance em tabletop sem derrubar produção.",
      "Adicionar endpoints privados para serviços gerenciados frequentes.",
      "Criar runbook de rollback para alterações de UDR."
    ],
    "evidenceToCollect": [
      "Matriz de route tables",
      "Diagrama da topologia",
      "Lista de fluxos e next hops",
      "Plano de logs",
      "Tabela de riscos e custos",
      "Playbook de troubleshooting"
    ],
    "questions": [
      "Qual subnet realmente precisa de rota para internet?",
      "Quais fluxos devem passar por firewall?",
      "Quais destinos externos poderiam usar endpoint privado?",
      "Como provar que um pacote passou pelo caminho esperado?",
      "Qual mudança de rota teria maior impacto em produção?"
    ],
    "challenge": "Desenhe as rotas de uma VPC/VNet para uma aplicação de três camadas com integração ao datacenter, egress control e logs. Justifique cada rota default e cada UDR/custom route.",
    "solution": "Uma solução madura usa subnet pública apenas para ingresso controlado, subnets privadas para aplicação, subnet de dados sem egress default, rota específica para datacenter via gateway adequado, egress por NAT/firewall/proxy conforme risco, flow logs ativados e validação de rota efetiva após cada mudança. NAT não é tratado como firewall, e rotas amplas exigem justificativa."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma rota default é útil e perigosa ao mesmo tempo?",
      "hints": [
        "Pense em destinos desconhecidos.",
        "Pense em egress e exposição."
      ],
      "expectedIdeas": [
        "facilidade",
        "caminho amplo",
        "controle",
        "custo",
        "risco"
      ],
      "explanation": "A rota default simplifica saída para destinos não especificados, mas pode abrir caminho demais se não houver política e logs."
    },
    {
      "type": "diagnóstico",
      "question": "Uma VM privada resolve DNS, mas não conecta a repositórios externos. O que você verificaria?",
      "hints": [
        "Separe DNS de rota.",
        "Pense em NAT e firewall."
      ],
      "expectedIdeas": [
        "route table",
        "NAT",
        "security group",
        "NSG",
        "firewall",
        "flow logs"
      ],
      "explanation": "Resolver nome não prova que existe rota, NAT ou permissão para conexão."
    },
    {
      "type": "cenário real",
      "question": "A segurança exige que todo egress passe por firewall. Qual erro de arquitetura poderia burlar isso?",
      "hints": [
        "Pense em route table por subnet.",
        "Pense em rotas mais específicas."
      ],
      "expectedIdeas": [
        "UDR ausente",
        "route table errada",
        "NAT direto",
        "peering",
        "rota específica desviando"
      ],
      "explanation": "O desenho precisa validar rota efetiva, não apenas desenhar um firewall no diagrama."
    }
  ],
  "quiz": [
    {
      "id": "q14.4.1",
      "type": "conceito",
      "q": "Qual é a função principal de uma route table em uma rede cloud?",
      "opts": [
        "Definir para onde o tráfego deve ser encaminhado com base no destino",
        "Criptografar automaticamente todos os pacotes",
        "Substituir security groups e firewalls",
        "Criar usuários e permissões IAM"
      ],
      "a": 0,
      "exp": "Route tables definem caminhos/next hops. Elas não substituem controles de permissão, criptografia ou identidade.",
      "difficulty": "iniciante",
      "topic": "route tables"
    },
    {
      "id": "q14.4.2",
      "type": "comparação",
      "q": "Qual afirmação sobre NAT Gateway é correta?",
      "opts": [
        "Permite que recursos privados iniciem conexões de saída, mas não substitui firewall",
        "Garante que todo tráfego é seguro",
        "Permite entrada direta da internet para qualquer VM privada",
        "Remove a necessidade de logs de fluxo"
      ],
      "a": 0,
      "exp": "NAT Gateway ajuda na saída de recursos privados, mas controle de segurança exige políticas, inspeção e logs.",
      "difficulty": "intermediário",
      "topic": "nat"
    },
    {
      "id": "q14.4.3",
      "type": "diagnóstico",
      "q": "Uma subnet de banco possui rota 0.0.0.0/0 para NAT sem justificativa. Qual é o principal risco?",
      "opts": [
        "Egress desnecessário de dados sensíveis",
        "Impossibilidade de comunicação local",
        "Bloqueio automático de DNS interno",
        "Criação obrigatória de IP público no banco"
      ],
      "a": 0,
      "exp": "Subnets de dados geralmente devem ter saída mínima. Rota default para NAT amplia risco de egress e exfiltração.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q14.4.4",
      "type": "cloud",
      "q": "Em Azure, qual recurso costuma ser usado para alterar o próximo salto de tráfego de uma subnet para uma NVA/firewall?",
      "opts": [
        "User Defined Route em route table",
        "Azure Key Vault",
        "Managed Identity",
        "Availability Set"
      ],
      "a": 0,
      "exp": "UDRs permitem alterar comportamento de roteamento e direcionar tráfego para appliances ou outros next hops suportados.",
      "difficulty": "intermediário",
      "topic": "azure"
    },
    {
      "id": "q14.4.5",
      "type": "troubleshooting",
      "q": "O tráfego deveria passar pelo firewall, mas os flow logs indicam saída direta via NAT. Qual hipótese testar primeiro?",
      "opts": [
        "A subnet está associada à route table errada ou falta UDR/custom route",
        "O DNS público sempre está comprometido",
        "O certificado TLS do site externo expirou",
        "O sistema operacional da VM não suporta TCP"
      ],
      "a": 0,
      "exp": "Se a saída vai direto ao NAT, a rota efetiva precisa ser verificada antes de investigar hipóteses de aplicação.",
      "difficulty": "avançado",
      "topic": "rota efetiva"
    },
    {
      "id": "q14.4.6",
      "type": "custos",
      "q": "Por que NAT Gateway deve entrar na discussão financeira de arquitetura?",
      "opts": [
        "Porque pode gerar cobrança por tempo provisionado e volume processado, dependendo do provedor",
        "Porque elimina todo custo de egress",
        "Porque é sempre gratuito em contas corporativas",
        "Porque reduz automaticamente ingestão no SIEM"
      ],
      "a": 0,
      "exp": "NAT gerenciado pode ter cobrança por hora e por volume, além de influenciar egress e logs.",
      "difficulty": "intermediário",
      "topic": "custos"
    }
  ],
  "flashcards": [
    {
      "id": "fc14.4.1",
      "front": "O que uma route table decide?",
      "back": "Ela decide o próximo salto para tráfego com base no destino, usando rotas como local, gateway, NAT, firewall, peering ou VPN.",
      "tags": [
        "route table"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.4.2",
      "front": "NAT Gateway é firewall?",
      "back": "Não. NAT traduz endereços e permite saída; firewall aplica política e inspeção. Eles podem ser complementares.",
      "tags": [
        "nat",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.4.3",
      "front": "O que torna uma subnet pública na prática?",
      "back": "Geralmente a combinação de rota para internet, recurso publicamente endereçável e políticas permitindo tráfego.",
      "tags": [
        "subnet pública"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.4.4",
      "front": "O que é UDR?",
      "back": "User Defined Route: rota definida pelo usuário para alterar o próximo salto, comum em Azure e conceitos equivalentes em outros provedores.",
      "tags": [
        "udr",
        "azure"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.4.5",
      "front": "O que é rota efetiva?",
      "back": "É o caminho realmente aplicado a um recurso depois de considerar rotas sistêmicas, customizadas, associações e prioridades.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.4.6",
      "front": "Qual risco de egress sem controle?",
      "back": "Workloads podem comunicar com destinos externos não autorizados, aumentando risco de exfiltração e dificultando investigação.",
      "tags": [
        "egress",
        "soc"
      ],
      "difficulty": "avançado"
    }
  ],
  "exercises": [
    {
      "id": "ex14.4.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre rota, firewall e NAT em uma frase para cada conceito.",
      "expectedAnswer": "Rota escolhe caminho; firewall decide permissão/inspeção; NAT traduz endereços para permitir comunicação entre domínios de endereçamento.",
      "explanation": "Separar essas funções evita diagnósticos errados."
    },
    {
      "id": "ex14.4.2",
      "type": "arquitetura",
      "prompt": "Desenhe route tables para subnets public, app e data em uma aplicação de três camadas.",
      "expectedAnswer": "Public com rota para IGW; app com rota local, rota para NAT/firewall e rotas privadas necessárias; data sem rota default para internet e com acesso apenas local necessário.",
      "explanation": "A subnet de dados deve ter o menor número de caminhos possível."
    },
    {
      "id": "ex14.4.3",
      "type": "diagnóstico",
      "prompt": "Uma VM privada não acessa updates externos. Liste cinco hipóteses em ordem lógica.",
      "expectedAnswer": "DNS, route table da subnet, NAT disponível, políticas SG/NSG/firewall, destino externo/retorno/logs.",
      "explanation": "A ordem pode variar, mas deve separar resolução de nome, caminho, permissão e evidência."
    },
    {
      "id": "ex14.4.4",
      "type": "custos",
      "prompt": "Liste três componentes de rota/egress que podem gerar custo recorrente.",
      "expectedAnswer": "NAT Gateway, egress para internet/inter-região, firewall gerenciado/appliance, logs de fluxo e ingestão no SIEM.",
      "explanation": "Roteamento cloud é também decisão financeira."
    }
  ],
  "challenge": {
    "title": "Desenhar rotas seguras para aplicação híbrida",
    "scenario": "Uma empresa possui aplicação web em cloud, banco gerenciado, integração com datacenter e requisito de inspeção de todo egress. O ambiente precisa suportar logs para SOC e rollback rápido de mudanças de rota.",
    "tasks": [
      "Definir subnets e funções.",
      "Criar route tables por subnet.",
      "Definir rotas para internet, NAT/firewall, datacenter e serviços privados.",
      "Identificar quais rotas são perigosas e precisam de aprovação.",
      "Criar plano de validação de rota efetiva.",
      "Criar plano de logs e custos."
    ],
    "constraints": [
      "Banco não pode ter saída direta para internet.",
      "Egress da aplicação deve ser registrado.",
      "Tráfego para datacenter deve ter rota específica.",
      "Mudanças de UDR precisam de rollback.",
      "Não criar recursos reais neste desafio."
    ],
    "expectedDeliverables": [
      "Diagrama",
      "Matriz de route tables",
      "Matriz de fluxos",
      "Plano de validação",
      "Plano de logs",
      "Riscos residuais"
    ],
    "gradingRubric": [
      {
        "criterion": "Clareza de zonas e subnets",
        "points": 20,
        "description": "Subnets possuem função, exposição e owner claros."
      },
      {
        "criterion": "Rotas seguras",
        "points": 25,
        "description": "Rotas default e específicas são justificadas e mínimas."
      },
      {
        "criterion": "Egress control",
        "points": 20,
        "description": "Saída passa por NAT/firewall/proxy/endpoints com logs."
      },
      {
        "criterion": "Troubleshooting",
        "points": 20,
        "description": "Há validação de rota efetiva e hipóteses de falha."
      },
      {
        "criterion": "Custo e evidência",
        "points": 15,
        "description": "NAT, egress e logs foram considerados."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro classificamos os fluxos: entrada pública, comunicação interna, saída para internet, acesso ao datacenter e acesso a serviços gerenciados. Depois escolhemos o próximo salto mínimo para cada fluxo, evitando rotas amplas em subnets sensíveis.",
    "steps": [
      "Criar public-ingress apenas para load balancer/WAF.",
      "Criar private-app sem IP público e saída via NAT/firewall/proxy.",
      "Criar private-data sem rota default para internet.",
      "Criar rotas específicas para datacenter via gateway/transit/VPN.",
      "Usar UDR/custom route para inspeção quando necessário.",
      "Ativar flow logs e logs de firewall/NAT.",
      "Validar rota efetiva após deploy e documentar rollback."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar 0.0.0.0/0 para IGW em todas as subnets.",
        "whyItIsWrong": "Isso expande exposição e destrói a separação entre zonas."
      },
      {
        "answer": "Usar NAT como único controle de segurança.",
        "whyItIsWrong": "NAT não substitui firewall, proxy, allowlist, IAM ou monitoramento."
      },
      {
        "answer": "Desenhar firewall no diagrama, mas não ajustar route tables.",
        "whyItIsWrong": "Sem rota efetiva para o firewall, o tráfego pode nunca passar por ele."
      }
    ],
    "finalAnswer": "Uma arquitetura defensiva usa route tables por função, menor caminho necessário, egress controlado, dados sem saída default, rotas específicas para ambientes híbridos, logs de fluxo e validação de rota efetiva. O sucesso não é apenas 'conectar'; é conectar com caminho conhecido, política aplicada, custo previsto e evidência para investigação."
  },
  "pedagogicalMap": {
    "problem": "Cloud precisa decidir caminhos para internet, redes privadas, datacenter, serviços gerenciados e firewalls.",
    "concept": "Route tables e gateways definem próximo salto; NAT permite saída privada; UDR/custom routes alteram caminho.",
    "internalMechanism": "A rota mais específica e a associação da subnet determinam o caminho efetivo antes das políticas de segurança.",
    "realUse": "Publicar aplicações, controlar egress, inspecionar tráfego, conectar datacenter e reduzir exposição.",
    "commonMistake": "Confundir NAT com segurança ou achar que subnet privada é automaticamente segura.",
    "securityImpact": "Rotas podem impedir, permitir, inspecionar ou desviar tráfego sensível.",
    "operationalImpact": "Exige documentação, validação de rota efetiva, monitoramento e rollback.",
    "summary": "Rota é caminho; firewall é permissão; NAT é tradução; logs são evidência."
  },
  "glossary": [
    {
      "term": "Route table",
      "shortDefinition": "Conjunto de rotas que define próximos saltos para destinos de rede.",
      "longDefinition": "Em cloud, uma route table controla como tráfego de subnets ou gateways é encaminhado para destinos locais, internet, NAT, VPN, peering, transit ou appliances.",
      "example": "Uma subnet privada pode ter 0.0.0.0/0 apontando para NAT Gateway.",
      "relatedTerms": [
        "rota",
        "next hop",
        "subnet"
      ],
      "relatedLessons": [
        "11.x",
        "14.4"
      ]
    },
    {
      "term": "Internet Gateway",
      "shortDefinition": "Gateway que permite conectividade entre rede cloud e internet em arquiteturas como AWS.",
      "longDefinition": "É um alvo de rota para tráfego que deve entrar ou sair pela internet, normalmente usado com subnets públicas e recursos publicamente endereçáveis.",
      "example": "Uma route table pública aponta 0.0.0.0/0 para o Internet Gateway.",
      "relatedTerms": [
        "subnet pública",
        "rota default"
      ],
      "relatedLessons": [
        "14.4"
      ]
    },
    {
      "term": "NAT Gateway",
      "shortDefinition": "Serviço gerenciado de tradução de endereços para saída de recursos privados.",
      "longDefinition": "Permite que workloads sem IP público iniciem conexões externas, sem permitir conexão direta de entrada para eles.",
      "example": "Uma VM privada acessa repositórios externos via NAT Gateway.",
      "relatedTerms": [
        "NAT",
        "egress"
      ],
      "relatedLessons": [
        "7.x",
        "14.4"
      ]
    },
    {
      "term": "UDR",
      "shortDefinition": "User Defined Route, rota definida pelo usuário para alterar próximo salto.",
      "longDefinition": "Muito usada em Azure para enviar tráfego por NVA, firewall ou caminho específico, substituindo ou complementando rotas padrão.",
      "example": "Uma UDR envia 0.0.0.0/0 para Azure Firewall.",
      "relatedTerms": [
        "next hop",
        "NVA"
      ],
      "relatedLessons": [
        "14.4"
      ]
    },
    {
      "term": "Egress",
      "shortDefinition": "Tráfego de saída de um ambiente para outro destino.",
      "longDefinition": "Em cloud, egress pode ser saída para internet, outra região, outro provedor, datacenter ou serviço SaaS, frequentemente com impacto de segurança e custo.",
      "example": "Tráfego de uma aplicação para API externa é egress.",
      "relatedTerms": [
        "NAT",
        "firewall",
        "proxy"
      ],
      "relatedLessons": [
        "13.7",
        "14.4"
      ]
    },
    {
      "term": "Rota efetiva",
      "shortDefinition": "Caminho realmente aplicado a um recurso após combinar rotas padrão e customizadas.",
      "longDefinition": "A rota efetiva considera associação de subnet, rotas sistêmicas, rotas customizadas, prioridades e next hop.",
      "example": "No Azure, Network Watcher pode ajudar a verificar next hop e rotas efetivas.",
      "relatedTerms": [
        "troubleshooting",
        "next hop"
      ],
      "relatedLessons": [
        "15.10",
        "14.4"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Configure route tables - Amazon VPC",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Route_Tables.html",
      "note": "Base sobre route tables em VPC."
    },
    {
      "type": "official-doc",
      "title": "Enable internet access for a VPC using an internet gateway",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html",
      "note": "Referência para rotas com Internet Gateway."
    },
    {
      "type": "official-doc",
      "title": "NAT gateways - Amazon VPC",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html",
      "note": "Referência para NAT Gateway."
    },
    {
      "type": "official-doc",
      "title": "Pricing for NAT gateways",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-pricing.html",
      "note": "Impacto financeiro de NAT Gateway."
    },
    {
      "type": "official-doc",
      "title": "Azure virtual network traffic routing",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-udr-overview",
      "note": "System routes e user-defined routes no Azure."
    },
    {
      "type": "official-doc",
      "title": "Routes | Virtual Private Cloud",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/vpc/docs/routes",
      "note": "Rotas em VPC do Google Cloud."
    },
    {
      "type": "official-doc",
      "title": "Cloud NAT documentation",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/nat/docs",
      "note": "Cloud NAT para saída gerenciada."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.x",
      "reason": "Roteamento cloud depende de rota, next hop, gateway e troubleshooting de caminhos."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação orienta route tables por zona."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "cloud/iac",
      "lesson": "IaC",
      "reason": "Route tables devem ser versionadas e revisadas como código."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "governança",
      "lesson": "policy",
      "reason": "Guardrails de rota e egress dependem de políticas e identidade de workload."
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
      "14.5"
    ]
  }
};
