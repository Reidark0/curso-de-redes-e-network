export const lesson1603 = {
  "id": "16.3",
  "moduleId": "m16",
  "order": 3,
  "title": "Reconhecimento autorizado e superfície de ataque",
  "subtitle": "Como mapear ativos, exposição, donos, controles e riscos dentro de escopo aprovado, usando reconhecimento como prática defensiva de inventário, governança e redução de superfície.",
  "duration": "240-360 min",
  "estimatedStudyTimeMinutes": 360,
  "difficulty": "intermediário-avançado",
  "type": "segurança defensiva",
  "xp": 360,
  "tags": [
    "reconhecimento autorizado",
    "superfície de ataque",
    "ASM",
    "inventário",
    "shadow IT",
    "DNS",
    "certificados",
    "cloud assets",
    "exposição externa",
    "governança",
    "SOC",
    "DevSecOps",
    "priorização de risco",
    "evidências",
    "segurança defensiva",
    "ética",
    "escopo autorizado",
    "Blue Team",
    "SIEM",
    "NDR",
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
      "module": "m16",
      "lesson": "16.2",
      "reason": "Escopo, autorização e regras de engajamento são pré-requisitos para qualquer reconhecimento defensivo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.14",
      "reason": "Cloud Networking ajuda a entender exposição em VPC/VNet, Private Link, DNS, LB, WAF, rotas e logs."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "reason": "Coleta de evidências, baseline e linha do tempo são essenciais para transformar descoberta em achado confiável."
    }
  ],
  "objectives": [
    "Definir reconhecimento autorizado e diferenciar inventário defensivo de atividade fora de escopo.",
    "Explicar superfície de ataque como combinação de ativos, exposição, identidade, controle, telemetria e contexto de negócio.",
    "Construir um mapa de superfície usando DNS, certificados, inventário cloud, CMDB, firewall, WAF, IAM, SIEM e pipelines.",
    "Classificar achados por criticidade, exposição, dado sensível, facilidade de exploração, controle existente e dono responsável.",
    "Identificar riscos comuns como shadow IT, subdomínio abandonado, endpoint público indevido, regra ampla e serviço sem dono.",
    "Integrar reconhecimento autorizado com SOC, DevSecOps, cloud governance, FinOps e processo de correção."
  ],
  "learningOutcomes": [
    "Dado um conjunto de domínios e contas cloud, o aluno monta uma tabela de ativos com dono, exposição e evidência.",
    "Dado um serviço exposto, o aluno diferencia risco real, falso positivo, lacuna de evidência e exceção aprovada.",
    "Dado um novo DNS público, o aluno identifica quais fontes cruzar antes de concluir que existe exposição indevida.",
    "Dado um inventário cloud, o aluno identifica recursos públicos, privados, órfãos, sem tag e sem logs.",
    "Dado um achado, o aluno escreve recomendação proporcional e aciona o dono correto sem linguagem alarmista.",
    "Dado um processo DevSecOps, o aluno propõe guardrails para prevenir novas exposições não aprovadas."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Em cibersegurança, não dá para proteger o que a organização não conhece. Serviços esquecidos, subdomínios abandonados, buckets publicados por engano, aplicações de teste expostas, VPNs antigas, painéis administrativos acessíveis pela internet, certificados vencidos e workloads cloud sem dono são exemplos de riscos que frequentemente aparecem não por falha sofisticada, mas por falta de visibilidade.</p>\n  <p>Reconhecimento autorizado é a disciplina de mapear, dentro de um escopo aprovado, quais ativos existem, onde estão, quem é o dono, como são expostos, quais controles os protegem e quais evidências sustentam essa conclusão. Ele não deve ser confundido com curiosidade sem autorização nem com coleta agressiva. O objetivo aqui é defensivo: transformar incerteza em inventário, inventário em superfície de ataque, superfície em risco priorizado e risco em plano de melhoria.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> superfície de ataque não é apenas “o que está na internet”. Ela inclui tudo que pode ser alcançado, autenticado ou abusado: rede, DNS, identidade, cloud, APIs, pipelines, serviços internos, integrações e dependências.</div>\n  <p>Esta aula prepara o aluno para as próximas: varredura defensiva, DNS/HTTP/TLS como indicadores, MITM como risco de camada 2, movimento lateral, C2, exfiltração, threat hunting e DFIR. Antes de investigar comportamento suspeito, é preciso saber qual comportamento seria esperado.</p>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n\n  <p>No início das redes corporativas, o inventário era relativamente estático: servidores físicos, faixas IP internas, alguns links WAN, firewall de borda e aplicações publicadas em datacenter. A superfície de ataque era menor e mais fácil de desenhar em diagramas manuais. Mesmo assim, servidores esquecidos e regras antigas de firewall já eram problemas recorrentes.</p>\n  <p>Com virtualização, cloud, DevOps, SaaS, CI/CD, Kubernetes, trabalho remoto e múltiplas contas cloud, o inventário deixou de ser estático. Um novo endpoint pode surgir por um pipeline. Um subdomínio pode apontar para recurso removido. Uma API temporária pode virar permanente. Uma conta de laboratório pode ficar conectada ao ambiente corporativo. Um bucket ou storage account pode ser exposto por configuração.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Datacenter tradicional:</strong> inventário baseado em servidores, VLANs, firewall e CMDB manual.</div><div class=\"timeline-item\"><strong>Virtualização:</strong> criação rápida de máquinas aumenta risco de ativos sem dono.</div><div class=\"timeline-item\"><strong>Cloud:</strong> contas, regions, VPCs/VNets, endpoints e serviços gerenciados expandem a superfície.</div><div class=\"timeline-item\"><strong>DevSecOps:</strong> pipelines passam a criar infraestrutura e precisam de guardrails.</div><div class=\"timeline-item\"><strong>ASM moderno:</strong> visibilidade contínua combina inventário, exposição, criticidade e detecção de mudança.</div></div>\n  <p>Por isso, organizações maduras passaram a tratar descoberta de ativos e análise de superfície como processo contínuo. A CISA, por exemplo, publicou orientação para melhorar visibilidade de ativos e enumeração de vulnerabilidades em agências federais, reforçando que segurança começa por saber o que existe e o que está exposto.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema não é apenas “existem portas abertas”. O problema é que muitas organizações não sabem responder perguntas básicas: quais domínios pertencem a nós? Quais IPs públicos são nossos? Quais aplicações estão expostas? Quais APIs aceitam tráfego externo? Quais serviços usam certificados válidos? Quais ambientes são produção, homologação ou laboratório? Quem é o dono? Onde estão os logs? Qual controle deveria bloquear acesso indevido?</p>\n  <p>Sem reconhecimento autorizado, a organização opera com pontos cegos. Isso produz incidentes por shadow IT, subdomain takeover, serviços legados, exposição de painel administrativo, exceções antigas de firewall, endpoints cloud órfãos, chaves e integrações esquecidas, DNS público apontando para recursos internos e ambientes de teste com dados reais.</p>\n  <ul>\n    <li><strong>Ponto cego técnico:</strong> ativo existe, mas não aparece em CMDB, SIEM, inventário cloud ou monitoramento;</li>\n    <li><strong>Ponto cego de dono:</strong> ninguém assume responsabilidade pela correção;</li>\n    <li><strong>Ponto cego de contexto:</strong> a exposição é conhecida, mas ninguém sabe se contém dado sensível ou função crítica;</li>\n    <li><strong>Ponto cego de controle:</strong> a empresa sabe que o serviço existe, mas não sabe se WAF, MFA, logging, TLS e egress estão adequados.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> tratar reconhecimento como uma lista de IPs. Reconhecimento defensivo precisa cruzar ativo, exposição, identidade, dono, criticidade, controle, evidência e risco.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A evolução didática é sair da pergunta “quais portas estão abertas?” para “qual fluxo de negócio este ativo suporta, por que ele está exposto, qual controle reduz o risco, qual evidência mostra que o controle funciona e quem responde por ele?”. Essa mudança evita dois extremos: ignorar exposição real ou gerar alarme sem contexto.</p>\n  <p>O reconhecimento moderno combina fontes passivas, fontes internas e validações ativas de baixa intensidade, sempre dentro de autorização. Fontes passivas incluem DNS público, certificados, registros de domínio, documentação, inventário cloud exportado e repositórios corporativos. Fontes internas incluem CMDB, IAM, tags cloud, firewall rules, load balancers, WAF, DNS privado, flow logs, SIEM, pipelines e tickets. Validações ativas podem confirmar se um serviço em escopo responde, mas devem obedecer ROE, janela, intensidade e critérios de parada.</p>\n  <p>O OWASP descreve análise de superfície de ataque como o mapeamento das partes de um sistema que precisam ser revisadas e testadas, com objetivo de entender áreas de risco, reduzir exposição e perceber mudanças. Esse conceito combina perfeitamente com redes: a superfície muda quando um DNS muda, uma rota muda, uma regra muda, um endpoint privado vira público, um pipeline cria recurso ou um certificado revela novo nome.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>Reconhecimento autorizado</strong> é o processo controlado de coletar, organizar, validar e contextualizar informações sobre ativos e exposições de uma organização dentro de um escopo aprovado. Ele responde “o que existe?”, “onde está?”, “como é alcançado?”, “quem é o dono?”, “qual controle protege?”, “qual evidência confirma?” e “qual risco precisa ser tratado primeiro?”.</p>\n  <p><strong>Superfície de ataque</strong> é o conjunto de pontos pelos quais uma organização pode ser alcançada, influenciada, abusada ou comprometida. Ela inclui interfaces externas, serviços internos, APIs, domínios, certificados, portas, integrações, identidades, permissões, pipelines, dependências, VPN, SaaS, workloads cloud, endpoints privados mal configurados e caminhos de egress.</p>\n  <p><strong>ASM</strong>, ou Attack Surface Management, é a prática de manter essa visão continuamente atualizada e ligada a correção. Para este curso, o importante não é decorar ferramentas comerciais, mas entender o método: inventariar, correlacionar, validar, priorizar, corrigir e monitorar mudança.</p>\n  <div class=\"callout callout--success\"><strong>Regra operacional:</strong> uma descoberta só vira achado útil quando possui evidência, contexto, dono e recomendação proporcional.</div>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Internamente, reconhecimento defensivo funciona como um pipeline de dados. Primeiro, ele coleta fontes. Depois, normaliza nomes, IPs, tags, contas e ambientes. Em seguida, remove duplicidades, identifica dono, cruza com criticidade e classifica exposição. Por fim, produz achados priorizados e itens de correção.</p>\n  <p>Considere um subdomínio público apontando para um load balancer. A coleta encontra o nome DNS. A normalização relaciona o nome ao domínio corporativo. A correlação liga o DNS ao certificado, ao load balancer, à conta cloud, à VPC, ao WAF e aos logs. A validação confirma se o serviço responde, se usa TLS adequado, se está atrás de controle esperado e se possui dono. A priorização considera ambiente, dado sensível, autenticação, exposição, histórico de incidentes e criticidade de negócio.</p>\n  <p>Esse processo precisa lidar com falsos positivos. Um IP pode não pertencer mais à empresa. Um subdomínio pode ser legado sem apontamento ativo. Um certificado pode listar nomes internos apenas por histórico. Um serviço pode parecer aberto, mas exigir autenticação forte. Por isso, reconhecimento profissional não pula para conclusão: ele registra nível de confiança e lacunas.</p>\n  <ul>\n    <li><strong>Coleta:</strong> DNS, certificados, inventário cloud, CMDB, firewall, WAF, SIEM, IAM e pipelines;</li>\n    <li><strong>Normalização:</strong> nomes, IPs, contas, ambientes, tags, donos e regiões;</li>\n    <li><strong>Correlação:</strong> ativo ↔ exposição ↔ controle ↔ log ↔ dono ↔ criticidade;</li>\n    <li><strong>Validação:</strong> confirmar alcance e comportamento com método permitido;</li>\n    <li><strong>Priorização:</strong> risco, impacto, facilidade de correção e urgência;</li>\n    <li><strong>Acompanhamento:</strong> ticket, prazo, exceção, compensação e monitoramento.</li>\n  </ul>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>Uma arquitetura corporativa de reconhecimento autorizado deve ter quatro blocos. O primeiro é governança: escopo, ROE, autorização, privacidade e critérios de parada. O segundo é fonte de dados: inventário, DNS, cloud, certificados, firewall, WAF, IAM, pipelines e logs. O terceiro é motor de correlação: deduplicação, owner, criticidade, tags, exposição e controles. O quarto é saída operacional: relatório, tickets, dashboards, exceções e alertas de mudança.</p>\n  <p>Em uma empresa madura, reconhecimento não fica isolado no time de segurança. Ele conversa com arquitetura, redes, cloud, plataforma, SOC, DevSecOps, IAM, privacidade e FinOps. Um ativo sem dono é problema de governança. Um serviço público sem WAF pode ser problema de arquitetura. Um endpoint com dado sensível exposto é problema de segurança e privacidade. Um NAT com tráfego inesperado é também problema financeiro.</p>\n  <p>Em cloud, essa arquitetura depende de tags obrigatórias, contas separadas, inventário de recursos, logs centralizados, detecção de drift, políticas preventivas e consulta contínua à configuração. Em DevSecOps, depende de IaC revisável, pipeline com validação de exposição, aprovação para recursos públicos e bloqueio de padrões inseguros.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Pense em um hospital. Antes de discutir segurança, é necessário saber quantas portas existem, quais ficam abertas, quais exigem crachá, onde ficam remédios controlados, quem tem chave, quais câmeras funcionam, quais áreas recebem visitantes e quais saídas de emergência existem. Ninguém chamaria isso de “ataque”; é inventário e gestão de risco.</p>\n  <p>Reconhecimento autorizado faz o mesmo para redes e sistemas. Domínios são placas na rua. IPs públicos são entradas do prédio. Certificados são crachás digitais que revelam nomes. Firewalls são portas com regras. WAF e proxy são recepções. Logs são câmeras. IAM é o controle de acesso. Cloud é um conjunto de prédios que podem ser criados rapidamente. Sem mapa, qualquer defesa vira improviso.</p>\n  <div class=\"callout callout--info\"><strong>Analogia útil:</strong> o objetivo não é arrombar portas; é descobrir quais portas existem, se deveriam existir, quem cuida delas e se há registro quando alguém passa.</div>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Imagine um pequeno laboratório com um domínio, uma aplicação web, um servidor de VPN e uma máquina de homologação. O aluno cria uma tabela com quatro colunas: ativo, exposição, dono e evidência. O domínio aponta para a aplicação web. A VPN exige MFA. A máquina de homologação aparece em DNS público sem necessidade. O reconhecimento autorizado identifica que a homologação deveria ser interna, registra evidência do DNS, confirma dono, abre uma tarefa de correção e recomenda mover o serviço para acesso privado.</p>\n  <p>Esse exemplo mostra que o valor do reconhecimento não está em “descobrir algo impressionante”. Está em revelar desalinhamento entre intenção e realidade. A intenção era que homologação fosse privada. A realidade é que o nome público existe. A ação correta é corrigir arquitetura e prevenir recorrência.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Em uma empresa maior, a equipe de segurança recebe autorização para mapear a superfície externa dos domínios corporativos. O escopo inclui domínios oficiais, IPs próprios, aplicações publicadas por load balancers, portais de parceiros e APIs documentadas. Ficam fora de escopo sistemas de terceiros sem contrato, testes de carga, exploração e qualquer tentativa de autenticação com credenciais não autorizadas.</p>\n  <p>O time cruza DNS público, certificados, inventário de WAF, load balancers, CMDB e tickets. Encontra três problemas: um subdomínio legado apontando para recurso inexistente, uma aplicação de marketing sem WAF e um endpoint administrativo restrito por IP antigo que não corresponde mais ao fornecedor atual. Cada achado recebe dono, evidência, impacto, probabilidade, correção e prazo.</p>\n  <p>O resultado não é apenas um relatório: é melhoria de governança. O processo passa a exigir tag de dono em todo load balancer, aprovação para DNS público, revisão mensal de certificados e alerta quando subdomínio novo aparece fora do pipeline padrão.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Em cloud, reconhecimento autorizado começa perguntando: quais contas, subscriptions ou projetos estão no escopo? Quais regions podem ser usadas? Quais VPCs/VNets existem? Quais recursos possuem IP público? Quais load balancers estão expostos? Quais security groups, NSGs ou firewalls permitem entrada externa? Quais bancos possuem endpoint público? Quais private endpoints dependem de DNS privado correto?</p>\n  <p>Um achado comum é o recurso criado para teste e esquecido. Outro é o serviço gerenciado que deveria ser acessado por Private Link, mas mantém endpoint público habilitado. Outro é o security group amplo criado para “resolver temporariamente” um problema e nunca removido. Reconhecimento defensivo cruza configuração cloud com logs e billing para identificar não apenas exposição, mas também custo e uso real.</p>\n  <p>A melhor prática é tratar exposição como código: todo recurso público precisa passar por revisão, justificar necessidade, registrar dono, habilitar logs e possuir controles mínimos. O reconhecimento então vira validação contínua do que a política prometeu.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, a superfície de ataque muda a cada merge. Um módulo Terraform pode criar um load balancer público. Um Helm chart pode expor um Ingress. Um pipeline pode criar bucket, DNS, service account, regra de firewall ou secret. Por isso, reconhecimento autorizado precisa entrar no ciclo de desenvolvimento.</p>\n  <p>Um pipeline maduro verifica se novos recursos possuem tags, dono, ambiente, justificativa para exposição pública, TLS, WAF quando aplicável, logs, política de egress e DNS coerente. Se um pull request tenta criar endpoint público para banco de dados, o pipeline deve bloquear ou exigir exceção formal. Se um recurso público aprovado for criado, ele entra automaticamente no inventário e no monitoramento.</p>\n  <p>O objetivo não é impedir entrega. É evitar que a organização descubra exposição somente depois de um incidente. Reconhecimento contínuo transforma segurança em feedback cedo, mensurável e auditável.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Do ponto de vista do SOC, reconhecimento autorizado cria uma lista de “o que deveria existir”. Essa lista melhora detecção. Se um novo host começa a aceitar conexão externa sem mudança aprovada, isso vira alerta. Se um subdomínio novo aparece sem ticket, isso vira investigação. Se um serviço administrativo responde fora da VPN, isso vira risco. Se um fluxo de egress surge de subnet que deveria ser isolada, isso vira hipótese de comprometimento ou drift.</p>\n  <p>O MITRE ATT&CK descreve técnicas de descoberta usadas por adversários, como descoberta de serviços de rede. O defensor não precisa reproduzir comportamento ofensivo sem limite para aprender com isso. Ele deve perguntar: “se alguém tentasse enumerar nossos serviços, quais sinais apareceriam?”, “nossos logs capturam esse comportamento?”, “sabemos diferenciar varredura autorizada de atividade suspeita?”, “temos playbook para responder?”.</p>\n  <div class=\"callout callout--warning\"><strong>Limite didático:</strong> nesta aula, reconhecimento é tratado como inventário defensivo, validação controlada e detecção de mudança. Qualquer teste ativo deve respeitar autorização, janela e intensidade definidas na aula 16.2.</div>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Somente domínios, blocos, aplicações e contas de laboratório aprovados. Preferir fontes passivas e inventário interno antes de qualquer teste ativo.</p><p><strong>Ações proibidas:</strong> Enumerar terceiros fora de contrato; Forçar autenticação; Explorar vulnerabilidades; Executar brute force; Coletar dados pessoais expostos além do mínimo necessário.</p><p><strong>Meta defensiva:</strong> Mapear exposição real sem ultrapassar limites: nomes, IPs, portas, tecnologias, donos, criticidade e controles associados.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra o reconhecimento autorizado como um funil defensivo. A organização começa com fontes confiáveis de inventário, cruza exposição externa e interna, valida dono e criticidade, prioriza risco e transforma achados em correção acompanhada.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Fluxo de reconhecimento autorizado e superfície de ataque\">\n    <svg viewBox=\"0 0 980 560\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-16-3-content-diagram-1-title svg-16-3-content-diagram-1-desc\">\n      <title id=\"svg-16-3-content-diagram-1-title\">Reconhecimento autorizado e superfície de ataque</title>\n      <desc id=\"svg-16-3-content-diagram-1-desc\">Diagrama pedagógico da aula 16.3, Reconhecimento autorizado e superfície de ataque, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1603\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n        </marker>\n      </defs>\n      <rect x=\"30\" y=\"35\" width=\"920\" height=\"490\" rx=\"24\" class=\"svg-panel\" />\n      <text x=\"490\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Reconhecimento autorizado: do inventário ao risco priorizado</text>\n\n      <rect x=\"70\" y=\"115\" width=\"170\" height=\"95\" rx=\"16\" class=\"svg-node svg-node--source\" />\n      <text x=\"155\" y=\"145\" text-anchor=\"middle\" class=\"svg-label\">Fontes internas</text>\n      <text x=\"155\" y=\"172\" text-anchor=\"middle\" class=\"svg-small\">CMDB • IAM • Cloud</text>\n      <text x=\"155\" y=\"193\" text-anchor=\"middle\" class=\"svg-small\">DNS • Certificados</text>\n\n      <rect x=\"70\" y=\"255\" width=\"170\" height=\"95\" rx=\"16\" class=\"svg-node svg-node--source\" />\n      <text x=\"155\" y=\"285\" text-anchor=\"middle\" class=\"svg-label\">Fontes externas</text>\n      <text x=\"155\" y=\"312\" text-anchor=\"middle\" class=\"svg-small\">Domínios • IPs</text>\n      <text x=\"155\" y=\"333\" text-anchor=\"middle\" class=\"svg-small\">ASN • CT logs</text>\n\n      <rect x=\"300\" y=\"175\" width=\"170\" height=\"115\" rx=\"16\" class=\"svg-node svg-node--process\" />\n      <text x=\"385\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">Normalização</text>\n      <text x=\"385\" y=\"232\" text-anchor=\"middle\" class=\"svg-small\">deduplicar</text>\n      <text x=\"385\" y=\"253\" text-anchor=\"middle\" class=\"svg-small\">identificar dono</text>\n      <text x=\"385\" y=\"274\" text-anchor=\"middle\" class=\"svg-small\">classificar ambiente</text>\n\n      <rect x=\"535\" y=\"115\" width=\"175\" height=\"95\" rx=\"16\" class=\"svg-node svg-node--risk\" />\n      <text x=\"622\" y=\"145\" text-anchor=\"middle\" class=\"svg-label\">Exposição</text>\n      <text x=\"622\" y=\"172\" text-anchor=\"middle\" class=\"svg-small\">serviços publicados</text>\n      <text x=\"622\" y=\"193\" text-anchor=\"middle\" class=\"svg-small\">TLS • portas • DNS</text>\n\n      <rect x=\"535\" y=\"255\" width=\"175\" height=\"95\" rx=\"16\" class=\"svg-node svg-node--risk\" />\n      <text x=\"622\" y=\"285\" text-anchor=\"middle\" class=\"svg-label\">Contexto</text>\n      <text x=\"622\" y=\"312\" text-anchor=\"middle\" class=\"svg-small\">criticidade • dados</text>\n      <text x=\"622\" y=\"333\" text-anchor=\"middle\" class=\"svg-small\">controle • evidência</text>\n\n      <rect x=\"765\" y=\"175\" width=\"145\" height=\"115\" rx=\"16\" class=\"svg-node svg-node--control\" />\n      <text x=\"837\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">Ação defensiva</text>\n      <text x=\"837\" y=\"232\" text-anchor=\"middle\" class=\"svg-small\">priorizar</text>\n      <text x=\"837\" y=\"253\" text-anchor=\"middle\" class=\"svg-small\">corrigir</text>\n      <text x=\"837\" y=\"274\" text-anchor=\"middle\" class=\"svg-small\">monitorar</text>\n\n      <rect x=\"300\" y=\"390\" width=\"410\" height=\"75\" rx=\"16\" class=\"svg-node svg-node--evidence\" />\n      <text x=\"505\" y=\"420\" text-anchor=\"middle\" class=\"svg-label\">Registro de evidências e governança</text>\n      <text x=\"505\" y=\"448\" text-anchor=\"middle\" class=\"svg-small\">escopo • fonte • timestamp • decisão • dono • prazo</text>\n\n      <line x1=\"240\" y1=\"162\" x2=\"300\" y2=\"210\" class=\"svg-line\" marker-end=\"url(#arrow1603)\" />\n      <line x1=\"240\" y1=\"302\" x2=\"300\" y2=\"255\" class=\"svg-line\" marker-end=\"url(#arrow1603)\" />\n      <line x1=\"470\" y1=\"220\" x2=\"535\" y2=\"165\" class=\"svg-line\" marker-end=\"url(#arrow1603)\" />\n      <line x1=\"470\" y1=\"250\" x2=\"535\" y2=\"300\" class=\"svg-line\" marker-end=\"url(#arrow1603)\" />\n      <line x1=\"710\" y1=\"165\" x2=\"765\" y2=\"212\" class=\"svg-line\" marker-end=\"url(#arrow1603)\" />\n      <line x1=\"710\" y1=\"300\" x2=\"765\" y2=\"255\" class=\"svg-line\" marker-end=\"url(#arrow1603)\" />\n      <line x1=\"837\" y1=\"290\" x2=\"710\" y2=\"420\" class=\"svg-line svg-line--dashed\" marker-end=\"url(#arrow1603)\" />\n      <line x1=\"300\" y1=\"428\" x2=\"190\" y2=\"350\" class=\"svg-line svg-line--dashed\" marker-end=\"url(#arrow1603)\" />\n\n      <text x=\"155\" y=\"500\" text-anchor=\"middle\" class=\"svg-small\">Nada fora do escopo</text>\n      <text x=\"505\" y=\"500\" text-anchor=\"middle\" class=\"svg-small\">Evidência antes de conclusão</text>\n      <text x=\"837\" y=\"500\" text-anchor=\"middle\" class=\"svg-small\">Correção proporcional ao risco</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>O laboratório desta aula é documental e defensivo. Você construirá um mapa de superfície de ataque autorizada para uma empresa fictícia, usando fontes controladas e sem executar atividade contra terceiros. O resultado esperado é uma tabela priorizada de ativos, exposição, dono, evidência, risco e ação recomendada.</p>\n  <p>Este laboratório reforça que reconhecimento profissional é menos sobre ferramenta e mais sobre método, escopo, evidência e decisão. O produto final deve poder ser entregue a um gestor técnico, a um arquiteto cloud, ao SOC e ao dono da aplicação.</p>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — inventário versus DNS público</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code>fqdn,ip,source,owner,criticality,expected_exposure,observed_exposure,status\nportal.lab.example,203.0.113.10,dns-public,web-team,high,public,public,ok\nvpn.lab.example,203.0.113.20,dns-public,network-team,high,public,public,ok\ndb-old.lab.example,203.0.113.30,dns-public,,critical,private,public,orphan-risk\napi-dev.lab.example,198.51.100.15,dns-public,platform-team,medium,private,public,review</code></pre><p><strong>Tarefa:</strong> Classifique ativos órfãos, divergências de exposição e prioridades de correção sem realizar varredura ativa fora do laboratório.</p><p><strong>Ideia de detecção:</strong> <code>asset.observed_exposure=public AND asset.expected_exposure!=public OR owner IS NULL</code></p><p><strong>Achado esperado:</strong> db-old.lab.example é risco crítico por exposição pública e ausência de dono; api-dev exige revisão e possível private endpoint/VPN.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios treinam classificação de exposição, distinção entre evidência e suposição, identificação de shadow IT, priorização de risco e desenho de controles preventivos. Faça as respostas como se estivesse preparando um relatório profissional.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio é construir um programa mínimo de reconhecimento autorizado contínuo para uma organização híbrida. Você precisará definir fontes, cadência, critérios de risco, responsáveis, tickets, exceções e integração com DevSecOps e SOC.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada mostra como transformar descobertas em governança. O foco não é listar o maior número possível de ativos, mas reduzir risco real com priorização, donos, evidência, correção e prevenção de recorrência.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Reconhecimento autorizado é a base defensiva para entender superfície de ataque. Ele começa com escopo e autorização, coleta dados de fontes confiáveis, normaliza ativos, correlaciona exposição com contexto, valida com cuidado, prioriza risco e transforma achados em melhoria.</p>\n  <p>Você aprendeu que superfície de ataque inclui DNS, IPs, portas, APIs, cloud, serviços gerenciados, identidades, pipelines, VPN, Kubernetes, integrações e dependências. Também aprendeu que descobertas sem dono, evidência e recomendação geram ruído; descobertas contextualizadas geram redução de risco.</p>\n  <div class=\"callout callout--success\"><strong>Resumo prático:</strong> inventário sem exposição é incompleto; exposição sem contexto é ruído; contexto sem ação é relatório parado; ação sem governança vira risco.</div>\n\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Mapear exposição real sem ultrapassar limites: nomes, IPs, portas, tecnologias, donos, criticidade e controles associados. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, você estudará <strong>16.4 — Varredura de portas e validação defensiva</strong>. A aula mostrará como validar portas e serviços dentro de escopo, com intensidade controlada, autorização, evidências, logs e interpretação defensiva, sem confundir ferramenta com diagnóstico.</p>\n\n</section>"
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
    "dependsOn": [
      "Módulo 13 Segurança de Redes",
      "Módulo 14 Cloud Networking",
      "Módulo 15 Troubleshooting de Redes",
      "Módulo 16 Aula 16.2"
    ],
    "connectsTo": [
      "Attack Surface Management",
      "SOC",
      "Threat Hunting",
      "Cloud Security",
      "DevSecOps",
      "IAM",
      "Governança de Segurança"
    ]
  },
  "lab": {
    "id": "lab-16.3",
    "title": "Laboratório: mapa de superfície de ataque autorizada",
    "labType": "cloud",
    "objective": "Construir um mapa defensivo de superfície de ataque para uma empresa fictícia, cruzando fontes de inventário, exposição, dono, controle, evidência e priorização de risco.",
    "scenario": "A empresa Fênix Saúde Digital possui domínio público, aplicações web, APIs de parceiros, VPN, cloud com VPC/VNet, Kubernetes, bancos gerenciados, DNS público e privado, WAF, load balancers, pipelines IaC, SIEM e ambientes de produção/homologação. O comitê aprovou reconhecimento defensivo documental e validações de baixa intensidade somente nos ativos listados.",
    "topology": [
      "Domínio público fenix.example e subdomínios corporativos",
      "Aplicações web atrás de WAF e Load Balancer",
      "APIs de parceiros com autenticação e TLS",
      "VPN de usuários remotos e acesso administrativo",
      "Cloud com VPC/VNet, subnets públicas, privadas e endpoints privados",
      "Cluster Kubernetes com Ingress e Services internos",
      "Bancos gerenciados e storage privado",
      "SIEM com logs de DNS, WAF, LB, firewall, flow logs e auditoria cloud"
    ],
    "architecture": "Pipeline defensivo: escopo aprovado → fontes internas e externas → normalização → correlação → validação controlada → priorização → ticket de correção → monitoramento de mudança.",
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
    "estimatedTimeMinutes": 360,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes.",
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
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Somente domínios, blocos, aplicações e contas de laboratório aprovados. Preferir fontes passivas e inventário interno antes de qualquer teste ativo.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: Lista de ativos expostos | Fonte de descoberta | Dono e criticidade | Print/export de DNS/certificado | Logs de validação | Ação recomendada por ativo",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Reafirmar escopo e limites",
        "instruction": "Leia a ROE fictícia e liste domínios, contas cloud, ranges, aplicações e ambientes permitidos, condicionais e proibidos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela de escopo com limites objetivos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Reconhecimento autorizado e superfície de ataque” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Criar modelo de inventário",
        "instruction": "Monte colunas para ativo, tipo, ambiente, dono, fonte, evidência, exposição, controle, criticidade, risco, recomendação e prazo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Planilha ou tabela padronizada para registrar achados.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Reconhecimento autorizado e superfície de ataque” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Mapear fontes internas",
        "instruction": "Liste quais informações viriam de CMDB, tags cloud, IAM, WAF, firewall, DNS privado, SIEM, pipelines e tickets de mudança.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Catálogo de fontes internas com responsável por cada fonte.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Reconhecimento autorizado e superfície de ataque” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Mapear fontes externas autorizadas",
        "instruction": "Liste quais informações podem ser obtidas de DNS público, certificados, registros de domínio e inventário de IPs próprios sem tocar terceiros fora de escopo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista de sinais externos permitidos pela ROE.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Reconhecimento autorizado e superfície de ataque” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Correlacionar ativo com dono e ambiente",
        "instruction": "Para cada ativo fictício, associe dono técnico, dono de negócio, ambiente, criticidade e dados tratados.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Ativos órfãos destacados como risco de governança.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Reconhecimento autorizado e superfície de ataque” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Classificar exposição",
        "instruction": "Classifique cada ativo como público, privado, restrito por VPN, restrito por IP, acessível por Private Link, interno ao cluster ou sem exposição confirmada.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mapa de exposição com nível de confiança.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Reconhecimento autorizado e superfície de ataque” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Avaliar controles defensivos",
        "instruction": "Para ativos expostos, registre se há TLS válido, WAF, autenticação forte, logs, rate limiting, segmentação, egress control e monitoramento.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz ativo-controle com lacunas claras.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Reconhecimento autorizado e superfície de ataque” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Priorizar risco",
        "instruction": "Aplique critério simples: exposição externa, dado sensível, ausência de controle, criticidade, facilidade de correção e mudança recente.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Fila priorizada de ações defensivas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Reconhecimento autorizado e superfície de ataque” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Definir ações e donos",
        "instruction": "Para cada achado, escreva ação recomendada, responsável, prazo, evidência necessária para fechamento e controle preventivo futuro.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Backlog defensivo rastreável.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Reconhecimento autorizado e superfície de ataque” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Integrar com SOC e DevSecOps",
        "instruction": "Defina alertas para novos ativos públicos, DNS sem ticket, recurso sem tag, regra ampla, endpoint público de banco e certificado próximo de expirar.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de detecção de mudanças na superfície.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Reconhecimento autorizado e superfície de ataque” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Ativo exposto sem dono | Sinal: DNS público ou IP com serviço sem owner | Query: public_asset=true AND owner IS NULL | FP: Ativo legado ainda em decomissionamento\nDetecção: Serviço administrativo público | Sinal: Porta de administração exposta à internet | Query: dst_port IN (22,3389,5900,9200,2375) AND exposure=public | FP: Bastion intencional mal documentado\nDetecção: Divergência inventário versus realidade | Sinal: CMDB não contém serviço observado | Query: observed_service NOT IN cmdb_services | FP: Ambiente temporário de projeto",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 14,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Remover DNS órfão | Restringir security group/ACL | Mover administração para bastion | Habilitar WAF/logging | Criar plano de decomissionamento",
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
        "instruction": "Classifique ativos órfãos, divergências de exposição e prioridades de correção sem realizar varredura ativa fora do laboratório.",
        "artifact": "fqdn,ip,source,owner,criticality,expected_exposure,observed_exposure,status\nportal.lab.example,203.0.113.10,dns-public,web-team,high,public,public,ok\nvpn.lab.example,203.0.113.20,dns-public,network-team,high,public,public,ok\ndb-old.lab.example,203.0.113.30,dns-public,,critical,private,public,orphan-risk\napi-dev.lab.example,198.51.100.15,dns-public,platform-team,medium,private,public,review",
        "analysisTask": "Aplicar a ideia de detecção: asset.observed_exposure=public AND asset.expected_exposure!=public OR owner IS NULL",
        "evidence": "Lista de FQDNs sintéticos | Comparação com inventário | Dono/criticidade | Plano de remoção ou restrição",
        "expectedOutput": "db-old.lab.example é risco crítico por exposição pública e ausência de dono; api-dev exige revisão e possível private endpoint/VPN.",
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
    "expectedResult": "Mapa de superfície autorizado com ativos, donos, exposições, controles, evidências, riscos e ações priorizadas.",
    "validation": [
      {
        "check": "A entrega deve provar rastreabilidade: todo achado tem fonte, timestamp, escopo, dono, criticidade, recomendação e evidência.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "A entrega deve provar rastreabilidade: todo achado tem fonte, timestamp, escopo, dono, criticidade, recomendação e evidência.",
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
        "symptom": "Se o mapa virar apenas lista de domínios ou IPs, reforce contexto: dono, ambiente, controle, log, dado sensível e ação.",
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
      "Automatizar coleta de inventário cloud e DNS.",
      "Criar política de tag obrigatória para dono e criticidade.",
      "Integrar novos recursos públicos com aprovação em pipeline.",
      "Criar dashboard de mudanças de superfície.",
      "Revisar exceções mensalmente.",
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
      "Comprovação de limpeza ou plano para remoção dos recursos cloud",
      "Lista de ativos expostos",
      "Fonte de descoberta",
      "Dono e criticidade",
      "Print/export de DNS/certificado",
      "Logs de validação",
      "Ação recomendada por ativo",
      "Lista de FQDNs sintéticos",
      "Comparação com inventário",
      "Dono/criticidade",
      "Plano de remoção ou restrição"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Reconhecimento autorizado e superfície de ataque” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Desafio: programa mínimo de reconhecimento autorizado contínuo",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Mapear exposição real sem ultrapassar limites: nomes, IPs, portas, tecnologias, donos, criticidade e controles associados.",
    "authorizedScope": "Somente domínios, blocos, aplicações e contas de laboratório aprovados. Preferir fontes passivas e inventário interno antes de qualquer teste ativo.",
    "allowedActions": [
      "Consultar inventário interno",
      "Comparar DNS público e privado",
      "Revisar certificados e banners autorizados",
      "Validar portas apenas em alvos aprovados"
    ],
    "prohibitedActions": [
      "Enumerar terceiros fora de contrato",
      "Forçar autenticação",
      "Explorar vulnerabilidades",
      "Executar brute force",
      "Coletar dados pessoais expostos além do mínimo necessário"
    ],
    "telemetrySources": [
      "DNS público e privado",
      "Certificate Transparency",
      "Inventário CMDB/cloud",
      "WAF/LB logs",
      "Flow logs",
      "Registro de scanner autorizado",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Ativo exposto sem dono",
        "signal": "DNS público ou IP com serviço sem owner",
        "queryIdea": "public_asset=true AND owner IS NULL",
        "commonFalsePositive": "Ativo legado ainda em decomissionamento",
        "response": "Abrir risco, restringir exposição e exigir dono."
      },
      {
        "name": "Serviço administrativo público",
        "signal": "Porta de administração exposta à internet",
        "queryIdea": "dst_port IN (22,3389,5900,9200,2375) AND exposure=public",
        "commonFalsePositive": "Bastion intencional mal documentado",
        "response": "Remover exposição pública ou restringir por VPN/ZTNA e MFA."
      },
      {
        "name": "Divergência inventário versus realidade",
        "signal": "CMDB não contém serviço observado",
        "queryIdea": "observed_service NOT IN cmdb_services",
        "commonFalsePositive": "Ambiente temporário de projeto",
        "response": "Atualizar inventário ou remover serviço órfão."
      }
    ],
    "containmentActions": [
      "Remover DNS órfão",
      "Restringir security group/ACL",
      "Mover administração para bastion",
      "Habilitar WAF/logging",
      "Criar plano de decomissionamento"
    ],
    "evidenceChecklist": [
      "Lista de ativos expostos",
      "Fonte de descoberta",
      "Dono e criticidade",
      "Print/export de DNS/certificado",
      "Logs de validação",
      "Ação recomendada por ativo"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — inventário versus DNS público",
      "theme": "superfície de ataque autorizada",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "fqdn,ip,source,owner,criticality,expected_exposure,observed_exposure,status",
        "portal.lab.example,203.0.113.10,dns-public,web-team,high,public,public,ok",
        "vpn.lab.example,203.0.113.20,dns-public,network-team,high,public,public,ok",
        "db-old.lab.example,203.0.113.30,dns-public,,critical,private,public,orphan-risk",
        "api-dev.lab.example,198.51.100.15,dns-public,platform-team,medium,private,public,review"
      ],
      "analysisPrompt": "Classifique ativos órfãos, divergências de exposição e prioridades de correção sem realizar varredura ativa fora do laboratório.",
      "detectionIdea": "asset.observed_exposure=public AND asset.expected_exposure!=public OR owner IS NULL",
      "expectedFinding": "db-old.lab.example é risco crítico por exposição pública e ausência de dono; api-dev exige revisão e possível private endpoint/VPN.",
      "evidenceToCollect": [
        "Lista de FQDNs sintéticos",
        "Comparação com inventário",
        "Dono/criticidade",
        "Plano de remoção ou restrição"
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
      "question": "Um subdomínio público aponta para um load balancer sem dono claro. Quais evidências você coleta antes de abrir achado?",
      "answer": "DNS, certificado, conta cloud, tags, logs do LB/WAF, ticket de criação, ambiente, aplicação associada e consulta a CMDB/IaC. Sem dono, registrar risco de governança e não apenas risco técnico."
    },
    {
      "question": "Explique por que um endpoint público com autenticação forte ainda pode ser relevante na superfície de ataque.",
      "answer": "Porque exposição pública aumenta tentativas, dependência de TLS, WAF, logs, rate limiting e IAM. Autenticação reduz risco, mas não elimina necessidade de monitoramento, hardening e justificativa de exposição."
    },
    {
      "question": "Uma regra cloud permite entrada de 0.0.0.0/0 na porta administrativa, mas o serviço não responde. Isso é achado?",
      "answer": "Sim, provavelmente é achado de configuração perigosa, mesmo sem resposta no momento. Deve ser validado com escopo, correlacionado com recurso e corrigido para menor privilégio."
    },
    {
      "question": "Como DevSecOps reduz recorrência de shadow IT?",
      "answer": "Com IaC, revisão de exposição, tags obrigatórias, aprovação para recursos públicos, políticas preventivas, inventário automático e alertas para drift ou criação fora do pipeline."
    },
    {
      "id": "ex16.3.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “Reconhecimento autorizado e superfície de ataque” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como DNS público e privado, Certificate Transparency, Inventário CMDB/cloud, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.3.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Enumerar terceiros fora de contrato: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Forçar autenticação: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Explorar vulnerabilidades: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.3.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — inventário versus DNS público”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "db-old.lab.example é risco crítico por exposição pública e ausência de dono; api-dev exige revisão e possível private endpoint/VPN. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Qual é o objetivo principal do reconhecimento autorizado?",
      "options": [
        "Explorar sistemas vulneráveis",
        "Mapear ativos e exposição dentro de escopo aprovado para reduzir risco",
        "Ignorar governança para acelerar testes",
        "Executar varreduras fora da janela"
      ],
      "answer": 1,
      "explanation": "O foco é defensivo: inventário, exposição, evidência, contexto, priorização e correção dentro de autorização."
    },
    {
      "question": "Qual item melhor representa superfície de ataque?",
      "options": [
        "Apenas portas abertas na internet",
        "Apenas CVEs críticas",
        "Todos os pontos pelos quais a organização pode ser alcançada, influenciada ou abusada",
        "Somente servidores físicos"
      ],
      "answer": 2,
      "explanation": "Superfície inclui rede, aplicações, DNS, identidades, cloud, pipelines, APIs, SaaS e integrações."
    },
    {
      "question": "Um ativo sem dono deve ser tratado como quê?",
      "options": [
        "Baixo risco por não ter responsável",
        "Apenas falso positivo",
        "Risco de governança que impede correção efetiva",
        "Evidência de ataque confirmado"
      ],
      "answer": 2,
      "explanation": "Sem dono, não há caminho claro de decisão, correção, exceção ou aceite de risco."
    },
    {
      "question": "Qual é uma boa prática para reconhecimento em cloud?",
      "options": [
        "Confiar apenas em prints manuais",
        "Cruzar inventário cloud, tags, rotas, DNS, logs e políticas",
        "Desabilitar logs para reduzir custo durante análise",
        "Permitir endpoints públicos por padrão"
      ],
      "answer": 1,
      "explanation": "Cloud exige correlação entre configuração, exposição, dono, logs e política."
    },
    {
      "question": "O que diferencia achado de hipótese?",
      "options": [
        "Achado sempre usa linguagem alarmista",
        "Achado possui evidência suficiente e contexto; hipótese ainda precisa validação",
        "Hipótese é sempre mais grave",
        "Não há diferença"
      ],
      "answer": 1,
      "explanation": "Evidência e contexto transformam suspeita em achado útil."
    },
    {
      "question": "Por que integrar reconhecimento com DevSecOps?",
      "options": [
        "Para substituir autorização",
        "Para impedir todo deploy",
        "Para detectar e prevenir exposição indevida antes e depois do merge",
        "Para remover necessidade de SOC"
      ],
      "answer": 2,
      "explanation": "Pipelines podem criar superfície; guardrails e inventário contínuo reduzem recorrência."
    }
  ],
  "flashcards": [
    {
      "front": "Reconhecimento autorizado",
      "back": "Coleta e validação controlada de informações sobre ativos e exposição dentro de escopo aprovado."
    },
    {
      "front": "Superfície de ataque",
      "back": "Conjunto de pontos pelos quais uma organização pode ser alcançada, influenciada ou abusada."
    },
    {
      "front": "Shadow IT",
      "back": "Ativo, serviço ou integração criado fora dos processos oficiais de governança e inventário."
    },
    {
      "front": "Achado útil",
      "back": "Descoberta com evidência, contexto, dono, impacto, recomendação e prioridade."
    },
    {
      "front": "Falso positivo",
      "back": "Sinal que parece indicar exposição ou risco, mas não se confirma após validação adequada."
    },
    {
      "front": "ASM",
      "back": "Attack Surface Management: prática contínua de inventariar, monitorar e reduzir superfície de ataque."
    }
  ],
  "mentorQuestions": [
    "Qual é a diferença entre descobrir um subdomínio e provar que ele representa risco?",
    "Que fontes você cruzaria para confirmar se um recurso público em cloud é esperado ou acidental?",
    "Como você desenharia um alerta útil para novos ativos expostos sem gerar ruído excessivo para o SOC?"
  ],
  "challenge": {
    "title": "Desafio: programa mínimo de reconhecimento autorizado contínuo",
    "scenario": "Você assumiu a responsabilidade de estruturar reconhecimento defensivo para uma empresa híbrida com datacenter, AWS/Azure, Kubernetes, VPN, WAF, APIs públicas, parceiros e pipelines IaC.",
    "tasks": [
      "Definir escopo inicial e exclusões.",
      "Escolher fontes internas e externas permitidas.",
      "Criar modelo de dados de inventário e exposição.",
      "Definir critérios de priorização.",
      "Propor alertas para mudanças relevantes.",
      "Desenhar fluxo de ticket, exceção, correção e validação.",
      "Propor guardrails DevSecOps para novos recursos públicos."
    ],
    "successCriteria": [
      "Nenhuma atividade fora de escopo.",
      "Todo achado possui evidência e dono.",
      "Critérios de risco são objetivos.",
      "Ações reduzem recorrência, não apenas corrigem caso isolado.",
      "SOC, cloud, rede, aplicação e governança aparecem no fluxo."
    ],
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
    "summary": "Uma boa solução começa pequena, governada e contínua: inventário confiável, fontes autorizadas, correlação com dono, priorização por risco e integração com correção.",
    "steps": [
      "Usar ROE da aula 16.2 como contrato operacional.",
      "Coletar DNS, certificados, inventário cloud, WAF, LB, firewall, IAM e CMDB.",
      "Normalizar ativos por domínio, IP, conta, ambiente, dono e criticidade.",
      "Classificar exposição pública, privada, VPN, restrita por IP ou Private Link.",
      "Avaliar controles mínimos: TLS, WAF, logs, autenticação, segmentação e egress.",
      "Priorizar por exposição externa, dado sensível, ausência de controle e criticidade.",
      "Abrir tickets com dono, prazo e evidência de fechamento.",
      "Criar alertas de mudança e bloqueios preventivos em pipeline.",
      "Confirmar escopo autorizado e critérios de parada.",
      "Selecionar telemetria mínima e proteger evidências.",
      "Gerar hipóteses defensivas e falsos positivos esperados.",
      "Escolher mitigação proporcional, reversível e comunicada.",
      "Registrar debrief com achados, lacunas e melhorias permanentes."
    ],
    "commonMistakes": [
      "Confundir lista de IPs com superfície de ataque.",
      "Executar validação ativa fora de escopo.",
      "Não registrar fonte e timestamp.",
      "Não diferenciar hipótese de achado.",
      "Não atribuir dono.",
      "Ignorar cloud, DNS, identidade e pipelines."
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
      "term": "Reconhecimento autorizado",
      "definition": "Mapeamento defensivo de ativos e exposição com autorização, escopo, método e limites definidos."
    },
    {
      "term": "Superfície de ataque",
      "definition": "Conjunto de interfaces, fluxos, identidades, serviços e dependências que podem ser alcançados ou abusados."
    },
    {
      "term": "ASM",
      "definition": "Attack Surface Management; processo contínuo de descoberta, validação, priorização e redução de exposição."
    },
    {
      "term": "Shadow IT",
      "definition": "Tecnologia, serviço ou ativo criado sem visibilidade ou aprovação dos processos oficiais."
    },
    {
      "term": "Exposição externa",
      "definition": "Capacidade de um ativo ser alcançado a partir de redes externas, geralmente internet ou parceiros."
    },
    {
      "term": "Achado priorizado",
      "definition": "Descoberta com evidência, contexto, risco, dono, recomendação e prazo de tratamento."
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
        "16.3",
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
        "16.3",
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
        "16.3",
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
        "16.3",
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
      "title": "NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment",
      "url": "https://csrc.nist.gov/pubs/sp/800/115/final",
      "type": "framework"
    },
    {
      "title": "CISA BOD 23-01 Implementation Guidance",
      "url": "https://www.cisa.gov/news-events/directives/bod-23-01-implementation-guidance-improving-asset-visibility-and-vulnerability-detection-federal",
      "type": "guidance"
    },
    {
      "title": "OWASP Attack Surface Analysis Cheat Sheet",
      "url": "https://cheatsheetseries.owasp.org/cheatsheets/Attack_Surface_Analysis_Cheat_Sheet.html",
      "type": "cheat-sheet"
    },
    {
      "title": "MITRE ATT&CK — Network Service Discovery T1046",
      "url": "https://attack.mitre.org/techniques/T1046/",
      "type": "knowledge-base"
    }
  ],
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
              "name": "Risco Blue Team específico — Reconhecimento autorizado e superfície de ataque",
              "description": "Em Reconhecimento autorizado e superfície de ataque, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
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
      "DNS público e privado",
      "Certificate Transparency",
      "Inventário CMDB/cloud",
      "WAF/LB logs",
      "Flow logs",
      "Registro de scanner autorizado"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.3.",
      "Ativo exposto sem dono — sinal: DNS público ou IP com serviço sem owner; ideia de consulta: public_asset=true AND owner IS NULL; falso positivo comum: Ativo legado ainda em decomissionamento.",
      "Serviço administrativo público — sinal: Porta de administração exposta à internet; ideia de consulta: dst_port IN (22,3389,5900,9200,2375) AND exposure=public; falso positivo comum: Bastion intencional mal documentado.",
      "Divergência inventário versus realidade — sinal: CMDB não contém serviço observado; ideia de consulta: observed_service NOT IN cmdb_services; falso positivo comum: Ambiente temporário de projeto."
    ],
    "ethicalLimits": {
      "authorizedScope": "Somente domínios, blocos, aplicações e contas de laboratório aprovados. Preferir fontes passivas e inventário interno antes de qualquer teste ativo.",
      "allowedActions": [
        "Consultar inventário interno",
        "Comparar DNS público e privado",
        "Revisar certificados e banners autorizados",
        "Validar portas apenas em alvos aprovados"
      ],
      "prohibitedActions": [
        "Enumerar terceiros fora de contrato",
        "Forçar autenticação",
        "Explorar vulnerabilidades",
        "Executar brute force",
        "Coletar dados pessoais expostos além do mínimo necessário"
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
      "Falha ou comportamento inesperado relacionado a Reconhecimento autorizado e superfície de ataque.",
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
      "Qual evidência comprova o entendimento da aula 16.3?"
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
      "16.4"
    ]
  },
  "blueTeamEnhancement": {
    "title": "Reconhecimento autorizado e superfície de ataque",
    "defensiveGoal": "Mapear exposição real sem ultrapassar limites: nomes, IPs, portas, tecnologias, donos, criticidade e controles associados.",
    "authorizedScope": "Somente domínios, blocos, aplicações e contas de laboratório aprovados. Preferir fontes passivas e inventário interno antes de qualquer teste ativo.",
    "allowedActions": [
      "Consultar inventário interno",
      "Comparar DNS público e privado",
      "Revisar certificados e banners autorizados",
      "Validar portas apenas em alvos aprovados"
    ],
    "prohibitedActions": [
      "Enumerar terceiros fora de contrato",
      "Forçar autenticação",
      "Explorar vulnerabilidades",
      "Executar brute force",
      "Coletar dados pessoais expostos além do mínimo necessário"
    ],
    "telemetrySources": [
      "DNS público e privado",
      "Certificate Transparency",
      "Inventário CMDB/cloud",
      "WAF/LB logs",
      "Flow logs",
      "Registro de scanner autorizado"
    ],
    "detectionEngineering": [
      {
        "name": "Ativo exposto sem dono",
        "signal": "DNS público ou IP com serviço sem owner",
        "queryIdea": "public_asset=true AND owner IS NULL",
        "commonFalsePositive": "Ativo legado ainda em decomissionamento",
        "response": "Abrir risco, restringir exposição e exigir dono."
      },
      {
        "name": "Serviço administrativo público",
        "signal": "Porta de administração exposta à internet",
        "queryIdea": "dst_port IN (22,3389,5900,9200,2375) AND exposure=public",
        "commonFalsePositive": "Bastion intencional mal documentado",
        "response": "Remover exposição pública ou restringir por VPN/ZTNA e MFA."
      },
      {
        "name": "Divergência inventário versus realidade",
        "signal": "CMDB não contém serviço observado",
        "queryIdea": "observed_service NOT IN cmdb_services",
        "commonFalsePositive": "Ambiente temporário de projeto",
        "response": "Atualizar inventário ou remover serviço órfão."
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
      "Remover DNS órfão",
      "Restringir security group/ACL",
      "Mover administração para bastion",
      "Habilitar WAF/logging",
      "Criar plano de decomissionamento"
    ],
    "evidencePackage": [
      "Lista de ativos expostos",
      "Fonte de descoberta",
      "Dono e criticidade",
      "Print/export de DNS/certificado",
      "Logs de validação",
      "Ação recomendada por ativo"
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
    "title": "Dataset sintético — inventário versus DNS público",
    "theme": "superfície de ataque autorizada",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "fqdn,ip,source,owner,criticality,expected_exposure,observed_exposure,status",
      "portal.lab.example,203.0.113.10,dns-public,web-team,high,public,public,ok",
      "vpn.lab.example,203.0.113.20,dns-public,network-team,high,public,public,ok",
      "db-old.lab.example,203.0.113.30,dns-public,,critical,private,public,orphan-risk",
      "api-dev.lab.example,198.51.100.15,dns-public,platform-team,medium,private,public,review"
    ],
    "analysisPrompt": "Classifique ativos órfãos, divergências de exposição e prioridades de correção sem realizar varredura ativa fora do laboratório.",
    "detectionIdea": "asset.observed_exposure=public AND asset.expected_exposure!=public OR owner IS NULL",
    "expectedFinding": "db-old.lab.example é risco crítico por exposição pública e ausência de dono; api-dev exige revisão e possível private endpoint/VPN.",
    "evidenceToCollect": [
      "Lista de FQDNs sintéticos",
      "Comparação com inventário",
      "Dono/criticidade",
      "Plano de remoção ou restrição"
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
