export const lesson0604 = {
  "id": "6.4",
  "moduleId": "m06",
  "order": 4,
  "title": "TCP: confiabilidade, janela, retransmissão e congestionamento",
  "subtitle": "Entenda como o TCP entrega um fluxo confiável sobre uma rede que pode perder, atrasar, duplicar ou reordenar pacotes, e como janela, ACKs, retransmissões e congestionamento impactam desempenho, troubleshooting e segurança.",
  "duration": "120-175 min",
  "estimatedStudyTimeMinutes": 175,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 270,
  "tags": [
    "redes",
    "tcp",
    "confiabilidade",
    "ack",
    "janela tcp",
    "retransmissão",
    "congestionamento",
    "performance",
    "wireshark",
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
      "reason": "A aula explica o papel do transporte acima do IP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "A confiabilidade TCP acontece dentro de um fluxo identificado por sockets e portas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.3",
      "title": "TCP: handshake, estado e encerramento",
      "reason": "Antes de falar de ACKs, janela e retransmissão, é preciso entender como a conexão nasce, mantém estado e encerra."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.8",
      "title": "Métricas: latência, jitter, perda, throughput e disponibilidade",
      "reason": "Perda, latência e throughput influenciam diretamente o comportamento do TCP."
    }
  ],
  "objectives": [
    "Explicar por que TCP precisa de números de sequência e ACKs.",
    "Diferenciar confiabilidade TCP de garantia absoluta de aplicação funcionando.",
    "Interpretar janela TCP, Window Scale, SACK, retransmissões e duplicate ACKs em alto nível.",
    "Relacionar perda, latência, jitter, MTU, MSS e congestionamento com desempenho percebido.",
    "Usar evidências de sistema operacional, captura e logs para investigar lentidão TCP.",
    "Explicar impactos de segurança e operação em firewalls, proxies, load balancers e cloud."
  ],
  "learningOutcomes": [
    "Descrever como o TCP transforma segmentos em um fluxo ordenado de bytes.",
    "Identificar sinais de retransmissão, perda, janela reduzida e congestionamento em uma captura simples.",
    "Separar problema de aplicação, DNS, rota, porta aberta, perda, latência e limitação de janela.",
    "Montar um mini-runbook de investigação de lentidão TCP.",
    "Explicar por que throughput TCP pode ser baixo mesmo com link aparentemente rápido."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Na aula anterior você viu como uma conexão TCP começa, mantém estado e termina. Agora vem a parte que costuma separar quem apenas usa ferramentas de quem realmente entende redes: <strong>como o TCP tenta entregar dados de forma confiável em uma rede que não é confiável</strong>.</p>\n  <p>Pacotes podem se perder, chegar fora de ordem, atrasar, atravessar links congestionados, sofrer fragmentação, encontrar firewalls intermediários ou serem limitados por janelas pequenas. Mesmo assim, aplicações como HTTPS, SSH, bancos de dados, APIs e e-mail esperam receber um fluxo coerente de bytes.</p>\n  <div class='callout'><strong>Ideia central:</strong> TCP não torna a rede perfeita. Ele detecta perdas, confirma recebimento, controla o ritmo de envio e se adapta ao congestionamento para entregar um fluxo ordenado à aplicação.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>O TCP nasceu em um contexto no qual redes distintas precisavam se comunicar sem assumir que todos os enlaces eram confiáveis, rápidos ou homogêneos. Em vez de exigir que cada aplicação criasse sua própria lógica de confirmação, ordenação e retransmissão, o TCP concentrou essas funções na camada de transporte.</p>\n  <p>Com o crescimento da Internet, novos desafios apareceram: congestionamento global, enlaces com latência alta, perdas intermitentes, caminhos assimétricos, satélite, Wi-Fi, VPN, proxies, firewalls e data centers. Por isso, TCP acumulou mecanismos como janela deslizante, controle de fluxo, controle de congestionamento, SACK, Window Scale, timestamps e ajustes de MSS.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>IP entrega pacotes, mas não promete que eles chegarão, que chegarão em ordem, que chegarão uma única vez ou que chegarão rápido. Ethernet entrega frames em um enlace local, mas uma aplicação pode atravessar várias redes, roteadores, firewalls, NATs e links com qualidade diferente.</p>\n  <p>Sem uma camada de confiabilidade, uma transferência de arquivo poderia chegar faltando pedaços, uma resposta HTTPS poderia ser montada fora de ordem e uma aplicação teria que implementar repetidamente confirmação, retransmissão, controle de fluxo e recuperação de perda.</p>\n  <div class='callout callout--problem'><strong>Problema operacional:</strong> quando uma aplicação está lenta, não basta perguntar se a porta está aberta. É preciso investigar perda, latência, retransmissão, janela, MTU, MSS, congestionamento, capacidade do receptor e equipamentos intermediários.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>O TCP evoluiu de uma lógica básica de sequência e confirmação para um conjunto sofisticado de mecanismos adaptativos. A janela deslizante permitiu enviar múltiplos segmentos antes de esperar confirmação. O controle de fluxo impediu que o emissor esmagasse um receptor lento. O controle de congestionamento reduziu a taxa de envio quando a rede dava sinais de saturação.</p>\n  <p>Depois vieram otimizações como Selective Acknowledgment, Window Scale e algoritmos de congestionamento modernos. Em ambientes corporativos, esses detalhes aparecem em problemas reais: banco de dados lento entre regiões, backup que não usa o link inteiro, API que sofre com perda pequena, VPN com MSS incorreto, proxy com timeout curto e balanceador que encerra fluxos longos.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>Confiabilidade TCP</strong> é a capacidade do protocolo de entregar à aplicação um fluxo de bytes ordenado e sem lacunas, usando números de sequência, confirmações, retransmissões e controle de fluxo.</p>\n  <p><strong>Janela TCP</strong> indica quanto dado pode estar “em voo” antes que novas confirmações cheguem. <strong>Retransmissão</strong> ocorre quando o emissor conclui que algo não foi confirmado. <strong>Controle de congestionamento</strong> tenta evitar que o emissor envie mais dados do que a rede consegue transportar.</p>\n  <div class='definition-box'>TCP é confiável do ponto de vista do transporte, mas não garante que a aplicação esteja correta, que o servidor esteja rápido, que o banco responda bem ou que a experiência do usuário seja boa.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>O TCP trata dados como um fluxo de bytes. Cada byte recebe uma posição lógica representada por números de sequência. Quando o receptor recebe dados, ele responde com ACK informando o próximo byte esperado. Se algo some no caminho, o emissor percebe a lacuna por timeout, por ACKs duplicados ou por informações seletivas e retransmite.</p>\n  <ol class='flow-list'>\n    <li>A aplicação entrega dados ao TCP.</li>\n    <li>O TCP divide o fluxo em segmentos respeitando MSS e caminho.</li>\n    <li>Cada segmento recebe número de sequência.</li>\n    <li>O receptor confirma recebimento com ACKs.</li>\n    <li>A janela informa quanto o receptor aceita receber.</li>\n    <li>O emissor ajusta a quantidade de dados em voo.</li>\n    <li>Perda ou atraso excessivo dispara retransmissão.</li>\n    <li>Congestionamento reduz a taxa de envio para preservar a rede.</li>\n  </ol>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura real, desempenho TCP depende de cliente, servidor, sistema operacional, caminho de rede, MTU, MSS, firewalls, proxies, VPNs, NAT, balanceadores, filas, links WAN e cloud. Um problema de throughput raramente é resolvido olhando apenas uma métrica.</p>\n  <table class='data-table'>\n    <thead><tr><th>Componente</th><th>Impacto no TCP</th><th>Sinal comum</th><th>Evidência</th></tr></thead>\n    <tbody>\n      <tr><td>Cliente</td><td>Janela, CPU, aplicação, socket</td><td>Recebimento lento</td><td><code>ss -ti</code>, netstat, monitor de recursos</td></tr>\n      <tr><td>Rede</td><td>Perda, latência, jitter, MTU</td><td>Retransmissões e throughput baixo</td><td><code>mtr</code>, captura, métricas de interface</td></tr>\n      <tr><td>Firewall/NAT</td><td>Estado, timeout, inspeção</td><td>Reset, queda de sessão ou lentidão</td><td>Logs, conn table, flow logs</td></tr>\n      <tr><td>VPN</td><td>MSS, encapsulamento, fragmentação</td><td>Sites abrem parcialmente</td><td>Teste de MTU, MSS clamping, tcpdump</td></tr>\n      <tr><td>Servidor</td><td>Janela anunciada, backlog, aplicação</td><td>Zero Window ou ACK lento</td><td>Logs, CPU, memória, sockets</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine uma transportadora entregando caixas numeradas. O destinatário confirma: “recebi até a caixa 120, mande a 121”. Se a caixa 118 não chegou, ele não consegue montar a sequência completa e pede correção. Se o galpão está cheio, ele avisa para enviar menos caixas por vez. Se a estrada está congestionada, a transportadora reduz o ritmo.</p>\n  <p>Essa analogia mostra sequência, ACK, janela e congestionamento. A limitação é que TCP opera em milissegundos, com múltiplos segmentos em voo, timeouts dinâmicos e decisões baseadas em sinais indiretos da rede.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você baixa um arquivo por HTTPS. O servidor envia vários segmentos TCP. Seu computador confirma os bytes recebidos. Se um segmento se perde no Wi-Fi, o servidor retransmite. Se seu computador estiver ocupado, ele pode anunciar uma janela menor. Se houver congestionamento, o TCP reduz temporariamente a taxa de envio.</p>\n  <p>Para o navegador, o ideal é receber o arquivo inteiro. Para o TCP, o trabalho é garantir que o fluxo chegue ordenado, retransmitindo o que faltar e ajustando o ritmo conforme receptor e rede.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma filial reclama que o ERP central está “lento”. Ping responde, DNS resolve e a porta TCP abre. Sem entender TCP, a investigação poderia parar aí. Mas uma captura mostra retransmissões, duplicate ACKs e throughput baixo. A causa pode estar em perda no link WAN, QoS incorreto, interface com erros, VPN com MTU inadequado ou firewall fazendo inspeção pesada.</p>\n  <p>Em redes corporativas, o diagnóstico precisa cruzar captura TCP, métricas de interface, logs de firewall, rota de ida e volta, NAT, proxy, estado do servidor e experiência da aplicação.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, uma aplicação em uma VPC/VNet acessa um banco em outra região. A conexão TCP abre, mas consultas grandes são lentas. O problema pode estar em latência entre regiões, MTU em túnel, NAT Gateway saturado, security appliance no caminho, load balancer com timeout, ou janela TCP que demora a crescer.</p>\n  <p>Cloud não elimina fundamentos. Route tables, security groups, NACLs/NSGs, firewalls gerenciados, private endpoints, proxies e observabilidade precisam ser analisados junto com sinais TCP.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Um pipeline falha ao publicar artefatos para um registry interno. O erro aparece como timeout. O time aumenta retry e timeout da pipeline, mas o problema real é perda intermitente no caminho entre runner e registry. Uma captura controlada mostra retransmissões TCP e janela reduzida.</p>\n  <p>Em DevSecOps, entender TCP ajuda a diferenciar falha de credencial, DNS, rota, política de firewall, disponibilidade do serviço, limitação de banda, perda e congestionamento. Também evita que o time resolva sintomas com retries infinitos que mascaram problemas de infraestrutura.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Em Segurança, retransmissões e resets podem ser pistas. Um aumento de SYNs sem conclusão pode indicar tentativa de varredura, ataque volumétrico, problema de rota de retorno ou firewall descartando respostas. Um padrão de Zero Window pode indicar servidor saturado. Muitos resets podem indicar política ativa, aplicação rejeitando ou inspeção intermediária.</p>\n  <div class='callout callout--security'><strong>Boa prática:</strong> não conclua causa raiz apenas olhando “porta aberta” ou “ping OK”. Em incidentes, preserve 5-tuple, timestamps sincronizados, logs de firewall, captura de pacotes e evidências do sistema operacional.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 620' role='img' aria-labelledby='m06l04-title m06l04-desc'>\n    <title id='m06l04-title'>TCP confiabilidade, janela, retransmissão e congestionamento</title>\n    <desc id='m06l04-desc'>Diagrama mostrando cliente, rede, servidor, segmentos TCP numerados, ACKs, janela anunciada, perda de segmento e retransmissão.</desc>\n    <defs>\n      <marker id='m06l04-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path>\n      </marker>\n    </defs>\n    <rect x='60' y='70' width='220' height='420' rx='18' class='svg-node svg-node--client'></rect>\n    <text x='170' y='115' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='170' y='145' text-anchor='middle' class='svg-label svg-label--small'>ACKs + janela</text>\n    <rect x='380' y='70' width='220' height='420' rx='18' class='svg-node svg-node--switch'></rect>\n    <text x='490' y='115' text-anchor='middle' class='svg-label'>Rede</text>\n    <text x='490' y='145' text-anchor='middle' class='svg-label svg-label--small'>perda, latência, filas</text>\n    <rect x='700' y='70' width='220' height='420' rx='18' class='svg-node svg-node--server'></rect>\n    <text x='810' y='115' text-anchor='middle' class='svg-label'>Servidor</text>\n    <text x='810' y='145' text-anchor='middle' class='svg-label svg-label--small'>sequência + retransmissão</text>\n    <line x1='700' y1='205' x2='600' y2='205' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l04-arrow)'></line>\n    <line x1='380' y1='205' x2='280' y2='205' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l04-arrow)'></line>\n    <text x='490' y='193' text-anchor='middle' class='svg-label svg-label--small'>SEQ 1000-1999</text>\n    <line x1='700' y1='255' x2='600' y2='255' class='svg-flow svg-flow--blocked animated-flow'></line>\n    <text x='490' y='245' text-anchor='middle' class='svg-label svg-label--small'>SEQ 2000-2999 perdido</text>\n    <line x1='280' y1='315' x2='380' y2='315' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m06l04-arrow)'></line>\n    <line x1='600' y1='315' x2='700' y2='315' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m06l04-arrow)'></line>\n    <text x='490' y='303' text-anchor='middle' class='svg-label svg-label--small'>ACK 2000 + janela 64 KB</text>\n    <line x1='700' y1='375' x2='600' y2='375' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l04-arrow)'></line>\n    <line x1='380' y1='375' x2='280' y2='375' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l04-arrow)'></line>\n    <text x='490' y='363' text-anchor='middle' class='svg-label svg-label--small'>Retransmissão SEQ 2000-2999</text>\n    <rect x='105' y='520' width='770' height='70' rx='16' class='svg-zone'></rect>\n    <text x='490' y='548' text-anchor='middle' class='svg-label'>Sinais de diagnóstico</text>\n    <text x='490' y='575' text-anchor='middle' class='svg-label svg-label--small'>Duplicate ACKs, retransmissions, SACK, janela baixa, RTT alto, MSS/MTU incorreto e congestion window reduzida</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai investigar sinais de confiabilidade TCP usando comandos seguros e, quando possível, uma captura local controlada. O foco não é gerar ataque ou carga artificial indevida, mas aprender a reconhecer perda, retransmissão, janela e latência.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam cálculo conceitual de janela, interpretação de ACKs, identificação de retransmissões e separação entre lentidão de rede e lentidão de aplicação.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário de aplicação lenta entre filial e datacenter. Sua missão é montar uma hipótese técnica com base em RTT, retransmissões, janela anunciada, MSS, rota e logs de firewall.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostra como não cair na armadilha do “ping respondeu, então a rede está boa”. O método cruza captura, métricas, rota, logs e comportamento da aplicação.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>TCP usa sequência, ACKs, janela, retransmissão e controle de congestionamento para entregar um fluxo ordenado sobre uma rede imperfeita. Quando uma aplicação fica lenta, investigar apenas handshake e porta aberta é insuficiente. É preciso analisar perda, RTT, janela, retransmissões, MSS/MTU, capacidade do receptor, filas, firewalls, NATs e balanceadores.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará UDP: por que ele existe, por que remove boa parte da complexidade do TCP, quando isso é vantagem e quais riscos aparecem em aplicações de baixa latência.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 4",
      "Camada 3",
      "Camada 7"
    ],
    "beforeThisLesson": "O aluno entende handshake TCP, estados básicos e encerramento.",
    "afterThisLesson": "O aluno entende como TCP lida com perda, ordenação, janela e congestionamento.",
    "dependsOn": [
      "TCP handshake",
      "Portas",
      "Sockets",
      "RTT",
      "Perda",
      "Firewall stateful",
      "NAT",
      "MTU/MSS"
    ]
  },
  "protocolFields": [
    {
      "field": "Sequence Number",
      "meaning": "Identifica a posição dos bytes dentro do fluxo TCP.",
      "securityNote": "Sequências ajudam a detectar lacunas, retransmissões e tráfego fora de contexto."
    },
    {
      "field": "Acknowledgment Number",
      "meaning": "Indica o próximo byte esperado pelo receptor.",
      "securityNote": "ACKs duplicados podem indicar perda, reordenação ou captura parcial."
    },
    {
      "field": "Window Size",
      "meaning": "Quantidade de dados que o receptor aceita receber sem novas confirmações.",
      "securityNote": "Janela muito baixa pode indicar saturação, limitação artificial ou aplicação lenta."
    },
    {
      "field": "Window Scale",
      "meaning": "Opção TCP que permite janelas maiores que o limite clássico.",
      "securityNote": "Problemas de negociação ou equipamentos antigos podem degradar throughput."
    },
    {
      "field": "SACK Permitted",
      "meaning": "Permite confirmar seletivamente blocos recebidos, ajudando recuperação de perdas.",
      "securityNote": "SACK melhora diagnóstico e recuperação, mas deve ser suportado de forma segura pela pilha TCP."
    },
    {
      "field": "MSS",
      "meaning": "Tamanho máximo de segmento TCP sem cabeçalhos IP/TCP.",
      "securityNote": "MSS incorreto em VPNs pode causar falhas parciais e retransmissões."
    },
    {
      "field": "Retransmission",
      "meaning": "Reenvio de dados não confirmados em tempo ou detectados como perdidos.",
      "securityNote": "Picos de retransmissão podem indicar perda, congestionamento, ataque volumétrico ou inspeção problemática."
    }
  ],
  "packetFlow": [
    "Conexão TCP é estabelecida com handshake.",
    "Aplicação entrega bytes ao TCP.",
    "TCP segmenta os dados usando MSS e numera os bytes.",
    "Segmentos seguem pelo caminho IP até o destino.",
    "Receptor confirma o próximo byte esperado com ACK.",
    "Janela anunciada limita a quantidade de dados em voo.",
    "Perda, ACK duplicado ou timeout acionam retransmissão.",
    "Controle de congestionamento ajusta o ritmo de envio conforme sinais da rede.",
    "Aplicação recebe fluxo ordenado, mesmo que pacotes tenham chegado com perdas ou fora de ordem."
  ],
  "deepDive": {
    "title": "Por que throughput TCP pode ser baixo em link rápido",
    "points": [
      "Throughput TCP depende de largura de banda, RTT, perda, janela e congestionamento, não apenas da velocidade nominal do link.",
      "Perda pequena em links de alta latência pode derrubar drasticamente a taxa efetiva.",
      "Janela pequena limita dados em voo e impede usar todo o caminho.",
      "MSS/MTU incorreto em VPN ou túnel pode gerar fragmentação, blackhole de PMTUD ou retransmissões.",
      "Firewalls, proxies e balanceadores podem ter buffers, inspeção e timeouts que alteram o comportamento do fluxo."
    ]
  },
  "commonMistakes": [
    "Concluir que a rede está boa porque o ping responde.",
    "Confundir porta aberta com aplicação performática.",
    "Ignorar RTT ao avaliar transferência entre regiões ou filiais.",
    "Tratar retransmissão como sempre sendo ataque, sem avaliar perda e congestionamento.",
    "Aumentar timeout de aplicação sem investigar perda ou MSS.",
    "Capturar pacotes em apenas um ponto e concluir causa raiz sem comparar origem, destino e firewall."
  ],
  "troubleshooting": {
    "method": "Investigar desempenho TCP em camadas: confirmar rota e porta, medir RTT e perda, observar retransmissões, janela, MSS, resets, logs de firewall e saúde da aplicação.",
    "windows": [
      "Test-NetConnection <host> -Port <porta>",
      "Get-NetTCPConnection",
      "netstat -ano",
      "pathping <host>",
      "pktmon",
      "Wireshark com filtro tcp.analysis.retransmission"
    ],
    "linux": [
      "ss -ti dst <ip>",
      "ss -tanp",
      "mtr <host>",
      "tracepath <host>",
      "sudo tcpdump -n -i any tcp and host <ip>",
      "curl -w '@curl-format.txt' -o /dev/null -s https://<host>"
    ],
    "cisco": [
      "show interfaces counters errors",
      "show interfaces status",
      "show policy-map interface",
      "show access-lists",
      "show logging",
      "show conn"
    ],
    "cloud": [
      "Consultar flow logs",
      "Verificar métricas de load balancer e target group",
      "Validar MTU/MSS em VPN ou tunnel",
      "Conferir NAT Gateway, firewall appliance e rotas",
      "Comparar métricas entre regiões/zonas"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a TCP: confiabilidade, janela, retransmissão e congestionamento.",
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
        "command": "ipconfig /all && route print && nslookup exemplo.local",
        "purpose": "Coletar configuração local, rotas e resolução DNS.",
        "expectedObservation": "IP, gateway, DNS e rotas coerentes com o cenário.",
        "interpretation": "Falhas nessa etapa indicam problemas de base antes da aplicação."
      }
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Registrar 5-tuple, ação, bytes, duração e motivo de término em firewalls e load balancers.",
      "Monitorar retransmissões, resets e timeouts em serviços críticos.",
      "Validar MTU/MSS em VPNs, túneis e links híbridos.",
      "Proteger serviços contra exposição indevida antes de otimizar performance.",
      "Definir timeouts coerentes em aplicação, proxy, WAF, load balancer e firewall.",
      "Usar TLS e autenticação adequada para proteger o conteúdo acima do TCP."
    ],
    "badPractices": [
      "Abrir portas amplamente para compensar falhas de troubleshooting.",
      "Desativar inspeção ou logs sem análise de risco.",
      "Aumentar retries indefinidamente em pipelines e mascarar perda real.",
      "Ignorar egress control em conexões TCP de saída.",
      "Tratar todo reset como bloqueio malicioso."
    ],
    "attacksAndDefenses": [
      {
        "risk": "SYN flood e exaustão de estado",
        "defense": "Usar mitigação DDoS, SYN cookies quando aplicável, rate limiting, capacidade adequada e monitoramento."
      },
      {
        "risk": "Evasão por fragmentação ou MSS incomum",
        "defense": "Normalização em firewalls, inspeção consistente e validação de MTU/MSS."
      },
      {
        "risk": "Exfiltração por conexões TCP permitidas",
        "defense": "Egress filtering, proxy autenticado, inspeção TLS quando apropriada, DLP e logs."
      },
      {
        "risk": "Timeouts explorados para consumo de recursos",
        "defense": "Timeouts bem definidos, limites por origem, circuit breakers e observabilidade."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em TCP: confiabilidade, janela, retransmissão e congestionamento",
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
    "id": "lab-6.4",
    "title": "Investigando confiabilidade TCP, janela e retransmissões de forma segura",
    "labType": "local",
    "objective": "Observar sinais de desempenho TCP, identificar campos relevantes e montar uma hipótese defensiva sem gerar carga indevida.",
    "scenario": "Laboratório Neste laboratório, você vai investigar sinais de confiabilidade TCP usando comandos seguros e, quando possível, uma captura local controlada. O foco não é gerar ataque ou carga artificial indevida, mas aprender a reconhecer perda, retransmissão, janela e latência.",
    "topology": "Um cliente Windows ou Linux acessando um serviço TCP controlado ou site de teste autorizado, com captura local opcional em Wireshark ou tcpdump.",
    "architecture": "Cliente → rede local → gateway/firewall → serviço TCP autorizado. A investigação coleta evidências no cliente e, se disponível, em firewall/load balancer.",
    "prerequisites": [
      "Windows com PowerShell ou Linux com iproute2",
      "Wireshark ou tcpdump opcional",
      "Acesso apenas a serviços próprios ou explicitamente autorizados",
      "Permissão para coletar evidências sanitizadas"
    ],
    "tools": [
      "Wireshark",
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não execute testes de carga em serviços de terceiros.",
      "Não faça varreduras em redes sem autorização.",
      "Não publique capturas com IPs, domínios, tokens, cookies ou payloads sensíveis.",
      "Prefira reproduzir em laboratório local quando possível."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar o serviço TCP autorizado",
        "instruction": "Escolha um destino autorizado, como um servidor interno de laboratório ou uma aplicação própria.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Destino, porta, protocolo e dono do serviço documentados.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: confiabilidade, janela, retransmissão e congestionamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Validar conectividade básica",
        "instruction": "Use Test-NetConnection no Windows ou nc/curl no Linux para confirmar abertura da porta.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você separa porta fechada de porta aberta com aplicação lenta.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: confiabilidade, janela, retransmissão e congestionamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Medir caminho e latência",
        "instruction": "Use pathping, mtr, traceroute ou tracepath conforme o sistema.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "RTT, perda aparente e saltos problemáticos são identificados com cautela.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: confiabilidade, janela, retransmissão e congestionamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Observar sockets e estado",
        "instruction": "Use ss -ti ou Get-NetTCPConnection/netstat para observar estado e estatísticas do fluxo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você identifica ESTABLISHED, portas efêmeras e, quando disponível, janela/RTT/retransmissões.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: confiabilidade, janela, retransmissão e congestionamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Capturar TCP de forma controlada",
        "instruction": "Use tcpdump ou Wireshark com filtro restrito ao host e porta autorizados.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Captura contém handshake, dados, ACKs e encerramento.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: confiabilidade, janela, retransmissão e congestionamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Investigar MSS/MTU quando houver suspeita",
        "instruction": "Use tracepath, ping com DF quando apropriado ou evidências de MSS em SYN/SYN-ACK.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você identifica se túneis/VPNs podem estar causando fragmentação ou blackhole.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: confiabilidade, janela, retransmissão e congestionamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Cruzar com logs",
        "instruction": "Se disponível, consulte logs de firewall, load balancer ou flow logs no intervalo do teste.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você confirma ação, bytes, duração, resets, timeouts ou drops.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: confiabilidade, janela, retransmissão e congestionamento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Produzir hipótese e recomendação",
        "instruction": "Classifique o problema como aplicação, perda, latência, janela, MTU/MSS, firewall/NAT, rota ou capacidade.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Relatório curto com evidências, hipótese e próximo teste seguro.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TCP: confiabilidade, janela, retransmissão e congestionamento” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “TCP: confiabilidade, janela, retransmissão e congestionamento”.",
    "validation": [
      {
        "check": "5-tuple documentada",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "5-tuple documentada",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Teste de porta realizado",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Teste de porta realizado",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "RTT/perda avaliados",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "RTT/perda avaliados",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Captura ou estatística TCP coletada",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Captura ou estatística TCP coletada",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Hipótese final baseada em evidências",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Hipótese final baseada em evidências",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se não houver captura, verifique permissões de administrador/root.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o teste mostrar timeout, valide rota e firewall antes de investigar janela TCP.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se houver perda apenas em saltos intermediários, considere rate limit de ICMP antes de concluir perda real.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se sites carregam parcialmente em VPN, investigue MTU/MSS.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se a janela for zero ou muito baixa, investigue aplicação/receptor, CPU, memória e buffers.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Repetir o teste em horários diferentes para comparar congestionamento.",
      "Comparar acesso local, via VPN e via rede corporativa.",
      "Adicionar métricas de firewall e load balancer.",
      "Criar runbook de sintomas: timeout, reset, retransmissão, janela zero e MSS incorreto."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “TCP: confiabilidade, janela, retransmissão e congestionamento” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Aplicação lenta entre filial e datacenter",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "expectedOutcome": "O aluno consegue reconhecer sinais de retransmissão, janela limitada, RTT alto e possível problema de MTU/MSS sem depender apenas de ping ou teste de porta."
  },
  "mentorQuestions": [
    "Se a porta TCP abre, mas a aplicação está lenta, quais evidências você coletaria antes de culpar a aplicação?",
    "Por que um link de 1 Gbps pode entregar pouco throughput TCP entre duas regiões?",
    "Como você diferenciaria perda real de ICMP rate-limited em um mtr?"
  ],
  "quiz": [
    {
      "question": "Qual é a função principal dos números de sequência no TCP?",
      "options": [
        "Identificar VLANs",
        "Ordenar bytes no fluxo TCP",
        "Escolher rota default",
        "Resolver nomes DNS"
      ],
      "answer": "Ordenar bytes no fluxo TCP",
      "explanation": "Números de sequência indicam a posição dos bytes dentro do fluxo."
    },
    {
      "question": "O que um ACK normalmente informa?",
      "options": [
        "O próximo byte esperado",
        "O endereço MAC do gateway",
        "A zona DNS autoritativa",
        "A VLAN do host"
      ],
      "answer": "O próximo byte esperado",
      "explanation": "O ACK confirma recebimento até certo ponto e informa o próximo byte esperado."
    },
    {
      "question": "Janela TCP muito pequena pode indicar:",
      "options": [
        "Receptor limitando recebimento",
        "DNS sem registro MX",
        "Gateway sem ARP",
        "OSPF sem área 0"
      ],
      "answer": "Receptor limitando recebimento",
      "explanation": "A janela anuncia quanto o receptor aceita receber."
    },
    {
      "question": "Retransmissões TCP podem ser causadas por:",
      "options": [
        "Perda, congestionamento ou problema de caminho",
        "Apenas senha incorreta",
        "Apenas DNS quebrado",
        "Apenas cabo console desconectado"
      ],
      "answer": "Perda, congestionamento ou problema de caminho",
      "explanation": "Retransmissão ocorre quando dados não são confirmados adequadamente."
    },
    {
      "question": "Por que MSS/MTU importa em VPNs?",
      "options": [
        "Encapsulamento reduz espaço útil e pode causar fragmentação",
        "VPN elimina TCP",
        "MSS define ASN BGP",
        "MTU substitui DNS"
      ],
      "answer": "Encapsulamento reduz espaço útil e pode causar fragmentação",
      "explanation": "Túneis adicionam cabeçalhos e podem exigir MSS menor."
    },
    {
      "question": "Qual afirmação é correta?",
      "options": [
        "Ping OK prova que TCP está performático",
        "Porta aberta prova que aplicação está rápida",
        "TCP confiável não elimina necessidade de troubleshooting",
        "Retransmissão sempre significa ataque"
      ],
      "answer": "TCP confiável não elimina necessidade de troubleshooting",
      "explanation": "TCP tenta recuperar perdas, mas desempenho e disponibilidade dependem de vários fatores."
    }
  ],
  "flashcards": [
    {
      "front": "O que é ACK no TCP?",
      "back": "Confirmação de recebimento que indica o próximo byte esperado."
    },
    {
      "front": "O que é janela TCP?",
      "back": "Quantidade de dados que o receptor aceita receber sem novas confirmações."
    },
    {
      "front": "O que é retransmissão TCP?",
      "back": "Reenvio de dados que não foram confirmados corretamente."
    },
    {
      "front": "O que é MSS?",
      "back": "Maximum Segment Size: tamanho máximo do payload TCP em um segmento."
    },
    {
      "front": "Por que RTT afeta TCP?",
      "back": "ACKs demoram mais a retornar, limitando crescimento e uso da janela."
    },
    {
      "front": "O que Zero Window indica?",
      "back": "O receptor anunciou que não consegue receber mais dados naquele momento."
    }
  ],
  "exercises": [
    {
      "title": "Identificar campos TCP",
      "prompt": "Explique a função de Sequence Number, ACK Number, Window Size e MSS.",
      "expectedAnswer": "Sequência ordena bytes; ACK confirma próximo byte esperado; janela controla dados em voo; MSS limita tamanho do segmento."
    },
    {
      "title": "Diagnóstico de lentidão",
      "prompt": "Uma aplicação abre TCP/443, mas downloads são lentos. Liste cinco causas possíveis relacionadas a TCP/rede.",
      "expectedAnswer": "Perda, RTT alto, janela pequena, MSS/MTU incorreto, congestionamento, firewall/proxy, servidor saturado."
    },
    {
      "title": "VPN e MSS",
      "prompt": "Por que um site pode carregar parcialmente por VPN e funcionar fora dela?",
      "expectedAnswer": "Encapsulamento pode reduzir MTU efetiva e causar fragmentação/blackhole se MSS não for ajustado."
    },
    {
      "title": "Evidências",
      "prompt": "Quais evidências você coletaria antes de alterar uma regra de firewall por lentidão?",
      "expectedAnswer": "5-tuple, teste de porta, mtr/traceroute, captura TCP, logs de firewall/load balancer, métricas de interface e servidor."
    }
  ],
  "challenge": {
    "title": "Aplicação lenta entre filial e datacenter",
    "scenario": "Usuários de uma filial acessam uma aplicação HTTPS no datacenter. DNS resolve, ping responde, TCP/443 abre, mas telas grandes demoram. Captura no cliente mostra retransmissões e duplicate ACKs. mtr mostra RTT alto e pequena perda no destino. O firewall não registra drops, mas a VPN usa encapsulamento adicional.",
    "tasks": [
      "Levantar três hipóteses prováveis.",
      "Definir quais evidências adicionais você coletaria.",
      "Propor uma ação de baixo risco antes de mexer na aplicação.",
      "Explicar por que ping OK não encerra a investigação."
    ],
    "rubric": [
      "Considera perda/RTT e não apenas porta aberta.",
      "Inclui MSS/MTU por causa da VPN.",
      "Cruza captura, mtr, logs e métricas.",
      "Propõe validação controlada antes de mudança ampla."
    ]
  },
  "commentedSolution": {
    "summary": "A hipótese mais forte combina perda/latência na WAN ou VPN com possível MSS/MTU inadequado. A aplicação está acessível, mas o fluxo TCP sofre recuperação de perdas e redução de throughput.",
    "steps": [
      "Confirmar 5-tuple e janela de horário do problema.",
      "Comparar captura no cliente e, se possível, no datacenter.",
      "Verificar retransmissões, duplicate ACKs, MSS negociado e possíveis sinais de fragmentação.",
      "Executar tracepath ou teste equivalente para estimar MTU do caminho.",
      "Consultar métricas da VPN, erros de interface, fila e QoS.",
      "Ajustar MSS clamping em ambiente controlado se confirmado problema de MTU/MSS.",
      "Repetir teste e comparar retransmissões e tempo de resposta."
    ],
    "why": "A evidência indica que a conexão abre, mas a qualidade do transporte está degradada. Alterar a aplicação ou abrir mais portas não resolveria perda, RTT alto ou MSS incorreto."
  },
  "glossary": [
    {
      "term": "ACK",
      "definition": "Confirmação TCP indicando o próximo byte esperado."
    },
    {
      "term": "Sequence Number",
      "definition": "Número que identifica posição dos bytes no fluxo TCP."
    },
    {
      "term": "Janela TCP",
      "definition": "Quantidade de dados que pode ser recebida antes de novas confirmações."
    },
    {
      "term": "Retransmissão",
      "definition": "Reenvio de segmento não confirmado ou detectado como perdido."
    },
    {
      "term": "MSS",
      "definition": "Tamanho máximo de dados TCP por segmento."
    },
    {
      "term": "Congestionamento",
      "definition": "Condição em que a rede não consegue transportar todo o tráfego enviado sem perda ou atraso excessivo."
    }
  ],
  "references": [
    {
      "title": "RFC 9293 — Transmission Control Protocol",
      "type": "rfC",
      "note": "Referência moderna do TCP."
    },
    {
      "title": "RFC 2018 — TCP Selective Acknowledgment Options",
      "type": "rfC",
      "note": "Define SACK."
    },
    {
      "title": "RFC 7323 — TCP Extensions for High Performance",
      "type": "rfC",
      "note": "Window Scale e timestamps."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e troubleshooting",
      "reason": "Métricas e logs ajudam a interpretar lentidão TCP em ambientes reais."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Autenticação e sessões",
      "reason": "TLS, tokens e sessões de aplicação dependem de transporte funcional e seguro."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "Ler todas as seções",
      "Concluir o laboratório",
      "Acertar pelo menos 70% do quiz",
      "Entregar o desafio com evidências"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "6.5"
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
