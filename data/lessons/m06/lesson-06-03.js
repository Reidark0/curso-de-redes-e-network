export const lesson0603 = {
  "id": "6.3",
  "moduleId": "m06",
  "order": 3,
  "title": "TCP: handshake, estado e encerramento",
  "subtitle": "Entenda como uma conexão TCP nasce, é acompanhada por estados, transporta dados e é encerrada, e por que isso é essencial para troubleshooting, firewall stateful, NAT, balanceadores e segurança defensiva.",
  "duration": "115-170 min",
  "estimatedStudyTimeMinutes": 170,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 265,
  "tags": [
    "redes",
    "camada de transporte",
    "tcp",
    "handshake",
    "flags",
    "estado",
    "firewall stateful",
    "nat",
    "troubleshooting",
    "segurança",
    "p0-04",
    "fundamento-crítico",
    "evidência"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.1",
      "title": "Por que a camada de transporte existe",
      "reason": "TCP é um dos protocolos centrais da camada de transporte apresentada na aula anterior."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "TCP usa portas, sockets e 5-tuple para identificar conexões."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "title": "Gateway padrão e rota local",
      "reason": "O handshake TCP depende de caminho IP funcional entre origem e destino."
    }
  ],
  "objectives": [
    "Explicar por que o TCP é orientado a conexão.",
    "Descrever o three-way handshake: SYN, SYN-ACK e ACK.",
    "Interpretar flags TCP como SYN, ACK, FIN, RST e PSH em troubleshooting.",
    "Relacionar estados TCP com socket, processo, firewall stateful, NAT e load balancer.",
    "Explicar encerramento normal com FIN e encerramento abrupto com RST.",
    "Investigar sintomas como timeout, connection refused, reset e conexão presa em estados intermediários."
  ],
  "learningOutcomes": [
    "Ler uma captura simples de TCP e identificar abertura, troca de dados e encerramento.",
    "Diferenciar conexão recusada, filtrada, expirada e resetada.",
    "Usar ss, netstat, tcpdump, Wireshark, Test-NetConnection e logs de firewall para investigar TCP.",
    "Explicar por que firewalls stateful precisam observar o início da conexão.",
    "Documentar um fluxo TCP com origem, destino, portas, flags, estado, política e evidências.",
    "Interpretar SYN, SYN-ACK, ACK, FIN, RST, TIME_WAIT e CLOSE_WAIT como pistas de diagnóstico.",
    "Diferenciar porta fechada, descarte por firewall, rota de retorno quebrada e aplicação aceitando conexão mas falhando depois.",
    "Explicar por que TIME_WAIT e retransmissões são mecanismos normais, mas podem indicar pressão operacional quando excessivos."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Quando você acessa um site HTTPS, abre uma sessão SSH, conecta em um banco de dados ou chama uma API, geralmente existe TCP por trás. O IP leva pacotes até o host. A porta leva até o processo. Mas ainda falta uma pergunta crítica: <strong>como os dois lados combinam que existe uma conversa confiável em andamento?</strong></p>\n  <p>Essa conversa não aparece apenas para cliente e servidor. Firewalls, NATs, load balancers, proxies, IDS/IPS, sistemas operacionais e ferramentas de observabilidade também acompanham o estado do TCP. Por isso, entender TCP é essencial para Segurança, Infraestrutura, Cloud e DevSecOps.</p>\n  <div class='callout'><strong>Ideia central:</strong> TCP cria uma conexão lógica entre dois sockets usando handshake, mantém estado enquanto a conversa existe e encerra com sinais explícitos ou abruptos.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>O TCP surgiu para resolver um problema da comunicação em redes com múltiplos caminhos, perdas, atrasos e equipamentos intermediários: aplicações precisavam de uma forma confiável de enviar dados sem implementar tudo do zero.</p>\n  <p>Antes de protocolos confiáveis de transporte, cada aplicação teria que lidar com perda, ordenação, duplicidade, controle de fluxo e encerramento. O TCP concentrou essas responsabilidades na camada de transporte e virou a base de serviços como HTTP/HTTPS, SSH, SMTP, IMAP, bancos de dados, APIs corporativas e muitos protocolos administrativos.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Enviar um único pacote não prova que o outro lado está pronto para conversar. Um servidor pode estar fora do ar, a porta pode estar fechada, um firewall pode bloquear o caminho, uma rota de retorno pode faltar ou um load balancer pode encaminhar para um backend indisponível.</p>\n  <p>Além disso, aplicações precisam saber onde uma conversa começa e termina. Sem estado, o servidor não saberia se um pacote pertence a uma conexão válida, a uma tentativa nova, a uma sessão antiga ou a tráfego malformado.</p>\n  <div class='callout callout--problem'><strong>Problema operacional:</strong> a rede precisa distinguir tentativa de conexão, conexão estabelecida, tráfego de dados, encerramento normal, falha abrupta e tráfego fora de estado.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>O TCP evoluiu de uma necessidade básica de transporte confiável para um mecanismo central de controle em redes modernas. Firewalls stateful passaram a permitir retorno apenas quando observaram uma conexão legítima começar. NATs passaram a guardar traduções por fluxo. Load balancers passaram a medir sessões, health checks e timeouts. Observabilidade passou a interpretar latência de handshake, resets, retransmissões e estados.</p>\n  <p>Com cloud e microsserviços, o TCP também ganhou novas camadas: cliente, service mesh, proxy local, Ingress, load balancer, firewall, NAT, backend e sidecar podem participar do caminho. O handshake continua simples no conceito, mas a investigação exige método.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>TCP</strong> é um protocolo de transporte orientado a conexão. Antes de enviar dados de aplicação, cliente e servidor estabelecem uma conexão lógica usando o <strong>three-way handshake</strong>: SYN, SYN-ACK e ACK.</p>\n  <p>Depois do handshake, a conexão passa a ser identificada pela 5-tuple: protocolo, IP de origem, porta de origem, IP de destino e porta de destino. Cada lado mantém estado sobre a conexão, incluindo números de sequência, confirmações, janelas e flags.</p>\n  <div class='definition-box'>O handshake TCP não cria um “cabo virtual” físico. Ele cria estado lógico nos sistemas e nos equipamentos stateful ao longo do caminho.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>O início clássico de uma conexão TCP tem três etapas. Primeiro, o cliente envia um segmento com flag <code>SYN</code>, indicando desejo de iniciar conexão e informando seu número inicial de sequência. O servidor responde com <code>SYN-ACK</code>, aceitando o início e enviando seu próprio número inicial de sequência. Por fim, o cliente envia <code>ACK</code>, confirmando a resposta do servidor.</p>\n  <ol class='flow-list'>\n    <li>Servidor está em <code>LISTEN</code> em uma porta, como <code>443/TCP</code>.</li>\n    <li>Cliente escolhe uma porta efêmera e envia <code>SYN</code>.</li>\n    <li>Firewall/NAT registra tentativa de conexão, se permitir a política.</li>\n    <li>Servidor recebe o <code>SYN</code> e responde <code>SYN-ACK</code>.</li>\n    <li>Cliente recebe o <code>SYN-ACK</code> e envia <code>ACK</code>.</li>\n    <li>Ambos entram em estado <code>ESTABLISHED</code>.</li>\n    <li>Dados de aplicação começam a trafegar.</li>\n    <li>Ao final, uma das partes encerra com <code>FIN</code> ou aborta com <code>RST</code>.</li>\n  </ol>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04-6-3-state-machine'>\n  <h4>Máquina de estados TCP como ferramenta de troubleshooting</h4>\n  <p>O handshake TCP não é apenas uma formalidade. Ele cria uma base comum para a conversa: cliente e servidor confirmam que conseguem enviar e receber, escolhem números de sequência e passam a controlar confirmação, retransmissão e encerramento. Quando algo falha, o estado observado costuma revelar onde investigar.</p>\n  <table class='data-table'><thead><tr><th>Estado/sinal</th><th>Interpretação prática</th><th>Hipótese de falha</th><th>Evidência</th></tr></thead><tbody>\n    <tr><td>SYN sem resposta</td><td>Cliente tenta iniciar, mas não recebe retorno</td><td>Firewall drop, rota de retorno, destino indisponível</td><td><code>tcpdump</code> mostra SYN repetido</td></tr>\n    <tr><td>RST imediato</td><td>Destino respondeu rejeitando</td><td>Porta fechada, serviço rejeitando, política com reset</td><td><code>nc</code> retorna refused ou captura mostra RST</td></tr>\n    <tr><td>ESTABLISHED</td><td>Conexão foi aceita</td><td>Se aplicação falha, investigar TLS/HTTP/app</td><td><code>ss</code>, <code>netstat</code>, logs do serviço</td></tr>\n    <tr><td>TIME_WAIT</td><td>Estado normal após encerramento ativo</td><td>Excesso pode indicar churn de conexões</td><td><code>ss -tan state time-wait</code></td></tr>\n    <tr><td>CLOSE_WAIT</td><td>Remoto fechou, aplicação local ainda não encerrou</td><td>Bug ou lentidão na aplicação</td><td>Vários CLOSE_WAIT no mesmo processo</td></tr>\n  </tbody></table>\n</div>",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura corporativa, TCP não é visto apenas pelo cliente e pelo servidor. O fluxo pode atravessar firewall local, EDR, proxy, roteador, firewall de borda, NAT, balanceador, WAF, service mesh e backend. Cada elemento pode permitir, negar, encerrar, reescrever ou registrar o fluxo.</p>\n  <table class='data-table'>\n    <thead><tr><th>Elemento</th><th>O que observa</th><th>Sintoma comum</th><th>Evidência útil</th></tr></thead>\n    <tbody>\n      <tr><td>Cliente</td><td>Socket, porta efêmera, SYN enviado</td><td>Timeout ou refused</td><td><code>ss</code>, <code>netstat</code>, <code>Test-NetConnection</code></td></tr>\n      <tr><td>Firewall stateful</td><td>Início, estado e retorno do fluxo</td><td>Bloqueio sem resposta ou reset</td><td>Log com ação, regra e 5-tuple</td></tr>\n      <tr><td>NAT</td><td>Tradução de IP/porta</td><td>Retorno quebrado</td><td>Tabela de tradução e flow logs</td></tr>\n      <tr><td>Load balancer</td><td>Listener, health check e backend</td><td>Porta aberta mas aplicação indisponível</td><td>Status de targets e logs</td></tr>\n      <tr><td>Servidor</td><td>Porta em LISTEN e processo dono</td><td>Connection refused ou reset</td><td>PID, logs da aplicação e captura</td></tr>\n    </tbody>\n  </table>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04-6-3-timeouts'>\n  <h4>Timeouts, retransmissão e custo operacional</h4>\n  <p>Timeouts de TCP, load balancer, proxy, firewall e aplicação precisam ser coerentes. Um firewall pode remover estado antes da aplicação terminar; um load balancer pode encerrar conexões ociosas; um cliente pode tentar novamente e multiplicar carga. Em incidentes, isso aparece como erro intermitente, latência alta, retransmissão, filas e aumento de custo de logs.</p>\n  <ul>\n    <li><strong>Operacional:</strong> padronize timeouts, documente caminhos e monitore retransmissões, resets e conexões em estados anormais.</li>\n    <li><strong>Financeiro:</strong> retries e conexões mal encerradas aumentam tráfego, uso de balanceador, logs e consumo de backend.</li>\n    <li><strong>Segurança:</strong> excesso de SYN, RST ou half-open pode indicar varredura, DoS, regra quebrada ou abuso de serviço.</li>\n  </ul>\n</div>",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine uma ligação telefônica corporativa. Antes de conversar, você disca, o outro lado toca, alguém atende e vocês confirmam que a conversa começou. Durante a ligação, ambos sabem que aquela conversa está ativa. Ao final, alguém desliga de forma educada; em uma falha, a ligação simplesmente cai.</p>\n  <p>O TCP é parecido: SYN é como discar, SYN-ACK é como atender e confirmar, ACK é como dizer “podemos falar”. FIN é encerrar educadamente. RST é como derrubar a ligação imediatamente. A diferença é que, em redes, firewalls, NATs e balanceadores também precisam acompanhar esse estado.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Um cliente <code>192.168.1.50</code> acessa um servidor web <code>10.20.5.10:443</code>. O cliente escolhe a porta efêmera <code>51544</code> e envia <code>SYN</code>. O servidor, que está escutando em <code>443/TCP</code>, responde <code>SYN-ACK</code>. O cliente responde <code>ACK</code>. A partir daí, a sessão fica estabelecida.</p>\n  <p>Em ferramentas, você pode ver algo como <code>192.168.1.50:51544 → 10.20.5.10:443 ESTABLISHED</code>.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, um usuário acessa um sistema interno via HTTPS. O tráfego passa por VLAN de usuários, firewall interno, balanceador e servidores de aplicação. O firewall só permite retorno porque viu o SYN inicial permitido pela regra. Se o servidor responder por caminho diferente, pode ocorrer assimetria: o firewall de ida viu o início, mas o firewall de retorno não viu estado e bloqueia a resposta.</p>\n  <p>Esse é um motivo clássico para problemas intermitentes em ambientes com múltiplos firewalls, SD-WAN, links redundantes e rotas assimétricas.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, um cliente acessa um Application Load Balancer em <code>443/TCP</code>. O load balancer termina ou encaminha a conexão para backends em <code>8080/TCP</code>. Security groups, NACLs, route tables e health checks influenciam o fluxo.</p>\n  <p>Um erro comum é abrir o listener externo em 443, mas configurar target group em porta errada, backend sem serviço em LISTEN, health check incompatível ou security group permitindo entrada no balanceador e bloqueando do balanceador para o backend.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em pipelines, testes de conectividade frequentemente validam apenas DNS ou ping, mas a aplicação real depende de TCP na porta correta. Um deploy pode passar no build e falhar em produção porque o container escuta em <code>127.0.0.1</code>, porque o Service Kubernetes aponta para targetPort errado, ou porque o readiness probe testa um endpoint que ainda não aceita conexão.</p>\n  <p>Uma boa prática é automatizar testes explícitos de porta, TLS, resposta HTTP e caminho de rede, além de validar regras de firewall como código.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Do ponto de vista defensivo, flags e estados TCP ajudam a diferenciar tráfego legítimo, varredura, tentativa bloqueada, serviço fechado e reset de aplicação. Um SYN sem resposta pode indicar filtro silencioso, rota quebrada ou host indisponível. Um RST imediato pode indicar porta fechada, rejeição ativa ou política que responde com reset.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> nunca conclua que “a rede caiu” olhando apenas um sintoma. Combine captura, teste de porta, logs de firewall, rota, estado do serviço e logs da aplicação.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m06l03-title m06l03-desc'>\n    <title id='m06l03-title'>Handshake TCP, estado e encerramento</title>\n    <desc id='m06l03-desc'>Diagrama mostrando cliente, firewall stateful e servidor durante SYN, SYN-ACK, ACK, dados, FIN e RST.</desc>\n    <defs><marker id='m06l03-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path></marker></defs>\n    <rect x='55' y='70' width='210' height='360' rx='18' class='svg-node svg-node--client'></rect>\n    <text x='160' y='115' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='160' y='145' text-anchor='middle' class='svg-label svg-label--small'>192.168.1.50:51544</text>\n    <rect x='385' y='70' width='210' height='360' rx='18' class='svg-node svg-node--firewall'></rect>\n    <text x='490' y='115' text-anchor='middle' class='svg-label'>Firewall stateful</text>\n    <text x='490' y='145' text-anchor='middle' class='svg-label svg-label--small'>política + estado</text>\n    <rect x='715' y='70' width='210' height='360' rx='18' class='svg-node svg-node--server'></rect>\n    <text x='820' y='115' text-anchor='middle' class='svg-label'>Servidor</text>\n    <text x='820' y='145' text-anchor='middle' class='svg-label svg-label--small'>10.20.5.10:443</text>\n    <line x1='265' y1='190' x2='385' y2='190' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l03-arrow)'></line>\n    <line x1='595' y1='190' x2='715' y2='190' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l03-arrow)'></line>\n    <text x='490' y='182' text-anchor='middle' class='svg-label svg-label--small'>1. SYN</text>\n    <line x1='715' y1='245' x2='595' y2='245' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m06l03-arrow)'></line>\n    <line x1='385' y1='245' x2='265' y2='245' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m06l03-arrow)'></line>\n    <text x='490' y='237' text-anchor='middle' class='svg-label svg-label--small'>2. SYN-ACK</text>\n    <line x1='265' y1='300' x2='385' y2='300' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l03-arrow)'></line>\n    <line x1='595' y1='300' x2='715' y2='300' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l03-arrow)'></line>\n    <text x='490' y='292' text-anchor='middle' class='svg-label svg-label--small'>3. ACK → ESTABLISHED</text>\n    <line x1='265' y1='355' x2='715' y2='355' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l03-arrow)'></line>\n    <text x='490' y='345' text-anchor='middle' class='svg-label svg-label--small'>dados de aplicação</text>\n    <rect x='75' y='455' width='830' height='75' rx='16' class='svg-zone'></rect>\n    <text x='490' y='488' text-anchor='middle' class='svg-label'>Encerramento</text>\n    <text x='490' y='515' text-anchor='middle' class='svg-label svg-label--small'>FIN encerra de forma ordenada; RST aborta imediatamente; TIME_WAIT evita reutilização insegura do mesmo fluxo</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai observar o handshake TCP, estados de conexão, conexão recusada, timeout e encerramento usando ferramentas seguras de diagnóstico. O objetivo é interpretar evidências, não fazer varredura ofensiva.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam leitura de flags, interpretação de estados, diferenciação de sintomas e construção de uma linha de investigação TCP.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá evidências de uma aplicação inacessível. Sua missão é decidir se o problema é serviço fechado, firewall filtrando, rota de retorno, reset de aplicação, health check errado ou timeout de balanceador.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostra como cruzar teste de porta, captura, estados do sistema operacional, logs de firewall e logs de aplicação sem depender de uma única ferramenta.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>TCP usa handshake para criar estado antes de transportar dados. Esse estado é observado por sistemas operacionais, firewalls, NATs, balanceadores e ferramentas de monitoramento. Entender SYN, SYN-ACK, ACK, FIN, RST e estados como LISTEN, SYN-SENT, ESTABLISHED e TIME-WAIT é essencial para diagnosticar aplicações corporativas.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você aprofundará confiabilidade TCP: números de sequência, ACKs, janela, retransmissão, controle de fluxo e congestionamento.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 4",
      "Camada 3",
      "Camada 7"
    ],
    "beforeThisLesson": "O aluno entende portas, sockets e multiplexação.",
    "afterThisLesson": "O aluno entende como conexões TCP são abertas, mantidas, encerradas e diagnosticadas.",
    "dependsOn": [
      "IPv4",
      "Roteamento",
      "DNS",
      "Portas",
      "Sockets",
      "Firewall stateful",
      "NAT"
    ]
  },
  "protocolFields": [
    {
      "field": "Source Port",
      "meaning": "Porta de origem do cliente ou remetente do segmento.",
      "securityNote": "Portas efêmeras ajudam a correlacionar sessões em NAT, firewall e logs."
    },
    {
      "field": "Destination Port",
      "meaning": "Porta do serviço de destino.",
      "securityNote": "Portas sensíveis precisam de exposição mínima e dono identificado."
    },
    {
      "field": "Sequence Number",
      "meaning": "Número usado para ordenar bytes no fluxo TCP.",
      "securityNote": "Sequência previsível historicamente favorecia ataques; pilhas modernas randomizam valores iniciais."
    },
    {
      "field": "Acknowledgment Number",
      "meaning": "Confirma o próximo byte esperado pelo receptor.",
      "securityNote": "ACKs fora de contexto podem indicar tráfego fora de estado, captura parcial ou manipulação."
    },
    {
      "field": "Flags",
      "meaning": "Bits como SYN, ACK, FIN, RST, PSH e URG que indicam intenção do segmento.",
      "securityNote": "Combinações de flags ajudam IDS/IPS e firewalls a detectar anomalias."
    },
    {
      "field": "Window Size",
      "meaning": "Quantidade de dados que o receptor aceita antes de novos ACKs.",
      "securityNote": "Janela zero ou reduzida pode indicar saturação, travamento ou defesa contra carga."
    },
    {
      "field": "Options",
      "meaning": "Extensões como MSS, Window Scale, SACK e timestamps.",
      "securityNote": "Opções podem influenciar performance, fingerprinting e diagnóstico."
    }
  ],
  "packetFlow": [
    "Servidor fica em LISTEN em IP, porta e protocolo.",
    "Cliente escolhe porta efêmera e envia SYN.",
    "Firewalls e NATs avaliam política e criam estado se permitido.",
    "Servidor responde SYN-ACK se a porta estiver aberta e a conexão for aceita.",
    "Cliente envia ACK finalizando o handshake.",
    "Fluxo passa para ESTABLISHED e dados de aplicação trafegam.",
    "Encerramento normal ocorre com troca de FIN e ACK.",
    "Encerramento abrupto ocorre com RST ou timeout quando não há resposta esperada."
  ],
  "deepDive": {
    "title": "Estado TCP e equipamentos intermediários",
    "points": [
      "Firewalls stateful normalmente esperam ver o SYN inicial para permitir retorno.",
      "NAT guarda traduções por fluxo e remove entradas por timeout ou encerramento.",
      "Load balancers podem ter timeout diferente do servidor e encerrar conexões ociosas.",
      "RST não significa sempre ataque; pode ser porta fechada, aplicação recusando ou política ativa.",
      "Timeout não significa sempre firewall; pode ser rota, caminho de retorno, host indisponível ou perda silenciosa."
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
    "Achar que ping funcionando prova que TCP/443 está funcionando.",
    "Confundir connection refused com firewall bloqueando silenciosamente.",
    "Ignorar rota de retorno em problemas de handshake incompleto.",
    "Ver SYN-SENT no cliente e concluir que o servidor está com problema sem olhar firewall e rota.",
    "Abrir porta no security group mas esquecer NACL, firewall local ou target group.",
    "Não registrar porta de origem nas evidências, dificultando correlação com NAT e firewall."
  ],
  "troubleshooting": {
    "method": "Separar sintoma TCP em escuta local, política, rota, retorno, estado e aplicação. Validar handshake com teste de porta, captura controlada e logs.",
    "windows": [
      "Test-NetConnection <host> -Port <porta>",
      "netstat -ano",
      "Get-NetTCPConnection",
      "Get-Process -Id <PID>",
      "pktmon",
      "Wireshark"
    ],
    "linux": [
      "ss -tanp",
      "ss -tulpen",
      "nc -vz <host> <porta>",
      "curl -vk https://<host>",
      "sudo tcpdump -n -i any tcp and host <ip>",
      "traceroute -T -p <porta> <host>"
    ],
    "cisco": [
      "show access-lists",
      "show ip route",
      "show logging",
      "show conn",
      "show policy-map",
      "packet-tracer input"
    ],
    "cloud": [
      "Verificar security group/NSG",
      "Verificar NACL/firewall",
      "Conferir listener e target group",
      "Conferir health checks",
      "Consultar flow logs e logs de load balancer"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a TCP: handshake, estado e encerramento.",
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
        "command": "Test-NetConnection <host> -Port <porta>; netstat -ano | findstr <porta>",
        "purpose": "Testar handshake e observar conexões/estado local.",
        "expectedObservation": "TcpTestSucceeded true/false e conexões associadas à porta.",
        "interpretation": "Falha de porta direciona investigação para listener, firewall ou rota de retorno."
      },
      {
        "platform": "PowerShell",
        "command": "Get-NetTCPConnection | Where-Object {$_.RemotePort -eq 443 -or $_.LocalPort -eq 443}",
        "purpose": "Filtrar conexões TCP por porta.",
        "expectedObservation": "Estados Listen, Established, TimeWait ou CloseWait.",
        "interpretation": "Estado ajuda a separar conexão normal de encerramento ou vazamento."
      },
      {
        "platform": "Linux",
        "command": "ss -tanp; ss -tan state syn-sent; ss -tan state time-wait",
        "purpose": "Ver estados TCP no Linux.",
        "expectedObservation": "Distribuição de estados por conexão.",
        "interpretation": "Muitos SYN-SENT sugerem timeout; muitos CLOSE-WAIT sugerem aplicação não fechando."
      },
      {
        "platform": "Linux",
        "command": "sudo tcpdump -n -i any tcp and host <ip>",
        "purpose": "Capturar SYN, SYN-ACK, ACK, FIN e RST.",
        "expectedObservation": "Pacotes do handshake e encerramento aparecem na captura.",
        "interpretation": "Captura confirma se o problema é ida, retorno, rejeição ou aplicação."
      },
      {
        "platform": "Linux",
        "command": "traceroute -T -p <porta> <host>; nc -vz <host> <porta>; curl -vk https://<host>",
        "purpose": "Testar caminho TCP, porta e camada de aplicação.",
        "expectedObservation": "Resultado por salto/porta e resposta TLS/HTTP.",
        "interpretation": "Se TCP funciona e TLS falha, não culpe rota ou firewall primeiro."
      },
      {
        "platform": "Firewall/Cloud",
        "command": "Consultar logs de allow/deny/reset, conn table, health checks e flow logs",
        "purpose": "Correlacionar estado de firewall com teste do cliente.",
        "expectedObservation": "Log do fluxo e ação aplicada no mesmo horário.",
        "interpretation": "Sem correlação temporal, a análise vira chute."
      }
    ],
    "decisionTree": [
      {
        "if": "SYN sai e não volta nada",
        "then": "Investigar drop, rota de retorno, NACL stateless, SG/NSG, firewall ou destino indisponível."
      },
      {
        "if": "RST volta imediatamente",
        "then": "Investigar listener ausente, serviço recusando, porta errada ou regra que rejeita com reset."
      },
      {
        "if": "Handshake completa, mas HTTP/TLS falha",
        "then": "Avançar para certificado, SNI, proxy, header, rota de aplicação ou backend."
      },
      {
        "if": "Muitos CLOSE_WAIT",
        "then": "Investigar aplicação local que não fecha sockets adequadamente."
      },
      {
        "if": "Muitos TIME_WAIT",
        "then": "Avaliar churn de conexões, keep-alive, pooling e padrões de client retry."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Expor apenas portas necessárias e com dono definido.",
      "Registrar 5-tuple, ação e timestamp nos logs de firewall.",
      "Usar firewalls stateful com políticas explícitas e revisadas.",
      "Correlacionar RST, timeout e SYN sem resposta antes de concluir causa raiz.",
      "Monitorar mudanças de portas em LISTEN em servidores críticos.",
      "Definir timeouts consistentes em proxy, load balancer, firewall e aplicação."
    ],
    "badPractices": [
      "Permitir portas administrativas para 0.0.0.0/0.",
      "Desabilitar logs para reduzir ruído sem alternativa de observabilidade.",
      "Tratar todo timeout como problema de rede.",
      "Publicar serviço em 0.0.0.0 sem revisão de firewall.",
      "Ignorar tráfego de saída e egress control."
    ],
    "attacksAndDefenses": [
      {
        "risk": "Varredura de portas",
        "defense": "Reduzir superfície, registrar tentativas, correlacionar com SIEM e aplicar rate limit quando apropriado."
      },
      {
        "risk": "SYN flood",
        "defense": "SYN cookies, proteção anti-DDoS, rate limiting, filas ajustadas e proteção em borda."
      },
      {
        "risk": "Serviço exposto indevidamente",
        "defense": "Inventário, IaC, revisão por pull request, allowlist mínima e alertas de drift."
      },
      {
        "risk": "Bypass por caminho assimétrico",
        "defense": "Desenho de roteamento simétrico, logs de firewalls, validação de rota de retorno e segmentação."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em TCP: handshake, estado e encerramento",
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
    "id": "lab-6.3",
    "title": "Observando handshake, estados e encerramento TCP",
    "labType": "security",
    "objective": "Identificar abertura, estado estabelecido, encerramento normal e falhas comuns de conexão TCP usando ferramentas defensivas.",
    "scenario": "Laboratório Neste laboratório, você vai observar o handshake TCP, estados de conexão, conexão recusada, timeout e encerramento usando ferramentas seguras de diagnóstico. O objetivo é interpretar evidências, não fazer varredura ofensiva.",
    "topology": "Um cliente Windows ou Linux, um serviço TCP local ou de laboratório, firewall local opcional e captura controlada com Wireshark ou tcpdump.",
    "architecture": "O aluno observa o caminho cliente → política local/rede → servidor → resposta, correlacionando socket, flags e logs.",
    "prerequisites": [
      "Windows ou Linux",
      "Permissão administrativa para captura, se disponível",
      "Wireshark, tcpdump, ss, netstat ou PowerShell",
      "Serviço de laboratório controlado, como servidor HTTP local"
    ],
    "tools": [
      "Wireshark",
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 170,
    "cost": "zero",
    "safetyNotes": [
      "Não faça varredura em redes de terceiros.",
      "Use alvos próprios ou autorizados.",
      "Sanitize IPs públicos, nomes internos, portas administrativas e evidências sensíveis.",
      "Não derrube serviços de produção para simular falha."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Confirmar serviço em escuta",
        "instruction": "No servidor ou host de laboratório, confirme que há um processo escutando em uma porta TCP.",
        "command": "Linux: ss -tulpen\nWindows: netstat -ano\nWindows: Get-NetTCPConnection -State Listen",
        "expectedOutput": "A porta aparece como LISTEN com processo ou PID associado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: handshake, estado e encerramento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Testar conexão TCP",
        "instruction": "Do cliente, teste conexão com a porta do serviço.",
        "command": "Windows: Test-NetConnection <host> -Port <porta>\nLinux: nc -vz <host> <porta>\nLinux: curl -v http://<host>:<porta>",
        "expectedOutput": "O teste mostra sucesso, refused ou timeout.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: handshake, estado e encerramento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Capturar handshake",
        "instruction": "Capture o tráfego do teste e identifique SYN, SYN-ACK e ACK.",
        "command": "Linux: sudo tcpdump -n -i any tcp and host <ip>\nWireshark: filtro tcp && ip.addr == <ip>",
        "expectedOutput": "A sequência de três etapas aparece quando a conexão é bem-sucedida.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: handshake, estado e encerramento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Observar estado estabelecido",
        "instruction": "Durante a conexão, observe estados no cliente e no servidor.",
        "command": "Linux: ss -tanp | grep <porta>\nWindows: Get-NetTCPConnection | findstr <porta>",
        "expectedOutput": "Estados como ESTABLISHED aparecem para conexões ativas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: handshake, estado e encerramento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Diferenciar refused e timeout",
        "instruction": "Teste uma porta sem serviço e uma porta filtrada em ambiente controlado.",
        "command": "nc -vz <host> <porta-fechada>\nTest-NetConnection <host> -Port <porta-fechada>",
        "expectedOutput": "Porta fechada tende a responder rápido com refused/RST; filtro silencioso tende a gerar timeout.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: handshake, estado e encerramento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Registrar evidências",
        "instruction": "Monte uma tabela com sintoma, comando, evidência, interpretação e próxima ação.",
        "analysisTask": "Explique se a evidência indica conexão estabelecida, porta fechada, timeout, reset, encerramento normal ou falha de aplicação.",
        "expectedOutput": "Relatório de diagnóstico TCP com hipótese justificada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: handshake, estado e encerramento” em evidência prática ou raciocínio verificável.",
        "artifact": "Relatório curto contendo captura ou saída de comando, estado observado, hipótese e próxima validação."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “TCP: handshake, estado e encerramento”.",
    "validation": [
      {
        "check": "Identificar SYN, SYN-ACK e ACK em captura.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Identificar SYN, SYN-ACK e ACK em captura.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Distinguir ESTABLISHED, LISTEN, TIME-WAIT e SYN-SENT.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Distinguir ESTABLISHED, LISTEN, TIME-WAIT e SYN-SENT.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Diferenciar refused, reset e timeout.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Diferenciar refused, reset e timeout.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Correlacionar teste de porta com estado local e logs.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Correlacionar teste de porta com estado local e logs.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se não há SYN saindo, verifique DNS, rota local, firewall local ou comando errado.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se há SYN saindo e nada volta, verifique rota, firewall, NACL, security group e host remoto.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se volta RST, verifique serviço em LISTEN, porta correta e política de rejeição.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se handshake ocorre mas aplicação falha, investigue TLS, HTTP, autenticação, proxy e logs da aplicação.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar captura no cliente e no servidor.",
      "Comparar fluxo direto com fluxo via load balancer.",
      "Adicionar logs de firewall e flow logs.",
      "Criar runbook para incidentes TCP comuns."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “TCP: handshake, estado e encerramento” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Aplicação HTTPS inacessível",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "expectedOutcome": "O aluno consegue explicar o que ocorreu no fluxo TCP com base em flags, estados e logs, sem depender de achismo."
  },
  "mentorQuestions": [
    "Quando você vê SYN-SENT persistente no cliente, quais hipóteses são mais prováveis?",
    "Por que um firewall stateful pode bloquear o retorno se não viu o SYN inicial?",
    "Como você diferenciaria porta fechada, firewall filtrando e aplicação aceitando TCP mas falhando em HTTP/TLS?"
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Qual é a sequência clássica do three-way handshake TCP?",
      "options": [
        "ACK, SYN, FIN",
        "SYN, SYN-ACK, ACK",
        "FIN, ACK, SYN",
        "RST, SYN, ACK"
      ],
      "answer": "SYN, SYN-ACK, ACK",
      "explanation": "O cliente inicia com SYN, o servidor responde SYN-ACK e o cliente confirma com ACK."
    },
    {
      "id": "q2",
      "question": "O que um RST geralmente indica?",
      "options": [
        "Encerramento sempre ordenado",
        "Abortar/rejeitar conexão ou estado inválido",
        "Consulta DNS",
        "Rota default ausente"
      ],
      "answer": "Abortar/rejeitar conexão ou estado inválido",
      "explanation": "RST encerra ou rejeita abruptamente uma conexão TCP."
    },
    {
      "id": "q3",
      "question": "Por que firewalls stateful se importam com SYN?",
      "options": [
        "Porque SYN contém DNS",
        "Porque SYN marca início esperado de uma conexão",
        "Porque SYN é criptografia",
        "Porque SYN substitui rota"
      ],
      "answer": "Porque SYN marca início esperado de uma conexão",
      "explanation": "O firewall cria estado quando observa uma conexão legítima começar."
    },
    {
      "id": "q4",
      "question": "Qual sintoma costuma aparecer quando a porta está fechada e o host responde ativamente?",
      "options": [
        "Connection refused/RST",
        "Loop DNS",
        "ARP duplicado sempre",
        "TTL infinito"
      ],
      "answer": "Connection refused/RST",
      "explanation": "Porta fechada normalmente gera rejeição rápida; filtro silencioso costuma gerar timeout."
    },
    {
      "id": "q5",
      "question": "Qual estado indica conexão ativa e pronta para troca de dados?",
      "options": [
        "LISTEN",
        "SYN-SENT",
        "ESTABLISHED",
        "TIME-WAIT"
      ],
      "answer": "ESTABLISHED",
      "explanation": "ESTABLISHED indica handshake concluído e conexão ativa."
    },
    {
      "id": "q6",
      "question": "Ping funcionando prova que TCP/443 funciona?",
      "options": [
        "Sim, sempre",
        "Não, ICMP e TCP/443 testam coisas diferentes",
        "Sim, se o DNS resolver",
        "Sim, se o TTL for baixo"
      ],
      "answer": "Não, ICMP e TCP/443 testam coisas diferentes",
      "explanation": "ICMP pode responder enquanto a porta TCP está fechada, filtrada ou a aplicação falha."
    }
  ],
  "flashcards": [
    {
      "front": "O que é three-way handshake?",
      "back": "Processo de abertura TCP com SYN, SYN-ACK e ACK."
    },
    {
      "front": "O que significa LISTEN?",
      "back": "Um processo está aguardando conexões em uma porta TCP."
    },
    {
      "front": "O que significa ESTABLISHED?",
      "back": "A conexão TCP foi estabelecida e pode transportar dados."
    },
    {
      "front": "O que FIN indica?",
      "back": "Encerramento ordenado de uma direção da conexão TCP."
    },
    {
      "front": "O que RST indica?",
      "back": "Abortar ou rejeitar conexão de forma abrupta."
    },
    {
      "front": "Por que TIME-WAIT existe?",
      "back": "Para evitar ambiguidades com segmentos atrasados antes de reutilizar o mesmo fluxo."
    }
  ],
  "exercises": [
    {
      "id": "ex1",
      "title": "Interpretar flags",
      "prompt": "Explique o significado de SYN, SYN-ACK, ACK, FIN e RST em uma frase cada.",
      "expectedAnswer": "SYN inicia, SYN-ACK aceita e sincroniza, ACK confirma, FIN encerra ordenadamente e RST aborta/rejeita."
    },
    {
      "id": "ex2",
      "title": "Diferenciar sintomas",
      "prompt": "Compare timeout, connection refused e reset em uma tabela com hipótese provável e próxima evidência.",
      "expectedAnswer": "Timeout sugere filtro/perda/rota; refused sugere porta fechada; reset sugere rejeição/aborto por host, firewall ou aplicação."
    },
    {
      "id": "ex3",
      "title": "Estado e política",
      "prompt": "Explique por que caminho assimétrico pode quebrar firewall stateful.",
      "expectedAnswer": "Porque o firewall que recebe o retorno pode não ter visto o SYN inicial e, portanto, não possui estado para permitir a resposta."
    },
    {
      "id": "ex4",
      "title": "Runbook mínimo",
      "prompt": "Crie uma sequência de 6 verificações para diagnosticar falha TCP/443.",
      "expectedAnswer": "DNS, rota, teste de porta, serviço em LISTEN, firewall/security group, captura/logs e aplicação/TLS."
    }
  ],
  "challenge": {
    "title": "Aplicação HTTPS inacessível",
    "scenario": "Uma API em cloud deveria responder em 443/TCP. DNS resolve corretamente. Ping não responde, mas isso é esperado. O teste de TCP a partir de uma VM interna fica em timeout. O backend escuta em 8080/TCP e o load balancer tem listener 443/TCP.",
    "tasks": [
      "Listar hipóteses prováveis sem assumir causa única.",
      "Definir quais evidências coletar no cliente, load balancer, firewall/security group e backend.",
      "Explicar como diferenciar problema de listener, target group, security group, rota e aplicação.",
      "Propor correção segura e rollback."
    ],
    "rubric": [
      "Inclui camada de DNS, rota e transporte.",
      "Diferencia TCP de HTTP/TLS.",
      "Coleta logs e flow logs.",
      "Evita abrir 0.0.0.0/0 sem justificativa.",
      "Documenta rollback."
    ]
  },
  "commentedSolution": {
    "summary": "A investigação deve começar comprovando se o SYN chega ao load balancer, se o listener aceita, se o target group tem backends saudáveis, se o security group permite LB → backend e se o backend responde na porta esperada.",
    "steps": [
      "Confirmar DNS e IP do endpoint.",
      "Testar TCP/443 a partir da origem autorizada.",
      "Consultar logs do load balancer e flow logs.",
      "Verificar listener 443 e target group 8080.",
      "Validar security group do load balancer e do backend.",
      "No backend, confirmar processo em LISTEN na porta correta.",
      "Se TCP estabelece mas HTTP falha, investigar TLS, certificado, Host header, rota de aplicação e logs."
    ]
  },
  "glossary": [
    {
      "term": "SYN",
      "definition": "Flag TCP usada para iniciar uma conexão e sincronizar número de sequência."
    },
    {
      "term": "SYN-ACK",
      "definition": "Resposta do servidor aceitando a tentativa de conexão e confirmando o SYN do cliente."
    },
    {
      "term": "ACK",
      "definition": "Confirmação TCP de recebimento ou etapa do handshake."
    },
    {
      "term": "FIN",
      "definition": "Flag usada para encerramento ordenado de uma direção da conexão."
    },
    {
      "term": "RST",
      "definition": "Flag usada para resetar, rejeitar ou abortar uma conexão TCP."
    },
    {
      "term": "Firewall stateful",
      "definition": "Firewall que acompanha o estado de conexões e usa esse estado para permitir ou negar tráfego."
    },
    {
      "term": "TIME-WAIT",
      "definition": "Estado TCP temporário após encerramento para evitar reutilização insegura do mesmo fluxo."
    }
  ],
  "references": [
    {
      "title": "RFC 9293 — Transmission Control Protocol",
      "type": "standard",
      "note": "Referência moderna do TCP."
    },
    {
      "title": "RFC 793 — Transmission Control Protocol",
      "type": "historic",
      "note": "RFC histórica do TCP."
    },
    {
      "title": "Documentação Microsoft — Test-NetConnection e Get-NetTCPConnection",
      "type": "documentation",
      "note": "Ferramentas úteis no Windows."
    },
    {
      "title": "man pages — ss, tcpdump, nc",
      "type": "documentation",
      "note": "Ferramentas úteis em Linux."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e Deploy",
      "reason": "Testes automatizados devem validar conectividade real de porta e aplicação."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Acesso condicional e autenticação",
      "reason": "TLS, proxies, MFA e identidade dependem de transporte funcionando corretamente."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "Ler todas as seções",
      "Executar laboratório ou simulação equivalente",
      "Acertar pelo menos 70% do quiz",
      "Entregar o desafio ou comparar com solução comentada"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "6.4"
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
