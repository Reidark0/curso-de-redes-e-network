export const lesson0605 = {
  "id": "6.5",
  "moduleId": "m06",
  "order": 5,
  "title": "UDP: simplicidade, latência e aplicações em tempo real",
  "subtitle": "Entenda por que o UDP existe, como ele troca confiabilidade por simplicidade e baixa latência, onde ele aparece em DNS, VoIP, streaming, jogos, VPNs, QUIC/HTTP/3 e quais cuidados de segurança e troubleshooting são necessários.",
  "duration": "115-170 min",
  "estimatedStudyTimeMinutes": 170,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 265,
  "tags": [
    "redes",
    "udp",
    "transporte",
    "portas",
    "latência",
    "tempo real",
    "dns",
    "voip",
    "streaming",
    "quic",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.1",
      "title": "Por que a camada de transporte existe",
      "reason": "A aula explica por que aplicações precisam de transporte acima do IP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "UDP também usa portas e sockets para separar fluxos de aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.3",
      "title": "TCP: handshake, estado e encerramento",
      "reason": "Comparar UDP com TCP exige entender conexão, estado e handshake."
    }
  ],
  "objectives": [
    "Explicar por que o UDP existe e qual problema ele resolve.",
    "Comparar UDP e TCP sem reduzir UDP a 'TCP piorado'.",
    "Identificar campos fundamentais do cabeçalho UDP e o papel das portas.",
    "Relacionar UDP a DNS, DHCP, NTP, VoIP, streaming, jogos, VPNs, QUIC e telemetria.",
    "Diagnosticar problemas comuns de UDP usando evidências de rede, firewall, sistema operacional e aplicação.",
    "Descrever riscos de segurança associados a UDP e controles defensivos adequados."
  ],
  "learningOutcomes": [
    "Descrever UDP como transporte sem conexão, sem handshake e sem confiabilidade nativa.",
    "Explicar por que baixa latência pode ser mais importante que retransmissão em alguns cenários.",
    "Diferenciar perda tolerável, jitter, reorder, timeout de aplicação e bloqueio por firewall.",
    "Montar um mini-runbook para troubleshooting defensivo de fluxos UDP.",
    "Avaliar quando UDP deve ser permitido, limitado, monitorado ou bloqueado em redes corporativas."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Depois de estudar TCP, é tentador achar que todo protocolo bom precisa de handshake, ACKs, retransmissão, janela e controle de congestionamento. Só que muitos sistemas reais precisam do oposto: <strong>enviar rapidamente uma pequena mensagem e seguir em frente</strong>.</p>\n  <p>DNS geralmente precisa perguntar e responder rápido. Voz e vídeo ao vivo preferem perder um pequeno pedaço a atrasar toda a conversa. Jogos online não querem retransmitir uma posição antiga do jogador. NTP precisa de medições simples de tempo. Algumas VPNs e o QUIC, base do HTTP/3, também usam UDP para construir sua própria lógica acima dele.</p>\n  <div class='callout'><strong>Ideia central:</strong> UDP não é “TCP sem qualidade”. UDP é um transporte mínimo que entrega datagramas para portas de aplicação, deixando confiabilidade, ordenação, retransmissão e controle de sessão para a própria aplicação quando necessário.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>O UDP surgiu para atender aplicações que não precisavam, ou não queriam, todo o custo operacional do TCP. Em vez de estabelecer uma conexão e manter estado complexo, o UDP ofereceu um envelope simples: porta de origem, porta de destino, tamanho e checksum.</p>\n  <p>Com o crescimento da Internet, UDP se tornou base de serviços fundamentais como DNS, DHCP e NTP, além de aplicações em tempo real. Mais recentemente, protocolos modernos passaram a usar UDP como substrato para inovar sem depender de mudanças no TCP dos sistemas operacionais e middleboxes. O exemplo mais conhecido é o QUIC, que implementa controle de conexão, criptografia e multiplexação acima do UDP.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Nem toda comunicação se beneficia de uma conexão confiável tradicional. Se uma aplicação de voz espera retransmissão de cada pacote perdido, a conversa fica atrasada. Se um jogo retransmite uma posição antiga, o dado já não serve. Se uma consulta DNS simples exigisse uma conexão TCP para cada pergunta, parte do ganho de simplicidade seria perdido.</p>\n  <p>O problema é que, ao remover handshake e confiabilidade nativa, o UDP também remove sinais fáceis de diagnóstico. Não existe estado TCP estabelecido, não existe ACK de transporte, não existe retransmissão automática e muitas falhas aparecem como simples silêncio.</p>\n  <div class='callout callout--problem'><strong>Problema operacional:</strong> quando UDP falha, muitas vezes o sintoma é “não respondeu”. A causa pode ser firewall, NAT, timeout de state table, perda, jitter, aplicação, DNS, rota, MTU, rate limit ou servidor não escutando.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>No começo, UDP era usado principalmente por protocolos simples de consulta/resposta e serviços locais. Com o tempo, ele passou a sustentar tráfego sensível a tempo: voz, vídeo, telemetria, jogos, túneis e serviços de controle.</p>\n  <p>Em ambientes modernos, UDP aparece em camadas críticas: DNS em infraestrutura, DHCP em acesso, NTP em tempo, syslog em logs, WireGuard em VPN, QUIC/HTTP/3 em aplicações web modernas e protocolos de observabilidade. Por isso, bloquear UDP indiscriminadamente pode quebrar serviços essenciais; liberar UDP sem controle pode abrir espaço para abuso, amplificação, exfiltração e bypass.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>UDP, User Datagram Protocol</strong>, é um protocolo de transporte sem conexão. Ele entrega datagramas de uma porta de origem para uma porta de destino, usando IP para alcançar o host remoto.</p>\n  <p>UDP não cria sessão antes de enviar, não confirma entrega, não ordena datagramas, não retransmite por conta própria e não controla congestionamento no protocolo base. Isso o torna simples e rápido, mas transfere responsabilidades para a aplicação e para a arquitetura.</p>\n  <div class='definition-box'>UDP fornece multiplexação por portas e integridade básica por checksum. Ele não fornece confiabilidade, ordenação, controle de fluxo ou controle de congestionamento nativos.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>O cabeçalho UDP é pequeno. Ele contém porta de origem, porta de destino, comprimento e checksum. A aplicação entrega um datagrama ao sistema operacional, que encapsula em UDP, depois em IP, depois no enlace. O destino usa a porta de destino para entregar o datagrama ao processo correto.</p>\n  <ol class='flow-list'>\n    <li>A aplicação cria uma mensagem.</li>\n    <li>O sistema operacional associa origem e destino a portas UDP.</li>\n    <li>O datagrama UDP é encapsulado em IPv4 ou IPv6.</li>\n    <li>A rede entrega o pacote usando roteamento IP.</li>\n    <li>O host destino verifica a porta de destino.</li>\n    <li>O datagrama é entregue ao socket da aplicação.</li>\n    <li>Se a aplicação quiser confirmação, retransmissão ou ordenação, ela implementa essa lógica acima do UDP.</li>\n  </ol>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04c-6-5-udp-diagnostics'>\n  <h4>Como diagnosticar UDP sem cair na armadilha do “não respondeu”</h4>\n  <p>Em TCP, o handshake ajuda o analista: é possível observar SYN, SYN-ACK, ACK, RST, FIN e estados. Em UDP, normalmente não há esse roteiro. Uma consulta pode sair e simplesmente não voltar. Por isso, o diagnóstico precisa cruzar <strong>quatro evidências</strong>: o processo está escutando, o pacote saiu, a rede/firewall permitiu ida e volta, e a aplicação respondeu dentro do timeout esperado.</p>\n  <p>O erro comum é testar UDP como se fosse TCP. Um <code>telnet</code> ou teste de porta TCP não prova nada sobre UDP. Para DNS, NTP, syslog, QUIC, WireGuard ou RTP, a pergunta correta é: existe socket UDP, existe pacote no capture, existe resposta, existe log/contador no controle de tráfego e o timeout da aplicação é compatível?</p>\n</div>",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em arquitetura corporativa, UDP aparece em lugares muito diferentes. Alguns fluxos são internos e críticos, como DHCP e NTP. Outros cruzam Internet, VPN, firewalls, balanceadores e provedores, como chamadas de voz, VPNs e QUIC. Cada caso exige política própria.</p>\n  <table class='data-table'>\n    <thead><tr><th>Uso</th><th>Porta comum</th><th>Por que usa UDP</th><th>Cuidado operacional</th></tr></thead>\n    <tbody>\n      <tr><td>DNS</td><td>53/UDP</td><td>Consulta/resposta rápida</td><td>Controlar resolvedores e monitorar exfiltração</td></tr>\n      <tr><td>DHCP</td><td>67/68 UDP</td><td>Descoberta local antes de ter IP completo</td><td>Proteger contra DHCP rogue e starvation</td></tr>\n      <tr><td>NTP</td><td>123/UDP</td><td>Trocas simples de tempo</td><td>Usar fontes confiáveis e evitar exposição indevida</td></tr>\n      <tr><td>VoIP/RTP</td><td>Variável</td><td>Baixa latência e tolerância a perdas pequenas</td><td>QoS, jitter, NAT traversal e monitoramento</td></tr>\n      <tr><td>QUIC/HTTP/3</td><td>443/UDP</td><td>Controle moderno acima do UDP</td><td>Visibilidade, inspeção e política de egress</td></tr>\n      <tr><td>VPNs</td><td>Variável</td><td>Menos overhead e melhor adaptação</td><td>MTU, keepalive, logs e controle de origem</td></tr>\n    </tbody>\n  </table>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04c-6-5-udp-timeout-state'>\n  <h4>UDP, NAT, firewall stateful e timeout</h4>\n  <p>Embora UDP não tenha conexão no protocolo, firewalls e NATs stateful costumam criar um estado temporário quando veem um datagrama de saída. Esse estado permite associar a resposta ao fluxo original. O problema é que o timeout costuma ser curto. Se a resposta demora, se há keepalive mal configurado, se há jitter alto ou se o caminho de retorno muda, o tráfego pode parecer aleatório.</p>\n  <table class='data-table'>\n    <thead><tr><th>Sintoma</th><th>Hipótese UDP</th><th>Evidência útil</th><th>Correção provável</th></tr></thead>\n    <tbody>\n      <tr><td>DNS intermitente</td><td>timeout, rate limit ou resolvedor instável</td><td><code>dig +time=2 +tries=1</code>, logs e captura</td><td>corrigir resolvedor, política ou latência</td></tr>\n      <tr><td>VPN cai ociosa</td><td>estado UDP expira no NAT/firewall</td><td>logs de keepalive e contador de sessões</td><td>ajustar keepalive e timeout</td></tr>\n      <tr><td>Voz robótica</td><td>jitter/perda, não “porta fechada”</td><td>métrica RTP, perda e jitter</td><td>QoS, caminho e capacidade</td></tr>\n      <tr><td>QUIC falha mas HTTPS TCP funciona</td><td>UDP/443 bloqueado ou inspecionado</td><td><code>tcpdump udp port 443</code> e logs de firewall</td><td>permitir/controlar UDP 443 ou forçar fallback</td></tr>\n    </tbody>\n  </table>\n</div>",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>TCP se parece com uma entrega registrada: há confirmação, sequência e reenvio. UDP se parece mais com o envio de cartões rápidos: cada cartão vai com destinatário, mas o serviço básico não liga para confirmar se chegou, nem espera organizar todos em ordem.</p>\n  <p>Essa simplicidade é excelente quando o valor da mensagem depende do tempo. Em uma chamada de voz, um fonema perdido por 20 ms pode ser aceitável; retransmiti-lo um segundo depois atrapalharia mais do que ajudaria.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Seu computador consulta o DNS configurado perguntando qual é o IP de um domínio. A consulta sai normalmente para <code>53/UDP</code>. Se a resposta chega rápido, a aplicação continua. Se não chega, o cliente pode tentar novamente, perguntar outro resolvedor ou falhar por timeout.</p>\n  <p>Perceba que a retransmissão, nesse caso, não é do UDP base. É o cliente DNS ou a biblioteca de resolução decidindo tentar novamente.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, telefones IP usam UDP/RTP para mídia. O SIP pode negociar a chamada, mas a voz em si flui por portas UDP dinâmicas. Se houver perda ou jitter, a chamada fica picotada. Se o firewall permitir sinalização mas bloquear mídia, a chamada pode até iniciar, mas ficar muda.</p>\n  <p>Esse cenário mostra por que troubleshooting UDP exige entender aplicação, portas negociadas, NAT, firewall, QoS, latência, jitter e logs.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, UDP aparece em DNS privado, NTP, VPNs, load balancers que suportam UDP, serviços de streaming e aplicações que usam QUIC/HTTP/3. Diferente de uma LAN simples, há route tables, security groups, NACLs/NSGs, firewalls gerenciados, NAT gateways e balanceadores no caminho.</p>\n  <p>Permitir <code>443/TCP</code> não significa permitir HTTP/3, porque QUIC usa <code>443/UDP</code>. Da mesma forma, liberar DNS para qualquer resolvedor externo pode quebrar governança, split DNS e monitoramento.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em pipelines, containers e Kubernetes, UDP aparece em CoreDNS, service discovery, probes, telemetria, traces, logs, VPNs de cluster e serviços de baixa latência. Uma política de rede que esquece UDP pode quebrar resolução de nomes dentro do cluster.</p>\n  <p>Em IaC, regras de firewall precisam declarar protocolo, porta, origem, destino, justificativa e dono. Abrir “all UDP” por pressa é um problema de segurança e de governança.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>UDP é frequentemente usado em abusos de amplificação e reflexão quando serviços mal configurados ficam expostos. DNS, NTP e outros serviços UDP podem responder com mais dados do que recebem, permitindo que terceiros abusem deles contra vítimas.</p>\n  <p>Defensivamente, o objetivo é reduzir superfície: limitar origem, impedir resolvedores abertos, proteger DHCP, controlar NTP, monitorar egress DNS, registrar fluxos e usar rate limiting quando aplicável.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> UDP deve ser permitido por necessidade explícita, com origem, destino, porta, dono, justificativa, logs e monitoramento. Não trate UDP como tráfego “sem estado e sem importância”.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 620' role='img' aria-labelledby='m06l05-title m06l05-desc'>\n    <title id='m06l05-title'>UDP em redes corporativas</title>\n    <desc id='m06l05-desc'>Diagrama mostrando cliente enviando datagramas UDP para DNS, NTP, voz, QUIC e VPN através de firewall e cloud.</desc>\n    <defs>\n      <marker id='m06l05-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='7' markerHeight='7' orient='auto-start-reverse'>\n        <path d='M 0 0 L 10 5 L 0 10 z' class='svg-flow'></path>\n      </marker>\n    </defs>\n    <rect x='40' y='60' width='180' height='120' rx='18' class='svg-node svg-node--client'></rect>\n    <text x='130' y='105' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='130' y='135' text-anchor='middle' class='svg-label svg-label--small'>sockets UDP</text>\n    <rect x='300' y='60' width='180' height='120' rx='18' class='svg-node svg-node--firewall'></rect>\n    <text x='390' y='102' text-anchor='middle' class='svg-label'>Firewall/NAT</text>\n    <text x='390' y='134' text-anchor='middle' class='svg-label svg-label--small'>estado por timeout</text>\n    <rect x='570' y='40' width='170' height='80' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='655' y='75' text-anchor='middle' class='svg-label'>DNS</text>\n    <text x='655' y='100' text-anchor='middle' class='svg-label svg-label--small'>53/UDP</text>\n    <rect x='770' y='40' width='170' height='80' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='855' y='75' text-anchor='middle' class='svg-label'>NTP</text>\n    <text x='855' y='100' text-anchor='middle' class='svg-label svg-label--small'>123/UDP</text>\n    <rect x='570' y='180' width='170' height='80' rx='16' class='svg-node svg-node--cloud'></rect>\n    <text x='655' y='215' text-anchor='middle' class='svg-label'>QUIC</text>\n    <text x='655' y='240' text-anchor='middle' class='svg-label svg-label--small'>443/UDP</text>\n    <rect x='770' y='180' width='170' height='80' rx='16' class='svg-node svg-node--cloud'></rect>\n    <text x='855' y='215' text-anchor='middle' class='svg-label'>VPN/VoIP</text>\n    <text x='855' y='240' text-anchor='middle' class='svg-label svg-label--small'>portas variáveis</text>\n    <line x1='220' y1='120' x2='300' y2='120' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l05-arrow)'></line>\n    <line x1='480' y1='100' x2='570' y2='80' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l05-arrow)'></line>\n    <line x1='480' y1='115' x2='770' y2='80' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l05-arrow)'></line>\n    <line x1='480' y1='135' x2='570' y2='220' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l05-arrow)'></line>\n    <line x1='480' y1='150' x2='770' y2='220' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l05-arrow)'></line>\n    <rect x='85' y='330' width='810' height='210' rx='18' class='svg-zone'></rect>\n    <text x='490' y='365' text-anchor='middle' class='svg-label'>Decisões defensivas para UDP</text>\n    <text x='490' y='405' text-anchor='middle' class='svg-label svg-label--small'>Permitir somente fluxos necessários por origem, destino, protocolo e porta</text>\n    <text x='490' y='440' text-anchor='middle' class='svg-label svg-label--small'>Controlar DNS externo, DHCP rogue, NTP exposto, QUIC/443 UDP e portas dinâmicas de mídia</text>\n    <text x='490' y='475' text-anchor='middle' class='svg-label svg-label--small'>Registrar flow logs, métricas de perda/jitter, timeouts de NAT e eventos de firewall</text>\n    <text x='490' y='510' text-anchor='middle' class='svg-label svg-label--small'>Lembrar: sem handshake TCP, a ausência de resposta exige evidência em várias camadas</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai observar UDP de forma defensiva usando consultas DNS, sockets locais, captura controlada e comparação entre resposta, timeout e bloqueio. O objetivo é diagnosticar, não gerar tráfego abusivo.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam a identificação de UDP em serviços reais, a escolha de políticas de firewall e a separação entre perda, jitter, timeout e aplicação.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário em que DNS interno funciona parcialmente, chamadas VoIP ficam mudas e HTTP/3 não conecta. Sua missão será montar hipóteses, evidências e controles.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostra como validar origem, destino, porta, política, NAT, timeout, logs, captura e comportamento da aplicação sem assumir que todo silêncio UDP é queda de rede.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>UDP é um transporte simples, sem conexão e sem confiabilidade nativa. Ele é essencial para DNS, DHCP, NTP, voz, vídeo, jogos, VPNs e QUIC. Sua simplicidade reduz overhead e latência, mas exige que a aplicação, a arquitetura e a segurança tratem perda, ordem, repetição, timeouts, abuso e monitoramento.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará portas comuns e serviços corporativos. A ideia será conectar números de portas a serviços reais, riscos de exposição, inventário, firewall e investigação.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 4",
      "Camada 3",
      "Camada 7"
    ],
    "beforeThisLesson": "O aluno entende portas, sockets, TCP, handshake, estado e confiabilidade TCP.",
    "afterThisLesson": "O aluno entende UDP como transporte sem conexão, sabe compará-lo com TCP e consegue diagnosticar fluxos UDP básicos.",
    "dependsOn": [
      "IPv4",
      "roteamento",
      "portas",
      "sockets",
      "DNS",
      "firewall",
      "NAT",
      "logs",
      "jitter",
      "perda"
    ]
  },
  "protocolFields": [
    {
      "field": "Source Port",
      "meaning": "Porta UDP de origem usada pelo processo emissor.",
      "securityNote": "Portas de origem podem ser efêmeras e ajudam a correlacionar fluxos em logs."
    },
    {
      "field": "Destination Port",
      "meaning": "Porta UDP do serviço destino.",
      "securityNote": "Firewall e ACLs normalmente decidem com base em protocolo, origem, destino e porta."
    },
    {
      "field": "Length",
      "meaning": "Tamanho total do datagrama UDP incluindo cabeçalho e dados.",
      "securityNote": "Tamanhos anormais podem indicar abuso, fragmentação, amplificação ou tráfego fora do padrão."
    },
    {
      "field": "Checksum",
      "meaning": "Verificação de integridade do datagrama UDP.",
      "securityNote": "Ajuda a detectar corrupção, mas não autentica origem nem protege conteúdo."
    },
    {
      "field": "Payload",
      "meaning": "Dados da aplicação transportados pelo UDP.",
      "securityNote": "Pode conter DNS, NTP, mídia, telemetria, túnel ou dados sensíveis sem criptografia."
    }
  ],
  "packetFlow": [
    "Aplicação gera uma mensagem que será enviada por UDP.",
    "Sistema operacional cria datagrama com porta de origem, porta de destino, length e checksum.",
    "Datagrama UDP é encapsulado em IP.",
    "Pacote segue pelo roteamento até o destino.",
    "Firewall, NAT ou load balancer podem permitir, negar, traduzir ou criar estado temporário.",
    "Host destino entrega o datagrama ao socket associado à porta de destino.",
    "Aplicação decide se responde, ignora, retransmite em nível de aplicação ou encerra por timeout.",
    "Logs e capturas precisam ser correlacionados porque UDP não tem handshake nativo."
  ],
  "deepDive": {
    "title": "Por que UDP é difícil de diagnosticar",
    "points": [
      "Não há SYN/SYN-ACK/ACK para provar que uma sessão começou.",
      "Muitos firewalls criam estado UDP por timeout, não por conexão real.",
      "Ausência de resposta pode ser bloqueio, perda, rate limit, aplicação silenciosa ou resposta indo por outro caminho.",
      "Aplicações diferentes implementam retries, timeouts e validações de formas diferentes.",
      "UDP pode ser encapsulamento de outro protocolo, como VPN ou QUIC, escondendo complexidade acima do transporte base."
    ],
    "operationalImpact": [
      "UDP exige observabilidade por captura, logs e métricas de aplicação, porque não há estado de conexão nativo como no TCP.",
      "Timeouts de firewall/NAT e keepalives de aplicações precisam ser documentados para evitar falhas intermitentes.",
      "Serviços críticos como DNS, NTP, VPN e QUIC precisam de políticas explícitas, não liberação ou bloqueio genérico."
    ],
    "financialImpact": [
      "Perda, jitter e retries em UDP podem aumentar consumo de banda, logs e suporte operacional mesmo sem licença adicional.",
      "Firewalls gerenciados, NAT Gateways e flow logs em cloud podem gerar custo recorrente ao processar UDP de alto volume.",
      "Bloquear UDP indevidamente pode gerar custo indireto por indisponibilidade de DNS, VPN, voz, vídeo ou HTTP/3."
    ],
    "securityImpact": [
      "UDP é frequentemente usado em amplificação, exfiltração por DNS, túneis e bypass de controles mal configurados.",
      "Permissões UDP devem ser específicas por origem, destino, porta e finalidade, com logs e rate limit quando aplicável.",
      "A ausência de handshake exige controles compensatórios: monitoramento, inventário, allowlists e detecção de anomalias."
    ]
  },
  "commonMistakes": [
    "Dizer que UDP é sempre inseguro ou sempre ruim.",
    "Bloquear todo UDP e quebrar DNS, DHCP, NTP, VPN ou mídia em tempo real.",
    "Liberar UDP para qualquer destino por não saber quais portas a aplicação usa.",
    "Assumir que ausência de resposta significa host desligado.",
    "Ignorar NAT timeout em chamadas, VPNs e fluxos longos.",
    "Esquecer que QUIC usa 443/UDP, não 443/TCP."
  ],
  "troubleshooting": {
    "method": "Validar UDP por evidências: confirmar porta e processo, testar resolução/serviço, comparar origem e destino, observar captura, checar firewall/NAT, validar rota de retorno, medir perda/jitter e revisar logs da aplicação.",
    "windows": [
      "Resolve-DnsName exemplo.com -Server <dns>",
      "Test-NetConnection <host> -Port <porta> -InformationLevel Detailed",
      "netstat -ano -p udp",
      "Get-NetUDPEndpoint",
      "pktmon filter add -p <porta>",
      "Wireshark com filtro udp.port == <porta>"
    ],
    "linux": [
      "ss -uanp",
      "dig @<dns> exemplo.com A",
      "nc -u -vz <host> <porta>",
      "sudo tcpdump -n -i any udp port <porta>",
      "mtr -u <host>",
      "resolvectl query exemplo.com"
    ],
    "cisco": [
      "show access-lists",
      "show logging",
      "show ip route",
      "show interfaces counters errors",
      "show ntp associations",
      "show ip dhcp binding"
    ],
    "cloud": [
      "Consultar flow logs para protocolo UDP",
      "Validar security groups/NSGs/NACLs com protocolo udp",
      "Verificar NAT Gateway e timeout de fluxos UDP",
      "Conferir load balancer UDP quando aplicável",
      "Comparar DNS privado, route tables e firewall gerenciado"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a UDP: simplicidade, latência e aplicações em tempo real.",
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
        "command": "Get-NetUDPEndpoint; netstat -ano -p udp",
        "purpose": "Listar sockets UDP locais e processos associados.",
        "expectedObservation": "Portas UDP locais aparecem com PID quando aplicável.",
        "interpretation": "Se não há socket local, o problema pode ser aplicação/serviço, não rede."
      },
      {
        "platform": "Windows",
        "command": "Resolve-DnsName example.com -Server <dns> -Type A; Test-NetConnection <dns> -Port 53",
        "purpose": "Separar resolução DNS UDP de conectividade TCP genérica.",
        "expectedObservation": "Resolve-DnsName retorna resposta ou timeout; Test-NetConnection testa TCP, não prova UDP.",
        "interpretation": "Use o teste TCP apenas como contexto; DNS UDP precisa de consulta DNS ou captura."
      },
      {
        "platform": "Linux",
        "command": "ss -uanp; sudo lsof -nP -iUDP",
        "purpose": "Ver sockets UDP e processos no Linux.",
        "expectedObservation": "Portas, processos e sockets UDP visíveis.",
        "interpretation": "Confirma se a aplicação escuta ou envia UDP localmente."
      },
      {
        "platform": "Linux",
        "command": "dig @<dns> example.com A +time=2 +tries=1; dig @<dns> example.com A +tcp",
        "purpose": "Comparar DNS por UDP e fallback TCP.",
        "expectedObservation": "UDP responde rápido ou expira; TCP pode responder em cenário diferente.",
        "interpretation": "Se TCP funciona e UDP falha, suspeite de política, fragmentação, timeout ou rate limit."
      },
      {
        "platform": "Linux",
        "command": "sudo tcpdump -n -i any \"udp and (port 53 or port 123 or port 443)\"",
        "purpose": "Capturar tráfego UDP relevante.",
        "expectedObservation": "Datagramas de ida e resposta aparecem, ou apenas ida aparece.",
        "interpretation": "Só ida indica retorno bloqueado, servidor sem resposta, rota assimétrica ou filtro."
      },
      {
        "platform": "Firewall/Cloud",
        "command": "Consultar flow logs por src=<origem>, dst=<destino>, proto=UDP, dport=<porta>",
        "purpose": "Validar decisão do controle de tráfego.",
        "expectedObservation": "ALLOW/DENY, contador, bytes e timestamps coerentes.",
        "interpretation": "Sem log pode indicar caminho errado, zona errada, regra não aplicada ou logging desabilitado."
      }
    ],
    "decisionTree": [
      {
        "if": "Não há socket UDP local",
        "then": "Investigar aplicação/serviço antes de firewall ou rota."
      },
      {
        "if": "Pacote UDP sai, mas não volta",
        "then": "Verificar servidor, rota de retorno, NAT, firewall stateful, timeout e logs do destino."
      },
      {
        "if": "UDP falha e TCP equivalente funciona",
        "then": "Suspeitar de política específica para UDP, fragmentação, inspeção, rate limit ou bloqueio de porta."
      },
      {
        "if": "O serviço é voz, vídeo ou jogo e há perda/jitter",
        "then": "Medir qualidade do caminho, QoS, capacidade e latência, não apenas porta aberta."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Permitir UDP apenas por necessidade explícita e com escopo mínimo.",
      "Controlar resolvedores DNS autorizados e bloquear DNS externo indevido quando a política exigir.",
      "Proteger DHCP com DHCP snooping, segmentação e NAC.",
      "Limitar NTP a fontes confiáveis e impedir exposição indevida.",
      "Registrar flow logs e métricas de perda, jitter e drops em serviços críticos.",
      "Usar criptografia e autenticação na aplicação ou protocolo acima do UDP quando necessário."
    ],
    "badPractices": [
      "Abrir all UDP para Internet por conveniência.",
      "Expor resolvedor DNS recursivo para qualquer origem.",
      "Permitir NTP público sem necessidade e sem hardening.",
      "Ignorar portas dinâmicas de mídia em projetos VoIP.",
      "Bloquear QUIC sem entender impacto em aplicações modernas e sem política clara.",
      "Investigar apenas TCP quando a aplicação usa UDP por baixo."
    ],
    "attacksAndDefenses": [
      {
        "risk": "Amplificação/reflexão UDP",
        "defense": "Não expor serviços UDP desnecessários, aplicar rate limit, BCP38 no provedor e monitorar anomalias."
      },
      {
        "risk": "Exfiltração por DNS",
        "defense": "Forçar resolvedores internos, monitorar queries, detectar domínios anômalos e controlar egress UDP/53."
      },
      {
        "risk": "DHCP rogue",
        "defense": "DHCP snooping, segmentação, 802.1X/NAC e alertas de servidor não autorizado."
      },
      {
        "risk": "NTP abuse",
        "defense": "Restringir origem, usar fontes confiáveis, atualizar serviço e evitar exposição pública desnecessária."
      },
      {
        "risk": "Bypass via QUIC",
        "defense": "Definir política para 443/UDP, inspecionar logs e alinhar proxy/firewall às necessidades de negócio."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em UDP: simplicidade, latência e aplicações em tempo real",
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
    "id": "lab-6.5",
    "title": "Observando UDP, timeout e respostas de aplicação",
    "labType": "security",
    "objective": "Observar fluxos UDP comuns de forma segura, comparar resposta e silêncio, e montar evidências para troubleshooting defensivo.",
    "scenario": "Laboratório Neste laboratório, você vai observar UDP de forma defensiva usando consultas DNS, sockets locais, captura controlada e comparação entre resposta, timeout e bloqueio. O objetivo é diagnosticar, não gerar tráfego abusivo.",
    "topology": "Um computador cliente, um resolvedor DNS permitido, acesso controlado à Internet ou laboratório local, e opcionalmente Wireshark/tcpdump para captura local.",
    "architecture": "Cliente gera consultas UDP; firewall/NAT pode permitir ou negar; serviço destino responde ou não; sistema operacional entrega datagramas ao socket da aplicação.",
    "prerequisites": [
      "Windows ou Linux",
      "Permissão para executar comandos de rede",
      "Opcional: Wireshark ou tcpdump",
      "Opcional: ambiente Packet Tracer ou laboratório local"
    ],
    "tools": [
      "Wireshark",
      "Terminal Linux",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 170,
    "cost": "zero",
    "safetyNotes": [
      "Não gerar tráfego volumétrico ou testes de amplificação.",
      "Não testar serviços de terceiros fora do necessário para resolução DNS comum.",
      "Não capturar tráfego de outras pessoas sem autorização.",
      "Sanitizar IPs, domínios internos e evidências antes de compartilhar."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar resolvedores e rota até eles",
        "instruction": "Colete DNS configurado, rota e gateway antes de culpar UDP.",
        "command": "Windows: ipconfig /all && route print\nLinux: resolvectl status || cat /etc/resolv.conf; ip route get <dns>",
        "expectedOutput": "Resolvedor, interface e rota coerentes.",
        "explanation": "UDP depende de IP e rota; falha básica de rede precisa ser descartada primeiro."
      },
      {
        "number": 2,
        "title": "Gerar consulta DNS UDP controlada",
        "instruction": "Execute uma consulta DNS com timeout curto para observar sucesso ou silêncio.",
        "command": "Windows: Resolve-DnsName example.com -Server <dns> -Type A\nLinux: dig @<dns> example.com A +time=2 +tries=1",
        "expectedOutput": "Resposta A/AAAA ou timeout explícito.",
        "explanation": "DNS é um exemplo clássico de UDP consulta/resposta."
      },
      {
        "number": 3,
        "title": "Comparar com TCP quando aplicável",
        "instruction": "Faça a mesma consulta forçando TCP para separar problema de protocolo.",
        "command": "Linux: dig @<dns> example.com A +tcp\nWindows: nslookup -vc example.com <dns>",
        "expectedOutput": "Resposta por TCP ou erro diferente do UDP.",
        "explanation": "Se TCP funciona e UDP não, a hipótese muda para política, fragmentação, timeout ou inspeção."
      },
      {
        "number": 4,
        "title": "Observar sockets UDP locais",
        "instruction": "Liste sockets UDP para entender quem está escutando ou enviando.",
        "command": "Windows: Get-NetUDPEndpoint; netstat -ano -p udp\nLinux: ss -uanp",
        "expectedOutput": "Portas UDP locais e processos quando disponíveis.",
        "explanation": "Sem processo local, não há serviço para receber datagramas."
      },
      {
        "number": 5,
        "title": "Capturar ida e resposta",
        "instruction": "Capture UDP durante uma consulta controlada.",
        "command": "Linux: sudo tcpdump -n -i any udp port 53\nWireshark: filtro udp.port == 53",
        "expectedOutput": "Consulta saindo e resposta voltando, ou apenas consulta saindo.",
        "explanation": "A captura mostra se o problema está antes ou depois do envio."
      },
      {
        "number": 6,
        "title": "Consultar política e logs",
        "instruction": "Procure decisão de firewall, SG/NACL ou appliance para protocolo UDP.",
        "command": "Cloud: filtrar flow logs por proto=UDP e dport=53/123/443\nLinux: sudo nft list ruleset || sudo iptables -S",
        "expectedOutput": "ALLOW/DENY ou ausência justificada de log.",
        "explanation": "UDP depende muito de política de retorno e timeouts stateful."
      },
      {
        "number": 7,
        "title": "Registrar conclusão com evidências",
        "instruction": "Monte uma tabela com origem, destino, protocolo, porta, comando, resultado e hipótese.",
        "artifact": "Tabela: fluxo | comando | evidência | interpretação | próxima ação",
        "evidence": "prints ou saídas sanitizadas de dig/Resolve-DnsName, ss/netstat, tcpdump e logs.",
        "expectedOutput": "Relatório curto separando aplicação, DNS, firewall, NAT, rota e timeout.",
        "explanation": "Troubleshooting profissional precisa de evidência, não apenas opinião."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “UDP: simplicidade, latência e aplicações em tempo real”.",
    "validation": [
      {
        "check": "Diferenciar consulta com resposta de consulta sem resposta.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Diferenciar consulta com resposta de consulta sem resposta.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Mostrar ao menos uma evidência de porta UDP local.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Mostrar ao menos uma evidência de porta UDP local.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Explicar por que UDP não exibe estado TCP estabelecido.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Explicar por que UDP não exibe estado TCP estabelecido.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Relacionar resultado com firewall, NAT, aplicação ou rota.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Relacionar resultado com firewall, NAT, aplicação ou rota.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se dig/Resolve-DnsName falhar, valide rota, DNS configurado e firewall local.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se tcpdump não mostra tráfego, confirme interface e privilégio.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se aparece query mas não response, investigue destino, firewall, NAT, rota de retorno e serviço remoto.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se há resposta mas aplicação falha, investigue formato, cache, TLS, porta de aplicação ou lógica acima do UDP.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar flow logs de cloud.",
      "Criar política explícita para DNS interno e bloquear DNS externo não autorizado.",
      "Adicionar métricas de jitter/perda para VoIP ou mídia.",
      "Documentar fluxos UDP permitidos no inventário de serviços."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “UDP: simplicidade, latência e aplicações em tempo real” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Diagnóstico UDP em ambiente corporativo",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns."
  },
  "mentorQuestions": [
    "Por que UDP pode ser melhor que TCP para voz ao vivo?",
    "Como você diferencia bloqueio de firewall de aplicação UDP silenciosa?",
    "Por que liberar 443/TCP não garante que HTTP/3 funcionará?"
  ],
  "quiz": [
    {
      "question": "Qual característica define o UDP base?",
      "options": [
        "Handshake obrigatório",
        "Confiabilidade nativa",
        "Transporte sem conexão",
        "Ordenação garantida"
      ],
      "answer": "Transporte sem conexão",
      "explanation": "UDP não estabelece conexão antes de enviar datagramas."
    },
    {
      "question": "Qual serviço usa UDP com frequência para consultas rápidas?",
      "options": [
        "DNS",
        "SSH",
        "HTTPS/TCP clássico",
        "SMTP tradicional"
      ],
      "answer": "DNS",
      "explanation": "Consultas DNS comuns usam UDP/53, embora DNS também possa usar TCP em alguns casos."
    },
    {
      "question": "O que UDP não fornece nativamente?",
      "options": [
        "Portas",
        "Checksum",
        "Retransmissão confiável",
        "Comprimento do datagrama"
      ],
      "answer": "Retransmissão confiável",
      "explanation": "Retransmissão, se existir, precisa ser implementada acima do UDP."
    },
    {
      "question": "Por que UDP é comum em VoIP?",
      "options": [
        "Porque garante entrega perfeita",
        "Porque reduz latência e tolera pequenas perdas",
        "Porque não usa IP",
        "Porque dispensa firewall"
      ],
      "answer": "Porque reduz latência e tolera pequenas perdas",
      "explanation": "Para mídia em tempo real, atraso pode ser pior que uma pequena perda."
    },
    {
      "question": "Qual risco é associado a serviços UDP expostos indevidamente?",
      "options": [
        "Amplificação/reflexão",
        "Apenas lentidão local",
        "Impossibilidade de spoofing",
        "Ausência total de logs"
      ],
      "answer": "Amplificação/reflexão",
      "explanation": "Serviços UDP mal configurados podem ser usados em ataques de reflexão e amplificação."
    },
    {
      "question": "QUIC/HTTP/3 usa normalmente qual transporte?",
      "options": [
        "UDP",
        "ICMP",
        "ARP",
        "STP"
      ],
      "answer": "UDP",
      "explanation": "QUIC roda sobre UDP, frequentemente em 443/UDP."
    }
  ],
  "flashcards": [
    {
      "front": "UDP tem handshake?",
      "back": "Não. UDP é sem conexão e envia datagramas diretamente."
    },
    {
      "front": "UDP garante entrega?",
      "back": "Não. A aplicação deve lidar com perda, repetição ou timeout se precisar."
    },
    {
      "front": "Qual porta UDP é comum para DNS?",
      "back": "53/UDP."
    },
    {
      "front": "Por que voz e vídeo usam UDP?",
      "back": "Porque baixa latência costuma ser mais importante que retransmissão perfeita."
    },
    {
      "front": "O que é 443/UDP em aplicações modernas?",
      "back": "Frequentemente QUIC/HTTP/3."
    },
    {
      "front": "Qual é um controle defensivo importante para UDP?",
      "back": "Permitir por necessidade explícita, com origem/destino/porta definidos e logs."
    }
  ],
  "exercises": [
    {
      "title": "Classificar serviços UDP",
      "prompt": "Classifique DNS, DHCP, NTP, VoIP, QUIC e VPN quanto a porta comum, criticidade e risco.",
      "expectedAnswer": "Tabela com serviço, porta, função, risco e controle."
    },
    {
      "title": "Comparar TCP e UDP",
      "prompt": "Explique por que TCP é melhor para transferência de arquivo e UDP pode ser melhor para voz ao vivo.",
      "expectedAnswer": "TCP prioriza confiabilidade; UDP prioriza simplicidade e baixa latência quando a aplicação tolera perda."
    },
    {
      "title": "Analisar firewall",
      "prompt": "Uma regra permite 443/TCP mas usuários reclamam que HTTP/3 não funciona. Qual hipótese?",
      "expectedAnswer": "HTTP/3/QUIC usa 443/UDP; a política pode bloquear UDP."
    },
    {
      "title": "Timeout DNS",
      "prompt": "Uma consulta DNS UDP sai do cliente mas não volta resposta. Liste cinco causas possíveis.",
      "expectedAnswer": "Firewall, NAT, rota de retorno, resolvedor indisponível, rate limit, serviço não escutando ou perda."
    }
  ],
  "challenge": {
    "title": "Diagnóstico UDP em ambiente corporativo",
    "scenario": "Após endurecimento de firewall, DNS interno funciona para alguns hosts, VoIP inicia chamadas sem áudio e aplicações web modernas deixam de usar HTTP/3. Você precisa diagnosticar sem liberar all UDP.",
    "tasks": [
      "Identificar os fluxos UDP necessários por serviço.",
      "Separar DNS, mídia VoIP e QUIC em hipóteses diferentes.",
      "Definir evidências: captura, logs, flow logs, sockets e testes de aplicação.",
      "Propor regras mínimas e monitoramento.",
      "Explicar riscos de liberar UDP amplamente."
    ],
    "rubric": [
      "Mapeia origem, destino, protocolo e porta por serviço.",
      "Não propõe all UDP como solução genérica.",
      "Inclui evidências técnicas antes da mudança.",
      "Considera NAT timeout, rota de retorno e logs.",
      "Inclui controles de segurança e rollback."
    ]
  },
  "commentedSolution": {
    "summary": "A solução correta divide o problema por serviço. DNS interno exige validar UDP/53 para resolvedores autorizados. VoIP exige sinalização e mídia, normalmente com portas RTP dinâmicas e QoS. HTTP/3 exige 443/UDP para destinos permitidos ou política explícita de bloqueio com fallback planejado.",
    "steps": [
      "Coletar logs de firewall e flow logs por origem/destino/protocolo/porta.",
      "Capturar DNS controlado e comparar query/response.",
      "Validar portas e ranges de mídia VoIP definidos pelo fornecedor.",
      "Verificar se QUIC está bloqueado por política ou por omissão.",
      "Aplicar regras mínimas por serviço e monitorar após a mudança.",
      "Documentar dono, justificativa, validade e rollback."
    ]
  },
  "glossary": [
    {
      "term": "UDP",
      "definition": "Protocolo de transporte sem conexão que entrega datagramas por portas."
    },
    {
      "term": "Datagrama",
      "definition": "Unidade de dados independente enviada pelo UDP."
    },
    {
      "term": "Jitter",
      "definition": "Variação de atraso entre pacotes, crítica para voz e vídeo."
    },
    {
      "term": "Timeout UDP",
      "definition": "Expiração de espera por resposta ou de estado temporário em firewall/NAT."
    },
    {
      "term": "QUIC",
      "definition": "Protocolo moderno sobre UDP usado pelo HTTP/3."
    },
    {
      "term": "Amplificação UDP",
      "definition": "Abuso em que pequenas requisições geram respostas maiores para uma vítima falsificada."
    }
  ],
  "references": [
    "RFC 768 — User Datagram Protocol",
    "RFC 9000 — QUIC: A UDP-Based Multiplexed and Secure Transport",
    "RFC 1035 — Domain Names: Implementation and Specification",
    "RFC 2131 — Dynamic Host Configuration Protocol",
    "RFC 5905 — Network Time Protocol Version 4"
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "Módulo 7",
      "lesson": "7.1",
      "reason": "DNS é um exemplo essencial de UDP em produção."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e serviços",
      "reason": "CoreDNS, policies e service discovery dependem de UDP em muitos cenários."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Autenticação corporativa",
      "reason": "Alguns protocolos de autenticação e tempo dependem de serviços de rede como DNS e NTP."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "Ler todas as seções",
      "Concluir o laboratório",
      "Acertar pelo menos 70% do quiz",
      "Entregar o desafio comentado"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "6.6"
    ],
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
