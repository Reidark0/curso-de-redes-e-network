export const lesson0105 = {
  "id": "1.5",
  "moduleId": "m01",
  "order": 5,
  "title": "Meios de transmissão: cobre, fibra e rádio",
  "subtitle": "Como sinais atravessam cabos metálicos, fibras ópticas e o ar, e como isso muda desempenho, custo, risco e troubleshooting.",
  "duration": "70-100 min",
  "estimatedStudyTimeMinutes": 100,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 190,
  "tags": [
    "redes",
    "fundamentos",
    "camada física",
    "cobre",
    "fibra",
    "rádio",
    "wi-fi",
    "interferência",
    "atenuação",
    "troubleshooting",
    "segurança física"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.5",
      "reason": "A aula 0.5 explicou como sinais físicos carregam dados em nível introdutório."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.4",
      "reason": "Topologias dizem como os pontos se conectam; meios de transmissão explicam por onde os sinais passam."
    }
  ],
  "objectives": [
    "Diferenciar cobre, fibra óptica e rádio como meios de transmissão.",
    "Entender por que distância, interferência, atenuação, ruído e meio compartilhado afetam redes.",
    "Relacionar escolha do meio com custo, desempenho, segurança e operação.",
    "Reconhecer sintomas comuns de falhas físicas e sem fio.",
    "Planejar uma escolha básica de meio para casa, empresa, datacenter, campus e cloud connectivity."
  ],
  "learningOutcomes": [
    "Dado um cenário, o aluno escolhe cobre, fibra ou rádio com justificativa técnica.",
    "Dado um sintoma de instabilidade, o aluno levanta hipóteses de camada física e coleta evidências iniciais.",
    "Dado um desenho de rede, o aluno identifica riscos de segurança física, interferência e exposição do meio."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Uma rede pode estar perfeitamente configurada em IP, DNS, firewall e aplicação e ainda assim falhar porque o sinal não chega bem. Um cabo amassado, um conector mal crimpado, uma fibra com curvatura excessiva, um rádio sofrendo interferência ou um access point instalado no lugar errado causam sintomas que parecem problema de sistema, de cloud ou de segurança.</p>\n  <p>Redes não transportam conceitos abstratos: transportam sinais. Antes do IP, do TCP, do TLS e do login, existe um meio carregando variações elétricas, pulsos de luz ou ondas eletromagnéticas.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma filial reclama que a VPN cai. O time de aplicação culpa o sistema, o SOC suspeita de ataque, o provedor diz que o link está ativo, mas o switch mostra erros de CRC na porta. O problema não era a VPN: era o meio físico degradando os quadros.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Cada meio se firmou onde resolve melhor um problema. As primeiras LANs usavam cabo coaxial compartilhado em barramento; com a Ethernet comutada, o par trançado tomou o acesso por ser barato e fácil de instalar. A fibra óptica ganhou o backbone quando distância, taxa e imunidade a ruído passaram a pesar. O rádio (Wi‑Fi, Bluetooth, 4G/5G, enlaces ponto a ponto, IoT) trouxe mobilidade, ao preço de interferência, espectro compartilhado, alcance variável e exposição do meio.</p>\n  <p>O problema técnico é escolher e operar o meio certo para cada necessidade, sabendo que todo meio tem limites:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem entender cobre:</strong> você culpa o IP quando a porta está negociando errado ou gerando erros físicos.</li>\n    <li><strong>Sem entender fibra:</strong> você trata o backbone como “cabo mágico” e ignora transceptores, conectores e orçamento óptico.</li>\n    <li><strong>Sem entender rádio:</strong> você promete estabilidade de cabo num meio compartilhado e sujeito a interferência.</li>\n    <li><strong>Sem entender a segurança do meio:</strong> portas expostas, racks abertos, Wi‑Fi mal configurado e fibras sem controle físico viram risco.</li>\n  </ul>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> meio de transmissão é o caminho físico ou sem fio pelo qual o sinal de rede se propaga entre dispositivos. O cobre usa variações elétricas; a fibra usa luz; o rádio usa ondas eletromagnéticas no ar.</div>\n  <p>O meio não define o protocolo, o endereço nem a aplicação, mas impõe limites de velocidade, distância, estabilidade, custo e risco. Perda, jitter, renegociação, desconexão e instabilidade intermitente podem nascer aqui.</p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table comparison-table\">\n      <thead><tr><th>Aspecto</th><th>Cobre (par trançado)</th><th>Fibra óptica</th><th>Rádio (Wi‑Fi)</th></tr></thead>\n      <tbody>\n        <tr><td>Sinal</td><td>Elétrico, em pares de fios</td><td>Pulsos de luz em vidro ou plástico</td><td>Ondas eletromagnéticas pelo ar</td></tr>\n        <tr><td>Vantagens</td><td>Barato, comum, PoE</td><td>Longo alcance, alta taxa, pouca sensibilidade a interferência eletromagnética, isolamento elétrico</td><td>Mobilidade, instalação rápida</td></tr>\n        <tr><td>Limitações</td><td>Distância (canal Ethernet de até 100 m), categoria do cabo, conector, interferência, negociação</td><td>Transceptor compatível com o tipo de fibra, conectores limpos, raio de curvatura, potência e orçamento óptico</td><td>Meio compartilhado: canal, potência, obstáculos, ruído, densidade de clientes; sinal atravessa paredes</td></tr>\n        <tr><td>Custo</td><td>Menor por ponto de acesso</td><td>Maior em transceptores, instalação e manutenção</td><td>Menos cabos, mas exige APs, gestão, site survey e manutenção</td></tr>\n        <tr><td>Uso típico</td><td>Estações, impressoras, APs, câmeras, telefones IP</td><td>Backbone, datacenter, campus, operadora, entre prédios</td><td>Usuários móveis, visitantes, IoT, locais sem cabeamento</td></tr>\n        <tr><td>Evite quando</td><td>A distância passa da especificação</td><td>Faltam controle físico, limpeza e documentação</td><td>O sistema é crítico e fixo (câmeras, backbone) e não houve avaliação</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Luz da porta acesa = link saudável.</strong> Erros e retransmissões continuam ocultos: confira velocidade negociada, duplex, contadores de erro e histórico de flaps.</li>\n      <li><strong>Wi‑Fi como cabo invisível.</strong> Planeje cobertura, canal, potência, autenticação e capacidade.</li>\n      <li><strong>Fibra só por ser “mais rápida”.</strong> Justifique por distância, backbone, imunidade a ruído, taxa ou isolamento elétrico; senão é custo sem necessidade.</li>\n      <li><strong>Esquecer a segurança física.</strong> Com foco só em firewall e senha, um visitante conecta um equipamento indevido. Use controle de portas, NAC/802.1X, inventário e travamento físico.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>O ciclo é o mesmo nos três meios: o transmissor codifica bits em um sinal, o meio o propaga, o receptor tenta interpretar a variação recebida e as camadas superiores validam quadros, detectam erros e retransmitem.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Cobre:</strong> a placa ou a porta do switch transforma bits em variações elétricas nos pares de fios. O trançamento reduz interferência, mas não elimina problemas de distância, blindagem, conector e ruído. O 1000BASE-T (1 Gbps) usa os quatro pares; o 100BASE-TX (100 Mbps), dois. Por isso um par danificado pode fazer a porta negociar 100 Mbps, ou nem subir o link.</li>\n    <li><strong>Fibra:</strong> transceptores convertem sinais elétricos em pulsos de luz, e o transceptor da outra ponta converte a luz de volta em sinal elétrico.</li>\n    <li><strong>Rádio:</strong> o rádio modula a informação em ondas eletromagnéticas. O receptor precisa distinguir o sinal útil de ruído, interferência e reflexões.</li>\n    <li><strong>Validação:</strong> se o sinal chega degradado, o quadro falha na verificação de CRC e é descartado, os protocolos superiores retransmitem e o usuário percebe lentidão ou queda.</li>\n  </ol>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Fenômeno</th><th>O que é</th><th>Exemplo</th><th>Como reduzir</th></tr></thead>\n      <tbody>\n        <tr><td>Atenuação</td><td>Perda de intensidade do sinal ao longo do meio; cresce com a distância</td><td>Cabo longo demais, conector de fibra sujo, cliente longe do AP</td><td>Respeitar a distância, limpar conectores, reposicionar APs</td></tr>\n        <tr><td>Ruído e interferência</td><td>Energia indesejada somada ao sinal. SNR (relação sinal-ruído) baixa = mais bits errados e, no Wi‑Fi, taxa menor</td><td>Cobre mal instalado perto de fonte elétrica; muitos APs no mesmo canal</td><td>Certificação de cabos; planejamento de canais e análise de espectro</td></tr>\n        <tr><td>Meio compartilhado</td><td>No rádio, quem está no mesmo canal disputa o tempo de transmissão</td><td>AP sobrecarregado, perda em horário de pico</td><td>Planejar densidade, separar canais, cabear o que é fixo</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>É por isso que um problema físico aparece como problema de aplicação: o TCP retransmite, o TLS demora, o HTTP parece lento e o usuário diz apenas “o sistema caiu”.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>Na prática os três meios convivem num mesmo caminho: o notebook usa Wi‑Fi até o AP, o AP usa cobre até o switch, o switch usa fibra até o core e a empresa usa circuitos de operadora para chegar à cloud. Em cada camada da arquitetura corporativa predomina um meio:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Acesso:</strong> cobre para estações, telefones IP, câmeras e APs; Wi‑Fi para mobilidade.</li>\n    <li><strong>Distribuição e core:</strong> fibra para uplinks de alta capacidade e maior distância.</li>\n    <li><strong>Datacenter:</strong> cobre de curta distância e fibra para uplinks, storage, spine-leaf e interconexões.</li>\n    <li><strong>Campus:</strong> fibra entre prédios; cobre dentro das salas; rádio onde o cabeamento não atende.</li>\n    <li><strong>Cloud:</strong> o meio físico é abstraído, mas links dedicados, VPN, interconexão e região ainda dependem de infraestrutura física real.</li>\n  </ul>\n  <p>Escolha o meio por requisito (alcance, disponibilidade, taxa, latência, custo, segurança, manutenção e crescimento), não por moda. Quando o enlace é crítico para a operação, prefira redundância com rotas físicas distintas: ela custa mais, mas reduz o impacto financeiro de uma indisponibilidade.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense nos meios como caminhos diferentes para entregar mensagens. O cobre é uma rua interna barata e prática. A fibra é uma rodovia expressa de alta capacidade entre cidades. O rádio é uma conversa por alto-falante num ambiente aberto: prática e móvel, mas sujeita a ruído e a terceiros escutando se não houver proteção.</p>\n  <div class=\"callout warning\"><strong>Limite da analogia:</strong> sinais sofrem atenuação, interferência, reflexão e erro de formas que estradas não representam.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu celular usa rádio até o roteador Wi‑Fi. O roteador pode usar cobre até o modem ou a ONT, e a operadora pode usar fibra até o prédio ou até sua residência. Quando o Wi‑Fi fica ruim no quarto, pode não haver problema de internet: pode ser distância, parede, canal congestionado, potência baixa ou interferência.</p>\n  <p>Se você conecta o notebook por cabo e a experiência melhora, isso não “prova” que a internet era ruim; sugere que o trecho sem fio era o gargalo principal.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Numa empresa, estações usam cobre até os switches de acesso, os APs recebem dados e energia pelo mesmo cabo (PoE) e os switches de acesso sobem por fibra até o core. Racks ficam organizados, etiquetados e trancados, e salas críticas usam caminhos redundantes para que uma única fibra rompida não derrube um prédio inteiro.</p>\n  <p>No troubleshooting, as evidências físicas que importam são: porta down, velocidade negociada diferente do esperado, duplex incorreto, erros CRC e input errors subindo, potência óptica fora da faixa, AP com muitos clientes ou canal saturado.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Uma VPC ou VNet abstrai switches, roteadores e fibras, mas zonas de disponibilidade, regiões, links dedicados e a latência entre locais continuam refletindo limites físicos. Ao conectar a empresa à cloud por VPN site-to-site, Direct Connect, ExpressRoute ou interconexão equivalente, o caminho físico e o provedor escolhidos afetam disponibilidade, latência, custo e risco. Uma arquitetura multi-região também não elimina a física: ela distribui a dependência por locais diferentes.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m01l05-title m01l05-desc\">\n    <title id=\"m01l05-title\">Cobre, fibra e rádio como meios de transmissão</title>\n    <desc id=\"m01l05-desc\">O diagrama mostra cliente Wi-Fi, ponto de acesso, switch, fibra para core e serviço, destacando ruído, atenuação e limites do meio.</desc>\n    <defs>\n      <marker id=\"m01l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"120\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n    <text x=\"120\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rádio/Wi‑Fi</text>\n    <rect x=\"285\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"370\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Access Point</text>\n    <text x=\"370\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cobre + PoE</text>\n    <rect x=\"535\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"620\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"620\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Uplink</text>\n    <rect x=\"785\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"870\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Core/Serviço</text>\n    <text x=\"870\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Fibra</text>\n    <path d=\"M205 110 C235 40, 255 180, 285 110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l05-arrow)\" />\n    <line x1=\"455\" y1=\"110\" x2=\"535\" y2=\"110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l05-arrow)\" />\n    <line x1=\"705\" y1=\"110\" x2=\"785\" y2=\"110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l05-arrow)\" />\n    <rect x=\"60\" y=\"235\" width=\"240\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"180\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Rádio</text>\n    <text x=\"180\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mobilidade, canal, obstáculos</text>\n    <text x=\"180\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">interferência e meio compartilhado</text>\n    <rect x=\"370\" y=\"235\" width=\"240\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Cobre</text>\n    <text x=\"490\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">baixo custo, PoE, até o acesso</text>\n    <text x=\"490\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">distância, conector, ruído</text>\n    <rect x=\"680\" y=\"235\" width=\"240\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"800\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Fibra</text>\n    <text x=\"800\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">alta taxa e longo alcance</text>\n    <text x=\"800\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">transceptor, limpeza, curvatura</text>\n  </svg>\n</section>\n",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Pergunta-chave:</strong> antes de culpar um protocolo, o sinal chega bem? O meio serve para a distância, o ambiente, a mobilidade, o custo e o risco?</li>\n    <li><strong>Os três meios:</strong> cobre domina o acesso e leva PoE; fibra é forte em backbone e longas distâncias; rádio dá mobilidade, mas é compartilhado e exposto.</li>\n    <li><strong>O que degrada o sinal:</strong> atenuação, ruído e interferência (SNR baixa) e disputa pelo meio; o resultado vira erros CRC, retransmissão, lentidão e queda.</li>\n    <li><strong>Erro comum:</strong> culpar IP, DNS ou aplicação sem verificar link, velocidade negociada, contadores de erro e sinal.</li>\n    <li><strong>Segurança:</strong> porta ativa, rack aberto e Wi‑Fi além das paredes são risco de acesso; enlace único é risco de indisponibilidade.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, cabeamento estruturado e padrões RJ‑45, você sai da visão geral do meio e entra na organização prática de tomadas, patch panels, racks, categorias de cabo e documentação física.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "Ethernet",
      "Wi-Fi",
      "PoE",
      "LLDP",
      "CDP"
    ],
    "dependsOn": [
      "representação digital",
      "sinais físicos",
      "topologia física e lógica"
    ],
    "enables": [
      "cabeamento estruturado",
      "switching",
      "Wi-Fi",
      "troubleshooting físico",
      "segurança de portas"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "link cai e volta",
      "baixa velocidade negociada",
      "muitos erros CRC",
      "Wi‑Fi instável",
      "latência variável",
      "perda em horários de pico",
      "AP sobrecarregado"
    ],
    "diagnosticQuestions": [
      "O problema ocorre por cabo e por Wi‑Fi ou apenas em um meio?",
      "A velocidade negociada é a esperada?",
      "Há erros físicos na porta do switch?",
      "A fibra usa transceptor compatível e está limpa?",
      "O Wi‑Fi está em canal congestionado ou com sinal fraco?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetAdapter | Select-Object Name, Status, LinkSpeed",
        "purpose": "Ver adaptadores e velocidade negociada.",
        "expectedObservation": "Status Up e LinkSpeed coerente com o ambiente (ex.: 1 Gbps).",
        "interpretation": "Velocidade abaixo do esperado pode indicar cabo, porta, driver ou negociação."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver SSID, canal, sinal e taxas do Wi‑Fi.",
        "expectedObservation": "Sinal e taxas coerentes com a distância do AP.",
        "interpretation": "Sinal baixo ou taxa instável sugerem problema sem fio."
      },
      {
        "platform": "Linux",
        "command": "ip link show && ethtool <interface>",
        "purpose": "Ver estado do link e detalhes de negociação em interface cabeada.",
        "expectedObservation": "Link detected: yes, com Speed e Duplex esperados.",
        "interpretation": "Ausência de link ou speed inesperada aponta para camada física ou driver."
      },
      {
        "platform": "Linux",
        "command": "iw dev && iw dev <interface> link",
        "purpose": "Ver interface Wi‑Fi, SSID, sinal e taxa.",
        "expectedObservation": "Sinal em dBm e taxa do link.",
        "interpretation": "Sinal muito fraco ou taxa baixa indica problema de rádio."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status",
        "purpose": "Ver portas, VLAN, duplex e speed.",
        "expectedObservation": "Portas connected com speed/duplex esperados.",
        "interpretation": "Speed/duplex anormais sugerem cabo, endpoint ou configuração."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces counters errors",
        "purpose": "Ver erros físicos e de quadros por porta.",
        "expectedObservation": "Contadores baixos ou zerados, sem crescer entre duas leituras.",
        "interpretation": "FCS-Err (CRC inválido) e Rcv-Err crescendo apontam cabo, conector, porta ou interferência; em show interfaces <porta> aparecem como CRC e input errors."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces transceiver",
        "purpose": "Ver potência óptica de Tx e Rx em transceptores com monitoramento digital (DOM).",
        "expectedObservation": "Tx e Rx dentro da faixa do módulo.",
        "interpretation": "Rx baixo sugere atenuação: conector sujo, curvatura, distância excessiva ou transceptor incompatível."
      }
    ],
    "decisionTree": [
      {
        "if": "Somente Wi‑Fi falha",
        "then": "Verificar sinal, canal, interferência, quantidade de clientes, autenticação e distância do AP."
      },
      {
        "if": "Somente cabo falha",
        "then": "Verificar cabo, porta, patch panel, velocidade negociada, duplex e erros no switch."
      },
      {
        "if": "Backbone apresenta perda",
        "then": "Verificar fibra, transceptor, potência óptica, caminho físico e redundância."
      },
      {
        "if": "Aplicação lenta sem perda local",
        "then": "Investigar camadas superiores, rota, firewall, DNS, TLS e servidor."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Desativar portas não utilizadas.",
      "Usar 802.1X/NAC quando possível, com VLAN de quarentena para dispositivos não autenticados.",
      "Separar Wi‑Fi corporativo e visitante.",
      "Proteger racks, patch panels e salas técnicas e registrar quem pode acessá-los.",
      "Etiquetar e documentar cabos, fibras, enlaces críticos e rotas físicas."
    ],
    "badPractices": [
      "Deixar pontos de rede ativos em áreas públicas.",
      "Compartilhar senha única de Wi‑Fi corporativo por anos.",
      "Misturar visitantes e rede interna.",
      "Ignorar erros físicos recorrentes."
    ],
    "commonErrors": [
      "Confundir disponibilidade de link com autorização de acesso.",
      "Achar que Wi‑Fi com senha simples equivale a rede segura.",
      "Ignorar logs de switch e controladora sem fio."
    ],
    "vulnerabilities": [
      {
        "name": "Acesso físico indevido",
        "description": "Portas de rede ativas em áreas públicas ou racks destrancados permitem conectar equipamentos não autorizados.",
        "defensiveExplanation": "O risco não depende de exploração sofisticada; basta uma porta ativa e ausência de controle.",
        "mitigation": "Desativar portas sem uso, 802.1X/NAC, VLAN de quarentena, inventário, alertas e segurança física."
      },
      {
        "name": "Wi‑Fi exposto além do perímetro",
        "description": "O sinal atravessa paredes e alcança áreas externas; senha compartilhada, WPA antigo ou rede visitante sem isolamento ampliam o risco.",
        "defensiveExplanation": "O atacante não precisa entrar no prédio para tentar associação ou capturar metadados; uma rede visitante sem isolamento abre caminho para movimento lateral.",
        "mitigation": "WPA3/WPA2-Enterprise quando possível, rede visitante isolada, rotação de credenciais, controle de potência e monitoramento."
      },
      {
        "name": "Indisponibilidade por meio único",
        "description": "Um único cabo, fibra ou rádio crítico, sem proteção física nem redundância, é ponto único de falha.",
        "defensiveExplanation": "Falhas físicas derrubam serviços mesmo com aplicações corretas.",
        "mitigation": "Redundância, rotas físicas distintas, documentação, monitoramento e testes de failover."
      }
    ],
    "monitoring": [
      "Eventos de link up/down e flaps de interface",
      "Mudança de velocidade de porta",
      "Erros CRC e perda em enlaces críticos",
      "Clientes Wi‑Fi desconhecidos",
      "Alterações de MAC em portas"
    ],
    "hardening": [
      "Port-security quando aplicável",
      "WPA2/WPA3-Enterprise no Wi‑Fi corporativo",
      "Controle físico de rack e sala técnica"
    ],
    "detectionIdeas": [
      "Alertar porta que fica ativa fora do expediente",
      "Comparar os MACs vistos nas portas com o inventário",
      "Auditar SSIDs e APs não autorizados (rogue)",
      "Revisar contadores de erro periodicamente"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que não basta dizer que 'a rede está configurada' se o meio físico está instável?",
      "hints": [
        "Pense em sinal antes de pacote.",
        "Pense em retransmissões e perda."
      ],
      "expectedIdeas": [
        "camada física",
        "sinal",
        "erro",
        "retransmissão",
        "sintoma de aplicação"
      ],
      "explanation": "Protocolos superiores dependem de um meio suficientemente confiável. Se o sinal falha, as camadas superiores sofrem."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário via Wi‑Fi reclama de lentidão, mas via cabo o sistema funciona bem. Que hipóteses você testaria?",
      "hints": [
        "Pense em sinal, canal e densidade.",
        "Não culpe DNS primeiro."
      ],
      "expectedIdeas": [
        "sinal fraco",
        "interferência",
        "canal congestionado",
        "AP sobrecarregado",
        "roaming",
        "distância"
      ],
      "explanation": "A comparação cabo versus Wi‑Fi ajuda a localizar o problema no meio sem fio ou no acesso."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa vai interligar dois prédios próximos. Quando fibra é mais justificável do que cobre?",
      "hints": [
        "Pense em distância e interferência.",
        "Pense em isolamento elétrico e backbone."
      ],
      "expectedIdeas": [
        "distância",
        "alta capacidade",
        "imunidade eletromagnética",
        "backbone",
        "segurança física",
        "custo justificado"
      ],
      "explanation": "Fibra é especialmente forte em interligação, backbone e distâncias maiores, mas deve ser justificada por requisito."
    }
  ],
  "quiz": [
    {
      "id": "q1.5.1",
      "question": "Qual alternativa descreve corretamente a diferença entre cobre, fibra e rádio?",
      "options": [
        "Cobre e fibra usam sinais elétricos; só o rádio usa ondas eletromagnéticas.",
        "Cobre usa sinais elétricos, fibra usa luz e rádio usa ondas eletromagnéticas.",
        "Fibra usa ondas de rádio guiadas; cobre usa pulsos de luz.",
        "Os três usam o mesmo sinal elétrico; muda só o conector."
      ],
      "answer": 1,
      "explanation": "Cobre leva variações elétricas, a fibra leva pulsos de luz gerados por transceptores e o rádio modula ondas eletromagnéticas no ar.",
      "topic": "meios",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.5.2",
      "question": "Uma porta de switch mostra muitos erros CRC. Qual hipótese deve ser considerada?",
      "options": [
        "DNS respondendo com o endereço errado.",
        "Senha incorreta do usuário na aplicação.",
        "Problema físico: cabo, conector, porta ou interferência.",
        "Certificado TLS expirado."
      ],
      "answer": 2,
      "explanation": "CRC inválido significa quadro corrompido no caminho, quase sempre por meio físico ou porta. Senha, DNS e TLS ficam em camadas acima e não corrompem quadros.",
      "topic": "troubleshooting",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q1.5.3",
      "question": "Qual é uma vantagem comum da fibra óptica?",
      "options": [
        "Maior alcance e menor suscetibilidade a interferência eletromagnética.",
        "Dispensa transceptores nas portas do switch.",
        "Custa menos que o cobre por ponto de usuário.",
        "Tolera curvatura e conector sujo sem perder sinal."
      ],
      "answer": 0,
      "explanation": "A fibra é forte em backbone e longas distâncias, mas exige transceptores, conectores limpos, cuidado com a curvatura e custa mais por ponto.",
      "topic": "fibra",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.5.4",
      "question": "Qual prática reduz risco de portas físicas expostas?",
      "options": [
        "Trocar os cabos por Wi‑Fi com uma senha única para todos.",
        "Deixar as portas ativas na VLAN interna para facilitar o suporte.",
        "Confiar que só funcionários usam as tomadas da recepção.",
        "Desativar portas não usadas e usar NAC/802.1X quando possível."
      ],
      "answer": 3,
      "explanation": "Com a porta desativada, ou exigindo autenticação de porta (802.1X/NAC), um equipamento qualquer não ganha acesso só por estar conectado. Link ativo não é autorização.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q1.5.5",
      "question": "Por que Wi‑Fi não deve ser tratado como cabo invisível?",
      "options": [
        "Porque o Wi‑Fi não usa protocolos de camada 2.",
        "Porque rádio é meio compartilhado, sujeito a interferência, obstáculos e variação de sinal.",
        "Porque o Wi‑Fi sempre entrega mais banda que o cabo.",
        "Porque o sinal do Wi‑Fi fica restrito à sala do AP."
      ],
      "answer": 1,
      "explanation": "Clientes do mesmo canal disputam o tempo de transmissão, o sinal varia com distância e obstáculos e atravessa paredes. Wi‑Fi exige planejar canal, potência, densidade e autenticação.",
      "topic": "wi-fi",
      "difficulty": "iniciante-intermediário",
      "type": "cenário"
    },
    {
      "id": "q1.5.6",
      "question": "Em cloud, por que ainda importa entender meios físicos?",
      "options": [
        "Porque uma arquitetura multi-região elimina a dependência de enlaces físicos.",
        "Porque na VPC você escolhe a categoria do cabo de cada instância.",
        "Porque regiões, zonas, links dedicados e latência dependem de infraestrutura física real.",
        "Porque a VPN site-to-site dispensa o circuito físico até o provedor."
      ],
      "answer": 2,
      "explanation": "A VPC abstrai switches e fibras, mas não remove distância nem dependência de interconexão. Multi-região distribui a dependência física; não a elimina.",
      "topic": "cloud",
      "difficulty": "intermediário",
      "type": "cloud"
    },
    {
      "id": "q1.5.7",
      "question": "Uma câmera IP está ligada ao switch por um cabo de par trançado de 130 m, e o link cai e volta várias vezes ao dia. Qual é a causa mais provável?",
      "options": [
        "O servidor DNS está respondendo devagar.",
        "O canal Wi‑Fi do local está congestionado.",
        "O firewall bloqueia a câmera em alguns horários.",
        "O cabo passa do limite de 100 m do par trançado, e a atenuação deixa o sinal no limite."
      ],
      "answer": 3,
      "explanation": "O canal Ethernet em par trançado vai até 100 m; acima disso a atenuação gera erros, renegociação e flaps. DNS e firewall não derrubam o link físico, e a câmera está cabeada.",
      "topic": "cobre",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.5.1",
      "front": "O que é meio de transmissão?",
      "back": "É o caminho físico ou sem fio pelo qual sinais de rede são propagados entre dispositivos.",
      "tags": [
        "camada física"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.2",
      "front": "Como o cobre transporta dados?",
      "back": "Por variações elétricas em fios, normalmente pares trançados em redes Ethernet modernas.",
      "tags": [
        "cobre"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.3",
      "front": "Como a fibra transporta dados?",
      "back": "Por pulsos de luz convertidos por transceptores ópticos.",
      "tags": [
        "fibra"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.7",
      "front": "O que é atenuação?",
      "back": "Perda de intensidade do sinal ao longo do meio. Cresce com a distância e com meio ruim (cabo longo, conector sujo, curvatura na fibra).",
      "tags": [
        "atenuação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.8",
      "front": "O que significa SNR baixa?",
      "back": "O sinal útil está pouco acima do ruído: o receptor erra mais bits e, no Wi‑Fi, a taxa cai.",
      "tags": [
        "rádio",
        "interferência"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc1.5.9",
      "front": "Por que o rádio é um meio compartilhado?",
      "back": "Porque os dispositivos de um mesmo canal disputam o tempo de transmissão; mais clientes significam menos tempo de ar para cada um.",
      "tags": [
        "rádio",
        "wi-fi"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc1.5.6",
      "front": "Qual risco existe em portas de rede ativas em áreas públicas?",
      "back": "Conexão de dispositivos não autorizados, exigindo controles como desativação de portas, NAC e 802.1X.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex1.5.1",
      "type": "conceitual",
      "prompt": "Explique quando você escolheria cobre, fibra e rádio em uma rede pequena.",
      "expectedAnswer": "Cobre para pontos fixos e APs, fibra para backbone/interligação/longa distância, rádio para mobilidade e visitantes.",
      "explanation": "A escolha deve seguir requisito, não preferência."
    },
    {
      "id": "ex1.5.2",
      "type": "diagnóstico",
      "prompt": "Um desktop cabeado negocia a 100 Mbps em uma rede esperada de 1 Gbps. Liste três hipóteses.",
      "expectedAnswer": "Cabo inadequado ou danificado (um par ruim pode fazer o link cair para 100BASE-TX, que usa só dois pares), conector mal crimpado, porta limitada, patch panel ou equipamento intermediário limitado, driver ou configuração de negociação.",
      "explanation": "Velocidade negociada abaixo do esperado costuma apontar para camada física ou capacidade do equipamento."
    },
    {
      "id": "ex1.5.3",
      "type": "segurança",
      "prompt": "Liste quatro controles para reduzir risco de acesso físico indevido por cabo.",
      "expectedAnswer": "Desativar portas sem uso, NAC/802.1X, port-security quando aplicável, VLAN de quarentena, controle físico de racks e inventário.",
      "explanation": "Segurança de rede começa também no ponto físico de conexão."
    },
    {
      "id": "ex1.5.4",
      "type": "arquitetura",
      "prompt": "Uma empresa vai interligar dois prédios por fibra óptica e precisa de baixa latência e alta disponibilidade. Que cuidados de desenho e operação você adicionaria ao enlace?",
      "expectedAnswer": "Redundância com rotas físicas distintas quando possível, transceptores compatíveis com a fibra, documentação e etiquetagem, monitoramento de link e potência óptica e testes de failover.",
      "explanation": "A fibra atende distância e capacidade, mas a disponibilidade depende de desenho e operação: uma única fibra é ponto único de falha."
    }
  ],
  "challenge": {
    "title": "Escolha de meios para uma pequena empresa",
    "scenario": "Uma empresa possui recepção pública, sala administrativa, estoque com coletores móveis, câmeras IP, Wi‑Fi de visitantes, rack central e possibilidade futura de interligar outro prédio.",
    "tasks": [
      "Definir onde usar cobre, fibra e rádio.",
      "Indicar riscos de cada meio.",
      "Propor controles mínimos de segurança.",
      "Indicar evidências de troubleshooting para cada meio."
    ],
    "constraints": [
      "Evitar gasto desnecessário.",
      "Visitantes não podem acessar rede interna.",
      "Câmeras precisam de estabilidade.",
      "O desenho deve permitir crescimento."
    ],
    "expectedDeliverables": [
      "Tabela de meios por área",
      "Lista de riscos",
      "Controles de segurança",
      "Plano de validação"
    ],
    "gradingRubric": [
      {
        "criterion": "Escolha técnica dos meios",
        "points": 30,
        "description": "Justifica cobre, fibra e rádio por requisito."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Inclui segmentação, controle de portas, Wi‑Fi visitante e proteção física."
      },
      {
        "criterion": "Operação",
        "points": 25,
        "description": "Prevê documentação, monitoramento e troubleshooting."
      },
      {
        "criterion": "Custo e crescimento",
        "points": 20,
        "description": "Evita excesso e deixa caminho para expansão."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separam-se pontos fixos, móveis, críticos e públicos. Depois escolhe-se meio por requisito: estabilidade, mobilidade, distância, segurança e custo.",
    "steps": [
      "Usar cobre para desktops, câmeras IP e APs quando dentro de distância adequada.",
      "Usar PoE para APs e câmeras se os switches suportarem.",
      "Usar rádio para visitantes e coletores móveis, com redes separadas.",
      "Planejar fibra para backbone ou futuro prédio, se distância e capacidade justificarem.",
      "Desativar portas sem uso e proteger rack.",
      "Criar validação com link speed, erros de porta, sinal Wi‑Fi e documentação."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Usar Wi‑Fi para tudo porque é mais fácil.",
        "whyItIsWrong": "Mobilidade não substitui estabilidade para câmeras, desktops críticos e backbone."
      },
      {
        "answer": "Usar fibra para todos os pontos de usuário.",
        "whyItIsWrong": "Pode ser tecnicamente possível, mas tende a ser caro e desnecessário para acesso comum."
      },
      {
        "answer": "Deixar visitantes na mesma rede por simplicidade.",
        "whyItIsWrong": "Aumenta risco de movimento lateral e exposição de ativos internos."
      }
    ],
    "finalAnswer": "Uma solução equilibrada usa cobre para acesso fixo e APs, rádio segmentado para mobilidade e visitantes, fibra para backbone ou expansão entre prédios, controles físicos e lógicos, documentação e monitoramento de link e sinal."
  },
  "glossary": [
    {
      "term": "Meio de transmissão",
      "shortDefinition": "Caminho físico ou sem fio usado para transportar sinais de rede.",
      "longDefinition": "Pode ser cobre, fibra óptica, rádio ou outro meio capaz de propagar sinais que representam bits.",
      "example": "Cabo Ethernet, fibra entre switches e Wi‑Fi até o notebook.",
      "relatedTerms": [
        "camada física",
        "sinal",
        "cobre",
        "fibra",
        "rádio"
      ],
      "relatedLessons": [
        "0.5",
        "1.5"
      ]
    },
    {
      "term": "Atenuação",
      "shortDefinition": "Perda de intensidade do sinal ao longo do meio.",
      "longDefinition": "Quanto maior a distância ou pior o meio, mais o sinal pode enfraquecer até dificultar interpretação pelo receptor.",
      "example": "Um cabo muito longo ou uma fibra com problema pode ter sinal insuficiente.",
      "relatedTerms": [
        "sinal",
        "fibra",
        "cobre"
      ],
      "relatedLessons": [
        "0.5",
        "1.5"
      ]
    },
    {
      "term": "Interferência",
      "shortDefinition": "Influência externa que degrada o sinal útil.",
      "longDefinition": "Pode vir de fontes eletromagnéticas, outros rádios, cabos mal instalados ou ambientes ruidosos.",
      "example": "Wi‑Fi instável perto de muitos APs no mesmo canal.",
      "relatedTerms": [
        "ruído",
        "rádio",
        "SNR"
      ],
      "relatedLessons": [
        "1.5",
        "12.1"
      ]
    },
    {
      "term": "SNR",
      "shortDefinition": "Relação sinal-ruído: quanto o sinal útil está acima do ruído.",
      "longDefinition": "Quanto menor a SNR, mais difícil para o receptor distinguir o sinal, mais bits errados e, no Wi‑Fi, menor a taxa negociada.",
      "example": "Um notebook longe do AP, com muitos APs vizinhos no mesmo canal, tem SNR baixa e taxa instável.",
      "relatedTerms": [
        "ruído",
        "interferência",
        "rádio"
      ],
      "relatedLessons": [
        "1.5"
      ]
    },
    {
      "term": "Transceptor",
      "shortDefinition": "Componente que transmite e recebe sinais, frequentemente usado em fibra.",
      "longDefinition": "Em switches, módulos ópticos convertem sinais elétricos em luz e luz em sinais elétricos.",
      "example": "Um módulo SFP conectado ao switch para uplink de fibra.",
      "relatedTerms": [
        "fibra",
        "SFP",
        "uplink"
      ],
      "relatedLessons": [
        "1.5",
        "1.7"
      ]
    },
    {
      "term": "PoE",
      "shortDefinition": "Power over Ethernet, energia elétrica entregue pelo cabo de rede.",
      "longDefinition": "Permite alimentar APs, câmeras e telefones IP usando o mesmo cabo usado para dados, quando equipamentos suportam o padrão.",
      "example": "Um access point alimentado pelo switch via cabo Ethernet.",
      "relatedTerms": [
        "cobre",
        "switch",
        "access point"
      ],
      "relatedLessons": [
        "1.5",
        "1.7"
      ]
    },
    {
      "term": "CRC",
      "shortDefinition": "Verificação usada para detectar erros em quadros.",
      "longDefinition": "Contadores de CRC em interfaces ajudam a identificar quadros corrompidos, muitas vezes por problemas físicos.",
      "example": "Porta de switch com muitos CRC errors após cabo danificado.",
      "relatedTerms": [
        "erro",
        "quadro",
        "troubleshooting"
      ],
      "relatedLessons": [
        "1.5",
        "3.1"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_3-2022.html",
      "note": "Referência técnica para Ethernet cabeada."
    },
    {
      "type": "standard",
      "title": "IEEE 802.11 Wireless LAN",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_11-2020.html",
      "note": "Referência técnica para redes sem fio Wi‑Fi."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.5",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m00/0.5",
      "note": "Base conceitual sobre sinais físicos."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m02",
      "lesson": "infra física e virtualização",
      "reason": "Racks, servidores, links e redes físicas sustentam plataformas e clusters."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m01",
      "lesson": "controle de acesso",
      "reason": "Controle físico e acesso à rede são parte da superfície de identidade e autorização do ambiente."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "exerciseDone",
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "1.6"
    ]
  }
};
