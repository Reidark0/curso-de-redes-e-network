export const lesson1608 = {
  "id": "16.8",
  "moduleId": "m16",
  "order": 8,
  "title": "C2, beaconing e detecção comportamental",
  "subtitle": "Como reconhecer comunicação persistente e anômala de forma defensiva, correlacionando DNS, proxy, flow logs, EDR, SIEM, identidade, cloud e contexto operacional.",
  "duration": "300-450 min",
  "estimatedStudyTimeMinutes": 450,
  "difficulty": "avançado",
  "type": "segurança defensiva",
  "xp": 450,
  "tags": [
    "C2",
    "command and control",
    "beaconing",
    "detecção comportamental",
    "NDR",
    "SIEM",
    "DNS logs",
    "proxy logs",
    "flow logs",
    "EDR",
    "egress control",
    "threat hunting",
    "Blue Team",
    "SOC",
    "anomalia",
    "baseline",
    "ética",
    "escopo autorizado",
    "evidências",
    "detecção",
    "mitigação",
    "dataset sintético",
    "PCAP sintético",
    "Zeek",
    "NetFlow",
    "timeline de incidente"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.4",
      "reason": "IDS, IPS, NDR e NetFlow fornecem a base de sensores para comportamento de rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "SIEM, logs e correlação são essenciais para transformar sinais fracos em investigação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.5",
      "reason": "DNS, HTTP/TLS e indicadores de comprometimento são fontes centrais para análise de C2."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.7",
      "reason": "Movimento lateral e segmentação ajudam a entender o contexto antes de investigar egress suspeito."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.12",
      "reason": "War room, RCA e playbook integrado orientam resposta proporcional e documentação."
    }
  ],
  "objectives": [
    "Explicar C2 e beaconing de forma defensiva, sem instruções ofensivas ou operacionais de abuso.",
    "Diferenciar periodicidade legítima de comunicação suspeita usando contexto e baseline.",
    "Mapear fontes de telemetria úteis: DNS, proxy, firewall, flow logs, EDR, SIEM, IAM, cloud audit e Kubernetes.",
    "Construir hipóteses de detecção comportamental com base em raridade, frequência, volume, horário e destino.",
    "Definir resposta proporcional para possível C2 preservando evidências e evitando indisponibilidade desnecessária.",
    "Propor melhorias preventivas em egress control, DNS filtering, proxy, segmentation, DevSecOps e policy as code."
  ],
  "learningOutcomes": [
    "Dado um conjunto de logs, o aluno identifica sinais de beaconing sem depender de um único IOC.",
    "Dado um alerta de C2, o aluno constrói uma linha do tempo defensiva com DNS, proxy, flow logs, EDR e identidade.",
    "Dado um falso positivo provável, o aluno demonstra quais evidências faltam antes de escalar severidade.",
    "Dado um workload cloud com egress anômalo, o aluno propõe contenção proporcional e melhoria em policy as code.",
    "Dado um padrão periódico, o aluno diferencia automação legítima, telemetria de agente e comportamento suspeito.",
    "Dado um cenário de SOC, o aluno escreve uma regra analítica e um playbook seguro de resposta."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>Quando uma organização já sabe inventariar ativos, validar portas, defender camada 2 e reduzir movimento lateral, surge uma pergunta decisiva: como perceber que um sistema está tentando manter comunicação persistente com alguém fora do ambiente?</p>\n  <p>Em segurança defensiva, <strong>C2</strong>, ou Command and Control, representa a possibilidade de um host comprometido tentar se comunicar com uma infraestrutura externa para receber instruções, enviar sinais de vida ou manter persistência operacional. O objetivo desta aula não é ensinar a criar canal de C2. O objetivo é ensinar o Blue Team a reconhecer <strong>padrões comportamentais</strong> que diferenciam tráfego normal de comunicação suspeita.</p>\n  <div class=\"callout callout--warning\"><strong>Limite ético e seguro:</strong> todo o conteúdo é defensivo. Não há instruções para construir malware, infraestrutura de C2, evasão, exploração, persistência ou operação ofensiva. O foco é detecção, correlação, contenção proporcional, investigação e melhoria de controles.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>No início das redes corporativas, detectar ameaça significava procurar assinaturas conhecidas em arquivos, portas incomuns ou endereços explicitamente maliciosos. Esse modelo ajudava, mas dependia de saber previamente o que procurar.</p>\n  <p>Com o amadurecimento de ataques, malware, botnets, ransomware e abuso de ferramentas legítimas, defensores passaram a olhar menos para um indicador isolado e mais para o comportamento ao longo do tempo: periodicidade de conexões, destinos raros, baixo volume repetitivo, domínio recém-observado, user-agent incomum, falhas repetidas, mudança súbita de egress, uso anormal de DNS ou HTTPS e comunicação fora do padrão do host.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Assinaturas:</strong> bloqueio por hash, IP, domínio ou padrão conhecido.</div><div class=\"timeline-item\"><strong>IDS/IPS:</strong> inspeção de tráfego e alertas por regra ou anomalia.</div><div class=\"timeline-item\"><strong>NDR e SIEM:</strong> correlação de fluxos, DNS, proxy, endpoint e identidade.</div><div class=\"timeline-item\"><strong>Detecção comportamental:</strong> baseline, sazonalidade, raridade, periodicidade e contexto.</div></div>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema defensivo é que tráfego malicioso frequentemente tenta parecer tráfego comum. HTTPS, DNS, APIs, CDNs, proxies e portas permitidas são usados diariamente por aplicações legítimas. Bloquear tudo quebraria a empresa; permitir tudo cria caminho de saída sem visibilidade.</p>\n  <p>Além disso, um único IOC raramente conta a história completa. Um domínio suspeito pode ser falso positivo. Uma conexão para porta 443 pode ser atualização legítima. Um beacon pode ter jitter, volume baixo e intervalos variáveis. Por isso, o analista precisa trabalhar com hipóteses, evidências e correlação.</p>\n  <ul><li><strong>Desafio 1:</strong> distinguir automação legítima de comunicação suspeita.</li><li><strong>Desafio 2:</strong> detectar comportamento em tráfego criptografado sem depender de descriptografia total.</li><li><strong>Desafio 3:</strong> reduzir egress indevido sem derrubar serviços reais.</li><li><strong>Desafio 4:</strong> preservar evidências antes de conter.</li><li><strong>Desafio 5:</strong> transformar achado em melhoria de arquitetura, não apenas em bloqueio pontual.</li></ul>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>A defesa evoluiu de listas estáticas para modelos de comportamento. Primeiro, ambientes bloqueavam IPs e domínios conhecidos. Depois, adicionaram IDS/IPS, proxies, firewalls de próxima geração, DNS filtering, EDR e SIEM. Em seguida, NDR, flow analytics e UEBA passaram a observar padrões: quem fala com quem, quando, com que frequência, por quanto tempo, com qual volume e por qual caminho.</p>\n  <p>Em cloud e DevSecOps, a evolução trouxe controles programáveis: egress por Security Group/NSG/firewall, private endpoints, NAT centralizado, DNS logs, VPC/VNet flow logs, WAF logs, proxy logs, workload identity, policy as code e testes sintéticos. O desafio moderno não é apenas coletar logs; é transformar logs em uma narrativa defensiva confiável.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p><strong>Command and Control</strong> é uma categoria defensiva usada para representar comunicação entre um sistema potencialmente comprometido e uma entidade de controle externa. No MITRE ATT&amp;CK, Command and Control descreve técnicas usadas para comunicação com sistemas sob controle adversário. Para o aluno deste curso, o mais importante é entender o lado defensivo: sinais, hipóteses, telemetria, contenção e resposta.</p>\n  <p><strong>Beaconing</strong>, neste contexto defensivo, é o padrão em que um host realiza comunicações repetidas, muitas vezes pequenas e periódicas, para um destino. Nem todo comportamento periódico é malicioso: agentes EDR, backup, atualização, NTP, monitoramento, mensageria e telemetria legítima também geram padrões. A diferença está no contexto.</p>\n  <p><strong>Detecção comportamental</strong> compara o comportamento observado com o baseline esperado para host, usuário, aplicação, rede, horário, volume, destino e protocolo.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Do ponto de vista de rede, uma investigação de C2 começa com metadados. O analista observa origem, destino, porta, protocolo, horário, duração, bytes enviados, bytes recebidos, frequência, nomes DNS, SNI, certificado, user-agent, método HTTP, status code, proxy action, decisão de firewall e processo no endpoint quando disponível.</p>\n  <p>O sinal defensivo raramente é uma única conexão. O sinal costuma surgir quando várias perguntas são respondidas juntas: este host já falava com esse destino? Outros hosts semelhantes falam? O destino é raro? O domínio foi visto pela primeira vez hoje? A periodicidade é estranha? O volume é baixo e constante? O tráfego ocorre fora do expediente? O processo no endpoint faz sentido? O usuário estava ativo?</p>\n  <p>Isso exige correlação entre camadas: DNS mostra intenção de resolução; proxy mostra requisição web; firewall/flow logs mostram conexão; EDR mostra processo; IAM mostra usuário; cloud audit mostra mudança de controle; SIEM junta a linha do tempo.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Uma arquitetura defensiva para detectar C2 e beaconing precisa de pontos de visibilidade e pontos de controle. Visibilidade sem controle vira apenas alerta. Controle sem visibilidade vira bloqueio cego. A arquitetura equilibrada combina DNS logging, proxy ou secure web gateway, firewall de egress, flow logs, EDR, NDR, SIEM, threat intelligence, inventário e playbooks.</p>\n  <p>Em ambientes cloud, isso inclui logs de VPC/VNet, NAT, firewall gerenciado, DNS privado, load balancer, WAF, Kubernetes, workloads e trilhas de auditoria. Em ambientes corporativos, inclui proxy, DNS recursivo, firewall de borda, NAC, EDR, NetFlow/IPFIX, Zeek/Suricata quando aplicável e integração com CMDB.</p>\n  <p>A arquitetura recomendada separa três planos: <strong>coleta</strong>, <strong>análise</strong> e <strong>resposta</strong>. A coleta observa. A análise cria hipótese e severidade. A resposta aplica contenção proporcional, preserva evidência e abre melhoria estrutural.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Imagine uma portaria de prédio corporativo. Algumas pessoas entram e saem todos os dias em horários esperados. Entregadores aparecem com justificativa. Técnicos visitam salas específicas. Tudo isso é normal. Mas se uma pessoa sai a cada cinco minutos, sempre olha ao redor, entrega pequenos bilhetes no mesmo ponto e volta, a portaria não precisa saber o conteúdo dos bilhetes para perceber um comportamento estranho.</p>\n  <p>Detecção de beaconing é parecida. Mesmo quando o conteúdo está criptografado, padrões de tempo, destino, volume, frequência e contexto podem revelar que algo merece investigação. O objetivo não é acusar automaticamente; é priorizar evidência para análise.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Um notebook corporativo acessa vários sites durante o dia. Isso é normal. Porém, os logs mostram que ele consulta um domínio nunca visto pela empresa, resolve para infraestrutura de hospedagem genérica e faz requisições HTTPS curtas a cada 60 segundos durante toda a madrugada.</p>\n  <p>A resposta profissional não é formatar o notebook imediatamente nem bloquear metade da internet. A resposta é criar um dossiê: host, usuário, processo, DNS, proxy, SNI, certificado, volume, horários, reputação, comparação com pares, EDR, mudanças recentes e impacto. Se o risco se confirmar, aplica-se contenção proporcional: isolamento do endpoint, bloqueio de domínio, coleta forense e abertura de RCA.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa com milhares de estações, o SOC percebe padrão de baixa volumetria para domínios raros vindo de cinco hosts da área financeira. O proxy mostra user-agent incomum. O DNS mostra NXDOMAINs antes de um domínio válido. O EDR indica execução de um binário em diretório temporário. O firewall mostra egress permitido por regra ampla.</p>\n  <p>O diagnóstico defensivo combina evidências: comportamento de rede, endpoint, identidade e controle. A ação madura inclui conter os hosts, bloquear destino, preservar evidências, revisar regra de egress, comparar com baseline da área financeira, procurar hosts com padrão semelhante e abrir melhoria no processo de allowlist.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em cloud, um workload privado começa a fazer conexões frequentes por NAT Gateway para destinos externos não documentados. VPC Flow Logs mostram o tráfego; logs de DNS indicam domínios recém-observados; CloudTrail ou logs equivalentes mostram uma alteração recente de IAM; o Kubernetes registra um novo deployment; e o billing mostra crescimento de egress.</p>\n  <p>A investigação defensiva precisa responder: o workload deveria ter internet? Existe private endpoint para o serviço consumido? O tráfego deveria sair pelo NAT ou por proxy inspecionado? O namespace Kubernetes possui NetworkPolicy? O egress está limitado por firewall? A imagem foi assinada? O pipeline aprovou a mudança?</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, a prevenção começa antes da produção. Pipelines podem impedir workloads com egress amplo, imagens sem origem confiável, containers rodando com permissões excessivas, secrets expostos, endpoints públicos indevidos e ausência de logs. Testes sintéticos podem validar se aplicações falam apenas com destinos aprovados.</p>\n  <p>Quando uma detecção aparece, o pipeline também ajuda a responder. O time consegue rastrear qual commit, imagem, chart, módulo IaC ou mudança de configuração abriu novo caminho de saída. Assim, a contenção deixa de ser apenas bloqueio manual e vira correção versionada, revisada e auditável.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Um alerta de possível beaconing deve ser tratado como hipótese, não como sentença. O playbook defensivo pergunta: o host está em escopo crítico? Há processo suspeito? O destino é raro? A frequência é anômala? Há correspondência com threat intelligence? O usuário realizou ação compatível? Há movimentação lateral, tentativa de exfiltração ou alteração de persistência?</p>\n  <p>A resposta proporcional pode incluir bloqueio temporário de domínio, quarentena do endpoint, captura de evidências, enriquecimento com EDR, consulta ao dono da aplicação, hunting por padrão semelhante e revisão de egress. Uma má prática é apagar evidências antes de compreender a linha do tempo.</p>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Somente análise de logs, datasets sintéticos e simulação local inofensiva. Não contatar infraestrutura maliciosa real.</p><p><strong>Ações proibidas:</strong> Executar malware; Baixar payload; Conectar a C2 real; Tentar evasão; Ocultar tráfego de controles.</p><p><strong>Meta defensiva:</strong> Detectar padrões de comunicação suspeita por comportamento: periodicidade, raridade, volume, destino, processo e contexto.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra o ciclo defensivo de detecção comportamental: telemetria de rede e endpoint alimenta análise de periodicidade, raridade e contexto; o SIEM gera hipótese; e a resposta aplica contenção proporcional com preservação de evidências.</p>\n  <div class=\"diagram-container\">\n    <svg class=\"lesson-diagram\" viewBox=\"0 0 980 560\" role=\"img\" aria-label=\"Arquitetura defensiva para detecção de C2, beaconing e comportamento anômalo\" aria-labelledby=\"svg-16-8-content-diagram-1-title svg-16-8-content-diagram-1-desc\">\n      <title id=\"svg-16-8-content-diagram-1-title\">C2, beaconing e detecção comportamental</title>\n      <desc id=\"svg-16-8-content-diagram-1-desc\">Diagrama pedagógico da aula 16.8, C2, beaconing e detecção comportamental, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1608\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" /></marker>\n        <filter id=\"shadow1608\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\"><feDropShadow dx=\"0\" dy=\"4\" stdDeviation=\"4\" flood-opacity=\"0.18\"/></filter>\n      </defs>\n      <rect x=\"20\" y=\"20\" width=\"940\" height=\"520\" rx=\"22\" class=\"svg-surface\"/>\n      <text x=\"490\" y=\"58\" text-anchor=\"middle\" class=\"svg-title\">C2, beaconing e detecção comportamental</text>\n\n      <rect x=\"70\" y=\"105\" width=\"150\" height=\"85\" rx=\"14\" class=\"svg-node svg-endpoint\" filter=\"url(#shadow1608)\"/>\n      <text x=\"145\" y=\"138\" text-anchor=\"middle\" class=\"svg-label\">Endpoint</text>\n      <text x=\"145\" y=\"163\" text-anchor=\"middle\" class=\"svg-small\">processo, usuário</text>\n\n      <rect x=\"70\" y=\"250\" width=\"150\" height=\"85\" rx=\"14\" class=\"svg-node svg-cloud\" filter=\"url(#shadow1608)\"/>\n      <text x=\"145\" y=\"283\" text-anchor=\"middle\" class=\"svg-label\">Workload cloud</text>\n      <text x=\"145\" y=\"308\" text-anchor=\"middle\" class=\"svg-small\">pod, VM, função</text>\n\n      <rect x=\"300\" y=\"90\" width=\"165\" height=\"70\" rx=\"14\" class=\"svg-sensor\"/>\n      <text x=\"383\" y=\"122\" text-anchor=\"middle\" class=\"svg-label\">DNS logs</text>\n      <text x=\"383\" y=\"145\" text-anchor=\"middle\" class=\"svg-small\">domínio, NXDOMAIN</text>\n\n      <rect x=\"300\" y=\"180\" width=\"165\" height=\"70\" rx=\"14\" class=\"svg-sensor\"/>\n      <text x=\"383\" y=\"212\" text-anchor=\"middle\" class=\"svg-label\">Proxy / WAF</text>\n      <text x=\"383\" y=\"235\" text-anchor=\"middle\" class=\"svg-small\">URL, SNI, status</text>\n\n      <rect x=\"300\" y=\"270\" width=\"165\" height=\"70\" rx=\"14\" class=\"svg-sensor\"/>\n      <text x=\"383\" y=\"302\" text-anchor=\"middle\" class=\"svg-label\">Flow logs</text>\n      <text x=\"383\" y=\"325\" text-anchor=\"middle\" class=\"svg-small\">5-tupla, bytes</text>\n\n      <rect x=\"300\" y=\"360\" width=\"165\" height=\"70\" rx=\"14\" class=\"svg-sensor\"/>\n      <text x=\"383\" y=\"392\" text-anchor=\"middle\" class=\"svg-label\">EDR / IAM</text>\n      <text x=\"383\" y=\"415\" text-anchor=\"middle\" class=\"svg-small\">processo, usuário</text>\n\n      <rect x=\"555\" y=\"140\" width=\"170\" height=\"180\" rx=\"18\" class=\"svg-analytics\" filter=\"url(#shadow1608)\"/>\n      <text x=\"640\" y=\"176\" text-anchor=\"middle\" class=\"svg-label\">Análise</text>\n      <text x=\"640\" y=\"205\" text-anchor=\"middle\" class=\"svg-small\">periodicidade</text>\n      <text x=\"640\" y=\"230\" text-anchor=\"middle\" class=\"svg-small\">raridade</text>\n      <text x=\"640\" y=\"255\" text-anchor=\"middle\" class=\"svg-small\">volume</text>\n      <text x=\"640\" y=\"280\" text-anchor=\"middle\" class=\"svg-small\">contexto</text>\n\n      <rect x=\"790\" y=\"105\" width=\"125\" height=\"70\" rx=\"14\" class=\"svg-siem\"/>\n      <text x=\"852\" y=\"137\" text-anchor=\"middle\" class=\"svg-label\">SIEM</text>\n      <text x=\"852\" y=\"160\" text-anchor=\"middle\" class=\"svg-small\">hipótese</text>\n\n      <rect x=\"790\" y=\"245\" width=\"125\" height=\"70\" rx=\"14\" class=\"svg-response\"/>\n      <text x=\"852\" y=\"276\" text-anchor=\"middle\" class=\"svg-label\">Resposta</text>\n      <text x=\"852\" y=\"300\" text-anchor=\"middle\" class=\"svg-small\">contenção</text>\n\n      <rect x=\"790\" y=\"385\" width=\"125\" height=\"70\" rx=\"14\" class=\"svg-govern\"/>\n      <text x=\"852\" y=\"416\" text-anchor=\"middle\" class=\"svg-label\">Melhoria</text>\n      <text x=\"852\" y=\"440\" text-anchor=\"middle\" class=\"svg-small\">egress/policy</text>\n\n      <path d=\"M220 140 C255 120, 270 115, 300 122\" class=\"svg-flow\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M220 150 C255 190, 270 210, 300 215\" class=\"svg-flow\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M220 292 C255 300, 270 303, 300 305\" class=\"svg-flow\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M220 305 C255 365, 270 390, 300 395\" class=\"svg-flow\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M465 125 C505 145, 525 160, 555 182\" class=\"svg-flow\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M465 215 C505 215, 525 218, 555 222\" class=\"svg-flow\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M465 305 C505 290, 525 278, 555 260\" class=\"svg-flow\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M465 395 C515 360, 535 320, 555 292\" class=\"svg-flow\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M725 190 C755 160, 770 145, 790 140\" class=\"svg-flow svg-flow-alert\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M852 175 L852 245\" class=\"svg-flow svg-flow-alert\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M852 315 L852 385\" class=\"svg-flow svg-flow-improve\" marker-end=\"url(#arrow1608)\"/>\n      <path d=\"M790 280 C710 365, 585 455, 465 395\" class=\"svg-flow svg-flow-feedback\" marker-end=\"url(#arrow1608)\"/>\n      <text x=\"585\" y=\"470\" text-anchor=\"middle\" class=\"svg-note\">Bloqueio proporcional + preservação de evidências + RCA</text>\n\n      <style>\n        .svg-surface{fill:#f8fafc;stroke:#334155;stroke-width:2}\n        .svg-title{font:700 22px system-ui;fill:#0f172a}\n        .svg-label{font:700 15px system-ui;fill:#0f172a}\n        .svg-small{font:600 12px system-ui;fill:#475569}\n        .svg-note{font:700 13px system-ui;fill:#334155}\n        .svg-node{fill:#ffffff;stroke:#2563eb;stroke-width:2}\n        .svg-endpoint{stroke:#2563eb}\n        .svg-cloud{stroke:#0ea5e9}\n        .svg-sensor{fill:#ecfeff;stroke:#0891b2;stroke-width:2}\n        .svg-analytics{fill:#fef3c7;stroke:#d97706;stroke-width:2}\n        .svg-siem{fill:#ede9fe;stroke:#7c3aed;stroke-width:2}\n        .svg-response{fill:#fee2e2;stroke:#dc2626;stroke-width:2}\n        .svg-govern{fill:#dcfce7;stroke:#16a34a;stroke-width:2}\n        .svg-flow{fill:none;stroke:#334155;stroke-width:3}\n        .svg-flow-alert{stroke:#dc2626}\n        .svg-flow-improve{stroke:#16a34a}\n        .svg-flow-feedback{stroke:#7c3aed;stroke-dasharray:7 5}\n        #arrow1608 path{fill:#334155}\n      </style>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é a construção de um playbook defensivo para investigar possível beaconing sem executar tráfego malicioso. Você trabalhará com cenário, dados simulados, hipóteses, correlação e resposta proporcional.</p>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — beaconing por intervalo regular</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code>timestamp,host,dst_fqdn,dst_ip,dst_port,protocol,bytes_out,bytes_in,interval_seconds,process,verdict\n2026-07-01T15:00:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,420,210,60,powershell.exe,suspicious-pattern\n2026-07-01T15:01:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,418,205,60,powershell.exe,suspicious-pattern\n2026-07-01T15:02:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,421,207,60,powershell.exe,suspicious-pattern\n2026-07-01T15:03:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,419,209,60,powershell.exe,suspicious-pattern\n2026-07-01T15:04:20Z,ws-044,updates.vendor.example,198.51.100.50,443,tcp,12000,99000,3600,agent.exe,likely-benign</code></pre><p><strong>Tarefa:</strong> Detecte periodicidade, baixo volume, domínio raro, processo e falso positivo provável. Não conclua incidente sem EDR/DNS/proxy/contexto.</p><p><strong>Ideia de detecção:</strong> <code>stddev(interval_seconds)<5 AND bytes_out<1000 AND domain_rarity=high AND process NOT IN baseline</code></p><p><strong>Achado esperado:</strong> ws-031 apresenta padrão regular de 60s com baixo volume e processo incomum; deve virar hipótese de C2/beaconing para enriquecimento.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios treinam interpretação de padrões: periodicidade, raridade, volume, destino, processo, usuário, horário e decisão de controle. O objetivo é evitar tanto falso positivo ingênuo quanto negligência diante de sinais fortes.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio é desenhar uma detecção comportamental para egress suspeito em ambiente híbrido. Você deverá definir fontes de log, campos mínimos, regra analítica, enriquecimento, severidade, resposta e melhoria preventiva.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada prioriza correlação. Uma boa investigação não depende apenas de domínio malicioso conhecido. Ela combina DNS, proxy, flow logs, EDR, identidade, inventário, cloud audit e histórico para produzir uma conclusão defensável.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>C2 e beaconing são temas centrais para quem defende redes modernas, porque mostram que segurança não termina em bloquear entrada. Também é preciso controlar e observar saída. A detecção comportamental usa baseline, periodicidade, raridade, volume, destino e contexto para encontrar sinais fracos que, juntos, formam uma hipótese forte.</p>\n  <p>O objetivo final é transformar observação em resposta segura: conter proporcionalmente, preservar evidência, caçar padrões similares e corrigir arquitetura, egress, DNS, proxy, endpoint e pipeline para reduzir recorrência.</p>\n\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Detectar padrões de comunicação suspeita por comportamento: periodicidade, raridade, volume, destino, processo e contexto. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, vamos estudar <strong>16.9 — Exfiltração, DLP e anomalias de volume</strong>. A conexão é direta: depois de entender comunicação persistente e anômala, precisamos reconhecer quando dados podem estar saindo por canais, volumes ou destinos fora do esperado.</p>\n\n</section>"
  },
  "lab": {
    "id": "lab-16.8",
    "title": "Laboratório 16.8 — Playbook defensivo para possível C2 e beaconing",
    "labType": "local",
    "objective": "Construir um playbook defensivo para investigar comunicação periódica suspeita usando dados simulados de DNS, proxy, flow logs, EDR, IAM e cloud, sem executar tráfego malicioso.",
    "scenario": "15. Laboratório O laboratório desta aula é a construção de um playbook defensivo para investigar possível beaconing sem executar tráfego malicioso. Você trabalhará com cenário, dados simulados, hipóteses, correlação e resposta proporcional.",
    "topology": [
      "Endpoint corporativo",
      "Workload cloud",
      "DNS recursivo",
      "Proxy/SWG",
      "Firewall de egress",
      "VPC/VNet Flow Logs",
      "EDR",
      "IAM/IdP",
      "SIEM",
      "SOC"
    ],
    "architecture": "Coleta de telemetria → normalização → baseline → detecção de periodicidade/raridade → enriquecimento → hipótese → contenção proporcional → RCA → melhoria preventiva.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
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
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Somente análise de logs, datasets sintéticos e simulação local inofensiva. Não contatar infraestrutura maliciosa real.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: Série temporal | Intervalos entre conexões | Processo de origem | Destino e reputação | Comparação com baseline | Decisão de contenção",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Confirmar escopo e limites",
        "instruction": "Declare que a investigação usa dados simulados ou logs reais autorizados, sem execução de malware, exploração, evasão ou tráfego fora de escopo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Escopo defensivo aprovado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “C2, beaconing e detecção comportamental” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Definir baseline esperado",
        "instruction": "Liste quais destinos externos, protocolos, horários e volumes são normais para endpoints, servidores, agentes de segurança, backup, atualizações, pipelines e workloads cloud.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Baseline por perfil de ativo.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “C2, beaconing e detecção comportamental” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Montar dataset de investigação",
        "instruction": "Crie uma tabela com timestamp, origem, usuário, processo, destino, domínio, porta, protocolo, bytes, duração, ação do proxy/firewall, status HTTP e severidade inicial.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Dados normalizados para análise.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “C2, beaconing e detecção comportamental” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Detectar periodicidade",
        "instruction": "Agrupe conexões por origem e destino, calcule intervalos entre eventos e procure padrões repetitivos fora do comportamento esperado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista de candidatos a beaconing.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “C2, beaconing e detecção comportamental” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Avaliar raridade e reputação contextual",
        "instruction": "Verifique se o domínio ou IP é recém-visto no ambiente, raro entre pares, hospedado em provedor genérico, relacionado a serviço legítimo ou já classificado por threat intelligence.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Contexto de destino documentado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “C2, beaconing e detecção comportamental” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Correlacionar com endpoint e identidade",
        "instruction": "Associe conexões a processo, usuário, sessão, autenticação, postura do dispositivo, alertas EDR e mudanças recentes.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Hipótese enriquecida por host e usuário.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “C2, beaconing e detecção comportamental” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Correlacionar com cloud e DevSecOps",
        "instruction": "Para workloads, verifique deployment recente, imagem, namespace, IAM role, egress policy, NAT, security group, private endpoints e logs de auditoria.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Linha do tempo de mudança técnica.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “C2, beaconing e detecção comportamental” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Classificar severidade",
        "instruction": "Classifique como benigno, suspeito, provável comprometimento ou incidente confirmado com base em múltiplas evidências, criticidade do ativo e risco de impacto.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Severidade explicada e defensável.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “C2, beaconing e detecção comportamental” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Definir contenção proporcional",
        "instruction": "Escolha ação segura: monitorar, bloquear domínio, restringir egress, isolar endpoint, suspender credencial, pausar workload, coletar imagem ou acionar resposta a incidente.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de resposta com impacto previsto.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “C2, beaconing e detecção comportamental” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Criar melhoria preventiva",
        "instruction": "Transforme o achado em controle: egress allowlist, DNS filtering, proxy obrigatório, private endpoint, NetworkPolicy, assinatura de imagem, alertas SIEM ou policy as code.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Backlog de melhoria com dono e prazo.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “C2, beaconing e detecção comportamental” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Beacon periódico de baixa variação | Sinal: Conexões pequenas e regulares | Query: stddev(delta_time)<X AND avg(bytes)<Y BY host,dst | FP: Agentes de monitoramento\nDetecção: Destino raro por host único | Sinal: Apenas um host fala com domínio/IP incomum | Query: host_count(domain)=1 AND domain_prevalence=low | FP: SaaS específico de equipe\nDetecção: Egress fora do proxy | Sinal: Host tenta saída direta | Query: dst_public=true AND proxy_seen=false AND src_zone=user | FP: Aplicação legada",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 14,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Bloqueio DNS/proxy controlado | Isolamento EDR do host | Coleta de memória/disco se DFIR aplicável | Revogação de credenciais associadas | Preservar logs de egress",
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
        "instruction": "Detecte periodicidade, baixo volume, domínio raro, processo e falso positivo provável. Não conclua incidente sem EDR/DNS/proxy/contexto.",
        "artifact": "timestamp,host,dst_fqdn,dst_ip,dst_port,protocol,bytes_out,bytes_in,interval_seconds,process,verdict\n2026-07-01T15:00:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,420,210,60,powershell.exe,suspicious-pattern\n2026-07-01T15:01:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,418,205,60,powershell.exe,suspicious-pattern\n2026-07-01T15:02:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,421,207,60,powershell.exe,suspicious-pattern\n2026-07-01T15:03:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,419,209,60,powershell.exe,suspicious-pattern\n2026-07-01T15:04:20Z,ws-044,updates.vendor.example,198.51.100.50,443,tcp,12000,99000,3600,agent.exe,likely-benign",
        "analysisTask": "Aplicar a ideia de detecção: stddev(interval_seconds)<5 AND bytes_out<1000 AND domain_rarity=high AND process NOT IN baseline",
        "evidence": "Tabela de intervalos | Gráfico simples de periodicidade | DNS/proxy/EDR correlacionados | Plano de contenção proporcional",
        "expectedOutput": "ws-031 apresenta padrão regular de 60s com baixo volume e processo incomum; deve virar hipótese de C2/beaconing para enriquecimento.",
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
    "expectedResult": "Playbook defensivo completo para investigar possível C2/beaconing com evidências, severidade, contenção proporcional e melhorias preventivas.",
    "validation": [
      {
        "check": "O relatório final deve conter linha do tempo, matriz de evidências, hipótese principal, hipóteses descartadas, impacto, ação tomada, rollback, RCA e controles futuros.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "O relatório final deve conter linha do tempo, matriz de evidências, hipótese principal, hipóteses descartadas, impacto, ação tomada, rollback, RCA e controles futuros.",
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
        "symptom": "Se os sinais forem inconclusivos, documente lacunas de telemetria e proponha melhoria de coleta antes de encerrar o caso.",
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
      "Adicionar DNS logs com retenção adequada.",
      "Centralizar proxy e egress control.",
      "Criar detecção de domínio recém-visto por perfil de ativo.",
      "Integrar EDR, SIEM e inventário.",
      "Aplicar policy as code para impedir egress amplo em cloud.",
      "Revisar exceções permanentes de firewall e NAT.",
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
      "Capturas de tela ou saídas de comandos relevantes",
      "Série temporal",
      "Intervalos entre conexões",
      "Processo de origem",
      "Destino e reputação",
      "Comparação com baseline",
      "Decisão de contenção",
      "Tabela de intervalos",
      "Gráfico simples de periodicidade",
      "DNS/proxy/EDR correlacionados",
      "Plano de contenção proporcional"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “C2, beaconing e detecção comportamental” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Desafio: criar detecção comportamental para egress suspeito",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Detectar padrões de comunicação suspeita por comportamento: periodicidade, raridade, volume, destino, processo e contexto.",
    "authorizedScope": "Somente análise de logs, datasets sintéticos e simulação local inofensiva. Não contatar infraestrutura maliciosa real.",
    "allowedActions": [
      "Gerar dataset sintético",
      "Calcular intervalos e raridade",
      "Correlacionar DNS/proxy/EDR",
      "Criar regra de hunting defensiva"
    ],
    "prohibitedActions": [
      "Executar malware",
      "Baixar payload",
      "Conectar a C2 real",
      "Tentar evasão",
      "Ocultar tráfego de controles"
    ],
    "telemetrySources": [
      "DNS logs",
      "Proxy logs",
      "Flow logs/NetFlow",
      "EDR process network",
      "Firewall egress",
      "Threat intel enriquecida",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Beacon periódico de baixa variação",
        "signal": "Conexões pequenas e regulares",
        "queryIdea": "stddev(delta_time)<X AND avg(bytes)<Y BY host,dst",
        "commonFalsePositive": "Agentes de monitoramento",
        "response": "Enriquecer por processo, assinatura e destino antes de conter."
      },
      {
        "name": "Destino raro por host único",
        "signal": "Apenas um host fala com domínio/IP incomum",
        "queryIdea": "host_count(domain)=1 AND domain_prevalence=low",
        "commonFalsePositive": "SaaS específico de equipe",
        "response": "Validar dono; bloquear se sem justificativa e com outros sinais."
      },
      {
        "name": "Egress fora do proxy",
        "signal": "Host tenta saída direta",
        "queryIdea": "dst_public=true AND proxy_seen=false AND src_zone=user",
        "commonFalsePositive": "Aplicação legada",
        "response": "Forçar proxy/egress controlado ou criar exceção expirada."
      }
    ],
    "containmentActions": [
      "Bloqueio DNS/proxy controlado",
      "Isolamento EDR do host",
      "Coleta de memória/disco se DFIR aplicável",
      "Revogação de credenciais associadas",
      "Preservar logs de egress"
    ],
    "evidenceChecklist": [
      "Série temporal",
      "Intervalos entre conexões",
      "Processo de origem",
      "Destino e reputação",
      "Comparação com baseline",
      "Decisão de contenção"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — beaconing por intervalo regular",
      "theme": "C2, beaconing e detecção comportamental",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "timestamp,host,dst_fqdn,dst_ip,dst_port,protocol,bytes_out,bytes_in,interval_seconds,process,verdict",
        "2026-07-01T15:00:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,420,210,60,powershell.exe,suspicious-pattern",
        "2026-07-01T15:01:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,418,205,60,powershell.exe,suspicious-pattern",
        "2026-07-01T15:02:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,421,207,60,powershell.exe,suspicious-pattern",
        "2026-07-01T15:03:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,419,209,60,powershell.exe,suspicious-pattern",
        "2026-07-01T15:04:20Z,ws-044,updates.vendor.example,198.51.100.50,443,tcp,12000,99000,3600,agent.exe,likely-benign"
      ],
      "analysisPrompt": "Detecte periodicidade, baixo volume, domínio raro, processo e falso positivo provável. Não conclua incidente sem EDR/DNS/proxy/contexto.",
      "detectionIdea": "stddev(interval_seconds)<5 AND bytes_out<1000 AND domain_rarity=high AND process NOT IN baseline",
      "expectedFinding": "ws-031 apresenta padrão regular de 60s com baixo volume e processo incomum; deve virar hipótese de C2/beaconing para enriquecimento.",
      "evidenceToCollect": [
        "Tabela de intervalos",
        "Gráfico simples de periodicidade",
        "DNS/proxy/EDR correlacionados",
        "Plano de contenção proporcional"
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
      "title": "Periodicidade não é prova",
      "prompt": "Explique por que conexões a cada 60 segundos não provam, sozinhas, C2.",
      "expectedAnswer": "Porque agentes legítimos também fazem polling periódico; é preciso correlacionar destino, processo, usuário, baseline, volume, reputação e contexto."
    },
    {
      "title": "Mapa de fontes",
      "prompt": "Liste cinco fontes de dados úteis para investigar possível beaconing.",
      "expectedAnswer": "DNS logs, proxy logs, flow logs/firewall logs, EDR, IAM/IdP, cloud audit, WAF/LB logs, inventário e SIEM."
    },
    {
      "title": "Resposta proporcional",
      "prompt": "Um host crítico apresenta sinais suspeitos, mas ainda inconclusivos. Qual resposta evita perda de evidência e reduz risco?",
      "expectedAnswer": "Coletar evidências, aumentar monitoramento, consultar EDR, considerar isolamento controlado, bloquear destino específico se justificado e documentar rollback."
    },
    {
      "title": "Cloud e egress",
      "prompt": "Um pod privado começa a falar com destino externo raro via NAT. Quais controles preventivos você revisaria?",
      "expectedAnswer": "NetworkPolicy, security group/NSG, firewall de egress, DNS privado, proxy obrigatório, private endpoints, IAM role, imagem, pipeline e policy as code."
    },
    {
      "id": "ex16.8.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “C2, beaconing e detecção comportamental” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como DNS logs, Proxy logs, Flow logs/NetFlow, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.8.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Executar malware: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Baixar payload: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Conectar a C2 real: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.8.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — beaconing por intervalo regular”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "ws-031 apresenta padrão regular de 60s com baixo volume e processo incomum; deve virar hipótese de C2/beaconing para enriquecimento. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Qual afirmação é mais correta sobre beaconing?",
      "options": [
        "Toda comunicação periódica é maliciosa.",
        "Beaconing defensivamente é um padrão que precisa de contexto para ser interpretado.",
        "Beaconing só ocorre em DNS.",
        "Beaconing não pode ser detectado em tráfego criptografado."
      ],
      "answer": 1,
      "explanation": "Periodicidade é sinal fraco; precisa de correlação com contexto, destino, processo, usuário e baseline."
    },
    {
      "question": "Qual combinação é mais útil para investigar possível C2?",
      "options": [
        "Apenas ping e traceroute.",
        "DNS logs, proxy, flow logs, EDR, identidade e SIEM.",
        "Somente reputação de IP.",
        "Apenas status HTTP."
      ],
      "answer": 1,
      "explanation": "C2 defensivo exige correlação multicamada."
    },
    {
      "question": "Qual ação é uma má prática em alerta inconclusivo?",
      "options": [
        "Preservar evidências.",
        "Bloquear destino específico com justificativa.",
        "Apagar logs para liberar espaço antes da análise.",
        "Consultar dono do ativo."
      ],
      "answer": 2,
      "explanation": "Apagar logs destrói evidências e prejudica RCA."
    },
    {
      "question": "Em cloud, qual sinal pode indicar egress anômalo?",
      "options": [
        "Apenas uso de subnet privada.",
        "Aumento de tráfego via NAT para destino externo não documentado.",
        "Uso de tag de custo.",
        "Presença de private endpoint."
      ],
      "answer": 1,
      "explanation": "Egress via NAT para destino externo raro pode ser sinal relevante quando foge do baseline."
    },
    {
      "question": "O que torna uma detecção comportamental mais confiável?",
      "options": [
        "Um único IOC sem contexto.",
        "Múltiplos sinais correlacionados com baseline e inventário.",
        "Bloqueio de todas as conexões HTTPS.",
        "Ignorar o processo de origem."
      ],
      "answer": 1,
      "explanation": "Correlação reduz falso positivo e melhora priorização."
    },
    {
      "question": "Qual melhoria preventiva é coerente após confirmar egress indevido?",
      "options": [
        "Liberar any-to-any para facilitar suporte.",
        "Remover proxy e DNS logs.",
        "Criar controle de egress mínimo, logs e policy as code.",
        "Desativar EDR para reduzir ruído."
      ],
      "answer": 2,
      "explanation": "Prevenção madura reduz caminho de saída, aumenta visibilidade e versiona controles."
    }
  ],
  "flashcards": [
    {
      "front": "C2",
      "back": "Command and Control: comunicação usada para controlar sistemas comprometidos. Na defesa, o foco é detectar, conter e investigar sinais de comunicação suspeita."
    },
    {
      "front": "Beaconing",
      "back": "Padrão de comunicações repetidas e possivelmente periódicas. Exige contexto para diferenciar atividade legítima de suspeita."
    },
    {
      "front": "Detecção comportamental",
      "back": "Comparação entre comportamento observado e baseline esperado para identificar desvios relevantes."
    },
    {
      "front": "Raridade",
      "back": "Sinal de que um destino, domínio, processo ou padrão aparece pouco ou pela primeira vez no ambiente."
    },
    {
      "front": "Egress control",
      "back": "Controle de tráfego de saída para limitar destinos, portas, protocolos e caminhos permitidos."
    },
    {
      "front": "Sinal fraco",
      "back": "Evidência que sozinha não confirma incidente, mas que ganha valor quando correlacionada com outros sinais."
    }
  ],
  "mentorQuestions": [
    "Como você diferenciaria um agente corporativo legítimo de um padrão suspeito de beaconing?",
    "Qual fonte de log você considera mais crítica para investigar egress suspeito no seu ambiente atual?",
    "Que melhoria de arquitetura reduziria mais risco: DNS filtering, proxy obrigatório, egress firewall, EDR ou policy as code? Por quê?"
  ],
  "challenge": {
    "title": "Desafio: criar detecção comportamental para egress suspeito",
    "description": "Desenhe uma regra analítica e um playbook para detectar possível C2/beaconing em ambiente híbrido com endpoints, cloud, Kubernetes, proxy e SIEM.",
    "requirements": [
      "Fontes de log",
      "Campos mínimos",
      "Critérios de baseline",
      "Sinais de periodicidade",
      "Raridade de destino",
      "Enriquecimento",
      "Severidade",
      "Resposta proporcional",
      "Rollback",
      "Melhorias preventivas"
    ],
    "deliverable": "Documento de detecção e playbook SOC com hipótese, dados necessários, lógica de correlação, ações, comunicação, RCA e backlog preventivo.",
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
    "overview": "Uma boa solução evita tanto alarmismo quanto complacência. Ela transforma sinais fracos em evidência composta e define respostas proporcionais ao risco.",
    "keyPoints": [
      "Usar baseline por perfil de ativo.",
      "Correlacionar DNS, proxy, flow logs, EDR e identidade.",
      "Tratar periodicidade como sinal, não como prova.",
      "Verificar processo e dono do ativo antes de conter quando possível.",
      "Aplicar contenção específica e reversível.",
      "Converter achado em melhoria de egress, logs e policy as code."
    ],
    "commonMistakes": [
      "Bloquear domínios amplos sem avaliar impacto.",
      "Confiar apenas em threat intelligence.",
      "Ignorar falsos positivos de agentes legítimos.",
      "Não preservar evidências.",
      "Não procurar padrões semelhantes em outros hosts.",
      "Encerrar caso sem corrigir arquitetura de egress."
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
      "term": "Command and Control",
      "definition": "Categoria defensiva que descreve comunicação usada para controlar sistemas comprometidos ou manter canal de instrução."
    },
    {
      "term": "Beaconing",
      "definition": "Comunicação repetida, muitas vezes periódica e de baixo volume, que pode indicar automação legítima ou comportamento suspeito conforme o contexto."
    },
    {
      "term": "NDR",
      "definition": "Network Detection and Response: tecnologia/processo de detecção e resposta baseado em telemetria de rede."
    },
    {
      "term": "Egress control",
      "definition": "Conjunto de políticas que controla tráfego de saída por destino, porta, protocolo, identidade, aplicação e contexto."
    },
    {
      "term": "Raridade contextual",
      "definition": "Avaliação de quão incomum é um destino, processo, domínio, horário ou padrão para aquele ativo ou grupo de pares."
    },
    {
      "term": "Contenção proporcional",
      "definition": "Resposta que reduz risco preservando evidências e minimizando impacto operacional desnecessário."
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
        "16.8",
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
        "16.8",
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
        "16.8",
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
      "title": "MITRE ATT&CK — Command and Control, TA0011",
      "url": "https://attack.mitre.org/tactics/TA0011/"
    },
    {
      "title": "MITRE ATT&CK — Application Layer Protocol, T1071",
      "url": "https://attack.mitre.org/techniques/T1071/"
    },
    {
      "title": "NIST SP 800-94 — Guide to Intrusion Detection and Prevention Systems",
      "url": "https://csrc.nist.gov/pubs/sp/800/94/final"
    },
    {
      "title": "CISA StopRansomware Guide",
      "url": "https://www.cisa.gov/stopransomware/ransomware-guide"
    },
    {
      "title": "MITRE D3FEND — Network Traffic Analysis",
      "url": "https://d3fend.mitre.org/technique/d3f:NetworkTrafficAnalysis/"
    }
  ],
  "nextLesson": "16.9 — Exfiltração, DLP e anomalias de volume",
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
              "name": "Risco Blue Team específico — C2, beaconing e detecção comportamental",
              "description": "Em C2, beaconing e detecção comportamental, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
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
      "DNS logs",
      "Proxy logs",
      "Flow logs/NetFlow",
      "EDR process network",
      "Firewall egress",
      "Threat intel enriquecida"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.8.",
      "Beacon periódico de baixa variação — sinal: Conexões pequenas e regulares; ideia de consulta: stddev(delta_time)<X AND avg(bytes)<Y BY host,dst; falso positivo comum: Agentes de monitoramento.",
      "Destino raro por host único — sinal: Apenas um host fala com domínio/IP incomum; ideia de consulta: host_count(domain)=1 AND domain_prevalence=low; falso positivo comum: SaaS específico de equipe.",
      "Egress fora do proxy — sinal: Host tenta saída direta; ideia de consulta: dst_public=true AND proxy_seen=false AND src_zone=user; falso positivo comum: Aplicação legada."
    ],
    "ethicalLimits": {
      "authorizedScope": "Somente análise de logs, datasets sintéticos e simulação local inofensiva. Não contatar infraestrutura maliciosa real.",
      "allowedActions": [
        "Gerar dataset sintético",
        "Calcular intervalos e raridade",
        "Correlacionar DNS/proxy/EDR",
        "Criar regra de hunting defensiva"
      ],
      "prohibitedActions": [
        "Executar malware",
        "Baixar payload",
        "Conectar a C2 real",
        "Tentar evasão",
        "Ocultar tráfego de controles"
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
      "Falha ou comportamento inesperado relacionado a C2, beaconing e detecção comportamental.",
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
      "Qual evidência comprova o entendimento da aula 16.8?"
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
      "16.9"
    ]
  },
  "blueTeamEnhancement": {
    "title": "C2, beaconing e detecção comportamental",
    "defensiveGoal": "Detectar padrões de comunicação suspeita por comportamento: periodicidade, raridade, volume, destino, processo e contexto.",
    "authorizedScope": "Somente análise de logs, datasets sintéticos e simulação local inofensiva. Não contatar infraestrutura maliciosa real.",
    "allowedActions": [
      "Gerar dataset sintético",
      "Calcular intervalos e raridade",
      "Correlacionar DNS/proxy/EDR",
      "Criar regra de hunting defensiva"
    ],
    "prohibitedActions": [
      "Executar malware",
      "Baixar payload",
      "Conectar a C2 real",
      "Tentar evasão",
      "Ocultar tráfego de controles"
    ],
    "telemetrySources": [
      "DNS logs",
      "Proxy logs",
      "Flow logs/NetFlow",
      "EDR process network",
      "Firewall egress",
      "Threat intel enriquecida"
    ],
    "detectionEngineering": [
      {
        "name": "Beacon periódico de baixa variação",
        "signal": "Conexões pequenas e regulares",
        "queryIdea": "stddev(delta_time)<X AND avg(bytes)<Y BY host,dst",
        "commonFalsePositive": "Agentes de monitoramento",
        "response": "Enriquecer por processo, assinatura e destino antes de conter."
      },
      {
        "name": "Destino raro por host único",
        "signal": "Apenas um host fala com domínio/IP incomum",
        "queryIdea": "host_count(domain)=1 AND domain_prevalence=low",
        "commonFalsePositive": "SaaS específico de equipe",
        "response": "Validar dono; bloquear se sem justificativa e com outros sinais."
      },
      {
        "name": "Egress fora do proxy",
        "signal": "Host tenta saída direta",
        "queryIdea": "dst_public=true AND proxy_seen=false AND src_zone=user",
        "commonFalsePositive": "Aplicação legada",
        "response": "Forçar proxy/egress controlado ou criar exceção expirada."
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
      "Bloqueio DNS/proxy controlado",
      "Isolamento EDR do host",
      "Coleta de memória/disco se DFIR aplicável",
      "Revogação de credenciais associadas",
      "Preservar logs de egress"
    ],
    "evidencePackage": [
      "Série temporal",
      "Intervalos entre conexões",
      "Processo de origem",
      "Destino e reputação",
      "Comparação com baseline",
      "Decisão de contenção"
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
    "title": "Dataset sintético — beaconing por intervalo regular",
    "theme": "C2, beaconing e detecção comportamental",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "timestamp,host,dst_fqdn,dst_ip,dst_port,protocol,bytes_out,bytes_in,interval_seconds,process,verdict",
      "2026-07-01T15:00:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,420,210,60,powershell.exe,suspicious-pattern",
      "2026-07-01T15:01:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,418,205,60,powershell.exe,suspicious-pattern",
      "2026-07-01T15:02:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,421,207,60,powershell.exe,suspicious-pattern",
      "2026-07-01T15:03:00Z,ws-031,a1b2c3d4.lab-tunnel.example,203.0.113.77,443,tcp,419,209,60,powershell.exe,suspicious-pattern",
      "2026-07-01T15:04:20Z,ws-044,updates.vendor.example,198.51.100.50,443,tcp,12000,99000,3600,agent.exe,likely-benign"
    ],
    "analysisPrompt": "Detecte periodicidade, baixo volume, domínio raro, processo e falso positivo provável. Não conclua incidente sem EDR/DNS/proxy/contexto.",
    "detectionIdea": "stddev(interval_seconds)<5 AND bytes_out<1000 AND domain_rarity=high AND process NOT IN baseline",
    "expectedFinding": "ws-031 apresenta padrão regular de 60s com baixo volume e processo incomum; deve virar hipótese de C2/beaconing para enriquecimento.",
    "evidenceToCollect": [
      "Tabela de intervalos",
      "Gráfico simples de periodicidade",
      "DNS/proxy/EDR correlacionados",
      "Plano de contenção proporcional"
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
