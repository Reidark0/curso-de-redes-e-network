export const lesson1105 = {
  "id": "11.5",
  "moduleId": "m11",
  "order": 5,
  "title": "Roteamento inter-VLAN",
  "subtitle": "Entenda por que VLANs diferentes precisam de roteamento, como gateways por VLAN funcionam, quando usar router-on-a-stick, switch camada 3, firewall ou cloud route table, e como diagnosticar comunicação entre segmentos.",
  "duration": "110-155 min",
  "estimatedStudyTimeMinutes": 155,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 255,
  "tags": [
    "redes",
    "ipv4",
    "roteamento",
    "inter-vlan",
    "vlan",
    "gateway",
    "switch camada 3",
    "router-on-a-stick",
    "firewall",
    "acl",
    "segurança",
    "cloud",
    "devsecops",
    "troubleshooting",
    "packet-tracer",
    "gns3",
    "troubleshooting real",
    "roteamento avançado"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "A aula 3.7 explica VLANs, portas access, trunks e domínios de broadcast, que são a base do roteamento inter-VLAN."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "reason": "A aula 4.5 explica gateway padrão e decisão local/remota do host."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.7",
      "reason": "A aula 5.7 mostra como planejar blocos IPv4 por segmento corporativo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.2",
      "reason": "A aula 11.2 explica tabela de rotas e longest prefix match, usados pelo dispositivo que roteia entre VLANs."
    }
  ],
  "objectives": [
    "Explicar por que duas VLANs não se comunicam diretamente apenas com switch camada 2.",
    "Entender o papel do gateway de cada VLAN no roteamento inter-VLAN.",
    "Comparar router-on-a-stick, switch camada 3, firewall inter-VLAN e roteamento em cloud.",
    "Relacionar subinterfaces 802.1Q, SVIs, trunks, access ports e rotas conectadas.",
    "Aplicar boas práticas de segurança entre VLANs com ACLs, firewall, NAC, logs e segmentação mínima.",
    "Diagnosticar falhas comuns: VLAN errada, gateway errado, trunk sem VLAN permitida, SVI down, ACL bloqueando e ausência de rota de retorno."
  ],
  "learningOutcomes": [
    "Dado um cenário com VLAN 10 e VLAN 20, o aluno explica por que é necessário um gateway L3 para comunicação entre elas.",
    "Dada uma topologia router-on-a-stick, o aluno identifica trunk, subinterfaces, encapsulation dot1q e gateways.",
    "Dada uma topologia com switch camada 3, o aluno identifica SVIs, rotas conectadas e comando ip routing.",
    "Dado um problema de conectividade entre VLANs, o aluno cria uma sequência de troubleshooting por camadas.",
    "Dado um requisito de segurança, o aluno propõe onde aplicar firewall/ACL e quais fluxos devem ser permitidos."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Você já aprendeu que VLANs separam domínios de broadcast. Essa separação é excelente para organização e segurança, mas cria uma consequência direta: um computador na VLAN 10 não consegue falar com um servidor na VLAN 20 apenas com switching de Camada 2.</p><p>Na prática corporativa isso aparece o tempo todo. Usuários ficam em uma VLAN, servidores em outra, impressoras em outra, convidados em outra, câmeras em outra, gestão em outra e DMZ em outra. Se nada rotear entre esses segmentos, cada VLAN vira uma ilha. Se tudo rotear sem controle, a segmentação vira decoração.</p><div class=\"callout callout--problem\"><strong>Ideia central:</strong> roteamento inter-VLAN é o processo de encaminhar tráfego IPv4 entre VLANs diferentes por meio de um dispositivo de Camada 3, geralmente um roteador, switch L3, firewall ou gateway cloud.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>No início das LANs, era comum ter redes pequenas e pouco segmentadas. Conforme as empresas cresceram, switches substituíram hubs, VLANs permitiram separar departamentos e o roteamento precisou acompanhar essa divisão.</p><p>Uma solução tradicional foi o <strong>router-on-a-stick</strong>: um roteador conectado a um switch por um trunk 802.1Q, usando subinterfaces para cada VLAN. Depois, switches camada 3 passaram a rotear diretamente no core ou distribuição usando SVIs. Mais tarde, firewalls e appliances passaram a atuar como gateways entre zonas para aplicar inspeção e política. Na cloud, route tables, gateways e firewalls gerenciados cumprem papéis equivalentes.</p><p>A história do inter-VLAN é a história de equilibrar desempenho, segmentação e segurança. Roteadores centralizam controle, switches L3 oferecem velocidade, firewalls oferecem inspeção e cloud oferece abstração declarativa.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>VLANs diferentes normalmente pertencem a sub-redes IPv4 diferentes. Um host na VLAN 10, rede 192.168.10.0/24, percebe que um destino na VLAN 20, rede 192.168.20.0/24, não está na sua rede local. Por isso ele envia o tráfego ao gateway padrão.</p><p>O switch L2 sabe encaminhar frames dentro da VLAN, mas não deve misturar broadcasts entre VLANs. Ele não encaminha um frame da VLAN 10 para a VLAN 20 como se fosse a mesma rede. Para atravessar essa fronteira, é necessário roteamento.</p><div class=\"callout callout--warning\"><strong>Erro comum:</strong> pensar que VLAN sozinha é firewall. VLAN separa broadcast e cria fronteira lógica, mas quem decide se uma VLAN pode falar com outra é a política no gateway, ACL, firewall ou roteador.</div></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><table class=\"data-table\"><thead><tr><th>Modelo</th><th>Como funciona</th><th>Quando aparece</th><th>Limitação</th></tr></thead><tbody><tr><td>Rede plana</td><td>Todos na mesma sub-rede</td><td>Ambientes pequenos</td><td>Baixa segurança e muito broadcast</td></tr><tr><td>Router-on-a-stick</td><td>Roteador com subinterfaces 802.1Q</td><td>Laboratórios, filiais e redes menores</td><td>Trunk pode virar gargalo</td></tr><tr><td>Switch L3</td><td>SVIs roteiam em alta velocidade</td><td>Campus, core e distribuição</td><td>Menos inspeção profunda que firewall</td></tr><tr><td>Firewall inter-VLAN</td><td>Gateway aplica políticas entre zonas</td><td>Ambientes com alta exigência de segurança</td><td>Mais latência e custo</td></tr><tr><td>Cloud route table</td><td>Subnets usam rotas declarativas</td><td>VPC, VNet, hub-spoke e redes híbridas</td><td>Risco de configuração ampla por IaC</td></tr></tbody></table></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p><strong>Roteamento inter-VLAN</strong> é o encaminhamento de pacotes entre sub-redes associadas a VLANs diferentes. Cada VLAN costuma ter seu próprio gateway. Esse gateway pode ser uma subinterface de roteador, uma SVI em switch camada 3, uma interface lógica de firewall ou um gateway virtual em cloud.</p><div class=\"definition-box\"><strong>Definição prática:</strong> quando um host em uma VLAN precisa falar com outra VLAN, ele envia o pacote ao gateway da sua própria VLAN. O dispositivo L3 recebe, consulta rotas e políticas, troca o encapsulamento Ethernet e encaminha para a VLAN de destino.</div><p>O IP de origem e destino representa os hosts finais. Os MACs mudam a cada enlace, exatamente como visto nas aulas de Ethernet, ARP e roteamento.</p></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><ol class=\"flow-list\"><li>PC-A na VLAN 10 quer acessar Servidor-B na VLAN 20.</li><li>PC-A aplica máscara e conclui que 192.168.20.10 não está na rede 192.168.10.0/24.</li><li>PC-A envia o pacote ao gateway 192.168.10.1.</li><li>Para isso, PC-A resolve via ARP o MAC do gateway da VLAN 10.</li><li>O frame sai na VLAN 10 até o dispositivo L3.</li><li>O dispositivo L3 remove o frame Ethernet, examina o pacote IPv4 e consulta a tabela de rotas.</li><li>A rota conectada para 192.168.20.0/24 aponta para a interface/SVI/subinterface da VLAN 20.</li><li>Antes de encaminhar, o dispositivo pode aplicar ACL, firewall, política de zona, inspeção e logs.</li><li>O dispositivo resolve o MAC do destino ou de outro next hop na VLAN 20.</li><li>O novo frame sai na VLAN 20 com MAC de origem do gateway da VLAN 20 e MAC de destino do host final.</li></ol></section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>Existem três arquiteturas clássicas para roteamento inter-VLAN em ambientes tradicionais.</p><table class=\"comparison-table\"><thead><tr><th>Arquitetura</th><th>Descrição</th><th>Vantagem</th><th>Limitação</th></tr></thead><tbody><tr><td>Router-on-a-stick</td><td>Um trunk leva várias VLANs até um roteador com subinterfaces.</td><td>Didático, simples e barato.</td><td>Trunk e roteador podem virar gargalo.</td></tr><tr><td>Switch camada 3</td><td>SVIs no switch fazem o gateway das VLANs.</td><td>Alto desempenho e baixa latência.</td><td>Política de segurança pode ser menos rica.</td></tr><tr><td>Firewall como gateway</td><td>Cada VLAN/zona passa por políticas do firewall.</td><td>Controle, inspeção e logging fortes.</td><td>Custo, latência e complexidade maiores.</td></tr></tbody></table><p>Em cloud, o conceito reaparece como subnets com route tables, gateways, firewalls, NACLs, security groups e appliances virtuais. A palavra VLAN pode não aparecer, mas o problema é o mesmo: segmentos diferentes precisam de controle de comunicação.</p></section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Pense em um prédio empresarial com andares separados. Cada andar é uma VLAN. Pessoas no mesmo andar se encontram diretamente. Para falar com outro andar, precisam passar pelo elevador ou recepção controlada. Esse elevador é o gateway inter-VLAN.</p><p>Se o elevador deixa qualquer pessoa ir a qualquer andar, há conectividade, mas pouca segurança. Se ele bloqueia tudo sem critério, a empresa para. O bom desenho define quem pode ir aonde, por qual motivo, com registro e controle.</p></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2><p>VLAN 10 usa 192.168.10.0/24 com gateway 192.168.10.1. VLAN 20 usa 192.168.20.0/24 com gateway 192.168.20.1. Um notebook em 192.168.10.50 quer acessar um servidor em 192.168.20.10.</p><p>O notebook percebe que o servidor está fora da rede local e envia o pacote para 192.168.10.1. O gateway roteia para a rede 192.168.20.0/24 e entrega o pacote na VLAN 20. Se houver ACL permitindo o tráfego, a comunicação funciona. Se a política bloquear, a rota existe, mas o acesso não acontece.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Uma empresa pode ter VLAN 10 para usuários, VLAN 20 para servidores, VLAN 30 para impressoras, VLAN 40 para gestão, VLAN 50 para câmeras e VLAN 90 para convidados. O switch L3 pode ser gateway das VLANs internas, enquanto o firewall controla acesso a servidores críticos, Internet e VPN.</p><p>Uma política madura evita que usuários acessem diretamente gestão de switches, câmeras ou bancos de dados. Permite apenas fluxos necessários: usuários para aplicações, aplicações para bancos, TI para gestão, convidados apenas para Internet e monitoramento para todos os segmentos autorizados.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em uma VPC/VNet, subnets públicas, privadas, de dados e de gestão cumprem papel semelhante aos segmentos VLAN. A comunicação é controlada por route tables, security groups, NACLs, firewalls gerenciados, private endpoints, NAT gateways e gateways de VPN.</p><p>Um erro comum é migrar a mentalidade de rede plana para cloud e criar subnets enormes com security groups muito amplos. O desenho correto começa pelo bloco, separa zonas, define rotas, força inspeção quando necessário e aplica menor privilégio também no plano de rede.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Em DevSecOps, roteamento inter-VLAN aparece em runners self-hosted, ambientes de build, clusters Kubernetes, redes de staging, produção, observabilidade e secrets. Um runner que compila código não deveria ter acesso irrestrito ao banco de produção apenas porque há rota entre segmentos.</p><p>Em IaC, mudanças em VLANs, subnets, route tables, ACLs e firewalls devem passar por revisão. Uma rota adicionada em Terraform, Ansible ou configuração de firewall pode abrir caminho entre zonas sem que a aplicação tenha mudado uma linha de código.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>Do ponto de vista defensivo, inter-VLAN é onde segmentação se torna política real. Não basta criar VLANs; é necessário decidir o que pode atravessar o gateway.</p><table class=\"risk-table\"><thead><tr><th>Risco</th><th>Exemplo</th><th>Mitigação</th></tr></thead><tbody><tr><td>Segmentação falsa</td><td>Todas as VLANs roteiam para todas sem ACL.</td><td>Matriz de comunicação e deny por padrão.</td></tr><tr><td>Gateway errado</td><td>Host usa gateway de outra VLAN.</td><td>DHCP correto, NAC e validação de IPAM.</td></tr><tr><td>Trunk indevido</td><td>Porta de usuário recebe múltiplas VLANs.</td><td>Access mode, allowed VLANs e auditoria.</td></tr><tr><td>Bypass de firewall</td><td>Switch L3 roteia diretamente entre zonas críticas.</td><td>Forçar caminho por firewall onde necessário.</td></tr><tr><td>Logs insuficientes</td><td>Acesso lateral não é registrado.</td><td>Firewall, NetFlow, SIEM e telemetria.</td></tr></tbody></table></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2><svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"m11l05-title m11l05-desc\"><title id=\"m11l05-title\">Roteamento inter-VLAN</title><desc id=\"m11l05-desc\">Diagrama mostrando hosts em VLAN 10 e VLAN 20 passando por um gateway de camada 3 para se comunicar.</desc><defs><marker id=\"m11l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs><rect x=\"40\" y=\"80\" width=\"230\" height=\"320\" rx=\"18\" class=\"svg-zone\"></rect><text x=\"155\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">VLAN 10</text><text x=\"155\" y=\"140\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.0/24</text><rect x=\"85\" y=\"185\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\"></rect><text x=\"155\" y=\"214\" text-anchor=\"middle\" class=\"svg-label\">PC-A</text><text x=\"155\" y=\"238\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.50</text><rect x=\"365\" y=\"155\" width=\"230\" height=\"170\" rx=\"18\" class=\"svg-node svg-node--router\"></rect><text x=\"480\" y=\"195\" text-anchor=\"middle\" class=\"svg-label\">Gateway L3</text><text x=\"480\" y=\"222\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SVI/subinterfaces/firewall</text><text x=\"480\" y=\"252\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.1 + 20.1</text><rect x=\"690\" y=\"80\" width=\"230\" height=\"320\" rx=\"18\" class=\"svg-zone\"></rect><text x=\"805\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">VLAN 20</text><text x=\"805\" y=\"140\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.20.0/24</text><rect x=\"735\" y=\"185\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\"></rect><text x=\"805\" y=\"214\" text-anchor=\"middle\" class=\"svg-label\">Servidor-B</text><text x=\"805\" y=\"238\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.20.10</text><line x1=\"225\" y1=\"220\" x2=\"365\" y2=\"220\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l05-arrow)\"></line><line x1=\"595\" y1=\"220\" x2=\"735\" y2=\"220\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l05-arrow)\"></line><path d=\"M735 260 C640 380 320 380 225 260\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m11l05-arrow)\"></path><rect x=\"300\" y=\"35\" width=\"360\" height=\"42\" rx=\"12\" class=\"svg-badge\"></rect><text x=\"480\" y=\"62\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN separa; gateway L3 roteia; política decide</text><text x=\"300\" y=\"205\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP para gateway</text><text x=\"660\" y=\"205\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">novo frame na VLAN 20</text></svg></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>O laboratório agora trata inter-VLAN como desenho de segmentação: VLAN, trunk, gateway por VLAN, política mínima, validação de tráfego permitido e bloqueado, além de falhas intencionais de trunk, gateway e ACL.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios praticam escolha de gateways, leitura de sintomas, análise de trunks e identificação de onde aplicar política de segurança.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>Você receberá uma empresa com usuários, servidores, convidados e gestão. Sua missão será propor VLANs, gateways, método de roteamento e matriz mínima de comunicação.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra como separar segmentos, escolher gateways, validar rotas conectadas e bloquear comunicação desnecessária entre VLANs.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>Roteamento inter-VLAN permite que segmentos separados por VLAN se comuniquem por meio de um dispositivo de Camada 3. Ele pode ser feito por router-on-a-stick, switch L3, firewall ou gateways em cloud.</p><p>O ponto mais importante é que conectividade e segurança não são a mesma coisa. O desenho correto define gateways por VLAN, rotas, trunks, políticas, logs, validação e troubleshooting.</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, você estudará <strong>métrica, distância administrativa e escolha de caminho</strong>, entendendo como dispositivos escolhem entre rotas concorrentes, estáticas e dinâmicas.</p></section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula conecta VLANs, gateways e roteamento IPv4, mostrando como redes locais segmentadas passam a se comunicar com controle de Camada 3.",
    "previousConcepts": [
      "VLAN",
      "trunk",
      "ARP",
      "gateway padrão",
      "subnetting",
      "tabela de rotas",
      "rota conectada"
    ],
    "nextConcepts": [
      "métrica",
      "distância administrativa",
      "OSPF",
      "firewall entre zonas",
      "troubleshooting de caminho",
      "roteamento dinâmico"
    ]
  },
  "protocolFields": [
    {
      "name": "VLAN ID",
      "description": "Identificador lógico do domínio de broadcast, como VLAN 10 ou VLAN 20."
    },
    {
      "name": "Tag 802.1Q",
      "description": "Campo usado em trunks para transportar múltiplas VLANs pelo mesmo enlace."
    },
    {
      "name": "Gateway da VLAN",
      "description": "Endereço IPv4 que os hosts da VLAN usam como próximo salto para sair da sub-rede."
    },
    {
      "name": "SVI",
      "description": "Interface virtual de switch associada a uma VLAN, usada como gateway em switches camada 3."
    },
    {
      "name": "Subinterface",
      "description": "Interface lógica de roteador associada a uma VLAN específica em router-on-a-stick."
    },
    {
      "name": "Rota conectada",
      "description": "Rota instalada automaticamente quando a interface L3 da VLAN está ativa."
    },
    {
      "name": "ACL/Policy",
      "description": "Regra que permite ou bloqueia fluxos entre VLANs."
    }
  ],
  "packetFlow": [
    "Host de origem calcula que o destino está fora da sua sub-rede.",
    "Host resolve via ARP o MAC do gateway da própria VLAN.",
    "Frame sai pela VLAN de origem até o dispositivo L3.",
    "Dispositivo L3 desencapsula o frame e analisa o pacote IPv4.",
    "Tabela de rotas aponta a rede de destino como conectada a outra VLAN ou interface.",
    "Política de ACL/firewall é avaliada antes do encaminhamento.",
    "Dispositivo L3 resolve o MAC do destino na VLAN de saída, se necessário.",
    "Novo frame Ethernet é criado na VLAN de destino, preservando IPs fim a fim.",
    "Resposta segue o caminho inverso ou outra rota válida, respeitando políticas."
  ],
  "deepDive": {
    "title": "Router-on-a-stick versus SVI versus firewall",
    "content": "Router-on-a-stick usa um trunk entre switch e roteador, com subinterfaces dot1q para cada VLAN. SVI usa interfaces virtuais no switch camada 3, geralmente com melhor desempenho. Firewall como gateway aplica inspeção e política mais rica entre zonas. A escolha depende de custo, escala, segurança, logging, latência e governança. Em ambientes críticos, é comum combinar switch L3 para segmentos internos de baixo risco e firewall para zonas sensíveis."
  },
  "commonMistakes": [
    "Criar VLANs mas usar uma ACL any-any entre todas elas.",
    "Configurar IP de host com gateway de outra VLAN.",
    "Esquecer de permitir a VLAN no trunk entre switch e roteador ou switch L3.",
    "Criar SVI mas esquecer de habilitar roteamento L3 no switch.",
    "Achar que ping bloqueado significa necessariamente rota errada.",
    "Colocar rede de gestão roteável para usuários comuns.",
    "Aplicar firewall apenas na borda e deixar tráfego lateral interno sem política."
  ],
  "troubleshooting": {
    "symptoms": [
      "Hosts da mesma VLAN se comunicam, mas VLANs diferentes não.",
      "Ping para gateway funciona, mas destino em outra VLAN falha.",
      "Uma VLAN não aparece no trunk.",
      "SVI está down/down ou administratively down.",
      "Rota conectada da VLAN não aparece na tabela de rotas.",
      "Traceroute para no gateway inter-VLAN.",
      "Aplicação falha, mas ping funciona."
    ],
    "checks": [
      "Verificar IP, máscara e gateway dos hosts.",
      "Confirmar VLAN da porta access do host.",
      "Validar se o trunk permite as VLANs necessárias.",
      "Verificar se a SVI/subinterface está ativa e com IP correto.",
      "Confirmar tabela de rotas no dispositivo L3.",
      "Verificar ACL, firewall, security group ou policy entre segmentos.",
      "Validar rota de retorno e logs de bloqueio.",
      "Testar primeiro gateway, depois host remoto, depois porta da aplicação."
    ],
    "tools": [
      "ipconfig /all",
      "Get-NetIPConfiguration",
      "arp -a",
      "route print",
      "Test-NetConnection",
      "ip addr",
      "ip route",
      "ip neigh",
      "ping",
      "traceroute",
      "mtr",
      "show vlan brief",
      "show interfaces trunk",
      "show ip interface brief",
      "show ip route",
      "show access-lists",
      "show mac address-table",
      "show arp"
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
    "badPractices": [
      "Permitir any-any entre todas as VLANs.",
      "Usar uma única VLAN grande para todos os tipos de ativos.",
      "Colocar convidados na mesma rota de servidores internos.",
      "Expor VLAN de gestão para estações comuns.",
      "Criar SVIs sem documentação de política.",
      "Fazer alteração manual fora de controle de mudança."
    ],
    "vulnerabilities": [
      {
        "name": "movimentação lateral",
        "description": "Risco relacionado à aula 11.5 — Roteamento inter-VLAN.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "ACLs"
      },
      {
        "name": "bypass de segmentação",
        "description": "Risco relacionado à aula 11.5 — Roteamento inter-VLAN.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "firewall interno"
      },
      {
        "name": "exposição de gestão",
        "description": "Risco relacionado à aula 11.5 — Roteamento inter-VLAN.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "NAC"
      },
      {
        "name": "trunk indevido",
        "description": "Risco relacionado à aula 11.5 — Roteamento inter-VLAN.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "802.1X"
      },
      {
        "name": "VLAN hopping por má configuração",
        "description": "Risco relacionado à aula 11.5 — Roteamento inter-VLAN.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "port security"
      },
      {
        "name": "roteamento any-any",
        "description": "Risco relacionado à aula 11.5 — Roteamento inter-VLAN.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "allowed VLANs explícitas"
      },
      {
        "name": "falta de logs internos",
        "description": "Risco relacionado à aula 11.5 — Roteamento inter-VLAN.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "desabilitar DTP quando aplicável"
      }
    ],
    "mitigations": [
      "ACLs",
      "firewall interno",
      "NAC",
      "802.1X",
      "port security",
      "allowed VLANs explícitas",
      "desabilitar DTP quando aplicável",
      "SIEM",
      "NetFlow",
      "revisão periódica de regras"
    ],
    "goodPractices": [
      "Criar matriz de comunicação entre VLANs antes de liberar tráfego.",
      "Usar deny por padrão entre segmentos sensíveis.",
      "Aplicar firewall ou ACL entre VLANs com funções diferentes.",
      "Separar rede de gestão, usuários, servidores, convidados, IoT e DMZ.",
      "Registrar logs de tráfego permitido e bloqueado em pontos críticos.",
      "Evitar trunks em portas de usuário.",
      "Revisar allowed VLANs em trunks.",
      "Integrar NAC/802.1X para colocar dispositivos na VLAN correta."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar roteamento, OSPF, BGP e caminhos com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "ACLs",
      "firewall interno",
      "NAC",
      "802.1X",
      "port security",
      "allowed VLANs explícitas",
      "desabilitar DTP quando aplicável",
      "SIEM",
      "NetFlow",
      "revisão periódica de regras"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "labType": "packet-tracer",
    "title": "Packet Tracer/GNS3: inter-VLAN com switch camada 3, router-on-a-stick e política mínima",
    "objective": "Construir e diagnosticar roteamento entre VLANs, comparando gateway por SVI e router-on-a-stick, aplicando validação de trunk, gateways, ACL e segmentação.",
    "scenario": "Uma empresa separa usuários, servidores e visitantes em VLANs. Usuários podem acessar servidores em portas específicas; visitantes não podem acessar redes internas. O aluno deve criar VLANs, gateways, trunk, rotas e uma política mínima de comunicação.",
    "topology": "PC-USER VLAN10 -> SW-ACESSO -> SW-L3 ou R1 -> VLAN20 SERVERS; PC-GUEST VLAN30 isolado de servidores; uplink trunk entre switch de acesso e camada 3.",
    "architecture": "A camada 2 separa domínios por VLAN. A camada 3 fornece gateway para cada VLAN via SVI em switch L3 ou subinterfaces 802.1Q em roteador. ACLs controlam comunicação entre segmentos.",
    "prerequisites": [
      "Conhecer VLAN, trunk, gateway, ARP, IPv4 e rota local.",
      "Concluir M03, M04, M05, M09 e aulas 11.1–11.4."
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "CLI Cisco IOS",
      "Opcional: Wireshark em laboratório real"
    ],
    "estimatedTimeMinutes": 120,
    "cost": "zero em Packet Tracer; local em GNS3",
    "safetyNotes": [
      "Use apenas laboratório isolado.",
      "Não copie ACLs any-any para produção.",
      "Documente toda exceção entre VLANs."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Criar VLANs",
        "instruction": "Crie VLAN10-USERS, VLAN20-SERVERS e VLAN30-GUEST no switch.",
        "command": "vlan 10\n name USERS\nvlan 20\n name SERVERS\nvlan 30\n name GUEST",
        "expectedOutput": "show vlan brief lista as três VLANs.",
        "explanation": "A VLAN separa domínios L2; ainda não existe comunicação L3 entre elas."
      },
      {
        "number": 2,
        "title": "Associar portas de acesso",
        "instruction": "Coloque cada PC na VLAN correta.",
        "command": "interface f0/1\n switchport mode access\n switchport access vlan 10\n!\ninterface f0/2\n switchport mode access\n switchport access vlan 20\n!\ninterface f0/3\n switchport mode access\n switchport access vlan 30",
        "expectedOutput": "show vlan brief mostra portas nas VLANs corretas.",
        "explanation": "Porta na VLAN errada causa sintomas parecidos com erro de IP."
      },
      {
        "number": 3,
        "title": "Configurar trunk",
        "instruction": "Configure o uplink entre switch de acesso e equipamento L3.",
        "command": "interface g0/1\n switchport mode trunk\n switchport trunk allowed vlan 10,20,30",
        "expectedOutput": "show interfaces trunk mostra VLANs permitidas e ativas.",
        "explanation": "Se a VLAN não atravessa o trunk, o gateway pode estar correto e mesmo assim o host não comunica."
      },
      {
        "number": 4,
        "title": "Configurar gateways por SVI",
        "instruction": "No switch L3, crie interfaces VLAN e habilite roteamento.",
        "command": "ip routing\ninterface vlan 10\n ip address 10.10.10.1 255.255.255.0\n no shutdown\ninterface vlan 20\n ip address 10.20.20.1 255.255.255.0\n no shutdown\ninterface vlan 30\n ip address 10.30.30.1 255.255.255.0\n no shutdown",
        "expectedOutput": "show ip interface brief mostra SVI up/up quando há portas ativas na VLAN.",
        "explanation": "SVI é o gateway L3 da VLAN. Em router-on-a-stick, use subinterfaces dot1Q equivalentes."
      },
      {
        "number": 5,
        "title": "Configurar hosts",
        "instruction": "Defina IP, máscara e gateway em cada PC.",
        "command": "USER: 10.10.10.10/24 GW 10.10.10.1\nSERVER: 10.20.20.10/24 GW 10.20.20.1\nGUEST: 10.30.30.10/24 GW 10.30.30.1",
        "expectedOutput": "Cada PC pinga seu gateway.",
        "explanation": "Se o host não pinga o gateway, investigue L1/L2/IP local antes de culpar ACL."
      },
      {
        "number": 6,
        "title": "Validar roteamento livre inicial",
        "instruction": "Teste ping entre VLAN10 e VLAN20 antes de aplicar restrição.",
        "command": "PC-USER> ping 10.20.20.10",
        "expectedOutput": "Ping responde se roteamento inter-VLAN está funcionando.",
        "explanation": "Primeiro confirme conectividade; depois aplique segurança."
      },
      {
        "number": 7,
        "title": "Aplicar política mínima",
        "instruction": "Bloqueie GUEST para redes internas e permita USERS para SERVERS conforme necessidade.",
        "command": "ip access-list extended GUEST-IN\n deny ip 10.30.30.0 0.0.0.255 10.10.10.0 0.0.0.255\n deny ip 10.30.30.0 0.0.0.255 10.20.20.0 0.0.0.255\n permit ip 10.30.30.0 0.0.0.255 any\ninterface vlan 30\n ip access-group GUEST-IN in",
        "expectedOutput": "Visitantes não acessam redes internas, mas podem sair para destinos permitidos no desenho.",
        "explanation": "Inter-VLAN sem política vira rede roteada plana. Segurança exige matriz de comunicação."
      },
      {
        "number": 8,
        "title": "Validar ACL e logs",
        "instruction": "Teste comunicação permitida e bloqueada. Em plataformas que suportem, adicione log na regra de deny.",
        "command": "show access-lists\nPC-GUEST> ping 10.20.20.10\nPC-USER> ping 10.20.20.10",
        "expectedOutput": "Contadores de ACL aumentam e testes refletem a política.",
        "explanation": "Validação precisa testar o que deve funcionar e o que deve falhar."
      },
      {
        "number": 9,
        "title": "Diagnosticar falha intencional de trunk",
        "instruction": "Remova VLAN20 do trunk, observe sintoma e corrija.",
        "command": "switchport trunk allowed vlan 10,30\nshow interfaces trunk",
        "expectedOutput": "Servidor deixa de ser alcançável a partir de outra VLAN.",
        "explanation": "Esse erro é comum: IP e gateway parecem certos, mas a VLAN não atravessa o trunk."
      },
      {
        "number": 10,
        "title": "Diagnosticar gateway errado",
        "instruction": "Altere temporariamente o gateway do PC-GUEST e observe.",
        "command": "GUEST GW errado: 10.30.30.254",
        "expectedOutput": "PC-GUEST não sai da própria rede.",
        "explanation": "Gateway errado é uma das causas mais comuns de falha de inter-VLAN."
      },
      {
        "number": 11,
        "title": "Comparar router-on-a-stick",
        "instruction": "Como exercício alternativo, substitua o switch L3 por roteador com subinterfaces dot1Q.",
        "command": "interface g0/0.10\n encapsulation dot1Q 10\n ip address 10.10.10.1 255.255.255.0",
        "expectedOutput": "Comunicação equivalente usando subinterfaces.",
        "explanation": "O conceito é o mesmo: gateway L3 por VLAN. A implementação muda."
      },
      {
        "number": 12,
        "title": "Registrar matriz de comunicação",
        "instruction": "Documente origem, destino, porta, decisão, justificativa e evidência.",
        "command": "Tabela: origem | destino | serviço | permitir/bloquear | validação | evidência",
        "expectedOutput": "Matriz útil para auditoria e troubleshooting.",
        "explanation": "Roteamento inter-VLAN em empresa precisa de governança, não apenas ping funcionando."
      }
    ],
    "expectedResult": "O aluno deve criar VLANs, trunk, gateways L3, comunicação inter-VLAN controlada por ACL, testar falhas comuns e produzir evidências.",
    "validation": [
      {
        "check": "VLANs existem e portas estão corretas",
        "command": "show vlan brief",
        "expected": "Portas de acesso nas VLANs 10, 20 e 30.",
        "ifFails": "Corrigir switchport access vlan."
      },
      {
        "check": "Trunk transporta VLANs necessárias",
        "command": "show interfaces trunk",
        "expected": "VLANs 10,20,30 permitidas e ativas.",
        "ifFails": "Corrigir allowed vlan, modo trunk ou encapsulamento."
      },
      {
        "check": "SVIs ou subinterfaces estão up",
        "command": "show ip interface brief",
        "expected": "VLAN interfaces ou subinterfaces com IP e status up/up.",
        "ifFails": "Verificar portas ativas na VLAN, no shutdown e IP."
      },
      {
        "check": "Hosts pingam gateways",
        "command": "ping gateway de cada VLAN",
        "expected": "Cada host alcança seu gateway.",
        "ifFails": "Verificar IP, máscara, porta, VLAN e gateway."
      },
      {
        "check": "USER acessa SERVER conforme política",
        "command": "ping/teste de porta para 10.20.20.10",
        "expected": "Tráfego permitido funciona.",
        "ifFails": "Verificar rota, ACL, firewall local do servidor e gateway."
      },
      {
        "check": "GUEST bloqueado para internos",
        "command": "ping 10.20.20.10 a partir de GUEST",
        "expected": "Bloqueio conforme regra e contador de ACL aumentando.",
        "ifFails": "Verificar direção da ACL e ordem das regras."
      },
      {
        "check": "Sem bypass por rota alternativa",
        "command": "show ip route e diagrama lógico",
        "expected": "Caminho entre VLANs passa pelo ponto de política previsto.",
        "ifFails": "Ajustar roteamento ou ponto de aplicação da ACL."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Host não pinga gateway",
        "probableCause": "Porta na VLAN errada, IP/máscara errados ou SVI down.",
        "howToConfirm": "show vlan brief, ipconfig/ip addr e show ip interface brief.",
        "fix": "Corrigir VLAN, IP, gateway ou ativar SVI."
      },
      {
        "symptom": "VLAN não atravessa trunk",
        "probableCause": "VLAN ausente em allowed vlan ou trunk em modo access.",
        "howToConfirm": "show interfaces trunk.",
        "fix": "Configurar trunk e VLANs permitidas."
      },
      {
        "symptom": "SVI fica down/down",
        "probableCause": "Nenhuma porta ativa na VLAN ou VLAN inexistente.",
        "howToConfirm": "show vlan brief e show interfaces status.",
        "fix": "Criar VLAN e manter porta ativa associada."
      },
      {
        "symptom": "Tudo pinga antes da ACL e falha depois",
        "probableCause": "ACL aplicada na direção errada ou regra deny ampla demais.",
        "howToConfirm": "show access-lists e revisar origem/destino.",
        "fix": "Reordenar regras e aplicar no ponto correto."
      },
      {
        "symptom": "Visitantes alcançam servidor interno",
        "probableCause": "ACL ausente, aplicada no local errado ou permit any antes do deny.",
        "howToConfirm": "show running-config interface vlan 30 e show access-lists.",
        "fix": "Corrigir ACL e retestar tráfego permitido/bloqueado."
      },
      {
        "symptom": "Servidor não responde mesmo com rota",
        "probableCause": "Firewall local do servidor ou gateway errado no servidor.",
        "howToConfirm": "Teste a partir do gateway e veja configuração do servidor.",
        "fix": "Corrigir firewall local ou gateway."
      },
      {
        "symptom": "Intermitência entre VLANs",
        "probableCause": "STP, trunk inconsistente ou IP duplicado.",
        "howToConfirm": "show spanning-tree, logs e ARP.",
        "fix": "Corrigir topologia L2 e endereçamento."
      }
    ],
    "improvements": [
      "Adicionar DHCP por VLAN com helper-address.",
      "Substituir ACL por firewall L3/L7 em cenário corporativo.",
      "Adicionar NetFlow/logs para tráfego inter-VLAN.",
      "Criar diagrama de zonas de segurança."
    ],
    "evidenceToCollect": [
      "show vlan brief.",
      "show interfaces trunk.",
      "show ip interface brief.",
      "show ip route.",
      "show access-lists.",
      "Print dos testes permitido/bloqueado.",
      "Matriz de comunicação."
    ],
    "questions": [
      "Por que VLAN sozinha não permite comunicação entre redes?",
      "Onde a ACL deve ser aplicada para bloquear visitantes?",
      "Quando usar switch L3 e quando usar firewall para inter-VLAN?",
      "Que erro de trunk parece problema de roteamento?",
      "Como provar que uma regra bloqueia sem quebrar tráfego permitido?"
    ],
    "challenge": "Adicione uma VLAN40-ADM que pode administrar switches e servidores, mas não deve ser acessível por USERS nem GUEST. Entregue matriz de comunicação, ACLs e validação.",
    "solution": "A solução cria gateway próprio para VLAN40, define regras de entrada que permitam apenas origens administrativas autorizadas para portas de gestão e bloqueiem tentativas de USERS/GUEST. A validação deve testar fluxos permitidos e negados, além de revisar contadores de ACL e rota efetiva.",
    "id": "lab-11.5"
  },
  "mentorQuestions": [
    "Se duas VLANs têm gateways configurados mas não se comunicam, quais três pontos você verificaria primeiro?",
    "Quando você escolheria switch L3 em vez de firewall como gateway inter-VLAN?",
    "Que risco existe em permitir any-any entre VLANs apenas porque a empresa confia na rede interna?"
  ],
  "quiz": [
    {
      "question": "Por que VLANs diferentes precisam de roteamento para se comunicar?",
      "options": [
        "Porque estão em domínios de broadcast e normalmente sub-redes diferentes",
        "Porque o switch L2 bloqueia todos os pings por padrão",
        "Porque ARP funciona apenas na Internet",
        "Porque VLANs não usam endereços MAC"
      ],
      "answer": 0,
      "explanation": "VLANs separam domínios L2. Para atravessar entre sub-redes/VLANs, é necessário um dispositivo L3."
    },
    {
      "question": "O que é uma SVI?",
      "options": [
        "Uma interface virtual de switch associada a uma VLAN",
        "Um tipo de cabo de fibra",
        "Um protocolo de criptografia",
        "Uma rota default"
      ],
      "answer": 0,
      "explanation": "SVI é uma interface VLAN em switch L3, frequentemente usada como gateway daquela VLAN."
    },
    {
      "question": "No router-on-a-stick, qual recurso permite transportar várias VLANs em um único enlace?",
      "options": [
        "802.1Q trunk",
        "APIPA",
        "ICMP Echo",
        "NAT overload"
      ],
      "answer": 0,
      "explanation": "Um trunk 802.1Q carrega tags de VLAN entre switch e roteador."
    },
    {
      "question": "Qual afirmação é correta sobre VLAN e segurança?",
      "options": [
        "VLAN separa broadcast, mas política entre VLANs precisa de ACL/firewall/gateway",
        "VLAN substitui firewall completamente",
        "VLAN impede qualquer ataque lateral automaticamente",
        "VLAN elimina a necessidade de logs"
      ],
      "answer": 0,
      "explanation": "VLAN ajuda na segmentação, mas controle de comunicação exige política aplicada no ponto de roteamento."
    },
    {
      "question": "Se hosts da mesma VLAN se comunicam, mas não alcançam outra VLAN, qual item deve ser verificado?",
      "options": [
        "Gateway, trunk, SVI/subinterface, rota e ACL",
        "Apenas resolução DNS",
        "Apenas cabo de energia",
        "Somente MTU da Internet"
      ],
      "answer": 0,
      "explanation": "Falha inter-VLAN pode estar em gateway, trunk, interface L3, tabela de rotas ou política."
    },
    {
      "question": "Qual risco ocorre quando usuários acessam diretamente a VLAN de gestão?",
      "options": [
        "Exposição de interfaces administrativas e aumento de movimentação lateral",
        "Melhora automática do desempenho",
        "Redução de logs",
        "Desativação do ARP"
      ],
      "answer": 0,
      "explanation": "Rede de gestão deve ser altamente restrita para evitar controle indevido de infraestrutura."
    }
  ],
  "flashcards": [
    {
      "front": "O que é roteamento inter-VLAN?",
      "back": "Encaminhamento de pacotes entre VLANs/sub-redes diferentes por um dispositivo de Camada 3."
    },
    {
      "front": "O que é router-on-a-stick?",
      "back": "Modelo em que um roteador usa subinterfaces 802.1Q em um trunk para rotear entre VLANs."
    },
    {
      "front": "O que é SVI?",
      "back": "Interface virtual de switch associada a uma VLAN, usada como gateway em switches L3."
    },
    {
      "front": "VLAN é firewall?",
      "back": "Não. VLAN segmenta L2; firewall/ACL/policy controla tráfego entre segmentos."
    },
    {
      "front": "O que verificar se VLANs não se comunicam?",
      "back": "IP/máscara/gateway, VLAN da porta, trunk, SVI/subinterface, rotas, ARP e ACL/firewall."
    },
    {
      "front": "Por que trunks em portas de usuário são perigosos?",
      "back": "Podem expor múltiplas VLANs e aumentar risco de bypass de segmentação por má configuração."
    }
  ],
  "exercises": [
    {
      "title": "Escolha do gateway",
      "prompt": "Para VLAN 30 com rede 10.30.30.0/24, proponha um gateway padrão e explique por que ele deve estar nessa sub-rede.",
      "expectedAnswer": "Exemplo: 10.30.30.1/24. O gateway precisa ser alcançável localmente pelos hosts da VLAN 30."
    },
    {
      "title": "Diagnóstico de trunk",
      "prompt": "PC da VLAN 10 pinga gateway local, mas não alcança servidor na VLAN 20. O que verificar no trunk?",
      "expectedAnswer": "Verificar se VLAN 10 e VLAN 20 estão permitidas no trunk, se o trunk está ativo e se não há native VLAN ou encapsulamento incorreto."
    },
    {
      "title": "Segurança entre VLANs",
      "prompt": "Usuários precisam acessar apenas HTTPS no servidor 192.168.20.10. Que tipo de política você criaria?",
      "expectedAnswer": "Permitir TCP/443 da rede de usuários para 192.168.20.10 e negar demais fluxos desnecessários para a VLAN de servidores."
    },
    {
      "title": "Arquitetura",
      "prompt": "Compare switch L3 e firewall como gateway inter-VLAN em uma frase cada.",
      "expectedAnswer": "Switch L3 oferece alto desempenho; firewall oferece inspeção, logging e política mais rica entre zonas."
    },
    {
      "id": "ex11.5-p1-1",
      "type": "diagnóstico",
      "prompt": "Um host na VLAN10 pinga seu gateway, mas não acessa servidor na VLAN20. Cite cinco verificações em ordem.",
      "expectedAnswer": "IP/máscara/gateway do host, SVI/subinterface, trunk permitindo VLAN20, rota/tabela L3, ACL/firewall/servidor.",
      "explanation": "O método evita culpar roteamento antes de validar camada 2 e política."
    },
    {
      "id": "ex11.5-p1-2",
      "type": "segurança",
      "prompt": "Por que roteamento inter-VLAN sem ACL ou firewall pode transformar VLANs em segmentação apenas aparente?",
      "expectedAnswer": "Porque a separação L2 existe, mas a camada 3 permite comunicação livre entre segmentos. Segurança exige política explícita.",
      "explanation": "VLAN não é firewall."
    }
  ],
  "challenge": {
    "title": "Desenhar roteamento inter-VLAN seguro para quatro segmentos",
    "scenario": "Uma empresa precisa de VLANs para Usuários, Servidores, Gestão e Convidados. O bloco disponível é 10.60.0.0/22. Usuários precisam acessar aplicações, gestão deve acessar infraestrutura, convidados só Internet e servidores não devem iniciar conexão para usuários.",
    "tasks": [
      "Propor uma rede para cada VLAN.",
      "Definir gateway de cada VLAN.",
      "Escolher entre switch L3, firewall ou modelo híbrido como gateway.",
      "Criar uma matriz de comunicação permitida e negada.",
      "Listar comandos ou evidências para validar conectividade.",
      "Apontar três riscos de segurança e três mitigações."
    ],
    "rubric": [
      "Endereçamento sem sobreposição.",
      "Gateways corretos dentro das sub-redes.",
      "Política de menor privilégio entre VLANs.",
      "Separação forte da rede de gestão.",
      "Convidados sem acesso interno.",
      "Plano de validação e troubleshooting claro."
    ],
    "gradingRubric": [
      {
        "criterion": "Correção técnica de rotas e caminhos",
        "points": 25,
        "description": "Prefixos, next hops, retorno, AD/métrica e caminhos efetivos estão corretos."
      },
      {
        "criterion": "Validação e evidências",
        "points": 25,
        "description": "A resposta inclui comandos, outputs esperados, testes positivos e testes negativos."
      },
      {
        "criterion": "Troubleshooting e RCA",
        "points": 20,
        "description": "O aluno identifica hipóteses, evidências, causa raiz e prevenção."
      },
      {
        "criterion": "Segurança e governança",
        "points": 20,
        "description": "A solução evita bypass, excesso de permissão, anúncios indevidos e falta de logs."
      },
      {
        "criterion": "Clareza operacional",
        "points": 10,
        "description": "Entrega documentação, rollback e próximos passos de melhoria."
      }
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada do desenho inter-VLAN",
    "content": "Uma solução possível divide 10.60.0.0/22 em sub-redes como Usuários 10.60.0.0/24, Servidores 10.60.1.0/24, Gestão 10.60.2.0/25 e Convidados 10.60.3.0/24. Gateways podem usar o primeiro IP utilizável. Para segurança, Servidores e Gestão devem passar por firewall ou ACL rigorosa. Convidados devem ter rota apenas para Internet/NAT. Usuários acessam somente portas necessárias nas aplicações. A validação começa por gateway local, depois destino remoto, depois portas específicas e logs de allow/deny."
  },
  "glossary": [
    {
      "term": "Roteamento inter-VLAN",
      "definition": "Encaminhamento L3 entre VLANs/sub-redes diferentes."
    },
    {
      "term": "SVI",
      "definition": "Interface VLAN virtual em switch camada 3."
    },
    {
      "term": "Router-on-a-stick",
      "definition": "Modelo com roteador e subinterfaces dot1q conectadas por trunk a um switch."
    },
    {
      "term": "Trunk",
      "definition": "Enlace que transporta múltiplas VLANs usando tags 802.1Q."
    },
    {
      "term": "Gateway da VLAN",
      "definition": "Endereço L3 usado pelos hosts de uma VLAN para alcançar outras redes."
    },
    {
      "term": "ACL",
      "definition": "Lista de controle de acesso usada para permitir ou negar tráfego conforme origem, destino e serviço."
    }
  ],
  "references": [
    "Cisco: Inter-VLAN Routing Concepts",
    "RFC 791: Internet Protocol",
    "IEEE 802.1Q: VLAN Tagging",
    "Documentação de fabricantes sobre SVIs, trunks e roteamento em switch L3"
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "VLANs, trunks e domínios de broadcast são pré-requisito direto."
    },
    {
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.7",
      "reason": "Planejamento corporativo de endereçamento define sub-redes por VLAN."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "cloud-networking",
      "reason": "Subnets, route tables, firewalls e segmentação em cloud usam a mesma lógica conceitual."
    },
    {
      "course": "Identity, Access Management e Segurança de Identidades",
      "module": "acesso-condicional",
      "reason": "Segmentação de rede complementa identidade, não substitui autenticação e autorização."
    }
  ],
  "progressRules": {
    "requiresQuiz": true,
    "requiresLab": true,
    "minimumQuizScore": 70,
    "minimumLabCompletion": 80,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "11.6"
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
