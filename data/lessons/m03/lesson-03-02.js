export const lesson0302 = {
  "id": "3.2",
  "moduleId": "m03",
  "order": 2,
  "title": "Frame Ethernet e endereço MAC",
  "subtitle": "Como o envelope local da LAN organiza origem, destino, tipo de payload e evidências de Camada 2.",
  "duration": "85-120 min",
  "estimatedStudyTimeMinutes": 120,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 210,
  "tags": [
    "redes",
    "ethernet",
    "frame",
    "mac",
    "camada 2",
    "wireshark",
    "switch",
    "arp",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.1",
      "reason": "É necessário entender Ethernet como base da LAN antes de abrir o frame."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.4",
      "reason": "A aula depende do entendimento de Camada 2, frames, MAC, switch e ARP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "MAC e EtherType são representados em hexadecimal."
    }
  ],
  "objectives": [
    "Explicar por que frames Ethernet existem e qual problema resolvem na LAN.",
    "Identificar os principais campos de um frame Ethernet.",
    "Diferenciar endereço MAC de endereço IP e entender o escopo local do MAC.",
    "Interpretar unicast, broadcast e multicast em cenários básicos.",
    "Relacionar MAC e frame com switch, ARP, VLAN, troubleshooting e segurança defensiva."
  ],
  "learningOutcomes": [
    "Dado um frame Ethernet simplificado, o aluno identifica MAC de origem, MAC de destino, EtherType, payload e FCS.",
    "Dado um fluxo host-gateway, o aluno explica por que o MAC de destino local pode ser o gateway e não o servidor final.",
    "Dado um MAC em evidência, o aluno evita tratá-lo como identidade forte sem correlação.",
    "Dado um problema de LAN, o aluno sabe coletar MAC local, ARP, gateway e evidências de switch de forma segura."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Você abre uma captura no Wireshark e vê várias linhas com <strong>Source</strong>, <strong>Destination</strong>, <strong>Protocol</strong> e <strong>Info</strong>. Em uma delas aparece algo como <code>Ethernet II, Src: 3c:52:82:aa:10:22, Dst: ff:ff:ff:ff:ff:ff</code>. Para quem ainda não entende Camada 2, isso parece um monte de números sem significado. Para um analista de redes ou segurança, porém, essa linha conta uma história: quem está falando, para quem está falando localmente, qual protocolo foi carregado e se o tráfego é unicast, multicast ou broadcast.</p>\n<p>A aula anterior mostrou Ethernet como tecnologia de LAN. Agora vamos abrir o envelope. O frame Ethernet é a unidade de entrega local. Ele carrega dados de camadas superiores dentro de uma estrutura com campos próprios. O endereço MAC é o identificador de interface usado nessa entrega local. Sem entender frame e MAC, fica difícil compreender switch, tabela MAC, ARP, VLAN, flooding, broadcast, NAC, port security, spoofing defensivo e troubleshooting de rede local.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um SOC observa tráfego estranho vindo de um MAC desconhecido, mas o IP muda ao longo do dia. Se a equipe só sabe olhar IP, perde parte da investigação. Se sabe interpretar MAC, OUI, porta de switch, VLAN e frame, consegue relacionar evidências de rede, inventário e segurança física.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>O endereço MAC surgiu da necessidade de identificar interfaces em redes locais. Quando várias máquinas compartilham uma tecnologia de enlace, cada quadro precisa dizer quem é o remetente local e quem é o destinatário local. Na Ethernet clássica, isso era essencial para organizar a comunicação em meio compartilhado. Na Ethernet comutada moderna, isso se tornou essencial para o switch aprender em qual porta cada endereço aparece.</p>\n<p>Historicamente, Ethernet evoluiu junto com o formato de frame. O padrão mais comum em redes modernas é o Ethernet II, muito visto em capturas. Ele carrega um campo chamado EtherType, que indica qual protocolo vem dentro do payload, como IPv4, IPv6 ou ARP. Também existem variações relacionadas a IEEE 802.3 e 802.1Q, especialmente quando VLANs entram no caminho.</p>\n<p>Hoje, mesmo quando a rede parece “virtual”, a ideia continua viva. Máquinas virtuais têm MACs virtuais, containers podem usar bridges com endereços de enlace, hipervisores criam switches virtuais, cloud providers abstraem Camada 2, e appliances de segurança continuam correlacionando IP, MAC, porta, VLAN e identidade quando possível.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema técnico é simples de enunciar: bits precisam ser agrupados em uma estrutura que tenha começo, fim, origem, destino, tipo de conteúdo e verificação de integridade. Se tudo fosse apenas uma sequência contínua de bits no meio físico, o receptor não saberia onde uma mensagem começa, onde termina, a quem ela se destina ou qual protocolo deve processá-la depois.</p>\n<ul class=\"flow-list\"><li><strong>Sem frame:</strong> os bits não formariam uma unidade de entrega local interpretável.</li><li><strong>Sem MAC de destino:</strong> o switch não teria critério para encaminhar o quadro.</li><li><strong>Sem MAC de origem:</strong> o switch não aprenderia onde está cada interface.</li><li><strong>Sem EtherType:</strong> o receptor não saberia se o payload carrega IPv4, IPv6, ARP ou outro protocolo.</li><li><strong>Sem FCS:</strong> erros de transmissão seriam mais difíceis de detectar no enlace.</li></ul>\n<p>O frame Ethernet não resolve roteamento entre redes, não garante identidade forte, não criptografa conteúdo, não autentica usuário e não substitui políticas de firewall. Ele resolve a entrega local de uma unidade de dados dentro de um domínio de Camada 2.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>O frame Ethernet foi adaptado ao longo do tempo para atender novas necessidades: interoperabilidade, identificação do protocolo transportado, VLANs, maiores velocidades e ambientes virtuais.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Elemento</th><th>Função</th><th>Problema resolvido</th><th>Limitação</th></tr></thead><tbody>\n<tr><td>MAC de destino</td><td>Indica o destinatário local do frame.</td><td>Permite encaminhamento por switches.</td><td>É local ao enlace; não substitui IP.</td></tr>\n<tr><td>MAC de origem</td><td>Indica quem enviou o frame localmente.</td><td>Permite aprendizado da tabela MAC.</td><td>Pode ser alterado em software.</td></tr>\n<tr><td>EtherType</td><td>Indica o protocolo encapsulado.</td><td>Permite entregar o payload ao protocolo correto.</td><td>Não valida se o conteúdo é seguro.</td></tr>\n<tr><td>802.1Q VLAN tag</td><td>Adiciona identificação de VLAN em trunks.</td><td>Permite segmentação lógica sobre enlaces físicos compartilhados.</td><td>Configuração errada pode vazar ou isolar tráfego.</td></tr>\n<tr><td>FCS</td><td>Detecta erro no frame.</td><td>Ajuda a descartar quadros corrompidos.</td><td>Não corrige o erro; apenas detecta.</td></tr>\n</tbody></table>\n<p>O ponto pedagógico importante é que o frame é uma estrutura de enlace. Ele não é “o pacote IP”, mas pode carregar um pacote IP. Ele não é “a conexão TCP”, mas pode carregar um segmento TCP dentro de um pacote IP dentro do payload Ethernet.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>Um <strong>frame Ethernet</strong> é a unidade de dados da Camada 2 usada pela Ethernet para transportar informações dentro de uma rede local. Ele contém campos de controle e endereçamento local, além do payload que carrega dados de camadas superiores.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> endereço MAC é um identificador de 48 bits associado a uma interface de rede, usado como endereço local de Camada 2 em tecnologias como Ethernet.</div>\n<p>Um MAC normalmente é representado em hexadecimal, em seis pares de caracteres, como <code>3c:52:82:aa:10:22</code>. Os primeiros bits podem indicar se o endereço é individual ou de grupo e se é universalmente administrado ou localmente administrado. Em termos práticos, o MAC ajuda switches a encaminharem frames na LAN, mas não deve ser tratado como identidade forte de usuário ou de dispositivo confiável.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Quando um host precisa enviar dados pela Ethernet, ele encapsula o payload em um frame. O processo não é decorativo: cada campo orienta uma decisão operacional.</p>\n<ol class=\"flow-list\"><li>A aplicação gera dados e a pilha de rede cria as estruturas superiores, como segmento TCP e pacote IP.</li><li>O host decide o próximo destino local: o próprio host de destino, se estiver na mesma rede, ou o gateway, se estiver em outra rede.</li><li>Para IPv4, o host pode usar ARP para descobrir o MAC correspondente ao IP local ou ao gateway.</li><li>A NIC monta o frame com MAC de destino, MAC de origem, EtherType e payload.</li><li>O frame é transmitido como sinais no meio físico.</li><li>O switch lê o MAC de origem, atualiza a tabela MAC, lê o MAC de destino e decide a porta de saída.</li><li>O destino recebe o frame, verifica integridade e passa o payload para o protocolo indicado pelo EtherType.</li></ol>\n<p>Um endereço de destino <code>ff:ff:ff:ff:ff:ff</code> representa broadcast Ethernet. Isso significa “todos no domínio de broadcast devem receber”. ARP usa broadcast para perguntar quem possui determinado IPv4 local. Multicast e unicast têm comportamentos diferentes e serão importantes em vários diagnósticos futuros.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma arquitetura corporativa, frames Ethernet aparecem em enlaces de acesso, uplinks, trunks, servidores, appliances, hypervisors, switches virtuais e interligações de datacenter. A forma como o frame circula determina onde um problema pode existir.</p>\n<ul class=\"flow-list\"><li><strong>Host:</strong> possui uma NIC com MAC físico ou virtual.</li><li><strong>Switch de acesso:</strong> aprende MACs por porta e encaminha frames.</li><li><strong>VLAN:</strong> separa domínios lógicos de Camada 2.</li><li><strong>Gateway:</strong> recebe frames destinados ao seu MAC quando o tráfego precisa sair da rede local.</li><li><strong>Firewall:</strong> pode ver o frame no enlace local, mas normalmente aplica política em camadas superiores.</li><li><strong>NAC/802.1X:</strong> pode usar porta, MAC e identidade para controlar acesso, mas MAC isolado não basta.</li></ul>\n<p>Em cloud pública, muitos detalhes de Camada 2 são abstraídos. Mesmo assim, entender MAC e frame ajuda a compreender ENIs, interfaces virtuais, overlays, appliances, bridges, SDN e limitações de protocolos que dependem de broadcast.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense no frame Ethernet como um envelope usado dentro de um prédio. O envelope não precisa ter o endereço completo da cidade; ele precisa indicar a sala de origem e a sala de destino dentro daquele prédio. O switch é como a recepção que sabe em qual corredor fica cada sala.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> o MAC não identifica uma pessoa com confiança, e o frame não atravessa a internet inteira como um envelope postal. A cada salto roteado, o pacote IP pode ser colocado dentro de um novo frame com MACs diferentes.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Seu notebook quer acessar o roteador doméstico em <code>192.168.1.1</code>. Antes de enviar o pacote IP, ele precisa enviar um frame para o MAC da interface LAN do roteador. Se não souber esse MAC, usa ARP. Quando descobre, cria um frame Ethernet com MAC de origem da sua placa e MAC de destino do roteador.</p>\n<p>Se você rodar <code>arp -a</code>, pode ver a associação entre o IP do gateway e um endereço físico. Essa associação não é a “internet”; é apenas a entrega local até o gateway. Depois do gateway, o pacote segue por outros enlaces, cada um com seus próprios frames.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, um notebook conectado na tomada de rede acessa um sistema interno. O caminho pode ser: notebook → tomada → patch panel → switch de acesso → firewall/gateway → servidor. No primeiro trecho, o frame Ethernet carrega o pacote até o próximo equipamento local. O switch aprende o MAC do notebook em uma porta específica e usa a tabela MAC para encaminhar frames de retorno.</p>\n<p>Se o notebook for conectado em outra porta sem documentação, pode cair em VLAN errada. Se o MAC não aparecer na tabela do switch, talvez não haja link, autenticação, VLAN correta ou tráfego. Se o MAC aparece em portas diferentes rapidamente, pode haver loop, mobilidade, virtualização, docking station, spoofing ou problema operacional.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud pública, você normalmente não administra switches físicos nem vê broadcast Ethernet tradicional como em uma LAN local. Ainda assim, cada máquina virtual tem interfaces virtuais, endereços MAC virtuais e uma rede definida por software por trás. Provedores abstraem muitos detalhes para evitar que clientes compartilhem o mesmo domínio de broadcast inseguro.</p>\n<p>Esse detalhe é importante em migrações. Sistemas legados que dependem de broadcast, descoberta L2 ou comportamento específico de MAC podem não funcionar igual na cloud. Já em cloud híbrida, appliances virtuais, VPNs, links dedicados, bridges locais e hypervisors podem exigir raciocínio de Camada 2 mesmo quando parte do ambiente está abstraída.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, MAC e frames aparecem indiretamente em runners self-hosted, ambientes de laboratório, hypervisors, redes Docker, bridges Linux, Kubernetes local, appliances virtuais e simulações de rede. Um pipeline pode falhar ao baixar artefatos não porque o código está errado, mas porque o runner está em VLAN errada ou a interface virtual não está conectada ao bridge correto.</p>\n<p>Infra as Code costuma configurar subnets, security groups, route tables e firewalls, mas ambientes locais e híbridos ainda dependem de switches, VLANs e interfaces. Um engenheiro de plataforma que entende Camada 2 consegue dialogar melhor com redes, segurança e infraestrutura quando uma automação falha por conectividade local.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Do ponto de vista defensivo, MAC é evidência útil, mas não prova absoluta. Um endereço MAC pode ser alterado, clonado ou aparecer por trás de virtualização. Por isso, deve ser correlacionado com porta de switch, VLAN, autenticação, DHCP, logs de firewall, EDR, NAC, inventário e identidade.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>MAC spoofing</td><td>Dispositivo usa MAC de outro ativo.</td><td>Confusão de inventário e possível bypass frágil.</td><td>802.1X, NAC, port security, inventário e correlação.</td></tr>\n<tr><td>MAC flooding</td><td>Tabela MAC do switch fica instável ou cheia.</td><td>Flooding indevido e degradação.</td><td>Limite de MAC por porta, monitoramento e switches gerenciáveis.</td></tr>\n<tr><td>Rede plana</td><td>Muitos ativos no mesmo domínio de broadcast.</td><td>Maior superfície de movimento lateral.</td><td>VLANs, ACLs, firewall interno e menor privilégio.</td></tr>\n<tr><td>Portas expostas</td><td>Tomadas ativas em áreas públicas.</td><td>Acesso físico indevido à LAN.</td><td>Desativar portas, 802.1X, controle físico e alertas.</td></tr>\n</tbody></table>\n<p>Esta aula não ensina exploração ofensiva. O foco é compreender evidências e controles para defender redes locais.</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m03l02-title m03l02-desc\">\n<title id=\"m03l02-title\">Frame Ethernet e endereço MAC</title>\n<desc id=\"m03l02-desc\">Diagrama mostra um host enviando um frame Ethernet para o gateway através de um switch, com campos de MAC de destino, MAC de origem, EtherType, payload e FCS.</desc>\n<defs><marker id=\"m03l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path></marker></defs>\n<rect x=\"40\" y=\"90\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\"></rect><text x=\"115\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Host</text><text x=\"115\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC A</text>\n<rect x=\"410\" y=\"90\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect><text x=\"490\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Switch</text><text x=\"490\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela MAC</text>\n<rect x=\"790\" y=\"90\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\"></rect><text x=\"865\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"865\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC B</text>\n<line x1=\"190\" y1=\"125\" x2=\"410\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l02-arrow)\"></line>\n<line x1=\"570\" y1=\"125\" x2=\"790\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l02-arrow)\"></line>\n<rect x=\"100\" y=\"240\" width=\"125\" height=\"52\" rx=\"8\" class=\"svg-node\"></rect><text x=\"162\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dst MAC B</text>\n<rect x=\"225\" y=\"240\" width=\"125\" height=\"52\" rx=\"8\" class=\"svg-node\"></rect><text x=\"287\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Src MAC A</text>\n<rect x=\"350\" y=\"240\" width=\"115\" height=\"52\" rx=\"8\" class=\"svg-node\"></rect><text x=\"407\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">EtherType</text>\n<rect x=\"465\" y=\"240\" width=\"245\" height=\"52\" rx=\"8\" class=\"svg-node svg-node--server\"></rect><text x=\"587\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Payload: IP / ARP / IPv6</text>\n<rect x=\"710\" y=\"240\" width=\"95\" height=\"52\" rx=\"8\" class=\"svg-node svg-node--security\"></rect><text x=\"757\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">FCS</text>\n<text x=\"490\" y=\"220\" text-anchor=\"middle\" class=\"svg-label\">Frame Ethernet: envelope local da LAN</text>\n<path d=\"M160 292 C240 360, 710 360, 760 292\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m03l02-arrow)\"></path>\n<text x=\"490\" y=\"385\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">A cada salto roteado, os MACs locais podem mudar; o IP de origem/destino permanece no pacote.</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório desta aula é defensivo e seguro. Você vai observar endereços MAC locais, gateway, tabela ARP e evidências de interface para entender como o frame Ethernet conecta o host ao próximo salto local. O objetivo não é alterar MAC nem executar ataques, mas interpretar evidências.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam diferença entre MAC e IP, unicast e broadcast, campos do frame e limites de interpretação de evidências de Camada 2.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio simula um incidente em que um MAC desconhecido aparece na rede. Você deverá montar uma linha de investigação defensiva sem assumir culpa ou identidade apenas pelo endereço MAC.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como correlacionar MAC, porta de switch, VLAN, inventário, ARP, DHCP e logs sem cair no erro de tratar MAC como identidade forte.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li><strong>Ideia central:</strong> frame Ethernet é a unidade de entrega local da Camada 2.</li><li><strong>O que lembrar:</strong> MAC identifica interfaces no enlace local, mas não é identidade forte.</li><li><strong>Erro comum:</strong> achar que MAC atravessa a internet inteira como o IP.</li><li><strong>Uso real:</strong> switches, ARP, VLANs, NAC, Wireshark, troubleshooting e segurança de LAN.</li><li><strong>Segurança:</strong> correlacione MAC com porta, VLAN, autenticação, inventário e logs.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, estudaremos como switches aprendem endereços MAC, como fazem forwarding e por que flooding acontece. O frame e o MAC que você aprendeu aqui são a matéria-prima da tabela MAC do switch.</p>\n</section>"
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
      "ARP",
      "IPv4",
      "IPv6",
      "802.1Q",
      "STP"
    ],
    "dependsOn": [
      "Ethernet",
      "Modelo OSI",
      "Binário e hexadecimal",
      "Camada 2"
    ],
    "enables": [
      "Switching",
      "Tabela MAC",
      "ARP",
      "VLAN",
      "Port Security",
      "Análise de captura"
    ]
  },
  "protocolFields": [
    {
      "field": "Preamble/SFD",
      "size": "8 bytes no nível físico",
      "purpose": "Ajudar sincronização e indicar início do frame.",
      "securityObservation": "Normalmente não aparece em capturas comuns; problemas físicos são vistos por contadores de interface."
    },
    {
      "field": "Destination MAC",
      "size": "48 bits",
      "purpose": "Indicar o destinatário local do frame.",
      "securityObservation": "Pode ser unicast, multicast ou broadcast; deve ser interpretado com VLAN e contexto."
    },
    {
      "field": "Source MAC",
      "size": "48 bits",
      "purpose": "Indicar a interface que enviou o frame localmente.",
      "securityObservation": "Pode ser falsificado ou virtual; não é identidade forte isoladamente."
    },
    {
      "field": "EtherType",
      "size": "16 bits",
      "purpose": "Identificar o protocolo carregado no payload, como IPv4, IPv6 ou ARP.",
      "securityObservation": "Útil para filtros defensivos e triagem de captura."
    },
    {
      "field": "Payload",
      "size": "46 a 1500 bytes em Ethernet comum sem jumbo frames",
      "purpose": "Carregar dados de camadas superiores.",
      "securityObservation": "Pode conter dados sensíveis se protocolos superiores não criptografarem."
    },
    {
      "field": "FCS",
      "size": "32 bits",
      "purpose": "Detectar erro no frame.",
      "securityObservation": "Erros de CRC/FCS em switch podem indicar cabo, porta, transceptor ou interferência."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Determina o próximo salto local.",
      "detail": "Se o destino IP está fora da sub-rede, o próximo MAC será o do gateway.",
      "possibleFailure": "Gateway errado, ARP ausente ou máscara incorreta."
    },
    {
      "step": 2,
      "actor": "Host",
      "action": "Resolve ou consulta o MAC necessário.",
      "detail": "Para IPv4, usa cache ARP ou envia ARP Request em broadcast.",
      "possibleFailure": "Cache obsoleto, resposta inconsistente ou bloqueio de L2."
    },
    {
      "step": 3,
      "actor": "NIC",
      "action": "Monta o frame Ethernet.",
      "detail": "Preenche MAC destino, MAC origem, EtherType e payload.",
      "possibleFailure": "Interface down, driver, VLAN incorreta ou cabo ruim."
    },
    {
      "step": 4,
      "actor": "Switch",
      "action": "Aprende origem e encaminha destino.",
      "detail": "Atualiza tabela MAC com a porta de origem e procura a porta do MAC destino.",
      "possibleFailure": "Flooding, tabela instável, loop ou porta em VLAN errada."
    },
    {
      "step": 5,
      "actor": "Destino local",
      "action": "Recebe e desencapsula.",
      "detail": "Valida o frame e entrega payload ao protocolo indicado.",
      "possibleFailure": "Frame descartado, FCS inválido ou destino não está no domínio correto."
    }
  ],
  "deepDive": {
    "mentalModel": "O frame Ethernet é um envelope local. O MAC é o endereço de sala dentro da LAN. O IP é o endereço lógico que pode atravessar redes; o MAC normalmente muda a cada enlace roteado.",
    "keyTerms": [
      "frame Ethernet",
      "MAC",
      "OUI",
      "EtherType",
      "payload",
      "FCS",
      "broadcast",
      "unicast",
      "multicast"
    ],
    "limitations": [
      "MAC tem escopo local e não identifica usuário globalmente.",
      "MAC pode ser alterado, clonado ou virtualizado.",
      "Frame Ethernet não roteia entre redes.",
      "FCS detecta erro, mas não corrige a causa física.",
      "Capturas em host nem sempre mostram todos os campos físicos."
    ],
    "whenToUse": [
      "Analisar tráfego de LAN.",
      "Investigar switch, ARP, VLAN e gateway local.",
      "Correlacionar inventário físico e lógico.",
      "Entender Wireshark, tabela MAC e segurança de Camada 2."
    ],
    "whenNotToUse": [
      "Para provar identidade de usuário sem outros controles.",
      "Para diagnosticar sozinho erros de aplicação ou IAM.",
      "Para substituir logs de DHCP, NAC, firewall ou EDR.",
      "Para inferir caminho completo na internet."
    ],
    "operationalImpact": [
      "Exige documentação de MACs críticos, portas, VLANs e uplinks.",
      "MACs virtuais e docking stations podem confundir inventário.",
      "Ambientes grandes precisam de switches gerenciáveis e logs.",
      "Troubleshooting exige correlação entre host, switch, DHCP, ARP e gateway."
    ],
    "financialImpact": [
      "Switches gerenciáveis, NAC, ferramentas de inventário e certificação têm custo.",
      "Troubleshooting sem evidência aumenta horas de suporte.",
      "Monitoramento de L2 reduz tempo de indisponibilidade, mas exige operação madura.",
      "Redundância e segmentação aumentam custo inicial, mas reduzem risco."
    ],
    "securityImpact": [
      "MAC ajuda em investigação, mas não é identidade forte.",
      "Rede plana amplia impacto de broadcast e movimentação lateral.",
      "Portas físicas sem controle podem expor a LAN.",
      "Capturas podem conter dados sensíveis e devem ser sanitizadas."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que MAC identifica permanentemente uma pessoa.",
      "whyItHappens": "O MAC parece único e aparece em inventários.",
      "consequence": "Investigações e políticas ficam frágeis.",
      "correction": "Trate MAC como evidência de interface e correlacione com identidade, porta, VLAN e logs."
    },
    {
      "mistake": "Confundir MAC com IP.",
      "whyItHappens": "Ambos aparecem em configurações de rede.",
      "consequence": "O diagnóstico pula a diferença entre entrega local e roteamento.",
      "correction": "MAC entrega frames na LAN; IP endereça logicamente entre redes."
    },
    {
      "mistake": "Achar que o MAC do servidor final aparece no frame em toda a internet.",
      "whyItHappens": "O aluno imagina que origem e destino permanecem iguais em todas as camadas.",
      "consequence": "Interpretação errada de capturas e traceroute.",
      "correction": "MACs mudam por enlace; IP de origem/destino permanece no pacote entre redes."
    },
    {
      "mistake": "Tratar broadcast como sempre malicioso.",
      "whyItHappens": "Broadcast chama atenção em capturas.",
      "consequence": "Alertas falsos e confusão operacional.",
      "correction": "ARP usa broadcast legitimamente; avalie volume, contexto e padrão."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host não aparece na tabela MAC do switch.",
      "Gateway não aparece em arp -a.",
      "Tráfego chega por flooding ou VLAN errada.",
      "MAC aparece em porta inesperada.",
      "CRC/FCS errors em interface gerenciável."
    ],
    "diagnosticQuestions": [
      "A interface tem link físico?",
      "Qual é o MAC local do host?",
      "O gateway aparece na tabela ARP?",
      "O switch aprendeu o MAC em qual porta e VLAN?",
      "Há mudança recente de cabo, docking station, VM ou VLAN?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "getmac /v\nipconfig /all\narp -a",
        "purpose": "Ver MAC local, IP, gateway, DNS e cache ARP.",
        "expectedObservation": "Interface ativa com endereço físico e gateway associado a um MAC.",
        "interpretation": "Ajuda a correlacionar host, IP, MAC e próximo salto local."
      },
      {
        "platform": "Linux",
        "command": "ip link\nip addr\nip neigh\nip route",
        "purpose": "Ver interfaces, MAC, endereços IP, vizinhos e rota default.",
        "expectedObservation": "Interface UP, MAC local e vizinho do gateway em REACHABLE/STALE.",
        "interpretation": "Se não há vizinho para o gateway, investigue Camada 2, ARP, VLAN ou gateway."
      },
      {
        "platform": "Cisco IOS",
        "command": "show mac address-table\nshow interfaces status\nshow interfaces counters errors\nshow arp",
        "purpose": "Correlacionar MACs, portas, VLANs, status de link, erros e ARP.",
        "expectedObservation": "MAC do host aprendido na porta e VLAN corretas, sem erros excessivos.",
        "interpretation": "Porta errada, VLAN errada ou erros físicos apontam para causa operacional."
      }
    ],
    "decisionTree": [
      {
        "if": "Interface sem link",
        "then": "Investigar cabo, porta, NIC, PoE, patch panel e switch antes de IP."
      },
      {
        "if": "Host tem IP, mas gateway não aparece no ARP",
        "then": "Verificar VLAN, máscara, gateway, ARP bloqueado ou gateway indisponível."
      },
      {
        "if": "MAC aparece em porta diferente da documentação",
        "then": "Validar mudança física, docking, VM, switch intermediário ou risco de spoofing."
      },
      {
        "if": "Há muitos broadcasts",
        "then": "Medir volume, identificar origem e avaliar ARP, loop, falha ou desenho de VLAN."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Correlacionar MAC com porta, VLAN, NAC, DHCP, firewall e inventário.",
      "Desativar portas não usadas.",
      "Usar 802.1X/NAC quando possível.",
      "Monitorar mudanças incomuns de MAC por porta.",
      "Sanitizar capturas antes de compartilhar."
    ],
    "badPractices": [
      "Usar MAC allowlist como único controle de segurança.",
      "Deixar tomadas públicas ativas sem controle.",
      "Investigar incidente apenas por IP sem olhar Camada 2.",
      "Compartilhar PCAPs completos sem remoção de dados sensíveis."
    ],
    "commonErrors": [
      "Confundir evidência técnica com prova de identidade.",
      "Ignorar MACs virtuais de VMs e containers.",
      "Não documentar VLAN e porta física.",
      "Achar que switches não precisam de monitoramento."
    ],
    "vulnerabilities": [
      {
        "name": "MAC spoofing",
        "description": "Alteração do MAC apresentado por uma interface.",
        "defensiveExplanation": "Pode confundir inventário e controles fracos baseados apenas em MAC.",
        "mitigation": "802.1X, NAC, port security, correlação de logs e inventário confiável."
      },
      {
        "name": "MAC flooding",
        "description": "Excesso de MACs aprendidos pode afetar tabela MAC do switch.",
        "defensiveExplanation": "O risco defensivo é degradação e flooding em segmentos mal protegidos.",
        "mitigation": "Limite de MAC por porta, monitoramento, switches gerenciáveis e segmentação."
      },
      {
        "name": "Exposição de captura",
        "description": "PCAPs podem conter MACs, IPs, nomes internos e payloads.",
        "defensiveExplanation": "Evidências são úteis, mas podem revelar topologia e dados sensíveis.",
        "mitigation": "Sanitizar, reduzir escopo, proteger armazenamento e controlar acesso."
      }
    ],
    "monitoring": [
      "Mudança de MAC por porta.",
      "Quantidade anormal de MACs em uma mesma porta.",
      "Broadcast acima do padrão histórico.",
      "Erros CRC/FCS em interfaces críticas.",
      "Alertas NAC e autenticação 802.1X."
    ],
    "hardening": [
      "Port security em portas de acesso.",
      "802.1X/NAC.",
      "VLANs por função.",
      "Desativação de portas ociosas.",
      "Controle físico de racks e tomadas."
    ],
    "detectionIdeas": [
      "Comparar tabela MAC com inventário.",
      "Alertar MAC desconhecido em VLAN sensível.",
      "Correlacionar DHCP lease, switchport e EDR.",
      "Revisar PCAPs defensivos com filtros de escopo mínimo."
    ]
  },
  "lab": {
    "id": "lab-3.2",
    "title": "Observando MAC, ARP e evidências do frame Ethernet",
    "labType": "local",
    "objective": "Coletar evidências locais de Camada 2 e entender como MAC, ARP e gateway se relacionam em uma LAN.",
    "scenario": "Você está em um notebook conectado a uma rede comum e precisa documentar, de forma defensiva, qual é o MAC local, qual é o gateway, qual MAC está associado ao gateway e quais evidências seriam úteis para uma equipe de redes.",
    "topology": "Host do aluno -> switch/AP doméstico ou corporativo -> gateway local -> demais redes",
    "architecture": "Um host com interface Ethernet ou Wi-Fi usando IPv4, gateway padrão e resolução ARP/neighbor local. O foco conceitual é Ethernet/Camada 2, mesmo que o aluno esteja em Wi-Fi; quando estiver em Wi-Fi, observar que o meio muda, mas a ideia de endereço de enlace permanece.",
    "prerequisites": [
      "Ter concluído as aulas 3.1, 2.4 e 1.9.",
      "Ter acesso ao terminal local.",
      "Não executar alterações de MAC nem testes ofensivos."
    ],
    "tools": [
      "Windows PowerShell ou Prompt",
      "Terminal Linux",
      "Opcional: Wireshark",
      "Opcional: equipamento Cisco em laboratório autorizado"
    ],
    "estimatedTimeMinutes": 55,
    "cost": "zero",
    "safetyNotes": [
      "Não altere o MAC da interface.",
      "Não execute varreduras em redes de terceiros.",
      "Não compartilhe MACs, IPs públicos, nomes internos ou capturas sem sanitização.",
      "Em ambiente corporativo, colete apenas evidências autorizadas."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar o MAC local no Windows",
        "instruction": "No Windows, liste as interfaces e o endereço físico.",
        "command": "getmac /v\nipconfig /all",
        "expectedOutput": "Nome da interface, Physical Address/Endereço Físico, IPv4, máscara, gateway e DNS.",
        "explanation": "O MAC local é a identidade de enlace apresentada pela interface naquela rede."
      },
      {
        "number": 2,
        "title": "Identificar o MAC local no Linux",
        "instruction": "No Linux, liste interfaces e endereços de enlace.",
        "command": "ip link\nip addr",
        "expectedOutput": "Interfaces com link/ether, estado UP/DOWN e endereços IP.",
        "explanation": "O campo link/ether mostra o MAC usado pela interface."
      },
      {
        "number": 3,
        "title": "Descobrir o gateway padrão",
        "instruction": "Identifique a rota default para saber o próximo salto local.",
        "command": "route print   # Windows\nip route      # Linux",
        "expectedOutput": "Rota default apontando para o gateway local.",
        "explanation": "Quando o destino está fora da rede local, o frame normalmente vai para o MAC do gateway."
      },
      {
        "number": 4,
        "title": "Observar a associação IP-MAC do gateway",
        "instruction": "Liste o cache ARP/neighbor e procure o IP do gateway.",
        "command": "arp -a       # Windows\nip neigh    # Linux",
        "expectedOutput": "IP do gateway associado a um endereço físico/MAC.",
        "explanation": "Essa associação mostra qual MAC local receberá frames destinados ao próximo salto."
      },
      {
        "number": 5,
        "title": "Gerar tráfego legítimo mínimo",
        "instruction": "Faça um ping simples para o gateway ou para um destino autorizado para atualizar a tabela local.",
        "command": "ping <IP_DO_GATEWAY>",
        "expectedOutput": "Respostas do gateway ou tentativa registrada; tabela ARP atualizada.",
        "explanation": "O objetivo é observar evidência local, não testar terceiros."
      },
      {
        "number": 6,
        "title": "Em laboratório Cisco autorizado",
        "instruction": "Se você tiver um switch Cisco de laboratório, correlacione MAC e porta.",
        "command": "show mac address-table\nshow interfaces status\nshow arp",
        "expectedOutput": "MACs aprendidos por VLAN/porta e status das interfaces.",
        "explanation": "Essa é a visão do switch, essencial para correlacionar host físico com porta e VLAN."
      },
      {
        "number": 7,
        "title": "Sanitizar evidências",
        "instruction": "Monte uma tabela removendo octetos finais de MACs e IPs, mantendo apenas o suficiente para estudo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Relatório com MACs parcialmente mascarados, IPs internos reduzidos e sem nomes sensíveis.",
        "explanation": "Evidência técnica precisa ser útil sem expor dados desnecessários."
      }
    ],
    "expectedResult": "O aluno deve conseguir explicar qual é o MAC local, qual é o gateway, qual MAC representa o próximo salto e por que esse MAC não é necessariamente o servidor final acessado.",
    "validation": [
      {
        "check": "MAC local identificado",
        "command": "getmac /v ou ip link",
        "expected": "Interface ativa com endereço físico/link/ether.",
        "ifFails": "Verifique se a interface correta está ativa ou se você está olhando adaptador virtual errado."
      },
      {
        "check": "Gateway identificado",
        "command": "route print ou ip route",
        "expected": "Rota default com gateway local.",
        "ifFails": "Verifique se há conectividade, DHCP ou configuração manual."
      },
      {
        "check": "Gateway aparece em ARP/neighbor",
        "command": "arp -a ou ip neigh",
        "expected": "IP do gateway associado a MAC.",
        "ifFails": "Faça ping para o gateway; se persistir, investigue VLAN, gateway ou bloqueio local."
      },
      {
        "check": "Relatório sanitizado",
        "command": "Revisão manual",
        "expected": "Sem MAC completo, IP público, nomes internos ou tokens.",
        "ifFails": "Remova dados sensíveis antes de compartilhar."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Nenhum MAC aparece para o gateway",
        "probableCause": "Gateway não foi acessado recentemente, ARP não foi populado ou há problema de Camada 2/3.",
        "howToConfirm": "Pingue o gateway e verifique ip neigh/arp -a.",
        "fix": "Validar IP, máscara, gateway, VLAN, link e política local."
      },
      {
        "symptom": "Vários adaptadores aparecem",
        "probableCause": "VPN, WSL, Docker, virtualização ou Wi-Fi/Ethernet simultâneos.",
        "howToConfirm": "Compare rota default e interface usada.",
        "fix": "Documentar apenas a interface do caminho real."
      },
      {
        "symptom": "MAC muda entre testes",
        "probableCause": "Randomização de MAC, adaptador diferente, VM, docking station ou política de privacidade.",
        "howToConfirm": "Verifique configurações da interface e inventário.",
        "fix": "Registrar contexto e correlacionar com porta/VLAN quando possível."
      },
      {
        "symptom": "Comando Cisco não mostra o MAC esperado",
        "probableCause": "Porta errada, VLAN errada, MAC expirado, switch intermediário ou falta de tráfego.",
        "howToConfirm": "Gerar tráfego autorizado e verificar VLAN/porta.",
        "fix": "Validar caminho físico, documentação e domínio de broadcast."
      }
    ],
    "improvements": [
      "Repetir o laboratório em Ethernet cabeada e Wi-Fi e comparar evidências.",
      "Capturar ARP no Wireshark em laboratório próprio.",
      "Criar uma tabela com MAC, IP, gateway, interface, VLAN e evidência usada.",
      "Comparar MAC físico, MAC virtual de VM e MAC de container bridge."
    ],
    "evidenceToCollect": [
      "MAC local parcialmente mascarado.",
      "IP e gateway parcialmente mascarados.",
      "Saída de arp -a ou ip neigh sanitizada.",
      "Descrição da interface usada.",
      "Hipótese sobre o próximo salto local."
    ],
    "questions": [
      "Por que o MAC do gateway aparece quando acesso um site externo?",
      "Por que MAC não prova identidade de usuário?",
      "O que muda quando estou em Wi-Fi?",
      "Por que um switch precisa aprender MACs por porta?"
    ],
    "challenge": "Explique como investigaria, de forma defensiva, um MAC desconhecido aparecendo em uma VLAN administrativa.",
    "solution": "A investigação deve coletar porta e VLAN no switch, correlacionar DHCP, NAC, inventário, autenticação, horário, EDR e logs de firewall. Não se deve concluir identidade apenas pelo MAC. Ações seguras incluem isolar conforme política, preservar evidências, acionar responsáveis e documentar lacunas."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que o frame Ethernet precisa de MAC de origem e MAC de destino se o pacote IP já tem IP de origem e destino?",
      "hints": [
        "Pense no escopo local da LAN.",
        "Pense no papel do switch."
      ],
      "expectedIdeas": [
        "entrega local",
        "switch",
        "tabela MAC",
        "encapsulamento"
      ],
      "explanation": "IP resolve endereçamento lógico entre redes; MAC resolve entrega local no enlace atual."
    },
    {
      "type": "diagnóstico",
      "question": "Um host tem IP correto, mas o gateway não aparece em ARP. O que você investigaria antes de culpar DNS?",
      "hints": [
        "Pense em Camada 1, 2 e 3.",
        "Pense em VLAN e gateway."
      ],
      "expectedIdeas": [
        "link",
        "VLAN",
        "máscara",
        "gateway",
        "ARP",
        "porta de switch"
      ],
      "explanation": "Sem alcançar o gateway local, DNS ainda nem é a primeira hipótese."
    },
    {
      "type": "cenário real",
      "question": "Um MAC desconhecido apareceu em uma porta de rede de sala pública. Qual seria uma resposta defensiva madura?",
      "hints": [
        "Não conclua identidade apenas pelo MAC.",
        "Correlacione evidências."
      ],
      "expectedIdeas": [
        "porta",
        "VLAN",
        "NAC",
        "DHCP",
        "inventário",
        "logs",
        "isolamento autorizado"
      ],
      "explanation": "MAC é evidência, não prova isolada. A resposta madura combina contenção proporcional e correlação."
    }
  ],
  "quiz": [
    {
      "id": "q3.2.1",
      "type": "conceito",
      "q": "O que um frame Ethernet representa?",
      "opts": [
        "Uma unidade de entrega local de Camada 2",
        "Uma rota entre redes diferentes",
        "Um registro DNS",
        "Uma sessão HTTP autenticada"
      ],
      "a": 0,
      "exp": "Frame Ethernet é a PDU de Camada 2 usada para entrega local na LAN.",
      "difficulty": "iniciante",
      "topic": "frame"
    },
    {
      "id": "q3.2.2",
      "type": "comparação",
      "q": "Qual afirmação diferencia corretamente MAC e IP?",
      "opts": [
        "MAC é usado na entrega local de enlace; IP é usado no endereçamento lógico entre redes",
        "MAC substitui IP quando há roteador",
        "IP só existe dentro do switch",
        "MAC é sempre identidade forte de usuário"
      ],
      "a": 0,
      "exp": "MAC tem escopo de enlace local; IP endereça logicamente hosts e redes.",
      "difficulty": "iniciante",
      "topic": "mac-ip"
    },
    {
      "id": "q3.2.3",
      "type": "diagnóstico",
      "q": "Ao acessar um site externo, qual MAC normalmente aparece como destino no frame saindo do seu host?",
      "opts": [
        "O MAC do gateway local",
        "O MAC do servidor final na internet",
        "O MAC do DNS raiz",
        "Nenhum MAC é usado"
      ],
      "a": 0,
      "exp": "Para destino fora da sub-rede, o host envia o frame ao gateway local.",
      "difficulty": "intermediário",
      "topic": "gateway"
    },
    {
      "id": "q3.2.4",
      "type": "segurança",
      "q": "Por que MAC não deve ser usado sozinho como controle forte de segurança?",
      "opts": [
        "Porque pode ser alterado ou virtualizado e precisa de correlação",
        "Porque nunca aparece em redes Ethernet",
        "Porque é sempre criptografado",
        "Porque só existe em HTTP"
      ],
      "a": 0,
      "exp": "MAC pode ser spoofado ou virtual; use NAC, 802.1X e correlação de logs.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q3.2.5",
      "type": "campo técnico",
      "q": "Qual campo indica se o payload do frame carrega IPv4, IPv6 ou ARP?",
      "opts": [
        "EtherType",
        "TTL",
        "Porta de destino",
        "HTTP status code"
      ],
      "a": 0,
      "exp": "EtherType identifica o protocolo encapsulado no payload Ethernet.",
      "difficulty": "iniciante",
      "topic": "ethertype"
    },
    {
      "id": "q3.2.6",
      "type": "troubleshooting",
      "q": "Se a tabela MAC do switch não mostra o MAC do host em uma porta, qual hipótese inicial é razoável?",
      "opts": [
        "Sem link/tráfego, porta errada, VLAN errada ou documentação incorreta",
        "Certificado TLS expirado com certeza",
        "Senha do usuário incorreta",
        "Erro de CORS"
      ],
      "a": 0,
      "exp": "A ausência de MAC é evidência de Camada 2/física/operacional, não de aplicação.",
      "difficulty": "intermediário",
      "topic": "switch"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.2.1",
      "front": "O que é um frame Ethernet?",
      "back": "É a unidade de dados de Camada 2 usada pela Ethernet para entrega local.",
      "tags": [
        "ethernet",
        "frame"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.2.2",
      "front": "O que é um endereço MAC?",
      "back": "É um identificador de 48 bits associado a uma interface de rede para entrega local de enlace.",
      "tags": [
        "mac",
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.2.3",
      "front": "O MAC atravessa a internet inteira?",
      "back": "Não. MAC tem escopo local ao enlace; a cada salto roteado os MACs locais podem mudar.",
      "tags": [
        "mac",
        "roteamento"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.2.4",
      "front": "Para que serve o EtherType?",
      "back": "Para indicar qual protocolo está encapsulado no payload do frame, como IPv4, IPv6 ou ARP.",
      "tags": [
        "ethertype",
        "frame"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.2.5",
      "front": "MAC é identidade forte?",
      "back": "Não. É evidência de interface e deve ser correlacionado com porta, VLAN, NAC, inventário e logs.",
      "tags": [
        "segurança",
        "mac"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.2.6",
      "front": "O que significa ff:ff:ff:ff:ff:ff?",
      "back": "É o endereço de broadcast Ethernet, usado para alcançar todos no domínio de broadcast.",
      "tags": [
        "broadcast",
        "ethernet"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex3.2.1",
      "type": "conceitual",
      "prompt": "Explique em suas palavras por que um frame Ethernet precisa de MAC de destino.",
      "expectedAnswer": "Porque o switch precisa saber para qual porta encaminhar o frame dentro da LAN.",
      "explanation": "Sem MAC de destino, não há entrega local direcionada em Camada 2."
    },
    {
      "id": "ex3.2.2",
      "type": "comparação",
      "prompt": "Compare MAC e IP em escopo, função e risco de interpretação.",
      "expectedAnswer": "MAC é local ao enlace e usado por switches; IP é lógico e roteável. MAC não prova identidade forte, IP também precisa de contexto.",
      "explanation": "A comparação evita confundir entrega local com roteamento."
    },
    {
      "id": "ex3.2.3",
      "type": "diagnóstico",
      "prompt": "Você acessa um servidor externo. Por que o MAC de destino no frame local tende a ser o gateway?",
      "expectedAnswer": "Porque o servidor está fora da sub-rede local; o próximo salto local é o gateway.",
      "explanation": "O pacote IP vai para o servidor, mas o frame local vai para o gateway."
    },
    {
      "id": "ex3.2.4",
      "type": "segurança",
      "prompt": "Liste três evidências que você correlacionaria antes de agir sobre um MAC desconhecido.",
      "expectedAnswer": "Porta/VLAN no switch, DHCP lease, NAC/802.1X, inventário, firewall, EDR e horário do evento.",
      "explanation": "MAC isolado não é suficiente para conclusão defensiva madura."
    }
  ],
  "challenge": {
    "title": "MAC desconhecido em VLAN sensível",
    "scenario": "Durante uma revisão de logs, a equipe percebe um MAC desconhecido aparecendo em uma VLAN administrativa. O endereço apareceu por poucos minutos e depois sumiu.",
    "tasks": [
      "Montar hipóteses defensivas.",
      "Listar evidências necessárias.",
      "Indicar comandos ou fontes de dados.",
      "Propor ações proporcionais.",
      "Explicar por que não se deve concluir identidade apenas pelo MAC."
    ],
    "constraints": [
      "Não executar ataque nem alteração de MAC.",
      "Não bloquear produção sem critério.",
      "Sanitizar relatório.",
      "Separar fato, hipótese e recomendação."
    ],
    "expectedDeliverables": [
      "Matriz de investigação.",
      "Lista de evidências.",
      "Plano de contenção proporcional.",
      "Resumo executivo sanitizado."
    ],
    "gradingRubric": [
      {
        "criterion": "Correlação de evidências",
        "points": 30,
        "description": "Usa switchport, VLAN, DHCP, NAC, inventário e logs."
      },
      {
        "criterion": "Raciocínio por camadas",
        "points": 25,
        "description": "Separa Camada 2, IP, identidade e aplicação."
      },
      {
        "criterion": "Segurança defensiva",
        "points": 25,
        "description": "Propõe mitigação e monitoramento sem instrução ofensiva."
      },
      {
        "criterion": "Comunicação técnica",
        "points": 20,
        "description": "Relatório claro, sanitizado e proporcional."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A primeira etapa é tratar o MAC como evidência de interface, não como identidade. Depois, correlacionar onde apareceu, em qual VLAN, em qual horário, com qual IP/DHCP, se houve autenticação NAC e se há ativo correspondente no inventário.",
    "steps": [
      "Consultar tabela MAC histórica ou logs do switch.",
      "Identificar porta, VLAN e horário.",
      "Correlacionar DHCP lease e ARP.",
      "Consultar NAC/802.1X, se existir.",
      "Verificar inventário, EDR e dono do ponto físico.",
      "Avaliar contenção: desabilitar porta, mover para VLAN de quarentena ou monitorar conforme criticidade.",
      "Registrar lacunas e melhorar controles."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Bloquear todo tráfego da rede imediatamente.",
        "whyItIsWrong": "Pode causar indisponibilidade sem evidência proporcional."
      },
      {
        "answer": "Concluir que o usuário X é culpado porque o MAC apareceu no inventário antigo.",
        "whyItIsWrong": "MAC pode mudar, ser clonado ou estar associado a docking/VM; precisa de correlação."
      },
      {
        "answer": "Ignorar porque MAC não é identidade forte.",
        "whyItIsWrong": "Embora não prove identidade, é evidência útil e pode indicar risco real."
      }
    ],
    "finalAnswer": "Uma resposta madura coleta evidências de switch, VLAN, DHCP, NAC, inventário e logs; classifica hipóteses; aplica contenção proporcional; documenta limitações; e recomenda controles como 802.1X, port security, inventário atualizado e alertas de MAC desconhecido em VLAN sensível."
  },
  "glossary": [
    {
      "term": "Frame Ethernet",
      "shortDefinition": "Unidade de dados de Camada 2 usada pela Ethernet.",
      "longDefinition": "Estrutura que contém MAC de destino, MAC de origem, tipo de payload, dados e verificação de erro para entrega local.",
      "example": "Um pacote IPv4 pode ser transportado dentro de um frame Ethernet até o gateway.",
      "relatedTerms": [
        "MAC",
        "EtherType",
        "FCS"
      ],
      "relatedLessons": [
        "2.2",
        "2.4",
        "3.1",
        "3.3"
      ]
    },
    {
      "term": "Endereço MAC",
      "shortDefinition": "Identificador de 48 bits usado por interfaces em redes Ethernet.",
      "longDefinition": "Endereço de Camada 2 usado na entrega local de frames dentro de um domínio de enlace.",
      "example": "3c:52:82:aa:10:22 é uma representação comum de MAC.",
      "relatedTerms": [
        "OUI",
        "NIC",
        "switch"
      ],
      "relatedLessons": [
        "3.2",
        "3.3"
      ]
    },
    {
      "term": "EtherType",
      "shortDefinition": "Campo que identifica o protocolo carregado no payload do frame.",
      "longDefinition": "Campo de 16 bits usado em Ethernet II para indicar protocolos como IPv4, IPv6 ou ARP.",
      "example": "0x0800 indica IPv4; 0x0806 indica ARP.",
      "relatedTerms": [
        "IPv4",
        "ARP",
        "payload"
      ],
      "relatedLessons": [
        "3.2",
        "3.5"
      ]
    },
    {
      "term": "FCS",
      "shortDefinition": "Campo de verificação de erro do frame Ethernet.",
      "longDefinition": "Frame Check Sequence ajuda a detectar corrupção no frame durante transmissão.",
      "example": "Erros CRC/FCS em interfaces podem indicar cabo ou porta com problema.",
      "relatedTerms": [
        "CRC",
        "camada física",
        "troubleshooting"
      ],
      "relatedLessons": [
        "2.3",
        "3.2"
      ]
    },
    {
      "term": "Broadcast Ethernet",
      "shortDefinition": "Frame enviado para todos no domínio de broadcast.",
      "longDefinition": "Usa o endereço ff:ff:ff:ff:ff:ff como destino para alcançar todos os hosts do domínio local.",
      "example": "ARP Request usa broadcast para perguntar quem possui determinado IP.",
      "relatedTerms": [
        "ARP",
        "domínio de broadcast"
      ],
      "relatedLessons": [
        "3.4",
        "3.5"
      ]
    },
    {
      "term": "OUI",
      "shortDefinition": "Parte do MAC associada ao fabricante ou organização.",
      "longDefinition": "Organizationally Unique Identifier é o prefixo que pode indicar o fabricante original do endereço MAC.",
      "example": "O OUI pode sugerir fabricante, mas não prova posse nem identidade do dispositivo.",
      "relatedTerms": [
        "MAC",
        "inventário"
      ],
      "relatedLessons": [
        "3.2",
        "3.9"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_3-2022.html",
      "note": "Referência normativa principal para Ethernet."
    },
    {
      "type": "internal-course",
      "title": "Modelo OSI — Camada 2",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m02/lesson-02-04",
      "note": "Revisar Camada 2 antes de avançar em switches e ARP."
    },
    {
      "type": "internal-course",
      "title": "Bits, bytes, binário e hexadecimal",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m00/lesson-00-02",
      "note": "Base para interpretar MAC e EtherType em hexadecimal."
    },
    {
      "type": "official-doc",
      "title": "Wireshark User's Guide",
      "organization": "Wireshark Foundation",
      "url": "https://www.wireshark.org/docs/",
      "note": "Útil para análise defensiva de frames e protocolos."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "redes de laboratório e automação",
      "lesson": "a definir",
      "reason": "Runners, bridges, VMs e redes locais dependem de interfaces e enlaces corretamente configurados."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "controles de acesso de rede",
      "lesson": "a definir",
      "reason": "NAC, 802.1X e identidade de dispositivo complementam evidências de MAC."
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
      "3.3"
    ]
  }
};
