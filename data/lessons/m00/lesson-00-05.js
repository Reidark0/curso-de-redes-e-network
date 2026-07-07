export const lesson0005 = {
  "id": "0.5",
  "moduleId": "m00",
  "order": 5,
  "title": "Como sinais físicos carregam dados",
  "subtitle": "Como cobre, fibra e rádio transformam bits abstratos em sinais reais — e por que isso muda troubleshooting, disponibilidade e segurança.",
  "duration": "70-100 min",
  "estimatedStudyTimeMinutes": 100,
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
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>\n    Até agora, falamos de bits, bytes, bases numéricas, codificações e unidades de transferência. Tudo isso parece abstrato: 0 e 1, hexadecimal, UTF‑8, Mbps. Mas nenhum bit atravessa uma rede como um símbolo escrito em uma tabela. Para sair de um computador e chegar a outro, a informação precisa virar <strong>fenômeno físico</strong>: uma variação elétrica em um cabo de cobre, um pulso de luz em uma fibra óptica ou uma onda eletromagnética no ar.\n  </p>\n  <p>\n    Essa aula é importante porque muitos problemas de rede parecem “problema de IP”, “problema de DNS” ou “problema do sistema”, mas começam muito antes: cabo ruim, conector mal crimpado, fibra dobrada demais, porta negociando velocidade errada, duplex incompatível, interferência no Wi‑Fi, potência de sinal baixa, canal congestionado, ruído elétrico, transceiver inadequado ou distância acima do limite do meio físico.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> uma aplicação corporativa está intermitente. O usuário diz que “a rede cai”. O ping às vezes responde, às vezes perde pacotes. O DNS está correto, o IP está correto e o firewall não bloqueia. Depois de horas, alguém descobre que o cabo passa perto de uma fonte de interferência ou que a porta do switch está acumulando erros físicos. Sem entender sinais físicos, o troubleshooting começa na camada errada.\n  </div>\n  <p>\n    Para quem trabalha com Segurança, isso também importa. Camada física envolve disponibilidade, escopo de ataque, exposição de portas, acesso indevido a tomadas de rede, rogue access points, escuta de sinal sem fio, cabeamento em áreas públicas, proteção de datacenter e evidências em portas de switch. Redes não são apenas protocolos; elas também são materiais, energia, luz, rádio e ambiente.\n  </p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>\n    Antes das redes digitais modernas, comunicação já dependia de sinais físicos: telégrafo, telefone, rádio, televisão, linhas seriais e enlaces ópticos. A evolução das redes de computadores não eliminou essa dependência; ela apenas padronizou maneiras de transformar bits em sinais e sinais em bits.\n  </p>\n  <p>\n    Em redes cabeadas, o cobre se popularizou porque era relativamente barato, flexível e fácil de instalar. Ethernet aproveitou cabos metálicos para transmitir sinais elétricos entre placas de rede e switches. Com o tempo, surgiram categorias de cabo mais capazes, técnicas de codificação melhores, conectores mais padronizados e equipamentos capazes de negociar velocidade automaticamente.\n  </p>\n  <p>\n    A fibra óptica surgiu como alternativa para maiores distâncias, maior largura de banda e menor suscetibilidade a interferência eletromagnética. Em vez de variações elétricas, usa pulsos de luz. Já as redes sem fio usam ondas eletromagnéticas no ar, permitindo mobilidade, mas pagando o preço de interferência, compartilhamento do meio, obstáculos físicos, potência de transmissão, regulação de espectro e maior exposição.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Meio</th><th>Representação física</th><th>Vantagem</th><th>Limitação comum</th></tr></thead>\n    <tbody>\n      <tr><td>Cobre</td><td>Variação elétrica</td><td>Baixo custo e instalação comum</td><td>Interferência, distância e qualidade de crimpagem</td></tr>\n      <tr><td>Fibra</td><td>Pulsos de luz</td><td>Alta capacidade e longas distâncias</td><td>Transceivers, curvatura, limpeza e custo</td></tr>\n      <tr><td>Rádio/Wi‑Fi</td><td>Ondas eletromagnéticas</td><td>Mobilidade e flexibilidade</td><td>Interferência, obstáculos, canal e meio compartilhado</td></tr>\n    </tbody>\n  </table>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>\n    O problema central é: <strong>como fazer um receptor distinguir 0 e 1 em um mundo físico imperfeito?</strong> Cabos têm resistência, capacitância e ruído. Fibra sofre atenuação, conectores sujos e perda por curvatura. Rádio sofre interferência, reflexão, obstáculos, colisões, distância, potência baixa e concorrência com outras redes. O receptor não recebe “bits puros”; ele recebe sinais que precisam ser medidos, sincronizados, filtrados e interpretados.\n  </p>\n  <p>\n    Se o sinal chega forte, limpo e dentro do padrão esperado, a placa de rede consegue reconstruir os bits. Se chega degradado, podem ocorrer erros de quadro, perda, retransmissão, queda de throughput, renegociação de velocidade, latência variável ou desconexão. Isso explica por que uma rede pode ter IP correto e ainda assim funcionar mal.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem sinal adequado:</strong> não há link físico.</li>\n    <li><strong>Com sinal fraco:</strong> o link pode subir, mas com erros e retransmissões.</li>\n    <li><strong>Com interferência:</strong> pacotes podem ser perdidos ou precisar ser reenviados.</li>\n    <li><strong>Com meio compartilhado:</strong> throughput real cai conforme mais dispositivos disputam o canal.</li>\n    <li><strong>Com instalação ruim:</strong> problemas aparecem como intermitência difícil de reproduzir.</li>\n  </ul>\n  <div class=\"callout callout--warning\">\n    <strong>Erro comum:</strong> pular direto para DNS, firewall ou aplicação sem verificar camada física. Em troubleshooting profissional, link, erros de interface, negociação, cabo, sinal e meio devem ser verificados antes de hipóteses mais altas.\n  </div>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>\n    As redes evoluíram criando melhores maneiras de representar bits no meio físico. Não basta dizer que tensão alta é 1 e tensão baixa é 0. Em redes modernas, a codificação do sinal pode usar transições, múltiplos níveis, modulação, temporização, símbolos e técnicas para reduzir erro e aumentar eficiência. A ideia geral continua simples: o transmissor transforma bits em um padrão físico; o receptor mede esse padrão e reconstrói os bits.\n  </p>\n  <p>\n    No cobre, evoluímos de enlaces mais lentos para pares trançados capazes de transportar altas frequências com cancelamento de interferência. Na fibra, evoluímos com lasers, LEDs, diferentes comprimentos de onda, fibras monomodo e multimodo. No Wi‑Fi, evoluímos com modulação mais eficiente, múltiplas antenas, canais mais largos, OFDM, MIMO e uso de bandas diferentes. Cada avanço aumentou capacidade, mas também aumentou a importância de instalação correta, compatibilidade e diagnóstico.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como carrega bits</th><th>Problema resolvido</th><th>Problema que permanece</th></tr></thead>\n    <tbody>\n      <tr><td>Cobre par trançado</td><td>Sinais elétricos em pares de fios</td><td>Conexão barata em LAN</td><td>Interferência e limite de distância</td></tr>\n      <tr><td>Fibra óptica</td><td>Pulsos de luz</td><td>Distância e imunidade a interferência elétrica</td><td>Manuseio, limpeza, transceiver e custo</td></tr>\n      <tr><td>Wi‑Fi</td><td>Modulação em rádio</td><td>Mobilidade</td><td>Meio compartilhado e interferência</td></tr>\n      <tr><td>Datacenter moderno</td><td>DAC, fibra, transceivers, altas velocidades</td><td>Grande capacidade leste-oeste</td><td>Custo, compatibilidade e observabilidade física</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>\n    Um <strong>sinal físico</strong> é uma variação mensurável em um meio usada para representar informação. Em redes, essa variação pode ser elétrica, óptica ou eletromagnética. A camada física define características como meio, conector, frequência, potência, codificação, sincronização, distância máxima, taxa nominal, modo de operação e requisitos mínimos para que transmissor e receptor entendam o mesmo padrão.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> transportar dados fisicamente é converter bits em sinais capazes de atravessar um meio e depois reconverter esses sinais em bits com erro aceitável.\n  </div>\n  <p>\n    Isso não decide endereço IP, rota, porta TCP, DNS ou política de firewall. A camada física apenas oferece a base para que as camadas superiores possam existir. Se essa base falha, tudo acima fica instável. Por isso, entender sinais físicos é o primeiro passo para troubleshooting sério.\n  </p>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>\n    O funcionamento interno pode ser visto como uma cadeia de transformação. A aplicação produz dados. Esses dados viram bytes. Os bytes viram bits. A placa de rede, transceiver ou rádio transforma bits em símbolos físicos. O meio transporta o sinal. O receptor mede o sinal, tenta reconstruir os símbolos, recupera os bits e entrega para as camadas superiores.\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Serialização:</strong> os bits precisam ser colocados em uma sequência transmissível.</li>\n    <li><strong>Codificação/modulação:</strong> a sequência é convertida em padrões físicos detectáveis.</li>\n    <li><strong>Transmissão:</strong> o meio carrega energia elétrica, luz ou rádio.</li>\n    <li><strong>Atenuação:</strong> o sinal perde força com distância, conectores, obstáculos ou qualidade do meio.</li>\n    <li><strong>Ruído/interferência:</strong> sinais indesejados dificultam distinguir o dado original.</li>\n    <li><strong>Recepção:</strong> o receptor decide quais padrões representam os bits.</li>\n    <li><strong>Verificação:</strong> camadas superiores detectam erros por mecanismos como FCS/CRC, checksums e retransmissões.</li>\n  </ol>\n  <p>\n    Um ponto fundamental: nem todo erro físico aparece como “cabo desconectado”. Muitas vezes o link continua “up”, mas com contadores de erro, quedas ocasionais, renegociação, perda de pacotes, throughput baixo ou Wi‑Fi oscilando. Essa é a diferença entre ausência total de camada física e camada física degradada.\n  </p>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>\n    Em uma arquitetura de rede, a camada física aparece em todos os pontos onde dados precisam atravessar um meio: patch panel, cabo de rede, fibra, transceiver, porta de switch, rádio Wi‑Fi, antena, interface de servidor, placa de notebook, uplink de firewall e backbone de datacenter. Ela é a parte mais material da rede, mas muitas vezes é invisível para quem só olha IP e aplicação.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Host:</strong> placa de rede, driver, conector físico ou rádio sem fio.</li>\n    <li><strong>Acesso:</strong> cabo até switch, access point ou tomada de rede.</li>\n    <li><strong>Distribuição:</strong> uplinks entre switches, fibras, transceivers e agregação.</li>\n    <li><strong>Borda:</strong> firewall, roteador, modem, link de operadora e handoff.</li>\n    <li><strong>Cloud:</strong> camada física é abstraída pelo provedor, mas ainda existe nos datacenters dele.</li>\n  </ul>\n  <p>\n    Em cloud pública, você raramente toca no cabo. Mesmo assim, o conceito continua relevante: zonas de disponibilidade, links entre datacenters, perda, latência, throughput máximo de instância, capacidade de NIC virtual e limites de rede são consequências de infraestrutura física e virtual combinadas.\n  </p>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>\n    Imagine que você quer enviar uma mensagem usando uma lanterna. Uma piscada curta pode significar 0, uma piscada longa pode significar 1. Se a pessoa do outro lado conhece o código e consegue ver a luz com clareza, ela reconstrói a mensagem. Se houver neblina, distância grande, outra luz piscando, bateria fraca ou obstáculos, a mensagem pode ser interpretada errado.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> redes reais não usam apenas “piscou ou não piscou”. Elas podem usar modulação complexa, múltiplos níveis, frequências, símbolos, correção de erro, sincronização e negociação. A analogia ajuda a entender a ideia de converter informação em fenômeno físico, mas não representa toda a engenharia do sinal.\n  </div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>\n    Em casa, você conecta um notebook ao roteador usando cabo Ethernet. O sistema mostra link de 1 Gbps. Esse número só é possível porque a placa do notebook, o cabo, o roteador e os conectores conseguiram negociar um padrão físico compatível. Se o cabo estiver ruim, talvez o link negocie 100 Mbps ou fique intermitente.\n  </p>\n  <p>\n    No Wi‑Fi, o mesmo notebook pode estar ao lado do roteador e conseguir boa taxa, mas ao ir para outro cômodo a velocidade cai. O IP não mudou, o DNS não mudou e o site é o mesmo. O que mudou foi o meio físico: distância, parede, reflexão, interferência e qualidade do sinal.\n  </p>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>\n    Em uma empresa, a camada física envolve cabeamento estruturado, rack, patch panel, switches de acesso, uplinks de fibra, portas de firewall, APs no teto, etiquetas, documentação, certificação de cabos e controle de acesso ao datacenter. Uma mudança mal feita em rack pode derrubar uma VLAN inteira. Um transceiver incompatível pode impedir uplink. Um cabo passando por local inadequado pode gerar erros intermitentes.\n  </p>\n  <p>\n    Para operações de segurança, camada física também é controle de perímetro. Tomadas de rede em salas públicas, portas não usadas habilitadas, APs conectados sem autorização, racks destrancados e cabeamento exposto criam risco. O controle lógico começa depois que alguém já conseguiu link; por isso, a camada física deve ser documentada, monitorada e protegida.\n  </p>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>\n    Em cloud, o aluno não crimpou cabo nem limpou conector de fibra, mas a camada física continua existindo por trás da abstração. Instâncias possuem limites de throughput de rede. Load balancers, gateways, links entre zonas, storage remoto e tráfego entre regiões dependem de infraestrutura física operada pelo provedor. O cliente enxerga métricas, limites e SLAs, não o cabo.\n  </p>\n  <p>\n    O erro comum é achar que “cloud não tem rede física”. Tem, mas ela foi abstraída. A implicação prática é que o troubleshooting muda: em vez de trocar cabo, você valida limites da instância, métricas de rede, região, zona, caminho, security groups, appliances virtuais, NAT gateways, private endpoints e quotas. Mesmo quando o hardware não é seu, a física influencia latência, jitter, perda e capacidade.\n  </p>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>\n    Em DevSecOps, sinais físicos aparecem indiretamente em pipelines e plataformas. Um runner local conectado por Wi‑Fi instável pode falhar ao baixar dependências. Um registry interno atrás de um link saturado pode atrasar builds. Um cluster Kubernetes on-premises depende de uplinks físicos entre nós, storage e ingress. Uma automação que reinicia serviços não corrige cabo ruim nem interferência de Wi‑Fi.\n  </p>\n  <p>\n    Em IaC, você modela redes virtuais, subnets, rotas e firewalls, mas precisa lembrar que ambientes híbridos dependem de enlaces físicos: Direct Connect, ExpressRoute, VPN sobre links de operadora, SD-WAN, switches, transceivers e datacenters. Uma pipeline pode estar correta e ainda falhar por perda de pacote em um link físico degradado.\n  </p>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>\n    Em segurança, camada física se relaciona com disponibilidade, acesso não autorizado e exposição. Ataques e incidentes podem envolver desconectar cabos, inserir dispositivo não autorizado, usar tomada de rede aberta, criar rogue access point, explorar Wi‑Fi mal planejado, interferir no sinal sem fio ou aproveitar falta de controle em sala técnica. O foco aqui é defensivo: entender riscos para monitorar e mitigar.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Porta física exposta</td><td>Tomada de rede ativa em área pública</td><td>Acesso indevido à LAN</td><td>Desabilitar portas, 802.1X, NAC, port security e inventário</td></tr>\n      <tr><td>Rogue AP</td><td>Dispositivo Wi‑Fi não autorizado conectado à rede</td><td>Bypass de controles e vazamento</td><td>Monitoramento wireless, inspeção física e controle de switch</td></tr>\n      <tr><td>Interferência</td><td>Wi‑Fi instável, perda e baixa taxa</td><td>Indisponibilidade e degradação</td><td>Site survey, canais adequados, potência correta e cabeamento para APs</td></tr>\n      <tr><td>Rack sem controle</td><td>Acesso físico a switches e patch panels</td><td>Desconexão, sniffing local ou alteração de cabos</td><td>Controle de acesso físico, câmeras, lacres e registro de mudança</td></tr>\n    </tbody>\n  </table>\n  <div class=\"callout callout--security\">\n    <strong>Limite ético:</strong> os laboratórios desta aula são de observação e diagnóstico defensivo. Não desconecte cabos, não interfira em redes sem fio, não conecte dispositivos em redes corporativas sem autorização e não tente burlar controles físicos ou de acesso.\n  </div>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>\n    O diagrama abaixo mostra a mesma ideia lógica — transportar bits — atravessando três meios físicos diferentes. O dado abstrato não “viaja” sozinho: ele precisa ser convertido em variação elétrica, variação de luz ou variação eletromagnética. Cada meio tem vantagens, limitações, falhas típicas e impactos de segurança.\n  </p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 430\" role=\"img\" aria-labelledby=\"m00l05-title m00l05-desc\">\n    <title id=\"m00l05-title\">Bits representados por sinais físicos em cobre, fibra e rádio</title>\n    <desc id=\"m00l05-desc\">Um transmissor converte bits em sinais que podem atravessar cabo de cobre, fibra óptica ou rádio até um receptor, sujeito a ruído, atenuação e interferência.</desc>\n    <defs>\n      <marker id=\"m00l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"35\" y=\"170\" width=\"145\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"107\" y=\"198\" text-anchor=\"middle\" class=\"svg-label\">Transmissor</text>\n    <text x=\"107\" y=\"224\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bits: 10110010</text>\n\n    <rect x=\"790\" y=\"170\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"865\" y=\"198\" text-anchor=\"middle\" class=\"svg-label\">Receptor</text>\n    <text x=\"865\" y=\"224\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">interpreta sinais</text>\n\n    <rect x=\"250\" y=\"45\" width=\"460\" height=\"80\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"73\" text-anchor=\"middle\" class=\"svg-label\">Cobre</text>\n    <path d=\"M290 100 L330 65 L370 100 L410 65 L450 100 L490 65 L530 100 L570 65 L610 100 L650 65\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <text x=\"480\" y=\"118\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">variação elétrica: tensão/corrente</text>\n\n    <rect x=\"250\" y=\"175\" width=\"460\" height=\"80\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"203\" text-anchor=\"middle\" class=\"svg-label\">Fibra óptica</text>\n    <line x1=\"295\" y1=\"228\" x2=\"665\" y2=\"228\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <circle cx=\"335\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <circle cx=\"425\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <circle cx=\"515\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <circle cx=\"605\" cy=\"228\" r=\"8\" class=\"svg-badge\" />\n    <text x=\"480\" y=\"248\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">pulsos de luz guiados pela fibra</text>\n\n    <rect x=\"250\" y=\"305\" width=\"460\" height=\"80\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"333\" text-anchor=\"middle\" class=\"svg-label\">Rádio / Wi‑Fi</text>\n    <path d=\"M305 358 C365 318, 420 398, 480 358 S595 318, 655 358\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <text x=\"480\" y=\"378\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">onda eletromagnética compartilhada no ar</text>\n\n    <line x1=\"180\" y1=\"210\" x2=\"250\" y2=\"85\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"180\" y1=\"210\" x2=\"250\" y2=\"215\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"180\" y1=\"210\" x2=\"250\" y2=\"345\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n\n    <line x1=\"710\" y1=\"85\" x2=\"790\" y2=\"210\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"710\" y1=\"215\" x2=\"790\" y2=\"210\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n    <line x1=\"710\" y1=\"345\" x2=\"790\" y2=\"210\" class=\"svg-flow\" marker-end=\"url(#m00l05-arrow)\" />\n\n    <rect x=\"350\" y=\"5\" width=\"260\" height=\"30\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"480\" y=\"26\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ruído, atenuação, interferência e erro</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>\n    O laboratório desta aula é local e seguro. Ele não exige Packet Tracer nem acesso administrativo a equipamentos corporativos. O objetivo é observar evidências de camada física no seu próprio computador: estado do link, velocidade negociada, Wi‑Fi, endereço da interface, contadores e sintomas. Quando possível, compare cabo e Wi‑Fi.\n  </p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>\n    Os exercícios reforçam a habilidade de diferenciar problema físico, problema de enlace, problema de rede e problema de aplicação. A meta não é decorar nomes de cabos, mas raciocinar a partir de sintomas.\n  </p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>\n    O desafio simula uma situação empresarial: uma sala tem quedas intermitentes, usuários reclamam de lentidão e o time precisa separar hipóteses físicas de hipóteses lógicas antes de mexer em firewall, DNS ou aplicação.\n  </p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>\n    A solução comentada mostrará como começar pela camada física, coletar evidências e só então subir para camadas superiores. O raciocínio é mais importante que a resposta final.\n  </p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Bits não viajam como símbolos:</strong> eles precisam ser representados por sinais físicos.</li>\n    <li><strong>Cobre:</strong> usa variações elétricas e é comum em LANs.</li>\n    <li><strong>Fibra:</strong> usa luz, permite distância e alta capacidade, mas exige cuidado com conectores e curvatura.</li>\n    <li><strong>Wi‑Fi:</strong> usa rádio, oferece mobilidade, mas sofre com interferência e meio compartilhado.</li>\n    <li><strong>Camada física degradada:</strong> pode causar perda, intermitência, throughput baixo e erros de interface.</li>\n    <li><strong>Segurança:</strong> portas físicas, racks, Wi‑Fi e dispositivos não autorizados precisam de controle.</li>\n    <li><strong>Próximo raciocínio:</strong> antes de culpar DNS ou aplicação, valide link, sinal, meio e erros.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>\n    A próxima aula será <strong>0.6 — Latência, largura de banda e throughput</strong>. Depois de entender que bits dependem de sinais físicos, vamos separar três conceitos que aparecem em quase todo diagnóstico profissional: quanto cabe no caminho, quanto realmente passa e quanto tempo demora para ir e voltar.\n  </p>\n</section>"
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
  "deepDive": {
    "mentalModel": "A camada física é a tradução entre informação abstrata e fenômeno mensurável. Se o fenômeno chega degradado, as camadas superiores podem até estar corretas, mas a comunicação fica instável.",
    "keyTerms": [
      "sinal",
      "meio físico",
      "cobre",
      "fibra óptica",
      "rádio",
      "atenuação",
      "ruído",
      "interferência",
      "SNR",
      "transceiver",
      "duplex",
      "velocidade negociada",
      "link up",
      "erro de interface"
    ],
    "limitations": [
      "Entender o conceito não substitui instrumentos profissionais como certificador de cabos, OTDR, analisador de espectro ou site survey.",
      "Nem todo problema físico é visível para o sistema operacional do usuário.",
      "Em cloud pública, a camada física é abstraída; o cliente vê limites e métricas, não cabos e transceivers.",
      "Wi‑Fi depende fortemente do ambiente, por isso testes isolados podem não representar todos os horários e locais."
    ],
    "whenToUse": [
      "Ao investigar intermitência, perda, link down, baixa taxa negociada ou Wi‑Fi instável.",
      "Ao planejar cabeamento, uplinks, APs, racks, salas técnicas e datacenters.",
      "Ao definir controles contra acesso físico indevido à rede.",
      "Ao interpretar contadores de erro em switch ou interface.",
      "Ao avaliar se o problema está abaixo de IP, DNS e aplicação."
    ],
    "whenNotToUse": [
      "Não use camada física como explicação automática para todo problema de rede.",
      "Não troque cabos ou equipamentos sem evidência mínima quando o problema é claramente de DNS, rota ou firewall.",
      "Não faça testes invasivos em rede corporativa sem autorização.",
      "Não confunda velocidade de link com throughput útil de aplicação."
    ],
    "operationalImpact": [
      "Exige documentação de pontos, portas, racks, patch panels, fibras e APs.",
      "Melhora troubleshooting ao separar falhas físicas de falhas lógicas.",
      "Pode exigir ferramentas de teste, equipe treinada e processo de mudança física.",
      "Problemas físicos geram incidentes intermitentes difíceis de reproduzir sem evidências."
    ],
    "financialImpact": [
      "Cabeamento estruturado, certificação, fibra, transceivers e switches têm custo de aquisição e manutenção.",
      "Erros físicos podem gerar horas de troubleshooting caro e troca desnecessária de equipamentos.",
      "Em Wi‑Fi corporativo, site survey e APs adequados custam mais, mas reduzem indisponibilidade.",
      "Em datacenter e cloud híbrida, links físicos dedicados e redundância aumentam custo, mas melhoram previsibilidade."
    ],
    "securityImpact": [
      "Portas físicas expostas podem permitir acesso indevido à rede interna.",
      "Racks e patch panels sem controle permitem alteração ou desconexão não autorizada.",
      "Wi‑Fi amplia a superfície de exposição porque o sinal ultrapassa paredes.",
      "Controles como 802.1X, NAC, port security, inventário e monitoramento reduzem impacto."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Culpar DNS antes de verificar link físico.",
      "whyItHappens": "DNS é um erro conhecido e fácil de lembrar.",
      "consequence": "Tempo perdido e diagnóstico fora da camada correta.",
      "correction": "Verifique link, sinal, perda, erros de interface e conectividade básica antes de subir camadas."
    },
    {
      "mistake": "Achar que Wi‑Fi deve entregar a mesma estabilidade do cabo.",
      "whyItHappens": "Ambos dão acesso à rede e mostram ícone de conexão.",
      "consequence": "Expectativas irreais sobre throughput e latência.",
      "correction": "Considere interferência, distância, obstáculos, banda, canal e quantidade de clientes."
    },
    {
      "mistake": "Ignorar velocidade negociada da interface.",
      "whyItHappens": "O usuário vê apenas que está conectado.",
      "consequence": "Um cabo ruim pode deixar link em 100 Mbps quando o esperado era 1 Gbps.",
      "correction": "Verifique velocidade negociada no sistema operacional ou no switch."
    },
    {
      "mistake": "Tratar tomada de rede ativa como inofensiva.",
      "whyItHappens": "O foco fica em firewall e antivírus, não no acesso físico.",
      "consequence": "Dispositivo não autorizado pode ganhar conectividade interna.",
      "correction": "Desabilite portas não usadas e implemente autenticação/controle de acesso à rede."
    }
  ],
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
        "then": "Verificar sinal, obstáculos, canal, banda, potência e quantidade de clientes."
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
      "Documentar pontos de rede, racks, patch panels e uplinks.",
      "Desabilitar portas de switch não utilizadas.",
      "Usar 802.1X, NAC ou port security quando aplicável.",
      "Controlar acesso físico a salas técnicas e datacenters.",
      "Monitorar flaps de porta, mudanças de MAC e novos dispositivos conectados.",
      "Planejar Wi‑Fi com site survey, segmentação e criptografia forte."
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
      "Achar que firewall de borda protege contra acesso físico interno sem controles adicionais.",
      "Desconsiderar que sinal Wi‑Fi ultrapassa paredes.",
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
        "name": "Indisponibilidade por interferência ou sabotagem física",
        "description": "Interferência, desconexão ou manipulação física pode degradar ou derrubar comunicação.",
        "defensiveExplanation": "O impacto principal é disponibilidade; a resposta envolve monitoramento, redundância e controle físico.",
        "mitigation": "Redundância, controle de acesso, câmeras, alertas de link, site survey e documentação."
      }
    ],
    "monitoring": [
      "Alertas de link up/down frequentes.",
      "Mudanças de velocidade/duplex.",
      "Contadores CRC/input errors.",
      "Novos MACs em portas sensíveis.",
      "APs desconhecidos ou SSIDs suspeitos.",
      "Eventos de autenticação 802.1X/NAC negados."
    ],
    "hardening": [
      "Portas não usadas em shutdown.",
      "VLAN de quarentena para dispositivos desconhecidos.",
      "Controle físico de rack e sala técnica.",
      "Etiquetagem e documentação de cabos.",
      "Wi‑Fi corporativo separado de visitantes.",
      "Uso de cabos e transceivers homologados."
    ],
    "detectionIdeas": [
      "Comparar inventário esperado com dispositivos conectados.",
      "Monitorar portas que mudam de estado muitas vezes.",
      "Investigar contadores de erro crescentes.",
      "Procurar SSIDs não autorizados próximos ao ambiente.",
      "Correlacionar queda de rede com mudança física registrada."
    ]
  },
  "lab": {
    "id": "lab-0.5",
    "title": "Observando evidências de camada física no computador",
    "labType": "security",
    "objective": "Identificar estado de interface, velocidade negociada e sinais básicos de diferença entre cabo, Wi‑Fi e meio físico.",
    "scenario": "Você está investigando se uma instabilidade pode estar relacionada à camada física. O objetivo é coletar evidências sem modificar a rede.",
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
    "estimatedTimeMinutes": 100,
    "cost": "zero",
    "safetyNotes": [
      "Não desconecte cabos de redes corporativas sem autorização.",
      "Não conecte dispositivos desconhecidos em redes de terceiros.",
      "Não faça testes de interferência em Wi‑Fi.",
      "Colete apenas informações do seu próprio host ou de laboratório autorizado."
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
        "title": "Observar Wi‑Fi no Linux",
        "instruction": "Se estiver usando Wi‑Fi, liste redes e informações básicas de sinal.",
        "command": "nmcli dev wifi list",
        "expectedOutput": "SSIDs, canal, taxa e barras/sinal, dependendo do sistema.",
        "explanation": "Wi‑Fi depende do ambiente. Sinal fraco ou canal disputado pode explicar baixa taxa e instabilidade."
      },
      {
        "number": 6,
        "title": "Comparar cabo e Wi‑Fi quando possível",
        "instruction": "Faça um teste simples de ping para o gateway usando cabo e depois Wi‑Fi, se ambos estiverem disponíveis.",
        "command": "ping <IP_DO_GATEWAY>",
        "expectedOutput": "Respostas com baixa latência e sem perda em cenário normal.",
        "explanation": "Diferenças grandes entre cabo e Wi‑Fi sugerem que o meio físico ou rádio pode ser parte do problema."
      },
      {
        "number": 7,
        "title": "Registrar evidências",
        "instruction": "Anote interface usada, velocidade, meio físico, resultado de ping e qualquer oscilação observada.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
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
        "probableCause": "Interface Wi‑Fi, driver sem suporte ou ethtool ausente.",
        "howToConfirm": "Verificar nome da interface e instalar/usar ferramentas disponíveis.",
        "fix": "Use ip link, nmcli ou ferramenta do ambiente e registre a limitação."
      },
      {
        "symptom": "Link cabeado aparece como 100 Mbps quando esperado era 1 Gbps",
        "probableCause": "Cabo inadequado/defeituoso, porta antiga ou negociação problemática.",
        "howToConfirm": "Testar outro cabo, outra porta e outro equipamento.",
        "fix": "Substituir cabo, validar categoria, porta e autonegociação."
      },
      {
        "symptom": "Wi‑Fi com muita variação",
        "probableCause": "Interferência, distância, obstáculos, canal congestionado ou roaming.",
        "howToConfirm": "Testar perto do AP, comparar horários e observar sinal/canal.",
        "fix": "Reposicionar AP, ajustar canais, usar cabeamento para pontos fixos ou planejar site survey."
      }
    ],
    "improvements": [
      "Adicionar teste com cabo diferente.",
      "Comparar 2.4 GHz e 5 GHz/6 GHz quando permitido.",
      "Coletar contadores de erro no switch em laboratório.",
      "Montar topologia Packet Tracer futura para observar link up/down.",
      "Criar checklist de camada física para chamados."
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
      "type": "conceito",
      "q": "O que a camada física faz em uma rede?",
      "opts": [
        "Converte bits em sinais transportáveis por um meio e sinais de volta em bits.",
        "Traduz nomes DNS em endereços IP.",
        "Define regras de firewall entre sub-redes.",
        "Escolhe a melhor rota BGP para a Internet."
      ],
      "a": 0,
      "exp": "A camada física trata da transmissão real de sinais no meio. DNS, firewall e BGP pertencem a camadas/assuntos superiores.",
      "difficulty": "iniciante",
      "topic": "camada física"
    },
    {
      "id": "q0.5.2",
      "type": "comparação",
      "q": "Qual alternativa descreve melhor a fibra óptica?",
      "opts": [
        "Usa pulsos de luz e é menos suscetível a interferência eletromagnética.",
        "Usa ondas de rádio e sempre tem menor latência que cabo.",
        "Usa apenas tensão elétrica em pares de cobre.",
        "É igual ao Wi‑Fi, mas com conector físico."
      ],
      "a": 0,
      "exp": "Fibra óptica transporta luz e é útil para distâncias e capacidade, embora exija cuidados próprios.",
      "difficulty": "iniciante",
      "topic": "fibra"
    },
    {
      "id": "q0.5.3",
      "type": "diagnóstico",
      "q": "Um link cabeado esperado em 1 Gbps aparece como 100 Mbps. Qual hipótese física faz sentido testar primeiro?",
      "opts": [
        "Cabo ou porta negociando abaixo do esperado.",
        "Servidor DNS com cache expirado.",
        "Senha incorreta no sistema operacional.",
        "Certificado TLS vencido."
      ],
      "a": 0,
      "exp": "Velocidade negociada abaixo do esperado aponta para cabo, porta, adaptador, autonegociação ou capacidade do equipamento.",
      "difficulty": "iniciante",
      "topic": "troubleshooting"
    },
    {
      "id": "q0.5.4",
      "type": "segurança",
      "q": "Por que uma tomada de rede ativa em área pública é risco de segurança?",
      "opts": [
        "Pode permitir que um dispositivo não autorizado obtenha conectividade à rede.",
        "Porque DNS sempre fica público nessas tomadas.",
        "Porque todo cabo Ethernet transmite senhas em texto claro.",
        "Porque IPv4 não funciona em ambientes públicos."
      ],
      "a": 0,
      "exp": "O risco é acesso físico à rede sem controle adequado. Mitigações incluem desabilitar portas, 802.1X, NAC e monitoramento.",
      "difficulty": "iniciante",
      "topic": "segurança física"
    },
    {
      "id": "q0.5.5",
      "type": "cenário",
      "q": "No Wi‑Fi, a taxa cai muito quando o usuário se afasta do AP. Qual explicação é mais provável?",
      "opts": [
        "O sinal de rádio foi degradado por distância, obstáculos ou interferência.",
        "O endereço MAC deixou de existir.",
        "O byte passou a ter mais de 8 bits.",
        "O HTTP foi substituído por ARP."
      ],
      "a": 0,
      "exp": "Wi‑Fi depende do ambiente físico. Distância, parede e interferência reduzem qualidade do sinal e taxa útil.",
      "difficulty": "iniciante",
      "topic": "wi-fi"
    },
    {
      "id": "q0.5.6",
      "type": "arquitetura",
      "q": "Em cloud pública, a camada física deixa de existir?",
      "opts": [
        "Não. Ela é abstraída pelo provedor, mas continua influenciando limites, latência e capacidade.",
        "Sim. Cloud é puramente lógica e não usa datacenters.",
        "Sim. Apenas DNS existe em cloud.",
        "Não, mas o cliente sempre escolhe os cabos físicos."
      ],
      "a": 0,
      "exp": "Cloud abstrai hardware físico, mas ele continua existindo no datacenter do provedor e aparece indiretamente em limites, métricas e SLAs.",
      "difficulty": "intermediário",
      "topic": "cloud"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.5.1",
      "front": "O que é sinal físico em redes?",
      "back": "É uma variação elétrica, óptica ou eletromagnética usada para representar bits em um meio.",
      "tags": [
        "camada física"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.5.2",
      "front": "Qual meio usa pulsos de luz?",
      "back": "Fibra óptica.",
      "tags": [
        "fibra"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.5.3",
      "front": "Por que Wi‑Fi é mais variável que cabo?",
      "back": "Porque usa rádio em meio compartilhado, sujeito a distância, obstáculos, interferência e concorrência.",
      "tags": [
        "wi-fi"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.5.4",
      "front": "O que pode indicar erro físico em switch?",
      "back": "Contadores como CRC errors, input errors, link flapping ou velocidade/duplex inesperados.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.5.5",
      "front": "Qual risco de uma porta de rede ativa em área pública?",
      "back": "Dispositivo não autorizado pode obter conectividade à rede interna se não houver controle.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.5.6",
      "front": "Cloud elimina camada física?",
      "back": "Não. A camada física é abstraída pelo provedor, mas continua existindo e influenciando limites e desempenho.",
      "tags": [
        "cloud"
      ],
      "difficulty": "iniciante"
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
      "id": "ex0.5.3",
      "type": "segurança",
      "prompt": "Liste quatro controles para reduzir risco de tomadas de rede ativas em áreas públicas.",
      "expectedAnswer": "Desabilitar portas não usadas, 802.1X/NAC, port security, VLAN de quarentena, monitoramento de MACs, inspeção física e documentação.",
      "explanation": "O controle deve combinar configuração lógica e segurança física."
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
      ],
      "relatedLessons": [
        "0.5",
        "2.1",
        "3.1",
        "12.1"
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
      ],
      "relatedLessons": [
        "0.5",
        "12.2"
      ]
    },
    {
      "term": "Interferência",
      "shortDefinition": "Sinal indesejado que atrapalha a comunicação.",
      "longDefinition": "Pode ocorrer por fontes elétricas, outros rádios, canais sobrepostos ou ambiente físico inadequado.",
      "example": "Um micro-ondas ou muitas redes próximas podem afetar Wi‑Fi em 2.4 GHz.",
      "relatedTerms": [
        "Wi‑Fi",
        "ruído",
        "SNR"
      ],
      "relatedLessons": [
        "0.5",
        "12.3"
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
      ],
      "relatedLessons": [
        "0.5",
        "3.8"
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
      ],
      "relatedLessons": [
        "0.4",
        "0.5",
        "3.1"
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
      ],
      "relatedLessons": [
        "0.5",
        "12.8",
        "13.4"
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
