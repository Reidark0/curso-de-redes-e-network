export const lesson1414 = {
  "id": "14.14",
  "moduleId": "m14",
  "order": 14,
  "title": "Projeto final: arquitetura cloud segura, híbrida e observável",
  "subtitle": "Consolidação do Módulo 14 em um desenho corporativo ponta a ponta, integrando rede, segurança, cloud, DevSecOps, observabilidade, governança e custos.",
  "duration": "210-300 min",
  "estimatedStudyTimeMinutes": 300,
  "difficulty": "avançado",
  "type": "projeto",
  "xp": 500,
  "tags": [
    "cloud networking",
    "projeto final",
    "arquitetura cloud",
    "landing zone",
    "hub-spoke",
    "private link",
    "kubernetes",
    "observabilidade",
    "segurança",
    "devsecops",
    "finops",
    "troubleshooting",
    "governança"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.1-14.13",
      "reason": "Este projeto final consolida todas as aulas anteriores do módulo de Cloud Networking."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.10",
      "reason": "O desenho cloud seguro depende de defesa em profundidade, segmentação, logging e playbooks de segurança."
    },
    {
      "type": "course",
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m08-m12",
      "reason": "O projeto depende de IaC, pipelines, policy as code, módulos reutilizáveis e operação de plataforma."
    },
    {
      "type": "course",
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "m01-m06",
      "reason": "A arquitetura final depende de identidade, menor privilégio, federação, papéis, contas de serviço e governança de acesso."
    }
  ],
  "objectives": [
    "Consolidar todos os conceitos do Módulo 14 em uma arquitetura cloud completa.",
    "Desenhar uma topologia híbrida com hub-spoke, datacenter, VPN ou link dedicado e BGP controlado.",
    "Definir VPC/VNet, CIDR, subnets, route tables, egress, private endpoints, DNS e publicação segura.",
    "Planejar controles de segurança com SG/NSG, firewall, WAF, IAM, policies e logs centralizados.",
    "Produzir matriz de fluxos, plano de observabilidade, plano de custos e checklist de validação.",
    "Justificar trade-offs de segurança, disponibilidade, latência, custo e operação."
  ],
  "learningOutcomes": [
    "Dado um conjunto de requisitos empresariais, o aluno desenha uma arquitetura cloud segura e híbrida.",
    "Dado um fluxo de aplicação, o aluno identifica DNS, rota, firewall, load balancer, endpoint privado, logs e responsáveis.",
    "Dado um risco de exposição, o aluno propõe controle preventivo, detectivo e evidência de auditoria.",
    "Dado um incidente hipotético, o aluno indica quais logs e métricas usaria para investigar.",
    "Dado um requisito de custo, o aluno identifica componentes que geram cobrança recorrente e pontos de otimização."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivação\">\n  <h2>1. Motivação</h2>\n\n  <p>Você chegou ao fim do módulo de Cloud Networking. Até aqui, cada aula isolou uma peça: região, zona, VPC/VNet, CIDR, rota, NAT, firewall, load balancer, DNS, VPN, BGP, peering, transit, Private Link, Kubernetes, flow logs e Landing Zone. A motivação desta aula é juntar essas peças em uma arquitetura coerente, como acontece em um projeto corporativo real.</p>\n  <p>Em ambiente empresarial, a pergunta raramente é “como crio uma subnet?”. A pergunta é: <strong>como publico uma aplicação de forma segura, privada, auditável, resiliente, econômica e operável, sem bloquear a velocidade dos times?</strong> Essa resposta exige rede, segurança, identidade, DevSecOps, governança e observabilidade trabalhando juntos.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> muitas falhas de cloud não acontecem porque alguém desconhecia um recurso isolado. Elas acontecem porque as peças foram combinadas sem arquitetura: subnet pública indevida, rota default permissiva, DNS privado quebrado, private endpoint sem política, NAT caro, logs ausentes, WAF fora do caminho, BGP anunciando prefixo errado ou Kubernetes consumindo IPs sem planejamento.</div>\n  <p>Esta aula é o projeto final do Módulo 14. O objetivo é treinar seu raciocínio de arquiteto, engenheiro de redes, segurança e plataforma: transformar requisitos de negócio em desenho técnico, justificar trade-offs, prever riscos e produzir evidências para operação e auditoria.</p>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--história\">\n  <h2>2. História</h2>\n\n  <p>Redes corporativas surgiram em um mundo onde servidores ficavam em datacenters próprios, redes eram desenhadas em torno de switches, VLANs, firewalls físicos, circuitos dedicados e mudanças controladas por times centralizados. Quando a cloud pública ganhou espaço, a criação de rede passou a ser feita por API, em minutos, por múltiplos times e pipelines.</p>\n  <p>Essa mudança trouxe velocidade, mas também deslocou o risco. Antes, criar uma nova zona de rede exigia aprovação e execução manual. Em cloud, uma VPC, uma rota para internet, um security group permissivo, um load balancer público ou um endpoint exposto podem surgir em poucos segundos. Por isso, a arquitetura cloud moderna evoluiu de “infraestrutura como recurso” para “infraestrutura como produto governado”.</p>\n  <p>O caminho histórico passou por conta única, redes isoladas, hub-spoke, contas separadas, Landing Zones, policy as code, service mesh, Private Link, observabilidade centralizada, FinOps e plataformas internas. O projeto final desta aula representa essa maturidade: não desenhar apenas conectividade, mas uma fundação de operação contínua.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Datacenter:</strong> perímetro, VLAN, firewall central e mudanças manuais.</div><div class=\"timeline-item\"><strong>Cloud inicial:</strong> VPC isolada, subnet pública e recursos manuais.</div><div class=\"timeline-item\"><strong>Cloud corporativa:</strong> hub-spoke, contas separadas, private endpoints e logs centrais.</div><div class=\"timeline-item\"><strong>Cloud como plataforma:</strong> IaC, guardrails, módulos reutilizáveis, observabilidade e FinOps.</div></div>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema do projeto final é desenhar uma arquitetura cloud que atenda simultaneamente requisitos que frequentemente entram em tensão:</p>\n  <ul>\n    <li><strong>Segurança:</strong> expor apenas o necessário, reduzir superfície pública, aplicar menor privilégio e coletar evidências.</li>\n    <li><strong>Conectividade:</strong> integrar usuários, datacenter, aplicações, Kubernetes, serviços gerenciados e parceiros.</li>\n    <li><strong>Resiliência:</strong> distribuir recursos entre zonas, evitar pontos únicos de falha e planejar recuperação.</li>\n    <li><strong>Operação:</strong> permitir troubleshooting com logs, métricas, auditoria, runbooks e ownership claro.</li>\n    <li><strong>Custo:</strong> controlar NAT, egress, logs, firewalls, transit, load balancers, WAF, CDN e links dedicados.</li>\n    <li><strong>Governança:</strong> padronizar regiões, tags, políticas, exceções, identidade e mudanças por pipeline.</li>\n  </ul>\n  <p>Arquitetura ruim costuma otimizar apenas um desses pontos. Uma rede “muito rápida” pode ser insegura. Uma rede “muito segura” pode ser inoperável. Uma rede “muito barata” pode não ter resiliência. Uma rede “muito flexível” pode virar caos. O desafio profissional é equilibrar esses objetivos com justificativa técnica.</p>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> começar o desenho por ferramentas. A sequência correta é: requisitos, riscos, fluxos, zonas, endereçamento, rotas, controles, logs, custos, automação e só então serviços específicos do provedor.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolução\">\n  <h2>4. Evolução</h2>\n\n  <p>O projeto final evolui do desenho ingênuo para o desenho corporativo. Essa evolução não é estética; ela muda risco, custo e operação.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como parece</th><th>Problema oculto</th><th>Evolução correta</th></tr></thead>\n    <tbody>\n      <tr><td>Aplicação em subnet pública</td><td>Rápida de publicar.</td><td>Superfície pública ampla e difícil de governar.</td><td>CDN/WAF/LB na borda e backends privados.</td></tr>\n      <tr><td>Uma VPC para tudo</td><td>Simples no começo.</td><td>Blast radius alto e separação fraca.</td><td>Spokes por ambiente, criticidade ou domínio.</td></tr>\n      <tr><td>NAT para todo serviço externo</td><td>Funciona para saída.</td><td>Custo alto e controle limitado.</td><td>Private endpoints, egress firewall e allowlist.</td></tr>\n      <tr><td>Peering em malha</td><td>Conecta redes rapidamente.</td><td>Escala mal e induz erro de transitividade.</td><td>Hub-spoke com transit e rotas explícitas.</td></tr>\n      <tr><td>Logs opcionais</td><td>Economiza no início.</td><td>Incidente sem evidência.</td><td>Logs mínimos obrigatórios, retenção e SIEM.</td></tr>\n      <tr><td>Mudança manual</td><td>Resolve urgência.</td><td>Drift, falta de revisão e baixa reprodutibilidade.</td><td>IaC, pipeline, policy as code e exceção rastreada.</td></tr>\n    </tbody>\n  </table>\n  <p>A maturidade está em projetar a rede já pensando em expansão, incidentes, auditoria, custo e operação diária. Isso não elimina complexidade, mas torna a complexidade explícita e administrável.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p>O conceito central desta aula é <strong>arquitetura cloud segura, híbrida e observável</strong>. Ela é segura porque aplica defesa em profundidade, segmentação, menor privilégio, private endpoints, egress control e guardrails. É híbrida porque integra cloud, datacenter, usuários remotos, filiais, parceiros e serviços gerenciados. É observável porque cada decisão crítica gera evidências: logs de fluxo, logs DNS, auditoria, métricas, billing, traces de aplicação e eventos de segurança.</p>\n  <p>Uma arquitetura final bem desenhada responde três perguntas:</p>\n  <ol>\n    <li><strong>Quem fala com quem?</strong> Matriz de fluxos, portas, protocolos, origens, destinos e justificativas.</li>\n    <li><strong>Quem permite ou bloqueia?</strong> Rotas, firewalls, SG/NSG, NACL, WAF, IAM, policies e DNS.</li>\n    <li><strong>Como eu provo?</strong> Logs, métricas, auditoria, consultas, dashboards, alertas e runbooks.</li>\n  </ol>\n  <p>Essa arquitetura não é um único desenho. É um conjunto de artefatos: diagrama, plano CIDR, matriz de rotas, matriz de firewall, modelo DNS, modelo de publicação, desenho de private endpoints, plano de logs, plano de custos, riscos residuais, checklist de validação e processo de mudança.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Internamente, uma arquitetura cloud final funciona como uma sequência de decisões encadeadas. Um usuário não “acessa a aplicação” de forma abstrata. Ele resolve um nome DNS, chega a um edge ou load balancer, passa por WAF, TLS, health check, regras de listener, roteamento para backend, security groups, network policies, DNS interno, conexão com banco privado e logs em múltiplas camadas.</p>\n  <p>Da mesma forma, uma aplicação não “acessa um banco gerenciado”. Ela resolve um nome privado, usa uma rota local ou endpoint privado, passa por políticas de IAM e de endpoint, negocia TLS, gera logs de auditoria, consome IP, gera custo e pode falhar se DNS, rota, firewall ou identidade estiverem inconsistentes.</p>\n  <p>O funcionamento interno pode ser resumido em camadas:</p>\n  <ul>\n    <li><strong>Nomeação:</strong> DNS público, DNS privado, split-horizon e service discovery.</li>\n    <li><strong>Endereçamento:</strong> CIDR, subnets, IPAM, reservas e ausência de sobreposição.</li>\n    <li><strong>Encaminhamento:</strong> route tables, UDRs, transit, peering, VPN, BGP e gateways.</li>\n    <li><strong>Controle:</strong> SG/NSG, NACL, cloud firewall, WAF, network policies e IAM.</li>\n    <li><strong>Exposição:</strong> load balancer, TLS, CDN, Private Link e endpoints privados.</li>\n    <li><strong>Observabilidade:</strong> flow logs, DNS logs, auditoria, métricas, SIEM e billing.</li>\n    <li><strong>Governança:</strong> Landing Zone, guardrails, tags, budgets, policies e pipelines.</li>\n  </ul>\n  <div class=\"callout callout--info\"><strong>Ideia-chave:</strong> troubleshooting profissional em cloud é seguir essa cadeia. Se a aplicação falha, você verifica nome, rota, controle, serviço, identidade, certificado, saúde, logs e custo, em vez de alterar regras aleatoriamente.</div>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>A arquitetura de referência deste projeto usa uma Landing Zone com separação de responsabilidades. A organização possui contas ou subscriptions de administração, segurança, logs, conectividade e workloads. A rede usa um hub central com transit, firewall, DNS resolver, egress control e conectividade híbrida. Aplicações ficam em spokes privados, separados por ambiente e criticidade.</p>\n  <p>Para publicação de serviços, usuários externos chegam por DNS público, CDN, WAF e load balancer. Backends permanecem em subnets privadas. Serviços gerenciados são consumidos por Private Link, Private Endpoint, Interface Endpoint ou Private Service Connect, evitando tráfego desnecessário pela internet. Kubernetes usa subnets planejadas, CNI compatível, Ingress controlado, NetworkPolicy e observabilidade.</p>\n  <p>O datacenter se conecta por VPN ou link dedicado com BGP. Prefixos são filtrados, rotas são documentadas, tráfego sensível passa por inspeção e DNS híbrido resolve nomes privados de forma controlada. Logs são enviados para conta central de logs e SIEM. Mudanças são feitas por IaC e pipeline, com validação de políticas antes do deploy.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Camada</th><th>Decisão arquitetural</th><th>Risco reduzido</th></tr></thead>\n    <tbody>\n      <tr><td>Organização</td><td>Contas separadas por função e ambiente.</td><td>Blast radius administrativo.</td></tr>\n      <tr><td>Rede</td><td>Hub-spoke com rotas explícitas.</td><td>Malha caótica e transitividade acidental.</td></tr>\n      <tr><td>Exposição</td><td>CDN/WAF/LB na borda e backend privado.</td><td>Servidor diretamente exposto.</td></tr>\n      <tr><td>Serviços gerenciados</td><td>Private endpoints e DNS privado.</td><td>Egress desnecessário e bypass de controle.</td></tr>\n      <tr><td>Operação</td><td>Logs centralizados, alertas e runbooks.</td><td>Incidente sem evidência.</td></tr>\n      <tr><td>DevSecOps</td><td>IaC, policy as code e revisão.</td><td>Drift e mudanças manuais inseguras.</td></tr>\n    </tbody>\n  </table>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em uma cloud corporativa como uma cidade planejada. Uma cidade improvisada cresce com ruas sem nome, postes sem cadastro, prédios sem alvará, caminhos duplicados e serviços públicos sobrecarregados. No começo parece rápido; depois ambulância, polícia, manutenção e auditoria não conseguem operar.</p>\n  <p>A Landing Zone é o plano diretor. O hub de rede é o sistema viário principal. As spokes são bairros com funções diferentes. O DNS é a sinalização. As rotas são as ruas. Firewalls e WAFs são postos de controle. Private endpoints são túneis privados para serviços essenciais. Logs são câmeras, registros e ocorrências. IaC é o processo formal de obra. FinOps é o orçamento público. O SOC é a central de monitoramento.</p>\n  <p>Uma cidade segura não impede circulação; ela organiza circulação. Da mesma forma, uma arquitetura cloud segura não deve bloquear a empresa. Ela deve permitir que times entreguem serviços por caminhos previsíveis, monitorados e aprovados.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Imagine uma pequena aplicação web com três partes: frontend, API e banco. O desenho ruim seria colocar tudo em uma VM pública, liberar portas amplas e acessar o banco por endpoint público. O desenho correto, mesmo em pequena escala, já aplica os fundamentos:</p>\n  <ul>\n    <li>DNS público aponta para um load balancer HTTPS.</li>\n    <li>O load balancer recebe TLS e encaminha apenas para backends saudáveis.</li>\n    <li>A API fica em subnet privada.</li>\n    <li>O banco gerenciado é acessado por endpoint privado.</li>\n    <li>Security groups permitem apenas fluxos necessários.</li>\n    <li>Logs de load balancer, flow logs, DNS e auditoria são enviados para retenção.</li>\n    <li>Alterações são feitas por IaC, não manualmente no console.</li>\n  </ul>\n  <p>Mesmo simples, esse desenho já ensina uma regra profissional: <strong>exponha a borda, não exponha o coração da aplicação</strong>.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Agora pense em uma empresa com matriz, filiais, usuários remotos, SOC, times de produto, time de dados, aplicações legadas, aplicações cloud-native e auditoria. A arquitetura empresarial precisa separar produção, não produção, segurança, logs, conectividade e sandbox.</p>\n  <p>O hub central recebe conectividade do datacenter via VPN ou link dedicado com BGP. Spokes de produção hospedam aplicações críticas em subnets privadas. Spokes de desenvolvimento têm menor criticidade, mas ainda seguem guardrails. O ambiente de dados acessa serviços gerenciados por private endpoints. A conta de segurança coleta eventos. A conta de logs armazena evidências com retenção definida. A governança bloqueia regiões não autorizadas, IP público indevido e recursos sem tag.</p>\n  <p>O resultado é uma empresa capaz de crescer sem redes virarem exceções incontroláveis. Cada novo workload consome um padrão: CIDR aprovado, subnets padrão, rotas, DNS, logs, SG/NSG, private endpoints, pipeline e documentação.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em AWS, a arquitetura poderia usar AWS Organizations, contas separadas, VPCs em spokes, Transit Gateway, AWS Network Firewall, Route 53 Resolver, PrivateLink, VPC Flow Logs, CloudTrail, ALB, WAF, EKS e tags obrigatórias. Em Azure, poderia usar Management Groups, subscriptions, hub-spoke ou Virtual WAN, Azure Firewall, Private DNS Zones, Private Link, NSG Flow Logs ou Virtual Network Flow Logs, Activity Logs, Application Gateway, AKS e Azure Policy. Em Google Cloud, poderia usar Organization, folders, projects, Shared VPC, Cloud Router, Cloud VPN/Interconnect, Cloud DNS, Private Service Connect, VPC Flow Logs, Cloud Audit Logs, Cloud Load Balancing, GKE e Organization Policy.</p>\n  <p>Os nomes mudam, mas o desenho lógico permanece: organização, identidade, rede, borda, privacidade, conectividade híbrida, observabilidade, governança e automação. O aluno deve treinar a enxergar equivalências entre provedores sem confundir equivalência conceitual com igualdade de implementação.</p>\n  <div class=\"callout callout--info\"><strong>Regra de arquitetura:</strong> não projete “para AWS”, “para Azure” ou “para GCP” como se os fundamentos fossem diferentes. Projete os fundamentos e depois traduza para os serviços, limites e custos do provedor escolhido.</div>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>No modelo DevSecOps, a arquitetura final vira código e processo. O time de plataforma mantém módulos aprovados para VPC/VNet, subnets, route tables, firewall, private endpoints, load balancer, DNS, logs e Kubernetes. O time de aplicação consome esses módulos por catálogo ou repositório. O pipeline valida políticas antes de aplicar mudanças.</p>\n  <p>Exemplos de controles no pipeline:</p>\n  <ul>\n    <li>Bloquear subnet pública não justificada.</li>\n    <li>Bloquear regra `0.0.0.0/0` para portas administrativas.</li>\n    <li>Exigir flow logs em redes de produção.</li>\n    <li>Exigir tags de dono, ambiente, criticidade e centro de custo.</li>\n    <li>Exigir private endpoint para bancos e storage sensíveis.</li>\n    <li>Validar CIDR contra IPAM antes de criar nova rede.</li>\n    <li>Exigir revisão de segurança para mudanças em transit, firewall, WAF ou DNS público.</li>\n  </ul>\n  <p>DevSecOps não substitui arquitetura. Ele transforma arquitetura em trilhos executáveis, repetíveis e auditáveis.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-segurança\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Do ponto de vista de Segurança da Informação, o projeto final deve ser avaliado como uma superfície de ataque. Pergunte: quais nomes públicos existem? Quais serviços aceitam tráfego externo? Quais caminhos permitem movimento lateral? Quais workloads têm egress livre? Quais identidades podem alterar rotas, DNS, firewall e logs? Quais logs seriam necessários se um incidente ocorresse hoje?</p>\n  <p>Boas práticas defensivas incluem:</p>\n  <ul>\n    <li>Minimizar exposição pública e usar WAF/CDN/LB como borda controlada.</li>\n    <li>Manter workloads e bancos em subnets privadas.</li>\n    <li>Usar private endpoints para serviços gerenciados sensíveis.</li>\n    <li>Aplicar menor privilégio em IAM, SG/NSG, firewall e policies.</li>\n    <li>Registrar mudanças administrativas em trilha de auditoria.</li>\n    <li>Enviar logs para destino central com proteção contra alteração.</li>\n    <li>Definir alertas para criação de IP público, alteração de rota, DNS público novo, SG permissivo e queda de logs.</li>\n  </ul>\n  <p>Más práticas incluem confiar apenas em “rede privada”, não revisar DNS, não controlar egress, não filtrar BGP, manter logs desligados para economizar e tratar exceção temporária como permanente.</p>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama abaixo representa o projeto final do Módulo 14: uma arquitetura cloud corporativa com usuários, edge, publicação segura, hub de conectividade, spokes de aplicação, serviços privados, Kubernetes, datacenter, observabilidade, governança e processo de exceção.</p>\n\n  <div class=\"svg-lab-wrapper\" role=\"img\" aria-label=\"Arquitetura cloud segura, híbrida e observável com landing zone, hub, spokes, datacenter e observabilidade\">\n    <svg class=\"network-svg cloud-capstone-svg\" viewBox=\"0 0 1180 720\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-14-14-content-diagram-1-title svg-14-14-content-diagram-1-desc\">\n      <title id=\"svg-14-14-content-diagram-1-title\">Projeto final: arquitetura cloud segura, híbrida e observável</title>\n      <desc id=\"svg-14-14-content-diagram-1-desc\">Diagrama pedagógico da aula 14.14, Projeto final: arquitetura cloud segura, híbrida e observável, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1414\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow-head\"></path>\n        </marker>\n        <filter id=\"shadow1414\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n          <feDropShadow dx=\"0\" dy=\"3\" stdDeviation=\"3\" flood-opacity=\"0.25\"></feDropShadow>\n        </filter>\n      </defs>\n\n      <rect x=\"20\" y=\"20\" width=\"1140\" height=\"680\" rx=\"24\" class=\"svg-bg\"></rect>\n      <text x=\"590\" y=\"55\" text-anchor=\"middle\" class=\"svg-title\">Projeto final: arquitetura cloud segura, híbrida e observável</text>\n\n      <g class=\"svg-zone svg-zone-users\" filter=\"url(#shadow1414)\">\n        <rect x=\"55\" y=\"110\" width=\"190\" height=\"160\" rx=\"18\" class=\"svg-box\"></rect>\n        <text x=\"150\" y=\"140\" text-anchor=\"middle\" class=\"svg-label\">Usuários e clientes</text>\n        <circle cx=\"105\" cy=\"185\" r=\"22\" class=\"svg-node\"></circle>\n        <circle cx=\"160\" cy=\"185\" r=\"22\" class=\"svg-node\"></circle>\n        <circle cx=\"215\" cy=\"185\" r=\"22\" class=\"svg-node\"></circle>\n        <text x=\"150\" y=\"235\" text-anchor=\"middle\" class=\"svg-small\">Internet, VPN, parceiros</text>\n      </g>\n\n      <g class=\"svg-zone svg-zone-edge\" filter=\"url(#shadow1414)\">\n        <rect x=\"295\" y=\"95\" width=\"210\" height=\"190\" rx=\"18\" class=\"svg-box svg-box-accent\"></rect>\n        <text x=\"400\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Edge seguro</text>\n        <rect x=\"325\" y=\"155\" width=\"150\" height=\"34\" rx=\"8\" class=\"svg-pill\"></rect>\n        <text x=\"400\" y=\"177\" text-anchor=\"middle\" class=\"svg-small\">DNS público</text>\n        <rect x=\"325\" y=\"200\" width=\"150\" height=\"34\" rx=\"8\" class=\"svg-pill\"></rect>\n        <text x=\"400\" y=\"222\" text-anchor=\"middle\" class=\"svg-small\">CDN + WAF</text>\n        <rect x=\"325\" y=\"245\" width=\"150\" height=\"34\" rx=\"8\" class=\"svg-pill\"></rect>\n        <text x=\"400\" y=\"267\" text-anchor=\"middle\" class=\"svg-small\">TLS + LB</text>\n      </g>\n\n      <g class=\"svg-zone svg-zone-org\" filter=\"url(#shadow1414)\">\n        <rect x=\"560\" y=\"80\" width=\"565\" height=\"250\" rx=\"22\" class=\"svg-cloud\"></rect>\n        <text x=\"842\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Landing Zone corporativa</text>\n        <rect x=\"595\" y=\"140\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-box\"></rect>\n        <text x=\"670\" y=\"166\" text-anchor=\"middle\" class=\"svg-small\">Conta de</text>\n        <text x=\"670\" y=\"188\" text-anchor=\"middle\" class=\"svg-small\">Segurança</text>\n        <rect x=\"775\" y=\"140\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-box\"></rect>\n        <text x=\"850\" y=\"166\" text-anchor=\"middle\" class=\"svg-small\">Conta de</text>\n        <text x=\"850\" y=\"188\" text-anchor=\"middle\" class=\"svg-small\">Logs</text>\n        <rect x=\"955\" y=\"140\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-box\"></rect>\n        <text x=\"1025\" y=\"166\" text-anchor=\"middle\" class=\"svg-small\">Governança</text>\n        <text x=\"1025\" y=\"188\" text-anchor=\"middle\" class=\"svg-small\">Policy/IAM</text>\n        <rect x=\"640\" y=\"235\" width=\"380\" height=\"64\" rx=\"14\" class=\"svg-box svg-box-accent\"></rect>\n        <text x=\"830\" y=\"262\" text-anchor=\"middle\" class=\"svg-small\">Guardrails: regiões, IP público, logs, tags, egress, private endpoints</text>\n        <text x=\"830\" y=\"284\" text-anchor=\"middle\" class=\"svg-small\">Mudanças por IaC + pipeline + revisão + evidência</text>\n      </g>\n\n      <g class=\"svg-zone svg-zone-network\" filter=\"url(#shadow1414)\">\n        <rect x=\"55\" y=\"355\" width=\"300\" height=\"245\" rx=\"20\" class=\"svg-box svg-box-accent\"></rect>\n        <text x=\"205\" y=\"386\" text-anchor=\"middle\" class=\"svg-label\">Datacenter / filial</text>\n        <rect x=\"90\" y=\"420\" width=\"90\" height=\"44\" rx=\"10\" class=\"svg-pill\"></rect>\n        <text x=\"135\" y=\"448\" text-anchor=\"middle\" class=\"svg-small\">Firewall</text>\n        <rect x=\"215\" y=\"420\" width=\"100\" height=\"44\" rx=\"10\" class=\"svg-pill\"></rect>\n        <text x=\"265\" y=\"448\" text-anchor=\"middle\" class=\"svg-small\">DNS interno</text>\n        <rect x=\"90\" y=\"495\" width=\"225\" height=\"50\" rx=\"12\" class=\"svg-box\"></rect>\n        <text x=\"202\" y=\"526\" text-anchor=\"middle\" class=\"svg-small\">VPN / link dedicado + BGP</text>\n      </g>\n\n      <g class=\"svg-zone svg-zone-hub\" filter=\"url(#shadow1414)\">\n        <rect x=\"420\" y=\"365\" width=\"260\" height=\"245\" rx=\"20\" class=\"svg-box svg-box-danger\"></rect>\n        <text x=\"550\" y=\"395\" text-anchor=\"middle\" class=\"svg-label\">Hub de rede e segurança</text>\n        <rect x=\"455\" y=\"430\" width=\"190\" height=\"36\" rx=\"9\" class=\"svg-pill\"></rect>\n        <text x=\"550\" y=\"453\" text-anchor=\"middle\" class=\"svg-small\">Transit / Virtual WAN</text>\n        <rect x=\"455\" y=\"480\" width=\"190\" height=\"36\" rx=\"9\" class=\"svg-pill\"></rect>\n        <text x=\"550\" y=\"503\" text-anchor=\"middle\" class=\"svg-small\">Cloud Firewall / NVA</text>\n        <rect x=\"455\" y=\"530\" width=\"190\" height=\"36\" rx=\"9\" class=\"svg-pill\"></rect>\n        <text x=\"550\" y=\"553\" text-anchor=\"middle\" class=\"svg-small\">DNS privado + egress</text>\n      </g>\n\n      <g class=\"svg-zone svg-zone-spokes\" filter=\"url(#shadow1414)\">\n        <rect x=\"735\" y=\"365\" width=\"390\" height=\"245\" rx=\"20\" class=\"svg-box\"></rect>\n        <text x=\"930\" y=\"395\" text-anchor=\"middle\" class=\"svg-label\">Spokes de workload</text>\n        <rect x=\"765\" y=\"430\" width=\"105\" height=\"95\" rx=\"12\" class=\"svg-box svg-box-accent\"></rect>\n        <text x=\"817\" y=\"457\" text-anchor=\"middle\" class=\"svg-small\">App web</text>\n        <text x=\"817\" y=\"481\" text-anchor=\"middle\" class=\"svg-tiny\">subnets</text>\n        <text x=\"817\" y=\"501\" text-anchor=\"middle\" class=\"svg-tiny\">privadas</text>\n        <rect x=\"895\" y=\"430\" width=\"105\" height=\"95\" rx=\"12\" class=\"svg-box svg-box-accent\"></rect>\n        <text x=\"947\" y=\"457\" text-anchor=\"middle\" class=\"svg-small\">Kubernetes</text>\n        <text x=\"947\" y=\"481\" text-anchor=\"middle\" class=\"svg-tiny\">CNI</text>\n        <text x=\"947\" y=\"501\" text-anchor=\"middle\" class=\"svg-tiny\">Ingress</text>\n        <rect x=\"1025\" y=\"430\" width=\"75\" height=\"95\" rx=\"12\" class=\"svg-box svg-box-accent\"></rect>\n        <text x=\"1062\" y=\"457\" text-anchor=\"middle\" class=\"svg-small\">Dados</text>\n        <text x=\"1062\" y=\"481\" text-anchor=\"middle\" class=\"svg-tiny\">DB</text>\n        <text x=\"1062\" y=\"501\" text-anchor=\"middle\" class=\"svg-tiny\">privado</text>\n        <rect x=\"805\" y=\"545\" width=\"255\" height=\"42\" rx=\"11\" class=\"svg-pill\"></rect>\n        <text x=\"932\" y=\"572\" text-anchor=\"middle\" class=\"svg-small\">Private endpoints + serviços gerenciados</text>\n      </g>\n\n      <g class=\"svg-zone svg-zone-obs\" filter=\"url(#shadow1414)\">\n        <rect x=\"745\" y=\"630\" width=\"380\" height=\"45\" rx=\"14\" class=\"svg-box svg-box-accent\"></rect>\n        <text x=\"935\" y=\"658\" text-anchor=\"middle\" class=\"svg-small\">Flow logs, DNS logs, LB/WAF logs, auditoria, SIEM, métricas e billing</text>\n      </g>\n\n      <path d=\"M245 190 C270 190 270 190 295 190\" class=\"svg-link\" marker-end=\"url(#arrow1414)\"></path>\n      <path d=\"M505 190 C535 190 535 190 560 190\" class=\"svg-link\" marker-end=\"url(#arrow1414)\"></path>\n      <path d=\"M355 505 C385 505 390 505 420 505\" class=\"svg-link\" marker-end=\"url(#arrow1414)\"></path>\n      <path d=\"M680 490 C705 490 710 490 735 490\" class=\"svg-link\" marker-end=\"url(#arrow1414)\"></path>\n      <path d=\"M930 610 L930 630\" class=\"svg-link svg-link-dashed\" marker-end=\"url(#arrow1414)\"></path>\n      <path d=\"M550 610 C610 650 680 650 745 650\" class=\"svg-link svg-link-dashed\" marker-end=\"url(#arrow1414)\"></path>\n      <path d=\"M850 330 C850 345 850 350 850 365\" class=\"svg-link svg-link-dashed\" marker-end=\"url(#arrow1414)\"></path>\n      <path d=\"M550 365 C610 330 690 310 775 270\" class=\"svg-link svg-link-dashed\" marker-end=\"url(#arrow1414)\"></path>\n\n      <text x=\"277\" y=\"178\" text-anchor=\"middle\" class=\"svg-tiny\">HTTPS</text>\n      <text x=\"532\" y=\"178\" text-anchor=\"middle\" class=\"svg-tiny\">origem privada</text>\n      <text x=\"388\" y=\"492\" text-anchor=\"middle\" class=\"svg-tiny\">BGP</text>\n      <text x=\"707\" y=\"476\" text-anchor=\"middle\" class=\"svg-tiny\">rotas</text>\n      <text x=\"694\" y=\"638\" text-anchor=\"middle\" class=\"svg-tiny\">evidências</text>\n    </svg>\n  </div>\n\n  <p>Leia o diagrama de fora para dentro: usuários chegam por DNS, CDN/WAF e load balancer; workloads ficam em spokes privados; tráfego híbrido passa pelo hub; serviços gerenciados são consumidos por endpoints privados; logs e auditoria são enviados para uma camada central; e governança controla criação, exceções e mudanças.</p>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratório\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é um projeto final sem provisionamento pago. Você criará os artefatos de arquitetura que um time profissional entregaria antes de construir a cloud: requisitos, diagrama, matriz de fluxos, plano CIDR, tabela de rotas, modelo de publicação, plano DNS, plano de private endpoints, conectividade híbrida, observabilidade, custos, guardrails e runbooks.</p>\n  <p>O foco não é “clicar em serviços”. O foco é demonstrar raciocínio arquitetural. Ao final, você deve conseguir defender por que cada caminho existe, por que cada bloqueio existe, que evidência será coletada e qual risco residual permanece.</p>\n\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercícios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam decisões de arquitetura. Eles pedem justificativas, não respostas decoradas. Sempre explique o problema, a decisão, o risco reduzido, o impacto operacional e o custo aproximado da escolha.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio é produzir uma proposta completa de arquitetura cloud segura, híbrida e observável para uma empresa fictícia. Você deve apresentar a solução como se fosse defender para Segurança, Plataforma, Infraestrutura, FinOps e uma equipe de produto.</p>\n\n\n<div class=\"callout callout--mentor\"><strong>Critério de conclusão revisado:</strong> o capstone agora é avaliado como uma defesa técnica. Você não será avaliado por citar muitos serviços, mas por demonstrar coerência entre requisitos, desenho, fluxos, controles, custos, logs, rollback e riscos residuais.</div>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solução-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra uma referência de arquitetura, mas não é a única resposta possível. O mais importante é que suas decisões sejam coerentes, rastreáveis e alinhadas aos requisitos. Uma arquitetura profissional é menos sobre “usar todos os serviços” e mais sobre justificar o caminho mais seguro, operável e sustentável.</p>\n\n\n<table class=\"comparison-table\"><thead><tr><th>Competência</th><th>Evidência mínima</th><th>Erro crítico</th></tr></thead><tbody><tr><td>Endereçamento e rotas</td><td>CIDR sem sobreposição, subnets por função e rotas efetivas.</td><td>Conflito com datacenter ou ausência de rota de retorno.</td></tr><tr><td>Publicação segura</td><td>CDN/WAF/LB/TLS/health checks e origem privada.</td><td>Servidor crítico exposto diretamente.</td></tr><tr><td>Acesso privado</td><td>Private endpoints, DNS privado e IAM separados.</td><td>Confundir IP privado com autorização.</td></tr><tr><td>Kubernetes</td><td>CNI/IPAM, Services, Ingress/Gateway, NetworkPolicy e egress.</td><td>Cluster sem isolamento ou egress sem controle.</td></tr><tr><td>Observabilidade</td><td>Logs, métricas, auditoria, billing e runbooks.</td><td>Sem evidência para investigar incidente.</td></tr><tr><td>FinOps</td><td>Estimativa, tags, budgets, limpeza e recursos órfãos.</td><td>Proposta sem custo ou sem limpeza.</td></tr></tbody></table>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>O projeto final do Módulo 14 consolida Cloud Networking como disciplina de arquitetura. Você aprendeu que rede cloud não é apenas VPC/VNet e subnet: é o conjunto de endereçamento, rotas, DNS, firewalls, load balancers, private endpoints, conectividade híbrida, Kubernetes, observabilidade, custos, governança e automação.</p>\n  <p>Uma arquitetura segura, híbrida e observável minimiza exposição pública, usa private endpoints quando adequado, centraliza inspeção onde faz sentido, documenta fluxos, controla egress, coleta logs, permite troubleshooting, respeita custos e é criada por pipeline. Ela não elimina todos os riscos; ela torna riscos explícitos, monitorados e governáveis.</p>\n  <p>Ao concluir esta aula, você está pronto para avançar para troubleshooting profissional no Módulo 15, onde as arquiteturas deixarão de ser apenas desenhos e passarão a ser investigadas quando algo falhar.</p>\n\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--próximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>No próximo módulo, você entrará em <strong>Troubleshooting de Redes</strong>. A primeira aula será <strong>15.1 — Mentalidade de troubleshooting profissional</strong>. Revise especialmente os módulos de IPv4, DNS, TCP/UDP, firewalls, VPN, Segurança de Redes e Cloud Networking, porque troubleshooting profissional depende de fundamentos e evidências.</p>\n\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 5",
      "Camada 6",
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
      "HTTP",
      "HTTPS",
      "BGP",
      "IPsec",
      "ICMP"
    ],
    "dependsOn": [
      "CIDR",
      "subnets",
      "VPC/VNet",
      "route tables",
      "NAT",
      "firewalls",
      "DNS público",
      "DNS privado",
      "load balancer",
      "Private Link",
      "VPN",
      "BGP",
      "Kubernetes CNI",
      "flow logs",
      "IAM",
      "IaC"
    ],
    "enables": [
      "arquitetura cloud corporativa",
      "landing zone madura",
      "troubleshooting cloud",
      "governança de rede",
      "segurança em profundidade",
      "FinOps de rede",
      "operação híbrida"
    ]
  },
  "lab": {
    "id": "lab-14.14",
    "title": "Projeto final do Módulo 14: desenhar uma arquitetura cloud segura, híbrida e observável",
    "labType": "cloud-simulavel",
    "objective": "Produzir uma proposta completa de arquitetura cloud para uma empresa híbrida, incluindo desenho, fluxos, controles, logs, custos, validação e riscos residuais, sem provisionar recursos pagos.",
    "scenario": "15. Laboratório O laboratório desta aula é um projeto final sem provisionamento pago. Você criará os artefatos de arquitetura que um time profissional entregaria antes de construir a cloud: requisitos, diagrama, matriz de fluxos, plano CIDR, tabela de rotas, modelo de publicação, plano DNS, plano de private endpoints, conectividade híbrida, observabilidade, custos, guardrails e runbooks. O foco não é “clicar em serviços”. O foco é demonstrar raciocínio arquitetural. Ao final, você deve conseguir defender por que cada caminho existe, por que cada bloqueio existe, que evidência será coletada e qual risco residual permanece.",
    "topology": "Empresa com datacenter, duas filiais, usuários remotos, aplicação web pública, APIs privadas, banco gerenciado, cluster Kubernetes, ambiente de dados, serviços gerenciados, equipe SOC, pipeline DevSecOps e requisitos de auditoria.",
    "architecture": "Landing Zone com contas ou subscriptions separadas; hub de conectividade e segurança; spokes de produção, não produção, dados e Kubernetes; DNS público e privado; Private Link/Private Endpoint; VPN ou link dedicado com BGP; WAF/CDN/LB para publicação; logs centralizados; políticas e módulos IaC.",
    "prerequisites": [
      "Não provisionar recursos reais nem gerar custo cloud.",
      "Definir pelo menos quatro zonas de rede: borda pública, aplicação privada, dados privados e gerenciamento/observabilidade.",
      "Definir plano CIDR sem sobreposição com datacenter e com reserva de crescimento.",
      "Criar matriz de fluxos com origem, destino, porta, protocolo, justificativa e controle aplicável.",
      "Definir modelo de DNS público, DNS privado e split-horizon.",
      "Definir pelo menos três serviços gerenciados acessados privadamente.",
      "Definir conectividade híbrida com rotas, BGP, filtros e failover.",
      "Definir logs mínimos obrigatórios e consultas de investigação.",
      "Definir custos relevantes e controles FinOps.",
      "Definir guardrails, processo de exceção e critérios de aceite."
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Ambiente Kubernetes local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "210-300 min",
    "cost": "zero na execução simulada/local; potencialmente pago se reproduzido em cloud real. Só provisionar em conta de laboratório autorizada, com orçamento, tags e limpeza obrigatória.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Levantar requisitos de negócio, segurança e operação",
        "instruction": "Escreva o cenário da empresa, sistemas críticos, requisitos de disponibilidade, latência, compliance, auditoria, conectividade híbrida, times envolvidos e restrições de custo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Documento de requisitos com prioridades e restrições explícitas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Desenhar estrutura da Landing Zone",
        "instruction": "Defina contas, subscriptions ou projetos para organização, segurança, logs, conectividade, produção, não produção, dados e sandbox.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mapa organizacional cloud com donos, finalidade e limites administrativos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Planejar IPAM, VPC/VNet e subnets",
        "instruction": "Defina blocos CIDR por região, ambiente e spoke. Separe subnets públicas, privadas, dados, endpoints, Kubernetes e gerenciamento quando necessário.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de endereçamento com reservas e justificativa para crescimento.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Construir matriz de fluxos",
        "instruction": "Liste fluxos norte-sul, leste-oeste, híbridos, administrativos, de dados, observabilidade e egress. Para cada fluxo, documente porta, protocolo, origem, destino, controle e justificativa.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz de fluxos aprovada como base para rotas, firewall, SG/NSG, WAF e IAM.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Desenhar publicação segura de serviços",
        "instruction": "Defina DNS público, CDN/WAF, load balancer, TLS, health checks, backends privados e logs de acesso para a aplicação web.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Fluxo de publicação seguro com borda controlada e workloads privados.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Projetar DNS público, privado e service discovery",
        "instruction": "Defina zonas públicas, zonas privadas, split-horizon, resolução híbrida, registros para private endpoints e service discovery em Kubernetes.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Modelo DNS com nomes, zonas, resolvers, encaminhamento e TTLs.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Projetar conectividade híbrida",
        "instruction": "Defina VPN ou link dedicado, túneis redundantes, ASN, BGP, prefixos permitidos, filtros, rotas propagadas e comportamento de failover.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Desenho híbrido com rotas documentadas e controles contra anúncios amplos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Projetar acesso privado a serviços gerenciados",
        "instruction": "Escolha serviços gerenciados sensíveis e defina Private Link, Private Endpoint, Interface Endpoint ou Private Service Connect, incluindo DNS privado, políticas e logs.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de endpoints privados com consumer, producer, subnets, permissões e resolução de nomes.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Projetar Kubernetes Networking",
        "instruction": "Defina subnets para nodes/pods/services, CNI, Ingress, Service LoadBalancer, NetworkPolicy, DNS interno, egress e acesso a serviços privados.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Desenho do cluster com integração à rede cloud e controles de segurança.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Definir observabilidade e auditoria",
        "instruction": "Liste flow logs, DNS logs, firewall logs, WAF/LB logs, trilha de auditoria, logs de Kubernetes, métricas, billing e consultas de investigação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de observabilidade com fontes, destino, retenção, alertas e responsáveis.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Definir guardrails e DevSecOps",
        "instruction": "Crie políticas para regiões, IP público, portas administrativas, tags, logs, encryption, private endpoints, egress e alterações de rota/DNS/firewall. Associe cada política a pipeline, IaC ou monitoramento.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Catálogo de guardrails preventivos e detectivos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Criar plano de custos e riscos residuais",
        "instruction": "Liste componentes que geram custo recorrente: NAT, egress, transit, firewall, WAF, LB, logs, CDN, link dedicado, endpoints privados e SIEM. Documente riscos residuais aceitos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano FinOps de rede e matriz de riscos residuais.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: arquitetura cloud segura, híbrida e observável” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar matriz FinOps e limpeza obrigatória",
        "instruction": "Liste todos os componentes que poderiam gerar cobrança se este desenho fosse provisionado em cloud real. Separe custo fixo por hora, custo por GB, custo de tráfego, custo de logs e custo operacional humano.",
        "command": "Artefato: tabela custo-driver-owner-limpeza-evidência",
        "expectedOutput": "Tabela com NAT, endpoints privados, load balancers, firewalls, VPN/Interconnect/ExpressRoute/Direct Connect, peering, IPs públicos, logs e armazenamento de evidências.",
        "explanation": "Cloud Networking costuma parecer barato porque VPC/VNet e subnets podem não ter cobrança direta, mas os componentes conectados à rede frequentemente cobram por hora, por GB, por retenção ou por tráfego entre domínios."
      },
      {
        "number": 14,
        "title": "Validar runbook de rollback e evidências",
        "instruction": "Crie um rollback documentado para a mudança proposta e defina quais evidências precisam ser preservadas antes, durante e depois da alteração.",
        "command": "Artefato: runbook com gatilho, pré-checagens, execução, rollback, validação e evidências",
        "expectedOutput": "Runbook acionável por um operador que não participou do desenho original.",
        "explanation": "Arquitetura cloud profissional precisa ser reversível e auditável. Sem rollback e evidências, uma mudança correta no papel pode virar incidente prolongado em produção."
      },
      {
        "number": 15,
        "title": "Executar revisão final por rubrica C01-C10",
        "instruction": "Pontue sua arquitetura em cada critério do capstone e marque evidência objetiva para cada ponto concedido.",
        "artifact": "Tabela C01-C10 com pontuação, evidência, lacuna, risco e ação corretiva.",
        "expectedOutput": "Rubrica preenchida com nota final, itens reprovados e plano de melhoria priorizado.",
        "explanation": "O objetivo do capstone é demonstrar competência verificável, não apenas produzir um diagrama bonito."
      },
      {
        "number": 16,
        "title": "Fazer teste de falha e RCA simulado",
        "instruction": "Escolha uma falha controlada: DNS privado quebrado, rota de retorno ausente, NetworkPolicy bloqueando backend, endpoint privado sem policy ou log ausente. Documente sintomas, hipótese, evidência, correção e prevenção.",
        "artifact": "RCA: impacto, timeline, evidências, causa raiz, correção, prevenção e melhoria de monitoramento.",
        "expectedOutput": "RCA defensável com no mínimo cinco evidências e uma ação preventiva ligada ao desenho.",
        "explanation": "Arquitetura cloud profissional precisa ser diagnosticável quando falha. A prova é a evidência coletada durante o incidente simulado."
      }
    ],
    "expectedResult": "Pacote de arquitetura com diagrama, requisitos, plano CIDR, matriz de fluxos, matriz de rotas, modelo DNS, plano de segurança, desenho híbrido, desenho Kubernetes, plano de private endpoints, plano de logs, runbooks, custos, guardrails, exceções e riscos residuais.",
    "validation": [
      {
        "check": "Artefato principal produzido",
        "command": "Revisar tabela, diagrama ou saída coletada",
        "expected": "O artefato responde ao objetivo do laboratório.",
        "ifFails": "Volte aos passos e complete campos ausentes."
      },
      {
        "check": "Coerência técnica",
        "command": "Comparar com os conceitos da aula",
        "expected": "Não há contradições com endereçamento, rota, política, segurança ou fluxo.",
        "ifFails": "Revise hipóteses, cálculos, regras e dependências."
      },
      {
        "check": "Custo e limpeza documentados",
        "command": "Revisar tabela FinOps e checklist de limpeza",
        "expected": "Todos os recursos com cobrança recorrente ou variável foram identificados e possuem estratégia de remoção ou retenção justificada.",
        "ifFails": "Volte ao desenho e marque NAT, LB, firewall, VPN, endpoint privado, IP público, peering, inter-região e logs como possíveis fontes de custo."
      },
      {
        "check": "Capstone atinge nota mínima sem falhas críticas",
        "command": "Artefato: rubrica C01-C10 preenchida",
        "expected": "Nota >= 80/100 e nenhum critério crítico zerado.",
        "ifFails": "Refazer decisões de CIDR, rotas, DNS, segurança, observabilidade ou FinOps conforme lacuna."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Aplicação pública retorna 502 ou 503.",
        "probableCause": "Causa provável a confirmar com evidências.",
        "howToConfirm": "Coletar evidência indicada no laboratório.",
        "fix": "Aplicar correção controlada e validar novamente."
      },
      {
        "symptom": "Aplicação privada não acessa banco gerenciado.",
        "probableCause": "Causa provável a confirmar com evidências.",
        "howToConfirm": "Coletar evidência indicada no laboratório.",
        "fix": "Aplicar correção controlada e validar novamente."
      },
      {
        "symptom": "Datacenter não alcança spoke cloud.",
        "probableCause": "Causa provável a confirmar com evidências.",
        "howToConfirm": "Coletar evidência indicada no laboratório.",
        "fix": "Aplicar correção controlada e validar novamente."
      },
      {
        "symptom": "Custo de rede subiu inesperadamente.",
        "probableCause": "Causa provável a confirmar com evidências.",
        "howToConfirm": "Coletar evidência indicada no laboratório.",
        "fix": "Aplicar correção controlada e validar novamente."
      },
      {
        "symptom": "O desenho parece tecnicamente correto, mas o custo mensal estimado cresce sem explicação.",
        "probableCause": "Tráfego passando por NAT ou firewall central sem necessidade, logs com retenção exagerada, endpoints em múltiplas zonas sem uso, tráfego inter-região ou recursos órfãos.",
        "howToConfirm": "Cruzar matriz de fluxos com billing, flow logs, métricas de gateway, tags e inventário de recursos.",
        "fix": "Reduzir caminhos desnecessários, aplicar endpoints privados seletivos, ajustar amostragem/retenção de logs, remover recursos órfãos e criar budgets/alertas."
      },
      {
        "symptom": "Arquitetura parece segura, mas não é operável",
        "probableCause": "Faltam owner, runbook, logs, métricas, rollback, custos ou matriz de fluxos.",
        "howToConfirm": "Tentar responder a um incidente simulado usando apenas os artefatos do capstone.",
        "fix": "Adicionar telemetria, runbooks, owners, decisões rastreáveis e evidências de validação."
      }
    ],
    "improvements": [
      "Adicionar testes automatizados de arquitetura no pipeline.",
      "Criar catálogo self-service de spokes e private endpoints aprovados.",
      "Adicionar dashboards de latência, disponibilidade, flow logs e custos de rede.",
      "Integrar alertas de criação de IP público, DNS público e SG/NSG permissivo ao SOC.",
      "Criar simulações periódicas de falha de zona, túnel VPN, DNS privado e load balancer.",
      "Revisar trimestralmente CIDR, rotas, logs, exceções e custos.",
      "Transformar o desenho em IaC com validação estática, sem aplicar recursos reais por padrão.",
      "Adicionar policy as code para negar exposição pública, ausência de tags e ausência de logs críticos.",
      "Criar budget/alerta específico para ambiente de laboratório antes de qualquer execução cloud paga.",
      "Adicionar teste de regressão para DNS, rota, firewall, endpoint privado e logging após mudanças."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud",
      "Matriz de custos com pelo menos três drivers: hora, GB processado e retenção de logs.",
      "Checklist de limpeza de recursos com itens órfãos possíveis.",
      "Matriz de evidências: logs, métricas, comandos, owners e retenção.",
      "Registro de decisão explicando quando usar e quando não usar o serviço cloud proposto.",
      "Matriz de execução indicando se o lab foi feito em modo simulado, local ou cloud real autorizada.",
      "Tabela FinOps com componente, driver de custo, owner, tag, risco de cobrança e ação de limpeza.",
      "Checklist de limpeza obrigatória assinado no próprio relatório do aluno.",
      "Evidência de validação antes/depois sem dados sensíveis, tokens, IPs públicos reais ou nomes internos produtivos.",
      "Registro de risco residual e justificativa de aceitação ou mitigação."
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Projeto final: arquitetura cloud segura, híbrida e observável” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?",
      "Qual parte deste lab poderia gerar custo recorrente mesmo sem tráfego de usuário?",
      "Qual evidência prova que a conectividade funciona sem confundir rede com autorização IAM?",
      "Qual recurso precisa ser destruído primeiro para evitar dependências órfãs?",
      "Qual log permite investigar falha de rede e qual log permite investigar alteração administrativa?"
    ],
    "challenge": "Defender uma arquitetura cloud segura, híbrida e observável para produção",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "costReview": {
      "type": "FinOps obrigatório",
      "estimateRequired": true,
      "costDrivers": [
        "hora de recurso gerenciado",
        "GB processado",
        "tráfego entre zonas ou regiões",
        "tráfego de saída para internet",
        "armazenamento e ingestão de logs",
        "IP público, load balancer, VPN, firewall e endpoints privados"
      ],
      "zeroCostAlternative": "Executar o laboratório como desenho arquitetural, tabela de decisão, simulação local ou revisão de IaC sem aplicar recursos reais."
    },
    "cleanupPlan": [
      "Exportar evidências mínimas antes da destruição: diagrama, matriz de fluxos, logs sintéticos, prints sanitizados e decisão técnica.",
      "Remover workloads de teste, services, ingress, endpoints privados, load balancers, NAT/firewall/VPN, rotas temporárias e zonas DNS privadas criadas para o lab.",
      "Remover IPs públicos, regras temporárias, secrets de teste, discos/volumes, buckets de logs temporários e recursos órfãos cobrados por hora ou por GB.",
      "Executar validação pós-limpeza no console de billing/cost management e registrar que não restaram recursos pagos do laboratório.",
      "Manter apenas artefatos sanitizados necessários para estudo ou auditoria, respeitando retenção definida."
    ],
    "optionalCloudExecution": {
      "enabled": true,
      "defaultMode": "simulado/local sem provisionamento",
      "allowedOnlyWhen": [
        "Conta cloud de laboratório autorizada.",
        "Budget/alerta configurado antes da execução.",
        "Tags de owner, ambiente e data de expiração definidas.",
        "Plano de rollback e limpeza aprovado.",
        "Nenhum dado sensível real usado no laboratório."
      ],
      "cleanupIsMandatory": true
    },
    "zeroCostAlternative": "Executar todo o capstone como arquitetura, IaC não aplicado, datasets sintéticos e validação por matriz de evidências.",
    "estimatedCostDrivers": [
      "recursos cobrados por hora, como NAT Gateway, VPN Gateway, firewall gerenciado, load balancer e endpoints privados",
      "processamento por GB em endpoints, NAT, firewall, load balancer e logs",
      "tráfego entre zonas, regiões, internet, peering, VPN e links dedicados",
      "armazenamento, retenção, consulta e ingestão de logs",
      "custo operacional humano de manter exceções, rotas, DNS, certificados e runbooks"
    ],
    "cloudValidationProfile": {
      "lesson": "14.14",
      "scope": "Capstone Cloud Networking final",
      "simulationMode": "projeto completo com artefatos, rubrica e validação por evidências",
      "optionalRealCloudMode": "somente prova de conceito mínima e efêmera em conta de laboratório, com destruição obrigatória",
      "requiredArtifacts": [
        "diagrama",
        "CIDR/subnets/rotas/DNS",
        "matriz de fluxos",
        "Kubernetes networking",
        "private endpoints",
        "observabilidade",
        "FinOps/limpeza",
        "RCA e rollback"
      ],
      "passCriteria": [
        "rubrica mínima 80/100",
        "sem exposição indevida",
        "sem CIDR sobreposto",
        "com custos e limpeza",
        "com logs e troubleshooting"
      ]
    }
  },
  "exercises": [
    {
      "question": "Explique por que uma arquitetura cloud final deve começar por requisitos e fluxos, e não pela escolha de serviços específicos.",
      "expectedAnswer": "Porque requisitos e fluxos definem o problema real. Serviços são implementações. Começar por serviços pode gerar desenho inconsistente, caro ou inseguro."
    },
    {
      "question": "Monte uma matriz de fluxo mínima para uma aplicação web com frontend público, API privada, banco gerenciado privado e integração com datacenter.",
      "expectedAnswer": "A matriz deve incluir usuário para WAF/LB em HTTPS, LB para API em porta definida, API para banco via endpoint privado, API para datacenter por hub/VPN/BGP, logs para SIEM e tráfego administrativo restrito."
    },
    {
      "question": "Compare NAT Gateway e Private Endpoint como soluções de acesso a serviços externos ou gerenciados.",
      "expectedAnswer": "NAT permite saída geral para endereços externos, mas pode gerar custo e menor controle. Private Endpoint cria caminho privado orientado a serviço, reduz exposição e melhora governança, mas exige DNS, políticas e desenho específico."
    },
    {
      "question": "Liste cinco evidências que você exigiria antes de aprovar produção nessa arquitetura.",
      "expectedAnswer": "Plano CIDR sem sobreposição, matriz de fluxos aprovada, logs obrigatórios funcionando, SG/NSG/firewall revisados, DNS privado validado, health checks saudáveis, guardrails aplicados e plano de rollback/runbook."
    },
    {
      "id": "ex14.14.p1.1",
      "type": "avaliação",
      "prompt": "Revise sua própria arquitetura usando a rubrica C01–C10 e escreva três melhorias obrigatórias.",
      "expectedAnswer": "A resposta deve pontuar cada competência, justificar pontos perdidos e priorizar melhorias por risco operacional, segurança e custo.",
      "explanation": "Autoavaliação com rubrica transforma o capstone em portfólio técnico, não apenas desenho."
    }
  ],
  "quiz": [
    {
      "question": "Qual é o principal objetivo do projeto final do Módulo 14?",
      "options": [
        "Decorar nomes de serviços cloud",
        "Juntar todos os conceitos de Cloud Networking em uma arquitetura segura, híbrida e observável",
        "Substituir firewalls por DNS privado",
        "Criar uma VPC pública simples"
      ],
      "correctIndex": 1,
      "explanation": "O projeto final consolida rede, segurança, cloud, DevSecOps, observabilidade, governança e custos."
    },
    {
      "question": "Qual artefato ajuda a transformar requisitos em regras de rede?",
      "options": [
        "Matriz de fluxos",
        "Tema escuro da interface",
        "Nome do provedor cloud",
        "Número de commits no repositório"
      ],
      "correctIndex": 0,
      "explanation": "A matriz de fluxos indica origem, destino, porta, protocolo, justificativa e controle."
    },
    {
      "question": "Por que backends de aplicações públicas devem ficar privados sempre que possível?",
      "options": [
        "Porque subnets privadas eliminam necessidade de logs",
        "Porque reduz superfície pública e força exposição controlada por borda, LB, WAF e regras específicas",
        "Porque impede qualquer ataque automaticamente",
        "Porque Private Link substitui TLS"
      ],
      "correctIndex": 1,
      "explanation": "Backends privados reduzem exposição direta, mas ainda exigem controles e logs."
    },
    {
      "question": "Qual é um risco de usar NAT para todo acesso a serviços gerenciados?",
      "options": [
        "NAT sempre impede egress",
        "NAT não gera nenhum custo",
        "Pode aumentar custo e dificultar controle orientado a serviço",
        "NAT substitui IAM"
      ],
      "correctIndex": 2,
      "explanation": "NAT é útil, mas pode gerar custo por processamento/egress e não oferece o mesmo modelo privado orientado a serviço de private endpoints."
    },
    {
      "question": "Qual conjunto representa melhor observabilidade de rede cloud?",
      "options": [
        "Apenas ping e traceroute",
        "Flow logs, DNS logs, firewall logs, LB/WAF logs, auditoria, métricas, billing e SIEM",
        "Somente captura de pacote em todos os hosts",
        "Apenas print da topologia"
      ],
      "correctIndex": 1,
      "explanation": "Observabilidade cloud depende de múltiplas fontes de evidência, incluindo metadados de fluxo, logs de controle e custo."
    },
    {
      "question": "O que diferencia uma exceção saudável de uma exceção perigosa?",
      "options": [
        "A saudável não precisa de dono",
        "A saudável tem dono, justificativa, prazo, risco aceito, controle compensatório e revisão",
        "A perigosa usa IaC",
        "A saudável nunca aparece em auditoria"
      ],
      "correctIndex": 1,
      "explanation": "Exceções precisam ser rastreadas e temporárias, com risco explícito e revisão."
    },
    {
      "id": "q14.14.p1.1",
      "type": "capstone",
      "q": "Em uma defesa de arquitetura cloud, qual combinação demonstra maturidade profissional?",
      "opts": [
        "Lista de serviços sem custos nem logs",
        "Diagrama bonito sem matriz de fluxos",
        "Requisitos, fluxos, controles, custos, evidências, rollback e riscos residuais",
        "Escolher sempre o serviço mais novo do provedor"
      ],
      "a": 2,
      "exp": "Arquitetura profissional conecta requisitos a decisões, evidências, custos, operação e riscos residuais.",
      "difficulty": "avançado",
      "topic": "Capstone"
    }
  ],
  "flashcards": [
    {
      "front": "O que é uma arquitetura cloud segura, híbrida e observável?",
      "back": "Um desenho que integra cloud, datacenter, segurança, private connectivity, publicação controlada, logs, governança, custos e operação."
    },
    {
      "front": "Para que serve uma matriz de fluxos?",
      "back": "Para documentar quem fala com quem, por qual porta/protocolo, com qual justificativa e qual controle permite ou bloqueia o tráfego."
    },
    {
      "front": "Por que usar private endpoints?",
      "back": "Para acessar serviços gerenciados por caminho privado orientado a serviço, reduzindo exposição pública e melhorando governança."
    },
    {
      "front": "Qual é a função do hub em uma arquitetura hub-spoke?",
      "back": "Centralizar conectividade, inspeção, DNS, egress e integração híbrida, enquanto workloads ficam em spokes."
    },
    {
      "front": "Por que logs devem ser centralizados?",
      "back": "Para preservar evidências, permitir investigação, reduzir risco de alteração local e apoiar auditoria e SOC."
    },
    {
      "front": "O que o próximo módulo aprofunda?",
      "back": "Troubleshooting profissional de redes, usando evidências, baseline, linha do tempo e diagnóstico por camadas."
    },
    {
      "id": "fc14.14.p1.1",
      "front": "O que reprova um capstone cloud mesmo com bom desenho visual?",
      "back": "Ausência de rotas/DNS coerentes, segurança, observabilidade, custos, limpeza, rollback ou justificativa de riscos residuais.",
      "tags": [
        "capstone",
        "cloud-networking"
      ],
      "difficulty": "avançado"
    }
  ],
  "mentorQuestions": [
    "Qual fluxo você permitiria primeiro nessa arquitetura e qual fluxo você bloquearia por padrão? Por quê?",
    "Se o custo de NAT dobrasse em uma semana, quais evidências você analisaria antes de alterar a arquitetura?",
    "Que decisão sua arquitetura torna fácil para times de produto e que decisão ela torna difícil de propósito?"
  ],
  "challenge": {
    "title": "Defender uma arquitetura cloud segura, híbrida e observável para produção",
    "scenario": "Uma empresa de médio porte precisa publicar uma aplicação crítica em cloud, manter integração com datacenter, consumir banco gerenciado, hospedar APIs em Kubernetes, atender auditoria, controlar custos e permitir que times façam mudanças por pipeline.",
    "tasks": [
      "Criar diagrama de arquitetura em camadas.",
      "Definir plano CIDR e subnets.",
      "Criar matriz de fluxos.",
      "Definir DNS público, DNS privado e split-horizon.",
      "Definir publicação com CDN/WAF/LB/TLS/health checks.",
      "Definir private endpoints para serviços gerenciados.",
      "Definir conectividade híbrida com BGP e filtros.",
      "Definir controles SG/NSG/firewall/WAF/IAM/policies.",
      "Definir plano de logs, métricas, auditoria, SIEM e billing.",
      "Definir guardrails, exceções, riscos residuais e plano FinOps."
    ],
    "successCriteria": [
      "A arquitetura reduz exposição pública direta.",
      "Todos os fluxos críticos estão documentados e justificados.",
      "Rotas, DNS e controles de acesso são coerentes entre si.",
      "Há evidências suficientes para troubleshooting e investigação de incidente.",
      "Custos recorrentes são identificados e controlados.",
      "Mudanças são feitas por processo rastreável, preferencialmente IaC e pipeline."
    ],
    "gradingRubric": [
      {
        "criterion": "C01 Endereçamento, subnets e IPAM",
        "points": 10,
        "description": "CIDR sem sobreposição, crescimento, segmentação por função, ambiente e zona."
      },
      {
        "criterion": "C02 Rotas, conectividade híbrida e retorno",
        "points": 10,
        "description": "Route tables, BGP, VPN/link dedicado, filtros, assimetria e validação de retorno."
      },
      {
        "criterion": "C03 Publicação segura",
        "points": 10,
        "description": "DNS público, CDN/WAF, LB, TLS, health checks e origem privada."
      },
      {
        "criterion": "C04 Private endpoints e DNS privado",
        "points": 10,
        "description": "Serviços gerenciados privados, split-horizon, policy de endpoint, IAM e logs."
      },
      {
        "criterion": "C05 Kubernetes networking",
        "points": 10,
        "description": "CNI/IPAM, Services, Ingress/Gateway, NetworkPolicy, egress e observabilidade."
      },
      {
        "criterion": "C06 Segurança e governança",
        "points": 10,
        "description": "SG/NSG/firewall/WAF/IAM/policies, exceções, riscos residuais e owner."
      },
      {
        "criterion": "C07 Observabilidade e troubleshooting",
        "points": 10,
        "description": "Flow logs, DNS logs, LB/WAF, VPN, Kubernetes, auditoria, SIEM, runbooks e RCA."
      },
      {
        "criterion": "C08 FinOps e limpeza",
        "points": 10,
        "description": "Custos de NAT, LB, firewall, endpoints, logs, peering, egress, tags, budgets e cleanup."
      },
      {
        "criterion": "C09 DevSecOps/IaC",
        "points": 10,
        "description": "Módulos, pipeline, validações, policy as code, rollback e drift detection."
      },
      {
        "criterion": "C10 Defesa executiva e técnica",
        "points": 10,
        "description": "Apresentação clara, trade-offs, limitações, próximas etapas e decisões rastreáveis."
      }
    ],
    "minimumPassingScore": 80,
    "criticalFailureCriteria": [
      "Expor banco, API interna ou workload crítica diretamente à internet sem justificativa, WAF/TLS/controles e logs.",
      "Criar CIDR sobreposto ao datacenter, a outra VPC/VNet ou ao range de Kubernetes sem plano de remediação.",
      "Não tratar DNS privado/split-horizon em private endpoints ou conectividade híbrida.",
      "Não incluir observabilidade suficiente para investigar falha de acesso, incidente de segurança e custo anormal.",
      "Não incluir custos, tags, budgets e limpeza de recursos cobrados por hora ou por GB.",
      "Confundir conectividade privada com autorização por identidade."
    ],
    "expectedDeliverables": [
      "Diagrama SVG/ASCII ou ferramenta externa descrita em texto, com zonas, fluxos e trust boundaries.",
      "Plano CIDR/subnets/rotas/DNS público e privado.",
      "Matriz de fluxos origem-destino-porta-protocolo-dono-justificativa.",
      "Modelo de segurança: SG/NSG/firewall/WAF/IAM/policies/NetworkPolicy.",
      "Plano Kubernetes networking com CNI/IPAM, Services, Ingress/Gateway e egress.",
      "Plano de private endpoints e serviços gerenciados.",
      "Plano de observabilidade, auditoria, SIEM e troubleshooting.",
      "Estimativa FinOps e checklist de limpeza.",
      "Runbooks de incidente e rollback.",
      "Registro de riscos residuais e exceções.",
      "Rubrica C01-C10 preenchida",
      "RCA de falha simulada",
      "Plano de melhoria priorizado por risco, custo e operação"
    ],
    "gradingBands": [
      {
        "band": "90-100",
        "result": "Excelente",
        "feedback": "Arquitetura defensável, operável, observável e financeiramente consciente."
      },
      {
        "band": "80-89",
        "result": "Aprovado",
        "feedback": "Arquitetura sólida com ajustes pontuais antes de produção."
      },
      {
        "band": "70-79",
        "result": "Aprovado com ressalvas",
        "feedback": "Revisar competências fracas antes de usar como portfólio."
      },
      {
        "band": "<70",
        "result": "Refazer",
        "feedback": "Há lacunas fundamentais de arquitetura ou operação."
      }
    ]
  },
  "commentedSolution": {
    "summary": "Uma solução madura usa Landing Zone, hub-spoke, publicação controlada por CDN/WAF/LB, workloads privados, private endpoints, conectividade híbrida com BGP filtrado, DNS público/privado, logs centralizados, guardrails e pipeline IaC.",
    "steps": [
      "Comece por requisitos, riscos e fluxos, não por produtos.",
      "Separe contas ou subscriptions de segurança, logs, conectividade e workloads.",
      "Planeje CIDR com reserva e sem sobreposição.",
      "Use hub para conectividade, inspeção, DNS e egress; use spokes para workloads.",
      "Publique serviços por DNS público, CDN/WAF e load balancer; mantenha backends privados.",
      "Use private endpoints para bancos, storage, filas, secrets e serviços gerenciados sensíveis.",
      "Controle BGP com prefixos específicos, filtros e failover testado.",
      "Colete logs de rede, DNS, firewall, LB/WAF, auditoria, Kubernetes e billing em destino central.",
      "Implemente guardrails e validações de pipeline para evitar drift e mudanças inseguras.",
      "Documente riscos residuais, exceções, custos, runbooks e critérios de aceite."
    ],
    "commonMistakes": [
      "Desenhar subnet pública para tudo por conveniência.",
      "Assumir que peering sempre é transitivo.",
      "Criar NAT como solução universal e ignorar custo.",
      "Criar private endpoint sem corrigir DNS privado.",
      "Anunciar prefixos amplos por BGP sem filtro.",
      "Coletar logs tarde demais, depois do incidente.",
      "Liberar 0.0.0.0/0 para administração temporariamente e nunca remover.",
      "Criar arquitetura excelente no desenho e depois permitir mudanças manuais sem controle."
    ]
  },
  "glossary": [
    {
      "term": "Arquitetura cloud híbrida",
      "shortDefinition": "Desenho que integra cloud e ambientes externos.",
      "longDefinition": "Arquitetura que conecta workloads cloud, datacenter, usuários, filiais, parceiros e serviços gerenciados com rotas, DNS, segurança, observabilidade e governança.",
      "example": "Uma aplicação em cloud acessa um sistema legado no datacenter por VPN com BGP filtrado.",
      "relatedTerms": [
        "VPN",
        "BGP",
        "hub-spoke"
      ],
      "relatedLessons": [
        "14.8",
        "14.9",
        "14.14"
      ]
    },
    {
      "term": "Matriz de fluxos",
      "shortDefinition": "Tabela de comunicação permitida.",
      "longDefinition": "Artefato que documenta origem, destino, porta, protocolo, justificativa, controle, dono e evidência para cada fluxo de rede relevante.",
      "example": "Usuário externo -> WAF/LB -> HTTPS 443 -> aplicação web.",
      "relatedTerms": [
        "firewall",
        "SG/NSG",
        "WAF"
      ],
      "relatedLessons": [
        "13.10",
        "14.5",
        "14.14"
      ]
    },
    {
      "term": "Risco residual",
      "shortDefinition": "Risco que permanece após controles.",
      "longDefinition": "Risco aceito, monitorado ou tratado por controles compensatórios depois que medidas principais foram aplicadas.",
      "example": "Manter um endpoint público temporário durante migração com WAF, logs, dono e data de expiração.",
      "relatedTerms": [
        "exceção",
        "governança",
        "guardrail"
      ],
      "relatedLessons": [
        "14.13",
        "14.14"
      ]
    },
    {
      "term": "Egress control",
      "shortDefinition": "Controle de saída de tráfego.",
      "longDefinition": "Conjunto de rotas, firewalls, NAT, proxies, DNS, private endpoints e políticas que governam como workloads acessam destinos externos ou serviços gerenciados.",
      "example": "APIs privadas só podem acessar internet por firewall de egress e bancos por private endpoint.",
      "relatedTerms": [
        "NAT",
        "Private Link",
        "firewall"
      ],
      "relatedLessons": [
        "14.4",
        "14.10",
        "14.14"
      ]
    },
    {
      "term": "Critério de aceite arquitetural",
      "shortDefinition": "Condição para aprovar produção.",
      "longDefinition": "Lista de validações mínimas que uma arquitetura deve cumprir antes de entrar em produção, como logs ativos, fluxos aprovados, riscos documentados e testes de failover.",
      "example": "Nenhuma aplicação crítica entra em produção sem flow logs, auditoria, matriz de fluxos e rollback documentado.",
      "relatedTerms": [
        "runbook",
        "validação",
        "auditoria"
      ],
      "relatedLessons": [
        "14.12",
        "14.14"
      ]
    },
    {
      "term": "Cloud Networking como produto",
      "shortDefinition": "Rede cloud entregue por plataforma governada.",
      "longDefinition": "Modelo em que padrões de rede são oferecidos como módulos, catálogos e pipelines reutilizáveis, com guardrails e observabilidade incorporados.",
      "example": "Um time solicita um spoke por catálogo e recebe subnets, rotas, logs e políticas padronizadas.",
      "relatedTerms": [
        "platform engineering",
        "IaC",
        "policy as code"
      ],
      "relatedLessons": [
        "14.13",
        "14.14"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "AWS Well-Architected Framework",
      "organization": "AWS",
      "url": "https://aws.amazon.com/architecture/well-architected/",
      "note": "Referência oficial sobre construção de infraestrutura segura, resiliente, eficiente e otimizada para custos."
    },
    {
      "type": "official-doc",
      "title": "Azure Landing Zones - Cloud Adoption Framework",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/",
      "note": "Referência oficial sobre Landing Zones no Azure, incluindo platform e application landing zones."
    },
    {
      "type": "official-doc",
      "title": "Azure network topology and connectivity design area",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/design-area/network-topology-and-connectivity",
      "note": "Referência oficial sobre topologia e conectividade em Landing Zones do Azure."
    },
    {
      "type": "official-doc",
      "title": "Google Cloud Well-Architected Framework",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/architecture/framework",
      "note": "Referência oficial para desenho de topologias seguras, eficientes, resilientes e otimizadas para custo no Google Cloud."
    },
    {
      "type": "standard",
      "title": "NIST SP 800-207 Zero Trust Architecture",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
      "note": "Referência sobre princípios de Zero Trust aplicáveis a arquiteturas cloud e corporativas."
    },
    {
      "type": "course-link",
      "title": "Redes e Network — Módulo 15",
      "organization": "Universidade Técnica",
      "url": "internal://redes-e-network/m15",
      "note": "Próximo módulo: troubleshooting profissional de redes."
    },
    {
      "type": "official-doc",
      "title": "Google Cloud Architecture Framework",
      "organization": "Google Cloud",
      "url": "https://cloud.google.com/architecture/framework",
      "note": "Referência oficial para desenho de arquiteturas seguras, confiáveis, operáveis, eficientes e otimizadas para custo."
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
              "name": "Risco cloud específico — Projeto final: arquitetura cloud segura, híbrida e observável",
              "description": "Em Projeto final: arquitetura cloud segura, híbrida e observável, o risco principal é criar caminho privado, rota, endpoint, peering, CNI, observabilidade ou landing zone que pareça segura, mas permita exposição pública residual, bypass de firewall, resolução DNS privada incorreta, rota assimétrica ou tráfego sem telemetria.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 14.14."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Falha ou comportamento inesperado relacionado a Projeto final: arquitetura cloud segura, híbrida e observável.",
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
      "Qual evidência comprova o entendimento da aula 14.14?"
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
      "deliverablesMarked": true,
      "rubricCompleted": true,
      "selfAssessmentDone": true
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "15.1"
    ]
  },
  "cloudFinalReview": {
    "reviewId": "p1-m14-final-14.14",
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
      "capstone": "rubrica final adicionada"
    }
  },
  "capstoneAssessment": {
    "totalPoints": 100,
    "passingScore": 80,
    "distinctionScore": 90,
    "criticalCompetencies": [
      "C01-endereçamento",
      "C02-segurança",
      "C03-observabilidade",
      "C04-custos"
    ],
    "gradingRubric": [
      {
        "criterion": "C01 Endereçamento, subnets e IPAM",
        "points": 10,
        "description": "CIDR sem sobreposição, crescimento, segmentação por função, ambiente e zona."
      },
      {
        "criterion": "C02 Rotas, conectividade híbrida e retorno",
        "points": 10,
        "description": "Route tables, BGP, VPN/link dedicado, filtros, assimetria e validação de retorno."
      },
      {
        "criterion": "C03 Publicação segura",
        "points": 10,
        "description": "DNS público, CDN/WAF, LB, TLS, health checks e origem privada."
      },
      {
        "criterion": "C04 Private endpoints e DNS privado",
        "points": 10,
        "description": "Serviços gerenciados privados, split-horizon, policy de endpoint, IAM e logs."
      },
      {
        "criterion": "C05 Kubernetes networking",
        "points": 10,
        "description": "CNI/IPAM, Services, Ingress/Gateway, NetworkPolicy, egress e observabilidade."
      },
      {
        "criterion": "C06 Segurança e governança",
        "points": 10,
        "description": "SG/NSG/firewall/WAF/IAM/policies, exceções, riscos residuais e owner."
      },
      {
        "criterion": "C07 Observabilidade e troubleshooting",
        "points": 10,
        "description": "Flow logs, DNS logs, LB/WAF, VPN, Kubernetes, auditoria, SIEM, runbooks e RCA."
      },
      {
        "criterion": "C08 FinOps e limpeza",
        "points": 10,
        "description": "Custos de NAT, LB, firewall, endpoints, logs, peering, egress, tags, budgets e cleanup."
      },
      {
        "criterion": "C09 DevSecOps/IaC",
        "points": 10,
        "description": "Módulos, pipeline, validações, policy as code, rollback e drift detection."
      },
      {
        "criterion": "C10 Defesa executiva e técnica",
        "points": 10,
        "description": "Apresentação clara, trade-offs, limitações, próximas etapas e decisões rastreáveis."
      }
    ],
    "gradingBands": [
      {
        "band": "90-100",
        "result": "Excelente",
        "feedback": "Arquitetura defensável, operável, observável e financeiramente consciente."
      },
      {
        "band": "80-89",
        "result": "Aprovado",
        "feedback": "Arquitetura sólida com ajustes pontuais antes de produção."
      },
      {
        "band": "70-79",
        "result": "Aprovado com ressalvas",
        "feedback": "Revisar competências fracas antes de usar como portfólio."
      },
      {
        "band": "<70",
        "result": "Refazer",
        "feedback": "Há lacunas fundamentais de arquitetura ou operação."
      }
    ],
    "mandatoryDeliverables": [
      "Diagrama SVG/ASCII ou ferramenta externa descrita em texto, com zonas, fluxos e trust boundaries.",
      "Plano CIDR/subnets/rotas/DNS público e privado.",
      "Matriz de fluxos origem-destino-porta-protocolo-dono-justificativa.",
      "Modelo de segurança: SG/NSG/firewall/WAF/IAM/policies/NetworkPolicy.",
      "Plano Kubernetes networking com CNI/IPAM, Services, Ingress/Gateway e egress.",
      "Plano de private endpoints e serviços gerenciados.",
      "Plano de observabilidade, auditoria, SIEM e troubleshooting.",
      "Estimativa FinOps e checklist de limpeza.",
      "Runbooks de incidente e rollback.",
      "Registro de riscos residuais e exceções."
    ]
  },
  "p1_09_cloudNetworkingv2final": {
    "status": "aplicado",
    "focus": "Capstone Cloud Networking final",
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
      "module": "Capstone de plataforma",
      "lesson": "IaC, CI/CD, observabilidade, SRE e rollback",
      "reason": "O capstone cloud networking deve virar arquitetura operável por plataforma e pipelines."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Capstone IAM",
      "lesson": "Identidade, service principals, auditoria e least privilege",
      "reason": "Rede privada não elimina a necessidade de identidades de workload e trilha de auditoria."
    },
    {
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.x",
      "reason": "O próximo módulo aprofunda troubleshooting profissional necessário para defender e operar a arquitetura do capstone."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e plataforma de aplicações",
      "lesson": "Service, Ingress, CNI, NetworkPolicy e operação de clusters",
      "reason": "Kubernetes depende de redes, DNS, balanceamento, políticas e observabilidade para operar aplicações modernas."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Identidades de workload e serviços",
      "lesson": "Service principals, OIDC federation, managed identities e contas de serviço",
      "reason": "Serviços, pipelines e workloads acessam recursos usando identidade própria, não apenas endereço IP ou regra de firewall."
    }
  ],
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false,
    "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
  }
};
