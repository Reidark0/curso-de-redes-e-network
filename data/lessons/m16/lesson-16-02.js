export const lesson1602 = {
  "id": "16.2",
  "moduleId": "m16",
  "order": 2,
  "title": "Escopo, ética, legalidade e regras de engajamento",
  "subtitle": "Como atuar em segurança de redes sem ultrapassar autorização, sem ferir privacidade, sem prejudicar disponibilidade e sem transformar validação defensiva em risco jurídico ou operacional.",
  "duration": "230-340 min",
  "estimatedStudyTimeMinutes": 340,
  "difficulty": "intermediário-avançado",
  "type": "governança",
  "xp": 340,
  "tags": [
    "ética",
    "legalidade",
    "escopo",
    "regras de engajamento",
    "autorização",
    "ROE",
    "privacidade",
    "LGPD",
    "Marco Civil",
    "NIST SP 800-115",
    "segurança defensiva",
    "risco operacional",
    "evidências",
    "relatório",
    "compliance",
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
      "lesson": "16.1",
      "reason": "A aula anterior mostrou por que redes sustentam segurança; esta define os limites responsáveis para qualquer validação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.12",
      "reason": "War room, RCA e evidências ajudam a documentar ações autorizadas e impacto operacional."
    },
    {
      "type": "course",
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "governança de acesso",
      "lesson": "revisão recomendada",
      "reason": "Escopo de segurança depende de dono, aprovação, identidade, papel e responsabilidade."
    }
  ],
  "objectives": [
    "Diferenciar estudo, laboratório, validação autorizada, auditoria, varredura, pentest e atividade não autorizada.",
    "Explicar por que escopo, autorização escrita e regras de engajamento são controles de segurança, não burocracia.",
    "Construir um documento de ROE com objetivos, ativos permitidos, janelas, limites técnicos, contatos e plano de parada.",
    "Relacionar privacidade, minimização de dados, evidências e retenção com investigações de rede.",
    "Identificar riscos operacionais de testes mal planejados: indisponibilidade, alarme falso, vazamento de dados e impacto financeiro.",
    "Preparar o aluno para as próximas aulas do módulo com postura defensiva, ética e juridicamente responsável."
  ],
  "learningOutcomes": [
    "Dado um pedido de varredura, o aluno valida se existe autorização, escopo e janela antes de qualquer ação.",
    "Dado um ambiente corporativo, o aluno separa ativos permitidos, proibidos, condicionais e fora de escopo.",
    "Dado um teste defensivo, o aluno define limites de intensidade, horários, contatos e critérios de interrupção.",
    "Dado um log com dados pessoais, o aluno aplica princípios de minimização, proteção, necessidade e retenção adequada.",
    "Dado um relatório técnico, o aluno evita linguagem sensacionalista e documenta evidências, risco e recomendação proporcional.",
    "Dado um cenário ambíguo, o aluno escolhe parar e escalar em vez de improvisar fora do combinado."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Segurança da Informação não é uma licença para “mexer em tudo”. Quanto mais você aprende redes, protocolos, DNS, portas, scanners, logs, proxies, VPN, cloud e análise de pacotes, maior fica sua capacidade de causar impacto real em sistemas. Esse impacto pode ser positivo quando existe autorização, escopo, método e cuidado. Mas pode ser danoso quando há curiosidade sem limite, teste sem comunicação, coleta excessiva de dados ou alteração em ambiente produtivo sem aprovação.</p>\n  <p>Esta aula existe para colocar uma fundação ética e operacional antes das próximas aulas do módulo. Você aprenderá reconhecimento autorizado, varredura defensiva, análise de indicadores, MITM como risco defensivo, movimento lateral como hipótese de detecção, C2 como comportamento a identificar e exfiltração como anomalia. Todos esses temas exigem uma linha clara: <strong>o objetivo é defender, validar controles e investigar com autorização</strong>, nunca invadir, burlar regras ou explorar sistemas fora de escopo.</p>\n  <div class=\"callout callout--warning\"><strong>Regra de ouro:</strong> se você não consegue apontar quem autorizou, quais ativos estão no escopo, qual janela foi aprovada, quais técnicas são permitidas e quando parar, você ainda não deve executar a atividade.</div>\n  <p>Profissionais maduros de segurança não são definidos apenas pelo que sabem fazer tecnicamente. Eles são definidos pela capacidade de operar com responsabilidade, evidência, comunicação, respeito à privacidade e alinhamento com risco de negócio.</p>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n\n  <p>Nos primeiros anos da segurança técnica, era comum existir uma cultura informal de “testar para ver”. Ambientes eram menores, dependências eram menos distribuídas e muitas empresas não possuíam processos claros para avaliação de segurança. Com o crescimento da internet, da computação em nuvem, dos sistemas críticos e das leis de proteção de dados, essa informalidade deixou de ser aceitável.</p>\n  <p>O mercado evoluiu para modelos mais formais: auditorias, assessments, testes de intrusão, programas de bug bounty, red team, purple team, blue team, tabletop exercises, avaliações de arquitetura e validações contínuas. Essa evolução trouxe documentos essenciais: autorização formal, escopo, regras de engajamento, plano de comunicação, plano de rollback, matriz de riscos e relatório final.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Teste informal:</strong> ações técnicas executadas com pouca documentação e alto risco de mal-entendido.</div><div class=\"timeline-item\"><strong>Assessment estruturado:</strong> objetivos, escopo, métodos e evidências passam a ser documentados.</div><div class=\"timeline-item\"><strong>Pentest profissional:</strong> autorização, ROE, janela, contatos, limites e relatório viram parte central do trabalho.</div><div class=\"timeline-item\"><strong>Cloud e DevSecOps:</strong> validações passam a acontecer em pipelines, IaC, contas, subscriptions, clusters e APIs.</div><div class=\"timeline-item\"><strong>Governança moderna:</strong> segurança precisa respeitar privacidade, disponibilidade, compliance, rastreabilidade e risco operacional.</div></div>\n  <p>O NIST SP 800-115 consolidou uma abordagem de planejamento, execução, análise e relatório para testes e avaliações de segurança. O ponto mais importante para esta aula é que teste profissional não começa com ferramenta: começa com planejamento, autorização, escopo e critérios de condução.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema central é que a mesma ação técnica pode ser legítima ou indevida dependendo do contexto. Consultar DNS de um domínio público pode ser normal em estudo. Fazer varredura agressiva em rede de terceiros sem autorização pode ser abuso. Capturar pacotes no seu laboratório é aprendizagem. Capturar tráfego de usuários reais sem base, consentimento ou autorização pode violar privacidade e política interna. Testar um firewall autorizado em janela controlada é validação defensiva. Tentar contornar controles fora de escopo é conduta inaceitável.</p>\n  <p>Em segurança de redes, os riscos aparecem em quatro dimensões:</p>\n  <ul>\n    <li><strong>Risco jurídico:</strong> executar ações sem autorização, acessar dados indevidos ou ultrapassar limites legais e contratuais;</li>\n    <li><strong>Risco ético:</strong> abusar de confiança, coletar mais do que o necessário ou expor pessoas e organizações;</li>\n    <li><strong>Risco operacional:</strong> derrubar serviço, gerar falso positivo em massa, saturar link, travar appliance ou afetar produção;</li>\n    <li><strong>Risco de segurança:</strong> deixar artefatos, credenciais, PCAPs, relatórios ou logs sensíveis mal protegidos.</li>\n  </ul>\n  <div class=\"callout callout--danger\"><strong>Alerta:</strong> “eu só estava testando” não substitui autorização. Uma atividade tecnicamente simples pode ser considerada indevida se atingir sistemas, dados ou redes fora do combinado.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A evolução profissional é sair do impulso técnico e chegar ao método governado. O aluno iniciante pergunta “qual ferramenta uso?”. O profissional pergunta: “qual objetivo de negócio estamos validando?”, “qual controle será testado?”, “qual evidência será coletada?”, “qual impacto máximo aceitável?”, “quem aprovou?”, “quem será avisado?”, “como parar?”, “como proteger os dados coletados?” e “como transformar achados em melhoria?”.</p>\n  <p>O NIST CSF 2.0 inclui a função Govern justamente para explicitar que cibersegurança depende de contexto organizacional, responsabilidades, políticas, supervisão e gestão de risco. Isso muda a forma de aprender segurança: técnica sem governança pode virar risco; governança sem técnica vira burocracia vazia. A maturidade está na união das duas.</p>\n  <p>Em ambientes modernos, escopo também evoluiu. Ele não é apenas uma lista de IPs. Pode incluir contas cloud, subscriptions, projetos, VPCs/VNets, clusters Kubernetes, repositórios, runners, domínios, zonas DNS, APIs, SaaS, usuários de teste, identidades de serviço, horários, intensidade, técnicas permitidas e técnicas proibidas.</p>\n  <div class=\"callout callout--info\"><strong>Modelo mental:</strong> escopo é o “contrato técnico” entre segurança, negócio, operação, jurídico, privacidade e times responsáveis pelos sistemas.</div>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>Escopo</strong> é a fronteira autorizada da atividade. Ele define o que pode ser avaliado, quando, por quem, com quais métodos, em qual intensidade, com quais dados e sob quais critérios de interrupção. <strong>Ética</strong> é o compromisso de agir com responsabilidade mesmo quando algo seria tecnicamente possível. <strong>Legalidade</strong> é a aderência a leis, contratos, políticas internas, termos de uso e obrigações regulatórias. <strong>Regras de engajamento</strong>, ou ROE, são as instruções operacionais que transformam autorização em execução controlada.</p>\n  <p>Uma ROE madura normalmente responde:</p>\n  <ul>\n    <li>Qual é o objetivo da atividade?</li>\n    <li>Quais ativos, redes, domínios, contas, ambientes e identidades estão permitidos?</li>\n    <li>O que está explicitamente proibido?</li>\n    <li>Qual janela de execução e qual fuso horário?</li>\n    <li>Quais técnicas são permitidas, condicionais ou proibidas?</li>\n    <li>Qual intensidade máxima de tráfego, conexões ou requisições?</li>\n    <li>Quem são os contatos de emergência?</li>\n    <li>Quais eventos exigem parada imediata?</li>\n    <li>Como evidências serão coletadas, protegidas, compartilhadas e descartadas?</li>\n    <li>Como achados serão classificados, validados e reportados?</li>\n  </ul>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Na prática, uma atividade autorizada funciona como um pequeno sistema operacional de governança. Primeiro existe uma demanda: validar segmentação, revisar exposição, verificar superfície, testar detecção, confirmar hardening ou investigar incidente. Depois vem o planejamento: escopo, stakeholders, riscos, janela, métodos e evidências. Em seguida ocorre aprovação formal. Só então a execução acontece.</p>\n  <p>Durante a execução, cada ação deve ser rastreável. Isso significa registrar horário, origem, destino, comando ou método geral, objetivo, resultado, evidência e impacto percebido. Em atividades sensíveis, também é comum usar contas de teste, IPs de origem conhecidos, change ticket, bridge de comunicação, janela aprovada e aviso prévio ao SOC para evitar confusão entre teste autorizado e ataque real.</p>\n  <p>A coleta de evidências precisa seguir necessidade e minimização. Um PCAP pode conter dados sensíveis. Um print pode expor usuário. Um log pode conter IP, identificador, token parcial, e-mail, hostname ou caminho interno. Por isso, evidência deve ser protegida, ter acesso restrito, retenção definida e sanitização quando necessário.</p>\n  <div class=\"callout callout--warning\"><strong>Funcionamento correto:</strong> planejar → aprovar → comunicar → executar dentro do escopo → monitorar impacto → preservar evidências → reportar → corrigir → revisar lições aprendidas.</div>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>A arquitetura de uma validação ética e autorizada possui componentes parecidos com uma arquitetura técnica. Há uma origem controlada, ativos de destino autorizados, controles intermediários, fontes de evidência, responsáveis e um canal de governança.</p>\n  <p>Imagine uma validação de segmentação em rede corporativa. A origem pode ser uma VM de teste em uma subnet controlada. O destino pode ser uma lista de servidores homologados. Os controles podem incluir firewall, ACL, NSG, proxy e SIEM. A autorização fica em um change ticket. Os contatos incluem dono da aplicação, rede, SOC, segurança, cloud e gestão de mudança. O plano de parada define que qualquer degradação de serviço, alerta crítico inesperado ou tráfego fora do escopo interrompe a atividade.</p>\n  <p>Essa arquitetura evita a armadilha de transformar segurança em improviso. Ela também facilita auditoria: se alguém perguntar por que houve tráfego entre origem e destino, a equipe consegue mostrar escopo, janela, ticket, objetivo, evidência e resultado.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Pense em um eletricista chamado para testar a instalação de um hospital. Ele não chega abrindo todos os quadros, desligando disjuntores aleatórios e “vendo o que acontece”. Ele recebe autorização, identifica áreas críticas, entende quais circuitos não podem cair, combina horário, usa equipamentos apropriados, registra medições e chama responsáveis se encontrar risco.</p>\n  <p>Segurança de redes é parecida. A rede pode sustentar atendimento médico, pagamento, operação bancária, logística, autenticação, emergência, produção industrial e comunicação de usuários. Mesmo uma ação simples pode afetar disponibilidade, confidencialidade ou integridade.</p>\n  <div class=\"callout callout--info\"><strong>Analogia prática:</strong> um teste sem escopo é como manutenção elétrica sem mapa, sem autorização e sem avisar ninguém. Talvez funcione. Talvez apague a sala errada.</div>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Você quer aprender varredura de portas. O caminho correto é criar um laboratório local com duas máquinas virtuais ou containers próprios. Uma máquina simula cliente, outra simula servidor. Você documenta IPs privados, serviços intencionalmente expostos e objetivo do estudo. O escopo é seu laboratório. A autorização vem de você como dono do ambiente. O risco é controlado porque não há terceiros, produção ou dados pessoais reais.</p>\n  <p>Nesse cenário, é aceitável observar como um serviço aberto, fechado ou filtrado se comporta, desde que a atividade fique no laboratório. O erro seria apontar a mesma técnica para rede de faculdade, empresa, vizinho, provedor ou site público sem autorização explícita.</p>\n  <p>Mesmo em laboratório, a mentalidade profissional já pode ser treinada: defina objetivo, registre evidências, limite intensidade, salve notas e explique o que cada resultado significa defensivamente.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Uma empresa quer validar se a segmentação impede que estações de trabalho alcancem servidores de banco. A atividade parece simples, mas exige governança. O escopo define subnets de origem, servidores de destino, portas, horário, ferramenta permitida, volume máximo de testes, contatos e critérios de parada. O SOC é avisado para correlacionar eventos sem ignorar possíveis incidentes reais. O time de rede acompanha logs de firewall. O dono da aplicação confirma se houve impacto.</p>\n  <p>O resultado profissional não é “consegui ou não consegui conectar”. O resultado é uma matriz: origem, destino, porta, política esperada, evidência observada, log correlacionado, risco, recomendação e ação corretiva. Se uma estação alcança banco indevidamente, a correção não deve ser improvisada. Ela entra em mudança controlada, teste de regressão e revisão de exceções.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Em cloud, escopo precisa incluir muito mais do que IP. Uma validação pode envolver conta, subscription, projeto, VPC/VNet, subnet, security group, NSG, NACL, route table, NAT, Private Endpoint, DNS privado, load balancer, WAF, Kubernetes, IAM e logs de auditoria. Um teste aparentemente pequeno pode gerar custo, alerta, bloqueio de conta, indisponibilidade ou exposição de dado.</p>\n  <p>Exemplo: a equipe quer verificar se workloads privados conseguem sair para internet sem passar pelo proxy corporativo. A ROE deve indicar quais workloads serão testados, quais destinos benignos e controlados podem ser acessados, quais horários, quais logs serão observados, como medir custo de NAT/egress e quando parar. A investigação deve evitar payloads, destinos suspeitos, bypass de política ou uso de dados reais desnecessários.</p>\n  <div class=\"callout callout--warning\"><strong>Cloud aumenta responsabilidade:</strong> mudanças e testes são rápidos, mas logs, custos e impacto também escalam rapidamente.</div>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, escopo e ROE aparecem como guardrails automatizados. Um pipeline pode validar que nenhum security group permite administração pública, que subnets privadas não possuem rota direta para internet, que endpoints privados possuem DNS correto e que logs obrigatórios estão ativos. Porém, até testes automatizados precisam de limites.</p>\n  <p>Um teste DAST contra ambiente de homologação, por exemplo, deve ter janela, URL permitida, credenciais de teste, massa de dados sintética, taxa máxima de requisições, cabeçalho identificador, exclusões, plano de parada e responsável. O mesmo vale para validações de rede feitas por runners. Runners com acesso privado não devem virar túneis genéricos para produção.</p>\n  <p>Uma boa prática é transformar ROE em configuração versionada: arquivos com targets permitidos, horários, taxa, tags de ambiente e aprovação. Assim, governança deixa de ser documento esquecido e vira parte do fluxo técnico.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Um analista de segurança recebe um alerta de possível comunicação C2. A postura correta não é tentar “contra-atacar” o destino, invadir o servidor externo ou executar ações fora da organização. O escopo defensivo é investigar os ativos próprios: endpoint, DNS, proxy, firewall, EDR, SIEM, identidade, histórico de conexões e comportamento do processo. Se houver necessidade de ação externa, ela passa por jurídico, provedor, CERT, autoridade competente ou canal formal apropriado.</p>\n  <p>Outro exemplo: durante uma investigação interna, um PCAP mostra credenciais ou dados pessoais. O analista deve restringir acesso, sanitizar quando possível, armazenar evidências em local seguro, registrar cadeia de custódia e evitar compartilhar o arquivo bruto desnecessariamente. Segurança não pode usar o pretexto de investigação para violar privacidade além do necessário.</p>\n  <div class=\"callout callout--danger\"><strong>Limite defensivo:</strong> investigar seus próprios ativos e logs autorizados é uma coisa. Acessar, explorar, derrubar ou manipular sistemas de terceiros é outra completamente diferente.</div>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Somente ativos, redes, janelas e técnicas explicitamente descritos nas regras de engajamento. Tudo que não está escrito deve ser tratado como fora de escopo.</p><p><strong>Ações proibidas:</strong> Expandir escopo por conveniência; Testar credenciais reais sem autorização; Executar negação de serviço; Persistência, evasão ou coleta de segredo; Alterar produção sem change.</p><p><strong>Meta defensiva:</strong> Garantir que qualquer validação de segurança tenha autorização, limites, janela, comunicação, critérios de parada, evidências permitidas e proteção contra impacto operacional.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n\n  <p>O diagrama abaixo mostra uma atividade autorizada como fluxo governado. Observe que a execução técnica fica no centro, mas cercada por autorização, escopo, comunicação, evidências, privacidade, critérios de parada e relatório.</p>\n  <div class=\"diagram-container\" aria-label=\"Diagrama de escopo, autorização e regras de engajamento\">\n    <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"title-1602 desc-1602\">\n      <title id=\"title-1602\">Arquitetura de validação autorizada</title>\n      <desc id=\"desc-1602\">Mostra autorização, escopo, origem controlada, ativos permitidos, controles, evidências, parada, relatório e melhoria.</desc>\n      <defs>\n        <marker id=\"arrow1602\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\"></path></marker>\n      </defs>\n      <rect x=\"30\" y=\"30\" width=\"920\" height=\"460\" rx=\"22\" class=\"svg-panel\"></rect>\n      <rect x=\"70\" y=\"70\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--governance\"></rect>\n      <text x=\"165\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Autorização</text>\n      <text x=\"165\" y=\"130\" text-anchor=\"middle\" class=\"svg-small\">ticket, dono, aprovação</text>\n      <rect x=\"300\" y=\"70\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--scope\"></rect>\n      <text x=\"395\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Escopo</text>\n      <text x=\"395\" y=\"130\" text-anchor=\"middle\" class=\"svg-small\">ativos, janela, limites</text>\n      <rect x=\"530\" y=\"70\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--policy\"></rect>\n      <text x=\"625\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">ROE</text>\n      <text x=\"625\" y=\"130\" text-anchor=\"middle\" class=\"svg-small\">métodos e parada</text>\n      <rect x=\"760\" y=\"70\" width=\"150\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--privacy\"></rect>\n      <text x=\"835\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Privacidade</text>\n      <text x=\"835\" y=\"130\" text-anchor=\"middle\" class=\"svg-small\">mínimo necessário</text>\n      <rect x=\"120\" y=\"230\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--source\"></rect>\n      <text x=\"210\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Origem controlada</text>\n      <text x=\"210\" y=\"290\" text-anchor=\"middle\" class=\"svg-small\">IP conhecido, conta teste</text>\n      <rect x=\"400\" y=\"230\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--control\"></rect>\n      <text x=\"490\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Controles</text>\n      <text x=\"490\" y=\"290\" text-anchor=\"middle\" class=\"svg-small\">FW, SIEM, SOC, logs</text>\n      <rect x=\"680\" y=\"230\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--target\"></rect>\n      <text x=\"770\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Ativos permitidos</text>\n      <text x=\"770\" y=\"290\" text-anchor=\"middle\" class=\"svg-small\">somente dentro do escopo</text>\n      <rect x=\"120\" y=\"380\" width=\"180\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--evidence\"></rect>\n      <text x=\"210\" y=\"410\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n      <text x=\"210\" y=\"432\" text-anchor=\"middle\" class=\"svg-small\">logs, prints, hashes</text>\n      <rect x=\"400\" y=\"380\" width=\"180\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--stop\"></rect>\n      <text x=\"490\" y=\"410\" text-anchor=\"middle\" class=\"svg-label\">Critério de parada</text>\n      <text x=\"490\" y=\"432\" text-anchor=\"middle\" class=\"svg-small\">impacto, alerta, desvio</text>\n      <rect x=\"680\" y=\"380\" width=\"180\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--report\"></rect>\n      <text x=\"770\" y=\"410\" text-anchor=\"middle\" class=\"svg-label\">Relatório</text>\n      <text x=\"770\" y=\"432\" text-anchor=\"middle\" class=\"svg-small\">risco, correção, lições</text>\n      <path d=\"M260 115 H300\" class=\"svg-link\" marker-end=\"url(#arrow1602)\"></path>\n      <path d=\"M490 115 H530\" class=\"svg-link\" marker-end=\"url(#arrow1602)\"></path>\n      <path d=\"M720 115 H760\" class=\"svg-link\" marker-end=\"url(#arrow1602)\"></path>\n      <path d=\"M300 275 H400\" class=\"svg-link\" marker-end=\"url(#arrow1602)\"></path>\n      <path d=\"M580 275 H680\" class=\"svg-link\" marker-end=\"url(#arrow1602)\"></path>\n      <path d=\"M210 320 V380\" class=\"svg-link\" marker-end=\"url(#arrow1602)\"></path>\n      <path d=\"M490 320 V380\" class=\"svg-link\" marker-end=\"url(#arrow1602)\"></path>\n      <path d=\"M770 320 V380\" class=\"svg-link\" marker-end=\"url(#arrow1602)\"></path>\n      <path d=\"M770 450 C770 490 165 490 165 160\" class=\"svg-link svg-link--feedback\" marker-end=\"url(#arrow1602)\"></path>\n      <text x=\"490\" y=\"490\" text-anchor=\"middle\" class=\"svg-small\">lições aprendidas realimentam escopo, guardrails e processos</text>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>O laboratório desta aula não executa varredura nem atividade ofensiva. Ele ensina a produzir o documento que deve existir antes de qualquer validação técnica: uma ROE completa para uma avaliação defensiva de rede. O foco é pensar como profissional: objetivo, escopo, limites, comunicação, evidência, privacidade e parada.</p>\n  <p>Você criará regras para um cenário corporativo realista com datacenter, cloud, VPN, Wi-Fi, WAF, SIEM e aplicações críticas. O resultado será um artefato reutilizável para as próximas aulas do módulo.</p>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — violações de escopo em validação defensiva</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code>timestamp,actor,src_ip,target,activity,window_status,scope_status,severity\n2026-07-01T10:01:00Z,analyst-a,10.99.1.10,lab-web-01,curl validation,inside,in-scope,ok\n2026-07-01T10:13:21Z,analyst-a,10.99.1.10,prod-db-01,port validation,inside,out-of-scope,critical-stop\n2026-07-01T10:55:44Z,scanner-lab,10.99.1.20,lab-api-02,baseline scan,outside,in-scope,pause\n2026-07-01T11:02:03Z,analyst-b,10.99.1.11,lab-web-02,header review,inside,in-scope,ok</code></pre><p><strong>Tarefa:</strong> Identifique quais atividades devem ser pausadas, quais podem continuar e que comunicação deve ser feita ao sponsor/SOC.</p><p><strong>Ideia de detecção:</strong> <code>activity.scope_status=out-of-scope OR activity.window_status=outside</code></p><p><strong>Achado esperado:</strong> prod-db-01 está fora de escopo e exige parada imediata; baseline scan fora da janela exige pausa e comunicação.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios treinam julgamento. Em segurança, o desafio raramente é apenas saber o comando. O desafio é saber se você pode executar, onde, quando, com qual limite, com qual evidência e com qual consequência.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio é construir uma ROE completa para uma validação defensiva de segmentação e exposição cloud/híbrida. A entrega deve ser clara o suficiente para ser entendida por rede, segurança, cloud, jurídico, privacidade e gestão de mudança.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada mostra que uma boa ROE não autoriza “testar tudo”. Ela reduz ambiguidade, protege pessoas, protege sistemas, preserva evidências e aumenta a chance de a validação gerar melhoria real.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Nesta aula você aprendeu que escopo, ética, legalidade e regras de engajamento são parte técnica da segurança. Sem eles, até ações simples podem virar risco jurídico, operacional e reputacional. Com eles, avaliações defensivas ficam rastreáveis, proporcionais, úteis e seguras.</p>\n  <ul>\n    <li>Autorização deve ser explícita e documentada.</li>\n    <li>Escopo define ativos, horários, métodos, limites e exclusões.</li>\n    <li>ROE transforma autorização em execução operacional controlada.</li>\n    <li>Privacidade exige minimização, proteção e retenção adequada de evidências.</li>\n    <li>Critérios de parada protegem disponibilidade e confiança.</li>\n    <li>Relatórios devem focar risco, evidência e correção, não espetáculo.</li>\n  </ul>\n\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Garantir que qualquer validação de segurança tenha autorização, limites, janela, comunicação, critérios de parada, evidências permitidas e proteção contra impacto operacional. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, entraremos em <strong>16.3 — Reconhecimento autorizado e superfície de ataque</strong>. A diferença agora é que todo reconhecimento será ensinado dentro de um contexto defensivo, com escopo, autorização, limites e objetivo de redução de risco.</p>\n  <div class=\"callout callout--info\"><strong>Antes de continuar:</strong> revise sua ROE do laboratório. Ela será a base ética e operacional para as próximas aulas do módulo.</div>\n\n</section>"
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
      "Módulo 15 Troubleshooting de Redes",
      "Módulo 16 Aula 16.1"
    ],
    "connectsTo": [
      "Governança de Segurança",
      "IAM",
      "SOC",
      "DevSecOps",
      "Cloud Security",
      "Privacidade e Compliance"
    ]
  },
  "lab": {
    "id": "lab-16.2",
    "title": "Laboratório: criar regras de engajamento para validação defensiva de rede",
    "labType": "security",
    "objective": "Produzir uma ROE completa para uma avaliação autorizada de segmentação, exposição e telemetria em ambiente híbrido, sem executar atividade técnica real.",
    "scenario": "Uma empresa quer validar se usuários internos, VPN, workloads cloud e pipelines possuem apenas os acessos de rede necessários. O ambiente inclui datacenter, VPC/VNet, WAF, load balancer, VPN, DNS público e privado, firewall, proxy, Kubernetes, bancos privados, SIEM e dados pessoais em algumas aplicações.",
    "topology": [
      "Datacenter com VLANs de usuários, servidores e gestão",
      "Cloud com VPC/VNet, subnets públicas e privadas",
      "VPN de usuários remotos e link híbrido",
      "WAF, Load Balancer, DNS público e DNS privado",
      "Aplicações web, APIs internas, bancos privados e Kubernetes",
      "Firewall, proxy, flow logs, DNS logs, SIEM e auditoria cloud",
      "Times envolvidos: rede, segurança, SOC, cloud, jurídico, privacidade e donos das aplicações"
    ],
    "architecture": "Processo governado de validação defensiva com autorização formal, ativos permitidos, métodos permitidos, limites técnicos, contatos, critérios de parada, preservação de evidências e relatório de melhoria.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Ambiente Kubernetes local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 340,
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
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Somente ativos, redes, janelas e técnicas explicitamente descritos nas regras de engajamento. Tudo que não está escrito deve ser tratado como fora de escopo.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: Documento de ROE | Lista de alvos autorizados | Janela de execução | Critérios de parada | Plano de comunicação | Registro de exceções",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Definir objetivo e valor de negócio",
        "instruction": "Escreva em uma frase o que a avaliação deve provar: por exemplo, validar se segmentação impede acesso indevido a bancos privados e se logs permitem investigação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Objetivo claro, mensurável e conectado a risco de negócio.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Escopo, ética, legalidade e regras de engajamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Listar ativos permitidos e proibidos",
        "instruction": "Crie quatro listas: ativos em escopo, ativos fora de escopo, ativos condicionais e ativos críticos que exigem aprovação extra.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela com IP/CIDR, DNS, conta cloud, ambiente, dono e criticidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Escopo, ética, legalidade e regras de engajamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Definir janela, timezone e origem controlada",
        "instruction": "Documente dia, horário, timezone, IPs de origem, contas de teste, VPN usada e identificação do tráfego.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Janela operacional com origem rastreável e comunicada ao SOC.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Escopo, ética, legalidade e regras de engajamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Classificar métodos permitidos, condicionais e proibidos",
        "instruction": "Liste métodos defensivos permitidos, limites de taxa, consultas, validações de rota, revisão de configuração e coleta de logs. Liste também proibições explícitas.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "ROE com métodos controlados e exclusões claras.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Escopo, ética, legalidade e regras de engajamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Definir limites de intensidade e impacto",
        "instruction": "Determine taxa máxima de requisições, simultaneidade, ambientes permitidos, limites de tráfego, recursos que não podem ser tocados e critérios de degradação aceitável.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Limites técnicos que reduzem risco de indisponibilidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Escopo, ética, legalidade e regras de engajamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Planejar comunicação e escalonamento",
        "instruction": "Defina canal de comunicação, contatos de emergência, dono técnico, dono de negócio, SOC, rede, cloud, jurídico e privacidade.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela de contatos com papel, canal e horário de disponibilidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Escopo, ética, legalidade e regras de engajamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Definir coleta e proteção de evidências",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem acessa, por quanto tempo e como sanitizar dados sensíveis.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de evidências com minimização e retenção.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Escopo, ética, legalidade e regras de engajamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Criar critérios de parada",
        "instruction": "Defina situações que interrompem imediatamente a atividade: alerta crítico não previsto, degradação, tráfego fora de escopo, dado sensível inesperado, instabilidade ou pedido do dono.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista objetiva de gatilhos de parada e responsável pela decisão.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Escopo, ética, legalidade e regras de engajamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Definir formato de relatório",
        "instruction": "Crie estrutura de relatório com resumo executivo, escopo, metodologia, evidências, achados, risco, impacto, recomendações, exceções e próximos passos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Template de relatório defensivo e rastreável.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Escopo, ética, legalidade e regras de engajamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Revisar e aprovar a ROE",
        "instruction": "Revise o documento com stakeholders e registre aprovação antes de qualquer execução técnica.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "ROE final assinada ou aprovada em ticket/fluxo formal.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Escopo, ética, legalidade e regras de engajamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Atividade fora da janela | Sinal: Eventos de teste antes/depois da janela aprovada | Query: event.actor=tester AND timestamp NOT BETWEEN janela_inicio AND janela_fim | FP: Diferença de fuso horário\nDetecção: Origem não autorizada | Sinal: Validação partindo de IP diferente do registrado | Query: src_ip NOT IN origens_autorizadas AND activity=test_validation | FP: NAT corporativo compartilhado\nDetecção: Técnica não permitida | Sinal: Evento associado a categoria fora do plano | Query: technique NOT IN tecnicas_aprovadas | FP: Ferramenta gerou checagem automática não prevista",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 14,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Parar teste imediatamente | Comunicar ponto focal | Reverter mudança temporária | Marcar evidência como potencialmente sensível | Atualizar ROE antes de retomar",
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
        "instruction": "Identifique quais atividades devem ser pausadas, quais podem continuar e que comunicação deve ser feita ao sponsor/SOC.",
        "artifact": "timestamp,actor,src_ip,target,activity,window_status,scope_status,severity\n2026-07-01T10:01:00Z,analyst-a,10.99.1.10,lab-web-01,curl validation,inside,in-scope,ok\n2026-07-01T10:13:21Z,analyst-a,10.99.1.10,prod-db-01,port validation,inside,out-of-scope,critical-stop\n2026-07-01T10:55:44Z,scanner-lab,10.99.1.20,lab-api-02,baseline scan,outside,in-scope,pause\n2026-07-01T11:02:03Z,analyst-b,10.99.1.11,lab-web-02,header review,inside,in-scope,ok",
        "analysisTask": "Aplicar a ideia de detecção: activity.scope_status=out-of-scope OR activity.window_status=outside",
        "evidence": "ROE validado | Registro de atividade fora de escopo | Ação de parada | Comunicação ao ponto focal",
        "expectedOutput": "prod-db-01 está fora de escopo e exige parada imediata; baseline scan fora da janela exige pausa e comunicação.",
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
    "expectedResult": "Ao final, o aluno terá uma ROE completa para validação defensiva de rede, pronta para guiar reconhecimento autorizado, varredura defensiva, análise de logs e relatório.",
    "validation": [
      {
        "check": "A ROE deve conter objetivo, escopo, fora de escopo, janela, métodos, limites, contatos, parada, evidências, privacidade e relatório.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "A ROE deve conter objetivo, escopo, fora de escopo, janela, métodos, limites, contatos, parada, evidências, privacidade e relatório.",
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
        "symptom": "Se o documento parecer burocrático, revise os riscos: indisponibilidade, dado pessoal, falso positivo, custo cloud, impacto de negócio e ambiguidade jurídica.",
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
      "Transformar ROE em template versionado no repositório de segurança.",
      "Criar formulário padrão de autorização para validações recorrentes.",
      "Integrar IPs de origem e janelas com SIEM para identificação de atividade autorizada.",
      "Criar biblioteca de métodos permitidos por ambiente: laboratório, dev, homologação e produção.",
      "Adicionar revisão de privacidade e classificação de dados antes de coletar evidências sensíveis.",
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
      "Documento de ROE",
      "Lista de alvos autorizados",
      "Janela de execução",
      "Critérios de parada",
      "Plano de comunicação",
      "Registro de exceções",
      "ROE validado",
      "Registro de atividade fora de escopo",
      "Ação de parada",
      "Comunicação ao ponto focal"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Escopo, ética, legalidade e regras de engajamento” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Criar uma ROE para validação defensiva em ambiente híbrido",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Garantir que qualquer validação de segurança tenha autorização, limites, janela, comunicação, critérios de parada, evidências permitidas e proteção contra impacto operacional.",
    "authorizedScope": "Somente ativos, redes, janelas e técnicas explicitamente descritos nas regras de engajamento. Tudo que não está escrito deve ser tratado como fora de escopo.",
    "allowedActions": [
      "Validar inventário autorizado",
      "Confirmar responsáveis",
      "Definir janela e critérios de parada",
      "Registrar evidências não sensíveis",
      "Acionar comunicação acordada"
    ],
    "prohibitedActions": [
      "Expandir escopo por conveniência",
      "Testar credenciais reais sem autorização",
      "Executar negação de serviço",
      "Persistência, evasão ou coleta de segredo",
      "Alterar produção sem change"
    ],
    "telemetrySources": [
      "Chamados de mudança",
      "Aprovação formal",
      "Lista de ativos autorizados",
      "Canal de comunicação",
      "Logs de atividade do laboratório",
      "Registro de evidências",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Atividade fora da janela",
        "signal": "Eventos de teste antes/depois da janela aprovada",
        "queryIdea": "event.actor=tester AND timestamp NOT BETWEEN janela_inicio AND janela_fim",
        "commonFalsePositive": "Diferença de fuso horário",
        "response": "Pausar teste, comunicar sponsor e registrar exceção."
      },
      {
        "name": "Origem não autorizada",
        "signal": "Validação partindo de IP diferente do registrado",
        "queryIdea": "src_ip NOT IN origens_autorizadas AND activity=test_validation",
        "commonFalsePositive": "NAT corporativo compartilhado",
        "response": "Confirmar origem; bloquear ou atualizar ROE antes de prosseguir."
      },
      {
        "name": "Técnica não permitida",
        "signal": "Evento associado a categoria fora do plano",
        "queryIdea": "technique NOT IN tecnicas_aprovadas",
        "commonFalsePositive": "Ferramenta gerou checagem automática não prevista",
        "response": "Interromper ferramenta, preservar logs e revisar ROE."
      }
    ],
    "containmentActions": [
      "Parar teste imediatamente",
      "Comunicar ponto focal",
      "Reverter mudança temporária",
      "Marcar evidência como potencialmente sensível",
      "Atualizar ROE antes de retomar"
    ],
    "evidenceChecklist": [
      "Documento de ROE",
      "Lista de alvos autorizados",
      "Janela de execução",
      "Critérios de parada",
      "Plano de comunicação",
      "Registro de exceções"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — violações de escopo em validação defensiva",
      "theme": "escopo e regras de engajamento",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "timestamp,actor,src_ip,target,activity,window_status,scope_status,severity",
        "2026-07-01T10:01:00Z,analyst-a,10.99.1.10,lab-web-01,curl validation,inside,in-scope,ok",
        "2026-07-01T10:13:21Z,analyst-a,10.99.1.10,prod-db-01,port validation,inside,out-of-scope,critical-stop",
        "2026-07-01T10:55:44Z,scanner-lab,10.99.1.20,lab-api-02,baseline scan,outside,in-scope,pause",
        "2026-07-01T11:02:03Z,analyst-b,10.99.1.11,lab-web-02,header review,inside,in-scope,ok"
      ],
      "analysisPrompt": "Identifique quais atividades devem ser pausadas, quais podem continuar e que comunicação deve ser feita ao sponsor/SOC.",
      "detectionIdea": "activity.scope_status=out-of-scope OR activity.window_status=outside",
      "expectedFinding": "prod-db-01 está fora de escopo e exige parada imediata; baseline scan fora da janela exige pausa e comunicação.",
      "evidenceToCollect": [
        "ROE validado",
        "Registro de atividade fora de escopo",
        "Ação de parada",
        "Comunicação ao ponto focal"
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
      "title": "Escopo ambíguo",
      "prompt": "Um gestor diz: 'Pode testar nossa rede toda no fim de semana'. Liste oito perguntas que você faria antes de aceitar.",
      "difficulty": "intermediário",
      "expectedAnswer": "Ativos permitidos, fora de escopo, janela e timezone, métodos permitidos, intensidade, contatos, critérios de parada, dados sensíveis, ambientes críticos, autorização formal e objetivo de negócio."
    },
    {
      "title": "Privacidade em evidências",
      "prompt": "Você coletou um PCAP que contém credenciais ou dados pessoais. O que deve fazer antes de anexar ao relatório?",
      "difficulty": "intermediário",
      "expectedAnswer": "Restringir acesso, preservar original com segurança, gerar versão sanitizada, documentar necessidade, reter pelo período definido e evitar compartilhamento amplo."
    },
    {
      "title": "Cloud e custo",
      "prompt": "Uma validação em cloud pode gerar custo de NAT, egress e logs. Como incluir isso na ROE?",
      "difficulty": "avançado",
      "expectedAnswer": "Definir limites de tráfego, destinos permitidos, janela curta, monitoramento de billing, tags, alertas de custo, plano de parada e aprovação de orçamento."
    },
    {
      "title": "Critério de parada",
      "prompt": "Durante um teste autorizado, o SOC vê alerta crítico fora do padrão esperado. Qual decisão profissional tomar?",
      "difficulty": "intermediário",
      "expectedAnswer": "Pausar a atividade, registrar horário, informar canal combinado, preservar evidências, verificar se o alerta está relacionado ao teste e retomar apenas com aprovação."
    },
    {
      "id": "ex16.2.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “Escopo, ética e regras de engajamento defensivas” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como Chamados de mudança, Aprovação formal, Lista de ativos autorizados, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.2.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Expandir escopo por conveniência: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Testar credenciais reais sem autorização: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Executar negação de serviço: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.2.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — violações de escopo em validação defensiva”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "prod-db-01 está fora de escopo e exige parada imediata; baseline scan fora da janela exige pausa e comunicação. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "O que melhor define escopo em uma atividade de segurança?",
      "options": [
        "Lista informal de alvos interessantes",
        "Fronteira autorizada de ativos, horários, métodos, limites e exclusões",
        "Permissão genérica para testar qualquer coisa",
        "Apenas o range de IP público da empresa"
      ],
      "correctAnswer": 1,
      "explanation": "Escopo é a fronteira operacional e autorizada da atividade."
    },
    {
      "question": "Qual item deve aparecer em regras de engajamento?",
      "options": [
        "Critérios de parada e contatos de emergência",
        "Senha do administrador em texto puro",
        "Instrução para ignorar alertas do SOC",
        "Permissão para ultrapassar escopo se parecer útil"
      ],
      "correctAnswer": 0,
      "explanation": "ROE precisa definir como operar e quando interromper com segurança."
    },
    {
      "question": "Por que autorização verbal é fraca?",
      "options": [
        "Porque ferramentas não aceitam autorização verbal",
        "Porque não cria rastreabilidade suficiente para atividade sensível",
        "Porque impede qualquer atividade técnica",
        "Porque substitui evidências"
      ],
      "correctAnswer": 1,
      "explanation": "Atividades sensíveis exigem rastreabilidade, clareza e prova de autorização."
    },
    {
      "question": "Qual atitude é mais ética ao encontrar dado sensível inesperado?",
      "options": [
        "Compartilhar com todo time para acelerar análise",
        "Publicar no chat para pedir ajuda",
        "Minimizar exposição, proteger evidência e escalar pelo canal correto",
        "Ignorar e continuar coletando tudo"
      ],
      "correctAnswer": 2,
      "explanation": "Privacidade e minimização são essenciais em investigações e validações."
    },
    {
      "question": "Qual situação exige parar uma atividade autorizada?",
      "options": [
        "Resultado esperado documentado",
        "Alerta crítico ou degradação fora do previsto",
        "Logs aparecendo no SIEM conforme combinado",
        "Contato do SOC acompanhando a execução"
      ],
      "correctAnswer": 1,
      "explanation": "Impacto inesperado ou alerta crítico deve acionar critério de parada."
    },
    {
      "question": "Como DevSecOps pode ajudar escopo e ROE?",
      "options": [
        "Executando testes sem aprovação para ganhar velocidade",
        "Versionando targets permitidos, limites, janelas e guardrails",
        "Removendo logs de validações",
        "Fazendo produção virar laboratório permanente"
      ],
      "correctAnswer": 1,
      "explanation": "Automação madura transforma governança em controle reprodutível."
    }
  ],
  "flashcards": [
    {
      "front": "Escopo",
      "back": "Fronteira autorizada da atividade: ativos, métodos, janelas, limites, exclusões e responsáveis."
    },
    {
      "front": "ROE",
      "back": "Rules of Engagement: regras operacionais para executar uma validação com segurança e rastreabilidade."
    },
    {
      "front": "Autorização formal",
      "back": "Aprovação documentada que define quem autorizou, o quê, quando, como e sob quais limites."
    },
    {
      "front": "Critério de parada",
      "back": "Condição objetiva que interrompe a atividade para proteger disponibilidade, privacidade, segurança ou negócio."
    },
    {
      "front": "Minimização de dados",
      "back": "Coletar e compartilhar apenas o necessário para cumprir o objetivo autorizado."
    },
    {
      "front": "Fora de escopo",
      "back": "Ativos, métodos, horários ou dados explicitamente proibidos ou não autorizados na atividade."
    }
  ],
  "mentorQuestions": [
    "Você conseguiria defender cada ação técnica com uma autorização escrita e um objetivo de negócio?",
    "Quais dados você realmente precisa coletar para provar um achado sem expor pessoas desnecessariamente?",
    "Se algo sair errado durante uma validação, quem decide parar e como todos serão avisados?"
  ],
  "challenge": {
    "title": "Criar uma ROE para validação defensiva em ambiente híbrido",
    "scenario": "Uma empresa possui datacenter, cloud, VPN, DNS privado, WAF, Kubernetes, bancos privados, proxy, firewall e SIEM. A diretoria autorizou uma avaliação para confirmar se segmentação, egress control e telemetria funcionam. Você deve produzir as regras de engajamento antes de qualquer execução.",
    "tasks": [
      "Definir objetivo de negócio e objetivos técnicos.",
      "Listar ativos em escopo, fora de escopo e condicionais.",
      "Definir janela, timezone, origem controlada e contas de teste.",
      "Classificar métodos permitidos, condicionais e proibidos.",
      "Definir limites de intensidade, tráfego e impacto.",
      "Criar plano de comunicação e contatos de emergência.",
      "Definir evidências, retenção, acesso e sanitização.",
      "Criar critérios de parada e plano de rollback.",
      "Definir estrutura do relatório final."
    ],
    "successCriteria": [
      "A ROE elimina ambiguidade sobre o que pode e não pode ser feito.",
      "Toda atividade tem dono, janela, escopo e limite.",
      "Dados sensíveis e pessoais recebem tratamento explícito.",
      "Existe critério de parada claro e acionável.",
      "O relatório final liga evidência, risco, impacto e recomendação.",
      "A atividade permanece defensiva, autorizada e proporcional."
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
    "summary": "Uma ROE madura começa com o objetivo de reduzir risco, não com a escolha de ferramenta. Ela delimita ativos, janelas, métodos, intensidade, privacidade, evidências, contatos e parada. A melhor solução é aquela que permite aprender sobre o controle sem criar incidente maior que o risco avaliado.",
    "steps": [
      "Escrever objetivo: validar segmentação, egress control e telemetria em ambiente híbrido.",
      "Separar escopo em datacenter, cloud, VPN, Kubernetes e serviços críticos.",
      "Excluir explicitamente sistemas de pagamento, dados reais sensíveis e técnicas destrutivas se não houver aprovação específica.",
      "Usar origens conhecidas, contas de teste e cabeçalhos/identificadores quando aplicável.",
      "Limitar taxa, volume, janela e simultaneidade para evitar indisponibilidade e custo excessivo.",
      "Avisar SOC e times responsáveis sem cegar detecções reais.",
      "Proteger PCAPs, logs e prints como evidências sensíveis.",
      "Definir parada por degradação, alerta inesperado, escopo violado ou solicitação do dono.",
      "Reportar achados com evidência suficiente, risco claro, recomendação proporcional e próximos passos.",
      "Confirmar escopo autorizado e critérios de parada.",
      "Selecionar telemetria mínima e proteger evidências.",
      "Gerar hipóteses defensivas e falsos positivos esperados.",
      "Escolher mitigação proporcional, reversível e comunicada.",
      "Registrar debrief com achados, lacunas e melhorias permanentes."
    ],
    "commonMistakes": [
      "Confundir autorização genérica com autorização suficiente.",
      "Usar produção como laboratório sem janela e sem dono.",
      "Coletar dados demais para provar achado simples.",
      "Não avisar SOC e gerar confusão operacional.",
      "Não definir critérios de parada antes da execução.",
      "Transformar relatório em exposição pública de falhas em vez de plano de melhoria."
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
      "term": "Escopo",
      "shortDefinition": "Fronteira autorizada da atividade.",
      "longDefinition": "Conjunto de ativos, métodos, horários, limites, dados, ambientes e exclusões que definem onde a atividade pode ocorrer.",
      "example": "Apenas subnets de homologação 10.20.0.0/24 e 10.21.0.0/24, na janela aprovada.",
      "relatedTerms": [
        "ROE",
        "autorização",
        "fora de escopo"
      ],
      "relatedLessons": [
        "16.2",
        "16.3"
      ]
    },
    {
      "term": "Regras de engajamento",
      "shortDefinition": "Instruções operacionais da avaliação.",
      "longDefinition": "Documento que define objetivos, escopo, métodos permitidos, limites, comunicação, evidências, critérios de parada e relatório.",
      "example": "ROE de teste defensivo de segmentação com contatos do SOC e limite de tráfego.",
      "relatedTerms": [
        "escopo",
        "critério de parada"
      ],
      "relatedLessons": [
        "16.2"
      ]
    },
    {
      "term": "Autorização formal",
      "shortDefinition": "Permissão documentada para a atividade.",
      "longDefinition": "Registro escrito, ticket, contrato, ordem de serviço ou aprovação equivalente que demonstra quem autorizou e sob quais condições.",
      "example": "Change aprovado para validação de segmentação no sábado das 10h às 12h.",
      "relatedTerms": [
        "legalidade",
        "governança"
      ],
      "relatedLessons": [
        "16.2"
      ]
    },
    {
      "term": "Critério de parada",
      "shortDefinition": "Condição que interrompe o teste.",
      "longDefinition": "Gatilho objetivo para pausar ou encerrar a atividade quando houver risco de impacto, desvio de escopo ou alerta não previsto.",
      "example": "Parar imediatamente se CPU do firewall ultrapassar limite definido ou se aplicação crítica degradar.",
      "relatedTerms": [
        "rollback",
        "risco operacional"
      ],
      "relatedLessons": [
        "15.12",
        "16.2"
      ]
    },
    {
      "term": "Minimização",
      "shortDefinition": "Coletar apenas o necessário.",
      "longDefinition": "Princípio de reduzir coleta, retenção e compartilhamento de dados ao mínimo necessário para o objetivo autorizado.",
      "example": "Anexar trecho sanitizado de log em vez de PCAP completo com dados de usuários.",
      "relatedTerms": [
        "privacidade",
        "evidência"
      ],
      "relatedLessons": [
        "15.2",
        "16.2"
      ]
    },
    {
      "term": "Fora de escopo",
      "shortDefinition": "O que não está autorizado.",
      "longDefinition": "Ativos, técnicas, dados, horários, origens ou ambientes que não podem ser tocados na atividade atual.",
      "example": "Ambiente de produção de pagamento excluído da avaliação de homologação.",
      "relatedTerms": [
        "escopo",
        "exclusão"
      ],
      "relatedLessons": [
        "16.2",
        "16.3"
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
        "16.2",
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
        "16.2",
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
        "16.2",
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
      "title": "NIST SP 800-115: Technical Guide to Information Security Testing and Assessment",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/115/final",
      "note": "Referência para planejamento, condução, análise e relatório de testes e avaliações de segurança."
    },
    {
      "type": "official-doc",
      "title": "The NIST Cybersecurity Framework 2.0",
      "organization": "NIST",
      "url": "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf",
      "note": "Base para governança, identificação, proteção, detecção, resposta e recuperação."
    },
    {
      "type": "legislation",
      "title": "Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais",
      "organization": "Planalto",
      "url": "https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/L13709compilado.htm",
      "note": "Referência brasileira sobre tratamento de dados pessoais, privacidade e direitos dos titulares."
    },
    {
      "type": "legislation",
      "title": "Lei nº 12.965/2014 — Marco Civil da Internet",
      "organization": "Planalto",
      "url": "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm",
      "note": "Referência brasileira sobre princípios, garantias, direitos e deveres para uso da internet."
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
              "name": "Risco Blue Team específico — Escopo, ética, legalidade e regras de engajamento",
              "description": "Em Escopo, ética, legalidade e regras de engajamento, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
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
      "Chamados de mudança",
      "Aprovação formal",
      "Lista de ativos autorizados",
      "Canal de comunicação",
      "Logs de atividade do laboratório",
      "Registro de evidências"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.2.",
      "Atividade fora da janela — sinal: Eventos de teste antes/depois da janela aprovada; ideia de consulta: event.actor=tester AND timestamp NOT BETWEEN janela_inicio AND janela_fim; falso positivo comum: Diferença de fuso horário.",
      "Origem não autorizada — sinal: Validação partindo de IP diferente do registrado; ideia de consulta: src_ip NOT IN origens_autorizadas AND activity=test_validation; falso positivo comum: NAT corporativo compartilhado.",
      "Técnica não permitida — sinal: Evento associado a categoria fora do plano; ideia de consulta: technique NOT IN tecnicas_aprovadas; falso positivo comum: Ferramenta gerou checagem automática não prevista."
    ],
    "ethicalLimits": {
      "authorizedScope": "Somente ativos, redes, janelas e técnicas explicitamente descritos nas regras de engajamento. Tudo que não está escrito deve ser tratado como fora de escopo.",
      "allowedActions": [
        "Validar inventário autorizado",
        "Confirmar responsáveis",
        "Definir janela e critérios de parada",
        "Registrar evidências não sensíveis",
        "Acionar comunicação acordada"
      ],
      "prohibitedActions": [
        "Expandir escopo por conveniência",
        "Testar credenciais reais sem autorização",
        "Executar negação de serviço",
        "Persistência, evasão ou coleta de segredo",
        "Alterar produção sem change"
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
      "Falha ou comportamento inesperado relacionado a Escopo, ética, legalidade e regras de engajamento.",
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
      "Qual evidência comprova o entendimento da aula 16.2?"
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
      "16.3"
    ]
  },
  "blueTeamEnhancement": {
    "title": "Escopo, ética e regras de engajamento defensivas",
    "defensiveGoal": "Garantir que qualquer validação de segurança tenha autorização, limites, janela, comunicação, critérios de parada, evidências permitidas e proteção contra impacto operacional.",
    "authorizedScope": "Somente ativos, redes, janelas e técnicas explicitamente descritos nas regras de engajamento. Tudo que não está escrito deve ser tratado como fora de escopo.",
    "allowedActions": [
      "Validar inventário autorizado",
      "Confirmar responsáveis",
      "Definir janela e critérios de parada",
      "Registrar evidências não sensíveis",
      "Acionar comunicação acordada"
    ],
    "prohibitedActions": [
      "Expandir escopo por conveniência",
      "Testar credenciais reais sem autorização",
      "Executar negação de serviço",
      "Persistência, evasão ou coleta de segredo",
      "Alterar produção sem change"
    ],
    "telemetrySources": [
      "Chamados de mudança",
      "Aprovação formal",
      "Lista de ativos autorizados",
      "Canal de comunicação",
      "Logs de atividade do laboratório",
      "Registro de evidências"
    ],
    "detectionEngineering": [
      {
        "name": "Atividade fora da janela",
        "signal": "Eventos de teste antes/depois da janela aprovada",
        "queryIdea": "event.actor=tester AND timestamp NOT BETWEEN janela_inicio AND janela_fim",
        "commonFalsePositive": "Diferença de fuso horário",
        "response": "Pausar teste, comunicar sponsor e registrar exceção."
      },
      {
        "name": "Origem não autorizada",
        "signal": "Validação partindo de IP diferente do registrado",
        "queryIdea": "src_ip NOT IN origens_autorizadas AND activity=test_validation",
        "commonFalsePositive": "NAT corporativo compartilhado",
        "response": "Confirmar origem; bloquear ou atualizar ROE antes de prosseguir."
      },
      {
        "name": "Técnica não permitida",
        "signal": "Evento associado a categoria fora do plano",
        "queryIdea": "technique NOT IN tecnicas_aprovadas",
        "commonFalsePositive": "Ferramenta gerou checagem automática não prevista",
        "response": "Interromper ferramenta, preservar logs e revisar ROE."
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
      "Parar teste imediatamente",
      "Comunicar ponto focal",
      "Reverter mudança temporária",
      "Marcar evidência como potencialmente sensível",
      "Atualizar ROE antes de retomar"
    ],
    "evidencePackage": [
      "Documento de ROE",
      "Lista de alvos autorizados",
      "Janela de execução",
      "Critérios de parada",
      "Plano de comunicação",
      "Registro de exceções"
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
    "title": "Dataset sintético — violações de escopo em validação defensiva",
    "theme": "escopo e regras de engajamento",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "timestamp,actor,src_ip,target,activity,window_status,scope_status,severity",
      "2026-07-01T10:01:00Z,analyst-a,10.99.1.10,lab-web-01,curl validation,inside,in-scope,ok",
      "2026-07-01T10:13:21Z,analyst-a,10.99.1.10,prod-db-01,port validation,inside,out-of-scope,critical-stop",
      "2026-07-01T10:55:44Z,scanner-lab,10.99.1.20,lab-api-02,baseline scan,outside,in-scope,pause",
      "2026-07-01T11:02:03Z,analyst-b,10.99.1.11,lab-web-02,header review,inside,in-scope,ok"
    ],
    "analysisPrompt": "Identifique quais atividades devem ser pausadas, quais podem continuar e que comunicação deve ser feita ao sponsor/SOC.",
    "detectionIdea": "activity.scope_status=out-of-scope OR activity.window_status=outside",
    "expectedFinding": "prod-db-01 está fora de escopo e exige parada imediata; baseline scan fora da janela exige pausa e comunicação.",
    "evidenceToCollect": [
      "ROE validado",
      "Registro de atividade fora de escopo",
      "Ação de parada",
      "Comunicação ao ponto focal"
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
