export const lesson1403 = {
  "id": "14.3",
  "moduleId": "m14",
  "order": 3,
  "title": "VPC/VNet, CIDR e desenho de subnets",
  "subtitle": "Como transformar endereçamento em arquitetura cloud sustentável, segura, roteável e preparada para crescimento.",
  "duration": "100-160 min",
  "estimatedStudyTimeMinutes": 160,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 280,
  "tags": [
    "cloud networking",
    "vpc",
    "vnet",
    "cidr",
    "subnets",
    "ipam",
    "aws",
    "azure",
    "gcp",
    "segurança",
    "iac",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.1",
      "reason": "É necessário entender por que cloud networking existe antes de desenhar redes virtuais."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.2",
      "reason": "Regiões, zonas e edge influenciam como subnets são distribuídas."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.x",
      "reason": "CIDR, IPv4, máscara e endereçamento são base direta desta aula."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.x",
      "reason": "Subnetting é pré-requisito para dividir blocos cloud de forma racional."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação e zonas de segurança orientam o desenho de subnets."
    }
  ],
  "objectives": [
    "Explicar o papel de VPC, VNet e VPC Network em provedores cloud.",
    "Planejar blocos CIDR sem sobreposição com redes existentes e futuras.",
    "Dividir uma rede cloud em subnets por função, exposição, zona e crescimento.",
    "Relacionar subnets com rotas, security groups, NSGs, firewalls, endpoints privados e logs.",
    "Identificar riscos de redes planas, subnets públicas indevidas e egress sem controle.",
    "Criar um plano de endereçamento cloud compatível com IaC, IPAM e governança."
  ],
  "learningOutcomes": [
    "Dado um bloco CIDR, o aluno propõe subnets para aplicação, dados, segurança, endpoints e crescimento.",
    "Dado um cenário híbrido, o aluno identifica risco de sobreposição de endereços.",
    "Dado um desenho cloud, o aluno distingue problemas de endereçamento, roteamento e política de segurança.",
    "Dado um requisito de landing zone, o aluno cria uma matriz inicial de endereçamento e reservas."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Uma equipe cria uma VPC na pressa para publicar uma aplicação. Escolhe um bloco CIDR aparentemente grande, cria uma subnet pública, uma subnet privada e coloca tudo para funcionar. Meses depois, a empresa precisa conectar essa VPC ao datacenter por VPN, criar outra conta cloud para dados, integrar uma aquisição de empresa, abrir peering com uma VPC de analytics e expor serviços privados para parceiros. Então aparece o problema: o bloco escolhido sobrepõe redes existentes, as subnets não têm espaço para crescimento, a separação entre ambientes é confusa, a tabela de rotas fica cheia de exceções e o time de segurança não consegue transformar a arquitetura em política clara.</p>\n  <p>Em cloud, o desenho de VPC/VNet e subnets é uma das decisões mais difíceis de desfazer. Criar uma rede virtual é rápido; corrigir um plano de endereçamento ruim depois de dezenas de workloads, bancos, endpoints privados, VPNs, peerings e regras de firewall pode custar semanas. Por isso, esta aula existe para transformar CIDR e subnetting, que já foram vistos nos módulos anteriores, em uma competência de arquitetura cloud.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma VPC com CIDR mal planejado pode funcionar no primeiro deploy e ainda assim bloquear crescimento, conectividade híbrida, segmentação, private endpoints, disaster recovery e integração entre contas ou assinaturas.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Antes da cloud pública, redes corporativas eram desenhadas em datacenters físicos, filiais e links WAN. A equipe comprava switches, roteadores, firewalls, circuitos, racks e endereçamentos. O plano de IP precisava acomodar prédios, VLANs, servidores, usuários, voz, Wi-Fi, impressoras, DMZ e links dedicados. Erros de endereçamento já eram caros, mas o ambiente costumava crescer com mudanças físicas visíveis.</p>\n  <p>A virtualização trouxe redes lógicas dentro do datacenter. VLANs, switches virtuais, overlays e hypervisors permitiram que muitas redes existissem sobre a mesma infraestrutura física. A cloud levou isso adiante: em vez de configurar portas de switch manualmente, a equipe declara uma VPC, VNet ou VPC Network por API. Subnets, rotas, gateways, security groups, NSGs, private endpoints, load balancers e logs viram recursos programáveis.</p>\n  <p>A consequência pedagógica é importante: cloud networking não remove fundamentos. Ela automatiza a entrega dos fundamentos. CIDR, rota, gateway, NAT, DNS, firewall e segmentação continuam existindo, mas agora são criados por console, CLI, Terraform, Bicep, CloudFormation, Pulumi ou pipeline. O erro muda de natureza: antes uma porta física errada derrubava uma VLAN; agora uma variável errada pode replicar uma topologia insegura em várias contas.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema central é desenhar uma rede cloud que seja grande o bastante para crescer, pequena o bastante para ser controlável, não sobreposta a redes existentes, segmentada por função, compatível com serviços gerenciados e preparada para roteamento futuro.</p>\n  <ul>\n    <li><strong>Sobreposição de CIDR:</strong> impede ou complica VPN, peering, transit, aquisição de empresas e conectividade híbrida.</li>\n    <li><strong>Subnets grandes demais:</strong> reduzem clareza de segmentação e incentivam redes planas.</li>\n    <li><strong>Subnets pequenas demais:</strong> esgotam IPs com crescimento, endpoints, balanceadores, nodes, pods, appliances e serviços gerenciados.</li>\n    <li><strong>Ausência de reserva:</strong> bloqueia novas zonas, novos ambientes, expansão regional e futuras integrações.</li>\n    <li><strong>Confusão entre subnet e zona de segurança:</strong> faz a equipe acreditar que separar IPs automaticamente equivale a controlar acesso.</li>\n    <li><strong>Plano sem custo:</strong> ignora que NAT, egress, firewalls gerenciados, logs e tráfego entre regiões podem gerar cobrança recorrente.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha comum:</strong> desenhar VPC/VNet como se fosse uma LAN única. Em cloud, o espaço de endereços precisa conversar com rotas, serviços gerenciados, IAM, logs, políticas, automação e governança.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução do desenho de rede cloud pode ser vista como a passagem de uma rede única para redes virtuais governadas por plataforma.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Rede plana</td><td>Todos os servidores ou recursos no mesmo espaço lógico.</td><td>Movimento lateral fácil, troubleshooting confuso e pouca governança.</td><td>Subnets por função e zonas de segurança.</td></tr>\n      <tr><td>VLANs tradicionais</td><td>Separação lógica em switches e roteadores físicos.</td><td>Depende de configuração manual e hardware local.</td><td>Subnets cloud, tabelas de rota e filtros programáveis.</td></tr>\n      <tr><td>VPC/VNet única</td><td>Uma rede virtual por aplicação ou ambiente.</td><td>Pode virar silo, sobrepor CIDR ou dificultar conectividade compartilhada.</td><td>Hub-spoke, landing zones e transit.</td></tr>\n      <tr><td>Rede por conta/projeto</td><td>Isolamento administrativo por conta, assinatura ou projeto.</td><td>Exige padronização de CIDR, DNS, logs e rotas.</td><td>IPAM, policy as code e módulos IaC.</td></tr>\n      <tr><td>Rede cloud governada</td><td>Endereçamento, rotas, segurança, logs e custos são planejados como produto de plataforma.</td><td>Maior maturidade operacional necessária.</td><td>Automação, guardrails, observabilidade e revisão contínua.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Uma <strong>VPC</strong>, <strong>VNet</strong> ou <strong>VPC Network</strong> é uma rede virtual privada dentro de um provedor cloud. Ela define um espaço lógico onde recursos podem receber endereços IP, pertencer a subnets, usar rotas, aplicar filtros, acessar gateways e se comunicar com outros recursos.</p>\n  <div class=\"definition-box\"><strong>Definição prática:</strong> VPC/VNet é o contêiner lógico da rede cloud; CIDR é o espaço de endereços disponível; subnet é uma divisão desse espaço para posicionar recursos; route table define para onde o tráfego vai; controles como security groups, NSGs e firewalls definem o que pode passar.</div>\n  <p>Os nomes mudam entre provedores: AWS usa VPC; Azure usa Virtual Network; Google Cloud usa VPC network. O raciocínio, porém, é comum: criar um espaço privado endereçável, dividir esse espaço em segmentos, controlar rotas e aplicar políticas.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Ao criar uma rede cloud, você não está apenas reservando IPs. Você está criando um modelo de encaminhamento e controle que será consumido por máquinas virtuais, balanceadores, bancos gerenciados, Kubernetes, endpoints privados, gateways, firewalls e serviços de plataforma.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Escolha do CIDR principal:</strong> define o espaço de endereços da VPC/VNet e deve evitar sobreposição com datacenter, filiais, VPNs, outras clouds e redes futuras.</li>\n    <li><strong>Reserva de blocos:</strong> separa faixas para ambientes, zonas, workloads, serviços compartilhados, endpoints privados, appliances, Kubernetes e crescimento.</li>\n    <li><strong>Criação de subnets:</strong> divide o CIDR por função, zona, exposição e necessidade operacional.</li>\n    <li><strong>Associação a rotas:</strong> cada subnet usa rotas para tráfego local, internet, NAT, firewall, peering, VPN, transit ou private endpoints.</li>\n    <li><strong>Aplicação de filtros:</strong> security groups, NSGs, NACLs, firewalls e políticas determinam permissões por fluxo.</li>\n    <li><strong>Observabilidade:</strong> flow logs, logs de firewall, DNS, NAT, load balancer e auditoria mostram se o desenho realmente se comporta como esperado.</li>\n  </ol>\n  <p>Um detalhe importante é que provedores reservam endereços dentro das subnets para funções internas, roteamento, DNS ou plataforma. Portanto, uma subnet /28 não oferece todos os 16 endereços para uso. O desenho precisa considerar reservas do provedor e consumo indireto por serviços gerenciados.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Um desenho corporativo saudável normalmente separa ambientes, funções e níveis de exposição. Um exemplo didático para uma aplicação crítica seria:</p>\n  <ul>\n    <li><strong>Subnets públicas:</strong> usadas com muito cuidado para load balancers públicos, bastions controlados ou gateways quando necessário.</li>\n    <li><strong>Subnets privadas de aplicação:</strong> workloads que não precisam receber tráfego direto da internet.</li>\n    <li><strong>Subnets privadas de dados:</strong> bancos, caches, filas e serviços sensíveis.</li>\n    <li><strong>Subnets de endpoints privados:</strong> acesso privado a serviços gerenciados sem exposição pública.</li>\n    <li><strong>Subnets de segurança:</strong> firewalls, appliances, IDS/IPS, proxies ou inspeção centralizada.</li>\n    <li><strong>Subnets de gerenciamento:</strong> acesso administrativo controlado, observabilidade e ferramentas internas.</li>\n  </ul>\n  <p>Em AWS, uma subnet pertence a uma zona de disponibilidade. Em Azure, uma VNet é regional e subnets não precisam ser divididas por zona do mesmo modo que em AWS. Em Google Cloud, redes VPC são globais e subnets são regionais. Essas diferenças não mudam o fundamento, mas mudam o desenho, a automação e o troubleshooting.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma VPC/VNet como um condomínio empresarial planejado. O CIDR é o terreno total. As subnets são quadras internas. As tabelas de rota são ruas e portões. Firewalls e security groups são regras de acesso. Endpoints privados são entradas internas para serviços que não precisam abrir porta para a rua. O IPAM é o cartório que evita dois prédios com o mesmo endereço.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em um condomínio real, ruas e prédios são físicos. Em cloud, a rede é programável, dinâmica e dependente de APIs do provedor. O fato de duas subnets parecerem separadas no desenho não garante segurança se rotas e políticas permitirem tráfego amplo.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Você cria uma VPC de laboratório com CIDR <code>10.20.0.0/16</code>. Dentro dela, reserva <code>10.20.10.0/24</code> para uma subnet pública, <code>10.20.20.0/24</code> para aplicação e <code>10.20.30.0/24</code> para banco. O load balancer fica na subnet pública, a aplicação na subnet privada e o banco em subnet de dados. Mesmo em um laboratório simples, você já separa exposição, aplicação e dados.</p>\n  <p>O erro comum seria colocar tudo em <code>10.20.0.0/24</code> “porque funciona”. Funciona no início, mas não ensina separação de função, não prepara crescimento, não facilita logs e não se aproxima de uma arquitetura corporativa.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma empresa possui datacenter com redes <code>10.0.0.0/8</code> parcialmente usadas, filiais em <code>172.16.0.0/12</code> e ambientes legados em <code>192.168.0.0/16</code>. Se a equipe cloud escolher aleatoriamente <code>10.0.0.0/16</code> para uma nova VPC, pode criar sobreposição com o datacenter e bloquear uma VPN site-to-site. Uma escolha melhor exige inventário: quais blocos estão usados, quais são reservados, quais podem ser roteados, quais precisam de NAT e quais devem ser evitados.</p>\n  <p>No ambiente empresarial, o desenho de CIDR deve ser aprovado como arquitetura, não como detalhe de deploy. Segurança, redes, cloud platform, dados, IAM e operações precisam concordar sobre blocos, ambientes, rotas, DNS, logs e política de acesso.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em AWS, você pode criar uma VPC com CIDR principal e subnets por zona. Em Azure, define o espaço de endereço da VNet e cria subnets dentro dela. Em Google Cloud, a VPC é global e as subnets são regionais. Isso afeta como você desenha multi-região, como organiza rotas e como padroniza módulos IaC.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Conceito</th><th>AWS</th><th>Azure</th><th>Google Cloud</th></tr></thead>\n    <tbody>\n      <tr><td>Rede virtual</td><td>VPC</td><td>Virtual Network</td><td>VPC network</td></tr>\n      <tr><td>Subnets</td><td>Associadas a uma Availability Zone</td><td>Dentro de uma VNet regional</td><td>Regionais dentro de rede VPC global</td></tr>\n      <tr><td>Filtro comum</td><td>Security Groups, NACLs, AWS Network Firewall</td><td>NSG, Azure Firewall</td><td>VPC firewall rules, firewall policies</td></tr>\n      <tr><td>Observabilidade</td><td>VPC Flow Logs</td><td>NSG flow logs / Virtual Network flow logs</td><td>VPC Flow Logs</td></tr>\n    </tbody>\n  </table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a rede cloud normalmente é criada por IaC. Isso é excelente para reprodutibilidade, mas perigoso se os módulos não tiverem validação. Um módulo Terraform que aceita qualquer CIDR pode criar sobreposição. Um pipeline sem policy as code pode permitir subnet pública sem justificativa. Um ambiente efêmero sem tags pode gerar custos e logs órfãos.</p>\n  <p>Boas práticas incluem criar módulos de rede aprovados, validar CIDR com IPAM, bloquear ranges proibidos, exigir tags de owner/custo/dado, proibir rotas <code>0.0.0.0/0</code> para workloads sensíveis, exigir flow logs e testar políticas em pipeline. O objetivo não é impedir o time de entregar, mas transformar rede segura em plataforma reutilizável.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>O desenho de VPC/VNet afeta diretamente a superfície de ataque e o movimento lateral. Uma subnet pública com workload sensível aumenta exposição. Uma subnet privada com rota ampla para internet via NAT pode permitir egress não controlado. Uma VPC peered com outra rede sem matriz de fluxo pode abrir caminho lateral. Uma sobreposição de CIDR pode levar a exceções inseguras, NAT improvisado e troubleshooting confuso.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>CIDR sobreposto</td><td>VPC usa bloco já presente no datacenter ou em outra cloud.</td><td>VPN, peering e roteamento quebram ou exigem NAT complexo.</td><td>IPAM, inventário, revisão arquitetural e blocos reservados.</td></tr>\n      <tr><td>Subnet pública indevida</td><td>Workload recebe IP público sem necessidade.</td><td>Exposição direta à internet.</td><td>Subnets privadas por padrão, load balancer controlado e policy as code.</td></tr>\n      <tr><td>Rede plana</td><td>Aplicação, dados e gerenciamento no mesmo segmento.</td><td>Movimento lateral e baixa visibilidade.</td><td>Subnets por função, firewall interno, logs e menor privilégio.</td></tr>\n      <tr><td>Egress sem controle</td><td>Todo tráfego sai por NAT sem inspeção ou logging suficiente.</td><td>Dificuldade de detectar exfiltração e abuso.</td><td>Egress firewall, proxy, DNS controlado, allowlist e flow logs.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"cidr-1403-title cidr-1403-desc\">\n    <title id=\"cidr-1403-title\">Desenho de VPC/VNet com CIDR, subnets e zonas de segurança</title>\n    <desc id=\"cidr-1403-desc\">Uma VPC com CIDR principal dividido em subnets públicas, aplicação, dados, endpoints privados e segurança, conectada a datacenter, internet, SIEM e pipeline IaC.</desc>\n    <defs>\n      <marker id=\"arrow-1403\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"25\" y=\"55\" width=\"720\" height=\"390\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"385\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">VPC/VNet 10.42.0.0/16</text>\n    <text x=\"385\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">CIDR planejado, sem sobreposição e com reservas de crescimento</text>\n\n    <rect x=\"60\" y=\"145\" width=\"150\" height=\"90\" rx=\"14\" class=\"svg-boundary\" />\n    <text x=\"135\" y=\"173\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Subnet pública</text>\n    <text x=\"135\" y=\"194\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.42.10.0/24</text>\n    <rect x=\"82\" y=\"203\" width=\"105\" height=\"24\" rx=\"8\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"135\" y=\"220\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Load Balancer</text>\n\n    <rect x=\"255\" y=\"145\" width=\"150\" height=\"90\" rx=\"14\" class=\"svg-boundary\" />\n    <text x=\"330\" y=\"173\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Aplicação</text>\n    <text x=\"330\" y=\"194\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.42.20.0/24</text>\n    <rect x=\"285\" y=\"203\" width=\"90\" height=\"24\" rx=\"8\" class=\"svg-node svg-node--server\" />\n    <text x=\"330\" y=\"220\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Workloads</text>\n\n    <rect x=\"450\" y=\"145\" width=\"150\" height=\"90\" rx=\"14\" class=\"svg-boundary\" />\n    <text x=\"525\" y=\"173\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dados</text>\n    <text x=\"525\" y=\"194\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.42.30.0/24</text>\n    <rect x=\"488\" y=\"203\" width=\"74\" height=\"24\" rx=\"8\" class=\"svg-node svg-node--database\" />\n    <text x=\"525\" y=\"220\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Banco</text>\n\n    <rect x=\"60\" y=\"290\" width=\"150\" height=\"90\" rx=\"14\" class=\"svg-boundary\" />\n    <text x=\"135\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Endpoints</text>\n    <text x=\"135\" y=\"339\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.42.40.0/24</text>\n    <rect x=\"83\" y=\"348\" width=\"104\" height=\"24\" rx=\"8\" class=\"svg-node svg-node--security\" />\n    <text x=\"135\" y=\"365\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Privados</text>\n\n    <rect x=\"255\" y=\"290\" width=\"150\" height=\"90\" rx=\"14\" class=\"svg-boundary\" />\n    <text x=\"330\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Segurança</text>\n    <text x=\"330\" y=\"339\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.42.50.0/24</text>\n    <rect x=\"292\" y=\"348\" width=\"76\" height=\"24\" rx=\"8\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"330\" y=\"365\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Firewall</text>\n\n    <rect x=\"450\" y=\"290\" width=\"150\" height=\"90\" rx=\"14\" class=\"svg-boundary\" />\n    <text x=\"525\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Reserva</text>\n    <text x=\"525\" y=\"339\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.42.60.0/22</text>\n    <rect x=\"482\" y=\"348\" width=\"86\" height=\"24\" rx=\"8\" class=\"svg-node\" />\n    <text x=\"525\" y=\"365\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Crescimento</text>\n\n    <rect x=\"790\" y=\"95\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"862\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Internet</text>\n    <text x=\"862\" y=\"146\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Usuários</text>\n\n    <rect x=\"790\" y=\"220\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"862\" y=\"251\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Datacenter</text>\n    <text x=\"862\" y=\"271\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sem sobrepor CIDR</text>\n\n    <rect x=\"790\" y=\"345\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"862\" y=\"376\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SIEM / IPAM</text>\n    <text x=\"862\" y=\"396\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs e governança</text>\n\n    <line x1=\"790\" y1=\"130\" x2=\"210\" y2=\"190\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1403)\" />\n    <line x1=\"210\" y1=\"215\" x2=\"255\" y2=\"215\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-1403)\" />\n    <line x1=\"405\" y1=\"215\" x2=\"450\" y2=\"215\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-1403)\" />\n    <line x1=\"790\" y1=\"255\" x2=\"405\" y2=\"335\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-1403)\" />\n    <line x1=\"600\" y1=\"335\" x2=\"790\" y2=\"380\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-1403)\" />\n    <text x=\"660\" y=\"472\" class=\"svg-label svg-label--small\">Subnets organizam posicionamento; rotas e políticas controlam fluxo.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório é conceitual e de arquitetura. Você irá desenhar um plano de VPC/VNet com CIDR, subnets, reservas, rotas esperadas e controles de segurança sem criar recursos pagos.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam leitura de CIDR, desenho de subnets e identificação de riscos arquiteturais.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma empresa que precisa criar uma landing zone cloud sem bloquear VPN, peering, serviços privados, Kubernetes e crescimento regional.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como partir de requisitos, evitar sobreposição, reservar crescimento e transformar subnets em zonas operacionais e seguras.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> VPC/VNet é a rede virtual; CIDR é o espaço; subnet é a divisão funcional; rota e política definem comportamento.</li>\n    <li><strong>O que lembrar:</strong> um CIDR ruim pode funcionar hoje e impedir integração amanhã.</li>\n    <li><strong>Erro comum:</strong> tratar subnet como sinônimo de segurança. Segurança depende de filtros, rotas, identidade, logs e operação.</li>\n    <li><strong>Uso real:</strong> landing zones, ambientes, contas, assinaturas, projetos, VPN, peering, private endpoints, Kubernetes e observabilidade.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, vamos estudar route tables, Internet Gateway, NAT Gateway e UDR. Depois de desenhar o espaço de endereços e as subnets, o próximo passo é entender como o tráfego sai, entra, atravessa firewalls, usa NAT e encontra outros destinos.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte"
    ],
    "relatedProtocols": [
      "IPv4",
      "IPv6",
      "ICMP",
      "TCP",
      "UDP",
      "DNS",
      "BGP",
      "DHCP"
    ],
    "dependsOn": [
      "CIDR",
      "Subnetting",
      "Roteamento",
      "NAT",
      "Firewall",
      "DNS",
      "Segmentação"
    ],
    "enables": [
      "Route tables",
      "Private endpoints",
      "Cloud firewalls",
      "VPN híbrida",
      "Peering",
      "Hub-spoke",
      "Kubernetes networking"
    ]
  },
  "deepDive": {
    "mentalModel": "Desenhe VPC/VNet como um produto de plataforma: espaço de IP, subnets, rotas, filtros, logs, custos e crescimento precisam nascer juntos.",
    "keyTerms": [
      "VPC",
      "VNet",
      "CIDR",
      "subnet",
      "IPAM",
      "route table",
      "security group",
      "NSG",
      "private endpoint",
      "egress"
    ],
    "limitations": [
      "Subnets organizam posicionamento, mas não garantem segurança sozinhas.",
      "CIDR escolhido sem inventário pode impedir conectividade híbrida.",
      "Mudar endereçamento depois de muitos recursos criados pode ser caro e arriscado.",
      "Cada provedor possui escopos e reservas de IP diferentes."
    ],
    "whenToUse": [
      "Ao criar landing zones cloud.",
      "Ao preparar conectividade híbrida.",
      "Ao separar ambientes, aplicações, dados, segurança e endpoints privados.",
      "Ao padronizar redes via IaC."
    ],
    "whenNotToUse": [
      "Não use uma única subnet genérica para workloads sensíveis.",
      "Não use CIDR sem verificar sobreposição com datacenter, filiais e outras clouds.",
      "Não crie subnets públicas por conveniência quando load balancer privado ou endpoint privado resolve.",
      "Não confunda subnet com controle de autorização."
    ],
    "operationalImpact": [
      "Exige IPAM, documentação, revisão de arquitetura e governança.",
      "Afeta troubleshooting de rotas, DNS, firewall, NAT e serviços gerenciados.",
      "Precisa ser versionado e validado em pipeline quando gerenciado por IaC.",
      "Requer tags e ownership para operação e custos."
    ],
    "financialImpact": [
      "Subnets mal desenhadas podem exigir NAT gateways extras, firewalls gerenciados, peerings complexos e tráfego desnecessário.",
      "Logs de fluxo e retenção aumentam custo, mas reduzem tempo de investigação.",
      "Egress, inter-region, NAT e appliances devem entrar na estimativa de arquitetura."
    ],
    "securityImpact": [
      "Bom endereçamento facilita segmentação, logs e resposta a incidente.",
      "CIDR sobreposto gera exceções, NAT improvisado e perda de clareza de caminho.",
      "Subnets públicas indevidas aumentam superfície de ataque.",
      "Egress sem controle reduz capacidade de detectar abuso e exfiltração."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Escolher 10.0.0.0/16 por hábito.",
      "whyItHappens": "É um exemplo comum em tutoriais.",
      "consequence": "Pode sobrepor datacenter, VPN, outras VPCs ou redes de parceiros.",
      "correction": "Consultar IPAM e reservar blocos por ambiente, região e função."
    },
    {
      "mistake": "Criar uma subnet única para tudo.",
      "whyItHappens": "Funciona rapidamente no laboratório.",
      "consequence": "Aumenta movimento lateral e dificulta matriz de fluxos.",
      "correction": "Separar por função e aplicar rotas, filtros e logs coerentes."
    },
    {
      "mistake": "Dimensionar subnets sem considerar IPs reservados pelo provedor.",
      "whyItHappens": "O aluno calcula endereços teóricos, não endereços utilizáveis reais.",
      "consequence": "Esgotamento inesperado de IPs.",
      "correction": "Ler limites do provedor e adicionar margem."
    },
    {
      "mistake": "Achar que subnet privada significa sem risco.",
      "whyItHappens": "Privada é associada mentalmente a segura.",
      "consequence": "Egress amplo, rotas indevidas e permissões laterais passam despercebidas.",
      "correction": "Validar rota, security group/NSG, firewall, endpoints e logs."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "VPN não estabelece rota para VPC",
      "Peering criado, mas tráfego não passa",
      "Instância sem acesso a serviço gerenciado",
      "Endpoint privado não resolve DNS",
      "Esgotamento de IP em subnet",
      "Tráfego sai direto para internet sem inspeção"
    ],
    "diagnosticQuestions": [
      "Há sobreposição de CIDR?",
      "A subnet possui rota correta?",
      "Existe filtro bloqueando?",
      "O DNS privado aponta para o endpoint correto?",
      "A subnet tem IPs disponíveis?",
      "O tráfego passa por NAT/firewall previsto?"
    ],
    "commands": [
      {
        "platform": "AWS CLI",
        "command": "aws ec2 describe-vpcs && aws ec2 describe-subnets",
        "purpose": "Listar VPCs e subnets para validar CIDR e disponibilidade de IPs.",
        "expectedObservation": "Blocos CIDR, IDs de subnets, AZs e contagem de IPs disponíveis.",
        "interpretation": "Confirma se o desenho real corresponde ao planejado."
      },
      {
        "platform": "Azure CLI",
        "command": "az network vnet list -o table && az network vnet subnet list --resource-group <rg> --vnet-name <vnet> -o table",
        "purpose": "Listar VNets e subnets no Azure.",
        "expectedObservation": "Address prefixes e subnets associados.",
        "interpretation": "Ajuda a detectar sobreposição, subnets erradas ou ausência de delegação."
      },
      {
        "platform": "Google Cloud CLI",
        "command": "gcloud compute networks list && gcloud compute networks subnets list",
        "purpose": "Listar VPC networks e subnets no Google Cloud.",
        "expectedObservation": "Nome da rede, modo, região e ranges de subnet.",
        "interpretation": "Ajuda a validar escopo global/regional e ranges."
      },
      {
        "platform": "Linux",
        "command": "ip route && dig <nome-privado>",
        "purpose": "Validar rota e resolução DNS privada de uma instância.",
        "expectedObservation": "Rota default esperada e resolução para IP privado quando aplicável.",
        "interpretation": "Se DNS aponta público quando deveria apontar privado, o problema pode estar no DNS privado ou endpoint."
      }
    ],
    "decisionTree": [
      {
        "if": "Peering/VPN não funciona",
        "then": "Verificar sobreposição de CIDR antes de firewall."
      },
      {
        "if": "Workload sem internet",
        "then": "Verificar rota, NAT, firewall, DNS e security group/NSG."
      },
      {
        "if": "Serviço gerenciado privado não acessa",
        "then": "Verificar endpoint privado, DNS privado, subnet e política de acesso."
      },
      {
        "if": "Subnets esgotam IPs",
        "then": "Verificar tamanho, reservas do provedor, endpoints, Kubernetes e crescimento."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar IPAM e inventário antes de criar CIDR.",
      "Separar subnets por função e exposição.",
      "Criar subnets privadas por padrão para workloads.",
      "Registrar flow logs e logs de firewall.",
      "Usar policy as code para bloquear subnets públicas indevidas.",
      "Reservar espaço para crescimento e integração híbrida."
    ],
    "badPractices": [
      "Copiar CIDRs de tutoriais.",
      "Usar rede plana.",
      "Expor workloads diretamente em subnets públicas.",
      "Permitir egress irrestrito sem logs.",
      "Criar peering sem matriz de fluxo.",
      "Ignorar reservas de IP do provedor."
    ],
    "commonErrors": [
      "Confundir subnet com zona de segurança completa.",
      "Criar rotas amplas sem firewall.",
      "Não planejar DNS privado junto com subnets.",
      "Não estimar consumo de IPs por endpoints e Kubernetes."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição por subnet pública indevida",
        "description": "Workloads sensíveis recebem conectividade pública desnecessária.",
        "defensiveExplanation": "A exposição aumenta tentativas externas, superfície de ataque e dependência de hardening individual.",
        "mitigation": "Subnets privadas por padrão, load balancer controlado, WAF/firewall e policy as code."
      },
      {
        "name": "Movimento lateral por rede plana",
        "description": "Ambientes e camadas diferentes compartilham o mesmo espaço sem controle de fluxo.",
        "defensiveExplanation": "Um comprometimento em camada menos sensível pode alcançar ativos críticos.",
        "mitigation": "Segmentação, matriz de fluxos, security groups/NSGs, firewall interno e logs."
      },
      {
        "name": "Roteamento confuso por sobreposição",
        "description": "CIDRs sobrepostos forçam NAT ou exceções difíceis de auditar.",
        "defensiveExplanation": "Ambiguidade de rota dificulta investigação e pode abrir caminhos não pretendidos.",
        "mitigation": "IPAM, revisão de arquitetura, blocos reservados e proibição de ranges conflitantes."
      }
    ],
    "monitoring": [
      "Flow logs por subnet crítica.",
      "Logs de firewall e NAT.",
      "Alertas de criação de subnet pública.",
      "Alertas de rota 0.0.0.0/0 indevida.",
      "Detecção de peering ou VPN sem aprovação.",
      "Métricas de IP disponível por subnet."
    ],
    "hardening": [
      "Bloquear criação de recursos públicos fora de exceções aprovadas.",
      "Usar módulos IaC padronizados.",
      "Aplicar tags obrigatórias.",
      "Habilitar logs por padrão.",
      "Exigir revisão para CIDR e peering."
    ],
    "detectionIdeas": [
      "Comparar rotas reais com matriz aprovada.",
      "Detectar subnets sem flow logs.",
      "Detectar workloads com IP público.",
      "Detectar CIDRs novos fora do IPAM.",
      "Correlacionar egress incomum por subnet."
    ]
  },
  "lab": {
    "id": "lab-14.3",
    "title": "Planejar VPC/VNet, CIDR e subnets para uma landing zone segura",
    "labType": "cloud",
    "objective": "Criar um plano de endereçamento cloud seguro, sem sobreposição e preparado para crescimento, sem provisionar recursos pagos.",
    "scenario": "Uma empresa vai criar sua primeira landing zone para uma aplicação crítica. Ela possui datacenter, usuários remotos, ambiente de desenvolvimento, produção, banco gerenciado, endpoints privados, inspeção centralizada e futura conectividade híbrida.",
    "topology": "Usuários -> edge/load balancer -> VPC/VNet -> subnets públicas, aplicação, dados, endpoints, segurança e gerenciamento -> datacenter via VPN/Direct Connect/ExpressRoute/Interconnect futuro.",
    "architecture": "Plano lógico com um CIDR principal, subnets por função, reservas por zona/região, rotas esperadas, controles de segurança e logs.",
    "prerequisites": [
      "Conhecer IPv4, CIDR e subnetting.",
      "Ter entendido regiões e zonas de disponibilidade.",
      "Ter noções de firewall, segmentação e logs."
    ],
    "tools": [
      "Papel, planilha ou editor Markdown",
      "Opcional: calculadora CIDR offline",
      "Opcional: documentação oficial AWS/Azure/GCP",
      "Nenhum recurso cloud pago"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não crie recursos cloud neste laboratório.",
      "Não use ranges reais da sua empresa em material público.",
      "Não publique diagramas com CIDRs corporativos sensíveis.",
      "Use blocos fictícios para estudo.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Inventariar redes existentes",
        "instruction": "Liste redes do datacenter, filiais, VPNs, outras clouds e parceiros. Use valores fictícios se estiver estudando.",
        "command": "Exemplo: Datacenter 10.0.0.0/12; Filiais 172.16.0.0/16; VPN parceiros 10.100.0.0/16",
        "expectedOutput": "Uma lista de blocos proibidos ou já utilizados.",
        "explanation": "Sem inventário, o risco de sobreposição é alto."
      },
      {
        "number": 2,
        "title": "Escolher CIDR principal",
        "instruction": "Escolha um bloco para a VPC/VNet que não sobreponha redes existentes e deixe margem para crescimento.",
        "command": "Exemplo didático: VPC produção = 10.42.0.0/16",
        "expectedOutput": "CIDR principal documentado com justificativa.",
        "explanation": "A escolha do bloco deve considerar futuro peering, VPN e expansão."
      },
      {
        "number": 3,
        "title": "Reservar blocos por função",
        "instruction": "Divida o espaço em faixas reservadas para públicas, app, dados, endpoints, segurança, gerenciamento e crescimento.",
        "command": "Exemplo: 10.42.10.0/24 pública; 10.42.20.0/24 app; 10.42.30.0/24 dados; 10.42.40.0/24 endpoints; 10.42.50.0/24 segurança; 10.42.60.0/22 reserva",
        "expectedOutput": "Tabela de subnets por função.",
        "explanation": "Reservas reduzem mudanças disruptivas no futuro."
      },
      {
        "number": 4,
        "title": "Definir exposição e rotas esperadas",
        "instruction": "Para cada subnet, indique se deve ter rota para internet, NAT, firewall, peering, VPN ou apenas tráfego local.",
        "command": "Subnet dados: sem rota direta para internet; acesso apenas a partir da app e administração controlada.",
        "expectedOutput": "Tabela de rotas esperadas por subnet.",
        "explanation": "Subnets sem rota correta não funcionam; subnets com rota ampla demais criam risco."
      },
      {
        "number": 5,
        "title": "Definir matriz de fluxos",
        "instruction": "Documente quem pode falar com quem, em quais portas e por qual motivo.",
        "command": "App -> DB TCP 5432; App -> Endpoint Secrets TCP 443; Admin -> Bastion TCP 22/3389 com MFA e registro.",
        "expectedOutput": "Matriz de fluxos permitidos e negados.",
        "explanation": "A matriz transforma endereçamento em política de segurança."
      },
      {
        "number": 6,
        "title": "Adicionar observabilidade",
        "instruction": "Defina quais logs serão coletados por subnet e controle.",
        "command": "Flow logs em subnets app/dados; logs de firewall; DNS logs; NAT logs; auditoria de alteração de rotas.",
        "expectedOutput": "Plano de evidências para troubleshooting e SOC.",
        "explanation": "Sem logs, o desenho vira invisível durante incidentes."
      },
      {
        "number": 7,
        "title": "Validar crescimento",
        "instruction": "Simule aumento de workloads, endpoints privados, Kubernetes ou nova zona. Verifique se há espaço reservado.",
        "command": "Adicionar 2 subnets app novas e 1 subnet endpoints sem refazer o CIDR principal.",
        "expectedOutput": "Plano continua viável sem renumerar tudo.",
        "explanation": "O teste mostra se o desenho é sustentável."
      }
    ],
    "expectedResult": "Um plano de endereçamento e subnets com CIDR principal, reservas, matriz de fluxos, rotas esperadas, logs e justificativas de segurança.",
    "validation": [
      {
        "check": "Não há sobreposição com redes existentes",
        "command": "Comparar CIDR escolhido com inventário",
        "expected": "Nenhum conflito.",
        "ifFails": "Escolha outro bloco e documente a decisão."
      },
      {
        "check": "Cada subnet tem função clara",
        "command": "Revisar tabela de subnets",
        "expected": "Toda subnet possui função, exposição, rota e owner.",
        "ifFails": "Reagrupe subnets por função e remova subnets genéricas."
      },
      {
        "check": "Há reserva de crescimento",
        "command": "Verificar blocos não alocados",
        "expected": "Existe margem para novas zonas, endpoints e workloads.",
        "ifFails": "Aumente bloco principal ou redesenhe faixas."
      },
      {
        "check": "Matriz de fluxos existe",
        "command": "Revisar fluxos permitidos",
        "expected": "Fluxos têm origem, destino, porta, justificativa e log.",
        "ifFails": "Não aprove a arquitetura até que fluxos sejam documentados."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "VPN futura não consegue rotear",
        "probableCause": "CIDR sobreposto com datacenter ou parceiro.",
        "howToConfirm": "Comparar ranges no IPAM.",
        "fix": "Redesenhar antes de criar workloads ou usar bloco não conflitante."
      },
      {
        "symptom": "Workload privado não acessa dependência externa",
        "probableCause": "Ausência de rota para NAT/firewall ou DNS errado.",
        "howToConfirm": "Revisar route table, DNS e logs de firewall.",
        "fix": "Adicionar rota controlada ou endpoint privado adequado."
      },
      {
        "symptom": "Subnet ficou sem IPs",
        "probableCause": "Dimensionamento pequeno ou consumo por endpoints/nodes.",
        "howToConfirm": "Verificar IPs disponíveis e inventário de recursos.",
        "fix": "Criar subnet maior planejada, mover workloads ou revisar dimensionamento."
      },
      {
        "symptom": "SOC não vê tráfego lateral",
        "probableCause": "Flow logs não habilitados ou tráfego não passa por sensor/firewall.",
        "howToConfirm": "Verificar configuração de flow logs e caminho real.",
        "fix": "Habilitar logs, ajustar rotas e centralizar inspeção quando necessário."
      }
    ],
    "improvements": [
      "Criar módulo Terraform/Bicep padronizado.",
      "Integrar validação de CIDR com IPAM.",
      "Criar policy as code para bloquear subnets públicas indevidas.",
      "Adicionar plano IPv6.",
      "Criar tabela de custos de NAT, logs e firewalls."
    ],
    "evidenceToCollect": [
      "Tabela de CIDRs proibidos.",
      "CIDR principal escolhido.",
      "Tabela de subnets.",
      "Matriz de fluxos.",
      "Plano de rotas.",
      "Plano de logs.",
      "Justificativa de crescimento."
    ],
    "questions": [
      "Por que o CIDR escolhido não sobrepõe redes existentes?",
      "Qual subnet realmente precisa ser pública?",
      "Que fluxos são permitidos entre app e dados?",
      "Como o SOC investigaria tráfego lateral?",
      "Como o desenho muda se houver Kubernetes?"
    ],
    "challenge": "Redesenhe o plano para suportar uma segunda região sem reutilizar os mesmos CIDRs e sem quebrar conectividade híbrida.",
    "solution": "Reserve blocos por região desde o início, por exemplo produção região A em 10.42.0.0/16 e região B em 10.43.0.0/16, mantendo padrões de subnets por função. Documente rotas inter-regionais, replicação, logs e custos antes de implementar."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma VPC que funciona hoje ainda pode ser uma decisão ruim?",
      "hints": [
        "Pense em crescimento.",
        "Pense em VPN, peering e aquisição de empresas."
      ],
      "expectedIdeas": [
        "sobreposição",
        "renumeração",
        "rotas",
        "custos",
        "governança"
      ],
      "explanation": "Funcionamento imediato não prova sustentabilidade arquitetural."
    },
    {
      "type": "diagnóstico",
      "question": "Uma VPN híbrida foi criada, mas nenhuma rota funciona. O que você verificaria antes de culpar firewall?",
      "hints": [
        "Pense em CIDR.",
        "Pense em rotas conflitantes."
      ],
      "expectedIdeas": [
        "sobreposição",
        "route table",
        "propagação de rota",
        "BGP",
        "IPAM"
      ],
      "explanation": "CIDR sobreposto é uma causa clássica de falha antes mesmo de política de firewall."
    },
    {
      "type": "cenário real",
      "question": "Como você convenceria uma equipe de produto a não colocar banco e aplicação na mesma subnet?",
      "hints": [
        "Pense em evidências.",
        "Pense em movimento lateral e logs."
      ],
      "expectedIdeas": [
        "segmentação",
        "menor privilégio",
        "matriz de fluxos",
        "logs",
        "troubleshooting"
      ],
      "explanation": "A resposta ideal conecta segurança com operação, não apenas regra abstrata."
    }
  ],
  "quiz": [
    {
      "id": "q14.3.1",
      "type": "conceito",
      "q": "Qual é a melhor descrição de VPC/VNet?",
      "opts": [
        "Uma rede virtual privada onde recursos cloud recebem endereços, rotas e políticas",
        "Um firewall gerenciado obrigatório",
        "Um endereço IP público fixo",
        "Um serviço exclusivo para DNS"
      ],
      "a": 0,
      "exp": "VPC/VNet é o contêiner lógico da rede cloud.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q14.3.2",
      "type": "diagnóstico",
      "q": "Uma VPC não consegue se conectar ao datacenter por VPN porque ambos usam o mesmo bloco 10.10.0.0/16. Qual é o problema principal?",
      "opts": [
        "Sobreposição de CIDR",
        "MTU sempre incorreto",
        "DNS público fora do ar",
        "Falta de Wi-Fi"
      ],
      "a": 0,
      "exp": "Sobreposição de endereços torna o roteamento ambíguo ou impossível sem mecanismos adicionais.",
      "difficulty": "intermediário",
      "topic": "cidr"
    },
    {
      "id": "q14.3.3",
      "type": "segurança",
      "q": "Por que subnet privada não significa automaticamente segura?",
      "opts": [
        "Porque ainda pode ter rotas, egress e permissões amplas",
        "Porque subnets privadas sempre têm IP público",
        "Porque não existe firewall em cloud",
        "Porque DNS não funciona em subnets privadas"
      ],
      "a": 0,
      "exp": "A segurança depende de rotas, filtros, identidade, logs e operação.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q14.3.4",
      "type": "cloud",
      "q": "Qual diferença arquitetural importante existe entre AWS e Google Cloud?",
      "opts": [
        "Na AWS, subnets são associadas a AZ; no Google Cloud, subnets são regionais em uma VPC global",
        "AWS não usa CIDR",
        "Google Cloud não usa subnets",
        "Azure não possui VNet"
      ],
      "a": 0,
      "exp": "Essa diferença influencia desenho multi-zona/regional e IaC.",
      "difficulty": "intermediário",
      "topic": "comparação"
    },
    {
      "id": "q14.3.5",
      "type": "devsecops",
      "q": "Qual controle ajuda a evitar CIDR conflitante em pipelines IaC?",
      "opts": [
        "Validação contra IPAM e policy as code",
        "Usar sempre 10.0.0.0/16",
        "Desativar logs",
        "Criar subnet pública para tudo"
      ],
      "a": 0,
      "exp": "IPAM e policy as code reduzem erro repetido por automação.",
      "difficulty": "intermediário",
      "topic": "iac"
    },
    {
      "id": "q14.3.6",
      "type": "custos",
      "q": "Qual item pode gerar custo recorrente relacionado ao desenho de rede cloud?",
      "opts": [
        "NAT Gateway, egress, firewall gerenciado e logs de fluxo",
        "Máscara de rede escrita no diagrama",
        "Nome da subnet",
        "Quantidade de flashcards"
      ],
      "a": 0,
      "exp": "Rede cloud tem custos operacionais e financeiros, especialmente em tráfego, NAT, inspeção e logs.",
      "difficulty": "intermediário",
      "topic": "custos"
    }
  ],
  "flashcards": [
    {
      "id": "fc14.3.1",
      "front": "O que é VPC/VNet?",
      "back": "É uma rede virtual privada em cloud onde recursos usam endereços, subnets, rotas e políticas.",
      "tags": [
        "cloud",
        "vpc",
        "vnet"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.3.2",
      "front": "O que é CIDR em cloud?",
      "back": "É a notação que define o bloco de endereços IP disponível para a rede ou subnet.",
      "tags": [
        "cidr"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.3.3",
      "front": "Por que evitar CIDR sobreposto?",
      "back": "Porque sobreposição complica ou impede roteamento, VPN, peering e integração híbrida.",
      "tags": [
        "ipam",
        "routing"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.3.4",
      "front": "Subnet privada é sinônimo de segurança?",
      "back": "Não. Ela reduz exposição direta, mas segurança depende de rotas, filtros, identidade e logs.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.3.5",
      "front": "O que é IPAM?",
      "back": "É a gestão de endereços IP para evitar conflitos, documentar uso e planejar crescimento.",
      "tags": [
        "ipam"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.3.6",
      "front": "Qual o erro de copiar CIDR de tutorial?",
      "back": "O bloco pode funcionar no laboratório, mas conflitar com redes reais da empresa.",
      "tags": [
        "boas práticas"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex14.3.1",
      "type": "arquitetura",
      "prompt": "Proponha quatro subnets dentro de 10.50.0.0/16 para pública, app, dados e endpoints privados.",
      "expectedAnswer": "Exemplo: 10.50.10.0/24 pública, 10.50.20.0/24 app, 10.50.30.0/24 dados, 10.50.40.0/24 endpoints, mantendo reservas.",
      "explanation": "A resposta deve separar função e manter margem de crescimento."
    },
    {
      "id": "ex14.3.2",
      "type": "diagnóstico",
      "prompt": "Uma VPC usa 10.1.0.0/16 e o datacenter também. Explique por que a VPN terá problema.",
      "expectedAnswer": "Há sobreposição de endereços. O roteamento não consegue distinguir com clareza destinos locais e remotos sem NAT ou redesenho.",
      "explanation": "Sobreposição de CIDR é problema de arquitetura, não apenas firewall."
    },
    {
      "id": "ex14.3.3",
      "type": "segurança",
      "prompt": "Liste três controles para evitar subnet pública indevida.",
      "expectedAnswer": "Policy as code, revisão de arquitetura, módulos IaC aprovados, alertas de IP público, tags obrigatórias e bloqueio por organização/policy.",
      "explanation": "O controle deve combinar prevenção e detecção."
    },
    {
      "id": "ex14.3.4",
      "type": "custos",
      "prompt": "Explique por que egress e NAT devem ser considerados no desenho de subnets.",
      "expectedAnswer": "Porque workloads privados podem sair por NAT/firewall, gerando custo por hora/processamento/tráfego e afetando arquitetura de inspeção.",
      "explanation": "Rede cloud tem impacto financeiro recorrente."
    }
  ],
  "challenge": {
    "title": "Desenhar endereçamento de uma landing zone cloud",
    "scenario": "Uma empresa terá produção, desenvolvimento, dados sensíveis, endpoints privados, firewall central e futura VPN com datacenter. O datacenter usa 10.0.0.0/12 e filiais usam 172.16.0.0/16.",
    "tasks": [
      "Escolher CIDR principal sem sobreposição.",
      "Criar subnets por função.",
      "Reservar crescimento.",
      "Definir rotas esperadas.",
      "Definir matriz de fluxos.",
      "Listar logs necessários."
    ],
    "constraints": [
      "Não usar blocos já usados pelo datacenter ou filiais.",
      "Banco não pode ficar em subnet pública.",
      "Egress deve ser controlado.",
      "A solução deve permitir segunda região no futuro."
    ],
    "expectedDeliverables": [
      "Tabela de CIDR principal e subnets.",
      "Matriz de fluxos.",
      "Plano de rotas.",
      "Plano de logs.",
      "Justificativa de segurança e crescimento."
    ],
    "gradingRubric": [
      {
        "criterion": "Sem sobreposição",
        "points": 25,
        "description": "CIDR escolhido não conflita com redes existentes."
      },
      {
        "criterion": "Segmentação",
        "points": 25,
        "description": "Subnets por função e exposição."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Rotas, filtros, egress e logs coerentes."
      },
      {
        "criterion": "Operação e crescimento",
        "points": 25,
        "description": "Reservas, IPAM e documentação clara."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro excluímos ranges existentes. Depois escolhemos um bloco não conflitante, reservamos espaço por região/ambiente e criamos subnets por função. Por fim, transformamos o desenho em rotas, filtros, logs e governança.",
    "steps": [
      "Listar blocos proibidos.",
      "Escolher CIDR principal não conflitante.",
      "Reservar faixas para produção e futuro.",
      "Criar subnets públicas mínimas e privadas por função.",
      "Definir rotas e egress controlado.",
      "Criar matriz de fluxos.",
      "Habilitar logs e políticas de detecção.",
      "Documentar owner, tags e exceções."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Usar 10.0.0.0/16 porque é comum.",
        "whyItIsWrong": "Conflita com o datacenter informado."
      },
      {
        "answer": "Colocar tudo em uma subnet privada.",
        "whyItIsWrong": "Reduz exposição direta, mas não cria segmentação nem matriz de fluxo."
      },
      {
        "answer": "Criar subnets públicas para facilitar acesso administrativo.",
        "whyItIsWrong": "Aumenta superfície de ataque e ignora bastion, ZTNA, VPN e IAM."
      }
    ],
    "finalAnswer": "Uma resposta adequada poderia usar um bloco fictício não conflitante como 10.80.0.0/16, reservar 10.80.0.0/20 para produção na região A, 10.80.16.0/20 para expansão, 10.81.0.0/16 para futura região B e dividir subnets por pública, aplicação, dados, endpoints, segurança e gerenciamento. A matriz deve permitir apenas fluxos justificados, com egress via firewall/NAT controlado e logs habilitados."
  },
  "glossary": [
    {
      "term": "VPC",
      "shortDefinition": "Rede virtual privada em cloud.",
      "longDefinition": "Contêiner lógico de rede usado para organizar endereços, subnets, rotas, gateways e políticas em provedores como AWS.",
      "example": "Uma VPC 10.42.0.0/16 com subnets públicas, privadas e de dados.",
      "relatedTerms": [
        "VNet",
        "subnet",
        "CIDR"
      ],
      "relatedLessons": [
        "14.1",
        "14.3"
      ]
    },
    {
      "term": "VNet",
      "shortDefinition": "Virtual Network do Azure.",
      "longDefinition": "Rede virtual privada do Azure usada para comunicação segura entre recursos, internet e redes locais.",
      "example": "Uma VNet com address space 10.50.0.0/16 e subnets para app e dados.",
      "relatedTerms": [
        "VPC",
        "subnet",
        "NSG"
      ],
      "relatedLessons": [
        "14.1",
        "14.3"
      ]
    },
    {
      "term": "CIDR",
      "shortDefinition": "Notação para representar blocos de endereços IP.",
      "longDefinition": "Classless Inter-Domain Routing define prefixos como /16, /24 e /28, indicando tamanho do bloco e parte de rede.",
      "example": "10.42.0.0/16.",
      "relatedTerms": [
        "subnetting",
        "IPAM"
      ],
      "relatedLessons": [
        "4.x",
        "5.x",
        "14.3"
      ]
    },
    {
      "term": "Subnet cloud",
      "shortDefinition": "Divisão lógica de uma rede virtual.",
      "longDefinition": "Segmento de endereçamento usado para posicionar recursos e associar rotas, políticas e escopo de disponibilidade.",
      "example": "Subnet de dados 10.42.30.0/24 sem rota direta para internet.",
      "relatedTerms": [
        "route table",
        "security group",
        "NSG"
      ],
      "relatedLessons": [
        "14.3",
        "14.4"
      ]
    },
    {
      "term": "IPAM",
      "shortDefinition": "Gestão de endereços IP.",
      "longDefinition": "Processo ou ferramenta para registrar, reservar, governar e evitar conflitos de endereços em ambientes corporativos e cloud.",
      "example": "Consultar IPAM antes de criar nova VPC.",
      "relatedTerms": [
        "CIDR",
        "sobreposição"
      ],
      "relatedLessons": [
        "14.3",
        "15.x"
      ]
    },
    {
      "term": "CIDR sobreposto",
      "shortDefinition": "Dois domínios de rede usam o mesmo bloco de endereços.",
      "longDefinition": "Conflito que torna roteamento, VPN, peering e integração híbrida ambíguos ou inviáveis sem redesenho ou NAT.",
      "example": "VPC e datacenter usam 10.10.0.0/16.",
      "relatedTerms": [
        "VPN",
        "peering",
        "NAT"
      ],
      "relatedLessons": [
        "14.3",
        "14.8",
        "14.9"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "VPC CIDR blocks",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html",
      "note": "Define uso de CIDR em VPCs AWS."
    },
    {
      "type": "official-doc",
      "title": "Subnet CIDR blocks",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html",
      "note": "Documenta tamanhos e reservas de IP em subnets AWS."
    },
    {
      "type": "official-doc",
      "title": "What is Azure Virtual Network?",
      "organization": "Microsoft Azure",
      "url": "https://learn.microsoft.com/en-us/azure/virtual-network/virtual-networks-overview",
      "note": "Define VNet como bloco fundamental de rede privada no Azure."
    },
    {
      "type": "official-doc",
      "title": "Virtual networks and virtual machines in Azure",
      "organization": "Microsoft Azure",
      "url": "https://learn.microsoft.com/en-us/azure/virtual-network/network-overview",
      "note": "Orienta seleção de topologia, address spaces e subnets."
    },
    {
      "type": "official-doc",
      "title": "VPC networks",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/vpc/docs/vpc",
      "note": "Descreve redes VPC e comportamento de subnets no Google Cloud."
    },
    {
      "type": "official-doc",
      "title": "Subnets",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/vpc/docs/subnets",
      "note": "Referência para subnets regionais e ranges no Google Cloud."
    },
    {
      "type": "rfc",
      "title": "RFC 1918 - Address Allocation for Private Internets",
      "organization": "IETF",
      "url": "https://datatracker.ietf.org/doc/html/rfc1918",
      "note": "Referência para endereços privados e custo de renumeração."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.x",
      "reason": "CIDR e IPv4 são fundamentos diretos do desenho de VPC/VNet."
    },
    {
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.x",
      "reason": "Subnetting é necessário para dividir espaços cloud."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação defensiva orienta o desenho de subnets."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e Platform Engineering",
      "lesson": "módulos de rede",
      "reason": "VPC/VNet deve ser padronizada e validada em pipeline."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM e Zero Trust",
      "lesson": "políticas contextuais",
      "reason": "Acesso a recursos cloud combina rede, identidade e contexto."
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
      "14.4"
    ]
  }
};
