export const lesson1607 = {
  "id": "16.7",
  "moduleId": "m16",
  "order": 7,
  "title": "Movimento lateral e segmentação defensiva",
  "subtitle": "Como entender movimento lateral de forma defensiva e desenhar segmentação, microsegmentação, controles de identidade e telemetria para limitar caminhos internos de comprometimento.",
  "duration": "300-450 min",
  "estimatedStudyTimeMinutes": 450,
  "difficulty": "avançado",
  "type": "segurança defensiva",
  "xp": 450,
  "tags": [
    "movimento lateral",
    "segmentação",
    "microsegmentação",
    "Zero Trust",
    "firewall interno",
    "ACL",
    "VLAN",
    "NAC",
    "EDR",
    "SIEM",
    "identity-aware access",
    "least privilege",
    "east-west traffic",
    "Blue Team",
    "SOC",
    "defesa em profundidade",
    "ética",
    "escopo autorizado",
    "NDR",
    "evidências",
    "detecção",
    "mitigação",
    "dataset sintético",
    "PCAP sintético",
    "Zeek",
    "NetFlow",
    "timeline de incidente",
    "flow logs"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação, zonas de segurança e redução de movimento lateral são a base conceitual desta aula."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.8",
      "reason": "Zero Trust fornece o modelo mental para não confiar em tráfego interno apenas por estar na rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.5",
      "reason": "Security Groups, NSG, NACL e Cloud Firewalls são controles usados para segmentação em cloud."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.7",
      "reason": "Troubleshooting de firewall, ACL, NAT e políticas ajuda a validar regras de segmentação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.2",
      "reason": "Escopo, ética, legalidade e ROE continuam obrigatórios em qualquer validação defensiva."
    }
  ],
  "objectives": [
    "Explicar movimento lateral do ponto de vista defensivo, sem ensinar exploração ou abuso de credenciais.",
    "Diferenciar rede plana, segmentação por zona, microsegmentação e acesso baseado em identidade/contexto.",
    "Mapear fluxos legítimos entre usuários, servidores, cloud, identidade, administração e dados críticos.",
    "Projetar controles de redução de movimento lateral usando VLANs, ACLs, firewalls internos, SG/NSG, NAC, EDR e políticas de identidade.",
    "Definir telemetria para detectar tentativas de comunicação interna incomum, varreduras autorizadas ou não, uso indevido de protocolos administrativos e acessos fora do baseline.",
    "Construir um plano de segmentação defensiva com piloto, exceções, rollback, métricas e riscos residuais."
  ],
  "learningOutcomes": [
    "Dado um mapa de rede plana, o aluno identifica caminhos laterais prováveis e propõe zonas defensivas.",
    "Dado um fluxo entre estação e banco de dados, o aluno decide se o fluxo é legítimo, exceção temporária ou risco a bloquear.",
    "Dado um alerta de tráfego east-west incomum, o aluno correlaciona flow logs, EDR, firewall interno, identidade e inventário.",
    "Dado um ambiente cloud, o aluno traduz segmentação para SG, NSG, NACL, private endpoints, hub-spoke e logs.",
    "Dado um plano de microsegmentação, o aluno identifica riscos operacionais, exceções e estratégia de rollout.",
    "Dado um incidente de possível movimento lateral, o aluno propõe contenção proporcional sem derrubar serviços críticos."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n  <p>Em muitos incidentes, o primeiro comprometimento não é o fim do problema. Ele é apenas a porta de entrada. O impacto real aparece quando um invasor, malware ou credencial abusada consegue atravessar a rede, alcançar servidores, sistemas de identidade, bancos de dados, backups, consoles de administração e ambientes cloud. Esse deslocamento interno é o que chamamos, em linguagem defensiva, de <strong>movimento lateral</strong>.</p>\n  <p>Para um analista de segurança, redes deixam de ser apenas conectividade e viram controle de dano. Uma rede plana permite que um problema pequeno se torne sistêmico. Uma rede segmentada, observável e governada transforma cada tentativa de acesso indevido em uma barreira, um log e uma oportunidade de resposta.</p>\n  <div class=\"callout callout--warning\"><strong>Limite ético:</strong> esta aula não ensina exploração, roubo de credenciais, execução remota ou técnicas ofensivas. O foco é reconhecer riscos, desenhar controles, validar fluxos autorizados e melhorar defesa.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>As primeiras redes corporativas foram desenhadas para facilitar comunicação interna. Usuários, servidores e serviços ficavam frequentemente em grandes segmentos confiáveis. O perímetro era o firewall de borda: dentro era considerado confiável; fora era considerado perigoso.</p>\n  <p>Esse modelo enfraqueceu com notebooks móveis, VPNs, Wi-Fi, terceirizados, cloud, SaaS, BYOD, containers, APIs e identidades federadas. O tráfego interno passou a ser tão relevante quanto o tráfego de internet. A segurança evoluiu de perímetro único para defesa em profundidade, segmentação, Zero Trust, controle baseado em identidade e telemetria contínua.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Rede plana:</strong> conectividade ampla e pouca restrição interna.</div><div class=\"timeline-item\"><strong>Segmentação:</strong> VLANs, zonas, ACLs e firewalls internos separam funções.</div><div class=\"timeline-item\"><strong>Microsegmentação:</strong> políticas mais granulares por workload, identidade, aplicação e contexto.</div><div class=\"timeline-item\"><strong>Zero Trust:</strong> cada acesso é avaliado explicitamente, mesmo dentro da rede.</div></div>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>O problema não é apenas que um host possa ser comprometido. O problema é o que esse host consegue alcançar depois disso. Se uma estação de usuário pode falar diretamente com banco de dados, controladores de domínio, backups, servidores de administração e APIs internas, qualquer falha em uma ponta vira risco para todo o ambiente.</p>\n  <p>Movimento lateral também é difícil de detectar quando os controles assumem que tráfego interno é normal. Protocolos administrativos, compartilhamentos de arquivos, autenticação, resolução de nomes e conexões entre servidores podem parecer legítimos se não houver baseline, dono de fluxo e telemetria.</p>\n  <ul><li><strong>Rede plana:</strong> aumenta raio de explosão.</li><li><strong>Fluxos sem dono:</strong> ninguém sabe se uma comunicação é necessária.</li><li><strong>Exceções permanentes:</strong> regras temporárias viram acesso amplo.</li><li><strong>Logs ausentes:</strong> não há prova de quem falou com quem.</li><li><strong>Controles isolados:</strong> firewall, EDR, IAM, NAC e SIEM não compartilham contexto.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>A primeira resposta defensiva foi separar redes por função: usuários, servidores, DMZ, voz, convidados, administração e produção. Isso reduziu parte do risco, mas muitas vezes a separação era grossa demais. Bastava estar na VLAN certa para alcançar recursos demais.</p>\n  <p>Depois vieram firewalls internos, ACLs, NAC, controle de acesso administrativo, EDR, logs de fluxo e políticas por aplicação. Em cloud, a segmentação passou a existir em Security Groups, NSGs, NACLs, cloud firewalls, private endpoints, hub-spoke, transit gateways e políticas de organização. Em Kubernetes, entram NetworkPolicies, namespaces, service mesh e Ingress controlado.</p>\n  <p>A evolução mais importante é cultural: segmentação não é bloquear por bloquear. É transformar dependências reais em fluxos explícitos, mínimos, documentados, testados, monitorados e revisados.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p><strong>Movimento lateral</strong> é a tentativa de um ator, processo ou credencial comprometida se deslocar para outros sistemas dentro do ambiente. Para o Blue Team, o conceito serve para perguntar: quais caminhos internos existem, quais deveriam existir, quais são desnecessários e quais geram evidência quando usados?</p>\n  <p><strong>Segmentação defensiva</strong> divide o ambiente em zonas com políticas de comunicação explícitas. <strong>Microsegmentação</strong> leva esse raciocínio para granularidade menor: aplicação, workload, identidade, porta, protocolo, direção, ambiente, tag, postura do dispositivo e contexto.</p>\n  <p>O resultado esperado não é uma rede sem comunicação. O resultado é uma rede onde cada comunicação importante tem justificativa, dono, controle, log, limite e revisão.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Internamente, segmentação funciona por decisões repetidas de permissão. Um pacote sai de uma origem, atravessa interface, VLAN, roteador, firewall, policy engine, load balancer, service mesh ou security group, e só deveria chegar ao destino se corresponder a um fluxo aprovado.</p>\n  <p>Essas decisões dependem de atributos: IP de origem, IP de destino, porta, protocolo, zona, identidade do usuário, identidade do workload, tag do recurso, estado da conexão, postura do dispositivo, ambiente, sensibilidade do dado e horário. Quanto mais contexto, mais precisa pode ser a política. Quanto menos contexto, maior a chance de regra ampla como “qualquer origem interna pode acessar qualquer servidor”.</p>\n  <p>Do ponto de vista de detecção, o que interessa são desvios: estação falando com muitos hosts, host de usuário tentando protocolo administrativo, servidor de aplicação acessando banco fora do fluxo esperado, workload cloud abrindo conexão incomum, ou conta de serviço sendo usada de origem não prevista.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura defensiva contra movimento lateral começa com zonas: usuários, administração, servidores de aplicação, bancos de dados, identidade, backup, monitoramento, DMZ, cloud, Kubernetes, terceiros e convidados. Cada zona deve ter propósito, dono, criticidade, controles e fluxos permitidos.</p>\n  <p>Entre zonas, entram pontos de enforcement: firewall interno, ACL, SG/NSG, NACL, cloud firewall, proxy, ZTNA, NAC, service mesh, NetworkPolicy, bastion host, PAM e políticas de IAM. Ao lado desses controles, entram pontos de observação: flow logs, EDR, logs de firewall, DNS, proxy, autenticação, Kubernetes audit, cloud audit e SIEM.</p>\n  <p>Uma boa arquitetura também separa tráfego administrativo de tráfego de aplicação. Acesso administrativo deve passar por bastion, PAM, MFA, registro de sessão, origem controlada e janela autorizada. Backups e identidade devem ser tratados como zonas críticas, não como “servidores comuns”.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Imagine um hospital. Um visitante pode entrar na recepção, mas não pode circular livremente pela farmácia, centro cirúrgico, laboratório, sala de servidores e arquivo médico. Cada área exige autorização diferente, registro, crachá, acompanhamento e motivo.</p>\n  <p>Rede plana é como um hospital onde, após passar pela porta principal, qualquer pessoa abre qualquer sala. Segmentação é criar portas internas com controle. Microsegmentação é controlar não apenas a porta, mas quem pode entrar, para qual finalidade, em qual horário, usando qual credencial e deixando qual registro.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Uma estação de usuário precisa acessar o sistema web interno em HTTPS. Ela não precisa acessar diretamente o banco de dados, o servidor de backup ou o controlador de domínio por portas administrativas. Em uma rede segmentada, o fluxo permitido seria: usuário → load balancer/app web. O fluxo app web → banco existe, mas apenas a partir dos servidores de aplicação, em porta específica, com logs.</p>\n  <p>Se a estação tentar falar com o banco, isso deve ser bloqueado e registrado. Se ela tentar muitos destinos internos em pouco tempo, isso deve gerar alerta. O objetivo é impedir que uma estação vire ponte para o restante da empresa.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa grande, existem VLANs de usuários, rede de servidores, rede de administração, domínio, ERP, banco de dados, backup, impressoras, Wi-Fi corporativo, Wi-Fi convidado e filiais. O desenho defensivo exige matriz de fluxos: quem fala com quem, por qual porta, com qual justificativa, qual dono e qual evidência.</p>\n  <p>Uma regra “usuários → servidores: any” é operacionalmente confortável, mas defensivamente fraca. O redesenho maduro substitui isso por fluxos explícitos: usuários acessam aplicações publicadas; administração usa bastion; servidores de aplicação acessam bancos específicos; backup acessa agentes; monitoramento coleta métricas; identidade fica restrita; convidados não acessam rede interna.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, movimento lateral pode ocorrer entre VPCs/VNets, subnets, contas, workloads, clusters e serviços gerenciados. A segmentação usa Security Groups, NSGs, NACLs, cloud firewalls, hub-spoke, private endpoints, IAM, políticas de organização, flow logs e auditoria.</p>\n  <p>Um exemplo defensivo: workloads de frontend em subnets privadas recebem tráfego apenas do load balancer; backend aceita tráfego apenas do frontend; banco aceita apenas do backend; administração passa por bastion/PAM; serviços gerenciados usam private endpoint; egress passa por firewall/proxy; flow logs e CloudTrail/Azure Activity/Google Cloud Audit alimentam SIEM.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>DevSecOps transforma segmentação em código. Módulos Terraform, Bicep, Helm ou Kustomize devem declarar Security Groups, NSGs, NetworkPolicies, private endpoints, tags, logs e regras mínimas. Pipelines validam se uma mudança cria regra ampla, libera porta administrativa, remove log ou conecta zona sensível sem aprovação.</p>\n  <p>Um pipeline maduro não pergunta apenas se a infraestrutura “sobe”. Ele pergunta se o fluxo está no catálogo aprovado, se há dono, se o ambiente é produção, se a regra expira, se existe teste sintético e se a mudança pode ser revertida.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em um alerta de possível movimento lateral, o SOC não deve começar bloqueando tudo nem presumir ataque sem evidência. Ele deve correlacionar origem, usuário, processo, destino, porta, horário, autenticação, EDR, DNS, flow logs, firewall, IAM e mudanças recentes. O objetivo é separar tráfego legítimo, erro operacional, varredura autorizada, falso positivo e incidente real.</p>\n  <p>Contenção proporcional pode incluir isolar endpoint no EDR, remover sessão, revogar credencial, bloquear fluxo específico, mover host para VLAN de quarentena, desabilitar regra temporária, restringir conta de serviço ou acionar playbook de identidade. Tudo com evidência, dono, horário, impacto e rollback.</p>\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Apenas desenho, revisão de regras, testes de conectividade autorizados e validação de logs. Não tentar exploração lateral.</p><p><strong>Ações proibidas:</strong> Usar credenciais para pivot; Executar ferramentas de pós-exploração; Acessar compartilhamentos não autorizados; Desativar firewall interno.</p><p><strong>Meta defensiva:</strong> Reduzir caminhos laterais usando zonas, regras mínimas, identidade, logging e validação contínua de fluxos permitidos.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra movimento lateral como tentativa de atravessar zonas. A segmentação defensiva cria portas controladas entre zonas, exige identidade/contexto, registra fluxos e impede que uma estação comprometida fale livremente com servidores críticos.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Diagrama de segmentação defensiva contra movimento lateral\">\n    <svg viewBox=\"0 0 980 520\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-16-7-content-diagram-1-title svg-16-7-content-diagram-1-desc\">\n      <title id=\"svg-16-7-content-diagram-1-title\">Movimento lateral e segmentação defensiva</title>\n      <desc id=\"svg-16-7-content-diagram-1-desc\">Diagrama pedagógico da aula 16.7, Movimento lateral e segmentação defensiva, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1607\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" />\n        </marker>\n        <filter id=\"shadow1607\" x=\"-10%\" y=\"-10%\" width=\"120%\" height=\"120%\">\n          <feDropShadow dx=\"2\" dy=\"2\" stdDeviation=\"3\" flood-opacity=\"0.20\"/>\n        </filter>\n      </defs>\n      <rect x=\"20\" y=\"20\" width=\"940\" height=\"480\" rx=\"18\" class=\"svg-surface\"/>\n      <text x=\"490\" y=\"55\" text-anchor=\"middle\" class=\"svg-title\">Segmentação defensiva reduz caminhos de movimento lateral</text>\n\n      <rect x=\"55\" y=\"95\" width=\"205\" height=\"330\" rx=\"16\" class=\"svg-zone svg-zone-users\" filter=\"url(#shadow1607)\"/>\n      <text x=\"158\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Zona de usuários</text>\n      <rect x=\"85\" y=\"160\" width=\"145\" height=\"58\" rx=\"10\" class=\"svg-node\"/>\n      <text x=\"158\" y=\"193\" text-anchor=\"middle\" class=\"svg-small\">Workstation</text>\n      <rect x=\"85\" y=\"255\" width=\"145\" height=\"58\" rx=\"10\" class=\"svg-node svg-node-risk\"/>\n      <text x=\"158\" y=\"288\" text-anchor=\"middle\" class=\"svg-small\">Host suspeito</text>\n      <text x=\"158\" y=\"365\" text-anchor=\"middle\" class=\"svg-note\">Controle local</text>\n      <text x=\"158\" y=\"390\" text-anchor=\"middle\" class=\"svg-note\">EDR + NAC + VLAN</text>\n\n      <rect x=\"325\" y=\"95\" width=\"225\" height=\"330\" rx=\"16\" class=\"svg-zone svg-zone-control\" filter=\"url(#shadow1607)\"/>\n      <text x=\"438\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Zona de controle</text>\n      <rect x=\"355\" y=\"158\" width=\"165\" height=\"58\" rx=\"10\" class=\"svg-control\"/>\n      <text x=\"438\" y=\"192\" text-anchor=\"middle\" class=\"svg-small\">Firewall interno</text>\n      <rect x=\"355\" y=\"242\" width=\"165\" height=\"58\" rx=\"10\" class=\"svg-control\"/>\n      <text x=\"438\" y=\"276\" text-anchor=\"middle\" class=\"svg-small\">Policy / PDP-PEP</text>\n      <rect x=\"355\" y=\"326\" width=\"165\" height=\"58\" rx=\"10\" class=\"svg-control\"/>\n      <text x=\"438\" y=\"360\" text-anchor=\"middle\" class=\"svg-small\">Logs de fluxo</text>\n\n      <rect x=\"615\" y=\"95\" width=\"300\" height=\"330\" rx=\"16\" class=\"svg-zone svg-zone-critical\" filter=\"url(#shadow1607)\"/>\n      <text x=\"765\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Zonas críticas</text>\n      <rect x=\"645\" y=\"158\" width=\"105\" height=\"58\" rx=\"10\" class=\"svg-node svg-node-server\"/>\n      <text x=\"698\" y=\"192\" text-anchor=\"middle\" class=\"svg-small\">App</text>\n      <rect x=\"780\" y=\"158\" width=\"105\" height=\"58\" rx=\"10\" class=\"svg-node svg-node-server\"/>\n      <text x=\"833\" y=\"192\" text-anchor=\"middle\" class=\"svg-small\">Banco</text>\n      <rect x=\"645\" y=\"258\" width=\"105\" height=\"58\" rx=\"10\" class=\"svg-node svg-node-server\"/>\n      <text x=\"698\" y=\"292\" text-anchor=\"middle\" class=\"svg-small\">AD/IAM</text>\n      <rect x=\"780\" y=\"258\" width=\"105\" height=\"58\" rx=\"10\" class=\"svg-node svg-node-server\"/>\n      <text x=\"833\" y=\"292\" text-anchor=\"middle\" class=\"svg-small\">Backup</text>\n      <text x=\"765\" y=\"367\" text-anchor=\"middle\" class=\"svg-note\">Acesso explícito, mínimo e observado</text>\n      <text x=\"765\" y=\"392\" text-anchor=\"middle\" class=\"svg-note\">Sem tráfego lateral implícito</text>\n\n      <path d=\"M230 284 C275 284, 300 272, 355 272\" class=\"svg-flow svg-flow-blocked\" marker-end=\"url(#arrow1607)\"/>\n      <text x=\"292\" y=\"252\" text-anchor=\"middle\" class=\"svg-bad\">tentativa lateral</text>\n      <path d=\"M520 187 C560 187, 590 187, 645 187\" class=\"svg-flow svg-flow-allowed\" marker-end=\"url(#arrow1607)\"/>\n      <text x=\"584\" y=\"168\" text-anchor=\"middle\" class=\"svg-good\">fluxo aprovado</text>\n      <path d=\"M520 355 C595 420, 705 440, 840 425\" class=\"svg-flow svg-flow-telemetry\" marker-end=\"url(#arrow1607)\"/>\n      <rect x=\"735\" y=\"425\" width=\"150\" height=\"48\" rx=\"12\" class=\"svg-siem\"/>\n      <text x=\"810\" y=\"455\" text-anchor=\"middle\" class=\"svg-small\">SIEM / SOC</text>\n\n      <style>\n        .svg-surface{fill:#f8fafc;stroke:#334155;stroke-width:2}\n        .svg-title{font:700 22px system-ui;fill:#0f172a}\n        .svg-label{font:700 17px system-ui;fill:#0f172a}\n        .svg-small{font:600 14px system-ui;fill:#0f172a}\n        .svg-note{font:500 13px system-ui;fill:#475569}\n        .svg-bad{font:700 13px system-ui;fill:#991b1b}\n        .svg-good{font:700 13px system-ui;fill:#166534}\n        .svg-zone{stroke:#334155;stroke-width:2}\n        .svg-zone-users{fill:#dbeafe}\n        .svg-zone-control{fill:#fef3c7}\n        .svg-zone-critical{fill:#dcfce7}\n        .svg-node{fill:#ffffff;stroke:#2563eb;stroke-width:2}\n        .svg-node-risk{stroke:#dc2626;stroke-dasharray:6 4}\n        .svg-node-server{stroke:#16a34a}\n        .svg-control{fill:#fff7ed;stroke:#ea580c;stroke-width:2}\n        .svg-siem{fill:#ede9fe;stroke:#7c3aed;stroke-width:2}\n        .svg-flow{fill:none;stroke-width:3}\n        .svg-flow-blocked{stroke:#dc2626;stroke-dasharray:8 5}\n        .svg-flow-allowed{stroke:#16a34a}\n        .svg-flow-telemetry{stroke:#7c3aed;stroke-dasharray:5 4}\n        #arrow1607 path{fill:#334155}\n      </style>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é um projeto de segmentação defensiva. Você vai desenhar zonas, mapear fluxos, identificar riscos de movimento lateral, propor controles, definir logs e criar um plano de implantação gradual.</p>\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — conexões east-west fora da matriz</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code>timestamp,src_host,src_zone,dst_host,dst_zone,dst_port,protocol,action,approved_flow\n2026-07-01T14:00:01Z,app-01,app,db-01,db,5432,tcp,allow,true\n2026-07-01T14:01:33Z,ws-020,user,fs-01,file,445,tcp,allow,true\n2026-07-01T14:02:10Z,ws-020,user,db-01,db,1433,tcp,allow,false\n2026-07-01T14:03:05Z,ws-020,user,app-02,app,5985,tcp,deny,false</code></pre><p><strong>Tarefa:</strong> Use matriz de fluxos para identificar tentativa de comunicação lateral indevida. Diferencie bloqueio correto de allow indevido.</p><p><strong>Ideia de detecção:</strong> <code>east_west_flow=true AND approved_flow=false AND action=allow</code></p><p><strong>Achado esperado:</strong> ws-020 → db-01:1433 foi permitido indevidamente; ws-020 → app-02:5985 foi bloqueado corretamente e deve gerar alerta/contexto.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam leitura de fluxo, classificação de risco, desenho de política e análise de exceções. A resposta correta deve sempre preservar disponibilidade, escopo e evidência.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n  <p>O desafio é transformar uma rede plana em arquitetura segmentada e observável sem quebrar negócio. Você deverá documentar fluxos, controles, telemetria, rollback, riscos residuais e plano de comunicação.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada valoriza raciocínio defensivo: entender dependências reais, reduzir privilégios, registrar exceções e implantar controles por ondas. Segmentar sem inventário costuma causar indisponibilidade; inventariar sem enforcement mantém risco.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n  <p>Movimento lateral é um dos motivos pelos quais redes continuam centrais em cibersegurança. Segmentação defensiva reduz raio de explosão, cria barreiras internas, transforma tráfego suspeito em evidência e força que acessos sejam explícitos. Microsegmentação e Zero Trust refinam o modelo ao aproximar política de identidade, contexto, workload e dado.</p>\n  <p>O objetivo não é bloquear tudo. O objetivo é permitir apenas o necessário, com dono, justificativa, log, revisão e capacidade de resposta.</p>\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Reduzir caminhos laterais usando zonas, regras mínimas, identidade, logging e validação contínua de fluxos permitidos. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, vamos estudar <strong>16.8 — C2, beaconing e detecção comportamental</strong>. A conexão é direta: depois de limitar movimento lateral, precisamos reconhecer padrões de comunicação persistente e anômala que podem indicar comando e controle.</p>\n</section>"
  },
  "lab": {
    "id": "lab-16.7",
    "title": "Laboratório 16.7 — Projeto de segmentação defensiva contra movimento lateral",
    "labType": "security",
    "objective": "Construir um plano defensivo de segmentação e microsegmentação para reduzir movimento lateral em um ambiente corporativo híbrido, sem executar técnicas ofensivas.",
    "scenario": "15. Laboratório O laboratório desta aula é um projeto de segmentação defensiva. Você vai desenhar zonas, mapear fluxos, identificar riscos de movimento lateral, propor controles, definir logs e criar um plano de implantação gradual.",
    "topology": [
      "Usuários corporativos",
      "Wi-Fi corporativo",
      "Servidores de aplicação",
      "Bancos de dados",
      "Identidade/IAM/AD",
      "Backup",
      "Ambiente cloud",
      "Kubernetes",
      "Firewall interno/cloud firewall",
      "EDR/NAC",
      "SIEM/SOC"
    ],
    "architecture": "Zonas funcionais → matriz de fluxos → pontos de enforcement → logs e alertas → piloto → exceções controladas → rollout → RCA e melhoria contínua.",
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
    "estimatedTimeMinutes": 450,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Este laboratório é exclusivamente defensivo e exige escopo autorizado.",
      "Não execute exploração, evasão, persistência, brute force, interceptação de tráfego real ou coleta de credenciais.",
      "Use dados sintéticos sempre que possível e preserve apenas metadados necessários.",
      "Informe SOC/NOC antes de testes que possam gerar alertas.",
      "Pare imediatamente se houver impacto operacional não previsto ou alvo fora do escopo.",
      "Usar somente os dados sintéticos fornecidos nesta aula ou dados internos autorizados e sanitizados.",
      "Não executar consulta, conexão, download, varredura ou teste contra domínios e IPs reais a partir do dataset.",
      "Não incluir payload, credencial, segredo, dado pessoal ou conteúdo de pacote real no relatório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Confirmar escopo autorizado e critérios de parada",
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Apenas desenho, revisão de regras, testes de conectividade autorizados e validação de logs. Não tentar exploração lateral.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: Matriz de segmentação | Flow logs east-west | Eventos de autenticação | Regras atuais | Teste de negação | Plano de exceções",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Definir escopo, ROE e objetivos",
        "instruction": "Documente quais redes, sistemas, contas cloud, clusters, usuários e horários estão em escopo. Declare que o trabalho é defensivo e não envolve exploração, evasão ou abuso de credenciais.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Escopo aprovado para análise de segmentação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Movimento lateral e segmentação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Inventariar zonas e criticidade",
        "instruction": "Liste zonas de usuários, servidores, identidade, banco, backup, administração, cloud, Kubernetes, terceiros, convidados e monitoramento.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mapa de zonas com criticidade e propósito.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Movimento lateral e segmentação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Criar matriz de fluxos legítimos",
        "instruction": "Para cada fluxo, registre origem, destino, porta, protocolo, aplicação, dono, ambiente, justificativa, criticidade e evidência de uso.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz que separa fluxo necessário de fluxo herdado ou desconhecido.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Movimento lateral e segmentação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Identificar caminhos laterais de alto risco",
        "instruction": "Procure estações acessando servidores diretamente, portas administrativas amplas, tráfego entre usuários, acesso a backup, identidade e bancos fora do esperado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista priorizada de caminhos laterais a reduzir.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Movimento lateral e segmentação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Desenhar enforcement por camada",
        "instruction": "Defina onde aplicar controles: VLAN/ACL, firewall interno, SG/NSG, NACL, cloud firewall, NAC, EDR, PAM, bastion, NetworkPolicy e service mesh.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Controles posicionados perto do recurso e compatíveis com operação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Movimento lateral e segmentação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Definir telemetria e detecções",
        "instruction": "Crie alertas para tráfego east-west incomum, portas administrativas, conexões usuário-servidor indevidas, variações de baseline, tentativas bloqueadas e exceções usadas fora da janela.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de detecção com fontes, campos, severidade e ação inicial.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Movimento lateral e segmentação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Planejar piloto e modo observação",
        "instruction": "Escolha uma zona pequena, aplique logging primeiro, simule política em modo monitor quando possível e estime impacto antes do bloqueio.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Piloto com métricas antes/depois e baixo risco operacional.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Movimento lateral e segmentação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Tratar exceções",
        "instruction": "Para cada exceção, defina dono, motivo, risco, compensação, prazo, ticket, aprovação e data de revisão.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Exceções deixam de ser permissões invisíveis.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Movimento lateral e segmentação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Executar rollout por ondas",
        "instruction": "Expanda por zona, criticidade e maturidade de inventário. Comunique usuários, service desk, SOC, redes, cloud e donos de aplicação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Segmentação implantada com controle de impacto.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Movimento lateral e segmentação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Criar RCA e melhoria contínua",
        "instruction": "Depois do piloto, documente falhas de inventário, regras legadas, logs ausentes, exceções excessivas e melhorias de pipeline/IaC.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Segmentação vira processo contínuo, não projeto único.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Movimento lateral e segmentação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Usuário comum acessando servidor administrativo | Sinal: Fluxo lateral para porta administrativa | Query: src_role=user AND dst_tier=admin AND dst_port IN (22,3389,5985) | FP: Suporte remoto aprovado\nDetecção: Muitos destinos internos em sequência | Sinal: Padrão de descoberta lateral | Query: count_distinct(dst_host)>N BY src_host within 10m | FP: Ferramenta de inventário\nDetecção: Violação de matriz zero trust | Sinal: Acesso entre segmentos sem política explícita | Query: flow NOT IN approved_matrix AND action=allowed | FP: Matriz desatualizada",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 14,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Quarentena de endpoint | Bloqueio east-west específico | Revogação de sessão/credencial | Habilitar jump server | Criar regra temporária com expiração",
        "expectedOutput": "Plano de contenção com dono, risco, impacto, comunicação, rollback e validação.",
        "explanation": "Resposta de segurança deve ser precisa. Bloqueios amplos podem esconder evidências e quebrar serviços críticos."
      },
      {
        "number": 15,
        "title": "Fazer debrief e lições aprendidas",
        "instruction": "Finalize registrando achados, evidências, falsos positivos, melhorias, controles permanentes e pendências.",
        "command": "Debrief: achado → evidência → risco → mitigação → detecção → dono → prazo.",
        "expectedOutput": "Relatório defensivo reproduzível e acionável.",
        "explanation": "O valor do laboratório aparece quando o resultado vira melhoria operacional, não apenas conhecimento individual."
      },
      {
        "number": 16,
        "title": "Analisar dataset sintético do caso",
        "instruction": "Use matriz de fluxos para identificar tentativa de comunicação lateral indevida. Diferencie bloqueio correto de allow indevido.",
        "artifact": "timestamp,src_host,src_zone,dst_host,dst_zone,dst_port,protocol,action,approved_flow\n2026-07-01T14:00:01Z,app-01,app,db-01,db,5432,tcp,allow,true\n2026-07-01T14:01:33Z,ws-020,user,fs-01,file,445,tcp,allow,true\n2026-07-01T14:02:10Z,ws-020,user,db-01,db,1433,tcp,allow,false\n2026-07-01T14:03:05Z,ws-020,user,app-02,app,5985,tcp,deny,false",
        "analysisTask": "Aplicar a ideia de detecção: east_west_flow=true AND approved_flow=false AND action=allow",
        "evidence": "Matriz aprovada | Flow logs sintéticos | Regra responsável | Correção específica",
        "expectedOutput": "ws-020 → db-01:1433 foi permitido indevidamente; ws-020 → app-02:5985 foi bloqueado corretamente e deve gerar alerta/contexto.",
        "explanation": "O objetivo é treinar raciocínio defensivo usando metadados fictícios e seguros, sem execução ofensiva nem interação com infraestrutura real."
      },
      {
        "number": 17,
        "title": "Separar fato, hipótese e falso positivo",
        "instruction": "Crie uma tabela com três colunas: fatos observados no dataset, hipóteses defensivas e falsos positivos prováveis.",
        "analysisTask": "Classificar cada evidência como fato, inferência ou lacuna. Não declarar incidente sem correlação suficiente.",
        "expectedOutput": "Tabela com fatos, hipóteses, falsos positivos e próximos dados necessários.",
        "explanation": "Essa separação evita conclusões precipitadas e ensina investigação baseada em evidência."
      },
      {
        "number": 18,
        "title": "Construir mini timeline defensiva",
        "instruction": "Ordene os eventos sintéticos por horário e indique qual fonte confirma cada etapa.",
        "analysisTask": "Montar timeline com timestamp, fonte, evento, interpretação, confiança e próxima ação.",
        "expectedOutput": "Timeline curta capaz de sustentar decisão de contenção, hunting ou descarte como falso positivo.",
        "explanation": "Timeline é o elo entre log isolado e narrativa técnica defensável."
      }
    ],
    "expectedResult": "Plano completo de segmentação defensiva com zonas, matriz de fluxos, controles, logs, detecções, piloto, exceções, rollout e RCA.",
    "validation": [
      {
        "check": "A entrega deve provar que cada fluxo permitido tem dono, justificativa, controle e log; e que fluxos de alto risco foram reduzidos com implantação segura.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "A entrega deve provar que cada fluxo permitido tem dono, justificativa, controle e log; e que fluxos de alto risco foram reduzidos com implantação segura.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Escopo autorizado comprovado",
        "command": "Revisar ROE/checklist",
        "expected": "Alvos, janela, origem, ações permitidas, proibidas e critérios de parada estão documentados.",
        "ifFails": "Não executar o laboratório até formalizar escopo."
      },
      {
        "check": "Detecções com falso positivo tratado",
        "command": "Revisar tabela de detecção",
        "expected": "Cada detecção possui sinal, fonte de log, falso positivo provável e resposta.",
        "ifFails": "Adicionar contexto, exceções e enriquecimento antes de operacionalizar."
      },
      {
        "check": "Mitigação com rollback",
        "command": "Revisar plano de contenção",
        "expected": "Toda ação de contenção tem dono, impacto, retorno e validação.",
        "ifFails": "Trocar bloqueio amplo por ação específica e reversível."
      },
      {
        "check": "Dataset sintético analisado com evidência e falso positivo",
        "command": "Revisar relatório do laboratório",
        "expected": "O relatório contém dataset analisado, fatos, hipóteses, falsos positivos, timeline e contenção proporcional.",
        "ifFails": "Revisar o dataset e separar evidência objetiva de inferência antes de concluir."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se o plano depende apenas de VLAN, revise: segmentação madura combina rede, identidade, endpoint, cloud, aplicação, observabilidade e governança.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "O SOC abriu alerta durante o laboratório",
        "probableCause": "A atividade defensiva foi confundida com incidente ou estava fora da janela comunicada.",
        "howToConfirm": "Compare timestamp, origem e técnica com o ROE.",
        "fix": "Pausar execução, comunicar o ponto focal, registrar evidência e retomar apenas com autorização."
      },
      {
        "symptom": "O achado parece grave, mas há pouco contexto",
        "probableCause": "Falta enriquecimento de identidade, dono, criticidade, processo ou baseline.",
        "howToConfirm": "Verifique CMDB, IAM, EDR, janela de mudança e histórico do ativo.",
        "fix": "Classificar como hipótese até obter evidência suficiente."
      },
      {
        "symptom": "A mitigação proposta quebra serviço crítico",
        "probableCause": "Ação ampla demais ou dependência não mapeada.",
        "howToConfirm": "Cruze matriz de fluxos, dono do serviço e logs de uso.",
        "fix": "Criar contenção específica, exceção temporária ou tabletop antes de produção."
      }
    ],
    "improvements": [
      "Automatizar descoberta de fluxos por flow logs e CMDB.",
      "Adicionar validação de regras em pipeline IaC.",
      "Criar catálogo de fluxos aprovados por aplicação.",
      "Integrar exceções a GRC/tickets com prazo.",
      "Criar dashboards de tráfego east-west e bloqueios por zona.",
      "Converter achados repetíveis em detecções no SIEM/NDR.",
      "Adicionar owner, validade e revisão periódica para exceções.",
      "Automatizar validações defensivas em pipeline ou policy as code quando seguro.",
      "Criar runbook de resposta com evidências mínimas e rollback.",
      "Revisar retenção e qualidade dos logs necessários para investigação."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Matriz de segmentação",
      "Flow logs east-west",
      "Eventos de autenticação",
      "Regras atuais",
      "Teste de negação",
      "Plano de exceções",
      "Matriz aprovada",
      "Flow logs sintéticos",
      "Regra responsável",
      "Correção específica"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Movimento lateral e segmentação defensiva” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Desafio: redesenhar uma rede plana para reduzir movimento lateral",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Reduzir caminhos laterais usando zonas, regras mínimas, identidade, logging e validação contínua de fluxos permitidos.",
    "authorizedScope": "Apenas desenho, revisão de regras, testes de conectividade autorizados e validação de logs. Não tentar exploração lateral.",
    "allowedActions": [
      "Mapear caminhos entre zonas",
      "Testar conectividade permitida/negada",
      "Comparar regras com matriz de negócio",
      "Criar alertas para violação de segmentação"
    ],
    "prohibitedActions": [
      "Usar credenciais para pivot",
      "Executar ferramentas de pós-exploração",
      "Acessar compartilhamentos não autorizados",
      "Desativar firewall interno"
    ],
    "telemetrySources": [
      "Firewall east-west",
      "Windows/Linux auth logs",
      "EDR lateral movement alerts",
      "Flow logs",
      "SMB/RDP/WinRM/SSH events",
      "IAM/session logs",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Usuário comum acessando servidor administrativo",
        "signal": "Fluxo lateral para porta administrativa",
        "queryIdea": "src_role=user AND dst_tier=admin AND dst_port IN (22,3389,5985)",
        "commonFalsePositive": "Suporte remoto aprovado",
        "response": "Validar chamado; bloquear regra ou exigir jump server."
      },
      {
        "name": "Muitos destinos internos em sequência",
        "signal": "Padrão de descoberta lateral",
        "queryIdea": "count_distinct(dst_host)>N BY src_host within 10m",
        "commonFalsePositive": "Ferramenta de inventário",
        "response": "Correlacionar processo e janela; isolar host se não autorizado."
      },
      {
        "name": "Violação de matriz zero trust",
        "signal": "Acesso entre segmentos sem política explícita",
        "queryIdea": "flow NOT IN approved_matrix AND action=allowed",
        "commonFalsePositive": "Matriz desatualizada",
        "response": "Corrigir regra ou atualizar matriz com aprovação."
      }
    ],
    "containmentActions": [
      "Quarentena de endpoint",
      "Bloqueio east-west específico",
      "Revogação de sessão/credencial",
      "Habilitar jump server",
      "Criar regra temporária com expiração"
    ],
    "evidenceChecklist": [
      "Matriz de segmentação",
      "Flow logs east-west",
      "Eventos de autenticação",
      "Regras atuais",
      "Teste de negação",
      "Plano de exceções"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — conexões east-west fora da matriz",
      "theme": "movimento lateral e segmentação defensiva",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "timestamp,src_host,src_zone,dst_host,dst_zone,dst_port,protocol,action,approved_flow",
        "2026-07-01T14:00:01Z,app-01,app,db-01,db,5432,tcp,allow,true",
        "2026-07-01T14:01:33Z,ws-020,user,fs-01,file,445,tcp,allow,true",
        "2026-07-01T14:02:10Z,ws-020,user,db-01,db,1433,tcp,allow,false",
        "2026-07-01T14:03:05Z,ws-020,user,app-02,app,5985,tcp,deny,false"
      ],
      "analysisPrompt": "Use matriz de fluxos para identificar tentativa de comunicação lateral indevida. Diferencie bloqueio correto de allow indevido.",
      "detectionIdea": "east_west_flow=true AND approved_flow=false AND action=allow",
      "expectedFinding": "ws-020 → db-01:1433 foi permitido indevidamente; ws-020 → app-02:5985 foi bloqueado corretamente e deve gerar alerta/contexto.",
      "evidenceToCollect": [
        "Matriz aprovada",
        "Flow logs sintéticos",
        "Regra responsável",
        "Correção específica"
      ],
      "constraints": [
        "Não executar tráfego contra destinos reais a partir do dataset.",
        "Tratar todos os nomes, IPs e usuários como fictícios.",
        "Separar fato observado, hipótese, falso positivo e decisão de contenção.",
        "Preservar somente metadados necessários para o exercício."
      ]
    }
  },
  "exercises": [
    {
      "question": "Uma estação de usuário precisa acessar diretamente um banco de dados em produção? Como você avaliaria?",
      "answer": "Por padrão, não. Eu verificaria dono da aplicação, fluxo esperado, logs de uso, alternativa via aplicação/API, risco, necessidade real e controles compensatórios antes de permitir qualquer exceção."
    },
    {
      "question": "Qual diferença prática entre segmentação e microsegmentação?",
      "answer": "Segmentação separa redes ou zonas amplas. Microsegmentação aplica políticas mais granulares por workload, aplicação, identidade, tag, porta, protocolo e contexto."
    },
    {
      "question": "Quais logs ajudam a investigar possível movimento lateral?",
      "answer": "Flow logs, firewall interno, EDR, DNS, proxy, autenticação/IAM, NAC, logs de servidor, cloud audit, Kubernetes audit e SIEM."
    },
    {
      "question": "Por que bloquear tudo de uma vez é perigoso?",
      "answer": "Porque dependências reais podem não estar documentadas. Sem piloto, baseline, comunicação e rollback, segmentação pode causar indisponibilidade crítica."
    },
    {
      "id": "ex16.7.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “Movimento lateral e segmentação defensiva” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como Firewall east-west, Windows/Linux auth logs, EDR lateral movement alerts, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.7.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Usar credenciais para pivot: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Executar ferramentas de pós-exploração: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Acessar compartilhamentos não autorizados: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.7.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — conexões east-west fora da matriz”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "ws-020 → db-01:1433 foi permitido indevidamente; ws-020 → app-02:5985 foi bloqueado corretamente e deve gerar alerta/contexto. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Qual é o principal objetivo defensivo da segmentação contra movimento lateral?",
      "options": [
        "Aumentar o número de VLANs sem critério",
        "Reduzir caminhos internos desnecessários e limitar raio de explosão",
        "Eliminar a necessidade de logs",
        "Permitir qualquer tráfego interno"
      ],
      "answer": 1,
      "explanation": "Segmentação reduz caminhos laterais e limita impacto de um comprometimento."
    },
    {
      "question": "O que caracteriza uma regra ruim em segmentação?",
      "options": [
        "Origem, destino e porta específicos",
        "Dono e justificativa documentados",
        "Any-to-any entre zonas críticas sem prazo",
        "Logs e revisão periódica"
      ],
      "answer": 2,
      "explanation": "Regras amplas e sem prazo aumentam risco de movimento lateral."
    },
    {
      "question": "Qual fonte é especialmente útil para entender tráfego east-west?",
      "options": [
        "Flow logs",
        "Somente screenshot de usuário",
        "Apenas inventário manual",
        "Banner de login"
      ],
      "answer": 0,
      "explanation": "Flow logs ajudam a ver quem comunicou com quem, quando, por qual porta e com qual ação."
    },
    {
      "question": "Em Zero Trust, o tráfego interno deve ser tratado como:",
      "options": [
        "Sempre confiável",
        "Confiável apenas se vier da VLAN corporativa",
        "Sujeito a verificação explícita e menor privilégio",
        "Livre de monitoramento"
      ],
      "answer": 2,
      "explanation": "Zero Trust rejeita confiança implícita baseada apenas na localização de rede."
    },
    {
      "question": "Qual é uma boa prática para rollout de microsegmentação?",
      "options": [
        "Bloquear tudo sem baseline",
        "Começar por piloto, modo observação, evidências e rollback",
        "Remover EDR para evitar ruído",
        "Desativar logs para reduzir custo"
      ],
      "answer": 1,
      "explanation": "Piloto e observação reduzem risco operacional."
    },
    {
      "question": "Qual fluxo tende a exigir controle mais rígido?",
      "options": [
        "Usuário para portal web publicado",
        "Usuário comum para backup e controladores de domínio por portas administrativas",
        "Servidor de aplicação para banco específico em porta aprovada",
        "Monitoramento para endpoint de métricas"
      ],
      "answer": 1,
      "explanation": "Acesso administrativo ou a zonas críticas por usuário comum é alto risco e deve ser restringido."
    }
  ],
  "flashcards": [
    {
      "front": "Movimento lateral",
      "back": "Deslocamento interno para outros sistemas após acesso inicial. Na defesa, o foco é reduzir caminhos, detectar desvios e conter impacto."
    },
    {
      "front": "Segmentação",
      "back": "Divisão de ambiente em zonas com políticas explícitas de comunicação."
    },
    {
      "front": "Microsegmentação",
      "back": "Política granular por workload, identidade, aplicação, tag, porta, protocolo e contexto."
    },
    {
      "front": "East-west traffic",
      "back": "Tráfego interno entre hosts, servidores, workloads ou zonas, diferente do tráfego entrada/saída de internet."
    },
    {
      "front": "Matriz de fluxos",
      "back": "Documento que define origem, destino, porta, protocolo, dono, justificativa, evidência e controle de cada comunicação permitida."
    },
    {
      "front": "Raio de explosão",
      "back": "Extensão do impacto potencial quando um ativo, credencial ou controle falha."
    }
  ],
  "mentorQuestions": [
    "Qual fluxo interno da sua empresa seria mais perigoso se uma estação comum pudesse acessá-lo diretamente?",
    "Como você provaria que uma regra ampla é realmente necessária e não apenas legado?",
    "Qual controle você aplicaria primeiro: bloqueio de rede, política de identidade, EDR, PAM ou observabilidade? Por quê?"
  ],
  "challenge": {
    "title": "Desafio: redesenhar uma rede plana para reduzir movimento lateral",
    "description": "Uma empresa possui usuários, servidores, domínio, banco, backup, cloud, Kubernetes e terceiros em redes com regras muito amplas. Desenhe uma segmentação defensiva gradual que reduza risco sem interromper negócio.",
    "requirements": [
      "Mapa de zonas",
      "Matriz de fluxos",
      "Classificação de criticidade",
      "Controles por camada",
      "Telemetria e alertas",
      "Piloto e rollback",
      "Tratamento de exceções",
      "Riscos residuais"
    ],
    "deliverable": "Documento de arquitetura defensiva com desenho de zonas, matriz de fluxos, política mínima, plano de rollout e playbook de investigação.",
    "constraints": [
      "Não executar ações fora do escopo autorizado.",
      "Não usar dados sensíveis reais quando dados sintéticos ou metadados bastarem.",
      "Toda detecção deve citar falso positivo provável.",
      "Toda mitigação deve possuir rollback e comunicação.",
      "Usar somente dados sintéticos ou logs internos autorizados e sanitizados.",
      "Não interagir com infraestrutura real de terceiros a partir de IOCs ou nomes do exercício."
    ],
    "expectedDeliverables": [
      "Regras de engajamento ou escopo defensivo",
      "Matriz de telemetria e evidências",
      "Detecções com falsos positivos",
      "Plano de contenção e rollback",
      "Debrief com lições aprendidas",
      "Análise de dataset sintético",
      "Timeline defensiva com fatos e hipóteses",
      "Tabela de falsos positivos e próximos dados necessários"
    ],
    "gradingRubric": [
      {
        "criterion": "Ética, escopo e segurança operacional",
        "points": 20,
        "description": "Define claramente autorização, limites, ações proibidas, critérios de parada e proteção de evidências."
      },
      {
        "criterion": "Detecção e resposta defensiva",
        "points": 20,
        "description": "Cria detecções com telemetria adequada, falsos positivos, resposta proporcional e rollback."
      }
    ]
  },
  "commentedSolution": {
    "overview": "Uma boa solução não começa desenhando firewall. Começa entendendo negócio, aplicações e dependências. Depois transforma dependências reais em fluxos mínimos, observáveis e governados.",
    "keyPoints": [
      "Separar zonas críticas como identidade, backup e banco de dados.",
      "Impedir acesso direto de usuários comuns a serviços administrativos e bancos.",
      "Aplicar enforcement em múltiplas camadas: rede, identidade, endpoint, cloud e aplicação.",
      "Usar flow logs e EDR para validar baseline antes de bloquear.",
      "Tratar exceções com dono, prazo, risco e compensação.",
      "Implantar por ondas com piloto, rollback e métricas."
    ],
    "commonMistakes": [
      "Criar VLANs sem política real.",
      "Permitir any-to-any entre zonas por conveniência.",
      "Bloquear sem conhecer dependências.",
      "Ignorar tráfego cloud e Kubernetes.",
      "Não monitorar tentativas bloqueadas.",
      "Deixar exceções sem prazo e sem dono."
    ],
    "steps": [
      "Confirmar escopo autorizado e critérios de parada.",
      "Selecionar telemetria mínima e proteger evidências.",
      "Gerar hipóteses defensivas e falsos positivos esperados.",
      "Escolher mitigação proporcional, reversível e comunicada.",
      "Registrar debrief com achados, lacunas e melhorias permanentes."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Executar teste ativo sem ROE porque é apenas laboratório",
        "whyItIsWrong": "Mesmo laboratório pode alcançar ativos errados, gerar alertas, coletar dados sensíveis ou ensinar um hábito inseguro. Segurança profissional começa por escopo."
      }
    ],
    "finalAnswer": "Complemento P1-M16: uma solução completa precisa demonstrar ética operacional, escopo autorizado, evidências protegidas, detecções com falsos positivos, contenção proporcional e melhoria contínua."
  },
  "glossary": [
    {
      "term": "Movimento lateral",
      "definition": "Deslocamento interno entre sistemas, contas ou zonas após acesso inicial ou uso indevido de credencial."
    },
    {
      "term": "Segmentação defensiva",
      "definition": "Separação do ambiente em zonas com políticas explícitas para reduzir caminhos indevidos."
    },
    {
      "term": "Microsegmentação",
      "definition": "Controle granular de comunicação por workload, identidade, aplicação, porta, protocolo e contexto."
    },
    {
      "term": "East-west traffic",
      "definition": "Tráfego interno entre sistemas dentro do ambiente corporativo ou cloud."
    },
    {
      "term": "Matriz de fluxos",
      "definition": "Registro formal dos fluxos permitidos com origem, destino, porta, protocolo, dono, justificativa e evidência."
    },
    {
      "term": "Raio de explosão",
      "definition": "Tamanho do impacto potencial caso um ativo ou credencial seja comprometido."
    },
    {
      "term": "Regras de engajamento",
      "shortDefinition": "Documento que define escopo, limites, janela, técnicas permitidas, comunicação e critérios de parada de uma validação de segurança.",
      "longDefinition": "Documento que define escopo, limites, janela, técnicas permitidas, comunicação e critérios de parada de uma validação de segurança.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.7",
        "16.12"
      ]
    },
    {
      "term": "Falso positivo",
      "shortDefinition": "Evento que parece suspeito pela regra, mas possui explicação legítima após enriquecimento e análise.",
      "longDefinition": "Evento que parece suspeito pela regra, mas possui explicação legítima após enriquecimento e análise.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.7",
        "16.12"
      ]
    },
    {
      "term": "NDR",
      "shortDefinition": "Network Detection and Response: capacidade de detectar, investigar e responder usando telemetria de rede.",
      "longDefinition": "Network Detection and Response: capacidade de detectar, investigar e responder usando telemetria de rede.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.7",
        "16.12"
      ]
    },
    {
      "term": "Pacote de evidências",
      "shortDefinition": "Conjunto mínimo de logs, artefatos, horários, fontes e interpretações que sustenta uma conclusão defensiva.",
      "longDefinition": "Conjunto mínimo de logs, artefatos, horários, fontes e interpretações que sustenta uma conclusão defensiva.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.7",
        "16.12"
      ]
    },
    {
      "term": "Dataset sintético",
      "shortDefinition": "Conjunto fictício de logs ou eventos criado para treinar investigação sem expor dados reais.",
      "longDefinition": "Conjunto fictício de logs ou eventos criado para treinar investigação sem expor dados reais.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "PCAP textual",
      "shortDefinition": "Representação sanitizada de metadados de pacotes, útil para ensino sem compartilhar captura real sensível.",
      "longDefinition": "Representação sanitizada de metadados de pacotes, útil para ensino sem compartilhar captura real sensível.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "Timeline de incidente",
      "shortDefinition": "Sequência cronológica de fatos, hipóteses e evidências usadas para reconstruir um evento de segurança.",
      "longDefinition": "Sequência cronológica de fatos, hipóteses e evidências usadas para reconstruir um evento de segurança.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    }
  ],
  "references": [
    {
      "title": "MITRE ATT&CK — Lateral Movement, TA0008",
      "url": "https://attack.mitre.org/tactics/TA0008/"
    },
    {
      "title": "MITRE ATT&CK — Network Segmentation Mitigation M1030",
      "url": "https://attack.mitre.org/mitigations/M1030/"
    },
    {
      "title": "NIST SP 800-207 — Zero Trust Architecture",
      "url": "https://csrc.nist.gov/pubs/sp/800/207/final"
    },
    {
      "title": "CISA — Zero Trust Microsegmentation Guidance Part One",
      "url": "https://www.cisa.gov/resources-tools/resources/zero-trust-microsegmentation-guidance-part-one"
    }
  ],
  "nextLesson": "16.8 — C2, beaconing e detecção comportamental",
  "security": {
    "goodPractices": [
      "Executar atividades práticas apenas em laboratório, ambiente próprio ou escopo formalmente autorizado.",
      "Registrar regras de engajamento, janelas de teste, alvos permitidos e contatos de emergência.",
      "Priorizar validação defensiva: logs, detecção, contenção, mitigação e redução de superfície.",
      "Evitar instruções que ensinem abuso contra redes reais fora de autorização explícita.",
      "Conectar cada técnica estudada a controles de prevenção, monitoramento e resposta.",
      "Definir escopo, autorização, janela, origem dos testes e critérios de parada antes de qualquer validação.",
      "Tratar logs e evidências como dados sensíveis, com mínimo necessário, retenção definida e controle de acesso.",
      "Correlacionar rede, identidade, endpoint e cloud antes de concluir causa ou gravidade.",
      "Preferir mitigação específica, reversível e documentada em vez de bloqueios amplos.",
      "Transformar achados recorrentes em detecções, runbooks e controles automatizados."
    ],
    "badPractices": [
      "Testar redes, serviços ou terceiros sem autorização formal e escopo definido.",
      "Confundir laboratório educacional com permissão para atuar em ambiente real.",
      "Guardar credenciais, PCAPs ou logs sensíveis sem proteção e sem necessidade.",
      "Publicar detalhes exploráveis sem mitigação, contexto defensivo ou autorização.",
      "Executar varreduras agressivas sem janela, rate limit, owner e plano de rollback.",
      "Executar teste ativo sem regras de engajamento formalizadas.",
      "Confundir validação defensiva com permissão para exploração.",
      "Usar ferramenta de segurança sem entender impacto, taxa, escopo e logs gerados.",
      "Bloquear ativos críticos sem plano de rollback e comunicação.",
      "Registrar achado sem evidência reproduzível."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar segurança de redes, Blue Team, pentest autorizado, detecção, resposta e limites éticos com impacto operacional, financeiro e de segurança.",
      "Concluir incidente a partir de um único IOC sem contexto.",
      "Ignorar falsos positivos de ferramentas corporativas legítimas.",
      "Não preservar timestamp, fonte e integridade mínima da evidência.",
      "Criar regra de firewall ou SIEM sem dono, validade e revisão.",
      "Testar fora da janela aprovada por parecer tecnicamente simples."
    ],
    "vulnerabilities": [
      {
              "name": "Risco Blue Team específico — Movimento lateral e segmentação defensiva",
              "description": "Em Movimento lateral e segmentação defensiva, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
              "defensiveExplanation": "O risco aparece quando datasets, PCAPs, flow logs e indicadores são analisados sem baseline, autorização, falso positivo, cadeia mínima de evidência ou contenção proporcional.",
              "mitigation": "Usar datasets sintéticos ou logs autorizados e sanitizados, definir ROE, preservar evidências, correlacionar múltiplas fontes, documentar falso positivo e aplicar mitigação reversível e proporcional."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      },
      {
        "name": "Validação defensiva sem escopo formal",
        "description": "Mesmo atividades de Blue Team podem causar impacto, expor dados ou violar regras quando não há escopo, janela, alvos e critérios de parada documentados.",
        "defensiveExplanation": "O risco não está apenas na técnica, mas na ausência de governança operacional. Segurança profissional exige autorização, evidência e proporcionalidade.",
        "mitigation": "Criar ROE, comunicar SOC/NOC, limitar taxa e escopo, preservar logs e definir rollback antes da execução."
      }
    ],
    "monitoring": [
      "Logs de firewall, proxy, DNS, DHCP, VPN, EDR, NDR, SIEM, NetFlow/IPFIX e autenticação.",
      "Alertas de varredura, beaconing, conexões laterais, exfiltração e anomalias de volume.",
      "Evidências de escopo autorizado, horários de teste e owners dos ativos analisados.",
      "Firewall east-west",
      "Windows/Linux auth logs",
      "EDR lateral movement alerts",
      "Flow logs",
      "SMB/RDP/WinRM/SSH events",
      "IAM/session logs"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.7.",
      "Usuário comum acessando servidor administrativo — sinal: Fluxo lateral para porta administrativa; ideia de consulta: src_role=user AND dst_tier=admin AND dst_port IN (22,3389,5985); falso positivo comum: Suporte remoto aprovado.",
      "Muitos destinos internos em sequência — sinal: Padrão de descoberta lateral; ideia de consulta: count_distinct(dst_host)>N BY src_host within 10m; falso positivo comum: Ferramenta de inventário.",
      "Violação de matriz zero trust — sinal: Acesso entre segmentos sem política explícita; ideia de consulta: flow NOT IN approved_matrix AND action=allowed; falso positivo comum: Matriz desatualizada."
    ],
    "ethicalLimits": {
      "authorizedScope": "Apenas desenho, revisão de regras, testes de conectividade autorizados e validação de logs. Não tentar exploração lateral.",
      "allowedActions": [
        "Mapear caminhos entre zonas",
        "Testar conectividade permitida/negada",
        "Comparar regras com matriz de negócio",
        "Criar alertas para violação de segmentação"
      ],
      "prohibitedActions": [
        "Usar credenciais para pivot",
        "Executar ferramentas de pós-exploração",
        "Acessar compartilhamentos não autorizados",
        "Desativar firewall interno"
      ],
      "stopConditions": [
        "Indício de impacto em produção não previsto.",
        "Alvo, técnica ou origem fora do escopo aprovado.",
        "Coleta acidental de dado sensível além do mínimo necessário.",
        "Alerta do SOC/NOC indicando risco operacional.",
        "Ausência de responsável disponível para decisão."
      ]
    }
  },
  "troubleshooting": {
    "symptoms": [
      "Falha ou comportamento inesperado relacionado a Movimento lateral e segmentação defensiva.",
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
      "Qual evidência comprova o entendimento da aula 16.7?"
    ],
    "commands": [
      {
        "platform": "Defensivo/SIEM",
        "command": "consultar logs de firewall, DNS, proxy, VPN, EDR e NetFlow dentro do escopo autorizado",
        "purpose": "Validar evidências de comportamento suspeito ou de teste controlado.",
        "expectedObservation": "Eventos correlacionados por origem, destino, horário, usuário e ação.",
        "interpretation": "Sem correlação temporal e escopo, a evidência pode ser ruído ou falso positivo."
      },
      {
        "platform": "Linux laboratório",
        "command": "ss -tulpen && ip route && tcpdump -ni <iface> host <ip_autorizado>",
        "purpose": "Observar serviços, rotas e pacotes apenas em ambiente autorizado.",
        "expectedObservation": "Tráfego compatível com o cenário de laboratório.",
        "interpretation": "Pacotes fora do esperado indicam hipótese defensiva para investigação, não autorização para atacar terceiros."
      },
      {
        "platform": "Blue Team",
        "command": "documentar IOC, hipótese, fonte de log, severidade, impacto e mitigação",
        "purpose": "Transformar observação técnica em investigação defensiva acionável.",
        "expectedObservation": "Registro claro, reprodutível e útil para resposta.",
        "interpretation": "Achados sem contexto e mitigação não amadurecem a defesa."
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
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "exerciseDone",
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
      "16.8"
    ]
  },
  "blueTeamEnhancement": {
    "title": "Movimento lateral e segmentação defensiva",
    "defensiveGoal": "Reduzir caminhos laterais usando zonas, regras mínimas, identidade, logging e validação contínua de fluxos permitidos.",
    "authorizedScope": "Apenas desenho, revisão de regras, testes de conectividade autorizados e validação de logs. Não tentar exploração lateral.",
    "allowedActions": [
      "Mapear caminhos entre zonas",
      "Testar conectividade permitida/negada",
      "Comparar regras com matriz de negócio",
      "Criar alertas para violação de segmentação"
    ],
    "prohibitedActions": [
      "Usar credenciais para pivot",
      "Executar ferramentas de pós-exploração",
      "Acessar compartilhamentos não autorizados",
      "Desativar firewall interno"
    ],
    "telemetrySources": [
      "Firewall east-west",
      "Windows/Linux auth logs",
      "EDR lateral movement alerts",
      "Flow logs",
      "SMB/RDP/WinRM/SSH events",
      "IAM/session logs"
    ],
    "detectionEngineering": [
      {
        "name": "Usuário comum acessando servidor administrativo",
        "signal": "Fluxo lateral para porta administrativa",
        "queryIdea": "src_role=user AND dst_tier=admin AND dst_port IN (22,3389,5985)",
        "commonFalsePositive": "Suporte remoto aprovado",
        "response": "Validar chamado; bloquear regra ou exigir jump server."
      },
      {
        "name": "Muitos destinos internos em sequência",
        "signal": "Padrão de descoberta lateral",
        "queryIdea": "count_distinct(dst_host)>N BY src_host within 10m",
        "commonFalsePositive": "Ferramenta de inventário",
        "response": "Correlacionar processo e janela; isolar host se não autorizado."
      },
      {
        "name": "Violação de matriz zero trust",
        "signal": "Acesso entre segmentos sem política explícita",
        "queryIdea": "flow NOT IN approved_matrix AND action=allowed",
        "commonFalsePositive": "Matriz desatualizada",
        "response": "Corrigir regra ou atualizar matriz com aprovação."
      }
    ],
    "ndrSiemMapping": {
      "minimumFields": [
        "timestamp",
        "src_ip",
        "src_zone",
        "src_user_or_identity",
        "dst_ip",
        "dst_fqdn",
        "dst_port",
        "protocol",
        "action",
        "bytes_in",
        "bytes_out",
        "device_or_sensor",
        "rule_or_policy",
        "correlation_id"
      ],
      "enrichment": [
        "CMDB owner",
        "criticidade do ativo",
        "zona de rede",
        "identidade",
        "geolocalização aproximada",
        "categoria do destino",
        "janela de mudança"
      ],
      "retentionGuidance": "Manter metadados de rede por tempo compatível com investigação, auditoria e requisitos legais. Evitar armazenar conteúdo sensível quando metadados bastam."
    },
    "containmentPlaybook": [
      "Quarentena de endpoint",
      "Bloqueio east-west específico",
      "Revogação de sessão/credencial",
      "Habilitar jump server",
      "Criar regra temporária com expiração"
    ],
    "evidencePackage": [
      "Matriz de segmentação",
      "Flow logs east-west",
      "Eventos de autenticação",
      "Regras atuais",
      "Teste de negação",
      "Plano de exceções"
    ],
    "successCriteria": [
      "O escopo autorizado está explícito e verificável.",
      "As ações proibidas estão documentadas antes de qualquer teste.",
      "Cada achado possui evidência, fonte, horário e interpretação.",
      "A detecção proposta possui hipótese, campo de log, falso positivo provável e resposta.",
      "A mitigação é proporcional, reversível e não cria risco maior que o problema."
    ],
    "debriefQuestions": [
      "Que evidência permitiria defender essa conclusão em uma revisão técnica?",
      "Qual falso positivo mais provável precisa ser tratado?",
      "Qual ação de contenção reduziria risco sem destruir evidência?",
      "O que deve virar controle contínuo depois do laboratório?"
    ]
  },
  "blueTeamSyntheticDataset": {
    "title": "Dataset sintético — conexões east-west fora da matriz",
    "theme": "movimento lateral e segmentação defensiva",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "timestamp,src_host,src_zone,dst_host,dst_zone,dst_port,protocol,action,approved_flow",
      "2026-07-01T14:00:01Z,app-01,app,db-01,db,5432,tcp,allow,true",
      "2026-07-01T14:01:33Z,ws-020,user,fs-01,file,445,tcp,allow,true",
      "2026-07-01T14:02:10Z,ws-020,user,db-01,db,1433,tcp,allow,false",
      "2026-07-01T14:03:05Z,ws-020,user,app-02,app,5985,tcp,deny,false"
    ],
    "analysisPrompt": "Use matriz de fluxos para identificar tentativa de comunicação lateral indevida. Diferencie bloqueio correto de allow indevido.",
    "detectionIdea": "east_west_flow=true AND approved_flow=false AND action=allow",
    "expectedFinding": "ws-020 → db-01:1433 foi permitido indevidamente; ws-020 → app-02:5985 foi bloqueado corretamente e deve gerar alerta/contexto.",
    "evidenceToCollect": [
      "Matriz aprovada",
      "Flow logs sintéticos",
      "Regra responsável",
      "Correção específica"
    ],
    "constraints": [
      "Não executar tráfego contra destinos reais a partir do dataset.",
      "Tratar todos os nomes, IPs e usuários como fictícios.",
      "Separar fato observado, hipótese, falso positivo e decisão de contenção.",
      "Preservar somente metadados necessários para o exercício."
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    }
  ]
};
