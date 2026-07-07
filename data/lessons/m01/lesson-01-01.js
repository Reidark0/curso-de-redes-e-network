export const lesson0101 = {
  "id": "1.1",
  "moduleId": "m01",
  "order": 1,
  "title": "O que é uma rede e por que existe",
  "subtitle": "A rede como resposta ao problema de compartilhar informação, serviços e recursos entre computadores, pessoas, sistemas e organizações.",
  "duration": "75-105 min",
  "estimatedStudyTimeMinutes": 105,
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
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine uma empresa pequena onde cada computador trabalha isolado. Um funcionário cria uma planilha no próprio notebook, outro precisa imprimir um contrato, o financeiro precisa acessar um sistema, o suporte precisa atualizar uma máquina e o time de segurança precisa investigar um alerta. Sem rede, cada troca dependeria de pendrive, deslocamento físico, cópia manual ou exposição direta de serviços sem controle.</p>\n  <p>Uma rede existe para resolver um problema central: permitir que entidades diferentes compartilhem informações, serviços e recursos de forma previsível. Essa frase parece simples, mas dentro dela existem quase todos os temas que serão estudados no curso: endereçamento, meio físico, protocolos, roteamento, nomes, portas, criptografia, controle de acesso, segmentação, logs, troubleshooting e custo operacional.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> quando alguém diz “a rede caiu”, raramente está dizendo algo preciso. Pode ser cabo, Wi-Fi, DHCP, DNS, gateway, firewall, proxy, autenticação, certificado, servidor, rota, política cloud ou aplicação. A primeira habilidade profissional é entender o que uma rede é para conseguir separar esses componentes.</div>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>No início da computação moderna, computadores eram máquinas isoladas, caras e centralizadas. O compartilhamento de dados acontecia por cartões perfurados, fitas, discos ou acesso local ao mesmo sistema. À medida que universidades, empresas e órgãos militares passaram a usar computadores para pesquisa e operação, surgiu uma necessidade prática: fazer máquinas diferentes conversarem.</p>\n  <p>As primeiras redes não nasceram para “ter internet”. Elas nasceram para compartilhar recursos caros, como processamento, armazenamento, impressoras e terminais. Depois vieram redes locais em escritórios, interconexão entre filiais, redes acadêmicas, redes públicas, provedores, internet comercial, datacenters, redes móveis, cloud e redes definidas por software.</p>\n  <p>A história das redes é a história da escala: primeiro conectar poucos equipamentos próximos; depois conectar prédios; depois cidades; depois países; depois serviços globais; e agora conectar usuários, APIs, containers, funções serverless, dispositivos IoT, identidades e ambientes híbridos.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema que uma rede resolve não é apenas “ligar computadores”. O problema é criar um sistema compartilhado de comunicação entre participantes que podem estar em lugares diferentes, usar tecnologias diferentes, pertencer a organizações diferentes e exigir níveis diferentes de confiança.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Compartilhamento:</strong> usuários precisam acessar arquivos, impressoras, sistemas, bancos de dados e aplicações.</li>\n    <li><strong>Comunicação:</strong> máquinas precisam trocar mensagens em formatos compreensíveis.</li>\n    <li><strong>Escala:</strong> a solução precisa funcionar para dois dispositivos, cem usuários, milhares de servidores ou milhões de clientes.</li>\n    <li><strong>Controle:</strong> nem todo mundo deve acessar tudo; conectividade não é autorização.</li>\n    <li><strong>Operação:</strong> quando algo falha, alguém precisa diagnosticar sem adivinhar.</li>\n    <li><strong>Segurança:</strong> a mesma rede que permite colaboração também pode permitir abuso, movimento lateral e vazamento.</li>\n  </ul>\n  <p>Sem uma rede bem projetada, a empresa cria ilhas de informação. Com uma rede mal projetada, ela cria uma superfície de ataque enorme. O objetivo não é apenas conectar; é conectar com propósito, controle, observabilidade e capacidade de manutenção.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução das redes pode ser vista como uma sequência de respostas para problemas cada vez maiores. Primeiro era preciso compartilhar recursos próximos. Depois foi necessário conectar redes diferentes. Depois surgiu a necessidade de padronização global. Em seguida, segurança, mobilidade, cloud e automação mudaram novamente a forma de pensar redes.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Fase</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Computadores isolados</td><td>Cada máquina guardava seus próprios dados.</td><td>Baixo compartilhamento e muita cópia manual.</td><td>Redes locais e terminais.</td></tr>\n      <tr><td>Redes locais</td><td>Equipamentos próximos compartilhavam serviços.</td><td>Dificuldade de conectar filiais e outras organizações.</td><td>Roteamento e redes de longa distância.</td></tr>\n      <tr><td>Internet</td><td>Redes diferentes passaram a se interconectar por padrões comuns.</td><td>Exposição, escala, endereçamento e segurança viraram desafios.</td><td>Firewalls, NAT, DNS, TLS, VPN e políticas.</td></tr>\n      <tr><td>Cloud e mobilidade</td><td>Usuários, aplicações e dados deixaram de estar apenas no escritório.</td><td>Perímetro tradicional ficou insuficiente.</td><td>Zero Trust, SDN, SASE, IaC e observabilidade.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Uma rede de computadores é um conjunto de dispositivos, meios de comunicação, protocolos, endereços, serviços e políticas que permite a troca de informações entre participantes.</p>\n  <div class=\"definition-box\"><strong>Definição operacional:</strong> rede é o sistema que permite que um dispositivo envie dados para outro, diretamente ou por intermediários, usando regras comuns de comunicação e controles que determinam o que é permitido, observado e protegido.</div>\n  <p>Essa definição é mais útil do que dizer apenas “rede é um conjunto de computadores conectados”, porque inclui elementos que aparecem no trabalho real: o cabo ou Wi-Fi, a placa de rede, o switch, o roteador, o IP, o DNS, o firewall, a aplicação, a identidade, a política e os logs.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Quando um computador acessa um serviço, muita coisa acontece em sequência. Mesmo antes de estudar cada protocolo em detalhe, o aluno precisa enxergar a rede como uma cadeia de decisões.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Origem:</strong> uma aplicação decide enviar dados, como abrir um site ou acessar um compartilhamento.</li>\n    <li><strong>Formato:</strong> os dados precisam obedecer a um protocolo, como HTTP, SMB, DNS ou outro.</li>\n    <li><strong>Endereçamento:</strong> o sistema precisa descobrir para onde enviar os dados.</li>\n    <li><strong>Encapsulamento:</strong> os dados recebem informações de transporte, rede e enlace.</li>\n    <li><strong>Meio:</strong> os bits viram sinais elétricos, luz ou rádio.</li>\n    <li><strong>Intermediários:</strong> switches, roteadores, firewalls, proxies e balanceadores tomam decisões.</li>\n    <li><strong>Destino:</strong> o serviço recebe, interpreta e responde.</li>\n    <li><strong>Controle:</strong> políticas de segurança podem permitir, bloquear, registrar ou modificar o fluxo.</li>\n  </ol>\n  <p>Esse fluxo mostra por que uma rede não é um único componente. Ela é uma sequência de dependências. Quando uma dependência falha, o sintoma aparece como “não acessa”, mas a causa pode estar em qualquer ponto do caminho.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Dentro de uma arquitetura de rede, alguns papéis aparecem repetidamente.</p>\n  <ul>\n    <li><strong>Dispositivos finais:</strong> notebooks, celulares, servidores, impressoras, câmeras, containers, VMs e aplicações.</li>\n    <li><strong>Dispositivos intermediários:</strong> switches, roteadores, firewalls, access points, proxies, load balancers e gateways.</li>\n    <li><strong>Meios de transmissão:</strong> cobre, fibra, rádio, links virtuais, túneis e backbones.</li>\n    <li><strong>Protocolos:</strong> regras que definem formato, ordem, erro, estado e interpretação.</li>\n    <li><strong>Serviços essenciais:</strong> DHCP, DNS, NTP, diretórios, autenticação e observabilidade.</li>\n    <li><strong>Políticas:</strong> regras de firewall, segmentação, roteamento, autenticação, autorização e auditoria.</li>\n  </ul>\n  <p>Em cloud, esses papéis continuam existindo, mas aparecem com outros nomes: VPC/VNet, subnet, route table, security group, network security group, NAT gateway, private endpoint, load balancer, peering e firewall gerenciado.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma rede como o sistema de circulação de uma cidade. Existem casas e prédios, ruas, placas, cruzamentos, regras de trânsito, pedágios, bloqueios, mapas, fiscais e câmeras. Um endereço informa para onde ir. As ruas permitem deslocamento. As regras dizem o que pode passar. Os fiscais registram ou bloqueiam comportamentos.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes, os dados são quebrados em unidades, encapsulados, roteados, filtrados, retransmitidos, criptografados e reconstruídos. Uma cidade ajuda a imaginar caminhos e regras, mas não representa perfeitamente pacotes, estados de conexão, DNS, NAT, TLS ou autenticação.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, seu celular se conecta ao Wi-Fi. O access point fornece acesso ao roteador. O roteador entrega um endereço IP ao celular, encaminha tráfego para a internet e normalmente também faz NAT. Quando você abre um site, seu celular usa DNS para descobrir o endereço do servidor, cria uma conexão, negocia segurança e recebe dados.</p>\n  <p>Mesmo em uma rede doméstica simples, já existem vários conceitos: rádio, senha Wi-Fi, endereço IP, gateway, DNS, roteamento, NAT, protocolo, criptografia e política básica.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, a rede precisa separar usuários, servidores, visitantes, telefonia, câmeras, impressoras e administração. Um notebook corporativo pode precisar acessar internet, sistema interno, servidor de arquivos, VPN, diretório, ferramenta de EDR, proxy e SIEM. Cada acesso envolve caminho, política, identidade e registro.</p>\n  <p>Por isso, redes corporativas usam VLANs, sub-redes, roteadores, firewalls, proxies, NAC, VPN, DNS interno, DHCP controlado, logs e monitoramento. A rede é parte da operação e também parte da segurança.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Na cloud, a rede deixa de ser um armário com cabos visíveis e passa a ser definida por software. Ainda assim, o raciocínio continua: existem redes virtuais, sub-redes, rotas, filtros, gateways, balanceadores, endpoints privados e logs de fluxo.</p>\n  <p>Uma aplicação em uma subnet privada pode precisar acessar um banco por private endpoint, sair para a internet por NAT gateway, receber tráfego por load balancer e ser protegida por security groups. O erro de arquitetura pode gerar indisponibilidade, exposição indevida ou custo alto de tráfego.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, redes aparecem em pipelines, runners, registry, clusters Kubernetes, webhooks, scanners, repositórios, artefatos, secrets e ambientes de deploy. Um pipeline pode falhar porque o runner não resolve DNS, não alcança o registry, está bloqueado por proxy ou não tem rota para um cluster privado.</p>\n  <p>Infraestrutura como código também cria redes: VPCs, subnets, route tables, security groups e firewalls. Um erro em uma regra pode abrir demais, bloquear deploy ou impedir observabilidade. Portanto, quem automatiza infraestrutura precisa entender redes para não transformar YAML em risco operacional.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, rede é superfície de ataque, caminho de movimento lateral, fonte de evidência e ponto de controle. Uma rede plana permite que um host comprometido tente alcançar muitos sistemas. Uma rede segmentada reduz impacto, mas exige regras bem mantidas e logs úteis.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Rede plana</td><td>Todos os ativos no mesmo segmento.</td><td>Movimento lateral facilitado.</td><td>Segmentação, firewall interno, ACLs e menor privilégio.</td></tr>\n      <tr><td>Serviço exposto</td><td>Porta acessível sem necessidade.</td><td>Exploração, varredura e vazamento.</td><td>Inventário, regras restritivas e monitoramento.</td></tr>\n      <tr><td>Falta de logs</td><td>Fluxos não registrados.</td><td>Investigação fraca.</td><td>Logs de firewall, DNS, proxy, VPN e flow logs.</td></tr>\n      <tr><td>Confundir conectividade com autorização</td><td>“Pingou, então pode acessar”.</td><td>Decisões inseguras.</td><td>Separar rede, autenticação, autorização e auditoria.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra que uma rede não é apenas um cabo. Ela combina participantes, intermediários, meio, endereçamento, protocolos, políticas e serviços.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 460\" role=\"img\" aria-labelledby=\"m01l01-title m01l01-desc\">\n  <title id=\"m01l01-title\">Uma rede como sistema de comunicação entre dispositivos</title>\n  <desc id=\"m01l01-desc\">Diagrama mostrando dois dispositivos finais, um switch, um roteador, um serviço interno e uma nuvem externa, destacando endereçamento, meio físico, protocolo, política e observabilidade.</desc>\n  <defs>\n    <marker id=\"m01l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n      <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n    </marker>\n  </defs>\n  <rect x=\"35\" y=\"70\" width=\"170\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"120\" y=\"106\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n  <text x=\"120\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dispositivo final</text>\n\n  <rect x=\"35\" y=\"270\" width=\"170\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"120\" y=\"306\" text-anchor=\"middle\" class=\"svg-label\">Celular</text>\n  <text x=\"120\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi / usuário</text>\n\n  <rect x=\"285\" y=\"170\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"365\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Switch/AP</text>\n  <text x=\"365\" y=\"232\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Conecta a rede local</text>\n\n  <rect x=\"525\" y=\"170\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"605\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text>\n  <text x=\"605\" y=\"232\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Encaminha redes</text>\n\n  <rect x=\"760\" y=\"70\" width=\"180\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"850\" y=\"106\" text-anchor=\"middle\" class=\"svg-label\">Servidor interno</text>\n  <text x=\"850\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Arquivo / app / AD</text>\n\n  <rect x=\"760\" y=\"270\" width=\"180\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n  <text x=\"850\" y=\"306\" text-anchor=\"middle\" class=\"svg-label\">Internet / Cloud</text>\n  <text x=\"850\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SaaS / API / VPC</text>\n\n  <line x1=\"205\" y1=\"111\" x2=\"285\" y2=\"194\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"205\" y1=\"311\" x2=\"285\" y2=\"236\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"445\" y1=\"215\" x2=\"525\" y2=\"215\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"685\" y1=\"195\" x2=\"760\" y2=\"125\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"685\" y1=\"235\" x2=\"760\" y2=\"300\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n\n  <rect x=\"250\" y=\"380\" width=\"480\" height=\"52\" rx=\"12\" class=\"svg-boundary\" />\n  <text x=\"490\" y=\"412\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rede = dispositivos + meio + endereços + protocolos + políticas + operação</text>\n\n  <text x=\"350\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">LAN</text>\n  <text x=\"610\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Gateway</text>\n  <text x=\"850\" y=\"245\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Fora da rede local</text>\n</svg>\n</section>\n",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios forçam você a produzir explicações, não apenas reconhecer definições. A habilidade desejada é separar dispositivo, meio, protocolo, endereço, política e serviço.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma tarefa comum em TI: explicar para outra pessoa como a rede de um pequeno ambiente funciona e onde estão os riscos iniciais.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada ensina a raciocinar com camadas e papéis. O importante não é desenhar bonito; é explicar corretamente o que cada elemento faz.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> rede é um sistema de comunicação entre participantes, não apenas cabo ou Wi-Fi.</li>\n    <li><strong>O que lembrar:</strong> toda rede envolve dispositivos, meio, endereços, protocolos, serviços, políticas e operação.</li>\n    <li><strong>Erro comum:</strong> dizer “a rede caiu” sem separar onde o problema pode estar.</li>\n    <li><strong>Uso real:</strong> redes sustentam acesso corporativo, cloud, pipelines, IAM, SOC, monitoramento e resposta a incidentes.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Agora que você entende o que é uma rede e por que ela existe, a próxima aula separa os participantes dessa rede: dispositivos finais, dispositivos intermediários e serviços. Isso prepara o aluno para entender switches, roteadores, access points, firewalls, servidores e aplicações sem misturar seus papéis.</p>\n</section>\n"
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
  "deepDive": {
    "mentalModel": "Rede é uma cadeia de comunicação: origem, dados, protocolo, endereço, meio, intermediários, destino, política e evidência.",
    "keyTerms": [
      "rede",
      "nó",
      "host",
      "serviço",
      "meio de transmissão",
      "protocolo",
      "endereçamento",
      "política",
      "observabilidade"
    ],
    "limitations": [
      "Uma rede não garante que o serviço esteja funcionando.",
      "Conectividade não significa autorização.",
      "Mais velocidade nominal não corrige todos os problemas.",
      "Cloud abstrai o cabo, mas não elimina redes."
    ],
    "whenToUse": [
      "Quando dispositivos precisam compartilhar dados ou serviços.",
      "Quando aplicações precisam se comunicar.",
      "Quando equipes precisam centralizar recursos e controle.",
      "Quando ambientes locais e cloud precisam se integrar."
    ],
    "whenNotToUse": [
      "Quando um sistema isolado é exigido por segurança ou regulação.",
      "Quando conectar algo aumenta risco sem necessidade operacional.",
      "Quando um recurso pode ser mantido offline por desenho de segurança."
    ],
    "operationalImpact": [
      "Redes exigem documentação, monitoramento, troubleshooting e controle de mudanças.",
      "Quanto mais interdependências, maior a necessidade de observabilidade e padronização."
    ],
    "financialImpact": [
      "Redes podem exigir switches, roteadores, firewalls, access points, links, licenças e equipe especializada.",
      "Em cloud, tráfego, NAT gateway, firewalls gerenciados, load balancers e flow logs podem gerar custo recorrente."
    ],
    "securityImpact": [
      "Redes ampliam superfície de ataque quando mal segmentadas.",
      "Redes bem projetadas reduzem movimento lateral e melhoram detecção."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que rede é só internet.",
      "whyItHappens": "No uso doméstico, a rede costuma ser percebida apenas quando a internet falha.",
      "consequence": "O aluno ignora LAN, DNS, gateway, firewall e serviços internos.",
      "correction": "Internet é uma rede de redes; sua LAN e sua rede corporativa também são redes."
    },
    {
      "mistake": "Confundir conectividade com permissão.",
      "whyItHappens": "Muitos testes começam com ping ou acesso a porta.",
      "consequence": "A pessoa conclui que acesso deve ser liberado apenas porque o caminho existe.",
      "correction": "Conectividade é caminho; autorização é decisão de acesso."
    },
    {
      "mistake": "Chamar tudo de problema de rede.",
      "whyItHappens": "O sintoma aparece como indisponibilidade para o usuário.",
      "consequence": "Troubleshooting vira tentativa e erro.",
      "correction": "Separar dispositivo, meio, endereço, protocolo, serviço, identidade e política."
    }
  ],
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
      }
    ],
    "monitoring": [
      "Logs de firewall e proxy",
      "DNS queries incomuns",
      "Flow logs em cloud",
      "Conexões laterais inesperadas",
      "Novos dispositivos na rede"
    ],
    "hardening": [
      "Segmentação por função",
      "Bloqueio padrão e liberação justificada",
      "MFA em acessos remotos",
      "Administração por redes restritas",
      "Inventário e controle de mudanças"
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
      "question": "Uma empresa quer colocar todos os servidores e usuários na mesma rede para simplificar. Qual é o risco?",
      "hints": [
        "Pense em movimento lateral.",
        "Pense em regras e logs."
      ],
      "expectedIdeas": [
        "rede plana",
        "movimento lateral",
        "blast radius",
        "segmentação",
        "firewall interno",
        "monitoramento"
      ],
      "explanation": "Simplicidade sem controle pode aumentar impacto de incidentes."
    }
  ],
  "quiz": [
    {
      "id": "q1.1.1",
      "type": "conceito",
      "q": "Qual definição é mais útil para uma rede em contexto profissional?",
      "opts": [
        "Um conjunto de dispositivos, meios, protocolos, endereços, serviços e políticas que permite comunicação.",
        "Apenas o cabo que liga computadores.",
        "Apenas a internet fornecida pelo provedor.",
        "Qualquer computador com Wi-Fi ligado."
      ],
      "a": 0,
      "exp": "Rede envolve comunicação e controle, não apenas o meio físico ou a internet.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q1.1.2",
      "type": "diagnóstico",
      "q": "Um host tem IP e pinga o gateway, mas não acessa sites por nome. Qual hipótese fica forte?",
      "opts": [
        "Problema de DNS.",
        "Cabo necessariamente rompido.",
        "Fonte do monitor queimada.",
        "Switch inexistente."
      ],
      "a": 0,
      "exp": "Se o gateway responde, conectividade local existe. Falha por nome sugere DNS, embora outras hipóteses ainda possam existir.",
      "difficulty": "iniciante",
      "topic": "dns"
    },
    {
      "id": "q1.1.3",
      "type": "segurança",
      "q": "Por que rede plana é arriscada?",
      "opts": [
        "Porque facilita movimento lateral entre ativos.",
        "Porque sempre impede acesso à internet.",
        "Porque elimina a necessidade de firewall.",
        "Porque reduz todos os custos a zero."
      ],
      "a": 0,
      "exp": "Rede plana amplia o alcance de um comprometimento e dificulta políticas finas.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q1.1.4",
      "type": "comparação",
      "q": "Qual item é um dispositivo intermediário?",
      "opts": [
        "Switch",
        "Notebook do usuário",
        "Arquivo PDF",
        "Senha do Wi-Fi"
      ],
      "a": 0,
      "exp": "Switch encaminha comunicação dentro da rede; notebook é dispositivo final.",
      "difficulty": "iniciante",
      "topic": "papéis"
    },
    {
      "id": "q1.1.5",
      "type": "cloud",
      "q": "Em cloud, qual recurso se aproxima de uma rede virtual?",
      "opts": [
        "VPC ou VNet",
        "Planilha local",
        "Teclado USB",
        "Arquivo Base64"
      ],
      "a": 0,
      "exp": "VPC/VNet representam redes virtuais em provedores cloud.",
      "difficulty": "iniciante",
      "topic": "cloud"
    },
    {
      "id": "q1.1.6",
      "type": "devsecops",
      "q": "Um pipeline não consegue baixar uma imagem do registry. Qual causa de rede é plausível?",
      "opts": [
        "DNS, proxy, firewall ou rota bloqueando o acesso.",
        "O conceito de byte deixou de existir.",
        "O monitor não suporta 4K.",
        "O usuário digitou um emoji."
      ],
      "a": 0,
      "exp": "Pipelines dependem de rede para DNS, conexão, proxy, TLS e acesso a serviços externos ou internos.",
      "difficulty": "iniciante-intermediário",
      "topic": "devsecops"
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
      "id": "ex1.1.2",
      "type": "diagnóstico",
      "prompt": "Liste cinco perguntas que você faria quando alguém diz 'a rede caiu'.",
      "expectedAnswer": "Quem é afetado? Qual serviço falha? O dispositivo tem IP? O gateway responde? DNS resolve? Há VPN/proxy? Qual erro aparece? Quando começou?",
      "explanation": "Perguntas reduzem ambiguidade e evitam tentativa e erro."
    },
    {
      "id": "ex1.1.3",
      "type": "arquitetura",
      "prompt": "Classifique notebook, switch, roteador, firewall, DNS e aplicação web em papéis de rede.",
      "expectedAnswer": "Notebook: dispositivo final; switch/roteador/firewall: intermediários; DNS e aplicação web: serviços, embora rodem em dispositivos finais/servidores; firewall também aplica política.",
      "explanation": "Alguns elementos têm papéis sobrepostos, mas a classificação ajuda o raciocínio."
    },
    {
      "id": "ex1.1.4",
      "type": "segurança",
      "prompt": "Por que uma rede que conecta tudo com tudo pode parecer eficiente, mas ser perigosa?",
      "expectedAnswer": "Porque reduz barreiras internas e facilita movimento lateral, acesso indevido e propagação de incidentes. Segmentação e políticas reduzem impacto.",
      "explanation": "Eficiência operacional sem controle pode aumentar risco."
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
