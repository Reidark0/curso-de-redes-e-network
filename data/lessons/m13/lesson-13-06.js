export const lesson1306 = {
  "id": "13.6",
  "moduleId": "m13",
  "order": 6,
  "title": "Threat Modeling de Rede: Ativos, Caminhos e Riscos",
  "subtitle": "Como transformar uma arquitetura de rede em um mapa defensivo de ativos críticos, fluxos, fronteiras de confiança, ameaças, controles e evidências.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 350,
  "tags": [
    "redes",
    "segurança",
    "threat modeling",
    "risco",
    "ativos",
    "trust boundary",
    "movimento lateral",
    "zero trust",
    "arquitetura",
    "soc",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewalls, ACLs e políticas ajudam a entender controles de caminho."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.10",
      "reason": "Wi-Fi corporativo seguro é um exemplo de borda de acesso que precisa ser modelada."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação e zonas são base para identificar fronteiras de confiança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "Logs e correlação são necessários para definir evidências dos controles."
    }
  ],
  "objectives": [
    "Explicar por que threat modeling de rede existe e que problema ele resolve.",
    "Identificar ativos críticos, fluxos, caminhos e fronteiras de confiança em uma arquitetura.",
    "Relacionar ameaças plausíveis a caminhos reais de rede, identidade, aplicação, cloud e DevSecOps.",
    "Priorizar riscos considerando impacto, probabilidade, exposição e controles existentes.",
    "Definir controles defensivos e evidências para validar que eles funcionam.",
    "Produzir artefatos práticos: matriz de risco, mapa de caminhos, plano de mitigação e risco residual."
  ],
  "learningOutcomes": [
    "Dado um ativo crítico, o aluno consegue mapear caminhos legítimos e perigosos até ele.",
    "Dado um diagrama de rede, o aluno identifica trust boundaries e zonas com níveis diferentes de confiança.",
    "Dado um risco, o aluno propõe controle preventivo, controle detectivo e evidência de validação.",
    "Dado um ambiente cloud/híbrido, o aluno inclui plano de controle, IAM e pipelines no modelo.",
    "Dado um risco residual, o aluno consegue documentar decisão, dono e próxima revisão."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine que uma empresa concluiu várias melhorias de segurança: separou VLANs, ativou firewall interno, endureceu switches, centralizou logs no SIEM e instalou sensores de rede. Ainda assim, quando alguém pergunta “qual é o caminho mais provável para um incidente chegar ao banco de dados financeiro?”, ninguém consegue responder com segurança. O time sabe que existem controles, mas não sabe se eles cobrem os caminhos reais que um atacante, um malware, uma conta comprometida ou uma falha operacional poderia usar.</p>\n  <p>Threat modeling de rede existe para resolver exatamente esse problema: transformar uma arquitetura em um mapa de riscos raciocinado. Em vez de começar pela pergunta “qual ferramenta devo comprar?”, começamos por perguntas melhores: quais ativos importam, quais caminhos chegam até eles, quais fronteiras de confiança são atravessadas, quais identidades têm acesso, quais serviços estão expostos, quais controles existem, quais logs confirmariam abuso e qual risco residual continua aceito.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma empresa acredita que o servidor de banco de dados está protegido porque fica em uma VLAN separada. Na modelagem, descobre-se que um servidor de aplicação tem acesso amplo ao banco, que o pipeline de deploy tem segredo de conexão, que a rede de administração alcança o servidor, que backups saem para outra zona e que um jump server compartilhado concentra privilégios. A VLAN é apenas uma parte da história.</div>\n  <p>Nesta aula, você aprenderá a olhar para redes como caminhos de risco. A partir daqui, segurança de redes deixa de ser uma coleção de regras e passa a ser uma disciplina de raciocínio sobre ativos, fluxos, ameaças, controles e evidências.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Durante muito tempo, muitas organizações trataram segurança de redes como um problema de perímetro. Colocava-se um firewall na borda, liberavam-se portas necessárias, bloqueava-se o restante e considerava-se a rede “segura”. Esse modelo funcionava melhor quando a maioria dos sistemas ficava em um datacenter próprio, usuários estavam no escritório e aplicações internas eram poucas. Mesmo nessa época, havia falhas: redes planas, contas compartilhadas, administração exposta, exceções antigas e pouca visibilidade sobre tráfego interno.</p>\n  <p>Com a evolução para Wi-Fi corporativo, VPN, cloud, SaaS, containers, Kubernetes, APIs, automação, IAM federado e trabalho remoto, o perímetro ficou fragmentado. O caminho até um ativo crítico pode passar por identidade, rede, aplicação, pipeline, endpoint, storage, DNS, provedor cloud e fornecedor externo. Por isso, métodos de avaliação de risco e modelagem de ameaças ganharam importância: eles ajudam a entender sistemas complexos antes que o incidente revele o caminho por conta própria.</p>\n  <p>A modelagem de ameaças nasceu muito ligada ao desenvolvimento de software e arquitetura de aplicações, mas seus princípios se aplicam muito bem a redes. Diagramas de fluxo, fronteiras de confiança, ativos, ameaças, controles e riscos residuais são úteis para analisar uma aplicação web, uma rede de campus, uma VPC cloud, uma VPN híbrida, uma rede industrial, um ambiente Kubernetes ou uma WLAN corporativa.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é que redes reais possuem muitos caminhos possíveis e nem todos são óbvios. Um diagrama de topologia mostra cabos, VLANs, roteadores e firewalls, mas pode esconder dependências importantes: conta de serviço, segredo de aplicação, regra temporária, NAT, DNS privado, túnel VPN, peering cloud, rota assimétrica, endpoint privado, jump host, ferramenta de backup, EDR, MDM, proxy, pipeline de CI/CD e acesso de fornecedor.</p>\n  <ul>\n    <li><strong>Sem ativos priorizados:</strong> a equipe protege tudo do mesmo jeito e acaba protegendo mal o que é mais importante.</li>\n    <li><strong>Sem caminhos mapeados:</strong> o time não sabe por onde um incidente poderia avançar.</li>\n    <li><strong>Sem fronteiras de confiança:</strong> tráfego entre zonas com níveis diferentes de risco parece normal.</li>\n    <li><strong>Sem hipóteses de ameaça:</strong> controles são escolhidos por moda, não por cenário real.</li>\n    <li><strong>Sem evidências:</strong> mesmo que exista controle, ninguém sabe qual log confirmaria tentativa de abuso.</li>\n    <li><strong>Sem risco residual:</strong> a organização finge que todo risco foi eliminado, quando na prática alguns foram apenas aceitos.</li>\n  </ul>\n  <p>Threat modeling de rede não tenta prever todos os ataques possíveis. Ele cria um modelo útil o suficiente para priorizar controles, revelar lacunas, orientar logs, reduzir movimento lateral e justificar decisões para times técnicos e executivos.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução da segurança de rede pode ser vista como uma mudança de confiança implícita para confiança verificada. No começo, estar “dentro da rede” era considerado suficiente para confiar. Depois vieram VLANs, firewalls internos, NAC, IDS/IPS, SIEM, Zero Trust, microsegmentação, cloud security posture management e policy as code. Threat modeling acompanha essa evolução porque obriga a perguntar onde a confiança muda e onde ela deveria ser reavaliada.</p>\n  <table class=\"comparison-table\">\n    <thead>\n      <tr>\n        <th>Abordagem</th>\n        <th>Como funcionava</th>\n        <th>Limitação</th>\n        <th>O que veio depois</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Perímetro simples</td>\n        <td>Firewall de borda separava internet e rede interna.</td>\n        <td>Tráfego interno era tratado como confiável.</td>\n        <td>Segmentação interna e defesa em profundidade.</td>\n      </tr>\n      <tr>\n        <td>Checklist de controles</td>\n        <td>Aplicava-se uma lista genérica de boas práticas.</td>\n        <td>Não mostrava se os controles cobriam caminhos reais de ataque.</td>\n        <td>Modelagem por ativos, caminhos e riscos.</td>\n      </tr>\n      <tr>\n        <td>Segmentação estática</td>\n        <td>VLANs e ACLs separavam grupos técnicos.</td>\n        <td>Podia ignorar identidade, aplicação, cloud e automação.</td>\n        <td>Zero Trust, IAM contextual e microsegmentação.</td>\n      </tr>\n      <tr>\n        <td>Detecção isolada</td>\n        <td>Cada ferramenta alertava de forma independente.</td>\n        <td>Difícil priorizar e entender impacto.</td>\n        <td>Correlação baseada em risco, ativo e cadeia de ataque.</td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Threat modeling de rede é o processo de representar uma arquitetura de rede de forma suficiente para identificar ativos, fluxos, fronteiras de confiança, caminhos de acesso, ameaças plausíveis, controles existentes, lacunas, evidências e riscos residuais. Ele não substitui pentest, auditoria, hardening ou monitoramento. Ele orienta essas atividades.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> em redes, modelar ameaças significa perguntar “o que estamos protegendo, contra quais eventos, por quais caminhos, com quais controles, com qual evidência e com qual risco residual?”.</div>\n  <p>Uma boa modelagem não precisa começar perfeita. Ela começa com um escopo claro: por exemplo, “proteger o banco de dados financeiro”, “avaliar acesso remoto à rede interna”, “reduzir risco da rede de IoT”, “revisar a VPC de produção” ou “entender caminhos até o Active Directory”. A partir daí, o time desenha fluxos, identifica trust boundaries, lista ameaças, avalia impacto e probabilidade, escolhe controles e define como validar.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O funcionamento interno de uma modelagem de ameaças de rede pode ser visto como um fluxo de análise. Ele começa com escopo e termina com decisões, evidências e revisão contínua.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Definir escopo:</strong> escolha o ativo, serviço, zona, fluxo ou arquitetura que será modelado.</li>\n    <li><strong>Inventariar ativos:</strong> identifique sistemas, dados, usuários, identidades, contas de serviço, chaves, redes e dependências.</li>\n    <li><strong>Mapear fluxos:</strong> descreva quem fala com quem, por qual protocolo, porta, identidade, rota, DNS e política.</li>\n    <li><strong>Marcar fronteiras de confiança:</strong> destaque onde muda o nível de confiança: internet para DMZ, usuário para servidor, cloud para on-premises, pipeline para produção, guest para interno.</li>\n    <li><strong>Identificar ameaças plausíveis:</strong> use hipóteses como credencial comprometida, serviço exposto, movimento lateral, abuso de administração, exfiltração, erro de firewall, DNS indevido ou trust excessivo.</li>\n    <li><strong>Avaliar impacto e probabilidade:</strong> estime consequência, facilidade, exposição, controles existentes e histórico.</li>\n    <li><strong>Escolher controles:</strong> segmentação, MFA, 802.1X, firewall, EDR, hardening, logs, alerta, rate limit, bastion, JIT access, secrets management ou microsegmentação.</li>\n    <li><strong>Definir evidências:</strong> indique logs, métricas e testes que provam que o controle funciona.</li>\n    <li><strong>Registrar risco residual:</strong> descreva o que continua possível mesmo após os controles.</li>\n    <li><strong>Revisar periodicamente:</strong> arquitetura muda; o threat model precisa acompanhar deploys, exceções, novos sistemas e incidentes.</li>\n  </ol>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura de rede, a modelagem de ameaças fica entre desenho técnico, segurança, operação e governança. Ela conversa com diagramas de rede, matriz de fluxos, inventário, CMDB, IAM, SIEM, firewall, cloud, pipelines e resposta a incidente.</p>\n  <ul>\n    <li><strong>Camadas envolvidas:</strong> camada 2, camada 3, camada 4, aplicação, identidade e plano de gestão.</li>\n    <li><strong>Componentes envolvidos:</strong> usuários, endpoints, APs, switches, roteadores, firewalls, VPNs, proxies, DNS, DHCP, servidores, bancos, cloud, pipelines, IAM, SIEM e ferramentas de gestão.</li>\n    <li><strong>Dependências:</strong> inventário confiável, diagramas atualizados, logs, responsáveis por sistemas e entendimento de fluxos reais.</li>\n    <li><strong>Pontos de falha:</strong> exceções antigas, regras any-any, contas compartilhadas, rotas ocultas, jump hosts, pipelines com privilégios excessivos, falta de logs e confiança implícita entre zonas.</li>\n  </ul>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em um hospital. Não basta saber que existe uma porta principal com segurança. É necessário entender quais áreas são críticas, quem pode entrar em cada setor, como medicamentos circulam, onde ficam prontuários, quais elevadores conectam alas, quais fornecedores entram, quais câmeras gravam e o que acontece se alguém com crachá válido tentar acessar uma área indevida.</p>\n  <p>Threat modeling de rede faz algo parecido: não pergunta apenas se existe firewall. Ele pergunta quais áreas são críticas, quais corredores levam a elas, quem tem crachá, quais portas estão abertas, quais câmeras registram, quais controles falham silenciosamente e qual caminho causaria maior impacto.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes mudam mais rápido que prédios. Uma regra de firewall, um peering cloud, um pipeline, um túnel VPN ou uma identidade federada podem criar um novo “corredor” sem obra física visível.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em uma casa, o ativo pode ser o notebook de trabalho. Caminhos de risco incluem Wi-Fi doméstico fraco, roteador sem atualização, senha compartilhada, dispositivo IoT comprometido, DNS adulterado ou backup automático para conta pessoal. Um threat model simples perguntaria: o notebook fica na mesma rede da câmera IP? O roteador registra conexões? A senha Wi-Fi é compartilhada? Existe atualização automática? O tráfego corporativo usa VPN? O que aconteceria se um dispositivo da rede doméstica fosse comprometido?</p>\n  <p>Mesmo em casa, o raciocínio é o mesmo: ativo, caminho, ameaça, controle, evidência e risco residual.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, suponha que o ativo crítico seja o banco de dados financeiro. Caminhos possíveis podem incluir aplicação web, servidor de relatórios, backup, jump server, ferramenta de ETL, pipeline de deploy, VPN de administrador, rede de suporte, conta de serviço e acesso de fornecedor. A modelagem pergunta se cada caminho é necessário, se há menor privilégio, se existe MFA, se o acesso é registrado, se há firewall interno, se o banco aceita conexão de qualquer origem e se a conta de serviço possui permissões excessivas.</p>\n  <p>A saída prática pode ser uma matriz: origem, destino, protocolo, identidade, justificativa, controle, log e dono. Essa matriz vira base para revisão de firewall, regras de SIEM, testes de segmentação, hardening e plano de resposta.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, threat modeling de rede precisa incluir plano de dados e plano de controle. No plano de dados, analisamos VPC/VNet, subnets, security groups, NSGs, NACLs, route tables, load balancers, NAT Gateways, private endpoints, peering e VPN. No plano de controle, analisamos IAM, roles, service principals, policies, pipelines, chaves, logs de auditoria e acesso administrativo.</p>\n  <p>Um erro comum é modelar apenas tráfego IP e esquecer que alguém com permissão IAM pode alterar uma regra, criar uma interface, expor um load balancer, mudar uma rota ou acessar um segredo. Em cloud, caminho de ameaça nem sempre é “pacote passando por firewall”; muitas vezes é “identidade alterando infraestrutura”.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, o threat model deve virar parte do ciclo de mudança. Pull requests de Terraform, Helm, Kubernetes NetworkPolicy, security groups, ingress, DNS, secrets, service accounts e OIDC federation podem criar ou reduzir caminhos de risco. A modelagem ajuda a revisar mudanças antes de produção.</p>\n  <p>Uma prática madura é exigir que mudanças relevantes respondam: qual fluxo novo será permitido, qual ativo será exposto, qual identidade executará a ação, qual controle impede abuso, qual log será gerado, como reverter e qual risco residual foi aceito. Assim, arquitetura defensiva deixa de ser documento estático e vira governança viva.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, threat modeling de rede conecta prevenção, detecção e resposta. Ele ajuda a priorizar onde segmentar, onde exigir MFA, onde coletar logs, onde instalar sensores, onde remover exceções e onde testar controles.</p>\n  <table class=\"risk-table\">\n    <thead>\n      <tr>\n        <th>Risco</th>\n        <th>Como aparece</th>\n        <th>Impacto</th>\n        <th>Mitigação</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Movimento lateral</td>\n        <td>Estações alcançam servidores sem necessidade.</td>\n        <td>Um endpoint comprometido vira ponte para ativos críticos.</td>\n        <td>Segmentação, firewall interno, EDR, logs e menor privilégio.</td>\n      </tr>\n      <tr>\n        <td>Trust boundary ignorada</td>\n        <td>Guest, IoT, produção e administração compartilham caminhos.</td>\n        <td>Zona de baixo controle afeta zona crítica.</td>\n        <td>Zonas formais, matriz de fluxos e revisão de exceções.</td>\n      </tr>\n      <tr>\n        <td>Conta de serviço excessiva</td>\n        <td>Aplicação ou pipeline acessa mais sistemas do que precisa.</td>\n        <td>Comprometimento de segredo amplia impacto.</td>\n        <td>Least privilege, rotação, vault, escopo e auditoria.</td>\n      </tr>\n      <tr>\n        <td>Controle sem evidência</td>\n        <td>Existe regra, mas não há log ou teste de validação.</td>\n        <td>Falha silenciosa durante incidente.</td>\n        <td>Testes periódicos, SIEM, flow logs e evidências de bloqueio.</td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra como um threat model de rede parte de ativos críticos, mapeia caminhos, cruza fronteiras de confiança e associa controles e evidências.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1120 560\" role=\"img\" aria-labelledby=\"tm-title tm-desc\">\n    <title id=\"tm-title\">Threat modeling de rede: ativos, caminhos, trust boundaries e controles</title>\n    <desc id=\"tm-desc\">Usuário, internet, VPN, DMZ, aplicação, banco de dados, pipeline e administração conectados por caminhos avaliados com controles e evidências.</desc>\n    <defs>\n      <marker id=\"arrow-tm\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"55\" width=\"220\" height=\"430\" rx=\"24\" class=\"svg-zone\" />\n    <text x=\"150\" y=\"90\" text-anchor=\"middle\" class=\"svg-label\">Zona não confiável</text>\n    <rect x=\"70\" y=\"140\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"150\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Internet</text>\n    <rect x=\"70\" y=\"300\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"150\" y=\"340\" text-anchor=\"middle\" class=\"svg-label\">VPN Usuário</text>\n\n    <rect x=\"330\" y=\"55\" width=\"250\" height=\"430\" rx=\"24\" class=\"svg-zone\" />\n    <text x=\"455\" y=\"90\" text-anchor=\"middle\" class=\"svg-label\">DMZ / Acesso</text>\n    <rect x=\"375\" y=\"135\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"455\" y=\"176\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <rect x=\"375\" y=\"300\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"455\" y=\"340\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n\n    <rect x=\"655\" y=\"55\" width=\"235\" height=\"430\" rx=\"24\" class=\"svg-zone\" />\n    <text x=\"772\" y=\"90\" text-anchor=\"middle\" class=\"svg-label\">Zona crítica</text>\n    <rect x=\"692\" y=\"210\" width=\"160\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"772\" y=\"244\" text-anchor=\"middle\" class=\"svg-label\">Banco</text>\n    <text x=\"772\" y=\"267\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ativo crítico</text>\n\n    <rect x=\"950\" y=\"80\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"1015\" y=\"121\" text-anchor=\"middle\" class=\"svg-label\">Pipeline</text>\n    <rect x=\"950\" y=\"220\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"1015\" y=\"261\" text-anchor=\"middle\" class=\"svg-label\">IAM</text>\n    <rect x=\"950\" y=\"360\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"1015\" y=\"401\" text-anchor=\"middle\" class=\"svg-label\">SIEM</text>\n\n    <line x1=\"230\" y1=\"175\" x2=\"375\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-tm)\" />\n    <line x1=\"230\" y1=\"335\" x2=\"375\" y2=\"335\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-tm)\" />\n    <line x1=\"455\" y1=\"205\" x2=\"455\" y2=\"300\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-tm)\" />\n    <line x1=\"535\" y1=\"335\" x2=\"692\" y2=\"255\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-tm)\" />\n    <line x1=\"950\" y1=\"115\" x2=\"852\" y2=\"230\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-tm)\" />\n    <line x1=\"950\" y1=\"255\" x2=\"852\" y2=\"255\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-tm)\" />\n    <line x1=\"852\" y1=\"285\" x2=\"950\" y2=\"395\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-tm)\" />\n\n    <line x1=\"295\" y1=\"60\" x2=\"295\" y2=\"485\" class=\"svg-boundary\" />\n    <text x=\"295\" y=\"515\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">trust boundary</text>\n    <line x1=\"620\" y1=\"60\" x2=\"620\" y2=\"485\" class=\"svg-boundary\" />\n    <text x=\"620\" y=\"515\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">trust boundary</text>\n    <text x=\"772\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Controle: firewall interno + IAM + logs</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é defensivo e arquitetural: você vai criar um threat model de rede para proteger um banco de dados financeiro em uma empresa híbrida. O objetivo é produzir artefatos que poderiam ser usados em uma reunião real de segurança: mapa de ativos, fluxos, trust boundaries, ameaças, controles, evidências e riscos residuais.</p>\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam a identificação de ativos, caminhos, fronteiras de confiança, ameaças plausíveis e evidências. A meta não é decorar uma metodologia, mas praticar raciocínio defensivo.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você deverá modelar ameaças para uma arquitetura que possui usuários remotos, Wi-Fi corporativo, aplicação web, banco de dados, pipeline de deploy, VPN de fornecedor e ambiente cloud.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como separar o que é caminho legítimo, caminho perigoso, controle existente, lacuna de evidência e risco residual. A resposta correta não é “bloquear tudo”, mas justificar fluxos necessários com controles adequados.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li>Threat modeling de rede transforma topologia em raciocínio de risco.</li>\n    <li>O ponto de partida é o ativo: dado, sistema, identidade, serviço ou caminho crítico.</li>\n    <li>Trust boundaries mostram onde a confiança muda e onde controles devem ser fortes.</li>\n    <li>Ameaças precisam ser plausíveis e conectadas a caminhos reais.</li>\n    <li>Todo controle deve ter evidência: log, teste, configuração, alerta ou métrica.</li>\n    <li>Risco residual deve ser documentado, aceito, mitigado, transferido ou acompanhado.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você estudará <strong>Ataques Comuns em Rede: Reconhecimento, MITM, Lateral Movement e Exfiltração</strong>. Depois de aprender a modelar caminhos e riscos, o próximo passo é entender, de forma defensiva e ética, quais padrões de comportamento costumam aparecer nesses caminhos durante incidentes reais.</p>\n</section>\n"
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
      "802.1X",
      "IP",
      "TCP",
      "UDP",
      "DNS",
      "DHCP",
      "HTTP",
      "TLS",
      "RADIUS",
      "Syslog"
    ],
    "dependsOn": [
      "Segmentação",
      "Firewall",
      "Logs",
      "IAM",
      "Inventário",
      "SIEM"
    ],
    "enables": [
      "Arquitetura defensiva",
      "Zero Trust",
      "Threat hunting",
      "Resposta a incidente",
      "Revisão de risco"
    ]
  },
  "deepDive": {
    "mentalModel": "Threat modeling de rede é um mapa de perguntas: o que protegemos, por quais caminhos isso pode ser acessado, onde a confiança muda, o que poderia dar errado, qual controle existe, qual evidência prova o controle e qual risco sobra.",
    "keyTerms": [
      "ativo",
      "ameaça",
      "evento de ameaça",
      "vulnerabilidade",
      "trust boundary",
      "controle preventivo",
      "controle detectivo",
      "risco residual",
      "caminho de ataque",
      "matriz de fluxo"
    ],
    "limitations": [
      "Um threat model fica desatualizado se a arquitetura muda e ninguém revisa.",
      "Modelagem não substitui teste técnico, revisão de configuração ou monitoramento.",
      "Risco qualitativo pode variar conforme experiência do time; por isso precisa de critérios claros.",
      "Diagramas incompletos podem esconder caminhos importantes."
    ],
    "whenToUse": [
      "Antes de publicar serviço crítico.",
      "Antes de abrir regra entre zonas.",
      "Durante desenho de rede cloud ou híbrida.",
      "Antes de integrar fornecedor, VPN, peering ou pipeline à produção.",
      "Depois de incidente para revisar caminhos e controles."
    ],
    "whenNotToUse": [
      "Como exercício burocrático sem dono, decisão ou ação.",
      "Como desculpa para não corrigir vulnerabilidades óbvias.",
      "Como substituto de inventário, hardening, logs ou testes.",
      "Quando o escopo está amplo demais para produzir decisões práticas."
    ],
    "operationalImpact": [
      "Exige participação de rede, segurança, infraestrutura, aplicação, cloud, IAM e donos de negócio.",
      "Melhora priorização de controles, mas demanda documentação e revisão periódica.",
      "Ajuda SOC e troubleshooting porque define evidências esperadas para cada caminho crítico."
    ],
    "financialImpact": [
      "Pode reduzir gasto com controles mal posicionados ao priorizar caminhos de maior risco.",
      "Pode aumentar custo de logs, sensores, firewall interno ou microsegmentação quando lacunas são descobertas.",
      "Evita custos maiores ao reduzir probabilidade e impacto de incidentes em ativos críticos."
    ],
    "securityImpact": [
      "Reduz confiança implícita e movimento lateral.",
      "Revela caminhos administrativos e de automação frequentemente esquecidos.",
      "Torna risco residual explícito e auditável."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Começar pela ferramenta em vez do ativo.",
      "whyItHappens": "É comum pensar em firewall, EDR ou SIEM antes de entender o que precisa ser protegido.",
      "consequence": "Controles podem ficar em lugares errados ou cobrir riscos secundários.",
      "correction": "Comece por ativos críticos, caminhos e impacto de negócio."
    },
    {
      "mistake": "Modelar só tráfego IP e esquecer identidade.",
      "whyItHappens": "Times de rede tendem a olhar portas, sub-redes e rotas.",
      "consequence": "Permissões IAM, contas de serviço e pipelines ficam fora do modelo.",
      "correction": "Inclua identidade humana, identidade de máquina, secrets, roles e plano de controle."
    },
    {
      "mistake": "Não registrar risco residual.",
      "whyItHappens": "Parece desconfortável admitir que risco continua existindo.",
      "consequence": "A organização confunde mitigação parcial com eliminação total.",
      "correction": "Documente risco residual, dono, prazo de revisão e critérios de aceite."
    },
    {
      "mistake": "Ignorar evidências.",
      "whyItHappens": "O desenho parece seguro no papel.",
      "consequence": "Durante incidente, ninguém consegue provar se o controle funcionou.",
      "correction": "Associe cada controle a logs, testes, métricas ou alerta."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Regras de firewall sem justificativa",
      "Ativos críticos acessíveis por muitas origens",
      "SIEM sem contexto de zona",
      "Incidente sem linha do tempo",
      "Exceções antigas sem dono",
      "Pipeline com privilégios amplos"
    ],
    "diagnosticQuestions": [
      "Qual ativo estamos protegendo?",
      "Quem precisa acessá-lo e por quê?",
      "Quais caminhos técnicos chegam até ele?",
      "Onde a confiança muda?",
      "Qual controle impede abuso?",
      "Qual log prova tentativa, permissão ou bloqueio?",
      "Qual risco continua aceito?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection servidor-financeiro -Port 1433\nResolve-DnsName servidor-financeiro",
        "purpose": "Validar caminho de rede e resolução de nome a partir de uma origem autorizada.",
        "expectedObservation": "Conectividade somente de origens permitidas e DNS resolvendo para endereço esperado.",
        "interpretation": "Se uma estação comum alcança porta sensível, o threat model deve registrar caminho indevido."
      },
      {
        "platform": "Linux",
        "command": "ip route\ntraceroute servidor-financeiro\nnc -vz servidor-financeiro 1433",
        "purpose": "Observar rota, caminho e abertura de porta em teste autorizado.",
        "expectedObservation": "Acesso permitido apenas para zona ou host esperado.",
        "interpretation": "Rotas e portas abertas ajudam a validar ou refutar o caminho modelado."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route\nshow access-lists\nshow logging",
        "purpose": "Ver rotas, ACLs e evidências de decisão em equipamentos de rede.",
        "expectedObservation": "Rotas e ACLs coerentes com a matriz de fluxos.",
        "interpretation": "Divergência entre configuração e matriz indica risco ou documentação desatualizada."
      }
    ],
    "decisionTree": [
      {
        "if": "Ativo crítico aceita acesso de muitas origens",
        "then": "Mapear fluxos necessários, negar padrão e criar exceções justificadas."
      },
      {
        "if": "Controle existe mas não gera log",
        "then": "Adicionar logging, flow log, alerta ou teste periódico."
      },
      {
        "if": "Caminho depende de conta de serviço ampla",
        "then": "Reduzir escopo, rotacionar segredo e monitorar uso."
      },
      {
        "if": "Risco residual é alto",
        "then": "Escalar para dono de negócio e definir mitigação, prazo ou aceite formal."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Começar por ativos e dados críticos.",
      "Mapear fluxos reais, não apenas topologia ideal.",
      "Marcar fronteiras de confiança explicitamente.",
      "Associar cada controle a uma evidência verificável.",
      "Revisar o threat model quando houver mudança relevante de arquitetura.",
      "Documentar risco residual e dono."
    ],
    "badPractices": [
      "Usar threat model como checklist burocrático.",
      "Ignorar IAM, cloud e pipelines em modelagem de rede.",
      "Assumir que VLAN sozinha resolve risco de movimento lateral.",
      "Aceitar regra any-any sem justificativa, prazo e dono.",
      "Criar diagrama bonito sem matriz de fluxos, controles e evidências."
    ],
    "commonErrors": [
      "Confundir ameaça com vulnerabilidade.",
      "Confundir impacto técnico com impacto de negócio.",
      "Avaliar probabilidade sem considerar exposição e controles existentes.",
      "Registrar controle sem definir como ele será testado."
    ],
    "vulnerabilities": [
      {
        "name": "Caminho lateral não modelado",
        "description": "Um ativo de baixa criticidade tem rota ou permissão até ativo crítico.",
        "defensiveExplanation": "Esse caminho pode ser usado após comprometimento inicial.",
        "mitigation": "Segmentação, firewall interno, monitoramento de fluxos e revisão de permissões."
      },
      {
        "name": "Plano de gestão exposto",
        "description": "Interfaces administrativas ficam acessíveis a redes amplas.",
        "defensiveExplanation": "Administração é caminho privilegiado e deve ter controle forte.",
        "mitigation": "Rede de gestão dedicada, MFA, bastion, AAA, logs e allowlist."
      },
      {
        "name": "Pipeline com privilégio excessivo",
        "description": "Automação consegue alterar produção sem escopo mínimo.",
        "defensiveExplanation": "Comprometimento do pipeline vira caminho para rede e serviços.",
        "mitigation": "OIDC com escopo, approvals, policy as code, secrets management e auditoria."
      }
    ],
    "monitoring": [
      "Flow logs entre zonas",
      "Logs de firewall deny/allow",
      "Eventos IAM e RADIUS",
      "Alterações de regra",
      "Uso de contas de serviço",
      "Acesso administrativo",
      "DNS para ativos críticos"
    ],
    "hardening": [
      "Deny by default",
      "Menor privilégio",
      "MFA administrativo",
      "Gestão por bastion",
      "Rotação de secrets",
      "Revisão de exceções",
      "Controle de drift"
    ],
    "detectionIdeas": [
      "Novo caminho até ativo crítico",
      "Origem inédita acessando serviço sensível",
      "Conta de serviço usada fora do padrão",
      "Aumento de tráfego entre zonas",
      "Alteração de rota ou regra sem change aprovado"
    ]
  },
  "protocolFields": [
    {
      "field": "Origem",
      "size": "variável",
      "purpose": "Identificar usuário, host, subnet, zona ou identidade que inicia o fluxo.",
      "securityObservation": "Origem sem contexto limita avaliação de risco."
    },
    {
      "field": "Destino",
      "size": "variável",
      "purpose": "Identificar ativo, serviço, porta e zona alvo.",
      "securityObservation": "Destino crítico exige controles e logs mais fortes."
    },
    {
      "field": "Trust boundary",
      "size": "conceitual",
      "purpose": "Marcar mudança de confiança entre zonas, identidades ou planos.",
      "securityObservation": "Toda fronteira exige decisão explícita de controle."
    },
    {
      "field": "Evidência",
      "size": "conceitual",
      "purpose": "Definir log, teste ou métrica que valida o controle.",
      "securityObservation": "Controle sem evidência pode falhar silenciosamente."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Usuário remoto",
      "action": "Acessa aplicação via VPN ou ZTNA.",
      "detail": "Autenticação, postura do dispositivo e política definem acesso inicial.",
      "possibleFailure": "VPN ampla permite acesso a redes além do necessário."
    },
    {
      "step": 2,
      "actor": "Aplicação",
      "action": "Conecta ao banco de dados financeiro.",
      "detail": "Fluxo deve ser restrito por origem, porta, identidade e regra justificada.",
      "possibleFailure": "Regra any-any permite movimento lateral de outras origens."
    },
    {
      "step": 3,
      "actor": "Pipeline",
      "action": "Realiza deploy ou migração de schema.",
      "detail": "Identidade de automação acessa produção por caminho privilegiado.",
      "possibleFailure": "Role excessiva permite alteração fora de escopo."
    },
    {
      "step": 4,
      "actor": "SIEM",
      "action": "Correlaciona firewall, IAM, DNS, EDR e flow logs.",
      "detail": "Evidência confirma se o caminho foi legítimo ou suspeito.",
      "possibleFailure": "Falta de logs impede validação do modelo."
    }
  ],
  "trafficCapture": {
    "tool": "Wireshark, tcpdump, flow logs ou registros de firewall em ambiente autorizado",
    "filter": "host <ativo-critico> or port <porta-sensivel>",
    "whatToObserve": [
      "Origem e destino reais",
      "Portas usadas",
      "Tentativas negadas",
      "Volume e frequência",
      "Horário",
      "Relação com autenticação"
    ],
    "interpretation": "A captura ou flow log não substitui o threat model, mas ajuda a validar se os caminhos documentados refletem a realidade."
  },
  "lab": {
    "id": "lab-13.6",
    "title": "Criando um threat model de rede para ativo crítico",
    "labType": "cloud",
    "objective": "Modelar ameaças para proteger um banco de dados financeiro em uma arquitetura híbrida, identificando ativos, fluxos, trust boundaries, ameaças, controles, evidências e riscos residuais.",
    "scenario": "Uma empresa possui usuários remotos, Wi-Fi corporativo, aplicação web na DMZ, banco financeiro em zona crítica, pipeline de deploy, VPN de fornecedor e ambiente cloud conectado por VPN site-to-site. O banco financeiro só deveria ser acessado pela aplicação, pelo pipeline em janelas controladas e por administradores via bastion.",
    "topology": "Usuários/VPN/Wi-Fi -> Firewall/DMZ -> Aplicação -> Banco financeiro; Pipeline/IAM -> Produção; Fornecedor -> VPN restrita; Cloud -> túnel híbrido; Logs -> SIEM.",
    "architecture": "Arquitetura híbrida com zonas de usuário, DMZ, produção, administração, fornecedor, cloud e SIEM.",
    "prerequisites": [
      "Conhecer segmentação e zonas",
      "Conhecer firewall e ACL",
      "Conhecer logs e SIEM",
      "Ter noções de IAM e contas de serviço"
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Opcional: draw.io offline, Excalidraw local ou papel",
      "Opcional: Packet Tracer/GNS3 para representar zonas",
      "Opcional: logs fictícios fornecidos pelo aluno"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não execute testes contra redes reais sem autorização.",
      "Não tente explorar serviços; o laboratório é de arquitetura e defesa.",
      "Não colete tráfego de terceiros.",
      "Use dados fictícios ao documentar usuários, IPs e sistemas.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir escopo",
        "instruction": "Escreva qual ativo será protegido e o que fica fora do exercício.",
        "command": "Escopo: banco financeiro FIN-DB-01; fora do escopo: estações pessoais e sistemas de RH.",
        "expectedOutput": "Escopo claro com ativo, objetivo e limites.",
        "explanation": "Escopo evita que a modelagem vire uma tentativa infinita de modelar toda a empresa."
      },
      {
        "number": 2,
        "title": "Inventariar ativos e identidades",
        "instruction": "Liste sistemas, redes, usuários, contas de serviço e dependências ligadas ao ativo.",
        "command": "Ativos: FIN-DB-01, APP-FIN-01, pipeline-financeiro, bastion-admin, VPN fornecedor, RADIUS, firewall interno, SIEM.",
        "expectedOutput": "Lista de ativos e identidades relevantes.",
        "explanation": "Threat modeling sem inventário tende a esquecer caminhos importantes."
      },
      {
        "number": 3,
        "title": "Mapear fluxos necessários",
        "instruction": "Crie uma matriz com origem, destino, protocolo, porta, identidade, justificativa e dono.",
        "command": "APP-FIN-01 -> FIN-DB-01 -> TCP/1433 -> svc-fin-app -> consulta financeira -> dono: time financeiro.",
        "expectedOutput": "Matriz de fluxos autorizados.",
        "explanation": "Fluxo necessário deve ser explícito. O que não for necessário deve ser bloqueado ou revisado."
      },
      {
        "number": 4,
        "title": "Marcar trust boundaries",
        "instruction": "Indique onde muda o nível de confiança: usuário para DMZ, DMZ para produção, fornecedor para interno, pipeline para produção, cloud para on-premises.",
        "command": "Trust boundary: DMZ -> Produção; Fornecedor -> VPN; Pipeline -> Produção; Cloud -> On-premises.",
        "expectedOutput": "Lista de fronteiras de confiança.",
        "explanation": "Fronteiras são pontos onde controles devem ser mais fortes e auditáveis."
      },
      {
        "number": 5,
        "title": "Listar ameaças plausíveis",
        "instruction": "Para cada caminho, escreva pelo menos uma ameaça plausível e o impacto.",
        "command": "Caminho fornecedor -> VPN -> aplicação: credencial de fornecedor comprometida poderia tentar acessar sistemas fora do escopo.",
        "expectedOutput": "Tabela de ameaças por caminho.",
        "explanation": "Ameaças devem ser plausíveis, ligadas à arquitetura e úteis para decisões."
      },
      {
        "number": 6,
        "title": "Associar controles e evidências",
        "instruction": "Para cada ameaça, indique controle preventivo, detectivo e evidência.",
        "command": "Controle: ACL restritiva + MFA + logs VPN + alerta SIEM para tentativa fora da zona permitida.",
        "expectedOutput": "Matriz ameaça-controle-evidência.",
        "explanation": "Controle sem evidência não ajuda na investigação."
      },
      {
        "number": 7,
        "title": "Avaliar risco residual",
        "instruction": "Defina impacto, probabilidade qualitativa, risco residual e dono.",
        "command": "Risco residual: conta de serviço ainda acessa banco; mitigação futura: rotação automática e escopo menor; dono: plataforma.",
        "expectedOutput": "Registro de risco residual.",
        "explanation": "Nem todo risco desaparece. O importante é deixar claro o que sobra e quem responde."
      },
      {
        "number": 8,
        "title": "Definir plano de validação",
        "instruction": "Descreva como testar se os controles funcionam sem causar impacto.",
        "command": "Teste: origem não autorizada tenta Test-NetConnection/nc para porta do banco; firewall deve negar e SIEM deve registrar.",
        "expectedOutput": "Plano de teste defensivo e evidência esperada.",
        "explanation": "Validação transforma desenho em controle verificável."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um threat model de rede com escopo, ativos, fluxos, trust boundaries, ameaças, controles, evidências, riscos residuais e plano de validação.",
    "validation": [
      {
        "check": "Escopo está claro",
        "command": "Verificar se o documento diz ativo, objetivo e limites",
        "expected": "Um ativo crítico e fronteiras do exercício definidos.",
        "ifFails": "Reduza o escopo para um sistema ou fluxo específico."
      },
      {
        "check": "Fluxos têm justificativa",
        "command": "Revisar matriz origem-destino",
        "expected": "Cada fluxo possui dono, porta, protocolo e motivo.",
        "ifFails": "Remover ou marcar fluxo como exceção pendente."
      },
      {
        "check": "Controles têm evidência",
        "command": "Revisar matriz ameaça-controle-evidência",
        "expected": "Cada controle possui log, teste ou métrica associada.",
        "ifFails": "Adicionar fonte de log ou plano de teste."
      },
      {
        "check": "Risco residual foi documentado",
        "command": "Revisar registro final",
        "expected": "Risco residual, dono e próxima revisão definidos.",
        "ifFails": "Registrar aceite, mitigação ou escalonamento."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "O modelo ficou enorme",
        "probableCause": "Escopo amplo demais",
        "howToConfirm": "Há muitos sistemas sem relação direta com o ativo",
        "fix": "Escolha um ativo ou fluxo crítico e modele em ciclos."
      },
      {
        "symptom": "Ameaças parecem genéricas",
        "probableCause": "Não foram ligadas a caminhos reais",
        "howToConfirm": "A ameaça não menciona origem, destino, identidade ou controle",
        "fix": "Reescrever ameaça usando o fluxo específico."
      },
      {
        "symptom": "Controles não podem ser validados",
        "probableCause": "Falta de logs ou testes",
        "howToConfirm": "Não há evidência associada",
        "fix": "Adicionar logging, flow logs, alerta ou teste controlado."
      },
      {
        "symptom": "Times discordam sobre risco",
        "probableCause": "Critérios de impacto e probabilidade não foram definidos",
        "howToConfirm": "Cada pessoa usa escala diferente",
        "fix": "Definir escala qualitativa simples antes de pontuar."
      }
    ],
    "improvements": [
      "Transformar matriz em backlog de correções",
      "Criar regra SIEM para caminho crítico",
      "Adicionar testes automáticos de política em IaC",
      "Revisar exceções trimestralmente",
      "Criar ADRs para riscos aceitos"
    ],
    "evidenceToCollect": [
      "Mapa de ativos",
      "Matriz de fluxos",
      "Trust boundaries",
      "Tabela ameaça-controle-evidência",
      "Registro de risco residual",
      "Plano de validação"
    ],
    "questions": [
      "Qual caminho até o ativo crítico é mais perigoso?",
      "Qual controle depende de identidade?",
      "Qual controle depende de rede?",
      "Qual log provaria tentativa indevida?",
      "Qual risco residual precisa de aceite formal?"
    ],
    "challenge": "Modele o risco de uma VPN de fornecedor que acessa uma aplicação na DMZ, mas não deveria alcançar o banco financeiro nem a rede administrativa.",
    "solution": "A solução deve criar uma zona de fornecedor, restringir origem e destino, exigir MFA, limitar portas, impedir roteamento lateral, registrar logs VPN/firewall, alertar tentativas fora do escopo e documentar risco residual de credencial comprometida."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que começar por ativo crítico é melhor do que começar por ferramenta?",
      "hints": [
        "Pense em impacto de negócio",
        "Pense em caminho real"
      ],
      "expectedIdeas": [
        "priorização",
        "impacto",
        "controles posicionados",
        "riscos relevantes"
      ],
      "explanation": "Ferramentas só fazem sentido quando sabemos o que proteger e por quais caminhos o risco se manifesta."
    },
    {
      "type": "diagnóstico",
      "question": "Um banco de dados está em VLAN separada, mas vários servidores conseguem acessá-lo. O que você verificaria no threat model?",
      "hints": [
        "Fluxos",
        "Justificativa",
        "Firewall interno",
        "Identidade"
      ],
      "expectedIdeas": [
        "matriz de fluxos",
        "origem autorizada",
        "porta",
        "conta de serviço",
        "logs"
      ],
      "explanation": "Segmentação física/lógica não basta se a política entre zonas permite acesso amplo."
    },
    {
      "type": "cenário real",
      "question": "Como incluir um pipeline de CI/CD na modelagem de ameaças de rede?",
      "hints": [
        "Pense em identidade",
        "Pense em secrets",
        "Pense em plano de controle"
      ],
      "expectedIdeas": [
        "role",
        "service account",
        "secrets",
        "aprovação",
        "logs",
        "escopo mínimo"
      ],
      "explanation": "Pipeline pode alterar infraestrutura ou acessar produção, então é um caminho privilegiado mesmo sem ser um usuário humano."
    }
  ],
  "quiz": [
    {
      "id": "q13.6.1",
      "type": "conceito",
      "q": "Qual é a melhor definição de threat modeling de rede?",
      "opts": [
        "Processo de identificar ativos, caminhos, ameaças, controles, evidências e riscos residuais em uma arquitetura de rede",
        "Ferramenta automática que bloqueia ataques",
        "Lista fixa de comandos de firewall",
        "Substituto de SIEM e EDR"
      ],
      "a": 0,
      "exp": "Threat modeling é processo de análise e decisão, não ferramenta automática.",
      "difficulty": "intermediário",
      "topic": "conceito"
    },
    {
      "id": "q13.6.2",
      "type": "arquitetura",
      "q": "O que uma trust boundary representa?",
      "opts": [
        "Mudança de nível de confiança entre zonas, sistemas, identidades ou fluxos",
        "Somente uma linha de cabo físico",
        "A senha do administrador",
        "A taxa de transferência de um link"
      ],
      "a": 0,
      "exp": "Trust boundary marca onde a confiança muda e onde controles devem ser avaliados.",
      "difficulty": "intermediário",
      "topic": "trust boundary"
    },
    {
      "id": "q13.6.3",
      "type": "diagnóstico",
      "q": "Um controle existe no desenho, mas não há log, teste ou métrica. Qual é o problema?",
      "opts": [
        "O controle pode falhar sem evidência verificável",
        "O controle automaticamente deixa de ser necessário",
        "O controle vira criptografia",
        "A rede deixa de precisar de segmentação"
      ],
      "a": 0,
      "exp": "Controle sem evidência reduz capacidade de validação e investigação.",
      "difficulty": "intermediário",
      "topic": "evidência"
    },
    {
      "id": "q13.6.4",
      "type": "segurança",
      "q": "Por que modelar apenas portas e sub-redes é insuficiente em cloud e DevSecOps?",
      "opts": [
        "Porque IAM, roles, pipelines e plano de controle também criam caminhos de risco",
        "Porque portas TCP não existem em cloud",
        "Porque cloud não usa rede",
        "Porque pipelines não acessam produção"
      ],
      "a": 0,
      "exp": "Em cloud, identidades e automação podem alterar infraestrutura e acessar recursos críticos.",
      "difficulty": "avançado",
      "topic": "cloud"
    },
    {
      "id": "q13.6.5",
      "type": "risco",
      "q": "O que é risco residual?",
      "opts": [
        "Risco que permanece após controles e mitigação",
        "Risco que desaparece quando existe firewall",
        "Risco exclusivamente financeiro",
        "Risco sem dono"
      ],
      "a": 0,
      "exp": "Risco residual precisa ser documentado, aceito, mitigado ou acompanhado.",
      "difficulty": "intermediário",
      "topic": "risco"
    },
    {
      "id": "q13.6.6",
      "type": "operação",
      "q": "Qual artefato ajuda a converter threat modeling em revisão de firewall?",
      "opts": [
        "Matriz de fluxos com origem, destino, protocolo, porta, justificativa e dono",
        "Lista de fabricantes de switches",
        "Velocidade dos links",
        "Nome comercial do SIEM"
      ],
      "a": 0,
      "exp": "A matriz de fluxos conecta arquitetura, necessidade de negócio e política de tráfego.",
      "difficulty": "intermediário",
      "topic": "matriz de fluxos"
    }
  ],
  "flashcards": [
    {
      "id": "fc13.6.1",
      "front": "O que é threat modeling de rede?",
      "back": "Processo de identificar ativos, caminhos, ameaças, controles, evidências e riscos residuais em uma arquitetura de rede.",
      "tags": [
        "threat modeling"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.6.2",
      "front": "O que é trust boundary?",
      "back": "Ponto onde muda o nível de confiança entre zonas, sistemas, identidades ou fluxos.",
      "tags": [
        "trust boundary"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.6.3",
      "front": "Por que controle precisa de evidência?",
      "back": "Porque logs, testes ou métricas permitem provar que o controle funciona e investigar falhas.",
      "tags": [
        "evidência"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.6.4",
      "front": "O que é risco residual?",
      "back": "Risco que permanece após aplicação de controles e mitigação.",
      "tags": [
        "risco"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.6.5",
      "front": "Por que pipelines entram no threat model?",
      "back": "Porque identidades de automação podem alterar infraestrutura, acessar secrets e modificar produção.",
      "tags": [
        "devsecops"
      ],
      "difficulty": "avançado"
    },
    {
      "id": "fc13.6.6",
      "front": "Qual é o erro de uma regra any-any?",
      "back": "Ela permite tráfego amplo sem necessidade explícita, aumentando movimento lateral e dificultando investigação.",
      "tags": [
        "firewall",
        "segmentação"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex13.6.1",
      "type": "conceitual",
      "prompt": "Escolha um ativo crítico e liste três caminhos legítimos até ele.",
      "expectedAnswer": "Exemplo: aplicação web, pipeline de deploy e bastion administrativo.",
      "explanation": "Caminhos legítimos precisam de justificativa, controle e evidência."
    },
    {
      "id": "ex13.6.2",
      "type": "arquitetura",
      "prompt": "Em um fluxo Guest Wi-Fi -> Internet, onde está a trust boundary principal?",
      "expectedAnswer": "Entre rede guest e redes internas; idealmente guest deve sair apenas para internet via firewall/NAT, sem rota para produção.",
      "explanation": "Guest é zona de baixa confiança e deve ser isolada."
    },
    {
      "id": "ex13.6.3",
      "type": "segurança",
      "prompt": "Para o risco 'conta de serviço comprometida acessa banco', proponha controle preventivo, detectivo e evidência.",
      "expectedAnswer": "Preventivo: menor privilégio e vault; detectivo: alerta de uso fora do padrão; evidência: logs IAM, banco, firewall e SIEM.",
      "explanation": "Boa resposta cobre prevenção, detecção e validação."
    },
    {
      "id": "ex13.6.4",
      "type": "cloud",
      "prompt": "Por que um security group correto não elimina risco se uma role IAM pode alterá-lo?",
      "expectedAnswer": "Porque o plano de controle também é caminho de risco; quem altera regra pode criar exposição mesmo sem tráfego inicial.",
      "explanation": "Cloud exige modelar rede e identidade administrativa."
    }
  ],
  "challenge": {
    "title": "Modelar ameaças para uma rede financeira híbrida",
    "scenario": "Uma empresa tem usuários remotos, Wi-Fi corporativo, aplicação financeira na DMZ, banco em zona crítica, pipeline de deploy, VPN de fornecedor e VPC cloud conectada ao datacenter.",
    "tasks": [
      "Definir escopo",
      "Listar ativos críticos",
      "Mapear fluxos permitidos",
      "Marcar trust boundaries",
      "Listar ameaças plausíveis",
      "Propor controles preventivos e detectivos",
      "Definir evidências",
      "Registrar risco residual"
    ],
    "constraints": [
      "Banco não pode ser acessado diretamente por estações comuns",
      "Fornecedor só pode acessar uma aplicação específica",
      "Pipeline não pode ter permissão administrativa ampla",
      "Toda exceção deve ter dono e prazo",
      "A solução deve gerar logs úteis para SOC"
    ],
    "expectedDeliverables": [
      "Mapa textual ou visual",
      "Matriz de fluxos",
      "Tabela ameaça-controle-evidência",
      "Riscos residuais",
      "Plano de validação"
    ],
    "gradingRubric": [
      {
        "criterion": "Escopo e ativos",
        "points": 20,
        "description": "Define claramente o ativo crítico e dependências."
      },
      {
        "criterion": "Fluxos e trust boundaries",
        "points": 25,
        "description": "Mapeia caminhos reais e fronteiras de confiança."
      },
      {
        "criterion": "Ameaças e controles",
        "points": 25,
        "description": "Relaciona ameaças plausíveis a controles preventivos e detectivos."
      },
      {
        "criterion": "Evidências e risco residual",
        "points": 20,
        "description": "Define logs/testes e documenta o risco que sobra."
      },
      {
        "criterion": "Clareza operacional",
        "points": 10,
        "description": "Produz artefatos úteis para rede, segurança e negócio."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa pelo banco financeiro como ativo crítico. Depois identifica caminhos legítimos: aplicação, bastion e pipeline. Em seguida, trata caminhos de maior risco: VPN de fornecedor, Wi-Fi corporativo, cloud híbrida e contas de serviço. Cada caminho precisa de controle e evidência.",
    "steps": [
      "Definir FIN-DB-01 como ativo crítico",
      "Mapear aplicação, bastion, pipeline e backup como dependências",
      "Bloquear acesso direto de estações",
      "Restringir fornecedor a aplicação específica",
      "Reduzir privilégios do pipeline",
      "Criar logs de firewall, IAM, banco e SIEM",
      "Registrar risco residual de credencial comprometida e abuso de conta de serviço"
    ],
    "commonWrongAnswers": [
      {
        "answer": "Basta colocar o banco em outra VLAN",
        "whyItIsWrong": "VLAN ajuda, mas não define identidade, logs, pipeline, fornecedor, bastion ou risco residual."
      },
      {
        "answer": "Liberar qualquer origem interna porque é rede corporativa",
        "whyItIsWrong": "Isso mantém confiança implícita e aumenta movimento lateral."
      },
      {
        "answer": "Coletar logs sem definir caso de uso",
        "whyItIsWrong": "Logs sem pergunta investigativa geram custo e pouco valor."
      }
    ],
    "finalAnswer": "Um threat model adequado documenta que apenas aplicação, bastion e pipeline com escopo mínimo acessam o banco; fornecedor fica restrito à aplicação; estações comuns e guest são bloqueadas; firewall interno, IAM, MFA, secrets management e SIEM sustentam os controles; logs de firewall, IAM, banco e flow logs validam acessos; risco residual de credencial comprometida é registrado com dono e revisão."
  },
  "glossary": [
    {
      "term": "Threat Modeling",
      "shortDefinition": "Processo de identificar ameaças e controles para um sistema ou arquitetura.",
      "longDefinition": "Em redes, é a análise de ativos, caminhos, fronteiras de confiança, ameaças, controles, evidências e riscos residuais.",
      "example": "Modelar caminhos até um banco financeiro antes de abrir regras de firewall.",
      "relatedTerms": [
        "risco",
        "trust boundary",
        "controle"
      ],
      "relatedLessons": [
        "13.1",
        "13.2",
        "13.5"
      ]
    },
    {
      "term": "Trust Boundary",
      "shortDefinition": "Fronteira onde muda o nível de confiança.",
      "longDefinition": "Pode existir entre internet e DMZ, DMZ e produção, usuário e serviço, cloud e datacenter, pipeline e produção.",
      "example": "A transição da rede guest para o firewall interno é uma trust boundary.",
      "relatedTerms": [
        "zona",
        "segmentação"
      ],
      "relatedLessons": [
        "13.2"
      ]
    },
    {
      "term": "Ativo Crítico",
      "shortDefinition": "Sistema, dado ou serviço cujo comprometimento causa alto impacto.",
      "longDefinition": "Ativos críticos orientam priorização de controles e modelagem de caminhos.",
      "example": "Banco financeiro, Active Directory, cofre de secrets ou pipeline de produção.",
      "relatedTerms": [
        "impacto",
        "risco"
      ],
      "relatedLessons": [
        "13.6"
      ]
    },
    {
      "term": "Risco Residual",
      "shortDefinition": "Risco que permanece após controles.",
      "longDefinition": "Deve ser documentado, aceito, mitigado, transferido ou acompanhado.",
      "example": "Ainda existe risco de abuso de conta de serviço mesmo após escopo reduzido.",
      "relatedTerms": [
        "mitigação",
        "aceite de risco"
      ],
      "relatedLessons": [
        "13.6"
      ]
    },
    {
      "term": "Matriz de Fluxos",
      "shortDefinition": "Tabela de origens, destinos, protocolos, portas, justificativas e donos.",
      "longDefinition": "Ajuda a converter arquitetura em política de firewall, logs e testes.",
      "example": "APP-FIN-01 pode acessar FIN-DB-01 em TCP/1433 com conta svc-fin-app.",
      "relatedTerms": [
        "firewall",
        "ACL"
      ],
      "relatedLessons": [
        "13.2"
      ]
    },
    {
      "term": "Caminho de Ataque",
      "shortDefinition": "Sequência de passos ou acessos que pode levar a um objetivo indesejado.",
      "longDefinition": "Em redes, pode envolver endpoint, identidade, VPN, aplicação, firewall, conta de serviço, pipeline e ativo crítico.",
      "example": "Credencial VPN comprometida -> aplicação interna -> banco -> exfiltração.",
      "relatedTerms": [
        "movimento lateral",
        "ameaça"
      ],
      "relatedLessons": [
        "13.7"
      ]
    }
  ],
  "pedagogicalMap": {
    "problem": "Controles existem, mas o time não sabe quais caminhos protegem nem quais riscos permanecem.",
    "concept": "Threat modeling de rede identifica ativos, fluxos, trust boundaries, ameaças, controles, evidências e riscos residuais.",
    "internalMechanism": "Escopo -> ativos -> fluxos -> trust boundaries -> ameaças -> risco -> controles -> evidências -> risco residual.",
    "realUse": "Revisão de arquitetura, firewall, cloud, VPN, fornecedor, pipelines e resposta a incidente.",
    "commonMistake": "Modelar só VLANs e portas, esquecendo IAM, logs, automação e plano de controle.",
    "securityImpact": "Reduz movimento lateral, revela caminhos ocultos e melhora detecção.",
    "operationalImpact": "Exige colaboração entre rede, segurança, aplicação, cloud, IAM e negócio.",
    "summary": "Threat modeling transforma rede em mapa de decisão defensiva."
  },
  "references": [
    {
      "type": "official-doc",
      "title": "SP 800-30 Rev. 1 — Guide for Conducting Risk Assessments",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/30/r1/final",
      "note": "Base para avaliação de risco e decisão sobre cursos de ação."
    },
    {
      "type": "official-doc",
      "title": "SP 800-154 — Guide to Data-Centric System Threat Modeling",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/154/ipd",
      "note": "Referência de modelagem de ameaças orientada a dados e sistemas."
    },
    {
      "type": "official-doc",
      "title": "Threat Modeling Cheat Sheet",
      "organization": "OWASP",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html",
      "note": "Referência prática para fluxos, trust boundaries e visibilidade do sistema."
    },
    {
      "type": "official-doc",
      "title": "MITRE ATT&CK Enterprise Tactics",
      "organization": "MITRE",
      "url": "https://attack.mitre.org/tactics/",
      "note": "Referência para táticas como discovery e lateral movement."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação e zonas sustentam trust boundaries."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "Logs e correlação definem evidências para controles."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "pipeline/IaC",
      "reason": "Pipelines e IaC criam caminhos de mudança que entram no threat model."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM",
      "lesson": "service principals",
      "reason": "Identidades humanas e de máquina são caminhos centrais de risco."
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
      "13.7"
    ]
  }
};
