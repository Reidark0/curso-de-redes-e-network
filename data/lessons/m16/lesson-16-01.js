export const lesson1601 = {
  "id": "16.1",
  "moduleId": "m16",
  "order": 1,
  "title": "Redes como fundação da cibersegurança",
  "subtitle": "Por que todo profissional de segurança precisa entender fluxos, protocolos, segmentação, telemetria, superfície de ataque e resposta baseada em evidências.",
  "duration": "220-320 min",
  "estimatedStudyTimeMinutes": 320,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 320,
  "tags": [
    "cibersegurança",
    "redes",
    "blue team",
    "SOC",
    "telemetria",
    "segmentação",
    "Zero Trust",
    "superfície de ataque",
    "flow logs",
    "DNS logs",
    "SIEM",
    "DevSecOps",
    "cloud security",
    "defesa em profundidade",
    "ética",
    "escopo autorizado",
    "Blue Team",
    "NDR",
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
      "lesson": "13.10",
      "reason": "Arquitetura defensiva de rede é a base conceitual para usar redes como controle de segurança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.14",
      "reason": "Cloud Networking mostra como VPC/VNet, rotas, private endpoints e logs entram na defesa moderna."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.12",
      "reason": "Troubleshooting, evidências e RCA são essenciais para investigação de segurança."
    },
    {
      "type": "course",
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "fundamentos de identidade",
      "lesson": "revisão recomendada",
      "reason": "Identidade e rede se complementam em arquiteturas Zero Trust e acesso moderno."
    }
  ],
  "objectives": [
    "Explicar por que redes sustentam prevenção, detecção, resposta e investigação em cibersegurança.",
    "Relacionar superfície de ataque com serviços, portas, nomes, rotas, identidades e exposição.",
    "Entender como segmentação, egress control, DNS, proxy, firewall e logs reduzem risco.",
    "Interpretar fluxos de rede como evidências de comportamento normal, anômalo ou suspeito.",
    "Conectar redes com SOC, DevSecOps, cloud, IAM, Zero Trust e governança.",
    "Preparar o aluno para atividades defensivas autorizadas nas próximas aulas do módulo."
  ],
  "learningOutcomes": [
    "Dado um sistema corporativo, o aluno identifica fluxos críticos e riscos de exposição.",
    "Dado um alerta de rede, o aluno lista fontes de evidência antes de concluir causa.",
    "Dado um desenho de rede plana, o aluno propõe segmentação e telemetria mínima.",
    "Dado um fluxo cloud, o aluno relaciona rotas, políticas, identidade e logs.",
    "Dado um cenário DevSecOps, o aluno transforma regras de rede em guardrails de pipeline.",
    "Dado um tema sensível de segurança, o aluno reconhece a necessidade de escopo e autorização."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Cibersegurança parece, à primeira vista, um assunto de ferramentas: EDR, SIEM, firewall, WAF, scanner, SAST, DAST, CSPM, CNAPP, XDR e muitas outras siglas. Mas por baixo dessas ferramentas existe uma pergunta simples: <strong>quem está se comunicando com quem, por qual caminho, usando qual protocolo, com qual identidade, em qual contexto e com qual risco?</strong> Essa pergunta é uma pergunta de rede.</p>\n  <p>Redes são a fundação da cibersegurança porque quase todo incidente moderno envolve comunicação. Um malware precisa resolver DNS, abrir conexão, receber comando, mover dados ou tentar alcançar outro host. Um usuário legítimo precisa autenticar, acessar um serviço, consumir API e receber resposta. Um atacante explorando uma aplicação web atravessa DNS, TCP, TLS, HTTP, proxy, WAF, load balancer, rede privada, banco e logs. Mesmo quando o problema começa em identidade, endpoint, aplicação ou cloud, ele se manifesta em fluxo.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> segurança não é apenas bloquear. Segurança é entender fluxos, reduzir superfície, controlar caminhos, observar comportamento, responder a anomalias e preservar evidências.</div>\n  <p>Esta aula abre o Módulo 16 para mudar a forma como você enxerga redes: não apenas como conectividade, mas como uma camada de defesa, detecção, investigação, resposta e governança. O objetivo não é ensinar técnicas ofensivas. O objetivo é mostrar por que um profissional de segurança que entende redes investiga melhor, toma decisões melhores e evita soluções mágicas.</p>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n\n  <p>No começo das redes corporativas, segurança era frequentemente associada ao perímetro. A empresa tinha uma rede interna considerada confiável e uma internet considerada perigosa. O firewall na borda era visto como a grande muralha. Se o tráfego vinha de fora, era suspeito; se vinha de dentro, era aceito com menos questionamento.</p>\n  <p>Essa visão funcionou parcialmente em ambientes simples, mas foi ficando insuficiente. Surgiram notebooks fora da empresa, VPNs, Wi-Fi corporativo, terceirizados, SaaS, cloud, containers, APIs, microserviços, identidades federadas, pipelines e dispositivos móveis. A fronteira deixou de ser uma linha clara. Um usuário pode estar em casa, uma aplicação pode estar em Kubernetes, um banco pode ser serviço gerenciado, a identidade pode estar em um provedor externo e o tráfego pode passar por CDN, WAF, proxy e private endpoint.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Perímetro clássico:</strong> firewall separando rede interna e internet.</div><div class=\"timeline-item\"><strong>Defesa em profundidade:</strong> múltiplas camadas de controles, logs e segmentação.</div><div class=\"timeline-item\"><strong>Cloud e SaaS:</strong> perda do perímetro único e crescimento de identidades, APIs e serviços gerenciados.</div><div class=\"timeline-item\"><strong>Zero Trust:</strong> acesso avaliado continuamente por identidade, dispositivo, contexto, política e recurso.</div><div class=\"timeline-item\"><strong>Detecção orientada a telemetria:</strong> logs de fluxo, DNS, proxy, EDR, IAM, cloud audit e SIEM viram matéria-prima de defesa.</div></div>\n  <p>A história mostra uma lição importante: redes continuam relevantes mesmo quando a infraestrutura muda. A forma física muda, mas os fundamentos permanecem. Endereços, rotas, portas, protocolos, nomes, sessões, latência, criptografia, logs e políticas continuam sendo peças fundamentais para proteger e investigar ambientes modernos.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema que esta aula resolve é a separação artificial entre “rede” e “segurança”. Em muitas equipes, redes são tratadas como conectividade e segurança como ferramenta. Isso gera lacunas. O time de rede libera fluxo sem saber o risco. O time de segurança cria regra sem entender rota de retorno. O time de cloud publica serviço sem compreender DNS privado. O time de DevSecOps expõe pipeline runner sem mapear egress. O SOC recebe alerta sem saber se aquele fluxo é normal.</p>\n  <p>Quando os fundamentos de rede faltam, surgem erros recorrentes:</p>\n  <ul>\n    <li><strong>Superfície invisível:</strong> serviços publicados sem inventário de portas, origens, destinos e donos;</li>\n    <li><strong>Segmentação fraca:</strong> rede plana permitindo movimento lateral amplo;</li>\n    <li><strong>Falso senso de segurança:</strong> acreditar que tráfego privado, VPN ou Private Endpoint elimina a necessidade de IAM, logs e política;</li>\n    <li><strong>Alertas sem contexto:</strong> SIEM recebe eventos, mas ninguém sabe qual fluxo deveria existir;</li>\n    <li><strong>Resposta insegura:</strong> durante incidente, abre-se acesso amplo para “testar” e cria-se risco maior;</li>\n    <li><strong>Investigação incompleta:</strong> logs de DNS, proxy, firewall, flow logs, EDR e IAM não são correlacionados.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> dizer “a rede está liberada” olhando apenas uma regra de firewall. A pergunta profissional é: DNS resolve para o destino esperado? A rota vai pelo caminho correto? A política permite ida e volta? O serviço escuta? O certificado é válido? O log confirma a sessão? O acesso faz sentido para aquele usuário e contexto?</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A evolução natural é sair de controles isolados para uma visão de arquitetura defensiva. No modelo antigo, a prioridade era permitir ou negar tráfego na borda. No modelo moderno, a rede participa de várias funções de segurança: prevenção, detecção, resposta, investigação, contenção, governança e custo.</p>\n  <p>Essa evolução passa por camadas. Primeiro, entender o fluxo: origem, destino, porta, protocolo, identidade, nome DNS, rota, política e dado trafegado. Depois, reduzir a superfície: publicar menos, segmentar melhor, usar acesso privado quando fizer sentido, controlar egress e remover exceções antigas. Em seguida, observar: flow logs, DNS logs, proxy logs, firewall logs, WAF logs, auditoria cloud, eventos de identidade e telemetria de endpoint. Por fim, responder: bloquear com precisão, isolar zona, revogar sessão, ajustar política, preservar evidência e produzir RCA.</p>\n  <p>O NIST CSF 2.0 organiza resultados de cibersegurança nas funções Govern, Identify, Protect, Detect, Respond e Recover. Redes aparecem de forma transversal nessas funções: inventário de ativos, proteção de acesso, detecção de tráfego anômalo, resposta a incidente e recuperação segura dependem de saber como os sistemas se comunicam.</p>\n  <div class=\"callout callout--info\"><strong>Do firewall à arquitetura:</strong> o firewall continua importante, mas sozinho não resolve identidade, aplicação, criptografia, telemetria, automação, governança e resposta.</div>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>Redes como fundação da cibersegurança</strong> significa usar conhecimento de comunicação digital para proteger, monitorar, investigar e melhorar sistemas. Não é apenas conhecer OSI ou decorar portas. É entender como uma decisão de arquitetura cria ou reduz risco.</p>\n  <p>Na prática, essa fundação possui cinco pilares:</p>\n  <ol>\n    <li><strong>Superfície de ataque:</strong> quais serviços, portas, nomes, IPs, APIs, rotas e endpoints estão alcançáveis;</li>\n    <li><strong>Controle de fluxo:</strong> quais comunicações são permitidas, negadas, inspecionadas, autenticadas ou registradas;</li>\n    <li><strong>Segmentação:</strong> como limitar impacto quando uma identidade, endpoint, aplicação ou workload é comprometido;</li>\n    <li><strong>Telemetria:</strong> quais evidências mostram comportamento normal, anômalo ou malicioso;</li>\n    <li><strong>Resposta:</strong> como conter, investigar e recuperar sem destruir evidências nem criar exceções perigosas.</li>\n  </ol>\n  <p>Este módulo usa a rede como lente defensiva. Quando falarmos de reconhecimento autorizado, varredura defensiva, MITM, movimento lateral, C2, exfiltração, hunting e DFIR, o foco será entender sinais, riscos e controles. Nenhuma atividade deve ser executada fora de ambiente próprio, laboratório autorizado ou escopo formal.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Internamente, a segurança baseada em rede começa quando um pacote ou fluxo nasce. Um processo em um host tenta resolver um nome via DNS. O resolvedor responde com um endereço. O host decide rota, encontra gateway, abre sessão TCP ou envia datagrama UDP. No caminho, switches, roteadores, firewalls, proxies, NAT, balanceadores, WAFs, túneis VPN, CNIs, service meshes e serviços cloud podem observar, alterar, permitir, negar, registrar ou encaminhar essa comunicação.</p>\n  <p>Para segurança, cada etapa produz perguntas:</p>\n  <ul>\n    <li><strong>Nome:</strong> o domínio é esperado, recém-criado, interno, externo, suspeito ou parecido com marca conhecida?</li>\n    <li><strong>Origem:</strong> o host, usuário, workload, pod ou serviço deveria iniciar esse fluxo?</li>\n    <li><strong>Destino:</strong> o IP, ASN, região, VPC/VNet, subnet ou serviço está dentro do padrão esperado?</li>\n    <li><strong>Protocolo e porta:</strong> a aplicação usa esse protocolo normalmente?</li>\n    <li><strong>Volume e frequência:</strong> há beaconing, pico de egress, transferência incomum ou tentativas repetidas?</li>\n    <li><strong>Política:</strong> a regra que permitiu o fluxo é específica, temporária, revisada e necessária?</li>\n    <li><strong>Criptografia:</strong> TLS, certificado, SNI e destino fazem sentido?</li>\n    <li><strong>Registro:</strong> o evento aparece em logs suficientes para investigação?</li>\n  </ul>\n  <p>Um fluxo de rede, portanto, não é apenas conectividade. Ele é evidência de comportamento. Pode ser comportamento legítimo, erro operacional, tráfego de atualização, integração de negócio, tentativa de exploração, movimento lateral, comando e controle ou exfiltração. O trabalho profissional é distinguir esses cenários com contexto e evidências.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>Uma arquitetura de cibersegurança apoiada em redes não depende de uma ferramenta única. Ela combina camadas: inventário, segmentação, controle de borda, controle interno, identidade, criptografia, telemetria, resposta e governança.</p>\n  <p>Em uma empresa moderna, a arquitetura pode incluir: usuários corporativos, VPN ou ZTNA, Wi-Fi segmentado, datacenter, VPC/VNet, Kubernetes, SaaS, IdP, WAF, proxy, DNS seguro, firewall, EDR, NDR, SIEM, SOAR, logs de flow, auditoria cloud e pipelines de IaC. A rede conecta todos esses elementos e também fornece evidências sobre como eles são usados.</p>\n  <div class=\"callout callout--example\"><strong>Arquitetura defensiva madura:</strong> não pergunta apenas “o pacote passa?”. Ela pergunta “o pacote deveria passar, para esse recurso, vindo dessa identidade, nesse contexto, com esse volume, registrado nesses logs e com capacidade de contenção se algo mudar?”.</div>\n  <p>Essa visão se conecta diretamente ao curso Enterprise Identity e IAM. Identidade decide quem pode acessar; rede decide por onde, de onde, para onde e sob quais caminhos técnicos. Também se conecta ao curso de Infraestrutura, Platform Engineering e DevSecOps: pipelines precisam criar redes seguras por padrão, não redes abertas que dependem de correção manual posterior.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Imagine um hospital. Segurança não é apenas o porteiro na entrada. Há recepção, identificação de pacientes, portas com crachá, áreas restritas, câmeras, prontuário, auditoria, protocolos de emergência, rotas de evacuação, farmácia controlada, isolamento de pacientes e registro de quem entrou em cada sala.</p>\n  <p>A rede corporativa é parecida. O firewall de borda é apenas a portaria. VLANs, subnets, security groups, proxies, DNS, logs, autenticação, segmentação, WAF, NAC e SIEM são corredores, crachás, câmeras, fechaduras e prontuários. Se alguém entra indevidamente em uma área, o objetivo é detectar rápido, limitar deslocamento, preservar registros e recuperar operação.</p>\n  <div class=\"callout callout--info\"><strong>Analogia útil:</strong> conectividade é o corredor; segurança é decidir quem pode andar por ele, para onde, em qual horário, deixando qual registro e com qual resposta se o comportamento fugir do normal.</div>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Um notebook corporativo começa a fazer conexões HTTPS para um domínio desconhecido a cada 60 segundos. Sem conhecimento de rede, alguém poderia olhar apenas o antivírus e concluir que não há problema porque nada foi bloqueado. Com raciocínio de rede, você pergunta: quem é a origem? qual processo gerou a conexão? qual domínio? qual IP? qual ASN? qual SNI? o intervalo é constante? há volume de dados? outros hosts fazem o mesmo? o DNS foi consultado antes? o proxy registrou a sessão? o EDR mostra processo pai?</p>\n  <p>Esse exemplo mostra como rede vira sinal de segurança. Uma conexão isolada pode ser normal. Uma conexão periódica, com domínio recém-observado, volume pequeno e intervalo fixo pode sugerir beaconing. A conclusão não vem de palpite; vem de correlação entre DNS, proxy, flow logs, EDR e baseline.</p>\n  <div class=\"callout callout--exercise\"><strong>Raciocínio:</strong> antes de bloquear, colete evidências suficientes para saber se é atualização legítima, ferramenta corporativa, falso positivo ou comportamento suspeito.</div>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Em uma empresa com matriz, filial, Wi-Fi corporativo, servidores internos e usuários remotos, a rede define limites de confiança. A área administrativa não deve acessar diretamente bancos de produção. A rede de visitantes não deve alcançar impressoras internas. Servidores web não devem iniciar conexão livre para a internet. Estações de trabalho não devem administrar switches. A filial não deve ter acesso irrestrito ao datacenter apenas porque usa VPN.</p>\n  <p>Uma arquitetura empresarial defensiva cria zonas: usuários, servidores, gerenciamento, terceiros, convidados, produção, homologação, segurança, backup e cloud. Para cada zona, define fluxos permitidos, donos, justificativa, logging e revisão. O resultado é menor superfície, menor movimento lateral, melhor visibilidade e resposta mais precisa.</p>\n  <p>Quando ocorre incidente, essa arquitetura ajuda. Se uma estação for comprometida, segmentação limita alcance. Se houver tráfego anômalo, flow logs e firewall logs mostram tentativa. Se um acesso for indevido, IAM e logs de rede ajudam a reconstruir a linha do tempo.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Em cloud, a fundação de segurança depende de VPC/VNet, subnets, rotas, security groups, NSGs, NACLs, private endpoints, NAT, DNS privado, peering, transit, flow logs e auditoria. A facilidade de criar recursos rapidamente aumenta o risco de exposição acidental. Um bucket privado pode ser seguro, mas uma aplicação com security group aberto, endpoint público e credencial vazada ainda cria incidente.</p>\n  <p>Um desenho cloud seguro pergunta: a aplicação precisa ser pública? o banco possui endpoint privado? o DNS interno resolve para IP privado? o egress passa por inspeção? o NAT gera custo anômalo? as regras são mínimas? flow logs estão ativos? a mudança foi feita por IaC? existe policy as code bloqueando `0.0.0.0/0` em portas administrativas?</p>\n  <div class=\"callout callout--warning\"><strong>Cloud não elimina rede:</strong> ela torna a rede programável. Isso é poderoso, mas também significa que um erro de código pode publicar uma superfície global em minutos.</div>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, redes aparecem em pipelines, runners, ambientes efêmeros, testes automatizados, policies e módulos de infraestrutura como código. Uma pipeline que cria uma API precisa validar não apenas se o container sobe, mas também se a rota, o load balancer, o certificado, o WAF, o security group, o DNS, o private endpoint e os logs estão corretos.</p>\n  <p>Um bom pipeline pode impedir regras perigosas, exigir tags, proibir portas administrativas públicas, validar que subnets privadas não têm rota direta para internet, confirmar que flow logs estão habilitados e rodar testes sintéticos pós-deploy. Isso reduz dependência de revisão manual e transforma segurança de rede em padrão reutilizável.</p>\n  <p>O aluno deve revisar o curso Infraestrutura, Platform Engineering e DevSecOps antes de aprofundar automação de guardrails. Este módulo mostra o raciocínio de segurança; aquele curso mostra como transformar o raciocínio em plataforma, pipeline e governança operacional.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Um alerta de possível exfiltração aparece no SIEM: alto volume de dados saindo de um servidor de aplicação para destino externo incomum. A investigação defensiva começa pelo fluxo: qual servidor? qual aplicação? qual usuário de serviço? qual porta? qual protocolo? houve DNS? o destino é conhecido? o tráfego passou por proxy? o firewall permitiu por qual regra? há logs no EDR? houve deploy recente? o volume foge do baseline?</p>\n  <p>Com fundamentos de rede, o analista consegue fazer perguntas melhores e evitar conclusões precipitadas. Talvez seja backup legítimo com destino novo. Talvez seja integração mal documentada. Talvez seja comprometimento. A diferença entre os cenários depende de evidências, dono do fluxo, baseline, logs e contexto de negócio.</p>\n  <div class=\"callout callout--security\"><strong>Postura segura:</strong> investigar primeiro com dados, conter com menor impacto, preservar evidências, envolver responsáveis e documentar ação. Bloquear tudo sem análise pode interromper negócio; liberar tudo por pressão pode ampliar o incidente.</div>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Somente análise de arquitetura, inventário, logs existentes e fluxos documentados. Não executar varredura ativa fora de laboratório explicitamente autorizado.</p><p><strong>Ações proibidas:</strong> Testar exploração; Tentar burlar controles; Coletar dados sensíveis sem necessidade; Alterar regras em produção sem mudança aprovada.</p><p><strong>Meta defensiva:</strong> Transformar arquitetura de rede em mapa defensivo: quais fluxos deveriam existir, quais evidências confirmam esses fluxos e quais controles reduzem superfície.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n\n  <p>O diagrama abaixo resume a ideia central: rede, identidade, workloads, políticas e telemetria formam uma malha defensiva. O fluxo permitido não é apenas conectividade; ele é governado, observado e investigável.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Rede como fundação da cibersegurança\">\n    <svg viewBox=\"0 0 960 540\" class=\"svg-diagram__canvas\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-16-1-content-diagram-1-title svg-16-1-content-diagram-1-desc\">\n      <title id=\"svg-16-1-content-diagram-1-title\">Redes como fundação da cibersegurança</title>\n      <desc id=\"svg-16-1-content-diagram-1-desc\">Diagrama pedagógico da aula 16.1, Redes como fundação da cibersegurança, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1601\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n      </defs>\n      <rect x=\"30\" y=\"30\" width=\"900\" height=\"480\" rx=\"24\" class=\"svg-bg\" />\n      <text x=\"480\" y=\"70\" text-anchor=\"middle\" class=\"svg-title\">Redes como fundação da cibersegurança</text>\n      <g class=\"svg-node svg-node--user\"><rect x=\"70\" y=\"130\" width=\"140\" height=\"80\" rx=\"14\"/><text x=\"140\" y=\"162\" text-anchor=\"middle\">Usuário</text><text x=\"140\" y=\"185\" text-anchor=\"middle\">Endpoint</text></g>\n      <g class=\"svg-node svg-node--identity\"><rect x=\"70\" y=\"300\" width=\"140\" height=\"80\" rx=\"14\"/><text x=\"140\" y=\"332\" text-anchor=\"middle\">Identidade</text><text x=\"140\" y=\"355\" text-anchor=\"middle\">MFA / contexto</text></g>\n      <g class=\"svg-node svg-node--control\"><rect x=\"280\" y=\"120\" width=\"150\" height=\"90\" rx=\"14\"/><text x=\"355\" y=\"152\" text-anchor=\"middle\">Controle</text><text x=\"355\" y=\"175\" text-anchor=\"middle\">DNS / Proxy</text><text x=\"355\" y=\"198\" text-anchor=\"middle\">Firewall / WAF</text></g>\n      <g class=\"svg-node svg-node--network\"><rect x=\"500\" y=\"120\" width=\"150\" height=\"90\" rx=\"14\"/><text x=\"575\" y=\"152\" text-anchor=\"middle\">Rede</text><text x=\"575\" y=\"175\" text-anchor=\"middle\">Rotas / NAT</text><text x=\"575\" y=\"198\" text-anchor=\"middle\">Segmentação</text></g>\n      <g class=\"svg-node svg-node--workload\"><rect x=\"720\" y=\"120\" width=\"150\" height=\"90\" rx=\"14\"/><text x=\"795\" y=\"152\" text-anchor=\"middle\">Workload</text><text x=\"795\" y=\"175\" text-anchor=\"middle\">App / API</text><text x=\"795\" y=\"198\" text-anchor=\"middle\">Banco</text></g>\n      <g class=\"svg-node svg-node--telemetry\"><rect x=\"280\" y=\"310\" width=\"150\" height=\"90\" rx=\"14\"/><text x=\"355\" y=\"342\" text-anchor=\"middle\">Telemetria</text><text x=\"355\" y=\"365\" text-anchor=\"middle\">Flow / DNS</text><text x=\"355\" y=\"388\" text-anchor=\"middle\">Proxy / EDR</text></g>\n      <g class=\"svg-node svg-node--soc\"><rect x=\"500\" y=\"310\" width=\"150\" height=\"90\" rx=\"14\"/><text x=\"575\" y=\"342\" text-anchor=\"middle\">SOC / SIEM</text><text x=\"575\" y=\"365\" text-anchor=\"middle\">Correlação</text><text x=\"575\" y=\"388\" text-anchor=\"middle\">Hunting</text></g>\n      <g class=\"svg-node svg-node--response\"><rect x=\"720\" y=\"310\" width=\"150\" height=\"90\" rx=\"14\"/><text x=\"795\" y=\"342\" text-anchor=\"middle\">Resposta</text><text x=\"795\" y=\"365\" text-anchor=\"middle\">Conter</text><text x=\"795\" y=\"388\" text-anchor=\"middle\">Recuperar</text></g>\n      <path d=\"M210 170 H280\" class=\"svg-link\" marker-end=\"url(#arrow1601)\"/>\n      <path d=\"M430 170 H500\" class=\"svg-link\" marker-end=\"url(#arrow1601)\"/>\n      <path d=\"M650 170 H720\" class=\"svg-link\" marker-end=\"url(#arrow1601)\"/>\n      <path d=\"M210 340 H280\" class=\"svg-link\" marker-end=\"url(#arrow1601)\"/>\n      <path d=\"M430 355 H500\" class=\"svg-link\" marker-end=\"url(#arrow1601)\"/>\n      <path d=\"M650 355 H720\" class=\"svg-link\" marker-end=\"url(#arrow1601)\"/>\n      <path d=\"M575 210 V310\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1601)\"/>\n      <path d=\"M795 210 V310\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1601)\"/>\n      <text x=\"480\" y=\"455\" text-anchor=\"middle\" class=\"svg-caption\">Fluxo + identidade + política + telemetria = defesa investigável</text>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios treinam a habilidade de enxergar segurança por meio de fluxos. Para cada cenário, não responda apenas “bloquear” ou “liberar”. Explique origem, destino, protocolo, porta, identidade, risco, controle, log esperado e possível impacto operacional.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio desta aula é criar uma matriz defensiva para uma aplicação corporativa crítica. A matriz deve mostrar superfície exposta, fluxos esperados, fluxos proibidos, telemetria mínima, controles de contenção e relação com resposta a incidente.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada prioriza raciocínio defensivo. Uma boa resposta não lista ferramentas aleatórias; ela explica por que cada controle existe, qual problema resolve, qual evidência gera e qual risco residual permanece.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Redes são a fundação da cibersegurança porque incidentes, acessos, integrações e operações se manifestam como comunicação. Quem entende DNS, IP, rotas, portas, TLS, proxies, firewalls, NAT, VPN, cloud networking e logs consegue proteger melhor, investigar melhor e responder com menos improviso.</p>\n  <p>A aula mostrou que rede não é apenas infraestrutura. Rede é superfície de ataque, mecanismo de controle, fonte de telemetria, limite de segmentação, ferramenta de contenção e base de RCA. O restante do Módulo 16 aprofunda essa visão com escopo ético, reconhecimento autorizado, validação defensiva, MITM, movimento lateral, C2, exfiltração, hunting e DFIR de rede.</p>\n\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Transformar arquitetura de rede em mapa defensivo: quais fluxos deveriam existir, quais evidências confirmam esses fluxos e quais controles reduzem superfície. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, você estudará <strong>16.2 — Escopo, ética, legalidade e regras de engajamento</strong>. Antes de falar em reconhecimento, varredura ou validação de controles, é essencial entender autorização, limites, documentação, ambiente de laboratório, impacto e responsabilidade profissional.</p>\n  <div class=\"callout callout--warning\"><strong>Preparação:</strong> revise o Módulo 13 sobre Segurança de Redes e o Módulo 15 sobre troubleshooting. O Módulo 16 exige maturidade técnica e responsabilidade ética.</div>\n\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 5/6",
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
      "Módulo 15 Troubleshooting de Redes"
    ],
    "connectsTo": [
      "Curso Enterprise Identity e IAM",
      "Curso Infraestrutura, Platform Engineering e DevSecOps",
      "Módulo 16 aulas 16.2 a 16.12"
    ]
  },
  "exercises": [
    {
      "title": "Fluxo esperado versus suspeito",
      "prompt": "Uma estação de trabalho inicia conexões periódicas para domínio externo desconhecido. Liste cinco evidências antes de concluir se é incidente.",
      "difficulty": "intermediário",
      "expectedAnswer": "DNS, proxy, flow log, processo no EDR, reputação/contexto do domínio, baseline do host e comparação com outros hosts."
    },
    {
      "title": "Rede plana",
      "prompt": "Explique por que uma rede onde qualquer estação acessa qualquer servidor aumenta o impacto de comprometimento.",
      "difficulty": "intermediário",
      "expectedAnswer": "Facilita movimento lateral, descoberta de serviços, abuso de credenciais e propagação; segmentação limita alcance e melhora detecção."
    },
    {
      "title": "Cloud e exposição",
      "prompt": "Uma API foi publicada com security group aberto para internet. Quais controles e logs você exigiria?",
      "difficulty": "intermediário-avançado",
      "expectedAnswer": "Justificativa, WAF/LB, TLS, autenticação, rate limit, SG mínimo, logs de WAF/LB/flow/auditoria, dono, teste e revisão."
    },
    {
      "title": "DevSecOps",
      "prompt": "Proponha três guardrails de pipeline para evitar exposição indevida de rede.",
      "difficulty": "avançado",
      "expectedAnswer": "Bloquear portas administrativas públicas, exigir flow logs/tags, proibir subnets privadas com rota direta indevida, exigir revisão para 0.0.0.0/0 e validar private endpoints."
    },
    {
      "id": "ex16.1.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “Matriz defensiva de fluxos e telemetria” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como Firewall allow/deny, Flow logs de VPC/VNet, DNS logs, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.1.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Testar exploração: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Tentar burlar controles: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Coletar dados sensíveis sem necessidade: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.1.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — matriz de fluxos e telemetria mínima”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "Acesso direto usuário→banco foi negado corretamente; egress app→internet precisa de dono, proxy/allowlist e justificativa. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Por que redes são fundação da cibersegurança?",
      "options": [
        "Porque todo controle de segurança substitui identidade",
        "Porque quase todo acesso, ataque, integração e investigação envolve comunicação observável",
        "Porque roteadores eliminam vulnerabilidades de aplicação",
        "Porque DNS impede todos os incidentes"
      ],
      "correctAnswer": 1,
      "explanation": "A rede mostra caminhos, fluxos, nomes, portas, políticas e evidências usados para proteger e investigar."
    },
    {
      "question": "Qual é o risco principal de rede plana?",
      "options": [
        "Aumentar latência de DNS",
        "Facilitar movimento lateral e ampliar impacto de comprometimento",
        "Impedir DHCP",
        "Eliminar logs de proxy"
      ],
      "correctAnswer": 1,
      "explanation": "Sem segmentação, um comprometimento pode alcançar muitos ativos sem barreiras proporcionais."
    },
    {
      "question": "Qual conjunto representa boa telemetria de rede para investigação?",
      "options": [
        "Apenas print do usuário",
        "DNS logs, proxy logs, flow logs, firewall logs, auditoria e EDR quando aplicável",
        "Somente ping",
        "Somente throughput do switch"
      ],
      "correctAnswer": 1,
      "explanation": "Investigação madura correlaciona múltiplas fontes com contexto temporal e técnico."
    },
    {
      "question": "O que é superfície de ataque em redes?",
      "options": [
        "Apenas quantidade de switches",
        "Conjunto de serviços, portas, nomes, rotas e endpoints alcançáveis por potenciais origens",
        "A velocidade do link WAN",
        "A cor da VLAN no diagrama"
      ],
      "correctAnswer": 1,
      "explanation": "Superfície envolve aquilo que pode ser alcançado e potencialmente abusado."
    },
    {
      "question": "Qual atitude é mais segura durante investigação?",
      "options": [
        "Desabilitar todos os controles para testar rápido",
        "Coletar evidências, conter com menor privilégio e preservar logs",
        "Apagar logs para reduzir ruído",
        "Liberar any-any temporariamente sem prazo"
      ],
      "correctAnswer": 1,
      "explanation": "Resposta defensiva precisa reduzir impacto sem destruir evidências nem ampliar risco."
    },
    {
      "question": "Como DevSecOps ajuda segurança de rede?",
      "options": [
        "Transformando guardrails de rede em validações automatizadas e IaC seguro",
        "Removendo a necessidade de logs",
        "Permitindo toda porta por padrão",
        "Substituindo segmentação por documentação"
      ],
      "correctAnswer": 0,
      "explanation": "Pipelines podem prevenir configurações inseguras antes de chegarem à produção."
    }
  ],
  "flashcards": [
    {
      "front": "Superfície de ataque",
      "back": "Conjunto de serviços, portas, nomes, rotas, identidades e endpoints que podem ser alcançados e potencialmente explorados."
    },
    {
      "front": "Segmentação",
      "back": "Separação lógica ou física de redes e zonas para limitar acesso, reduzir movimento lateral e melhorar controle."
    },
    {
      "front": "Telemetria de rede",
      "back": "Evidências sobre comunicação: DNS, flow logs, proxy, firewall, WAF, LB, VPN, PCAP e auditoria."
    },
    {
      "front": "Egress control",
      "back": "Controle do tráfego de saída, essencial para reduzir exfiltração, C2, abuso de NAT e custos inesperados."
    },
    {
      "front": "Zero Trust",
      "back": "Modelo que evita confiança implícita baseada em localização de rede e avalia acesso por identidade, dispositivo, contexto e política."
    },
    {
      "front": "Fluxo esperado",
      "back": "Comunicação documentada com origem, destino, porta, protocolo, dono, justificativa, controle e log."
    }
  ],
  "mentorQuestions": [
    "Você consegue descrever um incidente de segurança como fluxo de rede antes de falar em ferramenta?",
    "Quais comunicações no seu ambiente são permitidas apenas porque ninguém sabe se pode bloquear?",
    "Se um host for comprometido hoje, quais logs provariam para onde ele tentou se comunicar?"
  ],
  "challenge": {
    "title": "Criar matriz de segurança baseada em fluxos para uma aplicação crítica",
    "scenario": "Uma aplicação corporativa é acessada por usuários internos, usuários remotos, uma API parceira e um pipeline de CI/CD. Ela usa banco privado, DNS split-horizon, WAF, Load Balancer, proxy de saída e logs no SIEM. A diretoria quer saber se a arquitetura reduz movimento lateral e permite investigação de incidentes.",
    "tasks": [
      "Listar ativos, zonas e donos.",
      "Mapear fluxos esperados com origem, destino, protocolo, porta e justificativa.",
      "Identificar fluxos proibidos e riscos residuais.",
      "Definir controles preventivos por fluxo.",
      "Definir telemetria mínima por fluxo.",
      "Criar três hipóteses defensivas: C2, movimento lateral e exfiltração.",
      "Propor contenção segura para cada hipótese.",
      "Criar checklist de revisão mensal."
    ],
    "successCriteria": [
      "Cada fluxo tem dono e justificativa.",
      "Nenhuma regra ampla fica sem prazo e aprovação.",
      "A matriz inclui logs suficientes para investigação.",
      "A resposta diferencia contenção, erradicação e recuperação.",
      "A solução evita ações ofensivas e respeita escopo defensivo."
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
    "summary": "Uma solução madura começa pelo fluxo de negócio e depois adiciona segurança. Usuários devem chegar ao WAF/LB por HTTPS; aplicação deve acessar banco por caminho privado; pipeline deve ter acesso mínimo e auditado; egress deve passar por controle; logs críticos devem ir ao SIEM.",
    "steps": [
      "Criar inventário de usuários, aplicações, APIs, banco, pipeline e zonas.",
      "Separar tráfego norte-sul, leste-oeste e saída para internet.",
      "Aplicar WAF e TLS na borda, mas manter autenticação e autorização na aplicação.",
      "Usar segmentação para impedir que usuário final alcance banco diretamente.",
      "Controlar egress de servidores e workloads com proxy, firewall ou políticas cloud.",
      "Ativar DNS logs, proxy logs, firewall logs, WAF/LB logs, flow logs, auditoria e EDR.",
      "Definir detecções para domínio suspeito, volume incomum, destino novo e violação de segmentação.",
      "Documentar contenção com ações reversíveis: bloquear domínio, isolar host, revogar credencial, restringir regra específica e preservar evidências.",
      "Confirmar escopo autorizado e critérios de parada.",
      "Selecionar telemetria mínima e proteger evidências.",
      "Gerar hipóteses defensivas e falsos positivos esperados.",
      "Escolher mitigação proporcional, reversível e comunicada.",
      "Registrar debrief com achados, lacunas e melhorias permanentes."
    ],
    "commonMistakes": [
      "Confundir tráfego privado com tráfego seguro.",
      "Depender só de firewall de borda.",
      "Não registrar DNS e egress.",
      "Criar regra any-any para facilitar troubleshooting.",
      "Não associar fluxo a dono de negócio."
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
      "term": "Superfície de ataque",
      "shortDefinition": "Tudo que pode ser alcançado e potencialmente abusado.",
      "longDefinition": "Conjunto de serviços, portas, nomes, IPs, APIs, rotas, identidades e integrações expostas a usuários, sistemas ou terceiros.",
      "example": "API pública com DNS, IP, porta 443, WAF e autenticação.",
      "relatedTerms": [
        "exposição",
        "inventário",
        "risco"
      ],
      "relatedLessons": [
        "16.1",
        "16.3"
      ]
    },
    {
      "term": "Movimento lateral",
      "shortDefinition": "Deslocamento entre ativos após acesso inicial.",
      "longDefinition": "Tentativa de alcançar outros hosts, serviços ou credenciais dentro do ambiente, frequentemente limitada por segmentação e monitorada por telemetria.",
      "example": "Estação comprometida tentando acessar compartilhamentos e servidores internos.",
      "relatedTerms": [
        "segmentação",
        "leste-oeste"
      ],
      "relatedLessons": [
        "16.7"
      ]
    },
    {
      "term": "Telemetria",
      "shortDefinition": "Dados observáveis para operação e segurança.",
      "longDefinition": "Logs, métricas, eventos e rastros que permitem detectar, investigar e responder a comportamentos técnicos.",
      "example": "DNS logs, flow logs, proxy logs e eventos de EDR enviados ao SIEM.",
      "relatedTerms": [
        "SIEM",
        "logs",
        "baseline"
      ],
      "relatedLessons": [
        "15.2",
        "16.10"
      ]
    },
    {
      "term": "Egress control",
      "shortDefinition": "Controle do tráfego de saída.",
      "longDefinition": "Políticas e mecanismos que restringem, observam e governam conexões iniciadas por hosts ou workloads para destinos externos.",
      "example": "Servidor só pode sair para repositório aprovado via proxy autenticado.",
      "relatedTerms": [
        "proxy",
        "exfiltração",
        "NAT"
      ],
      "relatedLessons": [
        "14.4",
        "16.9"
      ]
    },
    {
      "term": "Zero Trust",
      "shortDefinition": "Modelo sem confiança implícita por localização.",
      "longDefinition": "Arquitetura que avalia continuamente acesso com base em identidade, dispositivo, contexto, política e recurso, evitando assumir que rede interna é confiável.",
      "example": "Usuário na VPN ainda precisa MFA, device compliance e autorização por aplicação.",
      "relatedTerms": [
        "IAM",
        "menor privilégio",
        "contexto"
      ],
      "relatedLessons": [
        "13.8",
        "16.1"
      ]
    },
    {
      "term": "Fluxo esperado",
      "shortDefinition": "Comunicação documentada e autorizada.",
      "longDefinition": "Relação origem-destino-protocolo-porta-identidade-dono-justificativa que define o comportamento normal permitido.",
      "example": "Aplicação web acessa banco privado na porta 5432 usando identidade de serviço específica.",
      "relatedTerms": [
        "matriz de fluxos",
        "baseline"
      ],
      "relatedLessons": [
        "13.10",
        "16.1"
      ]
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
        "16.1",
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
        "16.1",
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
        "16.1",
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
        "16.1",
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
      "type": "official-doc",
      "title": "The NIST Cybersecurity Framework 2.0",
      "organization": "NIST",
      "url": "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf",
      "note": "Base para funções Govern, Identify, Protect, Detect, Respond e Recover."
    },
    {
      "type": "official-doc",
      "title": "NIST SP 800-207: Zero Trust Architecture",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
      "note": "Referência conceitual para evitar confiança implícita baseada apenas em rede."
    },
    {
      "type": "framework",
      "title": "Network Traffic Flow, Data Component DC0078",
      "organization": "MITRE ATT&CK",
      "url": "https://attack.mitre.org/datacomponents/DC0078/",
      "note": "Define metadados de fluxo úteis para análise de tráfego, anomalias e monitoramento."
    },
    {
      "type": "official-doc",
      "title": "CISA Zero Trust Maturity Model",
      "organization": "CISA",
      "url": "https://www.cisa.gov/zero-trust-maturity-model",
      "note": "Modelo de maturidade que conecta identidade, dispositivo, rede, aplicação, dados e visibilidade."
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
        "name": "Risco Blue Team específico — Redes como fundação da cibersegurança",
        "description": "Em Redes como fundação da cibersegurança, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
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
      "Firewall allow/deny",
      "Flow logs de VPC/VNet",
      "DNS logs",
      "Proxy/WAF/LB logs",
      "IAM e VPN/ZTNA logs",
      "EDR metadata"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.1.",
      "Fluxo fora da matriz aprovada — sinal: Conexão entre zonas sem regra documentada; ideia de consulta: src_zone != dst_zone AND flow NOT IN matriz_aprovada; falso positivo comum: Aplicações novas não documentadas.",
      "Egress direto inesperado — sinal: Workload privado acessando internet sem proxy/NAT controlado; ideia de consulta: dst_public=true AND src_zone=private AND proxy_seen=false; falso positivo comum: Atualizações legítimas de SO.",
      "Acesso administrativo anômalo — sinal: Portas de administração partindo de rede de usuário; ideia de consulta: dst_port IN (22,3389,5985,5986) AND src_zone=user; falso positivo comum: Bastion mal classificado."
    ],
    "ethicalLimits": {
      "authorizedScope": "Somente análise de arquitetura, inventário, logs existentes e fluxos documentados. Não executar varredura ativa fora de laboratório explicitamente autorizado.",
      "allowedActions": [
        "Desenhar zonas e fluxos",
        "Revisar regras, rotas e logs existentes",
        "Classificar exposição por criticidade",
        "Propor controles e alertas"
      ],
      "prohibitedActions": [
        "Testar exploração",
        "Tentar burlar controles",
        "Coletar dados sensíveis sem necessidade",
        "Alterar regras em produção sem mudança aprovada"
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
      "Falha ou comportamento inesperado relacionado a Redes como fundação da cibersegurança.",
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
      "Qual evidência comprova o entendimento da aula 16.1?"
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
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "16.2"
    ]
  },
  "blueTeamEnhancement": {
    "title": "Matriz defensiva de fluxos e telemetria",
    "defensiveGoal": "Transformar arquitetura de rede em mapa defensivo: quais fluxos deveriam existir, quais evidências confirmam esses fluxos e quais controles reduzem superfície.",
    "authorizedScope": "Somente análise de arquitetura, inventário, logs existentes e fluxos documentados. Não executar varredura ativa fora de laboratório explicitamente autorizado.",
    "allowedActions": [
      "Desenhar zonas e fluxos",
      "Revisar regras, rotas e logs existentes",
      "Classificar exposição por criticidade",
      "Propor controles e alertas"
    ],
    "prohibitedActions": [
      "Testar exploração",
      "Tentar burlar controles",
      "Coletar dados sensíveis sem necessidade",
      "Alterar regras em produção sem mudança aprovada"
    ],
    "telemetrySources": [
      "Firewall allow/deny",
      "Flow logs de VPC/VNet",
      "DNS logs",
      "Proxy/WAF/LB logs",
      "IAM e VPN/ZTNA logs",
      "EDR metadata"
    ],
    "detectionEngineering": [
      {
        "name": "Fluxo fora da matriz aprovada",
        "signal": "Conexão entre zonas sem regra documentada",
        "queryIdea": "src_zone != dst_zone AND flow NOT IN matriz_aprovada",
        "commonFalsePositive": "Aplicações novas não documentadas",
        "response": "Abrir ticket de validação, confirmar dono e bloquear somente se houver risco ou ausência de justificativa."
      },
      {
        "name": "Egress direto inesperado",
        "signal": "Workload privado acessando internet sem proxy/NAT controlado",
        "queryIdea": "dst_public=true AND src_zone=private AND proxy_seen=false",
        "commonFalsePositive": "Atualizações legítimas de SO",
        "response": "Validar necessidade, mover para proxy/egress controlado e registrar exceção temporária."
      },
      {
        "name": "Acesso administrativo anômalo",
        "signal": "Portas de administração partindo de rede de usuário",
        "queryIdea": "dst_port IN (22,3389,5985,5986) AND src_zone=user",
        "commonFalsePositive": "Bastion mal classificado",
        "response": "Confirmar origem; se indevido, isolar regra e exigir bastion/MFA."
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
      "Bloquear fluxo específico, não rede inteira",
      "Reduzir regra para origem/destino/porta necessários",
      "Migrar egress para proxy controlado",
      "Habilitar logging antes de mudanças amplas",
      "Criar exceção com expiração e dono"
    ],
    "evidencePackage": [
      "Matriz de fluxos",
      "Diagrama de zonas",
      "Export de regras",
      "Amostras de flow logs",
      "Lista de exceções",
      "Registro de decisões e riscos"
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
    "title": "Dataset sintético — matriz de fluxos e telemetria mínima",
    "theme": "matriz defensiva de fluxos",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "timestamp,src_zone,src_ip,dst_zone,dst_ip,dst_port,protocol,action,bytes_out,log_source,expected",
      "2026-07-01T09:00:11Z,user,10.10.20.44,app,10.30.10.25,443,tcp,allow,18420,firewall,true",
      "2026-07-01T09:02:18Z,app,10.30.10.25,db,10.40.10.8,5432,tcp,allow,4096,flowlog,true",
      "2026-07-01T09:04:03Z,user,10.10.20.44,db,10.40.10.8,5432,tcp,deny,0,firewall,false",
      "2026-07-01T09:05:50Z,app,10.30.10.25,internet,198.51.100.80,443,tcp,allow,32000,proxy,requires-review"
    ],
    "analysisPrompt": "Compare cada linha com a matriz de fluxos esperada. Classifique como esperado, bloqueado corretamente ou exceção que exige dono, justificativa e prazo.",
    "detectionIdea": "flow.action=allow AND flow.expected=false OR flow.expected=requires-review",
    "expectedFinding": "Acesso direto usuário→banco foi negado corretamente; egress app→internet precisa de dono, proxy/allowlist e justificativa.",
    "evidenceToCollect": [
      "Matriz de fluxos aprovada",
      "Linhas sintéticas classificadas",
      "Lista de exceções com dono",
      "Proposta de detecção de fluxo fora da matriz"
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
