export const lesson0602 = {
  "id": "6.2",
  "moduleId": "m06",
  "order": 2,
  "title": "Portas, sockets e multiplexação",
  "subtitle": "Entenda como um único host conversa com muitos serviços ao mesmo tempo usando portas, sockets, portas efêmeras, escuta de serviços e multiplexação de fluxos TCP e UDP.",
  "duration": "110-165 min",
  "estimatedStudyTimeMinutes": 170,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "redes",
    "camada de transporte",
    "portas",
    "sockets",
    "multiplexação",
    "tcp",
    "udp",
    "firewall",
    "nat",
    "load balancer",
    "segurança",
    "p0-04",
    "fundamento-crítico",
    "troubleshooting",
    "evidência"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.1",
      "title": "Por que a camada de transporte existe",
      "reason": "A aula anterior explica por que a camada de transporte existe e por que IP sozinho não entrega dados ao processo correto."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "title": "Gateway padrão e rota local",
      "reason": "Sockets e portas só fazem sentido depois que o tráfego consegue alcançar o host correto pela rede IP."
    }
  ],
  "objectives": [
    "Explicar o que são portas de origem, portas de destino, sockets e fluxos.",
    "Diferenciar porta conhecida, registrada, dinâmica e efêmera.",
    "Entender multiplexação e demultiplexação de conexões em um mesmo host.",
    "Ler evidências de portas escutando e conexões estabelecidas em Windows e Linux.",
    "Relacionar portas e sockets com firewall, NAT, load balancer, containers e cloud.",
    "Identificar riscos de portas expostas, bind incorreto e regras permissivas."
  ],
  "learningOutcomes": [
    "Interpretar um fluxo usando protocolo, IP de origem, porta de origem, IP de destino e porta de destino.",
    "Explicar por que várias conexões podem existir simultaneamente entre os mesmos hosts.",
    "Distinguir serviço escutando, conexão estabelecida, porta fechada e bloqueio por firewall.",
    "Usar netstat, ss, lsof, Test-NetConnection, nc e tcpdump em investigação defensiva.",
    "Documentar portas e fluxos permitidos em uma matriz de comunicação corporativa.",
    "Diferenciar listener, socket conectado, porta local, porta remota, bind em loopback e bind em todas as interfaces.",
    "Explicar o papel de portas efêmeras em clientes, NAT/PAT, firewall stateful e troubleshooting.",
    "Avaliar risco de expor um serviço em 0.0.0.0 em vez de 127.0.0.1."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Na aula anterior, você viu que a camada de transporte existe para entregar dados à aplicação correta, não apenas ao computador correto. Agora vem a pergunta operacional: <strong>como o sistema operacional separa centenas de conversas simultâneas usando o mesmo endereço IP?</strong></p><p>Um notebook pode estar com navegador aberto, Teams, VPN, agente EDR, sincronização em nuvem, SSH, consultas DNS e chamadas de API ao mesmo tempo. Um servidor pode receber HTTPS, SSH, métricas, logs, banco de dados e health checks no mesmo IP. Sem portas e sockets, tudo isso chegaria misturado.</p><div class='callout'><strong>Ideia central:</strong> portas identificam serviços e conversas; sockets representam os pontos finais usados pelo sistema operacional para separar fluxos.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>Quando redes passaram a conectar computadores multiusuário e sistemas capazes de executar vários programas ao mesmo tempo, tornou-se necessário identificar não apenas o host remoto, mas o programa local e remoto envolvido na comunicação.</p><p>O modelo TCP/IP resolveu isso com números de porta. Algumas portas se tornaram convencionais para serviços conhecidos, como 80/TCP para HTTP, 443/TCP para HTTPS, 53/UDP para DNS e 22/TCP para SSH. Com o crescimento da Internet, firewalls, NATs, balanceadores e sistemas operacionais passaram a usar portas como elemento central de controle e observabilidade.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Imagine um servidor com um único IP: <code>10.20.5.10</code>. Ele executa uma API em 443/TCP, SSH em 22/TCP, métricas em 9100/TCP e um agente DNS em 53/UDP. Quando um pacote chega ao IP do servidor, o sistema operacional precisa saber para qual processo entregar os dados.</p><p>Também existe o problema inverso: um cliente pode abrir várias conexões HTTPS para o mesmo servidor ao mesmo tempo. O servidor precisa responder para a conversa correta, não apenas para o IP do cliente.</p><div class='callout callout--problem'><strong>Problema operacional:</strong> IP identifica o host. Sem porta de destino, porta de origem e estado do fluxo, o sistema não sabe qual aplicação deve receber ou responder aos dados.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>A evolução das portas criou categorias úteis. As portas conhecidas vão de 0 a 1023 e são associadas a serviços tradicionais. As portas registradas vão de 1024 a 49151 e são usadas por aplicações e fabricantes. As portas dinâmicas ou efêmeras, geralmente entre 49152 e 65535 em muitos sistemas modernos, são escolhidas temporariamente pelo cliente para iniciar conversas.</p><p>Com cloud, containers e microsserviços, a noção de porta ficou ainda mais importante. Um container pode escutar em 8080/TCP, um Service Kubernetes expor 80/TCP, um Ingress receber 443/TCP e um load balancer encaminhar para backends em outra porta. O conceito é o mesmo, mas a cadeia tem mais camadas.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>Porta</strong> é um identificador numérico de 16 bits usado por TCP e UDP para indicar o serviço ou conversa. Uma porta pode ir de <code>0</code> a <code>65535</code>. Um <strong>socket</strong> é um ponto final de comunicação controlado pelo sistema operacional, normalmente associado a IP, porta e protocolo.</p><p>Um fluxo de rede costuma ser descrito pela 5-tuple: protocolo, IP de origem, porta de origem, IP de destino e porta de destino. Essa combinação permite multiplexar várias conversas ao mesmo tempo.</p><div class='definition-box'>Multiplexação é a capacidade de muitas aplicações e conversas compartilharem a mesma pilha de rede sem se misturarem, usando protocolo, IPs, portas e estado.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um servidor inicia, ele normalmente cria um socket e faz bind em um endereço e porta. Por exemplo: escutar em <code>0.0.0.0:443</code>, <code>10.20.5.10:443</code> ou <code>127.0.0.1:8080</code>. Cada escolha tem impacto operacional e de segurança.</p><ol class='flow-list'><li>Um processo servidor solicita ao sistema operacional uma porta para escutar.</li><li>O sistema valida se a porta já não está em uso para aquele IP/protocolo.</li><li>O processo fica em estado de escuta, aguardando conexões ou datagramas.</li><li>Um cliente escolhe uma porta efêmera de origem.</li><li>O cliente envia dados para IP/protocolo/porta de destino.</li><li>O kernel identifica o socket correto pela combinação de protocolo, IPs e portas.</li><li>O processo de aplicação recebe os dados.</li><li>Respostas voltam usando a combinação inversa de origem e destino.</li></ol>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04-6-2-socket-table'>\n  <h4>Listener, socket e porta efêmera não são a mesma coisa</h4>\n  <p>Um <strong>listener</strong> é um socket em estado de escuta, normalmente associado a uma porta local e a um endereço de bind. Um socket conectado representa uma conversa específica. A porta de destino costuma identificar o serviço; a porta de origem, muitas vezes efêmera, identifica a conversa do cliente.</p>\n  <p>Essa diferença explica por que um navegador pode abrir várias conexões HTTPS simultâneas para a mesma porta 443. Todas usam o mesmo destino, mas cada uma usa uma porta local diferente. Em NAT/PAT, o dispositivo de borda também usa portas para distinguir múltiplos clientes internos compartilhando um único IP público.</p>\n  <table class='comparison-table'><thead><tr><th>Conceito</th><th>O que significa</th><th>Como aparece</th><th>Risco comum</th></tr></thead><tbody>\n    <tr><td>127.0.0.1:8080</td><td>Serviço acessível apenas localmente</td><td>Desenvolvimento local</td><td>Achar que está exposto para a rede quando não está.</td></tr>\n    <tr><td>0.0.0.0:8080</td><td>Serviço escutando em todas as interfaces IPv4</td><td>Container, VM ou servidor</td><td>Expor painel interno sem perceber.</td></tr>\n    <tr><td>Cliente:51544 → Servidor:443</td><td>Porta efêmera identifica a conversa do cliente</td><td>Navegação web, API, TLS</td><td>Abrir regra inbound desnecessária para portas efêmeras.</td></tr>\n    <tr><td>NAT/PAT</td><td>Tradução usando IP e porta</td><td>Rede doméstica, cloud NAT Gateway</td><td>Perder rastreabilidade se logs de NAT não forem preservados.</td></tr>\n  </tbody></table>\n</div>",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Portas e sockets aparecem em todos os elementos modernos: sistemas operacionais, firewalls, NAT, load balancers, proxies, service mesh, containers e cloud. Uma falha em qualquer camada pode produzir sintomas parecidos, por isso o diagnóstico precisa separar escuta local, caminho de rede, política e aplicação.</p><table class='data-table'><thead><tr><th>Conceito</th><th>Função</th><th>Exemplo</th><th>Risco comum</th></tr></thead><tbody><tr><td>Porta de destino</td><td>Identifica serviço remoto</td><td>443/TCP</td><td>Abrir porta sensível para origem ampla</td></tr><tr><td>Porta de origem</td><td>Identifica conversa do cliente</td><td>51544/TCP</td><td>Bloquear retorno efêmero em firewall mal configurado</td></tr><tr><td>Socket de escuta</td><td>Processo aguardando tráfego</td><td>0.0.0.0:8080</td><td>Escutar em todas as interfaces sem necessidade</td></tr><tr><td>5-tuple</td><td>Identifica fluxo</td><td>TCP 10.1.1.10:51544 → 10.2.2.20:443</td><td>Logs sem porta tornam investigação incompleta</td></tr><tr><td>Load balancer</td><td>Recebe em uma porta e encaminha</td><td>443 externo → 8080 interno</td><td>Health check em porta errada</td></tr></tbody></table>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04-6-2-exposicao'>\n  <h4>Arquitetura de exposição de portas</h4>\n  <p>Em ambiente corporativo, uma porta aberta precisa ter dono, justificativa, origem permitida, destino, protocolo, ambiente, criticidade, log e prazo de revisão. Em DevSecOps, isso deve aparecer como código: manifesto Kubernetes, regra de security group, variável de porta, health check, documentação e teste automatizado.</p>\n  <p>O custo financeiro aparece quando portas expostas exigem WAF, balanceador, firewall gerenciado, logs adicionais, scanner de vulnerabilidade ou resposta a incidente. O custo operacional aparece na revisão de exceções, troubleshooting de falso positivo, documentação e plantão.</p>\n</div>",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine um prédio comercial. O endereço do prédio é o IP. A porta do prédio não basta: você precisa do andar, sala ou ramal para falar com o setor certo. A porta TCP/UDP funciona como esse ramal lógico.</p><p>Mas a analogia tem limite. Em redes, o mesmo serviço pode mudar de porta, proxies podem traduzir portas, NAT pode trocar portas de origem e containers podem mapear uma porta externa para outra interna.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Seu navegador acessa <code>https://exemplo.local</code>. O DNS resolve o nome para <code>10.20.5.10</code>. O navegador pede ao sistema para abrir uma conexão TCP para <code>10.20.5.10:443</code>. O sistema escolhe uma porta efêmera, como <code>51544</code>. O fluxo fica parecido com: <code>TCP 192.168.1.50:51544 → 10.20.5.10:443</code>.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, uma matriz de comunicação não deve dizer apenas “usuários acessam servidores”. Ela deve registrar origem, destino, protocolo, porta, dono, justificativa, ambiente e criticidade. Exemplo: <code>VLAN-USUARIOS → API-PEDIDOS | TCP/443 | dono: time de e-commerce | justificativa: portal interno</code>.</p><p>Essa precisão evita regras any-any, reduz superfície de ataque e melhora investigação no SOC.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, portas aparecem em security groups, NSGs, NACLs, load balancers, target groups, health checks e service endpoints. Uma aplicação pode estar exposta em 443/TCP no load balancer, mas o backend escutar em 8080/TCP dentro de uma sub-rede privada.</p><p>O desenho seguro exige separar porta pública, porta interna, origem permitida, health check, logs e criptografia.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em pipelines, portas aparecem em testes de integração, containers, docker-compose, Kubernetes, manifests Helm, Ingress, NetworkPolicy e scanners. Um erro comum é expor temporariamente uma porta para debug e esquecer de remover.</p><p>DevSecOps trata portas como código: revisa manifests, bloqueia exposição indevida com policy as code, testa health checks e registra a matriz de fluxos no repositório.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Em segurança, uma porta aberta não significa necessariamente vulnerabilidade, mas indica superfície de exposição. Uma porta administrativa aberta para <code>0.0.0.0/0</code> é um risco grave. Um serviço escutando em <code>127.0.0.1</code> pode ser seguro localmente, mas pode se tornar acessível se um proxy publicar a porta sem controle.</p><div class='callout callout--security'><strong>Regra defensiva:</strong> documente o serviço, dono, origem permitida, destino, protocolo, porta, autenticação, criptografia e logs antes de liberar um fluxo.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <p>O diagrama mostra como portas e sockets separam múltiplas conversas sobre o mesmo IP.</p>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m06l02-title m06l02-desc'>\n    <title id='m06l02-title'>Portas, sockets e multiplexação</title>\n    <desc id='m06l02-desc'>Cliente com múltiplas portas efêmeras acessando serviços diferentes em um servidor e passando por firewall.</desc>\n    <defs><marker id='m06l02-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path></marker></defs>\n    <rect x='40' y='70' width='210' height='210' rx='18' class='svg-node svg-node--client'></rect><text x='145' y='110' text-anchor='middle' class='svg-label'>Cliente</text><text x='145' y='140' text-anchor='middle' class='svg-label svg-label--small'>192.168.10.50</text><text x='145' y='175' text-anchor='middle' class='svg-label svg-label--small'>51544 → 443/TCP</text><text x='145' y='205' text-anchor='middle' class='svg-label svg-label--small'>51545 → 22/TCP</text><text x='145' y='235' text-anchor='middle' class='svg-label svg-label--small'>51546 → 53/UDP</text>\n    <rect x='360' y='95' width='210' height='160' rx='18' class='svg-node svg-node--firewall'></rect><text x='465' y='135' text-anchor='middle' class='svg-label'>Firewall/NAT</text><text x='465' y='168' text-anchor='middle' class='svg-label svg-label--small'>5-tuple</text><text x='465' y='198' text-anchor='middle' class='svg-label svg-label--small'>estado e política</text>\n    <rect x='690' y='70' width='230' height='250' rx='18' class='svg-node svg-node--server'></rect><text x='805' y='110' text-anchor='middle' class='svg-label'>Servidor</text><text x='805' y='140' text-anchor='middle' class='svg-label svg-label--small'>10.20.5.10</text><rect x='730' y='165' width='150' height='36' rx='9' class='svg-badge'></rect><text x='805' y='189' text-anchor='middle' class='svg-label svg-label--small'>socket 443/TCP</text><rect x='730' y='212' width='150' height='36' rx='9' class='svg-badge'></rect><text x='805' y='236' text-anchor='middle' class='svg-label svg-label--small'>socket 22/TCP</text><rect x='730' y='259' width='150' height='36' rx='9' class='svg-badge'></rect><text x='805' y='283' text-anchor='middle' class='svg-label svg-label--small'>socket 53/UDP</text>\n    <line x1='250' y1='168' x2='360' y2='145' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l02-arrow)'></line><line x1='250' y1='205' x2='360' y2='178' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l02-arrow)'></line><line x1='250' y1='238' x2='360' y2='210' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l02-arrow)'></line>\n    <line x1='570' y1='145' x2='690' y2='183' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l02-arrow)'></line><line x1='570' y1='178' x2='690' y2='230' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l02-arrow)'></line><line x1='570' y1='210' x2='690' y2='277' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l02-arrow)'></line>\n    <rect x='70' y='385' width='840' height='120' rx='18' class='svg-zone'></rect><text x='490' y='425' text-anchor='middle' class='svg-label'>Multiplexação</text><text x='490' y='458' text-anchor='middle' class='svg-label svg-label--small'>Mesmo IP do cliente + múltiplas portas efêmeras = conversas separadas</text><text x='490' y='488' text-anchor='middle' class='svg-label svg-label--small'>Mesmo IP do servidor + portas diferentes = serviços diferentes</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai observar portas escutando, portas efêmeras, sockets, conexões estabelecidas e diferenças entre bind em <code>127.0.0.1</code>, IP específico e <code>0.0.0.0</code>.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam leitura de fluxos, identificação de portas, interpretação de sockets e construção de matriz de comunicação.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá uma aplicação que deveria responder na porta 8443, mas o teste externo falha. Sua missão é descobrir se o problema é porta escutando, bind local, firewall, NAT, load balancer ou serviço parado.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostra como investigar de dentro para fora: processo, socket, firewall local, rota, firewall de rede, NAT/load balancer e resposta de aplicação.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Portas e sockets são a base prática da camada de transporte. Eles permitem que muitos serviços e muitas conversas compartilhem o mesmo host e a mesma rede sem se misturar.</p><p>Na prática corporativa, entender portas é essencial para firewall, NAT, load balancer, Kubernetes, cloud, SIEM, troubleshooting e hardening.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará TCP em profundidade: handshake, estado, flags, encerramento, resets e como interpretar sintomas de conexão em troubleshooting.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 4",
      "Camada 3",
      "Camada 7"
    ],
    "beforeThisLesson": "O aluno entende por que a camada de transporte existe e como IP/roteamento levam pacotes até hosts.",
    "afterThisLesson": "O aluno entende como portas, sockets e 5-tuples permitem múltiplos serviços e fluxos simultâneos.",
    "dependsOn": [
      "IPv4",
      "Roteamento",
      "DNS",
      "Firewall",
      "NAT",
      "Sistema operacional"
    ]
  },
  "protocolFields": [
    {
      "field": "Protocol",
      "meaning": "Identifica TCP, UDP ou outro protocolo acima de IP.",
      "securityNote": "Uma política deve diferenciar 53/UDP de 53/TCP, 443/TCP de QUIC/443/UDP e tráfego permitido de tráfego inesperado."
    },
    {
      "field": "Source IP",
      "meaning": "Endereço IP do host que iniciou ou enviou o fluxo.",
      "securityNote": "NAT, proxy e load balancer podem alterar a origem observada nos logs."
    },
    {
      "field": "Source Port",
      "meaning": "Porta escolhida pelo cliente, frequentemente efêmera.",
      "securityNote": "Firewalls stateful e NAT usam essa porta para correlacionar retorno."
    },
    {
      "field": "Destination IP",
      "meaning": "IP do serviço, VIP, load balancer ou backend.",
      "securityNote": "Destino público versus privado muda superfície de exposição."
    },
    {
      "field": "Destination Port",
      "meaning": "Porta do serviço que deve receber a comunicação.",
      "securityNote": "Portas administrativas e bancos não devem ser expostos amplamente."
    },
    {
      "field": "Socket State",
      "meaning": "Estado da conexão ou do socket, como LISTEN, ESTABLISHED, TIME_WAIT ou UDP aberto.",
      "securityNote": "Estados ajudam a diferenciar serviço escutando, conexão real, fila saturada e encerramento normal."
    }
  ],
  "packetFlow": [
    "Servidor cria socket e escuta em protocolo, IP e porta.",
    "Cliente resolve nome para IP, quando necessário.",
    "Cliente escolhe uma porta efêmera de origem.",
    "Cliente envia para IP de destino, protocolo e porta de destino.",
    "Firewalls e NATs avaliam a 5-tuple e o estado do fluxo.",
    "Sistema operacional do servidor identifica o socket correto.",
    "Processo de aplicação recebe dados e responde.",
    "Resposta retorna para a porta efêmera do cliente, respeitando estado e tradução quando houver NAT."
  ],
  "deepDive": {
    "title": "Socket não é apenas porta",
    "points": [
      "Uma porta pode estar aberta apenas em 127.0.0.1 e não aceitar conexões remotas.",
      "Um serviço pode escutar em 0.0.0.0 e ficar exposto em todas as interfaces se o firewall permitir.",
      "TCP e UDP podem usar o mesmo número de porta para funções diferentes.",
      "NAT e load balancers podem alterar IP e porta ao longo do caminho.",
      "Logs úteis precisam registrar protocolo, origem, porta de origem, destino, porta de destino, ação e timestamp."
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
    "Achar que porta 443 sempre significa HTTPS legítimo.",
    "Confundir CNAME/DNS resolvendo com porta aberta.",
    "Ver processo escutando em 127.0.0.1 e esperar acesso remoto.",
    "Publicar serviço em 0.0.0.0 sem firewall e sem inventário.",
    "Ignorar porta efêmera no retorno de conexões via firewall ou NAT.",
    "Documentar firewall apenas como origem e destino, sem protocolo e porta."
  ],
  "troubleshooting": {
    "method": "Validar processo escutando, IP de bind, porta, firewall local, rota, firewall de rede, NAT/load balancer e resposta de aplicação.",
    "windows": [
      "netstat -ano",
      "Get-NetTCPConnection",
      "Get-NetUDPEndpoint",
      "Test-NetConnection <host> -Port <porta>",
      "Get-Process -Id <PID>",
      "Resolve-DnsName <nome>"
    ],
    "linux": [
      "ss -tulpen",
      "ss -tanp",
      "sudo lsof -i -P -n",
      "nc -vz <host> <porta>",
      "curl -vk https://<host>:<porta>",
      "sudo tcpdump -n host <ip> and port <porta>"
    ],
    "cisco": [
      "show access-lists",
      "show ip route",
      "show logging",
      "show conn",
      "telnet <ip> <porta>",
      "show policy-map"
    ],
    "cloud": [
      "Verificar security group/NSG",
      "Verificar NACL/firewall",
      "Conferir listener e target group do load balancer",
      "Validar health check",
      "Consultar flow logs"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Portas, sockets e multiplexação.",
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
        "command": "netstat -ano | findstr LISTENING",
        "purpose": "Listar listeners TCP e associar portas a PIDs.",
        "expectedObservation": "Portas locais em escuta e PIDs.",
        "interpretation": "Permite identificar se o serviço realmente está escutando."
      },
      {
        "platform": "PowerShell",
        "command": "Get-NetTCPConnection -State Listen; Get-NetUDPEndpoint",
        "purpose": "Listar listeners TCP e endpoints UDP.",
        "expectedObservation": "Porta local, endereço de bind e estado.",
        "interpretation": "Ajuda a diferenciar TCP com estado de UDP sem conexão."
      },
      {
        "platform": "Linux",
        "command": "ss -tulpen",
        "purpose": "Listar TCP/UDP, listeners, processo e endereço de bind.",
        "expectedObservation": "Local Address:Port mostra 127.0.0.1, 0.0.0.0 ou IP específico.",
        "interpretation": "Bind em 0.0.0.0 pode expor mais do que o desejado; bind em 127.0.0.1 pode impedir acesso remoto."
      },
      {
        "platform": "Linux",
        "command": "python -m http.server 8080; curl http://127.0.0.1:8080; ss -tanp | grep 8080",
        "purpose": "Subir serviço controlado e observar socket local.",
        "expectedObservation": "Listener e conexão local aparecem no sistema.",
        "interpretation": "Mostra como porta de serviço e porta efêmera aparecem durante uma conversa."
      },
      {
        "platform": "Cliente",
        "command": "nc -vz <host> <porta>; curl -v http://<host>:<porta>",
        "purpose": "Testar conectividade e resposta da aplicação.",
        "expectedObservation": "Conexão, refused, timeout ou resposta HTTP.",
        "interpretation": "Conexão TCP não garante autorização nem saúde da aplicação."
      },
      {
        "platform": "Firewall/Cloud",
        "command": "Revisar regra de origem/destino/protocolo/porta e logs de ACCEPT/REJECT",
        "purpose": "Validar se a exposição é intencional e mínima.",
        "expectedObservation": "Regra e log correspondem ao fluxo testado.",
        "interpretation": "Se a regra é ampla, corrija matriz de acesso antes de culpar a aplicação."
      }
    ],
    "decisionTree": [
      {
        "if": "Porta aparece em 127.0.0.1, mas acesso remoto falha",
        "then": "O serviço está restrito ao loopback; ajustar bind ou publicar via proxy seguro, se fizer sentido."
      },
      {
        "if": "Porta aparece em 0.0.0.0 sem necessidade",
        "then": "Reduzir exposição para interface específica, firewall local ou rede privada."
      },
      {
        "if": "Cliente recebe timeout",
        "then": "Investigar firewall, rota de retorno, NACL, SG, NAT, serviço parado ou descarte silencioso."
      },
      {
        "if": "Cliente recebe connection refused",
        "then": "Host respondeu, mas não há listener naquela porta ou o serviço rejeitou a conexão."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter inventário de portas por serviço, dono, ambiente e exposição.",
      "Escutar apenas nas interfaces necessárias.",
      "Restringir origem por necessidade real, não por conveniência.",
      "Registrar decisões em matriz de comunicação versionada.",
      "Usar TLS quando houver dados sensíveis ou tráfego não confiável.",
      "Monitorar portas administrativas e mudanças de exposição."
    ],
    "badPractices": [
      "Permitir 0.0.0.0/0 para SSH, RDP, banco ou painéis internos.",
      "Rodar aplicação de debug escutando em todas as interfaces.",
      "Abrir range amplo de portas sem rollback.",
      "Ignorar UDP em regras e logs.",
      "Confiar apenas em número de porta para classificar aplicação."
    ],
    "attacksAndDefenses": [
      {
        "risk": "Serviço administrativo exposto",
        "defense": "VPN, bastion, MFA, allowlist mínima, logs e alertas."
      },
      {
        "risk": "Varredura de portas",
        "defense": "Superfície mínima, detecção, rate limit, honeypots controlados e correlação no SIEM."
      },
      {
        "risk": "Bind em 0.0.0.0 por engano",
        "defense": "Hardening de configuração, revisão de deploy e testes automatizados."
      },
      {
        "risk": "Bypass por porta alternativa",
        "defense": "Controle por identidade, proxy, inspeção e inventário de aplicações."
      },
      {
        "risk": "Logs sem porta de origem",
        "defense": "Padronizar logs de firewall, proxy, load balancer e sistema operacional com 5-tuple."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Portas, sockets e multiplexação",
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
    "id": "lab-6.2",
    "title": "Observando portas, sockets e multiplexação",
    "labType": "security",
    "objective": "Identificar portas escutando, conexões estabelecidas, portas efêmeras e diferenças de bind local/remoto em Windows ou Linux.",
    "scenario": "Laboratório Neste laboratório, você vai observar portas escutando, portas efêmeras, sockets, conexões estabelecidas e diferenças entre bind em 127.0.0.1 , IP específico e 0.0.0.0 .",
    "topology": "Um computador local com acesso à Internet e, opcionalmente, uma VM Linux ou container local executando serviço HTTP simples.",
    "architecture": "Cliente local → sistema operacional → socket de origem efêmero → rede/firewall local → serviço de destino em porta conhecida ou configurada.",
    "prerequisites": [
      "Windows 10/11 ou Linux",
      "Permissão para executar comandos locais",
      "Opcional: Python 3 para subir servidor HTTP local",
      "Não executar testes contra terceiros sem autorização"
    ],
    "tools": [
      "Terminal Linux",
      "Docker local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 165,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não execute varredura em redes de terceiros.",
      "Não exponha serviços locais para a Internet durante o laboratório.",
      "Sanitize IPs públicos, nomes internos, PIDs e caminhos antes de compartilhar evidências.",
      "Use ambiente isolado para testes de firewall e bind."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Listar sockets locais",
        "instruction": "Observe serviços escutando e conexões existentes.",
        "command": "Windows: netstat -ano\nWindows: Get-NetTCPConnection\nLinux: ss -tulpen\nLinux: ss -tanp",
        "expectedOutput": "Você deve ver estados como LISTEN e ESTABLISHED, além de portas locais e remotas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas, sockets e multiplexação” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Identificar porta efêmera",
        "instruction": "Acesse um site HTTPS e observe a conexão local para 443/TCP.",
        "command": "Windows: Get-NetTCPConnection -RemotePort 443\nLinux: ss -tanp | grep ':443'",
        "expectedOutput": "A porta remota deve ser 443 e a porta local deve ser uma porta alta/efêmera.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas, sockets e multiplexação” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Subir serviço local controlado",
        "instruction": "Inicie um servidor HTTP local apenas para laboratório.",
        "command": "python -m http.server 8080\ncurl http://127.0.0.1:8080",
        "expectedOutput": "O serviço deve responder localmente na porta 8080.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas, sockets e multiplexação” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Comparar bind local e exposição",
        "instruction": "Observe se o serviço escuta em 127.0.0.1, 0.0.0.0 ou IP específico.",
        "command": "Linux: ss -tulpen | grep 8080\nWindows: netstat -ano | findstr :8080",
        "expectedOutput": "Você deve conseguir diferenciar escuta local de escuta em todas as interfaces.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas, sockets e multiplexação” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Testar porta",
        "instruction": "Teste conectividade de transporte para uma porta.",
        "command": "Windows: Test-NetConnection 127.0.0.1 -Port 8080\nLinux: nc -vz 127.0.0.1 8080",
        "expectedOutput": "O teste deve indicar porta aberta quando o serviço está escutando.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas, sockets e multiplexação” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Capturar evidência mínima",
        "instruction": "Capture apenas tráfego do seu próprio laboratório.",
        "command": "Linux: sudo tcpdump -n -i lo port 8080\nWireshark: filtro tcp.port == 8080",
        "expectedOutput": "Você deve ver conexões destinadas à porta 8080 e portas efêmeras de origem.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas, sockets e multiplexação” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Documentar matriz de fluxo",
        "instruction": "Registre origem, destino, protocolo, porta, processo, dono e justificativa.",
        "expectedOutput": "Matriz de fluxo preenchida com evidência de listener e teste de porta.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas, sockets e multiplexação” em evidência prática ou raciocínio verificável.",
        "artifact": "Tabela: origem | porta origem | destino | porta destino | protocolo | processo | justificativa | risco | evidência",
        "analysisTask": "Preencha a matriz de fluxo e indique se a porta deve permanecer exposta, ser restrita ou ser removida."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Portas, sockets e multiplexação”.",
    "validation": [
      {
        "check": "Explicar a diferença entre porta local e porta remota.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Explicar a diferença entre porta local e porta remota.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Identificar pelo menos um socket em LISTEN.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Identificar pelo menos um socket em LISTEN.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Identificar uma conexão com porta efêmera.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Identificar uma conexão com porta efêmera.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Mostrar evidência de teste de porta bem-sucedido.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Mostrar evidência de teste de porta bem-sucedido.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Documentar a 5-tuple de um fluxo.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Documentar a 5-tuple de um fluxo.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se a porta não aparece em LISTEN, o serviço não iniciou ou escuta em outra porta.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se funciona em 127.0.0.1 mas não remotamente, verifique bind, firewall e rota.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se Test-NetConnection falha mas o serviço está local, verifique firewall local ou IP de bind.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se tcpdump não mostra tráfego, confirme interface, filtro e destino.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se porta aparece aberta mas aplicação falha, teste protocolo de aplicação com curl ou cliente específico.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Criar checklist de portas aprovadas por ambiente.",
      "Adicionar logs de firewall/local para todos os testes.",
      "Testar com container e mapeamento de portas.",
      "Criar NetworkPolicy ou regra de security group equivalente.",
      "Automatizar verificação de portas expostas em pipeline."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Portas, sockets e multiplexação” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "API em 8443 não responde externamente",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "expectedOutcome": "Ao final, o aluno entende como observar portas, sockets, conexões e processos, separando falha de serviço, firewall e aplicação."
  },
  "mentorQuestions": [
    "Se um serviço escuta em 127.0.0.1:8080, por que outro computador não consegue acessá-lo?",
    "Por que uma conexão HTTPS normalmente mostra porta remota 443 e porta local alta?",
    "Que campos precisam existir em uma regra de firewall para ela ser auditável?"
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Qual é a principal função de uma porta TCP/UDP?",
      "options": [
        "Definir o gateway da rede",
        "Identificar serviço ou conversa no host",
        "Converter nome em IP",
        "Criar endereço MAC"
      ],
      "answer": "Identificar serviço ou conversa no host",
      "explanation": "A porta permite que o sistema entregue dados ao processo ou fluxo correto."
    },
    {
      "id": "q2",
      "question": "O que melhor descreve uma 5-tuple?",
      "options": [
        "MAC origem, MAC destino, VLAN, switch e porta física",
        "Protocolo, IP origem, porta origem, IP destino e porta destino",
        "DNS, DHCP, NTP, SNMP e syslog",
        "Rede, broadcast, gateway, DNS e máscara"
      ],
      "answer": "Protocolo, IP origem, porta origem, IP destino e porta destino",
      "explanation": "Essa combinação identifica um fluxo de transporte."
    },
    {
      "id": "q3",
      "question": "Uma porta efêmera normalmente é usada por quem?",
      "options": [
        "Cliente ao iniciar conexão",
        "Servidor DNS autoritativo apenas",
        "Switch L2",
        "Registro MX"
      ],
      "answer": "Cliente ao iniciar conexão",
      "explanation": "O cliente escolhe uma porta temporária para diferenciar conversas."
    },
    {
      "id": "q4",
      "question": "O que significa um serviço escutar em 0.0.0.0:8080?",
      "options": [
        "Escuta apenas no loopback",
        "Escuta em todas as interfaces IPv4 disponíveis",
        "Está bloqueado por DNS",
        "Usa UDP obrigatoriamente"
      ],
      "answer": "Escuta em todas as interfaces IPv4 disponíveis",
      "explanation": "0.0.0.0 como bind significa aceitar conexões destinadas a qualquer IP local, se firewall permitir."
    },
    {
      "id": "q5",
      "question": "Por que logs de firewall devem registrar porta de origem?",
      "options": [
        "Para substituir DNS",
        "Para correlacionar fluxos, NAT e retorno de conexão",
        "Para calcular máscara de rede",
        "Para criar VLAN automaticamente"
      ],
      "answer": "Para correlacionar fluxos, NAT e retorno de conexão",
      "explanation": "A porta de origem é parte importante da identificação do fluxo e da tradução NAT."
    },
    {
      "id": "q6",
      "question": "Qual é um erro comum de segurança relacionado a portas?",
      "options": [
        "Usar TLS em 443",
        "Expor porta administrativa para 0.0.0.0/0",
        "Documentar dono do serviço",
        "Bloquear portas desnecessárias"
      ],
      "answer": "Expor porta administrativa para 0.0.0.0/0",
      "explanation": "Portas administrativas amplamente expostas aumentam muito a superfície de ataque."
    }
  ],
  "flashcards": [
    {
      "front": "O que é uma porta?",
      "back": "Um número de 16 bits usado por TCP/UDP para identificar serviço ou conversa."
    },
    {
      "front": "O que é socket?",
      "back": "Um ponto final de comunicação mantido pelo sistema operacional, associado a IP, porta e protocolo."
    },
    {
      "front": "O que é porta efêmera?",
      "back": "Porta temporária escolhida pelo cliente para iniciar uma conversa."
    },
    {
      "front": "O que é 5-tuple?",
      "back": "Protocolo, IP de origem, porta de origem, IP de destino e porta de destino."
    },
    {
      "front": "Qual risco de escutar em 0.0.0.0?",
      "back": "O serviço pode aceitar conexões em todas as interfaces se firewall e rota permitirem."
    },
    {
      "front": "Por que porta aberta não prova aplicação saudável?",
      "back": "A porta pode aceitar conexão, mas TLS, autenticação, protocolo ou lógica da aplicação ainda podem falhar."
    }
  ],
  "exercises": [
    {
      "id": "e1",
      "prompt": "Explique a diferença entre IP de destino e porta de destino usando um exemplo com HTTPS.",
      "expectedAnswer": "O IP leva até o host; a porta 443/TCP identifica o serviço HTTPS dentro do host."
    },
    {
      "id": "e2",
      "prompt": "Dado o fluxo TCP 10.1.1.10:52000 → 10.2.2.20:443, identifique porta efêmera e porta de serviço.",
      "expectedAnswer": "52000 é a porta efêmera do cliente; 443 é a porta de serviço do servidor."
    },
    {
      "id": "e3",
      "prompt": "Liste três evidências para investigar uma aplicação que não responde na porta 8080.",
      "expectedAnswer": "Processo escutando, bind correto, firewall local/rede, rota, NAT/load balancer e teste de aplicação."
    },
    {
      "id": "e4",
      "prompt": "Monte uma regra de firewall auditável para permitir usuários acessarem uma API interna.",
      "expectedAnswer": "Origem: VLAN usuários; destino: API interna; protocolo: TCP; porta: 443; dono; justificativa; logs; validade."
    }
  ],
  "challenge": {
    "title": "API em 8443 não responde externamente",
    "scenario": "Uma API deveria responder em https://api.lab.local:8443. No servidor, o time diz que a aplicação está rodando. Usuários externos não conseguem acessar.",
    "tasks": [
      "Verificar se DNS resolve para o IP esperado.",
      "Verificar se o servidor escuta em 8443 e em qual IP de bind.",
      "Testar a porta localmente e de uma máquina remota autorizada.",
      "Verificar firewall local e firewall de rede/cloud.",
      "Verificar load balancer, NAT ou proxy se existirem.",
      "Documentar 5-tuple esperada e evidências."
    ],
    "successCriteria": [
      "Separar falha de DNS, rota, porta, firewall e aplicação.",
      "Identificar se o serviço escuta em 127.0.0.1, IP específico ou 0.0.0.0.",
      "Propor correção mínima sem abrir acesso amplo.",
      "Registrar evidências sanitizadas."
    ],
    "rubric": [
      "40% método de diagnóstico",
      "25% interpretação de portas/sockets",
      "20% segurança e mínimo privilégio",
      "15% clareza da documentação"
    ]
  },
  "commentedSolution": {
    "summary": "A investigação começa no servidor e avança para fora. Primeiro confirme processo e socket. Depois confirme firewall local, rota, política de rede, NAT/load balancer e resposta HTTP/TLS.",
    "steps": [
      "Executar ss -tulpen ou netstat -ano para confirmar se 8443 está em LISTEN.",
      "Confirmar se o bind é 127.0.0.1, IP privado específico ou 0.0.0.0.",
      "Testar localmente com curl -vk https://127.0.0.1:8443 e com IP do servidor.",
      "Testar remotamente com Test-NetConnection ou nc -vz a partir de origem autorizada.",
      "Conferir firewall local, security group/NSG/NACL e listener de load balancer.",
      "Aplicar correção mínima: ajustar bind ou regra específica, nunca abrir 0.0.0.0/0 sem justificativa."
    ],
    "keyInsight": "Porta escutando localmente não garante acesso remoto. Bind, rota, firewall, NAT e política precisam concordar."
  },
  "glossary": [
    {
      "term": "Porta",
      "definition": "Identificador numérico usado por TCP/UDP para indicar serviço ou conversa."
    },
    {
      "term": "Socket",
      "definition": "Ponto final de comunicação usado pelo sistema operacional."
    },
    {
      "term": "Porta efêmera",
      "definition": "Porta temporária escolhida pelo cliente para iniciar uma conexão ou fluxo."
    },
    {
      "term": "5-tuple",
      "definition": "Protocolo, IP de origem, porta de origem, IP de destino e porta de destino."
    },
    {
      "term": "LISTEN",
      "definition": "Estado em que um serviço aguarda conexões em uma porta TCP."
    },
    {
      "term": "Bind",
      "definition": "Associação de um processo a um IP/protocolo/porta local."
    }
  ],
  "references": [
    {
      "title": "Curso Redes e Network v2.0 — Módulo 6",
      "type": "internal"
    },
    {
      "title": "RFC 793 — Transmission Control Protocol",
      "type": "standard"
    },
    {
      "title": "RFC 768 — User Datagram Protocol",
      "type": "standard"
    },
    {
      "title": "IANA Service Name and Transport Protocol Port Number Registry",
      "type": "registry"
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Containers e Kubernetes",
      "reason": "Mapeamento de portas, Services e Ingress dependem de sockets e transporte."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Autenticação e serviços corporativos",
      "reason": "Serviços de identidade usam portas específicas e dependem de conectividade segura."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "Ler todas as seções",
      "Concluir laboratório lab-6.2",
      "Acertar pelo menos 70% do quiz",
      "Entregar matriz de fluxo do desafio"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "6.3"
    ],
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "labMarkedDone",
        "practicalExerciseDone"
      ]
    }
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
