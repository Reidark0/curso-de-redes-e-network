export const lesson0102 = {
  "id": "1.2",
  "moduleId": "m01",
  "order": 2,
  "title": "Dispositivos finais, intermediários e serviços",
  "subtitle": "Como separar quem usa a rede, quem transporta a comunicação e qual função está sendo oferecida.",
  "duration": "75-105 min",
  "estimatedStudyTimeMinutes": 105,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 185,
  "tags": [
    "redes",
    "fundamentos",
    "hosts",
    "switch",
    "roteador",
    "firewall",
    "serviços",
    "inventário",
    "segurança",
    "troubleshooting",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.1",
      "reason": "A aula 1.1 define rede como sistema de comunicação. Agora a rede será decomposta em papéis: finais, intermediários e serviços."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "A classificação por papéis usa o pensamento em camadas e a separação entre dispositivo, protocolo, meio, serviço e política."
    }
  ],
  "objectives": [
    "Diferenciar dispositivo final, dispositivo intermediário e serviço de rede.",
    "Entender que um mesmo equipamento pode exercer mais de um papel dependendo do contexto.",
    "Mapear um fluxo simples identificando origem, intermediários, destino e serviço envolvido.",
    "Relacionar esses papéis com inventário, troubleshooting, segurança e cloud.",
    "Evitar confusões comuns como tratar servidor e serviço como a mesma coisa."
  ],
  "learningOutcomes": [
    "Dado um cenário de rede doméstica ou corporativa, o aluno classifica os elementos em dispositivos finais, intermediários e serviços.",
    "Dado um sintoma de falha, o aluno identifica se a suspeita inicial está no host, no intermediário, no serviço, no nome, na porta ou na política.",
    "Dado um desenho de cloud, o aluno reconhece equivalentes como VM, load balancer, security group, NAT gateway, private endpoint e serviço gerenciado."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Depois de entender que uma rede existe para permitir comunicação, o próximo problema é saber quem faz o quê dentro dela. Em um chamado real, o usuário diz: “não consigo acessar o sistema”. Essa frase não diz se o problema está no notebook, no Wi-Fi, no switch, no roteador, no firewall, no DNS, no servidor, na aplicação, no banco de dados, na autenticação ou na política de acesso.</p>\n  <p>Classificar os elementos de uma rede em <strong>dispositivos finais</strong>, <strong>dispositivos intermediários</strong> e <strong>serviços</strong> cria uma primeira bússola mental. Sem essa bússola, o diagnóstico vira tentativa e erro. Com ela, você começa a perguntar: quem iniciou a comunicação? Quem deveria responder? Por quais equipamentos o tráfego passou? Qual serviço estava sendo consumido? Qual política poderia bloquear?</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma impressora de rede, um servidor, um firewall, um access point e um DNS aparecem todos como “coisas da rede”, mas eles têm papéis diferentes. Confundir esses papéis leva a troubleshooting ruim, inventário incompleto e decisões fracas de segurança.</div>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Nas primeiras redes, a distinção entre papéis era mais simples. Havia terminais, mainframes, enlaces e alguns equipamentos de interconexão. Com o crescimento das redes locais, surgiram placas de rede, hubs, switches, roteadores, servidores de arquivos, servidores de impressão e serviços como DNS e DHCP. A rede deixou de ser apenas o cabo entre dois pontos e passou a ser um ecossistema.</p>\n  <p>Depois, a internet e os datacenters ampliaram a complexidade. Firewalls, proxies, balanceadores, concentradores VPN, sistemas de diretório, servidores web, bancos de dados, appliances de segurança, controladoras Wi-Fi e ferramentas de monitoramento passaram a participar do caminho.</p>\n  <p>Na cloud, alguns desses papéis viraram serviços gerenciados: load balancer, NAT gateway, DNS privado, firewall gerenciado, service endpoint, private endpoint, route table, security group e identities. A aparência mudou, mas a pergunta continua a mesma: quem consome, quem encaminha, quem aplica política e qual função está sendo entregue?</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é que uma comunicação de rede envolve vários componentes com responsabilidades diferentes. Se todos forem chamados apenas de “rede”, a investigação perde precisão.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Dispositivo final:</strong> normalmente inicia ou recebe a comunicação. Exemplos: notebook, celular, servidor, impressora, câmera, VM, container ou workload.</li>\n    <li><strong>Dispositivo intermediário:</strong> encaminha, comuta, filtra, traduz, concentra ou inspeciona tráfego. Exemplos: switch, roteador, firewall, AP, proxy, balanceador e gateway.</li>\n    <li><strong>Serviço:</strong> função acessível pela rede. Exemplos: DNS, DHCP, HTTP, SSH, SMB, RDP, banco de dados, Active Directory, API e registry de containers.</li>\n  </ul>\n  <p>Sem essa separação, uma pessoa pode reiniciar um servidor quando o problema era DNS, trocar cabo quando o problema era autorização, culpar o firewall quando o serviço não estava escutando ou liberar uma regra ampla quando bastava corrigir o endereço de destino.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A forma de classificar elementos evoluiu conforme as redes ficaram mais complexas. Em redes pequenas, a topologia parecia simples. Em ambientes modernos, um único fluxo pode atravessar Wi-Fi, switch, firewall, VPN, balanceador, proxy, cluster Kubernetes, serviço interno e banco de dados.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Época/ambiente</th><th>Elementos comuns</th><th>Limitação da visão simples</th><th>Visão profissional</th></tr></thead>\n    <tbody>\n      <tr><td>Rede doméstica</td><td>Celular, notebook, roteador Wi-Fi, internet</td><td>O roteador parece fazer tudo</td><td>Separar cliente, AP, roteador, DNS, NAT e provedor</td></tr>\n      <tr><td>LAN corporativa</td><td>Estações, switches, servidores, impressoras</td><td>Servidores e serviços são confundidos</td><td>Inventariar hosts, portas, serviços e dependências</td></tr>\n      <tr><td>Datacenter</td><td>Firewalls, balanceadores, servidores, storage</td><td>O caminho fica invisível para o usuário</td><td>Mapear fluxo, zonas, regras, logs e pontos de falha</td></tr>\n      <tr><td>Cloud</td><td>VMs, subnets, load balancer, NAT, security group</td><td>A ausência de cabos dá falsa impressão de simplicidade</td><td>Traduzir papéis físicos para serviços virtuais e políticas</td></tr>\n      <tr><td>DevSecOps</td><td>Runner, registry, cluster, API, secrets, proxy</td><td>Falhas de rede são vistas como falhas do pipeline</td><td>Separar workload, serviço, identidade, rota, DNS e firewall</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Em redes, classificar papéis significa entender a responsabilidade de cada elemento no fluxo de comunicação.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> dispositivo final é uma origem ou destino de comunicação; dispositivo intermediário é um elemento que encaminha, conecta, filtra, traduz ou inspeciona tráfego; serviço é uma função exposta pela rede para ser consumida por clientes ou outros sistemas.</div>\n  <p>A classificação não é uma prisão rígida. Um servidor é dispositivo final quando recebe tráfego, mas também hospeda serviços. Um firewall é intermediário para o tráfego dos outros, mas tem serviços próprios de administração. Um access point é intermediário para clientes Wi-Fi, mas também pode oferecer interface de gerenciamento, logs e autenticação.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Quando um notebook acessa uma aplicação interna, a comunicação pode ser descrita em papéis. O notebook é o cliente. O serviço pode ser uma aplicação web. O servidor, VM ou container hospeda esse serviço. Switches comutam quadros dentro da rede local. Roteadores encaminham entre redes. Firewalls verificam política. DNS traduz nome para endereço. Um balanceador pode distribuir a requisição. Logs registram partes do caminho.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Cliente inicia:</strong> uma aplicação no dispositivo final gera a requisição.</li>\n    <li><strong>Nome é resolvido:</strong> um serviço de DNS pode traduzir o nome para IP.</li>\n    <li><strong>Tráfego sai do host:</strong> a placa de rede envia sinais pelo meio físico ou sem fio.</li>\n    <li><strong>Intermediários encaminham:</strong> switch, AP, roteador ou firewall movem o tráfego até o destino.</li>\n    <li><strong>Políticas são aplicadas:</strong> firewalls, ACLs, proxies, security groups ou WAFs podem permitir, negar ou registrar.</li>\n    <li><strong>Serviço responde:</strong> a aplicação ou serviço escuta em uma porta e processa a solicitação.</li>\n    <li><strong>Evidências são geradas:</strong> logs, tabelas ARP, conexões, eventos de firewall e métricas ajudam a diagnosticar.</li>\n  </ol>\n  <p>Essa decomposição evita uma armadilha comum: achar que “o servidor está fora” apenas porque um serviço não responde. O host pode estar vivo, mas o processo pode estar parado, a porta pode estar fechada, a rota pode estar errada, o DNS pode apontar para outro IP ou uma política pode estar bloqueando.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura real, os papéis aparecem juntos. O aluno deve aprender a desenhar o fluxo e anotar o papel de cada componente.</p>\n  <table class=\"data-table\">\n    <thead><tr><th>Papel</th><th>Função principal</th><th>Exemplos</th><th>O que observar</th></tr></thead>\n    <tbody>\n      <tr><td>Dispositivo final</td><td>Origem ou destino</td><td>Notebook, servidor, celular, VM, container, impressora</td><td>IP, MAC, interface, sistema, agente, credenciais, portas locais</td></tr>\n      <tr><td>Intermediário</td><td>Encaminhar, comutar, filtrar, traduzir ou inspecionar</td><td>Switch, roteador, firewall, AP, proxy, NAT, load balancer</td><td>Tabelas, rotas, VLANs, regras, logs, estado da interface</td></tr>\n      <tr><td>Serviço</td><td>Entregar uma função acessível</td><td>DNS, DHCP, HTTP, SSH, SMB, AD, API, banco, registry</td><td>Nome, IP, porta, protocolo, processo, autenticação, autorização</td></tr>\n      <tr><td>Política</td><td>Decidir o que é permitido</td><td>ACL, firewall rule, security group, RBAC, proxy policy</td><td>Origem, destino, porta, identidade, horário, logs e exceções</td></tr>\n    </tbody>\n  </table>\n  <p>Essa visão será reutilizada em todo o curso. Ao estudar Ethernet, você entenderá melhor switches. Ao estudar IP, entenderá roteadores. Ao estudar TCP/UDP, entenderá serviços e portas. Ao estudar firewall, entenderá política. Ao estudar cloud, verá versões virtuais desses mesmos papéis.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma empresa física. Os funcionários que pedem ou recebem documentos são como dispositivos finais. Corredores, recepção, elevadores e segurança predial são como intermediários. O setor de RH, financeiro, arquivo e atendimento são como serviços. As regras de acesso, crachás e autorizações são como políticas.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes, um mesmo elemento pode acumular funções. Um servidor pode ser destino, hospedar vários serviços e ainda atuar como proxy. Um firewall pode ser intermediário e também expor serviço de VPN. Por isso, classifique pelo papel no fluxo analisado, não apenas pelo nome do equipamento.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, seu celular acessa um vídeo. O celular é dispositivo final. O roteador Wi-Fi funciona como access point, switch, roteador, NAT e às vezes servidor DHCP. O serviço de streaming é a aplicação acessada. O DNS traduz o nome do serviço. O provedor interconecta sua rede doméstica com a internet.</p>\n  <p>Se o vídeo não carrega, não basta dizer “a internet caiu”. Você pode testar se o celular está conectado ao Wi-Fi, se recebeu IP, se o gateway responde, se nomes resolvem, se outros sites abrem e se apenas aquele serviço está indisponível.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, uma estação de trabalho acessa um sistema interno. A estação é dispositivo final. O switch de acesso conecta a estação à LAN. Um roteador ou switch de camada 3 encaminha para outra VLAN. Um firewall aplica política entre segmentos. O DNS interno traduz o nome. O balanceador distribui para servidores. O serviço web conversa com banco de dados e diretório de identidade.</p>\n  <p>No inventário de segurança, todos esses elementos importam. A estação pode ter malware. O switch pode estar com porta indevida. O firewall pode ter regra ampla. O servidor pode expor serviço desnecessário. O DNS pode apontar para IP antigo. O balanceador pode mascarar a origem se logs não forem configurados corretamente.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Na cloud, os nomes mudam, mas os papéis continuam. Uma VM, função serverless, container ou pod pode ser dispositivo final ou workload. Um load balancer é intermediário. Um NAT Gateway intermedeia saída. Uma route table define caminho. Um security group ou NSG aplica política. Um DNS privado fornece resolução de nomes. Um banco gerenciado é serviço.</p>\n  <p>Erro comum em cloud é achar que, por ser “serviço gerenciado”, não há rede. Há rede, mas ela está abstraída. Você ainda precisa saber origem, destino, porta, protocolo, rota, política, identidade e custo de tráfego. Em provedores cloud, intermediários gerenciados também podem gerar custo recorrente.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em um pipeline, um runner precisa baixar dependências, acessar um registry, enviar imagem para um repositório, aplicar manifests no cluster e consultar APIs. O runner é dispositivo final ou workload. O proxy corporativo pode ser intermediário. O registry é serviço. O cluster API server é serviço. O firewall, security group, service mesh ou network policy aplicam política.</p>\n  <p>Quando o pipeline falha com timeout, não conclua imediatamente que o código está errado. Pode ser DNS, proxy, rota, firewall, certificado TLS, autenticação, rate limit ou indisponibilidade do serviço externo. Classificar papéis acelera a investigação.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Para Segurança da Informação, a classificação de papéis é base de inventário, hardening, monitoramento e resposta a incidentes. Você não protege bem o que não sabe classificar. Um dispositivo final comprometido pode tentar alcançar serviços internos. Um intermediário mal configurado pode permitir tráfego lateral. Um serviço exposto pode ser explorado. Uma política ampla pode transformar uma falha pequena em incidente grande.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Elemento</th><th>Risco</th><th>Como aparece</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Dispositivo final</td><td>Comprometimento ou credencial roubada</td><td>Conexões incomuns, processos suspeitos, tráfego lateral</td><td>EDR, patching, menor privilégio, segmentação e MFA</td></tr>\n      <tr><td>Intermediário</td><td>Configuração permissiva ou firmware vulnerável</td><td>Regras any-any, portas de gerência expostas, logs ausentes</td><td>Hardening, atualização, ACLs, logs e revisão de regras</td></tr>\n      <tr><td>Serviço</td><td>Exposição indevida ou autenticação fraca</td><td>Portas abertas, banners, falhas de login, vazamento de dados</td><td>Controle de acesso, TLS, monitoramento, patching e limitação de superfície</td></tr>\n      <tr><td>Política</td><td>Permissão excessiva</td><td>Acesso entre segmentos sem justificativa</td><td>Menor privilégio, revisão periódica, documentação e testes</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 430\" role=\"img\" aria-labelledby=\"m01l02-title m01l02-desc\">\n    <title id=\"m01l02-title\">Dispositivos finais, intermediários e serviços</title>\n    <desc id=\"m01l02-desc\">Um cliente acessa um serviço passando por access point, switch, firewall, roteador e balanceador.</desc>\n    <defs>\n      <marker id=\"m01l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"55\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"115\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Dispositivo final</text>\n    <text x=\"115\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Notebook / celular</text>\n    <rect x=\"260\" y=\"55\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"335\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Intermediário</text>\n    <text x=\"335\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">AP / Switch</text>\n    <rect x=\"470\" y=\"55\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"545\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Política</text>\n    <text x=\"545\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Firewall / ACL</text>\n    <rect x=\"680\" y=\"55\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"755\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Intermediário</text>\n    <text x=\"755\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Roteador / LB</text>\n    <rect x=\"790\" y=\"250\" width=\"160\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"870\" y=\"284\" text-anchor=\"middle\" class=\"svg-label\">Dispositivo final</text>\n    <text x=\"870\" y=\"309\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Servidor / VM</text>\n    <rect x=\"495\" y=\"250\" width=\"200\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"595\" y=\"284\" text-anchor=\"middle\" class=\"svg-label\">Serviço</text>\n    <text x=\"595\" y=\"309\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNS / HTTP / API</text>\n    <line x1=\"200\" y1=\"95\" x2=\"260\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l02-arrow)\" />\n    <line x1=\"410\" y1=\"95\" x2=\"470\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l02-arrow)\" />\n    <line x1=\"620\" y1=\"95\" x2=\"680\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l02-arrow)\" />\n    <path d=\"M755 135 C760 190, 740 235, 695 275\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l02-arrow)\" />\n    <line x1=\"695\" y1=\"292\" x2=\"790\" y2=\"292\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l02-arrow)\" />\n    <text x=\"500\" y=\"185\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Perguntas do diagnóstico: quem iniciou? quem encaminhou? qual serviço? qual política?</text>\n    <rect x=\"70\" y=\"250\" width=\"300\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"220\" y=\"282\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n    <text x=\"220\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP, rota, porta, log, regra, processo</text>\n  </svg>\n</section>\n",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam a habilidade de classificar papéis e evitar confusões entre equipamento, serviço, protocolo, porta e política.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma tarefa comum: receber um desenho ou relato incompleto de uma rede e produzir uma classificação útil para troubleshooting e segurança.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como pensar por papéis, não por nomes soltos. O raciocínio importa mais que decorar uma lista de equipamentos.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> uma rede é composta por participantes com papéis diferentes.</li>\n    <li><strong>O que lembrar:</strong> dispositivo final consome ou entrega comunicação; intermediário encaminha, filtra ou traduz; serviço entrega função acessível.</li>\n    <li><strong>Erro comum:</strong> confundir servidor com serviço ou chamar todo equipamento de roteador.</li>\n    <li><strong>Uso real:</strong> classificação de papéis ajuda em inventário, troubleshooting, firewall, cloud e resposta a incidentes.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Depois de entender os papéis dos elementos, a próxima aula amplia o mapa: tipos de rede como PAN, LAN, WLAN, CAN, MAN, WAN e SAN. Isso mostrará como o tamanho, o alcance e a finalidade da rede mudam arquitetura, custo, operação e segurança.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
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
      "Wi-Fi",
      "ARP",
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "DNS",
      "DHCP",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [
      "rede como sistema",
      "bits",
      "sinais",
      "protocolos",
      "pensamento em camadas"
    ],
    "enables": [
      "tipos de rede",
      "topologias",
      "equipamentos de rede",
      "inventário",
      "firewall",
      "cloud networking",
      "troubleshooting"
    ]
  },
  "deepDive": {
    "mentalModel": "Classifique pelo papel no fluxo: origem, intermediário, serviço, política e evidência. O nome do equipamento ajuda, mas o papel depende do contexto.",
    "keyTerms": [
      "host",
      "cliente",
      "servidor",
      "serviço",
      "intermediário",
      "gateway",
      "política",
      "inventário",
      "fluxo"
    ],
    "limitations": [
      "A classificação não substitui análise por camada; ela é o primeiro mapa mental.",
      "Um mesmo equipamento pode acumular papéis diferentes.",
      "Saber o papel não prova a causa da falha; apenas organiza hipóteses."
    ],
    "whenToUse": [
      "Ao mapear uma rede desconhecida.",
      "Ao abrir ou revisar regra de firewall.",
      "Ao investigar falha de acesso a serviço.",
      "Ao criar inventário de ativos e dependências."
    ],
    "whenNotToUse": [
      "Não use a classificação como substituto de evidência técnica.",
      "Não conclua que todo servidor expõe apenas um serviço.",
      "Não assuma que um intermediário é seguro apenas porque está no meio do caminho."
    ],
    "operationalImpact": [
      "Mapear papéis melhora troubleshooting e documentação.",
      "Ambientes sem inventário de hosts, serviços e intermediários demoram mais para diagnosticar incidentes.",
      "A classificação ajuda a definir donos: endpoint, rede, segurança, sistemas ou aplicação."
    ],
    "financialImpact": [
      "Intermediários como firewalls, load balancers e NAT gateways podem ter custo de licença, appliance ou cobrança cloud.",
      "Serviços gerenciados reduzem operação manual, mas podem gerar custo recorrente e dependência do provedor.",
      "Inventário ruim aumenta custo de troubleshooting e risco de manter ativos esquecidos."
    ],
    "securityImpact": [
      "Dispositivos finais ampliam superfície de ataque quando não são gerenciados.",
      "Intermediários concentram confiança e precisam de hardening, logs e controle de acesso.",
      "Serviços expostos precisam de autenticação, autorização, patching, criptografia e monitoramento."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Confundir servidor com serviço.",
      "whyItHappens": "No dia a dia, as pessoas dizem 'o servidor caiu' quando querem dizer que um sistema não responde.",
      "consequence": "A equipe reinicia ou investiga o host errado sem verificar se o serviço está escutando.",
      "correction": "Servidor é o equipamento ou workload; serviço é a função exposta, como HTTP, DNS, SSH ou banco de dados."
    },
    {
      "mistake": "Chamar todo equipamento de rede de roteador.",
      "whyItHappens": "Em casa, o roteador Wi-Fi acumula funções de AP, switch, roteador, NAT e DHCP.",
      "consequence": "O aluno não diferencia switching, roteamento, Wi-Fi, firewall e DHCP.",
      "correction": "Classifique pelo papel: comutar na LAN, rotear entre redes, oferecer Wi-Fi, distribuir IP ou filtrar tráfego."
    },
    {
      "mistake": "Ignorar impressoras, câmeras e IoT como dispositivos finais.",
      "whyItHappens": "Esses ativos não parecem computadores tradicionais.",
      "consequence": "Ficam fora de inventário, patching e monitoramento.",
      "correction": "Todo dispositivo com IP, serviço, firmware ou credencial precisa ser tratado como ativo de rede."
    },
    {
      "mistake": "Achar que intermediário só transporta e nunca altera.",
      "whyItHappens": "Modelos simplificados mostram equipamentos apenas como setas no caminho.",
      "consequence": "A equipe esquece NAT, proxy, TLS inspection, WAF, balanceamento e políticas.",
      "correction": "Intermediários podem encaminhar, bloquear, traduzir, registrar, inspecionar e até modificar tráfego."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Serviço não abre, mas host responde ping",
      "Wi-Fi conecta, mas não navega",
      "Pipeline não baixa imagem do registry",
      "Aplicação funciona por IP, mas não por nome",
      "Apenas uma filial não acessa sistema interno"
    ],
    "diagnosticQuestions": [
      "Quem é o dispositivo final de origem?",
      "Qual serviço está sendo acessado?",
      "O serviço depende de DNS, autenticação ou banco?",
      "Quais intermediários estão no caminho?",
      "Existe política de firewall, proxy, ACL, security group ou VPN?",
      "Há evidência em log, tabela de conexões, rota ou captura?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Identificar IP, gateway, DNS e interface do dispositivo final.",
        "expectedObservation": "Interface ativa com endereço, gateway e DNS coerentes.",
        "interpretation": "Sem IP ou gateway, a suspeita inicial está no host, DHCP, VLAN, Wi-Fi ou cabo."
      },
      {
        "platform": "Windows",
        "command": "Get-NetTCPConnection | Select-Object -First 20",
        "purpose": "Observar conexões TCP locais e portas envolvidas.",
        "expectedObservation": "Lista de conexões com endereços locais/remotos e estados.",
        "interpretation": "Ajuda a separar host, serviço e conexão estabelecida."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection <destino> -Port 443",
        "purpose": "Testar acesso a um serviço específico por porta.",
        "expectedObservation": "TcpTestSucceeded true quando a porta está acessível.",
        "interpretation": "Se ping funciona e porta falha, investigue serviço, firewall, proxy ou rota específica."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route",
        "purpose": "Ver IPs e rotas do dispositivo final Linux.",
        "expectedObservation": "Interface com IP e rota default.",
        "interpretation": "Sem rota default, o host não alcança redes externas."
      },
      {
        "platform": "Linux",
        "command": "ss -tulpen",
        "purpose": "Listar serviços locais escutando portas TCP/UDP.",
        "expectedObservation": "Portas, processos e endereços de escuta.",
        "interpretation": "Ajuda a confirmar se o serviço existe no host e em qual porta escuta."
      },
      {
        "platform": "Linux",
        "command": "curl -I https://example.com",
        "purpose": "Testar acesso HTTP/HTTPS e observar cabeçalhos.",
        "expectedObservation": "Status HTTP e headers de resposta.",
        "interpretation": "Confirma que há caminho, DNS, TCP, TLS e resposta de serviço web."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief",
        "purpose": "Ver interfaces e estado de intermediários Cisco.",
        "expectedObservation": "Interfaces relevantes em up/up.",
        "interpretation": "Interface down pode interromper o caminho entre dispositivos finais."
      },
      {
        "platform": "Cisco IOS",
        "command": "show cdp neighbors",
        "purpose": "Identificar vizinhos diretamente conectados em ambientes Cisco controlados.",
        "expectedObservation": "Lista de dispositivos vizinhos e interfaces.",
        "interpretation": "Ajuda a mapear intermediários físicos, quando CDP está habilitado e autorizado."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não tem IP válido",
        "then": "Investigar dispositivo final, DHCP, meio físico, Wi-Fi, VLAN ou configuração manual."
      },
      {
        "if": "Host tem IP e gateway, mas não resolve nomes",
        "then": "Investigar serviço DNS, configuração de DNS, firewall ou conectividade até o resolvedor."
      },
      {
        "if": "Nome resolve, mas porta falha",
        "then": "Investigar serviço, firewall, proxy, security group, ACL ou aplicação parada."
      },
      {
        "if": "Apenas um segmento falha",
        "then": "Investigar intermediários, roteamento, VLAN, firewall entre redes e políticas."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter inventário de dispositivos finais, intermediários e serviços.",
      "Separar rede de usuários, servidores, visitantes, gerenciamento e IoT quando possível.",
      "Registrar regras de firewall com justificativa, dono e prazo de revisão.",
      "Monitorar serviços críticos e intermediários de rede.",
      "Proteger interfaces de gerenciamento de switches, roteadores, firewalls e access points."
    ],
    "badPractices": [
      "Tratar impressoras, câmeras e IoT como irrelevantes para segurança.",
      "Permitir acesso administrativo aos intermediários a partir de qualquer rede.",
      "Expor serviços internos sem autenticação forte.",
      "Documentar apenas servidores e esquecer serviços e dependências.",
      "Liberar regras amplas porque não se sabe qual serviço é necessário."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Confundir host ativo com serviço saudável.",
      "Ignorar intermediários transparentes como proxy, NAT, WAF ou inspeção TLS.",
      "Não coletar evidências antes de alterar regras."
    ],
    "vulnerabilities": [
      {
        "name": "Ativo desconhecido",
        "description": "Dispositivo final conectado à rede sem inventário, dono ou política clara.",
        "defensiveExplanation": "Ativos desconhecidos podem manter serviços vulneráveis, credenciais padrão ou firmware antigo.",
        "mitigation": "Inventário, NAC quando aplicável, segmentação, varreduras autorizadas, logs de DHCP e revisão periódica."
      },
      {
        "name": "Serviço exposto indevidamente",
        "description": "Serviço acessível por redes ou usuários que não deveriam alcançá-lo.",
        "defensiveExplanation": "A exposição amplia superfície de ataque mesmo quando o host parece legítimo.",
        "mitigation": "Firewall, ACL, security group, autenticação, menor privilégio, TLS e revisão de portas."
      },
      {
        "name": "Gerência de intermediário exposta",
        "description": "Interface administrativa de switch, roteador, AP ou firewall acessível por redes amplas.",
        "defensiveExplanation": "Comprometer intermediários pode permitir interceptação, alteração de tráfego ou negação de serviço.",
        "mitigation": "Rede de gerência, MFA quando disponível, ACL administrativa, atualização e logs."
      }
    ],
    "monitoring": [
      "Logs de DHCP para novos hosts",
      "Logs de firewall por origem, destino, porta e ação",
      "Alertas de novos serviços escutando",
      "Monitoramento de disponibilidade de serviços críticos",
      "Alterações de configuração em intermediários"
    ],
    "hardening": [
      "Desabilitar serviços desnecessários",
      "Alterar credenciais padrão",
      "Atualizar firmware e sistemas",
      "Restringir acesso administrativo",
      "Aplicar menor privilégio em regras e serviços"
    ],
    "detectionIdeas": [
      "Aumento de conexões laterais entre dispositivos finais",
      "Serviço novo escutando porta incomum",
      "Dispositivo desconhecido solicitando DHCP",
      "Falhas de autenticação em serviços internos",
      "Mudanças não autorizadas em regras de intermediários"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma impressora de rede deve ser tratada como dispositivo final relevante para segurança?",
      "hints": [
        "Ela possui IP, firmware e serviços.",
        "Pense em documentos, credenciais e acesso interno."
      ],
      "expectedIdeas": [
        "IP",
        "firmware",
        "serviço",
        "credenciais",
        "inventário",
        "risco",
        "segmentação"
      ],
      "explanation": "Impressoras podem armazenar documentos, aceitar jobs, expor interfaces web e usar credenciais. Elas não devem ficar fora do inventário."
    },
    {
      "type": "diagnóstico",
      "question": "Um servidor responde ping, mas o site hospedado nele não abre. O dispositivo final está necessariamente fora do ar?",
      "hints": [
        "Ping não testa HTTP.",
        "Pense em serviço, porta e firewall."
      ],
      "expectedIdeas": [
        "não",
        "serviço",
        "porta",
        "processo",
        "firewall",
        "HTTP",
        "aplicação"
      ],
      "explanation": "O host pode estar ativo, mas o serviço web pode estar parado, bloqueado, em outra porta ou com erro de aplicação."
    },
    {
      "type": "cenário real",
      "question": "Um firewall é dispositivo final ou intermediário?",
      "hints": [
        "Classifique pelo papel no fluxo.",
        "Ele também pode ter serviços de gerenciamento."
      ],
      "expectedIdeas": [
        "intermediário",
        "filtra",
        "encaminha",
        "política",
        "logs",
        "gerenciamento"
      ],
      "explanation": "No fluxo de outros sistemas, firewall é intermediário. Para acesso administrativo ao próprio firewall, ele também se comporta como destino de serviço de gerenciamento."
    }
  ],
  "quiz": [
    {
      "id": "q1.2.1",
      "type": "conceito",
      "q": "Qual alternativa representa melhor um dispositivo intermediário?",
      "opts": [
        "Um switch encaminhando quadros entre hosts",
        "Um arquivo PDF enviado por e-mail",
        "Uma senha usada em login",
        "Um documento salvo localmente"
      ],
      "a": 0,
      "exp": "Switch é intermediário porque conecta dispositivos e encaminha quadros dentro da LAN.",
      "difficulty": "iniciante",
      "topic": "papéis de rede"
    },
    {
      "id": "q1.2.2",
      "type": "comparação",
      "q": "DNS é melhor classificado como:",
      "opts": [
        "Meio físico",
        "Serviço",
        "Cabo",
        "Topologia"
      ],
      "a": 1,
      "exp": "DNS é um serviço de rede que traduz nomes para endereços.",
      "difficulty": "iniciante",
      "topic": "serviços"
    },
    {
      "id": "q1.2.3",
      "type": "cenário",
      "q": "Um servidor executa HTTP, SSH e banco de dados. O servidor e os serviços são a mesma coisa?",
      "opts": [
        "Sim, sempre",
        "Não. O servidor é o host/workload; HTTP, SSH e banco são serviços",
        "Sim, porque todos usam IP",
        "Não existe serviço em servidor"
      ],
      "a": 1,
      "exp": "Um mesmo host pode hospedar vários serviços, cada um com protocolo, porta, configuração e risco próprios.",
      "difficulty": "iniciante",
      "topic": "servidor vs serviço"
    },
    {
      "id": "q1.2.4",
      "type": "diagnóstico",
      "q": "Um host tem IP e pinga o gateway, mas não acessa um site por nome. Qual serviço deve ser investigado cedo?",
      "opts": [
        "DNS",
        "Teclado",
        "Monitor",
        "Fonte do switch sempre"
      ],
      "a": 0,
      "exp": "Se há conectividade local, mas nomes falham, DNS é uma hipótese forte.",
      "difficulty": "iniciante",
      "topic": "troubleshooting"
    },
    {
      "id": "q1.2.5",
      "type": "segurança",
      "q": "Por que intermediários como firewalls e roteadores exigem hardening forte?",
      "opts": [
        "Porque nunca registram logs",
        "Porque concentram tráfego, políticas e confiança",
        "Porque não têm firmware",
        "Porque não participam da comunicação"
      ],
      "a": 1,
      "exp": "Intermediários influenciam muitos fluxos. Comprometê-los pode afetar confidencialidade, integridade e disponibilidade.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q1.2.6",
      "type": "cloud",
      "q": "Em cloud, um load balancer normalmente atua como:",
      "opts": [
        "Dispositivo final do usuário",
        "Intermediário que distribui tráfego para serviços/backends",
        "Codificação de texto",
        "Sistema operacional local"
      ],
      "a": 1,
      "exp": "Load balancer é intermediário: recebe tráfego e o encaminha para backends conforme regras e saúde dos alvos.",
      "difficulty": "iniciante",
      "topic": "cloud networking"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.2.1",
      "front": "O que é dispositivo final?",
      "back": "É a origem ou destino de uma comunicação, como notebook, celular, servidor, VM, container, impressora ou câmera.",
      "tags": [
        "fundamentos",
        "host"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.2.2",
      "front": "O que é dispositivo intermediário?",
      "back": "É um elemento que encaminha, conecta, filtra, traduz ou inspeciona tráfego, como switch, roteador, firewall, AP, proxy ou load balancer.",
      "tags": [
        "fundamentos",
        "intermediários"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.2.3",
      "front": "Servidor e serviço são iguais?",
      "back": "Não. Servidor é o host ou workload; serviço é a função acessível, como HTTP, DNS, SSH, SMB ou banco de dados.",
      "tags": [
        "serviços"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.2.4",
      "front": "Por que classificar papéis ajuda no troubleshooting?",
      "back": "Porque separa hipóteses: origem, caminho, política, destino e serviço.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.2.5",
      "front": "Um firewall é sempre intermediário?",
      "back": "No fluxo de outros sistemas, sim; mas ele também pode ser destino de serviços de gerenciamento, VPN ou logs.",
      "tags": [
        "firewall",
        "papéis"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.2.6",
      "front": "Qual é o risco de ativo desconhecido?",
      "back": "Ele pode expor serviços, firmware antigo, credenciais padrão ou tráfego lateral sem monitoramento adequado.",
      "tags": [
        "segurança",
        "inventário"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.2.1",
      "type": "classificação",
      "prompt": "Classifique: notebook, switch, DNS, firewall, servidor web e API.",
      "expectedAnswer": "Notebook: dispositivo final. Switch: intermediário. DNS: serviço. Firewall: intermediário/política. Servidor web: dispositivo final/workload que hospeda serviço HTTP. API: serviço.",
      "explanation": "A classificação depende do papel no fluxo. O servidor web é host; HTTP/API são serviços."
    },
    {
      "id": "ex1.2.2",
      "type": "diagnóstico",
      "prompt": "Um usuário acessa o sistema por IP, mas não por nome. Quais papéis entram na investigação?",
      "expectedAnswer": "Dispositivo final do usuário, serviço DNS, destino do sistema, possíveis intermediários e políticas entre origem e DNS/destino.",
      "explanation": "Se por IP funciona e por nome não, DNS ou resolução de nomes é hipótese forte."
    },
    {
      "id": "ex1.2.3",
      "type": "segurança",
      "prompt": "Explique por que câmeras IP devem entrar no inventário de rede.",
      "expectedAnswer": "Porque têm IP, firmware, credenciais, serviços de vídeo/administração e podem ser exploradas ou usadas como ponto de movimento lateral.",
      "explanation": "Dispositivo final não é apenas notebook ou servidor tradicional."
    },
    {
      "id": "ex1.2.4",
      "type": "cloud",
      "prompt": "Em uma VPC/VNet com VM, load balancer, NAT Gateway e banco gerenciado, classifique os papéis.",
      "expectedAnswer": "VM: dispositivo final/workload. Load balancer: intermediário. NAT Gateway: intermediário/tradução de saída. Banco gerenciado: serviço. Security group/NSG: política.",
      "explanation": "Cloud muda a forma de implementação, mas mantém papéis de comunicação e controle."
    }
  ],
  "challenge": {
    "title": "Classifique uma rede de pequeno escritório",
    "scenario": "Um escritório possui 12 notebooks, 2 impressoras, 1 roteador/firewall, 2 switches, 1 access point, 1 servidor de arquivos, DNS interno, DHCP, link de internet, VPN e um sistema web em cloud.",
    "tasks": [
      "Classificar cada item como dispositivo final, intermediário, serviço ou política.",
      "Identificar itens que acumulam mais de um papel.",
      "Listar três riscos de segurança.",
      "Indicar cinco evidências que você coletaria antes de alterar qualquer regra."
    ],
    "constraints": [
      "Não usar varredura invasiva.",
      "Não assumir que todo servidor é um único serviço.",
      "Separar conectividade, serviço e autorização."
    ],
    "expectedDeliverables": [
      "Tabela de classificação",
      "Lista de papéis acumulados",
      "Riscos e mitigações",
      "Plano de evidências"
    ],
    "gradingRubric": [
      {
        "criterion": "Classificação correta",
        "points": 35,
        "description": "Separa finais, intermediários, serviços e políticas."
      },
      {
        "criterion": "Reconhecimento de papéis múltiplos",
        "points": 20,
        "description": "Identifica roteador/firewall, servidor e AP com funções acumuladas."
      },
      {
        "criterion": "Visão de segurança",
        "points": 25,
        "description": "Inclui riscos de exposição, gerência, impressoras, VPN e serviços."
      },
      {
        "criterion": "Evidências",
        "points": 20,
        "description": "Propõe evidências técnicas antes de mudanças."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa separando coisa física, papel lógico e serviço. Um equipamento pode acumular papéis, então a classificação deve explicar o contexto.",
    "steps": [
      "Listar todos os elementos.",
      "Marcar quem inicia ou recebe comunicação.",
      "Marcar quem encaminha, filtra ou traduz.",
      "Separar serviços hospedados ou consumidos.",
      "Identificar políticas e pontos de controle.",
      "Associar evidências: IP, rota, porta, regra, log e processo."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Classificar o servidor de arquivos apenas como serviço.",
        "whyItIsWrong": "O equipamento/VM é dispositivo final; o compartilhamento de arquivos é o serviço."
      },
      {
        "answer": "Ignorar impressoras porque não são computadores.",
        "whyItIsWrong": "Impressoras têm IP, serviços, firmware, credenciais e podem armazenar documentos."
      },
      {
        "answer": "Chamar roteador/firewall apenas de roteador.",
        "whyItIsWrong": "Ele pode rotear, filtrar, fazer NAT, VPN, DHCP, DNS forwarder e registrar logs."
      }
    ],
    "finalAnswer": "Uma classificação madura separa notebooks, impressoras e servidor como dispositivos finais; switches, AP, roteador/firewall, VPN e link como intermediários ou meios; DNS, DHCP, arquivos e sistema web como serviços; regras de firewall, autenticação e permissões como políticas. Antes de mudar regras, colete IPs, rotas, DNS, portas, logs e dono do serviço."
  },
  "glossary": [
    {
      "term": "Dispositivo final",
      "shortDefinition": "Origem ou destino de comunicação em uma rede.",
      "longDefinition": "Elemento que consome ou entrega comunicação, como notebook, celular, servidor, VM, container, impressora ou câmera.",
      "example": "Um notebook acessando um sistema web é dispositivo final de origem.",
      "relatedTerms": [
        "host",
        "cliente",
        "servidor",
        "workload"
      ],
      "relatedLessons": [
        "1.1",
        "1.2",
        "1.7"
      ]
    },
    {
      "term": "Dispositivo intermediário",
      "shortDefinition": "Elemento que encaminha, filtra, traduz, concentra ou inspeciona tráfego.",
      "longDefinition": "Equipamento ou serviço de rede que fica no caminho entre origem e destino, como switch, roteador, firewall, proxy, AP ou load balancer.",
      "example": "Um firewall entre VLANs é intermediário e ponto de política.",
      "relatedTerms": [
        "switch",
        "roteador",
        "firewall",
        "proxy",
        "gateway"
      ],
      "relatedLessons": [
        "1.2",
        "1.7",
        "9.1"
      ]
    },
    {
      "term": "Serviço de rede",
      "shortDefinition": "Função acessível pela rede.",
      "longDefinition": "Recurso consumido por clientes ou outros sistemas usando protocolos e portas, como DNS, DHCP, HTTP, SSH, SMB, API ou banco de dados.",
      "example": "DNS é serviço que traduz nomes para endereços.",
      "relatedTerms": [
        "porta",
        "protocolo",
        "aplicação"
      ],
      "relatedLessons": [
        "1.2",
        "6.1",
        "7.1"
      ]
    },
    {
      "term": "Política de rede",
      "shortDefinition": "Regra que decide o que pode trafegar.",
      "longDefinition": "Controle aplicado por firewall, ACL, security group, proxy, WAF ou mecanismo similar para permitir, negar, registrar ou inspecionar comunicação.",
      "example": "Permitir HTTPS da rede de usuários para o sistema interno e negar acesso ao banco.",
      "relatedTerms": [
        "firewall",
        "ACL",
        "menor privilégio"
      ],
      "relatedLessons": [
        "1.2",
        "9.1",
        "13.1"
      ]
    },
    {
      "term": "Inventário de ativos",
      "shortDefinition": "Lista controlada de elementos relevantes da rede.",
      "longDefinition": "Registro de dispositivos, serviços, donos, endereços, funções, criticidade e riscos, usado para operação, segurança e auditoria.",
      "example": "Uma tabela contendo notebooks, switches, impressoras, servidores, APIs e responsáveis.",
      "relatedTerms": [
        "CMDB",
        "asset management",
        "observabilidade"
      ],
      "relatedLessons": [
        "1.2",
        "15.1",
        "16.1"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base conceitual de bits, sinais, protocolos e pensamento em camadas."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Relação com pipelines, runners, registries, clusters e automação."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Relação entre conectividade, serviços, identidade e autorização."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "fundamentos",
      "reason": "Runners, registries, clusters e APIs também devem ser classificados como workloads, intermediários, serviços e políticas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "fundamentos",
      "reason": "Acesso a serviço depende de rede, mas também de autenticação, autorização e identidade."
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
      "1.3"
    ]
  }
};
