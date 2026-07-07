export const lesson0608 = {
  "id": "6.8",
  "moduleId": "m06",
  "order": 8,
  "title": "Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark",
  "subtitle": "Aprenda a diagnosticar fluxos TCP e UDP de ponta a ponta usando evidências do sistema operacional, sockets, portas, captura de pacotes, firewall, NAT, logs e ferramentas visuais como Wireshark.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "curl",
    "firewall",
    "nat",
    "nc",
    "netstat",
    "pcap",
    "portas",
    "rca",
    "redes",
    "segurança",
    "sockets",
    "ss",
    "tcp",
    "tcpdump",
    "test-netconnection",
    "troubleshooting",
    "udp",
    "wireshark"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.1",
      "title": "Por que a camada de transporte existe",
      "reason": "O troubleshooting de transporte depende da diferença entre host, processo, porta e fluxo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "É necessário entender sockets, portas efêmeras e 5-tuple para interpretar conexões."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.3",
      "title": "TCP: handshake, estado e encerramento",
      "reason": "A análise de captura TCP exige reconhecer SYN, SYN-ACK, ACK, FIN, RST e estados."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.5",
      "title": "UDP: simplicidade, latência e aplicações em tempo real",
      "reason": "Fluxos UDP são diagnosticados por evidências, timeouts e comportamento de aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.7",
      "title": "NAT, PAT, firewalls stateful e rastreamento de conexão",
      "reason": "Muitos problemas aparecem entre socket local, tradução NAT, regra de firewall e retorno."
    }
  ],
  "objectives": [
    "Montar um método de troubleshooting TCP/UDP baseado em evidências, não em tentativa e erro.",
    "Usar netstat, ss e ferramentas equivalentes para identificar processos, portas e estados.",
    "Usar tcpdump e Wireshark para observar handshake, retransmissões, RST, FIN, UDP e timeouts.",
    "Separar falhas de DNS, rota, firewall, NAT, porta, TLS e aplicação.",
    "Interpretar sintomas como timeout, refused, reset, queda intermitente, perda, retransmissão e ausência de resposta.",
    "Documentar evidências de forma segura para NOC, SOC, DevSecOps e times de aplicação."
  ],
  "learningOutcomes": [
    "Identificar se um serviço está escutando localmente e em qual interface.",
    "Diferenciar conexão recusada, timeout, reset, bloqueio por firewall e ausência de rota.",
    "Ler uma captura simples de TCP e UDP sem depender apenas da interface gráfica.",
    "Filtrar tráfego com tcpdump/Wireshark por host, porta, protocolo e flags TCP.",
    "Relacionar evidências de host, rede, firewall, NAT e aplicação em uma linha do tempo.",
    "Produzir um relatório técnico com hipótese, teste, evidência, conclusão e recomendação."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Em um incidente real, a frase “a rede está fora” quase nunca é diagnóstico. Uma aplicação pode falhar porque o DNS resolveu para o IP errado, porque a rota de ida existe mas a de volta não, porque a porta não está escutando, porque o firewall bloqueia o SYN, porque o NAT expirou o estado UDP, porque o servidor responde com RST, porque o TLS falha ou porque o processo está saudável na porta errada.</p>\n  <p>O profissional de redes, segurança ou DevSecOps precisa transformar sintomas vagos em evidências: quem iniciou, para qual IP, qual porta, qual protocolo, houve SYN, houve SYN-ACK, houve ACK, houve retransmissão, houve RST, houve resposta UDP, qual processo estava escutando, qual regra de firewall foi aplicada e onde o fluxo desapareceu.</p>\n  <div class='callout'><strong>Ideia central:</strong> troubleshooting TCP/UDP é uma investigação de fluxo. Você compara o que o sistema operacional acredita, o que a rede transporta, o que o firewall registra e o que a aplicação realmente faz.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>As primeiras redes já exigiam ferramentas para verificar interfaces, rotas e conexões. Com TCP/IP se tornando dominante, comandos como <code>netstat</code> se popularizaram para mostrar sockets, estados e portas abertas. No Linux moderno, <code>ss</code> passou a substituir grande parte do uso do <code>netstat</code> por ser mais rápido e integrado ao kernel.</p>\n  <p>Com o crescimento das redes corporativas, apenas olhar sockets deixou de bastar. Era necessário observar pacotes reais. Ferramentas como <code>tcpdump</code> e bibliotecas como libpcap permitiram capturar tráfego diretamente na interface. O Wireshark adicionou uma camada visual poderosa para interpretar protocolos, conversas, filtros, flags e sequência temporal.</p>\n  <p>Hoje, troubleshooting TCP/UDP envolve host, container, firewall, load balancer, NAT Gateway, service mesh, Kubernetes, cloud flow logs e SIEM. As ferramentas continuam simples na base, mas o contexto operacional ficou muito mais distribuído.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema não é apenas saber se “a porta está aberta”. Uma porta pode estar aberta no servidor, mas bloqueada no firewall. Pode estar aberta para uma origem, mas não para outra. Pode responder TCP, mas a aplicação pode falhar depois do TLS. Pode existir NAT de ida, mas não tradução correta no retorno. Pode haver resposta UDP, mas o cliente não recebê-la por timeout stateful.</p>\n  <p>Outro problema é a diferença entre visão local e visão de rede. O servidor pode mostrar <code>LISTEN</code>, mas isso não prova que um cliente remoto consegue chegar. O cliente pode mostrar <code>SYN-SENT</code>, mas isso não prova se o pacote saiu, se foi bloqueado ou se a resposta se perdeu.</p>\n  <div class='callout callout--problem'><strong>Problema real:</strong> sem método, o troubleshooting vira troca aleatória de DNS, firewall, rota, restart de serviço e abertura ampla de portas. Isso aumenta indisponibilidade e risco de segurança.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>O diagnóstico evoluiu de comandos locais para investigação distribuída. Primeiro, verificava-se se a interface tinha IP, se havia rota e se o serviço estava escutando. Depois, passou-se a capturar pacotes para provar handshake, perda, RST, FIN e retransmissões.</p>\n  <p>Em ambientes modernos, a análise inclui logs de firewall, tabelas de NAT, health checks de load balancer, flow logs de cloud, políticas de security group, NetworkPolicy Kubernetes, sidecars, proxies e métricas de aplicação. Ainda assim, a base continua a mesma: identificar o fluxo e descobrir onde ele muda de comportamento.</p>\n  <p>A maturidade do troubleshooting está em construir uma linha do tempo com evidências: resolução de nome, rota escolhida, socket local, tentativa TCP/UDP, pacote capturado, decisão do firewall, tradução NAT, resposta do servidor e log da aplicação.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p>Troubleshooting TCP/UDP é o processo de investigar um fluxo de transporte com base em origem, destino, protocolo, porta, estado, pacotes e logs. Ele responde a perguntas como: o serviço está ouvindo? O cliente consegue iniciar conexão? O servidor responde? O firewall permite? O NAT preserva o retorno? A aplicação aceita a sessão?</p>\n  <table class='comparison-table'>\n    <thead><tr><th>Ferramenta</th><th>Mostra</th><th>Melhor uso</th><th>Cuidado</th></tr></thead>\n    <tbody>\n      <tr><td>netstat</td><td>Conexões, portas e processos</td><td>Ambientes Windows e legados</td><td>Pode ser limitado ou lento em sistemas modernos.</td></tr>\n      <tr><td>ss</td><td>Sockets e estados no Linux</td><td>Diagnóstico rápido em servidores Linux</td><td>Mostra visão local, não o caminho inteiro.</td></tr>\n      <tr><td>tcpdump</td><td>Pacotes reais na interface</td><td>Provar se pacotes chegaram/saíram</td><td>Exige filtros seguros para não capturar dados demais.</td></tr>\n      <tr><td>Wireshark</td><td>Análise visual de pacotes</td><td>Interpretação didática e profunda</td><td>Capturas podem conter dados sensíveis.</td></tr>\n      <tr><td>Flow logs</td><td>Metadados de fluxo</td><td>Cloud e firewalls</td><td>Nem sempre mostram payload ou motivo exato da aplicação.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um cliente tenta acessar <code>app.exemplo.local:443</code>, a investigação começa antes do TCP: o nome precisa resolver, a rota precisa escolher o próximo salto e o host precisa decidir a interface de saída. Depois disso, o cliente cria um socket, escolhe uma porta efêmera e envia um SYN para o destino.</p>\n  <p>No servidor, o processo precisa estar escutando no IP e porta corretos. Se o processo não estiver ouvindo, o sistema pode responder RST ou simplesmente não responder, dependendo do firewall. Se o firewall bloquear silenciosamente, o cliente verá timeout. Se rejeitar ativamente, pode aparecer connection refused ou reset.</p>\n  <ol class='flow-list'>\n    <li>Resolver nome para IP, quando houver nome envolvido.</li>\n    <li>Determinar rota e interface de saída.</li>\n    <li>Verificar socket local e porta efêmera do cliente.</li>\n    <li>Observar SYN, SYN-ACK e ACK em TCP, ou datagrama/resposta em UDP.</li>\n    <li>Validar firewall, NAT e retorno.</li>\n    <li>Confirmar resposta da aplicação e não apenas conectividade de porta.</li>\n  </ol>\n\n  <div class='callout callout--mentor'>\n    <strong>Método operacional recomendado:</strong> nunca comece abrindo firewall. Primeiro prove o estado local do serviço, depois prove a tentativa do cliente, depois prove se o pacote aparece na interface correta e só então compare com logs de firewall, NAT, proxy, load balancer ou cloud flow logs. Essa ordem evita liberar tráfego em excesso por ansiedade operacional.\n  </div>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura corporativa, o fluxo TCP/UDP passa por várias camadas: cliente, DNS, rota local, gateway, firewall, NAT, roteamento interno, load balancer, servidor, processo e aplicação. Cada camada pode gerar sintomas diferentes.</p>\n  <table class='data-table'>\n    <thead><tr><th>Camada</th><th>Evidência</th><th>Ferramentas</th><th>Falha típica</th></tr></thead>\n    <tbody>\n      <tr><td>Nome</td><td>IP resolvido</td><td>dig, nslookup, Resolve-DnsName</td><td>DNS errado ou cache antigo.</td></tr>\n      <tr><td>Rota</td><td>Próximo salto</td><td>ip route get, route print, traceroute</td><td>Default route incorreta ou retorno ausente.</td></tr>\n      <tr><td>Socket</td><td>Porta local/remota e estado</td><td>ss, netstat, Get-NetTCPConnection</td><td>Serviço não escuta ou bind errado.</td></tr>\n      <tr><td>Pacote</td><td>SYN, ACK, UDP, RST, retransmissão</td><td>tcpdump, Wireshark</td><td>Bloqueio, perda, MSS/MTU, reset.</td></tr>\n      <tr><td>Controle</td><td>Allow/deny/NAT</td><td>Logs firewall, flow logs, conntrack</td><td>Regra incompleta ou timeout.</td></tr>\n      <tr><td>Aplicação</td><td>HTTP/TLS/erro de negócio</td><td>curl, openssl, logs app</td><td>Porta conecta, mas serviço falha.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine uma entrega em um prédio corporativo. O endereço do prédio é o IP. A portaria é o firewall/NAT. A sala é a porta. O funcionário responsável é o processo. O protocolo de entrega é TCP ou UDP. Dizer que “cheguei ao prédio” não significa que encontrei a sala, fui autorizado pela portaria, entreguei para a pessoa certa e recebi confirmação.</p>\n  <p>O troubleshooting é reconstruir o trajeto: o entregador sabia o endereço certo? Foi para o prédio correto? A portaria deixou entrar? A sala existia? A pessoa estava lá? Houve comprovante? Alguém recusou a entrega?</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você tenta acessar <code>http://192.168.1.20:8080</code> e o navegador não abre. Um diagnóstico metódico faria:</p>\n  <ol class='flow-list'>\n    <li>No servidor: verificar se há processo ouvindo em <code>0.0.0.0:8080</code>, <code>192.168.1.20:8080</code> ou apenas <code>127.0.0.1:8080</code>.</li>\n    <li>No cliente: testar <code>ping 192.168.1.20</code>, depois testar a porta com <code>Test-NetConnection</code> ou <code>nc -vz</code>.</li>\n    <li>No servidor: capturar <code>tcpdump -n tcp port 8080</code> para ver se o SYN chega.</li>\n    <li>Se o SYN chega e há RST, o serviço pode não estar escutando naquela interface.</li>\n    <li>Se o SYN não chega, investigar rota, firewall local, VLAN, gateway ou ACL.</li>\n  </ol>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma aplicação de RH roda em servidores internos e usuários de uma filial relatam timeout. Na matriz, funciona. O NOC verifica traceroute e rota. O time de segurança verifica logs do firewall. O time Linux verifica <code>ss -lntp</code>. A captura mostra SYN chegando ao firewall, mas não saindo para o servidor. O log revela que a regra permitia apenas a rede antiga da filial.</p>\n  <p>A correção não é “liberar tudo”. A correção madura é atualizar a matriz de fluxos, ajustar a regra mínima necessária, registrar dono, justificar a mudança, validar com captura e criar monitoramento para evitar regressão.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, o fluxo pode atravessar security group, NACL/NSG, route table, NAT Gateway, load balancer, firewall gerenciado e instância. A instância pode estar escutando corretamente, mas o health check do load balancer pode falhar porque usa outra porta, outro path HTTP ou origem diferente.</p>\n  <p>Flow logs ajudam a identificar se o fluxo foi aceito ou rejeitado em metadados. Capturas dentro da VM mostram se o pacote chegou. Logs do load balancer mostram status de backend. O diagnóstico completo cruza essas visões.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em pipelines, containers e Kubernetes, um serviço pode funcionar no pod, mas falhar pelo Service, Ingress ou LoadBalancer. O problema pode estar em porta do container, targetPort, service port, readiness probe, NetworkPolicy, sidecar, DNS interno ou egress policy.</p>\n  <p>O método continua igual: identificar origem, destino, protocolo, porta e evidência em cada salto. Comandos como <code>ss</code>, <code>curl -v</code>, <code>kubectl describe service</code>, <code>kubectl logs</code> e capturas controladas ajudam a separar rede de aplicação.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Do ponto de vista defensivo, troubleshooting também protege. Ele evita a solução perigosa de abrir <code>0.0.0.0/0</code> para “testar”. Permite provar que a porta necessária é específica, que a origem correta é conhecida e que logs de firewall e host são suficientes para auditoria.</p>\n  <div class='callout callout--security'><strong>Boa prática:</strong> capturas de pacotes podem conter credenciais, tokens, nomes internos e dados de aplicação. Capture o mínimo necessário, filtre por host/porta, proteja o arquivo e sanitize evidências antes de compartilhar.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m06l08-title m06l08-desc'>\n    <title id='m06l08-title'>Troubleshooting TCP/UDP ponta a ponta</title>\n    <desc id='m06l08-desc'>Fluxo de diagnóstico entre cliente, DNS, rota, firewall, NAT, servidor, processo e captura de pacotes.</desc>\n    <defs>\n      <marker id='m06l08-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path class='svg-flow' d='M0,0 L0,6 L9,3 z'></path>\n      </marker>\n    </defs>\n    <rect class='svg-zone' x='30' y='55' width='190' height='400' rx='18'></rect>\n    <text class='svg-label' x='125' y='88' text-anchor='middle'>Cliente</text>\n    <rect class='svg-node svg-node--client' x='65' y='140' width='120' height='70' rx='12'></rect>\n    <text class='svg-label' x='125' y='170' text-anchor='middle'>Socket</text>\n    <text class='svg-label svg-label--small' x='125' y='193' text-anchor='middle'>porta efêmera</text>\n    <rect class='svg-node svg-node--security' x='55' y='300' width='140' height='84' rx='12'></rect>\n    <text class='svg-label' x='125' y='330' text-anchor='middle'>Evidência</text>\n    <text class='svg-label svg-label--small' x='125' y='354' text-anchor='middle'>netstat/ss</text>\n\n    <rect class='svg-node svg-node--cloud' x='275' y='80' width='140' height='68' rx='12'></rect>\n    <text class='svg-label' x='345' y='110' text-anchor='middle'>DNS</text>\n    <text class='svg-label svg-label--small' x='345' y='132' text-anchor='middle'>nome → IP</text>\n    <rect class='svg-node svg-node--router' x='275' y='245' width='140' height='75' rx='12'></rect>\n    <text class='svg-label' x='345' y='277' text-anchor='middle'>Rota</text>\n    <text class='svg-label svg-label--small' x='345' y='300' text-anchor='middle'>next hop</text>\n\n    <rect class='svg-node svg-node--firewall' x='500' y='160' width='160' height='130' rx='16'></rect>\n    <text class='svg-label' x='580' y='195' text-anchor='middle'>Firewall/NAT</text>\n    <text class='svg-label svg-label--small' x='580' y='220' text-anchor='middle'>política + estado</text>\n    <text class='svg-label svg-label--small' x='580' y='244' text-anchor='middle'>logs/flow logs</text>\n\n    <rect class='svg-zone' x='735' y='55' width='205' height='400' rx='18'></rect>\n    <text class='svg-label' x='837' y='88' text-anchor='middle'>Servidor</text>\n    <rect class='svg-node svg-node--server' x='770' y='140' width='135' height='72' rx='12'></rect>\n    <text class='svg-label' x='837' y='170' text-anchor='middle'>Processo</text>\n    <text class='svg-label svg-label--small' x='837' y='193' text-anchor='middle'>LISTEN :443</text>\n    <rect class='svg-node svg-node--security' x='760' y='300' width='155' height='84' rx='12'></rect>\n    <text class='svg-label' x='837' y='330' text-anchor='middle'>Captura</text>\n    <text class='svg-label svg-label--small' x='837' y='354' text-anchor='middle'>tcpdump/Wireshark</text>\n\n    <path class='svg-flow svg-flow--request animated-flow' d='M185 175 C230 130, 250 115, 275 115' marker-end='url(#m06l08-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M185 185 C245 230, 260 280, 275 282' marker-end='url(#m06l08-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M415 282 C455 270, 475 245, 500 225' marker-end='url(#m06l08-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M660 225 C700 200, 735 180, 770 176' marker-end='url(#m06l08-arrow)'></path>\n    <path class='svg-flow svg-flow--response animated-flow' d='M770 210 C710 290, 660 300, 610 290' marker-end='url(#m06l08-arrow)'></path>\n    <path class='svg-flow svg-flow--response animated-flow' d='M500 260 C405 390, 285 380, 195 342' marker-end='url(#m06l08-arrow)'></path>\n\n    <rect class='svg-badge' x='170' y='485' width='640' height='40' rx='10'></rect>\n    <text class='svg-label svg-label--small' x='490' y='510' text-anchor='middle'>Método: nome → rota → socket → pacote → firewall/NAT → processo → aplicação.</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai executar um roteiro completo de troubleshooting TCP/UDP: confirmar listener com <code>ss</code>/<code>netstat</code>, testar conectividade com <code>nc</code>, <code>curl</code> e <code>Test-NetConnection</code>, capturar pacotes com <code>tcpdump</code>, interpretar flags no Wireshark/tshark, testar UDP/DNS e produzir um RCA curto com evidências sanitizadas.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam interpretação de sintomas: timeout, refused, reset, ausência de resposta UDP, retransmissão TCP e bind incorreto.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá evidências parciais de cliente, servidor, firewall e captura. Sua missão será descobrir onde o fluxo falha e propor correção mínima e segura.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada mostra como cruzar evidências locais, captura e logs para chegar a uma conclusão sem abrir portas desnecessárias.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Troubleshooting TCP/UDP exige método. <code>netstat</code> e <code>ss</code> mostram sockets e estados locais; <code>tcpdump</code> e Wireshark mostram pacotes; logs de firewall/NAT mostram decisão e tradução; testes como <code>curl</code>, <code>nc</code> e <code>Test-NetConnection</code> ajudam a separar rede, transporte e aplicação.</p>\n  <p>O objetivo não é decorar comandos, mas construir uma linha do tempo confiável: nome resolvido, rota escolhida, porta testada, pacote observado, decisão de firewall, estado NAT, resposta do servidor e comportamento da aplicação.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, vamos estudar <strong>Segurança em transporte: exposição, scans, TLS e hardening</strong>, conectando portas abertas, descoberta defensiva, criptografia, redução de superfície e controles corporativos.</p>\n</section>\n"
  },
  "networkContext": {
    "whereItFits": "Camada de transporte, diagnóstico operacional, NOC, SOC, DevSecOps, cloud, firewall e resposta a incidentes.",
    "before": "O estudante já entende TCP, UDP, portas, sockets, NAT/PAT e serviços corporativos.",
    "after": "A aula prepara análise de exposição, hardening, TLS, scans defensivos e diagnóstico ponta a ponta.",
    "dependsOn": [
      "m04",
      "m06",
      "m07",
      "8.1",
      "8.2",
      "8.3",
      "8.5",
      "8.7"
    ]
  },
  "protocolFields": [
    {
      "name": "Protocolo",
      "description": "TCP ou UDP, com comportamentos diferentes de estado, confirmação e timeout."
    },
    {
      "name": "IP de origem",
      "description": "Host que inicia ou envia o pacote observado."
    },
    {
      "name": "Porta de origem",
      "description": "Geralmente efêmera no cliente; relevante para NAT e correlação de logs."
    },
    {
      "name": "IP de destino",
      "description": "Host, VIP, load balancer ou serviço que recebe o fluxo."
    },
    {
      "name": "Porta de destino",
      "description": "Serviço pretendido, como 443/TCP, 53/UDP ou 123/UDP."
    },
    {
      "name": "Flags TCP",
      "description": "SYN, ACK, FIN, RST e outras flags usadas para interpretar estado."
    },
    {
      "name": "Estado local",
      "description": "LISTEN, SYN-SENT, ESTABLISHED, TIME-WAIT e outros estados vistos no host."
    },
    {
      "name": "Timestamp",
      "description": "Horário da evidência, necessário para correlação com firewall, SIEM e aplicação."
    }
  ],
  "packetFlow": [
    "Aplicação solicita conexão ou envio de datagrama.",
    "Sistema operacional escolhe IP/interface/rota e porta de origem.",
    "Cliente envia SYN TCP ou datagrama UDP para o destino.",
    "Firewall/NAT avalia política, estado e tradução.",
    "Servidor recebe pacote se rota e política permitirem.",
    "Processo responde com SYN-ACK, payload UDP, RST, FIN ou erro de aplicação.",
    "Cliente observa resposta, timeout, retransmissão ou reset.",
    "Analista cruza socket, captura, log e teste de aplicação para concluir a causa."
  ],
  "deepDive": {
    "title": "O erro de diagnosticar por uma única ferramenta",
    "content": "Nenhuma ferramenta sozinha prova tudo. netstat e ss mostram a visão do host. tcpdump mostra o que passa pela interface capturada. Wireshark interpreta pacotes, mas não conhece todas as regras de firewall. Flow logs mostram metadados, mas não payload. Logs de aplicação mostram erro interno, mas não necessariamente o caminho de rede. O diagnóstico maduro cruza evidências e procura consistência entre elas.",
    "questions": [
      "Por que uma captura no cliente pode mostrar SYN saindo, mas não provar que o servidor recebeu?",
      "Por que flow logs aceitos não provam que a aplicação respondeu corretamente?",
      "Por que capturar no servidor é diferente de capturar no firewall?"
    ],
    "operationalImpact": [
      "Reduz MTTR porque transforma sintomas vagos em evidências por camada: DNS, rota, socket, pacote, firewall, NAT e aplicação.",
      "Exige disciplina de coleta, horário sincronizado, filtros de captura, padronização de RCA e integração entre NOC, SOC, redes e aplicação.",
      "Pode aumentar temporariamente carga operacional se capturas e testes forem feitos sem escopo; por isso a aula reforça 5-tuple e sanitização."
    ],
    "financialImpact": [
      "Em cloud, flow logs, packet capture, firewall gerenciado e armazenamento de logs podem gerar custo recorrente.",
      "Troubleshooting ruim aumenta indisponibilidade, horas de equipes especializadas e risco de mudanças emergenciais caras.",
      "Ferramentas locais como ss, netstat, tcpdump, curl e nc reduzem custo inicial, mas exigem treinamento e governança."
    ],
    "securityImpact": [
      "Capturas PCAP podem expor credenciais, cookies, tokens, nomes internos e payloads sensíveis se não forem sanitizadas.",
      "Abrir portas amplas para testar conectividade cria superfície de ataque e pode virar exceção permanente.",
      "Correlação de firewall, NAT, DNS e sockets ajuda a detectar egress indevido, serviços expostos e fluxos anômalos."
    ]
  },
  "commonMistakes": [
    "Concluir que a rede está boa apenas porque ping respondeu.",
    "Concluir que a aplicação está boa apenas porque a porta conectou.",
    "Capturar tráfego sem filtro e vazar dados sensíveis.",
    "Ignorar DNS e testar o IP errado.",
    "Confundir connection refused com timeout.",
    "Não verificar bind em 127.0.0.1 versus 0.0.0.0 versus IP específico.",
    "Abrir firewall amplo para testar e esquecer regra permissiva em produção.",
    "Ignorar NAT, rota de retorno e caminho assimétrico."
  ],
  "troubleshooting": {
    "symptoms": [
      "Timeout ao conectar em uma porta TCP.",
      "Connection refused imediatamente.",
      "Conexão estabelece e cai com RST.",
      "UDP envia pacote, mas não recebe resposta.",
      "Aplicação funciona localmente, mas não remotamente.",
      "Funciona por IP, mas falha por nome.",
      "Funciona de uma rede, mas não de outra.",
      "Captura mostra retransmissões ou MSS/MTU suspeito."
    ],
    "commands": [
      {
        "platform": "Linux — listeners e sockets",
        "command": "ss -tulpen\nss -tan state established\nss -tan state syn-sent\nss -tan state time-wait",
        "purpose": "Ver portas TCP/UDP escutando, conexões estabelecidas e estados locais do kernel.",
        "expectedObservation": "LISTEN na porta esperada, processo associado quando houver permissão, ou SYN-SENT/TIME-WAIT conforme o sintoma.",
        "interpretation": "Se não há LISTEN no servidor, a falha pode ser aplicação, bind, container, systemd ou porta errada; se há SYN-SENT no cliente, falta resposta do destino ou do caminho de retorno."
      },
      {
        "platform": "Windows — listeners e conexões",
        "command": "netstat -ano | findstr \":8080\"\nGet-NetTCPConnection -LocalPort 8080\nGet-NetUDPEndpoint | Select-Object -First 20",
        "purpose": "Confirmar portas, PID, estado TCP e endpoints UDP no Windows.",
        "expectedObservation": "Linha LISTENING para serviço TCP, PID correspondente e endpoint UDP quando aplicável.",
        "interpretation": "Se o serviço escuta apenas em 127.0.0.1, clientes remotos não chegam; se o PID não corresponde ao serviço esperado, há erro de bind ou processo."
      },
      {
        "platform": "Cliente — teste TCP controlado",
        "command": "nc -vz <destino> 8080\ncurl -v --connect-timeout 5 http://<destino>:8080/\nTest-NetConnection <destino> -Port 8080",
        "purpose": "Separar conexão recusada, timeout, reset e resposta HTTP.",
        "expectedObservation": "Conexão aceita, refused imediato, timeout ou resposta HTTP com status.",
        "interpretation": "Refused indica recusa ativa; timeout sugere filtro, perda ou retorno ausente; HTTP 4xx/5xx indica que transporte funcionou e o problema subiu para aplicação."
      },
      {
        "platform": "Linux — rota e caminho local",
        "command": "ip route get <destino>\ntraceroute <destino>\nmtr -rw <destino>",
        "purpose": "Confirmar interface de saída, next hop e caminho provável antes de capturar pacotes.",
        "expectedObservation": "Rota escolhida, gateway, interface e saltos coerentes com a topologia.",
        "interpretation": "Rota errada ou caminho inesperado muda onde a captura deve ser feita e pode explicar tráfego assimétrico."
      },
      {
        "platform": "tcpdump — captura TCP",
        "command": "sudo tcpdump -nn -i any \"host <cliente-ip> and host <servidor-ip> and tcp port 8080\"\nsudo tcpdump -nnvvXSs 0 -i any \"tcp port 8080\"",
        "purpose": "Provar SYN, SYN-ACK, ACK, FIN, RST, retransmissões e ausência de resposta.",
        "expectedObservation": "Handshake completo ou ponto exato em que o fluxo para.",
        "interpretation": "SYN chegando ao servidor sem SYN-ACK aponta para host/serviço/firewall local; SYN saindo do cliente sem aparecer no servidor aponta para caminho, firewall ou NAT."
      },
      {
        "platform": "UDP/DNS — teste e captura",
        "command": "dig @<dns-ip> exemplo.com A +time=2 +tries=1\nResolve-DnsName exemplo.com -Server <dns-ip>\nsudo tcpdump -nn -i any \"host <dns-ip> and udp port 53\"",
        "purpose": "Diagnosticar datagramas UDP, timeout, resposta DNS e possível bloqueio stateful.",
        "expectedObservation": "Consulta UDP e resposta DNS, ou consulta sem retorno dentro do timeout.",
        "interpretation": "Em UDP, ausência de resposta não prova causa única; deve ser correlacionada com captura no servidor, logs de firewall e comportamento da aplicação."
      },
      {
        "platform": "Wireshark/tshark — interpretação",
        "command": "tshark -r fluxo.pcap -Y \"tcp.analysis.retransmission\"\ntshark -r fluxo.pcap -Y \"tcp.flags.reset==1\"\ntshark -r fluxo.pcap -Y \"udp.port==53\"",
        "purpose": "Filtrar retransmissões, resets e tráfego UDP em uma captura autorizada.",
        "expectedObservation": "Eventos marcados pelo analisador ou ausência deles.",
        "interpretation": "Retransmissão recorrente sugere perda ou ausência de retorno; RST identifica recusa/encerramento abrupto; UDP exige correlação com logs."
      },
      {
        "platform": "Firewall, NAT e cloud",
        "command": "show access-lists\nshow logging\nshow ip nat translations\n# Cloud: consultar flow logs filtrando srcaddr, dstaddr, srcport, dstport, protocol, action",
        "purpose": "Correlacionar 5-tuple com decisão de política, tradução NAT, allow/deny e caminho cloud.",
        "expectedObservation": "Log de allow/deny, tradução NAT ou ausência de registro onde deveria existir.",
        "interpretation": "Log de deny com o mesmo 5-tuple confirma política; allow sem resposta aponta para retorno, serviço ou camada superior."
      }
    ],
    "method": [
      "Defina 5-tuple: origem, porta de origem, destino, porta de destino e protocolo.",
      "Confirme DNS e IP real do destino.",
      "Confirme rota local e gateway/next hop.",
      "No servidor, confirme processo escutando e bind correto.",
      "No cliente, teste porta e registre sintoma exato.",
      "Capture no ponto mais próximo do cliente e, se possível, do servidor.",
      "Compare captura com logs de firewall/NAT/load balancer.",
      "Formule conclusão mínima e correção de menor privilégio."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "decisionTree": [
      {
        "if": "O servidor não mostra LISTEN na porta esperada",
        "then": "Investigue aplicação, bind, container, systemd, porta incorreta ou serviço parado antes de culpar rede."
      },
      {
        "if": "O cliente recebe connection refused imediatamente",
        "then": "Procure recusa ativa: serviço ausente, bind errado, firewall reject ou RST enviado pelo host."
      },
      {
        "if": "O cliente fica em timeout e a captura mostra SYN retransmitido",
        "then": "Verifique firewall silencioso, rota, NAT, retorno assimétrico ou destino indisponível."
      },
      {
        "if": "O TCP conecta, mas curl mostra HTTP 401, 403, 404, 500, 502 ou 504",
        "then": "Transporte funcionou; investigue autenticação, autorização, rota de aplicação, proxy, gateway ou backend."
      },
      {
        "if": "UDP envia consulta, mas não há resposta",
        "then": "Compare captura no cliente e no servidor, logs de firewall/NAT, timeout stateful e saúde da aplicação."
      },
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigue DNS, cache, split-horizon, resolver corporativo, VPN, zona privada e registro incorreto."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Capturar apenas tráfego necessário com filtros restritos.",
      "Sanitizar IPs, nomes, tokens, cookies e payloads antes de compartilhar evidências.",
      "Registrar horário, origem, destino, porta, protocolo e responsável pelo teste.",
      "Preferir testes controlados e autorizados em janelas combinadas.",
      "Cruzar captura com logs de firewall e sistema para evitar conclusões parciais.",
      "Usar menor privilégio para liberar portas temporárias ou permanentes."
    ],
    "badPractices": [
      "Abrir 0.0.0.0/0 para depurar sem controle.",
      "Rodar captura ampla em rede de produção sem autorização.",
      "Enviar PCAP bruto com credenciais ou dados internos em canais inseguros.",
      "Concluir causa raiz apenas por ping ou apenas por curl.",
      "Ignorar logs de NAT e perder atribuição de origem.",
      "Fazer testes destrutivos ou varreduras não autorizadas."
    ],
    "vulnerabilities": [
      {
        "name": "Serviços administrativos expostos durante troubleshooting.",
        "description": "Risco relacionado à aula 6.8 — Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Processo formal para coleta, armazenamento e descarte de capturas."
      },
      {
        "name": "Vazamento de dados sensíveis em PCAP.",
        "description": "Risco relacionado à aula 6.8 — Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão de regras temporárias com expiração."
      },
      {
        "name": "Captura contendo credenciais em texto claro.",
        "description": "Risco relacionado à aula 6.8 — Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentação e matriz de fluxos aprovada."
      },
      {
        "name": "Regras temporárias que viram permanentes.",
        "description": "Risco relacionado à aula 6.8 — Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "TLS forte para reduzir exposição de payload em capturas."
      },
      {
        "name": "Ausência de logs de firewall/NAT para resposta a incidentes.",
        "description": "Risco relacionado à aula 6.8 — Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "SIEM com correlação de firewall, host, DNS, proxy e aplicação."
      },
      {
        "name": "Egress sem controle permitindo canais TCP/UDP indevidos.",
        "description": "Risco relacionado à aula 6.8 — Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Runbooks padronizados para diagnóstico sem ampliar superfície."
      }
    ],
    "mitigations": [
      "Processo formal para coleta, armazenamento e descarte de capturas.",
      "Revisão de regras temporárias com expiração.",
      "Segmentação e matriz de fluxos aprovada.",
      "TLS forte para reduzir exposição de payload em capturas.",
      "SIEM com correlação de firewall, host, DNS, proxy e aplicação.",
      "Runbooks padronizados para diagnóstico sem ampliar superfície."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável.",
      "Alertar quando regras temporárias de troubleshooting permanecerem ativas após a janela aprovada.",
      "Correlacionar picos de RST, retransmissões e denies por 5-tuple em firewall/SIEM.",
      "Auditar PCAPs e logs compartilhados para evitar vazamento de credenciais, cookies e tokens."
    ],
    "hardening": [
      "Processo formal para coleta, armazenamento e descarte de capturas.",
      "Revisão de regras temporárias com expiração.",
      "Segmentação e matriz de fluxos aprovada.",
      "TLS forte para reduzir exposição de payload em capturas.",
      "SIEM com correlação de firewall, host, DNS, proxy e aplicação.",
      "Runbooks padronizados para diagnóstico sem ampliar superfície."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido.",
      "Múltiplos SYN sem resposta em destinos críticos.",
      "Aumento de connection refused após mudança de deploy.",
      "Consultas UDP/DNS sem resposta após alteração de firewall ou VPN."
    ]
  },
  "lab": {
    "id": "lab-6.8",
    "title": "Diagnóstico TCP/UDP com ss, netstat, tcpdump, curl, nc e Test-NetConnection",
    "labType": "local",
    "objective": "Diagnosticar falhas TCP e UDP usando evidências de socket, teste ativo, captura de pacotes, rota local e logs, separando problema de serviço, rede, firewall, NAT, DNS e aplicação.",
    "scenario": "Você recebeu um chamado: “a aplicação na porta 8080 não abre de outra máquina e o DNS às vezes dá timeout”. O objetivo é conduzir uma investigação defensiva e documentada, sem abrir portas de forma ampla e sem capturar tráfego de terceiros.",
    "topology": "Cliente Windows ou Linux -> rede local/firewall opcional -> servidor Linux/VM local com serviço HTTP em TCP/8080; teste UDP/DNS contra resolvedor autorizado.",
    "architecture": "O cliente gera tráfego TCP e UDP; o servidor expõe um serviço controlado; as capturas são feitas apenas nos hosts autorizados; logs e saídas de comandos viram evidência de RCA.",
    "prerequisites": [
      "Ambiente local, VM ou laboratório autorizado.",
      "Linux recomendado para servidor e tcpdump.",
      "Windows PowerShell opcional para Test-NetConnection.",
      "Permissão administrativa apenas no ambiente de laboratório.",
      "Wireshark ou tshark opcionais para análise visual/offline."
    ],
    "tools": [
      "ss",
      "netstat",
      "Get-NetTCPConnection",
      "Test-NetConnection",
      "nc ou ncat",
      "curl",
      "tcpdump",
      "dig ou Resolve-DnsName",
      "Wireshark/tshark opcional",
      "editor para relatório RCA"
    ],
    "estimatedTimeMinutes": 120,
    "cost": "zero",
    "safetyNotes": [
      "Capture somente tráfego do laboratório e sempre use filtros por host/porta.",
      "Não compartilhe PCAP bruto contendo tokens, cookies, nomes internos ou payload sensível.",
      "Não faça varredura ofensiva; use apenas portas e hosts definidos no escopo.",
      "Não abra firewall para 0.0.0.0/0 como teste. Se precisar ajustar regra, use origem, destino e porta específicos.",
      "Registre horário, responsável, 5-tuple e motivo do teste."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir escopo e 5-tuple",
        "instruction": "Documente origem, destino, protocolo, porta, horário, aplicação, sintoma e ambiente autorizado.",
        "artifact": "Tabela com origem, porta de origem quando visível, destino, porta de destino, protocolo, horário e hipótese inicial.",
        "evidence": "Registro escrito do escopo antes de executar comandos.",
        "expectedOutput": "5-tuple e premissas documentadas.",
        "explanation": "Sem escopo, a coleta vira ruído e pode capturar dados indevidos."
      },
      {
        "number": 2,
        "title": "Subir um serviço TCP controlado no servidor",
        "instruction": "No servidor Linux do laboratório, inicie um HTTP simples em TCP/8080 em um diretório sem dados sensíveis.",
        "command": "mkdir -p /tmp/lab-tcpudp && echo \"ok lab 6.8\" > /tmp/lab-tcpudp/index.html\ncd /tmp/lab-tcpudp\npython3 -m http.server 8080 --bind 0.0.0.0",
        "expectedOutput": "Servidor informando que está escutando em 0.0.0.0:8080.",
        "explanation": "O serviço controlado permite testar TCP sem depender de aplicação corporativa real."
      },
      {
        "number": 3,
        "title": "Confirmar listener e bind correto",
        "instruction": "Em outro terminal do servidor, confirme se a porta está escutando e em qual endereço.",
        "command": "ss -tulpen | grep \":8080\"\n# Alternativa Windows:\nnetstat -ano | findstr \":8080\"\nGet-NetTCPConnection -LocalPort 8080",
        "expectedOutput": "LISTEN em 0.0.0.0:8080 ou no IP esperado; PID/processo coerente.",
        "explanation": "Se o serviço escuta apenas em 127.0.0.1, acesso remoto falhará mesmo com rede correta."
      },
      {
        "number": 4,
        "title": "Validar rota local até o destino",
        "instruction": "No cliente, veja qual rota e interface seriam usadas para alcançar o servidor.",
        "command": "ip route get <servidor-ip>\n# Windows:\nroute print\ntracert <servidor-ip>",
        "expectedOutput": "Interface, gateway ou rota local compatíveis com a topologia.",
        "explanation": "A rota define onde capturar e qual firewall/gateway pode interferir."
      },
      {
        "number": 5,
        "title": "Testar TCP com nc, curl e PowerShell",
        "instruction": "Do cliente, teste primeiro a conexão TCP e depois a resposta HTTP.",
        "command": "nc -vz <servidor-ip> 8080\ncurl -v --connect-timeout 5 http://<servidor-ip>:8080/\n# Windows PowerShell:\nTest-NetConnection <servidor-ip> -Port 8080",
        "expectedOutput": "Conexão aceita e HTTP 200/arquivo “ok lab 6.8”, ou sintoma claro: refused, timeout, reset ou erro HTTP.",
        "explanation": "nc/Test-NetConnection testam transporte; curl mostra também a camada HTTP."
      },
      {
        "number": 6,
        "title": "Capturar o handshake TCP",
        "instruction": "No servidor, capture somente o fluxo do cliente para a porta 8080 enquanto repete o teste.",
        "command": "sudo tcpdump -nn -i any \"host <cliente-ip> and tcp port 8080\"\n# Para salvar evidência:\nsudo tcpdump -nn -i any -w fluxo-8080.pcap \"host <cliente-ip> and tcp port 8080\"",
        "expectedOutput": "SYN, SYN-ACK, ACK e tráfego HTTP; ou evidência do ponto em que o fluxo para.",
        "explanation": "A captura prova o que realmente chegou à interface observada."
      },
      {
        "number": 7,
        "title": "Interpretar flags e sintomas TCP",
        "instruction": "Analise a captura salva com Wireshark ou tshark para localizar retransmissões, resets e handshake incompleto.",
        "command": "tshark -r fluxo-8080.pcap -Y \"tcp.flags.syn==1\"\ntshark -r fluxo-8080.pcap -Y \"tcp.analysis.retransmission\"\ntshark -r fluxo-8080.pcap -Y \"tcp.flags.reset==1\"",
        "expectedOutput": "Lista de pacotes SYN, retransmissões ou RST quando existirem.",
        "explanation": "SYN sem SYN-ACK, RST e retransmissões apontam para causas diferentes."
      },
      {
        "number": 8,
        "title": "Criar falha controlada de porta fechada",
        "instruction": "Teste uma porta TCP onde não exista serviço para comparar refused/timeout com a porta funcional.",
        "command": "nc -vz <servidor-ip> 9099\ncurl -v --connect-timeout 5 http://<servidor-ip>:9099/\n# Windows PowerShell:\nTest-NetConnection <servidor-ip> -Port 9099",
        "expectedOutput": "Connection refused se o host rejeitar ativamente, ou timeout se houver filtro silencioso.",
        "explanation": "Comparar porta aberta e fechada treina leitura de sintomas sem mexer no firewall real."
      },
      {
        "number": 9,
        "title": "Testar UDP/DNS autorizado",
        "instruction": "Teste uma consulta DNS contra um resolvedor permitido no laboratório e capture UDP/53.",
        "command": "dig @<dns-ip> exemplo.com A +time=2 +tries=1\n# Windows PowerShell:\nResolve-DnsName exemplo.com -Server <dns-ip>\n# Captura Linux:\nsudo tcpdump -nn -i any \"host <dns-ip> and udp port 53\"",
        "expectedOutput": "Consulta UDP e resposta DNS, ou timeout documentado.",
        "explanation": "UDP não tem handshake; a análise depende de datagrama, resposta, timeout e logs."
      },
      {
        "number": 10,
        "title": "Correlacionar logs e flow logs",
        "instruction": "Compare horário, origem, destino, porta e protocolo com logs disponíveis de firewall, sistema, proxy, cloud ou aplicação.",
        "command": "sudo journalctl --since \"10 minutes ago\" | grep -Ei \"8080|python|http|reject|deny|drop\"\n# Firewall Linux, se existir no laboratório:\nsudo nft list ruleset\nsudo iptables -S\n# Cloud/Firewall: filtrar flow logs por srcaddr,dstaddr,srcport,dstport,protocol,action",
        "expectedOutput": "Linha do tempo coerente entre teste, captura e logs.",
        "explanation": "A causa raiz costuma aparecer quando a evidência do host é cruzada com a evidência do controle de rede."
      },
      {
        "number": 11,
        "title": "Sanitizar evidências",
        "instruction": "Remova ou mascare tokens, cookies, nomes internos, IPs sensíveis e payloads antes de compartilhar o relatório.",
        "artifact": "Versão sanitizada de comandos, prints, trechos de log e PCAP quando houver.",
        "evidence": "Checklist de sanitização preenchido.",
        "expectedOutput": "Evidências úteis sem exposição desnecessária de dados.",
        "explanation": "PCAP e logs são ativos sensíveis e precisam ser tratados como evidência controlada."
      },
      {
        "number": 12,
        "title": "Produzir RCA curto",
        "instruction": "Escreva hipótese, testes, evidências, conclusão, correção mínima, risco residual e validação pós-correção.",
        "artifact": "RCA com linha do tempo e tabela de evidências.",
        "evidence": "Relatório final com prints/saídas sanitizadas anexadas.",
        "expectedOutput": "Conclusão auditável: serviço, rota, firewall/NAT, DNS, UDP ou aplicação.",
        "explanation": "O resultado do troubleshooting precisa orientar ação segura, não apenas explicar o sintoma."
      }
    ],
    "expectedResult": "O aluno deve conseguir provar, com evidências, se a falha TCP/UDP está no serviço local, bind, rota, firewall, NAT, DNS, retorno, UDP timeout ou camada de aplicação.",
    "validation": [
      {
        "check": "Listener TCP confirmado",
        "command": "ss -tulpen | grep \":8080\" ou netstat/Get-NetTCPConnection",
        "expected": "Porta 8080 em LISTEN no endereço correto.",
        "ifFails": "Corrija serviço parado, bind em 127.0.0.1, porta errada ou permissão."
      },
      {
        "check": "Teste TCP documentado",
        "command": "nc -vz <servidor-ip> 8080; curl -v http://<servidor-ip>:8080/; Test-NetConnection <servidor-ip> -Port 8080",
        "expected": "Conexão aceita e resposta HTTP, ou sintoma classificado corretamente.",
        "ifFails": "Compare refused, timeout, reset e erro HTTP antes de alterar firewall."
      },
      {
        "check": "Handshake ou falha TCP capturada",
        "command": "tcpdump -nn -i any \"host <cliente-ip> and tcp port 8080\"",
        "expected": "SYN/SYN-ACK/ACK ou ausência objetiva de uma etapa.",
        "ifFails": "Confirme interface, IP de cliente, rota e filtro da captura."
      },
      {
        "check": "UDP/DNS testado",
        "command": "dig @<dns-ip> exemplo.com A +time=2 +tries=1 ou Resolve-DnsName",
        "expected": "Resposta DNS ou timeout explicado com captura/log.",
        "ifFails": "Valide resolvedor, rota, firewall UDP e timeout stateful."
      },
      {
        "check": "Logs correlacionados",
        "command": "journalctl/flow logs/firewall logs filtrados pelo 5-tuple e horário",
        "expected": "Linha do tempo compatível com os testes executados.",
        "ifFails": "Ajuste horário, timezone, origem NATada e filtros de log."
      },
      {
        "check": "Evidências sanitizadas",
        "method": "Revisão do relatório e anexos",
        "expected": "Sem tokens, cookies, payload sensível ou nomes internos desnecessários.",
        "ifFails": "Mascarar dados e restringir compartilhamento."
      },
      {
        "check": "RCA produzido",
        "method": "Revisão da hipótese, evidências, causa provável e correção mínima",
        "expected": "Conclusão defensável e ação de menor privilégio.",
        "ifFails": "Reexecutar coleta com escopo melhor definido."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "ss/netstat não mostra LISTEN em 8080",
        "probableCause": "Serviço parado, bind incorreto, porta diferente ou permissão insuficiente.",
        "howToConfirm": "Verificar processo, logs do serviço e comando de inicialização.",
        "fix": "Subir serviço no IP/porta corretos ou corrigir configuração de bind."
      },
      {
        "symptom": "nc/curl retorna connection refused",
        "probableCause": "Host respondeu ativamente recusando conexão ou firewall rejeitou.",
        "howToConfirm": "Captura mostra RST ou log de reject.",
        "fix": "Validar serviço, porta, firewall local e regra de rejeição."
      },
      {
        "symptom": "nc/curl fica em timeout",
        "probableCause": "Filtro silencioso, rota errada, retorno ausente, NAT ou destino indisponível.",
        "howToConfirm": "Capturar no cliente e no servidor e comparar com logs de firewall/flow logs.",
        "fix": "Corrigir política específica, rota ou retorno sem abrir acesso amplo."
      },
      {
        "symptom": "tcpdump não mostra pacotes esperados",
        "probableCause": "Interface errada, filtro restritivo, IP errado, rota diferente ou teste não executado.",
        "howToConfirm": "Usar -i any, confirmar ip route get e reduzir filtro temporariamente dentro do escopo.",
        "fix": "Ajustar interface/filtro e registrar o novo critério de captura."
      },
      {
        "symptom": "UDP/DNS envia consulta sem resposta",
        "probableCause": "Resolvedor errado, firewall UDP, timeout stateful, rota ou serviço DNS indisponível.",
        "howToConfirm": "Captura no cliente/servidor, dig com timeout curto e logs de firewall.",
        "fix": "Corrigir resolvedor, regra UDP específica ou saúde do serviço DNS."
      },
      {
        "symptom": "HTTP responde 401/403/404/500 após TCP conectar",
        "probableCause": "Problema subiu para aplicação, autenticação, autorização, rota HTTP, proxy ou backend.",
        "howToConfirm": "curl -v mostra status e headers; logs de aplicação/proxy confirmam.",
        "fix": "Encaminhar para aplicação/proxy com evidência de que transporte funcionou."
      }
    ],
    "improvements": [
      "Adicionar captura simultânea em cliente e servidor para comparar o ponto exato de perda.",
      "Adicionar cenário com firewall local bloqueando 8080 e registrar diferença entre drop e reject.",
      "Adicionar teste TLS com openssl s_client quando a aplicação usar HTTPS.",
      "Adicionar flow logs de cloud ou firewall corporativo em ambiente simulado.",
      "Transformar o roteiro em runbook NOC/SOC com campos obrigatórios de evidência."
    ],
    "evidenceToCollect": [
      "Tabela de 5-tuple e horário do teste.",
      "Saída de ss/netstat/Get-NetTCPConnection mostrando listener ou ausência dele.",
      "Saída de nc, curl e Test-NetConnection com sintoma classificado.",
      "Trecho tcpdump/Wireshark/tshark com SYN, SYN-ACK, ACK, RST, retransmissão ou UDP timeout.",
      "Saída de dig/Resolve-DnsName para o teste UDP/DNS.",
      "Trecho de log/flow log correlacionado pelo mesmo 5-tuple e horário.",
      "Checklist de sanitização de evidências.",
      "RCA curto com causa provável, correção mínima e validação pós-correção."
    ],
    "questions": [
      "Qual evidência prova que o serviço está escutando no IP correto?",
      "Qual evidência diferencia timeout de connection refused?",
      "Em qual ponto do caminho o pacote desaparece, segundo a captura?",
      "O problema está em transporte ou já subiu para HTTP/aplicação?",
      "Quais dados precisam ser sanitizados antes de compartilhar PCAP/logs?",
      "Qual correção mínima resolve o problema sem ampliar superfície de ataque?"
    ],
    "challenge": "Diagnosticar uma aplicação que funciona localmente, mas falha remotamente em TCP/8443, usando evidências de socket, captura, Test-NetConnection, flow log e log de firewall.",
    "solution": "A solução esperada é montar uma linha do tempo: serviço escutando no servidor, cliente tentando TCP/8443, ausência de SYN no servidor, deny no firewall para a nova VLAN e DNS correto. A causa provável é política desatualizada. A correção segura é liberar apenas origem autorizada, destino específico e TCP/8443, com logging, owner, expiração e validação pós-correção."
  },
  "mentorQuestions": [
    "Qual evidência prova que o serviço está escutando localmente?",
    "Qual evidência prova que o SYN chegou ao servidor?",
    "Qual diferença prática entre timeout, refused e reset?"
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Qual ferramenta Linux moderna mostra sockets e estados de conexão com eficiência?",
      "options": [
        "ss",
        "ls",
        "tar",
        "chmod"
      ],
      "answer": "ss",
      "explanation": "ss consulta informações de sockets e substitui muitos usos tradicionais do netstat."
    },
    {
      "id": "q2",
      "question": "Se um cliente envia SYN repetidamente e não recebe SYN-ACK, o sintoma mais provável é:",
      "options": [
        "Timeout/perda/bloqueio",
        "Conexão estabelecida",
        "DNS sempre correto",
        "Aplicação autenticada"
      ],
      "answer": "Timeout/perda/bloqueio",
      "explanation": "SYN retransmitido sem resposta sugere que o pacote ou o retorno não completou o caminho."
    },
    {
      "id": "q3",
      "question": "Connection refused normalmente indica que:",
      "options": [
        "O host respondeu recusando a conexão ou não há serviço aceitando",
        "O DNS sempre falhou",
        "O cabo está sempre rompido",
        "O UDP confirmou entrega"
      ],
      "answer": "O host respondeu recusando a conexão ou não há serviço aceitando",
      "explanation": "Refused é diferente de timeout; geralmente há resposta ativa de recusa."
    },
    {
      "id": "q4",
      "question": "Por que capturas de pacotes exigem cuidado de segurança?",
      "options": [
        "Podem conter credenciais e dados sensíveis",
        "Nunca contêm dados úteis",
        "Sempre são públicas",
        "Apagam logs automaticamente"
      ],
      "answer": "Podem conter credenciais e dados sensíveis",
      "explanation": "PCAPs podem expor payload, nomes internos, tokens, cookies e metadados."
    },
    {
      "id": "q5",
      "question": "Qual filtro Wireshark ajuda a encontrar retransmissões TCP?",
      "options": [
        "tcp.analysis.retransmission",
        "udp.magic",
        "ip.delete",
        "dns.flush"
      ],
      "answer": "tcp.analysis.retransmission",
      "explanation": "Wireshark marca retransmissões TCP com campos de análise."
    },
    {
      "id": "q6",
      "question": "Em UDP, a ausência de resposta pode indicar:",
      "options": [
        "Filtro, timeout, servidor sem resposta ou retorno bloqueado",
        "Handshake incompleto",
        "FIN_WAIT obrigatório",
        "SYN-ACK ausente"
      ],
      "answer": "Filtro, timeout, servidor sem resposta ou retorno bloqueado",
      "explanation": "UDP não tem handshake; diagnóstico depende de datagramas, resposta, logs e timeout."
    }
  ],
  "flashcards": [
    {
      "front": "O que netstat/ss mostram?",
      "back": "Sockets, portas, estados e, quando permitido, processos associados."
    },
    {
      "front": "O que tcpdump prova?",
      "back": "Que pacotes específicos foram vistos em uma interface no momento da captura."
    },
    {
      "front": "O que Wireshark adiciona?",
      "back": "Análise visual, filtros, interpretação de protocolos e reconstrução temporal."
    },
    {
      "front": "Timeout TCP significa sempre firewall?",
      "back": "Não. Pode ser perda, rota, retorno ausente, filtro, host indisponível ou caminho assimétrico."
    },
    {
      "front": "RST significa o quê?",
      "back": "Encerramento/recusa abrupta de uma conexão TCP por host, serviço, firewall ou aplicação."
    },
    {
      "front": "Por que UDP é mais difícil de diagnosticar?",
      "back": "Porque não tem handshake nem confirmação nativa; depende de resposta de aplicação, captura e logs."
    }
  ],
  "exercises": [
    {
      "id": "e1",
      "title": "Interpretar bind",
      "prompt": "Um serviço escuta em 127.0.0.1:8080. Um cliente remoto consegue acessar? Explique.",
      "expectedAnswer": "Não diretamente. 127.0.0.1 aceita apenas conexões locais no próprio host."
    },
    {
      "id": "e2",
      "title": "Diferenciar sintomas",
      "prompt": "Compare timeout, connection refused e RST em uma tentativa TCP.",
      "expectedAnswer": "Timeout sugere ausência de resposta; refused sugere recusa ativa; RST indica reset abrupto enviado por host/firewall/aplicação."
    },
    {
      "id": "e3",
      "title": "Escolher filtro",
      "prompt": "Crie um filtro tcpdump para tráfego TCP da porta 443 com um IP específico.",
      "expectedAnswer": "sudo tcpdump -n host <ip> and tcp port 443"
    },
    {
      "id": "e4",
      "title": "Linha do tempo",
      "prompt": "Liste as evidências mínimas para provar que um firewall bloqueia um fluxo.",
      "expectedAnswer": "Teste do cliente, captura antes/depois do firewall se possível, log de deny, regra aplicada, horário e 5-tuple."
    },
    {
      "id": "e5",
      "title": "Classificar saída de curl",
      "prompt": "curl -v conecta ao IP, recebe certificado e retorna HTTP 403. Isso ainda é problema de TCP? Explique.",
      "expectedAnswer": "Não como hipótese principal. DNS/rota/TCP/TLS chegaram longe o suficiente; o foco passa a ser autorização, proxy, WAF, regra de aplicação ou política HTTP."
    },
    {
      "id": "e6",
      "title": "Interpretar captura UDP",
      "prompt": "A captura do cliente mostra consulta UDP/53 saindo, mas não mostra resposta. Cite três hipóteses defensivas que precisam ser testadas.",
      "expectedAnswer": "Resolvedor indisponível ou errado, firewall/NAT bloqueando ida ou volta, rota/retorno assimétrico, timeout stateful, serviço DNS não respondendo ou resposta chegando por caminho não capturado."
    }
  ],
  "challenge": {
    "title": "Diagnosticar uma aplicação que funciona localmente, mas falha remotamente",
    "scenario": "Servidor Linux mostra aplicação em execução. Usuários remotos recebem timeout em TCP/8443. Na captura do servidor não aparece SYN. No firewall há deny para origem da nova VLAN. DNS resolve para o IP correto.",
    "tasks": [
      "Identificar a causa provável",
      "Listar evidências",
      "Propor correção mínima",
      "Definir validação pós-correção",
      "Indicar controles para evitar recorrência"
    ],
    "rubric": [
      "Diferencia DNS, rota, firewall e serviço",
      "Usa evidências e não suposições",
      "Propõe regra mínima por origem/destino/porta",
      "Inclui logs e owner",
      "Evita liberação ampla"
    ]
  },
  "commentedSolution": {
    "analysis": "Como o DNS resolve corretamente e o servidor não vê SYN, o pacote não chega ao servidor. O deny no firewall para a nova VLAN é a evidência principal. A aplicação localmente saudável não prova acesso remoto.",
    "steps": [
      "Confirmar 5-tuple do teste",
      "Validar DNS e rota",
      "Verificar captura no servidor sem SYN",
      "Correlacionar horário com log de deny",
      "Atualizar regra mínima para nova VLAN se aprovada",
      "Testar novamente e registrar allow/handshake"
    ],
    "finalAnswer": "A causa provável é política de firewall desatualizada para a nova VLAN. A correção segura é liberar apenas origem autorizada, destino específico, TCP/8443, com logging, owner e revisão de expiração."
  },
  "glossary": [
    {
      "term": "5-tuple",
      "definition": "Conjunto origem, porta de origem, destino, porta de destino e protocolo."
    },
    {
      "term": "Socket",
      "definition": "Ponto lógico de comunicação mantido pelo sistema operacional para um processo."
    },
    {
      "term": "PCAP",
      "definition": "Arquivo de captura de pacotes, geralmente analisado por tcpdump ou Wireshark."
    },
    {
      "term": "SYN retransmitido",
      "definition": "Tentativa TCP repetida porque não houve resposta esperada."
    },
    {
      "term": "RST",
      "definition": "Flag TCP usada para resetar/recusar conexão de forma abrupta."
    },
    {
      "term": "Flow log",
      "definition": "Registro de metadados de fluxo em firewall, cloud ou equipamento de rede."
    }
  ],
  "references": [
    "RFC 9293 — Transmission Control Protocol",
    "RFC 768 — User Datagram Protocol",
    "Documentação tcpdump/libpcap",
    "Documentação Wireshark Display Filters",
    "Documentação Microsoft Get-NetTCPConnection e Test-NetConnection",
    "Documentação Linux ss/iproute2"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e pipelines",
      "reason": "Troubleshooting TCP/UDP em produção precisa de logs, métricas, traces e automação."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Autenticação e serviços corporativos",
      "reason": "Falhas de porta e TLS podem afetar autenticação, SSO, LDAP, Kerberos e integrações."
    }
  ],
  "progressRules": {
    "requiredSections": [
      "content",
      "lab",
      "quiz",
      "challenge"
    ],
    "minimumQuizScore": 70,
    "requiredLabCompletion": true,
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
      "6.9"
    ]
  }
};
