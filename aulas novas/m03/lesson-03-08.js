export const lesson0308 = {
  "id": "3.8",
  "moduleId": "m03",
  "order": 8,
  "title": "STP: evitando loops e broadcast storms",
  "subtitle": "Como switches mantêm redundância física sem transformar a LAN em um ciclo de frames, broadcast e instabilidade.",
  "duration": "90-130 min",
  "estimatedStudyTimeMinutes": 130,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 220,
  "tags": [
    "redes",
    "ethernet",
    "switch",
    "stp",
    "spanning tree",
    "camada 2",
    "loops",
    "broadcast storm",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.3",
      "reason": "É necessário entender como switches aprendem MACs, encaminham frames e fazem flooding."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.4",
      "reason": "STP existe para evitar loops e broadcast storms em domínios de Camada 2."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "VLANs criam domínios de Camada 2 separados; STP opera por domínio ou instância, conforme a implementação."
    }
  ],
  "objectives": [
    "Explicar por que loops de Camada 2 são perigosos em redes com switches redundantes.",
    "Descrever o papel do STP na criação de uma topologia lógica sem ciclos.",
    "Entender root bridge, bridge ID, root port, designated port e blocked/alternate port em nível prático.",
    "Relacionar STP com broadcast storms, MAC flapping, VLANs, trunks e troubleshooting.",
    "Aplicar boas práticas defensivas como root guard, BPDU guard, portfast, storm control e documentação."
  ],
  "learningOutcomes": [
    "Dado um desenho com switches redundantes, o aluno identifica onde um loop de Camada 2 poderia ocorrer.",
    "Dado um sintoma de broadcast storm, o aluno lista evidências de switch, MAC flapping e tráfego anormal.",
    "Dado um output Cisco de STP, o aluno identifica root bridge, root port e portas em forwarding ou blocking.",
    "Dado um cenário de porta de usuário, o aluno explica quando PortFast e BPDU Guard fazem sentido.",
    "Dado um ambiente corporativo, o aluno propõe controles para redundância segura em Camada 2."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>Para ganhar disponibilidade, um técnico liga dois switches por mais de um caminho: se um cabo falhar, o outro mantém a comunicação. Segundos depois, a rede inteira fica instável. Impressoras somem, a telefonia IP falha, o firewall registra volume anormal e o suporte só ouve “a rede caiu”.</p>\n<p>A causa é que o frame Ethernet não tem um campo como o TTL do IP, que descarta pacotes que ficam circulando. Com um ciclo entre switches, broadcasts, multicasts e unknown unicasts circulam sem fim, são replicados a cada volta e consomem a LAN.</p>\n<div class=\"callout\"><strong>Problema real:</strong> redundância sem controle em Camada 2 derruba a rede. O STP permite manter os caminhos físicos redundantes com uma única topologia lógica ativa, sem loops.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>Ethernet não tolera loops de Camada 2 sem controle. Trocar hubs por switches deu a cada porta seu próprio domínio de colisão, mas o domínio de broadcast continua o mesmo. O switch replica o broadcast para todas as portas da VLAN, exceto a de entrada. Num ciclo, o mesmo frame volta ao switch por outro caminho, é tratado como tráfego novo, é replicado de novo e o volume cresce a cada volta.</p>\n<ul class=\"flow-list\"><li><strong>Broadcast storm:</strong> ARP, DHCP e outros broadcasts circulam e se multiplicam.</li><li><strong>MAC flapping:</strong> o switch vê o mesmo MAC de origem chegar ora por uma porta, ora por outra, e a tabela MAC fica instável.</li><li><strong>CPU alta:</strong> switches, roteadores, firewalls e endpoints ficam sobrecarregados processando a tempestade.</li><li><strong>Perda de conectividade:</strong> o tráfego legítimo compete com a tempestade.</li><li><strong>Troubleshooting confuso:</strong> os sintomas aparecem em várias camadas (DHCP, DNS, aplicação), mas a causa está em Camada 2.</li></ul>\n</section>\n",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>Evolução</h2>\n<p>Sem redundância, um único cabo ou switch de distribuição é ponto único de falha; com redundância sem controle, há loop. As versões do STP resolvem esse conflito com convergência cada vez mais rápida.</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Abordagem</th><th>Como funciona</th><th>Limitação</th><th>Uso moderno</th></tr></thead><tbody>\n<tr><td>STP 802.1D</td><td>Calcula uma árvore sem ciclos e bloqueia portas.</td><td>Convergência lenta (dezenas de segundos).</td><td>Base conceitual.</td></tr>\n<tr><td>RSTP 802.1w</td><td>Mesma lógica, com papéis e transições otimizados.</td><td>Ainda exige bom desenho e configuração.</td><td>Padrão comum em redes modernas.</td></tr>\n<tr><td>Por VLAN / MSTP</td><td>Uma árvore por VLAN (em Cisco, PVST+/Rapid PVST+) ou VLANs mapeadas para instâncias (MSTP).</td><td>Mais complexidade.</td><td>Redes corporativas com várias VLANs.</td></tr>\n<tr><td>MLAG/vPC/Stack/EVPN</td><td>Redundância com todos os links ativos.</td><td>Dependem de fabricante, arquitetura e operação madura.</td><td>Datacenter e campus modernos.</td></tr>\n</tbody></table></div>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<div class=\"definition-box\"><strong>Definição:</strong> STP (Spanning Tree Protocol) é o protocolo de Camada 2 que transforma uma topologia física redundante de switches em uma topologia lógica sem loops, bloqueando caminhos alternativos até que sejam necessários.</div>\n<p>Os switches trocam BPDUs (Bridge Protocol Data Units), elegem uma <strong>root bridge</strong> e decidem quais portas encaminham e quais ficam bloqueadas. O STP não remove a redundância: os cabos extras continuam lá, prontos para assumir se o caminho ativo falhar.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<p>O STP funciona por eleição e cálculo de caminho. Cada BPDU leva os dados que os switches comparam:</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Campo</th><th>O que é</th><th>Para que serve</th></tr></thead><tbody>\n<tr><td>Bridge ID</td><td>Prioridade + MAC do switch. A prioridade vai de 0 a 61440, em múltiplos de 4096; o padrão é 32768. Em STP por VLAN, o número da VLAN é somado à prioridade (extended system ID): prioridade 32768 na VLAN 10 aparece como 32778.</td><td>Eleger a root bridge: menor Bridge ID vence (primeiro a prioridade; em empate, o menor MAC).</td></tr>\n<tr><td>Root ID</td><td>Bridge ID da raiz que o remetente conhece.</td><td>Fazer todos convergirem para a mesma raiz.</td></tr>\n<tr><td>Root Path Cost</td><td>Soma dos custos das portas até a raiz. O custo depende da velocidade (no método curto, comum em Cisco: 100 Mbps = 19, 1 Gbps = 4, 10 Gbps = 2).</td><td>Escolher o melhor caminho até a raiz.</td></tr>\n<tr><td>Port ID</td><td>Prioridade da porta (padrão 128) + número da porta.</td><td>Último critério de desempate.</td></tr>\n</tbody></table></div>\n<ol class=\"flow-list\"><li><strong>Troca de BPDUs:</strong> cada switch começa se anunciando como raiz e adota a raiz melhor que ouvir.</li><li><strong>Eleição da root bridge:</strong> o menor Bridge ID vence. Todas as portas da raiz são designated.</li><li><strong>Root port:</strong> cada switch não raiz escolhe uma porta, a de menor custo até a raiz. Em empate, vence a porta que recebe BPDU do vizinho com menor Bridge ID e, depois, com menor Port ID.</li><li><strong>Designated port:</strong> em cada segmento (link), a porta do switch com menor custo até a raiz encaminha; em empate, a do switch com menor Bridge ID.</li><li><strong>Alternate/blocked port:</strong> toda porta que não é root nem designated deixa de encaminhar frames de dados (continua ouvindo BPDUs). É ela que quebra o ciclo.</li><li><strong>Convergência:</strong> se o caminho ativo falha, os switches recalculam e a porta alternativa pode passar a encaminhar.</li></ol>\n<h3>Exemplo resolvido: o triângulo do diagrama</h3>\n<p>Três switches em triângulo, todos os links de 1 Gbps (custo 4). Switch A: prioridade 4096. Switch B: prioridade 32768, MAC 001a.0000.000b. Switch C: prioridade 32768, MAC 001a.0000.000c.</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Link</th><th>Decisão</th><th>Por quê</th></tr></thead><tbody>\n<tr><td>A–B</td><td>A: designated · B: root port</td><td>A é a raiz (prioridade 4096). Para B, o link direto custa 4; o caminho via C custa 8.</td></tr>\n<tr><td>A–C</td><td>A: designated · C: root port</td><td>Mesmo raciocínio: caminho direto, custo 4.</td></tr>\n<tr><td>B–C</td><td>B: designated · C: alternate (bloqueada)</td><td>B e C têm o mesmo custo até a raiz (4). Desempate pelo Bridge ID: mesma prioridade, e o MAC de B é menor.</td></tr>\n</tbody></table></div>\n<p>Se o link A–B cair, B passa a chegar à raiz por C (custo 8): a porta de B no link B–C vira root port, e a de C deixa de ser alternate e passa a encaminhar como designated.</p>\n<h3>Estados da porta e PortFast</h3>\n<p>No STP 802.1D, uma porta passa por <strong>blocking</strong> (só ouve BPDUs), <strong>listening</strong> (participa da eleição), <strong>learning</strong> (aprende MACs, ainda sem encaminhar) e <strong>forwarding</strong>. Listening e learning duram um forward delay cada (15 s por padrão), e por isso uma porta leva cerca de 30 s para encaminhar; após certas falhas, a convergência chega a cerca de 50 s. O RSTP simplifica os estados para discarding, learning e forwarding e converge em poucos segundos ou menos em links ponto a ponto.</p>\n<p><strong>PortFast</strong> (no RSTP, porta edge) faz uma porta de usuário ir direto para forwarding quando o link sobe, sem essa espera. É seguro só onde há um único host, nunca um switch. Por isso vem acompanhado de BPDU Guard.</p>\n<h3>Lendo a saída do switch</h3>\n<p>Saída resumida de <code>show spanning-tree vlan 10</code> no Switch C (valores ilustrativos do exemplo acima, Rapid PVST+):</p>\n<pre class=\"code-block\">VLAN0010\n  Spanning tree enabled protocol rstp\n  Root ID    Priority    4106\n             Address     001a.0000.000a\n             Cost        4\n             Port        1 (GigabitEthernet0/1)\n  Bridge ID  Priority    32778  (priority 32768 sys-id-ext 10)\n             Address     001a.0000.000c\n\nInterface        Role Sts Cost      Prio.Nbr Type\n---------------- ---- --- --------- -------- ----\nGi0/1            Root FWD 4         128.1    P2p\nGi0/2            Altn BLK 4         128.2    P2p\nGi0/3            Desg FWD 4         128.3    P2p Edge</pre>\n<ul><li><strong>Root ID ≠ Bridge ID:</strong> C não é a raiz. Na própria raiz aparece “This bridge is the root” e as portas ficam como Desg.</li><li><strong>Priority 4106:</strong> 4096 configurado + VLAN 10. <strong>Cost 4:</strong> custo de C até a raiz, pela Gi0/1.</li><li><strong>Gi0/1 Root FWD:</strong> root port. <strong>Gi0/2 Altn BLK:</strong> a porta que quebra o ciclo, comportamento esperado. <strong>Gi0/3 … Edge:</strong> porta de host com PortFast.</li></ul>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2>\n<p>Em campus e escritórios, o STP atua entre switches de acesso, distribuição e core sempre que há links redundantes de Camada 2, e também onde não deveria haver switch: APs, hypervisors e mini-switches ligados por usuários. Um bom desenho define explicitamente:</p>\n<ul><li><strong>Root bridge primária e secundária</strong> por VLAN/instância, em switches centrais (distribuição/core), nunca deixando a eleição ao acaso dos MACs. Ex.: <code>spanning-tree vlan 10 priority 4096</code> na primária e 8192 na secundária.</li><li><strong>Onde a redundância é permitida</strong> e quais portas devem ficar alternate. Uma porta bloqueada no lugar previsto é sinal de saúde, não de falha.</li><li><strong>Controles por tipo de porta</strong>, conforme a tabela.</li></ul>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Tipo de porta</th><th>Controles</th><th>Motivo</th></tr></thead><tbody>\n<tr><td>Acesso (usuário, impressora, sala de reunião)</td><td>PortFast + BPDU Guard + storm control</td><td>Encaminha logo ao conectar; se chegar BPDU (switch indevido), a porta vai para err-disabled; o storm control limita broadcast, multicast e unknown unicast acima de um limiar.</td></tr>\n<tr><td>Distribuição → switch de acesso</td><td>Root Guard</td><td>Se chegar uma BPDU que anuncia raiz melhor, a porta é bloqueada (root-inconsistent) e a raiz continua na distribuição.</td></tr>\n<tr><td>Uplinks e trunks entre switches</td><td>Sem PortFast; allowed VLANs restritas</td><td>Precisam participar do STP normalmente; VLANs a mais ampliam o domínio afetado por um loop.</td></tr>\n</tbody></table></div>\n<div class=\"callout warning\"><strong>Erros comuns:</strong>\n<ul><li><strong>Ligar dois cabos entre switches para “dobrar a velocidade”.</strong> Sem agregação, isso cria loop (ou o STP bloqueia um dos links). Para usar os dois ao mesmo tempo, use EtherChannel/LACP, que o STP enxerga como um único link lógico.</li><li><strong>Não planejar a root bridge.</strong> Como o STP funciona sozinho, parece dispensar desenho, mas um switch de acesso pode virar raiz e criar caminhos ruins.</li><li><strong>Habilitar PortFast em trunk ou porta entre switches.</strong> A porta encaminha antes de o STP detectar o ciclo.</li><li><strong>Achar que porta bloqueada é defeito.</strong> Quem “conserta” a porta pode remover a proteção e criar o loop. Interprete o estado STP antes de mexer em cabos ou portas.</li></ul></div>\n<p>Limites: o STP não substitui um bom desenho físico nem roteamento em domínios L2 grandes, não corrige VLANs mal planejadas e não protege sozinho contra ataques de Camada 2 (tema da próxima aula).</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n<p>Imagine um prédio com vários corredores ligando as mesmas salas. Ter mais de um caminho ajuda numa emergência, mas, se todos andarem em círculos sem sinalização, o fluxo vira caos. O STP é a equipe que mantém alguns corredores fechados no uso normal e os abre quando o caminho principal é interditado.</p>\n<div class=\"callout warning\"><strong>Limite da analogia:</strong> corredores não clonam pessoas; switches replicam broadcast e unknown unicast, por isso o loop cresce de forma explosiva.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Alguém liga dois cabos entre os mesmos dois switches de escritório. Sem STP, um único ARP Request de um notebook circula entre os switches, volta, é replicado de novo e consome a rede. Com STP ativo, um dos links fica bloqueado logicamente e só entra em uso se o principal falhar.</p>\n<div class=\"content-card\"><strong>Leitura correta:</strong> dois cabos entre switches não significam mais velocidade. Sem agregação (LACP) ou STP, significam loop.</div>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n<p>Switches de acesso com uplinks redundantes para dois switches de distribuição sobrevivem à queda de um cabo ou de um equipamento, desde que a root primária e a secundária estejam nas distribuições.</p>\n<p>Um incidente clássico ocorre na borda: alguém liga um mini-switch não gerenciado embaixo da mesa e, por engano, fecha um loop entre duas tomadas. Se as portas de acesso não tiverem proteção, a tempestade atinge a VLAN inteira. Com BPDU Guard, a porta que recebe BPDU vai para err-disabled; o storm control limita o broadcast; e o alerta de MAC flapping aponta as portas envolvidas.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"m03l08-title m03l08-desc\">\n<title id=\"m03l08-title\">STP bloqueando um caminho redundante para evitar loop</title>\n<desc id=\"m03l08-desc\">Três switches formam um triângulo físico. O STP elege uma raiz e bloqueia um dos caminhos para manter uma árvore lógica sem ciclos.</desc>\n<defs><marker id=\"m03l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n<rect x=\"380\" y=\"60\" width=\"200\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n<text x=\"480\" y=\"96\" text-anchor=\"middle\" class=\"svg-label\">Switch A</text><text x=\"480\" y=\"122\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Root bridge</text>\n<rect x=\"120\" y=\"320\" width=\"200\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n<text x=\"220\" y=\"356\" text-anchor=\"middle\" class=\"svg-label\">Switch B</text><text x=\"220\" y=\"382\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Root port ativa</text>\n<rect x=\"640\" y=\"320\" width=\"200\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n<text x=\"740\" y=\"356\" text-anchor=\"middle\" class=\"svg-label\">Switch C</text><text x=\"740\" y=\"382\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Porta alternativa</text>\n<line x1=\"380\" y1=\"130\" x2=\"285\" y2=\"320\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l08-arrow)\" />\n<line x1=\"580\" y1=\"130\" x2=\"675\" y2=\"320\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l08-arrow)\" />\n<line x1=\"320\" y1=\"360\" x2=\"640\" y2=\"360\" class=\"svg-flow svg-flow--blocked\" />\n<text x=\"480\" y=\"345\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">link físico redundante</text>\n<text x=\"480\" y=\"382\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">STP bloqueia logicamente para evitar loop</text>\n<rect x=\"70\" y=\"455\" width=\"820\" height=\"44\" rx=\"12\" class=\"svg-zone\" />\n<text x=\"480\" y=\"483\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Redundância física permanece; topologia lógica ativa vira uma árvore sem ciclos.</text>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul><li><strong>Ideia central:</strong> o STP é o freio de segurança da redundância Ethernet: não remove os cabos extras, só decide quais caminhos encaminham sem formar ciclos.</li><li><strong>Por que existe:</strong> o frame Ethernet não tem TTL; num loop, broadcasts se multiplicam (broadcast storm) e a tabela MAC oscila (MAC flapping).</li><li><strong>Como decide:</strong> menor Bridge ID vira root bridge; cada switch escolhe a root port (menor custo até a raiz); cada link tem uma designated port; as demais ficam alternate/bloqueadas.</li><li><strong>Erro comum:</strong> achar que dois cabos aumentam a velocidade ou que porta bloqueada é defeito.</li><li><strong>Defesa:</strong> root primária/secundária planejada, PortFast + BPDU Guard em portas de usuário, Root Guard na distribuição, storm control e monitoramento de mudança de root e MAC flapping.</li></ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>O STP protege contra loops e storms, mas a LAN ainda pode ser manipulada por MAC, ARP e portas físicas. Na próxima aula, você estuda segurança em Camada 2: ARP spoofing, MAC flooding e defesas.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "Ethernet",
      "STP",
      "RSTP",
      "MSTP",
      "BPDU",
      "IEEE 802.1D",
      "IEEE 802.1w",
      "IEEE 802.1Q"
    ],
    "dependsOn": [
      "Switches",
      "MAC",
      "Broadcast",
      "VLAN",
      "Trunk",
      "Domínio de broadcast"
    ],
    "enables": [
      "Redundância segura em L2",
      "Troubleshooting de loops",
      "Proteção contra broadcast storms",
      "Arquitetura de campus"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Rede inteira lenta ou indisponível de repente, logo após mudança física",
      "Luzes de switch piscando de forma intensa e contínua",
      "MAC flapping nos logs",
      "CPU alta em switch/firewall",
      "Perda de DHCP, ARP instável e broadcast anormal",
      "Porta alternando entre estados STP ou porta de usuário em err-disabled"
    ],
    "diagnosticQuestions": [
      "Houve mudança física recente em cabos ou switches?",
      "Existe mini-switch conectado em porta de usuário?",
      "Qual switch é root bridge?",
      "Há MAC flapping entre portas?",
      "Há broadcast/multicast anormal na VLAN?",
      "BPDU Guard ou storm control registraram eventos?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "arp -a && ping <gateway> && pathping <gateway>",
        "purpose": "Coletar sintomas no endpoint sem alterar a rede.",
        "expectedObservation": "Gateway pode ficar instável se houver storm.",
        "interpretation": "Sintomas no host são evidência indireta; a causa raiz precisa ser validada nos switches."
      },
      {
        "platform": "Linux",
        "command": "ip neigh && ping -c 4 <gateway> && ip -s link",
        "purpose": "Ver vizinhos ARP, perda e contadores de interface.",
        "expectedObservation": "Perda, vizinhos instáveis ou erros podem indicar problema local ou L2.",
        "interpretation": "Combine com evidências do switch antes de concluir."
      },
      {
        "platform": "Cisco IOS",
        "command": "show spanning-tree vlan <id>\nshow spanning-tree root\nshow mac address-table dynamic\nshow logging | include STP|SPANTREE|MACFLAP\nshow interfaces status err-disabled\nshow interfaces counters errors",
        "purpose": "Ver root bridge, papéis e estados das portas, MAC flapping, portas derrubadas por BPDU Guard e erros de interface.",
        "expectedObservation": "Root bridge planejada, uma porta Altn BLK no ponto previsto, nenhum MAC flapping recorrente e nenhuma porta err-disabled inesperada.",
        "interpretation": "Root bridge errada ou flapping: investigar cabos, trunks e portas de usuário. Porta err-disabled por BPDU Guard: há switch indevido naquela tomada."
      }
    ],
    "decisionTree": [
      {
        "if": "Há MAC flapping entre duas portas",
        "then": "Suspeitar de loop, switch indevido, trunk errado ou endpoint fazendo bridge entre duas interfaces."
      },
      {
        "if": "Uma porta está blocking/alternate",
        "then": "Verificar se é o comportamento esperado do STP antes de alterar a topologia (show spanning-tree interface <porta> detail). Se o objetivo era usar a banda dos dois links, redesenhar com LACP ou roteamento, não desligar o STP."
      },
      {
        "if": "Root bridge não é a planejada",
        "then": "Revisar prioridade STP, Root Guard e desenho de distribuição/core."
      },
      {
        "if": "Porta de usuário em err-disabled",
        "then": "BPDU Guard recebeu BPDU: remover o equipamento indevido, confirmar nos logs e só então reabilitar a porta conforme procedimento."
      },
      {
        "if": "Broadcast está anormal",
        "then": "Aplicar contenção operacional (isolar o link suspeito conforme procedimento), identificar a origem e validar o storm control."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Definir root bridge primária e secundária por VLAN/instância.",
      "Usar RSTP/MSTP quando adequado.",
      "Documentar trunks, VLANs permitidas e links redundantes (e sanitizar essa documentação antes de compartilhar: ela revela a topologia interna)."
    ],
    "badPractices": [
      "Conectar links redundantes sem controle.",
      "Permitir mini-switches não gerenciados em portas de usuário.",
      "Deixar todos os trunks permitindo todas as VLANs.",
      "Desabilitar STP para resolver sintoma sem entender a causa."
    ],
    "vulnerabilities": [
      {
        "name": "Loop de Camada 2 (acidental ou provocado)",
        "description": "Cabo ou switch indevido cria caminho cíclico para frames Ethernet; o mesmo efeito pode ser provocado de propósito como negação de serviço interna.",
        "defensiveExplanation": "O risco principal é indisponibilidade da VLAN ou do campus por broadcast storm, CPU alta e tabela MAC instável.",
        "mitigation": "RSTP, BPDU Guard e storm control nas portas de acesso, documentação e controle físico das tomadas."
      },
      {
        "name": "Root bridge indevida",
        "description": "Um switch não planejado (prioridade baixa ou padrão com MAC menor) passa a ser a raiz.",
        "defensiveExplanation": "Os caminhos da Camada 2 mudam, o desempenho piora e a investigação fica mais difícil.",
        "mitigation": "Prioridade de root planejada, Root Guard nas portas voltadas ao acesso e alerta de mudança de root."
      },
      {
        "name": "Porta de usuário aceitando BPDUs",
        "description": "Uma porta edge permite que o equipamento conectado participe da topologia STP.",
        "defensiveExplanation": "A topologia pode ser alterada por erro ou por dispositivo não autorizado, e um mini-switch pode fechar loop pela borda.",
        "mitigation": "BPDU Guard, port security, 802.1X/NAC e políticas de porta."
      },
      {
        "name": "Trunk com VLANs demais",
        "description": "VLANs atravessam trunks onde não deveriam.",
        "defensiveExplanation": "Um loop ou erro passa a afetar mais VLANs e aumenta a superfície para movimento lateral.",
        "mitigation": "Allowed VLANs restritas por trunk e revisão de mudanças."
      }
    ],
    "hardening": [
      "PortFast + BPDU Guard em portas edge",
      "Root Guard em portas da distribuição voltadas para o acesso",
      "Storm control em portas de acesso",
      "Port security e 802.1X/NAC",
      "Allowed VLANs restritas em trunks"
    ],
    "detectionIdeas": [
      "Alertar quando a root bridge mudar ou houver muitos eventos de mudança de topologia.",
      "Alertar MAC flapping frequente.",
      "Alertar broadcast/multicast acima do baseline e CPU alta em switches.",
      "Revisar portas err-disabled por BPDU Guard e portas com PortFast recebendo BPDU.",
      "Correlacionar incidentes de DHCP/ARP com eventos STP."
    ]
  },
  "lab": {
    "id": "lab-3.8",
    "title": "Mapeando STP, loops e evidências de broadcast storm",
    "labType": "security",
    "objective": "Entender como o STP evita loops em topologias redundantes e quais evidências indicam problema de Camada 2.",
    "scenario": "Você foi chamado para avaliar uma rede com três switches conectados em triângulo. A empresa quer redundância, mas não quer broadcast storms. Seu papel é desenhar a topologia, definir root bridge planejada e listar comandos de validação.",
    "topology": "Switch A conectado ao Switch B, Switch B conectado ao Switch C, Switch C conectado ao Switch A. Hosts ligados aos switches B e C na mesma VLAN de laboratório.",
    "architecture": "Camada 2 com redundância física e uma árvore lógica calculada pelo STP/RSTP. O Switch A deve ser a root bridge planejada.",
    "prerequisites": [
      "Opcional: Packet Tracer, GNS3 ou acesso autorizado a switches de laboratório."
    ],
    "tools": [
      "Papel ou editor de desenho",
      "Packet Tracer ou GNS3 opcional",
      "Terminal Windows/Linux para coleta indireta",
      "Cisco IOS em laboratório opcional"
    ],
    "estimatedTimeMinutes": 35,
    "cost": "zero",
    "safetyNotes": [
      "Não crie loops nem conecte cabos redundantes em rede real sem mudança aprovada.",
      "Não desabilite STP para testar impacto.",
      "Sanitize nomes de switches, VLANs, IPs, MACs e topologia antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Desenhar a topologia física",
        "instruction": "Desenhe os três switches em triângulo (papel, editor de desenho, Packet Tracer ou GNS3), marque todos os links físicos e identifique o ciclo.",
        "expectedOutput": "Diagrama físico com Switch A, Switch B e Switch C conectados em ciclo.",
        "explanation": "A topologia física tem redundância, mas também cria potencial de loop."
      },
      {
        "number": 2,
        "title": "Definir root bridge planejada",
        "instruction": "Escolha o Switch A como root bridge, anote por que ele deve ser a raiz e atribua prioridade e MAC aos três switches (pode usar os valores do exemplo resolvido ou outros).",
        "command": "Cisco IOS conceitual: spanning-tree vlan 10 priority 4096",
        "expectedOutput": "Switch A com o menor Bridge ID da VLAN 10.",
        "explanation": "A root bridge deve ficar num ponto central e previsível da arquitetura, não depender do MAC mais baixo."
      },
      {
        "number": 3,
        "title": "Identificar papéis das portas",
        "instruction": "Com os Bridge IDs e custos, marque root ports, designated ports e a porta alternate que quebra o ciclo. Justifique o desempate no link B–C.",
        "command": "Cisco IOS validação: show spanning-tree vlan 10",
        "expectedOutput": "Portas de A designated; uma root port em B e outra em C; no link B–C, designated no switch de menor Bridge ID e Altn BLK no outro.",
        "explanation": "A porta bloqueada não é defeito; ela evita o loop."
      },
      {
        "number": 4,
        "title": "Listar sintomas de loop",
        "instruction": "Monte uma lista de sintomas que indicariam broadcast storm ou instabilidade de STP e a fonte de cada um.",
        "command": "show logging | include STP|SPANTREE|MACFLAP",
        "expectedOutput": "Lista com MAC flapping, broadcast alto, CPU alta, perda de conectividade e mudança de topologia.",
        "explanation": "Sintomas ajudam a priorizar a investigação sem chutar a causa."
      },
      {
        "number": 5,
        "title": "Planejar proteções de porta",
        "instruction": "Defina onde usar BPDU Guard, Root Guard, PortFast e storm control nessa topologia, incluindo as portas dos hosts em B e C.",
        "command": "Cisco IOS conceitual:\nspanning-tree portfast\nspanning-tree bpduguard enable\nstorm-control broadcast level <percentual>",
        "expectedOutput": "Tabela de controles por tipo de porta: usuário, trunk, uplink e infraestrutura.",
        "explanation": "Controles de borda reduzem o risco de loops acidentais e de equipamentos indevidos."
      },
      {
        "number": 6,
        "title": "Criar relatório sanitizado",
        "instruction": "Escreva um relatório com topologia, riscos, evidências esperadas e recomendações defensivas.",
        "expectedOutput": "Relatório sem nomes reais, IPs públicos, MACs completos ou informações sensíveis.",
        "explanation": "A documentação de STP é útil para operação e segurança, mas também revela a topologia interna."
      }
    ],
    "expectedResult": "O aluno deve produzir um desenho de topologia redundante, identificar a root bridge planejada, apontar a porta bloqueada pelo STP, listar evidências de loop e recomendar controles defensivos.",
    "validation": [
      {
        "check": "Topologia física tem ciclo identificado",
        "command": "Revisar desenho",
        "expected": "Três switches formando triângulo físico.",
        "ifFails": "Refaça o desenho e marque todos os links."
      },
      {
        "check": "Topologia lógica está sem loop",
        "command": "show spanning-tree vlan <id>",
        "expected": "Uma porta redundante em alternate/blocking ou equivalente.",
        "ifFails": "Verifique se STP/RSTP está ativo e se a root bridge está definida."
      },
      {
        "check": "Root bridge é a planejada",
        "command": "show spanning-tree root",
        "expected": "Switch A como root para a VLAN/instância definida.",
        "ifFails": "Revisar prioridade STP e Root Guard."
      },
      {
        "check": "Portas de usuário estão protegidas",
        "command": "show running-config interface <porta>",
        "expected": "PortFast/BPDU Guard/storm control onde aplicável.",
        "ifFails": "Planejar configuração defensiva antes de produção."
      }
    ],
    "improvements": [
      "Simular a topologia no Packet Tracer ou GNS3, derrubar o link A–B e observar a porta alternate passar a encaminhar.",
      "Adicionar alertas de mudança de root e MAC flapping."
    ],
    "evidenceToCollect": [
      "Diagrama físico e diagrama lógico STP",
      "Root bridge planejada e Bridge IDs usados",
      "Portas forwarding e alternate/blocked",
      "Logs de STP ou MAC flapping sanitizados",
      "Tabela de controles por porta"
    ],
    "questions": [
      "Se o link A–B cair, quais portas mudam de papel e por quê?",
      "Por que storm control não substitui STP?"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que redundância física pode ser perigosa em Camada 2 se não houver STP ou mecanismo equivalente?",
      "hints": [
        "Pense em broadcast.",
        "Frames Ethernet não possuem TTL como IP."
      ],
      "expectedIdeas": [
        "loop",
        "broadcast storm",
        "MAC flapping",
        "ausência de TTL",
        "bloqueio lógico"
      ],
      "explanation": "A resposta deve mostrar que o aluno entendeu o conflito entre redundância e ciclo Ethernet."
    },
    {
      "type": "diagnóstico",
      "question": "Uma rede ficou instável após alguém mexer em cabos do rack. Que evidências você procuraria antes de culpar DNS ou firewall?",
      "hints": [
        "Pense em logs de switch.",
        "Pense em MAC flapping e STP."
      ],
      "expectedIdeas": [
        "show spanning-tree",
        "logs STP",
        "MAC flapping",
        "broadcast alto",
        "mudança física recente"
      ],
      "explanation": "Antes de investigar aplicação, o aluno deve validar Camada 2 quando o incidente começou após mudança física."
    },
    {
      "type": "cenário real",
      "question": "Por que BPDU Guard costuma ser recomendado em portas de usuário com PortFast?",
      "hints": [
        "Pense em mini-switches.",
        "Pense em usuário conectando equipamento indevido."
      ],
      "expectedIdeas": [
        "porta edge",
        "BPDU inesperada",
        "proteção contra loop",
        "errdisable",
        "redução de impacto"
      ],
      "explanation": "Portas de usuário não deveriam participar da topologia STP. BPDU Guard ajuda a conter risco operacional."
    }
  ],
  "quiz": [
    {
      "id": "q3.8.7",
      "question": "Na mesma VLAN, o Switch X tem prioridade 32768 e MAC 0011.1111.1111; o Switch Y tem prioridade 4096 e MAC 00ff.ffff.ffff; o Switch Z tem prioridade 32768 e MAC 0000.0000.0001. Qual vira root bridge?",
      "options": [
        "Z, porque tem o menor MAC",
        "Y, porque tem a menor prioridade",
        "X, porque tem prioridade padrão e MAC intermediário",
        "Nenhum: com prioridades diferentes, a eleição empata e o STP bloqueia todos"
      ],
      "answer": 1,
      "explanation": "O Bridge ID é comparado primeiro pela prioridade; o MAC só desempata quando as prioridades são iguais. Y tem 4096, a menor.",
      "topic": "eleição da root bridge",
      "difficulty": "intermediário",
      "type": "cálculo"
    },
    {
      "id": "q3.8.2",
      "question": "Qual evidência aponta mais fortemente para um loop de Camada 2?",
      "options": [
        "Erros de CRC crescendo em uma única porta de acesso",
        "Um único site externo lento enquanto o resto da rede funciona",
        "O mesmo MAC aparecendo alternadamente em duas portas de uplink, com broadcast muito acima do normal",
        "Uma porta Altn BLK estável na saída de show spanning-tree"
      ],
      "answer": 2,
      "explanation": "MAC flapping com broadcast anormal é a assinatura típica de loop. CRC numa porta indica problema físico local, lentidão de um site externo não é L2 local e uma porta Altn BLK estável é o STP funcionando.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q3.8.3",
      "question": "Uma porta bloqueada pelo STP deve ser sempre considerada defeito?",
      "options": [
        "Não; pode ser comportamento esperado para evitar loop",
        "Sim; toda porta conectada deve encaminhar",
        "Sim; STP só bloqueia quando há cabo rompido",
        "Não; mas deve ser removida fisicamente sempre"
      ],
      "answer": 0,
      "explanation": "STP bloqueia portas redundantes para manter a topologia lógica sem ciclos.",
      "topic": "estados STP",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q3.8.4",
      "question": "Uma porta de sala de reunião com PortFast recebe uma BPDU de um mini-switch conectado por um usuário. Qual recurso coloca essa porta em err-disabled?",
      "options": [
        "Root Guard",
        "Storm control",
        "PortFast",
        "BPDU Guard"
      ],
      "answer": 3,
      "explanation": "BPDU Guard derruba (err-disabled) a porta edge que recebe qualquer BPDU. Root Guard só bloqueia BPDU que anuncia raiz melhor, storm control limita volume de tráfego e PortFast apenas acelera a porta.",
      "topic": "hardening",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q3.8.5",
      "question": "Por que é recomendado definir root bridge primária e secundária?",
      "options": [
        "Para tornar previsível o caminho lógico da Camada 2",
        "Para substituir o gateway padrão",
        "Para eliminar a necessidade de VLANs",
        "Para criptografar BPDUs"
      ],
      "answer": 0,
      "explanation": "Root planejada evita que um switch inadequado controle a topologia STP.",
      "topic": "arquitetura",
      "difficulty": "intermediário",
      "type": "arquitetura"
    },
    {
      "id": "q3.8.8",
      "question": "Por que não se deve habilitar PortFast em uma porta que liga dois switches?",
      "options": [
        "Porque PortFast impede o switch de enviar BPDUs por qualquer porta",
        "Porque a porta pula listening/learning e pode encaminhar antes de o STP detectar um ciclo",
        "Porque PortFast limita o link a 100 Mbps",
        "Porque PortFast só funciona em trunks 802.1Q"
      ],
      "answer": 1,
      "explanation": "PortFast coloca a porta direto em forwarding, o que só é seguro onde há um único host. Entre switches, isso pode abrir um loop antes da convergência.",
      "topic": "PortFast",
      "difficulty": "intermediário",
      "type": "arquitetura"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.8.7",
      "front": "Como o STP desempata a escolha da root port quando dois caminhos têm o mesmo custo?",
      "back": "Prefere a porta que recebe BPDU do vizinho com menor Bridge ID; persistindo o empate, a do menor Port ID (prioridade da porta + número).",
      "tags": [
        "stp",
        "root port"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.8.2",
      "front": "O que é root bridge?",
      "back": "Switch eleito como raiz da árvore STP; os demais calculam o melhor caminho até ele.",
      "tags": [
        "stp",
        "root bridge"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.8.8",
      "front": "Prioridade STP: valores possíveis e padrão?",
      "back": "De 0 a 61440, em múltiplos de 4096; padrão 32768. Em STP por VLAN, a saída mostra prioridade + VLAN (32768 na VLAN 10 = 32778).",
      "tags": [
        "stp",
        "bridge id"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.8.4",
      "front": "O que é broadcast storm?",
      "back": "Crescimento anormal de tráfego broadcast, muitas vezes causado por loop de Camada 2.",
      "tags": [
        "broadcast",
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.8.5",
      "front": "BPDU Guard protege que tipo de porta?",
      "back": "Portas edge/de usuário, onde não se espera receber BPDUs de outro switch.",
      "tags": [
        "segurança",
        "bpdu guard"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.8.6",
      "front": "STP aumenta banda?",
      "back": "Não. STP evita loops bloqueando caminhos redundantes. Para usar múltiplos links ativamente, usa-se agregação como LACP quando aplicável.",
      "tags": [
        "stp",
        "lacp"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.8.5",
      "type": "cálculo",
      "prompt": "Quatro switches na VLAN 20, todos com links de 1 Gbps (custo 4): D1 (prioridade 4096), D2 (prioridade 8192), A1 e A2 (prioridade 32768, MAC de A1 menor que o de A2). Links: D1–D2, D1–A1, D1–A2, D2–A1, D2–A2. Indique a root bridge, a root port de cada switch e as portas que ficam alternate.",
      "expectedAnswer": "Root: D1 (menor prioridade); todas as portas de D1 são designated. D2: root port para D1 (custo 4). A1 e A2: root port no link direto para D1 (custo 4; via D2 custaria 8). Nos links D2–A1 e D2–A2, D2 e o switch de acesso têm o mesmo custo até a raiz (4); o desempate pelo Bridge ID favorece D2 (8192 < 32768), então as portas de D2 são designated e as portas de A1 e A2 para D2 ficam alternate.",
      "explanation": "Primeiro a raiz, depois a root port de cada switch, depois a designated de cada link; o que sobrar é alternate."
    },
    {
      "id": "ex3.8.6",
      "type": "leitura de saída",
      "prompt": "Num switch de acesso, show spanning-tree vlan 30 mostra: Root ID Priority 4126; Bridge ID Priority 32798 (priority 32768 sys-id-ext 30); Gi0/1 Root FWD 4; Gi0/2 Altn BLK 4; Gi0/5 Desg FWD 19 P2p Edge. Este switch é a raiz? O que cada porta está fazendo? Há algo a corrigir?",
      "expectedAnswer": "Não é a raiz (Root ID diferente do Bridge ID; a raiz tem prioridade 4096, já que 4126 = 4096 + 30). Gi0/1 é a root port, Gi0/2 é a alternate que quebra o ciclo (esperado) e Gi0/5 é uma porta de host de 100 Mbps (custo 19) com PortFast. Nada a corrigir; apenas confirmar que Gi0/5 tem BPDU Guard.",
      "explanation": "Some a VLAN à prioridade configurada para ler os números e use a coluna Role para separar root, designated e alternate."
    },
    {
      "id": "ex3.8.4",
      "type": "segurança",
      "prompt": "Explique a diferença entre BPDU Guard, Root Guard e storm control.",
      "expectedAnswer": "BPDU Guard coloca em err-disabled a porta edge que recebe qualquer BPDU; Root Guard bloqueia (root-inconsistent) a porta que recebe BPDU anunciando raiz melhor, preservando a root planejada; storm control limita broadcast, multicast e unknown unicast acima de um limiar.",
      "explanation": "Os três se complementam: cada um atua em um problema diferente."
    }
  ],
  "challenge": {
    "title": "Projetar redundância segura para uma LAN pequena",
    "scenario": "Uma empresa tem dois switches de distribuição (D1 e D2) e dois switches de acesso (A1 e A2), cada acesso com um uplink para cada distribuição, nas VLANs 10 e 20. Ela quer redundância, mas já sofreu uma indisponibilidade causada por loop acidental em uma sala de reunião.",
    "tasks": [
      "Definir root bridge primária e secundária, com as prioridades.",
      "Desenhar a topologia física e a lógica, indicando quais portas ficam alternate e o que muda se D1 falhar.",
      "Indicar onde usar BPDU Guard, Root Guard, PortFast e storm control.",
      "Criar plano de validação com comandos.",
      "Listar riscos residuais e evidências a monitorar."
    ],
    "constraints": [
      "Não criar loop em rede real.",
      "Não desabilitar STP.",
      "Portas de usuário não podem participar da topologia STP.",
      "A solução deve ser documentável e auditável."
    ],
    "expectedDeliverables": [
      "Diagrama físico",
      "Diagrama lógico STP",
      "Tabela de portas e controles",
      "Plano de validação",
      "Matriz de riscos"
    ],
    "gradingRubric": [
      {
        "criterion": "Root bridge planejada",
        "points": 20,
        "description": "Define primária e secundária coerentes com a topologia e explica a convergência se a primária falhar."
      },
      {
        "criterion": "Controles de borda",
        "points": 25,
        "description": "Aplica PortFast, BPDU Guard, Root Guard e storm control nos lugares certos."
      },
      {
        "criterion": "Troubleshooting",
        "points": 25,
        "description": "Inclui comandos e evidências para validar STP e detectar loops."
      },
      {
        "criterion": "Segurança e documentação",
        "points": 20,
        "description": "Sanitiza evidências e documenta riscos."
      },
      {
        "criterion": "Clareza",
        "points": 10,
        "description": "Entrega fácil de entender e executar em laboratório."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro identificamos onde há redundância física e onde poderia haver loop. Depois escolhemos uma raiz central e previsível e uma secundária para assumir se ela cair. Em seguida protegemos as portas de usuário, porque loops acidentais costumam surgir na borda. Por fim definimos evidências de validação e monitoramento.",
    "steps": [
      "Desenhar a topologia física: cada acesso com dois uplinks forma ciclos via D1 e D2.",
      "D1 como root primária das VLANs 10 e 20 (spanning-tree vlan 10,20 priority 4096) e D2 como secundária (prioridade 8192).",
      "Topologia lógica: os uplinks de A1 e A2 para D1 encaminham; os uplinks para D2 ficam alternate. Se D1 falhar, D2 vira raiz e esses uplinks passam a encaminhar.",
      "PortFast + BPDU Guard e storm control só nas portas de usuário.",
      "Root Guard nas portas de D1 e D2 voltadas para A1 e A2.",
      "Trunks com allowed VLANs restritas a 10 e 20.",
      "Validar com show spanning-tree vlan 10 e 20, show spanning-tree root, logs de STP/MACFLAP, show interfaces status err-disabled e tabela MAC.",
      "Documentar e sanitizar as evidências."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Desabilitar STP para a porta parar de bloquear.",
        "whyItIsWrong": "A porta pode estar bloqueada justamente para evitar loop. Desabilitar STP pode causar broadcast storm."
      },
      {
        "answer": "Conectar dois cabos entre switches para dobrar velocidade.",
        "whyItIsWrong": "Sem agregação, isso cria risco de loop e o STP bloqueia um dos links. Para usar os dois, o caminho é EtherChannel/LACP."
      },
      {
        "answer": "Deixar qualquer switch virar root.",
        "whyItIsWrong": "Com prioridades padrão, vence o menor MAC, que pode ser um switch de acesso antigo; a topologia lógica fica imprevisível."
      },
      {
        "answer": "Colocar a root secundária em um switch de acesso.",
        "whyItIsWrong": "Se D1 cair, o tráfego entre acessos passaria por um switch de borda; a secundária deve ser a outra distribuição."
      }
    ],
    "finalAnswer": "D1 root primária e D2 secundária, RSTP/MSTP conforme a arquitetura, PortFast + BPDU Guard e storm control nas portas de usuário, Root Guard nas portas da distribuição voltadas ao acesso, trunks restritos, monitoramento de MAC flapping e mudança de root, e topologia física e lógica documentadas."
  },
  "glossary": [
    {
      "term": "STP",
      "shortDefinition": "Protocolo que evita loops de Camada 2.",
      "longDefinition": "Spanning Tree Protocol cria uma topologia lógica sem ciclos em redes Ethernet redundantes, bloqueando portas que causariam loop.",
      "example": "Um link redundante entre switches fica bloqueado até que o caminho principal falhe.",
      "relatedTerms": [
        "RSTP",
        "BPDU",
        "root bridge"
      ],
      "relatedLessons": [
        "3.3",
        "3.4",
        "3.7",
        "3.8"
      ]
    },
    {
      "term": "BPDU",
      "shortDefinition": "Mensagem de controle do STP.",
      "longDefinition": "Bridge Protocol Data Unit transporta informações usadas por switches para eleger root bridge e calcular a topologia STP.",
      "example": "Uma porta de usuário recebendo BPDU pode indicar switch indevido.",
      "relatedTerms": [
        "BPDU Guard",
        "STP"
      ],
      "relatedLessons": [
        "3.8",
        "3.9"
      ]
    },
    {
      "term": "Root bridge",
      "shortDefinition": "Switch raiz da árvore STP.",
      "longDefinition": "Equipamento usado como referência central para cálculo dos caminhos STP.",
      "example": "O switch de distribuição pode ser configurado como root bridge primária.",
      "relatedTerms": [
        "Bridge ID",
        "root port"
      ],
      "relatedLessons": [
        "3.8"
      ]
    },
    {
      "term": "Broadcast storm",
      "shortDefinition": "Tempestade de tráfego broadcast.",
      "longDefinition": "Condição em que broadcasts se multiplicam ou circulam, consumindo capacidade da rede e causando indisponibilidade.",
      "example": "Loop entre switches gera ARP Requests circulando continuamente.",
      "relatedTerms": [
        "loop",
        "broadcast",
        "storm control"
      ],
      "relatedLessons": [
        "3.4",
        "3.8"
      ]
    },
    {
      "term": "BPDU Guard",
      "shortDefinition": "Proteção para portas de usuário contra BPDUs inesperadas.",
      "longDefinition": "Recurso que bloqueia ou coloca em errdisable uma porta edge quando ela recebe BPDU, reduzindo risco de switch indevido alterar a topologia.",
      "example": "Porta de sala de reunião entra em errdisable ao conectar mini-switch que envia BPDU.",
      "relatedTerms": [
        "PortFast",
        "porta edge"
      ],
      "relatedLessons": [
        "3.8",
        "3.9"
      ]
    },
    {
      "term": "Root Guard",
      "shortDefinition": "Proteção contra root bridge indevida.",
      "longDefinition": "Recurso que impede que uma porta aceite informações STP que fariam um switch externo se tornar raiz onde isso não deveria acontecer.",
      "example": "Usado em portas voltadas para switches de acesso para preservar root na distribuição.",
      "relatedTerms": [
        "root bridge",
        "BPDU"
      ],
      "relatedLessons": [
        "3.8"
      ]
    },
    {
      "term": "PortFast",
      "shortDefinition": "Faz uma porta de host encaminhar logo que o link sobe.",
      "longDefinition": "Recurso que leva a porta direto para forwarding, sem esperar as etapas listening e learning do STP. No RSTP, o equivalente é a porta edge. Só deve ser usado em portas com um único host.",
      "example": "A porta de um notebook encaminha imediatamente, em vez de esperar cerca de 30 s.",
      "relatedTerms": [
        "BPDU Guard",
        "porta edge"
      ],
      "relatedLessons": [
        "3.8"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.1D / 802.1w concepts",
      "organization": "IEEE",
      "url": "",
      "note": "Base conceitual de STP e RSTP."
    },
    {
      "type": "official-doc",
      "title": "Spanning Tree Protocol configuration guides",
      "organization": "Cisco",
      "url": "",
      "note": "Referência operacional para comandos e conceitos em switches Cisco."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 3.4",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Domínios de colisão, broadcast e hub vs switch."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 3.7",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "VLANs como segmentação de Camada 2."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Datacenter e operação",
      "lesson": "A definir",
      "reason": "Loops e storms em LAN podem afetar runners, registries, clusters e plataformas internas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso corporativo",
      "lesson": "A definir",
      "reason": "Controles de porta, NAC e 802.1X conectam rede de acesso físico com identidade de dispositivo e usuário."
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
      "3.9"
    ]
  }
};
