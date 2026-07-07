export const lesson0307 = {
  "id": "3.7",
  "moduleId": "m03",
  "order": 7,
  "title": "VLANs como segmentação de camada 2",
  "subtitle": "Como separar domínios de broadcast, organizar a LAN e preparar políticas sem confundir VLAN com firewall.",
  "duration": "90-125 min",
  "estimatedStudyTimeMinutes": 125,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 215,
  "tags": [
    "redes",
    "ethernet",
    "vlan",
    "802.1q",
    "camada 2",
    "segmentação",
    "trunk",
    "access port",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.4",
      "reason": "É necessário entender domínios de broadcast e por que switches não eliminam broadcast dentro da mesma VLAN."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "ARP e broadcast ajudam a entender por que VLANs limitam alcance de descoberta local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.4",
      "reason": "A aula depende de Camada 2, frames, MAC e switches."
    }
  ],
  "objectives": [
    "Explicar por que VLANs existem e qual problema resolvem.",
    "Diferenciar VLAN, sub-rede, firewall, rota e domínio de broadcast.",
    "Entender portas access, portas trunk, tagging 802.1Q e native VLAN em nível conceitual.",
    "Planejar uma segmentação simples por função e risco.",
    "Aplicar troubleshooting e segurança defensiva em ambientes com VLANs."
  ],
  "learningOutcomes": [
    "Dado um desenho de LAN, o aluno identifica domínios de broadcast e sugere VLANs coerentes.",
    "Dado um sintoma de host na VLAN errada, o aluno propõe evidências e comandos para validar.",
    "Dado um trunk, o aluno explica por que as VLANs permitidas devem ser documentadas e restritas.",
    "Dado um cenário de segurança, o aluno diferencia segmentação L2 de política inter-VLAN.",
    "Dado um projeto pequeno, o aluno cria tabela de VLANs, portas, gateways e regras esperadas."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Imagine uma empresa pequena onde computadores administrativos, notebooks de visitantes, câmeras IP, impressoras, servidores e equipamentos de laboratório estão todos na mesma LAN. Tudo “funciona”, até o dia em que um notebook infectado começa a fazer broadcast, uma câmera antiga tenta falar com servidores internos, um visitante descobre impressoras corporativas e o time de segurança percebe que não existe limite claro entre grupos de risco diferentes.</p>\n<p>VLANs existem para resolver uma parte essencial desse problema: separar logicamente uma rede local em domínios de Camada 2 diferentes, mesmo quando os dispositivos usam a mesma infraestrutura física de switches. Em vez de comprar um switch físico para cada grupo, a empresa cria redes lógicas dentro do switch.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> sem VLANs, ARP, broadcast e descoberta local podem atravessar toda a LAN. Com VLANs bem planejadas, usuários, servidores, convidados, voz, câmeras e gerenciamento ficam em domínios separados, e a comunicação entre eles passa por roteamento e política.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>Nas primeiras redes locais Ethernet, a separação era principalmente física: se você quisesse duas redes diferentes, usava cabos, hubs ou switches separados. Isso era simples de entender, mas caro, rígido e difícil de operar. Conforme empresas cresceram, surgiu a necessidade de segmentar por departamento, função, risco e localização sem duplicar toda a infraestrutura.</p>\n<p>As VLANs surgiram para permitir segmentação lógica em switches Ethernet. O padrão IEEE 802.1Q adicionou marcação de VLAN em frames que trafegam por links trunk, permitindo que múltiplas VLANs passem pelo mesmo cabo entre switches, roteadores, firewalls, hypervisors ou access points corporativos.</p>\n<p>Com o tempo, VLANs se tornaram base de redes corporativas, telefonia IP, Wi-Fi empresarial, datacenters, virtualização e laboratórios. Elas não são uma solução completa de segurança, mas são uma das peças fundamentais para limitar broadcast, organizar topologia lógica e preparar políticas de tráfego.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema que a VLAN resolve não é “bloquear tudo”. O problema principal é separar domínios de broadcast e organizar a LAN em grupos lógicos. Sem essa separação, qualquer broadcast de ARP, DHCP ou descoberta local alcança todos os hosts da mesma rede local.</p>\n<ul class=\"flow-list\"><li><strong>Escala:</strong> redes planas crescem mal porque todos compartilham o mesmo domínio de broadcast.</li><li><strong>Operação:</strong> fica difícil saber quais dispositivos pertencem a qual função.</li><li><strong>Segurança:</strong> visitantes, câmeras, usuários e servidores ficam próximos demais.</li><li><strong>Troubleshooting:</strong> uma falha local pode afetar muitos grupos ao mesmo tempo.</li><li><strong>Governança:</strong> políticas de firewall e logs ficam confusos quando tudo está misturado.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A segmentação de LAN evoluiu de separação física para separação lógica e, depois, para modelos ainda mais dinâmicos em datacenter, cloud e redes definidas por software.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funciona</th><th>Limitação</th><th>Uso moderno</th></tr></thead><tbody>\n<tr><td>Rede plana</td><td>Todos na mesma LAN/VLAN.</td><td>Broadcast amplo e baixo controle.</td><td>Apenas ambientes muito pequenos ou temporários.</td></tr>\n<tr><td>Separação física</td><td>Switches/cabos diferentes por grupo.</td><td>Custo e baixa flexibilidade.</td><td>Ambientes críticos ou isolamento físico real.</td></tr>\n<tr><td>VLAN</td><td>Separação lógica de Camada 2.</td><td>Exige roteamento/política para comunicação entre VLANs.</td><td>Padrão corporativo para LANs.</td></tr>\n<tr><td>VRF/SDN/overlay</td><td>Segmentação mais avançada em L3/overlay.</td><td>Maior complexidade operacional.</td><td>Datacenter, cloud, multi-tenant e segurança avançada.</td></tr>\n</tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>Uma VLAN, Virtual LAN, é uma rede local lógica criada dentro de switches Ethernet. Dispositivos na mesma VLAN compartilham o mesmo domínio de broadcast. Dispositivos em VLANs diferentes, mesmo conectados ao mesmo switch físico, ficam separados em Camada 2.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> VLAN é um identificador lógico usado para separar frames Ethernet em domínios de broadcast distintos dentro da mesma infraestrutura física.</div>\n<p>O ponto mais importante: VLAN separa Camada 2. Para um host de uma VLAN falar com outro host de outra VLAN, é necessário roteamento inter-VLAN em um roteador, switch camada 3 ou firewall. É nesse ponto que entram regras, logs e políticas.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Internamente, o switch associa portas, frames e tabelas MAC a uma VLAN. Em uma porta access, o dispositivo final normalmente não vê tag de VLAN; ele envia frames comuns. O switch classifica aquele tráfego na VLAN configurada para a porta. Em uma porta trunk, o frame carrega uma tag 802.1Q indicando a VLAN.</p>\n<ol class=\"flow-list\"><li>O host envia um frame Ethernet sem saber necessariamente que está em uma VLAN.</li><li>A porta access do switch coloca esse frame no domínio lógico daquela VLAN.</li><li>O switch aprende o MAC de origem dentro da VLAN correta.</li><li>Se o destino está na mesma VLAN e é conhecido, encaminha pela porta correta.</li><li>Se o destino é broadcast, envia apenas para portas da mesma VLAN.</li><li>Se o destino está em outra VLAN, o frame não atravessa sozinho; precisa de gateway/roteamento.</li></ol>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma arquitetura corporativa, VLANs costumam representar funções: usuários, servidores, voz, convidados, gerenciamento, impressoras, câmeras, IoT, laboratórios e DMZ interna. Cada VLAN normalmente possui uma sub-rede IP, um gateway, políticas de firewall, logs e dono operacional.</p>\n<ul><li><strong>Camada envolvida:</strong> Camada 2, com impacto direto em Camada 3.</li><li><strong>Componentes:</strong> switches, trunks, access ports, gateways, firewalls, DHCP, NAC e documentação.</li><li><strong>Dependências:</strong> Ethernet, MAC, ARP, broadcast, IP e roteamento.</li><li><strong>Pontos de falha:</strong> VLAN errada na porta, trunk mal permitido, native VLAN insegura, gateway ausente e DHCP incorreto.</li></ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em um prédio corporativo. Várias equipes usam o mesmo prédio, elevadores e infraestrutura elétrica, mas ficam em salas diferentes. A sala separa conversas, permissões e organização. Para alguém de uma sala acessar outra, normalmente precisa passar por uma porta, recepção ou regra.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> uma sala física bloqueia pessoas fisicamente. VLAN não é uma parede absoluta de segurança. Ela separa domínios de Camada 2, mas a comunicação entre VLANs depende de roteamento e política bem configurada.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Em casa, você pode ter uma rede principal e uma rede de convidados no Wi-Fi. Em muitos roteadores, essa separação é implementada com conceitos parecidos com VLAN: os convidados conseguem acessar a internet, mas não devem acessar seus notebooks, impressoras ou dispositivos internos.</p>\n<p>Em um laboratório pequeno com switch gerenciável ou Packet Tracer, você pode criar VLAN 10 para usuários e VLAN 20 para servidores. Dois computadores na VLAN 10 se comunicam localmente. Um computador da VLAN 10 não fala diretamente com um servidor na VLAN 20 sem gateway inter-VLAN.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, VLANs ajudam a separar áreas com necessidades diferentes. Usuários administrativos podem ficar na VLAN 10, servidores internos na VLAN 20, telefonia IP na VLAN 30, convidados na VLAN 40, câmeras na VLAN 50 e gerenciamento de rede na VLAN 99.</p>\n<p>Essa separação reduz broadcast, melhora organização e permite aplicar políticas: convidados não acessam servidores; câmeras só enviam para o gravador; usuários acessam sistemas específicos; gerenciamento só é permitido a partir de estações administrativas.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud pública, o aluno raramente manipula VLANs diretamente como em um switch físico, mas o raciocínio de segmentação continua. VPCs, VNets, subnets, route tables, security groups, NSGs e firewalls cumprem papéis de separação lógica, controle de caminho e política.</p>\n<p>Em ambientes híbridos, VLANs aparecem em datacenters, links para cloud, firewalls, hypervisors e appliances. Um erro de VLAN em um trunk físico pode parecer problema de cloud, VPN ou DNS, mas a causa pode estar na Camada 2 local.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, VLANs impactam runners self-hosted, clusters Kubernetes on-premises, registries privados, scanners, ambientes de build e redes de administração. Um pipeline pode falhar ao baixar imagem de container porque o runner está na VLAN errada ou porque o firewall inter-VLAN bloqueia o registry.</p>\n<p>Em IaC e automação, a lição é documentar segmentação como arquitetura: quem fala com quem, por qual porta, a partir de qual VLAN/sub-rede, com qual política, quais logs e qual justificativa.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Do ponto de vista defensivo, VLANs reduzem exposição lateral, mas não substituem firewall, IAM, autenticação forte, monitoramento ou hardening. Uma VLAN mal configurada pode gerar falsa sensação de segurança.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>VLAN plana demais</td><td>Usuários, servidores e IoT juntos.</td><td>Movimento lateral e broadcast amplo.</td><td>Segmentar por função e risco.</td></tr>\n<tr><td>Trunk indevido</td><td>Porta de usuário carregando múltiplas VLANs.</td><td>Exposição de redes internas.</td><td>Portas access por padrão e trunks documentados.</td></tr>\n<tr><td>Native VLAN insegura</td><td>Uso da VLAN padrão para tráfego sensível.</td><td>Risco operacional e confusão.</td><td>Native VLAN dedicada, sem hosts, e boas práticas de trunk.</td></tr>\n<tr><td>Sem política inter-VLAN</td><td>Gateway roteia tudo entre VLANs.</td><td>Segmentação pouco efetiva.</td><td>Firewall/ACL com menor privilégio e logs.</td></tr>\n</tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 1080 520\" role=\"img\" aria-labelledby=\"vlan-title vlan-desc\">\n  <title id=\"vlan-title\">VLANs como segmentação de Camada 2</title>\n  <desc id=\"vlan-desc\">Um switch separa portas em VLANs diferentes. Broadcasts, ARP e frames locais ficam limitados à VLAN; comunicação entre VLANs exige roteamento e política.</desc>\n  <defs>\n    <marker id=\"m03l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n  </defs>\n  <rect x=\"40\" y=\"72\" width=\"260\" height=\"320\" rx=\"18\" class=\"svg-zone\" />\n  <text x=\"170\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">VLAN 10 — Usuários</text>\n  <rect x=\"82\" y=\"145\" width=\"160\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--client\" />\n  <text x=\"162\" y=\"181\" text-anchor=\"middle\" class=\"svg-label\">PC Financeiro</text>\n  <rect x=\"82\" y=\"250\" width=\"160\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--client\" />\n  <text x=\"162\" y=\"286\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n  <rect x=\"410\" y=\"98\" width=\"250\" height=\"250\" rx=\"18\" class=\"svg-node svg-node--switch\" />\n  <text x=\"535\" y=\"135\" text-anchor=\"middle\" class=\"svg-label\">Switch L2</text>\n  <text x=\"535\" y=\"165\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Portas access: VLAN 10/20</text>\n  <text x=\"535\" y=\"195\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Trunk: VLANs permitidas</text>\n  <text x=\"535\" y=\"225\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela MAC por VLAN</text>\n  <text x=\"535\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Broadcast limitado por VLAN</text>\n  <rect x=\"780\" y=\"72\" width=\"260\" height=\"320\" rx=\"18\" class=\"svg-zone\" />\n  <text x=\"910\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">VLAN 20 — Servidores</text>\n  <rect x=\"825\" y=\"145\" width=\"170\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--server\" />\n  <text x=\"910\" y=\"181\" text-anchor=\"middle\" class=\"svg-label\">Servidor interno</text>\n  <rect x=\"825\" y=\"250\" width=\"170\" height=\"62\" rx=\"12\" class=\"svg-node svg-node--security\" />\n  <text x=\"910\" y=\"286\" text-anchor=\"middle\" class=\"svg-label\">SIEM/Logs</text>\n  <line x1=\"242\" y1=\"176\" x2=\"410\" y2=\"176\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l07-arrow)\" />\n  <line x1=\"242\" y1=\"281\" x2=\"410\" y2=\"281\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l07-arrow)\" />\n  <line x1=\"660\" y1=\"176\" x2=\"825\" y2=\"176\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l07-arrow)\" />\n  <line x1=\"660\" y1=\"281\" x2=\"825\" y2=\"281\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l07-arrow)\" />\n  <rect x=\"410\" y=\"410\" width=\"250\" height=\"76\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"535\" y=\"440\" text-anchor=\"middle\" class=\"svg-label\">Gateway L3 / Firewall</text>\n  <text x=\"535\" y=\"464\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Roteia entre VLANs com política</text>\n  <line x1=\"535\" y1=\"348\" x2=\"535\" y2=\"410\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m03l07-arrow)\" />\n  <text x=\"535\" y=\"35\" text-anchor=\"middle\" class=\"svg-label\">VLAN não é firewall: ela separa broadcast; política vem no roteamento/firewall</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>Neste laboratório, você irá planejar e validar uma segmentação simples com VLANs. A versão principal pode ser feita no Cisco Packet Tracer. Como alternativa conceitual, você pode desenhar a topologia, tabela de VLANs, portas access, trunk e políticas esperadas.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios treinam a distinção entre broadcast, VLAN, trunk, access port, gateway inter-VLAN e política de firewall.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Você receberá um cenário de pequena empresa com usuários, servidores, convidados e câmeras. Sua tarefa será propor VLANs, sub-redes, gateways, trunks, políticas e evidências de validação.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada prioriza raciocínio: primeiro separar funções e riscos, depois definir VLANs, depois mapear portas e trunks, depois definir roteamento e política inter-VLAN.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li><strong>Ideia central:</strong> VLAN separa domínios de broadcast em Camada 2.</li><li><strong>O que lembrar:</strong> comunicação entre VLANs exige roteamento e política.</li><li><strong>Erro comum:</strong> achar que VLAN sozinha é firewall.</li><li><strong>Uso real:</strong> separar usuários, servidores, convidados, voz, IoT, câmeras e gerenciamento.</li><li><strong>Segurança:</strong> trunks, native VLAN, ACLs, firewall, DHCP snooping e documentação importam.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você estudará STP, o protocolo usado para evitar loops e broadcast storms em redes com switches redundantes. VLANs organizam domínios; STP evita que caminhos redundantes destruam esses domínios por loop de Camada 2.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2",
      "Camada 3"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet"
    ],
    "relatedProtocols": [
      "Ethernet",
      "IEEE 802.1Q",
      "ARP",
      "IPv4",
      "DHCP",
      "STP"
    ],
    "dependsOn": [
      "Switches",
      "Frame Ethernet",
      "MAC",
      "Broadcast",
      "ARP",
      "Gateway"
    ],
    "enables": [
      "Segmentação de LAN",
      "Inter-VLAN routing",
      "Políticas de firewall",
      "Wi-Fi corporativo",
      "Preparação para STP"
    ]
  },
  "protocolFields": [
    {
      "field": "VLAN ID",
      "size": "12 bits no campo 802.1Q",
      "purpose": "Identificar a VLAN do frame em links trunk.",
      "securityObservation": "VLANs permitidas em trunk devem ser restritas e documentadas."
    },
    {
      "field": "802.1Q Tag",
      "size": "4 bytes adicionados ao frame Ethernet",
      "purpose": "Carregar informações de VLAN e prioridade em links trunk.",
      "securityObservation": "Tags não devem ser aceitas em portas de usuário comuns."
    },
    {
      "field": "Access VLAN",
      "size": "configuração da porta",
      "purpose": "Definir a VLAN de uma porta conectada a host final.",
      "securityObservation": "Porta errada coloca o ativo no domínio de broadcast errado."
    },
    {
      "field": "Native VLAN",
      "size": "configuração do trunk",
      "purpose": "VLAN usada para frames não marcados em trunk 802.1Q.",
      "securityObservation": "Deve ser planejada, não usada para hosts sensíveis, e consistente entre pontas."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host na porta access",
      "action": "Envia frame Ethernet comum.",
      "detail": "O host geralmente não adiciona tag 802.1Q quando está em uma porta access.",
      "possibleFailure": "Porta configurada na VLAN errada coloca o host no segmento errado."
    },
    {
      "step": 2,
      "actor": "Switch",
      "action": "Associa o frame à VLAN da porta.",
      "detail": "A tabela MAC é aprendida no contexto daquela VLAN.",
      "possibleFailure": "MAC flapping ou VLAN inconsistente dificulta forwarding."
    },
    {
      "step": 3,
      "actor": "Switch",
      "action": "Encaminha broadcast apenas dentro da VLAN.",
      "detail": "ARP e DHCP não atravessam para outra VLAN sem gateway/relay.",
      "possibleFailure": "DHCP ausente ou relay mal configurado faz host ficar sem IP."
    },
    {
      "step": 4,
      "actor": "Link trunk",
      "action": "Transporta frames marcados com VLAN ID.",
      "detail": "Trunks conectam switches, roteadores, firewalls, hypervisors ou APs.",
      "possibleFailure": "VLAN não permitida no trunk causa isolamento parcial."
    },
    {
      "step": 5,
      "actor": "Gateway/Firewall",
      "action": "Roteia entre VLANs quando permitido.",
      "detail": "Aqui entram ACLs, firewall, logs e políticas.",
      "possibleFailure": "Liberar any-any entre VLANs anula boa parte do valor defensivo da segmentação."
    }
  ],
  "deepDive": {
    "mentalModel": "VLAN é uma sala lógica dentro do switch: limita broadcast e organiza Camada 2, mas a porta entre salas é o roteamento com política.",
    "keyTerms": [
      "VLAN",
      "802.1Q",
      "access port",
      "trunk",
      "native VLAN",
      "inter-VLAN routing"
    ],
    "limitations": [
      "VLAN não criptografa tráfego.",
      "VLAN não autentica usuário ou dispositivo.",
      "VLAN não substitui firewall.",
      "VLAN mal documentada aumenta complexidade."
    ],
    "whenToUse": [
      "Separar grupos por função, risco ou operação.",
      "Reduzir domínio de broadcast.",
      "Organizar Wi-Fi corporativo, voz, convidados, IoT e gerenciamento.",
      "Preparar políticas inter-VLAN."
    ],
    "whenNotToUse": [
      "Como única barreira para dados altamente sensíveis.",
      "Sem documentação e dono operacional.",
      "Para esconder problemas de inventário ou IAM."
    ],
    "operationalImpact": [
      "Exige documentação de portas, trunks, VLAN IDs, gateways e DHCP.",
      "Muda troubleshooting porque VLAN errada pode parecer falha de IP ou DNS.",
      "Aumenta necessidade de governança de mudanças em switches."
    ],
    "financialImpact": [
      "Pode exigir switches gerenciáveis, controladora Wi-Fi, firewall L3 e tempo de engenharia.",
      "Reduz custo comparado a switches físicos separados para cada rede.",
      "Em ambientes híbridos, erros de VLAN podem gerar horas de troubleshooting caro."
    ],
    "securityImpact": [
      "Reduz alcance de broadcast e movimento lateral local.",
      "Facilita política e logging inter-VLAN.",
      "Pode criar falsa sensação de segurança se roteamento inter-VLAN estiver liberado demais."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que VLAN é firewall.",
      "whyItHappens": "A VLAN separa redes logicamente, então parece bloquear tudo.",
      "consequence": "Comunicação inter-VLAN pode ficar liberada sem controle.",
      "correction": "Usar firewall/ACL e logs no roteamento entre VLANs."
    },
    {
      "mistake": "Colocar todos os trunks permitindo todas as VLANs.",
      "whyItHappens": "Facilita implantação inicial.",
      "consequence": "Aumenta superfície de erro e exposição lateral.",
      "correction": "Permitir apenas VLANs necessárias e documentadas."
    },
    {
      "mistake": "Usar VLAN 1 para tudo.",
      "whyItHappens": "Muitos equipamentos vêm com VLAN 1 padrão.",
      "consequence": "Confusão, risco operacional e baixa governança.",
      "correction": "Criar VLANs explícitas e manter VLAN padrão sem hosts sensíveis."
    },
    {
      "mistake": "Não relacionar VLAN com sub-rede.",
      "whyItHappens": "O aluno mistura Camada 2 e Camada 3.",
      "consequence": "DHCP, gateway e roteamento ficam inconsistentes.",
      "correction": "Mapear normalmente uma sub-rede por VLAN e documentar gateway."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host recebe IP de sub-rede errada.",
      "Host não recebe DHCP.",
      "Hosts em VLANs diferentes não se comunicam.",
      "Wi-Fi corporativo cai na rede errada.",
      "Servidor acessível por um segmento, mas não por outro."
    ],
    "diagnosticQuestions": [
      "A porta do host está na VLAN correta?",
      "A VLAN existe no switch?",
      "A VLAN está permitida no trunk?",
      "O gateway da VLAN existe e está ativo?",
      "O DHCP/relay está correto?",
      "Há política inter-VLAN bloqueando?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && arp -a && route print",
        "purpose": "Ver IP, gateway, DNS, ARP e rota local.",
        "expectedObservation": "IP e gateway compatíveis com a VLAN esperada.",
        "interpretation": "IP de sub-rede errada sugere VLAN/SSID/DHCP incorreto."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && ip neigh",
        "purpose": "Ver endereços, rota default e vizinhos ARP.",
        "expectedObservation": "Interface na sub-rede correta e gateway resolvido.",
        "interpretation": "Gateway ausente ou vizinho FAILED indica problema local."
      },
      {
        "platform": "Cisco IOS",
        "command": "show vlan brief\nshow interfaces trunk\nshow mac address-table vlan 10\nshow interfaces status",
        "purpose": "Validar VLANs, trunks, MACs e portas.",
        "expectedObservation": "Porta access na VLAN correta e trunk permitindo VLAN necessária.",
        "interpretation": "VLAN não permitida no trunk ou porta na VLAN errada explica isolamento."
      }
    ],
    "decisionTree": [
      {
        "if": "Host pegou IP de sub-rede errada",
        "then": "Verificar VLAN da porta, SSID, DHCP scope e documentação."
      },
      {
        "if": "Host não recebe DHCP",
        "then": "Verificar VLAN, trunk, DHCP server, relay/helper e bloqueios."
      },
      {
        "if": "Hosts na mesma VLAN não se comunicam",
        "then": "Verificar Camada 1, porta, VLAN, tabela MAC, firewall local e ARP."
      },
      {
        "if": "VLANs diferentes não se comunicam",
        "then": "Verificar gateway, rota, firewall/ACL e logs inter-VLAN."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Separar redes por função e risco.",
      "Documentar VLAN ID, nome, sub-rede, gateway, dono e finalidade.",
      "Usar portas access para hosts finais.",
      "Restringir VLANs permitidas em trunks.",
      "Aplicar firewall/ACL entre VLANs com menor privilégio.",
      "Monitorar mudanças de trunk, porta e VLAN."
    ],
    "badPractices": [
      "Usar rede plana para tudo.",
      "Permitir todas as VLANs em todos os trunks sem necessidade.",
      "Usar VLAN padrão para hosts sensíveis.",
      "Achar que VLAN substitui autenticação, firewall ou monitoramento.",
      "Não revisar exceções inter-VLAN."
    ],
    "commonErrors": [
      "Colocar servidor na VLAN de usuários.",
      "Configurar porta de AP ou hypervisor sem trunk correto.",
      "Esquecer DHCP relay.",
      "Criar VLAN sem gateway documentado."
    ],
    "vulnerabilities": [
      {
        "name": "Segmentação fraca por roteamento permissivo",
        "description": "VLANs existem, mas o firewall permite qualquer tráfego entre elas.",
        "defensiveExplanation": "O risco não está na VLAN em si, mas na ausência de política efetiva entre segmentos.",
        "mitigation": "Aplicar regras mínimas, logs e revisão periódica."
      },
      {
        "name": "Trunk indevido em porta de usuário",
        "description": "Uma porta que deveria ser access é configurada como trunk.",
        "defensiveExplanation": "Isso aumenta risco de exposição de múltiplos segmentos.",
        "mitigation": "Portas access por padrão, inventário, revisão de configuração e NAC."
      },
      {
        "name": "Rede de convidados mal isolada",
        "description": "Visitantes conseguem alcançar ativos internos.",
        "defensiveExplanation": "A separação lógica não foi acompanhada por política e validação.",
        "mitigation": "VLAN de convidados, firewall, bloqueio lateral e testes de validação."
      }
    ],
    "monitoring": [
      "Mudanças de configuração em switches.",
      "Criação ou alteração de trunks.",
      "MACs inesperados em VLANs sensíveis.",
      "Tráfego inter-VLAN fora do padrão.",
      "DHCP em VLANs erradas."
    ],
    "hardening": [
      "Desabilitar portas não usadas.",
      "Configurar VLAN de estacionamento para portas ociosas.",
      "Restringir allowed VLANs em trunks.",
      "Usar DHCP snooping, DAI e port security onde aplicável.",
      "Usar 802.1X/NAC para controle de acesso."
    ],
    "detectionIdeas": [
      "Alertar quando uma porta access vira trunk.",
      "Comparar MAC/IP/VLAN com inventário.",
      "Revisar logs de firewall inter-VLAN.",
      "Detectar variações anormais de broadcast por VLAN."
    ]
  },
  "lab": {
    "id": "lab-3.7",
    "title": "Planejando e validando VLANs em uma LAN pequena",
    "labType": "security",
    "objective": "Criar uma segmentação simples com VLANs, portas access, trunk, gateway inter-VLAN e política mínima esperada.",
    "scenario": "Uma empresa pequena precisa separar usuários, servidores, convidados e gerenciamento sem comprar switches separados.",
    "topology": "PC-Usuário -> Switch; Servidor -> Switch; AP/Convidado -> Switch; Switch -> Roteador/Firewall ou Switch L3 por trunk.",
    "architecture": "VLAN 10 usuários, VLAN 20 servidores, VLAN 40 convidados, VLAN 99 gerenciamento; comunicação inter-VLAN apenas via gateway com política.",
    "prerequisites": [
      "Entender Ethernet, switches, ARP, broadcast e gateway.",
      "Ter Cisco Packet Tracer, GNS3, switch de laboratório ou fazer versão conceitual em tabela."
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "Opcional: switch gerenciável de laboratório",
      "Windows/Linux para comandos de validação",
      "Editor de texto para tabela de VLANs"
    ],
    "estimatedTimeMinutes": 125,
    "cost": "zero",
    "safetyNotes": [
      "Não altere VLANs em rede corporativa real sem autorização formal.",
      "Não conecte laboratório a rede de produção.",
      "Não colete ou compartilhe MACs/IPs reais sem sanitização."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir grupos e riscos",
        "instruction": "Liste grupos que não devem ficar no mesmo domínio de broadcast.",
        "command": "Tabela: Usuarios, Servidores, Convidados, Gerenciamento",
        "expectedOutput": "Lista de grupos com finalidade e nível de risco.",
        "explanation": "VLAN deve nascer de necessidade operacional e de segurança, não de numeração aleatória."
      },
      {
        "number": 2,
        "title": "Criar plano de VLANs",
        "instruction": "Crie uma tabela com VLAN ID, nome, sub-rede, gateway e dono.",
        "command": "VLAN 10 Usuarios 192.168.10.0/24 GW 192.168.10.1\nVLAN 20 Servidores 192.168.20.0/24 GW 192.168.20.1\nVLAN 40 Convidados 192.168.40.0/24 GW 192.168.40.1\nVLAN 99 Gerenciamento 192.168.99.0/24 GW 192.168.99.1",
        "expectedOutput": "Tabela coerente de segmentação.",
        "explanation": "Normalmente cada VLAN possui sua própria sub-rede e gateway."
      },
      {
        "number": 3,
        "title": "Configurar VLANs no switch de laboratório",
        "instruction": "No Packet Tracer ou switch autorizado, crie VLANs e nomes.",
        "command": "configure terminal\nvlan 10\n name USUARIOS\nvlan 20\n name SERVIDORES\nvlan 40\n name CONVIDADOS\nvlan 99\n name GERENCIAMENTO",
        "expectedOutput": "VLANs criadas no switch.",
        "explanation": "A criação da VLAN permite associar portas e trunks."
      },
      {
        "number": 4,
        "title": "Configurar portas access",
        "instruction": "Associe portas de hosts finais às VLANs corretas.",
        "command": "interface fa0/1\n switchport mode access\n switchport access vlan 10\ninterface fa0/2\n switchport mode access\n switchport access vlan 20",
        "expectedOutput": "Portas finais em modo access.",
        "explanation": "Hosts finais não devem receber trunk sem necessidade."
      },
      {
        "number": 5,
        "title": "Configurar trunk controlado",
        "instruction": "Configure o enlace para roteador/firewall/switch L3 permitindo apenas VLANs necessárias.",
        "command": "interface fa0/24\n switchport mode trunk\n switchport trunk allowed vlan 10,20,40,99",
        "expectedOutput": "Trunk ativo com lista restrita de VLANs.",
        "explanation": "Evita carregar VLANs desnecessárias por todo o ambiente."
      },
      {
        "number": 6,
        "title": "Validar configuração",
        "instruction": "Verifique VLANs, trunks e MACs aprendidos.",
        "command": "show vlan brief\nshow interfaces trunk\nshow mac address-table",
        "expectedOutput": "Portas nas VLANs corretas e trunk permitindo VLANs planejadas.",
        "explanation": "Validação evita concluir pela intenção; rede se opera por evidências."
      },
      {
        "number": 7,
        "title": "Testar comunicação esperada",
        "instruction": "Teste hosts na mesma VLAN e entre VLANs, quando gateway/política estiver disponível.",
        "command": "ping <gateway-da-vlan>\nping <host-da-mesma-vlan>\nping <host-de-outra-vlan>",
        "expectedOutput": "Mesma VLAN funciona; inter-VLAN depende de roteamento e política.",
        "explanation": "VLAN separa Camada 2; comunicação entre VLANs precisa de L3."
      },
      {
        "number": 8,
        "title": "Registrar evidências sanitizadas",
        "instruction": "Monte relatório com tabela, diagrama, comandos e interpretação.",
        "command": "Relatório: VLAN, porta, trunk, gateway, política, evidência, risco",
        "expectedOutput": "Dossiê técnico sem dados sensíveis reais.",
        "explanation": "Documentação é parte da segurança e do troubleshooting."
      }
    ],
    "expectedResult": "O aluno deve conseguir explicar a segmentação, mostrar quais portas pertencem a cada VLAN, validar trunks e diferenciar separação L2 de política L3/L4.",
    "validation": [
      {
        "check": "VLANs existem",
        "command": "show vlan brief",
        "expected": "VLAN 10, 20, 40 e 99 aparecem com nomes corretos.",
        "ifFails": "Criar VLANs e revisar modo de configuração."
      },
      {
        "check": "Portas access corretas",
        "command": "show vlan brief",
        "expected": "Portas de usuários e servidores aparecem nas VLANs planejadas.",
        "ifFails": "Revisar switchport mode access e switchport access vlan."
      },
      {
        "check": "Trunk controlado",
        "command": "show interfaces trunk",
        "expected": "Trunk permite somente VLANs necessárias.",
        "ifFails": "Revisar allowed VLAN list e estado do enlace."
      },
      {
        "check": "Gateway acessível",
        "command": "ping <gateway-da-vlan>",
        "expected": "Resposta quando gateway/política estiver configurado.",
        "ifFails": "Verificar IP, máscara, VLAN, trunk, gateway e firewall."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Host pegou IP da VLAN errada",
        "probableCause": "Porta access ou SSID mapeado para VLAN incorreta.",
        "howToConfirm": "Comparar ipconfig/ip addr com show vlan brief.",
        "fix": "Corrigir VLAN da porta/SSID e renovar DHCP."
      },
      {
        "symptom": "VLAN não atravessa trunk",
        "probableCause": "VLAN não permitida no trunk ou não criada no switch.",
        "howToConfirm": "show interfaces trunk e show vlan brief.",
        "fix": "Criar VLAN e ajustar allowed VLANs."
      },
      {
        "symptom": "Mesmo com VLAN correta, não acessa outra VLAN",
        "probableCause": "Ausência de roteamento inter-VLAN ou bloqueio de firewall.",
        "howToConfirm": "Testar gateway, rota e logs de firewall.",
        "fix": "Configurar gateway/política mínima necessária."
      },
      {
        "symptom": "Broadcast excessivo em uma VLAN",
        "probableCause": "Rede plana, loop, dispositivo ruidoso ou descoberta abusiva.",
        "howToConfirm": "Contadores de interface, logs, SPAN/monitoramento autorizado.",
        "fix": "Investigar origem, aplicar STP/storm control/segmentação."
      }
    ],
    "improvements": [
      "Adicionar DHCP relay por VLAN.",
      "Criar regras inter-VLAN por menor privilégio.",
      "Separar gerenciamento em VLAN própria com acesso restrito.",
      "Adicionar 802.1X/NAC em portas de usuário.",
      "Criar diagrama físico e lógico versionado."
    ],
    "evidenceToCollect": [
      "Tabela de VLANs",
      "show vlan brief",
      "show interfaces trunk",
      "show mac address-table",
      "IP/gateway sanitizados dos hosts",
      "Diagrama físico/lógico",
      "Regras inter-VLAN esperadas"
    ],
    "questions": [
      "Por que VLAN limita ARP?",
      "Por que VLAN não substitui firewall?",
      "Qual risco de permitir todas as VLANs em todos os trunks?",
      "O que muda entre porta access e trunk?"
    ],
    "challenge": "Projete VLANs para usuários, servidores, convidados, câmeras e gerenciamento em uma filial pequena, indicando gateways, trunks, políticas e evidências de validação.",
    "solution": "Uma solução madura separa VLANs por função e risco, usa portas access para hosts, trunks restritos entre equipamentos, gateway/firewall para inter-VLAN, DHCP por VLAN, logs e documentação. Convidados não acessam internos; câmeras falam apenas com gravador; gerenciamento é restrito; usuários acessam somente serviços necessários."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma VLAN não deve ser explicada apenas como “uma rede separada”?",
      "hints": [
        "Pense em Camada 2.",
        "Pense em broadcast e ARP."
      ],
      "expectedIdeas": [
        "domínio de broadcast",
        "separação lógica",
        "não é firewall",
        "precisa de gateway para inter-VLAN"
      ],
      "explanation": "A resposta ideal mostra que VLAN separa frames e broadcasts em L2, mas política vem depois."
    },
    {
      "type": "diagnóstico",
      "question": "Um host recebeu IP da sub-rede de servidores, mas deveria estar na rede de usuários. O que verificar primeiro?",
      "hints": [
        "Pense em porta access.",
        "Pense em DHCP/SSID."
      ],
      "expectedIdeas": [
        "show vlan brief",
        "porta do switch",
        "SSID-VLAN mapping",
        "DHCP scope"
      ],
      "explanation": "O sintoma sugere VLAN ou DHCP errado antes de culpar aplicação."
    },
    {
      "type": "cenário real",
      "question": "Como você separaria usuários, convidados e servidores sem criar falsa sensação de segurança?",
      "hints": [
        "Pense em VLAN e firewall.",
        "Pense em logs."
      ],
      "expectedIdeas": [
        "VLANs separadas",
        "inter-VLAN routing",
        "política mínima",
        "logs",
        "documentação"
      ],
      "explanation": "VLAN organiza e limita broadcast; firewall e logs controlam comunicação entre segmentos."
    }
  ],
  "quiz": [
    {
      "id": "q3.7.1",
      "type": "conceito",
      "q": "Qual é a função principal de uma VLAN?",
      "opts": [
        "Separar domínios de broadcast em Camada 2",
        "Criptografar tráfego automaticamente",
        "Substituir firewall entre servidores",
        "Aumentar a potência do sinal físico"
      ],
      "a": 0,
      "exp": "VLAN separa logicamente domínios de broadcast. Ela não criptografa nem substitui firewall.",
      "difficulty": "iniciante",
      "topic": "vlan"
    },
    {
      "id": "q3.7.2",
      "type": "comparação",
      "q": "Qual frase está correta?",
      "opts": [
        "Porta access normalmente conecta host final a uma VLAN",
        "Porta trunk nunca carrega mais de uma VLAN",
        "VLAN elimina necessidade de gateway",
        "Toda VLAN é uma VPN"
      ],
      "a": 0,
      "exp": "Portas access são usadas para hosts finais em uma VLAN. Trunks podem carregar múltiplas VLANs.",
      "difficulty": "iniciante",
      "topic": "access trunk"
    },
    {
      "id": "q3.7.3",
      "type": "diagnóstico",
      "q": "Um host não recebe DHCP após mover de porta. Qual hipótese inicial é forte?",
      "opts": [
        "Porta na VLAN errada ou VLAN sem DHCP/relay",
        "TLS expirou",
        "DNS público instável",
        "MTU de VPN sempre incorreta"
      ],
      "a": 0,
      "exp": "Mudança de porta e DHCP falhando apontam primeiro para VLAN/porta/DHCP relay.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q3.7.4",
      "type": "segurança",
      "q": "Por que VLAN não deve ser tratada como firewall?",
      "opts": [
        "Porque ela separa L2, mas política entre VLANs depende de roteamento/firewall/ACL",
        "Porque VLAN só existe em Wi-Fi doméstico",
        "Porque VLAN impede qualquer roteamento",
        "Porque VLAN só serve para aumentar velocidade"
      ],
      "a": 0,
      "exp": "VLAN separa broadcast. Comunicação entre VLANs deve ser controlada por política.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q3.7.5",
      "type": "arquitetura",
      "q": "Qual prática é mais segura para trunks?",
      "opts": [
        "Permitir apenas VLANs necessárias",
        "Permitir todas as VLANs em todos os trunks",
        "Usar trunk em portas de usuários comuns",
        "Não documentar native VLAN"
      ],
      "a": 0,
      "exp": "Allowed VLAN list restrita reduz superfície de erro e exposição.",
      "difficulty": "intermediário",
      "topic": "trunk"
    },
    {
      "id": "q3.7.6",
      "type": "cloud",
      "q": "Qual conceito em cloud mais se aproxima do raciocínio de segmentação lógica?",
      "opts": [
        "Subnets, route tables, security groups/NSGs e firewalls",
        "Apenas tamanho do disco",
        "Somente região de billing",
        "Tema escuro do console"
      ],
      "a": 0,
      "exp": "Cloud usa outros mecanismos, mas o raciocínio de segmentação lógica e política permanece.",
      "difficulty": "iniciante",
      "topic": "cloud"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.7.1",
      "front": "O que uma VLAN separa?",
      "back": "Domínios de broadcast em Camada 2.",
      "tags": [
        "vlan"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.7.2",
      "front": "VLAN é firewall?",
      "back": "Não. VLAN separa L2; firewall/ACL controla tráfego entre VLANs.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.7.3",
      "front": "O que é porta access?",
      "back": "Porta associada a uma VLAN para conectar host final sem tagging visível ao host.",
      "tags": [
        "switch"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.7.4",
      "front": "O que é trunk?",
      "back": "Link que transporta múltiplas VLANs, normalmente usando tags 802.1Q.",
      "tags": [
        "trunk"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.7.5",
      "front": "Por que restringir VLANs permitidas no trunk?",
      "back": "Para reduzir erro operacional e exposição de segmentos desnecessários.",
      "tags": [
        "hardening"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.7.6",
      "front": "O que é roteamento inter-VLAN?",
      "back": "Comunicação entre VLANs diferentes por meio de roteador, switch L3 ou firewall.",
      "tags": [
        "roteamento"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.7.1",
      "type": "conceitual",
      "prompt": "Explique por que ARP de uma VLAN não deve alcançar hosts de outra VLAN.",
      "expectedAnswer": "Porque VLANs separam domínios de broadcast em Camada 2; ARP usa broadcast local e fica limitado ao domínio da VLAN.",
      "explanation": "Essa é uma das funções centrais da segmentação por VLAN."
    },
    {
      "id": "ex3.7.2",
      "type": "arquitetura",
      "prompt": "Proponha VLANs para usuários, servidores, convidados e gerenciamento.",
      "expectedAnswer": "Exemplo: VLAN 10 Usuários, VLAN 20 Servidores, VLAN 40 Convidados, VLAN 99 Gerenciamento, cada uma com sub-rede e gateway próprios.",
      "explanation": "A numeração pode variar; o importante é separar função, risco e política."
    },
    {
      "id": "ex3.7.3",
      "type": "diagnóstico",
      "prompt": "Um host na porta Fa0/5 recebeu IP 192.168.20.50, mas deveria ser usuário da VLAN 10. O que verificar?",
      "expectedAnswer": "Verificar VLAN da porta, show vlan brief, DHCP scope, documentação e se a porta foi movida recentemente.",
      "explanation": "O IP de sub-rede errada sugere VLAN/porta/DHCP incorretos."
    },
    {
      "id": "ex3.7.4",
      "type": "segurança",
      "prompt": "Liste três controles além de VLAN para proteger comunicação entre usuários e servidores.",
      "expectedAnswer": "Firewall/ACL inter-VLAN, logs, 802.1X/NAC, menor privilégio, hardening, segmentação adicional e monitoramento.",
      "explanation": "VLAN é base, mas defesa real exige controles adicionais."
    }
  ],
  "challenge": {
    "title": "Segmentar uma filial pequena com VLANs",
    "scenario": "Uma filial possui 30 usuários, 5 servidores locais, Wi-Fi de convidados, 12 câmeras IP e equipamentos de rede gerenciáveis. Hoje tudo está na mesma rede.",
    "tasks": [
      "Criar tabela de VLANs com ID, nome, sub-rede, gateway e dono.",
      "Definir quais portas seriam access e quais seriam trunk.",
      "Indicar política mínima entre VLANs.",
      "Definir evidências de validação.",
      "Listar riscos e mitigações."
    ],
    "constraints": [
      "Convidados não podem acessar redes internas.",
      "Câmeras só podem falar com o gravador.",
      "Gerenciamento deve ser restrito.",
      "A solução deve ser documentável e testável."
    ],
    "expectedDeliverables": [
      "Tabela de VLANs",
      "Diagrama físico/lógico",
      "Lista de trunks e allowed VLANs",
      "Políticas inter-VLAN",
      "Plano de validação",
      "Matriz de riscos"
    ],
    "gradingRubric": [
      {
        "criterion": "Segmentação por função e risco",
        "points": 25,
        "description": "VLANs fazem sentido e reduzem mistura de ativos."
      },
      {
        "criterion": "Política inter-VLAN",
        "points": 25,
        "description": "Comunicação entre segmentos respeita menor privilégio."
      },
      {
        "criterion": "Validação técnica",
        "points": 20,
        "description": "Inclui comandos e evidências concretas."
      },
      {
        "criterion": "Segurança e documentação",
        "points": 20,
        "description": "Inclui riscos, mitigação, logs e sanitização."
      },
      {
        "criterion": "Clareza operacional",
        "points": 10,
        "description": "Plano pode ser entendido e mantido por outra pessoa."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro identificamos grupos com funções e riscos diferentes. Depois criamos VLANs e sub-redes. Em seguida definimos portas access para hosts, trunks restritos entre equipamentos e roteamento/firewall para tráfego necessário. Por fim validamos com comandos e logs.",
    "steps": [
      "Criar VLAN 10 para usuários, VLAN 20 para servidores, VLAN 40 para convidados, VLAN 50 para câmeras e VLAN 99 para gerenciamento.",
      "Associar portas de hosts finais como access.",
      "Configurar trunks apenas entre switch, firewall, AP corporativo ou hypervisor, permitindo só VLANs necessárias.",
      "Definir gateway por VLAN no firewall/switch L3.",
      "Aplicar política: convidados só internet; câmeras só gravador; usuários só serviços necessários; gerenciamento restrito.",
      "Validar com show vlan brief, show interfaces trunk, ping gateway, logs e testes controlados."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar todos na VLAN 1 e bloquear depois no antivírus.",
        "whyItIsWrong": "Não reduz broadcast nem cria segmentação de rede."
      },
      {
        "answer": "Criar VLANs, mas liberar any-any no firewall.",
        "whyItIsWrong": "A segmentação vira apenas organização, sem controle efetivo de comunicação."
      },
      {
        "answer": "Configurar todas as portas como trunk.",
        "whyItIsWrong": "Aumenta risco operacional e exposição desnecessária."
      }
    ],
    "finalAnswer": "Uma solução adequada combina VLANs por função, trunks mínimos, gateway/firewall para inter-VLAN, DHCP por segmento, logs, documentação e validação. VLAN separa L2; política controla L3/L4/L7."
  },
  "glossary": [
    {
      "term": "VLAN",
      "shortDefinition": "LAN virtual que separa domínios de broadcast em Camada 2.",
      "longDefinition": "Segmentação lógica em switches Ethernet que permite organizar hosts em redes locais distintas usando a mesma infraestrutura física.",
      "example": "VLAN 10 para usuários e VLAN 20 para servidores.",
      "relatedTerms": [
        "802.1Q",
        "trunk",
        "access port",
        "broadcast domain"
      ],
      "relatedLessons": [
        "3.4",
        "3.7",
        "4.1"
      ]
    },
    {
      "term": "802.1Q",
      "shortDefinition": "Padrão de marcação de VLAN em frames Ethernet.",
      "longDefinition": "Adiciona uma tag ao frame em links trunk para identificar a VLAN.",
      "example": "Um trunk entre switches carrega VLANs 10, 20 e 99 com tags 802.1Q.",
      "relatedTerms": [
        "tag",
        "trunk",
        "VLAN ID"
      ],
      "relatedLessons": [
        "3.7",
        "3.8"
      ]
    },
    {
      "term": "Porta access",
      "shortDefinition": "Porta de switch associada a uma única VLAN para host final.",
      "longDefinition": "Modo de porta usado normalmente para computadores, impressoras, câmeras ou telefones, onde o switch classifica o tráfego em uma VLAN específica.",
      "example": "Fa0/1 configurada como access vlan 10.",
      "relatedTerms": [
        "switchport",
        "VLAN"
      ],
      "relatedLessons": [
        "3.7"
      ]
    },
    {
      "term": "Porta trunk",
      "shortDefinition": "Porta que transporta múltiplas VLANs.",
      "longDefinition": "Usada entre switches, roteadores, firewalls, APs corporativos ou hypervisors para carregar tráfego marcado de diferentes VLANs.",
      "example": "Fa0/24 trunk permitido para VLANs 10,20,40,99.",
      "relatedTerms": [
        "802.1Q",
        "native VLAN"
      ],
      "relatedLessons": [
        "3.7",
        "3.8"
      ]
    },
    {
      "term": "Domínio de broadcast",
      "shortDefinition": "Conjunto de hosts que recebe o mesmo broadcast de Camada 2.",
      "longDefinition": "Em redes com VLAN, cada VLAN normalmente forma seu próprio domínio de broadcast.",
      "example": "ARP Request da VLAN 10 não deve alcançar hosts da VLAN 20.",
      "relatedTerms": [
        "ARP",
        "broadcast",
        "VLAN"
      ],
      "relatedLessons": [
        "3.4",
        "3.5",
        "3.7"
      ]
    },
    {
      "term": "Roteamento inter-VLAN",
      "shortDefinition": "Comunicação entre VLANs por Camada 3.",
      "longDefinition": "Processo em que roteador, switch L3 ou firewall encaminha tráfego entre sub-redes associadas a VLANs diferentes.",
      "example": "Usuário da VLAN 10 acessa servidor da VLAN 20 por meio do firewall.",
      "relatedTerms": [
        "gateway",
        "firewall",
        "ACL"
      ],
      "relatedLessons": [
        "2.5",
        "3.7",
        "4.1"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.1Q — Bridges and Bridged Networks",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_1Q-2022.html",
      "note": "Referência do padrão de VLAN tagging e bridging."
    },
    {
      "type": "internal-course",
      "title": "Modelo OSI — Camada 2",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m02/lesson-2.4",
      "note": "Base conceitual para frames, MAC e switches."
    },
    {
      "type": "internal-course",
      "title": "ARP: transformando IPv4 em MAC",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m03/lesson-3.5",
      "note": "Mostra por que broadcast local precisa ser controlado."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e plataformas internas",
      "lesson": "NetworkPolicy e segmentação",
      "reason": "VLANs ensinam segmentação em rede física; Kubernetes e cloud aplicam raciocínio semelhante em camadas diferentes."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust e controle de acesso",
      "lesson": "Acesso baseado em identidade",
      "reason": "VLAN não autentica identidade; IAM e Zero Trust complementam segmentação de rede."
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
      "3.8"
    ]
  }
};
