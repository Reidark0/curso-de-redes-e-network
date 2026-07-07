export const lesson0408 = {
  "id": "4.8",
  "moduleId": "m04",
  "order": 8,
  "title": "ICMP, ping, TTL e traceroute",
  "subtitle": "Como testar alcance, interpretar respostas ICMP, entender TTL e reconstruir o caminho provável entre origem e destino sem confundir diagnóstico com prova absoluta.",
  "duration": "95-130 min",
  "estimatedStudyTimeMinutes": 130,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 225,
  "tags": [
    "redes",
    "ipv4",
    "icmp",
    "ping",
    "ttl",
    "traceroute",
    "tracert",
    "diagnóstico",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.1",
      "reason": "A aula 4.1 explica por que IPv4 existe e como pacotes atravessam redes usando gateways."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "reason": "Gateway padrão e rota local são essenciais para interpretar por onde um ping ou traceroute deveria sair."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.7",
      "reason": "Configuração IPv4, DHCP, gateway e DNS ajudam a separar falha de configuração de falha real de conectividade."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "ARP explica por que o primeiro salto local depende do MAC do gateway antes de qualquer teste IPv4 externo funcionar."
    }
  ],
  "objectives": [
    "Explicar o papel do ICMP no ecossistema IPv4 sem tratá-lo como TCP ou UDP.",
    "Usar ping como teste controlado de alcance, latência e perda sem tirar conclusões precipitadas.",
    "Entender TTL como mecanismo de proteção contra loops e como base para o funcionamento do traceroute.",
    "Interpretar respostas como Echo Reply, Time Exceeded, Destination Unreachable e Request timed out.",
    "Relacionar ICMP com firewall, cloud, segurança, troubleshooting e observabilidade operacional."
  ],
  "learningOutcomes": [
    "Dado um resultado de ping, o aluno identifica se há evidência de alcance, perda, latência ou bloqueio possível.",
    "Dado um traceroute, o aluno explica por que cada salto aparece e por que alguns saltos podem não responder.",
    "Dado um cenário de falha, o aluno separa problema de DNS, rota local, gateway, firewall, ICMP bloqueado e serviço indisponível.",
    "Dado um ambiente corporativo ou cloud, o aluno propõe testes ICMP seguros, limitados e documentados."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Quando uma aplicação não abre, a primeira reação de muita gente em TI é executar <code>ping</code>. Se responde, alguém diz: \"a rede está boa\". Se não responde, alguém diz: \"a rede caiu\". As duas conclusões podem estar erradas.</p>\n<p>O <strong>ping</strong> é uma ferramenta excelente, mas ele testa uma coisa específica: se a origem recebe uma resposta ICMP de um destino. Isso ajuda muito, mas não prova que DNS, TCP, TLS, HTTP, proxy, autenticação, firewall de aplicação ou banco de dados estejam funcionando.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um servidor web responde ping, mas a aplicação está fora porque a porta TCP 443 foi bloqueada. Em outro caso, o servidor não responde ping porque ICMP foi bloqueado por política, mas a aplicação HTTPS funciona normalmente. Sem método, o diagnóstico vira chute.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>O IP foi criado para transportar pacotes entre redes diferentes, mas redes falham. Rotas podem apontar para caminhos inexistentes, pacotes podem entrar em loop, destinos podem ficar indisponíveis e MTU pode impedir a entrega de pacotes maiores. Era necessário um mecanismo de mensagens de controle para avisar condições de erro e permitir testes básicos.</p>\n<p>O ICMP surgiu como esse protocolo de suporte ao IP. Ele não foi criado para transportar aplicações como HTTP ou SSH. Ele existe para comunicar situações do próprio funcionamento da rede, como destino inalcançável, tempo excedido e resposta a eco.</p>\n<p>Com o tempo, ferramentas como <code>ping</code> e <code>traceroute</code>/<code>tracert</code> se tornaram parte do kit básico de qualquer profissional de redes, suporte, segurança, cloud e DevOps. Elas continuam relevantes porque mostram sinais simples, rápidos e frequentemente suficientes para localizar a camada provável do problema.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema que ICMP ajuda a resolver é: <strong>como uma origem descobre algo sobre a entrega de pacotes IP quando não há uma conexão de aplicação bem-sucedida?</strong></p>\n<ul class=\"flow-list\"><li><strong>O destino existe?</strong> Um Echo Reply sugere que há resposta ICMP.</li><li><strong>O caminho tem roteadores intermediários?</strong> O traceroute tenta revelar saltos pelo comportamento do TTL.</li><li><strong>Há perda ou latência alta?</strong> Vários pings podem indicar variação, perda ou instabilidade.</li><li><strong>Há bloqueio ou filtragem?</strong> Ausência de resposta pode indicar bloqueio, mas não prova indisponibilidade.</li><li><strong>Há loop?</strong> TTL expirado repetidamente pode indicar rota incorreta ou ciclo.</li></ul>\n<div class=\"callout callout--warning\"><strong>Regra de ouro:</strong> ping e traceroute são evidências, não sentença final. Eles devem ser combinados com rota local, ARP, DNS, portas TCP/UDP, firewall, logs e métricas.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A forma de diagnosticar conectividade evoluiu de testes simples de alcance para observabilidade distribuída, mas ICMP continua sendo a base mental de muitos diagnósticos.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Ferramenta/abordagem</th><th>O que ajuda a ver</th><th>Limitação</th></tr></thead><tbody><tr><td>Teste básico</td><td><code>ping</code></td><td>Resposta ICMP, latência aproximada e perda</td><td>Não testa aplicação nem porta TCP</td></tr><tr><td>Caminho provável</td><td><code>traceroute</code>/<code>tracert</code></td><td>Saltos intermediários que respondem ICMP</td><td>Rotas assimétricas e filtros podem ocultar saltos</td></tr><tr><td>Diagnóstico por camada</td><td>ARP, rota, DNS, ping, TCP, HTTP</td><td>Separação da falha por camada</td><td>Exige método e correlação</td></tr><tr><td>Observabilidade moderna</td><td>Logs, métricas, traces, flow logs, synthetic checks</td><td>Visão histórica e distribuída</td><td>Pode ser caro e depende de instrumentação</td></tr></tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>ICMP</strong>, Internet Control Message Protocol, é um protocolo de mensagens de controle usado junto ao IP. Ele informa condições de erro, suporta testes de alcance e ajuda ferramentas de diagnóstico.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> ICMP não é uma aplicação de usuário e não usa portas TCP ou UDP no modelo clássico. Ele acompanha o funcionamento do IP e carrega mensagens como Echo Request, Echo Reply, Time Exceeded e Destination Unreachable.</div>\n<table class=\"data-table\"><thead><tr><th>Conceito</th><th>Função</th><th>Exemplo prático</th></tr></thead><tbody><tr><td>Echo Request</td><td>Pergunta se o destino responde ICMP</td><td><code>ping 192.168.1.1</code></td></tr><tr><td>Echo Reply</td><td>Resposta ao Echo Request</td><td>Confirma resposta ICMP do destino</td></tr><tr><td>TTL</td><td>Limita a vida do pacote em saltos</td><td>Evita loops infinitos</td></tr><tr><td>Time Exceeded</td><td>Avisa que o TTL chegou a zero</td><td>Base do traceroute</td></tr><tr><td>Destination Unreachable</td><td>Indica que destino, rede, protocolo ou porta pode estar inalcançável</td><td>Ajuda a diferenciar bloqueio e ausência de rota</td></tr></tbody></table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Quando você executa <code>ping</code>, o sistema envia mensagens ICMP Echo Request ao destino. Se o destino aceitar e conseguir responder, ele devolve ICMP Echo Reply. A ferramenta mede o tempo entre envio e resposta, exibindo latência aproximada e perda.</p>\n<p>O <strong>TTL</strong>, Time To Live, é um campo do cabeçalho IPv4. Apesar do nome, na prática ele funciona como contador de saltos. Cada roteador que encaminha o pacote reduz o TTL em 1. Se o valor chega a zero, o roteador descarta o pacote e pode enviar uma mensagem ICMP Time Exceeded de volta à origem.</p>\n<ol class=\"flow-list\"><li>A origem escolhe destino e consulta tabela de rotas.</li><li>Se o destino está fora da rede local, a origem usa o gateway padrão.</li><li>O pacote IP sai com um TTL inicial, por exemplo 64, 128 ou 255, dependendo do sistema.</li><li>Cada roteador reduz o TTL em 1.</li><li>Se o destino responde, retorna Echo Reply.</li><li>Se um roteador zera o TTL, descarta o pacote e envia Time Exceeded.</li></ol>\n<p>O traceroute explora exatamente isso: envia pacotes com TTL 1, depois TTL 2, depois TTL 3, e assim por diante. Cada roteador que zera o TTL revela um salto, quando responde.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>ICMP atravessa a arquitetura IPv4, mas sua visibilidade depende de políticas de firewall, roteadores, NAT, cloud, ACLs, security groups e configurações do sistema operacional.</p>\n<table class=\"data-table\"><thead><tr><th>Componente</th><th>Papel no teste</th><th>O que pode dar errado</th></tr></thead><tbody><tr><td>Host de origem</td><td>Gera Echo Request ou pacotes de traceroute</td><td>Rota local errada, gateway ausente, firewall local</td></tr><tr><td>Switch/VLAN</td><td>Entrega até o gateway local</td><td>VLAN errada, ARP falhando, porta bloqueada</td></tr><tr><td>Gateway</td><td>Encaminha para outras redes</td><td>Sem rota, ACL bloqueando, NAT incorreto</td></tr><tr><td>Roteadores intermediários</td><td>Reduzem TTL e podem responder Time Exceeded</td><td>Podem não responder ICMP por política</td></tr><tr><td>Destino</td><td>Responde Echo Reply, se permitido</td><td>ICMP bloqueado, host desligado, firewall, rota de retorno ausente</td></tr></tbody></table>\n<p>Em cloud, é comum ICMP ser bloqueado por padrão ou depender de regras explícitas em security groups, NSGs, NACLs ou firewalls gerenciados. Isso não significa automaticamente que a instância, VM ou serviço esteja fora.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine que você quer saber se uma pessoa está em um prédio. O <strong>ping</strong> é como mandar uma mensagem simples: \"você está aí?\". Se a pessoa responde, você sabe que aquele canal básico funcionou. Se não responde, pode ser que ela não esteja, mas também pode ser que esteja ocupada, que a recepção bloqueou sua mensagem ou que ela decidiu não responder esse tipo de pergunta.</p>\n<p>O <strong>traceroute</strong> é como enviar cartas com instruções de expiração: a primeira só pode passar por uma portaria, a segunda por duas, a terceira por três. Cada portaria que devolve a carta revela uma parte do caminho.</p>\n<div class=\"callout\"><strong>Limite da analogia:</strong> redes podem ter caminhos assimétricos. A ida pode passar por um caminho e a volta por outro. Além disso, alguns roteadores encaminham pacotes normalmente, mas não respondem às mensagens usadas pelo traceroute.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Você está em um notebook com IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. A internet parece lenta.</p>\n<ol class=\"flow-list\"><li>Você testa <code>ping 127.0.0.1</code>: valida a pilha local TCP/IP.</li><li>Testa <code>ping 192.168.1.50</code>: valida o IP da própria interface.</li><li>Testa <code>ping 192.168.1.1</code>: valida alcance até o gateway local.</li><li>Testa um IP externo permitido pela política: valida saída IPv4 básica.</li><li>Testa um nome, como um domínio interno: se IP funciona e nome falha, suspeite de DNS.</li></ol>\n<p>Esse método evita afirmar \"a internet caiu\" antes de separar pilha local, gateway, rota externa e DNS.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, usuários da VLAN 20 reclamam que o sistema ERP não abre. O time executa ping para o gateway da VLAN, para um servidor interno, para o firewall e para o endereço do ERP. O gateway responde, mas o servidor não. O traceroute mostra que o tráfego sai da VLAN, chega ao firewall e para antes da rede de servidores.</p>\n<p>A hipótese muda: não parece ser cabo, Wi-Fi ou DHCP. A falha está provavelmente entre roteamento inter-VLAN, política de firewall, ACL, rota de retorno ou indisponibilidade do servidor. Sem ICMP e traceroute, o time poderia perder tempo trocando cabo ou reiniciando notebook.</p>\n<div class=\"callout callout--security\"><strong>Boa prática:</strong> em ambiente corporativo, documente origem, destino, horário, VLAN, IP, gateway, comando usado e resultado. Isso transforma teste manual em evidência útil para NOC, SOC, rede e infraestrutura.</div>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, uma VM pode não responder ping porque a regra de segurança não permite ICMP. Isso não prova que a VM esteja desligada. É necessário verificar security group, NSG, NACL, rota da subnet, tabela de rotas, firewall do sistema operacional e logs de fluxo.</p>\n<p>Um cenário comum: a VM responde na porta 443, mas não responde ICMP. Isso é uma decisão de exposição. Em outro cenário, a VM não responde ICMP nem TCP; os flow logs mostram tráfego negado no security group. O problema é política, não necessariamente sistema operacional.</p>\n<p>Também existem ambientes cloud em que traceroute exibe saltos incompletos, endereços privados internos ou asteriscos. A infraestrutura do provedor pode encaminhar tráfego sem expor todos os roteadores intermediários.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em pipelines e plataformas, testes de conectividade são úteis para validar runners, agentes, clusters, registries, repositórios, proxies e endpoints internos. Porém, um pipeline que só executa ping não valida a aplicação.</p>\n<p>Um runner self-hosted pode pingar o gateway, mas falhar ao baixar uma imagem porque o proxy exige autenticação. Um pod Kubernetes pode resolver DNS, mas não alcançar uma API por NetworkPolicy. Uma instância pode ter rota, mas não ter regra de egress para a porta necessária.</p>\n<div class=\"callout\"><strong>Uso maduro:</strong> combine ICMP com testes específicos: resolução DNS, conexão TCP, handshake TLS, endpoint HTTP de health check, autenticação e consulta real controlada. ICMP é o início do diagnóstico, não o fim.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>ICMP é útil para defesa, mas também pode ser usado para reconhecimento. Por isso, muitas redes limitam respostas ICMP vindas da Internet, aplicam rate limiting ou permitem apenas tipos necessários.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Impacto</th><th>Mitigação defensiva</th></tr></thead><tbody><tr><td>Responder ICMP amplamente na Internet</td><td>Facilita enumeração básica de ativos</td><td>Filtrar por origem, limitar exposição e monitorar</td></tr><tr><td>Bloquear todo ICMP sem critério</td><td>Quebra diagnóstico e pode afetar descoberta de MTU</td><td>Permitir tipos necessários de forma controlada</td></tr><tr><td>Confiar apenas em ping</td><td>Diagnóstico falso positivo ou falso negativo</td><td>Correlacionar com TCP, DNS, logs e métricas</td></tr><tr><td>Executar varreduras sem autorização</td><td>Risco legal, operacional e disciplinar</td><td>Usar escopo autorizado e registrar janela de teste</td></tr></tbody></table>\n<p>Nesta aula, o uso é estritamente defensivo: testar seus próprios ativos, laboratórios controlados ou ambientes para os quais você tem autorização.</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<p>O diagrama mostra como ping, TTL e traceroute se relacionam. O ping espera resposta do destino. O traceroute força respostas intermediárias usando TTL crescente.</p>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 610\" role=\"img\" aria-labelledby=\"m04l08-title m04l08-desc\">\n<title id=\"m04l08-title\">Ping, TTL e traceroute em IPv4</title>\n<desc id=\"m04l08-desc\">Host de origem envia pacotes ICMP por roteadores. Cada roteador reduz TTL. O traceroute descobre saltos quando TTL expira e roteadores retornam ICMP Time Exceeded.</desc>\n<defs><marker id=\"m04l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\" /></marker></defs>\n<rect x=\"40\" y=\"55\" width=\"165\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--client\" />\n<text x=\"122\" y=\"96\" text-anchor=\"middle\" class=\"svg-label\">Origem</text>\n<text x=\"122\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ping/traceroute</text>\n<rect x=\"275\" y=\"55\" width=\"145\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--router\" />\n<text x=\"347\" y=\"96\" text-anchor=\"middle\" class=\"svg-label\">R1</text>\n<text x=\"347\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TTL -1</text>\n<rect x=\"520\" y=\"55\" width=\"145\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--router\" />\n<text x=\"592\" y=\"96\" text-anchor=\"middle\" class=\"svg-label\">R2</text>\n<text x=\"592\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TTL -1</text>\n<rect x=\"765\" y=\"55\" width=\"165\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--server\" />\n<text x=\"847\" y=\"96\" text-anchor=\"middle\" class=\"svg-label\">Destino</text>\n<text x=\"847\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Echo Reply?</text>\n<line x1=\"205\" y1=\"107\" x2=\"275\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l08-arrow)\" />\n<line x1=\"420\" y1=\"107\" x2=\"520\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l08-arrow)\" />\n<line x1=\"665\" y1=\"107\" x2=\"765\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l08-arrow)\" />\n<rect x=\"90\" y=\"230\" width=\"800\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n<text x=\"490\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Ping</text>\n<text x=\"490\" y=\"295\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Echo Request vai até o destino; Echo Reply volta se permitido por rota e política.</text>\n<rect x=\"90\" y=\"370\" width=\"245\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--security\" />\n<text x=\"212\" y=\"410\" text-anchor=\"middle\" class=\"svg-label\">TTL 1</text>\n<text x=\"212\" y=\"438\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">R1 descarta</text>\n<text x=\"212\" y=\"463\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Time Exceeded</text>\n<rect x=\"368\" y=\"370\" width=\"245\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--security\" />\n<text x=\"490\" y=\"410\" text-anchor=\"middle\" class=\"svg-label\">TTL 2</text>\n<text x=\"490\" y=\"438\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">R2 descarta</text>\n<text x=\"490\" y=\"463\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Time Exceeded</text>\n<rect x=\"646\" y=\"370\" width=\"245\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--security\" />\n<text x=\"768\" y=\"410\" text-anchor=\"middle\" class=\"svg-label\">TTL 3+</text>\n<text x=\"768\" y=\"438\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Destino responde</text>\n<text x=\"768\" y=\"463\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ou política bloqueia</text>\n<text x=\"490\" y=\"550\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Asteriscos no traceroute podem significar filtro, rate limit ou ausência de resposta ICMP — não necessariamente queda do roteador.</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório treina uma sequência segura de diagnóstico: pilha local, IP da interface, gateway, destino interno, destino externo autorizado e caminho provável com traceroute. O objetivo não é varrer redes, mas aprender a interpretar evidências.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam interpretação de respostas ICMP, TTL, perda, latência, rota, bloqueio e diferenças entre falha de rede e falha de aplicação.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Você irá analisar um incidente em que o gateway responde, um servidor interno não responde ping, o traceroute mostra parada no firewall e a aplicação também falha. O desafio é construir hipóteses sem concluir prematuramente.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como separar alcance local, saída pelo gateway, política intermediária, rota de retorno, bloqueio de ICMP e falha real do serviço.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li>ICMP é protocolo de controle associado ao IP.</li><li>Ping testa resposta ICMP, não prova que uma aplicação funciona.</li><li>TTL evita loops infinitos e permite o funcionamento do traceroute.</li><li>Traceroute revela saltos que respondem, não necessariamente todos os roteadores do caminho.</li><li>Bloquear ICMP totalmente pode prejudicar diagnóstico e alguns mecanismos de rede.</li><li>Diagnóstico sério combina ICMP com ARP, rotas, DNS, portas, firewall, logs e métricas.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, estudaremos <strong>Troubleshooting IPv4 com Windows, Linux e Cisco</strong>. Vamos transformar os conceitos deste módulo em um método operacional completo de diagnóstico.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3 — Rede",
      "Camada 2 — Enlace",
      "Camada 7 — Aplicação"
    ],
    "tcpIpLayers": [
      "Internet",
      "Acesso à rede",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IPv4",
      "ICMP",
      "ARP",
      "DNS",
      "TCP",
      "UDP"
    ],
    "dependsOn": [
      "IPv4",
      "máscara",
      "gateway",
      "rota default",
      "ARP",
      "firewall"
    ],
    "enables": [
      "diagnóstico de alcance",
      "troubleshooting por camadas",
      "interpretação de traceroute",
      "validação de rota",
      "triagem de incidentes"
    ]
  },
  "protocolFields": [
    {
      "name": "ICMP Type",
      "bits": "8",
      "description": "Indica a categoria da mensagem, como Echo Reply, Destination Unreachable, Echo Request ou Time Exceeded.",
      "securityNote": "Tipos permitidos devem ser escolhidos por política; bloquear tudo pode prejudicar diagnóstico."
    },
    {
      "name": "ICMP Code",
      "bits": "8",
      "description": "Detalha o motivo dentro de um tipo ICMP.",
      "securityNote": "Códigos ajudam a diferenciar rede, host, protocolo, porta ou política inalcançável."
    },
    {
      "name": "Checksum",
      "bits": "16",
      "description": "Ajuda a validar integridade da mensagem ICMP.",
      "securityNote": "Pacotes corrompidos ou manipulados podem ser descartados."
    },
    {
      "name": "Identifier",
      "bits": "16",
      "description": "Ajuda a associar Echo Request e Echo Reply ao processo que gerou o teste.",
      "securityNote": "Pode aparecer em capturas e deve ser tratado como evidência técnica."
    },
    {
      "name": "Sequence Number",
      "bits": "16",
      "description": "Numera mensagens de echo para medir perda e ordem.",
      "securityNote": "Sequência ajuda a detectar perda intermitente ou respostas fora de ordem."
    },
    {
      "name": "IPv4 TTL",
      "bits": "8",
      "description": "Campo do cabeçalho IPv4 reduzido a cada roteador.",
      "securityNote": "TTL expirado pode indicar caminho longo, loop ou funcionamento normal do traceroute."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Origem prepara teste",
      "description": "O host cria uma mensagem ICMP Echo Request ou pacote usado pelo traceroute.",
      "layer": "Camada 3",
      "securityNote": "O teste deve ter escopo autorizado e taxa controlada."
    },
    {
      "step": 2,
      "name": "Consulta de rota",
      "description": "O sistema decide se o destino é local ou se deve enviar ao gateway padrão.",
      "layer": "Camada 3",
      "securityNote": "Rota default errada muda todo o diagnóstico."
    },
    {
      "step": 3,
      "name": "Entrega local ao gateway",
      "description": "Se o destino é remoto, ARP resolve o MAC do gateway e o frame Ethernet é enviado.",
      "layer": "Camada 2/3",
      "securityNote": "ARP spoofing ou gateway falso podem alterar o caminho."
    },
    {
      "step": 4,
      "name": "Decremento de TTL",
      "description": "Cada roteador reduz o TTL em 1 antes de encaminhar.",
      "layer": "Camada 3",
      "securityNote": "Loops consomem TTL até expirar."
    },
    {
      "step": 5,
      "name": "Resposta intermediária ou final",
      "description": "Roteadores podem responder Time Exceeded; destino pode responder Echo Reply.",
      "layer": "Camada 3",
      "securityNote": "Firewalls podem bloquear respostas sem impedir necessariamente o tráfego de aplicação."
    },
    {
      "step": 6,
      "name": "Interpretação",
      "description": "A origem exibe latência, perda, saltos, asteriscos ou mensagens de erro.",
      "layer": "Operacional",
      "securityNote": "Resultado deve ser correlacionado com logs, rotas, DNS e testes de porta."
    }
  ],
  "deepDive": {
    "mentalModel": "ICMP é como o painel de avisos do IP. Ele não carrega sua aplicação, mas informa sinais sobre alcance, erro, caminho e expiração de pacotes.",
    "keyTerms": [
      "ICMP",
      "Echo Request",
      "Echo Reply",
      "TTL",
      "Time Exceeded",
      "Destination Unreachable",
      "traceroute",
      "latência"
    ],
    "limitations": [
      "Ping bem-sucedido não prova que HTTP, SSH, banco ou API funcionam.",
      "Ping sem resposta não prova que o host está desligado.",
      "Traceroute pode ocultar saltos por filtros, rate limit ou políticas de roteadores.",
      "Rotas podem ser assimétricas: o caminho de ida pode ser diferente do caminho de volta.",
      "Ambientes cloud podem abstrair ou bloquear respostas intermediárias."
    ],
    "whenToUse": [
      "Use ping para validar alcance ICMP básico e medir latência aproximada.",
      "Use traceroute para observar o caminho provável até um destino.",
      "Use ICMP como etapa inicial de troubleshooting por camadas.",
      "Use testes repetidos e documentados para detectar perda intermitente."
    ],
    "whenNotToUse": [
      "Não use ping como prova única de disponibilidade de aplicação.",
      "Não execute varreduras ICMP fora de escopo autorizado.",
      "Não conclua que um roteador caiu apenas porque aparece asterisco no traceroute.",
      "Não libere ICMP publicamente sem política, rate limit e monitoramento."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Dizer que a rede está boa só porque o ping respondeu",
      "impact": "Ignora portas, DNS, TLS, proxy, autenticação e aplicação",
      "correction": "Usar ping como primeira evidência e continuar com testes específicos."
    },
    {
      "mistake": "Dizer que o host está fora só porque não responde ping",
      "impact": "Gera falso diagnóstico em ambientes que bloqueiam ICMP",
      "correction": "Testar rota, porta TCP/UDP, logs e política de firewall."
    },
    {
      "mistake": "Interpretar asterisco no traceroute como queda do roteador",
      "impact": "Perde tempo investigando equipamento que apenas não responde ICMP",
      "correction": "Verificar se saltos posteriores respondem e correlacionar com políticas."
    },
    {
      "mistake": "Confundir DNS com ICMP",
      "impact": "Achar que ping por nome falhou por rede quando o problema era resolução de nomes",
      "correction": "Testar IP e nome separadamente."
    },
    {
      "mistake": "Executar ping contínuo ou massivo em produção",
      "impact": "Gera ruído, alertas e possível impacto operacional",
      "correction": "Usar taxa controlada e janela autorizada."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      {
        "symptom": "Ping para gateway falha",
        "likelyCauses": [
          "IP/máscara errados",
          "gateway incorreto",
          "ARP falhando",
          "VLAN errada",
          "firewall local"
        ],
        "firstChecks": [
          "ipconfig /all ou ip addr",
          "arp -a ou ip neigh",
          "tabela de rotas",
          "link físico/Wi-Fi"
        ]
      },
      {
        "symptom": "Ping para IP externo falha, gateway responde",
        "likelyCauses": [
          "rota default/firewall",
          "NAT",
          "bloqueio ICMP",
          "provedor/VPN"
        ],
        "firstChecks": [
          "route print ou ip route",
          "traceroute",
          "logs de firewall",
          "teste TCP para serviço autorizado"
        ]
      },
      {
        "symptom": "Ping por IP funciona, por nome falha",
        "likelyCauses": [
          "DNS incorreto",
          "sufixo de busca",
          "resolver local",
          "bloqueio ao DNS"
        ],
        "firstChecks": [
          "nslookup",
          "resolvectl status",
          "ipconfig /displaydns",
          "servidor DNS entregue por DHCP"
        ]
      },
      {
        "symptom": "Traceroute para em um firewall",
        "likelyCauses": [
          "ICMP filtrado",
          "ACL",
          "rota de retorno",
          "NAT",
          "política de egress"
        ],
        "firstChecks": [
          "logs de firewall",
          "teste por porta",
          "flow logs",
          "rota nos dois sentidos"
        ]
      },
      {
        "symptom": "Perda intermitente no ping",
        "likelyCauses": [
          "Wi-Fi instável",
          "congestionamento",
          "duplex/erro físico",
          "CPU do equipamento",
          "rate limit de ICMP"
        ],
        "firstChecks": [
          "testar gateway",
          "testar cabo",
          "contadores de interface",
          "métricas de AP/switch"
        ]
      }
    ],
    "commands": [
      {
        "windows": [
          "ping 127.0.0.1",
          "ping <gateway>",
          "ping <destino-ip>",
          "tracert <destino>",
          "pathping <destino>",
          "route print",
          "Test-NetConnection <host> -Port 443"
        ],
        "linux": [
          "ping -c 4 127.0.0.1",
          "ping -c 4 <gateway>",
          "traceroute <destino>",
          "traceroute -I <destino>",
          "tracepath <destino>",
          "ip route",
          "ss -tunap"
        ],
        "cisco": [
          "ping <destino>",
          "traceroute <destino>",
          "show ip route",
          "show ip interface brief",
          "show access-lists",
          "show logging | include ICMP"
        ],
        "cloud": [
          "Verificar security group/NSG para ICMP",
          "Verificar tabela de rotas da subnet",
          "Verificar NACL/firewall",
          "Consultar flow logs",
          "Testar porta da aplicação além de ICMP"
        ]
      }
    ],
    "decisionTree": [
      "Teste loopback para separar pilha local de rede externa.",
      "Teste IP da própria interface para validar configuração local.",
      "Teste gateway para validar enlace local e ARP até o primeiro salto.",
      "Teste destino por IP para separar DNS de conectividade IP.",
      "Teste destino por nome para validar DNS.",
      "Use traceroute para localizar o trecho provável da falha.",
      "Finalize com teste de porta/aplicação, logs e política."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ]
  },
  "security": {
    "badPractices": [
      "Liberar ICMP irrestrito para todos os ativos públicos sem necessidade.",
      "Bloquear todo ICMP sem entender impactos em diagnóstico e MTU.",
      "Executar varredura ICMP fora de autorização.",
      "Concluir disponibilidade de aplicação usando apenas ping.",
      "Ignorar a possibilidade de rate limit em roteadores e firewalls."
    ],
    "vulnerabilities": [
      {
        "name": "Reconhecimento de ativos por resposta ICMP.",
        "description": "Risco relacionado à aula 4.8 — ICMP, ping, TTL e traceroute.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Filtrar ICMP por origem, destino e tipo quando necessário."
      },
      {
        "name": "Exposição desnecessária de topologia por traceroute.",
        "description": "Risco relacionado à aula 4.8 — ICMP, ping, TTL e traceroute.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Aplicar rate limiting."
      },
      {
        "name": "Uso indevido de ICMP para ruído, DoS ou tunelamento em ambientes mal controlados.",
        "description": "Risco relacionado à aula 4.8 — ICMP, ping, TTL e traceroute.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Monitorar anomalias ICMP em firewall, IDS/NDR e SIEM."
      },
      {
        "name": "Políticas assimétricas que permitem saída mas bloqueiam retorno de forma inconsistente.",
        "description": "Risco relacionado à aula 4.8 — ICMP, ping, TTL e traceroute.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Manter runbooks de diagnóstico aprovados."
      }
    ],
    "mitigations": [
      "Filtrar ICMP por origem, destino e tipo quando necessário.",
      "Aplicar rate limiting.",
      "Monitorar anomalias ICMP em firewall, IDS/NDR e SIEM.",
      "Manter runbooks de diagnóstico aprovados.",
      "Usar segmentação e controles de egress para limitar abuso."
    ],
    "goodPractices": [
      "Permitir ICMP necessário de forma controlada em redes internas.",
      "Aplicar rate limit e monitoramento para ICMP exposto.",
      "Registrar testes relevantes com origem, destino, horário e comando.",
      "Combinar ICMP com flow logs, firewall logs e testes de porta.",
      "Separar políticas para diagnóstico interno e exposição pública."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Filtrar ICMP por origem, destino e tipo quando necessário.",
      "Aplicar rate limiting.",
      "Monitorar anomalias ICMP em firewall, IDS/NDR e SIEM.",
      "Manter runbooks de diagnóstico aprovados.",
      "Usar segmentação e controles de egress para limitar abuso."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-4.8",
    "title": "Diagnóstico seguro com ICMP, ping, TTL e traceroute",
    "labType": "security",
    "objective": "Executar uma sequência controlada de testes ICMP e traceroute para diferenciar pilha local, gateway, DNS, rota, bloqueio e serviço.",
    "scenario": "15. Laboratório O laboratório treina uma sequência segura de diagnóstico: pilha local, IP da interface, gateway, destino interno, destino externo autorizado e caminho provável com traceroute. O objetivo não é varrer redes, mas aprender a interpretar evidências.",
    "topology": "Host aluno conectado a uma LAN com gateway. Opcionalmente, um roteador/firewall e um destino interno ou VM de laboratório.",
    "architecture": "O host testa loopback, própria interface, gateway, destino por IP, destino por nome e caminho provável até o destino.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 130,
    "cost": "zero",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar configuração local",
        "instruction": "Identifique IP, máscara, gateway e DNS do host.",
        "command": "Windows: ipconfig /all\nLinux: ip addr show && ip route\nPowerShell: Get-NetIPConfiguration",
        "expectedOutput": "Você deve saber qual interface será usada e qual gateway está configurado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “ICMP, ping, TTL e traceroute” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Testar pilha local",
        "instruction": "Teste o loopback para validar a pilha local TCP/IP.",
        "command": "Windows/Linux: ping 127.0.0.1\nPowerShell: Test-NetConnection 127.0.0.1",
        "expectedOutput": "O loopback deve responder.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “ICMP, ping, TTL e traceroute” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Testar o gateway",
        "instruction": "Execute ping para o gateway padrão.",
        "command": "Windows: ping <IP_DO_GATEWAY>\nLinux: ping -c 4 <IP_DO_GATEWAY>\nPowerShell: Test-NetConnection <IP_DO_GATEWAY>",
        "expectedOutput": "Gateway deve responder em laboratório comum, salvo política que bloqueie ICMP.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “ICMP, ping, TTL e traceroute” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Testar destino por IP",
        "instruction": "Teste um destino interno autorizado por endereço IP.",
        "command": "Windows: ping <IP_INTERNO_AUTORIZADO>\nLinux: ping -c 4 <IP_INTERNO_AUTORIZADO>\nPowerShell: Test-NetConnection <IP_INTERNO_AUTORIZADO>",
        "expectedOutput": "O resultado deve indicar resposta, timeout ou mensagem ICMP de erro.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “ICMP, ping, TTL e traceroute” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Testar destino por nome",
        "instruction": "Teste um nome interno ou controlado para separar DNS de conectividade IP.",
        "command": "Windows: nslookup <nome_autorizado> && ping <nome_autorizado>\nPowerShell: Resolve-DnsName <nome_autorizado>; Test-NetConnection <nome_autorizado>\nLinux: dig <nome_autorizado> +short && ping -c 4 <nome_autorizado>",
        "expectedOutput": "Você deve identificar se o nome resolve para IP antes do ping.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “ICMP, ping, TTL e traceroute” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Executar traceroute",
        "instruction": "Mapeie o caminho provável até o destino autorizado.",
        "command": "Windows: tracert <destino_autorizado>\nLinux: traceroute <destino_autorizado> || tracepath <destino_autorizado>\nPowerShell: Test-NetConnection <destino_autorizado> -TraceRoute",
        "expectedOutput": "A saída deve mostrar saltos ou asteriscos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “ICMP, ping, TTL e traceroute” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Documentar evidências",
        "instruction": "Monte uma tabela com teste, resultado, interpretação e próxima hipótese.",
        "command": "Crie uma tabela com as colunas: Teste | Comando | Resultado | Interpretação | Próxima hipótese | Evidência coletada | Dado sensível removido",
        "expectedOutput": "Relatório curto e sem dados sensíveis.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “ICMP, ping, TTL e traceroute” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “ICMP, ping, TTL e traceroute”.",
    "validation": [
      {
        "check": "Configuração local registrada",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Configuração local registrada",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Gateway testado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Gateway testado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Destino por IP testado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Destino por IP testado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Destino por nome testado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Destino por nome testado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Traceroute interpretado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Traceroute interpretado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Relatório sanitizado produzido",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Relatório sanitizado produzido",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Sem IP válido: investigar DHCP/APIPA",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Gateway não responde: investigar ARP/VLAN/máscara",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "IP responde e nome falha: investigar DNS",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Traceroute com asteriscos: investigar filtro/rate limit antes de concluir queda",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Aplicação falha com ping funcionando: testar porta/protocolo",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar teste TCP com Test-NetConnection ou nc",
      "Capturar ICMP com Wireshark em laboratório",
      "Comparar traceroute ICMP e UDP",
      "Criar runbook de diagnóstico IPv4",
      "Integrar logs de firewall/flow logs"
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “ICMP, ping, TTL e traceroute” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Incidente: gateway responde, aplicação falha e traceroute para no firewall",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "duration": "60-90 min",
    "environment": "Windows, Linux ou laboratório Cisco/Packet Tracer. Não use redes de terceiros sem autorização.",
    "safetyRules": [
      "Não execute varredura em faixas inteiras sem autorização.",
      "Não use ping flood ou ferramentas agressivas.",
      "Não publique IPs públicos, nomes internos ou topologia real no relatório.",
      "Use destinos próprios, internos ou explicitamente permitidos."
    ],
    "expectedOutcome": "Ao final, o aluno deve conseguir explicar por que um teste falhou, qual camada é suspeita e qual próximo teste faria sentido."
  },
  "mentorQuestions": [
    {
      "question": "Por que ping respondendo não prova que a aplicação está disponível?",
      "expectedThinking": "Porque ping testa ICMP; aplicação pode depender de DNS, TCP, TLS, autenticação, porta, proxy e backend."
    },
    {
      "question": "Por que traceroute pode mostrar asteriscos mesmo quando o destino funciona?",
      "expectedThinking": "Porque roteadores intermediários podem encaminhar tráfego, mas não responder ICMP Time Exceeded por política ou rate limit."
    },
    {
      "question": "Qual teste você faria depois de pingar o gateway com sucesso, mas falhar ao acessar um site interno por nome?",
      "expectedThinking": "Testaria resolução DNS, ping por IP, conexão TCP na porta correta e logs/políticas do caminho."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Qual afirmação sobre ICMP está correta?",
      "options": [
        "ICMP usa porta TCP 7",
        "ICMP é um protocolo de controle associado ao IP",
        "ICMP substitui DNS",
        "ICMP só existe em redes Wi-Fi"
      ],
      "answer": 1,
      "explanation": "ICMP transporta mensagens de controle relacionadas ao IP, como Echo e Time Exceeded."
    },
    {
      "id": "q2",
      "question": "O que o TTL faz no IPv4?",
      "options": [
        "Criptografa o pacote",
        "Define o endereço de destino",
        "Limita a vida do pacote em saltos",
        "Resolve nomes DNS"
      ],
      "answer": 2,
      "explanation": "Cada roteador decrementa o TTL; quando chega a zero, o pacote é descartado."
    },
    {
      "id": "q3",
      "question": "O que um ping bem-sucedido prova?",
      "options": [
        "Que HTTP funciona",
        "Que DNS sempre está correto",
        "Que houve resposta ICMP do destino",
        "Que não existe firewall"
      ],
      "answer": 2,
      "explanation": "Ping bem-sucedido prova resposta ICMP, não disponibilidade da aplicação."
    },
    {
      "id": "q4",
      "question": "Traceroute normalmente depende de qual comportamento?",
      "options": [
        "TTL expirando em saltos intermediários",
        "ARP atravessando roteadores",
        "DHCP renovando lease",
        "DNS bloqueando nomes"
      ],
      "answer": 0,
      "explanation": "Traceroute usa TTL crescente para provocar mensagens de Time Exceeded em roteadores intermediários."
    },
    {
      "id": "q5",
      "question": "Se ping por IP funciona e ping por nome falha, qual hipótese ganha força?",
      "options": [
        "Problema de DNS",
        "Cabo rompido",
        "Loop STP",
        "Máscara sempre /32"
      ],
      "answer": 0,
      "explanation": "Se o IP responde, a conectividade básica existe; falha por nome aponta para resolução DNS ou sufixo."
    },
    {
      "id": "q6",
      "question": "Qual é uma prática defensiva adequada para ICMP?",
      "options": [
        "Liberar tudo para a Internet sem logs",
        "Bloquear todo ICMP sempre",
        "Permitir o necessário de forma controlada e monitorada",
        "Usar ping flood para validar disponibilidade"
      ],
      "answer": 2,
      "explanation": "A política madura equilibra diagnóstico, segurança, rate limit e monitoramento."
    }
  ],
  "flashcards": [
    {
      "front": "ICMP",
      "back": "Protocolo de mensagens de controle usado junto ao IP para erros, eco e diagnóstico."
    },
    {
      "front": "Echo Request",
      "back": "Mensagem enviada pelo ping para solicitar resposta do destino."
    },
    {
      "front": "Echo Reply",
      "back": "Resposta ICMP enviada pelo destino quando responde ao ping."
    },
    {
      "front": "TTL",
      "back": "Campo IPv4 decrementado por roteadores para evitar loops infinitos."
    },
    {
      "front": "Time Exceeded",
      "back": "Mensagem ICMP normalmente enviada quando o TTL chega a zero."
    },
    {
      "front": "Traceroute",
      "back": "Ferramenta que tenta revelar saltos usando TTL crescente e respostas intermediárias."
    }
  ],
  "exercises": [
    {
      "id": "e1",
      "prompt": "Explique por que um servidor pode responder ping e ainda assim a aplicação HTTPS estar indisponível.",
      "expectedAnswer": "Porque ICMP e HTTPS são testes diferentes; a porta 443, TLS, aplicação, proxy ou backend podem falhar mesmo com ICMP funcionando."
    },
    {
      "id": "e2",
      "prompt": "Um host pinga o gateway, mas não pinga um servidor em outra VLAN. Liste quatro hipóteses.",
      "expectedAnswer": "Rota, firewall/ACL, servidor desligado, ICMP bloqueado, rota de retorno, NAT ou política intermediária."
    },
    {
      "id": "e3",
      "prompt": "O traceroute mostra asteriscos no salto 5, mas chega ao destino no salto 8. O que isso indica?",
      "expectedAnswer": "O salto 5 provavelmente não respondeu ao traceroute, mas encaminhou tráfego. Não prova queda desse roteador."
    },
    {
      "id": "e4",
      "prompt": "Monte uma sequência mínima de testes para diferenciar DNS de conectividade IP.",
      "expectedAnswer": "Testar IP direto, resolver nome com nslookup/getent, pingar nome e testar porta da aplicação."
    }
  ],
  "challenge": {
    "title": "Incidente: gateway responde, aplicação falha e traceroute para no firewall",
    "scenario": "Usuários da VLAN 30 acessam o gateway normalmente. Ping para um servidor interno não responde. Traceroute chega até o firewall e depois mostra asteriscos. A aplicação web também não abre na porta 443.",
    "tasks": [
      "Separar fatos observados de hipóteses.",
      "Listar pelo menos cinco causas possíveis.",
      "Definir próximos testes seguros.",
      "Indicar quais logs pedir ao time de firewall/rede.",
      "Criar uma conclusão provisória sem afirmar o que ainda não foi provado."
    ],
    "rubric": [
      "Identifica que gateway respondendo reduz probabilidade de falha local simples.",
      "Não conclui que o firewall caiu apenas por asteriscos.",
      "Inclui teste TCP/443 além de ICMP.",
      "Considera rota de retorno e política de firewall.",
      "Documenta evidências de forma sanitizada."
    ]
  },
  "commentedSolution": {
    "summary": "A evidência indica que a estação tem conectividade local até o gateway e que o problema está provavelmente além da VLAN do usuário. Porém, traceroute com asteriscos não prova queda. Como a aplicação também falha, é necessário testar porta 443 e verificar políticas/logs.",
    "steps": [
      "Confirmar IP, máscara, gateway e DNS do cliente.",
      "Confirmar ping para gateway e ARP do gateway.",
      "Testar servidor por IP e por nome para separar DNS.",
      "Testar TCP/443 com ferramenta adequada, como Test-NetConnection ou nc.",
      "Pedir logs do firewall filtrados por origem, destino, porta, horário e ação.",
      "Verificar rota de retorno no lado do servidor e políticas entre VLANs.",
      "Registrar conclusão provisória: falha provável em política/rota/serviço entre firewall e servidor, pendente de logs."
    ],
    "whyItWorks": "A solução evita confundir ICMP com aplicação, usa traceroute como evidência parcial e fecha o diagnóstico com teste de porta e logs do caminho."
  },
  "glossary": [
    {
      "term": "ICMP",
      "definition": "Protocolo de mensagens de controle usado com IP para erros e diagnóstico."
    },
    {
      "term": "Ping",
      "definition": "Ferramenta que normalmente usa ICMP Echo Request e Echo Reply para testar resposta."
    },
    {
      "term": "TTL",
      "definition": "Campo IPv4 decrementado a cada roteador para limitar a vida do pacote."
    },
    {
      "term": "Traceroute",
      "definition": "Ferramenta que tenta revelar saltos até um destino explorando TTL crescente."
    },
    {
      "term": "Time Exceeded",
      "definition": "Mensagem ICMP enviada quando o TTL expira em um roteador."
    },
    {
      "term": "Destination Unreachable",
      "definition": "Mensagem ICMP que indica alguma forma de destino, rede, protocolo ou porta inalcançável."
    }
  ],
  "references": [
    {
      "title": "RFC 792 — Internet Control Message Protocol",
      "type": "RFC",
      "note": "Base conceitual do ICMP para IPv4."
    },
    {
      "title": "RFC 1812 — Requirements for IP Version 4 Routers",
      "type": "RFC",
      "note": "Comportamento de roteadores IPv4, incluindo TTL e mensagens ICMP."
    },
    {
      "title": "Cisco — Troubleshooting IP Connectivity",
      "type": "documentação",
      "note": "Referência operacional para testes de conectividade e roteamento."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e Operação",
      "reason": "Ping e traceroute devem ser combinados com métricas, logs, traces e health checks."
    },
    {
      "course": "Identity, Access Management e Segurança de Identidades",
      "module": "Acesso entre serviços",
      "reason": "Conectividade IP não prova autorização, identidade, token válido ou permissão de aplicação."
    }
  ],
  "progressRules": {
    "completionCriteria": [
      "Ler todas as seções",
      "Executar ou simular o laboratório",
      "Acertar pelo menos 70% do quiz",
      "Registrar uma matriz de diagnóstico ICMP",
      "Responder ao desafio com solução comentada"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "4.9"
    ],
    "xpAward": 225,
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "oneOf": [
          "labMarkedDone",
          "practicalExerciseDone"
        ]
      }
  }
};
