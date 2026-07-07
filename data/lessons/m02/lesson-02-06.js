export const lesson0206 = {
  "id": "2.6",
  "moduleId": "m02",
  "order": 6,
  "title": "Camada 4 — Transporte: TCP, UDP, portas e conexões",
  "subtitle": "A camada que permite que aplicações conversem usando portas, conexões, confiabilidade, estado e controle de entrega.",
  "duration": "90-125 min",
  "estimatedStudyTimeMinutes": 125,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 210,
  "tags": [
    "redes",
    "modelo osi",
    "camada 4",
    "transporte",
    "tcp",
    "udp",
    "portas",
    "conexões",
    "firewall",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 apresentou o Modelo OSI como método de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "A aula 2.2 explicou encapsulamento e mostrou a PDU de transporte dentro do pacote IP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.5",
      "reason": "A aula 2.5 explicou como o pacote IP chega até outra rede antes da aplicação conversar."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.9",
      "reason": "A aula 1.9 apresentou comandos iniciais de diagnóstico que serão usados para testar portas e conexões."
    }
  ],
  "objectives": [
    "Explicar o papel da Camada 4 no Modelo OSI.",
    "Diferenciar TCP, UDP, porta, socket, conexão e sessão de aplicação.",
    "Descrever o fluxo básico do TCP three-way handshake em nível defensivo.",
    "Entender por que firewalls e balanceadores usam portas e estado de conexão.",
    "Relacionar Camada 4 com APIs, TLS, Kubernetes, cloud, logs e segurança.",
    "Coletar evidências básicas de portas abertas, conexões estabelecidas e falhas de transporte."
  ],
  "learningOutcomes": [
    "Dado um erro de acesso a serviço, o aluno diferencia falha de rota, falha de porta, falha de TLS e falha de aplicação.",
    "Dado um comando netstat, ss ou Test-NetConnection, o aluno identifica porta local, porta remota e estado de conexão.",
    "Dado um fluxo TCP, o aluno explica SYN, SYN-ACK, ACK, FIN e RST em linguagem defensiva.",
    "Dado um cenário de firewall, o aluno entende por que liberar IP sem porta não define uma política suficiente.",
    "Dado um serviço UDP, o aluno entende por que ausência de conexão não significa ausência de risco."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Na Camada 3, você aprendeu como um pacote IP encontra outra rede por meio de gateway, rotas e TTL. Mas alcançar o servidor ainda não significa acessar o serviço certo. Um mesmo servidor pode hospedar HTTPS na porta 443, SSH na porta 22, DNS na porta 53, banco de dados em outra porta, métricas em uma porta interna e uma API em um caminho HTTP específico.</p>\n  <p>A Camada 4 existe para resolver uma pergunta que a Camada 3 não resolve: dentro de um host, qual processo ou serviço deve receber aquele tráfego? É aqui que entram TCP, UDP, portas, conexões, sockets, estados e controle de entrega.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um servidor responde ping, a rota está correta e o DNS resolve, mas o sistema continua indisponível. O problema pode estar na porta fechada, em um firewall bloqueando TCP/443, em uma aplicação que não está escutando, em uma conexão resetada, em timeout TCP, em balanceador sem backend saudável ou em um serviço UDP sem resposta observável.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Quando redes começaram a conectar computadores diferentes, não bastava entregar bytes a uma máquina. Era necessário entregar os dados ao programa correto. Um computador podia executar vários serviços ao mesmo tempo: terminal remoto, transferência de arquivos, correio eletrônico, resolução de nomes e aplicações corporativas. Endereços IP identificavam hosts, mas não identificavam processos.</p>\n  <p>O TCP surgiu para oferecer transporte confiável, ordenado e orientado à conexão sobre uma rede IP que pode perder, atrasar ou reordenar pacotes. O UDP surgiu como alternativa mais simples, sem estabelecimento de conexão e com menor overhead, útil quando a aplicação prefere controlar retransmissão, tolerar perda ou priorizar baixa latência.</p>\n  <p>Com o tempo, portas se tornaram elementos centrais de operação e segurança. Firewalls, NAT, proxies, balanceadores, scanners defensivos, SIEMs, Kubernetes Services e cloud security groups frequentemente descrevem tráfego como combinação de origem, destino, protocolo de transporte e porta.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>Sem Camada 4, a rede conseguiria entregar um pacote ao host, mas não saberia qual aplicação deve processar o conteúdo. Também faltaria uma forma padronizada de controlar confiabilidade, ordem, retransmissão, multiplexação e demultiplexação de fluxos.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Multiplexação:</strong> vários serviços podem existir no mesmo host usando portas diferentes.</li>\n    <li><strong>Demultiplexação:</strong> o sistema operacional entrega o tráfego ao processo correto.</li>\n    <li><strong>Confiabilidade:</strong> TCP confirma recebimento, ordena segmentos e retransmite quando necessário.</li>\n    <li><strong>Baixa latência:</strong> UDP evita handshake e controle pesado quando a aplicação aceita esse modelo.</li>\n    <li><strong>Controle de segurança:</strong> políticas podem permitir ou negar tráfego por protocolo e porta.</li>\n  </ul>\n  <p>O erro comum é tratar conectividade IP como disponibilidade de serviço. Pingar um servidor não prova que TCP/443 está aberto, que a aplicação responde, que TLS negocia corretamente ou que a autenticação funciona. Cada camada precisa de evidências próprias.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A Camada 4 evoluiu de serviços simples em hosts fixos para ambientes distribuídos com balanceadores, microserviços, service mesh, containers, cloud e políticas de segurança automatizadas.</p>\n  <table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead><tbody>\n    <tr><td>Serviços simples por porta</td><td>Um host escutava portas bem conhecidas como 22, 25, 53, 80 e 443.</td><td>Escala e resiliência limitadas ao host.</td><td>Balanceadores, clusters e failover.</td></tr>\n    <tr><td>TCP confiável</td><td>Handshake, sequência, confirmação e retransmissão.</td><td>Mais overhead e sensibilidade a latência/perda.</td><td>Ajustes de janela, otimizações e uso seletivo de UDP/QUIC.</td></tr>\n    <tr><td>UDP simples</td><td>Datagramas sem conexão e sem garantia nativa.</td><td>A aplicação precisa lidar com perda e ordem se isso importar.</td><td>Protocolos de aplicação com lógica própria, como DNS, VoIP e QUIC.</td></tr>\n    <tr><td>Firewall stateful</td><td>Dispositivo acompanha estado de conexões TCP e fluxos permitidos.</td><td>Exige tabela de estado e pode sofrer saturação.</td><td>NGFW, WAF, observabilidade e políticas por identidade/contexto.</td></tr>\n    <tr><td>Cloud e Kubernetes</td><td>Portas viram regras em security groups, Services, Ingress e NetworkPolicies.</td><td>Erro de IaC pode expor serviços ou bloquear produção.</td><td>Policy as code, revisão automática e service mesh.</td></tr>\n  </tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>A Camada 4 do Modelo OSI, chamada de Transporte, fornece comunicação lógica entre processos em hosts diferentes. Em redes TCP/IP, os dois protocolos mais conhecidos dessa função são TCP e UDP.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> a Camada 4 usa protocolos de transporte, portas e estados para entregar dados ao serviço correto e, dependendo do protocolo, oferecer confiabilidade, ordenação, controle de fluxo e controle de conexão.</div>\n  <p>Uma porta não é uma tomada física. Uma porta é um número lógico usado pelo sistema operacional e pelos protocolos de transporte para identificar serviços e fluxos. Quando você acessa HTTPS, normalmente fala com TCP/443. Quando consulta DNS tradicional, pode usar UDP/53 ou TCP/53. Quando acessa SSH, usa TCP/22.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O funcionamento interno da Camada 4 depende do protocolo. TCP é orientado à conexão; UDP é baseado em datagramas.</p>\n  <ol class=\"flow-list\">\n    <li>Uma aplicação cliente solicita ao sistema operacional uma conexão ou envio para IP, protocolo e porta de destino.</li>\n    <li>O sistema escolhe uma porta local efêmera para representar aquele fluxo do cliente.</li>\n    <li>No TCP, o cliente envia SYN para iniciar o three-way handshake.</li>\n    <li>O servidor responde SYN-ACK se estiver escutando e se políticas permitirem.</li>\n    <li>O cliente envia ACK e a conexão fica estabelecida.</li>\n    <li>Durante a transferência, TCP usa números de sequência, confirmações, janelas e retransmissões.</li>\n    <li>Ao encerrar, podem aparecer FIN, ACK e, em alguns casos, RST para resetar a conexão.</li>\n    <li>No UDP, não há handshake nativo. A aplicação envia datagramas e decide como lidar com ausência de resposta.</li>\n  </ol>\n  <p>Firewalls stateful aproveitam esses estados para permitir respostas a conexões iniciadas de dentro, bloquear tráfego inesperado e registrar eventos. Porém, estado também consome memória e pode virar gargalo sob carga ou ataque.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em arquitetura, a Camada 4 aparece em clientes, servidores, sistemas operacionais, firewalls, NAT, load balancers, proxies, service meshes, security groups, Kubernetes Services, Ingress controllers, NetworkPolicies e ferramentas de observabilidade.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Cliente:</strong> usa uma porta efêmera local para iniciar comunicação.</li>\n    <li><strong>Servidor:</strong> escuta uma porta conhecida ou configurada.</li>\n    <li><strong>Firewall:</strong> permite ou nega tráfego por protocolo, porta, origem, destino e estado.</li>\n    <li><strong>Load balancer:</strong> recebe conexões em uma porta e encaminha para backends saudáveis.</li>\n    <li><strong>Kubernetes:</strong> expõe pods por Service, targetPort, port e nodePort, criando abstrações de Camada 4/7.</li>\n    <li><strong>Cloud:</strong> security groups, NSGs e firewalls gerenciados controlam portas como código.</li>\n  </ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Imagine um prédio empresarial. O endereço IP é o endereço do prédio. A porta de transporte é a sala ou ramal interno. O roteamento leva a correspondência até o prédio; a Camada 4 ajuda a entregar ao departamento certo.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> portas não são locais físicos permanentes. Uma porta pode estar fechada, filtrada, aberta temporariamente, mapeada por NAT, balanceada para vários servidores ou associada a um processo que muda com o tempo. Além disso, TCP possui estado e confirmação, algo que a analogia de sala não representa completamente.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Seu notebook acessa <code>https://example.com</code>. O DNS resolve um IP. A Camada 3 leva o pacote até o servidor. A Camada 4 cria uma conexão TCP entre uma porta efêmera do seu notebook, como 52344, e a porta 443 do servidor.</p>\n  <p>Se TCP/443 estiver bloqueado, a rota pode estar correta e o ping pode funcionar, mas o site não abre. Se TCP/443 abre, ainda faltam Camada 5/6/7: TLS, HTTP, certificado, aplicação, autenticação e autorização.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um sistema de folha pode estar em um servidor interno. Usuários acessam TCP/443 via navegador. Administradores acessam TCP/22 ou TCP/3389, idealmente por bastion, VPN ou ferramenta de acesso privilegiado. O banco escuta TCP/5432 ou TCP/1433, mas essa porta não deve estar exposta para estações comuns.</p>\n  <p>Uma política madura descreve origem, destino, protocolo, porta, justificativa, responsável, expiração, logs e evidências. Liberar <code>any-any</code> porque “não sabemos qual porta usa” é uma má prática operacional e de segurança.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, portas aparecem em security groups, NSGs, firewall rules, load balancers, listeners, target groups, health checks, NAT gateways e private endpoints. Um serviço pode estar saudável internamente, mas inacessível porque o listener do load balancer usa porta errada, o security group bloqueia retorno, o targetPort do Kubernetes não bate com a porta do container ou a rota manda o tráfego para o lugar errado.</p>\n  <p>Também há impacto financeiro: balanceadores, NAT gateways, firewalls gerenciados, logs de fluxo e tráfego entre zonas podem gerar custo recorrente. Porta liberada sem necessidade aumenta superfície de ataque e custo de monitoramento.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em pipelines e plataformas internas, portas aparecem em runners, registries, scanners, webhooks, APIs, bancos, clusters Kubernetes, Ingress, Service e NetworkPolicy. Um deploy pode falhar porque a aplicação escuta em <code>8080</code>, mas o Service aponta para <code>80</code>; ou porque o health check tenta TCP/8080, mas a aplicação só responde HTTP em outro path.</p>\n  <p>Infraestrutura como código deve declarar portas com intenção clara. Regras temporárias devem ter prazo e justificativa. Testes de conectividade em pipeline devem diferenciar DNS, rota, TCP, TLS e resposta HTTP, evitando diagnósticos genéricos.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Do ponto de vista defensivo, portas revelam superfície de exposição. Serviços escutando portas desnecessárias aumentam risco. Conexões de saída incomuns podem indicar malware, exfiltração, túnel não autorizado ou ferramenta de administração abusada.</p>\n  <table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n    <tr><td>Porta exposta sem necessidade</td><td>Serviço administrativo acessível de redes amplas.</td><td>Força bruta, exploração ou movimentação lateral.</td><td>Menor privilégio, bastion, VPN/ZTNA, firewall e MFA.</td></tr>\n    <tr><td>Firewall permissivo</td><td>Regras any-any ou ranges amplos.</td><td>Baixo controle e dificuldade de auditoria.</td><td>Regras específicas, revisão periódica e logging.</td></tr>\n    <tr><td>UDP mal entendido</td><td>Ausência de conexão tratada como ausência de risco.</td><td>Abuso de DNS, amplificação ou tráfego evasivo.</td><td>Controle de egress, rate limit, logs e inspeção adequada.</td></tr>\n    <tr><td>Exfiltração</td><td>Throughput incomum para portas permitidas.</td><td>Vazamento de dados.</td><td>Monitoramento, DLP, proxy, allowlist e correlação com identidade.</td></tr>\n  </tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m02l06-title m02l06-desc\">\n    <title id=\"m02l06-title\">Camada 4 com TCP, UDP, portas e firewall</title>\n    <desc id=\"m02l06-desc\">Um cliente usa uma porta efêmera para acessar TCP 443 em um servidor, passando por firewall stateful. Também há exemplo de UDP 53 para DNS.</desc>\n    <defs>\n      <marker id=\"m02l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n\n    <rect x=\"40\" y=\"135\" width=\"170\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"125\" y=\"172\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"125\" y=\"198\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta local 52344</text>\n    <text x=\"125\" y=\"220\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TCP SYN</text>\n\n    <rect x=\"305\" y=\"125\" width=\"185\" height=\"125\" rx=\"14\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"397\" y=\"163\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"397\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">stateful</text>\n    <text x=\"397\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">permite TCP/443</text>\n\n    <rect x=\"610\" y=\"125\" width=\"190\" height=\"125\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"705\" y=\"163\" text-anchor=\"middle\" class=\"svg-label\">Servidor Web</text>\n    <text x=\"705\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">escuta TCP/443</text>\n    <text x=\"705\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SYN-ACK</text>\n\n    <line x1=\"210\" y1=\"178\" x2=\"305\" y2=\"178\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l06-arrow)\"></line>\n    <line x1=\"490\" y1=\"178\" x2=\"610\" y2=\"178\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l06-arrow)\"></line>\n    <line x1=\"610\" y1=\"218\" x2=\"490\" y2=\"218\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l06-arrow)\"></line>\n    <line x1=\"305\" y1=\"218\" x2=\"210\" y2=\"218\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l06-arrow)\"></line>\n\n    <rect x=\"805\" y=\"305\" width=\"135\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"872\" y=\"338\" text-anchor=\"middle\" class=\"svg-label\">DNS</text>\n    <text x=\"872\" y=\"363\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">UDP/53</text>\n\n    <line x1=\"210\" y1=\"335\" x2=\"805\" y2=\"350\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l06-arrow)\"></line>\n    <text x=\"500\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">UDP: sem handshake nativo, resposta depende da aplicação</text>\n\n    <rect x=\"60\" y=\"305\" width=\"690\" height=\"155\" rx=\"16\" class=\"content-card\"></rect>\n    <text x=\"405\" y=\"337\" text-anchor=\"middle\" class=\"svg-label\">Camada 4 responde</text>\n    <text x=\"95\" y=\"372\" class=\"svg-label svg-label--small\">1. Qual protocolo? TCP ou UDP?</text>\n    <text x=\"95\" y=\"398\" class=\"svg-label svg-label--small\">2. Qual porta de origem e destino?</text>\n    <text x=\"95\" y=\"424\" class=\"svg-label svg-label--small\">3. Existe serviço escutando?</text>\n    <text x=\"415\" y=\"372\" class=\"svg-label svg-label--small\">4. Firewall permite e acompanha estado?</text>\n    <text x=\"415\" y=\"398\" class=\"svg-label svg-label--small\">5. A conexão estabelece, reseta ou expira?</text>\n    <text x=\"415\" y=\"424\" class=\"svg-label svg-label--small\">6. Depois disso ainda faltam TLS e aplicação.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula coleta evidências de Camada 4 sem varrer redes de terceiros. Você verificará conexões locais, portas remotas conhecidas, estados TCP e diferenças entre teste de porta, TLS e HTTP.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam a leitura de portas, estados TCP, UDP, firewall e interpretação de falhas de transporte.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você investigará um cenário em que a rota está correta, mas uma API interna não responde. O objetivo é separar falha de porta, firewall, serviço parado, TLS e aplicação.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como raciocinar por camadas: IP alcança, TCP estabelece, TLS negocia, HTTP responde e autenticação autoriza.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> Camada 4 entrega tráfego ao serviço correto usando TCP, UDP e portas.</li>\n    <li><strong>O que lembrar:</strong> ping não testa porta; rota correta não prova serviço disponível.</li>\n    <li><strong>Erro comum:</strong> confundir porta aberta com aplicação saudável ou autorização concedida.</li>\n    <li><strong>Uso real:</strong> firewall, balanceador, Kubernetes Service, security group, NAT, proxy e diagnóstico de API.</li>\n    <li><strong>Segurança:</strong> portas expostas e conexões incomuns são sinais importantes de superfície de ataque e possível abuso.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você estudará as Camadas 5, 6 e 7: Sessão, Apresentação e Aplicação. Depois de entender portas e conexões, veremos como sessões, TLS, formatos de dados, HTTP, DNS, APIs e autenticação aparecem acima do transporte.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 4"
    ],
    "tcpIpLayers": [
      "Transporte"
    ],
    "relatedProtocols": [
      "TCP",
      "UDP",
      "ICMP",
      "TLS",
      "HTTP",
      "DNS",
      "QUIC"
    ],
    "dependsOn": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "encapsulamento",
      "IP",
      "roteamento",
      "métricas"
    ],
    "enables": [
      "HTTP",
      "TLS",
      "DNS",
      "APIs",
      "firewalls stateful",
      "load balancing",
      "Kubernetes Services",
      "observabilidade"
    ]
  },
  "protocolFields": [
    {
      "field": "Source Port",
      "size": "16 bits",
      "purpose": "Identificar a porta de origem do fluxo.",
      "securityObservation": "Portas efêmeras ajudam a correlacionar conexões, mas não identificam usuário sozinhas."
    },
    {
      "field": "Destination Port",
      "size": "16 bits",
      "purpose": "Identificar o serviço de destino, como TCP/443 ou UDP/53.",
      "securityObservation": "Porta permitida não garante que o conteúdo seja seguro ou autorizado."
    },
    {
      "field": "Sequence Number",
      "size": "32 bits no TCP",
      "purpose": "Ordenar bytes em uma conexão TCP.",
      "securityObservation": "Anomalias de sequência podem indicar perda, retransmissão, reset ou manipulação."
    },
    {
      "field": "Flags TCP",
      "size": "bits de controle",
      "purpose": "Indicar SYN, ACK, FIN, RST e outros estados.",
      "securityObservation": "Picos de SYN, RST ou tentativas negadas podem indicar problema operacional ou abuso."
    },
    {
      "field": "UDP Length",
      "size": "16 bits",
      "purpose": "Indicar tamanho do datagrama UDP.",
      "securityObservation": "Datagramas UDP inesperados merecem correlação com serviço, origem e frequência."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Escolhe uma porta efêmera local e tenta acessar a porta do serviço.",
      "detail": "Exemplo: 52344 -> TCP/443.",
      "possibleFailure": "Firewall local, proxy ou política de egress bloqueia a saída."
    },
    {
      "step": 2,
      "actor": "Firewall",
      "action": "Avalia origem, destino, protocolo, porta e estado.",
      "detail": "Em TCP, pode acompanhar SYN, SYN-ACK e ACK.",
      "possibleFailure": "Regra ausente, rota assimétrica ou tabela de estado saturada."
    },
    {
      "step": 3,
      "actor": "Servidor",
      "action": "Responde se houver serviço escutando e política permitindo.",
      "detail": "Um SYN-ACK indica início de estabelecimento TCP; RST pode indicar porta fechada ou rejeição.",
      "possibleFailure": "Serviço parado, porta errada, listener em interface incorreta ou ACL bloqueando."
    },
    {
      "step": 4,
      "actor": "Aplicação",
      "action": "Depois da Camada 4, inicia TLS, HTTP, autenticação ou protocolo de aplicação.",
      "detail": "TCP estabelecido não garante sucesso na aplicação.",
      "possibleFailure": "Certificado inválido, erro HTTP, token inválido ou autorização negada."
    }
  ],
  "deepDive": {
    "mentalModel": "IP leva o pacote até o host; TCP/UDP e portas entregam o tráfego ao processo correto. TCP tenta criar conversa confiável e com estado; UDP envia datagramas sem handshake nativo.",
    "keyTerms": [
      "TCP",
      "UDP",
      "porta",
      "socket",
      "porta efêmera",
      "listener",
      "three-way handshake",
      "RST",
      "timeout",
      "firewall stateful"
    ],
    "limitations": [
      "Porta aberta não prova aplicação saudável.",
      "Porta fechada não diz sozinha se o bloqueio é local, remoto ou intermediário.",
      "UDP pode não responder mesmo quando o serviço existe.",
      "ICMP bloqueado não prova que TCP está bloqueado.",
      "Estado de firewall pode esconder problemas de rota assimétrica."
    ],
    "whenToUse": [
      "Ao diagnosticar acesso a serviços.",
      "Ao desenhar regras de firewall.",
      "Ao configurar load balancers e health checks.",
      "Ao expor serviços em Kubernetes ou cloud.",
      "Ao analisar logs de conexão no SOC."
    ],
    "whenNotToUse": [
      "Não usar teste de porta como prova de autenticação ou autorização.",
      "Não usar ping como teste de porta.",
      "Não liberar portas sem entender o serviço e a origem necessária.",
      "Não interpretar UDP como confiável sem validação da aplicação."
    ],
    "operationalImpact": [
      "Exige inventário de portas e serviços.",
      "Muda a forma de diagnosticar indisponibilidade.",
      "Exige documentação de regras, exceções e owners.",
      "Health checks e balanceadores dependem de portas corretas.",
      "Logs de conexão precisam ser correlacionados com aplicação e identidade."
    ],
    "financialImpact": [
      "Firewalls, load balancers, NAT gateways e logs de fluxo podem gerar custo em cloud.",
      "Portas expostas aumentam custo de monitoramento e resposta a incidentes.",
      "Erros de porta em pipelines e deploys geram indisponibilidade e retrabalho.",
      "Ferramentas de observabilidade de rede e APM podem ter custo por volume de dados."
    ],
    "securityImpact": [
      "Portas expostas ampliam superfície de ataque.",
      "Controle de egress reduz exfiltração e C2.",
      "Firewalls stateful ajudam, mas não substituem autenticação, TLS e autorização.",
      "Logs de conexão são evidências importantes, mas podem conter dados sensíveis."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que ping testa se um site está funcionando.",
      "whyItHappens": "Ping usa ICMP e não testa TCP/443, TLS nem HTTP.",
      "consequence": "O diagnóstico pula a Camada 4 e culpa a aplicação sem evidência.",
      "correction": "Testar rota, porta, TLS e aplicação separadamente."
    },
    {
      "mistake": "Liberar qualquer porta para resolver rápido.",
      "whyItHappens": "Pressão operacional e falta de inventário.",
      "consequence": "Aumenta superfície de ataque e dificulta auditoria.",
      "correction": "Liberar origem, destino, protocolo e porta mínimos, com prazo e justificativa."
    },
    {
      "mistake": "Tratar UDP como se tivesse conexão TCP.",
      "whyItHappens": "O aluno espera estado e confirmação em todos os protocolos.",
      "consequence": "Interpreta ausência de resposta como prova absoluta de bloqueio.",
      "correction": "Entender que UDP depende da lógica da aplicação e precisa de evidências complementares."
    },
    {
      "mistake": "Confundir porta aberta com serviço saudável.",
      "whyItHappens": "Ferramentas de teste de porta retornam sucesso no handshake TCP.",
      "consequence": "Ignora TLS, HTTP, autenticação, backend e dependências.",
      "correction": "Depois da porta, validar protocolo de aplicação e logs."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Ping funciona, mas site não abre",
      "Test-NetConnection falha em porta específica",
      "Conexão fica em timeout",
      "Conexão recebe reset",
      "Health check de load balancer falha",
      "API responde localmente, mas não pela rede",
      "DNS responde via UDP, mas transferências grandes falham"
    ],
    "diagnosticQuestions": [
      "O destino IP é alcançável?",
      "A porta correta está documentada?",
      "O serviço está escutando na interface correta?",
      "Há firewall local, de rede, cloud ou host?",
      "O teste falha por timeout ou reset?",
      "É TCP ou UDP?",
      "O problema ocorre antes ou depois de TLS/HTTP?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection example.com -Port 443",
        "purpose": "Testar conectividade TCP para uma porta específica.",
        "expectedObservation": "TcpTestSucceeded: True quando a conexão TCP é possível.",
        "interpretation": "Se falhar, investigar firewall, rota, proxy, serviço ou bloqueio intermediário."
      },
      {
        "platform": "Windows",
        "command": "netstat -ano | findstr ESTABLISHED",
        "purpose": "Listar conexões TCP estabelecidas e PIDs.",
        "expectedObservation": "Endereços locais/remotos, portas e estado ESTABLISHED.",
        "interpretation": "Ajuda a identificar processos e conexões ativas."
      },
      {
        "platform": "Linux",
        "command": "ss -tulpen",
        "purpose": "Listar sockets TCP/UDP escutando e processos associados.",
        "expectedObservation": "Entradas LISTEN para TCP e UNCONN para UDP quando aplicável.",
        "interpretation": "Mostra se o serviço está realmente escutando e em qual interface."
      },
      {
        "platform": "Linux",
        "command": "curl -vkI https://example.com",
        "purpose": "Separar TCP, TLS e resposta HTTP em um teste simples.",
        "expectedObservation": "Conexão TCP, negociação TLS e headers HTTP.",
        "interpretation": "Se TCP conecta mas TLS falha, o problema já passou da Camada 4."
      },
      {
        "platform": "Cisco IOS",
        "command": "show access-lists",
        "purpose": "Verificar ACLs que podem permitir ou negar portas/protocolos.",
        "expectedObservation": "Regras com protocolos, origens, destinos e portas.",
        "interpretation": "Ajuda a confirmar bloqueio ou permissão de Camada 4."
      },
      {
        "platform": "Cisco IOS",
        "command": "show tcp brief",
        "purpose": "Observar conexões TCP conhecidas pelo equipamento, quando suportado.",
        "expectedObservation": "Conexões TCP e estados.",
        "interpretation": "Útil em equipamentos que participam de sessões de gerenciamento ou serviços."
      }
    ],
    "decisionTree": [
      {
        "if": "IP não é alcançável",
        "then": "Voltar para Camada 3: rota, gateway, firewall de rede e caminho."
      },
      {
        "if": "IP alcança, mas TCP dá timeout",
        "then": "Investigar firewall, serviço não respondendo, rota assimétrica ou descarte silencioso."
      },
      {
        "if": "TCP recebe RST",
        "then": "Investigar porta fechada, serviço rejeitando ou dispositivo intermediário resetando."
      },
      {
        "if": "TCP conecta, mas TLS falha",
        "then": "Subir para Camada 6: certificado, SNI, versão TLS, inspeção ou cadeia de confiança."
      },
      {
        "if": "TLS funciona, mas HTTP retorna 401/403/500",
        "then": "Subir para Camada 7 e identidade/autorização/aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar portas por serviço, origem, destino, responsável e justificativa.",
      "Aplicar menor privilégio em regras de firewall e security groups.",
      "Registrar conexões permitidas e negadas relevantes.",
      "Separar conectividade de autenticação e autorização.",
      "Usar bastion, VPN/ZTNA ou PAM para portas administrativas.",
      "Revisar periodicamente portas expostas."
    ],
    "badPractices": [
      "Liberar any-any para resolver troubleshooting.",
      "Expor SSH, RDP, banco ou painel administrativo para a internet sem controles fortes.",
      "Achar que porta 443 é sempre segura.",
      "Ignorar conexões de saída.",
      "Não saber qual aplicação escuta cada porta.",
      "Manter serviços antigos escutando por esquecimento."
    ],
    "commonErrors": [
      "Confundir ping com teste de serviço.",
      "Confundir porta aberta com aplicação autorizada.",
      "Confundir UDP sem resposta com bloqueio comprovado.",
      "Não correlacionar porta com processo e owner.",
      "Criar regra temporária e nunca remover."
    ],
    "vulnerabilities": [
      {
        "name": "Superfície de ataque por portas expostas",
        "description": "Serviços acessíveis além do necessário aumentam oportunidades de abuso.",
        "defensiveExplanation": "Um atacante tende a procurar serviços expostos, versões vulneráveis e interfaces administrativas. A defesa reduz exposição e monitora tentativas.",
        "mitigation": "Allowlist, segmentação, bastion, MFA, patching, hardening e logs."
      },
      {
        "name": "Egress irrestrito",
        "description": "Saídas liberadas para qualquer destino e porta dificultam detecção de exfiltração e C2.",
        "defensiveExplanation": "Controle de saída ajuda a impedir que sistemas comprometidos se comuniquem livremente.",
        "mitigation": "Proxy, firewall de saída, DNS controlado, allowlists e detecção comportamental."
      },
      {
        "name": "Saturação de estado",
        "description": "Firewalls e balanceadores stateful mantêm tabelas de conexão que podem saturar.",
        "defensiveExplanation": "Sob carga ou abuso, a tabela de estado pode virar gargalo operacional.",
        "mitigation": "Capacity planning, rate limit, SYN protection, observabilidade e arquitetura resiliente."
      }
    ],
    "monitoring": [
      "Logs de firewall permit/deny",
      "Flow logs em cloud",
      "Conexões por porta e destino",
      "SYN/RST anômalos",
      "Portas administrativas acessadas fora do padrão",
      "Conexões de saída para destinos incomuns"
    ],
    "hardening": [
      "Fechar serviços não usados",
      "Bind de serviços apenas em interfaces necessárias",
      "Firewall local e de rede",
      "Regras com origem/destino mínimos",
      "TLS e autenticação forte nas camadas superiores",
      "Inventário contínuo de serviços"
    ],
    "detectionIdeas": [
      "Alertar nova porta em estado LISTEN",
      "Detectar aumento súbito de conexões para porta rara",
      "Correlacionar deny de firewall com incidente",
      "Identificar conexões externas de servidores que não deveriam iniciar saída",
      "Monitorar resets e timeouts em serviços críticos"
    ]
  },
  "lab": {
    "id": "lab-2.6",
    "title": "Coletando evidências de Camada 4 com segurança",
    "labType": "security",
    "objective": "Identificar portas, conexões, listeners e diferenças entre teste de transporte e teste de aplicação.",
    "scenario": "Você está investigando um serviço web que não abre. Em vez de concluir apenas com ping, irá coletar evidências de TCP/443, conexões locais e resposta HTTP.",
    "topology": "Notebook do aluno -> rede local -> firewall/roteador -> internet ou serviço permitido",
    "architecture": "Cliente usando porta efêmera para acessar uma porta bem conhecida em um servidor, com possíveis filtros de firewall no caminho.",
    "prerequisites": [
      "Ter concluído as aulas 2.1 a 2.5.",
      "Ter terminal Windows PowerShell ou Linux.",
      "Usar apenas destinos próprios ou serviços públicos comuns e permitidos, como example.com."
    ],
    "tools": [
      "Windows PowerShell",
      "Terminal Linux",
      "curl",
      "ss ou netstat",
      "Opcional: Wireshark em modo observação"
    ],
    "estimatedTimeMinutes": 55,
    "cost": "zero",
    "safetyNotes": [
      "Não faça varredura de portas em redes de terceiros.",
      "Teste apenas portas explicitamente necessárias e destinos permitidos.",
      "Não publique IPs internos, portas sensíveis ou PIDs de processos sem sanitização.",
      "O objetivo é diagnóstico defensivo, não enumeração ofensiva."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar hipótese por camadas",
        "instruction": "Escreva uma hipótese separando Camada 3, Camada 4, TLS e aplicação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Uma lista curta de hipóteses por camada.",
        "explanation": "Isso evita misturar porta, certificado, aplicação e autenticação no mesmo diagnóstico."
      },
      {
        "number": 2,
        "title": "Testar porta TCP no Windows",
        "instruction": "No Windows, teste TCP/443 para um destino permitido.",
        "command": "Test-NetConnection example.com -Port 443",
        "expectedOutput": "TcpTestSucceeded: True ou False.",
        "explanation": "Esse comando testa Camada 4 para TCP, mas não prova que HTTP, TLS ou login funcionam."
      },
      {
        "number": 3,
        "title": "Testar transporte e HTTP no Linux ou Windows com curl",
        "instruction": "Use curl para observar conexão, TLS e resposta HTTP.",
        "command": "curl -vkI https://example.com",
        "expectedOutput": "Linhas indicando conexão, TLS e headers HTTP.",
        "explanation": "Se a conexão TCP ocorre mas TLS falha, o problema já está acima da Camada 4."
      },
      {
        "number": 4,
        "title": "Listar conexões locais no Windows",
        "instruction": "Observe conexões TCP estabelecidas.",
        "command": "netstat -ano | findstr ESTABLISHED",
        "expectedOutput": "Lista de conexões com IPs, portas e PIDs.",
        "explanation": "Mostra que conexões usam porta local efêmera e porta remota de serviço."
      },
      {
        "number": 5,
        "title": "Listar listeners e sockets no Linux",
        "instruction": "Em Linux, veja serviços escutando e conexões.",
        "command": "ss -tulpen",
        "expectedOutput": "Entradas LISTEN, UNCONN e conexões com portas.",
        "explanation": "Ajuda a diferenciar serviço escutando de conexão iniciada pelo cliente."
      },
      {
        "number": 6,
        "title": "Interpretar timeout versus reset",
        "instruction": "Compare o significado provável de timeout e reset em um relatório.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Uma explicação de que timeout sugere descarte/sem resposta e reset sugere rejeição/porta fechada ou reset intermediário.",
        "explanation": "A interpretação correta orienta a próxima hipótese."
      },
      {
        "number": 7,
        "title": "Sanitizar evidências",
        "instruction": "Remova IPs internos, nomes de host sensíveis, PIDs e usuários antes de compartilhar.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Evidências sanitizadas.",
        "explanation": "Diagnóstico técnico também precisa proteger informações da organização."
      }
    ],
    "expectedResult": "O aluno deve produzir um pequeno relatório distinguindo teste de IP, teste de porta TCP, conexão local, listener, TLS e resposta de aplicação.",
    "validation": [
      {
        "check": "O relatório separa Camada 3 e Camada 4",
        "command": "Revisar relatório",
        "expected": "Há campos separados para rota/IP e porta/conexão.",
        "ifFails": "Reorganize usando a matriz OSI das aulas anteriores."
      },
      {
        "check": "O teste de TCP/443 foi interpretado corretamente",
        "command": "Test-NetConnection example.com -Port 443 ou curl -vkI https://example.com",
        "expected": "O aluno não afirma que porta aberta equivale a aplicação saudável.",
        "ifFails": "Releia a diferença entre transporte, TLS e HTTP."
      },
      {
        "check": "Evidências foram sanitizadas",
        "command": "Revisar saída coletada",
        "expected": "Sem IPs internos sensíveis, nomes reais ou PIDs desnecessários.",
        "ifFails": "Mascarar dados antes de compartilhar."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Test-NetConnection retorna falso",
        "probableCause": "Firewall, rota, proxy, bloqueio intermediário ou serviço indisponível.",
        "howToConfirm": "Testar rota, outro destino permitido, logs locais e política de firewall.",
        "fix": "Abrir chamado com evidências, sem pedir liberação ampla."
      },
      {
        "symptom": "curl conecta, mas falha em certificado",
        "probableCause": "Problema de TLS, inspeção, cadeia de confiança ou SNI.",
        "howToConfirm": "Observar mensagens TLS do curl e validar certificado.",
        "fix": "Encaminhar para análise de Camada 6/aplicação."
      },
      {
        "symptom": "ss não mostra listener esperado",
        "probableCause": "Serviço parado ou escutando em outra interface/porta.",
        "howToConfirm": "Verificar configuração do serviço e logs locais.",
        "fix": "Ajustar serviço, porta ou bind conforme arquitetura."
      }
    ],
    "improvements": [
      "Capturar handshake TCP no Wireshark em laboratório local.",
      "Comparar TCP/443 com UDP/53 em uma consulta DNS permitida.",
      "Criar uma tabela de portas conhecidas da sua rede doméstica ou laboratório.",
      "Adicionar uma coluna de owner e justificativa para cada porta."
    ],
    "evidenceToCollect": [
      "Resultado de Test-NetConnection ou curl",
      "Lista sanitizada de conexões",
      "Lista de listeners, se aplicável",
      "Interpretação de timeout/reset/sucesso",
      "Conclusão por camada"
    ],
    "questions": [
      "Por que ping não testa porta?",
      "O que uma porta efêmera representa?",
      "O que muda entre TCP e UDP?",
      "Por que firewall stateful precisa manter estado?",
      "Por que TCP estabelecido não prova login autorizado?"
    ],
    "challenge": "Crie um relatório de diagnóstico para uma API interna que tem IP alcançável, mas falha em TCP/8443. Liste hipóteses e evidências sem pedir liberação any-any.",
    "solution": "A solução deve testar rota/IP, porta TCP/8443, listener no servidor, firewall local, firewall de rede/cloud, balanceador, TLS e aplicação. A correção não deve ser liberar tudo, mas ajustar a menor regra necessária com owner, justificativa e validade."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que IP sozinho não identifica o serviço correto dentro de um servidor?",
      "hints": [
        "Pense em um servidor com SSH, HTTPS e banco ao mesmo tempo.",
        "Pense em portas."
      ],
      "expectedIdeas": [
        "multiplexação",
        "processos",
        "porta",
        "serviço",
        "socket"
      ],
      "explanation": "IP identifica o host lógico; a porta ajuda a entregar ao processo ou serviço correto."
    },
    {
      "type": "diagnóstico",
      "question": "Um host responde ping, mas Test-NetConnection para TCP/443 falha. O que isso sugere?",
      "hints": [
        "ICMP e TCP são diferentes.",
        "Pense em firewall e listener."
      ],
      "expectedIdeas": [
        "porta bloqueada",
        "serviço parado",
        "firewall",
        "rota assimétrica",
        "teste por camada"
      ],
      "explanation": "O sucesso de ICMP não prova abertura de TCP/443. A hipótese agora está em transporte, política ou serviço."
    },
    {
      "type": "cenário real",
      "question": "Por que liberar porta 443 para qualquer destino não é automaticamente seguro?",
      "hints": [
        "Pense em conteúdo dentro de HTTPS.",
        "Pense em egress e exfiltração."
      ],
      "expectedIdeas": [
        "porta não equivale a confiança",
        "exfiltração",
        "C2",
        "proxy",
        "logs",
        "allowlist"
      ],
      "explanation": "Porta 443 pode carregar tráfego legítimo ou abusivo. Controle precisa considerar destino, identidade, contexto, inspeção e logs."
    }
  ],
  "quiz": [
    {
      "id": "q2.6.1",
      "type": "conceito",
      "q": "Qual é a principal função da Camada 4 em relação à Camada 3?",
      "opts": [
        "Entregar tráfego ao serviço/processo correto usando protocolos e portas",
        "Converter sinais elétricos em bits",
        "Resolver nomes DNS",
        "Escolher cabos de rede"
      ],
      "a": 0,
      "exp": "A Camada 3 leva pacotes entre redes; a Camada 4 usa TCP/UDP e portas para comunicação entre processos.",
      "difficulty": "iniciante",
      "topic": "camada 4"
    },
    {
      "id": "q2.6.2",
      "type": "comparação",
      "q": "Qual alternativa descreve melhor TCP?",
      "opts": [
        "Orientado à conexão, com estado, sequência e retransmissão",
        "Sem portas",
        "Sempre mais seguro que UDP",
        "Sem necessidade de handshake"
      ],
      "a": 0,
      "exp": "TCP usa handshake e mecanismos de confiabilidade. Segurança depende de camadas e controles adicionais.",
      "difficulty": "iniciante",
      "topic": "tcp"
    },
    {
      "id": "q2.6.3",
      "type": "diagnóstico",
      "q": "Ping funciona, mas TCP/443 falha. Qual conclusão é mais correta?",
      "opts": [
        "A conectividade IP pode existir, mas a porta, firewall ou serviço ainda podem estar com problema",
        "A aplicação está obrigatoriamente autenticando errado",
        "O cabo está sempre rompido",
        "DNS é sempre o problema"
      ],
      "a": 0,
      "exp": "Ping testa ICMP e alcance básico, não testa TCP/443 nem aplicação.",
      "difficulty": "iniciante-intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q2.6.4",
      "type": "segurança",
      "q": "Qual é a melhor prática para regra de firewall de Camada 4?",
      "opts": [
        "Definir origem, destino, protocolo, porta, justificativa e logging",
        "Liberar qualquer porta para evitar chamados",
        "Bloquear todos os logs para reduzir custo",
        "Usar apenas ping como validação"
      ],
      "a": 0,
      "exp": "Regras precisam ser específicas, justificadas, auditáveis e monitoráveis.",
      "difficulty": "iniciante-intermediário",
      "topic": "firewall"
    },
    {
      "id": "q2.6.5",
      "type": "cloud",
      "q": "Em cloud, onde portas de Camada 4 aparecem com frequência?",
      "opts": [
        "Security groups, NSGs, load balancers, health checks e Kubernetes Services",
        "Somente em cabos RJ-45",
        "Apenas no monitor físico",
        "Somente no teclado"
      ],
      "a": 0,
      "exp": "Cloud networking usa portas em regras, listeners, target groups, Services e policies.",
      "difficulty": "iniciante",
      "topic": "cloud"
    },
    {
      "id": "q2.6.6",
      "type": "pegadinha",
      "q": "Uma porta TCP aberta prova que o usuário está autorizado a acessar a aplicação?",
      "opts": [
        "Não, isso apenas indica que o transporte respondeu; autorização é camada superior",
        "Sim, porta aberta é autorização",
        "Sim, se for 443",
        "Sim, se ping também funcionar"
      ],
      "a": 0,
      "exp": "Transporte funcionando não prova TLS válido, sessão, autenticação nem autorização.",
      "difficulty": "iniciante-intermediário",
      "topic": "camadas"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.6.1",
      "front": "O que a Camada 4 adiciona ao IP?",
      "back": "Protocolos de transporte, portas, estado de conexão e entrega ao processo/serviço correto.",
      "tags": [
        "camada 4"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.6.2",
      "front": "TCP é orientado a quê?",
      "back": "À conexão, com handshake, sequência, confirmações e retransmissão.",
      "tags": [
        "tcp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.6.3",
      "front": "UDP possui handshake nativo?",
      "back": "Não. UDP envia datagramas sem estabelecimento de conexão nativo.",
      "tags": [
        "udp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.6.4",
      "front": "Ping testa TCP/443?",
      "back": "Não. Ping usa ICMP e não prova que uma porta TCP está aberta.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.6.5",
      "front": "O que é porta efêmera?",
      "back": "Uma porta local temporária escolhida pelo cliente para identificar uma conexão ou fluxo.",
      "tags": [
        "portas"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc2.6.6",
      "front": "O que firewall stateful acompanha?",
      "back": "O estado de conexões/fluxos, como conexões TCP iniciadas e respostas permitidas.",
      "tags": [
        "firewall"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.6.1",
      "type": "conceitual",
      "prompt": "Explique por que IP e porta juntos são mais úteis que IP sozinho para diagnosticar um serviço.",
      "expectedAnswer": "IP identifica o host/rede; porta identifica o serviço ou processo lógico no host. Diagnóstico de serviço precisa dos dois.",
      "explanation": "Um servidor pode hospedar vários serviços em portas diferentes."
    },
    {
      "id": "ex2.6.2",
      "type": "diagnóstico",
      "prompt": "Um servidor responde ping, mas TCP/22 dá timeout. Liste três hipóteses.",
      "expectedAnswer": "Firewall bloqueando, serviço SSH parado, serviço escutando em outra porta/interface, rota assimétrica ou filtro intermediário.",
      "explanation": "Timeout sugere descarte ou ausência de resposta, não necessariamente cabo ou DNS."
    },
    {
      "id": "ex2.6.3",
      "type": "comparação",
      "prompt": "Compare TCP e UDP em confiabilidade, estado e uso típico.",
      "expectedAnswer": "TCP é orientado à conexão e confiável; UDP é sem conexão nativa e mais simples. TCP é comum em HTTP/HTTPS/SSH; UDP em DNS, voz/vídeo e protocolos que controlam perda na aplicação.",
      "explanation": "A escolha depende do comportamento desejado, não de um ser universalmente melhor."
    },
    {
      "id": "ex2.6.4",
      "type": "segurança",
      "prompt": "Reescreva uma regra insegura 'allow any any' para acesso de usuários ao portal HTTPS interno.",
      "expectedAnswer": "Permitir apenas sub-rede/grupo de origem necessário para IP/FQDN do portal em TCP/443, com logging, owner, justificativa e validade.",
      "explanation": "Menor privilégio reduz superfície e melhora auditoria."
    }
  ],
  "challenge": {
    "title": "API interna inacessível na porta 8443",
    "scenario": "Uma equipe informa que a API de inventário em https://api-interna:8443 não responde a partir dos runners de CI. O DNS resolve e a rota para a sub-rede parece existir.",
    "tasks": [
      "Separar hipóteses de Camada 3, Camada 4, TLS e aplicação.",
      "Definir comandos de coleta para Windows/Linux conforme aplicável.",
      "Indicar evidências necessárias de firewall, load balancer e host.",
      "Propor correção de menor privilégio.",
      "Descrever como validar depois da correção."
    ],
    "constraints": [
      "Não pedir liberação any-any.",
      "Não fazer varredura ampla.",
      "Sanitizar evidências.",
      "Considerar que runners podem estar em sub-rede diferente dos usuários."
    ],
    "expectedDeliverables": [
      "Matriz por camada",
      "Lista de comandos",
      "Hipóteses e evidências",
      "Proposta de regra mínima",
      "Plano de validação"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação por camadas",
        "points": 25,
        "description": "Distingue IP/rota, TCP/porta, TLS e aplicação."
      },
      {
        "criterion": "Evidências de Camada 4",
        "points": 25,
        "description": "Inclui testes de porta, listener, firewall e estado."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Propõe menor privilégio, logging e sanitização."
      },
      {
        "criterion": "Validação",
        "points": 25,
        "description": "Define como confirmar sucesso sem extrapolar conclusões."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro confirmamos que DNS e rota não são a causa principal. Depois testamos TCP/8443 a partir dos runners, verificamos firewall de origem/destino, listener no backend, health check do balanceador e só então subimos para TLS e HTTP.",
    "steps": [
      "Registrar origem real dos runners.",
      "Resolver o nome da API e confirmar IP esperado.",
      "Testar TCP/8443 com ferramenta apropriada.",
      "Verificar se o serviço escuta na porta 8443 e na interface correta.",
      "Conferir regras de firewall/security group/NSG para origem dos runners.",
      "Testar TLS/HTTP com curl verbose.",
      "Registrar logs de deny/allow e health check.",
      "Propor regra mínima com origem dos runners, destino da API e TCP/8443."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar todas as portas dos runners para a rede interna.",
        "whyItIsWrong": "Resolve por excesso, amplia risco e dificulta auditoria."
      },
      {
        "answer": "Culpar DNS porque a aplicação não abriu.",
        "whyItIsWrong": "O enunciado informa que DNS resolve; é preciso continuar por camadas."
      },
      {
        "answer": "Concluir que TLS está errado antes de testar TCP.",
        "whyItIsWrong": "TLS só começa depois que o transporte estabelece conexão."
      }
    ],
    "finalAnswer": "A solução correta é uma investigação por camadas: DNS resolve, rota existe, TCP/8443 precisa ser testado da origem real, firewall e listener precisam ser confirmados, e somente após o estabelecimento TCP devem ser avaliados TLS e HTTP. A correção deve ser específica para origem, destino, protocolo e porta, com logging e revisão."
  },
  "glossary": [
    {
      "term": "TCP",
      "shortDefinition": "Protocolo de transporte orientado à conexão.",
      "longDefinition": "TCP fornece comunicação confiável e ordenada usando handshake, números de sequência, confirmações, janelas e retransmissão.",
      "example": "HTTPS normalmente usa TCP/443.",
      "relatedTerms": [
        "porta",
        "three-way handshake",
        "ACK"
      ],
      "relatedLessons": [
        "2.6",
        "6.1"
      ]
    },
    {
      "term": "UDP",
      "shortDefinition": "Protocolo de transporte sem conexão nativa.",
      "longDefinition": "UDP envia datagramas sem handshake, sem confirmação nativa e com menor overhead, deixando garantias para a aplicação quando necessário.",
      "example": "DNS tradicional frequentemente usa UDP/53.",
      "relatedTerms": [
        "datagrama",
        "porta"
      ],
      "relatedLessons": [
        "2.6",
        "6.2"
      ]
    },
    {
      "term": "Porta",
      "shortDefinition": "Número lógico que identifica serviço ou fluxo de transporte.",
      "longDefinition": "Portas permitem que múltiplas aplicações usem o mesmo host e endereço IP, diferenciando serviços e conexões.",
      "example": "SSH usa TCP/22 por padrão.",
      "relatedTerms": [
        "socket",
        "listener",
        "porta efêmera"
      ],
      "relatedLessons": [
        "2.6",
        "6.3"
      ]
    },
    {
      "term": "Socket",
      "shortDefinition": "Combinação lógica de endereço, protocolo e porta usada por processos de rede.",
      "longDefinition": "Um socket representa um ponto de comunicação usado pelo sistema operacional para enviar e receber tráfego de rede.",
      "example": "192.168.10.50:52344 para 203.0.113.20:443 em TCP.",
      "relatedTerms": [
        "porta",
        "processo",
        "TCP"
      ],
      "relatedLessons": [
        "2.6"
      ]
    },
    {
      "term": "Three-way handshake",
      "shortDefinition": "Processo TCP de estabelecimento de conexão com SYN, SYN-ACK e ACK.",
      "longDefinition": "É a negociação inicial que sincroniza estado entre cliente e servidor antes da transmissão de dados em TCP.",
      "example": "Cliente envia SYN, servidor responde SYN-ACK, cliente confirma com ACK.",
      "relatedTerms": [
        "SYN",
        "ACK",
        "TCP"
      ],
      "relatedLessons": [
        "2.6",
        "6.1"
      ]
    },
    {
      "term": "Firewall stateful",
      "shortDefinition": "Firewall que acompanha estado de conexões ou fluxos.",
      "longDefinition": "Permite decisões mais contextuais, como liberar respostas a conexões iniciadas por origem permitida, mantendo tabela de estado.",
      "example": "Permitir resposta de TCP/443 para uma conexão iniciada pelo cliente interno.",
      "relatedTerms": [
        "firewall",
        "estado",
        "ACL"
      ],
      "relatedLessons": [
        "2.6",
        "9.1"
      ]
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "Transmission Control Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc9293",
      "note": "Referência moderna do TCP."
    },
    {
      "type": "rfc",
      "title": "User Datagram Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc768",
      "note": "Referência clássica do UDP."
    },
    {
      "type": "internal-course",
      "title": "Módulo 6 — TCP, UDP e Portas",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m06",
      "note": "O assunto será aprofundado no módulo específico de transporte."
    },
    {
      "type": "internal-course",
      "title": "Módulo 9 — Firewalls, ACLs, WAF e Políticas de Tráfego",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m09",
      "note": "Políticas baseadas em portas serão aprofundadas no módulo de firewalls."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e plataforma",
      "lesson": "Services, Ingress e NetworkPolicy",
      "reason": "Kubernetes usa abstrações de porta, targetPort, Service e política de rede."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Federação e autenticação moderna",
      "lesson": "OIDC, SAML e fluxos web",
      "reason": "Autenticação web depende de transporte funcionando, mas autorização ocorre acima da Camada 4."
    }
  ],
  "progressRules": {
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
      "2.7"
    ]
  }
};
