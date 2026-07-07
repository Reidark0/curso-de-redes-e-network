export const lesson1413 = {
  "id": "14.13",
  "moduleId": "m14",
  "order": 13,
  "title": "Landing Zone, governança, hub de segurança e arquitetura corporativa",
  "subtitle": "Como transformar redes cloud isoladas em uma fundação corporativa segura, governada, observável e reutilizável.",
  "duration": "170-230 min",
  "estimatedStudyTimeMinutes": 230,
  "difficulty": "avançado",
  "type": "ligação",
  "xp": 380,
  "tags": [
    "cloud networking",
    "landing zone",
    "governança",
    "hub-spoke",
    "segurança",
    "logs",
    "iam",
    "policy as code",
    "devsecops",
    "arquitetura corporativa",
    "finops",
    "guardrails"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.3",
      "reason": "Landing Zone depende de VPC/VNet, CIDR e desenho de subnets."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.9",
      "reason": "Hub-spoke, peering e transit são blocos centrais da arquitetura corporativa."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.12",
      "reason": "Governança cloud sem observabilidade cria controles cegos."
    },
    {
      "type": "course",
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "m01-m04",
      "reason": "Landing Zone depende fortemente de identidade, federação, grupos, papéis e menor privilégio."
    },
    {
      "type": "course",
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m08-m12",
      "reason": "Automação por IaC, pipelines, plataforma interna e policy as code viabilizam Landing Zone como produto."
    }
  ],
  "objectives": [
    "Definir Landing Zone como fundação corporativa para cloud.",
    "Explicar separação entre contas de organização, segurança, logs, conectividade e workloads.",
    "Desenhar hub de segurança e conectividade com spokes de aplicação.",
    "Relacionar governança, políticas, tags, custos, logs, IAM e rede.",
    "Identificar riscos de uma cloud sem fundação corporativa.",
    "Planejar uma Landing Zone como código, com guardrails e processo de exceção."
  ],
  "learningOutcomes": [
    "Dado um ambiente cloud bagunçado, o aluno propõe uma separação inicial de contas, redes e responsabilidades.",
    "Dado um requisito de segurança, o aluno decide se o controle pertence ao hub, ao spoke, à política global ou ao pipeline.",
    "Dado um novo workload, o aluno indica quais componentes da Landing Zone ele deve consumir.",
    "Dado um risco de exposição ou custo, o aluno define guardrail, evidência e processo de exceção."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivação\">\n  <h2>1. Motivação</h2>\n\n  <p>Até aqui você aprendeu peças fundamentais de Cloud Networking: regiões, zonas, VPC/VNet, CIDR, subnets, rotas, gateways, firewalls, load balancers, DNS, VPN, peering, private endpoints, Kubernetes e observabilidade. O problema é que uma empresa real não opera uma única VPC criada manualmente por um único time. Ela opera muitas contas, assinaturas ou projetos; vários ambientes; diferentes equipes; integrações com datacenter; requisitos de auditoria; custos recorrentes; exceções; e mudanças constantes feitas por pipelines.</p>\n  <p>A motivação desta aula é transformar conhecimento técnico em <strong>fundação corporativa reutilizável</strong>. Em cloud, essa fundação costuma ser chamada de <strong>Landing Zone</strong>: um conjunto padronizado de contas, redes, identidades, políticas, logs, segurança, governança e automações que permite que times criem workloads com autonomia sem abandonar controles essenciais.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> sem Landing Zone, cada squad cria sua própria VPC/VNet, seus próprios CIDRs, suas próprias regras, seus próprios logs e seu próprio modelo de acesso. O resultado aparece meses depois: CIDR sobreposto, dados expostos, falta de logs, custos invisíveis, redes impossíveis de conectar e incidentes sem evidência.</div>\n  <p>Esta aula conecta redes, segurança, cloud, DevSecOps e arquitetura corporativa. O objetivo não é decorar o nome comercial de cada provedor. O objetivo é entender <strong>como desenhar uma base cloud que consiga crescer sem virar caos</strong>.</p>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--história\">\n  <h2>2. História</h2>\n\n  <p>Nos primeiros anos de cloud pública, muitas adoções começaram como experimentos: uma conta, uma aplicação, uma subnet pública, uma VM, um banco e algumas regras de firewall. Essa abordagem funcionava para protótipos, mas falhava quando a organização migrava sistemas críticos, adicionava múltiplas equipes e precisava provar controle para auditoria.</p>\n  <p>Em datacenters tradicionais, a padronização vinha de salas, racks, VLANs, firewalls centrais, links, processos de mudança e times especializados. Na cloud, os recursos passaram a ser criados por API. Isso aumentou velocidade, mas também aumentou o risco de <strong>infraestrutura improvisada em escala</strong>.</p>\n  <p>A resposta evoluiu para modelos de contas separadas, organizações cloud, guardrails, políticas, redes hub-spoke, contas de segurança, contas de logs, automação por IaC, pipelines, catálogos internos e arquiteturas de referência. A Landing Zone nasceu dessa necessidade: permitir inovação sem abrir mão de governança.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Fase 1:</strong> conta única e experimentação manual.</div><div class=\"timeline-item\"><strong>Fase 2:</strong> separação por ambiente, redes e times.</div><div class=\"timeline-item\"><strong>Fase 3:</strong> hub de rede, logs centralizados e segurança central.</div><div class=\"timeline-item\"><strong>Fase 4:</strong> Landing Zone automatizada com guardrails, policy as code e self-service controlado.</div></div>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema que a Landing Zone resolve não é apenas “criar rede”. Ela resolve o problema de <strong>governar muitas redes e muitos workloads ao longo do tempo</strong>. Uma arquitetura cloud empresarial precisa responder perguntas que uma VPC isolada não responde:</p>\n  <ul>\n    <li>Quem pode criar redes, IPs públicos, firewalls, peerings, VPNs e private endpoints?</li>\n    <li>Quais regiões são permitidas por latência, custo, residência de dados e compliance?</li>\n    <li>Como evitar CIDR sobreposto entre cloud, datacenter, parceiros e ambientes futuros?</li>\n    <li>Como centralizar inspeção sem criar gargalo ou ponto único de falha?</li>\n    <li>Como coletar logs antes de incidentes acontecerem?</li>\n    <li>Como impedir exposição pública acidental?</li>\n    <li>Como separar produção, homologação, desenvolvimento, segurança e conectividade?</li>\n    <li>Como permitir autonomia dos times sem entregar permissões administrativas irrestritas?</li>\n  </ul>\n  <p>Sem uma base corporativa, a cloud vira uma coleção de exceções. Cada exceção parece pequena no dia em que é criada, mas o conjunto vira dívida técnica, risco de segurança e custo operacional.</p>\n  <div class=\"callout callout--warning\"><strong>Atenção:</strong> Landing Zone não é um produto mágico. É uma arquitetura operacional. Comprar um serviço gerenciado ou aplicar um template sem decisões de governança apenas automatiza decisões ruins.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolução\">\n  <h2>4. Evolução</h2>\n\n  <p>A evolução da arquitetura cloud corporativa pode ser vista como uma transição entre liberdade total e autonomia governada.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Modelo</th><th>Como funciona</th><th>Vantagem</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Conta única</td><td>Todos os recursos no mesmo espaço administrativo.</td><td>Simples para aprender.</td><td>Baixa segregação, alto risco e difícil auditoria.</td></tr>\n      <tr><td>Contas por ambiente</td><td>Dev, homologação e produção separados.</td><td>Reduz impacto cruzado.</td><td>Ainda pode faltar governança comum.</td></tr>\n      <tr><td>Hub-spoke</td><td>Conectividade e segurança centralizadas no hub; workloads em spokes.</td><td>Padroniza inspeção e conectividade.</td><td>Exige roteamento, escala, custos e operação bem planejados.</td></tr>\n      <tr><td>Landing Zone</td><td>Organização, identidade, rede, logs, segurança, políticas e automação.</td><td>Base escalável para múltiplos times.</td><td>Exige maturidade, ownership e evolução contínua.</td></tr>\n      <tr><td>Plataforma interna</td><td>Times consomem padrões por catálogo, pipeline e módulos IaC.</td><td>Autonomia com guardrails.</td><td>Demanda produto interno, documentação e suporte.</td></tr>\n    </tbody>\n  </table>\n  <p>A evolução saudável não remove responsabilidade dos times. Ela cria trilhos seguros para que boas decisões sejam fáceis e decisões perigosas sejam bloqueadas ou explicitamente aprovadas.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p><strong>Landing Zone</strong> é a base inicial e contínua para operar workloads em cloud de forma segura, governada, observável e escalável. Ela normalmente inclui estrutura organizacional, contas ou subscriptions, identidade, rede, logs, segurança, políticas, automação, custos, tagging, monitoramento e processos de exceção.</p>\n  <p>Em termos de rede, a Landing Zone define como os ambientes se conectam, como o tráfego sai para a internet, como workloads internos acessam serviços gerenciados, como a cloud se conecta ao datacenter, como logs são coletados e como a segurança inspeciona fluxos.</p>\n  <p>Uma Landing Zone madura tem pelo menos quatro dimensões:</p>\n  <ul>\n    <li><strong>Organização:</strong> contas, assinaturas, projetos, pastas, unidades organizacionais, ambientes e donos.</li>\n    <li><strong>Rede:</strong> CIDR, VPC/VNet, subnets, hub-spoke, transit, VPN, DNS, egress e endpoints privados.</li>\n    <li><strong>Segurança:</strong> identidade, logs, firewall, guardrails, chaves, segredos, detecção, resposta e conformidade.</li>\n    <li><strong>Operação:</strong> IaC, pipelines, tags, custos, runbooks, observabilidade, mudanças e auditoria.</li>\n  </ul>\n  <div class=\"callout callout--info\"><strong>Definição prática:</strong> Landing Zone é o “chão pronto” onde aplicações podem pousar. Sem ela, cada aplicação precisa reinventar rede, segurança, logging, identidade e governança.</div>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Internamente, uma Landing Zone funciona como a combinação de plano de controle, plano de dados e plano operacional.</p>\n  <h3>Plano de controle</h3>\n  <p>É onde ficam identidade, permissões, políticas, organizações, contas, subscriptions, projetos, regiões permitidas, limites e trilhas de auditoria. Ele define <strong>quem pode criar o quê</strong> e sob quais condições.</p>\n  <h3>Plano de dados</h3>\n  <p>É onde o tráfego realmente passa: VPCs, VNets, subnets, route tables, gateways, NAT, firewalls, load balancers, endpoints privados, VPNs, interconnects e redes Kubernetes. Ele define <strong>como os pacotes circulam</strong>.</p>\n  <h3>Plano operacional</h3>\n  <p>É onde a organização mantém a arquitetura viva: IaC, pipelines, policy as code, inventário, tags, logs, SIEM, alertas, runbooks, revisão de exceções e gestão de custo. Ele define <strong>como a arquitetura é criada, modificada, observada e corrigida</strong>.</p>\n  <p>O erro clássico é tratar Landing Zone como um desenho estático. Ela é um sistema vivo. Cada nova conta, nova região, novo serviço gerenciado, novo requisito regulatório e novo time pode exigir atualização de módulos, políticas e documentação.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Uma arquitetura corporativa comum usa separação por contas ou subscriptions especializadas. Os nomes variam entre provedores, mas o padrão conceitual se repete.</p>\n  <ul>\n    <li><strong>Conta de management/organização:</strong> administra a hierarquia e políticas globais.</li>\n    <li><strong>Conta de identidade:</strong> integra diretórios, federação, IAM, grupos e acesso privilegiado.</li>\n    <li><strong>Conta de segurança:</strong> centraliza detecção, postura, vulnerabilidades, chaves, guardrails e ferramentas do SOC.</li>\n    <li><strong>Conta de logs/auditoria:</strong> recebe trilhas de auditoria, flow logs, logs de DNS, firewall, load balancer e WAF.</li>\n    <li><strong>Conta de conectividade/hub:</strong> hospeda hub de rede, firewall, VPN, link dedicado, transit e DNS resolver.</li>\n    <li><strong>Contas de workloads/spokes:</strong> hospedam aplicações por ambiente, criticidade ou domínio de negócio.</li>\n    <li><strong>Conta de sandbox:</strong> permite experimentos com limites fortes de custo, região, internet e dados.</li>\n  </ul>\n  <p>No desenho de rede, o hub conecta datacenter, spokes, serviços compartilhados, inspeção, DNS e SIEM. Os spokes hospedam workloads com rotas controladas. O tráfego norte-sul é a entrada e saída da organização; o tráfego leste-oeste é a comunicação entre workloads; o tráfego de gerenciamento deve ser separado; e o tráfego para serviços gerenciados deve preferir caminhos privados quando fizer sentido.</p>\n\n\n<div class=\"callout callout--security\"><strong>Landing Zone madura:</strong> uma landing zone não é uma VPC grande. É um produto de plataforma com identidade, rede, logging, segurança, orçamento, políticas, exceções, automação, catálogo aprovado e responsabilidades claras entre plataforma e times de workload.</div>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em uma Landing Zone como um condomínio empresarial planejado. Antes de cada empresa ocupar uma sala, o prédio precisa de portaria, controle de acesso, elevadores, energia, hidrantes, câmeras, rotas de fuga, estacionamento, identificação, regras de uso, manutenção e administração.</p>\n  <p>Uma aplicação cloud é como uma empresa ocupando uma sala. Ela precisa de autonomia para trabalhar, mas não pode decidir sozinha onde instalar o quadro de energia, abrir um buraco para a rua, desativar câmeras, bloquear escadas ou criar uma nova entrada sem controle.</p>\n  <p>A rede hub-spoke é como a infraestrutura compartilhada do prédio: corredores principais, portaria, segurança e áreas técnicas. As redes dos workloads são as salas. A governança define o que cada ocupante pode fazer sem aprovação, o que precisa de revisão e o que é proibido.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Imagine uma pequena empresa que quer hospedar um sistema interno na cloud. Sem Landing Zone, alguém cria uma conta, uma VPC, uma subnet pública, uma VM e libera SSH para a internet. Funciona rápido, mas nasce inseguro.</p>\n  <p>Com uma mini Landing Zone, a empresa começa com:</p>\n  <ul>\n    <li>uma conta de produção separada da conta de testes;</li>\n    <li>CIDR definido e documentado;</li>\n    <li>subnet pública apenas para load balancer;</li>\n    <li>subnet privada para aplicação;</li>\n    <li>banco sem IP público;</li>\n    <li>logs de auditoria e flow logs ativos;</li>\n    <li>acesso administrativo por identidade federada;</li>\n    <li>política bloqueando portas administrativas abertas para a internet;</li>\n    <li>tags obrigatórias de dono, ambiente e custo.</li>\n  </ul>\n  <p>O sistema ainda é simples, mas agora nasce com padrões que podem crescer.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa grande, a Landing Zone precisa acomodar múltiplas áreas: financeiro, jurídico, atendimento, dados, segurança, desenvolvimento, operações e parceiros. Cada área pode ter requisitos diferentes de privacidade, disponibilidade e conectividade.</p>\n  <p>Um desenho empresarial pode usar:</p>\n  <ul>\n    <li>organização cloud com unidades por ambiente e criticidade;</li>\n    <li>hub de conectividade regional com firewall e roteamento central;</li>\n    <li>conta de segurança com postura, detecção e resposta;</li>\n    <li>conta de logs imutáveis com retenção compatível com auditoria;</li>\n    <li>spokes por aplicação, produto ou domínio;</li>\n    <li>políticas que impedem recursos públicos não aprovados;</li>\n    <li>DNS privado integrado ao datacenter;</li>\n    <li>private endpoints para bancos e filas gerenciadas;</li>\n    <li>catálogo interno com módulos Terraform aprovados;</li>\n    <li>processo de exceção para casos que precisam fugir do padrão.</li>\n  </ul>\n  <p>O ganho não é apenas segurança. É velocidade operacional: times não precisam reinventar conectividade, logging e controles a cada novo projeto.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-em-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Os provedores implementam esses conceitos com nomes diferentes, mas os padrões são comparáveis.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Conceito</th><th>AWS</th><th>Azure</th><th>Google Cloud</th></tr></thead>\n    <tbody>\n      <tr><td>Estrutura organizacional</td><td>Organizations, OUs e contas</td><td>Management groups, subscriptions e resource groups</td><td>Organization, folders e projects</td></tr>\n      <tr><td>Rede base</td><td>VPC, subnets, route tables</td><td>VNet, subnets, route tables/UDR</td><td>VPC network, subnets, routes</td></tr>\n      <tr><td>Hub de trânsito</td><td>Transit Gateway</td><td>Virtual WAN ou hub VNet</td><td>Network Connectivity Center ou hub-and-spoke com VPCs</td></tr>\n      <tr><td>Acesso privado a serviços</td><td>PrivateLink / VPC endpoints</td><td>Private Link / Private Endpoint</td><td>Private Service Connect</td></tr>\n      <tr><td>Logs e auditoria</td><td>CloudTrail, VPC Flow Logs, CloudWatch, S3 log archive</td><td>Activity Log, Monitor, Network Watcher, Log Analytics</td><td>Cloud Audit Logs, VPC Flow Logs, Cloud Logging</td></tr>\n      <tr><td>Políticas</td><td>SCPs, IAM, Config, Control Tower guardrails</td><td>Azure Policy, RBAC, Defender for Cloud</td><td>Organization Policies, IAM, Security Command Center</td></tr>\n    </tbody>\n  </table>\n  <p>A escolha do serviço específico depende do provedor, mas a arquitetura mental é a mesma: separar administração, segurança, logs, conectividade e workloads.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-em-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Na prática DevSecOps, Landing Zone deve ser entregue como código. Se a base depende de cliques manuais, ela não é reproduzível, auditável nem revisável. Os padrões devem existir em módulos, pipelines, validações e catálogos.</p>\n  <p>Um fluxo maduro pode funcionar assim:</p>\n  <ol>\n    <li>O time solicita uma nova zona de aplicação por portal interno ou repositório.</li>\n    <li>O pipeline valida nome, dono, ambiente, criticidade, região, CIDR e orçamento.</li>\n    <li>Módulos IaC criam conta/subscription/projeto, rede spoke, subnets, logs, tags e permissões mínimas.</li>\n    <li>Policy as code bloqueia IP público indevido, região proibida, SG aberto e ausência de logs.</li>\n    <li>O pipeline publica documentação automática da topologia e matriz de fluxos.</li>\n    <li>Alterações passam por revisão, teste e trilha de auditoria.</li>\n  </ol>\n  <div class=\"callout callout--success\"><strong>Prática saudável:</strong> o melhor guardrail é aquele que aparece cedo no pipeline, antes de criar risco em produção.</div>\n\n\n<table class=\"comparison-table\"><thead><tr><th>Guardrail</th><th>Tipo</th><th>Exemplo</th><th>Evidência</th></tr></thead><tbody><tr><td>Bloquear IP público indevido</td><td>Preventivo</td><td>Policy as Code nega criação fora de exceção.</td><td>Resultado do pipeline e evento de negação.</td></tr><tr><td>Detectar SG/NSG amplo</td><td>Detectivo</td><td>Regra 0.0.0.0/0 em porta sensível gera alerta.</td><td>Finding no CSPM/SIEM.</td></tr><tr><td>Padronizar módulos IaC</td><td>Preventivo</td><td>Módulo aprovado de VPC/VNet, LB, endpoint e logs.</td><td>Repositório versionado e revisão.</td></tr><tr><td>Controlar exceções</td><td>Governança</td><td>Exceção com dono, prazo e risco residual.</td><td>Registro de risco e data de expiração.</td></tr></tbody></table>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-em-segurança\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Do ponto de vista de segurança, a Landing Zone materializa controles de defesa em profundidade. Ela reduz a chance de cada time tomar decisões perigosas isoladamente e aumenta a capacidade do SOC de enxergar o ambiente.</p>\n  <p>Controles típicos incluem:</p>\n  <ul>\n    <li>bloqueio de regiões não aprovadas;</li>\n    <li>proibição de buckets, bancos e VMs públicas fora de exceções controladas;</li>\n    <li>centralização de logs em conta protegida;</li>\n    <li>guardrails de IAM e acesso privilegiado;</li>\n    <li>firewall hub com inspeção de tráfego crítico;</li>\n    <li>DNS logging e detecção de domínios suspeitos;</li>\n    <li>egress control para reduzir exfiltração;</li>\n    <li>private endpoints para serviços sensíveis;</li>\n    <li>monitoramento de mudanças em rotas, SG/NSG, firewall, DNS e IAM;</li>\n    <li>integração com SIEM, SOAR e playbooks de resposta.</li>\n  </ul>\n  <p>Mas segurança não deve virar bloqueio absoluto. Uma Landing Zone madura diferencia padrões seguros, exceções justificadas e proibições reais. Tudo deve ter dono, prazo, evidência e revisão.</p>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama abaixo mostra uma Landing Zone corporativa com contas/plataformas separadas, hub de conectividade, segurança central, logs centralizados e spokes de workloads.</p>\n  <div class=\"svg-lab-container\" aria-label=\"Diagrama de Landing Zone corporativa\">\n    <svg class=\"lesson-svg lesson-svg--landing-zone\" viewBox=\"0 0 980 620\" role=\"img\" aria-labelledby=\"title-1413 desc-1413\">\n      <title id=\"title-1413\">Landing Zone, governança e hub de segurança</title>\n      <desc id=\"desc-1413\">Arquitetura com organização cloud, identidade, segurança, logs, hub de conectividade, workloads e governança por políticas.</desc>\n      <defs>\n        <marker id=\"arrow-1413\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\" class=\"svg-arrow\"></path></marker>\n      </defs>\n\n      <rect x=\"35\" y=\"30\" width=\"910\" height=\"550\" rx=\"22\" class=\"svg-frame\"></rect>\n      <text x=\"490\" y=\"62\" text-anchor=\"middle\" class=\"svg-title\">Landing Zone corporativa</text>\n\n      <rect x=\"70\" y=\"90\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--identity\"></rect>\n      <text x=\"160\" y=\"122\" text-anchor=\"middle\" class=\"svg-label\">Identidade</text>\n      <text x=\"160\" y=\"145\" text-anchor=\"middle\" class=\"svg-small\">IAM / SSO / PAM</text>\n      <text x=\"160\" y=\"165\" text-anchor=\"middle\" class=\"svg-small\">menor privilégio</text>\n\n      <rect x=\"295\" y=\"90\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n      <text x=\"385\" y=\"122\" text-anchor=\"middle\" class=\"svg-label\">Segurança</text>\n      <text x=\"385\" y=\"145\" text-anchor=\"middle\" class=\"svg-small\">postura / detecção</text>\n      <text x=\"385\" y=\"165\" text-anchor=\"middle\" class=\"svg-small\">guardrails</text>\n\n      <rect x=\"520\" y=\"90\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--logs\"></rect>\n      <text x=\"610\" y=\"122\" text-anchor=\"middle\" class=\"svg-label\">Logs</text>\n      <text x=\"610\" y=\"145\" text-anchor=\"middle\" class=\"svg-small\">auditoria / flow</text>\n      <text x=\"610\" y=\"165\" text-anchor=\"middle\" class=\"svg-small\">SIEM / retenção</text>\n\n      <rect x=\"745\" y=\"90\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--policy\"></rect>\n      <text x=\"825\" y=\"122\" text-anchor=\"middle\" class=\"svg-label\">Governança</text>\n      <text x=\"825\" y=\"145\" text-anchor=\"middle\" class=\"svg-small\">políticas / tags</text>\n      <text x=\"825\" y=\"165\" text-anchor=\"middle\" class=\"svg-small\">custos / regiões</text>\n\n      <rect x=\"310\" y=\"250\" width=\"360\" height=\"120\" rx=\"18\" class=\"svg-node svg-node--central\"></rect>\n      <text x=\"490\" y=\"285\" text-anchor=\"middle\" class=\"svg-label\">Hub de conectividade e segurança</text>\n      <text x=\"490\" y=\"310\" text-anchor=\"middle\" class=\"svg-small\">firewall • transit • VPN/link dedicado • DNS resolver</text>\n      <text x=\"490\" y=\"334\" text-anchor=\"middle\" class=\"svg-small\">egress control • inspeção • rotas compartilhadas</text>\n\n      <rect x=\"80\" y=\"435\" width=\"190\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--workload\"></rect>\n      <text x=\"175\" y=\"467\" text-anchor=\"middle\" class=\"svg-label\">Spoke produção</text>\n      <text x=\"175\" y=\"490\" text-anchor=\"middle\" class=\"svg-small\">apps críticas</text>\n\n      <rect x=\"320\" y=\"435\" width=\"190\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--workload\"></rect>\n      <text x=\"415\" y=\"467\" text-anchor=\"middle\" class=\"svg-label\">Spoke dados</text>\n      <text x=\"415\" y=\"490\" text-anchor=\"middle\" class=\"svg-small\">bancos privados</text>\n\n      <rect x=\"560\" y=\"435\" width=\"190\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--workload\"></rect>\n      <text x=\"655\" y=\"467\" text-anchor=\"middle\" class=\"svg-label\">Spoke Kubernetes</text>\n      <text x=\"655\" y=\"490\" text-anchor=\"middle\" class=\"svg-small\">EKS / AKS / GKE</text>\n\n      <rect x=\"785\" y=\"435\" width=\"120\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--sandbox\"></rect>\n      <text x=\"845\" y=\"467\" text-anchor=\"middle\" class=\"svg-label\">Sandbox</text>\n      <text x=\"845\" y=\"490\" text-anchor=\"middle\" class=\"svg-small\">limites fortes</text>\n\n      <rect x=\"75\" y=\"260\" width=\"155\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--external\"></rect>\n      <text x=\"152\" y=\"292\" text-anchor=\"middle\" class=\"svg-label\">Datacenter</text>\n      <text x=\"152\" y=\"315\" text-anchor=\"middle\" class=\"svg-small\">legado / usuários</text>\n\n      <line x1=\"230\" y1=\"305\" x2=\"310\" y2=\"305\" class=\"svg-link\" marker-end=\"url(#arrow-1413)\"></line>\n      <line x1=\"490\" y1=\"370\" x2=\"175\" y2=\"435\" class=\"svg-link\" marker-end=\"url(#arrow-1413)\"></line>\n      <line x1=\"490\" y1=\"370\" x2=\"415\" y2=\"435\" class=\"svg-link\" marker-end=\"url(#arrow-1413)\"></line>\n      <line x1=\"490\" y1=\"370\" x2=\"655\" y2=\"435\" class=\"svg-link\" marker-end=\"url(#arrow-1413)\"></line>\n      <line x1=\"670\" y1=\"315\" x2=\"845\" y2=\"435\" class=\"svg-link\" marker-end=\"url(#arrow-1413)\"></line>\n\n      <line x1=\"160\" y1=\"180\" x2=\"390\" y2=\"250\" class=\"svg-link svg-link--policy\" marker-end=\"url(#arrow-1413)\"></line>\n      <line x1=\"385\" y1=\"180\" x2=\"455\" y2=\"250\" class=\"svg-link svg-link--policy\" marker-end=\"url(#arrow-1413)\"></line>\n      <line x1=\"610\" y1=\"180\" x2=\"545\" y2=\"250\" class=\"svg-link svg-link--log\" marker-end=\"url(#arrow-1413)\"></line>\n      <line x1=\"825\" y1=\"180\" x2=\"590\" y2=\"250\" class=\"svg-link svg-link--policy\" marker-end=\"url(#arrow-1413)\"></line>\n\n      <text x=\"490\" y=\"560\" text-anchor=\"middle\" class=\"svg-small\">Guardrails devem ser aplicados antes, durante e depois do provisionamento.</text>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercícios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios treinam decisões de arquitetura. A pergunta principal não é “qual serviço usar?”, mas “qual separação, controle e evidência são necessários para operar com segurança?”.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio é construir uma proposta completa de Landing Zone para uma empresa híbrida, incluindo contas, rede, hub de segurança, logs, políticas, tags, custos e exceções.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solução-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra uma arquitetura de referência, explica as escolhas, aponta trade-offs e destaca erros comuns que parecem convenientes no início, mas geram risco e custo depois.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Landing Zone é a base corporativa para operar cloud com segurança, governança, rede, identidade, logs, custos e automação. Ela organiza a separação entre administração, segurança, logs, conectividade e workloads.</p>\n  <p>O aprendizado central desta aula é que Cloud Networking empresarial não é apenas criar VPCs e subnets. É criar uma fundação onde redes, políticas, logs, identidade, segurança e DevSecOps trabalham juntos para permitir escala sem perder controle.</p>\n\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--próximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, você fará o <strong>Projeto final: arquitetura cloud segura, híbrida e observável</strong>. A aula 14.14 consolidará todo o Módulo 14 em um desenho ponta a ponta, conectando VPC/VNet, roteamento, DNS, firewalls, private endpoints, Kubernetes, observabilidade, Landing Zone, custos e governança.</p>\n\n</section>"
  },
  "networkContext": {
    "osiLayers": [
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
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "DNS",
      "TLS",
      "BGP",
      "IPsec",
      "HTTP",
      "HTTPS"
    ],
    "dependsOn": [
      "VPC/VNet",
      "CIDR",
      "subnets",
      "route tables",
      "firewalls",
      "DNS privado",
      "VPN",
      "Transit Gateway",
      "Virtual WAN",
      "Private Link",
      "flow logs",
      "IAM"
    ],
    "enables": [
      "governança cloud",
      "cloud networking corporativo",
      "segurança centralizada",
      "plataforma interna",
      "FinOps",
      "auditoria",
      "escala multi-conta"
    ]
  },
  "exercises": [
    {
      "question": "Explique por que uma Landing Zone não deve ser apenas uma VPC compartilhada.",
      "expectedAnswer": "Porque Landing Zone envolve organização, identidade, logs, segurança, políticas, custos, operação e automação, não apenas conectividade."
    },
    {
      "question": "Liste cinco componentes que deveriam existir antes de migrar uma aplicação crítica para cloud.",
      "expectedAnswer": "Exemplos: conta/subscription separada, rede e CIDR planejados, logs centralizados, IAM federado, guardrails, backup, monitoramento, firewall, DNS privado e tags."
    },
    {
      "question": "Em uma arquitetura hub-spoke, quais controles ficam no hub e quais ficam no spoke?",
      "expectedAnswer": "No hub costumam ficar conectividade, firewall central, DNS resolver, transit e egress; no spoke ficam controles próximos do workload, como SG/NSG, subnets, network policies e logs locais."
    },
    {
      "question": "Por que processo de exceção é parte da governança?",
      "expectedAnswer": "Porque ambientes reais têm casos especiais; sem processo, exceções viram bypass informal, sem dono, prazo ou evidência."
    },
    {
      "id": "ex14.13.p1.1",
      "type": "governança",
      "prompt": "Crie um processo de exceção para uma aplicação que pede load balancer público sem WAF.",
      "expectedAnswer": "Deve incluir justificativa, risco, compensações, prazo, aprovação, monitoramento, revisão e plano de remoção ou adequação.",
      "explanation": "Governança madura não é apenas bloquear; é permitir exceções controladas, rastreáveis e temporárias."
    }
  ],
  "quiz": [
    {
      "question": "Qual é a melhor definição prática de Landing Zone?",
      "options": [
        "Uma única subnet pública para começar rápido",
        "Uma base corporativa de cloud com identidade, rede, segurança, logs, governança e automação",
        "Um firewall gerenciado na borda da cloud",
        "Um script para criar máquinas virtuais"
      ],
      "correctIndex": 1,
      "explanation": "Landing Zone é uma fundação ampla, não um único recurso de rede."
    },
    {
      "question": "Qual risco é reduzido por uma conta central de logs?",
      "options": [
        "Aumento de CPU nas VMs",
        "Perda ou alteração de evidências por times de workload",
        "Latência entre regiões",
        "Tamanho do CIDR"
      ],
      "correctIndex": 1,
      "explanation": "Centralizar logs em domínio protegido ajuda a preservar evidências para auditoria e resposta."
    },
    {
      "question": "Em hub-spoke, qual afirmação é mais correta?",
      "options": [
        "Todo tráfego sempre deve passar pelo hub, sem exceção",
        "O hub pode centralizar conectividade e inspeção, mas o desenho deve considerar escala, custo e rotas",
        "Spokes não precisam de controles próprios",
        "Hub-spoke elimina a necessidade de DNS"
      ],
      "correctIndex": 1,
      "explanation": "Hub-spoke é útil, mas precisa considerar trade-offs e controles em múltiplas camadas."
    },
    {
      "question": "Qual é o papel de policy as code em uma Landing Zone?",
      "options": [
        "Substituir completamente o IAM",
        "Validar e aplicar guardrails de forma automatizada e revisável",
        "Criptografar pacotes TCP",
        "Aumentar a largura de banda do link dedicado"
      ],
      "correctIndex": 1,
      "explanation": "Policy as code transforma regras de governança em controles testáveis e auditáveis."
    },
    {
      "question": "Qual item é um exemplo de guardrail preventivo?",
      "options": [
        "Relatório mensal de custos",
        "Bloquear criação de IP público fora de exceções aprovadas",
        "Dashboard de latência",
        "Documento de arquitetura sem automação"
      ],
      "correctIndex": 1,
      "explanation": "Um guardrail preventivo impede a ação perigosa antes que ela se torne risco."
    },
    {
      "question": "Por que tags são importantes em Cloud Networking?",
      "options": [
        "Porque substituem route tables",
        "Porque permitem associar tráfego, custo, dono, ambiente e criticidade aos recursos",
        "Porque tornam uma subnet pública privada",
        "Porque eliminam a necessidade de logs"
      ],
      "correctIndex": 1,
      "explanation": "Tags conectam recursos a contexto operacional, financeiro e de governança."
    },
    {
      "id": "q14.13.p1.1",
      "type": "arquitetura",
      "q": "Qual afirmação melhor descreve uma landing zone corporativa?",
      "opts": [
        "Uma VPC/VNet grande onde todos colocam workloads",
        "Um conjunto de contas, rede, identidade, logging, políticas, automação, custos e processos para operar cloud com governança",
        "Um firewall central apenas",
        "Um cluster Kubernetes compartilhado"
      ],
      "a": 1,
      "exp": "Landing zone é um modelo operacional e arquitetural, não apenas uma rede ou um firewall.",
      "difficulty": "intermediário",
      "topic": "Landing Zone"
    }
  ],
  "flashcards": [
    {
      "front": "O que é Landing Zone?",
      "back": "Base corporativa para operar cloud com identidade, rede, segurança, logs, governança, custos e automação."
    },
    {
      "front": "Por que separar conta de logs?",
      "back": "Para preservar evidências fora do domínio operacional dos workloads e facilitar auditoria."
    },
    {
      "front": "O que é hub de conectividade?",
      "back": "Ambiente central que concentra trânsito, firewall, VPN/link dedicado, DNS e egress control."
    },
    {
      "front": "O que são guardrails?",
      "back": "Controles preventivos ou detectivos que limitam ações perigosas e padronizam o ambiente."
    },
    {
      "front": "Qual é a diferença entre workload e plataforma?",
      "back": "Workload entrega aplicação; plataforma fornece fundação compartilhada, padrões e serviços comuns."
    },
    {
      "front": "Por que Landing Zone deve ser como código?",
      "back": "Para ser reproduzível, revisável, auditável, testável e evoluída por pipeline."
    },
    {
      "id": "fc14.13.p1.1",
      "front": "Landing zone é só rede?",
      "back": "Não. Ela inclui rede, identidade, logging, segurança, governança, custos, automação, exceções e operação.",
      "tags": [
        "landing-zone",
        "governança"
      ],
      "difficulty": "intermediário"
    }
  ],
  "mentorQuestions": [
    "Quais decisões de rede ficariam perigosas se cada time pudesse tomá-las sozinho?",
    "Que controles devem ser preventivos e quais podem ser apenas detectivos?",
    "Como você equilibraria autonomia dos squads com segurança, auditoria e custo?"
  ],
  "challenge": {
    "title": "Proposta executiva e técnica de Landing Zone",
    "scenario": "Você é arquiteto de cloud em uma empresa que migrará 30 aplicações nos próximos 18 meses. Há datacenter legado, exigência de auditoria, times com maturidade diferente, orçamento limitado e pressão por velocidade.",
    "tasks": [
      "Criar uma hierarquia de contas, subscriptions ou projetos.",
      "Desenhar hub-spoke com conectividade híbrida e segurança central.",
      "Definir plano de CIDR e IPAM.",
      "Definir guardrails preventivos e detectivos.",
      "Definir logs, retenção, SIEM e linha do tempo de investigação.",
      "Definir catálogo DevSecOps com módulos IaC aprovados.",
      "Definir estratégia de tags, orçamento e custos de rede.",
      "Definir processo de exceções."
    ],
    "successCriteria": [
      "A arquitetura separa funções críticas.",
      "O hub não vira caixa preta sem observabilidade.",
      "Workloads têm autonomia dentro de limites claros.",
      "Logs e auditoria existem antes da produção.",
      "Custos de tráfego e inspeção são considerados.",
      "Exceções têm dono, prazo e revisão."
    ],
    "gradingRubric": [
      {
        "criterion": "Modelo organizacional",
        "points": 15,
        "description": "Define contas/subscriptions/projetos, ambientes, shared services e separação de responsabilidades."
      },
      {
        "criterion": "Topologia de rede",
        "points": 20,
        "description": "Desenha hub-spoke/transit, IPAM, DNS, egress, hybrid e inspection sem caixa preta."
      },
      {
        "criterion": "Guardrails",
        "points": 20,
        "description": "Inclui políticas preventivas, detectivas, exceções e processo de mudança."
      },
      {
        "criterion": "Observabilidade e auditoria",
        "points": 15,
        "description": "Centraliza logs, retenção, SIEM, auditoria de mudanças e runbooks."
      },
      {
        "criterion": "FinOps",
        "points": 15,
        "description": "Controla tags, budgets, custos de rede e limpeza de recursos."
      },
      {
        "criterion": "Catálogo DevSecOps",
        "points": 15,
        "description": "Define módulos IaC aprovados, versionamento, testes e rollback."
      }
    ],
    "minimumPassingScore": 70,
    "criticalFailureCriteria": [
      "Arquitetura que expõe dados sensíveis diretamente à internet sem justificativa e mitigação.",
      "Ausência de plano de logs/evidências para diagnóstico e auditoria.",
      "Ausência de análise de custos ou limpeza de recursos quando houver proposta de provisionamento cloud.",
      "Confusão entre conectividade de rede e autorização por identidade/IAM."
    ],
    "expectedDeliverables": [
      "Blueprint de Landing Zone",
      "Matriz de guardrails",
      "Fluxo de exceções",
      "Plano de logging central e segregação de funções"
    ]
  },
  "commentedSolution": {
    "summary": "Uma boa solução cria uma fundação mínima porém escalável: organização separada, identidade federada, segurança central, logs protegidos, hub de conectividade, spokes por workload, políticas globais e IaC como caminho padrão.",
    "steps": [
      "Comece separando responsabilidades: organização, segurança, logs, conectividade e workloads.",
      "Defina regiões permitidas e plano de CIDR antes de criar spokes.",
      "Crie hub com firewall, DNS resolver, VPN/link dedicado e egress control, mas avalie custo e latência.",
      "Crie guardrails para IP público, logs, tags, regiões, IAM, criptografia e portas administrativas.",
      "Centralize logs de auditoria e rede em conta protegida com retenção clara.",
      "Entregue redes por módulos IaC e pipeline, não por cliques manuais.",
      "Documente exceções e revise periodicamente para evitar que exceções virem padrão."
    ],
    "commonMistakes": [
      "Criar uma VPC compartilhada para todos os ambientes e chamar isso de Landing Zone.",
      "Centralizar todo tráfego no hub sem calcular custo, escala e impacto de rota.",
      "Permitir CIDR livre por time sem IPAM.",
      "Coletar logs sem retenção, dono ou integração com investigação.",
      "Criar guardrails sem processo de exceção.",
      "Automatizar padrões antes de validá-los tecnicamente."
    ]
  },
  "glossary": [
    {
      "term": "Landing Zone",
      "shortDefinition": "Fundação corporativa para uso de cloud.",
      "longDefinition": "Conjunto de contas, redes, identidades, políticas, logs, segurança, custos e automações que prepara uma organização para operar workloads cloud com governança.",
      "example": "Uma Landing Zone cria contas de segurança, logs, conectividade e produção antes da migração das aplicações.",
      "relatedTerms": [
        "guardrails",
        "hub-spoke",
        "governança"
      ],
      "relatedLessons": [
        "14.13"
      ]
    },
    {
      "term": "Guardrail",
      "shortDefinition": "Controle preventivo ou detectivo de governança.",
      "longDefinition": "Regra técnica ou processo que impede, alerta ou corrige ações fora do padrão aprovado.",
      "example": "Bloquear criação de banco público em produção.",
      "relatedTerms": [
        "policy as code",
        "compliance"
      ],
      "relatedLessons": [
        "13.8",
        "14.13"
      ]
    },
    {
      "term": "Hub de conectividade",
      "shortDefinition": "Rede central para trânsito e controles compartilhados.",
      "longDefinition": "Ambiente que concentra conectividade híbrida, firewall, DNS, rotas e inspeção para múltiplos spokes.",
      "example": "Uma VNet hub conecta spokes de aplicação ao datacenter via ExpressRoute e firewall central.",
      "relatedTerms": [
        "hub-spoke",
        "Transit Gateway",
        "Virtual WAN"
      ],
      "relatedLessons": [
        "14.8",
        "14.9",
        "14.13"
      ]
    },
    {
      "term": "Conta de logs",
      "shortDefinition": "Ambiente separado para evidências.",
      "longDefinition": "Conta, subscription ou projeto protegido usado para armazenar logs de auditoria, rede e segurança fora do domínio dos workloads.",
      "example": "Flow logs e audit logs de produção são enviados para uma conta de log archive.",
      "relatedTerms": [
        "SIEM",
        "audit log",
        "retenção"
      ],
      "relatedLessons": [
        "14.12",
        "14.13"
      ]
    },
    {
      "term": "Policy as Code",
      "shortDefinition": "Políticas governadas como código.",
      "longDefinition": "Prática de escrever regras de segurança e governança em formato versionado, testável e aplicado automaticamente por pipelines ou motores de política.",
      "example": "Pipeline reprova Terraform que cria security group aberto para 0.0.0.0/0 na porta SSH.",
      "relatedTerms": [
        "DevSecOps",
        "IaC",
        "guardrails"
      ],
      "relatedLessons": [
        "14.13"
      ]
    },
    {
      "term": "Spoke",
      "shortDefinition": "Rede de workload conectada ao hub.",
      "longDefinition": "VPC, VNet ou projeto de aplicação que consome serviços compartilhados do hub, mantendo isolamento e controles locais.",
      "example": "Spoke de produção hospeda aplicação e banco privado, usando DNS e firewall do hub.",
      "relatedTerms": [
        "hub-spoke",
        "peering",
        "transit"
      ],
      "relatedLessons": [
        "14.9",
        "14.13"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Landing Zone Accelerator on AWS - Developer guide",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/solutions/latest/landing-zone-accelerator-on-aws/developer-guide.html",
      "note": "Referência oficial sobre solução de Landing Zone Accelerator e configuração por arquivos."
    },
    {
      "type": "official-doc",
      "title": "Centralized logging - Landing Zone Accelerator on AWS",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/solutions/latest/landing-zone-accelerator-on-aws/centralized-logging.html",
      "note": "Referência sobre arquitetura de logging centralizado em Landing Zone."
    },
    {
      "type": "official-doc",
      "title": "What is an Azure landing zone?",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/",
      "note": "Define Azure Landing Zone e diferencia platform landing zone e application landing zones."
    },
    {
      "type": "official-doc",
      "title": "Azure landing zone design areas",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-areas",
      "note": "Documenta áreas de decisão para Landing Zones no Azure."
    },
    {
      "type": "official-doc",
      "title": "Decide a resource hierarchy for your Google Cloud landing zone",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/architecture/landing-zones/decide-resource-hierarchy",
      "note": "Documenta hierarquia de recursos como parte do desenho de Landing Zone no Google Cloud."
    },
    {
      "type": "official-doc",
      "title": "NIST Cloud Computing Security Reference Architecture",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/500/299/ipd",
      "note": "Arquitetura de referência de segurança para cloud computing e responsabilidades por atores e componentes."
    },
    {
      "type": "official-doc",
      "title": "Cloud Architecture Framework / Well-Architected guidance",
      "organization": "AWS/Azure/Google Cloud",
      "url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
      "note": "Use como referência de princípios de arquitetura, custo, operação, segurança e confiabilidade, adaptando ao provedor escolhido."
    }
  ],
  "security": {
    "goodPractices": [
      "Aplicar desenho hub-spoke, rotas explícitas e separação de ambientes quando fizer sentido.",
      "Usar private endpoints, DNS privado e políticas de egress para reduzir exposição pública.",
      "Habilitar flow logs, auditoria de mudanças e métricas de gateways, balanceadores e firewalls.",
      "Documentar custos recorrentes de NAT Gateway, tráfego entre zonas/regiões e appliances gerenciados.",
      "Validar conectividade com testes sintéticos antes e depois de mudanças de IaC.",
      "Separar claramente caminho de rede, autenticação, autorização e auditoria: endpoint privado não substitui IAM.",
      "Definir logging e retenção antes de colocar workloads críticas em produção.",
      "Validar DNS privado e rotas com evidências antes de remover caminhos públicos antigos.",
      "Documentar exceções com dono, prazo, justificativa, risco residual e plano de remoção."
    ],
    "badPractices": [
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta sem registrar causa, risco e prevenção.",
      "Acreditar que “privado” significa automaticamente autorizado e seguro.",
      "Criar NAT, load balancers, endpoints e firewalls sem tags, owner ou plano de limpeza.",
      "Centralizar todo tráfego no hub sem capacidade, observabilidade e critério de inspeção.",
      "Habilitar logs indiscriminadamente sem retenção, amostragem, destino e estimativa de custo."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar cloud networking, conectividade privada, governança, observabilidade e arquitetura híbrida com impacto operacional, financeiro e de segurança.",
      "Confundir endpoint privado com peering entre redes inteiras.",
      "Esquecer que DNS privado é parte crítica do desenho e do troubleshooting.",
      "Não diferenciar tráfego negado em firewall de tráfego não roteado ou não resolvido por DNS.",
      "Não planejar evidência de auditoria para mudanças de rota, SG/NSG, firewall, DNS e IAM."
    ],
    "vulnerabilities": [
      {
        "name": "Risco cloud específico — Landing Zone, governança, hub de segurança e arquitetura corporativa",
        "description": "Em Landing Zone, governança, hub de segurança e arquitetura corporativa, o risco principal é criar caminho privado, rota, endpoint, peering, CNI, observabilidade ou landing zone que pareça segura, mas permita exposição pública residual, bypass de firewall, resolução DNS privada incorreta, rota assimétrica ou tráfego sem telemetria.",
        "defensiveExplanation": "O risco aparece quando VPC/VNet, route table, endpoint privado, DNS privado, security group/NSG, NAT, firewall gerenciado, Kubernetes CNI e logs cloud são tratados como peças separadas, sem validação ponta a ponta.",
        "mitigation": "Validar DNS privado e público, rota de ida e retorno, SG/NSG/NACL, egress, flow logs, IAM/RBAC, custos e limpeza; manter evidências antes/depois, testes por origem e destino, IaC revisado e rollback documentado."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      }
    ],
    "monitoring": [
      "Flow logs de VPC/VNet, firewall gerenciado, NAT Gateway, Load Balancer e Private Endpoint.",
      "Auditoria de mudanças de IaC, route tables, NSG/SG, DNS privado e peering.",
      "Métricas de latência, drops, resets, health checks, egress e custo por recurso."
    ],
    "hardening": [
      "Reduzir acessos any-any e exceções permanentes.",
      "Usar autenticação forte, segregação de funções e revisão periódica de permissões.",
      "Versionar configurações críticas e exigir revisão para mudanças de rede e segurança.",
      "Padronizar logs mínimos, retenção, alertas e evidências por tipo de incidente.",
      "Executar laboratórios destrutivos apenas em ambiente isolado."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido antes da mudança.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Investigar picos de bloqueios, resets, NXDOMAIN, drops, latência ou volume anormal.",
      "Criar alerta ou consulta específica para sinais relacionados à aula 14.13."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Falha ou comportamento inesperado relacionado a Landing Zone, governança, hub de segurança e arquitetura corporativa.",
      "Funciona para uma origem, mas falha para outra.",
      "Funciona por IP, mas falha por nome.",
      "Conecta, mas não autoriza ou não completa a transação.",
      "Mudança recente coincide com aumento de erros, latência, drops ou alertas."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 14.13?"
    ],
    "commands": [
      {
        "platform": "AWS/Azure/GCP",
        "command": "verificar route tables, SG/NSG, NACL/firewall, DNS privado, flow logs e auditoria de mudanças",
        "purpose": "Confirmar caminho, política e estado real da conectividade cloud.",
        "expectedObservation": "Rotas, políticas e DNS coerentes com o desenho esperado.",
        "interpretation": "Divergência entre desenho e estado aplicado indica falha de IaC, mudança manual ou configuração incompleta."
      },
      {
        "platform": "Linux",
        "command": "dig nome.privado && curl -vk https://servico && traceroute destino",
        "purpose": "Validar DNS, TLS, camada de aplicação e caminho a partir de uma origem controlada.",
        "expectedObservation": "Nome resolve para destino esperado e conexão segue rota permitida.",
        "interpretation": "Falha em DNS, handshake ou caminho direciona o próximo teste."
      },
      {
        "platform": "Kubernetes/Cloud",
        "command": "kubectl get svc,ingress,pods,endpoints -A && kubectl describe ingress <nome>",
        "purpose": "Quando aplicável, validar serviço, endpoints, ingress e integração com balanceador/cloud.",
        "expectedObservation": "Endpoints saudáveis e ingress/balanceador com configuração esperada.",
        "interpretation": "Sem endpoints saudáveis, a falha pode estar no serviço ou readiness, não apenas na rede."
      },
      {
        "platform": "Cloud console / CLI",
        "command": "Validar rotas efetivas, regras efetivas, DNS resolvido, health checks, logs de fluxo e billing por tag",
        "purpose": "Correlacionar plano de rede com comportamento real e custo real.",
        "expectedObservation": "O caminho observado deve bater com o diagrama e com a matriz de fluxos.",
        "interpretation": "Divergência entre desenho e evidência indica drift, rota mais específica, DNS errado, política efetiva inesperada ou recurso órfão."
      }
    ],
    "decisionTree": [
      {
        "if": "O problema ocorre para todos os usuários e todas as origens",
        "then": "Priorizar serviço, DNS global, mudança central, firewall compartilhado, cloud regional ou dependência comum."
      },
      {
        "if": "O problema ocorre apenas para uma origem, filial, subnet ou usuário",
        "then": "Priorizar rota, política local, DNS específico, VPN, segmentação, identidade ou configuração do cliente."
      },
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, split-horizon, cache, search suffix, resolver usado e registros privados/públicos."
      },
      {
        "if": "Conecta, mas falha após handshake ou autenticação",
        "then": "Investigar TLS, proxy, WAF, identidade, autorização, cabeçalhos, sessão e logs de aplicação."
      },
      {
        "if": "A evidência aponta para mudança recente",
        "then": "Comparar antes/depois, avaliar rollback seguro, registrar impacto e transformar causa em controle preventivo."
      },
      {
        "if": "Serviço funciona, mas pelo caminho público antigo",
        "then": "Verificar DNS privado, zona vinculada, precedence de resolução, rota, policy do endpoint e cache DNS do cliente."
      },
      {
        "if": "Serviço falha apenas em uma zona ou subnet",
        "then": "Comparar rotas efetivas, associações de tabela, endpoints por zona, SG/NSG/firewall e health checks naquela zona."
      }
    ]
  },
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
      "14.14"
    ]
  },
  "cloudFinalReview": {
    "reviewId": "p1-m14-final-14.13",
    "scope": "Revisão fina P1 das aulas finais de Cloud Networking.",
    "officialValidationUsed": [
      "Kubernetes Services e abstração de endpoints para Pods efêmeros.",
      "Kubernetes CNI como requisito para implementar o modelo de rede do cluster.",
      "Custos recorrentes de NAT Gateway, PrivateLink/Private Endpoint, load balancer, firewall gerenciado, tráfego e logs.",
      "Flow logs como fonte de monitoramento, forense, segurança e otimização de custos, com limitações de amostragem conforme provedor.",
      "Landing zone como modelo operacional com governança, conectividade, logging, identidade, políticas, automação e controle de exceções."
    ],
    "finOpsControls": [
      "Separar custo fixo por hora de custo variável por GB processado ou transferido.",
      "Modelar tráfego por caminho: internet, NAT, load balancer, peering, link dedicado, endpoint privado e logs.",
      "Estimar impacto de multi-AZ/multi-zona antes de colocar appliances, NAT gateways e endpoints em todas as zonas.",
      "Definir tags obrigatórias de aplicação, ambiente, owner, centro de custo, criticidade e data de expiração.",
      "Criar alarme de orçamento e anomalia antes de liberar ambiente de teste prolongado.",
      "Preferir laboratório conceitual ou local quando o objetivo pedagógico não exige cobrança real."
    ],
    "cleanupPlan": [
      "Registrar todos os recursos criados: VPC/VNet, subnets, gateways, load balancers, endpoints privados, IPs públicos, firewalls, VPNs, zonas DNS e buckets de log.",
      "Destruir recursos por IaC quando possível, usando o mesmo pipeline que criou o ambiente.",
      "Remover dependências em ordem segura: aplicações, balanceadores, endpoints, rotas, gateways, zonas DNS, logs temporários e redes.",
      "Verificar recursos órfãos cobrados por hora ou por volume: NAT Gateway, IP público, firewall gerenciado, load balancer, endpoint privado, VPN gateway e discos/instâncias de observabilidade.",
      "Validar no console de billing ou cost management se a queda de custo apareceu após a limpeza.",
      "Preservar apenas evidências necessárias para auditoria conforme política de retenção."
    ],
    "evidenceChecklist": [
      "Diagrama lógico de rede com zonas, subnets, rotas, pontos de inspeção e fluxos críticos.",
      "Matriz origem-destino-porta-protocolo-dono-justificativa.",
      "Plano de DNS público/privado, incluindo split-horizon e validação de resolução.",
      "Plano de logs e métricas com retenção, destino, amostragem e dono operacional.",
      "Estimativa de custos de tráfego, NAT, endpoints, balanceadores, firewalls, VPN, peering/interconnect e logs.",
      "Runbook de troubleshooting e rollback para cada componente crítico."
    ],
    "releaseReadiness": {
      "contentDepth": "revisado",
      "labs": "reforçados com custo, limpeza, validação e evidências",
      "security": "reforçada com IAM separado de conectividade, menor privilégio e observabilidade",
      "cloudCost": "reforçado com riscos de cobrança e controles FinOps",
      "capstone": "rubrica de aula adicionada"
    }
  },
  "landingZoneGovernance": {
    "domains": [
      {
        "domain": "Organização e contas/subscriptions/projetos",
        "decisions": [
          "separação por ambiente",
          "contas de segurança/logging",
          "workloads por criticidade"
        ],
        "evidence": "hierarquia documentada e tags obrigatórias"
      },
      {
        "domain": "Rede",
        "decisions": [
          "hub-spoke",
          "transit",
          "DNS privado",
          "IPAM",
          "egress control"
        ],
        "evidence": "diagrama, matriz de rotas e matriz de fluxos"
      },
      {
        "domain": "Segurança",
        "decisions": [
          "firewall central",
          "WAF",
          "policies",
          "CSPM",
          "exceções"
        ],
        "evidence": "findings, denies, logs e aprovações"
      },
      {
        "domain": "Observabilidade",
        "decisions": [
          "logging central",
          "retenção",
          "exportação SIEM",
          "dashboards"
        ],
        "evidence": "queries, alertas, buckets e trilha de auditoria"
      },
      {
        "domain": "FinOps",
        "decisions": [
          "budgets",
          "tags",
          "anomalias",
          "showback/chargeback"
        ],
        "evidence": "relatórios por owner e alarme de orçamento"
      },
      {
        "domain": "DevSecOps",
        "decisions": [
          "módulos IaC",
          "pipeline de mudança",
          "policy as code",
          "rollback"
        ],
        "evidence": "runs de pipeline, aprovações e changelog"
      }
    ],
    "exceptionProcess": [
      "dono",
      "justificativa",
      "risco",
      "compensação",
      "prazo",
      "aprovação",
      "revisão",
      "remoção"
    ]
  },
  "p1_09_cloudNetworkingv2final": {
    "status": "aplicado",
    "focus": "Landing Zone, hub-spoke, governança, guardrails, identidade e conectividade corporativa",
    "accessPolicyPreserved": true,
    "labExecutionModes": [
      "simulado/local",
      "cloud real opcional autorizada"
    ],
    "required": [
      "custo estimado",
      "alternativa zero custo",
      "limpeza obrigatória",
      "validação objetiva",
      "evidências sanitizadas"
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e Platform Engineering",
      "lesson": "Módulos reutilizáveis, policy as code e guardrails",
      "reason": "Landing Zone depende de automação, módulos padronizados e validação contínua."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança de IAM",
      "lesson": "RBAC, menor privilégio e segregação de funções",
      "reason": "Landing Zone sem identidade e autorização bem governadas não sustenta segurança corporativa."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    }
  ],
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false,
    "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
  }
};
