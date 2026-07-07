export const lesson0309 = {
  "id": "3.9",
  "moduleId": "m03",
  "order": 9,
  "title": "Segurança em L2: ARP spoofing, MAC flooding e defesas",
  "subtitle": "Como proteger a rede local contra abusos de ARP, MAC, VLAN, portas físicas e mecanismos de switch.",
  "duration": "90-130 min",
  "estimatedStudyTimeMinutes": 130,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 220,
  "tags": [
    "redes",
    "ethernet",
    "camada 2",
    "segurança",
    "arp",
    "mac flooding",
    "vlan",
    "switch",
    "nac",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.3",
      "reason": "É necessário entender aprendizado MAC, forwarding e flooding."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "ARP é um dos mecanismos centrais de risco e defesa em L2."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "VLANs são usadas como segmentação lógica de broadcast e precisam de configuração segura."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.8",
      "reason": "STP e controles associados reduzem risco de loops e storms."
    }
  ],
  "objectives": [
    "Explicar por que a Camada 2 é superfície crítica de segurança.",
    "Diferenciar ARP spoofing, MAC flooding, porta não autorizada, trunk indevido e loop de L2 em nível defensivo.",
    "Relacionar controles como port security, DHCP snooping, DAI, BPDU Guard, storm control, 802.1X e NAC.",
    "Interpretar evidências de switch, ARP, MAC table e logs sem executar ações ofensivas.",
    "Projetar uma matriz de riscos e defesas para uma LAN corporativa pequena."
  ],
  "learningOutcomes": [
    "Dado um sintoma de ARP inconsistente, o aluno lista hipóteses defensivas e evidências a coletar.",
    "Dado um switch com muitos MACs em uma porta, o aluno explica riscos e controles possíveis.",
    "Dado um desenho de VLANs, o aluno identifica trunks permissivos e portas sem controle.",
    "Dado um ambiente de acesso corporativo, o aluno propõe controles progressivos sem quebrar a operação.",
    "Dado um incidente de LAN, o aluno separa detecção, contenção, erradicação e prevenção."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Imagine que o time de segurança recebe alertas estranhos: o gateway da rede aparece com endereços MAC diferentes em momentos próximos, usuários reclamam de lentidão intermitente, um switch registra muitas mudanças de endereço MAC e alguns hosts parecem perder sessão com sistemas internos. Não há necessariamente um malware evidente no endpoint, nem uma queda física clara. O problema pode estar na Camada 2.</p>\n<p>Segurança em Camada 2 é frequentemente esquecida porque muita gente pensa que \"segurança de rede\" começa no firewall, na VPN, no WAF ou no IAM. Mas antes de um pacote chegar ao firewall, ele precisa sair da placa de rede, atravessar switches, VLANs, ARP, portas físicas e domínios de broadcast. Se essa base for fraca, controles de camadas superiores podem ficar expostos, contornados ou com visibilidade incompleta.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> uma LAN sem controles de Camada 2 pode permitir manipulação de ARP, abuso da tabela MAC, conexão de dispositivos não autorizados, loops, storms e movimentação lateral. O objetivo desta aula é entender os riscos de forma defensiva e aprender quais evidências e mitigações reduzem impacto.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>Ethernet nasceu em um contexto de redes locais colaborativas, com foco em conectividade. No início, o ambiente era mais simples: menos dispositivos, menos mobilidade, menos ameaças internas, menos automação e menor dependência de aplicações críticas. Com hubs e redes compartilhadas, qualquer dispositivo podia observar muito mais tráfego do que deveria. Com switches, a rede melhorou muito: cada porta passou a receber apenas o tráfego encaminhado para ela, além de broadcast, multicast e unknown unicast.</p>\n<p>Mas switches não foram criados originalmente como ferramentas completas de segurança. A tabela MAC aprende dinamicamente; ARP não autentica respostas; portas físicas podem receber qualquer dispositivo; VLANs segmentam broadcast, mas não são firewall; trunks mal configurados podem carregar VLANs demais; e uma rede plana facilita movimento lateral.</p>\n<p>Conforme as empresas passaram a depender de Active Directory, ERPs, VoIP, Wi-Fi corporativo, cloud híbrida, pipelines, Kubernetes on-premises e SOC, a Camada 2 virou parte essencial do desenho defensivo. Surgiram controles como port security, DHCP snooping, Dynamic ARP Inspection, IP Source Guard, BPDU Guard, Root Guard, storm control, 802.1X, NAC e monitoramento de MAC flapping.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema de segurança em L2 é que muitos mecanismos da LAN confiam em comportamento local. O switch aprende MACs automaticamente. O ARP aceita respostas para associar IP a MAC. A porta física muitas vezes fica ativa sem autenticação. Broadcast alcança todos os hosts da VLAN. Essas características facilitam operação, mas criam riscos quando não há controles.</p>\n<ul class=\"flow-list\"><li><strong>ARP spoofing:</strong> manipulação defensivamente conhecida como envenenamento ARP, onde associações IP-MAC incorretas podem levar tráfego ao destino errado.</li><li><strong>MAC flooding:</strong> excesso de MACs falsos ou anômalos pode pressionar a tabela CAM do switch e gerar comportamento inseguro ou instável.</li><li><strong>Portas não controladas:</strong> qualquer dispositivo conectado pode ganhar acesso físico à LAN.</li><li><strong>VLANs mal configuradas:</strong> trunks permissivos, VLAN padrão e native VLAN indevida ampliam risco.</li><li><strong>Loops e storms:</strong> falhas de STP ou conexões indevidas podem causar indisponibilidade.</li></ul>\n<p>O objetivo não é ensinar ataque. O objetivo é reconhecer como esses riscos aparecem, quais evidências procurar e quais controles reduzem a chance e o impacto.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A proteção de Camada 2 evoluiu de redes simplesmente conectadas para redes de acesso autenticadas, segmentadas e monitoradas.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Como era</th><th>Problema</th><th>Controle moderno</th></tr></thead><tbody>\n<tr><td>Hub/rede compartilhada</td><td>Todos recebiam quase tudo.</td><td>Colisão, baixa privacidade e baixa escala.</td><td>Switches e segmentação.</td></tr>\n<tr><td>Switch básico</td><td>Aprendizado MAC dinâmico.</td><td>Portas abertas, ARP sem autenticação, rede plana.</td><td>VLAN, port security, logs e inventário.</td></tr>\n<tr><td>LAN corporativa</td><td>VLANs, trunks, STP e roteamento inter-VLAN.</td><td>Configuração errada amplia superfície.</td><td>Allowed VLANs restritas, BPDU Guard, Root Guard, DAI.</td></tr>\n<tr><td>Acesso controlado</td><td>Dispositivo precisa provar identidade ou conformidade.</td><td>BYOD, IoT, visitantes e risco interno.</td><td>802.1X, NAC, MAB controlado, posture check.</td></tr>\n<tr><td>Operação monitorada</td><td>Eventos viram sinais para SOC/NOC.</td><td>Sem evidência, investigação fica especulativa.</td><td>Syslog, SNMP/telemetria, NetFlow, SIEM e alertas de MAC flapping.</td></tr>\n</tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>Segurança em Camada 2 é o conjunto de práticas, controles e evidências usados para proteger a rede local contra abuso de mecanismos Ethernet, ARP, VLAN, switches e portas físicas.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> em redes Ethernet, segurança de L2 significa reduzir a chance de um dispositivo não autorizado, mal configurado ou comprometido manipular o domínio local, causar indisponibilidade, observar tráfego indevido, alterar caminhos locais ou facilitar movimento lateral.</div>\n<p>Ela não substitui firewall, EDR, IAM, TLS ou segmentação de Camada 3/4. Ela sustenta esses controles. Uma empresa madura combina controles de L2 com roteamento, firewall interno, autenticação forte, observabilidade, gestão de vulnerabilidades e resposta a incidentes.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Para entender as defesas, é preciso entender os mecanismos internos que podem falhar:</p>\n<ol class=\"flow-list\"><li><strong>Aprendizado MAC:</strong> o switch observa o MAC de origem dos frames e associa esse MAC à porta e à VLAN.</li><li><strong>Forwarding:</strong> se o MAC de destino está na tabela, o switch encaminha para a porta correta.</li><li><strong>Flooding:</strong> se o destino é desconhecido, broadcast ou multicast, o switch replica dentro da VLAN.</li><li><strong>ARP:</strong> hosts IPv4 perguntam quem possui determinado IP e armazenam a resposta no cache ARP.</li><li><strong>Trunks:</strong> carregam múltiplas VLANs entre switches, APs, hypervisors e firewalls.</li><li><strong>STP:</strong> evita loops bloqueando caminhos redundantes de L2.</li><li><strong>Controles:</strong> port security limita MACs, DHCP snooping cria base confiável, DAI valida ARP, BPDU Guard protege portas de acesso, 802.1X/NAC controla identidade do dispositivo.</li></ol>\n<p>O ponto central é que uma falha em L2 pode aparecer como problema de IP, DNS, aplicação ou autenticação. Por isso a investigação deve coletar evidências em várias camadas.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma arquitetura corporativa, segurança de L2 fica principalmente na camada de acesso: portas de usuário, switches de acesso, VLANs, uplinks, APs, trunks, impressoras, câmeras, telefones IP e dispositivos IoT.</p>\n<ul><li><strong>Camada envolvida:</strong> principalmente OSI Camada 2, com dependência de Camada 1 e impacto em Camadas 3 a 7.</li><li><strong>Componentes:</strong> switches, APs, controladoras, firewall/gateway, DHCP, NAC, SIEM, inventário e documentação.</li><li><strong>Pontos de falha:</strong> porta física aberta, trunk permissivo, VLAN errada, ausência de DHCP snooping, ausência de DAI, STP sem guardrails.</li><li><strong>Dependências:</strong> endereçamento IP, DHCP, ARP, VLAN, roteamento inter-VLAN, autenticação de rede e logging.</li></ul>\n<p>Em ambientes modernos, a Camada 2 também aparece em hypervisors, bridges Linux, redes de containers, CNI, switches virtuais, redes de storage e conectividade híbrida.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense na Camada 2 como o controle de acesso e circulação dentro de um prédio corporativo. O firewall seria a portaria principal entre a empresa e a rua, mas a Camada 2 seria o controle das portas internas, crachás de sala, elevadores, corredores, identificação das mesas e regras de circulação por andar.</p>\n<p>Se qualquer pessoa consegue plugar um cabo em uma sala e entrar na rede interna, é como deixar portas internas destrancadas. Se os andares estão todos conectados sem separação, é como permitir que qualquer visitante circule por todas as áreas. Se o mapa do prédio está errado, a equipe de segurança pode investigar a sala errada.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não são prédios. Frames, broadcasts, MACs, ARP, VLANs e trunks seguem regras técnicas específicas. A analogia ajuda a entender controle local, mas a defesa real depende de configuração, evidência e monitoramento.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Em casa, um roteador Wi-Fi normalmente acumula papéis: switch, AP, roteador, firewall simples e servidor DHCP. Se alguém conecta um mini-switch barato a uma porta LAN e depois cria um loop acidental, a rede doméstica pode ficar instável. Se a senha do Wi-Fi é fraca, um dispositivo desconhecido pode entrar no mesmo domínio local e tentar descobrir outros hosts.</p>\n<p>Mesmo em casa, boas práticas existem: usar WPA2/WPA3, separar rede de visitantes, atualizar firmware, não deixar portas expostas sem necessidade e não conectar equipamentos desconhecidos.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, a Camada 2 aparece em cada tomada de rede, porta de switch, AP corporativo, VLAN de usuários, VLAN de voz, VLAN de impressoras, VLAN de câmeras e rede de visitantes. Um erro simples, como deixar uma porta de sala de reunião em VLAN interna sem autenticação, pode permitir que um dispositivo não autorizado entre na LAN.</p>\n<p>Um desenho defensivo inclui inventário de portas, VLAN por função, 802.1X/NAC quando possível, port security em cenários específicos, DHCP snooping, DAI, BPDU Guard em portas de usuário, storm control e logs centralizados.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud pública, o provedor abstrai grande parte da Camada 2 tradicional. Você normalmente não vê ARP e STP da mesma forma que em um switch físico. Ainda assim, o conceito continua útil: há redes virtuais, NICs virtuais, tabelas de encaminhamento, domínios isolados, security groups, NSGs e controles de acesso.</p>\n<p>Em cloud híbrida, datacenters e ambientes on-premises continuam usando switches, VLANs, trunks, ARP e controles de acesso físico. Um incidente de Camada 2 no datacenter pode afetar VPN, ExpressRoute/Direct Connect, appliances virtuais, clusters Kubernetes e conectividade com workloads cloud.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>DevSecOps depende de rede previsível. Runners self-hosted, registries internos, clusters Kubernetes on-premises, appliances de scanning e servidores de build podem estar em VLANs específicas. Se a Camada 2 estiver instável, pipelines falham com sintomas que parecem de DNS, TLS, imagem Docker ou timeout de aplicação.</p>\n<p>Em infraestrutura como código, nem sempre os controles físicos entram no Terraform. Por isso a documentação entre rede física, VLANs, IPAM, firewall e plataforma precisa estar alinhada. Um pipeline seguro não compensa uma porta de switch aberta sem controle conectada à mesma rede de servidores.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Em segurança defensiva, o objetivo é reduzir oportunidades de abuso e aumentar visibilidade. Ataques e falhas de L2 aparecem como anomalias de MAC, ARP, DHCP, STP, VLAN, broadcast e portas físicas.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>ARP spoofing</td><td>Gateway muda de MAC, ARP inconsistente, alertas de duplicidade.</td><td>Interrupção, interceptação local ou desvio de tráfego.</td><td>DAI, DHCP snooping, segmentação, TLS, monitoramento.</td></tr>\n<tr><td>MAC flooding</td><td>Muitos MACs por porta, tabela instável, flooding anormal.</td><td>Instabilidade e possível exposição de tráfego dentro da VLAN.</td><td>Port security, limitação de MACs, logs e investigação.</td></tr>\n<tr><td>Porta não autorizada</td><td>Dispositivo desconhecido em porta ativa.</td><td>Acesso indevido à LAN.</td><td>802.1X/NAC, portas desabilitadas, VLAN quarentena.</td></tr>\n<tr><td>Trunk permissivo</td><td>VLANs demais atravessando uplinks.</td><td>Exposição e erro operacional.</td><td>Allowed VLANs restritas, revisão e documentação.</td></tr>\n<tr><td>Loop de L2</td><td>Broadcast storm, MAC flapping e CPU alta.</td><td>Indisponibilidade.</td><td>STP/RSTP, BPDU Guard, storm control.</td></tr>\n</tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m03l09-title m03l09-desc\">\n<title id=\"m03l09-title\">Segurança defensiva em Camada 2</title>\n<desc id=\"m03l09-desc\">Diagrama mostrando host, switch, gateway, atacante local hipotético, controles de L2 e evidências monitoradas.</desc>\n<defs><marker id=\"m03l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n<rect x=\"55\" y=\"150\" width=\"160\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--client\"/><text x=\"135\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Host legítimo</text><text x=\"135\" y=\"210\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN 10</text>\n<rect x=\"410\" y=\"140\" width=\"180\" height=\"92\" rx=\"14\" class=\"svg-node svg-node--switch\"/><text x=\"500\" y=\"176\" text-anchor=\"middle\" class=\"svg-label\">Switch acesso</text><text x=\"500\" y=\"202\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC table + controles</text>\n<rect x=\"755\" y=\"150\" width=\"160\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--router\"/><text x=\"835\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"835\" y=\"210\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">roteamento/firewall</text>\n<rect x=\"55\" y=\"330\" width=\"160\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--attacker\"/><text x=\"135\" y=\"365\" text-anchor=\"middle\" class=\"svg-label\">Dispositivo suspeito</text><text x=\"135\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta não autorizada</text>\n<line x1=\"215\" y1=\"190\" x2=\"410\" y2=\"190\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l09-arrow)\"/>\n<line x1=\"590\" y1=\"190\" x2=\"755\" y2=\"190\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l09-arrow)\"/>\n<line x1=\"215\" y1=\"370\" x2=\"410\" y2=\"220\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m03l09-arrow)\"/>\n<text x=\"320\" y=\"332\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bloqueio/alerta</text>\n<rect x=\"300\" y=\"30\" width=\"400\" height=\"66\" rx=\"14\" class=\"svg-zone\"/><text x=\"500\" y=\"58\" text-anchor=\"middle\" class=\"svg-label\">Controles</text><text x=\"500\" y=\"82\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">802.1X/NAC · Port Security · DHCP Snooping · DAI · BPDU Guard</text>\n<rect x=\"260\" y=\"455\" width=\"460\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"490\" y=\"484\" text-anchor=\"middle\" class=\"svg-label\">Evidências para SOC/NOC</text><text x=\"490\" y=\"510\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC flapping · ARP inconsistente · portas novas · storm · logs de switch</text>\n<line x1=\"500\" y1=\"232\" x2=\"490\" y2=\"455\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l09-arrow)\"/>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório desta aula é defensivo. Você não irá executar ataques. Você irá construir uma matriz de riscos, controles e evidências de L2 para uma LAN pequena, simulando como um analista de redes ou segurança documentaria a superfície de ataque local.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam classificação de riscos, escolha de controles e interpretação de evidências como MAC flapping, ARP inconsistente e excesso de MACs por porta.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio coloca você diante de uma rede corporativa com usuários, impressoras, visitantes, APs e servidores locais. Você deverá propor uma estratégia defensiva de L2 sem quebrar a operação.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução será comentada por raciocínio: primeiro separar ativos, depois identificar riscos, selecionar controles, prever impacto operacional e definir evidências de validação.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li><strong>Ideia central:</strong> Camada 2 é a base local da conectividade e também uma superfície de risco.</li><li><strong>O que lembrar:</strong> ARP, MAC, VLAN, trunk, STP e portas físicas precisam de controle e monitoramento.</li><li><strong>Erro comum:</strong> acreditar que firewall de borda resolve problemas dentro da mesma VLAN.</li><li><strong>Uso real:</strong> NAC, port security, DAI, DHCP snooping, BPDU Guard, storm control, logs e inventário.</li><li><strong>Segurança:</strong> foco defensivo, mínimo privilégio, segmentação, evidência e resposta a incidentes.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você fará a revisão prática do Módulo 3: do frame ao gateway. O objetivo será conectar Ethernet, MAC, switch, broadcast, ARP, VLAN, STP e segurança em um fluxo completo de diagnóstico.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet"
    ],
    "relatedProtocols": [
      "Ethernet",
      "ARP",
      "STP/RSTP",
      "802.1Q",
      "802.1X",
      "DHCP",
      "ICMP"
    ],
    "dependsOn": [
      "MAC",
      "Switch",
      "ARP",
      "VLAN",
      "STP",
      "Broadcast"
    ],
    "enables": [
      "Hardening de LAN",
      "NAC",
      "Segmentação defensiva",
      "Detecção de anomalias L2",
      "Troubleshooting de acesso"
    ]
  },
  "protocolFields": [
    {
      "field": "Source MAC",
      "size": "48 bits",
      "purpose": "Permitir ao switch aprender origem e porta.",
      "securityObservation": "Mudanças rápidas podem indicar MAC flapping, virtualização, redundância ou comportamento suspeito."
    },
    {
      "field": "Destination MAC",
      "size": "48 bits",
      "purpose": "Indicar o destino local do frame.",
      "securityObservation": "Broadcasts e unknown unicasts excessivos devem ser monitorados."
    },
    {
      "field": "ARP Sender Protocol Address",
      "size": "32 bits no IPv4",
      "purpose": "Indicar o IP anunciado pelo remetente ARP.",
      "securityObservation": "Associações IP-MAC inconsistentes são sinal de risco ou erro operacional."
    },
    {
      "field": "VLAN ID",
      "size": "12 bits no 802.1Q",
      "purpose": "Identificar domínio lógico de Camada 2.",
      "securityObservation": "Trunks permissivos e native VLAN insegura ampliam superfície de ataque e erro."
    },
    {
      "field": "BPDU",
      "size": "Variável",
      "purpose": "Controlar topologia STP.",
      "securityObservation": "BPDUs em portas de usuário podem indicar switch indevido ou loop potencial."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Envia frame para o switch.",
      "detail": "O switch aprende o Source MAC na porta e VLAN de entrada.",
      "possibleFailure": "Porta sem controle permite dispositivo não autorizado."
    },
    {
      "step": 2,
      "actor": "Switch",
      "action": "Consulta tabela MAC/CAM.",
      "detail": "Se o destino é conhecido, encaminha; se não, faz flooding dentro da VLAN.",
      "possibleFailure": "MAC flooding ou tabela instável aumenta flooding e dificulta investigação."
    },
    {
      "step": 3,
      "actor": "Host IPv4",
      "action": "Usa ARP para descobrir MAC local ou do gateway.",
      "detail": "ARP Request é broadcast; ARP Reply informa associação IP-MAC.",
      "possibleFailure": "ARP inconsistente pode desviar ou interromper tráfego local."
    },
    {
      "step": 4,
      "actor": "Controles L2",
      "action": "Validam comportamento esperado.",
      "detail": "DAI, DHCP snooping, port security, BPDU Guard e NAC bloqueiam ou alertam anomalias.",
      "possibleFailure": "Controles sem planejamento podem causar indisponibilidade."
    },
    {
      "step": 5,
      "actor": "SOC/NOC",
      "action": "Correlaciona evidências.",
      "detail": "Logs de switch, ARP, DHCP, SIEM, NAC e firewall ajudam a confirmar causa raiz.",
      "possibleFailure": "Sem logging centralizado, a investigação vira suposição."
    }
  ],
  "deepDive": {
    "mentalModel": "Segurança em L2 é o controle da porta de entrada local da rede: quem pode conectar, qual VLAN recebe, quais MACs são esperados, quais ARPs são válidos e quais anomalias precisam virar alerta.",
    "keyTerms": [
      "ARP spoofing",
      "MAC flooding",
      "port security",
      "DHCP snooping",
      "Dynamic ARP Inspection",
      "BPDU Guard",
      "802.1X",
      "NAC",
      "storm control"
    ],
    "limitations": [
      "VLAN não substitui firewall.",
      "Port security não substitui identidade forte.",
      "DAI depende de base confiável, normalmente DHCP snooping.",
      "802.1X exige planejamento de dispositivos legados e exceções.",
      "Controles mal aplicados podem derrubar produção."
    ],
    "whenToUse": [
      "Redes corporativas com portas físicas acessíveis.",
      "Ambientes com visitantes, IoT, impressoras, câmeras ou BYOD.",
      "Segmentos críticos como servidores, administração, produção e laboratórios.",
      "Ambientes que precisam de evidência para SOC/NOC."
    ],
    "whenNotToUse": [
      "Não habilitar controles em massa sem piloto.",
      "Não aplicar DAI sem entender DHCP snooping e IPs estáticos.",
      "Não usar port security como única barreira de segurança.",
      "Não tratar VLAN como autorização de acesso à aplicação."
    ],
    "operationalImpact": [
      "Exige inventário de portas, MACs, VLANs, exceções e dispositivos legados.",
      "Pode aumentar chamados no início se houver dispositivos fora do padrão.",
      "Exige integração entre rede, segurança, service desk e operação."
    ],
    "financialImpact": [
      "Pode exigir switches gerenciáveis, licenças NAC, suporte de SIEM e tempo de equipe.",
      "Reduz custo de incidentes e indisponibilidade quando bem implementado.",
      "Equipamentos baratos sem recursos de L2 security podem gerar dívida operacional."
    ],
    "securityImpact": [
      "Reduz acesso não autorizado e manipulação local.",
      "Aumenta visibilidade de anomalias na LAN.",
      "Diminui movimento lateral dentro de redes planas, quando combinado com segmentação e firewall."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que VLAN é firewall.",
      "whyItHappens": "VLAN separa broadcast e parece isolamento suficiente.",
      "consequence": "Tráfego entre VLANs pode ficar liberado no gateway sem política adequada.",
      "correction": "Usar VLAN para segmentação L2 e firewall/ACL para política de acesso."
    },
    {
      "mistake": "Habilitar DAI sem planejar DHCP snooping e IPs estáticos.",
      "whyItHappens": "O controle parece simples, mas depende de base confiável.",
      "consequence": "Dispositivos legítimos podem perder conectividade.",
      "correction": "Pilotar, mapear exceções e documentar bindings estáticos quando necessário."
    },
    {
      "mistake": "Ignorar portas físicas em salas públicas.",
      "whyItHappens": "A atenção fica no firewall, VPN e cloud.",
      "consequence": "Dispositivo não autorizado pode entrar na LAN interna.",
      "correction": "Desabilitar portas não usadas, usar 802.1X/NAC ou VLAN quarentena."
    },
    {
      "mistake": "Confundir MAC flapping com ataque imediatamente.",
      "whyItHappens": "O sintoma é associado a comportamento suspeito.",
      "consequence": "Investigação pode culpar segurança quando a causa é loop, virtualização ou redundância.",
      "correction": "Coletar evidências de STP, porta, VLAN, hypervisor e logs antes de concluir."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Gateway muda de MAC no ARP",
      "Muitos MACs em uma porta",
      "MAC flapping",
      "Broadcast elevado",
      "Dispositivos desconhecidos na VLAN",
      "Quedas intermitentes em uma área"
    ],
    "diagnosticQuestions": [
      "Qual porta e VLAN estão envolvidas?",
      "O MAC é conhecido no inventário?",
      "Há logs de NAC, DHCP ou switch?",
      "O gateway possui MAC virtual legítimo?",
      "Houve mudança recente de cabeamento, AP, switch ou hypervisor?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "arp -a\nipconfig /all\ngetmac /v",
        "purpose": "Ver ARP local, configuração IP e MACs das interfaces.",
        "expectedObservation": "Gateway com MAC consistente e interface correta.",
        "interpretation": "Mudanças inesperadas exigem correlação com logs de switch e gateway."
      },
      {
        "platform": "Linux",
        "command": "ip neigh\nip link\nip route\nss -tulpen",
        "purpose": "Ver vizinhos ARP, interfaces, rotas e serviços locais.",
        "expectedObservation": "Gateway em REACHABLE/STALE sem conflito evidente.",
        "interpretation": "FAILED/INCOMPLETE pode indicar falha local, VLAN, gateway ou ARP."
      },
      {
        "platform": "Cisco IOS",
        "command": "show mac address-table\nshow arp\nshow interfaces status\nshow interfaces counters errors\nshow port-security interface\nshow ip dhcp snooping binding",
        "purpose": "Coletar evidências de MAC, ARP, portas, erros, port security e bindings DHCP.",
        "expectedObservation": "MACs coerentes com portas e VLANs esperadas.",
        "interpretation": "Muitos MACs por porta, flapping ou binding ausente podem indicar problema ou risco."
      }
    ],
    "decisionTree": [
      {
        "if": "MAC do gateway muda no host",
        "then": "Verificar se há HSRP/VRRP/GLBP legítimo, comparar com ARP do switch e logs do gateway."
      },
      {
        "if": "Muitos MACs aparecem em uma porta de usuário",
        "then": "Verificar mini-switch, bridge, hypervisor, telefone IP com porta pass-through ou comportamento suspeito."
      },
      {
        "if": "ARP fica incompleto",
        "then": "Verificar VLAN, link físico, gateway, ACL local, DHCP e porta do switch."
      },
      {
        "if": "Broadcast sobe rapidamente",
        "then": "Verificar loops, STP, storm control, MAC flapping e mudanças físicas recentes."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Desabilitar portas não utilizadas.",
      "Usar VLANs por função e política inter-VLAN no gateway/firewall.",
      "Restringir VLANs permitidas em trunks.",
      "Aplicar BPDU Guard e PortFast em portas de acesso quando apropriado.",
      "Usar DHCP snooping e Dynamic ARP Inspection em ambientes compatíveis.",
      "Adotar 802.1X/NAC de forma planejada.",
      "Centralizar logs de switches, NAC, DHCP e firewall."
    ],
    "badPractices": [
      "Deixar todas as portas em VLAN interna ativa.",
      "Usar VLAN 1 como rede operacional padrão.",
      "Permitir todas as VLANs em todos os trunks sem necessidade.",
      "Habilitar controles sem piloto e sem plano de rollback.",
      "Tratar NAT, VLAN ou firewall de borda como proteção suficiente para a LAN interna."
    ],
    "commonErrors": [
      "Confundir ARP com DNS.",
      "Confundir MAC com identidade confiável.",
      "Ignorar dispositivos legados e IoT.",
      "Não sanitizar PCAPs e outputs com topologia interna."
    ],
    "vulnerabilities": [
      {
        "name": "ARP spoofing",
        "description": "Manipulação de associações IP-MAC em redes locais IPv4.",
        "defensiveExplanation": "O risco aparece quando hosts aceitam associações ARP indevidas e passam a enviar tráfego ao MAC errado.",
        "mitigation": "DAI, DHCP snooping, segmentação, monitoramento, TLS e resposta rápida."
      },
      {
        "name": "MAC flooding",
        "description": "Geração ou presença anormal de muitos MACs que pressiona a tabela do switch.",
        "defensiveExplanation": "Pode causar instabilidade ou flooding anormal; também pode indicar loop, hypervisor mal configurado ou dispositivo indevido.",
        "mitigation": "Port security, limites por porta, logs, investigação e desenho correto."
      },
      {
        "name": "Porta física não controlada",
        "description": "Porta de switch acessível permite conexão de dispositivo desconhecido.",
        "defensiveExplanation": "A LAN passa a depender da boa-fé de quem acessa fisicamente o ambiente.",
        "mitigation": "802.1X/NAC, portas desabilitadas, VLAN quarentena, controle físico e inventário."
      },
      {
        "name": "Trunk permissivo",
        "description": "Trunk carrega VLANs desnecessárias.",
        "defensiveExplanation": "Aumenta risco de erro operacional e exposição de domínios indevidos.",
        "mitigation": "Allowed VLANs mínimas, native VLAN não usada, documentação e revisão de mudança."
      }
    ],
    "monitoring": [
      "Alertas de MAC flapping",
      "Número de MACs por porta",
      "Mudanças de VLAN",
      "Eventos de port security",
      "BPDUs em portas de acesso",
      "ARP inconsistentes",
      "Broadcast/storm control",
      "Logs de NAC e DHCP"
    ],
    "hardening": [
      "Port security onde fizer sentido",
      "DHCP snooping",
      "Dynamic ARP Inspection",
      "IP Source Guard",
      "BPDU Guard",
      "Root Guard",
      "Storm control",
      "802.1X/NAC",
      "Trunks restritos"
    ],
    "detectionIdeas": [
      "Comparar ARP de hosts críticos com tabela do gateway.",
      "Correlacionar MAC flapping com STP e mudanças físicas.",
      "Monitorar portas que aparecem com mais MACs do que o esperado.",
      "Alertar portas ativas fora do inventário."
    ]
  },
  "lab": {
    "id": "lab-3.9",
    "title": "Matriz defensiva de segurança em Camada 2",
    "labType": "security",
    "objective": "Criar uma matriz de riscos, controles e evidências de L2 para uma LAN pequena, sem executar ataques.",
    "scenario": "Você atua como analista de redes/segurança e precisa revisar uma LAN com usuários, impressoras, APs, visitantes e servidores locais.",
    "topology": "Usuários -> switch de acesso -> switch/firewall/gateway -> serviços internos; APs e impressoras conectados ao switch de acesso.",
    "architecture": "LAN segmentada por VLANs, com gateway inter-VLAN e coleta de logs de switch/NAC/DHCP/firewall.",
    "prerequisites": [
      "Ter estudado aulas 3.1 a 3.8.",
      "Usar apenas ambiente próprio, laboratório, Packet Tracer/GNS3 ou análise conceitual."
    ],
    "tools": [
      "Windows PowerShell",
      "Terminal Linux",
      "Cisco IOS/Packet Tracer/GNS3 opcional",
      "Planilha ou markdown para matriz",
      "Opcional: Wireshark apenas em rede própria"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não execute ARP spoofing, MAC flooding ou testes de negação de serviço em redes reais.",
      "Não colete PCAPs de terceiros sem autorização.",
      "Sanitize MACs, IPs, nomes de host e topologia antes de compartilhar evidências.",
      "Faça apenas inventário, validação e raciocínio defensivo."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir escopo da LAN",
        "instruction": "Liste segmentos lógicos: usuários, visitantes, impressoras, IoT, servidores e administração.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista de VLANs ou grupos funcionais.",
        "explanation": "Não há defesa sem saber o que deve existir."
      },
      {
        "number": 2,
        "title": "Coletar evidências locais no host",
        "instruction": "Observe IP, gateway, MAC local e cache ARP.",
        "command": "Windows: ipconfig /all && arp -a\nLinux: ip addr && ip route && ip neigh",
        "expectedOutput": "IP, gateway, MAC local e associação ARP do gateway.",
        "explanation": "Essa é a visão do endpoint sobre a Camada 2/3 local."
      },
      {
        "number": 3,
        "title": "Mapear riscos por mecanismo",
        "instruction": "Crie linhas para ARP, MAC table, porta física, trunk, VLAN, STP e broadcast.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz com risco, impacto e evidência possível.",
        "explanation": "A matriz evita conclusões vagas como 'melhorar segurança'."
      },
      {
        "number": 4,
        "title": "Associar controles",
        "instruction": "Para cada risco, associe controles preventivos, detectivos e corretivos.",
        "command": "Exemplos: DAI, DHCP snooping, port security, BPDU Guard, storm control, 802.1X/NAC.",
        "expectedOutput": "Controles mapeados por risco.",
        "explanation": "Controles precisam ter motivo, escopo e impacto operacional."
      },
      {
        "number": 5,
        "title": "Planejar evidências de switch",
        "instruction": "Liste comandos que seriam usados em Cisco IOS ou equivalente gerenciado.",
        "command": "show mac address-table\nshow arp\nshow interfaces status\nshow port-security\nshow spanning-tree\nshow ip dhcp snooping binding",
        "expectedOutput": "Plano de coleta de evidências.",
        "explanation": "Mesmo sem equipamento real, você deve saber o que procuraria."
      },
      {
        "number": 6,
        "title": "Criar plano de implantação seguro",
        "instruction": "Defina piloto, janela, rollback e comunicação para controles de L2.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano com ordem de implantação e validação.",
        "explanation": "Segurança de L2 mal implantada pode derrubar produção."
      },
      {
        "number": 7,
        "title": "Sanitizar relatório",
        "instruction": "Remova ou mascare IPs, MACs, nomes internos e detalhes sensíveis antes de compartilhar.",
        "command": "Exemplo: 192.168.10.15 -> 192.168.10.x; aa:bb:cc:dd:ee:ff -> aa:bb:cc:xx:xx:xx",
        "expectedOutput": "Relatório seguro para revisão.",
        "explanation": "Evidências de rede são sensíveis e podem revelar topologia interna."
      }
    ],
    "expectedResult": "Ao final, o aluno terá uma matriz defensiva de L2 com riscos, controles, evidências, impacto e plano de implantação seguro.",
    "validation": [
      {
        "check": "Matriz contém riscos centrais de L2",
        "command": "Revisar linhas: ARP, MAC, porta, trunk, VLAN, STP, broadcast.",
        "expected": "Todos os mecanismos possuem risco e controle associados.",
        "ifFails": "Revisar aulas 3.3 a 3.8."
      },
      {
        "check": "Controles têm evidências",
        "command": "Verificar coluna de evidência/log.",
        "expected": "Cada controle tem pelo menos uma evidência de validação.",
        "ifFails": "Adicionar comandos e logs esperados."
      },
      {
        "check": "Plano não é disruptivo",
        "command": "Verificar piloto, rollback e exceções.",
        "expected": "Existe implantação gradual e segura.",
        "ifFails": "Adicionar piloto e plano de rollback."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não sei qual controle escolher.",
        "probableCause": "Risco ainda está genérico.",
        "howToConfirm": "Verifique se a linha descreve mecanismo, impacto e evidência.",
        "fix": "Especificar o risco antes de escolher controle."
      },
      {
        "symptom": "Controle parece quebrar dispositivos legados.",
        "probableCause": "802.1X/NAC ou DAI sem exceções planejadas.",
        "howToConfirm": "Listar impressoras, câmeras, telefones IP e IoT.",
        "fix": "Usar piloto, MAB controlado, VLAN quarentena ou exceção documentada."
      },
      {
        "symptom": "Muitos MACs em uma porta.",
        "probableCause": "Mini-switch, telefone IP, hypervisor, bridge ou comportamento anômalo.",
        "howToConfirm": "Correlacionar inventário, CDP/LLDP, logs e tabela MAC.",
        "fix": "Classificar causa antes de bloquear."
      }
    ],
    "improvements": [
      "Adicionar integração com SIEM.",
      "Criar baseline de MACs por porta.",
      "Definir alertas de MAC flapping.",
      "Usar NAC em portas críticas.",
      "Revisar trunks e allowed VLANs trimestralmente."
    ],
    "evidenceToCollect": [
      "Matriz de riscos",
      "Cache ARP sanitizado",
      "Plano de comandos de switch",
      "Lista de controles",
      "Plano de implantação",
      "Relatório sanitizado"
    ],
    "questions": [
      "Por que VLAN não substitui firewall?",
      "Quando port security ajuda e quando atrapalha?",
      "Quais evidências indicam ARP inconsistente?",
      "Como implantar 802.1X sem derrubar operação?"
    ],
    "challenge": "Crie uma matriz defensiva para uma LAN com usuários, visitantes, VoIP, impressoras e servidores locais, escolhendo controles progressivos para cada segmento.",
    "solution": "Uma solução madura separa VLANs por função, restringe trunks, protege portas de usuário com BPDU Guard e NAC/802.1X quando possível, usa DHCP snooping e DAI onde compatível, monitora MAC flapping e broadcast, centraliza logs e implanta controles primeiro em piloto com rollback documentado."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que não basta proteger apenas o firewall de borda se a LAN interna é plana e sem controle?",
      "hints": [
        "Pense em movimento lateral.",
        "Pense em tráfego dentro da mesma VLAN."
      ],
      "expectedIdeas": [
        "domínio local",
        "portas físicas",
        "ARP",
        "VLAN",
        "movimento lateral",
        "visibilidade"
      ],
      "explanation": "O firewall de borda não necessariamente vê ou controla tráfego entre hosts na mesma VLAN."
    },
    {
      "type": "diagnóstico",
      "question": "Um gateway aparece com dois MACs diferentes em hosts do mesmo segmento. O que você investigaria antes de concluir ataque?",
      "hints": [
        "Pense em alta disponibilidade.",
        "Pense em logs de switch e ARP."
      ],
      "expectedIdeas": [
        "HSRP/VRRP/GLBP",
        "ARP",
        "MAC table",
        "logs",
        "duplicidade",
        "DAI"
      ],
      "explanation": "MAC virtual legítimo pode existir. Investigar antes de concluir evita falso positivo."
    },
    {
      "type": "cenário real",
      "question": "Você precisa implantar 802.1X em uma rede com impressoras e câmeras antigas. Qual seria uma abordagem segura?",
      "hints": [
        "Pense em piloto.",
        "Pense em exceções documentadas."
      ],
      "expectedIdeas": [
        "piloto",
        "NAC",
        "MAB",
        "VLAN quarentena",
        "inventário",
        "rollback"
      ],
      "explanation": "Controles de acesso precisam considerar dispositivos que não suportam autenticação moderna."
    }
  ],
  "quiz": [
    {
      "id": "q3.9.1",
      "type": "conceito",
      "q": "Qual afirmação melhor descreve segurança em Camada 2?",
      "opts": [
        "Conjunto de controles para proteger mecanismos locais como MAC, ARP, VLAN, STP e portas físicas.",
        "Criptografia de todos os pacotes IP na internet.",
        "Substituto completo para firewall e IAM.",
        "Apenas configuração de DNS seguro."
      ],
      "a": 0,
      "exp": "L2 security protege a base local da LAN; não substitui controles de camadas superiores.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q3.9.2",
      "type": "segurança",
      "q": "Por que ARP spoofing é relevante defensivamente?",
      "opts": [
        "Porque ARP não autentica nativamente associações IP-MAC.",
        "Porque ARP substitui TLS.",
        "Porque ARP funciona apenas na internet pública.",
        "Porque ARP define rotas BGP."
      ],
      "a": 0,
      "exp": "ARP é local e não possui autenticação nativa; por isso é importante monitorar e mitigar inconsistências.",
      "difficulty": "iniciante",
      "topic": "arp"
    },
    {
      "id": "q3.9.3",
      "type": "diagnóstico",
      "q": "Muitos MACs aparecem em uma única porta de usuário. Qual hipótese NÃO deve ser descartada sem análise?",
      "opts": [
        "Mini-switch, telefone IP, hypervisor ou comportamento anômalo.",
        "Sempre é problema de DNS.",
        "Sempre significa TLS expirado.",
        "É necessariamente falha de BGP."
      ],
      "a": 0,
      "exp": "Muitos MACs por porta podem ser legítimos ou anômalos; precisam de correlação.",
      "difficulty": "intermediário",
      "topic": "mac"
    },
    {
      "id": "q3.9.4",
      "type": "arquitetura",
      "q": "Qual controle ajuda a validar ARP com base em informações confiáveis do DHCP?",
      "opts": [
        "Dynamic ARP Inspection combinado com DHCP snooping.",
        "Apenas mudar a senha do Wi-Fi.",
        "Somente NAT.",
        "Apenas aumentar MTU."
      ],
      "a": 0,
      "exp": "DAI costuma usar informações de DHCP snooping para validar ARP em switches compatíveis.",
      "difficulty": "intermediário",
      "topic": "defesa"
    },
    {
      "id": "q3.9.5",
      "type": "boas práticas",
      "q": "Qual é uma boa prática para trunks?",
      "opts": [
        "Permitir somente VLANs necessárias.",
        "Permitir todas as VLANs sempre.",
        "Usar VLAN 1 para tudo.",
        "Desativar logs para reduzir ruído."
      ],
      "a": 0,
      "exp": "Trunks devem carregar o mínimo necessário e ser documentados.",
      "difficulty": "iniciante",
      "topic": "vlan"
    },
    {
      "id": "q3.9.6",
      "type": "ética",
      "q": "Qual prática é adequada para laboratório desta aula?",
      "opts": [
        "Criar matriz defensiva e coletar evidências em ambiente próprio/autorizado.",
        "Executar MAC flooding na rede da empresa sem autorização.",
        "Capturar tráfego de terceiros em Wi-Fi público.",
        "Testar ARP spoofing em rede alheia."
      ],
      "a": 0,
      "exp": "O laboratório é defensivo e restrito a ambiente próprio ou autorizado.",
      "difficulty": "iniciante",
      "topic": "ética"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.9.1",
      "front": "VLAN substitui firewall?",
      "back": "Não. VLAN separa domínio de broadcast; política de acesso exige firewall, ACL ou controles equivalentes.",
      "tags": [
        "vlan",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.9.2",
      "front": "O que é DAI?",
      "back": "Dynamic ARP Inspection é um controle de switch que valida ARP com base em informações confiáveis, normalmente DHCP snooping.",
      "tags": [
        "arp",
        "dai"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.9.3",
      "front": "O que é MAC flooding em visão defensiva?",
      "back": "Condição anômala com muitos MACs que pode pressionar a tabela do switch e gerar flooding/instabilidade.",
      "tags": [
        "mac",
        "switch"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.9.4",
      "front": "Para que serve 802.1X/NAC?",
      "back": "Controlar acesso de dispositivos/usuários à rede, aplicando autenticação, postura e políticas.",
      "tags": [
        "nac",
        "802.1x"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.9.5",
      "front": "O que indica MAC flapping?",
      "back": "O mesmo MAC aparecendo alternadamente em portas diferentes, podendo indicar loop, redundância, virtualização ou anomalia.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.9.6",
      "front": "Por que sanitizar outputs de switch?",
      "back": "Porque IPs, MACs, nomes de hosts, VLANs e topologia podem revelar informações sensíveis.",
      "tags": [
        "evidência"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex3.9.1",
      "type": "conceitual",
      "prompt": "Explique por que VLAN não deve ser tratada como substituto de firewall.",
      "expectedAnswer": "VLAN separa broadcast e organiza Camada 2, mas tráfego entre VLANs pode ser roteado. Política de acesso precisa ser aplicada em gateway, firewall, ACL ou controle equivalente.",
      "explanation": "Segmentação e autorização são conceitos diferentes."
    },
    {
      "id": "ex3.9.2",
      "type": "diagnóstico",
      "prompt": "Um host mostra o gateway com MAC diferente do esperado. Liste três hipóteses defensivas antes de concluir ataque.",
      "expectedAnswer": "Alta disponibilidade com MAC virtual, troca legítima de equipamento/gateway, erro de inventário, ARP inconsistente, IP duplicado ou comportamento suspeito.",
      "explanation": "Nem toda anomalia é ataque; evidências evitam falso positivo."
    },
    {
      "id": "ex3.9.3",
      "type": "arquitetura",
      "prompt": "Proponha controles para portas de sala de reunião usadas por visitantes ocasionais.",
      "expectedAnswer": "Portas desabilitadas por padrão ou VLAN de visitantes/quarentena, 802.1X/NAC quando possível, logging, limitação de acesso e processo de liberação temporária.",
      "explanation": "Portas públicas exigem menor privilégio e rastreabilidade."
    },
    {
      "id": "ex3.9.4",
      "type": "segurança",
      "prompt": "Crie uma linha de matriz para o risco 'trunk permissivo'.",
      "expectedAnswer": "Risco: trunk carrega VLANs desnecessárias. Impacto: exposição e erro operacional. Controle: allowed VLANs restritas, native VLAN não usada, revisão. Evidência: show interfaces trunk e documentação.",
      "explanation": "Uma matriz útil conecta risco, impacto, controle e evidência."
    }
  ],
  "challenge": {
    "title": "Desenhar uma estratégia defensiva de L2 para uma filial",
    "scenario": "Uma filial possui usuários, VoIP, impressoras, câmeras, visitantes e um pequeno rack com switches de acesso. A rede tem VLANs, mas portas públicas ainda estão ativas e trunks carregam VLANs demais.",
    "tasks": [
      "Identificar riscos de L2.",
      "Propor controles por segmento.",
      "Definir evidências de validação.",
      "Planejar implantação com piloto e rollback.",
      "Indicar o que deve ir para SIEM/NOC."
    ],
    "constraints": [
      "Não interromper telefonia IP.",
      "Dispositivos legados podem não suportar 802.1X.",
      "Não executar ataques ou testes disruptivos.",
      "Sanitizar evidências."
    ],
    "expectedDeliverables": [
      "Matriz de riscos",
      "Plano de controles",
      "Plano de logs/evidências",
      "Plano de implantação",
      "Resumo executivo"
    ],
    "gradingRubric": [
      {
        "criterion": "Riscos L2 identificados",
        "points": 25,
        "description": "Inclui ARP, MAC, portas, VLANs, trunks, STP e broadcast."
      },
      {
        "criterion": "Controles adequados",
        "points": 25,
        "description": "Escolhe controles com impacto operacional considerado."
      },
      {
        "criterion": "Evidências e validação",
        "points": 20,
        "description": "Define comandos, logs e critérios de sucesso."
      },
      {
        "criterion": "Implantação segura",
        "points": 20,
        "description": "Inclui piloto, rollback e comunicação."
      },
      {
        "criterion": "Clareza e sanitização",
        "points": 10,
        "description": "Relatório técnico sem dados sensíveis desnecessários."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos segmentos e ativos. Depois identificamos mecanismos de L2 que podem ser abusados ou falhar. Em seguida associamos controles graduais e evidências. Por fim, planejamos implantação sem quebrar dispositivos legados.",
    "steps": [
      "Listar VLANs e funções.",
      "Mapear portas públicas, trunks e dispositivos críticos.",
      "Associar riscos: ARP, MAC, VLAN, STP, portas e broadcast.",
      "Escolher controles: DHCP snooping, DAI, port security, BPDU Guard, storm control, NAC/802.1X.",
      "Definir evidências: logs de switch, NAC, DHCP, MAC table e ARP.",
      "Implantar em piloto com rollback.",
      "Sanitizar e documentar."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar todos na mesma VLAN para simplificar.",
        "whyItIsWrong": "Aumenta broadcast, movimento lateral e superfície de risco."
      },
      {
        "answer": "Ligar todos os controles de uma vez.",
        "whyItIsWrong": "Pode derrubar dispositivos legítimos e gerar incidente operacional."
      },
      {
        "answer": "Confiar apenas no firewall de borda.",
        "whyItIsWrong": "Tráfego dentro da mesma VLAN pode não passar pelo firewall."
      }
    ],
    "finalAnswer": "A solução recomendada segmenta por função, restringe trunks, protege portas de usuário, monitora anomalias, usa DAI/DHCP snooping onde viável, planeja NAC/802.1X gradualmente, mantém exceções documentadas para legados e centraliza evidências para SOC/NOC."
  },
  "glossary": [
    {
      "term": "ARP spoofing",
      "shortDefinition": "Manipulação indevida de associações IP-MAC em rede local.",
      "longDefinition": "Risco de Camada 2/3 no qual respostas ARP inconsistentes podem fazer hosts associarem um IP ao MAC errado.",
      "example": "Gateway aparece com MAC inesperado no cache ARP.",
      "relatedTerms": [
        "ARP",
        "DAI",
        "DHCP snooping"
      ],
      "relatedLessons": [
        "3.5",
        "3.6",
        "3.9"
      ]
    },
    {
      "term": "MAC flooding",
      "shortDefinition": "Presença ou geração anormal de muitos MACs que pressiona tabela do switch.",
      "longDefinition": "Condição que pode causar flooding, instabilidade ou indicar loop, bridge, hypervisor ou comportamento suspeito.",
      "example": "Uma porta de usuário aparece com centenas de MACs.",
      "relatedTerms": [
        "CAM table",
        "switch",
        "port security"
      ],
      "relatedLessons": [
        "3.3",
        "3.9"
      ]
    },
    {
      "term": "Port security",
      "shortDefinition": "Controle de switch para limitar ou regular MACs em uma porta.",
      "longDefinition": "Recurso usado para reduzir abuso de portas e controlar quantidade ou identidade de MACs permitidos.",
      "example": "Permitir no máximo dois MACs em uma porta de usuário.",
      "relatedTerms": [
        "switch",
        "MAC",
        "NAC"
      ],
      "relatedLessons": [
        "3.3",
        "3.9"
      ]
    },
    {
      "term": "DHCP snooping",
      "shortDefinition": "Controle que diferencia portas confiáveis e não confiáveis para DHCP.",
      "longDefinition": "Cria base de bindings IP-MAC-VLAN-porta que pode apoiar controles como DAI.",
      "example": "Bloquear servidor DHCP não autorizado em porta de usuário.",
      "relatedTerms": [
        "DHCP",
        "DAI",
        "IP Source Guard"
      ],
      "relatedLessons": [
        "3.9",
        "7.x"
      ]
    },
    {
      "term": "Dynamic ARP Inspection",
      "shortDefinition": "Controle que valida mensagens ARP em switches compatíveis.",
      "longDefinition": "Usa base confiável para bloquear ARP inconsistente e reduzir risco de manipulação local.",
      "example": "Bloquear ARP Reply que anuncia gateway com MAC não autorizado.",
      "relatedTerms": [
        "ARP",
        "DHCP snooping"
      ],
      "relatedLessons": [
        "3.5",
        "3.9"
      ]
    },
    {
      "term": "802.1X/NAC",
      "shortDefinition": "Controle de acesso à rede baseado em autenticação e política.",
      "longDefinition": "Permite autorizar dispositivos e usuários antes de liberar acesso à rede, geralmente com políticas por perfil.",
      "example": "Dispositivo corporativo vai para VLAN interna; desconhecido vai para quarentena.",
      "relatedTerms": [
        "identidade",
        "NAC",
        "VLAN"
      ],
      "relatedLessons": [
        "3.9"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.1Q — VLAN tagging",
      "organization": "IEEE",
      "url": "",
      "note": "Base conceitual para VLANs e trunking."
    },
    {
      "type": "standard",
      "title": "IEEE 802.1X — Port-Based Network Access Control",
      "organization": "IEEE",
      "url": "",
      "note": "Base conceitual para autenticação de acesso à rede."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Aula 3.5 ARP",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Pré-requisito direto para riscos e defesas ARP."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aprofunda relação entre identidade, dispositivo e controle de acesso."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e Operação",
      "lesson": "A definir",
      "reason": "Logs de rede, SIEM, telemetria e resposta a incidentes dependem de boa coleta operacional."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso corporativo",
      "lesson": "A definir",
      "reason": "802.1X, NAC e identidade de dispositivo conectam rede física com IAM corporativo."
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
      "3.10"
    ]
  }
};
