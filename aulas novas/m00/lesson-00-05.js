export const lesson0005 = {
  "id": "0.5",
  "moduleId": "m00",
  "order": 5,
  "title": "Como sinais físicos carregam dados",
  "subtitle": "Como cobre, fibra e rádio transformam bits em sinais reais — e por que isso muda troubleshooting, disponibilidade e segurança.",
  "duration": "110-155 min",
  "estimatedStudyTimeMinutes": 155,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 175,
  "tags": [
    "fundamentos",
    "camada física",
    "sinais",
    "cobre",
    "fibra",
    "wi-fi",
    "rádio",
    "ruído",
    "interferência",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "A aula 0.1 explica que computadores representam informação por estados interpretados como bits."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A aula 0.2 apresenta bits e bytes, que serão transportados fisicamente."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.4",
      "reason": "A aula 0.4 mostra que taxa de transmissão e throughput dependem do meio físico e de overhead."
    }
  ],
  "objectives": [
    "Explicar por que bits precisam ser convertidos em sinais físicos para atravessar uma rede.",
    "Diferenciar, em nível conceitual, transmissão por cobre, fibra óptica e rádio/Wi‑Fi.",
    "Relacionar ruído, atenuação, interferência, distância e meio compartilhado com sintomas reais de rede.",
    "Identificar evidências básicas de problemas físicos em Windows, Linux e equipamentos Cisco.",
    "Conectar camada física com segurança, disponibilidade, cloud, DevSecOps e troubleshooting profissional."
  ],
  "learningOutcomes": [
    "Dado um sintoma de intermitência, o aluno consegue listar hipóteses de camada física antes de culpar DNS ou aplicação.",
    "Dado um cenário com cabo, fibra ou Wi‑Fi, o aluno consegue apontar riscos e limitações do meio.",
    "Dado um link com velocidade negociada abaixo do esperado, o aluno considera cabo, porta, driver, transceiver e negociação.",
    "Dado um Wi‑Fi com baixa taxa, o aluno considera sinal, canal, obstáculos, interferência e concorrência.",
    "Dado um ambiente corporativo, o aluno entende por que segurança física e rede lógica precisam trabalhar juntas."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Bits, bytes, hexadecimal, UTF‑8 e Mbps são representações abstratas. Nenhum bit atravessa uma rede como um símbolo escrito numa tabela: para sair de um computador e chegar a outro, a informação precisa virar <strong>fenômeno físico</strong> — uma variação elétrica num cabo de cobre, um pulso de luz numa fibra óptica ou uma onda eletromagnética no ar.\n  </p>\n  <p>\n    Muitos problemas que parecem “de IP”, “de DNS” ou “do sistema” começam antes: cabo ruim, conector mal crimpado, fibra dobrada demais, porta negociando velocidade errada, duplex incompatível, interferência no Wi‑Fi, sinal fraco, canal congestionado, ruído elétrico, transceiver inadequado ou distância acima do limite do meio.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> uma aplicação corporativa está intermitente e o usuário diz que “a rede cai”. O ping às vezes responde, às vezes perde pacotes. DNS, IP e firewall estão corretos. Depois de horas, alguém descobre que o cabo passa perto de uma fonte de interferência ou que a porta do switch acumula erros físicos. Sem entender sinais físicos, o troubleshooting começa na camada errada.\n  </div>\n  <p>\n    Em segurança, a camada física também conta: tomadas de rede expostas, racks abertos e Wi‑Fi que ultrapassa paredes dão acesso à rede antes de qualquer controle lógico.\n  </p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    O problema central é: <strong>como fazer um receptor distinguir 0 e 1 num mundo físico imperfeito?</strong> Cabos têm resistência, capacitância e ruído. Fibra sofre atenuação, conectores sujos e perda por curvatura. Rádio sofre interferência, reflexão, obstáculos, colisões, distância, potência baixa e concorrência com outras redes. O receptor não recebe “bits puros”: recebe sinais que precisa medir, sincronizar, filtrar e interpretar.\n  </p>\n  <p>\n    Se o sinal chega forte, limpo e dentro do padrão, a placa de rede reconstrói os bits. Se chega degradado, aparecem erros de quadro, perda, retransmissão, queda de throughput, renegociação de velocidade, latência variável ou desconexão. É por isso que uma rede pode ter IP correto e ainda assim funcionar mal.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem sinal adequado:</strong> não há link físico.</li>\n    <li><strong>Com sinal fraco:</strong> o link pode subir, mas com erros e retransmissões.</li>\n    <li><strong>Com interferência:</strong> pacotes se perdem ou precisam ser reenviados.</li>\n    <li><strong>Com meio compartilhado:</strong> o throughput real cai conforme mais dispositivos disputam o canal.</li>\n    <li><strong>Com instalação ruim:</strong> surgem intermitências difíceis de reproduzir.</li>\n  </ul>\n  <div class=\"callout warning\">\n    <strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Culpar DNS, firewall ou aplicação antes de olhar o link.</strong> DNS é o erro mais lembrado, e o diagnóstico começa fora da camada certa. Verifique link, erros de interface, negociação, cabo, sinal e perda antes de subir de camada.</li>\n      <li><strong>Ignorar a velocidade negociada.</strong> O usuário só vê “conectado”; um cabo ruim pode deixar em 100 Mbps um link que deveria estar em 1 Gbps.</li>\n      <li><strong>Esperar do Wi‑Fi a estabilidade do cabo.</strong> Os dois mostram o ícone de conexão, mas o rádio depende de distância, obstáculos, canal, banda e quantidade de clientes.</li>\n      <li><strong>Confundir velocidade de link com throughput.</strong> Link de 1 Gbps é a taxa do meio, não a vazão útil da aplicação.</li>\n      <li><strong>Usar a camada física como explicação automática.</strong> Sem evidência de link, erro ou sinal, trocar cabos não resolve um problema que é de DNS, rota ou firewall.</li>\n    </ul>\n  </div>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> transportar dados fisicamente é converter bits em sinais capazes de atravessar um meio e depois reconverter esses sinais em bits com erro aceitável.\n  </div>\n  <p>\n    Um <strong>sinal físico</strong> é uma variação mensurável num meio, usada para representar informação. Em redes, essa variação é elétrica, óptica ou eletromagnética. A camada física define meio, conector, frequência, potência, codificação, sincronização, distância máxima, taxa nominal, modo de operação e os requisitos mínimos para que transmissor e receptor entendam o mesmo padrão.\n  </p>\n  <p>\n    Ela não decide endereço IP, rota, porta TCP, DNS nem política de firewall. Só oferece a base para as camadas superiores: se essa base falha, tudo acima fica instável.\n  </p>\n  <h3>Três meios, três jeitos de carregar bits</h3>\n  <p>\n    Telégrafo, telefone e rádio já dependiam de sinais físicos; as redes de computadores padronizaram maneiras de transformar bits em sinais e sinais em bits. Cada meio se popularizou por uma vantagem e carrega uma limitação típica:\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Meio</th><th>Representação física</th><th>Por que se usa</th><th>Limitação comum</th><th>Evolução técnica</th></tr></thead>\n      <tbody>\n        <tr><td>Cobre (par trançado)</td><td>Variação elétrica (tensão/corrente) em pares de fios</td><td>Barato, flexível, fácil de instalar; padrão em LAN</td><td>Interferência, limite de distância, qualidade de crimpagem</td><td>Pares trançados com cancelamento de interferência, categorias de cabo melhores, autonegociação de velocidade</td></tr>\n        <tr><td>Fibra óptica</td><td>Pulsos de luz guiados pela fibra</td><td>Longas distâncias, alta capacidade, imune a interferência eletromagnética</td><td>Transceivers, curvatura, limpeza de conectores, custo</td><td>Lasers e LEDs, diferentes comprimentos de onda, fibras monomodo e multimodo</td></tr>\n        <tr><td>Rádio / Wi‑Fi</td><td>Ondas eletromagnéticas moduladas no ar</td><td>Mobilidade e flexibilidade</td><td>Interferência, obstáculos, canal, meio compartilhado, regulação de espectro, maior exposição</td><td>Modulação mais eficiente, OFDM, MIMO (várias antenas), canais mais largos, bandas de 2,4/5/6 GHz</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>\n    Em datacenters modernos, cabos DAC (cobre de conexão direta), fibra e transceivers de alta velocidade sustentam o grande volume de tráfego leste‑oeste; o que continua difícil é custo, compatibilidade entre módulos e observabilidade física. Cada avanço aumentou capacidade e também a importância de instalação correta, compatibilidade e diagnóstico.\n  </p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Pense numa cadeia de transformação: a aplicação produz dados, os dados viram bytes, os bytes viram bits. A placa de rede, o transceiver ou o rádio transforma os bits em símbolos físicos; o meio transporta o sinal; o receptor mede o sinal, reconstrói os símbolos, recupera os bits e os entrega às camadas superiores.\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Serialização:</strong> os bits são colocados numa sequência transmissível.</li>\n    <li><strong>Codificação/modulação:</strong> a sequência vira padrões físicos detectáveis. Não basta “tensão alta = 1, tensão baixa = 0”: padrões modernos usam transições, múltiplos níveis, modulação, temporização e símbolos para reduzir erro e aumentar eficiência.</li>\n    <li><strong>Transmissão:</strong> o meio carrega energia elétrica, luz ou rádio.</li>\n    <li><strong>Atenuação:</strong> o sinal perde força com distância, conectores, obstáculos ou qualidade do meio.</li>\n    <li><strong>Ruído/interferência:</strong> sinais indesejados dificultam distinguir o dado original.</li>\n    <li><strong>Recepção:</strong> o receptor decide quais padrões representam os bits. Quanto maior a relação sinal‑ruído (SNR: a potência do sinal comparada à do ruído), mais fácil decidir certo.</li>\n    <li><strong>Verificação:</strong> camadas acima da física detectam erros com FCS/CRC e checksums; o quadro corrompido é descartado, e a perda só é recuperada se algum protocolo retransmitir (o próprio Wi‑Fi ou o TCP, por exemplo).</li>\n  </ol>\n  <p>\n    Nem todo erro físico aparece como “cabo desconectado”. Muitas vezes o link continua <em>up</em>, mas com contadores de erro, quedas ocasionais, renegociação, perda de pacotes, throughput baixo ou Wi‑Fi oscilando. Essa é a diferença entre <strong>ausência</strong> de camada física e camada física <strong>degradada</strong>.\n  </p>\n  <h3>Como a degradação aparece nas ferramentas</h3>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Evidência</th><th>Onde ver</th><th>O que sugere</th></tr></thead>\n      <tbody>\n        <tr><td><code>NO-CARRIER</code> / <code>state DOWN</code></td><td><code>ip link</code> (Linux)</td><td>Nenhum sinal detectado: cabo solto ou ruim, porta desligada, adaptador desabilitado</td></tr>\n        <tr><td><code>LOWER_UP</code></td><td><code>ip link</code> (Linux)</td><td>Há sinal (carrier) físico detectado</td></tr>\n        <tr><td>Speed abaixo do esperado (100 Mbps em vez de 1 Gbps)</td><td><code>Get-NetAdapter</code>, <code>ethtool</code>, <code>show interfaces status</code></td><td>Cabo inadequado ou defeituoso, porta antiga, problema de autonegociação</td></tr>\n        <tr><td>Duplex inesperado, <em>late collisions</em></td><td><code>ethtool</code>, <code>show interfaces</code></td><td>Negociação de duplex incompatível entre os dois lados</td></tr>\n        <tr><td>CRC / input errors crescendo</td><td><code>show interfaces counters errors</code></td><td>Quadros chegando corrompidos: cabo, conector, patch panel, interferência ou porta defeituosa</td></tr>\n        <tr><td>Link alternando up/down (<em>flapping</em>)</td><td>Logs e status da porta</td><td>Conector frouxo, cabo danificado, porta ou transceiver com defeito</td></tr>\n        <tr><td>Sinal fraco, taxa Wi‑Fi variando</td><td><code>nmcli dev wifi list</code>, <code>netsh wlan show interfaces</code></td><td>Distância, obstáculos, interferência, canal disputado</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <div class=\"callout\">\n    <strong>Limite do que você vê:</strong> o sistema operacional não mostra todo problema físico. Diagnósticos finos exigem instrumentos profissionais, como certificador de cabos, OTDR (fibra), analisador de espectro e site survey (Wi‑Fi). E como o Wi‑Fi depende do ambiente, um teste isolado pode não representar todos os horários e locais.\n  </div>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>\n    A camada física aparece em todo ponto onde os dados atravessam um meio: patch panel, cabo, fibra, transceiver, porta de switch, rádio Wi‑Fi, antena, interface de servidor, placa do notebook, uplink de firewall e backbone de datacenter. É a parte mais material da rede, e a mais invisível para quem só olha IP e aplicação.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Host:</strong> placa de rede, driver, conector físico ou rádio sem fio.</li>\n    <li><strong>Acesso:</strong> cabo até switch, access point ou tomada de rede.</li>\n    <li><strong>Distribuição:</strong> uplinks entre switches, fibras, transceivers e agregação.</li>\n    <li><strong>Borda:</strong> firewall, roteador, modem, link de operadora e handoff.</li>\n    <li><strong>Cloud:</strong> a camada física é abstraída pelo provedor, mas continua existindo nos datacenters dele.</li>\n  </ul>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Imagine enviar uma mensagem com uma lanterna: piscada curta é 0, piscada longa é 1. Se a pessoa do outro lado conhece o código e vê a luz com clareza, reconstrói a mensagem. Com neblina, distância grande, outra luz piscando, bateria fraca ou obstáculos, ela interpreta errado.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> redes reais não usam só “piscou ou não piscou”, mas múltiplos níveis, frequências, símbolos, correção de erro, sincronização e negociação.\n  </div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Em casa, você conecta um notebook ao roteador usando cabo Ethernet. O sistema mostra link de 1 Gbps. Esse número só é possível porque a placa do notebook, o cabo, o roteador e os conectores conseguiram negociar um padrão físico compatível. Se o cabo estiver ruim, talvez o link negocie 100 Mbps ou fique intermitente.\n  </p>\n  <p>\n    No Wi‑Fi, o mesmo notebook pode estar ao lado do roteador e conseguir boa taxa, mas ao ir para outro cômodo a velocidade cai. O IP não mudou, o DNS não mudou e o site é o mesmo. O que mudou foi o meio físico: distância, parede, reflexão, interferência e qualidade do sinal.\n  </p>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>\n    Numa empresa, a camada física é cabeamento estruturado, rack, patch panel, switches de acesso, uplinks de fibra, portas de firewall, APs no teto, etiquetas, documentação, certificação de cabos e controle de acesso ao datacenter. Uma mudança mal feita no rack pode derrubar uma VLAN inteira. Um transceiver incompatível pode impedir o uplink. Um cabo passando por local inadequado pode gerar erros intermitentes.\n  </p>\n  <p>\n    Também é perímetro: o controle lógico só começa depois que alguém já conseguiu link. Tomadas em salas públicas, portas sem uso habilitadas, APs não autorizados e racks destrancados precisam ser documentados, monitorados e protegidos (veja <em>Segurança</em>).\n  </p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>\n    Em cloud você não crimpa cabo nem limpa conector de fibra, mas a camada física continua por trás da abstração. Instâncias têm limite de throughput de rede e capacidade de NIC virtual; load balancers, gateways, links entre zonas de disponibilidade, storage remoto e tráfego entre regiões dependem da infraestrutura do provedor. Você enxerga métricas, limites e SLAs, não o cabo.\n  </p>\n  <p>\n    O erro comum é achar que “cloud não tem rede física”. Tem, mas abstraída, e o troubleshooting muda: em vez de trocar cabo, você valida limites da instância, métricas de rede, região, zona, caminho, security groups, appliances virtuais, NAT gateways, private endpoints e quotas. A física continua influenciando latência, jitter, perda e capacidade.\n  </p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>\n    Um runner local em Wi‑Fi instável falha ao baixar dependências; um registry interno atrás de um link saturado atrasa builds; um cluster Kubernetes on-premises depende dos uplinks físicos entre nós, storage e ingress. Reiniciar serviços por automação não corrige cabo ruim nem interferência.\n  </p>\n  <p>\n    Em IaC você modela redes virtuais, subnets, rotas e firewalls, mas ambientes híbridos dependem de enlaces físicos: Direct Connect, ExpressRoute, VPN sobre links de operadora, SD-WAN, switches e transceivers. Uma pipeline correta ainda pode falhar por perda de pacote num link físico degradado.\n  </p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <p>\n    O mesmo dado lógico — os bits <code>10110010</code> — pode atravessar três meios, desde que seja convertido em variação elétrica, de luz ou eletromagnética. Os três estão sujeitos a ruído, atenuação e interferência.\n  </p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 430\" role=\"img\" aria-labelledby=\"m00l05-title m00l05-desc\">\n    <title id=\"m00l05-title\">Bits representados por sinais físicos em cobre, fibra e rádio</title>\n    <desc id=\"m00l05-desc\">Um transmissor converte bits em sinais que podem atravessar cabo de cobre, fibra óptica ou rádio até um receptor, sujeito a ruído, atenuação e interferência.</desc>\n    <defs>\n      <marker id=\"m00l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"35\" y=\"170\" width=\"145\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"107\" y=\"198\" text-anchor=\"middle\" class=\"svg-label\">Transmissor</text>\n    <text x=\"107\" y=\"224\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bits: 10110010</text>\n\n    <rect x=\"790\" y=\"170\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"865\" y=\"198\" text-anchor=\"middle\" class=\"svg-label\">Receptor</text>\n    <text x=\"865\" y=\"224\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">interpreta sinais</text>\n\n    <rect x=\"250\" y=\"45\" width=\"460\" height=\"80\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"73\" text-anchor=\"middle\" class=\"svg-label\">Cobre</text>\n    <path d=\"M290 100 L330 65 L370 100 L410 65 L450 100 L490 65 L530 100 L570 65 L610 100 L650 65\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <text x=\"480\" y=\"118\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">variação elétrica: tensão/corrente</text>\n\n    <rect x=\"250\" y=\"175\" width=\"460\" height=\"80\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"203\" text-anchor=\"middle\" class=\"svg-label\">Fibra óptica</text>\n    <line x1=\"295\" y1=\"228\" x2=\"665\" y2=\"228\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <circle cx=\"335\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <circle cx=\"425\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <circle cx=\"515\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <circle cx=\"605\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <text x=\"480\" y=\"248\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">pulsos de luz guiados pela fibra</text>\n\n    <rect x=\"250\" y=\"305\" width=\"460\" height=\"80\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"333\" text-anchor=\"middle\" class=\"svg-label\">Rádio / Wi‑Fi</text>\n    <path d=\"M305 358 C365 318, 420 398, 480 358 S595 318, 655 358\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <text x=\"480\" y=\"378\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">onda eletromagnética compartilhada no ar</text>\n\n    <line x1=\"180\" y1=\"210\" x2=\"250\" y2=\"85\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"180\" y1=\"210\" x2=\"250\" y2=\"215\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"180\" y1=\"210\" x2=\"250\" y2=\"345\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n\n    <line x1=\"710\" y1=\"85\" x2=\"790\" y2=\"210\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"710\" y1=\"215\" x2=\"790\" y2=\"210\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"710\" y1=\"345\" x2=\"790\" y2=\"210\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n\n    <rect x=\"350\" y=\"5\" width=\"260\" height=\"30\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"480\" y=\"26\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ruído, atenuação, interferência e erro</text>\n  </svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> a camada física traduz informação abstrata em fenômeno mensurável. Se o sinal chega degradado, as camadas superiores podem estar corretas e a comunicação ainda fica instável.</li>\n    <li><strong>Três meios:</strong> cobre usa variação elétrica (barato, comum em LAN); fibra usa luz (distância e capacidade, mas exige cuidado com conectores e curvatura); Wi‑Fi usa rádio (mobilidade, mas sofre com interferência e meio compartilhado).</li>\n    <li><strong>Degradado não é desligado:</strong> o link pode estar <em>up</em> e ainda ter perda, intermitência, velocidade negociada baixa e erros CRC.</li>\n    <li><strong>Segurança:</strong> portas físicas, racks, Wi‑Fi e dispositivos não autorizados precisam de controle; conectividade física não é autorização.</li>\n    <li><strong>Método:</strong> antes de culpar DNS ou aplicação, valide link, velocidade/duplex, sinal, meio e contadores de erro.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula <strong>0.6 — Latência, largura de banda e throughput</strong>, você vai separar três medidas que aparecem em quase todo diagnóstico: quanto cabe no caminho, quanto realmente passa e quanto tempo os dados levam para ir e voltar.\n  </p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "Ethernet",
      "Wi‑Fi",
      "IEEE 802.3",
      "IEEE 802.11"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "taxa de transmissão",
      "representação digital"
    ],
    "enables": [
      "Ethernet",
      "Wi‑Fi",
      "camada de enlace",
      "endereço MAC",
      "switching",
      "troubleshooting físico",
      "segurança de acesso à rede"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Link down",
      "Link alternando entre up e down",
      "Velocidade negociada abaixo do esperado",
      "Perda de pacotes intermitente",
      "Wi‑Fi com sinal fraco ou oscilante",
      "Erros CRC/input errors em interfaces",
      "Throughput muito abaixo do esperado"
    ],
    "diagnosticQuestions": [
      "O problema ocorre no cabo e no Wi‑Fi ou apenas em um meio?",
      "A interface está up? Qual velocidade foi negociada?",
      "Há contadores de erro na porta do switch?",
      "O cabo, conector, patch panel ou transceiver foram alterados recentemente?",
      "No Wi‑Fi, o problema varia por distância, sala, horário ou quantidade de usuários?",
      "Há fonte de interferência, curva excessiva de fibra ou tomada em área pública?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetAdapter | Format-Table Name, Status, LinkSpeed\nipconfig /all",
        "purpose": "Ver estado da interface, velocidade negociada e dados básicos de rede.",
        "expectedObservation": "Interface conectada com velocidade coerente, como 1 Gbps no cabo ou taxa compatível no Wi‑Fi.",
        "interpretation": "Se a velocidade estiver abaixo do esperado, investigue cabo, porta, driver, adaptador ou negociação."
      },
      {
        "platform": "Linux",
        "command": "ip link\nethtool eth0  # ajuste o nome da interface\nnmcli dev wifi list  # quando aplicável",
        "purpose": "Ver interfaces, link, velocidade, duplex e redes Wi‑Fi visíveis.",
        "expectedObservation": "Interface UP, velocidade e duplex coerentes, sem sinais óbvios de falha.",
        "interpretation": "Velocidade reduzida, link oscilando ou ausência de carrier indica hipótese física."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status\nshow interfaces counters errors\nshow interfaces gigabitEthernet 0/1",
        "purpose": "Ver estado, VLAN, velocidade, duplex e erros físicos em portas de switch.",
        "expectedObservation": "Porta connected, speed/duplex esperados e contadores de erro baixos ou zerados.",
        "interpretation": "CRC, input errors, late collisions ou flaps indicam investigação física ou de negociação."
      }
    ],
    "decisionTree": [
      {
        "if": "Interface está down",
        "then": "Verificar cabo, porta, adaptador, energia do equipamento e estado administrativo da porta."
      },
      {
        "if": "Interface está up, mas com velocidade baixa",
        "then": "Trocar cabo, testar outra porta, validar categoria do cabo e autonegociação."
      },
      {
        "if": "Wi‑Fi oscila por local",
        "then": "Verificar sinal, obstáculos, canal, banda, potência, quantidade de clientes e roaming entre APs; para pontos fixos, considerar cabo."
      },
      {
        "if": "Há erros CRC em switch",
        "then": "Investigar cabo, conector, patch panel, interferência ou porta defeituosa."
      },
      {
        "if": "Físico parece estável",
        "then": "Subir para camada 2, IP, rota, DNS, firewall e aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar pontos de rede, racks, patch panels e uplinks, com etiquetagem de cabos.",
      "Desabilitar (shutdown) as portas de switch não utilizadas.",
      "Usar 802.1X, NAC ou port security quando aplicável, com VLAN de quarentena para dispositivos desconhecidos.",
      "Controlar o acesso físico a salas técnicas, racks e datacenters (fechadura, câmeras, lacres, registro de mudança).",
      "Planejar o Wi‑Fi com site survey, segmentação, criptografia forte e rede de visitantes separada da corporativa.",
      "Usar cabos e transceivers homologados."
    ],
    "badPractices": [
      "Deixar tomadas de rede ativas em áreas públicas sem controle.",
      "Manter racks destrancados.",
      "Permitir APs pessoais ou switches não gerenciados na rede corporativa.",
      "Ignorar alertas de porta flapping ou mudança de MAC.",
      "Tratar Wi‑Fi corporativo como rede doméstica sem planejamento."
    ],
    "commonErrors": [
      "Confundir conectividade física com autorização de acesso.",
      "Achar que o firewall de borda protege contra acesso físico interno sem controles adicionais.",
      "Desconsiderar que o sinal Wi‑Fi ultrapassa paredes e amplia a superfície de exposição.",
      "Não registrar mudanças físicas em racks e portas."
    ],
    "vulnerabilities": [
      {
        "name": "Acesso físico a porta de rede ativa",
        "description": "Uma porta habilitada pode permitir que um dispositivo não autorizado obtenha conectividade.",
        "defensiveExplanation": "O risco não exige explorar protocolo avançado; basta acesso ao ponto físico e ausência de controle de autenticação.",
        "mitigation": "Desabilitar portas não usadas, aplicar 802.1X/NAC, monitorar MACs novos e restringir VLANs."
      },
      {
        "name": "Rogue access point",
        "description": "Um AP não autorizado pode criar caminho sem fio para a rede interna.",
        "defensiveExplanation": "O atacante ou usuário descuidado conecta um rádio à rede cabeada e expõe a LAN pelo ar.",
        "mitigation": "Inventário, inspeção, monitoramento wireless, port security e políticas claras."
      },
      {
        "name": "Rack ou sala técnica sem controle de acesso",
        "description": "Quem alcança switches e patch panels pode desconectar, trocar ou adicionar cabos e dispositivos.",
        "defensiveExplanation": "O acesso físico ao equipamento contorna controles lógicos: permite desconexão, sniffing local ou alteração de cabos sem passar por autenticação.",
        "mitigation": "Controle de acesso físico, câmeras, lacres, etiquetagem e registro de toda mudança física."
      },
      {
        "name": "Indisponibilidade por interferência ou sabotagem física",
        "description": "Interferência, desconexão ou manipulação física pode degradar ou derrubar comunicação.",
        "defensiveExplanation": "O impacto principal é disponibilidade; a resposta envolve monitoramento, redundância e controle físico.",
        "mitigation": "Redundância, controle de acesso, câmeras, alertas de link, site survey e documentação."
      }
    ],
    "monitoring": [
      "Alertas de link up/down frequentes (flapping).",
      "Mudanças de velocidade/duplex.",
      "Contadores CRC/input errors crescentes.",
      "Novos MACs em portas sensíveis.",
      "APs desconhecidos ou SSIDs suspeitos próximos ao ambiente.",
      "Eventos de autenticação 802.1X/NAC negados."
    ],
    "detectionIdeas": [
      "Comparar o inventário esperado com os dispositivos conectados.",
      "Correlacionar quedas de rede com mudanças físicas registradas."
    ]
  },
  "lab": {
    "id": "lab-0.5",
    "title": "Observando evidências de camada física no computador",
    "labType": "security",
    "objective": "Identificar estado de interface, velocidade negociada e sinais básicos de diferença entre cabo, Wi‑Fi e meio físico.",
    "scenario": "Você investiga se uma instabilidade pode estar relacionada à camada física. O laboratório é local: usa só comandos nativos no seu próprio computador, sem Packet Tracer nem acesso administrativo a equipamentos corporativos, e coleta evidências sem modificar a rede. Quando possível, compare cabo e Wi‑Fi.",
    "topology": "Notebook ou desktop -> cabo Ethernet ou Wi‑Fi -> roteador/switch/AP -> rede local",
    "architecture": "Um host final conectado por meio físico cabeado ou sem fio a um equipamento de acesso.",
    "prerequisites": [
      "Ter um computador com Windows ou Linux.",
      "Ter acesso a uma rede local própria ou autorizada.",
      "Opcional: conexão cabeada e Wi‑Fi para comparação."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Comandos nativos do sistema",
      "Opcional: acesso somente leitura a switch/roteador em laboratório"
    ],
    "estimatedTimeMinutes": 40,
    "cost": "zero",
    "safetyNotes": [
      "Colete informações apenas do seu próprio host ou de um laboratório autorizado.",
      "Não desconecte cabos, não conecte dispositivos desconhecidos e não faça testes de interferência em redes de terceiros ou corporativas."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar interfaces no Windows",
        "instruction": "No PowerShell, liste as interfaces e observe status e velocidade.",
        "command": "Get-NetAdapter | Format-Table Name, InterfaceDescription, Status, LinkSpeed",
        "expectedOutput": "Lista de interfaces com Status Up/Disconnected e LinkSpeed como 1 Gbps, 100 Mbps ou taxa Wi‑Fi.",
        "explanation": "A velocidade negociada é uma evidência física. Um cabo ou porta ruim pode negociar abaixo do esperado."
      },
      {
        "number": 2,
        "title": "Identificar configuração IP no Windows",
        "instruction": "Veja se a interface conectada recebeu IP, gateway e DNS.",
        "command": "ipconfig /all",
        "expectedOutput": "Interface ativa com IPv4, máscara, gateway e DNS quando conectada a uma rede comum.",
        "explanation": "IP correto não prova que a camada física está perfeita, mas ajuda a separar ausência de link de falha de configuração."
      },
      {
        "number": 3,
        "title": "Identificar interfaces no Linux",
        "instruction": "No Linux, veja estado das interfaces.",
        "command": "ip link\nip addr",
        "expectedOutput": "Interfaces com estados como UP, LOWER_UP ou DOWN e endereços associados.",
        "explanation": "LOWER_UP indica que há sinal/carrier físico detectado em muitas interfaces."
      },
      {
        "number": 4,
        "title": "Ver velocidade e duplex no Linux",
        "instruction": "Se tiver ethtool instalado e uma interface cabeada, consulte detalhes físicos.",
        "command": "sudo ethtool eth0  # troque eth0 pelo nome real, como enp3s0",
        "expectedOutput": "Speed, Duplex, Auto-negotiation e Link detected.",
        "explanation": "Speed e Duplex ajudam a diagnosticar negociação incorreta, cabo ruim ou porta incompatível."
      },
      {
        "number": 5,
        "title": "Observar o Wi‑Fi",
        "instruction": "Se estiver usando Wi‑Fi, veja sinal, canal e taxa da conexão (Windows) ou das redes visíveis (Linux).",
        "command": "netsh wlan show interfaces  # Windows\nnmcli dev wifi list  # Linux",
        "expectedOutput": "No Windows: SSID, tipo de rádio, canal, taxa de recepção/transmissão e sinal em %. No Linux: SSIDs, canal, taxa e barras/sinal.",
        "explanation": "Wi‑Fi depende do ambiente. Sinal fraco ou canal disputado pode explicar baixa taxa e instabilidade."
      },
      {
        "number": 6,
        "title": "Comparar cabo e Wi‑Fi quando possível",
        "instruction": "Faça um ping para o gateway usando cabo e depois Wi‑Fi, se ambos estiverem disponíveis. No Linux, limite a quantidade de pacotes.",
        "command": "ping <IP_DO_GATEWAY>  # Windows envia 4 pacotes\nping -c 20 <IP_DO_GATEWAY>  # Linux",
        "expectedOutput": "Respostas com baixa latência e 0% de perda em cenário normal.",
        "explanation": "Diferenças grandes entre cabo e Wi‑Fi sugerem que o meio físico ou rádio pode ser parte do problema."
      },
      {
        "number": 7,
        "title": "Registrar evidências",
        "instruction": "Monte uma tabela com: meio (cabo ou Wi‑Fi), interface, estado do link, velocidade/duplex ou sinal, latência média e perda do ping, e qualquer oscilação observada.",
        "analysisTask": "Para cada meio testado, escreva se a evidência confirma ou descarta uma hipótese física (cabo, porta, negociação, sinal, interferência) e por quê.",
        "expectedOutput": "Pequeno relatório com evidências de camada física.",
        "explanation": "Troubleshooting profissional depende de evidência, não de impressão subjetiva."
      }
    ],
    "expectedResult": "O aluno deve conseguir identificar a interface ativa, o meio usado, a velocidade negociada ou indícios de sinal, e relacionar essas evidências com sintomas de rede.",
    "validation": [
      {
        "check": "Interface ativa identificada",
        "command": "Get-NetAdapter  # Windows\nip link  # Linux",
        "expected": "Interface conectada aparece como Up/LOWER_UP ou equivalente.",
        "ifFails": "Verifique se o cabo está conectado, se o Wi‑Fi está ligado ou se a interface está desabilitada."
      },
      {
        "check": "Velocidade ou meio físico registrado",
        "command": "Get-NetAdapter  # Windows\nethtool <interface>  # Linux",
        "expected": "Velocidade negociada ou informações de link disponíveis.",
        "ifFails": "Use outro adaptador, instale ferramenta apropriada ou registre a limitação do ambiente."
      },
      {
        "check": "Gateway responde",
        "command": "ping <IP_DO_GATEWAY>",
        "expected": "Respostas sem perda significativa em rede saudável.",
        "ifFails": "Validar link, IP, gateway, firewall local ou isolamento da rede."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Comando não mostra velocidade no Linux",
        "probableCause": "Interface Wi‑Fi (ethtool não mostra velocidade de rádio), driver sem suporte ou ethtool não instalado.",
        "howToConfirm": "Verificar nome da interface e instalar/usar ferramentas disponíveis.",
        "fix": "Use ip link, nmcli ou ferramenta do ambiente e registre a limitação."
      }
    ],
    "improvements": [
      "Repetir o teste com outro cabo e comparar a velocidade negociada.",
      "Comparar 2,4 GHz e 5/6 GHz, quando sua rede permitir.",
      "Em laboratório com switch, coletar contadores de erro da porta (show interfaces counters errors)."
    ],
    "evidenceToCollect": [
      "Saída do comando de interfaces.",
      "Velocidade negociada ou meio utilizado.",
      "Resultado de ping para o gateway.",
      "Observações sobre cabo, Wi‑Fi, distância e ambiente.",
      "Hipóteses físicas descartadas ou confirmadas."
    ],
    "questions": [
      "Por que IP correto não garante camada física saudável?",
      "Que diferença você observou entre cabo e Wi‑Fi?",
      "Qual evidência indicaria cabo ruim?",
      "Qual evidência indicaria interferência no Wi‑Fi?"
    ],
    "challenge": "Criar um checklist de 10 itens para investigar instabilidade de rede começando pela camada física.",
    "solution": "Um bom checklist começa por link up/down, velocidade negociada, cabo, porta, patch panel, Wi‑Fi/sinal, distância, interferência, contadores de erro, mudanças recentes e comparação com outro meio. Só depois sobe para IP, rota, DNS e aplicação."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que não basta dizer que redes transportam bits?",
      "hints": [
        "Pense no que existe entre dois computadores.",
        "Bits precisam virar algo mensurável."
      ],
      "expectedIdeas": [
        "sinal físico",
        "meio",
        "energia",
        "luz",
        "rádio",
        "interpretação pelo receptor"
      ],
      "explanation": "A rede depende de uma tradução entre informação lógica e fenômeno físico. Sem isso, os bits não atravessam o meio."
    },
    {
      "type": "diagnóstico",
      "question": "Um host tem IP e gateway corretos, mas perde pacotes de forma intermitente. O que verificar antes de culpar DNS?",
      "hints": [
        "Pense em link, cabo, Wi‑Fi e erros.",
        "DNS não explica perda para o gateway."
      ],
      "expectedIdeas": [
        "estado da interface",
        "velocidade negociada",
        "cabo",
        "porta",
        "sinal Wi‑Fi",
        "erros de interface",
        "ping para gateway"
      ],
      "explanation": "Perda intermitente para destinos básicos sugere validar camadas inferiores antes de investigar nomes ou aplicação."
    },
    {
      "type": "cenário real",
      "question": "Uma sala de reunião tem tomadas de rede ativas e acesso público. Qual é o risco e como mitigar?",
      "hints": [
        "Pense em acesso físico à LAN.",
        "Firewall de borda não resolve tudo."
      ],
      "expectedIdeas": [
        "porta exposta",
        "dispositivo não autorizado",
        "802.1X",
        "NAC",
        "desabilitar portas",
        "monitorar MAC",
        "VLAN restrita"
      ],
      "explanation": "Segurança de rede começa antes de IP: uma porta física ativa pode criar acesso interno sem autenticação se não houver controle."
    }
  ],
  "quiz": [
    {
      "id": "q0.5.1",
      "question": "O que a camada física faz em uma rede?",
      "options": [
        "Converte bits em sinais transportáveis por um meio e sinais de volta em bits.",
        "Traduz nomes DNS em endereços IP.",
        "Define regras de firewall entre sub-redes.",
        "Escolhe a melhor rota BGP para a Internet."
      ],
      "answer": 0,
      "explanation": "A camada física trata da transmissão real de sinais no meio. DNS, firewall e BGP pertencem a camadas/assuntos superiores.",
      "topic": "camada física",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.5.2",
      "question": "Qual alternativa descreve melhor a fibra óptica?",
      "options": [
        "Usa pulsos de luz e é menos suscetível a interferência eletromagnética.",
        "Usa ondas de rádio e sempre tem menor latência que cabo.",
        "Usa apenas tensão elétrica em pares de cobre.",
        "É igual ao Wi‑Fi, mas com conector físico."
      ],
      "answer": 0,
      "explanation": "Fibra óptica transporta luz e é útil para distâncias e capacidade, embora exija cuidados próprios.",
      "topic": "fibra",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.5.3",
      "question": "Um link cabeado esperado em 1 Gbps aparece como 100 Mbps. Qual hipótese física faz sentido testar primeiro?",
      "options": [
        "Cabo ou porta negociando abaixo do esperado.",
        "Servidor DNS com cache expirado.",
        "Senha incorreta no sistema operacional.",
        "Certificado TLS vencido."
      ],
      "answer": 0,
      "explanation": "Velocidade negociada abaixo do esperado aponta para cabo, porta, adaptador, autonegociação ou capacidade do equipamento.",
      "topic": "troubleshooting",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.5.4",
      "question": "Por que uma tomada de rede ativa em área pública é risco de segurança?",
      "options": [
        "Pode permitir que um dispositivo não autorizado obtenha conectividade à rede.",
        "Porque DNS sempre fica público nessas tomadas.",
        "Porque todo cabo Ethernet transmite senhas em texto claro.",
        "Porque IPv4 não funciona em ambientes públicos."
      ],
      "answer": 0,
      "explanation": "O risco é acesso físico à rede sem controle adequado. Mitigações incluem desabilitar portas, 802.1X, NAC e monitoramento.",
      "topic": "segurança física",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q0.5.5",
      "question": "No Wi‑Fi, a taxa cai muito quando o usuário se afasta do AP. Qual explicação é mais provável?",
      "options": [
        "O sinal de rádio foi degradado por distância, obstáculos ou interferência.",
        "O servidor DHCP trocou o endereço IP do notebook.",
        "O DNS passou a responder mais devagar longe do AP.",
        "A velocidade negociada do cabo do AP caiu para 100 Mbps."
      ],
      "answer": 0,
      "explanation": "Wi‑Fi depende do ambiente físico. Distância, paredes e interferência reduzem a qualidade do sinal e a taxa útil. IP, DNS e o cabo do AP não mudam porque o usuário andou.",
      "topic": "wi-fi",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q0.5.6",
      "question": "Em cloud pública, a camada física deixa de existir?",
      "options": [
        "Não. Ela é abstraída pelo provedor, mas continua influenciando limites, latência e capacidade.",
        "Sim. Cloud é puramente lógica e não usa datacenters.",
        "Sim. Apenas DNS existe em cloud.",
        "Não, mas o cliente sempre escolhe os cabos físicos."
      ],
      "answer": 0,
      "explanation": "Cloud abstrai hardware físico, mas ele continua existindo no datacenter do provedor e aparece indiretamente em limites, métricas e SLAs.",
      "topic": "cloud",
      "difficulty": "intermediário",
      "type": "arquitetura"
    },
    {
      "id": "q0.5.7",
      "question": "Um switch mostra a porta em 'connected', 1 Gbps full duplex, mas os contadores de CRC e input errors crescem a cada minuto. O que isso indica?",
      "options": [
        "A porta está desabilitada administrativamente.",
        "Velocidade negociada abaixo do esperado.",
        "Camada física degradada: o link está up, mas os quadros chegam corrompidos.",
        "Falha de resolução DNS no cliente."
      ],
      "answer": 2,
      "explanation": "Link up não significa camada física saudável. CRC e input errors crescentes mostram quadros corrompidos no meio (cabo, conector, patch panel ou interferência). A porta não está desabilitada, a velocidade está normal e DNS não gera erro de CRC.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q0.5.8",
      "question": "Por que o throughput de cada notebook cai quando muitos dispositivos usam o mesmo AP e canal Wi‑Fi?",
      "options": [
        "Porque cada dispositivo recebe um endereço IP mais lento.",
        "Porque o rádio é um meio compartilhado: os dispositivos disputam o mesmo canal.",
        "Porque o Wi‑Fi converte bits em pulsos de luz.",
        "Porque o AP passa a usar half-duplex no cabo de cobre."
      ],
      "answer": 1,
      "explanation": "No Wi‑Fi, o canal de rádio é compartilhado. Quanto mais dispositivos disputam o meio, menor a fatia de tempo de cada um e menor o throughput real.",
      "topic": "wi-fi",
      "difficulty": "iniciante",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.5.1",
      "front": "O que é sinal físico em redes?",
      "back": "É uma variação elétrica, óptica ou eletromagnética usada para representar bits em um meio."
    },
    {
      "id": "fc0.5.2",
      "front": "Qual meio usa pulsos de luz?",
      "back": "Fibra óptica."
    },
    {
      "id": "fc0.5.3",
      "front": "Por que Wi‑Fi é mais variável que cabo?",
      "back": "Porque usa rádio em meio compartilhado, sujeito a distância, obstáculos, interferência e concorrência."
    },
    {
      "id": "fc0.5.4",
      "front": "O que pode indicar erro físico em switch?",
      "back": "Contadores como CRC errors, input errors, link flapping ou velocidade/duplex inesperados."
    },
    {
      "id": "fc0.5.7",
      "front": "O que NO-CARRIER e LOWER_UP indicam na saída de ip link?",
      "back": "LOWER_UP: a interface detecta sinal (carrier) físico. NO-CARRIER: nenhum sinal detectado, como cabo solto ou porta do outro lado desligada."
    },
    {
      "id": "fc0.5.8",
      "front": "O que é a relação sinal-ruído (SNR)?",
      "back": "A relação entre a potência do sinal útil e a do ruído, normalmente expressa em dB. Quanto maior, mais fácil o receptor distinguir os símbolos e menos erros."
    }
  ],
  "exercises": [
    {
      "id": "ex0.5.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras por que bits precisam virar sinais físicos.",
      "expectedAnswer": "Porque bits são uma representação lógica. Para atravessar cabo, fibra ou ar, eles precisam ser codificados em variações elétricas, luz ou rádio que um receptor consiga medir e interpretar.",
      "explanation": "A resposta deve separar informação abstrata de fenômeno físico."
    },
    {
      "id": "ex0.5.2",
      "type": "diagnóstico",
      "prompt": "Um usuário consegue IP, mas a rede cai várias vezes ao dia. Liste cinco hipóteses de camada física.",
      "expectedAnswer": "Cabo ruim, porta de switch com erro, conector/patch panel defeituoso, Wi‑Fi fraco/interferência, transceiver/fibra com problema, velocidade/duplex incorretos.",
      "explanation": "IP obtido não exclui camada física degradada."
    },
    {
      "id": "ex0.5.5",
      "type": "diagnóstico",
      "prompt": "Interprete duas evidências: (a) no Linux, ip link mostra a interface cabeada com NO-CARRIER e state DOWN; (b) em outro notebook, ethtool mostra Speed: 100Mb/s e Link detected: yes, numa porta que deveria operar em 1 Gbps. Qual a hipótese principal em cada caso e o que você testaria primeiro?",
      "expectedAnswer": "(a) Não há sinal físico: cabo desconectado ou defeituoso, porta do switch desligada ou adaptador com problema; teste reconectar ou trocar o cabo e verificar a porta. (b) O link existe, mas negociou abaixo do esperado: cabo inadequado ou defeituoso, porta antiga ou autonegociação; teste outro cabo e outra porta.",
      "explanation": "O primeiro caso é ausência de camada física; o segundo é camada física degradada. Distinguir os dois decide se você procura falta de link ou qualidade do link."
    },
    {
      "id": "ex0.5.4",
      "type": "comparação",
      "prompt": "Compare cobre, fibra e Wi‑Fi em uma frase para cada: principal vantagem e principal limitação.",
      "expectedAnswer": "Cobre: barato e comum, mas limitado por distância/interferência. Fibra: alta capacidade e distância, mas exige cuidado/custo. Wi‑Fi: mobilidade, mas sofre com interferência e meio compartilhado.",
      "explanation": "A comparação ajuda a escolher o meio certo para cada cenário."
    }
  ],
  "challenge": {
    "title": "Diagnóstico de instabilidade em uma sala corporativa",
    "scenario": "Uma empresa relata que uma sala de treinamento tem rede instável. Alguns notebooks usam cabo, outros usam Wi‑Fi. A aplicação interna cai durante aulas, mas funciona bem em outros setores.",
    "tasks": [
      "Criar uma lista ordenada de hipóteses começando pela camada física.",
      "Definir evidências a coletar em Windows/Linux e no switch/AP.",
      "Indicar quais testes comparariam cabo e Wi‑Fi.",
      "Propor mitigações de curto e médio prazo.",
      "Indicar controles de segurança para evitar dispositivos não autorizados."
    ],
    "constraints": [
      "Não pode derrubar a rede durante horário de aula.",
      "Não pode executar testes ofensivos.",
      "Deve usar comandos e observações de baixo risco.",
      "Deve separar hipótese física, enlace, rede e aplicação."
    ],
    "expectedDeliverables": [
      "Checklist de diagnóstico.",
      "Tabela de evidências.",
      "Plano de teste sem impacto.",
      "Mitigações propostas.",
      "Resumo executivo para equipe de TI."
    ],
    "gradingRubric": [
      {
        "criterion": "Começa pela camada física sem ignorar camadas superiores",
        "points": 25,
        "description": "Lista cabo, Wi‑Fi, porta, erros e velocidade antes de DNS/aplicação."
      },
      {
        "criterion": "Coleta evidências concretas",
        "points": 25,
        "description": "Usa comandos, contadores, ping, velocidade negociada e observações ambientais."
      },
      {
        "criterion": "Inclui segurança",
        "points": 20,
        "description": "Considera portas públicas, dispositivos não autorizados e controle de acesso."
      },
      {
        "criterion": "Propõe mitigação realista",
        "points": 20,
        "description": "Sugere troca de cabo, ajuste de AP, documentação, monitoramento e controle de portas."
      },
      {
        "criterion": "Comunicação clara",
        "points": 10,
        "description": "Diferencia sintomas, hipóteses, testes e conclusão."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A situação afeta um local específico, então começa com hipótese física/ambiental. Como há cabo e Wi‑Fi, é preciso comparar os meios. Se apenas Wi‑Fi falha, investigar sinal, canal, AP e interferência. Se cabo e Wi‑Fi falham, investigar switch de acesso, uplink, energia, VLAN ou serviços comuns.",
    "steps": [
      "Registrar quais usuários e quais meios são afetados.",
      "Verificar link e velocidade negociada nos notebooks cabeados.",
      "Coletar ping para gateway em cabo e Wi‑Fi.",
      "Verificar erros e flaps nas portas do switch.",
      "Observar sinal, canal e carga do AP.",
      "Checar mudanças recentes em cabeamento, rack ou AP.",
      "Aplicar mitigação de baixo risco e monitorar."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Reinstalar a aplicação interna imediatamente.",
        "whyItIsWrong": "O problema é localizado e intermitente; há forte chance de causa física ou de acesso antes da aplicação."
      },
      {
        "answer": "Trocar o firewall de borda.",
        "whyItIsWrong": "Outros setores funcionam bem; o escopo local sugere camada física, AP, switch ou cabeamento da sala."
      },
      {
        "answer": "Aumentar a velocidade da internet.",
        "whyItIsWrong": "A aplicação interna cai em uma sala específica; banda externa pode não ter relação."
      }
    ],
    "finalAnswer": "A abordagem correta é comparar cabo e Wi‑Fi, coletar evidências de link, velocidade, perda, erros de porta e sinal, verificar mudanças físicas e aplicar correções proporcionais: trocar cabo/porta, revisar patch panel, ajustar AP/canal, limitar portas expostas e monitorar flaps e novos dispositivos. Só depois subir para DNS, firewall e aplicação."
  },
  "glossary": [
    {
      "term": "Camada física",
      "shortDefinition": "Camada responsável por transportar sinais no meio físico.",
      "longDefinition": "No modelo OSI, é a camada que define como bits são representados e transmitidos por cobre, fibra ou rádio.",
      "example": "Um cabo Ethernet com link de 1 Gbps opera na camada física.",
      "relatedTerms": [
        "sinal",
        "meio físico",
        "Ethernet",
        "Wi‑Fi"
      ]
    },
    {
      "term": "Atenuação",
      "shortDefinition": "Perda de força do sinal ao longo do meio.",
      "longDefinition": "Quanto maior distância, perda por conector, curvatura ou obstáculos, mais o sinal pode enfraquecer.",
      "example": "Uma fibra dobrada demais pode aumentar perda óptica.",
      "relatedTerms": [
        "ruído",
        "SNR",
        "fibra"
      ]
    },
    {
      "term": "Interferência",
      "shortDefinition": "Sinal indesejado que atrapalha a comunicação.",
      "longDefinition": "Pode ocorrer por fontes elétricas, outros rádios, canais sobrepostos ou ambiente físico inadequado.",
      "example": "Um micro-ondas ou muitas redes próximas podem afetar Wi‑Fi em 2,4 GHz.",
      "relatedTerms": [
        "Wi‑Fi",
        "ruído",
        "SNR"
      ]
    },
    {
      "term": "Transceiver",
      "shortDefinition": "Componente que transmite e recebe sinais em um meio.",
      "longDefinition": "Em redes, pode converter sinais elétricos em ópticos e vice-versa, como módulos SFP/SFP+.",
      "example": "Um switch usa transceiver SFP para uplink de fibra.",
      "relatedTerms": [
        "fibra",
        "switch",
        "uplink"
      ]
    },
    {
      "term": "Velocidade negociada",
      "shortDefinition": "Taxa acordada entre duas interfaces físicas.",
      "longDefinition": "Interfaces Ethernet podem negociar 100 Mbps, 1 Gbps ou mais conforme cabo, porta e capacidade dos equipamentos.",
      "example": "Um notebook negocia 100 Mbps quando o cabo não suporta 1 Gbps adequadamente.",
      "relatedTerms": [
        "duplex",
        "Ethernet",
        "throughput"
      ]
    },
    {
      "term": "Rogue AP",
      "shortDefinition": "Ponto de acesso sem fio não autorizado.",
      "longDefinition": "Dispositivo Wi‑Fi conectado indevidamente à rede cabeada, criando acesso sem fio fora do controle corporativo.",
      "example": "Um usuário conecta um roteador doméstico em uma tomada de rede da empresa.",
      "relatedTerms": [
        "Wi‑Fi",
        "NAC",
        "segurança física"
      ]
    },
    {
      "term": "Duplex",
      "shortDefinition": "Modo em que uma interface transmite e recebe.",
      "longDefinition": "Em full duplex, a interface transmite e recebe ao mesmo tempo; em half duplex, alterna entre transmitir e receber. Os dois lados do link precisam operar no mesmo modo.",
      "example": "Uma porta em half duplex ligada a outra em full duplex costuma mostrar late collisions, erros CRC e lentidão.",
      "relatedTerms": [
        "velocidade negociada",
        "Ethernet",
        "autonegociação"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Referência normativa para Ethernet; útil para aprofundar camada física e enlace Ethernet."
    },
    {
      "type": "standard",
      "title": "IEEE 802.11 Wireless LAN",
      "organization": "IEEE",
      "url": "",
      "note": "Referência normativa para Wi‑Fi; será aprofundada no módulo de redes sem fio."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.4",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "A aula anterior explica bit, byte, Mbps, MB/s e throughput."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 12",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Redes wireless, RF e segurança sem fio serão aprofundadas posteriormente."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Datacenter, virtualização e plataformas",
      "lesson": "a definir",
      "reason": "Ambientes on-premises e híbridos dependem de cabeamento, uplinks, storage e rede física para sustentar plataformas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Controle de acesso corporativo",
      "lesson": "a definir",
      "reason": "Controles como 802.1X, NAC e acesso físico se conectam à identidade de dispositivos e usuários."
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
      "0.6"
    ]
  }
};
