export const lesson0308 = {
  "id": "3.8",
  "moduleId": "m03",
  "order": 8,
  "title": "STP: evitando loops e broadcast storms",
  "subtitle": "Como switches mantêm redundância sem transformar a LAN em um ciclo destrutivo de frames, broadcast e instabilidade.",
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Imagine uma empresa que decide melhorar a disponibilidade da rede. Um técnico conecta dois switches por mais de um caminho para que, se um cabo falhar, o outro mantenha a comunicação. A intenção é boa: redundância. Poucos segundos depois, a rede inteira fica instável. Impressoras somem, telefonia IP falha, usuários perdem acesso, o firewall registra volume anormal e o time de suporte só ouve uma frase: “a rede caiu”.</p>\n<p>O problema é que Ethernet de Camada 2 não possui, por si só, um mecanismo simples como o TTL do IP para matar frames que ficam circulando. Se houver um ciclo físico ou lógico entre switches, broadcasts, multicasts e unknown unicasts podem circular indefinidamente, serem replicados e consumir a LAN. O resultado é uma tempestade de broadcast, tabelas MAC instáveis e indisponibilidade.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> redundância sem controle em Camada 2 pode derrubar a rede. O STP existe para permitir caminhos físicos redundantes, mas manter apenas uma topologia lógica ativa sem loops.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>Nas redes Ethernet antigas, hubs e segmentos compartilhados já sofriam com colisões, broadcast e limitações de escala. Com a popularização dos switches, cada porta passou a ter seu próprio domínio de colisão, mas o problema de broadcast e loops continuou existindo dentro do domínio de Camada 2.</p>\n<p>Empresas precisavam de redundância. Um único cabo entre switches era ponto único de falha; um único switch de distribuição podia derrubar um andar inteiro. A solução natural era criar caminhos alternativos. Porém, diferente de roteadores IP, switches Ethernet encaminham frames com base em MAC e flooding. Em loop, o mesmo frame pode retornar ao switch por outro caminho e ser tratado como tráfego novo.</p>\n<p>O Spanning Tree Protocol, STP, foi criado para resolver esse conflito entre redundância física e estabilidade lógica. Ele calcula uma árvore livre de ciclos, elege uma bridge raiz, decide quais portas encaminham e quais ficam bloqueadas. Depois surgiram evoluções como RSTP, MSTP e variações por VLAN, reduzindo tempo de convergência e melhorando operação em redes maiores.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema central é simples de dizer e grave na prática: Ethernet não tolera loops de Camada 2 sem controle. Frames broadcast não têm TTL. Switches replicam broadcast para todas as portas da VLAN, exceto a porta de entrada. Se houver ciclo, o tráfego volta, é replicado de novo e cresce rapidamente.</p>\n<ul class=\"flow-list\"><li><strong>Broadcast storm:</strong> ARP, DHCP e outros broadcasts passam a circular e se multiplicar.</li><li><strong>MAC flapping:</strong> o switch vê o mesmo MAC aparecendo em portas diferentes rapidamente.</li><li><strong>CPU alta:</strong> switches, roteadores, firewalls e endpoints podem ficar sobrecarregados.</li><li><strong>Perda de conectividade:</strong> tráfego legítimo compete com a tempestade.</li><li><strong>Troubleshooting confuso:</strong> sintomas aparecem em várias camadas, mas a causa raiz está em Camada 2.</li></ul>\n<p>STP resolve esse problema criando uma topologia lógica sem ciclos, mesmo que a topologia física tenha caminhos redundantes.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução do STP reflete a necessidade de manter estabilidade sem sacrificar disponibilidade.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funciona</th><th>Limitação</th><th>Uso moderno</th></tr></thead><tbody>\n<tr><td>Sem redundância</td><td>Um caminho físico entre switches.</td><td>Ponto único de falha.</td><td>Ambientes simples ou temporários.</td></tr>\n<tr><td>Redundância sem STP</td><td>Dois ou mais caminhos ativos em L2.</td><td>Loops e broadcast storms.</td><td>Má prática em Ethernet tradicional.</td></tr>\n<tr><td>STP 802.1D</td><td>Calcula árvore sem ciclos e bloqueia portas.</td><td>Convergência mais lenta.</td><td>Base conceitual importante.</td></tr>\n<tr><td>RSTP 802.1w</td><td>Convergência mais rápida.</td><td>Ainda exige bom desenho e configuração.</td><td>Padrão comum em redes modernas.</td></tr>\n<tr><td>MSTP / instâncias</td><td>Permite mapear VLANs para instâncias.</td><td>Complexidade maior.</td><td>Redes corporativas com múltiplas VLANs.</td></tr>\n<tr><td>MLAG/vPC/Stack/EVPN</td><td>Alternativas modernas para redundância ativa.</td><td>Dependem de fabricante, arquitetura e operação madura.</td><td>Datacenter e campus modernos.</td></tr>\n</tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>STP, Spanning Tree Protocol, é um protocolo de Camada 2 usado por switches para impedir loops Ethernet. Ele troca BPDUs, Bridge Protocol Data Units, entre switches, elege uma bridge raiz e escolhe quais portas devem encaminhar tráfego e quais devem ficar bloqueadas para quebrar ciclos.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> STP é o mecanismo que transforma uma topologia física redundante de switches em uma topologia lógica sem loops, bloqueando caminhos alternativos até que sejam necessários.</div>\n<p>O objetivo não é remover redundância. O objetivo é manter redundância física disponível sem deixar todos os caminhos encaminhando frames ao mesmo tempo em Camada 2.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>O STP funciona por eleição e cálculo de caminho. Switches trocam BPDUs para descobrir a topologia e decidir qual switch será a raiz. A partir da raiz, cada switch escolhe o melhor caminho até ela. Portas que fazem parte da árvore ficam encaminhando. Portas que criariam ciclo ficam bloqueadas ou em estado alternativo.</p>\n<ol class=\"flow-list\"><li><strong>Troca de BPDUs:</strong> switches anunciam Bridge ID, custo e informações de caminho.</li><li><strong>Eleição da root bridge:</strong> o menor Bridge ID vence, considerando prioridade e MAC.</li><li><strong>Escolha da root port:</strong> em cada switch não-raiz, a porta com melhor caminho até a raiz é escolhida.</li><li><strong>Escolha de designated ports:</strong> em cada segmento, uma porta encaminha em direção ao melhor caminho.</li><li><strong>Bloqueio de portas redundantes:</strong> portas que fechariam loop ficam sem encaminhar frames de dados.</li><li><strong>Convergência:</strong> quando há falha, STP recalcula e pode liberar caminho alternativo.</li></ol>\n<p>Em STP clássico, estados como blocking, listening, learning e forwarding ajudam a evitar que uma porta comece a encaminhar antes de a topologia estar estável. Em RSTP, os papéis e transições são otimizados para convergir mais rápido.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma arquitetura de campus ou escritório, STP costuma aparecer entre switches de acesso, distribuição e core quando há links redundantes de Camada 2. Ele também aparece em redes com trunks, VLANs, switches empilhados, controladoras, APs, hypervisors e pequenos switches conectados indevidamente por usuários.</p>\n<ul><li><strong>Camada envolvida:</strong> Camada 2 do Modelo OSI.</li><li><strong>Componentes:</strong> switches, trunks, VLANs, BPDUs, portas access, portas trunk e links redundantes.</li><li><strong>Dependências:</strong> Ethernet, MAC, broadcast, VLANs e tabela MAC.</li><li><strong>Pontos de falha:</strong> root bridge indesejada, BPDU bloqueada, loop físico, trunk errado, switch não gerenciado e porta de usuário sem proteção.</li></ul>\n<p>Uma boa arquitetura define explicitamente quem deve ser root bridge, quais portas são de usuário, quais portas são trunk, onde redundância é permitida e quais proteções devem estar habilitadas.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine um prédio com vários corredores conectando as mesmas salas. Ter mais de um caminho é bom em caso de emergência, mas se todos correrem em círculos sem sinalização, o fluxo vira caos. O STP age como uma equipe de controle que mantém alguns corredores fechados no uso normal e os libera quando o caminho principal falha.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> corredores físicos não replicam pessoas automaticamente. Switches replicam frames broadcast e unknown unicast. Por isso, loops Ethernet podem crescer de forma muito mais rápida e destrutiva que uma simples confusão de rotas humanas.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Em uma rede pequena, alguém conecta dois cabos entre os mesmos dois switches domésticos ou de escritório. Sem STP, isso pode criar um loop. Um ARP Request enviado por um notebook pode circular entre os switches, voltar, ser replicado novamente e consumir a rede. Com STP ativo, um dos links fica bloqueado logicamente e só entra em uso se o caminho principal falhar.</p>\n<div class=\"content-card\"><strong>Leitura correta:</strong> dois cabos entre switches não significam automaticamente mais velocidade. Em Ethernet tradicional, sem agregação correta ou protocolo de controle, isso pode significar loop.</div>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, switches de acesso podem ter uplinks redundantes para dois switches de distribuição. Isso reduz indisponibilidade se um cabo ou switch falhar. Porém, a redundância precisa ser controlada. O time de redes deve definir root bridge primária e secundária, habilitar RSTP/MSTP conforme o desenho, configurar BPDU Guard em portas de usuário, Root Guard em portas estratégicas, restringir trunks e monitorar mudanças de topologia.</p>\n<p>Um incidente clássico ocorre quando alguém conecta um mini-switch não gerenciado embaixo da mesa e, por engano, fecha um loop entre duas tomadas. Se as portas de acesso não tiverem proteção, a tempestade pode atingir a VLAN inteira. Com BPDU Guard, storm control e monitoramento, o impacto pode ser reduzido.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud pública, o provedor normalmente abstrai Camada 2 tradicional. O cliente trabalha mais com VPC/VNet, subnets, route tables, security groups, load balancers e gateways. Mesmo assim, o conceito de loop e redundância controlada continua importante em conexões híbridas, appliances virtuais, extensões L2, VMware em cloud, SD-WAN, interconexões e redes de datacenter que se conectam à nuvem.</p>\n<p>O equivalente conceitual é: redundância precisa de controle. Em cloud, um desenho ruim de rotas, túneis, appliances ou propagação pode gerar blackhole, assimetria, loops lógicos ou rotas indesejadas. Não é STP clássico, mas o raciocínio de evitar ciclos e definir caminhos preferenciais permanece.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, STP aparece indiretamente quando pipelines dependem de rede física ou híbrida: runners self-hosted, clusters Kubernetes on-premises, registries internos, scanners, appliances, storage e ambientes de homologação. Um loop de Camada 2 pode derrubar o caminho até o registry, quebrar deploys, causar timeouts em pipelines e gerar sintomas que parecem erro de aplicação.</p>\n<p>Em infraestrutura como código, a lição é documentar e versionar o desenho lógico: VLANs, trunks, gateways, firewalls e dependências. Mesmo que a configuração de STP em switches físicos não esteja toda no repositório, a arquitetura precisa estar clara para que mudanças de rack, cabeamento e portas não quebrem a plataforma.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Em segurança, STP é controle de disponibilidade e resiliência. Loops podem ser acidentais, mas também podem ser explorados como forma de causar negação de serviço interna. Além disso, uma root bridge indevida pode alterar caminhos de tráfego e dificultar investigação.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>Loop de Camada 2</td><td>Broadcast storm, CPU alta, perda geral.</td><td>Indisponibilidade da VLAN ou campus.</td><td>RSTP, BPDU Guard, storm control e documentação.</td></tr>\n<tr><td>Root bridge indevida</td><td>Switch não planejado vira raiz.</td><td>Caminhos ruins e instabilidade.</td><td>Definir prioridade da root e usar Root Guard.</td></tr>\n<tr><td>Porta de usuário com switch indevido</td><td>Mini-switch ou bridge acidental.</td><td>Loop, bypass de desenho e risco operacional.</td><td>BPDU Guard, port security, 802.1X/NAC.</td></tr>\n<tr><td>Trunk mal configurado</td><td>VLANs excessivas atravessam onde não deveriam.</td><td>Maior superfície de erro e movimento lateral.</td><td>Allowed VLANs restritas e revisão de mudança.</td></tr>\n</tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"m03l08-title m03l08-desc\">\n<title id=\"m03l08-title\">STP bloqueando um caminho redundante para evitar loop</title>\n<desc id=\"m03l08-desc\">Três switches formam um triângulo físico. O STP elege uma raiz e bloqueia um dos caminhos para manter uma árvore lógica sem ciclos.</desc>\n<defs><marker id=\"m03l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n<rect x=\"380\" y=\"60\" width=\"200\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n<text x=\"480\" y=\"96\" text-anchor=\"middle\" class=\"svg-label\">Switch A</text><text x=\"480\" y=\"122\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Root bridge</text>\n<rect x=\"120\" y=\"320\" width=\"200\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n<text x=\"220\" y=\"356\" text-anchor=\"middle\" class=\"svg-label\">Switch B</text><text x=\"220\" y=\"382\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Root port ativa</text>\n<rect x=\"640\" y=\"320\" width=\"200\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n<text x=\"740\" y=\"356\" text-anchor=\"middle\" class=\"svg-label\">Switch C</text><text x=\"740\" y=\"382\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Porta alternativa</text>\n<line x1=\"380\" y1=\"130\" x2=\"285\" y2=\"320\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l08-arrow)\" />\n<line x1=\"580\" y1=\"130\" x2=\"675\" y2=\"320\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l08-arrow)\" />\n<line x1=\"320\" y1=\"360\" x2=\"640\" y2=\"360\" class=\"svg-flow svg-flow--blocked\" />\n<text x=\"480\" y=\"345\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">link físico redundante</text>\n<text x=\"480\" y=\"382\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">STP bloqueia logicamente para evitar loop</text>\n<rect x=\"70\" y=\"455\" width=\"820\" height=\"44\" rx=\"12\" class=\"svg-zone\" />\n<text x=\"480\" y=\"483\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Redundância física permanece; topologia lógica ativa vira uma árvore sem ciclos.</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório desta aula é defensivo e pode ser feito como análise, Packet Tracer/GNS3 ou em ambiente corporativo com permissão. O objetivo é identificar onde haveria loop, qual switch deveria ser root bridge e quais evidências indicariam STP atuando.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam leitura de topologia, identificação de riscos e interpretação de evidências de STP.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Você receberá uma topologia redundante de três switches e deverá propor uma configuração defensiva de STP, controles de porta e plano de validação.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução será comentada por raciocínio: primeiro identificar o risco de loop, depois definir root bridge, depois proteger portas de acesso, depois validar por evidências.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li><strong>Ideia central:</strong> STP permite redundância física sem loops lógicos em Camada 2.</li><li><strong>O que lembrar:</strong> Ethernet não tem TTL para frames; loops podem gerar broadcast storms.</li><li><strong>Erro comum:</strong> conectar links redundantes achando que sempre aumenta velocidade.</li><li><strong>Uso real:</strong> switches de acesso, distribuição, trunks, VLANs e ambientes com redundância.</li><li><strong>Segurança:</strong> BPDU Guard, Root Guard, PortFast, storm control, 802.1X/NAC e documentação reduzem risco.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você estudará segurança em Camada 2: ARP spoofing, MAC flooding e defesas. STP protege contra loops e storms, mas a LAN ainda possui riscos de manipulação de MAC, ARP, portas físicas e segmentação mal feita.</p>\n</section>"
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
  "protocolFields": [
    {
      "field": "Bridge ID",
      "size": "Prioridade + identificador/MAC",
      "purpose": "Identificar switches na eleição da root bridge.",
      "securityObservation": "Prioridade incorreta pode permitir root bridge indesejada."
    },
    {
      "field": "BPDU",
      "size": "PDU de controle de STP",
      "purpose": "Transportar informações de topologia, root, custo e timers.",
      "securityObservation": "BPDUs inesperadas em portas de usuário devem ser tratadas como risco operacional."
    },
    {
      "field": "Root Path Cost",
      "size": "Valor calculado conforme velocidade/custo do caminho",
      "purpose": "Escolher o melhor caminho até a root bridge.",
      "securityObservation": "Custos errados podem criar caminhos subótimos e dificultar investigação."
    },
    {
      "field": "Port Role",
      "size": "Estado lógico da porta",
      "purpose": "Definir root, designated, alternate/blocked conforme topologia.",
      "securityObservation": "Portas de usuário não devem influenciar a topologia STP."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Switches",
      "action": "Trocam BPDUs.",
      "detail": "Cada switch anuncia informações de bridge, root conhecida e custo.",
      "possibleFailure": "BPDUs filtradas ou root indesejada levam a desenho instável."
    },
    {
      "step": 2,
      "actor": "Domínio L2",
      "action": "Elege root bridge.",
      "detail": "O menor Bridge ID vence, considerando prioridade e MAC.",
      "possibleFailure": "Switch de acesso pode virar raiz se prioridade não for planejada."
    },
    {
      "step": 3,
      "actor": "Switch não-raiz",
      "action": "Escolhe root port.",
      "detail": "A porta com menor custo até a raiz fica como caminho principal.",
      "possibleFailure": "Custo incorreto ou link ruim pode virar caminho preferencial."
    },
    {
      "step": 4,
      "actor": "STP",
      "action": "Bloqueia porta redundante.",
      "detail": "A porta alternativa deixa de encaminhar frames de dados para quebrar o ciclo.",
      "possibleFailure": "Se não bloquear, broadcasts podem circular indefinidamente."
    },
    {
      "step": 5,
      "actor": "Rede em operação",
      "action": "Converge após falha.",
      "detail": "Se caminho ativo falha, STP recalcula e libera caminho alternativo.",
      "possibleFailure": "Convergência lenta ou instável causa indisponibilidade temporária."
    }
  ],
  "deepDive": {
    "mentalModel": "STP é o freio de segurança da redundância Ethernet: ele não remove os cabos extras, apenas decide quais caminhos podem encaminhar frames sem formar ciclos.",
    "keyTerms": [
      "STP",
      "RSTP",
      "BPDU",
      "root bridge",
      "root port",
      "designated port",
      "blocked port",
      "broadcast storm"
    ],
    "limitations": [
      "STP não substitui bom desenho físico.",
      "STP não corrige VLANs mal planejadas.",
      "STP pode convergir lentamente em versões antigas.",
      "STP não protege sozinho contra todos os ataques de Camada 2."
    ],
    "whenToUse": [
      "Redes Ethernet com caminhos redundantes de Camada 2.",
      "Switches de acesso e distribuição com uplinks redundantes.",
      "Ambientes onde loops acidentais podem ocorrer.",
      "Laboratórios Packet Tracer/GNS3 para entender estabilidade L2."
    ],
    "whenNotToUse": [
      "Como substituto para roteamento adequado em grandes domínios.",
      "Para mascarar topologia física bagunçada.",
      "Como única proteção em portas de usuário sem BPDU Guard/storm control."
    ],
    "operationalImpact": [
      "Exige definição de root bridge primária e secundária.",
      "Exige documentação de trunks, portas de acesso e links redundantes.",
      "Muda troubleshooting porque uma porta bloqueada pode ser comportamento esperado, não falha."
    ],
    "financialImpact": [
      "Reduz indisponibilidade causada por falha de link, mas exige switches gerenciáveis e tempo de engenharia.",
      "Falhas de STP podem gerar custo alto de incidente e parada operacional.",
      "Ferramentas de monitoramento e switches melhores podem aumentar custo inicial, mas reduzem risco."
    ],
    "securityImpact": [
      "Reduz impacto de loops e tempestades acidentais.",
      "Ajuda a conter mudanças indevidas de topologia quando combinado com Root Guard e BPDU Guard.",
      "Portas de usuário sem proteção continuam sendo risco relevante."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Conectar dois cabos entre switches sem STP ou agregação correta.",
      "whyItHappens": "A pessoa acredita que dois cabos significam mais velocidade ou redundância automática.",
      "consequence": "Loop de Camada 2 e broadcast storm.",
      "correction": "Usar STP/RSTP ou EtherChannel/LACP corretamente, conforme o objetivo."
    },
    {
      "mistake": "Não definir root bridge planejada.",
      "whyItHappens": "STP funciona automaticamente, então parece dispensar desenho.",
      "consequence": "Switch inadequado pode virar raiz e criar caminhos ruins.",
      "correction": "Configurar prioridade de root primária e secundária."
    },
    {
      "mistake": "Habilitar PortFast em trunk ou porta entre switches.",
      "whyItHappens": "Confusão entre porta de usuário e porta de infraestrutura.",
      "consequence": "Risco de loop antes da convergência adequada.",
      "correction": "Usar PortFast apenas em portas edge/de usuário, com BPDU Guard."
    },
    {
      "mistake": "Achar que porta bloqueada é defeito.",
      "whyItHappens": "O aluno espera que todo cabo conectado encaminhe tráfego.",
      "consequence": "Pode remover uma proteção necessária e criar loop.",
      "correction": "Interpretar estado STP antes de alterar cabos ou portas."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Rede inteira lenta ou indisponível de repente",
      "Luzes de switch piscando de forma intensa e contínua",
      "MAC flapping nos logs",
      "CPU alta em switch/firewall",
      "Perda de DHCP, ARP instável e broadcast anormal",
      "Porta alternando entre estados STP"
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
        "command": "show spanning-tree\nshow spanning-tree vlan <id>\nshow mac address-table dynamic\nshow logging | include STP|SPANTREE|MACFLAP\nshow interfaces counters errors",
        "purpose": "Ver root bridge, estados de portas, MAC flapping, logs e erros.",
        "expectedObservation": "Root bridge planejada, portas forwarding/blocking coerentes e ausência de MAC flapping excessivo.",
        "interpretation": "Se root bridge estiver errada ou houver flapping, investigar cabos, trunks e portas de usuário."
      }
    ],
    "decisionTree": [
      {
        "if": "Há MAC flapping entre duas portas",
        "then": "Suspeitar de loop, switch indevido, trunk errado ou endpoint bridgeando interfaces."
      },
      {
        "if": "Uma porta está blocking/alternate",
        "then": "Verificar se é comportamento esperado do STP antes de alterar a topologia."
      },
      {
        "if": "Root bridge não é a planejada",
        "then": "Revisar prioridade STP, Root Guard e desenho de distribuição/core."
      },
      {
        "if": "Broadcast está anormal",
        "then": "Aplicar contenção operacional, identificar origem e validar storm control."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Definir root bridge primária e secundária por VLAN/instância.",
      "Usar RSTP/MSTP quando adequado.",
      "Habilitar BPDU Guard em portas de usuário com PortFast.",
      "Usar Root Guard onde root não deve aparecer.",
      "Configurar storm control em portas de acesso.",
      "Documentar trunks, VLANs permitidas e links redundantes.",
      "Monitorar mudanças de topologia e MAC flapping."
    ],
    "badPractices": [
      "Conectar links redundantes sem controle.",
      "Permitir mini-switches não gerenciados em portas de usuário.",
      "Deixar todos os trunks permitindo todas as VLANs.",
      "Não definir root bridge.",
      "Desabilitar STP para resolver sintoma sem entender a causa."
    ],
    "commonErrors": [
      "Confundir EtherChannel/LACP com STP.",
      "Achar que STP aumenta banda.",
      "Tratar porta bloqueada como defeito sem análise.",
      "Usar PortFast em porta de switch para switch."
    ],
    "vulnerabilities": [
      {
        "name": "Loop acidental de Camada 2",
        "description": "Cabo ou switch indevido cria caminho cíclico para frames Ethernet.",
        "defensiveExplanation": "O risco principal é indisponibilidade por broadcast storm e instabilidade de tabela MAC.",
        "mitigation": "RSTP, BPDU Guard, storm control, documentação e controle físico."
      },
      {
        "name": "Root bridge indevida",
        "description": "Um switch não planejado passa a influenciar a topologia STP.",
        "defensiveExplanation": "Pode alterar caminhos, piorar desempenho e dificultar investigação.",
        "mitigation": "Prioridade planejada, Root Guard e monitoramento de eventos STP."
      },
      {
        "name": "Porta de usuário aceitando BPDUs",
        "description": "Uma porta edge permite que equipamento conectado participe da topologia STP.",
        "defensiveExplanation": "A topologia pode ser alterada por erro ou dispositivo não autorizado.",
        "mitigation": "BPDU Guard, 802.1X/NAC e políticas de porta."
      }
    ],
    "monitoring": [
      "Eventos de topologia STP",
      "Mudança de root bridge",
      "MAC flapping",
      "Taxa de broadcast/multicast",
      "Portas errdisable por BPDU Guard",
      "CPU alta em switches"
    ],
    "hardening": [
      "BPDU Guard em portas edge",
      "Root Guard em portas estratégicas",
      "Storm control",
      "Port security",
      "802.1X/NAC",
      "Allowed VLANs restritas em trunks",
      "Documentação de root e links redundantes"
    ],
    "detectionIdeas": [
      "Alertar quando root bridge mudar.",
      "Alertar MAC flapping frequente.",
      "Alertar broadcast acima do baseline.",
      "Revisar portas com PortFast recebendo BPDU.",
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
      "Ter concluído as aulas 3.1 a 3.7.",
      "Opcional: Packet Tracer, GNS3 ou acesso autorizado a switches de laboratório.",
      "Não executar mudanças em rede corporativa sem autorização."
    ],
    "tools": [
      "Papel ou editor de desenho",
      "Packet Tracer ou GNS3 opcional",
      "Terminal Windows/Linux para coleta indireta",
      "Cisco IOS em laboratório opcional"
    ],
    "estimatedTimeMinutes": 130,
    "cost": "zero",
    "safetyNotes": [
      "Não crie loops em rede real.",
      "Não conecte cabos redundantes em switches corporativos sem mudança aprovada.",
      "Não desabilite STP para testar impacto.",
      "Sanitize nomes de switches, VLANs, IPs, MACs e topologia antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Desenhar a topologia física",
        "instruction": "Desenhe três switches em triângulo e marque todos os links físicos entre eles.",
        "analysisTask": "Desenhar a topologia física em papel, editor de desenho, Packet Tracer ou GNS3 e identificar visualmente o ciclo.",
        "expectedOutput": "Diagrama físico com Switch A, Switch B e Switch C conectados em ciclo.",
        "explanation": "A topologia física possui redundância, mas também cria potencial de loop."
      },
      {
        "number": 2,
        "title": "Definir root bridge planejada",
        "instruction": "Escolha o Switch A como root bridge e anote por que ele deve ser a raiz.",
        "command": "Cisco IOS conceitual: spanning-tree vlan 10 priority 4096",
        "expectedOutput": "Switch A planejado como raiz da VLAN/instância.",
        "explanation": "A root bridge deve ficar em ponto central e previsível da arquitetura."
      },
      {
        "number": 3,
        "title": "Identificar portas esperadas",
        "instruction": "Marque root ports, designated ports e uma porta alternativa/bloqueada para quebrar o ciclo.",
        "command": "Cisco IOS validação: show spanning-tree vlan 10",
        "expectedOutput": "Portas em forwarding nos caminhos principais e uma porta em alternate/blocking no caminho redundante.",
        "explanation": "A porta bloqueada não é defeito; ela evita loop."
      },
      {
        "number": 4,
        "title": "Listar sintomas de loop",
        "instruction": "Monte uma lista de sintomas que indicariam broadcast storm ou instabilidade de STP.",
        "command": "show logging | include STP|SPANTREE|MACFLAP",
        "expectedOutput": "Lista com MAC flapping, broadcast alto, CPU alta, perda de conectividade e mudança de topologia.",
        "explanation": "Sintomas ajudam a priorizar investigação sem chutar causa."
      },
      {
        "number": 5,
        "title": "Planejar proteções de porta",
        "instruction": "Defina onde usar BPDU Guard, Root Guard, PortFast e storm control.",
        "command": "Cisco IOS conceitual: spanning-tree portfast\nspanning-tree bpduguard enable\nstorm-control broadcast level ...",
        "expectedOutput": "Tabela de controles por tipo de porta: usuário, trunk, uplink e infraestrutura.",
        "explanation": "Controles de borda reduzem risco de loops acidentais ou equipamentos indevidos."
      },
      {
        "number": 6,
        "title": "Criar relatório sanitizado",
        "instruction": "Escreva um relatório com topologia, riscos, evidências esperadas e recomendações.",
        "analysisTask": "Produzir relatório sanitizado com topologia, riscos, evidências esperadas e recomendações defensivas.",
        "expectedOutput": "Relatório sem nomes reais, IPs públicos, MACs completos ou informações sensíveis.",
        "explanation": "Documentação de STP é útil para operação e segurança, mas também pode revelar topologia interna."
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
    "troubleshooting": [
      {
        "symptom": "Broadcast alto e rede instável",
        "probableCause": "Loop de Camada 2 ou storm.",
        "howToConfirm": "Ver MAC flapping, eventos STP, taxa de broadcast e mudanças físicas recentes.",
        "fix": "Isolar link suspeito conforme procedimento, validar STP e aplicar controles."
      },
      {
        "symptom": "Switch de acesso virou root",
        "probableCause": "Prioridade STP não planejada.",
        "howToConfirm": "show spanning-tree root ou equivalente.",
        "fix": "Configurar root primária/secundária e Root Guard."
      },
      {
        "symptom": "Porta de usuário em errdisable",
        "probableCause": "BPDU Guard recebeu BPDU de switch conectado indevidamente.",
        "howToConfirm": "show interface status err-disabled e logs.",
        "fix": "Remover equipamento indevido, validar política e reabilitar conforme procedimento."
      },
      {
        "symptom": "Porta bloqueada e usuário reclama de link redundante sem tráfego",
        "probableCause": "STP bloqueou caminho para evitar loop.",
        "howToConfirm": "show spanning-tree interface <porta> detail.",
        "fix": "Explicar comportamento esperado ou redesenhar com LACP/roteamento se objetivo for usar banda ativa."
      }
    ],
    "improvements": [
      "Simular a topologia no Packet Tracer ou GNS3.",
      "Criar tabela de root primária/secundária por VLAN.",
      "Adicionar alertas de mudança de root e MAC flapping.",
      "Revisar allowed VLANs em trunks.",
      "Documentar portas edge com BPDU Guard."
    ],
    "evidenceToCollect": [
      "Diagrama físico",
      "Diagrama lógico STP",
      "Root bridge planejada",
      "Portas forwarding e blocked/alternate",
      "Logs de STP ou MAC flapping sanitizados",
      "Tabela de controles por porta"
    ],
    "questions": [
      "Por que STP bloqueia uma porta em uma topologia redundante?",
      "Por que uma porta bloqueada pode ser comportamento correto?",
      "Qual o risco de um switch de usuário enviar BPDU?",
      "Por que storm control não substitui STP?"
    ],
    "challenge": "Propor uma política defensiva para uma rede com switches de acesso redundantes, impedindo loops acidentais em portas de usuário.",
    "solution": "A solução deve definir root primária/secundária, RSTP/MSTP conforme necessidade, BPDU Guard em portas edge, Root Guard onde root não deve aparecer, storm control, trunks restritos, documentação e alertas de mudança de topologia. Não se deve desabilitar STP para resolver bloqueio sem entender a topologia."
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
      "id": "q3.8.1",
      "type": "conceito",
      "q": "Qual problema o STP resolve principalmente?",
      "opts": [
        "Loops de Camada 2 em topologias Ethernet redundantes",
        "Criptografia de tráfego HTTP",
        "Resolução de nomes DNS",
        "Cálculo de sub-redes IPv4"
      ],
      "a": 0,
      "exp": "STP cria uma topologia lógica sem ciclos para evitar loops e broadcast storms em Camada 2.",
      "difficulty": "iniciante",
      "topic": "STP"
    },
    {
      "id": "q3.8.2",
      "type": "diagnóstico",
      "q": "Qual sintoma é fortemente associado a loop de Camada 2?",
      "opts": [
        "MAC flapping e broadcast storm",
        "Erro 404 em uma página específica",
        "Senha expirada no IAM",
        "Certificado TLS vencido"
      ],
      "a": 0,
      "exp": "MAC flapping, broadcast alto e instabilidade geral são indícios típicos de problemas de Camada 2.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q3.8.3",
      "type": "comparação",
      "q": "Uma porta bloqueada pelo STP deve ser sempre considerada defeito?",
      "opts": [
        "Não; pode ser comportamento esperado para evitar loop",
        "Sim; toda porta conectada deve encaminhar",
        "Sim; STP só bloqueia quando há cabo rompido",
        "Não; mas deve ser removida fisicamente sempre"
      ],
      "a": 0,
      "exp": "STP bloqueia portas redundantes para manter a topologia lógica sem ciclos.",
      "difficulty": "iniciante",
      "topic": "estados STP"
    },
    {
      "id": "q3.8.4",
      "type": "segurança",
      "q": "Qual controle ajuda a impedir que uma porta de usuário participe indevidamente da topologia STP?",
      "opts": [
        "BPDU Guard",
        "Base64",
        "NAT overload",
        "DNS recursion"
      ],
      "a": 0,
      "exp": "BPDU Guard desabilita ou protege a porta quando recebe BPDU inesperada em porta edge.",
      "difficulty": "intermediário",
      "topic": "hardening"
    },
    {
      "id": "q3.8.5",
      "type": "arquitetura",
      "q": "Por que é recomendado definir root bridge primária e secundária?",
      "opts": [
        "Para tornar previsível o caminho lógico da Camada 2",
        "Para substituir o gateway padrão",
        "Para eliminar a necessidade de VLANs",
        "Para criptografar BPDUs"
      ],
      "a": 0,
      "exp": "Root planejada evita que um switch inadequado controle a topologia STP.",
      "difficulty": "intermediário",
      "topic": "arquitetura"
    },
    {
      "id": "q3.8.6",
      "type": "comando",
      "q": "Qual comando Cisco é mais diretamente útil para verificar a topologia STP?",
      "opts": [
        "show spanning-tree",
        "show ip nat translations",
        "show crypto ikev2 sa",
        "show users"
      ],
      "a": 0,
      "exp": "show spanning-tree mostra root, portas, estados e informações de STP.",
      "difficulty": "iniciante",
      "topic": "Cisco IOS"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.8.1",
      "front": "O que é STP?",
      "back": "Protocolo de Camada 2 que evita loops Ethernet criando uma topologia lógica sem ciclos.",
      "tags": [
        "stp",
        "camada 2"
      ],
      "difficulty": "iniciante"
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
      "id": "fc3.8.3",
      "front": "O que é BPDU?",
      "back": "Mensagem de controle usada por switches para trocar informações de STP.",
      "tags": [
        "bpdu",
        "stp"
      ],
      "difficulty": "iniciante"
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
      "id": "ex3.8.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras por que Ethernet precisa de STP em topologias redundantes.",
      "expectedAnswer": "Porque frames Ethernet não têm TTL e switches replicam broadcast/flooding; em loop, frames podem circular indefinidamente e gerar broadcast storm.",
      "explanation": "A resposta deve conectar loop, flooding, broadcast e ausência de TTL em Camada 2."
    },
    {
      "id": "ex3.8.2",
      "type": "diagnóstico",
      "prompt": "Liste cinco evidências que você procuraria em um possível loop de Camada 2.",
      "expectedAnswer": "MAC flapping, eventos STP, mudança de root, broadcast alto, CPU alta no switch, portas errdisable por BPDU Guard, perda generalizada na VLAN.",
      "explanation": "Essas evidências ajudam a confirmar problema L2 antes de culpar DNS, HTTP ou aplicação."
    },
    {
      "id": "ex3.8.3",
      "type": "arquitetura",
      "prompt": "Em uma rede com dois switches de distribuição e vários switches de acesso, onde faria sentido posicionar a root bridge?",
      "expectedAnswer": "Em um switch de distribuição/core central e previsível, com secundária no outro equipamento de distribuição, evitando que switches de acesso virem root.",
      "explanation": "Root bridge deve refletir o desenho lógico desejado da rede."
    },
    {
      "id": "ex3.8.4",
      "type": "segurança",
      "prompt": "Explique a diferença entre BPDU Guard, Root Guard e storm control.",
      "expectedAnswer": "BPDU Guard protege portas edge contra BPDUs inesperadas; Root Guard impede que uma porta aceite root superior onde não deveria; storm control limita tráfego broadcast/multicast/unknown unicast acima de limiares.",
      "explanation": "Os controles são complementares e atuam em problemas diferentes."
    }
  ],
  "challenge": {
    "title": "Projetar redundância segura para uma LAN pequena",
    "scenario": "Uma empresa tem três switches: um de distribuição e dois de acesso. Ela quer redundância entre os switches, mas já sofreu uma indisponibilidade causada por loop acidental em uma sala de reunião.",
    "tasks": [
      "Definir root bridge primária e secundária.",
      "Indicar onde usar BPDU Guard, Root Guard, PortFast e storm control.",
      "Desenhar a topologia física e lógica.",
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
        "description": "Define primária e secundária coerentes com a topologia."
      },
      {
        "criterion": "Controles de borda",
        "points": 25,
        "description": "Aplica BPDU Guard, PortFast e storm control adequadamente."
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
    "reasoning": "Primeiro identificamos onde existe redundância física e onde poderia haver loop. Depois escolhemos uma root bridge central e previsível. Em seguida protegemos portas de usuário, porque loops acidentais frequentemente surgem na borda. Por fim definimos evidências de validação e monitoramento.",
    "steps": [
      "Desenhar a topologia física.",
      "Escolher switch de distribuição como root primária.",
      "Escolher outro equipamento central como root secundária.",
      "Usar BPDU Guard e PortFast apenas em portas de usuário.",
      "Usar Root Guard em portas onde root não deve aparecer.",
      "Aplicar storm control conforme política.",
      "Validar com show spanning-tree, logs e tabela MAC.",
      "Documentar e sanitizar evidências."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Desabilitar STP para a porta parar de bloquear.",
        "whyItIsWrong": "A porta pode estar bloqueada justamente para evitar loop. Desabilitar STP pode causar broadcast storm."
      },
      {
        "answer": "Conectar dois cabos entre switches para dobrar velocidade.",
        "whyItIsWrong": "Sem agregação correta ou STP, isso cria risco de loop. STP pode bloquear um dos links; LACP é outro assunto."
      },
      {
        "answer": "Deixar qualquer switch virar root.",
        "whyItIsWrong": "A topologia lógica fica imprevisível e pode usar caminhos ruins."
      }
    ],
    "finalAnswer": "Uma solução defensiva define root primária/secundária, mantém RSTP/MSTP conforme arquitetura, protege portas de usuário com PortFast e BPDU Guard, usa Root Guard em pontos estratégicos, aplica storm control, restringe trunks, monitora MAC flapping e mudanças de root, e documenta topologia física/lógica."
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
