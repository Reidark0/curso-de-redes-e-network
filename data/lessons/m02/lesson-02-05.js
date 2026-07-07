export const lesson0205 = {
  "id": "2.5",
  "moduleId": "m02",
  "order": 5,
  "title": "Camada 3 — Rede: IP, roteamento, gateway e TTL",
  "subtitle": "A camada que leva pacotes entre redes usando endereços IP, tabelas de rotas, gateways e controle de vida do pacote.",
  "duration": "85-120 min",
  "estimatedStudyTimeMinutes": 120,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 205,
  "tags": [
    "redes",
    "modelo osi",
    "camada 3",
    "ip",
    "roteamento",
    "gateway",
    "ttl",
    "traceroute",
    "cloud networking",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 apresentou o Modelo OSI como ferramenta de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "A aula 2.2 explicou encapsulamento e mostrou o pacote como PDU da Camada 3."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.4",
      "reason": "A aula 2.4 explicou a entrega local por frames, MAC, switch, VLAN e ARP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.9",
      "reason": "A aula 1.9 apresentou comandos iniciais de diagnóstico como ipconfig, ping, tracert e nslookup."
    }
  ],
  "objectives": [
    "Explicar o papel da Camada 3 no Modelo OSI.",
    "Diferenciar IP, máscara, rede local, gateway, rota e TTL.",
    "Descrever como um host decide se envia localmente ou para o gateway.",
    "Interpretar tabela de rotas e rota default em nível introdutório.",
    "Relacionar Camada 3 com cloud networking, DevSecOps, segurança e troubleshooting.",
    "Coletar evidências básicas com Windows, Linux e Cisco IOS."
  ],
  "learningOutcomes": [
    "Dado um IP e uma máscara, o aluno identifica se o destino está na mesma rede ou exige gateway.",
    "Dado um sintoma de alcance remoto, o aluno verifica gateway, rota e caminho antes de culpar DNS ou aplicação.",
    "Dado um traceroute, o aluno entende que TTL revela saltos intermediários de forma aproximada.",
    "Dado um cenário cloud, o aluno reconhece que subnet, route table e gateway são peças de Camada 3.",
    "Dado um risco de movimento lateral, o aluno explica como rotas e segmentação influenciam o impacto."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Até agora você viu que bits precisam de sinais físicos, que a Camada 2 organiza esses bits em quadros e que switches entregam tráfego dentro de uma rede local. Mas isso ainda não explica como um notebook em uma LAN acessa um servidor em outra rede, um site na internet, uma API em cloud ou um serviço interno em outra filial.</p>\n  <p>A Camada 3, chamada de camada de Rede, existe para resolver exatamente esse problema: permitir comunicação entre redes diferentes. Ela introduz endereçamento lógico, decisão de caminho, roteamento, gateway padrão e controle de vida do pacote por TTL.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um usuário consegue pingar o gateway local, mas não acessa sistemas em outra filial. A placa de rede está funcionando, a VLAN parece correta e o switch aprendeu o MAC. O problema agora provavelmente não é Camada 1 nem Camada 2: é preciso investigar IP, máscara, gateway, tabela de rotas, firewall ou caminho entre redes.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Redes locais resolveram a comunicação dentro de um mesmo ambiente físico ou lógico. Porém, conforme universidades, empresas e provedores começaram a conectar redes distintas, surgiu um problema maior: como entregar dados de uma rede para outra sem depender de um único meio físico compartilhado?</p>\n  <p>O IP nasceu como parte da arquitetura da internet para fornecer endereçamento lógico e encaminhamento entre redes. Diferentemente do MAC, que identifica uma interface dentro de um enlace local, o endereço IP indica onde um host está em uma estrutura lógica de redes e sub-redes. Essa separação tornou possível conectar LANs, WANs, datacenters, provedores, nuvens públicas e ambientes híbridos.</p>\n  <p>Com o crescimento da internet, roteadores passaram a usar tabelas de rotas para decidir o próximo salto. O TTL foi incluído para impedir que pacotes ficassem circulando para sempre em caso de loop. Comandos como traceroute e tracert exploram essa propriedade para mostrar saltos no caminho.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>A Camada 2 entrega quadros dentro de uma rede local, mas não foi criada para encontrar caminhos entre redes diferentes. Se todos os dispositivos do mundo dependessem apenas de MAC e broadcast, a rede global seria inviável: haveria excesso de broadcast, falta de hierarquia, ausência de sumarização e dificuldade de controle.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Endereçamento global lógico:</strong> identificar redes e hosts de forma organizada.</li>\n    <li><strong>Decisão de caminho:</strong> escolher para onde enviar pacotes destinados a outras redes.</li>\n    <li><strong>Separação de redes:</strong> permitir sub-redes, filiais, datacenters, cloud e internet.</li>\n    <li><strong>Controle de loops:</strong> evitar que pacotes circulem indefinidamente com TTL.</li>\n    <li><strong>Troubleshooting:</strong> diferenciar problema local, gateway, rota, firewall e destino.</li>\n  </ul>\n  <p>Sem Camada 3, teríamos redes locais isoladas. Com Camada 3 mal configurada, temos sintomas clássicos: host acessa a LAN, mas não sai para a internet; duas sub-redes não se comunicam; VPN conecta, mas não alcança sistemas; cloud VNet existe, mas rotas e security groups impedem o fluxo.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução da Camada 3 acompanha a evolução das redes: de pequenas LANs isoladas para internet, redes corporativas, cloud e arquiteturas zero trust.</p>\n  <table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead><tbody>\n    <tr><td>Redes locais isoladas</td><td>Comunicação apenas no mesmo enlace.</td><td>Não conectava ambientes diferentes.</td><td>Roteadores entre redes.</td></tr>\n    <tr><td>Rotas estáticas</td><td>Administrador configurava caminhos manualmente.</td><td>Não escalava bem e era sujeito a erro.</td><td>Protocolos de roteamento dinâmico.</td></tr>\n    <tr><td>Internet roteada</td><td>Redes autônomas trocam rotas em grande escala.</td><td>Exige políticas, segurança e controle.</td><td>BGP, filtragem, RPKI e engenharia de tráfego.</td></tr>\n    <tr><td>Cloud networking</td><td>Route tables, subnets, gateways e peering são definidos por software.</td><td>Erros de rota e exposição pública podem ser críticos.</td><td>IaC, policy as code e revisão de segurança.</td></tr>\n    <tr><td>Zero Trust</td><td>Rede deixa de ser confiança automática.</td><td>Conectividade não implica autorização.</td><td>Identidade, contexto, políticas e logs por fluxo.</td></tr>\n  </tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>A Camada 3 do Modelo OSI é a camada responsável por endereçamento lógico e encaminhamento de pacotes entre redes. Em redes TCP/IP, o principal protocolo dessa função é o IP, especialmente IPv4 e IPv6.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> Camada 3 é a camada que usa endereços lógicos, como IP, para transportar pacotes entre redes diferentes por meio de roteadores, gateways e tabelas de rotas.</div>\n  <p>O host não precisa conhecer todos os caminhos da internet. Ele precisa saber seu próprio IP, sua máscara, sua rede local e qual gateway usar quando o destino não estiver na mesma rede. O roteador, por sua vez, consulta sua tabela de rotas para encaminhar o pacote para o próximo salto.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O funcionamento da Camada 3 começa antes do pacote sair do host.</p>\n  <ol class=\"flow-list\">\n    <li>O host compara o IP de destino com sua própria rede usando IP e máscara.</li>\n    <li>Se o destino estiver na mesma sub-rede, a entrega é local e dependerá de ARP/Camada 2.</li>\n    <li>Se o destino estiver fora da sub-rede local, o host envia o pacote ao gateway padrão.</li>\n    <li>Para entregar ao gateway, o host ainda precisa descobrir o MAC do gateway via ARP.</li>\n    <li>O gateway recebe o frame local, remove o encapsulamento de Camada 2 e analisa o pacote IP.</li>\n    <li>O roteador consulta sua tabela de rotas e escolhe a rota mais específica compatível com o destino.</li>\n    <li>O TTL é decrementado. Se chegar a zero, o pacote é descartado e pode gerar ICMP Time Exceeded.</li>\n    <li>O roteador reencapsula o pacote em um novo frame de Camada 2 para o próximo salto.</li>\n    <li>O processo se repete até o pacote chegar à rede de destino ou ser descartado por rota ausente, política ou falha.</li>\n  </ol>\n  <p>Essa separação é essencial: o endereço IP de origem e destino normalmente permanece de ponta a ponta, enquanto os MACs mudam a cada enlace local.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura real, a Camada 3 aparece em roteadores, firewalls, gateways, interfaces virtuais, SVIs, route tables, VPNs, NAT gateways, peering de redes, links dedicados e malhas de conectividade entre ambientes.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Host:</strong> possui IP, máscara, gateway e rotas locais.</li>\n    <li><strong>Gateway padrão:</strong> primeiro roteador usado para destinos fora da rede local.</li>\n    <li><strong>Roteador/firewall:</strong> encaminha ou bloqueia pacotes entre redes.</li>\n    <li><strong>Route table:</strong> define quais destinos usam quais próximos saltos.</li>\n    <li><strong>Cloud:</strong> subnets, route tables, Internet Gateway, NAT Gateway, VPN Gateway e peering.</li>\n    <li><strong>Segurança:</strong> segmentação, ACLs, firewall, logs de fluxo e controle de rotas.</li>\n  </ul>\n  <p>A arquitetura de Camada 3 é onde conectividade e política começam a se encontrar. Um caminho pode existir tecnicamente, mas ser bloqueado por firewall, ACL, security group, NSG, NetworkPolicy ou regra de roteamento.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma cidade. A Camada 2 é como a entrega dentro de um prédio ou condomínio: você precisa saber a sala, o andar ou a mesa local. A Camada 3 é como o sistema de endereços, avenidas e rotas entre bairros, cidades e estados.</p>\n  <p>O gateway é a saída do condomínio. A tabela de rotas é o mapa usado para decidir qual estrada seguir. O TTL é como um limite de tentativas para evitar que uma entrega perdida fique circulando eternamente.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> pacotes não escolhem caminhos sozinhos como pessoas. Cada roteador toma uma decisão local baseada em sua tabela de rotas e políticas. Além disso, caminhos de ida e volta podem ser diferentes.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, seu notebook pode ter o IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. Quando você acessa outro dispositivo em <code>192.168.1.80</code>, o tráfego é local. Quando acessa <code>8.8.8.8</code>, o destino não está em <code>192.168.1.0/24</code>, então o notebook envia o pacote ao gateway.</p>\n  <p>O ponto importante é que o frame Ethernet local terá MAC de destino do roteador, mas o pacote IP terá destino <code>8.8.8.8</code>. O roteador recebe, remove o frame local, decrementa TTL e encaminha o pacote pelo próximo enlace.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, usuários, servidores, impressoras, voz, Wi-Fi corporativo, visitantes e gerenciamento normalmente ficam em redes diferentes. A comunicação entre elas depende de roteamento e política. Um usuário da VLAN administrativa pode acessar o sistema interno, mas a rede de visitantes não deve alcançar servidores.</p>\n  <p>Quando um sistema em uma filial não acessa o datacenter, o diagnóstico de Camada 3 pergunta: o IP está correto? A máscara está correta? O gateway responde? A rota para a rede remota existe? A rota de retorno existe? O firewall permite? A VPN anuncia essa rede? Há NAT no caminho?</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, a Camada 3 aparece em VPC/VNet, subnets, route tables, gateways, peering, NAT Gateway, VPN Gateway, Transit Gateway, ExpressRoute, Direct Connect, Network Security Groups e firewalls gerenciados.</p>\n  <p>Um erro comum é criar uma máquina em uma subnet e assumir que ela terá internet ou acesso privado automaticamente. Em geral, ela precisa de rota para um gateway adequado e políticas permitindo o tráfego. Outro erro comum é criar peering entre redes, mas esquecer rotas, DNS privado ou regras de retorno.</p>\n  <div class=\"callout callout--warning\"><strong>Custo:</strong> em cloud, gateways NAT, firewalls gerenciados, tráfego entre zonas, VPNs, links dedicados e logs de fluxo podem gerar custo recorrente. Roteamento não é apenas desenho lógico: é também custo operacional e financeiro.</div>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, Camada 3 aparece quando pipelines precisam acessar registries privados, clusters Kubernetes, bancos internos, repositórios de artefatos, scanners de segurança, runners self-hosted ou ambientes segregados. Se uma pipeline falha com timeout, não basta culpar o código: pode faltar rota, gateway, regra de firewall ou resolução entre redes.</p>\n  <p>Infraestrutura como código deve declarar subnets, route tables, gateways, peering, security groups e rotas de retorno. Policy as code pode impedir rotas públicas indevidas, subnets expostas ou caminhos de rede que violem segmentação.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, Camada 3 é uma fronteira crítica para segmentação e controle de movimento lateral. Um atacante que compromete um host em uma rede tenta descobrir quais outras redes são alcançáveis. Por isso, rotas, gateways e firewalls internos importam tanto quanto endpoint protection.</p>\n  <table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n    <tr><td>Rede plana</td><td>Muitas sub-redes alcançáveis sem controle.</td><td>Movimento lateral amplo.</td><td>Segmentação, ACLs, firewall interno e menor privilégio.</td></tr>\n    <tr><td>Rota indevida</td><td>Subnet sensível acessível a partir de rede de usuários.</td><td>Exposição de serviços críticos.</td><td>Revisão de rotas, flow logs e gestão de mudanças.</td></tr>\n    <tr><td>TTL e traceroute expõem caminho</td><td>Saltos internos aparecem em diagnóstico.</td><td>Revelação parcial de topologia.</td><td>Sanitizar evidências e controlar exposição externa.</td></tr>\n    <tr><td>Rota de retorno ausente</td><td>Conexão sai, mas resposta não volta.</td><td>Falhas intermitentes e troubleshooting difícil.</td><td>Validar caminhos bidirecionais e logs.</td></tr>\n  </tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m02l05-title m02l05-desc\">\n    <title id=\"m02l05-title\">Camada 3: IP, roteamento, gateway e TTL</title>\n    <desc id=\"m02l05-desc\">Um host envia pacote IP para outra rede usando gateway, roteador, tabela de rotas e redução de TTL a cada salto.</desc>\n    <defs>\n      <marker id=\"m02l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n\n    <rect x=\"35\" y=\"80\" width=\"250\" height=\"330\" rx=\"18\" class=\"svg-zone\"></rect>\n    <text x=\"160\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">Rede local 192.168.10.0/24</text>\n\n    <rect x=\"70\" y=\"165\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"145\" y=\"195\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n    <text x=\"145\" y=\"217\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.50</text>\n\n    <rect x=\"90\" y=\"295\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"165\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"165\" y=\"348\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2</text>\n\n    <rect x=\"350\" y=\"180\" width=\"165\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"432\" y=\"214\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n    <text x=\"432\" y=\"238\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1</text>\n    <text x=\"432\" y=\"260\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rota default</text>\n\n    <rect x=\"590\" y=\"170\" width=\"165\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"672\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text>\n    <text x=\"672\" y=\"229\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela de rotas</text>\n    <text x=\"672\" y=\"252\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TTL -1</text>\n\n    <rect x=\"805\" y=\"145\" width=\"135\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"872\" y=\"179\" text-anchor=\"middle\" class=\"svg-label\">Servidor</text>\n    <text x=\"872\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">203.0.113.20</text>\n\n    <line x1=\"220\" y1=\"200\" x2=\"350\" y2=\"222\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"515\" y1=\"225\" x2=\"590\" y2=\"225\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"755\" y1=\"218\" x2=\"805\" y2=\"195\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n\n    <line x1=\"805\" y1=\"215\" x2=\"755\" y2=\"245\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"590\" y1=\"252\" x2=\"515\" y2=\"252\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n    <line x1=\"350\" y1=\"250\" x2=\"220\" y2=\"220\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l05-arrow)\"></line>\n\n    <rect x=\"330\" y=\"340\" width=\"450\" height=\"145\" rx=\"16\" class=\"content-card\"></rect>\n    <text x=\"555\" y=\"370\" text-anchor=\"middle\" class=\"svg-label\">Decisões da Camada 3</text>\n    <text x=\"360\" y=\"402\" class=\"svg-label svg-label--small\">1. Destino está na minha rede?</text>\n    <text x=\"360\" y=\"428\" class=\"svg-label svg-label--small\">2. Se não estiver, qual é o próximo salto?</text>\n    <text x=\"360\" y=\"454\" class=\"svg-label svg-label--small\">3. Qual rota da tabela combina melhor?</text>\n    <text x=\"360\" y=\"480\" class=\"svg-label svg-label--small\">4. Reduzir TTL e encaminhar ou descartar.</text>\n\n    <text x=\"145\" y=\"455\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 2 entrega ao MAC do gateway.</text>\n    <text x=\"650\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Camada 3 escolhe caminhos entre redes.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula ensina a coletar evidências de Camada 3 sem alterar a rede: IP, máscara, gateway, rota default, tabela de rotas, caminho por traceroute/tracert e interpretação de TTL.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam a diferença entre rede local, gateway, rota, TTL e caminho entre redes.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você receberá um cenário em que hosts de uma filial acessam internet, mas não alcançam um sistema no datacenter. A tarefa será montar hipóteses de Camada 3 e evidências para validar cada uma.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como separar falhas de IP local, gateway, rota, caminho, firewall, NAT e rota de retorno.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> Camada 3 permite comunicação entre redes diferentes.</li>\n    <li><strong>O que lembrar:</strong> MAC muda a cada enlace; IP representa origem e destino lógico.</li>\n    <li><strong>Erro comum:</strong> achar que pingar o gateway prova que a internet ou rede remota está funcional.</li>\n    <li><strong>Uso real:</strong> diagnóstico de gateway, rotas, VPN, cloud, firewall e caminho entre redes.</li>\n    <li><strong>Segurança:</strong> rotas definem alcance; alcance sem política aumenta movimento lateral.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você estudará a Camada 4 — Transporte: TCP, UDP, portas e conexões. Depois de entender como pacotes encontram redes e gateways, veremos como aplicações usam portas, sessões e conexões para conversar de forma confiável ou rápida.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3"
    ],
    "tcpIpLayers": [
      "Internet"
    ],
    "relatedProtocols": [
      "IPv4",
      "IPv6",
      "ICMP",
      "ARP",
      "OSPF",
      "BGP"
    ],
    "dependsOn": [
      "Camada 1",
      "Camada 2",
      "encapsulamento",
      "frames",
      "MAC",
      "ARP",
      "métricas"
    ],
    "enables": [
      "roteamento",
      "gateway padrão",
      "traceroute",
      "NAT",
      "VPN",
      "firewall",
      "cloud networking",
      "TCP",
      "UDP"
    ]
  },
  "protocolFields": [
    {
      "field": "Source IP",
      "size": "32 bits no IPv4",
      "purpose": "Identificar o endereço lógico de origem do pacote.",
      "securityObservation": "Pode ser falsificado em alguns cenários; filtros anti-spoofing e roteamento correto reduzem risco."
    },
    {
      "field": "Destination IP",
      "size": "32 bits no IPv4",
      "purpose": "Identificar o endereço lógico de destino usado para decisão de rota.",
      "securityObservation": "Políticas de firewall e roteamento normalmente avaliam esse campo."
    },
    {
      "field": "TTL",
      "size": "8 bits no IPv4",
      "purpose": "Limitar a vida do pacote e evitar loops infinitos.",
      "securityObservation": "Ajuda diagnóstico com traceroute, mas também pode revelar parte do caminho."
    },
    {
      "field": "Protocol",
      "size": "8 bits no IPv4",
      "purpose": "Indicar o protocolo de camada superior, como TCP, UDP ou ICMP.",
      "securityObservation": "Útil em filtros, logs e investigação de tráfego."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Compara destino com a própria rede.",
      "detail": "Aplica máscara ao IP local e ao IP de destino.",
      "possibleFailure": "Máscara incorreta faz o host tratar destino remoto como local ou destino local como remoto."
    },
    {
      "step": 2,
      "actor": "Host",
      "action": "Escolhe entrega local ou gateway.",
      "detail": "Destino fora da rede local usa rota default para o gateway.",
      "possibleFailure": "Gateway ausente ou incorreto impede saída da rede local."
    },
    {
      "step": 3,
      "actor": "Gateway",
      "action": "Consulta tabela de rotas.",
      "detail": "Escolhe a rota mais específica para o destino.",
      "possibleFailure": "Rota ausente ou rota errada envia tráfego para caminho indevido."
    },
    {
      "step": 4,
      "actor": "Roteador",
      "action": "Decrementa TTL e encaminha.",
      "detail": "Se TTL chegar a zero, descarta e pode retornar ICMP Time Exceeded.",
      "possibleFailure": "Loop de roteamento causa perda e respostas de TTL expirado."
    },
    {
      "step": 5,
      "actor": "Destino",
      "action": "Recebe pacote se caminho e políticas permitirem.",
      "detail": "A resposta precisa de rota de retorno.",
      "possibleFailure": "Rota de ida existe, mas rota de volta ou firewall de retorno falha."
    }
  ],
  "deepDive": {
    "mentalModel": "Camada 3 é o sistema de endereçamento e encaminhamento entre redes. Ela responde: o destino está local? Se não, qual próximo salto deve receber o pacote?",
    "keyTerms": [
      "IP",
      "máscara",
      "sub-rede",
      "gateway",
      "rota default",
      "tabela de rotas",
      "próximo salto",
      "TTL",
      "ICMP",
      "traceroute"
    ],
    "limitations": [
      "IP não garante entrega; isso será tratado na Camada 4 e acima.",
      "Roteamento não é autorização; alcançar uma rede não significa ter permissão de acesso.",
      "Traceroute pode ser bloqueado, assimétrico ou incompleto.",
      "Em cloud, parte do caminho físico é abstraída pelo provedor."
    ],
    "whenToUse": [
      "Diagnosticar falhas entre redes, filiais, VPNs, cloud e datacenter.",
      "Planejar sub-redes, gateways, rotas e segmentação.",
      "Interpretar traceroute, route print, ip route e show ip route.",
      "Investigar movimento lateral e alcance indevido entre segmentos."
    ],
    "whenNotToUse": [
      "Para diagnosticar problemas puramente de credencial, autorização ou aplicação sem validar camadas inferiores.",
      "Como substituto de firewall, IAM ou política de acesso.",
      "Para executar varreduras agressivas em redes sem autorização."
    ],
    "operationalImpact": [
      "Rotas precisam de documentação e controle de mudanças.",
      "Erros de gateway e máscara geram chamados difíceis de diagnosticar.",
      "Ambientes híbridos exigem validação de rota de ida e volta.",
      "Logs de fluxo e tabelas de rota são evidências essenciais."
    ],
    "financialImpact": [
      "Gateways gerenciados, NAT, VPN, firewalls e links dedicados podem ter custo recorrente.",
      "Rotas indevidas podem gerar tráfego entre zonas/regiões e aumentar cobrança.",
      "Observabilidade de rede aumenta custo de armazenamento de logs.",
      "Falhas de rota podem gerar indisponibilidade e custo operacional."
    ],
    "securityImpact": [
      "Rotas ampliam ou limitam alcance lateral.",
      "Segmentação sem política é insuficiente.",
      "Rotas públicas indevidas expõem sistemas.",
      "Logs de flow e revisão de route tables ajudam detectar abuso."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que pingar o gateway prova que a internet funciona.",
      "whyItHappens": "O gateway é o primeiro salto e costuma responder mesmo quando rotas externas falham.",
      "consequence": "Diagnóstico para cedo demais e ignora rota, DNS, firewall ou destino.",
      "correction": "Validar gateway, rota, caminho, DNS, porta e aplicação em etapas."
    },
    {
      "mistake": "Confundir gateway com DNS.",
      "whyItHappens": "Ambos aparecem juntos na configuração de rede.",
      "consequence": "Troca DNS quando o problema é rota, ou troca gateway quando o problema é nome.",
      "correction": "Gateway encaminha tráfego; DNS traduz nomes."
    },
    {
      "mistake": "Esquecer rota de retorno.",
      "whyItHappens": "O teste costuma focar apenas no caminho de ida.",
      "consequence": "Pacotes chegam ao destino, mas resposta não volta.",
      "correction": "Validar rotas e políticas nos dois sentidos."
    },
    {
      "mistake": "Tratar traceroute como mapa absoluto.",
      "whyItHappens": "A saída parece listar o caminho completo.",
      "consequence": "Ignora bloqueios de ICMP, assimetria e dispositivos que não respondem.",
      "correction": "Usar traceroute como evidência parcial, não como verdade única."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host acessa rede local, mas não acessa internet.",
      "Ping no gateway funciona, mas rede remota não responde.",
      "VPN conecta, mas sistemas internos não abrem.",
      "Traceroute para em determinado salto.",
      "Cloud VM não acessa internet ou rede pareada."
    ],
    "diagnosticQuestions": [
      "IP e máscara estão corretos?",
      "Gateway padrão existe e responde?",
      "A rota para o destino existe?",
      "Há rota de retorno?",
      "Firewall, ACL, SG ou NSG permite o fluxo?",
      "NAT é necessário no caminho?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print",
        "purpose": "Ver IP, máscara, gateway, DNS e tabela de rotas.",
        "expectedObservation": "Interface com IPv4, máscara e gateway; rota default 0.0.0.0/0 apontando para o gateway.",
        "interpretation": "Sem gateway ou rota default, o host pode ficar preso à rede local."
      },
      {
        "platform": "Windows",
        "command": "tracert 8.8.8.8",
        "purpose": "Observar saltos até um destino externo.",
        "expectedObservation": "Primeiro salto geralmente é o gateway local.",
        "interpretation": "Falha no primeiro salto indica problema local/gateway; falha depois pode indicar rota, firewall ou provedor."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route",
        "purpose": "Ver endereços, máscaras e rotas configuradas.",
        "expectedObservation": "Rota default via gateway apropriado.",
        "interpretation": "A ausência de default via impede saída para destinos fora das rotas conhecidas."
      },
      {
        "platform": "Linux",
        "command": "traceroute 8.8.8.8 || tracepath 8.8.8.8",
        "purpose": "Observar caminho e possíveis limites de MTU/rota.",
        "expectedObservation": "Lista de saltos ou ponto de parada.",
        "interpretation": "A saída é evidência parcial e pode ser filtrada por dispositivos."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief && show ip route",
        "purpose": "Ver interfaces, IPs, estado e tabela de rotas.",
        "expectedObservation": "Interfaces up/up e rotas conectadas, estáticas ou dinâmicas.",
        "interpretation": "Interface down, rota ausente ou rota errada afetam alcance entre redes."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não pinga o gateway",
        "then": "Revisar Camada 1, Camada 2, IP, máscara e VLAN antes de culpar roteamento externo."
      },
      {
        "if": "Gateway responde, mas destino externo não",
        "then": "Verificar rota default, firewall, NAT e caminho upstream."
      },
      {
        "if": "Destino recebe, mas resposta não volta",
        "then": "Verificar rota de retorno, NAT, firewall stateful e políticas no sentido inverso."
      },
      {
        "if": "Traceroute mostra loop ou TTL expirado",
        "then": "Investigar rotas conflitantes, redistribuição incorreta ou rota default circular."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar sub-redes, gateways, rotas e responsáveis.",
      "Aplicar segmentação por função e criticidade.",
      "Usar firewall/ACL entre redes sensíveis.",
      "Habilitar logs de fluxo quando possível.",
      "Revisar route tables em mudanças de cloud e VPN.",
      "Sanitizar traceroutes e tabelas de rota antes de compartilhar."
    ],
    "badPractices": [
      "Criar rotas amplas sem justificativa.",
      "Permitir any-any entre segmentos internos.",
      "Assumir que rede interna é confiável.",
      "Expor subnets diretamente à internet por erro de rota.",
      "Ignorar rota de retorno em projetos híbridos."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Achar que NAT é firewall.",
      "Diagnosticar DNS antes de validar gateway e rota.",
      "Usar traceroute como única evidência."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por alcance excessivo",
        "description": "Redes internas com rotas permissivas permitem que um host comprometido alcance muitos segmentos.",
        "defensiveExplanation": "O risco não é apenas a existência da rota, mas a ausência de política e monitoramento entre redes.",
        "mitigation": "Segmentação, firewall interno, ACLs, logs de fluxo, menor privilégio e revisão de rotas."
      },
      {
        "name": "Exposição pública por rota indevida",
        "description": "Uma subnet ou instância pode ganhar saída/entrada pública por rota para gateway de internet sem controles adequados.",
        "defensiveExplanation": "Em cloud, route tables e security groups precisam ser avaliados em conjunto.",
        "mitigation": "Revisões de IaC, policy as code, configuração privada por padrão e alertas de exposição."
      }
    ],
    "monitoring": [
      "Flow logs entre sub-redes.",
      "Alterações de route table.",
      "Aumento de conexões entre segmentos incomuns.",
      "Traceroutes ou ICMP incomum em redes internas.",
      "Logs de firewall e VPN."
    ],
    "hardening": [
      "Aplicar menor privilégio de rede.",
      "Remover rotas desnecessárias.",
      "Bloquear tráfego lateral não justificado.",
      "Usar bastion, private endpoints e ZTNA quando adequado.",
      "Controlar quem pode alterar route tables e gateways."
    ],
    "detectionIdeas": [
      "Comparar fluxos reais com matriz de comunicação esperada.",
      "Alertar sobre novas rotas para 0.0.0.0/0 em subnets sensíveis.",
      "Detectar varreduras entre redes.",
      "Monitorar falhas ICMP TTL exceeded repetidas."
    ]
  },
  "lab": {
    "id": "lab-2.5",
    "title": "Coletando evidências de Camada 3: IP, gateway, rotas e TTL",
    "labType": "cloud",
    "objective": "Identificar configuração IP, gateway, tabela de rotas e caminho básico até um destino externo ou interno, interpretando evidências sem alterar a rede.",
    "scenario": "Você está em um notebook de trabalho ou laboratório e precisa montar um relatório defensivo de Camada 3 para diferenciar problema local, gateway, rota e caminho.",
    "topology": "Host do aluno -> switch/AP -> gateway local -> roteador/firewall/provedor -> destino de teste.",
    "architecture": "Rede local com host configurado por DHCP ou IP estático, gateway padrão e acesso a pelo menos um destino de teste permitido.",
    "prerequisites": [
      "Ter concluído as aulas 2.1 a 2.4.",
      "Ter permissão para executar comandos locais de diagnóstico.",
      "Não executar varreduras ou testes agressivos."
    ],
    "tools": [
      "Windows PowerShell ou Prompt",
      "Terminal Linux",
      "Opcional: Cisco Packet Tracer",
      "Editor de texto para relatório"
    ],
    "estimatedTimeMinutes": 120,
    "cost": "zero",
    "safetyNotes": [
      "Use apenas destinos próprios, públicos de teste ou autorizados.",
      "Não compartilhe IPs públicos, nomes internos, rotas privadas ou evidências sem sanitização.",
      "Não execute scan de portas ou descoberta agressiva neste laboratório.",
      "Em ambiente corporativo, siga a política interna de coleta de evidências.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Coletar IP, máscara e gateway no Windows",
        "instruction": "No Windows, colete a configuração IP e identifique IPv4, máscara, gateway e DNS.",
        "command": "ipconfig /all",
        "expectedOutput": "Interface ativa com IPv4, máscara de sub-rede, gateway padrão e servidores DNS.",
        "explanation": "Esses dados indicam se o host tem configuração mínima de Camada 3 para sair da rede local."
      },
      {
        "number": 2,
        "title": "Coletar IP e rotas no Linux",
        "instruction": "No Linux, colete endereços e rotas.",
        "command": "ip addr\nip route",
        "expectedOutput": "Endereço IP na interface ativa e rota default via gateway.",
        "explanation": "A rota default mostra para onde o tráfego fora das redes conhecidas será enviado."
      },
      {
        "number": 3,
        "title": "Testar alcance do gateway",
        "instruction": "Pingue o gateway identificado, quando ICMP for permitido.",
        "command": "ping <IP_DO_GATEWAY>",
        "expectedOutput": "Respostas com baixa latência ou indicação de bloqueio se ICMP for filtrado.",
        "explanation": "Se o gateway não responde, investigue Camada 1/2, IP, máscara, VLAN ou política local."
      },
      {
        "number": 4,
        "title": "Ver tabela de rotas",
        "instruction": "Liste a tabela de rotas do host.",
        "command": "route print  # Windows\nip route    # Linux",
        "expectedOutput": "Rota default e rotas conectadas.",
        "explanation": "A tabela de rotas determina qual próximo salto será usado para cada destino."
      },
      {
        "number": 5,
        "title": "Observar caminho por TTL",
        "instruction": "Execute traceroute/tracert para um destino permitido.",
        "command": "tracert 8.8.8.8        # Windows\ntraceroute 8.8.8.8     # Linux, se instalado\ntracepath 8.8.8.8      # Linux, alternativa comum",
        "expectedOutput": "Lista de saltos ou pontos de filtragem.",
        "explanation": "Cada salto normalmente representa um roteador que decrementou TTL e retornou uma mensagem de tempo excedido."
      },
      {
        "number": 6,
        "title": "Registrar interpretação",
        "instruction": "Monte uma tabela com evidência, camada, interpretação e hipótese descartada.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Relatório com IP, gateway, rota default, teste de gateway e caminho observado.",
        "explanation": "O objetivo é aprender a transformar comandos em raciocínio técnico, não apenas colar outputs."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um relatório sanitizado de Camada 3 com IP, máscara, gateway, rota default, teste de caminho e hipóteses de diagnóstico.",
    "validation": [
      {
        "check": "Gateway identificado",
        "command": "ipconfig /all ou ip route",
        "expected": "Gateway padrão/default via presente.",
        "ifFails": "Verificar DHCP, IP estático, interface ativa ou política da rede."
      },
      {
        "check": "Rota default presente",
        "command": "route print ou ip route",
        "expected": "0.0.0.0/0 ou default via gateway.",
        "ifFails": "Sem rota default, o host pode não alcançar destinos externos."
      },
      {
        "check": "Caminho observado",
        "command": "tracert/traceroute/tracepath",
        "expected": "Primeiro salto ou indicação de filtragem.",
        "ifFails": "ICMP pode estar bloqueado; usar evidência alternativa e registrar limite."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Gateway não responde",
        "probableCause": "VLAN errada, gateway filtrando ICMP, IP/máscara incorretos ou falha local.",
        "howToConfirm": "Verificar IP, máscara, ARP, rota e conectividade local.",
        "fix": "Corrigir configuração, trocar porta/VLAN autorizada ou acionar rede."
      },
      {
        "symptom": "Traceroute para no primeiro salto",
        "probableCause": "Gateway sem rota, firewall, NAT ausente ou política upstream.",
        "howToConfirm": "Testar outros destinos e verificar rota default/firewall.",
        "fix": "Corrigir rota, NAT ou política conforme autorização."
      },
      {
        "symptom": "Traceroute mostra asteriscos",
        "probableCause": "Dispositivo não responde ICMP/UDP TTL exceeded ou filtra diagnóstico.",
        "howToConfirm": "Testar com outro protocolo ou validar logs.",
        "fix": "Registrar limitação; não assumir indisponibilidade apenas por asteriscos."
      }
    ],
    "improvements": [
      "Repetir o teste em rede cabeada e Wi-Fi para comparar caminhos.",
      "Adicionar medição de latência média e perda.",
      "Criar diagrama do caminho lógico.",
      "Comparar com route table de cloud ou laboratório Packet Tracer."
    ],
    "evidenceToCollect": [
      "IP e máscara sanitizados.",
      "Gateway padrão.",
      "Rota default.",
      "Resultado do teste ao gateway.",
      "Traceroute/tracert sanitizado.",
      "Interpretação em tabela."
    ],
    "questions": [
      "Qual evidência mostra que o host tem rota para fora da rede local?",
      "Por que o primeiro salto costuma ser o gateway?",
      "Por que traceroute pode estar incompleto mesmo quando a aplicação funciona?",
      "O que mudaria em uma VPN com split tunneling?"
    ],
    "challenge": "Explique por que uma VM em cloud com IP privado pode não acessar a internet mesmo tendo DNS configurado.",
    "solution": "DNS apenas traduz nomes. Para sair para a internet, a VM precisa de rota adequada para NAT Gateway, firewall ou Internet Gateway, além de políticas permitindo o tráfego e rota de retorno. Em subnets privadas, a ausência de NAT/rota ou bloqueio por security group/NSG impede o acesso."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que a Camada 3 precisou existir se a Camada 2 já entrega quadros?",
      "hints": [
        "Pense em redes diferentes.",
        "Pense em broadcast e escala."
      ],
      "expectedIdeas": [
        "endereçamento lógico",
        "roteamento",
        "gateway",
        "escala",
        "internet"
      ],
      "explanation": "Camada 2 resolve entrega local; Camada 3 permite atravessar redes diferentes de forma hierárquica."
    },
    {
      "type": "diagnóstico",
      "question": "Um host pinga o gateway, mas não acessa uma rede remota. O que você verificaria em seguida?",
      "hints": [
        "Pense em rota default.",
        "Pense em rota de retorno e firewall."
      ],
      "expectedIdeas": [
        "route print/ip route",
        "traceroute",
        "firewall",
        "NAT",
        "rota de retorno"
      ],
      "explanation": "O gateway local responder não prova que existe caminho completo até a rede remota."
    },
    {
      "type": "cenário real",
      "question": "Em cloud, uma subnet privada precisa acessar atualizações na internet. Quais componentes de Camada 3 e política você procuraria?",
      "hints": [
        "Pense em route table.",
        "Pense em NAT e security group."
      ],
      "expectedIdeas": [
        "rota default",
        "NAT Gateway",
        "firewall",
        "SG/NSG",
        "logs",
        "custo"
      ],
      "explanation": "Acesso externo em cloud depende de rota, gateway/NAT e regras, não apenas do IP da VM."
    }
  ],
  "quiz": [
    {
      "id": "q2.5.1",
      "type": "conceito",
      "q": "Qual é a principal função da Camada 3 no Modelo OSI?",
      "opts": [
        "Encaminhar pacotes entre redes usando endereçamento lógico.",
        "Transmitir sinais elétricos no cabo.",
        "Criptografar senhas de usuários.",
        "Traduzir nomes DNS em IPs."
      ],
      "a": 0,
      "exp": "A Camada 3 trata endereçamento lógico e roteamento entre redes.",
      "difficulty": "iniciante",
      "topic": "camada 3"
    },
    {
      "id": "q2.5.2",
      "type": "diagnóstico",
      "q": "Um host acessa outro dispositivo na mesma LAN, mas não acessa a internet. Qual item de Camada 3 deve ser verificado cedo?",
      "opts": [
        "Gateway padrão e rota default.",
        "Tipo de fonte do monitor.",
        "Somente layout do teclado.",
        "Apenas codificação UTF-8."
      ],
      "a": 0,
      "exp": "Sem gateway/rota default, o host pode ficar limitado à rede local.",
      "difficulty": "iniciante",
      "topic": "gateway"
    },
    {
      "id": "q2.5.3",
      "type": "comparação",
      "q": "Qual afirmação diferencia MAC e IP corretamente?",
      "opts": [
        "MAC é usado na entrega local de Camada 2; IP é usado no endereçamento lógico de Camada 3.",
        "IP sempre substitui MAC dentro da LAN.",
        "MAC roteia pacotes pela internet.",
        "IP existe apenas em Wi-Fi."
      ],
      "a": 0,
      "exp": "MAC e IP têm papéis diferentes e coexistem no encapsulamento.",
      "difficulty": "iniciante",
      "topic": "mac vs ip"
    },
    {
      "id": "q2.5.4",
      "type": "segurança",
      "q": "Por que uma rede plana com rotas amplas aumenta risco?",
      "opts": [
        "Porque facilita movimento lateral entre segmentos.",
        "Porque reduz todos os endereços MAC.",
        "Porque impede qualquer broadcast.",
        "Porque elimina a necessidade de logs."
      ],
      "a": 0,
      "exp": "Quanto maior o alcance sem controle, maior o impacto potencial de um comprometimento.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q2.5.5",
      "type": "comando",
      "q": "Qual comando Linux mostra rotas do host?",
      "opts": [
        "ip route",
        "lsusb",
        "whoami",
        "cat /etc/hosts apenas"
      ],
      "a": 0,
      "exp": "ip route mostra tabela de rotas no Linux.",
      "difficulty": "iniciante",
      "topic": "linux"
    },
    {
      "id": "q2.5.6",
      "type": "diagnóstico",
      "q": "O que o TTL ajuda a evitar?",
      "opts": [
        "Pacotes circulando indefinidamente em loops de roteamento.",
        "Erros de digitação em senhas.",
        "Criação de VLANs.",
        "Conversão de UTF-8 para Base64."
      ],
      "a": 0,
      "exp": "TTL limita a vida do pacote; cada roteador decrementa o valor.",
      "difficulty": "iniciante",
      "topic": "ttl"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.5.1",
      "front": "O que é gateway padrão?",
      "back": "É o próximo salto usado por um host para alcançar destinos fora da rede local.",
      "tags": [
        "gateway",
        "camada 3"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.2",
      "front": "O que a tabela de rotas decide?",
      "back": "Ela decide qual próximo salto ou interface usar para alcançar um destino IP.",
      "tags": [
        "rotas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.3",
      "front": "O que é TTL?",
      "back": "É um campo que limita a vida do pacote; cada roteador decrementa seu valor.",
      "tags": [
        "ttl",
        "ip"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.4",
      "front": "MAC muda a cada salto roteado?",
      "back": "Sim, o encapsulamento de Camada 2 muda a cada enlace; IP de origem/destino normalmente permanece.",
      "tags": [
        "mac",
        "ip"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.5.5",
      "front": "DNS resolve problema de rota?",
      "back": "Não. DNS traduz nomes; rota/gateway determinam caminho de rede.",
      "tags": [
        "dns",
        "roteamento"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.5.6",
      "front": "Conectividade é autorização?",
      "back": "Não. Alcançar uma rede não significa ter permissão para acessar serviços.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex2.5.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras por que a Camada 3 é necessária mesmo existindo switches.",
      "expectedAnswer": "Switches entregam quadros localmente; Camada 3 permite endereçamento lógico e roteamento entre redes diferentes.",
      "explanation": "A resposta deve separar entrega local de encaminhamento entre redes."
    },
    {
      "id": "ex2.5.2",
      "type": "diagnóstico",
      "prompt": "Um host tem IP 192.168.10.50/24 e quer acessar 192.168.20.10. O destino é local? O que o host deve usar?",
      "expectedAnswer": "Não é local, pois está em outra rede /24. O host deve enviar ao gateway padrão.",
      "explanation": "192.168.10.0/24 e 192.168.20.0/24 são redes diferentes."
    },
    {
      "id": "ex2.5.3",
      "type": "comando/output",
      "prompt": "Qual comando você usaria no Windows para ver gateway e tabela de rotas?",
      "expectedAnswer": "ipconfig /all para gateway e route print para tabela de rotas.",
      "explanation": "Esses comandos mostram evidências de Camada 3 local."
    },
    {
      "id": "ex2.5.4",
      "type": "segurança",
      "prompt": "Liste duas mitigações para reduzir movimento lateral por rotas amplas.",
      "expectedAnswer": "Segmentação por sub-redes, firewall interno/ACLs, menor privilégio de rede, logs de fluxo e revisão de rotas.",
      "explanation": "Roteamento precisa ser combinado com política e monitoramento."
    }
  ],
  "challenge": {
    "title": "Filial acessa internet, mas não acessa sistema no datacenter",
    "scenario": "Uma filial usa a rede 10.20.10.0/24. Os usuários acessam a internet normalmente, mas não conseguem acessar o sistema 10.50.30.20 no datacenter. O gateway local responde. O DNS resolve o nome do sistema para o IP correto.",
    "tasks": [
      "Listar hipóteses de Camada 3 em ordem lógica.",
      "Indicar comandos ou evidências para validar cada hipótese.",
      "Separar problema de rota, firewall, NAT e rota de retorno.",
      "Propor mitigação operacional e melhoria de documentação."
    ],
    "constraints": [
      "Não executar varredura de portas.",
      "Não alterar configuração de roteadores ou firewalls.",
      "Sanitizar evidências antes de compartilhar.",
      "Trabalhar apenas com comandos de diagnóstico autorizados."
    ],
    "expectedDeliverables": [
      "Tabela de hipóteses e evidências.",
      "Diagrama lógico simples do caminho.",
      "Lista de comandos.",
      "Resumo executivo para equipe de rede/segurança."
    ],
    "gradingRubric": [
      {
        "criterion": "Ordem de diagnóstico",
        "points": 30,
        "description": "Verifica IP local, gateway, rota, caminho, firewall e retorno sem pular etapas."
      },
      {
        "criterion": "Evidências corretas",
        "points": 30,
        "description": "Usa route print/ip route, traceroute e logs adequados."
      },
      {
        "criterion": "Segurança e ética",
        "points": 20,
        "description": "Evita scans e sanitiza informações."
      },
      {
        "criterion": "Clareza do relatório",
        "points": 20,
        "description": "Comunica achados e próximos passos de forma objetiva."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Como internet funciona e DNS resolve, a falha provavelmente está no caminho específico para 10.50.30.20, em política ou em retorno. O diagnóstico deve validar primeiro se a filial possui rota para 10.50.30.0/24 ou rota via VPN/MPLS, depois onde o caminho para, e então se firewall/NAT/retorno bloqueiam.",
    "steps": [
      "Confirmar IP, máscara e gateway do host.",
      "Verificar tabela de rotas local.",
      "Executar traceroute/tracert para 10.50.30.20 se autorizado.",
      "Validar se gateway/firewall da filial conhece a rota para o datacenter.",
      "Validar rota de retorno do datacenter para 10.20.10.0/24.",
      "Checar políticas de firewall/ACL entre filial e datacenter.",
      "Registrar evidências sanitizadas e encaminhar para equipe responsável."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Trocar DNS imediatamente.",
        "whyItIsWrong": "O enunciado diz que DNS resolve corretamente; o problema está depois da tradução de nome."
      },
      {
        "answer": "Concluir que o servidor está fora sem validar rota.",
        "whyItIsWrong": "A falha pode estar em caminho, firewall ou retorno."
      },
      {
        "answer": "Fazer scan agressivo no datacenter.",
        "whyItIsWrong": "Além de não ser necessário, pode violar política e gerar alerta de segurança."
      }
    ],
    "finalAnswer": "A hipótese principal é falha de rota/política entre a rede 10.20.10.0/24 e o datacenter 10.50.30.0/24, incluindo rota ausente, firewall bloqueando ou rota de retorno inexistente. A solução é coletar evidências de Camada 3, validar caminho e acionar a equipe responsável com relatório claro."
  },
  "glossary": [
    {
      "term": "Camada 3",
      "shortDefinition": "Camada de rede responsável por endereçamento lógico e encaminhamento entre redes.",
      "longDefinition": "No Modelo OSI, a Camada 3 organiza a comunicação entre redes usando endereços lógicos, roteamento e controle de vida de pacotes.",
      "example": "IPv4 encaminhado de uma LAN para a internet via gateway.",
      "relatedTerms": [
        "IP",
        "roteamento",
        "gateway"
      ],
      "relatedLessons": [
        "2.1",
        "2.2",
        "2.5"
      ]
    },
    {
      "term": "Gateway padrão",
      "shortDefinition": "Próximo salto usado para destinos fora da rede local.",
      "longDefinition": "É o roteador configurado em um host para encaminhar tráfego que não pertence às redes diretamente conectadas.",
      "example": "192.168.1.1 em uma rede doméstica.",
      "relatedTerms": [
        "rota default",
        "roteador"
      ],
      "relatedLessons": [
        "1.9",
        "2.5"
      ]
    },
    {
      "term": "Tabela de rotas",
      "shortDefinition": "Conjunto de destinos e próximos saltos usados para encaminhamento.",
      "longDefinition": "Tabela consultada por hosts e roteadores para escolher interface ou próximo salto para um destino IP.",
      "example": "default via 192.168.1.1 no Linux.",
      "relatedTerms": [
        "route print",
        "ip route"
      ],
      "relatedLessons": [
        "2.5"
      ]
    },
    {
      "term": "TTL",
      "shortDefinition": "Campo que limita a vida de um pacote IP.",
      "longDefinition": "Cada roteador decrementa o TTL. Quando chega a zero, o pacote é descartado, evitando loops infinitos.",
      "example": "Traceroute explora TTL para descobrir saltos.",
      "relatedTerms": [
        "ICMP",
        "traceroute"
      ],
      "relatedLessons": [
        "2.5"
      ]
    },
    {
      "term": "Rota default",
      "shortDefinition": "Rota usada quando nenhuma rota mais específica combina com o destino.",
      "longDefinition": "Normalmente aponta para o gateway padrão e permite saída para redes externas.",
      "example": "0.0.0.0/0 via 192.168.1.1.",
      "relatedTerms": [
        "gateway",
        "default via"
      ],
      "relatedLessons": [
        "2.5"
      ]
    },
    {
      "term": "Próximo salto",
      "shortDefinition": "Roteador ou gateway para onde o pacote será enviado em seguida.",
      "longDefinition": "Em cada etapa do roteamento, o dispositivo decide o próximo salto com base na tabela de rotas.",
      "example": "Um firewall pode ser o próximo salto para redes remotas.",
      "relatedTerms": [
        "roteamento",
        "gateway"
      ],
      "relatedLessons": [
        "2.5"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.2 Encapsulamento, desencapsulamento e PDUs",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para entender pacote como PDU de Camada 3."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.4 Camada 2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para diferenciar entrega local por MAC e encaminhamento por IP."
    },
    {
      "type": "rfc",
      "title": "Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Referência histórica do IPv4."
    },
    {
      "type": "rfc",
      "title": "Internet Control Message Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc792",
      "note": "Base conceitual para mensagens ICMP usadas em diagnóstico."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud Networking",
      "lesson": "subnets-route-tables",
      "reason": "Route tables, gateways e peering em cloud dependem do raciocínio de Camada 3."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso entre serviços",
      "lesson": "service-to-service-connectivity",
      "reason": "Conectividade de rede não substitui autenticação/autorização, mas é pré-requisito para muitos fluxos de identidade."
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
      "2.6"
    ]
  }
};
