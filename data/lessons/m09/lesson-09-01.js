export const lesson0901 = {
  "id": "9.1",
  "moduleId": "m09",
  "order": 1,
  "title": "Por que firewalls existem",
  "subtitle": "Entenda por que firewalls existem, onde devem ser posicionados, quais decisões eles tomam, quais riscos reduzem e por que conectividade sem política não é arquitetura segura.",
  "duration": "120-175 min",
  "estimatedStudyTimeMinutes": 175,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 270,
  "tags": [
    "redes",
    "network",
    "firewall",
    "segurança",
    "controle de tráfego",
    "zonas",
    "dmz",
    "segmentação",
    "superfície de ataque",
    "cloud",
    "devsecops",
    "p1-07",
    "firewall-lab-v2-final"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.7",
      "title": "NAT, PAT, firewalls stateful e rastreamento de conexão",
      "reason": "A aula aprofunda o papel do firewall além do rastreamento de conexão."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.5",
      "title": "Proxies, reverse proxies, WAFs e load balancers HTTP",
      "reason": "Mostra como firewalls se relacionam com controles HTTP e publicação segura."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "title": "Gateway padrão e rota local",
      "reason": "Firewall não substitui roteamento; é preciso distinguir caminho de política."
    }
  ],
  "objectives": [
    "Explicar por que firewalls existem e qual problema arquitetural resolvem.",
    "Diferenciar conectividade, roteamento, NAT, firewall, proxy, WAF e logging.",
    "Identificar pontos de controle em redes corporativas, cloud e ambientes híbridos.",
    "Classificar fluxos por necessidade de negócio, administração, observabilidade e risco.",
    "Aplicar o princípio deny-by-default como decisão arquitetural antes da escrita de regras específicas."
  ],
  "learningOutcomes": [
    "Descrever o firewall como mecanismo de política, não como simples bloqueador de pacotes.",
    "Mapear fronteiras entre Internet, usuários, DMZ, aplicações, bancos, administração e observabilidade.",
    "Explicar por que firewall não substitui identidade, criptografia, patching, hardening, WAF ou monitoramento.",
    "Reconhecer riscos de rede plana, administração pública, backend exposto e egress sem controle.",
    "Produzir uma primeira matriz de intenção de tráfego antes de transformá-la em ACLs na aula 10.2."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Até aqui, você estudou como pacotes encontram caminho, como portas identificam serviços, como TCP mantém conexões, como HTTP publica aplicações e como TLS protege o conteúdo. Mas uma rede funcional ainda deixa uma pergunta sem resposta: <strong>todo caminho tecnicamente possível deveria ser permitido?</strong></p>\n  <p>O firewall surge porque conectividade não é autorização. Roteamento responde “existe caminho?”. Firewall responde “este fluxo deveria existir, neste sentido, entre estas zonas, com este protocolo, neste contexto e com esta evidência?”.</p>\n  <div class='callout'><strong>Ideia central da aula:</strong> antes de aprender a ordem das ACLs, você precisa entender por que uma organização cria pontos de controle. Firewall existe para reduzir superfície de ataque, impor fronteiras, registrar decisões e transformar tráfego em política governável.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  \n  <p>Nos primeiros ambientes conectados, redes eram pequenas e confiavam muito no perímetro físico. À medida que LANs cresceram, a Internet se popularizou, servidores passaram a ser publicados e ataques remotos se tornaram comuns, ficou claro que endereçamento e roteamento não bastavam.</p>\n  <p>Os primeiros filtros eram listas simples em roteadores: permitiam ou negavam pacotes com base em IP, protocolo e porta. Depois surgiram firewalls stateful, capazes de rastrear conexões. Em seguida vieram NGFWs, inspeção de aplicação, IDS/IPS, WAFs, firewalls de cloud, security groups, NACLs e políticas declarativas em Kubernetes.</p>\n  <p>A evolução não eliminou o princípio original: reduzir tráfego desnecessário e tornar explícito o que é permitido. O que mudou foi o contexto. Hoje o firewall pode estar em appliance físico, VM, cloud, host, container, service mesh, API gateway ou WAF.</p>\n\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Sem firewall ou sem política bem desenhada, a rede tende a ficar plana: usuários alcançam servidores demais, servidores alcançam a Internet sem necessidade, bancos ficam acessíveis por segmentos indevidos, portas administrativas aparecem expostas e a equipe de segurança só descobre o problema depois do incidente.</p>\n  <p>O erro comum é imaginar que o perigo está apenas na Internet. Em ambientes modernos, parte importante do risco vem de dentro: estação comprometida, pipeline com credencial vazada, workload em cloud com saída irrestrita, servidor legado sem patch, túnel amplo de parceiro ou API interna publicada sem gateway.</p>\n  <div class='callout callout--problem'><strong>Problema arquitetural:</strong> se qualquer origem pode tentar falar com qualquer destino, a organização perde contenção, perde evidência e aumenta o impacto de qualquer comprometimento.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  \n  <table class='comparison-table'><thead><tr><th>Geração</th><th>Como decide</th><th>Limitação</th><th>Uso atual</th></tr></thead><tbody>\n    <tr><td>Filtro stateless</td><td>IP, protocolo e porta</td><td>Não entende estado de conexão</td><td>ACLs em roteadores, NACLs, filtros simples</td></tr>\n    <tr><td>Firewall stateful</td><td>Rastreia fluxo e retorno</td><td>Pouco contexto de aplicação</td><td>Perímetro, segmentação interna, cloud firewall</td></tr>\n    <tr><td>NGFW</td><td>Aplicação, usuário, ameaça e conteúdo</td><td>Custo, complexidade e falsos positivos</td><td>Empresas, datacenters e filiais</td></tr>\n    <tr><td>WAF</td><td>HTTP, headers, payload e comportamento web</td><td>Não substitui firewall de rede</td><td>APIs, aplicações web e borda</td></tr>\n    <tr><td>Policy as code</td><td>Regras versionadas e revisadas</td><td>Depende de cultura e automação</td><td>Cloud, Kubernetes, DevSecOps e plataforma</td></tr>\n  </tbody></table>\n\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>Firewall</strong> é um ponto de controle que aplica política de tráfego entre zonas, redes, hosts, serviços ou aplicações. Ele pode permitir, negar, rejeitar, registrar, inspecionar, traduzir, limitar taxa ou encaminhar para outro controle, dependendo da tecnologia.</p>\n  <p>Nesta aula, pense no firewall como uma decisão de arquitetura: onde colocar fronteiras, quais fluxos fazem sentido, quais fluxos são perigosos, quais evidências serão coletadas e como impedir caminhos paralelos que contornem o controle.</p>\n  <div class='definition-box'>A pergunta principal da aula 10.1 não é “qual regra vem primeiro?”. Essa será a aula 10.2. A pergunta principal aqui é: “quais comunicações deveriam ser possíveis dentro de uma arquitetura segura?”.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Mesmo quando tecnologias variam, o raciocínio de firewall segue uma sequência comum. Primeiro o tráfego chega a um ponto de controle. Depois o equipamento ou serviço identifica atributos do fluxo, consulta políticas, decide uma ação e registra evidências.</p>\n  <ol class='flow-list'>\n    <li>O tráfego chega a uma fronteira: interface, zona, subnet, security group, firewall cloud, WAF ou gateway.</li>\n    <li>O controle identifica origem, destino, protocolo, porta, direção, zona, estado da conexão e, em tecnologias avançadas, aplicação ou identidade.</li>\n    <li>A política determina se aquele fluxo é esperado para o negócio e para a arquitetura.</li>\n    <li>A ação é aplicada: permitir, negar, rejeitar, inspecionar, logar, limitar, traduzir ou encaminhar.</li>\n    <li>Logs, contadores e métricas registram a decisão para troubleshooting, auditoria e resposta a incidente.</li>\n  </ol>\n  <p>O detalhe essencial é separar responsabilidades: rota escolhe caminho; NAT traduz endereço ou porta; firewall decide política; WAF entende HTTP; proxy intermedeia requisições; SIEM correlaciona evidências.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura corporativa madura, firewalls aparecem em várias fronteiras: borda Internet, DMZ, rede interna, administração, datacenter, cloud, filiais, VPN, endpoints, Kubernetes, WAF e API Gateway. O objetivo não é colocar firewall em todo lugar aleatoriamente, mas posicionar controles onde uma mudança de confiança acontece.</p>\n  <p>Uma boa arquitetura começa separando zonas por função e criticidade. Usuários, aplicações, banco de dados, backup, identidade, observabilidade, administração, convidados, IoT, parceiros e Internet não deveriam compartilhar o mesmo nível de confiança.</p>\n  <table class='data-table'><thead><tr><th>Fronteira</th><th>Por que controlar</th><th>Exemplo de decisão</th><th>Risco reduzido</th></tr></thead><tbody>\n    <tr><td>Internet → DMZ</td><td>Publicação controlada</td><td>Permitir apenas WAF/LB em 443</td><td>Backend exposto diretamente</td></tr>\n    <tr><td>Usuários → Servidores</td><td>Evitar acesso lateral amplo</td><td>Usuários acessam aplicação, não banco</td><td>Movimento lateral</td></tr>\n    <tr><td>Administração → Infra</td><td>Proteger gestão privilegiada</td><td>Acesso via bastion/VPN/MFA</td><td>SSH/RDP público</td></tr>\n    <tr><td>Servidores → Internet</td><td>Controlar saída</td><td>Egress apenas para DNS, updates, APIs aprovadas e logs</td><td>Exfiltração e C2</td></tr>\n    <tr><td>Cloud privada → Serviços gerenciados</td><td>Evitar Internet desnecessária</td><td>Private endpoint quando possível</td><td>Exposição pública indevida</td></tr>\n  </tbody></table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  \n  <p>Pense em um prédio corporativo. Endereços IP são salas, rotas são corredores e elevadores. Sem controle, qualquer pessoa que entrou no prédio tenta abrir qualquer porta. O firewall é a recepção e o controle de acesso entre áreas: visitante vai até sala pública, funcionário autorizado entra em área interna, fornecedor acessa somente um setor e tudo fica registrado.</p>\n  <p>A limitação da analogia é que redes são dinâmicas: identidades mudam, fluxos expiram, aplicações escalam, IPs são recriados em cloud e políticas podem estar distribuídas em várias plataformas.</p>\n\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  \n  <p>Em casa, o roteador normalmente bloqueia conexões iniciadas da Internet para seu notebook, mas permite que seu notebook inicie conexões para sites externos. Isso é firewall stateful básico: o retorno da conexão é permitido porque pertence a um fluxo iniciado internamente.</p>\n  <p>Quando alguém configura port forwarding para um serviço interno, está criando uma exceção explícita. Se essa exceção expõe painel administrativo sem MFA, ela vira risco.</p>\n\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  \n  <p>Em uma empresa, usuários não deveriam acessar diretamente bancos de dados. O fluxo esperado é: usuário → aplicação web → API → banco. O firewall reforça essa separação negando tráfego usuário → banco e permitindo apenas API → banco na porta necessária.</p>\n  <p>Isso reduz o impacto de uma estação comprometida, melhora auditoria e ajuda a demonstrar conformidade: não basta dizer “ninguém deveria acessar”; a política técnica deve impedir e registrar.</p>\n\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  \n  <p>Em cloud, o firewall aparece como security group, NSG, NACL, cloud firewall, WAF, private endpoint, route table e policy. A regra clássica “permitir 0.0.0.0/0 para 22 ou 3389” é um erro comum e crítico.</p>\n  <p>Arquiteturas maduras deixam backends em sub-redes privadas, expõem apenas load balancer/WAF, restringem egress, coletam flow logs e versionam regras via IaC.</p>\n\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  \n  <p>Em DevSecOps, regras de firewall não deveriam nascer apenas em tickets manuais. Elas podem ser declaradas em Terraform, revisadas por pull request, validadas por policy as code e testadas em pipeline.</p>\n  <p>Um pipeline seguro verifica se a regra possui dono, justificativa, prazo, ambiente, origem restrita, destino específico, porta mínima e logging habilitado. Exceções sem dono ou amplas demais falham no controle.</p>\n\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  \n  <p>Durante um incidente, firewalls ajudam a responder perguntas: qual host iniciou conexão? para qual destino? por qual porta? qual regra permitiu? houve bytes de saída? houve tentativa bloqueada? a conexão passou por WAF? existe rota alternativa?</p>\n  <p>Boas práticas incluem deny por padrão, allow mínimo, logging de negações relevantes, revisão periódica, segmentação interna, MFA para administração, egress controlado e prevenção de bypass por backend exposto.</p>\n  <div class='callout callout--security'><strong>Regra de ouro:</strong> uma regra permitida deve ter justificativa de negócio e evidência. Se ninguém consegue explicar por que existe, ela provavelmente precisa ser revisada.</div>\n\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <p>O diagrama mostra o firewall como ponto de decisão arquitetural entre zonas. A intenção aqui não é detalhar a ordem de regras, mas visualizar por que Internet, usuários, DMZ, servidores, administração e SIEM não devem ficar em uma única rede plana.</p>\n  <svg class='lesson-svg' viewBox='0 0 1100 640' role='img' aria-labelledby='m09l01-title m09l01-desc'>\n    <title id='m09l01-title'>Firewall entre zonas de rede</title>\n    <desc id='m09l01-desc'>Clientes internos, Internet, DMZ, servidores e SIEM conectados por um firewall que decide permitir, negar e registrar fluxos.</desc>\n    <defs><marker id='m09l01-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path></marker></defs>\n    <rect x='40' y='70' width='220' height='140' rx='16' class='svg-zone'></rect>\n    <text x='150' y='100' text-anchor='middle' class='svg-label'>LAN Usuários</text>\n    <rect x='75' y='125' width='150' height='50' rx='10' class='svg-node svg-node--client'></rect>\n    <text x='150' y='156' text-anchor='middle' class='svg-label svg-label--small'>10.10.10.0/24</text>\n    <rect x='40' y='380' width='220' height='140' rx='16' class='svg-zone'></rect>\n    <text x='150' y='410' text-anchor='middle' class='svg-label'>Internet</text>\n    <rect x='75' y='435' width='150' height='50' rx='10' class='svg-node svg-node--cloud'></rect>\n    <text x='150' y='466' text-anchor='middle' class='svg-label svg-label--small'>origens externas</text>\n    <rect x='430' y='230' width='240' height='150' rx='18' class='svg-node svg-node--firewall'></rect>\n    <text x='550' y='262' text-anchor='middle' class='svg-label'>Firewall</text>\n    <text x='550' y='295' text-anchor='middle' class='svg-label svg-label--small'>política + estado + logs</text>\n    <text x='550' y='326' text-anchor='middle' class='svg-label svg-label--small'>permit / deny / inspect</text>\n    <rect x='835' y='70' width='220' height='140' rx='16' class='svg-zone'></rect>\n    <text x='945' y='100' text-anchor='middle' class='svg-label'>DMZ</text>\n    <rect x='870' y='125' width='150' height='50' rx='10' class='svg-node svg-node--server'></rect>\n    <text x='945' y='156' text-anchor='middle' class='svg-label svg-label--small'>web/API</text>\n    <rect x='835' y='380' width='220' height='140' rx='16' class='svg-zone'></rect>\n    <text x='945' y='410' text-anchor='middle' class='svg-label'>Rede Dados</text>\n    <rect x='870' y='435' width='150' height='50' rx='10' class='svg-node svg-node--server'></rect>\n    <text x='945' y='466' text-anchor='middle' class='svg-label svg-label--small'>DB privado</text>\n    <line x1='260' y1='150' x2='430' y2='280' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l01-arrow)'></line>\n    <line x1='260' y1='450' x2='430' y2='330' class='svg-flow svg-flow--blocked' marker-end='url(#m09l01-arrow)'></line>\n    <line x1='670' y1='280' x2='835' y2='150' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l01-arrow)'></line>\n    <line x1='670' y1='330' x2='835' y2='450' class='svg-flow svg-flow--response' marker-end='url(#m09l01-arrow)'></line>\n    <rect x='440' y='500' width='220' height='70' rx='14' class='svg-node svg-node--security'></rect>\n    <text x='550' y='530' text-anchor='middle' class='svg-label'>SIEM / Logs</text>\n    <text x='550' y='555' text-anchor='middle' class='svg-label svg-label--small'>evidência e auditoria</text>\n    <line x1='550' y1='380' x2='550' y2='500' class='svg-flow svg-flow--response' marker-end='url(#m09l01-arrow)'></line>\n    <text x='550' y='610' text-anchor='middle' class='svg-label'>Firewall bom não é “caixa mágica”: é política, contexto, inspeção, registro, revisão e governança.</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você não escreverá ACL detalhada ainda. O foco é anterior: descobrir <strong>onde</strong> a organização precisa de pontos de controle, <strong>quais fluxos realmente deveriam existir</strong> e <strong>quais riscos aparecem quando tudo fica roteável demais</strong>.</p>\n</section>\n\n<div class=\"content-card\" data-enhancement=\"p1-07-9.1\"><h4>Reforço v2.0: laboratório de firewall orientado por evidência</h4><p>Este laboratório foi revisado na v2.0 para exigir matriz de fluxo, regra mínima, retorno, logs, contadores, evidências e rollback. O acesso à aula permanece livre; a conclusão usa critérios de progresso, não bloqueio de navegação.</p></div>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  \n  <p>Os exercícios praticam identificação de zonas, justificativa de fluxos, diferença entre rota/NAT/firewall e construção de regras mínimas.</p>\n\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá uma arquitetura com rede plana, backend exposto, administração pública, banco acessível por usuários e saída irrestrita. Seu desafio será propor fronteiras e decisões de controle antes de escrever regras específicas.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada prioriza criar zonas, posicionar os pontos de controle corretos, publicar serviços apenas pela borda apropriada, remover caminhos diretos, separar administração e definir evidências mínimas para operação segura.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Firewalls existem porque uma rede apenas roteável não é necessariamente segura. Eles transformam conectividade em decisão: quem pode falar com quem, por qual caminho, com qual exposição, com qual justificativa e com qual evidência.</p>\n  <p>A aula 10.1 estabelece a visão arquitetural: zonas, fronteiras, superfície de ataque, publicação controlada, administração protegida, egress controlado e logs. A aula 10.2 entrará no detalhe operacional de ACLs, regras e ordem de processamento.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará ACLs, regras e ordem de processamento. Depois de decidir quais fluxos deveriam existir, será hora de entender como diferentes plataformas avaliam regras e por que ordem, prioridade e sombra de regras mudam o resultado.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 3",
      "Camada 4",
      "Camada 7",
      "Segurança",
      "Política de tráfego"
    ],
    "beforeThisLesson": "O aluno já estudou IP, roteamento, transporte, HTTP/HTTPS e publicação de APIs.",
    "afterThisLesson": "O aluno será capaz de interpretar e desenhar políticas de tráfego com foco defensivo.",
    "dependsOn": [
      "IPv4",
      "Roteamento",
      "TCP",
      "UDP",
      "HTTP",
      "TLS",
      "NAT",
      "Logs",
      "Cloud"
    ]
  },
  "protocolFields": [
    {
      "field": "Origem",
      "meaning": "IP, sub-rede, zona, objeto, identidade ou workload que inicia o fluxo.",
      "securityNote": "Origem ampla como any ou 0.0.0.0/0 deve ser tratada como exceção de alto risco."
    },
    {
      "field": "Destino",
      "meaning": "Host, serviço, sub-rede, zona, VIP, load balancer ou aplicação alvo.",
      "securityNote": "Destino amplo facilita movimento lateral e dificulta auditoria."
    },
    {
      "field": "Protocolo e serviço",
      "meaning": "TCP, UDP, ICMP, porta de destino ou aplicação reconhecida pelo controle.",
      "securityNote": "Serviço indefinido normalmente vira permissão excessiva."
    },
    {
      "field": "Direção",
      "meaning": "Sentido do fluxo: entrada, saída, norte-sul, leste-oeste, origem para destino ou retorno.",
      "securityNote": "Direção mal entendida gera regra que parece segura, mas permite caminho indevido."
    },
    {
      "field": "Ponto de controle",
      "meaning": "Local onde a decisão será aplicada: firewall de borda, interno, WAF, SG/NSG, NACL, host firewall ou gateway.",
      "securityNote": "Se o tráfego não passa pelo ponto de controle, a política pode ser contornada."
    },
    {
      "field": "Evidência",
      "meaning": "Logs, contadores, flow logs, IDs de requisição e registros enviados ao SIEM.",
      "securityNote": "Sem evidência, não há como provar permissão, bloqueio, abuso ou ausência de tráfego."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Mapear a intenção do fluxo",
      "description": "Determine qual processo de negócio ou operação técnica exige comunicação entre origem e destino.",
      "securityNote": "Fluxo sem justificativa tende a virar exceção permanente."
    },
    {
      "step": 2,
      "name": "Identificar a mudança de confiança",
      "description": "Verifique se o tráfego cruza Internet, DMZ, usuários, servidores, banco, administração, cloud ou parceiro.",
      "securityNote": "Mudança de confiança sem controle aumenta impacto de comprometimento."
    },
    {
      "step": 3,
      "name": "Escolher o ponto de controle",
      "description": "Defina onde a decisão deve ocorrer: borda, firewall interno, WAF, API Gateway, security group, NACL ou host firewall.",
      "securityNote": "Controles fora do caminho real não protegem o fluxo."
    },
    {
      "step": 4,
      "name": "Definir a decisão de alto nível",
      "description": "Classifique como permitir, negar, inspecionar, registrar, limitar, publicar por proxy ou bloquear totalmente.",
      "securityNote": "Permitir diretamente pode ser inadequado quando o fluxo deveria passar por WAF, bastion ou proxy."
    },
    {
      "step": 5,
      "name": "Planejar evidência e revisão",
      "description": "Defina quais decisões terão logs, para onde serão enviados e quando o fluxo será revisado.",
      "securityNote": "Controle sem revisão envelhece e acumula risco."
    }
  ],
  "deepDive": {
    "title": "Firewall como decisão de arquitetura, não como lista de bloqueios",
    "content": "Um firewall eficaz começa antes da regra. Primeiro vem a arquitetura: zonas, fronteiras, caminhos permitidos, publicação controlada, administração protegida, saída monitorada e evidências. A regra técnica é apenas a implementação de uma decisão anterior. Quando uma regra nasce sem essa decisão, ela vira exceção operacional difícil de auditar."
  },
  "commonMistakes": [
    "Tratar firewall como solução mágica e ignorar arquitetura, identidade, hardening e monitoramento.",
    "Criar rede plana onde usuários, servidores, bancos e administração compartilham confiança demais.",
    "Publicar backend diretamente em vez de usar WAF, reverse proxy, load balancer ou API Gateway.",
    "Permitir SSH/RDP da Internet por comodidade.",
    "Deixar servidores com saída irrestrita para qualquer destino.",
    "Coletar logs apenas quando ocorre incidente, não desde o desenho da política.",
    "Confundir rota funcionando com fluxo autorizado."
  ],
  "troubleshooting": {
    "method": "Antes de alterar regra, valide o caminho completo: DNS, rota, NAT, ponto de controle, política, logs, retorno e aplicação. A aula 10.1 foca em confirmar se o tráfego passa pelo controle correto; aulas posteriores detalham ordem de ACL, state table, NAT e packet capture.",
    "commands": [
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "Test-NetConnection app.lab.local -Port 443\ncurl -vkI https://app.lab.local/health\nnc -vz app.lab.local 443",
        "purpose": "Planejar testes",
        "expectedObservation": "Critérios de sucesso e falha.",
        "interpretation": "Toda regra precisa provar liberação e bloqueio."
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Por que firewalls existem.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "Qual é o 5-tuple do fluxo e em qual horário ele falhou?",
      "Qual controle tomou a decisão e qual evidência prova isso?",
      "A falha está na ida, no retorno, no estado, no NAT, no WAF ou no backend?"
    ],
    "decisionTree": [
      {
        "if": "Sem hits na regra",
        "then": "Verificar ponto de aplicação, direção, rota e origem real do fluxo."
      },
      {
        "if": "Allow existe mas aplicação falha",
        "then": "Separar transporte, TLS, WAF, backend e autorização."
      },
      {
        "if": "Retorno falha",
        "then": "Verificar state table, NACL/ACL stateless, portas efêmeras e caminho assimétrico."
      },
      {
        "if": "Regra ampla aparece",
        "then": "Substituir por matriz mínima com owner, validade, log e rollback."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Rede plana com confiança implícita.",
      "Backend, banco ou painel administrativo público.",
      "Any-any como solução permanente.",
      "Firewall fora do caminho real do tráfego.",
      "Egress irrestrito sem proxy, firewall ou monitoramento.",
      "Logs desativados para reduzir ruído sem análise de risco."
    ],
    "mitigations": [
      "Segmentação por zonas.",
      "Matriz de comunicação antes da implementação de regras.",
      "Controles de borda e controles internos combinados.",
      "Bastion, VPN, MFA e acesso just-in-time para administração.",
      "WAF/API Gateway para tráfego HTTP público.",
      "Flow logs, firewall logs e alertas no SIEM.",
      "Governança e policy as code nas próximas aulas."
    ],
    "goodPractices": [
      "Começar por arquitetura de zonas e matriz de intenção de tráfego.",
      "Deny-by-default entre zonas com permissões justificadas.",
      "Publicar serviços por WAF, reverse proxy, load balancer ou API Gateway quando aplicável.",
      "Separar administração em bastion, VPN, MFA e origens controladas.",
      "Controlar egress de servidores e workloads críticos.",
      "Enviar logs relevantes para SIEM com retenção e sanitização.",
      "Revisar fronteiras e fluxos periodicamente."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Por que firewalls existem",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Segmentação por zonas.",
      "Matriz de comunicação antes da implementação de regras.",
      "Controles de borda e controles internos combinados.",
      "Bastion, VPN, MFA e acesso just-in-time para administração.",
      "WAF/API Gateway para tráfego HTTP público.",
      "Flow logs, firewall logs e alertas no SIEM.",
      "Governança e policy as code nas próximas aulas."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-9.1",
    "title": "Inventário defensivo de fluxos antes de criar regra de firewall",
    "labType": "architecture",
    "objective": "Construir uma matriz mínima de fluxos para evitar liberação genérica e justificar cada regra com dono, prazo, evidência e risco.",
    "scenario": "Uma aplicação corporativa precisa publicar portal e API; o pedido inicial veio como “liberar o servidor”.",
    "topology": "Usuários internos -> proxy/firewall -> zona de aplicação -> banco privado -> SIEM/logs.",
    "architecture": "A política separa origem, destino, protocolo, porta, direção, zona, justificativa, logging, validade e rollback.",
    "prerequisites": [
      "Revisar as aulas anteriores do M09 e os fundamentos de TCP/UDP, portas, IPv4, DNS e HTTP.",
      "Usar somente laboratório, simulação, dados fictícios ou ambiente explicitamente autorizado."
    ],
    "tools": [
      "Planilha ou Markdown",
      "Editor de texto",
      "curl/nc para plano de validação"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não aplique mudanças em produção sem change, janela, backup e rollback.",
      "Não use any-any como solução de troubleshooting.",
      "Sanitize IPs, tokens, cookies, payloads e nomes internos antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir necessidade de negócio",
        "instruction": "Descreva sistema, usuário, dado, criticidade, janela e dono.",
        "expectedOutput": "Pedido vago convertido em necessidade verificável.",
        "evidence": "Justificativa do fluxo.",
        "explanation": "Firewall protege fluxos de negócio, não frases genéricas.",
        "artifact": "Card de necessidade de negócio."
      },
      {
        "number": 2,
        "title": "Montar matriz mínima",
        "instruction": "Preencha origem, destino, protocolo, porta, direção, zona, dono, validade, log e rollback.",
        "expectedOutput": "Regra mínima e auditável.",
        "evidence": "Matriz sem any-any.",
        "explanation": "A matriz evita exceções abertas.",
        "artifact": "Tabela: origem | destino | protocolo | porta | direção | zona | dono | validade | log | rollback."
      },
      {
        "number": 3,
        "title": "Separar conectividade de autorização",
        "instruction": "Classifique o que firewall permite e o que aplicação/IAM deve negar.",
        "expectedOutput": "Limites do firewall claros.",
        "evidence": "Tabela controle/responsabilidade.",
        "explanation": "Firewall não substitui autenticação e autorização.",
        "analysisTask": "Mapear firewall, WAF/proxy, aplicação, IAM, banco e SIEM."
      },
      {
        "number": 4,
        "title": "Planejar logging",
        "instruction": "Defina logs para allow, deny/drop e exceções.",
        "expectedOutput": "Plano de evidência.",
        "evidence": "Campos mínimos: horário, ação, regra, origem, destino, porta.",
        "explanation": "Sem log não há auditoria.",
        "artifact": "Mapa de logs por controle."
      },
      {
        "number": 5,
        "title": "Planejar testes",
        "instruction": "Proponha teste positivo e negativo.",
        "expectedOutput": "Critérios de sucesso e falha.",
        "evidence": "Comandos planejados.",
        "explanation": "Toda regra precisa provar liberação e bloqueio.",
        "command": "Test-NetConnection app.lab.local -Port 443\ncurl -vkI https://app.lab.local/health\nnc -vz app.lab.local 443"
      },
      {
        "number": 6,
        "title": "Registrar risco e rollback",
        "instruction": "Defina risco residual, gatilho de rollback e revisão.",
        "expectedOutput": "Mudança reversível.",
        "evidence": "Risco e rollback documentados.",
        "explanation": "Exceções temporárias não podem virar permanentes.",
        "artifact": "Registro de exceção com prazo."
      }
    ],
    "expectedResult": "Entrega com matriz de fluxo, evidências, validação objetiva, análise de risco e rollback.",
    "validation": [
      {
        "check": "Matriz sem any-any",
        "expected": "Todas as linhas têm origem, destino, protocolo e porta específicos.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão manual"
      },
      {
        "check": "Logging definido",
        "expected": "Allow e deny/drop têm fonte de log.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão do plano"
      },
      {
        "check": "Teste positivo e negativo",
        "expected": "Há teste de acesso permitido e negado.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão do runbook"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Pedido sem porta",
        "probableCause": "Requisitante não conhece dependências técnicas.",
        "howToConfirm": "Solicitar contrato da aplicação e fluxo.",
        "fix": "Mapear origem/destino/porta antes de aprovar."
      },
      {
        "symptom": "Regra ampla sugerida",
        "probableCause": "Exceção sem escopo.",
        "howToConfirm": "Procurar origem/destino any ou portas 0-65535.",
        "fix": "Substituir por matriz mínima e prazo."
      },
      {
        "symptom": "Sem evidência",
        "probableCause": "Logging não planejado.",
        "howToConfirm": "Procurar ruleId, log e contador.",
        "fix": "Habilitar logging ou fonte alternativa."
      }
    ],
    "improvements": [
      "Adicionar integração com SIEM.",
      "Automatizar revisão periódica de regras.",
      "Transformar a matriz em policy as code quando fizer sentido."
    ],
    "evidenceToCollect": [
      "Matriz de fluxos",
      "Mapa de zonas",
      "Plano de logging",
      "Critérios de validação",
      "Registro de risco e rollback"
    ],
    "questions": [
      "Por que firewall não deve receber pedido genérico?",
      "Qual diferença entre conectividade e autorização?"
    ],
    "challenge": "Converta um pedido genérico em matriz de regra mínima.",
    "solution": "Origem/destino/porta/direção/dono/validade/log/rollback são obrigatórios antes de aprovar."
  },
  "mentorQuestions": [
    "Qual fronteira de confiança este firewall está protegendo?",
    "Esse fluxo precisa existir por motivo de negócio, operação, observabilidade ou apenas conveniência?",
    "Se a origem for comprometida, até onde ela conseguiria se mover com a política atual?",
    "Existe algum caminho alternativo que contorne o ponto de controle desenhado?",
    "Que evidência provaria que a arquitetura bloqueia o que deveria bloquear?",
    {
      "type": "diagnóstico",
      "question": "Que evidência provaria que o firewall tomou a decisão correta neste cenário?",
      "hints": [
        "Pense em log, contador, state table, flow log ou packet capture.",
        "Separe ida, retorno e camada de aplicação."
      ],
      "expectedIdeas": [
        "matriz de fluxo",
        "log de regra",
        "contador",
        "state table",
        "pcap",
        "rollback"
      ],
      "explanation": "Firewall profissional é operado por evidências, não por palpites."
    }
  ],
  "quiz": [
    {
      "question": "Qual é o objetivo principal de um firewall em uma arquitetura de rede?",
      "options": [
        "Substituir DNS",
        "Aplicar política de tráfego entre fronteiras",
        "Aumentar largura de banda",
        "Converter HTTP em HTTPS"
      ],
      "answer": "Aplicar política de tráfego entre fronteiras",
      "explanation": "Firewall decide se um fluxo deve ser permitido, negado, registrado ou inspecionado conforme política."
    },
    {
      "question": "Por que conectividade não é o mesmo que autorização?",
      "options": [
        "Porque rota indica caminho, mas não necessidade ou permissão",
        "Porque DNS sempre bloqueia tráfego",
        "Porque TCP não usa portas",
        "Porque TLS substitui firewall"
      ],
      "answer": "Porque rota indica caminho, mas não necessidade ou permissão",
      "explanation": "Uma rota pode existir mesmo quando o fluxo não deveria ser autorizado."
    },
    {
      "question": "Qual cenário melhor justifica segmentação com firewall?",
      "options": [
        "Usuários acessando diretamente banco de dados",
        "Aplicação acessando banco privado na porta necessária",
        "SIEM recebendo logs",
        "WAF publicando API em 443"
      ],
      "answer": "Usuários acessando diretamente banco de dados",
      "explanation": "Usuários normalmente devem acessar aplicação/API, não banco diretamente."
    },
    {
      "question": "Firewall substitui criptografia, autenticação e patching?",
      "options": [
        "Sim",
        "Não",
        "Apenas em cloud",
        "Apenas em redes IPv4"
      ],
      "answer": "Não",
      "explanation": "Firewall reduz superfície e controla fluxo, mas não substitui controles de identidade, TLS, hardening e correção de vulnerabilidades."
    },
    {
      "question": "Qual é um sinal de arquitetura insegura?",
      "options": [
        "Backend acessível somente via WAF",
        "Banco privado acessível apenas pela aplicação",
        "RDP aberto da Internet para servidor interno",
        "Logs enviados ao SIEM"
      ],
      "answer": "RDP aberto da Internet para servidor interno",
      "explanation": "Administração pública aumenta muito o risco e deve ser substituída por bastion, VPN, MFA e origem controlada."
    },
    {
      "question": "Antes de escrever ACLs detalhadas, o que deve existir?",
      "options": [
        "Matriz de intenção de tráfego e zonas",
        "Apenas uma lista de portas famosas",
        "Somente prints do navegador",
        "Uma regra any-any temporária"
      ],
      "answer": "Matriz de intenção de tráfego e zonas",
      "explanation": "As regras técnicas devem implementar decisões arquiteturais previamente justificadas."
    }
  ],
  "flashcards": [
    {
      "front": "Firewall",
      "back": "Ponto de controle que aplica política de tráfego entre zonas, redes, hosts, serviços ou aplicações."
    },
    {
      "front": "Ponto de controle",
      "back": "Local onde uma decisão de tráfego é aplicada, como firewall de borda, WAF, SG/NSG, NACL, proxy ou host firewall."
    },
    {
      "front": "Zona de segurança",
      "back": "Agrupamento lógico de ativos com função, criticidade e nível de confiança semelhantes."
    },
    {
      "front": "Superfície de ataque",
      "back": "Conjunto de caminhos, serviços e interfaces que podem ser explorados por um atacante."
    },
    {
      "front": "Egress control",
      "back": "Controle de tráfego de saída para reduzir exfiltração, C2 e acesso externo não autorizado."
    },
    {
      "front": "Matriz de intenção de tráfego",
      "back": "Documento que descreve por que cada fluxo precisa existir antes de virar regra técnica."
    }
  ],
  "exercises": [
    {
      "title": "Mapeie fronteiras",
      "prompt": "Liste cinco fronteiras de confiança em uma empresa com usuários, API, banco, bastion, cloud e Internet.",
      "expectedAnswer": "Internet→DMZ, Usuários→Aplicações, Aplicações→Banco, Administração→Infra, Servidores→Internet/serviços externos."
    },
    {
      "title": "Classifique intenção de fluxo",
      "prompt": "Classifique os fluxos usuário→API:443, usuário→DB:5432, bastion→servidor:22, servidor→Internet:any e WAF→API:443.",
      "expectedAnswer": "Usuário→API e WAF→API podem ser negócio/publicação; usuário→DB deve ser proibido; bastion→servidor é administração controlada; servidor→Internet:any deve ser reduzido e monitorado."
    },
    {
      "title": "Escolha pontos de controle",
      "prompt": "Para uma API pública com backend privado e banco privado, indique onde usar WAF/LB, firewall interno, SG/NSG e logs.",
      "expectedAnswer": "Internet chega ao WAF/LB; WAF/LB alcança API privada em porta específica; API alcança banco privado; SG/NSG restringe subnets/workloads; logs vão ao SIEM."
    },
    {
      "title": "Explique a diferença",
      "prompt": "Explique em uma frase a diferença entre rota, NAT, firewall e WAF.",
      "expectedAnswer": "Rota escolhe caminho; NAT traduz endereços/portas; firewall aplica política de tráfego; WAF inspeciona HTTP e protege aplicações web/APIs."
    },
    {
      "id": "ex-9.1-p1-07-matriz",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de fluxo com origem, destino, protocolo, porta, direção, controle, log esperado e critério de rollback para o cenário da aula.",
      "expectedAnswer": "A resposta deve conter fluxo específico, sem any-any, com regra mínima, fonte de log, teste positivo/negativo e rollback.",
      "explanation": "Matriz de fluxo é a base para firewall operável e auditável."
    }
  ],
  "challenge": {
    "title": "Redesenho de fronteiras para uma rede plana",
    "scenario": "Uma empresa cresceu rapidamente e mantém usuários, aplicações, banco, backup e administração na mesma rede interna. A API também possui IP público direto, SSH está aberto para a Internet em alguns servidores, e servidores conseguem sair para qualquer destino externo sem proxy ou firewall de saída.",
    "tasks": [
      "Identificar os principais riscos arquiteturais antes de falar em sintaxe de regras.",
      "Propor zonas de segurança mínimas.",
      "Definir quais pontos de controle devem existir entre as zonas.",
      "Indicar quais fluxos devem passar por WAF/LB, bastion, firewall interno ou proxy de saída.",
      "Definir quais logs e evidências seriam obrigatórios."
    ],
    "successCriteria": [
      "Banco deixa de ser acessível diretamente por usuários.",
      "API pública passa por WAF/load balancer ou API Gateway.",
      "Administração pública é substituída por bastion/VPN/MFA.",
      "Egress de servidores passa a ter escopo e logs.",
      "Cada fronteira crítica possui ponto de controle e evidência."
    ]
  },
  "commentedSolution": {
    "summary": "A correção começa pela arquitetura: separar zonas, remover exposição direta, escolher pontos de controle e só depois transformar decisões em regras específicas.",
    "steps": [
      "Separar pelo menos as zonas Internet, DMZ/borda, aplicações, banco, administração, observabilidade e saída controlada.",
      "Publicar a API por WAF/load balancer/API Gateway, removendo IP público direto do backend.",
      "Permitir acesso ao banco apenas a partir da camada de aplicação ou API necessária.",
      "Mover administração para bastion/VPN com MFA e restringir origens autorizadas.",
      "Controlar saída de servidores por proxy, firewall ou NAT Gateway com destinos aprovados.",
      "Enviar logs de WAF, firewall, flow logs e autenticação ao SIEM com retenção adequada.",
      "Documentar matriz de intenção para alimentar a implementação detalhada de ACLs na aula 10.2."
    ],
    "mentorComment": "A decisão madura não é “bloquear tudo” nem “liberar para funcionar”. É entender o fluxo necessário, posicionar o controle certo e gerar evidência suficiente para operar, auditar e responder a incidentes."
  },
  "glossary": [
    {
      "term": "Firewall",
      "definition": "Controle que aplica política ao tráfego de rede ou aplicação."
    },
    {
      "term": "Zona de segurança",
      "definition": "Agrupamento lógico de ativos com função e nível de confiança semelhantes."
    },
    {
      "term": "Ponto de controle",
      "definition": "Local onde uma decisão de tráfego é aplicada e registrada."
    },
    {
      "term": "Matriz de intenção de tráfego",
      "definition": "Documento que justifica quais comunicações deveriam existir antes da implementação de regras."
    },
    {
      "term": "Superfície de ataque",
      "definition": "Conjunto de serviços, portas, interfaces e caminhos que podem ser explorados."
    },
    {
      "term": "Egress control",
      "definition": "Controle de tráfego de saída para reduzir exfiltração, comunicação com C2 e dependências externas não autorizadas."
    },
    {
      "term": "Deny-by-default",
      "definition": "Modelo em que tudo é negado exceto o que foi permitido explicitamente."
    }
  ],
  "references": [
    "Material interno da Deixando de ser TBN",
    "Conceitos consolidados de firewall, ACL, segmentação, cloud security groups, WAF e política de tráfego"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Módulo de IaC e automação",
      "reason": "Policy as code e revisão por pull request dependem de automação e governança de infraestrutura."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Controle de acesso e autenticação",
      "reason": "Firewall controla fluxo, mas identidade controla sujeito e autorização."
    }
  ],
  "progressRules": {
    "requiredSections": [
      "motivation",
      "concept",
      "internals",
      "architecture",
      "security",
      "lab",
      "challenge",
      "summary"
    ],
    "requiredQuizScore": 70,
    "requiredLabCompletion": true,
    "unlocksNextLesson": "9.2",
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
      "9.2"
    ]
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
