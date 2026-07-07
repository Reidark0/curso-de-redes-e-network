export const lesson1310 = {
  "id": "13.10",
  "moduleId": "m13",
  "order": 10,
  "title": "Revisão Prática: Desenhar uma Arquitetura Defensiva de Rede",
  "subtitle": "Como consolidar defesa em profundidade, segmentação, hardening, sensores, SIEM, threat modeling, Zero Trust e playbooks em um projeto defensivo completo.",
  "duration": "150-220 min",
  "estimatedStudyTimeMinutes": 220,
  "difficulty": "intermediário-avançado",
  "type": "ligação",
  "xp": 420,
  "tags": [
    "redes",
    "segurança",
    "arquitetura",
    "defesa em profundidade",
    "segmentação",
    "zero trust",
    "siem",
    "soc",
    "blue team",
    "hardening",
    "ndr",
    "firewall",
    "threat modeling"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.1",
      "reason": "Defesa em profundidade é o modelo central do projeto final."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação e zonas sustentam a redução de movimento lateral."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.4",
      "reason": "Sensores, NetFlow e NDR fornecem visibilidade para a arquitetura."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "SIEM e correlação transformam logs em investigação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.8",
      "reason": "Zero Trust orienta menor privilégio, identidade e contexto."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.9",
      "reason": "Playbooks tornam a resposta repetível e auditável."
    }
  ],
  "objectives": [
    "Consolidar os conceitos do Módulo 13 em um projeto único de arquitetura defensiva.",
    "Desenhar zonas de segurança e matriz de fluxos para uma empresa fictícia.",
    "Relacionar segmentação, hardening, firewall, sensores, SIEM, Zero Trust e playbooks.",
    "Definir controles preventivos, detectivos e responsivos por zona e por fluxo.",
    "Criar um plano de logs e evidências para investigação de rede.",
    "Produzir entregáveis técnicos e executivos de arquitetura defensiva."
  ],
  "learningOutcomes": [
    "Dado um cenário empresarial, o aluno consegue propor zonas e fluxos justificados.",
    "Dado um ativo crítico, o aluno identifica caminhos permitidos, controles e evidências necessárias.",
    "Dado um risco de movimento lateral, o aluno propõe segmentação, detecção e resposta.",
    "Dado um ambiente híbrido, o aluno conecta datacenter, cloud, IAM, SIEM e playbooks.",
    "Dado um pedido executivo genérico, o aluno transforma a demanda em entregáveis técnicos claros."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Depois de estudar defesa em profundidade, segmentação, hardening, sensores, SIEM, threat modeling, padrões de ataque, Zero Trust e playbooks, chega o momento de juntar tudo em uma decisão de arquitetura. Em uma empresa real, ninguém entrega segurança como uma lista de ferramentas. O que se entrega é um desenho defensivo coerente: quem pode falar com quem, por qual caminho, com qual identidade, com qual controle, com qual evidência e com qual plano de resposta quando algo sair do esperado.</p>\n  <p>Imagine uma empresa com usuários em escritório, Wi-Fi corporativo, visitantes, IoT, servidores internos, aplicações web publicadas, VPN, cloud, pipelines DevSecOps, banco de dados crítico, Active Directory, IAM, SIEM e equipe de SOC. O pedido do diretor é simples: “deixe a rede segura”. Mas essa frase esconde dezenas de perguntas: segura contra o quê? Para quais ativos? Com qual impacto operacional? Com qual orçamento? O que pode parar? O que precisa ser monitorado? Que risco aceitamos?</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> arquiteturas defensivas ruins normalmente não falham porque faltava uma ferramenta famosa; falham porque os fluxos não foram entendidos, as exceções cresceram sem controle, a telemetria não cobre caminhos importantes, a segmentação não reduz movimento lateral e ninguém sabe quais evidências consultar durante um incidente.</div>\n  <p>Esta aula é a revisão prática do Módulo 13. O objetivo é transformar conceitos em um projeto defensivo completo, explicável, auditável e operável. Ao final, você terá um modelo de entrega que pode ser usado em estudo, portfólio, documentação interna ou discussão com times de infraestrutura, segurança, cloud, IAM e DevSecOps.</p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Historicamente, muitas redes corporativas cresceram de forma incremental. Primeiro surgiu a LAN para conectar usuários. Depois vieram servidores, Wi-Fi, VPN, internet, filiais, firewalls, virtualização, cloud, aplicações SaaS, containers, pipelines e integrações entre empresas. Cada etapa resolveu um problema imediato, mas muitas organizações acumularam arquitetura sem revisar o modelo de confiança.</p>\n  <p>No início, o perímetro era o centro da segurança: havia uma rede interna considerada confiável e uma internet considerada não confiável. Bastava proteger a borda. Esse modelo funcionou enquanto a maioria dos ativos estava dentro do datacenter e o acesso remoto era exceção. Com notebooks móveis, cloud, APIs, fornecedores, BYOD, IoT e SaaS, o perímetro deixou de ser uma linha simples.</p>\n  <p>A resposta madura não foi abandonar firewall, VLAN, VPN ou IDS. Foi combinar controles. Defesa em profundidade trouxe camadas; segmentação reduziu raio de impacto; hardening diminuiu superfície; sensores aumentaram visibilidade; SIEM organizou eventos; Zero Trust reduziu confiança implícita; playbooks tornaram resposta repetível. A arquitetura defensiva moderna nasce dessa evolução: não é uma tecnologia única, é um sistema de decisões conectadas.</p>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico desta aula é desenhar uma rede que continue funcionando para o negócio, mas limite abuso, reduza movimento lateral, gere evidências, permita investigação e evite depender de confiança implícita. Esse problema é difícil porque segurança de rede envolve trade-offs: bloquear demais quebra operação; liberar demais amplia risco; registrar tudo custa caro; registrar pouco reduz visibilidade; segmentar demais sem gestão vira caos; segmentar de menos mantém rede plana.</p>\n  <ul>\n    <li><strong>Sem inventário:</strong> não há como proteger o que a organização não sabe que existe.</li>\n    <li><strong>Sem classificação:</strong> banco crítico e impressora acabam recebendo tratamento parecido.</li>\n    <li><strong>Sem matriz de fluxos:</strong> regras de firewall viram exceções acumuladas, não política.</li>\n    <li><strong>Sem trust boundaries:</strong> a equipe não sabe onde uma política deve ser aplicada.</li>\n    <li><strong>Sem logs úteis:</strong> incidentes são descobertos tarde ou investigados por suposição.</li>\n    <li><strong>Sem playbook:</strong> a resposta depende da experiência individual de quem está no plantão.</li>\n  </ul>\n  <p>Uma arquitetura defensiva precisa responder a três perguntas simples, mas profundas: quais ativos importam, quais caminhos precisam existir e quais controles tornam esses caminhos seguros, observáveis e administráveis?</p>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução da segurança de redes pode ser entendida como uma mudança de foco: de proteger apenas a borda para proteger fluxos, identidades, ativos e evidências em toda a arquitetura.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Perímetro simples</td><td>Firewall na borda separando rede interna e internet.</td><td>Assumia que a rede interna era confiável.</td><td>Segmentação interna e defesa em profundidade.</td></tr>\n      <tr><td>Rede plana</td><td>Usuários, servidores, impressoras e sistemas em poucos segmentos amplos.</td><td>Movimento lateral fácil e baixa visibilidade.</td><td>Zonas, VLANs, sub-redes, firewall interno e microsegmentação.</td></tr>\n      <tr><td>Ferramentas isoladas</td><td>Firewall, IDS, EDR e SIEM operando sem desenho comum.</td><td>Alertas sem contexto e gaps de cobertura.</td><td>Arquitetura orientada a telemetria e casos de uso.</td></tr>\n      <tr><td>Confiança implícita</td><td>Quem entra na VPN ou rede interna acessa muitos recursos.</td><td>Credencial comprometida amplia impacto.</td><td>Zero Trust, menor privilégio e políticas por recurso.</td></tr>\n      <tr><td>Resposta improvisada</td><td>Cada incidente tratado de forma artesanal.</td><td>Perda de evidência e decisões inconsistentes.</td><td>Playbooks, tabletop, RCA e melhoria contínua.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Arquitetura defensiva de rede é o desenho intencional de zonas, fluxos, controles, identidades, políticas, telemetria e processos de resposta para reduzir risco sem impedir a operação legítima do negócio.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> uma arquitetura defensiva de rede combina segmentação, controle de acesso, hardening, monitoramento, detecção, resposta e governança para limitar exposição, reduzir movimento lateral, gerar evidências e sustentar decisões de segurança.</div>\n  <p>Ela não é sinônimo de firewall. Firewall é um controle dentro da arquitetura. Também não é sinônimo de Zero Trust, SIEM, IDS, NDR ou NAC. Esses elementos podem participar do desenho, mas o valor real está na coerência: cada controle deve existir para proteger um fluxo, reduzir um risco, produzir uma evidência ou impor uma política.</p>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O funcionamento interno de uma arquitetura defensiva pode ser visto como um ciclo de decisão. Primeiro a organização entende ativos e dependências. Depois define zonas e fluxos. Em seguida aplica controles. Depois coleta evidências. Por fim, revisa o desenho com base em incidentes, mudanças e auditorias.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Inventariar:</strong> identificar usuários, dispositivos, servidores, aplicações, bancos, integrações, redes, cloud e terceiros.</li>\n    <li><strong>Classificar:</strong> separar ativos por criticidade, sensibilidade, exposição e dependências.</li>\n    <li><strong>Mapear fluxos:</strong> entender origem, destino, protocolo, porta, identidade, justificativa e frequência.</li>\n    <li><strong>Definir zonas:</strong> criar fronteiras como usuários, servidores, gestão, internet, DMZ, cloud, Wi-Fi guest, IoT, backups e dados críticos.</li>\n    <li><strong>Aplicar políticas:</strong> traduzir matriz de fluxos em firewall, ACL, security group, NSG, NAC, ZTNA, NetworkPolicy ou regra de proxy.</li>\n    <li><strong>Endurecer:</strong> reduzir serviços, protocolos inseguros, contas compartilhadas, gestão exposta e configurações padrão.</li>\n    <li><strong>Instrumentar:</strong> coletar logs, NetFlow/IPFIX, DNS, DHCP, RADIUS, VPN, firewall, proxy, EDR, NDR, cloud logs e PCAP quando necessário.</li>\n    <li><strong>Responder:</strong> usar playbooks para triagem, escopo, contenção, erradicação, recuperação e lições aprendidas.</li>\n  </ol>\n  <p>O ponto mais importante: arquitetura defensiva não é estática. Toda nova aplicação, exceção de firewall, mudança de rede, novo fornecedor, novo túnel, nova integração ou novo cluster cloud muda o modelo de risco.</p>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura defensiva corporativa típica envolve múltiplas zonas conectadas por pontos de decisão. O tráfego de usuários para internet passa por proxy, firewall ou SWG. O tráfego de usuários para aplicações internas passa por firewall interno, ZTNA, NAC ou política de identidade. O tráfego entre servidores é controlado por segmentação leste-oeste. O acesso administrativo usa rede de gestão, MFA, jump host, PAM e logs fortes. O tráfego cloud usa VPC/VNet, security groups, NSGs, private endpoints, firewalls cloud e flow logs.</p>\n  <ul>\n    <li><strong>Camadas envolvidas:</strong> camada 2 para VLANs e isolamento inicial; camada 3 para sub-redes, rotas e firewalls; camada 4 para portas e sessões; camada 7 para proxies, WAF, DNS e identidade de aplicação.</li>\n    <li><strong>Componentes envolvidos:</strong> switches, roteadores, firewalls, WAF, proxies, VPN/ZTNA, NAC, IAM, RADIUS, SIEM, IDS/IPS, NDR, EDR, DNS, DHCP e cloud networking.</li>\n    <li><strong>Dependências:</strong> inventário, NTP, naming, CMDB, gestão de mudanças, donos de aplicação, logs confiáveis e documentação.</li>\n    <li><strong>Pontos de falha:</strong> exceções antigas, regras any-any, gestão exposta, rede plana, logs sem retenção, ativos sem dono, shadow IT, credenciais compartilhadas e cloud sem governança.</li>\n  </ul>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma empresa física com recepção, crachás, catracas, elevadores, salas restritas, câmeras, cofres, equipe de segurança e plano de evacuação. A segurança não depende apenas da porta da rua. Um visitante pode entrar na recepção, mas não deve acessar o datacenter. Um funcionário pode entrar no andar do seu setor, mas não no cofre. Câmeras não impedem todas as ações, mas ajudam a investigar. O plano de emergência não evita o incidente, mas reduz dano quando ele acontece.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes são mais dinâmicas do que prédios. Um serviço pode existir em cloud, um usuário pode estar remoto, uma identidade pode ser federada, um container pode nascer e morrer em minutos, e um fluxo permitido pode ser abusado por credencial comprometida. Por isso, arquitetura defensiva precisa combinar controle, telemetria e revisão contínua.</div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em uma pequena empresa, uma arquitetura defensiva mínima poderia separar três redes: usuários, visitantes e servidores. Visitantes acessam apenas internet. Usuários acessam internet, impressora e uma aplicação interna específica. Servidores não iniciam conexões livremente para usuários. O firewall registra tentativas negadas. O DNS interno registra consultas. O administrador acessa equipamentos por SSH em uma rede de gestão separada.</p>\n  <p>Mesmo esse exemplo simples já mostra a lógica: não basta “ter internet funcionando”. É preciso saber quais fluxos são necessários, negar o resto, registrar o que importa e documentar como diagnosticar.</p>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa média, o desenho precisa incluir matriz de zonas: usuários corporativos, Wi-Fi guest, IoT, servidores de aplicação, banco de dados, gestão, DMZ, VPN/ZTNA, cloud, backup, monitoramento e terceiros. Cada zona possui finalidade, dono, criticidade, controles mínimos, logs obrigatórios e regras de acesso.</p>\n  <p>Por exemplo, estações de usuários podem acessar aplicações web internas em portas específicas, mas não devem acessar diretamente banco de dados. Servidores de aplicação podem acessar bancos específicos, mas bancos não devem iniciar conexão para estações. A rede de gestão acessa switches, firewalls e APs, mas exige MFA, jump host, conta nominativa e logging. O SOC recebe logs de firewall, DNS, DHCP, proxy, EDR, NDR e IAM para reconstruir incidentes.</p>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, a arquitetura defensiva aparece como VPC/VNet, subnets, route tables, security groups, NSGs, cloud firewalls, private endpoints, NAT Gateway, load balancers, WAF, IAM, flow logs e audit logs. A lógica é a mesma: separar zonas, controlar fluxos, reduzir exposição pública, registrar eventos e automatizar revisão.</p>\n  <p>Um erro comum é copiar a rede plana do datacenter para a cloud. Outro erro é acreditar que security group permissivo é aceitável porque “está dentro da VPC”. Em arquitetura defensiva madura, workloads públicos ficam atrás de load balancer e WAF; bancos usam endpoint privado; administração passa por bastion, SSM, Azure Bastion, IAP ou ZTNA; logs seguem para SIEM; e IaC aplica guardrails para evitar exposição acidental.</p>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, arquitetura defensiva precisa virar código, teste e revisão. Terraform, Bicep, CloudFormation, Kubernetes manifests e Helm charts podem criar redes, security groups, firewalls, NetworkPolicies, private endpoints e regras de acesso. Se essas mudanças não forem revisadas, um pipeline pode abrir uma exceção perigosa mais rápido do que a equipe consegue perceber.</p>\n  <p>Boas práticas incluem revisão de IaC, policy as code, detecção de regras amplas, testes de conectividade autorizada, inventário automático, tags obrigatórias, aprovação para fluxos críticos e rollback controlado. O objetivo não é impedir deploy; é fazer com que cada mudança de rede seja rastreável, justificada e compatível com a arquitetura defensiva.</p>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Do ponto de vista de segurança, a arquitetura defensiva precisa reduzir probabilidade, impacto e tempo de detecção. Ela não promete impedir tudo. Ela busca tornar ataque mais difícil, abuso mais limitado, detecção mais rápida e resposta mais organizada.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Movimento lateral</td><td>Host comprometido acessa muitos segmentos internos.</td><td>Escopo cresce rapidamente.</td><td>Segmentação, menor privilégio, EDR, NDR, firewall interno e logs.</td></tr>\n      <tr><td>Exposição pública acidental</td><td>Security group ou firewall libera serviço administrativo.</td><td>Ataque externo direto.</td><td>IaC guardrails, varredura defensiva autorizada, revisão e deny by default.</td></tr>\n      <tr><td>Gestão insegura</td><td>Equipamentos aceitam Telnet, SNMP fraco ou conta compartilhada.</td><td>Comprometimento de infraestrutura.</td><td>SSH, HTTPS, SNMPv3, AAA, MFA, PAM, rede de gestão e logging.</td></tr>\n      <tr><td>Telemetria insuficiente</td><td>Não há logs de DNS, DHCP, firewall ou identidade.</td><td>Incidente sem linha do tempo confiável.</td><td>Plano de logs, retenção, NTP, normalização e SIEM.</td></tr>\n      <tr><td>Exceções acumuladas</td><td>Regras antigas permanecem abertas sem dono.</td><td>Superfície cresce silenciosamente.</td><td>Recertificação de regras, owner, validade, justificativa e auditoria.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra uma arquitetura defensiva integrada: zonas, controles de acesso, telemetria, SIEM, SOC e ciclo de melhoria.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1200 680\" role=\"img\" aria-labelledby=\"arch-title-1310 arch-desc-1310\">\n    <title id=\"arch-title-1310\">Arquitetura defensiva de rede integrada</title>\n    <desc id=\"arch-desc-1310\">Diagrama com usuários, Wi-Fi, DMZ, servidores, banco, cloud, firewall, Zero Trust, SIEM e SOC formando uma arquitetura defensiva.</desc>\n    <defs><marker id=\"arrow-1310\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n    <rect x=\"40\" y=\"70\" width=\"220\" height=\"500\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"150\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Acesso</text>\n    <rect x=\"75\" y=\"140\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"150\" y=\"166\" text-anchor=\"middle\" class=\"svg-label\">Usuários</text>\n    <text x=\"150\" y=\"186\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">corp</text>\n    <rect x=\"75\" y=\"235\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"150\" y=\"261\" text-anchor=\"middle\" class=\"svg-label\">Wi-Fi</text>\n    <text x=\"150\" y=\"281\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">corp/guest/IoT</text>\n    <rect x=\"75\" y=\"330\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"150\" y=\"356\" text-anchor=\"middle\" class=\"svg-label\">ZTNA/NAC</text>\n    <text x=\"150\" y=\"376\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">identidade</text>\n\n    <rect x=\"330\" y=\"70\" width=\"220\" height=\"500\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"440\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Controle</text>\n    <rect x=\"365\" y=\"145\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"440\" y=\"171\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"440\" y=\"191\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">zonas</text>\n    <rect x=\"365\" y=\"255\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"440\" y=\"281\" text-anchor=\"middle\" class=\"svg-label\">IDS/IPS</text>\n    <text x=\"440\" y=\"301\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">NDR/flow</text>\n    <rect x=\"365\" y=\"365\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"440\" y=\"391\" text-anchor=\"middle\" class=\"svg-label\">Rotas</text>\n    <text x=\"440\" y=\"411\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sub-redes</text>\n\n    <rect x=\"620\" y=\"70\" width=\"250\" height=\"500\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"745\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Recursos</text>\n    <rect x=\"670\" y=\"140\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"745\" y=\"166\" text-anchor=\"middle\" class=\"svg-label\">Aplicações</text>\n    <text x=\"745\" y=\"186\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">internas</text>\n    <rect x=\"670\" y=\"245\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"745\" y=\"271\" text-anchor=\"middle\" class=\"svg-label\">Banco</text>\n    <text x=\"745\" y=\"291\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">dados críticos</text>\n    <rect x=\"670\" y=\"350\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"745\" y=\"376\" text-anchor=\"middle\" class=\"svg-label\">Cloud</text>\n    <text x=\"745\" y=\"396\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VPC/VNet</text>\n\n    <rect x=\"940\" y=\"95\" width=\"210\" height=\"420\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"1045\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Operação</text>\n    <rect x=\"970\" y=\"175\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"1045\" y=\"201\" text-anchor=\"middle\" class=\"svg-label\">SIEM</text>\n    <text x=\"1045\" y=\"221\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">correlação</text>\n    <rect x=\"970\" y=\"285\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"1045\" y=\"311\" text-anchor=\"middle\" class=\"svg-label\">SOC</text>\n    <text x=\"1045\" y=\"331\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">playbooks</text>\n    <rect x=\"970\" y=\"395\" width=\"150\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"1045\" y=\"421\" text-anchor=\"middle\" class=\"svg-label\">RCA</text>\n    <text x=\"1045\" y=\"441\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">melhoria</text>\n\n    <line x1=\"225\" y1=\"171\" x2=\"365\" y2=\"176\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1310)\" />\n    <line x1=\"225\" y1=\"266\" x2=\"365\" y2=\"176\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1310)\" />\n    <line x1=\"225\" y1=\"361\" x2=\"365\" y2=\"176\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1310)\" />\n    <line x1=\"515\" y1=\"176\" x2=\"670\" y2=\"171\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1310)\" />\n    <line x1=\"515\" y1=\"286\" x2=\"670\" y2=\"276\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1310)\" />\n    <line x1=\"820\" y1=\"171\" x2=\"970\" y2=\"206\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1310)\" />\n    <line x1=\"515\" y1=\"286\" x2=\"970\" y2=\"206\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1310)\" />\n    <line x1=\"1045\" y1=\"237\" x2=\"1045\" y2=\"285\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-1310)\" />\n    <line x1=\"1045\" y1=\"347\" x2=\"1045\" y2=\"395\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-1310)\" />\n    <text x=\"600\" y=\"620\" text-anchor=\"middle\" class=\"svg-label\">Arquitetura defensiva = zonas + menor privilégio + telemetria + resposta + revisão contínua</text>\n  </svg>\n</section>",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é um projeto final do Módulo 13. Você desenhará uma arquitetura defensiva para uma empresa fictícia, criando zonas, matriz de fluxos, controles, telemetria, playbooks e plano de melhoria.</p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam decisões de arquitetura: classificar ativos, justificar fluxos, escolher controles e definir evidências.</p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio final simula uma demanda executiva: reduzir risco de movimento lateral e melhorar capacidade de investigação sem paralisar o negócio.</p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como transformar requisitos de negócio em zonas, controles e evidências, evitando respostas simplistas como “comprar mais uma ferramenta”.</p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li>Arquitetura defensiva é desenho integrado, não coleção de produtos.</li>\n    <li>O ponto de partida é inventário, classificação de ativos e matriz de fluxos.</li>\n    <li>Segmentação, hardening, sensores, logs, Zero Trust e playbooks precisam trabalhar juntos.</li>\n    <li>Todo controle deve ter justificativa, dono, evidência e processo de revisão.</li>\n    <li>O próximo módulo levará esse raciocínio para cloud networking, onde redes virtuais, custos, rotas, endpoints privados e logs mudam a operação.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>O próximo tema é o Módulo 14 — Cloud Networking. Você levará os conceitos de segmentação, controle de fluxo, telemetria, identidade e arquitetura defensiva para VPC, VNet, subnets, route tables, security groups, NSGs, NAT Gateway, Private Link, VPN, peering, hub-spoke, logs de fluxo e custos de tráfego.</p>\n</section>"
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
      "Ethernet",
      "ARP",
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "DNS",
      "DHCP",
      "TLS",
      "RADIUS",
      "Syslog",
      "NetFlow",
      "IPFIX",
      "HTTP",
      "BGP"
    ],
    "dependsOn": [
      "VLAN",
      "subnet",
      "ACL",
      "firewall",
      "IDS/IPS",
      "NDR",
      "SIEM",
      "IAM",
      "Zero Trust",
      "Wi-Fi corporativo"
    ],
    "enables": [
      "Cloud Networking",
      "SOC",
      "Blue Team",
      "Arquitetura segura",
      "Resposta a incidente",
      "Governança de rede"
    ]
  },
  "protocolFields": [
    {
      "field": "Source/Destination",
      "size": "variável",
      "purpose": "Definir origem e destino de cada fluxo permitido ou negado.",
      "securityObservation": "Sem origem e destino claros, regras viram permissões amplas e difíceis de auditar."
    },
    {
      "field": "Port/Protocol",
      "size": "variável",
      "purpose": "Identificar serviço e protocolo necessários para cada comunicação.",
      "securityObservation": "Permitir qualquer porta aumenta superfície e dificulta detecção."
    },
    {
      "field": "Identity/Role",
      "size": "variável",
      "purpose": "Associar fluxo a usuário, workload, grupo, função ou serviço.",
      "securityObservation": "Zero Trust depende de identidade e contexto, não apenas IP."
    },
    {
      "field": "Log Source",
      "size": "variável",
      "purpose": "Definir qual controle gera evidência sobre o fluxo.",
      "securityObservation": "Sem fonte de log, a política pode existir sem capacidade de investigação."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Usuário corporativo",
      "action": "Solicita acesso a aplicação interna",
      "detail": "Identidade, dispositivo e contexto são avaliados por NAC/ZTNA/IAM.",
      "possibleFailure": "Acesso amplo por VPN permite alcançar redes que não deveriam ser visíveis."
    },
    {
      "step": 2,
      "actor": "Ponto de enforcement",
      "action": "Aplica política por zona e recurso",
      "detail": "Firewall, proxy, security group ou PEP valida fluxo permitido.",
      "possibleFailure": "Regra any-any ou exceção antiga contorna a arquitetura."
    },
    {
      "step": 3,
      "actor": "Recurso interno",
      "action": "Responde ao fluxo autorizado",
      "detail": "Servidor registra acesso e sensor observa metadados.",
      "possibleFailure": "Servidor sem hardening ou logs fracos reduz capacidade de auditoria."
    },
    {
      "step": 4,
      "actor": "SIEM/SOC",
      "action": "Correlaciona sinais",
      "detail": "Logs de firewall, DNS, IAM, EDR e NDR alimentam investigação.",
      "possibleFailure": "NTP, DHCP ou inventário ausentes quebram linha do tempo."
    }
  ],
  "deepDive": {
    "mentalModel": "Desenhe segurança de rede como uma cadeia: ativo crítico -> caminho necessário -> ponto de decisão -> controle -> evidência -> resposta -> revisão. Se qualquer elo estiver ausente, a arquitetura terá um ponto cego.",
    "keyTerms": [
      "zona de segurança",
      "matriz de fluxos",
      "trust boundary",
      "controle preventivo",
      "controle detectivo",
      "controle responsivo",
      "risco residual",
      "telemetria",
      "playbook",
      "governança"
    ],
    "limitations": [
      "Nenhuma arquitetura elimina todos os riscos.",
      "Segmentação sem operação e documentação vira dívida técnica.",
      "Logs sem retenção e contexto não sustentam investigação.",
      "Zero Trust mal implementado pode virar apenas nova camada de complexidade.",
      "Ferramentas não compensam ausência de inventário e donos de ativos."
    ],
    "whenToUse": [
      "Ao criar ou revisar rede corporativa.",
      "Ao reduzir movimento lateral.",
      "Ao integrar cloud e datacenter.",
      "Ao preparar auditoria ou melhoria de SOC.",
      "Ao redesenhar acesso remoto e gestão administrativa."
    ],
    "whenNotToUse": [
      "Como checklist cego sem entender o negócio.",
      "Como desculpa para bloquear fluxos críticos sem análise.",
      "Como projeto isolado sem donos de aplicação, infraestrutura, segurança e IAM.",
      "Como compra de ferramenta sem processos e telemetria."
    ],
    "operationalImpact": [
      "Exige inventário atualizado, documentação e gestão de mudanças.",
      "Aumenta qualidade de troubleshooting ao explicitar fluxos e logs.",
      "Exige revisão periódica de regras, exceções e donos.",
      "Pode exigir treinamento de infraestrutura, SOC, cloud e DevSecOps."
    ],
    "financialImpact": [
      "Firewalls, NDR, SIEM, retenção de logs e cloud flow logs podem gerar custo recorrente.",
      "Segmentação pode exigir licenças, appliances, switches, consultoria ou horas de engenharia.",
      "Logs demais elevam ingestão e armazenamento; logs de menos reduzem capacidade de resposta.",
      "Automação e IaC reduzem custo operacional no longo prazo, mas exigem maturidade inicial."
    ],
    "securityImpact": [
      "Reduz movimento lateral e exposição indevida.",
      "Melhora detecção e investigação.",
      "Diminui dependência de confiança implícita.",
      "Torna exceções e riscos residuais visíveis para decisão."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Começar comprando ferramenta antes de mapear fluxos.",
      "whyItHappens": "Ferramentas parecem solução rápida e visível.",
      "consequence": "A organização ganha alertas e custos, mas continua sem arquitetura coerente.",
      "correction": "Começar por ativos, zonas, fluxos, riscos, controles e evidências."
    },
    {
      "mistake": "Criar muitas zonas sem operação capaz de mantê-las.",
      "whyItHappens": "Segmentação é confundida com quantidade de VLANs.",
      "consequence": "Regras ficam confusas, exceções aumentam e troubleshooting piora.",
      "correction": "Segmentar por risco, função, criticidade e capacidade de operação."
    },
    {
      "mistake": "Permitir any-any temporário que vira permanente.",
      "whyItHappens": "Pressão para resolver incidente ou implantação urgente.",
      "consequence": "A exceção vira caminho de abuso e ponto cego de auditoria.",
      "correction": "Toda exceção precisa de dono, validade, justificativa, log e revisão."
    },
    {
      "mistake": "Desenhar política sem evidência.",
      "whyItHappens": "A equipe pensa apenas no bloqueio ou liberação.",
      "consequence": "Quando há incidente, ninguém consegue provar o que aconteceu.",
      "correction": "Cada fluxo crítico deve ter fonte de log e retenção definida."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Usuário autorizado não acessa aplicação interna.",
      "Aplicação funciona em uma rede, mas falha em outra zona.",
      "Firewall mostra bloqueios inesperados após segmentação.",
      "SIEM não recebe logs de um caminho crítico.",
      "Regra de segurança permite mais do que o necessário."
    ],
    "diagnosticQuestions": [
      "Qual ativo, usuário e aplicação estão envolvidos?",
      "Qual zona de origem e destino?",
      "Qual fluxo é esperado: protocolo, porta, direção e frequência?",
      "Qual controle deveria permitir ou negar?",
      "Qual evidência confirma o comportamento?",
      "Existe exceção temporária ou regra antiga?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection app.interno.exemplo -Port 443; Resolve-DnsName app.interno.exemplo",
        "purpose": "Validar DNS e conectividade TCP para aplicação interna.",
        "expectedObservation": "Nome resolve para IP esperado e porta responde quando política permite.",
        "interpretation": "Se DNS falha, investigar resolução; se porta falha, investigar rota, firewall, proxy ou política Zero Trust."
      },
      {
        "platform": "Linux",
        "command": "dig app.interno.exemplo && curl -vk https://app.interno.exemplo && traceroute app.interno.exemplo",
        "purpose": "Coletar DNS, teste HTTP/TLS e caminho de rede.",
        "expectedObservation": "Resposta DNS, handshake e caminho coerentes com a arquitetura.",
        "interpretation": "Falhas em camadas diferentes apontam controles ou dependências diferentes."
      },
      {
        "platform": "Cisco IOS",
        "command": "show access-lists; show ip route; show logging",
        "purpose": "Verificar ACLs, rotas e eventos de equipamento de rede.",
        "expectedObservation": "Regras e rotas compatíveis com matriz de fluxos.",
        "interpretation": "Divergência indica drift, erro de política ou documentação desatualizada."
      },
      {
        "platform": "Cloud",
        "command": "Consultar flow logs, security group/NSG efetivo, route table e private endpoint associado",
        "purpose": "Validar caminho e enforcement em cloud.",
        "expectedObservation": "Fluxo permitido ou negado conforme política documentada.",
        "interpretation": "Diferenças podem indicar regra ampla, rota errada ou endpoint público indevido."
      }
    ],
    "decisionTree": [
      {
        "if": "Fluxo legítimo não funciona",
        "then": "Validar DNS, rota, política de firewall/security group, identidade, certificado e logs do ponto de enforcement."
      },
      {
        "if": "Fluxo indevido funciona",
        "then": "Identificar regra permissiva, exceção antiga, rota alternativa, bypass de proxy/ZTNA ou política cloud ampla."
      },
      {
        "if": "Incidente não pode ser investigado",
        "then": "Mapear lacunas de logging: DNS, DHCP, NAT, firewall, IAM, EDR, NDR, flow logs e NTP."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Criar matriz de fluxos antes de escrever regras.",
      "Aplicar deny by default entre zonas críticas.",
      "Usar contas nominativas e MFA para administração.",
      "Manter rede de gestão separada e monitorada.",
      "Registrar DNS, DHCP, firewall, IAM, VPN, proxy, EDR, NDR e cloud logs.",
      "Revisar exceções periodicamente com dono e validade."
    ],
    "badPractices": [
      "Rede plana para usuários, servidores e IoT.",
      "Regras any-any permanentes.",
      "Gestão de equipamentos exposta em redes de usuário.",
      "Conta compartilhada de administrador.",
      "Sem logs ou retenção insuficiente.",
      "Segmentação feita sem documentação e sem plano de rollback."
    ],
    "commonErrors": [
      "Confundir VLAN com segurança completa.",
      "Achar que firewall de borda resolve tráfego leste-oeste.",
      "Achar que Zero Trust elimina necessidade de rede bem desenhada.",
      "Coletar logs sem normalização, NTP ou contexto."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por rede plana",
        "description": "Comprometimento de um host permite alcançar muitos sistemas internos.",
        "defensiveExplanation": "O risco aparece quando não há barreiras internas e o tráfego leste-oeste não é monitorado.",
        "mitigation": "Segmentação, firewall interno, menor privilégio, EDR, NDR e playbooks."
      },
      {
        "name": "Bypass de ponto de enforcement",
        "description": "Fluxo encontra rota alternativa que evita proxy, firewall, ZTNA ou inspeção esperada.",
        "defensiveExplanation": "Pode ocorrer por rotas antigas, túnel legado, regra cloud ampla ou exceção não documentada.",
        "mitigation": "Mapear rotas, revisar exceções, validar caminhos e monitorar fluxos raros."
      },
      {
        "name": "Telemetria incompleta",
        "description": "A organização não consegue reconstruir incidente por falta de logs essenciais.",
        "defensiveExplanation": "Sem DNS, DHCP, NAT, identidade e flow logs, IPs e horários perdem valor investigativo.",
        "mitigation": "Plano de logs, NTP, retenção, enriquecimento e casos de uso no SIEM."
      }
    ],
    "monitoring": [
      "Fluxos negados entre zonas críticas.",
      "Novas regras ou alterações de firewall/security group.",
      "Acesso administrativo fora de janela ou origem esperada.",
      "Aumento de tráfego leste-oeste.",
      "Consultas DNS para domínios raros.",
      "Falhas repetidas de autenticação em VPN/ZTNA/RADIUS."
    ],
    "hardening": [
      "SSH/HTTPS/SNMPv3 apenas pela rede de gestão.",
      "AAA centralizado com conta nominativa.",
      "Backups de configuração e revisão de drift.",
      "Protocolos legados desabilitados.",
      "Regras mínimas por fluxo justificado.",
      "Acesso privilegiado com MFA e logging."
    ],
    "detectionIdeas": [
      "Alerta para any-any criado recentemente.",
      "Alerta para tráfego administrativo iniciado por rede de usuário.",
      "Alerta para comunicação direta entre zona de guest/IoT e servidores internos.",
      "Alerta para egress incomum de servidor de banco.",
      "Alerta para ausência de logs de fonte crítica."
    ]
  },
  "lab": {
    "id": "lab-13.10",
    "title": "Projeto final do Módulo 13: arquitetura defensiva de rede",
    "labType": "security",
    "objective": "Desenhar uma arquitetura defensiva completa, justificando zonas, fluxos, controles, evidências e playbooks.",
    "scenario": "Uma empresa chamada Atlas Saúde possui 600 usuários, Wi-Fi corporativo, rede guest, IoT hospitalar, datacenter pequeno, aplicações internas, banco de dados crítico, VPN/ZTNA, workloads em cloud, pipelines DevSecOps, SOC terceirizado e auditoria prevista. A diretoria quer reduzir risco de ransomware e melhorar investigação sem paralisar atendimento.",
    "topology": "Usuários corporativos, Wi-Fi, guest, IoT, gestão, servidores internos, banco crítico, DMZ, internet, cloud, VPN/ZTNA, SIEM/SOC.",
    "architecture": "Arquitetura híbrida com zonas de segurança, firewall interno, controle de acesso por identidade, logs centralizados, sensores de rede e playbooks.",
    "prerequisites": [
      "Concluir aulas 13.1 a 13.9.",
      "Conhecer VLAN, sub-rede, firewall, DNS, DHCP, VPN, Wi-Fi e cloud networking básico.",
      "Ter editor de texto ou planilha para documentar matriz de fluxos."
    ],
    "tools": [
      "Editor de texto",
      "Planilha",
      "Opcional: draw.io local ou diagrama ASCII/SVG",
      "Opcional: Packet Tracer/GNS3 para simulação conceitual",
      "Opcional: template de matriz de fluxos"
    ],
    "estimatedTimeMinutes": 120,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varreduras, ataques, exploração ou testes em redes reais sem autorização formal.",
      "O laboratório é de arquitetura e documentação defensiva.",
      "Use dados fictícios e não exponha informações reais de empresa."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Inventariar ativos e zonas",
        "instruction": "Liste pelo menos oito zonas e classifique criticidade, dono e finalidade.",
        "command": "Documento: zona | finalidade | criticidade | dono | dados tratados | exposição",
        "expectedOutput": "Tabela com usuários, guest, IoT, servidores, banco, gestão, DMZ, cloud e SOC/logs.",
        "explanation": "Sem inventário e classificação, qualquer desenho de firewall será chute."
      },
      {
        "number": 2,
        "title": "Criar matriz de fluxos",
        "instruction": "Defina os fluxos mínimos necessários entre zonas, incluindo origem, destino, protocolo, porta, justificativa e evidência.",
        "command": "Matriz: origem | destino | serviço | porta | justificativa | controle | log",
        "expectedOutput": "Matriz com fluxos como usuários -> aplicação 443, aplicação -> banco 5432/1433, gestão -> equipamentos SSH/HTTPS, guest -> internet somente.",
        "explanation": "A matriz transforma necessidade de negócio em política técnica."
      },
      {
        "number": 3,
        "title": "Definir controles por fronteira",
        "instruction": "Para cada trust boundary, escolha o controle apropriado: firewall, ACL, security group, ZTNA, NAC, proxy, WAF, NetworkPolicy ou private endpoint.",
        "command": "Documento: fronteira | risco | controle preventivo | controle detectivo | evidência",
        "expectedOutput": "Mapa de controles por fronteira de segurança.",
        "explanation": "Controles precisam estar no caminho real do tráfego; controle fora do caminho não protege o fluxo."
      },
      {
        "number": 4,
        "title": "Planejar telemetria",
        "instruction": "Associe cada fluxo crítico a pelo menos uma fonte de log ou telemetria.",
        "command": "Fontes: DNS, DHCP, firewall, proxy, VPN/ZTNA, IAM, EDR, NDR, flow logs, syslog, cloud audit logs",
        "expectedOutput": "Plano de logs com retenção, dono, criticidade e destino no SIEM.",
        "explanation": "Sem telemetria, a arquitetura não é investigável."
      },
      {
        "number": 5,
        "title": "Criar playbooks mínimos",
        "instruction": "Crie três playbooks: movimento lateral, exfiltração suspeita e acesso administrativo indevido.",
        "command": "Playbook: gatilho | perguntas | evidências | contenção | escalonamento | comunicação | RCA",
        "expectedOutput": "Três playbooks defensivos com ações permitidas e evidências mínimas.",
        "explanation": "Playbook reduz improviso e facilita treinamento de SOC."
      },
      {
        "number": 6,
        "title": "Revisar riscos residuais",
        "instruction": "Liste riscos que permanecem mesmo após os controles e proponha melhorias futuras.",
        "command": "Risco residual | impacto | probabilidade | controle atual | melhoria | prioridade",
        "expectedOutput": "Lista priorizada de riscos e backlog de melhoria.",
        "explanation": "Arquitetura madura reconhece limites e transforma lacunas em plano de evolução."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um pacote de arquitetura defensiva com zonas, matriz de fluxos, controles, logs, playbooks, riscos residuais e resumo executivo.",
    "validation": [
      {
        "check": "Todas as zonas têm dono e finalidade",
        "command": "Revisar tabela de zonas",
        "expected": "Nenhuma zona sem dono, criticidade ou finalidade.",
        "ifFails": "Volte ao inventário e envolva responsável pelo ativo."
      },
      {
        "check": "Cada fluxo permitido tem justificativa",
        "command": "Revisar matriz de fluxos",
        "expected": "Origem, destino, serviço, porta, justificativa, controle e log preenchidos.",
        "ifFails": "Remova fluxo sem justificativa ou marque como risco/pendência."
      },
      {
        "check": "Cada ativo crítico tem evidência de acesso",
        "command": "Revisar plano de logs",
        "expected": "Banco, gestão, cloud, VPN/ZTNA, firewall e IAM enviam logs ao SIEM ou repositório definido.",
        "ifFails": "Registrar lacuna de telemetria e priorizar correção."
      },
      {
        "check": "Playbooks têm contenção proporcional",
        "command": "Revisar playbooks",
        "expected": "Ações de contenção consideram impacto de negócio e preservação de evidência.",
        "ifFails": "Ajustar critérios de severidade e aprovação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Matriz de fluxos ficou enorme",
        "probableCause": "Zonas estão amplas demais ou aplicações não foram agrupadas por função.",
        "howToConfirm": "Verifique se há muitos fluxos repetidos entre os mesmos tipos de ativos.",
        "fix": "Agrupe por serviço, criticidade e padrão de comunicação."
      },
      {
        "symptom": "Não há logs para um fluxo crítico",
        "probableCause": "Controle não está no caminho ou fonte não foi configurada.",
        "howToConfirm": "Mapeie rota real e ponto de enforcement.",
        "fix": "Adicionar logging no firewall/proxy/cloud flow logs ou reposicionar sensor."
      },
      {
        "symptom": "Segmentação proposta quebra aplicação",
        "probableCause": "Dependência não documentada entre serviços.",
        "howToConfirm": "Conversar com dono da aplicação e revisar logs de conexão durante teste controlado.",
        "fix": "Adicionar fluxo justificado, temporário se necessário, com dono e revisão."
      }
    ],
    "improvements": [
      "Transformar matriz de fluxos em regras IaC.",
      "Criar testes automatizados de exposição.",
      "Integrar CMDB/inventário com SIEM.",
      "Criar dashboards por zona e risco.",
      "Executar tabletop trimestral.",
      "Recertificar regras críticas a cada ciclo."
    ],
    "evidenceToCollect": [
      "Tabela de zonas",
      "Matriz de fluxos",
      "Diagrama de arquitetura",
      "Plano de logs",
      "Três playbooks",
      "Lista de riscos residuais",
      "Resumo executivo"
    ],
    "questions": [
      "Qual ativo mais crítico e qual caminho mais perigoso?",
      "Que fluxo você bloquearia primeiro em caso de incidente?",
      "Qual evidência provaria movimento lateral?",
      "Qual regra tem maior risco de virar exceção permanente?"
    ],
    "challenge": "Apresente a arquitetura para dois públicos: equipe técnica e diretoria. A versão técnica deve conter zonas, fluxos, controles e logs. A versão executiva deve explicar risco reduzido, limitações, custo operacional e próximos passos.",
    "solution": "Uma solução madura separa usuários, guest, IoT, gestão, servidores, bancos, DMZ e cloud; aplica menor privilégio; registra fluxos críticos; usa controles por fronteira; cria playbooks; reconhece riscos residuais; e transforma melhorias em backlog priorizado."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma arquitetura defensiva não pode ser substituída por uma ferramenta única?",
      "hints": [
        "Pense em fluxos, pessoas, processos e evidências.",
        "Pense em prevenção, detecção e resposta."
      ],
      "expectedIdeas": [
        "controles complementares",
        "telemetria",
        "processo",
        "limitações",
        "risco residual"
      ],
      "explanation": "Ferramentas são componentes. Arquitetura é o sistema que define onde, por que e como elas são usadas."
    },
    {
      "type": "diagnóstico",
      "question": "Uma regra any-any foi criada para resolver uma implantação urgente. O que você faria depois da estabilização?",
      "hints": [
        "Pense em dono, validade, logs e recorte de fluxo.",
        "Pense em gestão de mudanças."
      ],
      "expectedIdeas": [
        "reduzir escopo",
        "documentar justificativa",
        "definir validade",
        "monitorar",
        "recertificar"
      ],
      "explanation": "Exceções podem existir, mas precisam virar regra específica ou ser removidas."
    },
    {
      "type": "cenário real",
      "question": "Como você explicaria para a diretoria por que logs e SIEM custam dinheiro, mas reduzem impacto?",
      "hints": [
        "Pense em tempo de detecção e investigação.",
        "Pense em evidência para decisão."
      ],
      "expectedIdeas": [
        "menor tempo de resposta",
        "RCA",
        "auditoria",
        "redução de escopo",
        "priorização"
      ],
      "explanation": "Logs não são luxo; são o mecanismo que permite saber o que aconteceu e agir com precisão."
    }
  ],
  "quiz": [
    {
      "id": "q13.10.1",
      "type": "conceito",
      "q": "Qual é a melhor definição de arquitetura defensiva de rede?",
      "opts": [
        "Um desenho integrado de zonas, fluxos, controles, evidências e resposta para reduzir risco operacional e de segurança.",
        "A instalação de um firewall moderno na borda da internet.",
        "A criação de muitas VLANs sem matriz de fluxos.",
        "A compra de SIEM e NDR sem processo de investigação."
      ],
      "a": 0,
      "exp": "Arquitetura defensiva integra controles e processos. Ferramentas isoladas não garantem segurança.",
      "difficulty": "intermediário",
      "topic": "arquitetura"
    },
    {
      "id": "q13.10.2",
      "type": "segurança",
      "q": "Por que uma matriz de fluxos é importante?",
      "opts": [
        "Porque justifica origem, destino, protocolo, porta, controle e evidência de cada comunicação permitida.",
        "Porque substitui firewall.",
        "Porque evita necessidade de logs.",
        "Porque torna todas as redes confiáveis."
      ],
      "a": 0,
      "exp": "A matriz transforma necessidade de negócio em política auditável.",
      "difficulty": "intermediário",
      "topic": "matriz de fluxos"
    },
    {
      "id": "q13.10.3",
      "type": "diagnóstico",
      "q": "Um fluxo legítimo não funciona após segmentação. Qual investigação inicial é mais correta?",
      "opts": [
        "Validar DNS, rota, firewall/security group, identidade, logs e matriz de fluxos.",
        "Remover toda a segmentação.",
        "Criar any-any permanente.",
        "Concluir que a segmentação é inviável."
      ],
      "a": 0,
      "exp": "Troubleshooting deve identificar a camada e o controle envolvidos antes de ampliar permissões.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q13.10.4",
      "type": "cloud",
      "q": "Qual prática reduz exposição em cloud networking?",
      "opts": [
        "Usar endpoints privados, security groups restritivos, flow logs, IAM e revisão de IaC.",
        "Deixar bancos com IP público para facilitar suporte.",
        "Usar security group aberto porque a VPC já é privada.",
        "Desativar flow logs para reduzir todos os riscos."
      ],
      "a": 0,
      "exp": "Controles cloud precisam combinar caminho privado, menor privilégio e telemetria.",
      "difficulty": "intermediário",
      "topic": "cloud"
    },
    {
      "id": "q13.10.5",
      "type": "operação",
      "q": "Qual é um risco de coletar logs sem NTP, DHCP histórico e inventário?",
      "opts": [
        "A linha do tempo e a atribuição de eventos podem ficar incorretas.",
        "Os firewalls deixam de filtrar pacotes automaticamente.",
        "O DNS passa a bloquear conexões TLS.",
        "Os switches perdem VLANs configuradas."
      ],
      "a": 0,
      "exp": "Correlação depende de tempo correto e contexto de IP, usuário e ativo.",
      "difficulty": "intermediário",
      "topic": "logs"
    },
    {
      "id": "q13.10.6",
      "type": "pegadinha",
      "q": "Qual afirmação é mais correta sobre Zero Trust em arquitetura defensiva?",
      "opts": [
        "Zero Trust complementa segmentação, IAM, telemetria e menor privilégio; não elimina a necessidade de rede bem desenhada.",
        "Zero Trust substitui firewall, logs, IAM e segmentação.",
        "Zero Trust é apenas uma VPN com nome novo.",
        "Zero Trust só se aplica a usuários remotos."
      ],
      "a": 0,
      "exp": "Zero Trust é estratégia de acesso e decisão contextual, mas depende de arquitetura e operação coerentes.",
      "difficulty": "avançado",
      "topic": "zero trust"
    }
  ],
  "flashcards": [
    {
      "id": "fc13.10.1",
      "front": "O que é arquitetura defensiva de rede?",
      "back": "É o desenho integrado de zonas, fluxos, controles, telemetria e resposta para reduzir risco e manter operação.",
      "tags": [
        "arquitetura",
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.10.2",
      "front": "O que é matriz de fluxos?",
      "back": "Tabela que documenta origem, destino, serviço, porta, justificativa, controle e log de cada comunicação permitida.",
      "tags": [
        "firewall",
        "segmentação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.10.3",
      "front": "Por que deny by default é importante?",
      "back": "Porque só fluxos justificados são permitidos, reduzindo superfície e exceções invisíveis.",
      "tags": [
        "firewall",
        "política"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.10.4",
      "front": "Qual o papel do SIEM na arquitetura defensiva?",
      "back": "Centralizar, normalizar, correlacionar e apoiar investigação com eventos de múltiplas fontes.",
      "tags": [
        "siem",
        "soc"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.10.5",
      "front": "O que é risco residual?",
      "back": "Risco que permanece mesmo após controles, aceito, monitorado ou priorizado para melhoria futura.",
      "tags": [
        "risco",
        "governança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.10.6",
      "front": "Qual é o erro de uma regra any-any permanente?",
      "back": "Ela amplia acesso sem necessidade, dificulta auditoria e cria caminho de abuso lateral.",
      "tags": [
        "firewall",
        "erro comum"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex13.10.1",
      "type": "arquitetura",
      "prompt": "Liste seis zonas para uma empresa com usuários, servidores, banco, Wi-Fi guest, IoT e cloud. Justifique cada uma.",
      "expectedAnswer": "Exemplo: usuários, guest, IoT, servidores de aplicação, banco crítico, gestão, cloud, DMZ e logs/SOC. A justificativa deve considerar função, risco e fluxo.",
      "explanation": "Zonas devem representar diferenças reais de confiança, função e criticidade."
    },
    {
      "id": "ex13.10.2",
      "type": "segurança",
      "prompt": "Crie três fluxos permitidos e três fluxos negados para a arquitetura da Atlas Saúde.",
      "expectedAnswer": "Permitidos: usuários -> app 443; app -> banco porta específica; gestão -> equipamentos SSH/HTTPS. Negados: guest -> servidores; IoT -> banco; usuários -> gestão.",
      "explanation": "Fluxos devem refletir menor privilégio e necessidade de negócio."
    },
    {
      "id": "ex13.10.3",
      "type": "logs",
      "prompt": "Para um possível movimento lateral, quais fontes de log você priorizaria?",
      "expectedAnswer": "EDR, firewall interno, NDR/NetFlow, DNS, DHCP, IAM, RADIUS/VPN/ZTNA, logs de servidores e SIEM.",
      "explanation": "Movimento lateral exige correlacionar rede, identidade, endpoint e tempo."
    },
    {
      "id": "ex13.10.4",
      "type": "cloud",
      "prompt": "Como adaptar a arquitetura defensiva para uma aplicação publicada em cloud com banco gerenciado?",
      "expectedAnswer": "Usar LB/WAF, subnets separadas, security groups restritivos, private endpoint para banco, flow logs, audit logs, IAM, secrets gerenciados e IaC com revisão.",
      "explanation": "Cloud muda componentes, mas mantém princípios: menor privilégio, caminho privado e telemetria."
    }
  ],
  "challenge": {
    "title": "Desenhe a arquitetura defensiva da Atlas Saúde",
    "scenario": "A Atlas Saúde quer reduzir risco de ransomware, proteger dados sensíveis, melhorar investigação e integrar datacenter com cloud sem paralisar atendimento.",
    "tasks": [
      "Criar mapa de zonas.",
      "Criar matriz de fluxos.",
      "Definir controles por fronteira.",
      "Definir plano de logs e SIEM.",
      "Criar três playbooks mínimos.",
      "Listar riscos residuais e melhorias."
    ],
    "constraints": [
      "Visitantes não podem acessar redes internas.",
      "IoT hospitalar só acessa serviços explicitamente necessários.",
      "Banco crítico não pode ser acessado por estações de usuário.",
      "Administração exige MFA, conta nominativa e rede de gestão.",
      "Cloud deve evitar exposição pública desnecessária.",
      "A solução precisa ser operável por equipe pequena."
    ],
    "expectedDeliverables": [
      "Diagrama de arquitetura",
      "Tabela de zonas",
      "Matriz de fluxos",
      "Plano de logs",
      "Playbooks",
      "Resumo executivo",
      "Backlog de melhorias"
    ],
    "gradingRubric": [
      {
        "criterion": "Zonas e fluxos",
        "points": 25,
        "description": "Zonas coerentes e fluxos mínimos justificados."
      },
      {
        "criterion": "Controles defensivos",
        "points": 25,
        "description": "Firewall, segmentação, IAM, Zero Trust, hardening e cloud aplicados corretamente."
      },
      {
        "criterion": "Telemetria e investigação",
        "points": 20,
        "description": "Logs, SIEM, sensores e playbooks permitem investigação."
      },
      {
        "criterion": "Operabilidade",
        "points": 15,
        "description": "A solução considera custo, equipe, documentação, rollback e revisão."
      },
      {
        "criterion": "Comunicação",
        "points": 15,
        "description": "Entrega técnica e executiva são claras e justificadas."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos o problema em ativos, caminhos e riscos. Depois definimos zonas de segurança baseadas em função e criticidade. Em seguida criamos matriz de fluxos mínimos e escolhemos controles no caminho real do tráfego. Por fim, garantimos que cada fluxo crítico gere evidência e que incidentes tenham playbooks.",
    "steps": [
      "Inventariar ativos e donos.",
      "Classificar criticidade e dados sensíveis.",
      "Desenhar zonas: usuários, guest, IoT, gestão, aplicações, banco, DMZ, cloud e SOC/logs.",
      "Criar matriz de fluxos mínimos.",
      "Aplicar controles: firewall interno, NAC/ZTNA, IAM, WAF, security groups, private endpoints e hardening.",
      "Definir telemetria: DNS, DHCP, firewall, EDR, NDR, IAM, VPN/ZTNA, proxy, cloud logs e SIEM.",
      "Criar playbooks para movimento lateral, exfiltração e acesso administrativo indevido.",
      "Registrar riscos residuais e backlog de melhoria."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar um firewall novo na borda e manter rede interna plana.",
        "whyItIsWrong": "Isso não reduz tráfego leste-oeste nem movimento lateral interno."
      },
      {
        "answer": "Criar muitas VLANs sem matriz de fluxos.",
        "whyItIsWrong": "Segmentação sem política e operação vira complexidade sem segurança mensurável."
      },
      {
        "answer": "Enviar todos os logs para SIEM sem caso de uso.",
        "whyItIsWrong": "Aumenta custo e ruído sem melhorar investigação."
      },
      {
        "answer": "Usar Zero Trust como substituto de hardening e logs.",
        "whyItIsWrong": "Zero Trust depende de identidade, enforcement e telemetria; não substitui arquitetura de rede."
      }
    ],
    "finalAnswer": "A solução recomendada é uma arquitetura por zonas com menor privilégio: guest somente internet; IoT isolado; usuários acessam aplicações por portas específicas; aplicações acessam bancos específicos; gestão em rede separada com MFA e contas nominativas; cloud com endpoints privados e security groups restritivos; firewall e NDR observando tráfego crítico; SIEM correlacionando DNS, DHCP, IAM, EDR, firewall, flow logs e VPN/ZTNA; playbooks documentados; exceções com dono, validade e revisão."
  },
  "glossary": [
    {
      "term": "Arquitetura defensiva",
      "shortDefinition": "Desenho integrado de controles, fluxos, zonas e evidências para reduzir risco.",
      "longDefinition": "Modelo que organiza segmentação, hardening, monitoramento, identidade, resposta e governança em uma rede corporativa.",
      "example": "Separar guest, IoT, usuários, servidores e banco com regras mínimas e logs.",
      "relatedTerms": [
        "defesa em profundidade",
        "segmentação",
        "Zero Trust"
      ],
      "relatedLessons": [
        "13.1",
        "13.2",
        "13.8"
      ]
    },
    {
      "term": "Matriz de fluxos",
      "shortDefinition": "Tabela que justifica comunicações permitidas entre zonas.",
      "longDefinition": "Documento que registra origem, destino, protocolo, porta, justificativa, controle e evidência de cada fluxo.",
      "example": "Aplicação A pode acessar Banco B na porta 5432 porque depende desse banco.",
      "relatedTerms": [
        "firewall",
        "ACL",
        "security group"
      ],
      "relatedLessons": [
        "13.2",
        "13.10"
      ]
    },
    {
      "term": "Trust boundary",
      "shortDefinition": "Fronteira onde o nível de confiança muda e uma política deve ser aplicada.",
      "longDefinition": "Ponto entre zonas, identidades ou sistemas com diferentes riscos e requisitos de controle.",
      "example": "Fronteira entre rede guest e internet; entre app e banco; entre usuário e gestão.",
      "relatedTerms": [
        "zona",
        "PEP",
        "segmentação"
      ],
      "relatedLessons": [
        "13.6",
        "13.8"
      ]
    },
    {
      "term": "Risco residual",
      "shortDefinition": "Risco que permanece após aplicação de controles.",
      "longDefinition": "Risco aceito, monitorado ou priorizado para melhoria futura depois de controles preventivos e detectivos.",
      "example": "Ainda pode haver phishing mesmo com MFA, mas impacto é reduzido por EDR e menor privilégio.",
      "relatedTerms": [
        "risco",
        "controle",
        "mitigação"
      ],
      "relatedLessons": [
        "13.6",
        "13.10"
      ]
    },
    {
      "term": "Telemetria de segurança",
      "shortDefinition": "Dados coletados para monitoramento, detecção e investigação.",
      "longDefinition": "Inclui logs, flows, alertas, eventos de identidade, DNS, DHCP, proxy, firewall, EDR, NDR e cloud logs.",
      "example": "SIEM recebe logs de firewall, DNS, EDR e IAM para correlacionar possível incidente.",
      "relatedTerms": [
        "SIEM",
        "NDR",
        "NetFlow"
      ],
      "relatedLessons": [
        "13.4",
        "13.5"
      ]
    },
    {
      "term": "Recertificação de regras",
      "shortDefinition": "Revisão periódica de permissões e exceções para confirmar necessidade.",
      "longDefinition": "Processo de validar se regras de firewall, security groups e exceções ainda possuem dono, justificativa e validade.",
      "example": "Regra temporária criada para implantação expira em 30 dias se não for renovada com justificativa.",
      "relatedTerms": [
        "firewall",
        "governança",
        "exceção"
      ],
      "relatedLessons": [
        "13.3",
        "13.10"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "NIST Cybersecurity Framework 2.0",
      "organization": "NIST",
      "url": "https://www.nist.gov/cyberframework",
      "note": "Referência para funções de governança, identificação, proteção, detecção, resposta e recuperação."
    },
    {
      "type": "official-doc",
      "title": "NIST SP 800-207 Zero Trust Architecture",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
      "note": "Base conceitual para Zero Trust, PDP, PEP e menor privilégio."
    },
    {
      "type": "official-doc",
      "title": "NIST SP 800-41 Guidelines on Firewalls and Firewall Policy",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final",
      "note": "Referência sobre firewalls e políticas de controle de fluxo."
    },
    {
      "type": "official-doc",
      "title": "NIST SP 800-92 Guide to Computer Security Log Management",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/92/final",
      "note": "Referência para gestão de logs de segurança."
    },
    {
      "type": "official-doc",
      "title": "CISA Zero Trust Maturity Model",
      "organization": "CISA",
      "url": "https://www.cisa.gov/zero-trust-maturity-model",
      "note": "Referência complementar sobre maturidade Zero Trust."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "módulos de IaC e automação",
      "lesson": "referência externa",
      "reason": "A matriz de fluxos e controles deve ser traduzida em IaC, pipelines e policy as code quando possível."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "módulos de autenticação e autorização",
      "lesson": "referência externa",
      "reason": "Zero Trust e menor privilégio dependem de identidade, grupos, postura, MFA, certificados e governança de acesso."
    },
    {
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.1",
      "reason": "O próximo módulo aplica arquitetura defensiva a cloud networking."
    }
  ],
  "pedagogicalMap": {
    "problem": "Redes corporativas precisam ser seguras sem quebrar operação.",
    "concept": "Arquitetura defensiva integra zonas, fluxos, controles, evidências e resposta.",
    "internalMechanism": "Inventário -> classificação -> matriz de fluxos -> controles -> telemetria -> playbooks -> revisão.",
    "realUse": "Projetos de segmentação, cloud, SOC, auditoria, redução de ransomware e Zero Trust.",
    "commonMistake": "Comprar ferramenta ou criar VLANs sem mapear fluxos e evidências.",
    "securityImpact": "Reduz movimento lateral, melhora detecção e torna decisões auditáveis.",
    "operationalImpact": "Exige documentação, gestão de mudanças, revisão periódica e colaboração entre times.",
    "summary": "Arquitetura defensiva é uma disciplina contínua, não um produto."
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
      "14.1"
    ]
  }
};
