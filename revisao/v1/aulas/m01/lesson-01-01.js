export const lesson0101 = {
  "id": "1.1",
  "moduleId": "m01",
  "order": 1,
  "title": "O que é uma rede e por que existe",
  "subtitle": "A rede como resposta ao problema de compartilhar informação, serviços e recursos entre pessoas, sistemas e organizações.",
  "duration": "70-100 min",
  "estimatedStudyTimeMinutes": 100,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 185,
  "tags": [
    "redes",
    "fundamentos",
    "comunicação",
    "lan",
    "wan",
    "protocolos",
    "segurança",
    "troubleshooting",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.10",
      "reason": "Antes de definir rede, é necessário entender bits, sinais, protocolos, métricas e pensamento em camadas vistos no Módulo 0."
    }
  ],
  "objectives": [
    "Explicar por que redes existem antes de decorar equipamentos e protocolos.",
    "Diferenciar dispositivo final, dispositivo intermediário, meio de transmissão, serviço, protocolo e política.",
    "Entender rede como sistema sociotécnico: tecnologia, operação, segurança, custo e finalidade.",
    "Relacionar redes domésticas, corporativas, cloud e DevSecOps.",
    "Criar um primeiro modelo mental para diagnosticar problemas básicos de conectividade."
  ],
  "learningOutcomes": [
    "Dado um cenário simples, o aluno identifica quem são os participantes da rede e qual problema a rede resolve.",
    "Dado um incidente inicial, o aluno separa falha de dispositivo, meio, endereço, protocolo, serviço e política.",
    "Dado um desenho corporativo ou cloud, o aluno explica por que a rede é mais do que cabos e Wi-Fi."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Imagine uma empresa pequena onde cada computador trabalha isolado. Um funcionário cria uma planilha no próprio notebook, outro precisa imprimir um contrato, o financeiro precisa acessar um sistema, o suporte precisa atualizar uma máquina e o time de segurança precisa investigar um alerta. Sem rede, cada troca dependeria de pendrive, deslocamento físico, cópia manual ou exposição direta de serviços sem controle.</p>\n  <p>Uma rede existe para resolver esse problema: permitir que participantes diferentes compartilhem informações, serviços e recursos de forma previsível. Endereçamento, protocolos, roteamento, DNS, segmentação, logs e quase todo o resto do curso são partes dessa resposta.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> quando alguém diz “a rede caiu”, raramente está dizendo algo preciso. Pode ser cabo, Wi-Fi, DHCP, DNS, gateway, firewall, proxy, autenticação, certificado, servidor, rota, política cloud ou aplicação. A primeira habilidade profissional é entender o que uma rede é para conseguir separar esses componentes.</div>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>História e evolução</h2>\n  <p>As primeiras redes não nasceram para “ter internet”. Computadores eram caros, isolados e centralizados, e os dados circulavam em cartões perfurados, fitas e discos. As redes surgiram para compartilhar recursos caros, como processamento, armazenamento, impressoras e terminais. Depois disso, cada fase resolveu um problema e criou o seguinte, e é isso que explica por que firewalls, NAT, DNS e VPN existem:</p>\n  <div class=\"responsive-table\"><table class=\"data-table comparison-table\">\n    <thead><tr><th>Fase</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Computadores isolados</td><td>Cada máquina guardava seus próprios dados.</td><td>Baixo compartilhamento e muita cópia manual.</td><td>Redes locais e terminais.</td></tr>\n      <tr><td>Redes locais</td><td>Equipamentos próximos compartilhavam serviços.</td><td>Dificuldade de conectar filiais e outras organizações.</td><td>Roteamento e redes de longa distância.</td></tr>\n      <tr><td>Internet</td><td>Redes diferentes passaram a se interconectar por padrões comuns.</td><td>Exposição, escala, endereçamento e segurança viraram desafios.</td><td>Firewalls, NAT, DNS, TLS, VPN e políticas.</td></tr>\n      <tr><td>Cloud e mobilidade</td><td>Usuários, aplicações e dados deixaram de estar apenas no escritório.</td><td>Perímetro tradicional ficou insuficiente.</td><td>Zero Trust, SDN, SASE, IaC e observabilidade.</td></tr>\n    </tbody>\n  </table></div>\n  <p>Hoje a rede conecta não só computadores, mas também usuários remotos, APIs, containers, funções serverless, dispositivos IoT e ambientes híbridos (parte local, parte em cloud).</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>O problema que uma rede resolve não é só “ligar computadores”. É criar um sistema compartilhado de comunicação entre participantes que podem estar em lugares diferentes, usar tecnologias diferentes, pertencer a organizações diferentes e exigir níveis diferentes de confiança. Por isso, toda rede precisa atender a várias exigências ao mesmo tempo:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Compartilhamento:</strong> usuários precisam acessar arquivos, impressoras, sistemas, bancos de dados e aplicações.</li>\n    <li><strong>Comunicação:</strong> máquinas precisam trocar mensagens em formatos compreensíveis.</li>\n    <li><strong>Escala:</strong> a solução precisa funcionar para dois dispositivos, cem usuários, milhares de servidores ou milhões de clientes.</li>\n    <li><strong>Controle:</strong> nem todo mundo deve acessar tudo; conectividade não é autorização.</li>\n    <li><strong>Operação:</strong> quando algo falha, alguém precisa diagnosticar sem adivinhar, e isso exige documentação, monitoramento e controle de mudanças.</li>\n    <li><strong>Segurança:</strong> a mesma rede que permite colaboração também pode permitir abuso, movimento lateral e vazamento.</li>\n    <li><strong>Custo:</strong> switches, roteadores, firewalls, access points, links, licenças e equipe especializada custam dinheiro; em cloud, tráfego, NAT gateway, firewalls gerenciados, load balancers e flow logs geram custo recorrente.</li>\n  </ul>\n  <p>Sem rede, a empresa cria ilhas de informação. Com uma rede mal projetada, cria uma superfície de ataque enorme. E nem tudo deve ser conectado: um sistema pode ficar isolado de propósito quando a segurança ou a regulação exigem, ou quando conectá-lo traria risco sem necessidade operacional.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> uma rede de computadores é um conjunto de dispositivos, meios de comunicação, protocolos, endereços, serviços e políticas que permite que um participante envie dados para outro, diretamente ou por intermediários, usando regras comuns de comunicação e controles que determinam o que é permitido, observado e protegido.</div>\n  <p>Essa definição é mais útil do que “computadores conectados” porque inclui o que aparece no trabalho real: o cabo ou o Wi-Fi, a placa de rede, o switch, o roteador, o IP, o DNS, o firewall, a aplicação, a identidade, a política e os logs.</p>\n  <p>Ela também mostra que a rede é um <strong>sistema sociotécnico</strong>: além da tecnologia, envolve pessoas que operam e mudam a rede, regras de segurança, custo e uma finalidade de negócio. Uma decisão técnica correta pode ser ruim se não tiver dono, se custar demais ou se abrir acesso a quem não precisa.</p>\n  <div class=\"callout warning\"><strong>O que a rede não garante:</strong>\n    <ul>\n      <li>Ter caminho até o servidor não garante que o serviço esteja funcionando.</li>\n      <li>Mais velocidade contratada não corrige DNS errado, regra bloqueando ou serviço parado.</li>\n      <li>A cloud esconde o cabo, mas não elimina a rede: rotas, filtros e endereços continuam existindo.</li>\n    </ul>\n  </div>\n  <div class=\"callout\"><strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Achar que rede é só internet.</strong> Em casa, a rede só aparece quando a internet falha. A internet é uma rede de redes; sua LAN e a rede da empresa também são redes, com DNS, gateway e serviços internos próprios.</li>\n      <li><strong>Confundir conectividade com permissão.</strong> Como muitos testes começam com ping ou acesso a uma porta, a pessoa conclui que o acesso deve ser liberado só porque o caminho existe. Conectividade é caminho; autorização é a decisão de quem pode acessar o quê.</li>\n      <li><strong>Chamar tudo de problema de rede.</strong> Sem separar dispositivo, meio, endereço, protocolo, serviço, identidade e política, o troubleshooting vira tentativa e erro.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Quando um computador acessa um serviço, várias etapas acontecem em sequência. Antes de estudar cada protocolo, enxergue a rede como essa cadeia de dependências:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Etapa</th><th>O que acontece</th><th>Exemplo de falha nessa etapa</th></tr></thead>\n    <tbody>\n      <tr><td>1. Origem</td><td>Uma aplicação decide enviar dados, como abrir um site ou acessar um compartilhamento.</td><td>O próprio programa trava ou está mal configurado.</td></tr>\n      <tr><td>2. Formato</td><td>Os dados obedecem a um protocolo, como HTTP, SMB ou DNS.</td><td>Cliente e servidor não falam o mesmo protocolo ou versão.</td></tr>\n      <tr><td>3. Endereçamento</td><td>O sistema descobre para onde enviar os dados (IP, nome via DNS, gateway).</td><td>Host sem IP válido ou nome que não resolve.</td></tr>\n      <tr><td>4. Encapsulamento</td><td>Os dados recebem informações de transporte, rede e enlace.</td><td>Pouco visível neste começo; as camadas são detalhadas no Módulo 2.</td></tr>\n      <tr><td>5. Meio</td><td>Os bits viram sinais elétricos, luz ou rádio.</td><td>Cabo solto, fibra danificada, Wi-Fi fraco.</td></tr>\n      <tr><td>6. Intermediários</td><td>Switches, roteadores, firewalls, proxies e balanceadores tomam decisões de encaminhamento.</td><td>Gateway errado ou interface do roteador desligada.</td></tr>\n      <tr><td>7. Destino</td><td>O serviço recebe, interpreta e responde.</td><td>Serviço parado ou porta fechada.</td></tr>\n      <tr><td>8. Controle</td><td>Políticas de segurança podem permitir, bloquear, registrar ou modificar o fluxo.</td><td>Firewall bloqueia ou o usuário recebe “acesso negado”.</td></tr>\n    </tbody>\n  </table></div>\n  <p>A rede não é um único componente, é uma sequência de dependências. Quando uma delas falha, o sintoma é sempre parecido (“não acessa”), mas a causa pode estar em qualquer etapa. Diagnosticar é descobrir em qual etapa a cadeia quebrou, e a árvore de decisão em <em>Troubleshooting</em> faz isso na ordem: IP, gateway, DNS, porta e política.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>Toda rede, de casa à cloud, combina os mesmos papéis:</p>\n  <ul>\n    <li><strong>Dispositivos finais:</strong> notebooks, celulares, servidores, impressoras, câmeras, VMs, containers e aplicações. Consomem ou oferecem serviços.</li>\n    <li><strong>Dispositivos intermediários:</strong> switches, roteadores, firewalls, access points, proxies, load balancers e gateways. Conectam, encaminham, filtram ou controlam tráfego.</li>\n    <li><strong>Meios de transmissão:</strong> cobre, fibra, rádio, links virtuais, túneis e backbones.</li>\n    <li><strong>Protocolos:</strong> regras que definem formato, ordem, tratamento de erro, estado e interpretação das mensagens.</li>\n    <li><strong>Serviços essenciais:</strong> DHCP, DNS, NTP, diretórios, autenticação e observabilidade.</li>\n    <li><strong>Políticas:</strong> regras de firewall, segmentação, roteamento, autenticação, autorização e auditoria.</li>\n  </ul>\n  <p>Alguns elementos acumulam papéis: o DNS é um serviço que roda num servidor (dispositivo final), e o firewall encaminha tráfego e também aplica política. Em cloud, os papéis continuam os mesmos, com outros nomes:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Papel</th><th>Nome em cloud</th></tr></thead>\n    <tbody>\n      <tr><td>Rede e segmentos</td><td>VPC (AWS, Google Cloud) ou VNet (Azure), divididas em subnets</td></tr>\n      <tr><td>Roteamento entre redes</td><td>Route table, peering</td></tr>\n      <tr><td>Saída de redes privadas para a internet</td><td>NAT gateway</td></tr>\n      <tr><td>Filtro e política</td><td>Security group, network security group, firewall gerenciado</td></tr>\n      <tr><td>Distribuição de tráfego entre servidores</td><td>Load balancer</td></tr>\n      <tr><td>Acesso privado a um serviço gerenciado</td><td>Private endpoint</td></tr>\n    </tbody>\n  </table></div>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense em uma rede como o sistema de circulação de uma cidade. Casas e prédios são os dispositivos finais; ruas e cruzamentos são os meios e os intermediários; o endereço diz para onde ir; as regras de trânsito são os protocolos; pedágios, bloqueios e fiscais são as políticas; e as câmeras registram o que passou, como os logs.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> numa rede, os dados são quebrados em pacotes, encapsulados, filtrados, retransmitidos e criptografados, coisas que o trânsito de uma cidade não representa.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu celular se conecta ao Wi-Fi do access point, que normalmente fica dentro do próprio roteador. O roteador entrega um endereço IP ao celular (por exemplo, 192.168.0.15, com gateway 192.168.0.1), encaminha o tráfego para a internet e normalmente também faz NAT. Quando você abre um site, o celular usa DNS para descobrir o endereço do servidor, cria uma conexão, negocia criptografia (TLS) e recebe os dados.</p>\n  <p>Só nessa cena já aparecem rádio, senha do Wi-Fi, endereço IP, gateway, DNS, roteamento, NAT, protocolo, criptografia e uma política básica.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, a rede precisa separar usuários, servidores, visitantes, telefonia, câmeras, impressoras e administração. Um notebook corporativo pode precisar acessar internet, sistema interno, servidor de arquivos, VPN, diretório, EDR, proxy e SIEM, e cada acesso envolve caminho, política, identidade e registro.</p>\n  <p>Por isso, redes corporativas usam VLANs, sub-redes, roteadores, firewalls, proxies, NAC, VPN, DNS interno, DHCP controlado, logs e monitoramento. Ali, a rede é parte da operação e também da segurança.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Na cloud, a rede deixa de ser um armário com cabos e passa a ser definida por software, mas o raciocínio é o mesmo. Uma aplicação numa subnet privada pode acessar um banco por private endpoint, sair para a internet por NAT gateway, receber tráfego por load balancer e ser protegida por security groups. Um erro nesse desenho pode causar indisponibilidade, exposição indevida ou custo alto de tráfego.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Pipelines dependem de rede o tempo todo: o runner precisa alcançar o repositório, o registry, os scanners e o cluster de deploy. Um pipeline pode falhar porque o runner não resolve DNS, não alcança o registry, está bloqueado por proxy ou não tem rota para um cluster privado.</p>\n  <p>Infraestrutura como código também cria redes: VPCs, subnets, route tables, security groups e firewalls. Um erro numa regra pode abrir demais, bloquear o deploy ou impedir a coleta de logs e métricas.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>Em segurança, a rede tem quatro papéis ao mesmo tempo: é superfície de ataque, caminho de movimento lateral, fonte de evidência e ponto de controle. Numa rede plana, um notebook comprometido pode tentar alcançar o servidor de arquivos, as câmeras e a administração. Numa rede segmentada, esse alcance cai, mas só se as regras forem mantidas e os logs registrarem as tentativas. Os riscos e as mitigações estão em <em>Segurança</em>.</p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <p>Dois dispositivos finais chegam ao switch/AP da rede local; o roteador (gateway) encaminha o tráfego para um servidor interno ou para fora da rede local.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 460\" role=\"img\" aria-labelledby=\"m01l01-title m01l01-desc\">\n  <title id=\"m01l01-title\">Uma rede como sistema de comunicação entre dispositivos</title>\n  <desc id=\"m01l01-desc\">Diagrama mostrando dois dispositivos finais, um switch, um roteador, um serviço interno e uma nuvem externa, destacando endereçamento, meio físico, protocolo, política e observabilidade.</desc>\n  <defs>\n    <marker id=\"m01l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n      <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n    </marker>\n  </defs>\n  <rect x=\"35\" y=\"70\" width=\"170\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"120\" y=\"106\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n  <text x=\"120\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dispositivo final</text>\n\n  <rect x=\"35\" y=\"270\" width=\"170\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"120\" y=\"306\" text-anchor=\"middle\" class=\"svg-label\">Celular</text>\n  <text x=\"120\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi / usuário</text>\n\n  <rect x=\"285\" y=\"170\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"365\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Switch/AP</text>\n  <text x=\"365\" y=\"232\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Conecta a rede local</text>\n\n  <rect x=\"525\" y=\"170\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"605\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text>\n  <text x=\"605\" y=\"232\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Encaminha redes</text>\n\n  <rect x=\"760\" y=\"70\" width=\"180\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"850\" y=\"106\" text-anchor=\"middle\" class=\"svg-label\">Servidor interno</text>\n  <text x=\"850\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Arquivo / app / AD</text>\n\n  <rect x=\"760\" y=\"270\" width=\"180\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n  <text x=\"850\" y=\"306\" text-anchor=\"middle\" class=\"svg-label\">Internet / Cloud</text>\n  <text x=\"850\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SaaS / API / VPC</text>\n\n  <line x1=\"205\" y1=\"111\" x2=\"285\" y2=\"194\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"205\" y1=\"311\" x2=\"285\" y2=\"236\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"445\" y1=\"215\" x2=\"525\" y2=\"215\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"685\" y1=\"195\" x2=\"760\" y2=\"125\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"685\" y1=\"235\" x2=\"760\" y2=\"300\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n\n  <rect x=\"250\" y=\"380\" width=\"480\" height=\"52\" rx=\"12\" class=\"svg-boundary\" />\n  <text x=\"490\" y=\"412\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rede = dispositivos + meio + endereços + protocolos + políticas + operação</text>\n\n  <text x=\"350\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">LAN</text>\n  <text x=\"610\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Gateway</text>\n  <text x=\"850\" y=\"245\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Fora da rede local</text>\n</svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Modelo mental:</strong> rede é uma cadeia de comunicação com origem, dados, protocolo, endereço, meio, intermediários, destino, política e evidência.</li>\n    <li><strong>Definição:</strong> rede é um sistema de comunicação entre participantes, feito de dispositivos, meios, endereços, protocolos, serviços e políticas, e que envolve operação, segurança e custo. Não é só cabo ou Wi-Fi.</li>\n    <li><strong>Papéis:</strong> dispositivos finais consomem ou oferecem serviços; intermediários conectam, encaminham, filtram ou controlam. Em cloud, os papéis só mudam de nome (VPC/VNet, subnet, security group).</li>\n    <li><strong>Conectividade não é autorização:</strong> ter caminho não significa ter permissão, nem que o serviço esteja funcionando.</li>\n    <li><strong>Diagnóstico:</strong> “a rede caiu” não é um diagnóstico; descubra em qual etapa a cadeia quebrou (IP, gateway, DNS, porta, política).</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>A próxima aula, “Dispositivos finais, intermediários e serviços”, detalha os papéis dos participantes da rede, para você não confundir switch, roteador, access point, firewall, servidor e serviço.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Visão geral de todas as camadas"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "Wi-Fi",
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "sinais físicos",
      "protocolos",
      "pensamento em camadas"
    ],
    "enables": [
      "modelo OSI",
      "Ethernet",
      "IPv4",
      "subnetting",
      "TCP/UDP",
      "DNS",
      "HTTP",
      "firewalls",
      "VPN",
      "cloud networking"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Usuário não acessa internet",
      "Aplicação interna não abre",
      "Wi-Fi conecta mas nada navega",
      "Pipeline não alcança registry",
      "Servidor responde por IP mas não por nome"
    ],
    "diagnosticQuestions": [
      "O problema afeta um usuário, vários usuários ou todos?",
      "O dispositivo tem IP?",
      "Existe gateway padrão?",
      "DNS resolve?",
      "O caminho até o destino responde?",
      "A porta do serviço está acessível?",
      "Existe firewall, proxy, VPN ou política no meio?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Ver endereço IP, máscara, gateway, DNS e informações da interface.",
        "expectedObservation": "Interface ativa com IPv4, gateway e DNS coerentes.",
        "interpretation": "Se não houver IP válido ou gateway, o problema pode estar antes da aplicação."
      },
      {
        "platform": "Windows",
        "command": "ping <gateway> && tracert 8.8.8.8",
        "purpose": "Testar conectividade local e caminho básico para fora.",
        "expectedObservation": "Resposta do gateway e saltos no caminho.",
        "interpretation": "Falha no gateway sugere problema local; falha depois pode envolver roteamento, firewall ou provedor."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && resolvectl status",
        "purpose": "Ver endereços, rotas e DNS no Linux.",
        "expectedObservation": "Interface com IP, rota default e servidor DNS configurado.",
        "interpretation": "Sem rota default, o host não sabe para onde enviar tráfego fora da rede local."
      },
      {
        "platform": "Linux",
        "command": "ping -c 4 $(ip route | awk '/default/ {print $3; exit}')",
        "purpose": "Testar alcance do gateway padrão.",
        "expectedObservation": "Perda baixa e tempos coerentes na rede local.",
        "interpretation": "Perda para o gateway indica problema local, Wi-Fi, cabo, switch, VLAN ou firewall local."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief",
        "purpose": "Ver interfaces, endereços e estado operacional.",
        "expectedObservation": "Interfaces relevantes em up/up.",
        "interpretation": "Interface down ou administratively down impede comunicação pelo caminho esperado."
      }
    ],
    "decisionTree": [
      {
        "if": "Sem IP válido no host",
        "then": "Verificar DHCP, cabo, Wi-Fi, VLAN ou configuração manual."
      },
      {
        "if": "Tem IP, mas não pinga gateway",
        "then": "Verificar meio físico, Wi-Fi, máscara, VLAN, firewall local ou gateway errado."
      },
      {
        "if": "Pinga IP externo, mas nomes falham",
        "then": "Investigar DNS antes de culpar internet inteira."
      },
      {
        "if": "DNS resolve, mas aplicação falha",
        "then": "Verificar porta, protocolo, TLS, proxy, autenticação e política."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar segmentos, gateways, serviços críticos e dependências.",
      "Separar redes por função e criticidade.",
      "Registrar eventos em firewall, DNS, VPN, proxy e serviços críticos.",
      "Aplicar menor privilégio também em fluxos de rede.",
      "Revisar periodicamente regras e exceções."
    ],
    "badPractices": [
      "Colocar todos os ativos na mesma rede sem segmentação.",
      "Liberar any-any para resolver problema rápido.",
      "Expor serviços internos diretamente na internet.",
      "Não manter inventário de dispositivos e serviços.",
      "Usar conectividade como substituto de autorização."
    ],
    "commonErrors": [
      "Achar que NAT é firewall suficiente.",
      "Achar que VPN torna qualquer acesso seguro automaticamente.",
      "Ignorar logs de DNS e proxy em investigação.",
      "Não separar rede de aplicação e identidade."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por rede plana",
        "description": "Quando muitos ativos ficam no mesmo segmento, um comprometimento pode alcançar mais sistemas.",
        "defensiveExplanation": "O risco é a ampliação do impacto após o primeiro comprometimento.",
        "mitigation": "Segmentação, firewalls internos, autenticação forte, EDR, logs e revisão de acessos."
      },
      {
        "name": "Exposição indevida de serviço",
        "description": "Serviços administrativos ou internos ficam acessíveis além do necessário.",
        "defensiveExplanation": "A superfície de ataque aumenta quando portas ficam disponíveis para quem não precisa delas.",
        "mitigation": "Inventário, regras restritivas, bastion, VPN bem controlada, private endpoints e monitoramento."
      },
      {
        "name": "Fluxos sem registro",
        "description": "Firewall, DNS, proxy e VPN não registram as conexões, ou os logs não são guardados.",
        "defensiveExplanation": "Sem registro, não dá para reconstruir o que aconteceu num incidente nem comprovar a causa de uma falha.",
        "mitigation": "Logs de firewall, DNS, proxy e VPN, flow logs em cloud e retenção definida."
      }
    ],
    "monitoring": [
      "Logs de firewall e proxy",
      "DNS queries incomuns",
      "Flow logs em cloud",
      "Novos dispositivos na rede"
    ],
    "hardening": [
      "Bloqueio padrão e liberação justificada",
      "MFA em acessos remotos",
      "Administração por redes restritas"
    ],
    "detectionIdeas": [
      "Comparar tráfego atual com baseline",
      "Alertar varreduras internas",
      "Observar tentativas de acesso entre segmentos",
      "Monitorar falhas repetidas de DNS, proxy ou VPN"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma rede não deve ser definida apenas como computadores conectados?",
      "hints": [
        "Pense em protocolos, políticas e serviços.",
        "Pense em cloud e VPN."
      ],
      "expectedIdeas": [
        "meio",
        "endereçamento",
        "protocolos",
        "serviços",
        "políticas",
        "operação",
        "segurança"
      ],
      "explanation": "A definição precisa incluir os elementos que tornam a comunicação útil, controlável e diagnosticável."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário diz que 'a rede caiu'. Quais perguntas você faria antes de mexer em firewall ou roteador?",
      "hints": [
        "Comece pelo escopo.",
        "Separe IP, DNS, gateway, aplicação e usuário."
      ],
      "expectedIdeas": [
        "quem é afetado",
        "qual serviço",
        "IP válido",
        "gateway",
        "DNS",
        "VPN",
        "erro exato",
        "horário"
      ],
      "explanation": "Troubleshooting profissional começa reduzindo ambiguidade."
    },
    {
      "type": "cenário real",
      "question": "Uma clínica tem um computador que só controla um equipamento de exame e não precisa de internet nem de acesso remoto. Faz sentido ligá-lo à rede da clínica por padrão? Quando não vale a pena conectar um sistema?",
      "hints": [
        "Pense no que se ganha e no que se arrisca ao conectar.",
        "Pense em exigências de segurança e de regulação."
      ],
      "expectedIdeas": [
        "conectar só quando há necessidade operacional",
        "cada conexão amplia a superfície de ataque",
        "isolamento exigido por segurança ou regulação",
        "se precisar conectar, segmentar e registrar"
      ],
      "explanation": "A rede existe para atender a uma necessidade de comunicação. Quando ela não existe, ou quando a segurança ou a regulação exigem isolamento, manter o sistema desconectado faz parte do desenho."
    }
  ],
  "quiz": [
    {
      "id": "q1.1.1",
      "question": "Qual definição de rede é mais útil em contexto profissional?",
      "options": [
        "Um conjunto de computadores ligados por cabo ou Wi-Fi.",
        "Um conjunto de dispositivos, meios, protocolos, endereços, serviços e políticas que permite comunicação.",
        "A conexão com a internet fornecida pelo provedor.",
        "O conjunto de switches e roteadores de uma organização."
      ],
      "answer": 1,
      "explanation": "Rede envolve comunicação e controle: além de dispositivos e meio, inclui protocolos, endereços, serviços e políticas. Cabo, internet e equipamentos são só partes dela.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.1.2",
      "question": "Um host tem IP e pinga o gateway, mas não acessa sites por nome. Qual hipótese fica forte?",
      "options": [
        "Cabo de rede rompido.",
        "Host sem endereço IP.",
        "Problema de DNS.",
        "Gateway padrão ausente."
      ],
      "answer": 2,
      "explanation": "Se o host tem IP e o gateway responde, o meio, o endereço e o caminho local funcionam. A falha só por nome aponta para DNS, embora outras hipóteses ainda possam existir.",
      "topic": "dns",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q1.1.3",
      "question": "Por que uma rede plana é arriscada?",
      "options": [
        "Porque um host comprometido pode alcançar muitos outros ativos (movimento lateral).",
        "Porque impede o uso de DHCP e DNS.",
        "Porque exige um roteador para cada dispositivo.",
        "Porque só funciona com cabo, não com Wi-Fi."
      ],
      "answer": 0,
      "explanation": "Numa rede plana, todos os ativos estão no mesmo segmento: um comprometimento alcança mais sistemas e fica difícil aplicar políticas entre grupos de ativos.",
      "topic": "segurança",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q1.1.4",
      "question": "Qual destes é um dispositivo intermediário?",
      "options": [
        "Notebook do usuário",
        "Servidor de arquivos",
        "Impressora de rede",
        "Switch"
      ],
      "answer": 3,
      "explanation": "O switch encaminha a comunicação dentro da rede local. Notebook, servidor e impressora são dispositivos finais: consomem ou oferecem serviços.",
      "topic": "papéis",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.1.5",
      "question": "Em cloud, qual recurso corresponde à própria rede virtual, dividida em subnets?",
      "options": [
        "Security group",
        "VPC ou VNet",
        "NAT gateway",
        "Load balancer"
      ],
      "answer": 1,
      "explanation": "VPC (AWS, Google Cloud) ou VNet (Azure) é a rede virtual. O security group filtra, o NAT gateway dá saída para a internet e o load balancer distribui tráfego.",
      "topic": "cloud",
      "difficulty": "iniciante",
      "type": "cloud"
    },
    {
      "id": "q1.1.6",
      "question": "Um pipeline não consegue baixar uma imagem do registry. Qual conjunto de causas de rede é plausível?",
      "options": [
        "A imagem é grande demais para trafegar pela rede.",
        "Runners não usam DNS, então o nome do registry é irrelevante.",
        "O runner não resolve DNS, está bloqueado por proxy ou firewall, ou não tem rota até o registry.",
        "Registries só aceitam conexões vindas de notebooks de desenvolvedores."
      ],
      "answer": 2,
      "explanation": "Pipelines dependem de rede para DNS, rota, proxy, firewall e TLS até serviços externos ou internos.",
      "topic": "devsecops",
      "difficulty": "iniciante-intermediário",
      "type": "devsecops"
    },
    {
      "id": "q1.1.7",
      "question": "O ping para o servidor de arquivos responde, mas, ao abrir a pasta compartilhada, o usuário recebe “acesso negado”. O que isso indica?",
      "options": [
        "O caminho existe; a falha está na autorização do serviço, não na conectividade.",
        "O cabo do usuário está com defeito.",
        "O DNS não está resolvendo o nome do servidor.",
        "Como o ping respondeu, o acesso deveria estar liberado, então o servidor está com defeito."
      ],
      "answer": 0,
      "explanation": "Ping prova só um tipo de conectividade. “Acesso negado” é uma resposta do próprio serviço: o caminho funciona e a decisão de autorização negou o acesso. Conectividade não é autorização.",
      "topic": "segurança",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.1.1",
      "front": "O que é uma rede?",
      "back": "Um sistema de comunicação entre participantes usando dispositivos, meios, protocolos, endereços, serviços e políticas.",
      "tags": [
        "rede",
        "conceito"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.1.2",
      "front": "Internet e rede são sinônimos?",
      "back": "Não. A internet é uma grande rede de redes. LANs, redes corporativas e redes cloud também são redes.",
      "tags": [
        "internet",
        "lan"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.1.3",
      "front": "O que é um dispositivo final?",
      "back": "É um participante que consome ou oferece serviços, como notebook, celular, servidor, VM, container ou impressora.",
      "tags": [
        "host",
        "endpoint"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.1.4",
      "front": "O que é um dispositivo intermediário?",
      "back": "É um elemento que encaminha, conecta, filtra ou controla tráfego, como switch, roteador, firewall, AP, proxy ou load balancer.",
      "tags": [
        "switch",
        "roteador",
        "firewall"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.1.5",
      "front": "Conectividade significa autorização?",
      "back": "Não. Conectividade é existir caminho técnico; autorização é permissão para acessar um recurso.",
      "tags": [
        "segurança",
        "iam"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.1.6",
      "front": "Por que redes precisam de logs?",
      "back": "Para diagnosticar falhas, investigar incidentes, auditar acessos e entender fluxos reais.",
      "tags": [
        "logs",
        "soc",
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.1.1",
      "type": "conceitual",
      "prompt": "Explique, com suas palavras, por que rede não é apenas internet.",
      "expectedAnswer": "Porque uma rede é qualquer sistema de comunicação entre participantes, incluindo LAN, rede corporativa, rede cloud e internet. Internet é uma rede pública global composta por muitas redes.",
      "explanation": "O objetivo é separar o conceito geral do caso mais famoso."
    },
    {
      "id": "ex1.1.5",
      "type": "diagnóstico",
      "prompt": "Para cada sintoma, indique em qual etapa da cadeia (endereçamento, meio, destino ou controle) você investigaria primeiro: (a) o notebook não tem endereço IP válido; (b) o host pinga 8.8.8.8, mas nenhum site abre por nome; (c) o nome resolve, mas a conexão na porta do serviço é recusada; (d) a conexão abre, mas o sistema responde “acesso negado”; (e) o cabo foi trocado e o LED da placa de rede continua apagado.",
      "expectedAnswer": "(a) Endereçamento: verificar DHCP, cabo, Wi-Fi ou configuração manual. (b) Endereçamento por nome: DNS. (c) Destino: o serviço pode estar parado ou a porta fechada; um firewall no caminho também entra na lista. (d) Controle: autenticação ou autorização; o caminho funciona. (e) Meio: cabo, porta do switch ou placa de rede.",
      "explanation": "O mesmo “não acessa” tem causas em etapas diferentes. Localizar a etapa evita mexer no firewall quando o problema é DNS, ou trocar cabo quando o problema é permissão."
    },
    {
      "id": "ex1.1.3",
      "type": "arquitetura",
      "prompt": "Classifique notebook, switch, roteador, firewall, DNS e aplicação web em papéis de rede.",
      "expectedAnswer": "Notebook: dispositivo final; switch/roteador/firewall: intermediários; DNS e aplicação web: serviços, embora rodem em dispositivos finais/servidores; firewall também aplica política.",
      "explanation": "Alguns elementos têm papéis sobrepostos, mas a classificação ajuda o raciocínio."
    },
    {
      "id": "ex1.1.6",
      "type": "arquitetura",
      "prompt": "Para cada papel, dê um exemplo numa rede doméstica, numa rede corporativa e em cloud: (1) a rede local ou o segmento; (2) quem leva o tráfego para fora da rede local; (3) quem filtra o tráfego.",
      "expectedAnswer": "(1) Casa: o Wi-Fi do roteador; empresa: VLANs e sub-redes; cloud: VPC/VNet e subnets. (2) Casa: o roteador doméstico, que também faz NAT; empresa: roteadores e firewalls; cloud: route table e NAT gateway. (3) Casa: o filtro básico do roteador; empresa: firewalls, proxies e NAC; cloud: security groups, network security groups e firewall gerenciado.",
      "explanation": "Os papéis são os mesmos nos três ambientes; mudam a escala e os nomes. Quem entende o papel reconhece o recurso em qualquer ambiente."
    }
  ],
  "challenge": {
    "title": "Desenhe e explique uma rede pequena",
    "scenario": "Uma pequena empresa tem 8 notebooks, 1 impressora, 1 servidor de arquivos, Wi-Fi de visitantes e acesso à internet. O dono quer colocar tudo no mesmo Wi-Fi porque parece simples.",
    "tasks": [
      "Identificar dispositivos finais e intermediários.",
      "Explicar quais serviços existem ou deveriam existir.",
      "Apontar pelo menos três riscos de colocar tudo junto.",
      "Sugerir uma separação inicial segura.",
      "Indicar quais evidências deveriam ser registradas para troubleshooting."
    ],
    "constraints": [
      "Não usar termos avançados sem explicar.",
      "Não propor produto pago como única solução.",
      "Separar conectividade de autorização.",
      "Pensar em crescimento futuro."
    ],
    "expectedDeliverables": [
      "Mapa textual da rede",
      "Lista de papéis",
      "Tabela de riscos e mitigação",
      "Checklist inicial de diagnóstico"
    ],
    "gradingRubric": [
      {
        "criterion": "Identificação correta dos papéis",
        "points": 25,
        "description": "Diferencia dispositivos finais, intermediários, serviços e políticas."
      },
      {
        "criterion": "Raciocínio de segurança",
        "points": 25,
        "description": "Reconhece riscos de rede plana e propõe segmentação inicial."
      },
      {
        "criterion": "Clareza operacional",
        "points": 25,
        "description": "Inclui evidências e passos de diagnóstico."
      },
      {
        "criterion": "Explicação acessível",
        "points": 25,
        "description": "Explica sem jargão desnecessário e sem simplificar demais."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos quem participa da rede. Depois identificamos quais equipamentos apenas usam serviços, quais encaminham tráfego, quais aplicam política e quais serviços são críticos. Só então falamos em risco e mitigação.",
    "steps": [
      "Listar notebooks, impressora, servidor, roteador, AP e internet.",
      "Classificar notebooks, impressora e servidor como dispositivos finais.",
      "Classificar roteador/AP/switch/firewall como intermediários conforme o ambiente.",
      "Separar visitantes dos recursos internos.",
      "Evitar que Wi-Fi de visitantes alcance servidor de arquivos.",
      "Registrar IPs, gateway, DNS, regras e evidências básicas."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar tudo no mesmo Wi-Fi com uma senha forte.",
        "whyItIsWrong": "Senha forte ajuda no acesso inicial, mas não resolve segmentação, visitantes, movimento lateral ou política interna."
      },
      {
        "answer": "Comprar mais internet resolve segurança.",
        "whyItIsWrong": "Banda não substitui arquitetura, segmentação, logs ou controle de acesso."
      },
      {
        "answer": "Se pinga, está autorizado.",
        "whyItIsWrong": "Ping só indica um tipo limitado de conectividade; autorização é outra camada de decisão."
      }
    ],
    "finalAnswer": "Uma solução inicial aceitável separa rede corporativa, servidores/impressora e visitantes; documenta gateway, DNS, regras e responsáveis; registra evidências básicas; e evita que visitantes alcancem recursos internos. A rede deve ser explicada como sistema de comunicação com controle, não como um Wi-Fi único."
  },
  "glossary": [
    {
      "term": "Rede",
      "shortDefinition": "Sistema que permite comunicação entre participantes.",
      "longDefinition": "Conjunto de dispositivos, meios, protocolos, endereços, serviços e políticas que viabiliza troca de dados.",
      "example": "Uma LAN doméstica, uma rede corporativa e uma VPC em cloud são redes.",
      "relatedTerms": [
        "LAN",
        "WAN",
        "protocolo",
        "gateway"
      ],
      "relatedLessons": [
        "1.1",
        "1.3",
        "2.1"
      ]
    },
    {
      "term": "Dispositivo final",
      "shortDefinition": "Participante que consome ou oferece serviços na rede.",
      "longDefinition": "Endpoint como notebook, celular, servidor, VM, container, impressora ou câmera.",
      "example": "Um notebook acessando um sistema web é um dispositivo final.",
      "relatedTerms": [
        "host",
        "endpoint",
        "servidor"
      ],
      "relatedLessons": [
        "1.2"
      ]
    },
    {
      "term": "Dispositivo intermediário",
      "shortDefinition": "Elemento que conecta, encaminha, filtra ou controla tráfego.",
      "longDefinition": "Switches, roteadores, firewalls, APs, proxies e load balancers são exemplos.",
      "example": "Um roteador encaminha tráfego entre redes diferentes.",
      "relatedTerms": [
        "switch",
        "roteador",
        "firewall"
      ],
      "relatedLessons": [
        "1.2",
        "1.7"
      ]
    },
    {
      "term": "Conectividade",
      "shortDefinition": "Capacidade de alcançar tecnicamente outro destino.",
      "longDefinition": "Conectividade indica caminho de comunicação, mas não prova autorização nem funcionamento completo do serviço.",
      "example": "Ping para o gateway mostra um tipo de conectividade local.",
      "relatedTerms": [
        "rota",
        "gateway",
        "latência"
      ],
      "relatedLessons": [
        "0.8",
        "1.9"
      ]
    },
    {
      "term": "Política de rede",
      "shortDefinition": "Regra que permite, bloqueia, registra ou modifica fluxos.",
      "longDefinition": "Pode existir em firewall, proxy, security group, ACL, NAC, VPN ou controle cloud.",
      "example": "Permitir HTTPS da rede de usuários para um proxy corporativo.",
      "relatedTerms": [
        "firewall",
        "ACL",
        "security group"
      ],
      "relatedLessons": [
        "9.1",
        "14.3"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Módulo 0 — Fundamentos da Computação",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para bits, sinais, protocolos, métricas e pensamento em camadas."
    },
    {
      "type": "standard",
      "title": "Modelo OSI — referência conceitual para camadas",
      "organization": "ISO",
      "url": "",
      "note": "Será aprofundado no Módulo 2."
    },
    {
      "type": "official-doc",
      "title": "Documentação de redes virtuais em cloud",
      "organization": "AWS/Azure/Google Cloud",
      "url": "",
      "note": "Usar pesquisa oficial quando o curso chegar ao módulo de Cloud Networking."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Fundamentos de infraestrutura",
      "lesson": "Redes em ambientes automatizados",
      "reason": "Pipelines, runners, Kubernetes e IaC dependem de conectividade, DNS, rotas e políticas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Fundamentos de identidade",
      "lesson": "Autenticação, autorização e federação",
      "reason": "Conectividade não substitui autorização; IAM depende de protocolos de rede seguros."
    }
  ],
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
      "1.2"
    ]
  }
};
