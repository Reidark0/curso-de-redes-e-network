export const lesson0601 = {
  "id": "6.1",
  "moduleId": "m06",
  "order": 1,
  "title": "Por que a camada de transporte existe",
  "subtitle": "Entenda por que IP e roteamento não bastam para entregar dados a aplicações, como o sistema operacional demultiplexa fluxos por portas e sockets, e por que transporte é indispensável para firewall, NAT, load balancer, cloud, DevSecOps e troubleshooting.",
  "duration": "110-160 min",
  "estimatedStudyTimeMinutes": 170,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 255,
  "tags": [
    "redes",
    "camada de transporte",
    "tcp",
    "udp",
    "portas",
    "socket",
    "firewall",
    "troubleshooting",
    "cloud",
    "devsecops",
    "segurança",
    "p0-04",
    "fundamento-crítico",
    "evidência"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.6",
      "title": "Camada 4 — Transporte: TCP, UDP, portas e conexões",
      "reason": "A aula aprofunda a função da Camada 4, agora com visão operacional e corporativa."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.1",
      "title": "Por que o IPv4 existe",
      "reason": "Transporte depende de IP de origem e destino para atravessar redes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "title": "Gateway padrão e rota local",
      "reason": "Antes de falar de portas e sockets, o aluno precisa entender gateway, entrega local e caminho até o host de destino."
    }
  ],
  "objectives": [
    "Explicar por que a camada de transporte existe acima do IP.",
    "Diferenciar entrega para host de entrega para processo ou serviço.",
    "Entender o papel de portas de origem, portas de destino e sockets.",
    "Comparar TCP e UDP em confiabilidade, estado, latência e uso operacional.",
    "Relacionar transporte com firewall, NAT, load balancer, observabilidade e troubleshooting.",
    "Identificar riscos de portas expostas, serviços escutando em interfaces erradas e regras amplas."
  ],
  "learningOutcomes": [
    "Descrever o caminho de uma requisição desde DNS, IP e rota até porta e processo de aplicação.",
    "Ler evidências básicas de conexão usando netstat, ss, lsof, Test-NetConnection e tcpdump.",
    "Separar falhas de DNS, rota, porta, firewall, TLS e aplicação.",
    "Explicar por que segurança de rede precisa considerar IP, porta, protocolo e estado de conexão.",
    "Dado um erro de acesso a serviço, separar evidências de DNS, rota, porta, listener, firewall, TLS e aplicação.",
    "Explicar por que um mesmo IP pode hospedar muitos serviços simultâneos sem confundir os fluxos.",
    "Ler uma saída de ss, netstat ou Test-NetConnection e identificar origem, destino, porta e estado."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Até aqui você aprendeu como computadores representam informação, como Ethernet entrega frames na LAN, como IPv4 identifica hosts, como subnetting organiza redes, como roteamento escolhe caminhos e como serviços como DNS ajudam a encontrar destinos. Mesmo assim, falta uma pergunta essencial: quando o pacote chega ao computador correto, <strong>qual aplicação deve receber os dados?</strong></p><p>Um servidor pode rodar web, SSH, banco de dados, DNS, métricas, logs, API interna e agente de backup no mesmo endereço IP. O IP leva o pacote até o host. A camada de transporte leva os dados até o processo certo, usando portas, protocolos e estado de comunicação.</p><div class='callout'><strong>Ideia central:</strong> IP responde “qual máquina?”. Transporte responde “qual conversa e qual serviço dentro daquela máquina?”.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>As primeiras redes precisavam transportar dados entre programas, não apenas entre computadores. À medida que sistemas passaram a executar múltiplos serviços simultâneos, tornou-se necessário identificar conversas independentes no mesmo host.</p><p>O TCP/IP separou responsabilidades: IP entrega datagramas entre endereços, enquanto TCP e UDP identificam aplicações por portas. TCP adicionou confiabilidade, ordenação, controle de fluxo e controle de congestionamento. UDP permaneceu simples, leve e sem conexão, útil para serviços em que baixa latência ou controle pela própria aplicação é mais importante.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Sem camada de transporte, o sistema operacional receberia pacotes IP mas não teria um mecanismo padronizado para decidir se os dados pertencem ao navegador, ao servidor web, ao DNS, ao banco, ao agente de monitoramento ou a uma conexão específica já aberta.</p><p>Também não haveria uma forma comum de manter conversas simultâneas. Um único notebook pode abrir dezenas de abas, conexões TLS, chamadas de API, consultas DNS e sessões SSH. Todas podem usar o mesmo IP de origem, mas precisam ser separadas por portas e estado.</p><div class='callout callout--problem'><strong>Problema operacional:</strong> rede não entrega “para a aplicação” apenas com IP. É preciso identificar protocolo de transporte, porta de destino, porta de origem e fluxo.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>A evolução natural foi criar protocolos de transporte com características diferentes. UDP oferece envio simples de datagramas, com menor overhead e sem garantia própria de entrega. TCP oferece uma conversa orientada à conexão, com handshake, sequência, confirmação, retransmissão e encerramento.</p><p>Depois vieram camadas e mecanismos que dependem fortemente de transporte: firewalls stateful, NAT, balanceadores, proxies, TLS, QUIC, service mesh, Kubernetes Services, health checks e observabilidade de conexões.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p>A <strong>camada de transporte</strong> é a camada responsável por permitir comunicação entre processos de aplicação em hosts diferentes. Ela usa portas para identificar serviços e conversas. Os dois protocolos clássicos são <strong>TCP</strong> e <strong>UDP</strong>.</p><p>Uma comunicação de transporte costuma ser identificada por uma combinação de protocolo, IP de origem, porta de origem, IP de destino e porta de destino. Esse conjunto é frequentemente chamado de 5-tuple.</p><div class='definition-box'>Camada de transporte é o mecanismo que multiplexa aplicações sobre IP, separando fluxos por protocolo, portas e estado.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando uma aplicação quer falar com um serviço, ela normalmente resolve um nome via DNS, obtém um IP, escolhe protocolo e porta e pede ao sistema operacional para abrir uma comunicação. O sistema seleciona uma porta efêmera de origem e envia dados para uma porta de destino conhecida.</p><ol class='flow-list'><li>Aplicação solicita comunicação com um serviço.</li><li>DNS resolve nome para IP, quando necessário.</li><li>O sistema escolhe rota e interface de saída.</li><li>ARP ou mecanismo equivalente descobre o próximo salto no enlace local.</li><li>A camada de transporte define protocolo, porta de origem e porta de destino.</li><li>TCP estabelece conexão com handshake ou UDP envia datagrama sem conexão.</li><li>Firewalls, NATs e balanceadores avaliam protocolo, IP, porta e estado.</li><li>O host de destino entrega os dados ao processo que escuta naquela porta.</li></ol>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04-6-1-demultiplexacao'>\n  <h4>O ponto que costuma faltar: entrega ao processo, não apenas ao host</h4>\n  <p>O IP entrega um pacote ao endereço de uma máquina. A partir daí, o sistema operacional precisa consultar suas estruturas internas para decidir qual processo deve receber aqueles bytes. Essa decisão não é feita por DNS, por roteamento nem por ARP. Ela é feita pela camada de transporte, usando protocolo, porta local, porta remota, IP local, IP remoto e estado da conversa.</p>\n  <p>Quando um serviço executa um <em>listen</em>, ele registra no kernel algo como “aceito conexões TCP na porta 443 desta interface”. Quando um cliente abre uma conexão, o kernel escolhe uma porta efêmera de origem e cria um fluxo. A mesma máquina pode manter centenas de conexões para o mesmo destino porque cada conversa tem uma combinação diferente de portas e estado.</p>\n  <table class='data-table'><thead><tr><th>Camada</th><th>Pergunta respondida</th><th>Evidência comum</th><th>Erro típico</th></tr></thead><tbody>\n    <tr><td>DNS</td><td>Qual IP corresponde ao nome?</td><td><code>dig</code>, <code>nslookup</code>, <code>Resolve-DnsName</code></td><td>Nome resolve para IP errado ou público em vez de privado.</td></tr>\n    <tr><td>IP/Rota</td><td>Por qual caminho chegar ao host?</td><td><code>ip route get</code>, <code>route print</code>, <code>traceroute</code></td><td>Rota default, rota específica ou retorno incorreto.</td></tr>\n    <tr><td>Transporte</td><td>Qual porta, fluxo e processo?</td><td><code>ss</code>, <code>netstat</code>, <code>Test-NetConnection</code>, <code>tcpdump</code></td><td>Serviço não escuta, firewall bloqueia, porta errada ou estado ausente.</td></tr>\n    <tr><td>Aplicação</td><td>O protocolo da aplicação respondeu corretamente?</td><td><code>curl -v</code>, logs da aplicação, status HTTP</td><td>Aplicação retorna erro mesmo com TCP funcionando.</td></tr>\n  </tbody></table>\n</div>",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>A arquitetura de transporte aparece em todos os pontos da rede: cliente, servidor, firewall, NAT, load balancer, proxy, container, service mesh e observabilidade. Cada componente interpreta portas e protocolos para decidir permitir, bloquear, encaminhar ou registrar fluxos.</p><table class='data-table'><thead><tr><th>Elemento</th><th>Papel na camada de transporte</th><th>Exemplo</th></tr></thead><tbody><tr><td>Cliente</td><td>Usa porta efêmera de origem</td><td>Notebook abrindo HTTPS</td></tr><tr><td>Servidor</td><td>Escuta em porta conhecida</td><td>443/TCP para web</td></tr><tr><td>Firewall</td><td>Filtra IP, protocolo, porta e estado</td><td>Permitir 443/TCP para DMZ</td></tr><tr><td>NAT</td><td>Traduz IP e muitas vezes porta</td><td>PAT doméstico ou NAT Gateway</td></tr><tr><td>Load balancer</td><td>Recebe em uma porta e encaminha para backends</td><td>443/TCP externo para 8080/TCP interno</td></tr></tbody></table>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04-6-1-impactos'>\n  <h4>Impactos operacionais e financeiros</h4>\n  <p>Transporte parece “baixo nível”, mas define custo e operação. Em cloud, balanceadores, NAT Gateways, firewalls gerenciados e logs de fluxo costumam cobrar por hora, tráfego ou volume de eventos. Uma política mal desenhada pode aumentar tráfego entre zonas, gerar logs excessivos, causar timeout em aplicações ou obrigar a equipe a investigar incidentes sem evidência suficiente.</p>\n  <ul>\n    <li><strong>Operacional:</strong> exige matriz de fluxos, inventário de portas, dono do serviço, evidência de listener e runbooks de diagnóstico.</li>\n    <li><strong>Financeiro:</strong> NAT, load balancer, firewall gerenciado e observabilidade de fluxo podem gerar custo recorrente mesmo quando a aplicação é pequena.</li>\n    <li><strong>Segurança:</strong> porta aberta não significa autorização; conectividade deve ser mínima, registrada e revisada.</li>\n  </ul>\n</div>",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense no IP como o endereço de um prédio e na porta como o ramal ou sala dentro dele. Saber o endereço leva você ao prédio certo, mas não diz se deve falar com o financeiro, suporte, RH ou recepção. A porta indica o serviço dentro do host.</p><p>A analogia tem limite: portas não são pessoas nem departamentos fixos. Um mesmo serviço pode escutar em porta não padrão, um proxy pode receber em uma porta e encaminhar para outra, e firewalls podem permitir apenas fluxos específicos.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Quando você acessa <code>https://intranet.empresa.local</code>, seu computador resolve o nome para um IP e abre uma conexão TCP para a porta 443 do servidor. O servidor pode ter o mesmo IP usado por outros serviços, mas o tráfego HTTPS vai para o processo que escuta em 443/TCP.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, a estação de trabalho pode acessar DNS em 53/UDP, HTTPS em 443/TCP, autenticação em portas específicas, syslog para coletores, banco de dados em porta restrita e agentes de segurança em portas de gestão. Regras corporativas precisam ser específicas: origem, destino, protocolo, porta, direção e justificativa.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, security groups, NSGs, NACLs, load balancers e firewalls gerenciados dependem diretamente da camada de transporte. Uma aplicação pode estar em uma subnet privada, exposta por load balancer em 443/TCP, enquanto o backend escuta em 8080/TCP e o banco aceita apenas 5432/TCP vindo do grupo da aplicação.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em pipelines e plataformas, portas aparecem em Dockerfiles, Kubernetes Services, readiness probes, ingress, service mesh, testes automatizados, policy as code e scanners. Um erro comum é a aplicação escutar apenas em <code>127.0.0.1</code> dentro do container, ou expor <code>0.0.0.0</code> sem política de rede adequada.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Do ponto de vista defensivo, portas abertas são superfície de ataque. Mas a análise correta não é apenas “porta aberta é ruim”. É preciso perguntar: qual serviço escuta, em qual interface, com qual autenticação, para quais origens, com qual versão, atrás de qual controle, com qual logging e com qual necessidade de negócio.</p><div class='callout callout--security'><strong>Controle mínimo:</strong> permita apenas portas necessárias, para origens necessárias, com observabilidade, dono, justificativa e revisão periódica.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m06l01-title m06l01-desc'>\n    <title id='m06l01-title'>Camada de transporte conectando aplicação, portas, IP e rede</title>\n    <desc id='m06l01-desc'>Cliente usa DNS, IP, roteamento e porta de transporte para chegar ao processo correto no servidor.</desc>\n    <defs><marker id='m06l01-arrow' markerWidth='10' markerHeight='10' refX='9' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path></marker></defs>\n    <rect x='35' y='80' width='170' height='120' rx='14' class='svg-node svg-node--client'></rect><text x='120' y='120' text-anchor='middle' class='svg-label'>Cliente</text><text x='120' y='148' text-anchor='middle' class='svg-label svg-label--small'>IP 10.10.1.50</text><text x='120' y='174' text-anchor='middle' class='svg-label svg-label--small'>porta origem 51544</text>\n    <rect x='295' y='80' width='170' height='120' rx='14' class='svg-node svg-node--router'></rect><text x='380' y='120' text-anchor='middle' class='svg-label'>Rede IP</text><text x='380' y='148' text-anchor='middle' class='svg-label svg-label--small'>rotas e gateway</text><text x='380' y='174' text-anchor='middle' class='svg-label svg-label--small'>entrega ao host</text>\n    <rect x='555' y='80' width='170' height='120' rx='14' class='svg-node svg-node--firewall'></rect><text x='640' y='120' text-anchor='middle' class='svg-label'>Firewall/NAT</text><text x='640' y='148' text-anchor='middle' class='svg-label svg-label--small'>IP + protocolo</text><text x='640' y='174' text-anchor='middle' class='svg-label svg-label--small'>porta + estado</text>\n    <rect x='795' y='80' width='150' height='120' rx='14' class='svg-node svg-node--server'></rect><text x='870' y='120' text-anchor='middle' class='svg-label'>Servidor</text><text x='870' y='148' text-anchor='middle' class='svg-label svg-label--small'>IP 10.20.5.10</text><text x='870' y='174' text-anchor='middle' class='svg-label svg-label--small'>443/TCP</text>\n    <line x1='205' y1='140' x2='295' y2='140' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l01-arrow)'></line><line x1='465' y1='140' x2='555' y2='140' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l01-arrow)'></line><line x1='725' y1='140' x2='795' y2='140' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l01-arrow)'></line>\n    <rect x='60' y='280' width='860' height='190' rx='18' class='svg-zone'></rect><text x='490' y='318' text-anchor='middle' class='svg-label'>5-tuple do fluxo</text><text x='490' y='352' text-anchor='middle' class='svg-label svg-label--small'>TCP | 10.10.1.50:51544 → 10.20.5.10:443</text><text x='490' y='384' text-anchor='middle' class='svg-label svg-label--small'>IP entrega ao host. Transporte entrega ao processo. Firewall acompanha estado.</text>\n    <rect x='130' y='415' width='160' height='38' rx='10' class='svg-badge'></rect><text x='210' y='440' text-anchor='middle' class='svg-label svg-label--small'>DNS antes</text><rect x='320' y='415' width='160' height='38' rx='10' class='svg-badge'></rect><text x='400' y='440' text-anchor='middle' class='svg-label svg-label--small'>Rota no meio</text><rect x='510' y='415' width='160' height='38' rx='10' class='svg-badge'></rect><text x='590' y='440' text-anchor='middle' class='svg-label svg-label--small'>Porta no destino</text><rect x='700' y='415' width='160' height='38' rx='10' class='svg-badge'></rect><text x='780' y='440' text-anchor='middle' class='svg-label svg-label--small'>Logs e estado</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai observar portas, processos e conectividade de transporte de forma defensiva. A meta é diferenciar: nome resolve, rota existe, host responde, porta está aberta, serviço responde e aplicação funciona.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam raciocínio de transporte: escolher protocolo correto, identificar porta de destino, interpretar porta efêmera, diferenciar firewall de serviço parado e separar TCP de UDP.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário em que uma API deixou de responder após deploy. Sua missão é montar um diagnóstico com DNS, rota, teste de porta, processo escutando, firewall e log de aplicação.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada mostra como seguir evidências sem pular etapas: primeiro nome, depois IP, rota, porta, handshake, TLS e resposta HTTP.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>A camada de transporte existe porque IP entrega pacotes entre hosts, mas aplicações precisam de conversas separadas entre processos. Portas, TCP, UDP e estado tornam possível multiplexar serviços, controlar conexões, filtrar tráfego e diagnosticar falhas.</p><p>Na prática corporativa, entender transporte é essencial para firewall, NAT, load balancer, Kubernetes, cloud, SIEM, troubleshooting e segurança defensiva.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará portas TCP e UDP em profundidade: portas conhecidas, registradas e efêmeras, sockets, serviços escutando, portas expostas e leitura de evidências em sistemas operacionais.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 4",
      "Camada 3",
      "Camada 7"
    ],
    "beforeThisLesson": "O aluno entende IP, roteamento, DNS e serviços fundamentais de rede.",
    "afterThisLesson": "O aluno entende por que portas, TCP e UDP são necessários para conectar aplicações e processos.",
    "dependsOn": [
      "IPv4",
      "Roteamento",
      "DNS",
      "Firewall",
      "Observabilidade"
    ]
  },
  "protocolFields": [
    {
      "field": "Protocol",
      "meaning": "Identifica TCP, UDP ou outro protocolo de transporte.",
      "securityNote": "Firewalls e logs precisam registrar protocolo para não confundir 53/UDP com 53/TCP, por exemplo."
    },
    {
      "field": "Source Port",
      "meaning": "Porta de origem, geralmente efêmera no cliente.",
      "securityNote": "NAT e firewalls stateful usam essa porta para correlacionar retorno."
    },
    {
      "field": "Destination Port",
      "meaning": "Porta do serviço de destino, como 443/TCP ou 53/UDP.",
      "securityNote": "Porta exposta sem necessidade aumenta superfície de ataque."
    },
    {
      "field": "Sequence/Acknowledgment",
      "meaning": "Campos TCP usados para ordenação e confirmação.",
      "securityNote": "Úteis em análise de retransmissões, resets e falhas de sessão."
    },
    {
      "field": "Flags TCP",
      "meaning": "SYN, ACK, FIN, RST e outras sinalizações de estado.",
      "securityNote": "SYN sem resposta, RST e FIN ajudam a diferenciar firewall, serviço fechado e encerramento normal."
    },
    {
      "field": "Length/Checksum",
      "meaning": "Tamanho e verificação básica de integridade do segmento/datagrama.",
      "securityNote": "Erros podem indicar captura truncada, offload, problema de MTU ou corrupção."
    }
  ],
  "packetFlow": [
    "A aplicação escolhe um destino por nome ou IP.",
    "DNS resolve nome quando necessário.",
    "A tabela de rotas escolhe o caminho até o IP de destino.",
    "O cliente escolhe uma porta efêmera de origem.",
    "A aplicação usa uma porta de destino conhecida ou configurada.",
    "TCP faz handshake ou UDP envia datagrama sem conexão.",
    "Firewalls, NATs e load balancers avaliam IP, porta, protocolo e estado.",
    "O sistema operacional do servidor entrega os dados ao processo que escuta naquela porta."
  ],
  "deepDive": {
    "title": "Transporte é onde rede começa a encontrar aplicação",
    "points": [
      "IP e rota podem estar corretos enquanto a porta está bloqueada.",
      "DNS pode resolver corretamente enquanto o serviço não está escutando.",
      "TCP permite observar handshake, retransmissão, reset e encerramento.",
      "UDP exige validação específica porque ausência de resposta pode ser normal ou bloqueio.",
      "NAT e firewalls stateful dependem de estado de transporte para permitir retorno."
    ],
    "mentalModel": "Separe sempre entrega ao host, entrega ao processo, estado da conversa e resposta da aplicação.",
    "keyTerms": [
      "5-tuple",
      "porta efêmera",
      "listener",
      "socket",
      "estado",
      "timeout",
      "NAT/PAT",
      "log de fluxo"
    ],
    "limitations": [
      "Teste de porta não prova saúde da aplicação.",
      "Conexão permitida não significa autorização de negócio.",
      "Sem logs de retorno e NAT, a investigação pode ficar inconclusiva."
    ],
    "whenToUse": [
      "Ao diagnosticar indisponibilidade de serviço.",
      "Ao desenhar regra de firewall, balanceador, NAT ou exposição de aplicação.",
      "Ao criar evidências para revisão de segurança ou incidente."
    ],
    "whenNotToUse": [
      "Não use teste de transporte como substituto de autenticação, autorização ou validação de aplicação.",
      "Não use porta aberta como justificativa para regra permanente sem dono e prazo."
    ],
    "operationalImpact": [
      "Exige documentação de fluxo, comandos de validação e evidências reproduzíveis.",
      "Muda o troubleshooting: antes de culpar aplicação, é preciso separar nome, rota, porta, estado, política e retorno.",
      "Cria dependência de logs e runbooks para reduzir tempo de incidente."
    ],
    "financialImpact": [
      "Pode gerar custo com firewall, NAT, load balancer, logs, tráfego entre zonas e horas de investigação.",
      "Configurações amplas ou retries excessivos aumentam consumo de rede e observabilidade.",
      "Alternativas locais e simuladas reduzem custo de estudo, mas não substituem validação do ambiente real."
    ],
    "securityImpact": [
      "Reduzir portas e fluxos ao mínimo diminui superfície de ataque.",
      "Conectividade não equivale a autorização; identidade, TLS, logs e menor privilégio continuam necessários.",
      "Logs de fluxo, estado e NAT são evidências importantes para resposta a incidente."
    ]
  },
  "commonMistakes": [
    "Dizer que a rede caiu quando apenas uma porta está bloqueada.",
    "Confundir porta fechada com host fora do ar.",
    "Achar que UDP funciona igual a TCP no teste de conectividade.",
    "Expor serviço em 0.0.0.0 sem política de firewall.",
    "Permitir 0.0.0.0/0 para portas administrativas.",
    "Ignorar porta efêmera em troubleshooting de NAT e firewall stateful."
  ],
  "troubleshooting": {
    "method": "Separar nome, IP, rota, porta, estado de conexão, TLS e aplicação.",
    "windows": [
      "Resolve-DnsName exemplo.com",
      "Test-NetConnection exemplo.com -Port 443",
      "netstat -ano",
      "Get-NetTCPConnection",
      "Get-NetUDPEndpoint",
      "tracert <ip>"
    ],
    "linux": [
      "dig exemplo.com",
      "ip route get <ip>",
      "ss -tulpen",
      "lsof -i -P -n",
      "nc -vz <host> <porta>",
      "curl -vk https://host",
      "sudo tcpdump -n host <ip> and port 443"
    ],
    "cisco": [
      "show access-lists",
      "show ip route",
      "show logging",
      "telnet <ip> <porta>",
      "show conn",
      "show policy-map"
    ],
    "cloud": [
      "Verificar security group/NSG",
      "Verificar NACL/NAT/route table",
      "Conferir listener do load balancer",
      "Validar health check",
      "Consultar flow logs e logs de firewall"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Por que a camada de transporte existe.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Resolve-DnsName exemplo.com; Test-NetConnection exemplo.com -Port 443; netstat -ano",
        "purpose": "Separar resolução de nome, teste de porta e sockets locais.",
        "expectedObservation": "DNS resolve, TcpTestSucceeded indica sucesso/falha e netstat mostra conexões/listeners.",
        "interpretation": "Se DNS funciona mas a porta falha, avance para rota, firewall, listener ou TLS."
      },
      {
        "platform": "PowerShell",
        "command": "Get-NetTCPConnection | Sort-Object State,LocalPort | Select-Object -First 20",
        "purpose": "Ver conexões TCP por estado e porta.",
        "expectedObservation": "Estados como Listen, Established, TimeWait aparecem com portas locais/remotas.",
        "interpretation": "Ajuda a diferenciar serviço escutando, cliente conectado e conexões encerradas."
      },
      {
        "platform": "Linux",
        "command": "dig exemplo.com +short; ip route get <ip>; ss -tulpen",
        "purpose": "Validar nome, rota escolhida e processos escutando.",
        "expectedObservation": "IP resolvido, rota/interface de saída e listeners com PID/processo.",
        "interpretation": "Falha antes de ss indica problema de nome/rota; falha em ss indica serviço ou bind."
      },
      {
        "platform": "Linux",
        "command": "nc -vz <host> <porta>; curl -vk https://<host>; sudo tcpdump -n -i any host <ip> and port <porta>",
        "purpose": "Testar porta, protocolo de aplicação e evidência de pacotes.",
        "expectedObservation": "SYN/SYN-ACK/ACK ou timeout/RST aparecem conforme o cenário.",
        "interpretation": "Permite separar porta fechada, bloqueio silencioso, TLS e erro HTTP."
      },
      {
        "platform": "Cisco/Firewall",
        "command": "show access-lists; show logging; show conn; show ip route <destino>",
        "purpose": "Correlacionar política, log, estado e rota.",
        "expectedObservation": "Regra aplicada, log de allow/deny, conexão criada e rota coerente.",
        "interpretation": "Se há allow sem retorno, investigar estado, NAT, caminho assimétrico ou rota de volta."
      },
      {
        "platform": "Cloud",
        "command": "Consultar flow logs, security group/NSG, NACL, route table, listener e health check",
        "purpose": "Validar controles gerenciados que impactam porta e estado.",
        "expectedObservation": "Logs de ACCEPT/REJECT e health check coerentes com a matriz de fluxos.",
        "interpretation": "Se o health check falha, o problema pode ser porta, protocolo, rota, SG/NACL ou aplicação."
      }
    ],
    "decisionTree": [
      {
        "if": "Nome não resolve",
        "then": "Investigar DNS antes de transporte: zona, resolver, split-horizon, cache e registro."
      },
      {
        "if": "Nome resolve e rota existe, mas a porta dá timeout",
        "then": "Suspeitar de firewall, NACL, rota de retorno, listener ausente em interface correta ou descarte silencioso."
      },
      {
        "if": "Teste de porta retorna refused/RST",
        "then": "O host respondeu, mas não há serviço aceitando naquela porta ou a aplicação rejeitou a conexão."
      },
      {
        "if": "TCP conecta mas curl/TLS falha",
        "then": "Transporte está funcional; avançar para TLS, SNI, certificado, proxy, HTTP e aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Inventariar portas expostas e donos dos serviços.",
      "Permitir apenas origem, destino, protocolo e porta necessários.",
      "Bloquear portas administrativas da Internet.",
      "Usar logs de firewall, load balancer e sistema operacional.",
      "Preferir serviços internos em sub-redes privadas.",
      "Revisar regras amplas periodicamente."
    ],
    "badPractices": [
      "Publicar banco de dados diretamente na Internet.",
      "Usar any-any interno sem justificativa.",
      "Abrir ranges amplos para resolver incidente sem rollback.",
      "Ignorar UDP em política e monitoramento.",
      "Tratar porta aberta como evidência suficiente de aplicação saudável."
    ],
    "attacksAndDefenses": [
      {
        "risk": "Exposição de serviço administrativo",
        "defense": "VPN, bastion, MFA, allowlist restrita e logging."
      },
      {
        "risk": "Varredura de portas",
        "defense": "Superfície mínima, detecção, rate limit e correlação no SIEM."
      },
      {
        "risk": "Bypass por porta alternativa",
        "defense": "Política por aplicação, inspeção, egress control e revisão de serviços escutando."
      },
      {
        "risk": "Regra ampla de saída",
        "defense": "Egress filtering, proxy, DNS controlado e flow logs."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Por que a camada de transporte existe",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Remover exceções permanentes sem justificativa."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-6.1",
    "title": "Observando transporte: nome, rota, porta e processo",
    "labType": "cloud",
    "objective": "Separar falha de DNS, rota, porta, firewall e aplicação usando ferramentas defensivas em Windows ou Linux.",
    "scenario": "Laboratório Neste laboratório, você vai observar portas, processos e conectividade de transporte de forma defensiva. A meta é diferenciar: nome resolve, rota existe, host responde, porta está aberta, serviço responde e aplicação funciona.",
    "topology": "Um cliente local consultando um serviço HTTP/HTTPS interno, externo ou de laboratório.",
    "architecture": "Cliente → DNS → rota/gateway → firewall/NAT → servidor/processo escutando em porta TCP ou UDP.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 160,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Resolver o nome",
        "instruction": "Resolva um nome conhecido e registre o IP retornado.",
        "command": "Windows: Resolve-DnsName example.com\nLinux: dig example.com +short\nAlternativa: nslookup example.com",
        "expectedOutput": "Um ou mais endereços IP ou erro DNS claro.",
        "explanation": "Antes de culpar porta ou aplicação, confirme se o nome aponta para o destino esperado."
      },
      {
        "number": 2,
        "title": "Validar rota até o IP",
        "instruction": "Verifique qual rota o sistema escolheria para alcançar o IP resolvido.",
        "command": "Windows: route print\nLinux: ip route get <ip>",
        "expectedOutput": "Interface, gateway e rota coerentes com a rede usada.",
        "explanation": "Transporte depende de conectividade IP; rota incorreta pode parecer “porta bloqueada”."
      },
      {
        "number": 3,
        "title": "Testar porta TCP",
        "instruction": "Teste uma porta conhecida e compare sucesso, timeout e refused quando possível.",
        "command": "Windows: Test-NetConnection example.com -Port 443\nLinux: nc -vz example.com 443\nLinux: curl -vk https://example.com",
        "expectedOutput": "Conexão TCP bem-sucedida ou erro explícito.",
        "explanation": "O teste mostra se há caminho até a porta, mas não prova que a aplicação está saudável."
      },
      {
        "number": 4,
        "title": "Listar processos e sockets locais",
        "instruction": "Liste sockets locais para observar listeners e conexões estabelecidas.",
        "command": "Windows: netstat -ano\nPowerShell: Get-NetTCPConnection\nLinux: ss -tulpen",
        "expectedOutput": "Portas locais, estados e, quando permitido, processo/PID.",
        "explanation": "Você verá que o sistema mantém várias conversas simultâneas separadas por portas e estado."
      },
      {
        "number": 5,
        "title": "Capturar evidência de fluxo",
        "instruction": "Capture ou simule a evidência mínima de uma conexão para correlacionar porta e IP.",
        "command": "Linux: sudo tcpdump -n -i any host <ip> and port 443\nWireshark: filtro tcp.port == 443",
        "expectedOutput": "Pacotes SYN/SYN-ACK/ACK ou evidência de timeout/RST.",
        "explanation": "A captura confirma se o pacote saiu, voltou ou foi interrompido no caminho."
      },
      {
        "number": 6,
        "title": "Documentar hipótese",
        "instruction": "Monte uma matriz curta com nome, IP, rota, porta, estado, evidência e hipótese.",
        "artifact": "Tabela: nome | IP | rota | protocolo | porta | estado | evidência | hipótese | próxima validação",
        "expectedOutput": "Matriz de diagnóstico preenchida.",
        "explanation": "O objetivo é aprender a separar camadas, não apenas executar comandos soltos."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Por que a camada de transporte existe”.",
    "validation": [
      {
        "check": "Nome resolvido ou erro DNS documentado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Nome resolvido ou erro DNS documentado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Rota e gateway verificados",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Rota e gateway verificados",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Porta testada com resultado interpretado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Porta testada com resultado interpretado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Processo ou listener identificado quando possível",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Processo ou listener identificado quando possível",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Evidências sanitizadas",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Evidências sanitizadas",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "SYN sem resposta sugere filtro, perda ou destino inacessível.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "RST rápido geralmente indica host alcançado mas porta fechada.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Conexão TCP estabelecida não garante aplicação saudável.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "UDP sem resposta não prova bloqueio por si só.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "DNS correto não elimina falha de rota ou firewall.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar teste UDP controlado",
      "Comparar fluxo via VPN e fora da VPN",
      "Validar logs de firewall/cloud",
      "Criar runbook padrão de teste de transporte"
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Por que a camada de transporte existe” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "API indisponível após deploy",
    "solution": "A causa deve ser classificada com evidência: sem SYN-ACK indica filtro/perda; RST indica rejeição/porta fechada; handshake TCP OK com falha TLS/HTTP indica camada superior.",
    "environment": [
      "Windows 10/11 ou Linux",
      "Acesso administrativo apenas quando necessário",
      "Um destino autorizado para teste",
      "Opcional: Wireshark ou tcpdump"
    ]
  },
  "mentorQuestions": [
    "Se o ping responde mas a porta 443 falha, em quais camadas você investigaria?",
    "Por que um firewall stateful precisa saber porta de origem e destino?",
    "Qual evidência diferencia serviço parado de firewall bloqueando?"
  ],
  "quiz": [
    {
      "question": "Qual problema principal a camada de transporte resolve?",
      "options": [
        "Escolher cabo de rede",
        "Entregar dados ao processo correto dentro do host",
        "Converter nomes em IP",
        "Calcular rota OSPF"
      ],
      "answer": 1,
      "explanation": "IP entrega ao host; transporte entrega a conversas/processos usando portas e protocolo."
    },
    {
      "question": "Qual protocolo é orientado à conexão?",
      "options": [
        "UDP",
        "ICMP",
        "TCP",
        "ARP"
      ],
      "answer": 2,
      "explanation": "TCP estabelece conexão e mantém estado."
    },
    {
      "question": "O que é uma porta efêmera?",
      "options": [
        "Porta física do switch",
        "Porta temporária usada normalmente pelo cliente",
        "Porta padrão do DNS",
        "VLAN nativa"
      ],
      "answer": 1,
      "explanation": "Clientes geralmente usam portas efêmeras como origem."
    },
    {
      "question": "RST TCP geralmente indica o quê?",
      "options": [
        "Nome não resolveu",
        "Host respondeu recusando ou encerrando conexão",
        "ARP falhou sempre",
        "TTL expirou"
      ],
      "answer": 1,
      "explanation": "RST indica reset TCP, frequentemente porta fechada ou rejeição ativa."
    },
    {
      "question": "Qual combinação identifica bem um fluxo?",
      "options": [
        "Somente MAC",
        "Somente DNS",
        "Protocolo, IPs e portas de origem/destino",
        "Apenas gateway"
      ],
      "answer": 2,
      "explanation": "O 5-tuple identifica protocolo, origem/destino e portas."
    },
    {
      "question": "Por que UDP exige cuidado no troubleshooting?",
      "options": [
        "Porque sempre tem handshake",
        "Porque ausência de resposta pode ser normal, filtro ou falha",
        "Porque usa ARP no lugar de IP",
        "Porque não usa portas"
      ],
      "answer": 1,
      "explanation": "UDP não estabelece conexão como TCP; a interpretação depende do protocolo de aplicação."
    }
  ],
  "flashcards": [
    {
      "front": "IP entrega para quê?",
      "back": "Para um host/endereço de rede."
    },
    {
      "front": "Transporte entrega para quê?",
      "back": "Para uma conversa ou processo identificado por protocolo e porta."
    },
    {
      "front": "TCP oferece o quê?",
      "back": "Conexão, estado, ordenação, confirmação e retransmissão."
    },
    {
      "front": "UDP oferece o quê?",
      "back": "Datagramas simples sem conexão e com menor overhead."
    },
    {
      "front": "O que é 5-tuple?",
      "back": "Protocolo, IP de origem, porta de origem, IP de destino e porta de destino."
    },
    {
      "front": "Porta aberta garante aplicação saudável?",
      "back": "Não. Garante apenas que uma conexão pode ser aceita naquele nível."
    }
  ],
  "exercises": [
    {
      "title": "Separar camadas",
      "prompt": "Explique por que DNS correto e ping respondendo não garantem que HTTPS funcione.",
      "expectedAnswer": "Porque HTTPS depende de porta 443/TCP, firewall, TLS, serviço web e aplicação."
    },
    {
      "title": "Interpretar teste",
      "prompt": "Um Test-NetConnection para 443 dá TcpTestSucceeded=False, mas ping responde. Liste três hipóteses.",
      "expectedAnswer": "Serviço parado, firewall bloqueando, listener em outra porta/interface, ACL intermediária ou load balancer sem backend."
    },
    {
      "title": "Identificar risco",
      "prompt": "Qual o risco de expor SSH 22/TCP para 0.0.0.0/0?",
      "expectedAnswer": "Aumenta superfície para brute force, exploração e varredura; deve usar VPN/bastion/MFA/allowlist."
    },
    {
      "title": "TCP ou UDP",
      "prompt": "Compare DNS em 53/UDP e HTTPS em 443/TCP do ponto de vista de troubleshooting.",
      "expectedAnswer": "DNS UDP pode não ter handshake; HTTPS TCP permite observar handshake, reset e estado de conexão."
    }
  ],
  "challenge": {
    "title": "API indisponível após deploy",
    "scenario": "Após um deploy, usuários dizem que api.empresa.local parou. DNS resolve para 10.30.8.20, ping responde, mas clientes recebem timeout em HTTPS.",
    "tasks": [
      "Montar sequência de diagnóstico",
      "Indicar comandos Windows e Linux",
      "Explicar como diferenciar firewall, serviço parado e TLS",
      "Definir evidências para abrir incidente"
    ],
    "rubric": [
      "Não pular DNS e rota",
      "Testar porta explicitamente",
      "Verificar listener/processo",
      "Consultar logs de firewall/load balancer",
      "Separar transporte de aplicação"
    ]
  },
  "commentedSolution": {
    "summary": "A investigação correta começa confirmando DNS, rota e teste de porta. Ping não prova HTTPS. Timeout em 443 sugere filtro, caminho, NAT, load balancer ou serviço que não responde.",
    "steps": [
      "Resolver api.empresa.local e registrar IP",
      "Executar ip route get/route print para rota",
      "Testar 443 com Test-NetConnection ou nc",
      "No servidor, verificar ss/netstat/lsof para listener",
      "Conferir logs de firewall/load balancer",
      "Se TCP conecta, testar TLS e HTTP com curl -vk"
    ],
    "finalAnswer": "A causa deve ser classificada com evidência: sem SYN-ACK indica filtro/perda; RST indica rejeição/porta fechada; handshake TCP OK com falha TLS/HTTP indica camada superior."
  },
  "glossary": [
    {
      "term": "Camada de transporte",
      "definition": "Camada que permite comunicação entre processos usando protocolos como TCP e UDP."
    },
    {
      "term": "Porta",
      "definition": "Número lógico que identifica serviço ou conversa em um host."
    },
    {
      "term": "Porta efêmera",
      "definition": "Porta temporária normalmente usada pelo cliente como origem."
    },
    {
      "term": "Socket",
      "definition": "Associação lógica entre IP, porta e protocolo usada por aplicações."
    },
    {
      "term": "TCP",
      "definition": "Protocolo orientado à conexão com controle de entrega, ordem e retransmissão."
    },
    {
      "term": "UDP",
      "definition": "Protocolo sem conexão, simples, usado por serviços que toleram ou controlam perda na aplicação."
    }
  ],
  "references": [
    {
      "title": "RFC 793 — Transmission Control Protocol",
      "type": "standard"
    },
    {
      "title": "RFC 768 — User Datagram Protocol",
      "type": "standard"
    },
    {
      "title": "RFC 9293 — Transmission Control Protocol atualizado",
      "type": "standard"
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Containers e Kubernetes",
      "reason": "Portas, Services e probes dependem da camada de transporte."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Autenticação e sessões",
      "reason": "TLS, tokens e autenticação trafegam sobre conexões de transporte."
    }
  ],
  "progressRules": {
    "completeAfter": [
      "contentRead",
      "quizPassed",
      "labSubmitted"
    ],
    "minimumQuizScore": 70,
    "requiredLabId": "lab-6.1",
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
      "6.2"
    ]
  },
  "impacts": {
    "operational": [
      "Exige documentação de fluxo, comandos de validação e evidências reproduzíveis.",
      "Muda o troubleshooting: antes de culpar aplicação, é preciso separar nome, rota, porta, estado, política e retorno.",
      "Cria dependência de logs e runbooks para reduzir tempo de incidente."
    ],
    "financial": [
      "Pode gerar custo com firewall, NAT, load balancer, logs, tráfego entre zonas e horas de investigação.",
      "Configurações amplas ou retries excessivos aumentam consumo de rede e observabilidade.",
      "Alternativas locais e simuladas reduzem custo de estudo, mas não substituem validação do ambiente real."
    ],
    "security": [
      "Reduzir portas e fluxos ao mínimo diminui superfície de ataque.",
      "Conectividade não equivale a autorização; identidade, TLS, logs e menor privilégio continuam necessários.",
      "Logs de fluxo, estado e NAT são evidências importantes para resposta a incidente."
    ]
  },
  "reviewChecklist": [
    "Consigo explicar qual problema esta aula resolve antes de citar a definição?",
    "Consigo apontar evidência de DNS, rota, porta, estado, política e aplicação separadamente?",
    "Consigo explicar um impacto operacional, financeiro e de segurança do tema?",
    "Consigo transformar o cenário em matriz de fluxo ou runbook de troubleshooting?"
  ]
};
