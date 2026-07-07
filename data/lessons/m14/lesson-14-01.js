export const lesson1401 = {
  "id": "14.1",
  "moduleId": "m14",
  "order": 1,
  "title": "Por que Cloud Networking existe",
  "subtitle": "Como a cloud transformou redes físicas em redes virtuais programáveis, elásticas, auditáveis e cobradas por uso.",
  "duration": "90-140 min",
  "estimatedStudyTimeMinutes": 140,
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
    "Explicar por que cloud networking surgiu como resposta a limitações de datacenters tradicionais.",
    "Diferenciar rede física, rede virtualizada e rede cloud programável.",
    "Relacionar VPC, VNet e VPC Network com fundamentos de IP, subnet, rota, NAT, firewall e DNS.",
    "Entender impactos operacionais, financeiros e de segurança de redes cloud.",
    "Criar um primeiro mapa conceitual de arquitetura cloud segura sem provisionar recursos pagos.",
    "Preparar o aluno para regiões, zonas, subnets, rotas, gateways, endpoints privados e observabilidade nas próximas aulas."
  ],
  "learningOutcomes": [
    "Dado um desenho simples de aplicação, o aluno consegue indicar quais blocos de cloud networking seriam necessários.",
    "Dado um incidente de exposição pública, o aluno consegue relacionar IP público, rota, política e DNS.",
    "Dado um custo inesperado, o aluno consegue levantar hipóteses envolvendo NAT, egress, peering, logs e appliances.",
    "Dado um ambiente sem logs, o aluno consegue explicar por que flow logs e auditoria devem nascer junto com a rede."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine que uma equipe publica uma aplicação na cloud em poucas horas. O código sobe, a máquina virtual inicia, o banco gerenciado é criado e o balanceador de carga recebe um nome público. Tudo parece mais rápido do que comprar servidores, instalar racks, passar cabos e abrir chamado para firewall. Então começa o problema: a aplicação acessa o banco pela internet sem necessidade, o NAT Gateway gera custo inesperado, os logs de fluxo não estão ligados, o ambiente de homologação conversa com produção, o time de segurança não sabe quais portas estão expostas e ninguém consegue explicar por que uma chamada entre serviços ficou lenta ao cruzar regiões.</p>\n  <p>Esse é o ponto em que fica claro que cloud networking não é apenas “rede na nuvem”. É a reconstrução dos conceitos de rede dentro de um modelo programável, elástico, multi-tenant, cobrado por uso e fortemente integrado a identidade, automação e observabilidade.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> a cloud permite criar infraestrutura rápido, mas também permite criar exposição, rotas, custos e dependências rapidamente. Sem fundamentos de rede, a organização troca lentidão operacional por risco automatizado.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>No datacenter tradicional, redes eram fortemente associadas a equipamentos físicos: switches, roteadores, firewalls, appliances, cabos, racks, VLANs e circuitos. Para publicar um sistema novo, era comum abrir solicitações separadas para servidor, endereçamento, VLAN, regra de firewall, balanceador, DNS, storage, backup e monitoramento. Esse modelo dava controle, mas era lento, caro e pouco elástico.</p>\n  <p>A virtualização mudou a primeira parte da história: servidores deixaram de ser apenas máquinas físicas e viraram VMs. Em seguida, storage, balanceamento, firewall e redes também foram abstraídos. A cloud pública levou essa abstração a outro nível: em vez de pedir um switch físico, você declara uma VPC, VNet ou VPC Network; em vez de cabear um servidor a uma VLAN, você coloca uma interface virtual em uma subnet; em vez de pedir uma regra manual, você define uma política por API, console, CLI ou IaC.</p>\n  <p>O ganho foi enorme: velocidade, elasticidade, automação e alcance global. O custo foi uma nova camada de complexidade: a rede agora é software, mas continua obedecendo a princípios de endereçamento, roteamento, segmentação, exposição, latência, perda, DNS, TLS, logs e segurança.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema que cloud networking resolve é a necessidade de criar redes isoladas, escaláveis e automatizáveis sem depender de compra, instalação e operação manual de equipamentos físicos para cada projeto. Mas ele também cria novos problemas: a facilidade de criação torna mais fácil errar em escala.</p>\n  <ul>\n    <li><strong>Escala:</strong> aplicações podem nascer em múltiplas zonas, regiões e contas/projetos, exigindo conectividade consistente.</li>\n    <li><strong>Isolamento:</strong> cada workload precisa de fronteiras claras entre público, privado, gestão, dados, parceiros e ambiente corporativo.</li>\n    <li><strong>Exposição:</strong> uma subnet pública, um IP público ou uma regra permissiva podem publicar serviços sensíveis indevidamente.</li>\n    <li><strong>Custo:</strong> NAT, egress, peering, gateways, balanceadores, firewalls gerenciados e logs podem gerar cobrança recorrente.</li>\n    <li><strong>Operação:</strong> troubleshooting exige correlacionar rotas, security groups, NACL/NSG, DNS, IAM, load balancer, logs e políticas.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> achar que “a cloud cuida da rede”. O provedor oferece blocos de construção; o desenho, a política, a exposição, a observabilidade e o custo continuam sendo responsabilidade arquitetural do cliente.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução de redes até cloud networking pode ser entendida como uma sequência de abstrações. O objetivo nunca foi “sumir com a rede”, mas tornar a rede programável, repetível e consumível sob demanda.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Modelo</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Rede física</td><td>Switches, roteadores, firewalls e cabos dedicados.</td><td>Alta previsibilidade, mas baixa velocidade de mudança.</td><td>Virtualização de servidores e VLANs mais dinâmicas.</td></tr>\n      <tr><td>Datacenter virtualizado</td><td>VMs em hosts físicos, redes virtuais locais e overlays.</td><td>Mais ágil, mas ainda dependente de datacenter próprio.</td><td>Cloud pública com APIs e serviços gerenciados.</td></tr>\n      <tr><td>Cloud networking inicial</td><td>VPC/VNet, subnets, route tables, security groups e gateways.</td><td>Abstração poderosa, mas com risco de configuração manual inconsistente.</td><td>IaC, landing zones, guardrails e policy as code.</td></tr>\n      <tr><td>Cloud networking moderno</td><td>Redes híbridas, private endpoints, service mesh, CNIs, flow logs e integração com IAM.</td><td>Complexidade distribuída e custo variável.</td><td>Arquitetura orientada a segurança, automação e observabilidade.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Cloud networking é o conjunto de conceitos, serviços e práticas usados para conectar, isolar, publicar, proteger, observar e operar workloads em ambientes de cloud. Ele traduz fundamentos de rede para objetos controlados por software: VPC/VNet, subnets, tabelas de rota, gateways, security groups, NSGs, NACLs, firewalls gerenciados, load balancers, endpoints privados, VPNs, circuitos dedicados, DNS privado e logs de fluxo.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> cloud networking é a aplicação de redes de computadores em ambientes de cloud, onde endereçamento, segmentação, roteamento, exposição, segurança e observabilidade são declarados como recursos lógicos, geralmente consumidos por API e integrados a IAM, billing, automação e auditoria.</div>\n  <p>O ponto essencial é que a cloud não elimina IP, rota, porta, DNS, TLS, firewall ou latência. Ela muda onde esses controles vivem, como são configurados, como são cobrados e como são auditados.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Por baixo da interface simples do console, o provedor mantém uma infraestrutura física e uma camada de virtualização de rede. O cliente não manipula diretamente switches físicos do provedor; ele manipula objetos lógicos que o plano de controle transforma em comportamento de rede.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Você declara uma rede virtual:</strong> cria uma VPC, VNet ou VPC Network com um ou mais blocos CIDR.</li>\n    <li><strong>Você divide o espaço:</strong> cria subnets para workloads públicos, privados, dados, gestão ou serviços compartilhados.</li>\n    <li><strong>Você define caminhos:</strong> tabelas de rota indicam se o destino vai para internet gateway, NAT, VPN, peering, transit, firewall ou rede local.</li>\n    <li><strong>Você aplica controles:</strong> security groups, NSGs, NACLs, firewalls e políticas decidem quais fluxos são permitidos.</li>\n    <li><strong>Você publica serviços:</strong> load balancers e DNS expõem aplicações de forma controlada.</li>\n    <li><strong>Você restringe serviços internos:</strong> private endpoints e DNS privado evitam tráfego desnecessário pela internet.</li>\n    <li><strong>Você observa:</strong> flow logs, métricas, logs de auditoria e tracing ajudam a provar o que aconteceu.</li>\n  </ol>\n  <p>A diferença operacional é que esses passos podem ser feitos por console, CLI, SDK, Terraform, Pulumi, Bicep, CloudFormation, Crossplane ou pipelines GitOps. Isso torna a rede versionável, mas também torna erros de rede replicáveis em vários ambientes se não houver revisão, validação e guardrails.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura mínima de cloud networking normalmente tem zonas lógicas. Um desenho comum separa uma subnet pública para load balancers ou bastions controlados, subnets privadas para aplicações, subnets isoladas para bancos ou serviços internos, uma camada de egress controlado, DNS privado, logs de fluxo e integração com uma rede corporativa ou landing zone.</p>\n  <ul>\n    <li><strong>Camadas envolvidas:</strong> camada 3 para endereçamento e roteamento, camada 4 para portas e políticas, camada 7 para publicação, proxy, WAF e APIs.</li>\n    <li><strong>Componentes:</strong> VPC/VNet, subnet, route table, gateway, NAT, firewall, load balancer, DNS, private endpoint, flow logs e IAM.</li>\n    <li><strong>Dependências:</strong> módulos anteriores de IPv4, subnetting, roteamento, DNS, NAT, firewall, TLS, VPN, Zero Trust e segurança de redes.</li>\n    <li><strong>Pontos de falha:</strong> rota ausente, política bloqueando, DNS errado, subnet pública por engano, NAT caro, endpoint privado sem DNS correto, peering sem rota de retorno ou logs desativados.</li>\n  </ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em um condomínio empresarial. No datacenter tradicional, você compra o terreno, constrói os prédios, instala portões, câmeras, guaritas, cabos e salas. Na cloud, você aluga espaços dentro de uma cidade altamente automatizada. Você escolhe o bairro lógico, as ruas internas, os portões, as regras de acesso, as câmeras, os registros de entrada e quais serviços podem falar com quais.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em cloud, a “rua” não é necessariamente física e não existe um cabo que você possa seguir visualmente. O caminho é definido por planos de controle, overlays, regras lógicas, identidade, DNS e serviços gerenciados.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Um laboratório pequeno pode ter uma VPC com duas subnets: uma pública e uma privada. Na pública fica um load balancer com IP público. Na privada fica uma VM ou container da aplicação. O banco gerenciado não recebe IP público e só aceita conexão da aplicação. O tráfego de saída da aplicação passa por NAT, e os logs de fluxo são enviados para análise.</p>\n  <p>Mesmo nesse exemplo simples, aparecem conceitos dos módulos anteriores: CIDR, subnetting, rota default, gateway, NAT, porta TCP, DNS, TLS, firewall e logs.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, cloud networking costuma aparecer dentro de uma landing zone. Há contas ou assinaturas separadas por ambiente, uma rede hub para serviços compartilhados, redes spoke para aplicações, conectividade híbrida com datacenter, DNS privado, inspeção centralizada, logs enviados ao SIEM e políticas de governança para impedir exposição indevida.</p>\n  <p>A pergunta empresarial não é “como crio uma VPC?”, mas “como uma aplicação entra na arquitetura corporativa sem criar uma ilha insegura?”. Isso envolve padrões de nomeação, IPAM, rotas, DNS, firewall, IAM, custos, auditoria e responsabilidade de operação.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em AWS, o bloco central é a Amazon VPC. Em Azure, é a Azure Virtual Network. Em Google Cloud, é a VPC Network. Os nomes mudam, mas os problemas são parecidos: criar isolamento lógico, dividir subnets, controlar rotas, filtrar tráfego, publicar serviços, conectar redes e observar fluxos.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Conceito</th><th>AWS</th><th>Azure</th><th>Google Cloud</th></tr></thead>\n    <tbody>\n      <tr><td>Rede virtual</td><td>VPC</td><td>Virtual Network / VNet</td><td>VPC Network</td></tr>\n      <tr><td>Sub-rede</td><td>Subnet em zona de disponibilidade</td><td>Subnet dentro de VNet</td><td>Subnet regional</td></tr>\n      <tr><td>Filtro de instância/subnet</td><td>Security Group e NACL</td><td>NSG</td><td>Firewall policies/rules</td></tr>\n      <tr><td>Saída privada para internet</td><td>NAT Gateway</td><td>NAT Gateway</td><td>Cloud NAT</td></tr>\n      <tr><td>Observabilidade</td><td>VPC Flow Logs</td><td>VNet/NSG Flow Logs</td><td>VPC Flow Logs</td></tr>\n    </tbody>\n  </table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, cloud networking entra como código. Uma alteração de rota, subnet, security group, private endpoint ou DNS privado pode ser proposta em pull request, validada por política, revisada por pares, aplicada por pipeline e auditada no histórico do repositório.</p>\n  <p>Isso muda a responsabilidade do time: rede não é só configuração manual de console. Rede passa a ser artefato versionado. O pipeline precisa testar exposição pública, regra permissiva, CIDR conflitante, ausência de flow logs, falta de tags, NAT desnecessário e recursos sem dono. O mesmo raciocínio vale para Kubernetes, onde CNI, Ingress, NetworkPolicy, LoadBalancer e service mesh criam uma segunda camada de rede sobre a rede cloud.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, cloud networking é uma das maiores fontes de risco e de evidência. Um banco com IP público, uma rota para internet, um security group aberto para o mundo, um peering sem matriz de fluxo, um private endpoint sem DNS correto ou flow logs desativados podem transformar um ambiente cloud em uma superfície de ataque difícil de governar.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Exposição pública indevida</td><td>IP público, load balancer ou regra 0.0.0.0/0 sem justificativa.</td><td>Aumento de superfície de ataque.</td><td>Private endpoints, firewall, revisão de regras e IaC scanning.</td></tr>\n      <tr><td>Movimento lateral</td><td>Subnets e peering sem segmentação efetiva.</td><td>Comprometimento se espalha entre workloads.</td><td>Zonas, security groups, NSGs, microsegmentação e logs.</td></tr>\n      <tr><td>Custo invisível</td><td>NAT, egress, peering, logs e appliances sem controle.</td><td>Surpresa financeira e pressão para desativar controles.</td><td>FinOps, tagging, budgets, arquitetura de egress e revisão de tráfego.</td></tr>\n      <tr><td>Baixa investigabilidade</td><td>Flow logs, DNS logs e auditoria desativados.</td><td>Incidente sem linha do tempo confiável.</td><td>Logging por padrão, retenção definida e integração com SIEM.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra a mudança principal: no datacenter tradicional, a rede era construída como equipamentos físicos e cabos. Na cloud, você continua desenhando isolamento, rotas, publicação, segurança e observabilidade, mas faz isso por APIs e objetos lógicos do provedor.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"cloud-net-title cloud-net-desc\">\n    <title id=\"cloud-net-title\">Do datacenter físico à rede virtual em cloud</title>\n    <desc id=\"cloud-net-desc\">Datacenter tradicional com switches e firewall conectado a uma VPC ou VNet com sub-redes pública e privada, gateway, NAT, load balancer, security groups e flow logs.</desc>\n    <defs>\n      <marker id=\"arrow-cloud-1401\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"30\" y=\"60\" width=\"360\" height=\"400\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"210\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">Datacenter tradicional</text>\n\n    <rect x=\"70\" y=\"140\" width=\"110\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"125\" y=\"176\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Switch</text>\n\n    <rect x=\"240\" y=\"140\" width=\"110\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"295\" y=\"176\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Firewall</text>\n\n    <rect x=\"70\" y=\"260\" width=\"110\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"125\" y=\"296\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Servidor</text>\n\n    <rect x=\"240\" y=\"260\" width=\"110\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"295\" y=\"296\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Banco</text>\n\n    <line x1=\"180\" y1=\"171\" x2=\"240\" y2=\"171\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"125\" y1=\"202\" x2=\"125\" y2=\"260\" class=\"svg-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"295\" y1=\"202\" x2=\"295\" y2=\"260\" class=\"svg-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n\n    <rect x=\"430\" y=\"60\" width=\"500\" height=\"400\" rx=\"18\" class=\"svg-zone svg-node--cloud\" />\n    <text x=\"680\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">VPC / VNet / VPC Network</text>\n\n    <rect x=\"465\" y=\"125\" width=\"190\" height=\"120\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"560\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Subnet pública</text>\n    <rect x=\"500\" y=\"170\" width=\"120\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"560\" y=\"199\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Load Balancer</text>\n\n    <rect x=\"705\" y=\"125\" width=\"190\" height=\"120\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"800\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Subnet privada</text>\n    <rect x=\"735\" y=\"170\" width=\"130\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"800\" y=\"199\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Aplicação</text>\n\n    <rect x=\"465\" y=\"300\" width=\"190\" height=\"100\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"560\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Gateway / NAT</text>\n    <text x=\"560\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rota e egress</text>\n\n    <rect x=\"705\" y=\"300\" width=\"190\" height=\"100\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"800\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Flow logs</text>\n    <text x=\"800\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SIEM / auditoria</text>\n\n    <line x1=\"390\" y1=\"260\" x2=\"430\" y2=\"260\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"620\" y1=\"193\" x2=\"735\" y2=\"193\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"800\" y1=\"216\" x2=\"800\" y2=\"300\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-cloud-1401)\" />\n    <line x1=\"560\" y1=\"300\" x2=\"560\" y2=\"245\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#arrow-cloud-1401)\" />\n\n    <text x=\"480\" y=\"480\" class=\"svg-label svg-label--small\">Cloud networking não elimina redes: transforma redes em objetos versionáveis, auditáveis e cobrados por uso.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios forçam a separar nomes de serviços de problemas fundamentais: isolamento, rota, filtro, publicação, custo e observabilidade.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma migração inicial para cloud em que a pressa por publicar a aplicação precisa ser equilibrada com segurança, custo e operação.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução não busca um desenho único. Ela explica como raciocinar: primeiro ativos e fluxos, depois isolamento, exposição, egress, DNS, logs, custo e governança.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> cloud networking não elimina redes; transforma redes em objetos lógicos, programáveis e cobrados por uso.</li>\n    <li><strong>O que lembrar:</strong> VPC/VNet, subnets, rotas, filtros, gateways, DNS, NAT, load balancers e flow logs continuam dependendo dos fundamentos anteriores.</li>\n    <li><strong>Erro comum:</strong> criar recursos cloud sem matriz de fluxo, sem logs e sem estimativa de custo.</li>\n    <li><strong>Uso real:</strong> landing zones, aplicações web, conectividade híbrida, Kubernetes, private endpoints, egress control e SOC.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, vamos estudar regiões, zonas de disponibilidade, edge e latência. Antes de desenhar subnets e rotas, é preciso entender onde fisicamente e logicamente os workloads vivem, porque distância, zona, região e borda afetam disponibilidade, custo, performance e resiliência.</p>\n</section>"
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
  "cloudProviderMapping": [
    {
      "concept": "Rede virtual isolada",
      "aws": "Amazon VPC",
      "azure": "Azure Virtual Network",
      "gcp": "VPC Network"
    },
    {
      "concept": "Controle por instância/recurso",
      "aws": "Security Group",
      "azure": "Network Security Group",
      "gcp": "VPC firewall rules / firewall policies"
    },
    {
      "concept": "Saída privada para internet",
      "aws": "NAT Gateway",
      "azure": "NAT Gateway",
      "gcp": "Cloud NAT"
    },
    {
      "concept": "Logs de fluxo",
      "aws": "VPC Flow Logs",
      "azure": "Virtual Network Flow Logs / NSG flow logs",
      "gcp": "VPC Flow Logs"
    }
  ],
  "protocolFields": [
    {
      "field": "CIDR block",
      "size": "variável",
      "purpose": "Definir o espaço de endereçamento da rede virtual.",
      "securityObservation": "CIDR sobreposto dificulta peering, VPN, roteamento híbrido e fusões."
    },
    {
      "field": "Route destination",
      "size": "prefixo IP",
      "purpose": "Indicar qual rede de destino uma rota cobre.",
      "securityObservation": "Rotas amplas demais podem desviar tráfego para internet, transit ou firewall errado."
    },
    {
      "field": "Security rule",
      "size": "origem, destino, porta, protocolo e ação",
      "purpose": "Permitir ou negar fluxos específicos.",
      "securityObservation": "Regras any-any ou 0.0.0.0/0 sem justificativa aumentam exposição."
    },
    {
      "field": "Flow log 5-tuple",
      "size": "IP origem, IP destino, porta origem, porta destino e protocolo",
      "purpose": "Representar metadados de fluxo para troubleshooting e detecção.",
      "securityObservation": "Sem logs de fluxo, a investigação perde evidência de comunicação."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente externo",
      "action": "Resolve o DNS público da aplicação.",
      "detail": "O nome aponta para um load balancer ou endpoint publicado.",
      "possibleFailure": "DNS aponta para destino antigo, região errada ou endpoint público indevido."
    },
    {
      "step": 2,
      "actor": "Load balancer",
      "action": "Recebe conexão e encaminha para backend permitido.",
      "detail": "Health checks decidem quais destinos recebem tráfego.",
      "possibleFailure": "Security group/NSG bloqueia backend ou health check."
    },
    {
      "step": 3,
      "actor": "Aplicação privada",
      "action": "Consulta banco ou serviço interno.",
      "detail": "Fluxo deve permanecer privado e ser permitido por política mínima.",
      "possibleFailure": "Banco exposto publicamente ou DNS privado ausente."
    },
    {
      "step": 4,
      "actor": "Egress",
      "action": "Aplicação acessa dependência externa quando necessário.",
      "detail": "Saída pode passar por NAT, firewall, proxy ou endpoint privado.",
      "possibleFailure": "Custo alto de NAT/egress, rota ausente ou saída sem inspeção."
    }
  ],
  "deepDive": {
    "mentalModel": "Cloud networking é rede como produto lógico: você desenha intenção de conectividade, isolamento e exposição; o provedor implementa isso sobre infraestrutura física compartilhada.",
    "keyTerms": [
      "VPC",
      "VNet",
      "subnet",
      "route table",
      "security group",
      "NSG",
      "NACL",
      "NAT Gateway",
      "load balancer",
      "private endpoint",
      "flow logs",
      "egress"
    ],
    "limitations": [
      "A abstração esconde o físico, mas não elimina latência, perda, MTU, DNS, rota e custo de tráfego.",
      "Serviços têm nomes e comportamentos diferentes entre provedores.",
      "Controles distribuídos podem dificultar troubleshooting quando não há padrão de arquitetura.",
      "IaC acelera correções, mas também acelera erros repetidos se não houver validação."
    ],
    "whenToUse": [
      "Ao publicar workloads em cloud pública, privada ou híbrida.",
      "Ao criar landing zones, ambientes por produto, redes compartilhadas, Kubernetes e serviços gerenciados.",
      "Ao integrar datacenter, filiais, usuários remotos e workloads cloud."
    ],
    "whenNotToUse": [
      "Não usar como desculpa para ignorar fundamentos de rede.",
      "Não criar redes cloud isoladas de governança corporativa.",
      "Não expor serviços diretamente por conveniência quando private endpoint, proxy ou load balancer interno resolvem melhor."
    ],
    "operationalImpact": [
      "Exige padrões de naming, tagging, IPAM, rotas, DNS privado, logs, revisão e ownership.",
      "Muda troubleshooting: console, CLI, logs, IaC, métricas e eventos de auditoria precisam ser correlacionados.",
      "Aumenta dependência de automação e conhecimento multi-cloud em empresas grandes."
    ],
    "financialImpact": [
      "NAT Gateways, egress, peering, firewalls gerenciados, balanceadores e logs podem gerar custo recorrente.",
      "Arquitetura ruim de tráfego pode custar mais do que computação em alguns cenários.",
      "Desativar logs para economizar pode aumentar custo de incidente e auditoria."
    ],
    "securityImpact": [
      "Permite segmentação e logs fortes quando bem desenhado.",
      "Cria risco de exposição pública rápida quando mal governado.",
      "Integra rede com IAM, políticas, auditoria e detecção de forma mais forte que muitos ambientes tradicionais."
    ]
  },
  "realWorld": {
    "homeScenario": "Um usuário cria uma VM em cloud para laboratório e abre SSH para a internet inteira por falta de entendimento de IP público e regra de firewall.",
    "smallBusinessScenario": "Uma empresa publica um sistema web em uma VPC simples, mas esquece logs e backup de configuração, dificultando auditoria posterior.",
    "enterpriseScenario": "Uma organização cria landing zones com redes hub-and-spoke, firewall central, DNS privado, VPN/ExpressRoute/Direct Connect e integração com SIEM.",
    "cloudScenario": "Um serviço serverless acessa banco gerenciado por private endpoint para evitar exposição pública e reduzir caminhos de ataque.",
    "incidentScenario": "Durante investigação, o SOC descobre que o tráfego de exfiltração saiu por NAT compartilhado sem flow logs suficientes para atribuir origem rapidamente."
  },
  "commonMistakes": [
    {
      "mistake": "Achar que subnet pública é necessária para toda aplicação.",
      "whyItHappens": "O aluno associa acesso à internet com IP público em todos os recursos.",
      "consequence": "Aumenta superfície de ataque e dificulta controle de entrada.",
      "correction": "Publicar via load balancer, proxy, WAF ou endpoint controlado; manter workloads privados quando possível."
    },
    {
      "mistake": "Usar 0.0.0.0/0 em regras administrativas.",
      "whyItHappens": "É a forma mais rápida de fazer o acesso funcionar.",
      "consequence": "SSH, RDP, bancos ou painéis podem ficar expostos à internet.",
      "correction": "Usar VPN/ZTNA/bastion, origem restrita, MFA, logs e janela de acesso controlada."
    },
    {
      "mistake": "Ignorar custo de NAT e egress.",
      "whyItHappens": "O recurso parece apenas um componente técnico de rota.",
      "consequence": "Surpresa financeira e pressão para remover controles.",
      "correction": "Modelar tráfego, usar endpoints privados quando adequado e acompanhar billing por tag."
    },
    {
      "mistake": "Não ativar flow logs desde o início.",
      "whyItHappens": "Logs são vistos como detalhe posterior.",
      "consequence": "Incidentes e troubleshooting ficam sem evidência histórica.",
      "correction": "Incluir logs no baseline de rede e na landing zone."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "VM privada não acessa internet",
      "Aplicação pública retorna timeout",
      "Banco gerenciado não aceita conexão",
      "Custo de rede cresceu sem explicação",
      "Ambiente não aparece nos logs do SIEM"
    ],
    "diagnosticQuestions": [
      "O recurso está em subnet pública ou privada?",
      "Existe rota para o destino e rota de retorno?",
      "A política permite origem, destino, porta e protocolo?",
      "O DNS resolve para IP público ou privado?",
      "O tráfego passa por NAT, firewall, load balancer, endpoint privado ou peering?",
      "Flow logs, auditoria e métricas estão habilitados?"
    ],
    "commands": [
      {
        "platform": "AWS CLI",
        "command": "aws ec2 describe-vpcs && aws ec2 describe-route-tables && aws ec2 describe-security-groups",
        "purpose": "Inventariar VPCs, rotas e security groups.",
        "expectedObservation": "VPCs, CIDRs, rotas e regras associadas.",
        "interpretation": "Ajuda a confirmar isolamento, rota default e exposição por regra."
      },
      {
        "platform": "Azure CLI",
        "command": "az network vnet list -o table && az network nsg list -o table",
        "purpose": "Listar VNets e NSGs.",
        "expectedObservation": "VNets, resource groups, localizações e grupos de segurança.",
        "interpretation": "Ajuda a mapear rede virtual e filtros aplicados."
      },
      {
        "platform": "Google Cloud CLI",
        "command": "gcloud compute networks list && gcloud compute firewall-rules list",
        "purpose": "Listar VPC Networks e regras de firewall.",
        "expectedObservation": "Redes, modo de subnet e regras de firewall.",
        "interpretation": "Ajuda a identificar exposição, escopo e política."
      },
      {
        "platform": "Linux",
        "command": "ip route && dig +short exemplo.internal && curl -v https://exemplo",
        "purpose": "Validar rota, DNS e conectividade a partir de uma VM.",
        "expectedObservation": "Rota default, resolução DNS e handshake de aplicação.",
        "interpretation": "Se DNS, rota ou TLS falham, o problema pode não estar no security group."
      }
    ],
    "decisionTree": [
      {
        "if": "Recurso privado não sai para internet",
        "then": "Verificar rota para NAT, política de saída e se o NAT está na subnet/rota correta."
      },
      {
        "if": "Cliente externo não acessa aplicação",
        "then": "Verificar DNS público, load balancer, health checks, security group/NSG e rota de retorno."
      },
      {
        "if": "Banco recebe conexão por IP público",
        "then": "Revisar endpoint, regra, DNS e arquitetura privada; preferir private endpoint quando possível."
      },
      {
        "if": "Custo de rede subiu",
        "then": "Verificar NAT, egress, tráfego entre zonas/regiões, peering, logs e appliances gerenciados."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Desenhar subnets por função e sensibilidade.",
      "Publicar entrada por load balancer, WAF, proxy ou API gateway quando adequado.",
      "Manter workloads privados por padrão.",
      "Usar menor privilégio em security groups, NSGs e firewalls.",
      "Habilitar flow logs e auditoria desde a criação da rede.",
      "Versionar redes em IaC com revisão e policy as code.",
      "Planejar IPAM para evitar CIDR sobreposto."
    ],
    "badPractices": [
      "Criar IP público em todo recurso para facilitar acesso.",
      "Liberar 0.0.0.0/0 para portas administrativas.",
      "Usar uma única rede para produção, homologação, dev e dados.",
      "Desativar logs para reduzir custo sem análise de risco.",
      "Criar peering sem matriz de fluxo e sem controle de rota."
    ],
    "commonErrors": [
      "Confundir subnet pública com recurso público.",
      "Achar que security group substitui arquitetura defensiva.",
      "Ignorar DNS privado em private endpoints.",
      "Esquecer que egress também é risco."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição pública indevida",
        "description": "Workload sensível recebe IP público ou regra permissiva.",
        "defensiveExplanation": "Acesso direto aumenta varredura, exploração e risco de brute force.",
        "mitigation": "Remover IP público, restringir origem, usar ZTNA/bastion e publicar por camada controlada."
      },
      {
        "name": "Movimento lateral por rede plana",
        "description": "Workloads de diferentes funções compartilham rotas e políticas amplas.",
        "defensiveExplanation": "Um comprometimento pode alcançar serviços internos com pouca fricção.",
        "mitigation": "Segmentação, matriz de fluxos, firewall interno e logs."
      },
      {
        "name": "Baixa visibilidade",
        "description": "Ambiente cloud sem flow logs, DNS logs ou auditoria suficiente.",
        "defensiveExplanation": "Incidentes ficam sem linha do tempo confiável.",
        "mitigation": "Ativar logging por padrão e integrar ao SIEM."
      }
    ],
    "monitoring": [
      "Flow logs",
      "DNS logs",
      "Cloud audit logs",
      "Load balancer logs",
      "Firewall logs",
      "NAT metrics",
      "Security posture management"
    ],
    "hardening": [
      "Bloquear portas administrativas públicas",
      "Aplicar tags obrigatórias",
      "Exigir flow logs",
      "Validar IaC",
      "Usar private endpoints para serviços sensíveis",
      "Controlar egress"
    ],
    "detectionIdeas": [
      "Alertar regra 0.0.0.0/0 em porta administrativa",
      "Detectar recurso novo com IP público",
      "Detectar tráfego incomum via NAT",
      "Detectar peering novo sem ticket",
      "Detectar flow logs desativados"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que cloud networking não pode ser aprendido apenas decorando nomes de serviços da AWS, Azure ou Google Cloud?",
      "hints": [
        "Pense nos problemas que os serviços resolvem.",
        "Compare VPC, VNet e VPC Network."
      ],
      "expectedIdeas": [
        "fundamentos",
        "isolamento",
        "rota",
        "filtro",
        "DNS",
        "custo",
        "observabilidade"
      ],
      "explanation": "Nomes mudam por provedor, mas os problemas de rede continuam."
    },
    {
      "type": "diagnóstico",
      "question": "Uma VM privada não acessa a internet. Quais hipóteses você testaria antes de culpar a aplicação?",
      "hints": [
        "Pense em rota, NAT, política e DNS.",
        "Pense em logs."
      ],
      "expectedIdeas": [
        "route table",
        "NAT",
        "security group/NSG",
        "DNS",
        "firewall",
        "flow logs"
      ],
      "explanation": "Conectividade cloud precisa ser quebrada por camadas e controles."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer migrar rápido para cloud. Qual risco aparece se cada squad criar sua própria VPC sem padrão?",
      "hints": [
        "Pense em CIDR, logs, segurança e custo.",
        "Pense em governança."
      ],
      "expectedIdeas": [
        "CIDR sobreposto",
        "exposição",
        "rotas inconsistentes",
        "logs ausentes",
        "custo",
        "dificuldade de integração"
      ],
      "explanation": "Cloud sem landing zone vira datacenter paralelo sem governança."
    }
  ],
  "quiz": [
    {
      "id": "q14.1.1",
      "type": "conceito",
      "q": "Qual é a melhor definição de cloud networking?",
      "opts": [
        "Uso de objetos lógicos de rede em cloud para conectar, isolar, proteger, publicar e observar workloads.",
        "A substituição completa de TCP/IP por APIs.",
        "Apenas a criação de máquinas virtuais com IP público.",
        "Um serviço exclusivo de Wi-Fi corporativo."
      ],
      "a": 0,
      "exp": "Cloud networking usa objetos lógicos, mas continua dependendo de TCP/IP, DNS, rotas e políticas.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q14.1.2",
      "type": "comparação",
      "q": "Qual par representa melhor equivalência entre provedores?",
      "opts": [
        "AWS VPC, Azure Virtual Network e Google Cloud VPC Network.",
        "AWS S3, Azure DNS e Google Kubernetes Engine.",
        "AWS IAM, Azure Load Balancer e Google Cloud NAT.",
        "AWS Lambda, Azure VM e Google Cloud Router."
      ],
      "a": 0,
      "exp": "VPC/VNet/VPC Network são abstrações centrais de rede virtual.",
      "difficulty": "iniciante",
      "topic": "multi-cloud"
    },
    {
      "id": "q14.1.3",
      "type": "segurança",
      "q": "Qual prática reduz exposição em uma aplicação cloud?",
      "opts": [
        "Manter banco e aplicação privados e publicar entrada por load balancer/WAF.",
        "Colocar IP público em todos os recursos para facilitar suporte.",
        "Desativar logs para economizar sempre.",
        "Usar 0.0.0.0/0 para portas administrativas."
      ],
      "a": 0,
      "exp": "Publicação controlada reduz superfície de ataque e melhora governança.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q14.1.4",
      "type": "custo",
      "q": "Qual item pode gerar custo de rede recorrente em cloud?",
      "opts": [
        "NAT Gateway, egress, peering, logs e load balancers.",
        "Somente nomes de subnets.",
        "Somente tags de recursos.",
        "Somente CIDR privado sem tráfego."
      ],
      "a": 0,
      "exp": "Cloud networking pode ter cobrança por hora, GB processado, armazenamento de logs e transferência de dados.",
      "difficulty": "intermediário",
      "topic": "finops"
    },
    {
      "id": "q14.1.5",
      "type": "diagnóstico",
      "q": "Uma aplicação privada não resolve o nome do banco gerenciado via private endpoint. Qual hipótese é forte?",
      "opts": [
        "DNS privado ou zona privada não configurada corretamente.",
        "A internet inteira caiu.",
        "O cliente precisa de Wi-Fi 7.",
        "O problema só pode ser CPU."
      ],
      "a": 0,
      "exp": "Private endpoints frequentemente dependem de DNS privado correto para evitar resolução pública ou incorreta.",
      "difficulty": "intermediário",
      "topic": "dns"
    },
    {
      "id": "q14.1.6",
      "type": "arquitetura",
      "q": "Por que landing zones são úteis em cloud networking empresarial?",
      "opts": [
        "Porque padronizam rede, segurança, logs, identidade, governança e contas/assinaturas.",
        "Porque eliminam a necessidade de firewall.",
        "Porque impedem qualquer custo de cloud.",
        "Porque substituem endereçamento IP por nomes."
      ],
      "a": 0,
      "exp": "Landing zones criam base governada para ambientes cloud, reduzindo variação e risco.",
      "difficulty": "intermediário",
      "topic": "landing zone"
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
      "id": "fc14.1.6",
      "front": "O que é landing zone?",
      "back": "Uma base padronizada e governada para contas, redes, identidade, segurança, logs e operação em cloud.",
      "tags": [
        "governança",
        "cloud"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex14.1.1",
      "type": "conceitual",
      "prompt": "Explique por que cloud networking é diferente de simplesmente criar uma VM com IP público.",
      "expectedAnswer": "Porque envolve isolamento, endereçamento, subnets, rotas, filtros, publicação, DNS, egress, logs, custos e governança.",
      "explanation": "IP público é apenas uma forma de exposição; cloud networking é arquitetura completa de conectividade e controle."
    },
    {
      "id": "ex14.1.2",
      "type": "arquitetura",
      "prompt": "Liste quatro zonas para uma aplicação web com banco de dados em cloud.",
      "expectedAnswer": "Entrada controlada, aplicação privada, dados privados e gestão/observabilidade.",
      "explanation": "Essas zonas separam exposição, processamento, dados sensíveis e operação."
    },
    {
      "id": "ex14.1.3",
      "type": "segurança",
      "prompt": "Uma regra permite SSH de 0.0.0.0/0 para uma VM. Qual risco e qual correção?",
      "expectedAnswer": "Risco de exposição administrativa à internet; corrigir usando bastion, VPN/ZTNA, origem restrita, MFA, logs e janela controlada.",
      "explanation": "Portas administrativas públicas são alvos frequentes de varredura e abuso."
    },
    {
      "id": "ex14.1.4",
      "type": "finops",
      "prompt": "Cite três elementos de rede cloud que podem gerar custo recorrente.",
      "expectedAnswer": "NAT Gateway, egress/data transfer, load balancer, firewall gerenciado, peering e armazenamento de logs.",
      "explanation": "Cloud cobra não só computação; tráfego e serviços de rede também importam."
    }
  ],
  "challenge": {
    "title": "Primeiro desenho cloud seguro para uma aplicação web",
    "scenario": "Uma empresa quer migrar uma aplicação web, API interna e banco para cloud. A equipe quer publicar rápido, mas segurança exige menor exposição, logs, controle de custo e separação por ambiente.",
    "tasks": [
      "Definir rede virtual e subnets.",
      "Definir o que será público e o que será privado.",
      "Criar matriz de fluxos permitidos.",
      "Definir egress e DNS.",
      "Definir logs e integração com SIEM.",
      "Listar riscos residuais e custos potenciais."
    ],
    "constraints": [
      "Banco não pode ter IP público.",
      "Administração não pode usar SSH/RDP aberto para internet.",
      "Dev, homologação e produção não devem compartilhar a mesma subnet.",
      "A solução deve ser explicável para segurança e para FinOps."
    ],
    "expectedDeliverables": [
      "Mapa de zonas",
      "Plano CIDR",
      "Matriz de fluxos",
      "Plano de publicação",
      "Plano de egress",
      "Plano de logs",
      "Lista de custos e riscos"
    ],
    "gradingRubric": [
      {
        "criterion": "Isolamento",
        "points": 20,
        "description": "Separa público, privado, dados e gestão."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Evita exposição indevida e usa menor privilégio."
      },
      {
        "criterion": "Observabilidade",
        "points": 20,
        "description": "Inclui flow logs, auditoria e integração com SIEM."
      },
      {
        "criterion": "Custo",
        "points": 15,
        "description": "Considera NAT, egress, logs e serviços gerenciados."
      },
      {
        "criterion": "Clareza",
        "points": 20,
        "description": "Entrega matriz e justificativas compreensíveis."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Começamos por ativos e fluxos, não por nomes de serviços. Depois definimos zonas, exposição, rotas, políticas, DNS, logs e custo.",
    "steps": [
      "Listar usuários, aplicações, banco, administração e dependências.",
      "Separar entrada controlada, aplicação privada, dados privados e gestão.",
      "Escolher CIDR sem sobreposição com datacenter.",
      "Publicar somente load balancer/WAF.",
      "Manter aplicação e banco sem IP público.",
      "Definir egress por NAT/firewall/proxy ou endpoints privados.",
      "Criar matriz de fluxos mínimos.",
      "Ativar flow logs, audit logs, DNS logs e integração com SIEM.",
      "Listar custos potenciais e riscos residuais."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar tudo em uma subnet pública para simplificar.",
        "whyItIsWrong": "Funciona rápido, mas aumenta exposição e reduz controle."
      },
      {
        "answer": "Criar security group liberando tudo dentro da VPC.",
        "whyItIsWrong": "Recria rede plana e permite movimento lateral."
      },
      {
        "answer": "Desativar logs para economizar.",
        "whyItIsWrong": "Reduz custo imediato, mas prejudica investigação e auditoria."
      }
    ],
    "finalAnswer": "Uma resposta madura propõe uma rede virtual com subnets separadas, entrada pública apenas por camada controlada, workloads privados, banco privado, egress controlado, DNS privado quando necessário, regras mínimas, logs desde o início, tags de custo e lista de riscos residuais."
  },
  "glossary": [
    {
      "term": "Cloud networking",
      "shortDefinition": "Redes de computadores aplicadas a ambientes cloud por objetos lógicos e programáveis.",
      "longDefinition": "Conjunto de serviços e práticas para conectar, isolar, publicar, proteger, observar e operar workloads em cloud.",
      "example": "Criar uma VPC com subnets privadas, security groups, NAT, load balancer e flow logs.",
      "relatedTerms": [
        "VPC",
        "VNet",
        "subnet",
        "route table"
      ],
      "relatedLessons": [
        "14.1",
        "14.3",
        "14.4"
      ]
    },
    {
      "term": "VPC",
      "shortDefinition": "Rede virtual privada em cloud.",
      "longDefinition": "Abstração de rede lógica que permite lançar recursos em um espaço isolado definido pelo cliente.",
      "example": "Uma VPC 10.40.0.0/16 na AWS.",
      "relatedTerms": [
        "VNet",
        "subnet",
        "CIDR"
      ],
      "relatedLessons": [
        "14.3"
      ]
    },
    {
      "term": "VNet",
      "shortDefinition": "Rede virtual privada no Azure.",
      "longDefinition": "Bloco fundamental para redes privadas no Azure, permitindo comunicação entre recursos, internet e redes locais.",
      "example": "Uma VNet para produção com subnets de aplicação e dados.",
      "relatedTerms": [
        "VPC",
        "NSG",
        "subnet"
      ],
      "relatedLessons": [
        "14.3",
        "14.5"
      ]
    },
    {
      "term": "Egress",
      "shortDefinition": "Tráfego de saída de um ambiente ou recurso.",
      "longDefinition": "Fluxo que sai de uma rede, subnet, workload, região ou provedor para outro destino, frequentemente associado a custo e controle de segurança.",
      "example": "Uma aplicação privada acessando uma API externa via NAT Gateway.",
      "relatedTerms": [
        "NAT",
        "firewall",
        "proxy"
      ],
      "relatedLessons": [
        "14.4",
        "14.5"
      ]
    },
    {
      "term": "Flow logs",
      "shortDefinition": "Registros de metadados de tráfego de rede.",
      "longDefinition": "Logs que registram informações como origem, destino, porta, protocolo, ação e volume para troubleshooting, auditoria e segurança.",
      "example": "VPC Flow Logs enviados ao SIEM.",
      "relatedTerms": [
        "NetFlow",
        "SIEM",
        "telemetria"
      ],
      "relatedLessons": [
        "13.4",
        "13.5",
        "14.12"
      ]
    },
    {
      "term": "Landing zone",
      "shortDefinition": "Base governada para adoção de cloud.",
      "longDefinition": "Estrutura inicial com contas/assinaturas, rede, identidade, segurança, logs, governança, políticas e operação padronizadas.",
      "example": "Hub-and-spoke com firewall central, DNS privado, contas por ambiente e logs obrigatórios.",
      "relatedTerms": [
        "governança",
        "hub-spoke",
        "policy as code"
      ],
      "relatedLessons": [
        "14.13"
      ]
    }
  ],
  "pedagogicalMap": {
    "problem": "Criar redes sob demanda sem perder controle, segurança, custo e observabilidade.",
    "concept": "Cloud networking transforma redes em objetos lógicos e programáveis.",
    "internalMechanism": "Plano de controle do provedor traduz VPC/VNet, subnets, rotas e políticas em comportamento de rede.",
    "realUse": "Landing zones, aplicações web, workloads privados, conectividade híbrida e Kubernetes.",
    "commonMistake": "Confundir rapidez de provisionamento com arquitetura segura.",
    "securityImpact": "Pode reduzir exposição e melhorar logs, ou criar superfície pública em escala se mal usado.",
    "operationalImpact": "Exige IaC, revisão, logs, IPAM, troubleshooting multi-camada e FinOps.",
    "summary": "Cloud networking é a ponte entre fundamentos de redes e operação moderna em cloud."
  },
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
      "14.2"
    ]
  }
};
