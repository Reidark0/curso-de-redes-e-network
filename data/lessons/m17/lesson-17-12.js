export const lesson1712 = {
  "id": "17.12",
  "moduleId": "m17",
  "order": 12,
  "title": "Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta",
  "subtitle": "Construa, defenda e diagnostique uma arquitetura corporativa híbrida, segura, observável e governável, consolidando todo o curso Redes e Network.",
  "duration": "480-720 min",
  "estimatedStudyTimeMinutes": 720,
  "difficulty": "avançado",
  "type": "capstone",
  "xp": 650,
  "tags": [
    "capstone",
    "arquitetura",
    "segurança",
    "troubleshooting",
    "cloud networking",
    "wireless",
    "DFIR",
    "DevSecOps",
    "Zero Trust",
    "SIEM",
    "RCA",
    "portfólio",
    "governança",
    "FinOps",
    "avaliação por competência",
    "rubrica",
    "feedback",
    "plano de revisão",
    "matriz de competências",
    "capstone avaliável",
    "critérios de aprovação",
    "P1-11",
    "entregáveis objetivos",
    "matriz de fluxos",
    "plano DNS",
    "plano VPN",
    "observabilidade",
    "rubrica objetiva"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m17",
      "lesson": "17.11",
      "reason": "A auditoria de consolidação fornece o pacote de entrada e os critérios de prontidão para o capstone final."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "reason": "Cloud Networking sustenta VPC/VNet, rotas, DNS privado, Private Link, Kubernetes e observabilidade."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "Troubleshooting, war room, PCAP, RCA e playbooks são usados na investigação final."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m16",
      "reason": "Segurança defensiva, escopo, telemetria e DFIR estruturam a resposta ao incidente simulado."
    }
  ],
  "objectives": [
    "Projetar uma arquitetura de rede corporativa híbrida e cloud com controles defensivos.",
    "Construir matriz de fluxos, plano CIDR, zonas, rotas, DNS e políticas de acesso.",
    "Definir telemetria mínima para troubleshooting, SOC, DFIR, FinOps e auditoria.",
    "Diagnosticar um incidente simulado com método hipótese-evidência.",
    "Produzir RCA técnico e executivo com ações preventivas e riscos residuais.",
    "Entregar um dossiê de portfólio sanitizado e profissional.",
    "Entregar os 12 artefatos obrigatórios do capstone: arquitetura, endereçamento, matriz de fluxos, firewall, DNS, VPN/acesso remoto, cloud, observabilidade, testes, troubleshooting, RCA e rubrica.",
    "Defender a arquitetura usando evidências, trade-offs, riscos residuais, custo, rollback e critérios de aprovação."
  ],
  "learningOutcomes": [
    "Explicar uma arquitetura ponta a ponta do usuário ao serviço gerenciado.",
    "Justificar decisões de segmentação, egress control, Private Endpoint, DNS e logs.",
    "Criar playbook integrado de investigação e resposta proporcional.",
    "Correlacionar evidências de rede, cloud, aplicação, identidade, endpoint e custo.",
    "Defender trade-offs entre segurança, operação, performance, custo e simplicidade.",
    "Transformar o projeto final em artefato de portfólio e base para estudos avançados.",
    "Produzir um dossiê final auditável com entregáveis rastreáveis e pontuação por rubrica.",
    "Executar uma validação ponta a ponta sem depender de ambiente pago, usando simulação local/documental quando necessário."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n  <p>Este é o ponto em que o aluno deixa de estudar redes como uma sequência de tópicos e passa a demonstrar competência como arquiteto, operador, analista de segurança e investigador técnico. Um profissional de redes não é avaliado apenas por saber o que é VLAN, DNS, TLS, BGP ou VPC. Ele é avaliado por conseguir desenhar um ambiente coerente, defender esse ambiente contra riscos previsíveis, diagnosticar falhas sob pressão e explicar decisões para pessoas técnicas e não técnicas.</p>\n  <p>O capstone final existe para juntar tudo: wireless, segurança de redes, cloud networking, troubleshooting, cibersegurança defensiva, simulados, estudos de caso, portfólio e auditoria de consolidação. A pergunta deixa de ser “você lembra o conceito?” e passa a ser “você consegue construir, justificar, validar, operar e melhorar uma arquitetura ponta a ponta?”.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> redes profissionais são sistemas vivos. Elas transportam tráfego, impõem controles, geram evidências, consomem orçamento, sustentam negócios e precisam sobreviver a falhas, mudanças e incidentes.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>Historicamente, redes corporativas começaram relativamente simples: switches, roteadores, servidores locais, alguns firewalls e links dedicados. Com o tempo, apareceram Wi-Fi corporativo, VPN, cloud, SaaS, Kubernetes, Zero Trust, automação, telemetria, SIEM, EDR, NDR e pipelines. O problema deixou de ser apenas “conectar máquinas” e passou a ser “conectar com segurança, governança, custo controlado e evidência”.</p>\n  <p>Também houve uma mudança cultural. Antigamente, muitos ambientes aceitavam redes planas, exceções permanentes e troubleshooting baseado em tentativa e erro. Hoje, ambientes modernos exigem segmentação, menor privilégio, observabilidade, resposta a incidentes, infraestrutura como código, revisão de arquitetura e RCA sem culpa.</p>\n  <p>Este projeto final representa essa evolução: o aluno não vai montar uma topologia isolada, mas uma arquitetura corporativa híbrida e observável que combina datacenter, filial, acesso remoto, Wi-Fi, cloud, aplicações publicadas, serviços privados, Kubernetes, identidade, logs, segurança e operação.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>A empresa fictícia do capstone cresceu rápido. Ela possui matriz, filial, funcionários remotos, Wi-Fi corporativo, aplicações internas, uma aplicação web publicada, workloads em cloud, cluster Kubernetes, banco gerenciado, pipelines DevSecOps e um SOC em amadurecimento. O ambiente funciona, mas a arquitetura está fragmentada: existem subnets mal documentadas, exceções de firewall, DNS híbrido pouco claro, logs incompletos, endpoints públicos desnecessários e custos de egress crescendo.</p>\n  <p>Além disso, ocorreu um incidente recente: parte dos usuários remotos relatou lentidão, a aplicação web apresentou erros intermitentes e o SOC observou tráfego incomum saindo de um workload. Ainda não está claro se a causa foi falha operacional, mudança mal aplicada, problema de DNS, rota assimétrica, regra de firewall, health check incorreto, C2, exfiltração ou combinação de fatores.</p>\n  <p>O desafio é desenhar uma arquitetura melhor, defender os fluxos críticos, criar plano de diagnóstico e produzir artefatos que possam ser auditados. A solução não pode ser “liberar tudo para funcionar”. Ela precisa equilibrar conectividade, segurança, custo, operação e capacidade investigativa.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>A resposta imatura seria resolver sintomas isolados: abrir portas, reiniciar serviços, trocar DNS, desativar WAF, remover uma policy ou ignorar logs de custo. A resposta profissional começa pela arquitetura: quais fluxos devem existir, quais não devem existir, onde os controles ficam, como a evidência é coletada e como as mudanças são validadas.</p>\n  <p>Depois vem a defesa: segmentação, egress control, private endpoints, DNS privado, identidade, menor privilégio, WAF, firewall, logs, detecções e playbooks. Em seguida vem o diagnóstico: linha do tempo, matriz hipótese-evidência, PCAP quando necessário, flow logs, DNS logs, proxy, EDR, SIEM, cloud audit e RCA.</p>\n  <p>Por fim, a arquitetura vira produto operacional. Ela precisa ser documentada, versionada, revisada por pares, testada em pipeline, medida por indicadores e ajustada após incidentes. Esse é o salto entre laboratório acadêmico e prática corporativa.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p>O capstone é um projeto integrador em que você produz uma arquitetura de rede corporativa moderna e demonstra que ela é conectável, defensável, diagnosticável e governável. Conectável significa que fluxos legítimos funcionam. Defensável significa que fluxos desnecessários são bloqueados e que controles reduzem impacto. Diagnosticável significa que, quando algo falha, existem evidências suficientes para investigar. Governável significa que mudanças, exceções, custos e riscos possuem donos e critérios.</p>\n  <p>A arquitetura final deve incluir: mapa lógico, plano CIDR, subnets, VLANs, rotas, gateways, NAT, DNS público e privado, VPN ou link dedicado, hub-spoke, firewalls, SG/NSG/NACL, Private Link/Private Endpoint, load balancer, WAF, TLS, Kubernetes networking, Wi-Fi corporativo, logs, SIEM, playbooks, matriz de fluxos, checklist de risco, plano de rollback e RCA de um incidente simulado.</p>\n  <p>O objetivo não é decorar ferramentas, mas demonstrar raciocínio: por que cada componente existe, qual problema resolve, quais riscos adiciona, como é validado e como aparece nos logs.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Internamente, o capstone funciona como uma cadeia de dependências. Um usuário acessa uma aplicação por DNS, passa por rede local ou remota, atravessa controles de identidade e firewall, chega a um balanceador, negocia TLS, alcança um backend, consulta serviços privados, registra logs e gera métricas. Qualquer elo pode falhar.</p>\n  <p>Ao mesmo tempo, a arquitetura possui planos diferentes. O plano de dados transporta pacotes. O plano de controle define rotas, políticas, DNS, identidade e configuração. O plano de observabilidade coleta sinais. O plano de governança define o que é permitido, quem aprova exceções e como mudanças são auditadas.</p>\n  <p>Um bom projeto final explicita esses planos. Quando a aplicação retorna 503, você não conclui automaticamente que “a rede caiu”. Você verifica DNS, TCP, TLS, WAF, LB, health check, rota, firewall, backend, readiness, logs e mudança recente. Quando há tráfego suspeito, você cruza fluxo, DNS, proxy, EDR, identidade, cloud audit, custo e contexto do ativo.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>A arquitetura proposta usa camadas. Na borda pública ficam DNS público, CDN/WAF e Load Balancer. A aplicação reside em subnets privadas ou cluster Kubernetes com Ingress controlado. Dependências sensíveis, como banco gerenciado e storage, são acessadas por endpoints privados e DNS privado. O tráfego de saída passa por egress control, proxy ou firewall com logs.</p>\n  <p>A conectividade híbrida usa VPN ou link dedicado com BGP, rotas filtradas e hub de conectividade. A matriz e a filial ficam segmentadas por função: usuários, servidores, gerenciamento, voz, Wi-Fi corporativo, convidados e dispositivos especiais. O Wi-Fi usa autenticação corporativa e VLAN dinâmica quando aplicável. O acesso remoto usa identidade, MFA, postura do dispositivo e escopo mínimo.</p>\n  <p>A camada de segurança possui segmentação, firewall, SG/NSG/NACL, WAF, NAC, EDR, NDR, DLP, SIEM e playbooks. A camada de operação possui IaC, revisão de mudanças, testes sintéticos, alertas, runbooks, custos monitorados e RCA. A camada de evidência recebe flow logs, DNS logs, proxy logs, WAF/LB logs, cloud audit, Kubernetes audit, EDR e eventos de identidade.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Imagine uma cidade moderna. As ruas são as redes; os bairros são as zonas; os semáforos e pedágios são firewalls e políticas; os mapas são rotas e DNS; os prédios públicos são serviços críticos; as câmeras e sensores são logs e telemetria; o centro de operações é o SOC.</p>\n  <p>Uma cidade segura não bloqueia todas as ruas, pois as pessoas precisam circular. Mas ela também não deixa qualquer veículo entrar em qualquer área. Existem vias principais, áreas restritas, controle de acesso, sinalização, monitoramento, equipes de emergência e planos para obras. Em redes corporativas acontece o mesmo.</p>\n  <p>O capstone é o planejamento dessa cidade digital. Você precisa desenhar caminhos, justificar bloqueios, permitir serviços essenciais, monitorar eventos, responder a incidentes e melhorar a cidade após cada falha ou quase falha.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em um exemplo simples, um usuário remoto precisa acessar uma aplicação interna. O fluxo esperado é: autenticação com MFA, VPN ou acesso privado, DNS interno resolvendo o nome correto, rota para a subnet da aplicação, firewall permitindo apenas porta necessária, aplicação respondendo via TLS e logs registrando identidade, origem, destino, horário e resultado.</p>\n  <p>Se falhar, você não altera tudo de uma vez. Primeiro confirma se o usuário está autenticado, depois se recebeu rotas, depois se o DNS interno resolve, depois se TCP conecta, depois se TLS é válido, depois se a aplicação responde e, por fim, se há bloqueio em firewall, WAF, LB ou backend.</p>\n  <p>Esse exemplo resume o capstone: fluxo legítimo, controle mínimo necessário, evidência em cada etapa e diagnóstico disciplinado.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>No cenário empresarial, a matriz possui usuários administrativos, equipe de TI, servidores legados, impressoras, Wi-Fi corporativo, Wi-Fi convidado e sistemas internos. A filial precisa acessar apenas aplicações específicas. O datacenter possui AD/DNS, repositórios, ferramentas de monitoramento e um firewall central.</p>\n  <p>A arquitetura separa zonas por função e criticidade. Usuários não acessam diretamente bancos. Wi-Fi convidado só sai para internet. Administração usa bastion e MFA. Servidores críticos têm fluxos explicitamente documentados. Logs de firewall e DNS vão para SIEM. Exceções possuem dono e expiração.</p>\n  <p>O capstone exige transformar esse desenho em matriz de fluxos: origem, destino, porta, protocolo, justificativa, controle, evidência, dono, criticidade e risco residual.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Na cloud, a empresa possui uma Landing Zone com contas ou subscriptions separadas para segurança, logs, conectividade, produção, homologação e desenvolvimento. A rede usa hub-spoke, firewall central, DNS privado, endpoints privados para serviços gerenciados e flow logs habilitados em subnets críticas.</p>\n  <p>Uma aplicação web é publicada por DNS público, WAF, Load Balancer e TLS. O backend roda em Kubernetes ou VMs privadas. O banco gerenciado é acessado por Private Endpoint. O egress passa por NAT ou firewall com logs. O pipeline valida que nenhuma subnet de dados tenha rota pública indevida e que security groups não exponham administração para a internet.</p>\n  <p>O aluno deve justificar custos: NAT, egress, logs, firewall gerenciado, transit, inter-region, WAF e retenção. Segurança sem FinOps vira susto financeiro; economia sem segurança vira risco operacional.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a arquitetura do capstone não é entregue como desenho solto. Ela vira código, política, teste e documentação. Terraform, Bicep, CloudFormation ou módulos equivalentes criam redes, subnets, rotas, SG/NSG, endpoints e logs. Pipelines executam validações antes do merge.</p>\n  <p>Exemplos de guardrails: bloquear porta administrativa pública, exigir flow logs em subnets críticas, exigir tags de dono e custo, impedir CIDR sobreposto, validar que bancos usam endpoints privados, verificar que WAF e TLS estão habilitados para serviços públicos e exigir aprovação para exceções temporárias.</p>\n  <p>O capstone deve incluir um plano de automação: quais componentes seriam versionados, quais políticas seriam testadas, quais evidências o pipeline gera e como o rollback ocorreria se uma mudança quebrasse conectividade.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Do ponto de vista de segurança, a arquitetura precisa reduzir movimento lateral, controlar egress, detectar beaconing, investigar possível exfiltração, proteger DNS, evitar exposição pública indevida, registrar eventos de identidade e preservar evidências. A pergunta não é “tem firewall?”, mas “os fluxos essenciais são permitidos, os fluxos perigosos são negados e os eventos relevantes são visíveis?”.</p>\n  <p>O cenário de incidente do capstone inclui três sintomas: erro intermitente na aplicação web, lentidão para usuários remotos e tráfego incomum saindo de um workload. O aluno deve construir hipóteses defensivas sem pular para conclusões. Pode ser falha de health check, DNS privado incorreto, rota assimétrica, política mal aplicada, processo legítimo ruidoso, C2 ou tentativa de exfiltração.</p>\n  <p>A resposta precisa ser proporcional: contenção mínima, preservação de evidências, comunicação clara, rollback quando necessário, RCA e backlog de melhoria. A investigação não deve incluir exploração ofensiva nem ações fora do escopo autorizado.</p>\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama abaixo representa o fluxo do capstone. Ele liga usuários, matriz, filial, acesso remoto, hub cloud, aplicação publicada, serviços privados, Kubernetes, controles de segurança, telemetria, SIEM, governança, custo e ciclo de melhoria.</p>\n  <div class=\"svg-diagram\">\n    <svg viewBox=\"0 0 1200 720\" xmlns=\"http://www.w3.org/2000/svg\" class=\"course-svg lesson-svg course-svg--capstone-final\" role=\"img\" aria-labelledby=\"svg-title-17-12 svg-desc-17-12\">\n      <title id=\"svg-title-17-12\">Capstone final de arquitetura, defesa e diagnóstico ponta a ponta</title>\n      <desc id=\"svg-desc-17-12\">Diagrama integrando usuários, rede corporativa, hub cloud, borda pública, workloads privados, serviços gerenciados, telemetria, SOC, governança, custos e melhoria contínua.</desc>\n      <defs>\n        <marker id=\"arrow1712\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\"></path></marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"220\" height=\"130\" rx=\"14\" class=\"svg-box\"></rect><text x=\"140\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Usuários</text><text x=\"140\" y=\"105\" text-anchor=\"middle\">Matriz • Filial</text><text x=\"140\" y=\"130\" text-anchor=\"middle\">Wi-Fi • Remoto</text><text x=\"140\" y=\"155\" text-anchor=\"middle\">Identidade • MFA</text>\n      <rect x=\"310\" y=\"40\" width=\"230\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--network\"></rect><text x=\"425\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Rede corporativa</text><text x=\"425\" y=\"105\" text-anchor=\"middle\">VLANs • Gateway</text><text x=\"425\" y=\"130\" text-anchor=\"middle\">DNS • DHCP • NAT</text><text x=\"425\" y=\"155\" text-anchor=\"middle\">Firewall • NAC</text>\n      <rect x=\"600\" y=\"40\" width=\"250\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--cloud\"></rect><text x=\"725\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Hub Cloud</text><text x=\"725\" y=\"105\" text-anchor=\"middle\">VPC/VNet • Rotas</text><text x=\"725\" y=\"130\" text-anchor=\"middle\">VPN/BGP • Transit</text><text x=\"725\" y=\"155\" text-anchor=\"middle\">DNS privado • Logs</text>\n      <rect x=\"910\" y=\"40\" width=\"240\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--security\"></rect><text x=\"1030\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Borda pública</text><text x=\"1030\" y=\"105\" text-anchor=\"middle\">DNS público • CDN</text><text x=\"1030\" y=\"130\" text-anchor=\"middle\">WAF • LB • TLS</text><text x=\"1030\" y=\"155\" text-anchor=\"middle\">Health checks</text>\n      <rect x=\"600\" y=\"250\" width=\"250\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--app\"></rect><text x=\"725\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">Workloads privados</text><text x=\"725\" y=\"315\" text-anchor=\"middle\">Kubernetes • Ingress</text><text x=\"725\" y=\"340\" text-anchor=\"middle\">Services • Pods • CNI</text><text x=\"725\" y=\"365\" text-anchor=\"middle\">NetworkPolicy</text>\n      <rect x=\"910\" y=\"250\" width=\"240\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--data\"></rect><text x=\"1030\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">Dados e serviços</text><text x=\"1030\" y=\"315\" text-anchor=\"middle\">Private Endpoint</text><text x=\"1030\" y=\"340\" text-anchor=\"middle\">Banco • Storage</text><text x=\"1030\" y=\"365\" text-anchor=\"middle\">IAM • Criptografia</text>\n      <rect x=\"310\" y=\"250\" width=\"230\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--control\"></rect><text x=\"425\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">Controles</text><text x=\"425\" y=\"315\" text-anchor=\"middle\">Segmentação</text><text x=\"425\" y=\"340\" text-anchor=\"middle\">Egress control</text><text x=\"425\" y=\"365\" text-anchor=\"middle\">SG/NSG/NACL</text>\n      <rect x=\"30\" y=\"250\" width=\"220\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--ops\"></rect><text x=\"140\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">DevSecOps</text><text x=\"140\" y=\"315\" text-anchor=\"middle\">IaC • Pipeline</text><text x=\"140\" y=\"340\" text-anchor=\"middle\">Policy as code</text><text x=\"140\" y=\"365\" text-anchor=\"middle\">Rollback</text>\n      <rect x=\"120\" y=\"500\" width=\"300\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--telemetry\"></rect><text x=\"270\" y=\"535\" text-anchor=\"middle\" class=\"svg-title\">Telemetria</text><text x=\"270\" y=\"565\" text-anchor=\"middle\">Flow • DNS • Proxy • WAF</text><text x=\"270\" y=\"590\" text-anchor=\"middle\">EDR • Cloud audit • PCAP</text><text x=\"270\" y=\"615\" text-anchor=\"middle\">Billing • Métricas</text>\n      <rect x=\"500\" y=\"500\" width=\"300\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--soc\"></rect><text x=\"650\" y=\"535\" text-anchor=\"middle\" class=\"svg-title\">SOC / War Room</text><text x=\"650\" y=\"565\" text-anchor=\"middle\">Hipótese → Evidência</text><text x=\"650\" y=\"590\" text-anchor=\"middle\">Mitigação • RCA</text><text x=\"650\" y=\"615\" text-anchor=\"middle\">Playbooks</text>\n      <rect x=\"880\" y=\"500\" width=\"250\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--governance\"></rect><text x=\"1005\" y=\"535\" text-anchor=\"middle\" class=\"svg-title\">Governança</text><text x=\"1005\" y=\"565\" text-anchor=\"middle\">Risco • Custo</text><text x=\"1005\" y=\"590\" text-anchor=\"middle\">Exceções • Auditoria</text><text x=\"1005\" y=\"615\" text-anchor=\"middle\">Melhoria contínua</text>\n      <line x1=\"250\" y1=\"105\" x2=\"310\" y2=\"105\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"540\" y1=\"105\" x2=\"600\" y2=\"105\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"850\" y1=\"105\" x2=\"910\" y2=\"105\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line>\n      <line x1=\"725\" y1=\"170\" x2=\"725\" y2=\"250\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"850\" y1=\"325\" x2=\"910\" y2=\"325\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"540\" y1=\"325\" x2=\"600\" y2=\"325\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"250\" y1=\"325\" x2=\"310\" y2=\"325\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line>\n      <line x1=\"425\" y1=\"400\" x2=\"270\" y2=\"500\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"725\" y1=\"400\" x2=\"650\" y2=\"500\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"1030\" y1=\"400\" x2=\"1005\" y2=\"500\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"420\" y1=\"565\" x2=\"500\" y2=\"565\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"800\" y1=\"565\" x2=\"880\" y2=\"565\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line>\n      <path d=\"M1005 630 C900 690, 350 690, 270 630\" class=\"svg-arrow svg-arrow--dashed\" marker-end=\"url(#arrow1712)\"></path>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório final é um projeto de arquitetura e investigação. Você produzirá um dossiê completo com arquitetura alvo, matriz de fluxos, desenho defensivo, plano de observabilidade, playbooks, simulação de incidente, RCA e roadmap de melhoria.</p>\n  <p>O objetivo é criar evidência profissional. O entregável deve ser legível para três públicos: um engenheiro de rede, um analista de segurança e um gestor que precisa entender risco, custo e continuidade.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios desta aula reforçam a capacidade de tomar decisões arquiteturais. Você deverá justificar segmentação, rotas, DNS, endpoints privados, egress control, telemetria e mitigação.</p>\n  <p>Não basta dizer “usaria firewall”. É necessário dizer qual fluxo o firewall controla, qual evidência ele gera, qual risco reduz e como a regra será governada.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n  <p>O desafio final é entregar uma arquitetura completa e defendê-la tecnicamente. Você deverá assumir que haverá uma banca fazendo perguntas: por que esse CIDR? por que esse DNS? por que esse WAF? por que esse NAT? como investigar 503? como provar que não houve exfiltração? como reduzir custo sem perder visibilidade?</p>\n  <p>O desafio força síntese: não é uma prova de memória, é uma prova de integração.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada apresenta um modelo de resposta madura. Ela não é a única arquitetura possível, mas mostra o nível de profundidade esperado: decisões explícitas, trade-offs, riscos residuais, evidências e plano de melhoria.</p>\n  <p>Uma boa solução não tenta ser perfeita. Ela mostra o que foi priorizado, o que ficou como risco aceito, quais controles reduzem impacto e quais sinais permitirão investigação futura.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n  <p>O capstone final consolida o curso: redes físicas e lógicas, protocolos, wireless, cloud networking, segurança, troubleshooting, DFIR, DevSecOps, governança, custo e portfólio.</p>\n  <p>Ao concluir esta aula, o aluno deve ser capaz de desenhar, defender, diagnosticar e explicar uma arquitetura corporativa moderna. Esse é o objetivo final da trilha: transformar fundamentos em competência aplicável.</p>\n</section>\n<p><strong>Avaliação P1-M17:</strong> esta aula agora deve ser corrigida por competência. O aluno não deve olhar apenas a nota final; deve identificar quais competências ficaram abaixo do mínimo, criar trilha de revisão e coletar evidências de reteste.</p><div class=\"content-card\"><h4>Matriz de competências do capstone</h4><p>Use esta matriz para corrigir a aula por competência, não apenas por nota bruta.</p><table class=\"data-table\"><thead><tr><th>Código</th><th>Competência</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead><tbody><tr><td>C01</td><td>Fundamentos, OSI e encapsulamento</td><td>70%</td><td>90%</td><td>explica fluxo de dados por camadas e reconhece onde cada evidência aparece</td></tr><tr><td>C02</td><td>Ethernet, ARP, VLAN, switching e camada 2</td><td>70%</td><td>90%</td><td>diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast</td></tr><tr><td>C03</td><td>IPv4, subnetting, gateway e roteamento básico</td><td>75%</td><td>90%</td><td>calcula redes, identifica rota local/default e justifica escolha de caminho</td></tr><tr><td>C04</td><td>TCP, UDP, portas e serviços essenciais</td><td>75%</td><td>90%</td><td>diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs</td></tr><tr><td>C05</td><td>HTTP, TLS, proxy, firewall, VPN e publicação segura</td><td>75%</td><td>90%</td><td>interpreta erros de aplicação/rede e propõe controles com rollback</td></tr><tr><td>C06</td><td>Wireless, segurança defensiva e Blue Team</td><td>75%</td><td>90%</td><td>define escopo autorizado, telemetria, detecção, contenção e mitigação</td></tr><tr><td>C07</td><td>Cloud Networking, Kubernetes e arquitetura híbrida</td><td>75%</td><td>90%</td><td>projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos</td></tr><tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr></tbody></table></div><div class=\"content-card\"><h4>Critérios finais de aprovação</h4><ul><li>pontuação final mínima de 80%</li><li>nenhuma competência crítica abaixo de 70%</li><li>dossiê completo com arquitetura, fluxos, segurança, observabilidade, troubleshooting, RCA e custos</li><li>defesa técnica capaz de explicar decisões, alternativas rejeitadas e riscos residuais</li><li>plano de melhoria priorizado por risco, custo e esforço</li></ul></div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n  <p>Esta aula encerra o curso Redes e Network v2.0-v2-final como avaliação integradora. O próximo passo natural é usar o dossiê produzido como ponte para os cursos de Infraestrutura Moderna, Platform Engineering e DevSecOps, Enterprise Identity/IAM e futuras trilhas de Cloud Security, Observabilidade/SRE e Sistemas Operacionais.</p>\n  <p>O aluno deve sair com um artefato de portfólio sanitizado: arquitetura, endereçamento, matriz de fluxos, firewall, DNS, VPN/acesso remoto, cloud, observabilidade, testes, troubleshooting, RCA, rubrica e plano de melhoria. Esse pacote é a evidência final de que os fundamentos foram transformados em competência aplicada.</p>\n</section>"
  },
  "diagram": {
    "type": "svg-inline",
    "title": "Capstone final — arquitetura, defesa e diagnóstico ponta a ponta",
    "description": "Diagrama SVG acessível integrando usuários, rede corporativa, hub cloud, borda pública, workloads privados, serviços gerenciados, telemetria, SOC, governança, custos e melhoria contínua.",
    "accessibility": {
      "role": "img",
      "titleId": "svg-title-17-12",
      "descId": "svg-desc-17-12",
      "status": "corrigido no P1-11"
    }
  },
  "lab": {
    "id": "lab-17.12",
    "title": "Laboratório Capstone — 12 entregáveis objetivos de arquitetura, defesa e diagnóstico ponta a ponta",
    "labType": "cloud",
    "objective": "Produzir e defender um dossiê final com 12 entregáveis obrigatórios: arquitetura, endereçamento, matriz de fluxos, firewall, DNS, VPN/acesso remoto, cloud, observabilidade, testes, troubleshooting, RCA e rubrica objetiva.",
    "scenario": "15. Laboratório O laboratório final é um projeto de arquitetura e investigação. Você produzirá um dossiê completo com arquitetura alvo, matriz de fluxos, desenho defensivo, plano de observabilidade, playbooks, simulação de incidente, RCA e roadmap de melhoria. O objetivo é criar evidência profissional. O entregável deve ser legível para três públicos: um engenheiro de rede, um analista de segurança e um gestor que precisa entender risco, custo e continuidade.",
    "topology": "Empresa fictícia com matriz, filial, Wi-Fi corporativo, Wi-Fi convidado, usuários remotos, VPN/link dedicado, hub-spoke cloud, aplicação web publicada, cluster Kubernetes, banco gerenciado via endpoint privado, SOC e pipeline DevSecOps.",
    "architecture": "Arquitetura em camadas: conectividade, segmentação, publicação de serviços, acesso privado, egress control, telemetria, resposta a incidentes, governança e melhoria contínua.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Ambiente Kubernetes local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 720,
    "cost": "zero quando feito como desenho, simulação local e datasets sintéticos; potencialmente pago apenas se o aluno optar por reproduzir partes em cloud real autorizada. Recursos cloud reais devem ser removidos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir cenário e premissas",
        "instruction": "Descreva a empresa, usuários, localidades, aplicações críticas, requisitos de disponibilidade, restrições de custo, requisitos de compliance e limites do projeto.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Documento de escopo com premissas explícitas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Criar inventário e criticidade",
        "instruction": "Liste ativos: usuários, VLANs, subnets, servidores, aplicações, bancos, endpoints privados, contas cloud, clusters, firewalls, DNS, VPN e logs.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Inventário com dono, criticidade, exposição, dependência e evidência esperada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Desenhar plano CIDR, zonas e segmentação",
        "instruction": "Defina blocos CIDR, VLANs, subnets cloud, zonas de segurança e fronteiras entre usuário, gestão, dados, aplicação, convidados, remotos e workloads críticos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mapa de zonas e endereçamento sem sobreposição.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Montar matriz de fluxos",
        "instruction": "Crie uma tabela com origem, destino, porta, protocolo, justificativa, controle, log esperado, dono, criticidade e risco residual.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz de fluxos aprovada para a arquitetura alvo.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Desenhar conectividade híbrida e cloud",
        "instruction": "Inclua VPN ou link dedicado, BGP, route tables, UDR, hub-spoke, firewall central, NAT, Private Endpoint/Private Link, DNS privado e DNS público.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Arquitetura híbrida com roteamento e DNS coerentes.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Publicar serviço web seguro",
        "instruction": "Desenhe DNS público, CDN/WAF, Load Balancer, TLS, health checks, Ingress, backend privado e dependências privadas.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Fluxo de aplicação web publicado com controles e logs.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Projetar egress control e detecção",
        "instruction": "Defina como workloads saem para internet, quais destinos são permitidos, onde ficam proxy/firewall/NAT, quais logs entram no SIEM e quais alertas detectam anomalias.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de egress control e detecção comportamental.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Definir observabilidade e retenção",
        "instruction": "Especifique flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, Kubernetes audit, EDR, SIEM, métricas de custo e retenção mínima.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de evidências para operação, segurança, DFIR e FinOps.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Simular incidente documental",
        "instruction": "Crie uma linha do tempo fictícia com três sintomas: erro intermitente web, lentidão VPN e tráfego anômalo de egress. Não execute ataque; trabalhe com evidências simuladas ou sanitizadas.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Pacote de incidente com sintomas, horários, logs sintéticos e hipóteses.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Executar matriz hipótese-evidência",
        "instruction": "Monte hipóteses para DNS, rota, firewall, TLS, WAF, LB, Kubernetes, VPN, C2, exfiltração e custo. Relacione cada hipótese a fontes e conclusão.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Dossiê de investigação com hipóteses classificadas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Criar mitigação, rollback e RCA",
        "instruction": "Proponha mitigação mínima, plano de rollback, comunicação técnica/executiva, causa técnica, causa sistêmica e ações preventivas.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "RCA completo e plano de melhoria pós-incidente.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Preparar portfólio final",
        "instruction": "Organize README, diagramas, matrizes, playbooks, RCA, checklist, riscos residuais, custos estimados e aprendizados. Sanitize dados sensíveis.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Dossiê final publicável ou apresentável em entrevista técnica.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Montar matriz de competências da aula",
        "instruction": "Crie uma tabela com as competências C01, C02, C03, C04, C05, C06, C07, C08. Para cada uma, registre pontuação, confiança, evidência coletada e lacuna principal.",
        "command": "Tabela sugerida: Competência | Evidência | Pontuação | Confiança | Lacuna | Ação de revisão | Reteste",
        "expectedOutput": "Matriz preenchida com pelo menos uma evidência por competência avaliada.",
        "explanation": "A avaliação deixa de ser uma nota única e passa a mostrar exatamente onde o aluno domina ou precisa revisar."
      },
      {
        "number": 14,
        "title": "Classificar erros e hipóteses de aprendizagem",
        "instruction": "Para cada erro, classifique a causa usando a taxonomia E-CONCEITO, E-CAMADA, E-COMANDO, E-ARQUITETURA, E-SEGURANCA ou E-COMUNICACAO.",
        "command": "Erro | Resposta dada | Resposta correta | Causa | Competência | Aula de revisão | Evidência nova",
        "expectedOutput": "Lista de erros convertida em backlog de revisão objetivo.",
        "explanation": "Erro sem classificação vira repetição. Erro classificado vira plano de estudo e prática."
      },
      {
        "number": 15,
        "title": "Aplicar rubrica e decidir aprovação",
        "instruction": "Some os critérios da rubrica. A aprovação exige 80% geral e nenhuma competência crítica sem evidência mínima.",
        "command": "Pontuação final = soma dos critérios; decisão = aprovado, aprovado com ressalvas ou refazer competência crítica",
        "expectedOutput": "Rubrica preenchida, decisão explícita e justificativa técnica.",
        "explanation": "O aluno aprende a defender a própria conclusão, como aconteceria em revisão técnica, banca ou auditoria."
      },
      {
        "number": 16,
        "title": "Criar trilha de revisão e reteste",
        "instruction": "Para cada competência abaixo do mínimo, defina aula de revisão, mini laboratório, questão de reteste e prazo de nova tentativa.",
        "command": "Competência fraca | Aula de revisão | Mini lab | Reteste | Prazo | Evidência esperada",
        "expectedOutput": "Plano de revisão com ações executáveis em vez de releitura genérica.",
        "explanation": "A trilha de revisão transforma o M17 em sistema de fechamento do curso, não apenas em simulado final."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta”. O resultado final deve incluir matriz de competências, rubrica, feedback por tema, plano de revisão e evidências de reteste.",
    "validation": [
      {
        "check": "O aluno consegue defender o projeto para rede, segurança, cloud, DevSecOps e gestão, demonstrando conectividade, proteção, diagnóstico e governança.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "O aluno consegue defender o projeto para rede, segurança, cloud, DevSecOps e gestão, demonstrando conectividade, proteção, diagnóstico e governança.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Matriz de competências preenchida",
        "command": "verificar tabela de competências",
        "expected": "C01, C02, C03, C04, C05, C06, C07, C08 avaliadas com evidência",
        "ifFails": "volte ao simulado/lab e registre evidências por competência"
      },
      {
        "check": "Rubrica aplicada",
        "command": "somar critérios de avaliação",
        "expected": "80% mínimo geral e competências críticas acima do mínimo",
        "ifFails": "criar trilha de revisão antes de marcar a aula como concluída"
      },
      {
        "check": "Reteste planejado",
        "command": "verificar plano 24-48h",
        "expected": "cada lacuna crítica possui ação prática e prazo",
        "ifFails": "transforme lacunas genéricas em tarefas concretas"
      },
      {
        "check": "Critério final: pontuação final mínima de 80%",
        "command": "revisar dossiê capstone",
        "expected": "critério atendido com evidência",
        "ifFails": "registrar pendência no backlog e corrigir antes da conclusão"
      },
      {
        "check": "Critério final: nenhuma competência crítica abaixo de 70%",
        "command": "revisar dossiê capstone",
        "expected": "critério atendido com evidência",
        "ifFails": "registrar pendência no backlog e corrigir antes da conclusão"
      },
      {
        "check": "Critério final: dossiê completo com arquitetura, fluxos, segurança, observabilidade, troubleshooting, RCA e custos",
        "command": "revisar dossiê capstone",
        "expected": "critério atendido com evidência",
        "ifFails": "registrar pendência no backlog e corrigir antes da conclusão"
      },
      {
        "check": "Critério final: defesa técnica capaz de explicar decisões, alternativas rejeitadas e riscos residuais",
        "command": "revisar dossiê capstone",
        "expected": "critério atendido com evidência",
        "ifFails": "registrar pendência no backlog e corrigir antes da conclusão"
      },
      {
        "check": "Critério final: plano de melhoria priorizado por risco, custo e esforço",
        "command": "revisar dossiê capstone",
        "expected": "critério atendido com evidência",
        "ifFails": "registrar pendência no backlog e corrigir antes da conclusão"
      },
      {
        "check": "Entregável 01 concluído",
        "command": "verificar dossiê: D01",
        "expected": "D01 — Arquitetura lógica ponta a ponta com matriz, filial, Wi-Fi, acesso remoto, hub cloud, workloads privados, borda pública, telemetria e governança.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 02 concluído",
        "command": "verificar dossiê: D02",
        "expected": "D02 — Plano de endereçamento: CIDR, subnets, VLANs, gateways, reservas de crescimento e ausência de sobreposição.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 03 concluído",
        "command": "verificar dossiê: D03",
        "expected": "D03 — Matriz de fluxos: origem, destino, protocolo, porta, justificativa, controle, log esperado, dono, criticidade e risco residual.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 04 concluído",
        "command": "verificar dossiê: D04",
        "expected": "D04 — Política de firewall/ACL/SG/NSG/NACL: allowlist, deny explícito, ordem de regras, shadowing, retorno e exceções com expiração.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 05 concluído",
        "command": "verificar dossiê: D05",
        "expected": "D05 — Plano DNS: público, privado, split-horizon, delegação, registros críticos, resolução em VPN e evidência de troubleshooting.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 06 concluído",
        "command": "verificar dossiê: D06",
        "expected": "D06 — Plano VPN/acesso remoto: autenticação forte, rotas, split tunnel, DNS, logs, perfis, troubleshooting e fallback.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 07 concluído",
        "command": "verificar dossiê: D07",
        "expected": "D07 — Desenho cloud/híbrido: hub-spoke, route tables, Private Endpoint/Private Link, egress control, NAT/firewall, Kubernetes networking e custos.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 08 concluído",
        "command": "verificar dossiê: D08",
        "expected": "D08 — Plano de observabilidade: flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, EDR/NDR/SIEM, métricas e retenção.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 09 concluído",
        "command": "verificar dossiê: D09",
        "expected": "D09 — Evidências de testes: DNS, TCP, TLS, HTTP, rota, firewall allow/deny, endpoint privado, VPN, egress, logs e custo estimado.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 10 concluído",
        "command": "verificar dossiê: D10",
        "expected": "D10 — Runbook de troubleshooting: árvore hipótese-evidência, comandos, fontes de log, critérios de decisão, rollback e comunicação.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 11 concluído",
        "command": "verificar dossiê: D11",
        "expected": "D11 — RCA de incidente simulado: timeline, impacto, causa técnica, causa sistêmica, mitigação, prevenção, riscos residuais e donos.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      },
      {
        "check": "Entregável 12 concluído",
        "command": "verificar dossiê: D12",
        "expected": "D12 — Rubrica objetiva preenchida: pontuação por competência, aprovação/reprovação, lacunas, reteste e plano de melhoria contínua.",
        "ifFails": "Registrar pendência, corrigir artefato, coletar evidência e atualizar a rubrica antes de concluir o capstone."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se a arquitetura ficar grande demais, reduza o escopo mantendo ao menos um fluxo web, um fluxo privado, um fluxo remoto e um fluxo de egress.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se faltar evidência para uma decisão, volte ao plano de observabilidade antes de concluir o RCA.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se uma regra ampla parecer necessária, documente risco, alternativa, prazo e dono da exceção.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se os custos ficarem invisíveis, inclua NAT, egress, logs, firewall, transit e retenção no dossiê.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o diagnóstico ficar opinativo, reestruture em matriz hipótese-evidência.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Converter o dossiê em repositório de portfólio com README e diagramas SVG.",
      "Criar módulos IaC fictícios para rede, logs e controles defensivos.",
      "Adicionar testes de policy as code para bloquear exposição pública indevida.",
      "Criar simulação mensal de war room com novos sintomas.",
      "Integrar este capstone aos cursos de DevSecOps e IAM da universidade.",
      "Adicionar pesos por competência conforme objetivo profissional do aluno.",
      "Repetir o bloco após uma semana para medir retenção real.",
      "Transformar evidências sanitizadas em portfólio técnico.",
      "Versionar o dossiê final como repositório de portfólio com dados sanitizados.",
      "Converter matriz de fluxos e políticas em testes de policy as code.",
      "Criar uma simulação trimestral de incidente com novos logs sintéticos.",
      "Adicionar orçamento FinOps para NAT, egress, firewall, logs, retenção e tráfego entre regiões."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud",
      "matriz de competências preenchida",
      "rubrica com pontuação e justificativa",
      "lista de erros por taxonomia",
      "plano de revisão com mini laboratórios",
      "resultado do reteste ou critério de próxima tentativa",
      "D01 — Arquitetura lógica ponta a ponta com matriz, filial, Wi-Fi, acesso remoto, hub cloud, workloads privados, borda pública, telemetria e governança.",
      "D02 — Plano de endereçamento: CIDR, subnets, VLANs, gateways, reservas de crescimento e ausência de sobreposição.",
      "D03 — Matriz de fluxos: origem, destino, protocolo, porta, justificativa, controle, log esperado, dono, criticidade e risco residual.",
      "D04 — Política de firewall/ACL/SG/NSG/NACL: allowlist, deny explícito, ordem de regras, shadowing, retorno e exceções com expiração.",
      "D05 — Plano DNS: público, privado, split-horizon, delegação, registros críticos, resolução em VPN e evidência de troubleshooting.",
      "D06 — Plano VPN/acesso remoto: autenticação forte, rotas, split tunnel, DNS, logs, perfis, troubleshooting e fallback.",
      "D07 — Desenho cloud/híbrido: hub-spoke, route tables, Private Endpoint/Private Link, egress control, NAT/firewall, Kubernetes networking e custos.",
      "D08 — Plano de observabilidade: flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, EDR/NDR/SIEM, métricas e retenção.",
      "D09 — Evidências de testes: DNS, TCP, TLS, HTTP, rota, firewall allow/deny, endpoint privado, VPN, egress, logs e custo estimado.",
      "D10 — Runbook de troubleshooting: árvore hipótese-evidência, comandos, fontes de log, critérios de decisão, rollback e comunicação.",
      "D11 — RCA de incidente simulado: timeline, impacto, causa técnica, causa sistêmica, mitigação, prevenção, riscos residuais e donos.",
      "D12 — Rubrica objetiva preenchida: pontuação por competência, aprovação/reprovação, lacunas, reteste e plano de melhoria contínua.",
      "Tabela de testes ponta a ponta com resultado esperado, resultado obtido, evidência e decisão.",
      "Checklist de limpeza e custo quando houver qualquer recurso cloud real."
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?",
      "Qual competência ficou mais fraca e qual evidência prova isso?",
      "Qual erro foi conceitual e qual erro foi falta de diagnóstico por evidência?",
      "O que você faria diferente em um ambiente corporativo real?",
      "Qual risco residual permanece mesmo após a correção?",
      "Qual entregável é mais fraco e qual evidência objetiva falta para considerá-lo aprovado?",
      "Qual fluxo legítimo não está bem justificado na matriz de fluxos?",
      "Qual controle de firewall ou egress depende de exceção temporária e quem é o dono dessa exceção?",
      "Qual fonte de log provaria ou refutaria a hipótese principal do incidente?"
    ],
    "challenge": "Defesa técnica do capstone final Entregue também uma matriz de competências com feedback por tema, pontuação por rubrica e trilha de revisão baseada nos erros.",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns. Uma entrega madura não tenta esconder erro: ela mostra pontuação, lacuna, causa, evidência, revisão planejada e reteste. A aprovação só deve ser considerada confiável quando o aluno consegue explicar a resposta correta e demonstrá-la em laboratório ou cenário.",
    "expectedOutcome": "Dossiê capstone completo com arquitetura, matriz de fluxos, plano defensivo, observabilidade, investigação, RCA, backlog de melhoria e portfólio sanitizado.",
    "evaluationMode": true,
    "competencyBased": true,
    "assessmentReference": "assessment-17.12",
    "requiredDeliverables": [
      "D01 — Arquitetura lógica ponta a ponta com matriz, filial, Wi-Fi, acesso remoto, hub cloud, workloads privados, borda pública, telemetria e governança.",
      "D02 — Plano de endereçamento: CIDR, subnets, VLANs, gateways, reservas de crescimento e ausência de sobreposição.",
      "D03 — Matriz de fluxos: origem, destino, protocolo, porta, justificativa, controle, log esperado, dono, criticidade e risco residual.",
      "D04 — Política de firewall/ACL/SG/NSG/NACL: allowlist, deny explícito, ordem de regras, shadowing, retorno e exceções com expiração.",
      "D05 — Plano DNS: público, privado, split-horizon, delegação, registros críticos, resolução em VPN e evidência de troubleshooting.",
      "D06 — Plano VPN/acesso remoto: autenticação forte, rotas, split tunnel, DNS, logs, perfis, troubleshooting e fallback.",
      "D07 — Desenho cloud/híbrido: hub-spoke, route tables, Private Endpoint/Private Link, egress control, NAT/firewall, Kubernetes networking e custos.",
      "D08 — Plano de observabilidade: flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, EDR/NDR/SIEM, métricas e retenção.",
      "D09 — Evidências de testes: DNS, TCP, TLS, HTTP, rota, firewall allow/deny, endpoint privado, VPN, egress, logs e custo estimado.",
      "D10 — Runbook de troubleshooting: árvore hipótese-evidência, comandos, fontes de log, critérios de decisão, rollback e comunicação.",
      "D11 — RCA de incidente simulado: timeline, impacto, causa técnica, causa sistêmica, mitigação, prevenção, riscos residuais e donos.",
      "D12 — Rubrica objetiva preenchida: pontuação por competência, aprovação/reprovação, lacunas, reteste e plano de melhoria contínua."
    ],
    "cleanupPolicy": [
      "Não criar recursos cloud reais sem autorização explícita, orçamento e tag de laboratório.",
      "Se usar cloud real, registrar região, recurso, dono, custo estimado e comando/procedimento de destruição.",
      "Remover NAT Gateway, firewall gerenciado, load balancer, IP público, endpoints, clusters, discos e logs temporários ao final.",
      "Guardar apenas evidências sanitizadas, sem tokens, chaves, IPs sensíveis, nomes reais de clientes ou dados pessoais."
    ]
  },
  "capstoneProject": {
    "scenario": "Empresa híbrida com datacenter, filial, Wi-Fi, acesso remoto, cloud, Kubernetes e aplicação web publicada passando por instabilidade e suspeita de egress anômalo.",
    "requiredDeliverables": [
      "D01 — Arquitetura lógica ponta a ponta com matriz, filial, Wi-Fi, acesso remoto, hub cloud, workloads privados, borda pública, telemetria e governança.",
      "D02 — Plano de endereçamento: CIDR, subnets, VLANs, gateways, reservas de crescimento e ausência de sobreposição.",
      "D03 — Matriz de fluxos: origem, destino, protocolo, porta, justificativa, controle, log esperado, dono, criticidade e risco residual.",
      "D04 — Política de firewall/ACL/SG/NSG/NACL: allowlist, deny explícito, ordem de regras, shadowing, retorno e exceções com expiração.",
      "D05 — Plano DNS: público, privado, split-horizon, delegação, registros críticos, resolução em VPN e evidência de troubleshooting.",
      "D06 — Plano VPN/acesso remoto: autenticação forte, rotas, split tunnel, DNS, logs, perfis, troubleshooting e fallback.",
      "D07 — Desenho cloud/híbrido: hub-spoke, route tables, Private Endpoint/Private Link, egress control, NAT/firewall, Kubernetes networking e custos.",
      "D08 — Plano de observabilidade: flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, EDR/NDR/SIEM, métricas e retenção.",
      "D09 — Evidências de testes: DNS, TCP, TLS, HTTP, rota, firewall allow/deny, endpoint privado, VPN, egress, logs e custo estimado.",
      "D10 — Runbook de troubleshooting: árvore hipótese-evidência, comandos, fontes de log, critérios de decisão, rollback e comunicação.",
      "D11 — RCA de incidente simulado: timeline, impacto, causa técnica, causa sistêmica, mitigação, prevenção, riscos residuais e donos.",
      "D12 — Rubrica objetiva preenchida: pontuação por competência, aprovação/reprovação, lacunas, reteste e plano de melhoria contínua."
    ],
    "rubric": [
      {
        "criterion": "Arquitetura e coerência de fluxos",
        "points": 20,
        "description": "Fluxos legítimos são claros, documentados e conectáveis sem exposição desnecessária."
      },
      {
        "criterion": "Segurança defensiva",
        "points": 20,
        "description": "Segmentação, egress control, identidade, WAF, endpoints privados e menor privilégio reduzem risco."
      },
      {
        "criterion": "Observabilidade e DFIR",
        "points": 20,
        "description": "Logs e métricas permitem investigação por hipótese-evidência e preservação de evidências."
      },
      {
        "criterion": "Troubleshooting e RCA",
        "points": 20,
        "description": "O incidente é investigado com timeline, hipóteses, mitigação, rollback e causa sistêmica."
      },
      {
        "criterion": "Governança, custo e portfólio",
        "points": 20,
        "description": "Exceções, riscos residuais, custos, documentação e sanitização estão tratados."
      }
    ],
    "passingCriteria": "Aprovado com 80 pontos ou mais, nenhum entregável obrigatório ausente e nenhuma competência crítica abaixo do mínimo sem plano de reteste.",
    "validationChecklist": [
      "Todos os 12 entregáveis possuem evidência, dono e critério de aceite.",
      "Nenhum fluxo any-any permanece sem justificativa, expiração e dono.",
      "DNS público e privado estão separados e testáveis.",
      "Acesso remoto/VPN possui rotas, DNS, MFA, logs e fallback documentados.",
      "Cloud/híbrido inclui Private Endpoint/Private Link, egress, route table, custos e limpeza.",
      "Observabilidade cobre operação, segurança, DFIR, auditoria e FinOps.",
      "RCA possui timeline, causa técnica, causa sistêmica, mitigação e prevenção.",
      "Rubrica soma 100 pontos e a aprovação exige mínimo de 80 pontos e competências críticas acima do mínimo."
    ],
    "syntheticIncidentPackage": {
      "title": "Incidente simulado do capstone — lentidão VPN, 503 intermitente e egress anômalo",
      "timeline": [
        "08:40 — mudança de rota cloud aprovada em janela de laboratório.",
        "09:05 — usuários remotos relatam lentidão ao acessar aplicação interna.",
        "09:18 — WAF/LB registra aumento de HTTP 503 intermitente.",
        "09:27 — flow log sintético mostra egress acima do baseline a partir de workload privado.",
        "09:35 — DNS privado apresenta respostas inconsistentes para serviço interno em uma origem.",
        "09:50 — equipe abre war room e cria matriz hipótese-evidência.",
        "10:20 — mitigação reduz impacto sem destruir evidências.",
        "11:00 — RCA separa causa técnica, causa sistêmica e ações preventivas."
      ],
      "syntheticLogs": {
        "dns": [
          "2026-07-01T09:34:11Z client=10.20.8.45 query=api.interno.corp type=A answer=10.40.3.21 view=private rcode=NOERROR ttl=30",
          "2026-07-01T09:34:12Z client=10.88.4.17 query=api.interno.corp type=A answer=198.51.100.44 view=public rcode=NOERROR ttl=300"
        ],
        "flow": [
          "start=2026-07-01T09:27:00Z src=10.40.3.21 dst=203.0.113.80 proto=tcp dport=443 bytes_out=9845120 action=allow tag=egress-anomaly",
          "start=2026-07-01T09:28:00Z src=10.40.3.21 dst=203.0.113.80 proto=tcp dport=443 bytes_out=10022744 action=allow tag=egress-anomaly"
        ],
        "waf": [
          "time=2026-07-01T09:18:31Z host=app.exemplo.test path=/api/pedidos status=503 upstream_status=unhealthy request_id=req-1712-a",
          "time=2026-07-01T09:19:03Z host=app.exemplo.test path=/health status=200 upstream_status=healthy request_id=req-1712-b"
        ],
        "vpn": [
          "time=2026-07-01T09:05:00Z user=usuario.remoto group=vpn-corp assigned_routes=10.0.0.0/8 dns=10.10.10.10 latency_ms=240 warning=high_latency",
          "time=2026-07-01T09:06:30Z user=usuario.remoto split_tunnel=true route_missing=10.40.0.0/16 result=partial_connectivity"
        ]
      },
      "safeUse": "Todos os registros são fictícios, sanitizados e servem apenas para análise defensiva, RCA e treinamento."
    },
    "gradingRubric": [
      {
        "criterion": "Arquitetura, endereçamento e segmentação",
        "points": 15,
        "description": "Arquitetura lógica, CIDR, VLANs, subnets, rotas, DNS e zonas coerentes, sem sobreposição e com crescimento reservado."
      },
      {
        "criterion": "Matriz de fluxos e firewall",
        "points": 15,
        "description": "Fluxos legítimos documentados, regras justificadas, ordem/shadowing revisados, retorno tratado e exceções com dono/prazo."
      },
      {
        "criterion": "VPN, acesso remoto e identidade",
        "points": 10,
        "description": "Acesso remoto com MFA, DNS, rotas, perfis, logs, fallback e menor privilégio."
      },
      {
        "criterion": "Cloud networking e custos",
        "points": 12,
        "description": "Hub-spoke, endpoints privados, egress control, route tables, Kubernetes networking, NAT/firewall/logs e limpeza/custo considerados."
      },
      {
        "criterion": "Observabilidade, testes e evidências",
        "points": 15,
        "description": "Flow logs, DNS, proxy, WAF/LB, VPN, cloud audit, SIEM, testes e evidências sanitizadas sustentam decisões."
      },
      {
        "criterion": "Troubleshooting e RCA",
        "points": 15,
        "description": "Timeline, hipótese-evidência, comandos/fontes, mitigação, rollback, causa técnica, causa sistêmica e prevenção."
      },
      {
        "criterion": "Segurança defensiva, governança e risco residual",
        "points": 10,
        "description": "Controles defensivos, escopo autorizado, riscos residuais, exceções, auditoria e backlog priorizado."
      },
      {
        "criterion": "Comunicação, portfólio e melhoria contínua",
        "points": 8,
        "description": "Resumo executivo, defesa técnica, rubrica preenchida, lacunas, reteste e portfólio sanitizado."
      }
    ]
  },
  "quiz": [
    {
      "question": "Qual é a principal diferença entre uma arquitetura apenas conectável e uma arquitetura profissional?",
      "options": [
        "A profissional sempre usa mais ferramentas",
        "A profissional também é defensável, diagnosticável, governável e justificável",
        "A profissional evita qualquer uso de cloud",
        "A profissional dispensa documentação"
      ],
      "answer": 1,
      "explanation": "Conectividade é apenas um requisito. Arquiteturas profissionais também precisam de controles, evidências, governança, custo e capacidade de diagnóstico."
    },
    {
      "question": "Por que a matriz de fluxos é um entregável central do capstone?",
      "options": [
        "Porque substitui logs",
        "Porque permite justificar origem, destino, porta, protocolo, controle, evidência e risco",
        "Porque elimina a necessidade de firewall",
        "Porque serve apenas para documentação estética"
      ],
      "answer": 1,
      "explanation": "A matriz de fluxos transforma conectividade em decisão auditável e conecta rede, segurança, operação e evidências."
    },
    {
      "question": "Em um erro 503 intermitente em aplicação publicada, qual abordagem é mais profissional?",
      "options": [
        "Desativar WAF e TLS imediatamente",
        "Abrir todas as portas do backend",
        "Correlacionar DNS, LB, health check, WAF, Ingress, backend, logs e mudanças recentes",
        "Assumir que é problema de usuário"
      ],
      "answer": 2,
      "explanation": "Erros web dependem de uma cadeia. A investigação deve correlacionar componentes antes de alterar controles."
    },
    {
      "question": "Qual decisão reduz exposição de serviços gerenciados em cloud?",
      "options": [
        "Colocar banco com IP público temporariamente",
        "Usar endpoint privado com DNS privado e controle de IAM",
        "Permitir acesso direto da internet para facilitar suporte",
        "Remover logs para reduzir ruído"
      ],
      "answer": 1,
      "explanation": "Endpoint privado com DNS privado, IAM e logs reduz exposição e mantém rastreabilidade."
    },
    {
      "question": "O que diferencia um RCA maduro de uma lista de sintomas?",
      "options": [
        "O RCA identifica causa técnica, causa sistêmica, impacto, mitigação, prevenção e evidências",
        "O RCA evita mencionar falhas",
        "O RCA busca culpados",
        "O RCA é sempre curto e sem detalhes técnicos"
      ],
      "answer": 0,
      "explanation": "RCA maduro separa fatos, causa técnica, causa sistêmica, ações e prevenção sem cultura de culpa."
    },
    {
      "question": "Por que custos devem aparecer no capstone de redes?",
      "options": [
        "Porque segurança e rede não têm relação com orçamento",
        "Porque NAT, egress, logs, transit, firewall e retenção podem impactar a viabilidade operacional",
        "Porque custo substitui segurança",
        "Porque só cloud pública possui custo"
      ],
      "answer": 1,
      "explanation": "Decisões de rede e observabilidade geram custo recorrente. FinOps faz parte de arquitetura sustentável."
    }
  ],
  "flashcards": [
    {
      "front": "Arquitetura diagnosticável",
      "back": "Arquitetura com sinais suficientes para investigar falhas e incidentes por evidência, não por suposição."
    },
    {
      "front": "Matriz de fluxos",
      "back": "Tabela que documenta origem, destino, porta, protocolo, justificativa, controle, evidência, dono e risco residual."
    },
    {
      "front": "Egress control",
      "back": "Conjunto de políticas e pontos de inspeção que governam saídas para internet, SaaS, APIs e outros ambientes."
    },
    {
      "front": "RCA sem culpa",
      "back": "Análise que busca causa técnica e sistêmica, prevenção e melhoria contínua, não culpados individuais."
    },
    {
      "front": "Risco residual",
      "back": "Risco que permanece após controles e é documentado com justificativa, dono, prazo ou aceitação formal."
    },
    {
      "front": "Capstone profissional",
      "back": "Projeto final que integra arquitetura, segurança, operação, diagnóstico, governança, custo e portfólio."
    }
  ],
  "mentorQuestions": [
    "Qual parte da sua arquitetura você teria mais dificuldade de defender em uma revisão técnica?",
    "Se amanhã ocorresse um incidente nessa topologia, quais três fontes de evidência seriam indispensáveis?",
    "Qual risco residual você aceitaria temporariamente e qual você consideraria bloqueador de produção?"
  ],
  "exercises": [
    {
      "title": "Matriz de fluxos mínima",
      "prompt": "Crie 12 fluxos essenciais para a empresa fictícia, incluindo usuário remoto, aplicação web, banco privado, DNS, egress, administração e logs.",
      "expectedAnswer": "Tabela com origem, destino, porta, protocolo, justificativa, controle, evidência e risco."
    },
    {
      "title": "Plano de observabilidade",
      "prompt": "Defina quais logs e métricas seriam necessários para investigar erro 503, lentidão VPN e egress anômalo.",
      "expectedAnswer": "Lista correlacionando WAF/LB/Ingress/app, VPN/firewall/DNS e flow/proxy/EDR/cloud audit/billing."
    },
    {
      "title": "RCA executivo e técnico",
      "prompt": "Escreva duas versões de RCA: uma para engenharia e outra para gestão.",
      "expectedAnswer": "Versão técnica com evidências e causa raiz; versão executiva com impacto, decisão, risco e prevenção."
    },
    {
      "title": "Guardrails DevSecOps",
      "prompt": "Liste dez validações de pipeline para impedir erros recorrentes de rede e segurança.",
      "expectedAnswer": "Regras sobre CIDR, rotas públicas, SG/NSG, endpoints privados, logs, tags, WAF/TLS, DNS e exceções."
    },
    {
      "id": "ex17.12.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C01, C02, C03, C04, C05, C06, C07, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "challenge": {
    "title": "Defesa técnica do capstone final",
    "description": "Monte e apresente um dossiê final de arquitetura, defesa e diagnóstico ponta a ponta para uma empresa híbrida com aplicação publicada, workloads privados, usuários remotos, Wi-Fi, cloud, Kubernetes, SOC e incidente simulado.",
    "deliverables": [
      "Diagrama SVG ou ASCII da arquitetura",
      "Matriz de fluxos",
      "Plano CIDR e zonas",
      "Plano DNS e roteamento",
      "Plano de controles defensivos",
      "Plano de observabilidade",
      "Incidente simulado com timeline",
      "Matriz hipótese-evidência",
      "RCA técnico e executivo",
      "Backlog preventivo",
      "Portfólio sanitizado"
    ],
    "constraints": [
      "Sem exploração ofensiva",
      "Sem dados reais sensíveis",
      "Sem liberar regras amplas como solução definitiva",
      "Toda exceção deve ter dono, prazo e justificativa",
      "Toda conclusão deve citar evidência ou lacuna",
      "não considerar a aula concluída sem rubrica preenchida",
      "não usar resposta decorada sem evidência técnica",
      "não avançar com competência crítica abaixo do mínimo sem plano de revisão"
    ],
    "tasks": [
      "Aplicar a rubrica de avaliação por competência.",
      "Gerar feedback por tema e por causa de erro.",
      "Criar trilha de revisão para competências abaixo do mínimo.",
      "Definir reteste objetivo e evidência esperada.",
      "Defender a arquitetura como se estivesse em uma banca técnica.",
      "Apresentar decisão de aprovação do capstone usando a rubrica final de 100 pontos.",
      "Explicar riscos aceitos, riscos mitigados e próximos investimentos recomendados."
    ],
    "expectedDeliverables": [
      "D01 — Arquitetura lógica ponta a ponta com matriz, filial, Wi-Fi, acesso remoto, hub cloud, workloads privados, borda pública, telemetria e governança.",
      "D02 — Plano de endereçamento: CIDR, subnets, VLANs, gateways, reservas de crescimento e ausência de sobreposição.",
      "D03 — Matriz de fluxos: origem, destino, protocolo, porta, justificativa, controle, log esperado, dono, criticidade e risco residual.",
      "D04 — Política de firewall/ACL/SG/NSG/NACL: allowlist, deny explícito, ordem de regras, shadowing, retorno e exceções com expiração.",
      "D05 — Plano DNS: público, privado, split-horizon, delegação, registros críticos, resolução em VPN e evidência de troubleshooting.",
      "D06 — Plano VPN/acesso remoto: autenticação forte, rotas, split tunnel, DNS, logs, perfis, troubleshooting e fallback.",
      "D07 — Desenho cloud/híbrido: hub-spoke, route tables, Private Endpoint/Private Link, egress control, NAT/firewall, Kubernetes networking e custos.",
      "D08 — Plano de observabilidade: flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, EDR/NDR/SIEM, métricas e retenção.",
      "D09 — Evidências de testes: DNS, TCP, TLS, HTTP, rota, firewall allow/deny, endpoint privado, VPN, egress, logs e custo estimado.",
      "D10 — Runbook de troubleshooting: árvore hipótese-evidência, comandos, fontes de log, critérios de decisão, rollback e comunicação.",
      "D11 — RCA de incidente simulado: timeline, impacto, causa técnica, causa sistêmica, mitigação, prevenção, riscos residuais e donos.",
      "D12 — Rubrica objetiva preenchida: pontuação por competência, aprovação/reprovação, lacunas, reteste e plano de melhoria contínua.",
      "Matriz de competências com pontuação e confiança.",
      "Rubrica preenchida com justificativa.",
      "Feedback por tema: fundamento, diagnóstico, arquitetura, segurança, cloud e comunicação.",
      "Plano de revisão baseado em erros e reteste.",
      "Checklist de aprovação ou decisão de refazer competência crítica.",
      "diagrama de arquitetura ponta a ponta",
      "plano CIDR/subnets/VLANs/rotas/DNS",
      "matriz de fluxos e políticas",
      "plano de telemetria: flow logs, DNS, proxy, WAF, firewall, cloud audit, EDR/NDR/SIEM",
      "cenário de incidente, linha do tempo, hipóteses, evidências, decisão e RCA",
      "rubrica preenchida por competência",
      "checklist de limpeza/custos para recursos cloud",
      "backlog de melhoria contínua"
    ],
    "successCriteria": [
      "Cada competência tem evidência observável.",
      "Cada erro tem causa classificada.",
      "A rubrica sustenta a decisão de aprovação.",
      "O plano de revisão tem tarefa prática e prazo.",
      "Os 12 entregáveis obrigatórios estão completos, coerentes entre si e sustentados por evidência.",
      "A rubrica justifica a decisão de aprovação, aprovação com ressalvas ou refazer competência crítica.",
      "O dossiê pode ser apresentado como portfólio sanitizado sem expor dados sensíveis."
    ],
    "gradingRubric": [
      {
        "criterion": "Arquitetura, endereçamento e segmentação",
        "points": 15,
        "description": "Arquitetura lógica, CIDR, VLANs, subnets, rotas, DNS e zonas coerentes, sem sobreposição e com crescimento reservado."
      },
      {
        "criterion": "Matriz de fluxos e firewall",
        "points": 15,
        "description": "Fluxos legítimos documentados, regras justificadas, ordem/shadowing revisados, retorno tratado e exceções com dono/prazo."
      },
      {
        "criterion": "VPN, acesso remoto e identidade",
        "points": 10,
        "description": "Acesso remoto com MFA, DNS, rotas, perfis, logs, fallback e menor privilégio."
      },
      {
        "criterion": "Cloud networking e custos",
        "points": 12,
        "description": "Hub-spoke, endpoints privados, egress control, route tables, Kubernetes networking, NAT/firewall/logs e limpeza/custo considerados."
      },
      {
        "criterion": "Observabilidade, testes e evidências",
        "points": 15,
        "description": "Flow logs, DNS, proxy, WAF/LB, VPN, cloud audit, SIEM, testes e evidências sanitizadas sustentam decisões."
      },
      {
        "criterion": "Troubleshooting e RCA",
        "points": 15,
        "description": "Timeline, hipótese-evidência, comandos/fontes, mitigação, rollback, causa técnica, causa sistêmica e prevenção."
      },
      {
        "criterion": "Segurança defensiva, governança e risco residual",
        "points": 10,
        "description": "Controles defensivos, escopo autorizado, riscos residuais, exceções, auditoria e backlog priorizado."
      },
      {
        "criterion": "Comunicação, portfólio e melhoria contínua",
        "points": 8,
        "description": "Resumo executivo, defesa técnica, rubrica preenchida, lacunas, reteste e portfólio sanitizado."
      }
    ]
  },
  "commentedSolution": {
    "title": "Modelo de solução madura",
    "content": "Uma solução madura começa com escopo claro e mapa de ativos. A arquitetura separa matriz, filial, Wi-Fi corporativo, convidados, gestão, servidores, cloud hub, spokes, aplicação web e serviços de dados. O plano CIDR evita sobreposição e deixa crescimento reservado. A aplicação pública usa DNS público, WAF/CDN, Load Balancer, TLS e backends privados. O banco usa endpoint privado e DNS privado. Usuários remotos usam MFA, perfil limitado, DNS interno e rotas específicas. O tráfego de saída passa por controle de egress com logs. A investigação do incidente simulado não assume causa única: compara logs de WAF/LB/Ingress, flow logs, DNS, VPN, firewall, EDR, cloud audit e billing. A mitigação reduz impacto sem destruir evidências. O RCA aponta causa técnica, causa sistêmica, prevenção, dono e prazo. O portfólio final remove dados sensíveis e apresenta decisões, trade-offs e aprendizados.",
    "reasoning": "A solução comentada deve explicar o raciocínio. Nesta revisão P1-M17, a correção deve ser feita por competência: nota final, por si só, não prova domínio se o aluno não consegue justificar evidência, risco, decisão e próximo passo.",
    "steps": [
      "Separar nota geral de domínio por competência.",
      "Classificar erros pela taxonomia de causa.",
      "Vincular lacunas a aulas e laboratórios específicos.",
      "Criar mini laboratório ou exercício ativo para cada lacuna crítica.",
      "Retestar após intervalo e registrar evolução.",
      "Decidir aprovação, aprovação com ressalvas ou refazer bloco crítico."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Passei porque acertei 75%, sem analisar onde errei.",
        "whyItIsWrong": "A pontuação geral pode esconder uma competência crítica fraca, como DNS, rotas, firewall, cloud ou evidência de incidente."
      },
      {
        "answer": "Vou revisar lendo tudo novamente.",
        "whyItIsWrong": "Releitura passiva é pouco diagnóstica. A revisão precisa de erro classificado, exercício ativo, laboratório e reteste."
      },
      {
        "answer": "O capstone está bom porque a arquitetura ficou bonita.",
        "whyItIsWrong": "Arquitetura profissional precisa de fluxos, controles, custos, logs, evidências, rollback e justificativa."
      }
    ],
    "finalAnswer": "A aula está concluída quando o aluno entrega matriz de competências, rubrica, evidências, feedback por erro e plano de revisão/reteste para qualquer competência abaixo do mínimo."
  },
  "glossary": [
    {
      "term": "Capstone",
      "definition": "Projeto final integrador usado para demonstrar domínio aplicado de múltiplos temas."
    },
    {
      "term": "Arquitetura ponta a ponta",
      "definition": "Desenho que acompanha o fluxo desde o usuário até a aplicação, dados, controles, logs e operação."
    },
    {
      "term": "Matriz hipótese-evidência",
      "definition": "Instrumento que relaciona possíveis causas a fontes de evidência, achados, lacunas e conclusões."
    },
    {
      "term": "Backlog preventivo",
      "definition": "Lista priorizada de melhorias para reduzir recorrência de falhas, incidentes e riscos."
    },
    {
      "term": "Dossiê de portfólio",
      "definition": "Pacote organizado e sanitizado de artefatos técnicos que demonstra competência profissional."
    },
    {
      "term": "Governança de exceções",
      "definition": "Processo para registrar, aprovar, expirar e revisar desvios temporários de políticas e padrões."
    }
  ],
  "references": [
    {
      "title": "NIST Cybersecurity Framework 2.0",
      "url": "https://www.nist.gov/cyberframework",
      "note": "Referência para governança, identificação, proteção, detecção, resposta e recuperação."
    },
    {
      "title": "NIST SP 800-61 Rev. 3 — Incident Response Recommendations and Considerations",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
      "note": "Base para resposta a incidentes integrada à gestão de risco."
    },
    {
      "title": "NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment",
      "url": "https://csrc.nist.gov/pubs/sp/800/115/final",
      "note": "Referência para planejamento, condução e reporte de avaliações técnicas autorizadas."
    },
    {
      "title": "AWS Well-Architected Framework",
      "url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html",
      "note": "Referência de pilares para arquitetura cloud segura, confiável, eficiente e otimizada."
    },
    {
      "title": "Azure Well-Architected Framework",
      "url": "https://learn.microsoft.com/en-us/azure/well-architected/",
      "note": "Referência de revisão arquitetural para workloads Azure."
    },
    {
      "title": "OWASP Web Security Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/",
      "note": "Referência para validações defensivas e estruturadas em aplicações web."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "note": "Pré-requisito recomendado para transformar o capstone em IaC, pipelines e operação contínua."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "note": "Pré-requisito recomendado para aprofundar MFA, RBAC, identidade de workload e Zero Trust."
    }
  ],
  "security": {
    "goodPractices": [
      "Usar simulados para diagnosticar lacunas, não apenas para memorizar respostas.",
      "Executar o capstone em ambiente controlado, documentado e sem impacto em terceiros.",
      "Coletar evidências de arquitetura, validação, logs, decisões e melhorias propostas.",
      "Revisar erros por tema: camada, protocolo, comando, segurança, cloud e troubleshooting.",
      "Consolidar o portfólio com entregáveis verificáveis e limites éticos claros."
    ],
    "badPractices": [
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta sem registrar causa, risco e prevenção."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar revisão integrada, simulados, estudos de caso, portfólio, capstone e consolidação profissional com impacto operacional, financeiro e de segurança."
    ],
    "vulnerabilities": [
      {
              "name": "Risco de avaliação sem evidência — Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta",
              "description": "Em Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
              "defensiveExplanation": "O risco aparece quando o aluno sabe responder definições, mas não consegue demonstrar validação operacional com diagrama, matriz de fluxos, comandos, logs, RCA e rubrica.",
              "mitigation": "Exigir entregáveis objetivos, simulado por domínio, relatório de lacunas, rubrica de 100 pontos, evidências sanitizadas, revisão das falhas e plano de estudo antes de concluir a trilha."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, balanceadores, endpoints e provedores cloud.",
      "Métricas de disponibilidade, latência, perda, retransmissões, resets e erros de TLS/HTTP.",
      "Eventos de mudança, deploy, IaC, configuração manual e alertas correlacionados no tempo."
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.12."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "O aluno acerta questões isoladas, mas falha em cenários integrados.",
      "O projeto final tem diagrama, mas não possui validação ou evidências.",
      "A solução proposta funciona, mas ignora segurança, custo ou operação.",
      "O checklist mostra lacunas em fundamentos anteriores.",
      "A revisão não gera plano de melhoria mensurável."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 17.12?"
    ],
    "commands": [
      {
        "platform": "Revisão",
        "command": "preencher checklist de camada, protocolo, comando, segurança, cloud e evidência",
        "purpose": "Mapear lacunas antes de considerar o curso consolidado.",
        "expectedObservation": "Tópicos fracos aparecem agrupados por tema.",
        "interpretation": "A revisão deve orientar reforço dirigido, não repetição aleatória."
      },
      {
        "platform": "Capstone",
        "command": "validar DNS, rota, firewall, TLS, logs e evidências do cenário integrado",
        "purpose": "Comprovar que a arquitetura final funciona e é auditável.",
        "expectedObservation": "Entregáveis demonstram desenho, validação, riscos e mitigação.",
        "interpretation": "Sem evidência e rubrica, o projeto final vira texto, não avaliação técnica."
      },
      {
        "platform": "Portfólio",
        "command": "organizar diagramas, tabelas, comandos, prints, RCA e decisões arquiteturais",
        "purpose": "Gerar material revisável e demonstrável.",
        "expectedObservation": "Artefatos suficientes para explicar raciocínio técnico.",
        "interpretation": "Portfólio bom mostra processo, não apenas resultado final."
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
      }
    ]
  },
  "progressRules": {
    "completeWhen": {
      "deliverablesMarked": true,
      "rubricCompleted": true,
      "selfAssessmentDone": true,
      "capstoneDossierComplete": true,
      "rcaCompleted": true,
      "finalScoreAtLeast": 80
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": []
  },
  "assessmentBlueprint": {
    "id": "assessment-17.12",
    "title": "Avaliação por competência — Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta",
    "assessmentType": "capstone final",
    "competencies": [
      {
        "id": "C01",
        "name": "Fundamentos, OSI e encapsulamento",
        "modules": [
          "M00",
          "M01",
          "M02"
        ],
        "minimum": 70,
        "mastery": 90,
        "evidence": "explica fluxo de dados por camadas e reconhece onde cada evidência aparece"
      },
      {
        "id": "C02",
        "name": "Ethernet, ARP, VLAN, switching e camada 2",
        "modules": [
          "M03"
        ],
        "minimum": 70,
        "mastery": 90,
        "evidence": "diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast"
      },
      {
        "id": "C03",
        "name": "IPv4, subnetting, gateway e roteamento básico",
        "modules": [
          "M04",
          "M05",
          "M11"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "calcula redes, identifica rota local/default e justifica escolha de caminho"
      },
      {
        "id": "C04",
        "name": "TCP, UDP, portas e serviços essenciais",
        "modules": [
          "M06",
          "M07"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs"
      },
      {
        "id": "C05",
        "name": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "modules": [
          "M08",
          "M09",
          "M10"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "interpreta erros de aplicação/rede e propõe controles com rollback"
      },
      {
        "id": "C06",
        "name": "Wireless, segurança defensiva e Blue Team",
        "modules": [
          "M12",
          "M13",
          "M16"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "define escopo autorizado, telemetria, detecção, contenção e mitigação"
      },
      {
        "id": "C07",
        "name": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "modules": [
          "M14"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos"
      },
      {
        "id": "C08",
        "name": "Troubleshooting profissional, RCA e comunicação",
        "modules": [
          "M15",
          "M17"
        ],
        "minimum": 80,
        "mastery": 92,
        "evidence": "transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência"
      }
    ],
    "passingCriteria": {
      "minimumScorePercent": 80,
      "masteryScorePercent": 92,
      "requiredEvidence": "dossiê completo, defesa técnica, RCA, matriz de fluxos, rubrica assinada pelo aluno e backlog de melhoria",
      "mustRedoWhen": "qualquer competência crítica ficar abaixo do mínimo ou quando a resposta correta não puder ser explicada com evidência"
    },
    "gradingRubric": [
      {
        "criterion": "C01 — Fundamentos, OSI e encapsulamento",
        "points": 10,
        "description": "Demonstra domínio mínimo de 70% e produz evidência verificável: explica fluxo de dados por camadas e reconhece onde cada evidência aparece."
      },
      {
        "criterion": "C02 — Ethernet, ARP, VLAN, switching e camada 2",
        "points": 10,
        "description": "Demonstra domínio mínimo de 70% e produz evidência verificável: diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast."
      },
      {
        "criterion": "C03 — IPv4, subnetting, gateway e roteamento básico",
        "points": 10,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: calcula redes, identifica rota local/default e justifica escolha de caminho."
      },
      {
        "criterion": "C04 — TCP, UDP, portas e serviços essenciais",
        "points": 10,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs."
      },
      {
        "criterion": "C05 — HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "points": 10,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: interpreta erros de aplicação/rede e propõe controles com rollback."
      },
      {
        "criterion": "C06 — Wireless, segurança defensiva e Blue Team",
        "points": 10,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: define escopo autorizado, telemetria, detecção, contenção e mitigação."
      },
      {
        "criterion": "C07 — Cloud Networking, Kubernetes e arquitetura híbrida",
        "points": 10,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos."
      },
      {
        "criterion": "C08 — Troubleshooting profissional, RCA e comunicação",
        "points": 10,
        "description": "Demonstra domínio mínimo de 80% e produz evidência verificável: transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência."
      },
      {
        "criterion": "Evidência e rastreabilidade",
        "points": 10,
        "description": "Entrega prints, tabelas, comandos, hipóteses, logs, justificativas e rastreia cada decisão ao requisito correspondente."
      },
      {
        "criterion": "Correção comentada e melhoria contínua",
        "points": 10,
        "description": "Transforma erro em plano de revisão, reteste, laboratório curto e melhoria concreta do próprio mapa de conhecimento."
      }
    ],
    "feedbackBands": [
      {
        "range": "0-59%",
        "status": "insuficiente para conclusão",
        "action": "Não avance. Refaça a revisão guiada, execute laboratórios essenciais e produza nova tentativa com evidências."
      },
      {
        "range": "60-74%",
        "status": "base parcial",
        "action": "Revise competências abaixo do mínimo, foque nos erros conceituais e refaça somente os blocos afetados."
      },
      {
        "range": "75-89%",
        "status": "aprovado com ressalvas",
        "action": "Avance, mas registre lacunas residuais e execute pelo menos um mini lab de reforço por competência fraca."
      },
      {
        "range": "90-100%",
        "status": "domínio forte",
        "action": "Use o resultado como artefato de portfólio, explique decisões em voz alta e ajude outro aluno a revisar o tema."
      }
    ],
    "remediationTracks": [
      {
        "competencyId": "C01",
        "competency": "Fundamentos, OSI e encapsulamento",
        "trigger": "pontuação abaixo de 70% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M00, M01, M02 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para explica fluxo de dados por camadas e reconhece onde cada evidência aparece",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C02",
        "competency": "Ethernet, ARP, VLAN, switching e camada 2",
        "trigger": "pontuação abaixo de 70% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M03 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C03",
        "competency": "IPv4, subnetting, gateway e roteamento básico",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M04, M05, M11 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para calcula redes, identifica rota local/default e justifica escolha de caminho",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C04",
        "competency": "TCP, UDP, portas e serviços essenciais",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M06, M07 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C05",
        "competency": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M08, M09, M10 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para interpreta erros de aplicação/rede e propõe controles com rollback",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C06",
        "competency": "Wireless, segurança defensiva e Blue Team",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M12, M13, M16 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para define escopo autorizado, telemetria, detecção, contenção e mitigação",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C07",
        "competency": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M14 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C08",
        "competency": "Troubleshooting profissional, RCA e comunicação",
        "trigger": "pontuação abaixo de 80% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M15, M17 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      }
    ],
    "evidenceRequired": [
      "pontuação bruta e pontuação por competência",
      "lista de erros classificados por causa raiz de aprendizagem",
      "print ou transcrição dos comandos/labs quando aplicável",
      "plano de revisão com prazo e reteste",
      "registro de confiança antes e depois da correção"
    ]
  },
  "adaptiveReview": {
    "enabled": true,
    "purpose": "transformar erros de simulado, laboratório ou capstone em trilha de revisão objetiva",
    "errorTaxonomy": [
      {
        "code": "E-CONCEITO",
        "label": "erro conceitual",
        "interpretation": "o aluno decorou termo, mas não explicou por que ele existe ou como funciona internamente"
      },
      {
        "code": "E-CAMADA",
        "label": "erro de camada",
        "interpretation": "confundiu camada 2, camada 3, transporte, aplicação ou controle de segurança"
      },
      {
        "code": "E-COMANDO",
        "label": "erro de evidência",
        "interpretation": "não soube escolher comando, log, métrica ou pacote para confirmar hipótese"
      },
      {
        "code": "E-ARQUITETURA",
        "label": "erro de desenho",
        "interpretation": "solução funciona isoladamente, mas ignora fluxo, dependência, custo, segurança ou operação"
      },
      {
        "code": "E-SEGURANCA",
        "label": "erro de risco",
        "interpretation": "confundiu conectividade com autorização, ignorou telemetria ou propôs exceção insegura"
      },
      {
        "code": "E-COMUNICACAO",
        "label": "erro de comunicação",
        "interpretation": "não conseguiu explicar impacto, decisão, rollback ou risco residual para outro público"
      }
    ],
    "revisionLoop": [
      "registrar resposta inicial e confiança antes do gabarito",
      "corrigir e classificar cada erro pela taxonomia",
      "vincular o erro à competência e às aulas de origem",
      "executar mini laboratório ou exercício ativo",
      "refazer questão/tarefa após intervalo",
      "registrar nova confiança e evidência de melhoria"
    ],
    "remediationTracks": [
      {
        "competencyId": "C01",
        "competency": "Fundamentos, OSI e encapsulamento",
        "trigger": "pontuação abaixo de 70% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M00, M01, M02 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para explica fluxo de dados por camadas e reconhece onde cada evidência aparece",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C02",
        "competency": "Ethernet, ARP, VLAN, switching e camada 2",
        "trigger": "pontuação abaixo de 70% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M03 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C03",
        "competency": "IPv4, subnetting, gateway e roteamento básico",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M04, M05, M11 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para calcula redes, identifica rota local/default e justifica escolha de caminho",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C04",
        "competency": "TCP, UDP, portas e serviços essenciais",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M06, M07 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C05",
        "competency": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M08, M09, M10 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para interpreta erros de aplicação/rede e propõe controles com rollback",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C06",
        "competency": "Wireless, segurança defensiva e Blue Team",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M12, M13, M16 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para define escopo autorizado, telemetria, detecção, contenção e mitigação",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C07",
        "competency": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M14 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C08",
        "competency": "Troubleshooting profissional, RCA e comunicação",
        "trigger": "pontuação abaixo de 80% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M15, M17 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      }
    ]
  },
  "capstoneEvaluation": {
    "title": "Rubrica final de conclusão do curso Redes e Network v2.0",
    "approvalCriteria": [
      "pontuação final mínima de 80%",
      "nenhuma competência crítica abaixo de 70%",
      "dossiê completo com arquitetura, fluxos, segurança, observabilidade, troubleshooting, RCA e custos",
      "defesa técnica capaz de explicar decisões, alternativas rejeitadas e riscos residuais",
      "plano de melhoria priorizado por risco, custo e esforço"
    ],
    "requiredDeliverables": [
      "diagrama de arquitetura ponta a ponta",
      "plano CIDR/subnets/VLANs/rotas/DNS",
      "matriz de fluxos e políticas",
      "plano de telemetria: flow logs, DNS, proxy, WAF, firewall, cloud audit, EDR/NDR/SIEM",
      "cenário de incidente, linha do tempo, hipóteses, evidências, decisão e RCA",
      "rubrica preenchida por competência",
      "checklist de limpeza/custos para recursos cloud",
      "backlog de melhoria contínua"
    ],
    "gradingRubric": [
      {
        "criterion": "Arquitetura e segmentação",
        "points": 15,
        "description": "CIDR, subnets, VLANs, roteamento, DNS, publicação e acesso privado coerentes."
      },
      {
        "criterion": "Segurança defensiva e governança",
        "points": 15,
        "description": "Menor privilégio, escopo autorizado, controles, logs, exceções e riscos residuais documentados."
      },
      {
        "criterion": "Cloud Networking e custos",
        "points": 12,
        "description": "NAT Gateway, Private Endpoint, firewall gerenciado, egress, logs e limpeza considerados."
      },
      {
        "criterion": "Troubleshooting e RCA",
        "points": 15,
        "description": "Sintomas, hipóteses, comandos, evidências, decisão e causa raiz bem conectados."
      },
      {
        "criterion": "Blue Team, SIEM/NDR e evidências",
        "points": 12,
        "description": "Detecções, falsos positivos, telemetria e contenção proporcional."
      },
      {
        "criterion": "DevSecOps e automação",
        "points": 8,
        "description": "IaC, mudança segura, rollback, validação e documentação operacional."
      },
      {
        "criterion": "Comunicação executiva e portfólio",
        "points": 8,
        "description": "Resumo executivo, impacto, risco, custo, próximos passos e artefatos sanitizados."
      },
      {
        "criterion": "Matriz de competências e melhoria contínua",
        "points": 15,
        "description": "Feedback por competência, lacunas, reteste e roadmap pós-curso."
      }
    ],
    "feedbackByCompetency": [
      {
        "id": "C01",
        "name": "Fundamentos, OSI e encapsulamento",
        "modules": [
          "M00",
          "M01",
          "M02"
        ],
        "minimum": 70,
        "mastery": 90,
        "evidence": "explica fluxo de dados por camadas e reconhece onde cada evidência aparece"
      },
      {
        "id": "C02",
        "name": "Ethernet, ARP, VLAN, switching e camada 2",
        "modules": [
          "M03"
        ],
        "minimum": 70,
        "mastery": 90,
        "evidence": "diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast"
      },
      {
        "id": "C03",
        "name": "IPv4, subnetting, gateway e roteamento básico",
        "modules": [
          "M04",
          "M05",
          "M11"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "calcula redes, identifica rota local/default e justifica escolha de caminho"
      },
      {
        "id": "C04",
        "name": "TCP, UDP, portas e serviços essenciais",
        "modules": [
          "M06",
          "M07"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs"
      },
      {
        "id": "C05",
        "name": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "modules": [
          "M08",
          "M09",
          "M10"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "interpreta erros de aplicação/rede e propõe controles com rollback"
      },
      {
        "id": "C06",
        "name": "Wireless, segurança defensiva e Blue Team",
        "modules": [
          "M12",
          "M13",
          "M16"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "define escopo autorizado, telemetria, detecção, contenção e mitigação"
      },
      {
        "id": "C07",
        "name": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "modules": [
          "M14"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos"
      },
      {
        "id": "C08",
        "name": "Troubleshooting profissional, RCA e comunicação",
        "modules": [
          "M15",
          "M17"
        ],
        "minimum": 80,
        "mastery": 92,
        "evidence": "transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência"
      }
    ]
  },
  "capstoneFinalRequirements": {
    "id": "capstone-17.12-requirements-p1-11",
    "updatedAt": "2026-07-02T01:43:59.015Z",
    "freeAccess": true,
    "navigationBlocked": false,
    "requiredDeliverables": [
      "D01 — Arquitetura lógica ponta a ponta com matriz, filial, Wi-Fi, acesso remoto, hub cloud, workloads privados, borda pública, telemetria e governança.",
      "D02 — Plano de endereçamento: CIDR, subnets, VLANs, gateways, reservas de crescimento e ausência de sobreposição.",
      "D03 — Matriz de fluxos: origem, destino, protocolo, porta, justificativa, controle, log esperado, dono, criticidade e risco residual.",
      "D04 — Política de firewall/ACL/SG/NSG/NACL: allowlist, deny explícito, ordem de regras, shadowing, retorno e exceções com expiração.",
      "D05 — Plano DNS: público, privado, split-horizon, delegação, registros críticos, resolução em VPN e evidência de troubleshooting.",
      "D06 — Plano VPN/acesso remoto: autenticação forte, rotas, split tunnel, DNS, logs, perfis, troubleshooting e fallback.",
      "D07 — Desenho cloud/híbrido: hub-spoke, route tables, Private Endpoint/Private Link, egress control, NAT/firewall, Kubernetes networking e custos.",
      "D08 — Plano de observabilidade: flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, EDR/NDR/SIEM, métricas e retenção.",
      "D09 — Evidências de testes: DNS, TCP, TLS, HTTP, rota, firewall allow/deny, endpoint privado, VPN, egress, logs e custo estimado.",
      "D10 — Runbook de troubleshooting: árvore hipótese-evidência, comandos, fontes de log, critérios de decisão, rollback e comunicação.",
      "D11 — RCA de incidente simulado: timeline, impacto, causa técnica, causa sistêmica, mitigação, prevenção, riscos residuais e donos.",
      "D12 — Rubrica objetiva preenchida: pontuação por competência, aprovação/reprovação, lacunas, reteste e plano de melhoria contínua."
    ],
    "minimumScore": 80,
    "criticalCompetencyMinimum": 70,
    "completionEvidence": [
      "dossiê final preenchido",
      "rubrica objetiva preenchida",
      "matriz de competências C01-C08 preenchida",
      "plano de reteste para lacunas críticas",
      "evidências sanitizadas dos testes e do incidente simulado"
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud, Kubernetes e Platform Engineering",
      "lesson": "Kubernetes Service, Ingress, NetworkPolicy e GitOps",
      "reason": "O capstone usa Kubernetes networking, Ingress, NetworkPolicy, IaC, policy as code e rollback operacional."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e automação",
      "lesson": "Logs, métricas, traces, incident response e RCA",
      "reason": "O plano de observabilidade, war room, rollback e RCA dependem de práticas de SRE e operação moderna."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM corporativo, federação e acesso remoto",
      "lesson": "MFA, RBAC, service principals, workload identity e acesso mínimo",
      "reason": "O capstone usa MFA, identidade, menor privilégio, workloads privados e controles de acesso em cloud."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust e governança de acessos",
      "lesson": "Políticas condicionais, revisão de acesso e evidências de auditoria",
      "reason": "A defesa técnica precisa provar quem acessa o quê, por qual caminho, com qual autorização e com quais logs."
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
    "note": "P1-11 preserva acesso livre; apenas a conclusão do capstone exige evidências."
  }
};
